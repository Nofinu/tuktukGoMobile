import { useNavigation } from "@react-navigation/native"
import { StyleSheet, Text, View, Pressable  } from "react-native"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector, useStore } from "react-redux"
import { get } from "../Services/data.service"
import { changeStatus } from "../Data/AuthSlice"


export default function CarRideComponent (props){

    const navigation = useNavigation()
    const dispatch = useDispatch()
    const user = useSelector((state)=>state.auth.user) 
    const token = useSelector((state)=>state.auth.token) 

    const [status,setStatus]=useState([])

    const onPressBookingHandler = async ()=>{
        if(token != ""){
            const response = await get("booking/book_car_ride/"+ user.id_user +"/"+props.carRide.id_carRide,token)
            dispatch(changeStatus())
          }
          else{
            navigation.navigate("/login")
          }
    }

    const onPressUnBookingHandler = async ()=>{
        if(token != ""){
            const response = await get("booking/unbook_car_ride/"+ user.id_user +"/"+props.carRide.id_carRide,token)
            dispatch(changeStatus())
          }
          else{
            navigation.navigate("/login")
          }
    }

    
  function alreadyBooked(booking) {
    return (booking.carRide.id_carRide === props.carRide.id_carRide) && (booking.iduser === user.id_user)
  }

  useEffect(()=>{
    props.booking.forEach(b => {
        if(alreadyBooked(b)){
          setStatus(true)
        }
      });
  },[])

    return(
        <View style={style.container}>
            <View>
                <Text>Ville de départ : {props.carRide.start_point}</Text>
                <Text>Ville d' arrivée : {props.carRide.end_point}</Text>
                <Text>Nombre de places : {props.carRide.seatAvailable}</Text>
                <Text>date : {props.carRide.startDate}</Text>
                <Text className=" price">Prix : {props.carRide.price}€</Text>
            </View>
            {
                props.status&&
                <Pressable style={style.buttonBooking} onPress={!status? onPressUnBookingHandler:onPressBookingHandler}>
                    <Text style={style.textButton}>{!status?"Unbook" :"Book"}</Text>
                </Pressable>
            }
           
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        backgroundColor:"white",
        borderColor:"balck",
        borderWidth:1,
        borderRadius:5,
        padding:20,
        marginTop:25,
        flexDirection:"column",
    },
    buttonBooking:{
        backgroundColor:"black",
        alignItems:"center",
        borderRadius:5,
        marginTop:5
    },
    textButton:{
        textAlign:"center",
        color:"white",
    }
})