import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Table } from "react-bootstrap";
// import SideNav from "./side-nav";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useAuth } from "../context/auth";

// import Loader from "../components/UI/Loader";

const AllUsers = () => {
  const[load,setLoad] = useState(false)
  const [auth ] = useAuth();
  const [customers, setCustomers] = useState([]);

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
          <Table style={{color: "rgb(108, 108, 115)"}}>
            <thead>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>Number</th>
                <th>Email</th>
                {/* <th>Password</th> */}
                <th>Address</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => {
                return (
                  <tr key={c._id} style={{ borderBottom: "1px solid black",width:"50px" }}>
                    <td style={{width:"10px"}} >{c._id}</td>
                    <td >{c.name}</td>
                    <td >{c.number}</td>
                    <td >{c.email}</td>
                    {/* <td >{c.password}</td> */}
                    <td >{c.address}</td>
                    <td >{c.role}</td>
                    <td >
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
