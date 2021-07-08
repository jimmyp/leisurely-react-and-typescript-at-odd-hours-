import { useEffect } from "react";
import { makeAuthClient } from "./auth";

export const LogIn = () => {
    useEffect(() => {
        (async () => {
            const authClient = await makeAuthClient();
            await authClient.loginWithRedirect();
        })();
    }, []);

    return <p>Redirecting to log in</p>;
};