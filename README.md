# workered
Based on [@developit/workerize-loader](https://github.com/developit/workerize-loader)

## Direct Usage
*With `export function`*

```js
import workered from './index.js';
let worker = workered(`
	export function add(a, b) {
		// intensive function
		let start = Date.now();
		while (Date.now()-start < 500);
		return a + b;
	}
`,'module');

(async () => {
	console.log('3 + 9 = ', await worker.add(3, 9));
	console.log('1 + 2 = ', await worker.add(1, 2));
})();
```

## With IIFE
When using with IIFE the `script` tag supports top level `await` and can be treated as such. The main objective here was to be able to run a whole function in an isolated scope and just return the value without being intensive

```js
import workered from "./index.js";

<script type="worker">
	console.log('lolzies');

	return 2;
</script>

const work = document.querySelector( 'script[type="worker"]' ).textContent;

const data = workered().run( work ).then( r => {
	console.log( r ); // logs 'lolzies' followed by 2 as a return value
} );
```

## Utils
```js
import {fetch} from "./utils.js";

// coming soon
```

### License

[MIT License](https://oss.ninja/mit/developit/) © [Jason Miller](https://jasonformat.com)
