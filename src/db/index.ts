import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  generateCategories();
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();
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

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
