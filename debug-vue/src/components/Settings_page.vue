<template>
  <SidePage />
  <div class="background-wrapper">
    <section id="settings-form">
        <h1>參數設定</h1>

        <div class="form-group">
        <label>Ace LLM Model</label>
        <select v-model="modelStore.Ace_LLM_MODEL">
          <option v-for="option in modelStore.LLM_MODEL_OPTIONS" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>Nova LLM Model</label>
        <select v-model="modelStore.Nova_LLM_MODEL">
          <option v-for="option in modelStore.LLM_MODEL_OPTIONS" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>


      <div class="form-group">
        <label>Embedding Model</label>
        <select v-model="modelStore.EMBEDDING_MODEL">
          <option v-for="option in modelStore.EMBEDDING_MODEL_OPTIONS" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>Split Type</label>
        <select v-model="SPLIT_TYPE">
          <option v-for="option in SPLIT_TYPE_OPTIONS" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>Chunk Size</label>
        <input type="number" v-model="CHUNK_SIZE" />
      </div>

      <div class="form-group">
        <label>資料夾路徑</label>
        <input v-model="DATA_FOLDER" />
      </div>

      <div class="form-group">
        <label>儲存路徑</label>
        <input v-model="SAVE_FOLDER" />
      </div>

      <div class="form-group">
        <label>Qdrant URL</label>
        <input v-model="QDRANT_URL" />
      </div>

      <!-- <div class="form-group">
        <label>Index 名稱</label>
        <select v-model="INDEX_NAME">
          <option v-for="option in INDEX_NAME_OPTIONS" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div> -->
      <div>
        <div class="button_area">
          <button @click="loadModels">Set Config</button>
          
          <button @click="unloadModels">Unload Model</button>
          <button @click="modelStore.resetToDefault()">↩️ Reset to Default</button>
          <button @click="getLoadedModels()">↩️ 刷新</button>
        </div>
        <p class="info" :style="{ color: 'white' }">
          LLM:
          <span v-if="loadedModels.llm?.names?.length > 0">{{ loadedModels.llm.names }}</span>
          <span v-else-if="isLoading">載入中...</span>
          <span v-else>尚未載入</span>
          <br />
          Embedding:
          <span v-if="loadedModels.embedding?.name">{{ loadedModels.embedding.name }}</span>
          <span v-else-if="isLoading">載入中...</span>
          <span v-else>尚未載入</span>
        </p>
      </div>
    </section>
  </div>
</template>

<script  setup>
import SidePage from './Side_page.vue'
import { onMounted, ref } from 'vue' 
import axios from 'axios'
import { useModelStore } from '@/stores/ModelStore' 
const loadedModels = ref('')
const isLoading = ref(false)

const modelStore = useModelStore()

///onMounted 是在組件「渲染完成並且插入到頁面 DOM 之後」自動執行一段程式碼的鉤子（hook），
///常用來做初始化工作（像是抓資料、啟動動畫），但它本身不是「渲染」，而是「在渲染後觸發執行」
onMounted(async () => {
  try {
    console.log('獲取選項')
    const response = await axios.get('http://127.0.0.1:8000/api/get_model_list_view/')

    // 直接賦值給 Pinia store 的 ref 變數
    modelStore.LLM_MODEL_OPTIONS = response.data.llm_models
    modelStore.EMBEDDING_MODEL_OPTIONS = response.data.embedding_models

    // 初始化預設值
    modelStore.Ace_LLM_MODEL.value = response.data.llm_models[0] || ''
    modelStore.Nova_LLM_MODEL.value = response.data.llm_models[1] || ''
    modelStore.EMBEDDING_MODEL.value = response.data.embedding_models[0] || ''

  } catch (error) {
    console.error('取得模型清單失敗:', error)
  }
})

console.log('配置成功')
// 載入模型
const loadModels = async () => {
  try {
    await axios.post('http://127.0.0.1:8000/api/load_models/',{
    "llm_model_names": [modelStore.Ace_LLM_MODEL, modelStore.Nova_LLM_MODEL],
    "embedding_model": modelStore.EMBEDDING_MODEL
  })
    await getLoadedModels()
    console.log('模型載入成功')
    
  } catch (err) {
    console.error('模型載入失敗:', err)
  }
}
// 卸載模型
const unloadModels = async () => {
  try {
    await axios.get('http://127.0.0.1:8000/api/unload_models/')
    await getLoadedModels()
    console.log('模型卸載成功')
  } catch (err) {
    console.error('模型卸載失敗:', err)
  }
}
const getLoadedModels = async () => {
  try {
    isLoading.value = true
    const res = await axios.get('http://127.0.0.1:8000/api/get_model_info/')
    loadedModels.value = res.data
  } catch (err) {
    console.error('取得載入模型資訊失敗:', err)
  }finally {
    isLoading.value = false
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
#settings-form {
position: fixed;      /* 固定在視窗 */
top: 30px;
left: 50%;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
transform: translateX(-50%);

background-color: rgba(255, 255, 255, 0.1);
width: 50%;
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
.form-group {
  display: flex;
  align-items: center;
  justify-content: space-between; /* 左右兩端對齊 */
  margin-bottom: 20px;
  height: 40px;
  width: 90%;
  font-size: 1.2rem;
  
}
.form-group > label {
  flex: 1; /* 左邊 label 佔 1 單位 */
  color: white;
  font-weight: 600;
  text-shadow: 0px 0px 20px rgb(0, 0, 0);
}

.form-group > select,
.form-group > input {
  flex: 2; /* select 佔 2 單位 */
  height: 30px;
  background-color: rgba(191, 180, 180, 0.456);
  border: 1px solid white;
  border-radius: 6px;
  padding: 4px 8px;
  color: rgb(255, 255, 255);
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.46);
  font-size: 1.2rem;

}

/* label {
  background-color: transparent;
  font-size: 1rem;
  color: white;
  padding: 5px 25px;
  flex: 1;
} */
label::placeholder {
  font-size: 1rem;
  color: white;
}
button {
  font-size: 1.2rem;
  min-height: 30px;
  flex: 1;          /* 平分父容器寬度 */
  min-width: 0;     /* 防止超出 */
  padding: 0 20px;
  border-radius: 50px;
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: 25px;
  cursor: pointer;
  transition: 0.3s;
  height: auto; 
}
button:hover {
  background-color: rgb(234, 43, 5);
}

.info {
  margin-bottom: 20px;
  font-size: 1.2rem;
}
.button_area {
  display: flex;             /* 啟用 flex */
  justify-content: space-between;  /* 三個按鈕間隔分散 */
  align-items: center;       /* 垂直置中 */
  gap: 20px;
}
</style>

