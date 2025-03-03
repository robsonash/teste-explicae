<template>
  <div
    v-if="!useActiveCheck || activeIndex !== index"
    class="accordion-header-content"
  >
    <p>
      Aulas: {{ course.classes.amount }} |
      <strong>{{ course.classes.duration }}</strong>
    </p>
    <p>
      Exercícios: {{ course.exercises.amount }} |
      <strong>{{ course.exercises.duration }}</strong>
    </p>
    <p>
      Materiais: {{ course.materials.amount }} |
      <strong>{{ course.materials.duration }}</strong>
    </p>
  </div>
</template>
<script>
export default {
  name: "AccordionHeaderContent",
  props: {
    course: {
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
