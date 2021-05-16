import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media } from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseURL } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import { Loading } from './LoadingComponent';

function RenderLeader({ leader, isLoading, errMess }) {

    if (isLoading) {
        return <Loading />
    } else if (errMess) {
        return <h4>errMess</h4>
    } else {
        return (
            <Fade in>
                <Media tag="li" className="mt-4">
                    <Media left middle>
                        <Media object src={baseURL + leader.image} alt={leader.name} />
                    </Media>
                    <Media body className="ml-5">
                        <Media heading>{leader.name}</Media>
                        <h6>{leader.designation}</h6>
                        <p>{leader.description}</p>
                    </Media>
                </Media>
            </Fade>
        );
    }

}

function RenderLeaders({ leaders, isLoading, errMess }) {


    const leadersAux = leaders.map((leader) => {
        return (
            <RenderLeader leader={leader} key={leader.id} />
        );
    });

    if (isLoading) {
        return <Loading />;
    } else if (errMess) {
        return <h4>{errMess}</h4>;
    } else
        return (
            <Stagger in>
                {leaders.map(leader => (
                    <Fade in key={leader.id}>
                        {leadersAux}
                    </Fade>
                ))}
            </Stagger>
        );
}


function About(props) {


    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>About Us</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>About Us</h3>
                    <hr />
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12 col-md-6">
                    <h2>Our History</h2>
                    <p>Founded in 2015,this idea was established itself as a culinary icon gathering international flavors fusion with local flavors. Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.</p>
                    <p>We gather American, Mexican, Indian, Chinese cuisine.</p>
                </div>
                <div className="col-12 col-md-5 mt-5">
                    <Card>
                        <CardHeader className="bg-primary text-white">More information</CardHeader>
                        <CardBody>
                            <dl className="row p-1">
                                <dt className="col-6">Started</dt>
                                <dd className="col-6">15 Feb. 2015</dd>

                                <dt className="col-6">Most ordered food</dt>
                                <dd className="col-6">American and Mexican</dd>
                                <dt className="col-6">Employees</dt>
                                <dd className="col-6">35</dd>
                            </dl>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12">
                    <Card>
                        <CardBody className="bg-faded">
                            <blockquote className="blockquote">
                                <p className="mb-0">Anyone can cook but this proves not anyone can do it at this level. It was a plasure!</p>
                                <footer className="blockquote-footer">Santiago Sarmiento,
                                <cite title="Source Title">Experienced chef,
                                    2016</cite>
                                </footer>
                            </blockquote>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                    <h2>Corporate Leadership</h2>
                </div>
                <div className="col-12">
                    <Media list>
                        <RenderLeaders
                            leaders={props.leaders}
                            isLoading={props.isLoading}
                            errMess={props.ErrMess}
                        />
                    </Media>


                </div>
            </div>
        </div>
    );
}

export default About;    