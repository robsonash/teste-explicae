<template>
  <div class="container" @click.stop>
    <div class="tabs">
      <button
        v-for="(item, index) in totalList"
        :key="index"
        @click.stop="activeTab = index"
        :class="{ active: activeTab === index }"
      >
        {{ item.title }} {{ item.amount }} aulas | {{ item.duration }}
      </button>
    </div>

    <div v-if="totalList.length">
      <div v-for="(item, index) in totalList" :key="index">
        <div v-if="activeTab === index" class="content">
          <h2>{{ item.subtitle }}</h2>
          <p class="info-text">{{ item.amount }} aulas | {{ item.duration }}</p>

          <ul class="list">
            <li
              v-for="(listItem, idx) in item.list"
              :key="idx"
              class="list-item"
            >
              <div>
                <input type="checkbox" v-model="listItem.done" />
                <span class="title">{{ listItem.title }}</span>
              </div>
              <span class="time">{{ listItem.time }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TotalList",
  props: {
    totalList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      activeTab: 0,
    };
  },
};
</script>

<style src="./style.css" scoped />
