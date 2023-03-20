import "./App.css"
import { useState, useEffect } from "react";
import WeatherCard from "./components/WeatherCard";
import Loading from "./components/Loading";

function App() {

  const [latitude, setLatitude] = useState()
  const [longetude, setLongetude] = useState()
  const [cidade, setCidade] = useState( )
  const [showCard, SetShowCard] = useState(false)
  const [invalidCity, setInvalidCity] = useState(false)


  const onSubmit = (e) => {
    e.preventDefault()

    setLatitude( )
    setLongetude( )
    setInvalidCity(false)

    if(cidade.length > 0) {
      fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cidade}&limit=5&appid=36c1bc257e47292962e98d75553193b4`)
      .then(res => res.json())
      .then(data => {
        setLatitude(data[0].lat)
        setLongetude(data[0].lon)
        console.log(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longetude}&appid=36c1bc257e47292962e98d75553193b4`)
      })
      .catch(err => console.log(err))

    } else {
      setInvalidCity(true)
    }
  }

  const [kelvinTemp, setKelvinTemp] = useState(0)
  const [weatherMain, setWeatherMain] = useState()
  const [weatherMainDescription, setWeatherMainDescription] = useState()
  const [umidade, setUmidade] = useState()
  const [vento, setVento] = useState()

  useEffect (() => {

    setKelvinTemp( )
    setWeatherMain( )
    setWeatherMainDescription( )
    setUmidade( )
    setVento( )
    SetShowCard(false)

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longetude}&appid=36c1bc257e47292962e98d75553193b4`)
    .then(resp => resp.json())
    .then(data => {
      setKelvinTemp(data.main.temp)
      setWeatherMain(data.weather[0].main)
      setWeatherMainDescription(data.weather[0].description)
      setUmidade(data.main.humidity)
      setVento(data.wind.speed)
      SetShowCard(true)

      })
    .catch(err => console.log(err))
  }, [latitude, longetude])

  return (
    <div className="App" onSubmit={onSubmit}>
      <form className="Form">
        <label>
          Nome da Cidade
          <input type="text" value={cidade} onChange={(e) => setCidade(e.target.value)}></input>
        </label>
          {invalidCity? <div className="invalid">INSIRA UMA CIDADE VÁLIDA</div> : <div></div>}
          <button type="submit">Procurar</button>   
      </form>
      {showCard? <WeatherCard 
        kelvinTemp={kelvinTemp} 
        weatherMain={weatherMain}
        weatherMainDescription={weatherMainDescription}
        humidity={umidade}
        wind={vento}
        
      /> : <Loading />}
    </div>
  );
}

export default App;
