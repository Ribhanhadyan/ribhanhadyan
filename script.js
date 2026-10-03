document.addEventListener("DOMContentLoaded", function () {

    if (typeof CONFIG === 'undefined') {
        console.error("config.js tidak dimuat!");
        return;
    }

    /* ═══════════════════════════════════════════════════════
       🌐 i18n HELPER
       ═══════════════════════════════════════════════════════ */
    let LANG = (function () {
        try { return localStorage.getItem('lang') || CONFIG.i18n.default; }
        catch (e) { return CONFIG.i18n.default; }
    })();

    function t(value) {
        if (value == null) return '';
        if (typeof value === 'string') return value;
        if (typeof value === 'object') return value[LANG] ?? value[CONFIG.i18n.default] ?? '';
        return String(value);
    }

    function tLabel(key) {
        const l = CONFIG.i18n.labels[key];
        return l ? t(l) : key;
    }

    /* ═══════════════════════════════════════════════════════
       📊 ANALYTICS INIT
       ═══════════════════════════════════════════════════════ */
    (function initAnalytics() {
        const a = CONFIG.analytics;
        if (!a) return;

        if (a.plausible && a.plausible.enable) {
            const s = document.createElement('script');
            s.defer = true;
            s.dataset.domain = a.plausible.domain;
            s.src = a.plausible.src || 'https://plausible.io/js/script.js';
            document.head.appendChild(s);
        }
        if (a.umami && a.umami.enable) {
            const s = document.createElement('script');
            s.defer = true;
            s.dataset.websiteId = a.umami.websiteId;
            s.src = a.umami.src || 'https://cloud.umami.is/script.js';
            document.head.appendChild(s);
        }
    })();

    function trackEvent(name, props) {
        try {
            if (window.plausible) window.plausible(name, { props });
            if (window.umami && window.umami.track) window.umami.track(name, props);
        } catch (e) {}
    }

    /* ═══════════════════════════════════════════════════════
       RENDER: NAVBAR + BRAND + NAV + LANG + THEME
       ═══════════════════════════════════════════════════════ */
    function renderNav() {
        document.getElementById('brandLogo').src = CONFIG.profile.logo;
        document.getElementById('brandName').textContent = CONFIG.profile.brandName;

        document.getElementById('navMenu').innerHTML = CONFIG.nav.map((item, i) => `
            <li class="nav-item">
                <a class="nav-link${i === 0 ? ' active' : ''}" href="#${item.id}">${t(item.label)}</a>
            </li>
        `).join('');

        document.getElementById('langSwitcher').innerHTML = CONFIG.i18n.languages.map(l => `
            <button class="lang-btn${l.code === LANG ? ' active' : ''}" data-lang="${l.code}">${l.label}</button>
        `).join('');
    }

    /* ═══════════════════════════════════════════════════════
       RENDER: HERO
       ═══════════════════════════════════════════════════════ */
    function renderHero() {
        document.getElementById('heroEyebrow').textContent = t(CONFIG.profile.eyebrow);
        document.getElementById('heroName').innerHTML =
            `${t(CONFIG.profile.firstName)}<br /><span class="hero-name-line">${t(CONFIG.profile.lastName)}</span>`;
        document.getElementById('heroDesc').innerHTML = t(CONFIG.profile.description);
        document.getElementById('heroPhoto').src = CONFIG.profile.photo;
        document.getElementById('heroPhoto').alt = CONFIG.profile.brandName;

        document.getElementById('heroActions').innerHTML = `
            <a href="${CONFIG.profile.ctaPrimary.href}" class="btn-primary-outline">${t(CONFIG.profile.ctaPrimary.label)}</a>
            <a href="${CONFIG.profile.ctaSecondary.href}" class="btn-text-link">${t(CONFIG.profile.ctaSecondary.label)}</a>
        `;

        const el = document.getElementById('typing-text');
        if (el) {
            el.innerHTML = '';
            const roles = (CONFIG.profile.roles && CONFIG.profile.roles[LANG]) || CONFIG.profile.roles.en || [];
            if (window.__typedInstance) window.__typedInstance.destroy();
            window.__typedInstance = new Typed('#typing-text', {
                strings: roles,
                typeSpeed: 55,
                backSpeed: 30,
                backDelay: 2200,
                loop: true,
                cursorChar: '|',
            });
        }
    }

    /* ═══════════════════════════════════════════════════════
       RENDER: ABOUT
       ═══════════════════════════════════════════════════════ */
    function renderAbout() {
        document.getElementById('aboutLabel').textContent = t(CONFIG.about.sectionLabel);
        document.getElementById('aboutTitle').innerHTML =
            `${t(CONFIG.about.titleLine1)}<br /><em>${t(CONFIG.about.titleLine2)}</em>`;

        const paras = CONFIG.about.paragraphs[LANG] || CONFIG.about.paragraphs.en || CONFIG.about.paragraphs;
        document.getElementById('aboutParagraphs').innerHTML =
            (Array.isArray(paras) ? paras : [paras]).map(p => `<p>${p}</p>`).join('');

        document.getElementById('aboutStats').innerHTML = CONFIG.about.stats.map(s => `
            <div class="stat-item">
                <span class="stat-number">${s.number}</span>
                <span class="stat-label">${t(s.label)}</span>
            </div>
        `).join('');

        document.getElementById('skillsLabel').textContent = t(CONFIG.skills.showcaseLabel);
        document.getElementById('skillsTitle').innerHTML =
            `${t(CONFIG.skills.showcaseTitle)} <em>${t(CONFIG.skills.showcaseTitleAccent)}</em>`;
        document.getElementById('skillsHint').textContent = t(CONFIG.skills.hint);
    }

    /* ═══════════════════════════════════════════════════════
       RENDER: CAREER TIMELINE (GANTT)
       ═══════════════════════════════════════════════════════ */
    function parsePeriodToDate(str) {
        // "Nov 2024" → Date(2024, 10, 1)
        if (!str) return null;
        const months = { jan:0, feb:1, mar:2, apr:3, may:4, jun:5, jul:6, aug:7, sep:8, oct:9, nov:10, dec:11 };
        const m = String(str).trim().toLowerCase().match(/^([a-z]{3})\s+(\d{4})$/);
        if (!m) return null;
        const mo = months[m[1]];
        if (mo === undefined) return null;
        return new Date(parseInt(m[2], 10), mo, 1);
    }

    function resolveDates(item) {
        let start = item.startDate ? new Date(item.startDate + "-01") : null;
        let end   = item.endDate ? new Date(item.endDate + "-01") : null;
        if (!start && item.period) {
            const parts = String(item.period).split(/\s*[—–-]\s*/);
            start = parsePeriodToDate(parts[0]);
            if (parts[1] && !/present|sekarang/i.test(parts[1])) {
                end = parsePeriodToDate(parts[1]);
            }
        }
        if (!end) end = new Date();
        return { start, end };
    }

    function renderCareerTimeline() {
        const labelEl = document.getElementById('careerLabel');
        const titleEl = document.getElementById('careerTitle');
        const legendEl = document.getElementById('ganttLegend');
        const chartEl = document.getElementById('ganttChart');
        if (!labelEl || !chartEl) return;

        labelEl.textContent = t(CONFIG.career.sectionLabel);
        titleEl.innerHTML = `${t(CONFIG.career.titleLine1)}<br /><em>${t(CONFIG.career.titleLine2)}</em>`;

        // Legend
        const legend = CONFIG.career.legend || {};
        legendEl.innerHTML = Object.keys(legend).map(k => `
            <span class="legend-item">
                <span class="legend-dot" style="background:${legend[k].color}"></span>
                ${t(legend[k])}
            </span>
        `).join('');

        // Siapkan data
        const items = CONFIG.experience.items.map(it => {
            const { start, end } = resolveDates(it);
            return { ...it, _start: start, _end: end, _category: it.category || 'work' };
        }).filter(it => it._start);

        if (!items.length) {
            chartEl.innerHTML = `<p class="evidence-prompt">No timeline data available.</p>`;
            return;
        }

        const minTime = Math.min(...items.map(i => i._start.getTime()));
        const maxTime = Math.max(...items.map(i => i._end.getTime()), Date.now());
        const span = maxTime - minTime || 1;

        // Layout: overlap → lane berbeda
        items.sort((a, b) => a._start - b._start);
        const lanes = [];
        items.forEach(it => {
            let placed = false;
            for (const lane of lanes) {
                const last = lane[lane.length - 1];
                if (it._start >= last._end) { lane.push(it); placed = true; break; }
            }
            if (!placed) lanes.push([it]);
        });

        const flatItems = [];
        lanes.forEach((lane, laneIdx) => {
            lane.forEach(it => flatItems.push({ ...it, _lane: laneIdx }));
        });

        // Render tahun
        const startYear = new Date(minTime).getFullYear();
        const endYear   = new Date(maxTime).getFullYear();
        let axisHtml = '';
        for (let y = startYear; y <= endYear + 1; y++) {
            const date = new Date(y, 0, 1).getTime();
            if (date > maxTime + 1000) break;
            const pct = ((date - minTime) / span) * 100;
            if (pct < 0) continue;
            axisHtml += `<span class="gantt-axis-label" style="left:${pct}%">${y}</span>`;
        }

        // Gridlines
        let gridHtml = '';
        for (let y = startYear; y <= endYear + 1; y++) {
            const date = new Date(y, 0, 1).getTime();
            if (date > maxTime + 1000) break;
            const pct = ((date - minTime) / span) * 100;
            if (pct < 0) continue;
            gridHtml += `<span class="gantt-gridline" style="left:${pct}%"></span>`;
        }

        // Today line
        const todayPct = ((Date.now() - minTime) / span) * 100;
        const todayLine = (todayPct >= 0 && todayPct <= 100)
            ? `<div class="gantt-today" style="left:${todayPct}%">
                 <span class="gantt-today-label">${tLabel('present')}</span>
               </div>`
            : '';

        // Bars
        const legendMap = CONFIG.career.legend || {};
        const barsHtml = flatItems.map(it => {
            const left = ((it._start.getTime() - minTime) / span) * 100;
            const right = ((it._end.getTime() - minTime) / span) * 100;
            const width = Math.max(right - left, 1);
            const color = (legendMap[it._category] && legendMap[it._category].color) || '#c8a96e';
            const roleLabel = t(it.role);
            const company = typeof it.company === 'string' ? it.company : t(it.company);
            const period = it.period || '';
            const tooltip = `${roleLabel} · ${company} · ${period}`;
            const isNarrow = width < 12;

            return `
                <div class="gantt-row">
                    <div class="gantt-bar${isNarrow ? ' is-narrow' : ''}"
                         style="left:${left}%;width:${width}%;background:${color}"
                         title="${tooltip}">
                        <span class="gantt-bar-label">${roleLabel}</span>
                        ${!isNarrow ? `<span class="gantt-bar-range">${period}</span>` : ''}
                    </div>
                </div>
            `;
        }).join('');

        chartEl.innerHTML = `
            <div class="gantt-axis">${axisHtml}</div>
            ${gridHtml}
            ${todayLine}
            ${barsHtml}
        `;

        // Padding bottom agar tidak overlap dengan today label
        chartEl.style.minHeight = (lanes.length * 52 + 60) + 'px';
    }

    /* ═══════════════════════════════════════════════════════
       RENDER: TIMELINE (Experience / Publications / Education)
       ═══════════════════════════════════════════════════════ */
    function renderTimeline(containerId, section, items) {
        const el = document.getElementById(containerId);
        if (!el) return;

        el.innerHTML = items.map(item => {
            const roleText = item.roleNote
                ? `${t(item.role)} — <em class="role-note">${t(item.roleNote)}</em>`
                : t(item.role);
            const roleHtml = item.url
                ? `<a href="${item.url}" target="_blank" rel="noopener" class="role-link">${roleText}<i class="fas fa-external-link-alt link-icon"></i></a>`
                : roleText;

            let companyInner = item.company ? t(item.company) : '';
            if (item.companyUrl) {
                companyInner = `<a href="${item.companyUrl}" target="_blank" rel="noopener" class="company-link">${companyInner}<i class="fas fa-external-link-alt link-icon"></i></a>`;
            }
            const companyHtml = item.company
                ? `<p class="exp-company">${companyInner}${item.companyNote ? ` <span class="company-note">· ${t(item.companyNote)}</span>` : ''}</p>`
                : '';

            const bullets = item.bullets ? (item.bullets[LANG] || item.bullets.en || item.bullets) : null;
            const bulletsArr = Array.isArray(bullets) ? bullets : (bullets ? [bullets] : []);

            const location = item.location ? t(item.location) : '';
            const period = item.period ? t(item.period) : '';

            return `
                <div class="exp-item timeline-item">
                    <span class="exp-dot"></span>
                    <button class="exp-header" aria-expanded="false">
                        <div class="exp-header-main">
                            <span class="exp-period">${period}</span>
                            <h4 class="exp-role">${roleHtml}</h4>
                            ${companyHtml}
                        </div>
                        <span class="exp-toggle"><i class="fas fa-plus"></i></span>
                    </button>
                    <div class="exp-details">
                        <div class="exp-details-inner">
                            ${location ? `<p class="exp-location"><i class="fas fa-map-marker-alt me-2"></i>${location}</p>` : ''}
                            ${bulletsArr.length ? `<ul class="exp-bullets">${bulletsArr.map(b => `<li>${b}</li>`).join('')}</ul>` : ''}
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // observer untuk reveal
        const revealObs = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => entry.target.classList.add('is-visible'), i * 80);
                }
            });
        }, { threshold: 0.1 });
        el.querySelectorAll('.timeline-item').forEach(it => revealObs.observe(it));
    }

    /* ═══════════════════════════════════════════════════════
       RENDER: PROJECTS
       ═══════════════════════════════════════════════════════ */
    function renderProjects() {
        const el = document.getElementById('projectsGrid');
        if (!el) return;
        el.innerHTML = CONFIG.projects.items.map(p => {
            const title = t(p.title);
            const desc  = t(p.description);

            const imgBlock = p.image
                ? `<div class="project-img-wrap"><img src="${p.image}" alt="${title}" class="project-img" /></div>`
                : `<div class="project-img-wrap project-img-placeholder">
                       <div class="project-img-icon"><i class="${p.icon || 'fas fa-cube'}"></i></div>
                   </div>`;

            const techBlock = (p.tech && p.tech.length)
                ? `<div class="project-tech">${p.tech.map(tt => `<span class="tech-tag">${tt}</span>`).join('')}</div>`
                : '';

            const linkObj = p.link || (p.url ? {
                href: p.url,
                label: p.urlLabel || tLabel('viewProject'),
                icon: p.urlIcon || 'fas fa-external-link-alt'
            } : null);

            const linkBlock = linkObj
                ? `<div class="project-links">
                       <a href="${linkObj.href}" target="_blank" rel="noopener">
                           <i class="${linkObj.icon || 'fab fa-github'}"></i> ${t(linkObj.label)}
                       </a>
                   </div>`
                : '';

            return `
                <div class="project-card">
                    ${imgBlock}
                    <div class="project-body">
                        ${p.num ? `<span class="project-num">${p.num}</span>` : ''}
                        <h5 class="project-title">${title}</h5>
                        <p class="project-desc">${desc}</p>
                        ${techBlock}
                        ${linkBlock}
                    </div>
                </div>
            `;
        }).join('');
    }

    /* ═══════════════════════════════════════════════════════
       RENDER: CERTIFICATES
       ═══════════════════════════════════════════════════════ */
    function renderCertificates() {
        const el = document.getElementById('certsGrid');
        if (!el) return;
        el.innerHTML = CONFIG.certificates.items.map(c => `
            <div class="certificate-card"
                 data-bs-toggle="modal"
                 data-bs-target="#certificateModal"
                 data-img-src="${c.image}"
                 data-url="${c.url || ''}"
                 data-url-label="${c.urlLabel ? t(c.urlLabel) : tLabel('viewOriginal')}">
                <div class="certificate-img-wrapper">
                    <img src="${c.image}" alt="${t(c.title)}" class="certificate-img" />
                    <div class="overlay"><i class="fas fa-expand"></i></div>
                </div>
                <div class="certificate-body">
                    <h5>${t(c.title)}</h5>
                    <p>${t(c.subtitle)}</p>
                </div>
            </div>
        `).join('');
    }

    /* ═══════════════════════════════════════════════════════
       RENDER: CONTACT + FOOTER
       ═══════════════════════════════════════════════════════ */
    function renderContactFooter() {
        document.getElementById('contactLabel').textContent = t(CONFIG.contact.sectionLabel);
        document.getElementById('contactTitle').innerHTML =
            `${t(CONFIG.contact.titleLine1)}<br /><em>${t(CONFIG.contact.titleLine2)}</em>`;
        document.getElementById('contactTagline').innerHTML = t(CONFIG.contact.tagline);

        const emailEl = document.getElementById('contactEmail');
        emailEl.href = `mailto:${CONFIG.contact.email}`;
        emailEl.textContent = CONFIG.contact.email;

        document.getElementById('socialLinks').innerHTML = CONFIG.contact.links.map(l => {
            const isExt = l.href.startsWith('http');
            return `<a href="${l.href}"${isExt ? ' target="_blank" rel="noopener"' : ''} class="social-icon">
                <i class="${l.icon}"></i> ${t(l.label)}
            </a>`;
        }).join('');

        document.getElementById('footerCopyright').textContent = t(CONFIG.footer.copyright);
        document.getElementById('footerTagline').innerHTML = t(CONFIG.footer.tagline);
    }

    /* ═══════════════════════════════════════════════════════
       RENDER: SECTION HEADERS (Experience, Publications, Education, Certificates)
       ═══════════════════════════════════════════════════════ */
    function renderSectionHeaders() {
        const map = [
            ['exp',  CONFIG.experience],
            ['pub',  CONFIG.publications],
            ['edu',  CONFIG.education],
            ['cert', CONFIG.certificates]
        ];
        map.forEach(([prefix, cfg]) => {
            const lbl = document.getElementById(prefix + 'Label');
            const ttl = document.getElementById(prefix + 'Title');
            if (lbl) lbl.textContent = t(cfg.sectionLabel);
            if (ttl) ttl.innerHTML = `${t(cfg.titleLine1)}<br /><em>${t(cfg.titleLine2)}</em>`;
        });
    }

    /* ═══════════════════════════════════════════════════════
       MASTER RENDER
       ═══════════════════════════════════════════════════════ */
    function renderAll() {
        document.documentElement.setAttribute('lang', LANG);
        renderNav();
        renderHero();
        renderAbout();
        renderCareerTimeline();
        renderSectionHeaders();

        renderTimeline('experienceList', CONFIG.experience, CONFIG.experience.items);
        renderProjects();
        renderTimeline('publicationsList', CONFIG.publications, CONFIG.publications.items);
        renderTimeline('educationList', CONFIG.education, CONFIG.education.items);
        renderCertificates();
        renderContactFooter();

        // Reveal & modal observers butuh refresh setelah render
        initReveal();
        initGallery('projectsGrid');
        initGallery('certsGrid');
        initSkillGraph();
    }

    renderAll();

    /* ═══════════════════════════════════════════════════════
       LANGUAGE SWITCHER
       ═══════════════════════════════════════════════════════ */
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.lang-btn');
        if (!btn) return;
        const lang = btn.dataset.lang;
        if (!lang || lang === LANG) return;
        LANG = lang;
        try { localStorage.setItem('lang', lang); } catch (err) {}
        renderAll();
        trackEvent('Language Switch', { lang });
    });

    /* ═══════════════════════════════════════════════════════
       THEME TOGGLE
       ═══════════════════════════════════════════════════════ */
    const themeToggle = document.getElementById('themeToggle');
    const htmlEl = document.documentElement;

    function initParticles() {
        const el = document.getElementById('particles-js');
        if (!el || typeof particlesJS === 'undefined') return;
        el.innerHTML = '';
        const isDark = htmlEl.getAttribute('data-theme') === 'dark';
        const dotColor = isDark ? '#e8e8e2' : '#111110';
        particlesJS('particles-js', {
            particles: {
                number: { value: 40, density: { enable: true, value_area: 1000 } },
                color: { value: dotColor },
                shape: { type: 'circle' },
                opacity: { value: 0.15, random: true },
                size: { value: 2, random: true },
                line_linked: { enable: true, distance: 160, color: dotColor, opacity: 0.06, width: 1 },
                move: { enable: true, speed: 0.8, direction: 'none', random: true, straight: false, out_mode: 'out', bounce: false }
            },
            interactivity: {
                detect_on: 'canvas',
                events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: false }, resize: true },
                modes: { grab: { distance: 140, line_linked: { opacity: 0.15 } } }
            },
            retina_detect: true
        });
    }

    function applyTheme(theme) {
        if (theme === 'dark') htmlEl.setAttribute('data-theme', 'dark');
        else htmlEl.removeAttribute('data-theme');
        try { localStorage.setItem('theme', theme); } catch (e) {}
        initParticles();
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = htmlEl.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
            applyTheme(current === 'dark' ? 'light' : 'dark');
        });
    }

    window.addEventListener('storage', (e) => {
        if (e.key === 'theme') {
            const nt = e.newValue === 'dark' ? 'dark' : 'light';
            applyTheme(nt);
        }
        if (e.key === 'lang') {
            const nl = e.newValue || CONFIG.i18n.default;
            if (nl !== LANG) { LANG = nl; renderAll(); }
        }
    });

    initParticles();

    /* ═══════════════════════════════════════════════════════
       SCROLL REVEAL
       ═══════════════════════════════════════════════════════ */
    function initReveal() {
        const items = document.querySelectorAll('.timeline-item');
        const obs = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => entry.target.classList.add('is-visible'), i * 80);
                }
            });
        }, { threshold: 0.1 });
        items.forEach(it => obs.observe(it));
    }

    /* ═══════════════════════════════════════════════════════
       TIMELINE TOGGLE (delegated)
       ═══════════════════════════════════════════════════════ */
    document.addEventListener('click', (e) => {
        if (e.target.closest('.role-link, .company-link')) return;
        const header = e.target.closest('.exp-header');
        if (!header) return;
        const item = header.closest('.exp-item');
        if (!item) return;
        const willOpen = !item.classList.contains('is-open');
        item.classList.toggle('is-open', willOpen);
        header.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    });

    /* ═══════════════════════════════════════════════════════
       NAVBAR SCROLL + ACTIVE LINK
       ═══════════════════════════════════════════════════════ */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    });

    function initSectionObserver() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) link.classList.add('active');
                    });
                }
            });
        }, { threshold: 0.4 });
        sections.forEach(s => obs.observe(s));
    }
    initSectionObserver();

    /* ═══════════════════════════════════════════════════════
       SECTION READ TRACKING (analytics)
       ═══════════════════════════════════════════════════════ */
    if (CONFIG.analytics && CONFIG.analytics.trackSections) {
        const readTimers = {};
        const trackObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const id = entry.target.id;
                if (!id) return;
                if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                    readTimers[id] = setTimeout(() => {
                        trackEvent('Section Read', { section: id });
                    }, 4000);
                } else {
                    clearTimeout(readTimers[id]);
                }
            });
        }, { threshold: [0, 0.5, 1] });
        document.querySelectorAll('section[id]').forEach(s => trackObs.observe(s));
    }

    /* ═══════════════════════════════════════════════════════
       CERTIFICATE MODAL
       ═══════════════════════════════════════════════════════ */
    const certificateModal = document.getElementById('certificateModal');
    const modalImage = document.getElementById('modalImage');
    const modalLink  = document.getElementById('modalLink');
    const modalLinkText = document.getElementById('modalLinkText');

    if (certificateModal) {
        certificateModal.addEventListener('show.bs.modal', function (event) {
            const card = event.relatedTarget;
            modalImage.src = card.getAttribute('data-img-src');
            const url = card.getAttribute('data-url');
            const urlLabel = card.getAttribute('data-url-label') || tLabel('viewOriginal');
            if (url) {
                modalLink.href = url;
                modalLinkText.textContent = urlLabel;
                modalLink.style.display = 'inline-flex';
            } else {
                modalLink.style.display = 'none';
                modalLink.removeAttribute('href');
            }
        });
    }

    /* ═══════════════════════════════════════════════════════
       TOOLTIPS
       ═══════════════════════════════════════════════════════ */
    [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        .forEach(el => new bootstrap.Tooltip(el));

    /* ═══════════════════════════════════════════════════════
       SMOOTH SCROLL
       ═══════════════════════════════════════════════════════ */
    document.addEventListener('click', (e) => {
        const anchor = e.target.closest('a[href^="#"]');
        if (!anchor) return;
        const href = anchor.getAttribute('href');
        if (href === '#' || href.length < 2) return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
        const navCollapse = document.getElementById('navbarNav');
        if (navCollapse && navCollapse.classList.contains('show')) {
            const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
            if (bsCollapse) bsCollapse.hide();
        }
    });

    /* ═══════════════════════════════════════════════════════
       ⬆️ BACK TO TOP
       ═══════════════════════════════════════════════════════ */
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        backToTop.setAttribute('title', tLabel('backToTop'));
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('is-visible', window.scrollY > 600);
        }, { passive: true });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            trackEvent('Back To Top');
        });
    }

    /* ═══════════════════════════════════════════════════════
       GALLERY (horizontal scroll + drag + arrows)
       ═══════════════════════════════════════════════════════ */
    function initGallery(gridId) {
        const grid = document.getElementById(gridId);
        if (!grid) return;

        const section = grid.closest('section');
        const header  = section ? section.querySelector('.section-header') : null;

        // Hapus panah lama (saat re-render bahasa)
        if (header) {
            const oldNav = header.querySelector('.gallery-nav');
            if (oldNav) oldNav.remove();
        }

        let prevBtn, nextBtn;
        if (header && !header.querySelector('.gallery-nav')) {
            const nav = document.createElement('div');
            nav.className = 'gallery-nav';
            nav.innerHTML = `
                <button class="gallery-arrow" data-dir="-1" aria-label="Previous">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <button class="gallery-arrow" data-dir="1" aria-label="Next">
                    <i class="fas fa-arrow-right"></i>
                </button>
            `;
            header.appendChild(nav);
            prevBtn = nav.querySelector('[data-dir="-1"]');
            nextBtn = nav.querySelector('[data-dir="1"]');

            [prevBtn, nextBtn].forEach(btn => {
                btn.addEventListener('click', () => {
                    const dir = parseInt(btn.dataset.dir, 10);
                    const card = grid.querySelector('.project-card, .certificate-card');
                    const gap = parseFloat(getComputedStyle(grid).gap) || 24;
                    const step = card ? (card.offsetWidth + gap) : 400;
                    grid.scrollBy({ left: dir * step, behavior: 'smooth' });
                });
            });
        }

        function updateArrows() {
            if (!prevBtn || !nextBtn) return;
            const maxScroll = grid.scrollWidth - grid.clientWidth;
            const x = grid.scrollLeft;
            prevBtn.disabled = x <= 2;
            nextBtn.disabled = x >= maxScroll - 2;
        }

        grid.addEventListener('scroll', () => {
            window.requestAnimationFrame(updateArrows);
        }, { passive: true });
        setTimeout(updateArrows, 100);

        // Drag-to-scroll (idempotent — pakai flag)
        if (!grid._dragBound) {
            grid._dragBound = true;
            let isDown = false, startX = 0, startScroll = 0, moved = false;

            grid.addEventListener('mousedown', (e) => {
                if (e.target.closest('a, button')) return;
                isDown = true; moved = false;
                startX = e.pageX; startScroll = grid.scrollLeft;
                grid.classList.add('is-dragging');
            });
            window.addEventListener('mouseup', () => {
                isDown = false;
                grid.classList.remove('is-dragging');
            });
            window.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                const dx = e.pageX - startX;
                if (Math.abs(dx) > 5) moved = true;
                grid.scrollLeft = startScroll - dx;
            });
            grid.addEventListener('click', (e) => {
                if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
            }, true);
        }
    }

    /* ═══════════════════════════════════════════════════════
       SKILL GRAPH
       ═══════════════════════════════════════════════════════ */
    function initSkillGraph() {
        const svgEl = document.getElementById('skillGraph');
        const panel = document.getElementById('skillEvidence');
        if (!svgEl || !panel || typeof d3 === 'undefined') return;

        const skills   = CONFIG.skills.nodes.map(s => ({ ...s }));
        const links    = CONFIG.skills.links.map(l => ({ ...l }));
        const evidence = CONFIG.skills.evidence || {};

        const W = 720, H = 520;

        const degree = {};
        skills.forEach(s => degree[s.id] = 0);
        links.forEach(l => {
            degree[l.source] = (degree[l.source] || 0) + 1;
            degree[l.target] = (degree[l.target] || 0) + 1;
        });
        const maxDeg = Math.max(...Object.values(degree));
        const fontSizeFor = d => 12 + (degree[d.id] / maxDeg) * 8;

        const svg = d3.select(svgEl);
        svg.selectAll('*').remove();
        svg.attr('viewBox', `0 0 ${W} ${H}`).attr('preserveAspectRatio', 'xMidYMid meet');

        const linkG = svg.append('g').attr('class', 'sg-links');
        const nodeG = svg.append('g').attr('class', 'sg-nodes');

        const linkSel = linkG.selectAll('line').data(links).join('line').attr('class', 'sg-link');
        const nodeSel = nodeG.selectAll('g').data(skills).join('g').attr('class', 'sg-node');

        nodeSel.append('circle').attr('class', 'sg-hit').attr('r', 40);

        const textSel = nodeSel.append('text')
            .attr('class', 'sg-label')
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .attr('font-size', d => fontSizeFor(d) + 'px');

        textSel.each(function (d) {
            const el = d3.select(this);
            const label = t(d.label);
            const words = label.split(' ');
            if (words.length > 1 && label.length > 10) {
                const mid = Math.ceil(words.length / 2);
                el.append('tspan').attr('x', 0).attr('dy', '-0.45em').text(words.slice(0, mid).join(' '));
                el.append('tspan').attr('x', 0).attr('dy', '1.25em').text(words.slice(mid).join(' '));
            } else {
                el.append('tspan').attr('x', 0).attr('dy', '0.32em').text(label);
            }
        });

        nodeSel.each(function (d) {
            const textNode = this.querySelector('text');
            let bbox = { width: 60, height: 20 };
            try { bbox = textNode.getBBox(); } catch (e) {}
            d._r = Math.max(bbox.width, bbox.height) / 2 + 18;
            d3.select(this).select('.sg-hit').attr('r', d._r);
        });

        const sim = d3.forceSimulation(skills)
            .force('link', d3.forceLink(links).id(d => d.id)
                .distance(d => ((d.source._r || 40) + (d.target._r || 40) + 40))
                .strength(0.45))
            .force('charge', d3.forceManyBody().strength(-480))
            .force('center', d3.forceCenter(W / 2, H / 2))
            .force('collide', d3.forceCollide().radius(d => (d._r || 40) + 6).iterations(2))
            .on('tick', () => {
                linkSel
                    .attr('x1', d => d.source.x).attr('y1', d => d.source.y)
                    .attr('x2', d => d.target.x).attr('y2', d => d.target.y);
                nodeSel.attr('transform', d => `translate(${d.x},${d.y})`);
            });

        nodeSel.call(d3.drag()
            .on('start', (event, d) => { if (!event.active) sim.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
            .on('drag', (event, d) => { d.fx = event.x; d.fy = event.y; })
            .on('end', (event, d) => { if (!event.active) sim.alphaTarget(0); d.fx = null; d.fy = null; })
        );

        let selectedId = null, hoverId = null;

        function refreshHighlight() {
            const focusId = hoverId || selectedId;
            if (!focusId) {
                nodeSel.classed('is-dim', false).classed('is-active', false);
                linkSel.classed('is-dim', false).classed('is-active', false);
                return;
            }
            const neighbors = new Set([focusId]);
            links.forEach(l => {
                const s = l.source.id, tt = l.target.id;
                if (s === focusId) neighbors.add(tt);
                if (tt === focusId) neighbors.add(s);
            });
            nodeSel
                .classed('is-dim', d => !neighbors.has(d.id))
                .classed('is-active', d => d.id === focusId);
            linkSel
                .classed('is-active', l => l.source.id === focusId || l.target.id === focusId)
                .classed('is-dim',    l => l.source.id !== focusId && l.target.id !== focusId);
        }

        function renderEvidence(skill) {
            const items = evidence[skill.id] || [];
            if (!items.length) {
                panel.innerHTML = `
                    <span class="evidence-kicker">Evidence</span>
                    <h4 class="evidence-title">${t(skill.label)}</h4>
                    <p class="evidence-sub">${skill.sub}</p>
                    <p class="evidence-prompt">No evidence entries yet.</p>
                `;
                return;
            }
            panel.innerHTML = `
                <span class="evidence-kicker">Evidence</span>
                <h4 class="evidence-title">${t(skill.label)}</h4>
                <p class="evidence-sub">${skill.sub}</p>
                <div class="evidence-list">
                    ${items.map((it, i) => {
                        const titleHtml = it.url
                            ? `<a href="${it.url}" target="_blank" rel="noopener" class="evidence-link">${it.title}<i class="fas fa-external-link-alt link-icon"></i></a>`
                            : it.title;
                        return `
                            <div class="evidence-item" style="animation-delay:${i * 60}ms">
                                <span class="evidence-type">${it.type}</span>
                                <h5>${titleHtml}</h5>
                                <p>${it.desc}</p>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        }

        nodeSel
            .on('mouseenter', (e, d) => { hoverId = d.id; refreshHighlight(); })
            .on('mouseleave', () => { hoverId = null; refreshHighlight(); })
            .on('click', (e, d) => {
                e.stopPropagation();
                selectedId = d.id;
                refreshHighlight();
                renderEvidence(d);
                trackEvent('Skill Click', { skill: d.id });
            });

        const first = skills[0];
        if (first) {
            selectedId = first.id;
            refreshHighlight();
            renderEvidence(first);
        }
    }

});