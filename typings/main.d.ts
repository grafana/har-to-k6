declare module 'har-to-k6' {
  export type JsonValue =
    | string
    | number
    | boolean
    | null
    | Array<JsonValue>
    | { [prop: string]: JsonValue }

  export type Version = '1.2'

  export interface HAR {
    log: Log
  }

  export interface Log {
    version: Version
    creator: {
      name: string
      version: string
      comment?: string
    }
    browser: {
      name: string
      version: string
      comment?: string
    }
    pages: Page[]
    entries: Entry[]
  }

  export interface Page {
    startedDateTime: string
    id: string
    title: string
    pageTimings: {
      onContentLoad?: number
      onLoad?: number
      comment?: string
    }
    comment?: string
  }

  export enum SleepPlacement {
    Before = 'before',
    After = 'after',
  }

  export type Sleep = {
    [key in SleepPlacement]: number
  }

  export interface Entry {
    pageref?: string
    startedDateTime: string
    time: number
    request: Request
    response: Response
    cache: {
      beforeRequest?: CacheEntry | null
      afterRequest?: CacheEntry | null
      comment?: string
    }
    timings: {
      blocked?: number
      dns?: number
      connect?: number
      send: number
      wait: number
      receive: number
      ssl?: number
      comment?: string
    }
    serverIPAddress?: string
    connection?: string

    checks?: Check[]
    variables?: Variable[]

    comment?: string

    sleep?: Sleep[]
  }

  export interface Request {
    method: string
    url: string
    httpVersion: string
    cookies: Cookie[]
    headers: Header[]
    queryString: QueryParameter[]
    postData?: PostData
    headersSize: number
    bodySize: number
    comment?: string
  }

  export interface Response {
    status: number
    statusText: string
    cookies: Cookie[]
    headers: Header[]
    content: Content
    redirectURL?: string
    headersSize: number
    bodySize: number
    comment?: string
  }

  export interface Cookie {
    name: string
    value: string
    path?: string
    domain?: string
    expires?: string
    httpOnly?: boolean
    secure?: boolean
    comment?: string
  }

  export interface Header {
    name: string
    value: string
    comment?: string
  }

  export interface QueryParameter {
    name: string
    value: string
    comment?: string
  }

  export interface Body {
    mimeType: string
    text: string
  }

  export interface PostData extends Body {
    params: QueryParameter[]
    comment?: string
  }

  export interface URLEncodedParameter {
    name: string
    value?: string
    fileName: string
    contentType: string
    comment?: string
  }

  export interface Content extends Body {
    size: number
    compression?: number
    encoding?: string
    comment?: string
  }

  export interface CacheEntry {
    expires?: string
    lastAccess: string
    eTag: string
    hitCount: 0
    comment?: string
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

  export interface TimelineNode {
    id: string
    date: Date
    entry: Entry
  }
}
