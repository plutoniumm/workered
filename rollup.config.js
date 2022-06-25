import express from "express";
// import fs from "fs";
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const PORT = process.env.PORT || 3001;
const production = !process.env.ROLLUP_WATCH;


const app = express();

app.use( express.static( '.' ) );
app.get( '/cpts', ( req, res ) => {
    res.send( components );
} );
app.listen( PORT, () => console.log( "Running at " + PORT ) );

export default {
    input: './src/index.js',
    output: {
        sourcemap: false,
        format: 'esm',
        name: 'workered',
        file: './index.js'
    },
    plugins: [
        resolve( { browser: true } ),
        commonjs(),
        production && terser()
    ],
    watch: { clearScreen: true }
};
