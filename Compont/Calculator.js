import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Calculator = () => {
  const [input, setInput] = useState(''); // stores user input (expression)
  const [result, setResult] = useState(''); // stores evaluated result
  const [error, setError] = useState(''); // stores error message

  // Handle button press to append the value
  const handleButtonPress = (value) => {
    // If the error is shown, reset input and error
    if (error) {
      setInput(value);
      setError('');
    } else {
      setInput(prevInput => prevInput + value);
    }
  };

  // Handle clear button to reset input
  const handleClear = () => {
    setInput('');
    setResult('');
    setError('');
  };

  // Handle backspace to remove last character
  const handleBackspace = () => {
    setInput(prevInput => prevInput.slice(0, -1)); // Remove the last character
  };

  // Handle evaluating the expression when "=" is pressed
  const handleEvaluate = () => {
    try {
      // Check for division by zero
      if (input.includes('/0')) {
        throw new Error('Cannot divide by zero');
      }

      // Evaluate the expression
      const evaluatedResult = evaluateExpression(input);
      
      // Show result or error
      if (evaluatedResult === 'Error') {
        setError('Invalid Expression');
        setResult('');
      } else {
        setResult(evaluatedResult.toString());
      }
    } catch (e) {
      setError(e.message || 'Error');
      setResult('');
    }
  };

  // Custom function to evaluate the mathematical expression
  const evaluateExpression = (expr) => {
    try {
      // Replace any invalid characters (e.g., letters)
      expr = expr.replace(/[^0-9+\-*/().]/g, '');
      
      // Manually handle parentheses and operators
      let result = new Function('return ' + expr)();
      
      if (isNaN(result)) {
        return 'Error';
      }

      return result;
    } catch (e) {
      return 'Error';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        {/* Display the current expression */}
        <Text style={styles.displayText}>{input || '0'}</Text>
        
        {/* If there's an evaluated result, show it */}
        {result && <Text style={styles.resultText}> = {result}</Text>} 

        {/* If there's an error, show it */}
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
      
      <View style={styles.buttonContainer}>
        {/* Row of buttons */}
        <View style={styles.row}>
          <Button label="7" onPress={() => handleButtonPress('7')} />
          <Button label="8" onPress={() => handleButtonPress('8')} />
          <Button label="9" onPress={() => handleButtonPress('9')} />
          <Button label="/" onPress={() => handleButtonPress('/')} />
        </View>
        <View style={styles.row}>
          <Button label="4" onPress={() => handleButtonPress('4')} />
          <Button label="5" onPress={() => handleButtonPress('5')} />
          <Button label="6" onPress={() => handleButtonPress('6')} />
          <Button label="*" onPress={() => handleButtonPress('*')} />
        </View>
        <View style={styles.row}>
          <Button label="1" onPress={() => handleButtonPress('1')} />
          <Button label="2" onPress={() => handleButtonPress('2')} />
          <Button label="3" onPress={() => handleButtonPress('3')} />
          <Button label="-" onPress={() => handleButtonPress('-')} />
        </View>
        <View style={styles.row}>
          <Button label="0" onPress={() => handleButtonPress('0')} />
          <Button label="C" onPress={handleClear} />
          <Button label="=" onPress={handleEvaluate} />
          <Button label="+" onPress={() => handleButtonPress('+')} />
        </View>
        <View style={styles.row}>
          <Button label="⌫" onPress={handleBackspace} />
          <Button label="(" onPress={() => handleButtonPress('(')} />
          <Button label=")" onPress={() => handleButtonPress(')')} />
          <Button label="." onPress={() => handleButtonPress('.')} />
        </View>
      </View>
    </View>
  );
};

// Button Component
const Button = ({ label, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  display: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '100%',
    padding: 20,
  },
  displayText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#000',
  },
  resultText: {
    fontSize: 36,
    color: '#888',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  buttonContainer: {
    width: '80%',
    paddingBottom: 40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#f0f0f0',
    borderRadius: 50,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 30,
    color: '#000',
  },
});

export default Calculator;
