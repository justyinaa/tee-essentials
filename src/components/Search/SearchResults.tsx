import React, { useEffect, useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";

const SearchResults: React.FC = () => {
  const { query } = useParams<{ query: string }>();
  const { searchResults, setSearchResults }: any = useContext(ShopContext);
  const [currentPage] = useState(1);
  const [, setTotalPages] = useState(1);

  useEffect(() => {
    if (query) {
      fetchSearchResults(query, currentPage);
    } else {
      setSearchResults([]);
    }
  }, [query, currentPage]);

  const fetchSearchResults = async (query: string, page: number) => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${query}&limit=10&skip=${
          (page - 1) * 10
        }`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.products.length === 0) {
        setSearchResults([]);
      } else {
        setSearchResults(data.products);
        setTotalPages(Math.ceil(data.total / 10));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setSearchResults([]);
    }
  };

  // const handlePageChange = (newPage: number) => {
  //   setCurrentPage(newPage);
  // };

  return (
    <div>
      {searchResults && searchResults.length > 0 ? (
        <>
          {searchResults.map((product: any) => (
           
            <div className="productdiv">
               <Link key={product.id} to={`/products/${product.id}`}>
                <div className="img-container">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="product-img"
                  />
                </div>
                <div id="productLinks">
                  <div className="productTitle">{product.title}</div>
                  <div className="productPrice">Rs. {product.price}</div>
                </div>
                </Link>
              </div>
            
          ))}
        </>
      ) : (
        <div className="noResults">Oops! No results found</div>
      )}
    </div>
  );
};

export default SearchResults;
