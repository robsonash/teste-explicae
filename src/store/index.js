import Vue from "vue";
import Vuex from "vuex";
import { api } from "@/services/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cursos: [],
  },
  mutations: {
    SET_CURSOS(state, cursos) {
      state.cursos = cursos;
    },
  },
  actions: {
    async fetchCursos({ commit }) {
      try {
        const cursos = await api.get("/cursos");
        const cursosFiltrados = cursos.filter((curso) => !curso.isSubGroup);
        commit("SET_CURSOS", cursosFiltrados);
      } catch (error) {
        alert("Erro ao carregar cursos principais:", error);
        console.error("Erro ao carregar cursos principais:", error);
      }
    },
  },
  getters: {
    cursos: (state) => state.cursos,
  },
});
