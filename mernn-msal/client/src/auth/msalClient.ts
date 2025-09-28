// src/auth/msalClient.ts
import PublicClientApplication, {
  MSALConfiguration,
  MSALInteractiveParams,
  MSALResult,
} from "react-native-msal";

const TENANT_SUBDOMAIN = "wireserverscustomers";
const TENANT_ID = "36c719fe-966c-4780-bce5-3a856b21a634";
const MOBILE_CLIENT_ID = "dd250da0-87d8-48a8-9942-b1fc0889b96e";
const API_CLIENT_ID = "e4b9793b-b831-4212-b942-08d6218f47d6";

const authority = `https://${TENANT_SUBDOMAIN}.ciamlogin.com/${TENANT_ID}`; // External ID authority

const config: MSALConfiguration = {
  auth: {
    clientId: MOBILE_CLIENT_ID,
    authority, // default authority for acquireToken
  },
};

export const apiScopes = [
  `api://${API_CLIENT_ID}/Foods.Read`,
  `api://${API_CLIENT_ID}/Foods.Write`,
  "openid",
  "offline_access",
];

export const pca = new PublicClientApplication(config);

export async function loginAndGetToken(): Promise<MSALResult> {
  await pca.init();
  const params: MSALInteractiveParams = { scopes: apiScopes };
  const result = await pca.acquireToken(params);
  if (!result) {
    throw new Error('Authentication failed');
  }
  return result;
}
