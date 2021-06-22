import React from 'react';
import Cookies from 'js-cookie';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: [],
      text: '',
    }
    this.inputMessage = this.inputMessage.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount(){
    fetch('/api/v1/chat/')
    .then(response => response.json())
    .then(data => this.setState({ message: data }));
  }

  handleInput(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  inputMessage(event) {
    const message = {
      text: this.state.text,
    };

    const options = {
      method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': Cookies.get('csrftoken'),
      },
        
    body: JSON.stringify(message),
    }

    fetch('/api/v1/chat/', options)
      .then(response => response.json())
      .then(data => this.setState(data));
  }
  

  render() {
    const message= this.state.message.map(message => (
      <li key={message.id}>
        <p>{message.text}</p>
      </li>
    ))
    
    return(
      <>
      <div className="chat-log">
        <h1>Online Chat Log</h1>
        <section className="main">
        <form onSubmit={this.inputMessage}>
          <input  className="text" type="text" name="text" value={this.state.text} onChange={this.handleInput}/>
          <button className="button" type="submit">Send</button>
        </form>
        </section>
        <ul>{message}</ul>
        </div>
      </>
    )
  }
}
export default App;