import { useJwt } from "./UserStore";
import axios from 'axios';
import { useEffect, useState } from "react";
import { useFlashMessage } from "./FlashMessageStore";
import { useLocation } from "wouter";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


export default function Profile() {

    const { getJwt, setJwt } = useJwt();
    const [initialValues, setInitialValues] = useState({});
    const { showMessage } = useFlashMessage();
    const [, setLocation] = useLocation();
    const token = getJwt();

    // useEffect for getting the user's data when the component mounts
    useEffect(() => {
        if (!token) {
            showMessage("You must be logged in", "danger");
            setLocation('/login');
        } else {

            const fetchData = async () => {
                // To provide the JWT, second argument to axios.get is a configuration object
                // There must be a `headers` key with an `Authorization` key and then `Bearer <token>`
                const response = await axios.get(import.meta.env.VITE_API_URL + "/api/users/me", {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                    .catch(function (e) {
                        showMessage("Please login again", "danger");
                        setLocation("/");
                    });
                setInitialValues({
                    ...response.data.user,
                    // because in the database it's not stord as marketingPreferences
                    // so we need to clone the user preferencs (and its string value in the preference key)
                    // into marketingPreferences
                    marketingPreferences: response.data.user.preferences.map(p => p.preference)
                });

            }
            fetchData();


        }
    }, [])


    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        salutation: Yup.string(),
        country: Yup.string(),
    });

    const handleSubmit = async (values) => {
        if (!token) {
            showMessage("You need to be logged in to make the change", "danger");
            setLocation("/login");
        } else {
            await axios.put(import.meta.env.VITE_API_URL + "/api/users/me", values, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            .catch((e) => {
                showMessage("Error updating your user profile");
            });

            showMessage("Your profile has been updated!", "success");
        }
    }

    const handleDeleteAccount = async () =>{
        const confirmDelete = confirm("Are you sure?");
        if (confirmDelete) {
            axios.delete(import.meta.env.VITE_API_URL + "/api/users/me", {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            showMessage("Your account has been deleted", "success");
            setJwt(null);
            setLocation("/register");
            
        }
    }


    return (<div className="container">
        <h1>User Profile</h1>
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize // Allows form to reinitialize with fetched profile data
        >
            {function (formik) {
                return (
                    <Form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <Field type="text" id="name" name="name" className="form-control" />
                            <ErrorMessage name="name" component="div" className="text-danger" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <Field type="email" id="email" name="email" className="form-control" />
                            <ErrorMessage name="email" component="div" className="text-danger" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="salutation" className="form-label">Salutation</label>
                            <Field as="select" id="salutation" name="salutation" className="form-control">
                                <option value="">Select</option>
                                <option value="Mr">Mr.</option>
                                <option value="Ms">Ms.</option>
                                <option value="Mrs">Mrs.</option>
                                <option value="Dr">Dr.</option>
                            </Field>
                            <ErrorMessage name="salutation" component="div" className="text-danger" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="marketingPreferences" className="form-label">Marketing Preferences</label>
                            <Field as="select" id="marketingPreferences" name="marketingPreferences" multiple className="form-control">
                                <option value="email">Email</option>
                                <option value="sms">SMS</option>
                            </Field>
                            <ErrorMessage name="marketingPreferences" component="div" className="text-danger" />
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
                            <ErrorMessage name="country" component="div" className="text-danger" />
                        </div>

                        {formik.errors.submit && <div className="alert alert-danger">{formik.errors.submit}</div>}

                        <button type="submit" className="btn btn-primary mb-2 mt-2" disabled={formik.isSubmitting}>
                            {formik.isSubmitting ? 'Updating...' : 'Update Profile'}
                        </button>
                        <a className="btn btn-danger me-2 ms-2 mb-2 mt-2" onClick={handleDeleteAccount}>Delete</a>
                    </Form>
                );
            }}
        </Formik>
    </div>)

}