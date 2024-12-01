import React from "react";
import * as yup from 'yup';
import {Controller, useForm} from "react-hook-form";
import axios from 'axios';
import {IoMdCloseCircleOutline} from "react-icons/io";
import {IoBasketOutline} from "react-icons/io5";
import {FaArrowLeftLong} from "react-icons/fa6";
import {yupResolver} from "@hookform/resolvers/yup";
import {Box, Button, FormControl, InputLabel, MenuItem, Modal, NativeSelect, Select, TextField} from "@mui/material";

const schema = yup.object().shape({
    title: yup.string().required("This field is required."),
    description: yup.string().required("This field is required."),
    product_id: yup.string().required("This field is required."),
    is_active: yup
        .boolean()
        .required("This field is required."),
    price_toman: yup
        .number()
        .positive("The value must be a positive integer.")
        .required("This field is required."),
    discount_percent: yup
        .number()
        .positive("The value must be a positive integer.")
        .min(0, "The value must be more than or equal to 0.")
        .max(100, "The value must be less than or equal to 100.")
        .required("This field is required."),
    inventory: yup.number().positive("The value must be a positive integer.").required("This field is required."),
    product_category_id: yup.number().positive("The value must be a positive integer.").required("This field is required."),
}).required();

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'start',
    flexDirection: 'column',
};

export const AddForm = ({data, handleShowForm, handleCurrentId, showForm}) => {
    const form = useForm({
        defaultValues: {
            title: data === null ? undefined : data.title,
            product_id: data === null ? undefined : data.product_id,
            description: data === null ? undefined : data.description,
            is_active: data === null ? null : data.is_active,
            price_toman: data === null ? undefined : data.price_toman,
            discount_percent: data === null ? undefined : data.discount_percent,
            inventory: data === null ? undefined : data.inventory,
            product_category_id: data === null ? undefined : data.product_category_id,
        },
        resolver: yupResolver(schema),
    });

    const handleSubmit = async (values) => {
        if (data) {
            const response = await axios.patch(`https://api.shahrebar.ir/api/v1/products/${data.id}`,
                values,
                {
                    headers: {
                        'Authorization': "Bearer 19|5f2Fq460UdQDzX2EGTjfjAn37FVtrVU9136shRqFcbdc25fc",
                        'Content-Type': 'application/json',
                    }
                });
        } else {
            const response = await axios.post('https://api.shahrebar.ir/api/v1/products',
                values,
                {
                    headers: {
                        'Authorization': "Bearer 19|5f2Fq460UdQDzX2EGTjfjAn37FVtrVU9136shRqFcbdc25fc",
                        'Content-Type': 'application/json',
                    }
                });
        }
        handleShowForm(false);
        handleCurrentId(null);
        window.location = '/';
    }

    return (
        <Modal open={showForm} onClose={() => {handleShowForm(false); handleCurrentId(null);}} id={"add-item-form"}>
            <Box sx={style} dir={"rtl"}>
                <div className={"add-title font-peydabold"} dir={"rtl"}>
                    <IoMdCloseCircleOutline
                        onClick={() => {
                            handleShowForm(false);
                            handleCurrentId(null)
                        }}
                        className={"w-[1.5rem] h-[1.5rem] fill-red-600 hover:cursor-pointer"}
                    />
                    <span className={"flex flex-row items-center gap-2 order-1"}><IoBasketOutline
                        className={"w-[1.5rem] h-[1.5rem]"}/> افزودن محصول جدید</span>
                </div>
                <form id={"add-form"} className={"mb-auto flex flex-row flex-wrap gap-2 p-2 m-2 font-danabolder"}
                      onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className={"input-group"}>
                        <TextField fullWidth={true} {...form.register("title")} variant={"outlined"} label={"عنوان"}>
                        </TextField>
                        {form.formState.errors.title &&
                            <span className={"form-error"}>{form.formState.errors.title.message}</span>}
                    </div>

                    <div className={"input-group"}>
                        <TextField fullWidth={true} {...form.register("product_id")} variant={"outlined"} label={"کد محصول"}>
                        </TextField>
                        {form.formState.errors.product_id &&
                            <span className={"form-error"}>{form.formState.errors.product_id.message}</span>}
                    </div>

                    <div className={"input-group"}>
                        <TextField fullWidth={true} {...form.register("description")} variant={"outlined"} label={"توضیحات"}>
                        </TextField>
                        {form.formState.errors.description &&
                            <span className={"form-error"}>{form.formState.errors.description.message}</span>}
                    </div>

                    <div className={"input-group"}>
                        <Controller control={form.control} render={ ({ field }) => {
                            return ( <FormControl fullWidth>
                                <InputLabel id="is_active_label">وضعیت</InputLabel>
                                <Select
                                    labelId="is_active_label"
                                    id="is_active"
                                    label="وضعیت"
                                    variant={"outlined"}
                                    {...field}
                                >
                                    <MenuItem value={true}>فعال</MenuItem>
                                    <MenuItem value={false}>غیرفعال</MenuItem>
                                </Select>
                            </FormControl>
                            );}} name={"is_active"} />
                        {form.formState.errors.is_active &&
                            <span className={"form-error"}>{form.formState.errors.is_active.message}</span>}
                    </div>

                    <div className={"input-group"}>
                        <TextField fullWidth={true} {...form.register("price_toman")} variant={"outlined"} label={"مبلغ"}>
                        </TextField>
                        {form.formState.errors.price_toman &&
                            <span className={"form-error"}>{form.formState.errors.price_toman.message}</span>}
                    </div>

                    <div className={"input-group"}>
                        <TextField fullWidth={true} {...form.register("discount_percent")} variant={"outlined"} label={"درصد تخفیف"}>
                        </TextField>
                        {form.formState.errors.discount_percent &&
                            <span className={"form-error"}>{form.formState.errors.discount_percent.message}</span>}
                    </div>

                    <div className={"input-group"}>
                        <TextField fullWidth={true} {...form.register("inventory")} variant={"outlined"} label={"موجودی"}>
                        </TextField>
                        {form.formState.errors.inventory &&
                            <span className={"form-error"}>{form.formState.errors.inventory.message}</span>}
                    </div>

                    <div className={"input-group"}>
                        <TextField fullWidth={true} {...form.register("product_category_id")} variant={"outlined"} label={"کد دسته بندی محصول"}>
                        </TextField>
                        {form.formState.errors.product_category_id &&
                            <span className={"form-error"}>{form.formState.errors.product_category_id.message}</span>}
                    </div>

                    <div className={"flex flex-row flex-wrap items-center gap-2 justify-end p-2 w-full font-danabolder"}>
                        <span className={"flex-grow bg-white"}></span>
                        <span className={"flex-grow bg-white"}></span>
                        <span className={"flex-grow bg-white"}></span>
                        <Button
                            variant={"outlined"}
                            className={"abortButton"}
                            color={"inherit"}
                            type={"button"} onClick={() => {
                            handleShowForm(false);
                            handleCurrentId(null);
                        }}>لغو و بازگشت
                        </Button>
                        <Button
                            variant={"contained"}
                            color={"primary"}
                            className={"abortButton"}
                            type={"submit"}
                            endIcon={<FaArrowLeftLong/>}
                        >
                            افزودن محصول</Button>
                    </div>
                </form>
            </Box>
        </Modal>
    );
}