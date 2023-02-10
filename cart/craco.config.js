const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require('./package.json').dependencies;

module.exports = {
    webpack: {
        configure: {
            output: {
                publicPath: 'auto',
            },
        },
        plugins: {
            add: [
                new ModuleFederationPlugin({
                    name: 'cart',
                    remotes: {},
                    exposes: {
                        './App': './src/App',
                        './AddToCartButton': './src/AddToCartButton',
                        './DisplayCartButton': './src/DisplayCartButton',
                        './CartComponent': './src/CartComponent',
                    },
                    filename: 'remoteEntry.js',
                    shared: {
                        ...deps,
                        react: {
                            singleton: true,
                            eager: true,
                            requiredVersion: deps['react'],
                        },
                        'react-dom': {
                            singleton: true,
                            eager: true,
                            requiredVersion: deps['react-dom'],
                        },
                    },
                }),
            ],
        },
    },
};
