const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
msg.text = document.querySelector('[name="text"]').value;

function populateVoices() {
  voices = this.getVoices();
  voicesDropdown.innerHTML = voices
    .filter(voice => voice.lang.includes('en'))
    .map(voice => {
      const femaleIndicator = voice.name.toLowerCase().includes('female') ? ' 👩' : '';
      return `<option value="${voice.name}">${voice.name} (${voice.lang})${femaleIndicator}</option>`;
    })
    .join('');
  
  // Set a female voice as default if available
  const femaleVoice = voices.find(voice => 
    voice.lang.includes('en') && 
    voice.name.toLowerCase().includes('female')
  );
  if (femaleVoice) {
    voicesDropdown.value = femaleVoice.name;
    msg.voice = femaleVoice;
  }
}

function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value);
  toggle();
}

function toggle(startOver = true) {
  speechSynthesis.cancel();
  if (startOver) {
    speechSynthesis.speak(msg);
  }
}

function setOption() {
  console.log(this.name, this.value);
  msg[this.name] = this.value;
  toggle();
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => toggle(false));