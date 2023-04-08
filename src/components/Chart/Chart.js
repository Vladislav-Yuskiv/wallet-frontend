import React, { useState } from "react";
import { styled } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import DiagramTab from "./DiagramTab";
import { useSelector } from "react-redux";
import { userSelectors } from "./../../redux/user";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Chart() {
  const balance = useSelector(userSelectors.getUserBalance);
  const [statistic, setStatistic] = useState([]);

  const arrName = [];
  const arrTotal = [];
  const arrColor = [];

  statistic.categories &&
    statistic.categories.forEach((item) => {
      arrName.push(item.name);
      arrTotal.push(item.total);
      arrColor.push(item.color);
    });

  const data = {
    labels: [...arrName],
    datasets: [
      {
        label: "# of Votes",
        data: [...arrTotal],
        backgroundColor: [...arrColor],
        borderWidth: 0,
        cutout: 110,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "24000",
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <>
      <Wrapper>
        <Title>Statistics</Title>
        <RightTab>
          {statistic?.categories?.length > 0 && (
            <ChartBlock>
              <Doughnut data={data} options={options} />
              <Balance>
                <p>&#x20b4; {(balance / 100).toFixed(2)}</p>
              </Balance>
            </ChartBlock>
          )}
          <LegendWrapper>
            <DiagramTab data={statistic} setStatistic={setStatistic} />
          </LegendWrapper>
        </RightTab>
      </Wrapper>
    </>
  );
}

const Wrapper = styled("div")`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (min-width: 768px) {
    display: block;
    width: 700px;
  }
`;

const ChartBlock = styled("div")`
  position: relative;
  width: 280px;
  height: 280px;

  @media screen and (min-width: 768px) {
    width: 320px;
    height: 320px;
    margin-right: 30px;
  }
`;

const Balance = styled("div")`
  position: absolute;
  top: 130px;
  left: 60px;
  width: 156px;
  font-weight: 800;
  font-size: 18px;
  text-align: center;

  @media screen and (min-width: 768px) {
    top: 150px;
    left: 83px;
  }
`;

const RightTab = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    width: 700px;
  }

  @media screen and (min-width: 1280px) {
    margin-left: 30px;
  }
`;

const Title = styled("p")`
  font-size: 30px;
  line-height: 1.5;
  margin-bottom: 20px;

  @media screen and (min-width: 768px) {
    margin-left: 30px;
  }
`;

const LegendWrapper = styled("div")`
  width: 280px;

  @media screen and (min-width: 768px) {
    width: 350px;
  }
`;
