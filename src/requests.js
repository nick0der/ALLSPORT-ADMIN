import axios from "axios";

const BASE_URL = "https://allsport-api.herokuapp.com/api/";
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken;

//const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNTU1N2U0MzNjOTMyMjQ2YjFhZmY5MiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MDQ4MDg2MCwiZXhwIjoxNjUwNzQwMDYwfQ.NRh5ekcmxLKDOHBp6LOidCBef6aYcQk3Q3NOJAk9Gtc"
const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;
console.log(TOKEN);

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
