import React, { useState, useEffect } from "react";
import { styled } from "@mui/material";
import Select from "react-select";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import getStatistic from "./../../../API/getStatistic";

import { selectStyles } from "./selectStyles";

const currentMonth = new Date().getMonth() + 1;
const months = Array.from({ length: 12 }, (item, i) => {
  return format(new Date(0, i), "LLLL", {
    locale: enUS,
  });
});

const getRandomColor = () => {
  return (
    "#" + (Math.random().toString(16) + "000000").substring(2, 8).toUpperCase()
  );
};

const monthOptions = Array(12)
  .fill(null)
  .map((item, index) => ({ value: index + 1, label: months[index] }));

const currentYear = new Date().getFullYear();
const years = [];
for (let i = currentYear; i >= 2018; i--) {
  years.push({ value: i, label: i.toString() });
}

const createDataObj = ({ categories, totalIncome, totalSpent }) => {
  return categories?.length > 0
    ? {
        categories: categories.map(({ _id, total }) => ({
          name: _id,
          total,
          color: getRandomColor(),
        })),
        total: {
          Expenses: totalSpent[0]?.spent,
          Income: totalIncome[0]?.income,
        },
      }
    : {
        categories: [
          {
            name: "",
            total: 1,
            color: "#777777",
          },
        ],
        total: {
          Expenses: 0,
          Income: 0,
        },
      };
};

function TableFilters({ setStatistic }) {
  const [date, setDate] = useState({
    month: currentMonth,
    year: currentYear,
  });

  useEffect(() => {
    getStatistic().then((data) => setStatistic(createDataObj(data)));
  }, [setStatistic]);

  const updateDate = (name, value) => {
    const newDate = { ...date, [name]: value };
    setDate(newDate);
    getStatistic(newDate).then((data) => setStatistic(createDataObj(data)));
  };

  return (
    <Container>
      <Select
        styles={selectStyles}
        options={monthOptions}
        placeholder="Month"
        onChange={(option) => {
          updateDate("month", option.value);
        }}
        isSearchable={false}
        defaultValue={monthOptions.find((month) => month.value === date.month)}
      />
      <Select
        styles={selectStyles}
        options={years}
        placeholder="Year"
        onChange={(option) => {
          updateDate("year", option.value);
        }}
        isSearchable={false}
        defaultValue={years.find((year) => year.value === date.year)}
      />
    </Container>
  );
}

export default TableFilters;

const Container = styled("div")`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  margin-left: 0;
  margin-right: auto;
  width: 350px;

  @media screen and (max-width: 767px) {
    margin-top: 30px;
    margin-right: auto;
    flex-direction: column;
    max-width: 280px;
  }
`;
