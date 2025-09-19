
import express from 'express'
import userAuth from '../middleware/userAuth.js';
import { getUserData, getAllUsers, verifyUser } from '../controllers/userController.js';
import { updateUserProfile, uploadUserProfileImage } from '../controllers/userProfileController.js';

const userRouter = express.Router();


userRouter.put('/verify/:id', verifyUser);

// Update user profile (with image upload)
userRouter.put('/update-profile', userAuth, uploadUserProfileImage, updateUserProfile);

userRouter.get('/data',userAuth, getUserData);


userRouter.get('/all', getAllUsers);

export default userRouter;