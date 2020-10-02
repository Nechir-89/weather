import React, { useState } from 'react';

function App() {

  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [temp, setTemp] = useState('');
  const [minTemp, setMinTemp] = useState('');
  const [maxTemp, setMaxTemp] = useState('');
  const [humidity, setHumidity] = useState('');
  const [weatherDesciption, setWeatherDesciption] = useState('');
  const [iconId, setIconId] = useState('');

  function converToCelcuis(kelvin) {
    return Math.floor(kelvin - 273.15);
  }

  function findWeather() {
    if (city.trim() !== '' && country.trim() !== '') {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.trim()},${country.trim()}&APPID=332915fda97cbc7c58e26fd550a80e92`)
        .then(response => {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else {
            alert('Please enter correct city and country name!')
          }

        })
        .then(data => {
          if (data) {
            const tempInCel = converToCelcuis(data.main.temp);
            const mTemp = converToCelcuis(data.main.temp_min);
            const mxTemp = converToCelcuis(data.main.temp_max);

            setTemp(tempInCel);
            setMinTemp(mTemp);
            setMaxTemp(mxTemp);
            setHumidity(data.main.humidity);
            setWeatherDesciption(data.weather[0].description);
            setIconId(data.weather[0].icon);
          }
        }
        )
    }
  }

  return (
    <div className='app'>
      <header>
        <label className='city'>
          <span></span>
          <input
            type='text'
            placeholder='City'
            onChange={(event) => setCity(event.target.value)}
          />
        </label>

        <label className='country'>
          <span></span>
          <input
            type='text'
            placeholder='Country'
            onChange={(event) => setCountry(event.target.value)}
          />
        </label>
        <button onClick={findWeather}>Find it</button>
      </header>
      {temp ?
        <main>

          <div className='temp'>
            {temp}&deg;
          </div>
          <div className='image'>
            <img src={`https://openweathermap.org/img/wn/${iconId}@2x.png`} alt='Weather Icon' />
          </div>
          <div className='description'>{weatherDesciption}</div>
          <div className='minAndMaxTemp'>
            <span>{minTemp}</span>
            <span className='bar'>|</span>
            <span>{maxTemp}</span>
          </div>
          <div className='humidity'>
            Humidity <br />
            {humidity}%
          </div>
        </main>
        :
        <div className='firstLookImage'>
          <p>Please search for your city and country</p>
          <img src='./images/weather.svg' alt='weather' />
        </div>
      }
      <footer>
        <a href='https://github.com/Nechir-89/' className='github' target='_blank' rel="noopener noreferrer">Github</a>
        <a href='https://twitter.com/Nechir89/' className='twitter' target='_blank' rel="noopener noreferrer">Twitter</a>
        <a href='https://dev-nechir.netlify.app/' className='portfolio' target='_blank' rel="noopener noreferrer">Portfolio</a>
        <a href='https://dribbble.com/devNechir/' className='dribble' target='_blank' rel="noopener noreferrer">Dribble</a>
      </footer>
    </div>
  );
}

export default App;
