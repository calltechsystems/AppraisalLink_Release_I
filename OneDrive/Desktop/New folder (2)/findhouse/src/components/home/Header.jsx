import Link from "next/link";
import { useEffect, useState } from "react";
import HeaderMenuContent from "../common/header/HeaderMenuContent";
import Image from "next/image";

const Header = () => {
  const [navbar, setNavbar] = useState(false);
  const [isListing, setListing] = useState(true);

  const changeBackground = () => {
    if (window.scrollY >= 95) {
      setListing(false);
      setNavbar(true);
    } else {
      setListing(true);
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  }, []);

  return (
    <header
      className={`header-nav menu_style_home_one navbar-scrolltofixed stricky main-menu home-logo-header ${
        navbar ? "stricky-fixed " : ""
      }`}
    >
      {isListing && (
        <div
          style={{ backgroundColor: "white", color: "black", width: "100%" }}
        >
          {/* <!-- Ace Responsive Menu --> */}

          <Link href="/" className="navbar_brand float-start dn-smd">
            <Image
              width={40}
              height={45}
              className="logo1 contain"
              src="/assets/images/logo_new.png"
              alt="header-logo.png"
            />
            <Image
              width={40}
              height={45}
              className="logo2 contain"
              src="/assets/images/logo_new.png"
              alt="header-logo2.png"
            />
            <span className="text-dark">Appraisal Link</span>
          </Link>
          {/* site logo brand */}

          <nav>
            <HeaderMenuContent  hide={false} isListing={isListing}/>
          </nav>
          {/* End .navbar */}
        </div>
      )}
      <div className="container-fluid p0">
        {/* <!-- Ace Responsive Menu --> */}

        {!isListing && ( <Link href="/" className="navbar_brand float-start dn-smd">
          <Image
            width={40}
            height={45}
            className="logo1 contain"
            src="/assets/images/logo_new.png"
            alt="header-logo.png"
          />
          <Image
            width={40}
            height={45}
            className="logo2 contain"
            src="/assets/images/logo_new.png"
            alt="header-logo2.png"
          />
          <span>Appraisal Link</span>
        </Link>)}
        {/* site logo brand */}

        <nav>
          <HeaderMenuContent hide={true} isListing={!isListing}/>
        </nav>
        {/* End .navbar */}
      </div>
    </header>
    // {/* <!-- /.theme-main-menu --> */}
  );
};

export default Header;
