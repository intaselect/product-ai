import { getAmazonAccessToken } from "./token";
import {
  AMAZON_SA_CURRENCY,
  AMAZON_SA_LANGUAGE,
  AMAZON_SA_MARKETPLACE,
  getAmazonApiBase,
  getAmazonSaTag,
} from "./config";

export async function amazonSaRequest(path: string, payload: Record<string, any>) {
  const token = await getAmazonAccessToken();

  const finalPayload = {
    marketplace: AMAZON_SA_MARKETPLACE,
    partnerTag: getAmazonSaTag(),
    languagesOfPreference: [AMAZON_SA_LANGUAGE],
    currencyOfPreference: AMAZON_SA_CURRENCY,
    ...payload,
  };

  const res = await fetch(`${getAmazonApiBase()}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-marketplace": AMAZON_SA_MARKETPLACE,
    },
    body: JSON.stringify(finalPayload),
    cache: "no-store",
  });

  const text = await res.text();
  let data: any = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { raw: text };
  }

  if (!res.ok) {
    console.error("AMAZON_CREATORS_API_ERROR", {
      status: res.status,
      path,
      payload: finalPayload,
      response: data,
    });

    throw new Error(
      data?.message ||
        data?.error_description ||
        data?.error ||
        data?.errors?.[0]?.message ||
        `Amazon API failed ${res.status}`
    );
  }

  return data;
}