import { getAmazonAccessToken } from "./token";
import {
  AMAZON_CREDENTIAL_VERSION,
  AMAZON_SA_CURRENCY,
  AMAZON_SA_LANGUAGE,
  AMAZON_SA_MARKETPLACE,
  getAmazonApiBase,
  getAmazonSaTag,
} from "./config";

export async function amazonSaRequest(path: string, payload: Record<string, any>) {
  const token = await getAmazonAccessToken();

  const res = await fetch(`${getAmazonApiBase()}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}, Version ${AMAZON_CREDENTIAL_VERSION}`,
      "Content-Type": "application/json",
      "x-marketplace": AMAZON_SA_MARKETPLACE,
    },
    body: JSON.stringify({
      marketplace: AMAZON_SA_MARKETPLACE,
      partnerTag: getAmazonSaTag(),
      languagesOfPreference: [AMAZON_SA_LANGUAGE],
      currencyOfPreference: AMAZON_SA_CURRENCY,
      ...payload,
    }),
    cache: "no-store",
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(
      data?.message ||
        data?.error_description ||
        data?.error ||
        `Amazon API failed ${res.status}`
    );
  }

  return data;
}