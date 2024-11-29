import { memo, useCallback, useContext, useState } from "react";
import {
	Counter1Context,
	Counter2Context,
	Counter3Context,
	type CounterContext,
} from "./contexts";
import { WormholeIn } from "./shared";

const ContextInitialStates = [
	{
		name: "Counter1Context",
		count: 0,
	},
	{
		name: "Counter2Context",
		count: 1,
	},
	{
		name: "Counter3Context",
		count: 2,
	},
] satisfies CounterContext[];

interface CustomerProps {
	onClickCounter1: () => void;
	onClickCounter2: () => void;
	onClickCounter3: () => void;
}
const Customer = memo(function Customer({
	onClickCounter1,
	onClickCounter2,
	onClickCounter3,
}: CustomerProps) {
	const counter1 = useContext(Counter1Context);
	const counter2 = useContext(Counter2Context);
	const counter3 = useContext(Counter3Context);

	return (
		<div>
			<div>
				{counter1.name}: {counter1.count}{" "}
				<button onClick={onClickCounter1} type="button">
					+1
				</button>
			</div>
			<div>
				{counter2.name}: {counter2.count}{" "}
				<button onClick={onClickCounter2} type="button">
					+1
				</button>
			</div>
			<div>
				{counter3.name}: {counter3.count}{" "}
				<button onClick={onClickCounter3} type="button">
					+1
				</button>
			</div>
		</div>
	);
});

const Customer2 = memo(function Customer2() {
	const counter1 = useContext(Counter1Context);
	const counter2 = useContext(Counter2Context);
	const counter3 = useContext(Counter3Context);
	return (
		<div>
			<h3>Custom2</h3>
			<div>
				{counter1.name}: {counter1.count}
			</div>
			<div>
				{counter2.name}: {counter2.count}
			</div>
			<div>
				{counter3.name}: {counter3.count}
			</div>
		</div>
	);
});

export const App1 = memo(() => {
	const [states, setStates] = useState(ContextInitialStates);

	const inc = useCallback((index: number) => {
		setStates((prev) => {
			const next = [...prev];
			next[index] = {
				...next[index],
				count: next[index].count + 1,
			};
			return next;
		});
	}, []);

	return (
		<div className="app2">
			<h2>APP1</h2>
			<Counter1Context.Provider value={states[0]}>
				<Counter2Context.Provider value={states[1]}>
					<Counter3Context.Provider value={states[2]}>
						<WormholeIn>
							<Customer
								onClickCounter1={() => inc(0)}
								onClickCounter2={() => inc(1)}
								onClickCounter3={() => inc(2)}
							/>
							<Customer2 />
						</WormholeIn>
					</Counter3Context.Provider>
				</Counter2Context.Provider>
			</Counter1Context.Provider>
		</div>
	);
});
