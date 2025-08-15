<template>
<SidePage />
<div class="background-wrapper">
  <section id="settings-form">
    <input
      v-model="searchName"
      placeholder="Search log name"
      class="input"
    />
    <table class="table">
      <thead>
        <tr class="label">
          <th @click="sortBy('prenom')" style="cursor: pointer;">
            Log Name
            <span v-if="sortKey === 'prenom'">{{ sortOrder === 1 ? '▲' : '▼' }}</span>
          </th>
          <th @click="sortBy('date')" style="cursor: pointer;">
            Date
            <span v-if="sortKey === 'date'">{{ sortOrder === 1 ? '▲' : '▼' }}</span>
          </th>
          <th class="label">Note</th>
          <th class="label">Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in paginatedData"
          :key="index"
        >
          <td class="data">{{ row.prenom }}</td>
          <td class="data">{{ row.date }}</td>
          <td class="data">{{ row.note }}</td>
          <td><button>delete</button></td>
        </tr>
        <tr v-if="paginatedData.length === 0">
          <td colspan="5" class="p-4 text-center text-gray-500">
            No data found.
          </td>
        </tr>
      </tbody>
    </table>

<!-- 頁碼控制 -->
<nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item">
      <a 
        class="page-link" 
        href="#" 
        aria-label="Previous"
        @click.prevent="prevPage"
      >
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>

    <li 
      v-for="page in visiblePageNumbers" 
      :key="page" 
      :class="['page-item', { active: page === currentPage }]"
    >
      <a 
        class="page-link" 
        href="#"
        @click.prevent="goToPage(page)"
      >
        {{ page }}
      </a>
    </li>

    <li class="page-item">
      <a 
        class="page-link" 
        href="#" 
        aria-label="Next"
        @click.prevent="nextPage"
      >
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
   
</section>

</div>  
</template>


<script setup>
import { ref, computed, watch } from "vue";
import SidePage from './Side_page.vue'

const data = ref([
  { prenom: "AJitender", date: "01/01/2015", examen: "Français", note: "12/20" },
  { prenom: "BJahid", date: "05/09/2015", examen: "Philosophie", note: "8/20" },
  { prenom: "CValentin", date: "05/09/2015", examen: "Philosophie", note: "4/20" },
  { prenom: "DMilton", date: "05/09/2015", examen: "Philosophie", note: "10/20" },
  { prenom: "EGonesh", date: "01/01/2015", examen: "Français", note: "14/20" },
  { prenom: "CValentin", date: "05/09/2015", examen: "Philosophie", note: "4/20" },
  { prenom: "DMilton", date: "05/09/2015", examen: "Philosophie", note: "10/20" },
  { prenom: "EGonesh", date: "01/01/2015", examen: "Français", note: "14/20" },
  { prenom: "AJitender", date: "01/01/2015", examen: "Français", note: "12/20" },
  { prenom: "BJahid", date: "05/09/2015", examen: "Philosophie", note: "8/20" },
  { prenom: "CValentin", date: "05/09/2015", examen: "Philosophie", note: "4/20" },

]);
const searchName = ref('');
const sortKey = ref('date');
const sortOrder = ref(1); // 1 = asc, -1 = desc
const currentPage = ref(1);
const pageSize = 3;

//---------------------------------------------排序------------------------------------------
function sortBy(key) {
  if (sortKey.value === key) {
    sortOrder.value = -sortOrder.value; // 切換排序方向
  } else {
    sortKey.value = key;
    sortOrder.value = 1;
  }
  currentPage.value = 1; // 排序改變時回到第 1 頁
}
//---------------------------------------------篩選------------------------------------------
const filteredAndSortedData = computed(() => {
  // 篩選
  let filtered = data.value.filter(row =>
    row.prenom.toLowerCase().includes(searchName.value.toLowerCase())
  );

  // 排序
  if (sortKey.value) {
    filtered.sort((a, b) => {
      let valA = a[sortKey.value];
      let valB = b[sortKey.value];

      if (sortKey.value === 'date') {
        valA = new Date(valA);
        valB = new Date(valB);
      }

      if (valA < valB) return -1 * sortOrder.value;
      if (valA > valB) return 1 * sortOrder.value;
      return 0;
    });
  }
  return filtered;
});

//-----------------------------------------計算頁數
const totalPages = computed(() => Math.ceil(filteredAndSortedData.value.length / pageSize))
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredAndSortedData.value.slice(start, start + pageSize)
})

function goToPage(page) {
  currentPage.value = page
}
function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}
function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}
//-------------------------------最多顯示幾個頁碼
const visiblePageNumbers = computed(() => {
  const maxVisible = 3; // 
  const half = Math.floor(maxVisible / 2);
  let start = currentPage.value - half;
  let end = currentPage.value + half;

  if (start < 1) {
    start = 1;
    end = Math.min(totalPages.value, maxVisible);
  }
  if (end > totalPages.value) {
    end = totalPages.value;
    start = Math.max(1, end - maxVisible + 1);
  }
  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

//確保過濾後頁數從第一頁開始
watch(() => searchName.value, () => {
  currentPage.value = 1;
});


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
width: 60%;
border-radius: 10px;
border: 1px solid rgba(255, 255, 255, 0.329);
backdrop-filter: blur(10px);
box-shadow: 0 10px 25px rgba(0, 0, 0, 0.13);
overflow: hidden;
}
.table {
  border-collapse: collapse;
  width: 90%;
  background-color: rgb(255, 255, 255);
  margin-bottom: 30px;
  border-radius: 10px;
  color: #676767;
}
th, td {
  border: 1px solid #c9c9c9;
  padding: 8px 25px;
  text-align: left;
  border-left: none; 
  border-right: none; 
}
.table tr:hover td{
  background-color: #e6e4e2; 
}
.table tr:first-child th {
  border-top: none; /* 移除頂部格線 */
}
.table tr:last-child td {
  border-bottom: none; /* 移除底部格線 */
}
.label {
  font-size: 1.2rem;
  align-items: center;
  color: rgb(0, 0, 0);
  font-weight: 600;
}
.data {
  font-size: 1.2rem;
  line-height: 2;
}
.input {
  flex: 2; /* select 佔 2 單位 */
  height: 30px;
  background-color: rgba(191, 180, 180, 0.456);
  border: 1px solid white;
  border-radius: 6px;
  padding: 4px 8px;
  color: rgb(255, 255, 255);
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.46);
  font-size: 1.2rem;
  margin-bottom: 20px;
  margin-top: 20px;
}

button {
  font-size: 1.2rem;
  padding: 0 10px;
  border-radius: 50px;
  font-weight: 600;
  letter-spacing: 1px;
  cursor: pointer;
  transition: 0.3s;
  height: auto; 
  color: red;
  border: 1px solid rgba(153, 153, 153, 0.329);
}
button:hover {
  background-color: rgb(234, 43, 5);
  color: aliceblue;
}


.pagination {
  display: flex;
  list-style: none;
  padding-left: 0;
  font-size: 1.2rem;
  padding-bottom: 10px;
}
.page-item {
  margin: 0 4px;
}
.page-link {
  display: block;
  padding: 0.5rem 0.75rem;
  border: 1px solid #dee2e6;
  border-radius: 1rem;
  color: #ffffff;
  text-decoration: none;
}
.page-link:hover {
  background-color: #ffffff;
  color: #676767;
}
.page-item.active .page-link {
  background-color: #bfbfbf; /* 藍色背景 */
  color: white;
  font-weight: bold;
}
</style>
