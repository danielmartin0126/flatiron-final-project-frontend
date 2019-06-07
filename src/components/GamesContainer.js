import React from 'react';
import { Header, Icon } from 'semantic-ui-react'
import GameCard from './GameCard';
import {Route, withRouter } from 'react-router-dom'
import {Link} from 'react-router-dom';



class GamesContainer extends React.Component {


   

    render(){

       return(
           <div>
               <h1>Popular Games</h1>
               <div className="ui grid gameContainer">
                   {this.props.games.map(game => <GameCard game={game} followers={this.props.followers}/>)}
               </div>
            </div>
       )
    }




}
export default withRouter(GamesContainer);
