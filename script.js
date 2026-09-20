/* ==========================================================================
   FATMA ALZAHRAA SAEED — PORTFOLIO SCRIPT
   All content lives in the data arrays below. Edit an array to change
   what appears on the site — the DOM is generated from this data.
   ========================================================================== */

document.getElementById('year').textContent = new Date().getFullYear();

/* ============================================================
   1. THEME TOGGLE (persisted in localStorage)
============================================================ */
(function themeInit(){
  const root = document.documentElement;
  const saved = localStorage.getItem('portfolio-theme');
  if (saved) root.setAttribute('data-theme', saved);

  document.getElementById('themeToggle').addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    if (next === 'light') root.setAttribute('data-theme', 'light');
    else root.removeAttribute('data-theme');
    localStorage.setItem('portfolio-theme', next);
  });
})();

/* ============================================================
   2. MOBILE NAV
============================================================ */
(function navInit(){
  const burger = document.getElementById('navBurger');
  const links = document.getElementById('navLinks');
  burger.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  }));

  // Active section indicator
  const sections = [...document.querySelectorAll('section[id]')];
  const navLinks = [...document.querySelectorAll('.nav__link')];
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        navLinks.forEach(l => l.classList.toggle('is-active', l.dataset.section === entry.target.id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => observer.observe(s));
})();

/* ============================================================
   3. HERO TYPING EFFECT
============================================================ */
(function typedRole(){
  const el = document.getElementById('typedRole');
  const text = 'Cybersecurity Student | SOC & Blue Team Enthusiast';
  let i = 0;
  el.innerHTML = '<span class="caret"></span>';
  function type(){
    if (i <= text.length){
      el.innerHTML = text.slice(0, i) + '<span class="caret"></span>';
      i++;
      setTimeout(type, 32);
    }
  }
  setTimeout(type, 400);
})();

/* ============================================================
   4. SKILLS DATA — edit levels/items here
============================================================ */
const skillCategories = [
  {
    title: 'Networking',
    items: [
      { name: 'TCP/IP', level: 'intermediate' },
      { name: 'Networking Fundamentals', level: 'intermediate' },
      { name: 'Cisco Packet Tracer', level: 'intermediate' },
      { name: 'Network Security', level: 'beginner' },
      { name: 'Traffic Analysis', level: 'learning' }
    ]
  },
  {
    title: 'SOC / Blue Team',
    items: [
      { name: 'SOC Fundamentals', level: 'beginner' },
      { name: 'SIEM (Splunk)', level: 'learning' },
      { name: 'Log Analysis', level: 'learning' },
      { name: 'Security Monitoring', level: 'learning' },
      { name: 'Incident Detection', level: 'learning' },
      { name: 'Incident Response Fundamentals', level: 'learning' }
    ]
  },
  {
    title: 'Systems',
    items: [
      { name: 'Windows', level: 'intermediate' },
      { name: 'Linux', level: 'beginner' },
      { name: 'VMware', level: 'beginner' },
      { name: 'Virtual Machines', level: 'intermediate' }
    ]
  },
  {
    title: 'Security',
    items: [
      { name: 'Firewalls', level: 'beginner' },
      { name: 'Security Fundamentals', level: 'intermediate' },
      { name: 'Vulnerability Concepts', level: 'learning' },
      { name: 'Threat Detection', level: 'learning' },
      { name: 'Defensive Security', level: 'beginner' }
    ]
  },
  {
    title: 'Programming',
    items: [
      { name: 'Python', level: 'intermediate' },
      { name: 'Bash Basics', level: 'learning' },
      { name: 'Git', level: 'beginner' },
      { name: 'GitHub', level: 'beginner' }
    ]
  }
];

function renderSkills(){
  const grid = document.getElementById('skillsGrid');
  grid.innerHTML = skillCategories.map(cat => `
    <div class="skill-group">
      <p class="skill-group__title">${cat.title}</p>
      ${cat.items.map(it => `
        <div class="skill-item">
          <span class="lvl-dot lvl-dot--${it.level}"></span>
          <span class="skill-item__name">${it.name}</span>
        </div>
      `).join('')}
    </div>
  `).join('');
}
renderSkills();

