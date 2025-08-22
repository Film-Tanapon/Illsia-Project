const storyScreen = document.getElementById("story-screen");
const storyText = document.getElementById("story-text");
const textBox = document.getElementById("text-box");
const choicesDiv = document.getElementById("choices");
const continueText = document.getElementById("continue-text");

let currentScene = null;
let isTyping = false;
let typeInterval = null;

const story = {
  start: {
    text: "คุณตื่นขึ้นมากลางป่ามืด เสียงลมพัดผ่านใบไม้ทำให้รู้สึกหนาวสั่นราวกับมีใครมองคุณอยู่รอบตัว คุณพยายามลุกขึ้นและมองไปรอบ ๆ เห็นทางเดินสองทาง",
    background : "https://images.unsplash.com/photo-1630695230041-8909e3204778?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZGFyayUyMGZvcmVzdHxlbnwwfHwwfHx8MA%3D%3D",
    next: "delay1"
  },
  delay1: {
    background : "https://media.istockphoto.com/id/1043674456/photo/path-in-dark-and-scary-forest.jpg?s=612x612&w=0&k=20&c=kusnz_NqH12kE5h0vnlHbb_BQcm0rCFN5rAWyms2Dmg=",
    delay: 3000,
    next: "scene1"
  },
  scene1: {
    text: "ทางเดินหนึ่งนำไปสู่หมู่บ้านที่ไกลลิบ อีกทางนำเข้าไปในป่ามืดที่แผ่ขยายไปไม่รู้จบ",
    background : "https://media.istockphoto.com/id/1043674456/photo/path-in-dark-and-scary-forest.jpg?s=612x612&w=0&k=20&c=kusnz_NqH12kE5h0vnlHbb_BQcm0rCFN5rAWyms2Dmg=",
    choices: [
      { text: "เดินไปหมู่บ้าน", next: "village" },
      { text: "เข้าไปในป่า", next: "forest" }
    ]
  },
  village: {
    text: "คุณเดินไปยังหมู่บ้านที่เงียบสงัด เสียงเท้าของคุณสะท้อนกับถนนหินเก่า ๆ หมู่บ้านดูเหมือนถูกทิ้งร้างมานาน แต่มีแสงไฟเล็ก ๆ ส่องออกมาจากหน้าต่างบ้านหลังหนึ่ง คุณจะเข้าไปตรวจสอบหรือไม่?",
    background : "https://i.pinimg.com/736x/30/46/b4/3046b465ba5c527f0e10b58783f187fc.jpg",
    choices: [
      { text: "เข้าไปตรวจสอบบ้าน", next: "house" },
      { text: "เดินต่อไปสำรวจหมู่บ้าน", next: "village_square" }
    ]
  },
  house: {
    text: "ภายในบ้านนั้นมีกล่องไม้เก่า ๆ วางอยู่บนโต๊ะ คุณเปิดมันพบจดหมายเก่า ๆ ที่กล่าวถึงคำสาปที่อยู่ในป่า การอ่านจดหมายทำให้คุณรู้สึกหนาววาบที่หลัง",
    background : "https://t4.ftcdn.net/jpg/05/29/68/77/360_F_529687786_L9Ye0sGI6bRxGsjaU5x0NTaUsxjq5KDj.jpg",
    next: "village_square"
  },
  village_square: {
    text: "เมื่อคุณออกจากบ้าน คุณเห็นลานกลางหมู่บ้าน เงามืดของต้นไม้ใหญ่ปกคลุมทั่วบริเวณ คุณรู้สึกว่ามีบางสิ่งเคลื่อนไหวอยู่ใกล้ ๆ แต่คุณไม่สามารถระบุได้ชัดเจน",
    background : "https://123.jpg",
    choices: [
      { text: "เดินไปสำรวจต้นไม้ใหญ่", next: "tree" },
      { text: "วิ่งกลับไปที่ทางออกของหมู่บ้าน", next: "start" }
    ]
  },
  tree: {
    text: "คุณเดินเข้าใกล้ต้นไม้ใหญ่ ใต้โคนต้นมีสัญลักษณ์ประหลาดที่สลักอยู่บนพื้นดิน ดูเหมือนเป็นคาถาโบราณที่เตือนให้อยู่ห่างจากที่นี่",
    background : "https://123.jpg",
    choices: [
      { text: "พยายามอ่านสัญลักษณ์", next: "curse" },
      { text: "ถอยกลับไปทางออกหมู่บ้าน", next: "start" }
    ]
  },
  curse: {
    text: "ทันทีที่คุณอ่านสัญลักษณ์ ความมืดรอบตัวคุณเริ่มหนาแน่นขึ้น จนคุณมองไม่เห็นทางใด ๆ เสียงกระซิบลึกลับดังขึ้นข้างหูคุณ",
    background : "https://123.jpg",
    next: "monster"
  },
  forest: {
    text: "คุณเดินเข้าไปในป่ามืด เสียงสัตว์ป่าและใบไม้ที่ถูกเหยียบทำให้คุณตื่นตัวอยู่ตลอดเวลา ทันใดนั้น คุณเห็นทางแยกที่แยกออกเป็นสามทาง",
    background : "https://123.jpg",
    choices: [
      { text: "เดินทางซ้าย", next: "left_path" },
      { text: "เดินทางตรง", next: "straight_path" },
      { text: "เดินทางขวา", next: "right_path" }
    ]
  },
  left_path: {
    text: "ทางซ้ายพาคุณไปยังลำธารที่ไหลเอื่อย คุณได้ยินเสียงน้ำและกลิ่นสดชื่นของธรรมชาติ ช่วงเวลานี้ทำให้คุณผ่อนคลายเล็กน้อย แต่คุณยังรู้สึกว่ามีอะไรซ่อนอยู่รอบ ๆ",
    background : "https://123.jpg",
    next: "forest_encounter"
  },
  straight_path: {
    text: "ทางตรงนำไปสู่พื้นที่มืดที่สุดของป่า ต้นไม้สูงและหนาทึบทำให้แสงแทบไม่เข้ามาถึงพื้น คุณเริ่มรู้สึกว่าไม่ได้อยู่คนเดียว",
    background : "https://123.jpg",
    next: "forest_encounter"
  },
  right_path: {
    text: "ทางขวาพาคุณไปยังทุ่งหญ้าที่สลับกับต้นไม้เตี้ย ๆ ทุ่งหญ้าเต็มไปด้วยดอกไม้ป่าที่สวยงาม แต่เสียงสัตว์แปลก ๆ ทำให้คุณขนลุก",
    background : "https://123.jpg",
    next: "forest_encounter"
  },
  forest_encounter: {
    text: "อยู่ ๆ มีเงามืดขนาดใหญ่ปรากฏออกมาจากพุ่มไม้ คุณมีเวลาเพียงเสี้ยววินาทีในการตัดสินใจว่าจะทำอย่างไร",
    background : "https://123.jpg",
    choices: [
      { text: "สู้กับเงามืด", next: "monster" },
      { text: "วิ่งหนีออกจากป่า", next: "start" }
    ]
  },
  monster: {
    text: "สัตว์ประหลาดโผล่มา! คุณพยายามหนีแต่ไม่มีทางรอด สุดท้ายคุณถูกมันจับได้และทุกอย่างมืดลง... เกมจบแล้ว",
    background : "https://123.jpg",
    choices: []
  },
  end: {
    text: "ขอบคุณที่เล่น Illsia! โลกแห่งป่ามืดและหมู่บ้านร้างยังคงรอผู้เล่นคนต่อไปที่จะค้นพบความลึกลับ",
    background : "https://123.jpg",
    choices: []
  }
};

