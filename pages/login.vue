<template>
    <div class="container form-signin">
        <h1>LOGIN</h1>
        <form @submit.prevent="handleSubmit" class="checkout-form">
            <h1 class="h3 mb-3 fw-normal">Please Login</h1>

            <input v-model="email" type="email" class="form-control" placeholder="Email" required>

            <input v-model="password" type="password" class="form-control" placeholder="Password" required>
            <div>             
              <button class="bg-indigo-800 shadow-sm text-white py-4 px-5 rounded" type="submit">Login</button>
            </div>
        </form>
        <!-- <div v-for="p in products">
         <p> {{ p.title }}</p>
        </div> -->

    </div>
</template>

<script>
  // const { data: products } = await useFetch('https://fakestoreapi.com/products')


export default {
  name: "login",
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async handleSubmit() {

      const{ data }= await $fetch('http://localhost:5000/api/v1/users/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          email: this.email,
          password: this.password
        })
      });
      if(data.status==0){
        alert('not pass')
      }else{
        alert('passed')
      }
      // await this.$router.push('/');
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