/* ============================================================
   5. DASHBOARD + TERMINAL
============================================================ */
const dashboardTiles = [
  { label: 'SYSTEM STATUS', value: 'Online', dot: 'ok' },
  { label: 'NETWORK', value: 'Secure', dot: 'ok' },
  { label: 'MONITORING', value: 'Active', dot: 'ok' },
  { label: 'THREAT LEVEL', value: 'Low', dot: 'warn' },
  { label: 'LEARNING STATUS', value: 'Active', dot: 'ok' },
  { label: 'LAST LAB RUN', value: 'Splunk Monitoring', dot: 'ok' }
];

function renderDashboard(){
  const grid = document.getElementById('dashboardGrid');
  grid.innerHTML = dashboardTiles.map(t => `
    <div class="dash-tile">
      <p class="dash-tile__label">${t.label}</p>
      <p class="dash-tile__value"><span class="dot dot--${t.dot}"></span>${t.value}</p>
    </div>
  `).join('');
}
renderDashboard();

const terminalLines = [
  { type: 'prompt', text: '$ whoami' },
  { type: 'out', text: 'fatma_alzahraa' },
  { type: 'prompt', text: '$ role' },
  { type: 'out', text: 'Cybersecurity Student' },
  { type: 'prompt', text: '$ focus' },
  { type: 'out', text: 'SOC / Blue Team' },
  { type: 'prompt', text: '$ status' },
  { type: 'out', text: 'LEARNING & BUILDING' }
];

function typeTerminal(){
  const body = document.getElementById('terminalBody');
  body.innerHTML = '';
  let idx = 0;

  function nextLine(){
    if (idx >= terminalLines.length) return;
    const line = terminalLines[idx];
    const div = document.createElement('div');
    div.className = line.type === 'prompt' ? 'terminal__line-prompt' : 'terminal__line-out';
    body.appendChild(div);

    if (line.type === 'prompt'){
      let c = 0;
      const iv = setInterval(() => {
        div.textContent = line.text.slice(0, c+1);
        c++;
        if (c >= line.text.length){
          clearInterval(iv);
          idx++;
          setTimeout(nextLine, 250);
        }
      }, 38);
    } else {
      div.textContent = line.text;
      idx++;
      setTimeout(nextLine, 350);
    }
  }
  nextLine();
}

// Run terminal typing once it scrolls into view
const terminalEl = document.getElementById('terminalBody');
let terminalStarted = false;
new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !terminalStarted){
      terminalStarted = true;
      typeTerminal();
      obs.disconnect();
    }
  });
}, { threshold: 0.4 }).observe(terminalEl);

/* ============================================================
   6. PROJECTS DATA — add a new project by adding an object here
============================================================ */
const projects = [
  {
    id: 'splunk-log-monitoring-lab',
    title: 'Splunk Log Monitoring Lab',
    category: ['SOC', 'Blue Team', 'Security Labs'],
    summary: 'Built a virtualized security monitoring environment using Splunk Universal Forwarder to collect and analyze logs.',
    description: 'Built a virtualized security monitoring environment using Splunk Universal Forwarder to collect and analyze logs across a small lab network, working through the fundamentals of log ingestion, search, and basic investigation.',
    tech: ['Splunk', 'SIEM', 'Windows', 'Linux', 'VMware'],
    features: ['Log Collection', 'Monitoring', 'Log Analysis', 'Security Investigation'],
    // EDIT: add your real links below
    projectUrl: '',
    githubUrl: ''
  },
  {
    id: 'network-security-lab',
    title: 'Network Security Lab',
    category: ['Networking', 'Security Labs'],
    summary: 'A Packet Tracer lab covering core networking and network security concepts.',
    description: 'A Cisco Packet Tracer lab covering core networking concepts, traffic flow, and foundational network security configuration.',
    tech: ['Packet Tracer', 'Networking', 'TCP/IP', 'Network Security'],
    features: ['Network Configuration', 'Traffic Analysis', 'Security Concepts'],
    projectUrl: '',
    githubUrl: ''
  },
  {
    id: 'virtual-security-lab',
    title: 'Virtual Security Lab',
    category: ['Blue Team', 'Security Labs'],
    summary: 'A virtualized environment for hands-on security testing and analysis.',
    description: 'A virtualized environment built with Kali Linux and Windows VMs for hands-on security testing, defensive configuration, and network analysis practice.',
    tech: ['Kali Linux', 'Windows', 'VMware'],
    features: ['Virtual Machines', 'Security Testing', 'Network Analysis', 'Defensive Security'],
    projectUrl: '',
    githubUrl: ''
  }
];

