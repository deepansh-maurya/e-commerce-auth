import Navbar from "components/Navbar";
import { getCategories } from "../actions/user";

const Categories = async () => {
  const categories = await getCategories();
  console.log(categories.categories, "found");

  return (
    <div>
      <Navbar />
    </div>
  );
};

export default Categories;
