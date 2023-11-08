import BreadCrumb from "../common/BreadCrumb";

const BreadCrumbBanner = () => {
  return (
    <section className="inner_page_breadcrumb_membership">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="breadcrumb_content">
              {/* <BreadCrumb title="Membership" /> */}
              <h4 className="breadcrumb_title text_membership text-center">Subscription</h4>
            </div>
          </div>
          {/* End .col */}
        </div>
      </div>
    </section>
  );
};

export default BreadCrumbBanner;
