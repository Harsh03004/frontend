import React, { useContext, useState } from 'react'
import { Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";

import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";
import userContext from '../context/user/userContext';

function RegisterPage()  {
  const [credentials, setCredentials] = useState({name: "", email: "", password: "", username: ""});

  const {registerUser} = useContext(userContext)


const handleSubmit = async (e) => {
    e.preventDefault();
    registerUser(credentials)};

  const onChange = (e) => { 
    setCredentials({ ...credentials, [e.target.name]: e.target.value }) };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
            group-hover:bg-primary/20 transition-colors"
              >
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">Get started with your free account</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  id='name'
                    name='name'
                  className={`input input-bordered w-full pl-10`}
                  placeholder="John Doe"
                  value={credentials.name}
                    onChange={onChange}
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Username</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  name ='username'
                  id='username'
                  value={credentials.username}
                  onChange={onChange}
                  placeholder='john_doe'
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  name='email'
                  id='email'
                  className={`input input-bordered w-full pl-10`}
                  placeholder="you@example.com"
                  value={credentials.email}
                  onChange={onChange} 
                />
             
              </div>

              <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type="password"
                  id='password'
                    name='password' 
                  className={`input input-bordered w-full pl-10`}
                  value={credentials.password}
                  onChange={onChange}
                  placeholder='*********'
                  autoComplete='current-password'
                  required
                />
              </div>
            </div>
            </div>
            
            <button
              type="submit"
              className="btn btn-primary w-full"
            > Create Account 
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* right side */}

      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  )
 }


export default RegisterPage;