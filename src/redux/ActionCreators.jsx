import * as ActionTypes from './ActionTypes';


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