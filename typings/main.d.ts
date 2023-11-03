declare module 'har-to-k6' {
  // Standard HAR types
  interface Comment {
    /**
     * A comment provided by the user or the application.
     *
     * @since 1.2
     */
    comment?: string
  }

  /**
   * Name and version info of the log creator application.
   *
   * Creator and browser objects share the same structure.
   */
  export interface Creator extends Comment {
    /**
     *  Name of the application/browser used to export the log.
     */
    name: string

    /**
     *  Version of the application/browser used to export the log.
     */
    version: string
  }

  /**
   * Name and version info of the log browser application.
   *
   * Creator and browser objects share the same structure.
   */
  export type Browser = Creator

  /**
   * This object describes timings for various events (states) fired during the page load. All times are specified in milliseconds. If a time info is not available appropriate field is set to -1.
   *
   *
   */
  export interface PageTimings extends Comment {
    /**
     * Content of the page loaded. Number of milliseconds since page load started (page.startedDateTime). Use -1 if the timing does not apply to the current request.
     *
     * Depending on the browser, onContentLoad represents DOMContentLoad event or document.readyState == interactive.
     */
    onContentLoad: number

    /**
     * Page is loaded (onLoad event fired). Number of milliseconds since page load started (page.startedDateTime). Use -1 if the timing does not apply to the current request.
     */
    onLoad: number
  }

  /**
   * This object represents an exported page.
   */

  export interface Page extends Comment {
    /**
     * Date and time stamp for the beginning of the page load (ISO 8601 - YYYY-MM-DDThh:mm:ss.sTZD, e.g. 2009-07-24T19:20:30.45+01:00).
     */
    startedDateTime: string

    /**
     * Unique identifier of a page within the Log. Entries use it to refer the parent page.
     */
    id: string

    /**
     * Page title.
     */
    title: string

    /**
     * Non-standard property used by the k6 browser recorder.
     */
    url?: string

    /**
     *  Detailed timing info about page load.
     */
    pageTimings: PageTimings
  }

  /**
   * Standard HTTP methods
   */
  export type HTTPMethod =
    | 'OPTIONS'
    | 'GET'
    | 'HEAD'
    | 'PUT'
    | 'POST'
    | 'DELETE'
    | 'PATCH'

  /**
   * This object represents a cookie (used in Request and Response objects).
   */
  export interface Cookie extends Comment {
    /**
     * The name of the cookie.
     */
    name: string

    /**
     * The cookie value.
     */
    value: string

    /**
     * The path pertaining to the cookie.
     */
    path?: string

    /**
     * The host of the cookie.
     */
    domain?: string

    /**
     * Cookie expiration time. (ISO 8601 - YYYY-MM-DDThh:mm:ss.sTZD, e.g. 2009-07-24T19:20:30.123+02:00).
     */
    expires?: string

    /**
     * Set to true if the cookie is HTTP only, false otherwise.
     */
    httpOnly?: boolean

    /**
     * True if the cookie was transmitted over ssl, false otherwise.
     *
     * @since 1.2
     */
    secure?: boolean
  }

  /**
   *
   */
  export interface NameValuePair extends Comment {
    /**
     *
     */
    name: string

    /**
     *
     */
    value: string
  }

  /**
   * This object represents a header (used in Request and Response objects).
   */
  export type Header = NameValuePair

  /**
   * This object represents a parameter & value parsed from a query string (embedded in Request object).
   */
  export type QueryParameter = NameValuePair

  /**
   * A posted parameter (embedded in PostData object).
   */
  export interface Param extends Comment {
    /**
     * Name of a posted parameter.
     */
    name: string

    /**
     * Value of a posted parameter or content of a posted file.
     */
    value?: string

    /**
     * Name of a posted file.
     */
    fileName?: string

    /**
     * Content type of a posted file.
     */
    contentType?: string
  }

  /**
   * This object describes posted data (embedded in Request object).
   *
   * NOTE: The params and text are supposed be mutually exclusive, but browsers
   * do export both regardless. Therefore it's important to check their presence
   * to avoid unintended behavior.
   */
  interface PostData extends Comment {
    /**
     * Mime type of posted data.
     */
    mimeType: string

    /**
     * List of posted parameters (in case of URL encoded parameters).
     */

    params?: Param[]

    /**
     * Plain text posted data.
     */
    text?: string
  }

  /**
   * This object contains detailed info about performed request.
   *
   * @example <caption>The total request size sent can be computed as follows (if both values are available):</caption>
   * var totalSize = entry.request.headersSize + entry.request.bodySize;
   */
  export interface Request extends Comment {
    /**
     * Request method (GET, POST, ...).
     */
    method: HTTPMethod

    /**
     * Absolute URL of the request (fragments are not included).
     */
    url: string

    /**
     * Request HTTP Version.
     */
    httpVersion: string

    /**
     * List of cookie objects.
     */
    cookies: Cookie[]

    /**
     * List of header objects.
     */
    headers: Header[]

    /**
     * List of query parameter objects.
     */
    queryString: QueryParameter[]

    /**
     * Posted data info.
     */
    postData?: PostData

    /**
     * Total number of bytes from the start of the HTTP request message until (and including) the double CRLF before the body. Set to -1 if the info is not available.
     */
    headerSize: number

    /**
     *  Size of the request body (POST data payload) in bytes. Set to -1 if the info is not available.
     */
    bodySize: number
  }

  /**
   * This object describes details about response content (embedded in Response object).
   *
   * Before setting the text field, the HTTP response is decoded (decompressed & unchunked), than trans-coded from its original character set into UTF-8. Additionally, it can be encoded using e.g. base64. Ideally, the application should be able to unencode a base64 blob and get a byte-for-byte identical resource to what the browser operated on.
   *
   * Encoding field is useful for including binary responses (e.g. images) into the HAR file.
   */
  export interface Content extends Comment {
    /**
     * Length of the returned content in bytes. Should be equal to response.bodySize if there is no compression and bigger when the content has been compressed.
     */
    size: number

    /**
     * Number of bytes saved. Leave out this field if the information is not available.
     */
    compression?: number

    /**
     * MIME type of the response text (value of the Content-Type response header). The charset attribute of the MIME type is included (if available).
     */
    mimeType: string

    /**
     * Response body sent from the server or loaded from the browser cache. This field is populated with textual content only. The text field is either HTTP decoded text or a encoded (e.g. "base64") representation of the response body. Leave out this field if the information is not available.
     */
    text?: string

    /**
     * Encoding used for response text field e.g "base64". Leave out this field if the text field is HTTP decoded (decompressed & unchunked), than trans-coded from its original character set into UTF-8.
     *
     * @since 1.2
     */
    encoding?: string
  }

  /**
   * Object used in both beforeRequest and afterRequest of Cache.
   */
  export interface CacheObject extends Comment {
    /**
     * Expiration time of the cache entry.
     */
    expires?: string

    /**
     * The last time the cache entry was opened.
     */
    lastAccess: string

    /**
     * Etag
     */
    eTag: string

    /**
     * The number of times the cache entry has been opened.
     */
    hitCount: number
  }

  /**
   * This objects contains info about a request coming from browser cache.
   */
  export interface Cache extends Comment {
    /**
     * State of a cache entry before the request. Leave out this field if the information is not available.
     */
    beforeRequest?: CacheObject | null

    /**
     * State of a cache entry after the request. Leave out this field if the information is not available.
     */
    afterRequest?: CacheObject | null
  }

  /**
   * This object describes various phases within request-response round trip. All times are specified in milliseconds.
   */
  export interface Timings extends Comment {
    /**
     * Time spent in a queue waiting for a network connection. Use -1 if the timing does not apply to the current request.
     */
    blocked?: number

    /**
     * DNS resolution time. The time required to resolve a host name. Use -1 if the timing does not apply to the current request.
     */
    dns?: number

    /**
     * Time required to create TCP connection. Use -1 if the timing does not apply to the current request.
     */
    connect?: number

    /**
     * Time required to send HTTP request to the server.
     */
    send: number

    /**
     * Waiting for a response from the server.
     */
    wait: number

    /**
     * Time required to read entire response from the server (or cache).
     */
    receive: number

    /**
     * Time required for SSL/TLS negotiation. If this field is defined then the time is also included in the connect field (to ensure backward compatibility with HAR 1.1). Use -1 if the timing does not apply to the current request.
     *
     * @since 1.2
     */
    ssl?: number
  }

  /**
   * This object contains detailed info about the response.
   *
   * @example <caption>The total response size received can be computed as follows (if both values are available):</caption>
   * var totalSize = entry.response.headersSize + entry.response.bodySize;
   */
  export interface Response extends Comment {
    /**
     * Response status.
     */
    status: number

    /**
     *  Response status description.
     */
    statusText: string

    /**
     * Response HTTP Version.
     */
    httpVersion: string

    /**
     * List of cookie objects.
     */
    cookies: Cookie[]

    /**
     * List of header objects.
     */
    headers: Header[]

    /**
     * Details about the response body.
     */
    content: Content

    /**
     * Redirection target URL from the Location response header.
     */
    redirectURL: string

    /**
     * Total number of bytes from the start of the HTTP response message until (and including) the double CRLF before the body. Set to -1 if the info is not available.
     *
     * The size of received response-headers is computed only from headers that are really received from the server. Additional headers appended by the browser are not included in this number, but they appear in the list of header objects.
     */

    headerSize: number

    /**
     * Size of the received response body in bytes. Set to zero in case of responses coming from the cache (304). Set to -1 if the info is not available.
     */
    bodySize: number
  }

  /**
   * This object represents an exported HTTP request.
   */
  export interface Entry {
    /**
     * Reference to the parent page. Leave out this field if the application does not support grouping by pages.
     *
     * Must be unique.
     */
    pageref?: string

    /**
     * Date and time stamp of the request start (ISO 8601 - YYYY-MM-DDThh:mm:ss.sTZD).
     */
    startedDateTime: string

    /**
     * Total elapsed time of the request in milliseconds. This is the sum of all timings available in the timings object (i.e. not including -1 values) .
     */
    time: number

    /**
     * Detailed info about the request.
     */
    request: Request

    /**
     * Detailed info about the response.
     */
    response: Response

    /**
     * Info about cache usage.
     */
    cache?: Cache

    /**
     *  Detailed timing info about request/response round trip.
     */
    timings: Timings

    /**
     * IP address of the server that was connected (result of DNS resolution).
     *
     * @since 1.2
     */
    serverIPAddress?: string

    /**
     * Unique ID of the parent TCP/IP connection, can be the client or server port number. Note that a port number doesn't have to be unique identifier in cases where the port is shared for more connections. If the port isn't available for the application, any other unique connection ID can be used instead (e.g. connection index). Leave out this field if the application doesn't support this info.
     *
     * @since 1.2
     */
    connection?: string
  }

  /**
   * This object represents the root of exported data.
   *
   * There is one Page object for every exported web page and one Entry object for every HTTP request. In case when an HTTP trace tool isn't able to group requests by a page, the pages property is empty and individual requests doesn't have a parent page.
   */
  export interface Log extends Comment {
    /**
     * Version number of the format. If empty, string "1.1" is assumed by default.
     */
    version: '1.2'

    /**
     * Name and version info of the log creator application.
     */
    creator: Creator

    /**
     * Name and version info of used browser.
     */
    browser?: Browser

    /**
     * List of all exported (tracked) pages. Leave out this field if the application does not support grouping by pages.
     */

    pages?: Page[]

    /**
     * List of all exported (tracked) requests.
     *
     * Sorting entries by startedDateTime (starting from the oldest) is preferred way how to export data since it can make importing faster. However the reader application should always make sure the array is sorted (if required for the import).
     */
    entries: Entry[]
  }

  /**
   * This object represents the root of archive.
   */
  export interface HTTPArchive {
    /**
     * This object represents the root of exported data.
     */
    log: Log
  }

  /**
   *
   */
  export type HAR = HTTPArchive

  // k6 extended HAR-archive
  export enum SleepPlacement {
    Before = 'before',
    After = 'after',
  }

  export type Sleep = {
    [key in SleepPlacement]: number
  }

  export type ResponseBody = 0
  export type ResponseHeaders = 1
  export type HttpStatusCode = 2

  export type CheckSubjectVariant =
    | ResponseBody
    | ResponseHeaders
    | HttpStatusCode

  export type Contains = 0
  export type NotContains = 1
  export type Equals = 2
  export type StartsWith = 3
  export type EndsWith = 4
  export type TypeOf = 5

  export type CheckConditionVariant =
    | Contains
    | NotContains
    | Equals
    | StartsWith
    | EndsWith

  export interface Text {
    type: 0
    subject: CheckSubjectVariant
    condition: CheckConditionVariant
    value: string
  }

  export interface JSONPathValue {
    type: 1
    condition: CheckConditionVariant
    expression: string
    value: string
  }

  export interface JSONPath {
    type: 2
    expression: string
  }

  export interface Regex {
    type: 3
    subject: CheckSubjectVariant
    expression: string
  }

  export type Check = Text | JSONPathValue | JSONPath | Regex

  export interface JSONPathVariable {
    type: 0
    name: string
    expression: string
  }

  export interface RegexVariable {
    type: 1
    name: string
    expression: string
  }

  export interface CSSSelectorVariable {
    type: 2
    name: string
    expression: string
    attribute?: string
  }

  export type Variable = JSONPathVariable | RegexVariable | CSSSelectorVariable

  export interface ExtendedEntry extends Entry {
    checks?: Check[]
    variables?: Variable[]
    sleep?: Sleep[]
  }

  export interface ExtendedPage extends Page {
    sleep?: Sleep[]
  }

  export interface ExtendedLog extends Log {
    pages?: ExtendedPage[]
    entries: ExtendedEntry[]
  }

  export interface ExtendedHAR extends HAR {
    log: ExtendedLog
  }

  // module.exports
  export class HarToK6Error extends Error {}

  export class InvalidArchiveError extends HarToK6Error {
    name: string
    path: string
    indexes: any[]
  }

  export class UnrecognizedError extends HarToK6Error {}

  export function liHARToK6Script(
    har: HAR | Array<HAR>,
    options?: { addSleep?: boolean }
  ): Promise<{ main: string }>

  /** @throws {InvalidArchiveError} */
  export function validate(archive: HAR): void

  export function normalizeHAR(
    archive: HAR,
    options?: { addSleep?: boolean }
  ): HAR

  export function strToFunctionName(subject: string, fallback?: string): string
}
