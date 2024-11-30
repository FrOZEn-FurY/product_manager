import React, {useEffect} from 'react';
import axios from "axios";
import {LuTrash} from "react-icons/lu";

export const ConfirmDelete = ({data, handleConfirmDelete, handleCurrentId}) => {
    const handleDelete = async () => {
        const response = await axios.delete(`https://api.shahrebar.ir/api/v1/products/${data.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 17|LBQC9Wd4GxwrDO0YEAhtmZEDvJi7XSQRS7JhbVkE4279d436',
            }
        });
        handleConfirmDelete(false);
        handleCurrentId(null);
        window.location = '/';
    }

    console.log(handleConfirmDelete, handleCurrentId, data);

    const handleAbort = () => {
        handleConfirmDelete(false);
        handleCurrentId(null);
    }

    const callbackFn = (event) => {
        const addForm = document.getElementById("delete-item-confirm");
        if (addForm.contains(event.target) === false && event.target.id !== "delete-item-button") {
            handleCurrentId(null);
            handleConfirmDelete(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', callbackFn);

        return () => {
            document.removeEventListener('click', callbackFn);
        }
    }, []);

    return (
        <div id={"delete-item-confirm"} className={"delete-confirm"}>
            <h2 className={"flex flex-row items-center gap-2"}><LuTrash className={"text-red-600"} />آیا از حذف این کالا اطمینان دارید؟</h2>
            <h3 className={"text-red-600"}>اگر این کالا را خذف کنید قادر به برگرداندن آن نخواهید بود.</h3>
            <div className={"mt-auto flex flex-row items-center justify-center gap-1"}>
                <button className={"flex-grow rounded-lg hover:bg-slate-300 " +
                    "transition-all duration-200 delay-75 ease-in p-2 border-x border-black"} onClick={handleAbort}>انصراف</button>
                <button className={"flex-grow rounded-lg bg-red-600 text-white " +
                    "hover:bg-red-800 transition-all duration-200 delay-75 ease-in p-2"} onClick={handleDelete}>حذف کالا</button>
            </div>
        </div>
    )
}