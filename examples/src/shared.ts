import { Counter1Context, Counter2Context, Counter3Context } from "./contexts";
import { ReactContextWormhole } from "../../dist";

export const contextWormhole = new ReactContextWormhole(
  Counter1Context,
  Counter2Context,
  Counter3Context
);

export const WormholeIn = contextWormhole.In;
export const WormholeOut = contextWormhole.Out;
