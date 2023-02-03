<template>
    <div>
        <header class="shadow-sm bg-white">
            <nav class="container mx-auto p-4 flex justify-between">
                <NuxtLink to="/" class="font-bold">Quiz Builder</NuxtLink>
                <ul class="flex gap-4">
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <!-- <div v-if="$auth.loggedIn"> -->
                    <div v-if=!1>
                        <!-- {{ $auth.user.email }} -->
                        <li><NuxtLink to="/">logout</NuxtLink></li>
                        <!-- <v-btn text>Logout</v-btn> -->
                    </div>
                    <div class="flex gap-4" v-else>
                        <li><NuxtLink to="/login">Login</NuxtLink></li>
                        <li><NuxtLink to="/register">Register</NuxtLink></li>
                        <li><NuxtLink to="/create-quiz">Create quix</NuxtLink></li>
                    </div>
                </ul>
            </nav>
        </header>
    </div>
</template>

<style scoped>
  .router-link-exact-active {
    /* color: #12b488; */
    color: #51087E;
  }
</style>
