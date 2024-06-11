import React from "react";
import ButtonIcon from "../../ui/ButtonIcon";
import { HiOutlineLogout } from "react-icons/hi";
import SpinnerMini from "../../ui/SpinnerMini";
import { useLogout } from "./useLogout";

const LogoutButton = () => {
  const { logout, isLoading } = useLogout();
  return (
    <ButtonIcon disabled={isLoading} onClick={logout}>
      {!isLoading ? <HiOutlineLogout /> : <SpinnerMini />}
    </ButtonIcon>
  );
};

export default LogoutButton;
