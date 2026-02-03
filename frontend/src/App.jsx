import { Routes, Route, Link} from 'react-router-dom'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Dashboard from './pages/Dashboard'
import HistoryPage from './pages/HistoryPage'
import ExaminePage from './pages/ExaminePage'
import ProfilePage from './pages/ProfiePage'
import UserProtectedWrapper from './protectedWrapper/UserProtectedWrapper'
import AuthRedirectProtectedWrapper from './protectedWrapper/AuthRedirectProtectedWrapper'
import { House } from 'lucide-react'
import User from './pages/User'

function App() {
  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center p-4 md:p-10 font-sans text-brand-text bg-brand-lighter">
      <Link to="/" className="z-10 flex h-10 w-10 md:h-auto md:w-auto justify-center items-center absolute p-2 rounded-full top-2 left-2 bg-white transition-all duration-300 border-4 md:border-8 border-brand-lighter active:shadow-[inset_-10px_-10px_10px_rgba(255,255,255,0.7),inset_10px_10px_10px_rgba(174,174,192,0.2)]"><House/></Link>
      <div className="bg-white h-full w-full rounded-[10px] md:rounded-[40px] relative overflow-hidden flex flex-col flex-1 clip shadow-md">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/login" element={<AuthRedirectProtectedWrapper><LoginPage/></AuthRedirectProtectedWrapper>}/>
          <Route path="/signup" element={<AuthRedirectProtectedWrapper><SignupPage/></AuthRedirectProtectedWrapper>}/>
            <Route path='/user' element={<UserProtectedWrapper><User/></UserProtectedWrapper>}>
              <Route index element={<Dashboard/>}/>
              <Route path='history' element={<HistoryPage/>}/>
              <Route path='examine' element={<ExaminePage/>}/>
              <Route path='examine/:id' element={<ExaminePage/>}/>
              <Route path='profile' element={<ProfilePage/>}/>
            </Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
