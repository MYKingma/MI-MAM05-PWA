<template>
  <el-row justify="space-between">
    <el-col :span="12"><h3>Physical examination</h3></el-col>
    <el-col class="max-width" :span="12"
      ><PhaseToolbar
        @move-up="$emit('moveUp')"
        @move-down="$emit('moveDown')"
        @delete-phase="$emit('deletePhase')"
        :index="phaseIndex"
        :length="value.phases.length"
    /></el-col>
  </el-row>
  <el-form @submit.prevent label-position="top" class="container">
    <el-form-item label="Performed physical examinations">
      <el-tag
        v-for="tag in value.phases[phaseIndex].answer"
        :key="tag"
        class="mx-1 tag"
        closable
        :disable-transitions="false"
        @close="handleClose('answer', tag)"
        >{{ tag }}</el-tag
      >
      <el-input
        v-if="showTagInput.answer"
        id="answerTag"
        v-model="tagValue.answer"
        class="ml-1 w-20 tag-input"
        size="small"
        @keyup.enter="handleInputConfirm('answer')"
        @blur="handleInputConfirm('answer')"
      ></el-input>
      <el-button
        v-else
        class="button-new-tag ml-1 tag-button"
        size="small"
        @click="showInput('answer')"
      >
        + Add physical examination
      </el-button>
    </el-form-item>
    <el-form-item
      label="Wrong physical examination options (for generating multiple choice)"
    >
      <el-tag
        v-for="tag in value.phases[phaseIndex].wrongAnswer"
        :key="tag"
        class="mx-1 tag"
        closable
        :disable-transitions="false"
        @close="handleClose('wrongAnswer', tag)"
        >{{ tag }}</el-tag
      >
      <el-input
        v-if="showTagInput.wrongAnswer"
        id="wrongAnswerTag"
        v-model="tagValue.wrongAnswer"
        class="ml-1 w-20 tag-input"
        size="small"
        @keyup.enter="handleInputConfirm('wrongAnswer')"
        @blur="handleInputConfirm('wrongAnswer')"
      ></el-input>
      <el-button
        v-else
        class="button-new-tag ml-1 tag-button"
        size="small"
        @click="showInput('wrongAnswer')"
      >
        + Add wrong physical examination
      </el-button>
    </el-form-item>
    <h4>Examination results</h4>
    <el-row justify="space-between" :gutter="20">
      <el-col :span="12"
        ><el-switch
          v-model="showVitalParameterInput"
          class="mb-2"
          active-text="Vital parameters"
        ></el-switch
      ></el-col>
      <el-col :span="12" class="max-width"
        ><Transition
          ><el-button
            v-show="showAddTestButton"
            @click="addTest"
            type="primary"
            class="add-button"
            round
            size="small"
            small
            >Examination result
            <IconWrapper
              icon="plus"
              class="icon-button" /></el-button></Transition
      ></el-col>
    </el-row>
    <br />
    <TransitionGroup
      tag="ul"
      name="fade"
      class="container"
      @before-leave="beforeLeave"
    >
      <template v-if="showVitalParameterInput">
        <div key="vital">
          <el-row justify="space-between" :gutter="20">
            <el-col :span="12">
              <el-form-item label="Heart rate">
                <el-input
                  input-style="text-align: center;"
                  v-model="value.phases[phaseIndex].outcome.heartRate"
                  ><template #prefix>
                    <IconWrapper
                      icon="heart-pulse"
                      class="icon-input" /></template
                  ><template #append>bpm</template></el-input
                >
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Temperature">
                <el-input
                  input-style="text-align: center;"
                  v-model="value.phases[phaseIndex].outcome.temperature"
                  ><template #prefix>
                    <IconWrapper
                      icon="thermometer"
                      class="icon-input" /></template
                  ><template #append>°C</template></el-input
                >
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Blood pressure">
                <el-input
                  input-style="text-align: center;"
                  v-model="value.phases[phaseIndex].outcome.bloodPressure"
                  placeholder="low/high"
                  ><template #prefix>
                    <IconWrapper icon="heart" class="icon-input" /></template
                  ><template #append>mmHg</template></el-input
                >
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Breathing frequency">
                <el-input
                  input-style="text-align: center;"
                  v-model="value.phases[phaseIndex].outcome.breathRate"
                  ><template #prefix>
                    <IconWrapper icon="lungs" class="icon-input" /></template
                  ><template #append>Hz</template></el-input
                >
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Blood saturation">
                <el-input
                  input-style="text-align: center;"
                  v-model="value.phases[phaseIndex].outcome.bloodSaturation"
                >
                  <template #prefix>
                    <IconWrapper icon="vial" class="icon-input" /></template
                  ><template #append>%</template></el-input
                >
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </template>
      <el-row
        v-if="showExtraTest1"
        key="extraTestName1"
        align="middle"
        justify="space-between"
        :style="{ 'max-width': '400px' }"
      >
        <el-col :span="10" class="max-width">
          <el-form-item label="Examination type">
            <el-input
              v-model="value.phases[phaseIndex].outcome.extraTestName1"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" class="max-width">
          <el-form-item label="Result">
            <el-input
              placeholder="Include units"
              v-model="value.phases[phaseIndex].outcome.extraTestValue1"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2" class="max-width">
          <el-button
            type="danger"
            class="delete-button"
            @click="deleteExtraTest(1)"
            circle
            size="small"
            ><IconWrapper icon="trash-alt"
          /></el-button>
        </el-col>
      </el-row>
      <el-row
        v-if="showExtraTest2"
        key="extraTestName1"
        align="middle"
        justify="space-between"
        :style="{ 'max-width': '400px' }"
      >
        <el-col :span="10" class="max-width">
          <el-form-item label="Examination type">
            <el-input
              v-model="value.phases[phaseIndex].outcome.extraTestName2"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" class="max-width">
          <el-form-item label="Result">
            <el-input
              placeholder="Include units"
              v-model="value.phases[phaseIndex].outcome.extraTestValue2"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2" class="max-width">
          <el-button
            type="danger"
            class="delete-button"
            @click="deleteExtraTest(2)"
            circle
            size="small"
            ><IconWrapper icon="trash-alt"
          /></el-button>
        </el-col>
      </el-row>
      <el-form-item
        key="description"
        label="Description of the obtained examination results"
      >
        <el-input
          v-model="value.phases[phaseIndex].outcome.text"
          type="textarea"
          class="textarea"
          autosize
          resize="none"
        ></el-input>
      </el-form-item>
    </TransitionGroup>
  </el-form>
