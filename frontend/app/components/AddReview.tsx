// AddReview.tsx
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001'
  });

interface AddReviewProps {
  coinId: string;
}

const validationSchema = Yup.object().shape({
    user: Yup.string()
      .matches(/^[a-zA-Z0-9]*$/, 'No special characters allowed')
      .required('Required'),
    text: Yup.string()
      .matches(/^[a-zA-Z0-9\s]*$/, 'No special characters allowed')
      .trim('Cannot be only spaces')
      .required('Required'),
    rating: Yup.number()
      .min(1, 'Must be between 1 and 5')
      .max(5, 'Must be between 1 and 5')
      .required('Required'),
  });

function AddReview({ coinId }: AddReviewProps) {
    return (
      <div className="bg-gray-800 text-white p-5 rounded">
        <h2 className="text-2xl mb-5">Add Opinion</h2>
        <Formik
          initialValues={{ user: '', text: '', rating: 0 }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            try {
              const response = await api.post('/addReview', { ...values, coinId });
              console.log(response.data);
              window.location.reload();
            } catch (error) {
              console.error(error);
            }
          }}
        >
          <Form className="flex flex-col max-w-md mx-auto space-y-3">
            <label>
              User:
              <Field type="text" name="user" required className="px-2 py-1 border rounded bg-gray-700 text-white" />
              <ErrorMessage name="user" component="div" />
            </label>
            <label>
              Review:
              <Field as="textarea" name="text" required className="px-2 py-1 border rounded bg-gray-700 text-white" />
              <ErrorMessage name="text" component="div" />
            </label>
            <label>
              Rating:
              <Field type="number" min="1" max="5" name="rating" required className="px-2 py-1 border rounded bg-gray-700 text-white" />
              <ErrorMessage name="rating" component="div" />
            </label>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">Submit Review</button>
          </Form>
        </Formik>
      </div>
    );
  }

export default AddReview;