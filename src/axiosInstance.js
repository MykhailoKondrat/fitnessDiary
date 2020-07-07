import axios from "axios";

const instance = axios.create({
  baseURL: "https://fitnessdiary-7595a.firebaseio.com/",
});

export default instance;
