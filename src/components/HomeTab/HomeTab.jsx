import BalanceBox from "../BalanceBox";
import Currency from "../Currency";
import Navigation from "../Navigation";
import NavBalanceWrapper from "../NavBalanceWrapper";
import NavBalanceCurrencyWrapper from "../NavBalanceCurrencyWrapper";
import { useMediaQuery } from "@mui/material";
import { useLocation } from "react-router-dom";

export default function HomeTab(props) {
  const matches = useMediaQuery("(min-width:768px)");
  const match = useLocation();

  return (
    <NavBalanceCurrencyWrapper>
      <NavBalanceWrapper>
        <Navigation />
        {match.pathname === "/home" ? <BalanceBox /> : null}
      </NavBalanceWrapper>
      {matches && <Currency />}
    </NavBalanceCurrencyWrapper>
  );
}
