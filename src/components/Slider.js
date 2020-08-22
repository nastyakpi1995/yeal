import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as actions from '../redux/actions';

const WeatherInfo = ({ currentCountry }) => {
    const weather = currentCountry.weather.map(desc => desc.description);

    return (
        <Weather imgWeather={weather}>
            <Title>{currentCountry.name}</Title>
            <ul>
                <li>{weather}</li>
                <li>{currentCountry.main.temp}</li>
                <li>{currentCountry.main.humidity}</li>
            </ul>
        </Weather>
    )
};

const Weather = styled.div`
  background:  ${({ imgWeather }) => {
      const weather = imgWeather[0];
      debugger
      if (weather === "overcast clouds") {
          debugger
          return `url('Cloud.jpg')`
      } else 
      if (weather === "clear sky") {
          
          return `url('sky1200.jpg')`
      } else 
      if (weather === "scattered clouds") {
          return `url('scattered_clouds.jpg')`
      }
}};
`;

const Title = styled.h1`
      color: whitesmoke;
`;

const mapStateToProps = (state) => ({
    currentCountry: state.getWeather.currentCountry,
    weatherErrors: state.getWeather.weatherErrors,
    weatherLoading: state.getWeather.weatherLoading
});

export default connect(mapStateToProps, actions)(WeatherInfo);
