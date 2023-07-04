import axios from "axios";

//URL: https://api.themoviedb.org/3/movie/now_playing?api_key=6161d6b7fdded030ffe936e6cf4ac898&language=pt-br
//API KEY = 6161d6b7fdded030ffe936e6cf4ac898

const api = axios.create({
    baseURL:'https://api.themoviedb.org/3'
});

export default api;