function renderProjects(filter = 'all'){
  const grid = document.getElementById('projectsGrid');
  const list = filter === 'all' ? projects : projects.filter(p => p.category.includes(filter));
  grid.innerHTML = list.map((p, i) => `
    <article class="project-card" data-id="${p.id}">
      <p class="project-card__index">PRJ / ${String(i+1).padStart(2,'0')}</p>
      <h3 class="project-card__title">${p.title}</h3>
      <p class="project-card__desc">${p.summary}</p>
      <div class="tag-row">${p.tech.map(t => `<span class="tag">${t}</span>`).join('')}</div>
      <div class="project-card__actions">
        <button data-open-project="${p.id}">View Project</button>
        ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" rel="noopener">GitHub</a>` : `<span style="color:var(--text-faint); font-size:13px;">GitHub: add link</span>`}
      </div>
    </article>
  `).join('');

  grid.querySelectorAll('[data-open-project]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openProjectModal(btn.dataset.openProject);
    });
  });
  grid.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => openProjectModal(card.dataset.id));
  });
}
renderProjects();

document.getElementById('projectFilters').addEventListener('click', (e) => {
  const chip = e.target.closest('.filter-chip');
  if (!chip) return;
  document.querySelectorAll('#projectFilters .filter-chip').forEach(c => c.classList.remove('is-active'));
  chip.classList.add('is-active');
  renderProjects(chip.dataset.filter);
});

/* ---- Project modal ---- */
const projectModal = document.getElementById('projectModal');
function openProjectModal(id){
  const p = projects.find(x => x.id === id);
  if (!p) return;
  document.getElementById('modalContent').innerHTML = `
    <h3 class="modal-title" id="modalTitle">${p.title}</h3>
    <p class="modal-sub">${p.category.join(' · ')}</p>
    <div class="modal-body"><p>${p.description}</p></div>
    <p class="modal-section-label">Technologies</p>
    <div class="tag-row">${p.tech.map(t => `<span class="tag">${t}</span>`).join('')}</div>
    <p class="modal-section-label">Features</p>
    <ul class="modal-list">${p.features.map(f => `<li>${f}</li>`).join('')}</ul>
    <p class="modal-section-label">Links</p>
    <div class="project-card__actions">
      ${p.projectUrl ? `<a href="${p.projectUrl}" target="_blank" rel="noopener">View Project</a>` : `<span style="color:var(--text-faint); font-size:13px;">Project link: add in script.js</span>`}
      ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" rel="noopener">GitHub</a>` : `<span style="color:var(--text-faint); font-size:13px;">GitHub: add in script.js</span>`}
    </div>
  `;
  projectModal.classList.add('is-open');
  projectModal.setAttribute('aria-hidden', 'false');
}
document.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', () => {
  projectModal.classList.remove('is-open');
  projectModal.setAttribute('aria-hidden', 'true');
}));

/* ============================================================
   7. SECURITY LABS DATA
============================================================ */
const labs = [
  {
    icon: '🖥️',
    title: 'Windows Security Lab',
    desc: 'Hardening and monitoring a Windows environment inside a virtual lab.',
    tools: 'Windows, VMware',
    learned: 'Event logs, local security policy, basic hardening steps'
  },
  {
    icon: '🐧',
    title: 'Linux Security Lab',
    desc: 'Getting comfortable with Linux fundamentals from a security angle.',
    tools: 'Kali Linux, Bash',
    learned: 'File permissions, basic CLI security tools, log locations'
  },
  {
    icon: '🌐',
    title: 'Network Security Lab',
    desc: 'Configuring and securing a small simulated network.',
    tools: 'Packet Tracer, TCP/IP',
    learned: 'Network configuration, traffic flow, basic segmentation'
  },
  {
    icon: '📊',
    title: 'Splunk Monitoring Lab',
    desc: 'Collecting and searching logs from lab machines with Splunk.',
    tools: 'Splunk, Universal Forwarder',
    learned: 'Log ingestion, search queries, building simple views'
  },
  {
    icon: '🔥',
    title: 'Firewall Lab',
    desc: 'Working through basic firewall rules and traffic filtering.',
    tools: 'Packet Tracer, Windows Firewall',
    learned: 'Rule design basics, inbound/outbound filtering concepts'
  },
  {
    icon: '🔍',
    title: 'Log Analysis Lab',
    desc: 'Reading and interpreting security-relevant log entries.',
    tools: 'Splunk, Windows Event Viewer',
    learned: 'Spotting anomalies, correlating events across sources'
  }
];

function renderLabs(){
  document.getElementById('labsGrid').innerHTML = labs.map(l => `
    <div class="lab-card">
      <span class="lab-card__icon">${l.icon}</span>
      <p class="lab-card__title">${l.title}</p>
      <p class="lab-card__desc">${l.desc}</p>
      <p class="lab-card__meta"><b>Tools:</b> ${l.tools}</p>
      <p class="lab-card__meta"><b>Learned:</b> ${l.learned}</p>
    </div>
  `).join('');
}
renderLabs();

/* ============================================================
   8. LEARNING JOURNEY TIMELINE
============================================================ */
const journey = [
  { year: '2024', text: 'Started exploring computing and the fundamentals of how systems work.' },
  { year: '2025', text: 'Began focused study of cybersecurity fundamentals.' },
  { year: '2026', text: 'Networking, hands-on security labs, and SOC fundamentals training.' },
  { year: '2027', text: 'Graduation — moving toward a professional cybersecurity career.' }
];

function renderJourney(){
  document.getElementById('journeyTimeline').innerHTML = journey.map(j => `
    <div class="timeline-item reveal">
      <p class="timeline-item__year">${j.year}</p>
      <p class="timeline-item__text">${j.text}</p>
    </div>
  `).join('');
}
renderJourney();

/* ============================================================
   9. CERTIFICATIONS DATA
   Add a new certificate by adding one object to this array.
   Leave image/credentialUrl empty ('') if you don't have one yet —
   the card will show a clear placeholder instead of guessing.
============================================================ */
const certifications = [
  {
    title: 'CyberOps Associate',
    organization: 'National Telecommunication Institute (Cisco Networking Academy)',
    date: '2026-07-31',
    dateLabel: '31 Jul 2026',
    category: 'SOC / Blue Team',
    image: 'assets/certificates/certificate2.png',
    credentialId: '72fd67a4-2b10-4a71-b7d3-8eea278ebc6f',
    credentialUrl: '',
    description: 'Completed the CyberOps Associate program offered by the National Telecommunication Institute through the Cisco Networking Academy, covering SOC operations and security monitoring fundamentals.',
    skills: ['SOC', 'Security Monitoring', 'Cisco Networking Academy'],
    featured: false
  },
  {
    title: 'Introduction to Cybersecurity',
    organization: 'E-Learning Competence Center — ELCC Academy (Cisco Networking Academy)',
    date: '2026-08-01',
    dateLabel: '01 Aug 2026',
    category: 'Cybersecurity',
    image: 'assets/certificates/certificate1.png',
    credentialId: 'dd2d6134-aba9-4b64-b543-3d2a7594ae76',
    credentialUrl: '',
    description: 'Completed the Introduction to Cybersecurity course offered by E-Learning Competence Center (ELCC Academy) through the Cisco Networking Academy program.',
    skills: ['Cybersecurity Fundamentals', 'Cisco Networking Academy'],
    featured: false
  },
  {
    title: 'Network Security — Summer Training',
    organization: 'ITIDA & National Telecommunication Institute (NTI)',
    date: '2026-07-30',
    dateLabel: '05 Jul – 30 Jul 2026',
    category: 'Networking',
    image: 'assets/certificates/certificate3.png',
    credentialId: 'Student ID: 316447',
    credentialUrl: '',
    description: '120-hour summer training program in Network Security (90 technical hours, 30 soft-skills hours), completed with a score of 93.5%.',
    skills: ['Network Security', '120 Training Hours', 'Score: 93.5%'],
    featured: true
  }
  // EDIT: to add a new certificate, copy the block above and fill in your details.
  // If you don't have the image yet, set image: '' and it will show a labeled placeholder.
];

function renderCertStats(){
  const total = certifications.length;
  const cyber = certifications.filter(c => c.category === 'Cybersecurity' || c.category === 'SOC / Blue Team' || c.category === 'Networking').length;
  const training = certifications.filter(c => c.category === 'Training').length + (certifications.some(c=>c.title.toLowerCase().includes('training')) ? 1 : 0);
  const verified = certifications.filter(c => c.credentialUrl).length;

  const stats = [
    { num: total, label: 'Total Certifications' },
    { num: cyber, label: 'Cybersecurity Certifications' },
    { num: certifications.filter(c => c.title.toLowerCase().includes('training')).length, label: 'Training Programs' },
    { num: verified, label: 'Verified Credentials' }
  ];
  document.getElementById('certStats').innerHTML = stats.map(s => `
    <div class="cert-stat">
      <p class="cert-stat__num">${s.num}</p>
      <p class="cert-stat__label">${s.label}</p>
    </div>
  `).join('');
}
renderCertStats();

function renderFeaturedCert(){
  const f = certifications.find(c => c.featured);
  const el = document.getElementById('featuredCert');
  if (!f){ el.style.display = 'none'; return; }
  el.innerHTML = `
    <img class="featured-cert__thumb" src="${f.image}" alt="${f.title} certificate thumbnail">
    <div>
      <p class="featured-cert__tag">🏆 Featured Certification</p>
      <p class="featured-cert__title">${f.title}</p>
      <p class="featured-cert__meta">Issued by ${f.organization} — ${f.dateLabel}</p>
    </div>
    <div class="featured-cert__actions">
      <button class="btn btn--ghost" data-open-cert="${f.title}">View Certificate</button>
      ${f.credentialUrl ? `<a class="btn btn--primary" href="${f.credentialUrl}" target="_blank" rel="noopener">Verify</a>` : ''}
    </div>
  `;
}
renderFeaturedCert();

function renderCertGrid(filter = 'all'){
  const grid = document.getElementById('certGrid');
  const list = filter === 'all' ? certifications : certifications.filter(c => c.category === filter);
  grid.innerHTML = list.map(c => `
    <div class="cert-card">
      <div class="cert-card__thumb-wrap" data-open-cert="${c.title}">
        ${c.image ? `<img src="${c.image}" alt="${c.title} certificate" loading="lazy">` : `<div class="cert-card__placeholder">[Certificate image not yet added]</div>`}
        <span class="cert-card__badge">${c.credentialUrl ? 'Verified' : 'On file'}</span>
      </div>
      <div class="cert-card__body">
        <p class="cert-card__org">${c.organization}</p>
        <p class="cert-card__title">${c.title}</p>
        <p class="cert-card__desc">${c.description}</p>
        <div class="cert-card__skills">${c.skills.map(s => `<span class="tag">${s}</span>`).join('')}</div>
        <div class="cert-card__footer">
          <span class="cert-card__date">${c.dateLabel}</span>
          <div class="cert-card__actions">
            <button data-open-cert="${c.title}">View Certificate</button>
            ${c.credentialUrl ? `<a href="${c.credentialUrl}" target="_blank" rel="noopener">Verify</a>` : ''}
          </div>
        </div>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('[data-open-cert]').forEach(el => {
    el.addEventListener('click', () => openLightbox(el.dataset.openCert));
  });
}
renderCertGrid();

