import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import MyPlans from "./plans";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import { useRouter } from "next/router";
import axios from "axios";
import toast from "react-hot-toast";

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const [currentSubscription , setcurrentSubscription]  = useState({})
  const [openRedirectionModal,setopenRedirectionModal] = useState(false)
  const [price, setPrice] = useState({
    title : "Basic",
    price : 0,
    type : "plan"
  });

  
  const [userData , setUserData] = useState({});


  useEffect(()=>{

    axios
    .get("/api/getBrokerTransactions", {
      headers: {
        Authorization: `Bearer ${userData?.token}`,
        "Content-Type": "application/json",
      },
      params: {
        userId: userData?.userId,
      },
    })
    .then((res) => {
      toast.dismiss();
      let tempSub = (res.data.data.result.$values);
      let requiredSucription = {};
      tempSub.map((sub,index)=>{
        if(new Date(sub.startDate) <= new Date() && new Date(sub.endDate) >= new Date()){
          requiredSucription = sub;
        }
      })
      setcurrentSubscription(requiredSucription)
      setRerender(false);
    })
    .catch((err) => {
      toast.dismiss();
      // toast.error(err?.response?.data?.error);
      // setErrorMessage(err.response);
      // setModalIsOpenError(true);
    });


    const fetchData = ()=>{
      const isPaying = (JSON.parse(localStorage.getItem("isPaying")));
      const data =  (JSON.parse(localStorage.getItem("user"))) ;

      if(data){
       setUserData(data);
        if(isPaying) {
         setopenRedirectionModal(true) 
        }
      }
      else{
        router.push("/login")
      }
    }
    
    fetchData();
  },[]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      <Seo pageTitle="My Plans" />
      <MyPlans currentSubscription={currentSubscription} setModalOpen={setModalOpen} setPrice={setPrice} userData={userData} modalOpen={modalOpen}/>
      <Modal modalOpen={modalOpen} closeModal={closeModal} price={price}/>
      {openRedirectionModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="row">
              <div className="col-lg-12">
                <Link href="/" className="">
                  <Image
                    width={50}
                    height={45}
                    className="logo1 img-fluid"
                    style={{ marginTop: "-20px" }}
                    src="/assets/images/Appraisal_Land_Logo.png"
                    alt="header-logo2.png"
                  />
                  <span
                    style={{
                      color: "#2e008b",
                      fontWeight: "bold",
                      fontSize: "24px",
                      // marginTop: "20px",
                    }}
                  >
                    Appraisal
                  </span>
                  <span
                    style={{
                      color: "#97d700",
                      fontWeight: "bold",
                      fontSize: "24px",
                      // marginTop: "20px",
                    }}
                  >
                    {" "}
                    Land
                  </span>
                </Link>
              </div>
            </div>
            <h2 className="text-center mt-3" style={{ color: "#2e008b" }}>
              Transaction has took Place !
            </h2>
            <div className="mb-2" style={{ border: "2px solid #97d700" }}></div>
            <p className="fs-5 text-center text-dark mt-4">
              The Transaction of subscribing to a plan is done !{" "}
            </p>

            <div
              className="mb-3 mt-4"
              style={{ border: "2px solid #97d700" }}
            ></div>
            <div className="col-lg-12 text-center">
              
              <button
                disabled={disable}
                className="btn w-25 btn-color"
                onClick={()=>setopenRedirectionModal(false)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });