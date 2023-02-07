<template>
    <div>
        <div>
            <span class="quiz-tile">
                {{ quiz.quizTitle }}
            </span>
        </div>
        <div class="app__head-description" v-if="!loading && !start && !result">
            <p> <em>Good luck!</em></p>
        </div>

        <Loader v-bind:loader='loader' />
        <div class="app__question" v-if="!loader && start && !result">
            <div class="app__question-header">
                <span class="app__question-counter">{{ totalAnswers + 1}}/{{ questionAmount }}</span>
                <h3 class="app__question-title" v-html="question.question"></h3>
                <p class="app__question-caption" v-if="question.noOfOptions > 0" v-html="`Multiple select`"></p>
            </div>
            <div class="question-form__item" v-for="(option, index) in question.options" :key='index'>
                <label class="question-form__item-label form-switch">
                    <input class="checkbox" type="checkbox" v-bind:value="index" v-model="pickedAnswer">
                    <span class="checkbox__custom"></span>
                    <span class="checkbox__text">{{ option }}</span>
                </label>
            </div>
            <button class="app__btn btn btn--bold btn-left" v-on:click="prevAnswer()">Prev</button>
            <br />
            <button class="app__btn btn btn--bold btn-right" v-on:click="checkAnswer(question)">Next</button>

        </div>

        <div class="app__result" v-if="result">
            <h3 class="text-center">Your result: {{ correct }}/{{ totalAnswers }}</h3>
            <h4 class="text-center">{{ resultMessage }}</h4>
        </div>
        <div v-if="!start" class="app__start">
            <button class="app__btn btn btn--bold btn--center" v-on:click="load()">Start</button>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Quiz',
    props: { quiz: Object },
    data() {
        return {
            loading: false,
            start: false,
            questionAmount: this.quiz.count,
            loader: false,
            correct: 0,
            totalAnswers: 0,
            wrongAnswers: false,
            question: null,
            allQuestions: this.quiz.questions,
            pickedAnswer: null,
            result: false,
            visitedQuestions: null,
            visitedCount: 0
        }
    },
    computed: {
        // Show different result message depending on the percentage of correct answers
        resultMessage: function () {
            var resultScore = this.correct / this.totalAnswers
            if (resultScore == 1) {
                return "Excellent!"
            } else if (resultScore >= 0.8) {
                return "Good job!"
            } else if (resultScore >= 0.5) {
                return "Not very impressive, but enough"
            } else if (resultScore >= 0.2) {
                return "Bad luck — but don't give up!"
            } else {
                return "Did you even try?"
            }
        }
    },
    methods: {
        // Reset params before start
        load: function () {
            this.start = true
            this.loader = true
            this.result = false
            this.correct = 0
            this.totalAnswers = 0
            this.wrongAnswers = false
            this.loadAllQuestions()
        },

        loadAllQuestions: function () {
            var self = this
            self.visitedQuestions = [];
            self.visitedCount = 0;
            self.loadQuestion()
        },
        loadQuestion: function () {
            var self = this
            // Check if there are any more questions to answer
            if (self.totalAnswers + 1 <= self.questionAmount) {
                var pickQ = Math.floor(Math.random() * self.allQuestions.length)
                // var pickQ = 0
                var item = self.allQuestions[pickQ]
                // Check question type
                self.pickedAnswer = []
                // Remove this question from the total pool of questions so it won't show again
                self.allQuestions.splice(pickQ, 1)
                // Set the vue data question to the question
                self.question = item

                // Hold the visited questions for prev button feature
                self.visitedQuestions.push(item);
                self.visitedCount++;

                // Turn off loading. This goes quickly so loading almost never shows
                self.loader = false
            } else {
                // if no more questions — show results
                self.result = true
                self.start = false
            }
        },
        prevAnswer: function () {
            var self = this;
            self.visitedCount--;
            var question = self.visitedQuestions[self.visitedCount - 1];
            // Set the vue data question to the question
            self.question = question;
            self.totalAnswers--;
        },
        checkAnswer: function (question) {
            var self = this
            if (self.visitedCount < self.visitedQuestions.length) {
                self.nextVistedAnswer();
            } else {
                // Check question type
                // var pickedAnswers = $.makeArray(self.pickedAnswer)
                // var correctAnswers = $.makeArray(question.correctAnswers)
                console.log('pcied', self.pickedAnswers)
                console.log('correct', question.correctAnswers)
                console.log('p1', self.pickedAnswers.sort().join(','))
                console.log('p2', correctAnswers.sort().join(','))
                console.log('------------------------------------')
                // Then sort both arrays so they are comparable
                let correct = 0
                let pickedCorrect = 0
                for (var i; i <= (question.correctAnswers.length); i++) {
                    if (correctAnswers[i] == true) {
                        correct += 1
                        if (self.pickedAnswer.includes(i)) {
                            pickedCorrect += 1
                        }
                    }
                }
                if (correct == pickedCorrect) {
                    self.correct++
                    self.wrongAnswers = false
                } else {
                    self.wrongAnswers = true
                }
            }
            self.totalAnswers++
            self.loadQuestion()

        },
        nextVistedAnswer: function () {
            var self = this;
            var question = self.visitedQuestions[self.visitedCount];
            // Set the vue data question to the question
            self.question = question;
            self.visitedCount++;
            self.totalAnswers++;
        }
    }

}

</script>