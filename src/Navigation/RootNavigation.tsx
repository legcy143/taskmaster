import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../Todo/Splash';
import Home from '../Todo/Screens/Home';
import OnProgressTodo from '../Todo/Screens/OnProgressTodo';
import CompletedTodo from '../Todo/Screens/CompletedTodo';
import Authentication from '../Todo/Screens/Authentication';
import Profile from '../Todo/Screens/Profile';
import Notification from '../Todo/Screens/Notification';
const Stack = createNativeStackNavigator();

export default function RootNavigation() {
    return (
    <Stack.Navigator initialRouteName="Splash" 
    screenOptions={{
      headerShown:false,
    }}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Authentication" component={Authentication} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="OnProgressTodo" component={OnProgressTodo} />
      <Stack.Screen name="CompletedTodo" component={CompletedTodo} />
    </Stack.Navigator>
  );
};
