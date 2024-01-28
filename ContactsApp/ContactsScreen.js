import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import db from './db';

function ContactsScreen({ navigation }) {
  const [contacts, setContacts] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const loadContacts = () => {
        db.transaction(tx => {
          tx.executeSql(
            'SELECT * FROM contacts;',
            [],
            (_, { rows: { _array } }) => {
              setContacts(_array);
            },
            (t, error) => {
              console.log("Error fetching contacts: ", error);
            }
          );
        });
      };

      loadContacts();
      return () => {}; // clean-up function
    }, [])
  );

  const handleEditContact = (contact) => {
    navigation.navigate('EditContact', { contact });
  };

  const handleCallContact = (contact) => {
    // Логіка імітації дзвінка до контакта
    console.log(`Дзвінок до ${contact.name} (${contact.phone})`);

    // Перенаправити на сторінку імітації дзвінка з інформацією про контакт
    navigation.navigate('CallImitation', { callingContact: contact });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => navigation.navigate('ContactDetail', { contactId: item.id })}
    >
      <Text style={styles.listItemText}>{item.name}</Text>
      <TouchableOpacity onPress={() => handleEditContact(item)}>
     
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleCallContact(item)}>
        <Text style={styles.callButtonText}>Call</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button
        title="Add Contact"
        color="#5E60CE"
        onPress={() => navigation.navigate('AddContact')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    backgroundColor: '#FFF',
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  listItemText: {
    color: '#333333',
    fontSize: 18,
  },
  editButtonText: {
    color: '#5E60CE',
    fontSize: 16,
    marginLeft: 10,
  },
  callButtonText: {
    color: '#00BFFF',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default ContactsScreen;
