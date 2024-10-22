import axios from "axios";
//const API_URL = "http://localhost:8080"; 
/* const API_URL = "http://vps-4291415-x.dattaweb.com:8080"; */
//const API_URL = "https://agile-flexibility-production.up.railway.app"
const API_URL = "https://calm-perception-production.up.railway.app"

export default axios.create({
    baseURL: API_URL
})