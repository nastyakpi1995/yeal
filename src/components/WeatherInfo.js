import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as actions from '../redux/actions';
import Content from "./Content";
import Map from './Map/Map';
import './Weather.scss';

const WeatherInfo = ({ currentCountry, weatherErrors, setCurrentlyCountry }) => {
    const res = currentCountry !== null && weatherErrors === null;

    const handlerExit = () => {
        setCurrentlyCountry()
    }

    return (
        <Wrap>
            <Map />
            {res ? (
                   <Content />
            ) : weatherErrors && (
                <div className="container">
                    <div className="bowl"></div>
                    <div className="water">
                        <div className="body">
                            <div className="eye"></div>
                            <div className="fin-center"></div>
                            <div className="fin top"></div>
                            <div className="fin bottom"></div>
                            <div className="tail"></div>
                        </div>
                    </div>
                    <h1>{weatherErrors}</h1>
                    <Button onClick={handlerExit}>X</Button>
                </div>
            )}

        </Wrap>
    )
};

const Button = styled.button`
   position: absolute;
   top: 0;
   right: 0;
   border: none;
   background: transparent;
   font-size: 30px;
   cursor: pointer;
`;

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
