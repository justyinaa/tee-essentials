import React, { useEffect, useState } from "react";
import "./Filter.scss";
import filter1 from "../../../src/assets/filter1.png";
import filter2 from "../../../src/assets/filter2.png";
import filter3 from "../../../src/assets/filter3.png";

interface FilterProps {
  activePage: number;
  setSortOption: (option: string) => void;
  setCategoryFilter: (category: string) => void;
  setProductsPerPage: (count: number) => void;
  totalProducts: number;
  productsPerPage: number;
  filteredProductsCount: number; // New prop to get the count of filtered products
}

const Filter: React.FC<FilterProps> = ({
  activePage,
  setSortOption,
  setCategoryFilter,
  setProductsPerPage,
  productsPerPage,
  filteredProductsCount,
}) => {
  const [screenSize, setScreenSize] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (screenSize >= 768) {
      setProductsPerPage(16);
    } else {
      setProductsPerPage(8);
    }
  }, [screenSize, setProductsPerPage]);

  const start = (activePage - 1) * productsPerPage + 1;
  const end = Math.min(activePage * productsPerPage, filteredProductsCount);

  return (
    <div className="filter">
      <div className="filterDiv1">
        <img src={filter1} alt="" className="filterImgs" />
        <p>Filter</p>
        <img src={filter2} alt="" className="filterImgs" />
        <img src={filter3} alt="" className="filterImgs" />
        <p className="sortParagraph">
          <span className="sortParagraphSpacing">
            Showing {start} - {end} of {filteredProductsCount}
          </span>
        </p>
      </div>
      <div className="filterDiv2">
        <p>
          Show{" "}
          <span>
            {screenSize < 768 ? (
              <button
                className="sortCount"
                onClick={() => setProductsPerPage(8)}
              >
                8
              </button>
            ) : (
              <button
                className="sortCount"
                onClick={() => setProductsPerPage(16)}
              >
                16
              </button>
            )}
          </span>
        </p>
        <p className="sortBy">
          Sort by{" "}
          <span>
            <select
              name="sort"
              id="sort"
              className="select"
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="price-asc">Lowest to Highest</option>
              <option value="price-desc">Highest to Lowest</option>
            </select>
          </span>
        </p>
        <p>
          Filter by{" "}
          <span>
            <select
              name="category"
              id="category"
              className="select"
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="beauty">Beauty</option>
              <option value="furniture">Furniture</option>
              <option value="groceries">Groceries</option>
              <option value="fragrances">Fragrances</option>
            </select>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Filter;
