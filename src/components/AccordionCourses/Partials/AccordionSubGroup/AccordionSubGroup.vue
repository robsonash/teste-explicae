<template>
  <div>
    <div v-if="subGroups && subGroups.length > 0">
      <div v-for="(subGroup, index) in subGroups" :key="index" class="subGroup">
        <div
          :class="[{ active: activeIndex === index }, 'subGroup-header']"
          @click="toggle(index)"
        >
          <div class="subGroup-header-title">
            <span
              v-if="subGroup.haveChildren !== false || subGroup.totalList"
              class="subGroup-icon"
            >
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
          <TotalList
            v-if="subGroup.totalList && activeIndex === index"
            :totalList="subGroup.totalList"
          />
        </div>
        <transition name="accordion">
          <div v-show="activeIndex === index" class="subGroup-content">
            <AccordionSubGroup
              v-if="subGroupLoaded[index]"
              :subGroups="subGroup.children || []"
            />
            <div v-else class="loading">Carregando...</div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import AccordionSubGroup from "@/components/AccordionCourses/Partials/AccordionSubGroup/AccordionSubGroup.vue";
import HeaderContent from "@/components/AccordionCourses/Partials/HeaderContent/HeaderContent.vue";
import TotalList from "@/components/AccordionCourses/Partials/TotalList/TotalList.vue";

export default {
  name: "AccordionSubGroup",
  components: {
    AccordionSubGroup,
    HeaderContent,
    TotalList,
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
      if (
        this.subGroups[index]?.haveChildren === false &&
        !this.subGroups[index]?.totalList
      )
        return;

      if (
        this.subGroups[index]?.haveChildren === false &&
        this.subGroups[index]?.totalList
      ) {
        this.activeIndex = this.activeIndex === index ? null : index;
        return;
      }

      if (this.activeIndex === index) {
        this.activeIndex = null;
        return;
      }

      this.activeIndex = index;

      if (!this.subGroupLoaded[index]) {
        this.loadSubGroups(index);
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
