import React from 'react';
import { Header, Icon } from 'semantic-ui-react'
import GameCard from './GameCard';



class GamesContainer extends React.Component {

    state ={
        followers: []
    }



    componentDidMount(){
        fetch(`http://localhost:3000/api/v1/followed_games`)
        .then(r => r.json())
        .then(data => {
          this.setState({
              followers: data
          })
        })
    }

    render(){

       return(
           <div>
               <h1>Popular Games</h1>
               {console.log(this.props,this.state)}
               {this.props.games.map(game => <GameCard game={game} followers={this.state.followers}/>)}
            </div>
       )
    }




}
export default GamesContainer;
