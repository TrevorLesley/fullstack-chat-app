import { Component } from 'react';
import Cookies from 'js-cookie';

class MessageDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEditing: null,
            message: this.props.messages,
        }
        this.inputMessage = this.inputMessage.bind(this);
        this.editMessage = this.editMessage.bind(this);
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


    editMessage(id) {
        const message = this.props.message;
        this.setState({ isEditing: null });

        const newMessage = {
            message: this.state.edit,
        }

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: JSON.stringify(newMessage),
        }
    
        fetch(`/api/v1/chat/${message.id}/`, options)
            .then(response => {
                const messages = [...this.props.messages];
                const index = message.findIndex(message => message.id === id);
                messages[index].message = message;
                this.setState({ messages })
            })
    }
        

    render() {
        const message = this.props.message;
        return(
          <li className='list'>
            {
                this.state.isEditing
                ? <input type="text" name="message" value={this.state.message}  onChange={this.inputMessage}></input>
                :  <p>{message.message}</p>
              }
      
              {
                this.state.isEditing
                ? <button className ="detail-button" type="button" onClick={this.editMessage}>SAVE</button>
                : message.has_owner_permissions && <button className ="detail-button" type="button" onClick={() => this.setState({ isEditing: true})}>EDIT</button>
            }
             {message.has_owner_permissions && <button className ="detail-button" type="button" onClick={() => this.props.removeMessage(message.id)}>DELETE</button>}
            </li>
          )
        }
    
}

export default MessageDetail;