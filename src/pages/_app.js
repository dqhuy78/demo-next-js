import React from 'react';
import App from 'next/app';
import { fromJS } from 'immutable';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import Router from 'next/router';
import NProgress from 'nprogress';

import configureStore from '~/store/config';
import axios from '~/utils/axios';
import { types } from '~/store/modules/auth';

//========== APP START ==========//
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

class NextJSBase extends App {

    static async getInitialProps({ Component, ctx }) {
        if (ctx.isServer) {
            axios.defaults.headers.common.cookie = ctx.req.headers.cookie || ''
            ctx.store.dispatch({ type: types.GET_AUTH_USER });
        }
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}

        return { pageProps }
    }

    render() {
        const { Component, pageProps, store } = this.props;

        return (
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        )
    }
}

export default withRedux(configureStore, {
    serializeState: state => state,
    deserializeState: state => fromJS(state),
})(withReduxSaga(NextJSBase));
