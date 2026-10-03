document.addEventListener("DOMContentLoaded", function () {

    if (typeof CONFIG === 'undefined') {
        console.error("config.js tidak dimuat! Pastikan <script src='config.js'> ada sebelum script.js");
        return;
    }

    /* ═══════════════════════════════════════════════════════
       HELPER: bikin link yang aman
       ═══════════════════════════════════════════════════════ */
    function makeLink(url, label, icon, className) {
        if (!url) return null;
        const isExternal = /^https?:\/\//i.test(url);
        const cls = className ? ` class="${className}"` : '';
        const attrs = isExternal ? ' target="_blank" rel="noopener"' : '';
        const iconHtml = icon ? `<i class="${icon}"></i> ` : '';
        return `<a href="${url}"${attrs}${cls}>${iconHtml}${label}</a>`;
    }

    /* ═══════════════════════════════════════════════════════
       1. NAVBAR + BRAND
       ═══════════════════════════════════════════════════════ */
    document.getElementById('brandLogo').src = CONFIG.profile.logo;
    document.getElementById('brandName').textContent = CONFIG.profile.brandName;

    document.getElementById('navMenu').innerHTML = CONFIG.nav.map((item, i) => `
        <li class="nav-item">
            <a class="nav-link${i === 0 ? ' active' : ''}" href="#${item.id}">${item.label}</a>
        </li>
    `).join('');

    /* ═══════════════════════════════════════════════════════
       2. HERO
       ═══════════════════════════════════════════════════════ */
    document.getElementById('heroEyebrow').textContent = CONFIG.profile.eyebrow;
    document.getElementById('heroName').innerHTML =
        `${CONFIG.profile.firstName}<br /><span class="hero-name-line">${CONFIG.profile.lastName}</span>`;
    document.getElementById('heroDesc').innerHTML = CONFIG.profile.description;
    document.getElementById('heroPhoto').src = CONFIG.profile.photo;
    document.getElementById('heroPhoto').alt = CONFIG.profile.brandName;

    document.getElementById('heroActions').innerHTML = `
        <a href="${CONFIG.profile.ctaPrimary.href}" class="btn-primary-outline">${CONFIG.profile.ctaPrimary.label}</a>
        <a href="${CONFIG.profile.ctaSecondary.href}" class="btn-text-link">${CONFIG.profile.ctaSecondary.label}</a>
    `;

    /* ═══════════════════════════════════════════════════════
       3. ABOUT
       ═══════════════════════════════════════════════════════ */
    document.getElementById('aboutLabel').textContent = CONFIG.about.sectionLabel;
    document.getElementById('aboutTitle').innerHTML =
        `${CONFIG.about.titleLine1}<br /><em>${CONFIG.about.titleLine2}</em>`;

    document.getElementById('aboutParagraphs').innerHTML =
        CONFIG.about.paragraphs.map(p => `<p>${p}</p>`).join('');

    document.getElementById('aboutStats').innerHTML = CONFIG.about.stats.map(s => `
        <div class="stat-item">
            <span class="stat-number">${s.number}</span>
            <span class="stat-label">${s.label}</span>
        </div>
    `).join('');

    /* ═══════════════════════════════════════════════════════
       4. SKILL SHOWCASE HEADER
       ═══════════════════════════════════════════════════════ */
    document.getElementById('skillsLabel').textContent = CONFIG.skills.showcaseLabel;
    document.getElementById('skillsTitle').innerHTML =
        `${CONFIG.skills.showcaseTitle} <em>${CONFIG.skills.showcaseTitleAccent}</em>`;
    document.getElementById('skillsHint').textContent = CONFIG.skills.hint;

    /* ═══════════════════════════════════════════════════════
       5. WORK EXPERIENCE
       ═══════════════════════════════════════════════════════ */
    document.getElementById('expLabel').textContent = CONFIG.experience.sectionLabel;
    document.getElementById('expTitle').innerHTML =
        `${CONFIG.experience.titleLine1}<br /><em>${CONFIG.experience.titleLine2}</em>`;
    renderTimeline('experienceList', CONFIG.experience.items);

    /* ═══════════════════════════════════════════════════════
       6. PROJECTS
       ═══════════════════════════════════════════════════════ */
    document.getElementById('projLabel').textContent = CONFIG.projects.sectionLabel;
    document.getElementById('projTitle').innerHTML =
        `${CONFIG.projects.titleLine1}<br /><em>${CONFIG.projects.titleLine2}</em>`;
    renderProjects('projectsGrid', CONFIG.projects.items);

    /* ═══════════════════════════════════════════════════════
       7. PUBLICATIONS
       ═══════════════════════════════════════════════════════ */
    document.getElementById('pubLabel').textContent = CONFIG.publications.sectionLabel;
    document.getElementById('pubTitle').innerHTML =
        `${CONFIG.publications.titleLine1}<br /><em>${CONFIG.publications.titleLine2}</em>`;
    renderTimeline('publicationsList', CONFIG.publications.items);

    /* ═══════════════════════════════════════════════════════
       8. EDUCATION
       ═══════════════════════════════════════════════════════ */
    document.getElementById('eduLabel').textContent = CONFIG.education.sectionLabel;
    document.getElementById('eduTitle').innerHTML =
        `${CONFIG.education.titleLine1}<br /><em>${CONFIG.education.titleLine2}</em>`;
    renderTimeline('educationList', CONFIG.education.items);

    /* ═══════════════════════════════════════════════════════
       9. CERTIFICATES
       ═══════════════════════════════════════════════════════ */
    document.getElementById('certLabel').textContent = CONFIG.certificates.sectionLabel;
    document.getElementById('certTitle').innerHTML =
        `${CONFIG.certificates.titleLine1}<br /><em>${CONFIG.certificates.titleLine2}</em>`;
    renderCertificates('certsGrid', CONFIG.certificates.items);

    /* ═══════════════════════════════════════════════════════
       10. CONTACT
       ═══════════════════════════════════════════════════════ */
    document.getElementById('contactLabel').textContent = CONFIG.contact.sectionLabel;
    document.getElementById('contactTitle').innerHTML =
        `${CONFIG.contact.titleLine1}<br /><em>${CONFIG.contact.titleLine2}</em>`;
    document.getElementById('contactTagline').innerHTML = CONFIG.contact.tagline;

    const emailEl = document.getElementById('contactEmail');
    emailEl.href = `mailto:${CONFIG.contact.email}`;
    emailEl.textContent = CONFIG.contact.email;

    document.getElementById('socialLinks').innerHTML = CONFIG.contact.links.map(l => {
        const isExternal = l.href.startsWith('http');
        return `<a href="${l.href}"${isExternal ? ' target="_blank" rel="noopener"' : ''} class="social-icon">
            <i class="${l.icon}"></i> ${l.label}
        </a>`;
    }).join('');

    /* ═══════════════════════════════════════════════════════
       11. FOOTER
       ═══════════════════════════════════════════════════════ */
    document.getElementById('footerCopyright').textContent = CONFIG.footer.copyright;
    document.getElementById('footerTagline').innerHTML = CONFIG.footer.tagline;

    /* ═══════════════════════════════════════════════════════
       RENDER HELPERS
       ═══════════════════════════════════════════════════════ */

    function renderTimeline(containerId, items) {
        const el = document.getElementById(containerId);
        if (!el) return;
        el.innerHTML = items.map(item => {
            // role: jika ada url → bungkus sebagai link
            const roleText = item.roleNote
                ? `${item.role} — <em class="role-note">${item.roleNote}</em>`
                : item.role;
            const roleHtml = item.url
                ? `<a href="${item.url}" target="_blank" rel="noopener" class="role-link">${roleText}<i class="fas fa-external-link-alt link-icon"></i></a>`
                : roleText;

            // company: companyUrl atau (fallback) company link dari item.url? → tidak, keep terpisah
            let companyInner = item.company || '';
            if (item.companyUrl) {
                companyInner = `<a href="${item.companyUrl}" target="_blank" rel="noopener" class="company-link">${companyInner}<i class="fas fa-external-link-alt link-icon"></i></a>`;
            }
            const companyHtml = item.company
                ? `<p class="exp-company">${companyInner}${item.companyNote ? ` <span class="company-note">· ${item.companyNote}</span>` : ''}</p>`
                : '';

            return `
                <div class="exp-item timeline-item">
                    <span class="exp-dot"></span>
                    <button class="exp-header" aria-expanded="false">
                        <div class="exp-header-main">
                            <span class="exp-period">${item.period}</span>
                            <h4 class="exp-role">${roleHtml}</h4>
                            ${companyHtml}
                        </div>
                        <span class="exp-toggle"><i class="fas fa-plus"></i></span>
                    </button>
                    <div class="exp-details">
                        <div class="exp-details-inner">
                            ${item.location ? `<p class="exp-location"><i class="fas fa-map-marker-alt me-2"></i>${item.location}</p>` : ''}
                            ${item.bullets && item.bullets.length ? `
                                <ul class="exp-bullets">
                                    ${item.bullets.map(b => `<li>${b}</li>`).join('')}
                                </ul>` : ''}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    function renderProjects(containerId, items) {
        const el = document.getElementById(containerId);
        if (!el) return;
        el.innerHTML = items.map(p => {
            const imgBlock = p.image
                ? `<div class="project-img-wrap">
                       <img src="${p.image}" alt="${p.title}" class="project-img" />
                   </div>`
                : `<div class="project-img-wrap project-img-placeholder">
                       <div class="project-img-icon"><i class="${p.icon || 'fas fa-cube'}"></i></div>
                   </div>`;

            const techBlock = (p.tech && p.tech.length)
                ? `<div class="project-tech">${p.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}</div>`
                : '';

            // Prioritaskan `link` object; kalau tidak ada tapi `url` ada → pakai url
            const linkObj = p.link || (p.url ? {
                href: p.url,
                label: p.urlLabel || "View Project",
                icon: p.urlIcon || "fas fa-external-link-alt"
            } : null);

            const linkBlock = linkObj
                ? `<div class="project-links">
                       <a href="${linkObj.href}" target="_blank" rel="noopener">
                           <i class="${linkObj.icon || 'fab fa-github'}"></i> ${linkObj.label}
                       </a>
                   </div>`
                : '';

            return `
                <div class="project-card">
                    ${imgBlock}
                    <div class="project-body">
                        ${p.num ? `<span class="project-num">${p.num}</span>` : ''}
                        <h5 class="project-title">${p.title}</h5>
                        <p class="project-desc">${p.description}</p>
                        ${techBlock}
                        ${linkBlock}
                    </div>
                </div>
            `;
        }).join('');
    }

    function renderCertificates(containerId, items) {
        const el = document.getElementById(containerId);
        if (!el) return;
        el.innerHTML = items.map(c => `
            <div class="certificate-card"
                 data-bs-toggle="modal"
                 data-bs-target="#certificateModal"
                 data-img-src="${c.image}"
                 data-url="${c.url || ''}"
                 data-url-label="${c.urlLabel || 'View Original'}">
                <div class="certificate-img-wrapper">
                    <img src="${c.image}" alt="${c.title}" class="certificate-img" />
                    <div class="overlay"><i class="fas fa-expand"></i></div>
                </div>
                <div class="certificate-body">
                    <h5>${c.title}</h5>
                    <p>${c.subtitle}</p>
                </div>
            </div>
        `).join('');
    }

    /* ═══════════════════════════════════════════════════════
       INTERACTIONS
       ═══════════════════════════════════════════════════════ */

    // ── Typed.js ──
    if (CONFIG.profile.roles && CONFIG.profile.roles.length) {
        new Typed('#typing-text', {
            strings: CONFIG.profile.roles,
            typeSpeed: 55,
            backSpeed: 30,
            backDelay: 2200,
            loop: true,
            cursorChar: '|',
        });
    }

    // ── Navbar on scroll ──
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    });

    // ── Active nav link on scroll ──
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const sectionObserver = new IntersectionObserver((entries) => {
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
    sections.forEach(s => sectionObserver.observe(s));

    // ── Certificate Modal (dengan link opsional) ──
    const certificateModal = document.getElementById('certificateModal');
    const modalImage = document.getElementById('modalImage');
    const modalLink  = document.getElementById('modalLink');
    const modalLinkText = document.getElementById('modalLinkText');

    if (certificateModal) {
        certificateModal.addEventListener('show.bs.modal', function (event) {
            const card = event.relatedTarget;
            modalImage.src = card.getAttribute('data-img-src');

            const url = card.getAttribute('data-url');
            const urlLabel = card.getAttribute('data-url-label') || 'View Original';
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

    // ── Tooltips ──
    [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        .forEach(el => new bootstrap.Tooltip(el));

    // ── Particles.js ──
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 40, density: { enable: true, value_area: 1000 } },
                color: { value: "#111110" },
                shape: { type: "circle" },
                opacity: { value: 0.15, random: true },
                size: { value: 2, random: true },
                line_linked: { enable: true, distance: 160, color: "#111110", opacity: 0.06, width: 1 },
                move: { enable: true, speed: 0.8, direction: "none", random: true, straight: false, out_mode: "out", bounce: false }
            },
            interactivity: {
                detect_on: "canvas",
                events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: false }, resize: true },
                modes: { grab: { distance: 140, line_linked: { opacity: 0.15 } } }
            },
            retina_detect: true
        });
    }

    // ── Scroll reveal timeline ──
    const revealItems = document.querySelectorAll('.timeline-item');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('is-visible'), i * 80);
            }
        });
    }, { threshold: 0.1 });
    revealItems.forEach(item => revealObserver.observe(item));

    // ── Toggle timeline item ──
    document.addEventListener('click', (e) => {
        // Jika klik link di dalam header → biarkan browser buka link, jangan toggle
        if (e.target.closest('.role-link, .company-link')) return;

        const header = e.target.closest('.exp-header');
        if (!header) return;
        const item = header.closest('.exp-item');
        if (!item) return;
        const willOpen = !item.classList.contains('is-open');
        item.classList.toggle('is-open', willOpen);
        header.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    });

    // ── Smooth scroll ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
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
    });

        /* ═══════════════════════════════════════════════════════
       GALLERY: horizontal scroll + drag + arrows
       ═══════════════════════════════════════════════════════ */
    initGallery('projectsGrid');
    initGallery('certsGrid');

    function initGallery(gridId) {
        const grid = document.getElementById(gridId);
        if (!grid) return;

        const section = grid.closest('section');
        const header  = section ? section.querySelector('.section-header') : null;

        // ── Suntikkan tombol panah ke section-header ──
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

        // ── Update state tombol disabled berdasarkan posisi scroll ──
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

        window.addEventListener('resize', updateArrows);
        setTimeout(updateArrows, 100);

        // ── Drag-to-scroll (mouse) ──
        let isDown = false;
        let startX = 0;
        let startScroll = 0;
        let moved = false;

        grid.addEventListener('mousedown', (e) => {
            // Jangan drag kalau yang diklik adalah link / tombol / img
            if (e.target.closest('a, button')) return;
            isDown = true;
            moved = false;
            startX = e.pageX;
            startScroll = grid.scrollLeft;
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

        // Cegah klik tak sengaja setelah drag
        grid.addEventListener('click', (e) => {
            if (moved) {
                e.preventDefault();
                e.stopPropagation();
                moved = false;
            }
        }, true);

        // ── Keyboard navigation (← / →) saat grid dalam viewport ──
        // (opsional — biarkan default kalau user tidak butuh)
    }
    
    // ── Skill Graph ──
    initSkillGraph();

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
            const words = d.label.split(' ');
            if (words.length > 1 && d.label.length > 10) {
                const mid = Math.ceil(words.length / 2);
                el.append('tspan').attr('x', 0).attr('dy', '-0.45em').text(words.slice(0, mid).join(' '));
                el.append('tspan').attr('x', 0).attr('dy', '1.25em').text(words.slice(mid).join(' '));
            } else {
                el.append('tspan').attr('x', 0).attr('dy', '0.32em').text(d.label);
            }
        });

        nodeSel.each(function (d) {
            const textNode = this.querySelector('text');
            let bbox = { width: 60, height: 20 };
            try { bbox = textNode.getBBox(); } catch (e) {}
            d._w = bbox.width;
            d._h = bbox.height;
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
                const s = l.source.id, t = l.target.id;
                if (s === focusId) neighbors.add(t);
                if (t === focusId) neighbors.add(s);
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
                    <h4 class="evidence-title">${skill.label}</h4>
                    <p class="evidence-sub">${skill.sub}</p>
                    <p class="evidence-prompt">No evidence entries yet for this skill.</p>
                `;
                return;
            }
            panel.innerHTML = `
                <span class="evidence-kicker">Evidence</span>
                <h4 class="evidence-title">${skill.label}</h4>
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
            .on('click', (e, d) => { e.stopPropagation(); selectedId = d.id; refreshHighlight(); renderEvidence(d); });

        const firstSkill = skills[0];
        if (firstSkill) {
            selectedId = firstSkill.id;
            refreshHighlight();
            renderEvidence(firstSkill);
        }
    }

});