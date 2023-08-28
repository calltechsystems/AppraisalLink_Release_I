import dynamic from "next/dynamic";
import Seo from "../components/common/seo";
import HomeMain from "../components/home";

const index = () => {
  return (
    <>
      <Seo pageTitle="Homepage" />
      <HomeMain />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
