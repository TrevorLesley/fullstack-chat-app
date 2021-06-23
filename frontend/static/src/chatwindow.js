import { Component } from 'react';
import ChatSubmit from './chatsubmit';
import Cookies from 'js-cookie';

class ChatWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: [],
            isEditing: null,
            edit: '',
        }
        this.inputMessage = this.inputMessage.bind(this);
    }
      
    inputMessage(message) {
        const options = {
          method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': Cookies.get('csrftoken'),
          },
            
          body: JSON.stringify(message),
        }
    
        fetch('/api/v1/chat/', options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not okay');
                }

                return response.json();
            })
            .then(data => this.setState({ message: [...this.state.message, data] }));
    }

    removeMessage(id) {
        const options = {
            method: 'DELETE',
        }

        fetch(`api/v1/chat/${id}/`, options)
          .then(response => {
        const message = [...this.state.message];
        const index = message.findIndex(message => message.id === id);
        message.splice(index, 1);
        this.setState({ message });
      })
    }

    editmessage(id) {
        const options = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
          },
          body: JSON.stringify(message),
        }
    
        fetch(`/api/v1/chat/${id}/`, options)
          .then(response => response.json())
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
                {this.state.isEditing === message.id ? <button type="button" onClick={() => this.handleEdit(message.id)}>SAVE</button> : <button type="button" onClick={() => this.setState({ isEditing: message.id})}>EDIT</button>}
                <button type='button' onClick={() => this.deleteMessage(message.id)}>Delete</button>
          </li>
        ))
    
        return(
          <>
          <div className="chat-log container">
            <h1>Chat App</h1>
                <ul>{message}</ul>
                <section className="main">
                        <ChatSubmit inputMessage={this.inputMessage}/>
                    </section>
                </div>
                
                <button type='button' onClick={this.props.handleLogout}>Log Out</button>
          </>
        )
      }
}

export default ChatWindow