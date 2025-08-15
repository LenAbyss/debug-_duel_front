<template>
  <SidePage />
  <div class="background-wrapper">
    <section id="chat-form">
        <div class="center">
            <h1>SQL DATA ASISRANT</h1>
            <div class="chats">
              <div
                v-for="(chat, index) in chat_history"
                :key="index"
                :class="['chat-user', chat.role === 'user' ? 'user1' : 'user2']"
              >
                <div class="user-msg">
                  <p v-html="chat.answer"></p>
                </div>
              </div>
            </div>
        <div class="input-wrap in-1">
            <input type="text" v-model="user_query" 
            placeholder="Input Your Promblem" spellcheck="false" required
            @keyup.enter="submitQuery">
            <i class="fa-solid fa-user"></i>
        </div>     
        </div>


    </section>
    <!-- <section id="chat-form">

    </section> -->
  </div>
</template>

<script  setup>
import { ref } from 'vue'
import SidePage from './Side_page.vue'

const user_query = ref('')
const chat_history = ref([])

function submitQuery() {
  if (!user_query.value.trim()) return  // 避免空訊息送出

  chat_history.value.push({
    role: 'user',
    answer: user_query.value.trim(),
  })

  user_query.value = '' // 清空輸入框

  // 這裡未來可以放呼叫 SQL API 的邏輯
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
  background-image: url(/duel_back.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  flex-direction: column;

  display: flex;
  justify-content: center;/* 水平置中 */
  align-items: flex-start;/* 垂直置中 */
}
h1 {
font-size: 2rem;
color: white;
margin:0 0 10px;
letter-spacing: 3px;
}
.input-wrap {
    border: 1px solid white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    width: 90%;
    border-radius: 10px;
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.459);
    font-size: 1.5rem;
}
input, label {
  background-color: transparent;
  color: white;
  padding: 5px 25px;
  flex: 1;
}
input::placeholder {
  color: white;
}
#chat-form {
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 90%;
  width: 70%;
  padding: 20px;
  border-radius: 10px;
  background-color: #38383895;
  box-shadow: 0 10px px rgb(255, 66, 3);
  backdrop-filter: blur(10px);
}
.center {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  gap: 15px;
}
.parent-container {
  width: 50%;
  display: flex;
  flex-direction: column;
}
.model_name {
  color: aliceblue;
  font-size: 1.5rem;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  text-shadow: 1px 1px 20px #000000;
}


.chats {
  /* border: 1px solid white; */
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 80%;
  width: 90%;
  padding: 20px;         /* 加內距避免貼邊 */
  box-sizing: border-box;
  overflow-y: auto;      /* 超出內容可滾動 */
  background-color: rgb(0, 0, 0);
  border: 1px solid rgb(255, 255, 255);
  border-radius: 20px;
  font-size: 1.2rem;
}
.chat-user {
  display: flex;
}
.chat-user.user1 {
  justify-content: flex-start;
  margin-left: 0;        /* 不要超出左邊 */
  align-items: flex-start;
}
.chat-user.user2 {
  justify-content: flex-end;
  margin-right: 10;       /* 不要超出右邊 */
  align-items: flex-end;
  margin-top: 10px;
}

.user-msg {
  max-width: 70%;
  background-color: #fff;
  padding: 8px 15px;
  border-radius: 15px;
  color: white;
  word-break: break-word;  /* 避免長字串跑版 */
}
.chat-user.user1 .user-msg {
  background-color: #1100ff;
}
.chat-user.user2 .user-msg {
  background-color: #ff3f21;
}

</style>

