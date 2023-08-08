import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Entypo'

export default function Navbar({listref}) {
  return (
    <View style={styles.cotainer}>
        <TouchableOpacity onPress={()=>listref.current?.scrollToIndex({index:0})}>
      <Icon name='home' size={20} color={'white'}/>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    cotainer:{
        position:'absolute',
        backgroundColor:'black',
        width:30,
        height:80,
        borderRadius:15,
        zIndex:5,
        left:'2%',
        top:'45%',
   
        marginVertical:'auto',
        justifyContent:'center',
        alignItems:'center'
        }
})