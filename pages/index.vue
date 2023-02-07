<template>
    <div class="container form-signin">
        <form @submit.prevent="handleSubmit" class="checkout-form">
            <h1 class="h3 mb-3 fw-normal"> Login</h1>

            <input v-model="email" type="email" class="form-control" placeholder="Email" required>

            <input v-model="password" type="password" class="form-control" placeholder="Password" required>
            <div>
                <button class="bg-indigo-800 shadow-sm text-white py-4 px-5 rounded" type="submit">Login</button>
            </div>
            <div>New to the app. <NuxtLink to="/register">Register</NuxtLink>
            </div>

        </form>
        {{ result }}
    </div>
</template>

<script >

export default {

    name: "login",
    data() {
        return {
            email: '',
            password: '',
            result: ''
        }
    },
    methods: {
        async handleSubmit() {

            const data = await $fetch('http://localhost:5000/api/v1/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    email: this.email,
                    password: this.password
                })
            });
            this.result = data
            if (data.status == 1) {
                localStorage.setItem('token', JSON.stringify(data.token));
                localStorage.setItem('loggedIn', 1);
                this.result = 'Succcessfully logged in';
                alert('Succcessfully logged in')
                await this.$router.push("/profile");
            } else {
                this.result = data.message;
                alert('Failed to login')
            }


        }
    }
}

</script>

<style>
.checkout-form {
    margin: 5px auto;
    padding: 10px;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
