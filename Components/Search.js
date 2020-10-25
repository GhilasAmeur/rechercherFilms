import React from 'react'
import {View, Button, TextInput, StyleSheet, FlatList,Text, ActivityIndicator} from 'react-native'
import films from '../Helpers/FilmData'
import FilmItem from './FilmItem'
import {get_Films_From_Api_With_Searched_Text} from '../API/TMDBApi'

//le renderItem il parcours les data et il afficher ces donnes dans un premier temp on a a et b comme donnéé

class Search extends  React.Component {

////////////////////////////////////////constructeur STATE/////////////////////////////////////////////////////////////////////
    constructor(props){
        super(props)
        this.state = { films : [] , //notre state est un tableau vide pour linstant
        Le_Chargement : false
     }     
     this.searchedText = ""
     this.page = 0 //on crier c deux variables ici car elle n'affecte pas le rendu de notre application donc on dehors de state
     this.total_page = 0 //on plus on va pas les mofifier donc ici leurs places 
    }

    ////////////////////////////////////////Methode qui charge les films de l'  API/////////////////////////////////////////////////////////////
//on appele cette fonction quand on clique sur onPress 
_chargerLesFilms = () => {
    this.setState({Le_Chargement : true})
    if(this.searchedText.length > 0) {
    get_Films_From_Api_With_Searched_Text(this.searchedText, this.page+1).then(data =>
        
        {
            this.page = data.page //recuperer la page de notre fichier ou se trouve les films
            this.total_page = data.total_pages
            //ce que j'avais avant de les pages suivantes a afficher : 
            //this.setState({films : data.results,   Le_Chargement : false })
            //on a un probleme car a chaque appel a une nouven page on ecrase la page deja existante
            //donc on doit changer notre state, on crier une copie des films existanat et on les rajutea ceux existant
            //voila la nouvel ecriture : 
            this.setState({ films : [...this.state.films, ...data.results]})
            
            this.setState({Le_Chargement : false})
              

         })
}}
//on crie une fonction qui nous permet d'afficher les nouveau films lorsque on crie une nouvelle recherche
//////////////////////////////////////////nouvelle recherche///////////////////////////////////////////////////////////////
//c'est pour afficher des nouveau films car avant on ajoute les anciens films au nouveau films 

_nouvelle_Recherche_De_film = () => {
    this.page = 0
    this.total_page = 0
    //ici on decouvre un truc tres important de setstate, il est asynchrone il ne bloque pas l'execution de notre code 
    //quand on affiche le log le nombre de films est a 20 pourtant on a modifier dans notre setstate avec : this.setstate({films : []})
    //mais attention ici il faut ajouter le deuxieme parametre de setstate(est une fonction quand appele lorsque setstate est terminer de s'exucuter) pour remettre a zero notre liste de film comme suit :
    this.setState ({ films : [] }, () => {

       console.log("page : " + this.page +"/nombre de pages" + this.total_page + "/nombre de films" + this.state.films.length)

        this._chargerLesFilms()
    })
   
}










///////////////////////////////////////////methode pour recuperer le text saisie//////////////////////////////////////////////////////////////////
_recupererValeurSaisie = (event) =>{
  // console.log(event)
    //const textRecuperer = event
    this.searchedText = event
    //this.setState({searchedText : textRecuperer})
    //console.log(textRecuperer)

} 

_Le_Chargement_Est_True(){

    if (this.state.Le_Chargement && this.searchedText.length > 0) {
        return ( <View style = {styles.chargement}>
                <ActivityIndicator size="large" color="#0fff30" />
                </View>
                                )}
}

render(){
    console.log(this.state.Le_Chargement)
    
  
return(
    
    <View style = {styles.main_container}>
        {this._Le_Chargement_Est_True()}
        <TextInput onSubmitEditing = {this._nouvelle_Recherche_De_film} style = {styles.textinput} placeholder = "Titre du film" onChangeText = {this._recupererValeurSaisie}></TextInput>
        <Button  title = "Rechercher" onPress = {() => {this._nouvelle_Recherche_De_film()}}> </Button>

        <View style={[styles.container, styles.horizontal]}>
    
    
  
 </View>
        <FlatList 
        data = {this.state.films} //avant etais data = {films} c'est les films recuperer de notre fichier FilmData mais mtn c les films recuperer de l' api
        keyExtractor = {(item) => item.id.toString()}
        onEndReachedThreshold = {0.5}
        onEndReached = {() =>{
            if(this.state.films.length > 0 && this.page < this.total_page) {
                this._chargerLesFilms()
                //console.log("onEnd reached")
            }
        }}
        renderItem = {({item}) => <FilmItem film = {item}/>}>

        </FlatList>
       
    </View>
)
}

}

const styles = StyleSheet.create( {

    main_container : {
        flex :1,
        marginTop : 15,
       


    },
    textinput : {
        marginLeft : 5,
        borderColor : '#3445ff',
        marginTop :55,
        borderWidth : 1,
       // backgroundColor : 'red'
        
    },

    chargement : {
        left : 0,
        right : 0,
        bottom : 0,
        justifyContent: "center",
        position : 'absolute',
        top : 100,
        alignItems : 'center',
  
        
    }


})

export default Search