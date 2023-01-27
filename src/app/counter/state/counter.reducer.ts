import { createReducer, on } from "@ngrx/store"
import { initialState } from "./counter.state"
import { increment, decrement, reset, customIncrement, changeText } from "./counter.actions"
import { state } from "@angular/animations";

const _counterReducer = createReducer(initialState, on(increment, (state:any) =>{
    return {
        ...state,
        counter: state.counter + 1
    };
}), on(decrement, state =>{
    return {
        ...state,
        counter: state.counter -1 
    }
}), on(reset, state =>{
    return {
        ...state,
        counter: 0
    }
}), on(customIncrement, (state, action) => {
    return {
        ...state,
        counter: state.counter + action.value
    }
}), on(changeText, state => {
    return {
        ...state,
        channelName : "modified"
    }
})
)

export function counterReducer(state:any, action:any){
 return _counterReducer(state, action)
}