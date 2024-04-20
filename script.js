let auth_token;
let city;
var lat="";
var long="";
let getWeatherbtn = document.querySelector(".get-weather-btn")
let getCurrentWeather = document.querySelector(".get-current-location")


window.onload = function () {
    var req = fetch("https://www.universal-tutorial.com/api/getaccesstoken",{
        headers:{
            "Accept": "application/json",
            "api-token": "8YhKek11xFqM041N8CUuVpZB-P4Tl5KUH26iZT40kXZWUl9qTxDf8iic-lxL_sdZGsA",
            "user-email": "st1173076@gmail.com"
          }
    })

    req
    .then( (data) => data.json() )
    .then((data)=> auth_token = data.auth_token )
    .then(()=> getState())
};

function getCurrentLocation(){
    navigator.geolocation.getCurrentPosition((position)=>{
         lat = position.coords.latitude
         long = position.coords.longitude
    })

    getWeather("type2")
}

const getState = () =>{
   return fetch("https://www.universal-tutorial.com/api/states/India",{
        headers:{
            "Authorization": `Bearer ${auth_token}`,
            "Accept": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => fillState(data))
}

const getCities = (state) =>{
   return fetch(`https://www.universal-tutorial.com/api/cities/${state}`,{
        headers:{
            "Authorization": `Bearer ${auth_token}`,
            "Accept": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => fillCity(data))
}

const getWeather = (type) =>{
    console.log("work")
    let url;
    if(type == 'type1'){
        url = `http://api.weatherbit.io/v2.0/current?key=3911cab189e84738a55144653e94e98f&city=${city}`
    }else{
        url = `http://api.weatherbit.io/v2.0/current?key=3911cab189e84738a55144653e94e98f&lat=${lat}&lon=${long}`
    }
    return fetch(url)
    .then(res => res.json())
    .then(data => fillWeather(data))
}


function fillState (data) {
   let stateInput = document.getElementById("state")
   data.forEach(({state_name}) => {
    let option = document.createElement("option");
    option.value = state_name;
    option.textContent = state_name;
    option.className = "stateName"
    stateInput.appendChild(option);
});
}

function fillCity (data) {
   let stateInput = document.getElementById("city")
   data.forEach(({city_name}) => {
    let option = document.createElement("option");
    option.value = city_name;
    option.textContent = city_name;
    option.className = "cityName"
    stateInput.appendChild(option);
});
}

function fillWeather (data){
    console.log(data)
    const temp = document.querySelector('.temp')
    const desc = document.querySelector('.desc')
    const city = document.querySelector('.City')
    const precp = document.querySelector('.precp')
    temp.textContent = data.data[0].temp
    desc.textContent = data.data[0].weather?.description
    city.textContent = data.data[0]?.city_name
    precp.textContent = data.data[0]?.precip
}

document.addEventListener("change",function(e){
    city = e.target.value
    getCities(e.target.value)
})

getWeatherbtn.addEventListener("click", () =>{
    getWeather("type1")
})

getCurrentWeather.addEventListener("click",()=>{
  getCurrentLocation()
})

