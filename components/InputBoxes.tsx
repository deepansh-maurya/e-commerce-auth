"use client";
import React, { useRef, ChangeEvent, KeyboardEvent, useState } from "react";
interface ChildComponentProps {
  setCode: React.Dispatch<React.SetStateAction<string[]>>;
}
const InputBoxes: React.FC<ChildComponentProps> = ({ setCode }) => {
  const [codes, setCodes] = useState<string[]>([]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    if (value.length === 1) {
      let codesArr = codes;
      codesArr?.push(e.target.value);
      setCodes(codesArr);
      console.log(codesArr);
      setCode(codesArr);
      const nextInput = inputRefs.current[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      const currentInput = e.target as HTMLInputElement;
      if (currentInput.value === "") {
        let codeArr = codes;
        codeArr.pop();
        setCodes(codeArr);
        const prevInput = inputRefs.current[index - 1];
        if (prevInput) {
          prevInput.focus();
        }
      } else {
        let codeArr = codes;
        codeArr.pop();
        setCodes(codeArr);
        currentInput.value = "";
      }
    }
  };
  return (
    <div className="flex space-x-2">
      {[...Array(8)].map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          className=" border pl-4  border-slate-400 rounded-md w-[50px]  h-[50px]"
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
    </div>
  );
};

export default InputBoxes;