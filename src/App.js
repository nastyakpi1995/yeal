import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as actions from './redux/actions';
import WeatherInfo from './components/WeatherInfo';

const App = ({ weatherLoading }) => {
  return (
      <Global>
        {weatherLoading ? (
                <div>loading</div>
            )
            : <WeatherInfo />}
      </Global>
  )
}

const Global = styled.div`
    display: flex;
    justify-content: center;
`;

const mapStateToProps = (state) => ({
  weatherLoading: state.getWeather.weatherLoading
});

export default connect(mapStateToProps, actions)(App);
