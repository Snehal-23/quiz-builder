<template>
    <div>
        <header class="shadow-sm bg-white">
            <nav class="container mx-auto p-4 flex justify-between">
                <NuxtLink to="/" class="font-bold">Quiz Builder</NuxtLink>
                <ul class="flex gap-4">
                    <!-- <li>
                        <NuxtLink to="/">Home</NuxtLink>
                    </li> -->
                    <div v-show="loggedIn == 1" class="flex gap-4">
                        <li>
                            <NuxtLink to="/create">Create quiz</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/profile">Profile</NuxtLink>
                        </li>
                        <li>
                            <button @click="logout()">logout</button>
                        </li>
                    </div>
                    <!-- <div v-else class="flex gap-4">
                        <li>
                            <NuxtLink to="/">Login</NuxtLink>
                        </li>

                    </div> -->
                </ul>
            </nav>
        </header>
    </div>
</template>

<script>
export default {
    data() {
        return {
            token: '',
            loggedIn: 0
        }
    },
    mounted() {
        this.token = localStorage.getItem('token');
        this.loggedIn = localStorage.getItem('loggedIn');
    },
    methods: {
        logout() {
            localStorage.setItem('token', null);
            localStorage.setItem('loggedIn', 0);
            this.$router.push("/");
        }
    }

}
</script>

<style scoped>
.router-link-exact-active {
    /* color: #12b488; */
    color: #51087E;
}
</style>
