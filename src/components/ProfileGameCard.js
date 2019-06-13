import React from 'react';
import { Header, Icon } from 'semantic-ui-react';
import {Route, withRouter } from 'react-router-dom';
import {Link} from 'react-router-dom';
import { Button } from 'semantic-ui-react';


class ProfileGameCard extends React.Component {

   
    handleUnfollowClick = (e) => {
        console.log("unfollow", e)
        let follower = this.props.followers.find(follower => follower.game_id == this.props.game.id && this.props.currentUser.id == follower.user_id)
        let followedGame = this.props.games.find(game=> game.id === e)
        console.log("unfollow obj", follower)
        // let user = this.props.currentUser
        //     fetch(`http://localhost:3000/api/v1/followed_games/${follower.id}`,
        //     {
        //         method: "DELETE",
        //     })
    }
    
    renderFollowButton = () => {
        let checkFollow = this.props.followers.filter(follower => follower.game_id == this.props.game.id)
        if (checkFollow.length) {
            return(<button className="mini ui icon button green followButton" onClick={this.handleUnfollowClick}>
                <i className="heart icon"></i>
            </button>)

        } else {
            return (<button className="mini ui icon button green followButton" onClick={()=>this.handleFollowClick(this.props.game.id)}>
                <i className="plus icon"></i>
            </button>)
        }

    }

    render() {
       return(
               <div className="game">

               <div className="ui card">

                <div className="image">
                    <img src={this.props.game ? `https://steamcdn-a.akamaihd.net/steam/apps/${this.props.game.app_id}/header.jpg`: 'https://i.imgur.com/ajXW2td.jpg'}/>
                </div>
                <div className="content">
                    <Link to={this.props.game ? `/games/${this.props.game.id}`: null}>
                        <a className="header">{this.props.game ? this.props.game.name: null}</a>
                    </Link>
                    <div className="meta">
                    </div>
                    <div className="description">
                    </div>
                </div>
                <div className="buttonBar">
                    <div>
                        <Link to={this.props.game ? `/games/${this.props.game.id}`: null}>
                            <button className="ui button inverted green ">
                                View Game
                            </button>
                        </Link>
                    </div>
                    <div>
                        {/* <button className="mini ui icon button green followButton" onClick={this.handleUnfollowClick}>
                            <i className="heart icon"></i>
                        </button> */}
                    </div>

                </div>
                    </div>
               </div> 
       )
    }




}
export default withRouter(ProfileGameCard);
