import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Exemple from "./Exemple";

const SearchData = ({setModalIsOpenError ,setUpdatedCode, setErrorMessage}) => {

  const [data , setData] = useState([]);

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"));

    axios.get("/api/getAllBids",{
      headers : {
        Authorization : `Bearer ${user.token}`
      }
    })
    .then((res)=>{
      const tempData = res.data.data.result.$values;

      const response = tempData.filter((item,idex)=>{
        if(item.userId === user.userId){
          return true;
        }
        else{
          return false;
        }
      })

      setData(response);
    })
    .catch((err)=>{
      toast.dismiss();
      // toast.error("Reload the page")
      setErrorMessage("Technical error , Reload the page !");
      setModalIsOpenError(true);
    })
  },[]);


  function getPrettifiedDate(dateString) {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    return date.toLocaleString(undefined, options);
  }
  
  return (
    <>
    {/*<table className="table">
      <thead className="thead-light">
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Description</th>
          <th scope="col">Bid Amount</th>
          <th scope="col">Proposed Amount</th>
          <th scope="col">Status</th>
        </tr>
      </thead>

      <tbody>
      {data.map((bid, index) => (
        <tr key={index}>
          <td>{getPrettifiedDate(bid.requestTime)}</td>
          <td>{bid.description ? bid.description : "NA"}</td>
          <td>${bid.bidLowerRange} - ${bid.bidUpperRange}</td>
          <td>${bid.bidAmount}</td>
          <td>
            {bid.status === 0 ? <span className="status_tag badge">Pending</span> : <span className="status_tag badge2">Completed</span>}
          </td>
        </tr>
      ))}
       
      </tbody>
    </table>
  */}
  {data && (<Exemple 
    setErrorMessage={setErrorMessage}
    setModalIsOpenError={setModalIsOpenError}
    setUpdatedCode={setUpdatedCode}
    />)}
    </>
  );
};

export default SearchData;
