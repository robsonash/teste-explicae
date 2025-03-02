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
          <div v-if="activeIndex !== index" class="accordion-header-content">
            <p>
              Aulas: {{ subGrupo.aulas.quantidade }} |
              <strong>{{ subGrupo.aulas.duracao }}</strong>
            </p>
            <p>
              Exercícios:
              <strong
                >{{ subGrupo.exercicios.quantidade }} |
                {{ subGrupo.exercicios.duracao }}</strong
              >
            </p>
            <p>
              Materiais: {{ subGrupo.materiais.quantidade }} |
              <strong>{{ subGrupo.materiais.duracao }}</strong>
            </p>
          </div>
        </div>
        <transition name="accordion">
          <div v-show="activeIndex === index" class="subgrupo-content">
            <AccordionSubGrupo
              v-if="subGrupoLoaded[index]"
              :subGrupos="subGrupo.filhos || []"
            />
          </div>
        </transition>
      </div>
    </div>
    <div v-else class="empty">Sem nenhuma informação</div>
  </div>
</template>

<script>
import AccordionSubGrupo from "@/components/AccordionSubGrupo.vue";
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

<style scoped>
h4 {
  margin: 0px;
}
.subgrupo {
  border-bottom: 1px solid #ccc;

  border-radius: 5px;
}
.subgrupo:last-child {
  border-bottom: unset;
}
.subgrupo-header {
  background: #ffffff;
  padding: 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
}
.accordion-header-content {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}
.subgrupo-icon {
  font-size: 20px;
  transition: transform 0.3s ease;
}
.subgrupo-content {
  padding: 10px 0px;
  background: #fff;
}
.subgrupo-header-title {
  display: flex;
  align-items: center;
  gap: 10px;
}
.empty {
  color: #a9abad;
}
.active {
  background: #eccbfc;
}
.accordion-enter-active,
.accordion-leave-active {
  transition: max-height 0.3s ease-out, opacity 0.3s ease-out;
  overflow: hidden;
}

.accordion-enter,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
}

.accordion-enter-to,
.accordion-leave {
  max-height: 300px;
  opacity: 1;
}
</style>
