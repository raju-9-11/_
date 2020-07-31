import React from 'react';

const ForecastAnalysis = (props) => {
    return (
        <div className="forecast_analysis_container">
            <iframe src="https://www.weather-forecast.com/"  style={{width:'100%',height:'2500px'}}/>
        </div>
    )
}
export default ForecastAnalysis;