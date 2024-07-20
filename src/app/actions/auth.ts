"use server";
import { SignupFormSchema } from "../_lib/definitions";
import { LoginFormSchema } from "../_lib/definitions";
import bcrypt from "bcrypt";
import client from "../../db/index";
import { createSession } from "../_lib/session";
import { emailservice } from "~/utils/emailService";
export async function signup(formdata: FormData) {
  try {
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
        id: true,
        email: true,
        name: true,
      },
    });
    console.log(user);

    if (!user) {
      return {
        success: false,
        message: "An error occurred while creating your account.",
      };
    }
    return { success: true, message: "verify email to sign up", user };
  } catch (error) {
    return { success: false, message: "something went wrong" };
  }
}
export async function verifyEmail(email: string, code: number | null) {
  try {
    const user = await client.user.findUnique({
      where: {
        email: email,
        signupCode: code,
      },
      select: {
        id: true,
        name: true,
        email: true,
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
    await client.user.update({
      where: {
        email,
      },
      data: {
        signupCode: null,
      },
    });
    return { success: true, message: "signed up successfully", user };
  } catch (error) {
    return { success: false, message: "somhing went wrong" };
  }
}

export async function login(formdata: FormData) {
  try {
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
    if (!user) return { message: "unauthorized user", success: false };
    const hashpassword = await bcrypt.compare(password, user.password);

    if (hashpassword) await createSession(user);
    else return { success: false, message: "wrong password" };
    return {
      message: "User loged in succesfully",
      user,
      success: true,
    };
  } catch (error) {
    return { success: false, message: "something went wrong" };
  }
}
