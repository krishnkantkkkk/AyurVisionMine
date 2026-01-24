const express = require('express');
const router = express.Router();
const {userRegister, userLogout, userLogin, userProfile, userUpdate} = require('../controllers/userController');
const {isLoggedIn} = require('../middlewares/isLoggedIn');

router.get('/', (req, res)=>{
    res.send("Hey User");
})

router.post('/register', userRegister);
router.post('/login', userLogin);
router.get('/logout', userLogout);
router.get('/profile', isLoggedIn, userProfile);
router.post('/update', isLoggedIn, userUpdate);

module.exports = router;