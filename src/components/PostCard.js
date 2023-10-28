import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { Color, Font } from '../constants'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { AntDesign } from '@expo/vector-icons';

export default function PostCard({ data, onPressDelete = null }) {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Image
          style={styles.userLogo}
          source={{
            uri: 'https://t3.ftcdn.net/jpg/01/91/01/78/360_F_191017886_YIfoLtRxVw8PIeAMtR0i4ZDwAyKutVI2.jpg',
          }}
        />
        <Text style={styles.userText}> Anonymous</Text>
        <TouchableOpacity onPress={onPressDelete}>
          <AntDesign name="delete" size={24} color={Color.RED_COLOR} />
        </TouchableOpacity>
      </View>
      {
        data.image && (
          <Image source={{ uri: `data:image/jpeg;base64,${data.image}` }} style={{ width: '100%', height: wp(50), marginTop: wp(5) }} />
        )
      }
      <Text style={styles.text}> {data.content}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 10,
      backgroundColor: Color.WHITE_COLOR,
      padding: 10,
      borderRadius: 7
    },
    text: {
      flex: 1,
      fontFamily: Font.regular,
      fontSize: wp(4),
      textAlign: 'left',
      marginTop: 5
    },
    userText: {
      flex: 1,
      fontFamily: Font.medium,
      fontSize: wp(3),
      textAlign: 'left'
    },
    userLogo: {
      width: wp(10),
      aspectRatio: 1,
      borderRadius: wp('50%')
    }
})