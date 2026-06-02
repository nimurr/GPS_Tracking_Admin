import { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { HiOutlineLockClosed, HiEye, HiEyeOff } from "react-icons/hi";

const PasswordField = ({ label, placeholder, value, onChange }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="mb-5">
      <label className="font-semibold text-white block mb-2">{label}</label>
      <div className="flex items-center border border-[#fecd38] rounded-md px-3 gap-2 focus-within:ring-1 focus-within:ring-[#fecd38] transition-all">
        <HiOutlineLockClosed className="text-[#fecd38] text-lg shrink-0" />
        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full p-2 bg-transparent text-white placeholder-gray-500 focus:outline-none text-sm"
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="text-gray-400 hover:text-[#fecd38] transition-colors shrink-0"
        >
          {show ? <HiEyeOff className="text-lg" /> : <HiEye className="text-lg" />}
        </button>
      </div>
    </div>
  );
};

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!password || !confirmPassword) {
      setError("Both fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 gap-10 flex-wrap">
      {/* Card */}

      <div className="md:block hidden">
        <img src="/Auth/login.png" alt="" />
      </div>
      
      <div className="w-full max-w-md border border-[#fecd38] rounded-lg p-10 bg-black/40 shadow-lg">

        {/* Back + Title */}
        <div className="flex items-center gap-2 mb-3">
          <Link
            to="/auth/login"
            className="text-gray-400 hover:text-[#fecd38] transition-colors"
          >
            <IoIosArrowBack className="text-xl" />
          </Link>
          <h1 className="text-white text-3xl font-medium">Update Password</h1>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed mb-7">
          Enter your new password below. Make sure it's strong and secure.
        </p>

        {/* Divider */}
        <div className="border-t border-[#fecd38]/30 mb-7" />

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <PasswordField
            label="New Password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <PasswordField
            label="Confirm Password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error && (
            <p className="text-red-500 text-xs mb-4 -mt-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full p-2.5 bg-[#fecd38] font-semibold text-black rounded-md hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-1"
          >
            {isLoading ? "Updating..." : "Update Password"}
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

export default NewPassword;