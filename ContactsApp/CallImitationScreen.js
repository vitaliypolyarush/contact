import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';

function CallImitationScreen({ route, navigation }) {
  const { callingContact } = route.params;
  const [isCalling, setIsCalling] = useState(false);
  const [callDuration, setCallDuration] = useState(0); // Додайте змінну для тривалості дзвінка
  const spinValue = new Animated.Value(0);

  useEffect(() => {
    if (!isCalling) {
      startCallImitation();
    }
  }, []);

  useEffect(() => {
    let timer;
    if (isCalling) {
      timer = setInterval(() => {
        setCallDuration(prevDuration => prevDuration + 1); // Оновлюємо тривалість кожну секунду
      }, 1000);
    } else {
      clearInterval(timer); // Зупиняємо таймер, коли дзвінок закінчено
    }
    return () => clearInterval(timer); // При зміні isCalling зупиняємо таймер і прибираємо його після знищення компонента
  }, [isCalling]);

  const startCallImitation = () => {
    setIsCalling(true);
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.callContainer}>
        <Animated.View
          style={[
            styles.callingContainer,
            { transform: [{ rotate: spin }] },
          ]}
        >
          <Text style={styles.callingText}>Дзвонимо до:</Text>
          <Text style={styles.contactName}>{callingContact.name}</Text>
          <Text style={styles.contactPhone}>{callingContact.phone}</Text>
        </Animated.View>

        {/* Центрований таймер */}
        <View style={styles.timerContainer}>
          <Text style={styles.callDurationText}>
            Тривалість: {callDuration} сек.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.endCallButton}
          onPress={() => {
            setIsCalling(false);
            navigation.navigate('Contacts');
          }}
          disabled={!isCalling}
        >
          <Text style={styles.endCallButtonText}>Завершити дзвінок</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333', // Темний фон
  },
  callContainer: {
    padding: 20,
  },
  callingContainer: {
    padding: 20,
    alignItems: 'center', // Вирівнювання тексту по центру
  },
  callingText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white', // Білий колір тексту
  },
  contactName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white', // Білий колір тексту
  },
  contactPhone: {
    fontSize: 20,
    color: 'white', // Білий колір тексту
  },
  timerContainer: {
    alignItems: 'center', // Вирівнювання тексту по центру
  },
  callDurationText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'white', // Білий колір тексту
  },
  endCallButton: {
    marginTop: 300,
    backgroundColor: '#D32F2F', // Червона кнопка
    paddingVertical: 10,
    borderRadius: 50,
    elevation: 2,
    alignItems: 'center',
  },
  endCallButtonText: {
    color: 'white', // Білий колір тексту
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CallImitationScreen;
