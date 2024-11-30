import React, {useEffect} from "react";
import * as yup from 'yup';
import {useForm} from "react-hook-form";
import axios from 'axios';
import {IoMdCloseCircleOutline} from "react-icons/io";
import {IoBasketOutline} from "react-icons/io5";
import {FaArrowLeftLong} from "react-icons/fa6";
import {yupResolver} from "@hookform/resolvers/yup";

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


export const AddForm = ({data, handleShowForm, handleCurrentId}) => {
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
                        'Authorization': "Bearer 17|LBQC9Wd4GxwrDO0YEAhtmZEDvJi7XSQRS7JhbVkE4279d436",
                        'Content-Type': 'application/json',
                    }
                });
        } else {
            const response = await axios.post('https://api.shahrebar.ir/api/v1/products',
                values,
                {
                    headers: {
                        'Authorization': "Bearer 17|LBQC9Wd4GxwrDO0YEAhtmZEDvJi7XSQRS7JhbVkE4279d436",
                        'Content-Type': 'application/json',
                    }
                });
        }
        handleShowForm(false);
        handleCurrentId(null);
        window.location = '/';
    }

    const callbackFn = (event) => {
        const addForm = document.getElementById("add-item-form");
        if (addForm.contains(event.target) === false && event.target.id !== "add-form-button") {
            handleCurrentId(null);
            handleShowForm(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', callbackFn);

        return () => {
            document.removeEventListener('click', callbackFn);
        }
    }, []);

    return (
        <div className={"form"} id={"add-item-form"}>
            <div className={"add-title"}>
                <IoMdCloseCircleOutline
                    onClick={() => {
                        handleShowForm(false);
                        handleCurrentId(null)
                    }}
                    className={"w-[1.5rem] h-[1.5rem] fill-red-600 hover:cursor-pointer"}
                />
                <span className={"flex flex-row items-center gap-2"}><IoBasketOutline
                    className={"w-[1.5rem] h-[1.5rem]"}/> افزودن محصول جدید</span>
            </div>
            <form id={"add-form"} className={"mb-auto flex flex-row flex-wrap gap-2 p-2 m-2"} onSubmit={form.handleSubmit(handleSubmit)}>
                <div className={"input-group"}>
                    <label className={"label"} htmlFor={"title"}>عنوان</label>
                    <input placeholder={"fake"} className={"input"} {...form.register("title")}/>
                    {form.formState.errors.title && <span className={"form-error"}>{form.formState.errors.title.message}</span>}
                </div>

                <div className={"input-group"}>
                    <label className={"label"} htmlFor={"product_id"}>کد محصول</label>
                    <input placeholder={"fake"} className={"input"} {...form.register("product_id")}/>
                    {form.formState.errors.product_id && <span className={"form-error"}>{form.formState.errors.product_id.message}</span>}
                </div>

                <div className={"input-group"}>
                    <label className={"label"} htmlFor={"description"}>توضیحات</label>
                    <input placeholder={"fake"} className={"input"} {...form.register("description")}/>
                    {form.formState.errors.description && <span className={"form-error"}>{form.formState.errors.description.message}</span>}
                </div>

                <div className={"input-group"}>
                    <label className={"label"} htmlFor={"is_active"}>وضعیت</label>
                    <select className={"input bg-white"} {...form.register("is_active")}>
                        <option label={"فعال"} value={1}></option>
                        <option label={"غیر فعال"} value={0}></option>
                    </select>
                    {form.formState.errors.is_active && <span className={"form-error"}>{form.formState.errors.is_active.message}</span>}
                </div>

                <div className={"input-group"}>
                    <label className={"label"} htmlFor={"price_toman"}>مبلغ (تومان)</label>
                    <input placeholder={"fake"} className={"input"} {...form.register("price_toman")}/>
                    {form.formState.errors.price_toman && <span className={"form-error"}>{form.formState.errors.price_toman.message}</span>}
                </div>

                <div className={"input-group"}>
                    <label className={"label"} htmlFor={"discount_precent"}>درصد تخفیف</label>
                    <input placeholder={"fake"} className={"input"} {...form.register("discount_percent")}/>
                    {form.formState.errors.discount_percent && <span className={"form-error"}>{form.formState.errors.discount_percent.message}</span>}
                </div>

                <div className={"input-group"}>
                    <label className={"label"} htmlFor={"inventory"}>موجودی</label>
                    <input placeholder={"fake"} className={"input"} {...form.register("inventory")}/>
                    {form.formState.errors.inventory && <span className={"form-error"}>{form.formState.errors.inventory.message}</span>}
                </div>

                <div className={"input-group"}>
                    <label className={"label"} htmlFor={"product_category_id"}>کد دسته بندی محصول</label>
                    <input placeholder={"fake"} className={"input"} {...form.register("product_category_id")}/>
                    {form.formState.errors.product_category_id &&
                        <span className={"form-error"}>{form.formState.errors.product_category_id.message}</span>}
                </div>

                <div className={"flex flex-row flex-wrap items-center gap-2 justify-end p-2 w-full"}>
                    <span className={"flex-grow bg-white"}></span>
                    <button
                        className={"bg-white border border-black p-2 block " +
                            "rounded-lg flex-grow flex flex-row items-center " +
                            "hover:bg-slate-200 transition-all duration-200 delay-75 ease-in"}
                        type={"button"} onClick={() => {
                        handleShowForm(false);
                        handleCurrentId(null);
                    }}>لغو و بازگشت
                    </button>
                    <button
                        className={"bg-blue-800 text-white rounded-lg p-2 block " +
                            "flex flex-row flex-grow justify-between items-center " +
                            "hover:bg-blue-600 transition-all duration-200 ease-in delay-75"} type={"submit"}
                    >
                        افزودن محصول<FaArrowLeftLong/></button>
                </div>
            </form>
        </div>
    );
}