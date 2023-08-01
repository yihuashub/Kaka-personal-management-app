import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Auth0Provider} from "@auth0/auth0-react";
import {getAuth0Config} from "./config";
import history from "./utils/history";

const onRedirectCallback = (appState) => {
    history.push(
        appState && appState.returnTo ? appState.returnTo : window.location.pathname
    );
};
// Please see https://auth0.github.io/auth0-react/interfaces/Auth0ProviderOptions.html
// for a full list of the available properties on the provider
const config = getAuth0Config();

const providerConfig = {
    domain: config.domain,
    clientId: config.clientId,
    onRedirectCallback,
    authorizationParams: {
        redirect_uri: window.location.origin,
        ...(config.audience ? {audience: config.audience} : null),
    },
};

ReactDOM.render(
    <Auth0Provider
        {...providerConfig}
    >
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </Auth0Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
