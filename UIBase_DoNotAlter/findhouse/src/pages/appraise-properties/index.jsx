import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import AppraiseProperties from "../../components/dashboard/appraiser-properties";

const index = () => {
  return (
    <>
      <Seo pageTitle="Appraise Properties" />
      <AppraiseProperties />
    </>
  );
};

export default index;
// export default dynamic(() => Promise.resolve(index), { ssr: false });
