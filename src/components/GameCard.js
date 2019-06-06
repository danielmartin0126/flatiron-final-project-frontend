import React from 'react';
import { Header, Icon } from 'semantic-ui-react'


class GamesCard extends React.Component {

    totalFollowers = () => {
        let count = this.props.followers.filter(follower => follower.game_id == this.props.game.id)
        console.log("yahoo",count)
        return count.length
    }

    render() {
       return(
          
               <div>
                   {console.log("props",this.props)}
               <div className="ui card">
                <div className="image">
                    <img src={`https://steamcdn-a.akamaihd.net/steam/apps/${this.props.game.app_id}/header.jpg`} />
                </div>
                <div className="content">
                    <a className="header">{this.props.game.name}</a>
                    <div className="meta">
                        <span className="date">Joined in 2013</span>
                    </div>
                    <div className="description">
                        {this.props.game.desc}
                    </div>
                </div>
                <div className="extra content">
                    <a>
                        <i className="user icon"></i>
                        {this.totalFollowers()} Followers
                    </a>
                </div>
                    </div>
               </div> 
       )
    }




}
export default GamesCard;