</template>

<script>
export default {
  props: ["modelValue", "phaseIndex"],
  emits: ["deletePhase", "moveUp", "moveDown"],
  data() {
    return {
      showTagInput: {
        answer: false,
        wrongAnswer: false,
      },
      tagValue: {
        answer: "",
        wrongAnswer: "",
      },
      showVitalParameterInput: false,
      showExtraTest1: false,
      showExtraTest2: false,
    };
  },
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },

    showAddTestButton() {
      if (
        this.value.phases[this.phaseIndex].outcome.extraTestName1 ||
        this.showExtraTest1
      ) {
        this.setShow(1, true);
      } else {
        this.setShow(1, false);
      }
      if (
        this.value.phases[this.phaseIndex].outcome.extraTestName2 ||
        this.showExtraTest2
      ) {
        this.setShow(2, true);
      } else {
        this.setShow(2, false);
      }
      if (this.showExtraTest1 && this.showExtraTest2) {
        return false;
      } else {
        return true;
      }
    },
  },
  mounted() {},
  methods: {
    setShow(number, value) {
      this[`showExtraTest${number}`] = value;
    },
    handleClose(type, tag) {
      this.value.phases[this.phaseIndex][type].splice(
        this.value.phases[this.phaseIndex][type].indexOf(tag),
        1
      );
    },
    showInput(type) {
      this.showTagInput[type] = true;
      this.$nextTick(() => {
        document.getElementById(`${type}Tag`).focus();
      });
    },
    handleInputConfirm(type) {
      let tagValue = this.tagValue[type];
      if (tagValue) {
        this.value.phases[this.phaseIndex][type].push(tagValue);
      }
      this.showTagInput[type] = false;
      this.tagValue[type] = "";
    },
    addTest() {
      if (this.showExtraTest1) {
        this.showExtraTest2 = true;
      } else {
        this.showExtraTest1 = true;
      }
    },
    deleteExtraTest(number) {
      this.value.phases[this.phaseIndex].outcome[`extraTestName${number}`] =
        null;
      this.value.phases[this.phaseIndex].outcome[`extraTestValue${number}`] =
        null;
      this[`showExtraTest${number}`] = false;
    },
    beforeLeave(el) {
      console.log(el);
      const { marginLeft, marginTop, width, height } =
        window.getComputedStyle(el);
      el.style.left = `${el.offsetLeft - parseFloat(marginLeft, 10)}px`;
      el.style.top = `${el.offsetTop - parseFloat(marginTop, 10)}px`;
      el.style.width = width;
      el.style.height = height;
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  padding: 0;
  overflow: hidden;
  * > * {
    overflow: hidden;
  }
}
.textarea {
  max-width: 725px;
}
.delete-button {
  margin-top: 10px;
}
.add-button {
  margin-top: 5px;
}
.max-width {
  max-width: fit-content;
}
/* 1. declare transition */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  position: relative;
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
  position: absolute;
}
</style>
