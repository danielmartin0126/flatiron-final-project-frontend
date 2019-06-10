import React from 'react';
import { Header, Icon } from 'semantic-ui-react'
import GameCard from './GameCard';
import {Route, withRouter } from 'react-router-dom';
import {Link} from 'react-router-dom';

const initialState = {
    error: false,
    fields: {
        username:'',
        password: ''
    }
}



class Login extends React.Component {
    
    constructor() {
        super();
        this.state = initialState
    }

    handleSubmit = e => {
        e.preventDefault()
        fetch('http://localhost:3000/api/v1/auth', {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(this.state.fields)

        })
        .then(r=>r.json())
        .then(data => {
            if (data.error) {
                this.setState({error: true})
            } else {
                console.log("data", data)
                this.props.handleLogIn(data)
            }
        })
        this.setState({initialState})
    }

    handleChange = e => {
        console.log(e.target.name, e.target.value)
        const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
        this.setState({ fields: newFields });
      };





    render(){
        const { fields } = this.state

       return(
           <div>
               <div className="ui middle aligned center aligned grid">
                <div className="column">
                    <h2 className="ui image header">
                    <div className="content">
                        Log-in to your account
                    </div>
                    </h2>
                    <div className="ui form error">
                            {
                                this.state.error && 
                                <div className="ui error message">
                                    OOF
                                    </div>
                            }
                        </div>
                    <form onSubmit={this.handleSubmit} className="ui large form">
                        <div className="ui stacked secondary  segment">
                            <div className="field">
                            <div className="ui left icon input">
                                <i className="user icon"></i>
                                <input type="text" name="username" placeholder="Username" value={fields.username} onChange={this.handleChange}/>
                            </div>
                            </div>
                            <div className="field">
                            <div className="ui left icon input">
                                <i className="lock icon"></i>
                                <input type="password" name="password" placeholder="Password" value={fields.password} onChange={this.handleChange}/>
                            </div>
                            </div>
                            <button type="submit" className="ui fluid large teal submit button">Login</button>
                        </div>


                    </form>

                    <div className="ui message">
                    Don't have an account? <a href="">Register</a>
                    </div>
                </div>
                </div>
            </div>
       )
    }




}
export default withRouter(Login);
