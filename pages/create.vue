<template>
    <div class="mx-auto container">

        <div class="mx-10 p-4">
            <h6>QUIZ FORM : Design you own quiz</h6>
            <label>Please select number of Qs to include in Quiz</label>
            <select v-model="totalQs" class="form-control" required>
                <option disabled value="">Please select one</option>
                <option v-for="counter4 in 10" v-bind:key="counter4">{{ counter4 }}
                </option>
            </select>
        </div>
        <div>
            <!-- <Loader v-show='loading' :loader='loading' /> -->
            <form>
                <label class="mx-10 p-4 mb-4" for="Title">Quiz Title:</label>
                <input class="form-input" type="text" placeholder="Please enter question here" v-model="title" required>
                <br>

                <div v-for="(item, index) in Questions" v-bind:key="index" class="my-5">
                    <!-- <div :v-if="index < count"> -->
                    <div class="QuestionForm">
                        <div class="form-group">
                            <label>Question {{ index+ 1 }} :
                                <input class="form-input" type="text" placeholder="Please enter question here"
                                    v-model="item.question" required>
                            </label>
                        </div>
                        <div class="form-group">
                            <label>Please select number of Options
                                <select v-model.number="item.totalOptions" class="form-control" required>
                                    <option class="option" disabled value="">Please select one</option>
                                    <option class="option" v-for="x in 5" :key="x">{{ x }}</option>
                                </select>
                            </label>
                        </div>
                        <div class="form-group">
                            <label>
                                <div v-for="counter in item.totalOptions" v-bind:key='counter'>
                                    <label>{{ counter }}.</label>
                                    <input class="form-input" type="text" placeholder="Please enter option here"
                                        v-model="item.options[counter]" required />
                                </div>
                            </label>
                        </div>
                        <!-- <div class="form-group">
                            <label class="my-auto">Type of Question:
                                <label for="one" :class="`radio-label ${item.type == 'single' ? 'selected' : ''}`">
                                    <input type="radio" id="one" value='single' v-model.lazy="item.type" />
                                    Single correct answer</label>
                                <label for="two" :class="`radio-label ${item.type == 'multiple' ? 'selected' : ''}`">
                                    <input type="radio" id="two" value='multiple' v-model.lazy="item.type" /> Multiple
                                    correct answers</label>
                            </label>
                        </div> -->

                        <div class="form-group">
                            <label>Please select all of correct options
                                <div v-for="(value, counter) in item.options" v-bind:key="counter">
                                    <div v-if="counter != 0">
                                        <label
                                            :class="`checkbox-label ${item.correctOptions[counter] == true ? 'selected' : ''}`">
                                            <span class="px-4 space-between">{{ counter }}. {{
                                                value
                                            }}
                                            </span>

                                            <input class="form-input" type="checkbox" :value="value"
                                                placeholder="Please enter option here"
                                                v-model="item.correctOptions[counter]" />
                                        </label>
                                    </div>
                                </div>
                            </label>
                        </div>


                    </div>
                    <!-- </div> -->
                </div>
                <button class="mx-10 p-4" @click="addQuestion(item)">
                    <span v-show="loading == false">Add Question</span>
                    <span v-show="loading == true">Publish Quiz</span>
                </button>
                <button class="mx-10 p-4" @click="deleteQuestion(index)">Delete Question</button>


            </form>
            <div v-show="loading">Loading.......</div>

        </div>

    </div>
</template>

<script>
export default {
    name: 'create',
    data() {
        return {

            title: '',
            Questions: [
                {
                    question: null,
                    totalOptions: 0,
                    options: [],
                    correctOptions: []
                }
            ],
            errorDisplay: false,
            result: '',
            totalQs: 0,
            loading: false,
            quizId: '',
            quesId: [],
            token: '',
            loggedIn: 0
        }
    },
    mounted() {
        this.token = localStorage.getItem('token');
        this.loggedIn = localStorage.getItem('loggedIn');
    },
    methods: {

        addQuestion(item) {
            var count = this.Questions.length
            if (count < this.totalQs && count > 0) { //set count 9 for max 10 Qs
                if (item.question == null || item.totalOptions == 0 || item.options.length == 0 || item.correctOptions.length == 0) {
                    alert('Please fill all the required fields')
                } else {
                    this.Questions.push({
                        question: null,
                        totalOptions: 0,
                        options: [],
                        correctOptions: []
                    })
                }

            } else if (count == this.totalQs) {
                if (item.question == null || item.totalOptions == 0 || item.options.length == 0 || item.correctOptions.length == 0) {
                    alert('Please fill all the required fields')
                } else {
                    this.loading = true
                    this.Questions.forEach(({ Q }) => {
                        postQuestion(Q)
                    })
                    this.quizId = Math.random().toString(16).slice(2).substr(0, 6)
                    alert(`Quiz created. Share link http://localhost:3000/quiz/${this.quizId}`)
                    this.$router.push("/profile");

                }
            }
        },
        deleteQuestion(counter) {
            this.Questions.splice(counter, 1);
        }
        ,
        async postQuestion(question) {
            const data = await $fetch('http://localhost:5000/api/v1/quiz/addQuestion', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "question": question.question,
                    "totalOtions": question.totalOptions,
                    "options": question.options,
                    "correctOptions": question.correctOptions
                })

            });
            this.result = data
        },

    }

}

</script>
<style>
label {
    font-size: 12;
}

.container {
    /* margin: 30px; */
    padding: 20px;
    /* margin-left: 40px; */
    float: center;
    box-shadow: 5px
}

.form-input {
    border: none;
    outline: none;
    border-bottom: 1px solid #ddd;
    font-size: 1em;
    padding: 5px 0;
    margin: 20px 0 5px 10px;

    width: 40%;
}

button {
    background-color: #271c36;
    padding: 10px 20px;
    margin-top: 10px;
    border: none;
    color: white;
}

select {
    width: 30%;
    margin-left: 20px;
    border-color: lightgray;
    border-width: 1pt;
    border-radius: 10px;
    padding-top: 6px;
    padding-bottom: 6px;

}

.form-group {
    margin-top: 10px;
}

.radio-label {
    padding: 1rem;
    display: block;
    background-color: gainsboro;
    margin-bottom: 0.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    width: 30%;
}

.radio-label.selected {
    padding: 1rem;
    display: block;
    background-color: #c5aee7;
    margin-bottom: 0.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    width: 30%;
}

.radio-label input {
    display: none;
}

.options {
    margin-bottom: 1rem;
}

.option {
    padding: 1rem;
    display: block;
    /* background-color: #271c36; */
    margin-bottom: 0.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    width: 20%;
}


.QuestionForm {
    background-color: white;
    border-width: 2pt;
    border-radius: 10px;
    border-color: lightgray;
    padding: 20px;
}

.checkbox-label {
    padding: 1rem;
    display: block;
    background-color: gainsboro;
    margin-bottom: 0.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    width: 30%;
}

.checkbox-label.selected {
    padding: 1rem;
    display: block;
    background-color: #c5aee7;
    margin-bottom: 0.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    width: 30%;
}

.checkbox-label input {
    display: none;
}
</style>