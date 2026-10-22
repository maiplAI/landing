import { createStart, createMiddleware } from "@tanstack/react-start";

import { PLATFORM_URL } from "./lib/platform";
import { renderErrorPage } from "./lib/error-page";

// The platform lived on this domain until 2026-10-22 and now runs at
// PLATFORM_URL. Its old links (sign-in, the app, OAuth callbacks) are sent
// there with the same path and query, so bookmarks and saved links keep working.
const PLATFORM_PATHS = ["/login", "/maiplai", "/admin", "/connect", "/account", "/workflows", "/workflow", "/vertical"];
const PLATFORM_PREFIXES = ["/api/oauth/", "/api/public/"];

const platformRedirect = createMiddleware().server(async ({ next, request }) => {
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/+$/, "") || "/";
  if (PLATFORM_PATHS.includes(path) || PLATFORM_PREFIXES.some((p) => url.pathname.startsWith(p))) {
    return new Response(null, {
      status: 301,
      headers: { location: `${PLATFORM_URL}${url.pathname}${url.search}` },
    });
  }
  return next();
});

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

export const startInstance = createStart(() => ({
  requestMiddleware: [platformRedirect, errorMiddleware],
  functionMiddleware: [],
}));
