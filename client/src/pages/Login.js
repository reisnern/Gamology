import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';

import Auth from "../utils/auth";
import { LOGIN } from "../utils/mutations";

function Login(props) {
    const [formState, setFormState] = useState({ email: '', password: '' })
    const [login, { error }] = useMutation(LOGIN);
  
    const submitForm = async event => {
        event.preventDefault();

        try {
            const mutationResponse = await login({ variables: { email: formState.email, password: formState.password } })
            const token = mutationResponse.data.login.token;

            Auth.login(token);
        } catch (error) {
            console.log("Error: " + error);
        }
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
            <h2>Login</h2>

            <form onSubmit={submitForm}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input id="email" name="email" type="email" onChange={change}/>
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input id="password" name="password" type="password" onChange={change}/>
                </div>

                <button onClick={Login} type="submit">Submit</button>
            </form>

            <Link to="/signup">Actually Lets Sign Up Instead</Link>
        </div>
    );
}

export default Login;