import React, { useEffect, useState } from "react";
import "./admin.css";
import SideNav from "./side-nav";
import { toast } from "react-hot-toast";
import { RiDeleteBin5Line } from "react-icons/ri";

import axios from "axios";
import { CartState } from "../context/Context";

const FoodProducts = ({ dark }) => {
  // const [load, setLoad] = useState(false)
  const [Foods, setFoods] = useState([]);
  const [image, setImage] = useState("");
  const [items, setItems] = useState({
    title: "",
    price: "",
  });
  
  const options = ["Chicken", "Egg", "Fish", "Mutton", "SeaFood"];
  const [category, setCategory] = useState(options[0]);


  // search filter

  const {
   
    searchState: { searchQuery },
    searchDispatch,
  } = CartState();

  const transformFood = () => { 
    let sortedFood = Foods;
    if (searchQuery) {
      sortedFood = sortedFood.filter((data) => {
        return data.title.toLowerCase().includes(searchQuery);
      });
    }
    return sortedFood;
  };

  

  // set product list

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setItems({
        ...items,
        [e.target.name]: e.target.value,
      });
      console.log(e.target.value);
    }
  };


  const getAllFoods = async () => {
    try {
      const { data } = await axios.get("/items/foods");
      if (data) {
        setFoods(data.food);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in getting food");
    }
  };

  useEffect(() => {
    getAllFoods();
  }, []);

  //  food creation

  let createHandler = async (e) => {
    e.preventDefault();
    try {
      let { data } = await axios.post(
        "/items/create-foods",
        {
          title: items.title,
          price: items.price,

          image,
          category: category,
        },
        { headers: { authorization: localStorage.getItem("userID").token } }
      );
      if (data) {
        toast.success("item created successfully");
        getAllFoods();
        
      }
   
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

 

  //   handle delete

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/items/delete-foods/${id}`);
      if (data) {
        toast.success(data.message);
        getAllFoods();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in deleting food");
    }
    console.log(id);
  };


  // set carousel

  const [caro, setCaro] = useState([]);

  const getAllCarousel = async (req, res) => {
    const { data } = await axios.get("/caro/caro-get");
    if (data) {
      setCaro(data.caro);
    }
    // console.log(data.caro);
  };

  useEffect(() => {
    getAllCarousel();
  }, []);

  //     Carousel create here

  const carouselHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/caro/caro-update", {
        title: items.title,
        heading: items.title,
        image,
      });

      if (data) {
        // console.log(data.caro);
        toast.success("carousel created successfully");
        getAllCarousel();

      }
    } catch (error) {
      console.log(error);
      toast.error(error.message, error);
    }
  };

  // caro delete

  const caroDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/caro/caro-delete/${id}`);
      if (data) {
        toast.success(data.message);
        getAllCarousel();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in deleting food");
    }
    console.log(id);
  };


  return (
    <div style={{ display: "flex" }}>
      <SideNav />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          height: "640px",
          overflowY: "scroll",
        }}
      >
        <div className=" update-food">
          <form
            action="/items/create-foods"
            onSubmit={createHandler}
            encType="multipart/form-data"
            method="post"
          >
            <h3> Update your item here !!</h3>

            <input
              type="text"
              name="title"
              required={true}
              placeholder="title"
              onChange={handleChange}
            />
            <input
              type="number"
              name="price"
              required={true}
              placeholder="price"
              onChange={handleChange}
            />

{/* -------------------------------------------------------------------------uncomment it later */}
            <input
              type="file"
              name="image"
              required={true}
              files="image"
              accept="image/*"
              onChange={handleChange}
            />
            <select
              name="category"
              id="category"
              onChange={(e) => setCategory(e.target.value)}
              defaultValue={category}
            >
              {options.map((option, idx) => (
                <option key={idx}>{option}</option>
              ))}
            </select>
            <button type="submit" style={{ padding: "5px 10px" }}>
              Update Item
            </button>
            <br />
          </form>
          <form
            action="/items/create-foods"
            onSubmit={carouselHandler}
            encType="multipart/form-data"
            method="post"
          >
            <h3> Update your carousel here !!</h3>

            <input
              type="text"
              name="title"
              required={true}
              placeholder="heading"
              onChange={handleChange}
            />
            <input
              type="text"
              name="heading"
              required={true}
              placeholder="title"
              onChange={handleChange}
            />

            <input
              type="file"
              name="image"
              required={true}
              files="image"
              accept="image/*"
              onChange={handleChange}
            />

            <button type="submit" style={{ padding: "5px 10px" }}>
              Update Item
            </button>
            <br />
          </form>
        </div>
        <div className=" update-food">
          <div
            style={{
              width: "50%",
              height: "550px",
              overflowY: "scroll",
              overflowX: "hidden",
              padding: "0 25px",
              border: "1px solid gray",
            }}
          >
            <div
              style={{
                color: "rgb(108, 108, 115)",
                width: "50%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <input
               onChange={(e) => {
              searchDispatch({
                type: "FILTER_BY_SEARCH",
                payload: e.target.value,
              });
            }} type="text" placeholder="search your item here !!" />
              {transformFood().map((c) => {
                return (
                  <div
                    key={c._id}
                    style={{ borderBottom: "1px solid gray", width: "450px" }}
                  >
                    
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        padding: "5px 0 0 0",
                        // alignItems: "flex-start",
                      }}
                    >
                      <img
                        src={c.image.url}
                      
                        style={{
                          height: "100px",
                          width: "100px",
                          borderRadius: "40px",
                        }}
                        alt=""
                      />
                      <div>
                        <h4>{c.title}</h4>
                        <p>{c.price}</p>
                        <h3>{c.category}</h3>

                        <div style={{ display: "flex", flexDirection: "row" }}>
                          

                        </div>
                      </div>
                          <RiDeleteBin5Line
                            style={{
                              color: "black",
                              fontSize: "40px",
                              cursor: "pointer",
                              padding: "10px",
                            }}
                            onClick={(e) => handleDelete(c._id)}
                          />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
  
          <div className="admin_caro">
            {caro.map((c) => {
              return (
                <div key={c._id}  >
                  <img src={c.image.URL} style={{
                          height: "100px",
                          width: "100px",
                          borderRadius: "40px",
                        }} alt="" />
                  <h3>{c.heading}</h3>
                 <p>{c.title}</p>
                  <RiDeleteBin5Line
                    style={{
                      color: "black",
                      fontSize: "40px",
                      cursor: "pointer",
                      padding: "10px",
                    }}
                    onClick={(e) => caroDelete(c._id)}
                  />
                 
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodProducts;
