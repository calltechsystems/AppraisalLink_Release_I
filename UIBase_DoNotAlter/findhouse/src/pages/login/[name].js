import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import Login from "../../components/login";
import { useRouter } from "next/router";
import { useEffect } from "react";

const index = ({name}) => {
    const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  useEffect(()=>{
    console.log(name);
  },[]);
  return (
    <>
      <Seo pageTitle="Login" />
      <Login user={name}/>
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });