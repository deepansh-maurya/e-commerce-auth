import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function generateCategories() {
  try {
    for (let i = 0; i < 100; i++) {
      const categoryName = faker.commerce.department();
      const categories = await prisma.category.create({
        data: {
          name: categoryName,
        },
      });
      console.log(categories);
    }
  } catch (error) {
    console.log(error);
  }
}

export default prisma;
function callGenerateCategories() {
  generateCategories()
    .then(() => {
      console.log("category genrated");
    })
    .catch(() => {
      console.log("failed to genrate categories");
    });
}
callGenerateCategories();
