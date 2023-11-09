import express from 'express'
// import UserController from '../controllers/UserController';
import CardController from '../controllers/CardController';
// import LabelController from '../controllers/LabelController';
// import SessionController from '../controllers/SessionController';

import verifyUser from '../middlewares/verifyUser';

const router = express.Router();

//Users
// router.post("/sign-up", UserController.add);
// router.post("/sign-in", UserController.login);
// router.post("/find-user", UserController.findAndSendCode);
// router.patch("/change-pass", UserController.changePassword);

//Draws
router.post("/add", CardController.add);
router.patch("/edit", CardController.edit);
// router.get("/note/:id", verifyUser, CardController.getNote);
router.delete("/delete/:id", CardController.delete);
router.get("/draws/:page", CardController.view);
router.post("/note/add/label", CardController.addLabel);
// router.post("/note/rename/:id", verifyUser, CardController.renameNote);
router.post("/note/image/:noteId", CardController.changeNoteImage);
router.delete("/note/delete/label/:id/:noteId", CardController.deleteLabel);
// router.delete("/note/delete-all/label/:noteId", verifyUser, CardController.deleteAllLabels);
// router.patch("/settings/note-background-color/:noteId", verifyUser, CardController.changeNoteBackgroundColor);

//Labels
// router.get("/labels/:userId", verifyUser, LabelController.view);
// router.post("/label/add/:userId", verifyUser, LabelController.add);
// router.patch("/label/edit/:userId", verifyUser, LabelController.edit);
// router.delete("/label/delete/:id", verifyUser, LabelController.delete);

export default router;