import GoogleMapsLoader from 'google-maps';
import {googleAPIKey} from '../config';

init();

function init(){
    GoogleMapsLoader.KEY = googleAPIKey;
    GoogleMapsLoader.LIBRARIES= ['geometry','places'];
    GoogleMapsLoader.VERSION=3.34;
}

let google;
const loadMap = () =>
    new Promise((resolve, reject)=>{
        if(google){
            resolve(google);
        }
        else{
            GoogleMapsLoader.load(api => {
                google = api;
                resolve(api);
                });
        }
    });

const maps = async () => {
    const google = await loadMap();
    return google.maps;
}

export {maps};