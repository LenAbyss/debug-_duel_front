<template>
  <div class="background-wrapper">
    <section id="login-form">
      <h1>Register</h1>
      <div class="input-wrap in-1">
        <input type="text" v-model="username" placeholder="Name" spellcheck="false" required>
        <img src="/user-solid.svg" class="icon" />
      </div>
      <div class="input-wrap in-1">
        <input type="text" v-model="email" placeholder="Set Your email" spellcheck="false" required>
        <img src="/user-solid.svg" class="icon" />
      </div>
      <div class="input-wrap in-2">
        <input type="password" v-model="password" placeholder="Set Your password" spellcheck="false" required>
        <img src="/lock-solid.svg" class="icon" />
      </div>

      <button @click="handleLogin">Create Acount</button>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const username = ref('')
const email = ref('')
const password = ref('')

async function handleLogin() {
  if (username.value.trim() !== '' && email.value.trim() !== '' && password.value.trim() !== '') {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register/', {
        username: username.value.trim(),
        email: email.value.trim(),
        password: password.value.trim()
      })
      console.log('註冊成功：', response.data)
      router.push('/login')  // ✅ 登入後跳轉
    } catch (error) {
      console.error('錯誤：', error)
      alert('註冊失敗，請檢查帳號密碼或伺服器狀態')
    }
  } else {
    alert('請輸入帳號和密碼')
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

