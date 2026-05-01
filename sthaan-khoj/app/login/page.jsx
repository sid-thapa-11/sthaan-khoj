import Link from "next/link";

export default function Login() {
  return (
    <main
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#FDF6EC" }}
    >
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">
            <span style={{ color: "#8B1A1A" }}>स्थान</span>
            <span style={{ color: "#F4A623" }}>खोज</span>
          </h1>
          <p className="text-gray-500 mt-2">Login to your account</p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-orange-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-orange-400"
            />
          </div>

          <button
            style={{ backgroundColor: "#8B1A1A" }}
            className="w-full py-3 rounded-xl text-white font-bold hover:opacity-90 transition mt-2"
          >
            Login
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-2">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Google Login */}
          <button className="w-full py-3 rounded-xl border border-gray-200 font-medium text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-2">
            <span>🔵</span> Continue with Google
          </button>
        </div>

        {/* Signup Link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link href="/signup" style={{ color: "#8B1A1A" }} className="font-bold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}