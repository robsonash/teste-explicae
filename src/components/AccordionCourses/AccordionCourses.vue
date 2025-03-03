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
            v-if="courses[index]?.haveChildren !== false"
            class="accordion-icon"
            :class="{ rotate: activeIndexes[index] }"
          >
            &#x276F;
          </span>
        </div>
        <transition name="accordion">
          <div v-show="activeIndexes[index]" class="accordion-content">
            <AccordionSubGroup
              v-if="subGroup[course.id]"
              :subGroups="subGroup[course.id] || []"
            />
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
      subGroup: [],
    };
  },

  methods: {
    async toggle(index, courseId) {
      if (this.courses[index]?.haveChildren === false) return;
      this.$set(this.activeIndexes, index, !this.activeIndexes[index]);

      if (this.activeIndexes[index] && !this.subGroup[courseId]) {
        try {
          const subGroupData = await this.$store.dispatch(
            "fetchSubGroups",
            courseId
          );
          this.$set(this.subGroup, courseId, subGroupData);
        } catch (error) {
          console.error("Erro ao buscar subgrupo", error);
        }
      }
    },
  },
};
</script>

<style src="./style.css" scoped />
