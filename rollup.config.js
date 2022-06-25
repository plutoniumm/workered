import express from "express";
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

if ( !production ) {
    const PORT = process.env.PORT || 3001;
    // Run server only in dev mode
    const app = express();

    app.use( express.static( '.' ) );
    app.get( '/cpts', ( req, res ) => {
        res.send( components );
    } );
    app.listen( PORT, () => console.log( "Running at " + PORT ) );
}

export default [ 'index', 'utils' ].map( e => {
    return {
        input: `./src/${ e }.js`,
        output: {
            sourcemap: false,
            format: 'esm',
            name: 'workered',
            file: `./${ e }.js`
        },
        plugins: [
            resolve( { browser: true } ),
            commonjs(),
            production && terser()
        ],
        watch: { clearScreen: true }
    }
} );
