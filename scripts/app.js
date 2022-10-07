const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) =>{
    // const cityDets = data.cityDets;
    // const weather = data.weather;
    // you can also write the above two line as given below
    const {cityDets, weather} = data;

    details.innerHTML =` 
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>`;

        //update the icons img
        const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
        icon.setAttribute('src', iconSrc);
        //update the night and day img

        let timeSrc = null;
        if(weather.IsDayTime){
            timeSrc = 'img/day.svg';
        } else{
            timeSrc = 'img/night.svg';
        }
        time.setAttribute('src', timeSrc);

        if(card.classList.contains('d-none')){
            card.classList.remove('d-none');
        }
};


const updateCity = async (city)=>{
    const cityDets =await getCity(city);
    const weather =await getWeather(cityDets.Key);

    return {cityDets, weather};
    
};

cityForm.addEventListener('submit', e=>{
    //prevent default action
    e.preventDefault();

    // get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update the ui with new city
    updateCity(city)
    .then(data =>updateUI(data))
    .catch(err=>console.log(err));
});