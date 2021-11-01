import React from "react";

const Search = ({value, onSearch}) => (
    <div>
        <label htmlFor="search">Search: </label>
        <input id="search" type="text" value={value} onChange={onSearch}/>
    </div>
);

export default Search;