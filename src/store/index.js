import Vue from "vue";
import Vuex from "vuex";
import { getCourses, getSubGroups } from "@/services/courses";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    courses: [],
    subGroups: {},
  },
  mutations: {
    SET_COURSES(state, courses) {
      state.courses = courses;
    },
    SET_SUBGROUPS(state, { cursoId, subGroups }) {
      Vue.set(state.subGroups, cursoId, subGroups);
    },
  },
  actions: {
    async fetchCourses({ commit }) {
      try {
        const courses = await getCourses();
        commit("SET_COURSES", courses);
      } catch (error) {
        console.error("Erro ao carregar cursos principais:", error);
      }
    },

    async fetchSubGroups({ commit, state }, cursoId) {
      try {
        const subGroups = await getSubGroups(cursoId);

        if (!subGroups || subGroups.length === 0) return;

        const existingSubGrupos = state.subGroups[cursoId] || [];

        const newSubGrupos = subGroups.filter(
          (subGrupo) =>
            !existingSubGrupos.some((existing) => existing.id === subGrupo.id)
        );

        if (newSubGrupos.length === 0) {
          return newSubGrupos;
        }

        commit("SET_SUBGROUPS", {
          cursoId,
          subGroups: [...existingSubGrupos, ...newSubGrupos],
        });
        return newSubGrupos;
      } catch (error) {
        console.error("Erro ao carregar subgrupos:", error);
        throw error;
      }
    },
  },
  getters: {
    courses: (state) => state.courses,
    subGroups: (state) => state.subGroups,
  },
});
