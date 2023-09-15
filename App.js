import { StyleSheet} from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import NavigatorComponent from './Component/NavigatorComponent'
import { Provider} from 'react-redux'
import { store } from './Services/Store'



export default function App() {

  return (
    <Provider store={store}>
        <NavigationContainer>
          <NavigatorComponent/>
        </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({})