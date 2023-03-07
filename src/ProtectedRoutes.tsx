import { Navigate } from "react-router-dom";
import useUserAuth from "./components/hooks/useUserAuth";
interface IProtectedRoutesProps {
  children: React.ReactElement;
}

const ProtectedRoutes = ({ children }: IProtectedRoutesProps) => {
  const isAuth = useUserAuth();

  if (!isAuth) {
    return <Navigate to={"/"} />;
  }
  return <>{children}</>;
};

export default ProtectedRoutes;
