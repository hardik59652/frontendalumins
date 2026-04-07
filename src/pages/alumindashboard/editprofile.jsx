import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, ShieldCheck, Lock, Bell, ArrowLeft, 
  Save, Eye, EyeOff, Info, Trash2 
} from 'lucide-react';

const AccountSettings = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSecurityUpdate = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("New passwords do not match.");
      return;
    }
    
    setLoading(true);
    try {
      // Backend integration for password update
      const res = await fetch("http://localhost:8000/api/v1/users/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(passwords),
        credentials: "include"
      });

      if (res.ok) {
        alert("Security credentials updated successfully.");
        setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        alert("Verification failed. Please check your current password.");
      }
    } catch (err) {
      console.error("Security Update Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-slate-900 font-sans selection:bg-blue-100">
      
      {/* Formal Top Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate(-1)}
              className="p-1.5 hover:bg-slate-100 rounded text-slate-500 transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="h-6 w-px bg-slate-200"></div>
            <h2 className="font-semibold text-lg text-slate-950 tracking-tight">System Settings</h2>
          </div>
          
          <button 
            form="security-form"
            type="submit"
            disabled={loading}
            className="bg-[#1e3a8a] text-white px-6 py-2 rounded font-semibold text-sm hover:bg-blue-800 transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50"
          >
            {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Save size={16} />}
            Update Security
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Navigation & Summary */}
          <section className="lg:col-span-1 space-y-6">
            <div className="bg-white border border-slate-200 rounded-md p-6 shadow-sm">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Account Control</h3>
              <nav className="space-y-1">
                <SettingsTab icon={<Lock/>} label="Security & Password" active />
                <SettingsTab icon={<User/>} label="Profile Visibility" onClick={() => navigate("/edit-profile")} />
                <SettingsTab icon={<Bell/>} label="Notification Prefs" />
              </nav>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-md p-5">
              <div className="flex gap-3">
                <ShieldCheck size={20} className="text-blue-700 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-blue-900 leading-none">Identity Protection</h4>
                  <p className="text-[11px] text-blue-800 mt-2 font-medium leading-relaxed">
                    Your account is protected with encrypted sessions. Ensure you use a strong password for academic security.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Right Column: Content */}
          <section className="lg:col-span-2 space-y-8">
            
            {/* Password Management Form */}
            <div className="bg-white border border-slate-200 rounded-md p-8 md:p-10 shadow-sm">
              <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-4">
                <Lock size={18} className="text-slate-400" />
                <h3 className="text-sm font-semibold text-[#1e3a8a] uppercase tracking-wider">Change System Password</h3>
              </div>

              <form id="security-form" onSubmit={handleSecurityUpdate} className="max-w-md space-y-6">
                
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-tight">Current Password</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"}
                      name="currentPassword"
                      value={passwords.currentPassword}
                      onChange={handlePasswordChange}
                      required
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 shadow-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-tight">New Password</label>
                  <input 
                    type={showPassword ? "text" : "password"}
                    name="newPassword"
                    value={passwords.newPassword}
                    onChange={handlePasswordChange}
                    required
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 shadow-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-tight">Confirm New Password</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={passwords.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 shadow-sm"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 font-medium">
                  Requirement: At least 8 characters, one uppercase, and one special symbol.
                </p>
              </form>
            </div>

            {/* Danger Zone */}
            <div className="bg-white border border-red-100 rounded-md p-8 md:p-10 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Trash2 size={18} className="text-red-500" />
                <h3 className="text-sm font-semibold text-red-600 uppercase tracking-wider">Account Termination</h3>
              </div>
              <p className="text-xs text-slate-600 font-medium leading-relaxed max-w-xl">
                Deleting your account is permanent. This will remove all your job applications, profile data, and network connections from the alumni system.
              </p>
              <button className="mt-6 px-6 py-2 border border-red-200 text-red-600 rounded text-xs font-bold hover:bg-red-50 transition-colors">
                Deactivate My Account
              </button>
            </div>

          </section>
        </div>
      </main>
    </div>
  );
};

// Helper Tab Component
const SettingsTab = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-sm font-semibold transition-all ${
      active 
      ? 'bg-slate-50 text-[#1e3a8a] border-l-4 border-[#1e3a8a]' 
      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700 border-l-4 border-transparent'
    }`}
  >
    {React.cloneElement(icon, { size: 16 })}
    {label}
  </button>
);

export default AccountSettings;