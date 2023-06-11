import React from "react";
import "../../components/SubHeader/SubHeader.css";

const SubHeader = ( { filterFood }) => {
  return (
    <>
      <div className="container ">
        <div className=" nav-list">
         

          

          <button id="all" onClick={() => filterFood("all")}> All</button>
          <button id="Chicken" onClick={() => filterFood("Chicken")}>
            Chicken
          </button>
          <button id="Fish" onClick={() => filterFood("Fish")}>
            Fish
          </button>
          <button id="Mutton" onClick={() => filterFood("Mutton")}>
            Mutton
          </button>
          <button id="SeaFood" onClick={() => filterFood("SeaFood")}>
            Sea Food
          </button>
          <button id="Egg" onClick={() => filterFood("Egg")}>
            Egg
          </button>
        </div>
      </div>
    </>
  );
};

export default SubHeader;