document.getElementById('certFilters').addEventListener('click', (e) => {
  const chip = e.target.closest('.filter-chip');
  if (!chip) return;
  document.querySelectorAll('#certFilters .filter-chip').forEach(c => c.classList.remove('is-active'));
  chip.classList.add('is-active');
  renderCertGrid(chip.dataset.filter);
});

document.getElementById('featuredCert').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-open-cert]');
  if (btn) openLightbox(btn.dataset.openCert);
});

function renderCertTimeline(){
  const sorted = [...certifications].sort((a,b) => new Date(a.date) - new Date(b.date));
  document.getElementById('certTimeline').innerHTML = sorted.map(c => `
    <div class="cert-timeline-item">
      <p class="cert-timeline-item__year">${c.dateLabel}</p>
      <p class="cert-timeline-item__title">${c.title}</p>
      <p class="cert-timeline-item__org">${c.organization}</p>
    </div>
  `).join('');
}
renderCertTimeline();

/* ---- Lightbox ---- */
const lightbox = document.getElementById('certLightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
let lightboxIndex = 0;

function openLightbox(title){
  lightboxIndex = certifications.findIndex(c => c.title === title);
  if (lightboxIndex === -1) lightboxIndex = 0;
  updateLightbox();
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
}
function updateLightbox(){
  const c = certifications[lightboxIndex];
  if (c.image){
    lightboxImg.src = c.image;
    lightboxImg.alt = c.title + ' certificate';
    lightboxImg.style.display = '';
  } else {
    lightboxImg.style.display = 'none';
  }
  lightboxCaption.textContent = `${c.title} — ${c.organization} — ${c.dateLabel}`;
}
document.getElementById('lightboxPrev').addEventListener('click', () => {
  lightboxIndex = (lightboxIndex - 1 + certifications.length) % certifications.length;
  updateLightbox();
});
document.getElementById('lightboxNext').addEventListener('click', () => {
  lightboxIndex = (lightboxIndex + 1) % certifications.length;
  updateLightbox();
});
document.querySelectorAll('[data-close-lightbox]').forEach(el => el.addEventListener('click', () => {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
}));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape'){
    lightbox.classList.remove('is-open');
    projectModal.classList.remove('is-open');
  }
});

