import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ContactsScreen from './ContactsScreen';
import ContactDetailScreen from './ContactDetailScreen';
import AddContactScreen from './AddContactScreen';
import EditContactScreen from './EditContactScreen';
import CallImitationScreen from './CallImitationScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Contacts">
        <Stack.Screen name="Contacts" component={ContactsScreen} />
        <Stack.Screen name="ContactDetail" component={ContactDetailScreen} />
        <Stack.Screen name="AddContact" component={AddContactScreen} />
        <Stack.Screen name="EditContact" component={EditContactScreen} />
        <Stack.Screen name='CallImitation' component={CallImitationScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
