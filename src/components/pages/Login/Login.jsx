import { use, useRef, useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { Link, useNavigate, useLocation } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../../../provider/AuthProvider";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const emailRef = useRef(null);
  const [show, setShow] = useState(false);

  const { setUser, logIn, googleLogin, resetPassword } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    logIn(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Logged In Successfully !!");

        // Navigate to desired route or home
        navigate(location.state?.from?.pathname || "/", { replace: true });
      })
      .catch((error) => {
        toast.error(error.message, { autoClose: 2000 });
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Logged in with Google!");
        navigate(location.state?.from?.pathname || "/", { replace: true });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleForgotPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      toast.error("Please enter your email in the email field first.");
      return;
    }
    resetPassword(email)
      .then(() => {
        toast.success("Password reset email sent. Opening Gmail...");
        setTimeout(() => {
          window.open("https://mail.google.com", "_blank");
        }, 1000);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  return (
    <div className="text-color min-h-screen ">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="min-h-[calc(100vh-20px)] flex items-center justify-center relative overflow-hidden">
        <div className="container mx-auto">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 p-6 lg:p-10 ">
            <div className="max-w-lg text-center lg:text-left">
              <h1 className="text-5xl font-extrabold drop-shadow-lg">
                Welcome Back
              </h1>
              <p className="mt-4 text-lg /80 leading-relaxed">
                Sign in to continue your journey. Manage your account, explore
                new features, and more.
              </p>
            </div>

            <div className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8">
              <form onSubmit={handleLogin} className="space-y-5">
                <h2 className="text-2xl font-semibold mb-2 text-center ">
                  Log In
                </h2>

                <div>
                  <label className="block text-sm mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    ref={emailRef}
                    placeholder="example@email.com"
                    className="input input-bordered w-full text-color  focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm mb-1">Password</label>
                  <input
                    type={show ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    className="input input-bordered w-full text-color   focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <span
                    onClick={() => setShow(!show)}
                    className=" absolute right-2 text-black top-9 cursor-pointer z-50"
                  >
                    {show ? <FaEye /> : <IoEyeOff />}
                  </span>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="hover:underline cursor-pointer text-start"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="btn btn-outline btn-primary  w-full font-semibold hover:scale-105 transition-transform duration-200"
                >
                  Login
                </button>

                <div className="flex items-center justify-center gap-2 my-2">
                  <div className="h-px w-16 bg-white/30"></div>
                  <span className="text-sm /70">or</span>
                  <div className="h-px w-16 bg-white/30"></div>
                </div>

                <button
                  onClick={handleGoogleLogin}
                  type="button"
                  className="btn btn-outline btn-primary  w-full font-semibold hover:scale-105 transition-transform duration-200"
                >
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="google"
                    className="w-5 h-5"
                  />
                  Continue with Google
                </button>

                <p className="text-center text-sm /80 mt-3">
                  Don’t have an account?{" "}
                  <Link
                    to="/register"
                    state={{ from: location.state?.from || location }}
                    className="text-pink-300 hover: underline"
                  >
                    Register
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={1000} />
      </div>
    </div>
  );
};

export default Login;
