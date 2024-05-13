import { Request, Response } from 'express';
import Card from '../models/Card';

export default {
    async view(req: Request, res: Response) {
        try {
            const { page } = req.params as any;
            // if(!author || !page) return res.status(404).json({ message: "Access denied!" });
            
            const { search, limit } = req.query as any;
            
            const searchRegex = new RegExp(search as string, 'i');

            if(!(search as string).length) {
                const aggregate = Card.aggregate(
                    [
                        {
                            $match: {

                            }
                        },
                        {
                            $group: {
                                _id: "$_id",
                                client: { $first: "$client" },
                                type: { $first: "$type" },
                                image: { $first: "$image"},
                                labels: { $first: "$labels" },
                                createdAt: { $first: "$createdAt" },
                                updatedAt: { $first: "$updatedAt" }
                            }
                        },
                        {
                            $sort: { createdAt: 1 }
                        }
                    ]
                );

                
                const draws = await Card.aggregatePaginate(aggregate, { page, limit });
                
                console.log(draws);
                return res.status(200).json({ draws });
            };


            if((search as string).length > 0) {
                const aggregate = Card.aggregate(
                    [
                        {
                            $match: { 
                                $and: [
                                    { 
                                        $or: [
                                            { 'type': searchRegex },
                                            { 'client.name': searchRegex },
                                        ] 
                                    },
                                ]
                            }
                        }, 
                        {
                            $group: {
                                _id: "$_id",
                                client: { $first: "$client" },
                                type: { $first: "$type" },
                                image: { $first: "$image"},
                                labels: { $first: "$labels" },
                                createdAt: { $first: "$createdAt" },
                                updatedAt: { $first: "$updatedAt" }
                            }
                        },
                        {
                            $sort: { createdAt: 1 }
                        }
                    ]
                    
                );

                const draws = await Card.aggregatePaginate(aggregate, { page, limit });
                return res.status(200).json({ draws });
            }

        } catch (err) {
            res.status(400).json({ message: err });
            console.log(err);
        }
    },
    async add(req: Request , res: Response) {
        try {
            const { type, client, image, labels } = req.body;

            await Card.create({
                type,
                client,
                image,
                labels,
            });
            
            res.status(200).json({ message: 'Salvo com sucesso!' });
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: 'Error creating a new note, please try again or later' });
        }
    },
    async edit(req: Request , res: Response) {
        try {
            const { _id, title, body, image, state, stateId } = req.body;

            await Card.findOneAndUpdate({ _id }, { title, body, image });
            
            res.status(200).json({ message: 'Note updated!' });
        } catch (err) {
            res.status(400).json({ message: 'Error, please try again later!' });
        }
    },
    async delete(req: Request , res: Response) {
        try {
            const { id } = req.params;

            await Card.findByIdAndDelete(id);
            
            res.status(200).json({ message: 'Desenho excluído!' });
        } catch (err) {
            res.status(400).json({ message: 'Error, please try again later!' });
        }
    },
    async attachLabel(req: Request , res: Response) {
        try {
            const { labels, cardId } = req.body;

            await Card.findOneAndUpdate({ _id: cardId }, { labels: [ ...labels ] });

            res.status(200).json({ message: 'Label attached!' });
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: 'Error, please try again later!' });
        }
    },
    async detachLabel(req: Request, res: Response) {
        try {
            const { id, cardId } = req.params;
            const { labels } = await Card.findById({ _id: cardId });

            if(!labels) res.status(400).json({ message: "Card wasn't found!"});

            const filtredLabels = labels.filter((_id: string) => _id.toString() !== id);
            await Card.findByIdAndUpdate({ _id: cardId }, { labels: filtredLabels });
            
            res.status(200).json({ message: 'Label detached!' });
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: 'Error, please try again later!' });
        }
    },
}