"use client";
import type { CategoriesArray, CategoriesObject } from "../app/categories/page";
export function filterCategories(
  firstIndex: number,
  lastIndex: number,
  categories: CategoriesArray
): CategoriesArray {
  let tempCategories: CategoriesObject[] = [];
  console.log(firstIndex, lastIndex);

  categories.map((data, index) => {
    if (index >= firstIndex && firstIndex <= lastIndex) {
      tempCategories.push(data);
      firstIndex++;
    }
  });

  return tempCategories;
}
