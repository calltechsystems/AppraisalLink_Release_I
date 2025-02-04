// import './AllStatistics.css';

const AllStatistics = ({ properties, views, bids, favourites }) => {
  const allStatistics = [
    {
      id: 1,
      blockStyle: "style1",
      icon: "flaticon-house",
      timer: properties,
      name: "All Properties",
    },
    {
      id: 2,
      blockStyle: "style2",
      icon: "flaticon-invoice",
      timer: views,
      name: "Quotes Provided",
    },
    {
      id: 3,
      blockStyle: "style3",
      icon: "flaticon-tick",
      timer: bids,
      name: "Quotes Accepted",
    },
    // {
    //   id: 4,
    //   blockStyle: "style4",
    //   icon: "flaticon-heart",
    //   timer: favourites,
    //   name: "Current Plan",
    // },
    // {
    //   id: 5,
    //   blockStyle: "style1",
    //   icon: "flaticon-house",
    //   timer: favourites,
    //   name: "Current Plan validity",
    // },
    // {
    //   id: 6,
    //   blockStyle: "style2",
    //   icon: "flaticon-invoice",
    //   timer: favourites,
    //   name: "Total Number of Properties",
    // },
    // {
    //   id: 7,
    //   blockStyle: "style3",
    //   icon: "flaticon-tick",
    //   timer: favourites,
    //   name: "Used Properties",
    // },
    // {
    //   id: 8,
    //   blockStyle: "style4",
    //   icon: "flaticon-heart",
    //   timer: favourites,
    //   name: "Quotes in Progress",
    // },
    // {
    //   id: 9,
    //   blockStyle: "style1",
    //   icon: "flaticon-house",
    //   timer: favourites,
    //   name: "Quotes on HOLD",
    // },
    // {
    //   id: 10,
    //   blockStyle: "style2",
    //   icon: "flaticon-invoice",
    //   timer: favourites,
    //   name: "Quotes Completed",
    // },
    // {
    //   id: 11,
    //   blockStyle: "style3",
    //   icon: "flaticon-tick",
    //   timer: favourites,
    //   name: "Cancelled Properties",
    // },
    // {
    //   id: 12,
    //   blockStyle: "style4",
    //   icon: "flaticon-heart",
    //   timer: favourites,
    //   name: "On Hold Properties",
    // },
    // {
    //   id: 13,
    //   blockStyle: "style1",
    //   icon: "flaticon-house",
    //   timer: favourites,
    //   name: "Archived Properties",
    // },
  ];

  return (
    <div className="statistics-container">
      {allStatistics.map((item) => (
        <div className="col-sm-6 col-md-6 col-lg-6 col-xl-3" key={item.id}>
          <div className={`ff_one ${item.blockStyle}`}>
            <div className="details">
              <div className="timer">{item.timer}</div>
              <p>{item.name}</p>
            </div>
            <div className="icon">
              <span className={item.icon}></span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllStatistics;
