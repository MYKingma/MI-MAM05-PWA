<template>
  <Transition mode="out-in">
    <div class="box" v-if="showQuestion">
      <h1>{{ caseType }}</h1>
      <br />
      <h4>{{ question }}</h4>
      <br />
      <div v-if="phaseData.wrongAnswer.length && phaseData.answer.length === 1">
        <el-radio-group v-model="singleAnswer">
          <el-radio
            v-for="index in scrambleMultipleChoice"
            :key="index"
            :label="
              index === phaseData.wrongAnswer.length
                ? phaseData.answer[0]
                : phaseData.wrongAnswer[index]
            "
            >{{
              index === phaseData.wrongAnswer.length
                ? phaseData.answer[0]
                : phaseData.wrongAnswer[index]
            }}
          </el-radio>
        </el-radio-group>
      </div>
      <div v-else-if="phaseData.wrongAnswer.length">
        <el-checkbox-group v-model="answerArray">
          <el-checkbox
            v-for="index in scrambleMultipleChoice"
            :key="index"
            :label="
              index >= phaseData.wrongAnswer.length
                ? phaseData.answer[index - phaseData.wrongAnswer.length]
                : phaseData.wrongAnswer[index]
            "
            >{{
              index >= phaseData.wrongAnswer.length
                ? phaseData.answer[index - phaseData.wrongAnswer.length]
                : phaseData.wrongAnswer[index]
            }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <div v-else>
        <el-input
          v-model="singleAnswer"
          type="textarea"
          autosize
          resize="none"
          class="textarea"
        ></el-input>
      </div>
      <br />
      <el-row class="select-phase-wrapper" justify="space-between">
        <el-col :span="10"> </el-col>
        <el-col :span="10" class="max-width">
          <el-button @click="check" type="primary" round size="small"
            >Submit</el-button
          >
        </el-col>
      </el-row>
    </div>
    <div class="box" v-else>
      <h4 v-if="correct && !showOutcome">That is correct!</h4>
      <h4 v-else-if="correct === null && !showOutcome">Correct answer</h4>
      <h4 v-else-if="!showOutcome">This is not correct</h4>
      <div v-if="phaseData.wrongAnswer.length && phaseData.answer.length === 1">
        <Transition mode="out-in">
          <div v-if="!showOutcome">
            <el-radio-group disabled v-model="singleAnswer">
              <el-radio
                :class="{
                  correct: phaseData.answer.includes(answerTextCheckbox(index)),
                  false: !phaseData.answer.includes(answerTextCheckbox(index)),
                }"
                v-for="index in scrambleMultipleChoice"
                :key="index"
                :label="answerTextRadio(index)"
                >{{ answerTextRadio(index) }}
              </el-radio>
            </el-radio-group>
            <br />
            <el-row class="select-phase-wrapper" justify="space-between">
              <el-col :span="10"> </el-col>
              <el-col :span="10" class="max-width">
                <el-button
                  v-if="!hideContinueButton"
                  @click="toOutcome"
                  type="primary"
                  round
                  size="small"
                  >Continue</el-button
                >
              </el-col>
            </el-row>
          </div>
          <div v-else>
            <br />
            <p>This is what {{ creator.name }} found</p>
            <br />
            <el-row v-for="(item, label) in phaseData.outcome" :key="item">
              <p class="info" v-if="label === 'text'">{{ item }}</p>
              <div
                v-else-if="
                  label !== 'id' &&
                  getValue(label) != null &&
                  getLabel(label) != null
                "
              >
                <p class="label">{{ getLabel(label) }}</p>
                <p>{{ getValue(label) }}</p>
              </div>
            </el-row>
            <el-row class="select-phase-wrapper" justify="space-between">
              <el-col :span="10"> </el-col>
              <el-col :span="10" class="max-width">
                <el-button
                  v-if="!hideContinueButton"
                  @click="proceed"
                  type="primary"
                  round
                  size="small"
                  >Continue</el-button
                >
              </el-col>
            </el-row>
          </div>
        </Transition>
      </div>
      <div v-else-if="phaseData.wrongAnswer.length">
        <Transition mode="out-in">
          <div v-if="!showOutcome">
            <el-checkbox-group v-model="answerArray">
              <el-checkbox
                disabled
                :class="{
                  correct: phaseData.answer.includes(answerTextCheckbox(index)),
                  false: !phaseData.answer.includes(answerTextCheckbox(index)),
                }"
                v-for="index in scrambleMultipleChoice"
                :key="index"
                :label="answerTextCheckbox(index)"
                >{{ answerTextCheckbox(index) }}
              </el-checkbox>
            </el-checkbox-group>
            <br />
            <el-row class="select-phase-wrapper" justify="space-between">
              <el-col :span="10"> </el-col>
              <el-col :span="10" class="max-width">
                <el-button
                  v-if="!hideContinueButton"
                  @click="toOutcome"
                  type="primary"
                  round
                  size="small"
                  >Continue</el-button
                >
              </el-col>
            </el-row>
          </div>
          <div v-else>
            <br />
            <p>This is what {{ creator.name }} found</p>
            <br />
            <el-row v-for="(item, label) in phaseData.outcome" :key="item">
              <p class="info" v-if="label === 'text'">{{ item }}</p>
              <div
                v-else-if="
                  label !== 'id' &&
                  getValue(label) != null &&
                  getLabel(label) != null
                "
              >
                <p class="label">{{ getLabel(label) }}</p>
                <p>{{ getValue(label) }}</p>
              </div>
            </el-row>
            <el-row class="select-phase-wrapper" justify="space-between">
              <el-col :span="10"> </el-col>
              <el-col :span="10" class="max-width">
                <el-button
                  v-if="!hideContinueButton"
                  @click="proceed"
                  type="primary"
                  round
                  size="small"
                  >Continue</el-button
                >
              </el-col>
            </el-row>
          </div>
        </Transition>
      </div>
      <div v-else>
        <Transition mode="out-in">
          <div v-if="!showOutcome">
            <br />
            <p class="correct-single">{{ phaseData.answer[0] }}</p>
            <br />
            <p>Your answer</p>
            <el-input
              disabled
              v-model="singleAnswer"
              type="textarea"
              autosize
              resize="none"
              class="textarea"
            ></el-input>
            <br />
            <br />
            <el-row class="select-phase-wrapper" justify="space-between">
              <el-col :span="10"> </el-col>
              <el-col :span="10" class="max-width">
                <el-button
                  v-if="!hideContinueButton"
                  @click="toOutcome"
                  type="primary"
                  round
                  size="small"
                  >Continue</el-button
                >
              </el-col>
            </el-row>
          </div>

          <div v-else>
            <br />
            <p>This is what {{ creator.name }} found</p>
            <br />
            <el-row v-for="(item, label) in phaseData.outcome" :key="item">
              <p class="info" v-if="label === 'text'">{{ item }}</p>
              <div
                v-else-if="
                  label !== 'id' &&
                  getValue(label) != null &&
                  getLabel(label) != null
                "
              >
                <p class="label">{{ getLabel(label) }}</p>
                <p>{{ getValue(label) }}</p>
              </div>
            </el-row>
            <el-row class="select-phase-wrapper" justify="space-between">
              <el-col :span="10"> </el-col>
              <el-col :span="10" class="max-width">
                <el-button
                  v-if="!hideContinueButton"
                  @click="proceed"
                  type="primary"
                  round
                  size="small"
                  >Continue</el-button
                >
              </el-col>
            </el-row>
          </div>
        </Transition>
      </div>
    </div>
  </Transition>
