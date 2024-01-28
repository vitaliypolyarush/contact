import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import db from './db';

function ContactDetailScreen({ route, navigation }) {
  const { contactId } = route.params;
  const [contact, setContact] = useState(null);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM contacts WHERE id = ?;',
        [contactId],
        (_, { rows }) => {
          if (rows.length > 0) {
            setContact(rows.item(0));
          }
        }
      );
    });
  }, []);

  const handleDeleteContact = async () => {
    try {
      await db.transaction(async (tx) => {
        await tx.executeSql('DELETE FROM contacts WHERE id = ?', [contactId]);
      });

      navigation.goBack();
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const handleEditContact = () => {
    navigation.navigate('EditContact', { contact });
  };

  if (!contact) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Details</Text>
      <Text style={styles.detail}>Name: {contact.name}</Text>
      <Text style={styles.detail}>Phone Number: {contact.phone}</Text>
      <TouchableOpacity style={styles.editButton} onPress={handleEditContact}>
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteContact}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  detail: {
    fontSize: 18,
    color: '#333',
    marginBottom: 15,
  },
  editButton: {
    backgroundColor: '#5E60CE',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#D32F2F',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ContactDetailScreen;
