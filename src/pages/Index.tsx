
import { Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";

const Index = () => {
  const { isAuthenticated } = useAppContext();
  const location = useLocation();

  return (
    <Navigate 
      to={isAuthenticated ? "/" : "/auth"} 
      state={{ from: location }} 
      replace 
    />
  );
};

export default Index;
