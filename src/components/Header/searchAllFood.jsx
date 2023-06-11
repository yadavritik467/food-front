import React, { useState } from "react";
import "../../App.css";

import { CartState } from "../../context/Context";
import Foods from "./foods";

function SearchAllFood({dark, setDark}) {
  const {
    state: { Food },
    searchState: { searchQuery },
  
  } = CartState();

  // const [load, setLoad] = useState(true);




 

  

  const transformFood = () => { 
    let sortedFood = Food;
    if (searchQuery) {
      sortedFood = sortedFood.filter((data) => {
        return data.title.toLowerCase().includes(searchQuery);
      });
    }
    return sortedFood;
  };
  // console.log(searchQuery);
  return (
    <div id="search">

        <div
          id="Chicken"
          className={`border ${!dark ? "border" : "border_1"}  pb-1 m-5`}
        >
         
          <div className="container-fluid">
            <div className="row">
              {transformFood().map((item) => {
                if (item.category === item.category)
                  return (
                    <div
                      className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-2 mb-2 p-2"
                      key={item._id}
                    >
                      <Foods data={item} dark={dark} setDark={setDark} />
                    </div>
                  );
              })}
              {/* {transformFood().map((item) => {
                if (item.category === "Egg")
                  return (
                    <div
                      className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-2 mb-2 p-2"
                      key={item._id}
                    >
                      <Foods data={item} dark={dark} setDark={setDark} />
                    </div>
                  );
              })}
              {transformFood().map((item) => {
                if (item.category === "Fish")
                  return (
                    <div
                      className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-2 mb-2 p-2"
                      key={item._id}
                    >
                      <Foods data={item} dark={dark} setDark={setDark} />
                    </div>
                  );
              })}
              {transformFood().map((item) => {
                if (item.category === "SeaFood")
                  return (
                    <div
                      className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-2 mb-2 p-2"
                      key={item._id}
                    >
                      <Foods data={item} dark={dark} setDark={setDark} />
                    </div>
                  );
              })}
               {transformFood().map((item) => {
                if (item.category === "Mutton")
                  return (
                    <div
                      className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-2 mb-2 p-2"
                      key={item._id}
                    >
                      <Foods data={item} dark={dark} setDark={setDark} />
                    </div>
                  );
              })} */}
            </div>
          </div>
        </div>

    
    </div>
  );
}

export default SearchAllFood;
