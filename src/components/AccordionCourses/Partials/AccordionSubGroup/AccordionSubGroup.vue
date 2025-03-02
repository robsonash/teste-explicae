<template>
  <div>
    <div v-if="subGrupos && subGrupos.length > 0">
      <div v-for="(subGrupo, index) in subGrupos" :key="index" class="subgrupo">
        <div
          :class="[{ active: activeIndex === index }, 'subgrupo-header']"
          @click="toggle(index)"
        >
          <div class="subgrupo-header-title">
            <span class="subgrupo-icon">
              {{ activeIndex === index ? "−" : "+" }}
            </span>
            <h4>{{ subGrupo.title }}</h4>
          </div>
          <HeaderContent
            :curso="subGrupo"
            :useActiveCheck="true"
            :index="index"
            :activeIndex="activeIndex"
          />
        </div>
        <transition name="accordion">
          <div v-show="activeIndex === index" class="subgrupo-content">
            <AccordionSubGroup
              v-if="subGrupoLoaded[index]"
              :subGrupos="subGrupo.filhos || []"
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
        const subGrupoData = await this.$store.dispatch(
          "fetchSubGrupos",
          this.subGrupos[index].id
        );
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

<style src="./style.css" scoped />
