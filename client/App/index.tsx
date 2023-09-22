import React from 'react'
// import './styles.scss'

const App: React.FC = () => {
  const handleClick = () => {
    window.fetch('/api/name').then(result => {
      result.json().then(value => {
        console.log(value)
      })
    })
  }
  return (
    <div className="body">
      <img src="/assets/images/logo.png" alt="logo" />
      <h1>TypeScript is awesome!!</h1>
      <div>
        <input type="button" value="Get Name" onClick={handleClick} />
      </div>
    </div>
  )
}

export default App
