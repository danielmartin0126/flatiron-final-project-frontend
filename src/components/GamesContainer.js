import React from 'react';
import { Header, Icon } from 'semantic-ui-react'
import GameCard from './GameCard';



class GamesContainer extends React.Component {

    render(){
       return(
           <div>
               <h1>Popular Games</h1>
               {this.props.games.map(game => <GameCard game={game}/>)}
            </div>
       )
    }




}
export default GamesContainer;