</template>

<script>
// import { mapGetters } from "vuex";

export default {
  emits: ["proceed"],
  props: {
    phaseIndex: {
      type: Number,
    },
    phaseData: {
      type: Object,
    },
    creator: {
      type: Object,
    },
  },
  data() {
    return {
      showQuestion: true,
      showOutcome: false,
      singleAnswer: null,
      answerArray: [],
      correct: null,
      hideContinueButton: false,
    };
  },
  computed: {
    // ...mapGetters({
    //   caseData: "currentCase",
    // }),
    caseType() {
      const phaseType = this.phaseData.type;
      switch (phaseType) {
        case "AdditionalQuestions":
          return "Additional Questions";
        case "PhysicalExamination":
          return "Physical Examination";
        case "AdditionalDiagnosticTests":
          return "Additional Diagnostic Tests";
        case "Diagnosis":
          return "Diagnosis";
        case "Treatment":
          return "Treatment";
        default:
          return "";
      }
    },
    question() {
      const phaseType = this.phaseData.type;
      switch (phaseType) {
        case "AdditionalQuestions":
          return "What additional questions are important to ask?";
        case "PhysicalExamination":
          return "What would you do for physical exam?";
        case "AdditionalDiagnosticTests":
          return "What additional diagnostic tests would you perform?";
        case "Diagnosis":
          return "What would the most likely diagnosis be?";
        case "Treatment":
          return "What treatment would you recommend?";
        default:
          return "";
      }
    },
    scrambleMultipleChoice() {
      const indexArray = [];
      this.phaseData.wrongAnswer.forEach((phase, index) => {
        indexArray.push(index);
      });
      // indexArray.push(indexArray.length);
      this.phaseData.answer.forEach((phase, index) => {
        indexArray.push(index + this.phaseData.wrongAnswer.length);
      });
      let currentIndexd = indexArray.length;
      while (0 !== currentIndexd) {
        let randomIndex = Math.floor(Math.random() * currentIndexd);
        currentIndexd -= 1;
        let tempPlace = indexArray[currentIndexd];
        indexArray[currentIndexd] = indexArray[randomIndex];
        indexArray[randomIndex] = tempPlace;
      }
      return indexArray;
    },
  },
  mounted() {},
  methods: {
    getLabel(label) {
      switch (label) {
        case "extraTestName1":
          return this.phaseData.outcome.extraTestName1;
        case "extraTestName2":
          return this.phaseData.outcome.extraTestName2;
        // case "extraTestValue1":
        //   return "Additional Diagnostic Tests";
        // case "extraTestValue2":
        //   return "Diagnosis";
        case "bloodPressure":
          return "Blood pressure";
        case "bloodSaturation":
          return "Blood saturation";
        case "breathRate":
          return "Breathing rate";
        case "heartRate":
          return "Heart rate";
        case "temperature":
          return "Temperature";
        default:
          return null;
      }
    },
    getValue(label) {
      switch (label) {
        case "extraTestName1":
          return this.phaseData.outcome.extraTestValue1;
        case "extraTestName2":
          return this.phaseData.outcome.extraTestValue2;
        case "bloodPressure":
          return this.phaseData.outcome.bloodPressure + " mmHg";
        case "bloodSaturation":
          return this.phaseData.outcome.bloodSaturation + " %";
        case "breathRate":
          return this.phaseData.outcome.breathRate + " Hz";
        case "heartRate":
          return this.phaseData.outcome.heartRate + " bpm";
        case "temperature":
          return this.phaseData.outcome.temperature + " °C";
        default:
          return null;
      }
    },
    answerTextCheckbox(index) {
      const answer =
        index >= this.phaseData.wrongAnswer.length
          ? this.phaseData.answer[index - this.phaseData.wrongAnswer.length]
          : this.phaseData.wrongAnswer[index];
      return answer;
    },
    answerTextRadio(index) {
      const answer =
        index === this.phaseData.wrongAnswer.length
          ? this.phaseData.answer[0]
          : this.phaseData.wrongAnswer[index];
      return answer;
    },
    check() {
      if (
        this.phaseData.wrongAnswer.length &&
        this.phaseData.answer.length === 1
      ) {
        if (this.singleAnswer === this.phaseData.answer[0]) {
          this.correct = true;
        } else {
          this.correct = false;
        }
      } else if (this.phaseData.wrongAnswer.length) {
        var allCorrect = true;
        this.phaseData.answer.forEach((correctAnswer) => {
          if (this.answerArray.includes(correctAnswer)) {
            return;
          }
          allCorrect = false;
        });
        this.correct = allCorrect;
      } else {
        this.correct = null;
      }
      this.showQuestion = false;
    },
    toOutcome() {
      if (this.phaseData.outcome) {
        this.showOutcome = true;
      } else {
        this.proceed();
      }
    },
    proceed() {
      this.$emit("proceed");
      this.hideContinueButton = true;
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.box {
  border: 1px solid lightgrey;
  border-radius: 3px;
  padding: 5px 15px 10px 15px;
  background-color: rgb(252, 252, 252);
  max-width: 778px;
  margin-bottom: 20px;
}
.max-width {
  max-width: fit-content;
  margin-top: 2px;
}
.textarea {
  max-width: 725px;
}
.correct {
  padding: 5px 10px;
  border: 1px solid rgb(46, 161, 46);
  background-color: rgb(207, 253, 207);
  border-radius: 5px;
  margin: 4px;
}
.false {
  padding: 5px 10px;
  border: 1px solid rgb(199, 32, 32);
  background-color: rgb(250, 115, 115);
  border-radius: 5px;
  margin: 4px;
}
label {
  white-space: pre-wrap !important;
}
.correct-single {
  color: green;
  font-size: 12px;
}
.label {
  font-weight: bold;
  font-size: 12px;
}
.info {
  font-style: italic;
  font-size: 12px;
}
</style>
