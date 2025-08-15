<template>
  <SidePage />
  <div class="background-wrapper">
    <section id="head-form">
        <h1>Debug Duel Start</h1>
        <div class="input-wrap in-1">
            <input type="text" v-model="user_query" placeholder="Input Your Promblem" spellcheck="false" required>
            <i class="fa-solid fa-user"></i>
        </div>   
         <div class="input-wrap in-1">
            <!-- <input type="text" v-modl="error_msg" placeholder="Error Messenge" spellcheck="false" required> -->
            <label for="fileInput">References</label>
            <input type="file" @change="handleFileChange" />
            <p v-if="fileName">upload file：{{ fileName }}</p> 
        </div>  
        <div class="times">
          <input type="number" v-model="times" min="1" placeholder="輸入對話次數" />
          <button @click="startDebugDuel">Start</button>
        </div>


    </section>
    <section id="chat-form">
        <div class="center">
            <div class="parent-container">  
              <div class="left-img">
                  <img src="/angry-person01.png" alt="左圖" />
              </div>
              <div class="model_name">
                  <p>Nova</p>
                  <p>{{ modelStore.Nova_LLM_MODEL }}</p>
              </div>
            </div>
            <div class="chats">
              <div
                v-for="(chat, index) in chat_history"
                :key="index"
                :class="['chat-user', chat.role === 'Nova' ? 'user1' : 'user2']"
              >
                <div class="user-msg">
                  <p v-html="safeMarked(chat.answer)"></p>
                </div>
              </div>
              <ul :style="{ color: 'white' }">
                <p >Use tools:</p>
                <li v-for="tool in chat_history[chat_history.length - 1]?.tools_answer" :key="tool">
                  {{ tool }}
                </li>
              </ul>
            </div>

            <div class="parent-container">              
              <div class="right-img">
                  <img src="/angry-person02.png" alt="右圖" />
              </div>
              <div class="model_name">
                  <p>Ace</p>
                  <p>{{ modelStore.Ace_LLM_MODEL }}</p>
              </div>
            </div>
        </div>
    </section>
  </div>
</template>

<script  setup>
import { marked } from 'marked'
import SidePage from './Side_page.vue';
import { ref, nextTick  } from 'vue'
import { useModelStore } from '@/stores/ModelStore' 
import axios from 'axios';
const modelStore = useModelStore()

// const error_msg = ref('')
const user_query = ref('')
const context_info = ref('')
// const nova_answer = ref('')
// const ace_answer = ref('')
const times = ref('')
const chat_history = ref([])
//--------------------------------------------------------------------------------------------------
const fileName = ref('')
// const fileContent = ref('')

function handleFileChange(event) {
  const file = event.target.files[0]
  if (!file) return
  fileName.value = file.name

  const reader = new FileReader()
  reader.onload = () => {
    context_info.value = reader.result
    console.log('檔案內容:', context_info.value)
  }
  reader.readAsText(file) // 讀取純文字檔案
}
//---------------------------------------------------------------------------------------------------
const safeMarked = (text) => {
  if (!text) return ''   // 如果 text 是 null/undefined，回傳空字串
  // 去除 <think> 標籤的內容，依你之前需求也可以放在這裡
  const cleaned = text.replace(/<think>[\s\S]*?<\/think>/g, '')
  return marked(cleaned)
}
//-----------------------------------------------------------------------------------------------------
async function startDebugDuel() {
  const count = parseInt(times.value)
  if (isNaN(count) || count <= 0) {
    alert('請輸入有效的對話次數')
  return
  }
  chat_history.value = [] 
  let response1Data = null

  for(let i = 0; i < times.value; i++) {
    console.log('chat_history=', chat_history.value)
    console.log({
        query: user_query.value || "",
        context_info: context_info.value || "",
        other_think: response1Data || ""
      })
    try {
      const novaRes = await axios.post('http://127.0.0.1:8000/api/nova_answer/', {
        query: user_query.value || "",
        context_info: context_info.value || "",
        other_think: response1Data || ""
      })
      

      const nova_answer = novaRes.data
      response1Data = nova_answer
      // 立即推進畫面
      chat_history.value.push({
        role: 'Nova',
        answer: nova_answer.answer,
        tools_answer: nova_answer.tools_answer?.tool_usage || []
      })
      await nextTick() // ✅ 等畫面真正更新
      await new Promise(resolve => setTimeout(resolve, 1000))

      const aceRes = await axios.post('http://127.0.0.1:8000/api/ace_answer/', {
        query: user_query.value || "",
        // error_message: error_msg.value,
        context_info: context_info.value || "",
        other_think: response1Data || ""
      })
      const ace_answer = aceRes.data
      response1Data = ace_answer

      // 立即推進畫面
      chat_history.value.push({
        role: 'Ace',
        answer: ace_answer.answer,
        tools_answer: nova_answer.tools_answer?.tool_usage || []
      })
      await nextTick()

    } catch (error) {
      console.error('API 呼叫錯誤', error)
      alert(`錯誤訊息: ${JSON.stringify(error.response?.data) || error.message}`)
      break
    }
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
  background-image: url(/duel_back.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  flex-direction: column;

  display: flex;
  justify-content: center;/* 水平置中 */
  align-items: flex-start;/* 垂直置中 */
}
#head-form {
position: fixed;      /* 固定在視窗 */
top: 30px;
left: 50%;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
transform: translateX(-50%);

background-color: rgba(255, 255, 255, 0.1);
width: 35%;
border-radius: 10px;
border: 1px solid rgba(255, 255, 255, 0.329);
backdrop-filter: blur(10px);
box-shadow: 0 10px 25px rgba(0, 0, 0, 0.13);
overflow: hidden;
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
    margin-bottom: 20px;
    height: 40px;
    width: 90%;
    /* border-radius: 30%; */
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.459);
}

input, label {
  background-color: transparent;
  font-size: 1.2rem;
  color: white;
  padding: 5px 25px;
  flex: 1;
}
input::placeholder {
  font-size: 1rem;
  color: white;
}
.times {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 25px; /* 整個區塊下方空間 */
}
.times .input {
  display: flex;
  border: 1px solid white;
  padding: 0 10px;
  flex: 1;
  max-width: 100%;
  align-items: center;
}
.times button {
  font-size: 1.2rem;
  height: 30px;
  width: 100px;
  border-radius: 50px;
  font-weight: 600;
  letter-spacing: 1px;
  cursor: pointer;
  transition: 0.3s;
}
.times button:hover {
  background-color: rgb(234, 43, 5);
}


#chat-form {
  position: fixed;
  top: 65%; /* 根據你 head-form 的高度調整這裡 */
  left: 50%;
  transform: translate(-50%, -50%); /* 水平 + 垂直都微調置中 */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 50%;
  width: 80%;
  /* background-color: rgba(201, 201, 201, 0.503); */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 10px px rgb(255, 66, 3);
  backdrop-filter: blur(10px);
}

.center {
  width: 100%;
  display: flex;
  justify-content: space-between; /* 讓左右兩側跟中間平均分開 */
  align-items: center;
  height: 400px;
}
.left-img, .right-img {
  /* width: 30%; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.left-img img, .right-img img {
  max-width: 100%;
  height: auto;
}
.parent-container {
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 10px; /* 可調整間距 */
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
  height: 100%;
  width: 90%;
  padding: 10px;         /* 加內距避免貼邊 */
  box-sizing: border-box;
  overflow-y: auto;      /* 超出內容可滾動 */
  background-color: rgb(0, 0, 0);
  border: 1px solid rgb(255, 0, 0);
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

