import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BotttomTabView from './src/Screens/BottomGrow';
import { View, Text } from 'react-native';
import StockDetails from './src/Screens/StockDetails';
import HomePage from './src/Screens/HomePage';
import Profile from './src/Screens/Profile';
import SearchContent from './src/Screens/SearchContent';
import PriceChart from './src/Screens/PriceChart';
import BuyStock from './src/Screens/BuyStock';
import SellStock from './src/Screens/SellStock';
import OtpAuth from './src/Authentication/OtpAuth';
import SignUp from './src/Authentication/SignUp';
import auth from '@react-native-firebase/auth';
import { useEffect,useState } from 'react';
import Wallet from './src/Screens/Wallet';
// import Check from './src/Screens/Check';
// import Check from './src/Screens/Check';
import News from './src/Screens/News';
// import News from './src/Screens/News';
// import OtpAuth from './src/Authentication/OtpAuth';
const Stack = createStackNavigator();

const App = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
}, []);
function onAuthStateChanged(user) {
  setUser(user)
  // user ? dispatch(setAuthUser(user.uid)) : dispatch(setAuthUser(null))
}

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        {user?
        <>
         <Stack.Screen name='Check' component={News}/>
       
       
        

        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="SearchContent" component={SearchContent} />
        {/* <Stack.Screen name="BotttomTabView" component={BotttomTabView} /> */}
        <Stack.Screen name='StockDetails' component={StockDetails} />
        <Stack.Screen name='BuyStock' component={BuyStock}/>
        <Stack.Screen name='SellStock' component={SellStock}/>
        <Stack.Screen name='Wallet' component={Wallet}/>
        </>
        :
        <>
        <Stack.Screen name='OtpAuth' component={OtpAuth}/>

        </>
}

      </Stack.Navigator>
    </NavigationContainer>
    // <OtpAuth/>
    // <News />
    // <PriceChart />
    // <View>
    //   <HomePage/>
    // </View>
  );
};
export default App;