<template>
  <h1>Physical exam</h1>
  <el-form label-position="top" class="container">
    <el-form-item label="What kind of physical examination was performed?">
      <el-tag
        v-for="tag in value.caseData.phases[phaseIndex].answer"
        :key="tag"
        class="mx-1"
        closable
        :disable-transitions="false"
        @close="handleClose('answer', tag)"
        >{{ tag }}</el-tag
      >
      <el-input
        v-if="showTagInput.answer"
        id="answerTag"
        v-model="tagValue.answer"
        class="ml-1 w-20"
        size="small"
        @keyup.enter="handleInputConfirm('answer')"
        @blur="handleInputConfirm('answer')"
      ></el-input>
      <el-button
        v-else
        class="button-new-tag ml-1"
        size="small"
        @click="showInput('answer')"
      >
        + Add field
      </el-button>
    </el-form-item>
    <el-form-item
      label="Give some wrong answers for generating a multiple choice question, if you leave this empty this section will generate an open question."
    >
      <el-tag
        v-for="tag in value.caseData.phases[phaseIndex].wrongAnswer"
        :key="tag"
        class="mx-1"
        closable
        :disable-transitions="false"
        @close="handleClose('wrongAnswer', tag)"
        >{{ tag }}</el-tag
      >
      <el-input
        v-if="showTagInput.wrongAnswer"
        id="wrongAnswerTag"
        v-model="tagValue.wrongAnswer"
        class="ml-1 w-20"
        size="small"
        @keyup.enter="handleInputConfirm('wrongAnswer')"
        @blur="handleInputConfirm('wrongAnswer')"
      ></el-input>
      <el-button
        v-else
        class="button-new-tag ml-1"
        size="small"
        @click="showInput('wrongAnswer')"
      >
        + Add field
      </el-button>
    </el-form-item>
    <h3>Examination results</h3>
    <el-row justify="space-between" :gutter="20">
      <el-col :span="12"
        ><el-switch
          v-model="showVitalParameterInput"
          class="mb-2"
          active-text="Include vital parameters"
        ></el-switch
      ></el-col>
      <el-col :span="12"
        ><Transition
          ><el-button
            v-show="showAddTestButton"
            @click="addTest"
            type="primary"
            round
            >Add other test result
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
                  v-model="value.caseData.phases[phaseIndex].outcome.heartRate"
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
                  v-model="
                    value.caseData.phases[phaseIndex].outcome.temperature
                  "
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
                  v-model="
                    value.caseData.phases[phaseIndex].outcome.bloodPressure
                  "
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
                  v-model="value.caseData.phases[phaseIndex].outcome.breathRate"
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
                  v-model="
                    value.caseData.phases[phaseIndex].outcome.bloodSaturation
                  "
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
        v-if="
          value.caseData.phases[phaseIndex].outcome.extraTestName1 ||
          showExtraTest1
        "
        key="extraTestName1"
        :gutter="20"
        align="middle"
        class="test"
        :span="24"
      >
        <el-col :span="12">
          <el-form-item label="Test type">
            <el-input
              v-model="value.caseData.phases[phaseIndex].outcome.extraTestName1"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="Result">
            <el-input
              placeholder="Please include units"
              v-model="
                value.caseData.phases[phaseIndex].outcome.extraTestValue1
              "
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button
            type="danger"
            class="delete-button"
            :icon="Delete"
            @click="deleteExtraTest(1)"
            circle
            size="small"
          ></el-button>
        </el-col>
      </el-row>
      <el-row
        v-if="
          value.caseData.phases[phaseIndex].outcome.extraTestName2 ||
          showExtraTest2
        "
        key="extraTestName1"
        :gutter="20"
        align="middle"
        class="test"
        :span="24"
      >
        <el-col :span="12">
          <el-form-item label="Test type">
            <el-input
              v-model="value.caseData.phases[phaseIndex].outcome.extraTestName2"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="Result">
            <el-input
              placeholder="Please include units"
              v-model="
                value.caseData.phases[phaseIndex].outcome.extraTestValue2
              "
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button
            type="danger"
            class="delete-button"
            :icon="Delete"
            @click="deleteExtraTest(2)"
            circle
            size="small"
          ></el-button>
        </el-col>
      </el-row>
      <el-form-item
        key="description"
        label="Description of the obtained results"
      >
        <el-input
          v-model="value.caseData.phases[phaseIndex].outcome.text"
          type="textarea"
        ></el-input>
      </el-form-item>
    </TransitionGroup>
  </el-form>
</template>

<script>
import { Delete } from "@element-plus/icons-vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHeart,
  faThermometer,
  faLungs,
  faVial,
  faHeartPulse,
  faPlus,
  faVials,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faHeart,
  faThermometer,
  faLungs,
  faVial,
  faHeartPulse,
  faPlus,
  faVials
);
export default {
  props: ["modelValue", "phaseIndex"],
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
    Delete() {
      return Delete;
    },
    showAddTestButton() {
      if (
        (this.value.caseData.phases[this.phaseIndex].outcome.extraTestName1 &&
          this.value.caseData.phases[this.phaseIndex].outcome.extraTestName2) ||
        (this.showExtraTest1 && this.showExtraTest2)
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
  mounted() {},
  methods: {
    handleClose(type, tag) {
      this.value.caseData.phases[this.phaseIndex][type].splice(
        this.value.caseData.phases[this.phaseIndex][type].indexOf(tag),
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
        this.value.caseData.phases[this.phaseIndex][type].push(tagValue);
      }
      this.showTagInput[type] = false;
      this.tagValue[type] = "";
    },
    addTest() {
      if (
        this.value.caseData.phases[this.phaseIndex].outcome.extraTestName1 ||
        this.showExtraTest1
      ) {
        this.showExtraTest2 = true;
      } else {
        this.showExtraTest1 = true;
      }
    },
    deleteExtraTest(number) {
      this.value.caseData.phases[this.phaseIndex].outcome[
        `extraTestName${number}`
      ] = null;
      this.value.caseData.phases[this.phaseIndex].outcome[
        `extraTestValue${number}`
      ] = null;
      this[`showExtraTest${number}`] = false;
    },
    beforeLeave(el) {
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
.delete-button {
  margin-top: 10px;
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
