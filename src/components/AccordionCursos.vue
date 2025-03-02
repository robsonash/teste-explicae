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
              <strong>Aulas:</strong> {{ curso.aulas.quantidade }} |
              {{ curso.aulas.duracao }}
            </p>
            <p>
              <strong>Exercícios:</strong> {{ curso.exercicios.quantidade }} |
              {{ curso.exercicios.duracao }}
            </p>
            <p>
              <strong>Materiais:</strong> {{ curso.materiais.quantidade }} |
              {{ curso.materiais.duracao }}
            </p>
          </div>
          <span
            class="accordion-icon"
            :class="{ rotate: activeIndexes[index] }"
          >
            &#x276F;
          </span>
        </div>
        <div v-show="activeIndexes[index]" class="accordion-content">
          <AccordionSubGrupo
            v-if="subGrupos[curso.id]"
            :subGrupos="subGrupos[curso.id] || []"
          />
          <div v-else class="empty">Sem nenhuma informação</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AccordionSubGrupo from "@/components/AccordionSubGrupo.vue";

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

<style scoped>
h2 {
  margin-bottom: 15px;
}

h3 {
  margin-bottom: 5px;
}

.accordion {
  border: 1px solid #ccc;
  margin-bottom: 10px;
  border-radius: 5px;
}

.accordion-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  padding: 10px;
  background: #ffffff;
  cursor: pointer;
  border-radius: 5px;
}

.accordion-header-content {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}

.accordion-content {
  margin: 10px;
  padding: 10px;
  background: #fff;
  border: 1px solid #ccc;
}
.accordion-icon {
  position: absolute;
  right: 20px;
  font-size: 20px;
  color: #a9abad;
  transition: transform 0.3s ease;
  transform: rotate(-90deg);
}

.accordion-icon.rotate {
  transform: rotate(90deg);
}

.empty {
  color: #a9abad;
}
</style>
