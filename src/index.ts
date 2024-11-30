import React, { memo, type PropsWithChildren, useEffect, useRef } from "react";

export type ValueStore = {
  listeners: Array<(values: unknown[]) => void>;
  values: unknown[];
  addListener: (listener: (values: unknown[]) => void) => () => void;
};

type ContextInternal = {
  _currentValue: unknown;
};

export class ReactContextWormhole<T> {
  readonly In: React.ComponentType<PropsWithChildren>;
  readonly Out: React.ComponentType<PropsWithChildren>;
  readonly valueStore: ValueStore;
  private _InWasSet = false;

  constructor(...contexts: React.Context<T>[]) {
    this.valueStore = {
      values: contexts.map(
        (it) => (it as unknown as ContextInternal)._currentValue
      ),
      listeners: [],
      addListener: (listener) => {
        this.valueStore.listeners.push(listener);
        return () => {
          this.valueStore.listeners = this.valueStore.listeners.filter(
            (it) => it !== listener
          );
        };
      },
    };

    this.In = memo<PropsWithChildren>(({ children }) => {
      const inWasSetRef = useRef(this._InWasSet);
      if (inWasSetRef.current) {
        throw new Error("Wormhole.In can only appear in one place.");
      }

      const values = contexts.map((context) => React.useContext(context));
      this.valueStore.values = values;
      for (const listener of this.valueStore.listeners) {
        listener(values);
      }

      this._InWasSet = true;
      useEffect(
        () => () => {
          this._InWasSet = false;
        },
        []
      );

      return children;
    });

    this.Out = memo<PropsWithChildren>(({ children }) => {
      const [values, setValues] = React.useState(this.valueStore.values);
      useEffect(() => {
        return this.valueStore.addListener(setValues);
      }, []);
      return contexts.reduce((acc, context, index) => {
        return React.createElement(
          context.Provider,
          {
            value: values[index] as unknown as T,
          },
          acc
        );
      }, children);
    });
  }
}

export default ReactContextWormhole;
