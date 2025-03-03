<template>
  <div>
    <div v-if="subGroups && subGroups.length > 0">
      <div v-for="(subGroup, index) in subGroups" :key="index" class="subGroup">
        <div
          :class="[{ active: activeIndex === index }, 'subGroup-header']"
          @click="toggle(index)"
        >
          <div class="subGroup-header-title">
            <span class="subGroup-icon">
              {{ activeIndex === index ? "−" : "+" }}
            </span>
            <h4>{{ subGroup.title }}</h4>
          </div>
          <HeaderContent
            :course="subGroup"
            :useActiveCheck="true"
            :index="index"
            :activeIndex="activeIndex"
          />
        </div>
        <transition name="accordion">
          <div v-show="activeIndex === index" class="subGroup-content">
            <AccordionSubGroup
              v-if="subGroupLoaded[index]"
              :subGroups="subGroup.children || []"
            />
          </div>
        </transition>
      </div>
    </div>
    <div v-else class="empty">Dados não encontrados</div>
  </div>
</template>

<script>
import AccordionSubGroup from "@/components/AccordionCourses/Partials/AccordionSubGroup/AccordionSubGroup.vue";
import HeaderContent from "@/components/AccordionCourses/Partials/HeaderContent/HeaderContent.vue";

export default {
  name: "AccordionSubGroup",
  components: {
    AccordionSubGroup,
    HeaderContent,
  },
  props: {
    subGroups: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      activeIndex: null,
      subGroupLoaded: {},
    };
  },
  methods: {
    toggle(index) {
      if (this.activeIndex === index) {
        this.activeIndex = null;
      } else {
        this.activeIndex = index;
        if (!this.subGroupLoaded[index]) {
          this.loadSubGroups(index);
        }
      }
    },

    async loadSubGroups(index) {
      try {
        const subGroupData = await this.$store.dispatch(
          "fetchSubGroups",
          this.subGroups[index].id
        );
        this.$set(this.subGroups, index, {
          ...this.subGroups[index],
          children: subGroupData,
        });
        this.$set(this.subGroupLoaded, index, true);
      } catch (error) {
        console.error("Erro ao carregar subgrupos", error);
      }
    },
  },
};
</script>

<style src="./style.css" scoped />
