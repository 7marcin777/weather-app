import React from 'react';
import moment from 'moment';
import '../styles/WeatherCard.css';

function WeatherCard({weatherIcon, data}) {
    const {clouds, main, weather} = data.list[0];
    return (
    <div className="weather">
        <div className="weather__clouds">
        <p className="weather__celsius">{Math.round(main.temp)}&deg;C</p>
            <div className="weather__icon">
                {weather[0].main}
                <img src={weatherIcon} alt="icon" />
            </div>
        <p className="weather__des">{weather[0].description}</p>
        <p>{moment().format("dddd MMM YYYY")}</p>
        </div>
        <div className="weather__info">
            <p>RealFell: {Math.round(main.feels_like)}&deg;C</p>
            <p>Humidity: {main.humidity}%</p>
            <p>Cloud Cover: {clouds.all}</p>
            <p>Min Temp: {Math.round(main.temp_min)}&deg;C</p>
            <p>Max Temp: {Math.round(main.temp_max)}&deg;C</p>
        </div> 
    </div>
    );
};  

export default WeatherCard;