import { CiShoppingCart } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
const Navbar = () => {
  return (
    <nav className="w-[100vw] h-[60px] text-black">
      <div className="h-[45%] w-[100%]   ">
        <div className="flex gap-5 absolute right-10 text-sm">
          <p>Help</p>
          <p>Orders & Returns</p>
          <p>Hi, John</p>
        </div>
      </div>
      <div className="h-[45%] w-[100%] flex items-center justify-between">
        <h1 className="text-3xl font-bold relative left-10 mb-2">ECOMMERCE</h1>
        <ul className="flex gap-4 font-bold">
          <li>Categories</li>
          <li>Sale</li>
          <li>Clearance</li>
          <li>New stock</li>
          <li>Trending</li>
        </ul>

        <div className="flex text-2xl relative right-10 gap-5   ">
          <div>
            <CiSearch />
          </div>
          <div>
            <CiShoppingCart />
          </div>
        </div>
      </div>
      <div className=" w-[100%] gap-8 bg-slate-100 m flex items-center justify-center">
        <p className="my-1">{"<"}</p>{" "}
        <p className="my-1">Get 10% off on business sign up</p>{" "}
        <p className="my-1">{">"}</p>
      </div>
    </nav>
  );
};

export default Navbar;
