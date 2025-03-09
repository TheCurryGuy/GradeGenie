import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../Components/Input";

const Signup: React.FC = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const initialpassRef = useRef<HTMLInputElement>(null);
  const firstnameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function signup() {
    const firstname = firstnameRef.current?.value;
    const lastname = lastnameRef.current?.value;
    const username = usernameRef.current?.value;
    const initialpassword = initialpassRef.current?.value;
    const finalpass = passwordRef.current?.value;

    if (!firstname || !lastname || !username || !initialpassword || !finalpass) {
      alert("Please fill in all fields.");
      return;
    }

    if (initialpassword !== finalpass) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/v1/signup", {
        firstName: firstname,
        lastName: lastname,
        username: username,
        password: finalpass,
      });
      alert("Signup Successful!");
      navigate("/signin");
    } catch (error: any) {
      console.error(error);
      if (error.response && error.response.status === 409) {
        alert("Signup Failed: Username already exists!");
      } else {
        alert("Signup Failed: An unexpected error occurred.");
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <div className="text-center">
            <h2 className="text-3xl font-bold font-mono text-gray-900 mb-2">GradeGenie</h2>
            <h3 className="text-xl font-semibold text-gray-700 mb-6">Create an Account</h3>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); signup(); }}>
          <Input label="FirstName" type="text" placeholder="Your first name" inputRef={firstnameRef} />
          <Input label="LastName" type="text" placeholder="Your last name" inputRef={lastnameRef} />
          <Input label="Username" type="email" placeholder="you@example.com" inputRef={usernameRef} />
          <Input label="Password" type="password" placeholder="Enter password" inputRef={initialpassRef} />
          <Input label="Confirm Password" type="password" placeholder="Re-enter password" inputRef={passwordRef} />

          <div className="mt-8">
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Already have an account? <a href="/signin" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;