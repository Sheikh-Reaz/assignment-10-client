import React, { useState, use } from "react";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../../provider/AuthProvider";
import { GiPartyPopper } from "react-icons/gi";
import { Helmet } from "react-helmet-async";


const Register = () => {
  const{createUser,setUser,updateUser,googleLogin} = use(AuthContext);
  const [show, setShow] = useState(false);
  const navigate = useNavigate()
  const validatePassword = (password) => {
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter.";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters long.";
  }
  return null;
};

  const handleRegister = (e) => {
    e.preventDefault()
    // console.log(e.target)
    const form = e.target
    const userName = form.name.value
    const email = form.email.value
    const photoUrl = form.photo.value
    const password = form.password.value
      // --- Password validation ---
  const validationError = validatePassword(password);
  if (validationError) {
    toast.error(validationError);
    return;
  }
    // console.log({userName,email,password,photoUrl})
    createUser(email,password)
    .then((result) => {
    const user = result.user;
    // console.log(user)
    updateUser({displayName:userName,photoURL:photoUrl }).then(()=>{
      
    setUser({...user,displayName:userName,photoURL:photoUrl})
    navigate("/")
    })
    .catch((error)=>{
      console.log(error)
      setUser(user)
      
    })
    toast.success("User Created Successfully !!");
  })
  .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
    }
    const handleGoogleLogin = () => {
  googleLogin()
    .then((result) => {
      const user = result.user;
      setUser(user);
      toast.success("Logged in with Google!");
      navigate("/");
    })
    .catch((error) => {
      toast.error(error.message);
    });
};

 
  return (
    <div className="text-color" >
            <Helmet>
              <title>Register</title>
            </Helmet>
      <div className="min-h-[96vh] flex items-center justify-center relative overflow-hidden">
        {/* Animated floating circles */}
        {/* <div className="absolute inset-0">
          <div className="absolute w-72 h-72 bg-pink-400/30 rounded-full blur-2xl top-10 left-10 animate-pulse"></div>
          <div className="absolute w-72 h-72 bg-purple-400/30 rounded-full blur-2xl bottom-10 right-10 animate-pulse"></div>
        </div> */}

        {/* Left side text secction */}

        <div className="container mx-auto">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 p-6 lg:p-10 text-color">
            <div className="max-w-lg text-center lg:text-left">
              <h1 className="text-5xl font-extrabold drop-shadow-lg">
                Create Your Account
              </h1>
              <p className="mt-4 text-lg text-color leading-relaxed">
              <GiPartyPopper /> Welcome to ToyTopia!
Join our world of fun and imagination.
Create your account and start your toy adventure today!
              </p>
            </div>

            {/* Right side form secction */}

            <div className="w-full max-w-md backdrop-blur-lg /10 border border-white/20 shadow-2xl rounded-2xl p-8">
              <h2 className="text-2xl font-semibold mb-6 text-center ">
                Register Now !
              </h2>
              {/* Form Start  */}
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="name"
                    className="input input-bordered w-full bg-white/20  placeholder-white/60 focus:outline-none focus:ring-2 focus:black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Photo URL
                  </label>
                  <input
                    type="text"
                    name="photo"
                    placeholder="example.com"
                    className="input input-bordered w-full bg-white/20  placeholder-white/60 focus:outline-none focus:ring-2 focus:black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="example@email.com"
                    className="input input-bordered w-full bg-white/20  placeholder-white/60 focus:outline-none focus:ring-2 focus:black"
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium mb-1">
                    Password
                  </label>
                  <input
                    type={show ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    className="input input-bordered w-full bg-white/20  placeholder-white/60 focus:outline-none focus:ring-2 focus:black"
                  />
                  <span
                    onClick={() => setShow(!show)}
                    className="absolute right-2 top-9 cursor-pointer z-50"
                  >
                    {show ? <FaEye /> : <IoEyeOff></IoEyeOff>}
                  </span>
                </div>

                <button
                  type="submit"
                  className="btn btn-outline btn-primary  w-full   font-semibold  hover:scale-105 transition-transform duration-200"
                >
                  Register
                </button>
                <button
  type="button"
  onClick={handleGoogleLogin}    
  className="btn btn-outline btn-primary  w-full   font-semibold  hover:scale-105 transition-transform duration-200"
>
  <img
    src="https://www.svgrepo.com/show/475656/google-color.svg"
    alt="google"
    className="w-5 h-5"
  />
  Continue with Google
</button>


                <div className="text-center mt-3">
                  <p className="text-sm ">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-pink-600 hover:text-color font-medium underline"
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </form>
              
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};


export default Register;
