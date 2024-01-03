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
    .min(0, 'Quantity cannot be negative')
    .max(10000, 'Quantity cannot be more than 10000')
    .required('Required'),
  material: Yup.string()
    .required('Required'),
  extendedDescription: Yup.string()
    .matches(/^[a-zA-Z0-9\s]*$/, 'Description cannot contain special characters')
    .required('Required'),
});

const AddCoinForm: React.FC = () => (
  <div>
    <h1>Add Coin</h1>
    <Formik
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
        <Form style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', margin: '0 auto' }}>
        <label>Title</label>
        <Field name="title" style={{ marginBottom: '10px' }}/>
        {errors.title && touched.title ? <div>{errors.title}</div> : null}
        <label>Image</label>
        <Field name="image" style={{ marginBottom: '10px' }}/>
        {errors.image && touched.image ? <div>{errors.image}</div> : null}
        <label>Price Without Shipping</label>
        <Field name="prizeWithoutShipping" type="number" style={{ marginBottom: '10px' }}/>
        {errors.prizeWithoutShipping && touched.prizeWithoutShipping ? <div>{errors.prizeWithoutShipping}</div> : null}
        <label>Price With Shipping</label>
        <Field name="prizeWithShipping" type="number" style={{ marginBottom: '10px' }}/>
        {errors.prizeWithShipping && touched.prizeWithShipping ? <div>{errors.prizeWithShipping}</div> : null}
        <label>Short Description</label>
        <Field name="shortDescription" style={{ marginBottom: '10px' }}/>
        {errors.shortDescription && touched.shortDescription ? <div>{errors.shortDescription}</div> : null}
        <label>Quantity In Stock</label>
        <Field name="quantityInStock" type="number" style={{ marginBottom: '10px' }}/>
        {errors.quantityInStock && touched.quantityInStock ? <div>{errors.quantityInStock}</div> : null}
        <label>Material</label>
        <Field as="select" name="material" style={{ marginBottom: '10px' }}>
        <option value="Gold">Gold</option>
        <option value="Silver">Silver</option>
        </Field>
        {errors.material && touched.material ? <div>{errors.material}</div> : null}
        <label>Extended Description</label>
        <Field name="extendedDescription" style={{ marginBottom: '10px' }}/>
        {errors.extendedDescription && touched.extendedDescription ? <div>{errors.extendedDescription}</div> : null}
        <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
);

export default AddCoinForm;