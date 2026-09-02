// (c) Copyright Ascensio System SIA 2009-2026
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0

/**
 * The portal API as a plugin sees it: the client every request goes through,
 * the options a request takes, and the error a failure arrives as.
 *
 * The client itself comes from [`usePluginAPI`](hooks.md#usepluginapi) — these
 * types document what it accepts and what it rejects with.
 *
 * @packageDocumentation
 */

export type PluginApiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

/**
 * Typed HTTP client scoped to the current portal.
 * All requests go through the portal's own HTTP layer, which authenticates them,
 * so no credentials need to be handled by the plugin.
 * The base URL already includes the API prefix, so paths are relative to it,
 * e.g. `"/files/@my"` not `"/api/2.0/files/@my"`.
 * Returned by [`usePluginAPI`](hooks.md#usepluginapi).
 *
 * Every helper resolves to the payload itself: the `response` field the portal
 * wraps its answers in is unwrapped, and a list endpoint that reports a total
 * resolves to `{ total, items }`. Failures reject with a
 * [`PluginApiError`](#pluginapierror).
 *
 * @example
 * ```tsx
 * type MyDocuments = { files: { id: number; title: string }[] };
 *
 * function FileList() {
 *   const api = usePluginAPI();
 *   const [files, setFiles] = useState<MyDocuments["files"]>([]);
 *
 *   useEffect(() => {
 *     const controller = new AbortController();
 *     api
 *       .get<MyDocuments>("/files/@my", { count: 20 }, { signal: controller.signal })
 *       .then((folder) => setFiles(folder.files));
 *     return () => controller.abort();
 *   }, []);
 *
 *   return <ul>{files.map((f) => <li key={f.id}>{f.title}</li>)}</ul>;
 * }
 * ```
 */
export interface PluginAPIClient {
  /**
   * Send a request described in full. The helpers below cover the common
   * cases; reach for this one when a request needs a method, a body and query
   * parameters at the same time.
   *
   * @typeParam T - Expected payload type.
   * @param options - The request to send.
   *
   * @example
   * ```ts
   * const operations = await api.request<Operation[]>({
   *   method: "PUT",
   *   path: "/files/fileops/delete",
   *   data: { fileIds: [1, 2], folderIds: [] },
   *   params: { returnSingleOperation: true },
   * });
   * ```
   */
  request<T = unknown>(options: PluginApiRequest): Promise<T>;

  /**
   * Send a GET request to the portal API.
   *
   * @typeParam T - Expected payload type.
   * @param path - API path relative to the base URL, e.g. `"/files/@my"`.
   * @param params - Query string parameters. Merged with `options.params`,
   *   which loses on a conflict.
   * @param options - Headers and abort signal.
   *
   * @example
   * ```ts
   * const rooms = await api.get<{ folders: Room[] }>("/files/rooms");
   * ```
   */
  get<T = unknown>(
    path: string,
    params?: Record<string, unknown>,
    options?: PluginApiOptions,
  ): Promise<T>;

  /**
   * Send a POST request to the portal API.
   *
   * @typeParam T - Expected payload type.
   * @param path - API path relative to the base URL.
   * @param data - Request body (JSON-serialisable).
   * @param options - Query parameters, headers and abort signal.
   *
   * @example
   * ```ts
   * const file = await api.post<FileDto>(`/files/${folderId}/file`, { title });
   * ```
   */
  post<T = unknown>(
    path: string,
    data?: unknown,
    options?: PluginApiOptions,
  ): Promise<T>;

  /**
   * Send a PUT request to the portal API.
   *
   * @typeParam T - Expected payload type.
   * @param path - API path relative to the base URL.
   * @param data - Request body (JSON-serialisable).
   * @param options - Query parameters, headers and abort signal.
   */
  put<T = unknown>(
    path: string,
    data?: unknown,
    options?: PluginApiOptions,
  ): Promise<T>;

  /**
   * Send a PATCH request to the portal API.
   *
   * @typeParam T - Expected payload type.
   * @param path - API path relative to the base URL.
   * @param data - Request body (JSON-serialisable).
   * @param options - Query parameters, headers and abort signal.
   */
  patch<T = unknown>(
    path: string,
    data?: unknown,
    options?: PluginApiOptions,
  ): Promise<T>;

