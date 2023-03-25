import {Router} from "express";
import * as  controller from "../controllers/controller.js"
const router =Router();

//questions routes
router
    .route('/questions')
    .get(controller.getQuestions)
    .post(controller.addQuestions)
    .delete(controller.deleteQuestions)


router 
    .route('/result')
    .get(controller.getResult)
    .post(controller.storeResult)
    .delete(controller.delResult)
export default router;