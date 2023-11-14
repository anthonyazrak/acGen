// In your App.js or a separate file for navigators
import { createStackNavigator } from '@react-navigation/stack';
import SavedScreen from './screens/SavedScreen';
import DetailsScreen from './screens/DetailsScreen';

const SavedStack = createStackNavigator();

const SavedStackScreen = () => (
  <SavedStack.Navigator>
    <SavedStack.Screen name="Saved" component={SavedScreen} />
    <SavedStack.Screen name="Details" component={DetailsScreen} />
  </SavedStack.Navigator>
);

export default SavedStackScreen;