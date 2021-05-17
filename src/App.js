import React from 'react'
import Secrets from "./components/Secrets"
import SecretForm from "./components/SecretForm"


class App extends React.Component {
  render() {
     return (
      <div>
      <h1>Secrets MVP</h1>
        <SecretForm></SecretForm>
        <Secrets></Secrets>
      </div>
     )

  }
}


export default App;