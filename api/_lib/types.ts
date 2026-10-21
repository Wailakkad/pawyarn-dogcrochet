export interface ApiRequest {
  method?: string;
  body?: unknown;
  query?: Record<string, string | string[] | undefined>;
  headers: Record<string, string | string[] | undefined>;
  url?: string;
}

export interface ApiResponse {
  status(code: number): ApiResponse;
  setHeader(name: string, value: string): ApiResponse;
  json(body: unknown): void;
  send(body: unknown): void;
  end(chunk?: unknown): void;
}

export interface SubscribeSuccessResponse {
  ok: true;
  downloadUrl: string;
  expiresInSeconds: number;
  duplicate: boolean;
}

export interface ErrorResponse {
  ok: false;
  error: string;
}

export type SubscribeResponse = SubscribeSuccessResponse | ErrorResponse;
