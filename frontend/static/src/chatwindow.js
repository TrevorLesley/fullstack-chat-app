import { Component } from 'react';
import ChatSubmit from './chatsubmit';
import Cookies from 'js-cookie';
import MessageDetail from './messagedetail'

class ChatWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        }
      this.inputMessage = this.inputMessage.bind(this);
      this.deleteMessage = this.deleteMessage.bind(this);
      this.fetchData = this.fetchData.bind(this);
    }

    componentWillUnmount() {
      clearInterval(this.retrieveMessages)
    }
  
  fetchData() {
    fetch('/api/v1/chatlog/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => this.setState({ messages: data }));
    }

    deleteMessage(id) {
        const options = {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
          }
        }

        fetch(`api/v1/chat/${id}/`, options)
          .then(response => {
        const message = [...this.state.message];
        const index = message.findIndex(message => message.id === id);
        message.splice(index, 1);
        this.setState({ message });
      })
    }

    componentDidMount() {
        fetch('/api/v1/chat/')
        .then(response => response.json())
        .then(data => this.setState({ message: data }));
      }

    render() {
        const message = this.state.message.map((message) => (
            <MessageDetail deleteMessage={this.props.deleteMessage} />
          
        ))
    
        return(
          <>
          <div className="chat-log container">
            <h1>Chat App</h1>
                <ul>{message}</ul>
                <section className="main">
                        <ChatSubmit key={message.id} message={this.message} />
                    </section>
                </div>
                
                <button type='button' onClick={this.props.handleLogout}>Log Out</button>
          </>
        )
      }
}

export default ChatWindow