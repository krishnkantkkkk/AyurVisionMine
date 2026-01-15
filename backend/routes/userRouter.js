const express = require('express');
const router = express.Router();
const {userRegister, userLogout, userLogin} = require('../controllers/authController');

router.get('/', (req, res)=>{
    res.send("Hey User");
})

router.post('/register', userRegister);
router.post('/login', userLogin);
router.get('/logout', userLogout);

module.exports = router;