import createAuth0Client, { User } from "@auth0/auth0-spa-js";
import {decode} from 'jsonwebtoken';

export const makeAuthClient = () => createAuth0Client({
    domain: 'dev-jimp.au.auth0.com',
    client_id: 'OMyuDzVYxsE22LbN7lGAHJbTjH9XmuEC',
    redirect_uri: "https://reactoddhours.com:3000/login/callback",
    audience: 'https://api.reactoddhours.com/'
});

export async function getCurrentUser(): Promise<AppUser | undefined> {
    const authClient = await makeAuthClient();
    const user = await authClient.getUser();
    if (user == null) return undefined;

    const authToken = await authClient.getTokenSilently();
    return {
        name: user.name ?? 'Unnamed',
        picture: user.picture,
        permissions: decodeToken(authToken),
        authToken,
    }
}
export type Permission = 'photo:search' | 'photo:view' | 'photo:rotate';
export type AppUser = {
    name: string,
    picture?: string,
    permissions: Permission[],
    authToken: string,
}

function decodeToken(raw?: string): Permission[] {
    const payload = decode(raw ?? '');
    if (payload == null || typeof payload === 'string') {
        return [];
    }

    return (payload ?? {}).permissions;
}
