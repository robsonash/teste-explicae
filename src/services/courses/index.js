import { api } from "@/services/api";

export const getCourses = async () => {
  try {
    const response = await api.get("/courses");
    return response.filter((course) => !course.isSubGroup);
  } catch (error) {
    alert("Erro ao buscar cursos principais:", error);
    throw error;
  }
};

export const getSubGroups = async (parentId) => {
  try {
    const response = await api.get("/courses");
    return response.filter((course) => course.subGroupId === parentId);
  } catch (error) {
    alert("Erro ao buscar subgrupos:", error);
    throw error;
  }
};
