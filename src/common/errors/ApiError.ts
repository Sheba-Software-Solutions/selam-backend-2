export class ApiError extends Error {
  status: number;
  code: string;
  details?: any;

  constructor(status: number, code: string, message: string, details?: any) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export function errorEnvelope(error: ApiError) {
  return {
    success: false,
    error: {
      code: error.code,
      message: error.message,
      details: error.details || [],
    },
  };
}
