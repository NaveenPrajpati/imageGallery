import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
import Navbar from '../components/Navbar';

export default function HomeScreen() {
    const listref=useRef()
    const [loading,setLoading]=useState(false)
    const [images, setImages] = useState([]);
    const[connected,setConnected]=useState(false);
let baseurl='https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s'

    const getRecentImages = async () => {
        try {
          const response = await axios.get(baseurl);
    
          const recentImages = response.data.photos.photo;
          await AsyncStorage.setItem('savedImage', JSON.stringify(recentImages));
      
          return recentImages;

        } catch (error) {
          console.error('Error fetching recent images:', error);
          return [];
        }
      };

    useEffect(() => {
      const fetchImages = async () => {
        //get state of device that it is connected to internet or not
        NetInfo.fetch().then(async state => {
        if (state.isConnected) {
            const response  = await getRecentImages();
            setImages(response);
        } else {
        const cachedData = await AsyncStorage.getItem('savedImage');
            setImages(JSON.parse(cachedData!=null?cachedData:''));
          }
        });
    }

      fetchImages();
    }, [baseurl,loading]);
  
  return (
    <View style={{position:'relative'}}>
        <Navbar listref={listref}/>
        {images?
       <FlatList
       ref={listref}
       onRefresh={()=>{
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
       }}
     refreshing={loading}
       contentContainerStyle={{padding:5,marginHorizontal:'auto'}}
        data={images}
        keyExtractor={(item:any) => item.id}
        renderItem={({ item }) => (
          <Image source={{ uri: item.url_s }} style={styles.imagestyle} />
        )}
      />
      :<Text> UNABLE TO GET DATA</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
    imagestyle:{
        width: '100%',
         height: 400,
         marginHorizontal:'auto',
         marginVertical:10,
         borderRadius:10 
    }
})