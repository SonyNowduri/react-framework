import React from "react";
import { useState, useMemo, useEffect } from "react";
import debouce from "lodash.debounce";
import './search.css'




export const SearchInput = (props) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (e) => {
      setSearchTerm(e.target.value);
      console.log(e.target.value, "value");

      props?.searchFilter(e.target.value)
    };
  
    const debouncedResults = useMemo(() => {
      return debouce(handleChange, 500);
    }, []);
  
    useEffect(() => {
    //   return () => {
    //     debouncedResults.cancel();
    //   };
    },[]);
  

    return (
        <div className="wrapperSerach">

        <input type="text" className="SearchBoxWrap" placeholder="Search" onChange={debouncedResults}>
        </input>
        </div>
    )
}