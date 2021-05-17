import React from 'react'
import axios from 'axios'

class SecretForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        message: '',
        encryptionType: 'Pig Latin',
        value: ''
    
      };
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
      let name = event.target.name
      console.log(name)
      event.preventDefault()
      this.setState({[name]: event.target.value}, ()=>{
        console.log(this.state[name])
      });
    
      // this.setState({[name]: event.target.value},()=>{
      //   console.log("We have a change",this.state.encryptionType)
      // })
 
    }
  
    handleSubmit(event) {
      let currentTimestamp = Date.now()
      let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(currentTimestamp)
    
      let message = this.state.message
      if(message.length === 0) {
        alert("Message input cannot be empty")
      }
      let encryptionType = this.state.encryptionType
 
      axios.post('http://localhost:3001/secrets/secretMessage', {
        message: message,
        encryptionType: encryptionType,
        createdAt: date
      })
      .then(function (response) {
        console.log(response);
      })
  
    }

    render() {
      return (
        <div className="Form">
        <form onSubmit={this.handleSubmit}>
        <label>
         <h3>
         Enter Message to Encryp 
         </h3>
          <input name ="message" type ="text" value={this.state.message} onChange={this.handleChange}></input>
        </label>
        <div></div>
        <label>
          <h3>Select Encryption Type </h3>
          <select name = "encryptionType" value={this.state.encryptionType} onChange={this.handleChange}>
            <option value="Pig Latin">Pig Latin</option>
            <option value="Emo-gize">Emo-gize</option>
            <option value="Letter-scramble">Letter-scramble</option>
            <option value="Nothing">Nothing</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
        </div>
  
      )
    }
}

export default SecretForm;