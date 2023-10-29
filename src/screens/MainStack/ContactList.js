import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { supabase } from '../../lib/supabase'
import { FlashList } from "@shopify/flash-list";
import { UserCard } from '../../components';

export default function ContactList() {

  const [userList, setUserList] = useState(null);
  const [userId, setUserId]     = useState(null);

  useEffect(() => {
    const getUserInfo = async() => {
      const { data, error } = await supabase.auth.getUser();
      console.log(data.user.id)
      setUserId(data.user.id);
    }

    getUserInfo();
  }, [])

  useEffect(() => {
    const getContactList = async() => {
      let { data: profile, error } = await supabase
      .from('profile')
      .select('user_name, profile_uri, user_id')
      .neq('user_id', userId)

      if (error) alert(error.message);

      if (profile) {
        //console.log(profile)
        setUserList(profile);
      }
    }

    if (userId) {
      getContactList();
    }
  }, [userId])

  return (
    <View style={styles.container}>
      <FlashList
        data={userList}
        renderItem={({ item }) => <UserCard data={item} user_id={userId}/>}
        estimatedItemSize={200}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})