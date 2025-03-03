import React, { useState } from "react"; // Lock icon for security
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { AccountReducer } from "../redux/features/AuthSlice";
import axios from "axios";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!credentials.email || !credentials.password) {
      alert("Please enter your email and password!");
      return;
    }

    try {
      let res = await axios.post(
        "http://localhost:5000/api/auth/login",
        credentials,
        {
          withCredentials: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res);

      dispatch(AccountReducer(res.data));
      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center mt-16">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg flex flex-col items-center border border-white/20 w-[400px]">
        <h2 className="text-2xl font-semibold text-black mb-4">Admin Login</h2>

        {/* Email Input */}
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={credentials.email}
          onChange={handleChange}
          className="w-full text-xl px-5 py-3 mb-4 rounded-lg bg-transparent border-2 border-white/40  outline-none ring-4 ring-blue-500"
        />

        {/* Password Input */}
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={credentials.password}
          onChange={handleChange}
          className="w-full text-xl px-5 py-3 mb-4 rounded-lg bg-transparent border-2 border-white/40  outline-none ring-4 ring-blue-500"
        />

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="mt-3 w-full text-xl font-semibold flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-3 rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl"
        >
          {/* <Lock size={24} /> */}
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
