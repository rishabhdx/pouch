import { IncomingHttpHeaders } from "http";

export const getHeaders = (headers: IncomingHttpHeaders) => {
  return new Headers(
    Object.entries(headers).map(([key, value]) => [key, value as string])
  );
};
