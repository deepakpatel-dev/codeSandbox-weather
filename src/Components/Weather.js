import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function Weather() {
  const [title, setTitle] = useState("");
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (title) {
      fetch(
        `https://api.weatherapi.com/v1/current.json?key=8f0593874c8b45c6a6430511232906&q=${title}&aqi=no`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setErrorMessage(data.error.message);
          } else {
            setData(data);
            setErrorMessage("");
          }
        })
        .catch((error) => {
          setErrorMessage("Error fetching weather data.");
        });
    }
  }, [title]);

  return (
    <div className="App">
      <TextField
        id="standard-basic"
        label="Enter the Location"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        variant="standard"
      />
      {errorMessage ? (
        <Typography variant="body1" color="error">
          {errorMessage}
        </Typography>
      ) : (
        data.location && (
          <Card>
            <CardContent>
              <Typography variant="h6">{data.location.name}</Typography>
              <Typography color="text.secondary">
                Temperature: {data.current.temp_c}/ {data.current.temp_f}
              </Typography>
              <Typography color="text.secondary">
                Conditions: {data.current.condition.text}
              </Typography>
              <Typography color="text.secondary">
                Wind Speed: {data.current.wind_kph} km/h
              </Typography>
              <Typography color="text.secondary">
                Humidity: {data.current.humidity}%
              </Typography>
              <Typography color="text.secondary">
                Cloud Coverage : {data.current.cloud}%
              </Typography>
              <Typography color="text.secondary">
                Last Updated : {data.current.last_updated}
              </Typography>
            </CardContent>
          </Card>
        )
      )}
    </div>
  );
}
