<template>
  <div class="navbar">
    <input type="checkbox" id="checkbox" />
    <label for="checkbox">
      <p>☰</p>
    </label>
    <ul>
      <li>
        <img src="/back.jpg" alt="" />
        <span>{{ username }}</span>
      </li>
      <li>
        <a href="javascript:;">
          <img src="/gear-solid.svg" class="icon" />
          <router-link to="/home">StartDuel</router-link>
        </a>
      </li>
      <li>
        <a href="javascript:;">
          <img src="/gear-solid.svg" class="icon" />
          <router-link to="/settings_page">Settings</router-link>
        </a>
      </li>
      <li>
        <a href="javascript:;">
          <img src="/file-excel-solid.svg" class="icon" />
          <router-link to="/log_manager">Logs</router-link>
        </a>
      </li>
      <li>
        <a href="javascript:;">
          <img src="/file-excel-solid.svg" class="icon" />
          <router-link to="/data_search">Data_search</router-link>
        </a>
      </li>
      <button @click="handleLogOut">Logout</button>
    </ul>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import axios from 'axios'
const username = ref(localStorage.getItem('username') || '')

onMounted(async () => {
  const token = localStorage.getItem('access_token')
  if (token) {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/user_info/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(res.data)
      username.value = res.data.username
    } catch (err) {
      console.error('取得使用者資料失敗', err)
    }
  }
})

const router = useRouter()
function handleLogOut() {
  // 清除登入資料
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('username')
  router.push('/login')
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.navbar {
  /* position: relative; */
  z-index: 1000;
  width: 100%;
  height: 100%;
  line-height: 50px;
  /* background-color: #ffffff; */
  /* box-shadow: 0 1px 2px rgba(255, 255, 255, 0.1); */
}
/* 隱藏checkbox */
.navbar input {
  display: none;
}
/* 漢堡icon */
.navbar label {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 20px;
  color: #ffffff;
  padding-left: 20px;
  cursor: pointer;
  transition: all 0.5s ease;
}
.navbar input:checked + label {
  left: 200px;
}
.navbar input:checked + label i {
  transform: rotateY(180deg);
  transition: transform 0.5s ease;
}
/* 側邊欄 */
.navbar ul {
  position: absolute;
  top: 0;
  left: -200px;
  width: 200px;
  height: 100vh;
  background-color: #241101d6;
  transition: left 0.5s ease;
  overflow: auto;
  box-shadow: 0 10px 25px rgb(255, 66, 3);
  backdrop-filter: blur(10px);
  
}
.navbar input:checked ~ ul {
  left: 0;
}
.navbar ul li {
  width: 0%;
  height: 70px;
  margin-bottom: 10px;
  margin-top: 10px;
}
.navbar ul li:first-child {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 150px;
}
.navbar ul li:first-child img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.navbar ul li:first-child span {
  color: #fff;
  font-size: 20px;
  white-space: nowrap;
}

.navbar ul li a {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  color: #d2d2d2;
  text-decoration: none;
  border-left: 6px solid transparent;
}
.navbar ul li a i {
  font-size: 18px;
  margin: 0 15px;
}
.navbar ul li a span {
  font-size: 20px;
}
.navbar ul li a:hover {
  color: #fff;
  border-left-color: #fb7299;
}

button {
  font-size: 1.2rem;
  height: 50px;
  width: 80%;
  border-radius: 30px;
  font-weight: 600;
  letter-spacing: 1px;
  cursor: pointer;
  margin: 0 20px;
}
button:hover {
  background-color: rgb(135, 135, 135);
}
img.icon {
  width: 20px;      /* 調整大小 */
  height: 20px;
  margin-right: 20px; /* 與輸入框間距 */
  margin-left: 20px; /* 與輸入框間距 */
  object-fit: contain; /* 圖片完整顯示 */
  filter: invert(1);
}
</style>
