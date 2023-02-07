<template>
    <div class="body">
        <h1>My Quizzes</h1>
        <br />
        <span class="quiz-tile">
            <NuxtLink to="/create">Create quiz</NuxtLink>
        </span>
        <br />
        <div v-if="quizzes.data.length != 0">
            <div v-for="quiz in quizzes.data">
                <span class="quiz-tile">
                    <NuxtLink :to="`/quiz/${quiz.quizId}`" class="link">{{ quiz.quizTitle }}</NuxtLink>
                    <button @click="deleteQuiz(quiz._id)">Delete Quiz</button>
                </span>
            </div>
        </div>
        <div v-else>
            No data found
        </div>

    </div>
</template>

<script setup>

// const { id } = useRoute().params ? useRoute().params : '63dea4eba40e6d61f53635b5'
const uri = 'http://localhost:5000/api/v1/quiz/?user=63de94c1fad17c4c882afafe'
//  fetch the products
const quizzes = await $fetch(uri, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
})
if (quizzes.status == 0) {
    throw createError({ statusCode: 404, statusMessage: 'Quiz not found' })
}

async function deleteQuiz(id) {
    // id= 63dea2d1e99cf8594e60cabc
    const response = await $fetch('http://localhost:5000/api/v1/quiz/delete/' + id, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    })
    alert(response.message)
}
definePageMeta({
    layout: "default",
})
</script>

<style>
.body {
    background-color: white;
    border-width: 2pt;
    border-radius: 10px;
    border-color: lightgray;
    padding: 20px;
    width: 60%;
    margin: 10px;
    align-self: center;
}

.quiz-tile {
    width: 50%;
    align-items: space-between;
}

.link {
    margin-right: 10px;
}

.link:hover {
    color: blueviolet;
}
</style>