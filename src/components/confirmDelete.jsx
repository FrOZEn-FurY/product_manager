import React, {useEffect} from 'react';
import axios from "axios";
import {LuTrash} from "react-icons/lu";
import {Button, Modal, Box} from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'start',
    flexDirection: 'column',
    gap: 2
};

export const ConfirmDelete = ({data, handleConfirmDelete, handleCurrentId}) => {
    const handleDelete = async () => {
        const response = await axios.delete(`https://api.shahrebar.ir/api/v1/products/${data.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 19|5f2Fq460UdQDzX2EGTjfjAn37FVtrVU9136shRqFcbdc25fc',
            }
        });
        handleConfirmDelete(false);
        handleCurrentId(null);
        window.location = '/';
    }

    const handleAbort = () => {
        handleConfirmDelete(false);
        handleCurrentId(null);
    }

    return (
        <Modal open={true} onClose={() => {
            handleConfirmDelete(false);
            handleCurrentId(null);
        }} id={"delete-item-confirm"}>
            <Box sx={style} dir={"rtl"}>
                <h2 className={"flex flex-row items-center gap-2 font-peydabold"}><LuTrash className={"text-red-600"}/>آیا از حذف این
                    کالا اطمینان دارید؟</h2>
                <h3 className={"text-red-600 font-peydabolder"}>اگر این کالا را حذف کنید قادر به برگرداندن آن نخواهید بود.</h3>
                <div className={"mt-auto flex flex-row items-center justify-center gap-1 self-stretch"}>
                    <Button
                        variant={"outlined"}
                        color={"inherit"}
                        className={"flex-grow abortDelete font-peydabolder"}
                        onClick={handleAbort}
                    >انصراف</Button>
                    <Button
                        variant={"contained"}
                        color={"error"}
                        className={"flex-grow font-peydabolder"}
                        onClick={handleDelete}
                    >حذف کالا</Button>
                </div>
            </Box>
        </Modal>
    )
}