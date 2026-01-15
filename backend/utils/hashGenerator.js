const bcrypt = require('bcrypt');

const hashGenerator = async (password)=>{
    const salt = await bcrypt.genSalt(10);
    return hashedPassword = await bcrypt.hash(password, salt);
}

module.exports.hashGenerator = hashGenerator;