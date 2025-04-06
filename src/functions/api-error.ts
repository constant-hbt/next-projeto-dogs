type ApiError = {
  data: null;
  ok: false;
  error: string;
};

export default function apiError(error: unknown): ApiError {
  if (error instanceof Error) {
    return {
      ok: false,
      error: error.message,
      data: null,
    };
  }

  return {
    ok: false,
    error: 'Erro desconhecido',
    data: null,
  };
}
