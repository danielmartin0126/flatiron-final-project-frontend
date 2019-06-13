import React from 'react'
import { Button, Header, Image, Modal, Form, Checkbox} from 'semantic-ui-react'
import {Route, withRouter } from 'react-router-dom';


class PostModal extends React.Component {
    state = {
        isOpen: false,
        postTitle: "",
        postBody: ""
    }

    handleTitleChange = (e) => {
        console.log("title",e.target.value)
        this.setState({
            postTitle: e.target.value
        })
    }

    handlePostChange = (e) => {
        console.log("body",e.target.value)
        this.setState({
            postBody: e.target.value
        })
    }

    handlePostSubmit = (e) => {
        console.log(this.state)
        e.preventDefault()
        fetch(`http://localhost:3000/api/v1/posts`,
        {
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({poster_id: this.props.currentUser, game_id: this.props.currentGame.id, title: this.state.postTitle, content:this.state.postBody})
        })
        .then(r => r.json())
        .then(data => this.props.history.push(`/posts/${data.id}`))
    }

    handleOpen = () => {
        this.setState({isOpen: true})
      }
    
    handleClose = () => {
        this.setState({isOpen: false})
      } 


    render() {
        return(
  <Modal trigger={<Button className="ui mini icon button green followButton"><i className="plus icon"></i></Button>} open={this.state.isOpen} onOpen={this.handleOpen} onClose={this.handleClose}>
      {this.props.onOpen}
    <Modal.Header>Create a post</Modal.Header>
    <Modal.Content>
        <Form className="lol" onSubmit={(e)=>this.handlePostSubmit(e)}>
            <Form.Field onChange={this.handleTitleChange}>
                <label>Title</label>
                <input />
            </Form.Field>
            <Form.Field onChange={this.handlePostChange}> 
                <label>Post</label>
                <Form.TextArea>
                </Form.TextArea>
            </Form.Field>
            <Button type='submit'>Submit</Button>
        </Form>
    </Modal.Content>
  </Modal>
        )}

}


export default withRouter(PostModal);
