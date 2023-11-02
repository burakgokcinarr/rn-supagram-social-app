import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { AntDesign } from '@expo/vector-icons';
import { Color, Font } from '../constants';
import { useNavigation } from '@react-navigation/native';

export default function UserCard({ data, user_id }) {

    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.navigate('chat', { user_id: user_id, sent_id: data.user_id, avatar: data.profile_uri })}>
            <View style={styles.container}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                        style={styles.userLogo}
                        source={{
                            uri: data.profile_uri,
                        }}
                    />
                    <Text style={styles.text}> {data.user_name}</Text>
                </View>
                <AntDesign name="right" size={25} color={Color.DARK_COLOR} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5
    },
    userLogo: {
        width: wp(10),
        aspectRatio: 1,
        borderRadius: wp('50%')
    },
    text: {
        fontFamily: Font.medium,
        fontSize: wp(4),
        color: Color.DARK_COLOR
    }
})