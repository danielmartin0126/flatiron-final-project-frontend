import React from 'react'
import { Button, Header, Image, Modal, Form, Checkbox} from 'semantic-ui-react'
import {Route, withRouter } from 'react-router-dom';


class CommentModal extends React.Component {
    state = {
        commentContent: ""
    }

    handleCommentChange = (e) => {
        console.log("comment",e.target.value)
        this.setState({
            commentContent: e.target.value
        })
    }

    handleCommentSubmit = (e) => {
        console.log(this.state)
        e.target.reset()
        fetch(`http://localhost:3000/api/v1/comments`,
        {
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({user_id: this.props.currentUser.id, post_id: this.props.currentPost.id, comment:this.state.commentContent})
        })
        .then(r => r.json())
        .then(data => this.setState({
            commentContent: ""
        }, window.location.reload()
        ))
    }

    render() {
        return(
  <Modal trigger={<Button className="ui mini icon button green followButton"><i className="plus icon"></i></Button>}>
    <Modal.Header>Add comment</Modal.Header>
    <Modal.Content>
        <Form className="lol" onSubmit={(e)=>this.handleCommentSubmit(e)}>
            <Form.Field onChange={this.handleCommentChange}> 
                <label></label>
                <Form.TextArea>
                </Form.TextArea>
            </Form.Field>
            <Button type='submit'>Submit</Button>
        </Form>
    </Modal.Content>
  </Modal>
        )}

}


export default withRouter(CommentModal);
