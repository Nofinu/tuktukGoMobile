import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import image from "./tuk-tuk.png"
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../Data/AuthSlice'
import { get } from '../Services/data.service'
import CarRideComponent from '../Component/CarRideComponent'




export default function HomePage() {

  const navigation = useNavigation()
  const dispatch = useDispatch()

  const token = useSelector((state)=>state.auth.token)
  const user = useSelector((state)=>state.auth.user) 
  const status = useSelector((state)=>state.auth.status) 
  const [liste,setListe]=useState([])
  const [listeBooking,setListeBooking]=useState([])

  const logOutHandler = ()=>{
    dispatch(logout())
  }

  const fetchCarRide = async ()=>{
    if(token === ""){
      const response = await get("car_ride")
      setListe([...response.data])
    } 
    else{
      const response = await get("car_ride/car_ride_without/"+user.id_user)
      setListe([...response.data])
      const responseBooking = await get("booking/user/"+user.id_user,token)
      setListeBooking([...responseBooking.data])
    } 
  }

  useEffect(()=>{
      fetchCarRide()
  },[user,status])

  return (
    <>
     <View style={styles.titleContainer}>
      <Image source={image} style={styles.image} />
      <Text style={styles.titleText}>tuKtuKGO</Text>
    </View>
     {
      token === "" ?
        <View style={styles.container}>
        <Pressable onPress={()=> navigation.navigate("login")}>
          <Text style={styles.button}>login</Text>
        </Pressable>
        <Pressable onPress={()=> navigation.navigate("register")}>
          <Text style={styles.button}>Register</Text>
        </Pressable>
      </View>
      : 
      <View style={styles.container}>
      <Pressable onPress={()=> navigation.navigate("login")}>
        <Text style={styles.button}>Profil</Text>
      </Pressable>
      <Pressable onPress={logOutHandler}>
        <Text style={styles.button}>LogOut</Text>
      </Pressable>
    </View>
     }
   
   <FlatList data={liste} contentContainerStyle={styles.flatContainer}
      renderItem={({item})=>{
        return <CarRideComponent carRide={item} status={token} booking={listeBooking}/>
      }} keyExtractor={(item,index) => index}/>
    </>
  )
}

const styles = StyleSheet.create({
  titleContainer:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    width:"100%",
    marginTop:15
  },
  container:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
  },
  button:{
    backgroundColor:"blue",
    color:"white",
    padding:10,
    marginTop:20,
    borderRadius:5,
    fontSize:20,
    marginLeft:20
  },
  titleText:{
    fontSize: 25,
    color:"black",
    fontWeight:"bold",
    marginLeft:8
  },
  image:{
    height:50,
    width:50,
    marginLeft:15
  },
  flatContainer:{
    justifyContent:"center",
    alignItems:"center"
  }
})