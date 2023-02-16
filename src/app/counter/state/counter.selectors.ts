import { createFeature, createFeatureSelector, createSelector } from "@ngrx/store";
import { CounterState } from "./counter.state";


export const COUNTER_SELECTOR_NAME = 'counter'
const getCounterState = createFeatureSelector<CounterState>(COUNTER_SELECTOR_NAME);

export const getCounter = createSelector(getCounterState, state => {
    return state.counter;
})

export const getChannelText = createSelector(getCounterState, state => {
    return state.channelName;
})