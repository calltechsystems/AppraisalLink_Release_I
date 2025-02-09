import { useMemo } from "react";

const AllStatistics = ({ properties, views, bids, favourites }) => {
  const {
    allPropertiesCount,
    quotesProvidedCount,
    QuotesInProgressCount,
    QuotesCompletedCount,
    QuotesOnHoldCount,
    CancelledPropertiesCount,
    OnHoldPropertiesCount,
    PlanCount,
    PlanValidityCount,
    NoOfPropertiesCount,
    UsedPropertiesCount,
  } = useMemo(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    let allPropertiesCount = 0;
    let quotesProvidedCount = 0;
    let QuotesInProgressCount = 0;
    let QuotesCompletedCount = 0;
    let QuotesOnHoldCount = 0;
    let CancelledPropertiesCount = 0;
    let OnHoldPropertiesCount = 0;
    let PlanCount = 0;
    let PlanValidityCount = 0;
    let NoOfPropertiesCount = 0;
    let UsedPropertiesCount = 0;

    properties.forEach((property) => {
      if (property.userId == userData?.userId) {
        allPropertiesCount += 1;
        CancelledPropertiesCount += property?.isonhold ? 1 : 0;
        OnHoldPropertiesCount += property?.isoncancel ? 1 : 0;

        bids.forEach((bid) => {
          if (bid.orderId == property?.orderId) {
            quotesProvidedCount += 1;
            QuotesInProgressCount += bid?.status === 1 ? 1 : 0;
            QuotesCompletedCount += bid?.status === 2 ? 1 : 0;
            QuotesOnHoldCount += bid?.status === 3 ? 1 : 0;
          }
        });
      }
    });


    //Plan Data
    const currentPlanInfo = userData?.plans?.$values ? userData?.plans?.$values[0] : {};
    if(currentPlanInfo){
      PlanValidityCount = currentPlanInfo?.planValidity;
      PlanCount = currentPlanInfo?.planName;
      NoOfPropertiesCount = currentPlanInfo?.noOfProperties;
      UsedPropertiesCount = userData?.usedproperty || 0;
    }

    return {
      allPropertiesCount,
      quotesProvidedCount,
      QuotesInProgressCount,
      QuotesCompletedCount,
      QuotesOnHoldCount,
      CancelledPropertiesCount,
      OnHoldPropertiesCount,
      PlanCount,
      PlanValidityCount,
      NoOfPropertiesCount,
      UsedPropertiesCount,
    };
  }, [properties, bids]);

  const allStatistics = useMemo(() => [
    {
      id: "allPropertiesCount",
      blockStyle: "stylecard1",
      icon: "flaticon-house",
      value: allPropertiesCount,
      name: "All Properties",
    },
    {
      id: "quotesProvidedCount",
      blockStyle: "stylecard2",
      icon: "flaticon-invoice",
      value: quotesProvidedCount,
      name: "Quotes Provided",
    },
    {
      id: "QuotesInProgressCount",
      blockStyle: "stylecard4",
      icon: "flaticon-heart",
      value: QuotesInProgressCount,
      name: "Quotes in Progress",
    },
    {
      id: "QuotesCompletedCount",
      blockStyle: "stylecard5",
      icon: "flaticon-invoice",
      value: QuotesCompletedCount,
      name: "Quotes Completed",
    },
    {
      id: "QuotesOnHoldCount",
      blockStyle: "stylecard6",
      icon: "flaticon-house",
      value: QuotesOnHoldCount,
      name: "Quotes on HOLD",
    },
    {
      id: "CancelledPropertiesCount",
      blockStyle: "stylecard7",
      icon: "flaticon-tick",
      value: CancelledPropertiesCount,
      name: "Cancelled Properties",
    },
    {
      id: "OnHoldPropertiesCount",
      blockStyle: "stylecard8",
      icon: "flaticon-heart",
      value: OnHoldPropertiesCount,
      name: "On Hold Properties",
    },
    {
      id: "PlanCount",
      blockStyle: "stylecard9",
      icon: "flaticon-heart",
      value: PlanCount,
      name: "Plan",
    },
    {
      id: "PlanValidityCount",
      blockStyle: "stylecard10",
      icon: "flaticon-house",
      value: PlanValidityCount,
      name: "Plan Validity",
    },
    {
      id: "NoOfPropertiesCount",
      blockStyle: "stylecard11",
      icon: "flaticon-invoice",
      value: NoOfPropertiesCount,
      name: "No. of Properties",
    },
    {
      id: "UsedPropertiesCount",
      blockStyle: "stylecard12",
      icon: "flaticon-tick",
      value: UsedPropertiesCount,
      name: "Used Properties",
    },
  ], [
    allPropertiesCount,
    quotesProvidedCount,
    QuotesInProgressCount,
    QuotesCompletedCount,
    QuotesOnHoldCount,
    CancelledPropertiesCount,
    OnHoldPropertiesCount,
    PlanCount,
    PlanValidityCount,
    NoOfPropertiesCount,
    UsedPropertiesCount,
  ]);

  return (
    <div className="statistics-container">
      {allStatistics.map((item) => (
        <div key={item.id}  className={`ff_one ${item.blockStyle}`}>
          <div className="details">
            <div className="timer">{item.value}</div>
            <p>{item.name}</p>
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
