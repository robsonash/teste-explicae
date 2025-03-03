<template>
  <div>
    <div v-if="courses && courses.length > 0">
      <div v-for="(course, index) in courses" :key="index" class="accordion">
        <div
          class="accordion-header"
          @click="toggle(index, course.id)"
          :aria-expanded="activeIndexes[index]"
          role="button"
        >
          <h3>{{ course.title }}</h3>
          <HeaderContent :course="course" />
          <span
            class="accordion-icon"
            :class="{ rotate: activeIndexes[index] }"
          >
            &#x276F;
          </span>
        </div>
        <transition name="accordion">
          <div v-show="activeIndexes[index]" class="accordion-content">
            <AccordionSubGroup
              v-if="subGrupos[course.id]"
              :subGrupos="subGrupos[course.id] || []"
            />
            <div v-else class="empty">Dados não encontrados</div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import AccordionSubGroup from "@/components/AccordionCourses/Partials/AccordionSubGroup/AccordionSubGroup.vue";
import HeaderContent from "@/components/AccordionCourses/Partials/HeaderContent/HeaderContent.vue";

export default {
  name: "AccordionCourses",
  components: {
    AccordionSubGroup,
    HeaderContent,
  },
  props: {
    courses: {
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
    async toggle(index, courseId) {
      this.$set(this.activeIndexes, index, !this.activeIndexes[index]);

      if (this.activeIndexes[index] && !this.subGrupos[courseId]) {
        try {
          const subGrupoData = await this.$store.dispatch(
            "fetchSubGrupos",
            courseId
          );
          this.$set(this.subGrupos, courseId, subGrupoData);
        } catch (error) {
          console.error("Erro ao buscar subgrupo", error);
        }
      }
    },
  },
};
</script>

<style src="./style.css" scoped />
