<template>
    <div class="form-signin">
        <h1>Register</h1>
        <form @submit="submit">
            <h1 class="h3 mb-3 fw-normal">Please register</h1>

            <input v-model="name" class="form-control" placeholder="Name" required>

            <input v-model="email" type="email" class="form-control" placeholder="Email" required>

            <input v-model="password" type="password" class="form-control" placeholder="Password" required>
            <div class="justify-center">
                <button class="bg-indigo-800 shadow-sm text-white py-4 px-5 rounded" type="submit">Submit</button>
            </div>
        </form>
    </div>
</template>
<script>
export default {
  name: "register",
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    async submit() {
        console.log('register')
      await fetch('http://localhost:5000/api/v1/users/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          username: this.name,
          email: this.email,
          password: this.password
        })
      });
    //   await this.$router.push('/login');
    }
  }
}

</script>
<style>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  /* position: relative; */
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: 2px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  border-color: black;
  border-width: 1px;
  border-radius: 10px;

}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

</style>