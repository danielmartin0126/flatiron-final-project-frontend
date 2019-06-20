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
import Register from './components/Register';



class App extends React.Component {

  state = {
    currentUser: null,
    games: [],
    filteredGames: [],
    searchTerm: "",
    currentGame: null,
    followers: [],
    posts: [],
    users: [],
    comments: [],
    friends: [],
    apiGames: []
  }


  componentDidMount() {
    const token = localStorage.getItem("token")
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
          games: data.sort( () => Math.random() - 0.5)
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

  handleGameSearch = (searchTerm) => {
    if (this.props.location.pathname !== "/games") {
      this.props.history.push("/games")
    }
    let filtered = this.state.games.filter(game => game.name.toLowerCase().includes(searchTerm.toLowerCase()))
    console.log("filtered",filtered)
    this.setState({
      filteredGames: filtered,
      searchTerm: searchTerm
    })
  }

  handleGamesAdded = (game) => {
    console.log('adding to results', game)
    this.setState({
      filteredGames: [...this.state.filteredGames, game]
    })

  }

  render (){
      {console.log("app is rendering", this.state)}
    return (<>
      {this.state.posts.length ? <div className="App">
      <Navbar currentUser={this.state.currentUser} handleLogOut={this.handleLogOut} handleGameSearch={this.handleGameSearch}/>
      <Route exact path="/" render={()=> <Home currentUser={this.state.currentUser}/>}/>
      <Route exact path="/games" render={()=><GamesContainer games={this.state.games} apiGames={this.state.apiGames} handleGamesAdded={this.handleGamesAdded} searchTerm={this.state.searchTerm} filteredGames={this.state.filteredGames} currentUser={this.state.currentUser} followers={this.state.followers} handleDeleteFollower={this.handleDeleteFollower} handleGameFollower={this.handleGameFollower}/>}/>
      <Route path="/games/:id" render={()=><Game followers={this.state.followers} currentUser={this.state.currentUser} handleGameFollower={this.handleGameFollower} games={this.state.games} posts={this.state.posts} users={this.state.users} comments={this.state.comments}/>}/>
      <Route exact path="/login" render={()=> <Login handleLogIn={this.handleLogIn} currentUser={this.state.currentUser}/>}/>
      <Route exact path="/register" render={()=> <Register handleLogIn={this.handleLogIn} currentUser={this.state.currentUser}/>}/>
      <Route path="/posts/:id" render ={()=> <Post currentUser={this.state.currentUser} posts={this.state.posts} users={this.state.users} comments={this.state.comments}/>}/>
      <Route exact path="/profile" render={()=> <Profile currentUser={this.state.currentUser} followers={this.state.followers} posts={this.state.posts} games={this.state.games} comments={this.state.comments} users={this.state.users} friends={this.state.friends}/>}/>
      <Route path="/profile/:id" render={()=> <UserProfile currentUser={this.state.currentUser} handleFriendReq={this.handleFriendReq} friends={this.state.friends} comments={this.state.comments} followers={this.state.followers} posts={this.state.posts} games={this.state.games} users={this.state.users}/>}/>

    </div>:null}
    </>
    )
  }
}

export default withRouter(App);
