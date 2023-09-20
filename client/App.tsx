import React from "react";

const App: React.FC = () => {
  const result = window.fetch('/api/name').then(result => {
    result.json().then(value => {
      console.log(value)
    })
  })
  return <h1>TypeScript is awesome!</h1>;
};

export default App;