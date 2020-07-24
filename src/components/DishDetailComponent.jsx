import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, Button, ModalBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

import { Loading } from './LoadingComponent';
import {baseURL} from '../shared/baseUrl';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      isNavOpen: false,
      isModalOpen: false
    }
  }

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }


  handleSubmit = (values) => {
    alert(JSON.stringify(values));
    this.toggleModal();
    this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
  }

  render() {

    return (
      <React.Fragment>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>

              <div className="form-group">
                <Label htmlFor="rating">Rating</Label>
                <Control.select model=".rating" className="form-control" name="rating">
                  <option selected>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
              </div>

              <div className="form-group">
                <Label htmlFor="yourname">Your Name</Label>

                <Control.text model=".yourname"
                  className="form-control"
                  name="yourname"
                  id="yourname"
                  type="text"
                  placeholder="Your Name"
                  validators={{
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(10)
                  }}
                />

                <Errors
                  className="text-danger"
                  model=".yourname"
                  show="touched"
                  messages={{
                    required: 'Required',
                    minLength: 'Must be greater than 2 characters',
                    maxLength: 'Must be 15 characters or less'
                  }}
                />

              </div>

              <div className="form-group">
                <Label htmlFor="comment">Comment</Label>
                <Control.textarea model=".comment" className="form-control" name="comment" id="comment" type="textarea" placeholder="Comment" rows="6" />
              </div>


              <Button type="submit" color="primary">Submit</Button>

            </LocalForm>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );

  }
}



function RenderComments({ commentsAux, postComment, dishId }) {

  if (commentsAux !== null) {

    const comments = commentsAux.map((comment) => {
      return (
        <div key={comment.id}>

          <ul className="list-unstyled">
            <li>
              {comment.comment}
            </li>
            <li>--{comment.author}, {
              new Intl.DateTimeFormat('en-US',
                { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</li>
          </ul>

        </div>
      );
    });

    return (
      <div className="col-md-5">
        <h4>Comments</h4>
        {comments}

        <CommentForm
          postComment={postComment}
          dishId={dishId}
        />

      </div>

    );

  } else {

    return <div></div>

  }
}


function RenderDish({ dish }) {
  if (dish !== null) {
    const dishElement = <Card>
      <CardImg top width="80%" src={baseURL+dish.image} alt={dish.name} />
      <CardBody>
        <CardTitle>{dish.name}</CardTitle>
        <CardText>
          {dish.description}
        </CardText>
      </CardBody>
    </Card>

    return (
      <div className="col-md-5">
        {dishElement}
      </div>
    );

  } else {

    return <div></div>

  }
}


const DishDetail = (props) => {

  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.dish != null) {
    
    const { dish, comments, postComment } = props;

    return (

      <div className="container">

        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to='/menu'>Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
          </Breadcrumb>

          <div className="col-12">
            <h3>{dish.name}</h3>
            <hr />
          </div>

        </div>

        <div className="row mt-5 mb-5">
          <RenderDish dish={dish} />
          <RenderComments
            commentsAux={comments}
            postComment={postComment}
            dishId={dish.id} />
        </div>
      </div>
    );
  }

}

export default DishDetail;




