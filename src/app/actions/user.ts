import client from "../../db/index";
import { verifySession } from "../_lib/session";
export async function getCategories() {
  try {
    const response = await verifySession();
    const { success } = response;
    console.log(response);

    if (!success) {
      return { message: "unauthorized user" };
    }
    const categories = await client.category.findMany();

    return { message: "categories found", categories };
  } catch (error) {
    return { message: "something went wrong" };
  }
}
