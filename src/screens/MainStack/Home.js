import { ActivityIndicator, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { supabase } from '../../lib/supabase'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/slices/AuthSlice'
import { Color, Font } from '../../constants'
import { FlashList } from "@shopify/flash-list";
import { PostCard } from '../../components';
import { FontAwesome, AntDesign, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

export default function Home() {

  const dispatch              = useDispatch();
  const navigation            = useNavigation();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(null);
  const [postData, setPostDta]= useState([]);
  const [image, setImage]     = useState(null);

  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerStyle: { 
        backgroundColor: Color.BG_COLOR
      },
      headerRight: () => (
       <TouchableOpacity onPress={userLogout} style={{marginRight: 40}}>
        <AntDesign name="logout" size={25} color={Color.RED_COLOR} />
       </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity  onPress={() => navigation.navigate('contact')}>
         <Ionicons name="chatbubble-ellipses-sharp" size={25} color={Color.DARK_COLOR}/>
        </TouchableOpacity>
       ),
    })
  }, [])

  useEffect(() => {
    navigation.navigate('contact')
    getAllPostData();
  }, [])

  const getAllPostData = async() => {
    setLoading(true);
    let { data, error } = await supabase.from('posts').select('*')

    if (error) alert(error.message);

    if (data) {
      //console.log(data);
      setPostDta(data);
    }

    setLoading(false);
  }

  const sendPost = async() => {
    if (content) {
      setLoading(true);
      const { data, error } = await supabase.from('posts').insert({
        content: content,
        image: image
      }).select('*')
  
      if (error) alert(error.message);
  
      if (data) {
        setPostDta([...postData, data[0]]);
        setContent(null);
        setImage(null);
      }

      setLoading(false);
    } else {
      alert("Post Content cannot be blank")
    }
  }

  const deletePost = async(item) => {
    const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', item.id);
    
    if (error) {
      alert(error.message);
    } else {
      await getAllPostData();
    }
  }

  const userLogout = async() => {
    await supabase.auth.signOut();

    dispatch(logout(null))
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true
    });

    //console.log(result);

    if (!result.canceled) {
      const image_base64 = result.assets[0].base64;
      setImage(image_base64);
    }
  };

  if (loading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size='large' color={Color.DARK_COLOR} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <LinearGradient
          colors={['#093028', '#237A57']}
          style={styles.postCard}>
        <View style={styles.postWrite}>
          <TextInput
            placeholder='Write something...'
            placeholderTextColor={Color.DARK_COLOR}
            onChangeText={setContent}
            value={content}
            style={styles.input}
          />
          <TouchableOpacity onPress={sendPost}>
            <FontAwesome name="send" size={22} color={Color.GREEN_COLOR} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={pickImage} style={{margin: 10}}>
          <FontAwesome name="image" size={25} color={Color.WHITE_COLOR} />
        </TouchableOpacity>
        {
          image && (
            <View style={{flexDirection: 'row', gap: wp(5)}}>
              <Image source={{ uri: `data:image/jpeg;base64,${image}` }} style={{ width: wp(25), height: wp(25) }} />
              <AntDesign name="delete" size={25} color={Color.WHITE_COLOR} onPress={() => setImage(null)}/>
            </View>
          )
        }
      </LinearGradient>
      <FlashList
        data={postData}
        renderItem={({ item }) => <PostCard data={item} onPressDelete={() => deletePost(item)}/>}
        estimatedItemSize={200}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: wp(3)
  },
  postCard: {
    //backgroundColor: Color.WHITE_COLOR,
    borderRadius: 8,
    marginHorizontal: 10,
    padding: 10
  },
  postWrite: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  input: {
    width: wp(80),
    height: wp(10),
    padding: 10,
    borderRadius: 8,
    backgroundColor: Color.WHITE_COLOR,
    fontFamily: Font.medium,
    fontSize: wp(4),
    color: Color.DARK_COLOR
  }
})