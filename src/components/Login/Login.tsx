import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

// interface ILoginProps {
//     setToken:  React.Dispatch<React.SetStateAction<undefined>a>;
// }

const Login: React.FC = (): JSX.Element => {
    const { loginWithRedirect } = useAuth0();
    return (
        <button onClick={() => loginWithRedirect()}>Log In</button>
    );
};

export default Login;