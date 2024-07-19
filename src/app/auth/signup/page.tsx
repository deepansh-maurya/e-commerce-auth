"use client";
import Navbar from "components/Navbar";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signup } from "~/app/actions/auth";
const SignupPage = () => {
  const router = useRouter();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
    console.log(formState);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", formState.name);
    formdata.append("email", formState.email);
    formdata.append("password", formState.password);
    const response = await signup(formdata);
    console.log(response);

    router.push(
      `/auth/signup/verify?email=${encodeURIComponent(formState.email)}`
    );
  };

  return (
    <div>
      <Navbar />
      <main className="flex items-center justify-center mt-7 w-[100vw]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center w-[526px] border border-slate-400 h-[530px] rounded-xl gap-5 mt-3"
        >
          <h1 className="text-[32px] font-bold">Create your account</h1>
          <div className="flex flex-col font-medium w-[80%]">
            <label htmlFor="name">Name</label>
            <input
              placeholder="Enter"
              className="border pl-4 border-slate-400 rounded-md h-[40px]"
              type="text"
              name="name"
              id="name"
              value={formState.name}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col font-medium w-[80%]">
            <label htmlFor="email">Email</label>
            <input
              placeholder="Enter"
              className="border pl-4 border-slate-400 rounded-md h-[40px]"
              type="email"
              name="email"
              id="email"
              value={formState.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col font-medium w-[80%] relative">
            <label htmlFor="password">Password</label>
            <input
              className="border pl-4 border-slate-400 rounded-md h-[40px]"
              placeholder="Enter"
              type="password"
              name="password"
              id="password"
              value={formState.password}
              onChange={handleChange}
            />
          </div>
          <button
            className="border text-xl mt-5 font-medium w-[80%] border-slate-400 rounded-md h-[50px] text-white bg-black"
            type="submit"
          >
            Create Account
          </button>
          <div className="w-[80%] bg-slate-400 h-[1px]"></div>
          <div className="flex gap-4">
            <p>Have an Account?</p>
            <a className="font-bold" href="/auth/login">
              LOGIN
            </a>
          </div>
        </form>
      </main>
    </div>
  );
};
export default SignupPage;
