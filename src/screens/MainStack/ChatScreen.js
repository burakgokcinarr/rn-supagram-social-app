import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

export default function ChatScreen() {

  const Router      = useRoute();
  //console.log(Router.params)
  return (
    <View>
      <Text>ChatScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({})