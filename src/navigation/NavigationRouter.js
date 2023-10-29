import React, { useState, useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Color } from '../constants'
// Auth Stack
import { SignIn, SignUp } from '../screens/AuthStack';
// Main Stack
import { Home, ChatScreen, ContactList } from '../screens/MainStack'; 
import { useSelector, useDispatch } from 'react-redux'
import { supabase } from '../lib/supabase';
import { userSession } from '../redux/slices/AuthSlice';
import { ActivityIndicator, View } from 'react-native';

const Stack = createNativeStackNavigator();

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: Color.BG_COLOR,
        primary: Color.DARK_COLOR
    }
}

const AuthScreen = () => {
   return (
        <Stack.Navigator screenOptions={{ gestureEnabled: false }}>
            <Stack.Screen name="signin" component={SignIn} options={{ headerShown: false }} />
            <Stack.Screen name="signup" component={SignUp} options={{ headerShown: true, title: "" }} />
        </Stack.Navigator>
   )
}

const MainScreen = () => {
   return (
        <Stack.Navigator screenOptions={{ gestureEnabled: false }}>
            <Stack.Screen name="home" component={Home} options={{ headerShown: true, title: "" }} />
            <Stack.Screen name="contact" component={ContactList} options={{ headerShown: true, title: "" }} />
            <Stack.Screen name="chat" component={ChatScreen} options={{ headerShown: true, title: "" }} />
        </Stack.Navigator>
   )
}

export default function NavigationRouter() {

    const isLogIn = useSelector((state) => state.auth.user);
    const dispatch              = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUserSession = async() => {
            const { data, error } = await supabase.auth.getSession();

            dispatch(userSession(data.session));

            setLoading(false);
        }

        getUserSession();
    }, [])

    if (loading) {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Color.BG_COLOR}}>
                <ActivityIndicator size='large' color={Color.WHITE_COLOR}/>
            </View>
        )
    }

    return (
        <NavigationContainer theme={theme}>
            {
                isLogIn ? <MainScreen/> : <AuthScreen/>
            }
        </NavigationContainer>
    );
}