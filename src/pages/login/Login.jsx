import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Eye, EyeOff, ShieldCheck, User } from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Role-based logic
    if (data.email.toLowerCase() === "admin@gmail.com") {
      navigate("/admin-dashboard");
    } else {
      navigate("/alumindashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4 relative overflow-hidden">
      
      {/* Background Decorative Blurs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full blur-[120px] opacity-50" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-100 rounded-full blur-[120px] opacity-50" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white p-8 md:p-10 z-10"
      >
        {/* Branding/Heading */}
        <div className="text-center mb-10">
          <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
            <ShieldCheck className="text-white" size={32} />
          </div>
          <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">
            Welcome <span className="text-blue-600">Back</span>
          </h2>
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-2">
            VGEC Alumni Portal Login
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          
          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
            <div className="flex items-center bg-gray-50 rounded-2xl px-4 border border-transparent focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white transition-all group">
              <Mail className="text-gray-400 group-focus-within:text-blue-600 transition-colors" size={18} />
              <input
                name="email"
                type="email"
                placeholder="name@example.com"
                onChange={handleChange}
                required
                className="w-full py-4 pl-3 bg-transparent outline-none font-bold text-sm text-gray-700 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
            <div className="flex items-center bg-gray-50 rounded-2xl px-4 border border-transparent focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white transition-all group relative">
              <Lock className="text-gray-400 group-focus-within:text-blue-600 transition-colors" size={18} />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                onChange={handleChange}
                required
                className="w-full py-4 pl-3 bg-transparent outline-none font-bold text-sm text-gray-700 placeholder:text-gray-400"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-blue-600 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Role Helper Text (Subtle) */}
          <p className="text-[10px] text-gray-400 font-medium italic text-center px-4">
            Use <span className="font-bold text-blue-500">admin@gmail.com</span> for Admin access.
          </p>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-blue-200 flex items-center justify-center gap-2 active:bg-blue-800 transition-all"
          >
            Sign In <ArrowRight size={18} />
          </motion.button>

        </form>

        {/* Bottom Navigation */}
        <div className="text-center mt-8 space-y-2">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            New to the network?{" "}
            <a href="/register" className="text-blue-600 hover:underline transition-all">
              Create Account
            </a>
          </p>
          <p className="text-[9px] font-medium text-gray-300 uppercase tracking-tighter">
            VGEC Alumni Association © 2026
          </p>
        </div>

      </motion.div>
    </div>
  );
}

export default Login;