import React, {useEffect, useState} from 'react';
import {useQuery} from "react-query";
import {AddForm} from "./addForm";
import {ConfirmDelete} from "./confirmDelete";
import { PiSquaresFour } from "react-icons/pi";
import { CiEdit } from "react-icons/ci";
import {MdKeyboardArrowLeft, MdKeyboardArrowRight, MdOutlineDeleteSweep} from "react-icons/md";
import { RiAddLargeFill } from "react-icons/ri";
import {FaCheck} from "react-icons/fa";

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
                showForm && <AddForm data={currentId} handleCurrentId={setCurrentId} handleShowForm={setShowForm} />
            }
            {
                confirmDelete && <ConfirmDelete data={currentId} handleConfirmDelete={setConfirmDelete} handleCurrentId={setCurrentId} />
            }
            <h1 className={"font-bold text-xl flex flex-row items-center gap-2"}><PiSquaresFour className={"w-[2rem] h-[2rem]"}/> محصولات</h1>
            <input type={"text"} placeholder={"جستجو کنید"} className={"title-filter"} />
            {isLoading === true ? (
                <div>Loading...</div>
            ) : isError ? (
                <div>An error occurred: {error.message}</div>
            ) : (
                <table className={"data-table"}>
                    <thead>
                        <tr>
                            <th>کد محصول</th>
                            <th>عنوان</th>
                            <th>مبلغ (تومان)</th>
                            <th>دسته بندی</th>
                            <th>مبلغ نهایی (تومان)</th>
                            <th>ابعاد</th>
                            <th>درصد تخفیف</th>
                            <th>موجودی</th>
                            <th>عملیات</th>
                        </tr>
                    </thead>
                    <tbody>
                    {showableData.data.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td>{item.product_id}</td>
                                <td>{item.title}</td>
                                    <td>{item.price_toman}</td>
                                    <td>{item.product_category.title}</td>
                                    <td>{item.price_after_discount}</td>
                                    <td>3*4</td>
                                    <td>{item.discount_percent}%</td>
                                    <td>{item.inventory}</td>
                                    <td className={"operations"}>
                                        <button onClick={() => {
                                            if (confirmDelete || currentId || showForm) {
                                                return;
                                            }
                                            setCurrentId(item);
                                            setShowForm(true);
                                        }} id={"add-form-button"} className={"edit"}><CiEdit className={"w-[1.5rem] h-[1.5rem]"} /> ویرایش</button>
                                        <button onClick={() => {
                                            if (confirmDelete || currentId || showForm) {
                                                return;
                                            }
                                            setCurrentId(item);
                                            setConfirmDelete(true);
                                        }} id={"delete-item-button"} className={"delete"}><MdOutlineDeleteSweep className={"w-[1.5rem] h-[1.5rem]"}/> حذف</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}
            <div className={"add-pagination"}>
                <button onClick={() => {
                    if (confirmDelete || currentId || showForm) {
                        return;
                    }
                    setShowForm(true);
                }} id={"add-form-button"} className={"add"}><RiAddLargeFill className={"mt-1"} /> اضافه کردن محصول جدید</button>
                <div className={"pagination"}>
                    <span><MdKeyboardArrowRight className={"w-[1.2rem] h-[1.2rem]"} /></span>
                    <span>1</span>
                    <span><MdKeyboardArrowLeft className={"w-[1.2rem] h-[1.2rem]"} /></span>
                </div>
            </div>
            <h1 className={"font-bold text-md mt-auto flex flex-row items-center gap-2"}>
                <div className={"check-container"}><FaCheck className={"fill-white"} /></div>
                راهنما های مشابه
            </h1>
            <div className={"flex flex-row items-center gap-2"}>
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
                'Authorization': "Bearer 17|LBQC9Wd4GxwrDO0YEAhtmZEDvJi7XSQRS7JhbVkE4279d436"
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
                'Authorization': "Bearer 17|LBQC9Wd4GxwrDO0YEAhtmZEDvJi7XSQRS7JhbVkE4279d436"
            }
        });
        const data = response.json();
        return data;
    }
}