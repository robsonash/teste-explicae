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

export default {
  name: "App",
  components: {
    AccordionCursos,
  },
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    _cursos() {
      return this.$store.getters.cursos;
    },
  },
  methods: {
    async fetchCursos() {
      try {
        this.loading = true;
        await this.$store.dispatch("fetchCursos");
      } catch (error) {
        console.error("Erro ao carregar cursos:", error);
      } finally {
        this.loading = false;
      }
    },
  },
  async created() {
    await this.fetchCursos();
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
  font-family: cursive;
  color: #a9abad;
  text-align: left;
}
h2 span {
  border-bottom: 3px solid #a505f0;
}
</style>
