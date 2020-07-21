import {PROMOTIONS} from '../shared/promotions';

//esto es un reducer
export const Promotions=(state=PROMOTIONS,action)=>{
    switch(action.type){
        default:
            return state;
    }
}