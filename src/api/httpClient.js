import { clearSession, getToken } from '../store/authStore';

export const apiUrls = {
  core: import.meta.env.VITE_CORE_API_URL || 'http://localhost:8000',
  financeiro: import.meta.env.VITE_FINANCEIRO_API_URL || 'http://localhost:8001',
  rh: import.meta.env.VITE_RH_API_URL || 'http://localhost:8002',
  estoque: import.meta.env.VITE_ESTOQUE_API_URL || 'http://localhost:8003',
  compras: import.meta.env.VITE_COMPRAS_API_URL || 'http://localhost:8004',
};

export const useMocks = import.meta.env.VITE_USE_MOCKS !== 'true';

export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function request(baseUrl, path, options = {}) {
  const token = getToken();
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (response.status === 401) {
    clearSession();
  }

  if (!response.ok) {
    const message = await readErrorMessage(response);
    throw new ApiError(response.status, message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

async function readErrorMessage(response) {
  try {
    const data = await response.json();
    return data.detail || data.message || getStatusMessage(response.status);
  } catch {
    return getStatusMessage(response.status);
  }
}

export function getStatusMessage(status) {
  const messages = {
    401: 'Sessao expirada ou usuario nao autorizado.',
    403: 'Acesso negado para este recurso.',
    404: 'Recurso nao encontrado.',
    500: 'Erro interno do servidor. Tente novamente em instantes.',
  };

  return messages[status] || 'Nao foi possivel concluir a operacao.';
}
