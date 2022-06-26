# workered ⚙️
Based on [@developit/workerize-loader](https://github.com/developit/workerize-loader)

### Install
```bash
$ pnpm install workered
```
### Importing
```js
import workered from 'workered';
```

## Direct Usage
The worker can be used by providing the function as a string or the function itself. Note in both cases any external function or variable will not be accessible to exported function
```js
let worker = workered(`
	export function add(a, b) {
		// intensive function
		let start = Date.now();
		while (Date.now()-start < 500);
		return a + b;
	}
`,'module');
// OR
function add(a, b) {
	// intensive function
	const start = Date.now();
	while (Date.now()-start < 500);

	return a + b;
};
let worker = workered(add, 'module');
```
Once the worker is created it can be used as an async function
```js
(async () => {
	console.log('3 + 9 = ', await worker.add(3, 9)); // "3 + 9 = 12"
	console.log('1 + 2 = ', await worker.add(1, 2)); // "1 + 2 = 3"
})();
```

## With IIFE
When using with IIFE the `script` tag supports top level `await` and can be treated as such. The main objective here was to be able to run a whole function in an isolated scope and just return the value without blocking main thread

```html
<script scope="worker">
	console.log('lolzies');

	return 2; // return statement required
</script>

<script>
const work = document.querySelector( 'script[type="worker"]' ).textContent;
// OR
const work = workered.getNode( query ); // default=script[scope="worker"]

const data = workered().run( work ).then( r => {
	console.log( r ); // 'lolzies' & 2
} );
</script>
```

## Utils
```js
import { wetch } from "workered/utils";

const url = 'https://api.github.com/users/octocat'; // to get text append '.text' etc
wetch( url).then( res => {
	//(returns .json by default)
	console.log( res ); // @octocat gh-profile
} );
```

### License

[MIT License](https://oss.ninja/mit/plutoniumm/) © [Plutoniumm](https://ifactorial.com/me) \
[MIT License](https://oss.ninja/mit/developit/) © [Jason Miller](https://jasonformat.com)
