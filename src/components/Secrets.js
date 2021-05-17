import React from 'react'
import axios from 'axios'
import Secret from './Secret'

class Secrets extends React.Component {
    constructor(props) {
      super(props);
      this.state = {secrets: []};
      this.handleChange = this.handleChange.bind(this)
      this.getPosts = this.getPosts.bind(this)
      this.getPosts = this.getPosts.bind(this)
      this.renderSecrets = this.renderSecrets.bind(this)
      this.handleDelete = this.handleDelete.bind(this)
      this.handleUpdate = this.handleUpdate.bind(this)
    }

    getPosts() {
        axios.get('http://localhost:3001/secrets/getEncryptedMessages').then(resp => {
            this.setState({secrets: resp.data})
            console.log(this.state.secrets)
        })
    }

    componentDidMount() {
        this.getPosts()
    }

    handleChange(event) {
      this.setState({message: event.target.value})
    }

    handleDelete(id) {
      axios.delete(`http://localhost:3001/secrets/${id}`).then(resp=>{
        this.getPosts()
      })
      console.log("delete", id)
    } 

    handleUpdate(updatedMessage,encryptionType,id) {
      // let encryptionType = this.props.secret.encryptionType
      if(updatedMessage.length === 0) {
        alert("Updated Message should not be empty")
      }
      axios.patch(`http://localhost:3001/secrets/${id}`,{
        message: updatedMessage,
        encryptionType: encryptionType
      }).then(resp => {
        console.log(resp.data.encryptedMessage, "encryptedMesssage")
        console.log(resp.data.message,"message")
        this.getPosts()

      })

    }
    //TODO: Have this have a way to display the time
    renderDate(dateString) {
      const date = new Date(dateString)

      return `${date.getMonth()} ${date.getFullYear()} ${date.getHours}`
    }
    
    renderSecrets() {
      let count = 0
      const secrets = this.state.secrets.map((secret,key) =>
        <Secret handleUpdate = {this.handleUpdate} onClick = {this.handleDelete} key = {key} count = {count++} secret = {secret}></Secret>
        );

      return secrets
    }
    

    render() {
      const secreteMessageList = this.renderSecrets()
      return (
        <div>
        <h1>Here are all your Secrets</h1>
        {secreteMessageList}
        </div>
      );
    }
}
export default Secrets;