import { Component } from 'react';


class ChatSubmit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
        }

        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(event) {
        this.setState({[event.target.name]: event.target.value});
      }

      handleSubmit(event) {
          event.preventDefault();
          const message = {
              text: this.state.text,
          };
          this.props.inputMessage(message);

          this.setState({ text: '' });
    }
    
    
    render() {

        return (
        <form onSubmit={this.handleSubmit}>
          <input  className="text" type="text" name="text" value={this.state.text} onChange={this.handleInput}/>
          <button className="button" type="submit">Send</button>
        </form>
    )}

}

export default ChatSubmit