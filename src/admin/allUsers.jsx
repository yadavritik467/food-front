import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Table } from "react-bootstrap";
// import SideNav from "./side-nav";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useAuth } from "../context/auth";
import { CartState } from "../context/Context";

// import Loader from "../components/UI/Loader";

const AllUsers = () => {
  const[load,setLoad] = useState(false)
  const [auth ] = useAuth();
  const [customers, setCustomers] = useState([]);

   //--------------------------------------------------------------------------------  search filter

   const {
    searchState: { searchQuery },
    searchDispatch
  } = CartState();


   const CustomerID = () =>{
    let customer = customers;
    if (searchQuery) {
      customer = customer.filter((data) => {
        return data._id.toLowerCase().includes(searchQuery);
      });
    }
    return customer;
   }

  const getAllCustomers = async () => {
    try {
      setLoad(true);
      const { data } = await axios.get("https://food-backend-zeta.vercel.app/auth/getUser");
      setLoad(false);
      if (data) {
        // console.log(data.user);
        setCustomers(data.user);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
      setLoad(false)
    }
  };
  useEffect(() => {
    getAllCustomers()
  }, []);

  //   handle delete

  const handleDelete = async(id) => {

    try {
      setLoad(true);
      const { data } = await axios.delete(`https://food-backend-zeta.vercel.app/auth/delete-users?id=${id}`);
      setLoad(false);
      if(data){
       toast.success(data.message)
      }
      getAllCustomers()
      
    } catch (error) {
      console.log(error);
     toast.error("something went wrong in deleting user");
     setLoad(false)
    }
  };

  return (
    <  >
    {/* {load && <Loader/>} */}
      <div id="user" style={{borderTop:"1px solid black", overflowX:"scroll"}} >
        {/* <SideNav /> */}

        {auth.user.role === "admin" && (<div  className="" style={{ width: "100%", height:"86vh", overflowY:"scroll", padding: "0 25px" }}>
        <input
        onChange={(e) => {
          searchDispatch({
            type: "FILTER_BY_SEARCH",
            payload: e.target.value,
          });
        }}
        style={{width:"100%",margin:"10px 0",borderRadius:"5px", border:"1px solid grey" }}
        type="text"
        placeholder="Search customer ID"
      />
          <Table style={{color: "rgb(108, 108, 115)"}}>
            <thead>
              <tr>
                <th style={{border:"1px solid grey"}}> Customer ID</th>
                <th style={{border:"1px solid grey"}}>Name</th>
                <th style={{border:"1px solid grey"}}>Number</th>
                <th style={{border:"1px solid grey"}}>Email</th>
                {/* <th style={{border:"1px solid grey"}}>Password</th> */}
                <th style={{border:"1px solid grey"}}>Address</th>
                <th style={{border:"1px solid grey"}}>Role</th>
                <th style={{border:"1px solid grey"}}></th>
              </tr>
            </thead>
            <tbody>
              {CustomerID().map((c) => {
                return (
                  <tr key={c._id} style={{ borderBottom: "1px solid grey",width:"50px" }}>
                    <td style={{width:"10px",userSelect:"all",border:"1px solid grey"}} >{c._id}</td>
                    <td style={{border:"1px solid grey"}} >{c.name}</td>
                    <td style={{border:"1px solid grey"}}>{c.number}</td>
                    <td style={{border:"1px solid grey"}} >{c.email}</td>
                    {/* <td >{c.password}</td> */}
                    <td style={{border:"1px solid grey"}} >{c.address}</td>
                    <td style={{border:"1px solid grey"}}>{c.role}</td>
                    <td style={{border:"1px solid grey"}} >
                        <RiDeleteBin5Line style={{  fontSize:"20px",cursor:"pointer"}} onClick={(e) => handleDelete(c._id)} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>)}
        
      </div>
    </>
  );
};

export default AllUsers;
