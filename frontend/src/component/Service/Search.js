import React, { useState, Fragment } from "react";
import MetaData from "../layout/MetaData";
import "./Search.css";

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/services/${keyword}`);
    } else {
      history.push(`/home`);
    }
  };

  return (
    <Fragment>
      <MetaData title="Search Services" />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search Your Desired Service ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;