<template>
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
            <strong>Exercícios:</strong> {{ subGrupo.exercicios.quantidade }} |
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
        <!-- Verifica se há mais subgrupos dentro do atual e chama a função recursiva -->
        <AccordionSubGrupo :subGrupos="fetchSubGroups(subGrupo.id)" />
      </div>
    </div>
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
    };
  },
  methods: {
    toggle(index) {
      this.activeIndex = this.activeIndex === index ? null : index;
    },

    // Função recursiva que verifica e retorna os subgrupos com o ID correspondente
    async fetchSubGroups(id) {
      const subGrupoData = await getSubGroups(id);
      console.log("subGrupoData", subGrupoData);
      // Aqui, verificamos cada subgrupo para ver se ele tem filhos que correspondem ao id
      const findSubGrupo = (grupos) => {
        return grupos.filter((grupo) => grupo.subGroupId === id); // Ajuste para filtrar com subGroupId
      };
      console.log("id", id);
      console.log("findSubGrupo(this.subGrupos)", findSubGrupo(this.subGrupos));
      return findSubGrupo(this.subGrupos);
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
