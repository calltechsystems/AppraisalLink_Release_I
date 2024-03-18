import Header from "../../common/header/dashboard/HeaderBrokerage";
import SidebarMenu from "../../common/header/dashboard/SidebarMenuBrokerage";
import MobileMenu from "../../common/header/MobileMenu_02";
import Filtering from "./Filtering";
import AllStatistics from "./AllStatistics";
import StatisticsChart from "./StatisticsChart";
import StatisticsPieChart from "./StatisticsPieChart";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toast";

import axios from "axios";
import Modal from "../../common/header/dashboard/NotificationModal";

const Index = () => {
  const [userData, setUserData] = useState({});
  const [showNotification, setShowNotification] = useState(false);
  const [data, setData] = useState([]);
  const [bids, setBids] = useState([]);
  const [unfilteredData, setUnfilteredData] = useState([]);
  const [showLineGraph, setShowLineGraph] = useState(false);
  const [filterQuery, setFilterQuery] = useState("Weekly");
  const [wishlist, setWishlist] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [acceptedBids, setAcceptedBids] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const router = useRouter();

  const closeModal = () => {
    setShowNotification(false);
  };

  const [lastActivityTimestamp, setLastActivityTimestamp] = useState(
    Date.now()
  );

  useEffect(() => {
    const activityHandler = () => {
      setLastActivityTimestamp(Date.now());
    };

    // Attach event listeners for user activity
    window.addEventListener("mousemove", activityHandler);
    window.addEventListener("keydown", activityHandler);
    window.addEventListener("click", activityHandler);

    // Cleanup event listeners when the component is unmounted
    return () => {
      window.removeEventListener("mousemove", activityHandler);
      window.removeEventListener("keydown", activityHandler);
      window.removeEventListener("click", activityHandler);
    };
  }, []);

  useEffect(() => {
    // Check for inactivity every minute
    const inactivityCheckInterval = setInterval(() => {
      const currentTime = Date.now();
      const timeSinceLastActivity = currentTime - lastActivityTimestamp;

      // Check if there has been no activity in the last 10 minutes (600,000 milliseconds)
      if (timeSinceLastActivity > 600000) {
        localStorage.removeItem("user");
        router.push("/login");
      }
    }, 60000); // Check every minute

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(inactivityCheckInterval);
  }, [lastActivityTimestamp]);

  // if (!userData) {
  //   router.push("/login");
  // } else if (!userData?.broker_Details?.firstName) {
  //   router.push("/my-profile");
  // }

  const categorizeDataByMonth = (data) => {
    if (data.length <= 0) return [];
    // Initialize an object to store data by month
    const dataByMonth = {};

    const currentMonth = new Date().getMonth();

    data.forEach((property) => {
      const createdAtDate = new Date(property.createdAt);
      const month = createdAtDate.getMonth();
      if (month <= currentMonth) {
        if (!dataByMonth[month]) {
          dataByMonth[month] = [];
        }
        dataByMonth[month].push(property);
      }
    });

    const categorizedData = Object.entries(dataByMonth)?.map(
      ([month, properties]) => ({
        month: parseInt(month, 10),
        properties,
      })
    );

    categorizedData.sort((a, b) => a.month - b.month);

    return categorizedData;
  };

  const filterData = (tempData) => {
    console.log("filterQuery", filterQuery, tempData);
    const currentDate = new Date();
    const oneYearAgo = new Date(currentDate);
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1);

    switch (filterQuery) {
      case "Monthly":
        const oneMonthAgo = new Date(currentDate);
        oneMonthAgo.setMonth(currentDate.getMonth() - 1);
        return tempData.filter(
          (item) => new Date(item.addedDatetime) >= oneMonthAgo
        );
      case "Yearly":
        return tempData.filter(
          (item) => new Date(item.addedDatetime) >= oneYearAgo
        );
      case "Weekly":
        const oneWeekAgo = new Date(currentDate);
        oneWeekAgo.setDate(currentDate.getDate() - 7);
        return tempData.filter(
          (item) => new Date(item.addedDatetime) >= oneWeekAgo
        );
      default:
        // If none of the cases match, return weekly content
        const oneWeekAgoDefault = new Date(currentDate);
        oneWeekAgoDefault.setDate(currentDate.getDate() - 7);
        return tempData?.filter(
          (item) => new Date(item.addedDatetime) >= oneWeekAgoDefault
        );
    }
  };

  useEffect(() => {
    const dataTemp = filterData(data);
    setChartData(dataTemp);
  }, [filterQuery]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    setUserData(data);
    if (!data) {
      router.push("/login");
    } else if (!data?.brokerage_Details?.firstName) {
      router.push("/brokerage-profile");
    }

    const func = () => {
      const data = JSON.parse(localStorage.getItem("user"));
      axios
        .get("/api/getAllListedProperties", {
          headers: {
            Authorization: `Bearer ${data?.token}`,
            "Content-Type": "application/json",
          },
          params: {
            userId: data?.userId,
          },
        })
        .then((res) => {
          // console.log(categorizeDataByMonth(res.data.data.property.$values));

          const temp = res.data.data.properties.$values;
          const pdated = temp.filter((prop, index) => {
            if (String(prop.userId) === String(data.userId)) return true;
            else return false;
          });

          const dataTemp = filterData(pdated);
          setData(pdated);
          setChartData(dataTemp);
          setShowLineGraph(true);
          setRerender(false);
        })
        .catch((err) => {
          toast.error(err?.response?.data?.error);
        });

      axios
        .get("/api/getAllBids", {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
          params: {
            email: data.userEmail,
          },
        })
        .then((res) => {
          console.log(res.data.data.$values);
          const tempBids = res.data.data.$values;
          let acceptedBid = 0;
          let allBids = [];
          tempBids.map((prop, index) => {
            if (String(prop.userId) === String(data.userId)) {
              if (String(prop.status) === "1") {
                acceptedBid += 1;
              }
              allBids.push(prop);
            }
          });
          console.log("acceptedBid", acceptedBid);
          setAcceptedBids(acceptedBid);

          setBids(allBids);
        })
        .catch((err) => {
          toast.error(err);
          // setModalIsOpenError(true);
        });
    };
    func();
    setRefresh(false);
  }, [refresh]);

  useEffect(() => {
    const categorizeDataByMonth = (data) => {
      if (data.length === 0) {
        return Array(12).fill(0); // Initialize an array with 12 elements, all initialized to 0.
      }

      const currentMonth = new Date().getMonth();

      const countsByMonth = Array(currentMonth + 1).fill(0);

      data.forEach((property) => {
        const createdAtDate = new Date(property.addedDatetime);
        const month = createdAtDate.getMonth();

        if (month <= currentMonth) {
          countsByMonth[month]++;
        }
      });

      return countsByMonth;
    };
    const temp = categorizeDataByMonth(chartData);
    setLineData(temp);
  }, [chartData]);

  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header
        userData={userData ? userData : {}}
        setShowNotification={setShowNotification}
      />

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
                  className="col-lg-12 mb10"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="breadcrumb_content style2">
                    <h2 className="breadcrumb_title">
                      {userData?.brokerage_Details?.firstName
                        ? userData?.brokerage_Details?.firstName
                        : "firstName"}{" "}
                      {userData?.brokerage_Details?.lastName
                        ? userData?.brokerage_Details?.lastName
                        : "lastName"}
                    </h2>
                    {/* <p>We are glad to see you again!</p> */}
                  </div>
                  <div>
                    <Filtering
                      setRefresh={setRefresh}
                      FilterQuery={filterQuery}
                      setFilterQuery={setFilterQuery}
                    />
                  </div>
                </div>
              </div>
              {/* End .row */}

              <div className="row">
                <AllStatistics
                  properties={data.length}
                  views={bids.length}
                  bids={acceptedBids}
                  favourites={wishlist.length}
                />
              </div>
              {/* End .row Dashboard top statistics */}

              <div className="row">
                <div className="col-xl-6">
                  <div className="application_statics">
                    <h4 className="mb-4">Property Statistics</h4>
                    {data.length > 0 && showLineGraph ? (
                      <StatisticsChart data={lineData} />
                    ) : (
                      <p>Loading...</p> // You can replace this with a loading indicator
                    )}
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="application_statics">
                    <h4 className="mb-4">Plans Statistics</h4>
                    {data.length > 0 && showLineGraph ? (
                      <StatisticsPieChart data={lineData} />
                    ) : (
                      <p>Loading...</p> // You can replace this with a loading indicator
                    )}
                  </div>
                </div>

                {/* End statistics chart */}

                {/*<div className="col-xl-5">
                  <div className="recent_job_activity">
                    <h4 className="title mb-4">Recent Activities</h4>
                    <Activities />
                    <Modal modalOpen={true} closeModal={closeModal}/>
                  </div>
                </div>*/}
              </div>

              {/* End .row  */}

              <div className="row mt50">
                <div className="col-lg-12">
                  <div className="copyright-widget text-center">
                    <p>
                      &copy; {new Date().getFullYear()} Appraisal Land. All
                      Rights Reserved.
                    </p>
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
