import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function CurrencyList({ flag, country }) {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>
        {flag} {country}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 1, 
  },
  itemText: {
    fontSize: 16,
  },
});
