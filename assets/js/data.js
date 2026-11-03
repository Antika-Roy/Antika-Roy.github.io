/* =====================================================================
   SITE CONTENT — edit this file to update the portfolio.
   No build step: change, commit, push, and GitHub Pages redeploys.
   ===================================================================== */

window.SITE = {
  name: "Antika Roy",
  role: "Ph.D. candidate, Electrical & Computer Engineering · University of Florida",
  pitch:
    "I build agentic and multimodal AI — LLMs, vision-language models and vision foundation models — that read X-ray, SEM and acoustic scans of chips and explain what they see.",
  focus: ["Generative AI", "Agentic AI", "LLM / VLM", "Foundation models", "RAG", "Physics-informed AI"],
  availability:
    "Open to GenAI / Agentic AI research internships and full-time roles. U.S. Permanent Resident — no sponsorship needed.",

  links: {
    email: "antika.roy@ufl.edu",
    scholar: "https://scholar.google.com/citations?user=qQUcJLcAAAAJ&hl=en",
    github: "https://github.com/Antika-Roy",
    linkedin: "https://www.linkedin.com/in/antika-roy-168509b0/",
    researchgate: "https://www.researchgate.net/profile/Antika-Roy",
    resume: "assets/docs/Antika_Roy_Resume.pdf",
  },

  /* ---- Citation metrics from Google Scholar --------------------------
     Google Scholar can't be read automatically, so copy these three
     numbers from your Scholar profile (right-hand "Cited by" box) and
     update `asOf`. Leave a value as null to hide that figure.          */
  scholar: {
    citations: null,
    hIndex: null,
    i10Index: null,
    asOf: null, // e.g. "Nov 2026"
  },

  /* Totals you report on your resume (includes papers not listed below) */
  totals: { peerReviewed: 32, patents: 2, techLicenses: 1 },

  /* ---- Research themes (used for filters and the chart) ------------- */
  themes: {
    genai: { label: "GenAI · LLM · VLM · RAG", color: "#D98A1E" },
    fm: { label: "Vision foundation models", color: "#2B7A99" },
    phys: { label: "Physics-informed AI", color: "#6A5ACD" },
    xai: { label: "Explainable & robust AI", color: "#B5486B" },
    med: { label: "Medical imaging", color: "#3E8E63" },
    data: { label: "Datasets & surveys", color: "#7A8899" },
  },

  /* ---- Featured work (top of page) ---------------------------------- */
  featured: [
    {
      title: "Cross-context RAG for photonics-packaging QA",
      venue: "SPIE Optics + Photonics 2026",
      theme: "genai",
      summary:
        "A retrieval-to-reasoning QA system that combines hybrid retrieval, query decomposition and multi-hop evidence gathering across documents.",
      result: "0.619 document-level evidence recall, with answers that cite their evidence",
      stack: ["Hybrid retrieval", "Query decomposition", "Multi-hop RAG", "LLM evaluation"],
      link: "https://spie.org/optics-photonics/presentation/From-retrieval-to-reasoning--cross-context-RAG-for-intelligent/14218-10",
    },
    {
      title: "AURA-PIE: retrieval-augmented assistant for electronics inspection",
      venue: "2026 conference paper",
      theme: "genai",
      summary:
        "An AI assistant for physical inspection of electronics that pairs a domain-specific QA dataset with LoRA fine-tuning and retrieval augmentation.",
      result: "+75.7% F1 over the fine-tuned-only baseline",
      stack: ["LoRA / QLoRA", "RAG", "Domain QA data", "Benchmarking"],
      link: "https://scholar.google.com/scholar?q=AURA-PIE+retrieval-augmented+assistant+physical+inspection+of+electronics",
    },
    {
      title: "GUIDE-X: VLM + LLM agent for X-ray inspection",
      venue: "SPIE Advanced Lithography + Patterning 2026",
      theme: "genai",
      summary:
        "A vision-language and language-model assistant that detects imaging artifacts in X-ray scans and guides operators on what to do next.",
      result: "Moves X-ray inspection from detection toward agentic operator guidance",
      stack: ["Vision-language models", "LLM agents", "Artifact detection"],
      link: "https://spie.org/advanced-lithography/presentation/GUIDE-X--VLM-LLM-based-AI-assistant-for-artifact/13981-34",
    },
    {
      title: "Few-shot PEFT of Segment Anything for PCB X-ray",
      venue: "SPIE Optics + Photonics 2024",
      theme: "fm",
      summary:
        "Adapting the Segment Anything foundation model to PCB X-ray images with parameter-efficient fine-tuning on a small annotated set.",
      result: "~34% IoU gain with patch-based augmentation",
      stack: ["SAM", "PEFT", "Few-shot learning", "PyTorch"],
      link: "https://www.spiedigitallibrary.org/conference-proceedings-of-spie/13138/3027646/Optimizing-the-segment-anything-model-for-PCB-component-segmentation-in/10.1117/12.3027646.short",
    },
    {
      title: "WaveFormer: wavelet-driven 3D Transformer",
      venue: "MICCAI 2025",
      theme: "med",
      summary:
        "A 3D Transformer that uses multi-scale wavelets to keep global context and fine detail with fewer parameters.",
      result: "~91.4% mean Dice on BraTS2023, ~93.8% on FLARE2021",
      stack: ["Transformers", "Wavelets", "3D segmentation"],
      link: "https://arxiv.org/abs/2503.23764",
    },
    {
      title: "Physics-informed networks for acoustic-microscopy enhancement",
      venue: "IEEE ECTC 2025 · Intel Best Student Paper",
      theme: "phys",
      summary:
        "A PINN that denoises scanning acoustic microscopy images of IC packages, with a new physics-consistency metric (PCRS).",
      result: "69.66 dB PSNR, PCRS 1.00e-08; patent filed",
      stack: ["PINNs", "Image reconstruction", "Multimodal fusion"],
      link: "https://scholar.google.com/scholar?q=Physics-Informed+Neural+Networks+for+SAM+Image+Enhancement+Physics-Constrained+Metric",
    },
  ],

  /* ---- Publications -------------------------------------------------
     first: true if Antika is first author. new: true if not yet on
     Google Scholar. award: optional string. Author lists marked "…" were
     truncated in the public record — fill in if you like.              */
  publications: [
    // 2026
    { year: 2026, title: "From retrieval to reasoning: cross-context RAG for intelligent QA system in photonics packaging", authors: "A. Roy, …, N. Asadizanjani", venue: "SPIE Optics + Photonics", type: "Conference", themes: ["genai"], first: true, new: true, link: "https://spie.org/optics-photonics/presentation/From-retrieval-to-reasoning--cross-context-RAG-for-intelligent/14218-10" },
    { year: 2026, title: "GUIDE-X: VLM-LLM based AI assistant for artifact detection and operator guidance in X-ray inspection", authors: "…, A. Roy, …, N. Asadizanjani", venue: "SPIE Advanced Lithography + Patterning — Metrology, Inspection, and Process Control XL", type: "Conference", themes: ["genai"], new: true, link: "https://spie.org/advanced-lithography/presentation/GUIDE-X--VLM-LLM-based-AI-assistant-for-artifact/13981-34" },
    { year: 2026, title: "AURA-PIE: an AI-enabled understanding and retrieval-augmented assistant for physical inspection of electronics", authors: "S. Ghosh, P. Craig, A. Roy, …, N. Asadizanjani", venue: "Conference paper", type: "Conference", themes: ["genai"], new: true },
    { year: 2026, title: "Data-efficient component segmentation of PCB X-ray images with adaptive patch sampling for trace detection", authors: "A. Roy, S. Ghosh, P. Shukla, P. Craig, N. Asadizanjani", venue: "ISTFA (ASM International)", type: "Conference", themes: ["fm"], first: true, new: true, link: "https://dl.asminternational.org/istfa/ISTFA2026/volume/85458" },
    { year: 2026, title: "Few-shot segmentation of advanced 3D IC structures under varying X-ray acquisition strategies", authors: "P. Craig, P. Shukla, S. Ghosh, A. Roy, N. Asadi, A. Adibhatla, J. Gelb", venue: "ISTFA (ASM International)", type: "Conference", themes: ["fm"], new: true, link: "https://dl.asminternational.org/istfa/ISTFA2026/volume/85458" },
    // 2025
    { year: 2025, title: "WaveFormer: a 3D Transformer with wavelet-driven feature representation for efficient medical image segmentation", authors: "M. M. Al Hasan, M. Zaman, A. Jawad, A. Santamaria-Pang, H. H. Lee, I. Tarapov, K. See, M. S. Imran, A. Roy, Y. P. Fallah, N. Asadizanjani, R. Forghani", venue: "MICCAI", type: "Conference", themes: ["med", "fm"], link: "https://arxiv.org/abs/2503.23764" },
    { year: 2025, title: "Physics-informed neural networks for SAM image enhancement with a novel physics-constrained metric for advanced semiconductor packaging inspection", authors: "S. Ghosh, N. Varshney, A. Roy, P. Craig, M. M. Al Hasan, R. Ghane-Motlagh, N. Elsayed, S. J. Koppal, N. Asadizanjani", venue: "IEEE 75th ECTC", type: "Conference", themes: ["phys"], award: "Intel Best Student Paper" },
    { year: 2025, title: "Applications and challenges of AI in PCB X-ray inspection: a comprehensive study", authors: "A. Roy, M. M. Al Hasan, S. Ghosh, N. Varshney, J. Julia, R. Forghani, N. Asadizanjani", venue: "ACM Journal on Emerging Technologies in Computing Systems", type: "Journal", themes: ["data"], first: true },
    { year: 2025, title: "SegPCBX: redefining automated PCB inspection with a novel PCB X-ray dataset for component analysis", authors: "A. Roy, N. Varshney, P. Craig, …, N. Asadizanjani", venue: "SPIE Advanced Lithography + Patterning — Metrology, Inspection, and Process Control XXXIX", type: "Conference", themes: ["data", "fm"], first: true, link: "https://www.spiedigitallibrary.org/conference-proceedings-of-spie/13426/1342647/SegPCBX--redefining-automated-PCB-inspection-with-a-novel-PCB/10.1117/12.3058657.short" },
    { year: 2025, title: "Preserving fine details in PCB X-ray imaging: a patch-based data augmentation method for improved segmentation and detection", authors: "A. Roy, S. Ghosh, P. Craig, …, N. Asadizanjani", venue: "SPIE Advanced Lithography + Patterning", type: "Conference", themes: ["fm"], first: true },
    { year: 2025, title: "Advanced metrics for high-precision PCB inspection using 3D X-ray reconstruction", authors: "S. Ghosh, A. Roy, N. Varshney, …, N. Asadizanjani", venue: "SPIE Advanced Lithography + Patterning", type: "Conference", themes: ["phys"] },
    { year: 2025, title: "ZEAL: a framework for zero-shot enhanced analysis and learning for SEM image defect correction in ICs", authors: "S. Ghosh, N. Varshney, A. Roy, …, N. Asadizanjani", venue: "Microscopy and Microanalysis", type: "Journal", themes: ["fm"] },
    { year: 2025, title: "A next-generation defect taxonomy for AI-enhanced SEM-based semiconductor inspection", authors: "S. Ghosh, N. Varshney, A. Roy, …, N. Asadizanjani", venue: "Microscopy and Microanalysis", type: "Journal", themes: ["data"] },
    { year: 2025, title: "Deep learning-driven X-ray analysis for high-throughput manufacturing", authors: "P. Craig, A. Roy, S. Ghosh, …, N. Asadizanjani", venue: "Conference paper", type: "Conference", themes: ["fm"] },
    // 2024
    { year: 2024, title: "Optimizing the Segment Anything Model for PCB component segmentation in X-ray images through few-shot parameter-efficient fine-tuning", authors: "A. Roy, M. M. Al Hasan, S. Ghosh, …, N. Asadizanjani", venue: "SPIE Optics + Photonics — Applications of Machine Learning", type: "Conference", themes: ["fm"], first: true, link: "https://www.spiedigitallibrary.org/conference-proceedings-of-spie/13138/3027646/Optimizing-the-segment-anything-model-for-PCB-component-segmentation-in/10.1117/12.3027646.short" },
    { year: 2024, title: "Demystifying edge cases in advanced IC packaging inspection through novel explainable AI metrics", authors: "S. Ghosh, A. Roy, M. M. Al Hasan, P. Craig, N. Varshney, S. J. Koppal, N. Asadizanjani", venue: "IEEE 74th ECTC", type: "Conference", themes: ["xai"] },
    { year: 2024, title: "SHIELD-PCB: securing hardware inspection with enhanced learning and defense against adversarial examples in PCB images", authors: "S. Ghosh, A. Roy, N. Varshney, P. Craig, M. M. Al Hasan, S. J. Koppal, H. Dalir, …", venue: "SPIE Optics + Photonics — Applications of Machine Learning", type: "Conference", themes: ["xai"] },
    { year: 2024, title: "Optimizing deep learning performance in PCB X-ray inspection through synthetic data tuner", authors: "S. Ghosh, M. M. Al Hasan, P. Craig, A. Roy, N. Varshney, S. J. Koppal, H. Dalir, …", venue: "SPIE Optics + Photonics — Applications of Machine Learning", type: "Conference", themes: ["genai"] },
    { year: 2024, title: "Exploring physics-informed machine learning for system matrix formulation in X-ray imaging forward models", authors: "S. Ghosh, N. Varshney, M. M. Al Hasan, A. Roy, P. Craig, S. J. Koppal, H. Dalir, N. Asadizanjani", venue: "SPIE Optical Engineering + Applications", type: "Conference", themes: ["phys"] },
    { year: 2024, title: "Automated segmentation of lymph nodes on neck CT scans using deep learning", authors: "M. M. Al Hasan, S. Ghazimoghadam, P. Tunlayadechanont, M. T. Mostafiz, M. Gupta, A. Roy, K. Peters, B. Hochhegger, A. Mancuso, N. Asadizanjani, R. Forghani", venue: "Journal of Imaging Informatics in Medicine", type: "Journal", themes: ["med"] },
    // 2023
    { year: 2023, title: "From talent shortage to workforce excellence in the CHIPS Act era: harnessing Industry 4.0 paradigms for a sustainable future in domestic chip production", authors: "A. D. Rizi, A. Roy, R. Noor, H. Kang, N. Varshney, K. Jacob, S. Rivera-Jimenez, N. Edwards, V. J. Sorger, H. Dalir, N. Asadizanjani", venue: "arXiv", type: "Preprint", themes: ["data"] },
    // 2022
    { year: 2022, title: "Unsupervised machine learning methods for diagnosing autism spectrum disorder using multimodal data: a survey", authors: "A. Roy, P. Rivas, M. N. Tayba", venue: "International Conference on Computational Science and Computational Intelligence (CSCI)", type: "Conference", themes: ["med", "data"], first: true },
  ],

  conferences: [
    { name: "SPIE Advanced Lithography + Patterning", note: "Metrology, Inspection & Process Control" },
    { name: "IEEE ECTC", note: "Intel Best Student Paper, 2025" },
    { name: "GOMACTech", note: "Government microcircuit applications" },
    { name: "SPIE Optics + Photonics", note: "Applications of Machine Learning" },
    { name: "MICCAI", note: "Medical image computing" },
    { name: "ISTFA", note: "Test and failure analysis" },
  ],

  experience: [
    {
      when: "May 2023 – now",
      title: "Graduate Research Assistant",
      org: "SCAN Lab, ECE, University of Florida · Advisor: Dr. Navid Asadizanjani",
      points: [
        "Build LLM, VLM and RAG assistants for semiconductor inspection: AURA-PIE, GUIDE-X and a cross-context RAG QA system.",
        "Adapt vision foundation models (SAM, Transformers) to scarce X-ray, SEM and acoustic microscopy data with PEFT and data-efficient training.",
        "32 peer-reviewed papers, 2 patents filed and 1 technology license (SegPCBX dataset).",
      ],
    },
    {
      when: "Sep 2019 – Dec 2020",
      title: "Java Developer",
      org: "Wipro Limited · Dhaka",
      points: ["Built backend APIs for the GPAY mobile wallet (Java EE, REST, SOAP, MySQL) serving a national telecom user base."],
    },
    {
      when: "Jul 2018 – Aug 2019",
      title: "Junior Engineer",
      org: "Swosti Limited · Dhaka",
      points: ["Implemented business logic for a paperless microcredit platform on AWS EC2 and RDS."],
    },
  ],

  education: [
    { degree: "Ph.D., Electrical & Computer Engineering", school: "University of Florida", when: "Expected Dec 2027", gpa: "3.70 / 4.00" },
    { degree: "M.S., Electrical & Computer Engineering", school: "University of Florida", when: "May 2026", gpa: "3.70 / 4.00" },
  ],

  recognition: [
    { kind: "Award", title: "Intel Best Student Paper", detail: "IEEE 75th Electronic Components and Technology Conference (ECTC), 2025" },
    { kind: "Certification", title: "NVIDIA-Certified Associate: Generative AI LLMs", detail: "December 2025" },
    { kind: "Patent filed", title: "Image reconstruction with multimodal fusion and physics-informed neural network", detail: "Filed July 21, 2025" },
    { kind: "Patent filed", title: "Explainable AI metrics for IC packaging inspection", detail: "Filed July 8, 2025" },
    { kind: "Tech license", title: "SegPCBX: X-ray dataset for automated PCB component analysis", detail: "Licensed through University of Florida" },
  ],

  skills: [
    { group: "GenAI & LLMs", items: ["Agentic AI", "RAG (hybrid retrieval, multi-hop)", "LoRA / QLoRA fine-tuning", "LLM evaluation & benchmarking", "Vision-language models", "Diffusion models"] },
    { group: "Vision & modeling", items: ["Segment Anything", "Transformers", "Physics-informed neural networks", "Explainable AI", "Few-shot learning"] },
    { group: "Frameworks", items: ["PyTorch", "TensorFlow", "scikit-learn", "OpenCV"] },
    { group: "Engineering", items: ["Python, Java, C / C++, MATLAB", "SQL (PostgreSQL, SQLite)", "MongoDB, ChromaDB (vector DB)", "AWS", "Git & GitHub"] },
  ],
};
