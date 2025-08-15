<template>
  <div class="background-wrapper">
    <section id="login-form">
      <h1>WELCOME</h1>

      <div class="input-wrap in-1">
        <input type="text" v-model="username" placeholder="Your Name" spellcheck="false" required>
        <img src="/user-solid.svg" class="icon" />
      </div>
      <div class="input-wrap in-2">
        <input type="password" v-model="password" placeholder="Your password" spellcheck="false" required>
        <img src="/lock-solid.svg" class="icon" />
      </div>

      <div class="rem">
        <p>
          <input type="checkbox">
          Remember me
        </p>
        <a>Forgot password?</a>
      </div>

      <button @click="handleLogin">LOGGING</button>

      <p class="reg">
        Don't have an account?
        <router-link to="/register">Register</router-link>
      </p>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
// import { useUserStore } from '@/stores/user' // pinia user store

const router = useRouter()
const username = ref('')
const password = ref('')

async function handleLogin() {
  try {
    console.log('開始登入，送出請求');
    const res = await axios.post('http://127.0.0.1:8000/api/token/', {
      username: username.value,
      password: password.value
    });
    console.log('登入成功，後端回應：', res.data);

    const accessToken = res.data.access;
    const refreshToken = res.data.refresh;

    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);

    router.push('/home');
  } catch (error) {
    console.error('登入失敗原因：', error.response ? error.response.data : error);
    alert('登入失敗，帳號或密碼錯誤');
  }
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  outline: none;
  border: none;
  font-family: poppins;
}

/* [class^="fa-"],
[class*=" fa-"] {
  font-family: 'Font Awesome 6 Free';   
} */
.background-wrapper {
  position: fixed;      /* 固定在視窗 */
  top: 0; left: 0;      /* 從左上角開始 */
  width: 100vw;         /* 滿版寬 */
  height: 100vh;        /* 滿版高 */
  background-image: url(/back.webp);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  display: flex;
  justify-content: center;/* 水平置中 */
  align-items: center;/* 垂直置中 */
}
/* .background-wrapper::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: -1;
} */

  #login-form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    background-color: rgba(255, 255, 255, 0.1);
    width: 35%;
    padding: 50px 10px;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.329);
    backdrop-filter: blur(10px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.13);
    overflow: hidden;
  }
  h1 {
    font-size: 3rem;
    color: white;
    margin:0 0 50px;
    letter-spacing: 3px;

    animation: reloadA 1s ease-out forwards;
    opacity: 0;
    animation-delay: 0.2s;
  }
.input-wrap {
    border: 1px solid white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;
    height: 60px;
    width: 90%;
    border-radius: 50px;
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.459);
}
.in-1 {
  animation: reloadA 1.2s ease-out forwards;
  opacity: 0;
  animation-delay: 0.4s;
}
.in-2 {
  animation: reloadA 1.4s ease-out forwards;
  opacity: 0;
  animation-delay: 0.6s;
}
.input-wrap img.icon {
  width: 20px;      /* 調整大小 */
  height: 20px;
  margin-right: 20px; /* 與輸入框間距 */
  object-fit: contain; /* 圖片完整顯示 */
  filter: invert(1);
}
input {
  background-color: transparent;
  font-size: 1.2rem;
  color: white;
  padding: 5px 25px;
  flex: 1;
}
input::placeholder {
  font-size: 1.2rem;
  color: white;
}
.input-wrap i {
  font-size: 1.2rem;
  color: white;
  padding-right: 25px;
}
.rem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin-bottom: 40px;
  animation: reloadA 1.8s ease-out forwards;
  opacity: 0;
  animation-delay: 0.8s;
  
}
.rem p,
.rem a {
  font-size: 1.2rem;
  color: white;
  
  cursor: pointer;
}
button {
  font-size: 1.2rem;
  height: 60px;
  width: 90%;
  border-radius: 50px;
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: 25px;
  cursor: pointer;
  transition: 0.3s;

  animation: reloadA 2s ease-out forwards;
  opacity: 0;
  animation-delay: 1s;
}
button:hover {
  background-color: rgb(135, 135, 135);
}
.reg {
  font-size: 1.2rem;
  color: white;
  margin-top: 40px;
  animation: reloadA 2.2s ease-out forwards;
  opacity: 0;
  animation-delay: 1.2s;
}
.reg a {
  font-weight: 500;
  cursor: pointer;

}
/* Amimation */

@keyframes reloadA {
  from {
    transform: translateY(250px);
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

</style>

