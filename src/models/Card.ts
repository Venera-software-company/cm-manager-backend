import mongoose from 'mongoose';
import CardSchema from '../schemas/CardSchema';

import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

CardSchema.pre('findOneAndUpdate', function (next) {
    this.findOneAndUpdate({}, { updatedAt: new Date() });
    next();
});

CardSchema.pre('save', function (next) {
    if (!this.isNew) this.updatedAt = new Date();
    next();
});

CardSchema.plugin(mongooseAggregatePaginate);

const Note = mongoose.model('Card', CardSchema, 'cards');

Note.createIndexes();

export default Note;