import React from 'react';

function WeatherColumn({number, day, weather, temp}) {
    return (
        <div class='columnDiv'>
            <center>
                <h2>{day}</h2>
                <img src={require(weather)} class='weatherImage'/>
                {/* <img src={require('./Images/sunny.png')} alt="" class='weatherImage'/> */}
            </center>
        </div>
    );
}

export default WeatherColumn;