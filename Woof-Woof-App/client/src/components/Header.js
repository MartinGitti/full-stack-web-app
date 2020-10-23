import React from 'react';// react library.
import logo from '../images/barking.png';// Import image.
import '../stylesheets/style.css';// custom Style Sheet.

//Header Component:
function Header() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>Woof Woof Barker <span role='img' aria-label="dog">🐕</span></h1>
            </header>
        </div>
    )
}

export default Header
