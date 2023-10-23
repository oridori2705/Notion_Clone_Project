import { currentComponent } from "@/core";
import { render } from "@/index";

interface SetState<T> {
  (value: T | ((previousState: T) => T)): void;
}

const useState = (() => {
  const componentsState: Record<string, unknown[]> = {};

  return function <T>(initialValue: T): [T, SetState<T>] {
    if (!currentComponent) {
      throw new Error("useState는 컴포넌트 안에서만 호출될 수 있습니다.");
    }

    const { id, stateIndex } = currentComponent;

    if (!componentsState[id]) {
      componentsState[id] = [];
    }

    if (componentsState[id][stateIndex] === undefined) {
      componentsState[id][stateIndex] = initialValue;
    }

    const setState: SetState<T> = (newValue) => {
      const currentState = componentsState[id][stateIndex] as T;

      componentsState[id][stateIndex] =
        typeof newValue === "function" ? (newValue as (previousValue: T) => T)(currentState) : newValue;

      render();
    };

    const stateValue = componentsState[id][stateIndex] as T;

    currentComponent.stateIndex += 1;

    return [stateValue, setState];
  };
})();

export default useState;