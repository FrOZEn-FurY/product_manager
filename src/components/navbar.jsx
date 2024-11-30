import React from 'react';
import { PiBellThin } from "react-icons/pi";
import { HiOutlineCog8Tooth } from "react-icons/hi2";
import { RiApps2AddLine } from "react-icons/ri";
import { FaArrowLeftLong } from "react-icons/fa6";

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
                            <span className={"leading-span"}> بیشتر<FaArrowLeftLong className={"w-[1.5rem] h-[1rem]"} /></span>
                        </a>
                    </li>
                    <li className="nav-item"><input className={"search"} type={"search"} placeholder={"ذنبال چه چیزی میگردی؟"}/></li>
                    <li className="nav-item w-[1.5rem] h-[1.5rem]"><a href={"#"}><RiApps2AddLine className={"w-full h-full"} /></a></li>
                    <li className="nav-item w-[1.5rem] h-[1.5rem]"><a href={"#"}><HiOutlineCog8Tooth className={"w-full h-full"}/></a></li>
                    <li className="nav-item w-[1.5rem] h-[1.5rem]"><a href={"#"}><PiBellThin className={"w-full h-full"} /></a></li>
                </ul>
            </nav>
        </>
    );
}