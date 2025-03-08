import './App.css'
import { StateProvider } from './Context API/StateContext'
import ErrorRoute from './Components/Pages/ErrorRoute'
import { BrowserRouter, Routes, Route } from "react-router-dom"


function App() {
 return <StateProvider>
    <BrowserRouter>
        <Routes>
            {/* <Route path='/' element = {<Landing/>}/>
            <Route path='/signin' element = {<Signin/>}/>
            <Route path='/signup' element = {<Signup/>}/>
            <Route path='/home' element = {<Dashboard/>}/>
            <Route path='/share/:shareId' element = {<SharedBrain/>}/>*/}
            <Route path='*' element = {<ErrorRoute/>}/> 
        </Routes>
    </BrowserRouter>
 </StateProvider>
}
export default App