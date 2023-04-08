import axios from "axios";

export default async function getStatistic(date) {
  const { data } = date
    ? await axios.get(
        `/transactions/statistics?month=${date.month}&year=${date.year}`
      )
    : await axios.get("/transactions/statistics");
  return data;
}
