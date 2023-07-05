import express from 'express'
import { registerController,loginController,testController,forgotPasswordController,updateProfileController ,getOrdersController,getAllOrdersController,orderStatusController
}
from '../controllers/authController.js ';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';

const router= express.Router();

// register
router.post('/register',registerController);

// forgot password POST
router.post('/forgot-password',forgotPasswordController);


// login
router.post('/login',loginController);

// testing
router.get('/test',requireSignIn,isAdmin,testController);

// protected user route auth
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).json({ok:true})
})

// protected admin route auth
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).json({ok:true})
})

// update profile
router.put('/profile',requireSignIn,updateProfileController);

// orderes
router.get('/orders',requireSignIn,getOrdersController);

//all orderes
router.get('/all-orders',requireSignIn,isAdmin,getAllOrdersController);

// order status update
router.put('/order-status/:orderId',requireSignIn,isAdmin,orderStatusController);

export default router;