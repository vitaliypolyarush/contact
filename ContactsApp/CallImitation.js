// CallImitation.js
import React from 'react';
import { View, Text, Button } from 'react-native';

function CallImitationScreen({ route, navigation }) {
  const { callingContact } = route.params;

  const handleCancelCall = () => {
    // Дія при відміні дзвінка
    navigation.navigate('Contacts'); // Повернення на сторінку контактів
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Дзвінок до {callingContact.name} ({callingContact.phone})</Text>
      <Button title="Cancel Call" onPress={handleCancelCall} />
    </View>
  );
}

export default CallImitationScreen;
