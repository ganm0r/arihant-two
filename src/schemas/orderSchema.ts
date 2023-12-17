import * as Yup from "yup";

const OrderSchema = Yup.object().shape({
    invoice: Yup.string().required("Invoice is required"),
    price: Yup.number().required("Price is required").positive("Price must be positive").integer("Price must be an integer").min(500, "Price has to be greater than 499 to spin"),
    name: Yup.string().required("Name is required").min(2, "Name must be at least 2 characters"),
    phone: Yup.string().required("Phone is required").matches(/^[0-9]+$/, "Phone must be a valid phone number"),
    email: Yup.string().required("Email is required").email("Email must be a valid email address"),
});

export { OrderSchema };