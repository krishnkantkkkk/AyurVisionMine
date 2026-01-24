import LoginForm from "../components/LoginForm"
import SignupForm from "../components/SignupForm"
const SignUpPage = ()=>{
    return(
        <div className="flex flex-1 justify-center gap-10">
            <div className="login flex-col shadow-2xl hidden md:flex">
                <LoginForm></LoginForm>
            </div>
            <div className="signup flex flex-col shadow-2xl">
                <SignupForm></SignupForm>
            </div>
        </div>
    )    
}

export default SignUpPage