import axios from "axios";

const axios = ({method,route, options}) => {
  const response = axios(method)(`http://localhost:3000/${route}`, {options});

  return response;
};
