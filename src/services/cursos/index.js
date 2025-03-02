import { api } from "../api";

export const getCursos = async () => {
  try {
    const response = await api.get("/cursos");
    return response.filter((curso) => !curso.isSubGroup);
  } catch (error) {
    alert("Erro ao buscar cursos principais:", error);
    throw error;
  }
};

export const getSubGroups = async (parentId) => {
  try {
    const response = await api.get("/cursos");
    return response.filter((curso) => curso.subGroupId === parentId);
  } catch (error) {
    alert("Erro ao buscar subgrupos:", error);
    throw error;
  }
};