// โหลดฉาก
function loadStory(scene) {
  currentScene = scene;
  const sceneData = story[scene];

  storyText.textContent = "";
  choicesDiv.innerHTML = "";

  if (sceneData.background) {
    document.body.style.backgroundImage = `url(${sceneData.background})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
  }
  // ถ้ามี delay แต่ไม่มีข้อความ
  if (sceneData.delay && !sceneData.text) {
    continueText.style.display = "none"; // ซ่อน Space
    textBox.style.display = "none";
    setTimeout(() => {
      if (sceneData.next) loadStory(sceneData.next);
    }, sceneData.delay);
    return; // ออกจากฟังก์ชันทันที
  }

  if (sceneData.choices && sceneData.choices.length > 0) {
    continueText.style.display = "none";
    const buttons = sceneData.choices.map(choice => {
      const btn = document.createElement("button");
      btn.textContent = choice.text;
      btn.onclick = () => loadStory(choice.next);
      choicesDiv.appendChild(btn);
      return btn;
    });

    if (sceneData.choices.length === 2) choicesDiv.style.top = "35%" , choicesDiv.style.gap = "60px" ;
    else if (sceneData.choices.length === 3) choicesDiv.style.top = "25%", choicesDiv.style.gap = "45px";
    else choicesDiv.style.top = "35%";

    typeWriter(sceneData.text, () => {
      buttons.forEach((btn, i) => setTimeout(() => btn.classList.add("show"), i * 300));
    });
  } else {
    typeWriter(sceneData.text, () => {
      continueText.style.display = "block";
    });
  }
}

function typeWriter(text, callback) {
  let i = 0;
  storyText.textContent = "";
  isTyping = true;

  textBox.style.display = "flex";
  continueText.style.display = "none"; // ซ่อน Space

  typeInterval = setInterval(() => {
    storyText.textContent += text.charAt(i);
    i++;
    if (i >= text.length) {
      clearInterval(typeInterval);
      isTyping = false;
      callback?.();
    }
  }, 50);
}

function proceedStory() {
  const sceneData = story[currentScene];
  if (isTyping) return;
  if (!sceneData.choices || sceneData.choices.length === 0) {
    if (sceneData.next) loadStory(sceneData.next);
  }
}

// Space หรือ Click เพื่อไปต่อ
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    proceedStory();
  }
});

storyScreen.addEventListener("click", () => {
  proceedStory();
});

// เริ่มจากฉากแรก
window.addEventListener("load", () => loadStory("start"));