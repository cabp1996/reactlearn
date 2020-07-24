import * as ActionTypes from './ActionTypes';
import { baseURL } from '../shared/baseUrl';

//una accion es simplemente un objeto JS, que necesita la accion que se va realizar y el payload
//esta accion junto con el old state van el reducer y crean el nuevo state
export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {

    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }

    newComment.date = new Date().toISOString();

    return fetch(baseURL + 'comments',
        {
            method: 'POST',
            body: JSON.stringify(newComment),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        }).then(
            (response) => {
                if (response.ok) {
                    return response;
                } else {
                    let error = new Error('Error ' + response.status + ':' + response.statusText);
                    error.response = response;
                    throw error;// con esto le mando al catch
                }
            },
            (error) => {//si hay error en la comunicacion
                let errmess = new Error(error.message);
                throw errmess; //mando al catch
            }
        )
        .then(response => response.json())
        .then(comment => dispatch(addComment(comment)))//tomo el json
        .catch(
            error => {
                console.log('Post comments', error.message)
                alert('Tu comentario no pudo ser agregado\nError: ' + error.message)
            }
        );

};


/*ACTION CREATORS*/

//ESTO ES A THUNK QUE DESPACHA A LLAMA VARIAS ACCIONES
export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    return fetch(baseURL + 'dishes')
        .then(
            (response) => {
                if (response.ok) {
                    return response;
                } else {
                    let error = new Error('Error ' + response.status + ':' + response.statusText);
                    error.response = response;
                    throw error;// con esto le mando al catch
                }
            },
            (error) => {//si hay error en la comunicacion
                let errmess = new Error(error.message);
                throw errmess; //mando al catch
            })
        .then(response => response.json())//1ero convierto la respuesta a json
        .then(dishes => dispatch(addDishes(dishes)))//tomo el json
        .catch(
            error => dispatch(dishesFailed(error))
        );
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});


export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});


/*COMMENTS*/
export const fetchComments = () => (dispatch) => {
    return fetch(baseURL + 'comments')
        .then(
            (response) => {
                if (response.ok) {
                    return response;
                } else {
                    let error = new Error('Error ' + response.status + ':' + response.statusText);
                    error.response = response;
                    throw error;// con esto le mando al catch
                }
            },
            (error) => {//si hay error en la comunicacion
                let errmess = new Error(error.message);
                throw errmess; //mando al catch
            })
        .then(response => response.json())//1ero convierto la respuesta a json
        .then(comments => dispatch(addComments(comments)))//tomo el json
        .catch(
            error => dispatch(commentsFailed(error))
        );
}


export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});


export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});



/*PROMOS*/
export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true));
    return fetch(baseURL + 'promotions')
        .then(
            (response) => {
                if (response.ok) {
                    return response;
                } else {
                    let error = new Error('Error ' + response.status + ':' + response.statusText);
                    error.response = response;
                    throw error;// con esto le mando al catch
                }
            },
            (error) => {//si hay error en la comunicacion
                let errmess = new Error(error.message);
                throw errmess; //mando al catch
            })

        .then(response => response.json())//1ero convierto la respuesta a json
        .then(promos => dispatch(addPromos(promos)))//tomo el json
        .catch(
            error => dispatch(promosFailed(error))
        );
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});


export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});