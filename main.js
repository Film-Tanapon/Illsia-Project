const startBtn = document.getElementById("start-btn");
const settingBtn = document.getElementById("setting-btn");
const quitBtn = document.getElementById("quit-btn");

// เริ่มเกม → เปิดหน้า story
startBtn.addEventListener("click", () => {
  window.location.href = "/story.html";
});

// เปิดหน้า setting
settingBtn.addEventListener("click", () => {
  window.location.href = "/setting.html";
});

// Quit (ปิดหน้าต่าง)
quitBtn.addEventListener("click", () => {
  window.close();
});

// go to setting
function goToSettings() {
    window.location.href = "/setting.html";
}
