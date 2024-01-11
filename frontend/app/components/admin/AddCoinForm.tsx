import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

interface FormValues {
  title: string;
  image: string;
  prizeWithoutShipping: number;
  prizeWithShipping: number;
  shortDescription: string;
  quantityInStock: number;
  material: string;
  extendedDescription: string;
}

const CoinAddSchema = Yup.object().shape({
  title: Yup.string()
    .transform(value => value.replace(/\s/g, ''))
    .matches(/^[a-zA-Z0-9\s]*$/, 'cannot contain special characters')
    .required('Required'),
  image: Yup.string()
    .required('Required'),
  prizeWithoutShipping: Yup.number()
    .min(100, 'Price cannot be less than 100')
    .max(10000, 'Price cannot be more than 10000')
    .required('Required'),
  prizeWithShipping: Yup.number()
    .min(100, 'Price cannot be less than 100')
    .max(10000, 'Price cannot be more than 10000')
    .required('Required'),
  shortDescription: Yup.string()
    .matches(/^[a-zA-Z0-9\s]*$/, 'Description cannot contain special characters')
    .required('Required'),
  quantityInStock: Yup.number()
    .min(1, 'Quantity cannot be negative')
    .max(10000, 'Quantity cannot be more than 10000')
    .required('Required'),
  material: Yup.string()
    .required('Required'),
  extendedDescription: Yup.string()
    .matches(/^[a-zA-Z0-9\s]*$/, 'Description cannot contain special characters')
    .required('Required'),
});

const AddCoinForm: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-screen ">
    <div className="w-full max-w-md p-8 m-4 bg-white rounded shadow-md">
      <h1 className="mb-4 text-2xl font-bold text-center">Add Coin</h1>    <Formik
        initialValues={{
          title: '',
          image: '',
          prizeWithoutShipping: 0,
          prizeWithShipping: 0,
          shortDescription: '',
          quantityInStock: 0,
          material: '',
          extendedDescription: '',
        }}
        validationSchema={CoinAddSchema}
        onSubmit={(values: FormValues, { resetForm }) => {
          fetch('http://localhost:3001/api/addCoin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(data => {
              console.log(data);
              alert('Form submitted successfully');
              resetForm();
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        }}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col space-y-4">
            <label className="font-bold">Title</label>
            <Field name="title" className="px-3 py-2 border rounded-md" />
            {errors.title && touched.title ? <div className="text-red-500">{errors.title}</div> : null}

            <label className="font-bold">Image</label>
            <Field name="image" className="px-3 py-2 border rounded-md" />
            {errors.image && touched.image ? <div className="text-red-500">{errors.image}</div> : null}

            <label className="font-bold">Price Without Shipping</label>
            <Field name="prizeWithoutShipping" type="number" className="px-3 py-2 border rounded-md" />
            {errors.prizeWithoutShipping && touched.prizeWithoutShipping ? <div className="text-red-500">{errors.prizeWithoutShipping}</div> : null}

            <label className="font-bold">Price With Shipping</label>
            <Field name="prizeWithShipping" type="number" className="px-3 py-2 border rounded-md" />
            {errors.prizeWithShipping && touched.prizeWithShipping ? <div className="text-red-500">{errors.prizeWithShipping}</div> : null}

            <label className="font-bold">Short Description</label>
            <Field name="shortDescription" className="px-3 py-2 border rounded-md" />
            {errors.shortDescription && touched.shortDescription ? <div className="text-red-500">{errors.shortDescription}</div> : null}

            <label className="font-bold">Quantity In Stock</label>
            <Field name="quantityInStock" type="number" className="px-3 py-2 border rounded-md" />
            {errors.quantityInStock && touched.quantityInStock ? <div className="text-red-500">{errors.quantityInStock}</div> : null}

            <label className="font-bold">Material</label>
            <Field as="select" name="material" className="px-3 py-2 border rounded-md">
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
            </Field>
            {errors.material && touched.material ? <div className="text-red-500">{errors.material}</div> : null}

            <label className="font-bold">Extended Description</label>
            <Field name="extendedDescription" className="px-3 py-2 border rounded-md" />
            {errors.extendedDescription && touched.extendedDescription ? <div className="text-red-500">{errors.extendedDescription}</div> : null}

            <button type="submit" className="px-3 py-2 mt-4 font-bold text-white bg-blue-500 rounded-md">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  </div>
);

export default AddCoinForm;