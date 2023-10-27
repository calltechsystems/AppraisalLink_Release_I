import { useState } from "react";
import Header from "../../common/header/dashboard/Header_02";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu_01";
import MobileMenu from "../../common/header/MobileMenu_01";
import ProfileInfo from "./ProfileInfo";
import Form from "./Form";

const Index = ({profileCount,setProfileCount}) => {

  const [showCard , setShowCard] = useState(true);

  const userData = JSON.parse(localStorage.getItem("user"));

  const chnageShowCardHandler = (val)=>{
    setShowCard(val);
  }
  return (
    <>
       {/* <!-- Main Header Nav --> */}
       <Header profileCount={profileCount} setProfileCount={setProfileCount} />

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
 
                 <div className="col-lg-12">
                   <div className="breadcrumb_content style2">
                     <h2 className="breadcrumb_title">My Profile</h2>
                     {/* <p>We are glad to see you again!</p> */}
                   </div>
                 </div>
                 {/* End .col */}
 
                 <div className="col-lg-12">
                   <div className="my_dashboard_review">
                     <div className="row">
                       {/* <div className="col-xl-2">
                         <h4>Personal Information</h4>
                       </div> */}
                       <div className="col-xl-12">
                        {showCard === true ? <div className="mb-5">
                           <Form userData = {userData} chnageShowCardHandler={chnageShowCardHandler}/>
                         </div> : <ProfileInfo
                           profileCount={profileCount}
                           setProfileCount={setProfileCount}
                           setShowCard={setShowCard}
                         /> }
                       </div>
                     </div>
                   </div>
                   {/* End prifle info wrapper end */}
 
                   {/*<div className="my_dashboard_review mt30">
                     <div className="row">
                       <div className="col-xl-2">
                         <h4>Social Media</h4>
                       </div> 
                       <div className="col-xl-12">
                         <SocialMedia />
                       </div>
                     </div>
                     </div>*/}
                   {/* End .SocialMedia */}
 
                   {/* <div className="my_dashboard_review mt30">
                     <div className="row">
                        <div className="col-xl-2">
                         <h4>Change password</h4>
                       </div> 
                       <div className="col-xl-12">
                         <ChangePassword />
                       </div>
                     </div>
                     </div>*/}
                 </div>
               </div>
               {/* End .row */}
 
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



