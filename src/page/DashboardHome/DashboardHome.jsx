import { useNavigate } from "react-router-dom";
import DashboardOverviewStatus from "../../component/Main/Home/DashboardOverviewStatus";
import GrouthAndSubscriptionOverview from "../../component/Main/Home/GrouthAndSubscriptionOverview";

import AllAgencies from "../../component/Main/Home/AllAgencies";

const DashboardHome = () => {

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  
  // if (!user) {
  //   navigate("/auth");
  //   return null;
  // }

  return (
    <section className="my-5">
 
      <DashboardOverviewStatus />
      <br />
      <GrouthAndSubscriptionOverview />
      {/* <AllAgencies /> */}
    </section>
  );
};

export default DashboardHome;
