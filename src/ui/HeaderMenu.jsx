import { HiOutlineUser } from "react-icons/hi";
import ButtonIcon from "../ui/ButtonIcon";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../features/authentication/LogoutButton";
import { styled } from "styled-components";
import DarkModeToggle from "./DarkModeToggle";

const StyleHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

function HeaderMenu() {
  const navigate = useNavigate();

  return (
    <StyleHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <LogoutButton />
      </li>
    </StyleHeaderMenu>
  );
}

export default HeaderMenu;
