<template>
  <div>
    <div v-if="subGrupos && subGrupos.length > 0">
      <div v-for="(subGrupo, index) in subGrupos" :key="index" class="subgrupo">
        <div class="subgrupo-header" @click="toggle(index)">
          <div class="subgrupo-header-title">
            <span class="subgrupo-icon">
              {{ activeIndex === index ? "−" : "+" }}
            </span>
            <h4>{{ subGrupo.title }}</h4>
          </div>
          <div class="accordion-header-content">
            <p>
              <strong>Aulas:</strong> {{ subGrupo.aulas.quantidade }} |
              {{ subGrupo.aulas.duracao }}
            </p>
            <p>
              <strong>Exercícios:</strong>
              {{ subGrupo.exercicios.quantidade }} |
              {{ subGrupo.exercicios.duracao }}
            </p>
            <p>
              <strong>Materiais:</strong> {{ subGrupo.materiais.quantidade }} |
              {{ subGrupo.materiais.duracao }}
            </p>
          </div>
        </div>
        <div v-show="activeIndex === index" class="subgrupo-content">
          <p>{{ subGrupo.descricao }}</p>
          <AccordionSubGrupo
            v-if="subGrupoLoaded[index]"
            :subGrupos="subGrupo.filhos || []"
          />
        </div>
      </div>
    </div>
    <div v-else>Sem nenhuma informação</div>
  </div>
</template>

<script>
import AccordionSubGrupo from "@/components/AccordionSubGrupo.vue";
import { getSubGroups } from "@/services/cursos";
export default {
  name: "AccordionSubGrupo",
  components: {
    AccordionSubGrupo,
  },
  props: {
    subGrupos: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      activeIndex: null,
      subGrupoLoaded: {},
    };
  },
  methods: {
    toggle(index) {
      if (this.activeIndex === index) {
        this.activeIndex = null;
      } else {
        this.activeIndex = index;
        if (!this.subGrupoLoaded[index]) {
          this.loadSubGroups(index);
        }
      }
    },

    async loadSubGroups(index) {
      try {
        const subGrupoData = await getSubGroups(this.subGrupos[index].id);
        this.$set(this.subGrupos, index, {
          ...this.subGrupos[index],
          filhos: subGrupoData,
        });
        this.$set(this.subGrupoLoaded, index, true);
      } catch (error) {
        console.error("Erro ao carregar subgrupos", error);
      }
    },
  },
};
</script>

<style scoped>
.subgrupo {
  border: 1px solid #ccc;
  margin-bottom: 10px;
  border-radius: 5px;
}

.subgrupo-header {
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
.subgrupo-icon {
  font-size: 20px;
  transition: transform 0.3s ease;
}

.subgrupo-icon.rotate {
  transform: rotate(90deg);
}

.subgrupo-content {
  padding: 10px;
  background: #fff;
}
.subgrupo-header-title {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
