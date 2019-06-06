import React from 'react';
import { Header, Icon } from 'semantic-ui-react'


class GamesCard extends React.Component {

    render(){
       return(
               <div>
               <div class="ui card">
                <div class="image">
                    <img src={`https://steamcdn-a.akamaihd.net/steam/apps/${this.props.game.app_id}/header.jpg`} />
                </div>
                <div class="content">
                    <a class="header">{this.props.game.name}</a>
                    <div class="meta">
                        <span class="date">Joined in 2013</span>
                    </div>
                    <div class="description">
                        Game where you do the thing
                    </div>
                </div>
                <div class="extra content">
                    <a>
                        <i class="user icon"></i>
                        22 Following
                    </a>
                </div>
                    </div>
               </div> 
       )
    }




}
export default GamesCard;
