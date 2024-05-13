import express from 'express'
import UserController from '../controllers/UserController';
import CardController from '../controllers/CardController';
// import LabelController from '../controllers/LabelController';

import verifyUser from '../middlewares/verifyUser';

const router = express.Router();

// Users
router.post("/sign-in", UserController.login);
router.post("/create-user", UserController.add);
router.patch("/change-pass", UserController.changePassword);

//Projects
router.post("/add", CardController.add);
router.patch("/edit", CardController.edit);
router.delete("/delete/:id", CardController.delete);
router.get("/draws/:page", CardController.view);
router.post("/note/add/label", CardController.attachLabel);
router.delete("/note/delete/label/:id/:noteId", CardController.detachLabel);
// router.delete("/note/delete-all/label/:noteId", verifyUser, CardController.deleteAllLabels);

//Labels
// router.get("/labels/:userId", verifyUser, LabelController.view);
// router.post("/label/add/:userId", verifyUser, LabelController.add);
// router.patch("/label/edit/:userId", verifyUser, LabelController.edit);
// router.delete("/label/delete/:id", verifyUser, LabelController.delete);

export default router;