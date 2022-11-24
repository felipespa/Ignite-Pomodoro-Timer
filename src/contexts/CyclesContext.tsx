import { differenceInSeconds } from "date-fns";
import { createContext, ReactNode, useState, useReducer, useEffect } from "react";
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/Cycles/actions";
import { Cycle, cyclesReducer } from "../reducers/Cycles/reducers";

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface CyclesContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleID: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
  interruptCurrentCycle: () => void;
}

interface CycleContextProviderProps {
  children: ReactNode;
}

export const CyclesContext = createContext({} as CyclesContextType);

export function CyclesContextProvider({ children }: CycleContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, { cycles: [], activeCycleID: null }, () => {
    const storedStateJSON = localStorage.getItem("@pomodoro-time:cyclesState-1.0.0");

    if (storedStateJSON) return JSON.parse(storedStateJSON);

    return { cycles: [], activeCycleID: null };
  });

  const { cycles, activeCycleID } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleID);

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) return differenceInSeconds(new Date(), new Date(activeCycle.startDate));

    return 0;
  });

  useEffect(() => {
    const stateJson = JSON.stringify(cyclesState);
    localStorage.setItem("@pomodoro-time:cyclesState-1.0.0", stateJson);
  }, [cyclesState]);

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction());
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  function createNewCycle(data: CreateCycleData) {
    const newCycle: Cycle = {
      id: new Date().getTime().toString(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    dispatch(addNewCycleAction(newCycle));
    setAmountSecondsPassed(0);
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction());
  }

  return (
    <CyclesContext.Provider
      value={{ cycles, activeCycle, activeCycleID, markCurrentCycleAsFinished, amountSecondsPassed, setSecondsPassed, createNewCycle, interruptCurrentCycle }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
