<template>
  <el-button-group>
    <el-button v-if="index !== 0" @click="$emit('moveUp')" size="small"
      ><IconWrapper icon="angle-up"
    /></el-button>
    <el-button
      v-if="index + 1 !== length"
      @click="$emit('moveDown')"
      size="small"
      ><IconWrapper icon="angle-down"
    /></el-button>
    <el-popconfirm
      @confirm="$emit('deletePhase')"
      confirm-button-text="OK"
      cancel-button-text="No, Thanks"
      :icon="InfoFilled"
      icon-color="red"
      title="Are you sure to delete this phase?"
      ><template #reference
        ><el-button type="danger" size="small"
          ><IconWrapper icon="trash-alt"
        /></el-button>
      </template>
    </el-popconfirm>
  </el-button-group>
</template>

<script>
import { InfoFilled } from "@element-plus/icons-vue";
export default {
  props: ["index", "length"],
  emits: ["deletePhase", "moveUp", "moveDown"],
  data() {
    return {};
  },
  components: {},
  computed: {
    InfoFilled() {
      return InfoFilled;
    },
  },
  mounted() {},
  methods: {},
  watch: {},
};
</script>

<style lang="scss" scoped></style>
