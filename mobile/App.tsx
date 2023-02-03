import './src/lib/dayjs'
import { StatusBar } from 'react-native';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter'
import { Loading } from './src/components/Loading';
import { Home } from './src/screens/Home';

export default function App() {

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold
  })

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <>
      <StatusBar
        barStyle='light-content'
        translucent />
      <Home />
    </>
  );
}