import * as yup from "yup";

const formAddTransactionSchema = yup.object().shape({
  type: yup.boolean().required("type is required"),
  sum: yup
    .number("enter your sum")
    .min(0, "sum must be positive")
    .required("sum is required"),
  date: yup.string(),
  comment: yup
    .string("enter your comment")
    .max(25, "no more than 25 characters"),
});

export default formAddTransactionSchema;
