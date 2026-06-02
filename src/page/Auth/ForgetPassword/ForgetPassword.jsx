import { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 gap-10 flex-wrap">
      {/* Card */}

      <div className="md:block hidden">
        <img src="/Auth/forgot.png" alt="Forgot Password" className="" />
      </div>

      <div className="w-full max-w-md border border-[#fecd38] rounded-lg p-10 bg-black/40 shadow-lg">

        {/* Back + Title */}
        <div className="flex items-center gap-2 mb-3">
          <Link to="/auth/login" className="text-gray-400 hover:text-[#fecd38] transition-colors">
            <IoIosArrowBack className="text-xl" />
          </Link>
          <h1 className="text-white text-3xl font-medium">Forgot Password</h1>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed mb-7">
          Enter the email address associated with your account. We'll send you
          a verification code to your email.
        </p>

        {/* Divider */}
        <div className="border-t border-[#fecd38]/30 mb-7" />

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-6">
            <label className="font-semibold text-white block mb-2" htmlFor="email">
              Email
            </label>
            <div className="flex items-center border border-[#fecd38] rounded-md px-3 gap-2 focus-within:ring-1 focus-within:ring-[#fecd38] transition-all">
              <HiOutlineMail className="text-[#fecd38] text-lg shrink-0" />
              <input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 bg-transparent text-white placeholder-gray-500 focus:outline-none text-sm"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full p-2.5 bg-[#fecd38] font-semibold text-black rounded-md hover:bg-yellow-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? "Sending..." : "Send Verification Code"}
          </button>
        </form>

        {/* Back to login */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Remember your password?{" "}
          <Link
            to="/auth/login"
            className="text-[#fecd38] hover:text-orange-500 transition-colors font-semibold"
          >
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgetPassword;