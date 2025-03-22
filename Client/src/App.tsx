import './App.css'
import { StateProvider } from './Context API/StateContext'
import ErrorRoute from './Pages/ErrorRoute'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Home from './Pages/Home'
import LandingPage from './Pages/LandingPage'
import SubmitHandler from './Pages/SubmitHandler'
import Results from './Components/Results'
function App() {
 return <StateProvider>
    <BrowserRouter>
        <Routes>
            {/*<Route path='/signup' element = {<Signup/>}/>
            <Route path='/home' element = {<Dashboard/>}/>
            <Route path='/share/:shareId' element = {<SharedBrain/>}/>*/}
            <Route path='/' element = {<LandingPage/>}/>
            <Route path='/home' element = {<Home/>}/>
            <Route path='/signin' element = {<Login/>}/>
            <Route path='/signup' element = {<Signup/>}/>
            <Route path='/share/:shareId' element = {<SubmitHandler/>}/>
            <Route path='/result' element = {<Results/>}/>
            <Route path='*' element = {<ErrorRoute/>}/> 
        </Routes>
    </BrowserRouter>
 </StateProvider>
}
export default App