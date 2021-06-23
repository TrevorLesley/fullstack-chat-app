import { Component } from 'react';
import Cookies from 'js-cookie';


class ChatSubmit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
        }

        this.inputMessage = this.inputMessage.bind(this);
        this.handleInput = this.handleInput.bind(this);
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
          .then(data => {
            const message = [...this.state.message];
            message.push(data);
            this.setState({ message });
          });
    }
    
    render() {

        return (
        <form onSubmit={this.inputMessage}>
          <input  className="text" type="text" name="text" value={this.state.text} onChange={this.handleInput}/>
          <button className="button" type="submit">Send</button>
        </form>
    )}

}

export default ChatSubmit