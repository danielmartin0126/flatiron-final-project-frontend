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
import Profile from './components/Profile';
import {Link} from 'react-router-dom';
import UserProfile from './components/UserProfile';



class App extends React.Component {
  state = {
    currentUser: null,
    games: [],
    currentGame: null,
    followers: [],
    posts: [],
    users: [],
    comments: [],
    friends: []
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
      fetch(`http://localhost:3000/api/v1/friends`)
      .then(r => r.json())
      .then(data => {
        this.setState({
            friends: data
        })
      })
  }

  handleLogIn = (user) => {
    localStorage.setItem("token", user.token)
    this.setState({currentUser:user})
    this.props.history.push("/")
  }

  handleLogOut = () => {
    localStorage.removeItem("token")
    this.setState({currentUser:null})
  }

  handleGameFollower = (game) => {
    console.log("follow update")
    this.setState({
      followers: [...this.state.followers, {game_id: game.id}]

    })
  }

  handleFriendReq = (friendship) => {
    console.log("friend update",friendship)
    this.setState({
      friends: [...this.state.friends, {user_id: friendship.user_id, friend_id: friendship.friend_id}]

    })
  }

  handleDeleteFollower = (follow) => {
    console.log("remove follow")
    let followers = this.state.followers
    followers.splice(-1,1)
    this.setState({
      followers: [this.state.followers.length - 1]
    })
  }

  render (){
      {console.log("app is rendering", this.state)}
    return (<>
      {this.state.posts.length ? <div className="App">
      <Navbar currentUser={this.state.currentUser} handleLogOut={this.handleLogOut}/>
      <Route exact path="/" render={()=> <Home currentUser={this.state.currentUser}/>}/>
      <Route exact path="/games" render={()=><GamesContainer games={this.state.games} currentUser={this.state.currentUser} followers={this.state.followers} handleDeleteFollower={this.handleDeleteFollower} handleGameFollower={this.handleGameFollower}/>}/>
      <Route path="/games/:id" render={()=><Game followers={this.state.followers} currentUser={this.state.currentUser} posts={this.state.posts} users={this.state.users}/>}/>
      <Route exact path="/login" render={()=> <Login handleLogIn={this.handleLogIn} currentUser={this.state.currentUser}/>}/>
      <Route path="/posts/:id" render ={()=> <Post currentUser={this.state.currentUser} posts={this.state.posts} users={this.state.users} comments={this.state.comments}/>}/>
      <Route exact path="/profile" render={()=> <Profile currentUser={this.state.currentUser} followers={this.state.followers} posts={this.state.posts} games={this.state.games} users={this.state.users}/>}/>
      <Route path="/profile/:id" render={()=> <UserProfile currentUser={this.state.currentUser} handleFriendReq={this.handleFriendReq} friends={this.state.friends} followers={this.state.followers} posts={this.state.posts} games={this.state.games} users={this.state.users}/>}/>

    </div>:null}
    </>
    )
  }
}

export default withRouter(App);
