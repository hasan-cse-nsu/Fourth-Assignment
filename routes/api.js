import express from 'express';
import * as UserController from "../app/controllers/userController.js"
import authMiddleware from "../app/middlewares/authMiddleware.js";

const router = express.Router();


router.post('/Registration', UserController.Registration);
router.post('/Login', UserController.Login);
router.get('/ProfileDetails', authMiddleware, UserController.ProfileDetails);
router.get('/AllProfileDetails', UserController.AllProfileDetails);
router.post('/ProfileUpdate', authMiddleware, UserController.ProfileUpdate);
router.get('/ProfileDelete/:id', authMiddleware, UserController.ProfileDelete);





export default router;