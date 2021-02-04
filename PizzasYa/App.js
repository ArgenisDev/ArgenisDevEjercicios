import React, {useEffect} from 'react'
//Routes
import PrincipalStack from './src/app/routes/PrincipalStack'

//Dependencies
import AntDesign from 'react-native-vector-icons/AntDesign'

export default function App () {
  useEffect(() => {
    AntDesign.loadFont() //Aditional config for IOS
  }, [])
  return <PrincipalStack />
}
