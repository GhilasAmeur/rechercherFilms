import React from 'react'
import {Text, View, StyleSheet,Image} from 'react-native'
import {get_Image_From_Api} from '../API/TMDBApi'

class FilmItem extends React.Component {

    render() {
        
        const film = this.props.film
       // console.log(film)
        return (
            <View style = {styles.main_container}>
                <Image style  ={styles.image} source = {{uri : get_Image_From_Api(film.poster_path)}}></Image>
                <View style = {styles.main_containerVert}>
                     <View style = {styles.main_containerOrange}>
                         <Text style = {styles.title_text}> {film.title}</Text> 
                         <Text style = {styles.vote_Text}> {film.vote_average}</Text>         
                        
                     </View>
                     <View style = {styles.description_container}>
                   
                      <Text style = {styles.description_text} numberOfLines = {6}>{film.overview}</Text>
                     </View>
                     <View style = {styles.date_container}>
                        <Text style = {styles.date_text}>Sorti le : {film.release_date}</Text>
                     </View>
                     
                 </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({

    main_container : {
        height : 190,
        flexDirection :'row',
        paddingLeft : 5,
        paddingTop : 15,
        paddingBottom : 15
        
        

    },
    title_text : {
        fontWeight : 'bold',
        fontSize : 17,
        paddingRight : 5,
        flexWrap : 'wrap',
        flex : 3
        


    },
    main_containerVert :{
       flex :1,
        flexDirection : 'column',
        
    },
    main_containerOrange : {
        flexDirection : 'row' 
    },
    image : {
        height : 180,
        width: 120,
        backgroundColor : '#885423',
        
    },
    vote_Text : {
        fontWeight : 'bold',
        fontSize:18,
       
        color: '#666666',
       
    },
    description_container :{
        flex : 6,
        
    },
    description_text : {
        fontStyle : 'italic',
        color : '#666666'

    },
    date_container :{
        flex : 1
    },
    date_text :{
        textAlign : 'right',
        fontSize : 14,
        paddingLeft : 100


    }

})
export default FilmItem