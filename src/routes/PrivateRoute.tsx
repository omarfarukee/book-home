/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react-hooks/rules-of-hooks */
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hook";

interface IProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: IProps) => {
  const { user, isLoading } = useAppSelector(
    (state: { user: any }) => state.user
  );
  const pathName = useLocation();
  if (isLoading) {
    return <p>loading...</p>;
  }
  if (!user.email && !isLoading) {
    return <Navigate to="/login" state={{ path: pathName }} />;
  }

  return children;
};

// export default privateRoute;
