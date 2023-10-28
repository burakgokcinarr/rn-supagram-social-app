
import { useFonts } from 'expo-font';
import { FontLoader } from './src/config/FontLoader';
import NavigationRouter from './src/navigation/NavigationRouter';
import { store } from './src/redux/Store'
import { Provider } from 'react-redux'

export default function App() {

  const [fontsLoaded] = useFonts(FontLoader);

  if (!fontsLoaded) {
    return null;
  } 

  return (
    <Provider store={store}>
      <NavigationRouter/>
    </Provider>
  );
}
