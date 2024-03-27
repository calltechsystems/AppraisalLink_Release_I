import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import MyPlans from "./plans";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import { useRouter } from "next/router";

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter()
  const [price, setPrice] = useState({
    title : "Basic",
    price : 0,
    type : "plan"
  });

  
  const [userData , setUserData] = useState({});
  useEffect(()=>{


    const fetchData = ()=>{
      const data =  (JSON.parse(localStorage.getItem("user"))) ;

      if(data)
       setUserData(data);
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
      <MyPlans setModalOpen={setModalOpen} setPrice={setPrice} userData={userData} modalOpen={modalOpen}/>
      <Modal modalOpen={modalOpen} closeModal={closeModal} price={price}/>
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });