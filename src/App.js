import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as actions from './redux/actions';
import Loader from 'react-loader-spinner';
import WeatherInfo from './components/WeatherInfo';

const App = ({ weatherLoading }) => {
  return (
      <Global>
        {weatherLoading ? (
                <LoaderContainer>
                    <Loader
                        type="Circles"
                        color="#00BFFF"
                        height={500}
                        width={100}
                    />
                </LoaderContainer>
            )
            : <WeatherInfo />}
      </Global>
  )
}

const Global = styled.div`
    display: flex;
    justify-content: center;
`;

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
`;


const mapStateToProps = (state) => ({
  weatherLoading: state.getWeather.weatherLoading
});

export default connect(mapStateToProps, actions)(App);
