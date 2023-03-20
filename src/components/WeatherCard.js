import { useEffect, useState } from "react"

function WeatherCard({kelvinTemp, wind, humidity, weatherMain, weatherMainDescription}) {
    
    const [celciusTemp, setCelciusTemp] = useState()
    const [fahrenheitTemp, setFahrenheitTemp] = useState()

    const teste = () => {
        console.log(kelvinTemp, weatherMain,weatherMainDescription,wind,humidity)
    }

    if(kelvinTemp > 0) {
        return(
            <button onClick={teste}>CLICKAR</button>
        )
    }

    return(
        <div>
            
        </div>
    )
}

export default WeatherCard