// Preloaded into the server under test (node -r ./test/mock-oauth.cjs server.js): answers the Google / Facebook
// token and profile calls locally so the OAuth callbacks can be exercised without the real providers.
// Everything else goes to the real fetch (e.g. the Moyasar mock). Not a dependency of the app.
"use strict";
const real = global.fetch;
const J = o => new Response(JSON.stringify(o), { status: 200, headers: { "Content-Type": "application/json" } });
global.fetch = async (url, opt) => {
  const u = String(url);
  if (u.startsWith("https://oauth2.googleapis.com/token")) return J({ access_token: "gat" });
  if (u.startsWith("https://openidconnect.googleapis.com/v1/userinfo")) return J({ sub: process.env.MOCK_GOOGLE_SUB || "g-123", email: process.env.MOCK_GOOGLE_EMAIL || "social.student@test.com", email_verified: true, name: "نورة القحطاني" });
  if (u.includes("graph.facebook.com") && u.includes("oauth/access_token")) return J({ access_token: "fat" });
  if (u.includes("graph.facebook.com") && u.includes("/me?")) return J({ id: "f-9", name: "Fahad" }); // no email permission
  return real(url, opt);
};
