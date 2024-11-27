import React from "react";
import * as yup from 'yup';
import {useForm} from "react-hook-form";

export const AddForm = ({data, handleShowForm, handleCurrentId}) => {
    const form = useForm({
        defaultValues: {
            title: data === null ? "" : data.title,
            product_id: data === null ? "" : data.product,
            description: data === null ? "" : data.product,
            is_active: data === null ? false : data.is_active,
            price_toman: data === null ? 0 : data.price_toman,
            discount_precent: data === null ? 0 : data.discount_precent,
            inventory: data === null ? 0 : data.inventory,
            product_category_id: data === null ? 1 : data.product_category_id,
        },
        schema: yup.object().shape({
            title: yup.string().required("This field is required."),
            description: yup.string().required("This field is required."),
            product_id: yup.string().required("This field is required."),
            is_active: yup.boolean().required("This field is required."),
            price_toman: yup.number().positive("The value must be a positive integer.").required("This field is required."),
            discount_precent: yup.number()
                .positive("The value must be a positive integer.")
                .min(0, "The value must be more than or equal to 0.")
                .max(100, "The value must be less than or equal to 100.").required("This field is required."),
            inventory: yup.number().positive("The value must be a positive integer.").required("This field is required."),
            product_category_id: yup.number().positive("The value must be a positive integer.").required("This field is required."),
        }),
    });

    const handleSubmit = async (values) => {
        if (data) {
            const response = await fetch('https://api.shahrebar.ir/api/v1/products/' + data.product_id + '/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer 9|2lvEO3R6TSN8zu7pFGNJbCR0DIDklXLsEjz4ooL1730496b4"
                },
                body: JSON.stringify(values)
            });
        } else {
            const response = await fetch('https://api.shahrebar.ir/api/v1/products/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer 9|2lvEO3R6TSN8zu7pFGNJbCR0DIDklXLsEjz4ooL1730496b4"
                },
                body: JSON.stringify(values)
            });
        }
        handleShowForm(false);
        handleCurrentId(null);
        window.location = '/';
    }

    return (
        <form className={"flex flex-col gap-2 p-2 m-2"} onSubmit={form.handleSubmit(handleSubmit)}>
            <div>
                <label htmlFor={"title"}>عنوان:</label>
                <input {...form.register("title")}/>
                {form.formState.errors.title && <span>{form.formState.errors.title}</span>}
            </div>

            <div>
                <label htmlFor={"product_id"}>کد محصول:</label>
                <input {...form.register("product_id")}/>
                {form.formState.errors.product_id && <span>{form.formState.errors.product_id}</span>}
            </div>

            <div>
                <label htmlFor={"description"}>توضیحات:</label>
                <input {...form.register("description")}/>
                {form.formState.errors.description && <span>{form.formState.errors.description}</span>}
            </div>

            <div>
                <label htmlFor={"is_active"}>وضعیت فعال بودن:</label>
                <select {...form.register("is_active")}>
                    <option label={"فعال"} value={true}></option>
                    <option label={"غیر فعال"} value={false}></option>
                </select>
                {form.formState.errors.is_active && <span>{form.formState.errors.is_active}</span>}
            </div>

            <div>
                <label htmlFor={"price_toman"}>مبلغ (تومان):</label>
                <input {...form.register("price_toman")}/>
                {form.formState.errors.price_toman && <span>{form.formState.errors.price_toman}</span>}
            </div>

            <div>
                <label htmlFor={"discount_precent"}>درصد تخفیف:</label>
                <input {...form.register("discount_precent")}/>
                {form.formState.errors.discount_precent && <span>{form.formState.errors.discount_precent}</span>}
            </div>

            <div>
                <label htmlFor={"inventory"}>موجودی:</label>
                <input {...form.register("inventory")}/>
                {form.formState.errors.inventory && <span>{form.formState.errors.inventory}</span>}
            </div>

            <div>
                <label htmlFor={"product_category_id"}>کد دسته بندی محصول:</label>
                <input {...form.register("product_category_id")}/>
                {form.formState.errors.product_category_id && <span>{form.formState.errors.product_category_id}</span>}
            </div>

            <button className={"bg-green-700 text-black"} type={"submit"} >اعمال</button>
        </form>
    );
}