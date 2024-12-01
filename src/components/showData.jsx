import React, {useEffect, useState} from 'react';
import {useQuery} from "react-query";
import {AddForm} from "./addForm";
import {ConfirmDelete} from "./confirmDelete";
import { PiSquaresFour } from "react-icons/pi";
import { CiEdit } from "react-icons/ci";
import {MdKeyboardArrowLeft, MdKeyboardArrowRight, MdOutlineDeleteSweep} from "react-icons/md";
import { RiAddLargeFill } from "react-icons/ri";
import {FaCheck} from "react-icons/fa";
import {Button, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";

export const ShowData = () => {
    let { isLoading, isError, data, error } = useQuery('fetchProducts', fetchData);
    const [showableData, setShowableData] = useState(undefined);
    const [showForm, setShowForm] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        document.addEventListener('keydown', async (event) => {
            if (event.key === 'Enter' && event.target.classList.contains("title-filter")) {
                const value = event.target.value;
                const newData = await getDataByTitle(value);
                setShowableData(newData);
            }
        })
    }, [data]);

    return (
        <>
            {
                showForm && <AddForm data={currentId} handleCurrentId={setCurrentId} handleShowForm={setShowForm} showForm={showForm} />
            }
            {
                confirmDelete && <ConfirmDelete data={currentId} handleConfirmDelete={setConfirmDelete} handleCurrentId={setCurrentId} />
            }
            <h1 className={"font-bold text-xl flex flex-row items-center gap-4 font-peydabold"}>
                <PiSquaresFour className={"w-[2rem] h-[2rem]"}/> محصولات
            </h1>
            <input type={"text"} placeholder={"جستجو کنید"} className={"title-filter"} />
            {isLoading === true ? (
                <div>Loading...</div>
            ) : isError ? (
                <div>An error occurred: {error.message}</div>
            ) : (
                <Table className={"data-table"}>
                    <TableHead>
                        <TableRow>
                            <TableCell align={"center"}>کد محصول</TableCell>
                            <TableCell align={"center"}>عنوان</TableCell>
                            <TableCell align={"center"}>مبلغ (تومان)</TableCell>
                            <TableCell align={"center"}>دسته بندی</TableCell>
                            <TableCell align={"center"}>مبلغ نهایی (تومان)</TableCell>
                            <TableCell align={"center"}>ابعاد</TableCell>
                            <TableCell align={"center"}>درصد تخفیف</TableCell>
                            <TableCell align={"center"}>موجودی</TableCell>
                            <TableCell align={"center"}>عملیات</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {showableData.data.map((item) => {
                        return (
                            <TableRow key={item.id}>
                                <TableCell align={"center"}>{item.product_id}</TableCell>
                                <TableCell align={"center"}>{item.title}</TableCell>
                                    <TableCell align={"center"}>{item.price_toman}</TableCell>
                                    <TableCell align={"center"}>{item.product_category.title}</TableCell>
                                    <TableCell align={"center"}>{item.price_after_discount}</TableCell>
                                    <TableCell align={"center"}>3*4</TableCell>
                                    <TableCell align={"center"}>{item.discount_percent}%</TableCell>
                                    <TableCell align={"center"}>{item.inventory}</TableCell>
                                    <TableCell align={"center"} className={"operations"}>
                                        <Button onClick={() => {
                                            if (confirmDelete || currentId || showForm) {
                                                return;
                                            }
                                            setCurrentId(item);
                                            setShowForm(true);
                                        }} id={"add-form-button"}
                                                color={"warning"}
                                                className={"edit-delete"}
                                                startIcon={<CiEdit className={"w-[1.5rem] h-[1.5rem]"} />}
                                        >
                                             ویرایش</Button>
                                        <Button onClick={() => {
                                            if (confirmDelete || currentId || showForm) {
                                                return;
                                            }
                                            setCurrentId(item);
                                            setConfirmDelete(true);
                                        }} id={"delete-item-button"}
                                                color={"error"}
                                                className={"edit-delete"}
                                                startIcon={<MdOutlineDeleteSweep className={"w-[1.5rem] h-[1.5rem]"}/>}
                                        > حذف</Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            )}
            <div className={"add-pagination"}>
                <Button onClick={() => {
                    if (confirmDelete || currentId || showForm) {
                        return;
                    }
                    setShowForm(true);
                }} id={"add-form-button"}
                        variant={"contained"}
                        color={"primary"}
                        className={"justify-between gap-4 font-peydabolder"}
                        startIcon={<RiAddLargeFill />}
                > اضافه کردن محصول جدید</Button>
                <div className={"pagination"}>
                    <span><MdKeyboardArrowRight className={"w-[1.2rem] h-[1.2rem]"} /></span>
                    <span>1</span>
                    <span><MdKeyboardArrowLeft className={"w-[1.2rem] h-[1.2rem]"} /></span>
                </div>
            </div>
            <h1 className={"font-peydabold text-md mt-auto flex flex-row items-center gap-2"}>
                <div className={"check-container"}><FaCheck className={"fill-white"} /></div>
                راهنما های مشابه
            </h1>
            <div className={"flex flex-row items-center gap-2 font-peydabolder"}>
                <div className={"help-card"}>
                    <div className={"help-card-title"}>
                        <div className={"w-4 h-4 rounded-full bg-green-700"}></div>
                        تحویل به مشتری
                    </div>
                    <div className={"border-r border-black self-stretch"}></div>
                    <div className={"help-card-body"}>کالا ها به مشتری تحویل داده شدند.</div>
                </div>
                <div className={"help-card"}>
                    <div className={"help-card-title"}>
                        <div className={"w-4 h-4 rounded-full bg-blue-700"}></div>
                        تحویل به مشتری
                    </div>
                    <div className={"border-r border-black self-stretch"}></div>
                    <div className={"help-card-body"}>کالا ها به مشتری تحویل داده شدند.</div>
                </div>
                <div className={"help-card"}>
                    <div className={"help-card-title"}>
                        <div className={"w-4 h-4 rounded-full bg-purple-700"}></div>
                        تحویل به مشتری
                    </div>
                    <div className={"border-r border-black self-stretch"}></div>
                    <div className={"help-card-body"}>کالا ها به مشتری تحویل داده شدند.</div>
                </div>
            </div>
        </>
    );

    async function fetchData() {
        const response = await fetch('https://api.shahrebar.ir/api/v1/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer 19|5f2Fq460UdQDzX2EGTjfjAn37FVtrVU9136shRqFcbdc25fc"
            }
        });
        const data = await response.json();
        setShowableData(data);
        return data;
    }

    async function getDataByTitle(value) {
        const response = await fetch('https://api.shahrebar.ir/api/v1/products?title=*' + value + "*", {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'Authorization': "Bearer 19|5f2Fq460UdQDzX2EGTjfjAn37FVtrVU9136shRqFcbdc25fc"
            }
        });
        const data = response.json();
        return data;
    }
}