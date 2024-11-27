import React, {useState} from 'react';
import {useQuery} from "react-query";
import {AddForm} from "./addForm";
import {ConfirmDelete} from "./confirmDelete";

async function fetchData() {
    const response = await fetch('https://api.shahrebar.ir/api/v1/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer 9|2lvEO3R6TSN8zu7pFGNJbCR0DIDklXLsEjz4ooL1730496b4"
            }
        });
    const data = await response.json();
    console.log(data.data);
    return data;
}

export const ShowData = () => {
    const { isLoading, isError, data, error } = useQuery('fetchProducts', fetchData);
    const [showForm, setShowForm] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    return (
        <>
            {
                showForm && <AddForm data={currentId} handleCurrentId={setCurrentId} handleShowForm={setShowForm} />
            }
            {
                confirmDelete && <ConfirmDelete data={currentId} handleConfirmDelete={setConfirmDelete} handleCurrentId={setCurrentId} />
            }
            <h1 className={"font-bold text-xl"}>icon محصولات</h1>
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
                    {data.data.map((item) => {
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
                                            setCurrentId(item);
                                            setShowForm(true);
                                        }} className={"edit"}>icon ویرایش</button>
                                        <button onClick={() => {
                                            setCurrentId(item);
                                            setConfirmDelete(true);
                                        }} className={"delete"}>icon حذف</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}
            <div className={"add-pagination"}>
                <button onClick={() => {
                    setShowForm(true);
                }} className={"add"}>icon اضافه کردن محصول جدید</button>
                <div>
                    <span>&left;</span>
                    <span>1</span>
                    <span>&right;</span>
                </div>
            </div>
            <h1 className={"font-bold text-md mt-auto"}>icon راهنما های مشابه</h1>
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
    )
}