import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import MyPlans from "./plans";

const index = () => {
  return (
    <>
      <Seo pageTitle="My Plans" />
      <MyPlans />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });