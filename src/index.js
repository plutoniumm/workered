import working from "./worker.js";

const preprocess = ( functor = null ) => {
	if ( functor === null ) return undefined;
	const func = typeof functor === "string" ? functor : functor.toString();

	return `export ${ func }`;
};

const workered = ( func, type ) => {
	const functor = preprocess( func );

	return working( functor, type );
};

workered.getNode = ( query = 'script[type="worker"]' ) => document.querySelector( query ).textContent;

export default workered;