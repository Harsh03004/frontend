import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';

function ForgotPassword() {
    // const [email, setEmail] = useState("");
    // const [newPassword, setNewPassword] = useState("");
    // const [confirmPassword, setConfirmPassword] = useState("");
    //
    // const handlePasswordReset = (e) => {
    //     e.preventDefault();
    //     if (newPassword != confirmPassword) {
    //         alert("Passwords do not match");
    //         return;
    //     }
    //     alert("Password has been reset successfully");
    // };
    // return (
    //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
    //         <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
    //             <h2 className="text-2xl font-bold text-gray-900 text-center">Reset Password</h2>
    //             <p className="text-gray-600 text-center mb-6">Enter your details to reset your password</p>
    //             <form onSubmit={handlePasswordReset} className="space-y-6">
    //                 <div className="relative">
    //                     <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
    //                     <input
    //                         type="email"
    //                         name="email"
    //                         value={email}
    //                         onChange={(e) => setEmail(e.target.value)}
    //                         className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
    //                         placeholder="you@example.com"
    //                         required
    //                     />
    //                 </div>
    //                 <div className="relative">
    //                     <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
    //                     <input
    //                         type="password"
    //                         name="newpassword"
    //                         value={newPassword}
    //                         onChange={(e) => setNewPassword(e.target.value)}
    //                         className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
    //                         placeholder="New Password"
    //                         required
    //                     />
    //                 </div>
    //
    //                 <div className="relative">
    //                     <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
    //                     <input
    //                         type="password"
    //                         name="confirmpassword"
    //                         value={confirmPassword}
    //                         onChange={(e) => setConfirmPassword(e.target.value)}
    //                         className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
    //                         placeholder="Confirm Password"
    //                         required
    //                     />
    //                 </div>
    //
    //                 <button type="submit" className="w-full py-2.5 px-4 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700">
    //                     Reset Password
    //                 </button>
    //             </form>
    //         </div>
    //     </div>
    //
    // )
};

export default ForgotPassword;