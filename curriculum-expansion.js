/* Saudi Student Hub: official Saudi curriculum resources for Grades 6–12. */
(function () {
  "use strict";
  const $ = (s) => document.querySelector(s);
  const ar = document.documentElement.lang === "ar";
  const studyPlans = "https://www.moe.gov.sa/ar/education/general-education/study-plans";
  const booksIndex = "https://madrasatibeta.moe.gov.sa/books?Language=1";
  const booksIndexEn = "https://madrasatibeta.moe.gov.sa/books?Language=2";
  const ain = {
    6:"https://www.ientv.edu.sa/ar/node/29", 7:"https://www.ientv.edu.sa/ar/node/30",
    8:"https://www.ientv.edu.sa/ar/node/31", 9:"https://www.ientv.edu.sa/ar/node/32",
    10:"https://www.ientv.edu.sa/ar/node/342", 11:"https://www.ientv.edu.sa/ar/node/343",
    12:"https://www.ientv.edu.sa/ar/node/346"
  };
  const books = {
    6:"https://madrasatibeta.moe.gov.sa/books/EAEF77304EE5F11534B0FA2C69EE776F?Language=1",
    7:"https://madrasatibeta.moe.gov.sa/books/CB5B0DC90552D63CAB28951101CAB19D?Language=1",
    8:"https://madrasatibeta.moe.gov.sa/books/B47494BFDA4FEA2A30BBC9FC72357528?Language=1",
    9:"https://madrasatibeta.moe.gov.sa/books/CCBD907389931567A9A7DB4CA2CC4C27?Language=1",
    10:"https://madrasatibeta.moe.gov.sa/books/E7027E8EDF24725B41C6D294DA2AADD7?Language=1"
  };
  const tracks = [
    ["General Pathway","المسار العام"],
    ["Health and Life Pathway","مسار الصحة والحياة"],
    ["Computer Science and Engineering Pathway","مسار علوم الحاسب والهندسة"],
    ["Business Administration Pathway","مسار إدارة الأعمال"],
    ["Sharia Pathway","المسار الشرعي"]
  ];
  const trackSubjects = {
    "General Pathway":["Mathematics","Physics","Chemistry","Biology","English","Arabic Language Competencies","Islamic Studies","History","Digital Technology"],
    "Health and Life Pathway":["Mathematics","Biology","Chemistry","Physics","English","Arabic Language Competencies","Islamic Studies","Health and Fitness"],
    "Computer Science and Engineering Pathway":["Mathematics","Physics","Chemistry","Engineering","Data Science","Digital Technology","English","Arabic Language Competencies","Islamic Studies"],
    "Business Administration Pathway":["Introduction to Business","Business Decision Making","Principles of Economics","English","Arabic Language Competencies","Islamic Studies","Health and Fitness"],
    "Sharia Pathway":["Islamic Studies","Qira'at","Quran and Tafsir","Arabic Language Competencies","History","English"]
  };
  const subjectsMiddle = ["Arabic","Mathematics","Science","English","Social Studies","Digital Skills","Islamic Studies","Art Education","Life Skills and Family Education","Physical Education"];
  const subjectsFirstYear = ["Digital Technology 1","Mathematics 1","English (MEGA GOAL 1)","Biology 1","Arabic Language Competencies 1","Quran and Tafsir","Critical Thinking"];
  const arSubjects = {
    Arabic:"اللغة العربية", Mathematics:"الرياضيات", Science:"العلوم", English:"اللغة الإنجليزية",
    "Social Studies":"الدراسات الاجتماعية", "Digital Skills":"المهارات الرقمية", "Islamic Studies":"الدراسات الإسلامية",
    "Art Education":"التربية الفنية", "Life Skills and Family Education":"المهارات الحياتية والأسرية",
    "Physical Education":"التربية البدنية والدفاع عن النفس", "Critical Thinking":"التفكير الناقد",
    "Digital Technology 1":"التقنية الرقمية 1", "Mathematics 1":"الرياضيات 1", "English (MEGA GOAL 1)":"اللغة الإنجليزية (ميجا جول 1)",
    "Biology 1":"الأحياء 1", "Arabic Language Competencies 1":"الكفايات اللغوية 1", "Quran and Tafsir":"القرآن الكريم وتفسيره",
    Physics:"الفيزياء", Chemistry:"الكيمياء", Biology:"الأحياء", "Arabic Language Competencies":"الكفايات اللغوية",
    History:"التاريخ", "Digital Technology":"التقنية الرقمية", "Health and Fitness":"اللياقة والثقافة الصحية",
    Engineering:"الهندسة", "Data Science":"علم البيانات", "Introduction to Business":"مقدمة في الأعمال",
    "Business Decision Making":"صناعة القرار في الأعمال", "Principles of Economics":"مبادئ الاقتصاد", "Qira'at":"القراءات"
  };
  const isSaudi = () => $("#curriculum")?.value === "Saudi curriculum";
  const grade = () => Number($("#classSelect")?.value || 11);
  const pathway = () => $("#saudiPathwaySelect")?.value || "General Pathway";
  const subjectText = (s) => ar ? (arSubjects[s] || s) : s;
  const officialBook = () => books[grade()] || booksIndex;
  const ainPage = () => {
    const g = grade();
    if (g === 11 && pathway() === "Computer Science and Engineering Pathway") return "https://www.ientv.edu.sa/ar/node/344";
    if (g === 11 && pathway() === "Sharia Pathway") return "https://www.ientv.edu.sa/ar/node/345";
    if (g === 11 && pathway() === "Business Administration Pathway") return "https://www.ientv.edu.sa/ar/node/349";
    if (g === 12 && pathway() === "Health and Life Pathway") return "https://www.ientv.edu.sa/ar/node/347";
    if (g === 12 && pathway() === "Computer Science and Engineering Pathway") return "https://www.ientv.edu.sa/ar/node/348";
    if (g === 12 && pathway() === "Sharia Pathway") return "https://www.ientv.edu.sa/ar/node/350";
    if (g === 12 && pathway() === "Business Administration Pathway") return "https://www.ientv.edu.sa/ar/doros/high-school";
    return ain[g] || "https://www.ientv.edu.sa/ar/doros";
  };

  const oldSubjectUpdater = sshUpdateSubjectOptions;
  const oldRenderer = renderChapters;

  function setPathwayOptions() {
    const label = $("#saudiPathwayLabel"), select = $("#saudiPathwaySelect");
    if (!label || !select) return;
    const active = isSaudi() && grade() >= 10;
    label.hidden = !active;
    if (!active) return;
    const options = grade() === 10 ? [["Common First Year","السنة الأولى المشتركة"]] : tracks;
    const old = select.value;
    select.innerHTML = options.map(([v,a]) => `<option value="${v}">${ar ? a : v}</option>`).join("");
    select.disabled = grade() === 10;
    select.value = options.some(([v]) => v === old) ? old : options[0][0];
    if (label.firstChild?.nodeType === Node.TEXT_NODE) label.firstChild.textContent = ar ? "المسار الدراسي " : "Saudi secondary pathway ";
  }

  function updateSubjects() {
    if (!isSaudi()) { oldSubjectUpdater(); return; }
    const select = $("#subjectSelect");
    if (!select) return;
    let list;
    if (grade() <= 9) list = subjectsMiddle.concat(grade() === 9 ? ["Critical Thinking"] : []);
    else if (grade() === 10) list = subjectsFirstYear;
    else list = trackSubjects[pathway()] || trackSubjects["General Pathway"];
    const before = select.value;
    select.innerHTML = list.map(s => `<option value="${s}">${subjectText(s)}</option>`).join("");
    select.value = list.includes(before) ? before : list[0];
  }

  const btn = (url, label, secondary) => `<a class="btn ${secondary ? "secondary" : "primary"} small" href="${url}" target="_blank" rel="noopener noreferrer">${label} ↗</a>`;

  function videosTab() {
    const language = $("#languageSelect")?.value || "English";
    const selectedSubject = $("#subjectSelect")?.value || "";
    if (language === "Arabic") {
      const url = ainPage();
      return `<div class="revision-banner"><b>${ar ? "دروس عربية رسمية" : "Official Arabic lessons"}</b><p>${ar ? "مصادر وزارة التعليم عبر عين دروس. إذا لم يعمل المشغّل داخل الصفحة، افتح المصدر الرسمي." : "Ministry of Education lessons through Ain Doroos. Open the official page if embedded playback is blocked."}</p></div>
        <div class="video-card"><h4>${ar ? `دروس الصف ${grade()} · ${subjectText(selectedSubject)}` : `Grade ${grade()} · ${subjectText(selectedSubject)} lessons`}</h4>
        <iframe class="video-frame" src="${url}" title="Ain Doroos Grade ${grade()}" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        <p class="video-note"><a href="${url}" target="_blank" rel="noopener noreferrer">${ar ? "افتح دروس عين" : "Open Ain Doroos"}</a></p></div>`;
    }
    const aliases = {"Digital Skills":"Computer", "Digital Technology 1":"Computer Science", "Digital Technology":"Computer Science", "Mathematics 1":"Mathematics"};
    const key = aliases[selectedSubject] || selectedSubject;
    let ids = [];
    try { ids = (sshVerifiedEnglishPlaylists[String(grade())] || {})[key] || []; } catch (_) {}
    const cards = ids.map((id,i) => `<div class="video-card"><h4>${subjectText(selectedSubject)} · Playlist ${i+1}</h4><p>English-language supplementary lessons. These playlists are not verified as matching the Saudi textbook chapter order.</p><iframe class="video-frame" src="https://www.youtube-nocookie.com/embed/videoseries?list=${id}" title="English supplementary lessons" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe><p class="video-note"><a href="https://www.youtube.com/playlist?list=${id}" target="_blank" rel="noopener noreferrer">Open playlist on YouTube</a></p></div>`).join("");
    const catalogue = grade() === 12 ? "https://www.magnetbrains.com/courses/cbse-class-12th-science-stream-full-video-course/" : grade() === 11 ? "https://www.magnetbrains.com/courses/cbse-class-11th-science-stream-full-video-course/" : "https://www.magnetbrains.com/";
    return `<div class="revision-banner"><b>${ar ? "دعم مرئي باللغة الإنجليزية" : "English-language video support"}</b><p>${ar ? "الفيديوهات الإنجليزية المتاحة مساندة للمفاهيم وليست مؤكدة المطابقة لترتيب كتاب المنهج السعودي. طابق عنوان الدرس مع كتاب الوزارة." : "Available English videos are supplementary concept support, not verified as chapter-by-chapter matches to the Saudi textbook. Check each topic against your Ministry book."}</p></div>
      ${cards ? `<div class="video-grid">${cards}</div>` : `<div class="video-card"><h4>${ar ? "فهرس دروس إضافية باللغة الإنجليزية" : "Additional English course catalogue"}</h4><p>${ar ? "ابحث عن شرح إضافي ثم طابق موضوعه مع كتابك الرسمي." : "Browse extra English explanations, then match the topic to your official textbook."}</p>${btn(catalogue, ar ? "افتح فهرس الدروس" : "Open English course catalogue", true)}</div>`}`;
  }

  function practiceTab(tab) {
    const subject = subjectText($("#subjectSelect")?.value || "");
    const title = ({notes:ar?"قالب ملاحظات الفصل":"Chapter notes template", questions:ar?"أسئلة مراجعة ذاتية":"Self-check questions", midterm:ar?"مراجعة منتصف الفصل":"Midterm revision", final:ar?"مراجعة الاختبار النهائي":"Final revision", quiz:ar?"اختبار ذاتي":"Self-check quiz"})[tab] || "Study guide";
    const lines = tab === "notes"
      ? (ar ? ["اكتب عنوان الفصل وأهدافه.","سجّل المصطلحات والتعريفات من كتابك.","اكتب القوانين أو القواعد مع الوحدات والشروط.","أعد حل مثال من الكتاب دون النظر إلى الحل.","دوّن خطأً شائعاً وكيف تتجنبه."] : ["Write the chapter title and learning objectives.","Record definitions and key terms from your textbook.","List formulas or rules with units and conditions.","Redo a textbook example without looking at the solution.","Record one common mistake and how to avoid it."])
      : (ar ? ["عرّف خمسة مصطلحات أساسية من الفصل.","اشرح الفكرة الرئيسية بأسلوبك.","قارن بين مفهومين من الفصل.","حل سؤالاً من كتاب الوزارة مع توضيح الخطوات.","اذكر تطبيقاً عملياً أو سبب أهمية الفكرة."] : ["Define five key terms from the chapter.","Explain the main idea in your own words.","Compare two concepts from the chapter.","Solve one Ministry textbook question and show each step.","Give one real-world application or explain why the concept matters."]);
    return `<div class="revision-banner"><b>${title} · ${subject} · Grade ${grade()}</b><p>${ar ? "هذه أسئلة إرشادية عامة وليست بنكاً مطابقاً لفصل محدد. افتح كتابك الرسمي واختر الفصل الحالي قبل الإجابة." : "These are general study prompts, not a chapter-matched question bank. Use your current official textbook chapter before answering."}</p></div>
      <div class="notes-grid">${lines.map((line,i)=>`<div class="note"><b>${i+1}. ${ar?"تدرّب":"Practice"}</b><p>${line}</p></div>`).join("")}</div>
      <div class="scope-note">${ar ? "للأسئلة الدقيقة والإجابات الخاصة بالفصل، استخدم تمارين الكتاب المعتمد أو بنك الأسئلة في مدرستك." : "For exact chapter questions and answers, use your approved textbook exercises or your school's question bank."}<div class="official-links">${btn(officialBook(), ar?"افتح الكتاب المعتمد":"Open approved textbook")}</div></div>`;
  }

  function renderSaudi() {
    const g = grade(), selected = $("#subjectSelect")?.value || "";
    const subject = subjectText(selected);
    const textbook = officialBook(), lessonPage = ainPage();
    $(".panel-heading b").textContent = ar ? "مصادر رسمية" : "Official resources";
    $("#chapterCount").textContent = "2";
    $("#chapterList").innerHTML = `<button class="chapter-button active" data-ssh-resource="book" type="button">${ar?"الكتاب المعتمد":"Approved textbook"}</button><button class="chapter-button" data-ssh-resource="ain" type="button">${ar?"دروس عين":"Ain lessons"}</button>`;
    $("#chapterArea").innerHTML = `<div class="chapter-top"><div><span class="eyebrow">SAUDI CURRICULUM · GRADE ${g} · ${subject.toUpperCase()}</span><h2>${subject} · ${ar?`الصف ${g}`:`Grade ${g}`}</h2></div><span class="chapter-tag">${ar?"المنهج السعودي":"SAUDI CURRICULUM"}</span></div>
      <p class="chapter-desc">${ar?"اختر المادة ثم افتح الكتاب المعتمد أو دروس عين. تتغير مواد المرحلة الثانوية بحسب المسار." : "Select a subject, then open its approved textbook or Ain lessons. Secondary subjects depend on the chosen pathway."}</p>
      <div class="saudi-resource-grid"><article class="saudi-resource-card"><span class="eyebrow">${ar?"الكتاب المعتمد":"APPROVED TEXTBOOK"}</span><h3>${ar?`كتب الصف ${g}`:`Grade ${g} textbooks`}</h3><p>${ar?`افتح قائمة الكتب الرسمية واختر ${subject}.`:`Open the official textbook list and choose ${subject}.`}</p>${btn(textbook,ar?"افتح الكتب الرسمية":"Open official textbooks")}</article>
      <article class="saudi-resource-card"><span class="eyebrow">${ar?"الدروس المرئية":"LESSON VIDEOS"}</span><h3>Ain Doroos · عين دروس</h3><p>${ar?"دروس وزارة التعليم حسب الصف والمرحلة الدراسية.":"Ministry lesson resources by grade and school stage."}</p>${btn(lessonPage,ar?"افتح دروس عين":"Open Ain lessons",true)}</article></div>
      <div class="scope-note">${ar?"تختلف كتب المرحلة الثانوية بحسب المسار والفصل والمدرسة. لا تُعرض الأسئلة أو الملخصات غير المتحققة على أنها مطابقة لفصل محدد.":"Secondary textbooks vary by pathway, term and school. Unverified notes or questions are not labelled as matching a specific textbook chapter."}<div class="official-links">${btn(studyPlans,ar?"الخطط الدراسية الرسمية":"Official study plans",true)}${btn(ar?booksIndexEn:booksIndex,ar?"فهرس الكتب الإنجليزية":"Textbook catalogue",true)}</div></div>
      <div class="tabs"><button class="tab ${activeTab==="videos"?"active":""}" data-ssh-tab="videos">${ar?"▶ الفيديوهات":"▶ Videos"}</button><button class="tab ${activeTab==="notes"?"active":""}" data-ssh-tab="notes">${ar?"✎ الملاحظات":"✎ Notes"}</button><button class="tab ${activeTab==="questions"?"active":""}" data-ssh-tab="questions">${ar?"★ الأسئلة":"★ Questions"}</button><button class="tab ${activeTab==="midterm"?"active":""}" data-ssh-tab="midterm">${ar?"▤ منتصف الفصل":"▤ Midterm"}</button><button class="tab ${activeTab==="final"?"active":""}" data-ssh-tab="final">${ar?"🏁 النهائي":"🏁 Final"}</button><button class="tab ${activeTab==="quiz"?"active":""}" data-ssh-tab="quiz">${ar?"✓ اختبار":"✓ Quiz"}</button></div><div id="sshSaudiTab" class="tab-content"></div>`;
    $("#sshSaudiTab").innerHTML = activeTab === "videos" ? videosTab() : practiceTab(activeTab);
    document.querySelectorAll("[data-ssh-tab]").forEach(b=>b.addEventListener("click",()=>{activeTab=b.dataset.sshTab;renderSaudi();}));
    document.querySelectorAll("[data-ssh-resource]").forEach(b=>b.addEventListener("click",()=>window.open(b.dataset.sshResource==="ain"?lessonPage:textbook,"_blank","noopener,noreferrer")));
  }

  function renderAll() {
    setPathwayOptions();
    updateSubjects();
    if (isSaudi()) renderSaudi();
    else oldRenderer();
  }

  sshUpdateSubjectOptions = updateSubjects;
  renderChapters = renderAll;
  const curriculum = $("#curriculum"), classSelect = $("#classSelect"), subjectSelect = $("#subjectSelect"), pathwaySelect = $("#saudiPathwaySelect");
  [curriculum,classSelect,subjectSelect,pathwaySelect].forEach(el=>{if(el)el.addEventListener("change",()=>{activeChapter=0;renderAll();});});

  const style = document.createElement("style");
  style.textContent = ".saudi-resource-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin:18px 0}.saudi-resource-card{border:1px solid var(--border,#d9e0e8);border-radius:16px;padding:18px;min-width:0}.saudi-resource-card h3{margin:8px 0}.saudi-resource-card p{line-height:1.65}.official-links{display:flex;flex-wrap:wrap;gap:10px;margin-top:12px}@media(max-width:700px){.saudi-resource-grid{grid-template-columns:1fr}}";
  document.head.appendChild(style);
  renderAll();
})();
