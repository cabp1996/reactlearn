import * as ActionTypes from './ActionTypes';
import { DISHES } from '../shared/dishes';


//una accion es simplemente un objeto JS, que necesita la accion que se va realizar y el payload
//esta accion junto con el old state van el reducer y crean el nuevo state
export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId,
        rating,
        author,
        comment
    }
});


/*ACTION CREATORS*/

//ESTO ES A THUNK QUE DESPACHA A LLAMA VARIAS ACCIONES
export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    setTimeout(() => {
        dispatch(addDishes(DISHES));
    }, 2000);
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