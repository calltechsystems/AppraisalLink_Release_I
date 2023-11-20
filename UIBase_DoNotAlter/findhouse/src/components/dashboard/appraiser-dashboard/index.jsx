import Header from "../../common/header/dashboard/Header_02";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu_01";
import MobileMenu from "../../common/header/MobileMenu_01";
import Filtering from "./Filtering";
import AllStatistics from "./AllStatistics";
import StatisticsPieChart from "./StatisticsPieChart";
import StatisticsChart from "./StatisticsChart";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const Index = () => {
  let userData ={};
  const router = useRouter();
  const [properties,setProperties] = useState([]);


  const [allProperties , setAllProperties] = useState([]);

  const [chartData , setChartData] = useState([]);

  const [modalIsOpenError , setModalIsOpenError] = useState(false);
  const [errorMessage , setErrorMessage ] = useState("");

  const closeErrorModal =()=>{
    setModalIsOpenError(false);
  }

  


  useEffect(()=>{
    userData =  JSON.parse(localStorage.getItem("user"));
    const data = JSON.parse(localStorage.getItem("user"));
    if (!data) {
      router.push("/login");
    } else if (!data?.brokerage_Details?.firstName) {
      router.push("/appraiser-profile");
    }
    if (!data) {
      router.push("/login");
    }

    let tempId = [];
    const func = ()=>{
    axios.get("/api/appraiserWishlistedProperties",
    {
     headers: {
       Authorization:`Bearer ${data?.token}`,
       "Content-Type":"application/json"
     }
   })
   .then((res) => {
    const tempData = res.data.data.$values;
    const responseData = tempData.filter((prop,index)=>{
      if(prop.userId === data.userId){
        return true;
      }
      else{
        return false;
      }
    })
    tempId =responseData;
    setProperties(responseData);
   })
   .catch((err) => {
     setErrorMessage(err?.response?.data?.error);
     setModalIsOpenError(true);
   });
 }
 func();
},[]);


useEffect(()=>{

  const data = JSON.parse(localStorage.getItem("user"));
  if (!data) {
    router.push("/login");
  } else if (!data?.brokerage_Details?.firstName) {
    router.push("/appraiser-profile");
  }
  if (!data) {
    router.push("/login");
  }
 const func2 = ()=>{
  axios
  .get("/api/getAllListedProperties", {
    headers: {
      Authorization: `Bearer ${data?.token}`,
      "Content-Type": "application/json",
    },
  })
  .then((res) => {
    toast.dismiss();

    const tempData = res.data.data.properties.$values;
    const responseData = tempData.filter((prop) => {
      return properties.some((data) => {
        return data.propertyId === prop.propertyId;
      });
    })
    setAllProperties(responseData);
  })
  .catch((err) => {
    toast.dismiss();
    setErrorMessage(err?.response?.data?.error);
    setModalIsOpenError(true);
  });
}
func2();

  }, [properties]);

  useEffect(()=>{
    const categorizeDataByMonth = (data) => {
      if (data.length === 0) {
          return Array(12).fill(0); // Initialize an array with 12 elements, all initialized to 0.
      }
  
      const currentMonth = new Date().getMonth();
  
      const countsByMonth = Array(currentMonth+1).fill(0);
  
      data.forEach((property) => {
          const createdAtDate = new Date(property.addedDatetime);
          const month = createdAtDate.getMonth();
  
          if (month <= currentMonth) {
              countsByMonth[month]++;
          }
      });
  
      return countsByMonth;
  };
  const temp = categorizeDataByMonth(allProperties);
  setChartData(temp);
 console.log(temp);
  },[allProperties]);
  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header userData={userData} />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      <div className="dashboard_sidebar_menu">
        <div
          className="offcanvas offcanvas-dashboard offcanvas-start"
          tabIndex="-1"
          id="DashboardOffcanvasMenu"
          data-bs-scroll="true"
        >
          <SidebarMenu />
        </div>
      </div>
      {/* End sidebar_menu */}

      {/* <!-- Our Dashbord --> */}
      <section className="our-dashbord dashbord bgc-f7 pb50">
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12 maxw100flex-992">
              <div className="row">
                {/* Start Dashboard Navigation */}
                {/* <div className="col-lg-12">
                  <div className="dashboard_navigationbar dn db-1024">
                    <div className="dropdown">
                      <button
                        className="dropbtn"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#DashboardOffcanvasMenu"
                        aria-controls="DashboardOffcanvasMenu"
                      >
                        <i className="fa fa-bars pr10"></i> Dashboard Navigation
                      </button>
                    </div>
                  </div>
                </div> */}
                {/* End Dashboard Navigation */}

                <div
                  className=""
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems:'center'
                  }}
                >
                  <div className="breadcrumb_content style2">
                    <h2 className="breadcrumb_title">
                      {userData?.brokerage_Details
                        ? `${userData?.brokerage_Details?.firstName} ${userData?.brokerage_Details?.lastName}`
                        : ""}
                    </h2>
                    <p>We are glad to see you again!</p>
                  </div>
                  <div>
                    <Filtering />
                  </div>
                </div>
              </div>
              {/* End .row */}

              <div className="row">
                <AllStatistics properties={properties.length} views={0} bids={0} wishlist={0} />
              </div>
              {/* End .row Dashboard top statistics */}

              <div className="row">
              <div className="col-xl-6">
              <div className="application_statics">
                <h4 className="mb-4">View Statistics</h4>
                {chartData.length > 0 ? (
                  <StatisticsChart data={chartData} />
                ) : (
                  <StatisticsChart data={chartData}/> // You can replace this with a loading indicator
                )}
              </div>
            </div>
            <div className="col-xl-6">
              <div className="application_statics">
                <h4 className="mb-4">View Statistics</h4>
                {chartData.length > 0 ? (
                 <StatisticsPieChart data = {chartData}/>
                ) : (
                 <StatisticsPieChart data={chartData}/> // You can replace this with a loading indicator
                )}
                {modalIsOpenError && (
                  <div className="modal">
                    <div className="modal-content" style={{borderColor:"orangered",width:"20%"}}>
                      <h3 className="text-center" style={{color:"orangered"}}>Error</h3>
                      <div style={{borderWidth:"2px",borderColor:"orangered"}}><br/></div>
                      <h5 className="text-center">
                        {errorMessage}
                      </h5>
                      <div
                        className="text-center"
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        
              
                        <button
                          className="btn w-35 btn-white"
                          onClick={()=>closeErrorModal()}
                          style={{borderColor:"orangered",color:"orangered"}}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

                {/* End statistics chart */}

                {/*<div className="col-xl-5">
                  <div className="recent_job_activity">
                    <h4 className="title mb-4">Recent Activities</h4>
                    <Activities />
                  </div>
                </div>*/}
              </div>
              {/* End .row  */}

              <div className="row mt50">
                <div className="col-lg-12">
                  <div className="copyright-widget text-center">
                    <p>&copy; {new Date().getFullYear()} Appraisal Link. All Rights Reserved.</p>
                  </div>
                </div>
              </div>
              {/* End .row */}
            </div>
            {/* End .col */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
