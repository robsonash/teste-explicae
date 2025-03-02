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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AccordionSubGrupo from "@/components/AccordionSubGrupo.vue";
import { getSubGroups } from "@/services/cursos";

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
      subGrupos: [], // Armazena os subgrupos por ID de curso
    };
  },
  methods: {
    async toggle(index, cursoId) {
      // Alterna o estado do acordeão
      this.$set(this.activeIndexes, index, !this.activeIndexes[index]);

      // Se o acordeão for aberto e o subgrupo ainda não foi carregado
      if (this.activeIndexes[index] && !this.subGrupos[cursoId]) {
        try {
          console.log("cursoId", cursoId);
          // Faz a requisição para buscar o subgrupo
          const subGrupoData = await getSubGroups(cursoId);
          console.log("subGrupoData", subGrupoData);
          // Armazena os dados do subgrupo no estado
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
  background: #f4f4f4;
  padding: 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
}

.accordion-header-content {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}

.accordion-content {
  padding: 10px;
  background: #fff;
}
.accordion-icon {
  position: absolute;
  right: 10px;
  font-size: 20px;
  transition: transform 0.3s ease;
  transform: rotate(-90deg);
}

.accordion-icon.rotate {
  transform: rotate(90deg);
}
</style>
