
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Input from "../Components/Input";
import { CgProfile } from "react-icons/cg";
import { IoKey } from "react-icons/io5";
const Login: React.FC = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  async function login() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      alert("Please provide both username and password.");
      return;
    }

    try {
      const response = await axios.post("https://localhost:3000/api/v1/signin", {
        username,
        password
      });


      localStorage.setItem("token", response.data.token);
      alert("Signed In");
      navigate("/home");
    } catch (error) {

      if (axios.isAxiosError(error) && error.response?.status === 403) {
        alert("Login Failed - Incorrect Credentials");
      } else {
        alert("An unexpected error occurred.");
        console.error(error);
      }
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-15 lg:px-8 relative">
    <h2 className="absolute top-0 left-4 text-xl sm:text-2xl md:text-2xl font-bold mt-8 mr-8 text-gray-800">GradeGenie</h2>

      <div className="bg-white p-4  sm:p-28 md:p-10 rounded-lg shadow-lg w-full max-w-md ">

        <h3 className="text-lg sm:text-xl md:text-3xl font-bold mb-4 sm:mb-6 text-center">Welcome Back</h3>

        <div className="mb-4">
          <div className="block text-gray-700 text-sm font-bold mb-2 flex items-center" >
            <CgProfile className= "text-black text-2xl mr-2"/>
             Username
          </div>
          <Input
            label=""
            type="text"
            placeholder="Username"
            inputRef={usernameRef}
          />
        </div>
        <div className="mb-6">
          <div className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
            <IoKey className= "text-black text-2xl mr-2"/>
            Password
          </div>
          <Input
            label=""
            type="password"
            placeholder="******************"
            inputRef={passwordRef}
          />
        </div>
        <div className="flex flex-col space-y-4">
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm sm:text-base transition duration-200"
            type="button"
            onClick={login}
          >
            Log In
          </button>
          <div className="text-center">
            <p className="text-gray-600 text-sm sm:text-base">
              Don't have an account? {" "}
              <a href="/signup" className="text-blue-500 hover:text-blue-800 transition duration-200">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;