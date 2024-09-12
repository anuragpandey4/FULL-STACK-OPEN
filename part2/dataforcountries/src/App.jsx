import { useEffect, useState } from "react";
import axios from "axios";

const api_key = import.meta.env.VITE_SOME_KEY;

const App = () => {
  const [countryInput, setCountryInput] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [weatherInfo, setWeatherInfo] = useState();

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((res) => {
        const countriesData = res.data;
        setAllCountries(countriesData);
      })
      .catch((err) => console.log("oops error : ", err));
  }, []);

  const handleCountryInput = (e) => {
    const newCountryInput = e.target.value;
    setCountryInput(newCountryInput);
  };

  useEffect(() => {
    const filtered = allCountries.filter((country) =>
      country.name.common.toLowerCase().includes(countryInput.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [countryInput, allCountries]);

  useEffect(() => {
    if (filteredCountries.length === 1) {
      const country = filteredCountries[0];
      if (country?.latlng) {
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${filteredCountries[0].latlng[0]}&lon=${filteredCountries[0].latlng[1]}&appid=${api_key}`
          )
          .then((res) => {
            setWeatherInfo(res.data);
          })
          .catch((err) => console.log("oops error : ", err));
      }
    }
  }, [filteredCountries]);

  return (
    <>
      <p>
        <em>
          <b>find countries</b>{" "}
        </em>
        <input value={countryInput} onChange={handleCountryInput} />
      </p>

      {filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filteredCountries.length > 1 ? (
        filteredCountries.map((country, i) => (
          <p key={i}>{country.name.common}</p>
        ))
      ) : filteredCountries.length === 1 ? (
        <>
          <h1>{filteredCountries[0].name.common}</h1>
          <div>
            <p>
              capital :
              {filteredCountries[0].capital.map((c, i) => (
                <span key={i}>{c} </span>
              ))}
            </p>
            <p>area : {filteredCountries[0].area}</p>
          </div>
          <div>
            <h3>languages:</h3>
            <ul>
              {Object.values(filteredCountries[0].languages).map((lang, i) => (
                <li key={i}>{lang}</li>
              ))}
            </ul>
          </div>
          <div>
            <img
              src={filteredCountries[0].flags.png}
              alt={filteredCountries[0].flags.alt}
            />
          </div>
          {weatherInfo && (
            <div>
              <h3>Weather in {filteredCountries[0].capital[0]}</h3>

              <div>
                <img
                  src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}
                  alt=""
                />
              </div>

              <p>
                temperature - {(weatherInfo.main.temp - 273).toPrecision(4)}
                °Celcius
              </p>
              <p>wind - {weatherInfo.wind.speed}m/s</p>
            </div>
          )}
        </>
      ) : null}
    </>
  );
};

export default App;
