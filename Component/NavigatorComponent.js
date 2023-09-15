import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomePage from '../Pages/HomePage'
import LoginPage from '../Pages/LoginPage'
import RegisterPage from '../Pages/RegisterPage'

export default function NavigatorComponent() {

  const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator screenOptions={{headerTitleAlign:"center",headerTitleStyle:{fontSize:28},}}>
      <Stack.Screen name='home' component={HomePage} />
      <Stack.Screen name='login' component={LoginPage}/>
      <Stack.Screen name='register' component={RegisterPage}/>
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})