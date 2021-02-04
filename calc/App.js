import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Vibration,
} from 'react-native';
import {useState} from 'react';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');
  const buttons = [
    'C',
    'DEL',
    '^',
    7,
    8,
    9,
    '*',
    4,
    5,
    6,
    '-',
    1,
    2,
    3,
    '+',
    0,
    '.',
    '/',
    '=',
  ];

  function operationParse(number) {
    let arrayCalculation = [],
      currentString = '';
    for (let i = 0, chartbyNumber; (chartbyNumber = number.charAt(i)); i++) {
      if ('^*/+-'.indexOf(chartbyNumber) > -1) {
        if (currentString == '' && chartbyNumber == '-') {
          currentString = '-';
        } else {
          arrayCalculation.push(parseFloat(currentString), chartbyNumber);
          currentString = '';
        }
      } else {
        currentString += number.charAt(i);
      }
    }
    if (currentString != '') {
      arrayCalculation.push(parseFloat(currentString));
    }
    return arrayCalculation;
  }

  function Operations(currentNumberOperations) {
    console.log(currentNumberOperations);
    let operations = [
        {'^': (a, b) => Math.pow(a, b)},
        {'*': (a, b) => a * b, '/': (a, b) => a / b},
        {'+': (a, b) => a + b, '-': (a, b) => a - b},
      ],
      newResult = [],
      currentOperation;
    for (let i = 0; i < operations.length; i++) {
      for (let j = 0; j < currentNumberOperations.length; j++) {
        if (operations[i][currentNumberOperations[j]]) {
          currentOperation = operations[i][currentNumberOperations[j]];
        } else if (currentOperation) {
          newResult[newResult.length - 1] = currentOperation(
            newResult[newResult.length - 1],
            currentNumberOperations[j],
          );
          currentOperation = null;
        } else {
          newResult.push(currentNumberOperations[j]);
        }
        setCurrentNumber(newResult[0]);
      }
      currentNumberOperations = newResult;
      newResult = [];
    }
    if (currentNumberOperations.length > 1) {
      return currentNumberOperations;
    } else {
      return currentNumberOperations[0];
    }
  }

  function handleInput(buttonPressed) {
    if (
      buttonPressed === '+' ||
      buttonPressed === '-' ||
      buttonPressed === '*' ||
      buttonPressed === '/'
    ) {
      Vibration.vibrate(35);
      setCurrentNumber(currentNumber + buttonPressed);
      return;
    }
    if (
      currentNumber.length < 20 ||
      buttonPressed === 'DEL' ||
      buttonPressed === 'C' ||
      buttonPressed === '='
    ) {
      if (
        buttonPressed === 1 ||
        buttonPressed === 2 ||
        buttonPressed === 3 ||
        buttonPressed === 4 ||
        buttonPressed === 5 ||
        buttonPressed === 6 ||
        buttonPressed === 7 ||
        buttonPressed === 8 ||
        buttonPressed === 9 ||
        buttonPressed === 0 ||
        buttonPressed === '.'
      ) {
        Vibration.vibrate(35);
      }
      switch (buttonPressed) {
        case 'DEL':
          Vibration.vibrate(35);
          try {
            setCurrentNumber(
              currentNumber.substring(0, currentNumber.length - 1),
            );
          } catch {}

          return;
        case 'C':
          Vibration.vibrate(35);
          setLastNumber('');
          setCurrentNumber('');
          return;
        case '=':
          Vibration.vibrate(35);
          try {
            setLastNumber(currentNumber + '=');
            Operations(operationParse(currentNumber));
          } catch {}
          return;
      }
      setCurrentNumber(currentNumber + buttonPressed);
    }
  }

  return (
    <View>
      <View style={styles.results}>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>
      <View style={styles.buttons}>
        {buttons.map((button) =>
          button === '/' ||
          button === '*' ||
          button === '-' ||
          button === '+' ? (
            <TouchableOpacity
              key={button}
              style={[styles.button, {backgroundColor: 'blue'}]}
              onPress={() => handleInput(button)}>
              <Text style={[styles.textButton, {color: 'white', fontSize: 28}]}>
                {button}
              </Text>
            </TouchableOpacity>
          ) : button === 0 ? (
            <TouchableOpacity
              key={button}
              style={[
                styles.button,
                {
                  backgroundColor:
                    typeof button === 'number' ? '#303946' : '#414853',
                  minWidth: '36%',
                },
              ]}
              onPress={() => handleInput(button)}>
              <Text style={styles.textButton}>{button}</Text>
            </TouchableOpacity>
          ) : button === '.' || button === 'DEL' ? (
            <TouchableOpacity
              key={button}
              style={[
                styles.button,
                {
                  backgroundColor:
                    button === '.'
                      ? darkMode
                        ? '#303946'
                        : '#fff'
                      : darkMode === true
                      ? '#414853'
                      : '#ededed',
                  minWidth: '37%',
                },
              ]}
              onPress={() => handleInput(button)}>
              <Text style={styles.textButton}>{button}</Text>
            </TouchableOpacity>
          ) : button === 'C' ? (
            <TouchableOpacity
              key={button}
              style={[
                styles.button,
                {
                  backgroundColor:
                    typeof button === 'number'
                      ? darkMode
                        ? '#303946'
                        : '#fff'
                      : darkMode === true
                      ? '#414853'
                      : '#ededed',
                  minWidth: '36%',
                },
              ]}
              onPress={() => handleInput(button)}>
              <Text style={styles.textButton}>{button}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              key={button}
              style={[
                styles.button,
                {
                  backgroundColor:
                    typeof button === 'number'
                      ? darkMode
                        ? '#303946'
                        : '#fff'
                      : darkMode === true
                      ? '#414853'
                      : '#ededed',
                },
              ]}
              onPress={() => handleInput(button)}>
              <Text style={styles.textButton}>{button}</Text>
            </TouchableOpacity>
          ),
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  results: {
    backgroundColor: '#282f3b',
    maxWidth: '100%',
    minHeight: '35%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  resultText: {
    maxHeight: 45,
    color: '#00b9d6',
    margin: 15,
    fontSize: 25,
  },
  historyText: {
    color: '#B5B7BB',
    fontSize: 20,
    marginRight: 10,
    alignSelf: 'flex-end',
  },
  themeButton: {
    alignSelf: 'flex-start',
    bottom: '5%',
    margin: 15,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  buttons: {
    width: '100%',
    height: '35%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '24%',
    minHeight: '40%',
    flex: 2,
  },
  textButton: {
    color: '#7c7c7c',
    fontSize: 28,
  },
});
