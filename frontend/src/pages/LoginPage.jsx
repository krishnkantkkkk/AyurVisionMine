import LoginForm from "../components/LoginForm"
import SignupForm from "../components/SignupForm"
const LoginPage = ()=>{
    return(
        <div className="flex flex-1 justify-center gap-10 md:p-10">
            <div className="flex flex-col">
                <LoginForm></LoginForm>
            </div>
            <div className="flex-col hidden md:flex">
                <SignupForm></SignupForm>
            </div>
        </div>
    )    
}

export default LoginPage