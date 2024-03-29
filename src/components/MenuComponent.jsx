import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseURL } from '../shared/baseUrl';

function RenderMenuItem({ dish }) {
  return (
    <Card>
      <Link to={`/menu/${dish.id}`}>
        <CardImg
          className="menuCardImg"
          width="100%" src={baseURL + dish.image} alt={dish.name} />
        <CardImgOverlay>
          <CardTitle>{dish.name}</CardTitle>
        </CardImgOverlay>
      </Link>
    </Card>);
}


const Menu = (props) => {

  const { dishes } = props;

  const menu = dishes.dishes.map((dish) => {
    return (
      <div key={dish.id} className="col-12 col-md-5 m-2">
        <RenderMenuItem dish={dish} />
      </div>
    );
  });

  if (dishes.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (dishes.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{dishes.errMess}</h4>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to='/home'>Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Menu</BreadcrumbItem>
          </Breadcrumb>

          <div className="col-12">
            <h3>Menu</h3>
            <hr />
          </div>

        </div>
        <div className="row">
          {menu}
        </div>
      </div>
    );
  }
}


export default Menu;