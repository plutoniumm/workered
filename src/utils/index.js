import Workered from '../index.js';

function get ( uri, options ) {
    const url = uri;

    const getExt = ( url ) => url.substr( url.lastIndexOf( '.' ) + 1 ) || 'raw';
    const getProcess = ( url ) => {
        const ext = getExt( url );
        if ( ext === 'json' ) return async ( res ) => await res.json();
        if ( ext === 'text' ) return async ( res ) => await res.text();

        return async ( res ) => await res.json(); // Making .json() as default processor
    };

    const useRaw = !( [ 'json', 'raw', 'text' ].includes( getExt( url ) ) );

    const endpoint = useRaw ?
        url :
        url.split( '.' ).slice( 0, -1 ).join( '.' );

    console.log( endpoint, useRaw );
    return fetch( endpoint, options ).then( getProcess( url ) );
};

const workee = Workered( get, "module" );

export const wetch = async ( url, options = {} ) => await workee.get( url, options );