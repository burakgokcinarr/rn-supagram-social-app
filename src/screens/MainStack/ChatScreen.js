import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { GiftedChat } from 'react-native-gifted-chat'
import { SafeAreaView } from 'react-native-safe-area-context'
import { supabase } from '../../lib/supabase'

export default function ChatScreen() {

  const Router      = useRoute();
  const sender_id   = Router.params.sent_id;
  const user_id     = Router.params.user_id;

  const [messages, setMessages] = useState([])

  useEffect(() => {

    const getAllMessage = async() => {
      let { data: message, error } = await supabase
        .from('message')
        .select('*')
        .or(`user_id.eq.${user_id},sender_id.eq.${user_id}`)
        .or(`user_id.eq.${sender_id},sender_id.eq.${sender_id}`)

        if (error) alert(error.message);

        if(message) {
          console.log(message)
          const giffed_message = Array();
          message.map((mess) => {
            const mes = {
              _id: mess.id,
              text: mess.content,
              createdAt: new Date(mess.created_at),
              user: { _id: mess.sender_id }
            }
            giffed_message.push(mes);
          })

          setMessages(giffed_message.reverse());
        }
    }

    getAllMessage();
  }, [])

  const onSend = useCallback(async(messages = []) => {
    const contentText = messages[0].text;

    const { data, error } = await supabase.from('message').insert({
      user_id: user_id,
      sender_id: sender_id,
      content: contentText
    }).select('*');

    if (error) {
      alert(error.message);
    } else {
      setMessages((prev) => [data[0], ...prev]);
    }
  }, [])

  return (
   <SafeAreaView style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: user_id,
        }}
        showUserAvatar={true}
        alwaysShowSend
      />
   </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})