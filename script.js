// ============================================================
// RETRO GAME BOY PORTFOLIO - script.js
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Section Navigation ----
  const navBtns = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.section');

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.section;

      // Update active button
      navBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Show target section
      sections.forEach(s => s.classList.remove('active'));
      const targetSection = document.getElementById(`section-${target}`);
      if (targetSection) {
        targetSection.classList.add('active');
      }

      // Animate skill bars when skills section opens
      if (target === 'skills') {
        animateSkillBars();
      }

      // Update sprite speech bubble
      updateSpeech(target);
    });
  });

  // ---- Skill Bar Animation ----
  function animateSkillBars() {
    const fills = document.querySelectorAll('.skill-fill');
    fills.forEach(fill => {
      const targetWidth = fill.style.width;
      fill.style.width = '0%';
      setTimeout(() => {
        fill.style.width = targetWidth;
      }, 100);
    });
  }

  // ---- Speech Bubble Updates ----
  const speeches = {
    bio:        'Loading bio...\nHello, I\'m Gagan!',
    skills:     'Skill tree\nunlocked!',
    experience: 'Quest log\nopened!',
    contact:    'Send me a\nmessage!',
    athlete:    'New record\nset!',
  };

  function updateSpeech(section) {
    const bubble = document.querySelector('.speech-bubble');
    if (bubble && speeches[section]) {
      bubble.style.opacity = '0';
      setTimeout(() => {
        bubble.innerHTML = speeches[section].replace(/\n/g, '<br/>');
        bubble.style.opacity = '1';
      }, 150);
    }
  }

  // ---- Info Modal ----
  const infoBtn = document.getElementById('infoBtn');
  const infoModal = document.getElementById('infoModal');

  if (infoBtn) {
    infoBtn.addEventListener('click', () => {
      infoModal.classList.add('open');
    });
  }

  // Close modal on backdrop click
  if (infoModal) {
    infoModal.addEventListener('click', (e) => {
      if (e.target === infoModal) closeModal('infoModal');
    });
  }

  // Plus button - open contact
  const plusBtn = document.getElementById('plusBtn');
  if (plusBtn) {
    plusBtn.addEventListener('click', () => {
      navBtns.forEach(b => b.classList.remove('active'));
      document.querySelector('[data-section="contact"]').classList.add('active');
      sections.forEach(s => s.classList.remove('active'));
      document.getElementById('section-contact').classList.add('active');
      updateSpeech('contact');
    });
  }

  // ---- Keyboard navigation ----
  const sectionOrder = ['bio', 'skills', 'experience', 'contact', 'athlete'];

  document.addEventListener('keydown', (e) => {
    const activeBtn = document.querySelector('.nav-btn.active');
    if (!activeBtn) return;

    const currentSection = activeBtn.dataset.section;
    const currentIdx = sectionOrder.indexOf(currentSection);

    let newIdx = currentIdx;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') newIdx = (currentIdx + 1) % sectionOrder.length;
    if (e.key === 'ArrowUp'   || e.key === 'ArrowLeft')  newIdx = (currentIdx - 1 + sectionOrder.length) % sectionOrder.length;

    if (newIdx !== currentIdx) {
      e.preventDefault();
      const targetBtn = document.querySelector(`[data-section="${sectionOrder[newIdx]}"]`);
      if (targetBtn) targetBtn.click();
    }
  });

  // ---- Sprite bobbing click easter egg ----
  const sprite = document.getElementById('sprite');
  if (sprite) {
    sprite.addEventListener('click', () => {
      sprite.style.transform = 'scale(1.4) rotate(10deg)';
      setTimeout(() => sprite.style.transform = '', 300);
    });
  }

  // ---- Initialize skill bars on load if skills are visible ----
  const skillSection = document.getElementById('section-skills');
  if (skillSection && skillSection.classList.contains('active')) {
    animateSkillBars();
  }

  // ---- Typing cursor effect on section titles ----
  function addCursorBlink(el) {
    el.innerHTML = el.textContent + '<span class="blink"> _</span>';
  }

  document.querySelectorAll('.section-title').forEach(addCursorBlink);

  // ---- Console easter egg ----
  console.log('%c GAGAN ADHIKARI PORTFOLIO ', 'background:#081820;color:#8bac0f;font-family:monospace;font-size:14px;padding:8px;');
  console.log('%c Software Engineer | Intuji Pvt Ltd ', 'background:#306230;color:#c8e6c8;font-family:monospace;font-size:10px;padding:4px;');
  console.log('%c [Press Arrow Keys to navigate sections!] ', 'color:#8bac0f;font-family:monospace;');
});

// ---- Global modal close function ----
function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('open');
}

