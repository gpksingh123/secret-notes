import React from 'react';
import axios from 'axios'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        Sona: Hello World!
        <Secret></Secret>
      </div>
    );
  }
}

class Secret extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: ''};
    this.handleChange = this.handleChange.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({message: event.target.value})
  }

  handleSubmit(event) {
    axios({
      method: 'get',
      url: 'http://localhost:3001',
      responseType: 'stream'
    })
      .then(function(response) {
        console.log(response)
    });
    alert(this.state.message)

  }

  render() {
    return (
      <div className="Form">
        Input your secret here
        <form onSubmit ={this.handleSubmit}>
          <input type = "text" value={this.state.value} onChange={this.handleChange}></input>
        <input type="submit" value="Submit"/>
         </form>
      </div>

    )
  }
}

export default App;