import React from 'react'
import axios from 'axios'
import ShowMessageButton from './ShowMessageButton'

class Secret extends React.Component {
    constructor(props) {
      super(props);
      this.state = {secrets: [],
        encryptionType: '',
        encryptedMessage: '',
        showMessage: false,
        message: '',
        updatedMessage: ''
      };

      this.renderDate = this.renderDate.bind(this)
      this.handleShowMessage = this.handleShowMessage.bind(this)
      this.handleDelete = this.handleDelete.bind(this)
      this.handleChange = this.handleChange.bind(this)
    }



    //TODO: Have this have a way to display the time
    renderDate(dateString) {
      const date = new Date(dateString)

      return `${date.getMonth()} ${date.getDay()} ${date.getFullYear()} Time   : ${date.getHours()} : ${date.getMinutes()}`

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
    componentDidMount() {
      this.setState({encryptionType: this.props.secret.encryptionType,
        message: this.props.secret.message,
        encryptedMessage: this.props.secret.encryptedMessage
      },()=>console.log(this.state.message))
    }

    handleShowMessage() {
      this.setState({showMessage: true},()=>console.log("Show message button clicked",this.state.showMessage))
    }

    handleDelete(str) {
      this.props.onClick(str)
    }

    render() {
      let decryptedMessage = <span></span>
      let showMessage = this.state.showMessage
      let {updatedMessage, encryptionType} = this.props.secret
      if(showMessage){
        let decryptedMessage = <span>{this.props.secret.message}</span>
      }

      return (
        <div>
           <h3>Secret Message: {this.props.count + 1}</h3>

           <ShowMessageButton onClick={this.handleShowMessage}></ShowMessageButton>
            <div key = {this.props.secret["_id"]}> Encrypted Message: {this.props.secret.encryptedMessage}</div>
   
            {this.state.showMessage && <span> Decrypted Message: {this.props.secret.message}</span>}
            <div>Posted: {this.renderDate(this.props.secret.createdAt)}</div>
              <label>
                Update message:
                <input name ="updatedMessage" type ="text" value = {this.state.updatedMessage} onChange={this.handleChange}></input>
              </label>
      
            <span><button onClick = { () => {this.props.handleUpdate(this.state.updatedMessage, encryptionType, this.props.secret._id)}}>Update</button></span>
            <div>
              <button onClick = { () => {this.props.onClick(this.props.secret["_id"])}}>Delete</button>
            </div>


        </div>
      );
    }
}
export default Secret;
