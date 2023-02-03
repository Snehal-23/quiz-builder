<template>
    <h6>QUIZ FORM</h6>
    <div class="container">
        <p>Design you own quiz</p>
        <div><label>Please select number of Qs to include in Quiz</label> {{ totalQs }}
            <select v-model="totalQs" class="form-control">
            <option disabled value="">Please select one</option>
            <option v-for="index in 10" :key="index" :value="index">{{index}}</option>
            </select>
        </div>
        <QuestionForm :count="totalQs"/>
    </div>
</template>

<script>
export default{

    data(){
        return{
            totalQs:0
        }
    }
}

// const handleClose = () => {
//     emit('close')
// }

</script>
<style scoped>
label{
    font-size: 12;
}
.container{
    background-color: papayawhip;
    margin: 30px;
    padding: 20px;
    justify-content: center;
    align-items:center ;
    }
</style>