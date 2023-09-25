import BreadCrumb from "../common/BreadCrumb";

const BreadCrumbBanner = () => {
  return (
    <section className="inner_page_breadcrumb">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="breadcrumb_content">
              {/* <BreadCrumb title="Terms & Conditions" /> */}
              <h4 className="breadcrumb_title text-center">Appraiser</h4>
            </div>
          </div>
          {/* End .col */}
        </div>
      </div>
    </section>
  );
};

export default BreadCrumbBanner;
