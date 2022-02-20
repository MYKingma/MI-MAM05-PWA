<template>
  <el-button-group>
    <el-button
      v-if="index !== 0"
      :icon="Top"
      @click="movePhaseUp()"
      size="small"
    ></el-button>
    <el-button
      v-if="index + 1 !== length"
      :icon="Bottom"
      @click="movePhaseDown()"
      size="small"
    ></el-button>
    <el-popconfirm
      @confirm="deletePhase()"
      confirm-button-text="OK"
      cancel-button-text="No, Thanks"
      :icon="InfoFilled"
      icon-color="red"
      title="Are you sure to delete this?"
      ><template #reference
        ><el-button type="danger" :icon="Delete" size="small"></el-button>
      </template>
    </el-popconfirm>
  </el-button-group>
</template>

<script>
import { Delete, Bottom, Top, InfoFilled } from "@element-plus/icons-vue";

export default {
  props: ["index", "length"],
  emits: ["deletePhase", "moveUp", "moveDown"],
  data() {
    return {};
  },
  computed: {
    Delete() {
      return Delete;
    },
    Bottom() {
      return Bottom;
    },
    Top() {
      return Top;
    },
    InfoFilled() {
      return InfoFilled;
    },
  },
  mounted() {},
  methods: {
    deletePhase() {
      this.$emit("deletePhase");
    },
    movePhaseUp() {
      this.$emit("moveUp");
    },
    movePhaseDown() {
      this.$emit("moveDown");
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped></style>
