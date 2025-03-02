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
  margin-top: 2px;
}

.accordion {
  margin-bottom: 10px;
  border-radius: 5px;
  padding-bottom: 10px;
  background: #ffffff;
}

.accordion-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  padding: 10px;
  background: #ffffff;
  cursor: pointer;
  border-radius: 5px 5px 0px 0px;
}

.accordion-header-content {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.accordion-content {
  margin: 10px;
  padding: 10px;
  background: #fff;
  border: 2px solid #cccccc80;
  border-radius: 5px;
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
.accordion-enter-active,
.accordion-leave-active {
  transition: max-height 0.3s ease-out, opacity 0.3s ease-out;
  overflow: hidden;
}

.accordion-enter,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
}

.accordion-enter-to,
.accordion-leave {
  max-height: 300px;
  opacity: 1;
}
</style>
