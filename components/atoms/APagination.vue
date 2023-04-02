<script lang="ts">
export default {
  props: {
    count: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    disableIncrement: {
      type: Boolean,
      required: false,
      default: false,
    },
    disableDecrement: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ["decrement", "increment", "movePage"],
  setup(props, { emit }) {
    /** ページの表示順 */
    const pages = computed(() => {
      // 全て表示できる時は表示する
      if (props.total < 7) {
        const pages = [];
        for (let i = 0; i < props.total; i++) {
          pages.push(i + 1);
        }
        return pages;
      }

      if (props.count < 4) {
        // 後ろに省略がある
        const pages = [];
        for (let i = 0; i < 6; i++) {
          if (i + 1 < 5) {
            pages.push(i + 1);
          } else if (i + 1 === 6) {
            pages.push(props.total);
          } else {
            // 0: 三点リーダ
            pages.push(0);
          }
        }
        return pages;
      } else if (props.total < props.count + 4) {
        // 前に省略がある
        const pages = [];
        for (let i = 0; i < 6; i++) {
          if (i + 1 === 1) {
            pages.push(1);
          } else if (i + 1 === 2) {
            // 0: 三点リーダ
            pages.push(0);
          } else {
            pages.push(props.total + i - 5);
          }
        }
        return pages;
      }
      // 前後に省略がある
      // 0: 三点リーダ
      return [1, 0, props.count, props.count + 1, 0, props.total];
    });

    const decrement = () => {
      if (props.disableDecrement || props.count === 1) {
        return;
      }
      emit("decrement");
    };

    const increment = () => {
      if (props.disableIncrement || props.count === props.total) {
        return;
      }
      emit("increment");
    };

    const moveToSelectPage = (page: number) => {
      emit("movePage", page);
    };

    return {
      pages,
      decrement,
      increment,
      moveToSelectPage,
    };
  },
};
</script>

<template>
  <div v-if="total" class="bl_paginationButton">
    <button
      v-data-test-id="'decrement'"
      class="el_paginationButton"
      :class="{ is_disabled: count === 1 }"
      @click="decrement"
    >
      ＜
    </button>
    <div
      v-for="page in pages"
      :key="`page-${page}`"
      v-data-test-id="`paginationCount-${page}`"
      class="el_paginationButton el_paginationButton_pageCount"
      :class="{
        is_active: page === count,
        is_separate: page === 0,
      }"
      @click="moveToSelectPage(page)"
    >
      {{ page || "..." }}
    </div>
    <button
      v-data-test-id="'increment'"
      class="el_paginationButton"
      :class="{ is_disabled: count === total }"
      @click="increment"
    >
      ＞
    </button>
  </div>
</template>

<style lang="scss" scoped>
.bl_paginationButton {
  display: flex;
}

.el_paginationButton {
  padding: 4px 6px;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  background-color: $color-component-background;
  border: solid 1px $color-font;

  & ~ .el_paginationButton {
    margin: 0 0 0 6px;
  }

  &_pageCount {
    text-align: center;
    border-color: $color-checkbox-border;
  }

  &.is_disabled {
    color: $color-font-disabled;
    pointer-events: none;
    border-color: $color-checkbox-border;
  }

  &.is_active {
    color: $color-font-light;
    background-color: $color-primary;
  }

  &.is_separate {
    color: $color-font;
    pointer-events: none;
    cursor: default;
    background-color: transparent;
    border: transparent;
  }
}
</style>
