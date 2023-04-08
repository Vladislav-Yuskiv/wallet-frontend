import React from "react";
import { styled } from "@mui/material";
import TableFilters from "../Select/Select";
import Category from "../Category/Category";

export default function DiagramTab({ data, setStatistic }) {
  return (
    <>
      <TableFilters setStatistic={setStatistic} />
      {data?.total?.Expenses > 0 && (
        <>
          <CategoryItem>
            <Title>Category</Title>
            <Title>Amount</Title>
          </CategoryItem>

          <Category data={data} />

          <Amount>
            <AmountTitle>Expenses</AmountTitle>
            <Expenses>{(data.total.Expenses / 100).toFixed(2)}</Expenses>
          </Amount>
          <Amount>
            <AmountTitle>Income</AmountTitle>
            <Income>{(data.total.Income / 100).toFixed(2)}</Income>
          </Amount>
        </>
      )}
    </>
  );
}

const CategoryItem = styled("div")`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  margin-top: 20px;
  border-radius: 30px;
`;

const Title = styled("div")`
  font-weight: 800;
  font-size: 18px;
  line-height: 1.16;
  padding-top: 16px;
  padding-bottom: 21px;
  padding-left: 30px;
  padding-right: 30px;
  color: #000000;
`;

const Amount = styled("div")`
  width: 100%;
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  margin-left: 20px;
  padding-right: 40px;
`;

const AmountTitle = styled("div")`
  font-weight: 800;
  font-size: 16px;
  line-height: 19px;
`;

const Expenses = styled("div")`
  font-weight: 800;
  font-size: 16px;
  line-height: 19px;
  color: #ff6596;
`;

const Income = styled("span")`
  font-weight: 800;
  font-size: 16px;
  line-height: 19px;
  color: #24cca7;
`;
