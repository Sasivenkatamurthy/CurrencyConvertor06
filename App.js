// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import React from 'react';
// import type {PropsWithChildren} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({children, title}: SectionProps): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

// function App(): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.tsx</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;

// App.js




import { StyleSheet, Text, View, TextInput, Button, FlatList, StatusBar, Pressable } from 'react-native';
import React, { useState } from 'react';
import Snackbar from 'react-native-snackbar';
import { currencyByRupees } from './src/Components/constants';
import CurrencyList from './src/Components/CurrencyButton'; 

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [resultValue, setResultValue] = useState('');
  const [targetValue, setTargetValue] = useState('');

  const buttonPress = () => {
    if (!inputValue) {
      return Snackbar.show({
        text: 'Enter the value to convert',
        backgroundColor: '#EA7773',
        color: '#000000',
      });
    }

    const inputAmount = parseFloat(inputValue);
    if (!isNaN(inputAmount)) {
      const convertedValue = inputAmount * targetValue.value_in_currency;
      const result = `${targetValue.symbol} ${convertedValue.toFixed(2)}`; 
      setResultValue(result);
    } else {
      return Snackbar.show({
        text: 'Enter a valid number',
        backgroundColor: '#EA7773',
        color: '#000000',
      });
    }
  };

  const buttonPressed = (item) => {
    setTargetValue(item); 
    setResultValue('');
  };

  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <View>
          <Text style={styles.rupeeSymbol}>₹</Text>
          <TextInput 
            maxLength={14}
            onChangeText={setInputValue} 
            keyboardType='number-pad'
            placeholder='Enter the amount in Rupees'
            style={styles.input}
          />
          <Button title="Convert" onPress={buttonPress} />
        </View>
        {resultValue ? <Text style={styles.result}>{'Converted Value : '+resultValue}</Text> : null}
        <View>
          <FlatList 
            numColumns={3}
            data={currencyByRupees} 
            keyExtractor={(item) => item.country}
            renderItem={({ item }) => ( 
              <Pressable 
                style={[styles.button, targetValue === item ? styles.selectedButton : null]} 
                onPress={() => buttonPressed(item)}
              >
                <CurrencyList {...item} /> 
              </Pressable>
            )}
          />
        </View>
      </View>                     
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  rupeeSymbol: {
    fontSize: 32,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: '#ffcc00',
  },
});
