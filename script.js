const loader = document.querySelector('.loader');
window.addEventListener('load', () => setTimeout(() => loader.classList.add('done'), 250));

const projectList = document.querySelector('#project-list');

if (projectList && Array.isArray(window.PROJECTS)) {
  projectList.innerHTML = window.PROJECTS.map((project) => `
    <article class="project reveal">
      <div class="project-visual">
        <img src="${project.image}" alt="${project.imageAlt}" loading="lazy" />
      </div>
      <div class="project-meta">
        <h3>${project.title}</h3>
        <p>${project.role}</p>
        <a
          class="project-link"
          href="${project.siteUrl}"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="${project.title}の実際のサイトを見る（新しいタブで開きます）"
        >
          <span>実際のサイトはこちら</span>
          <span class="project-link-arrow" aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  `).join('');
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', open);
  menuButton.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const clock = document.querySelector('#clock');
const updateClock = () => {
  clock.textContent = `${new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
  }).format(new Date())}　日本標準時`;
};
updateClock();
setInterval(updateClock, 1000);
document.querySelector('#year').textContent = new Date().getFullYear();
