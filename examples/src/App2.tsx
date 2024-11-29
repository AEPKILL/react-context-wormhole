import { memo, useContext } from "react";
import { Counter1Context, Counter2Context, Counter3Context } from "./contexts";
import { WormholeOut } from "./shared";

function Customer() {
	const counter1 = useContext(Counter1Context);
	const counter2 = useContext(Counter2Context);
	const counter3 = useContext(Counter3Context);

	return (
		<div>
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
}

export const App2 = memo(() => {
	return (
		<div className="app2">
			<h2>APP2</h2>
			<WormholeOut>
				<Customer />
			</WormholeOut>
		</div>
	);
});
