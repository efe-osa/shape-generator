import React from 'react'
import logo from './logo.svg'
import ShapeQueryForm from 'components/ShapeQueryForm'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 data-testid="app-header">Generate A Shape</h1>
      </header>
      <main>
        <ShapeQueryForm />
      </main>
    </div>
  )
}

export default App
