import { useState } from 'react';
import WeatherCard from './components/WeatherCard';
import HourlyCard from './components/HourlyCard';

import { TbMapSearch } from 'react-icons/tb';
import { TbSearch } from 'react-icons/tb';

function App() {    
    const API_KEY = process.env.REACT_APP_API_KEY;

    const [city, setCity] = useState('Unknown location');
    const [weatherData, setWeatherData] = useState([]);
    const [noData, setNoData] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [weatherIcon, setWeatherIcon] = useState(`${process.env.REACT_APP_ICON_URL}10n@2x.png`);

    const handleChange = input => {
        const {value} = input.target;
        setSearchTerm(value);
    };

    const handleSubmit = (e) => { 
        e.preventDefault();
        getWeather(searchTerm);
    };

    const getWeather = async (location) => {
        setWeatherData([]);
        const howToSearch = (typeof location === 'string') ? `q=${location}` : `lat=${location[0]}&lon=${location[1]}`;

    try {
        const res = await fetch(`${process.env.REACT_APP_URL+howToSearch}
        &appid=${API_KEY}&units=metric&cnt=5&exclude=hourly,minutely`);
        const data = await res.json();
        
        // eslint-disable-next-line eqeqeq
        if(data.cod != 200) {
        setNoData('Location Not Found');
        return
        }
        setWeatherData(data);
        setCity(`${data.city.name}, ${data.city.country}`);
        setWeatherIcon(`${process.env.REACT_APP_ICON_URL + data.list[0].weather[0]["icon"]}@4x.png`);
    } catch (error) {
        console.log(error);
    };
    };

    const myIP = (location) => {
    const {latitude, longitude} = location.coords;
    getWeather([latitude, longitude]);
    };

    return (
    <div className="container">
    
    <nav>
        <div className="navbar">
            <div className="navbar__logo">
                <h1>Weather App</h1>
            </div>
            <div className="navbar__city">
                <TbMapSearch />
            <p>{city}</p>
            </div>
        </div>    
    </nav>      


    <main>
        <div className="search">
            <form className="search__input" noValidate onSubmit={handleSubmit}>
                <input  
                    className="search__input-box" 
                    type="text"  
                    placeholder='Search location...' 
                    onChange={handleChange} 
                    required
                />
                <button className="search__input-submit">
                <TbSearch 
                    onClick={() => {
                    navigator.geolocation.getCurrentPosition(myIP)
                }}
                />
                </button>
            </form>
        </div>

        <div className="info-container">
            {weatherData.length === 0 ? 
                <div className="info__nodata">
                    <h1>{noData}</h1>
                </div> : 
                <>
                    <h1 className="info__title">Today</h1>
                <WeatherCard 
                    className="info__hourly" 
                    weatherIcon={weatherIcon} 
                    data={weatherData} 
                />
                    <h1 className="info__title">More On {city}</h1>
                <ul className="info__hourly">
                    {weatherData.list.map((days,index) => {
                        if (index > 0) {
                            return (
                                <HourlyCard key={index} day={days} />
                            );
                        };
                    })}
                </ul>
                </>
            };
        </div>
    </main>
    </div>
    );
};

export default App;