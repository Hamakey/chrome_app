const API_KEY = "";

const COORDS = 'coords';

function saveCoords(coordsObj){
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));

}

function handleGeoSuccess(position){
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude : latitude,
    longitude : longitude
    //같을경우는 x : x 로 안하고 x만 써도됨

  }
  saveCoords(coordsObj);
}

function handleGeoError(){
  console.log('Cant access geo location');

}


function askForCoords(){
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);

}

function loadCoords(){

  const loadedCoords = localStorage.getItem(COORDS);
  if(loadedCoords === null){
    askForCoords();
  } else{

  }

}


function init(){
  loadCoords();


}

init();
