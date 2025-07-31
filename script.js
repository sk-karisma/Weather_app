const apiKey='bdf6dcd87ee7429c94375409252907';

async function getWeather(){
    const city=document.getElementById('cityInput').value.trim();
    const errorEl=document.getElementById('error');
    const card=document.getElementById('weatherCard');

    errorEl.textContent='';
    card.innerHTML='';

    if(!city){
        errorEl.textContent="Please enter city name.....";
        return;
    }

    try{
        const response=await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);

        const data=await response.json();

        if(data.error){
            throw new Error(data.error.message);
        }

        const{location,current}=data;
        card.innerHTML=`
        <h2>${location.name},${location.country}</h2>
        <img src="https:${current.condition.icon}"alt="weather icon"/>
        <p>Condition:${current.condition.text}</p>
        <p>Temperature:${current.temp_c}°C</p>
        <p>Humidity:${current.humidity}%</p>
        <p>Wind:${current.wind_kph}km/h</p>
        <p>Last Updated:${current.last_updated}</p>
        `;
    }

    catch(error){
        console.error("WeatherAPI Error:",error.message);
        errorEl.textContext.message || 'Could not fetch weather data';
    }
}
