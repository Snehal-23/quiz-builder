<template>
    <div>
        <form>
            <!-- <div v-for="index in count" :key="index"  class="QuestionForm"> -->

                <div class="form-group">
                    <label>Question  {{index}}:</label>
                    <input v-model="question" class="form-input" type="text" placeholder="Please enter question here" />
                </div>
                <div><label>Please select number of Options</label>
                    <select v-model.number="totalOptions" class="form-control">
                    <option disabled value="">Please select one</option>
                    <option v-for="x in 5" :key="x">{{x}}</option>
                    </select>
                </div>
                <div v-for="x in totalOptions" :key="x">
                    <label>{{ x }}<input class="form-input" type="text" placeholder="Please enter option here" v-on:focusout="addOption(text)"/></label>
                </div> 
                <div>Picked: {{ typeOfQs }}</div>

                <input type="radio" id="one" value="One" v-model="typeOfQs" />
                <label for="one">Single correct answer</label>
                <input type="radio" id="two" value="Two" v-model="typeOfQs" />
                <label for="two">Multiple Select</label>
                <div>
                    <label>Please index of correct Options</label>
                    <div v-if="typeOfQs=='One'">
                        <select v-model.number="correctOptions" class="form-control">
                            <option disabled value="">Please select one</option>
                            <option v-for="x in totalOptions" :key="x">{{x}}</option>
                        </select>
                    </div>
                    <div v-else>
                        <select v-model.number="correctOptions" class="form-control" multiple >
                            <option disabled value="">Please select multiple</option>
                            <option v-for="x in totalOptions" :key="x">{{x}}</option>
                        </select>
                    </div> 


                </div>


            <!-- </div> -->
            <div class="center">
                    <button type="submit" >Submit</button>
            </div>

        </form>
    </div>

</template>

<script>
//props
// const props = defineProps({
//     count: {
//       type: Number,
//       default: 1
//     }
// })

import { text } from 'stream/consumers';

//vars
// var Questions = ref([{
//     question:'',
//     totalOptions:0,
//     options:'',
//     type:''
// }])
// var Questions=ref([])
// var typeOfQs = ref()
// var totalOptions = ref(0)
export default {
    name: 'QuestionForm',
    props: {
    count: Number
    },
    data () {
      return {
        Questions:[],
        options:[],
        question:'',
        totalOptions:0 ,
        typeOfQs:'',
        correctOptions:0

    }
    },
    created() {
    // props are exposed on `this`
    console.log(this.count)
    },
    methods :{

        addOption(option){
            options = {...this.options,option}
        }
    }

//functions
// const emit = publishQuiz(['close'])
}  
// const addQuestion=()=>{
//     var obj = {
//         question,
//         totalOptions,
//         options,
//         type,
//         correctOptions
//     }
//     Questions.push({
//         obj
//     })
//     console.log(Questions)
// }

// const publishQuiz=()=>{
//     console.log(Questions)
// }
</script>
<style>
.QuestionForm{
    background-color:white ;
    border-radius: 10px;
    align-items: stretch;
    justify-content: flex-start;
    padding: 20px;
    margin: 30px

}
</style>