/* ============================================================
   10. ACHIEVEMENTS DATA
============================================================ */
const achievements = [
  {
    icon: '📜',
    title: 'CyberOps Associate — Program Completion',
    org: 'National Telecommunication Institute',
    date: '31 Jul 2026',
    desc: 'Completed the CyberOps Associate program via the Cisco Networking Academy.'
  },
  {
    icon: '🎯',
    title: 'Network Security Training — 93.5% Score',
    org: 'ITIDA / NTI',
    date: '30 Jul 2026',
    desc: '120-hour summer training program, completed with a score of 93.5%.'
  }
  // EDIT: add more achievements here — competitions, hackathons, internships, etc.
];

function renderAchievements(){
  document.getElementById('achvGrid').innerHTML = achievements.map(a => `
    <div class="achv-card">
      <span class="achv-card__icon">${a.icon}</span>
      <div>
        <p class="achv-card__title">${a.title}</p>
        <p class="achv-card__org">${a.org}</p>
        <p class="achv-card__date">${a.date}</p>
        <p class="achv-card__desc">${a.desc}</p>
      </div>
    </div>
  `).join('');
}
renderAchievements();

/* ============================================================
   11. STATS COUNTER ANIMATION
============================================================ */
(function statsCounter(){
  const nums = document.querySelectorAll('.stat-card__num');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 40));
      const iv = setInterval(() => {
        current += step;
        if (current >= target){ current = target; clearInterval(iv); }
        el.textContent = current;
      }, 30);
      io.unobserve(el);
    });
  }, { threshold: 0.6 });
  nums.forEach(n => io.observe(n));
})();

/* ============================================================
   12. SCROLL REVEAL
============================================================ */
(function scrollReveal(){
  document.querySelectorAll('.fact-card, .project-card, .lab-card, .cert-card, .service-card, .timeline-item, .achv-card').forEach(el => {
    el.classList.add('reveal');
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();

/* ============================================================
   13. CONTACT FORM (mailto fallback)
   To use Formspree instead:
   1. Create a form at https://formspree.io and copy your endpoint URL
      (looks like https://formspree.io/f/xxxxxxx)
   2. Replace the code below with:
        fetch('https://formspree.io/f/xxxxxxx', {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(form)
        }).then(() => { form.reset(); alert('Message sent!'); });
   3. Remove the mailto logic below.
============================================================ */
document.getElementById('contactForm').addEventListener('submit', function(e){
  e.preventDefault();
  const name = this.name.value;
  const email = this.email.value;
  const subject = this.subject.value;
  const message = this.message.value;

  // EDIT: replace with your real email address
  const to = 'fatmaalzahrasaeed@gmail.com';
  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
