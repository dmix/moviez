import path from 'path';
import { UserConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import vuePlugin from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import vueJsxPlugin from '@vitejs/plugin-vue-jsx';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import visualizer from 'rollup-plugin-visualizer';
import unocss from 'unocss/vite';
import presetUno from '@unocss/preset-uno';
import presetMini from '@unocss/preset-mini';
import AutoImport from 'unplugin-auto-import/vite';

export default ({ command }: { command: any }) => {
    const config: UserConfig = {
        plugins: [
            vuePlugin(),
            vueJsxPlugin(),
            eslintPlugin({
                cache: false,
                include: ['src/**/*.vue', 'src/**/*.ts', 'src/**/*.tsx'],
            }),
            unocss({
                presets: [presetMini({ dark: 'media' })],
            }),
            Components({
                resolvers: [ElementPlusResolver({ ssr: true })],
                directoryAsNamespace: true
            }),
            AutoImport({
                imports: ['vue', 'vue-router', 'pinia'],
                resolvers: [ElementPlusResolver({ ssr: true })],
            }),
        ],
        server: {
            port: 3000,
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
            },
        },
    };

    if (command === 'build') {
        config.plugins.push(
            visualizer({
                open: false,
                gzipSize: true,
                brotliSize: true,
            }),
        )
    }

    return config;
}
