import "./index.css";

import { createRoot } from "react-dom/client";
import { App1 } from "./App1";
import { App2 } from "./App2";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const app1 = createRoot(document.getElementById("app1")!);
app1.render(<App1 />);

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const app2 = createRoot(document.getElementById("app2")!);
app2.render(<App2 />);
