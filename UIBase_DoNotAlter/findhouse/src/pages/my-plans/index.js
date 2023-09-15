import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import MyPlans from "./plans";
import { useState } from "react";
import Modal from "./Modal";

const index = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [price, setPrice] = useState({
    title : "Basic",
    price : 0
  });

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      <Seo pageTitle="My Plans" />
      <MyPlans setModalOpen={setModalOpen} setPrice={setPrice} />
      <Modal modalOpen={modalOpen} closeModal={closeModal} price={price}/>
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });