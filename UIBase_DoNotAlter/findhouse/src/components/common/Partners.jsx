import Image from "next/image";

const Partners = () => {
  const partnersImages = ["1", "2", "3", "4", "5"];
  return (
    <>
      {partnersImages.map((val, i) => (
        <div className="col-sm-6 col-md-4 col-lg" key={i}>
          <div className="our_partner">
            <h3>{`Appraiser ${i}`}</h3>
          </div>
        </div>
      ))}
    </>
  );
};

export default Partners;
