const AllStatistics = ({ properties, views, bids, wishlist, favourites }) => {
  const allStatistics = [
    {
      id: 1,
      blockStyle: "stylecard1",
      icon: "flaticon-building",
      timer: properties,
      name: "All Properties",
    },
    {
      id: 2,
      blockStyle: "stylecard2",
      icon: "flaticon-user",
      timer: views,
      name: "Quotes Provided",
    },
    {
      id: 3,
      blockStyle: "stylecard3",
      icon: "flaticon-invoice",
      timer: bids,
      name: "Quotes Accepted",
    },
    {
      id: 4,
      blockStyle: "stylecard4",
      icon: "flaticon-heart",
      timer: favourites,
      name: "Quotes in Progress",
    },
    {
      id: 5,
      blockStyle: "stylecard5",
      icon: "flaticon-invoice",
      timer: favourites,
      name: "Quotes Completed",
    },
    {
      id: 6,
      blockStyle: "stylecard6",
      icon: "flaticon-house",
      timer: favourites,
      name: "Quotes on HOLD",
    },
    {
      id: 7,
      blockStyle: "stylecard7",
      icon: "flaticon-tick",
      timer: favourites,
      name: "Cancelled Properties",
    },
    {
      id: 8,
      blockStyle: "stylecard8",
      icon: "flaticon-heart",
      timer: favourites,
      name: "On Hold Properties",
    },
    {
      id: 9,
      blockStyle: "stylecard9",
      icon: "flaticon-heart",
      timer: favourites,
      name: "Plan",
    },
    {
      id: 10,
      blockStyle: "stylecard10",
      icon: "flaticon-house",
      timer: favourites,
      name: "Plan validity",
    },
    {
      id: 11,
      blockStyle: "stylecard11",
      icon: "flaticon-invoice",
      timer: favourites,
      name: "No. of Properties",
    },
    {
      id: 12,
      blockStyle: "stylecard12",
      icon: "flaticon-tick",
      timer: favourites,
      name: "Used Properties",
    },
  ];

  return (
    <div className="statistics-container">
      {allStatistics.map((item) => (
        <div key={item.id} className={`ff_one ${item.blockStyle}`}>
          <div className="details">
            <div className="timer">{item.name}</div>
            <p>{item.timer}</p>
          </div>
          <div className="icon">
            <span className={item.icon}></span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllStatistics;
