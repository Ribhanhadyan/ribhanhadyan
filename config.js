/* ═══════════════════════════════════════════════════════════════
   ✏️  EDIT FILE INI SAJA
   ─────────────────────────────────────────────────────────────
   Semua konten website dikendalikan dari file ini.

   🔗 ATRIBUT URL (opsional, bisa ditambahkan di banyak tempat):
   - url          : alamat link (https://..., mailto:..., dsb)
   - urlLabel     : teks label (opsional, ada default per section)

   Contoh penerapan:
   - Publications → url ke DOI / halaman jurnal
   - Certificates → url ke halaman verifikasi / PDF
   - Experience   → url ke website perusahaan
   - Education    → url ke website kampus
   - Projects     → url shortcut (atau pakai `link` lengkap)
   - Skills evidence → url ke sumber referensi
   ═══════════════════════════════════════════════════════════════ */

const CONFIG = {
  /* ─────────────────────────────────────────────────────────────
     1. IDENTITAS & HERO
     ───────────────────────────────────────────────────────────── */
  profile: {
    brandName: "Ribhan Hadiyan",
    logo: "img/logo_hadyan.png",
    firstName: "Muhammad",
    lastName: "Ribhan Hadiyan",
    eyebrow: "Portfolio · 2026",
    roles: ["Data Scientist", "Mathematician", "Operations Research Enthusiast", "Problem Solver","Longlife Learner"],
    description:
      "Data Science &amp; Modelling Specialist at BFI Finance, blending a Mathematics background (GPA 3.88/4.00) with hands-on experience in building models that drive business results. I developed the team's first behavior-based collection model. Driven by curiosity and a constant desire to learn and grow.",
    photo: "img/ribhanhadiyan.png",
    ctaPrimary: { label: "View Projects", href: "#projects" },
    ctaSecondary: { label: "Let's connect →", href: "#contact" },
  },

  /* ─────────────────────────────────────────────────────────────
     2. NAVIGASI
     ───────────────────────────────────────────────────────────── */
  nav: [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "publications", label: "Publications" },
    { id: "education", label: "Education" },
    { id: "certificates", label: "Certificates" },
    { id: "contact", label: "Contact" },
  ],

  /* ─────────────────────────────────────────────────────────────
     3. ABOUT
     ───────────────────────────────────────────────────────────── */
  about: {
    sectionLabel: "01 — About",
    titleLine1: "My Journey",
    titleLine2: "in Data",
    paragraphs: [
      "<strong>Data Science &amp; Modelling Specialist</strong> at BFI Finance, and a lifelong learner. My Mathematics background (GPA 3.88/4.00, focus on stochastic modelling) taught me to approach problems with curiosity, rigor, and humility—because there is always more to understand.",
      "At work, I had the opportunity to help build and deploy my team’s first behavior-based collection model for PBF Product. I’m grateful to the team and business stakeholders who made that progress possible. I work with SQL in ODPS and Trino, develop monitoring systems with Streamlit and Apache Superset, and enjoy turning analysis into decisions together with others.",
      "As a Certified TensorFlow Developer, I’m interested in bridging research and practical financial solutions—especially in Deep Learning (Fuzzy RBM) and Robust Optimization. My academic journey at Universitas Padjadjaran, including a thesis that reached 92% accuracy in malaria cell image classification, shaped my analytical mindset while reminding me how much I still have to learn. I hope to keep growing, contributing, and learning from the people around me.",
    ],
    stats: [
      { number: "3.88", label: "GPA / 4.00" },
      { number: "4+", label: "Publications" },
    ],
  },

  /* ─────────────────────────────────────────────────────────────
     4. SKILL GRAPH
        Setiap evidence item boleh punya `url` (opsional).
     ───────────────────────────────────────────────────────────── */
  skills: {
    showcaseLabel: "Technical Skills",
    showcaseTitle: "Skill Graph",
    showcaseTitleAccent: "& Evidence",
    hint: "Hover a node to highlight related skills · Click to reveal where it was applied",

    nodes: [
      { id: "python", label: "Python", sub: "Pandas · NumPy · Scikit-learn" },
      { id: "sql", label: "SQL", sub: "Trino · ODPS" },
      { id: "r", label: "R & LaTeX", sub: "Biblioshiny · Typesetting" },
      { id: "dl", label: "Deep Learning", sub: "TensorFlow · Keras" },
      { id: "fe", label: "Feature Engineering", sub: "Statistical Modeling" },
      { id: "shap", label: "Explainable AI", sub: "SHAP" },
      { id: "mlops", label: "MLOps", sub: "Deployment · UAT/PAT · Monitoring" },
      { id: "viz", label: "Visualization", sub: "Streamlit · Superset · Tableau" },
    ],

    links: [
      { source: "python", target: "dl" },
      { source: "python", target: "fe" },
      { source: "python", target: "viz" },
      { source: "python", target: "shap" },
      { source: "python", target: "r" },
      { source: "sql", target: "fe" },
      { source: "sql", target: "mlops" },
      { source: "sql", target: "viz" },
      { source: "dl", target: "shap" },
      { source: "dl", target: "fe" },
      { source: "fe", target: "shap" },
      { source: "mlops", target: "viz" },
      { source: "mlops", target: "dl" },
      { source: "r", target: "fe" },
    ],

    evidence: {
      python: [
        { type: "Work · BFI Finance", title: "Mortgage Predictive Models", desc: "Built & deployed 2 models classifying 1,500+ monthly contracts; migrated 200+ features from ODPS to Trino." },
        { type: "Project · DSC 2024", title: "Predictive E-wallet Fraud", desc: "Real-time interactive dashboard for detecting fraudulent e-wallet transactions using ML + SHAP.", url: "https://github.com/WibiAnto/AstlaM-DSC2024" },
        { type: "Thesis · Unpad 2024", title: "Fuzzy RBM + SVM — Malaria Cells", desc: "Hybrid deep feature extraction + SVM classifier reaching 92% accuracy on malaria cell images." },
        { type: "Project", title: "Stock Prediction — RNN & LSTM", desc: "Time-series forecasting models with RNN achieving MAE of 0.0249." },
      ],
      sql: [
        { type: "Work · BFI Finance", title: "ODPS → Trino Migration", desc: "Translated queries and mapped tables — reduced a 1-month+ manual backfill to 2 weeks while keeping deployment on schedule." },
        { type: "Work · BFI Finance", title: "Monitoring Datamart", desc: "Trino SQL datamart powering Streamlit & Superset monitoring, replacing manual Excel VLOOKUP workflows." },
      ],
      r: [
        { type: "Research · Unpad", title: "Bibliometric Analyses", desc: "R-Biblioshiny + VOSviewer across 5+ research topics and 200+ articles, supporting 3+ journal publications." },
        { type: "Publications", title: "LaTeX Manuscripts", desc: "Formatted and revised 15+ manuscripts for IAENG, Elsevier and Springer journals." },
      ],
      dl: [
        { type: "Thesis · Unpad 2024", title: "Fuzzy Restricted Boltzmann Machine", desc: "Combined fuzzy logic with RBM feature extraction for malaria cell image classification (92%)." },
        { type: "Project · Bangkit", title: "LiFit — BMI Detection App", desc: "Capstone mobile app with TensorFlow-powered BMI detection and personalized health recommendations.", url: "https://github.com/Ribhanhadyan/LiFit" },
        { type: "Project", title: "Stock Prediction — RNN & LSTM", desc: "Recurrent networks for stock-market time-series forecasting." },
      ],
      fe: [
        { type: "Work · BFI Finance", title: "Behavior-Based Collection Model", desc: "Engineered features driving the first behavior-based collection model — lifted Tele success rate from 70% to 90%." },
        { type: "Work · BFI Finance", title: "Feature Migration (200+)", desc: "Migrated and selected 200+ features from ODPS to Trino for mortgage predictive models." },
        { type: "Project · DSC 2024", title: "E-wallet Fraud Features", desc: "Engineered behavioral and transaction features for real-time fraud detection." },
      ],
      shap: [
        { type: "Project · DSC 2024", title: "E-wallet Fraud Explainability", desc: "Applied SHAP to explain model predictions in a real-time fraud dashboard.", url: "https://github.com/WibiAnto/AstlaM-DSC2024" },
        { type: "Work · BFI Finance", title: "Model Explainability", desc: "Translated model outputs into business-actionable insights for stakeholder decisions." },
      ],
      mlops: [
        { type: "Work · BFI Finance", title: "Deployment & QA", desc: "Managed Car/MCY retail model deployment with UAT (7 scenarios) and PAT (8 rollback scenarios)." },
        { type: "Work · BFI Finance", title: "Model Monitoring System", desc: "Streamlit + Superset dashboards backed by a Trino datamart — automated persona monitoring across the portfolio." },
        { type: "Work · BFI Finance", title: '"Is Success" Tracking Rebuild', desc: "Reduced the feedback loop from a 15-day lag to daily monitoring for management." },
        { type: "Work · BFI Finance", title: "G-Chat Health Alerts", desc: "Integrated G-Chat alerts for readiness of 5 critical pipeline tables to catch issues earlier." },
      ],
      viz: [
        { type: "Work · BFI Finance", title: "Streamlit & Superset", desc: "Two-part monitoring system: DS-facing Streamlit app + business-facing Apache Superset dashboards." },
        { type: "Project · DSC 2024", title: "Dash Fraud Dashboard", desc: "Real-time interactive dashboard visualizing fraud detection results and SHAP explanations.", url: "https://github.com/WibiAnto/AstlaM-DSC2024" },
        { type: "Research · Unpad", title: "Optimization Visualizations", desc: "Python visualizations of optimization models (convex hull, demand/capacity) and textbook contributions." },
      ],
    },
  },

  /* ─────────────────────────────────────────────────────────────
     5. WORK EXPERIENCE
        Field opsional:
        - roleNote, companyNote, location, bullets (HTML allowed)
        - url        : link opsional (mis. website perusahaan)
        - urlLabel   : label custom untuk link (default: "Visit site")
     ───────────────────────────────────────────────────────────── */
  experience: {
    sectionLabel: "02 — Experience",
    titleLine1: "Work",
    titleLine2: "History",
    items: [
      {
        period: "Nov 2024 — Present",
        role: "Asset Management Data Science & Modelling Specialist",
        company: "PT BFI Finance Indonesia, Tbk",
        companyUrl: "https://www.bfi.co.id", // ← klik nama perusahaan
        location: "Tangerang, Banten, Indonesia",
        bullets: [
          "Built and deployed the <strong>first behavior-based collection model</strong> for the PBF/mortgage portfolio, replacing a duration-based routing rule (Tele vs. Field) and raising <strong>Tele success rate from 70% to 90%</strong> by routing high-risk contracts to Field/ARO from day one of delinquency.",
          "Led end-to-end development of 2 mortgage predictive models classifying 1,500+ monthly contracts: migrating 200+ features from <strong>ODPS to Trino</strong>, feature engineering/selection, modelling, and getting management approval for rollout.",
          "Handled an ODPS-to-Trino cost constraint with a query-translation and table-mapping approach, reducing a projected <strong>1-month+ manual backfill to 2 weeks</strong> and keeping the PBF model deployment on schedule.",
          "Resolved a disagreement on the self-cure label definition (7 vs. 13 days past due) by building and comparing two parallel models on success rate, giving management a data-based reference for the final decision.",
          "Managed <strong>model deployment and QA</strong> for Car/MCY retail models with Data Management on UAT (Features &amp; Models) and PAT, covering 7 UAT scenarios and 8 rollback contingency scenarios.",
          "Built a two-part <strong>model monitoring system</strong>: a Streamlit app for Data Science analysis and Apache Superset dashboards for business stakeholders, backed by a Trino SQL datamart that automated persona monitoring and replaced manual Excel VLOOKUP work.",
          'Rebuilt the <strong>"Is Success" model tracking</strong> pipeline, reducing the feedback loop from a 15-day lag to <strong>daily monitoring</strong> for management.',
          "Built a <strong>G-Chat integration</strong> for infrastructure health checks, sending alerts on the readiness of 5 critical tables to catch pipeline issues earlier.",
        ],
      },
      {
        period: "Feb 2023 — Feb 2026",
        role: "Research & Teaching Assistant",
        company: "Universitas Padjadjaran",
        companyUrl: "https://www.unpad.ac.id",
        companyNote: "with Prof. Diah Chaerani",
        location: "Bandung, Indonesia",
        bullets: [
          "Conducted literature reviews and bibliometric analyses across 5+ research topics (robust optimization, machine learning, green economy) using R-Biblioshiny &amp; VOSviewer, analyzing 200+ articles to support 3+ journal publications.",
          "Formatted and revised 15+ manuscripts for international journals (IAENG, Elsevier, Springer) in LaTeX, ensuring template compliance and incorporating reviewer feedback.",
          "Modernized the Optimization and Nonlinear Programming practicum curriculum, migrating from Maple/MATLAB to Python and designing OBE-based lesson plans and assessments for 60+ students.",
          'Built Python visualizations for optimization models (convex hull, demand/capacity) and contributed to a textbook on "Optimization with Python," including indexing and glossary.',
          "Supported accreditation documentation for the Doctoral Program in Mathematics, including layout and compilation.",
        ],
      },
      {
        period: "Jan 2022 — Dec 2023",
        role: "Laboratory Assistant",
        company: "Asisten Laboratorium Matematika Unpad",
        location: "Jatinangor, Jawa Barat, Indonesia",
        bullets: ["Assisted students in mathematics laboratory sessions and practical coursework.", "Supported preparation of laboratory materials and grading."],
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────────
     6. PROJECTS
        - image : path gambar (opsional). Jika kosong → placeholder icon.
        - icon  : class FontAwesome untuk placeholder (opsional)
        - link  : { href, label, icon } → tampil sebagai tombol link
        - url   : shortcut — otomatis jadi link "View on GitHub"
     ───────────────────────────────────────────────────────────── */
  projects: {
    sectionLabel: "03 — Work",
    titleLine1: "Featured",
    titleLine2: "Projects",
    items: [
      {
        num: "Project / 001",
        title: "Predictive E-wallet Fraud",
        description: "A real-time interactive dashboard for detecting and analyzing fraudulent e-wallet transactions using machine learning and explainable AI (SHAP).",
        image: "img/project/dsc/dashboard_fraud_ewalet.gif",
        tech: ["Python", "Dash", "SHAP"],
        link: { href: "https://github.com/WibiAnto/AstlaM-DSC2024", label: "View on GitHub", icon: "fab fa-github" },
      },
      {
        num: "Project / 002",
        title: "Sentiment Analysis — Megathrust",
        description: "Processed 10K+ tweets using NLP pipelines to classify public sentiment on megathrust earthquakes using the Indonesia-BERT model.",
        image: "img/project/megatrusht/Sentiment_distribution.png",
        tech: ["Python", "BERT", "NLP"],
        // Shortcut: `url` + opsional `urlLabel`
        url: "https://github.com/Ribhanhadyan/Sentiment-Analysis-Megatrusht",
      },
      {
        num: "Project / 003",
        title: "LiFit — BMI Detection App",
        description: "Capstone mobile app for BMI detection and health tracking with personalized recommendations powered by machine learning.",
        image: "img/project/lifit/lifit.gif",
        tech: ["Kotlin", "TensorFlow", "Firebase"],
        link: { href: "https://github.com/Ribhanhadyan/LiFit", label: "View on GitHub", icon: "fab fa-github" },
      },
      {
        num: "Project / 004",
        title: "Stock Prediction — RNN & LSTM",
        description: "Built RNN & LSTM models for stock market analysis. RNN achieved MAE of 0.0249, demonstrating strong time-series forecasting capability.",
        icon: "fas fa-chart-line",
        tech: ["Python", "RNN", "LSTM", "TensorFlow"],
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────────
     7. PUBLICATIONS
        url → link ke DOI / jurnal. Title otomatis jadi clickable.
        urlLabel → opsional (default: "View Publication")
     ───────────────────────────────────────────────────────────── */
  publications: {
    sectionLabel: "04 — Research",
    titleLine1: "Publications",
    titleLine2: "& Research",
    items: [
        {
        period: "2026",
        role: "Integrating Dynamic Programming and Machine Learning for Spatial Land Use Allocation: A Systematic Literature Review Toward Green Economy Goals",
        company: "Engineering Letters",
        location: "Dynamic Programming · Machine Learning · Bibliometric Analysis · Deep Reinforcement Learning · Robust Optimization",
        url: "https://www.engineeringletters.com/issues_v34/issue_10/EL_34_10_44.pdf", // ← ganti dengan DOI asli
      },
    {
        period: "2026",
        role: "A Systematic Review of Robust Optimization and Machine Learning Integration for Sustainable Resource Allocation Problems",
        company: "IJAM",
        location: "Robust Optimization · Machine Learning · Bibliometric Analysis",
        url: "https://www.iaeng.org/IJAM/issues_v56/issue_8/IJAM_56_8_02.pdf", // ← ganti dengan DOI asli
      },
      {
        period: "2025",
        role: "Fruit Ripeness Classification Using CNN & Bibliometric Analysis",
        company: "IAENG International Journal of Computer Science",
        location: "CNN · Computer Vision · Bibliometric Analysis",
        url: "https://www.iaeng.org/IJCS/issues_v52/issue_11/IJCS_52_11_43.pdf", // ← ganti dengan DOI asli
      },
      {
        period: "2025",
        role: "Implementing Benders Decomposition Method on Multi-objective Integer Adjustable Robust Counterpart Optimization Model with Polyhedral Uncertainty Set",
        company: "Engineering Letters",
        location: "Operations Research · Robust Optimization · Integer Programming",
        url: "https://www.engineeringletters.com/issues_v33/issue_10/EL_33_10_28.pdf",
      },
      {
        period: "2025",
        role: "A Study on Lontar Printing Optimization Method for Ancient Sundanese Manuscript Preservation",
        company: "Engineering Letters",
        location: "Optimization · Cultural Heritage · Operations Research",
        url: "https://www.engineeringletters.com/issues_v33/issue_12/EL_33_12_20.pdf",
      },
      {
        period: "2024",
        role: "Fuzzy RBM Feature Extraction on Fashion-MNIST",
        company: "Jurnal Sistem Informasi Bisnis",
        location: "Deep Learning · Fuzzy Logic · Feature Extraction",
        url: "https://jurnalunibi.unibi.ac.id/ojs/index.php/SisInfo/article/view/876",
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────────
     8. EDUCATION
        url → link ke website kampus.
     ───────────────────────────────────────────────────────────── */
  education: {
    sectionLabel: "05 — Education",
    titleLine1: "Academic",
    titleLine2: "Background",
    items: [
      {
        period: "Aug 2020 — Jun 2024",
        role: "Bachelor of Mathematics",
        roleNote: "GPA 3.88 / 4.00",
        company: "Universitas Padjadjaran",
        companyUrl: "https://www.unpad.ac.id",
        location: "Jatinangor, Indonesia",
        bullets: [
          "<strong>Thesis:</strong> Implementation of Mixed Accelerated Learning based on Fuzzy Restricted Boltzmann Machines and SVM for Malaria Cell Image Classification — <em>92% Accuracy</em>.",
          "<strong>Achievement:</strong> First Runner-Up, Outstanding Mathematics Student Award 2023.",
          "<strong>Achievement:</strong> 1st Place, HIMATIKA National Scientific Writing Competition 2023.",
        ],
      },
      {
        period: "Feb 2023 — Jul 2023",
        role: "Machine Learning Specialization",
        company: "Bangkit Academy",
        companyUrl: "https://grow.google/bangkit/",
        companyNote: "by Google, GoTo & Traveloka",
        location: "Bandung, Indonesia",
        bullets: ["Completed 900+ hours of training in Machine Learning, Deep Learning, and Cloud Deployment.", "Earned <strong>Google TensorFlow Developer Certification</strong> on the first attempt."],
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────────
     9. CERTIFICATES
        url → jika ada, tampil tombol "View Original" di modal.
     ───────────────────────────────────────────────────────────── */
  certificates: {
    sectionLabel: "06 — Credentials",
    titleLine1: "Certificates",
    titleLine2: "& Awards",
    items: [
      {
        image: "img/sertifikat1.jpg",
        title: "TensorFlow Developer Certificate",
        subtitle: "Google · Bangkit Academy 2023",
        url: "https://www.credential.net/example-tf-cert",
        urlLabel: "Verify Certificate",
      },
      {
        image: "img/sertifikat2.jpg",
        title: "Laboratory Assistant Certificate",
        subtitle: "Professional Development",
        // url opsional — bisa dihilangkan
      },
      {
        image: "img/sertifikat3.jpg",
        title: "Pekan Kreativitas Mahasiswa Certificate",
        subtitle: "Professional Development",
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────────
     10. CONTACT
     ───────────────────────────────────────────────────────────── */
  contact: {
    sectionLabel: "07 — Contact",
    titleLine1: "Get In",
    titleLine2: "Touch",
    tagline: "Always open to discussing <strong>new projects</strong>, creative ideas, or <strong>opportunities</strong> to build something remarkable together.",
    email: "ribhanhadyan@gmail.com",
    links: [
      { icon: "fas fa-envelope", label: "Email", href: "mailto:ribhanhadyan@gmail.com" },
      { icon: "fab fa-linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/ribhanhadyan/" },
      { icon: "fab fa-github", label: "GitHub", href: "https://github.com/Ribhanhadyan" },
      { icon: "fas fa-globe", label: "Website", href: "https://ribhanhadyan.github.io/ribhanhadyan/" },
      { icon: "fas fa-tree", label: "Linktree", href: "https://linktr.ee/rhadiyan" },
    ],
  },

  /* ─────────────────────────────────────────────────────────────
     11. FOOTER
     ───────────────────────────────────────────────────────────── */
  footer: {
    copyright: "© 2026 Muhammad Ribhan Hadiyan. All Rights Reserved.",
    tagline: 'Designed with <i class="fas fa-heart"></i> &amp; built with <i class="fas fa-code"></i>',
  },
};
