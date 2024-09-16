import axios from "axios";

export default axios.create({
    baseURL: 'https://agile-flexibility-production.up.railway.app'
})