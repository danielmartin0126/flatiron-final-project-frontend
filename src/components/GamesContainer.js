import React from 'react';
import { Header, Icon } from 'semantic-ui-react'
import GameCard from './GameCard';
import {Route, withRouter } from 'react-router-dom'
import {Link} from 'react-router-dom';
import { Button } from 'semantic-ui-react';




class GamesContainer extends React.Component {

    state = {
        count: 8,
        apiGames: []
    }

    loadMore = () => {
        this.setState({
            count: this.state.count += 8
        })
    }

    fetchAPIGames = () => {
        // if (this.props.searchTerm)
        // fetch(`http://localhost:3000/api/v1/api_games`)
        // .then(r => r.json())
        // .then(data => {
        //     console.log(data)
        //     console.log("filtering api",data["applist"]["apps"]["app"].filter(game => game.name.toLowerCase().includes(this.props.searchTerm.toLowerCase())))
        //     let filtered = data["applist"]["apps"]["app"].filter(game => game.name.toLowerCase().includes(this.props.searchTerm.toLowerCase()))
        //     filtered.map(game=> 
        //         fetch(`http://localhost:3000/api/v1/save/${game.appid}`,
        //         {
        //             headers: {
        //                 "Accept": 'application/json',
        //                 "Content-Type": "application/json"
        //             },
        //             method: "POST",
        //             body: JSON.stringify({app_id: game.appid})
        //         })
        //         .then(r => r.json())
        //         .then(data =>  this.props.handleGamesAdded(data)))
        // })
    }

    renderGames = () => {
      
        if (!this.props.searchTerm.length && this.props.games.length) {
            console.log("in here",this.props.games.slice(0,this.state.count))
            return this.props.games.slice(0,this.state.count).map(game => <GameCard game={game} followers={this.props.followers} games={this.props.games} currentUser={this.props.currentUser} handleDeleteFollower={this.props.handleDeleteFollower} handleGameFollower={this.props.handleGameFollower}/>)
        }
        else {
            console.log("inthere")
            if (this.props.filteredGames.length) {
                return this.props.filteredGames.slice(0,this.state.count).map(game => <GameCard game={game} followers={this.props.followers} games={this.props.games} currentUser={this.props.currentUser} handleDeleteFollower={this.props.handleDeleteFollower} handleGameFollower={this.props.handleGameFollower}/>)
            }
            else {
                return <h2>No results found. Try another search</h2>
            }
        }
    }

    renderAPIGames = () => {
        if (this.state.apiGames.length) {
            return this.state.apiGames.map(game => <GameCard game={game} followers={this.props.followers} games={this.props.games} currentUser={this.props.currentUser} handleDeleteFollower={this.props.handleDeleteFollower} handleGameFollower={this.props.handleGameFollower}/>)
        }
    }

   

   

    render(){

       return(
           <div>
               <h1>Popular Games</h1>
               <div className="ui grid gameContainer">
                   {this.renderGames()}
                   {this.fetchAPIGames()}
                   {this.renderAPIGames()}
               </div>
               <Button className="red loadMore" onClick={this.loadMore}>
                   Load More
               </Button>
            </div>
       )
    }




}
export default withRouter(GamesContainer);
