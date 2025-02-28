<template>
  <div>
    <div v-for="(curso, index) in cursos" :key="index" class="accordion">
      <div
        class="accordion-header"
        @click="toggle(index)"
        :aria-expanded="activeIndex === index"
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
      </div>
      <div v-show="activeIndex === index" class="accordion-content">
        <p>Conteúdo detalhado do curso</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cursos: {
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
</style>
