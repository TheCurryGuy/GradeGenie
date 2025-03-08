import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup: React.FC = () => {

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const initialpassRef = useRef<HTMLInputElement>(null);
  const firstnameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function signup(){
    const firstname = firstnameRef.current?.value;
    const lastname = lastnameRef.current?.value;
    const username = usernameRef.current?.value;
    const initialpassword = initialpassRef.current?.value;
    const finalpass = passwordRef.current?.value;
    if(initialpassword !== finalpass){
      alert("Incorrect Password! Try Again")
      return
    } else{
      try{
        await axios.post("http://localhost:3000/api/v1/signup", {
          firstName : firstname,
          lastName : lastname,
          username : username,
          password : finalpass 
        })
        alert("Signed Up")
        navigate("/signin")
      } catch(e){
        console.error(e)
        alert("Signup Failed User Exists!")
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">GradeGenie</h2>
        <h3 className="text-2xl font-bold mb-6 text-center">Create an Account</h3>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
              FirstName
            </label>
            <input
              ref = {firstnameRef}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="FirstName"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
              lastName
            </label>
            <input
              ref = {lastnameRef}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="LastName"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Username / Email
            </label>
            <input
              ref = {usernameRef}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              ref={initialpassRef}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              ref = {passwordRef}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button" onClick={signup}
            >
              Sign Up
            </button>
          </div>
        <div className="mt-6 text-center">
          <p className="text-gray-600">Already have an account? <a href="/signin" className="text-blue-500 hover:text-blue-800">Log in</a></p>
        </div>
        
      </div>
    </div>
  );
};

export default Signup;