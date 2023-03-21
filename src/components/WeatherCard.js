import { useEffect, useState } from "react"
import styles from "./WeatherCard.module.css"
import WindImage from '../images/vento.png'
import clima from '../images/clima.webp'

function WeatherCard({nomeDaCidade, latitude, longetude}) {


    // PEGAR OS DADOS DA CIDADE
    
    const [cityName, setCityName] = useState()
    const [kelvinTemp, setKelvinTemp] = useState(0)
    const [weatherMain, setWeatherMain] = useState()
    const [weatherMainDescription, setWeatherMainDescription] = useState()
    const [umidade, setUmidade] = useState()
    const [Wind, setWind] = useState()
    const [iconId, setIconId] = useState()
  
    useEffect (() => {
  
      setKelvinTemp( )
      setWeatherMain( )
      setWeatherMainDescription( )
      setUmidade( )
      setWind( )
  
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longetude}&appid=36c1bc257e47292962e98d75553193b4`)
      .then(resp => resp.json())
      .then(data => {
        setKelvinTemp(data.main.temp)
        setWeatherMain(data.weather[0].main)
        setWeatherMainDescription(data.weather[0].description)
        setUmidade(data.main.humidity)
        setWind(data.wind.speed)
        setCityName(nomeDaCidade)
        setIconId(data.weather[0].icon)
        
  
        })
      .catch(err => console.log(err))
    }, [latitude, longetude])



    // PEGAR O DIA DA SEMANA 

    const diasDaSemana = ["DOMINGO", "SEGUNDA-FEIRA", "TERÇA-FEIRA", "QUARTA-FEIRA", "QUINTA-FEIRA", "SEXTA-FEIRA", "SÁBADO"]
    const Today = new Date()
    const diaDaSemana = diasDaSemana[Today.getDay()]

    const [currentTemp, setCurrentTemp] = useState(0)


    return(
        <div>
            <div className={styles.Card}>
                <section className={styles.weatherDescription}>
                    <h1>{nomeDaCidade.toUpperCase()}</h1>
                    <div >
                        <div>
                            <div><img src={WindImage}></img>Vento</div>
                            <p>{Wind} <span>m/s</span></p>
                        </div>
                        <div>
                            <div> <img src={iconId && `https://openweathermap.org/img/wn/${iconId}@2x.png`}></img>Clima</div>
                            <p>{weatherMain}</p>
                        </div>
                        <div>
                            <div><img src={clima}></img>Descriçao do Clima:</div>
                            <p>{weatherMainDescription}</p>
                        </div>
                    </div>
                </section>
                <section className={styles.tempDescription}>
                    <div>{diaDaSemana}</div>
                    {kelvinTemp && (
                        <section>
                            <div>{(kelvinTemp - 273).toFixed(1)} <span>°C</span></div>
                            <div>{((kelvinTemp - 273) * 9/5 + 32).toFixed(1)} <span>°F</span></div>
                        </section>
                    )}
                </section>
            </div>
        </div>
    )
}

export default WeatherCard