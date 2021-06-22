import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import clear from './images/clear.png';
import overcast from './images/overcast.png';
import partiallyCloudy from './images/partiallyCloudy.png';


const WeatherBlock = styled.div`
    text-align: center;
    float: left;
    margin: 10px;
    color: #444;
    background: #eee;
    border-radius: 20px;
    width: 80px;
    font-family: Arial, Helvetica, sans-serif;
`


const WeatherItem = (props) => {
    const [weather, setWeather] = useState('');
    const [img, setImg] = useState('');

    async function weatherData() {        
        const promise = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?aggregateHours=24&combinationMethod=aggregate&contentType=json&unitGroup=metric&locationMode=single&key=X4HHG8EALDTD8YPFBRSSF88XK&dataElements=default&locations=Kartuzy')
        const data = await promise.json();
        const weatherToday = await data.location.values[props.id];
        setWeather({temp: weatherToday.temp, condition: weatherToday.conditions});
    }
    useEffect(() => {
        weatherData();
    });
    useEffect(() => {
        if(weather.condition === 'Overcast') {
            setImg(overcast);
        } else if(weather.condition === 'Partially cloudy') {
            setImg(partiallyCloudy);
        } else {
            setImg(clear);
        }
    }, [weather]);
    let day = '';
    switch ((new Date().getDay() + parseInt(props.id))%7) {
        case 0:
            day = 'Sun';
            break;
        case 1:
            day = 'Mon';
            break;
        case 2:
            day = 'Tue';
            break;
        case 3:
            day = 'Wed';
            break;
        case 4:
            day = 'Thu';
            break;
        case 5:
            day = 'Fri';
            break;
        default:
            day = 'Sat';
    } 
return (
    <>
    <WeatherBlock> 
    <p>{day}</p>
    <img src={img} alt='not found'/>
    <p>{weather.temp}</p>
    </WeatherBlock>
    </>
);
}
   

export default WeatherItem;