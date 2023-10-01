"use client";
import Image from "next/image";
import properties from "../../../data/properties";
import { useEffect, useState } from "react";

import Link from "next/link";
import axios from "axios";
import { encryptionData } from "../../../utils/dataEncryption";
const TableData = ({userData}) => {

  const [Id,setId] = useState(-1);
  const [toggle,setToggle] = useState(false);
 
  const [data , setData] = useState([]);

  // const [userInfo , setUserInfo] = useState(userData);

  // useEffect(()=>{
  //   const fetchData = ()=>{
  //     const data =(JSON.parse(localStorage.getItem("user")))
  //     if (data) {
  //     setUserInfo(data);
  //     }
  //   }
  //   const response =  fetchData();
  // },[]);

  // console.log(userData);

  let theadConent = [
    "Property Title",
    "Date",
    "Status",
    "Bids",
    "Action",
  ];

  useEffect(()=>{
    
    const payload = {
      token : userData.token
    };

    // console.log(payload);

    const data = (JSON.parse(localStorage.getItem("user")));

    axios
      .get("/api/getAllProperties",
       {
        headers: {
          Authorization:`Bearer ${data.token}`,
          "Content-Type":"application/json"
        }
        
      })
      .then((res) => {
        // console.log(res.data.data.properties.$values);
        setData(res.data.data.properties.$values);
      })
      .catch((err) => {
        alert(err.message);
      });
  },[]);

  const toggleDropdownDiv = (item)=>{
  };

  let tbodyContent = data?.map((item,key) => (
    <>
    <tr key={item.id}>
      <td scope="row">
       {/* <div className="feat_property list favorite_page style2" >
          {/*<div className="thumb">
            <Image
              width={150}
              height={220}
              className="img-whp cover"
              src={item.img}
              alt="fp1.jpg"
            />
            <div className="thmb_cntnt">
              <ul className="tag mb0">
                <li className="list-inline-item">
                  <a href="#">For Rent</a>
                </li>
              </ul>
            </div>
         </div> */}
          <div className="details">
            <div className="tc_content">
              <h4>{item.title}</h4>
              <p>
                <span className="flaticon-placeholder"></span>
                {item.area} {item.city} {item.state} {item.zipCode}
              </p>
              <Link className="fp_price text-thm" href="#">
                ${item.bidLowerRange} - ${item.bidUpperRange}
                <small>/estimated</small>
              </Link>
            </div>
          </div>
      </td>
      {/* End td */}

      <td>{item?.addedDatetime}</td>
      {/* End td */}

      <td>
        <span className="status_tag badge">Pending</span>
      </td>
      {/* End td */}

      <td>2,345</td>
      {/* End td */}

      <td>
        <ul className="view_edit_delete_list mb0">
          <li
            className="list-inline-item"
            data-toggle="tooltip"
            data-placement="top"
            title="View"
          >
            <Link href={"/my-properties"} >
              <span className="flaticon-view"></span>
            </Link>
          </li>
          <li 
            className="list-inline-item"
            data-toggle="tooltip"
            data-placement="top"
            title="Edit"
          >
            <Link href={`/create-listing/${item.propertyId}`} >
              <span className="flaticon-edit"></span>
            </Link>
          </li>
          {/* End li */}

          <li
            className="list-inline-item"
            data-toggle="tooltip"
            data-placement="top"
            title="Delete"
          >
            <Link href="#">
              <span className="flaticon-garbage"></span>
            </Link>
          </li>
        </ul>  
      </td>
      {/* End td */}
    </tr>
    { Id === key ?<tr>property data </tr>:""}
    </>
  ));

  return (
    <>
      <table className="table">
        <thead className="thead-light">
          <tr>
            {theadConent.map((value, i) => (
              <th scope="col" key={i}>
                {value}
              </th>
            ))}
          </tr>
        </thead>
        {/* End theaad */}

        <tbody>{tbodyContent}</tbody>
      </table>
    </>
  );
};

export default TableData;
