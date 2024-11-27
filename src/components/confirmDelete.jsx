import React from 'react';

export const ConfirmDelete = ({data, handleConfirmDelete, handleCurrentId}) => {
    const handleDelete = () => {
        fetch('https://api.shahrebar.ir/api/v1/products/' + data.product_id + '/', {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer 9|2lvEO3R6TSN8zu7pFGNJbCR0DIDklXLsEjz4ooL1730496b4"
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

    return (
        <>
            <h2>آیا به حذف کردن این ایتم اظمینان دارید؟</h2>
            <div>
                <button onClick={handleDelete}>بله</button>
                <button onClick={handleAbort}>خیر</button>
            </div>
        </>
    )
}