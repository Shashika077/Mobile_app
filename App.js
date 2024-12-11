import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const isOperator = (char) => ['+', '-', '*', '/'].includes(char);

  const handleButtonPress = (value) => {
    if (isOperator(value) && input === '') return;
    if (isOperator(value) && isOperator(input.slice(-1))) {
      setInput((prev) => prev.slice(0, -1) + value);
      return;
    }
    if (value === '.') {
      const lastNumber = input.split(/[\+\-\*\/]/).pop();
      if (lastNumber.includes('.')) return;
    }
    setInput((prev) => prev + value);
  };

  const handleClearPress = () => {
    setInput('');
    setResult('');
  };

  const handleBackspace = () => setInput((prev) => prev.slice(0, -1));

  const handleEqualPress = () => {
    if (/\/0(?![.\d])/g.test(input)) {
      setResult('Error');
      return;
    }
    try {
      const sanitizedInput = input.replace(/(\d+)(?=\d)/g, (match) => match.replace(/^0+/, ''));
      const finalInput = sanitizedInput.replace(/(\d+)%/g, "($1/100)");
      const evaluatedResult = eval(finalInput).toString();
      setResult(evaluatedResult);
    } catch {
      setResult('Error');
    }
  };

  const handlePiPress = () => {
    if (input === '' || isOperator(input.slice(-1))) {
      setInput((prev) => prev + Math.PI.toFixed(5));
    }
  };

  const renderButton = (label, onPressHandler, style = {}) => (
    <TouchableOpacity style={[styles.button, style]} onPress={onPressHandler}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.input} numberOfLines={1} adjustsFontSizeToFit ellipsizeMode="tail">
        {input || '0'}
      </Text>
      {result !== '' && (
        <Text style={styles.result} numberOfLines={1} adjustsFontSizeToFit ellipsizeMode="tail">
          = {result}
        </Text>
      )}
      <View style={styles.buttonContainer}>
        {renderButton('C', handleClearPress, styles.operatorButton)}
        {renderButton('⌫', handleBackspace, styles.operatorButton)}
        {renderButton('%', () => handleButtonPress('%'), styles.operatorButton)}
        {renderButton('/', () => handleButtonPress('/'), styles.operatorButton)}

        {renderButton('7', () => handleButtonPress('7'))}
        {renderButton('8', () => handleButtonPress('8'))}
        {renderButton('9', () => handleButtonPress('9'))}
        {renderButton('*', () => handleButtonPress('*'), styles.operatorButton)}

        {renderButton('4', () => handleButtonPress('4'))}
        {renderButton('5', () => handleButtonPress('5'))}
        {renderButton('6', () => handleButtonPress('6'))}
        {renderButton('-', () => handleButtonPress('-'), styles.operatorButton)}

        {renderButton('1', () => handleButtonPress('1'))}
        {renderButton('2', () => handleButtonPress('2'))}
        {renderButton('3', () => handleButtonPress('3'))}
        {renderButton('+', () => handleButtonPress('+'), styles.operatorButton)}

        <View style={styles.lastRow}>
          {renderButton('0', () => handleButtonPress('0'))}
          {renderButton('.', () => handleButtonPress('.'))}
          {renderButton('π', handlePiPress)}
          {renderButton('=', handleEqualPress, styles.equalsButton)}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#000', // Black background
    padding: 10,
  },
  input: {
    fontSize: 40,
    color: '#fff',
    alignSelf: 'flex-end',
    marginRight: 10,
    maxWidth: '95%',
    marginBottom: 10,
  },
  result: {
    fontSize: 30,
    color: '#888',
    alignSelf: 'flex-end',
    marginRight: 10,
    marginBottom: 20,
    maxWidth: '95%',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  lastRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    width: '22%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    margin: 5,
    borderRadius: 40,
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '600',
  },
  operatorButton: {
    backgroundColor: '#ff3b30',
  },
  equalsButton: {
    backgroundColor: 'blue',
  },
});
