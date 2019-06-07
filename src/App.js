import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import {Switch, Route, withRouter } from 'react-router-dom'
import Home from './components/Home'
import GamesContainer from './components/GamesContainer';
import Game from './components/Game';
import {Link} from 'react-router-dom';



class App extends React.Component {
  state = {
    currentUser: null,
    games: [],
    currentGame: null,
    followers: []
  }


  componentDidMount() {
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
  }

  render (){
    return (<div className="App">
      <Navbar />
      <Route exact path="/" render={()=> <Home />}/>
      <Route exact path="/games" render={()=><GamesContainer games={this.state.games} followers={this.state.followers}/>}/>
      <Route path="/games/:id" render={()=><Game followers={this.state.followers}/>}/>

    </div>
    )
  }
}

export default withRouter(App);
