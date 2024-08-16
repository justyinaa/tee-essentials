import React, { useEffect, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setProducts } from "../../redux/actions/productActions";
import SearchResults from "../../components/Search/SearchResults";
import { ShopContext } from "../../context/ShopContext";
import Filter from "../../components/Filter/Filter";

const Homepage: React.FC = () => {
  const [screenSize, setScreenSize] = useState<number>(window.innerWidth);
  const [activePage, setActivePage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [productsPerPage, setProductsPerPage] = useState<number>(16);
  const [displayedProducts, setDisplayedProducts] = useState<any[]>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [sortOption, setSortOption] = useState<string>("default");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const { searchResults }: any = useContext(ShopContext);
  const api = "https://dummyjson.com/products";

  const dispatch = useDispatch();

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
    screenSize >= 768 ? setProductsPerPage(16) : setProductsPerPage(8);
  }, [screenSize]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        const fetchedProducts = data.products;
        dispatch(setProducts(fetchedProducts));

        setAllProducts(fetchedProducts);
        setTotalPages(Math.ceil(fetchedProducts.length / productsPerPage));
        setDisplayedProducts(fetchedProducts.slice(0, productsPerPage));
      });
  }, [productsPerPage, dispatch]);

  useEffect(() => {
    let filteredProducts = [...allProducts];

    // Apply category filter
    if (categoryFilter) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === categoryFilter
      );
    }

    // Apply sorting
    if (sortOption === "price-asc") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    setTotalPages(Math.ceil(filteredProducts.length / productsPerPage));
    setDisplayedProducts(
      filteredProducts.slice(
        (activePage - 1) * productsPerPage,
        activePage * productsPerPage
      )
    );
  }, [sortOption, categoryFilter, productsPerPage, activePage, allProducts]);

  const handleNextPage = () => {
    if (activePage < totalPages) {
      setActivePage(activePage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (activePage > 1) {
      setActivePage(activePage - 1);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    setActivePage(pageNumber);
  };

  // Calculate the count of filtered products
  const filteredProductsCount = allProducts.filter(
    (product) => !categoryFilter || product.category === categoryFilter
  ).length;

  return (
    <>
      <main>
        <Filter
          setSortOption={setSortOption}
          setCategoryFilter={setCategoryFilter}
          setProductsPerPage={setProductsPerPage}
          totalProducts={filteredProductsCount}
          productsPerPage={productsPerPage}
          activePage={activePage}
          filteredProductsCount={filteredProductsCount} // Pass filtered count to Filter
        />
        {!searchResults ? (
          <div className="products allProducts">
            {displayedProducts.map((product, index) => (
              <div className="productdiv" key={index}>
                <Link to={`/products/${product.id}`}>
                  <div className="img-container">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="product-img"
                    />
                  </div>
                  <div id="productLinks">
                    <h4 className="productTitle">{product.title}</h4>
                    <h3 className="productPrice">Rs. {product.price}</h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <SearchResults />
        )}
      </main>

      <div className="numbers">
        {activePage > 1 && (
          <button className="numberDesign" onClick={handlePreviousPage}>
            Previous
          </button>
        )}
        {[...Array(totalPages).keys()].map((pageNumber) => (
          <button
            key={pageNumber + 1}
            className={`numberDesign1 ${
              activePage === pageNumber + 1 ? "active" : ""
            }`}
            onClick={() => handlePageClick(pageNumber + 1)}
          >
            {pageNumber + 1}
          </button>
        ))}

        <button
          className="numberDesign"
          disabled={activePage === totalPages}
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Homepage;
