import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getCities } from 'countries-cities';
import styled from 'styled-components';
import * as actions from '../redux/actions';

const WeatherInfo = ({ currentCountry, requestGetWeather, setCurrentlyCountry }) => {
    const [IsModal, setIsModal] = useState(true);
    const weather = currentCountry.weather.map(desc => desc.description);
    const [value, setValue] = useState('');
    const [arrayCity, setArrayCity] = useState(null);

    const [setStep, setSetStep] = useState(10);

    const isDisable = getCities(currentCountry.name) === 'undefined';

    const handlerCancel = () => {
        setIsModal(false);
        setCurrentlyCountry()
    };

    const changeSuggest = (el) => {
        const target = el.target.value;

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
debugger
        const enterKey = el.key;

        if (enterKey === 'Enter') {
            setArrayCity([]);
            setValue(value);
        }
    }

    return (
        <>
            {IsModal && <Backdrop onClick={handlerCancel}/>}
            <Confirm imgWeather={weather}>
                <BodyModal>
                    <Button onClick={handlerCancel}>x</Button>

                    <Title>{currentCountry.name}</Title>
                    <ul>
                        <li>{weather}</li>
                        <li>{currentCountry.main.temp}</li>
                        <li>{currentCountry.main.humidity}</li>
                    </ul>
                    <div>
                        <Input
                            disabled={isDisable}
                            placeholder={`enter city please`}
                            onKeyPress={handleKey}
                            type="text" value={value}
                            onChange={changeSuggest}
                        />
                        <ul>
                            {arrayCity && arrayCity.slice(0, setStep).map((item) =>
                                <li onClick={() => (handleSetValue(item))}>
                                    {item}
                                </li>
                            )}
                        </ul>
                        <div>{arrayCity &&  <button onClick={() => setSetStep(setStep + 10)}>show more</button>}</div>
                    </div>
                </BodyModal>
            </Confirm>
        </>
    );
};


  const Confirm = styled.div`
  left: 30%;
  top: 12%;
  display: flex;
  justify-content: center;
  position: fixed;
  z-index: 500;
  padding: 0 40px;
  background:  ${({ imgWeather }) => {
  
    const weather = imgWeather[0];
    
    switch (imgWeather) {
        case (weather === "overcast clouds"): {
            return `url('Cloud.jpg')`
        }
        case (weather === "clear sky"): {
            return `url('sky1200.jpg')`
        }

        case (weather === "scattered clouds"): {
            return `url('scattered_clouds.jpg')`
        }
        case (weather ===  "broken clouds"): {
            return `url('sky1200.jpg')`
        }
        case (weather === "few clouds"): {
            return `url('broken clouds.jpg')` 
        }

        case (weather === 'light rain'): {
            return `url('broken clouds.jpg')`
        }
            default: {
                return '#6e6e84';
            }
    }
}};
  height: 450px;
  width: 800px;
  box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  box-sizing: border-box;
  transition: all 0.3s ease-out;
  max-width: 590px;


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

const Input = styled.input`
  
`;

  const Button = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    background: transparent;
    border: none;
    font-size: 40px;
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
`;

const mapStateToProps = (state) => ({
    currentCountry: state.getWeather.currentCountry,
    weatherErrors: state.getWeather.weatherErrors,
    weatherLoading: state.getWeather.weatherLoading
});

export  default connect(mapStateToProps, actions)(WeatherInfo);
