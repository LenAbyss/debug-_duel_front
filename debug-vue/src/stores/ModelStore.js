import { defineStore } from 'pinia'
import { ref } from 'vue'


const defaultAceModel = 'openai-gpt4'
const defaultNovaModel = 'openai-gpt4'
const defaultEmbeddingModel = 'BAAI/bge-small-zh'

export const useModelStore = defineStore('ModelStore', () => {

  const LLM_MODEL_OPTIONS = ref([])   // 選項，不 persist
  const EMBEDDING_MODEL_OPTIONS = ref([])

  const Ace_LLM_MODEL = ref('')    // 選中的模型，要 persist
  const Nova_LLM_MODEL = ref('')
  const EMBEDDING_MODEL = ref('')

  // 重設選中的模型為預設值（但不改選項）
  function resetToDefault() {
    Ace_LLM_MODEL.value = defaultAceModel
    Nova_LLM_MODEL.value = defaultNovaModel
    EMBEDDING_MODEL.value = defaultEmbeddingModel
  }

  return {
    LLM_MODEL_OPTIONS,
    EMBEDDING_MODEL_OPTIONS,
    Ace_LLM_MODEL,
    Nova_LLM_MODEL,
    EMBEDDING_MODEL,
    resetToDefault
  }
}, {
  persist: {
    paths: ['Ace_LLM_MODEL', 'Nova_LLM_MODEL', 'EMBEDDING_MODEL', 'LLM_MODEL_OPTIONS', 'EMBEDDING_MODEL_OPTIONS']
  }
})
