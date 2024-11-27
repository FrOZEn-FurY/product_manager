import React from 'react';

export const Navbar = () => {
    return (
        <>
            <nav className="navbar">
                <ul className="navbar-nav">
                    <li className="nav-brand"><a href={"#"}>صداقت بار</a></li>
                    <li className="nav-divider"></li>
                    <li className="nav-item me-auto">
                        <a href={"#"}>
                            <span className={"badge"}>جدیدترین ها</span>
                            کالا های خاصی در مرحله ارسال قرار گرفته شدند.
                            <span className={"leading-span"}>بیشتر</span>
                        </a>
                    </li>
                    <li className="nav-item"><input className={"search"} type={"search"} placeholder={"ذنبال چه چیزی میگردی؟"}/></li>
                    <li className="nav-item"><a href={"#"}>sth</a></li>
                    <li className="nav-item"><a href={"#"}>cog</a></li>
                    <li className="nav-item"><a href={"#"}>bell</a></li>
                </ul>
            </nav>
        </>
    );
}