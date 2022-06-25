<h1>workered</h1>

Based on [@developit/workerize-loader](https://github.com/developit/workerize-loader)

**worker.js**:

```js
let worker = workerize(`
	export function add(a, b) {
		// block for half a second to demonstrate asynchronicity
		let start = Date.now();
		while (Date.now()-start < 500);
		return a + b;
	}
`);

(async () => {
	console.log('3 + 9 = ', await worker.add(3, 9));
	console.log('1 + 2 = ', await worker.add(1, 2));
})();
```

### License

[MIT License](https://oss.ninja/mit/developit/) © [Jason Miller](https://jasonformat.com)
