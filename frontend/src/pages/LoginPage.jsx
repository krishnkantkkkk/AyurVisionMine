import LoginForm from "../components/LoginForm"
import SignupForm from "../components/SignupForm"
const LoginPage = ()=>{
    return(
        <div className="flex flex-1 justify-center gap-10 md:p-10">
            <div className="login flex flex-col shadow-2xl">
                <LoginForm></LoginForm>
            </div>
            <div className="signup flex-col shadow-2xl hidden md:flex">
                <SignupForm></SignupForm>
            </div>
        </div>
    )    
}

export default LoginPage