import Header from "../../common/header/dashboard/HeaderAdmin";
import SidebarMenu from "../../common/header/dashboard/SidebarMenuAdmin";
import MobileMenu from "../../common/header/MobileMenuAdmin";
import Filtering from "./Filtering";
import AllStatistics from "./AllStatistics";
import StatisticsChart from "./StatisticsChart";
import StatisticsPieChart from "./StatisticsPieChart";
import PackageData from "./PackageData";
import { useRouter } from "next/router";
import SearchUser from "./SearchUser";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Index = () => {
  const [filterQuery, setFilterQuery] = useState("All");
  const [searchInput, setSearchInput] = useState("");
  const [allAppraiser, setAllAppraiser] = useState([]);
  const [properties, setProperties] = useState([]);
  const [bidChartData, setBidChartData] = useState([]);
  const [allBids, setBids] = useState([]);

  const [allHistory, setAllHistory] = useState([]);
  const [planCount, setPlanCount] = useState([]);
  const [allPlans, setAllPlans] = useState([]);
  const [acceptedBids, setAcceptedBids] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const [dataFetched, setDataFetched] = useState([]);
  const [FilteredData, setFilteredData] = useState();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setAllAppraiser([]);
    setProperties([]);
    setBids([]);

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
        toast.dismiss();

        setDataFetched(true);
        const prop = res.data.data.properties.$values;

        axios
          .get("/api/getAllBrokerageCompany", {
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
          })
          .then((brokerrr) => {
            let allActiveAppraiser = 0;
            const allrequiredBroker = brokerrr.data.data.result.$values;
            let allfinalBrokers = [];
            allrequiredBroker.map((broker, index) => {
              prop.map((property, idx) => {
                if (String(property.userId) === String(broker.userId)) {
                  allfinalBrokers.push({
                    ...property,
                    firstName: broker.firstName,
                    lastName: broker.lastName,
                  });
                }
              });
              if (broker.firstName !== null) allActiveAppraiser += 1;
            });
            axios
              .get("/api/getAllSubscriptionHistory", {
                headers: {
                  Authorization: `Bearer ${data.token}`,
                },
              })
              .then((historyRes) => {
                const allHistoryy = historyRes.data.data.$values;
                let finalHistory = [];
                let liteCount = 0,
                  ultimateCount = 0,
                  proCount = 0;
                allHistoryy.map((data, index) => {
                  let row = {};
                  allrequiredBroker.map((app, idx) => {
                    if (
                      String(app.userId) === String(data.userId) &&
                      !row?.$id
                    ) {
                      row = data;
                    }
                  });
                  if (row?.$id) {
                    if (
                      String(row?.planName).toLowerCase().includes("lite") &&
                      filterByDateRange(row.createdTime)
                    ) {
                      liteCount++;
                    }
                    if (
                      String(row?.planName)
                        .toLowerCase()
                        .includes("ultimate") &&
                      filterByDateRange(row.createdTime)
                    ) {
                      ultimateCount++;
                    }
                    if (
                      String(row?.planName).toLowerCase().includes("pro") &&
                      filterByDateRange(row.createdTime)
                    ) {
                      proCount++;
                    }
                    finalHistory.push(row);
                  }
                });
                let planArray = [];
                planArray.push(liteCount);
                planArray.push(proCount);
                planArray.push(ultimateCount);
                setPlanCount(planArray);
                setAllHistory(finalHistory);
              })
              .catch((err) => {});
            setAcceptedBids(allActiveAppraiser);
            setAllAppraiser(allrequiredBroker);
            setProperties(allfinalBrokers);
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
                let allAcceptedBids = 0;
                tempBids = res.data.data.$values;

                setBids(tempBids);
                axios
                  .get("/api/appraiserWishlistedProperties", {
                    headers: {
                      Authorization: `Bearer ${data?.token}`,
                      "Content-Type": "application/json",
                    },
                  })
                  .then((res) => {
                    const tempData = res.data.data.$values;
                    const responseData = tempData.filter((prop, index) => {
                      if (String(prop.userId) === String(data.userId)) {
                        return true;
                      } else {
                        return false;
                      }
                    });
                    const tempId = responseData;
                    setWishlist(responseData);
                    setProperties(prop);
                  })
                  .catch((err) => {
                    toast.error(err?.response);
                    setErrorMessage(err?.response);
                  });
              })
              .catch((err) => {});
          })
          .catch((err) => {});
      })
      .catch((err) => {
        toast.dismiss();
        toast.error(err);
        setDataFetched(false);
      });

    let tempBids = [];

    setRefresh(false);
  }, [refresh]);

  useEffect(() => {
    setBidChartData(generateMonthCountArray());
  }, [properties, filterQuery]);

  useEffect(() => {
    let liteCount = 0,
      ultimateCount = 0,
      proCount = 0;
    allHistory.map((transaction, index) => {
      if (
        String(transaction?.planName).toLowerCase().includes("lite") &&
        filterByDateRange(transaction.createdTime)
      ) {
        liteCount++;
      }
      if (
        String(transaction?.planName).toLowerCase().includes("ultimate") &&
        filterByDateRange(transaction.createdTime)
      ) {
        ultimateCount++;
      }
      if (
        String(transaction?.planName).toLowerCase().includes("pro") &&
        filterByDateRange(transaction.createdTime)
      ) {
        proCount++;
      }
    });

    let planArray = [];
    planArray.push(liteCount);
    planArray.push(proCount);
    planArray.push(ultimateCount);
    setPlanCount(planArray);
  }, [allAppraiser, allBids, allHistory, bidChartData, filterQuery]);

  useEffect(() => {
    let filteredData = [];
    allAppraiser.map((appraiser, index) => {
      if (
        String(appraiser.firstName)
          .toLowerCase()
          .includes(String(searchInput).toLowerCase()) ||
        String(appraiser.lastName)
          .toLowerCase()
          .includes(String(searchInput).toLowerCase())
      ) {
        filteredData.push(appraiser);
      }
    });
    setFilteredData(filteredData);
  }, [searchInput]);

  useEffect(() => {
    let allAppraisers = [],
      activeAppraiser = 0;
    allAppraiser.map((appraiser, index) => {
      if (filterByDateRange(filterQuery, appraiser.modifiedDateTime)) {
        allAppraisers.push(appraiser);
        if (appraiser.firstName !== null) {
          activeAppraiser += 1;
        }
      }
    });
    
    setFilteredData(allAppraisers);
    setAcceptedBids(activeAppraiser);
  }, [filterQuery]);

  const isRegularPlan = (planName) => {
    if (
      String(planName).toLowerCase().includes("lite") ||
      String(planName).toLowerCase().includes("lite") ||
      String(planName).toLowerCase().includes("lite")
    ) {
      return true;
    }
    return false;
  };

  const getFormattedData = (users, transactions) => {
    let formattedUsers = [];

    users.map((user, index) => {
      let updatedUser = {};
      transactions.map((detail, index2) => {
        if (
          String(user.userId) === String(detail?.userId) &&
          !updatedUser?.$id &&
          isRegularPlan(detail?.transactionDetail)
        ) {
          updatedUser = {
            ...user,
            planName: detail?.transactionDetail,
            endDate: detail?.endDate,
          };
        }
      });
      if (updatedUser?.$id) {
        formattedUsers.push(updatedUser);
      } else {
        formattedUsers.push({
          ...user,
          planName: "-",
          endDate: "-",
        });
      }
    });
    return formattedUsers;
  };

  const sortFunction = (rows) => {
    const appraisers = rows;
    appraisers.sort((a, b) => {
      if (a?.firstName === null && b?.firstName !== null) {
      } else if (a?.firstName !== null && b?.firstName === null) {
        return -1;
      } else {
        return a?.firstName?.localeCompare(b?.firstName);
      }
    });
    return appraisers;
  };

  function filterByDateRange(filterQuery, date) {
    const currentDate = new Date();
    const dateToCheck = new Date(date);
    const timeDifference = currentDate - dateToCheck;
    let timeThreshold;
    switch (filterQuery) {
      case "Monthly":
        timeThreshold = 30 * 24 * 60 * 60 * 1000;
        break;
      case "Weekly":
        timeThreshold = 7 * 24 * 60 * 60 * 1000;
        break;
      case "Yearly":
        timeThreshold = 90 * 24 * 60 * 60 * 1000;
        break;
      default:
        return true;
    }
    return timeDifference <= timeThreshold;
  }

  const refreshHandler = () => {
    setRefresh(true);
  };

  function generateMonthCountArray() {
    const monthCountArray = Array(12).fill(0);
    properties.map((obj, index) => {
      const requestMonth = new Date(obj.modifiedDatetime).getMonth();
      if (filterByDateRange(filterQuery, obj.modifiedDatetime)) {
        monthCountArray[requestMonth]++;
      }
    });

    return monthCountArray;
  }

  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

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
                <div className="col-lg-12">
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
                </div>
                {/* End Dashboard Navigation */}

                <div className="row mb-2" style={{}}>
                  <div className="col-lg-11">
                    <div className="breadcrumb_content">
                      <h2 className="breadcrumb_title">
                        Mortagage Brokerage Dashboard
                      </h2>
                    </div>
                  </div>
                  <div className="col-lg-1">
                    <Filtering
                      refreshHandler={refreshHandler}
                      filterQuery={filterQuery}
                      setFilterQuery={setFilterQuery}
                    />
                  </div>
                </div>
              </div>
              {/* End .row */}

              {properties.length === 0 ? (
                <div className="ring" style={{ marginBottom: "300px" }}>
                  Loading
                  <span className="load"></span>
                </div>
              ) : (
                <div className="row">
                  <div className="col-lg-6">
                    <div className="row">
                      <AllStatistics
                        totalBids={allAppraiser.length}
                        acceptedBids={acceptedBids}
                      />
                    </div>
                    <div className="application_statics">
                      <h4 className="mb-4">
                        View Statistics (Appraised Properties Wise)
                      </h4>
                      <StatisticsChart data={bidChartData} />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="application_statics">
                      <h4 className="mb-4">Plan Wise Brokerages</h4>
                      <StatisticsPieChart planData={planCount} />
                    </div>
                  </div>
                </div>
              )}

              <div className="row mt-5">
                <div className="col-lg-12">
                  <div className="my_dashboard_review mb40">
                    <div className="col-lg-12">
                      <div className="row">
                        <div className="col-lg-8">
                          <h4 className="mt-2">All Brokerages</h4>
                        </div>
                        <div className="col-lg-4 mb-2 candidate_revew_search_box">
                          <SearchUser
                            searchInput={searchInput}
                            setSearchInput={setSearchInput}
                          />
                        </div>
                      </div>
                      <div className="packages_table">
                        <div className="table-responsive mt0">
                          <PackageData
                            data={
                              searchInput !== ""
                                ? sortFunction(
                                    getFormattedData(FilteredData, allHistory)
                                  )
                                : sortFunction(
                                    getFormattedData(allAppraiser, allHistory)
                                  )
                            }
                            setRefresh={setRefresh}
                            properties={properties}
                            allBids={allBids}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row"></div>

              <div className="row mt50">
                <div className="col-lg-12">
                  <div className="copyright-widget text-center">
                    <p>© 2023 Appraisal Link. All Rights Reserved.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
