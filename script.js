// ================= THEME TOGGLE =================
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

function setTheme(theme){
  root.setAttribute('data-theme', theme);
  themeToggle.textContent = theme === 'dark'
    ? '$ git checkout light'
    : '$ git checkout dark';
}

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
});

// ================= DIFF TOGGLES =================
document.querySelectorAll('.diff-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const view = btn.nextElementSibling;
    const isOpen = view.classList.toggle('open');
    btn.textContent = isOpen
      ? btn.textContent.replace('view diff', 'hide diff')
      : btn.textContent.replace('hide diff', 'view diff');
  });
});

// ================= SUBSCRIBE FORM =================
const subForm = document.getElementById('subForm');
subForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = subForm.querySelector('button');
  const original = btn.textContent;
  btn.textContent = 'committed ✓';
  subForm.reset();
  setTimeout(() => { btn.textContent = original; }, 2200);
  // Hook this up to a real newsletter service (Buttondown, Mailchimp, etc.)
  // once you're ready to send for realsies.
});

// ================= FALLING LEAVES =================
const leavesContainer = document.getElementById('leaves');
const leafColors = [
  'var(--accent-moss)',
  'var(--accent-rust)',
  'var(--accent-ochre)',
  'var(--accent-rose)'
];

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function spawnLeaf(){
  const leaf = document.createElement('div');
  leaf.className = 'leaf';

  const size = 8 + Math.random() * 10;          // 8–18px
  const startX = Math.random() * 100;           // vw
  const fallDuration = 9 + Math.random() * 8;    // 9–17s
  const swayDuration = 2.5 + Math.random() * 2;  // 2.5–4.5s
  const color = leafColors[Math.floor(Math.random() * leafColors.length)];
  const rotateStart = Math.random() * 360;

  leaf.style.left = `${startX}vw`;
  leaf.style.width = `${size}px`;
  leaf.style.height = `${size * 0.8}px`;
  leaf.style.background = color;
  leaf.style.transform = `rotate(${rotateStart}deg)`;
  leaf.style.animationDuration = `${fallDuration}s, ${swayDuration}s`;

  leavesContainer.appendChild(leaf);

  setTimeout(() => leaf.remove(), fallDuration * 1000 + 200);
}

if (!prefersReducedMotion){
  const isSmallScreen = window.innerWidth < 640;
  const spawnInterval = isSmallScreen ? 2200 : 1400;
  const initialLeaves = isSmallScreen ? 3 : 5;

  // gentle initial scatter so the page doesn't start empty
  for (let i = 0; i < initialLeaves; i++){
    setTimeout(spawnLeaf, i * 900);
  }
  setInterval(spawnLeaf, spawnInterval);
}
