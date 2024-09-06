import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import { BeatLoader } from "react-spinners";
import "../Navbar/navbar.scss";

interface SearchProps {
  onSearch: (query: string) => void; 
}
const Search: React.FC<SearchProps> = () => {
  const [value, setValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const { setSearchResults }: any = React.useContext(ShopContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSuggestions = async (query: string) => {
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
      setSuggestions(data.products.slice(0, 5));
      setLoading(false);
    } catch (error) {
      setError("Error fetching data");
      setLoading(false);
    }
  };

  const onSuggestionsFetchRequested = ({ value }: any) => {
    if (value) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion: any) => suggestion.title;

  const renderSuggestion = (suggestion: any) => (
    <div className="autosuggest__suggestion">{suggestion.title}</div>
  );

  const handleChange = (_event: any, { newValue }: any) => {
    setValue(newValue);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch(value);
    navigate(`/search/${value}`);
    setValue("");
  };

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

  const inputProps = {
    placeholder: "Search",
    value,
    onChange: handleChange,
    className: "autosuggest__input", // Adding class for styling
  };

  return (
    <div className="autosuggest__container">
      <form onSubmit={handleSubmit}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          theme={{
            container: "autosuggest__container",
            suggestionsContainer: "autosuggest__suggestions-container",
            suggestionHighlighted: "autosuggest__suggestion--highlighted",
          }}
        />
      </form>

      <div className="beatloader">
        {loading && (
          <div>
            <BeatLoader className="beat" />
          </div>
        )}
        {error && <div>{error}</div>}
      </div>
    </div>
  );
};

export default Search;