  /**
   * Send a DELETE request to the portal API.
   *
   * @typeParam T - Expected payload type.
   * @param path - API path relative to the base URL.
   * @param data - Request body (JSON-serialisable). Endpoints such as
   *   `DELETE /files/file/{id}` declare a required body, so it is sent for
   *   `DELETE` as it is for `PUT`.
   * @param options - Query parameters, headers and abort signal.
   *
   * @example
   * ```ts
   * await api.delete(`/files/file/${id}`, { deleteAfter: false, immediately: false });
   * ```
   */
  delete<T = unknown>(
    path: string,
    data?: unknown,
    options?: PluginApiOptions,
  ): Promise<T>;
}

/**
 * The parts of a request that every method takes, whichever helper sends it.
 *
 * Passed as the last argument of [`get`](#get), [`post`](#post) and the other
 * helpers on [`PluginAPIClient`](#pluginapiclient), and inline in
 * [`request`](#request).
 */
export interface PluginApiOptions {
  /**
   * Query string parameters. `undefined` and `null` values are dropped rather
   * than sent as empty strings.
   */
  params?: Record<string, unknown>;

  /**
   * Extra request headers. Authentication headers are added by ONLYOFFICE Apps and
   * cannot be overridden here.
   */
  headers?: Record<string, string>;

  /**
   * Cancels the request when the signal is aborted, e.g. from the cleanup
   * function of the `useEffect` that started it. An aborted request rejects
   * with a [`PluginApiError`](#pluginapierror) whose `code` is `"ABORTED"`.
   */
  signal?: AbortSignal;
}

/**
 * One request, described in full. This is what [`request`](#request) takes, and
 * what every other helper on [`PluginAPIClient`](#pluginapiclient) is shorthand
 * for.
 */
export interface PluginApiRequest extends PluginApiOptions {
  /** API path relative to the portal API base URL, e.g. `"/files/@my"`. */
  path: string;

  /** Defaults to `"GET"`. */
  method?: PluginApiMethod;

  /**
   * Request body, JSON-serialisable. Sent with any method that accepts one,
   * `DELETE` included — several portal endpoints require a body on `DELETE`.
   */
  data?: unknown;
}

/**
 * A request that did not succeed.
 *
 * Every rejection from [`PluginAPIClient`](#pluginapiclient) is one of these,
 * so a plugin can branch on `status` instead of digging through whatever the
 * portal's HTTP layer happened to throw.
 *
 * @example
 * ```ts
 * import { isPluginApiError } from "@onlyoffice/docspace-plugin-sdk/react";
 *
 * try {
 *   await api.delete(`/files/file/${id}`, { deleteAfter: false });
 * } catch (error) {
 *   if (isPluginApiError(error) && error.status === 403) {
 *     showToast({ type: ToastType.error, title: "Not allowed" });
 *     return;
 *   }
 *   throw error;
 * }
 * ```
 */
export interface PluginApiError extends Error {
  name: "PluginApiError";

  /** HTTP status code, or `0` when the request never reached the portal. */
  status: number;

  /**
   * Why the request failed when there is no status to go by: `"ABORTED"` when
   * the `signal` fired, `"NETWORK"` when the request never got an answer,
   * `"INVALID_PATH"` when `path` was rejected before anything was sent.
   */
  code?: "ABORTED" | "NETWORK" | "INVALID_PATH";

  /** The method and path that failed, e.g. `"PUT /files/fileops/delete"`. */
  request: string;

  /** The error payload the portal sent, when it sent one. */
  details?: unknown;
}

/**
 * Tells a failed portal request apart from any other thrown value, and narrows
 * it to [`PluginApiError`](#pluginapierror).
 *
 * A `catch` block sees `unknown`, so the fields worth branching on — `status`
 * above all — are not reachable without a check of some kind. This is that
 * check: it reads the shape rather than the prototype, so it holds for an error
 * that crossed a module boundary on its way to the plugin.
 *
 * @param error - The value caught.
 *
 * @group Utilities
 *
 * @example
 * ```ts
 * import { isPluginApiError } from "@onlyoffice/docspace-plugin-sdk/react";
 *
 * try {
 *   await api.get(`/files/file/${id}`);
 * } catch (error) {
 *   if (isPluginApiError(error) && error.status === 404) return null;
 *   throw error;
 * }
 * ```
 */
export function isPluginApiError(error: unknown): error is PluginApiError {
  return (
    typeof error === "object" &&
    error !== null &&
    (error as { name?: unknown }).name === "PluginApiError" &&
    typeof (error as { status?: unknown }).status === "number"
  );
}
