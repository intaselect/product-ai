let cachedToken = "";
let cachedUntil = 0;

export async function getAmazonAccessToken() {
  const now = Date.now();

  if (cachedToken && cachedUntil > now + 60_000) {
    return cachedToken;
  }

  const clientId = process.env.AMAZON_CLIENT_ID;
  const clientSecret = process.env.AMAZON_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("AMAZON_CLIENT_ID أو AMAZON_CLIENT_SECRET غير موجود");
  }

  const tokenUrl =
    process.env.AMAZON_CREATORS_TOKEN_URL ||
    "https://api.amazon.com/auth/o2/token";

  const res = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    }),
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data?.error_description ||
        data?.error ||
        `Amazon token failed ${res.status}`
    );
  }

  cachedToken = data.access_token;
  cachedUntil = now + Number(data.expires_in || 3600) * 1000;

  return cachedToken;
}