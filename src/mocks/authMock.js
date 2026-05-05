export async function loginMock(email, senha) {
  await delay();

  if (!email || !senha) {
    throw new Error('Informe email e senha.');
  }

  return {
    access_token: `mock-jwt-${Date.now()}`,
    token_type: 'bearer',
    user: {
      id: 1,
      nome: 'Funcionario ERP',
      email,
      perfil: 'Administrador academico',
    },
  };
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 350));
}
