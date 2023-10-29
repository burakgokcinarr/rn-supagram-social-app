import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Font, Color } from '../../constants';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../lib/supabase';

export default function SignUp() {

  const navigation              = useNavigation();
  const [mail, setMail]         = useState(null);
  const [password, setPassword] = useState(null);
  const [username, setUsername] = useState(null);
  const [loading, setLoading]   = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerStyle: { 
        backgroundColor: Color.BG_COLOR
      },
    })
  }, [])

  const createAccount = async() => {
    if (mail && password && username) {
      setLoading(true)
    
      const { data, error } = await supabase.auth.signUp({
        email: mail,
        password: password,
      })
  
      if (error) alert(error.message);
  
      if (data.session) {
        // Insert Profile Table Info
        const { data, error } = await supabase.from('profile').insert({
          user_name: username,
          profile_uri: 'https://randomuser.me/api/portraits/men/75.jpg'
        }).select('*')
    
        if (error) alert(error.message);
    
        if (data) {
          setMail(null);
          setPassword(null);
          setUsername(null);
          alert("Your registration was successful. Please log in.")
        }
      }
  
      setLoading(false)
    } else {
      alert("E-mail and/or password cannot be blank")
    }
  }

  if (loading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size='larger' color={Color.DARK_COLOR}/>
      </View>
    )
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Text style={styles.title}>Supagram</Text>
      <TextInput
        placeholder='Username'
        placeholderTextColor={Color.DARK_COLOR}
        onChangeText={setUsername}
        value={username}
        style={styles.input}
        textContentType="oneTimeCode"
      />
      <TextInput
        placeholder='E-Mail'
        placeholderTextColor={Color.DARK_COLOR}
        onChangeText={setMail}
        value={mail}
        style={styles.input}
        textContentType="oneTimeCode"
      />
      <TextInput
        placeholder='Password'
        placeholderTextColor={Color.DARK_COLOR}
        onChangeText={setPassword}
        style={styles.input}
        value={password}
        secureTextEntry
        textContentType="oneTimeCode"
      />
      <TouchableOpacity onPress={createAccount}>
        <LinearGradient
          // Button Linear Gradient
          colors={['#0575E6', '#021B79']}
          style={styles.button}>
          <Text style={styles.text}>Sign Up</Text>
        </LinearGradient>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  input: {
    width: wp(80),
    height: wp(12),
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Color.DARK_COLOR,
    padding: 5,
    color:Color.DARK_COLOR,
    fontSize: wp(4),
    fontFamily: Font.regular
  },
  title: {
    fontFamily: Font.extraBold,
    fontSize: wp(12),
    textAlign: 'center',
    color: Color.DARK_COLOR,
    marginBottom: wp(3)
  },
  button: {
    width: wp(50),
    padding: 10,
    alignItems: 'center',
    borderRadius: 7
  },
  text: {
    color: Color.WHITE_COLOR,
    fontFamily: Font.medium,
    fontSize: wp(4)
  },
  accountText : {
    fontFamily: Font.regular,
    fontSize: wp(4),
    color: Color.WHITE_COLOR,
  },
  signupText : {
    textDecorationLine: 'underline',
    fontFamily: Font.bold
  }
})