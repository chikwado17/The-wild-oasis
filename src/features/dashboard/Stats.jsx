import React from "react";
import Stat from "./Stat";
import {
  HiOutlineBriefcase,
  HiOutlineCalculator,
  HiOutlineCalendar,
  HiOutlineChartBar,
} from "react-icons/hi";
import { formatCurrency } from "../../utils/helpers";

const Stats = ({ bookings, confirmedStays, numDays, cabinCount }) => {
  //1. number of bookings
  const numBookings = bookings?.length;

  //2. Total sales
  const sales = bookings?.reduce((acc, cur) => acc + cur.totalPrice, 0);

  //3. Number of stays
  const checkins = confirmedStays.length;

  //4. Occupancy rate
  //   num of checked in nights / all avaliable night (num of days * num of cabins)
  const occupancy =
    confirmedStays?.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        title={"Bookings"}
        color={"blue"}
        value={numBookings}
        icon={<HiOutlineBriefcase />}
      />
      <Stat
        title={"Sales"}
        color={"green"}
        value={formatCurrency(sales)}
        icon={<HiOutlineCalculator />}
      />
      <Stat
        title={"Check ins"}
        color={"indigo"}
        value={checkins}
        icon={<HiOutlineCalendar />}
      />
      <Stat
        title={"Occupancy rate"}
        color={"yellow"}
        value={Math.round(occupancy * 100) + "%"}
        icon={<HiOutlineChartBar />}
      />
    </>
  );
};

export default Stats;
