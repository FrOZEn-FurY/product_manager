import React from 'react';
import {Navbar} from "./navbar";
import {ShowData} from "./showData";

export const Main = () => {
    return (
        <>
            <header className="main-header">
                <Navbar />
            </header>
            <main className="main-content">
                <ShowData />
            </main>
        </>
    );
}