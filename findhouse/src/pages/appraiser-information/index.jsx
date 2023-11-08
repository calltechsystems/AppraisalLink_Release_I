import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import AppraiserInformation from '../../components/dashboard-admin/appraiser-information';

const index = () => {
  return (
    <>
      <Seo pageTitle="Appraiser Information" />
      <AppraiserInformation />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
