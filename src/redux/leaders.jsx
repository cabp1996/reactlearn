import {LEADERS} from '../shared/leaders';

//esto es un reducer
export const Leaders=(state=LEADERS,action)=>{
    switch(action.type){
        default:
            return state;
    }
}