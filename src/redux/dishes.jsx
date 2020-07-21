import {DISHES} from '../shared/dishes';

//esto es un reducer
export const Dishes=(state=DISHES,action)=>{
    switch(action.type){
        default:
            return state;
    }
}