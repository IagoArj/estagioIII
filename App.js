import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import AllNavigator from './navigation/AllNavigation'
import firebase from 'firebase';
export default function App() {
  var firebaseConfig = {
    apiKey: "AIzaSyCj8ncSYh9SKZOnYNv2kcuNA2CsjYTmenA",
    authDomain: "estagio3-d9c6d.firebaseapp.com",
    databaseURL: "https://estagio3-d9c6d.firebaseio.com",
    projectId: "estagio3-d9c6d",
    storageBucket: "estagio3-d9c6d.appspot.com",
    messagingSenderId: "136453378511",
    appId: "1:136453378511:web:f0e9cd9b14ef7125"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  return (
    <AllNavigator />
  )
};

  
