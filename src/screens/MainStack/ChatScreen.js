import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import { supabase } from '../../lib/supabase'
import { Font, Color } from '../../constants'

export default function ChatScreen() {

  const Router      = useRoute();
  const sender_id   = Router.params.sent_id;
  const user_id     = Router.params.user_id;
  const avatar      = Router.params.avatar;

  const [messages, setMessages] = useState([])

  useEffect(() => {
    getAllMessage();
  }, [])

  useEffect(() => {
    const chatsWatcher = supabase.channel('message')
        .on(
            'postgres_changes',
            { event: 'INSERT', schema: 'public', table: 'message' },
            async (payload) => {
              //console.log('chats changed', payload.new);
              
              const messages = payload.new;

              if (messages.sender_id == user_id) {
                const newMessage = {
                  _id: messages.id,
                  text: messages.content,
                  createdAt: new Date(messages.created_at),
                  user: { _id: messages.user_id }
                }
                setMessages((prev) => [newMessage, ...prev]);
              }
            }
        )
        .subscribe()

    return () => {
      supabase.removeChannel(chatsWatcher);
    }
  }, [])

  const getAllMessage = async() => {
    let { data: message, error } = await supabase
      .from('message')
      .select('*')
      .or(`user_id.eq.${user_id},sender_id.eq.${user_id}`)
      .or(`user_id.eq.${sender_id},sender_id.eq.${sender_id}`)

      if (error) alert(error.message);

      if(message) {
        //console.log(message)
        const giffed_message = Array();
        message.map((mess) => {
          const mes = {
            _id: mess.id,
            text: mess.content,
            createdAt: new Date(mess.created_at),
            user: { _id: mess.user_id }
          }
          giffed_message.push(mes);
        })

        setMessages(giffed_message.reverse());
      }
  }

  const onSend = useCallback(async(messages = []) => {
    const contentText     = messages[0].text;
    const { data, error } = await supabase.from('message').insert({
      user_id: user_id,
      sender_id: sender_id,
      content: contentText
    }).select('*');

    if (error) {
      alert(error.message);
    } else {
      const newMessage = {
        _id: data[0].id,
        text: data[0].content,
        createdAt: new Date(data[0].created_at),
        user: { _id: data[0].user_id }
      }
      setMessages((prev) => [newMessage, ...prev]);
    }
  }, [])

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: Color.GREEN_COLOR
          }
        }}
      />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: user_id
        }}
        showUserAvatar={true}
        alwaysShowSend
        messagesContainerStyle={{backgroundColor: Color.BG_COLOR}}
        renderBubble={renderBubble}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})