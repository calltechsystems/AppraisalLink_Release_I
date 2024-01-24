import { useEffect, useState } from "react";
import Header from "../../common/header/dashboard/HeaderAppraiserCompany";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu_002";
import MobileMenu from "../../common/header/MobileMenu_01";
import ProfileInfo from "./ProfileInfo";
import Form from "./Form";
import { useRouter } from "next/router";

const Index = ({ profileCount, setProfileCount }) => {
  const [showCard, setShowCard] = useState(true); // Set to false by default
  const [userData, setUserData] = useState({}); // State to hold user data
  const router = useRouter();

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

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));

    if (!storedUserData) {
      router.push("/login");
    } else {
      setUserData(storedUserData); // Set user data in state
      // if (storedUserData?.appraiserCompany_Datails?.firstName !== null) {
      //   setShowCard(false);
      // }
    }
  }, []); // Empty dependency array for componentDidMount-like behavior

  const chnageShowCardHandler = (val) => {
    setShowCard(val);
  };

  return (
    <>
      <Header profileCount={profileCount} setProfileCount={setProfileCount} />
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

      <section className="our-dashbord dashbord bgc-f7 pb50">
        <div className="container-fluid ovh">
          {userData && Object.keys(userData).length > 0 && (
            <>
              <div className="row">
                <div className="col-lg-12 maxw100flex-992">
                  <div className="row">
                    {/* <div className="col-lg-12">
                      <div className="breadcrumb_content style2">
                        <h2 className="breadcrumb_title">My Profile</h2>
                      </div>
                    </div> */}
                    <div className="col-lg-12">
                      <div className="my_dashboard_review">
                        <div className="row">
                          <div className="col-xl-12">
                            {showCard ? (
                              <div className="mb-5">
                                <Form
                                  userData={userData}
                                  chnageShowCardHandler={chnageShowCardHandler}
                                />
                              </div>
                            ) : (
                              <ProfileInfo
                                profileCount={profileCount}
                                setProfileCount={setProfileCount}
                                setShowCard={setShowCard}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt50">
                <div className="col-lg-12">
                  <div className="copyright-widget text-center">
                    <p>
                      &copy; {new Date().getFullYear()} Appraisal Link. All
                      Rights Reserved.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Index;
