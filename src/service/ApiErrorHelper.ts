import axios from 'axios';

/**
 * Extrai mensagem amigável de erro vindo da API (Axios) ou de outros tipos de erro.
 */
export function getApiErrorMessage(error: any): string {
  if (axios.isAxiosError(error)) {
    const data: any = error.response?.data;
    // Tenta várias chaves comuns usadas em APIs para passar mensagens
    return (
      data?.message ||
      data?.mensagem ||
      data?.error ||
      data?.erro ||
      (typeof data === 'string' ? data : undefined) ||
      error.message ||
      'Erro inesperado ao comunicar com o servidor.'
    );
  }
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'Erro desconhecido.';
}

/**
 * Mostra um alert com a mensagem de erro da API.
 * Pode receber um prefixo para contextualizar.
 */
export function alertApiError(error: any, prefix?: string) {
  const msg = getApiErrorMessage(error);
  window.alert(prefix ? `${prefix}: ${msg}` : msg);
}

/**
 * Envolve uma Promise (geralmente chamada de serviço) adicionando catch que mostra alert.
 * Útil para evitar repetir .catch(...) em cada chamada.
 */
export function withAlert<T>(p: Promise<T>, prefix?: string): Promise<T> {
  return p.catch((err) => {
    alertApiError(err, prefix);
    throw err; // repropaga se o chamador quiser tratar também
  });
}
