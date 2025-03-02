<template>
  <div
    v-if="!useActiveCheck || activeIndex !== index"
    class="accordion-header-content"
  >
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
</template>
<script>
export default {
  name: "AccordionHeaderContent",
  props: {
    curso: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: false,
    },
    activeIndex: {
      type: Number,
      required: false,
    },
    useActiveCheck: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style src="./style.css" scoped />
