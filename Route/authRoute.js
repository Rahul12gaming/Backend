import express from 'express';
import { ForgetPassword, Login, Logout, ResetPassword, Singup, deleteUser, getSingleUserData, getUserDetails, gettAllUsers, updateUserRole } from '../controller/auth.js';
import { authenticateUser } from '../utils/checkUser.js';
import { checkUser } from '../middlewares/auth.js';
export const authRouter=express.Router();
authRouter.get('/me',checkUser,getUserDetails)
authRouter.get('/logout',Logout)
authRouter.post('/Singup',Singup);
authRouter.post('/login',Login);
authRouter.get('/logout',Logout);
authRouter.put('/resetPassword/:token',ResetPassword);
authRouter.post('/forgetPassword',ForgetPassword);
authRouter.get('/admin/users',gettAllUsers)
authRouter.route('/admin/users/:id')
.get(getSingleUserData)
.delete(checkUser,deleteUser)

authRouter.post('/admin/updateRole/:id',updateUserRole)

// iVuUV9sph7m3Ozix

 