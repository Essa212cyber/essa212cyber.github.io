/* Saudi Student Hub: working video fallbacks, starter CBSE practice, games and AI tutor UI. */
(function () {
  "use strict";
  const $ = (s, root = document) => root.querySelector(s);
  const isArabicPage = document.documentElement.lang === "ar";
  const tx = (en, ar) => isArabicPage ? ar : en;
  const videoLanguage = () => $("#languageSelect")?.value || (isArabicPage ? "Arabic" : "English");
  const gradeNow = () => Number($("#classSelect")?.value || 11);
  const subjectNow = () => $("#subjectSelect")?.value || "Science";
  const curriculumNow = () => $("#curriculum")?.value || "CBSE";
  const chapterNow = () => $("#chapterArea h2")?.textContent?.trim() || "";
  const youtubeSearch = q => "https://www.youtube.com/results?search_query=" + encodeURIComponent(q);
  const ainPages = {
    6:"https://www.ientv.edu.sa/ar/node/29", 7:"https://www.ientv.edu.sa/ar/node/30",
    8:"https://www.ientv.edu.sa/ar/node/31", 9:"https://www.ientv.edu.sa/ar/node/32",
    10:"https://www.ientv.edu.sa/ar/node/342", 11:"https://www.ientv.edu.sa/ar/node/343",
    12:"https://www.ientv.edu.sa/ar/node/346"
  };
  const safeLink = (url, label, secondary = false) =>
    '<a class="btn ' + (secondary ? "secondary" : "primary") + ' small" href="' + url + '" target="_blank" rel="noopener noreferrer">' + label + ' ↗</a>';

  const packs = {
    "6-8": {
      Science: [
        {topic:"Cells and living things",term:"Cell",termAr:"الخلية",definition:"The cell is the basic structural and functional unit of living organisms.",definitionAr:"الخلية هي الوحدة التركيبية والوظيفية الأساسية للكائنات الحية.",q:"What is the basic unit of life?",qAr:"ما الوحدة الأساسية للحياة؟",opts:["Cell","Organ","Tissue","Organ system"],optsAr:["الخلية","العضو","النسيج","الجهاز العضوي"],a:0,why:"All living organisms are made of one or more cells.",whyAr:"تتكون جميع الكائنات الحية من خلية واحدة أو أكثر.",fact:"Living organisms are made of cells.",factAr:"تتكون الكائنات الحية من خلايا.",wrong:"Living organisms are made only of rocks.",wrongAr:"تتكون الكائنات الحية من الصخور فقط."},
        {topic:"Plant nutrition",term:"Photosynthesis",termAr:"البناء الضوئي",definition:"Green plants use light energy to make food from carbon dioxide and water.",definitionAr:"تستخدم النباتات الخضراء طاقة الضوء لصنع الغذاء من الماء وثاني أكسيد الكربون.",q:"Which gas do plants take in for photosynthesis?",qAr:"أي غاز تمتصه النباتات في عملية البناء الضوئي؟",opts:["Oxygen","Carbon dioxide","Nitrogen","Hydrogen"],optsAr:["الأكسجين","ثاني أكسيد الكربون","النيتروجين","الهيدروجين"],a:1,why:"Carbon dioxide is used with water to build sugars during photosynthesis.",whyAr:"يُستخدم ثاني أكسيد الكربون مع الماء لتكوين السكريات أثناء البناء الضوئي.",fact:"Chlorophyll absorbs light energy.",factAr:"يمتص الكلوروفيل الطاقة الضوئية.",wrong:"Chlorophyll absorbs sound energy.",wrongAr:"يمتص الكلوروفيل الطاقة الصوتية."},
        {topic:"Matter and materials",term:"Matter",termAr:"المادة",definition:"Matter has mass and occupies space.",definitionAr:"المادة لها كتلة وتشغل حيزاً من الفراغ.",q:"Which state of matter has a fixed shape and fixed volume?",qAr:"أي حالة من حالات المادة لها شكل وحجم ثابتان؟",opts:["Gas","Liquid","Solid","Plasma"],optsAr:["الغاز","السائل","الصلب","البلازما"],a:2,why:"Particles in a solid stay in fixed positions and vibrate.",whyAr:"تكون جسيمات المادة الصلبة في مواضع ثابتة وتهتز حولها.",fact:"A solid has a fixed shape and volume.",factAr:"للمادة الصلبة شكل وحجم ثابتان.",wrong:"A gas has a fixed shape and volume.",wrongAr:"للغاز شكل وحجم ثابتان."},
        {topic:"Forces and motion",term:"Friction",termAr:"الاحتكاك",definition:"Friction is a force that opposes sliding or attempted sliding between surfaces.",definitionAr:"الاحتكاك قوة تعارض الانزلاق أو محاولة الانزلاق بين سطحين.",q:"What does friction usually do to the motion of sliding objects?",qAr:"ماذا تفعل قوة الاحتكاك عادة بحركة الأجسام المنزلقة؟",opts:["Opposes the motion","Creates mass","Removes gravity","Changes the object's colour"],optsAr:["تعاكس الحركة","تُنشئ كتلة","تلغي الجاذبية","تغير لون الجسم"],a:0,why:"Friction acts opposite to relative motion between surfaces.",whyAr:"تؤثر قوة الاحتكاك عكس اتجاه الحركة النسبية بين السطوح.",fact:"Friction opposes relative motion between surfaces.",factAr:"يعاكس الاحتكاك الحركة النسبية بين السطوح.",wrong:"Friction always makes objects move faster.",wrongAr:"يجعل الاحتكاك الأجسام تتحرك أسرع دائماً."}
      ],
      Mathematics: [
        {topic:"Fractions",term:"Equivalent fractions",termAr:"الكسور المتكافئة",definition:"Equivalent fractions have different numerators and denominators but represent the same value.",definitionAr:"الكسور المتكافئة لها بسط ومقام مختلفان لكنها تمثل القيمة نفسها.",q:"What is 1/2 + 1/4?",qAr:"كم يساوي 1/2 + 1/4؟",opts:["1/4","2/6","3/4","1"],optsAr:["1/4","2/6","3/4","1"],a:2,why:"Convert 1/2 to 2/4, then add 2/4 + 1/4 = 3/4.",whyAr:"حوّل 1/2 إلى 2/4 ثم اجمع 2/4 + 1/4 = 3/4.",fact:"1/2 is equal to 2/4.",factAr:"1/2 يساوي 2/4.",wrong:"1/2 is equal to 1/4.",wrongAr:"1/2 يساوي 1/4."},
        {topic:"Geometry",term:"Triangle",termAr:"المثلث",definition:"A triangle is a polygon with three sides; its interior angles add to 180 degrees.",definitionAr:"المثلث شكل هندسي له ثلاثة أضلاع ومجموع زواياه الداخلية 180 درجة.",q:"What is the sum of the interior angles of a triangle?",qAr:"ما مجموع الزوايا الداخلية للمثلث؟",opts:["90°","180°","270°","360°"],optsAr:["90°","180°","270°","360°"],a:1,why:"The three interior angles of every Euclidean triangle total 180 degrees.",whyAr:"مجموع الزوايا الداخلية لأي مثلث في الهندسة الإقليدية يساوي 180 درجة.",fact:"A triangle's interior angles add to 180 degrees.",factAr:"مجموع زوايا المثلث الداخلية 180 درجة.",wrong:"A triangle's interior angles add to 360 degrees.",wrongAr:"مجموع زوايا المثلث الداخلية 360 درجة."},
        {topic:"Ratio and proportion",term:"Ratio",termAr:"النسبة",definition:"A ratio compares two quantities using division.",definitionAr:"تقارن النسبة بين كميتين باستخدام القسمة.",q:"Simplify the ratio 6:9.",qAr:"بسّط النسبة 6:9.",opts:["2:3","3:2","1:3","6:3"],optsAr:["2:3","3:2","1:3","6:3"],a:0,why:"Divide both terms by their greatest common divisor, 3.",whyAr:"اقسم طرفي النسبة على أكبر قاسم مشترك وهو 3.",fact:"The ratio 6:9 simplifies to 2:3.",factAr:"تُبسّط النسبة 6:9 إلى 2:3.",wrong:"The ratio 6:9 simplifies to 3:2.",wrongAr:"تُبسّط النسبة 6:9 إلى 3:2."},
        {topic:"Mean and data",term:"Mean",termAr:"المتوسط الحسابي",definition:"The arithmetic mean is the sum of values divided by the number of values.",definitionAr:"المتوسط الحسابي هو مجموع القيم مقسوماً على عددها.",q:"Find the mean of 2, 4 and 6.",qAr:"أوجد المتوسط الحسابي للأعداد 2 و4 و6.",opts:["3","4","5","6"],optsAr:["3","4","5","6"],a:1,why:"(2 + 4 + 6) / 3 = 4.",whyAr:"(2 + 4 + 6) ÷ 3 = 4.",fact:"The mean of 2, 4 and 6 is 4.",factAr:"المتوسط الحسابي للأعداد 2 و4 و6 يساوي 4.",wrong:"The mean of 2, 4 and 6 is 6.",wrongAr:"المتوسط الحسابي للأعداد 2 و4 و6 يساوي 6."}
      ],
      English: [
        {topic:"Parts of speech",term:"Adjective",termAr:"الصفة",definition:"An adjective describes a noun or pronoun.",definitionAr:"الصفة كلمة تصف اسماً أو ضميراً.",q:"Which word is an adjective in 'a bright star'?",qAr:"أي كلمة صفة في عبارة 'a bright star'؟",opts:["a","bright","star","the"],optsAr:["a","bright","star","the"],a:1,why:"Bright describes the noun star.",whyAr:"كلمة bright تصف الاسم star.",fact:"An adjective describes a noun.",factAr:"تصف الصفة اسماً.",wrong:"An adjective always names an action.",wrongAr:"تسمّي الصفة فعلاً دائماً."},
        {topic:"Verb tenses",term:"Past tense",termAr:"زمن الماضي",definition:"The past tense describes an action or state that happened before now.",definitionAr:"يصف زمن الماضي حدثاً وقع قبل الوقت الحالي.",q:"Choose the correct past tense: 'She ___ to school yesterday.'",qAr:"اختر الفعل بصيغة الماضي: She ___ to school yesterday.",opts:["go","goes","went","going"],optsAr:["go","goes","went","going"],a:2,why:"Went is the past form of go.",whyAr:"Went هي صيغة الماضي من go.",fact:"Went is the past tense of go.",factAr:"Went هي صيغة الماضي للفعل go.",wrong:"Went is the present tense of go.",wrongAr:"Went هي صيغة المضارع للفعل go."},
        {topic:"Reading skills",term:"Main idea",termAr:"الفكرة الرئيسة",definition:"The main idea is the central point a paragraph or passage communicates.",definitionAr:"الفكرة الرئيسة هي المعنى الأساسي الذي تنقله الفقرة أو القطعة.",q:"What does the main idea tell a reader?",qAr:"ماذا تخبر الفكرة الرئيسة القارئ؟",opts:["The central point","Only the title","Every punctuation mark","The page number"],optsAr:["الفكرة الأساسية","العنوان فقط","كل علامات الترقيم","رقم الصفحة"],a:0,why:"Details in the passage support the main idea.",whyAr:"تدعم التفاصيل الواردة في النص الفكرة الرئيسة.",fact:"Supporting details help explain the main idea.",factAr:"تساعد التفاصيل الداعمة في شرح الفكرة الرئيسة.",wrong:"The main idea is always the page number.",wrongAr:"الفكرة الرئيسة هي دائماً رقم الصفحة."},
        {topic:"Sentence structure",term:"Complete sentence",termAr:"الجملة التامة",definition:"A complete sentence expresses a complete thought and usually contains a subject and a predicate.",definitionAr:"تعبر الجملة التامة عن فكرة مكتملة، وتتكون عادة من مبتدأ أو فاعل وخبر أو مسند.",q:"Which is a complete sentence?",qAr:"أي مما يلي جملة تامة؟",opts:["Because it was raining","The blue and green","Birds build nests.","After the lesson"],optsAr:["لأنه كان يمطر","الأزرق والأخضر","Birds build nests.","بعد الدرس"],a:2,why:"It has a subject, a verb and a complete thought.",whyAr:"تحتوي على فاعل وفعل وفكرة مكتملة.",fact:"A complete sentence expresses a complete thought.",factAr:"تعبر الجملة التامة عن فكرة مكتملة.",wrong:"A sentence fragment always expresses a complete thought.",wrongAr:"تعبر العبارة الناقصة دائماً عن فكرة مكتملة."}
      ],
      "Social Science": [
        {topic:"Maps and directions",term:"Scale",termAr:"مقياس الرسم",definition:"A map scale shows the relationship between a distance on a map and the real distance.",definitionAr:"يوضح مقياس الرسم العلاقة بين المسافة على الخريطة والمسافة الحقيقية.",q:"What does a map scale help us calculate?",qAr:"ماذا يساعدنا مقياس الرسم على حسابه؟",opts:["Real-world distance","Temperature","Population age","Rainfall colour"],optsAr:["المسافة الحقيقية","درجة الحرارة","عمر السكان","لون المطر"],a:0,why:"It converts map distances into real distances.",whyAr:"يحوّل المسافات على الخريطة إلى مسافات حقيقية.",fact:"A map scale compares map distance with real distance.",factAr:"يقارن مقياس الرسم بين مسافة الخريطة والمسافة الحقيقية.",wrong:"A map scale shows the weather forecast.",wrongAr:"يعرض مقياس الرسم توقعات الطقس."},
        {topic:"The Earth",term:"Equator",termAr:"خط الاستواء",definition:"The Equator is an imaginary line around Earth halfway between the poles.",definitionAr:"خط الاستواء خط وهمي يحيط بالأرض في منتصف المسافة بين القطبين.",q:"At which latitude is the Equator?",qAr:"عند أي دائرة عرض يقع خط الاستواء؟",opts:["0°","23.5° N","66.5° S","90°"],optsAr:["0°","23.5° شمالاً","66.5° جنوباً","90°"],a:0,why:"The Equator is the 0-degree line of latitude.",whyAr:"خط الاستواء هو دائرة العرض صفر درجة.",fact:"The Equator is at 0° latitude.",factAr:"يقع خط الاستواء عند دائرة عرض 0°.",wrong:"The Equator is at 90° latitude.",wrongAr:"يقع خط الاستواء عند دائرة عرض 90°."},
        {topic:"History and evidence",term:"Primary source",termAr:"المصدر الأولي",definition:"A primary source is evidence created during the time being studied, such as a letter or photograph.",definitionAr:"المصدر الأولي دليل أُنشئ في الزمن المدروس مثل رسالة أو صورة.",q:"Which is an example of a primary historical source?",qAr:"أي مما يلي مثال على مصدر تاريخي أولي؟",opts:["A diary written at the time","A modern textbook summary","A recent review article","A fictional story"],optsAr:["مذكرات كُتبت في ذلك الوقت","ملخص كتاب حديث","مقال مراجعة حديث","قصة خيالية"],a:0,why:"The diary was created by someone living during the events.",whyAr:"كُتبت المذكرات بواسطة شخص عاش زمن الأحداث.",fact:"A diary from the period can be a primary source.",factAr:"قد تكون المذكرات المكتوبة في الفترة نفسها مصدراً أولياً.",wrong:"A modern summary is always a primary source.",wrongAr:"يُعد الملخص الحديث دائماً مصدراً أولياً."}
      ]
    },
    "9-10": {
      Science: [
        {topic:"Atomic structure",term:"Atomic number",termAr:"العدد الذري",definition:"The atomic number is the number of protons in the nucleus of an atom.",definitionAr:"العدد الذري هو عدد البروتونات في نواة الذرة.",q:"What determines the atomic number of an element?",qAr:"ما الذي يحدد العدد الذري للعنصر؟",opts:["Number of protons","Number of neutrons only","Number of shells","Mass of the sample"],optsAr:["عدد البروتونات","عدد النيوترونات فقط","عدد الأغلفة","كتلة العينة"],a:0,why:"Each element has a unique proton number.",whyAr:"لكل عنصر عدد بروتونات مميز.",fact:"The atomic number equals the number of protons.",factAr:"يساوي العدد الذري عدد البروتونات.",wrong:"The atomic number equals the number of neutrons only.",wrongAr:"يساوي العدد الذري عدد النيوترونات فقط."},
        {topic:"Motion",term:"Acceleration",termAr:"التسارع",definition:"Acceleration is the rate of change of velocity with time.",definitionAr:"التسارع هو معدل تغير السرعة المتجهة بالنسبة للزمن.",q:"A car's velocity increases from 10 m/s to 20 m/s in 5 s. What is its acceleration?",qAr:"زادت سرعة سيارة من 10 إلى 20 م/ث خلال 5 ثوانٍ. ما تسارعها؟",opts:["1 m/s²","2 m/s²","5 m/s²","10 m/s²"],optsAr:["1 م/ث²","2 م/ث²","5 م/ث²","10 م/ث²"],a:1,why:"a = change in velocity / time = (20 - 10) / 5 = 2 m/s².",whyAr:"التسارع = التغير في السرعة ÷ الزمن = (20 - 10) ÷ 5 = 2 م/ث².",fact:"Acceleration is measured in m/s².",factAr:"تقاس وحدة التسارع بالمتر لكل ثانية مربعة.",wrong:"Acceleration is measured in kilograms.",wrongAr:"يقاس التسارع بالكيلوغرام."},
        {topic:"Cell biology",term:"Nucleus",termAr:"النواة",definition:"The nucleus contains most of the cell's genetic material and helps regulate cell activities.",definitionAr:"تحتوي النواة على معظم المادة الوراثية في الخلية وتساعد في تنظيم أنشطتها.",q:"Which cell structure contains most genetic material in a typical animal cell?",qAr:"أي تركيب خلوي يحتوي على معظم المادة الوراثية في الخلية الحيوانية المعتادة؟",opts:["Nucleus","Cell wall","Vacuole","Ribosome"],optsAr:["النواة","الجدار الخلوي","الفجوة","الريبوسوم"],a:0,why:"Most DNA in a typical animal cell is in the nucleus.",whyAr:"يوجد معظم الحمض النووي في الخلية الحيوانية المعتادة داخل النواة.",fact:"The nucleus contains most cellular DNA.",factAr:"تحتوي النواة على معظم الحمض النووي الخلوي.",wrong:"The nucleus is the site of photosynthesis in animal cells.",wrongAr:"النواة هي موقع البناء الضوئي في الخلايا الحيوانية."},
        {topic:"Chemical reactions",term:"Balanced equation",termAr:"المعادلة الموزونة",definition:"A balanced chemical equation has the same number of each type of atom on both sides.",definitionAr:"تحتوي المعادلة الكيميائية الموزونة على العدد نفسه من كل نوع من الذرات في طرفي المعادلة.",q:"Why must a chemical equation be balanced?",qAr:"لماذا يجب موازنة المعادلة الكيميائية؟",opts:["To conserve atoms","To change the elements","To remove products","To make the reaction faster"],optsAr:["للحفاظ على عدد الذرات","لتغيير العناصر","لحذف النواتج","لتسريع التفاعل"],a:0,why:"Atoms are rearranged in a chemical reaction; they are not created or destroyed.",whyAr:"يعاد ترتيب الذرات في التفاعل الكيميائي ولا تُخلق أو تفنى.",fact:"Chemical equations are balanced to conserve atoms.",factAr:"تُوازن المعادلات الكيميائية للحفاظ على عدد الذرات.",wrong:"Balancing an equation creates new atoms.",wrongAr:"تؤدي موازنة المعادلة إلى إنشاء ذرات جديدة."}
      ],
      Mathematics: [
        {topic:"Linear equations",term:"Linear equation",termAr:"المعادلة الخطية",definition:"A linear equation has variables of degree one and graphs as a straight line.",definitionAr:"المعادلة الخطية معادلة أعلى درجة للمتغير فيها واحد، وتمثل بيانياً بخط مستقيم.",q:"Solve: 3x + 5 = 20.",qAr:"حل المعادلة: 3x + 5 = 20.",opts:["x = 3","x = 5","x = 7","x = 15"],optsAr:["x = 3","x = 5","x = 7","x = 15"],a:1,why:"Subtract 5: 3x = 15. Divide by 3: x = 5.",whyAr:"اطرح 5: يصبح 3x = 15. اقسم على 3: x = 5.",fact:"The solution of 3x + 5 = 20 is x = 5.",factAr:"حل المعادلة 3x + 5 = 20 هو x = 5.",wrong:"The solution of 3x + 5 = 20 is x = 3.",wrongAr:"حل المعادلة 3x + 5 = 20 هو x = 3."},
        {topic:"Quadratic equations",term:"Discriminant",termAr:"المميز",definition:"For ax² + bx + c = 0, the discriminant is b² − 4ac.",definitionAr:"في المعادلة ax² + bx + c = 0 يكون المميز b² − 4ac.",q:"What is the discriminant of x² − 5x + 6 = 0?",qAr:"ما قيمة المميز للمعادلة x² − 5x + 6 = 0؟",opts:["1","5","25","49"],optsAr:["1","5","25","49"],a:0,why:"D = b² − 4ac = 25 − 24 = 1.",whyAr:"المميز = b² − 4ac = 25 − 24 = 1.",fact:"The discriminant is b² − 4ac.",factAr:"المميز يساوي b² − 4ac.",wrong:"The discriminant is b² + 4ac.",wrongAr:"المميز يساوي b² + 4ac."},
        {topic:"Geometry",term:"Pythagorean theorem",termAr:"نظرية فيثاغورس",definition:"In a right triangle, the square of the hypotenuse equals the sum of the squares of the other two sides.",definitionAr:"في المثلث القائم، مربع الوتر يساوي مجموع مربعي الضلعين الآخرين.",q:"A right triangle has legs 3 and 4. What is its hypotenuse?",qAr:"مثلث قائم ضلعا قائمته 3 و4. ما طول الوتر؟",opts:["5","6","7","8"],optsAr:["5","6","7","8"],a:0,why:"c² = 3² + 4² = 25, so c = 5.",whyAr:"c² = 3² + 4² = 25، إذن c = 5.",fact:"A 3-4-5 triangle is a right triangle.",factAr:"المثلث ذو الأضلاع 3 و4 و5 مثلث قائم.",wrong:"A 3-4-6 triangle is always right-angled.",wrongAr:"المثلث ذو الأضلاع 3 و4 و6 قائم دائماً."}
      ],
      English: [
        {topic:"Grammar and clauses",term:"Independent clause",termAr:"الجملة المستقلة",definition:"An independent clause contains a subject and a verb and expresses a complete thought.",definitionAr:"تحتوي الجملة المستقلة على فاعل وفعل وتعبر عن فكرة مكتملة.",q:"Which is an independent clause?",qAr:"أي مما يلي جملة مستقلة؟",opts:["Although it rained","When the bell rang","The students revised.","Because I was late"],optsAr:["رغم هطول المطر","عندما رن الجرس","The students revised.","لأنني تأخرت"],a:2,why:"It expresses a complete thought and can stand alone.",whyAr:"تعبر عن فكرة مكتملة ويمكن أن تأتي وحدها.",fact:"An independent clause can stand alone as a sentence.",factAr:"يمكن للجملة المستقلة أن تأتي وحدها لتكوّن جملة تامة.",wrong:"A dependent clause always expresses a complete thought.",wrongAr:"تعبر الجملة التابعة دائماً عن فكرة مكتملة."}
      ],
      "Social Science": [
        {topic:"Democracy",term:"Democracy",termAr:"الديمقراطية",definition:"Democracy is a system in which people participate in choosing or influencing their government.",definitionAr:"الديمقراطية نظام يشارك فيه الناس في اختيار الحكومة أو التأثير فيها.",q:"Which is an important feature of democracy?",qAr:"ما إحدى السمات المهمة للديمقراطية؟",opts:["Public participation","No elections","Rule by one person without accountability","No rights"],optsAr:["مشاركة المواطنين","عدم وجود انتخابات","حكم شخص واحد دون مساءلة","عدم وجود حقوق"],a:0,why:"Democratic systems include participation, representation and accountability.",whyAr:"تتضمن الأنظمة الديمقراطية المشاركة والتمثيل والمساءلة.",fact:"Citizen participation is important in a democracy.",factAr:"مشاركة المواطنين مهمة في الديمقراطية.",wrong:"Democracy means citizens never participate.",wrongAr:"تعني الديمقراطية أن المواطنين لا يشاركون أبداً."}
      ]
    },
    "11-12": {
      Biology: [
        {topic:"Cell biology",term:"Mitochondrion",termAr:"الميتوكوندريا",definition:"Mitochondria are organelles where most aerobic ATP production occurs in eukaryotic cells.",definitionAr:"الميتوكوندريا عضيات يحدث فيها معظم إنتاج ATP الهوائي في الخلايا حقيقية النواة.",q:"Which organelle is the main site of aerobic ATP production?",qAr:"أي عضية تعد الموقع الرئيس لإنتاج ATP الهوائي؟",opts:["Mitochondrion","Golgi apparatus","Lysosome","Nucleolus"],optsAr:["الميتوكوندريا","جهاز جولجي","الجسيم الحال","النوية"],a:0,why:"The electron transport chain and ATP synthase are located in the inner mitochondrial membrane.",whyAr:"توجد سلسلة نقل الإلكترون وإنزيم تصنيع ATP في الغشاء الداخلي للميتوكوندريا.",fact:"Mitochondria are a major site of aerobic ATP production.",factAr:"الميتوكوندريا موقع رئيس لإنتاج ATP الهوائي.",wrong:"The Golgi apparatus is the main site of aerobic ATP production.",wrongAr:"جهاز جولجي هو الموقع الرئيس لإنتاج ATP الهوائي."},
        {topic:"Genetics",term:"Gene",termAr:"الجين",definition:"A gene is a unit of heredity, usually a DNA sequence that contributes to a functional product.",definitionAr:"الجين وحدة وراثية، وهو غالباً تسلسل من DNA يساهم في إنتاج ناتج وظيفي.",q:"What is a gene primarily made of in most organisms?",qAr:"مم يتكون الجين أساساً في معظم الكائنات الحية؟",opts:["DNA","Starch","Cellulose","Triglyceride"],optsAr:["DNA","النشا","السليلوز","الدهون الثلاثية"],a:0,why:"Genes are DNA sequences (with some viruses using RNA genomes).",whyAr:"الجينات تسلسلات من DNA، مع وجود بعض الفيروسات ذات المادة الوراثية RNA.",fact:"Genes are hereditary information units.",factAr:"الجينات وحدات تحمل المعلومات الوراثية.",wrong:"Genes are made of starch.",wrongAr:"تتكون الجينات من النشا."},
        {topic:"Plant physiology",term:"Calvin cycle",termAr:"دورة كالفن",definition:"The Calvin cycle fixes carbon dioxide in the chloroplast stroma using products of the light reactions.",definitionAr:"تثبت دورة كالفن ثاني أكسيد الكربون في حشوة البلاستيدة الخضراء باستخدام نواتج التفاعلات الضوئية.",q:"Where does the Calvin cycle occur?",qAr:"أين تحدث دورة كالفن؟",opts:["Chloroplast stroma","Thylakoid lumen","Mitochondrial matrix","Cytosol only"],optsAr:["حشوة البلاستيدة الخضراء","تجويف الثايلاكويد","حشوة الميتوكوندريا","السيتوسول فقط"],a:0,why:"The enzymes for carbon fixation are located in the stroma.",whyAr:"توجد إنزيمات تثبيت الكربون في الحشوة.",fact:"The Calvin cycle occurs in the chloroplast stroma.",factAr:"تحدث دورة كالفن في حشوة البلاستيدة الخضراء.",wrong:"The Calvin cycle occurs in the nucleus.",wrongAr:"تحدث دورة كالفن في النواة."}
      ],
      Chemistry: [
        {topic:"The mole concept",term:"Mole",termAr:"المول",definition:"One mole contains exactly 6.02214076 × 10²³ specified elementary entities.",definitionAr:"يحتوي مول واحد على 6.02214076 × 10²³ من الكيانات الأولية المحددة.",q:"How many entities are in one mole?",qAr:"كم عدد الكيانات في مول واحد؟",opts:["6.022 × 10²³","3.00 × 10⁸","9.81","1.60 × 10⁻¹⁹"],optsAr:["6.022 × 10²³","3.00 × 10⁸","9.81","1.60 × 10⁻¹⁹"],a:0,why:"This value is the Avogadro constant.",whyAr:"هذه القيمة هي ثابت أفوجادرو.",fact:"One mole contains the Avogadro number of entities.",factAr:"يحتوي المول على عدد أفوجادرو من الكيانات.",wrong:"One mole contains 100 entities.",wrongAr:"يحتوي المول على 100 كيان."},
        {topic:"Atomic structure",term:"Quantum number",termAr:"عدد الكم",definition:"Quantum numbers describe properties of an electron state in an atom.",definitionAr:"تصف أعداد الكم خصائص حالة الإلكترون في الذرة.",q:"How many orbitals are in a p subshell?",qAr:"كم عدد الأوربيتالات في المستوى الفرعي p؟",opts:["1","2","3","5"],optsAr:["1","2","3","5"],a:2,why:"A p subshell has three orbitals corresponding to mℓ = −1, 0, +1.",whyAr:"يحتوي المستوى الفرعي p على ثلاثة أوربيتالات تقابل mℓ = −1 و0 و+1.",fact:"A p subshell contains three orbitals.",factAr:"يحتوي المستوى الفرعي p على ثلاثة أوربيتالات.",wrong:"A p subshell contains five orbitals.",wrongAr:"يحتوي المستوى الفرعي p على خمسة أوربيتالات."},
        {topic:"Chemical bonding",term:"Covalent bond",termAr:"الرابطة التساهمية",definition:"A covalent bond forms when atoms share one or more pairs of electrons.",definitionAr:"تتكون الرابطة التساهمية عندما تتشارك الذرات زوجاً أو أكثر من الإلكترونات.",q:"What happens in a covalent bond?",qAr:"ماذا يحدث في الرابطة التساهمية؟",opts:["Electron pairs are shared","Protons are shared","The nucleus disappears","Atoms lose all electrons"],optsAr:["تتشارك الذرات أزواج الإلكترونات","تتشارك البروتونات","تختفي النواة","تفقد الذرات كل الإلكترونات"],a:0,why:"Sharing electron pairs helps atoms achieve more stable valence configurations.",whyAr:"يساعد تشارك أزواج الإلكترونات الذرات على الوصول إلى ترتيب تكافؤ أكثر استقراراً.",fact:"Covalent bonds involve shared electron pairs.",factAr:"تتضمن الروابط التساهمية أزواج إلكترونات مشتركة.",wrong:"Covalent bonds involve shared nuclei.",wrongAr:"تتضمن الروابط التساهمية أنوية مشتركة."}
      ],
      Physics: [
        {topic:"Newton's laws",term:"Newton's second law",termAr:"قانون نيوتن الثاني",definition:"The net force on an object equals its mass multiplied by its acceleration: F = ma.",definitionAr:"تساوي محصلة القوة المؤثرة في جسم كتلته مضروبة في تسارعه: F = ma.",q:"What force accelerates a 2 kg object at 3 m/s²?",qAr:"ما القوة التي تكسب جسماً كتلته 2 كغ تسارعاً مقداره 3 م/ث²؟",opts:["1.5 N","5 N","6 N","9 N"],optsAr:["1.5 نيوتن","5 نيوتن","6 نيوتن","9 نيوتن"],a:2,why:"F = ma = 2 × 3 = 6 N.",whyAr:"القوة = الكتلة × التسارع = 2 × 3 = 6 نيوتن.",fact:"Newton's second law is F = ma.",factAr:"قانون نيوتن الثاني هو F = ma.",wrong:"Newton's second law is F = m/a.",wrongAr:"قانون نيوتن الثاني هو F = m/a."},
        {topic:"Energy",term:"Kinetic energy",termAr:"الطاقة الحركية",definition:"Kinetic energy is the energy an object has because of its motion: KE = ½mv².",definitionAr:"الطاقة الحركية هي الطاقة التي يمتلكها الجسم بسبب حركته: KE = ½mv².",q:"If speed doubles, by what factor does kinetic energy change?",qAr:"إذا تضاعفت السرعة، فبأي معامل تتغير الطاقة الحركية؟",opts:["2","3","4","8"],optsAr:["2","3","4","8"],a:2,why:"Kinetic energy is proportional to the square of speed.",whyAr:"تتناسب الطاقة الحركية مع مربع السرعة.",fact:"Doubling speed makes kinetic energy four times as large.",factAr:"مضاعفة السرعة تجعل الطاقة الحركية أربعة أضعاف.",wrong:"Doubling speed leaves kinetic energy unchanged.",wrongAr:"مضاعفة السرعة لا تغير الطاقة الحركية."},
        {topic:"Waves",term:"Wavelength",termAr:"الطول الموجي",definition:"Wavelength is the distance between two successive points in the same phase.",definitionAr:"الطول الموجي هو المسافة بين نقطتين متتاليتين لهما الطور نفسه.",q:"What is the SI unit of wavelength?",qAr:"ما وحدة الطول الموجي في النظام الدولي؟",opts:["Second","Metre","Hertz","Newton"],optsAr:["الثانية","المتر","الهرتز","النيوتن"],a:1,why:"Wavelength is a length, so its SI unit is the metre.",whyAr:"الطول الموجي كمية طول، لذا وحدته الدولية المتر.",fact:"Wavelength is measured in metres in SI.",factAr:"يقاس الطول الموجي بالمتر في النظام الدولي.",wrong:"Wavelength is measured in seconds.",wrongAr:"يقاس الطول الموجي بالثواني."}
      ],
      Mathematics: [
        {topic:"Differentiation",term:"Derivative",termAr:"المشتقة",definition:"A derivative measures the instantaneous rate of change of a function.",definitionAr:"تقيس المشتقة معدل التغير اللحظي للدالة.",q:"What is the derivative of x² with respect to x?",qAr:"ما مشتقة x² بالنسبة إلى x؟",opts:["x","2x","x³","2"],optsAr:["x","2x","x³","2"],a:1,why:"Apply the power rule: d(xⁿ)/dx = n xⁿ⁻¹.",whyAr:"طبّق قاعدة القوة: مشتقة xⁿ تساوي n xⁿ⁻¹.",fact:"The derivative of x² is 2x.",factAr:"مشتقة x² تساوي 2x.",wrong:"The derivative of x² is x³.",wrongAr:"مشتقة x² تساوي x³."}
      ],
      English: [
        {topic:"Academic writing",term:"Thesis statement",termAr:"جملة الأطروحة",definition:"A thesis statement presents the main claim or central argument of an essay.",definitionAr:"تعرض جملة الأطروحة الادعاء الرئيس أو الحجة المركزية للمقال.",q:"What is the main purpose of a thesis statement?",qAr:"ما الغرض الرئيس من جملة الأطروحة؟",opts:["Present the central argument","List every source","Repeat the title only","End the essay"],optsAr:["عرض الحجة الرئيسة","سرد كل المصادر","تكرار العنوان فقط","إنهاء المقال"],a:0,why:"It guides the reader and gives the essay a clear focus.",whyAr:"توجه القارئ وتمنح المقال تركيزاً واضحاً.",fact:"A thesis statement communicates an essay's main argument.",factAr:"تنقل جملة الأطروحة الحجة الرئيسة للمقال.",wrong:"A thesis statement is always the final sentence of an essay.",wrongAr:"تكون جملة الأطروحة دائماً آخر جملة في المقال."}
      ]
    }
  };

  const generalStudyPack = [
    {topic:"Check the course plan",term:"Prescribed textbook",termAr:"الكتاب المقرر",definition:"The current textbook and teacher's course plan identify the topics and depth required for your class.",definitionAr:"يحدد الكتاب الحالي وخطة المعلم الموضوعات والتفاصيل المطلوبة لصفك.",q:"Which source should confirm the exact chapters for your current class?",qAr:"ما المصدر الذي يؤكد الفصول المطلوبة لصفك الحالي؟",opts:["The current prescribed textbook and school plan","A random online video","An old syllabus from another year","A social media comment"],optsAr:["الكتاب المقرر الحالي وخطة المدرسة","فيديو عشوائي على الإنترنت","منهج قديم من سنة أخرى","تعليق في وسائل التواصل"],a:0,why:"Schools can use different editions and subject combinations, so check the current prescribed materials.",whyAr:"قد تستخدم المدارس إصدارات ومجموعات مواد مختلفة، لذلك تحقق من المواد المقررة حالياً.",fact:"The current textbook is the best reference for exact chapter order.",factAr:"الكتاب الحالي هو المرجع الأفضل لمعرفة ترتيب الفصول بدقة.",wrong:"An old syllabus always matches every current class.",wrongAr:"يتطابق المنهج القديم دائماً مع كل صف حالي."},
    {topic:"Build a revision plan",term:"Active recall",termAr:"الاسترجاع النشط",definition:"Active recall means trying to remember an idea before checking your notes.",definitionAr:"يعني الاسترجاع النشط محاولة تذكر الفكرة قبل مراجعة الملاحظات.",q:"Which action is an example of active recall?",qAr:"أي فعل يُعد مثالاً على الاسترجاع النشط؟",opts:["Close the book and explain the idea from memory","Read the same paragraph without a pause","Copy a page without thinking","Highlight every sentence"],optsAr:["أغلق الكتاب واشرح الفكرة من الذاكرة","اقرأ الفقرة نفسها دون توقف","انسخ صفحة دون تفكير","ظلّل كل الجمل"],a:0,why:"Retrieving information strengthens learning and shows what needs more revision.",whyAr:"يساعد استرجاع المعلومات على ترسيخ التعلم ويكشف ما يحتاج إلى مراجعة.",fact:"Active recall involves retrieving information from memory.",factAr:"يتضمن الاسترجاع النشط استعادة المعلومات من الذاكرة.",wrong:"Active recall means copying notes word for word.",wrongAr:"يعني الاسترجاع النشط نسخ الملاحظات حرفياً."}
  ];
  function choosePack() {
    const g = gradeNow();
    const band = g <= 8 ? "6-8" : g <= 10 ? "9-10" : "11-12";
    const source = packs[band] || packs["6-8"];
    const subject = subjectNow();
    return source[subject] || generalStudyPack;
  }

  function renderVideoResources(chapterTitle, detailed = false) {
    const g = gradeNow(), subject = subjectNow(), language = videoLanguage();
    if (language === "Arabic") {
      const query = "CBSE class " + g + " " + subject + " " + chapterTitle + " شرح عربي";
      const resultsUrl = youtubeSearch(query);
      const officialUrl = ainPages[g] || "https://www.ientv.edu.sa/ar/doros";
      let known = [];
      if (detailed && g === 11 && subject === "Chemistry" && typeof chemistry !== "undefined") {
        known = (chemistry[activeChapter]?.ar || []).filter(v => v && v[2]).map(v => ({ title:v[0], desc:v[1], id:v[2] }));
      }
      if (detailed && g === 11 && subject === "Biology" && activeChapter === 10) {
        known = [
          {title:"التفاعلات الضوئية · Light reactions",desc:"شرح عربي للتفاعلات الضوئية",id:"gVux2PiSKWE"},
          {title:"حلقة كالفن · Calvin cycle",desc:"شرح عربي لحلقة كالفن",id:"R6zbVz4h4yM"}
        ];
      }
      // Embed verified individual clips for the detailed Class 11 topics.
      // The other national-curriculum clips below are explicitly labelled as concept support.
      const supplementalArabicVideos = {
        "6": { Science: [{title:"شرح علوم الصف السادس · Grade 6 Science",desc:"Arabic-language concept lesson. Check it against your CBSE chapter.",id:"bFqlvj4QkZI",curriculum:"Supplementary · different national syllabus"}] },
        "7": { Science: [{title:"شرح العلوم للصف السابع · Grade 7 Science",desc:"Arabic-language concept introduction. Check it against your CBSE chapter.",id:"nZA3OJkxa_g",curriculum:"Supplementary · different national syllabus"}] },
        "8": { Science: [{title:"CBSE Arabic · Class 8 · Chapter 6",desc:"Arabic-language Chapter 6 explanation.",id:"Bar5_B2CYjk",curriculum:"CBSE-labelled source"}] },
        "10": { Biology: [{title:"الأحياء · الصف العاشر · تطور الكائنات الحية",desc:"Arabic Biology explanation from Wated; not verified as CBSE-aligned.",id:"A5bcpHhKwXM",curriculum:"Supplementary · Jordanian syllabus"}] },
        "12": { Chemistry: [{title:"شرح الكيمياء · الصف الثاني عشر",desc:"Arabic Chemistry revision; the publisher identifies it as Kuwaiti curriculum, not CBSE.",id:"YwvXb9Hx77U",curriculum:"Supplementary · Kuwaiti syllabus"}] }
      };
      if (!known.length && supplementalArabicVideos[String(g)]?.[subject]) {
        known = supplementalArabicVideos[String(g)][subject];
      }

      let arabicPlaylist = "";
      try {
        arabicPlaylist = (typeof sshArabicGradePlaylists !== "undefined" && sshArabicGradePlaylists[String(g)]) || "";
      } catch (_) {}
      const knownMarkup = known.map(v =>
        '<article class="video-card"><h4>' + v.title + '</h4><p>' + v.desc + '</p><iframe class="video-frame" src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(v.id) + '" title="' + v.title.replace(/"/g,"&quot;") + '" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe><p class="video-note">' + (v.curriculum ? v.curriculum + ' · ' : '') + safeLink("https://www.youtube.com/watch?v=" + encodeURIComponent(v.id), tx("Open on YouTube","افتح على يوتيوب"),true) + '</p></article>'
      ).join("");
      const playlistMarkup = arabicPlaylist
        ? '<article class="video-card"><h4>' + tx("Arabic grade playlist · Ain Doroos","قائمة دروس الصف بالعربية · عين دروس") + '</h4><p>' + tx("Official Saudi school lesson playlist. This is supplementary for CBSE and may follow a different syllabus.","قائمة دروس مدرسية سعودية رسمية. وهي مصدر مساعد لطلاب CBSE وقد تتبع منهجاً مختلفاً.") + '</p><iframe class="video-frame" src="https://www.youtube-nocookie.com/embed/videoseries?list=' + encodeURIComponent(arabicPlaylist) + '" title="Ain Doroos Arabic grade ' + g + ' playlist" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe><p class="video-note">' + safeLink("https://www.youtube.com/playlist?list=" + encodeURIComponent(arabicPlaylist),tx("Open playlist on YouTube","افتح قائمة التشغيل على يوتيوب"),true) + '</p></article>'
        : "";
      return '<div class="revision-banner"><b>' + tx("Arabic video resources","مصادر الفيديو باللغة العربية") + '</b><p>' +
        tx("Available clips and playlists now appear in the player below. Where no chapter-matched Arabic clip has been verified, use the topic search. Arabic lessons from another country's curriculum are labelled as supplementary, not CBSE syllabus lessons.","تظهر المقاطع وقوائم التشغيل المتاحة داخل المشغّل أدناه. عند عدم توفر شرح عربي مطابق للفصل، استخدم البحث عن الموضوع. وتُوسم دروس المناهج الأخرى بأنها مواد مساندة وليست دروساً مطابقة لمنهج CBSE.") +
        '</p></div>' +
        ((knownMarkup || playlistMarkup) ? '<div class="video-grid">' + knownMarkup + playlistMarkup + '</div>' : '') +
        '<div class="video-grid">' +
        '<article class="video-card"><h4>' + tx("Search this CBSE topic in Arabic","ابحث عن هذا الموضوع من CBSE بالعربية") + '</h4><p>' + tx("Use the exact topic name and check the lesson against your textbook.","استخدم اسم الموضوع بدقة وطابق الدرس مع كتابك المدرسي.") + '</p>' + safeLink(resultsUrl,tx("Find Arabic videos","ابحث عن فيديوهات عربية")) + '</article>' +
        '<article class="video-card"><h4>Ain Doroos · عين دروس</h4><p>' + tx("Official Saudi Ministry lesson pages open separately because their website blocks reliable embedding.","تُفتح صفحات دروس وزارة التعليم السعودية بشكل منفصل لأن الموقع لا يسمح بالتضمين بشكل موثوق.") + '</p>' + safeLink(officialUrl,tx("Open official grade lessons","افتح دروس الصف الرسمية"),true) + '</article>' +
        '</div>';
    }

    let ids = [];
    try {
      const map = sshVerifiedEnglishPlaylists[String(g)] || {};
      ids = map[subject] || [];
      if (subject === "Science" && g === 9) ids = [...(map.Physics||[]),...(map.Biology||[]),...(map.Chemistry||[])];
      if (subject === "Science" && g === 10) ids = [...(map.Physics||[]),...(map.Chemistry||[]),...(map.Biology||[])];
      if (subject === "Science" && g === 11) ids = [...(map.Physics||[]),...(map.Biology||[]),...(map.Chemistry||[])];
      if (subject === "Computer Science" && map["Computer Science"]) ids = map["Computer Science"];
    } catch (_) {}
    const queryUrl = youtubeSearch("CBSE Class " + g + " " + subject + " " + chapterTitle + " English lesson");
    if (ids.length) {
      const unique = [...new Set(ids)];
      return '<div class="revision-banner"><b>' + tx("English video playlists","قوائم الفيديو باللغة الإنجليزية") + '</b><p>' +
        tx("Embedded playlists are available where a publisher playlist has already been added. If a player is blocked on your device, use its YouTube link.","تتوفر قوائم تشغيل مضمّنة عندما تكون قائمة الناشر قد أُضيفت. إذا تعذر تشغيل المشغّل على جهازك، استخدم رابط يوتيوب.") +
        '</p></div><div class="video-grid">' + unique.map((id,i) =>
          '<article class="video-card"><h4>' + subject + ' · ' + tx("Playlist ","قائمة التشغيل ") + (i+1) + '</h4>' +
          '<iframe class="video-frame" src="https://www.youtube-nocookie.com/embed/videoseries?list=' + encodeURIComponent(id) + '" title="CBSE Grade ' + g + ' ' + subject + ' English playlist" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>' +
          safeLink("https://www.youtube.com/playlist?list=" + encodeURIComponent(id),tx("Open playlist on YouTube","افتح قائمة التشغيل على يوتيوب"),true) +
          '</article>').join("") + '</div>' +
          '<p class="video-note">' + safeLink(queryUrl,tx("Find a particular chapter","ابحث عن فصل محدد"),true) + '</p>';
    }
    return '<div class="revision-banner"><b>' + tx("English video resources","مصادر الفيديو باللغة الإنجليزية") + '</b><p>' +
      tx("No verified embedded playlist is mapped to this exact grade and subject yet. Use the topic search below rather than an unrelated video.","لم يتم ربط قائمة تشغيل مضمّنة ومتحقق منها بهذا الصف والمادة حتى الآن. استخدم البحث عن الموضوع أدناه بدلاً من فيديو غير متعلق.") +
      '</p></div><article class="video-card"><h4>CBSE · Grade ' + g + ' · ' + subject + '</h4>' +
      safeLink(queryUrl,tx("Find English lessons on YouTube","ابحث عن دروس إنجليزية على يوتيوب")) + '</article>';
  }

  function questionMarkup(bank, title) {
    return '<div class="question-bank-head"><div><h3>' + title + '</h3><p>' +
      tx("Starter practice set · answer each question before revealing the explanation.","مجموعة تدريب أولية · أجب عن كل سؤال قبل إظهار الشرح.") +
      '</p></div></div><div class="question-list">' + bank.map((item,i) =>
      '<article class="question"><div class="question-meta">' + tx("PRACTICE","تدريب") + ' · ' + (i+1) + '</div><h4>' + (isArabicPage?item.qAr:item.q) + '</h4>' +
      '<ol>' + (isArabicPage?item.optsAr:item.opts).map((option,j)=>'<li>' + String.fromCharCode(65+j) + '. ' + option + '</li>').join("") + '</ol>' +
      '<button class="reveal" type="button" data-show-answer="' + i + '">' + tx("Show answer and explanation","أظهر الإجابة والشرح") + '</button>' +
      '<div class="answer" data-answer="' + i + '">' + (isArabicPage?item.optsAr[item.a]:item.opts[item.a]) + ' — ' + (isArabicPage?item.whyAr:item.why) + '</div></article>'
    ).join("") + '</div>';
  }

  function renderGenericCbse() {
    const bank = choosePack();
    if (!bank || !bank.length) return;
    const g = gradeNow(), subject = subjectNow(), topic = bank[Math.min(activeChapter,bank.length-1)] || bank[0];
    const title = isArabicPage ? subject : subject;
    const tabLabels = {
      videos:tx("▶ Videos","▶ الفيديوهات"),notes:tx("✎ Notes","✎ الملاحظات"),
      questions:tx("★ Questions","★ الأسئلة"),midterm:tx("▤ Midterm","▤ منتصف الفصل"),
      final:tx("🏁 Final revision","🏁 مراجعة النهائي"),quiz:tx("✓ Quick quiz","✓ اختبار سريع")
    };
    $("#chapterCount").textContent = String(bank.length).padStart(2,"0");
    $(".panel-heading b").textContent = tx("Topics","الموضوعات");
    $("#chapterList").innerHTML = bank.map((item,i) =>
      '<button type="button" class="chapter-button ' + (i===activeChapter?"active":"") + '" data-starter-topic="' + i + '">' +
      String(i+1).padStart(2,"0") + ' · ' + (isArabicPage?item.topic:item.topic) + '</button>'
    ).join("");
    const coverageNote = bank === generalStudyPack
      ? tx("A subject-specific practice set for this selection is still being prepared. These general study-skill prompts are not subject questions.","يجري إعداد بنك أسئلة خاص بهذه المادة. هذه إرشادات عامة للمذاكرة وليست أسئلة خاصة بالمادة.")
      : tx("This is a starter learning set with sample topics and practice questions, not a complete chapter-by-chapter syllabus. Match every topic with your current NCERT/CBSE textbook and school plan.","هذه مكتبة تعليمية أولية تتضمن موضوعات وأسئلة تدريبية، وليست منهجاً كاملاً مرتباً حسب الفصول. طابق كل موضوع مع كتاب NCERT/CBSE وخطة مدرستك الحالية.");
    $("#chapterArea").innerHTML =
      '<div class="chapter-top"><div><span class="eyebrow">CBSE · GRADE ' + g + ' · ' + subject.toUpperCase() + '</span><h2>' + title + ' · ' + tx("Grade ","الصف ") + g + '</h2></div><span class="chapter-tag">' + tx("STARTER LIBRARY","مكتبة أولية") + '</span></div>' +
      '<p class="chapter-desc">' + coverageNote + '</p>' +
      '<div class="official-links">' + safeLink(g >= 9 ? "https://cbseacademic.nic.in/curriculum_2027.html" : "https://epathshala.nic.in/",g >= 9 ? tx("Official CBSE 2026–27 curriculum","منهج CBSE الرسمي 2026–27") : tx("Official NCERT ePathshala","بوابة NCERT ePathshala"),true) + safeLink("https://epathshala.nic.in/",tx("NCERT learning resources","مصادر NCERT التعليمية"),true) + '</div>' +
      '<div class="tabs">' + Object.keys(tabLabels).map(id=>'<button class="tab ' + (activeTab===id?"active":"") + '" type="button" data-starter-tab="' + id + '">' + tabLabels[id] + '</button>').join("") + '</div><div class="tab-content" id="starterTabContent"></div>';
    $("#chapterList").querySelectorAll("[data-starter-topic]").forEach(b=>b.addEventListener("click",()=>{activeChapter=Number(b.dataset.starterTopic);renderGenericCbse();}));
    $("#chapterArea").querySelectorAll("[data-starter-tab]").forEach(b=>b.addEventListener("click",()=>{activeTab=b.dataset.starterTab;renderGenericCbse();}));
    const target = $("#starterTabContent");
    if (activeTab === "videos") {
      target.innerHTML = renderVideoResources(topic.topic,false);
    } else if (activeTab === "notes") {
      target.innerHTML = '<div class="notes-grid"><article class="note"><b>' + (isArabicPage?topic.termAr:topic.term) + '</b><p>' + (isArabicPage?topic.definitionAr:topic.definition) + '</p></article><article class="note"><b>' + tx("Key learning point","الفكرة الأساسية") + '</b><p>' + (isArabicPage?topic.whyAr:topic.why) + '</p></article></div>' +
        '<div class="scope-note">' + tx("These notes are introductory support. Your textbook is the authority for your school's exact chapter and required detail.","هذه الملاحظات دعم تمهيدي. كتابك المدرسي هو المرجع لتفاصيل الفصل المطلوبة في مدرستك.") + '</div>';
    } else if (activeTab === "questions" || activeTab === "midterm" || activeTab === "final") {
      const label = activeTab==="midterm"?tx("Midterm practice set","تدريب منتصف الفصل"):activeTab==="final"?tx("Final revision practice","تدريب مراجعة النهائي"):tx("Important practice questions","أسئلة تدريب مهمة");
      target.innerHTML = questionMarkup(bank,label);
      target.querySelectorAll("[data-show-answer]").forEach(b=>b.addEventListener("click",()=>{const answer=target.querySelector('[data-answer="' + b.dataset.showAnswer + '"]');answer.classList.toggle("show");b.textContent=answer.classList.contains("show")?tx("Hide answer","إخفاء الإجابة"):tx("Show answer and explanation","أظهر الإجابة والشرح");}));
    } else {
      target.innerHTML = '<div class="revision-banner"><b>' + tx("Quick self-check","اختبار ذاتي سريع") + '</b><p>' + tx("Open Study Games below for the interactive quiz, flashcards, true/false and matching games.","افتح قسم الألعاب التعليمية بالأسفل لتجربة الاختيار من متعدد والبطاقات والصح والخطأ والمطابقة.") + '</p><button class="btn primary small" type="button" id="jumpToGames">' + tx("Play study games","ابدأ الألعاب") + ' ↓</button></div>';
      $("#jumpToGames")?.addEventListener("click",()=>$("#games")?.scrollIntoView({behavior:"smooth"}));
    }
  }

  const previousRender = renderChapters;
  function renderPage() {
    if (curriculumNow() !== "CBSE") {
      previousRender();
      if (videoLanguage() === "Arabic" && activeTab === "videos") {
        const target = $("#sshSaudiTab") || $("#tabContent");
        if (target) {
          const g = gradeNow(), subject = subjectNow();
          const officialUrl = typeof sshGetAinPage === "function" ? sshGetAinPage("Saudi curriculum",g) : (ainPages[g] || "https://www.ientv.edu.sa/ar/doros");
          const queryUrl = youtubeSearch("عين دروس الصف " + g + " " + subject + " شرح");
          target.innerHTML = '<div class="revision-banner"><b>مصادر الفيديو العربية · Arabic lesson sources</b><p>قد لا تسمح صفحة عين بالتشغيل داخل إطار مضمّن. افتح المصدر مباشرة من الزر أدناه. هذه دروس المنهج السعودي الرسمية وليست ترتيباً مطابقاً لمنهج CBSE.</p></div><div class="video-grid"><article class="video-card"><h4>عين دروس · دروس الصف ' + g + '</h4><p>المصدر الرسمي للدروس حسب الصف والمسار.</p>' + safeLink(officialUrl,"افتح دروس عين") + '</article><article class="video-card"><h4>بحث عن درس محدد</h4><p>افتح نتائج يوتيوب للمادة والصف المحددين.</p>' + safeLink(queryUrl,"ابحث عن فيديو عربي",true) + '</article></div>';
        }
      }
      return;
    }
    if (typeof sshUpdateSubjectOptions === "function") sshUpdateSubjectOptions();
    const g = gradeNow(), subject = subjectNow();
    const detailedClass11 = g === 11 && (subject === "Chemistry" || (typeof extraSubjects !== "undefined" && !!extraSubjects[subject]));
    if (!detailedClass11) {
      activeChapter = Math.max(0,Math.min(activeChapter,choosePack().length-1));
      renderGenericCbse();
      return;
    }
    previousRender();
    if (activeTab === "videos" && videoLanguage() === "Arabic") {
      const tab = $("#tabContent");
      if (tab) tab.innerHTML = renderVideoResources(chapterNow(),true);
    } else if (activeTab === "videos") {
      const tab = $("#tabContent");
      if (tab && !tab.querySelector("iframe")) {
        tab.innerHTML = renderVideoResources(chapterNow(),true);
      } else if (tab) {
        tab.querySelectorAll("iframe").forEach(frame => {
          const card = frame.closest(".video-card");
          if (!card || card.querySelector(".ssh-open-video")) return;
          const link = document.createElement("p");
          link.className = "ssh-open-video";
          link.innerHTML = safeLink(frame.src.replace("https://www.youtube-nocookie.com/embed/","https://www.youtube.com/watch?v="),tx("Open video on YouTube","افتح الفيديو على يوتيوب"),true);
          card.appendChild(link);
        });
      }
    }
  }
  renderChapters = renderPage;

  const curriculum = $("#curriculum"), gradeSelect = $("#classSelect"), subjectSelect = $("#subjectSelect"), languageSelect = $("#languageSelect");
  [curriculum,gradeSelect,subjectSelect,languageSelect].forEach(el=>{
    if(el) el.addEventListener("change",()=>{activeChapter=0;renderPage();});
  });
  $("#searchLessons")?.addEventListener("click",()=>{
    const status=$("#searchStatus");
    if(status && videoLanguage()==="Arabic" && curriculumNow()==="CBSE"){
      status.textContent=tx("Arabic resources opened below as working YouTube/Ain links. They are supplementary; match the topic with your CBSE textbook.","عُرضت مصادر اللغة العربية أدناه كرابط يوتيوب أو عين يعمل مباشرة. وهي مصادر مساندة؛ طابق الموضوع مع كتاب CBSE.");
      status.dataset.state="success";
    }
  });
  renderPage();

  /* Study games */
  const games = document.createElement("section");
  games.id = "games";
  games.className = "section games-section";
  games.innerHTML =
    '<div class="section-title"><div><span class="eyebrow">' + tx("04 / STUDY GAMES","04 / ألعاب تعليمية") + '</span><h2>' + tx("Learn through play.","تعلّم من خلال اللعب.") + '</h2><p>' + tx("Choose your grade and subject above, then play with a short practice set.","اختر الصف والمادة من الأعلى، ثم تدرب من خلال ألعاب قصيرة.") + '</p></div></div>' +
    '<div class="game-select-grid">' +
    '<button type="button" class="game-choice active" data-game="quiz"><b>⚡ ' + tx("Quick quiz","اختبار سريع") + '</b><span>' + tx("Multiple choice","اختيار من متعدد") + '</span></button>' +
    '<button type="button" class="game-choice" data-game="cards"><b>🃏 ' + tx("Flashcards","بطاقات تعليمية") + '</b><span>' + tx("Flip to reveal","اقلب البطاقة للإجابة") + '</span></button>' +
    '<button type="button" class="game-choice" data-game="truefalse"><b>✓ ' + tx("True or false","صح أم خطأ") + '</b><span>' + tx("Test your understanding","اختبر فهمك") + '</span></button>' +
    '<button type="button" class="game-choice" data-game="match"><b>🔗 ' + tx("Match pairs","طابق الأزواج") + '</b><span>' + tx("Match terms and meanings","طابق المصطلحات والمعاني") + '</span></button>' +
    '</div><div class="game-stage" id="gameStage" aria-live="polite"></div>';
  const practiceSection = $("#practice");
  if (practiceSection) practiceSection.parentNode.insertBefore(games,practiceSection);
  else $("#library")?.after(games);

  const style = document.createElement("style");
  style.textContent = [
    ".games-section{scroll-margin-top:90px}",
    ".game-select-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin:18px 0}",
    ".game-choice{border:1px solid var(--border,#d9e0e8);background:var(--card,#fff);border-radius:14px;padding:16px;text-align:left;cursor:pointer;color:inherit;display:grid;gap:7px}",
    ".game-choice span{font-size:.88rem;opacity:.75}",
    ".game-choice.active{border-color:var(--accent,#5278bc);box-shadow:0 0 0 2px rgba(82,120,188,.15)}",
    ".game-stage{border:1px solid var(--border,#d9e0e8);border-radius:18px;padding:20px;min-height:190px;background:var(--card,#fff)}",
    ".game-options,.match-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin:15px 0}",
    ".game-option,.match-card{padding:12px 14px;border:1px solid var(--border,#d9e0e8);border-radius:12px;background:transparent;color:inherit;text-align:left;cursor:pointer}",
    ".game-option:disabled,.match-card:disabled{opacity:.55;cursor:default}",
    ".game-feedback{padding:12px;border-radius:10px;background:var(--surface,#f2f5f9);margin:12px 0}",
    ".flashcard-face{border-radius:16px;border:1px solid var(--border,#d9e0e8);padding:28px 18px;min-height:130px;display:grid;place-items:center;text-align:center;margin:15px 0;background:var(--surface,#f7f8fa)}",
    ".match-card.selected{border-color:var(--accent,#5278bc);box-shadow:0 0 0 2px rgba(82,120,188,.18)}",
    ".match-card.matched{background:var(--surface,#eaf7ef);border-color:#68a77c}",
    ".tutor-chat-log{min-height:84px;max-height:360px;overflow:auto;padding:12px;margin:12px 0;background:#123e36;border:1px solid #3b7568;border-radius:14px}",
    ".tutor-message{display:block;width:fit-content;max-width:96%;padding:12px 14px;border-radius:14px;margin:8px 0;white-space:pre-wrap;overflow-wrap:anywhere;line-height:1.65;font-size:14px}",
    ".tutor-message.user{background:#dceaff;color:#18304e;margin-inline-start:auto}",
    ".tutor-message.assistant{background:#e3f1ec;color:#153a32;border:1px solid #b7d5ca;margin-inline-end:auto}",
    ".tutor-form{display:grid;grid-template-columns:minmax(0,1fr);gap:9px;margin:16px 0}",
    ".tutor-form label{display:block;width:100%;color:#e1f1ec;font-size:13px;font-weight:800;line-height:1.4;margin:5px 0 0}",
    ".tutor-form select,.tutor-form textarea{display:block;width:100%;max-width:100%;min-width:0;box-sizing:border-box;margin:0;padding:13px 14px;border-radius:12px;border:1px solid #5a897e;background:#103c34;color:#fff;color-scheme:dark;font:inherit;font-size:14px;line-height:1.55}",
    ".tutor-form select{min-height:48px;cursor:pointer}",
    ".tutor-form textarea{min-height:112px;resize:vertical}",
    ".tutor-form textarea::placeholder{color:#b9d0ca;opacity:1}",
    ".tutor-form select:focus-visible,.tutor-form textarea:focus-visible{outline:3px solid #8ce0bd;outline-offset:2px;border-color:#8ce0bd}",
    ".tutor-form button{justify-self:start;min-width:150px;margin-top:5px}",
    ".tutor-note{font-size:.84rem;color:#c7ded7;opacity:1;line-height:1.65;margin-top:12px}",
    ".tutor-suggestions button{background:#174b43;color:#f1fbf7;border-color:#5d9487}",
    ".tutor-suggestions button:hover{background:#226154}",
    "@media(max-width:600px){.tutor-chat-log{max-height:300px;padding:9px}.tutor-form textarea{min-height:100px}.tutor-message{max-width:100%}}",
    ".tutor-suggestions{display:flex;flex-wrap:wrap;gap:8px;margin:8px 0}",
    ".tutor-suggestions button{border:1px solid var(--border,#d9e0e8);background:transparent;border-radius:999px;padding:8px 11px;cursor:pointer;color:inherit}",
    "@media(max-width:760px){.game-select-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.game-options,.match-grid{grid-template-columns:1fr}}"
  ].join("");
  document.head.appendChild(style);

  const stage=$("#gameStage");
  let gameType="quiz", quizIndex=0, quizScore=0, quizItems=[], flashIndex=0, flashShown=false, matchSelected=null, matched=new Set();
  const gameText=(en,ar)=>tx(en,ar);
  function gameBank(){return choosePack();}
  function shuffle(list){return [...list].sort(()=>Math.random()-.5);}
  function renderQuiz(){
    if(!quizItems.length) quizItems=shuffle(gameBank()).slice(0,Math.min(5,gameBank().length));
    if(quizIndex>=quizItems.length){
      stage.innerHTML='<h3>' + gameText("Quiz complete!","أكملت الاختبار!") + '</h3><p>' + gameText("Your score: ","نتيجتك: ") + quizScore + ' / ' + quizItems.length + '</p><button class="btn primary small" id="restartGame">' + gameText("Play again","العب مرة أخرى") + '</button>';
      $("#restartGame").onclick=()=>{quizItems=shuffle(gameBank()).slice(0,5);quizIndex=0;quizScore=0;renderQuiz();};
      return;
    }
    const q=quizItems[quizIndex], opts=isArabicPage?q.optsAr:q.opts;
    stage.innerHTML='<p class="eyebrow">' + gameText("QUESTION ","السؤال ") + (quizIndex+1) + ' / ' + quizItems.length + '</p><h3>' + (isArabicPage?q.qAr:q.q) + '</h3><div class="game-options">' +
      opts.map((v,i)=>'<button class="game-option" type="button" data-game-answer="' + i + '">' + String.fromCharCode(65+i) + '. ' + v + '</button>').join("") +
      '</div><div id="gameFeedback" class="game-feedback" hidden></div>';
    stage.querySelectorAll("[data-game-answer]").forEach(b=>b.addEventListener("click",()=>{
      const selected=Number(b.dataset.gameAnswer), correct=selected===q.a;
      if(correct) quizScore++;
      stage.querySelectorAll("[data-game-answer]").forEach(x=>{x.disabled=true;if(Number(x.dataset.gameAnswer)===q.a)x.classList.add("matched");});
      const feedback=$("#gameFeedback",stage);feedback.hidden=false;
      feedback.textContent=(correct?gameText("Correct! ","صحيح! "):gameText("Not quite. ","ليس تماماً. "))+(isArabicPage?q.whyAr:q.why);
      const next=document.createElement("button");next.className="btn primary small";next.textContent=quizIndex===quizItems.length-1?gameText("See result","اعرض النتيجة"):gameText("Next question","السؤال التالي");
      next.addEventListener("click",()=>{quizIndex++;renderQuiz();});stage.appendChild(next);
    }));
  }
  function renderFlashcards(){
    const bank=gameBank();
    const card=bank[flashIndex%bank.length];
    stage.innerHTML='<p class="eyebrow">' + gameText("FLASHCARD ","بطاقة ") + (flashIndex+1) + ' / ' + bank.length + '</p><div class="flashcard-face"><h3>' + (flashShown?(isArabicPage?card.definitionAr:card.definition):(isArabicPage?card.termAr:card.term)) + '</h3></div><div class="game-options"><button class="btn primary small" id="flipCard">' + (flashShown?gameText("Hide meaning","إخفاء المعنى"):gameText("Reveal meaning","أظهر المعنى")) + '</button><button class="btn secondary small" id="nextCard">' + gameText("Next card","البطاقة التالية") + '</button></div>';
    $("#flipCard").onclick=()=>{flashShown=!flashShown;renderFlashcards();};
    $("#nextCard").onclick=()=>{flashIndex=(flashIndex+1)%bank.length;flashShown=false;renderFlashcards();};
  }
  function renderTrueFalse(){
    const bank=gameBank(), item=bank[quizIndex%bank.length], truth=quizIndex%2===0;
    const statement=truth?(isArabicPage?item.factAr:item.fact):(isArabicPage?item.wrongAr:item.wrong);
    stage.innerHTML='<p class="eyebrow">' + gameText("TRUE OR FALSE ","صح أم خطأ ") + (quizIndex+1) + '</p><h3>' + statement + '</h3><div class="game-options"><button class="game-option" data-tf="true">' + gameText("True","صح") + '</button><button class="game-option" data-tf="false">' + gameText("False","خطأ") + '</button></div>';
    stage.querySelectorAll("[data-tf]").forEach(b=>b.addEventListener("click",()=>{
      const correct=(b.dataset.tf==="true")===truth;
      stage.querySelectorAll("[data-tf]").forEach(x=>x.disabled=true);
      const feedback=document.createElement("p");feedback.className="game-feedback";feedback.textContent=correct?gameText("Correct!","إجابة صحيحة!"):gameText("Not quite. Review the statement.","ليس تماماً. راجع العبارة.");
      stage.appendChild(feedback);
      const next=document.createElement("button");next.className="btn primary small";next.textContent=gameText("Next statement","العبارة التالية");next.onclick=()=>{quizIndex++;renderTrueFalse();};stage.appendChild(next);
    }));
  }
  function renderMatch(){
    const bank=gameBank().slice(0,Math.min(4,gameBank().length));
    const definitions=shuffle(bank.map((item,i)=>({id:i,text:isArabicPage?item.definitionAr:item.definition})));
    stage.innerHTML='<p class="eyebrow">' + gameText("MATCH THE PAIRS","طابق الأزواج") + '</p><p>' + gameText("Select a term, then select its matching meaning.","اختر مصطلحاً ثم اختر المعنى المطابق له.") + '</p><div class="match-grid">' +
      bank.map((item,i)=>'<button class="match-card" type="button" data-match-term="' + i + '">' + (isArabicPage?item.termAr:item.term) + '</button>').join("") +
      definitions.map(item=>'<button class="match-card" type="button" data-match-definition="' + item.id + '">' + item.text + '</button>').join("") +
      '</div><p id="matchScore">' + gameText("Matched: ","الأزواج الصحيحة: ") + matched.size + ' / ' + bank.length + '</p>';
    stage.querySelectorAll("[data-match-term]").forEach(b=>b.addEventListener("click",()=>{if(matched.has(Number(b.dataset.matchTerm)))return;matchSelected=Number(b.dataset.matchTerm);stage.querySelectorAll("[data-match-term]").forEach(x=>x.classList.toggle("selected",x===b));}));
    stage.querySelectorAll("[data-match-definition]").forEach(b=>b.addEventListener("click",()=>{
      if(matchSelected===null)return;
      const def=Number(b.dataset.matchDefinition);
      if(def===matchSelected){
        matched.add(def);stage.querySelector('[data-match-term="' + def + '"]').classList.add("matched");b.classList.add("matched");b.disabled=true;stage.querySelector('[data-match-term="' + def + '"]').disabled=true;
        $("#matchScore").textContent=gameText("Matched: ","الأزواج الصحيحة: ")+matched.size+" / "+bank.length;
        if(matched.size===bank.length)$("#matchScore").textContent+=gameText(" · Great work!"," · أحسنت!");
      } else {
        b.classList.add("selected");setTimeout(()=>b.classList.remove("selected"),450);
      }
      matchSelected=null;stage.querySelectorAll("[data-match-term]").forEach(x=>x.classList.remove("selected"));
    }));
  }
  function startGame(type){
    gameType=type;quizIndex=0;quizScore=0;quizItems=[];flashIndex=0;flashShown=false;matchSelected=null;matched=new Set();
    document.querySelectorAll("[data-game]").forEach(b=>b.classList.toggle("active",b.dataset.game===type));
    if(type==="quiz")renderQuiz();else if(type==="cards")renderFlashcards();else if(type==="truefalse")renderTrueFalse();else renderMatch();
  }
  games.querySelectorAll("[data-game]").forEach(b=>b.addEventListener("click",()=>startGame(b.dataset.game)));
  startGame("quiz");

  /* Replace the old offline-only assistant with a real Netlify AI Gateway tutor. */
  const assistant=$("#studyAssistant");
  if(assistant){
    const heading=$(".assistant h2"), intro=$(".assistant .assistant>p") || $(".assistant p");
    if(heading)heading.textContent=tx("Ask your AI Study Tutor.","اسأل المعلّم الذكي.");
    if(intro)intro.textContent=tx("Get step-by-step explanations, examples and practice in English or Arabic. The tutor uses the selected grade, subject and curriculum.","احصل على شرح خطوة بخطوة وأمثلة وتدريبات بالإنجليزية أو العربية. يستخدم المعلّم الصف والمادة والمنهج المحدد.");
    assistant.innerHTML =
      '<div class="chat-title">✦ ' + tx("AI Study Tutor","المعلّم الذكي") + ' <small>' + tx("Beta · English and Arabic","نسخة تجريبية · العربية والإنجليزية") + '</small></div>' +
      '<div id="tutorChatLog" class="tutor-chat-log" aria-live="polite"><div class="tutor-message assistant">' + tx("Hello! Ask me to explain a topic, solve a practice example, or make a short revision quiz.","مرحباً! اسألني عن شرح موضوع أو حل مثال تدريبي أو إعداد اختبار مراجعة قصير.") + '</div></div>' +
      '<div class="tutor-suggestions"><button type="button" data-tutor-suggest="Explain my current topic in simple steps."> ' + tx("Explain simply","اشرح ببساطة") + ' </button><button type="button" data-tutor-suggest="Give me 3 practice questions about this topic.">' + tx("Give practice questions","أعطني أسئلة تدريب") + '</button></div>' +
      '<form id="sshAiTutorForm" class="tutor-form"><label for="sshTutorLanguage">' + tx("Answer language","لغة الإجابة") + '</label><select id="sshTutorLanguage"><option value="English" ' + (!isArabicPage?'selected':'') + '>English</option><option value="Arabic" ' + (isArabicPage?'selected':'') + '>العربية</option></select><label for="sshAiTutorInput">' + tx("Your school question","سؤالك الدراسي") + '</label><textarea id="sshAiTutorInput" maxlength="800" required placeholder="' + tx("Ask about your selected subject or topic…","اسأل عن المادة أو الموضوع المحدد…") + '"></textarea><button id="sshAiTutorSend" class="btn primary small" type="submit">' + tx("Ask AI Tutor","اسأل المعلّم الذكي") + '</button></form>' +
      '<p class="tutor-note">' + tx("Do not enter your name, contact details, school ID, passwords or private information. AI can make mistakes; check important answers with your teacher and textbook. Questions are sent to Netlify's AI service. AI replies use your Netlify account credits; the Free plan currently includes 300 credits per month with a hard limit and no automatic recharge.","لا تدخل اسمك أو بيانات التواصل أو رقمك المدرسي أو كلمات المرور أو معلومات خاصة. قد يخطئ الذكاء الاصطناعي؛ تحقق من الإجابات المهمة مع معلمك وكتابك. تُرسل الأسئلة إلى خدمة الذكاء الاصطناعي في Netlify. تستهلك الإجابات رصيد حساب Netlify؛ تتضمن الخطة المجانية حالياً 300 رصيد شهرياً بحد صارم ودون إعادة شحن تلقائية.") + '</p>';
    const log=$("#tutorChatLog"), input=$("#sshAiTutorInput"), form=$("#sshAiTutorForm"), send=$("#sshAiTutorSend");
    const history=[];
    function addMessage(role,text){
      const message=document.createElement("div");message.className="tutor-message "+role;message.textContent=text;log.appendChild(message);log.scrollTop=log.scrollHeight;
    }
    assistant.querySelectorAll("[data-tutor-suggest]").forEach(b=>b.addEventListener("click",()=>{input.value=b.dataset.tutorSuggest;input.focus();}));
    form.addEventListener("submit",async event=>{
      event.preventDefault();
      const question=input.value.trim();
      if(question.length<2)return;
      input.value="";input.disabled=true;send.disabled=true;send.textContent=tx("Thinking…","جارٍ التفكير…");
      addMessage("user",question);
      const thinking=document.createElement("div");thinking.className="tutor-message assistant";thinking.textContent=tx("Preparing an explanation…","جارٍ إعداد الشرح…");log.appendChild(thinking);
      try{
        const response=await fetch("/api/study-tutor",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
          question,grade:gradeNow(),curriculum:curriculumNow(),subject:subjectNow(),chapter:chapterNow(),
          language:$("#sshTutorLanguage")?.value||"English",history:history.slice(-6)
        })});
        const data=await response.json().catch(()=>({}));
        thinking.remove();
        if(!response.ok)throw new Error(data.error||tx("The tutor is temporarily unavailable.","المعلّم غير متاح مؤقتاً."));
        const reply=String(data.reply||"").slice(0,3500);
        addMessage("assistant",reply);
        history.push({role:"user",content:question},{role:"assistant",content:reply});
        if(history.length>8)history.splice(0,history.length-8);
      }catch(error){
        thinking.remove();
        addMessage("assistant",error.message||tx("The tutor could not connect. Please try again later.","تعذر الاتصال بالمعلّم. حاول مرة أخرى لاحقاً."));
      }finally{
        input.disabled=false;send.disabled=false;send.textContent=tx("Ask AI Tutor","اسأل المعلّم الذكي");input.focus();
      }
    });
  }

  // Ensure the language and curriculum selectors always refresh the current activity.
  [$("#curriculum"),$("#classSelect"),$("#subjectSelect"),$("#languageSelect")].forEach(el=>{
    if(el)el.addEventListener("change",()=>{if($("#games"))startGame(gameType);});
  });
})();
