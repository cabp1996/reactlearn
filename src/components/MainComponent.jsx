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
import { addComment } from '../redux/ActionCreators';

const mapStateToProps = state => { //es el state del redux store
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    };
}

const mapDispatchToProps = (dispatch) => ({
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment))
});

class Main extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {

        const HomePage = () => {
            return (<Home
                dish={this.props.dishes.filter((dish) => dish.featured)[0]}
                promotion={this.props.promotions.filter((promotion) => promotion.featured)[0]}
                leader={this.props.leaders.filter((leader) => leader.featured)[0]}
            />);
        }

        const DishWithId = ({ match }) => {
            return (
                <DishDetail
                    dish={this.props.dishes.find((dish) => dish.id === parseInt(match.params.dishId, 10))}
                    comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
                    addComment={this.props.addComment}
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
                    <Route exact path="/contactus" component={Contact} />
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


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main)); //se conecta el componente con el react router