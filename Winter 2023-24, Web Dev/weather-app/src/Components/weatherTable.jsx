import React from 'react';
import WeatherColumn from './weatherColumn';
import sunnyImg from './Images/sunny.png';
import cloudyImg from './Images/cloudy.png';
import snowingImg from './Images/snowing.png';
import lightningImg from './Images/lightning.png';
import rainingImg from './Images/raining.png';

function WeatherTable() {
    return (
        <div className = "container">
            <table>
                <tbody>
                    <tr>
                        <td><WeatherColumn 
                            number='1'
                            day='Monday'
                            date='22 January 2024'
                            image={sunnyImg}
                            temp='25°C'
                            description='Sunny weather.'
                        /></td>
                        <td><WeatherColumn 
                            number='2'
                            day='Tuesday'
                            date='23 January 2024'
                            image={cloudyImg}
                            temp='13°C'
                            description='Cloudy weather.'
                        /></td>
                        <td><WeatherColumn 
                            number='3'
                            day='Wednesday'
                            date='24 January 2024'
                            image={rainingImg}
                            temp='9°C'
                            description='Rainy weather.'
                        /></td>
                        <td><WeatherColumn 
                            number='4'
                            day='Thursday'
                            date='25 January 2024'
                            image={lightningImg}
                            temp='3°C'
                            description='Rainy weather with lightning.'
                        /></td>
                        <td><WeatherColumn 
                            number='5'
                            day='Friday'
                            date='26 January 2024'
                            image={snowingImg}
                            temp='-7°C'
                            description='Snowy weather.'
                        /></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default WeatherTable;