import axios from 'axios';

const API_KEY = '8f8fd1ff7155b8a8bd3e6ad246e3f857'; 

export const fetchWeather = async (city) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  return response.data;
};
