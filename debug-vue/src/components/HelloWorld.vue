<template>
  <div class="navbar">
    <input type="checkbox" id="checkbox" />
    <label for="checkbox">
      <p>☰</p>
    </label>
    <ul>
      <li>
        <img src="/back.jpg" alt="" />
        <span>USER NAME</span>
      </li>
      <li>
        <a href="javascript:;">
          <img src="/gear-solid.svg" class="icon" />
          <span>setting</span>
        </a>
      </li>
      <li>
        <a href="javascript:;">
          <img src="/file-excel-solid.svg" class="icon" />
          <span>logs</span>
        </a>
      </li>
      <button>logout</button>
    </ul>
  </div>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.navbar {
  /* position: relative; */
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}
/* 隱藏checkbox */
.navbar input {
  display: none;
}
/* 漢堡icon */
.navbar label {
  position: absolute;
  top: 0;
  left: 200px;
  font-size: 20px;
  color: #666;
  padding-left: 20px;
  cursor: pointer;
  transition: all 0.5s ease;
}
.navbar input:checked + label {
  left: 0;
}
.navbar input:checked + label i {
  transform: rotateY(180deg);
  transition: transform 0.5s ease;
}
/* 側邊欄 */
.navbar ul {
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 100vh;
  background-color: #20222a;
  transition: left 0.5s ease;
  overflow: auto;
  
}
.navbar input:checked ~ ul {
  left: -200px;
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
  font-size: 14px;
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
  font-size: 14px;
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
