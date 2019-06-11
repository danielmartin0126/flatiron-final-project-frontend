import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import {Switch, Route, withRouter } from 'react-router-dom'
import Home from './components/Home'
import GamesContainer from './components/GamesContainer';
import Game from './components/Game';
import Post from './components/Post';
import Login from './components/Login';
import {Link} from 'react-router-dom';



class App extends React.Component {
  state = {
    currentUser: null,
    games: [],
    currentGame: null,
    followers: [],
    posts: [],
    users: [],
    comments: []
  }


  componentDidMount() {
    const token = localStorage.getItem("token")
    console.log(token)
    if (token) {
      fetch("http://localhost:3000/api/v1/current_user", {
        headers: {
          Authenticate: token
        }
         
      })
      .then(r=> r.json())
      .then((user) => {
        if (!user.error) {
          this.setState({currentUser: user})
        }
      })
    }
    fetch('http://localhost:3000/api/v1/games')
      .then(r => r.json())
      .then(data => {
        this.setState({
          games:data
        })
      })
      fetch(`http://localhost:3000/api/v1/followed_games`)
      .then(r => r.json())
      .then(data => {
        this.setState({
            followers: data
        })
      })
      fetch(`http://localhost:3000/api/v1/posts`)
      .then(r => r.json())
      .then(data => {
        this.setState({
            posts: data
        })
      })
      fetch(`http://localhost:3000/api/v1/users`)
      .then(r => r.json())
      .then(data => {
        this.setState({
            users: data
        })
      })
      fetch(`http://localhost:3000/api/v1/comments`)
      .then(r => r.json())
      .then(data => {
        this.setState({
            comments: data
        })
      })
  }

  handleLogIn = (user) => {
    localStorage.setItem("token", user.token)
    this.setState({currentUser:user})
    this.props.history.push("home")

  }

  handleLogOut = () => {
    localStorage.removeItem("token")
    this.setState({currentUser:null})
  }

  handleGameFollower = (game) => {
    this.setState({
      followers: [...this.state.followers, game]

    })

  }

  render (){
    return (<div className="App">
      {console.log("app is rendering", this.state)}
      <Navbar currentUser={this.state.currentUser} handleLogOut={this.handleLogOut}/>
      <Route exact path="/" render={()=> <Home currentUser={this.state.currentUser}/>}/>
      <Route exact path="/games" render={()=><GamesContainer games={this.state.games} currentUser={this.state.currentUser} followers={this.state.followers} handleGameFollower={this.handleGameFollower}/>}/>
      <Route path="/games/:id" render={()=><Game followers={this.state.followers} currentUser={this.state.currentUser} posts={this.state.posts} users={this.state.users}/>}/>
      <Route exact path="/login" render={()=> <Login handleLogIn={this.handleLogIn} currentUser={this.state.currentUser}/>}/>
      <Route path="/posts/:id" render ={()=> <Post currentUser={this.state.currentUser} posts={this.state.posts} users={this.state.users} comments={this.state.comments}/>}/>


    </div>
    )
  }
}

export default withRouter(App);
