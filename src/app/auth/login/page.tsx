"use client";
import { useState } from "react";
import Navbar from "components/Navbar";
import { login } from "~/app/actions/auth";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);

    let response = await login(formdata);
    console.log(response);
  };

  return (
    <div>
      <Navbar />
      <main className="flex items-center justify-center mt-7 w-[100vw]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center w-[526px] border border-slate-400 h-[530px] rounded-xl gap-4 mt-3"
        >
          <h1 className="text-[32px] font-bold">Login</h1>
          <h2 className="text-[24px] font-semibold">
            Welcome back to ECOMMERCE
          </h2>
          <h3 className="text-[18px]">The next-gen business marketplace</h3>

          <div className="flex flex-col font-medium w-[80%]">
            <label htmlFor="email">Email</label>
            <input
              placeholder="Enter"
              className="border pl-4 border-slate-400 rounded-md h-[40px]"
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col font-medium w-[80%] relative">
            <label htmlFor="password">Password</label>
            <input
              className="border pl-4 border-slate-400 rounded-md h-[40px]"
              placeholder="Enter"
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p
              className="absolute top-[50%] right-[2%] underline cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </p>
          </div>

          <button
            type="submit"
            className="border text-xl font-semibold w-[80%] border-slate-400 rounded-md h-[50px] text-white bg-black"
          >
            Login
          </button>

          <div className="w-[80%] bg-slate-400 h-[1px]"></div>

          <div className="flex gap-4">
            <p>Don’t have an Account?</p>
            <a className="font-bold" href="/auth/signup">
              SIGN UP
            </a>
          </div>
        </form>
      </main>
    </div>
  );
};
export default LoginPage;
