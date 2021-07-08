import { AuthenticationError } from "@auth0/auth0-spa-js";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AppUser, makeAuthClient } from "./auth";
import { AppState, LoadUserAction } from "./store";

type Props = { user?: AppUser, loadUser: () => LoadUserAction };
const LogInCallbackInner = ({ loadUser, user }: Props) => {
    const history = useHistory();
    const location = useLocation();
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (user != null) {
            window.history.replaceState(null, '', `/#/${location.pathname}`);
            history.push('/search');
            return;
        }
    }, [user]);

    useEffect(() => {        
        (async () => {
            const authClient = await makeAuthClient();
            authClient.handleRedirectCallback()
                .then(() => {
                    loadUser();
                })
                .catch((err: AuthenticationError) => setError(err));
        })();
    }, []);

    return error 
        ? <p>Log in failed. Error: {error.message}</p> 
        : <p>
            You have logged in. 
            Click <Link to="/search">here</Link> to search for photos
        </p>
};

export const LogInCallback = connect((state: AppState) => ({
    user: state.user
}), {
    loadUser: () => ({ type: 'loadUser' }) as LoadUserAction
})(LogInCallbackInner);