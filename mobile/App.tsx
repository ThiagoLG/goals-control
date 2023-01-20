import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Header } from './src/components/Header';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter'
import { Loading } from './src/components/Loading';

export default function App() {

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold
  })

  if (fontsLoaded) {
    return <Loading />
  }

  return (
    <View style={styles.container}>
      <Header />
      <StatusBar
        barStyle='light-content'
        translucent />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090A',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
