import { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import OTPInput from "react-otp-input";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleMatchOtp = () => {
    if (otp.length < 6) return;
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const handleResend = () => {
    console.log("Resend code");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 gap-10 flex-wrap">
      {/* Card */}

      <div className="md:block hidden">
        <img src="/Auth/login.png" alt="" />
      </div>
      {/* Card */}
      <div className="w-full max-w-md border border-[#fecd38] rounded-lg p-10 bg-black/40 shadow-lg">

        {/* Back + Title */}
        <div className="flex items-center gap-2 mb-3">
          <Link
            to="/auth/forget-password"
            className="text-gray-400 hover:text-[#fecd38] transition-colors"
          >
            <IoIosArrowBack className="text-xl" />
          </Link>
          <h1 className="text-white text-3xl font-medium">Verify OTP</h1>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed mb-7">
          We sent a verification code to your email. Check your inbox and enter
          the code below.
        </p>

        {/* Divider */}
        <div className="border-t border-[#fecd38]/30 mb-7" />

        {/* OTP Inputs */}
        <div className="flex justify-center mb-8">
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderInput={(props) => (
              <input
                {...props}
                style={{}}
                className="!w-11 !h-12 mx-1.5 bg-transparent border-b-2 border-[#fecd38]/40 focus:border-[#fecd38] text-white text-xl font-bold text-center outline-none transition-colors"
              />
            )}
          />
        </div>

        {/* Verify Button */}
        <button
          onClick={handleMatchOtp}
          disabled={isLoading || otp.length < 6}
          className="w-full p-2.5 bg-[#fecd38] font-semibold text-black rounded-md hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Verifying..." : "Verify"}
        </button>

        {/* Resend */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-gray-400 text-sm">Didn't receive code?</p>
          <button
            onClick={handleResend}
            className="text-[#fecd38] hover:text-orange-500 transition-colors text-sm font-semibold"
          >
            Resend Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default Otp;