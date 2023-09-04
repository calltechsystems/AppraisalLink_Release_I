import Image from "next/image";
import Slider from "react-slick";

const Partners = () => {
  const settings = {
    dots: false,
    arrow: false,
    speed: 1200,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
  };
  const partnersImages = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  return (
    <>
      <Slider {...settings} arrows={false}>
      {partnersImages.map((val, i) => (
        <div className="col-sm-6 col-md-4 col-lg" key={i}>
          <div className="our_partner">
          {/* <Image
              width={106}
              height={71}
              className="contain"
              src={`/assets/images/partners/${val}.png`}
              alt="1.png"
            /> */}
            <h3>{`Appraiser ${i}`}</h3>
          </div>
        </div>
      ))}
      </Slider>
    </>
  );
};

export default Partners;
