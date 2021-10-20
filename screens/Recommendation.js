import React,{Component} from 'react'
import {View, Text, StyleSheet,Image, TouchableOpacity, FlatList} from 'react-native'
import {Header,AirbnbRating,Icon} from 'react-native-elements'
import axios from "axios"
import {RFValue} from 'react-native-responsive-fontsize' 
import {Card} from 'react-native-elements'

export default class RecommendedMoviesScreen extends Component{
    constructor(){
        super()
        this.state={
            data:[]
        }
    }

    componentDidMount(){
        this.getData()
    }

    timeConvert(n){
        var hours = Math.float(n/60)
        var minutes = n%60
        return `${hours}hrs ${minutes}mins`
    }

    getData = ()=>{
        const url = "http://localhost:5000/recommended-movie"
        axios.get(url).then(response=>{
            this.setState({data:response.data.data})
        }).catch(error=>{
            console.log(error.message)
        })
    }
    keyExtractor = (item,index)=>index.toString()
    renderItems = ({item,index})=>{
        return(
            <Card key = {`card-${index}`}
            image = {{uri:item.poster_link}}
            imageProps = {{resizeMode:'cover'}}
            featuredTitle = {item.title}
            containerStyle={styles.cardContainer}
            featuredTitleStyle = {styles.title}
            featuredSubtitle={`${item.release_date.split("-")[0]} | ${this.timeConvert(item.duration)}`}
            featuredSubtitleStyle = {styles.subtitle}></Card>
        )
    }
    render(){
        const{data} = this.state
        return(
            <View style={{flex:1,backgroundColor:'orange'}}>
                <FlatList data={data} 
                keyExtractor={this.keyExtractor}
                renderItem = {this.renderItems}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title:{
        color:"black",
        alignSelf:'flex-start',
        paddingLeft:RFValue(15),
        fontSize:RFValue(25),
        marginTop:RFValue(65),
    },
    subtitle:{
        fontWeight:'bold',
        alignSelf:'flex-start',
        paddingLeft:RFValue(15),
        fontSize:RFValue(15),
    },
    cardContainer:{
        flex:1,
        borderRadius:RFValue(10),
        justifyContent:'center',
        height:RFValue(110),
        marginBottom:RFValue(20)
    }
})