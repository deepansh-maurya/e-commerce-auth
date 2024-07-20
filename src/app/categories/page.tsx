"use client";
import { IoCheckbox } from "react-icons/io5";
import { Toaster, toast } from "react-hot-toast";
import Navbar from "components/Navbar";
import { changeCategories, getCategories } from "../actions/user";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { filterCategories } from "~/utils/category";

export type CategoriesObject = {
  id: number;
  name: string;
  checked?: boolean;
};
export type CategoriesArray = CategoriesObject[];
type MyCategories = {
  categoryId: number;
  id: number;
  userId: number;
};
const Categories = () => {
  const router = useRouter();
  const [activePage, setActivePage] = useState<number>(4);
  const [totalPages, settotalPages] = useState<number[]>([]);
  const [currentPages, setCurrentPages] = useState<number[]>([]);
  const [categories, setCategories] = useState<CategoriesArray>([]);
  const [toMapCategories, setTOMapCatgories] = useState<CategoriesArray>([]);

  const fetchCategories = async () => {
    const response = await getCategories();

    if (!response.success) router.push("/auth/login");

    let myCategories: MyCategories[] = [];
    let categories: CategoriesObject[] = [];
    if (response.myCategories && response.categories) {
      myCategories = response.myCategories;
      categories = response.categories;
    }

    if (categories && myCategories) {
      const tempCategories: CategoriesObject[] = [];
      categories.map((data, index) => {
        index < 7 ? tempCategories.push(data) : null;
      });
      setTOMapCatgories(tempCategories);
      categories.map((data) => {
        myCategories.map((myData) => {
          if (myData.categoryId == data.id) {
            data.checked = true;
          }
        });
      });
      setCategories(categories);

      const totalPages: number[] = [];
      for (let i = 0; i < Math.ceil(categories.length / 7); i++) {
        totalPages.push(i + 1);
      }
      settotalPages(totalPages);
      const currentPages: number[] = [];
      totalPages.map((data, index) => {
        if (index < 7) currentPages.push(data);
      });
      setCurrentPages(currentPages);
    }
  };

  const handlePageDown = () => {
    const tempCurrentPages = [...currentPages];
    const newCurrentPages: number[] = [];
    if (tempCurrentPages && tempCurrentPages[0] != 1) {
      tempCurrentPages.map((data) => newCurrentPages.push(data - 1));
      setCurrentPages(newCurrentPages);
    }
  };

  const handlePageUp = () => {
    const tempCurrentPages = [...currentPages];
    const newCurrentPages: number[] = [];
    if (
      tempCurrentPages &&
      tempCurrentPages[tempCurrentPages.length - 1] != 15
    ) {
      tempCurrentPages.map((data) => newCurrentPages.push(data + 1));
      setCurrentPages(newCurrentPages);
    }
  };
  const fetchPageData = (data: number) => {
    const lastIndex = data * 7;
    const firstIndex = lastIndex - 6;

    const filteredCategories = filterCategories(
      firstIndex - 1,
      lastIndex - 1,
      categories
    );
    setTOMapCatgories(filteredCategories);
  };
  useEffect(() => {
    fetchCategories()
      .then(() => {
        console.log("Successfully fetched categories");
      })
      .catch(() => {
        console.log("Failed to fetch categories");
      });
  }, []);
  useEffect(() => {
    fetchPageData(activePage);
  }, [activePage]);

  const handleCategoriesChange = async () => {
    const response = await changeCategories(categories);
  };

  return (
    <div>
      <Navbar />
      <main className="flex items-center justify-center mt-7 w-[100vw]">
        <section className="flex flex-col items-center justify-center w-[500px] border border-slate-400 h-[530px] rounded-xl gap-4 mt-3 ">
          <h1 className="text-[30px] font-bold">Please mark your interests!</h1>
          <h3 className="text-[16px]">We will keep you notified. </h3>

          <div className="relative right-[23%]  h-[300px]">
            <h2 className="text-[23px] font-semibold mb-3  ">
              My saved interests
            </h2>
            {Array.isArray(toMapCategories) &&
              toMapCategories.map((data) => {
                return (
                  <div
                    className="flex items-center  w-[60%] h-[] gap-1 "
                    key={data.id * Math.random()}
                    onClick={async () => {
                      const tempCategories = [...categories];
                      tempCategories.map((cateData) => {
                        if (cateData.name == data.name)
                          cateData.checked = !cateData.checked;
                        return;
                      });
                      setCategories(tempCategories);
                      await handleCategoriesChange();
                    }}
                  >
                    <div className="text-3xl flex gap-1 mb-1  justify-center items-center  ">
                      {data.checked == true ? (
                        <div className="right-[12%] relative">
                          <IoCheckbox />
                        </div>
                      ) : (
                        <div className="w-[25px] h-[26px] relative mb-1  bg-slate-300 rounded-md "></div>
                      )}
                    </div>
                    <p className="  font-medium  text-lg relative bottom-1 ">
                      {data.name}
                    </p>
                  </div>
                );
              })}
          </div>

          <div className=" flex gap-3 cursor-pointer text-xl items-center justify-center font-semibold w-[80%] rounded-md h-[50px] text-black bg-white relative right-[10%]">
            <p
              onClick={() => {
                const tempTotalPages = [...totalPages];
                const newCurrentPages: number[] = [];
                tempTotalPages.map((data, index) => {
                  if (index < 7) newCurrentPages.push(data);
                });
                setCurrentPages(newCurrentPages);
                fetchPageData(1);
              }}
              className="text-slate-400"
            >
              {"<<"}
            </p>
            <div className="flex text-slate-400 gap-3">
              <div
                onClick={() => {
                  handlePageDown();
                  if (activePage > 1) setActivePage(activePage - 1);
                }}
              >
                {currentPages[0] == 1 ? "<" : "< ..."}
              </div>
              {currentPages.map((data) => {
                return (
                  <p
                    key={data}
                    onClick={() => {
                      fetchPageData(data);
                      setActivePage(data);
                    }}
                    className={`${
                      data == activePage ? "text-black" : "text-slate-400"
                    }`}
                  >
                    {data}
                  </p>
                );
              })}
              <div
                onClick={() => {
                  handlePageUp();
                  if (activePage < 15) setActivePage(activePage + 1);
                }}
              >
                {currentPages[6] == 15 ? ">" : "... >"}
              </div>
            </div>
            <p
              onClick={() => {
                const tempTotalPages = [...totalPages];
                const newCurrentPages: number[] = [];
                tempTotalPages.map((data, index) => {
                  if (index >= 8) newCurrentPages.push(data);
                });
                setCurrentPages(newCurrentPages);
                fetchPageData(15);
              }}
              className="text-slate-400"
            >
              {">>"}
            </p>
          </div>
        </section>
      </main>
      <Toaster />
    </div>
  );
};

export default Categories;
