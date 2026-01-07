import Maintenance from "./Maintainance";

const MaintenanceGuard = ({ children }) => {
  const IS_MAINTENANCE = false;
  if (IS_MAINTENANCE) {
    return <Maintenance />;
  }
  return children;
};


export default MaintenanceGuard;
