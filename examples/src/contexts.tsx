import React from "react";

export interface CounterContext {
	count: number;
	name: string;
}

export const Counter1Context = React.createContext<CounterContext>({
	count: 0,
	name: "Counter1Context",
});

export const Counter2Context = React.createContext<CounterContext>({
	count: 0,
	name: "Counter2Context",
});

export const Counter3Context = React.createContext<CounterContext>({
	count: 0,
	name: "Counter3Context",
});
