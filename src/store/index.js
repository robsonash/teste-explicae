import Vue from "vue";
import Vuex from "vuex";
import { getCursos, getSubGroups } from "@/services/cursos";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cursos: [],
    subGrupos: {},
  },
  mutations: {
    SET_CURSOS(state, cursos) {
      state.cursos = cursos;
    },
    SET_SUBGRUPOS(state, { cursoId, subGrupos }) {
      Vue.set(state.subGrupos, cursoId, subGrupos);
    },
  },
  actions: {
    async fetchCursos({ commit }) {
      try {
        const cursos = await getCursos();
        commit("SET_CURSOS", cursos);
      } catch (error) {
        console.error("Erro ao carregar cursos principais:", error);
      }
    },

    async fetchSubGrupos({ commit, state }, cursoId) {
      try {
        const subGrupos = await getSubGroups(cursoId);

        if (!subGrupos || subGrupos.length === 0) return;

        const existingSubGrupos = state.subGrupos[cursoId] || [];

        const newSubGrupos = subGrupos.filter(
          (subGrupo) =>
            !existingSubGrupos.some((existing) => existing.id === subGrupo.id)
        );

        if (newSubGrupos.length === 0) {
          return newSubGrupos;
        }

        commit("SET_SUBGRUPOS", {
          cursoId,
          subGrupos: [...existingSubGrupos, ...newSubGrupos],
        });
        return newSubGrupos;
      } catch (error) {
        console.error("Erro ao carregar subgrupos:", error);
        throw error;
      }
    },
  },
  getters: {
    cursos: (state) => state.cursos,
    subGrupos: (state) => state.subGrupos,
  },
});
