import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { post } from "../Services/data.service"
import { setToken, setUser } from "../Data/AuthSlice"
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"



export default function RegisterPage(){

    const dispatch = useDispatch()
    const navigation = useNavigation()

    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("") 
    const [phone, setPhone] = useState("")
     const [email, setEmail] = useState("")
     const [password, setPassword] = useState("")


    const OnPressLogin = async ()=>{

        let responseLogin = await post("auth/register",{firstname:firstname,lastname:lastname,phone:phone,email:email,password:password})

        if(responseLogin != null){
    
          dispatch(setToken(responseLogin.data.token))
          console.log(responseLogin.data.token)
    
          let responseUser = await post("user/finduser",{email : email},responseLogin.data.token)
          
          if(responseUser != null){
            dispatch(setUser(responseUser.data))
            navigation.navigate("home")} 
         }
        }
    

    return(
        <>
            <View style={styles.container}>
                <TextInput placeholder="firstname" style={styles.input} onChangeText={setFirstname} />
                <TextInput placeholder="lastname" style={styles.input} onChangeText={setLastname} />
                <TextInput style={styles.input} placeholder="phone" onChangeText={setPhone}/>
                <TextInput placeholder="Email" style={styles.input} onChangeText={setEmail} />
                <TextInput style={styles.input} secureTextEntry={true} placeholder="Password" onChangeText={setPassword}/>

                <Pressable onPress={OnPressLogin} >
                    <Text style={styles.button}>Login</Text>
                </Pressable>
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    container:{
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
    },
    input:{
        backgroundColor:"white",
        padding:5,
        width:"80%",
        marginTop:20,
        borderRadius:5,
        borderWidth:1
    },
    button:{
        backgroundColor:"blue",
        color:"white",
        padding:10,
        marginTop:20,
        borderRadius:5,
        fontSize:20,
      }
  })