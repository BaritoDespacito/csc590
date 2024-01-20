import React from 'react';
import WeatherColumn from './weatherColumn';

function WeatherTable() {
    return (
        <div>
            <table border='2px'>
                <tr>
                    <td><WeatherColumn 
                        number='1'
                        day='Monday'
                        weather='./Images/sunny.png'
                    /></td>
                    <td><WeatherColumn 
                        number='2'
                        day='Tuesday'
                        weather='./Images/sunny.png'
                    /></td>
                    <td><WeatherColumn 
                        number='3'
                        day='Wednesday'
                        weather='./Images/sunny.png'
                    /></td>
                    <td><WeatherColumn 
                        number='4'
                        day='Thursday'
                        weather='./Images/sunny.png'
                    /></td>
                    <td><WeatherColumn 
                        number='5'
                        day='Friday'
                        weather='./Images/sunny.png'
                    /></td>
                </tr>
            </table>
        </div>
    );
}

export default WeatherTable;