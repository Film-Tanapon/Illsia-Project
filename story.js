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
    background : "https://cdn.discordapp.com/attachments/1408368721583538176/1408380610564853800/IMG_9653.png?ex=68aa30e8&is=68a8df68&hm=abdd735253a062852d8e2eb85947817177683d2412487e1ad92a1a879cefe0b8",
    next: "delay_faint_1"
  },
  delay_faint_1: {
    text: "",
    background : "https://cdn.discordapp.com/attachments/1408368721583538176/1408715193659293737/IMG_6539.png?ex=68aabfc2&is=68a96e42&hm=0118cad704754373d1c98f430a8a9ca274d4038e04b0eaf956d37dd588b96863&",
    delay : 750,
    next: "delay_faint_2"
  },
  delay_faint_2: {
    text: "",
    background : "https://cdn.discordapp.com/attachments/1408368721583538176/1408715194246627338/IMG_6538.png?ex=68aabfc2&is=68a96e42&hm=be2583933185591b885f6a768a4263f1fdb2fffe02137822b8ea4b5aa9d7e483&",
    delay : 750,
    next: "delay_faint_3"
  },
  delay_faint_3: {
    text: "",
    background : "https://cdn.discordapp.com/attachments/1408368721583538176/1408715195135561778/IMG_6537.png?ex=68aabfc3&is=68a96e43&hm=95625ef364e7005dac9de650fa08696dbf2e0b2dfb4d306b1447e0435b60168f&",
    delay : 750,
    next: "scene_2"
  },
  scene_2: {
    text: "‘ ตุบ- ’ \nสายตาคุณมืดมิด ประสาทการรับรู้ถูกปิดกั้นด้วยบางสิ่ง",
    background : "https://cdn.discordapp.com/attachments/1408368721583538176/1408704081391915102/plain-black-background-02fh7564l8qq4m6d.png?ex=68aab569&is=68a963e9&hm=d4a2a0329482ad1c2406de56b944c02adea7a427e55fc754a38e7df6efb6e976",
    next: "scene_3"
  },
  scene_3: {
    text: "เมื่อคุณลืมตาขึ้นมาอีกครั้ง คุณกลับเห็นเพดานห้องสีขาว ตัวคุณนอนราบอยู่บนเตียง มีผ้าห่มคลุมทับถึงช่วงอก \nนั่นอาจเป็นสาเหตุที่เหงื่อกาฬคุณไหลซึมจนเปียกชื้น คุณค่อย ๆ หยัดกายลุกขึ้นช้า ๆ",
    background : "https://cdn.discordapp.com/attachments/1408368721583538176/1408385717079511120/IMG_6523.png?ex=68aa35a9&is=68a8e429&hm=dfe6473872f905eb656958403b313af7d082f60a4d90873f1c2d9a92125d6033",
    next: "scene_4"
  },
  scene_4: {
    text: "ภาพตรงหน้าเรียกได้ว่าเป็นห้องนอนห้องหนึ่ง คุณกวาดสายตามองไปรอบ ๆ ความคุ้นเคยที่เพิ่มขึ้นทีละน้อยทำให้คุณมั่นใจ- นี่คือห้องนอนของคุณ มันคล้ายกับในความทรงจำ แต่คุณยังอดไม่ได้ที่จะรู้สึกว่ามันประหลาด",
    background : "https://cdn.discordapp.com/attachments/1408368721583538176/1408697075566121051/IMG_9662.png?ex=68aaaee3&is=68a95d63&hm=b771d1d0eb18cefd85a55ea1b6c9289e303e696b2097c71443cc405ddae10f33",
    next: "explore_room"
  },
  explore_room: {
    text: "คุณจะสำรวจห้องนอนของคุณหรือไม่ ?",
    background : "https://cdn.discordapp.com/attachments/1408368721583538176/1408697075566121051/IMG_9662.png?ex=68aaaee3&is=68a95d63&hm=b771d1d0eb18cefd85a55ea1b6c9289e303e696b2097c71443cc405ddae10f33",
    choices: [
      { text: "สำรวจ", next: "explore_1" },
      { text: "ไม่สำรวจ", next: "scene_5" }
    ]
  },
  explore_1: {
    text: "คุณตัดสินใจที่จะสำรวจห้องนอนของคุณ ทุกอย่างดูปกติดี เว้นแต่สมุดปริศนาที่วางไว้อยู่บนโต๊ะข้างเตียงนอน \nคุณหยิบมันขึ้นมา หน้าปกดูเก่าและใกล้จะพังเต็มที ไม่น่าเชื่อว่ายังมีคนใช้งานมันอยู่ได้ \nคุณจะเปิดไดอารี่อ่านหรือไม่ ?",
    background : "https://cdn.discordapp.com/attachments/1408368721583538176/1408447232503582863/IMG_6527.png?ex=68aa6ef3&is=68a91d73&hm=bd84ee5949b1b5ee2c4a6a4def7123b3348cbefa1419812718ac18a2d97242f8",
    choices: [
      { text: "เปิด", next: "diary_1_open" },
      { text: "ไม่เปิด", next: "diary_1_save" }
    ]
  },
  diary_1_open: {
    text: "ด้วยความอยากรู้ที่คุณมี คุณเลือกจะเปิดไดอารี่นั้นอ่าน ในหน้ากระดาษที่ยับเยิน ข้อความเขียนด้วยดินสอสีเข้มราวกับกล่าวเตือนคุณ \nตัวหนังสือไม่เรียบร้อยเรียงเป็นข้อความว่า ‘รีบออกไปซะ !’ ลมหายใจคุณสะดุด คุณรีบเลื่อนสายตามองหาทางออกอย่างรวดเร็ว‘",
    background : "https://cdn.discordapp.com/attachments/1408368721583538176/1408457867354312784/IMG_6531.png?ex=68aa78db&is=68a9275b&hm=0b60647af191cf905c3fdb67c995967199c95038bffaf1ff8b157eb78eba43d7",
    next: "scene_5"
  },
  diary_1_save: {
    text: "คุณเก็บไดอารี่ไว้กับตัว ตัดสินใจที่จะไม่อ่านเนื้อหาด้านใน ในตอนที่คุณเงยหน้าขึ้นมา คุณเห็นประตูบานหนึ่งอยู่ตรงหน้า \nมันจะต้องเป็นประตูที่เปิดออกสู่ข้างนอกห้องอย่างแน่นอน คุณไม่ลังเลที่จะเปิดมัน \nto be continue …",
    background : "https://cdn.discordapp.com/attachments/1408368721583538176/1408697713297719377/IMG_9663.png?ex=68aaaf7b&is=68a95dfb&hm=96077ca11017da4d57fbc82168736271f9cb103bbd0a51a9830a7ce78dbb7556",
    next: "scene_5"
  },
  scene_5: {
    text: "คุณเห็นประตูบานหนึ่งอยู่ตรงหน้า มันจะต้องเป็นประตูที่เปิดออกสู่ข้างนอกห้องอย่างแน่นอน คุณไม่ลังเลที่จะเปิดมัน \nto be continue …",
    background : "https://cdn.discordapp.com/attachments/1408368721583538176/1408697713297719377/IMG_9663.png?ex=68aaaf7b&is=68a95dfb&hm=96077ca11017da4d57fbc82168736271f9cb103bbd0a51a9830a7ce78dbb7556",
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