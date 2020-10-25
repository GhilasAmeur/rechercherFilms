const API_TOKEN = 'a3bdd04792d23cdea949d6137003a1d7'

//cette fonction nous permets d'appeler l'api the movie data base et de nous retourner les films selon le text rechercher
export function get_Films_From_Api_With_Searched_Text(text, page){

    const url = 'https://api.themoviedb.org/3/search/movie?api_key='+ API_TOKEN + "&language=fr&query="+ text + "&page="+page

    //pour faire l'appel API on utulise fetch elle a deux option response si l'appel si bien passee, et catch si lapel ni pas bien passee
    //avant d'appeler cette fonction on va crier une fonction dans le fichier Search : _chargerLesFilms

    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(console.log(error)))

}


export function get_Image_From_Api(name){
 return 'https://image.tmdb.org/t/p/w300' + name
}