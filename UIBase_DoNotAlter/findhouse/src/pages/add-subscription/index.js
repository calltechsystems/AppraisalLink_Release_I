import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import MyPlans from "./plans";
import { useEffect, useState } from "react";
import Modal from "./Modal";

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [disable,setDisable]=useState(false);
  const [price, setPrice] = useState({
    title : "Basic",
    price : 0
  });

  const userInfo = JSON.parse(localStorage.getItem("user"));
  console.log("userInfo",userInfo.userSubscription);

  
  const [userData , setUserData] = useState({});
  useEffect(()=>{
    const fetchData = ()=>{
      const data =  (JSON.parse(localStorage.getItem("user"))) ;
      if(data)
       setUserData(data);
    }
    fetchData();
  },[]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const [mouseDisabled, setMouseDisabled] = useState(false);

  useEffect(() => {
    const disableMouse = () => {
      setMouseDisabled(true);
      setTimeout(() => {
        setMouseDisabled(false);
      }, 120000); // 2 minutes in milliseconds
    };

    window.addEventListener('mousemove', disableMouse);

    return () => {
      window.removeEventListener('mousemove', disableMouse);
    };
  }, [disable]);

  const instantiatePayementHandler = ()=>{
    const data = JSON.parse(localStorage.getItem("user"));
   

  }

  return (
    <>
      <Seo pageTitle="My Plans" />
      <MyPlans setModalOpen={setModalOpen} setPrice={setPrice} disable={disable} userData={userData}/>
      <Modal modalOpen={modalOpen} closeModal={closeModal} price={price} setDisable={setDisable} disable={disable}/>
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });