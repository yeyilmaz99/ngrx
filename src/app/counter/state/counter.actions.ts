import { createAction, props } from "@ngrx/store";

export const increment = createAction('increment');
export const decrement = createAction('decrement0');
export const reset = createAction('reset');


export const customIncrement = createAction('customincrement', props<{value:number}>());

export const changeText = createAction('changeText');
