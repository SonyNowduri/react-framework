import {  Grid } from '@material-ui/core';
import React, { useMemo, useState } from 'react';
import searchIcon from '../../../assets/images/adminIcons/search.svg'
import debouce from "lodash.debounce";

const Search = (props) => {
  
console.log(props , "props in search")
    // function onChange(e) {
      
    //     // console.log(e , "event")
    //     props?.search(e)
    //     // e.persist()
    //     // props?.search(e.target.value.toLocaleLowerCase())
    //   }
    
    // const debounceOnChange = React.useCallback(debounce(onChange, 400), []);

    // function debounce(func, wait) {
    //   // e.persist()
    //   console.log(func, wait)
    //     let timeout;
    //     return function (...args) {
    //       const context = this;
    //       if (timeout) clearTimeout(timeout);
    //       timeout = setTimeout(() => {
    //         timeout = null;
    //         func.apply(context, args);
    //       }, wait);
    //     };
    //   }

    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (e) => {

      setSearchTerm(e.target.value);
      console.log(e.target.value, "value");

      props?.search(e.target.value)
    };
  
    const debounceOnChange = useMemo(() => {
      return debouce(handleChange, 500);
    }, []);


    return(
        <Grid className="search-box" 
        // style = {{float:'left' , position : "relative" , right:'140px'}}
        > 
       <input
              id="search"
              type="search"
              className="search-user"
              placeholder="Search"
        onChange={debounceOnChange}
              // onChange = {(e) =>handleChange(e)}
            
            />
    <img className="search-icon"  src={searchIcon} alt={searchIcon} 
     /> 
     </Grid>
    )
}

export default Search;