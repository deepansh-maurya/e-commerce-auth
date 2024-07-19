"use client";
import InputBoxes from "components/InputBoxes";
import Navbar from "components/Navbar";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { verifyEmail } from "~/app/actions/auth";
const VerifyPage = () => {
  const [code, setCode] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");
  console.log(email);

  console.log(code, "ert");

  const handleVerifyCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let tempCode = "";
    code.map((data) => {
      tempCode += data;
    });
    let finalCode = Number(tempCode);
    let response;
    if (email) response = await verifyEmail(email, finalCode);

    console.log(response);
    router.push("/auth/login");
  };

  return (
    <div>
      <Navbar />
      <main className="flex items-center justify-center mt-7 w-[100vw] ">
        <form
          onSubmit={handleVerifyCode}
          className="flex flex-col items-center justify-center w-[526px] border border-slate-400  h-[420px] rounded-xl gap-5 mt-8"
        >
          <h1 className="text-[32px] font-bold">Verify your email</h1>
          <h3 className="text-[18px] flex flex-col items-center justify-center ">
            Enter the 8 digit code you have received on
            <p className="font-semibold">{email}</p>
          </h3>
          <div className="flex flex-col  font-medium w-[80%] ">
            <label htmlFor="email">Code</label>
            <div className="flex justify-between gap-1 items-center">
              <InputBoxes setCode={setCode} />
            </div>
          </div>
          <button
            className=" border text-xl mt-5  font-medium w-[80%] border-slate-400 rounded-md h-[50px] text-white bg-black"
            type="submit"
          >
            Verify
          </button>
        </form>
      </main>
    </div>
  );
};

export default VerifyPage;
