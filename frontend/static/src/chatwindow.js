import { Component } from 'react';
import ChatSubmit from './chatsubmit';
import Cookies from 'js-cookie';

class ChatWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: [],
        }
    }
      
    

    componentDidMount() {
        fetch('/api/v1/chat/')
        .then(response => response.json())
        .then(data => this.setState({ message: data }));
      }

    render() {
        const message = this.state.message.map((message) => (
          <li key={message.id}>
            <p>{message.text}</p>
          </li>
        ))
    
        return(
          <>
          <div className="chat-log">
            <h1>Chat App</h1>
                <ul>{message}</ul>
                <section className="main">
                    <ChatSubmit/>
                    </section>
                    <button type='button' onClick={this.props.handleLogout}>Log Out</button>
            </div>
          </>
        )
      }
}

export default ChatWindow