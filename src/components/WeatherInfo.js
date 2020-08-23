import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as actions from '../redux/actions';
import Content from "./Content";
import Map from './Map/Map';

const WeatherInfo = ({ currentCountry, weatherErrors }) => {
    const res = currentCountry  !== null && weatherErrors === null;

    return (
        <Wrap>
            <Map />
            {res ? (
                   <Content />
            ) : weatherErrors && <div>{weatherErrors}</div>}

        </Wrap>
    )
};

const Wrap = styled.div`
      display: flex;
      justify-content: space-between;
`;

const mapStateToProps = (state) => ({
    currentCountry: state.getWeather.currentCountry,
    weatherErrors: state.getWeather.weatherErrors,
    weatherLoading: state.getWeather.weatherLoading
});

export default connect(mapStateToProps, actions)(WeatherInfo);
