// services/auth.services.tsx
import React, { createContext, useContext, useState } from "react";
import * as AuthSession from "expo-auth-session";
import { Platform } from "react-native";

const AuthContext = createContext({});

const MICROSOFT_CLIENT_ID = process.env.ENTRA_CLIENT_ID || "<your_client_id>";
const TENANT_ID = process.env.ENTRA_TENANT_ID || "<your_tenant_id>";
const REDIRECT_URI = AuthSession.makeRedirectUri();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    async function signInWithMicrosoft() {
        const discovery = {
            authorizationEndpoint: `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/authorize`,
            tokenEndpoint: `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`,
        };

        const result = await AuthSession.startAsync({
            authUrl:
                `${discovery.authorizationEndpoint}` +
                `?client_id=${MICROSOFT_CLIENT_ID}` +
                `&response_type=token` +
                `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
                `&scope=openid+profile+email`,
        });

        if (result.type === "success" && result.params.access_token) {
            setUser({ token: result.params.access_token });
            // Optionally: fetch user profile here with the token
        }
    }

    function signOut() {
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, signInWithMicrosoft, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    return useContext(AuthContext);
}
