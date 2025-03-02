<template>
  <div id="app">
    <div>
      <h2>Cadernos / <span>Língua Portuguesa</span></h2>
      <p v-if="loading">Carregando cursos...</p>
      <AccordionCursos v-else :cursos="_cursos" />
    </div>
  </div>
</template>

<script>
import AccordionCursos from "@/components/AccordionCursos.vue";
import { getCursos } from "@/services/cursos";

export default {
  name: "App",
  components: {
    AccordionCursos,
  },
  data() {
    return {
      cursos: [],
      loading: true,
    };
  },
  computed: {
    _cursos() {
      return this.cursos;
    },
  },
  methods: {
    async fetchCursos() {
      try {
        this.cursos = await getCursos();
      } catch (error) {
        console.error("Erro ao carregar cursos principais:", error);
      } finally {
        this.loading = false;
      }
    },
  },
  async created() {
    await this.fetchCursos(); // Chama fetchCursos e aguarda a conclusão
  },
};
</script>

<style>
body {
  background: #eff0f0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h2 {
  color: #a9abad;
  text-align: left;
}
h2 span {
  border-bottom: 5px solid #a505f0;
}
</style>
