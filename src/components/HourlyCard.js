import React from 'react';
import moment from 'moment';
import '../styles/HourlyCard.css';


function HourlyCard({day}) {
const dayIcon = `${process.env.REACT_APP_ICON_URL + day.weather[0]["icon"]}@2x.png`;
return (
    <li className="hourly-items">
        <div>
            <p>{Math.round(day.main.temp)}&deg;C</p>
            <p>
                {day.weather[0].main}
                <img src={dayIcon}  alt="icon" />
            </p>
            <p>{day.weather[0].description}</p>
            <p>{moment(day.dt_txt).format('hh:mm a')}</p>   
        </div>
    </li>
);
};

export default  HourlyCard;     