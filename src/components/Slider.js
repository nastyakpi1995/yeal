import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getCities } from 'countries-cities';
import styled from 'styled-components';
import * as actions from '../redux/actions';
import '../App.scss';

const WeatherInfo = ({ currentCountry, requestGetWeather, setCurrentlyCountry }) => {
    const [IsModal, setIsModal] = useState(true);
    const [value, setValue] = useState('');
    const [arrayCity, setArrayCity] = useState(null);
    const [setStep, setSetStep] = useState(10);
    const [arrayIcon, setArrayIcon] = useState([]);

    const isDisable = getCities(currentCountry.name) === 'undefined';

    const temp = currentCountry.main.temp;

    const wind = currentCountry.wind.speed;

    useEffect(() => {
        const icon = whithMainWeather('main').join('').toLowerCase();

        if (icon === 'rain') {

            setArrayIcon(arrayIcon.concat('cloud', 'sprinkles'));

        } else if (currentCountry.main.humidity > 55) {

            setArrayIcon(arrayIcon.concat('sprinkles', 'sprinkles', 'sprinkles'));
        } else if (icon === 'clouds') {

            setArrayIcon(arrayIcon.concat('cloud'))
        } else if (icon === 'clear') {

            setArrayIcon(arrayIcon.concat('sun'));
        } else {

            setArrayIcon(arrayIcon.concat(icon));
        }
    }, [])
    const whithMainWeather = (weather) => {
        return currentCountry.weather.map(item => item[weather])
    }


    const handlerCancel = () => {
        setIsModal(false);
        setCurrentlyCountry()
    };

    const changeSuggest = (el) => {
        const target = el.target.value;
debugger
        const currentCity = currentCountry.name;

        const allCity = getCities(currentCity);

        setValue(target)

        const arrayPlace = allCity.filter(item => {
            const result = item.toLocaleLowerCase().includes(target)

            return result;
        });

        setArrayCity(arrayPlace);
    };

    const handleSetValue = (text) => {
        setValue(text);
        setArrayCity([]);
        requestGetWeather(text)
    }

    const handleKey = (el) => {

        const enterKey = el.key;

        if (enterKey === 'Enter') {
            setArrayCity([]);
            setValue(value);
        }
    }

    return (
        <>
            {IsModal && <Backdrop onClick={handlerCancel}/>}
            <Confirm imgWeather={whithMainWeather('weather')}>
                <BodyModal>
                    <Button onClick={handlerCancel}>x</Button>


                    <main>
                        <div className="device">
                            <section>
                                <div className="weather time-day active">
                                    <div className="icon">
                                        {arrayIcon && arrayIcon.map(icon => (
                                            <i className={icon} />
                                        ))}

                                    </div>
                                    <div className="content">
                                        <h3>{currentCountry.name}</h3>
                                        <div className="degrees">{temp}</div>
                                        <div className="kelvin">{Math.round(temp + 273.15) }</div>
                                        <div className="data">
                                            <h2>{whithMainWeather('main')}</h2>
                                            <div>Wind: {wind} mph</div>
                                            <div>Humidity: {currentCountry.main.humidity}%</div>
                                        </div>
                                    </div>
                                </div>
                                <Title>{currentCountry.name}</Title>
                                <div>
                                    <Search>
                                        <Input
                                            disabled={isDisable}
                                            placeholder='enter city please'
                                            onKeyPress={handleKey}
                                            type="text"
                                            value={value}
                                            onChange={changeSuggest}
                                        />
                                            {arrayCity && arrayCity.slice(0, setStep).map((item) =>
                                                <option onClick={() => (handleSetValue(item))}>
                                                    {item}
                                                </option>
                                            )}

                                    </Search>

                                    <div>{arrayCity &&  <button onClick={() => setSetStep(setStep + 10)}>show more</button>}</div>
                                </div>
                            </section>
                        </div>
                    </main>
                </BodyModal>
            </Confirm>
        </>
    );
};

const Search = styled.div`
  width:300px;
  height:300px;
`;

const Input = styled.input`
   width: 100%; 
  margin-bottom: 10px; 
  background: rgba(0,0,0,0.3);
  border: none;
  outline: none;
  padding: 20px;
  margin: 20px;
  font-size: 13px;
  color: #fff;
  text-shadow: 1px 1px 1px rgba(0,0,0,0.3);
  border: 1px solid rgba(0,0,0,0.3);
  border-radius: 4px;
  box-shadow: inset 0 -5px 45px rgba(100,100,100,0.2), 0 1px 1px rgba(255,255,255,0.2);
  transition: box-shadow .5s ease;
  text-align: center;
  
  &:focus { box-shadow: inset 0 -5px 45px rgba(100,100,100,0.4), 0 1px 1px rgba(255,255,255,0.2); }

`;


const Confirm = styled.div`
  @media (max-width: 801px) {
    left: 0;
    top: 0;
    width: fit-content;
  }

  @media (max-width: 1001px) {
    left: calc(50% - 205px);
    top: calc(50% - 315px);
    width: 416px;
  }

  @media (min-width: 600px) {
    .Modal {
      width: 500px;
      left: calc(50% - 250px);
    }
  }
`;

const Button = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    background: transparent;
    border: none;
    font-size: 40px;
    z-index: 999;
`;

const BodyModal = styled.div`

`;

  const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;


const Title = styled.h1`
      color: whitesmoke;
      margin-left: 20px;
`;

const mapStateToProps = (state) => ({
    currentCountry: state.getWeather.currentCountry,
    weatherErrors: state.getWeather.weatherErrors,
    weatherLoading: state.getWeather.weatherLoading
});

export  default connect(mapStateToProps, actions)(WeatherInfo);
