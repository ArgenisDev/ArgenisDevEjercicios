Para la realización de esta aplicación solo fue necesario realizar 1 Test unitario, el cual fue realizado al archivo App.js 
donde esta todo el código funcional para el funcionamiento de la aplicación.

import 'react-native';
import React from 'react';
import App from '../App';

it('renders correctly', () => {
  renderer.create(<App />).toJSON();
});

Output del Test Unitario:

PASS  __tests__/App-test.js (7.951s)
  ✓ renders correctly (4813ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        8.043s
Ran all test suites.
