import React from 'react';// React Library.
import '../stylesheets/App.css';// Style Sheet.
// Import Components:
import Header from './Header';

// Display Header Component:
function App() {
  return (
    <div>
      <h1>Welcome to Woof Woof Barker! </h1>
      <Header />
    </div>
  );
}

export default App;
