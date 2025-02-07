// import './AllStatistics.css';
// import "font-awesome/css/font-awesome.min.css";

const AllStatistics = ({ properties, views, bids, favourites }) => {
  const allStatistics = [
    {
      id: 1,
      blockStyle: "stylecard1",
      icon: "fa fa-home",
      timer: properties,
      name: "All Properties",
    },
    {
      id: 2,
      blockStyle: "stylecard2",
      icon: "flaticon-invoice",
      timer: views,
      name: "Quotes Provided",
    },
    {
      id: 3,
      blockStyle: "stylecard3",
      icon: "fa fa-check",
      timer: bids,
      name: "Quotes Accepted",
    },
    {
      id: 4,
      blockStyle: "stylecard4",
      icon: "fa fa-edit",
      timer: favourites,
      name: "Quotes in Progress",
    },
    {
      id: 5,
      blockStyle: "stylecard5",
      icon: "fa fa-check-circle",
      timer: favourites,
      name: "Quotes Completed",
    },
    {
      id: 6,
      blockStyle: "stylecard6",
      icon: "fa fa-pause",
      timer: favourites,
      name: "Quotes On Hold by Appraiser",
    },
    {
      id: 7,
      blockStyle: "stylecard7",
      icon: "fa fa-times-circle",
      timer: favourites,
      name: "Cancelled Properties",
    },
    {
      id: 8,
      blockStyle: "stylecard8",
      icon: "fa fa-pause",
      timer: favourites,
      name: "On Hold Properties by Broker",
    },
    {
      id: 9,
      blockStyle: "stylecard9",
      icon: "fa fa-credit-card",
      timer: favourites,
      name: "Plan",
    },
    {
      id: 10,
      blockStyle: "stylecard10",
      icon: "fa fa-hourglass-half",
      timer: favourites,
      name: "Plan validity",
    },
    {
      id: 11,
      blockStyle: "stylecard11",
      icon: "fa fa-building",
      timer: favourites,
      name: "No. of Properties",
    },
    {
      id: 12,
      blockStyle: "stylecard12",
      icon: "fa fa-home",
      timer: favourites,
      name: "Used Properties",
    },
    // {
    //   id: 13,
    //   blockStyle: "stylecard13",
    //   icon: "flaticon-house",
    //   timer: favourites,
    //   name: "Archived Properties",
    // },
  ];

  return (
    // <div className="statistics-container">
    //   {allStatistics.map((item) => (
    //     <div className="col-sm-6 col-md-6 col-lg-6 col-xl-3" key={item.id}>
    //       <div className={`ff_one ${item.blockStyle}`}>
    //         <div className="details">
    //           <div className="timer">{item.name}</div>
    //           <p>{item.timer}</p>
    //           {/* <div className="timer">{item.timer}</div>
    //           <p>{item.name}</p> */}
    //         </div>
    //         <div className="icon">
    //           <span className={item.icon}></span>
    //         </div>
    //       </div>
    //     </div>
    //   ))}
    // </div>
    <div className="statistics-container">
      {allStatistics.map((item) => (
        <div key={item.id} className={`ff_one ${item.blockStyle}`}>
          <div className="details">
            <div className="timer">{item.name}</div>
            <p>{item.timer}</p>
          </div>
          <div className="icon">
            <i className={item.icon}></i>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllStatistics;
