import { produce } from "immer";

import { ActionTypes } from "./actions";

export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

export interface CyclesState {
  cycles: Cycle[];
  activeCycleID: string | null;
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle);
        draft.activeCycleID = action.payload.newCycle.id;
      });
    case ActionTypes.INTERRUPT_CURRENT_CYCLE:
      return produce(state, (draft) => {
        const currentCycleIndex = state.cycles.findIndex((cycle) => {
          return cycle.id === state.activeCycleID;
        });

        if (currentCycleIndex < 0) return state;

        draft.activeCycleID = null;
        draft.cycles[currentCycleIndex].interruptedDate = new Date();
      });
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
      return produce(state, (draft) => {
        const currentCycleIndex = state.cycles.findIndex((cycle) => {
          return cycle.id === state.activeCycleID;
        });

        if (currentCycleIndex < 0) return state;

        draft.activeCycleID = null;
        draft.cycles[currentCycleIndex].finishedDate = new Date();
      });
    default:
      return state;
  }

  /** Without draft
   *  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleID: action.payload.newCycle.id,
      };
      
    case ActionTypes.INTERRUPT_CURRENT_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleID) {
            return { ...cycle, interruptedDate: new Date() };
          } else return cycle;
        }),
        activeCycleID: null,
      };
      
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleID) {
            return { ...cycle, finishedDate: new Date() };
          } else return cycle;
        }),
        activeCycleID: null,
      };
      
    default:
      return state;
  }
  **/
}
