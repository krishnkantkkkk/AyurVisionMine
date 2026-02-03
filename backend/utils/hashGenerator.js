import bcrypt from 'bcrypt';

const hashGenerator = async (password)=>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export default hashGenerator