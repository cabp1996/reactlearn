import React from 'react';

import Home from './HomeComponent';
import DishDetail from './DishDetailComponent';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators';

import { actions } from 'react-redux-form';


const mapStateToProps = state => { //es el state del redux store
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    };
}

const mapDispatchToProps = (dispatch) => ({
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    fetchDishes: () => { dispatch(fetchDishes()) },
    fetchComments: () => { dispatch(fetchComments()) },
    fetchPromos: () => { dispatch(fetchPromos()) },
    resetFeedbackForm: () => { dispatch(actions.reset('feedback')) }
});

class Main extends React.Component {

    constructor(props) {
        super(props);
    }

    //llamado despues de que el componente fue montado, es el mejor momento para hacer fetch de datos
    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
    }

    render() {

        const HomePage = () => {
            return (<Home
                dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                dishesLoading={this.props.dishes.isLoading}
                dishesErrMess={this.props.dishes.errMess}
                promotion={this.props.promotions.promotions.filter((promotion) => promotion.featured)[0]}
                promosLoading={this.props.promotions.isLoading}
                promosErrMess={this.props.promotions.errMess}
                leader={this.props.leaders.filter((leader) => leader.featured)[0]}
            />);
        }

        const DishWithId = ({ match }) => {
            return (
                <DishDetail
                    dish={this.props.dishes.dishes.find((dish) => dish.id === parseInt(match.params.dishId, 10))}
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}
                    comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
                    errMess={this.props.comments.errMess}
                    postComment={this.props.postComment}
                />
            );
        }

        return (
            <div className="App">
                <Header />

                <Switch>
                    <Route path="/home" component={HomePage} />

                    {/*necesito definir asi para enviar props*/}
                    <Route exact path="/menu" component={() =>
                        <Menu
                            dishes={this.props.dishes}
                        />} />
                    <Route path="/menu/:dishId" component={DishWithId} />
                    <Route exact path="/contactus" component={() =>
                        <Contact
                            resetFeedbackForm={this.props.resetFeedbackForm}
                        />} />
                    <Route exact path="/aboutus" component={() =>
                        <About
                            leaders={this.props.leaders} />} />
                    <Redirect to="/home" />

                </Switch>

                <Footer />


            </div>
        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main)); //se conecta el componente con el react router