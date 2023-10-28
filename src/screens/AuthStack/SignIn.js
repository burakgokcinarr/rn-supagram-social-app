import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Font, Color } from '../../constants';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../lib/supabase';
import { useDispatch } from 'react-redux';
import { userSession } from '../../redux/slices/AuthSlice';

export default function SignIn() {

  const dispatch                = useDispatch();
  const navigation              = useNavigation();
  const [mail, setMail]         = useState(null);
  const [password, setPassword] = useState(null);

  const singInClicked = async() => {
    if (mail && password) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: mail,
        password: password,
      })

      if (error) alert(error.message);

      if (data) {
        //console.log(data)
        dispatch(userSession(data.session));
      }

    } else {
      alert("E-mail and/or password cannot be blank")
    }
  }

  const singUpClicked = async() => {
    navigation.navigate('signup')
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Text style={styles.title}>Supagram</Text>
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
      <TouchableOpacity onPress={singInClicked}>
        <LinearGradient
          // Button Linear Gradient
          colors={['#0575E6', '#021B79']}
          style={styles.button}>
          <Text style={styles.text}>Log In</Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity onPress={singUpClicked}>
        <Text style={styles.accountText}>Don't have an account? <Text style={styles.signupText}>Sign Up</Text></Text>
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
    marginBottom: wp(5)
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
    color: Color.DARK_COLOR,
  },
  signupText : {
    textDecorationLine: 'underline',
    fontFamily: Font.bold
  }
})