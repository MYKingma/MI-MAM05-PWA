<template>
  <el-button-group>
    <Transition mode="out-in">
      <el-button
        v-if="isCurrentCaseDraft"
        @click="saveDraftCurrentCase"
        size="small"
        ><IconWrapper icon="floppy-disk"
      /></el-button>
      <el-button v-else @click="toOverview" size="small"
        ><IconWrapper
          icon="angle-left"
          class="icon-button-right"
        />Overview</el-button
      >
    </Transition>
    <el-button @click="publishCase" size="small" type="primary"
      ><IconWrapper icon="cloud-arrow-up"
    /></el-button>
    <el-popconfirm
      @confirm="deleteCase"
      confirm-button-text="OK"
      cancel-button-text="No, Thanks"
      :icon="InfoFilled"
      icon-color="red"
      title="Are you sure to delete this case?"
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
import { mapGetters, mapActions } from "vuex";
export default {
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["isCurrentCaseDraft"]),
    InfoFilled() {
      return InfoFilled;
    },
  },
  mounted() {},
  methods: {
    ...mapActions([
      "toOverview",
      "saveDraftCurrentCase",
      "publishCase",
      "deleteCase",
    ]),
  },
  watch: {},
};
</script>

<style lang="scss" scoped></style>
