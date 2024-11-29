# ReactContextWormhole

It's used for sharing context between two different React roots.

There's no direct way to pass context between two different React roots. However, we can achieve this through `ReactContextWormhole`.

For example, in the following code, App2 wants to use the context from App1:

```tsx
const app1 = createRoot(document.getElementById("app1")!);
app1.render(<App1 />);
```

```tsx
const app2 = createRoot(document.getElementById("app2")!);
app2.render(<App2 />);
```

Please refer to the examples in the `example` folder for specific usage.

## License

MIT @ AEPKILL
