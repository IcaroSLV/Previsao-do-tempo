import "./App.css"
import { useState, useEffect } from "react";
import WeatherCard from "./components/WeatherCard";
import Loading from "./components/Loading";

function App() {

  const [latitude, setLatitude] = useState()
  const [longetude, setLongetude] = useState()
  const [cidade, setCidade] = useState("")
  const [showCard, SetShowCard] = useState(false)
  const [invalidCity, setInvalidCity] = useState(false)


  const onSubmit = (e) => {
    e.preventDefault()

    setLatitude( )
    setLongetude( )
    setInvalidCity(false)
    SetShowCard(false)

    if(cidade.length > 0) {
      fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cidade}&limit=5&appid=36c1bc257e47292962e98d75553193b4`)
      .then(res => res.json())
      .then(data => {
        setLatitude(data[1].lat)
        setLongetude(data[1].lon)
        SetShowCard(true)
      })
      .catch(err => setInvalidCity(true))

    } else {
      setInvalidCity(true)
      setLatitude()
      setLongetude()
    }
  }

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
      {longetude && (
        <WeatherCard 
          nomeDaCidade={cidade}
          longetude={longetude}
          latitude={latitude}
        />
      )}
    </div>
  );
}

export default App;
