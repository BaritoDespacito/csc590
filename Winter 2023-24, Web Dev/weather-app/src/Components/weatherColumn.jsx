import React from 'react';

function WeatherColumn({number, day, date, image, temp, description}) {
    return (
        <div className='columnDiv'>
            <center>
                <h1>{day}</h1>
                <h3>{date}</h3>
                <img src={image} className='weatherImage'/>
                <h1>{temp}</h1>
                <h2>{description}</h2>
            </center>
        </div>
    );
}

export default WeatherColumn;