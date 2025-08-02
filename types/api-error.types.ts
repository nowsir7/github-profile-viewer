export interface ApiError {
  /** HTTP status code (e.g., 404, 500) */
  status: number;

  /** Short error message */
  message: string;

  /** Additional details from the API, if available */
  errors?: Record<string, any> | string[];

  /** The endpoint or request path that caused the error */
  path?: string;

  /** Timestamp for logging/debugging */
  timestamp?: string;

  /** Original error object (optional) */
  originalError?: unknown;
}
