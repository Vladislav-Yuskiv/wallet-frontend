import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//axios.defaults.baseURL = "https://wallet-project-group-1.herokuapp.com";
axios.defaults.baseURL = 'http://localhost:3001'
const getDevelopers = createAsyncThunk(
  "developers/all",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/developers");
      return data;
    } catch (error) {
      return handleError(error, rejectWithValue);
    }
  }
);

getDevelopers();

function handleError(error, rejectWithValue) {
  const { status } = error.response;
  const { message } = error.response.data;
  const resError = {
    status,
    message,
  };
  return rejectWithValue(resError);
}

const teamOperations = {
  getDevelopers,
};

export default teamOperations;
