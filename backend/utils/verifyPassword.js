import bcrypt from 'bcrypt'

const verifyPassword = async (password, hash)=>{
    return await bcrypt.compare(password, hash);
}

export default verifyPassword;