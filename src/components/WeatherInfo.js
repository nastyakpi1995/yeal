import React from 'react';
import { connect } from 'react-redux';
import Map from './Map/Map';
import styled from 'styled-components';
import * as actions from '../redux/actions';
import Slider from "./Slider";

const WeatherInfo = ({ currentCountry, weatherErrors }) => {
    const res = currentCountry  !== null && weatherErrors === null;

    return (
        <Wrap>
            <Map />
            {res ? (
                   <Slider />
            ) : weatherErrors && <div>{weatherErrors}</div>}

        </Wrap>
    )
};

const Wrap = styled.div`
  display: flex;
`;

const mapStateToProps = (state) => ({
    currentCountry: state.getWeather.currentCountry,
    weatherErrors: state.getWeather.weatherErrors,
    weatherLoading: state.getWeather.weatherLoading
});

export default connect(mapStateToProps, actions)(WeatherInfo);
