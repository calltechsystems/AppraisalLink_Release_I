import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import BrokerageArchiveProperties from "../../components/dashboard/brokerage-archive-properties";

const index = () => {
  return (
    <>
      <Seo pageTitle="Mortgage Brokerage Archive Properties" />
      <BrokerageArchiveProperties />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
