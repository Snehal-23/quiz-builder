<template>
    <div class="body">
        <h1>individual quiz</h1>
        <div v-if="quizzes.data[0].length != 0">
            <Question :quiz="quizzes.data[0]" />
        </div>
        <div v-else>
            Quiz Not found
        </div>
    </div>
</template>

<script setup>

const { id } = useRoute().params
const uri = 'http://localhost:5000/api/v1/quiz/' + id
//  fetch the products
const quizzes = await $fetch(uri, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
})
if (quizzes.status == 0) {
    throw createError({ statusCode: 404, statusMessage: 'Quiz not found' })
}
definePageMeta({
    layout: "default",
})

</script>