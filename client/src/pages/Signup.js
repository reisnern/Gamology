import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';

import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";

function Signup(props) {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [addUser] = useMutation(ADD_USER);
    const submitForm = async event => {
        event.preventDefault();

        const mutationResponse = await addUser({
            variables: {
                userName: formState.userName,
                email: formState.email,
                password: formState.password
        }
        });
        const token = mutationResponse.data.addUser.token;

        Auth.login(token);
    };
    const change = event => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value
        });
    };
  
    return (
        <div>
            <h2>Sign Up</h2>

            <form onSubmit={submitForm}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input id="username" name="username" type="username" onChange={change}/>
                </div>

                <div>
                    <label htmlFor="email">Email:</label>
                    <input id="email" name="email" type="email" onChange={change}/>
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input id="password" name="password" type="password" onChange={change}/>
                </div>
                
                <button type="submit">Submit</button>
            </form>

            <Link to="/login">Actually Lets Login Instead</Link>
        </div>
    );
}
  
export default Signup;