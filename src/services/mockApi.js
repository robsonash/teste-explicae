export function fetchCursos() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          title: "1. Interpretação de textos",
          aulas: { quantidade: 1193, duracao: "100h 22m" },
          exercicios: { quantidade: 181, duracao: "79h 12m" },
          materiais: { quantidade: 53, duracao: "86h 03m" },
        },
        {
          title: "2. Matemática para Concursos",
          aulas: { quantidade: 875, duracao: "85h 45m" },
          exercicios: { quantidade: 220, duracao: "95h 30m" },
          materiais: { quantidade: 67, duracao: "102h 15m" },
        },
      ]);
    }, 1000);
  });
}
