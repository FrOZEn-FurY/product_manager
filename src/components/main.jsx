import React from 'react';
import {Navbar} from "./navbar";
import {ShowData} from "./showData";
import createCache from '@emotion/cache';
import {prefixer} from "stylis";
import rtlPlugin from 'stylis-plugin-rtl';
import {CacheProvider} from "@emotion/react";

const cacheRtl = createCache({
   key: 'rtl',
   stylisPlugins: [prefixer, rtlPlugin]
});

export const Main = () => {
    return (
        <CacheProvider value={cacheRtl}>
            <header className="main-header">
                <Navbar />
            </header>
            <main className="main-content">
                <ShowData />
            </main>
        </CacheProvider>
    );
}