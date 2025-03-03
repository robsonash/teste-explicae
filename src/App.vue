<template>
  <div id="app">
    <div>
      <h2>Cadernos / <span>Língua Portuguesa</span></h2>
      <p v-if="loading">Carregando cursos...</p>
      <AccordionCourses v-else :courses="_courses" />
    </div>
  </div>
</template>

<script>
import AccordionCourses from "@/components/AccordionCourses/AccordionCourses.vue";

export default {
  name: "App",
  components: {
    AccordionCourses,
  },
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    _courses() {
      return this.$store.getters.cursos;
    },
  },
  methods: {
    async fetchCourses() {
      try {
        this.loading = true;
        await this.$store.dispatch("fetchCourses");
      } catch (error) {
        console.error("Erro ao carregar cursos:", error);
      } finally {
        this.loading = false;
      }
    },
  },
  async created() {
    await this.fetchCourses();
  },
};
</script>

<style>
body {
  background: #eff0f0;
}
p {
  margin: 5px 0px;
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
