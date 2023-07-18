import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BotttomTabView from './src/Screens/BottomGrow';
import { View, Text } from 'react-native';
import StockDetails from './src/Screens/StockDetails';
import HomePage from './src/Screens/HomePage';
import Profile from './src/Screens/Profile';
import SearchContent from './src/Screens/SearchContent';
import PriceChart from './src/Screens/PriceChart';
import News from './src/Screens/News';
const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="SearchContent" component={SearchContent} />
        {/* <Stack.Screen name="BotttomTabView" component={BotttomTabView} /> */}
        <Stack.Screen name='StockDetails' component={StockDetails} />
      </Stack.Navigator>
    </NavigationContainer>
    // <News />
    // <PriceChart />
    // <View>
    //   <HomePage/>
    // </View>
  );
};
export default App;