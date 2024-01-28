import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet } from 'react-native';
import db from './db';

function EditContactScreen({ route, navigation }) {
  const { contact } = route.params;
  const [name, setName] = useState(contact.name);
  const [phone, setPhone] = useState(contact.phone);

  const handleSaveContact = async () => {
    if (!name || !phone) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      await db.transaction(async (tx) => {
        await tx.executeSql(
          'UPDATE contacts SET name = ?, phone = ? WHERE id = ?',
          [name, phone, contact.id]
        );
      });

      navigation.goBack();
    } catch (error) {
      console.error('Error updating contact in the database:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Contact</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={(text) => setPhone(text)}
        keyboardType="phone-pad"
      />
      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSaveContact}
      >
        <Text style={styles.saveButtonText}>Save</Text>
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
  input: {
    height: 50,
    borderColor: '#5E60CE',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#5E60CE',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditContactScreen;
