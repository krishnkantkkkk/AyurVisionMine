import express from 'express';
const router = express.Router();
import {userRegister, userLogout, userLogin, userProfile, userUpdate, userRefreshToken} from '../controllers/userController.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';

router.get('/', (req, res)=>{
    res.send("Hey User");
})

router.post('/register', userRegister);
router.post('/login', userLogin);
router.get('/logout', userLogout);
router.get('/refresh-token', userRefreshToken);
router.get('/profile', isLoggedIn, userProfile);
router.post('/update', isLoggedIn, userUpdate);

export default router