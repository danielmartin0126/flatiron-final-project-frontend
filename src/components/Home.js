import React from 'react';
import { Header, Icon } from 'semantic-ui-react'
import GameCard from './GameCard';
import {Route, withRouter } from 'react-router-dom';
import {Link} from 'react-router-dom';



class Home extends React.Component {

    state ={
        followers: []
    }





    render(){

       return(
           <div>
               <h1>codename: BEEF FORCE</h1>
            </div>
       )
    }




}
export default withRouter(Home);
