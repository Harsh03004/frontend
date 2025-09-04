import React, { useState, useContext } from 'react';
import userContext from '../context/user/userContext';
import { X, User, Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

const EditProfileModal = ({ user, onClose }) => {
    const { updateUser, changePassword } = useContext(userContext);
    const [activeTab, setActiveTab] = useState('profile');
    const [formData, setFormData] = useState({
        fullname: user.fullname || '',
        email: user.email || '',
    });
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handlePasswordChange = (e) => setPasswordData({ ...passwordData, [e.target.name]: e.target.value });

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        const success = await updateUser(formData);
        if (success) onClose();
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            return toast.error("New passwords do not match.");
        }
        const success = await changePassword(passwordData);
        if (success) onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-[#1F2937] text-white rounded-xl w-full max-w-md p-6 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <X />
                </button>
                <div className="flex border-b border-gray-700 mb-6">
                    <button onClick={() => setActiveTab('profile')} className={`py-2 px-4 font-semibold ${activeTab === 'profile' ? 'border-b-2 border-indigo-500 text-white' : 'text-gray-400'}`}>
                        Edit Profile
                    </button>
                    <button onClick={() => setActiveTab('password')} className={`py-2 px-4 font-semibold ${activeTab === 'password' ? 'border-b-2 border-indigo-500 text-white' : 'text-gray-400'}`}>
                        Change Password
                    </button>
                </div>

                {activeTab === 'profile' && (
                    <form onSubmit={handleProfileSubmit} className="space-y-4">
                        <h3 className="text-xl font-bold">Update Information</h3>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Full Name</label>
                            <input type="text" name="fullname" value={formData.fullname} onChange={handleFormChange} className="input input-bordered w-full bg-[#2b3a4e]" required />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Email Address</label>
                            <input type="email" name="email" value={formData.email} onChange={handleFormChange} className="input input-bordered w-full bg-[#2b3a4e]" required />
                        </div>
                        <button type="submit" className="btn btn-primary w-full bg-indigo-600">Save Changes</button>
                    </form>
                )}

                {activeTab === 'password' && (
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                        <h3 className="text-xl font-bold">Change Your Password</h3>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Current Password</label>
                            <input type="password" name="oldPassword" value={passwordData.oldPassword} onChange={handlePasswordChange} className="input input-bordered w-full bg-[#2b3a4e]" required />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">New Password</label>
                            <input type="password" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} className="input input-bordered w-full bg-[#2b3a4e]" required />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Confirm New Password</label>
                            <input type="password" name="confirmPassword" value={passwordData.confirmPassword} onChange={handlePasswordChange} className="input input-bordered w-full bg-[#2b3a4e]" required />
                        </div>
                        <button type="submit" className="btn btn-primary w-full bg-indigo-600">Update Password</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default EditProfileModal;