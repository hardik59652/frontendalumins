import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [registeredName, setRegisteredName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({
            email: data.email,
            password: data.password
          })
        }
      );

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        const user = result.data?.user;


        if (user?.role === "admin") {
          navigate("/admin-dashboard", { replace: true });
        } else if (user?.role === "alumni") {
          navigate("/alumni-dashboard", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      } else {
        alert(result.message || "Login failed");
      }
    } catch (error) {
      console.log("LOGIN ERROR:", error);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center font-sans text-gray-800 p-4">
      <div className="w-full max-w-md bg-white p-8 shadow-sm border border-gray-200">
        <div className="mb-8 border-b border-gray-200 pb-4 text-center">
          <h2 className="text-2xl font-bold text-blue-900 uppercase tracking-wide">

            {registeredName ? `Welcome, ${registeredName}` : "Alumni Login"}
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Secure access to the VGEC Alumni Portal
          </p>
        </div>

        {errorMsg && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-6 text-sm">
            {errorMsg}
          </div>

        )}
        <form onSubmit={handleLogin}>
          <div className="mb-5">
            <label className="block text-sm font-medium mb-1 text-gray-700">Email Address</label>
            <input
              name="email"
              type="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your registered email"
              required

              className="w-full border border-gray-300 p-2.5 focus:outline-none focus:border-blue-500 text-sm"

            />

          </div>



          <div className="mb-6">

            <div className="flex justify-between items-center mb-1">

              <label className="block text-sm font-medium text-gray-700">Password</label>

              <a href="#" className="text-xs text-blue-600 hover:underline">Forgot password?</a>

            </div>

            <div className="relative">

              <input

                name="password"

                type={showPassword ? "text" : "password"}

                value={data.password}

                onChange={handleChange}

                placeholder="Enter your password"

                required

                className="w-full border border-gray-300 p-2.5 pr-10 focus:outline-none focus:border-blue-500 text-sm"

              />

              <button

                type="button"

                onClick={() => setShowPassword(!showPassword)}

                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 hover:text-blue-600 font-medium"

              >

                {showPassword ? "HIDE" : "SHOW"}

              </button>

            </div>

          </div>



          <button

            type="submit"

            disabled={loading}

            className={`w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-4 shadow-sm transition-colors uppercase text-sm tracking-wider ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}

          >

            {loading ? "Authenticating..." : "Login to Portal"}

          </button>



        </form>



        <div className="mt-8 pt-6 border-t border-gray-100 text-center">

          <p className="text-sm text-gray-600">

            Don't have an account?{" "}

            <Link to="/register" className="text-blue-700 font-semibold hover:underline">

              Register here

            </Link>

          </p>

        </div>



      </div>



      <div className="mt-6 text-center text-xs text-gray-400">

        &copy; 2026 VGEC Alumni Association. All rights reserved.

      </div>



    </div>

  );

}



export default Login;