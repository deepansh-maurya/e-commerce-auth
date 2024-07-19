"use server";
import { SignupFormSchema } from "../_lib/definitions";
import { LoginFormSchema } from "../_lib/definitions";
import bcrypt from "bcrypt";
import client from "../../db/index";
import { createSession } from "../_lib/session";
import { emailservice } from "~/utils/emailService";
export async function signup(formdata: FormData) {
  console.log(formdata);

  const validatedFields = SignupFormSchema.safeParse({
    name: formdata.get("name"),
    email: formdata.get("email"),
    password: formdata.get("password"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const min = 10000000;
  const max = 99999999;
  const signupCode = Math.floor(Math.random() * (max - min + 1)) + min;

  const { name, email, password } = validatedFields.data;
  const response = await emailservice(email, signupCode);
  console.log(response);

  if (!response) {
    return {
      success: false,
      message: "Failed to send signup code, please try again.",
    };
  }
  const hashpassword = await bcrypt.hash(password, 10);
  const user = await client.user.create({
    data: {
      name,
      password: hashpassword,
      email,
      signupCode,
    },
    select: {
      email: true,
      name: true,
    },
  });

  if (!user) {
    return {
      success: false,
      message: "An error occurred while creating your account.",
    };
  }
  return { success: true, message: "verify email to sign up", user };
}
export async function verifyEmail(email: string, code: number) {
  try {
    const user = await client.user.findUnique({
      where: {
        email,
        signupCode: code,
      },
    });
    if (!user) {
      await client.user.delete({
        where: {
          email,
        },
      });
      return { success: false, message: "invalid code try again" };
    }
    return { success: true, message: "signed up successfully", user };
  } catch (error) {
    return { success: false, message: "somhing went wrong" };
  }
}

export async function login(formdata: FormData) {
  console.log(formdata);

  const validatedFields = LoginFormSchema.safeParse({
    email: formdata.get("email"),
    password: formdata.get("password"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { email, password } = validatedFields.data;

  const user = await client.user.findUnique({
    where: {
      email,
    },
  });
  console.log(user);

  if (!user) return { message: "unauthorized user" };
  let hashpassword = await bcrypt.compare(password, user.password);
  console.log(hashpassword);

  if (hashpassword) await createSession(user);
  else return { success: false, message: "wrong password" };
  return {
    message: "User loged in succesfully",
    user,
  };
}
