import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import { BeatLoader } from "react-spinners";
import "../Navbar/navbar.scss"


interface SearchProps {
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { setSearchResults }: any = useContext(ShopContext);
  const navigate = useNavigate();

  // if (!setSearchResults) {
  //   throw new Error("Search must be used within a ShopContextProvider");
  // }

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${query}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setSearchResults(data.products);
      setLoading(false);
    } catch (error) {
      setError("Error fetching data");
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch(searchQuery);
    onSearch(searchQuery);
    navigate(`/search/${searchQuery}`);
    setSearchQuery("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleChange}
          id="searchInput"
        />
      </form>

      <div>
        {loading && <div ><BeatLoader className="beat"/></div>}
        {error && <div>{error}</div>}
      </div>
    </>
  );
};

export default Search;
