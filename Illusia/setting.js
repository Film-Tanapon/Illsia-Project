// ฟังก์ชันสำหรับการเปลี่ยนแท็บ
function openTab(tabName) {
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
    }
    
    const tabButtons = document.getElementsByClassName('tab-button');
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove('active');
    }
    
    document.getElementById(tabName).classList.add('active');
    event.currentTarget.classList.add('active');
}

// อัปเดตค่าสไลเดอร์
const sliders = document.querySelectorAll('.slider');
sliders.forEach(slider => {
    const valueDisplay = document.getElementById(slider.id + 'Value');
    slider.addEventListener('input', () => {
        if (slider.id === 'fontSize') {
            valueDisplay.textContent = slider.value + 'px';
        } else if (slider.id === 'textSpeed') {
            valueDisplay.textContent = slider.value;
        } else {
            valueDisplay.textContent = slider.value + '%';
        }
    });
});

// ฟังก์ชันบันทึกการตั้งค่า
function saveSettings() {
    alert('บันทึกการตั้งค่าเรียบร้อยแล้ว!');
    // ในเกมจริงควรมีโค้ดสำหรับบันทึกการตั้งค่าทั้งหมดที่นี่
}

// ฟังก์ชันปิดการตั้งค่า
function closeSettings() {
    if (confirm('ยกเลิกการเปลี่ยนแปลงทั้งหมด?')) {
        window.location.href = "index.html";
    }
}

// ฟังก์ชันรีเซ็ตการตั้งค่า
function resetSettings() {
    if (confirm('คืนค่าการตั้งค่าทั้งหมดเป็นค่าเริ่มต้น?')) {
        document.getElementById('musicVolume').value = 80;
        document.getElementById('musicVolumeValue').textContent = '80%';
        
        document.getElementById('sfxVolume').value = 90;
        document.getElementById('sfxVolumeValue').textContent = '90%';
        
        document.getElementById('voiceVolume').value = 100;
        document.getElementById('voiceVolumeValue').textContent = '100%';
        
        document.getElementById('brightness').value = 75;
        document.getElementById('brightnessValue').textContent = '75%';
        
        document.getElementById('textSpeed').value = 5;
        document.getElementById('textSpeedValue').textContent = '5';
        
        document.getElementById('fontSize').value = 16;
        document.getElementById('fontSizeValue').textContent = '16px';
        
        document.getElementById('resolution').value = '1920x1080';
        document.getElementById('graphicsQuality').value = 'high';
        document.getElementById('fontStyle').value = 'standard';
        
        alert('คืนค่าการตั้งค่าเป็นค่าเริ่มต้นเรียบร้อยแล้ว');
    }
}
