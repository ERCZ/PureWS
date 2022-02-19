import dts from "rollup-plugin-dts";
import typescript from '@rollup/plugin-typescript';

/**
 * @type {import('rollup').RollupOptions}
 */
const config = [
    {
        input: 'src/index.ts',
        output: [
            {
                file: 'lib/index.js',
                name: 'PureWS',
                format: 'umd',
                sourcemap: true
            },
            {
                file: 'lib/index.esm.js',
                format: 'es',
                sourcemap: true
            }
        ],
        plugins: [typescript()],
    },
    {
        input: 'src/index.ts',
        output: {
            file: 'lib/index.d.ts',
            format: 'es'
        },
        plugins: [dts()]
    }
];

export default config;