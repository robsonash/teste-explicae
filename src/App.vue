<template>
  <div id="app">
    <div>
      <h2>Cadernos / <span>Língua Portuguesa</span></h2>
      <p v-if="loading">Carregando cursos...</p>
      <AccordionCursos v-else :cursos="cursos" />
    </div>
  </div>
</template>

<script>
import AccordionCursos from "@/components/AccordionCursos.vue";
import { fetchCursos } from "@/services/mockApi";
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
  async created() {
    this.cursos = await fetchCursos();
    this.loading = false;
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
