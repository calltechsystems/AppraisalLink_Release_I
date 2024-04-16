import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import BrokerDashboard from "../../components/dashboard-admin/mortgage-broker-dashboard";

const index = () => {
  return (
    <>
      <Seo pageTitle="Broker Dashboard" />
      <BrokerDashboard />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
