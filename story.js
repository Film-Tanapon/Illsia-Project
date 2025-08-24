const storyScreen = document.getElementById("story-screen");
const storyText = document.getElementById("story-text");
const textBox = document.getElementById("text-box");
const choicesDiv = document.getElementById("choices");
const continueText = document.getElementById("continue-text");

let currentScene = null;
let isTyping = false;
let typeInterval = null;

const preloadImages = () => {
  const urls = Object.values(story)
    .map(scene => scene.background)
    .filter(url => url); // เอาเฉพาะที่มี background

  urls.forEach(url => {
    const img = new Image();
    img.src = url; // preload
  });
};

const story = {
  start: {
    text: '"แฮ่ก- แฮ่ก" \nร่างกายคุณอาบชุ่มไปด้วยเหงื่อ เสียงลมหวีดหวิวสวนทางกับคุณที่พุ่งตรงไปด้านหน้า อะดรีนาลีนที่หลั่งทำให้ฝีเท้าคุณก้าวยาวขึ้น \nคุณวิ่งเร็วขึ้นเรื่อย ๆ จนกระทั่ง .. ',
    background : "https://github.com/Film-Tanapon/Illusia-Project/blob/main/picture/Scene_1.png?raw=true",
    next: "delay_faint_1"
  },
  delay_faint_1: {
    text: "",
    background : "https://github.com/Film-Tanapon/Illusia-Project/blob/main/picture/Delay_faint_1.png?raw=true",
    delay : 1000,
    next: "delay_faint_2"
  },
  delay_faint_2: {
    text: "",
    background : "https://github.com/Film-Tanapon/Illusia-Project/blob/main/picture/Delay_faint_2.png?raw=true",
    delay : 1000,
    next: "delay_faint_3"
  },
  delay_faint_3: {
    text: "",
    background : "https://github.com/Film-Tanapon/Illusia-Project/blob/main/picture/Delay_faint_3.png?raw=true",
    delay : 1000,
    next: "scene_2"
  },
  scene_2: {
    text: "‘ ตุบ- ’ \nสายตาคุณมืดมิด ประสาทการรับรู้ถูกปิดกั้นด้วยบางสิ่ง",
    background : "https://github.com/Film-Tanapon/Illusia-Project/blob/main/picture/Scene_2.png?raw=true",
    next: "delay_scene_3"
  },
  scene_3: {
    text: "เมื่อคุณลืมตาขึ้นมาอีกครั้ง คุณกลับเห็นเพดานห้องสีขาว ตัวคุณนอนราบอยู่บนเตียง มีผ้าห่มคลุมทับถึงช่วงอก \nนั่นอาจเป็นสาเหตุที่เหงื่อกาฬคุณไหลซึมจนเปียกชื้น คุณค่อย ๆ หยัดกายลุกขึ้นช้า ๆ",
    background : "https://github.com/Film-Tanapon/Illusia-Project/blob/main/picture/Scene_3.png?raw=true",
    next: "scene_4"
  },
    delay_scene_4: {
    text: "",
    background : "https://github.com/Film-Tanapon/Illusia-Project/blob/main/picture/Delay_Scene_4,Explore_room.png?raw=true",
    delay : 1000,
    next: "delay_faint_2"
  },
  scene_4: {
    text: "ภาพตรงหน้าเรียกได้ว่าเป็นห้องนอนห้องหนึ่ง คุณกวาดสายตามองไปรอบ ๆ ความคุ้นเคยที่เพิ่มขึ้นทีละน้อยทำให้คุณมั่นใจ- นี่คือห้องนอนของคุณ มันคล้ายกับในความทรงจำ แต่คุณยังอดไม่ได้ที่จะรู้สึกว่ามันประหลาด",
    background : "https://github.com/Film-Tanapon/Illusia-Project/blob/main/picture/Scene_4.png?raw=true",
    next: "explore_room"
  },
  explore_room: {
    text: "คุณจะสำรวจห้องนอนของคุณหรือไม่ ?",
    background : "https://github.com/Film-Tanapon/Illusia-Project/blob/main/picture/Delay_Scene_4,Explore_room.png?raw=true",
    choices: [
      { text: "สำรวจ", next: "explore_1" },
      { text: "ไม่สำรวจ", next: "scene_5" }
    ]
  },
  explore_1: {
    text: "คุณตัดสินใจที่จะสำรวจห้องนอนของคุณ ทุกอย่างดูปกติดี เว้นแต่สมุดปริศนาที่วางไว้อยู่บนโต๊ะข้างเตียงนอน \nคุณหยิบมันขึ้นมา หน้าปกดูเก่าและใกล้จะพังเต็มที ไม่น่าเชื่อว่ายังมีคนใช้งานมันอยู่ได้ \nคุณจะเปิดไดอารี่อ่านหรือไม่ ?",
    background : "https://github.com/Film-Tanapon/Illusia-Project/blob/main/picture/Explore_1,Dairy_1_save.png?raw=true",
    choices: [
      { text: "เปิด", next: "diary_1_open" },
      { text: "ไม่เปิด", next: "diary_1_save" }
    ]
  },
  diary_1_open: {
    text: "ด้วยความอยากรู้ที่คุณมี คุณเลือกจะเปิดไดอารี่นั้นอ่าน ในหน้ากระดาษที่ยับเยิน ข้อความเขียนด้วยดินสอสีเข้มราวกับกล่าวเตือนคุณ \nตัวหนังสือไม่เรียบร้อยเรียงเป็นข้อความว่า ‘รีบออกไปซะ !’ ลมหายใจคุณสะดุด คุณรีบเลื่อนสายตามองหาทางออกอย่างรวดเร็ว‘",
    background : "https://github.com/Film-Tanapon/Illusia-Project/blob/main/picture/Diary_1_open.png?raw=true",
    next: "scene_5"
  },
  diary_1_save: {
    text: "คุณเก็บไดอารี่ไว้กับตัว ตัดสินใจที่จะไม่อ่านเนื้อหาด้านใน ในตอนที่คุณเงยหน้าขึ้นมา คุณเห็นประตูบานหนึ่งอยู่ตรงหน้า \nมันจะต้องเป็นประตูที่เปิดออกสู่ข้างนอกห้องอย่างแน่นอน คุณไม่ลังเลที่จะเปิดมัน \nto be continue …",
    background : "https://github.com/Film-Tanapon/Illusia-Project/blob/main/picture/Explore_1,Dairy_1_save.png?raw=true",
    next: "scene_5"
  },
  scene_5: {
    text: "คุณเห็นประตูบานหนึ่งอยู่ตรงหน้า มันจะต้องเป็นประตูที่เปิดออกสู่ข้างนอกห้องอย่างแน่นอน คุณไม่ลังเลที่จะเปิดมัน \nto be continue …",
    background : "https://github.com/Film-Tanapon/Illusia-Project/blob/main/picture/Scene_5.png?raw=true",
    next: "end"
  },
};

// โหลดฉาก
function loadStory(scene) {
  currentScene = scene;
  const sceneData = story[scene];
  textBox.style.display = "none"

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
    if (text.charAt(i) === "\n") {
      storyText.innerHTML += "<br>";
    } else {
      storyText.innerHTML += text.charAt(i);
    }
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

  // ตรวจสอบว่าฉากสุดท้าย
  if (currentScene === "end") {
    window.location.href = "index.html"; // กลับไปหน้า index.html
    return;
  }

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
  preloadImages();
  proceedStory();
});

// เริ่มจากฉากแรก
window.addEventListener("load", () => loadStory("start"));