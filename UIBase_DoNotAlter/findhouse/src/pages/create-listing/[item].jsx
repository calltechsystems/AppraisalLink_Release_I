import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Seo from "../../components/common/seo";
import CreateListing from "../../components/dashboard/create-listing";
import { useEffect } from "react";

const Index = () => {
  const router = useRouter();
  const { item } = router.query;

  useEffect(()=>{
    console.log("item",item);
  })
  return (
    <>
      <Seo pageTitle="Create Listing" />
      
      <CreateListing  isView = {true}/>
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });