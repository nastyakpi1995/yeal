import React from 'react';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import WeatherInfo from './components/WeatherInfo';

const App = ({ weatherLoading }) => {
    debugger
    return (
        <div>
            {weatherLoading ? (
                <div>loading</div>
            )
                : <WeatherInfo />}
        </div>
    )
}

const mapStateToProps = (state) => ({
    weatherLoading: state.getWeather.weatherLoading
});

export default connect(mapStateToProps, actions)(App);
