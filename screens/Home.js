import React,{Component} from 'react'
import {View, Text, StyleSheet,Image, TouchableOpacity} from 'react-native'
import {Header,AirbnbRating,Icon} from 'react-native-elements'
import axios from "axios"
import {RFValue} from 'react-native-responsive-fontsize' 

export default class HomeScreen extends Component{
    constructor(){
        super()
        this.state={
            movieDetails:{}
        }
    }

    componentDidMount(){
        this.getMovie()
    }

    timeConvert(n){
        var hours = Math.float(n/60)
        var minutes = n%60
        return `${hours}hrs ${minutes}mins`
    }

    getMovie = ()=>{
        const url = "http://localhost:5500/get-movie"
        axios.get(url).then(response=>{
            let details = response.data.data
            details["duration"]=this.timeConvert(details.duration)
            this.setState({movieDetails:details})
        }).catch(error=>{
            console.log(error.message)
        })
    }

    likeMovie = ()=>{
        const url = "http://localhost:5500/liked-movie"
        axios.post(url).then(response=>{
        this.getMovie()
        }).catch(error=>{
            console.log(error.message)
        })
    }

    notLikeMovie = ()=>{
        const url = "http://localhost:5500/not-liked-movie"
        axios.post(url).then(response=>{
        this.getMovie()
        }).catch(error=>{
            console.log(error.message)
        })
    }

    notWatchedMovie = ()=>{
        const url = "http://localhost:5500/not-watched-movie"
        axios.post(url).then(response=>{
        this.getMovie()
        }).catch(error=>{
            console.log(error.message)
        })
    }

    render(){
        const{movieDetails} = this.state
        if(movieDetails.poster_link){
            const {
                poster_link,title,release_data,duration,overview,rating
            } = movieDetails
            return(
                <View style = {styles.container}>
                    <View style={styles.headerContainer}>
                        <Header centerComponent = {{text:"movie recommended"}}
                            rightComponent = {{icon:"search",color:"blue"}}
                            backgroundColor = {"grey"}
                            container style = {{flex:1}}
                            >
                        </Header>
                    </View>
                    <View style={styles.subcontainer}>
                        <Image style={{width:'60%',height:'90%',resizeMode:'stretch',borderRadius:30,marginHorizontal:10}}source = {{uri:poster_link}}>
                        </Image>
                    </View>
                    <Text style = {{fontSize:20,fontWeight:'bold',textAlign:'center'}}>{title}</Text>
                    <Text style = {{fontSize:14,fontWeight:'300'}}>{`${release_date.split("-")[0]}| ${duration}`}</Text>
                       <View style={{flex:0.35,}}>
                           <AirbnbRating count={10}
                           reviews = {["","","","",""]}
                           defaultRating = {rating}
                           isDisabled ={True}
                           size = {25}></AirbnbRating>
                       </View>
                       <View style = {{flex:0.7,padding:15}}>
                           <Text style={{fontSize:13,textAlign:'center',fontWeight:300,color:"orange"}}>{overview}</Text>
                       <TouchableOpacity onPress={this.likeMovie}>
                           <Icon reverse
                           name = {"check"}
                           type = {"entypo"}
                           size = {30}
                           color = {"blue"}/>
                       </TouchableOpacity>
                       <TouchableOpacity onPress={this.notLikeMovie}>
                           <Icon reverse
                           name = {"check"}
                           type = {"entypo"}
                           size = {30}
                           color = {"green"}/>
                       </TouchableOpacity>
                       </View>
                       <View style = {{justifyContent:'center',alignItems:'center'}}>
                           <TouchableOpacity style = {{width:160,height:50,borderRadius:20,justifyContent:'center',alignItems:'center',borderWidth:1,marginTop:RFvalue(15)}}
                           onPress={this.notWatchedMovie}>
                               <Text style={styles.buttonText}>did not watch</Text>
                           </TouchableOpacity>
                       </View>
                </View>
            )
        }
        return null;
    }
}