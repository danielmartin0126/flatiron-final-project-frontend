import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import GamesContainer from './components/GamesContainer';


class App extends React.Component {
  state = {
    currentUser: null,
    games: []
  }


  componentDidMount() {
    fetch('http://localhost:3000/api/v1/games')
      .then(r => r.json())
      .then(data => {
        this.setState({
          games:data
        })
      })
  }

  render (){
    console.log(process.env.REACT_APP_API_KEY)

    return (<div className="App">
      <Navbar />
      <GamesContainer games={this.state.games}/>
    </div>
    )
  }
}

export default App;
