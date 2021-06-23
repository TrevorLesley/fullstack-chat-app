import { Component } from 'react';
import './App.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(event) {
        this.setState({[event.target.name]: event.target.value});
    }
    
    handleSubmit(event) {
        event.preventDefault();
        this.props.handleLogin(this.state);
    }
    
    render() {

        return (
        <form onSubmit={this.handleSubmit}>
            <div class="mb-3">
            <label htmlFor="username" id="username" class="form-label">Username</label>
            <input type="text" class="form-control" id="username" name='username' onChange={this.handleInput}>
            </input>
        </div>
        <div class="mb-3">
        <label htmlFor="email" class="form-label">Email address</label>
        <input type="text" class="form-control" name='email' id="email" onChange={this.handleInput}>
        </input>
        </div>
        <div class="mb-3">
            <label htmlFor="password1" class="form-label">Password</label>
            <input type="password" class="form-control" name='password' id="password1" onChange={this.handleInput}>
            </input>
            </div>   
                <button type="button" className="btn btn-link" onClick={() => this.props.handleForm('signup')}>Don't have an account? Sign up!</button>
                <button type="button" class="btn btn-primary" onClick={() => this.props.handleForm('chat')}>Login</button>

        </form>
        )}
}

export default Login