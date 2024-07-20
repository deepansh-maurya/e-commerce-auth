"use server";
import { CategoriesArray } from "../categories/page";
import client from "../../db/index";
import { verifySession } from "../_lib/session";
export async function getCategories() {
  try {
    const response = await verifySession();
    const { success } = response;

    if (!success) {
      return { success: false, message: "unauthorized user" };
    }
    const categories = await client.category.findMany();
    const myCategories = await client.userCategory.findMany({
      where: {
        userId: response.user?.id,
      },
    });

    return {
      success: true,
      message: "categories found",
      categories,
      myCategories,
    };
  } catch (error) {
    return { message: "something went wrong", error };
  }
}
type CategoryType = {
  id: number;
  name: string;
  checked?: boolean;
};
export async function changeCategories(categories: CategoriesArray) {
  try {
    console.log(categories);

    const response = await verifySession();
    const { success } = response;
    if (!success) {
      return { success: false, message: "unauthorized user" };
    }
    const userId = response.user?.id;
    if (!userId) {
      return { success: false, message: "User ID is missing" };
    }
    const allCategories: CategoryType[] = await client.category.findMany();
    console.log(allCategories);

    if (allCategories) {
      categories.map((data, index) => {
        if (data.checked && allCategories[index]) {
          allCategories[index].checked = true;
        }
      });
    }
    console.log(allCategories);

    await client.userCategory.deleteMany({
      where: {
        userId: userId,
      },
    });

    await Promise.all(
      allCategories.map(async (data, index) => {
        if (data.checked) {
          let res = await client.userCategory.create({
            data: {
              userId: userId,
              categoryId: data.id,
            },
          });
          console.log(res);
        }
      })
    );
    return { success: true, message: "Categories updated successfully" };
  } catch (error) {
    return { success: false, message: "An error occurred" };
  }
}
