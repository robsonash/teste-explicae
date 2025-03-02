<template>
  <div>
    <div v-if="cursos && cursos.length > 0">
      <div v-for="(curso, index) in cursos" :key="index" class="accordion">
        <div
          class="accordion-header"
          @click="toggle(index, curso.id)"
          :aria-expanded="activeIndexes[index]"
          role="button"
        >
          <h3>{{ curso.title }}</h3>
          <div class="accordion-header-content">
            <p>
              Aulas: {{ curso.aulas.quantidade }} |
              <strong>{{ curso.aulas.duracao }}</strong>
            </p>
            <p>
              Exercícios: {{ curso.exercicios.quantidade }} |
              <strong>{{ curso.exercicios.duracao }}</strong>
            </p>
            <p>
              Materiais: {{ curso.materiais.quantidade }} |
              <strong>{{ curso.materiais.duracao }}</strong>
            </p>
          </div>
          <span
            class="accordion-icon"
            :class="{ rotate: activeIndexes[index] }"
          >
            &#x276F;
          </span>
        </div>
        <transition name="accordion">
          <div v-show="activeIndexes[index]" class="accordion-content">
            <AccordionSubGrupo
              v-if="subGrupos[curso.id]"
              :subGrupos="subGrupos[curso.id] || []"
            />
            <div v-else class="empty">Sem nenhuma informação</div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import AccordionSubGrupo from "@/components/AccordionCursos/Partials/AccordionSubGrupo/AccordionSubGrupo.vue";

export default {
  components: {
    AccordionSubGrupo,
  },
  props: {
    cursos: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      activeIndexes: {},
      subGrupos: [],
    };
  },

  methods: {
    async toggle(index, cursoId) {
      this.$set(this.activeIndexes, index, !this.activeIndexes[index]);

      if (this.activeIndexes[index] && !this.subGrupos[cursoId]) {
        try {
          const subGrupoData = await this.$store.dispatch(
            "fetchSubGrupos",
            cursoId
          );
          this.$set(this.subGrupos, cursoId, subGrupoData);
        } catch (error) {
          console.error("Erro ao buscar subgrupo", error);
        }
      }
    },
  },
};
</script>

<style src="./style.css" scoped />
