import React from 'react';
import Cookies from 'js-cookie';
import ChatWindow from './chatwindow';
import Registration from './register';
import Login from './login';
import './App.css';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: !!Cookies.get('Authorization') ? 'chat' : 'login'
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleForm = this.handleForm.bind(this);
  }

  handleInput(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  async handleLogin(user) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: JSON.stringify(user),
    };

    const handleError = (err) => console.warn(err);
    const response = await fetch('/rest-auth/login/', options);
    const data = await response.json().catch(handleError);

    if (data.key) {
      Cookies.set('Authorization', `Token ${data.key}`);
      this.setState({ selection: 'chat' });
    }

  }

  handleForm(selection) {
    this.setState({selection});
  }

  async handleRegister(user) {

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: JSON.stringify(user),
    };

    const handleError = (err) => console.warn(err);
    const response = await fetch('/rest-auth/registration/', options);
    const data = await response.json().catch(handleError);

    if (data.key) {
      Cookies.set('Authorization', `Token ${data.key}`);
      this.setState({ selection: 'chat' });
    }

  }

  render() {
    return(
      <>
        <div className='background'>
          {this.state.selection === 'login' && <Login handleLogin={this.handleLogin} handleForm={this.handleForm}/>}
          {this.state.selection === 'signup' && <Registration handleRegister={this.handleRegister} handleForm={this.handleForm}/>}
          {this.state.selection === 'chat' && <ChatWindow/>}
        </div>
      </>
    )
  }
}
export default App;