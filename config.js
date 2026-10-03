/* ═══════════════════════════════════════════════════════════════
   ✏️  EDIT FILE INI SAJA
   ─────────────────────────────────────────────────────────────
   🌐 BILINGUAL: setiap field text bisa berupa:
      - "Hello"                          → dipakai untuk semua bahasa
      - { en: "Hello", id: "Halo" }      → versi per bahasa

   📅 CAREER TIMELINE: setiap experience item butuh:
      - startDate : "YYYY-MM" (contoh: "2024-11")
      - endDate   : "YYYY-MM" atau null untuk "Present"
      - category  : "work" | "research" | "education" | "internship"
        (untuk warna bar di Gantt chart)
      Kalau tidak diisi, akan otomatis di-parse dari field `period`.

   📊 ANALYTICS: isi salah satu atau keduanya di `analytics`.
   ═══════════════════════════════════════════════════════════════ */

const CONFIG = {
  /* ─────────────────────────────────────────────────────────────
     0. LANGUAGE / i18n
     ───────────────────────────────────────────────────────────── */
  i18n: {
    default: "en",
    languages: [
      { code: "en", label: "EN" },
      { code: "id", label: "ID" },
    ],
    labels: {
      backToTop: { en: "Back to top", id: "Kembali ke atas" },
      viewProject: { en: "View Project", id: "Lihat Proyek" },
      viewOriginal: { en: "View Original", id: "Lihat Asli" },
      verifyCert: { en: "Verify Certificate", id: "Verifikasi Sertifikat" },
      present: { en: "Present", id: "Sekarang" },
    },
  },

  /* ─────────────────────────────────────────────────────────────
     0b. ANALYTICS (privacy-first)
     ───────────────────────────────────────────────────────────── */
  analytics: {
    // Plausible — isi `domain` dengan domain Anda di Plausible
    plausible: {
      enable: false,
      domain: "ribhanhadyan.com",
      src: "https://plausible.io/js/script.js",
    },
    // Umami Cloud / self-hosted
    umami: {
      enable: false,
      websiteId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      src: "https://cloud.umami.is/script.js",
    },
    // Track durasi baca per section (>4 detik dianggap "read")
    trackSections: true,
  },

  /* ─────────────────────────────────────────────────────────────
     1. IDENTITAS & HERO
     ───────────────────────────────────────────────────────────── */
  profile: {
    brandName: "Ribhan Hadiyan",
    logo: "img/logo_hadyan.png",
    firstName: { en: "Muhammad", id: "Muhammad" },
    lastName: { en: "Ribhan Hadiyan", id: "Ribhan Hadiyan" },
    eyebrow: { en: "Portfolio · 2026", id: "Portofolio · 2026" },
    roles: {
      en: ["Data Scientist", "Mathematician", "Operations Research Enthusiast", "Problem Solver"],
      id: ["Data Scientist", "Matematikawan", "Penggemar Operations Research", "Pemecah Masalah"],
    },
    description: {
      en: "Data Science &amp; Modelling Specialist at BFI Finance with a Mathematics background (GPA 3.88/4.00). Built the team's first behavior-based collection model.",
      id: "Spesialis Data Science &amp; Modelling di BFI Finance dengan latar belakang Matematika (IPK 3.88/4.00). Membangun model collection pertama berbasis behavior di tim.",
    },
    photo: "img/ribhanhadiyan.png",
    ctaPrimary: { label: { en: "View Projects", id: "Lihat Proyek" }, href: "#projects" },
    ctaSecondary: { label: { en: "Let's connect →", id: "Hubungi saya →" }, href: "#contact" },
  },

  /* ─────────────────────────────────────────────────────────────
     2. NAVIGASI
     ───────────────────────────────────────────────────────────── */
  nav: [
    { id: "home", label: { en: "Home", id: "Beranda" } },
    { id: "about", label: { en: "About", id: "Tentang" } },
    { id: "career", label: { en: "Career", id: "Karier" } },
    { id: "experience", label: { en: "Experience", id: "Pengalaman" } },
    { id: "projects", label: { en: "Projects", id: "Proyek" } },
    { id: "publications", label: { en: "Publications", id: "Publikasi" } },
    { id: "education", label: { en: "Education", id: "Pendidikan" } },
    { id: "certificates", label: { en: "Certificates", id: "Sertifikat" } },
    { id: "contact", label: { en: "Contact", id: "Kontak" } },
  ],

  /* ─────────────────────────────────────────────────────────────
     3. ABOUT
     ───────────────────────────────────────────────────────────── */
  about: {
    sectionLabel: { en: "01 — About", id: "01 — Tentang" },
    titleLine1: { en: "My Journey", id: "Perjalanan Saya" },
    titleLine2: { en: "in Data", id: "di Dunia Data" },
    paragraphs: {
      en: [
        "<strong>Data Science &amp; Modelling Specialist</strong> at BFI Finance with a Mathematics background (GPA 3.88/4.00, stochastic modelling focus). I built and deployed the first behavior-based collection model for PBF Product in my team.",
        "I work across SQL in ODPS and Trino, model monitoring systems (Streamlit, Apache Superset), and turning analysis into decisions together with business stakeholders. As a Certified TensorFlow Developer, I also bridge research in Deep Learning (Fuzzy RBM) and Robust Optimization with practical financial solutions.",
        "My academic journey at Universitas Padjadjaran forged a rigorous analytical mindset, further deepened through research in Operations Research and Robust Optimization, culminating in a thesis achieving 92% accuracy in malaria cell image classification.",
      ],
      id: [
        "<strong>Spesialis Data Science &amp; Modelling</strong> di BFI Finance dengan latar belakang Matematika (IPK 3.88/4.00, fokus pemodelan stokastik). Saya membangun dan men-deploy model collection pertama berbasis behavior untuk product PBF di tim.",
        "Saya bekerja di SQL di ODPS dan Trino, sistem monitoring model (Streamlit, Apache Superset), dan menerjemahkan analisis menjadi keputusan bersama stakeholder bisnis. Sebagai Certified TensorFlow Developer, saya juga menjembatani riset Deep Learning (Fuzzy RBM) dan Robust Optimization dengan solusi finansial praktis.",
        "Perjalanan akademis saya di Universitas Padjadjaran membentuk pola pikir analitis yang ketat, diperdalam melalui riset di Operations Research dan Robust Optimization, memuncak pada skripsi dengan akurasi 92% untuk klasifikasi sel malaria.",
      ],
    },
    stats: [
      { number: "3.88", label: { en: "GPA / 4.00", id: "IPK / 4.00" } },
      { number: "5+", label: { en: "Publications", id: "Publikasi" } },
    ],
  },

  /* ─────────────────────────────────────────────────────────────
     4. SKILL GRAPH
     ───────────────────────────────────────────────────────────── */
  skills: {
    showcaseLabel: { en: "Technical Skills", id: "Keahlian Teknis" },
    showcaseTitle: { en: "Skill Graph", id: "Peta Keahlian" },
    showcaseTitleAccent: { en: "& Evidence", id: "& Bukti" },
    hint: {
      en: "Hover a node to highlight related skills · Click to reveal where it was applied",
      id: "Arahkan ke node untuk menyorot skill terkait · Klik untuk melihat penerapannya",
    },

    nodes: [
      { id: "python", label: { en: "Python", id: "Python" }, sub: "Pandas · NumPy · Scikit-learn" },
      { id: "sql", label: { en: "SQL", id: "SQL" }, sub: "Trino · ODPS" },
      { id: "r", label: { en: "R & LaTeX", id: "R & LaTeX" }, sub: "Biblioshiny · Typesetting" },
      { id: "dl", label: { en: "Deep Learning", id: "Deep Learning" }, sub: "TensorFlow · Keras" },
      { id: "fe", label: { en: "Feature Engineering", id: "Feature Engineering" }, sub: "Statistical Modeling" },
      { id: "shap", label: { en: "Explainable AI", id: "Explainable AI" }, sub: "SHAP" },
      { id: "mlops", label: { en: "MLOps", id: "MLOps" }, sub: "Deployment · UAT/PAT · Monitoring" },
      { id: "viz", label: { en: "Visualization", id: "Visualisasi" }, sub: "Streamlit · Superset · Tableau" },
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
        { type: "Work · BFI Finance", title: "ODPS → Trino Migration", desc: "Translated queries and mapped tables — reduced a 1-month+ manual backfill to 2 weeks." },
        { type: "Work · BFI Finance", title: "Monitoring Datamart", desc: "Trino SQL datamart powering Streamlit & Superset monitoring." },
      ],
      r: [
        { type: "Research · Unpad", title: "Bibliometric Analyses", desc: "R-Biblioshiny + VOSviewer across 5+ research topics and 200+ articles." },
        { type: "Publications", title: "LaTeX Manuscripts", desc: "Formatted and revised 15+ manuscripts for IAENG, Elsevier and Springer journals." },
      ],
      dl: [
        { type: "Thesis · Unpad 2024", title: "Fuzzy Restricted Boltzmann Machine", desc: "Combined fuzzy logic with RBM feature extraction for malaria cell image classification (92%)." },
        { type: "Project · Bangkit", title: "LiFit — BMI Detection App", desc: "Capstone mobile app with TensorFlow-powered BMI detection.", url: "https://github.com/Ribhanhadyan/LiFit" },
        { type: "Project", title: "Stock Prediction — RNN & LSTM", desc: "Recurrent networks for stock-market time-series forecasting." },
      ],
      fe: [
        { type: "Work · BFI Finance", title: "Behavior-Based Collection Model", desc: "Engineered features driving the first behavior-based collection model — lifted Tele success rate from 70% to 90%." },
        { type: "Work · BFI Finance", title: "Feature Migration (200+)", desc: "Migrated and selected 200+ features from ODPS to Trino." },
        { type: "Project · DSC 2024", title: "E-wallet Fraud Features", desc: "Engineered behavioral and transaction features for real-time fraud detection." },
      ],
      shap: [
        { type: "Project · DSC 2024", title: "E-wallet Fraud Explainability", desc: "Applied SHAP to explain model predictions in a real-time fraud dashboard.", url: "https://github.com/WibiAnto/AstlaM-DSC2024" },
        { type: "Work · BFI Finance", title: "Model Explainability", desc: "Translated model outputs into business-actionable insights." },
      ],
      mlops: [
        { type: "Work · BFI Finance", title: "Deployment & QA", desc: "Managed Car/MCY retail model deployment with UAT (7 scenarios) and PAT (8 rollback scenarios)." },
        { type: "Work · BFI Finance", title: "Model Monitoring System", desc: "Streamlit + Superset dashboards backed by a Trino datamart." },
        { type: "Work · BFI Finance", title: '"Is Success" Tracking Rebuild', desc: "Reduced the feedback loop from a 15-day lag to daily monitoring." },
        { type: "Work · BFI Finance", title: "G-Chat Health Alerts", desc: "Integrated G-Chat alerts for readiness of 5 critical pipeline tables." },
      ],
      viz: [
        { type: "Work · BFI Finance", title: "Streamlit & Superset", desc: "Two-part monitoring system: DS-facing Streamlit app + business-facing Superset dashboards." },
        { type: "Project · DSC 2024", title: "Dash Fraud Dashboard", desc: "Real-time interactive dashboard visualizing fraud detection results and SHAP explanations.", url: "https://github.com/WibiAnto/AstlaM-DSC2024" },
        { type: "Research · Unpad", title: "Optimization Visualizations", desc: "Python visualizations of optimization models (convex hull, demand/capacity)." },
      ],
    },
  },

  /* ─────────────────────────────────────────────────────────────
     5. CAREER TIMELINE (Gantt)
     ───────────────────────────────────────────────────────────── */
  career: {
    sectionLabel: { en: "02 — Career Path", id: "02 — Jalur Karier" },
    titleLine1: { en: "Career", id: "Timeline" },
    titleLine2: { en: "Timeline", id: "Karier" },
    legend: {
      work: { en: "Work", id: "Kerja", color: "#c8a96e" },
      research: { en: "Research", id: "Riset", color: "#8a9bae" },
      education: { en: "Education", id: "Pendidikan", color: "#7a8f6a" },
      internship: { en: "Internship", id: "Magang", color: "#b58a9c" },
    },
  },

  /* ─────────────────────────────────────────────────────────────
     6. WORK EXPERIENCE
        startDate, endDate, category WAJIB untuk Gantt chart.
     ───────────────────────────────────────────────────────────── */
  experience: {
    sectionLabel: { en: "03 — Experience", id: "03 — Pengalaman" },
    titleLine1: { en: "Work", id: "Riwayat" },
    titleLine2: { en: "History", id: "Kerja" },
    items: [
      {
        period: "Nov 2024 — Present",
        startDate: "2024-11",
        endDate: null,
        category: "work",
        role: { en: "Asset Management Data Science & Modelling Specialist", id: "Spesialis Data Science & Modelling Asset Management" },
        company: "PT BFI Finance Indonesia, Tbk",
        companyUrl: "https://www.bfi.co.id",
        location: { en: "Tangerang, Banten, Indonesia", id: "Tangerang, Banten, Indonesia" },
        bullets: {
          en: [
            "Built and deployed the <strong>first behavior-based collection model</strong> for the PBF/mortgage portfolio, replacing a duration-based routing rule (Tele vs. Field) and raising <strong>Tele success rate from 70% to 90%</strong> by routing high-risk contracts to Field/ARO from day one of delinquency.",
            "Led end-to-end development of 2 mortgage predictive models classifying 1,500+ monthly contracts: migrating 200+ features from <strong>ODPS to Trino</strong>, feature engineering/selection, modelling, and getting management approval for rollout.",
            "Handled an ODPS-to-Trino cost constraint with a query-translation and table-mapping approach, reducing a projected <strong>1-month+ manual backfill to 2 weeks</strong> and keeping the PBF model deployment on schedule.",
            "Resolved a disagreement on the self-cure label definition (7 vs. 13 days past due) by building and comparing two parallel models on success rate, giving management a data-based reference for the final decision.",
            "Managed <strong>model deployment and QA</strong> for Car/MCY retail models with Data Management on UAT (Features &amp; Models) and PAT, covering 7 UAT scenarios and 8 rollback contingency scenarios.",
            "Built a two-part <strong>model monitoring system</strong>: a Streamlit app for Data Science analysis and Apache Superset dashboards for business stakeholders, backed by a Trino SQL datamart that automated persona monitoring and replaced manual Excel VLOOKUP work.",
            'Rebuilt the <strong>"Is Success" model tracking</strong> pipeline, reducing the feedback loop from a 15-day lag to <strong>daily monitoring</strong> for management.',
            "Built a <strong>G-Chat integration</strong> for infrastructure health checks, sending alerts on the readiness of 5 critical tables to catch pipeline issues earlier.",
          ],
          id: [
            "Membangun dan men-deploy <strong>model collection pertama berbasis behavior</strong> untuk portofolio PBF/mortgage, menggantikan aturan routing berbasis durasi (Tele vs. Field) dan meningkatkan <strong>success rate Tele dari 70% ke 90%</strong> dengan routing kontrak berisiko tinggi ke Field/ARO sejak hari pertama keterlambatan.",
            "Memimpin pengembangan end-to-end 2 model prediktif mortgage yang mengklasifikasikan 1.500+ kontrak bulanan: migrasi 200+ fitur dari <strong>ODPS ke Trino</strong>, feature engineering/selection, pemodelan, dan mendapatkan persetujuan manajemen untuk rollout.",
            "Mengatasi kendala biaya ODPS-to-Trino dengan pendekatan query-translation dan table-mapping, memangkas <strong>backfill manual 1 bulan+ menjadi 2 minggu</strong> dan menjaga deployment model PBF sesuai jadwal.",
            "Menyelesaikan perbedaan pendapat tentang definisi label self-cure (7 vs. 13 hari keterlambatan) dengan membangun dan membandingkan dua model paralel pada success rate, memberi manajemen referensi berbasis data.",
            "Mengelola <strong>deployment dan QA model</strong> untuk model retail Car/MCY bersama Data Management pada UAT (Features &amp; Models) dan PAT, mencakup 7 skenario UAT dan 8 skenario rollback.",
            "Membangun <strong>sistem monitoring model</strong> dua bagian: aplikasi Streamlit untuk analisis Data Science dan dashboard Apache Superset untuk stakeholder bisnis, didukung datamart Trino SQL yang mengotomasi monitoring persona dan menggantikan pekerjaan VLOOKUP Excel manual.",
            'Membangun ulang pipeline <strong>tracking model "Is Success"</strong>, memangkas feedback loop dari jeda 15 hari menjadi <strong>monitoring harian</strong> untuk manajemen.',
            "Membangun <strong>integrasi G-Chat</strong> untuk health check infrastruktur, mengirim alert kesiapan 5 tabel kritis untuk mendeteksi masalah pipeline lebih dini.",
          ],
        },
      },
      {
        period: "Feb 2023 — Feb 2026",
        startDate: "2023-02",
        endDate: "2026-02",
        category: "research",
        role: { en: "Research & Teaching Assistant", id: "Asisten Riset & Pengajaran" },
        company: "Universitas Padjadjaran",
        companyUrl: "https://www.unpad.ac.id",
        companyNote: { en: "with Prof. Diah Chaerani", id: "bersama Prof. Diah Chaerani" },
        location: { en: "Bandung, Indonesia", id: "Bandung, Indonesia" },
        bullets: {
          en: [
            "Conducted literature reviews and bibliometric analyses across 5+ research topics (robust optimization, machine learning, green economy) using R-Biblioshiny &amp; VOSviewer, analyzing 200+ articles to support 3+ journal publications.",
            "Formatted and revised 15+ manuscripts for international journals (IAENG, Elsevier, Springer) in LaTeX, ensuring template compliance and incorporating reviewer feedback.",
            "Modernized the Optimization and Nonlinear Programming practicum curriculum, migrating from Maple/MATLAB to Python and designing OBE-based lesson plans and assessments for 60+ students.",
            'Built Python visualizations for optimization models (convex hull, demand/capacity) and contributed to a textbook on "Optimization with Python," including indexing and glossary.',
            "Supported accreditation documentation for the Doctoral Program in Mathematics, including layout and compilation.",
          ],
          id: [
            "Melakukan literature review dan analisis bibliometrik di 5+ topik riset (robust optimization, machine learning, green economy) menggunakan R-Biblioshiny &amp; VOSviewer, menganalisis 200+ artikel untuk mendukung 3+ publikasi jurnal.",
            "Memformat dan merevisi 15+ manuskrip untuk jurnal internasional (IAENG, Elsevier, Springer) dalam LaTeX, memastikan kepatuhan template dan menerapkan feedback reviewer.",
            "Memodernisasi kurikulum praktikum Optimization dan Nonlinear Programming, migrasi dari Maple/MATLAB ke Python dan merancang RPS serta asesmen berbasis OBE untuk 60+ mahasiswa.",
            'Membangun visualisasi Python untuk model optimisasi (convex hull, demand/capacity) dan berkontribusi pada buku teks "Optimization with Python", termasuk indexing dan glossary.',
            "Mendukung dokumentasi akreditasi Program Doktor Matematika, termasuk layout dan kompilasi.",
          ],
        },
      },
      {
        period: "Jan 2022 — Dec 2023",
        startDate: "2022-01",
        endDate: "2023-12",
        category: "work",
        role: { en: "Laboratory Assistant", id: "Asisten Laboratorium" },
        company: "Asisten Laboratorium Matematika Unpad",
        location: { en: "Jatinangor, Jawa Barat, Indonesia", id: "Jatinangor, Jawa Barat, Indonesia" },
        bullets: {
          en: ["Assisted students in mathematics laboratory sessions and practical coursework.", "Supported preparation of laboratory materials and grading."],
          id: ["Membantu mahasiswa dalam sesi laboratorium matematika dan praktikum.", "Mendukung persiapan materi laboratorium dan penilaian."],
        },
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────────
     7. PROJECTS
     ───────────────────────────────────────────────────────────── */
  projects: {
    sectionLabel: { en: "04 — Work", id: "04 — Karya" },
    titleLine1: { en: "Featured", id: "Proyek" },
    titleLine2: { en: "Projects", id: "Pilihan" },
    items: [
      {
        num: "Project / 005",
        title: { en: "Screener IDX30 — Technical Analysis App", id: "Screener IDX30 — Aplikasi Analisis Teknikal" },
        description: {
          en: "Web app that screens IDX30 stocks using pure technical analysis: grouped trend, momentum, volume and setup scoring, regime-aware rules, risk-based position sizing, and a 20-day risk range simulation.",
          id: "Aplikasi web untuk menyaring saham IDX30 dengan analisis teknikal murni: skor terkelompok (tren, momentum, volume, setup), aturan sadar regime, position sizing berbasis risiko, dan simulasi rentang risiko 20 hari.",
        },
        image: "img/project/screener/screener.jpg",
        tech: ["Python", "Streamlit", "yfinance"],
        link: { href: "https://technical-analysis-stock-indonesian.streamlit.app/", label: { en: "View Live App", id: "Lihat Aplikasi" }, icon: "fas fa-external-link-alt" },
      },
      {
        num: "Project / 001",
        title: { en: "Predictive E-wallet Fraud", id: "Prediksi Fraud E-wallet" },
        description: {
          en: "A real-time interactive dashboard for detecting and analyzing fraudulent e-wallet transactions using machine learning and explainable AI (SHAP).",
          id: "Dashboard interaktif real-time untuk mendeteksi dan menganalisis transaksi fraud e-wallet menggunakan machine learning dan explainable AI (SHAP).",
        },
        image: "img/project/dsc/dashboard_fraud_ewalet.gif",
        tech: ["Python", "Dash", "SHAP"],
        link: { href: "https://github.com/WibiAnto/AstlaM-DSC2024", label: { en: "View on GitHub", id: "Lihat di GitHub" }, icon: "fab fa-github" },
      },
      {
        num: "Project / 002",
        title: { en: "Sentiment Analysis — Megathrust", id: "Analisis Sentimen — Megathrust" },
        description: {
          en: "Processed 10K+ tweets using NLP pipelines to classify public sentiment on megathrust earthquakes using the Indonesia-BERT model.",
          id: "Memproses 10K+ tweet menggunakan pipeline NLP untuk klasifikasi sentimen publik tentang gempa megathrust menggunakan model Indonesia-BERT.",
        },
        image: "img/project/megatrusht/Sentiment_distribution.png",
        tech: ["Python", "BERT", "NLP"],
        url: "https://github.com/Ribhanhadyan/Sentiment-Analysis-Megatrusht",
      },
      {
        num: "Project / 003",
        title: { en: "LiFit — BMI Detection App", id: "LiFit — Aplikasi Deteksi BMI" },
        description: {
          en: "Capstone mobile app for BMI detection and health tracking with personalized recommendations powered by machine learning.",
          id: "Aplikasi mobile capstone untuk deteksi BMI dan pelacakan kesehatan dengan rekomendasi personal berbasis machine learning.",
        },
        image: "img/project/lifit/lifit.gif",
        tech: ["Kotlin", "TensorFlow", "Firebase"],
        link: { href: "https://github.com/Ribhanhadyan/LiFit", label: { en: "View on GitHub", id: "Lihat di GitHub" }, icon: "fab fa-github" },
      },
      {
        num: "Project / 004",
        title: { en: "Stock Prediction — RNN & LSTM", id: "Prediksi Saham — RNN & LSTM" },
        description: {
          en: "Built RNN & LSTM models for stock market analysis. RNN achieved MAE of 0.0249, demonstrating strong time-series forecasting capability.",
          id: "Membangun model RNN & LSTM untuk analisis pasar saham. RNN mencapai MAE 0.0249, menunjukkan kemampuan peramalan time-series yang kuat.",
        },
        icon: "fas fa-chart-line",
        tech: ["Python", "RNN", "LSTM", "TensorFlow"],
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────────
     8. PUBLICATIONS
     ───────────────────────────────────────────────────────────── */
  publications: {
    sectionLabel: { en: "05 — Research", id: "05 — Riset" },
    titleLine1: { en: "Publications", id: "Publikasi" },
    titleLine2: { en: "& Research", id: "& Riset" },
    items: [
      {
        period: "2026",
        role: "Integrating Dynamic Programming and Machine Learning for Spatial Land Use Allocation: A Systematic Literature Review Toward Green Economy Goals",
        company: "Engineering Letters",
        location: "Dynamic Programming · Machine Learning · Systematic Literature Review",
        url: "https://www.engineeringletters.com/issues_v34/issue_10/EL_34_10_44.pdf",
      },
      {
        period: "2026",
        role: "A Systematic Review of Robust Optimization and Machine Learning Integration for Sustainable Resource Allocation Problems",
        company: "IAENG International Journal of Applied Mathematics",
        location: "Robust Optimization · Machine Learning · Systematic Review",
        url: "https://www.iaeng.org/IJAM/issues_v56/issue_8/IJAM_56_8_02.pdf",
      },
      {
        period: "2025",
        role: "A Study on Lontar Printing Optimization Method for Ancient Sundanese Manuscript Preservation",
        company: "Engineering Letters",
        location: "Optimization · Cultural Heritage · Operations Research",
        url: "https://www.engineeringletters.com/issues_v33/issue_12/EL_33_12_20.pdf",
      },
      {
        period: "2025",
        role: "Classification of Fruit Ripeness Levels using Convolutional Neural Network (CNN) and Graph Neural Network (GNN) Methods",
        company: "IAENG International Journal of Computer Science",
        location: "CNN · Graph Neural Network · Computer Vision",
        url: "https://www.iaeng.org/IJCS/issues_v52/issue_11/IJCS_52_11_43.pdf",
      },
      {
        period: "2025",
        role: "Implementing Benders Decomposition Method on Multi-objective Integer Adjustable Robust Counterpart Optimization Model with Polyhedral Uncertainty Set",
        company: "Engineering Letters",
        location: "Operations Research · Robust Optimization · Integer Programming",
        url: "https://www.engineeringletters.com/issues_v33/issue_10/EL_33_10_28.pdf",
      },
      {
        period: "2024",
        role: "Ekstraksi Fitur Berdasarkan Fuzzy Restricted Boltzmann Machine Pada Klasifikasi Fashion-MNIST Dengan Dan Tanpa Noise",
        company: "SisInfo: Jurnal Sistem Informasi dan Informatika",
        location: "Deep Learning · Fuzzy Logic · Feature Extraction",
        url: "https://doi.org/10.37278/sisinfo.v6i2.876",
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────────
     9. EDUCATION
     ───────────────────────────────────────────────────────────── */
  education: {
    sectionLabel: { en: "06 — Education", id: "06 — Pendidikan" },
    titleLine1: { en: "Academic", id: "Latar" },
    titleLine2: { en: "Background", id: "Belakang" },
    items: [
      {
        period: "Aug 2020 — Jun 2024",
        role: { en: "Bachelor of Mathematics", id: "Sarjana Matematika" },
        roleNote: { en: "GPA 3.88 / 4.00", id: "IPK 3.88 / 4.00" },
        company: "Universitas Padjadjaran",
        companyUrl: "https://www.unpad.ac.id",
        location: { en: "Jatinangor, Indonesia", id: "Jatinangor, Indonesia" },
        bullets: {
          en: [
            "<strong>Thesis:</strong> Implementation of Mixed Accelerated Learning based on Fuzzy Restricted Boltzmann Machines and SVM for Malaria Cell Image Classification — <em>92% Accuracy</em>.",
            "<strong>Achievement:</strong> First Runner-Up, Outstanding Mathematics Student Award 2023.",
            "<strong>Achievement:</strong> 1st Place, HIMATIKA National Scientific Writing Competition 2023.",
          ],
          id: [
            "<strong>Skripsi:</strong> Implementasi Mixed Accelerated Learning berbasis Fuzzy Restricted Boltzmann Machines dan SVM untuk Klasifikasi Citra Sel Malaria — <em>Akurasi 92%</em>.",
            "<strong>Prestasi:</strong> Juara 2, Outstanding Mathematics Student Award 2023.",
            "<strong>Prestasi:</strong> Juara 1, Lomba Karya Tulis Ilmiah Nasional HIMATIKA 2023.",
          ],
        },
      },
      {
        period: "Feb 2023 — Jul 2023",
        role: { en: "Machine Learning Specialization", id: "Spesialisasi Machine Learning" },
        company: "Bangkit Academy",
        companyUrl: "https://grow.google/bangkit/",
        companyNote: { en: "by Google, GoTo & Traveloka", id: "oleh Google, GoTo & Traveloka" },
        location: { en: "Bandung, Indonesia", id: "Bandung, Indonesia" },
        bullets: {
          en: ["Completed 900+ hours of training in Machine Learning, Deep Learning, and Cloud Deployment.", "Earned <strong>Google TensorFlow Developer Certification</strong> on the first attempt."],
          id: ["Menyelesaikan 900+ jam pelatihan Machine Learning, Deep Learning, dan Cloud Deployment.", "Mendapatkan <strong>Google TensorFlow Developer Certification</strong> pada percobaan pertama."],
        },
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────────
     10. CERTIFICATES
     ───────────────────────────────────────────────────────────── */
  certificates: {
    sectionLabel: { en: "07 — Credentials", id: "07 — Kredensial" },
    titleLine1: { en: "Certificates", id: "Sertifikat" },
    titleLine2: { en: "& Awards", id: "& Penghargaan" },
    items: [
      {
        image: "img/sertifikat1.jpg",
        title: { en: "TensorFlow Developer Certificate", id: "Sertifikat TensorFlow Developer" },
        subtitle: "Google · Bangkit Academy 2023",
        url: "https://www.credential.net/example-tf-cert",
        urlLabel: { en: "Verify Certificate", id: "Verifikasi Sertifikat" },
      },
      {
        image: "img/sertifikat2.jpg",
        title: { en: "Laboratory Assistant Certificate", id: "Sertifikat Asisten Laboratorium" },
        subtitle: { en: "Professional Development", id: "Pengembangan Profesional" },
      },
      {
        image: "img/sertifikat3.jpg",
        title: { en: "Pekan Kreativitas Mahasiswa Certificate", id: "Sertifikat Pekan Kreativitas Mahasiswa" },
        subtitle: { en: "Professional Development", id: "Pengembangan Profesional" },
      },
    ],
  },

  /* ─────────────────────────────────────────────────────────────
     11. CONTACT
     ───────────────────────────────────────────────────────────── */
  contact: {
    sectionLabel: { en: "08 — Contact", id: "08 — Kontak" },
    titleLine1: { en: "Get In", id: "Mari" },
    titleLine2: { en: "Touch", id: "Terhubung" },
    tagline: {
      en: "Always open to discussing <strong>new projects</strong>, creative ideas, or <strong>opportunities</strong> to build something remarkable together.",
      id: "Selalu terbuka untuk mendiskusikan <strong>proyek baru</strong>, ide kreatif, atau <strong>peluang</strong> untuk membangun sesuatu yang luar biasa bersama.",
    },
    email: "ribhanhadyan@gmail.com",
    links: [
      { icon: "fas fa-envelope", label: { en: "Email", id: "Email" }, href: "mailto:ribhanhadyan@gmail.com" },
      { icon: "fab fa-linkedin", label: { en: "LinkedIn", id: "LinkedIn" }, href: "https://www.linkedin.com/in/ribhanhadyan/" },
      { icon: "fab fa-github", label: { en: "GitHub", id: "GitHub" }, href: "https://github.com/Ribhanhadyan" },
      { icon: "fas fa-globe", label: { en: "Website", id: "Website" }, href: "https://ribhanhadyan.github.io/ribhanhadyan/" },
      { icon: "fas fa-tree", label: { en: "Linktree", id: "Linktree" }, href: "https://linktr.ee/rhadiyan" },
    ],
  },

  /* ─────────────────────────────────────────────────────────────
     12. FOOTER
     ───────────────────────────────────────────────────────────── */
  footer: {
    copyright: { en: "© 2026 Muhammad Ribhan Hadiyan. All Rights Reserved.", id: "© 2026 Muhammad Ribhan Hadiyan. Hak Cipta Dilindungi." },
    tagline: { en: 'Designed with <i class="fas fa-heart"></i> &amp; built with <i class="fas fa-code"></i>', id: 'Dirancang dengan <i class="fas fa-heart"></i> &amp; dibangun dengan <i class="fas fa-code"></i>' },
  },
};
