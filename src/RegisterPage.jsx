import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup'  // all functions from the `yup` package are available in the Yup object
import { useFlashMessage } from './FlashMessageStore';
import { useLocation } from 'wouter';

function RegisterPage() {

    const {showMessage} = useFlashMessage();
    const [_, setLocation] = useLocation();

    const validationSchema = Yup.object({
        'name': Yup.string().required("Name is required"),
        'email': Yup.string().email("Please provide a valid email address").required('Email is required'),
        'password': Yup.string()
            .min(4, "Passwords must be at least 4 characters")
            // .matches(
            //     /^(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?=.*[A-Z]).+$/,
            //     'Must contain at least one special character and one uppercase letter'
            // )
            .required("Password is required"),
        'confirmPassword': Yup.string().oneOf([Yup.ref('password'), null]).required('Please confirm your password'),
        'salutation': Yup.string().required('Salutation is required'),
        'country': Yup.string().required('Country is required')
    })


    // create an object to store initial values for each of the form field
    const initialValues = {
        name: "",
        email: "",
        password: "",
        salutation: "",
        marketingPreferences: [],
        country: ''
    }

    // to handle the submission of the form
    const handleSubmit = (values, formikHelpers) => {
        // formikHelpers is an object that contains useful functions for form processing
        console.log("form values =>", values);

        // imagine: a RESTFUL API ENDPOINT WITH await axios
        setTimeout(function () {
            formikHelpers.setSubmitting(false); // indicate we have finished processing the submission of the form
            showMessage("You have been registered!", "success");
            setLocation("/");
        }, 500)



    }

    return (
        <div className="container mt-5">
            <h1>Register</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                {
                    (formik) => (<Form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <Field type="text" className="form-control" id="name" name="name" />
                            {formik.errors.name && formik.touched.name && <div className="text-danger">{formik.errors.name}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <Field type="email" className="form-control" id="email" name="email" />
                            {formik.errors.email && formik.touched.email && <div className="text-danger">{formik.errors.email}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <Field type="password" className="form-control" id="password" name="password" />
                            {formik.errors.password && formik.touched.password && <div className="text-danger">{formik.errors.password}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <Field type="password" className="form-control" id="confirmPassword" name="confirmPassword" />
                            {formik.errors.confirmPassword && formik.touched.confirmPassword && <div className="text-danger">{formik.errors.confirmPassword}</div>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Salutation</label>
                            <div>
                                <div className="form-check form-check-inline">
                                    <Field className="form-check-input" type="radio" name="salutation" id="mr" value="Mr" />
                                    <label className="form-check-label" htmlFor="mr">Mr</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <Field className="form-check-input" type="radio" name="salutation" id="ms" value="Ms" />
                                    <label className="form-check-label" htmlFor="ms">Ms</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <Field className="form-check-input" type="radio" name="salutation" id="mrs" value="Mrs" />
                                    <label className="form-check-label" htmlFor="mrs">Mrs</label>
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Marketing Preferences</label>
                            <div className="form-check">
                                <Field className="form-check-input" value="marketing" type="checkbox" id="emailMarketing" name="marketingPreferences" />
                                <label className="form-check-label" htmlFor="emailMarketing" >Email Marketing</label>
                            </div>
                            <div className="form-check">
                                <Field className="form-check-input" value="sms" type="checkbox" id="smsMarketing" name="marketingPreferences" />
                                <label className="form-check-label" htmlFor="smsMarketing">SMS Marketing</label>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="country" className="form-label">Country</label>
                            <Field as="select" className="form-select" id="country" name="country">
                                <option value="">Select Country</option>
                                <option value="sg">Singapore</option>
                                <option value="my">Malaysia</option>
                                <option value="in">Indonesia</option>
                                <option value="th">Thailand</option>
                            </Field>
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>Register</button>
                    </Form>
                    )
                }
            </Formik>

        </div>
    );
}

export default RegisterPage;