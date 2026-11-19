/* ============ CONTENT: skills, lessons, question banks ============ */
const SKILLS = {
  analogy:   {area:'V', ar:'التناظر اللفظي', en:'Verbal Analogy'},
  completion:{area:'V', ar:'إكمال الجمل', en:'Sentence Completion'},
  context:   {area:'V', ar:'الخطأ السياقي', en:'Contextual Error'},
  odd:       {area:'V', ar:'المفردة الشاذة', en:'Odd Word Out'},
  reading:   {area:'V', ar:'استيعاب المقروء', en:'Reading Comprehension'},
  arith:     {area:'Q', ar:'الحساب', en:'Arithmetic'},
  algebra:   {area:'Q', ar:'الجبر', en:'Algebra'},
  geometry:  {area:'Q', ar:'الهندسة', en:'Geometry'},
  stats:     {area:'Q', ar:'التحليل والإحصاء', en:'Analysis & Statistics'},
  comparison:{area:'Q', ar:'المقارنات', en:'Quantitative Comparison'}
};
const V_SKILLS = ['analogy','completion','context','odd','reading'];
const Q_SKILLS = ['arith','algebra','geometry','stats','comparison'];

const COMPARE_OPTS = {
  ar:['القيمة الأولى أكبر','القيمة الثانية أكبر','القيمتان متساويتان','المعطيات غير كافية'],
  en:['Quantity A is greater','Quantity B is greater','The two quantities are equal','The relationship cannot be determined']
};
/* the standing instruction shown above every comparison item (as in the real test) */
const COMPARE_INTRO = {ar:'قارن بين القيمتين، ثم اختر:',en:'Compare the two quantities, then choose:'};

/* ---------- Reading passages ---------- */
const PASSAGES = {
  ar:{
    P1:'أثبتت دراسات حديثة أن النوم ليس وقتًا ضائعًا من يوم الطالب، بل مرحلة نشطة يعيد فيها الدماغ ترتيب ما تعلّمه خلال النهار. ففي أثناء النوم العميق تنتقل المعلومات من الذاكرة قصيرة المدى إلى الذاكرة طويلة المدى، وهو ما يفسّر أن الطالب الذي يسهر ليلة الاختبار قد يحفظ كثيرًا لكنه ينسى سريعًا. ويرى الباحثون أن المراجعة الموزّعة على أيام متباعدة، مع نوم كافٍ، أجدى من المذاكرة المكثفة في ليلة واحدة، لأن كل مراجعة تعيد تثبيت المعلومة قبل أن تتلاشى.',
    P2:'تحظى المملكة العربية السعودية بمعدلات إشعاع شمسي من الأعلى عالميًا، إذ تسطع الشمس فيها معظم أيام السنة. ولهذا اتجهت إلى إنشاء محطات للطاقة الشمسية ضمن مساعي تنويع مصادر الطاقة. غير أن هذه المحطات تواجه تحديات، أبرزها تراكم الغبار على الألواح، مما يقلل كفاءتها، وهو ما دفع المهندسين إلى تطوير أنظمة تنظيف آلية لا تستهلك إلا القليل من المياه.',
    P3:'تؤدي النحلة دورًا يتجاوز إنتاج العسل؛ فهي في أثناء تنقلها بين الأزهار تنقل حبوب اللقاح، فتُسهم في تلقيح عدد كبير من المحاصيل الزراعية. ولذلك يحذّر العلماء من أن تراجع أعداد النحل بسبب المبيدات وفقدان مواطنه الطبيعية قد ينعكس على وفرة الغذاء وأسعاره، وليس على العسل وحده.'
  },
  en:{
    P1:'Recent studies show that sleep is not wasted time in a student\'s day but an active stage in which the brain reorganizes what it learned during the day. During deep sleep, information moves from short-term memory to long-term memory, which explains why a student who stays up all night before an exam may memorize a lot but forget quickly. Researchers argue that reviews spaced over several days, combined with enough sleep, are more effective than cramming in a single night, because each review reinforces the information before it fades.',
    P2:'Saudi Arabia receives some of the highest levels of solar radiation in the world, with sunshine on most days of the year. For this reason, the Kingdom has been building solar power plants as part of its efforts to diversify energy sources. However, these plants face challenges, the most notable being dust accumulating on the panels, which reduces their efficiency. This has led engineers to develop automated cleaning systems that use little water.',
    P3:'The bee\'s role goes far beyond producing honey. As it moves between flowers, it carries pollen, helping to pollinate a large number of crops. Scientists therefore warn that a decline in bee populations, caused by pesticides and habitat loss, could affect the availability and price of food, not just honey.'
  }
};

/* ---------- Verbal bank: Arabic ---------- */
const VB_AR = [
 {s:'analogy',q:'قلم : كتابة',o:['مقص : قص','كتاب : مكتبة','حبر : ورق','معلم : مدرسة'],a:0,e:'أداة ووظيفتها: القلم أداة للكتابة، والمقص أداة للقص.'},
 {s:'analogy',q:'نحلة : خلية',o:['طائر : عش','حصان : سرج','شجرة : ثمرة','نمل : سكر'],a:0,e:'كائن ومسكنه الذي يبنيه.'},
 {s:'analogy',q:'ظمأ : ماء',o:['جوع : طعام','تعب : رياضة','برد : ثلج','نوم : سرير'],a:0,e:'حاجة وما يسدها.'},
 {s:'analogy',q:'بذرة : شجرة',o:['طفل : رجل','ورقة : غصن','قمح : حقل','ثمرة : جذر'],a:0,e:'مرحلة أولى تنمو لتصبح مرحلة مكتملة.'},
 {s:'analogy',q:'طبيب : مستشفى',o:['معلم : مدرسة','مريض : دواء','محامٍ : قضية','طيار : مسافر'],a:0,e:'صاحب مهنة ومكان عمله.'},
 {s:'analogy',q:'كريم : بخيل',o:['شجاع : جبان','صادق : أمين','ذكي : فطن','قوي : متين'],a:0,e:'تضاد في الصفة. بقية الخيارات مترادفات.'},
 {s:'analogy',q:'سيف : غمد',o:['رسالة : ظرف','كتاب : قارئ','باب : مفتاح','سهم : هدف'],a:0,e:'شيء وما يُحفظ فيه.'},
 {s:'analogy',q:'ساعة : دقيقة',o:['سنة : شهر','متر : طول','كيلوغرام : ميزان','أسبوع : عطلة'],a:0,e:'وحدة زمن كبرى وجزء منها.'},
 {s:'analogy',q:'مطر : سيول',o:['إهمال : فشل','نجاح : اجتهاد','شمس : قمر','ريح : هواء'],a:0,e:'سبب ونتيجة. «نجاح : اجتهاد» عكسُ الترتيب (نتيجة : سبب).'},
 {s:'analogy',q:'أصابع : يد',o:['أوراق : شجرة','عين : نظر','باب : نافذة','حذاء : قدم'],a:0,e:'جزء من كل.'},
 {s:'analogy',q:'عنب : زبيب',o:['رطب : تمر','ماء : عطش','خشب : نجار','ليل : نجوم'],a:0,e:'ثمرة وما تتحول إليه بعد التجفيف.'},
 {s:'analogy',q:'نجار : خشب',o:['خياط : قماش','طبيب : مريض','مزارع : جرار','كاتب : قارئ'],a:0,e:'صانع والمادة التي يعمل عليها.'},
 {s:'completion',q:'لا يُقاس نجاح المرء بما يملكه من مال، ...... بما يقدّمه لمجتمعه من نفع.',o:['بل','لأن','حتى','ثم'],a:0,e:'«بل» للإضراب: نفي الأول وإثبات الثاني.'},
 {s:'completion',q:'كلما زاد اطلاع الإنسان ...... آفاق تفكيره.',o:['اتسعت','ضاقت','توقفت','تراجعت'],a:0,e:'زيادة الاطلاع تقود إلى اتساع التفكير.'},
 {s:'completion',q:'العلم في الصغر كالنقش على ......',o:['الحجر','الماء','الرمل','الهواء'],a:0,e:'مثل شائع يدل على الرسوخ والثبات.'},
 {s:'completion',q:'رغم صعوبة الطريق فإن العدّاء ...... السباق بعزيمة لا تلين.',o:['أكمل','ترك','خسر','أجّل'],a:0,e:'«رغم» تفيد التضاد، و«عزيمة لا تلين» تؤكد الإكمال.'},
 {s:'completion',q:'الوقاية ...... من العلاج.',o:['خير','أصعب','أقل','أبعد'],a:0,e:'تعبير شائع يفيد التفضيل.'},
 {s:'completion',q:'يعدّ التخطيط الجيد ...... أساسية لتحقيق الأهداف، ...... يكون التنفيذ عشوائيًا دونه.',o:['ركيزة / إذ','عقبة / لذا','ركيزة / لكن','نتيجة / حين'],a:0,e:'التخطيط ركيزة، و«إذ» للتعليل.'},
 {s:'completion',q:'لم يكن الباحث ...... بالنتائج الأولية، فأعاد التجربة مرات عدة.',o:['مقتنعًا','مشغولًا','متأخرًا','مسافرًا'],a:0,e:'عدم الاقتناع هو سبب إعادة التجربة.'},
 {s:'completion',q:'تتميز اللغة العربية بغزارة ...... وتعدد أساليب التعبير فيها.',o:['مفرداتها','أخطائها','حدودها','قيودها'],a:0,e:'«الغزارة» تناسب المفردات.'},
 {s:'completion',q:'من جدّ ......',o:['وجد','تعب','نام','سأل'],a:0,e:'مثل: من جدّ وجد.'},
 {s:'completion',q:'الاقتصاد في الإنفاق لا يعني ......، بل يعني وضع المال في موضعه.',o:['البخل','التوفير','الادخار','التخطيط'],a:0,e:'المقابلة بين الاقتصاد المحمود والبخل المذموم.'},
 {s:'context',q:'يحرص الطالب المجتهد على تأجيل واجباته حتى ينال أعلى الدرجات.',o:['يحرص','المجتهد','تأجيل','أعلى'],a:2,e:'الصحيح «إنجاز»؛ فالتأجيل لا يوصل إلى أعلى الدرجات.'},
 {s:'context',q:'كان الجو باردًا جدًا، فارتدى الناس ملابس خفيفة ليتقوا البرد.',o:['باردًا','خفيفة','ليتقوا','البرد'],a:1,e:'الصحيح «ثقيلة».'},
 {s:'context',q:'القراءة غذاء العقل، فهي تضيّق مدارك الإنسان وتثري لغته.',o:['غذاء','تضيّق','مدارك','تثري'],a:1,e:'الصحيح «توسّع».'},
 {s:'context',q:'انتشر الخبر ببطء شديد، فعلم به الجميع خلال دقائق.',o:['ببطء','فعلم','الجميع','دقائق'],a:0,e:'الصحيح «بسرعة».'},
 {s:'context',q:'يتسم القائد الناجح بالتردد في اتخاذ القرارات الحاسمة وتحمّل المسؤولية.',o:['الناجح','التردد','الحاسمة','تحمّل'],a:1,e:'الصحيح «الحزم».'},
 {s:'context',q:'تساعد الرياضة المنتظمة على إضعاف الجسم وتحسين الحالة المزاجية.',o:['المنتظمة','إضعاف','تحسين','المزاجية'],a:1,e:'الصحيح «تقوية».'},
 {s:'context',q:'لما اشتد العطش بالمسافرين، أسرعوا نحو البئر ليبتعدوا عن الماء.',o:['اشتد','أسرعوا','البئر','ليبتعدوا'],a:3,e:'الصحيح «ليصلوا إلى».'},
 {s:'context',q:'كلما ارتفعنا عن سطح البحر ارتفعت درجة الحرارة وقلّ الأكسجين.',o:['ارتفعنا','ارتفعت','قلّ','الأكسجين'],a:1,e:'الصحيح «انخفضت».'},
 {s:'odd',q:'اختر الكلمة المختلفة:',o:['تفاح','برتقال','جزر','موز'],a:2,e:'الجزر من الخضار والبقية فواكه.'},
 {s:'odd',q:'اختر الكلمة المختلفة:',o:['أسد','نمر','فهد','حصان'],a:3,e:'الحصان عاشب والبقية سنوريات مفترسة.'},
 {s:'odd',q:'اختر الكلمة المختلفة:',o:['شمال','جنوب','شرق','يمين'],a:3,e:'البقية جهات أصلية.'},
 {s:'odd',q:'اختر الكلمة المختلفة:',o:['فرح','سرور','بهجة','حزن'],a:3,e:'الثلاث الأولى مترادفة.'},
 {s:'odd',q:'اختر الكلمة المختلفة:',o:['مثلث','مربع','دائرة','مستطيل'],a:2,e:'الدائرة ليس لها أضلاع.'},
 {s:'odd',q:'اختر الكلمة المختلفة:',o:['مكة المكرمة','جدة','الدمام','القاهرة'],a:3,e:'القاهرة ليست مدينة سعودية.'},
 {s:'odd',q:'اختر الكلمة المختلفة:',o:['قرأ','كتب','رسم','قلم'],a:3,e:'«قلم» اسم والبقية أفعال.'},
 {s:'odd',q:'اختر الكلمة المختلفة:',o:['ذهب','فضة','نحاس','خشب'],a:3,e:'الخشب ليس معدنًا.'},
 {s:'reading',p:'P1',q:'الفكرة الرئيسة للنص:',o:['أثر النوم في تثبيت التعلم','أضرار السهر على الصحة الجسدية','أنواع الذاكرة عند الإنسان','طرق الاستعداد ليوم الاختبار'],a:0,e:'النص كله يدور حول دور النوم في تثبيت المعلومات.'},
 {s:'reading',p:'P1',q:'وفق النص، تنتقل المعلومات إلى الذاكرة طويلة المدى في أثناء:',o:['النوم العميق','المراجعة المكثفة','ليلة الاختبار','الاستيقاظ'],a:0,e:'«ففي أثناء النوم العميق تنتقل المعلومات...».'},
 {s:'reading',p:'P1',q:'يُفهم من النص أن السهر ليلة الاختبار:',o:['يزيد الحفظ مؤقتًا ويضعف التذكر لاحقًا','لا يؤثر في التذكر','يحسن الفهم العميق','أفضل من المراجعة الموزعة'],a:0,e:'«قد يحفظ كثيرًا لكنه ينسى سريعًا».'},
 {s:'reading',p:'P1',q:'كلمة «أجدى» في النص تعني:',o:['أنفع','أسرع','أصعب','أقدم'],a:0,e:'أجدى: أكثر جدوى ونفعًا.'},
 {s:'reading',p:'P2',q:'سبب توجه المملكة إلى الطاقة الشمسية حسب النص:',o:['ارتفاع معدلات الإشعاع الشمسي','كثرة الغبار','وفرة المياه','انخفاض تكلفة الألواح'],a:0,e:'«ولهذا اتجهت...» بعد ذكر الإشعاع المرتفع.'},
 {s:'reading',p:'P2',q:'أبرز التحديات التي تواجه المحطات:',o:['تراكم الغبار على الألواح','قلة ساعات السطوع','نقص المهندسين','ارتفاع أسعار المياه'],a:0,e:'«أبرزها تراكم الغبار على الألواح».'},
 {s:'reading',p:'P2',q:'«غير أن» في النص تفيد:',o:['الاستدراك','التعليل','التأكيد','الشرط'],a:0,e:'تنتقل من الميزة إلى التحدي.'},
 {s:'reading',p:'P2',q:'أنسب عنوان للنص:',o:['الطاقة الشمسية في المملكة: فرص وتحديات','أنظمة تحلية المياه','تاريخ الطاقة في العالم','الغبار في الصحراء'],a:0,e:'يجمع الفرصة (الإشعاع) والتحدي (الغبار).'},
 {s:'reading',p:'P3',q:'الدور الذي يبرزه النص للنحل أكثر من غيره:',o:['تلقيح المحاصيل','إنتاج العسل','مكافحة الآفات','تزيين الحدائق'],a:0,e:'«دورًا يتجاوز إنتاج العسل... تلقيح عدد كبير من المحاصيل».'},
 {s:'reading',p:'P3',q:'من أسباب تراجع أعداد النحل حسب النص:',o:['المبيدات','كثرة الأزهار','ارتفاع أسعار الغذاء','إنتاج العسل'],a:0,e:'«بسبب المبيدات وفقدان مواطنه».'},
 {s:'reading',p:'P3',q:'يُستنتج من النص أن تراجع النحل قد يؤدي إلى:',o:['ارتفاع أسعار الغذاء','زيادة المحاصيل','انخفاض استخدام المبيدات','وفرة العسل'],a:0,e:'«قد ينعكس على وفرة الغذاء وأسعاره».'},
 {s:'reading',p:'P3',q:'الضمير في «فهي» يعود على:',o:['النحلة','الأزهار','حبوب اللقاح','المحاصيل'],a:0,e:'الحديث عن النحلة التي تتنقل بين الأزهار.'}
];

/* ---------- Verbal bank: English ---------- */
const VB_EN = [
 {s:'analogy',q:'PEN : WRITE',o:['knife : cut','book : library','ink : paper','teacher : school'],a:0,e:'A tool and its function.'},
 {s:'analogy',q:'BEE : HIVE',o:['bird : nest','horse : saddle','tree : fruit','ant : sugar'],a:0,e:'An animal and the home it builds.'},
 {s:'analogy',q:'THIRST : WATER',o:['hunger : food','fatigue : exercise','cold : ice','sleep : bed'],a:0,e:'A need and what satisfies it.'},
 {s:'analogy',q:'GENEROUS : STINGY',o:['brave : cowardly','honest : truthful','clever : smart','strong : sturdy'],a:0,e:'Opposites. The other pairs are synonyms.'},
 {s:'analogy',q:'PETAL : FLOWER',o:['page : book','wheel : road','leaf : autumn','key : door'],a:0,e:'Part and whole.'},
 {s:'analogy',q:'DOCTOR : HOSPITAL',o:['teacher : school','patient : medicine','lawyer : case','pilot : passenger'],a:0,e:'A professional and their workplace.'},
 {s:'analogy',q:'DROUGHT : FAMINE',o:['negligence : failure','success : effort','sun : moon','wind : air'],a:0,e:'Cause and effect. "success : effort" is reversed (effect : cause).'},
 {s:'analogy',q:'GRAPE : RAISIN',o:['plum : prune','apple : tree','milk : cow','bread : bakery'],a:0,e:'A fruit and what it becomes when dried.'},
 {s:'analogy',q:'HOUR : MINUTE',o:['year : month','meter : length','kilogram : scale','week : holiday'],a:0,e:'A larger unit of time and a unit within it.'},
 {s:'analogy',q:'SCULPTOR : STATUE',o:['author : novel','reader : book','painter : brush','singer : stage'],a:0,e:'A creator and what they create.'},
 {s:'analogy',q:'CARPENTER : WOOD',o:['tailor : fabric','doctor : patient','farmer : tractor','writer : reader'],a:0,e:'A craftsperson and the material they work with.'},
 {s:'analogy',q:'LOUD : DEAFENING',o:['bright : blinding','warm : cold','small : little','fast : car'],a:0,e:'Degree: the second word is an extreme form of the first.'},
 {s:'completion',q:'Although the task seemed simple at first, it proved to be surprisingly ______.',o:['complex','easy','brief','obvious'],a:0,e:'"Although" signals contrast with "simple".'},
 {s:'completion',q:'The scientist remained ______ about the results until the experiment was repeated several times.',o:['skeptical','certain','excited','careless'],a:0,e:'Doubt explains the need to repeat the experiment.'},
 {s:'completion',q:'Regular exercise not only strengthens the body ______ improves mood.',o:['but also','because','unless','so that'],a:0,e:'"Not only ... but also".'},
 {s:'completion',q:'Her explanation was so ______ that even the youngest students understood it.',o:['clear','vague','lengthy','confusing'],a:0,e:'Understanding follows from clarity.'},
 {s:'completion',q:'The museum\'s ancient manuscripts are ______, so visitors may not touch them.',o:['fragile','durable','modern','cheap'],a:0,e:'Fragility explains the rule.'},
 {s:'completion',q:'Despite the heavy rain, the match ______ as scheduled.',o:['continued','was cancelled','stopped','was delayed'],a:0,e:'"Despite" signals the match went on.'},
 {s:'completion',q:'Water is ______ to all known forms of life.',o:['essential','harmful','irrelevant','optional'],a:0,e:'Life depends on water.'},
 {s:'completion',q:'The committee ______ the proposal because it lacked supporting evidence.',o:['rejected','approved','praised','celebrated'],a:0,e:'Lack of evidence leads to rejection.'},
 {s:'completion',q:'He is known for his ______; he never wastes money on unnecessary things.',o:['frugality','extravagance','laziness','rudeness'],a:0,e:'Frugality means careful spending.'},
 {s:'completion',q:'The new policy was ______ to reduce traffic congestion in the city center.',o:['designed','forgotten','refused','hidden'],a:0,e:'A policy is designed for a purpose.'},
 {s:'context',q:'The diligent student always postpones his homework so that he can earn top marks.',o:['diligent','postpones','earn','top'],a:1,e:'It should be "completes".'},
 {s:'context',q:'It was freezing outside, so people wore light clothes to protect themselves from the cold.',o:['freezing','light','protect','cold'],a:1,e:'It should be "heavy" or "warm".'},
 {s:'context',q:'Reading nourishes the mind; it narrows a person\'s horizons and enriches their language.',o:['narrows','horizons','enriches','language'],a:0,e:'It should be "broadens".'},
 {s:'context',q:'The news spread very slowly, and everyone had heard it within minutes.',o:['slowly','everyone','heard','minutes'],a:0,e:'It should be "quickly".'},
 {s:'context',q:'A successful leader is known for hesitation when making critical decisions and taking responsibility.',o:['successful','hesitation','critical','responsibility'],a:1,e:'It should be "decisiveness".'},
 {s:'context',q:'As we climb above sea level, the temperature rises and the air becomes thinner.',o:['climb','rises','air','thinner'],a:1,e:'It should be "falls".'},
 {s:'context',q:'Regular exercise helps weaken the body and improve one\'s mood.',o:['weaken','body','improve','mood'],a:0,e:'It should be "strengthen".'},
 {s:'context',q:'The thirsty travelers hurried toward the well to avoid the water.',o:['thirsty','hurried','well','avoid'],a:3,e:'It should be "reach".'},
 {s:'odd',q:'Choose the word that does not belong:',o:['apple','orange','carrot','banana'],a:2,e:'A carrot is a vegetable.'},
 {s:'odd',q:'Choose the word that does not belong:',o:['lion','tiger','leopard','horse'],a:3,e:'The others are big cats.'},
 {s:'odd',q:'Choose the word that does not belong:',o:['north','south','east','left'],a:3,e:'The others are compass directions.'},
 {s:'odd',q:'Choose the word that does not belong:',o:['joy','delight','happiness','sorrow'],a:3,e:'The others are synonyms.'},
 {s:'odd',q:'Choose the word that does not belong:',o:['triangle','square','circle','rectangle'],a:2,e:'A circle has no sides.'},
 {s:'odd',q:'Choose the word that does not belong:',o:['Makkah','Jeddah','Dammam','Cairo'],a:3,e:'Cairo is not a Saudi city.'},
 {s:'odd',q:'Choose the word that does not belong:',o:['read','write','draw','pencil'],a:3,e:'"Pencil" is a noun; the others are verbs.'},
 {s:'odd',q:'Choose the word that does not belong:',o:['gold','silver','copper','wood'],a:3,e:'Wood is not a metal.'},
 {s:'reading',p:'P1',q:'The main idea of the passage is:',o:['how sleep helps consolidate learning','the physical harm of staying up late','types of human memory','how to prepare for exam day'],a:0,e:'The whole passage is about sleep\'s role in retaining information.'},
 {s:'reading',p:'P1',q:'According to the passage, information moves to long-term memory during:',o:['deep sleep','intensive review','the night before the exam','waking up'],a:0,e:'"During deep sleep, information moves..."'},
 {s:'reading',p:'P1',q:'It can be inferred that staying up all night before an exam:',o:['boosts memorization briefly but hurts recall later','has no effect on recall','improves deep understanding','is better than spaced review'],a:0,e:'"may memorize a lot but forget quickly".'},
 {s:'reading',p:'P1',q:'The word "cramming" most nearly means:',o:['intensive last-minute studying','sleeping','relaxing','reviewing over weeks'],a:0,e:'It is contrasted with spaced review.'},
 {s:'reading',p:'P2',q:'According to the passage, the Kingdom turned to solar power because of:',o:['high levels of solar radiation','frequent dust','abundant water','cheap panels'],a:0,e:'"For this reason..." follows the radiation fact.'},
 {s:'reading',p:'P2',q:'The most notable challenge facing the plants is:',o:['dust on the panels','few sunny hours','a lack of engineers','expensive water'],a:0,e:'"the most notable being dust accumulating on the panels".'},
 {s:'reading',p:'P2',q:'The word "However" introduces:',o:['a contrast','a reason','an example','a conclusion'],a:0,e:'It shifts from the advantage to the challenge.'},
 {s:'reading',p:'P2',q:'The best title for the passage is:',o:['Solar Power in Saudi Arabia: Opportunities and Challenges','Water Desalination Systems','A History of World Energy','Dust in the Desert'],a:0,e:'It covers both the opportunity and the challenge.'},
 {s:'reading',p:'P3',q:'The role of bees that the passage emphasizes most is:',o:['pollinating crops','producing honey','fighting pests','decorating gardens'],a:0,e:'"goes far beyond producing honey... helping to pollinate".'},
 {s:'reading',p:'P3',q:'One cause of the decline in bees mentioned is:',o:['pesticides','too many flowers','high food prices','honey production'],a:0,e:'"caused by pesticides and habitat loss".'},
 {s:'reading',p:'P3',q:'It can be inferred that a decline in bees could lead to:',o:['higher food prices','more crops','less pesticide use','more honey'],a:0,e:'"could affect the availability and price of food".'},
 {s:'reading',p:'P3',q:'In "As it moves between flowers", "it" refers to:',o:['the bee','the flowers','the pollen','the crops'],a:0,e:'The subject is the bee.'}
];

/* ---------- Quant fixed bank (bilingual) ---------- */
const QB = [
 {s:'comparison',cmp:1,q:{ar:'⟦س > 0⟧<br>القيمة الأولى: ⟦س⟧<br>القيمة الثانية: ⟦س^2⟧',en:'⟦x > 0⟧<br>Quantity A: ⟦x⟧<br>Quantity B: ⟦x^2⟧'},a:3,e:{ar:'عند ⟦س = ½⟧ الأولى أكبر، وعند ⟦س = 2⟧ الثانية أكبر.',en:'At ⟦x = ½⟧ A is greater; at ⟦x = 2⟧ B is greater.'}},
 {s:'comparison',cmp:1,q:{ar:'القيمة الأولى: ⟦0.5⟧<br>القيمة الثانية: ⟦½⟧',en:'Quantity A: ⟦0.5⟧<br>Quantity B: ⟦½⟧'},a:2,e:{ar:'⟦½ = 0.5⟧',en:'⟦½ = 0.5⟧'}},
 {s:'comparison',cmp:1,q:{ar:'القيمة الأولى: ⟦(−1)^100⟧<br>القيمة الثانية: ⟦(−1)^101⟧',en:'Quantity A: ⟦(−1)^100⟧<br>Quantity B: ⟦(−1)^101⟧'},a:0,e:{ar:'الأس الزوجي يعطي 1، والفردي يعطي −1.',en:'An even power gives 1, an odd power gives −1.'}},
 {s:'comparison',cmp:1,q:{ar:'س عدد صحيح موجب<br>القيمة الأولى: ⟦2س⟧<br>القيمة الثانية: ⟦س + 1⟧',en:'x is a positive integer<br>Quantity A: ⟦2x⟧<br>Quantity B: ⟦x + 1⟧'},a:3,e:{ar:'عند ⟦س = 1⟧ متساويتان، وعند ⟦س = 2⟧ الأولى أكبر.',en:'At ⟦x = 1⟧ they are equal; at ⟦x = 2⟧ A is greater.'}},
 {s:'comparison',cmp:1,q:{ar:'القيمة الأولى: مجموع زوايا المثلث<br>القيمة الثانية: مجموع زوايا الشكل الرباعي',en:'Quantity A: sum of a triangle\'s angles<br>Quantity B: sum of a quadrilateral\'s angles'},a:1,e:{ar:'⟦180° < 360°⟧',en:'⟦180° < 360°⟧'}},
 {s:'comparison',cmp:1,q:{ar:'القيمة الأولى: ⟦√16 + √9⟧<br>القيمة الثانية: ⟦√25⟧',en:'Quantity A: ⟦√16 + √9⟧<br>Quantity B: ⟦√25⟧'},a:0,e:{ar:'⟦4 + 3 = 7⟧ و ⟦√25 = 5⟧',en:'⟦4 + 3 = 7⟧ and ⟦√25 = 5⟧'}},
 {s:'comparison',cmp:1,q:{ar:'القيمة الأولى: 20% من 50<br>القيمة الثانية: 50% من 20',en:'Quantity A: 20% of 50<br>Quantity B: 50% of 20'},a:2,e:{ar:'كلاهما يساوي 10.',en:'Both equal 10.'}},
 {s:'comparison',cmp:1,q:{ar:'⟦أ < ب < 0⟧<br>القيمة الأولى: ⟦أ^2⟧<br>القيمة الثانية: ⟦ب^2⟧',en:'⟦a < b < 0⟧<br>Quantity A: ⟦a^2⟧<br>Quantity B: ⟦b^2⟧'},a:0,e:{ar:'أ أبعد عن الصفر، فمربعه أكبر. مثال: ⟦أ = −3، ب = −2⟧',en:'a is further from zero, so its square is larger. Example: ⟦a = −3, b = −2⟧'}},
 {s:'comparison',cmp:1,q:{ar:'القيمة الأولى: ⟦3/7⟧<br>القيمة الثانية: ⟦4/9⟧',en:'Quantity A: ⟦3/7⟧<br>Quantity B: ⟦4/9⟧'},a:1,e:{ar:'ضرب تبادلي: ⟦3 × 9 = 27⟧ و ⟦4 × 7 = 28⟧',en:'Cross-multiply: ⟦3 × 9 = 27⟧ vs ⟦4 × 7 = 28⟧'}},
 {s:'comparison',cmp:1,q:{ar:'⟦ص = 2س + 1⟧ و ⟦س = 3⟧<br>القيمة الأولى: ⟦ص⟧<br>القيمة الثانية: ⟦7⟧',en:'⟦y = 2x + 1⟧ and ⟦x = 3⟧<br>Quantity A: ⟦y⟧<br>Quantity B: ⟦7⟧'},a:2,e:{ar:'⟦ص = 2(3) + 1 = 7⟧',en:'⟦y = 2(3) + 1 = 7⟧'}},
 {s:'arith',q:{ar:'اشترى أحمد 3 أقلام بـ 12 ريالًا. كم يدفع ثمن 7 أقلام؟',en:'Ahmed bought 3 pens for 12 SAR. How much do 7 pens cost?'},o:['28','24','21','32'],a:0,e:{ar:'سعر القلم 4 ريالات، ⟦7 × 4 = 28⟧',en:'Each pen costs 4, ⟦7 × 4 = 28⟧'}},
 {s:'arith',q:{ar:'سيارة تقطع 240 كم في 3 ساعات. ما سرعتها بالكيلومتر في الساعة؟',en:'A car travels 240 km in 3 hours. What is its speed in km/h?'},o:['80','60','72','90'],a:0,e:{ar:'⟦240 ÷ 3 = 80⟧',en:'⟦240 ÷ 3 = 80⟧'}},
 {s:'algebra',q:{ar:'عمر الأب الآن ثلاثة أمثال عمر ابنه، وبعد 10 سنوات يصبح ضعفه. كم عمر الابن الآن؟',en:'A father is three times his son\'s age. In 10 years he will be twice his son\'s age. How old is the son now?'},o:['10','15','20','5'],a:0,e:{ar:'⟦3س + 10 = 2(س + 10) → س = 10⟧',en:'⟦3x + 10 = 2(x + 10) → x = 10⟧'}},
 {s:'arith',q:{ar:'ينجز عامل عملًا في 6 أيام، وينجزه آخر في 3 أيام. في كم يومًا ينجزانه معًا؟',en:'One worker finishes a job in 6 days, another in 3 days. How many days together?'},o:['2','4.5','3','1.5'],a:0,e:{ar:'⟦1/6 + 1/3 = 1/2⟧ أي يومان.',en:'⟦1/6 + 1/3 = 1/2⟧, so 2 days.'}},
 {s:'arith',q:{ar:'ثمن سلعة بعد خصم 20% هو 160 ريالًا. كم ثمنها الأصلي؟',en:'After a 20% discount an item costs 160 SAR. What was the original price?'},o:['200','180','192','220'],a:0,e:{ar:'⟦160 ÷ 0.8 = 200⟧',en:'⟦160 ÷ 0.8 = 200⟧'}},
 {s:'arith',q:{ar:'كم عددًا صحيحًا من 1 إلى 100 يقبل القسمة على 3 و 5 معًا؟',en:'How many integers from 1 to 100 are divisible by both 3 and 5?'},o:['6','7','5','20'],a:0,e:{ar:'القسمة على 3 و 5 معًا تعني مضاعفات 15: 15، 30، 45، 60، 75، 90، أي 6 أعداد.',en:'Divisible by both 3 and 5 means multiples of 15: 15, 30, 45, 60, 75, 90, so 6 numbers.'}},
 {s:'algebra',q:{ar:'إذا كان ⟦3س − 7 = 11⟧ فما قيمة ⟦س + 2⟧؟',en:'If ⟦3x − 7 = 11⟧, what is ⟦x + 2⟧?'},o:['8','6','4','9'],a:0,e:{ar:'⟦3س = 18 → س = 6 → س + 2 = 8⟧',en:'⟦3x = 18 → x = 6 → x + 2 = 8⟧'}},
 {s:'algebra',q:{ar:'ما العدد التالي: ⟦2، 6، 12، 20، 30، ...⟧؟',en:'What comes next: ⟦2, 6, 12, 20, 30, ...⟧?'},o:['42','40','36','44'],a:0,e:{ar:'الفروق 4، 6، 8، 10 ثم 12، أي ⟦30 + 12 = 42⟧.',en:'Differences 4, 6, 8, 10, then 12, so ⟦30 + 12 = 42⟧.'}},
 {s:'stats',q:{ar:'مبيعات متجر بالآلاف: السبت 12، الأحد 18، الاثنين 15، الثلاثاء 25، الأربعاء 30. ما متوسط المبيعات اليومية؟',en:'Store sales (thousands): Sat 12, Sun 18, Mon 15, Tue 25, Wed 30. What is the average daily sales?'},o:['20','18','25','15'],a:0,e:{ar:'⟦100 ÷ 5 = 20⟧',en:'⟦100 ÷ 5 = 20⟧'}},
 {s:'stats',q:{ar:'مبيعات متجر بالآلاف: الاثنين 15، الثلاثاء 25. ما نسبة الزيادة من الاثنين إلى الثلاثاء تقريبًا؟',en:'Store sales (thousands): Mon 15, Tue 25. What is the approximate percent increase from Monday to Tuesday?'},o:['66.7%','40%','10%','60%'],a:0,e:{ar:'⟦(25 − 15) ÷ 15 × 100 ≈ 66.7%⟧',en:'⟦(25 − 15) ÷ 15 × 100 ≈ 66.7%⟧'}},
 {s:'geometry',q:{ar:'مربع محيطه 36 سم. ما مساحته؟',en:'A square has a perimeter of 36 cm. What is its area?'},o:['81','36','72','144'],a:0,e:{ar:'الضلع 9، والمساحة ⟦9^2 = 81⟧',en:'Side 9, area ⟦9^2 = 81⟧'}},
 {s:'geometry',q:{ar:'دائرة قطرها 10 سم. ما محيطها؟',en:'A circle has a diameter of 10 cm. What is its circumference?'},o:['10π','25π','5π','20π'],a:0,e:{ar:'⟦المحيط = π × القطر = 10π⟧',en:'⟦C = π × d = 10π⟧'}},
 {s:'geometry',q:{ar:'مثلث قائم الزاوية طولا ضلعي القائمة 6 و 8. ما طول الوتر؟',en:'A right triangle has legs 6 and 8. What is the hypotenuse?'},o:['10','14','12','7'],a:0,e:{ar:'⟦√(36 + 64) = √100 = 10⟧',en:'⟦√(36 + 64) = √100 = 10⟧'}},
 {s:'geometry',q:{ar:'زاويتان متكاملتان (مجموعهما 180°) إحداهما ضعف الأخرى. ما قياس الكبرى؟',en:'Two supplementary angles (sum 180°): one is twice the other. What is the larger angle?'},o:['120°','90°','60°','135°'],a:0,e:{ar:'⟦3س = 180 → س = 60⟧، والكبرى ⟦120°⟧',en:'⟦3x = 180 → x = 60⟧, larger ⟦= 120°⟧'}},
 {s:'algebra',q:{ar:'إذا كان ⟦أ/ب = 2/3⟧ و ⟦ب = 12⟧، فما قيمة أ؟',en:'If ⟦a/b = 2/3⟧ and ⟦b = 12⟧, what is a?'},o:['8','18','6','9'],a:0,e:{ar:'⟦أ = 12 × 2/3 = 8⟧',en:'⟦a = 12 × 2/3 = 8⟧'}},
 {s:'arith',q:{ar:'ما قيمة ⟦0.25 × 0.4⟧؟',en:'What is ⟦0.25 × 0.4⟧?'},o:['0.1','1','0.01','0.001'],a:0,e:{ar:'⟦¼ × 0.4 = 0.1⟧',en:'⟦¼ × 0.4 = 0.1⟧'}},
 {s:'stats',q:{ar:'متوسط 4 أعداد هو 15. إذا أضيف العدد 25، فما المتوسط الجديد؟',en:'The mean of 4 numbers is 15. If 25 is added, what is the new mean?'},o:['17','20','16','18'],a:0,e:{ar:'⟦(60 + 25) ÷ 5 = 17⟧',en:'⟦(60 + 25) ÷ 5 = 17⟧'}},
 {s:'stats',q:{ar:'ما العدد التالي: ⟦1، 4، 9، 16، ...⟧؟',en:'What comes next: ⟦1, 4, 9, 16, ...⟧?'},o:['25','20','24','36'],a:0,e:{ar:'مربعات الأعداد: ⟦5^2 = 25⟧',en:'Perfect squares: ⟦5^2 = 25⟧'}}
];
/* ============ Quantitative question generators ============ */
let rnd=Math.random;
const mulberry=a=>()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};
const R = (a,b)=>a+Math.floor(rnd()*(b-a+1));
const pick = a=>a[Math.floor(rnd()*a.length)];
const shuffle = a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
const N = n=>{ // format number: minus sign, trim decimals
  const r=Math.round(n*100)/100; const s=String(Math.abs(r)); return (r<0?'−':'')+s; };

function mkOpts(ans, cands, fmt=N, allowNeg=false){
  const out=[fmt(ans)]; const seen=new Set(out);
  const push=c=>{ if(out.length>=4||!isFinite(c)) return; if(!allowNeg&&c<=0) return; const f=fmt(c); if(!seen.has(f)){seen.add(f);out.push(f);} };
  cands.forEach(push);
  const offs=[1,-1,2,-2,3,-3,5,-5,10,-10,4,6,7,8];
  for(const o of offs){ if(out.length>=4) break; push(ans+o); }
  return out; // correct answer at index 0
}
const bi=(ar,en)=>({ar,en});
// Arabic counted noun with digits: f=[one, two, plural (3-10), singular accusative (11+)]
const arC=(n,f)=>n===1?f[0]:n===2?f[1]:(n%100>=3&&n%100<=10)?`${n} ${f[2]}`:`${n} ${f[3]}`;
const arSAR=n=>`${n} ${n%100===0?'ريال':(n%100>=3&&n%100<=10)?'ريالات':'ريالًا'}`;

const GENS = {
  percent(){ const p=pick([10,20,25,30,40,50,75]); const n=20*R(2,20); const ans=p*n/100;
    return {s:'arith',q:bi(`ما ${p}% من ${n}؟`,`What is ${p}% of ${n}?`),o:mkOpts(ans,[ans+n/10,ans*2,n-ans,ans/2]),e:bi(`⟦${n} × ${p} ÷ 100 = ${N(ans)}⟧`,`⟦${n} × ${p} ÷ 100 = ${N(ans)}⟧`)}; },
  discount(){ const price=20*R(5,25), d=pick([10,20,25,50]); const ans=price*(100-d)/100;
    return {s:'arith',q:bi(`سعر حقيبة ${arSAR(price)} وعليها خصم ${d}%. كم سعرها بعد الخصم؟`,`A bag costs ${price} SAR with a ${d}% discount. What is the price after the discount?`),o:mkOpts(ans,[price*d/100,price-d,ans+10,ans-10]),e:bi(`⟦${price} × ${(100-d)/100} = ${N(ans)}⟧`,`⟦${price} × ${(100-d)/100} = ${N(ans)}⟧`)}; },
  ratio(){ const [a,b]=pick([[1,2],[2,3],[3,4],[3,5],[2,5],[4,5],[5,7],[1,3]]); const k=R(2,9); const tot=(a+b)*k, ans=b*k;
    return {s:'arith',q:bi(`نسبة عدد الأولاد إلى البنات في نادٍ ${a} : ${b}، وعدد الأعضاء ${tot}. كم عدد البنات؟`,`The ratio of boys to girls in a club is ${a} : ${b}, and there are ${tot} members. How many girls are there?`),o:mkOpts(ans,[a*k,tot-a,b*(k+1),Math.round(tot/2)]),e:bi(`الجزء الواحد ⟦${tot} ÷ ${a+b} = ${k}⟧، البنات ⟦${b} × ${k} = ${ans}⟧`,`One part ⟦= ${tot} ÷ ${a+b} = ${k}⟧, girls ⟦= ${b} × ${k} = ${ans}⟧`)}; },
  speed(){ const v=10*R(4,12), t=R(2,5); const ans=v*t;
    return {s:'arith',q:bi(`تسير سيارة بسرعة ${v} كم/ساعة لمدة ${arC(t,['ساعة واحدة','ساعتين','ساعات','ساعة'])}. ما المسافة التي تقطعها بالكيلومتر؟`,`A car drives at ${v} km/h for ${t} hours. How many kilometers does it travel?`),o:mkOpts(ans,[v*(t+1),ans+v,v*(t-1),ans/2]),e:bi(`⟦المسافة = ${v} × ${t} = ${ans}⟧`,`⟦distance = ${v} × ${t} = ${ans}⟧`)}; },
  fracAdd(){ let a=R(2,9),b=R(2,9); while(b===a) b=R(2,9); const num=a+b, den=a*b, g=gcd(num,den);
    const f=(n,d)=>{const g=gcd(n,d);return `${n/g}/${d/g}`;};
    const ans=f(num,den); const cands=[f(2,a+b),f(1,a+b),f(num,den*2),f(num+1,den),f(a,b)];
    const o=[ans]; for(const c of cands){ if(!o.includes(c)&&o.length<4) o.push(c);} while(o.length<4) o.push(`${o.length}/${den+o.length}`);
    return {s:'arith',q:bi(`ما ناتج ⟦1/${a} + 1/${b}⟧؟`,`What is ⟦1/${a} + 1/${b}⟧?`),o:o.map(x=>`⟦${x}⟧`),e:(()=>{const x=`⟦${b}/${den} + ${a}/${den} = ${num}/${den}${ans!==num+'/'+den?' = '+ans:''}⟧`;return bi(x,x);})()}; },
  linear(){ const a=R(2,9), x=R(-5,12); let b=R(-15,15); if(b===0) b=4; const c=a*x+b;
    const sign=b<0?'−':'+';
    return {s:'algebra',q:bi(`إذا كان ⟦${a}س ${sign} ${Math.abs(b)} = ${N(c)}⟧ فما قيمة س؟`,`If ⟦${a}x ${sign} ${Math.abs(b)} = ${N(c)}⟧, what is x?`),o:mkOpts(x,[x+1,x-1,-x,x+2,Math.round((c+b)/a)],N,true),e:bi(`⟦${a}س = ${N(c)} ${b<0?'+':'−'} ${Math.abs(b)} = ${N(c-b)} → س = ${N(x)}⟧`,`⟦${a}x = ${N(c)} ${b<0?'+':'−'} ${Math.abs(b)} = ${N(c-b)} → x = ${N(x)}⟧`)}; },
  exponent(){ const b=pick([2,3,5]), m=R(2,9), n=R(2,9); const k=R(1,m+n-1); const ans=m+n-k;
    return {s:'algebra',q:bi(`إذا كان ⟦${b}^${m} × ${b}^${n} ÷ ${b}^${k} = ${b}^ن⟧ فما قيمة ن؟`,`If ⟦${b}^${m} × ${b}^${n} ÷ ${b}^${k} = ${b}^n⟧, what is n?`),o:mkOpts(ans,[m*n-k,m+n+k,m+n,ans+1]),e:bi(`نجمع أسس الضرب ونطرح أس القسمة: ⟦${m} + ${n} − ${k} = ${ans}⟧`,`Add exponents when multiplying, subtract when dividing: ⟦${m} + ${n} − ${k} = ${ans}⟧`)}; },
  seqArith(){ const s=R(1,20), d=R(2,9); const t=[0,1,2,3,4].map(i=>s+i*d); const ans=s+5*d;
    return {s:'algebra',q:bi(`ما العدد التالي في المتتابعة: ⟦${t.join('، ')}، ...⟧؟`,`What comes next: ⟦${t.join(', ')}, ...⟧?`),o:mkOpts(ans,[ans+d,ans-1,ans+1,t[4]+2*d-1]),e:bi(`فرق ثابت ⟦${d}⟧: ⟦${t[4]} + ${d} = ${ans}⟧`,`Constant difference ⟦${d}⟧: ⟦${t[4]} + ${d} = ${ans}⟧`)}; },
  seqGeo(){ const r=pick([2,3,4]), s=R(1,r===4?3:6); const t=[0,1,2,3].map(i=>s*r**i); const ans=s*r**4;
    return {s:'algebra',q:bi(`ما العدد التالي في المتتابعة: ⟦${t.join('، ')}، ...⟧؟`,`What comes next: ⟦${t.join(', ')}, ...⟧?`),o:mkOpts(ans,[t[3]+(t[3]-t[2]),ans*r,ans-r,ans+s]),e:bi(`كل حد يُضرب في ⟦${r}⟧: ⟦${t[3]} × ${r} = ${ans}⟧`,`Each term is multiplied by ⟦${r}⟧: ⟦${t[3]} × ${r} = ${ans}⟧`)}; },
  evaluate(){ const x=R(-4,6), b=pick([2,3,4,5]), c=R(1,6); const v=x*x-b*x+c;
    /* three short math runs instead of one long one, so the explanation can wrap on a phone */
    const w=()=>`⟦(${N(x)})^2 − ${b}(${N(x)}) + ${c}⟧ = ⟦${x*x} ${x<0?'+':'−'} ${Math.abs(b*x)} + ${c}⟧ = ⟦${N(v)}⟧`;
    return {s:'algebra',q:bi(`إذا كان ⟦س = ${N(x)}⟧ فما قيمة ⟦س^2 − ${b}س + ${c}⟧؟`,`If ⟦x = ${N(x)}⟧, what is ⟦x^2 − ${b}x + ${c}⟧?`),o:mkOpts(v,[v+2,x*x+b*x+c,v-1,-v],N,true),e:bi(w(),w())}; },
  rect(){ const l=R(4,15), w=R(2,l-1); const area=l*w, per=2*(l+w);
    if(rnd()<.5) return {s:'geometry',q:bi(`مستطيل طوله ${l} سم وعرضه ${w} سم. ما مساحته بالسنتيمتر المربع؟`,`A rectangle is ${l} cm long and ${w} cm wide. What is its area in cm²?`),o:mkOpts(area,[per,l+w,area+l,area-w]),e:bi(`⟦${l} × ${w} = ${area}⟧`,`⟦${l} × ${w} = ${area}⟧`)};
    return {s:'geometry',q:bi(`مستطيل طوله ${l} سم وعرضه ${w} سم. ما محيطه بالسنتيمتر؟`,`A rectangle is ${l} cm long and ${w} cm wide. What is its perimeter in cm?`),o:mkOpts(per,[area,l+w,per+2,per-2]),e:bi(`⟦2 × (${l} + ${w}) = ${per}⟧`,`⟦2 × (${l} + ${w}) = ${per}⟧`)}; },
  triangle(){ const a=R(30,80), b=R(20,Math.min(100,170-a)); const c=180-a-b;
    return {s:'geometry',q:bi(`مثلث قياس زاويتين فيه ${a}° و ${b}°. ما قياس الزاوية الثالثة؟`,`Two angles of a triangle are ${a}° and ${b}°. What is the third angle?`),o:mkOpts(c,[c+10,c-10,180-a,a+b],x=>N(x)+'°'),e:bi(`⟦180 − ${a} − ${b} = ${c}⟧`,`⟦180 − ${a} − ${b} = ${c}⟧`)}; },
  pyth(){ const [a,b,c]=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25],[6,8,10],[9,12,15],[12,16,20],[10,24,26],[15,20,25],[20,21,29],[9,40,41]]);
    return {s:'geometry',q:bi(`مثلث قائم الزاوية طولا ضلعي القائمة ${a} و ${b}. ما طول الوتر؟`,`A right triangle has legs ${a} and ${b}. What is the hypotenuse?`),o:mkOpts(c,[a+b,c+1,c-1,c+2]),e:bi(`⟦√(${a*a} + ${b*b}) = √${c*c} = ${c}⟧`,`⟦√(${a*a} + ${b*b}) = √${c*c} = ${c}⟧`)}; },
  circle(){ const r=R(2,12); const ans=r*r;
    if(rnd()<.35) return {s:'geometry',q:bi(`دائرة نصف قطرها ${r} سم. ما محيطها؟`,`A circle has a radius of ${r} cm. What is its circumference?`),o:mkOpts(2*r,[r*r,r,4*r,2*r+2],x=>`⟦${x}π⟧`),e:bi(`⟦المحيط = 2π × ${r} = ${2*r}π⟧`,`⟦C = 2π × ${r} = ${2*r}π⟧`)};
    return {s:'geometry',q:bi(`دائرة نصف قطرها ${r} سم. ما مساحتها؟`,`A circle has a radius of ${r} cm. What is its area?`),o:mkOpts(ans,[2*r,4*r*r,r,r*r+r],x=>`⟦${x}π⟧`),e:bi(`⟦π × ${r}^2 = ${ans}π⟧`,`⟦π × ${r}^2 = ${ans}π⟧`)}; },
  avgMissing(){ const avg=R(10,30); let x,y,z,w; do{ x=R(avg-8,avg+8); y=R(avg-8,avg+8); z=R(avg-8,avg+8); w=4*avg-x-y-z; }while(w<=0);
    return {s:'stats',q:bi(`متوسط أربعة أعداد يساوي ${avg}، وثلاثة منها ${x} و ${y} و ${z}. ما العدد الرابع؟`,`The mean of four numbers is ${avg}. Three of them are ${x}, ${y} and ${z}. What is the fourth?`),o:mkOpts(w,[avg,w+4,w-4,4*avg]),e:bi(`المجموع ⟦4 × ${avg} = ${4*avg}⟧، والرابع ⟦${4*avg} − ${x+y+z} = ${w}⟧`,`Sum ⟦= 4 × ${avg} = ${4*avg}⟧, fourth ⟦= ${4*avg} − ${x+y+z} = ${w}⟧`)}; },
  median(){ const s=new Set(); while(s.size<5) s.add(R(1,40)); const arr=[...s]; const sorted=arr.slice().sort((a,b)=>a-b); const med=sorted[2];
    const mean=Math.round(arr.reduce((a,b)=>a+b,0)/5);
    return {s:'stats',q:bi(`ما الوسيط للقيم: ⟦${arr.join('، ')}⟧؟`,`What is the median of: ⟦${arr.join(', ')}⟧?`),o:mkOpts(med,[arr[2],mean,sorted[1],sorted[3]]),e:bi(`بعد الترتيب: ⟦${sorted.join('، ')}⟧، والوسيط ⟦${med}⟧`,`Sorted: ⟦${sorted.join(', ')}⟧, median ⟦= ${med}⟧`)}; },
  pctChange(){ const p=pick([10,20,25,50]); const old=20*R(2,15); const up=rnd()<.6; const nw=old*(100+(up?p:-p))/100;
    const wrong=Math.round(Math.abs(nw-old)/nw*1000)/10;
    return {s:'stats',q:bi(`${up?'ارتفع':'انخفض'} عدد زوار معرض من ${old} إلى ${nw}. ما نسبة ${up?'الزيادة':'الانخفاض'}؟`,`Visitors to an exhibition went ${up?'up':'down'} from ${old} to ${nw}. What is the percent ${up?'increase':'decrease'}?`),o:mkOpts(p,[wrong,p+5,p/2,p*2],x=>N(x)+'%'),e:bi(`⟦${Math.abs(nw-old)} ÷ ${old} × 100 = ${p}%⟧ (نقسم على القيمة القديمة)`,`⟦${Math.abs(nw-old)} ÷ ${old} × 100 = ${p}%⟧ (divide by the old value)`)}; },
  compare(){ const t=R(0,3); let qa,qe,a,A,B,ex;
    /* a quarter of the generated comparisons depend on an unknown, so "cannot be determined" is a real answer */
    if(t===3){ const v=R(0,2), k=R(2,6);
      if(v===0){ qa=`ن عدد صحيح موجب<br>القيمة الأولى: ⟦ن^2⟧<br>القيمة الثانية: ⟦${k}ن⟧`; qe=`n is a positive integer<br>Quantity A: ⟦n^2⟧<br>Quantity B: ⟦${k}n⟧`;
        ex=[`عند ⟦ن = 1⟧ الثانية أكبر، وعند ⟦ن = ${k}⟧ متساويتان، وعند ⟦ن = ${k+1}⟧ الأولى أكبر؛ فلا يمكن التحديد.`,`At ⟦n = 1⟧ B is larger, at ⟦n = ${k}⟧ they are equal, at ⟦n = ${k+1}⟧ A is larger, so it cannot be determined.`]; }
      else if(v===1){ const S2=k*4; qa=`أ ، ب عددان صحيحان موجبان، ⟦أ + ب = ${S2}⟧<br>القيمة الأولى: أ<br>القيمة الثانية: ب`; qe=`a and b are positive integers, ⟦a + b = ${S2}⟧<br>Quantity A: a<br>Quantity B: b`;
        ex=[`قد تكون ⟦أ = ${S2-1}⟧ و⟦ب = 1⟧ أو العكس، أو ⟦أ = ب = ${S2/2}⟧؛ فلا يمكن التحديد.`,`a could be ${S2-1} and b 1, or the reverse, or both ${S2/2}, so it cannot be determined.`]; }
      else { const m=k*2; qa=`س عدد بين ⟦0⟧ و⟦${m}⟧<br>القيمة الأولى: ⟦س⟧<br>القيمة الثانية: ⟦${k}⟧`; qe=`x is a number between ⟦0⟧ and ⟦${m}⟧<br>Quantity A: ⟦x⟧<br>Quantity B: ⟦${k}⟧`;
        ex=[`س قد تكون أقل من ${k} أو أكبر منها أو تساويها؛ فلا يمكن التحديد.`,`x may be below, above or equal to ${k}, so it cannot be determined.`]; }
      return {s:'comparison',cmp:1,q:bi(qa,qe),a:3,e:bi(ex[0],ex[1])}; }
    if(t===0){ let x=R(2,5),y=R(2,5); while(y===x) y=R(2,5); A=x**y; B=y**x;
      qa=`القيمة الأولى: ⟦${x}^${y}⟧<br>القيمة الثانية: ⟦${y}^${x}⟧`; qe=`Quantity A: ⟦${x}^${y}⟧<br>Quantity B: ⟦${y}^${x}⟧`; ex=[`⟦${x}^${y} = ${A}⟧ ، ⟦${y}^${x} = ${B}⟧`,`⟦${x}^${y} = ${A}⟧, ⟦${y}^${x} = ${B}⟧`]; }
    else if(t===1){ const n1=pick([2,3,4,5,6,7,8]),d1=n1+R(1,4),n2=pick([2,3,4,5,6,7,8]),d2=n2+R(1,4); A=n1/d1; B=n2/d2;
      qa=`القيمة الأولى: ⟦${n1}/${d1}⟧<br>القيمة الثانية: ⟦${n2}/${d2}⟧`; qe=`Quantity A: ⟦${n1}/${d1}⟧<br>Quantity B: ⟦${n2}/${d2}⟧`; ex=[`ضرب تبادلي: ⟦${n1} × ${d2} = ${n1*d2}⟧ ، ⟦${n2} × ${d1} = ${n2*d1}⟧`,`Cross-multiply: ⟦${n1} × ${d2} = ${n1*d2}⟧, ⟦${n2} × ${d1} = ${n2*d1}⟧`]; A=n1*d2; B=n2*d1; }
    else { const p1=pick([10,20,25,30,40,50]), m1=10*R(2,12), p2=pick([10,20,25,30,40,50]), m2=10*R(2,12); A=p1*m1/100; B=p2*m2/100;
      qa=`القيمة الأولى: ${p1}% من ${m1}<br>القيمة الثانية: ${p2}% من ${m2}`; qe=`Quantity A: ${p1}% of ${m1}<br>Quantity B: ${p2}% of ${m2}`; ex=[`⟦${p1}% × ${m1} = ${N(A)}⟧ ، ⟦${p2}% × ${m2} = ${N(B)}⟧`,`⟦${p1}% × ${m1} = ${N(A)}⟧, ⟦${p2}% × ${m2} = ${N(B)}⟧`]; }
    a = A>B?0:A<B?1:2;
    return {s:'comparison',cmp:1,q:bi(qa,qe),a,e:bi(ex[0],ex[1])}; }
};
/* De-duplication: a generator retries (deterministically, same rnd) when it would repeat one of the last
   150 generated items or copy a fixed bank item word for word. History resets whenever the caller's rnd is swapped
   (e.g. each seeded model build), so model tests stay reproducible. */
let _gh=[],_gn=[],_ghR=null,_BK=null;
const genKey=r=>r.s==='odd'?'odd|'+r.o.slice().sort().join('|'):(typeof r.q==='object'?r.q.ar:r.q);
/* the odd word itself: two "odd one out" items in a test must not share their answer */
const oddKey=r=>r.s==='odd'?'oddw|'+r.o[r.a??0]:null;
function _bankKeys(){ if(!_BK){ _BK=new Set(); QB.forEach(r=>{ _BK.add(r.q.ar); _BK.add(r.q.en); }); [VB_AR,VB_EN].forEach(b=>b.forEach(r=>{ if(r.s==='analogy'||r.s==='completion') _BK.add(r.q); if(r.s==='odd'){ _BK.add(genKey(r)); _BK.add(oddKey(r)); } })); } return _BK; }
/* Every generated item draws exactly one number from the caller's stream and runs on a private fork of it, so a change
   inside a generator (an extra retry, a new distractor rule) no longer shifts every later item of a seeded model test. */
function genFork(fn,name,raw){ const outer=rnd; if(_ghR!==outer){ _ghR=outer; _gh=[]; _gn=[]; } rnd=mulberry(Math.floor(outer()*2147483647)); try{ return genUnique(fn,name,raw); } finally{ rnd=outer; } }
function genUnique(fn,name,raw){
  /* variety: a quant generator that produced one of the last 24 generated items (about two sections) hands over to a
     sibling generator of the same skill, so a test does not show two "workers" problems; still seeded, so model tests stay fixed */
  if(name&&raw){ const win=_gn.slice(-24); if(win.includes(name)){ const sk=Object.keys(GEN_BY_SKILL).find(s=>GEN_BY_SKILL[s].includes(name)); const alt=sk?[...new Set(GEN_BY_SKILL[sk])].filter(g=>!win.includes(g)&&raw[g]):[]; if(alt.length){ name=alt[Math.floor(rnd()*alt.length)]; fn=raw[name]; } } _gn.push(name); if(_gn.length>50) _gn.shift(); }
  const bk=_bankKeys(); let r;
  for(let i=0;i<15;i++){ r=fn(); const k=genKey(r), ok=oddKey(r); const qs=typeof r.q==='object'?[r.q.ar,r.q.en]:[r.q]; if(!_gh.includes(k)&&!bk.has(k)&&!qs.some(x=>bk.has(x))&&!(ok&&(_gh.includes(ok)||bk.has(ok)))) break; }
  _gh.push(genKey(r)); const ok2=oddKey(r); if(ok2) _gh.push(ok2); if(_gh.length>150) _gh.splice(0,_gh.length-150); return r;
}
const GEN_BY_SKILL = {arith:['percent','discount','ratio','speed','fracAdd'],algebra:['linear','exponent','seqArith','seqGeo','evaluate'],geometry:['rect','triangle','pyth','circle'],stats:['avgMissing','median','pctChange'],comparison:['compare']};
/* ============ Recurring sections (الأقسام المتكررة) ============
   Each section follows the blueprint of a real computer-based quantitative block of 11 questions, in its usual order:
   4 word problems, 2 comparisons, 2 geometry, 2 questions on one table, 1 closing algebra item.
   All wording and numbers are original; every item is generated from a seed, so a section is fixed for a given number. */
const RS_N=60, RS_FREE=2, RS_V1=20;
const rsTbl=(head,rows)=>`<div class="tbl"><table><thead><tr>${head.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const rsCmp=(a,b)=>a>b?0:a<b?1:2;
const fx=(n,d)=>{ const g=gcd(n,d); return `${n/g}/${d/g}`; };
/* figures: small inline SVG drawn in the text colour, shaded parts in the brand colour; numbers are labels only, not to scale */
const FG=(inner,vb='0 0 220 150')=>`<svg class="qfig" viewBox="${vb}" direction="ltr" role="img" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" font-family="inherit" font-size="13">${inner}</svg><br>`;
const FT=(x,y,t,a='middle')=>`<text x="${x}" y="${y}" fill="currentColor" stroke="none" text-anchor="${a}" dominant-baseline="middle">${t}</text>`;
const SH='fill="var(--pri)" fill-opacity=".28"';
const xv=l=>l==='ar'?'س':'x';
const regPoly=(n,cx,cy,r)=>[...Array(n)].map((_,i)=>{ const a=-Math.PI/2+2*Math.PI*i/n; return `${(cx+r*Math.cos(a)).toFixed(1)},${(cy+r*Math.sin(a)).toFixed(1)}`; }).join(' ');
const rsSAR=n=>n===1?'ريال واحد':n===2?'ريالين':arSAR(n);
const RS_A={
  discountTotal(){ const n=R(4,12), p=pick([2,3,4,5,8,10]), d=pick([5,10,20,25]); const tot=n*p, ans=tot*(100-d)/100;
    return {s:'arith',q:bi(`اشترى سعد ${n} علب عصير، سعر العلبة ${rsSAR(p)}، ثم حصل على خصم ${d}% على المبلغ الإجمالي. كم دفع؟`,`Saad bought ${n} juice boxes at ${p} SAR each, then got a ${d}% discount on the total. How much did he pay?`),o:mkOpts(ans,[tot,tot-d,tot*d/100,ans+p]),e:bi(`الإجمالي ⟦${n} × ${p} = ${tot}⟧، وبعد الخصم ⟦${tot} × ${(100-d)/100} = ${N(ans)}⟧`,`Total ⟦${n} × ${p} = ${tot}⟧; after the discount ⟦${tot} × ${(100-d)/100} = ${N(ans)}⟧`)}; },
  profitReverse(){ const p=pick([20,25,50]), q=pick([5,10,15,30,40]); const cost=pick([800,1200,1600,2000,2400,4000]); const sold=cost*(100+p)/100, ans=cost*(100+q)/100;
    return {s:'arith',q:bi(`باع متجر غسالة بمبلغ ${arSAR(sold)} فربح ${p}%. كم سيكون ثمن بيعها لو كان ربحه ${q}%؟`,`A shop sold a washing machine for ${sold} SAR at a ${p}% profit. What would its price be at a ${q}% profit?`),o:mkOpts(ans,[sold*(100-p+q)/100,sold-cost*(p-q)/100+cost/20,sold*(100+q)/100,cost]),e:bi(`ثمن الشراء ⟦${sold} ÷ ${(100+p)/100} = ${cost}⟧، ثم ⟦${cost} × ${(100+q)/100} = ${N(ans)}⟧`,`Cost ⟦${sold} ÷ ${(100+p)/100} = ${cost}⟧, then ⟦${cost} × ${(100+q)/100} = ${N(ans)}⟧`)}; },
  joinLeave(){ const a=R(3,7), k=pick([2,3]), b=R(1,a); const ans=a+k*a-b;
    return {s:'arith',q:bi(`في قاعة ${a} طلاب، ثم انضم إليهم ${k===2?'مثلاهم':'ثلاثة أمثالهم'}، وخرج ${b} منهم. كم طالبًا بقي في القاعة؟`,`There are ${a} students in a hall. Then ${k===2?'twice':'three times'} as many join them, and ${b} leave. How many students are left?`),o:mkOpts(ans,[a*k-b,a+k-b,ans+a,ans+b]),e:bi(`⟦${a} + ${k} × ${a} − ${b} = ${ans}⟧`,`⟦${a} + ${k} × ${a} − ${b} = ${ans}⟧`)}; },
  legs(){ const c=pick([2,4,6]), lt=pick([1,4]), lc=pick([3,4]); const per=lt+c*lc, g=R(3,8), legs=per*g, ans=c*g;
    return {s:'arith',q:bi(`في مطعم، للطاولة ${lt===1?'رِجل واحدة':'أربع أرجل'} وللكرسي ${lc===3?'ثلاث أرجل':'أربع أرجل'}، وحول كل طاولة ${c} كراسٍ. إذا كان مجموع الأرجل ${legs}، فكم عدد الكراسي؟`,`In a restaurant a table has ${lt} leg${lt>1?'s':''} and a chair has ${lc} legs, with ${c} chairs around each table. If there are ${legs} legs in all, how many chairs are there?`),o:mkOpts(ans,[g,Math.round(legs/lc),ans+c,legs/(lt+lc)|0]),e:bi(`كل مجموعة: ⟦${lt} + ${c} × ${lc} = ${per}⟧ رِجلًا، وعدد المجموعات ⟦${legs} ÷ ${per} = ${g}⟧، والكراسي ⟦${g} × ${c} = ${ans}⟧`,`Each group: ⟦${lt} + ${c} × ${lc} = ${per}⟧ legs; groups ⟦${legs} ÷ ${per} = ${g}⟧; chairs ⟦${g} × ${c} = ${ans}⟧`)}; },
  debtShares(){ const p=pick([20,25,30]); const rest=50-p; const third=1000*R(2,9); const tot=third*100/rest;
    if(!Number.isInteger(tot)) return RS_A.debtShares();
    return {s:'arith',q:bi(`تقاسم ثلاثة إخوة سداد دين: دفع الأول نصفه، ودفع الثاني ${p}% منه، ودفع الثالث الباقي وهو ${arSAR(third)}. كم مبلغ الدين؟`,`Three brothers paid off a debt: the first paid half, the second paid ${p}%, and the third paid the remaining ${third} SAR. What was the debt?`),o:mkOpts(tot,[third*2,third*100/p,tot/2,third*3]),e:bi(`نصيب الثالث ⟦100% − 50% − ${p}% = ${rest}%⟧، فالدين ⟦${third} ÷ ${rest/100} = ${tot}⟧`,`The third share is ⟦100% − 50% − ${p}% = ${rest}%⟧, so the debt is ⟦${third} ÷ ${rest/100} = ${tot}⟧`)}; },
  parking(){ const h1=R(1,4), m1=pick([5,10,20,35]), dur=R(3,6)*60+pick([10,25,40]); const t2=h1*60+m1+dur, h2=Math.floor(t2/60), m2=t2%60; const fee=pick([2,3,5]); const hrs=Math.ceil(dur/60), ans=hrs*fee;
    const tm=(h,m)=>`${h}:${String(m).padStart(2,'0')}`;
    return {s:'arith',q:bi(`أوقف ماجد سيارته في موقف المطار الساعة ${tm(h1,m1)} مساءً، وأخرجها الساعة ${tm(h2,m2)} مساءً. إذا كانت أجرة الساعة أو جزء منها ${rsSAR(fee)}، فكم يدفع؟`,`Majed parked at the airport at ${tm(h1,m1)} pm and left at ${tm(h2,m2)} pm. If each hour or part of an hour costs ${fee} SAR, how much does he pay?`),o:mkOpts(ans,[(hrs-1)*fee,ans+fee,Math.round(dur/60)*fee===ans?ans+2*fee:Math.round(dur/60)*fee,fee*h2]),e:bi(`المدة ⟦${Math.floor(dur/60)}⟧ ساعات و⟦${dur%60}⟧ دقيقة، فتُحسب ⟦${hrs}⟧ ساعات: ⟦${hrs} × ${fee} = ${ans}⟧`,`The stay is ⟦${Math.floor(dur/60)}⟧ h ⟦${dur%60}⟧ min, charged as ⟦${hrs}⟧ hours: ⟦${hrs} × ${fee} = ${ans}⟧`)}; },
  setsOverlap(){ const both=R(4,15), a=both+R(8,20), b=both+R(5,15), none=R(2,9); const tot=a+b-both+none;
    return {s:'arith',q:bi(`في نادٍ ${tot} مشتركًا، منهم ${a} في كرة القدم و${b} في السباحة، و${none} لا يشتركون في أيٍّ منهما. كم مشتركًا في النشاطين معًا؟`,`A club has ${tot} members: ${a} play football, ${b} swim, and ${none} do neither. How many do both?`),o:mkOpts(both,[a+b-tot,tot-a-b+none,both+none,both*2]),e:bi(`⟦${a} + ${b} + ${none} − ${tot} = ${both}⟧`,`⟦${a} + ${b} + ${none} − ${tot} = ${both}⟧`)}; },
  consecutive(){ const n=pick([3,5]), m=R(6,40); const S=n*m; const big=rnd()<.5; const ans=big?m+(n-1)/2:m-(n-1)/2;
    return {s:'arith',q:bi(`مجموع ${n===3?'ثلاثة':'خمسة'} أعداد صحيحة متتالية ${S}. ما ${big?'أكبرها':'أصغرها'}؟`,`The sum of ${n} consecutive integers is ${S}. What is the ${big?'largest':'smallest'}?`),o:mkOpts(ans,[m,big?ans-(n-1):ans+(n-1),ans+1,ans-1]),e:bi(`الأوسط ⟦${S} ÷ ${n} = ${m}⟧، ${big?'والأكبر':'والأصغر'} ⟦${ans}⟧`,`Middle ⟦${S} ÷ ${n} = ${m}⟧; the ${big?'largest':'smallest'} is ⟦${ans}⟧`)}; },
  ageDouble(){ const son=R(8,30), yrs=R(3,15); const fa=2*(son+yrs)-yrs;
    return {s:'arith',q:bi(`عمر أب ${fa} سنة وعمر ابنه ${son} سنة. بعد كم سنة يصبح عمر الأب مثلي عمر ابنه؟`,`A father is ${fa} and his son is ${son}. In how many years will the father be twice his son's age?`),o:mkOpts(yrs,[fa-2*son,yrs+son-yrs*2>0?yrs+2:yrs+3,fa-son,yrs*2]),e:bi(`⟦${fa} + س = 2(${son} + س)⟧ ⟵ ⟦س = ${fa} − ${2*son} = ${yrs}⟧`,`⟦${fa} + x = 2(${son} + x)⟧ → ⟦x = ${fa} − ${2*son} = ${yrs}⟧`)}; },
  tankFraction(){ const [f1,f2]=pick([[[1,3],[1,2]],[[1,4],[1,2]],[[1,3],[3,4]],[[1,4],[2,3]],[[2,5],[3,5]]]); const den=f1[1]*f2[1]/gcd(f1[1],f2[1]); const diff=f2[0]*den/f2[1]-f1[0]*den/f1[1]; const cap=den*R(2,8)*5; const add=cap*diff/den;
    return {s:'arith',q:bi(`خزان ممتلئ إلى ⟦${f1[0]}/${f1[1]}⟧ سعته، وبعد إضافة ${add} لترًا صار ممتلئًا إلى ⟦${f2[0]}/${f2[1]}⟧ سعته. كم سعة الخزان باللتر؟`,`A tank is ⟦${f1[0]}/${f1[1]}⟧ full. After adding ${add} liters it is ⟦${f2[0]}/${f2[1]}⟧ full. What is its capacity in liters?`),o:mkOpts(cap,[add*2,add*den,cap/2,cap+add]),e:bi(`الفرق ⟦${f2[0]}/${f2[1]} − ${f1[0]}/${f1[1]} = ${fx(diff,den)}⟧ من السعة يساوي ${add}، فالسعة ⟦${add} ÷ ${fx(diff,den)} = ${cap}⟧`,`The difference ⟦${f2[0]}/${f2[1]} − ${f1[0]}/${f1[1]} = ${fx(diff,den)}⟧ of the tank is ${add} L, so capacity ⟦= ${add} ÷ ${fx(diff,den)} = ${cap}⟧`)}; },
  unitRate(){ const [m,s]=pick([[1,20],[1,30],[2,0],[1,15],[2,30],[0,40],[0,45]]); const sec=m*60+s; const ans=3600/sec;
    if(!Number.isInteger(ans)) return RS_A.unitRate();
    const ta=`${m?arC(m,['دقيقة','دقيقتين','دقائق','دقيقة']):''}${m&&s?' و':''}${s?s+' ثانية':''}`, te=`${m?m+' min':''}${m&&s?' ':''}${s?s+' s':''}`;
    return {s:'arith',q:bi(`يقطع قطار كيلومترًا واحدًا في ${ta}. كم كيلومترًا يقطع في الساعة؟`,`A train covers 1 km in ${te}. How many kilometers does it cover in an hour?`),o:mkOpts(ans,[60/(m||1),ans+5,ans-5,ans*1.5]),e:bi(`الكيلومتر في ⟦${sec}⟧ ثانية، والساعة ⟦3600⟧ ثانية: ⟦3600 ÷ ${sec} = ${ans}⟧`,`1 km takes ⟦${sec}⟧ s; an hour is ⟦3600⟧ s: ⟦3600 ÷ ${sec} = ${ans}⟧`)}; },
  saveYear(){ const sal=1000*R(4,15), p=pick([5,10,15,20,25]); const ans=sal*p/100*12;
    return {s:'arith',q:bi(`راتب موظف الشهري ${arSAR(sal)}، ويدّخر منه ${p}%. كم يدّخر في السنة؟`,`An employee earns ${sal} SAR a month and saves ${p}% of it. How much does he save in a year?`),o:mkOpts(ans,[sal*p/100,ans/2,sal*12-ans,ans+sal]),e:bi(`⟦${sal} × ${p/100} × 12 = ${N(ans)}⟧`,`⟦${sal} × ${p/100} × 12 = ${N(ans)}⟧`)}; },
  weightsChain(){ const x=R(2,9), k1=pick([2,3]), k2=pick([2,3]); const b=k1*x, c=k2*b, tot=x+b+c;
    return {s:'arith',q:bi(`مجموع أوزان التمر والقهوة والهيل ${tot} كجم. وزن القهوة ${k1===2?'مثلا':'ثلاثة أمثال'} وزن الهيل، ووزن التمر ${k2===2?'مثلا':'ثلاثة أمثال'} وزن القهوة. كم وزن الهيل؟`,`Dates, coffee and cardamom weigh ${tot} kg in all. Coffee weighs ${k1} times the cardamom, and dates weigh ${k2} times the coffee. How much does the cardamom weigh?`),o:mkOpts(x,[b,c,tot/3|0,x+1]),e:bi(`الهيل س، والقهوة ⟦${k1}س⟧، والتمر ⟦${k1*k2}س⟧: ⟦${1+k1+k1*k2}س = ${tot} → س = ${x}⟧`,`Cardamom x, coffee ⟦${k1}x⟧, dates ⟦${k1*k2}x⟧: ⟦${1+k1+k1*k2}x = ${tot} → x = ${x}⟧`)}; },
  partOfDay(){ const p=pick([20,25,40,50]); const d1=100*R(1,6)*(p===40?1:1); const d2=d1*p/100; const ans=d1+d2;
    return {s:'arith',q:bi(`أنتج مخبز ${d2} رغيفًا في اليوم الثاني، وهذا يمثل ${p}% من إنتاجه في اليوم الأول. كم مجموع إنتاج اليومين؟`,`A bakery made ${d2} loaves on day two, which is ${p}% of what it made on day one. How many loaves did it make on the two days?`),o:mkOpts(ans,[d1,d2*2,d2+d2*p/100,ans+d2]),e:bi(`اليوم الأول ⟦${d2} ÷ ${p/100} = ${d1}⟧، والمجموع ⟦${d1} + ${d2} = ${ans}⟧`,`Day one ⟦${d2} ÷ ${p/100} = ${d1}⟧; total ⟦${d1} + ${d2} = ${ans}⟧`)}; },
  workersWeek(){ const per=pick([10,12,15,20]), w=R(3,12), days=pick([5,6,7]); const tot=per*w*days;
    return {s:'arith',q:bi(`يصنع العامل ${per} قطعة في اليوم. كم عاملًا يلزم لصنع ${tot} قطعة في ${arC(days,['يوم','يومين','أيام','يومًا'])}؟`,`One worker makes ${per} pieces a day. How many workers are needed to make ${tot} pieces in ${days} days?`),o:mkOpts(w,[tot/per,w+2,w*days,tot/(per*7)|0]),e:bi(`⟦${tot} ÷ (${per} × ${days}) = ${w}⟧`,`⟦${tot} ÷ (${per} × ${days}) = ${w}⟧`)}; },
  pageDigits(){ const pages=R(40,180); const dig=pages<10?pages:pages<100?9+2*(pages-9):9+180+3*(pages-99);
    return {s:'arith',q:bi(`رُقّمت صفحات كتاب بدءًا من الصفحة ١، فاستُخدم في الترقيم ${dig} رقمًا. كم عدد صفحات الكتاب؟`,`A book's pages are numbered from 1, using ${dig} digits in all. How many pages does it have?`),o:mkOpts(pages,[Math.round(dig/2),Math.round(dig/3),pages+9,pages-9]),e:bi(pages<100?`الصفحات ١–٩ تستهلك ⟦9⟧ أرقام، والباقي ⟦(${dig} − 9) ÷ 2 = ${pages-9}⟧ صفحة: ⟦9 + ${pages-9} = ${pages}⟧`:`١–٩: ⟦9⟧ أرقام، ١٠–٩٩: ⟦180⟧ رقمًا، والباقي ⟦(${dig} − 189) ÷ 3 = ${pages-99}⟧: ⟦99 + ${pages-99} = ${pages}⟧`,pages<100?`Pages 1–9 use ⟦9⟧ digits; the rest ⟦(${dig} − 9) ÷ 2 = ${pages-9}⟧ pages: ⟦9 + ${pages-9} = ${pages}⟧`:`1–9: ⟦9⟧ digits, 10–99: ⟦180⟧; the rest ⟦(${dig} − 189) ÷ 3 = ${pages-99}⟧: ⟦99 + ${pages-99} = ${pages}⟧`)}; },
  notesRatio(){ const r=pick([[1,3,4],[2,3,5],[1,2,5],[3,4,5]]); const k=R(3,9); const cnt=k*(r[0]+r[1]+r[2]); const ans=500*r[0]*k;
    return {s:'arith',q:bi(`${cnt} ورقة نقدية من فئات ٥٠٠ و٢٠٠ و١٠٠ ريال، أعدادها بنسبة ${r.join(' : ')} على الترتيب. كم قيمة أوراق فئة ٥٠٠ ريال؟`,`${cnt} banknotes of 500, 200 and 100 SAR are in the ratio ${r.join(' : ')} respectively. What is the total value of the 500 SAR notes?`),o:mkOpts(ans,[500*r[0],ans*2,200*r[1]*k,ans+500]),e:bi(`الجزء ⟦${cnt} ÷ ${r[0]+r[1]+r[2]} = ${k}⟧، أوراق ٥٠٠: ⟦${r[0]} × ${k} = ${r[0]*k}⟧، قيمتها ⟦${ans}⟧`,`One part ⟦${cnt} ÷ ${r[0]+r[1]+r[2]} = ${k}⟧; 500-notes ⟦${r[0]} × ${k} = ${r[0]*k}⟧, worth ⟦${ans}⟧`)}; },
  upDown(){ const [u,d]=pick([[50,20],[50,25],[20,20],[25,20],[100,50],[10,10],[40,25]]); const ans=(100+u)*(100-d)/100;
    return {s:'arith',q:bi(`ارتفع سعر سلعة ${u}% ثم انخفض ${d}%. كم يمثل السعر الجديد من السعر الأصلي؟`,`An item's price rose ${u}% then fell ${d}%. The new price is what percent of the original?`),o:mkOpts(ans,[100+u-d,100,ans+5,ans-5],x=>N(x)+'%'),e:bi(`⟦${(100+u)/100} × ${(100-d)/100} = ${ans/100}⟧ أي ⟦${N(ans)}%⟧`,`⟦${(100+u)/100} × ${(100-d)/100} = ${ans/100}⟧, i.e. ⟦${N(ans)}%⟧`)}; }
};
const RS_C={
  pctSwap(){ const a=pick([20,30,40,60,70]), b=pick([30,40,50,80,90]); const swap=rnd()<.6; const b2=swap?b:b+10; const A=a*b2/100, B=b*a/100;
    return {s:'comparison',cmp:1,q:bi(`القيمة الأولى: ${a}% من ${b2}<br>القيمة الثانية: ${b}% من ${a}`,`Quantity A: ${a}% of ${b2}<br>Quantity B: ${b}% of ${a}`),a:rsCmp(A,B),e:bi(`⟦${N(A)}⟧ مقابل ⟦${N(B)}⟧`,`⟦${N(A)}⟧ vs ⟦${N(B)}⟧`)}; },
  timeUnits(){ const d=R(2,4); const h=24*d+pick([-24,0,0,12]); const A=d*24;
    return {s:'comparison',cmp:1,q:bi(`القيمة الأولى: ${arC(d,['يوم','يومان','أيام','يومًا'])}<br>القيمة الثانية: ${h} ساعة`,`Quantity A: ${d} days<br>Quantity B: ${h} hours`),a:rsCmp(A,h),e:bi(`⟦${d} × 24 = ${A}⟧ ساعة`,`⟦${d} × 24 = ${A}⟧ hours`)}; },
  polyVsCircle(){ const n=pick([4,5,6,7,8]), s=R(1,6), r=R(1,6); const A=n*s, B=2*Math.PI*r; const nm={4:['مربع','square'],5:['خماسي منتظم','regular pentagon'],6:['سداسي منتظم','regular hexagon'],7:['سباعي منتظم','regular heptagon'],8:['ثماني منتظم','regular octagon']}[n];
    return {s:'comparison',cmp:1,q:bi(`القيمة الأولى: محيط ${nm[0]} طول ضلعه ${s} سم<br>القيمة الثانية: محيط دائرة نصف قطرها ${r} سم`,`Quantity A: perimeter of a ${nm[1]} with side ${s} cm<br>Quantity B: circumference of a circle with radius ${r} cm`),a:rsCmp(A,B),e:bi(`⟦${n} × ${s} = ${A}⟧ مقابل ⟦2π × ${r} ≈ ${N(B)}⟧`,`⟦${n} × ${s} = ${A}⟧ vs ⟦2π × ${r} ≈ ${N(B)}⟧`)}; },
  sameP(){ const s=R(4,12), d=R(1,s-1); const l=s+d, w=s-d;
    return {s:'comparison',cmp:1,q:bi(`مربع ومستطيل لهما المحيط نفسه ⟦${4*s}⟧ سم، وطول المستطيل ⟦${l}⟧ سم.<br>القيمة الأولى: مساحة المربع<br>القيمة الثانية: مساحة المستطيل`,`A square and a rectangle both have perimeter ⟦${4*s}⟧ cm; the rectangle is ⟦${l}⟧ cm long.<br>Quantity A: area of the square<br>Quantity B: area of the rectangle`),a:0,e:bi(`المربع ⟦${s}^2 = ${s*s}⟧، والمستطيل ⟦${l} × ${w} = ${l*w}⟧`,`Square ⟦${s}^2 = ${s*s}⟧; rectangle ⟦${l} × ${w} = ${l*w}⟧`)}; },
  ratioChain(){ const [a,b]=pick([[2,5],[3,4],[1,3],[2,3]]); const [c,d]=pick([[7,3],[5,2],[4,3],[3,1]]); const k=R(2,6)*c; const W=a*k, M=b*k, C=M*d/c; if(!Number.isInteger(C)) return RS_C.ratioChain(); const v=C+pick([-5,0,5]);
    return {s:'comparison',cmp:1,q:bi(`نسبة النساء إلى الرجال في حفل ${a} : ${b}، وعدد النساء ${W}، ونسبة الرجال إلى الأطفال ${c} : ${d}.<br>القيمة الأولى: عدد الأطفال<br>القيمة الثانية: ${v}`,`At an event, women to men is ${a} : ${b}, there are ${W} women, and men to children is ${c} : ${d}.<br>Quantity A: number of children<br>Quantity B: ${v}`),a:rsCmp(C,v),e:bi(`الرجال ⟦${W} × ${b}/${a} = ${M}⟧، والأطفال ⟦${M} × ${d}/${c} = ${C}⟧`,`Men ⟦${W} × ${b}/${a} = ${M}⟧; children ⟦${M} × ${d}/${c} = ${C}⟧`)}; },
  fracPower(){ const t=R(0,4);
    if(t===3){ const a=pick([2,3,4,5]), b=pick([2,3,4]); return {s:'comparison',cmp:1,q:bi(`⟦س > 1⟧<br>القيمة الأولى: ⟦س^${a+b}⟧<br>القيمة الثانية: ⟦س^${a} × س^${b}⟧`,`⟦x > 1⟧<br>Quantity A: ⟦x^${a+b}⟧<br>Quantity B: ⟦x^${a} × x^${b}⟧`),a:2,e:bi(`⟦س^${a} × س^${b} = س^${a+b}⟧`,`⟦x^${a} × x^${b} = x^${a+b}⟧`)}; }
    if(t===4){ const m=pick([2,3,4,5,6]); return {s:'comparison',cmp:1,q:bi(`⟦س⟧ عدد صحيح موجب<br>القيمة الأولى: ⟦${m}س⟧<br>القيمة الثانية: ⟦س + ${m}⟧`,`⟦x⟧ is a positive integer<br>Quantity A: ⟦${m}x⟧<br>Quantity B: ⟦x + ${m}⟧`),a:3,e:bi(`عند ⟦س = 1⟧ الثانية أكبر، وعند ⟦س = ${m+2}⟧ الأولى أكبر`,`At ⟦x = 1⟧ B is greater; at ⟦x = ${m+2}⟧ A is greater`)}; }
    if(t===0) return {s:'comparison',cmp:1,q:bi(`⟦0 < س < 1⟧<br>القيمة الأولى: ⟦س^2⟧<br>القيمة الثانية: ⟦س^3⟧`,`⟦0 < x < 1⟧<br>Quantity A: ⟦x^2⟧<br>Quantity B: ⟦x^3⟧`),a:0,e:bi(`العدد بين ⟦0⟧ و⟦1⟧ يصغر كلما رفعناه لأس أكبر: عند ⟦س = 1/2⟧: ⟦1/4 > 1/8⟧`,`A number between ⟦0⟧ and ⟦1⟧ shrinks with higher powers: at ⟦x = 1/2⟧, ⟦1/4 > 1/8⟧`)};
    if(t===1) return {s:'comparison',cmp:1,q:bi(`⟦س > 0⟧<br>القيمة الأولى: ⟦(0.3)^س⟧<br>القيمة الثانية: ⟦0.3⟧`,`⟦x > 0⟧<br>Quantity A: ⟦(0.3)^x⟧<br>Quantity B: ⟦0.3⟧`),a:3,e:bi(`عند ⟦س = 1⟧ تتساويان، وعند ⟦س = 2⟧ الثانية أكبر`,`At ⟦x = 1⟧ they are equal; at ⟦x = 2⟧ B is greater`)};
    return {s:'comparison',cmp:1,q:bi(`⟦س < 0 < ص⟧<br>القيمة الأولى: ⟦س × ص⟧<br>القيمة الثانية: ⟦0⟧`,`⟦x < 0 < y⟧<br>Quantity A: ⟦x × y⟧<br>Quantity B: ⟦0⟧`),a:1,e:bi(`سالب × موجب = سالب`,`Negative × positive = negative`)}; },
  offers(){ const d1=100*R(5,12), m1=50*R(4,8), d2=d1+100*R(3,8), m2=m1-50*R(1,3); const n=pick([6,10,12]); const A=d1+m1*n, B=d2+m2*n;
    return {s:'comparison',cmp:1,q:bi(`عرضان لشراء جهاز بالتقسيط على ${n} أشهر:<br>العرض الأول: دفعة أولى ${d1} ريال و${m1} ريالًا شهريًا<br>العرض الثاني: دفعة أولى ${d2} ريال و${m2} ريالًا شهريًا<br>القيمة الأولى: إجمالي العرض الأول<br>القيمة الثانية: إجمالي العرض الثاني`,`Two ${n}-month installment offers:<br>Offer 1: ${d1} SAR down and ${m1} SAR a month<br>Offer 2: ${d2} SAR down and ${m2} SAR a month<br>Quantity A: total of offer 1<br>Quantity B: total of offer 2`),a:rsCmp(A,B),e:bi(`⟦${d1} + ${m1} × ${n} = ${A}⟧ ، ⟦${d2} + ${m2} × ${n} = ${B}⟧`,`⟦${d1} + ${m1} × ${n} = ${A}⟧, ⟦${d2} + ${m2} × ${n} = ${B}⟧`)}; }
};
const RS_G={
  wire(){ const s=3*R(2,12); const ans=4*s/3;
    const f=FG(`<rect x="20" y="35" width="80" height="80"/>${FT(60,128,s)}<path d="M112 75h18m-6-6 6 6-6 6"/><polygon points="145,115 205,115 175,63"/>${FT(175,128,'?')}`);
    return {s:'geometry',q:bi(`${f}سلك شُكّل مربعًا طول ضلعه ${s} سم، ثم أعيد تشكيله مثلثًا متطابق الأضلاع. ما طول ضلع المثلث؟`,`${f}A wire forms a square with side ${s} cm, then is reshaped into an equilateral triangle. What is the triangle's side?`),o:mkOpts(ans,[s,s*3/4,4*s,ans+2]),e:bi(`طول السلك ⟦4 × ${s} = ${4*s}⟧، والضلع ⟦${4*s} ÷ 3 = ${N(ans)}⟧`,`Wire ⟦4 × ${s} = ${4*s}⟧; side ⟦${4*s} ÷ 3 = ${N(ans)}⟧`)}; },
  rectWidth(){ const l=R(5,15), w=R(2,l-1); const P=2*(l+w);
    const f=FG(`<rect x="35" y="35" width="150" height="75"/>${FT(110,124,l)}${FT(24,73,'?')}`);
    return {s:'geometry',q:bi(`${f}مستطيل محيطه ${P} سم وطوله ${l} سم. ما عرضه؟`,`${f}A rectangle has perimeter ${P} cm and length ${l} cm. What is its width?`),o:mkOpts(w,[P-l,P/2,P/2-l+1,l-w]),e:bi(`⟦${P} ÷ 2 − ${l} = ${w}⟧`,`⟦${P} ÷ 2 − ${l} = ${w}⟧`)}; },
  polyAngles(){ const n=pick([5,6,8,9,10,12]); const sum=(n-2)*180, each=sum/n; const f=FG(`<polygon points="${regPoly(n,110,75,60)}"/>`); const nm={5:'خماسي',6:'سداسي',8:'ثماني',9:'تساعي',10:'عشاري',12:'مضلع منتظم له ١٢ ضلعًا'}[n]; const reg=rnd()<.5;
    if(reg) return {s:'geometry',q:bi(`${f}ما قياس الزاوية الداخلية في ${n===12?nm:nm+' منتظم'}؟`,`${f}What is each interior angle of a regular ${n}-sided polygon?`),o:mkOpts(each,[360/n,180-each,sum,each+10],x=>N(x)+'°'),e:bi(`⟦(${n} − 2) × 180 ÷ ${n} = ${N(each)}°⟧`,`⟦(${n} − 2) × 180 ÷ ${n} = ${N(each)}°⟧`)};
    return {s:'geometry',q:bi(`${f}ما مجموع قياسات الزوايا الداخلية ${n===12?'لمضلع له ١٢ ضلعًا':'لشكل '+nm}؟`,`${f}What is the sum of the interior angles of a ${n}-sided polygon?`),o:mkOpts(sum,[n*180,360,sum+180,sum-180],x=>N(x)+'°'),e:bi(`⟦(${n} − 2) × 180 = ${sum}°⟧`,`⟦(${n} − 2) × 180 = ${sum}°⟧`)}; },
  cubeHole(){ const a=pick([2,3,4,5]), b=R(1,a-1); const ans=a**3-b**3; const cb=(x,y,w,d,sh)=>`<g ${sh?SH:''}><rect x="${x}" y="${y}" width="${w}" height="${w}"/><path d="M${x} ${y}l${d} -${d}h${w}l-${d} ${d}M${x+w} ${y}l${d} -${d}v${w}l-${d} ${d}"/></g>`; const w2=Math.round(90*b/a);
    const f=FG(`${cb(50,40,90,30,false)}${cb(55,130-w2,w2,Math.round(w2/3),true)}${FT(95,142,a)}${FT(55+w2/2,122-w2,b)}`);
    return {s:'geometry',q:bi(`${f}صندوق مكعب طول حرفه ${a} سم، وُضع داخله مكعب طول حرفه ${b} سم. ما الحجم المتبقي من الصندوق بالسنتيمتر المكعب؟`,`${f}A cube box has edge ${a} cm; a cube of edge ${b} cm is placed inside. What volume is left in cm³?`),o:mkOpts(ans,[(a-b)**3,a**3,a*a-b*b,ans+b]),e:bi(`⟦${a}^3 − ${b}^3 = ${a**3} − ${b**3} = ${ans}⟧`,`⟦${a}^3 − ${b}^3 = ${a**3} − ${b**3} = ${ans}⟧`)}; },
  squareCircle(){ const s=2*R(2,10); const r=s/2; const A=s*s, B=r*r; const corners=rnd()<.5;
    const f=corners?FG(`<rect x="60" y="20" width="110" height="110" ${SH}/><path d="M60 75A55 55 0 0 0 115 20L60 20Z M170 75A55 55 0 0 1 115 20L170 20Z M60 75A55 55 0 0 1 115 130L60 130Z M170 75A55 55 0 0 0 115 130L170 130Z" fill="var(--paper,#fff)"/><rect x="60" y="20" width="110" height="110"/>${FT(115,142,s)}`):FG(`<rect x="60" y="20" width="110" height="110" ${SH}/><circle cx="115" cy="75" r="55" fill="var(--paper,#fff)"/>${FT(115,142,s)}`);
    const opt=(a,b)=>`⟦${a} − ${b}π⟧`; const o=[opt(A,B),opt(A,2*B),opt(A,4*B),`⟦${B}π − ${A}⟧`];
    return {s:'geometry',q:corners?bi(`${f}مربع طول ضلعه ${s} سم، رُسم عند كل رأس من رؤوسه ربع دائرة مركزها الرأس ونصف قطرها ${r} سم. ما مساحة الجزء من المربع خارج الأرباع الأربعة؟`,`${f}A square has side ${s} cm. At each corner a quarter circle is drawn, centred at the corner, with radius ${r} cm. What is the area of the square outside the four quarters?`):bi(`${f}دائرة مرسومة داخل مربع طول ضلعه ${s} سم وتمس أضلاعه الأربعة. ما مساحة الجزء من المربع خارج الدائرة؟`,`${f}A circle is drawn inside a square of side ${s} cm, touching all four sides. What is the area of the square outside the circle?`),o,e:bi(`نصف القطر ⟦${r}⟧: ⟦${s}^2 − π × ${r}^2 = ${A} − ${B}π⟧`,`Radius ⟦${r}⟧: ⟦${s}^2 − π × ${r}^2 = ${A} − ${B}π⟧`)}; },
  triBase(){ const k=pick([2,3,4]), h=R(2,6); const b=k*h, A=b*h/2; const f=FG(`<polygon points="25,125 195,125 80,40"/><path d="M80 40V125" stroke-dasharray="5 4"/><path d="M80 115h10v10"/>${FT(110,140,'?')}`);
    return {s:'geometry',q:bi(`${f}قاعدة مثلث ${k===2?'مثلا':k===3?'ثلاثة أمثال':'أربعة أمثال'} ارتفاعه، ومساحته ${A} سم². ما طول قاعدته؟`,`${f}A triangle's base is ${k} times its height, and its area is ${A} cm². What is the base?`),o:mkOpts(b,[h,A/k,2*A/h|0===b?b+k:2*A/h,b*2]),e:bi(`⟦(${k}ع × ع) ÷ 2 = ${A} → ع^2 = ${h*h} → ع = ${h}⟧، والقاعدة ⟦${b}⟧`,`⟦(${k}h × h) ÷ 2 = ${A} → h^2 = ${h*h} → h = ${h}⟧, base ⟦${b}⟧`)}; },
  chords(){ const [a,b,c]=pick([[6,8,10],[10,24,26],[12,16,20],[16,30,34],[18,24,30]]); const ans=c/2;
    const ca=a/c, sa=b/c, P=[50+120*ca*ca,75-120*ca*sa].map(v=>+v.toFixed(1));
    const f=FG(`<circle cx="110" cy="75" r="60"/><path d="M50 75L${P[0]} ${P[1]}L170 75"/><circle cx="110" cy="75" r="2.5" fill="currentColor"/>${FT((50+P[0])/2-12,(75+P[1])/2-6,a)}${FT((170+P[0])/2+12,(75+P[1])/2-6,b)}`);
    return {s:'geometry',q:bi(`${f}وتران في دائرة يبدآن من نقطة واحدة عليها والزاوية بينهما قائمة، طولاهما ${a} سم و${b} سم. ما طول نصف قطر الدائرة؟`,`${f}Two chords start at the same point of a circle at a right angle, with lengths ${a} cm and ${b} cm. What is the radius?`),o:mkOpts(ans,[c,(a+b)/2,ans+1,b/2]),e:bi(`الزاوية المحيطية القائمة تقابل قطرًا: ⟦√(${a*a} + ${b*b}) = ${c}⟧، ونصف القطر ⟦${ans}⟧`,`A right inscribed angle stands on a diameter: ⟦√(${a*a} + ${b*b}) = ${c}⟧, radius ⟦${ans}⟧`)}; },
  rugs(){ const r=pick([1,1.5,2]), a=R(3,6)*2*r+pick([0,r]), b=R(2,4)*2*r+pick([0,r]); const ans=Math.floor(a/(2*r))*Math.floor(b/(2*r));
    const W=180, H=Math.max(60,Math.min(120,Math.round(180*b/a))), rr=Math.min(W*r/a,H*r/b);
    const f=FG(`<rect x="20" y="15" width="${W}" height="${H}"/><circle cx="${(20+rr).toFixed(1)}" cy="${(15+rr).toFixed(1)}" r="${rr.toFixed(1)}" ${SH}/>${FT(110,H+28,N(a))}${FT(205,15+H/2,N(b),'start')}`,`0 0 230 ${H+40}`);
    return {s:'geometry',q:bi(`${f}غرفة أبعادها ${N(a)} م × ${N(b)} م. ما أكبر عدد من السجاجيد الدائرية نصف قطر كل منها ${N(r)} م يمكن فرشها دون تداخل؟`,`${f}A room measures ${N(a)} m × ${N(b)} m. What is the largest number of round rugs of radius ${N(r)} m that fit without overlapping?`),o:mkOpts(ans,[Math.floor(a*b/(Math.PI*r*r)),Math.floor(a*b/(4*r*r))===ans?ans+2:Math.floor(a*b/(4*r*r)),ans-1,ans+1]),e:bi(`القطر ⟦${N(2*r)}⟧ م: ⟦${Math.floor(a/(2*r))} × ${Math.floor(b/(2*r))} = ${ans}⟧`,`Diameter ⟦${N(2*r)}⟧ m: ⟦${Math.floor(a/(2*r))} × ${Math.floor(b/(2*r))} = ${ans}⟧`)}; },
  sector(){ const r=pick([2,3,4,6]), th=pick([45,90,120,135,270]); const ans=th*r*r/360; const t2=th*Math.PI/180, ex=(110+60*Math.cos(-t2)).toFixed(1), ey=(75+60*Math.sin(-t2)).toFixed(1);
    const f=FG(`<circle cx="110" cy="75" r="60"/><path d="M110 75L170 75A60 60 0 ${th>180?1:0} 0 ${ex} ${ey}Z" ${SH}/>${FT(140,85,r)}${FT(124,62,th+'°','start')}`);
    return {s:'geometry',q:bi(`${f}دائرة نصف قطرها ${r} سم، والزاوية المركزية لقطاع منها ${th}°. ما مساحة القطاع؟`,`${f}A circle has radius ${r} cm. A sector has a central angle of ${th}°. What is the sector's area?`),o:mkOpts(ans,[r*r,ans*2,th*2*r/360,ans+1],x=>`⟦${N(x)}π⟧`),e:bi(`⟦${th}/360 × π × ${r}^2 = ${N(ans)}π⟧`,`⟦${th}/360 × π × ${r}^2 = ${N(ans)}π⟧`)}; }
};
Object.assign(RS_G,{
  exterior(){ const a=R(30,75), b=R(30,80); const ans=a+b; const fl=l=>FG(`<polygon points="40,120 150,120 85,35"/><path d="M150 120H205"/>${FT(58,108,a+'°')}${FT(86,55,b+'°')}${FT(170,108,xv(l))}`);
    return {s:'geometry',q:bi(`${fl('ar')}في الشكل، ما قياس الزاوية الخارجية س؟`,`${fl('en')}In the figure, what is the exterior angle x?`),o:mkOpts(ans,[180-ans,180-a,180-b,ans+10],x=>N(x)+'°'),e:bi(`الزاوية الخارجية = مجموع الداخليتين البعيدتين: ⟦${a} + ${b} = ${ans}°⟧`,`An exterior angle equals the two remote interior angles: ⟦${a} + ${b} = ${ans}°⟧`)}; },
  isosceles(){ const top=2*R(10,40); const ans=(180-top)/2; const fl=l=>FG(`<polygon points="50,125 170,125 110,30"/><path d="M75 75l8 4M145 75l-8 4"/>${FT(110,52,top+'°')}${FT(70,113,xv(l))}`);
    return {s:'geometry',q:bi(`${fl('ar')}مثلث متطابق الضلعين، قياس زاوية رأسه ${top}°. ما قياس الزاوية س؟`,`${fl('en')}An isosceles triangle has a ${top}° apex angle. What is angle x?`),o:mkOpts(ans,[180-top,top,ans+10,90-top/2===ans?ans-10:90-top/2],x=>N(x)+'°'),e:bi(`⟦(180 − ${top}) ÷ 2 = ${ans}°⟧`,`⟦(180 − ${top}) ÷ 2 = ${ans}°⟧`)}; }
});
/* one table, two questions; the section takes its name from the table */
const RS_D={
  budget(o){ const th=[['معهد تدريب','a training institute'],['مستشفى','a hospital'],['نادٍ رياضي','a sports club'],['مكتبة عامة','a public library']][o%4];
    const yrs=[1441,1442,1443,1444,1445]; let v=[R(4,8)*100]; for(let i=1;i<5;i++) v.push(v[i-1]+pick([-100,100,100,200,200,300]));
    let i=R(0,3), j=i+1; while(v[j]<=v[i]&&j<4){ i=R(0,3); j=i+1; } if(v[j]<=v[i]){ v[j]=v[i]+100; }
    const pct=Math.round((v[j]-v[i])/v[i]*1000)/10, avg=(v[0]+v[1]+v[2])/3;
    const tA=rsTbl(['العام','الميزانية (ألف ريال)'],yrs.map((y,k)=>[y,v[k]])), tE=rsTbl(['Year','Budget (thousand SAR)'],yrs.map((y,k)=>[y,v[k]]));
    return {name:bi(`ميزانية ${th[0]}`,`The budget of ${th[1]}`),qs:[
      {s:'stats',q:bi(`يبيّن الجدول ميزانية ${th[0]} في خمسة أعوام.<br>${tA}ما نسبة الزيادة في الميزانية من عام ${yrs[i]} إلى عام ${yrs[j]}؟`,`The table shows the budget of ${th[1]} over five years.<br>${tE}What is the percent increase from ${yrs[i]} to ${yrs[j]}?`),o:mkOpts(pct,[Math.round((v[j]-v[i])/v[j]*1000)/10,(v[j]-v[i])/10,pct*2,Math.round(pct/2*10)/10],x=>N(x)+'%'),e:bi(`⟦(${v[j]} − ${v[i]}) ÷ ${v[i]} × 100 ≈ ${pct}%⟧`,`⟦(${v[j]} − ${v[i]}) ÷ ${v[i]} × 100 ≈ ${pct}%⟧`)},
      {s:'stats',q:bi(`يبيّن الجدول ميزانية ${th[0]} في خمسة أعوام.<br>${tA}ما متوسط الميزانية في الأعوام الثلاثة الأولى؟`,`The table shows the budget of ${th[1]} over five years.<br>${tE}What is the mean budget over the first three years?`),o:mkOpts(Math.round(avg*10)/10,[(v[0]+v[1]+v[2]+v[3]+v[4])/5,v[1],v[0]+v[1]+v[2],avg+50]),e:bi(`⟦(${v[0]} + ${v[1]} + ${v[2]}) ÷ 3 ≈ ${N(avg)}⟧`,`⟦(${v[0]} + ${v[1]} + ${v[2]}) ÷ 3 ≈ ${N(avg)}⟧`)}]}; },
  factory(o){ const th=[['قوارير الماء','water bottles'],['علب العصير','juice cans'],['أكياس القهوة','coffee bags'],['أطباق البيض','egg trays']][o%4]; const m=[R(4,9)*10]; for(let i=1;i<4;i++) m.push(m[i-1]+pick([10,20,30,-10]));
    const bad=pick([10,20,25]), price=pick([2,3,5]); const k=R(0,3); const good=m[k]*(100-bad)/100, rev=good*price*1000;
    let best=1; for(let i=2;i<4;i++) if(m[i]-m[i-1]>m[best]-m[best-1]) best=i; if(m.filter((x,i)=>i&&x-m[i-1]===m[best]-m[best-1]).length>1){ m[3]=m[2]+40; best=3; }
    const MA=['الأول','الثاني','الثالث','الرابع'], ME=['1st','2nd','3rd','4th'];
    const tA=rsTbl(['الشهر','الإنتاج (بالآلاف)'],m.map((x,i)=>[MA[i],x])), tE=rsTbl(['Month','Output (thousands)'],m.map((x,i)=>[ME[i],x]));
    return {name:bi(`مصنع ${th[0]}`,`The ${th[1]} factory`),qs:[
      {s:'stats',q:bi(`يبيّن الجدول إنتاج مصنع من ${th[0]} في أربعة أشهر. ${bad}% من الإنتاج تالف، وتُباع الوحدة السليمة بـ ${rsSAR(price)}.<br>${tA}كم ريالًا يبلغ ثمن الإنتاج السليم في الشهر ${MA[k]}؟`,`The table shows a factory's output of ${th[1]} over four months. ${bad}% of the output is damaged; each good unit sells for ${price} SAR.<br>${tE}What is the value of the good output in the ${ME[k]} month?`),o:mkOpts(rev,[m[k]*price*1000,rev/1000,m[k]*bad/100*price*1000,rev+price*1000]),e:bi(`السليم ⟦${m[k]} × ${(100-bad)/100} = ${N(good)}⟧ ألفًا، وثمنه ⟦${N(good)} × 1000 × ${price} = ${N(rev)}⟧`,`Good units ⟦${m[k]} × ${(100-bad)/100} = ${N(good)}⟧ thousand, worth ⟦${N(good)} × 1000 × ${price} = ${N(rev)}⟧`)},
      {s:'stats',q:bi(`يبيّن الجدول إنتاج مصنع من ${th[0]} في أربعة أشهر.<br>${tA}في أي شهر كانت الزيادة عن الشهر الذي قبله أكبر؟`,`The table shows a factory's output of ${th[1]} over four months.<br>${tE}In which month was the rise over the previous month largest?`),o:[MA[best],...MA.filter((_,i)=>i!==best)].map((x,i)=>bi(x,[ME[best],...ME.filter((_,j)=>j!==best)][i])),e:bi(`الفروق: ${m.slice(1).map((x,i)=>`⟦${x-m[i]}⟧`).join('، ')}`,`Differences: ${m.slice(1).map((x,i)=>`⟦${x-m[i]}⟧`).join(', ')}`)}]}; },
  fuel(o){ const cars=['أ','ب','ج','د','هـ'], carsE=['A','B','C','D','E']; const kml=shuffle([8,10,12,14,16,9,11,15]).slice(0,5); const lo=kml.indexOf(Math.min(...kml)); const k=R(0,4); const dist=kml[k]*pick([20,25,30,40]); const lit=dist/kml[k];
    const tA=rsTbl(['السيارة','كم لكل لتر'],cars.map((c,i)=>[c,kml[i]])), tE=rsTbl(['Car','km per liter'],carsE.map((c,i)=>[c,kml[i]]));
    const ord=[lo,...[0,1,2,3,4].filter(i=>i!==lo)].slice(0,4);
    const th=[['استهلاك الوقود','Fuel use'],['سيارات الأجرة','The taxi fleet'],['حافلات المدارس','School buses'],['سيارات الشركة','Company cars']][o%4];
    return {name:bi(th[0],th[1]),qs:[
      {s:'stats',q:bi(`يبيّن الجدول عدد الكيلومترات التي تقطعها كل سيارة باللتر الواحد.<br>${tA}أي السيارات أقل توفيرًا في استهلاك الوقود؟`,`The table shows how many kilometers each car covers per liter.<br>${tE}Which car is the least fuel-efficient?`),o:ord.map(i=>bi(`السيارة ${cars[i]}`,`Car ${carsE[i]}`)),e:bi(`الأقل كيلومترات لكل لتر هي الأقل توفيرًا: ⟦${kml[lo]}⟧`,`Fewest km per liter is least efficient: ⟦${kml[lo]}⟧`)},
      {s:'stats',q:bi(`يبيّن الجدول عدد الكيلومترات التي تقطعها كل سيارة باللتر الواحد.<br>${tA}كم لترًا تحتاج السيارة ${cars[k]} لقطع ${dist} كم؟`,`The table shows how many kilometers each car covers per liter.<br>${tE}How many liters does car ${carsE[k]} need for ${dist} km?`),o:mkOpts(lit,[dist/10,lit+5,lit*2,lit-5]),e:bi(`⟦${dist} ÷ ${kml[k]} = ${lit}⟧`,`⟦${dist} ÷ ${kml[k]} = ${lit}⟧`)}]}; },
  expenses(o){ const who=[['سلمان','Salman'],['فيصل','Faisal'],['عبدالله','Abdullah'],['تركي','Turki']][o%4]; let p=[30,20,15,10,10,15]; p=shuffle(p); const catA=['الإيجار','الطعام','المواصلات','الفواتير','الترفيه','التعليم'], catE=['Rent','Food','Transport','Bills','Leisure','Education'];
    const inc=1000*pick([6,8,10,12]); const k=R(0,5); const amt=inc*p[k]/100; const j=(k+R(1,5))%6; const ratio=p[j]/p[k];
    const tA=rsTbl(['البند','النسبة'],catA.map((c,i)=>[c,p[i]+'%'])), tE=rsTbl(['Item','Share'],catE.map((c,i)=>[c,p[i]+'%']));
    return {name:bi(`مصروفات ${who[0]}`,`${who[1]}'s spending`),qs:[
      {s:'stats',q:bi(`يبيّن الجدول توزيع مصروفات ${who[0]} الشهرية، ومجموعها ${arSAR(inc)}.<br>${tA}كم ريالًا يصرف على ${catA[k]}؟`,`The table shows how ${who[1]} splits a monthly spending of ${inc} SAR.<br>${tE}How much goes to ${catE[k].toLowerCase()}?`),o:mkOpts(amt,[p[k]*10,inc/6,amt*2,amt+500]),e:bi(`⟦${inc} × ${p[k]/100} = ${N(amt)}⟧`,`⟦${inc} × ${p[k]/100} = ${N(amt)}⟧`)},
      {s:'stats',q:bi(`يبيّن الجدول توزيع مصروفات ${who[0]} الشهرية.<br>${tA}ما نسبة ما يصرفه على ${catA[j]} إلى ما يصرفه على ${catA[k]}؟`,`The table shows how ${who[1]} splits his monthly spending.<br>${tE}What is the ratio of ${catE[j].toLowerCase()} to ${catE[k].toLowerCase()}?`),o:[fx(p[j],p[k]),fx(p[k],p[j]),fx(p[j],100),fx(p[j]+5,p[k])].filter((x,i,a)=>a.indexOf(x)===i).concat(['1/2','3/4','2/3']).filter((x,i,a)=>a.indexOf(x)===i).slice(0,4).map(x=>`⟦${x}⟧`),e:bi(`⟦${p[j]} : ${p[k]} = ${fx(p[j],p[k])}⟧`,`⟦${p[j]} : ${p[k]} = ${fx(p[j],p[k])}⟧`)}]}; },
  grades(o){ const th=[['درجات الفصل','Class scores'],['اختبار الرياضيات','The math test'],['اختبار الفيزياء','The physics test'],['مسابقة القراءة','The reading contest']][o%4]; const bands=['٥٠–٦٠','٦١–٧٠','٧١–٨٠','٨١–٩٠','٩١–١٠٠'], bandsE=['50–60','61–70','71–80','81–90','91–100']; const c=[R(2,6),R(4,9),R(6,12),R(5,10),R(2,6)]; const tot=c.reduce((a,b)=>a+b,0); const above=c[3]+c[4]; const k=R(0,4); const pct=Math.round(c[k]/tot*1000)/10;
    const tA=rsTbl(['فئة الدرجات','عدد الطلاب'],bands.map((b,i)=>[b,c[i]])), tE=rsTbl(['Score band','Students'],bandsE.map((b,i)=>[b,c[i]]));
    return {name:bi(th[0],th[1]),qs:[
      {s:'stats',q:bi(`يبيّن الجدول توزيع درجات طلاب فصل في اختبار.<br>${tA}كم طالبًا تجاوزت درجته ٨٠؟`,`The table shows the scores of a class on a test.<br>${tE}How many students scored above 80?`),o:mkOpts(above,[c[4],c[2]+c[3]+c[4],tot-above,above+1]),e:bi(`⟦${c[3]} + ${c[4]} = ${above}⟧`,`⟦${c[3]} + ${c[4]} = ${above}⟧`)},
      {s:'stats',q:bi(`يبيّن الجدول توزيع درجات طلاب فصل في اختبار.<br>${tA}ما نسبة الطلاب في الفئة ${bands[k]} تقريبًا؟`,`The table shows the scores of a class on a test.<br>${tE}About what percent of the students are in the ${bandsE[k]} band?`),o:mkOpts(pct,[c[k],Math.round(c[k]/(tot-c[k])*1000)/10,pct+10,Math.round(pct/2*10)/10],x=>N(x)+'%'),e:bi(`المجموع ⟦${tot}⟧: ⟦${c[k]} ÷ ${tot} × 100 ≈ ${pct}%⟧`,`Total ⟦${tot}⟧: ⟦${c[k]} ÷ ${tot} × 100 ≈ ${pct}%⟧`)}]}; },
  twoSeries(o){ const MA=['رجب','شعبان','رمضان','شوال','ذو القعدة'], ME=['Rajab','Shaban','Ramadan','Shawwal','Dhu al-Qadah']; const th=[['فرعين لمتجر','two branches of a shop'],['مكتبتين','two bookshops'],['مخبزين','two bakeries'],['معرضين','two showrooms']][o%4];
    const b=[0,0,0,0,0].map(()=>R(2,8)*10); const a=b.map(x=>x+pick([-10,10,20,30])); const iD=R(0,4), iE=(iD+R(1,4))%5; a[iD]=2*b[iD]; a[iE]=b[iE]; for(let i=0;i<5;i++) if(i!==iD&&i!==iE&&(a[i]===2*b[i]||a[i]===b[i])) a[i]+=5;
    const tA=rsTbl(['الشهر','أ','ب'],MA.map((m,i)=>[m,a[i],b[i]])), tE=rsTbl(['Month','A','B'],ME.map((m,i)=>[m,a[i],b[i]]));
    const opt=(i0)=>[i0,...[0,1,2,3,4].filter(i=>i!==i0)].slice(0,4);
    return {name:bi(`مبيعات ${th[0]}`,`Sales of ${th[1]}`),qs:[
      {s:'stats',q:bi(`يبيّن الجدول مبيعات ${th[0]} (أ، ب) بالآلاف.<br>${tA}في أي شهر كانت مبيعات أ ضعف مبيعات ب؟`,`The table shows the sales (thousands) of ${th[1]}, A and B.<br>${tE}In which month were A's sales double B's?`),o:opt(iD).map(i=>bi(MA[i],ME[i])),e:bi(`⟦${a[iD]} = 2 × ${b[iD]}⟧`,`⟦${a[iD]} = 2 × ${b[iD]}⟧`)},
      {s:'stats',q:bi(`يبيّن الجدول مبيعات ${th[0]} (أ، ب) بالآلاف.<br>${tA}في أي شهر تساوت مبيعات أ وب؟`,`The table shows the sales (thousands) of ${th[1]}, A and B.<br>${tE}In which month were A and B equal?`),o:opt(iE).map(i=>bi(MA[i],ME[i])),e:bi(`⟦${a[iE]} = ${b[iE]}⟧`,`⟦${a[iE]} = ${b[iE]}⟧`)}]}; }
};
const RS_L={
  pctOf(){ const p=pick([20,25,40,60,70,75]), x=20*R(3,25); const v=p*x/100;
    return {s:'algebra',q:bi(`إذا كان ${p}% من س يساوي ${N(v)}، فما قيمة س؟`,`If ${p}% of x is ${N(v)}, what is x?`),o:mkOpts(x,[v*p/100,v+p,x/2,x+20]),e:bi(`⟦س = ${N(v)} ÷ ${p/100} = ${x}⟧`,`⟦x = ${N(v)} ÷ ${p/100} = ${x}⟧`)}; },
  powSum(){ const k=pick([2,4]), n=R(3,9); const b=2; const tot=k===2?n+1:n+2;
    return {s:'algebra',q:bi(`إذا كان ⟦${Array(k).fill(`2^ن`).join(' + ')} = 2^${tot}⟧ فما قيمة ن؟`,`If ⟦${Array(k).fill(`2^n`).join(' + ')} = 2^${tot}⟧, what is n?`),o:mkOpts(n,[tot,tot/k|0,n+1,n-1]),e:bi(`⟦${k} × 2^ن = 2^${k===2?1:2} × 2^ن = 2^${tot}⟧ ⟵ ⟦ن = ${n}⟧`,`⟦${k} × 2^n = 2^${k===2?1:2} × 2^n = 2^${tot}⟧ → ⟦n = ${n}⟧`)}; },
  chain(){ const p=R(2,9), q=R(1,7), r=R(-3,4); const ans=p+q+r;
    return {s:'algebra',q:bi(`إذا كان ⟦أ − ب = ${p}⟧ و⟦ب − ج = ${q}⟧ و⟦ج + د = ${N(r)}⟧ فما قيمة ⟦أ + د⟧؟`,`If ⟦a − b = ${p}⟧, ⟦b − c = ${q}⟧ and ⟦c + d = ${N(r)}⟧, what is ⟦a + d⟧?`),o:mkOpts(ans,[p-q+r,p+q-r,p*q+r,ans+2],N,true),e:bi(`بالجمع: ⟦أ + د = ${p} + ${q} + ${r<0?'('+N(r)+')':r} = ${ans}⟧`,`Add them: ⟦a + d = ${p} + ${q} + ${r<0?'('+N(r)+')':r} = ${ans}⟧`)}; },
  root(){ const t=R(0,1); if(t===0){ const x=R(3,9); return {s:'algebra',q:bi(`إذا كان ⟦س^3 = ${x**3}⟧ فما قيمة س؟`,`If ⟦x^3 = ${x**3}⟧, what is x?`),o:mkOpts(x,[x+1,x-1,x*3,x*x]),e:bi(`⟦${x} × ${x} × ${x} = ${x**3}⟧`,`⟦${x} × ${x} × ${x} = ${x**3}⟧`)}; }
    const b=pick([2,3,4]), n=R(3,b===2?9:5); return {s:'algebra',q:bi(`إذا كان ⟦${b}^س = ${b**n}⟧ فما قيمة س؟`,`If ⟦${b}^x = ${b**n}⟧, what is x?`),o:mkOpts(n,[n+1,n-1,b**n/b,n*2]),e:bi(`⟦${b}^${n} = ${b**n}⟧`,`⟦${b}^${n} = ${b**n}⟧`)}; },
  sumDiff(){ const x=R(3,12), y=R(1,x-1); const s=x+y, d=x-y; const ans=x*x-y*y;
    return {s:'algebra',q:bi(`إذا كان ⟦س + ص = ${s}⟧ و⟦س − ص = ${d}⟧ فما قيمة ⟦س^2 − ص^2⟧؟`,`If ⟦x + y = ${s}⟧ and ⟦x − y = ${d}⟧, what is ⟦x^2 − y^2⟧?`),o:mkOpts(ans,[s+d,s*s-d*d,ans+s,x*y]),e:bi(`⟦(س + ص)(س − ص) = ${s} × ${d} = ${ans}⟧`,`⟦(x + y)(x − y) = ${s} × ${d} = ${ans}⟧`)}; }
};
/* ---- sections 21–60: more recurring types (sections 1–20 keep their original pools, so they never change) ---- */
const RS_A2={
  teacherRatio(){ const s=pick([10,12,15,20]), t=pick([1,2,3]), k=R(8,30); const n=s*k, ans=t*k;
    return {s:'arith',q:bi(`في مدرسة، يشرف ${t===1?'معلم واحد':t===2?'معلمان':'ثلاثة معلمين'} على كل ${s} طالبًا. كم معلمًا تحتاج المدرسة إذا كان عدد طلابها ${n}؟`,`In a school, ${t} teacher${t>1?'s':''} supervise every ${s} students. How many teachers are needed for ${n} students?`),o:mkOpts(ans,[k,n/t|0,ans+t,ans*2]),e:bi(`⟦${n} ÷ ${s} = ${k}⟧ مجموعة، والمعلمون ⟦${k} × ${t} = ${ans}⟧`,`⟦${n} ÷ ${s} = ${k}⟧ groups; teachers ⟦${k} × ${t} = ${ans}⟧`)}; },
  seedsCost(){ const l=10*R(6,20), w=10*R(4,10), c=pick([10,15,20,25]), p=pick([4,5,6,8]); const area=l*w; if(area%c) return RS_A2.seedsCost(); const kg=area/c, ans=kg*p;
    return {s:'arith',q:bi(`أرض مستطيلة طولها ${l} م وعرضها ${w} م. الكيلوجرام من البذور يغطي ${c} م²، وسعره ${rsSAR(p)}. كم تكلفة بذر الأرض كلها؟`,`A rectangular field is ${l} m by ${w} m. One kilogram of seed covers ${c} m² and costs ${p} SAR. How much does seeding the whole field cost?`),o:mkOpts(ans,[kg,area*p,ans/2,ans+p*c]),e:bi(`المساحة ⟦${l} × ${w} = ${area}⟧، والبذور ⟦${area} ÷ ${c} = ${kg}⟧ كجم، والتكلفة ⟦${kg} × ${p} = ${ans}⟧`,`Area ⟦${l} × ${w} = ${area}⟧; seed ⟦${area} ÷ ${c} = ${kg}⟧ kg; cost ⟦${kg} × ${p} = ${ans}⟧`)}; },
  leftFraction(){ const [a,b]=pick([[2,3],[3,4],[2,4],[4,3],[3,2],[5,4]]); const left=(1-1/a)*(1-1/b); const pct=Math.round(left*1000)/10; const fr=fx((a-1)*(b-1),a*b);
    return {s:'arith',q:bi(`أنفق خالد ⟦1/${a}⟧ ما معه، ثم أنفق ⟦1/${b}⟧ ما بقي. ما الكسر الذي بقي معه؟`,`Khalid spent ⟦1/${a}⟧ of his money, then ⟦1/${b}⟧ of what was left. What fraction is left?`),o:[fr,fx(a*b-a-b>0?a*b-a-b:1,a*b),fx(1,a*b),fx(a-1,a)].filter((x,i,ar)=>ar.indexOf(x)===i).concat(['1/2','1/3','2/5','1/6']).filter((x,i,ar)=>ar.indexOf(x)===i).slice(0,4).map(x=>`⟦${x}⟧`),e:bi(`⟦(1 − 1/${a}) × (1 − 1/${b}) = ${fr}⟧`,`⟦(1 − 1/${a}) × (1 − 1/${b}) = ${fr}⟧`)}; },
  gpaTarget(){ const a=pick([4.2,4.4,4.5,4.6,4.72]), t=Math.round((a+pick([0.04,0.1,0.14,0.2]))*100)/100; const ans=Math.round((2*t-a)*100)/100; if(ans>5) return RS_A2.gpaTarget();
    return {s:'arith',q:bi(`أنهى طالب نصف ساعات تخصصه بمعدل ${a} من 5. ما المعدل الذي يحتاجه في النصف الثاني ليصبح معدله ${t}؟`,`A student finished half of his credit hours with a GPA of ${a} out of 5. What GPA does he need in the second half to end with ${t}?`),o:mkOpts(ans,[t,Math.round((t+0.1)*100)/100,Math.round((ans-0.04)*100)/100,Math.round((ans+0.06)*100)/100]),e:bi(`النصفان متساويان: ⟦2 × ${t} − ${a} = ${ans}⟧`,`Equal halves: ⟦2 × ${t} − ${a} = ${ans}⟧`)}; },
  sumRange(){ const n=pick([20,30,40,50,100]); const ans=n*(n+1)/2;
    return {s:'arith',q:bi(`مجموع الأعداد الصحيحة من 1 إلى 10 يساوي 55. ما مجموع الأعداد الصحيحة من 1 إلى ${n}؟`,`The integers from 1 to 10 add up to 55. What is the sum of the integers from 1 to ${n}?`),o:mkOpts(ans,[55*n/10,ans-n,ans+n,n*n/2]),e:bi(`⟦${n} × ${n+1} ÷ 2 = ${ans}⟧`,`⟦${n} × ${n+1} ÷ 2 = ${ans}⟧`)}; },
  cheapest(){ const [a,b,c]=[[1,2],[3,5],[5,8]]; const N0=R(11,40); let best=1e9;
    for(let i=0;i<=N0;i++) for(let j=0;3*j<=N0;j++){ const r=N0-i-3*j; if(r<0||r%5) continue; best=Math.min(best,i*2+j*5+(r/5)*8); }
    const tA=rsTbl(['عدد الأقلام','1','3','5'],[['السعر (ريال)','2','5','8']]), tE=rsTbl(['Pens','1','3','5'],[['Price (SAR)','2','5','8']]);
    return {s:'arith',q:bi(`تُباع الأقلام بالعروض الآتية:<br>${tA}ما أقل مبلغ لشراء ${N0} قلمًا بالضبط؟`,`Pens are sold in these packs:<br>${tE}What is the least cost for exactly ${N0} pens?`),o:mkOpts(best,[N0*2,Math.ceil(N0/5)*8,best+1,best+2]),e:bi(`نكثر من عرض الخمسة (الأرخص للقلم)، ثم نكمل بالثلاثة والواحد: أقل مبلغ ⟦${best}⟧`,`Use as many 5-packs as possible (cheapest per pen), then 3-packs and singles: least cost ⟦${best}⟧`)}; },
  queue(){ const n=R(10,16), a=R(3,7), b=R(3,8); const posA=n-a+1, between=Math.abs(posA-b)-1; if(between<1||posA===b) return RS_A2.queue();
    return {s:'arith',q:bi(`في طابور ${n} طالبًا، ترتيب سالم ${a} من اليمين، وترتيب خالد ${b} من اليسار. كم طالبًا بينهما؟`,`${n} students stand in a line. Salem is ${a}th from the right and Khalid is ${b}th from the left. How many students are between them?`),o:mkOpts(between,[between+1,n-a-b,between+2,n-a-b+1]),e:bi(`ترتيب سالم من اليسار ⟦${n} − ${a} + 1 = ${posA}⟧، وبينهما ⟦|${posA} − ${b}| − 1 = ${between}⟧`,`Salem from the left: ⟦${n} − ${a} + 1 = ${posA}⟧; between ⟦|${posA} − ${b}| − 1 = ${between}⟧`)}; },
  restOfJob(){ const [p,q]=pick([[1,3],[1,4],[2,5],[1,5],[3,8]]); const d=q*R(2,5); const done=d; const total=done*q/p; const ans=total-done; if(!Number.isInteger(ans)) return RS_A2.restOfJob();
    return {s:'arith',q:bi(`أنجز عامل ⟦${p}/${q}⟧ عمل في ${d} يومًا. كم يومًا يحتاج لإنجاز الباقي بالمعدل نفسه؟`,`A worker finished ⟦${p}/${q}⟧ of a job in ${d} days. How many more days does he need at the same rate?`),o:mkOpts(ans,[total,d*(q-p),ans/2,ans+d]),e:bi(`العمل كله ⟦${d} × ${q}/${p} = ${total}⟧ يومًا، والباقي ⟦${total} − ${d} = ${ans}⟧`,`The whole job takes ⟦${d} × ${q}/${p} = ${total}⟧ days; the rest ⟦${total} − ${d} = ${ans}⟧`)}; },
  markupCash(){ const c=10*R(5,20), up=pick([40,50,60]), dn=pick([10,20,25,30]); const sale=c*(100+up)/100*(100-dn)/100; const pct=Math.round((sale-c)/c*1000)/10;
    return {s:'arith',q:bi(`اشترى تاجر سلعة بـ ${arSAR(c)} وحدد سعر بيعها بزيادة ${up}%، ثم يمنح من يدفع نقدًا خصمًا ${dn}% من سعر البيع. ما نسبة ربحه عند البيع نقدًا؟`,`A trader buys an item for ${c} SAR and prices it ${up}% higher, then gives cash buyers ${dn}% off that price. What is his profit percent on a cash sale?`),o:mkOpts(pct,[up-dn,pct+5,pct-5,up],x=>N(x)+'%',true),e:bi(`⟦${(100+up)/100} × ${(100-dn)/100} = ${Math.round((100+up)*(100-dn))/10000}⟧، أي ربح ⟦${N(pct)}%⟧`,`⟦${(100+up)/100} × ${(100-dn)/100} = ${Math.round((100+up)*(100-dn))/10000}⟧, a ⟦${N(pct)}%⟧ profit`)}; },
  mapScale(){ const sc=pick([100000,250000,500000,1000000,5000000]), cm=R(2,16); const km=cm*sc/100000;
    return {s:'arith',q:bi(`مقياس رسم خريطة ⟦1 : ${sc}⟧، والمسافة بين مدينتين عليها ${cm} سم. كم المسافة الحقيقية بالكيلومتر؟`,`A map has scale ⟦1 : ${sc}⟧. Two cities are ${cm} cm apart on it. What is the real distance in km?`),o:mkOpts(km,[km*10,km/10,cm*sc/1000,km+cm]),e:bi(`⟦${cm} × ${sc} = ${cm*sc}⟧ سم ⟵ ⟦÷ 100000 = ${km}⟧ كم`,`⟦${cm} × ${sc} = ${cm*sc}⟧ cm → ⟦÷ 100000 = ${km}⟧ km`)}; },
  pagesRead(){ const a=R(12,60), b=a+R(15,60); const ans=b-a+1;
    return {s:'arith',q:bi(`قرأت هند من الصفحة ${a} إلى الصفحة ${b}. كم صفحة قرأت؟`,`Hind read from page ${a} to page ${b}. How many pages did she read?`),o:mkOpts(ans,[b-a,b-a-1,ans+2,b]),e:bi(`نحسب الصفحتين معًا: ⟦${b} − ${a} + 1 = ${ans}⟧`,`Count both end pages: ⟦${b} − ${a} + 1 = ${ans}⟧`)}; },
  lcmMeet(){ const t=pick([[2,3,5],[3,4,6],[2,5,6],[4,6,10],[3,5,6]]); const l=t.reduce((a,b)=>a*b/gcd(a,b));
    return {s:'arith',q:bi(`يزور ثلاثة إخوة بيت العائلة: الأول كل ${t[0]} أيام، والثاني كل ${t[1]} أيام، والثالث كل ${t[2]} أيام. اجتمعوا اليوم، فبعد كم يومًا يجتمعون مرة أخرى؟`,`Three brothers visit the family home every ${t[0]}, ${t[1]} and ${t[2]} days. They met today. After how many days will they meet again?`),o:mkOpts(l,[t[0]*t[1]*t[2],t[0]+t[1]+t[2],l/2,l+t[2]]),e:bi(`المضاعف المشترك الأصغر للأعداد ⟦${t.join('، ')}⟧ هو ⟦${l}⟧`,`The least common multiple of ⟦${t.join(', ')}⟧ is ⟦${l}⟧`)}; },
  meanFix(){ const n=pick([10,12,15,20]), m=R(60,85), d=pick([5,10,12,15,20]); const ans=m+d/n;
    return {s:'arith',q:bi(`متوسط درجات ${n} طالبًا ${m}. ثم اكتُشف أن درجة أحدهم أقل من الصحيحة بـ ${d} درجات فصُحّحت. ما المتوسط الجديد؟`,`The mean score of ${n} students is ${m}. One student's score turned out to be ${d} points too low and was corrected. What is the new mean?`),o:mkOpts(Math.round(ans*100)/100,[m+d,m,m+d/2,Math.round((m+1)*100)/100]),e:bi(`المجموع يزيد ⟦${d}⟧، فالمتوسط يزيد ⟦${d} ÷ ${n} = ${N(d/n)}⟧: ⟦${N(ans)}⟧`,`The total rises by ⟦${d}⟧, so the mean rises by ⟦${d} ÷ ${n} = ${N(d/n)}⟧: ⟦${N(ans)}⟧`)}; },
  newStudent(){ const n=R(6,14), m=pick([80,85,90]), x=pick([20,30,40,50]); const m2=(n*m+x)/(n+1); if(!Number.isInteger(m2)) return RS_A2.newStudent(); const ans=n+1;
    return {s:'arith',q:bi(`متوسط درجات طلاب فصل ${m}، ثم اختُبر طالب كان غائبًا فحصل على ${x}، فصار المتوسط ${m2}. كم عدد طلاب الفصل الآن؟`,`A class averages ${m}. An absent student then takes the test and scores ${x}, and the mean becomes ${m2}. How many students are in the class now?`),o:mkOpts(ans,[n,ans+1,ans*2,m-m2]),e:bi(`⟦${m}ن + ${x} = ${m2}(ن + 1) → ن = ${n}⟧، فالفصل ⟦${ans}⟧ طالبًا`,`⟦${m}n + ${x} = ${m2}(n + 1) → n = ${n}⟧, so the class has ⟦${ans}⟧`)}; },
  installments(){ const price=10000*R(6,20), dp=pick([20,25,50]), mp=pick([5,10,20,25]); const ans=100/mp;
    return {s:'arith',q:bi(`اشترى شخص سيارة بـ ${arSAR(price)}، دفع ${dp}% منها دفعة أولى، ويسدد كل شهر ${mp}% من الباقي. في كم شهرًا يسدد الباقي؟`,`Someone buys a car for ${price} SAR, pays ${dp}% up front, and each month pays ${mp}% of the remainder. In how many months is the remainder paid off?`),o:mkOpts(ans,[(100-dp)/mp,ans*2,ans+2,100/dp]),e:bi(`كل شهر ${mp}% من الباقي نفسه: ⟦100 ÷ ${mp} = ${ans}⟧ شهرًا`,`Each month is ${mp}% of the same remainder: ⟦100 ÷ ${mp} = ${ans}⟧ months`)}; },
  meetCars(){ const v1=pick([60,80,90,100,120]), v2=pick([40,60,70,90]), t=pick([1,1.5,2,2.5,3]); const d=(v1+v2)*t; const ans=t*60;
    return {s:'arith',q:bi(`انطلقت سيارتان في اللحظة نفسها من مدينتين بينهما ${d} كم، كل منهما نحو الأخرى، بسرعتي ${v1} و${v2} كم/س. بعد كم دقيقة تلتقيان؟`,`Two cars leave at the same time from two cities ${d} km apart, driving towards each other at ${v1} and ${v2} km/h. After how many minutes do they meet?`),o:mkOpts(ans,[d/v1*60|0,d/(v1-v2||1)*60|0,ans+30,ans-30]),e:bi(`السرعة النسبية ⟦${v1} + ${v2} = ${v1+v2}⟧: ⟦${d} ÷ ${v1+v2} = ${t}⟧ ساعة ⟵ ⟦${ans}⟧ دقيقة`,`Closing speed ⟦${v1} + ${v2} = ${v1+v2}⟧: ⟦${d} ÷ ${v1+v2} = ${t}⟧ h → ⟦${ans}⟧ min`)}; },
  halving(){ const s=1000*pick([8,16,24,40,64]), k=pick([2,3]); const ans=s/2**k;
    return {s:'arith',q:bi(`استثمر محمد ${arSAR(s)}، فخسر نصفها، ثم خسر نصف ما بقي${k===3?'، ثم نصف ما بقي':''}. كم بقي معه؟`,`Mohammed invested ${s} SAR, lost half, then half of what was left${k===3?', then half again':''}. How much is left?`),o:mkOpts(ans,[s/(2*k),s/2,ans*2,s-ans]),e:bi(`⟦${s} ÷ 2^${k} = ${ans}⟧`,`⟦${s} ÷ 2^${k} = ${ans}⟧`)}; },
  cuts(){ const L=R(8,40), p=pick([1,2,4]); const L2=L*p; const pieces=L2/p; const ans=pieces-1;
    return {s:'arith',q:bi(`لوح خشب طوله ${L2} سم، أراد نجار تقطيعه إلى قطع طول كل منها ${p} سم. كم قطعًا (قَصّة) يحتاج؟`,`A board is ${L2} cm long. A carpenter cuts it into pieces of ${p} cm. How many cuts does he make?`),o:mkOpts(ans,[pieces,pieces+1,ans-1,L2]),e:bi(`عدد القطع ⟦${pieces}⟧، والقصّات أقل بواحد: ⟦${ans}⟧`,`⟦${pieces}⟧ pieces need one cut fewer: ⟦${ans}⟧`)}; },
  unitPrice(){ const g=pick([125,200,250,500]), p=pick([1.5,2.1,2.5,3,4.2]); const ans=Math.round(p*1000/g*100)/100;
    return {s:'arith',q:bi(`سعر ${g} جرامًا من الهيل ${p} ريال. كم سعر الكيلوجرام؟`,`${g} g of cardamom costs ${p} SAR. What is the price per kilogram?`),o:mkOpts(ans,[p*10,ans/2,ans+p,Math.round(p*g/100*100)/100]),e:bi(`⟦1000 ÷ ${g} = ${1000/g}⟧، ⟦${p} × ${1000/g} = ${N(ans)}⟧`,`⟦1000 ÷ ${g} = ${1000/g}⟧, ⟦${p} × ${1000/g} = ${N(ans)}⟧`)}; },
  winsLosses(){ const k=pick([2,3,4,5]), l=R(2,6); const ans=l*(k+1);
    return {s:'arith',q:bi(`فاز فريق في ${k===2?'مثلي':k+' أمثال'} عدد المباريات التي خسرها، ولم يتعادل في أي مباراة. إذا خسر ${l} مباريات، فكم مباراة لعب؟`,`A team won ${k} times as many games as it lost, with no draws. If it lost ${l} games, how many did it play?`),o:mkOpts(ans,[k*l,ans+l,k+l,ans-1]),e:bi(`⟦${l} + ${k} × ${l} = ${ans}⟧`,`⟦${l} + ${k} × ${l} = ${ans}⟧`)}; },
  laps(){ const tr=pick([200,250,400,500]), km=pick([2,3,4,5,10]); const ans=km*1000/tr; if(!Number.isInteger(ans)) return RS_A2.laps();
    return {s:'arith',q:bi(`مضمار طوله ${tr} م، ويريد أحمد أن يجري ${km} كم. كم دورة يكمل؟`,`A track is ${tr} m long. Ahmed wants to run ${km} km. How many laps is that?`),o:mkOpts(ans,[km*1000/tr*2,ans+2,km*100/tr*10|0||ans+5,ans-2]),e:bi(`⟦${km} × 1000 ÷ ${tr} = ${ans}⟧`,`⟦${km} × 1000 ÷ ${tr} = ${ans}⟧`)}; },
  shelves(){ const c=pick([20,25,30,40]), b=R(3,9)*c+R(1,c-1); const ans=Math.ceil(b/c);
    return {s:'arith',q:bi(`يتسع الرف الواحد في مكتبة لـ ${c} كتابًا. كم رفًا نحتاج لوضع ${b} كتابًا؟`,`One library shelf holds ${c} books. How many shelves are needed for ${b} books?`),o:mkOpts(ans,[ans-1,ans+1,Math.round(b/c*10)/10,ans+2]),e:bi(`⟦${b} ÷ ${c} ≈ ${N(b/c)}⟧، والجزء الباقي يحتاج رفًا كاملًا: ⟦${ans}⟧`,`⟦${b} ÷ ${c} ≈ ${N(b/c)}⟧, and the leftover needs a whole shelf: ⟦${ans}⟧`)}; },
  passRate(){ const f=pick([15,20,25,30]), a=pick([5,8,10,12]); const ans=100-f-a;
    return {s:'arith',q:bi(`في اختبار، لم يجتزه ${f}% من الطلاب، ولم يحضره ${a}%، ونجح الباقون. ما نسبة الناجحين؟`,`In a test, ${f}% of the students failed, ${a}% were absent, and the rest passed. What percent passed?`),o:mkOpts(ans,[100-f,100-a,ans+5,f+a],x=>N(x)+'%'),e:bi(`⟦100 − ${f} − ${a} = ${ans}%⟧`,`⟦100 − ${f} − ${a} = ${ans}%⟧`)}; },
  chooseTeam(){ const c=pick([3,4]), t=pick([2,3,4]); const ans=t**c;
    return {s:'arith',q:bi(`في مدرسة ${c} صفوف، ويُختار من كل صف طالب واحد من الأوائل الـ${t} فيه لتكوين فريق. بكم طريقة يمكن تكوين الفريق؟`,`A school has ${c} classes. One student is chosen from the top ${t} of each class to form a team. In how many ways can the team be formed?`),o:mkOpts(ans,[t*c,c**t===ans?ans+t:c**t,ans-1,t+c]),e:bi(`⟦${Array(c).fill(t).join(' × ')} = ${ans}⟧`,`⟦${Array(c).fill(t).join(' × ')} = ${ans}⟧`)}; }
};
const RS_C2={
  salaryPeriods(){ const m=500*R(8,14), y=m*12+pick([-6000,0,6000]); const B=y/12;
    return {s:'comparison',cmp:1,q:bi(`يتقاضى محمد ${m} ريال شهريًا، ويتقاضى علي ${y} ريال سنويًا.<br>القيمة الأولى: راتب محمد الشهري<br>القيمة الثانية: راتب علي الشهري`,`Mohammed earns ${m} SAR a month and Ali earns ${y} SAR a year.<br>Quantity A: Mohammed's monthly pay<br>Quantity B: Ali's monthly pay`),a:rsCmp(m,B),e:bi(`⟦${y} ÷ 12 = ${N(B)}⟧`,`⟦${y} ÷ 12 = ${N(B)}⟧`)}; },
  powSwap(){ const [a,b]=pick([[4,5],[2,5],[3,4],[2,6],[5,6],[2,4]]); const A=a**b, B=b**a;
    return {s:'comparison',cmp:1,q:bi(`القيمة الأولى: ⟦${Array(b).fill(a).join(' × ')}⟧<br>القيمة الثانية: ⟦${Array(a).fill(b).join(' × ')}⟧`,`Quantity A: ⟦${Array(b).fill(a).join(' × ')}⟧<br>Quantity B: ⟦${Array(a).fill(b).join(' × ')}⟧`),a:rsCmp(A,B),e:bi(`⟦${a}^${b} = ${A}⟧ ، ⟦${b}^${a} = ${B}⟧`,`⟦${a}^${b} = ${A}⟧, ⟦${b}^${a} = ${B}⟧`)}; },
  triSide(){ const a=R(4,9), b=a+R(2,6), v=b-a+pick([0,-1,-2]);
    return {s:'comparison',cmp:1,q:bi(`في المثلث أ ب ج: ⟦أب = ${a}⟧ سم و⟦أج = ${b}⟧ سم.<br>القيمة الأولى: ${v} سم<br>القيمة الثانية: طول ب ج`,`In triangle ABC, ⟦AB = ${a}⟧ cm and ⟦AC = ${b}⟧ cm.<br>Quantity A: ${v} cm<br>Quantity B: length of BC`),a:1,e:bi(`الضلع الثالث أكبر من الفرق ⟦${b} − ${a} = ${b-a}⟧ دائمًا`,`The third side is always more than the difference ⟦${b} − ${a} = ${b-a}⟧`)}; },
  cubePyramid(){ const s=pick([3,4,5,6]); const base=s*s, h=pick([2*s,3*s,4*s]); const A=s**3, B=base*h/3;
    return {s:'comparison',cmp:1,q:bi(`حجم الهرم = ⟦1/3⟧ × مساحة القاعدة × الارتفاع.<br>القيمة الأولى: حجم مكعب طول حرفه ${s} سم<br>القيمة الثانية: حجم هرم مساحة قاعدته ${base} سم² وارتفاعه ${h} سم`,`Pyramid volume = ⟦1/3⟧ × base area × height.<br>Quantity A: volume of a cube with edge ${s} cm<br>Quantity B: volume of a pyramid with base ${base} cm² and height ${h} cm`),a:rsCmp(A,B),e:bi(`⟦${s}^3 = ${A}⟧ ، ⟦${base} × ${h} ÷ 3 = ${N(B)}⟧`,`⟦${s}^3 = ${A}⟧, ⟦${base} × ${h} ÷ 3 = ${N(B)}⟧`)}; },
  rhombusSquare(){ const [d1,d2,sd]=pick([[6,8,5],[10,24,13],[12,16,10],[16,30,17]]); const A=4*sd; const s2=sd+pick([-1,0,1]); const B=4*s2;
    return {s:'comparison',cmp:1,q:bi(`القيمة الأولى: محيط معين طولا قطريه ${d1} و${d2} سم<br>القيمة الثانية: محيط مربع مساحته ${s2*s2} سم²`,`Quantity A: perimeter of a rhombus with diagonals ${d1} and ${d2} cm<br>Quantity B: perimeter of a square with area ${s2*s2} cm²`),a:rsCmp(A,B),e:bi(`ضلع المعين ⟦√(${d1/2}^2 + ${d2/2}^2) = ${sd}⟧ ⟵ ⟦${A}⟧ ، ضلع المربع ⟦${s2}⟧ ⟵ ⟦${B}⟧`,`Rhombus side ⟦√(${d1/2}^2 + ${d2/2}^2) = ${sd}⟧ → ⟦${A}⟧; square side ⟦${s2}⟧ → ⟦${B}⟧`)}; },
  dailyWeekly(){ const a=pick([2,2.5,3,4]), w=pick([14,17.5,20,21,28]); const B=w/7;
    return {s:'comparison',cmp:1,q:bi(`يشرب محمد ${a} لتر ماء يوميًا، ويشرب علي ${w} لترًا أسبوعيًا.<br>القيمة الأولى: ما يشربه محمد في اليوم<br>القيمة الثانية: ما يشربه علي في اليوم`,`Mohammed drinks ${a} L of water a day; Ali drinks ${w} L a week.<br>Quantity A: Mohammed's daily amount<br>Quantity B: Ali's daily amount`),a:rsCmp(a,B),e:bi(`⟦${w} ÷ 7 = ${N(B)}⟧`,`⟦${w} ÷ 7 = ${N(B)}⟧`)}; }
};
const RS_G2={
  isoRight(){ const h=2*R(2,15); const ans=h*h/4; const f=FG(`<polygon points="40,120 180,120 40,30"/><path d="M40 110h10v10"/>${FT(120,68,h)}`);
    return {s:'geometry',q:bi(`${f}مثلث قائم الزاوية ومتطابق الضلعين، طول وتره ${h} سم. ما مساحته؟`,`${f}A right isosceles triangle has a hypotenuse of ${h} cm. What is its area?`),o:mkOpts(ans,[h*h/2,h*h,ans+h,h*2]),e:bi(`كل ضلع قائم ⟦${h}/√2⟧، والمساحة ⟦(${h}^2 ÷ 2) ÷ 2 = ${N(ans)}⟧`,`Each leg is ⟦${h}/√2⟧, area ⟦(${h}^2 ÷ 2) ÷ 2 = ${N(ans)}⟧`)}; },
  concentric(){ const r=R(2,6), d=R(1,4); const ans=2*d; const f=FG(`<circle cx="110" cy="75" r="65"/><circle cx="110" cy="75" r="${Math.round(65*r/(r+d))}"/><path d="M110 75H${110+Math.round(65*r/(r+d))}"/>${FT(110+Math.round(65*r/(r+d))+(65-Math.round(65*r/(r+d)))/2,66,d)}`);
    return {s:'geometry',q:bi(`${f}دائرتان متحدتا المركز، الفرق بين نصفي قطريهما ${d} سم. ما الفرق بين محيطيهما؟`,`${f}Two circles share a centre; their radii differ by ${d} cm. What is the difference between their circumferences?`),o:mkOpts(ans,[d,4*d,d*d,ans+2],x=>`⟦${x}π⟧`),e:bi(`⟦2π(نق₂ − نق₁) = 2π × ${d} = ${ans}π⟧`,`⟦2π(R − r) = 2π × ${d} = ${ans}π⟧`)}; },
  wheel(){ const r=pick([25,35,50,70]), n=pick([4,6,10,20]); const ans=2*r*n/100; const f=FG(`<circle cx="80" cy="75" r="45"/><path d="M80 75H125"/>${FT(102,66,r)}<path d="M140 120H210" stroke-dasharray="6 4"/>`);
    return {s:'geometry',q:bi(`${f}عجلة نصف قطرها ${r} سم دارت ${n} دورات. كم مترًا قطعت؟`,`${f}A wheel of radius ${r} cm turns ${n} times. How many meters does it travel?`),o:mkOpts(ans,[r*n/100,ans*2,Math.round(ans/3)||ans+3,ans+1],x=>`⟦${x===1?'':N(x)}π⟧`),e:bi(`المحيط ⟦2π × ${r} = ${2*r}π⟧ سم، و⟦${n} × ${2*r}π = ${2*r*n}π⟧ سم ⟵ ⟦${N(ans)}π⟧ م`,`Circumference ⟦2π × ${r} = ${2*r}π⟧ cm; ⟦${n} × ${2*r}π = ${2*r*n}π⟧ cm → ⟦${N(ans)}π⟧ m`)}; },
  triType(){ const t=pick([[3,4,5,1],[5,12,13,1],[4,5,6,0],[2,3,4,2],[5,6,7,0],[3,5,7,2],[6,8,10,1]]); const [a,b,c,k]=t; const nmA=['حاد الزوايا','قائم الزاوية','منفرج الزاوية','متطابق الأضلاع'], nmE=['acute','right','obtuse','equilateral'];
    const f=FG(`<polygon points="30,120 190,120 ${k===2?75:k===1?30:95},${k===2?65:40}"/>${FT(110,135,c)}`);
    return {s:'geometry',q:bi(`${f}مثلث أطوال أضلاعه ${a} و${b} و${c} سم. ما نوعه؟`,`${f}A triangle has sides ${a}, ${b} and ${c} cm. What kind of triangle is it?`),o:[k,...[0,1,2,3].filter(i=>i!==k)].map(i=>bi(nmA[i],nmE[i])),e:bi(`نقارن مربع الأكبر بمجموع مربعي الآخرين: ⟦${c*c}⟧ و⟦${a*a+b*b}⟧`,`Compare the largest square with the sum of the others: ⟦${c*c}⟧ vs ⟦${a*a+b*b}⟧`)}; },
  wireSquare(){ const P=4*R(3,10); const s=P/4, ans=s*s; const f=FG(`<path d="M20 30h80"/><path d="M110 75h18m-6-6 6 6-6 6"/><rect x="150" y="45" width="60" height="60" ${SH}/>${FT(60,20,P)}`);
    return {s:'geometry',q:bi(`${f}سلك طوله ${P} سم صُنع منه مربع. ما مساحة المربع؟`,`${f}A ${P} cm wire is bent into a square. What is the square's area?`),o:mkOpts(ans,[P,P*P/16+s,s*2,P/2]),e:bi(`الضلع ⟦${P} ÷ 4 = ${s}⟧، والمساحة ⟦${ans}⟧`,`Side ⟦${P} ÷ 4 = ${s}⟧, area ⟦${ans}⟧`)}; },
  suppAngles(){ const a=pick([2,3,4,6]), b=R(0,20), c=R(0,20); const x=(180-b+c)/(a+1); if(!Number.isInteger(x)||x<=c/1) return RS_G2.suppAngles();
    const fl=l=>FG(`<path d="M20 110H200M110 110L160 30"/><path d="M85 110A25 25 0 0 1 123 89"/><path d="M140 110A30 30 0 0 0 126 85"/>${FT(88,90,'1')}${FT(150,96,'2')}`);
    return {s:'geometry',q:bi(`${fl('ar')}في الشكل زاويتان متجاورتان على خط مستقيم: الزاوية 1 قياسها ⟦(${a}س + ${b})°⟧ والزاوية 2 قياسها ⟦(س − ${c})°⟧. ما قيمة س؟`,`${fl('en')}In the figure, two adjacent angles lie on a straight line: angle 1 is ⟦(${a}x + ${b})°⟧ and angle 2 is ⟦(x − ${c})°⟧. What is x?`),o:mkOpts(x,[x+c,180/(a+1)|0,x+5,x-5]),e:bi(`⟦${a+1}س + ${b-c} = 180 → س = ${x}⟧`,`⟦${a+1}x + ${b-c} = 180 → x = ${x}⟧`)}; },
  sameAreaRect(){ const A=pick([48,60,72,96,120]), l=pick([6,8,10,12]); if(A%l) return RS_G2.sameAreaRect(); const w=A/l, ans=2*(l+w); const f=FG(`<rect x="30" y="40" width="160" height="70"/>${FT(110,124,l)}${FT(20,75,'?')}`);
    return {s:'geometry',q:bi(`${f}مستطيلان مساحتاهما متساويتان. مساحة الأول ${A} سم²، وطول الثاني ${l} سم. ما محيط الثاني؟`,`${f}Two rectangles have the same area. The first is ${A} cm²; the second is ${l} cm long. What is the second's perimeter?`),o:mkOpts(ans,[A/l,l+w,ans+2,2*A/l]),e:bi(`العرض ⟦${A} ÷ ${l} = ${w}⟧، والمحيط ⟦2(${l} + ${w}) = ${ans}⟧`,`Width ⟦${A} ÷ ${l} = ${w}⟧, perimeter ⟦2(${l} + ${w}) = ${ans}⟧`)}; }
};
/* charts drawn as SVG (pie and bar), plus two more table kinds */
const rsPie=(parts,labels)=>{ let a0=-Math.PI/2, out=''; const cols=['var(--pri)','var(--pink,#e05aa0)','var(--sky,#3aa0e0)','var(--warn,#e0a020)','var(--ok,#2ca870)'];
  parts.forEach((p,i)=>{ const a1=a0+2*Math.PI*p/100, big=p>50?1:0; const x0=110+60*Math.cos(a0), y0=75+60*Math.sin(a0), x1=110+60*Math.cos(a1), y1=75+60*Math.sin(a1), am=(a0+a1)/2;
    out+=`<path d="M110 75L${x0.toFixed(1)} ${y0.toFixed(1)}A60 60 0 ${big} 1 ${x1.toFixed(1)} ${y1.toFixed(1)}Z" fill="${cols[i%5]}" fill-opacity=".35"/>${FT((110+40*Math.cos(am)).toFixed(1),(75+40*Math.sin(am)).toFixed(1),p+'%')}`; a0=a1; });
  return FG(out+`<g stroke="none">${labels.map((l,i)=>`<rect x="185" y="${18+i*20}" width="10" height="10" fill="${cols[i%5]}" fill-opacity=".5"/>${FT(200,23+i*20,l,'start')}`).join('')}</g>`,'0 0 280 150'); };
const rsBars=(vals,labels,max)=>{ const w=Math.floor(180/vals.length); return FG(`<path d="M30 15V125H210"/>${[0,.5,1].map(t=>FT(24,125-t*105,Math.round(max*t),'end')).join('')}${vals.map((v,i)=>`<rect x="${34+i*w+4}" y="${(125-105*v/max).toFixed(1)}" width="${w-8}" height="${(105*v/max).toFixed(1)}" ${SH}/>${FT(34+i*w+w/2,139,labels[i]).replace('<text ','<text font-size="10" ')}`).join('')}`,'0 0 220 150'); };
const RS_D2={
  pieSales(o){ const th=[['مبيعات مخبز في رمضان','A bakery’s Ramadan sales',['كنافة','لقيمات','معجنات','كيك'],['Kunafa','Luqaimat','Pastries','Cake']],['إنتاج مصنع أقمشة','A fabric factory’s output',['دانتيل','شيفون','حرير','ساتان'],['Lace','Chiffon','Silk','Satin']],['محاصيل مزرعة','A farm’s crops',['قمح','شعير','ذرة','أرز'],['Wheat','Barley','Corn','Rice']],['زوار معرض','Visitors to a fair',['رجال','نساء','أطفال','طلاب'],['Men','Women','Children','Students']],['مبيعات متجر إلكترونيات','An electronics shop’s sales',['جوالات','حواسيب','سماعات','شواحن'],['Phones','Laptops','Headphones','Chargers']],['صادرات شركة','A company’s exports',['تمور','ألبان','خضار','زهور'],['Dates','Dairy','Vegetables','Flowers']],['ميزانية رحلة','A trip budget',['السكن','الطيران','الطعام','التنقل'],['Lodging','Flights','Food','Transport']],['مبيعات مقهى','A café’s sales',['قهوة','شاي','عصير','حلويات'],['Coffee','Tea','Juice','Desserts']],['تبرعات حملة خيرية','A charity drive',['نقدي','ملابس','غذاء','أجهزة'],['Cash','Clothes','Food','Devices']],['استهلاك مياه مبنى','A building’s water use',['الشقق','المسبح','الحديقة','التنظيف'],['Flats','Pool','Garden','Cleaning']]][o%10];
    let p=shuffle([35,25,25,15].map(x=>x)); if(rnd()<.5) p=shuffle([40,30,20,10]); const tot=pick([2000,4000,6000,8000]); const k=R(0,3); let j=(k+R(1,3))%4; const amt=tot*p[k]/100, diff=Math.abs(p[k]-p[j])*tot/100; if(!diff){ j=(j+1)%4; }
    const d2=Math.abs(p[k]-p[j])*tot/100; const fA=rsPie(p,th[2]), fE=rsPie(p,th[3]);
    return {name:bi(th[0],th[1]),qs:[
      {s:'stats',q:bi(`${fA}يبيّن الشكل توزيع ${th[0]}، والمجموع ${tot}. كم يبلغ نصيب «${th[2][k]}»؟`,`${fE}The chart shows how ${th[1].toLowerCase()} split; the total is ${tot}. How much is “${th[3][k]}”?`),o:mkOpts(amt,[p[k]*10,tot/4,amt*2,amt+tot/20]),e:bi(`⟦${tot} × ${p[k]/100} = ${N(amt)}⟧`,`⟦${tot} × ${p[k]/100} = ${N(amt)}⟧`)},
      {s:'stats',q:bi(`${fA}يبيّن الشكل توزيع ${th[0]}، والمجموع ${tot}. ما الفرق بين «${th[2][k]}» و«${th[2][j]}»؟`,`${fE}The chart shows how ${th[1].toLowerCase()} split; the total is ${tot}. What is the difference between “${th[3][k]}” and “${th[3][j]}”?`),o:mkOpts(d2,[Math.abs(p[k]-p[j]),d2*2,(p[k]+p[j])*tot/100,d2+tot/20]),e:bi(`⟦(${Math.max(p[k],p[j])} − ${Math.min(p[k],p[j])})% × ${tot} = ${N(d2)}⟧`,`⟦(${Math.max(p[k],p[j])} − ${Math.min(p[k],p[j])})% × ${tot} = ${N(d2)}⟧`)}]}; },
  barYears(o){ const th=[['أعداد الطلاب المستجدين','New student numbers'],['عدد المصانع','Number of factories'],['أرباح شركة','A company’s profit'],['زوار متحف','Museum visitors'],['إنتاج التمور','Date production'],['ركاب القطار','Train passengers'],['المتطوعين','Volunteers'],['حجاج الداخل','Domestic pilgrims'],['مبيعات السيارات','Car sales'],['المشتركين في نادٍ','Club members']][o%10]; const yrs=[1440,1441,1442,1443,1444];
    const v=yrs.map(()=>10*R(3,12)); let lo=v.indexOf(Math.min(...v)); if(v.filter(x=>x===v[lo]).length>1){ v[lo]-=5; } lo=v.indexOf(Math.min(...v)); const i=R(0,3), j=R(i+1,4); const diff=v[j]-v[i];
    const max=Math.ceil(Math.max(...v)/20)*20; const f=rsBars(v,yrs.map(String),max);
    const opt=i0=>[i0,...[0,1,2,3,4].filter(x=>x!==i0)].slice(0,4);
    return {name:bi(th[0],th[1]),qs:[
      {s:'stats',q:bi(`${f}يبيّن الشكل ${th[0]} (بالآلاف) في خمسة أعوام. في أي عام كان العدد أقل؟`,`${f}The chart shows ${th[1].toLowerCase()} (thousands) over five years. In which year was it lowest?`),o:opt(lo).map(x=>String(yrs[x])),e:bi(`أقصر عمود: ⟦${v[lo]}⟧ عام ${yrs[lo]}`,`Shortest bar: ⟦${v[lo]}⟧ in ${yrs[lo]}`)},
      {s:'stats',q:bi(`${f}يبيّن الشكل ${th[0]} (بالآلاف) في خمسة أعوام. ما الفرق بين عامي ${yrs[i]} و${yrs[j]}؟`,`${f}The chart shows ${th[1].toLowerCase()} (thousands) over five years. What is the difference between ${yrs[i]} and ${yrs[j]}?`),o:mkOpts(Math.abs(diff),[v[i]+v[j],Math.abs(diff)+10,v[j],Math.abs(diff)*2],N),e:bi(`⟦|${v[j]} − ${v[i]}| = ${Math.abs(diff)}⟧`,`⟦|${v[j]} − ${v[i]}| = ${Math.abs(diff)}⟧`)}]}; },
  rateTable(o){ const th=[['حالات الطوارئ','Emergency cases'],['زيارات العيادات','Clinic visits'],['طلبات التوصيل','Delivery orders'],['مكالمات خدمة العملاء','Customer service calls'],['رحلات الطيران','Flights'],['شحنات الميناء','Port shipments'],['طلبات الصيانة','Maintenance requests'],['حجوزات الفندق','Hotel bookings'],['بلاغات المرور','Traffic reports'],['زوار الموقع','Website visits']][o%10]; const D=['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس'], DE=['Sun','Mon','Tue','Wed','Thu'];
    const tot=D.map(()=>R(150,260)); const sub=tot.map(t=>Math.max(2,Math.round(t*R(8,25)/1000))); const k=R(0,4); const rate=Math.round(sub[k]/tot[k]*1000)/10; const i=R(0,3), j=R(i+1,4); const diff=Math.abs(tot[j]-tot[i]);
    const tA=rsTbl(['اليوم','العدد الكلي','منها عاجلة'],D.map((d,n)=>[d,tot[n],sub[n]])), tE=rsTbl(['Day','Total','Urgent'],DE.map((d,n)=>[d,tot[n],sub[n]]));
    return {name:bi(th[0],th[1]),qs:[
      {s:'stats',q:bi(`يبيّن الجدول ${th[0]} في خمسة أيام.<br>${tA}ما الفرق بين العدد الكلي يوم ${D[i]} ويوم ${D[j]}؟`,`The table shows ${th[1].toLowerCase()} over five days.<br>${tE}What is the difference between the totals on ${DE[i]} and ${DE[j]}?`),o:mkOpts(diff,[tot[i]+tot[j],diff+10,Math.abs(sub[j]-sub[i]),diff*2]),e:bi(`⟦|${tot[j]} − ${tot[i]}| = ${diff}⟧`,`⟦|${tot[j]} − ${tot[i]}| = ${diff}⟧`)},
      {s:'stats',q:bi(`يبيّن الجدول ${th[0]} في خمسة أيام.<br>${tA}ما نسبة الحالات العاجلة إلى العدد الكلي يوم ${D[k]} تقريبًا؟`,`The table shows ${th[1].toLowerCase()} over five days.<br>${tE}About what percent of the ${DE[k]} total was urgent?`),o:mkOpts(rate,[Math.round(tot[k]/sub[k]),rate*2,Math.round((rate+3)*10)/10,Math.round(rate/2*10)/10],x=>N(x)+'%'),e:bi(`⟦${sub[k]} ÷ ${tot[k]} × 100 ≈ ${N(rate)}%⟧`,`⟦${sub[k]} ÷ ${tot[k]} × 100 ≈ ${N(rate)}%⟧`)}]}; },
  freqTable(o){ const TH=[['نتائج رمي مكعب','Rolling a die',[1,2,3,4,5,6]],['أعمار المتسابقين','Contestants’ ages',[15,16,17,18,19,20]],['درجات اختبار قصير','Quiz scores',[5,6,7,8,9,10]],['عدد أفراد الأسرة','Family sizes',[2,3,4,5,6,7]],['ساعات المذاكرة','Study hours',[1,2,3,4,5,6]],['أهداف المباريات','Goals per match',[0,1,2,3,4,5]],['كتب مقروءة في الشهر','Books read a month',[1,2,3,4,5,6]],['أحجام الأحذية','Shoe sizes',[39,40,41,42,43,44]],['أيام الغياب','Days absent',[0,1,2,3,4,5]],['عدد الإخوة','Number of siblings',[0,1,2,3,4,5]]]; const th=TH[o%10], vals=th[2];
    const f=vals.map(()=>R(1,8)); const tot=f.reduce((a,b)=>a+b,0); const i=R(0,5), j=(i+R(1,5))%6;
    const tA=rsTbl(['القيمة',...vals],[['التكرار',...f]]), tE=rsTbl(['Value',...vals],[['Frequency',...f]]);
    return {name:bi(th[0],th[1]),qs:[
      {s:'stats',q:bi(`يبيّن الجدول ${th[0]} وتكرار كل قيمة.<br>${tA}ما مجموع التكرارات؟`,`The table shows ${th[1].toLowerCase()} and how often each value occurs.<br>${tE}What is the total frequency?`),o:mkOpts(tot,[tot-f[0],vals.length,tot+f[5],tot+1]),e:bi(`⟦${f.join(' + ')} = ${tot}⟧`,`⟦${f.join(' + ')} = ${tot}⟧`)},
      {s:'stats',q:bi(`يبيّن الجدول ${th[0]} وتكرار كل قيمة.<br>${tA}ما نسبة تكرار القيمة ${vals[i]} إلى تكرار القيمة ${vals[j]}؟`,`The table shows ${th[1].toLowerCase()} and how often each value occurs.<br>${tE}What is the ratio of the frequency of ${vals[i]} to that of ${vals[j]}?`),o:[fx(f[i],f[j]),fx(f[j],f[i]),fx(f[i],tot),fx(vals[i],vals[j])].filter((x,n,a)=>a.indexOf(x)===n).concat(['1/2','2/3','3/4','4/5']).filter((x,n,a)=>a.indexOf(x)===n).slice(0,4).map(x=>`⟦${x}⟧`),e:bi(`⟦${f[i]} : ${f[j]} = ${fx(f[i],f[j])}⟧`,`⟦${f[i]} : ${f[j]} = ${fx(f[i],f[j])}⟧`)}]}; }
};
const RS_L2={
  sysMean(){ const x=R(1,6), y=R(1,6), a=R(2,5), b=R(2,5); if(a===b) return RS_L2.sysMean(); const p=a*x+b*y, q=b*x+a*y; const ans=(x+y)/2;
    return {s:'algebra',q:bi(`إذا كان ⟦${a}س + ${b}ص = ${p}⟧ و⟦${b}س + ${a}ص = ${q}⟧ فما متوسط س و ص؟`,`If ⟦${a}x + ${b}y = ${p}⟧ and ⟦${b}x + ${a}y = ${q}⟧, what is the mean of x and y?`),o:mkOpts(ans,[x+y,(p+q)/2,ans+1,(p-q)/2||ans+2],N,true),e:bi(`بالجمع: ⟦${a+b}(س + ص) = ${p+q} → س + ص = ${x+y}⟧، والمتوسط ⟦${N(ans)}⟧`,`Adding: ⟦${a+b}(x + y) = ${p+q} → x + y = ${x+y}⟧; mean ⟦${N(ans)}⟧`)}; },
  doubling(){ const k=pick([2,3]), x=R(1,6); const y=k*x, z=k*y, s=x+y+z;
    return {s:'algebra',q:bi(`إذا كان ⟦ص = ${k}س⟧ و⟦ع = ${k}ص⟧ و⟦س + ص + ع = ${s}⟧ فما قيمة ع؟`,`If ⟦y = ${k}x⟧, ⟦z = ${k}y⟧ and ⟦x + y + z = ${s}⟧, what is z?`),o:mkOpts(z,[x,y,s/3|0,z+k]),e:bi(`⟦س + ${k}س + ${k*k}س = ${1+k+k*k}س = ${s} → س = ${x}⟧، و⟦ع = ${z}⟧`,`⟦x + ${k}x + ${k*k}x = ${1+k+k*k}x = ${s} → x = ${x}⟧, ⟦z = ${z}⟧`)}; },
  rootTimes(){ const k=pick([2,3,4,5,6]); const ans=k*k;
    return {s:'algebra',q:bi(`ما العدد الموجب الذي يساوي ${k===2?'مثلي':k+' أمثال'} جذره التربيعي؟`,`Which positive number equals ${k} times its own square root?`),o:mkOpts(ans,[k,2*k,k**3,ans+1]),e:bi(`⟦س = ${k}√س → √س = ${k} → س = ${ans}⟧`,`⟦x = ${k}√x → √x = ${k} → x = ${ans}⟧`)}; },
  quadZero(){ const a=pick([2,3,4,5]), x=R(2,6); const c=a*x*x;
    return {s:'algebra',q:bi(`إذا كان ⟦${a}س^2 − ${c} = 0⟧ و⟦س > 0⟧ فما قيمة س؟`,`If ⟦${a}x^2 − ${c} = 0⟧ and ⟦x > 0⟧, what is x?`),o:mkOpts(x,[x*x,c/a/2|0||x+3,x+1,a*x]),e:bi(`⟦س^2 = ${c} ÷ ${a} = ${x*x} → س = ${x}⟧`,`⟦x^2 = ${c} ÷ ${a} = ${x*x} → x = ${x}⟧`)}; },
  sqId(){ const x=R(2,9), y=R(1,x-1); const s=x+y, p=x*y; const ans=x*x+y*y;
    return {s:'algebra',q:bi(`إذا كان ⟦س + ص = ${s}⟧ و⟦س ص = ${p}⟧ فما قيمة ⟦س^2 + ص^2⟧؟`,`If ⟦x + y = ${s}⟧ and ⟦xy = ${p}⟧, what is ⟦x^2 + y^2⟧?`),o:mkOpts(ans,[s*s,s*s+2*p,s*s-p,ans+2]),e:bi(`⟦(س + ص)^2 − 2س ص = ${s*s} − ${2*p} = ${ans}⟧`,`⟦(x + y)^2 − 2xy = ${s*s} − ${2*p} = ${ans}⟧`)}; }
};
/* a fixed section k: its own seed, four word problems, two comparisons, two geometry items, one table with two questions, one algebra item */
function rsBuild(k,seen){
  const prev=rnd; rnd=mulberry(77003+k*104729);
  try{
    /* no question text repeats in any earlier section: a generator retries with new numbers (still seeded) */
    const one=f=>{ let r; for(let i=0;i<25;i++){ r=f(); if(!seen.has(r.q.ar)) break; } seen.add(r.q.ar); return r; };
    const take=(obj,n)=>shuffle(Object.keys(obj)).slice(0,n).map(nm=>one(obj[nm]));
    /* sections 1–20 are built exactly as when they were published; later sections draw on the wider pools */
    /* a few small-range types are used up by sections 1–20, so later sections leave them out */
    const v1=k<RS_V1, drop=o=>{ const c={...o}; ['timeUnits','unitRate','chords','cubeHole','upDown'].forEach(n=>delete c[n]); return c; };
    const A=v1?RS_A:drop({...RS_A,...RS_A2}), C=v1?RS_C:drop({...RS_C,...RS_C2}), G=v1?RS_G:drop({...RS_G,...RS_G2}), L=v1?RS_L:{...RS_L,...RS_L2};
    let d; if(v1){ const dn=Object.keys(RS_D); d=RS_D[dn[k%dn.length]](Math.floor(k/dn.length)); } else { const dn=Object.keys(RS_D2), j=k-RS_V1; d=RS_D2[dn[j%dn.length]](Math.floor(j/dn.length)); }
    const qs=[...take(A,4),...take(C,2),...take(G,2),...d.qs,...take(L,1)];
    return {name:d.name,qs};
  } finally { rnd=prev; }
}
let _rsAll=null; const rsSection=k=>{ if(!_rsAll){ const seen=new Set(); _rsAll=[...Array(RS_N)].map((_,i)=>rsBuild(i,seen)); } return _rsAll[k]; };
/* raw items are materialized with the options shuffled by a seed of their own, so an answer letter is the same on every visit */
function rsQuestions(k,lang){ const prev=rnd; rnd=mulberry(55001+k*7907+(lang==='ar'?0:3)); try{ return rsSection(k).qs.map(r=>materialize(r,lang)); } finally { rnd=prev; } }
/* ============ Foundation track (مسار التأسيس) ============
   30 short quantitative lessons that build each topic from zero, in five units. Each lesson has a short explanation, the rules,
   worked examples with every step shown, common traps and a 10-question drill graded from easy to harder
   (each lesson's generators g[] are ordered by difficulty; the drill keeps that order). Original items. */
const FD_FREE=5;
const FDU=[['num',bi('الأعداد','Numbers')],['ar',bi('الحساب','Arithmetic')],['al',bi('الجبر','Algebra')],['geo',bi('الهندسة','Geometry')],['st',bi('الإحصاء والمقارنة','Statistics and comparison')],
  ['van',bi('التناظر اللفظي','Verbal analogy')],['vco',bi('إكمال الجمل','Sentence completion')],['vcx',bi('الخطأ السياقي','Contextual error')],['vod',bi('المفردة الشاذة','Odd word out')],['vre',bi('استيعاب المقروء','Reading comprehension')]];
const FD=[];
function FDL(id,u,sk,ill,ar,en,g,fig){ FD.push({id,u,sk,ill,ar,en,g,fig:fig||null}); }
const fdS=(n,d)=>{ const s=(n<0)!==(d<0)&&n!==0?'−':''; n=Math.abs(n); d=Math.abs(d); const g=gcd(n,d)||1; n/=g; d/=g; return s+(d===1?String(n):`${n}/${d}`); };
const F=(n,d)=>`⟦${fdS(n,d)}⟧`;
const dS=v=>{ const r=+(+v).toFixed(8); return (r<0?'−':'')+String(Math.abs(r)); };
const fo=(ans,c,fill)=>{ const o=[ans]; const add=x=>{ if(o.length<4&&x!=null&&x!==''&&!o.includes(x)) o.push(x); }; c.forEach(add); for(let i=1;o.length<4&&i<60;i++) add(fill?fill(i):String(i)); return o; };
const UF={ar:{2:'نصف',3:'ثلث',4:'ربع',5:'خمس',6:'سدس',8:'ثمن'},en:{2:'half',3:'a third',4:'a quarter',5:'a fifth',6:'a sixth',8:'an eighth'}};
const cf=(c,s)=>c===1?s:c===-1?'−'+s:`${N(c)}${s}`; /* coefficient before a symbol */
function fdLesson(id){ return FD.find(x=>x.id===id)||null; }
function fdQuestions(id,lang){ const l=fdLesson(id); if(!l) return []; const out=[],seen=new Set();
  if(l.vb){ const b=l.vb[lang];
    /* reading: two or three questions from each passage, kept together and in order; other skills: ten of the lesson's items */
    if(b[0]&&b[0].p){ const keys=shuffle([...new Set(b.map(x=>x.p))]), per={}; keys.forEach(k=>per[k]=shuffle(b.filter(x=>x.p===k)));
      const pick=[]; for(let r=0;pick.length<10;r++) for(const k of keys){ if(pick.length<10&&per[k][r]) pick.push(per[k][r]); }
      return keys.flatMap(k=>b.filter(x=>x.p===k&&pick.includes(x))).map(x=>materialize(x,lang)); }
    return shuffle(b.slice()).slice(0,10).map(x=>materialize(x,lang)); }
  for(let i=0;i<10;i++){ const f=l.g[Math.min(l.g.length-1,Math.floor(i*l.g.length/10))]; let r; for(let k=0;k<40;k++){ r=f(); if(!seen.has(r.q.ar+JSON.stringify(r.o||''))) break; } seen.add(r.q.ar+JSON.stringify(r.o||'')); out.push(materialize(r,lang)); }
  return out; }
const AN={day:['يوم واحد','يومين','أيام','يومًا'],hour:['ساعة واحدة','ساعتين','ساعات','ساعة'],year:['سنة واحدة','سنتين','سنوات','سنة'],worker:['عامل واحد','عاملين','عمال','عاملًا'],nb:['دفتر واحد','دفترين','دفاتر','دفترًا'],min:['دقيقة واحدة','دقيقتين','دقائق','دقيقة'],cm:['سنتيمتر واحد','سنتيمترين','سنتيمترات','سنتيمترًا'],m:['متر واحد','مترين','أمتار','مترًا']};

/* ---- unit 1: numbers ---- */
FDL('n-ops','num','arith','numline',
{t:'العمليات على الأعداد وترتيبها',d:'الأعداد السالبة، وترتيب العمليات، والحساب الذهني السريع.',
 intro:['كل سؤال كمي يمر بعملية حسابية، وخطأ صغير في ترتيب العمليات أو في إشارة سالبة يضيّع السؤال كله مهما كان فهمك للفكرة. هذا الدرس يثبّت الأساس الذي تُبنى عليه بقية الدروس.','لا آلة حاسبة في الاختبار، لذلك نتعلم هنا أيضًا حيلًا تختصر الحساب الذهني إلى ثوانٍ.'],
 rules:['ترتيب العمليات: الأقواس، ثم الأسس، ثم الضرب والقسمة حسب ورودهما، ثم الجمع والطرح حسب ورودهما: ⟦8 − 2 × 3 = 8 − 6 = 2⟧','ضرب إشارتين متشابهتين أو قسمتهما يعطي موجبًا، والمختلفتان تعطيان سالبًا: ⟦(−4) × (−3) = 12⟧ ، ⟦(−12) ÷ 3 = −4⟧','طرح العدد السالب يعني جمعه: ⟦5 − (−3) = 5 + 3 = 8⟧','الأس الزوجي للعدد السالب يعطي موجبًا، والأس الفردي يعطي سالبًا: ⟦(−2)^4 = 16⟧ ، ⟦(−2)^3 = −8⟧','الضرب في 5: اضرب في 10 ثم اقسم على 2. والضرب في 25: اضرب في 100 ثم اقسم على 4: ⟦36 × 25 = 3600 ÷ 4 = 900⟧','خاصية التوزيع تختصر كثيرًا: ⟦17 × 6 + 17 × 4 = 17 × 10 = 170⟧ ، ⟦99 × 7 = 700 − 7 = 693⟧'],
 ex:[['احسب: ⟦12 + 18 ÷ 3 × 2 − 4⟧',['القسمة أولًا لأنها وردت قبل الضرب: ⟦18 ÷ 3 = 6⟧','ثم الضرب: ⟦6 × 2 = 12⟧','ثم الجمع والطرح: ⟦12 + 12 − 4 = 20⟧'],'20'],
  ['احسب: ⟦(−3)^2 − 2 × (−5)⟧',['الأس أولًا: ⟦(−3)^2 = 9⟧','ثم الضرب: ⟦2 × (−5) = −10⟧','طرح السالب جمع: ⟦9 + 10 = 19⟧'],'19'],
  ['احسب ذهنيًا: ⟦48 × 25⟧',['الضرب في 25 = الضرب في 100 ثم القسمة على 4','⟦4800 ÷ 4 = 1200⟧'],'1200']],
 traps:['تنفيذ الجمع قبل الضرب لأنه جاء أولًا: ⟦2 + 3 × 4 = 14⟧ وليست 20.','⟦−3^2 = −9⟧ لأن الأس للعدد 3 وحده، أما ⟦(−3)^2 = 9⟧.','نسيان قلب الإشارة عند طرح عدد سالب.']},
{t:'Operations and their order',d:'Negative numbers, order of operations and fast mental math.',
 intro:['Every quantitative question runs through arithmetic, and one slip in the order of operations or a negative sign costs the whole question, however well you understand the idea. This lesson sets the base the other lessons build on.','There is no calculator in the test, so this lesson also teaches shortcuts that cut mental math down to seconds.'],
 rules:['Order of operations: brackets, then exponents, then multiplication and division from left to right, then addition and subtraction from left to right: ⟦8 − 2 × 3 = 8 − 6 = 2⟧','Two equal signs multiplied or divided give a positive, different signs give a negative: ⟦(−4) × (−3) = 12⟧, ⟦(−12) ÷ 3 = −4⟧','Subtracting a negative means adding: ⟦5 − (−3) = 5 + 3 = 8⟧','An even power of a negative is positive, an odd power is negative: ⟦(−2)^4 = 16⟧, ⟦(−2)^3 = −8⟧','Times 5: multiply by 10, then halve. Times 25: multiply by 100, then divide by 4: ⟦36 × 25 = 3600 ÷ 4 = 900⟧','The distributive property saves time: ⟦17 × 6 + 17 × 4 = 17 × 10 = 170⟧, ⟦99 × 7 = 700 − 7 = 693⟧'],
 ex:[['Work out ⟦12 + 18 ÷ 3 × 2 − 4⟧',['Divide first, since it comes before the multiplication: ⟦18 ÷ 3 = 6⟧','Then multiply: ⟦6 × 2 = 12⟧','Then add and subtract: ⟦12 + 12 − 4 = 20⟧'],'20'],
  ['Work out ⟦(−3)^2 − 2 × (−5)⟧',['Exponent first: ⟦(−3)^2 = 9⟧','Then multiply: ⟦2 × (−5) = −10⟧','Subtracting a negative is adding: ⟦9 + 10 = 19⟧'],'19'],
  ['Work out mentally: ⟦48 × 25⟧',['Times 25 = times 100, then divide by 4','⟦4800 ÷ 4 = 1200⟧'],'1200']],
 traps:['Adding before multiplying because the addition comes first: ⟦2 + 3 × 4 = 14⟧, not 20.','⟦−3^2 = −9⟧ because the power applies to 3 only, while ⟦(−3)^2 = 9⟧.','Forgetting to flip the sign when subtracting a negative.']},
[()=>{ const a=R(2,20),b=R(2,9),c=R(2,9),d=R(1,9),ans=a+b*c-d;
   return {s:'arith',q:bi(`ما قيمة ⟦${a} + ${b} × ${c} − ${d}⟧؟`,`What is ⟦${a} + ${b} × ${c} − ${d}⟧?`),o:mkOpts(ans,[(a+b)*c-d,a+b*(c-d),(a+b)*(c-d)],N,true),e:bi(`الضرب أولًا: ⟦${b} × ${c} = ${b*c}⟧، ثم ⟦${a} + ${b*c} − ${d} = ${ans}⟧`,`Multiply first: ⟦${b} × ${c} = ${b*c}⟧, then ⟦${a} + ${b*c} − ${d} = ${ans}⟧`)}; },
 ()=>{ const a=R(2,9),b=R(2,9),c=R(2,15),ans=a*b-c;
   return {s:'arith',q:bi(`ما قيمة ⟦(−${a}) × (−${b}) − ${c}⟧؟`,`What is ⟦(−${a}) × (−${b}) − ${c}⟧?`),o:mkOpts(ans,[-a*b-c,a*b+c,c-a*b],N,true),e:bi(`سالب × سالب = موجب: ⟦${a*b} − ${c} = ${N(ans)}⟧`,`Negative × negative = positive: ⟦${a*b} − ${c} = ${N(ans)}⟧`)}; },
 ()=>{ const a=R(2,6),b=R(2,9),c=R(2,9),ans=a*a+b*c;
   return {s:'arith',q:bi(`ما قيمة ⟦(−${a})^2 − ${b} × (−${c})⟧؟`,`What is ⟦(−${a})^2 − ${b} × (−${c})⟧?`),o:mkOpts(ans,[b*c-a*a,a*a-b*c,-a*a-b*c],N,true),e:bi(`⟦(−${a})^2 = ${a*a}⟧ و⟦${b} × (−${c}) = −${b*c}⟧، وطرح السالب جمع: ⟦${a*a} + ${b*c} = ${ans}⟧`,`⟦(−${a})^2 = ${a*a}⟧ and ⟦${b} × (−${c}) = −${b*c}⟧; subtracting a negative is adding: ⟦${a*a} + ${b*c} = ${ans}⟧`)}; },
 ()=>{ const t=R(0,2);
   if(t===0){ const n=4*R(3,30),ans=n*25; return {s:'arith',q:bi(`ما ناتج ⟦${n} × 25⟧؟`,`What is ⟦${n} × 25⟧?`),o:mkOpts(ans,[ans+100,ans-100,ans*10]),e:bi(`⟦${n} × 100 ÷ 4 = ${n*100} ÷ 4 = ${ans}⟧`,`⟦${n} × 100 ÷ 4 = ${n*100} ÷ 4 = ${ans}⟧`)}; }
   if(t===1){ const m=R(12,89),ans=m*99; return {s:'arith',q:bi(`ما ناتج ⟦${m} × 99⟧؟`,`What is ⟦${m} × 99⟧?`),o:mkOpts(ans,[m*100,m*101,ans+10]),e:bi(`⟦${m} × 100 − ${m} = ${m*100} − ${m} = ${ans}⟧`,`⟦${m} × 100 − ${m} = ${m*100} − ${m} = ${ans}⟧`)}; }
   const n=R(11,49),k=R(2,8),j=10-k,ans=10*n; return {s:'arith',q:bi(`ما قيمة ⟦${n} × ${k} + ${n} × ${j}⟧؟`,`What is ⟦${n} × ${k} + ${n} × ${j}⟧?`),o:mkOpts(ans,[n*k*j,n*k+j,ans+10]),e:bi(`بالتوزيع: ⟦${n} × (${k} + ${j}) = ${n} × 10 = ${ans}⟧`,`Distribute: ⟦${n} × (${k} + ${j}) = ${n} × 10 = ${ans}⟧`)}; }]);

const fdFr=(lo=3,hi=12)=>{ for(;;){ const d=R(lo,hi),n=R(1,d-1); if(gcd(n,d)===1) return [n,d]; } };
FDL('n-frac1','num','arith','fractions',
{t:'الكسور (١): المعنى والتبسيط والمقارنة',d:'الكسر جزء من كل، وكيف تبسّطه وتقارن بين كسرين في ثوانٍ.',
 intro:['الكسر جزء من كل: المقام عدد الأجزاء المتساوية التي قُسّم إليها الكل، والبسط عدد الأجزاء التي نأخذها. في ⟦3/4⟧ قسمنا الكل إلى 4 أجزاء وأخذنا 3.','الكسور تدخل في النسب والنسب المئوية والاحتمال والهندسة، لذلك يستحق هذا الدرس أن تتقنه قبل غيره.'],
 rules:['التبسيط: اقسم البسط والمقام على أكبر قاسم مشترك بينهما: ⟦18/24 = 3/4⟧ (القسمة على 6)','الكسور المتكافئة: اضرب البسط والمقام في العدد نفسه: ⟦2/3 = 8/12⟧','المقارنة بالضرب التبادلي: ⟦a/b⟧ أكبر من ⟦c/d⟧ إذا كان ⟦a × d > c × b⟧','إذا تساوى البسطان فالكسر صاحب المقام الأصغر هو الأكبر: ⟦3/7 > 3/8⟧','الكسر من عدد: اقسم العدد على المقام ثم اضرب في البسط: ⟦3/4 × 20 = 15⟧','الكسر الأكبر من 1 بسطه أكبر من مقامه: ⟦7/3 = 2 + 1/3⟧'],
 ex:[['بسّط الكسر ⟦36/48⟧',['أكبر قاسم مشترك للعددين 36 و48 هو 12','⟦36 ÷ 12 = 3⟧ و⟦48 ÷ 12 = 4⟧'],'⟦3/4⟧'],
  ['أيهما أكبر: ⟦5/8⟧ أم ⟦7/11⟧؟',['اضرب تبادليًا: ⟦5 × 11 = 55⟧ و⟦7 × 8 = 56⟧','الناتج الأكبر في جهة ⟦7/11⟧'],'⟦7/11⟧'],
  ['ما ⟦2/5⟧ من 45؟',['اقسم على المقام: ⟦45 ÷ 5 = 9⟧','اضرب في البسط: ⟦9 × 2 = 18⟧'],'18']],
 traps:['الحكم بالمقام وحده: ⟦3/4⟧ أكبر من ⟦2/3⟧ مع أن مقامه أكبر.','التبسيط الناقص: ⟦12/18 = 6/9⟧ صحيح، لكن أبسط صورة ⟦2/3⟧، والخيارات تأتي بأبسط صورة.','الظن أن الكسر يكبر إذا أضفنا العدد نفسه إلى بسطه ومقامه دون تحقق: ⟦1/2 → 2/3⟧ كبر، لكن ⟦3/2 → 4/3⟧ صغر.']},
{t:'Fractions (1): meaning, simplifying, comparing',d:'A fraction is part of a whole; how to simplify it and compare two fractions in seconds.',
 intro:['A fraction is part of a whole: the denominator is how many equal parts the whole is cut into, and the numerator is how many of them we take. In ⟦3/4⟧ the whole is cut into 4 parts and we take 3.','Fractions run through ratios, percents, probability and geometry, so this lesson is worth mastering before the others.'],
 rules:['Simplify: divide the numerator and denominator by their greatest common factor: ⟦18/24 = 3/4⟧ (divide by 6)','Equivalent fractions: multiply the top and bottom by the same number: ⟦2/3 = 8/12⟧','Compare by cross-multiplying: ⟦a/b⟧ is larger than ⟦c/d⟧ when ⟦a × d > c × b⟧','With equal numerators, the smaller denominator gives the larger fraction: ⟦3/7 > 3/8⟧','A fraction of a number: divide by the denominator, then multiply by the numerator: ⟦3/4 × 20 = 15⟧','A fraction greater than 1 has a numerator larger than its denominator: ⟦7/3 = 2 + 1/3⟧'],
 ex:[['Simplify ⟦36/48⟧',['The greatest common factor of 36 and 48 is 12','⟦36 ÷ 12 = 3⟧ and ⟦48 ÷ 12 = 4⟧'],'⟦3/4⟧'],
  ['Which is larger: ⟦5/8⟧ or ⟦7/11⟧?',['Cross-multiply: ⟦5 × 11 = 55⟧ and ⟦7 × 8 = 56⟧','The larger product is on the side of ⟦7/11⟧'],'⟦7/11⟧'],
  ['What is ⟦2/5⟧ of 45?',['Divide by the denominator: ⟦45 ÷ 5 = 9⟧','Multiply by the numerator: ⟦9 × 2 = 18⟧'],'18']],
 traps:['Judging by the denominator alone: ⟦3/4⟧ is larger than ⟦2/3⟧ although its denominator is larger.','Stopping halfway: ⟦12/18 = 6/9⟧ is true, but the simplest form is ⟦2/3⟧, and choices come in simplest form.','Assuming a fraction grows when you add the same number to top and bottom: ⟦1/2 → 2/3⟧ grows, but ⟦3/2 → 4/3⟧ shrinks.']},
[()=>{ const [n,d]=fdFr(),k=R(2,9),ans=F(n,d);
   return {s:'arith',q:bi(`ما أبسط صورة للكسر ⟦${n*k}/${d*k}⟧؟`,`What is ⟦${n*k}/${d*k}⟧ in simplest form?`),o:fo(ans,[F(n+1,d),F(n,d+1),F(d,n),F(d-n,d)],i=>F(n+i,d+i)),e:bi(`اقسم البسط والمقام على ${k}: ⟦${fdS(n,d)}⟧`,`Divide the top and bottom by ${k}: ⟦${fdS(n,d)}⟧`)}; },
 ()=>{ const [p,q]=fdFr(2,9),Nn=q*R(2,15),ans=p*Nn/q;
   return {s:'arith',q:bi(`ما قيمة ⟦${p}/${q}⟧ من ${Nn}؟`,`What is ⟦${p}/${q}⟧ of ${Nn}?`),o:mkOpts(ans,[Nn/q,Nn-ans,ans+Nn/q,p*Nn]),e:bi(`⟦${Nn} ÷ ${q} = ${Nn/q}⟧، ثم ⟦${Nn/q} × ${p} = ${ans}⟧`,`⟦${Nn} ÷ ${q} = ${Nn/q}⟧, then ⟦${Nn/q} × ${p} = ${ans}⟧`)}; },
 ()=>{ const [n,d]=fdFr(2,9),k=R(2,6),ans=n*k,v=xv;
   return {s:'arith',q:bi(`إذا كان ⟦${n}/${d} = س/${d*k}⟧ فما قيمة س؟`,`If ⟦${n}/${d} = x/${d*k}⟧, what is x?`),o:mkOpts(ans,[n+k,d*k-n*k,ans+k]),e:bi(`المقام ضُرب في ${k}، فيُضرب البسط في ${k}: ⟦${n} × ${k} = ${ans}⟧`,`The denominator was multiplied by ${k}, so the numerator is too: ⟦${n} × ${k} = ${ans}⟧`)}; },
 ()=>{ const fr=[]; while(fr.length<4){ const [n,d]=fdFr(4,13); const v=n/d; if(v<.3||v>.95) continue; if(fr.some(x=>Math.abs(x[2]-v)<.015)) continue; fr.push([n,d,v]); }
   const big=R(0,1)===1; fr.sort((a,b)=>big?b[2]-a[2]:a[2]-b[2]);
   return {s:'arith',q:bi(big?'أي الكسور الآتية هو الأكبر؟':'أي الكسور الآتية هو الأصغر؟',big?'Which fraction is the largest?':'Which fraction is the smallest?'),o:fr.map(x=>F(x[0],x[1])),e:bi(`قيمها التقريبية: ${fr.map(x=>`⟦${x[0]}/${x[1]} ≈ ${dS(Math.round(x[2]*100)/100)}⟧`).join('، ')}`,`Approximate values: ${fr.map(x=>`⟦${x[0]}/${x[1]} ≈ ${dS(Math.round(x[2]*100)/100)}⟧`).join(', ')}`)}; }]);

FDL('n-frac2','num','arith','fractions',
{t:'الكسور (٢): العمليات على الكسور',d:'الجمع والطرح والضرب والقسمة، ومسائل «الباقي» الشهيرة.',
 intro:['بعد أن عرفت معنى الكسر، نتعلم الآن الحساب به. لكل عملية قاعدة واحدة واضحة، والخطأ الأشهر هو خلط قاعدة عملية بأخرى.','نختم بمسائل «أنفق جزءًا ثم جزءًا من الباقي»، وهي من أكثر المسائل تكرارًا في الحساب.'],
 rules:['الجمع والطرح: وحّد المقامين أولًا ثم اجمع البسطين: ⟦1/4 + 2/3 = 3/12 + 8/12 = 11/12⟧','الضرب: بسط في بسط ومقام في مقام، وبسّط قبل الضرب: ⟦3/4 × 8/9 = 2/3⟧','القسمة: اقلب الكسر الثاني ثم اضرب: ⟦2/3 ÷ 4/9 = 2/3 × 9/4 = 3/2⟧','القسمة على كسر أقل من 1 تكبّر العدد: ⟦6 ÷ 1/2 = 12⟧','«جزء من الباقي»: إذا أُنفق ⟦1/3⟧ ثم ⟦1/4⟧ الباقي، فالمتبقي ⟦2/3 × 3/4 = 1/2⟧ من الأصل.'],
 ex:[['احسب ⟦5/6 − 3/8⟧',['المقام المشترك 24','⟦20/24 − 9/24 = 11/24⟧'],'⟦11/24⟧'],
  ['احسب ⟦(1/2 + 1/3) ÷ 5/6⟧',['داخل القوسين: ⟦3/6 + 2/6 = 5/6⟧','⟦5/6 ÷ 5/6 = 1⟧'],'1'],
  ['أنفق خالد ربع ماله، ثم أنفق ثلث ما بقي، فبقي معه 60 ريالًا. كم كان ماله؟',['بعد الربع يبقى ⟦3/4⟧','بعد ثلث الباقي يبقى ⟦3/4 × 2/3 = 1/2⟧ من المال','نصف المال 60، فالمال 120'],'120']],
 traps:['جمع البسطين والمقامين: ⟦1/2 + 1/3⟧ ليست ⟦2/5⟧ بل ⟦5/6⟧.','في «ثلث الباقي» يؤخذ الثلث من الباقي لا من المال كله.','في القسمة يُقلب الكسر الثاني فقط، لا الأول.']},
{t:'Fractions (2): operations',d:'Adding, subtracting, multiplying and dividing, and the classic "remainder" problems.',
 intro:['Now that you know what a fraction means, we learn to calculate with fractions. Each operation has one clear rule, and the most common mistake is mixing up the rules.','We finish with "spent a part, then a part of the rest" problems, which come up again and again in arithmetic.'],
 rules:['Add and subtract: make the denominators equal first, then add the numerators: ⟦1/4 + 2/3 = 3/12 + 8/12 = 11/12⟧','Multiply: top times top and bottom times bottom, simplifying first: ⟦3/4 × 8/9 = 2/3⟧','Divide: flip the second fraction, then multiply: ⟦2/3 ÷ 4/9 = 2/3 × 9/4 = 3/2⟧','Dividing by a fraction less than 1 makes the number larger: ⟦6 ÷ 1/2 = 12⟧','"Part of the rest": if ⟦1/3⟧ is spent, then ⟦1/4⟧ of what is left, the remainder is ⟦2/3 × 3/4 = 1/2⟧ of the original.'],
 ex:[['Work out ⟦5/6 − 3/8⟧',['The common denominator is 24','⟦20/24 − 9/24 = 11/24⟧'],'⟦11/24⟧'],
  ['Work out ⟦(1/2 + 1/3) ÷ 5/6⟧',['Inside the brackets: ⟦3/6 + 2/6 = 5/6⟧','⟦5/6 ÷ 5/6 = 1⟧'],'1'],
  ['Khalid spent a quarter of his money, then a third of what was left, and had 60 SAR left. How much did he have?',['After the quarter, ⟦3/4⟧ is left','After a third of the rest, ⟦3/4 × 2/3 = 1/2⟧ of the money is left','Half the money is 60, so the money was 120'],'120']],
 traps:['Adding tops and bottoms: ⟦1/2 + 1/3⟧ is not ⟦2/5⟧ but ⟦5/6⟧.','In "a third of the rest", the third is taken from what is left, not from the whole.','When dividing, flip only the second fraction, not the first.']},
[()=>{ let b=R(2,9),d=R(2,9); while(d===b) d=R(2,9); const a=R(1,b-1),c=R(1,d-1),ans=F(a*d+c*b,b*d);
   return {s:'arith',q:bi(`ما ناتج ⟦${a}/${b} + ${c}/${d}⟧؟`,`What is ⟦${a}/${b} + ${c}/${d}⟧?`),o:fo(ans,[F(a+c,b+d),F(a*c,b*d),F(a+c,b*d)],i=>F(a*d+c*b+i,b*d)),e:bi(`وحّد المقامين: ⟦${a*d}/${b*d} + ${c*b}/${b*d} = ${fdS(a*d+c*b,b*d)}⟧`,`Common denominator: ⟦${a*d}/${b*d} + ${c*b}/${b*d} = ${fdS(a*d+c*b,b*d)}⟧`)}; },
 ()=>{ const [a,b]=fdFr(2,9),[c,d]=fdFr(2,9),div=R(0,1)===1;
   if(div) return {s:'arith',q:bi(`ما ناتج ⟦${a}/${b} ÷ ${c}/${d}⟧؟`,`What is ⟦${a}/${b} ÷ ${c}/${d}⟧?`),o:fo(F(a*d,b*c),[F(a*c,b*d),F(b*c,a*d),F(a+c,b+d)],i=>F(a*d+i,b*c)),e:bi(`اقلب الثاني واضرب: ⟦${a}/${b} × ${d}/${c} = ${fdS(a*d,b*c)}⟧`,`Flip the second and multiply: ⟦${a}/${b} × ${d}/${c} = ${fdS(a*d,b*c)}⟧`)};
   return {s:'arith',q:bi(`ما ناتج ⟦${a}/${b} × ${c}/${d}⟧؟`,`What is ⟦${a}/${b} × ${c}/${d}⟧?`),o:fo(F(a*c,b*d),[F(a*d,b*c),F(a+c,b+d),F(a*c,b+d)],i=>F(a*c+i,b*d)),e:bi(`⟦(${a} × ${c})/(${b} × ${d}) = ${fdS(a*c,b*d)}⟧`,`⟦(${a} × ${c})/(${b} × ${d}) = ${fdS(a*c,b*d)}⟧`)}; },
 ()=>{ const a=pick([2,3,4,5]),b=pick([2,3,4,5]),m=10*R(1,12),T=a*b*m,Lf=(a-1)*(b-1)*m,w=Math.round(T*(1-1/a-1/b));
   return {s:'arith',q:bi(`أنفق سالم ${UF.ar[a]} راتبه، ثم أنفق ${UF.ar[b]} ما تبقى، فبقي معه ${arSAR(Lf)}. كم راتبه؟`,`Salem spent ${UF.en[a]} of his salary, then ${UF.en[b]} of what was left, and had ${Lf} SAR left. What is his salary?`),o:mkOpts(T,[Lf*a,Lf*b,w>0?Lf*T/w:Lf*2,T+Lf]),e:bi(`يبقى ⟦${a-1}/${a} × ${b-1}/${b} = ${fdS((a-1)*(b-1),a*b)}⟧ من الراتب، فالراتب ⟦${Lf} ÷ ${fdS((a-1)*(b-1),a*b)} = ${T}⟧`,`The rest is ⟦${a-1}/${a} × ${b-1}/${b} = ${fdS((a-1)*(b-1),a*b)}⟧ of the salary, so the salary is ⟦${Lf} ÷ ${fdS((a-1)*(b-1),a*b)} = ${T}⟧`)}; },
 ()=>{ const [a,b]=pick([[2,3],[3,4],[2,5],[4,5],[3,5],[2,4],[3,6]]),l=a*b/gcd(a,b),n=l*R(1,6),df=n/a-n/b;
   return {s:'arith',q:bi(`${UF.ar[a]} عدد يزيد على ${UF.ar[b]}ه بمقدار ${df}. ما العدد؟`,`${UF.en[a][0].toUpperCase()+UF.en[a].slice(1)} of a number is ${df} more than ${UF.en[b]} of it. What is the number?`),o:mkOpts(n,[df*(a+b),df*a,df*b]),e:bi(`⟦س/${a} − س/${b} = ${df}⟧، و⟦1/${a} − 1/${b} = ${fdS(b-a,a*b)}⟧، فالعدد ⟦${df} ÷ ${fdS(b-a,a*b)} = ${n}⟧`,`⟦x/${a} − x/${b} = ${df}⟧, and ⟦1/${a} − 1/${b} = ${fdS(b-a,a*b)}⟧, so the number is ⟦${df} ÷ ${fdS(b-a,a*b)} = ${n}⟧`)}; }]);

FDL('n-dec','num','arith','percent',
{t:'الأعداد العشرية والتحويلات',d:'الضرب والقسمة بالفاصلة، والتحويل بين الكسر والعشري والنسبة المئوية.',
 intro:['العدد العشري طريقة أخرى لكتابة الكسر: ⟦0.25⟧ هو ⟦25/100⟧ أي ⟦1/4⟧. وكثير من أسئلة الاختبار تخلط بين الصيغ الثلاث: كسر وعشري ونسبة مئوية.','إذا حفظت جدول التحويل الصغير في هذا الدرس، ستحل نصف هذه الأسئلة دون حساب.'],
 rules:['احفظ: ⟦1/2 = 0.5 = 50%⟧، ⟦1/4 = 0.25 = 25%⟧، ⟦3/4 = 0.75⟧، ⟦1/5 = 0.2⟧، ⟦1/8 = 0.125⟧، ⟦1/3 ≈ 0.33⟧','الضرب: اضرب الأرقام كأنها صحيحة، ثم اجعل منازل الناتج العشرية بعدد منازل العددين معًا: ⟦0.3 × 0.02 = 0.006⟧','القسمة: اضرب العددين في 10 أو 100 حتى يصبح المقسوم عليه صحيحًا: ⟦1.2 ÷ 0.04 = 120 ÷ 4 = 30⟧','الضرب في 100 يكبّر العدد منزلتين: ⟦3.75 × 100 = 375⟧، والقسمة على 100 تصغّره منزلتين.','المقارنة: ساوِ عدد المنازل ثم قارن: ⟦0.5 = 0.50 > 0.45⟧','النسبة المئوية إلى عشري: اقسم على 100: ⟦7% = 0.07⟧ ، ⟦0.5% = 0.005⟧'],
 ex:[['احسب ⟦0.25 × 0.8⟧',['⟦0.25 = 1/4⟧','⟦0.8 ÷ 4 = 0.2⟧'],'0.2'],
  ['احسب ⟦0.36 ÷ 0.012⟧',['اضرب العددين في 1000: ⟦360 ÷ 12⟧','⟦360 ÷ 12 = 30⟧'],'30'],
  ['رتّب تصاعديًا: ⟦0.4⟧ ، ⟦3/8⟧ ، ⟦0.38⟧',['⟦3/8 = 0.375⟧','⟦0.375 < 0.38 < 0.4⟧'],'⟦3/8 ، 0.38 ، 0.4⟧']],
 traps:['⟦0.5 × 0.5 = 0.25⟧ وليست ⟦2.5⟧: ضرب عددين أقل من 1 يعطي عددًا أصغر منهما.','الظن أن ⟦0.125⟧ أكبر من ⟦0.2⟧ لأن أرقامه أكثر.','⟦0.5%⟧ تساوي ⟦0.005⟧ لا ⟦0.5⟧.']},
{t:'Decimals and conversions',d:'Multiplying and dividing decimals, and converting between fractions, decimals and percents.',
 intro:['A decimal is another way to write a fraction: ⟦0.25⟧ is ⟦25/100⟧, or ⟦1/4⟧. Many test questions mix the three forms: fraction, decimal and percent.','Learn the small conversion table in this lesson and you will solve half of these questions without calculating.'],
 rules:['Memorize: ⟦1/2 = 0.5 = 50%⟧, ⟦1/4 = 0.25 = 25%⟧, ⟦3/4 = 0.75⟧, ⟦1/5 = 0.2⟧, ⟦1/8 = 0.125⟧, ⟦1/3 ≈ 0.33⟧','Multiply: multiply the digits as whole numbers, then give the result as many decimal places as both numbers together: ⟦0.3 × 0.02 = 0.006⟧','Divide: multiply both numbers by 10 or 100 until the divisor is whole: ⟦1.2 ÷ 0.04 = 120 ÷ 4 = 30⟧','Multiplying by 100 shifts the number two places up: ⟦3.75 × 100 = 375⟧; dividing by 100 shifts it two places down.','Compare: give both the same number of places, then compare: ⟦0.5 = 0.50 > 0.45⟧','Percent to decimal: divide by 100: ⟦7% = 0.07⟧, ⟦0.5% = 0.005⟧'],
 ex:[['Work out ⟦0.25 × 0.8⟧',['⟦0.25 = 1/4⟧','⟦0.8 ÷ 4 = 0.2⟧'],'0.2'],
  ['Work out ⟦0.36 ÷ 0.012⟧',['Multiply both by 1000: ⟦360 ÷ 12⟧','⟦360 ÷ 12 = 30⟧'],'30'],
  ['Order from smallest: ⟦0.4⟧, ⟦3/8⟧, ⟦0.38⟧',['⟦3/8 = 0.375⟧','⟦0.375 < 0.38 < 0.4⟧'],'⟦3/8, 0.38, 0.4⟧']],
 traps:['⟦0.5 × 0.5 = 0.25⟧, not ⟦2.5⟧: multiplying two numbers below 1 gives something smaller than both.','Thinking ⟦0.125⟧ is larger than ⟦0.2⟧ because it has more digits.','⟦0.5%⟧ is ⟦0.005⟧, not ⟦0.5⟧.']},
[()=>{ const a=pick([0.2,0.3,0.4,0.5,0.6,0.25,0.15,0.12,0.8]),b=pick([0.02,0.03,0.4,0.05,0.6,0.007,0.9,1.5,0.04]),ans=+(a*b).toFixed(8);
   return {s:'arith',q:bi(`ما ناتج ⟦${dS(a)} × ${dS(b)}⟧؟`,`What is ⟦${dS(a)} × ${dS(b)}⟧?`),o:mkOpts(ans,[+(ans*10).toFixed(8),+(ans/10).toFixed(8),+(ans*100).toFixed(8)],dS),e:bi(`اضرب بلا فاصلة ثم ضع منازل العددين معًا: ⟦${dS(a)} × ${dS(b)} = ${dS(ans)}⟧`,`Multiply without the points, then count both numbers' places: ⟦${dS(a)} × ${dS(b)} = ${dS(ans)}⟧`)}; },
 ()=>{ const d=pick([0.2,0.4,0.05,0.03,0.12,0.6,0.004,0.25,0.08]),q=R(2,40),x=+(d*q).toFixed(8);
   return {s:'arith',q:bi(`ما ناتج ⟦${dS(x)} ÷ ${dS(d)}⟧؟`,`What is ⟦${dS(x)} ÷ ${dS(d)}⟧?`),o:mkOpts(q,[q*10,+(q/10).toFixed(8),q*100],dS),e:bi(`اضرب العددين في العدد نفسه حتى يصبح المقسوم عليه صحيحًا، فالناتج ${q}. تحقق: ⟦${dS(d)} × ${q} = ${dS(x)}⟧`,`Scale both numbers until the divisor is whole; the result is ${q}. Check: ⟦${dS(d)} × ${q} = ${dS(x)}⟧`)}; },
 ()=>{ const [n,d]=pick([[1,8],[3,8],[5,8],[7,8],[3,5],[2,5],[1,20],[3,20],[7,20],[9,25],[3,4],[1,40],[3,40],[7,25],[4,5],[11,20]]),v=n/d*100;
   return {s:'arith',q:bi(`الكسر ⟦${n}/${d}⟧ يساوي:`,`The fraction ⟦${n}/${d}⟧ equals:`),o:fo(`${dS(v)}%`,[`${dS(v/10)}%`,`${dS(v*10)}%`,`${dS(n/d)}%`],i=>`${dS(v+i)}%`),e:bi(`⟦${n} ÷ ${d} = ${dS(n/d)}⟧، والضرب في 100 يعطي ⟦${dS(v)}%⟧`,`⟦${n} ÷ ${d} = ${dS(n/d)}⟧; times 100 gives ⟦${dS(v)}%⟧`)}; },
 ()=>{ const pool=[[1,4],[1,5],[3,8],[2,5],[3,5],[5,8],[3,4],[7,10],[1,8],[9,20],[11,20],[13,20],[7,8],[1,2]]; for(;;){
   const fr=shuffle(pool).slice(0,2).map(([n,d])=>({s:F(n,d),v:n/d,t:`⟦${n}/${d} = ${dS(n/d)}⟧`})); const d1=R(1,9)/10,d2=R(100,900)/1000;
   const all=[...fr,{s:dS(d1),v:d1},{s:dS(d2),v:d2}]; if(new Set(all.map(x=>x.v)).size<4||all.some((x,i)=>all.some((y,j)=>i!==j&&Math.abs(x.v-y.v)<.01))) continue;
   const big=R(0,1)===1; all.sort((a,b)=>big?b.v-a.v:a.v-b.v);
   return {s:'arith',q:bi(big?'أي الأعداد الآتية هو الأكبر؟':'أي الأعداد الآتية هو الأصغر؟',big?'Which number is the largest?':'Which number is the smallest?'),o:all.map(x=>x.s),e:bi(`حوّل الكسرين: ${fr.map(x=>x.t).join('، ')}، ثم قارن المنازل العشرية.`,`Convert the fractions: ${fr.map(x=>x.t).join(', ')}, then compare the decimal places.`)}; } }]);

FDL('n-exp','num','algebra','exponent',
{t:'الأسس وقوانينها',d:'سبعة قوانين تحل كل أسئلة الأسس، وفكرة توحيد الأساس.',
 intro:['الأس يخبرك كم مرة يُضرب العدد في نفسه: ⟦2^5 = 2 × 2 × 2 × 2 × 2 = 32⟧. العدد المضروب يسمى الأساس، وعدد المرات هو الأس.','كل أسئلة الأسس في الاختبار تُحل بسبعة قوانين، وأهم مهارة فيها أن تكتب الأعداد بأساس واحد قبل أي شيء.'],
 rules:['ضرب أساسين متساويين: تُجمع الأسس: ⟦a^m × a^n = a^(m+n)⟧','قسمة أساسين متساويين: تُطرح الأسس: ⟦a^m ÷ a^n = a^(m−n)⟧','أس الأس: تُضرب الأسس: ⟦(a^m)^n = a^(mn)⟧','أي عدد غير الصفر أسه صفر يساوي 1: ⟦7^0 = 1⟧','الأس السالب مقلوب: ⟦a^(−n) = 1/a^n⟧ ، ⟦2^(−3) = 1/8⟧','وحّد الأساس: ⟦4 = 2^2⟧ ، ⟦8 = 2^3⟧ ، ⟦27 = 3^3⟧ ، فمثلًا ⟦4^3 = 2^6⟧','جمع حدود متساوية: ⟦2^n + 2^n = 2 × 2^n = 2^(n+1)⟧'],
 ex:[['احسب ⟦2^5 × 2^3 ÷ 2^6⟧',['اجمع ثم اطرح الأسس: ⟦5 + 3 − 6 = 2⟧','⟦2^2 = 4⟧'],'4'],
  ['إذا كان ⟦9^س = 27⟧ فما قيمة س؟',['وحّد الأساس: ⟦3^(2س) = 3^3⟧','⟦2س = 3⟧'],'⟦3/2⟧'],
  ['احسب ⟦3^4 + 3^4 + 3^4⟧',['ثلاثة حدود متساوية: ⟦3 × 3^4⟧','⟦3^1 × 3^4 = 3^5 = 243⟧'],'243']],
 traps:['ضرب الأسس بدل جمعها: ⟦2^3 × 2^4 = 2^7⟧ وليست ⟦2^12⟧.','⟦2^3 + 2^3⟧ لا تساوي ⟦2^6⟧ بل ⟦2^4⟧.','⟦5^0 = 1⟧ وليست صفرًا.']},
{t:'Exponents and their laws',d:'Seven laws that solve every exponent question, and the idea of a common base.',
 intro:['An exponent tells you how many times a number is multiplied by itself: ⟦2^5 = 2 × 2 × 2 × 2 × 2 = 32⟧. The number being multiplied is the base; the count is the exponent.','Every exponent question in the test is solved with seven laws, and the key skill is rewriting numbers with one base before anything else.'],
 rules:['Multiplying equal bases: add the exponents: ⟦a^m × a^n = a^(m+n)⟧','Dividing equal bases: subtract the exponents: ⟦a^m ÷ a^n = a^(m−n)⟧','Power of a power: multiply the exponents: ⟦(a^m)^n = a^(mn)⟧','Any nonzero number to the power 0 is 1: ⟦7^0 = 1⟧','A negative exponent means the reciprocal: ⟦a^(−n) = 1/a^n⟧, ⟦2^(−3) = 1/8⟧','Use one base: ⟦4 = 2^2⟧, ⟦8 = 2^3⟧, ⟦27 = 3^3⟧, so ⟦4^3 = 2^6⟧','Adding equal terms: ⟦2^n + 2^n = 2 × 2^n = 2^(n+1)⟧'],
 ex:[['Work out ⟦2^5 × 2^3 ÷ 2^6⟧',['Add, then subtract the exponents: ⟦5 + 3 − 6 = 2⟧','⟦2^2 = 4⟧'],'4'],
  ['If ⟦9^x = 27⟧, what is x?',['Use one base: ⟦3^(2x) = 3^3⟧','⟦2x = 3⟧'],'⟦3/2⟧'],
  ['Work out ⟦3^4 + 3^4 + 3^4⟧',['Three equal terms: ⟦3 × 3^4⟧','⟦3^1 × 3^4 = 3^5 = 243⟧'],'243']],
 traps:['Multiplying exponents instead of adding: ⟦2^3 × 2^4 = 2^7⟧, not ⟦2^12⟧.','⟦2^3 + 2^3⟧ is not ⟦2^6⟧ but ⟦2^4⟧.','⟦5^0 = 1⟧, not zero.']},
[()=>{ const a=pick([2,3]),r=a===2?R(1,5):R(1,3); const m=R(3,8),n=R(2,7),k=m+n-r,ans=a**r;
   return {s:'algebra',q:bi(`ما قيمة ⟦${a}^${m} × ${a}^${n} ÷ ${a}^${k}⟧؟`,`What is ⟦${a}^${m} × ${a}^${n} ÷ ${a}^${k}⟧?`),o:mkOpts(ans,[a**(r+1),a**Math.max(0,r-1),a*r]),e:bi(`⟦${m} + ${n} − ${k} = ${r}⟧، و⟦${a}^${r} = ${ans}⟧`,`⟦${m} + ${n} − ${k} = ${r}⟧, and ⟦${a}^${r} = ${ans}⟧`)}; },
 ()=>{ const [B,b,p]=pick([[4,2,2],[8,2,3],[9,3,2],[27,3,3],[16,2,4],[25,5,2]]),x=R(2,6),t=p*x;
   return {s:'algebra',q:bi(`إذا كان ⟦${B}^س = ${b}^${t}⟧ فما قيمة س؟`,`If ⟦${B}^x = ${b}^${t}⟧, what is x?`),o:mkOpts(x,[t,x+p,x*p]),e:bi(`⟦${B} = ${b}^${p}⟧، فـ⟦${b}^(${p}س) = ${b}^${t}⟧، و⟦س = ${t} ÷ ${p} = ${x}⟧`,`⟦${B} = ${b}^${p}⟧, so ⟦${b}^(${p}x) = ${b}^${t}⟧ and ⟦x = ${t} ÷ ${p} = ${x}⟧`)}; },
 ()=>{ const b=pick([2,3,4,5]),n=R(2,8),ex=Array(b).fill(`${b}^${n}`).join(' + ');
   return {s:'algebra',q:bi(`⟦${ex}⟧ تساوي:`,`⟦${ex}⟧ equals:`),o:fo(`⟦${b}^${n+1}⟧`,[`⟦${b}^${b*n}⟧`,b===2?`⟦2^${n+2}⟧`:`⟦${b*b}^${n}⟧`,`⟦${b}^${n+b}⟧`],i=>`⟦${b}^${n+1+i}⟧`),e:bi(`${b} حدود متساوية: ⟦${b} × ${b}^${n} = ${b}^1 × ${b}^${n} = ${b}^${n+1}⟧`,`${b} equal terms: ⟦${b} × ${b}^${n} = ${b}^1 × ${b}^${n} = ${b}^${n+1}⟧`)}; },
 ()=>{ const [b,k]=pick([[2,1],[2,2],[2,3],[3,1],[3,2],[4,1],[4,2],[5,1],[5,2],[10,1],[10,2],[2,4],[3,3]]),v=b**k;
   if(R(0,1)) return {s:'algebra',q:bi(`ما قيمة ⟦${b}^(−${k})⟧؟`,`What is ⟦${b}^(−${k})⟧?`),o:[`⟦1/${v}⟧`,`⟦−${v}⟧`,`⟦${v}⟧`,`⟦−1/${v}⟧`],e:bi(`الأس السالب مقلوب: ⟦1/${b}^${k} = 1/${v}⟧`,`A negative exponent is a reciprocal: ⟦1/${b}^${k} = 1/${v}⟧`)};
   return {s:'algebra',q:bi(`ما قيمة ⟦(1/${b})^(−${k})⟧؟`,`What is ⟦(1/${b})^(−${k})⟧?`),o:[`⟦${v}⟧`,`⟦1/${v}⟧`,`⟦−${v}⟧`,`⟦−1/${v}⟧`],e:bi(`مقلوب ⟦1/${b}⟧ هو ${b}: ⟦${b}^${k} = ${v}⟧`,`The reciprocal of ⟦1/${b}⟧ is ${b}: ⟦${b}^${k} = ${v}⟧`)}; }]);

const rt=(c,m)=>m===1?String(c):`${c===1?'':c}√${m}`;
FDL('n-root','num','algebra','squares',
{t:'الجذور',d:'تبسيط الجذر، والجمع والضرب، وتقدير الجذر بين عددين.',
 intro:['الجذر التربيعي عكس التربيع: ⟦√49 = 7⟧ لأن ⟦7^2 = 49⟧. أسئلة الجذور في الاختبار تدور حول التبسيط وجمع الجذور المتشابهة والتقدير.','احفظ مربعات الأعداد حتى 20 ومكعباتها حتى 10، فهي مفتاح السرعة هنا وفي الهندسة أيضًا.'],
 rules:['جذر حاصل الضرب: ⟦√(ab) = √a × √b⟧، فاستخرج أكبر مربع: ⟦√50 = √25 × √2 = 5√2⟧','⟦√a × √a = a⟧ ، و⟦√2 × √8 = √16 = 4⟧','تُجمع الجذور المتشابهة فقط: ⟦3√2 + 5√2 = 8√2⟧، أما ⟦√2 + √3⟧ فلا تُختصر.','جذر الكسر: ⟦√(a/b) = √a / √b⟧، وجذر العشري: ⟦√0.09 = 0.3⟧','إنطاق المقام: اضرب في الجذر نفسه: ⟦6/√3 = 6√3/3 = 2√3⟧','التقدير: ⟦√50⟧ بين 7 و8 لأن ⟦49 < 50 < 64⟧، وهو أقرب إلى 7.'],
 ex:[['بسّط ⟦√72⟧',['أكبر مربع يقسم 72 هو 36','⟦√36 × √2 = 6√2⟧'],'⟦6√2⟧'],
  ['احسب ⟦√18 + √8⟧',['⟦√18 = 3√2⟧ و⟦√8 = 2√2⟧','⟦3√2 + 2√2 = 5√2⟧'],'⟦5√2⟧'],
  ['احسب ⟦√0.0049⟧',['⟦√49 = 7⟧','للناتج نصف عدد منازل ⟦0.0049⟧ العشرية: منزلتان'],'0.07']],
 traps:['⟦√(9 + 16) = √25 = 5⟧ وليست ⟦3 + 4 = 7⟧: الجذر لا يتوزع على الجمع.','⟦√0.4⟧ ليست ⟦0.2⟧؛ الصحيح ⟦√0.04 = 0.2⟧.','جمع جذرين مختلفين تحت جذر واحد: ⟦√2 + √3 ≠ √5⟧.']},
{t:'Roots',d:'Simplifying roots, adding and multiplying them, and estimating a root between two numbers.',
 intro:['The square root undoes squaring: ⟦√49 = 7⟧ because ⟦7^2 = 49⟧. Root questions in the test are about simplifying, adding like roots and estimating.','Learn the squares up to 20 and the cubes up to 10; they are the key to speed here and in geometry.'],
 rules:['Root of a product: ⟦√(ab) = √a × √b⟧, so take out the largest square: ⟦√50 = √25 × √2 = 5√2⟧','⟦√a × √a = a⟧, and ⟦√2 × √8 = √16 = 4⟧','Only like roots add: ⟦3√2 + 5√2 = 8√2⟧, while ⟦√2 + √3⟧ does not simplify.','Root of a fraction: ⟦√(a/b) = √a / √b⟧; root of a decimal: ⟦√0.09 = 0.3⟧','Rationalize: multiply by the same root: ⟦6/√3 = 6√3/3 = 2√3⟧','Estimate: ⟦√50⟧ is between 7 and 8 because ⟦49 < 50 < 64⟧, and closer to 7.'],
 ex:[['Simplify ⟦√72⟧',['The largest square that divides 72 is 36','⟦√36 × √2 = 6√2⟧'],'⟦6√2⟧'],
  ['Work out ⟦√18 + √8⟧',['⟦√18 = 3√2⟧ and ⟦√8 = 2√2⟧','⟦3√2 + 2√2 = 5√2⟧'],'⟦5√2⟧'],
  ['Work out ⟦√0.0049⟧',['⟦√49 = 7⟧','The result has half as many decimal places as ⟦0.0049⟧: two'],'0.07']],
 traps:['⟦√(9 + 16) = √25 = 5⟧, not ⟦3 + 4 = 7⟧: a root does not split over addition.','⟦√0.4⟧ is not ⟦0.2⟧; it is ⟦√0.04 = 0.2⟧.','Putting two different roots under one root: ⟦√2 + √3 ≠ √5⟧.']},
[()=>{ const k=R(2,7),m=pick([2,3,5,6,7]),n=k*k*m;
   return {s:'algebra',q:bi(`أبسط صورة لـ ⟦√${n}⟧ هي:`,`⟦√${n}⟧ in simplest form is:`),o:fo(`⟦${rt(k,m)}⟧`,[`⟦${rt(m,k)}⟧`,`⟦${rt(k*k,m)}⟧`,`⟦${rt(k,m*k)}⟧`],i=>`⟦${rt(k+i,m)}⟧`),e:bi(`⟦√${n} = √${k*k} × √${m} = ${rt(k,m)}⟧`,`⟦√${n} = √${k*k} × √${m} = ${rt(k,m)}⟧`)}; },
 ()=>{ const m=pick([2,3,5]); let a=R(1,5),b=R(2,5); while(b===a) b=R(2,5);
   return {s:'algebra',q:bi(`ما ناتج ⟦√${a*a*m} + √${b*b*m}⟧؟`,`What is ⟦√${a*a*m} + √${b*b*m}⟧?`),o:fo(`⟦${rt(a+b,m)}⟧`,[`⟦√${a*a*m+b*b*m}⟧`,`⟦${rt(a*b,m)}⟧`,`⟦${rt(a+b,2*m)}⟧`],i=>`⟦${rt(a+b+i,m)}⟧`),e:bi(`⟦${rt(a,m)} + ${rt(b,m)} = ${rt(a+b,m)}⟧`,`⟦${rt(a,m)} + ${rt(b,m)} = ${rt(a+b,m)}⟧`)}; },
 ()=>{ if(R(0,1)){ const r=pick([0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,0.03,0.04,0.05,0.07,0.09,0.12,0.11,1.1,1.2]),s=+(r*r).toFixed(8);
     return {s:'algebra',q:bi(`ما قيمة ⟦√${dS(s)}⟧؟`,`What is ⟦√${dS(s)}⟧?`),o:mkOpts(r,[+(r*10).toFixed(8),+(r/10).toFixed(8),s],dS),e:bi(`⟦${dS(r)} × ${dS(r)} = ${dS(s)}⟧`,`⟦${dS(r)} × ${dS(r)} = ${dS(s)}⟧`)}; }
   const [a,b]=fdFr(2,12);
   return {s:'algebra',q:bi(`ما قيمة ⟦√(${a*a}/${b*b})⟧؟`,`What is ⟦√(${a*a}/${b*b})⟧?`),o:fo(F(a,b),[F(a*a,b),F(a,b*b),F(b,a)],i=>F(a+i,b)),e:bi(`⟦√${a*a} / √${b*b} = ${a}/${b}⟧`,`⟦√${a*a} / √${b*b} = ${a}/${b}⟧`)}; },
 ()=>{ if(R(0,1)){ const b=pick([2,3,5,6,7]),c=R(1,5),a=b*c;
     return {s:'algebra',q:bi(`ما قيمة ⟦${a}/√${b}⟧؟`,`What is ⟦${a}/√${b}⟧?`),o:fo(`⟦${rt(c,b)}⟧`,[`⟦${rt(a,b)}⟧`,`⟦${fdS(a,b)}⟧`,`⟦${rt(c*b,b)}⟧`],i=>`⟦${rt(c+i,b)}⟧`),e:bi(`اضرب في ⟦√${b}/√${b}⟧: ⟦${a}√${b}/${b} = ${rt(c,b)}⟧`,`Multiply by ⟦√${b}/√${b}⟧: ⟦${a}√${b}/${b} = ${rt(c,b)}⟧`)}; }
   let n; do n=R(10,150); while(Math.sqrt(n)%1===0); const lo=Math.floor(Math.sqrt(n));
   const pr=(a,b)=>bi(`بين ${a} و${b}`,`between ${a} and ${b}`), o=[pr(lo,lo+1),pr(lo+1,lo+2),pr(lo-1,lo),pr(Math.floor(n/2)-1,Math.floor(n/2))];
   if(o[3].ar===o[0].ar||o[3].ar===o[1].ar||o[3].ar===o[2].ar) o[3]=pr(lo+2,lo+3);
   return {s:'algebra',q:bi(`⟦√${n}⟧ يقع:`,`⟦√${n}⟧ lies:`),o,e:bi(`⟦${lo}^2 = ${lo*lo}⟧ و⟦${lo+1}^2 = ${(lo+1)**2}⟧، و${n} بينهما`,`⟦${lo}^2 = ${lo*lo}⟧ and ⟦${lo+1}^2 = ${(lo+1)**2}⟧, and ${n} is between them`)}; }]);

const fdFac=n=>{ for(let p=2;p*p<=n;p++) if(n%p===0) return [p,n/p]; return null; };
FDL('n-div','num','arith','numline',
{t:'قابلية القسمة والأعداد الأولية',d:'قواعد القسمة السريعة، والعدد الأولي، والقاسم والمضاعف المشترك.',
 intro:['قواعد قابلية القسمة تخبرك هل يقبل العدد القسمة دون أن تقسم فعلًا، وهي توفر وقتًا كبيرًا في التبسيط وفي أسئلة «أي الأعداد».','العدد الأولي عدد أكبر من 1 لا يقبل القسمة إلا على نفسه وعلى 1. والقاسم المشترك الأكبر والمضاعف المشترك الأصغر يحلان مسائل التقطيع والتكرار.'],
 rules:['القسمة على 3 أو 9: مجموع الأرقام يقبل القسمة على 3 أو 9: ⟦5832 → 5 + 8 + 3 + 2 = 18⟧','على 4: آخر رقمين يقبلان القسمة على 4 (⟦1316 → 16⟧)، وعلى 8: آخر ثلاثة أرقام.','على 6: يقبل القسمة على 2 و3 معًا. وعلى 5: آحاده 0 أو 5.','الأعداد الأولية الأولى: ⟦2، 3، 5، 7، 11، 13، 17، 19، 23، 29، 31⟧. العدد 1 ليس أوليًا، و2 هو الأولي الزوجي الوحيد.','التحليل إلى عوامل أولية: ⟦60 = 2^2 × 3 × 5⟧. ولعدد القواسم: أضف 1 لكل أس واضرب: ⟦(2+1)(1+1)(1+1) = 12⟧','القاسم المشترك الأكبر لأكبر قطعة متساوية، والمضاعف المشترك الأصغر لموعد التكرار معًا.'],
 ex:[['هل العدد 5832 يقبل القسمة على 9؟',['مجموع الأرقام ⟦5 + 8 + 3 + 2 = 18⟧','18 يقبل القسمة على 9'],'نعم'],
  ['أوجد القاسم المشترك الأكبر والمضاعف المشترك الأصغر للعددين 18 و24',['⟦18 = 2 × 3^2⟧ و⟦24 = 2^3 × 3⟧','القاسم: أصغر الأسس المشتركة ⟦2 × 3 = 6⟧','المضاعف: أكبر الأسس ⟦2^3 × 3^2 = 72⟧'],'6 و72'],
  ['كم قاسمًا للعدد 72؟',['⟦72 = 2^3 × 3^2⟧','⟦(3 + 1)(2 + 1) = 12⟧'],'12']],
 traps:['العدد 1 ليس أوليًا.','أعداد تبدو أولية وليست كذلك: ⟦51 = 3 × 17⟧، ⟦91 = 7 × 13⟧، ⟦57 = 3 × 19⟧.','قابلية القسمة على 3 لا تعني القسمة على 9: ⟦12⟧ يقبل الأولى فقط.']},
{t:'Divisibility and primes',d:'Quick divisibility rules, primes, and the greatest common factor and least common multiple.',
 intro:['Divisibility rules tell you whether a number divides without actually dividing, which saves a lot of time when simplifying and in "which number" questions.','A prime is a number greater than 1 whose only divisors are 1 and itself. The GCF and LCM solve cutting and repeating problems.'],
 rules:['By 3 or 9: the digit sum is divisible by 3 or 9: ⟦5832 → 5 + 8 + 3 + 2 = 18⟧','By 4: the last two digits are divisible by 4 (⟦1316 → 16⟧); by 8: the last three digits.','By 6: divisible by both 2 and 3. By 5: ends in 0 or 5.','The first primes: ⟦2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31⟧. 1 is not prime, and 2 is the only even prime.','Prime factorization: ⟦60 = 2^2 × 3 × 5⟧. Number of divisors: add 1 to each exponent and multiply: ⟦(2+1)(1+1)(1+1) = 12⟧','The GCF gives the largest equal piece; the LCM gives when things repeat together.'],
 ex:[['Is 5832 divisible by 9?',['Digit sum ⟦5 + 8 + 3 + 2 = 18⟧','18 is divisible by 9'],'Yes'],
  ['Find the GCF and LCM of 18 and 24',['⟦18 = 2 × 3^2⟧ and ⟦24 = 2^3 × 3⟧','GCF: smallest shared powers ⟦2 × 3 = 6⟧','LCM: largest powers ⟦2^3 × 3^2 = 72⟧'],'6 and 72'],
  ['How many divisors does 72 have?',['⟦72 = 2^3 × 3^2⟧','⟦(3 + 1)(2 + 1) = 12⟧'],'12']],
 traps:['1 is not prime.','Numbers that look prime but are not: ⟦51 = 3 × 17⟧, ⟦91 = 7 × 13⟧, ⟦57 = 3 × 19⟧.','Divisible by 3 does not mean divisible by 9: ⟦12⟧ passes only the first.']},
[()=>{ const dv=pick([3,4,6,9]); const ok=x=>x%dv===0; const near={3:x=>x%3!==0,4:x=>x%2===0&&x%4!==0,6:x=>(x%3===0)!==(x%2===0),9:x=>x%3===0&&x%9!==0};
   let good; do good=R(102,9990); while(!ok(good)); const o=[String(good)]; let tr=0; while(o.length<4&&tr<500){ tr++; const x=R(102,9990); if(ok(x)||o.includes(String(x))) continue; if(o.length<3&&!near[dv](x)) continue; o.push(String(x)); }
   const rule={3:bi('مجموع أرقامه يقبل القسمة على 3','its digit sum is divisible by 3'),4:bi('آخر رقمين فيه يقبلان القسمة على 4','its last two digits are divisible by 4'),6:bi('يقبل القسمة على 2 و3 معًا','it is divisible by both 2 and 3'),9:bi('مجموع أرقامه يقبل القسمة على 9','its digit sum is divisible by 9')}[dv];
   return {s:'arith',q:bi(`أي الأعداد الآتية يقبل القسمة على ${dv}؟`,`Which number is divisible by ${dv}?`),o,e:bi(`${good}، لأن ${rule.ar}.`,`${good}, because ${rule.en}.`)}; },
 ()=>{ if(R(0,1)){ let a,b,l; do{ a=R(3,15); b=R(4,20); l=a*b/gcd(a,b); }while(a===b||l>180||a%b===0||b%a===0);
     return {s:'arith',q:bi(`إشارة تومض كل ${a} ثوانٍ، وأخرى كل ${b} ثانية. إذا ومضتا معًا الآن، فبعد كم ثانية تومضان معًا مرة أخرى؟`,`One light flashes every ${a} seconds and another every ${b} seconds. If they flash together now, after how many seconds will they flash together again?`),o:mkOpts(l,[a*b,a+b,gcd(a,b)]),e:bi(`المضاعف المشترك الأصغر للعددين ${a} و${b} هو ${l}`,`The LCM of ${a} and ${b} is ${l}`)}; }
   let a,b,g; do{ g=pick([4,5,6,8,9,12,15]); a=g*R(2,7); b=g*R(2,7); }while(a===b||gcd(a,b)!==g);
   return {s:'arith',q:bi(`حبلان طولاهما ${a} مترًا و${b} مترًا، يُقطعان إلى قطع متساوية بأكبر طول ممكن دون زيادة. كم طول القطعة؟`,`Two ropes, ${a} m and ${b} m long, are cut into equal pieces of the greatest possible length with nothing left over. How long is each piece?`),o:mkOpts(g,[g/2|0||g+3,a*b/g,g*2]),e:bi(`القاسم المشترك الأكبر للعددين ${a} و${b} هو ${g}`,`The GCF of ${a} and ${b} is ${g}`)}; },
 ()=>{ const p=pick([23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97]),tr=shuffle([51,57,87,91,49,77,93,39,69,27,63,81,33,21,119,111,133,143]).slice(0,3);
   return {s:'arith',q:bi('أي الأعداد الآتية عدد أولي؟','Which number is prime?'),o:[String(p),...tr.map(String)],e:bi(`${p} لا يقبل القسمة إلا على نفسه وعلى 1، أما ${tr.map(x=>{ const f=fdFac(x); return `⟦${x} = ${f[0]} × ${f[1]}⟧`; }).join(' و')}`,`${p} has no divisors other than 1 and itself, while ${tr.map(x=>{ const f=fdFac(x); return `⟦${x} = ${f[0]} × ${f[1]}⟧`; }).join(', ')}`)}; },
 ()=>{ const [a,b,c]=pick([[2,1,0],[3,1,0],[2,2,0],[3,2,0],[4,1,0],[1,1,1],[2,1,1],[4,2,0],[1,3,0],[2,0,2],[3,0,1],[5,1,0]]),n=2**a*3**b*5**c,ans=(a+1)*(b+1)*(c+1);
   const fac=[[2,a],[3,b],[5,c]].filter(x=>x[1]).map(x=>x[1]===1?`${x[0]}`:`${x[0]}^${x[1]}`).join(' × ');
   return {s:'arith',q:bi(`كم عدد القواسم الموجبة للعدد ${n}؟`,`How many positive divisors does ${n} have?`),o:mkOpts(ans,[a+b+c,ans-2,ans+2,ans/2|0]),e:bi(`⟦${n} = ${fac}⟧، وعدد القواسم ⟦${[a,b,c].filter(x=>x).map(x=>`(${x} + 1)`).join('')} = ${ans}⟧`,`⟦${n} = ${fac}⟧, so the number of divisors is ⟦${[a,b,c].filter(x=>x).map(x=>`(${x} + 1)`).join('')} = ${ans}⟧`)}; }]);

/* ---- unit 2: arithmetic ---- */
FDL('a-ratio','ar','arith','ratio',
{t:'النسبة والتناسب',d:'تقسيم مبلغ بنسبة، والتناسب الطردي والعكسي، وربط نسبتين.',
 intro:['النسبة مقارنة بين كميتين بالقسمة: إذا كان في الفصل 12 طالبًا و18 طالبة فالنسبة ⟦12 : 18 = 2 : 3⟧. والنسبة لا تخبرك بالعدد الحقيقي، بل بعدد الأجزاء.','أهم سؤال تسأله لنفسك في هذا الباب: هل الكميتان تكبران معًا (طردي)، أم تكبر إحداهما حين تصغر الأخرى (عكسي)؟'],
 rules:['النسبة ⟦أ : ب⟧ تعني ⟦أ + ب⟧ جزءًا متساويًا، وقيمة الجزء = المجموع ÷ عدد الأجزاء.','التناسب الطردي: ناتج القسمة ثابت، فاضرب تبادليًا: ⟦3/12 = 7/س → س = 28⟧','التناسب العكسي: حاصل الضرب ثابت: 12 عاملًا في 10 أيام = ⟦12 × 10 = 120⟧ يوم عمل.','ربط نسبتين: وحّد الحد المشترك: ⟦أ : ب = 2 : 3⟧ و⟦ب : ج = 4 : 5⟧ ← ⟦أ : ب : ج = 8 : 12 : 15⟧','الفرق بين جزأين معلوم؟ اقسمه على الفرق في عدد الأجزاء: في ⟦3 : 5⟧ الفرق جزءان.'],
 ex:[['وُزّع 72 ريالًا بين أخوين بنسبة ⟦4 : 5⟧. كم نصيب الأكبر؟',['عدد الأجزاء ⟦4 + 5 = 9⟧','الجزء ⟦72 ÷ 9 = 8⟧','الأكبر ⟦5 × 8 = 40⟧'],'40'],
  ['6 عمال ينهون عملًا في 15 يومًا. في كم يومًا ينهيه 9 عمال؟',['عدد العمال زاد فالأيام تقل: تناسب عكسي','⟦6 × 15 = 90⟧','⟦90 ÷ 9 = 10⟧'],'10 أيام'],
  ['إذا كان ⟦أ : ب = 2 : 3⟧ و⟦ب : ج = 4 : 5⟧ فما ⟦أ : ج⟧؟',['اجعل ب واحدًا في النسبتين: 12','⟦أ : ب = 8 : 12⟧ و⟦ب : ج = 12 : 15⟧'],'⟦8 : 15⟧']],
 traps:['استعمال الطرد في موقف عكسي: زيادة العمال لا تزيد الأيام.','قسمة المجموع على أحد حدّي النسبة بدل مجموعهما.','الخلط بين ⟦أ : ب⟧ و⟦ب : أ⟧ حين يسأل عن «نسبة البنات إلى الأولاد».']},
{t:'Ratio and proportion',d:'Splitting an amount in a ratio, direct and inverse proportion, and linking two ratios.',
 intro:['A ratio compares two quantities by division: with 12 boys and 18 girls, the ratio is ⟦12 : 18 = 2 : 3⟧. A ratio does not give the actual count, only the number of parts.','The key question here: do the two quantities grow together (direct), or does one grow as the other shrinks (inverse)?'],
 rules:['The ratio ⟦a : b⟧ means ⟦a + b⟧ equal parts; one part = total ÷ number of parts.','Direct proportion: the quotient is constant, so cross-multiply: ⟦3/12 = 7/x → x = 28⟧','Inverse proportion: the product is constant: 12 workers for 10 days = ⟦12 × 10 = 120⟧ worker-days.','Linking two ratios: make the shared term equal: ⟦a : b = 2 : 3⟧ and ⟦b : c = 4 : 5⟧ → ⟦a : b : c = 8 : 12 : 15⟧','Given the difference between two shares? Divide it by the difference in parts: in ⟦3 : 5⟧ the difference is two parts.'],
 ex:[['72 SAR is split between two brothers in the ratio ⟦4 : 5⟧. What is the larger share?',['Parts: ⟦4 + 5 = 9⟧','One part: ⟦72 ÷ 9 = 8⟧','Larger share: ⟦5 × 8 = 40⟧'],'40'],
  ['6 workers finish a job in 15 days. How many days do 9 workers need?',['More workers means fewer days: inverse','⟦6 × 15 = 90⟧','⟦90 ÷ 9 = 10⟧'],'10 days'],
  ['If ⟦a : b = 2 : 3⟧ and ⟦b : c = 4 : 5⟧, what is ⟦a : c⟧?',['Make b the same in both: 12','⟦a : b = 8 : 12⟧ and ⟦b : c = 12 : 15⟧'],'⟦8 : 15⟧']],
 traps:['Treating an inverse situation as direct: more workers do not mean more days.','Dividing the total by one term of the ratio instead of their sum.','Mixing up ⟦a : b⟧ and ⟦b : a⟧ when asked for "girls to boys".']},
[()=>{ let a=R(1,7),b=R(2,9); while(a===b||gcd(a,b)!==1) b=R(2,9); const p=R(3,15),T=(a+b)*p,big=Math.max(a,b)*p,sm=Math.min(a,b)*p;
   return {s:'arith',q:bi(`وُزّع ${arSAR(T)} بين شخصين بنسبة ⟦${a} : ${b}⟧. كم نصيب الأكبر؟`,`${T} SAR is split between two people in the ratio ⟦${a} : ${b}⟧. What is the larger share?`),o:mkOpts(big,[sm,T/Math.max(a,b)|0,big+p]),e:bi(`الجزء ⟦${T} ÷ ${a+b} = ${p}⟧، والأكبر ⟦${Math.max(a,b)} × ${p} = ${big}⟧`,`One part ⟦${T} ÷ ${a+b} = ${p}⟧; the larger share is ⟦${Math.max(a,b)} × ${p} = ${big}⟧`)}; },
 ()=>{ const n1=R(2,6),pr=R(2,9),n2=R(n1+1,15),ans=n2*pr;
   return {s:'arith',q:bi(`ثمن ${arC(n1,AN.nb)} ${arSAR(n1*pr)}. كم ثمن ${arC(n2,AN.nb)} من النوع نفسه؟`,`${n1} notebooks cost ${n1*pr} SAR. How much do ${n2} of the same notebooks cost?`),o:mkOpts(ans,[n1*pr+n2,ans-pr,ans+pr]),e:bi(`تناسب طردي: ثمن الدفتر ⟦${n1*pr} ÷ ${n1} = ${pr}⟧، و⟦${n2} × ${pr} = ${ans}⟧`,`Direct: one notebook ⟦${n1*pr} ÷ ${n1} = ${pr}⟧, and ⟦${n2} × ${pr} = ${ans}⟧`)}; },
 ()=>{ for(;;){ const w1=R(3,12),d1=R(4,20),tot=w1*d1,w2=pick([2,3,4,5,6,8,10,12,15,16,20,24]); if(w2===w1||tot%w2) continue; const ans=tot/w2;
   return {s:'arith',q:bi(`فريق من ${arC(w1,AN.worker)} ينهي عملًا في ${arC(d1,AN.day)}. في كم يومًا ينهي العمل نفسه فريق من ${arC(w2,AN.worker)} بالسرعة نفسها؟`,`${w1} workers finish a job in ${d1} days. How many days do ${w2} workers need for the same job at the same rate?`),o:mkOpts(ans,[Math.round(d1*w2/w1)||d1+1,d1+w2-w1>0?d1+w2-w1:d1+2,ans+2]),e:bi(`تناسب عكسي: ⟦${w1} × ${d1} = ${tot}⟧، و⟦${tot} ÷ ${w2} = ${ans}⟧`,`Inverse: ⟦${w1} × ${d1} = ${tot}⟧, and ⟦${tot} ÷ ${w2} = ${ans}⟧`)}; } },
 ()=>{ for(;;){ const a=R(1,5),b=R(2,6),c=R(2,6),d=R(2,7); if(gcd(a,b)!==1||gcd(c,d)!==1) continue; const l=b*c/gcd(b,c),A=a*l/b,C=d*l/c,g=gcd(A,C);
   const s=(x,y)=>`⟦${x} : ${y}⟧`; const ans=s(A/g,C/g); const o=fo(ans,[s(a,d),s(a*c,b*d),s(C/g,A/g)],i=>s(A/g+i,C/g)); if(o.length<4) continue;
   return {s:'arith',q:bi(`إذا كان ⟦أ : ب = ${a} : ${b}⟧ و⟦ب : ج = ${c} : ${d}⟧ فما ⟦أ : ج⟧؟`,`If ⟦a : b = ${a} : ${b}⟧ and ⟦b : c = ${c} : ${d}⟧, what is ⟦a : c⟧?`),o,e:bi(`اجعل ب ${l} في النسبتين: ⟦أ : ب : ج = ${A} : ${l} : ${C}⟧، فالنسبة ⟦${A/g} : ${C/g}⟧`,`Make b equal to ${l} in both: ⟦a : b : c = ${A} : ${l} : ${C}⟧, so the ratio is ⟦${A/g} : ${C/g}⟧`)}; } }]);

FDL('a-pct','ar','arith','percent',
{t:'النسبة المئوية',d:'إيجاد نسبة من عدد، ونسبة التغير، وإيجاد الكل من الجزء.',
 intro:['النسبة المئوية كسر مقامه 100: ⟦35% = 35/100⟧. وهي أكثر موضوع يتكرر في الكمي، في المسائل المباشرة وفي الجداول والرسوم أيضًا.','السر في السرعة أن تعامل النسبة ككسر مألوف أو أن تبنيها من ⟦10%⟧.'],
 rules:['⟦x%⟧ من عدد = ⟦x/100 × العدد⟧، والأسرع بالكسور: ⟦25% = 1/4⟧، ⟦20% = 1/5⟧، ⟦12.5% = 1/8⟧','ابنِ من ⟦10%⟧: ⟦10%⟧ من 360 هي 36، فـ⟦15% = 36 + 18 = 54⟧','قلب النسبة: ⟦x%⟧ من y = ⟦y%⟧ من x: ⟦8%⟧ من 50 = ⟦50%⟧ من 8 = 4','نسبة التغير = ⟦(الجديد − القديم) ÷ القديم × 100⟧','إيجاد الكل: إذا كان ⟦30%⟧ من عدد يساوي 12 فالعدد ⟦12 ÷ 0.3 = 40⟧','الزيادة ⟦20%⟧ ضرب في ⟦1.2⟧، والنقص ⟦20%⟧ ضرب في ⟦0.8⟧'],
 ex:[['ما ⟦35%⟧ من 80؟',['⟦10%⟧ = 8، فـ⟦30%⟧ = 24','⟦5%⟧ = 4','⟦24 + 4 = 28⟧'],'28'],
  ['ارتفع سعر من 40 إلى 50 ريالًا. ما نسبة الزيادة؟',['الفرق 10','القسمة على القديم: ⟦10 ÷ 40 = 0.25⟧'],'⟦25%⟧'],
  ['⟦40%⟧ من عدد تساوي 18. ما العدد؟',['⟦40% = 2/5⟧','⟦18 ÷ 2/5 = 18 × 5/2 = 45⟧'],'45']],
 traps:['القسمة على القيمة الجديدة في نسبة التغير: من 50 إلى 40 نقص ⟦20%⟧ لا ⟦25%⟧.','زيادة ⟦10%⟧ ثم نقص ⟦10%⟧ لا تعيد العدد كما كان: ⟦1.1 × 0.9 = 0.99⟧.','الخلط بين «⟦x%⟧ من» و«⟦x%⟧ أكثر من»: ⟦20%⟧ أكثر من 50 تساوي 60 لا 10.']},
{t:'Percent',d:'Finding a percent of a number, percent change, and finding the whole from a part.',
 intro:['A percent is a fraction out of 100: ⟦35% = 35/100⟧. It is the most repeated topic in the quantitative part, in word problems and in tables and charts.','The secret to speed is treating the percent as a familiar fraction, or building it from ⟦10%⟧.'],
 rules:['⟦x%⟧ of a number = ⟦x/100 × number⟧; faster with fractions: ⟦25% = 1/4⟧, ⟦20% = 1/5⟧, ⟦12.5% = 1/8⟧','Build from ⟦10%⟧: ⟦10%⟧ of 360 is 36, so ⟦15% = 36 + 18 = 54⟧','Swap: ⟦x%⟧ of y = ⟦y%⟧ of x: ⟦8%⟧ of 50 = ⟦50%⟧ of 8 = 4','Percent change = ⟦(new − old) ÷ old × 100⟧','Finding the whole: if ⟦30%⟧ of a number is 12, the number is ⟦12 ÷ 0.3 = 40⟧','A ⟦20%⟧ increase means ×⟦1.2⟧; a ⟦20%⟧ decrease means ×⟦0.8⟧'],
 ex:[['What is ⟦35%⟧ of 80?',['⟦10%⟧ = 8, so ⟦30%⟧ = 24','⟦5%⟧ = 4','⟦24 + 4 = 28⟧'],'28'],
  ['A price rose from 40 to 50 SAR. What is the percent increase?',['The difference is 10','Divide by the old value: ⟦10 ÷ 40 = 0.25⟧'],'⟦25%⟧'],
  ['⟦40%⟧ of a number is 18. What is the number?',['⟦40% = 2/5⟧','⟦18 ÷ 2/5 = 18 × 5/2 = 45⟧'],'45']],
 traps:['Dividing by the new value in percent change: 50 to 40 is a ⟦20%⟧ decrease, not ⟦25%⟧.','Up ⟦10%⟧ then down ⟦10%⟧ does not return to the start: ⟦1.1 × 0.9 = 0.99⟧.','Mixing "⟦x%⟧ of" with "⟦x%⟧ more than": ⟦20%⟧ more than 50 is 60, not 10.']},
[()=>{ const p=pick([5,15,35,45,60,65,75,85,12.5,30,70,90]),n=pick([40,80,120,160,200,240,360,400,60,20]),ans=p*n/100;
   if(!Number.isInteger(ans*2)) return FD_PCT0();
   return {s:'arith',q:bi(`ما ⟦${p}%⟧ من ${n}؟`,`What is ⟦${p}%⟧ of ${n}?`),o:mkOpts(ans,[n-ans,ans*10,ans/10,ans+n/10]),e:bi(`⟦${n} × ${p}/100 = ${N(ans)}⟧`,`⟦${n} × ${p}/100 = ${N(ans)}⟧`)}; },
 ()=>{ const [o,pc]=pick([[40,25],[50,20],[80,25],[20,15],[60,5],[25,40],[120,25],[200,15],[150,20],[80,75],[50,30],[90,10]]),up=R(0,1)===1,nw=up?o*(100+pc)/100:o*(100-pc)/100,df=Math.abs(nw-o),wrong=Math.round(df/nw*1000)/10;
   return {s:'arith',q:bi(`${up?'ارتفع':'انخفض'} سعر سلعة من ${arSAR(o)} إلى ${arSAR(nw)}. ما نسبة ${up?'الزيادة':'النقص'}؟`,`A price ${up?'rose':'fell'} from ${o} SAR to ${nw} SAR. What is the percent ${up?'increase':'decrease'}?`),o:fo(`${pc}%`,[`${wrong}%`,`${df}%`,`${pc+5}%`],i=>`${pc+5*i+5}%`),e:bi(`الفرق ${df}، والقسمة على القديم: ⟦${df} ÷ ${o} = ${pc}%⟧`,`The difference is ${df}; divide by the old price: ⟦${df} ÷ ${o} = ${pc}%⟧`)}; },
 ()=>{ const p=pick([10,20,25,30,40,60,75,15,35,45]),n=20*R(2,20),part=p*n/100;
   return {s:'arith',q:bi(`⟦${p}%⟧ من عدد تساوي ${N(part)}. ما العدد؟`,`⟦${p}%⟧ of a number is ${N(part)}. What is the number?`),o:mkOpts(n,[part*p/100,part+p,n/2,n*2]),e:bi(`⟦${N(part)} ÷ ${p/100} = ${n}⟧`,`⟦${N(part)} ÷ ${p/100} = ${n}⟧`)}; },
 ()=>{ if(R(0,1)){ const a=pick([4,8,12,16,24,36,48,44]),b=pick([25,50,75]),ans=a*b/100;
     return {s:'arith',q:bi(`ما ⟦${a}%⟧ من ${b}؟`,`What is ⟦${a}%⟧ of ${b}?`),o:mkOpts(ans,[ans*10,a,b-ans]),e:bi(`اقلب: ⟦${b}%⟧ من ${a} أسهل: ⟦${N(ans)}⟧`,`Swap: ⟦${b}%⟧ of ${a} is easier: ⟦${N(ans)}⟧`)}; }
   const p=pick([10,20,25,50]),up=R(0,1)===1,net=up?p*p/100:-p*p/100,f1=up?`زيد ${p}% ثم خُفّض ${p}%`:`خُفّض ${p}% ثم زيد ${p}%`;
   return {s:'arith',q:bi(`سعر سلعة ${f1}. ما التغير النهائي في سعرها؟`,`An item's price was ${up?`raised ${p}% and then cut ${p}%`:`cut ${p}% and then raised ${p}%`}. What is the overall change in its price?`),o:[bi(`نقص ${N(p*p/100)}%`,`a ${N(p*p/100)}% decrease`),bi('لا تغير','no change'),bi(`زيادة ${N(p*p/100)}%`,`a ${N(p*p/100)}% increase`),bi(`نقص ${2*p}%`,`a ${2*p}% decrease`)],e:bi(`⟦${(100+p)/100} × ${(100-p)/100} = ${dS((100+p)*(100-p)/10000)}⟧ أي نقص ⟦${N(p*p/100)}%⟧ في الحالتين`,`⟦${(100+p)/100} × ${(100-p)/100} = ${dS((100+p)*(100-p)/10000)}⟧, a ⟦${N(p*p/100)}%⟧ decrease either way`)}; }]);
function FD_PCT0(){ return FD.find(x=>x.id==='a-pct').g[0](); }

FDL('a-profit','ar','arith','percent',
{t:'الربح والخسارة والخصم',d:'نسبة الربح، والسعر بعد الخصم، والسعر الأصلي، والخصم المتتالي.',
 intro:['مسائل البيع والشراء تطبيق مباشر للنسبة المئوية، لكن لها لغة خاصة: التكلفة (ثمن الشراء) والبيع والربح والخصم.','القاعدة الذهبية: نسبة الربح أو الخسارة تُحسب من التكلفة، ونسبة الخصم تُحسب من السعر قبل الخصم، ما لم يقل السؤال غير ذلك.'],
 rules:['الربح = سعر البيع − التكلفة، ونسبة الربح = ⟦الربح ÷ التكلفة × 100⟧','البيع بربح ⟦p%⟧: التكلفة × ⟦(1 + p/100)⟧ ، والبيع بخسارة ⟦p%⟧: التكلفة × ⟦(1 − p/100)⟧','السعر بعد خصم ⟦d%⟧ = السعر × ⟦(1 − d/100)⟧: بعد خصم ⟦25%⟧ تدفع ⟦0.75⟧ من السعر.','السعر الأصلي = السعر بعد الخصم ÷ المعامل: ⟦160 ÷ 0.8 = 200⟧','الخصمان المتتاليان يُضربان ولا يُجمعان: ⟦0.8 × 0.9 = 0.72⟧ أي خصم ⟦28%⟧ لا ⟦30%⟧'],
 ex:[['اشترى تاجر سلعة بـ250 ريالًا وباعها بـ300. ما نسبة ربحه؟',['الربح ⟦300 − 250 = 50⟧','⟦50 ÷ 250 = 20%⟧'],'⟦20%⟧'],
  ['سعر حقيبة بعد خصم ⟦25%⟧ هو 180 ريالًا. كم سعرها الأصلي؟',['تدفع ⟦0.75⟧ من السعر','⟦180 ÷ 0.75 = 240⟧'],'240'],
  ['خصم ⟦20%⟧ ثم خصم ⟦10%⟧ على السعر الجديد. كم الخصم الكلي؟',['⟦0.8 × 0.9 = 0.72⟧','تدفع ⟦72%⟧ فالخصم ⟦28%⟧'],'⟦28%⟧']],
 traps:['حساب نسبة الربح من سعر البيع بدل التكلفة.','جمع الخصمين المتتاليين.','إيجاد السعر الأصلي بإضافة ⟦25%⟧ إلى السعر بعد الخصم: ⟦180 × 1.25 = 225⟧ خطأ، والصحيح 240.']},
{t:'Profit, loss and discount',d:'Profit percent, price after a discount, original price and successive discounts.',
 intro:['Buying and selling problems apply percents directly, but they have their own words: cost (purchase price), selling price, profit and discount.','The golden rule: profit or loss percent is taken from the cost, and a discount percent from the price before the discount, unless the question says otherwise.'],
 rules:['Profit = selling price − cost; profit percent = ⟦profit ÷ cost × 100⟧','Selling at a ⟦p%⟧ profit: cost × ⟦(1 + p/100)⟧; at a ⟦p%⟧ loss: cost × ⟦(1 − p/100)⟧','Price after a ⟦d%⟧ discount = price × ⟦(1 − d/100)⟧: after ⟦25%⟧ off you pay ⟦0.75⟧ of the price.','Original price = discounted price ÷ the factor: ⟦160 ÷ 0.8 = 200⟧','Successive discounts multiply, they do not add: ⟦0.8 × 0.9 = 0.72⟧, a ⟦28%⟧ discount, not ⟦30%⟧'],
 ex:[['A trader bought an item for 250 SAR and sold it for 300. What is his profit percent?',['Profit ⟦300 − 250 = 50⟧','⟦50 ÷ 250 = 20%⟧'],'⟦20%⟧'],
  ['After a ⟦25%⟧ discount a bag costs 180 SAR. What was its original price?',['You pay ⟦0.75⟧ of the price','⟦180 ÷ 0.75 = 240⟧'],'240'],
  ['A ⟦20%⟧ discount, then ⟦10%⟧ off the new price. What is the total discount?',['⟦0.8 × 0.9 = 0.72⟧','You pay ⟦72%⟧, so the discount is ⟦28%⟧'],'⟦28%⟧']],
 traps:['Taking the profit percent from the selling price instead of the cost.','Adding successive discounts.','Finding the original price by adding ⟦25%⟧ to the discounted price: ⟦180 × 1.25 = 225⟧ is wrong; the answer is 240.']},
[()=>{ const c=pick([80,120,150,200,240,250,400,500,600,800]),p=pick([10,20,25,30,40,50,15,5]),loss=R(0,3)===0&&p<50,s=loss?c*(100-p)/100:c*(100+p)/100,df=Math.abs(s-c),wrong=Math.round(df/s*1000)/10;
   return {s:'arith',q:bi(`اشترى تاجر سلعة بـ${arSAR(c)} وباعها بـ${arSAR(s)}. ما نسبة ${loss?'خسارته':'ربحه'}؟`,`A trader bought an item for ${c} SAR and sold it for ${s} SAR. What is his percent ${loss?'loss':'profit'}?`),o:fo(`${p}%`,[`${wrong}%`,`${df}%`,`${p+10}%`],i=>`${p+5*i+5}%`),e:bi(`${loss?'الخسارة':'الربح'} ${df}، والقسمة على التكلفة: ⟦${df} ÷ ${c} = ${p}%⟧`,`The ${loss?'loss':'profit'} is ${df}; divide by the cost: ⟦${df} ÷ ${c} = ${p}%⟧`)}; },
 ()=>{ const P=pick([80,120,150,200,240,300,360,400,450,500]),d=pick([10,15,20,25,30,40]),ans=P*(100-d)/100;
   return {s:'arith',q:bi(`سعر جهاز ${arSAR(P)}، وعليه خصم ⟦${d}%⟧. كم سعره بعد الخصم؟`,`A device costs ${P} SAR with a ⟦${d}%⟧ discount. What is its price after the discount?`),o:mkOpts(ans,[P*d/100,P-d,ans-10]),e:bi(`⟦${P} × ${(100-d)/100} = ${N(ans)}⟧`,`⟦${P} × ${(100-d)/100} = ${N(ans)}⟧`)}; },
 ()=>{ const [d,f]=pick([[20,.8],[25,.75],[40,.6],[10,.9],[50,.5],[30,.7],[15,.85]]),P=pick([20,40,60,80,100,120,200,240,300,400]),after=+(P*f).toFixed(4);
   return {s:'arith',q:bi(`سعر سلعة بعد خصم ⟦${d}%⟧ هو ${arSAR(after)}. كم سعرها قبل الخصم؟`,`After a ⟦${d}%⟧ discount an item costs ${after} SAR. What was its price before the discount?`),o:mkOpts(P,[Math.round(after*(100+d)/100),after+d,Math.round(after/(d/100))]),e:bi(`تدفع ⟦${f}⟧ من السعر: ⟦${after} ÷ ${f} = ${P}⟧`,`You pay ⟦${f}⟧ of the price: ⟦${after} ÷ ${f} = ${P}⟧`)}; },
 ()=>{ const [a,b]=pick([[20,10],[20,20],[10,10],[30,10],[25,20],[50,20],[40,10],[20,25],[10,20],[30,20]]),pay=(100-a)*(100-b)/100,tot=100-pay;
   return {s:'arith',q:bi(`خُفّض سعر سلعة ⟦${a}%⟧، ثم خُفّض السعر الجديد ⟦${b}%⟧. كم نسبة الخصم الكلية؟`,`An item's price was cut ⟦${a}%⟧, then the new price was cut ⟦${b}%⟧. What is the total discount?`),o:fo(`${N(tot)}%`,[`${a+b}%`,`${N(pay)}%`,`${N(a*b/100)}%`],i=>`${N(tot+i)}%`),e:bi(`⟦${(100-a)/100} × ${(100-b)/100} = ${dS(pay/100)}⟧، فالخصم ⟦${N(tot)}%⟧`,`⟦${(100-a)/100} × ${(100-b)/100} = ${dS(pay/100)}⟧, so the discount is ⟦${N(tot)}%⟧`)}; }]);

FDL('a-speed','ar','arith','speed',
{t:'السرعة والمسافة والزمن',d:'العلاقة الثلاثية، وتوحيد الوحدات، والسرعة المتوسطة، والالتقاء.',
 intro:['كل مسائل الحركة تقوم على علاقة واحدة: ⟦المسافة = السرعة × الزمن⟧. غطِّ المجهول في المثلث تظهر العلاقة التي تحتاجها.','معظم الأخطاء هنا ليست في الفكرة، بل في الوحدات: دقائق مع ساعات، أو أمتار مع كيلومترات.'],
 rules:['⟦المسافة = السرعة × الزمن⟧، ⟦السرعة = المسافة ÷ الزمن⟧، ⟦الزمن = المسافة ÷ السرعة⟧','حوّل الدقائق إلى ساعات بالقسمة على 60: ⟦45 دقيقة = 3/4 ساعة⟧، ⟦20 دقيقة = 1/3 ساعة⟧','من كم/س إلى م/ث: اضرب في ⟦5/18⟧: ⟦72 كم/س = 20 م/ث⟧','السرعة المتوسطة = المسافة الكلية ÷ الزمن الكلي، وليست متوسط السرعتين.','جسمان متقابلان: اجمع السرعتين. جسمان في الاتجاه نفسه (ملاحقة): اطرح الصغرى من الكبرى.'],
 ex:[['قطعت سيارة 180 كم في ساعتين وربع. ما سرعتها؟',['⟦2 ساعة و15 دقيقة = 2.25 ساعة⟧','⟦180 ÷ 2.25 = 80⟧'],'80 كم/س'],
  ['ذهب شخص إلى مدينة بسرعة 60 كم/س وعاد بسرعة 40 كم/س على الطريق نفسه. ما سرعته المتوسطة؟',['لتكن المسافة 120 كم: الذهاب ساعتان، والعودة 3 ساعات','المسافة الكلية 240 في 5 ساعات','⟦240 ÷ 5 = 48⟧'],'48 كم/س'],
  ['سيارتان متقابلتان المسافة بينهما 300 كم، سرعتاهما 70 و80 كم/س. متى تلتقيان؟',['تقتربان بسرعة ⟦70 + 80 = 150⟧','⟦300 ÷ 150 = 2⟧'],'بعد ساعتين']],
 traps:['قسمة المسافة على الدقائق مباشرة دون تحويلها إلى ساعات.','حساب السرعة المتوسطة بمتوسط السرعتين: ⟦(60 + 40) ÷ 2 = 50⟧ خطأ.','جمع السرعتين في الملاحقة بدل طرحهما.']},
{t:'Speed, distance and time',d:'The three-way relation, consistent units, average speed and meeting problems.',
 intro:['Every motion problem rests on one relation: ⟦distance = speed × time⟧. Cover the unknown in the triangle and the formula you need appears.','Most mistakes here are not about the idea but about units: minutes with hours, or meters with kilometers.'],
 rules:['⟦distance = speed × time⟧, ⟦speed = distance ÷ time⟧, ⟦time = distance ÷ speed⟧','Minutes to hours: divide by 60: ⟦45 min = 3/4 h⟧, ⟦20 min = 1/3 h⟧','km/h to m/s: multiply by ⟦5/18⟧: ⟦72 km/h = 20 m/s⟧','Average speed = total distance ÷ total time, not the average of the speeds.','Moving toward each other: add the speeds. Same direction (chasing): subtract the smaller from the larger.'],
 ex:[['A car covers 180 km in 2 hours 15 minutes. What is its speed?',['⟦2 h 15 min = 2.25 h⟧','⟦180 ÷ 2.25 = 80⟧'],'80 km/h'],
  ['Someone drives to a city at 60 km/h and back on the same road at 40 km/h. What is the average speed?',['Say the distance is 120 km: 2 hours there, 3 hours back','Total 240 km in 5 hours','⟦240 ÷ 5 = 48⟧'],'48 km/h'],
  ['Two cars 300 km apart drive toward each other at 70 and 80 km/h. When do they meet?',['They close in at ⟦70 + 80 = 150⟧','⟦300 ÷ 150 = 2⟧'],'After 2 hours']],
 traps:['Dividing the distance by minutes without converting to hours.','Averaging the two speeds: ⟦(60 + 40) ÷ 2 = 50⟧ is wrong.','Adding the speeds in a chase instead of subtracting.']},
[()=>{ const [m,fr]=pick([[15,.25],[30,.5],[45,.75],[20,1/3],[40,2/3],[12,.2],[36,.6]]),h=R(1,3),v=pick([40,60,80,90,120,30,45,75]),t=h+fr,D=v*t;
   if(!Number.isInteger(D)) return FD.find(x=>x.id==='a-speed').g[0]();
   return {s:'arith',q:bi(`قطعت سيارة ${D} كم في ${h===1?'ساعة':h===2?'ساعتين':h+' ساعات'} و${m} دقيقة. ما سرعتها بالكيلومتر في الساعة؟`,`A car covers ${D} km in ${h} h ${m} min. What is its speed in km/h?`),o:mkOpts(v,[Math.round(D/(h+m/100)),Math.round(D/h),v+10]),e:bi(`⟦${m} دقيقة = ${fdS(m,60)} ساعة⟧، فالزمن ⟦${dS(+t.toFixed(4))}⟧ ساعة، والسرعة ⟦${D} ÷ ${dS(+t.toFixed(4))} = ${v}⟧`,`⟦${m} min = ${fdS(m,60)} h⟧, so the time is ⟦${dS(+t.toFixed(4))}⟧ h and the speed is ⟦${D} ÷ ${dS(+t.toFixed(4))} = ${v}⟧`)}; },
 ()=>{ const [a,b]=pick([[60,40],[30,60],[40,60],[20,30],[60,90],[30,20],[90,60],[80,120],[40,10],[60,120]]),ans=2*a*b/(a+b),d=a*b/gcd(a,b);
   return {s:'arith',q:bi(`ذهب شخص إلى قرية بسرعة ${a} كم/س، وعاد على الطريق نفسه بسرعة ${b} كم/س. ما سرعته المتوسطة في الرحلة كلها؟`,`Someone went to a village at ${a} km/h and came back on the same road at ${b} km/h. What was the average speed for the whole trip?`),o:mkOpts(ans,[(a+b)/2,Math.max(a,b)-5,ans+4]),e:bi(`لتكن المسافة ${d} كم: الزمن ⟦${d/a} + ${d/b} = ${d/a+d/b}⟧، والمتوسط ⟦${2*d} ÷ ${d/a+d/b} = ${N(ans)}⟧`,`Say the distance is ${d} km: time ⟦${d/a} + ${d/b} = ${d/a+d/b}⟧ h, average ⟦${2*d} ÷ ${d/a+d/b} = ${N(ans)}⟧`)}; },
 ()=>{ const v1=10*R(4,9),v2=10*R(4,10),t=R(2,5),opp=R(0,1)===1||v1===v2;
   if(opp){ const D=(v1+v2)*t; return {s:'arith',q:bi(`سيارتان المسافة بينهما ${D} كم، تتحركان نحو بعضهما بسرعتي ${v1} و${v2} كم/س. بعد كم ساعة تلتقيان؟`,`Two cars ${D} km apart drive toward each other at ${v1} and ${v2} km/h. After how many hours do they meet?`),o:mkOpts(t,[Math.round(D/Math.max(v1,v2)),t+1,t*2]),e:bi(`تقتربان بسرعة ⟦${v1} + ${v2} = ${v1+v2}⟧، و⟦${D} ÷ ${v1+v2} = ${t}⟧`,`They close in at ⟦${v1} + ${v2} = ${v1+v2}⟧, and ⟦${D} ÷ ${v1+v2} = ${t}⟧`)}; }
   const f=Math.max(v1,v2),s=Math.min(v1,v2),D=(f-s)*t;
   return {s:'arith',q:bi(`تسير شاحنة بسرعة ${s} كم/س، وخلفها على بُعد ${D} كم سيارة تسير في الاتجاه نفسه بسرعة ${f} كم/س. بعد كم ساعة تلحق بها؟`,`A truck drives at ${s} km/h, and ${D} km behind it a car drives the same way at ${f} km/h. After how many hours does the car catch up?`),o:mkOpts(t,[Math.round(D/(f+s))||t+2,t+1,t*2]),e:bi(`في الملاحقة نطرح: ⟦${f} − ${s} = ${f-s}⟧، و⟦${D} ÷ ${f-s} = ${t}⟧`,`In a chase, subtract: ⟦${f} − ${s} = ${f-s}⟧, and ⟦${D} ÷ ${f-s} = ${t}⟧`)}; },
 ()=>{ const k=pick([18,36,54,72,90,108,126,144]),ms=k*5/18;
   if(R(0,1)) return {s:'arith',q:bi(`سرعة قطار ${k} كم/س. كم سرعته بالمتر في الثانية؟`,`A train travels at ${k} km/h. What is its speed in m/s?`),o:mkOpts(ms,[k/3.6*10,k*1000/60|0,ms+5]),e:bi(`⟦${k} × 5/18 = ${ms}⟧`,`⟦${k} × 5/18 = ${ms}⟧`)};
   const tt=pick([10,20,30,15,40]),Lm=ms*tt;
   return {s:'arith',q:bi(`يسير عدّاء بسرعة ثابتة فيقطع ${Lm} مترًا في ${tt} ثانية. كم سرعته بالكيلومتر في الساعة؟`,`A runner at a steady pace covers ${Lm} m in ${tt} s. What is the speed in km/h?`),o:mkOpts(k,[ms,k/2,k+18]),e:bi(`⟦${Lm} ÷ ${tt} = ${ms}⟧ م/ث، و⟦${ms} × 18/5 = ${k}⟧ كم/س`,`⟦${Lm} ÷ ${tt} = ${ms}⟧ m/s, and ⟦${ms} × 18/5 = ${k}⟧ km/h`)}; }]);

FDL('a-work','ar','arith','work',
{t:'العمل المشترك والأنابيب',d:'معدل الإنجاز، والعمل معًا، والأنبوب الذي يملأ والآخر الذي يفرّغ.',
 intro:['الفكرة كلها في «المعدل»: من ينهي العمل في 6 أيام ينجز ⟦1/6⟧ منه كل يوم. حين يعمل اثنان معًا نجمع ما ينجزه كل واحد في اليوم.','الأنابيب مسائل عمل أيضًا: أنبوب الملء ينجز موجبًا، وأنبوب التفريغ ينجز سالبًا.'],
 rules:['المعدل = ⟦1 ÷ الزمن⟧','العمل معًا: ⟦1/a + 1/b = 1/t⟧، واختصارها لشخصين: ⟦t = ab ÷ (a + b)⟧','الملء والتفريغ معًا: ⟦1/الملء − 1/التفريغ⟧','العمل المنجز + العمل الباقي = 1 (العمل كله).','عدد العمال × عدد الأيام = حجم العمل، وهو تناسب عكسي.'],
 ex:[['ينهي أحمد عملًا في 6 ساعات، وينهيه خالد في 3 ساعات. في كم ساعة ينهيانه معًا؟',['⟦1/6 + 1/3 = 1/6 + 2/6 = 1/2⟧','ينجزان نصف العمل كل ساعة'],'ساعتان'],
  ['صنبور يملأ حوضًا في 4 ساعات، وتصريف يفرّغه في 12 ساعة. إذا فُتحا معًا، ففي كم ساعة يمتلئ؟',['⟦1/4 − 1/12 = 3/12 − 1/12 = 2/12 = 1/6⟧'],'6 ساعات'],
  ['عمل يحتاج 6 أيام من سعد وحده. عمل سعد يومين، ثم انضم إليه فهد الذي ينهي العمل وحده في 12 يومًا. كم يومًا يحتاجان لإكمال الباقي؟',['أنجز سعد ⟦2/6 = 1/3⟧، والباقي ⟦2/3⟧','معدلهما معًا ⟦1/6 + 1/12 = 1/4⟧','⟦2/3 ÷ 1/4 = 8/3⟧'],'⟦8/3⟧ يوم (يومان وثلثا يوم)']],
 traps:['جمع الزمنين: ⟦6 + 3 = 9⟧ ساعات، مع أن العمل معًا أسرع من أسرعهما.','حساب متوسط الزمنين بدل جمع المعدلين.','نسيان أن التفريغ يُطرح.']},
{t:'Combined work and pipes',d:'Work rates, working together, and one pipe filling while another drains.',
 intro:['The whole idea is the rate: someone who finishes a job in 6 days does ⟦1/6⟧ of it each day. When two work together, add what each does per day.','Pipes are work problems too: a filling pipe does positive work, a draining pipe negative work.'],
 rules:['Rate = ⟦1 ÷ time⟧','Together: ⟦1/a + 1/b = 1/t⟧, and for two people: ⟦t = ab ÷ (a + b)⟧','Filling and draining together: ⟦1/fill − 1/drain⟧','Work done + work left = 1 (the whole job).','Workers × days = the size of the job, an inverse proportion.'],
 ex:[['Ahmed finishes a job in 6 hours and Khalid in 3 hours. How long do they take together?',['⟦1/6 + 1/3 = 1/6 + 2/6 = 1/2⟧','They do half the job each hour'],'2 hours'],
  ['A tap fills a tank in 4 hours and a drain empties it in 12 hours. With both open, how long until it is full?',['⟦1/4 − 1/12 = 3/12 − 1/12 = 2/12 = 1/6⟧'],'6 hours'],
  ['Saad alone needs 6 days for a job. He worked 2 days, then Fahd, who needs 12 days alone, joined him. How many days do they need for the rest?',['Saad did ⟦2/6 = 1/3⟧; ⟦2/3⟧ is left','Together their rate is ⟦1/6 + 1/12 = 1/4⟧','⟦2/3 ÷ 1/4 = 8/3⟧'],'⟦8/3⟧ days (2⅔ days)']],
 traps:['Adding the times: ⟦6 + 3 = 9⟧ hours, though working together is faster than the faster one.','Averaging the times instead of adding the rates.','Forgetting to subtract the drain.']},
[()=>{ const [a,b]=pick([[6,3],[4,12],[10,15],[12,6],[3,6],[20,30],[6,12],[8,24],[5,20],[2,6],[12,4],[9,18],[15,10],[30,20],[36,12]]),t=a*b/(a+b);
   return {s:'arith',q:bi(`ينهي عامل عملًا في ${arC(a,AN.hour)}، وينهيه آخر في ${arC(b,AN.hour)}. في كم ساعة ينهيانه معًا؟`,`One worker finishes a job in ${a} hours and another in ${b} hours. How many hours do they take together?`),o:mkOpts(t,[a+b,(a+b)/2,Math.min(a,b)+1]),e:bi(`⟦1/${a} + 1/${b} = ${fdS(a+b,a*b)}⟧، فالزمن ⟦${a*b} ÷ ${a+b} = ${N(t)}⟧`,`⟦1/${a} + 1/${b} = ${fdS(a+b,a*b)}⟧, so the time is ⟦${a*b} ÷ ${a+b} = ${N(t)}⟧`)}; },
 ()=>{ const [f,d]=pick([[4,12],[3,6],[6,12],[2,6],[5,20],[6,10],[3,12],[4,6],[10,15],[8,24],[2,3]]),t=f*d/(d-f);
   return {s:'arith',q:bi(`صنبور يملأ حوضًا في ${arC(f,AN.hour)}، وتصريف يفرّغه في ${arC(d,AN.hour)}. إذا فُتحا معًا والحوض فارغ، ففي كم ساعة يمتلئ؟`,`A tap fills a tank in ${f} hours and a drain empties it in ${d} hours. Both are opened with the tank empty. How many hours until it is full?`),o:mkOpts(t,[f*d/(f+d),d-f,f+d]),e:bi(`⟦1/${f} − 1/${d} = ${fdS(d-f,f*d)}⟧، فالزمن ⟦${N(t)}⟧ ساعة`,`⟦1/${f} − 1/${d} = ${fdS(d-f,f*d)}⟧, so it takes ⟦${N(t)}⟧ hours`)}; },
 ()=>{ const [a,b]=pick([[6,3],[12,4],[10,15],[20,30],[6,12],[24,8],[12,6],[18,9],[15,10],[30,20],[40,10],[60,20]]),t=a*b/(a+b);
   return {s:'arith',q:bi(`ينهي عاملان معًا عملًا في ${arC(t,AN.day)}. إذا كان أحدهما ينهيه وحده في ${arC(a,AN.day)}، ففي كم يومًا ينهيه الآخر وحده؟`,`Two workers together finish a job in ${N(t)} days. One of them alone needs ${a} days. How many days does the other need alone?`),o:mkOpts(b,[a-t>0?a-t:a+2,a*t/(a+t),b+t]),e:bi(`⟦1/${N(t)} − 1/${a} = ${fdS(1,b)}⟧، فالآخر ينهيه في ${arC(b,AN.day)}`,`⟦1/${N(t)} − 1/${a} = ${fdS(1,b)}⟧, so the other needs ${b} days`)}; },
 ()=>{ for(;;){ const w=R(4,12),d=R(6,24),done=R(2,d-2),add=R(3,8),tot=w*d,left=tot-w*done; if(left%(w+add)) continue; const ans=left/(w+add);
   return {s:'arith',q:bi(`فريق من ${arC(w,AN.worker)} يُنهي بناء سور في ${arC(d,AN.day)}. بعد ${arC(done,AN.day)} من العمل انضم إليهم ${add} عمال بالكفاءة نفسها. كم يومًا يحتاجون لإكمال العمل؟`,`${w} workers can build a wall in ${d} days. After ${done} days, ${add} more workers with the same skill join them. How many more days do they need?`),o:mkOpts(ans,[d-done,tot/(w+add)|0,ans+2]),e:bi(`العمل ⟦${w} × ${d} = ${tot}⟧، المنجز ⟦${w} × ${done} = ${w*done}⟧، الباقي ${left}، و⟦${left} ÷ ${w+add} = ${ans}⟧`,`The job is ⟦${w} × ${d} = ${tot}⟧ worker-days; done ⟦${w} × ${done} = ${w*done}⟧; left ${left}; ⟦${left} ÷ ${w+add} = ${ans}⟧`)}; } }]);

FDL('a-age','ar','arith','balance',
{t:'الأعمار والمسائل اللفظية',d:'تحويل الجملة إلى معادلة، وثبات فرق العمرين.',
 intro:['المسألة اللفظية جملة عربية تخفي معادلة. مهمتك أن تترجمها كلمة بكلمة: «ضعف» ضرب في 2، و«يزيد على» جمع، و«أصغر بـ» طرح.','مسائل الأعمار أشهر هذا النوع، ولها حقيقتان تحلان معظمها: الفرق بين عمري شخصين لا يتغير أبدًا، وبعد n سنة يزيد عمر كل شخص n.'],
 rules:['اجعل المجهول الأصغر رمزًا (عمر الابن ⟦س⟧) وعبّر عن الباقي به.','بعد n سنة: كل عمر يزيد n. وقبل n سنة: كل عمر ينقص n.','الفرق بين عمرين ثابت في كل زمن.','مجموع أعمار k أشخاص يزيد بعد n سنة بمقدار ⟦k × n⟧.','جرّب الخيارات في الشروط: أسرع كثيرًا في أسئلة الأعمار.'],
 ex:[['عمر الأب أربعة أمثال عمر ابنه، ومجموع عمريهما 50. كم عمر الابن؟',['الابن ⟦س⟧ والأب ⟦4س⟧','⟦5س = 50⟧'],'10'],
  ['عمر الأب الآن 36 سنة وعمر ابنه 8. بعد كم سنة يصبح عمر الأب ثلاثة أمثال عمر ابنه؟',['⟦36 + n = 3(8 + n)⟧','⟦36 + n = 24 + 3n⟧','⟦2n = 12⟧'],'بعد 6 سنوات'],
  ['مجموع أعمار 4 إخوة الآن 40 سنة. كم مجموعها بعد 5 سنوات؟',['كل أخ يزيد 5','⟦40 + 4 × 5 = 60⟧'],'60']],
 traps:['إضافة n مرة واحدة إلى مجموع الأعمار بدل إضافتها لكل شخص.','نسيان إضافة السنوات للطرفين في المعادلة.','الإجابة بعمر الأب حين يسأل عن عمر الابن: أعد قراءة المطلوب.']},
{t:'Ages and word problems',d:'Turning sentences into equations, and the constant age gap.',
 intro:['A word problem is a sentence hiding an equation. Translate it word by word: "twice" is ×2, "more than" is addition, "younger by" is subtraction.','Age problems are the best-known type, and two facts solve most of them: the gap between two ages never changes, and after n years everyone is n years older.'],
 rules:['Let the smallest unknown be the variable (son\'s age ⟦x⟧) and write the rest in terms of it.','After n years every age grows by n; n years ago every age was n less.','The difference between two ages is the same at every time.','The sum of k people\'s ages grows by ⟦k × n⟧ after n years.','Test the choices against the conditions: often much faster for ages.'],
 ex:[['A father is four times as old as his son, and their ages add up to 50. How old is the son?',['Son ⟦x⟧, father ⟦4x⟧','⟦5x = 50⟧'],'10'],
  ['A father is 36 and his son is 8. In how many years will the father be three times as old as the son?',['⟦36 + n = 3(8 + n)⟧','⟦36 + n = 24 + 3n⟧','⟦2n = 12⟧'],'In 6 years'],
  ['Four brothers\' ages add up to 40 now. What will the total be in 5 years?',['Each brother gains 5','⟦40 + 4 × 5 = 60⟧'],'60']],
 traps:['Adding n once to a sum of ages instead of once per person.','Forgetting to add the years to both people in the equation.','Answering with the father\'s age when the question asks for the son\'s: reread what is asked.']},
[()=>{ const k=R(2,6),s=R(4,14),T=(k+1)*s;
   return {s:'arith',q:bi(`عمر الأم ${['','','مثلا','ثلاثة أمثال','أربعة أمثال','خمسة أمثال','ستة أمثال'][k]} عمر ابنتها، ومجموع عمريهما ${arC(T,AN.year)}. كم عمر البنت؟`,`A mother is ${['','','twice','three times','four times','five times','six times'][k]} as old as her daughter, and their ages add up to ${T}. How old is the daughter?`),o:mkOpts(s,[k*s,T/k|0,s+2]),e:bi(`⟦س + ${k}س = ${T}⟧، ⟦${k+1}س = ${T}⟧، فعمر البنت ${s}`,`⟦x + ${k}x = ${T}⟧, ⟦${k+1}x = ${T}⟧, so the daughter is ${s}`)}; },
 ()=>{ for(;;){ const k=pick([2,3]),n=R(2,12),s=R(3,15),f=k*(s+n)-n; if(f<s+18||f>60) continue;
   return {s:'arith',q:bi(`عمر الأب الآن ${arC(f,AN.year)}، وعمر ابنه ${arC(s,AN.year)}. بعد كم سنة يصبح عمر الأب ${k===2?'مثلي':'ثلاثة أمثال'} عمر ابنه؟`,`A father is ${f} and his son is ${s}. In how many years will the father be ${k===2?'twice':'three times'} as old as his son?`),o:mkOpts(n,[f-k*s>0?f-k*s:n+3,(f-s)/k|0,n+2]),e:bi(`⟦${f} + n = ${k}(${s} + n)⟧ ⟵ ⟦${f} − ${k*s} = ${k-1===1?'':k-1}n⟧، ⟦n = ${n}⟧`,`⟦${f} + n = ${k}(${s} + n)⟧ → ⟦${f} − ${k*s} = ${k-1===1?'':k-1}n⟧, ⟦n = ${n}⟧`)}; } },
 ()=>{ const k=R(3,6),S=R(30,90),n=R(2,8),ans=S+k*n;
   return {s:'arith',q:bi(`مجموع أعمار ${k===3?'ثلاثة':k===4?'أربعة':k===5?'خمسة':'ستة'} أصدقاء الآن ${arC(S,AN.year)}. كم يكون مجموع أعمارهم بعد ${arC(n,AN.year)}؟`,`The ages of ${k} friends add up to ${S} now. What will their total be in ${n} years?`),o:mkOpts(ans,[S+n,S+n*(k-1),ans+k]),e:bi(`كل واحد يزيد ${n}: ⟦${S} + ${k} × ${n} = ${ans}⟧`,`Each gains ${n}: ⟦${S} + ${k} × ${n} = ${ans}⟧`)}; },
 ()=>{ for(;;){ const d=R(2,9),n=R(2,7),y=R(4,16),T=2*y+d+2*n; if(T>70) continue;
   return {s:'arith',q:bi(`أخوان يكبر أحدهما الآخر بـ${arC(d,AN.year)}، وبعد ${arC(n,AN.year)} يصبح مجموع عمريهما ${arC(T,AN.year)}. كم عمر الأكبر الآن؟`,`Two brothers are ${d} years apart. In ${n} years their ages will add up to ${T}. How old is the older one now?`),o:mkOpts(y+d,[y,y+d+n,(T-d)/2|0]),e:bi(`الأصغر ⟦س⟧: ⟦(س + ${n}) + (س + ${d} + ${n}) = ${T}⟧، ⟦2س = ${2*y}⟧، فالأصغر ${y} والأكبر ${y+d}`,`Younger ⟦x⟧: ⟦(x + ${n}) + (x + ${d} + ${n}) = ${T}⟧, ⟦2x = ${2*y}⟧, so the younger is ${y} and the older ${y+d}`)}; } }]);

const fct=n=>n<=1?1:n*fct(n-1);
FDL('a-count','ar','arith','prob',
{t:'العد والاحتمال',d:'مبدأ العد، والترتيب والاختيار، واحتمال الحادثة.',
 intro:['أسئلة العد تسأل: «بكم طريقة؟». وأسئلة الاحتمال تسأل: «ما فرصة أن يحدث؟». والثانية مبنية على الأولى.','القاعدة الأساسية بسيطة: إذا كان للاختيار الأول m طرق وللثاني n طرق، فلهما معًا ⟦m × n⟧ طريقة.'],
 rules:['مبدأ العد: اضرب عدد طرق كل مرحلة: 3 قمصان و4 بناطيل = ⟦3 × 4 = 12⟧ زيًّا.','الترتيب يهم (صفوف، أرقام، مراكز): ترتيب n أشياء ⟦n! = n × (n − 1) × … × 1⟧، و⟦4! = 24⟧','الترتيب لا يهم (لجنة، مصافحات، مباريات): لاختيار اثنين من n: ⟦n(n − 1) ÷ 2⟧','الاحتمال = عدد النواتج المطلوبة ÷ عدد النواتج الممكنة، وقيمته بين 0 و1.','حدثان مستقلان معًا: اضرب الاحتمالين. واحتمال ألا يقع الحدث ⟦= 1 − P⟧'],
 ex:[['تصافح 6 أشخاص كلٌّ مع الآخر مرة واحدة. كم مصافحة حدثت؟',['اختيار اثنين والترتيب لا يهم','⟦6 × 5 ÷ 2 = 15⟧'],'15'],
  ['بكم طريقة يجلس 4 طلاب على 4 كراسٍ في صف؟',['الكرسي الأول 4 خيارات، ثم 3، ثم 2، ثم 1','⟦4! = 24⟧'],'24'],
  ['كيس فيه 3 كرات حمراء و5 زرقاء. سُحبت كرة عشوائيًا. ما احتمال أن تكون حمراء؟',['الممكن 8، والمطلوب 3'],'⟦3/8⟧']],
 traps:['عدّ المصافحة مرتين: مصافحة أحمد لخالد هي مصافحة خالد لأحمد.','جمع الطرق بدل ضربها حين تكون المراحل متتالية.','نسيان الكرات الأخرى في المقام: الاحتمال ⟦3/8⟧ لا ⟦3/5⟧.']},
{t:'Counting and probability',d:'The counting principle, arrangements and selections, and the probability of an event.',
 intro:['Counting questions ask "in how many ways?". Probability questions ask "what are the chances it happens?". The second builds on the first.','The basic rule is simple: if the first choice has m ways and the second has n, together they have ⟦m × n⟧ ways.'],
 rules:['Counting principle: multiply the ways at each stage: 3 shirts and 4 trousers = ⟦3 × 4 = 12⟧ outfits.','Order matters (lines, digits, places): arranging n things is ⟦n! = n × (n − 1) × … × 1⟧, and ⟦4! = 24⟧','Order does not matter (committees, handshakes, matches): choosing two from n is ⟦n(n − 1) ÷ 2⟧','Probability = favorable outcomes ÷ possible outcomes, a value between 0 and 1.','Two independent events both happening: multiply. The chance an event does not happen ⟦= 1 − P⟧'],
 ex:[['6 people each shake hands once with everyone else. How many handshakes?',['Choose two; order does not matter','⟦6 × 5 ÷ 2 = 15⟧'],'15'],
  ['In how many ways can 4 students sit on 4 chairs in a row?',['4 choices for the first chair, then 3, then 2, then 1','⟦4! = 24⟧'],'24'],
  ['A bag has 3 red and 5 blue balls. One is drawn at random. What is the probability it is red?',['8 possible, 3 favorable'],'⟦3/8⟧']],
 traps:['Counting each handshake twice: Ahmed with Khalid is the same as Khalid with Ahmed.','Adding the ways instead of multiplying when the stages come one after another.','Leaving out the other balls in the denominator: the probability is ⟦3/8⟧, not ⟦3/5⟧.']},
[()=>{ const a=R(3,7),b=R(3,6),c=R(0,1)?R(3,4):0,ans=a*b*(c||1);
   return {s:'arith',q:bi(`لدى سارة ${a} فساتين و${b} أحذية${c?` و${c} حقائب`:''}. بكم طريقة يمكنها اختيار ${c?'فستان وحذاء وحقيبة':'فستان وحذاء'}؟`,`Sara has ${a} dresses, ${b} pairs of shoes${c?` and ${c} bags`:''}. In how many ways can she choose ${c?'a dress, shoes and a bag':'a dress and shoes'}?`),o:mkOpts(ans,[a+b+c,ans/2|0||ans+3,ans+a]),e:bi(`مبدأ العد: ⟦${a} × ${b}${c?` × ${c}`:''} = ${ans}⟧`,`Counting principle: ⟦${a} × ${b}${c?` × ${c}`:''} = ${ans}⟧`)}; },
 ()=>{ const n=R(4,12),ans=n*(n-1)/2,m=R(0,1);
   return {s:'arith',q:bi(m?`في دوري ${n} فرق، يلعب كل فريق مع كل فريق آخر مباراة واحدة. كم مباراة في الدوري؟`:`تصافح ${n} أشخاص، كلٌّ مع الآخرين مرة واحدة. كم مصافحة حدثت؟`,m?`In a league of ${n} teams, each team plays every other team once. How many matches are there?`:`${n} people each shake hands once with everyone else. How many handshakes are there?`),o:mkOpts(ans,[n*(n-1),n*n,ans+n]),e:bi(`اختيار اثنين والترتيب لا يهم: ⟦${n} × ${n-1} ÷ 2 = ${ans}⟧`,`Choose two, order does not matter: ⟦${n} × ${n-1} ÷ 2 = ${ans}⟧`)}; },
 ()=>{ const r=R(2,7),b=R(2,8),g=R(0,1)?R(1,5):0,T=r+b+g,ask=pick(['r','b']),k=ask==='r'?r:b;
   const cs=bi(`${r} كرات حمراء و${b} زرقاء${g?` و${g} خضراء`:''}`,`${r} red, ${b} blue${g?` and ${g} green`:''} balls`);
   return {s:'arith',q:bi(`كيس فيه ${cs.ar}. سُحبت كرة عشوائيًا. ما احتمال أن تكون ${ask==='r'?'حمراء':'زرقاء'}؟`,`A bag has ${cs.en}. One ball is drawn at random. What is the probability that it is ${ask==='r'?'red':'blue'}?`),o:fo(F(k,T),[F(k,T-k),F(T-k,T),F(1,T)],i=>F(k+i,T+i)),e:bi(`المطلوب ${k} من أصل ${T}: ⟦${fdS(k,T)}⟧`,`${k} favorable out of ${T}: ⟦${fdS(k,T)}⟧`)}; },
 ()=>{ const t=R(0,2);
   if(t===0){ const n=R(3,6),ans=fct(n); return {s:'arith',q:bi(`بكم طريقة يمكن ترتيب ${n} كتب مختلفة على رف في صف واحد؟`,`In how many ways can ${n} different books be arranged in a row on a shelf?`),o:mkOpts(ans,[n*n,n*(n-1),ans/2]),e:bi(`⟦${n}! = ${[...Array(n)].map((_,i)=>n-i).join(' × ')} = ${ans}⟧`,`⟦${n}! = ${[...Array(n)].map((_,i)=>n-i).join(' × ')} = ${ans}⟧`)}; }
   if(t===1){ const s=pick([4,5,6,7,8,9,10,11,12]),w=[...Array(6)].flatMap((_,i)=>[...Array(6)].map((_,j)=>i+j+2)).filter(x=>x===s).length;
     return {s:'arith',q:bi(`أُلقي حجرا نرد معًا. ما احتمال أن يكون مجموع العددين الظاهرين ${s}؟`,`Two dice are rolled. What is the probability that the two numbers add up to ${s}?`),o:fo(F(w,36),[F(1,s),F(w,12),F(w+1,36)],i=>F(w+1+i,36)),e:bi(`النواتج الممكنة ⟦6 × 6 = 36⟧، والتي مجموعها ${s} عددها ${w}: ⟦${fdS(w,36)}⟧`,`There are ⟦6 × 6 = 36⟧ outcomes, and ${w} of them add up to ${s}: ⟦${fdS(w,36)}⟧`)}; }
   const k=R(2,4),h=R(0,1); return {s:'arith',q:bi(`أُلقيت قطعة نقد ${k===2?'مرتين':k===3?'ثلاث مرات':'أربع مرات'}. ما احتمال ${h?'ظهور الصورة في كل مرة':'ألا تظهر الكتابة في أي مرة'}؟`,`A coin is tossed ${k} times. What is the probability of ${h?'heads every time':'never getting tails'}?`),o:fo(F(1,2**k),[F(1,2*k),F(1,k),F(k,2**k)],i=>F(1,2**k+i)),e:bi(`رميات مستقلة: ⟦${Array(k).fill('1/2').join(' × ')} = ${fdS(1,2**k)}⟧`,`Independent tosses: ⟦${Array(k).fill('1/2').join(' × ')} = ${fdS(1,2**k)}⟧`)}; }]);

/* ---- unit 3: algebra ---- */
const lin=(a,b,v)=>{ const x=a===0?'':cf(a,v); if(b===0) return x||'0'; return x?`${x} ${b<0?'−':'+'} ${Math.abs(b)}`:N(b); }; /* ax + b */
FDL('l-expr','al','algebra','balance',
{t:'العبارات الجبرية والتعويض',d:'جمع الحدود المتشابهة، وفك الأقواس، والتعويض بقيم سالبة.',
 intro:['العبارة الجبرية حساب فيه حروف تمثل أعدادًا مجهولة أو متغيرة، مثل ⟦3س + 5⟧. قبل أن تحل أي معادلة، يجب أن تجيد تبسيط العبارة والتعويض فيها.','وفي الاختبار سؤال متكرر يطلب قيمة عبارة كاملة دون أن يطلب قيمة المتغير نفسه، وله حيلة نتعلمها هنا.'],
 rules:['تُجمع الحدود المتشابهة فقط: ⟦3س + 5س = 8س⟧، ولا يُجمع ⟦س⟧ مع ⟦س^2⟧ ولا مع عدد.','فك القوس بالتوزيع: ⟦3(س − 4) = 3س − 12⟧، والسالب قبل القوس يقلب كل إشارة داخله: ⟦−(س − 2) = −س + 2⟧','عند التعويض ضع القيمة بين قوسين: إذا ⟦س = −2⟧ فإن ⟦س^2 = (−2)^2 = 4⟧ و⟦−س = 2⟧','ضرب الحدود: اضرب المعاملات واجمع الأسس: ⟦2س × 3س = 6س^2⟧','اطلب العبارة كلها: إذا ⟦س + ص = 7⟧ فإن ⟦3س + 3ص = 3 × 7 = 21⟧ دون معرفة س وص.'],
 ex:[['بسّط ⟦4(س + 2) − 2(س − 3)⟧',['⟦4س + 8 − 2س + 6⟧','⟦2س + 14⟧'],'⟦2س + 14⟧'],
  ['إذا كان ⟦س = −3⟧ فما قيمة ⟦2س^2 − س⟧؟',['⟦2 × (−3)^2 = 2 × 9 = 18⟧','⟦−س = 3⟧','⟦18 + 3 = 21⟧'],'21'],
  ['إذا كان ⟦2أ − ب = 5⟧ فما قيمة ⟦6أ − 3ب + 1⟧؟',['⟦6أ − 3ب = 3(2أ − ب) = 15⟧','⟦15 + 1 = 16⟧'],'16']],
 traps:['نسيان قلب إشارة الحد الثاني داخل القوس بعد السالب: ⟦−2(س − 3) = −2س + 6⟧ لا ⟦−2س − 6⟧.','⟦−س^2⟧ عند ⟦س = −3⟧ تساوي ⟦−9⟧ لا ⟦9⟧.','جمع حدود غير متشابهة: ⟦2س + 3 ≠ 5س⟧.']},
{t:'Algebraic expressions and substitution',d:'Combining like terms, expanding brackets, and substituting negative values.',
 intro:['An algebraic expression is arithmetic with letters standing for unknown or changing numbers, like ⟦3x + 5⟧. Before solving any equation you must be able to simplify an expression and substitute into it.','A frequent test question asks for the value of a whole expression without asking for the variable itself, and there is a trick for it.'],
 rules:['Only like terms combine: ⟦3x + 5x = 8x⟧, but ⟦x⟧ does not combine with ⟦x^2⟧ or with a number.','Expand by distributing: ⟦3(x − 4) = 3x − 12⟧; a minus before a bracket flips every sign inside: ⟦−(x − 2) = −x + 2⟧','When substituting, put the value in brackets: if ⟦x = −2⟧ then ⟦x^2 = (−2)^2 = 4⟧ and ⟦−x = 2⟧','Multiplying terms: multiply coefficients and add exponents: ⟦2x × 3x = 6x^2⟧','Aim for the whole expression: if ⟦x + y = 7⟧ then ⟦3x + 3y = 3 × 7 = 21⟧ without knowing x and y.'],
 ex:[['Simplify ⟦4(x + 2) − 2(x − 3)⟧',['⟦4x + 8 − 2x + 6⟧','⟦2x + 14⟧'],'⟦2x + 14⟧'],
  ['If ⟦x = −3⟧, what is ⟦2x^2 − x⟧?',['⟦2 × (−3)^2 = 2 × 9 = 18⟧','⟦−x = 3⟧','⟦18 + 3 = 21⟧'],'21'],
  ['If ⟦2a − b = 5⟧, what is ⟦6a − 3b + 1⟧?',['⟦6a − 3b = 3(2a − b) = 15⟧','⟦15 + 1 = 16⟧'],'16']],
 traps:['Not flipping the second sign inside a bracket after a minus: ⟦−2(x − 3) = −2x + 6⟧, not ⟦−2x − 6⟧.','⟦−x^2⟧ at ⟦x = −3⟧ is ⟦−9⟧, not ⟦9⟧.','Combining unlike terms: ⟦2x + 3 ≠ 5x⟧.']},
[()=>{ const a=R(2,6),b=R(1,6),c=R(2,5),d=R(1,6),A=a-c,B=a*b+c*d; const ex=v=>`${a}(${v} + ${b}) − ${c}(${v} − ${d})`,o=v=>[`⟦${lin(A,B,v)}⟧`,`⟦${lin(A,a*b-c*d,v)}⟧`,`⟦${lin(a+c,B,v)}⟧`,`⟦${lin(A,b+d,v)}⟧`];
   const oa=o('س'),oe=o('x'); if(new Set(oa).size<4) return FD.find(x=>x.id==='l-expr').g[0]();
   return {s:'algebra',q:bi(`أبسط صورة للعبارة ⟦${ex('س')}⟧ هي:`,`⟦${ex('x')}⟧ simplifies to:`),o:oa.map((x,i)=>bi(x,oe[i])),e:bi(`⟦${a}س + ${a*b} − ${c}س + ${c*d} = ${lin(A,B,'س')}⟧`,`⟦${a}x + ${a*b} − ${c}x + ${c*d} = ${lin(A,B,'x')}⟧`)}; },
 ()=>{ const x=-R(1,5),a=R(2,4),b=R(1,6),ans=a*x*x-b*x;
   return {s:'algebra',q:bi(`إذا كان ⟦س = ${N(x)}⟧ فما قيمة ⟦${a}س^2 − ${b}س⟧؟`,`If ⟦x = ${N(x)}⟧, what is ⟦${a}x^2 − ${b}x⟧?`),o:mkOpts(ans,[a*x*x+b*x,-a*x*x-b*x,a*x*x],N,true),e:bi(`⟦${a} × (${N(x)})^2 = ${a*x*x}⟧ و⟦−${b} × (${N(x)}) = ${-b*x}⟧، والمجموع ${ans}`,`⟦${a} × (${N(x)})^2 = ${a*x*x}⟧ and ⟦−${b} × (${N(x)}) = ${-b*x}⟧; the total is ${ans}`)}; },
 ()=>{ const p=R(2,5),k=R(2,9),c=R(1,9),m=R(2,4),ans=m*k+c,pl=R(0,1);
   return {s:'algebra',q:bi(`إذا كان ⟦${p}أ ${pl?'+':'−'} ب = ${k}⟧ فما قيمة ⟦${m*p}أ ${pl?'+':'−'} ${m}ب + ${c}⟧؟`,`If ⟦${p}a ${pl?'+':'−'} b = ${k}⟧, what is ⟦${m*p}a ${pl?'+':'−'} ${m}b + ${c}⟧?`),o:mkOpts(ans,[m*k,k+c,m*(k+c)]),e:bi(`⟦${m*p}أ ${pl?'+':'−'} ${m}ب = ${m}(${p}أ ${pl?'+':'−'} ب) = ${m*k}⟧، ثم ⟦${m*k} + ${c} = ${ans}⟧`,`⟦${m*p}a ${pl?'+':'−'} ${m}b = ${m}(${p}a ${pl?'+':'−'} b) = ${m*k}⟧, then ⟦${m*k} + ${c} = ${ans}⟧`)}; },
 ()=>{ const x=R(-4,4)||2,y=R(-4,4)||-1,ans=x*x-2*x*y+y*y;
   return {s:'algebra',q:bi(`إذا كان ⟦س = ${N(x)}⟧ و⟦ص = ${N(y)}⟧ فما قيمة ⟦س^2 − 2س ص + ص^2⟧؟`,`If ⟦x = ${N(x)}⟧ and ⟦y = ${N(y)}⟧, what is ⟦x^2 − 2xy + y^2⟧?`),o:mkOpts(ans,[x*x+2*x*y+y*y,x*x+y*y,(x+y)**2+1],N,true),e:bi(`العبارة تساوي ⟦(س − ص)^2 = (${N(x)} − (${N(y)}))^2 = ${N(x-y)}^2 = ${ans}⟧`,`The expression is ⟦(x − y)^2 = (${N(x)} − (${N(y)}))^2 = ${N(x-y)}^2 = ${ans}⟧`)}; }]);

FDL('l-eq','al','algebra','balance',
{t:'المعادلات الخطية',d:'حل المعادلة بخطوات الميزان، ومع الكسور، وبالضرب التبادلي.',
 intro:['المعادلة ميزان متوازن: ما تفعله في كفة تفعله في الأخرى حتى يبقى المجهول وحده. ⟦3س − 7 = 11⟧ تصبح ⟦3س = 18⟧ ثم ⟦س = 6⟧.','وفي الاختيار من متعدد تملك طريقًا ثانيًا دائمًا: عوّض الخيارات في المعادلة، فالذي يحققها هو الجواب.'],
 rules:['انقل الحدود: اجمع المجهول في طرف والأعداد في الطرف الآخر، والحد ينتقل بإشارة معاكسة.','اقسم الطرفين على معامل المجهول في الخطوة الأخيرة.','مع الكسور: اضرب الطرفين في المقام المشترك لتختفي الكسور: ⟦س/3 + س/4 = 7 → 4س + 3س = 84⟧','كسر يساوي كسرًا: اضرب تبادليًا: ⟦(س + 1)/3 = (س − 1)/2 → 2س + 2 = 3س − 3⟧','تحقق بالتعويض في المعادلة الأصلية؛ يكشف الأخطاء في ثوانٍ.'],
 ex:[['حل ⟦5س − 7 = 2س + 8⟧',['⟦5س − 2س = 8 + 7⟧','⟦3س = 15⟧'],'⟦س = 5⟧'],
  ['حل ⟦س/3 + س/4 = 14⟧',['اضرب في 12: ⟦4س + 3س = 168⟧','⟦7س = 168⟧'],'⟦س = 24⟧'],
  ['حل ⟦(س + 1)/3 = (س − 1)/2⟧',['اضرب تبادليًا: ⟦2(س + 1) = 3(س − 1)⟧','⟦2س + 2 = 3س − 3⟧'],'⟦س = 5⟧']],
 traps:['نقل الحد دون قلب إشارته.','ضرب حد واحد فقط في المقام المشترك ونسيان بقية الحدود.','الإجابة بقيمة س حين يسأل عن ⟦س + 2⟧ أو ⟦2س⟧.']},
{t:'Linear equations',d:'Solving with balance steps, with fractions, and by cross-multiplying.',
 intro:['An equation is a balanced scale: whatever you do to one side you do to the other until the unknown is alone. ⟦3x − 7 = 11⟧ becomes ⟦3x = 18⟧, then ⟦x = 6⟧.','In multiple choice you always have a second route: plug the choices into the equation; the one that works is the answer.'],
 rules:['Move terms: unknowns on one side, numbers on the other; a term changes sign when it crosses.','Divide both sides by the coefficient of the unknown at the end.','With fractions: multiply both sides by the common denominator to clear them: ⟦x/3 + x/4 = 7 → 4x + 3x = 84⟧','A fraction equal to a fraction: cross-multiply: ⟦(x + 1)/3 = (x − 1)/2 → 2x + 2 = 3x − 3⟧','Check by substituting into the original equation; it catches mistakes in seconds.'],
 ex:[['Solve ⟦5x − 7 = 2x + 8⟧',['⟦5x − 2x = 8 + 7⟧','⟦3x = 15⟧'],'⟦x = 5⟧'],
  ['Solve ⟦x/3 + x/4 = 14⟧',['Multiply by 12: ⟦4x + 3x = 168⟧','⟦7x = 168⟧'],'⟦x = 24⟧'],
  ['Solve ⟦(x + 1)/3 = (x − 1)/2⟧',['Cross-multiply: ⟦2(x + 1) = 3(x − 1)⟧','⟦2x + 2 = 3x − 3⟧'],'⟦x = 5⟧']],
 traps:['Moving a term without changing its sign.','Multiplying only one term by the common denominator and forgetting the rest.','Giving x when the question asks for ⟦x + 2⟧ or ⟦2x⟧.']},
[()=>{ const a=R(2,9),x=R(-6,12)||3,b=R(-15,15)||4,c=a*x+b;
   return {s:'algebra',q:bi(`إذا كان ⟦${lin(a,b,'س')} = ${N(c)}⟧ فما قيمة س؟`,`If ⟦${lin(a,b,'x')} = ${N(c)}⟧, what is x?`),o:mkOpts(x,[(c+b)/a,c-b,x+1].map(v=>Math.round(v*100)/100),N,true),e:bi(`⟦${a}س = ${N(c)} ${b<0?'+':'−'} ${Math.abs(b)} = ${N(c-b)}⟧، ⟦س = ${N(x)}⟧`,`⟦${a}x = ${N(c)} ${b<0?'+':'−'} ${Math.abs(b)} = ${N(c-b)}⟧, ⟦x = ${N(x)}⟧`)}; },
 ()=>{ for(;;){ const a=R(3,9),c=R(1,a-1),x=R(-5,10)||2,b=R(-12,12),d=(a-c)*x+b; if(d===b) continue;
   return {s:'algebra',q:bi(`حل المعادلة ⟦${lin(a,b,'س')} = ${lin(c,d,'س')}⟧`,`Solve ⟦${lin(a,b,'x')} = ${lin(c,d,'x')}⟧`),o:mkOpts(x,[(d+b)/(a-c),(d-b)/(a+c),-x].map(v=>Math.round(v*100)/100),v=>`س = ${N(v)}`,true).map(s=>bi(`⟦${s}⟧`,`⟦${s.replace('س','x')}⟧`)),e:bi(`⟦${a}س − ${c}س = ${N(d)} ${b<0?'+':'−'} ${Math.abs(b)}⟧، ⟦${a-c===1?'':a-c}س = ${N(d-b)}⟧، ⟦س = ${N(x)}⟧`,`⟦${a}x − ${c}x = ${N(d)} ${b<0?'+':'−'} ${Math.abs(b)}⟧, ⟦${a-c===1?'':a-c}x = ${N(d-b)}⟧, ⟦x = ${N(x)}⟧`)}; } },
 ()=>{ const [p,q]=pick([[2,3],[3,4],[2,5],[3,5],[4,5],[2,4],[3,6],[4,6]]),l=p*q/gcd(p,q),x=l*R(1,6),s=x/p+x/q;
   return {s:'algebra',q:bi(`إذا كان ⟦س/${p} + س/${q} = ${s}⟧ فما قيمة س؟`,`If ⟦x/${p} + x/${q} = ${s}⟧, what is x?`),o:mkOpts(x,[s*(p+q)/2|0,s*l/(p+q)*2|0||x+l,x+l]),e:bi(`اضرب في ${l}: ⟦${l/p}س + ${l/q}س = ${s*l}⟧، ⟦${l/p+l/q}س = ${s*l}⟧، ⟦س = ${x}⟧`,`Multiply by ${l}: ⟦${l/p}x + ${l/q}x = ${s*l}⟧, ⟦${l/p+l/q}x = ${s*l}⟧, ⟦x = ${x}⟧`)}; },
 ()=>{ for(;;){ const p=R(2,6),q=R(2,6),a=R(-5,5),b=R(-5,5); if(p===q||a===b) continue; const num=p*b-q*a; if(num%(q-p)) continue; const x=num/(q-p); if(x===0||Math.abs(x)>30) continue;
   const t=(v,k)=>`${v} ${k<0?'−':'+'} ${Math.abs(k)}`; if(a===0||b===0) continue;
   return {s:'algebra',q:bi(`إذا كان ⟦(${t('س',a)})/${p} = (${t('س',b)})/${q}⟧ فما قيمة س؟`,`If ⟦(${t('x',a)})/${p} = (${t('x',b)})/${q}⟧, what is x?`),o:mkOpts(x,[-x,(p*b+q*a)/(q-p),x+p].map(v=>Math.round(v*100)/100),N,true),e:bi(`اضرب تبادليًا: ⟦${q}(${t('س',a)}) = ${p}(${t('س',b)})⟧، ⟦${q}س ${q*a<0?'−':'+'} ${Math.abs(q*a)} = ${p}س ${p*b<0?'−':'+'} ${Math.abs(p*b)}⟧، ⟦س = ${N(x)}⟧`,`Cross-multiply: ⟦${q}(${t('x',a)}) = ${p}(${t('x',b)})⟧, ⟦${q}x ${q*a<0?'−':'+'} ${Math.abs(q*a)} = ${p}x ${p*b<0?'−':'+'} ${Math.abs(p*b)}⟧, ⟦x = ${N(x)}⟧`)}; } }]);

FDL('l-sys','al','algebra','balance',
{t:'معادلتان بمجهولين',d:'الحذف والتعويض، وطلب مجموع المجهولين مباشرة، ومسائل الرؤوس والأرجل.',
 intro:['حين يكون عندك مجهولان تحتاج معادلتين. والهدف دائمًا أن تتخلص من أحد المجهولين لتبقى معادلة بمجهول واحد تعرف حلها.','في الاختبار كثيرًا ما يُطلب ⟦س + ص⟧ أو ⟦س − ص⟧ لا كل مجهول وحده، وهنا يختصر جمع المعادلتين أو طرحهما الحل كله.'],
 rules:['الحذف: اجمع المعادلتين أو اطرحهما ليختفي أحد المتغيرين، واضرب إحداهما في عدد إن احتجت.','التعويض: أوجد أحد المتغيرين من معادلة سهلة وعوّضه في الأخرى.','إذا كانت المعادلتان «متماثلتين» مثل ⟦2س + ص⟧ و⟦س + 2ص⟧ فاجمعهما: ⟦3س + 3ص⟧','المجموع والفرق: الأكبر ⟦= (المجموع + الفرق) ÷ 2⟧، والأصغر ⟦= (المجموع − الفرق) ÷ 2⟧','مسائل الرؤوس والأرجل والتذاكر تُترجم إلى معادلتين: واحدة للعدد وأخرى للقيمة.'],
 ex:[['إذا كان ⟦س + ص = 10⟧ و⟦س − ص = 4⟧ فما س و ص؟',['اجمع: ⟦2س = 14⟧، ⟦س = 7⟧','⟦ص = 10 − 7 = 3⟧'],'⟦س = 7⟧ ، ⟦ص = 3⟧'],
  ['إذا كان ⟦2س + ص = 11⟧ و⟦س + 2ص = 13⟧ فما ⟦س + ص⟧؟',['اجمع المعادلتين: ⟦3س + 3ص = 24⟧','اقسم على 3'],'8'],
  ['في حظيرة دجاج وأغنام، عدد الرؤوس 20 وعدد الأرجل 56. كم عدد الأغنام؟',['لو كانت كلها دجاجًا لكانت الأرجل 40','الزيادة ⟦56 − 40 = 16⟧، وكل خروف يزيد رجلين','⟦16 ÷ 2 = 8⟧'],'8']],
 traps:['طرح المعادلتين مع نسيان قلب إشارة الحد الثاني.','حل كل مجهول وحده حين يطلب السؤال مجموعهما؛ يضيع وقتًا.','في الرؤوس والأرجل: الإجابة بعدد الدجاج حين يُسأل عن الأغنام.']},
{t:'Two equations in two unknowns',d:'Elimination and substitution, asking for the sum directly, and heads-and-legs problems.',
 intro:['With two unknowns you need two equations. The goal is always to get rid of one unknown so you are left with a one-unknown equation you know how to solve.','The test often asks for ⟦x + y⟧ or ⟦x − y⟧ rather than each unknown, and adding or subtracting the equations does the whole job.'],
 rules:['Elimination: add or subtract the equations so one variable disappears, multiplying one equation by a number if needed.','Substitution: find one variable from an easy equation and put it into the other.','If the equations mirror each other, like ⟦2x + y⟧ and ⟦x + 2y⟧, add them: ⟦3x + 3y⟧','Sum and difference: larger ⟦= (sum + difference) ÷ 2⟧, smaller ⟦= (sum − difference) ÷ 2⟧','Heads-and-legs and ticket problems become two equations: one for the count, one for the value.'],
 ex:[['If ⟦x + y = 10⟧ and ⟦x − y = 4⟧, find x and y.',['Add: ⟦2x = 14⟧, ⟦x = 7⟧','⟦y = 10 − 7 = 3⟧'],'⟦x = 7⟧, ⟦y = 3⟧'],
  ['If ⟦2x + y = 11⟧ and ⟦x + 2y = 13⟧, what is ⟦x + y⟧?',['Add the equations: ⟦3x + 3y = 24⟧','Divide by 3'],'8'],
  ['A pen has chickens and sheep: 20 heads and 56 legs. How many sheep?',['If all were chickens there would be 40 legs','The extra ⟦56 − 40 = 16⟧, and each sheep adds 2 legs','⟦16 ÷ 2 = 8⟧'],'8']],
 traps:['Subtracting equations and forgetting to flip the sign of the second term.','Solving for each unknown when the sum is asked; it wastes time.','Heads and legs: giving the number of chickens when sheep are asked.']},
[()=>{ const y=R(1,15),x=y+R(1,12),S=x+y,D=x-y,big=R(0,1);
   return {s:'algebra',q:bi(`عددان مجموعهما ${S} والفرق بينهما ${D}. ما العدد ${big?'الأكبر':'الأصغر'}؟`,`Two numbers add up to ${S} and differ by ${D}. What is the ${big?'larger':'smaller'} number?`),o:mkOpts(big?x:y,[big?y:x,S/2|0,D,(S+D)/2+D]),e:bi(`الأكبر ⟦(${S} + ${D}) ÷ 2 = ${x}⟧، والأصغر ⟦(${S} − ${D}) ÷ 2 = ${y}⟧`,`Larger ⟦(${S} + ${D}) ÷ 2 = ${x}⟧, smaller ⟦(${S} − ${D}) ÷ 2 = ${y}⟧`)}; },
 ()=>{ const a=R(2,5),x=R(1,9),y=R(1,9),s1=a*x+y,s2=x+a*y,sum=(s1+s2)/(a+1);
   return {s:'algebra',q:bi(`إذا كان ⟦${a}س + ص = ${s1}⟧ و⟦س + ${a}ص = ${s2}⟧ فما قيمة ⟦س + ص⟧؟`,`If ⟦${a}x + y = ${s1}⟧ and ⟦x + ${a}y = ${s2}⟧, what is ⟦x + y⟧?`),o:mkOpts(sum,[s1+s2,(s1+s2)/2,Math.abs(s1-s2)||sum+2]),e:bi(`اجمع: ⟦${a+1}س + ${a+1}ص = ${s1+s2}⟧، فـ⟦س + ص = ${sum}⟧`,`Add: ⟦${a+1}x + ${a+1}y = ${s1+s2}⟧, so ⟦x + y = ${sum}⟧`)}; },
 ()=>{ const s=R(3,15),c=R(3,20),H=s+c,Lg=4*s+2*c,ask=R(0,1);
   return {s:'algebra',q:bi(`في مزرعة دجاج وأغنام، عدد الرؤوس ${H} وعدد الأرجل ${Lg}. كم عدد ${ask?'الأغنام':'الدجاج'}؟`,`A farm has chickens and sheep: ${H} heads and ${Lg} legs. How many ${ask?'sheep':'chickens'} are there?`),o:mkOpts(ask?s:c,[ask?c:s,Lg/4|0,H/2|0]),e:bi(`لو كانت كلها دجاجًا لكانت الأرجل ${2*H}. الزيادة ⟦${Lg} − ${2*H} = ${Lg-2*H}⟧، والأغنام ⟦${Lg-2*H} ÷ 2 = ${s}⟧، والدجاج ${c}`,`If all were chickens there would be ${2*H} legs. The extra ⟦${Lg} − ${2*H} = ${Lg-2*H}⟧, so sheep ⟦${Lg-2*H} ÷ 2 = ${s}⟧ and chickens ${c}`)}; },
 ()=>{ const pa=pick([20,25,30,40,50]),pc=pick([10,15,20]),a=R(3,20),c=R(3,20),n=a+c,tot=a*pa+c*pc;
   if(pa<=pc) return FD.find(x=>x.id==='l-sys').g[3]();
   return {s:'algebra',q:bi(`بِيعت ${n} تذكرة لعرض: تذكرة الكبار بـ${arSAR(pa)} وتذكرة الصغار بـ${arSAR(pc)}، والمبيعات ${arSAR(tot)}. كم تذكرة كبار بِيعت؟`,`${n} tickets were sold for a show: adults ${pa} SAR, children ${pc} SAR, for ${tot} SAR in all. How many adult tickets were sold?`),o:mkOpts(a,[c,Math.round(tot/pa),n-a+1]),e:bi(`لو كانت كلها للصغار لكانت ⟦${n} × ${pc} = ${n*pc}⟧. الفرق ⟦${tot} − ${n*pc} = ${tot-n*pc}⟧، وكل تذكرة كبار تزيد ${pa-pc}: ⟦${tot-n*pc} ÷ ${pa-pc} = ${a}⟧`,`If all were children's tickets: ⟦${n} × ${pc} = ${n*pc}⟧. The difference ⟦${tot} − ${n*pc} = ${tot-n*pc}⟧, and each adult ticket adds ${pa-pc}: ⟦${tot-n*pc} ÷ ${pa-pc} = ${a}⟧`)}; }]);

const ineq=(v,op,k)=>`${v} ${op} ${N(k)}`;
FDL('l-ineq','al','algebra','numline',
{t:'المتباينات',d:'حل المتباينة، وقلب الإشارة عند الضرب في سالب، وعد الأعداد الصحيحة.',
 intro:['المتباينة مثل المعادلة، لكن حلها مجموعة من القيم لا قيمة واحدة: ⟦س > 3⟧ تعني كل عدد أكبر من 3.','تُحل بخطوات المعادلة نفسها، مع قاعدة واحدة إضافية يقع فيها كثيرون: الضرب أو القسمة على عدد سالب يقلب اتجاه الإشارة.'],
 rules:['حل المتباينة كالمعادلة: انقل الحدود ثم اقسم على المعامل.','الضرب أو القسمة على سالب يقلب الإشارة: ⟦−2س > 6 → س < −3⟧','المتباينة المركبة: طبّق الخطوة على الأطراف الثلاثة معًا: ⟦−1 < 2س + 1 < 7 → −1 < س < 3⟧','عد الأعداد الصحيحة: انتبه للطرفين؛ ⟦≤⟧ تشمل الطرف و⟦<⟧ لا تشمله.','القيمة المطلقة: ⟦|س| < 3⟧ تعني ⟦−3 < س < 3⟧، و⟦|س| > 3⟧ تعني ⟦س > 3⟧ أو ⟦س < −3⟧'],
 ex:[['حل ⟦3 − 2س ≥ 9⟧',['⟦−2س ≥ 6⟧','القسمة على ⟦−2⟧ تقلب الإشارة'],'⟦س ≤ −3⟧'],
  ['كم عددًا صحيحًا يحقق ⟦−2 ≤ س < 4⟧؟',['⟦−2، −1، 0، 1، 2، 3⟧','الطرف 4 غير مشمول'],'6'],
  ['حل ⟦|س − 1| ≤ 2⟧',['⟦−2 ≤ س − 1 ≤ 2⟧','أضف 1 للأطراف الثلاثة'],'⟦−1 ≤ س ≤ 3⟧']],
 traps:['نسيان قلب الإشارة عند القسمة على سالب.','عد الطرف غير المشمول في ⟦<⟧ أو نسيان الصفر عند عد الأعداد الصحيحة.','الظن أن ⟦س^2 > 4⟧ تعني ⟦س > 2⟧ فقط؛ تشمل أيضًا ⟦س < −2⟧.']},
{t:'Inequalities',d:'Solving inequalities, flipping the sign for negatives, and counting integers.',
 intro:['An inequality is like an equation, but its solution is a set of values rather than one value: ⟦x > 3⟧ means every number greater than 3.','You solve it with the same steps as an equation, plus one rule many students miss: multiplying or dividing by a negative number flips the sign.'],
 rules:['Solve like an equation: move terms, then divide by the coefficient.','Multiplying or dividing by a negative flips the sign: ⟦−2x > 6 → x < −3⟧','Compound inequality: apply each step to all three parts: ⟦−1 < 2x + 1 < 7 → −1 < x < 3⟧','Counting integers: watch the ends; ⟦≤⟧ includes the end and ⟦<⟧ does not.','Absolute value: ⟦|x| < 3⟧ means ⟦−3 < x < 3⟧, and ⟦|x| > 3⟧ means ⟦x > 3⟧ or ⟦x < −3⟧'],
 ex:[['Solve ⟦3 − 2x ≥ 9⟧',['⟦−2x ≥ 6⟧','Dividing by ⟦−2⟧ flips the sign'],'⟦x ≤ −3⟧'],
  ['How many integers satisfy ⟦−2 ≤ x < 4⟧?',['⟦−2, −1, 0, 1, 2, 3⟧','4 is not included'],'6'],
  ['Solve ⟦|x − 1| ≤ 2⟧',['⟦−2 ≤ x − 1 ≤ 2⟧','Add 1 to all three parts'],'⟦−1 ≤ x ≤ 3⟧']],
 traps:['Forgetting to flip the sign when dividing by a negative.','Counting an end that ⟦<⟧ excludes, or forgetting zero when counting integers.','Thinking ⟦x^2 > 4⟧ means only ⟦x > 2⟧; it also includes ⟦x < −2⟧.']},
[()=>{ const a=R(2,7),k=R(-5,8),b=R(-12,12),c=a*k+b,op=pick(['>','≥','<','≤']),opp={'>':'<','<':'>','≥':'≤','≤':'≥'}[op];
   const O=(v,o2,kk)=>`⟦${ineq(v,o2,kk).replace('<','&lt;').replace('>','&gt;')}⟧`; const mk=v=>[O(v,op,k),O(v,opp,k),O(v,op,-k===k?k+1:-k),O(v,op,(c+b)/a===k?k+2:Math.round((c+b)/a*100)/100)];
   const oa=mk('س'),oe=mk('x'); if(new Set(oa).size<4) return FD.find(x=>x.id==='l-ineq').g[0]();
   return {s:'algebra',q:bi(`حل المتباينة ⟦${lin(a,b,'س')} ${op} ${N(c)}⟧`,`Solve ⟦${lin(a,b,'x')} ${op} ${N(c)}⟧`),o:oa.map((x,i)=>bi(x,oe[i])),e:bi(`⟦${a}س ${op} ${N(c-b)}⟧، ثم القسمة على ${a} (موجب) لا تقلب الإشارة: ⟦${ineq('س',op,k)}⟧`,`⟦${a}x ${op} ${N(c-b)}⟧; dividing by ${a} (positive) keeps the sign: ⟦${ineq('x',op,k)}⟧`)}; },
 ()=>{ const a=R(2,6),k=R(-6,6),b=R(-10,10),c=-a*k+b,op=pick(['>','≥','<','≤']),opp={'>':'<','<':'>','≥':'≤','≤':'≥'}[op];
   const O=(v,o2,kk)=>`⟦${ineq(v,o2,kk).replace('<','&lt;').replace('>','&gt;')}⟧`; const mk=v=>[O(v,opp,k),O(v,op,k),O(v,opp,-k===k?k-1:-k),O(v,op,-k===k?k+1:-k)];
   const oa=mk('س'),oe=mk('x'); if(new Set(oa).size<4) return FD.find(x=>x.id==='l-ineq').g[1]();
   const L=v=>`${b===0?'':N(b)+' '}${b===0?'−':'−'} ${a}${v}`.trim();
   return {s:'algebra',q:bi(`حل المتباينة ⟦${b===0?`−${a}س`:`${N(b)} − ${a}س`} ${op} ${N(c)}⟧`,`Solve ⟦${b===0?`−${a}x`:`${N(b)} − ${a}x`} ${op} ${N(c)}⟧`),o:oa.map((x,i)=>bi(x,oe[i])),e:bi(`⟦−${a}س ${op} ${N(c-b)}⟧، والقسمة على ⟦−${a}⟧ تقلب الإشارة: ⟦${ineq('س',opp,k)}⟧`,`⟦−${a}x ${op} ${N(c-b)}⟧; dividing by ⟦−${a}⟧ flips the sign: ⟦${ineq('x',opp,k)}⟧`)}; },
 ()=>{ const lo=R(-6,2),hi=lo+R(3,9),l1=pick(['<','≤']),l2=pick(['<','≤']),n=(hi-lo+1)-(l1==='<'?1:0)-(l2==='<'?1:0);
   return {s:'algebra',q:bi(`كم عددًا صحيحًا يحقق ⟦${N(lo)} ${l1} س ${l2} ${N(hi)}⟧؟`,`How many integers satisfy ⟦${N(lo)} ${l1} x ${l2} ${N(hi)}⟧?`),o:mkOpts(n,[hi-lo+1,hi-lo,n+2,hi-lo-1]),e:bi(`من ${N(l1==='<'?lo+1:lo)} إلى ${N(l2==='<'?hi-1:hi)}: ⟦${N(l2==='<'?hi-1:hi)} − (${N(l1==='<'?lo+1:lo)}) + 1 = ${n}⟧`,`From ${N(l1==='<'?lo+1:lo)} to ${N(l2==='<'?hi-1:hi)}: ⟦${N(l2==='<'?hi-1:hi)} − (${N(l1==='<'?lo+1:lo)}) + 1 = ${n}⟧`)}; },
 ()=>{ if(R(0,1)){ const a=R(2,6),b=R(1,9),m=R(4,12),c=a*m+b+R(1,a-1);
     return {s:'algebra',q:bi(`ما أكبر عدد صحيح س يحقق ⟦${a}س + ${b} < ${c}⟧؟`,`What is the greatest integer x with ⟦${a}x + ${b} < ${c}⟧?`),o:mkOpts(m,[m+1,c-b,m-1]),e:bi(`⟦${a}س < ${c-b}⟧، ⟦س < ${dS(Math.round((c-b)/a*100)/100)}⟧، فأكبر عدد صحيح ${m}`,`⟦${a}x < ${c-b}⟧, ⟦x < ${dS(Math.round((c-b)/a*100)/100)}⟧, so the greatest integer is ${m}`)}; }
   const c=R(-3,4),r=R(1,6),lo=c-r,hi=c+r,le=R(0,1),n=le?2*r+1:2*r-1;
   return {s:'algebra',q:bi(`كم عددًا صحيحًا يحقق ⟦|س ${c<0?'+':'−'} ${Math.abs(c)}| ${le?'≤':'<'} ${r}⟧؟`,`How many integers satisfy ⟦|x ${c<0?'+':'−'} ${Math.abs(c)}| ${le?'≤':'<'} ${r}⟧?`),o:mkOpts(n,[le?2*r:2*r+1,r,n+2]),e:bi(`⟦${N(lo)} ${le?'≤':'<'} س ${le?'≤':'<'} ${N(hi)}⟧، وعدد الأعداد الصحيحة ${n}`,`⟦${N(lo)} ${le?'≤':'<'} x ${le?'≤':'<'} ${N(hi)}⟧, which contains ${n} integers`)}; }]);

FDL('l-ident','al','algebra','squares',
{t:'المتطابقات والتحليل',d:'مربع المجموع والفرق، والفرق بين مربعين، وتحليل العبارة التربيعية.',
 intro:['المتطابقات صيغ صحيحة لكل قيم المتغيرات، وهي أقوى أدوات الاختصار في الجبر: تحول سؤالًا يبدو طويلًا إلى خطوة واحدة.','أشهرها ثلاث: مربع المجموع، ومربع الفرق، والفرق بين مربعين. احفظها في الاتجاهين: فك الأقواس، والتحليل إلى أقواس.'],
 rules:['⟦(س + ص)^2 = س^2 + 2س ص + ص^2⟧','⟦(س − ص)^2 = س^2 − 2س ص + ص^2⟧','الفرق بين مربعين: ⟦س^2 − ص^2 = (س − ص)(س + ص)⟧','تحليل ⟦س^2 + بس + ج⟧: ابحث عن عددين مجموعهما ب وحاصل ضربهما ج: ⟦س^2 − 5س + 6 = (س − 2)(س − 3)⟧','حساب ذهني: ⟦51^2 − 49^2 = (51 − 49)(51 + 49) = 200⟧، ⟦99^2 = (100 − 1)^2 = 9801⟧'],
 ex:[['إذا كان ⟦س + ص = 7⟧ و⟦س ص = 10⟧ فما ⟦س^2 + ص^2⟧؟',['⟦س^2 + ص^2 = (س + ص)^2 − 2س ص⟧','⟦49 − 20 = 29⟧'],'29'],
  ['احسب ⟦98^2 − 2^2⟧',['⟦(98 − 2)(98 + 2)⟧','⟦96 × 100 = 9600⟧'],'9600'],
  ['حلّل ⟦س^2 − 5س + 6⟧',['عددان مجموعهما ⟦−5⟧ وحاصل ضربهما 6: ⟦−2⟧ و⟦−3⟧'],'⟦(س − 2)(س − 3)⟧']],
 traps:['⟦(س + ص)^2 ≠ س^2 + ص^2⟧: الحد الأوسط ⟦2س ص⟧ لا يُنسى.','⟦س^2 + ص^2⟧ لا تتحلل مثل ⟦س^2 − ص^2⟧.','الخلط في الإشارات عند التحليل: الضرب موجب والمجموع سالب يعني أن العددين سالبان.']},
{t:'Identities and factoring',d:'Square of a sum and a difference, difference of squares, and factoring quadratics.',
 intro:['Identities are formulas that hold for every value, and they are algebra\'s strongest shortcuts: they turn a long-looking question into one step.','The main three are the square of a sum, the square of a difference, and the difference of squares. Know them both ways: expanding and factoring.'],
 rules:['⟦(x + y)^2 = x^2 + 2xy + y^2⟧','⟦(x − y)^2 = x^2 − 2xy + y^2⟧','Difference of squares: ⟦x^2 − y^2 = (x − y)(x + y)⟧','Factoring ⟦x^2 + bx + c⟧: find two numbers that add to b and multiply to c: ⟦x^2 − 5x + 6 = (x − 2)(x − 3)⟧','Mental math: ⟦51^2 − 49^2 = (51 − 49)(51 + 49) = 200⟧, ⟦99^2 = (100 − 1)^2 = 9801⟧'],
 ex:[['If ⟦x + y = 7⟧ and ⟦xy = 10⟧, what is ⟦x^2 + y^2⟧?',['⟦x^2 + y^2 = (x + y)^2 − 2xy⟧','⟦49 − 20 = 29⟧'],'29'],
  ['Work out ⟦98^2 − 2^2⟧',['⟦(98 − 2)(98 + 2)⟧','⟦96 × 100 = 9600⟧'],'9600'],
  ['Factor ⟦x^2 − 5x + 6⟧',['Two numbers adding to ⟦−5⟧ and multiplying to 6: ⟦−2⟧ and ⟦−3⟧'],'⟦(x − 2)(x − 3)⟧']],
 traps:['⟦(x + y)^2 ≠ x^2 + y^2⟧: never drop the middle term ⟦2xy⟧.','⟦x^2 + y^2⟧ does not factor like ⟦x^2 − y^2⟧.','Sign mix-ups when factoring: a positive product with a negative sum means both numbers are negative.']},
[()=>{ const x=R(1,9),y=R(1,9),s=x+y,p=x*y,mn=R(0,1);
   if(mn){ const d=x-y; return {s:'algebra',q:bi(`إذا كان ⟦س − ص = ${N(d)}⟧ و⟦س ص = ${p}⟧ فما قيمة ⟦س^2 + ص^2⟧؟`,`If ⟦x − y = ${N(d)}⟧ and ⟦xy = ${p}⟧, what is ⟦x^2 + y^2⟧?`),o:mkOpts(d*d+2*p,[d*d-2*p,d*d+p,d*d]),e:bi(`⟦(س − ص)^2 + 2س ص = ${d*d} + ${2*p} = ${d*d+2*p}⟧`,`⟦(x − y)^2 + 2xy = ${d*d} + ${2*p} = ${d*d+2*p}⟧`)}; }
   return {s:'algebra',q:bi(`إذا كان ⟦س + ص = ${s}⟧ و⟦س ص = ${p}⟧ فما قيمة ⟦س^2 + ص^2⟧؟`,`If ⟦x + y = ${s}⟧ and ⟦xy = ${p}⟧, what is ⟦x^2 + y^2⟧?`),o:mkOpts(s*s-2*p,[s*s+2*p,s*s-p,s*s]),e:bi(`⟦(س + ص)^2 − 2س ص = ${s*s} − ${2*p} = ${s*s-2*p}⟧`,`⟦(x + y)^2 − 2xy = ${s*s} − ${2*p} = ${s*s-2*p}⟧`)}; },
 ()=>{ if(R(0,1)){ const m=pick([50,60,70,80,100,40,30]),d=R(1,4),a=m+d,b=m-d,ans=a*a-b*b;
     return {s:'algebra',q:bi(`ما قيمة ⟦${a}^2 − ${b}^2⟧؟`,`What is ⟦${a}^2 − ${b}^2⟧?`),o:mkOpts(ans,[(a-b)**2,ans/2,ans+a-b]),e:bi(`⟦(${a} − ${b})(${a} + ${b}) = ${a-b} × ${a+b} = ${ans}⟧`,`⟦(${a} − ${b})(${a} + ${b}) = ${a-b} × ${a+b} = ${ans}⟧`)}; }
   const t=pick([20,30,40,50,60,70,80,90,100]),d=R(1,3),a=t+d,b=t-d,ans=a*b;
   return {s:'algebra',q:bi(`ما ناتج ⟦${a} × ${b}⟧؟`,`What is ⟦${a} × ${b}⟧?`),o:mkOpts(ans,[t*t,t*t+d*d,ans-10]),e:bi(`⟦(${t} + ${d})(${t} − ${d}) = ${t}^2 − ${d}^2 = ${t*t} − ${d*d} = ${ans}⟧`,`⟦(${t} + ${d})(${t} − ${d}) = ${t}^2 − ${d}^2 = ${t*t} − ${d*d} = ${ans}⟧`)}; },
 ()=>{ for(;;){ const p=R(-7,7),q=R(-7,7); if(!p||!q||p===q||p===-q) continue; const b=-(p+q),c=p*q;
   const fac=(v,r1,r2)=>`(${v} ${r1<0?'+':'−'} ${Math.abs(r1)})(${v} ${r2<0?'+':'−'} ${Math.abs(r2)})`; const qu=v=>`${v}^2 ${b<0?'−':'+'} ${Math.abs(b)===1?'':Math.abs(b)}${v} ${c<0?'−':'+'} ${Math.abs(c)}`;
   const mk=v=>[`⟦${fac(v,p,q)}⟧`,`⟦${fac(v,-p,-q)}⟧`,`⟦${fac(v,p,-q)}⟧`,`⟦${fac(v,-p,q)}⟧`]; const oa=mk('س'),oe=mk('x'); if(new Set(oa).size<4) continue;
   return {s:'algebra',q:bi(`تحليل العبارة ⟦${qu('س')}⟧ هو:`,`⟦${qu('x')}⟧ factors as:`),o:oa.map((x,i)=>bi(x,oe[i])),e:bi(`عددان مجموعهما ${N(b)} وحاصل ضربهما ${N(c)}: ${N(-p)} و${N(-q)}`,`Two numbers adding to ${N(b)} and multiplying to ${N(c)}: ${N(-p)} and ${N(-q)}`)}; } },
 ()=>{ const s=R(3,15),d=R(1,s-1),dd=s*d;
   return {s:'algebra',q:bi(`إذا كان ⟦س^2 − ص^2 = ${dd}⟧ و⟦س + ص = ${s}⟧ فما قيمة ⟦س − ص⟧؟`,`If ⟦x^2 − y^2 = ${dd}⟧ and ⟦x + y = ${s}⟧, what is ⟦x − y⟧?`),o:mkOpts(d,[dd-s,s-d,d+s]),e:bi(`⟦(س − ص)(س + ص) = ${dd}⟧، ⟦س − ص = ${dd} ÷ ${s} = ${d}⟧`,`⟦(x − y)(x + y) = ${dd}⟧, ⟦x − y = ${dd} ÷ ${s} = ${d}⟧`)}; }]);

const WD={ar:['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'],en:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']};
FDL('l-seq','al','algebra','sequence',
{t:'المتتابعات والأنماط',d:'الحسابية والهندسية، والحد النوني، والأنماط الدورية.',
 intro:['المتتابعة أعداد مرتبة بقاعدة. السؤال إما أن يطلب الحد التالي، أو حدًا بعيدًا مثل الحد العشرين، أو مجموع الحدود.','ابدأ دائمًا بفحص الفرق بين كل حدين متتاليين؛ فإن لم يكن ثابتًا فافحص النسبة، ثم فروق الفروق.'],
 rules:['الحسابية: فرق ثابت d، والحد رقم n ⟦= a + (n − 1)d⟧','الهندسية: نسبة ثابتة r، والحد رقم n ⟦= a × r^(n − 1)⟧','إذا لم يثبت الفرق ولا النسبة: افحص فروق الفروق، أو المربعات والمكعبات، أو متتابعتين متداخلتين في المواقع الفردية والزوجية.','مجموع الحسابية ⟦= عدد الحدود × (الأول + الأخير) ÷ 2⟧، و⟦1 + 2 + … + 100 = 5050⟧','النمط الدوري (أيام الأسبوع، الألوان المتكررة): اقسم على طول الدورة وانظر إلى الباقي.'],
 ex:[['ما الحد العشرون في ⟦5، 9، 13، …⟧؟',['الفرق 4','⟦5 + 19 × 4 = 81⟧'],'81'],
  ['ما الحد التالي في ⟦2، 5، 10، 17، 26، …⟧؟',['الفروق ⟦3، 5، 7، 9⟧ ثم 11','أو القاعدة ⟦n^2 + 1⟧'],'37'],
  ['إذا كان اليوم الأحد، فما اليوم بعد 100 يوم؟',['⟦100 = 14 × 7 + 2⟧','الباقي 2: يومان بعد الأحد'],'الثلاثاء']],
 traps:['الخطأ بحد واحد: الحد العشرون يحتاج 19 فرقًا لا 20.','حساب «بعد 100 يوم» بعد اليوم نفسه بدلًا من الانطلاق منه.','الاكتفاء بفرق أول حدين دون التحقق من البقية.']},
{t:'Sequences and patterns',d:'Arithmetic and geometric sequences, the nth term, and repeating patterns.',
 intro:['A sequence is a list of numbers that follows a rule. The question asks for the next term, a far term such as the twentieth, or the sum of terms.','Always start by checking the difference between neighbors; if it is not constant, check the ratio, then the differences of the differences.'],
 rules:['Arithmetic: constant difference d; the nth term ⟦= a + (n − 1)d⟧','Geometric: constant ratio r; the nth term ⟦= a × r^(n − 1)⟧','If neither the difference nor the ratio is constant: check second differences, squares and cubes, or two sequences interleaved in odd and even places.','Sum of an arithmetic sequence ⟦= number of terms × (first + last) ÷ 2⟧, and ⟦1 + 2 + … + 100 = 5050⟧','Repeating patterns (weekdays, repeating colors): divide by the cycle length and look at the remainder.'],
 ex:[['What is the 20th term of ⟦5, 9, 13, …⟧?',['The difference is 4','⟦5 + 19 × 4 = 81⟧'],'81'],
  ['What comes next in ⟦2, 5, 10, 17, 26, …⟧?',['Differences ⟦3, 5, 7, 9⟧, then 11','Or the rule ⟦n^2 + 1⟧'],'37'],
  ['If today is Sunday, what day is it 100 days from now?',['⟦100 = 14 × 7 + 2⟧','Remainder 2: two days after Sunday'],'Tuesday']],
 traps:['Off by one: the 20th term needs 19 steps, not 20.','Counting "100 days from now" from the day after instead of from today.','Trusting the first difference without checking the rest.']},
[()=>{ const a=R(-5,12),d=pick([2,3,4,5,6,7,-2,-3,-4]),n=R(8,30),ans=a+(n-1)*d,seq=[0,1,2].map(i=>N(a+i*d)).join('، '),seqE=[0,1,2].map(i=>N(a+i*d)).join(', ');
   return {s:'algebra',q:bi(`ما الحد رقم ${n} في المتتابعة ⟦${seq}، …⟧؟`,`What is term number ${n} of ⟦${seqE}, …⟧?`),o:mkOpts(ans,[a+n*d,ans-a,n*d],N,true),e:bi(`⟦${N(a)} + (${n} − 1) × ${d<0?`(${N(d)})`:d} = ${N(ans)}⟧`,`⟦${N(a)} + (${n} − 1) × ${d<0?`(${N(d)})`:d} = ${N(ans)}⟧`)}; },
 ()=>{ const a=pick([1,2,3,4,5]),r=pick([2,3]),k=R(4,5),s=[...Array(k)].map((_,i)=>a*r**i),ans=a*r**k;
   return {s:'algebra',q:bi(`ما الحد التالي في ⟦${s.join('، ')}، …⟧؟`,`What comes next in ⟦${s.join(', ')}, …⟧?`),o:mkOpts(ans,[s[k-1]+(s[k-1]-s[k-2]),ans/r+a,ans*r]),e:bi(`كل حد ${r===2?'ضعف':'ثلاثة أمثال'} سابقه: ⟦${s[k-1]} × ${r} = ${ans}⟧`,`Each term is ${r===2?'twice':'three times'} the previous: ⟦${s[k-1]} × ${r} = ${ans}⟧`)}; },
 ()=>{ const t=R(0,2); let s,ans,why;
   if(t===0){ const c=R(-2,3); s=[1,2,3,4,5].map(n=>n*n+c); ans=36+c; why=bi(`القاعدة ⟦n^2 ${c<0?'−':'+'} ${Math.abs(c)}⟧، والفروق تزيد 2 كل مرة`,`The rule is ⟦n^2 ${c<0?'−':'+'} ${Math.abs(c)}⟧; the differences grow by 2`); if(c===0) why=bi('مربعات الأعداد: ⟦6^2 = 36⟧','Perfect squares: ⟦6^2 = 36⟧'); }
   else if(t===1){ const a=R(1,5),d=R(1,3); s=[a]; for(let i=1;i<5;i++) s.push(s[i-1]+d*i); ans=s[4]+d*5; why=bi(`الفروق ⟦${[1,2,3,4].map(i=>d*i).join('، ')}⟧ ثم ${d*5}`,`Differences ⟦${[1,2,3,4].map(i=>d*i).join(', ')}⟧, then ${d*5}`); }
   else { const a=R(1,5),b=R(10,20),p=R(2,4),q=R(1,3); s=[a,b,a+p,b-q,a+2*p,b-2*q]; ans=a+3*p; why=bi(`متتابعتان متداخلتان: المواقع الفردية تزيد ${p}، والزوجية تنقص ${q}`,`Two interleaved sequences: odd places go up by ${p}, even places down by ${q}`); }
   return {s:'algebra',q:bi(`ما الحد التالي في ⟦${s.map(N).join('، ')}، …⟧؟`,`What comes next in ⟦${s.map(N).join(', ')}, …⟧?`),o:mkOpts(ans,[s[s.length-1]+(s[s.length-1]-s[s.length-2]),ans+1,ans-2],N,true),e:why}; },
 ()=>{ if(R(0,1)){ const d0=R(0,6),n=R(15,99),r=n%7,ans=(d0+r)%7;
     return {s:'algebra',q:bi(`إذا كان اليوم ${WD.ar[d0]}، فأي يوم يكون بعد ${arC(n,AN.day)} من اليوم؟`,`If today is ${WD.en[d0]}, what day will it be ${n} days from today?`),o:[0,1,2,3].map(k=>bi(WD.ar[(ans+[0,1,6,3][k])%7],WD.en[(ans+[0,1,6,3][k])%7])),e:bi(`⟦${n} = ${Math.floor(n/7)} × 7 + ${r}⟧، ${r?`فننتقل ${r===1?'يومًا واحدًا':r===2?'يومين':r+' أيام'} بعد ${WD.ar[d0]}`:'والباقي صفر فهو اليوم نفسه'}`,`⟦${n} = ${Math.floor(n/7)} × 7 + ${r}⟧, ${r?`so move ${r} day${r===1?'':'s'} past ${WD.en[d0]}`:'remainder 0, so the same day'}`)}; }
   const a=R(1,9),d=R(1,6),n=pick([10,12,15,20,25,30]),l=a+(n-1)*d,S=n*(a+l)/2;
   return {s:'algebra',q:bi(`ما مجموع أول ${arC(n,['حد واحد','حدين','حدود','حدًّا'])} من المتتابعة ⟦${a}، ${a+d}، ${a+2*d}، …⟧؟`,`What is the sum of the first ${n} terms of ⟦${a}, ${a+d}, ${a+2*d}, …⟧?`),o:mkOpts(S,[n*l,S+l,n*(a+l)]),e:bi(`الحد الأخير ⟦${a} + ${n-1} × ${d} = ${l}⟧، والمجموع ⟦${n} × (${a} + ${l}) ÷ 2 = ${S}⟧`,`The last term is ⟦${a} + ${n-1} × ${d} = ${l}⟧, and the sum is ⟦${n} × (${a} + ${l}) ÷ 2 = ${S}⟧`)}; }]);

/* ---- unit 4: geometry ---- */
const pi=(c,k=0)=>`⟦${k?k+' '+(c<0?'−':'+')+' ':''}${Math.abs(c)===1?'':N(Math.abs(c))}π⟧`; /* k + cπ */
const FD_ANG_FIG=FG(`<path d="M20 45H200M20 110H200" /><path d="M60 140L160 15"/>${FT(154,33,'65°')}${FT(66,98,'115°')}`);
FDL('g-ang','geo','geometry','clock',
{t:'الزوايا والمستقيمات',d:'المتتامتان والمتكاملتان، والمتقابلتان بالرأس، والمستقيمان المتوازيان، وزاوية الساعة.',
 intro:['الزاوية مقدار الانفراج بين ضلعين، وتقاس بالدرجات. معظم أسئلة الزوايا لا تحتاج إلا أربع حقائق ترى بها الشكل كله.','وفي الرسوم كثيرًا ما تُعطى زاوية واحدة ويُطلب غيرها: ابحث عن الطريق القصير بين الزاويتين عبر هذه الحقائق.'],
 rules:['الزاويتان على مستقيم واحد مجموعهما ⟦180°⟧، والزوايا حول نقطة مجموعها ⟦360°⟧','المتقابلتان بالرأس متساويتان.','المتتامتان مجموعهما ⟦90°⟧، والمتكاملتان مجموعهما ⟦180°⟧','مستقيمان متوازيان يقطعهما قاطع: كل الزوايا الحادة متساوية، وكل المنفرجة متساوية، والحادة + المنفرجة ⟦= 180°⟧','زاوية عقربي الساعة: كل ساعة ⟦30°⟧ وكل دقيقة ⟦6°⟧ لعقرب الدقائق، ويتحرك عقرب الساعات ⟦0.5°⟧ كل دقيقة.'],
 ex:[['زاويتان متكاملتان، إحداهما تزيد على الأخرى بمقدار ⟦40°⟧. ما قياس الكبرى؟',['⟦س + س + 40 = 180⟧','⟦2س = 140⟧، ⟦س = 70⟧','الكبرى ⟦70 + 40⟧'],'⟦110°⟧'],
  ['ما قياس الزاوية بين عقربي الساعة عند 3:30؟',['عقرب الدقائق عند 6: ⟦180°⟧ من 12','عقرب الساعات بين 3 و4: ⟦90 + 15 = 105°⟧','⟦180 − 105 = 75⟧'],'⟦75°⟧'],
  ['في الشكل مستقيمان متوازيان يقطعهما قاطع، وإحدى الزوايا ⟦65°⟧. ما قياس الزاوية المنفرجة؟',['الحادة والمنفرجة عند التقاطع مجموعهما ⟦180°⟧','⟦180 − 65 = 115⟧'],'⟦115°⟧',FD_ANG_FIG]],
 traps:['الخلط بين المتتامتين ⟦90°⟧ والمتكاملتين ⟦180°⟧.','حساب زاوية الساعة مع إهمال حركة عقرب الساعات: عند 3:30 ليس عند 3 بالضبط.','الحكم بالنظر إلى الرسم؛ الرسوم في الاختبار ليست بمقياس رسم، فاعتمد على المعطيات.']},
{t:'Angles and lines',d:'Complementary and supplementary angles, vertical angles, parallel lines and clock angles.',
 intro:['An angle measures the opening between two rays, in degrees. Most angle questions need only four facts to see the whole figure.','Figures often give one angle and ask for another: find the short path between them through these facts.'],
 rules:['Angles on a straight line add up to ⟦180°⟧, and angles around a point add up to ⟦360°⟧','Vertical (opposite) angles are equal.','Complementary angles add up to ⟦90°⟧, supplementary angles to ⟦180°⟧','Two parallel lines cut by a transversal: all acute angles are equal, all obtuse angles are equal, and acute + obtuse ⟦= 180°⟧','Clock hands: each hour mark is ⟦30°⟧, the minute hand moves ⟦6°⟧ a minute, and the hour hand moves ⟦0.5°⟧ a minute.'],
 ex:[['Two supplementary angles differ by ⟦40°⟧. What is the larger one?',['⟦x + x + 40 = 180⟧','⟦2x = 140⟧, ⟦x = 70⟧','Larger ⟦70 + 40⟧'],'⟦110°⟧'],
  ['What is the angle between the clock hands at 3:30?',['The minute hand is at 6: ⟦180°⟧ from 12','The hour hand is between 3 and 4: ⟦90 + 15 = 105°⟧','⟦180 − 105 = 75⟧'],'⟦75°⟧'],
  ['The figure shows two parallel lines and a transversal with an angle of ⟦65°⟧. What is the obtuse angle?',['An acute and an obtuse angle at a crossing add up to ⟦180°⟧','⟦180 − 65 = 115⟧'],'⟦115°⟧',FD_ANG_FIG]],
 traps:['Mixing up complementary ⟦90°⟧ and supplementary ⟦180°⟧.','Ignoring the hour hand\'s movement: at 3:30 it is not exactly on 3.','Judging by the drawing; test figures are not to scale, so rely on the given values.']},
[()=>{ if(R(0,1)){ const a=R(12,78); return {s:'geometry',q:bi(`ما قياس الزاوية المتممة لزاوية قياسها ⟦${a}°⟧؟`,`What is the complement of a ⟦${a}°⟧ angle?`),o:mkOpts(90-a,[180-a,a,90+a],x=>`${x}°`),e:bi(`⟦90 − ${a} = ${90-a}°⟧`,`⟦90 − ${a} = ${90-a}°⟧`)}; }
   const d=2*R(5,40),x=(180-d)/2; return {s:'geometry',q:bi(`زاويتان متكاملتان، إحداهما تزيد على الأخرى بمقدار ⟦${d}°⟧. ما قياس الكبرى؟`,`Two supplementary angles differ by ⟦${d}°⟧. What is the larger one?`),o:mkOpts(x+d,[x,180-d,90+d],v=>`${v}°`),e:bi(`⟦2س + ${d} = 180⟧، ⟦س = ${x}⟧، والكبرى ⟦${x+d}°⟧`,`⟦2x + ${d} = 180⟧, ⟦x = ${x}⟧, larger ⟦${x+d}°⟧`)}; },
 ()=>{ const a=R(35,80),ask=pick(['top','left','bottom']),ans=ask==='left'?a:180-a,pos={top:[110,45],left:[70,79],bottom:[110,110]}[ask];
   const f=FG(`<path d="M25 30L195 120M25 120L195 30"/>${FT(152,79,a+'°')}${FT(pos[0],pos[1],'?')}`);
   return {s:'geometry',q:bi(`${f}مستقيمان متقاطعان كما في الشكل. ما قياس الزاوية المشار إليها بعلامة الاستفهام؟`,`${f}Two lines cross as shown. What is the angle marked with a question mark?`),o:mkOpts(ans,[ask==='left'?180-a:a,90-a>0?90-a:a+10,360-a],v=>`${v}°`),e:ask==='left'?bi(`متقابلتان بالرأس فهما متساويتان: ⟦${a}°⟧`,`Vertical angles are equal: ⟦${a}°⟧`):bi(`على مستقيم واحد مع الزاوية ⟦${a}°⟧: ⟦180 − ${a} = ${180-a}°⟧`,`On a straight line with the ⟦${a}°⟧ angle: ⟦180 − ${a} = ${180-a}°⟧`)}; },
 ()=>{ const h=R(1,11),m=pick([0,10,15,20,30,40,45,50]); let ang=Math.abs(30*h-5.5*m); if(ang>180) ang=360-ang; const naive=Math.min(Math.abs(30*h-6*m),360-Math.abs(30*h-6*m));
   const tm=`${h}:${String(m).padStart(2,'0')}`;
   return {s:'geometry',q:bi(`ما قياس الزاوية الصغرى بين عقربي الساعة عند ${tm}؟`,`What is the smaller angle between the clock hands at ${tm}?`),o:mkOpts(ang,[naive,ang+15,180-ang||ang+30],v=>`${N(v)}°`),e:bi(`عقرب الدقائق عند ⟦${6*m}°⟧ وعقرب الساعات عند ⟦${30*h} + ${N(m/2)} = ${N(30*h+m/2)}°⟧، والفرق ⟦${N(ang)}°⟧`,`Minute hand at ⟦${6*m}°⟧, hour hand at ⟦${30*h} + ${N(m/2)} = ${N(30*h+m/2)}°⟧; the gap is ⟦${N(ang)}°⟧`)}; },
 ()=>{ const a=R(40,75),reg=pick(['ur','ul','ll','lr']),ans=(reg==='ur'||reg==='ll')?a:180-a,B=[84,110],off={ur:[18,-10],ul:[-22,-10],ll:[-18,14],lr:[22,14]}[reg];
   const f=FG(`<path d="M20 45H200M20 110H200"/><path d="M60 140L160 15"/>${FT(154,35,a+'°')}${FT(B[0]+off[0],B[1]+off[1],'?')}`);
   return {s:'geometry',q:bi(`${f}المستقيمان الأفقيان متوازيان ويقطعهما مستقيم ثالث. ما قياس الزاوية المشار إليها بعلامة الاستفهام؟`,`${f}The two horizontal lines are parallel and cut by a third line. What is the angle marked with a question mark?`),o:mkOpts(ans,[ans===a?180-a:a,90-a/2|0,ans+10],v=>`${v}°`),e:ans===a?bi(`الزاويتان حادتان، وكل الحادة في الشكل متساوية: ⟦${a}°⟧`,`Both are acute, and all acute angles here are equal: ⟦${a}°⟧`):bi(`المشار إليها منفرجة، والحادة + المنفرجة ⟦= 180°⟧: ⟦180 − ${a} = ${180-a}°⟧`,`The marked angle is obtuse, and acute + obtuse ⟦= 180°⟧: ⟦180 − ${a} = ${180-a}°⟧`)}; }]);

const TRIP=[[3,4,5],[5,12,13],[8,15,17],[7,24,25]];
FDL('g-tri','geo','geometry','pyth',
{t:'المثلثات',d:'مجموع الزوايا والزاوية الخارجية، وأنواع المثلثات، وفيثاغورس، والمساحة.',
 intro:['المثلث أكثر شكل يتكرر في الهندسة، وحتى الأشكال الأخرى تُحل غالبًا بتقسيمها إلى مثلثات.','احفظ الثلاثيات الفيثاغورية، فهي توفر عليك الجذور في معظم الأسئلة.'],
 rules:['مجموع زوايا المثلث ⟦180°⟧، والزاوية الخارجية تساوي مجموع الداخليتين البعيدتين عنها.','متساوي الساقين: زاويتا القاعدة متساويتان. ومتطابق الأضلاع: كل زاوية ⟦60°⟧','فيثاغورس في القائم: ⟦a^2 + b^2 = c^2⟧، والثلاثيات: ⟦3، 4، 5⟧ و⟦5، 12، 13⟧ و⟦8، 15، 17⟧ ومضاعفاتها.','المساحة ⟦= ½ × القاعدة × الارتفاع⟧، والارتفاع عمودي على القاعدة.','متباينة المثلث: كل ضلع أصغر من مجموع الآخرين وأكبر من الفرق بينهما.','المثلث ⟦30-60-90⟧: أضلاعه بنسبة ⟦1 : √3 : 2⟧، والمثلث ⟦45-45-90⟧: ⟦1 : 1 : √2⟧'],
 ex:[['زاويتان في مثلث قياسهما ⟦48°⟧ و⟦67°⟧. ما الثالثة؟',['⟦180 − 48 − 67⟧'],'⟦65°⟧'],
  ['مثلث قائم وتره 26 وأحد ضلعيه 10. ما الضلع الثالث؟',['⟦10 ، ? ، 26⟧ مضاعف ⟦5، 12، 13⟧ بمعامل 2','⟦12 × 2 = 24⟧'],'24'],
  ['ضلعان في مثلث طولاهما 4 و9، والثالث عدد صحيح. كم قيمة ممكنة للثالث؟',['⟦9 − 4 < ض < 9 + 4⟧ أي ⟦5 < ض < 13⟧','⟦6، 7، …، 12⟧'],'7']],
 traps:['استعمال فيثاغورس في مثلث غير قائم.','اعتبار الضلع المائل ارتفاعًا في حساب المساحة.','نسيان أن الوتر هو الأطول ويقابل الزاوية القائمة.']},
{t:'Triangles',d:'Angle sum and exterior angles, triangle types, Pythagoras and area.',
 intro:['The triangle is the most frequent shape in geometry, and other shapes are often solved by splitting them into triangles.','Learn the Pythagorean triples; they save you square roots in most questions.'],
 rules:['The angles of a triangle add up to ⟦180°⟧, and an exterior angle equals the sum of the two remote interior angles.','Isosceles: the base angles are equal. Equilateral: every angle is ⟦60°⟧','Pythagoras in a right triangle: ⟦a^2 + b^2 = c^2⟧, with triples ⟦3, 4, 5⟧, ⟦5, 12, 13⟧, ⟦8, 15, 17⟧ and their multiples.','Area ⟦= ½ × base × height⟧, with the height perpendicular to the base.','Triangle inequality: each side is less than the sum of the other two and more than their difference.','A ⟦30-60-90⟧ triangle has sides in the ratio ⟦1 : √3 : 2⟧, and a ⟦45-45-90⟧ triangle ⟦1 : 1 : √2⟧'],
 ex:[['Two angles of a triangle are ⟦48°⟧ and ⟦67°⟧. What is the third?',['⟦180 − 48 − 67⟧'],'⟦65°⟧'],
  ['A right triangle has hypotenuse 26 and one leg 10. What is the other leg?',['⟦10, ?, 26⟧ is ⟦5, 12, 13⟧ times 2','⟦12 × 2 = 24⟧'],'24'],
  ['Two sides of a triangle are 4 and 9, and the third is a whole number. How many values are possible?',['⟦9 − 4 < s < 9 + 4⟧, so ⟦5 < s < 13⟧','⟦6, 7, …, 12⟧'],'7']],
 traps:['Using Pythagoras in a triangle that is not right-angled.','Using a slanted side as the height when finding the area.','Forgetting that the hypotenuse is the longest side, opposite the right angle.']},
[()=>{ if(R(0,1)){ const a=R(25,85),b=R(25,150-a),c=180-a-b; return {s:'geometry',q:bi(`زاويتان في مثلث قياسهما ⟦${a}°⟧ و⟦${b}°⟧. ما قياس الزاوية الثالثة؟`,`Two angles of a triangle measure ⟦${a}°⟧ and ⟦${b}°⟧. What is the third angle?`),o:mkOpts(c,[180-a,a+b,c+10,360-a-b],v=>`${v}°`),e:bi(`⟦180 − ${a} − ${b} = ${c}°⟧`,`⟦180 − ${a} − ${b} = ${c}°⟧`)}; }
   const a=R(30,70),b=R(30,80),ext=a+b,f=FG(`<polygon points="40,120 150,120 85,35"/><path d="M150 120H205"/>${FT(98,52,a+'°')}${FT(58,112,b+'°')}${FT(172,110,'?')}`);
   return {s:'geometry',q:bi(`${f}في الشكل مثلث مُدّ أحد أضلاعه. ما قياس الزاوية الخارجية المشار إليها؟`,`${f}One side of the triangle is extended. What is the marked exterior angle?`),o:mkOpts(ext,[180-ext,180-a,180-b],v=>`${v}°`),e:bi(`الخارجية = مجموع الداخليتين البعيدتين: ⟦${a} + ${b} = ${ext}°⟧`,`Exterior angle = sum of the remote interior angles: ⟦${a} + ${b} = ${ext}°⟧`)}; },
 ()=>{ const [p,q,r]=pick(TRIP.slice(0,3)),k=pick([1,2,3,4]),A=p*k,B=q*k,C=r*k,hyp=R(0,1);
   const f=FG(`<polygon points="40,125 190,125 40,35"/><path d="M40 115h10v10"/>${FT(28,80,hyp?A:A)}${FT(115,140,hyp?B:'?')}${FT(124,72,hyp?'?':C)}`);
   if(hyp) return {s:'geometry',q:bi(`${f}مثلث قائم الزاوية طولا ضلعي القائمة ${A} و${B}. ما طول الوتر؟`,`${f}A right triangle has legs ${A} and ${B}. What is the hypotenuse?`),o:mkOpts(C,[A+B,C+k,B+1]),e:bi(`⟦√(${A*A} + ${B*B}) = √${C*C} = ${C}⟧`,`⟦√(${A*A} + ${B*B}) = √${C*C} = ${C}⟧`)};
   return {s:'geometry',q:bi(`${f}مثلث قائم الزاوية وتره ${C} وأحد ضلعي القائمة ${A}. ما طول الضلع الآخر؟`,`${f}A right triangle has hypotenuse ${C} and one leg ${A}. What is the other leg?`),o:mkOpts(B,[C-A,B+k,C+A>B?Math.round(Math.sqrt(C*C+A*A)):B+2]),e:bi(`⟦√(${C*C} − ${A*A}) = √${B*B} = ${B}⟧`,`⟦√(${C*C} − ${A*A}) = √${B*B} = ${B}⟧`)}; },
 ()=>{ const b=2*R(2,10),h=R(3,12),A=b*h/2,f=FG(`<polygon points="25,125 195,125 135,35"/><path d="M135 35V125" stroke-dasharray="5 4"/><path d="M135 115h10v10"/>${FT(110,140,b)}${FT(148,80,h,'start')}`);
   if(R(0,1)) return {s:'geometry',q:bi(`${f}مثلث طول قاعدته ${b} سم وارتفاعه ${h} سم. ما مساحته بالسنتيمتر المربع؟`,`${f}A triangle has base ${b} cm and height ${h} cm. What is its area in cm²?`),o:mkOpts(A,[b*h,b+h,A+h]),e:bi(`⟦½ × ${b} × ${h} = ${A}⟧`,`⟦½ × ${b} × ${h} = ${A}⟧`)};
   return {s:'geometry',q:bi(`مساحة مثلث ${A} سم² وطول قاعدته ${b} سم. ما ارتفاعه؟`,`A triangle has area ${A} cm² and base ${b} cm. What is its height?`),o:mkOpts(h,[A/b,2*h,h+2].map(v=>Math.round(v*100)/100)),e:bi(`⟦2 × ${A} ÷ ${b} = ${h}⟧`,`⟦2 × ${A} ÷ ${b} = ${h}⟧`)}; },
 ()=>{ if(R(0,1)){ const v=2*R(10,70),bse=(180-v)/2; return {s:'geometry',q:bi(`مثلث متساوي الساقين، قياس زاوية رأسه ⟦${v}°⟧. ما قياس إحدى زاويتي القاعدة؟`,`An isosceles triangle has a vertex angle of ⟦${v}°⟧. What is each base angle?`),o:mkOpts(bse,[180-v,v,v/2],x=>`${x}°`),e:bi(`⟦(180 − ${v}) ÷ 2 = ${bse}°⟧`,`⟦(180 − ${v}) ÷ 2 = ${bse}°⟧`)}; }
   let a=R(3,12),b=R(3,15); while(a===b) b=R(3,15); const n=2*Math.min(a,b)-1;
   return {s:'geometry',q:bi(`ضلعان في مثلث طولاهما ${a} و${b}، وطول الضلع الثالث عدد صحيح. كم قيمة ممكنة لطول الضلع الثالث؟`,`Two sides of a triangle are ${a} and ${b}, and the third side is a whole number. How many values are possible for it?`),o:mkOpts(n,[n+2,a+b-1,Math.abs(a-b)+1]),e:bi(`⟦${Math.abs(a-b)} < ض < ${a+b}⟧، فالقيم من ${Math.abs(a-b)+1} إلى ${a+b-1}: ${arC(n,['قيمة واحدة','قيمتان','قيم','قيمة'])}`,`⟦${Math.abs(a-b)} < s < ${a+b}⟧, so the values run from ${Math.abs(a-b)+1} to ${a+b-1}: ${n} values`)}; }]);

FDL('g-quad','geo','geometry','rect',
{t:'الأشكال الرباعية والمضلعات',d:'المستطيل والمربع ومتوازي الأضلاع والمعين وشبه المنحرف، وزوايا المضلعات.',
 intro:['لكل شكل رباعي قانون مساحة واحد تحتاجه، والفكرة المشتركة بينها: القاعدة في الارتفاع العمودي، ثم تعديل بسيط لكل شكل.','أما المضلعات فسؤالها الأشهر عن مجموع الزوايا الداخلية، أو قياس زاوية المضلع المنتظم.'],
 rules:['المستطيل: المساحة ⟦= الطول × العرض⟧، والمحيط ⟦= 2(الطول + العرض)⟧، والقطر بفيثاغورس.','المربع: المساحة ⟦= ل^2⟧، وبمعرفة القطر ق: ⟦المساحة = ق^2 ÷ 2⟧','متوازي الأضلاع: القاعدة × الارتفاع. المعين: نصف حاصل ضرب القطرين. شبه المنحرف: ⟦½ × (القاعدتين) × الارتفاع⟧','مجموع زوايا المضلع ذي n ضلعًا ⟦= (n − 2) × 180°⟧، والزاوية الخارجية للمنتظم ⟦= 360° ÷ n⟧','إذا ضُربت أبعاد شكل في k ضُربت مساحته في ⟦k^2⟧'],
 ex:[['مستطيل محيطه 30 سم وطوله 9 سم. ما مساحته؟',['نصف المحيط ⟦15 = الطول + العرض⟧','العرض ⟦15 − 9 = 6⟧','⟦9 × 6 = 54⟧'],'54 سم²'],
  ['ما قياس الزاوية الداخلية في الخماسي المنتظم؟',['المجموع ⟦(5 − 2) × 180 = 540⟧','⟦540 ÷ 5 = 108⟧'],'⟦108°⟧'],
  ['شبه منحرف قاعدتاه 6 و10 وارتفاعه 5. ما مساحته؟',['⟦½ × (6 + 10) × 5⟧','⟦8 × 5 = 40⟧'],'40']],
 traps:['استعمال الضلع المائل في متوازي الأضلاع بدل الارتفاع.','نسيان قسمة المحيط على 2 قبل إيجاد العرض.','الظن أن مضاعفة الضلع تضاعف المساحة؛ بل تجعلها أربعة أمثال.']},
{t:'Quadrilaterals and polygons',d:'Rectangle, square, parallelogram, rhombus and trapezoid, and polygon angles.',
 intro:['Each quadrilateral has one area formula you need, and the shared idea is base times perpendicular height, with a small change for each shape.','For polygons the best-known question is the sum of interior angles, or the size of one angle in a regular polygon.'],
 rules:['Rectangle: area ⟦= length × width⟧, perimeter ⟦= 2(length + width)⟧, diagonal by Pythagoras.','Square: area ⟦= s^2⟧; from the diagonal d: ⟦area = d^2 ÷ 2⟧','Parallelogram: base × height. Rhombus: half the product of the diagonals. Trapezoid: ⟦½ × (sum of the parallel sides) × height⟧','Interior angles of an n-sided polygon add up to ⟦(n − 2) × 180°⟧; a regular polygon\'s exterior angle ⟦= 360° ÷ n⟧','Multiply a shape\'s dimensions by k and its area is multiplied by ⟦k^2⟧'],
 ex:[['A rectangle has perimeter 30 cm and length 9 cm. What is its area?',['Half the perimeter: ⟦15 = length + width⟧','Width ⟦15 − 9 = 6⟧','⟦9 × 6 = 54⟧'],'54 cm²'],
  ['What is each interior angle of a regular pentagon?',['Sum ⟦(5 − 2) × 180 = 540⟧','⟦540 ÷ 5 = 108⟧'],'⟦108°⟧'],
  ['A trapezoid has parallel sides 6 and 10 and height 5. What is its area?',['⟦½ × (6 + 10) × 5⟧','⟦8 × 5 = 40⟧'],'40']],
 traps:['Using the slanted side of a parallelogram instead of the height.','Forgetting to halve the perimeter before finding the width.','Thinking that doubling the side doubles the area; it makes it four times as large.']},
[()=>{ const l=R(5,20),w=R(2,l-1),P=2*(l+w),A=l*w,f=FG(`<rect x="35" y="35" width="150" height="80"/>${FT(110,128,l)}${FT(24,75,'?')}`);
   return {s:'geometry',q:bi(`${f}مستطيل محيطه ${P} سم وطوله ${l} سم. ما مساحته بالسنتيمتر المربع؟`,`${f}A rectangle has perimeter ${P} cm and length ${l} cm. What is its area in cm²?`),o:mkOpts(A,[l*(P-2*l),P*l/4|0||A+3,A+l]),e:bi(`العرض ⟦${P/2} − ${l} = ${w}⟧، والمساحة ⟦${l} × ${w} = ${A}⟧`,`Width ⟦${P/2} − ${l} = ${w}⟧; area ⟦${l} × ${w} = ${A}⟧`)}; },
 ()=>{ const t=R(0,2),n=pick([5,6,8,9,10,12]),S=(n-2)*180;
   if(t===0) return {s:'geometry',q:bi(`ما مجموع قياسات الزوايا الداخلية لمضلع عدد أضلاعه ${n}؟`,`What is the sum of the interior angles of a ${n}-sided polygon?`),o:mkOpts(S,[n*180,(n-1)*180,S+90],v=>`${v}°`),e:bi(`⟦(${n} − 2) × 180 = ${S}°⟧`,`⟦(${n} − 2) × 180 = ${S}°⟧`)};
   if(t===1) return {s:'geometry',q:bi(`ما قياس الزاوية الداخلية الواحدة في مضلع منتظم عدد أضلاعه ${n}؟`,`What is one interior angle of a regular ${n}-sided polygon?`),o:mkOpts(S/n,[360/n,180-S/n===S/n?S/n+10:180-S/n,S/n+10],v=>`${v}°`),e:bi(`⟦${S} ÷ ${n} = ${S/n}°⟧`,`⟦${S} ÷ ${n} = ${S/n}°⟧`)};
   return {s:'geometry',q:bi(`مضلع منتظم قياس زاويته الخارجية ⟦${360/n}°⟧. كم عدد أضلاعه؟`,`A regular polygon has an exterior angle of ⟦${360/n}°⟧. How many sides does it have?`),o:mkOpts(n,[180/(360/n)|0||n+2,n+2,n-1]),e:bi(`⟦360 ÷ ${360/n} = ${n}⟧`,`⟦360 ÷ ${360/n} = ${n}⟧`)}; },
 ()=>{ if(R(0,1)){ const a=R(3,12),b=a+2*R(1,5),h=R(2,10),A=(a+b)*h/2,f=FG(`<polygon points="70,40 150,40 195,120 25,120"/><path d="M70 40V120" stroke-dasharray="5 4"/>${FT(110,30,a)}${FT(110,136,b)}${FT(80,82,h,'start')}`);
     return {s:'geometry',q:bi(`${f}شبه منحرف طولا قاعدتيه المتوازيتين ${a} و${b}، وارتفاعه ${h}. ما مساحته؟`,`${f}A trapezoid has parallel sides ${a} and ${b}, and height ${h}. What is its area?`),o:mkOpts(A,[(a+b)*h,a*b*h/2,A+h]),e:bi(`⟦½ × (${a} + ${b}) × ${h} = ${A}⟧`,`⟦½ × (${a} + ${b}) × ${h} = ${A}⟧`)}; }
   const d1=2*R(2,9),d2=2*R(2,9),A=d1*d2/2,f=FG(`<polygon points="110,15 175,75 110,135 45,75"/><path d="M110 15V135M45 75H175" stroke-dasharray="5 4"/>${FT(118,105,d1,'start')}${FT(150,66,d2)}`);
   return {s:'geometry',q:bi(`${f}معين طولا قطريه ${d1} و${d2}. ما مساحته؟`,`${f}A rhombus has diagonals ${d1} and ${d2}. What is its area?`),o:mkOpts(A,[d1*d2,(d1+d2)*2,A+d1]),e:bi(`⟦½ × ${d1} × ${d2} = ${A}⟧`,`⟦½ × ${d1} × ${d2} = ${A}⟧`)}; },
 ()=>{ if(R(0,1)){ const k=pick([2,3,4]),A=pick([5,6,8,10,12,15,20]),ans=A*k*k;
     return {s:'geometry',q:bi(`مستطيل مساحته ${A} سم². إذا ضُرب كل من طوله وعرضه في ${k}، فكم تصبح مساحته؟`,`A rectangle has area ${A} cm². If its length and width are each multiplied by ${k}, what is the new area?`),o:mkOpts(ans,[A*k,A*2*k,A+k*k]),e:bi(`المساحة تُضرب في ⟦${k}^2 = ${k*k}⟧: ⟦${A} × ${k*k} = ${ans}⟧`,`The area is multiplied by ⟦${k}^2 = ${k*k}⟧: ⟦${A} × ${k*k} = ${ans}⟧`)}; }
   const d=2*R(2,10),A=d*d/2;
   return {s:'geometry',q:bi(`مربع طول قطره ${d} سم. ما مساحته؟`,`A square has a diagonal of ${d} cm. What is its area?`),o:mkOpts(A,[d*d,A/2,d*2]),e:bi(`⟦ق^2 ÷ 2 = ${d*d} ÷ 2 = ${A}⟧`,`⟦d^2 ÷ 2 = ${d*d} ÷ 2 = ${A}⟧`)}; }]);

FDL('g-circ','geo','geometry','circle',
{t:'الدائرة',d:'المحيط والمساحة، والقوس والقطاع، والزاوية المحيطية والمركزية.',
 intro:['كل قوانين الدائرة تبدأ من نصف القطر، فإذا أُعطيت المحيط أو المساحة أو القطر فأول خطوة إيجاد نصف القطر.','والإجابات في الاختبار تُكتب غالبًا بدلالة π، فلا تعوض عنها بـ3.14 إلا إذا كانت الخيارات أعدادًا.'],
 rules:['المحيط ⟦= 2π × نق = π × القطر⟧، والمساحة ⟦= π × نق^2⟧','القوس: ⟦(الزاوية ÷ 360) × المحيط⟧، والقطاع: ⟦(الزاوية ÷ 360) × المساحة⟧','الزاوية المحيطية نصف المركزية المشتركة معها في القوس نفسه.','الزاوية المحيطية المرسومة على القطر قائمة ⟦90°⟧','إذا ضُرب نصف القطر في k: المحيط يُضرب في k، والمساحة في ⟦k^2⟧'],
 ex:[['دائرة محيطها ⟦10π⟧. ما مساحتها؟',['⟦2π × نق = 10π⟧، ⟦نق = 5⟧','⟦π × 5^2⟧'],'⟦25π⟧'],
  ['ما مساحة قطاع زاويته ⟦90°⟧ من دائرة نصف قطرها 8؟',['⟦90 ÷ 360 = 1/4⟧','⟦1/4 × 64π⟧'],'⟦16π⟧'],
  ['زاوية مركزية قياسها ⟦100°⟧. ما قياس الزاوية المحيطية المرسومة على القوس نفسه؟',['المحيطية نصف المركزية'],'⟦50°⟧']],
 traps:['استعمال القطر مكان نصف القطر في قانون المساحة.','الظن أن مضاعفة نصف القطر تضاعف المساحة؛ بل تجعلها أربعة أمثال.','الخلط بين قانوني المحيط والمساحة: ⟦2πنق⟧ و⟦πنق^2⟧.']},
{t:'The circle',d:'Circumference and area, arcs and sectors, inscribed and central angles.',
 intro:['Every circle formula starts from the radius, so if you are given the circumference, area or diameter, the first step is finding the radius.','Test answers are usually written in terms of π, so keep π unless the choices are plain numbers.'],
 rules:['Circumference ⟦= 2πr = π × diameter⟧, area ⟦= πr^2⟧','Arc: ⟦(angle ÷ 360) × circumference⟧; sector: ⟦(angle ÷ 360) × area⟧','An inscribed angle is half the central angle on the same arc.','An inscribed angle on a diameter is a right angle ⟦90°⟧','Multiply the radius by k: the circumference is multiplied by k and the area by ⟦k^2⟧'],
 ex:[['A circle has circumference ⟦10π⟧. What is its area?',['⟦2πr = 10π⟧, ⟦r = 5⟧','⟦π × 5^2⟧'],'⟦25π⟧'],
  ['What is the area of a ⟦90°⟧ sector of a circle with radius 8?',['⟦90 ÷ 360 = 1/4⟧','⟦1/4 × 64π⟧'],'⟦16π⟧'],
  ['A central angle is ⟦100°⟧. What is the inscribed angle on the same arc?',['The inscribed angle is half the central one'],'⟦50°⟧']],
 traps:['Using the diameter instead of the radius in the area formula.','Thinking that doubling the radius doubles the area; it makes it four times as large.','Mixing up ⟦2πr⟧ and ⟦πr^2⟧.']},
[()=>{ const r=R(2,12);
   if(R(0,1)) return {s:'geometry',q:bi(`دائرة محيطها ⟦${2*r}π⟧ سم. ما مساحتها؟`,`A circle has circumference ⟦${2*r}π⟧ cm. What is its area?`),o:mkOpts(r*r,[4*r*r,2*r,r*r*2],x=>`⟦${x}π⟧`),e:bi(`⟦نق = ${r}⟧، والمساحة ⟦π × ${r}^2 = ${r*r}π⟧`,`⟦r = ${r}⟧, area ⟦π × ${r}^2 = ${r*r}π⟧`)};
   return {s:'geometry',q:bi(`دائرة مساحتها ⟦${r*r}π⟧ سم². ما محيطها؟`,`A circle has area ⟦${r*r}π⟧ cm². What is its circumference?`),o:mkOpts(2*r,[r,r*r,4*r],x=>`⟦${x}π⟧`),e:bi(`⟦نق^2 = ${r*r}⟧، ⟦نق = ${r}⟧، والمحيط ⟦2π × ${r} = ${2*r}π⟧`,`⟦r^2 = ${r*r}⟧, ⟦r = ${r}⟧, circumference ⟦2π × ${r} = ${2*r}π⟧`)}; },
 ()=>{ const r=pick([2,3,4,6,8,9,10,12]),th=pick([30,45,60,90,120,180,240,270]),t2=th*Math.PI/180,ex=(110+60*Math.cos(-t2)).toFixed(1),ey=(75+60*Math.sin(-t2)).toFixed(1);
   const f=FG(`<circle cx="110" cy="75" r="60"/><path d="M110 75L170 75A60 60 0 ${th>180?1:0} 0 ${ex} ${ey}Z" ${SH}/>${FT(140,86,r)}${FT(122,64,th+'°','start')}`);
   if(R(0,1)){ const ans=th*r*r/360; if(!Number.isInteger(ans*2)) return FD.find(x=>x.id==='g-circ').g[1]();
     return {s:'geometry',q:bi(`${f}دائرة نصف قطرها ${r} سم. ما مساحة القطاع المظلل الذي زاويته المركزية ⟦${th}°⟧؟`,`${f}A circle has radius ${r} cm. What is the area of the shaded sector with central angle ⟦${th}°⟧?`),o:mkOpts(ans,[r*r,th*2*r/360,ans*2],x=>`⟦${N(x)}π⟧`),e:bi(`⟦${th}/360 × π × ${r}^2 = ${N(ans)}π⟧`,`⟦${th}/360 × π × ${r}^2 = ${N(ans)}π⟧`)}; }
   const ans=th*2*r/360; if(!Number.isInteger(ans*2)) return FD.find(x=>x.id==='g-circ').g[1]();
   return {s:'geometry',q:bi(`${f}دائرة نصف قطرها ${r} سم. ما طول القوس المقابل للزاوية المركزية ⟦${th}°⟧؟`,`${f}A circle has radius ${r} cm. What is the length of the arc for the central angle ⟦${th}°⟧?`),o:mkOpts(ans,[th*r*r/360,2*r,ans*2],x=>`⟦${N(x)}π⟧`),e:bi(`⟦${th}/360 × 2π × ${r} = ${N(ans)}π⟧`,`⟦${th}/360 × 2π × ${r} = ${N(ans)}π⟧`)}; },
 ()=>{ if(R(0,1)){ const c=2*R(20,85); return {s:'geometry',q:bi(`زاوية مركزية في دائرة قياسها ⟦${c}°⟧. ما قياس الزاوية المحيطية المرسومة على القوس نفسه؟`,`A central angle measures ⟦${c}°⟧. What is the inscribed angle on the same arc?`),o:mkOpts(c/2,[c,2*c>=360?c+20:2*c,180-c],v=>`${v}°`),e:bi(`المحيطية نصف المركزية: ⟦${c} ÷ 2 = ${c/2}°⟧`,`Inscribed = half the central angle: ⟦${c} ÷ 2 = ${c/2}°⟧`)}; }
   const a=R(20,70),b=90-a,f=FG(`<circle cx="110" cy="75" r="60"/><polygon points="50,75 170,75 ${(110+60*Math.cos(2*Math.PI-Math.PI*a/90)).toFixed(1)},${(75+60*Math.sin(2*Math.PI-Math.PI*a/90)).toFixed(1)}"/>${FT(70,68,a+'°')}${FT(150,68,'?')}`);
   return {s:'geometry',q:bi(`${f}مثلث مرسوم داخل دائرة، أحد أضلاعه قطر فيها، وإحدى زاويتيه على القطر ⟦${a}°⟧. ما قياس زاويته الأخرى على القطر؟`,`${f}A triangle is drawn in a circle with one side a diameter. One of its angles on the diameter is ⟦${a}°⟧. What is its other angle on the diameter?`),o:mkOpts(b,[180-a,a,90+a>180?b+10:90+a].map(v=>v===b?b+20:v).concat([]),v=>`${v}°`),e:bi(`الزاوية المقابلة للقطر قائمة، فالثالثة ⟦180 − 90 − ${a} = ${b}°⟧`,`The angle opposite the diameter is right, so ⟦180 − 90 − ${a} = ${b}°⟧`)}; },
 ()=>{ const k=pick([2,3,4]),w=pick(['a','c']),ar={2:'مثلي',3:'ثلاثة أمثال',4:'أربعة أمثال'},m=w==='a'?k*k:k;
   const opt=x=>bi(x===1?'لا تتغير':`تُضرب في ${x}`,x===1?'it does not change':`it is multiplied by ${x}`);
   return {s:'geometry',q:bi(`إذا أصبح نصف قطر دائرة ${ar[k]} ما كان عليه، فماذا يحدث ${w==='a'?'لمساحتها':'لمحيطها'}؟`,`If a circle\'s radius becomes ${k} times as long, what happens to its ${w==='a'?'area':'circumference'}?`),o:[opt(m),opt(w==='a'?k:k*k),opt(w==='a'?2*k:2*k===k*k?k+1:2*k),opt(w==='a'?k**3:k**3)].map((x,i,arr)=>arr.findIndex(y=>y.ar===x.ar)===i?x:opt(m+i*5)),e:w==='a'?bi(`المساحة تتبع مربع نصف القطر: ⟦${k}^2 = ${k*k}⟧`,`Area follows the square of the radius: ⟦${k}^2 = ${k*k}⟧`):bi(`المحيط يتناسب طرديًا مع نصف القطر: يُضرب في ${k}`,`The circumference is proportional to the radius: multiplied by ${k}`)}; }]);

const FD_SH_FIG=FG(`<rect x="60" y="20" width="110" height="110" ${SH}/><circle cx="115" cy="75" r="55" fill="var(--paper,#fff)"/><rect x="60" y="20" width="110" height="110"/>${FT(115,142,10)}`);
FDL('g-shade','geo','geometry','circle',
{t:'المساحات المظللة',d:'الطرح بين شكلين، والدائرة داخل المربع والمربع داخل الدائرة، والحلقة.',
 intro:['سؤال المساحة المظللة يبدو صعبًا لأن الشكل غريب، لكن طريقته ثابتة تقريبًا: مساحة الشكل الكبير ناقص مساحة الشكل الذي لا يدخل في التظليل.','المفتاح أن تعرف كيف ترتبط أبعاد الشكلين: قطر الدائرة يساوي ضلع المربع حين تكون الدائرة داخله، ويساوي قطر المربع حين يكون المربع داخلها.'],
 rules:['المظلل = الشكل الكبير − الشكل غير المظلل.','دائرة داخل مربع تمس أضلاعه: قطرها = ضلع المربع.','مربع داخل دائرة رؤوسه عليها: قطر المربع = قطر الدائرة، ومساحة المربع ⟦= القطر^2 ÷ 2⟧','الحلقة بين دائرتين متحدتي المركز: ⟦π(نق₁^2 − نق₂^2)⟧','مثلث رأسه على الضلع المقابل من مستطيل وقاعدته ضلع المستطيل: مساحته نصف مساحة المستطيل دائمًا.'],
 ex:[['مربع طول ضلعه 10، رُسمت داخله دائرة تمس أضلاعه. ما المساحة المظللة خارج الدائرة؟',['مساحة المربع 100','نصف القطر 5، ومساحة الدائرة ⟦25π⟧'],'⟦100 − 25π⟧',FD_SH_FIG],
  ['دائرة نصف قطرها 5 رُسم داخلها مربع رؤوسه على الدائرة. ما مساحة الجزء من الدائرة خارج المربع؟',['قطر المربع 10، ومساحته ⟦100 ÷ 2 = 50⟧','مساحة الدائرة ⟦25π⟧'],'⟦25π − 50⟧'],
  ['دائرتان متحدتا المركز نصفا قطريهما 7 و4. ما مساحة الحلقة بينهما؟',['⟦π(49 − 16)⟧'],'⟦33π⟧']],
 traps:['استعمال القطر مكان نصف القطر في مساحة الدائرة.','طرح المحيطات بدل المساحات.','اعتبار ضلع المربع المرسوم داخل الدائرة مساويًا لقطرها.']},
{t:'Shaded areas',d:'Subtracting one shape from another, a circle in a square, a square in a circle, and rings.',
 intro:['Shaded-area questions look hard because the figure is unusual, but the method is almost always the same: the large shape minus the part that is not shaded.','The key is how the two shapes\' sizes are linked: a circle inside a square has a diameter equal to the side, and a square inside a circle has a diagonal equal to the diameter.'],
 rules:['Shaded = large shape − unshaded shape.','A circle inside a square touching its sides: diameter = side of the square.','A square inside a circle with its corners on it: diagonal = diameter, and the square\'s area ⟦= diagonal^2 ÷ 2⟧','The ring between two circles with the same center: ⟦π(R^2 − r^2)⟧','A triangle with its base on one side of a rectangle and its tip on the opposite side always has half the rectangle\'s area.'],
 ex:[['A circle is drawn inside a square of side 10, touching its sides. What is the shaded area outside the circle?',['The square\'s area is 100','The radius is 5, so the circle\'s area is ⟦25π⟧'],'⟦100 − 25π⟧',FD_SH_FIG],
  ['A square is drawn inside a circle of radius 5 with its corners on the circle. What is the area of the circle outside the square?',['The square\'s diagonal is 10, so its area is ⟦100 ÷ 2 = 50⟧','The circle\'s area is ⟦25π⟧'],'⟦25π − 50⟧'],
  ['Two circles with the same center have radii 7 and 4. What is the area of the ring between them?',['⟦π(49 − 16)⟧'],'⟦33π⟧']],
 traps:['Using the diameter instead of the radius in the circle area.','Subtracting circumferences instead of areas.','Taking the side of a square inside a circle to equal the diameter.']},
[()=>{ const s=2*R(2,10),r=s/2,A=s*s,B=r*r,f=FG(`<rect x="60" y="20" width="110" height="110" ${SH}/><circle cx="115" cy="75" r="55" fill="var(--paper,#fff)"/><rect x="60" y="20" width="110" height="110"/>${FT(115,142,s)}`);
   return {s:'geometry',q:bi(`${f}دائرة مرسومة داخل مربع طول ضلعه ${s} سم وتمس أضلاعه. ما المساحة المظللة؟`,`${f}A circle is drawn inside a square of side ${s} cm, touching its sides. What is the shaded area?`),o:fo(`⟦${A} − ${B}π⟧`,[`⟦${A} − ${4*B}π⟧`,`⟦${A} − ${2*r}π⟧`,`⟦${B}π − ${A}⟧`],i=>`⟦${A} − ${B+i}π⟧`),e:bi(`⟦${s}^2 − π × ${r}^2 = ${A} − ${B}π⟧`,`⟦${s}^2 − π × ${r}^2 = ${A} − ${B}π⟧`)}; },
 ()=>{ const r=R(2,10),sq=2*r*r,f=FG(`<circle cx="110" cy="75" r="60" ${SH}/><polygon points="110,15 170,75 110,135 50,75" fill="var(--paper,#fff)"/><circle cx="110" cy="75" r="60"/><path d="M110 75H170" stroke-dasharray="4 3"/>${FT(140,86,r)}`);
   return {s:'geometry',q:bi(`${f}مربع رؤوسه على دائرة نصف قطرها ${r} سم. ما المساحة المظللة داخل الدائرة وخارج المربع؟`,`${f}A square has its corners on a circle of radius ${r} cm. What is the shaded area inside the circle and outside the square?`),o:[`⟦${r*r}π − ${sq}⟧`,`⟦${r*r}π − ${4*r*r}⟧`,`⟦${4*r*r}π − ${sq}⟧`,`⟦${r*r}π − ${r*r}⟧`],e:bi(`قطر المربع ⟦${2*r}⟧ ومساحته ⟦${4*r*r} ÷ 2 = ${sq}⟧، ومساحة الدائرة ⟦${r*r}π⟧`,`The square\'s diagonal is ⟦${2*r}⟧, its area ⟦${4*r*r} ÷ 2 = ${sq}⟧; the circle\'s area is ⟦${r*r}π⟧`)}; },
 ()=>{ const r=R(2,7),Rr=r+R(1,5),ans=Rr*Rr-r*r,f=FG(`<circle cx="110" cy="75" r="62" ${SH}/><circle cx="110" cy="75" r="${Math.round(62*r/Rr)}" fill="var(--paper,#fff)"/><circle cx="110" cy="75" r="62"/><circle cx="110" cy="75" r="${Math.round(62*r/Rr)}"/>`);
   return {s:'geometry',q:bi(`${f}دائرتان لهما المركز نفسه، نصفا قطريهما ${Rr} سم و${r} سم. ما مساحة الحلقة المظللة بينهما؟`,`${f}Two circles share a center, with radii ${Rr} cm and ${r} cm. What is the area of the shaded ring?`),o:mkOpts(ans,[(Rr-r)**2,2*(Rr-r),Rr*Rr+r*r],x=>`⟦${x}π⟧`),e:bi(`⟦π(${Rr}^2 − ${r}^2) = π(${Rr*Rr} − ${r*r}) = ${ans}π⟧`,`⟦π(${Rr}^2 − ${r}^2) = π(${Rr*Rr} − ${r*r}) = ${ans}π⟧`)}; },
 ()=>{ if(R(0,1)){ const l=2*R(3,10),w=R(3,10),A=l*w/2,f=FG(`<rect x="30" y="30" width="160" height="90" ${SH}/><polygon points="30,120 190,120 ${R(60,160)},30" fill="var(--paper,#fff)"/><rect x="30" y="30" width="160" height="90"/>${FT(110,136,l)}${FT(18,77,w)}`);
     return {s:'geometry',q:bi(`${f}مستطيل بعداه ${l} و${w}، رُسم داخله مثلث قاعدته الضلع السفلي ورأسه على الضلع العلوي. ما المساحة المظللة؟`,`${f}A rectangle measures ${l} by ${w}. A triangle inside it has the bottom side as its base and its tip on the top side. What is the shaded area?`),o:mkOpts(A,[l*w,A/2,l*w-A/2]),e:bi(`المثلث نصف المستطيل، فالمظلل النصف الآخر: ⟦${l} × ${w} ÷ 2 = ${A}⟧`,`The triangle is half the rectangle, so the shaded part is the other half: ⟦${l} × ${w} ÷ 2 = ${A}⟧`)}; }
   const s=2*R(2,8),r=s/2,A=s*s,f=FG(`<rect x="60" y="20" width="110" height="110"/><path d="M60 130A55 55 0 0 1 170 130Z" ${SH}/>${FT(115,142,s)}`);
   return {s:'geometry',q:bi(`${f}مربع طول ضلعه ${s} سم، رُسم داخله نصف دائرة قطرها الضلع السفلي. ما مساحة الجزء غير المظلل من المربع؟`,`${f}A square has side ${s} cm, with a half circle drawn inside on the bottom side as diameter. What is the unshaded area of the square?`),o:[`⟦${A} − ${N(r*r/2)}π⟧`,`⟦${A} − ${r*r}π⟧`,`⟦${N(r*r/2)}π⟧`,`⟦${A} − ${2*r*r}π⟧`],e:bi(`نصف القطر ${r}، ونصف الدائرة ⟦½ × π × ${r}^2 = ${N(r*r/2)}π⟧، والباقي ⟦${A} − ${N(r*r/2)}π⟧`,`Radius ${r}; the half circle is ⟦½ × π × ${r}^2 = ${N(r*r/2)}π⟧, and the rest is ⟦${A} − ${N(r*r/2)}π⟧`)}; }]);

FDL('g-solid','geo','geometry','cube',
{t:'المجسمات',d:'المكعب ومتوازي المستطيلات والأسطوانة والمخروط والكرة، وأثر تكبير الأبعاد.',
 intro:['المجسم شكل له طول وعرض وارتفاع. أسئلته نوعان: الحجم (كم يتسع؟) والمساحة السطحية (كم نحتاج لتغليفه؟).','معظم قوانين الحجم فكرة واحدة: مساحة القاعدة × الارتفاع، ثم الثلث للمخروط والهرم.'],
 rules:['المكعب: الحجم ⟦= ل^3⟧، والمساحة الكلية ⟦= 6ل^2⟧','متوازي المستطيلات: الحجم ⟦= الطول × العرض × الارتفاع⟧','الأسطوانة: الحجم ⟦= π × نق^2 × ع⟧','المخروط والهرم: ثلث المنشور أو الأسطوانة التي لها القاعدة والارتفاع نفساهما.','الكرة: الحجم ⟦= 4/3 × π × نق^3⟧','إذا ضُربت الأبعاد في k ضُرب الحجم في ⟦k^3⟧'],
 ex:[['مكعب مساحته الكلية 150 سم². ما حجمه؟',['⟦6ل^2 = 150⟧، ⟦ل^2 = 25⟧، ⟦ل = 5⟧','⟦5^3 = 125⟧'],'125 سم³'],
  ['كم مكعبًا طول حرفه 2 سم يملأ صندوقًا أبعاده 6 و4 و4 سم؟',['حجم الصندوق ⟦6 × 4 × 4 = 96⟧','حجم المكعب الصغير 8','⟦96 ÷ 8 = 12⟧'],'12'],
  ['أسطوانة نصف قطر قاعدتها 3 وارتفاعها 10. ما حجمها؟',['⟦π × 9 × 10⟧'],'⟦90π⟧']],
 traps:['الخلط بين الحجم والمساحة السطحية.','نسيان الثلث في المخروط والهرم.','الظن أن مضاعفة الحرف تضاعف الحجم؛ بل تجعله 8 أمثال.']},
{t:'Solids',d:'Cube, box, cylinder, cone and sphere, and the effect of enlarging dimensions.',
 intro:['A solid has length, width and height. Questions are of two kinds: volume (how much it holds) and surface area (how much it takes to cover it).','Most volume formulas are one idea: base area × height, then a third for cones and pyramids.'],
 rules:['Cube: volume ⟦= s^3⟧, total surface area ⟦= 6s^2⟧','Box: volume ⟦= length × width × height⟧','Cylinder: volume ⟦= π × r^2 × h⟧','Cone and pyramid: a third of the prism or cylinder with the same base and height.','Sphere: volume ⟦= 4/3 × π × r^3⟧','Multiply the dimensions by k and the volume is multiplied by ⟦k^3⟧'],
 ex:[['A cube has a total surface area of 150 cm². What is its volume?',['⟦6s^2 = 150⟧, ⟦s^2 = 25⟧, ⟦s = 5⟧','⟦5^3 = 125⟧'],'125 cm³'],
  ['How many cubes of edge 2 cm fill a box 6 by 4 by 4 cm?',['Box volume ⟦6 × 4 × 4 = 96⟧','Small cube volume 8','⟦96 ÷ 8 = 12⟧'],'12'],
  ['A cylinder has base radius 3 and height 10. What is its volume?',['⟦π × 9 × 10⟧'],'⟦90π⟧']],
 traps:['Mixing up volume and surface area.','Forgetting the third for cones and pyramids.','Thinking that doubling the edge doubles the volume; it makes it 8 times as large.']},
[()=>{ const s=R(2,9);
   if(R(0,1)) return {s:'geometry',q:bi(`مكعب مساحته الكلية ${6*s*s} سم². ما حجمه بالسنتيمتر المكعب؟`,`A cube has a total surface area of ${6*s*s} cm². What is its volume in cm³?`),o:mkOpts(s**3,[s*s,6*s*s,s**3+s*s]),e:bi(`⟦ل^2 = ${6*s*s} ÷ 6 = ${s*s}⟧، ⟦ل = ${s}⟧، والحجم ⟦${s}^3 = ${s**3}⟧`,`⟦s^2 = ${6*s*s} ÷ 6 = ${s*s}⟧, ⟦s = ${s}⟧, volume ⟦${s}^3 = ${s**3}⟧`)};
   return {s:'geometry',q:bi(`مكعب حجمه ${s**3} سم³. ما مساحته الكلية بالسنتيمتر المربع؟`,`A cube has a volume of ${s**3} cm³. What is its total surface area in cm²?`),o:mkOpts(6*s*s,[s*s,4*s*s,6*s]),e:bi(`⟦ل = ${s}⟧، والمساحة ⟦6 × ${s}^2 = ${6*s*s}⟧`,`⟦s = ${s}⟧, area ⟦6 × ${s}^2 = ${6*s*s}⟧`)}; },
 ()=>{ const e=pick([1,2,3]),a=e*R(2,5),b=e*R(2,5),c=e*R(1,4),ans=(a*b*c)/(e**3),f=FG(`<path d="M40 60L80 30H190V100L150 130H40Z M40 60H150V130 M150 60L190 30"/>${FT(95,142,a)}${FT(178,122,b)}${FT(28,98,c)}`);
   return {s:'geometry',q:bi(`${f}صندوق على شكل متوازي مستطيلات أبعاده ${a} و${b} و${c} سم. كم مكعبًا طول حرفه ${e} سم يلزم لملئه تمامًا؟`,`${f}A box measures ${a} by ${b} by ${c} cm. How many cubes of edge ${e} cm fill it exactly?`),o:mkOpts(ans,[a*b*c,ans*e,ans+e*2]),e:bi(`⟦(${a} × ${b} × ${c}) ÷ ${e}^3 = ${a*b*c} ÷ ${e**3} = ${ans}⟧`,`⟦(${a} × ${b} × ${c}) ÷ ${e}^3 = ${a*b*c} ÷ ${e**3} = ${ans}⟧`)}; },
 ()=>{ const r=R(1,6),h=R(2,12),cone=R(0,2)===0,V=r*r*h/(cone?3:1);
   if(cone&&!Number.isInteger(V)) return FD.find(x=>x.id==='g-solid').g[2]();
   return {s:'geometry',q:bi(`${cone?'مخروط':'أسطوانة'} نصف قطر قاعدت${cone?'ه':'ها'} ${r} سم وارتفاع${cone?'ه':'ها'} ${h} سم. ما حجم${cone?'ه':'ها'}؟`,`A ${cone?'cone':'cylinder'} has base radius ${r} cm and height ${h} cm. What is its volume?`),o:mkOpts(V,[cone?r*r*h:2*r*r*h,2*r*h,r*h],x=>`⟦${N(x)}π⟧`),e:bi(`⟦${cone?'1/3 × ':''}π × ${r}^2 × ${h} = ${N(V)}π⟧`,`⟦${cone?'1/3 × ':''}π × ${r}^2 × ${h} = ${N(V)}π⟧`)}; },
 ()=>{ const k=pick([2,3]),V=pick([5,8,10,12,20,30]),ans=V*k**3;
   return {s:'geometry',q:bi(`صندوق حجمه ${V} سم³. إذا ضُربت أبعاده الثلاثة كلها في ${k}، فكم يصبح حجمه؟`,`A box has a volume of ${V} cm³. If all three of its dimensions are multiplied by ${k}, what is the new volume?`),o:mkOpts(ans,[V*k,V*k*k,V*3*k]),e:bi(`الحجم يُضرب في ⟦${k}^3 = ${k**3}⟧: ⟦${V} × ${k**3} = ${ans}⟧`,`The volume is multiplied by ⟦${k}^3 = ${k**3}⟧: ⟦${V} × ${k**3} = ${ans}⟧`)}; }]);

/* ---- unit 5: statistics and comparison ---- */
FDL('s-mean','st','stats','mean',
{t:'المتوسط الحسابي',d:'المتوسط والمجموع، وإضافة قيمة أو حذفها، والمتوسط المرجّح.',
 intro:['المتوسط الحسابي مجموع القيم مقسومًا على عددها. لكن أسئلة الاختبار نادرًا ما تطلبه مباشرة، بل تعطيك المتوسط وتطلب شيئًا آخر.','لذلك أهم مهارة هنا هي التحويل العكسي: من المتوسط إلى المجموع. احفظها: المجموع = المتوسط × العدد.'],
 rules:['المتوسط ⟦= المجموع ÷ العدد⟧، فالمجموع ⟦= المتوسط × العدد⟧','إضافة قيمة أو حذفها: احسب المجموع الجديد ثم اقسم على العدد الجديد.','إضافة ثابت لكل القيم تزيد المتوسط بالثابت نفسه، وضرب كل القيم في عدد يضرب المتوسط فيه.','المتوسط المرجّح لمجموعتين: ⟦(ن₁ × م₁ + ن₂ × م₂) ÷ (ن₁ + ن₂)⟧','متوسط أعداد متتالية أو متتابعة حسابية = متوسط الأول والأخير.'],
 ex:[['متوسط 5 أعداد 12. حُذف أحدها فصار متوسط الباقي 10. ما العدد المحذوف؟',['المجموع قبل الحذف ⟦5 × 12 = 60⟧','المجموع بعده ⟦4 × 10 = 40⟧','⟦60 − 40 = 20⟧'],'20'],
  ['فصل فيه 20 طالبًا متوسط درجاتهم 70، وفصل فيه 30 طالبًا متوسطهم 80. ما متوسط الطلاب جميعًا؟',['⟦20 × 70 + 30 × 80 = 1400 + 2400 = 3800⟧','⟦3800 ÷ 50 = 76⟧'],'76'],
  ['ما متوسط الأعداد الصحيحة من 11 إلى 19؟',['أعداد متتالية: متوسط الأول والأخير','⟦(11 + 19) ÷ 2 = 15⟧'],'15']],
 traps:['حساب متوسط المتوسطين في المجموعتين المختلفتين في العدد: ⟦(70 + 80) ÷ 2 = 75⟧ خطأ.','القسمة على العدد القديم بعد الإضافة أو الحذف.','نسيان أن المتوسط قد لا يكون إحدى القيم.']},
{t:'The mean',d:'The mean and the total, adding or removing a value, and weighted means.',
 intro:['The mean is the sum of the values divided by how many there are. Test questions rarely ask for it directly; they give the mean and ask for something else.','So the key skill is going backwards from the mean to the total. Remember: total = mean × count.'],
 rules:['Mean ⟦= total ÷ count⟧, so total ⟦= mean × count⟧','Adding or removing a value: find the new total, then divide by the new count.','Adding a constant to every value raises the mean by that constant; multiplying every value multiplies the mean.','Weighted mean of two groups: ⟦(n₁ × m₁ + n₂ × m₂) ÷ (n₁ + n₂)⟧','The mean of consecutive numbers or an arithmetic sequence = the mean of the first and last.'],
 ex:[['5 numbers have a mean of 12. One is removed and the rest have a mean of 10. What number was removed?',['Total before ⟦5 × 12 = 60⟧','Total after ⟦4 × 10 = 40⟧','⟦60 − 40 = 20⟧'],'20'],
  ['A class of 20 averages 70 and a class of 30 averages 80. What is the mean of all the students?',['⟦20 × 70 + 30 × 80 = 1400 + 2400 = 3800⟧','⟦3800 ÷ 50 = 76⟧'],'76'],
  ['What is the mean of the whole numbers from 11 to 19?',['Consecutive numbers: the mean of the first and last','⟦(11 + 19) ÷ 2 = 15⟧'],'15']],
 traps:['Averaging the two means when the groups differ in size: ⟦(70 + 80) ÷ 2 = 75⟧ is wrong.','Dividing by the old count after adding or removing a value.','Forgetting that the mean need not be one of the values.']},
[()=>{ const n=R(3,6),m=R(10,40),v=[...Array(n-1)].map(()=>R(m-12,m+12)),x=n*m-v.reduce((a,b)=>a+b,0); if(x<1) return FD.find(l=>l.id==='s-mean').g[0]();
   return {s:'stats',q:bi(`متوسط ${n} أعداد هو ${m}. إذا كان ${n-1===2?'اثنان':n-1} منها ${v.join(' و')}، فما العدد ${n-1===2?'الثالث':'الباقي'}؟`,`${n} numbers have a mean of ${m}. If ${n-1} of them are ${v.join(', ')}, what is the remaining number?`),o:mkOpts(x,[m,n*m,x+n]),e:bi(`المجموع ⟦${n} × ${m} = ${n*m}⟧، والمعروف ${v.reduce((a,b)=>a+b,0)}، فالباقي ⟦${x}⟧`,`Total ⟦${n} × ${m} = ${n*m}⟧; the known values sum to ${v.reduce((a,b)=>a+b,0)}, so the rest is ⟦${x}⟧`)}; },
 ()=>{ for(;;){ const n=R(4,9),m=R(8,30),m2=m+R(-6,6); if(m2===m||m2<1) continue; const rem=R(0,1); const x=rem?n*m-(n-1)*m2:(n+1)*m2-n*m; if(x<1) continue;
   return {s:'stats',q:rem?bi(`متوسط ${n} أعداد ${m}. حُذف أحدها فصار متوسط الباقي ${m2}. ما العدد المحذوف؟`,`${n} numbers have a mean of ${m}. One is removed and the mean of the rest is ${m2}. What number was removed?`):bi(`متوسط ${n} أعداد ${m}. أُضيف إليها عدد فصار المتوسط ${m2}. ما العدد المضاف؟`,`${n} numbers have a mean of ${m}. A number is added and the mean becomes ${m2}. What number was added?`),o:mkOpts(x,[Math.abs(m-m2),m2,x+m-m2===x?x+2:x+m-m2]),e:rem?bi(`⟦${n} × ${m} − ${n-1} × ${m2} = ${n*m} − ${(n-1)*m2} = ${x}⟧`,`⟦${n} × ${m} − ${n-1} × ${m2} = ${n*m} − ${(n-1)*m2} = ${x}⟧`):bi(`⟦${n+1} × ${m2} − ${n} × ${m} = ${(n+1)*m2} − ${n*m} = ${x}⟧`,`⟦${n+1} × ${m2} − ${n} × ${m} = ${(n+1)*m2} − ${n*m} = ${x}⟧`)}; } },
 ()=>{ for(;;){ const n1=pick([10,20,30,40]),n2=pick([10,20,30,40,60]),m1=R(60,90),m2=R(60,95); if(m1===m2) continue; const t=n1*m1+n2*m2; if(t%(n1+n2)) continue; const ans=t/(n1+n2); if(n1===n2) continue;
   return {s:'stats',q:bi(`مجموعة من ${n1} طالبًا متوسط درجاتهم ${m1}، ومجموعة من ${n2} طالبًا متوسطهم ${m2}. ما متوسط درجات المجموعتين معًا؟`,`A group of ${n1} students averages ${m1}, and a group of ${n2} averages ${m2}. What is the mean of both groups together?`),o:mkOpts(ans,[(m1+m2)/2,ans+2,ans-2].map(v=>Math.round(v*10)/10)),e:bi(`⟦(${n1} × ${m1} + ${n2} × ${m2}) ÷ ${n1+n2} = ${t} ÷ ${n1+n2} = ${ans}⟧`,`⟦(${n1} × ${m1} + ${n2} × ${m2}) ÷ ${n1+n2} = ${t} ÷ ${n1+n2} = ${ans}⟧`)}; } },
 ()=>{ if(R(0,1)){ const a=R(5,40),k=pick([5,7,9,11,13]),l=a+k-1,ans=(a+l)/2;
     return {s:'stats',q:bi(`ما متوسط الأعداد الصحيحة المتتالية من ${a} إلى ${l}؟`,`What is the mean of the consecutive whole numbers from ${a} to ${l}?`),o:mkOpts(ans,[(a+l)/2+1,l-a,(a+l)]),e:bi(`⟦(${a} + ${l}) ÷ 2 = ${ans}⟧`,`⟦(${a} + ${l}) ÷ 2 = ${ans}⟧`)}; }
   const m=R(10,50),c=R(2,9),mul=R(0,1),ans=mul?m*c:m+c;
   return {s:'stats',q:bi(`متوسط مجموعة من الأعداد ${m}. إذا ${mul?`ضُرب كل عدد منها في ${c}`:`أُضيف ${c} إلى كل عدد منها`}، فما المتوسط الجديد؟`,`A set of numbers has a mean of ${m}. If ${mul?`every number is multiplied by ${c}`:`${c} is added to every number`}, what is the new mean?`),o:mkOpts(ans,[mul?m+c:m*c,m,ans+c]),e:bi(mul?`الضرب في ${c} يضرب المتوسط: ⟦${m} × ${c} = ${ans}⟧`:`إضافة ${c} لكل عدد تزيد المتوسط ${c}: ⟦${m} + ${c} = ${ans}⟧`,mul?`Multiplying by ${c} multiplies the mean: ⟦${m} × ${c} = ${ans}⟧`:`Adding ${c} to each number adds ${c} to the mean: ⟦${m} + ${c} = ${ans}⟧`)}; }]);

const FD_FREQ_T=[['درجات','Score'],['عدد الطلاب','Students']];
FDL('s-med','st','stats','median',
{t:'الوسيط والمنوال والمدى',d:'رتّب قبل أن تبحث عن الوسيط، والمنوال الأكثر تكرارًا، والمدى بين الطرفين.',
 intro:['ثلاثة مقاييس تصف البيانات بطرق مختلفة: الوسيط هو القيمة في المنتصف بعد الترتيب، والمنوال هو الأكثر تكرارًا، والمدى هو المسافة بين الأكبر والأصغر.','الخطأ الأشهر في هذا الباب واحد: البحث عن الوسيط قبل ترتيب القيم.'],
 rules:['الوسيط: رتّب القيم ثم خذ الوسطى. وإذا كان عدد القيم زوجيًا فالوسيط متوسط القيمتين الوسطيين.','ترتيب الوسيط في n قيمة ⟦= (n + 1) ÷ 2⟧','المنوال: القيمة الأكثر تكرارًا، وقد يكون أكثر من منوال، وقد لا يوجد منوال.','المدى ⟦= أكبر قيمة − أصغر قيمة⟧','القيمة المتطرفة (الكبيرة جدًا أو الصغيرة جدًا) تغيّر المتوسط كثيرًا، أما الوسيط فبالكاد يتأثر.'],
 ex:[['ما وسيط القيم ⟦7، 3، 9، 4، 12، 5⟧؟',['رتّب: ⟦3، 4، 5، 7، 9، 12⟧','العدد زوجي: الوسطيان 5 و7','⟦(5 + 7) ÷ 2 = 6⟧'],'6'],
  ['ما منوال القيم ⟦4، 8، 4، 6، 8، 4، 9⟧؟',['4 تكررت ثلاث مرات، و8 مرتين'],'4'],
  ['أعمار ⟦12، 15، 15، 18، 60⟧. أيهما أكبر: المتوسط أم الوسيط؟',['الوسيط 15','المتوسط ⟦120 ÷ 5 = 24⟧ بسبب القيمة المتطرفة 60'],'المتوسط']],
 traps:['أخذ القيمة الوسطى قبل الترتيب.','نسيان أن الوسيط في العدد الزوجي متوسط قيمتين.','حساب المدى من أول القائمة وآخرها لا من أكبر قيمة وأصغرها.']},
{t:'Median, mode and range',d:'Sort before you look for the median; the mode is the most frequent; the range spans the ends.',
 intro:['Three measures describe data in different ways: the median is the middle value after sorting, the mode is the most frequent value, and the range is the distance between the largest and smallest.','The best-known mistake here is a single one: looking for the median before sorting.'],
 rules:['Median: sort the values and take the middle one. With an even count, the median is the mean of the two middle values.','The median\'s position among n values ⟦= (n + 1) ÷ 2⟧','Mode: the most frequent value; there may be several modes, or none.','Range ⟦= largest value − smallest value⟧','An outlier (very large or very small) moves the mean a lot but barely moves the median.'],
 ex:[['What is the median of ⟦7, 3, 9, 4, 12, 5⟧?',['Sort: ⟦3, 4, 5, 7, 9, 12⟧','Even count: the middle two are 5 and 7','⟦(5 + 7) ÷ 2 = 6⟧'],'6'],
  ['What is the mode of ⟦4, 8, 4, 6, 8, 4, 9⟧?',['4 appears three times, 8 twice'],'4'],
  ['Ages ⟦12, 15, 15, 18, 60⟧. Which is larger: the mean or the median?',['The median is 15','The mean is ⟦120 ÷ 5 = 24⟧ because of the outlier 60'],'The mean']],
 traps:['Taking the middle value before sorting.','Forgetting that with an even count the median is the mean of two values.','Taking the range from the first and last listed values instead of the largest and smallest.']},
[()=>{ const n=pick([5,7,9]),v=[...Array(n)].map(()=>R(2,40)),s=v.slice().sort((a,b)=>a-b),med=s[(n-1)/2];
   if(new Set(v).size<n) return FD.find(l=>l.id==='s-med').g[0]();
   return {s:'stats',q:bi(`ما وسيط القيم ⟦${v.join('، ')}⟧؟`,`What is the median of ⟦${v.join(', ')}⟧?`),o:mkOpts(med,[v[(n-1)/2],Math.round(v.reduce((a,b)=>a+b,0)/n),s[(n-1)/2+1]]),e:bi(`بعد الترتيب: ⟦${s.join('، ')}⟧، والوسطى ${med}`,`Sorted: ⟦${s.join(', ')}⟧; the middle value is ${med}`)}; },
 ()=>{ const n=pick([4,6,8]); let v,s,m1,m2; do{ v=[...Array(n)].map(()=>R(2,30)); s=v.slice().sort((a,b)=>a-b); m1=s[n/2-1]; m2=s[n/2]; }while(new Set(v).size<n||(m1+m2)%2);
   const med=(m1+m2)/2;
   return {s:'stats',q:bi(`ما وسيط القيم ⟦${v.join('، ')}⟧؟`,`What is the median of ⟦${v.join(', ')}⟧?`),o:mkOpts(med,[m1,m2,(v[n/2-1]+v[n/2])/2]),e:bi(`بعد الترتيب: ⟦${s.join('، ')}⟧، والوسطيان ${m1} و${m2}: ⟦(${m1} + ${m2}) ÷ 2 = ${med}⟧`,`Sorted: ⟦${s.join(', ')}⟧; the middle two are ${m1} and ${m2}: ⟦(${m1} + ${m2}) ÷ 2 = ${med}⟧`)}; },
 ()=>{ if(R(0,1)){ const mo=R(2,15),others=shuffle([...Array(14)].map((_,i)=>i+2).filter(x=>x!==mo)).slice(0,4),tw=others[0],v=shuffle([mo,mo,mo,tw,tw,...others.slice(1)]);
     return {s:'stats',q:bi(`ما منوال القيم ⟦${v.join('، ')}⟧؟`,`What is the mode of ⟦${v.join(', ')}⟧?`),o:mkOpts(mo,[tw,others[1],others[2]]),e:bi(`${mo} تكررت 3 مرات، وهي الأكثر تكرارًا`,`${mo} appears 3 times, more than any other value`)}; }
   const v=[...Array(6)].map(()=>R(3,60)),mx=Math.max(...v),mn=Math.min(...v),ans=mx-mn; if(ans===Math.abs(v[0]-v[5])||ans===0) return FD.find(l=>l.id==='s-med').g[2]();
   return {s:'stats',q:bi(`ما مدى القيم ⟦${v.join('، ')}⟧؟`,`What is the range of ⟦${v.join(', ')}⟧?`),o:mkOpts(ans,[Math.abs(v[0]-v[5]),mx,mx+mn]),e:bi(`⟦${mx} − ${mn} = ${ans}⟧`,`⟦${mx} − ${mn} = ${ans}⟧`)}; },
 ()=>{ const sc=[60,70,80,90,100],f=sc.map(()=>R(1,6)),n=f.reduce((a,b)=>a+b,0); if(n%2===0) return FD.find(l=>l.id==='s-med').g[3]();
   const pos=(n+1)/2; let c=0,med; for(let i=0;i<5;i++){ c+=f[i]; if(c>=pos){ med=sc[i]; break; } } const modeV=sc[f.indexOf(Math.max(...f))];
   const tA=rsTbl([FD_FREQ_T[0][0],...sc],[[FD_FREQ_T[1][0],...f]]),tE=rsTbl([FD_FREQ_T[0][1],...sc],[[FD_FREQ_T[1][1],...f]]);
   return {s:'stats',q:bi(`${tA}<br>يبيّن الجدول درجات طلاب في اختبار وعدد من حصل على كل درجة. ما وسيط الدرجات؟`,`${tE}<br>The table shows test scores and how many students got each score. What is the median score?`),o:fo(String(med),[String(modeV),'80',String(sc[(sc.indexOf(med)+1)%5])],i=>String(sc[(sc.indexOf(med)+i)%5])),e:bi(`عدد الطلاب ${n}، والوسيط ترتيبه ⟦(${n} + 1) ÷ 2 = ${pos}⟧، والطالب رقم ${pos} درجته ${med}`,`There are ${n} students, so the median is student number ⟦(${n} + 1) ÷ 2 = ${pos}⟧, who scored ${med}`)}; }]);

FDL('s-chart','st','stats','mean',
{t:'قراءة الجداول والرسوم البيانية',d:'الأعمدة والقطاعات الدائرية والجداول: اقرأ قبل أن تحسب.',
 intro:['أسئلة الرسوم البيانية لا تختبر حسابًا صعبًا، بل دقة القراءة: ما الوحدة؟ ما مقياس المحور؟ هل الأرقام بالآلاف أم بالنسب؟','وغالبًا تأتي عدة أسئلة على الرسم نفسه، فاستثمر نصف دقيقة في فهمه أولًا.'],
 rules:['اقرأ العنوان والوحدة ومقياس المحور قبل قراءة السؤال.','الأعمدة: الفرق بين عمودين طرح، والنسبة بينهما قسمة.','القطاعات الدائرية: النصيب ⟦= النسبة × المجموع⟧، وزاوية القطاع ⟦= النسبة × 360°⟧','نسبة التغير بين فترتين ⟦= الفرق ÷ قيمة الفترة الأقدم⟧','إذا قال السؤال «تقريبًا» فقرّب الأرقام واستبعد الخيارات البعيدة.'],
 ex:[['في رسم دائري، قطاع نسبته ⟦25%⟧ من مبيعات قيمتها 8000 ريال. كم قيمة هذا القطاع؟',['⟦8000 × 1/4⟧'],'2000'],
  ['في القطاع نفسه، ما قياس زاويته المركزية؟',['⟦25% × 360⟧'],'⟦90°⟧'],
  ['ارتفعت المبيعات في جدول من 400 إلى 500. ما نسبة الارتفاع؟',['⟦100 ÷ 400⟧'],'⟦25%⟧']],
 traps:['قراءة عمود بالخطأ من محور غير مقسّم بانتظام.','القسمة على القيمة الأحدث في نسبة التغير.','نسيان وحدة الأرقام (بالآلاف أو بالملايين).']},
{t:'Reading tables and charts',d:'Bar charts, pie charts and tables: read before you calculate.',
 intro:['Chart questions do not test hard arithmetic; they test careful reading: what is the unit, what is the scale, are the figures in thousands or in percent?','Several questions often come on the same chart, so spend half a minute understanding it first.'],
 rules:['Read the title, unit and axis scale before reading the question.','Bars: the difference between two bars is a subtraction; the ratio is a division.','Pie charts: a share ⟦= percent × total⟧, and a sector\'s angle ⟦= percent × 360°⟧','Percent change between two periods ⟦= difference ÷ the earlier value⟧','If the question says "about", round and rule out the far-off choices.'],
 ex:[['In a pie chart, a ⟦25%⟧ sector is part of 8000 SAR in sales. How much is that sector?',['⟦8000 × 1/4⟧'],'2000'],
  ['For the same sector, what is its central angle?',['⟦25% × 360⟧'],'⟦90°⟧'],
  ['Sales in a table rose from 400 to 500. What is the percent increase?',['⟦100 ÷ 400⟧'],'⟦25%⟧']],
 traps:['Misreading a bar against an unevenly spaced axis.','Dividing by the later value in percent change.','Forgetting the unit of the figures (thousands or millions).']},
[()=>{ const th=pick([[['السبت','الأحد','الاثنين','الثلاثاء','الأربعاء'],['Sat','Sun','Mon','Tue','Wed'],'مبيعات مكتبة خلال خمسة أيام (بالقطعة)','A bookshop\'s sales over five days (items)'],[['1442','1443','1444','1445','1446'],['1442','1443','1444','1445','1446'],'عدد المشتركين في نادٍ رياضي','Members of a sports club']]),mx=pick([50,100,200]),v=[...Array(5)].map(()=>mx/10*R(2,10)),i=R(0,4); let j=(i+R(1,4))%5;
   const fA=rsBars(v,th[0],mx),fE=rsBars(v,th[1],mx),sum=R(0,1);
   if(sum){ const tot=v.reduce((a,b)=>a+b,0); return {s:'stats',q:bi(`${fA}يبيّن الرسم ${th[2]}. ما المجموع الكلي؟`,`${fE}The chart shows ${th[3].toLowerCase()}. What is the total?`),o:mkOpts(tot,[tot-v[0],tot+mx/10,Math.max(...v)*5]),e:bi(`⟦${v.join(' + ')} = ${tot}⟧`,`⟦${v.join(' + ')} = ${tot}⟧`)}; }
   if(v[i]===v[j]) j=(j+1)%5; const d=Math.abs(v[i]-v[j]); if(!d) return FD.find(l=>l.id==='s-chart').g[0]();
   return {s:'stats',q:bi(`${fA}يبيّن الرسم ${th[2]}. ما الفرق بين قيمتي «${th[0][i]}» و«${th[0][j]}»؟`,`${fE}The chart shows ${th[3].toLowerCase()}. What is the difference between “${th[1][i]}” and “${th[1][j]}”?`),o:mkOpts(d,[v[i]+v[j],d+mx/10,Math.max(v[i],v[j])]),e:bi(`⟦${Math.max(v[i],v[j])} − ${Math.min(v[i],v[j])} = ${d}⟧`,`⟦${Math.max(v[i],v[j])} − ${Math.min(v[i],v[j])} = ${d}⟧`)}; },
 ()=>{ const th=pick([['ميزانية أسرة شهرية','A family\'s monthly budget',['السكن','الطعام','التعليم','أخرى'],['Housing','Food','Education','Other']],['أوقات طالب في يومه','A student\'s day',['النوم','الدراسة','المذاكرة','أخرى'],['Sleep','School','Study','Other']],['مبيعات متجر','A shop\'s sales',['ملابس','أحذية','حقائب','عطور'],['Clothes','Shoes','Bags','Perfume']]]);
   const p=pick([[40,25,20,15],[50,25,15,10],[30,30,25,15],[45,20,20,15],[35,30,20,15]]),tot=pick([4000,6000,8000,12000,2400,24]),k=R(0,3),ang=R(0,1);
   const fA=rsPie(p,th[2]),fE=rsPie(p,th[3]);
   if(ang) return {s:'stats',q:bi(`${fA}يبيّن الشكل ${th[0]}. ما قياس الزاوية المركزية لقطاع «${th[2][k]}»؟`,`${fE}The chart shows ${th[1].toLowerCase()}. What is the central angle of the “${th[3][k]}” sector?`),o:mkOpts(p[k]*3.6,[p[k],p[k]*3.6+18,p[k]*2],v=>`${N(v)}°`),e:bi(`⟦${p[k]}% × 360 = ${N(p[k]*3.6)}°⟧`,`⟦${p[k]}% × 360 = ${N(p[k]*3.6)}°⟧`)};
   const amt=tot*p[k]/100; if(!Number.isInteger(amt)) return FD.find(l=>l.id==='s-chart').g[1]();
   return {s:'stats',q:bi(`${fA}يبيّن الشكل ${th[0]}، والمجموع ${tot}. كم نصيب «${th[2][k]}»؟`,`${fE}The chart shows ${th[1].toLowerCase()}; the total is ${tot}. How much is “${th[3][k]}”?`),o:mkOpts(amt,[p[k]*10,tot/4,amt*2]),e:bi(`⟦${tot} × ${p[k]/100} = ${N(amt)}⟧`,`⟦${tot} × ${p[k]/100} = ${N(amt)}⟧`)}; },
 ()=>{ const [o,pc]=pick([[400,25],[200,15],[500,20],[800,25],[250,40],[600,5],[300,10],[120,25],[150,20]]),up=R(0,1),nw=up?o*(100+pc)/100:o*(100-pc)/100,y=R(1440,1445),df=Math.abs(nw-o);
   const tA=rsTbl(['السنة',`${y}`,`${y+1}`],[['عدد الزوار',o,nw]]),tE=rsTbl(['Year',`${y}`,`${y+1}`],[['Visitors',o,nw]]);
   return {s:'stats',q:bi(`${tA}<br>يبيّن الجدول عدد زوار معرض في سنتين. ما نسبة ${up?'الزيادة':'النقص'} في عدد الزوار؟`,`${tE}<br>The table shows a fair's visitors in two years. What is the percent ${up?'increase':'decrease'}?`),o:fo(`${pc}%`,[`${Math.round(df/nw*1000)/10}%`,`${df}%`,`${pc+5}%`],i=>`${pc+5*i+5}%`),e:bi(`⟦${df} ÷ ${o} = ${pc}%⟧`,`⟦${df} ÷ ${o} = ${pc}%⟧`)}; },
 ()=>{ const nm=pick([[['أحمد','سعد','خالد','فهد'],['Ahmed','Saad','Khalid','Fahd']],[['نورة','سارة','هند','مها'],['Noura','Sara','Hind','Maha']]]),sub=[['الرياضيات','العلوم','اللغة'],['Math','Science','Language']];
   const rows=nm[0].map(()=>sub[0].map(()=>R(60,100))),k=R(0,3),avg=rows[k].reduce((a,b)=>a+b,0)/3; if(!Number.isInteger(avg)) return FD.find(l=>l.id==='s-chart').g[3]();
   const tA=rsTbl(['الطالب',...sub[0]],rows.map((r,i)=>[nm[0][i],...r])),tE=rsTbl(['Student',...sub[1]],rows.map((r,i)=>[nm[1][i],...r]));
   return {s:'stats',q:bi(`${tA}<br>ما متوسط درجات ${nm[0][k]} في المواد الثلاث؟`,`${tE}<br>What is ${nm[1][k]}'s mean score in the three subjects?`),o:mkOpts(avg,[rows[k].reduce((a,b)=>a+b,0),Math.max(...rows[k]),avg+3]),e:bi(`⟦(${rows[k].join(' + ')}) ÷ 3 = ${avg}⟧`,`⟦(${rows[k].join(' + ')}) ÷ 3 = ${avg}⟧`)}; }]);

const cq=(a,b)=>bi(`القيمة الأولى: ${a.ar}<br>القيمة الثانية: ${b.ar}`,`Quantity A: ${a.en}<br>Quantity B: ${b.en}`);
const mq=(ar,en)=>bi(`⟦${ar}⟧`,`⟦${en??ar}⟧`);
FDL('s-cmp','st','comparison','numline',
{t:'أسئلة المقارنة',d:'أربعة خيارات ثابتة، وطريقة تجربة القيم، ومتى تختار «المعطيات غير كافية».',
 intro:['في سؤال المقارنة تُعطى قيمتان، وتختار من أربعة خيارات ثابتة لا تتغير: الأولى أكبر، أو الثانية أكبر، أو متساويتان، أو المعطيات غير كافية.','لا تحتاج غالبًا إلى حساب القيمتين بدقة، بل إلى معرفة أيهما أكبر فقط، وهذا يختصر الوقت كثيرًا.'],
 rules:['الخيارات ثابتة دائمًا، فلا تقرأها في كل سؤال.','بسّط القيمتين معًا: اطرح الكمية نفسها من الطرفين، أو اقسمهما على العدد الموجب نفسه.','مع المتغيرات جرّب قيمًا مختلفة: ⟦0، 1، −1، ½، عدد كبير⟧. إذا تغيّر الجواب بين قيمة وأخرى فالمعطيات غير كافية.','إذا كانت القيمتان أعدادًا محددة بلا متغيرات فلا تختر «المعطيات غير كافية» أبدًا.','لا تحسب ما لا تحتاج: ⟦17 × 19⟧ مقابل ⟦18^2⟧ يكفي فيه أن ⟦17 × 19 = 18^2 − 1⟧'],
 ex:[['القيمة الأولى: ⟦س^2⟧ ، القيمة الثانية: ⟦س⟧',['جرّب ⟦س = 2⟧: الأولى أكبر','جرّب ⟦س = ½⟧: الثانية أكبر','الجواب تغيّر'],'المعطيات غير كافية'],
  ['القيمة الأولى: ⟦3/7⟧ ، القيمة الثانية: ⟦0.43⟧',['⟦3 ÷ 7 ≈ 0.4286⟧','⟦0.4286 < 0.43⟧'],'الثانية أكبر'],
  ['القيمة الأولى: ⟦17 × 19⟧ ، القيمة الثانية: ⟦18^2⟧',['⟦(18 − 1)(18 + 1) = 18^2 − 1⟧'],'الثانية أكبر']],
 traps:['تجربة قيمة واحدة فقط للمتغير والحكم بها.','نسيان تجربة الصفر والكسور والأعداد السالبة.','اختيار «المعطيات غير كافية» لقيمتين عدديتين محددتين.']},
{t:'Comparison questions',d:'Four fixed choices, testing values, and when to choose "cannot be determined".',
 intro:['A comparison question gives two quantities and four fixed choices that never change: A is greater, B is greater, they are equal, or the relationship cannot be determined.','You rarely need the exact value of either quantity; you only need to know which is larger, which saves a lot of time.'],
 rules:['The choices are always the same, so do not reread them each time.','Simplify both sides together: subtract the same amount from both, or divide both by the same positive number.','With variables, test different values: ⟦0, 1, −1, ½, a large number⟧. If the answer changes between values, it cannot be determined.','If both quantities are fixed numbers with no variables, never choose "cannot be determined".','Do not calculate what you do not need: for ⟦17 × 19⟧ vs ⟦18^2⟧, it is enough that ⟦17 × 19 = 18^2 − 1⟧'],
 ex:[['Quantity A: ⟦x^2⟧, Quantity B: ⟦x⟧',['Try ⟦x = 2⟧: A is greater','Try ⟦x = ½⟧: B is greater','The answer changed'],'Cannot be determined'],
  ['Quantity A: ⟦3/7⟧, Quantity B: ⟦0.43⟧',['⟦3 ÷ 7 ≈ 0.4286⟧','⟦0.4286 < 0.43⟧'],'B is greater'],
  ['Quantity A: ⟦17 × 19⟧, Quantity B: ⟦18^2⟧',['⟦(18 − 1)(18 + 1) = 18^2 − 1⟧'],'B is greater']],
 traps:['Testing a single value for the variable and deciding from it.','Forgetting to test zero, fractions and negative numbers.','Choosing "cannot be determined" for two fixed numbers.']},
[()=>{ for(;;){ const n=R(2,9),d=R(n+1,13); if(gcd(n,d)!==1) continue; const v=n/d,dec=Math.round(v*100+pick([-1,1,0]))/100; if(dec<=0) continue; const a=v>dec?0:v<dec?1:2;
   return {s:'comparison',cmp:1,q:cq(mq(`${n}/${d}`),mq(dS(dec))),a,e:bi(`⟦${n} ÷ ${d} ≈ ${v.toFixed(4)}⟧ مقابل ⟦${dS(dec)}⟧`,`⟦${n} ÷ ${d} ≈ ${v.toFixed(4)}⟧ vs ⟦${dS(dec)}⟧`)}; } },
 ()=>{ const t=R(0,2); let A,B,qa,qb,why;
   if(t===0){ let x=R(2,5),y=R(2,5); while(y===x) y=R(2,5); A=x**y; B=y**x; qa=mq(`${x}^${y}`); qb=mq(`${y}^${x}`); why=bi(`⟦${x}^${y} = ${A}⟧ ، ⟦${y}^${x} = ${B}⟧`,`⟦${x}^${y} = ${A}⟧, ⟦${y}^${x} = ${B}⟧`); }
   else if(t===1){ const n=pick([20,30,40,50,60,70,80,90,25,15]),d=R(1,3); A=(n-d)*(n+d); B=n*n; if(R(0,1)){ [A,B]=[B,A]; qa=mq(`${n}^2`); qb=mq(`${n-d} × ${n+d}`); } else { qa=mq(`${n-d} × ${n+d}`); qb=mq(`${n}^2`); } why=bi(`⟦(${n} − ${d})(${n} + ${d}) = ${n}^2 − ${d*d}⟧`,`⟦(${n} − ${d})(${n} + ${d}) = ${n}^2 − ${d*d}⟧`); }
   else { const p=pick([10,20,25,40,50]),m=pick([20,40,60,80,30]),sw=R(0,1); A=p*m/100; B=sw?m*p/100:p*m/100+pick([-2,2]); qa=bi(`⟦${p}%⟧ من ${m}`,`⟦${p}%⟧ of ${m}`); qb=sw?bi(`⟦${m}%⟧ من ${p}`,`⟦${m}%⟧ of ${p}`):mq(N(B)); why=bi(`⟦${p}%⟧ من ${m} = ${N(A)}`,`⟦${p}%⟧ of ${m} = ${N(A)}`); }
   return {s:'comparison',cmp:1,q:cq(qa,qb),a:A>B?0:A<B?1:2,e:why}; },
 ()=>{ const c=pick(['gt1','01','neg','none','pos']);
   const C={gt1:[bi('⟦س > 1⟧','⟦x > 1⟧'),0,bi('مربع العدد الأكبر من 1 أكبر منه: ⟦2^2 = 4 > 2⟧','The square of a number above 1 is larger: ⟦2^2 = 4 > 2⟧')],'01':[bi('⟦0 &lt; س &lt; 1⟧','⟦0 &lt; x &lt; 1⟧'),1,bi('مربع الكسر بين 0 و1 أصغر منه: ⟦(½)^2 = ¼ < ½⟧','The square of a fraction between 0 and 1 is smaller: ⟦(½)^2 = ¼ < ½⟧')],neg:[bi('⟦س &lt; 0⟧','⟦x &lt; 0⟧'),0,bi('المربع موجب والعدد سالب: ⟦(−2)^2 = 4 > −2⟧','The square is positive and the number negative: ⟦(−2)^2 = 4 > −2⟧')],none:[bi('س عددًا حقيقيًا','x is a real number'),3,bi('عند ⟦س = 2⟧ الأولى أكبر، وعند ⟦س = ½⟧ الثانية أكبر، وعند ⟦س = 1⟧ متساويتان','At ⟦x = 2⟧ A is greater, at ⟦x = ½⟧ B is greater, at ⟦x = 1⟧ they are equal')],pos:[bi('⟦س > 0⟧','⟦x > 0⟧'),3,bi('عند ⟦س = 2⟧ الأولى أكبر، وعند ⟦س = ½⟧ الثانية أكبر','At ⟦x = 2⟧ A is greater, at ⟦x = ½⟧ B is greater')]}[c];
   const cond=C[0].ar.startsWith('⟦')?C[0]:C[0];
   return {s:'comparison',cmp:1,q:bi(`إذا كان ${cond.ar}:<br>القيمة الأولى: ⟦س^2⟧<br>القيمة الثانية: ⟦س⟧`,`If ${cond.en}:<br>Quantity A: ⟦x^2⟧<br>Quantity B: ⟦x⟧`),a:C[1],e:C[2]}; },
 ()=>{ const t=R(0,2);
   if(t===0){ const a=R(2,9),b=R(1,9),k=R(1,9),sg=pick([-1,0,1]),c=b+sg*k; const A=bi(`⟦${a}س + ${b}⟧`,`⟦${a}x + ${b}⟧`),B=bi(`⟦${a}س + ${c}⟧`,`⟦${a}x + ${c}⟧`);
     return {s:'comparison',cmp:1,q:bi(`س عدد حقيقي.<br>القيمة الأولى: ${A.ar}<br>القيمة الثانية: ${B.ar}`,`x is a real number.<br>Quantity A: ${A.en}<br>Quantity B: ${B.en}`),a:b>c?0:b<c?1:2,e:bi(`اطرح ⟦${a}س⟧ من الطرفين: يبقى ${b} مقابل ${N(c)}`,`Subtract ⟦${a}x⟧ from both: ${b} vs ${N(c)}`)}; }
   if(t===1){ const x=R(2,9),y=R(2,9),s=x+y; const ask=R(0,1);
     return {s:'comparison',cmp:1,q:bi(`إذا كان ⟦س + ص = ${s}⟧:<br>القيمة الأولى: ⟦س⟧<br>القيمة الثانية: ⟦ص⟧`,`If ⟦x + y = ${s}⟧:<br>Quantity A: ⟦x⟧<br>Quantity B: ⟦y⟧`),a:3,e:bi(`قد يكون ⟦س = ${s-1}⟧ و⟦ص = 1⟧، أو العكس؛ الجواب يتغير`,`It could be ⟦x = ${s-1}⟧ and ⟦y = 1⟧, or the other way round; the answer changes`)}; }
   const x=R(2,12),m=R(2,5),kk=R(1,9),y=m*x-kk+pick([-2,0,2]),A=m*x;
   return {s:'comparison',cmp:1,q:bi(`إذا كان ⟦س = ${x}⟧:<br>القيمة الأولى: ⟦${m}س⟧<br>القيمة الثانية: ⟦${y+kk} − ${kk}⟧`,`If ⟦x = ${x}⟧:<br>Quantity A: ⟦${m}x⟧<br>Quantity B: ⟦${y+kk} − ${kk}⟧`),a:A>y?0:A<y?1:2,e:bi(`⟦${m} × ${x} = ${A}⟧ ، و⟦${y+kk} − ${kk} = ${y}⟧`,`⟦${m} × ${x} = ${A}⟧, and ⟦${y+kk} − ${kk} = ${y}⟧`)}; }]);


/* ============ Foundation track, verbal part: 13 lessons (AR + EN), each with its own bank of original questions ============ */
/* a verbal lesson's drill draws from its own bank in the student's language (lesson.vb[lang]); every item also joins the main verbal bank */
const FDVB=new Set(); /* foundation drill items, kept out of timed sections and model tests */
function FDV(id,u,sk,ill,ar,en,vb){ FD.push({id,u,sk,ill,ar,en,g:[],vb,fig:null}); }
const vAn=(q,o,e)=>({s:'analogy',q,o,a:0,e});
const vCo=(q,o,e)=>({s:'completion',q,o,a:0,e});
const vCx=(q,o,a,e)=>({s:'context',q,o,a,e});
const vOdA=(o,a,e)=>({s:'odd',q:'اختر الكلمة المختلفة:',o,a,e});
const vOdE=(o,a,e)=>({s:'odd',q:'Choose the word that does not belong:',o,a,e});
const vRe=(p,q,o,e)=>({s:'reading',p,q,o,a:0,e});

/* ---- unit: verbal analogy ---- */
FDV('v-an1','van','analogy','analogy',
{t:'التناظر (١): جملة الربط',d:'اكتشف العلاقة بين الكلمتين، وحوّلها إلى جملة تختبر بها كل خيار.',
 intro:['في سؤال التناظر تُعطى كلمتين بينهما علاقة، والمطلوب خيار تجمع كلمتيه العلاقة نفسها وبالترتيب نفسه. لا يكفي أن تشعر بأن الكلمات متقاربة؛ المطلوب علاقة محددة.','أقوى أداة هنا «جملة الربط»: جملة قصيرة دقيقة تصل الكلمة الأولى بالثانية، ثم تضع كلمتي كل خيار مكانهما. الخيار الذي تصح معه الجملة دون تعديل هو الجواب.'],
 rules:['اكتب جملة الربط قبل أن تقرأ الخيارات: «القلم أداة للكتابة».','اجعل الجملة محددة: «النجار يعمل بالخشب» أدق من «النجار له علاقة بالخشب».','طبّق الجملة على كل خيار بالترتيب نفسه: الكلمة الأولى مكان الأولى، والثانية مكان الثانية.','إذا صحت الجملة مع أكثر من خيار فاجعلها أدق حتى يبقى خيار واحد.','أشهر العلاقات: أداة ووظيفتها، جزء من كل، تضاد، ترادف، سبب ونتيجة، صانع ومادته، كائن ومسكنه، مرحلة وما تصير إليه.'],
 ex:[['مقص : قص. الخيارات: منشار : نشر ، كتاب : مكتبة ، طبيب : مريض ، ماء : عطش',['جملة الربط: المقص أداة للقص.','نطبّقها: «المنشار أداة للنشر» تصح.','«الكتاب أداة للمكتبة» و«الطبيب أداة للمريض» لا تصحان.'],'منشار : نشر'],
  ['خلية : نحل. الخيارات: عش : طائر ، أسد : عرين ، عسل : زهرة ، قفص : حديقة',['جملة الربط: الخلية مسكن النحل، فالمسكن أولًا ثم الكائن.','«عش : طائر» تحافظ على الترتيب.','«أسد : عرين» علاقة صحيحة لكن ترتيبها معكوس.'],'عش : طائر'],
  ['قمح : خبز. الخيارات: قطن : قميص ، خبز : مخبز ، دقيق : قمح ، مطر : غيم',['جملة الربط: القمح مادة يُصنع منها الخبز.','«القطن مادة يُصنع منها القميص» تصح.','«دقيق : قمح» معكوسة، و«خبز : مخبز» سلعة ومكانها.'],'قطن : قميص']],
 traps:['الاكتفاء بأن الكلمات من مجال واحد: «طبيب : مستشفى» و«طبيب : مريض» من مجال واحد لكن علاقتيهما مختلفتان.','عكس الترتيب: «سبب : نتيجة» لا يساويه «نتيجة : سبب».','جملة ربط عامة جدًا تجعل خيارين صحيحين.']},
{t:'Analogies (1): the bridge sentence',d:'Find the relationship between the two words and turn it into a sentence that tests every option.',
 intro:['An analogy question gives you two words with a relationship between them. You need the option whose two words share the same relationship, in the same order. A feeling that the words are related is not enough; you need a specific relationship.','Your strongest tool is the bridge sentence: a short, precise sentence that links the first word to the second. Then put each option\'s words into it. The option that keeps the sentence true without changing it is the answer.'],
 rules:['Write the bridge sentence before you read the options: "A pen is a tool for writing."','Make it specific: "A carpenter works with wood" is better than "A carpenter is related to wood."','Test every option in the same order: the first word in the first slot, the second in the second.','If more than one option fits, sharpen the sentence until only one is left.','The most common relationships: tool and function, part and whole, opposites, synonyms, cause and effect, maker and material, animal and home, stage and what it becomes.'],
 ex:[['SCISSORS : CUT. Options: drill : bore, book : library, doctor : patient, water : thirst',['Bridge sentence: scissors are a tool for cutting.','Test it: "a drill is a tool for boring holes" works.','"a book is a tool for a library" and "a doctor is a tool for a patient" do not.'],'drill : bore'],
  ['HIVE : BEES. Options: nest : birds, lion : den, honey : flower, cage : garden',['Bridge sentence: a hive is the home of bees, so the home comes first.','"nest : birds" keeps that order.','"lion : den" is a true pair, but its order is reversed.'],'nest : birds'],
  ['WHEAT : BREAD. Options: cotton : shirt, bread : bakery, flour : wheat, rain : cloud',['Bridge sentence: wheat is the material bread is made from.','"Cotton is the material a shirt is made from" works.','"flour : wheat" is reversed, and "bread : bakery" is a product and its place.'],'cotton : shirt']],
 traps:['Settling for words from the same field: DOCTOR : HOSPITAL and DOCTOR : PATIENT share a field but not a relationship.','Reversing the order: cause : effect is not the same as effect : cause.','A bridge sentence so general that two options fit.']},
{ar:[
 vAn('فرشاة : رسم',['مطرقة : طرق','لوحة : جدار','رسام : ألوان','قلم : ورقة'],'أداة ووظيفتها: الفرشاة أداة للرسم، والمطرقة أداة للطرق.'),
 vAn('جناح : طائر',['زعنفة : سمكة','عش : عصفور','ريش : وسادة','سماء : طائرة'],'عضو يتحرك به الكائن: الجناح للطائر، والزعنفة للسمكة.'),
 vAn('إقبال : إدبار',['صعود : هبوط','سير : مشي','نجاح : تفوق','بداية : أول'],'تضاد. بقية الخيارات ترادف أو تقارب.'),
 vAn('رحيم : عطوف',['شجاع : مقدام','كريم : بخيل','عالم : جاهل','سريع : سيارة'],'ترادف: الكلمتان بمعنى واحد.'),
 vAn('تدخين : سعال',['إفراط في الأكل : تخمة','شفاء : دواء','صيدلي : دواء','ليل : نهار'],'سبب ونتيجة بالترتيب نفسه. «شفاء : دواء» نتيجة ثم سبب، أي معكوسة.'),
 vAn('إسكافي : جلد',['زجّاج : زجاج','نجار : منشار','طاهٍ : مطعم','بنّاء : منزل'],'صانع والمادة التي يعمل بها. «نجار : منشار» صانع وأداته.'),
 vAn('محفظة : نقود',['خزانة : ملابس','نقود : بنك','جيب : قميص','كتاب : قارئ'],'وعاء وما يُحفظ فيه.'),
 vAn('يرقة : فراشة',['برعم : زهرة','زهرة : عطر','غصن : جذع','ثمرة : بذرة'],'مرحلة أولى تتحول إلى صورة مكتملة.'),
 vAn('جرّاح : مشرط',['رسام : فرشاة','طبيب : مريض','مستشفى : ممرض','قلم : كاتب'],'صاحب مهنة وأداته. «قلم : كاتب» أداة ثم صاحبها، أي معكوسة.'),
 vAn('ميل : مسافة',['دقيقة : وقت','ميزان : وزن','ساعة : معصم','كيلو : سوق'],'وحدة قياس وما تقيسه. «ميزان : وزن» أداة لا وحدة.'),
 vAn('دافئ : حار',['نسيم : إعصار','بارد : ساخن','ضوء : مصباح','نهر : ماء'],'درجة خفيفة ثم درجة شديدة من الشيء نفسه.'),
 vAn('خبز : مخبز',['دواء : صيدلية','طبيب : عيادة','قمح : دقيق','بائع : سوق'],'سلعة والمكان الذي تُباع فيه. «طبيب : عيادة» شخص ومكان عمله.'),
 vAn('تثاؤب : نعاس',['ابتسامة : سرور','سرور : ابتسامة','نوم : ليل','جوع : طعام'],'علامة تدل على حالة: التثاؤب علامة النعاس، والابتسامة علامة السرور.'),
 vAn('عين : إبصار',['أذن : سمع','يد : أصابع','قلب : صدر','أنف : وجه'],'عضو ووظيفته.'),
 vAn('سرب : طيور',['قطيع : أغنام','شجرة : أوراق','نحلة : عسل','جيش : قائد'],'اسم الجماعة وأفرادها.'),
 vAn('أصم : سمع',['أبكم : نطق','مريض : طبيب','أعرج : عصا','جاهل : مدرسة'],'من فقد قدرة وتلك القدرة: الأصم فقد السمع، والأبكم فقد النطق.')],
en:[
 vAn('BRUSH : PAINT',['hammer : pound','canvas : wall','painter : color','pen : paper'],'Tool and function: a brush is used to paint, a hammer to pound.'),
 vAn('WING : BIRD',['fin : fish','nest : sparrow','feather : pillow','sky : plane'],'The body part a creature moves with: a wing for a bird, a fin for a fish.'),
 vAn('ARRIVE : DEPART',['ascend : descend','walk : stroll','win : triumph','begin : start'],'Opposites. The other options are synonyms or near-synonyms.'),
 vAn('MERCIFUL : COMPASSIONATE',['courageous : daring','generous : stingy','wise : ignorant','fast : car'],'Synonyms: the two words mean the same.'),
 vAn('SMOKING : COUGH',['overeating : indigestion','cure : medicine','pharmacist : drug','night : day'],'Cause and effect in the same order. "cure : medicine" is effect then cause, so it is reversed.'),
 vAn('COBBLER : LEATHER',['glazier : glass','carpenter : saw','chef : restaurant','builder : house'],'A maker and the material he works with. "carpenter : saw" is a maker and his tool.'),
 vAn('WALLET : MONEY',['wardrobe : clothes','money : bank','pocket : shirt','book : reader'],'A container and what is kept in it.'),
 vAn('CATERPILLAR : BUTTERFLY',['bud : flower','flower : scent','branch : trunk','fruit : seed'],'An early stage and the full form it becomes.'),
 vAn('SURGEON : SCALPEL',['painter : brush','doctor : patient','hospital : nurse','pen : writer'],'A professional and his tool. "pen : writer" is tool then user, so it is reversed.'),
 vAn('MILE : DISTANCE',['minute : time','scale : weight','watch : wrist','kilo : market'],'A unit and what it measures. A scale is an instrument, not a unit.'),
 vAn('WARM : HOT',['breeze : hurricane','cold : hot','light : lamp','river : water'],'A mild degree, then an intense degree of the same thing.'),
 vAn('BREAD : BAKERY',['medicine : pharmacy','doctor : clinic','wheat : flour','seller : market'],'A product and the place it is sold. "doctor : clinic" is a person and his workplace.'),
 vAn('YAWN : SLEEPINESS',['smile : joy','joy : smile','sleep : night','hunger : food'],'A sign of a state: a yawn shows sleepiness, a smile shows joy.'),
 vAn('LUNGS : BREATHING',['stomach : digestion','hand : fingers','heart : chest','nose : face'],'An organ and the function it performs.'),
 vAn('FLOCK : BIRDS',['herd : cattle','tree : leaves','bee : honey','army : general'],'A group noun and its members.'),
 vAn('DEAF : HEARING',['mute : speech','sick : doctor','lame : cane','ignorant : school'],'Someone lacking an ability, and that ability.')]});

FDV('v-an2','van','analogy','analogy',
{t:'التناظر (٢): الاتجاه والدرجة',d:'حين يصح خياران ظاهريًا، يحسم الاتجاه والدرجة ونوع الكلمة الجواب.',
 intro:['كثير من أسئلة التناظر تضع بين الخيارات أكثر من خيار من النوع نفسه، فيبدو أن للسؤال جوابين. الفارق عندئذ في دقة العلاقة واتجاهها.','في هذا الدرس نفحص ثلاثة أشياء: الاتجاه (من الأولى إلى الثانية)، والدرجة (خفيف وشديد)، ونوع الكلمة (اسم أو فعل أو صفة)، ثم نسأل: هل العلاقة لازمة أم محتملة؟'],
 rules:['الاتجاه: «جزء : كل» غير «كل : جزء»، و«سبب : نتيجة» غير «نتيجة : سبب».','الدرجة: «غضب : هيجان» من الخفيف إلى الشديد، ولا يساويها «هيجان : غضب» ولا «غضب : رضا».','نوع الكلمة: إذا كانت كلمتا السؤال فعلًا ومصدره فابحث عن فعل ومصدره، وإذا كانتا فاعلًا وعمله فابحث عن مثلهما.','اللزوم: «سمكة : ماء» علاقة لازمة لا تعيش السمكة بدونها، و«قطة : حليب» علاقة محتملة.','إذا بقي خياران فأضف إلى جملة الربط كلمة أدق: «يعيش فيه دائمًا» بدل «يرتبط به».'],
 ex:[['فصل : كتاب. الخيارات: حي : مدينة ، مدينة : حي ، كتاب : مكتبة ، فصل : مدرسة',['جملة الربط: الفصل جزء من الكتاب.','«حي : مدينة» جزء من كل بالاتجاه نفسه.','«مدينة : حي» كل ثم جزء، أي معكوسة.'],'حي : مدينة'],
  ['قلق : ذعر. الخيارات: إعجاب : افتتان ، ذعر : قلق ، خوف : أمان ، فرح : سرور',['جملة الربط: الذعر قلق شديد، فالعلاقة من الدرجة الخفيفة إلى الشديدة.','«إعجاب : افتتان» بالاتجاه نفسه.','«ذعر : قلق» معكوسة، و«فرح : سرور» ترادف بلا تدرج.'],'إعجاب : افتتان'],
  ['كتب : كتابة. الخيارات: قرأ : قراءة ، قارئ : كتاب ، كاتب : قلم ، رسم : لوحة',['الكلمة الأولى فعل والثانية مصدره.','«قرأ : قراءة» فعل ومصدره.','بقية الخيارات أسماء بعلاقات أخرى.'],'قرأ : قراءة']],
 traps:['اختيار خيار معكوس الاتجاه لأن كلمتيه مألوفتان.','الخلط بين الترادف والتدرج: «سعيد : مسرور» ترادف، و«سعيد : منتشٍ» تدرج.','تجاهل نوع الكلمة: «كتب : كتابة» غير «كاتب : كتابة».']},
{t:'Analogies (2): direction and degree',d:'When two options seem to fit, direction, degree and word type decide.',
 intro:['Many analogy questions put more than one option of the same kind among the choices, so the question seems to have two answers. The difference then lies in how precise the relationship is and which way it runs.','In this lesson we check three things: direction (from the first word to the second), degree (mild and intense) and word type (noun, verb or adjective). Then we ask whether the relationship is necessary or only possible.'],
 rules:['Direction: part : whole is not whole : part, and cause : effect is not effect : cause.','Degree: annoyed : furious runs from mild to intense; furious : annoyed and annoyed : pleased do not match it.','Word type: if the pair is a verb and its noun, look for a verb and its noun; if it is a doer and his activity, look for the same.','Necessity: FISH : WATER is necessary, since a fish cannot live without water; CAT : MILK is only possible.','If two options remain, add a sharper word to the bridge sentence: "always lives in" instead of "is linked to."'],
 ex:[['CHAPTER : BOOK. Options: district : city, city : district, book : library, chapter : school',['Bridge sentence: a chapter is part of a book.','"district : city" is part and whole in the same direction.','"city : district" is whole then part, so it is reversed.'],'district : city'],
  ['WORRY : PANIC. Options: admiration : infatuation, panic : worry, fear : safety, joy : delight',['Bridge sentence: panic is extreme worry, so the pair runs from mild to intense.','"admiration : infatuation" runs the same way.','"panic : worry" is reversed, and "joy : delight" are synonyms with no change in degree.'],'admiration : infatuation'],
  ['DECIDE : DECISION. Options: perform : performance, reader : book, writer : pen, draw : picture',['The first word is a verb and the second is its noun.','"perform : performance" is a verb and its noun.','The other options are different relationships.'],'perform : performance']],
 traps:['Choosing a reversed option because its words are familiar.','Confusing synonyms with degree: happy : glad are synonyms, happy : ecstatic is a change in degree.','Ignoring word type: decide : decision is not the same as judge : decision.']},
{ar:[
 vAn('عضو : لجنة',['جندي : كتيبة','كتيبة : جندي','قائد : جيش','لجنة : اجتماع'],'فرد من جماعة بالاتجاه نفسه؛ «كتيبة : جندي» معكوسة.'),
 vAn('سحاب : مطر',['شجرة : ثمر','مطر : سحاب','نهر : بحر','غيم : سماء'],'مصدر وما يخرج منه؛ «مطر : سحاب» معكوسة.'),
 vAn('نسمة : عاصفة',['شرارة : حريق','عاصفة : نسمة','مطر : غيم','ريح : هواء'],'صورة صغيرة ثم صورة كبيرة من الشيء نفسه: النسمة ريح خفيفة والعاصفة شديدة، والشرارة نار صغيرة والحريق نار كبيرة.'),
 vAn('ابتسامة : ضحكة',['همس : صراخ','ضحكة : ابتسامة','بكاء : حزن','كلام : لسان'],'درجة خفيفة ثم شديدة من الفعل نفسه.'),
 vAn('سبح : سباحة',['زرع : زراعة','سباح : بحر','بحر : سباحة','مسبح : ماء'],'فعل ومصدره.'),
 vAn('خطيب : خطابة',['مؤلف : تأليف','تأليف : مؤلف','كتاب : قارئ','حبر : قلم'],'صاحب العمل وعمله؛ «تأليف : مؤلف» معكوسة.'),
 vAn('سمكة : ماء',['إنسان : هواء','قطة : حليب','طفل : لعبة','طائر : قفص'],'لا يعيش الأول دون الثاني. «قطة : حليب» علاقة محتملة لا لازمة.'),
 vAn('جائع : شبعان',['متعب : مرتاح','جائع : طعام','نائم : سرير','مريض : طبيب'],'حالة وضدها.'),
 vAn('كرسي : أثاث',['تفاح : فاكهة','فاكهة : تفاح','سرير : نوم','خشب : طاولة'],'فرد من فئة؛ «فاكهة : تفاح» معكوسة.'),
 vAn('مهندس : تصميم',['ممثل : تمثيل','تصميم : مهندس','بناء : إسمنت','مدير : موظف'],'صاحب المهنة وعمله.'),
 vAn('قطرة : بحر',['حبة رمل : صحراء','بحر : قطرة','موجة : شاطئ','ماء : عطش'],'أصغر جزء من شيء كبير يتكون من أمثاله.'),
 vAn('صدأ : حديد',['عفن : خبز','ماء : صدأ','حديد : مغناطيس','ذهب : لمعان'],'تلف يصيب الثاني: الصدأ يتلف الحديد، والعفن يتلف الخبز.'),
 vAn('منهك : متعب',['مذعور : خائف','خائف : مذعور','شجاع : جبان','متعب : نوم'],'الأولى درجة أشد من الثانية: المنهك شديد التعب، والمذعور شديد الخوف.'),
 vAn('كوخ : قصر',['قارب : سفينة','سفينة : قارب','بحر : نهر','مجداف : قارب'],'صغير ثم كبير من النوع نفسه.'),
 vAn('مكنسة : أرضية',['مشط : شعر','خزانة : مكنسة','غبار : أرضية','عامل : مدرسة'],'أداة وما تُستعمل عليه: المكنسة للأرضية، والمشط للشعر.'),
 vAn('منبع : نهر',['مطلع : قصيدة','خاتمة : رواية','نهر : بحر','ماء : منبع'],'بداية الشيء: المنبع أول النهر، والمطلع أول القصيدة.')],
en:[
 vAn('MEMBER : COMMITTEE',['soldier : battalion','battalion : soldier','captain : army','committee : meeting'],'One individual of a group, in the same direction; "battalion : soldier" is reversed.'),
 vAn('CLOUD : RAIN',['tree : fruit','rain : cloud','river : sea','fog : sky'],'A source and what comes from it; "rain : cloud" is reversed.'),
 vAn('BREEZE : GALE',['spark : blaze','gale : breeze','rain : cloud','wind : air'],'A small form, then a large form of the same thing: a breeze is light wind and a gale is strong wind; a spark is a small fire and a blaze a large one.'),
 vAn('SMILE : LAUGH',['whisper : shout','laugh : smile','cry : sadness','speech : tongue'],'A mild, then an intense degree of the same action.'),
 vAn('PERFORM : PERFORMANCE',['decide : decision','swimmer : pool','pool : swimming','actor : stage'],'A verb and its noun.'),
 vAn('ORATOR : SPEECH',['composer : music','music : composer','book : reader','ink : pen'],'A doer and his work; "music : composer" is reversed.'),
 vAn('FISH : WATER',['human : air','cat : milk','child : toy','bird : cage'],'The first cannot live without the second. "cat : milk" is only a possible link.'),
 vAn('HUNGRY : FULL',['tired : rested','hungry : food','asleep : bed','sick : doctor'],'A state and its opposite.'),
 vAn('CHAIR : FURNITURE',['apple : fruit','fruit : apple','bed : sleep','wood : table'],'A member of a category; "fruit : apple" is reversed.'),
 vAn('ARCHITECT : DESIGN',['actor : acting','design : architect','building : cement','manager : employee'],'A professional and his work.'),
 vAn('DROP : OCEAN',['grain : desert','ocean : drop','wave : shore','water : thirst'],'The smallest unit of something large that is made of many such units.'),
 vAn('RUST : IRON',['mold : bread','water : rust','iron : magnet','gold : shine'],'Decay that damages the second: rust spoils iron, mold spoils bread.'),
 vAn('EXHAUSTED : TIRED',['terrified : afraid','afraid : terrified','brave : cowardly','tired : sleep'],'The first is a stronger degree of the second.'),
 vAn('HUT : PALACE',['boat : ship','ship : boat','sea : river','oar : boat'],'Small, then large, of the same kind.'),
 vAn('BROOM : FLOOR',['comb : hair','closet : broom','dust : floor','janitor : school'],'A tool and what it is used on: a broom on the floor, a comb on hair.'),
 vAn('SOURCE : RIVER',['prologue : novel','ending : story','river : sea','water : source'],'The beginning of something: a source starts a river, a prologue starts a novel.')]});

FDV('v-an3','van','analogy','analogy',
{t:'التناظر (٣): فخاخ الخيارات',d:'خمسة فخاخ يضعها واضعو الأسئلة، وطريقة واحدة لتجاوزها جميعًا.',
 intro:['واضعو الأسئلة يعرفون أخطاء الطلاب، فيضعون خيارات مصممة لاصطياد التفكير السريع. إذا عرفت أنواع هذه الخيارات صار استبعادها سهلًا.','في هذا الدرس خمسة فخاخ متكررة، وطريقة واحدة تتجاوزها كلها: لا تختر قبل أن تكتب جملة الربط وتجربها على كل خيار.'],
 rules:['فخ المجال الواحد: خيار كلماته من موضوع السؤال نفسه لكن بعلاقة أخرى. «طبيب : مستشفى» لا يساويه «طبيب : مريض».','فخ الكلمة المكررة: خيار يحتوي إحدى كلمتي السؤال. تكرار الكلمة لا يعني تطابق العلاقة.','فخ الاتجاه المعكوس: كلمتا الخيار صحيحتان لكن ترتيبهما معكوس.','فخ العلاقة الجزئية: علاقة قريبة لكنها أعم أو أضعف، مثل «يرتبط به» بدل «يُصنع منه».','فخ الترابط الذهني: كلمتان تخطران معًا في الذهن، مثل قلم وورقة، دون علاقة محددة.'],
 ex:[['طبيب : سماعة. الخيارات: نجار : منشار ، طبيب : مريض ، سماعة : أذن ، مستشفى : سرير',['جملة الربط: السماعة أداة يعمل بها الطبيب.','«طبيب : مريض» من المجال نفسه وفيه كلمة مكررة، لكن العلاقة مختلفة.','«نجار : منشار» صاحب مهنة وأداته.'],'نجار : منشار'],
  ['شبل : أسد. الخيارات: أسد : شبل ، مهر : حصان ، غابة : أسد ، زئير : أسد',['جملة الربط: الشبل صغير الأسد.','«أسد : شبل» فيها الكلمتان نفسهما لكن الاتجاه معكوس.','«زئير : أسد» صوت الحيوان، و«غابة : أسد» مكانه.'],'مهر : حصان'],
  ['سيارة : وقود. الخيارات: مصباح : كهرباء ، سيارة : طريق ، وقود : محطة ، سائق : سيارة',['جملة الربط: السيارة تعمل بالوقود.','«سيارة : طريق» علاقة جزئية: الطريق مكان السير لا ما تعمل به.','«مصباح : كهرباء»: المصباح يعمل بالكهرباء.'],'مصباح : كهرباء']],
 traps:['التسرع إلى خيار فيه كلمة من السؤال.','قبول أول خيار يبدو صحيحًا دون مقارنته بالبقية.','نسيان أن الفخاخ كلها تسقط حين تكون جملة الربط دقيقة.']},
{t:'Analogies (3): trap options',d:'Five traps test writers set, and one method that beats them all.',
 intro:['Test writers know the mistakes students make, so they design options to catch quick thinking. Once you know these kinds of options, ruling them out is easy.','This lesson covers five recurring traps and one method that beats them all: do not choose until you have written the bridge sentence and tested it on every option.'],
 rules:['Same-field trap: an option with words from the same topic but a different relationship. DOCTOR : HOSPITAL is not DOCTOR : PATIENT.','Repeated-word trap: an option that contains one of the question\'s words. A shared word does not mean a shared relationship.','Reversed trap: both words are right, but their order is reversed.','Partial-relationship trap: a related but looser link, such as "is connected to" instead of "is made from."','Association trap: two words that come to mind together, like pen and paper, with no specific relationship.'],
 ex:[['DOCTOR : STETHOSCOPE. Options: carpenter : saw, doctor : patient, stethoscope : ear, hospital : bed',['Bridge sentence: a stethoscope is a tool a doctor works with.','"doctor : patient" is from the same field and repeats a word, but the relationship differs.','"carpenter : saw" is a professional and his tool.'],'carpenter : saw'],
  ['CUB : LION. Options: lion : cub, foal : horse, forest : lion, roar : lion',['Bridge sentence: a cub is a young lion.','"lion : cub" has the same words, but in reverse.','"roar : lion" is an animal\'s sound and "forest : lion" its habitat.'],'foal : horse'],
  ['CAR : FUEL. Options: lamp : electricity, car : road, fuel : station, driver : car',['Bridge sentence: a car runs on fuel.','"car : road" is a partial link: the road is where it drives, not what it runs on.','"lamp : electricity": a lamp runs on electricity.'],'lamp : electricity']],
 traps:['Rushing to an option that contains a word from the question.','Accepting the first option that looks right without comparing it with the rest.','Forgetting that every trap falls apart when the bridge sentence is precise.']},
{ar:[
 vAn('خياط : إبرة',['جراح : مشرط','خياط : قماش','إبرة : خيط','ثوب : خياط'],'صاحب مهنة وأداته. «خياط : قماش» مادة لا أداة.'),
 vAn('شجرة : غابة',['نجمة : مجرة','غابة : شجرة','شجرة : ورقة','حطب : شجرة'],'فرد من مجموعة كبيرة بالاتجاه نفسه.'),
 vAn('وقود : محرك',['طعام : جسم','محرك : سيارة','وقود : برميل','بنزين : وقود'],'ما يمد الثاني بالطاقة: الوقود للمحرك، والطعام للجسم.'),
 vAn('معلم : تلميذ',['مدرب : لاعب','معلم : مدرسة','تلميذ : كتاب','مدير : مدرسة'],'من يعلّم ومن يتعلم منه: المدرب يدرّب اللاعب.'),
 vAn('سفينة : ميناء',['طائرة : مطار','سفينة : بحر','ميناء : بحار','قطار : سائق'],'وسيلة نقل والمكان الذي تتوقف فيه.'),
 vAn('زهرة : رحيق',['بقرة : حليب','زهرة : بستان','نحلة : رحيق','رحيق : عسل'],'مصدر وما يُستخرج منه. «نحلة : رحيق» من المجال نفسه بعلاقة أخرى.'),
 vAn('رواية : فصول',['قصيدة : أبيات','فصل : رواية','روائي : رواية','كتاب : غلاف'],'كلٌّ وأجزاؤه المتتابعة. الغلاف جزء خارجي لا وحدة متتابعة.'),
 vAn('صوت : أذن',['ضوء : عين','أذن : سماعة','صوت : موسيقى','عين : دمعة'],'مؤثر والعضو الذي يدركه.'),
 vAn('مسمار : مطرقة',['برغي : مفك','مطرقة : مسمار','خشب : مسمار','منشار : خشب'],'ما تعمل عليه الأداة ثم الأداة. «مطرقة : مسمار» معكوسة.'),
 vAn('بذر : حصاد',['بداية : نهاية','حصاد : بذر','مزارع : حقل','بذر : تراب'],'أول مرحلة ثم آخرها.'),
 vAn('قاموس : كلمات',['أطلس : خرائط','قاموس : مكتبة','كلمة : حروف','معلم : قاموس'],'كتاب وما يجمعه: القاموس يجمع الكلمات، والأطلس يجمع الخرائط.'),
 vAn('جبان : إقدام',['بخيل : عطاء','جبان : خوف','شجاع : إقدام','بخيل : مال'],'صاحب صفة يفتقد ضدها: الجبان يفتقد الإقدام. «جبان : خوف» صفة وما يلازمها.'),
 vAn('عدسة : نظارة',['عجلة : دراجة','نظارة : عين','عدسة : ضوء','دراجة : طريق'],'جزء من أداة.'),
 vAn('سطر : فقرة',['فقرة : مقال','مقال : فقرة','سطر : قلم','فقرة : قارئ'],'وحدة صغرى ثم الوحدة الأكبر التي تتكون منها.'),
 vAn('ثرثار : كلام',['نهِم : طعام','ثرثار : صمت','كلام : لسان','صامت : كلام'],'صاحب الإفراط في الشيء: الثرثار يكثر الكلام، والنهم يكثر الأكل.'),
 vAn('مفتاح : قفل',['كلمة سر : حساب','قفل : باب','مفتاح : جيب','حداد : مفتاح'],'ما يفتح الثاني: المفتاح يفتح القفل، وكلمة السر تفتح الحساب.')],
en:[
 vAn('TAILOR : NEEDLE',['surgeon : scalpel','tailor : fabric','needle : thread','suit : tailor'],'A professional and his tool. "tailor : fabric" is a material, not a tool.'),
 vAn('TREE : FOREST',['star : galaxy','forest : tree','tree : leaf','firewood : tree'],'One member of a large group, in the same direction.'),
 vAn('FUEL : ENGINE',['food : body','engine : car','fuel : barrel','petrol : fuel'],'What powers the second: fuel powers an engine, food powers a body.'),
 vAn('TEACHER : PUPIL',['coach : athlete','teacher : school','pupil : book','principal : school'],'One who teaches and one who learns from him.'),
 vAn('SHIP : PORT',['plane : airport','ship : sea','port : sailor','train : driver'],'A vehicle and the place where it stops.'),
 vAn('FLOWER : NECTAR',['cow : milk','flower : garden','bee : nectar','nectar : honey'],'A source and what is taken from it. "bee : nectar" is the same field, a different relationship.'),
 vAn('NOVEL : CHAPTERS',['poem : stanzas','chapter : novel','novelist : novel','book : cover'],'A whole and its consecutive parts. A cover is an outer part, not a unit in sequence.'),
 vAn('SOUND : EAR',['light : eye','ear : earphone','sound : music','eye : tear'],'A stimulus and the organ that senses it.'),
 vAn('NAIL : HAMMER',['screw : screwdriver','hammer : nail','wood : nail','saw : wood'],'What a tool works on, then the tool. "hammer : nail" is reversed.'),
 vAn('SOWING : HARVEST',['beginning : end','harvest : sowing','farmer : field','seed : soil'],'The first stage, then the last.'),
 vAn('DICTIONARY : WORDS',['atlas : maps','dictionary : library','word : letters','teacher : dictionary'],'A book and what it collects: a dictionary collects words, an atlas collects maps.'),
 vAn('COWARD : COURAGE',['miser : generosity','coward : fear','hero : courage','miser : money'],'Someone who lacks the opposite quality: a coward lacks courage. "coward : fear" is a trait and what goes with it.'),
 vAn('LENS : GLASSES',['wheel : bicycle','glasses : eye','lens : light','bicycle : road'],'A part of a device.'),
 vAn('LINE : PARAGRAPH',['paragraph : essay','essay : paragraph','line : pen','paragraph : reader'],'A smaller unit, then the larger unit made of it.'),
 vAn('CHATTERBOX : TALK',['glutton : food','chatterbox : silence','talk : tongue','mute : talk'],'Someone who overdoes something: a chatterbox talks too much, a glutton eats too much.'),
 vAn('KEY : LOCK',['password : account','lock : door','key : pocket','locksmith : key'],'What opens the second: a key opens a lock, a password opens an account.')]});

/* ---- unit: sentence completion ---- */
FDV('v-co1','vco','completion','completion',
{t:'إكمال الجمل (١): كلمات الإشارة',d:'أدوات الربط تخبرك باتجاه الفراغ قبل أن تقرأ الخيارات.',
 intro:['جملة الإكمال ليست اختبار مفردات فقط؛ هي اختبار منطق. أدوات الربط في الجملة، مثل «لكن» و«لذلك» و«رغم»، تخبرك هل يسير الفراغ في اتجاه ما قبله أم عكسه.','الطريقة: اقرأ الجملة كاملة، وحدد أداة الربط، وضع كلمة من عندك في الفراغ قبل النظر في الخيارات، ثم اختر أقرب خيار إليها.'],
 rules:['أدوات التضاد والاستدراك: لكن، غير أن، رغم، مع أن، بينما، في حين. ما بعدها يعاكس ما قبلها.','أدوات السبب والنتيجة: لأن، إذ، لذلك، لذا، فـ، مما أدى إلى. ما بعدها يوافق ما قبلها منطقيًا.','أدوات الإضافة والتأكيد: و، كما، فضلًا عن، بل، حتى إن. ما بعدها في الاتجاه نفسه وقد يكون أقوى.','النفي يقلب الاتجاه: «لم يكن سهلًا» تعني صعبًا.','ضع كلمتك أولًا، فهي تحميك من خيارات جميلة لكنها في الاتجاه الخطأ.'],
 ex:[['رغم ...... الطريق، وصل المسافرون في الموعد. الخيارات: طول ، قصر ، جمال ، سهولة',['«رغم» تعني أن ما بعدها يعاكس المتوقع.','الوصول في الموعد متوقع إذا كان الطريق سهلًا، فالفراغ يحتاج عائقًا.','العائق بين الخيارات: طول الطريق.'],'طول'],
  ['كان الامتحان ......، لذلك أنهاه معظم الطلاب قبل الوقت. الخيارات: يسيرًا ، عسيرًا ، طويلًا ، مفاجئًا',['«لذلك» تعني أن ما بعدها نتيجة لما قبلها.','الإنهاء المبكر نتيجة لسهولة الامتحان.','الكلمة المناسبة: يسيرًا.'],'يسيرًا'],
  ['لم يكن الحل صحيحًا فقط، بل كان ...... أيضًا. الخيارات: سريعًا ، خاطئًا ، معقدًا جدًا ، متأخرًا',['«لم يكن... فقط، بل» تضيف صفة إيجابية من الاتجاه نفسه.','الصفة الإيجابية بين الخيارات: سريعًا.','«خاطئًا» تناقض «صحيحًا».'],'سريعًا']],
 traps:['اختيار كلمة صحيحة لغويًا لكنها في الاتجاه المعاكس لأداة الربط.','إهمال أداة النفي التي تقلب المعنى.','قراءة نصف الجملة ثم الاختيار، والدليل غالبًا في نصفها الثاني.']},
{t:'Sentence completion (1): signal words',d:'Linking words tell you which way the blank goes before you read the options.',
 intro:['A completion sentence is not only a vocabulary test; it is a logic test. Linking words such as but, therefore and although tell you whether the blank continues the idea before it or turns against it.','The method: read the whole sentence, find the linking word, put your own word in the blank before you look at the options, then pick the option closest to yours.'],
 rules:['Contrast words: but, however, although, despite, whereas, while. What follows runs against what came before.','Cause and result words: because, since, so, therefore, as a result. What follows fits what came before.','Addition words: and, also, moreover, not only... but also. What follows goes the same way, sometimes more strongly.','Negation flips the direction: "was not easy" means hard.','Put your own word in first; it protects you from attractive options that point the wrong way.'],
 ex:[['Despite the ______ of the road, the travelers arrived on time. Options: length, shortness, beauty, ease',['"Despite" means what follows goes against what you would expect.','Arriving on time is expected on an easy road, so the blank needs an obstacle.','The obstacle among the options: length.'],'length'],
  ['The exam was ______, so most students finished early. Options: easy, difficult, long, surprising',['"So" means what follows is a result of what came before.','Finishing early is a result of an easy exam.','The fitting word: easy.'],'easy'],
  ['The solution was not only correct but also ______. Options: quick, wrong, overly complex, late',['"Not only... but also" adds a positive quality in the same direction.','The positive quality among the options: quick.','"wrong" contradicts "correct."'],'quick']],
 traps:['Choosing a word that is grammatically fine but points against the linking word.','Missing a negation that flips the meaning.','Reading half the sentence and choosing; the clue is usually in the second half.']},
{ar:[
 vCo('رغم صعوبة الأسئلة، كان أداء الطلاب ......',['متميزًا','ضعيفًا','متعثرًا','متواضعًا'],'«رغم» تقتضي نتيجة غير متوقعة مع الصعوبة: أداء متميز.'),
 vCo('كان المتحدث ......، لذلك فهم الحاضرون فكرته بسهولة.',['واضحًا','غامضًا','متأخرًا','غاضبًا'],'«لذلك» نتيجة: الفهم السهل نتيجة الوضوح.'),
 vCo('لم يكن الطريق طويلًا فحسب، بل كان ...... أيضًا.',['وعرًا','قصيرًا','ممهدًا','آمنًا'],'«لم يكن... فحسب، بل» تضيف صفة من الاتجاه نفسه: طويل ووعر.'),
 vCo('الدواء مرّ الطعم، غير أنه ...... للمريض.',['نافع','ضار','كريه','مزعج'],'«غير أن» استدراك: مرّ لكنه نافع.'),
 vCo('أسرف في الإنفاق طوال الشهر، ...... وجد نفسه بلا مال في آخره.',['لذا','لكنه','رغم ذلك','بينما'],'النفاد نتيجة طبيعية للإسراف، فالرابط سببي.'),
 vCo('يفضّل بعض الطلاب المذاكرة في الصباح الباكر، ...... يفضّل آخرون الليل.',['بينما','لأن','لذلك','حتى'],'«بينما» للمقابلة بين حالين.'),
 vCo('نجحت التجربة ...... الباحثين التزموا بالخطوات بدقة.',['لأن','رغم أن','لكن','قبل أن'],'تعليل للنجاح.'),
 vCo('كان اللاعب ...... في المباريات الأولى، ثم استعاد مستواه في نهاية الموسم.',['متراجعًا','متألقًا','متفوقًا','متصدرًا'],'«ثم استعاد مستواه» تعني أنه كان متراجعًا قبلها.'),
 vCo('لا يكفي أن تحفظ القوانين، ...... يجب أن تتدرب على تطبيقها.',['بل','لأن','إذن','حيث'],'«لا يكفي... بل» للانتقال إلى الأهم.'),
 vCo('المدينة مزدحمة نهارًا، ...... تهدأ شوارعها في الليل.',['في حين','لأنها','لذلك','كما'],'مقابلة بين النهار والليل.'),
 vCo('تميّز الخطاط بالصبر و......؛ فلم يكن يترك اللوحة حتى تكتمل.',['الإتقان','التسرع','الإهمال','الملل'],'الواو تضيف صفة من الاتجاه نفسه، وما بعد الفاصلة يؤكد الإتقان.'),
 vCo('مع ...... الميزانية، أنجزت المدرسة مشروعها في موعده.',['قلة','كثرة','ارتفاع','ضخامة'],'«مع» هنا تفيد المفارقة: ميزانية قليلة وإنجاز في الموعد.'),
 vCo('قلّت الأمطار هذا العام، ...... انخفض منسوب المياه في السدود.',['ولهذا','ومع ذلك','بل','لكن'],'الانخفاض نتيجة طبيعية لقلة الأمطار.'),
 vCo('ظنّ الجميع أن المهمة سهلة، ......، فقد استغرقت أسابيع.',['لكنها كانت شاقة','وكانت يسيرة فعلًا','لذا أُنجزت سريعًا','وكما توقعوا كانت سهلة'],'«فقد استغرقت أسابيع» تثبت أنها شاقة، فالرابط استدراك.'),
 vCo('يُعدّ النوم الكافي ...... للتركيز؛ فمن ينام قليلًا يتشتت انتباهه.',['ضروريًا','معيقًا','ثانويًا','مضرًا'],'ما بعد الفاء تعليل يثبت الضرورة.'),
 vCo('كان الكتاب ...... حتى إنني أنهيته في جلسة واحدة.',['شائقًا','مملًّا','معقدًا','مرهقًا'],'«حتى إنني أنهيته في جلسة» نتيجة التشويق.')],
en:[
 vCo('Although the questions were difficult, the students\' performance was ______.',['outstanding','poor','disappointing','weak'],'"Although" sets up an unexpected result: outstanding performance despite difficulty.'),
 vCo('The speaker was ______, so the audience understood his point easily.',['clear','vague','late','angry'],'"So" introduces a result: easy understanding results from clarity.'),
 vCo('The road was not only long but also ______.',['rough','short','smooth','safe'],'"Not only... but also" adds a quality in the same direction: long and rough.'),
 vCo('The medicine tastes bitter; however, it is ______ for the patient.',['beneficial','harmful','unpleasant','upsetting'],'"However" signals a contrast: bitter, but beneficial.'),
 vCo('He overspent all month; ______, he found himself with no money at the end.',['consequently','nevertheless','in contrast','meanwhile'],'Running out of money is the natural result of overspending.'),
 vCo('Some students prefer studying early in the morning, ______ others prefer the night.',['whereas','because','therefore','until'],'"Whereas" contrasts two preferences.'),
 vCo('The experiment succeeded ______ the researchers followed the steps precisely.',['because','although','but','before'],'The blank gives the reason for success.'),
 vCo('The player ______ in the early matches, but he regained his form by the end of the season.',['struggled','shone','excelled','dominated'],'"Regained his form" means he had been struggling before.'),
 vCo('It is not enough to memorize the formulas; ______, you must practice applying them.',['rather','because','thus','whereas'],'"Not enough...; rather" moves to what matters more.'),
 vCo('The city is crowded during the day, ______ its streets are quiet at night.',['while','because','so','as'],'A contrast between day and night.'),
 vCo('The calligrapher was patient and ______; he never left a piece unfinished.',['meticulous','hasty','careless','bored'],'"And" adds a quality in the same direction, and the clause after the semicolon confirms it.'),
 vCo('Despite ______ resources, the team achieved impressive results.',['limited','abundant','advanced','huge'],'The contrast: limited resources, impressive results.'),
 vCo('There was little rain this year; ______, the water level in the dams dropped.',['as a result','even so','instead','but'],'The drop is a natural result of little rain.'),
 vCo('Everyone thought the task would be easy; ______, it took weeks.',['however','likewise','therefore','for example'],'"It took weeks" shows the task was hard, so the link is a contrast.'),
 vCo('Enough sleep is ______ for concentration; people who sleep too little lose focus.',['essential','harmful','secondary','irrelevant'],'The second clause explains why sleep is essential.'),
 vCo('The book was so ______ that I finished it in one sitting.',['gripping','dull','complicated','tiring'],'Finishing it in one sitting is the result of a gripping book.')]});

FDV('v-co2','vco','completion','completion',
{t:'إكمال الجمل (٢): الفراغان',d:'ابدأ بالفراغ الأسهل، واستبعد، ثم تحقق من انسجام الفراغين معًا.',
 intro:['حين تحتوي الجملة على فراغين يبدو السؤال أصعب، لكنه في الحقيقة أسهل: كل فراغ يمنحك فرصة لاستبعاد خيارات.','ابدأ بالفراغ الذي يتضح دليله أكثر، واستبعد كل خيار لا يناسبه، ثم اختبر الفراغ الآخر في الخيارات الباقية، وفي النهاية اقرأ الجملة كاملة بالخيار الذي اخترته.'],
 rules:['حل الفراغ الأوضح أولًا، ولو كان الثاني.','استبعد الخيار كله إذا فشل أحد شقيه، ولا تبحث له عن مبرر.','انتبه إلى العلاقة بين الفراغين: قد يكونان متوافقين أو متضادين بحسب أداة الربط بينهما.','في «لا... بل» ينفي الأول ويثبت الثاني، فهما في اتجاهين مختلفين.','اقرأ الجملة كاملة بالخيار المختار قبل اعتماده.'],
 ex:[['كان الطالب ...... في مذاكرته؛ ...... حصل على الدرجة الكاملة. الخيارات: مجتهدًا / ولذلك ، متكاسلًا / ولذلك ، مجتهدًا / ومع ذلك ، مترددًا / ولذلك',['الفراغ الثاني أداة ربط، والدرجة الكاملة نتيجة طبيعية للاجتهاد، فالرابط «ولذلك».','نستبعد «مجتهدًا / ومع ذلك».','بين الباقية: الاجتهاد هو ما يؤدي إلى الدرجة الكاملة.'],'مجتهدًا / ولذلك'],
  ['لا تُقاس قيمة الإنسان ......، بل ....... الخيارات: بمظهره / بأخلاقه ، بأخلاقه / بمظهره ، بماله / بثروته ، بعمله / بمظهره',['«لا... بل» تنفي الأول وتثبت الثاني.','المعيار الصحيح بعد «بل» هو الأخلاق، والمنفي هو المظهر.','«بماله / بثروته» مترادفان فلا يصح نفي أحدهما وإثبات الآخر.'],'بمظهره / بأخلاقه'],
  ['استمتع المسافرون بالرحلة، فكانت ...... رغم ...... الطقس. الخيارات: ممتعة / سوء ، ممتعة / جمال ، مزعجة / سوء ، مملة / اعتدال',['«استمتع المسافرون» تحسم الفراغ الأول: ممتعة.','«رغم» تحتاج بعدها عائقًا: سوء الطقس.','«ممتعة / جمال» لا تناسب «رغم».'],'ممتعة / سوء']],
 traps:['اختيار خيار نصفه ممتاز ونصفه خاطئ.','إهمال أداة الربط بين الفراغين.','الحكم بالفراغ الأول وحده دون قراءة الجملة كاملة.']},
{t:'Sentence completion (2): two blanks',d:'Start with the easier blank, eliminate, then check that the two words work together.',
 intro:['A sentence with two blanks looks harder, but it is actually easier: every blank gives you another chance to eliminate options.','Start with the blank whose clue is clearest and cross out every option that does not fit it. Then test the other blank on the options that remain. Finally, read the whole sentence with the option you chose.'],
 rules:['Solve the clearer blank first, even if it is the second one.','Cross out the whole option if either half fails; do not look for excuses for it.','Watch how the two blanks relate: they may agree or contrast, depending on the linking word between them.','In "not... but" the first is denied and the second affirmed, so they point in different directions.','Read the full sentence with your choice before you commit to it.'],
 ex:[['The student was ______ in his studies, ______ he earned a perfect score. Options: diligent / so, lazy / so, diligent / yet, hesitant / so',['The second blank is a linking word, and a perfect score is the natural result of hard work, so the link is "so."','Cross out "diligent / yet."','Of the rest, diligence is what leads to a perfect score.'],'diligent / so'],
  ['A person\'s worth is measured not by ______ but by ______. Options: appearance / character, character / appearance, wealth / riches, deeds / appearance',['"Not... but" denies the first and affirms the second.','The right measure after "but" is character, and what is denied is appearance.','"wealth / riches" are synonyms, so one cannot be denied while the other is affirmed.'],'appearance / character'],
  ['The travelers enjoyed the trip, which was ______ despite the ______ weather. Options: pleasant / bad, pleasant / lovely, annoying / bad, dull / mild',['"Enjoyed the trip" settles the first blank: pleasant.','"Despite" needs an obstacle: bad weather.','"pleasant / lovely" does not fit "despite."'],'pleasant / bad']],
 traps:['Choosing an option whose first half is perfect and second half is wrong.','Ignoring the linking word between the blanks.','Deciding on the first blank alone without reading the whole sentence.']},
{ar:[
 vCo('كان الطالب ...... في مذاكرته؛ ...... حصل على الدرجة الكاملة.',['مجتهدًا / ولذلك','متكاسلًا / ولذلك','مترددًا / ولذلك','مجتهدًا / ومع ذلك'],'الدرجة الكاملة نتيجة طبيعية للاجتهاد.'),
 vCo('لا تُقاس قيمة الإنسان ......، بل .......',['بمظهره / بأخلاقه','بأخلاقه / بمظهره','بماله / بثروته','بعمله / بمظهره'],'«لا... بل» تنفي الأول وتثبت الثاني، والمعيار هو الأخلاق.'),
 vCo('أدى ...... الأمطار إلى ...... منسوب المياه الجوفية.',['تأخر / انخفاض','غزارة / انخفاض','تأخر / ارتفاع','قلة / ارتفاع'],'تأخر الأمطار يؤدي إلى انخفاض المنسوب.'),
 vCo('استمتع المسافرون بالرحلة، فكانت ...... رغم ...... الطقس.',['ممتعة / سوء','ممتعة / جمال','مزعجة / سوء','مملة / اعتدال'],'«استمتع» تحسم الأول، و«رغم» تحتاج عائقًا.'),
 vCo('تساعد ...... اليومية على ...... اللياقة البدنية.',['الرياضة / تحسين','الرياضة / إضعاف','الأرق / تحسين','السهر / تقوية'],'الرياضة تحسّن اللياقة.'),
 vCo('لم يكن القرار ......؛ فقد ...... المدير أيامًا قبل أن يتخذه.',['متسرعًا / تأمّله','متسرعًا / أهمله','مدروسًا / تأمّله','صائبًا / رفضه'],'التأمل أيامًا دليل على أنه لم يكن متسرعًا.'),
 vCo('يحرص المزارع على ...... التربة قبل ......، ليضمن محصولًا وفيرًا.',['تهيئة / الزراعة','إهمال / الزراعة','تهيئة / الحصاد','تجفيف / الري'],'تُهيّأ التربة قبل الزراعة لا قبل الحصاد.'),
 vCo('كلما زادت ...... القارئ، ...... قدرته على فهم النصوص المعقدة.',['خبرة / ازدادت','خبرة / ضعفت','عجلة / ازدادت','قلة / ازدادت'],'الخبرة تزيد القدرة على الفهم.'),
 vCo('جاء التقرير ......؛ فلم يترك ...... إلا تناوله.',['شاملًا / جانبًا','مختصرًا / جانبًا','شاملًا / خطأً','ناقصًا / فكرة'],'«لم يترك جانبًا إلا تناوله» تفسير للشمول.'),
 vCo('الصدق ...... الثقة، والكذب .......',['يبني / يهدمها','يهدم / يبنيها','يبني / يقويها','يضعف / يهدمها'],'مقابلة بين أثر الصدق وأثر الكذب.'),
 vCo('وصل الضيوف في الموعد تمامًا، رغم ...... المسافة و...... الطريق.',['بُعد / ازدحام','قرب / سهولة','بُعد / سهولة','قرب / ازدحام'],'«رغم» تحتاج عائقين: بعد المسافة وازدحام الطريق.'),
 vCo('يُعرف الحليم بـ...... عند الغضب، و...... عن الإساءة.',['ضبط النفس / الصفح','سرعة الانفعال / الصفح','ضبط النفس / الرد','الصمت / الانتقام'],'الحلم ضبط النفس والصفح.'),
 vCo('أصبحت الهواتف الذكية ...... في حياتنا، حتى صار ...... الاستغناء عنها.',['أساسية / يصعب','ثانوية / يصعب','أساسية / يسهل','نادرة / يسهل'],'ما كان أساسيًا يصعب الاستغناء عنه.'),
 vCo('كلما ...... الطالب في التخطيط لوقته، ...... عليه ضغط الاختبارات.',['أحسن / خفّ','أهمل / خفّ','أحسن / اشتد','تأخر / خفّ'],'التخطيط الجيد يخفف الضغط.'),
 vCo('ينبغي أن يكون الحكم ......، فلا ...... فريقًا على آخر.',['محايدًا / يفضّل','منحازًا / يفضّل','محايدًا / يساوي','متساهلًا / يعاقب'],'الحياد يعني ألا يفضّل فريقًا على آخر.'),
 vCo('لم ...... المطر طوال اليوم، فـ...... الطرقات بالمياه.',['يتوقف / امتلأت','يهطل / امتلأت','يتوقف / جفّت','يستمر / امتلأت'],'استمرار المطر يملأ الطرقات.')],
en:[
 vCo('The student was ______ in his studies, ______ he earned a perfect score.',['diligent / so','lazy / so','hesitant / so','diligent / yet'],'A perfect score is the natural result of diligence.'),
 vCo('A person\'s worth is measured not by ______ but by ______.',['appearance / character','character / appearance','wealth / riches','deeds / appearance'],'"Not... but" denies the first and affirms the second; the measure is character.'),
 vCo('The ______ of the rain led to a ______ in the groundwater level.',['delay / drop','abundance / drop','delay / rise','scarcity / rise'],'Late rain lowers the groundwater level.'),
 vCo('The travelers enjoyed the trip, which was ______ despite the ______ weather.',['pleasant / bad','pleasant / lovely','annoying / bad','dull / mild'],'"Enjoyed" settles the first blank, and "despite" needs an obstacle.'),
 vCo('Daily ______ helps ______ physical fitness.',['exercise / improve','exercise / weaken','insomnia / improve','staying up late / strengthen'],'Exercise improves fitness.'),
 vCo('The decision was not ______; the manager ______ it for days before making it.',['hasty / considered','hasty / ignored','careful / considered','wise / rejected'],'Considering it for days shows it was not hasty.'),
 vCo('The farmer makes sure to ______ the soil before ______ to ensure a rich crop.',['prepare / planting','neglect / planting','prepare / harvesting','dry / watering'],'Soil is prepared before planting, not before harvesting.'),
 vCo('The more ______ a reader has, the ______ his ability to understand complex texts.',['experience / greater','experience / weaker','haste / greater','ignorance / greater'],'Experience increases understanding.'),
 vCo('The report was ______; it left no ______ unaddressed.',['comprehensive / aspect','brief / aspect','comprehensive / error','incomplete / idea'],'"Left no aspect unaddressed" explains "comprehensive."'),
 vCo('Honesty ______ trust, while lying ______ it.',['builds / destroys','destroys / builds','builds / strengthens','weakens / destroys'],'A contrast between the effects of honesty and lying.'),
 vCo('The guests arrived exactly on time despite the ______ distance and the ______ roads.',['long / congested','short / clear','long / clear','short / congested'],'"Despite" needs two obstacles: a long distance and congested roads.'),
 vCo('A patient person is known for ______ when angry and ______ when wronged.',['self-control / forgiveness','short temper / forgiveness','self-control / revenge','silence / retaliation'],'Patience means self-control and forgiveness.'),
 vCo('Smartphones have become ______ in our lives, so much so that it is ______ to do without them.',['essential / hard','marginal / hard','essential / easy','rare / easy'],'What is essential is hard to do without.'),
 vCo('The better a student ______ his time, the ______ the pressure of exams.',['manages / lighter','wastes / lighter','manages / heavier','forgets / lighter'],'Good time management eases the pressure.'),
 vCo('A referee must be ______, never ______ one team over another.',['impartial / favoring','biased / favoring','impartial / equaling','lenient / punishing'],'Being impartial means not favoring one team.'),
 vCo('The rain did not ______ all day, so the streets were ______ with water.',['stop / flooded','fall / flooded','stop / dry','continue / flooded'],'Rain that never stops floods the streets.')]});

FDV('v-co3','vco','completion','completion',
{t:'إكمال الجمل (٣): التلازم اللفظي ودقة الكلمة',d:'بعض الكلمات تصاحب كلمات بعينها، وبعضها أدق من مرادفاته في سياقه.',
 intro:['في العربية كلمات تتلازم في الاستعمال: نقول «اتخذ قرارًا» و«أبرم اتفاقية» و«تكبّد خسائر». قد تجد بين الخيارات كلمة قريبة المعنى لكنها لا تُستعمل مع ما في الجملة.','وأحيانًا يكون الفرق في دقة المعنى: «المنهك» أشد من «المتعب»، و«المبدع» غير «المجتهد». كلما اتسعت قراءتك ازداد إحساسك بهذا التلازم.'],
 rules:['ابحث عن الكلمة التي يرتبط بها الفراغ مباشرة، مثل الفعل قبل المفعول أو الاسم قبل الصفة.','اسأل: هل يقول العرب هذا التركيب؟ «اتخذ قرارًا» صحيح، و«اتخذ سؤالًا» غير مستعمل.','بين المترادفات اختر الأدق في السياق: شدة الصفة، أو نوع الفعل، أو ما يناسب الموقف.','دليل الدقة غالبًا في بقية الجملة: «فلم يعد يقوى على الكلام» تشير إلى إنهاك شديد لا إلى تعب عادي.','دوّن التراكيب المتلازمة التي تصادفها في القراءة، فهي تتكرر في الاختبار.'],
 ex:[['أبرم البلدان ...... تجارية جديدة. الخيارات: اتفاقية ، مشكلة ، مسافة ، رحلة',['الفعل «أبرم» يلازم العقود والاتفاقيات.','لا يُقال «أبرم مشكلة» ولا «أبرم رحلة».'],'اتفاقية'],
  ['تكبّدت الشركة ...... فادحة بسبب الحريق. الخيارات: خسائر ، أرباحًا ، نجاحات ، مكاسب',['«تكبّد» تعني تحمّل شيئًا ثقيلًا، وتلازم الخسائر.','«فادحة» صفة تلازم الخسائر والأخطاء.'],'خسائر'],
  ['وصل المتسابق إلى خط النهاية ......، فلم يعد يقوى على الكلام. الخيارات: منهكًا ، نشيطًا ، مبكرًا ، متأنقًا',['«لم يعد يقوى على الكلام» دليل على تعب شديد.','«منهكًا» أدق كلمة تعبر عن هذه الشدة.'],'منهكًا']],
 traps:['اختيار مرادف صحيح المعنى لا يُستعمل في هذا التركيب.','الاكتفاء بالمعنى العام وإهمال الشدة أو النوع.','إهمال الصفة أو الفعل الذي يحدد الكلمة المطلوبة.']},
{t:'Sentence completion (3): collocations and precise words',d:'Some words naturally go with specific words, and some fit their context more precisely than their synonyms.',
 intro:['English has words that naturally go together: we "make a decision," "sign an agreement" and "suffer losses." An option may be close in meaning but simply not used with the words in the sentence.','Sometimes the difference is precision: "exhausted" is stronger than "tired," and "original" is not the same as "hard-working." The more you read, the better your feel for these pairings.'],
 rules:['Find the word the blank attaches to directly, such as the verb before the object or the noun before the adjective.','Ask: do people actually say this? "Make a decision" is natural; "do a decision" is not.','Among synonyms, pick the one most precise for the context: the strength of the quality, the type of action, or what suits the situation.','The clue to precision is usually elsewhere in the sentence: "unable even to speak" points to exhaustion, not ordinary tiredness.','Note down the word pairings you meet while reading; they recur in the test.'],
 ex:[['The two countries ______ a new trade agreement. Options: signed, threw, drove, fixed',['Agreements are "signed."','No one "throws" or "drives" an agreement.'],'signed'],
  ['The company ______ heavy losses because of the fire. Options: suffered, earned, won, celebrated',['"Suffer" pairs naturally with losses.','"Heavy" is the adjective that goes with losses here.'],'suffered'],
  ['The runner reached the finish line ______, unable even to speak. Options: exhausted, energetic, early, elegant',['"Unable even to speak" signals extreme tiredness.','"Exhausted" is the word that captures that degree.'],'exhausted']],
 traps:['Choosing a synonym with the right meaning that is not used in this pairing.','Settling for the general meaning and ignoring strength or type.','Ignoring the verb or adjective that decides the word needed.']},
{ar:[
 vCo('اتخذ المدير ...... حاسمًا بشأن المشروع.',['قرارًا','فكرة','حديثًا','سؤالًا'],'التلازم الصحيح: «اتخذ قرارًا».'),
 vCo('أدلى الشاهد بـ...... أمام المحكمة.',['شهادته','قراره','حكمه','سؤاله'],'«أدلى بشهادته» تركيب متلازم.'),
 vCo('شنّ الجيش ...... على مواقع العدو.',['هجومًا','دفاعًا','سلامًا','حوارًا'],'الفعل «شنّ» يلازم الهجوم والحملة.'),
 vCo('أبرم البلدان ...... تجارية جديدة.',['اتفاقية','مشكلة','مسافة','رحلة'],'«أبرم» تلازم العقود والاتفاقيات.'),
 vCo('هطل المطر ...... حتى امتلأت الأودية.',['بغزارة','بخفة','بهدوء','بندرة'],'امتلاء الأودية دليل على الغزارة.'),
 vCo('يتمتع الطبيب بـ...... واسعة في جراحة القلب.',['خبرة','مساحة','رحلة','مسافة'],'«خبرة واسعة» تركيب متلازم يناسب الطبيب.'),
 vCo('أطلق العلماء ...... للتحذير من خطر التلوث.',['نداءً','سؤالًا','درسًا','موعدًا'],'«أطلق نداءً» تركيب متلازم للتحذير.'),
 vCo('لقي الاقتراح ...... واسعًا من الأعضاء.',['ترحيبًا','سؤالًا','طريقًا','نقصًا'],'«لقي ترحيبًا» تركيب متلازم.'),
 vCo('وصل المتسابق إلى خط النهاية ......، فلم يعد يقوى على الكلام.',['منهكًا','نشيطًا','مبكرًا','متأنقًا'],'عجزه عن الكلام دليل على الإنهاك.'),
 vCo('كان الشاعر ......، يأتي بالمعاني الجديدة التي لم يُسبق إليها.',['مبدعًا','مقلّدًا','متكررًا','مملًّا'],'الإتيان بالجديد هو الإبداع.'),
 vCo('ارتكب اللاعب ...... ضد منافسه فطُرد من المباراة.',['مخالفة','هدفًا','تمريرة','مهارة'],'«ارتكب» تلازم المخالفات والأخطاء.'),
 vCo('رصدت الهيئة ...... كبيرة لتطوير الطرق.',['ميزانية','مسافة','مشكلة','عقبة'],'«رصد ميزانية» تركيب متلازم.'),
 vCo('ساد ...... في القاعة حين بدأ المحاضر حديثه.',['الصمت','الرحيل','الطعام','السفر'],'«ساد الصمت» تركيب متلازم.'),
 vCo('تكبّدت الشركة ...... فادحة بسبب الحريق.',['خسائر','أرباحًا','نجاحات','مكاسب'],'«تكبّد خسائر» تركيب متلازم.'),
 vCo('ألقى الخطيب ...... مؤثرة في الحفل.',['كلمة','طريقًا','وجبة','كتابًا'],'«ألقى كلمة» تركيب متلازم.'),
 vCo('يحظى المعلم المخلص بـ...... طلابه.',['احترام','خوف','نسيان','غياب'],'الإخلاص يُكسب الاحترام، و«يحظى بالاحترام» تركيب متلازم.')],
en:[
 vCo('The manager ______ a firm decision about the project.',['made','did','spoke','wrote'],'The natural pairing is "make a decision."'),
 vCo('The witness ______ testimony before the court.',['gave','did','spoke','made up'],'"Give testimony" is the natural pairing.'),
 vCo('The army ______ an attack on enemy positions.',['launched','defended','calmed','discussed'],'"Launch an attack" is the natural pairing.'),
 vCo('The two countries ______ a new trade agreement.',['signed','threw','drove','fixed'],'Agreements are signed.'),
 vCo('It rained ______ until the valleys were flooded.',['heavily','lightly','quietly','rarely'],'Flooded valleys show heavy rain.'),
 vCo('The doctor has ______ experience in heart surgery.',['extensive','tall','distant','early'],'"Extensive experience" is the natural pairing.'),
 vCo('Scientists ______ a warning about the dangers of pollution.',['issued','asked','slept','built'],'"Issue a warning" is the natural pairing.'),
 vCo('The proposal received a warm ______ from the members.',['welcome','question','road','shortage'],'"A warm welcome" is the natural pairing.'),
 vCo('The runner reached the finish line ______, unable even to speak.',['exhausted','energetic','early','elegant'],'Being unable to speak shows exhaustion.'),
 vCo('The poet was truly ______, always producing ideas no one had expressed before.',['original','imitative','repetitive','dull'],'Producing new ideas is originality.'),
 vCo('The player ______ a foul against his opponent and was sent off.',['committed','scored','passed','gained'],'Fouls and crimes are "committed."'),
 vCo('The authority ______ a large budget for developing roads.',['allocated','traveled','solved','obstructed'],'"Allocate a budget" is the natural pairing.'),
 vCo('Silence ______ the hall when the lecturer began to speak.',['fell over','departed','ate','traveled'],'"Silence fell over" is the natural pairing.'),
 vCo('The company ______ heavy losses because of the fire.',['suffered','earned','won','celebrated'],'"Suffer losses" is the natural pairing.'),
 vCo('The speaker ______ a moving speech at the ceremony.',['delivered','drove','slept','paved'],'"Deliver a speech" is the natural pairing.'),
 vCo('A devoted teacher ______ the respect of his students.',['earns','forgets','absents','sleeps'],'Devotion earns respect, and "earn respect" is the natural pairing.')]});

/* ---- unit: contextual error ---- */
FDV('v-cx1','vcx','context','context',
{t:'الخطأ السياقي (١): ابحث عن المرساة',d:'كلمة صحيحة لغويًا لكنها تناقض معنى الجملة، تكشفها كلمة أخرى تثبّت المعنى.',
 intro:['في سؤال الخطأ السياقي تقرأ جملة فيها كلمة واحدة لا تنسجم مع المعنى العام. الكلمة صحيحة نحويًا وإملائيًا، لكنها تقول عكس ما تقصده الجملة.','السر في «المرساة»: كلمة أو عبارة في الجملة تثبّت المعنى بوضوح، مثل «لذلك» أو «على وجه السرعة» أو حقيقة علمية معروفة. الكلمة التي تخالف المرساة هي الخطأ.'],
 rules:['اقرأ الجملة كاملة واستخرج فكرتها العامة قبل فحص الكلمات.','ابحث عن المرساة: كلمة أو عبارة تحدد المعنى بوضوح، ثم اسأل: أي الكلمات المظللة تخالفها؟','جرّب ضد الكلمة المشتبه بها: إذا استقام المعنى كله بالضد فهي الخطأ.','الخطأ سياقي لا نحوي: لا تبحث عن خطأ في الإعراب أو الإملاء.','الحقائق العلمية والتاريخية المعروفة مراسٍ قوية: الماء يغلي عند مئة درجة، وحاتم الطائي مضرب المثل في الكرم.'],
 ex:[['حرص الطالب على المراجعة اليومية، فاستعد للاختبار متأخرًا. الكلمات: حرص ، اليومية ، فاستعد ، متأخرًا',['الفكرة العامة: طالب منظم يراجع كل يوم.','المرساة: «المراجعة اليومية» تعني استعدادًا مبكرًا.','«متأخرًا» تخالفها، والصحيح «مبكرًا».'],'متأخرًا'],
  ['تنخفض درجة غليان الماء كلما ارتفعنا عن سطح البحر، لذلك يستغرق الطهي على الجبال وقتًا أقصر. الكلمات: تنخفض ، ارتفعنا ، الطهي ، أقصر',['المرساة حقيقة علمية: الماء على الجبال يغلي عند حرارة أقل.','الطعام يحتاج حرارة كافية لينضج، فيستغرق وقتًا أطول.','«أقصر» تخالف هذه النتيجة، والصحيح «أطول».'],'أقصر'],
  ['أشرقت الشمس فأظلمت الأرجاء وبدأ الناس يومهم. الكلمات: أشرقت ، فأظلمت ، الأرجاء ، يومهم',['المرساتان: «أشرقت الشمس» و«بدأ الناس يومهم».','«فأظلمت» تناقض الشروق، والصحيح «فأضاءت».'],'فأظلمت']],
 traps:['اختيار كلمة غريبة أو صعبة لأنها تبدو خطأ، مع أن معناها صحيح.','الحكم من نصف الجملة دون الوصول إلى المرساة.','البحث عن خطأ نحوي أو إملائي بدل الخطأ في المعنى.']},
{t:'Contextual error (1): find the anchor',d:'A word that is grammatically fine but contradicts the sentence, exposed by another word that fixes the meaning.',
 intro:['In a contextual error question, one word in the sentence does not fit its overall meaning. The word is correct in grammar and spelling, but it says the opposite of what the sentence means.','The key is the anchor: a word or phrase that fixes the meaning clearly, such as "so," "rushed" or a well-known fact. The word that clashes with the anchor is the error.'],
 rules:['Read the whole sentence and grasp its overall idea before checking the words.','Find the anchor, a word or phrase that fixes the meaning, then ask which highlighted word clashes with it.','Try the opposite of the suspect word: if the whole sentence makes sense with the opposite, it is the error.','The error is about meaning, not grammar: do not look for spelling or grammar mistakes.','Well-known scientific and historical facts are strong anchors: water boils at one hundred degrees, and Hatim al-Tai stands for generosity.'],
 ex:[['The student kept up a daily review, so he got ready for the exam late. Words: kept, daily, ready, late',['Overall idea: an organized student who reviews every day.','Anchor: a daily review means getting ready early.','"late" clashes with it; it should be "early."'],'late'],
  ['Water boils at a lower temperature at high altitude, so cooking in the mountains takes less time. Words: lower, altitude, cooking, less',['The anchor is a scientific fact: in the mountains water boils at a lower temperature.','Food needs enough heat to cook, so it takes longer.','"less" contradicts that result; it should be "more."'],'less'],
  ['The sun rose, darkening the surroundings as people began their day. Words: rose, darkening, surroundings, began',['The anchors: "the sun rose" and "people began their day."','"darkening" contradicts sunrise; it should be "lighting up."'],'darkening']],
 traps:['Choosing an unusual or difficult word because it looks wrong, even though its meaning fits.','Judging from half the sentence before reaching the anchor.','Looking for a grammar or spelling mistake instead of an error in meaning.']},
{ar:[
 vCx('استعد الطالب للاختبار متأخرًا لأنه حرص على المراجعة اليومية.',['استعد','متأخرًا','حرص','اليومية'],1,'الصحيح «مبكرًا»؛ المراجعة اليومية تعني استعدادًا مبكرًا.'),
 vCx('يُعدّ الماء ضروريًا للحياة، حتى إن الإنسان يستطيع العيش دونه شهورًا.',['ضروريًا','للحياة','يستطيع','شهورًا'],3,'الصحيح «أيامًا»؛ ضرورة الماء تعني أن الإنسان لا يصبر عليه طويلًا.'),
 vCx('اشتهر حاتم الطائي بالبخل حتى صار مضرب المثل في الكرم.',['اشتهر','بالبخل','مضرب','الكرم'],1,'الصحيح «بالجود»؛ حاتم مضرب المثل في الكرم.'),
 vCx('أقبل الناس على المشروبات الساخنة لما اشتد الحر في الصيف.',['أقبل','الساخنة','اشتد','الصيف'],1,'الصحيح «الباردة».'),
 vCx('يساعد التشجير على تلطيف الجو وزيادة التلوث في المدن.',['التشجير','تلطيف','وزيادة','المدن'],2,'الصحيح «وتقليل».'),
 vCx('تميّز شرح المعلم بالغموض، حتى أثنى الطلاب على وضوحه وسهولته.',['تميّز','بالغموض','أثنى','وضوحه'],1,'الصحيح «بالوضوح»؛ الثناء على وضوحه وسهولته مرساة المعنى.'),
 vCx('نجح رجال الدفاع المدني في السيطرة على الحريق بعد ساعات من الجهد، فازداد اشتعاله.',['نجح','السيطرة','الجهد','فازداد'],3,'الصحيح «فخمد»؛ السيطرة على الحريق تعني خموده.'),
 vCx('يحمل المسافر الحكيم زادًا كافيًا، تحسبًا لطول الطريق وقصره.',['الحكيم','كافيًا','تحسبًا','وقصره'],3,'الصحيح «ومشقته»؛ التحسب يكون لطول الطريق ومشقته لا لقصره.'),
 vCx('تنخفض درجة غليان الماء كلما ارتفعنا عن سطح البحر، لذلك يستغرق الطهي على الجبال وقتًا أقصر.',['تنخفض','ارتفعنا','الطهي','أقصر'],3,'الصحيح «أطول»؛ الماء يغلي عند حرارة أقل فيحتاج الطعام وقتًا أطول لينضج.'),
 vCx('يُكثر الطالب المتفوق من طرح الأسئلة، لأنه يزهد في المعرفة.',['المتفوق','طرح','لأنه','يزهد'],3,'الصحيح «يحرص على»؛ كثرة الأسئلة دليل حرص على المعرفة.'),
 vCx('يُعدّ الجمل أنسب الحيوانات للعيش في المناطق المطيرة، لأنه يتحمّل العطش طويلًا.',['أنسب','المطيرة','يتحمّل','العطش'],1,'الصحيح «الصحراوية».'),
 vCx('أشرقت الشمس فأظلمت الأرجاء وبدأ الناس يومهم.',['أشرقت','فأظلمت','الأرجاء','يومهم'],1,'الصحيح «فأضاءت».'),
 vCx('يكثر قلق من يُحسن إدارة وقته، لأنه ينجز أعماله في موعدها.',['يكثر','يُحسن','ينجز','موعدها'],0,'الصحيح «يقلّ».'),
 vCx('نُقل المصاب إلى المستشفى على وجه السرعة، لأن حالته كانت مستقرة.',['المصاب','السرعة','حالته','مستقرة'],3,'الصحيح «حرجة»؛ النقل السريع مرساة المعنى.'),
 vCx('بنى المهندسون السد لحجز مياه الأمطار وتبديدها في موسم الجفاف.',['السد','لحجز','الأمطار','وتبديدها'],3,'الصحيح «وتوزيعها»؛ التبديد يناقض الحجز والحاجة في موسم الجفاف.'),
 vCx('يغلي الماء عند درجة الصفر المئوية تحت الضغط الجوي المعتاد، فيتحول إلى بخار.',['يغلي','الصفر','المعتاد','بخار'],1,'الصحيح «المئة»؛ «فيتحول إلى بخار» تؤكد أن الحديث عن الغليان.')],
en:[
 vCx('The student got ready for the exam late because he kept up a daily review.',['ready','late','kept','daily'],1,'It should be "early"; a daily review means getting ready early.'),
 vCx('Water is so essential to life that a person can survive for months without drinking it.',['essential','survive','months','drinking'],2,'It should be "days"; water being essential means a person cannot last long without it.'),
 vCx('Hatim al-Tai was famous for his stinginess and became a byword for generosity.',['famous','stinginess','byword','generosity'],1,'It should be "generosity" or "kindness"; Hatim is the byword for generosity.'),
 vCx('People turned to hot drinks when the summer heat grew intense.',['turned','hot','summer','intense'],1,'It should be "cold."'),
 vCx('Planting trees helps cool the air and increase pollution in cities.',['Planting','cool','increase','cities'],2,'It should be "reduce."'),
 vCx('The teacher\'s explanation was known for its vagueness, and students praised its clarity and simplicity.',['known','vagueness','praised','clarity'],1,'It should be "clarity" or "precision"; praise for its clarity is the anchor.'),
 vCx('The firefighters brought the fire under control after hours of effort, so it spread even faster.',['brought','hours','effort','spread'],3,'It should be "died down"; bringing a fire under control means it dies down.'),
 vCx('A wise traveler carries enough food, preparing for the length and shortness of the road.',['wise','enough','preparing','shortness'],3,'It should be "hardship"; one prepares for a long, hard road, not a short one.'),
 vCx('Water boils at a lower temperature at high altitude, so cooking in the mountains takes less time.',['lower','altitude','cooking','less'],3,'It should be "more"; water boils at a lower temperature, so food takes longer to cook.'),
 vCx('An excellent student asks many questions because he is indifferent to knowledge.',['excellent','asks','because','indifferent'],3,'It should be "eager for"; asking many questions shows eagerness to learn.'),
 vCx('The camel is the best animal for life in rainy regions, because it can endure thirst for a long time.',['best','rainy','endure','thirst'],1,'It should be "desert."'),
 vCx('The sun rose, darkening the surroundings as people began their day.',['rose','darkening','surroundings','began'],1,'It should be "lighting up."'),
 vCx('Anxiety grows in someone who manages time well, because he finishes tasks on schedule.',['grows','manages','finishes','schedule'],0,'It should be "shrinks."'),
 vCx('The injured man was rushed to hospital because his condition was stable.',['injured','rushed','condition','stable'],3,'It should be "critical"; being rushed is the anchor.'),
 vCx('Engineers built the dam to hold rainwater and waste it in the dry season.',['built','hold','rainwater','waste'],3,'It should be "distribute"; wasting contradicts holding water for the dry season.'),
 vCx('Water boils at zero degrees Celsius at normal pressure, turning into steam.',['boils','zero','normal','steam'],1,'It should be "one hundred"; "turning into steam" confirms the sentence is about boiling.')]});

FDV('v-cx2','vcx','context','context',
{t:'الخطأ السياقي (٢): الفخاخ والطريقة السريعة',d:'حين تبدو كلمتان متعارضتين، احسم بالكلمة التي تخالف بقية الجملة.',
 intro:['أصعب أسئلة الخطأ السياقي هي التي تبدو فيها كلمتان متعارضتين، فتتساءل: أيهما الخطأ؟ الجواب دائمًا: الكلمة التي تخالف بقية الجملة، لا الكلمة التي تخالفها كلمة واحدة فقط.','وفي هذا الدرس طريقة سريعة من ثلاث خطوات: لخّص الجملة في فكرة، وحدد الكلمات التي تخدم الفكرة، ثم ابحث عن الكلمة الوحيدة التي تعمل ضدها.'],
 rules:['إذا تعارضت كلمتان فاسأل: أيهما توافقه بقية الجملة؟ الخطأ هو الكلمة المعزولة.','العلاقات الطردية والعكسية من أشهر مواضع الخطأ: «كلما زاد... قلّ» قد تكون عكس الحقيقة.','الصفات المحمودة والمذمومة: إذا وُصف شخص بالأمانة فلا يصح أن يُنسب إليه الغدر.','الأدوات والوظائف: الميزان للوزن، والمسطرة للطول؛ اختلاط الوظيفة خطأ سياقي.','الطريقة السريعة: فكرة الجملة، ثم الكلمات التي تخدمها، ثم الكلمة الوحيدة التي تعمل ضدها.'],
 ex:[['كلما زاد عدد السكان قلّ الطلب على المساكن. الكلمات: زاد ، السكان ، قلّ ، المساكن',['الفكرة: العلاقة بين عدد السكان والطلب على المساكن.','زيادة السكان تزيد الطلب، فالعلاقة طردية.','«قلّ» تجعلها عكسية، والصحيح «زاد».'],'قلّ'],
  ['يضع البائع البضاعة في كفة الميزان ليقيس طولها. الكلمات: البائع ، كفة ، الميزان ، طولها',['«كفة» و«الميزان» تخدمان فكرة الوزن.','الكلمة الوحيدة التي تعمل ضدها: «طولها»، والصحيح «وزنها».'],'طولها'],
  ['تسير الحافلة ببطء شديد بسبب الزحام، فتصل دائمًا قبل غيرها. الكلمات: تسير ، ببطء ، فتصل ، قبل',['«ببطء» و«بسبب الزحام» متوافقتان، فلا يكون الخطأ في أي منهما.','الكلمة المعزولة «قبل»، والصحيح «بعد».'],'قبل']],
 traps:['اختيار أول كلمة متعارضة تلاحظها دون فحص بقية الجملة.','الخلط بين ما هو غير مألوف وما هو خطأ في المعنى.','نسيان الحقائق العامة البسيطة التي تحسم المعنى.']},
{t:'Contextual error (2): traps and a fast method',d:'When two words seem to clash, decide by the word that clashes with the rest of the sentence.',
 intro:['The hardest contextual error questions are those where two words seem to contradict each other, so you wonder which one is wrong. The answer is always the word that clashes with the rest of the sentence, not the word that clashes with just one other word.','This lesson gives a fast three-step method: sum the sentence up in one idea, spot the words that support that idea, then find the single word working against it.'],
 rules:['If two words clash, ask which one the rest of the sentence agrees with. The error is the isolated word.','Direct and inverse relationships are common error spots: "the more... the lower" may be the reverse of the truth.','Praised and blamed qualities: someone described as honest cannot be said to betray.','Tools and functions: a scale measures weight and a ruler measures length; mixing them up is a contextual error.','The fast method: the sentence\'s idea, then the words that serve it, then the single word that works against it.'],
 ex:[['The larger the population, the lower the demand for housing. Words: larger, population, lower, housing',['The idea: how population size relates to the demand for housing.','A larger population raises demand, so the relationship is direct.','"lower" makes it inverse; it should be "higher."'],'lower'],
  ['The seller placed the goods on the scale pan to measure their length. Words: seller, goods, scale, length',['"scale pan" serves the idea of weighing.','The single word working against it: "length"; it should be "weight."'],'length'],
  ['Because of the traffic, the bus moves very slowly and always arrives before the others. Words: traffic, slowly, always, before',['"traffic" and "slowly" agree, so neither is the error.','The isolated word is "before"; it should be "after."'],'before']],
 traps:['Choosing the first clashing word you notice without checking the rest of the sentence.','Confusing what is unfamiliar with what is wrong in meaning.','Forgetting the simple general facts that settle the meaning.']},
{ar:[
 vCx('كلما زاد عدد السكان قلّ الطلب على المساكن.',['زاد','السكان','قلّ','المساكن'],2,'الصحيح «زاد»؛ العلاقة طردية.'),
 vCx('يحتاج النبات إلى ضوء الشمس ليصنع غذاءه، لذلك يذبل إذا وُضع في مكان مُشمس طويلًا.',['ضوء','غذاءه','يذبل','مُشمس'],3,'الصحيح «مظلم».'),
 vCx('الأمانة من صفات المؤمن، فهو يخون من ائتمنه ولا يغدر بأحد.',['الأمانة','المؤمن','يخون','يغدر'],2,'الصحيح «يصون»؛ الأمانة وعدم الغدر يخالفان الخيانة.'),
 vCx('يتجنب الرياضيون التمارين المنتظمة حفاظًا على لياقتهم.',['يتجنب','المنتظمة','حفاظًا','لياقتهم'],0,'الصحيح «يلتزم»؛ الحفاظ على اللياقة يكون بالتمرين.'),
 vCx('تُسرّع الثلاجة نمو البكتيريا بخفض درجة حرارة الأطعمة، فتحفظها من التلف.',['تُسرّع','بخفض','فتحفظها','التلف'],0,'الصحيح «تُبطئ».'),
 vCx('يخسر مراده من يصبر على الشدائد، فالصبر مفتاح الفرج.',['يخسر','يصبر','الصبر','الفرج'],0,'الصحيح «ينال».'),
 vCx('الشخص المتواضع يتكبر على الناس ويعاملهم بلين.',['المتواضع','يتكبر','الناس','بلين'],1,'الصحيح «يتودد»؛ التكبر ضد التواضع واللين.'),
 vCx('يقلل التدريب المنتظم من الأخطاء، ولذلك يرتكب المتدرب أخطاء أكثر كلما طالت ممارسته.',['يقلل','المنتظم','أكثر','ممارسته'],2,'الصحيح «أقل».'),
 vCx('يضيء القمر ليلًا لأنه يعكس ضوء الشمس، فهو جرم مضيء بذاته.',['يضيء','يعكس','مضيء','بذاته'],2,'الصحيح «معتم»؛ القمر يعكس ضوء غيره.'),
 vCx('تتصف الصحراء بقلة الأمطار وكثافة الغطاء النباتي.',['تتصف','بقلة','وكثافة','النباتي'],2,'الصحيح «وندرة».'),
 vCx('يقيس البائع طول البضاعة بوضعها في كفة الميزان.',['يقيس','طول','كفة','الميزان'],1,'الصحيح «وزن».'),
 vCx('سافر الحجاج إلى مكة المكرمة في شهر رمضان لأداء فريضة الحج.',['الحجاج','مكة','رمضان','الحج'],2,'الصحيح «ذي الحجة».'),
 vCx('تأخر القطار عن موعده، فوصل الركاب قبل الوقت المحدد.',['تأخر','موعده','قبل','المحدد'],2,'الصحيح «بعد».'),
 vCx('من شروط الصحة العامة النوم الكافي والإكثار من الوجبات السريعة.',['شروط','الكافي','والإكثار','السريعة'],2,'الصحيح «والتقليل».'),
 vCx('يُعاقَب المتفوقون في نهاية العام تشجيعًا لهم على الاجتهاد.',['يُعاقَب','المتفوقون','تشجيعًا','الاجتهاد'],0,'الصحيح «يُكرَّم».'),
 vCx('تصل الحافلة دائمًا قبل غيرها، لأنها تسير ببطء شديد بسبب الزحام.',['تصل','قبل','تسير','ببطء'],1,'الصحيح «بعد»؛ البطء والزحام متوافقان.')],
en:[
 vCx('The larger the population, the lower the demand for housing.',['larger','population','lower','housing'],2,'It should be "higher"; the relationship is direct.'),
 vCx('Plants need sunlight to make food, so they wilt when kept in a sunny place for long.',['sunlight','food','wilt','sunny'],3,'It should be "dark."'),
 vCx('Honesty is a mark of the faithful: he betrays those who trust him and deceives no one.',['Honesty','faithful','betrays','deceives'],2,'It should be "protects"; honesty and deceiving no one clash with betrayal.'),
 vCx('Athletes avoid regular training to maintain their fitness.',['avoid','regular','maintain','fitness'],0,'It should be "stick to"; fitness is maintained by training.'),
 vCx('A refrigerator speeds up bacterial growth by lowering the temperature of food, which keeps it from spoiling.',['speeds','lowering','keeps','spoiling'],0,'It should be "slows."'),
 vCx('Those who endure hardship lose what they seek, for patience is the key to relief.',['endure','lose','patience','relief'],1,'It should be "gain."'),
 vCx('A humble person looks down on others and treats them gently.',['humble','looks down on','others','gently'],1,'It should be "respects"; looking down on others contradicts humility and gentleness.'),
 vCx('Regular practice reduces errors, so a trainee makes more mistakes the longer he practices.',['Regular','reduces','more','practices'],2,'It should be "fewer."'),
 vCx('The moon shines at night because it reflects sunlight; it is a self-luminous body.',['shines','reflects','sunlight','self-luminous'],3,'It should be "non-luminous"; the moon reflects light from another body.'),
 vCx('Deserts are known for little rainfall and dense vegetation.',['known','little','dense','vegetation'],2,'It should be "sparse."'),
 vCx('The seller measured the length of the goods by placing them on the scale pan.',['measured','length','placing','scale'],1,'It should be "weight."'),
 vCx('Pilgrims traveled to Makkah in Ramadan to perform the Hajj.',['Pilgrims','Makkah','Ramadan','Hajj'],2,'It should be "Dhu al-Hijjah."'),
 vCx('The train was delayed, so the passengers arrived before the scheduled time.',['delayed','passengers','before','scheduled'],2,'It should be "after."'),
 vCx('Good health requires enough sleep and plenty of fast food.',['requires','enough','plenty','fast'],2,'It should be "little."'),
 vCx('Top students are punished at the end of the year to encourage their diligence.',['Top','punished','encourage','diligence'],1,'It should be "honored."'),
 vCx('The bus always arrives before the others, because it moves very slowly in the traffic.',['always','before','slowly','traffic'],1,'It should be "after"; slowness and traffic agree.')]});

/* ---- unit: odd word out ---- */
FDV('v-od1','vod','odd','odd',
{t:'المفردة الشاذة (١): الرابط المشترك',d:'اعثر على الرابط الذي يجمع ثلاث كلمات، فتظهر الرابعة وحدها.',
 intro:['في سؤال المفردة الشاذة أربع كلمات، ثلاث منها يجمعها رابط واحد، والرابعة خارجه. المطلوب ليس الكلمة الغريبة، بل الكلمة التي لا يشملها الرابط.','الطريقة: خذ كلمتين وابحث عن أدق رابط بينهما، ثم اختبره على الكلمتين الأخريين. إذا شمل ثلاثًا واستبعد واحدة فقد وجدت الجواب.'],
 rules:['ابحث عن الرابط الأدق لا الأعم: «حيوانات» تشمل الأسد والحصان معًا، أما «حيوانات مفترسة» فتفصل بينهما.','أشهر الروابط: الفئة (فواكه، معادن)، والوظيفة (أدوات كتابة)، والمكان (مدن سعودية)، والزمن (شهور هجرية)، والمعنى (مترادفات).','لاحظ نوع الكلمة: ثلاثة أفعال واسم، أو ثلاث صفات وفعل.','إذا وجدت رابطين محتملين فاختر الذي يترك كلمة واحدة فقط خارجه.','لا تختر الكلمة لأنها أطول أو أصعب؛ اختر بالرابط.'],
 ex:[['أسد ، نمر ، فهد ، حصان',['الكلمات الأربع حيوانات، وهذا رابط عام لا يفصل بينها.','الرابط الأدق: حيوانات مفترسة، يشمل الأسد والنمر والفهد.','الحصان خارج هذا الرابط.'],'حصان'],
  ['مثلث ، مربع ، دائرة ، مكعب',['الكلمات أشكال هندسية.','الرابط الأدق: أشكال مستوية لها بعدان.','المكعب مجسم له ثلاثة أبعاد.'],'مكعب'],
  ['محرم ، صفر ، رمضان ، مارس',['ثلاث كلمات شهور هجرية.','مارس شهر ميلادي.'],'مارس']],
 traps:['الاكتفاء برابط عام يشمل الكلمات الأربع.','اختيار الكلمة غير المألوفة بدل الكلمة الخارجة عن الرابط.','نسيان أن الرابط قد يكون في نوع الكلمة لا في معناها.']},
{t:'Odd word out (1): the common link',d:'Find the link that joins three words, and the fourth stands alone.',
 intro:['An odd-word-out question gives four words: three share one link and the fourth falls outside it. You are not looking for the strangest word, but for the word the link leaves out.','The method: take two words and find the most precise link between them, then test it on the other two. If it covers three words and leaves out one, you have your answer.'],
 rules:['Look for the most precise link, not the broadest: "animals" covers both lion and horse, while "predators" separates them.','The most common links: category (fruits, metals), function (writing tools), place (Saudi cities), time (Hijri months) and meaning (synonyms).','Notice word type: three verbs and a noun, or three adjectives and a verb.','If two links seem possible, choose the one that leaves exactly one word out.','Do not pick a word because it is longer or harder; decide by the link.'],
 ex:[['lion, tiger, leopard, horse',['All four are animals, a broad link that does not separate them.','The more precise link: predators, covering lion, tiger and leopard.','The horse falls outside it.'],'horse'],
  ['triangle, square, circle, cube',['All are geometric shapes.','The more precise link: flat, two-dimensional shapes.','A cube is a three-dimensional solid.'],'cube'],
  ['Muharram, Safar, Ramadan, March',['Three are Hijri months.','March is a Gregorian month.'],'March']],
 traps:['Settling for a broad link that covers all four words.','Choosing the unfamiliar word instead of the word outside the link.','Forgetting that the link may be in the word type, not its meaning.']},
{ar:[
 vOdA(['ذئب','ثعلب','ضبع','غزال'],3,'البقية حيوانات مفترسة، والغزال عاشب.'),
 vOdA(['مثلث','مربع','دائرة','مكعب'],3,'المكعب مجسم، والبقية أشكال مستوية.'),
 vOdA(['أبها','حائل','نجران','دبي'],3,'دبي ليست مدينة سعودية.'),
 vOdA(['حديد','رصاص','قصدير','زجاج'],3,'البقية معادن، والزجاج ليس معدنًا.'),
 vOdA(['قلم','مسطرة','ممحاة','وسادة'],3,'البقية أدوات مدرسية.'),
 vOdA(['البصر','السمع','الشم','التفكير'],3,'البقية حواس.'),
 vOdA(['محرم','صفر','رمضان','مارس'],3,'البقية شهور هجرية.'),
 vOdA(['النيل','الفرات','دجلة','الأطلسي'],3,'الأطلسي محيط، والبقية أنهار.'),
 vOdA(['كرة القدم','كرة السلة','الكرة الطائرة','الشطرنج'],3,'البقية رياضات جماعية تُلعب بالكرة.'),
 vOdA(['الربيع','الصيف','الخريف','المطر'],3,'البقية فصول السنة.'),
 vOdA(['سعيد','مسرور','فرِح','حزين'],3,'البقية بمعنى واحد.'),
 vOdA(['طبيب','مهندس','معلم','مستشفى'],3,'البقية مهن، والمستشفى مكان.'),
 vOdA(['الأحمر','الأزرق','الأصفر','الحديد'],3,'البقية ألوان.'),
 vOdA(['ثانية','دقيقة','ساعة','متر'],3,'البقية وحدات زمن.'),
 vOdA(['تمر','عنب','تين','بصل'],3,'البصل من الخضار، والبقية فواكه.'),
 vOdA(['قارب','سفينة','غواصة','طائرة'],3,'البقية وسائل نقل بحرية.')],
en:[
 vOdE(['wolf','fox','hyena','deer'],3,'The others are predators; the deer eats plants.'),
 vOdE(['triangle','square','circle','cube'],3,'A cube is a solid; the others are flat shapes.'),
 vOdE(['Abha','Hail','Najran','Dubai'],3,'Dubai is not a Saudi city.'),
 vOdE(['iron','lead','tin','glass'],3,'The others are metals; glass is not.'),
 vOdE(['pencil','ruler','eraser','pillow'],3,'The others are school supplies.'),
 vOdE(['sight','hearing','smell','thought'],3,'The others are senses.'),
 vOdE(['Muharram','Safar','Ramadan','March'],3,'The others are Hijri months.'),
 vOdE(['Nile','Euphrates','Tigris','Atlantic'],3,'The Atlantic is an ocean; the others are rivers.'),
 vOdE(['football','basketball','volleyball','chess'],3,'The others are team sports played with a ball.'),
 vOdE(['spring','summer','autumn','rain'],3,'The others are seasons.'),
 vOdE(['happy','glad','cheerful','sad'],3,'The others mean the same thing.'),
 vOdE(['doctor','engineer','teacher','hospital'],3,'The others are professions; a hospital is a place.'),
 vOdE(['red','blue','yellow','iron'],3,'The others are colors.'),
 vOdE(['second','minute','hour','meter'],3,'The others are units of time.'),
 vOdE(['date','grape','fig','onion'],3,'An onion is a vegetable; the others are fruits.'),
 vOdE(['boat','ship','submarine','airplane'],3,'The others travel by sea.')]});

FDV('v-od2','vod','odd','odd',
{t:'المفردة الشاذة (٢): الروابط الدقيقة',d:'حين تبدو الكلمات الأربع من فئة واحدة، يكون الرابط في تفصيل أدق.',
 intro:['في الأسئلة الأصعب تبدو الكلمات الأربع من فئة واحدة، فكلها حيوانات بحرية أو كلها مدن عربية. عندئذ يكون الرابط في تفصيل أدق: ثدييات لا أسماك، أو عواصم لا مدن.','اسأل نفسك عن كل كلمة: ما الذي يميزها؟ ثم ابحث عن الصفة التي تشترك فيها ثلاث كلمات فقط.'],
 rules:['انزل درجة في التصنيف: من «حيوان بحري» إلى «ثدييات بحرية»، ومن «مدينة» إلى «عاصمة».','افحص الوظيفة: أدوات تعمل، وشيء تعمل عليه الأدوات.','افحص الهدف: سلاح للهجوم وسلاح للدفاع.','الأعداد والأشكال لها روابط رياضية: أعداد أولية، أو مضلعات بأضلاع مستقيمة.','لا تعتمد على المظهر: الخفاش يطير لكنه ليس طائرًا، والحوت يسبح لكنه ليس سمكة.'],
 ex:[['الحوت ، الدلفين ، الفقمة ، القرش',['الأربعة تعيش في البحر، فهذا الرابط لا يكفي.','الرابط الأدق: ثدييات بحرية ترضع صغارها.','القرش سمكة.'],'القرش'],
  ['ثلاثة ، خمسة ، سبعة ، تسعة',['الأربعة أعداد فردية، فهذا الرابط لا يفصل بينها.','الرابط الأدق: أعداد أولية.','تسعة تقبل القسمة على ثلاثة، فليست أولية.'],'تسعة'],
  ['السيف ، الرمح ، الدرع ، السهم',['الأربعة من أدوات القتال.','الرابط الأدق: أسلحة للهجوم.','الدرع للحماية.'],'الدرع']],
 traps:['الوقوف عند الرابط الأول الواضح الذي يشمل الأربع.','الحكم بالمظهر: الطيران لا يجعل الكائن طائرًا.','نسيان الروابط الرياضية في الأعداد والأشكال.']},
{t:'Odd word out (2): finer links',d:'When all four words seem to belong to one category, the link lies in a finer detail.',
 intro:['In harder questions all four words seem to belong to one category: all are sea animals or all are Arab cities. The link then lies in a finer detail: mammals rather than fish, or capitals rather than cities.','Ask yourself what makes each word distinct, then look for the quality that exactly three words share.'],
 rules:['Go one level down in the category: from "sea animal" to "marine mammal," from "city" to "capital."','Check function: tools that work, and the object the tools work on.','Check purpose: weapons for attack and equipment for defense.','Numbers and shapes have mathematical links: prime numbers, or polygons with straight sides.','Do not rely on appearance: a bat flies but is not a bird, and a whale swims but is not a fish.'],
 ex:[['whale, dolphin, seal, shark',['All four live in the sea, so that link is not enough.','The finer link: marine mammals that nurse their young.','The shark is a fish.'],'shark'],
  ['three, five, seven, nine',['All four are odd numbers, so that link does not separate them.','The finer link: prime numbers.','Nine is divisible by three, so it is not prime.'],'nine'],
  ['sword, spear, shield, arrow',['All four are combat equipment.','The finer link: weapons for attack.','A shield is for protection.'],'shield']],
 traps:['Stopping at the first obvious link that covers all four.','Judging by appearance: flying does not make a creature a bird.','Forgetting mathematical links between numbers and shapes.']},
{ar:[
 vOdA(['شجاع','كريم','صادق','جبان'],3,'البقية صفات محمودة.'),
 vOdA(['يكتب','يقرأ','يرسم','كتاب'],3,'كتاب اسم، والبقية أفعال.'),
 vOdA(['قمح','شعير','ذرة','قطن'],3,'البقية حبوب يُصنع منها الطعام، والقطن ألياف.'),
 vOdA(['المطرقة','المنشار','المفك','المسمار'],3,'البقية أدوات يُعمل بها، والمسمار ما تعمل عليه الأدوات.'),
 vOdA(['دمشق','بغداد','القاهرة','الإسكندرية'],3,'البقية عواصم.'),
 vOdA(['عطارد','الزهرة','المريخ','القمر'],3,'البقية كواكب، والقمر تابع.'),
 vOdA(['يركض','يقفز','يسبح','ينام'],3,'البقية أنشطة حركية.'),
 vOdA(['الحوت','الدلفين','الفقمة','القرش'],3,'القرش سمكة، والبقية ثدييات بحرية.'),
 vOdA(['الخفاش','العصفور','الحمامة','الصقر'],0,'الخفاش من الثدييات، والبقية طيور.'),
 vOdA(['شمعة','مصباح','فانوس','مروحة'],3,'البقية أدوات للإضاءة.'),
 vOdA(['مثلث','خماسي','سداسي','دائرة'],3,'البقية مضلعات أضلاعها مستقيمة.'),
 vOdA(['ثلاثة','خمسة','سبعة','تسعة'],3,'البقية أعداد أولية.'),
 vOdA(['البحر الأحمر','الخليج العربي','بحر العرب','البحر الميت'],3,'البحر الميت بحيرة مغلقة، والبقية مسطحات متصلة بالمحيط.'),
 vOdA(['السيف','الرمح','الدرع','السهم'],2,'الدرع للحماية، والبقية أسلحة للهجوم.'),
 vOdA(['الحليب','الجبن','الزبادي','العصير'],3,'البقية من مشتقات الألبان.'),
 vOdA(['قاضٍ','محامٍ','محكمة','شاهد'],2,'البقية أشخاص في القضية، والمحكمة مكان.')],
en:[
 vOdE(['brave','generous','honest','cowardly'],3,'The others are praiseworthy qualities.'),
 vOdE(['write','read','draw','book'],3,'"book" is a noun; the others are verbs.'),
 vOdE(['wheat','barley','corn','cotton'],3,'The others are grains used for food; cotton is a fiber.'),
 vOdE(['hammer','saw','screwdriver','nail'],3,'The others are tools; a nail is what tools work on.'),
 vOdE(['Damascus','Baghdad','Cairo','Alexandria'],3,'The others are capitals.'),
 vOdE(['Mercury','Venus','Mars','Moon'],3,'The others are planets; the Moon is a satellite.'),
 vOdE(['run','jump','swim','sleep'],3,'The others are physical activities.'),
 vOdE(['whale','dolphin','seal','shark'],3,'The shark is a fish; the others are marine mammals.'),
 vOdE(['bat','sparrow','pigeon','falcon'],0,'The bat is a mammal; the others are birds.'),
 vOdE(['candle','lamp','lantern','fan'],3,'The others give light.'),
 vOdE(['triangle','pentagon','hexagon','circle'],3,'The others are polygons with straight sides.'),
 vOdE(['three','five','seven','nine'],3,'The others are prime numbers.'),
 vOdE(['Red Sea','Arabian Gulf','Arabian Sea','Dead Sea'],3,'The Dead Sea is a landlocked lake; the others connect to the ocean.'),
 vOdE(['sword','spear','shield','arrow'],2,'A shield is for protection; the others are weapons for attack.'),
 vOdE(['milk','cheese','yogurt','juice'],3,'The others are dairy products.'),
 vOdE(['judge','lawyer','court','witness'],2,'The others are people in a case; a court is a place.')]});

/* ---- unit: reading comprehension (15 new passages per language, V1–V15) ---- */
Object.assign(PASSAGES.ar,{
 V1:'كاد المها العربي أن ينقرض من البرية في القرن الماضي بسبب الصيد الجائر. ولم تُطوَ صفحته؛ إذ جُمعت أعداد قليلة منه في محميات، ورُبّيت حتى تكاثرت، ثم أُعيدت إلى بيئتها الطبيعية تحت الحماية. واليوم تُعدّ عودة المها مثالًا على أن الحماية المنظمة قادرة على إنقاذ الأنواع المهددة، بشرط أن تستمر الرقابة، لأن رفعها قبل أوانه قد يعيد الخطر من جديد.',
 V2:'أتاح العمل عن بُعد لكثير من الموظفين أن يؤدوا مهامهم من منازلهم، فوفّروا وقت التنقل وتكاليفه. غير أن هذا النمط لا يناسب الجميع؛ فبعضهم يفتقد التواصل المباشر مع زملائه، وبعضهم يجد صعوبة في الفصل بين وقت العمل ووقت الأسرة. ولذلك اتجهت مؤسسات كثيرة إلى نظام مختلط يجمع بين أيام في المكتب وأيام في المنزل.',
 V3:'يظن كثيرون أن كلمة المرور القوية هي التي تحتوي على رموز غريبة يصعب تذكرها، لكن خبراء الأمن الرقمي يرون أن الطول أهم من التعقيد. فعبارة طويلة من عدة كلمات لا رابط بينها أصعب على المخترقين من كلمة قصيرة مليئة بالرموز، وهي في الوقت نفسه أسهل على صاحبها في التذكر. ويضيف الخبراء أن استعمال كلمة المرور نفسها في أكثر من موقع أخطر من ضعفها.',
 V4:'يحدث الإجهاد الحراري حين يعجز الجسم عن التخلص من حرارته الزائدة، وغالبًا ما يصيب من يعملون أو يتمرنون تحت الشمس في الصيف. ومن علاماته الصداع والدوار والتعرق الشديد. والوقاية منه بسيطة: شرب الماء بانتظام قبل الشعور بالعطش، وارتداء ملابس فاتحة واسعة، وتجنب الجهد البدني في ساعات الظهيرة.',
 V5:'قبل أكثر من ألفي عام كانت القوافل تقطع جنوب الجزيرة العربية وغربها حاملةً اللبان والمرّ إلى أسواق الشام ومصر. وقد عُرف هذا الطريق بطريق البخور، ونشأت على امتداده مدن ومحطات ازدهرت بفضل التجارة، يتزود فيها المسافرون بالماء والطعام. ولما تحولت التجارة إلى البحر تراجعت أهمية الطريق، فخفت بريق كثير من تلك المدن.',
 V6:'تشتهر منطقة جازان بزراعة البن الخولاني في مدرجات جبلية تُبنى على سفوح الجبال لحفظ التربة والمياه. ويتوارث المزارعون أسرار هذه الزراعة جيلًا بعد جيل، من اختيار الشتلات إلى قطف الثمار يدويًا. وقد أُدرجت المعارف المرتبطة بالبن الخولاني في قائمة اليونسكو للتراث الثقافي غير المادي، تقديرًا لقيمتها الثقافية والاقتصادية.',
 V7:'قبل اختراع الطباعة كانت الكتب تُنسخ باليد، فيستغرق نسخ الكتاب الواحد شهورًا، ويبقى ثمنه مرتفعًا لا يقدر عليه إلا القليل. وحين ظهرت الطباعة بالحروف المتحركة في القرن الخامس عشر صار ممكنًا إنتاج مئات النسخ في وقت قصير، فانخفضت الأسعار وانتشرت المعرفة بين الناس. ولم يقتصر أثرها على الكتب، بل أسهمت في توحيد الإملاء وانتشار الأفكار الجديدة.',
 V8:'ليست الألعاب الإلكترونية شرًّا كلها؛ فبعضها ينمّي سرعة الاستجابة ومهارة حل المشكلات. لكن المشكلة تبدأ حين تطول ساعات اللعب على حساب النوم والدراسة والحركة. ولهذا ينصح المختصون الأسر بأن تضع حدودًا واضحة لوقت اللعب، وأن تختار ألعابًا تناسب عمر الطفل، وأن تشاركه أحيانًا في اللعب بدل الاكتفاء بالمنع.',
 V9:'تدور حول الأرض آلاف الأقمار الصناعية التي لا نراها، لكنها حاضرة في تفاصيل يومنا. فهي تنقل البث والاتصالات، وتحدد مواقعنا عبر الخرائط، وترصد السحب لتساعد على التنبؤ بالطقس. غير أن كثرتها أوجدت مشكلة جديدة هي الحطام الفضائي، أي بقايا أقمار تعطلت وصواريخ مستهلكة تدور في الفضاء وتهدد الأقمار العاملة بالاصطدام.',
 V10:'يخاف كثير من الطلاب من الخطأ، فيتجنبون المسائل الصعبة حتى لا يفشلوا فيها. لكن الدراسات تشير إلى أن الخطأ إذا رافقه تفكير في سببه يرسّخ التعلم أكثر من الإجابة الصحيحة السهلة. فالطالب الذي يحلل خطأه ويفهم من أين جاء يقل احتمال تكراره له، بخلاف من يكتفي بمعرفة الإجابة الصحيحة ثم يمضي.',
 V11:'تقل الأنهار الدائمة في المملكة، فاعتمدت منذ عقود على تحلية مياه البحر لتوفير مياه الشرب للمدن. وتقوم التحلية على فصل الأملاح عن الماء، إما بتبخيره ثم تكثيفه، وإما بدفعه عبر أغشية دقيقة تحجز الأملاح. وتستهلك هذه العملية طاقة كبيرة، ولذلك يُعمل على ربط محطاتها بمصادر الطاقة المتجددة لخفض كلفتها وأثرها في البيئة.',
 V12:'عرف أهل الجزيرة العربية الصقارة منذ قرون، فكانوا يدرّبون الصقور على الصيد في الصحراء. ويحتاج تدريب الصقر إلى صبر طويل، إذ يبدأ الصقار بتعويده على وجوده وصوته، ثم يدربه على العودة إليه حين يناديه. ولم تبق الصقارة وسيلة للصيد فقط، بل صارت تراثًا ورياضة تُقام لها المسابقات والمهرجانات.',
 V13:'تطورت الترجمة الآلية تطورًا كبيرًا، فصارت تنقل النصوص البسيطة بدقة مقبولة في ثوانٍ. لكنها ما زالت تتعثر في الأمثال والتعابير المجازية، لأنها تميل إلى ترجمة الكلمات حرفيًا بعيدًا عن معناها الثقافي. ولهذا يرى المترجمون أن الآلة أداة مفيدة تسرّع العمل، وأن النص المهم يحتاج دائمًا إلى مراجعة إنسان يفهم اللغتين وثقافتيهما.',
 V14:'تتكون قشرة الأرض من صفائح ضخمة تتحرك ببطء شديد، فإذا احتكت حواف صفيحتين وتراكم الضغط بينهما ثم تحرر فجأة، اهتزت الأرض. ويقيس العلماء قوة الزلزال بمقاييس تعتمد على الطاقة المنطلقة منه، وكل درجة إضافية في المقياس تعني طاقة أكبر بكثير من الدرجة التي قبلها. ولا يمكن حتى اليوم التنبؤ بموعد الزلزال بدقة، لكن البناء المقاوم يقلل خسائره.',
 V15:'يحصل كثير من الشباب على أول دخل لهم من مكافأة أو عمل جزئي، فينفقونه كله في أيام. ويرى مختصو المال أن عادة الادخار تُبنى في هذه السن تحديدًا؛ فمن يقتطع جزءًا ثابتًا من دخله فور استلامه، ولو كان صغيرًا، يعتاد ذلك حتى يصير جزءًا من حياته. والسر في رأيهم أن يُدَّخر المبلغ أولًا ثم يُنفق الباقي، لا العكس.'
});
Object.assign(PASSAGES.en,{
 V1:'The Arabian oryx almost disappeared from the wild in the last century because of overhunting. Its story did not end there: a small number were gathered in reserves and bred until they multiplied, then returned to their natural habitat under protection. Today the oryx\'s return is an example of how organized protection can save endangered species, provided monitoring continues, because lifting it too early could bring the danger back.',
 V2:'Remote work has allowed many employees to do their jobs from home, saving the time and cost of commuting. However, this way of working does not suit everyone: some miss direct contact with their colleagues, and some find it hard to separate work time from family time. For this reason, many organizations have moved to a hybrid model that combines days in the office with days at home.',
 V3:'Many people think a strong password is one full of strange symbols that is hard to remember, but digital security experts believe length matters more than complexity. A long phrase made of several unrelated words is harder for attackers than a short word full of symbols, and it is also easier for its owner to remember. The experts add that using the same password on more than one site is more dangerous than using a weak one.',
 V4:'Heat exhaustion happens when the body cannot get rid of its excess heat, and it often affects people who work or exercise in the sun in summer. Its signs include headache, dizziness and heavy sweating. Preventing it is simple: drink water regularly before you feel thirsty, wear light, loose clothing, and avoid physical effort around midday.',
 V5:'More than two thousand years ago, caravans crossed the south and west of the Arabian Peninsula carrying frankincense and myrrh to the markets of the Levant and Egypt. This route became known as the Incense Road, and along it grew towns and stations that flourished through trade, where travelers stocked up on water and food. When trade moved to the sea, the road lost its importance, and many of those towns faded.',
 V6:'The Jazan region is known for growing Khawlani coffee on mountain terraces built into the slopes to keep soil and water in place. Farmers pass down the secrets of this farming from one generation to the next, from choosing seedlings to picking the beans by hand. The knowledge connected with Khawlani coffee has been added to UNESCO\'s list of intangible cultural heritage, in recognition of its cultural and economic value.',
 V7:'Before printing was invented, books were copied by hand, so copying a single book took months and its price stayed so high that few could afford it. When printing with movable type appeared in the fifteenth century, it became possible to produce hundreds of copies in a short time, so prices fell and knowledge spread among people. Its effect went beyond books: it also helped standardize spelling and spread new ideas.',
 V8:'Video games are not all bad; some build quick reactions and problem-solving skills. The trouble starts when playing time grows at the expense of sleep, study and physical activity. That is why specialists advise families to set clear limits on playing time, choose games that suit the child\'s age, and sometimes play together with the child rather than simply forbidding games.',
 V9:'Thousands of satellites we never see circle the Earth, yet they are part of the details of our day. They carry broadcasts and communications, find our location on maps, and track clouds to help forecast the weather. But their large numbers have created a new problem: space debris, the remains of broken satellites and spent rockets that orbit in space and threaten working satellites with collisions.',
 V10:'Many students fear making mistakes, so they avoid difficult problems to avoid failing at them. Yet studies suggest that a mistake, when followed by thinking about its cause, fixes learning more firmly than an easy correct answer. A student who analyzes a mistake and understands where it came from is less likely to repeat it, unlike one who simply notes the right answer and moves on.',
 V11:'Saudi Arabia has few permanent rivers, so for decades it has relied on seawater desalination to supply its cities with drinking water. Desalination separates salt from water, either by evaporating the water and condensing it, or by pushing it through fine membranes that hold the salt back. The process uses a great deal of energy, which is why efforts are under way to link desalination plants to renewable energy sources to cut their cost and environmental impact.',
 V12:'People of the Arabian Peninsula have practiced falconry for centuries, training falcons to hunt in the desert. Training a falcon takes long patience: the falconer begins by getting it used to his presence and voice, then trains it to return to him when he calls. Falconry is no longer only a way of hunting; it has become a heritage and a sport with its own competitions and festivals.',
 V13:'Machine translation has improved greatly and can now render simple texts with acceptable accuracy in seconds. However, it still stumbles over proverbs and figurative expressions, because it tends to translate words literally, away from their cultural meaning. That is why translators see the machine as a useful tool that speeds up their work, while an important text always needs review by a person who understands both languages and both cultures.',
 V14:'The Earth\'s crust is made of huge plates that move very slowly. When the edges of two plates grind against each other and pressure builds up between them before being released suddenly, the ground shakes. Scientists measure an earthquake\'s strength on scales based on the energy it releases, and each extra point on the scale means far more energy than the point before. Even today, the timing of an earthquake cannot be predicted precisely, but earthquake-resistant building reduces its losses.',
 V15:'Many young people receive their first income from an allowance or a part-time job and spend all of it within days. Finance specialists believe the saving habit is built at exactly this age: someone who sets aside a fixed share of his income as soon as he receives it, however small, gets used to it until it becomes part of his life. The secret, in their view, is to save first and then spend the rest, not the other way round.'
});

FDV('v-re1','vre','reading','reading',
{t:'استيعاب المقروء (١): الفكرة الرئيسة والعنوان',d:'الفكرة التي تجمع النص كله، لا تفصيلًا لافتًا في جملة منه.',
 intro:['أكثر أسئلة القطعة تكرارًا: ما الفكرة الرئيسة؟ ما أنسب عنوان؟ ما غرض الكاتب؟ وكلها تسأل عن الشيء نفسه تقريبًا: ما الذي يدور حوله النص كله؟','الخطأ الشائع أن يختار الطالب تفصيلًا لافتًا ورد في جملة واحدة. الفكرة الرئيسة تشمل النص كله، ولا تكون أوسع منه ولا أضيق.'],
 rules:['اقرأ الجملة الأولى والأخيرة بعناية؛ فالفكرة الرئيسة تكون فيهما غالبًا.','اختبر كل خيار: هل يشمل كل فقرات النص؟ إذا غطى جزءًا فقط فهو تفصيل.','استبعد الخيار الأوسع من النص: «تاريخ التجارة في العالم» أوسع من نص عن طريق البخور.','العنوان الجيد قصير ويعبر عن الفكرة الرئيسة، لا عن مثال ورد في النص.','غرض الكاتب يُعرف من أسلوبه: هل يشرح، أم يحذّر، أم يقارن، أم يقترح حلًا؟'],
 ex:[['نص عن عودة المها العربي إلى البرية. ما الفكرة الرئيسة؟ الخيارات: نجاح الحماية المنظمة في إنقاذ المها ، أسباب الصيد الجائر ، أماكن المحميات في المملكة ، شكل المها العربي',['النص يبدأ بخطر الانقراض، ثم يشرح خطة الإنقاذ، ثم يقدّمها مثالًا ناجحًا.','«أسباب الصيد» تفصيل في الجملة الأولى فقط.','«أماكن المحميات» و«شكل المها» لم يتحدث عنهما النص.'],'نجاح الحماية المنظمة في إنقاذ المها'],
  ['نص عن العمل عن بُعد. أنسب عنوان: العمل عن بُعد بين المزايا والصعوبات ، توفير تكاليف التنقل ، تاريخ المكاتب ، أدوات الاتصال الحديثة',['النص يذكر الميزة ثم الصعوبات ثم الحل المختلط.','«توفير تكاليف التنقل» ميزة واحدة فقط.','العنوان الأول يشمل النص كله.'],'العمل عن بُعد بين المزايا والصعوبات'],
  ['نص عن الإجهاد الحراري ينتهي بطرق الوقاية. ما غرض الكاتب؟ الخيارات: التوعية بالإجهاد الحراري وطرق الوقاية منه ، وصف فصل الصيف ، مدح الرياضة ، الحديث عن أنواع الملابس',['النص يعرّف الحالة ثم علاماتها ثم الوقاية منها.','أسلوبه توعوي يوجه القارئ إلى ما يفعله.'],'التوعية بالإجهاد الحراري وطرق الوقاية منه']],
 traps:['اختيار تفصيل لافت ورد في جملة واحدة.','اختيار خيار أوسع من النص لأنه يبدو شاملًا.','الاعتماد على معلوماتك العامة بدل ما في النص.']},
{t:'Reading comprehension (1): main idea and title',d:'The idea that covers the whole passage, not a striking detail from one sentence.',
 intro:['The most common passage questions are: What is the main idea? What is the best title? What is the author\'s purpose? They all ask much the same thing: what is the whole passage about?','The common mistake is choosing a striking detail from a single sentence. The main idea covers the whole passage, and it is neither broader nor narrower than the passage.'],
 rules:['Read the first and last sentences carefully; the main idea usually appears there.','Test each option: does it cover every part of the passage? If it covers only part, it is a detail.','Rule out options broader than the passage: "the history of world trade" is broader than a passage about the Incense Road.','A good title is short and expresses the main idea, not an example mentioned in the passage.','The author\'s purpose shows in the style: is he explaining, warning, comparing or proposing a solution?'],
 ex:[['A passage about the Arabian oryx\'s return to the wild. What is the main idea? Options: how organized protection saved the oryx, the causes of overhunting, where Saudi reserves are located, what the oryx looks like',['The passage starts with the threat of extinction, explains the rescue plan, then presents it as a success.','"the causes of overhunting" is a detail in the first sentence only.','The passage says nothing about the reserves\' locations or the oryx\'s appearance.'],'how organized protection saved the oryx'],
  ['A passage about remote work. The best title: Remote Work: Benefits and Challenges, Saving Commuting Costs, The History of Offices, Modern Communication Tools',['The passage gives the benefit, then the difficulties, then the hybrid solution.','"Saving Commuting Costs" is only one benefit.','The first title covers the whole passage.'],'Remote Work: Benefits and Challenges'],
  ['A passage about heat exhaustion that ends with ways to prevent it. What is the author\'s purpose? Options: to raise awareness of heat exhaustion and how to prevent it, to describe summer, to praise sport, to discuss types of clothing',['The passage defines the condition, then its signs, then its prevention.','Its style is informative and tells the reader what to do.'],'to raise awareness of heat exhaustion and how to prevent it']],
 traps:['Choosing a striking detail from a single sentence.','Choosing an option broader than the passage because it sounds complete.','Relying on your general knowledge instead of the passage.']},
{ar:[
 vRe('V1','الفكرة الرئيسة للنص:',['نجاح الحماية المنظمة في إنقاذ المها العربي','أسباب الصيد الجائر في القرن الماضي','أماكن المحميات في المملكة','الصفات الجسدية للمها العربي'],'النص كله عن إنقاذ المها بالحماية المنظمة.'),
 vRe('V1','أنسب عنوان للنص:',['المها العربي: من حافة الانقراض إلى البرية','الصيد في الجزيرة العربية','الحيوانات الأليفة','الحياة في الصحراء'],'العنوان الأول يجمع بداية النص ونهايته.'),
 vRe('V1','يشترط الكاتب لاستمرار نجاح التجربة:',['استمرار الرقابة','زيادة الصيد المنظم','نقل المها إلى بلاد أخرى','بناء محميات جديدة كل عام'],'«بشرط أن تستمر الرقابة».'),
 vRe('V1','غرض الكاتب من النص:',['عرض تجربة ناجحة في حماية الأنواع المهددة','الدعوة إلى صيد المها','وصف الصحراء العربية','المقارنة بين المها والغزال'],'يقدّم عودة المها مثالًا ناجحًا.'),
 vRe('V2','الفكرة الرئيسة للنص:',['مزايا العمل عن بُعد وصعوباته والحل الذي اتجهت إليه المؤسسات','تكاليف التنقل إلى العمل','أهمية الأسرة في حياة الموظف','طرق التواصل بين الزملاء'],'النص يعرض الميزة ثم الصعوبات ثم النظام المختلط.'),
 vRe('V2','أنسب عنوان للنص:',['العمل عن بُعد بين المزايا والصعوبات','وقت الأسرة','زحام الطرق','الموظف المثالي'],'العنوان الأول يشمل النص كله.'),
 vRe('V2','من الصعوبات التي ذكرها النص:',['صعوبة الفصل بين وقت العمل ووقت الأسرة','ارتفاع تكاليف التنقل','قلة الأجهزة','طول ساعات المكتب'],'«يجد صعوبة في الفصل بين وقت العمل ووقت الأسرة».'),
 vRe('V2','النظام المختلط في النص هو:',['الجمع بين أيام في المكتب وأيام في المنزل','العمل ليلًا ونهارًا','العمل في مؤسستين','العمل بلا ساعات محددة'],'نص صريح في الجملة الأخيرة.'),
 vRe('V3','الفكرة الرئيسة للنص:',['قوة كلمة المرور في طولها وفي عدم تكرارها','صعوبة تذكر الرموز','أنواع المخترقين','تاريخ الأمن الرقمي'],'النص يقدّم الطول على التعقيد ويحذّر من التكرار.'),
 vRe('V3','أنسب عنوان للنص:',['كلمة مرور قوية: الطول أولًا','رموز غريبة','المواقع الإلكترونية','ذاكرة الإنسان'],'العنوان الأول يعبر عن الفكرة المركزية.'),
 vRe('V3','يرى الخبراء أن الأخطر من ضعف كلمة المرور:',['استعمالها في أكثر من موقع','كتابتها بحروف صغيرة','تغييرها كثيرًا','طولها الزائد'],'نص صريح في الجملة الأخيرة.'),
 vRe('V3','غرض الكاتب:',['تصحيح اعتقاد شائع وتقديم نصيحة عملية','مدح المخترقين','الإعلان عن موقع','شرح طريقة عمل الحاسوب'],'يبدأ بـ«يظن كثيرون» ثم يصحح ويرشد.'),
 vRe('V4','الفكرة الرئيسة للنص:',['التعريف بالإجهاد الحراري وعلاماته وطرق الوقاية منه','فوائد الرياضة في الصيف','أنواع الملابس الصيفية','أسباب الصداع'],'النص تعريف ثم علامات ثم وقاية.'),
 vRe('V4','أنسب عنوان للنص:',['الإجهاد الحراري: كيف تقي نفسك','الشمس مصدر الطاقة','الماء والحياة','الرياضة اليومية'],'العنوان الأول يجمع موضوع النص وغرضه.'),
 vRe('V4','ينصح النص بشرب الماء:',['بانتظام قبل الشعور بالعطش','عند الشعور بالعطش فقط','بعد الظهيرة','مرة واحدة في اليوم'],'«شرب الماء بانتظام قبل الشعور بالعطش».'),
 vRe('V4','أسلوب النص:',['توعوي إرشادي','قصصي','ساخر','حواري'],'يعرّف القارئ بالمشكلة ويرشده إلى ما يفعله.'),
 vRe('V5','الفكرة الرئيسة للنص:',['نشأة طريق البخور وازدهاره ثم تراجعه','أنواع البخور','تاريخ مصر','طرق التجارة البحرية الحديثة'],'النص يتتبع الطريق من نشأته إلى تراجعه.'),
 vRe('V5','أنسب عنوان للنص:',['طريق البخور: تجارة صنعت مدنًا','اللبان والمرّ','البحر','قوافل اليوم'],'العنوان الأول يجمع الطريق وأثره في المدن.'),
 vRe('V5','سبب تراجع أهمية الطريق:',['تحول التجارة إلى البحر','نفاد اللبان','قلة الماء في المحطات','كثرة المدن'],'«لما تحولت التجارة إلى البحر تراجعت أهمية الطريق».'),
 vRe('V5','ازدهرت المدن على الطريق بفضل:',['التجارة','الزراعة','الصناعة','التعدين'],'«ازدهرت بفضل التجارة».')],
en:[
 vRe('V1','The main idea of the passage is:',['how organized protection saved the Arabian oryx','the causes of overhunting last century','where Saudi reserves are located','the physical features of the oryx'],'The whole passage is about saving the oryx through organized protection.'),
 vRe('V1','The best title for the passage is:',['The Arabian Oryx: From the Edge of Extinction Back to the Wild','Hunting in Arabia','Pets','Life in the Desert'],'The first title covers both the beginning and the end of the passage.'),
 vRe('V1','For the success to last, the author says it is necessary that:',['monitoring continues','controlled hunting increases','the oryx is moved abroad','new reserves are built every year'],'"provided monitoring continues."'),
 vRe('V1','The author\'s purpose is to:',['present a successful example of protecting endangered species','encourage hunting the oryx','describe the Arabian desert','compare the oryx with the gazelle'],'He presents the oryx\'s return as a successful example.'),
 vRe('V2','The main idea of the passage is:',['the benefits and difficulties of remote work, and the solution organizations adopted','the cost of commuting','the importance of family to employees','ways colleagues communicate'],'The passage gives the benefit, then the difficulties, then the hybrid model.'),
 vRe('V2','The best title for the passage is:',['Remote Work: Benefits and Challenges','Family Time','Traffic Jams','The Ideal Employee'],'The first title covers the whole passage.'),
 vRe('V2','One difficulty the passage mentions is:',['separating work time from family time','high commuting costs','a shortage of devices','long office hours'],'"find it hard to separate work time from family time."'),
 vRe('V2','The hybrid model in the passage means:',['combining days in the office with days at home','working day and night','working for two organizations','working without set hours'],'Stated directly in the last sentence.'),
 vRe('V3','The main idea of the passage is:',['a password is strong when it is long and not reused','symbols are hard to remember','types of attackers','the history of digital security'],'The passage puts length before complexity and warns against reuse.'),
 vRe('V3','The best title for the passage is:',['A Strong Password: Length First','Strange Symbols','Websites','Human Memory'],'The first title states the central idea.'),
 vRe('V3','According to the experts, what is more dangerous than a weak password?',['using it on more than one site','writing it in lowercase','changing it often','making it too long'],'Stated directly in the last sentence.'),
 vRe('V3','The author\'s purpose is to:',['correct a common belief and give practical advice','praise attackers','advertise a website','explain how computers work'],'He opens with "Many people think," then corrects and advises.'),
 vRe('V4','The main idea of the passage is:',['what heat exhaustion is, its signs and how to prevent it','the benefits of sport in summer','types of summer clothing','the causes of headaches'],'The passage gives a definition, then signs, then prevention.'),
 vRe('V4','The best title for the passage is:',['Heat Exhaustion: How to Protect Yourself','The Sun as a Source of Energy','Water and Life','Daily Exercise'],'The first title combines the topic and the purpose.'),
 vRe('V4','The passage advises drinking water:',['regularly, before you feel thirsty','only when thirsty','in the afternoon','once a day'],'"drink water regularly before you feel thirsty."'),
 vRe('V4','The style of the passage is:',['informative and advisory','narrative','sarcastic','a dialogue'],'It explains the problem and tells the reader what to do.'),
 vRe('V5','The main idea of the passage is:',['how the Incense Road arose, flourished and declined','types of incense','the history of Egypt','modern sea trade routes'],'The passage follows the road from its rise to its decline.'),
 vRe('V5','The best title for the passage is:',['The Incense Road: Trade That Built Towns','Frankincense and Myrrh','The Sea','Today\'s Caravans'],'The first title combines the road and its effect on the towns.'),
 vRe('V5','Why did the road lose its importance?',['trade moved to the sea','frankincense ran out','the stations ran short of water','there were too many towns'],'"When trade moved to the sea, the road lost its importance."'),
 vRe('V5','The towns along the road flourished thanks to:',['trade','farming','industry','mining'],'"flourished through trade."')]});

FDV('v-re2','vre','reading','reading',
{t:'استيعاب المقروء (٢): التفاصيل والإحالة ومعنى الكلمة',d:'الجواب مكتوب في النص؛ مهارتك أن تجده بسرعة وتطابقه بدقة.',
 intro:['أسئلة التفاصيل والإحالة ومعنى الكلمة جوابها مكتوب في النص، لكن الخيارات الخاطئة تُصاغ بكلمات من النص نفسه لتخدعك. المهارة هنا: أن تعود إلى الموضع الصحيح وتقرأه بدقة.','وسؤال الإحالة يسأل: إلى ماذا يعود الضمير؟ أما سؤال معنى الكلمة فيسأل عن معناها في هذا السياق، لا عن معناها في المعجم.'],
 rules:['حدد الكلمة المفتاحية في السؤال، ثم ابحث عنها أو عن مرادفها في النص.','اقرأ الجملة التي فيها الجواب وما قبلها وما بعدها، ولا تكتفِ بكلمة واحدة.','في الإحالة: ضع كل خيار مكان الضمير، فالذي يستقيم به المعنى هو المقصود.','في معنى الكلمة: ضع الخيار مكان الكلمة في الجملة؛ الخيار الذي يحفظ المعنى هو الجواب.','سؤال «لم يذكر النص»: ابحث عن كل خيار في النص، والخيار الذي لا تجده هو الجواب.'],
 ex:[['في نص الطباعة: «فانخفضت الأسعار وانتشرت المعرفة». سبب انخفاض الأسعار: إنتاج مئات النسخ في وقت قصير ، توحيد الإملاء ، النسخ باليد ، قلة القراء',['نعود إلى الجملة: الطباعة جعلت إنتاج مئات النسخ ممكنًا.','ثم جاءت «فانخفضت الأسعار» نتيجة لذلك.'],'إنتاج مئات النسخ في وقت قصير'],
  ['في نص الألعاب: «وأن تشاركه أحيانًا في اللعب». الضمير في «تشاركه» يعود إلى: الطفل ، المختص ، الوقت ، اللعب',['نضع كل خيار مكان الضمير.','«أن تشارك الأسرة الطفل في اللعب» هي التي يستقيم بها المعنى.'],'الطفل'],
  ['في نص الأقمار الصناعية: «صواريخ مستهلكة». معنى «مستهلكة»: انتهى استعمالها ، جديدة ، باهظة ، سريعة',['السياق يتحدث عن بقايا وحطام.','«انتهى استعمالها» تحفظ المعنى حين نضعها مكان الكلمة.'],'انتهى استعمالها']],
 traps:['اختيار خيار فيه كلمات من النص لكنه يغيّر المعنى.','الإجابة من الذاكرة دون العودة إلى النص.','أخذ المعنى المعجمي للكلمة وإهمال سياقها.']},
{t:'Reading comprehension (2): details, reference and word meaning',d:'The answer is written in the passage; your skill is finding it quickly and matching it exactly.',
 intro:['Questions on details, reference and word meaning have their answers written in the passage, but wrong options are worded with the passage\'s own words to trick you. The skill is going back to the right spot and reading it carefully.','A reference question asks what a pronoun refers to. A word-meaning question asks what a word means in this context, not its dictionary meaning.'],
 rules:['Find the key word in the question, then look for it or its synonym in the passage.','Read the sentence with the answer, plus the one before and after; do not settle for a single word.','For reference questions, put each option in place of the pronoun; the one that makes sense is the answer.','For word meaning, put the option in place of the word; the one that keeps the meaning is the answer.','For "not mentioned" questions, look for each option in the passage; the one you cannot find is the answer.'],
 ex:[['In the printing passage: "so prices fell and knowledge spread." Why did prices fall? Options: hundreds of copies could be produced quickly, spelling was standardized, books were copied by hand, there were few readers',['Go back to the sentence: printing made producing hundreds of copies possible.','"So prices fell" follows as the result.'],'hundreds of copies could be produced quickly'],
  ['In the video games passage: "specialists advise families to... sometimes play together with the child." Who should play with the child? Options: the family, the specialist, the teacher, other children',['Find who the advice is addressed to: "specialists advise families."','Put each option in the sentence; "families... play together with the child" is the reading that makes sense.'],'the family'],
  ['In the satellites passage: "spent rockets." "Spent" means: used up, new, expensive, fast',['The context is about remains and debris.','"used up" keeps the meaning when it replaces the word.'],'used up']],
 traps:['Choosing an option that uses words from the passage but changes the meaning.','Answering from memory instead of going back to the passage.','Taking a word\'s dictionary meaning and ignoring its context.']},
{ar:[
 vRe('V6','تُبنى المدرجات الجبلية لزراعة البن من أجل:',['حفظ التربة والمياه','تسهيل وصول السيارات','زيادة الظل','منع الطيور'],'«لحفظ التربة والمياه».'),
 vRe('V6','كيف تُقطف ثمار البن الخولاني حسب النص؟',['يدويًا','بالآلات','بالحيوانات','لا يذكر النص ذلك'],'«إلى قطف الثمار يدويًا».'),
 vRe('V6','الضمير في «قيمتها» في الجملة الأخيرة يعود إلى:',['المعارف المرتبطة بالبن الخولاني','قائمة اليونسكو','منطقة جازان','الشتلات'],'أُدرجت المعارف تقديرًا لقيمتها.'),
 vRe('V6','معنى «يتوارث» في النص:',['ينقل كل جيل إلى الجيل الذي بعده','يبيع','ينسى','يكتب في كتب'],'السياق: «جيلًا بعد جيل».'),
 vRe('V7','كم كان يستغرق نسخ الكتاب الواحد باليد؟',['شهورًا','أيامًا','ساعات','سنوات طويلة'],'«يستغرق نسخ الكتاب الواحد شهورًا».'),
 vRe('V7','لم يذكر النص من آثار الطباعة:',['اختراع الورق','انخفاض أسعار الكتب','توحيد الإملاء','انتشار الأفكار الجديدة'],'الورق لم يُذكر في النص.'),
 vRe('V7','الضمير في «أثرها» يعود إلى:',['الطباعة','الكتب','الأسعار','المعرفة'],'«ولم يقتصر أثرها» أي أثر الطباعة.'),
 vRe('V7','معنى «لا يقدر عليه إلا القليل»:',['لا يستطيع شراءه إلا عدد قليل','لا يقرؤه إلا القليل','لا يفهمه إلا القليل','لا يكتبه إلا القليل'],'السياق عن ارتفاع الثمن.'),
 vRe('V8','ذكر النص من فوائد بعض الألعاب:',['تنمية سرعة الاستجابة','زيادة ساعات النوم','تحسين الخط','تقوية البصر'],'«ينمّي سرعة الاستجابة ومهارة حل المشكلات».'),
 vRe('V8','تبدأ المشكلة حسب النص حين:',['تطول ساعات اللعب على حساب النوم والدراسة','يلعب الطفل مع أسرته','يختار ألعابًا مناسبة لعمره','يحل المشكلات'],'نص صريح في الجملة الثانية.'),
 vRe('V8','الضمير في «تشاركه» يعود إلى:',['الطفل','المختص','الوقت','اللعب'],'الأسرة تشارك الطفل في اللعب.'),
 vRe('V8','لم ينصح النص الأسر بـ:',['المنع التام للألعاب','وضع حدود لوقت اللعب','اختيار ألعاب تناسب العمر','مشاركة الطفل في اللعب أحيانًا'],'النص ينصح بالمشاركة «بدل الاكتفاء بالمنع».'),
 vRe('V9','من وظائف الأقمار الصناعية المذكورة:',['المساعدة على التنبؤ بالطقس','إنتاج الكهرباء للمنازل','تنظيف الفضاء','قياس الزلازل'],'«ترصد السحب لتساعد على التنبؤ بالطقس».'),
 vRe('V9','الحطام الفضائي حسب النص:',['بقايا أقمار تعطلت وصواريخ مستهلكة','غبار النجوم','أقمار صناعية جديدة','نيازك تسقط على الأرض'],'تعريف صريح في النص.'),
 vRe('V9','معنى «مستهلكة» في النص:',['انتهى استعمالها','جديدة','باهظة','سريعة'],'السياق عن البقايا والحطام.'),
 vRe('V9','الضمير في «كثرتها» يعود إلى:',['الأقمار الصناعية','السحب','الخرائط','الصواريخ'],'كثرة الأقمار أوجدت مشكلة الحطام.'),
 vRe('V10','يرسّخ الخطأ التعلم حسب النص إذا:',['رافقه تفكير في سببه','تكرر كثيرًا','تجاهله الطالب','كان في مسألة سهلة'],'«إذا رافقه تفكير في سببه».'),
 vRe('V10','لماذا يتجنب بعض الطلاب المسائل الصعبة؟',['خوفًا من الفشل فيها','لأنها طويلة','لأنها غير مهمة','لأن وقتها قصير'],'«حتى لا يفشلوا فيها».'),
 vRe('V10','الضمير في «تكراره» يعود إلى:',['الخطأ','الطالب','السبب','التعلم'],'يقل احتمال تكرار الخطأ.'),
 vRe('V10','معنى «يرسّخ» في النص:',['يثبّت','يضعف','يؤخر','يغيّر'],'السياق: الخطأ المدروس يثبّت التعلم.')],
en:[
 vRe('V6','Mountain terraces for coffee are built in order to:',['keep soil and water in place','make access easier for cars','provide more shade','keep birds away'],'"to keep soil and water in place."'),
 vRe('V6','According to the passage, how are Khawlani coffee beans picked?',['by hand','by machine','by animals','the passage does not say'],'"picking the beans by hand."'),
 vRe('V6','In the last sentence, "its" in "its cultural and economic value" refers to:',['the knowledge connected with Khawlani coffee','UNESCO\'s list','the Jazan region','the seedlings'],'The knowledge was listed in recognition of its value.'),
 vRe('V6','"Pass down" in the passage means:',['hand on from one generation to the next','sell','forget','write in books'],'The context: "from one generation to the next."'),
 vRe('V7','How long did copying a single book by hand take?',['months','days','hours','many years'],'"copying a single book took months."'),
 vRe('V7','Which effect of printing is NOT mentioned?',['the invention of paper','lower book prices','standardized spelling','the spread of new ideas'],'Paper is not mentioned in the passage.'),
 vRe('V7','"Its" in "Its effect went beyond books" refers to:',['printing','books','prices','knowledge'],'The effect of printing.'),
 vRe('V7','"few could afford it" means:',['only a few people could pay for it','only a few could read it','only a few understood it','only a few could write it'],'The context is about the high price.'),
 vRe('V8','One benefit of some games mentioned is:',['building quick reactions','more hours of sleep','better handwriting','stronger eyesight'],'"some build quick reactions and problem-solving skills."'),
 vRe('V8','According to the passage, the trouble starts when:',['playing time grows at the expense of sleep and study','the child plays with his family','age-appropriate games are chosen','problems are solved'],'Stated directly in the second sentence.'),
 vRe('V8','Who does the passage say should sometimes play together with the child?',['the family','the specialist','the teacher','other children'],'Specialists advise families to play together with the child.'),
 vRe('V8','Which advice does the passage NOT give families?',['ban games completely','set limits on playing time','choose age-appropriate games','sometimes play with the child'],'It advises playing together "rather than simply forbidding games."'),
 vRe('V9','One job of satellites mentioned is:',['helping to forecast the weather','producing electricity for homes','cleaning space','measuring earthquakes'],'"track clouds to help forecast the weather."'),
 vRe('V9','According to the passage, space debris is:',['the remains of broken satellites and spent rockets','stardust','new satellites','meteors falling to Earth'],'An explicit definition in the passage.'),
 vRe('V9','"Spent" in "spent rockets" means:',['used up','new','expensive','fast'],'The context is about remains and debris.'),
 vRe('V9','"their large numbers" refers to the large numbers of:',['satellites','clouds','maps','rockets'],'The number of satellites created the debris problem.'),
 vRe('V10','According to the passage, a mistake fixes learning when:',['it is followed by thinking about its cause','it is repeated often','the student ignores it','it happens on an easy problem'],'"when followed by thinking about its cause."'),
 vRe('V10','Why do some students avoid difficult problems?',['they fear failing at them','the problems are long','the problems are unimportant','there is little time'],'"to avoid failing at them."'),
 vRe('V10','In "less likely to repeat it," "it" refers to:',['the mistake','the student','the cause','the learning'],'He is less likely to repeat the mistake.'),
 vRe('V10','"fixes learning more firmly" means the mistake:',['makes learning stick','weakens learning','delays learning','changes the subject'],'The context: a studied mistake makes learning last.')]});

FDV('v-re3','vre','reading','reading',
{t:'استيعاب المقروء (٣): الاستنتاج وموقف الكاتب',d:'ما لم يُكتب صراحةً لكنه يلزم من النص، دون أن تضيف إليه من عندك.',
 intro:['سؤال الاستنتاج يطلب ما لم يُكتب حرفيًا لكنه يلزم مما كُتب. الاستنتاج الصحيح قريب جدًا من النص؛ إذا احتجت إلى معلومات من خارجه لتثبته فهو ليس الجواب.','ومن هذا النوع أسئلة موقف الكاتب ونبرته، والعلاقة بين جملتين: هل هي سبب ونتيجة، أم تعارض، أم مثال؟'],
 rules:['الاستنتاج الصحيح يلزم من النص؛ لا يكفي أن يكون محتملًا أو صحيحًا في الواقع.','استبعد الخيارات المبالغة التي فيها «دائمًا» أو «أبدًا» أو «كل» إذا لم يقلها النص.','موقف الكاتب يظهر في كلماته: «للأسف» سلبية، و«مثال على النجاح» إيجابية، والعرض المتوازن محايد.','أدوات الربط تكشف العلاقة: «لذلك» نتيجة، و«غير أن» استدراك، و«مثل» تمثيل.','سؤال «يمكن أن نستنتج» أصعب من «ذكر النص»؛ خذ وقتك فيه وعد إلى النص.'],
 ex:[['في نص التحلية: «تستهلك هذه العملية طاقة كبيرة، ولذلك يُعمل على ربط محطاتها بمصادر الطاقة المتجددة». نستنتج أن: كلفة التحلية تتأثر بالطاقة ، التحلية بلا كلفة ، المملكة غنية بالأنهار ، الأغشية لا تحجز الأملاح',['النص يربط الطاقة بالكلفة صراحةً تقريبًا: الربط بالطاقة المتجددة لخفض كلفتها.','إذن الكلفة تتأثر بالطاقة.','بقية الخيارات تناقض النص.'],'كلفة التحلية تتأثر بالطاقة'],
  ['في نص الترجمة الآلية: موقف الكاتب من الآلة: متوازن يرى فائدتها وحدودها ، رافض لها تمامًا ، مبهور بها دون تحفظ ، غير مهتم',['الكاتب يذكر تطورها وسرعتها، ثم تعثرها في الأمثال.','وينتهي بأنها أداة مفيدة تحتاج مراجعة إنسان.'],'متوازن يرى فائدتها وحدودها'],
  ['في نص الادخار: «أن يُدَّخر المبلغ أولًا ثم يُنفق الباقي، لا العكس». العكس المقصود: أن يُنفق أولًا ثم يُدَّخر ما يبقى ، أن يُدَّخر كل الدخل ، ألا يعمل الشاب ، أن يقترض',['«لا العكس» تنفي الترتيب المقابل.','الترتيب المقابل: الإنفاق أولًا ثم ادخار ما بقي.'],'أن يُنفق أولًا ثم يُدَّخر ما يبقى']],
 traps:['اختيار خيار صحيح في الواقع لكن النص لا يدل عليه.','الانجذاب إلى الخيارات المبالغة التي تعمم ما خصّصه النص.','الخلط بين ما ذكره النص وما يمكن استنتاجه منه.']},
{t:'Reading comprehension (3): inference and the author\'s attitude',d:'What is not written out but must follow from the passage, without adding anything of your own.',
 intro:['An inference question asks for what is not stated word for word but must follow from what is stated. A correct inference stays very close to the passage; if you need outside information to support it, it is not the answer.','This type also includes questions on the author\'s attitude and tone, and on how two sentences relate: cause and effect, contrast or example?'],
 rules:['A correct inference must follow from the passage; it is not enough for it to be possible or true in real life.','Rule out exaggerated options with "always," "never" or "all" unless the passage says so.','The author\'s attitude shows in his words: "unfortunately" is negative, "an example of success" is positive, and a balanced account is neutral.','Linking words reveal relationships: "so" is a result, "however" a contrast, "such as" an example.','"We can infer" questions are harder than "the passage states" questions; take your time and go back to the passage.'],
 ex:[['In the desalination passage: "The process uses a great deal of energy, which is why efforts are under way to link desalination plants to renewable energy sources to cut their cost." We can infer that: the cost of desalination depends on energy, desalination costs nothing, the Kingdom has many rivers, membranes do not hold back salt',['The passage nearly states the link: renewable energy is used to cut cost.','So cost depends on energy.','The other options contradict the passage.'],'the cost of desalination depends on energy'],
  ['In the machine translation passage, the author\'s attitude toward the machine is: balanced, seeing its use and its limits; completely rejecting; uncritically amazed; indifferent',['The author notes its progress and speed, then its trouble with proverbs.','He concludes that it is a useful tool that needs human review.'],'balanced, seeing its use and its limits'],
  ['In the saving passage: "save first and then spend the rest, not the other way round." The other way round means: spend first and save what is left; save all income; not work; borrow money',['"Not the other way round" rules out the reverse order.','The reverse order: spending first, then saving what remains.'],'spend first and save what is left']],
 traps:['Choosing an option that is true in real life but not supported by the passage.','Being drawn to exaggerated options that generalize what the passage limits.','Confusing what the passage states with what can be inferred from it.']},
{ar:[
 vRe('V11','نستنتج من النص أن:',['كلفة التحلية تتأثر باستهلاك الطاقة','التحلية لا تحتاج إلى طاقة','المملكة غنية بالأنهار الدائمة','الأغشية لا تحجز الأملاح'],'ربط المحطات بالطاقة المتجددة لخفض الكلفة يعني أن الكلفة تتأثر بالطاقة.'),
 vRe('V11','لماذا اعتمدت المملكة على التحلية؟',['لقلة الأنهار الدائمة','لكثرة الأمطار','لرخص الطاقة','لتصدير المياه'],'«تقل الأنهار الدائمة في المملكة، فاعتمدت...».'),
 vRe('V11','العلاقة بين «تستهلك طاقة كبيرة» و«يُعمل على ربط محطاتها بالطاقة المتجددة»:',['سبب ونتيجة','تعارض','تمثيل','لا علاقة بينهما'],'«ولذلك» أداة نتيجة.'),
 vRe('V11','موقف الكاتب من التحلية:',['يعرضها حلًا ضروريًا له تحديات تُعالج','يرفضها','يسخر منها','يراها بلا عيوب'],'يشرح أهميتها ثم يذكر تحدي الطاقة وطريقة معالجته.'),
 vRe('V12','نستنتج من النص أن تدريب الصقر:',['يستغرق وقتًا طويلًا','يتم في يوم واحد','لا يحتاج إلى الصقار','يبدأ بالصيد مباشرة'],'«يحتاج تدريب الصقر إلى صبر طويل».'),
 vRe('V12','ترتيب مراحل التدريب حسب النص:',['التعويد على الصقار، ثم التدريب على العودة عند النداء','الصيد، ثم التعويد','العودة عند النداء، ثم التعويد','المسابقات، ثم الصيد'],'«يبدأ بتعويده... ثم يدربه على العودة».'),
 vRe('V12','يُفهم من الجملة الأخيرة أن الصقارة اليوم:',['تراث ورياضة إلى جانب كونها وسيلة صيد','انتهت تمامًا','صارت ممنوعة','مقصورة على الصيد'],'«لم تبق وسيلة للصيد فقط، بل صارت تراثًا ورياضة».'),
 vRe('V12','موقف الكاتب من الصقارة:',['تقدير لها بوصفها تراثًا عريقًا','رفض لها','سخرية منها','حياد بلا اهتمام'],'يصفها بالعراقة والصبر والتراث.'),
 vRe('V13','نستنتج من النص أن ترجمة الأمثال:',['تحتاج إلى فهم ثقافي لا يكفي فيه النقل الحرفي','سهلة على الآلة','لا تحتاج إلى مراجعة','مستحيلة على الإنسان'],'الآلة تتعثر فيها لأنها تترجم حرفيًا بعيدًا عن المعنى الثقافي.'),
 vRe('V13','موقف الكاتب من الترجمة الآلية:',['متوازن يرى فائدتها وحدودها','رافض لها تمامًا','مبهور بها دون تحفظ','غير مهتم'],'يذكر سرعتها ثم تعثرها، ويراها أداة تحتاج مراجعة.'),
 vRe('V13','العلاقة بين «تتعثر في الأمثال» و«تميل إلى ترجمة الكلمات حرفيًا»:',['الثانية سبب للأولى','الثانية مثال على الأولى','بينهما تعارض','لا علاقة بينهما'],'«لأنها تميل» تعليل.'),
 vRe('V13','أي العبارات لا يمكن استنتاجها من النص؟',['ستحل الآلة محل المترجمين قريبًا','الآلة تسرّع عمل المترجم','النص المهم يحتاج إلى مراجعة بشرية','الترجمة الآلية تحسنت'],'الكاتب يرى الآلة أداة مساعدة لا بديلًا.'),
 vRe('V14','نستنتج من النص أن الزلزال بقوة ست درجات:',['أشد بكثير من زلزال بقوة خمس درجات','يساوي زلزالًا بقوة خمس درجات','أضعف من زلزال بقوة أربع','لا يمكن مقارنته بغيره'],'«كل درجة إضافية تعني طاقة أكبر بكثير».'),
 vRe('V14','سبب الزلزال حسب النص:',['تحرر مفاجئ لضغط متراكم بين صفيحتين','ارتفاع درجة الحرارة','هبوب رياح قوية','سقوط الأمطار'],'نص صريح في الجملة الأولى.'),
 vRe('V14','يُفهم من النص أن الإنسان يستطيع اليوم:',['تقليل خسائر الزلازل','منع الزلازل','التنبؤ بموعدها بدقة','إيقاف حركة الصفائح'],'«البناء المقاوم يقلل خسائره».'),
 vRe('V14','كلمة «لكن» في الجملة الأخيرة تفيد:',['الاستدراك','التعليل','التمثيل','الشرط'],'تنتقل من العجز عن التنبؤ إلى ما يمكن فعله.'),
 vRe('V15','نستنتج من النص أن عادة الادخار:',['تتكون بالتكرار مع الوقت','تأتي فجأة','لا تناسب الشباب','تحتاج إلى دخل كبير'],'«يعتاد ذلك حتى يصير جزءًا من حياته».'),
 vRe('V15','«لا العكس» في آخر النص تعني أن الخطأ:',['أن يُنفق أولًا ثم يُدَّخر ما يبقى','أن يُدَّخر كل الدخل','أن يعمل الشاب عملًا جزئيًا','أن يُقتطع جزء ثابت'],'العكس هو الإنفاق أولًا.'),
 vRe('V15','يُفهم من النص أن صغر المبلغ المدَّخر:',['لا يمنع بناء العادة','يجعل الادخار بلا فائدة','سبب لترك الادخار','يكون في سن متقدمة فقط'],'«ولو كان صغيرًا، يعتاد ذلك».'),
 vRe('V15','موقف المختصين في النص من الادخار المبكر:',['يشجعونه','يحذرون منه','لا يهتمون به','يرونه مستحيلًا'],'يرون أن العادة تُبنى في هذه السن.')],
en:[
 vRe('V11','We can infer from the passage that:',['the cost of desalination depends on energy use','desalination needs no energy','the Kingdom has many permanent rivers','membranes do not hold back salt'],'Linking plants to renewable energy to cut cost means cost depends on energy.'),
 vRe('V11','Why has the Kingdom relied on desalination?',['it has few permanent rivers','it has heavy rainfall','energy is cheap','it exports water'],'"Saudi Arabia has few permanent rivers, so..."'),
 vRe('V11','How does "uses a great deal of energy" relate to "efforts are under way to link desalination plants to renewable energy"?',['cause and effect','contrast','example','no relationship'],'"which is why" introduces a result.'),
 vRe('V11','The author\'s attitude toward desalination is that it is:',['a necessary solution whose challenges are being addressed','something to reject','a subject of mockery','flawless'],'He explains its importance, then the energy challenge and how it is being met.'),
 vRe('V12','We can infer that training a falcon:',['takes a long time','is done in one day','does not involve the falconer','begins with hunting'],'"Training a falcon takes long patience."'),
 vRe('V12','The order of training stages is:',['getting it used to the falconer, then training it to return when called','hunting, then getting used to the falconer','returning when called, then getting used to him','competitions, then hunting'],'"begins by getting it used to... then trains it to return."'),
 vRe('V12','The last sentence suggests that falconry today is:',['a heritage and a sport as well as a way of hunting','completely gone','banned','limited to hunting'],'"no longer only a way of hunting; it has become a heritage and a sport."'),
 vRe('V12','The author\'s attitude toward falconry is:',['appreciation of it as a long-standing heritage','rejection','mockery','uninterested neutrality'],'He describes its long history, patience and heritage.'),
 vRe('V13','We can infer that translating proverbs:',['needs cultural understanding, not literal transfer','is easy for machines','needs no review','is impossible for people'],'Machines stumble because they translate literally, away from cultural meaning.'),
 vRe('V13','The author\'s attitude toward machine translation is:',['balanced, seeing its use and its limits','completely rejecting','uncritically amazed','indifferent'],'He notes its speed, then its weaknesses, and calls it a tool that needs review.'),
 vRe('V13','How does "stumbles over proverbs" relate to "tends to translate words literally"?',['the second is the cause of the first','the second is an example of the first','they contrast','no relationship'],'"because it tends to" gives the reason.'),
 vRe('V13','Which statement can NOT be inferred from the passage?',['machines will soon replace translators','machines speed up translators\' work','important texts need human review','machine translation has improved'],'The author sees the machine as a helping tool, not a replacement.'),
 vRe('V14','We can infer that a magnitude-six earthquake is:',['much stronger than a magnitude-five one','equal to a magnitude-five one','weaker than a magnitude-four one','impossible to compare'],'"each extra point means far more energy."'),
 vRe('V14','According to the passage, an earthquake is caused by:',['a sudden release of pressure built up between two plates','rising temperatures','strong winds','rainfall'],'Stated directly in the passage.'),
 vRe('V14','The passage suggests that today people can:',['reduce earthquake losses','prevent earthquakes','predict their timing precisely','stop the plates moving'],'"earthquake-resistant building reduces its losses."'),
 vRe('V14','"but" in the last sentence introduces:',['a contrast','a reason','an example','a condition'],'It moves from what cannot be done to what can.'),
 vRe('V15','We can infer that the saving habit:',['forms through repetition over time','appears suddenly','does not suit young people','requires a large income'],'"gets used to it until it becomes part of his life."'),
 vRe('V15','"not the other way round" means the mistake is to:',['spend first and save what is left','save all one\'s income','take a part-time job','set aside a fixed share'],'The other way round is spending first.'),
 vRe('V15','The passage suggests that saving only a small amount:',['does not stop the habit from forming','makes saving pointless','is a reason to stop saving','only happens at an older age'],'"however small, gets used to it."'),
 vRe('V15','The specialists\' attitude toward saving early is that they:',['encourage it','warn against it','are not interested in it','consider it impossible'],'They believe the habit is built at exactly this age.')]});

/* every verbal lesson's items also join the main verbal bank, so practice, sections and mock tests draw on them */
FD.filter(l=>l.vb).forEach(l=>{ VB_AR.push(...l.vb.ar); VB_EN.push(...l.vb.en); l.vb.ar.concat(l.vb.en).forEach(x=>FDVB.add(x)); });


/* ---- main-bank expansion for timed sections and model tests: 12 longer passages per language (L1–L12), new context and odd items ---- */
Object.assign(PASSAGES.ar,{
 L1:'يعتقد كثير من الناس أنهم قادرون على أداء عدة مهام في وقت واحد بكفاءة، كأن يذاكر الطالب وهو يتابع الرسائل على هاتفه. غير أن أبحاث علم النفس المعرفي تشير إلى أن الدماغ لا يؤدي مهمتين تحتاجان إلى انتباه في اللحظة نفسها، بل ينتقل بينهما بسرعة. وكل انتقال يكلّف جزءًا من الوقت والتركيز، إذ يحتاج الذهن إلى لحظات ليستعيد ما كان يفعله قبل أن ينقطع. وتتراكم هذه اللحظات خلال ساعة المذاكرة، فيخرج الطالب منها وقد قرأ أقل وفهم أقل مما يظن. ويزيد الأمر سوءًا أن الشخص المشتت لا يشعر بانخفاض أدائه، بل قد يظن أنه أنجز أكثر لأنه كان مشغولًا طوال الوقت. ولهذا ينصح المختصون بتقسيم وقت المذاكرة إلى فترات قصيرة مركزة، يُبعد فيها الهاتف تمامًا، تعقبها استراحات قصيرة يُسمح فيها بما كان ممنوعًا. فالتركيز في رأيهم ليس موهبة يولد بها الإنسان، بل عادة تُبنى بالتدريب.',
 L2:'تسعى مدن كثيرة حول العالم إلى أن تصبح مدنًا ذكية، تستخدم أجهزة الاستشعار والبيانات لتحسين حياة سكانها. فإشارات المرور في هذه المدن لا تعمل بتوقيت ثابت، بل تتغير بحسب كثافة السيارات في كل اتجاه، وأعمدة الإنارة تخفت حين تخلو الشوارع وتشتد حين يمر الناس، وحاويات النفايات ترسل إشعارًا حين تمتلئ فلا تمر الشاحنات إلا عند الحاجة. وتَعِد هذه الحلول بتوفير الطاقة والوقت وتقليل التلوث. لكن المدينة الذكية تطرح أسئلة لا تقل أهمية عن مزاياها؛ فالبيانات التي تجمعها عن حركة الناس قد تكشف تفاصيل من حياتهم الخاصة إذا لم تُحمَ جيدًا، والاعتماد الكبير على الأنظمة الرقمية يجعل المدينة عرضة للتعطل إذا تعرضت لهجوم إلكتروني. ولذلك يرى المخططون أن ذكاء المدينة لا يقاس بعدد الأجهزة فيها، بل بقدرتها على خدمة سكانها مع حماية خصوصيتهم وضمان استمرار الخدمات في كل الظروف.',
 L3:'تقع واحة الأحساء في شرق المملكة، وتُعد من أكبر الواحات الطبيعية في العالم. وقد قامت حياة الواحة منذ القدم على عيون الماء العذب التي كانت تتدفق من باطن الأرض، فتسقي ملايين النخيل والمزارع المحيطة بها. وحول هذه العيون نشأت القرى والأسواق، وتعلّم الأهالي تنظيم توزيع الماء بين المزارع بدقة تمنع النزاع وتحفظ حق كل مزارع. ومع مرور الزمن وزيادة السحب من المياه الجوفية، جفّ كثير من العيون، فاتجه الناس إلى الآبار الحديثة وقنوات الري المنظمة. وفي عام ٢٠١٨ أُدرجت الأحساء في قائمة التراث العالمي، تقديرًا لتفاعل الإنسان مع بيئته فيها على مدى قرون. ولا تزال الواحة حتى اليوم شاهدة على أن الماء، حين يُدار بحكمة، قادر على أن يصنع حضارة في قلب الصحراء.',
 L4:'يظن بعض الطلاب أن الضوضاء الخفيفة لا تؤثر في مذاكرتهم، بل إن بعضهم يفضّل الدراسة في المقاهي المزدحمة. وتُظهر الدراسات أن تأثير الصوت يختلف باختلاف نوعه ونوع المهمة. فالضجيج المتصل الذي لا يحمل معنى، كصوت المكيف أو المطر، قد لا يضر كثيرًا، بل قد يساعد بعض الناس على عزل الأصوات المزعجة الأخرى. أما الكلام المفهوم، كحديث الجالسين حولك أو أغنية بلغة تعرفها، فيشتت الانتباه أكثر، لأن الدماغ يحاول تلقائيًا فهم ما يسمعه. ويشتد هذا الأثر في المهام اللغوية كقراءة النصوص وحفظ المفردات، ويقل في المهام الآلية كترتيب الأوراق. وخلاصة ذلك أن الطالب الذي يذاكر القراءة والفهم يحتاج إلى مكان أهدأ من الطالب الذي يراجع جداول أو ينسخ ملخصات.',
 L5:'حين افتُتح قطار الحرمين السريع تغيّر شكل الرحلة بين مكة المكرمة والمدينة المنورة؛ فالمسافة التي كانت تستغرق ساعات طويلة بالسيارة صار يمكن قطعها في نحو ساعتين ونصف. ولم يكن المشروع سهلًا، إذ امتد مساره قرابة أربعمئة وخمسين كيلومترًا عبر بيئة صحراوية تهب فيها الرمال وترتفع فيها الحرارة، فاحتاج المهندسون إلى حلول خاصة لحماية القضبان من زحف الرمال وتبريد الأنظمة. وتكمن أهمية القطار في أنه يخفف الزحام على الطرق في مواسم الحج والعمرة، حين يتنقل ملايين الزوار بين المدينتين في أيام محدودة، كما يقلل الحوادث وانبعاثات السيارات. ويرى المختصون أن نجاح المشروع لا يقاس بسرعة القطار وحدها، بل بقدرته على العمل بانتظام في أشد أيام السنة ازدحامًا.',
 L6:'تقدّم البحار جزءًا كبيرًا من غذاء البشر، لكن الصيد الجائر يهدد كثيرًا من أنواع الأسماك. ويحدث الصيد الجائر حين تُصاد الأسماك أسرع مما تستطيع أن تتكاثر، فتتناقص أعدادها عامًا بعد عام حتى ينهار مخزونها. ومن أخطر صوره صيد الأسماك الصغيرة قبل أن تبلغ سن التكاثر، واستخدام شباك واسعة تجرف قاع البحر وما عليه من شعاب وكائنات لا يحتاجها الصياد. ولمواجهة ذلك تلجأ الدول إلى تحديد مواسم يُمنع فيها الصيد، وتحديد أحجام دنيا للأسماك المسموح بصيدها، وإنشاء محميات بحرية. وقد يرى الصياد في هذه القيود خسارة عاجلة، لكنها في الحقيقة تحفظ مصدر رزقه في المستقبل؛ فالبحر الذي يُستنزف اليوم لن يعطي شيئًا غدًا.',
 L7:'نستعمل اليوم الأرقام من الصفر إلى التسعة دون أن نفكر في رحلتها الطويلة. فقد نشأ هذا النظام في الهند، ثم انتقل إلى العالم الإسلامي، حيث ألّف الخوارزمي في القرن التاسع الميلادي كتابًا يشرح طريقة الحساب به. وتُرجم الكتاب لاحقًا إلى اللاتينية، فعرفت أوروبا هذه الأرقام باسم الأرقام العربية. وتكمن عبقرية هذا النظام في أمرين: الأول أن قيمة الرقم تتغير بحسب منزلته، فالرقم ثلاثة في خانة الآحاد غيره في خانة المئات، والثاني وجود الصفر الذي يحفظ المنزلة الفارغة. وبفضل ذلك صارت العمليات الحسابية الكبيرة ممكنة بالقلم والورقة، بعد أن كانت الأنظمة القديمة تحتاج إلى رموز كثيرة وأدوات خاصة. ومن الطريف أن الأرقام التي تُكتب في المشرق العربي اليوم تختلف في أشكالها عن تلك التي انتشرت في أوروبا، مع أن أصلهما واحد.',
 L8:'تُعد طاقة الرياح من أسرع مصادر الطاقة المتجددة نموًا في العالم. وتعمل التوربينات بفكرة بسيطة: تدير الرياح الشفرات الضخمة، فتدير بدورها مولدًا يحوّل الحركة إلى كهرباء. وتمتاز هذه الطاقة بأنها لا تُخرج غازات ملوِّثة أثناء التشغيل، وبأن مصدرها لا ينفد. غير أن لها تحديات؛ فالرياح لا تهب بالقوة نفسها طوال الوقت، فيتغير إنتاج الكهرباء من ساعة إلى أخرى، مما يتطلب وسائل لتخزين الطاقة أو مصادر أخرى تعوّض النقص. كما أن اختيار مواقع التوربينات يحتاج إلى دراسة، لأنها تتطلب رياحًا منتظمة ومساحات واسعة، وقد تؤثر في مسارات الطيور المهاجرة. ولهذا تتجه الدول إلى الجمع بين الرياح والشمس وغيرهما، حتى يسد كل مصدر نقص الآخر.',
 L9:'لم يعد العلماء ينظرون إلى الجراثيم على أنها عدو يجب القضاء عليه دائمًا. ففي أمعاء الإنسان تعيش تريليونات من البكتيريا النافعة التي تساعده على هضم بعض الأطعمة، وتصنع له فيتامينات، وتنافس الجراثيم الضارة على المكان والغذاء فتحد من انتشارها. ويؤثر نوع الطعام في هذه البكتيريا؛ فالأطعمة الغنية بالألياف كالخضراوات والبقوليات تغذي الأنواع النافعة، بينما يقلل الإفراط في السكريات من تنوعها. ويحذّر الأطباء من الاستعمال العشوائي للمضادات الحيوية، لأنها لا تفرّق بين البكتيريا الضارة والنافعة، فتقتل الاثنتين معًا. ولا يعني ذلك ترك المضادات الحيوية، فهي أنقذت ملايين الأرواح، بل يعني أن تُستعمل حين يصفها الطبيب فقط، وبالجرعة والمدة المحددتين.',
 L10:'كانت المتاحف قديمًا أماكن هادئة تُعرض فيها القطع خلف الزجاج، ويقرأ الزائر لوحة صغيرة بجانب كل قطعة ثم يمضي. أما اليوم فقد تغيّر دور المتحف؛ إذ صار كثير من المتاحف يقدّم تجارب تفاعلية، فيلمس الزائر نسخًا من القطع، ويستمع إلى قصصها، ويشاهد مقاطع تعيد بناء الماضي أمامه. ويرى المؤيدون أن هذا التحول جذب فئات جديدة، خصوصًا الأطفال والشباب، الذين لم يكونوا يجدون في المتاحف التقليدية ما يشدهم. في حين يخشى آخرون أن تطغى الشاشات والمؤثرات على القطعة الأصلية نفسها، فيخرج الزائر وقد تذكّر العرض ونسي التاريخ. ويبدو أن المتحف الناجح هو الذي يستعمل التقنية ليقرّب الزائر من القطعة، لا ليصرفه عنها.',
 L11:'يبدو الجسر المعلّق للناظر خفيفًا رشيقًا، لكنه في الحقيقة يحمل أوزانًا هائلة. وتقوم فكرته على كابلين رئيسيين ضخمين يمتدان بين برجين عاليين، وتتدلى منهما كابلات رأسية تحمل الطريق. فحين تمر السيارات ينتقل وزنها إلى الكابلات الرأسية، ثم إلى الكابلين الرئيسيين، ثم إلى البرجين، ومنهما إلى الأرض، كما تثبَّت أطراف الكابلات في كتل خرسانية ضخمة على ضفتي النهر. وقد تعلّم المهندسون من حوادث سابقة أن الرياح أخطر على هذه الجسور من الأوزان؛ فقد انهار جسر شهير في القرن الماضي لأن الرياح جعلته يتأرجح حتى تحطم. ومنذ ذلك الحين صارت نماذج الجسور تُختبر في أنفاق الرياح قبل بنائها، وصار تصميم الطريق نفسه يراعي مرور الهواء من خلاله.',
 L12:'يواجه كثير من المناطق الجافة خطر التصحر، أي تحوّل الأراضي الصالحة للزراعة والرعي إلى أراضٍ قاحلة. ولا يحدث التصحر بسبب قلة الأمطار وحدها، بل يسهم فيه الإنسان أيضًا بالرعي الجائر الذي يقتلع الغطاء النباتي، وقطع الأشجار للحطب، والزراعة التي تستنزف التربة دون أن تمنحها وقتًا لتتجدد. فإذا زال الغطاء النباتي صارت التربة مكشوفة، فتحملها الرياح وتجرفها السيول. ولمكافحة التصحر تُطلق مبادرات لزراعة ملايين الأشجار، وتنظيم الرعي، وحماية المحميات الطبيعية. ويؤكد المختصون أن نجاح التشجير لا يقاس بعدد الشتلات المزروعة، بل بعدد الأشجار التي تبقى حية بعد سنوات، ولذلك يُفضَّل اختيار نباتات محلية تتحمل الجفاف وتلائم بيئة المنطقة.'
});
Object.assign(PASSAGES.en,{
 L1:'Many people believe they can perform several tasks at once efficiently, such as a student studying while following messages on his phone. However, research in cognitive psychology indicates that the brain does not perform two attention-demanding tasks at the same moment; instead, it switches between them quickly. Each switch costs some time and focus, since the mind needs a few moments to recover what it was doing before it was interrupted. These moments add up over an hour of study, so the student leaves having read less and understood less than he thinks. Worse still, a distracted person does not notice the drop in his performance; he may even believe he achieved more because he was busy the whole time. For this reason, specialists advise dividing study time into short, focused periods with the phone kept completely away, followed by short breaks in which what was forbidden is allowed. Focus, in their view, is not a talent people are born with but a habit built through practice.',
 L2:'Many cities around the world are trying to become smart cities that use sensors and data to improve their residents\' lives. Traffic lights in these cities do not run on fixed timings; they change according to the number of cars in each direction. Street lamps dim when the streets are empty and brighten when people pass, and rubbish bins send an alert when they are full, so trucks come only when needed. These solutions promise to save energy and time and to reduce pollution. But the smart city raises questions as important as its benefits: the data it collects about people\'s movements may reveal details of their private lives if it is not well protected, and heavy reliance on digital systems leaves the city open to breakdown if it suffers a cyberattack. Planners therefore believe that a city\'s intelligence is measured not by the number of devices in it but by its ability to serve its residents while protecting their privacy and keeping services running in all conditions.',
 L3:'Al-Ahsa Oasis lies in the east of Saudi Arabia and is one of the largest natural oases in the world. Since ancient times, life in the oasis has depended on freshwater springs that flowed from underground, watering millions of palm trees and the farms around them. Villages and markets grew up around these springs, and the people learned to organize the sharing of water between farms precisely, preventing disputes and protecting each farmer\'s share. Over time, as more groundwater was drawn, many springs dried up, so people turned to modern wells and organized irrigation channels. In 2018, Al-Ahsa was added to the World Heritage List in recognition of the interaction between people and their environment there over centuries. The oasis still stands as evidence that water, when managed wisely, can build a civilization in the heart of the desert.',
 L4:'Some students think that light noise does not affect their studying, and some even prefer to study in crowded cafés. Studies show that the effect of sound depends on its type and on the kind of task. Continuous noise that carries no meaning, such as an air conditioner or rain, may do little harm and may even help some people block out other annoying sounds. Understandable speech, however, such as the conversation of people around you or a song in a language you know, is more distracting, because the brain automatically tries to understand what it hears. This effect is strongest in language tasks such as reading texts and memorizing vocabulary, and weaker in mechanical tasks such as sorting papers. In short, a student studying reading comprehension needs a quieter place than one reviewing tables or copying summaries.',
 L5:'When the Haramain High-Speed Railway opened, it changed the journey between Makkah and Madinah: a distance that used to take many hours by car could now be covered in about two and a half hours. The project was not easy. Its route stretches about 450 kilometres through a desert environment with blowing sand and high temperatures, so engineers needed special solutions to protect the rails from drifting sand and to cool the systems. The train matters because it eases congestion on the roads during the Hajj and Umrah seasons, when millions of visitors travel between the two cities in a limited number of days, and it also reduces accidents and car emissions. Specialists believe the project\'s success is measured not by the train\'s speed alone but by its ability to run reliably on the busiest days of the year.',
 L6:'The seas provide a large share of humanity\'s food, but overfishing threatens many species of fish. Overfishing happens when fish are caught faster than they can reproduce, so their numbers fall year after year until the stock collapses. Among its most harmful forms are catching young fish before they reach breeding age and using wide nets that scrape the seabed along with the reefs and creatures the fisherman does not need. To counter this, countries set seasons in which fishing is banned, minimum sizes for the fish that may be caught, and marine reserves. A fisherman may see these limits as an immediate loss, but in reality they protect his livelihood in the future: a sea that is drained today will give nothing tomorrow.',
 L7:'Today we use the digits from zero to nine without thinking about their long journey. This system began in India and then moved to the Islamic world, where al-Khwarizmi wrote a book in the ninth century explaining how to calculate with it. The book was later translated into Latin, and Europe came to know these digits as Arabic numerals. The genius of the system lies in two things: first, the value of a digit changes with its place, so a three in the units column differs from a three in the hundreds column; second, there is a zero that holds an empty place. Thanks to this, large calculations became possible with pen and paper, whereas older systems needed many symbols and special tools. Interestingly, the digits written in the Arab East today look different from those that spread in Europe, even though they share the same origin.',
 L8:'Wind power is one of the fastest-growing renewable energy sources in the world. Turbines work on a simple idea: the wind turns huge blades, which in turn drive a generator that converts motion into electricity. This energy produces no polluting gases while running, and its source never runs out. It does, however, face challenges. The wind does not blow with the same strength all the time, so electricity output changes from hour to hour, which requires ways of storing energy or other sources to make up the shortfall. Choosing turbine sites also needs study, because turbines require steady winds and large areas and may affect the routes of migrating birds. That is why countries are combining wind, sun and other sources, so that each fills the gaps of the others.',
 L9:'Scientists no longer see germs as an enemy that must always be destroyed. Trillions of helpful bacteria live in the human gut, helping to digest some foods, making vitamins and competing with harmful germs for space and food, which limits their spread. The type of food we eat affects these bacteria: fibre-rich foods such as vegetables and legumes feed the helpful kinds, while too much sugar reduces their variety. Doctors warn against the careless use of antibiotics, because they do not distinguish between harmful and helpful bacteria and kill both together. This does not mean abandoning antibiotics, which have saved millions of lives; it means using them only when a doctor prescribes them, at the set dose and for the set length of time.',
 L10:'Museums used to be quiet places where objects were displayed behind glass, and visitors read a small label beside each one before moving on. Today the museum\'s role has changed: many museums offer interactive experiences in which visitors touch replicas, listen to the objects\' stories and watch clips that rebuild the past before their eyes. Supporters believe this shift has attracted new audiences, especially children and young people, who found little to hold them in traditional museums. Others fear that screens and effects will overshadow the original object itself, so that visitors leave remembering the show and forgetting the history. It seems the successful museum is one that uses technology to bring visitors closer to the object, not to draw them away from it.',
 L11:'A suspension bridge looks light and graceful, but it actually carries enormous loads. It is built around two huge main cables stretched between two tall towers, with vertical cables hanging from them to hold up the road. When cars pass, their weight moves to the vertical cables, then to the main cables, then to the towers and from them into the ground, while the ends of the cables are anchored in massive concrete blocks on both banks. Engineers learned from earlier accidents that wind is more dangerous to these bridges than weight: a famous bridge collapsed in the last century because the wind made it sway until it broke apart. Since then, bridge models have been tested in wind tunnels before construction, and the design of the deck itself allows air to pass through it.',
 L12:'Many dry regions face the threat of desertification, the turning of land fit for farming and grazing into barren land. Desertification is not caused by low rainfall alone; people contribute to it through overgrazing, which strips away plant cover, cutting trees for firewood, and farming that exhausts the soil without giving it time to recover. Once the plant cover is gone, the soil is exposed, and the wind carries it off and floods wash it away. To fight desertification, initiatives plant millions of trees, regulate grazing and protect nature reserves. Specialists stress that the success of tree planting is measured not by the number of seedlings planted but by the number of trees still alive years later, which is why local plants that tolerate drought and suit the region\'s environment are preferred.'
});
VB_AR.push(
 vRe('L1','الفكرة الرئيسة للنص:',['أداء مهام متعددة معًا يضعف المذاكرة، والتركيز عادة تُبنى','الهاتف ضروري أثناء المذاكرة','الدماغ يؤدي مهمتين معًا بكفاءة','الاستراحات تضيّع الوقت'],'النص يبين كلفة التنقل بين المهام وينتهي بأن التركيز عادة تُبنى.'),
 vRe('L1','بحسب النص، ما الذي يحدث فعلًا حين يؤدي الشخص مهمتين معًا؟',['ينتقل الدماغ بينهما بسرعة','يؤديهما الدماغ في اللحظة نفسها','يتوقف عن إحداهما تمامًا','يزداد تركيزه'],'«بل ينتقل بينهما بسرعة».'),
 vRe('L1','نستنتج من النص أن شعور الطالب المشتت بالإنجاز:',['قد يكون شعورًا مضللًا','دليل على تفوقه','يعني أنه فهم أكثر','لا علاقة له بالانشغال'],'المشتت يظن أنه أنجز أكثر لأنه كان مشغولًا، وهو في الحقيقة أنجز أقل.'),
 vRe('L1','معنى «تتراكم» في النص:',['تزداد شيئًا فوق شيء','تختفي','تتساوى','تنقسم'],'اللحظات الضائعة تجتمع وتزداد خلال الساعة.'),
 vRe('L1','موقف المختصين من التركيز:',['مهارة يمكن تنميتها بالتدريب','موهبة فطرية لا تتغير','أمر لا يمكن قياسه','يعتمد على الهاتف'],'«ليس موهبة... بل عادة تُبنى بالتدريب».'),
 vRe('L2','الفكرة الرئيسة للنص:',['مزايا المدن الذكية والتحديات التي تطرحها','طريقة عمل إشارات المرور','أنواع النفايات في المدن','تاريخ الإنارة العامة'],'يعرض النص المزايا ثم الأسئلة المهمة، ثم معيار الذكاء الحقيقي.'),
 vRe('L2','من أمثلة المدينة الذكية في النص:',['حاويات تُرسل إشعارًا حين تمتلئ','قطارات بلا سائق','مبانٍ تُبنى بالروبوتات','مدارس بلا معلمين'],'ذُكرت الحاويات صراحة.'),
 vRe('L2','من مخاطر المدينة الذكية التي ذكرها النص:',['كشف خصوصية السكان إذا لم تُحمَ البيانات','زيادة التلوث','ارتفاع أسعار الوقود','قلة إشارات المرور'],'«قد تكشف تفاصيل من حياتهم الخاصة».'),
 vRe('L2','بحسب المخططين، يُقاس ذكاء المدينة بـ:',['قدرتها على خدمة سكانها مع حماية خصوصيتهم','عدد الأجهزة فيها','عدد سكانها','سرعة الإنترنت فيها'],'نص صريح في الجملة الأخيرة.'),
 vRe('L2','أسلوب النص:',['متوازن يعرض المزايا والمخاوف','دعائي يمدح الفكرة دون تحفظ','رافض للتقنية','قصصي'],'يعرض المزايا ثم المخاوف ثم الخلاصة.'),
 vRe('L3','أنسب عنوان للنص:',['الأحساء: ماءٌ صنع حضارة في الصحراء','الآبار الحديثة','قائمة التراث العالمي','زراعة النخيل في العالم'],'العنوان يجمع الواحة والماء والحضارة.'),
 vRe('L3','لماذا نظّم أهالي الأحساء توزيع الماء بدقة؟',['لمنع النزاع وحفظ حق كل مزارع','لبيع الماء','لتقليل عدد النخيل','لأن العيون كانت مالحة'],'«بدقة تمنع النزاع وتحفظ حق كل مزارع».'),
 vRe('L3','سبب جفاف كثير من العيون بحسب النص:',['زيادة السحب من المياه الجوفية','قلة النخيل','بناء الأسواق','إدراج الواحة في التراث العالمي'],'«مع... زيادة السحب من المياه الجوفية، جفّ كثير من العيون».'),
 vRe('L3','أُدرجت الأحساء في قائمة التراث العالمي تقديرًا لـ:',['تفاعل الإنسان مع بيئته فيها','كثرة آبارها الحديثة','حجم أسواقها','ارتفاع درجات الحرارة فيها'],'نص صريح.'),
 vRe('L3','نستنتج من الجملة الأخيرة أن:',['حسن إدارة الموارد أساس لقيام الحضارة','الصحراء لا تصلح للحياة','الماء يكفي وحده دون تنظيم','الواحات تختفي دائمًا'],'«الماء، حين يُدار بحكمة، قادر على أن يصنع حضارة».'),
 vRe('L4','الفكرة الرئيسة للنص:',['أثر الصوت في المذاكرة يختلف باختلاف نوعه ونوع المهمة','المقاهي أفضل أماكن المذاكرة','كل الأصوات مفيدة للتركيز','الأغاني تحسن الحفظ'],'هذه الجملة المحورية في النص.'),
 vRe('L4','أي الأصوات أكثر تشتيتًا بحسب النص؟',['الكلام المفهوم','صوت المطر','صوت المكيف','الضجيج المتصل'],'لأن الدماغ يحاول فهم ما يسمعه.'),
 vRe('L4','يشتد أثر الكلام المسموع في:',['المهام اللغوية كالقراءة وحفظ المفردات','ترتيب الأوراق','نسخ الملخصات','المهام الآلية كلها'],'نص صريح.'),
 vRe('L4','نستنتج من النص أن طالبًا يراجع جدولًا للضرب:',['قد يتحمل ضوضاء أكثر من طالب يقرأ نصًا','يحتاج صمتًا تامًا','لا يتأثر بأي صوت إطلاقًا','يجب أن يستمع إلى أغنية'],'المهام الآلية أقل تأثرًا، فيتحمل صاحبها ضوضاء أكثر.'),
 vRe('L4','الضمير في «يسمعه» يعود إلى:',['الدماغ','الطالب الجالس','المكيف','النص'],'«لأن الدماغ يحاول تلقائيًا فهم ما يسمعه».'),
 vRe('L5','الفكرة الرئيسة للنص:',['قطار الحرمين: تحدياته وأهميته في خدمة الزوار','تاريخ مكة المكرمة','أنواع القطارات في العالم','أسباب الحوادث المرورية'],'النص يجمع التغيير والتحديات والأهمية.'),
 vRe('L5','من تحديات بناء القطار المذكورة:',['زحف الرمال وارتفاع الحرارة','قلة العمال','نقص المال','كثرة الأنهار'],'نص صريح.'),
 vRe('L5','تظهر أهمية القطار أكثر:',['في مواسم الحج والعمرة','في فصل الشتاء فقط','ليلًا','في أيام العطل الأسبوعية'],'حين يتنقل ملايين الزوار في أيام محدودة.'),
 vRe('L5','بحسب المختصين يقاس نجاح المشروع بـ:',['انتظام عمله في أشد الأيام ازدحامًا','سرعة القطار وحدها','عدد محطاته','لون عرباته'],'نص صريح في الجملة الأخيرة.'),
 vRe('L5','معنى «تكمن» في النص:',['تقع وتتمثل','تختفي','تتأخر','تنتهي'],'تكمن الأهمية: تتمثل.'),
 vRe('L6','الفكرة الرئيسة للنص:',['الصيد الجائر خطر، وتنظيم الصيد يحفظ الرزق في المستقبل','الأسماك مصدر الغذاء الوحيد','الشباك الواسعة أفضل أدوات الصيد','البحار لا تنفد'],'النص يعرّف الخطر ثم الحلول ثم الخلاصة.'),
 vRe('L6','يحدث الصيد الجائر حين:',['تُصاد الأسماك أسرع من قدرتها على التكاثر','يُمنع الصيد في مواسم معينة','تُصاد الأسماك الكبيرة فقط','تُنشأ المحميات'],'تعريف صريح.'),
 vRe('L6','لم يذكر النص من وسائل مواجهة الصيد الجائر:',['تربية الأسماك في المنازل','تحديد مواسم يُمنع فيها الصيد','تحديد أحجام دنيا للأسماك','إنشاء محميات بحرية'],'لم يرد ذكر التربية في المنازل.'),
 vRe('L6','العلاقة بين «خسارة عاجلة» و«تحفظ مصدر رزقه في المستقبل»:',['استدراك يصحح فهمًا شائعًا','سبب ونتيجة','تمثيل','ترادف'],'«لكنها في الحقيقة...» تصحح نظرة الصياد.'),
 vRe('L6','معنى «يُستنزف» في الجملة الأخيرة:',['تُستهلك موارده حتى تنفد','يُنظَّف','يُحمى','يُوسَّع'],'البحر المستنزف لا يعطي شيئًا غدًا.'),
 vRe('L7','الفكرة الرئيسة للنص:',['رحلة الأرقام إلى العالم وسر قوة نظامها','حياة الخوارزمي','الترجمة إلى اللاتينية','أشكال الحروف العربية'],'النص يتتبع الرحلة ثم يشرح العبقرية.'),
 vRe('L7','من أين نشأ نظام الأرقام بحسب النص؟',['الهند','أوروبا','مصر','اليونان'],'«نشأ هذا النظام في الهند».'),
 vRe('L7','عبقرية النظام تكمن في:',['قيمة المنزلة ووجود الصفر','كثرة الرموز','الحاجة إلى أدوات خاصة','شكل الأرقام'],'الأمران المذكوران صراحة.'),
 vRe('L7','لماذا سُميت الأرقام في أوروبا «الأرقام العربية»؟',['لأنها وصلت إليها عن طريق كتاب عربي مترجم','لأنها نشأت في الجزيرة العربية','لأن العرب اخترعوا الصفر وحده','لأنها تُكتب من اليمين'],'انتقلت عبر كتاب الخوارزمي المترجم إلى اللاتينية.'),
 vRe('L7','نستنتج من الجملة الأخيرة أن:',['اختلاف شكل الرقم لا يعني اختلاف أصله','الأرقام الأوروبية أقدم','أرقام المشرق لا علاقة لها بالهند','الأرقام لم تتغير أشكالها أبدًا'],'«مع أن أصلهما واحد».'),
 vRe('L8','الفكرة الرئيسة للنص:',['مزايا طاقة الرياح وتحدياتها وطريقة التغلب عليها','طريقة صناعة الشفرات','هجرة الطيور','أسعار الكهرباء'],'النص يعرض المزايا والتحديات والحل.'),
 vRe('L8','من مزايا طاقة الرياح المذكورة:',['لا تُخرج غازات ملوثة أثناء التشغيل','تعمل بالقوة نفسها دائمًا','لا تحتاج إلى مساحات','لا تحتاج إلى دراسة لمواقعها'],'نص صريح.'),
 vRe('L8','لماذا تحتاج طاقة الرياح إلى وسائل تخزين؟',['لأن قوة الرياح تتغير فيتغير الإنتاج','لأنها تنفد','لأنها ملوِّثة','لأن التوربينات صغيرة'],'«فيتغير إنتاج الكهرباء من ساعة إلى أخرى».'),
 vRe('L8','الضمير في «الآخر» في الجملة الأخيرة يعود إلى:',['مصدر طاقة آخر','الطائر','التوربين','البلد'],'كل مصدر يسد نقص المصدر الآخر.'),
 vRe('L8','نستنتج من النص أن الاعتماد على مصدر طاقة واحد:',['قد يسبب نقصًا في الكهرباء','هو الحل الأمثل','لا يؤثر في الإنتاج','يلغي الحاجة إلى التخطيط'],'لذلك تجمع الدول بين المصادر.'),
 vRe('L9','الفكرة الرئيسة للنص:',['البكتيريا النافعة مهمة، ويجب استعمال المضادات الحيوية بحكمة','كل الجراثيم ضارة','السكريات مفيدة للأمعاء','المضادات الحيوية لا فائدة منها'],'النص يغيّر النظرة إلى الجراثيم ثم يوجه إلى الاستعمال الصحيح.'),
 vRe('L9','من فوائد البكتيريا النافعة المذكورة:',['صنع بعض الفيتامينات','تنظيف الأسنان','خفض الحرارة','تقوية العظام مباشرة'],'«وتصنع له فيتامينات».'),
 vRe('L9','لماذا يحذّر الأطباء من الاستعمال العشوائي للمضادات الحيوية؟',['لأنها تقتل البكتيريا النافعة والضارة معًا','لأنها غالية','لأنها تزيد السكريات','لأنها لا تقتل أي بكتيريا'],'نص صريح.'),
 vRe('L9','موقف الكاتب من المضادات الحيوية:',['يقدّر فائدتها ويدعو إلى استعمالها عند الحاجة فقط','يدعو إلى تركها تمامًا','يدعو إلى الإكثار منها','لا يهتم بها'],'«لا يعني ذلك ترك المضادات... بل أن تُستعمل حين يصفها الطبيب».'),
 vRe('L9','معنى «تنافس» في النص:',['تزاحم على الشيء نفسه','تساعد','تتحد مع','تهرب من'],'تنافس الجراثيم الضارة على المكان والغذاء.'),
 vRe('L10','الفكرة الرئيسة للنص:',['تحوّل دور المتاحف بين التفاعل والخوف من طغيان العرض','تاريخ المتاحف القديمة','طريقة صنع النسخ','أسعار تذاكر المتاحف'],'النص يعرض التحول وآراء المؤيدين والمتخوفين.'),
 vRe('L10','يرى المؤيدون أن التحول التفاعلي:',['جذب فئات جديدة كالأطفال والشباب','أبعد الزوار عن المتاحف','قلل عدد القطع','رفع الأسعار'],'نص صريح.'),
 vRe('L10','يخشى المعارضون أن:',['تطغى الشاشات على القطعة الأصلية','تُغلق المتاحف','يقل عدد الشاشات','تُسرق القطع'],'نص صريح.'),
 vRe('L10','العلاقة بين رأي المؤيدين ورأي المتخوفين:',['تعارض','سبب ونتيجة','تمثيل','ترادف'],'«في حين يخشى آخرون...» تفيد التعارض.'),
 vRe('L10','نستنتج من الجملة الأخيرة أن الكاتب:',['يقبل التقنية بشرط أن تخدم القطعة','يرفض التقنية رفضًا تامًا','يفضّل الشاشات على القطع','لا يرى فرقًا بين العرض والتاريخ'],'التقنية مقبولة إذا قرّبت الزائر من القطعة.'),
 vRe('L11','الفكرة الرئيسة للنص:',['طريقة حمل الجسر المعلّق للأوزان وخطر الرياح عليه','تاريخ الأنهار','أنواع السيارات','طريقة صنع الخرسانة'],'النص يشرح نقل الوزن ثم خطر الرياح.'),
 vRe('L11','ترتيب انتقال وزن السيارات في الجسر:',['الكابلات الرأسية، ثم الرئيسية، ثم البرجان، ثم الأرض','البرجان، ثم الكابلات، ثم الطريق','الأرض، ثم البرجان، ثم الكابلات','الكتل الخرسانية، ثم السيارات'],'نص صريح.'),
 vRe('L11','تعلّم المهندسون من الحوادث السابقة أن:',['الرياح أخطر على هذه الجسور من الأوزان','الأوزان أخطر من الرياح','الأبراج لا ضرورة لها','الخرسانة لا تتحمل الماء'],'نص صريح.'),
 vRe('L11','لماذا تُختبر نماذج الجسور في أنفاق الرياح؟',['لتجنب تأرجحها وانهيارها بفعل الرياح','لقياس سرعة السيارات','لاختبار ألوانها','لتقليل كلفتها'],'بعد انهيار جسر بسبب تأرجحه في الرياح.'),
 vRe('L11','معنى «رشيقًا» في النص:',['خفيفًا متناسقًا','ثقيلًا','قديمًا','مكسورًا'],'السياق: يبدو خفيفًا رشيقًا.'),
 vRe('L12','الفكرة الرئيسة للنص:',['أسباب التصحر وطرق مكافحته ومعيار نجاحها','فوائد الرعي','أنواع الأشجار','قلة الأمطار وحدها'],'النص يعرّف التصحر وأسبابه وطرق مكافحته.'),
 vRe('L12','بحسب النص، التصحر سببه:',['قلة الأمطار مع ممارسات بشرية خاطئة','قلة الأمطار وحدها','كثرة الأشجار','الرياح فقط'],'«لا يحدث التصحر بسبب قلة الأمطار وحدها، بل يسهم فيه الإنسان».'),
 vRe('L12','ماذا يحدث للتربة إذا زال الغطاء النباتي؟',['تنكشف فتحملها الرياح وتجرفها السيول','تزداد خصوبة','تتحول إلى مياه','لا يتغير شيء'],'نص صريح.'),
 vRe('L12','يقاس نجاح التشجير بحسب المختصين بـ:',['عدد الأشجار التي تبقى حية بعد سنوات','عدد الشتلات المزروعة','سرعة الزراعة','نوع الأدوات المستعملة'],'نص صريح.'),
 vRe('L12','لماذا تُفضَّل النباتات المحلية؟',['لأنها تتحمل الجفاف وتلائم البيئة','لأنها أرخص دائمًا','لأنها أسرع نموًا في كل مكان','لأنها لا تحتاج إلى ماء إطلاقًا'],'نص صريح في الجملة الأخيرة.')
);
VB_EN.push(
 vRe('L1','The main idea of the passage is that:',['multitasking weakens studying, and focus is a habit that can be built','a phone is necessary while studying','the brain performs two tasks at once efficiently','breaks waste time'],'The passage shows the cost of switching and ends by calling focus a habit.'),
 vRe('L1','According to the passage, what actually happens when a person does two tasks at once?',['the brain switches between them quickly','the brain performs both at the same moment','he stops one of them completely','his focus increases'],'"it switches between them quickly."'),
 vRe('L1','We can infer that a distracted student\'s sense of achievement:',['may be misleading','proves he is excellent','means he understood more','has nothing to do with being busy'],'He thinks he did more because he was busy, but he actually did less.'),
 vRe('L1','"add up" in the passage means:',['accumulate','disappear','balance out','divide'],'The lost moments pile up over the hour.'),
 vRe('L1','The specialists\' view of focus is that it is:',['a skill that can be developed through practice','an inborn talent that never changes','impossible to measure','dependent on the phone'],'"not a talent... but a habit built through practice."'),
 vRe('L2','The main idea of the passage is:',['the benefits of smart cities and the challenges they raise','how traffic lights work','types of urban waste','the history of street lighting'],'It presents the benefits, then the important questions, then the real measure of intelligence.'),
 vRe('L2','An example of a smart city in the passage is:',['bins that send an alert when they are full','driverless trains','buildings built by robots','schools without teachers'],'The bins are mentioned explicitly.'),
 vRe('L2','One risk of smart cities the passage mentions is:',['exposing residents\' privacy if data is not protected','more pollution','higher fuel prices','fewer traffic lights'],'"may reveal details of their private lives."'),
 vRe('L2','According to planners, a city\'s intelligence is measured by:',['its ability to serve residents while protecting their privacy','the number of devices in it','its population','its internet speed'],'Stated directly in the last sentence.'),
 vRe('L2','The style of the passage is:',['balanced, presenting benefits and concerns','promotional, praising the idea without reservation','opposed to technology','narrative'],'It presents benefits, then concerns, then a conclusion.'),
 vRe('L3','The best title for the passage is:',['Al-Ahsa: Water That Built a Civilization in the Desert','Modern Wells','The World Heritage List','Palm Farming Worldwide'],'The title combines the oasis, water and civilization.'),
 vRe('L3','Why did the people of Al-Ahsa share water precisely?',['to prevent disputes and protect each farmer\'s share','to sell the water','to reduce the number of palms','because the springs were salty'],'"preventing disputes and protecting each farmer\'s share."'),
 vRe('L3','According to the passage, many springs dried up because:',['more groundwater was drawn','there were fewer palms','markets were built','the oasis joined the heritage list'],'"as more groundwater was drawn, many springs dried up."'),
 vRe('L3','Al-Ahsa was added to the World Heritage List in recognition of:',['the interaction between people and their environment','its many modern wells','the size of its markets','its high temperatures'],'Stated directly.'),
 vRe('L3','The last sentence suggests that:',['good resource management is a foundation of civilization','the desert cannot support life','water alone is enough without organization','oases always disappear'],'"water, when managed wisely, can build a civilization."'),
 vRe('L4','The main idea of the passage is that:',['the effect of sound on studying depends on its type and the task','cafés are the best places to study','all sounds help focus','songs improve memorization'],'This is the central sentence of the passage.'),
 vRe('L4','Which sounds are most distracting according to the passage?',['understandable speech','rain','an air conditioner','continuous noise'],'Because the brain tries to understand what it hears.'),
 vRe('L4','The effect of heard speech is strongest in:',['language tasks such as reading and memorizing vocabulary','sorting papers','copying summaries','all mechanical tasks'],'Stated directly.'),
 vRe('L4','We can infer that a student reviewing a multiplication table:',['may tolerate more noise than a student reading a text','needs total silence','is never affected by any sound','should listen to a song'],'Mechanical tasks are less affected.'),
 vRe('L4','In "tries to understand what it hears," "it" refers to:',['the brain','the student nearby','the air conditioner','the passage'],'"the brain automatically tries to understand what it hears."'),
 vRe('L5','The main idea of the passage is:',['the Haramain railway: its challenges and its value to visitors','the history of Makkah','types of trains worldwide','causes of road accidents'],'The passage combines the change, the challenges and the value.'),
 vRe('L5','One challenge of building the railway mentioned is:',['drifting sand and high temperatures','a shortage of workers','lack of money','too many rivers'],'Stated directly.'),
 vRe('L5','The railway matters most:',['during the Hajj and Umrah seasons','only in winter','at night','on weekends'],'When millions travel in a limited number of days.'),
 vRe('L5','According to specialists, the project\'s success is measured by:',['running reliably on the busiest days','the train\'s speed alone','the number of stations','the colour of the carriages'],'Stated directly in the last sentence.'),
 vRe('L5','"eases" in the passage means:',['reduces','increases','causes','ignores'],'The train eases congestion: it reduces it.'),
 vRe('L6','The main idea of the passage is that:',['overfishing is a danger, and regulating fishing protects future livelihoods','fish are the only food source','wide nets are the best tools','the seas never run out'],'It defines the danger, then the solutions, then the conclusion.'),
 vRe('L6','Overfishing happens when:',['fish are caught faster than they can reproduce','fishing is banned in some seasons','only large fish are caught','reserves are created'],'An explicit definition.'),
 vRe('L6','Which measure is NOT mentioned in the passage?',['raising fish at home','fishing bans in some seasons','minimum fish sizes','marine reserves'],'Raising fish at home is not mentioned.'),
 vRe('L6','How does "an immediate loss" relate to "protect his livelihood in the future"?',['a contrast correcting a common view','cause and effect','an example','a synonym'],'"but in reality..." corrects the fisherman\'s view.'),
 vRe('L6','"drained" in the last sentence means:',['used up until nothing is left','cleaned','protected','widened'],'A drained sea gives nothing tomorrow.'),
 vRe('L7','The main idea of the passage is:',['how the digits travelled the world and why their system is powerful','the life of al-Khwarizmi','translation into Latin','the shapes of Arabic letters'],'It follows the journey, then explains the genius.'),
 vRe('L7','Where did the number system begin according to the passage?',['India','Europe','Egypt','Greece'],'"This system began in India."'),
 vRe('L7','The system\'s genius lies in:',['place value and the zero','many symbols','special tools','the shapes of the digits'],'The two points stated explicitly.'),
 vRe('L7','Why were the digits called "Arabic numerals" in Europe?',['they reached Europe through a translated Arabic book','they began in Arabia','the Arabs invented only the zero','they are written right to left'],'They came through al-Khwarizmi\'s book translated into Latin.'),
 vRe('L7','The last sentence suggests that:',['a different shape does not mean a different origin','European digits are older','Eastern digits have no link to India','digit shapes never changed'],'"even though they share the same origin."'),
 vRe('L8','The main idea of the passage is:',['wind power\'s benefits, its challenges and how they are overcome','how blades are made','bird migration','electricity prices'],'It presents the benefits, the challenges and the solution.'),
 vRe('L8','One benefit of wind power mentioned is that it:',['produces no polluting gases while running','always runs at the same strength','needs no land','needs no site studies'],'Stated directly.'),
 vRe('L8','Why does wind power need storage?',['wind strength varies, so output varies','it runs out','it pollutes','turbines are small'],'"electricity output changes from hour to hour."'),
 vRe('L8','In "each fills the gaps of the others," "the others" refers to:',['other energy sources','birds','turbines','countries'],'Each source fills the gaps of the other sources.'),
 vRe('L8','We can infer that relying on a single energy source:',['may cause electricity shortages','is the ideal solution','does not affect output','removes the need for planning'],'That is why countries combine sources.'),
 vRe('L9','The main idea of the passage is that:',['helpful bacteria matter, and antibiotics should be used wisely','all germs are harmful','sugar is good for the gut','antibiotics are useless'],'It changes the view of germs, then guides correct use.'),
 vRe('L9','One benefit of helpful bacteria mentioned is:',['making some vitamins','cleaning teeth','lowering fever','directly strengthening bones'],'"making vitamins."'),
 vRe('L9','Why do doctors warn against careless antibiotic use?',['antibiotics kill helpful and harmful bacteria together','they are expensive','they increase sugar','they kill no bacteria'],'Stated directly.'),
 vRe('L9','The author\'s attitude toward antibiotics is that he:',['values them and urges using them only when needed','calls for abandoning them','calls for using more of them','is not interested in them'],'"This does not mean abandoning antibiotics... it means using them only when a doctor prescribes them."'),
 vRe('L9','"competing" in the passage means:',['struggling for the same thing','helping','joining','escaping'],'They compete with harmful germs for space and food.'),
 vRe('L10','The main idea of the passage is:',['how museums\' role changed, between interaction and fear of the show taking over','the history of old museums','how replicas are made','museum ticket prices'],'It presents the shift and the views of supporters and critics.'),
 vRe('L10','Supporters believe the interactive shift has:',['attracted new audiences such as children and young people','driven visitors away','reduced the number of objects','raised prices'],'Stated directly.'),
 vRe('L10','Critics fear that:',['screens will overshadow the original object','museums will close','there will be fewer screens','objects will be stolen'],'Stated directly.'),
 vRe('L10','How do the supporters\' and critics\' views relate?',['contrast','cause and effect','example','synonym'],'"Others fear..." introduces a contrast.'),
 vRe('L10','The last sentence suggests that the author:',['accepts technology if it serves the object','rejects technology completely','prefers screens to objects','sees no difference between the show and the history'],'Technology is acceptable if it brings visitors closer to the object.'),
 vRe('L11','The main idea of the passage is:',['how a suspension bridge carries loads and why wind threatens it','the history of rivers','types of cars','how concrete is made'],'It explains load transfer and then the danger of wind.'),
 vRe('L11','The order in which the weight of cars travels is:',['vertical cables, main cables, towers, ground','towers, cables, road','ground, towers, cables','concrete blocks, cars'],'Stated directly.'),
 vRe('L11','Engineers learned from earlier accidents that:',['wind is more dangerous to these bridges than weight','weight is more dangerous than wind','towers are unnecessary','concrete cannot withstand water'],'Stated directly.'),
 vRe('L11','Why are bridge models tested in wind tunnels?',['to prevent swaying and collapse caused by wind','to measure car speeds','to test their colours','to cut their cost'],'After a bridge collapsed from swaying in the wind.'),
 vRe('L11','"graceful" in the passage means:',['elegant and well-proportioned','heavy','old','broken'],'Context: it looks light and graceful.'),
 vRe('L12','The main idea of the passage is:',['the causes of desertification, how to fight it and how to judge success','the benefits of grazing','types of trees','low rainfall alone'],'It defines desertification, its causes and how to fight it.'),
 vRe('L12','According to the passage, desertification is caused by:',['low rainfall together with harmful human practices','low rainfall alone','too many trees','wind only'],'"not caused by low rainfall alone; people contribute to it."'),
 vRe('L12','What happens to the soil when plant cover disappears?',['it is exposed, blown away by wind and washed away by floods','it becomes more fertile','it turns into water','nothing changes'],'Stated directly.'),
 vRe('L12','Specialists say tree planting succeeds when measured by:',['the number of trees still alive years later','the number of seedlings planted','planting speed','the tools used'],'Stated directly.'),
 vRe('L12','Why are local plants preferred?',['they tolerate drought and suit the environment','they are always cheaper','they grow fastest everywhere','they need no water at all'],'Stated directly in the last sentence.')
);
/* new contextual-error items (error position spread across the four words) and subtler odd-word items */
VB_AR.push(
 vCx('اشتهر الطبيب بدقته، فكان يتسرع في تشخيص مرضاه.',['اشتهر','بدقته','يتسرع','مرضاه'],2,'الصحيح «يتأنى»؛ الدقة تقتضي التأني.'),
 vCx('ازدهرت التجارة في المدينة حين قلّت الطرق الآمنة إليها.',['ازدهرت','التجارة','قلّت','الآمنة'],2,'الصحيح «كثرت»؛ الازدهار يرتبط بكثرة الطرق الآمنة.'),
 vCx('أهمل اللاعب تدريباته طوال الموسم، فحقق أفضل أداء في مسيرته.',['أهمل','تدريباته','الموسم','أفضل'],0,'الصحيح «واظب على».'),
 vCx('يُنصح المسافر بشرب الماء بكثرة في الطقس الحار لتجنب الارتواء.',['يُنصح','بكثرة','الحار','الارتواء'],3,'الصحيح «الجفاف».'),
 vCx('خفّض المتجر أسعاره، فقلّ إقبال الزبائن عليه.',['خفّض','أسعاره','فقلّ','الزبائن'],2,'الصحيح «فزاد».'),
 vCx('اختار الكاتب كلماته بعناية، فجاءت عبارته غامضة ومفهومة للجميع.',['اختار','بعناية','غامضة','للجميع'],2,'الصحيح «واضحة».'),
 vCx('تزداد الحاجة إلى المظلات في الأيام الجافة.',['تزداد','الحاجة','المظلات','الجافة'],3,'الصحيح «الماطرة».'),
 vCx('تأخر القطار عن موعده، فوصل الركاب مبكرين إلى أعمالهم.',['تأخر','موعده','مبكرين','أعمالهم'],2,'الصحيح «متأخرين».'),
 vCx('يتميز الصقر بحدة بصره، فيرى فريسته من مسافة قريبة جدًا.',['يتميز','بحدة','فريسته','قريبة'],3,'الصحيح «بعيدة».'),
 vCx('يستهلك المصباح الموفّر طاقة أكبر من المصباح العادي.',['يستهلك','الموفّر','أكبر','العادي'],2,'الصحيح «أقل».'),
 vCx('كان الجو هادئًا في المكتبة، فلم يستطع الطلاب التركيز.',['هادئًا','المكتبة','يستطع','التركيز'],0,'الصحيح «صاخبًا».'),
 vCx('لأن النبتة تحتاج إلى الماء، قلّل المزارع ريّها في الصيف.',['تحتاج','الماء','قلّل','الصيف'],2,'الصحيح «زاد».'),
 vCx('نجح الفريق لأن أعضاءه تفرقوا وعمل كل منهم وحده.',['نجح','أعضاءه','تفرقوا','وحده'],2,'الصحيح «تعاونوا».'),
 vCx('الكتاب المفيد صديق مخلص يُضيع وقتك.',['المفيد','صديق','مخلص','يُضيع'],3,'الصحيح «يُثري».'),
 vCx('ارتفعت حرارة المريض، فوضعت أمه على جبينه كمادات دافئة لتخفيضها.',['ارتفعت','جبينه','دافئة','لتخفيضها'],2,'الصحيح «باردة».'),
 vCx('يقوي النوم الكافي الذاكرة ويُضعف القدرة على التعلم.',['يقوي','الكافي','الذاكرة','يُضعف'],3,'الصحيح «يعزز».'),
 vCx('أُغلق الطريق بسبب الصيانة، فوصلنا عبر الطريق المعتاد.',['أُغلق','الصيانة','وصلنا','المعتاد'],3,'الصحيح «البديل».'),
 vCx('الجبان يقتحم المخاطر دون تردد.',['الجبان','يقتحم','المخاطر','تردد'],0,'الصحيح «الشجاع».'),
 vOdA(['مِبضع','مِشرط','مِقص','مِحراث'],3,'البقية أدوات قطع، والمحراث أداة لحرث الأرض.'),
 vOdA(['يناير','مارس','مايو','الأحد'],3,'البقية شهور، والأحد يوم.'),
 vOdA(['الكيلوغرام','الطن','الغرام','اللتر'],3,'البقية وحدات كتلة، واللتر وحدة حجم.'),
 vOdA(['المثلث','المربع','المخمس','المكعب'],3,'البقية أشكال مستوية، والمكعب مجسم.'),
 vOdA(['الإيجاز','الاختصار','التلخيص','الإسهاب'],3,'البقية تقليل للكلام، والإسهاب إطالة.'),
 vOdA(['الرئة','القلب','الكلية','العظم'],3,'البقية أعضاء داخلية، والعظم نسيج هيكلي.'),
 vOdA(['الزئبق','الحديد','النحاس','الأكسجين'],3,'البقية عناصر فلزية، والأكسجين لافلز.'),
 vOdA(['الصدق','الأمانة','الوفاء','الكسل'],3,'البقية فضائل، والكسل صفة مذمومة.')
);
VB_EN.push(
 vCx('The doctor was known for his precision, so he rushed his diagnoses.',['known','precision','rushed','diagnoses'],2,'It should be "took care over"; precision requires care.'),
 vCx('Trade in the city flourished when safe routes to it became fewer.',['Trade','flourished','safe','fewer'],3,'It should be "more numerous."'),
 vCx('The player neglected his training all season, so he gave the best performance of his career.',['neglected','training','season','best'],0,'It should be "kept up."'),
 vCx('Travellers are advised to drink plenty of water in hot weather to avoid hydration.',['advised','plenty','hot','hydration'],3,'It should be "dehydration."'),
 vCx('The shop cut its prices, so fewer customers came.',['cut','prices','fewer','customers'],2,'It should be "more."'),
 vCx('The writer chose his words carefully, so his sentence was vague and clear to everyone.',['chose','carefully','vague','everyone'],2,'It should be "plain."'),
 vCx('The need for umbrellas grows on dry days.',['need','umbrellas','grows','dry'],3,'It should be "rainy."'),
 vCx('The train was late, so the passengers reached work early.',['train','late','reached','early'],3,'It should be "late."'),
 vCx('The falcon has sharp eyesight, so it sees its prey from very close up.',['falcon','sharp','prey','close'],3,'It should be "far away."'),
 vCx('An energy-saving bulb uses more power than an ordinary bulb.',['energy-saving','uses','more','ordinary'],2,'It should be "less."'),
 vCx('The library was quiet, so the students could not concentrate.',['library','quiet','students','concentrate'],1,'It should be "noisy."'),
 vCx('Because the plant needs water, the farmer watered it less in summer.',['plant','needs','less','summer'],2,'It should be "more."'),
 vCx('The team succeeded because its members split up and each worked alone.',['succeeded','members','split','alone'],2,'It should be "worked together."'),
 vCx('A useful book is a loyal friend that wastes your time.',['useful','loyal','friend','wastes'],3,'It should be "enriches."'),
 vCx('The patient\'s fever rose, so his mother put warm compresses on his forehead to lower it.',['fever','rose','warm','lower'],2,'It should be "cold."'),
 vCx('Enough sleep strengthens memory and weakens the ability to learn.',['Enough','strengthens','memory','weakens'],3,'It should be "boosts."'),
 vCx('The road was closed for repairs, so we arrived by the usual road.',['closed','repairs','arrived','usual'],3,'It should be "alternative."'),
 vCx('A coward faces danger without hesitation.',['coward','faces','danger','hesitation'],0,'It should be "brave person."'),
 vOdE(['scalpel','razor','scissors','plough'],3,'The others are cutting tools; a plough turns soil.'),
 vOdE(['January','March','May','Sunday'],3,'The others are months; Sunday is a day.'),
 vOdE(['kilogram','tonne','gram','litre'],3,'The others measure mass; a litre measures volume.'),
 vOdE(['triangle','square','pentagon','cube'],3,'The others are flat shapes; a cube is a solid.'),
 vOdE(['brevity','conciseness','summary','verbosity'],3,'The others mean saying less; verbosity means saying more.'),
 vOdE(['lung','heart','kidney','bone'],3,'The others are internal organs; bone is skeletal tissue.'),
 vOdE(['mercury','iron','copper','oxygen'],3,'The others are metals; oxygen is a non-metal.'),
 vOdE(['honesty','trustworthiness','loyalty','laziness'],3,'The others are virtues; laziness is a fault.')
);

/* ============ Verbal bank expansion (AR + EN) ============ */
Object.assign(PASSAGES.ar,{
  P4:'الوقف في الحضارة الإسلامية هو حبس أصل المال وتسبيل منفعته، أي أن يبقى الأصل ثابتًا لا يُباع ولا يُورث، وتُصرف غلّته في وجوه الخير. وقد أسهمت الأوقاف عبر القرون في بناء المدارس والمستشفيات وحفر الآبار، حتى إن بعض المدن كانت تعتمد عليها في تعليم أبنائها وعلاج مرضاها. ويرى الباحثون أن سرّ استمرار الوقف قرونًا طويلة يكمن في فكرته الأساسية: الأصل باقٍ والنفع متجدد.',
  P5:'يلاحظ المعلمون أن كثيرًا من الطلاب يجدون صعوبة في التركيز مدة طويلة. ويعزو بعض الباحثين ذلك إلى الاستخدام المفرط للهواتف الذكية، إذ تعوّد التنبيهات المتكررة الدماغ على التنقل السريع بين المهام. غير أن الحل لا يكمن في منع الهاتف تمامًا، بل في تنظيم استخدامه، كأن يخصص الطالب أوقاتًا للمذاكرة يُبعد فيها هاتفه عن متناوله، ثم يكافئ نفسه بعدها بوقت قصير لاستخدامه.',
  P6:'تعتمد مناطق كثيرة في شبه الجزيرة العربية على المياه الجوفية، وهي مياه تجمعت في طبقات الأرض عبر آلاف السنين. وتكمن خطورة الإسراف في استخدامها في أن تجدّدها بطيء جدًا مقارنة بسرعة استهلاكها، فما يُستنزف في عقود قد يحتاج إلى قرون ليعود. لذلك تتجه الخطط الحديثة إلى تحلية مياه البحر وإعادة تدوير المياه المستعملة في الزراعة.',
  P7:'مرّ الخط العربي بمراحل تطور عديدة، فقد كان في بداياته خاليًا من النقط والتشكيل، ثم أُضيفت إليه النقاط لتمييز الحروف المتشابهة، والحركات لضبط النطق، حين كثر الداخلون في الإسلام من غير العرب وخِيف على القرآن من اللحن. ثم تحوّل الخط من أداة للكتابة إلى فن قائم بذاته، له مدارسه وأنواعه كالنسخ والثلث والديواني والكوفي.',
  P8:'يَعِد الذكاء الاصطناعي بتعليم يتكيّف مع كل طالب، فيقدّم له التمارين التي تناسب مستواه ويشرح له ما أخطأ فيه فورًا. لكن الخبراء يحذّرون من أن الاعتماد الكامل عليه قد يُضعف قدرة الطالب على التفكير المستقل إذا صار يطلب الإجابة قبل أن يحاول. ويرون أن أفضل استخدام له أن يكون مدرّبًا يطرح الأسئلة ويوجّه، لا آلة تعطي الحلول الجاهزة.'
});
Object.assign(PASSAGES.en,{
  P4:'In Islamic civilization, a waqf (endowment) means holding the original asset permanently while dedicating its benefit to charity: the asset stays fixed, it cannot be sold or inherited, and its revenue is spent on good causes. Over the centuries, endowments helped build schools and hospitals and dig wells, so much so that some cities relied on them to educate their children and treat their sick. Researchers believe the secret of the waqf\'s survival across centuries lies in its core idea: the asset remains and the benefit renews.',
  P5:'Teachers notice that many students struggle to concentrate for long periods. Some researchers attribute this to excessive smartphone use, since frequent notifications train the brain to switch quickly between tasks. However, the solution is not to ban the phone completely but to organize its use, for example by setting study periods in which the phone is kept out of reach, followed by a short reward period of phone use.',
  P6:'Many regions of the Arabian Peninsula depend on groundwater, water that has accumulated in layers of the earth over thousands of years. The danger of overusing it lies in the fact that it renews very slowly compared with how fast it is consumed; what is drained in decades may take centuries to return. Modern plans therefore focus on desalinating seawater and recycling used water for agriculture.',
  P7:'Arabic script went through many stages of development. At first it had no dots or vowel marks. Dots were later added to distinguish similar letters, and vowel marks to fix pronunciation, when many non-Arabs entered Islam and there was fear of errors in reciting the Quran. Later, calligraphy turned from a writing tool into an art in its own right, with schools and styles such as Naskh, Thuluth, Diwani and Kufic.',
  P8:'Artificial intelligence promises education that adapts to each student, offering exercises that fit their level and explaining their mistakes instantly. Experts warn, however, that relying on it completely may weaken a student\'s ability to think independently if they ask for the answer before trying. They argue that the best use of AI is as a coach that asks questions and guides, not a machine that hands out ready-made solutions.'
});

VB_AR.push(
 // completion
 {s:'completion',q:'لم يكن الفوز ...... بل كان ثمرة تدريب طويل.',o:['صدفة','مستحقًا','متوقعًا','صعبًا'],a:0,e:'«بل» تنفي ما قبلها: الفوز لم يكن صدفة.'},
 {s:'completion',q:'يُعرف الحليم بقدرته على ...... غضبه في المواقف الصعبة.',o:['كظم','إظهار','إشعال','نسيان'],a:0,e:'الحِلم: كظم الغضب.'},
 {s:'completion',q:'القناعة كنز لا ......',o:['يفنى','يُرى','يُشترى','يُعدّ'],a:0,e:'مثل مشهور: القناعة كنز لا يفنى.'},
 {s:'completion',q:'على الرغم من ...... الإمكانات، حقق الفريق نتائج مبهرة.',o:['محدودية','وفرة','تنوع','ضخامة'],a:0,e:'«على الرغم من» تتطلب نقيض النتائج المبهرة.'},
 {s:'completion',q:'لا تؤجل عمل اليوم إلى ......',o:['الغد','الأمس','المساء','الأسبوع'],a:0,e:'مثل مشهور.'},
 {s:'completion',q:'أدى ...... الأمطار هذا العام إلى جفاف الآبار.',o:['شحّ','غزارة','انتظام','كثرة'],a:0,e:'الجفاف نتيجة قلة المطر.'},
 {s:'completion',q:'تعتمد النباتات على البناء ...... لصنع غذائها.',o:['الضوئي','الحراري','الكيميائي','المائي'],a:0,e:'البناء الضوئي مصطلح علمي ثابت.'},
 {s:'completion',q:'الصديق وقت ......',o:['الضيق','الفرح','الغنى','السفر'],a:0,e:'مثل: الصديق وقت الضيق.'},
 {s:'completion',q:'كان حديثه ...... فلم يفهم الحاضرون مقصده.',o:['غامضًا','واضحًا','موجزًا','دقيقًا'],a:0,e:'عدم الفهم نتيجة الغموض.'},
 {s:'completion',q:'يحرص التاجر الأمين على ...... الكيل والميزان.',o:['إيفاء','إنقاص','كسر','إخفاء'],a:0,e:'الأمانة تقتضي إيفاء الكيل.'},
 {s:'completion',q:'العالم الحقيقي كلما ازداد علمًا ازداد ......',o:['تواضعًا','غرورًا','بعدًا','انعزالًا'],a:0,e:'الربط بين العلم الحقيقي والتواضع.'},
 {s:'completion',q:'من أمن العقوبة أساء ......',o:['الأدب','الظن','الفهم','القول'],a:0,e:'مثل مشهور.'},
 {s:'completion',q:'تُعد الصحراء بيئة ...... لقلة المياه وارتفاع الحرارة.',o:['قاسية','رطبة','معتدلة','خصبة'],a:0,e:'قلة الماء وارتفاع الحرارة تعني القسوة.'},
 {s:'completion',q:'يحتاج البحث العلمي إلى ...... وصبر، فالنتائج لا تأتي سريعًا.',o:['مثابرة','عجلة','ملل','تردد'],a:0,e:'المثابرة تناسب الصبر وبطء النتائج.'},
 {s:'completion',q:'إذا ...... الإنسان وقته، ضاعت منه فرص كثيرة.',o:['أهدر','نظّم','استثمر','قدّر'],a:0,e:'ضياع الفرص نتيجة إهدار الوقت.'},
 {s:'completion',q:'كان القرار ...... لأنه اتُّخذ بعد دراسة متأنية.',o:['صائبًا','متسرعًا','خاطئًا','عشوائيًا'],a:0,e:'الدراسة المتأنية سبب الصواب.'},
 {s:'completion',q:'اللغة وعاء ...... والحضارة.',o:['الفكر','الماء','الطعام','المال'],a:0,e:'تعبير شائع: اللغة وعاء الفكر.'},
 {s:'completion',q:'حتى تكون مستمعًا جيدًا، عليك أن ...... محدّثك دون مقاطعة.',o:['تُنصت إلى','تتجاهل','تقاطع','تنتقد'],a:0,e:'الاستماع الجيد إنصات.'},
 {s:'completion',q:'في الحركة ......',o:['بركة','خسارة','تعب','ملل'],a:0,e:'مثل: في الحركة بركة.'},
 {s:'completion',q:'كان المسافر ...... من طول الطريق، فجلس ليستريح.',o:['مُنهكًا','نشيطًا','مسرورًا','مستعجلًا'],a:0,e:'الاستراحة نتيجة الإنهاك.'},
 {s:'completion',q:'تزداد قيمة المعلومة كلما كانت ...... ومن مصدر موثوق.',o:['دقيقة','مبهمة','مكررة','ناقصة'],a:0,e:'الدقة تناسب الموثوقية.'},
 {s:'completion',q:'خير الكلام ما قلّ و......',o:['دلّ','طال','كثر','سهل'],a:0,e:'مثل مشهور.'},
 {s:'completion',q:'النوم الكافي ...... الذاكرة، ...... السهر يضعفها.',o:['يقوّي / بينما','يضعف / لأن','يقوّي / لذلك','يشتّت / و'],a:0,e:'مقابلة بين أثرين متضادين تتطلب «بينما».'},
 {s:'completion',q:'ليس الفتى من يقول كان أبي، إن ...... من يقول ها أنا ذا.',o:['الفتى','الشاعر','العالم','الكريم'],a:0,e:'بيت مشهور يكرر الكلمة نفسها.'},
 {s:'completion',q:'كلما ازداد الضغط على الغاز ...... حجمه عند ثبوت درجة حرارته.',o:['قلّ','زاد','ثبت','تضاعف'],a:0,e:'العلاقة عكسية بين الضغط والحجم.'},
 // context
 {s:'context',q:'الشمس مصدر الظلام والدفء على كوكب الأرض.',o:['الظلام','الدفء','كوكب','الأرض'],a:0,e:'الصحيح «الضوء».'},
 {s:'context',q:'يحرص المزارع على سقي أرضه وقت الظهيرة ليقلل تبخر الماء.',o:['يحرص','سقي','الظهيرة','تبخر'],a:2,e:'الصحيح «الصباح الباكر» أو «المساء».'},
 {s:'context',q:'يذوب الثلج عند انخفاض درجة الحرارة فيتحول إلى ماء.',o:['انخفاض','الحرارة','يتحول','ماء'],a:0,e:'الصحيح «ارتفاع».'},
 {s:'context',q:'كان الجو ممطرًا، فترك الناس المظلات ولبسوا المعاطف الواقية من المطر.',o:['ممطرًا','ترك','المعاطف','الواقية'],a:1,e:'الصحيح «حمل».'},
 {s:'context',q:'لأن المكتبة هادئة يقصدها الطلاب للمذاكرة والحديث بصوت مرتفع والتركيز.',o:['هادئة','يقصدها','للمذاكرة','مرتفع'],a:3,e:'الهدوء والتركيز ينفيان الصوت المرتفع؛ الصحيح «منخفض».'},
 {s:'context',q:'يتميز الجمل بقدرته على تحمل العطش، لذا يُعد أضعف الحيوانات ملاءمة للصحراء.',o:['يتميز','تحمل','العطش','أضعف'],a:3,e:'الصحيح «أكثر».'},
 {s:'context',q:'كان القائد حكيمًا، يستمع لآراء فريقه ثم يتخذ قراراته بتهوّر.',o:['حكيمًا','يستمع','آراء','بتهوّر'],a:3,e:'الصحيح «بتأنٍّ».'},
 {s:'context',q:'استيقظ مبكرًا فأدرك الحافلة، لكنه وصل إلى المدرسة قبل الجميع.',o:['مبكرًا','فأدرك','لكنه','قبل'],a:2,e:'أداة الربط خاطئة؛ الوصول المبكر نتيجة لا استدراك، والصحيح «فـ».'},
 {s:'context',q:'تنمو النباتات وتزدهر إذا حُرمت من الماء والضوء الكافيين.',o:['تنمو','تزدهر','حُرمت','الكافيين'],a:2,e:'الصحيح «حصلت على».'},
 {s:'context',q:'بذل اللاعب جهدًا كبيرًا في التدريب، فتراجع مستواه وتألق في المباراة.',o:['جهدًا','التدريب','تراجع','تألق'],a:2,e:'الصحيح «تحسّن».'},
 {s:'context',q:'كلما قرأ الإنسان أكثر، ضعفت حصيلته اللغوية واتسعت ثقافته.',o:['قرأ','ضعفت','حصيلته','اتسعت'],a:1,e:'الصحيح «زادت».'},
 {s:'context',q:'أُغلق المتجر بسبب الإقبال الكبير عليه وكثرة أرباحه.',o:['أُغلق','الإقبال','الكبير','أرباحه'],a:0,e:'الإقبال والأرباح يقتضيان «توسّع».'},
 {s:'context',q:'اشتهر حاتم الطائي ببخله حتى صار يُضرب به المثل في الكرم.',o:['ببخله','يُضرب','المثل','الكرم'],a:0,e:'الصحيح «بكرمه».'},
 {s:'context',q:'يزداد الطلب على المراوح في فصل الشتاء بسبب شدة الحرارة.',o:['يزداد','الطلب','المراوح','الشتاء'],a:3,e:'الصحيح «الصيف».'},
 {s:'context',q:'حين اشتد الظلام أطفأنا المصابيح لنرى الطريق بوضوح.',o:['اشتد','الظلام','أطفأنا','بوضوح'],a:2,e:'الصحيح «أشعلنا».'},
 // reading P4-P8
 {s:'reading',p:'P4',q:'المقصود بـ«تسبيل المنفعة» في النص:',o:['صرف غلّة الوقف في وجوه الخير','بيع الأصل الموقوف','توريث الأصل للأبناء','تجميد الأصل دون الانتفاع به'],a:0,e:'«وتُصرف غلّته في وجوه الخير».'},
 {s:'reading',p:'P4',q:'من إسهامات الأوقاف المذكورة في النص:',o:['بناء المستشفيات','تمويل الجيوش','سكّ العملة','إنشاء الموانئ'],a:0,e:'«بناء المدارس والمستشفيات وحفر الآبار».'},
 {s:'reading',p:'P4',q:'سرّ استمرار الوقف حسب الباحثين:',o:['بقاء الأصل وتجدد النفع','كثرة الواقفين','دعم الدولة','ارتفاع قيمة الأصول'],a:0,e:'«الأصل باقٍ والنفع متجدد».'},
 {s:'reading',p:'P4',q:'يُفهم من النص أن الأصل الموقوف:',o:['لا يُباع ولا يُورث','يُباع عند الحاجة','ينتقل إلى الورثة','يُوزَّع على الفقراء'],a:0,e:'نص صريح في أوله. الذي يُصرف هو الغلّة لا الأصل.'},
 {s:'reading',p:'P5',q:'سبب ضعف التركيز حسب بعض الباحثين:',o:['الاستخدام المفرط للهواتف','صعوبة المناهج','قلة النوم','كثرة الواجبات'],a:0,e:'«يعزو بعض الباحثين ذلك إلى الاستخدام المفرط».'},
 {s:'reading',p:'P5',q:'الحل الذي يقترحه النص:',o:['تنظيم استخدام الهاتف','منع الهاتف تمامًا','زيادة ساعات المذاكرة','تقليل الواجبات'],a:0,e:'«الحل لا يكمن في منع الهاتف تمامًا، بل في تنظيم استخدامه».'},
 {s:'reading',p:'P5',q:'كلمة «يعزو» في النص تعني:',o:['ينسب','ينفي','يقارن','يؤجل'],a:0,e:'عزا الأمر إلى كذا: نسبه إليه.'},
 {s:'reading',p:'P5',q:'موقف الكاتب من الهاتف:',o:['معتدل يدعو إلى التنظيم','رافض له كليًا','مؤيد لاستخدامه بلا قيود','غير مهتم بالقضية'],a:0,e:'يرفض المنع التام ويدعو إلى التنظيم.'},
 {s:'reading',p:'P6',q:'المياه الجوفية حسب النص:',o:['تجمعت عبر آلاف السنين','تتجدد بسرعة','مصدرها البحر مباشرة','تُستخدم في الصناعة فقط'],a:0,e:'«تجمعت في طبقات الأرض عبر آلاف السنين».'},
 {s:'reading',p:'P6',q:'تكمن خطورة الإسراف في المياه الجوفية في:',o:['بطء تجددها','ارتفاع ملوحتها','صعوبة استخراجها','قلة استخدامها'],a:0,e:'«تجدّدها بطيء جدًا مقارنة بسرعة استهلاكها».'},
 {s:'reading',p:'P6',q:'من الحلول المذكورة في النص:',o:['إعادة تدوير المياه المستعملة','حفر آبار أعمق','استيراد المياه','التوسع في الزراعة'],a:0,e:'«تحلية مياه البحر وإعادة تدوير المياه المستعملة».'},
 {s:'reading',p:'P6',q:'الغرض من المقابلة بين «عقود» و«قرون»:',o:['بيان الفرق بين سرعة الاستنزاف وبطء التجدد','الترادف بين الكلمتين','التعبير عن السبب والنتيجة','التفصيل بعد الإجمال'],a:0,e:'ما يُستنزف في عقود يحتاج قرونًا ليعود.'},
 {s:'reading',p:'P7',q:'سبب إضافة النقاط والحركات إلى الخط العربي:',o:['الخوف من اللحن مع كثرة الداخلين في الإسلام من غير العرب','تزيين الخط','تسريع الكتابة','توحيد أنواع الخطوط'],a:0,e:'نص صريح في الجملة الأولى.'},
 {s:'reading',p:'P7',q:'الفكرة الرئيسة للنص:',o:['تطور الخط العربي من أداة كتابة إلى فن','أنواع الخط الكوفي','تاريخ دخول غير العرب في الإسلام','طرق تعلم الخط'],a:0,e:'النص يتتبع مراحل التطور.'},
 {s:'reading',p:'P7',q:'ليس من أنواع الخط المذكورة في النص:',o:['الرقعة','النسخ','الثلث','الديواني'],a:0,e:'الرقعة لم تُذكر في النص.'},
 {s:'reading',p:'P7',q:'«اللحن» في النص يعني:',o:['الخطأ في النطق','الغناء','الإسراع في القراءة','الزخرفة'],a:0,e:'السياق: الخوف على القرآن من الخطأ في القراءة.'},
 {s:'reading',p:'P8',q:'من مزايا الذكاء الاصطناعي في التعليم حسب النص:',o:['تكييف التمارين حسب مستوى الطالب','إلغاء دور المعلم','تقليل ساعات الدراسة','تقديم الحلول دون شرح'],a:0,e:'«يقدّم له التمارين التي تناسب مستواه».'},
 {s:'reading',p:'P8',q:'يحذّر الخبراء من:',o:['إضعاف التفكير المستقل','ارتفاع التكلفة','صعوبة الاستخدام','قلة التمارين'],a:0,e:'«قد يُضعف قدرة الطالب على التفكير المستقل».'},
 {s:'reading',p:'P8',q:'أفضل استخدام للذكاء الاصطناعي حسب النص:',o:['مدرّب يسأل ويوجّه','مصدر للحلول الجاهزة','بديل عن الكتب','أداة للترفيه'],a:0,e:'«مدرّبًا يطرح الأسئلة ويوجّه».'},
 {s:'reading',p:'P8',q:'«يَعِد» في النص تعني:',o:['يبشّر بإمكانية','يحسب','يهدّد','يجهّز'],a:0,e:'من الوعد لا من العدّ.'}
);

VB_EN.push(
 {s:'completion',q:'The victory was not a matter of ______; it was the result of years of training.',o:['luck','merit','skill','practice'],a:0,e:'The semicolon contrasts luck with training.'},
 {s:'completion',q:'A patient person can ______ his anger even in difficult situations.',o:['control','display','provoke','forget'],a:0,e:'Patience means controlling anger.'},
 {s:'completion',q:'Despite its ______ resources, the team achieved impressive results.',o:['limited','abundant','varied','enormous'],a:0,e:'"Despite" needs the opposite of impressive results.'},
 {s:'completion',q:'The ______ of rain this year caused the wells to dry up.',o:['scarcity','abundance','regularity','intensity'],a:0,e:'Dry wells result from little rain.'},
 {s:'completion',q:'Plants rely on ______ to produce their food.',o:['photosynthesis','erosion','reflection','digestion'],a:0,e:'A fixed scientific term.'},
 {s:'completion',q:'His speech was so ______ that the audience could not grasp his point.',o:['vague','clear','concise','precise'],a:0,e:'Not understanding follows from vagueness.'},
 {s:'completion',q:'An honest merchant always gives ______ measure.',o:['full','short','broken','hidden'],a:0,e:'Honesty means full measure.'},
 {s:'completion',q:'The more a true scholar learns, the more ______ he becomes.',o:['humble','arrogant','distant','careless'],a:0,e:'Knowledge linked to humility.'},
 {s:'completion',q:'The desert is a ______ environment because of scarce water and high temperatures.',o:['harsh','humid','mild','fertile'],a:0,e:'Scarce water and heat mean harshness.'},
 {s:'completion',q:'Scientific research requires ______, since results rarely come quickly.',o:['perseverance','haste','boredom','hesitation'],a:0,e:'Slow results call for perseverance.'},
 {s:'completion',q:'If you ______ your time, you will miss many opportunities.',o:['waste','organize','invest','value'],a:0,e:'Missed chances follow wasted time.'},
 {s:'completion',q:'The decision was ______ because it was made after careful study.',o:['sound','hasty','wrong','random'],a:0,e:'Careful study leads to a sound decision.'},
 {s:'completion',q:'To be a good listener, you should ______ the speaker without interrupting.',o:['attend to','ignore','interrupt','criticize'],a:0,e:'Good listening means attending.'},
 {s:'completion',q:'The traveler was ______ after the long journey, so he sat down to rest.',o:['exhausted','energetic','delighted','hurried'],a:0,e:'Resting follows exhaustion.'},
 {s:'completion',q:'Information becomes more valuable when it is ______ and comes from a reliable source.',o:['accurate','vague','repeated','incomplete'],a:0,e:'Accuracy fits reliability.'},
 {s:'completion',q:'Sleep strengthens memory, ______ staying up late weakens it.',o:['whereas','because','therefore','so'],a:0,e:'Two opposite effects need "whereas".'},
 {s:'completion',q:'She was so ______ by the unexpected news that she could not speak for a moment.',o:['stunned','bored','prepared','amused'],a:0,e:'Speechlessness follows shock.'},
 {s:'completion',q:'Because the instructions were ______, everyone completed the task without errors.',o:['explicit','confusing','missing','contradictory'],a:0,e:'No errors follow clear instructions.'},
 {s:'completion',q:'The company\'s profits ______ after it launched a successful product.',o:['soared','collapsed','vanished','stagnated'],a:0,e:'Success raises profits.'},
 {s:'completion',q:'Although he was ______, he always found time to help others.',o:['busy','free','idle','bored'],a:0,e:'"Although" contrasts with finding time.'},
 {s:'completion',q:'The ancient city lay ______ for centuries until archaeologists discovered it.',o:['buried','celebrated','crowded','rebuilt'],a:0,e:'Discovery implies it was hidden.'},
 {s:'completion',q:'Practice makes ______.',o:['perfect','tired','slow','lazy'],a:0,e:'A common saying.'},
 {s:'completion',q:'Fossil fuels are ______ resources; once used, they cannot be replaced quickly.',o:['nonrenewable','renewable','infinite','recycled'],a:0,e:'The second clause defines nonrenewable.'},
 {s:'completion',q:'The more pressure is applied to a gas at constant temperature, the ______ its volume becomes.',o:['smaller','larger','steadier','heavier'],a:0,e:'Pressure and volume are inversely related.'},
 {s:'completion',q:'A friend in need is a friend ______.',o:['indeed','forever','nearby','later'],a:0,e:'A common proverb.'},
 {s:'context',q:'The sun is the main source of darkness and warmth on Earth.',o:['sun','source','darkness','warmth'],a:2,e:'It should be "light".'},
 {s:'context',q:'Farmers water their crops at midday to reduce evaporation.',o:['Farmers','water','midday','evaporation'],a:2,e:'It should be "early morning" or "evening".'},
 {s:'context',q:'Ice melts when the temperature drops, turning into water.',o:['melts','drops','turning','water'],a:1,e:'It should be "rises".'},
 {s:'context',q:'It was raining, so people left their umbrellas at home and wore waterproof coats.',o:['raining','left','waterproof','coats'],a:1,e:'It should be "took".'},
 {s:'context',q:'Because the library is quiet, students go there to study, talk loudly and concentrate.',o:['quiet','students','study','loudly'],a:3,e:'Quiet and concentration rule out loud talk.'},
 {s:'context',q:'Camels can endure thirst, which makes them the least suited animals for the desert.',o:['endure','thirst','makes','least'],a:3,e:'It should be "best".'},
 {s:'context',q:'The wise leader listens to his team\'s opinions and then makes his decisions recklessly.',o:['wise','listens','opinions','recklessly'],a:3,e:'It should be "carefully".'},
 {s:'context',q:'He woke up early and caught the bus, but he arrived at school before everyone.',o:['early','caught','but','before'],a:2,e:'The linking word is wrong; arriving early is a result, so "and".'},
 {s:'context',q:'Plants grow and flourish when they are deprived of enough water and light.',o:['grow','flourish','deprived','enough'],a:2,e:'It should be "given".'},
 {s:'context',q:'The player trained hard, so his performance declined and he shone in the match.',o:['trained','declined','shone','match'],a:1,e:'It should be "improved".'},
 {s:'context',q:'The more a person reads, the poorer his vocabulary and the broader his knowledge.',o:['reads','poorer','broader','knowledge'],a:1,e:'It should be "richer".'},
 {s:'context',q:'The shop closed down because of its large number of customers and high profits.',o:['closed','large','customers','profits'],a:0,e:'Customers and profits imply it "expanded".'},
 {s:'context',q:'Hatim al-Tai was famous for his stinginess, so much so that he became a proverb for generosity.',o:['stinginess','became','proverb','generosity'],a:0,e:'It should be "generosity".'},
 {s:'context',q:'Demand for fans rises in winter because of the intense heat.',o:['Demand','fans','rises','winter'],a:3,e:'It should be "summer".'},
 {s:'context',q:'When it grew dark, we extinguished the lamps to see the road clearly.',o:['dark','extinguished','see','clearly'],a:1,e:'It should be "lit".'},
 {s:'reading',p:'P4',q:'According to the passage, dedicating the benefit of a waqf means:',o:['spending its revenue on good causes','selling the asset','passing the asset to heirs','freezing the asset without using it'],a:0,e:'"its revenue is spent on good causes".'},
 {s:'reading',p:'P4',q:'Which contribution of endowments is mentioned?',o:['building hospitals','funding armies','minting coins','building ports'],a:0,e:'"build schools and hospitals and dig wells".'},
 {s:'reading',p:'P4',q:'According to researchers, why did the waqf survive for centuries?',o:['the asset remains and the benefit renews','many people donated','state support','rising asset values'],a:0,e:'The final sentence states it.'},
 {s:'reading',p:'P4',q:'It can be understood that the endowed asset:',o:['cannot be sold or inherited','is sold when needed','passes to heirs','is distributed to the poor'],a:0,e:'Stated at the start; it is the revenue, not the asset, that is spent.'},
 {s:'reading',p:'P5',q:'Some researchers attribute weak concentration to:',o:['excessive smartphone use','difficult curricula','lack of sleep','too much homework'],a:0,e:'Stated in the second sentence.'},
 {s:'reading',p:'P5',q:'The solution the passage proposes is to:',o:['organize phone use','ban phones completely','study longer hours','reduce homework'],a:0,e:'"not to ban the phone completely but to organize its use".'},
 {s:'reading',p:'P5',q:'The word "attribute" in the passage means:',o:['link as a cause','deny','compare','delay'],a:0,e:'To attribute X to Y is to name Y as its cause.'},
 {s:'reading',p:'P5',q:'The writer\'s attitude toward phones is:',o:['balanced, calling for organization','completely opposed','fully supportive without limits','indifferent'],a:0,e:'Rejects a total ban and proposes organization.'},
 {s:'reading',p:'P6',q:'According to the passage, groundwater:',o:['accumulated over thousands of years','renews quickly','comes directly from the sea','is used only in industry'],a:0,e:'Stated in the first sentence.'},
 {s:'reading',p:'P6',q:'The danger of overusing groundwater lies in:',o:['its slow renewal','its high salinity','its difficult extraction','its low use'],a:0,e:'"it renews very slowly compared with how fast it is consumed".'},
 {s:'reading',p:'P6',q:'Which solution is mentioned?',o:['recycling used water','digging deeper wells','importing water','expanding agriculture'],a:0,e:'"desalinating seawater and recycling used water".'},
 {s:'reading',p:'P6',q:'The contrast between "decades" and "centuries" shows:',o:['fast depletion versus slow renewal','that the words are synonyms','a cause and its effect','a detail after a summary'],a:0,e:'What is drained in decades takes centuries to return.'},
 {s:'reading',p:'P7',q:'Dots and vowel marks were added to Arabic script because:',o:['of fear of reciting errors as many non-Arabs entered Islam','they decorated the script','they made writing faster','they unified the styles'],a:0,e:'Stated directly.'},
 {s:'reading',p:'P7',q:'The main idea of the passage is:',o:['how Arabic script developed from a tool into an art','the Kufic style','the history of non-Arabs in Islam','how to learn calligraphy'],a:0,e:'The passage traces its stages of development.'},
 {s:'reading',p:'P7',q:'Which style is NOT mentioned in the passage?',o:['Ruq\'ah','Naskh','Thuluth','Diwani'],a:0,e:'Ruq\'ah is not listed.'},
 {s:'reading',p:'P7',q:'In the passage, "errors in reciting" refers to:',o:['mistakes in pronunciation','singing','reading too fast','decoration'],a:0,e:'The concern was correct recitation.'},
 {s:'reading',p:'P8',q:'One advantage of AI in education according to the passage is:',o:['adapting exercises to each student\'s level','replacing teachers','reducing study hours','giving answers without explanation'],a:0,e:'"offering exercises that fit their level".'},
 {s:'reading',p:'P8',q:'Experts warn that AI may:',o:['weaken independent thinking','be too expensive','be hard to use','offer too few exercises'],a:0,e:'Stated in the second sentence.'},
 {s:'reading',p:'P8',q:'The best use of AI according to the passage is as:',o:['a coach that asks and guides','a source of ready answers','a replacement for books','entertainment'],a:0,e:'"a coach that asks questions and guides".'},
 {s:'reading',p:'P8',q:'The word "promises" in the passage suggests:',o:['a potential benefit','a threat','a calculation','a preparation'],a:0,e:'It signals an expected benefit.'}
);

/* ---------- Verbal generators: relations for analogies, categories for odd word ---------- */
const REL = {
 ar:[
  {n:'أداة ووظيفتها',sym:0,p:[['قلم','كتابة'],['مقص','قص'],['مفتاح','فتح'],['ميزان','وزن'],['مجهر','تكبير'],['مكنسة','تنظيف'],['إبرة','خياطة'],['مسطرة','قياس'],['ممحاة','مسح'],['منشار','نشر']]},
  {n:'جزء من كل',sym:0,p:[['إصبع','يد'],['صفحة','كتاب'],['غرفة','منزل'],['ورقة','شجرة'],['عجلة','سيارة'],['حرف','كلمة'],['آية','سورة'],['لاعب','فريق'],['بيت','قصيدة'],['دقيقة','ساعة']]},
  {n:'تضاد',sym:1,p:[['كريم','بخيل'],['شجاع','جبان'],['طويل','قصير'],['سريع','بطيء'],['غني','فقير'],['صادق','كاذب'],['نور','ظلام'],['قوي','ضعيف'],['صعب','سهل'],['قريب','بعيد']]},
  {n:'ترادف',sym:1,grp:'syn',p:[['جليل','عظيم'],['ضخم','كبير'],['فطن','ذكي'],['مسرور','سعيد'],['متين','قوي'],['ساكن','هادئ'],['رفيق','صديق'],['جسور','شجاع'],['غيث','مطر'],['وهن','ضعف']]},
  {n:'صاحب المهنة ومكان عمله',sym:0,grp:'place',p:[['طبيب','مستشفى'],['معلم','مدرسة'],['قاضٍ','محكمة'],['مزارع','حقل'],['خباز','مخبز'],['بحّار','سفينة'],['صيدلي','صيدلية'],['طيار','طائرة'],['عامل','مصنع'],['ممثل','مسرح']]},
  {n:'سبب ونتيجة',sym:0,p:[['مطر','سيول'],['إهمال','فشل'],['اجتهاد','نجاح'],['نار','دخان'],['زلزال','دمار'],['تلوث','مرض'],['إسراف','فقر'],['رياضة','لياقة'],['برد','قشعريرة'],['سهر','إرهاق']]},
  {n:'الكائن ومسكنه',sym:0,grp:'place',p:[['نحلة','خلية'],['طائر','عش'],['أسد','عرين'],['حصان','إسطبل'],['دجاجة','قن'],['أرنب','جحر'],['عنكبوت','شبكة'],['نمل','قرية']]},
  {n:'الصغير والكبير من النوع نفسه',sym:0,p:[['شبل','أسد'],['مهر','حصان'],['جرو','كلب'],['عجل','بقرة'],['حُوار','ناقة'],['طفل','رجل'],['فرخ','دجاجة']]},
  {n:'الصانع والمادة التي يعمل عليها',sym:0,p:[['نجار','خشب'],['خياط','قماش'],['حداد','حديد'],['خزاف','طين'],['صائغ','ذهب'],['نحات','رخام'],['خطاط','حبر']]},
  {n:'المادة الخام وما يُصنع منها',sym:0,p:[['قطن','قماش'],['دقيق','خبز'],['حليب','جبن'],['رمل','زجاج'],['جلد','حذاء'],['قمح','دقيق'],['خشب','ورق']]},
  {n:'وحدة القياس وما تقيسه',sym:0,p:[['متر','طول'],['كيلوغرام','كتلة'],['ثانية','زمن'],['لتر','حجم'],['درجة مئوية','حرارة'],['واط','قدرة']]}
 ],
 en:[
  {n:'tool and function',sym:0,p:[['pen','write'],['scissors','cut'],['key','unlock'],['scale','weigh'],['microscope','magnify'],['broom','sweep'],['needle','sew'],['ruler','measure'],['eraser','erase'],['saw','cut wood']]},
  {n:'part and whole',sym:0,p:[['finger','hand'],['page','book'],['room','house'],['leaf','tree'],['wheel','car'],['letter','word'],['verse','poem'],['player','team'],['petal','flower'],['minute','hour']]},
  {n:'opposites',sym:1,p:[['generous','stingy'],['brave','cowardly'],['tall','short'],['fast','slow'],['rich','poor'],['honest','dishonest'],['light','darkness'],['strong','weak'],['difficult','easy'],['near','far']]},
  {n:'synonyms',sym:1,grp:'syn',p:[['huge','enormous'],['clever','intelligent'],['glad','happy'],['sturdy','strong'],['calm','tranquil'],['companion','friend'],['bold','brave'],['begin','start'],['fragile','delicate'],['rapid','quick']]},
  {n:'worker and workplace',sym:0,grp:'place',p:[['doctor','hospital'],['teacher','school'],['judge','court'],['farmer','field'],['baker','bakery'],['sailor','ship'],['pharmacist','pharmacy'],['pilot','cockpit'],['actor','stage'],['chef','kitchen']]},
  {n:'cause and effect',sym:0,p:[['rain','flood'],['negligence','failure'],['effort','success'],['fire','smoke'],['earthquake','destruction'],['drought','famine'],['pollution','illness'],['exercise','fitness'],['cold','shiver'],['sleeplessness','fatigue']]},
  {n:'animal and home',sym:0,grp:'place',p:[['bee','hive'],['bird','nest'],['lion','den'],['horse','stable'],['chicken','coop'],['rabbit','burrow'],['spider','web'],['ant','anthill']]},
  {n:'young and adult',sym:0,p:[['cub','lion'],['foal','horse'],['puppy','dog'],['calf','cow'],['child','adult'],['chick','hen'],['kitten','cat']]},
  {n:'maker and material',sym:0,p:[['carpenter','wood'],['tailor','fabric'],['blacksmith','iron'],['potter','clay'],['goldsmith','gold'],['sculptor','marble'],['glassblower','glass']]},
  {n:'raw material and product',sym:0,p:[['cotton','cloth'],['flour','bread'],['milk','cheese'],['sand','glass'],['leather','shoe'],['wheat','flour'],['wood','paper']]},
  {n:'unit and quantity',sym:0,p:[['meter','length'],['kilogram','mass'],['second','time'],['liter','volume'],['degree','temperature'],['watt','power']]},
  {n:'degree (mild to extreme)',sym:0,grp:'syn',p:[['warm','hot'],['cool','freezing'],['tired','exhausted'],['happy','ecstatic'],['angry','furious'],['damp','soaked'],['hungry','starving'],['loud','deafening']]}
 ]
};
const CATS = {
 ar:[
  ['الفواكه',['تفاح','موز','برتقال','عنب','مانجو','رمان','خوخ','كمثرى'],'الخضار'],
  ['الخضار',['جزر','خيار','بصل','بطاطس','كوسا','خس','ملفوف','فجل'],'الفواكه'],
  ['المدن السعودية',['المدينة المنورة','جدة','الدمام','أبها','تبوك','الطائف','بريدة','حائل'],'العواصم العربية'],
  ['العواصم العربية',['القاهرة','عمّان','بغداد','الرباط','دمشق','بيروت','الدوحة','مسقط'],'المدن السعودية'],
  ['الطيور',['صقر','حمامة','نسر','عصفور','بومة','هدهد','ببغاء'],'الثدييات البرية'],
  ['الثدييات البرية',['أسد','نمر','فهد','ذئب','غزال','ثعلب','ضبع'],'الطيور'],
  ['المعادن',['ذهب','فضة','نحاس','حديد','ألمنيوم','زنك'],'الأحجار الكريمة'],
  ['الأحجار الكريمة',['ياقوت','زمرد','ماس','فيروز','عقيق'],'المعادن'],
  ['المشاعر المبهجة',['فرح','سرور','بهجة','سعادة','ابتهاج'],'المشاعر المزعجة'],
  ['المشاعر المزعجة',['حزن','غضب','خوف','قلق','أسى'],'المشاعر المبهجة'],
  ['أفعال الحركة',['مشى','ركض','قفز','سبح','زحف','هرول'],'أفعال الكلام'],
  ['أفعال الكلام',['قال','تحدث','همس','صرخ','نادى','خطب'],'أفعال الحركة'],
  ['الشهور الهجرية',['محرم','صفر','رجب','شعبان','رمضان','شوال'],'الشهور الميلادية'],
  ['الشهور الميلادية',['يناير','مارس','أبريل','يونيو','أغسطس','أكتوبر'],'الشهور الهجرية'],
  ['أدوات المطبخ',['ملعقة','شوكة','سكين','قدر','مغرفة','مقلاة'],'الأدوات المدرسية'],
  ['الأدوات المدرسية',['قلم','مسطرة','ممحاة','دفتر','براية','فرجار'],'أدوات المطبخ'],
  ['الأعضاء الداخلية',['قلب','رئة','كبد','كلية','معدة'],'الحواس'],
  ['الحواس',['سمع','بصر','شم','ذوق','لمس'],'الأعضاء الداخلية'],
  ['الكواكب',['عطارد','المريخ','المشتري','زحل','نبتون','أورانوس'],'النجوم'],
  ['النجوم',['الشمس','سهيل','الثريا','الشعرى'],'الكواكب']
 ],
 en:[
  ['fruits',['apple','banana','orange','grape','mango','pomegranate','peach','pear'],'vegetables'],
  ['vegetables',['carrot','cucumber','onion','potato','lettuce','cabbage','radish','spinach'],'fruits'],
  ['Saudi cities',['Madinah','Jeddah','Dammam','Abha','Tabuk','Taif','Buraidah','Hail'],'Arab capitals'],
  ['Arab capitals',['Cairo','Amman','Baghdad','Rabat','Damascus','Beirut','Doha','Muscat'],'Saudi cities'],
  ['birds',['falcon','pigeon','eagle','sparrow','owl','parrot','hoopoe'],'wild mammals'],
  ['wild mammals',['lion','tiger','leopard','wolf','gazelle','fox','hyena'],'birds'],
  ['metals',['gold','silver','copper','iron','aluminum','zinc'],'gemstones'],
  ['gemstones',['ruby','emerald','diamond','turquoise','sapphire'],'metals'],
  ['pleasant feelings',['joy','delight','happiness','cheer','elation'],'unpleasant feelings'],
  ['unpleasant feelings',['sorrow','anger','fear','anxiety','grief'],'pleasant feelings'],
  ['movement verbs',['walk','run','jump','swim','crawl','jog'],'speech verbs'],
  ['speech verbs',['say','speak','whisper','shout','call','announce'],'movement verbs'],
  ['kitchen tools',['spoon','fork','knife','pot','ladle','pan'],'school supplies'],
  ['school supplies',['pencil','ruler','eraser','notebook','sharpener','compass'],'kitchen tools'],
  ['internal organs',['heart','lung','liver','kidney','stomach'],'senses'],
  ['senses',['hearing','sight','smell','taste','touch'],'internal organs'],
  ['planets',['Mercury','Mars','Jupiter','Saturn','Neptune','Uranus'],'stars'],
  ['stars',['the Sun','Canopus','Sirius','Polaris','Vega'],'planets'],
  ['shapes with sides',['triangle','square','rectangle','pentagon','hexagon'],'curved shapes'],
  ['curved shapes',['circle','ellipse','oval','crescent'],'shapes with sides']
 ]
};
function genAnalogy(lang){ return genFork(()=>_genAnalogy(lang)); }
function genOdd(lang){ return genFork(()=>_genOdd(lang)); }
function _genAnalogy(lang){
  const rels=REL[lang]; const R0=pick(rels); const pairs=shuffle(R0.p);
  const stem=pairs[0], right=pairs[1];
  const others=shuffle(rels.filter(r=>r!==R0&&!(R0.grp&&r.grp===R0.grp)));
  const d=[pick(others[0].p),pick(others[1].p)];
  let third, reversed=false;
  if(!R0.sym && pairs[2]){ third=[pairs[2][1],pairs[2][0]]; reversed=true; } else third=pick(others[2].p);
  const f=p=>lang==='ar'?`${p[0]} : ${p[1]}`:`${p[0]} : ${p[1]}`;
  const q=lang==='ar'?f(stem):`${stem[0].toUpperCase()} : ${stem[1].toUpperCase()}`;
  const e= lang==='ar' ? `العلاقة: ${R0.n}، وهي نفسها في «${f(right)}».${reversed?` أما «${f(third)}» فمن العلاقة نفسها لكن بترتيب معكوس.`:''}` : `Relationship: ${R0.n}, the same as in "${f(right)}".${reversed?` "${f(third)}" is the same relationship in reverse order.`:''}`;
  return {s:'analogy',q,o:[f(right),f(d[0]),f(d[1]),f(third)],a:0,e,gen:1};
}
function _genOdd(lang){
  const cats=CATS[lang]; const c=pick(cats); const three=shuffle(c[1]).slice(0,3);
  const other=cats.find(x=>x[0]===c[2]); const odd=pick(other[1]);
  const q=lang==='ar'?'اختر الكلمة المختلفة:':'Choose the word that does not belong:';
  const e=lang==='ar'?`«${three.join('، ')}» من ${c[0]}، أما «${odd}» فمن ${other[0]}.`:`"${three.join(', ')}" are ${c[0]}; "${odd}" belongs to ${other[0]}.`;
  return {s:'odd',q,o:[odd,...three],a:0,e,gen:1};
}
/* ============ Verbal bank expansion 2: 16 passages per language + items + proverb generator ============ */
const PX = {
 ar:{
  P9:['تُلقَّب الإبل بسفينة الصحراء لقدرتها الفائقة على التكيف مع البيئة القاسية. فهي تستطيع أن تمضي أيامًا دون ماء، وتختزن الدهون في سنامها لتستعملها مصدرًا للطاقة حين يشح الغذاء، لا الماء كما يظن كثيرون. كما تحمي رموشها الطويلة عينيها من الرمال، وتمنعها أخفافها العريضة من الغوص في الكثبان.',[
    ['الفكرة الرئيسة للنص:',['تكيّف الإبل مع البيئة الصحراوية','طرق تربية الإبل','أنواع الإبل في الجزيرة العربية','سباقات الهجن'],'النص يعدد وسائل التكيف.'],
    ['يختزن السنام حسب النص:',['الدهون','الماء','الملح','الرمل'],'يصحح النص الاعتقاد الشائع: الدهون لا الماء.'],
    ['وظيفة الأخفاف العريضة:',['منع الغوص في الرمال','حماية العينين','تخزين الطاقة','تبريد الجسم'],'«تمنعها أخفافها العريضة من الغوص في الكثبان».']]],
  P10:['للقهوة السعودية مكانة خاصة في الضيافة، إذ تُقدَّم عادةً مع التمر، وتُحضَّر بالهيل وأحيانًا بالزعفران. ومن آدابها أن يبدأ المضيف بالضيف الأكبر سنًا أو الأعلى مقامًا، وأن يصب قليلًا في الفنجان، فإذا اكتفى الضيف هزّ فنجانه. وقد صارت هذه العادات جزءًا من هوية ثقافية يحرص الناس على نقلها إلى الأجيال.',[
    ['يدل هزّ الفنجان على أن الضيف:',['اكتفى','يريد المزيد','غاضب','يشكر المضيف على الهيل'],'«فإذا اكتفى الضيف هزّ فنجانه».'],
    ['يبدأ المضيف في صب القهوة بـ:',['الأكبر سنًا أو الأعلى مقامًا','أقرب الضيوف إليه','أصغر الحاضرين','من يجلس عن يساره'],'نص صريح.'],
    ['يُفهم من النص أن عادات القهوة:',['جزء من الهوية الثقافية','عادات حديثة','خاصة بالمناسبات الرسمية','في طريقها إلى الاندثار'],'«صارت جزءًا من هوية ثقافية».']]],
  P11:['العمل التطوعي ليس جهدًا يمنحه الإنسان لغيره فحسب، بل استثمار يعود عليه هو أيضًا. فالمتطوع يكتسب مهارات جديدة، ويوسّع علاقاته، ويشعر بقيمة ما يقدمه. وتسعى رؤية المملكة 2030 إلى رفع أعداد المتطوعين، إيمانًا بأن المجتمع الذي يتطوع أفراده أقدر على مواجهة التحديات.',[
    ['يرى الكاتب أن التطوع:',['يفيد المتطوع والمجتمع معًا','يفيد الآخرين فقط','يضيع وقت المتطوع','مسؤولية الدولة وحدها'],'«استثمار يعود عليه هو أيضًا».'],
    ['ليس من فوائد التطوع المذكورة:',['الحصول على مكافأة مالية','اكتساب مهارات','توسيع العلاقات','الشعور بالقيمة'],'المكافأة المالية لم تُذكر.'],
    ['«فحسب» في النص تعني:',['فقط','أيضًا','دائمًا','أحيانًا'],'«ليس... فحسب، بل...».']]],
  P12:['تشير بعض الدراسات إلى أن القارئ يفهم النصوص الطويلة المطبوعة على الورق أعمق قليلًا من فهمه لها على الشاشة، لأن الشاشات تغري بالقراءة السريعة المتنقلة. غير أن القراءة الرقمية تتفوق في سرعة الوصول إلى المعلومة والبحث فيها. لذلك يقترح المختصون الجمع بين الطريقتين بحسب الغرض من القراءة.',[
    ['يتفوق الورق حسب النص في:',['الفهم العميق للنصوص الطويلة','سرعة البحث','سهولة الحمل','انخفاض التكلفة'],'نص صريح في الجملة الأولى.'],
    ['موقف المختصين:',['الجمع بين الطريقتين حسب الغرض','الاكتفاء بالورق','الاكتفاء بالشاشة','ترك القراءة الطويلة'],'«يقترح المختصون الجمع بين الطريقتين».'],
    ['«تغري» في النص تعني:',['تدفع وتشجّع','تمنع','تُتعب','تُبطئ'],'الشاشة تدفع القارئ إلى القراءة السريعة.']]],
  P13:['تضم سواحل البحر الأحمر شعابًا مرجانية من أغنى الشعاب في العالم، ويرى بعض العلماء أنها أكثر تحملًا لارتفاع حرارة المياه من غيرها. والمرجان كائنات حية دقيقة تبني هياكل كلسية تصبح موطنًا لآلاف الأنواع البحرية. لكن التلوث وارتفاع الحرارة الشديد قد يسببان «ابيضاض» المرجان وموته، مما يهدد التنوع الحيوي كله.',[
    ['المرجان حسب النص:',['كائنات حية تبني هياكل كلسية','صخور بحرية','نباتات مائية','رمال ملونة'],'نص صريح.'],
    ['ما سبب أهمية الشعاب للتنوع الحيوي؟',['أنها موطن لآلاف الأنواع','أنها تنقي الماء من الملح','أنها تمنع الأمواج','أنها مصدر للغذاء البشري'],'«تصبح موطنًا لآلاف الأنواع».'],
    ['يُستنتج من النص أن ابيضاض المرجان:',['خطر يهدد الحياة البحرية','ظاهرة جمالية','علامة على صحة المرجان','يحدث في المياه الباردة'],'يسبب موته ويهدد التنوع.']]],
  P14:['درس العالم الألماني إبنجهاوس النسيان، فوجد أن الإنسان يفقد جزءًا كبيرًا مما تعلمه خلال الأيام الأولى إن لم يراجعه، ثم يتباطأ النسيان بعد ذلك. ووجد أيضًا أن كل مراجعة في الوقت المناسب تجعل المعلومة أثبت وتؤخر نسيانها أكثر من سابقتها. ومن هنا نشأت فكرة «التكرار المتباعد» في المذاكرة.',[
    ['يكون النسيان أسرع:',['في الأيام الأولى بعد التعلم','بعد شهر من التعلم','عند المراجعة المتكررة','في أثناء النوم'],'«يفقد جزءًا كبيرًا خلال الأيام الأولى».'],
    ['أثر المراجعة في الوقت المناسب:',['تثبيت المعلومة وتأخير نسيانها','تسريع النسيان','لا أثر لها','تحتاج إلى وقت أطول كل مرة'],'نص صريح.'],
    ['العلاقة بين الجملتين الأوليين والأخيرة:',['مقدمة ونتيجة','تضاد','تفصيل بعد إجمال','مثال وتعليق'],'نشأت الفكرة نتيجة لما وُجد.']]],
  P15:['النخلة شجرة مباركة ارتبطت بحياة أهل الجزيرة العربية، فثمرها غذاء، وسعفها يُصنع منه الحصير والسلال، وجذعها استُعمل في البناء، ونواها علف للماشية. وتُعد المملكة من أكبر منتجي التمور في العالم، وتتنوع أصنافها بين السكري والخلاص والعجوة وغيرها.',[
    ['الفكرة الرئيسة:',['تعدد منافع النخلة ومكانتها','طرق زراعة النخيل','أنواع التمور وأسعارها','تاريخ الزراعة'],'النص يعدد المنافع ثم المكانة.'],
    ['يُستعمل السعف في:',['صناعة الحصير والسلال','البناء','علف الماشية','الغذاء'],'نص صريح.'],
    ['ليس من الأصناف المذكورة:',['البرحي','السكري','الخلاص','العجوة'],'البرحي لم يُذكر.']]],
  P16:['في العصر العباسي أنشأ الخلفاء في بغداد «بيت الحكمة»، فجمعوا فيه العلماء والمترجمين لنقل كتب اليونان والفرس والهند إلى العربية. ولم يكتفِ العلماء المسلمون بالنقل، بل شرحوا ما ترجموه وصححوا أخطاءه وأضافوا إليه، فصارت العربية لغة العلم قرونًا طويلة.',[
    ['كان دور بيت الحكمة:',['ترجمة الكتب ونقل العلوم','بناء المساجد','تدريب الجيوش','جمع الضرائب'],'نص صريح.'],
    ['يُفهم من النص أن العلماء المسلمين:',['أضافوا إلى ما ترجموه','اكتفوا بالنقل','ترجموا عن اليونان فقط','رفضوا علوم غيرهم'],'«لم يكتفوا بالنقل، بل...».'],
    ['نتيجة هذه الحركة:',['أصبحت العربية لغة العلم','توقفت الترجمة','انتقل العلماء إلى اليونان','ضعفت بغداد'],'آخر النص.']]],
  P17:['لا تقتصر فوائد الرياضة على الجسم، فهي تزيد تدفق الدم إلى الدماغ، وتحفّز إفراز مواد تحسّن المزاج وتقوّي الذاكرة. ولذلك يلاحظ بعض الطلاب أن مشيًا قصيرًا قبل المذاكرة يساعدهم على التركيز أكثر من الجلوس الطويل المتواصل.',[
    ['الفكرة الرئيسة:',['أثر الرياضة في الدماغ والتعلم','أنواع الرياضة المفيدة','أضرار الجلوس الطويل على الظهر','أوقات المذاكرة المناسبة'],'النص يربط الرياضة بالدماغ.'],
    ['من فوائد الرياضة المذكورة:',['تقوية الذاكرة','زيادة الوزن','تقليل النوم','زيادة الجوع'],'نص صريح.'],
    ['«لا تقتصر» تعني أن الفوائد:',['تشمل الجسم وغيره','خاصة بالجسم','قليلة','غير مؤكدة'],'«لا تقتصر على الجسم».']]],
  P18:['يقسّم أحد أشهر أساليب إدارة الوقت المهام إلى أربع فئات: مهم وعاجل، ومهم غير عاجل، وعاجل غير مهم، وما ليس مهمًا ولا عاجلًا. ويرى أصحاب هذا الأسلوب أن الناجحين يقضون معظم وقتهم في الفئة الثانية، أي المهم غير العاجل، كالتخطيط والتعلم، لأن إهمالها يحوّلها لاحقًا إلى أزمات عاجلة.',[
    ['يقضي الناجحون معظم وقتهم حسب النص في:',['المهم غير العاجل','العاجل غير المهم','المهم العاجل','غير المهم وغير العاجل'],'نص صريح.'],
    ['مثال على المهم غير العاجل:',['التخطيط والتعلم','الرد على كل رسالة فورًا','مشاهدة المقاطع','إطفاء حريق'],'ذكر النص التخطيط والتعلم.'],
    ['سبب الاهتمام بالمهم غير العاجل:',['إهماله يحوّله إلى أزمة','لأنه ممتع','لأنه سريع','لأنه لا يحتاج جهدًا'],'آخر النص.']]],
  P19:['يتكوّن قوس قزح حين يمر ضوء الشمس الأبيض عبر قطرات المطر، فينكسر وينحل إلى ألوانه، لأن كل لون ينكسر بزاوية مختلفة قليلًا. وقد أثبت نيوتن قديمًا أن الضوء الأبيض مزيج من ألوان حين مرّره عبر منشور زجاجي، فخرجت منه ألوان الطيف.',[
    ['سبب ظهور الألوان منفصلة:',['انكسار كل لون بزاوية مختلفة','اختلاف ألوان قطرات المطر','انعكاس الضوء على الغيوم','حرارة الشمس'],'نص صريح.'],
    ['أثبتت تجربة نيوتن أن الضوء الأبيض:',['مزيج من ألوان','لون واحد','لا ينكسر','يتكون في المطر فقط'],'نص صريح.'],
    ['الأداة التي استخدمها نيوتن:',['منشور زجاجي','مرآة','عدسة مكبرة','قطرة ماء'],'نص صريح.']]],
  P20:['كان سوق عكاظ قرب الطائف من أشهر أسواق العرب قبل الإسلام، ولم يكن مكانًا للبيع والشراء فحسب، بل منتدى أدبيًا يتبارى فيه الشعراء والخطباء، وتُحكى فيه الأخبار. وقد أُعيد إحياؤه في العصر الحديث مهرجانًا ثقافيًا يستحضر ذلك التاريخ.',[
    ['تميز سوق عكاظ بأنه:',['سوق تجاري ومنتدى أدبي','سوق للماشية فقط','مكان للعبادة','حصن عسكري'],'«لم يكن للبيع فحسب، بل منتدى أدبيًا».'],
    ['يقع السوق قرب:',['الطائف','مكة','جدة','المدينة'],'نص صريح.'],
    ['«يتبارى» تعني:',['يتنافس','يتعاون','يتعلم','يسافر'],'المباراة منافسة.']]],
  P21:['تُهدر كميات كبيرة من الطعام في المنازل، غالبًا بسبب شراء ما يزيد على الحاجة أو إعداد كميات لا تؤكل. ولا تقتصر الخسارة على المال، بل تشمل الماء والطاقة التي استُهلكت في إنتاج ذلك الطعام. ويمكن تقليل الهدر بالتخطيط للمشتريات، وحفظ البقايا جيدًا، ومشاركة الفائض.',[
    ['من أسباب الهدر المذكورة:',['شراء ما يزيد على الحاجة','ارتفاع الأسعار','قلة المطاعم','ضعف الزراعة'],'نص صريح.'],
    ['الخسارة الناتجة عن الهدر تشمل:',['المال والماء والطاقة','المال فقط','الوقت فقط','الصحة فقط'],'نص صريح.'],
    ['ليس من الحلول المذكورة:',['زيادة المشتريات','التخطيط للمشتريات','حفظ البقايا','مشاركة الفائض'],'زيادة المشتريات تزيد الهدر.']]],
  P22:['تطير الخفافيش في الظلام دون أن تصطدم بشيء، لأنها تطلق أصواتًا عالية لا يسمعها الإنسان، ثم تستقبل صداها المرتد عن الأجسام، فتحدد مواقعها وأحجامها. وقد استفاد الإنسان من هذه الفكرة في تطوير أجهزة السونار التي تكشف ما تحت سطح الماء.',[
    ['تحدد الخفافيش مواقع الأجسام عن طريق:',['صدى الأصوات','حاسة الشم','الرؤية الليلية','الحرارة'],'نص صريح.'],
    ['الأصوات التي تطلقها الخفافيش:',['لا يسمعها الإنسان','منخفضة جدًا','يسمعها الإنسان بوضوح','تشبه صوت الطيور'],'نص صريح.'],
    ['استفاد الإنسان من الفكرة في:',['أجهزة السونار','الطائرات','المصابيح','الهواتف'],'نص صريح.']]],
  P23:['تنتشر الأخبار الكاذبة على مواقع التواصل أسرع من الصحيحة أحيانًا، لأنها تُصاغ لتثير المشاعر. ولمواجهتها ينصح المختصون بطرح ثلاثة أسئلة قبل المشاركة: من المصدر؟ وما الدليل؟ وماذا تقول المصادر الأخرى؟ فالتفكير النقدي هو خط الدفاع الأول.',[
    ['سبب انتشار الأخبار الكاذبة بسرعة:',['أنها تثير المشاعر','أنها صحيحة','أنها قصيرة','أنها من مصادر رسمية'],'نص صريح.'],
    ['ليس من الأسئلة التي ينصح بها المختصون:',['كم عدد من شاركوه؟','من المصدر؟','ما الدليل؟','ماذا تقول المصادر الأخرى؟'],'عدد المشاركات لم يُذكر.'],
    ['«خط الدفاع الأول» يعني أن التفكير النقدي:',['أهم وسيلة للحماية','وسيلة ضعيفة','آخر الحلول','غير ضروري'],'تعبير مجازي.']]],
  P24:['يُعد الحسن بن الهيثم من رواد المنهج التجريبي، إذ لم يكتفِ بآراء من سبقوه، بل اختبرها بالتجربة والملاحظة. وفي كتابه «المناظر» أثبت أن الرؤية تحدث حين ينتقل الضوء من الأجسام إلى العين، لا العكس كما كان يعتقد بعض القدماء.',[
    ['اشتهر ابن الهيثم بـ:',['المنهج التجريبي','الشعر','الجغرافيا','التجارة'],'نص صريح.'],
    ['أثبت ابن الهيثم أن الرؤية تحدث حين:',['ينتقل الضوء من الأجسام إلى العين','يخرج الضوء من العين','تغمض العين','يسقط الظل على الجسم'],'نص صريح.'],
    ['«لا العكس» تشير إلى رأي:',['بعض القدماء','ابن الهيثم','العلماء المحدثين','كل العلماء'],'«كما كان يعتقد بعض القدماء».']]]
 },
 en:{
  P9:['Camels are called ships of the desert because of their remarkable adaptation to a harsh environment. They can go for days without water, and they store fat, not water as many people think, in their humps to use as energy when food is scarce. Their long eyelashes protect their eyes from sand, and their wide feet keep them from sinking into the dunes.',[
    ['The main idea of the passage is:',['how camels adapt to the desert','how to raise camels','types of camels','camel racing'],'The passage lists adaptations.'],
    ['According to the passage, the hump stores:',['fat','water','salt','sand'],'It corrects the common belief: fat, not water.'],
    ['The camel\'s wide feet:',['keep it from sinking in sand','protect its eyes','store energy','cool its body'],'Stated directly.']]],
  P10:['Saudi coffee holds a special place in hospitality. It is usually served with dates and prepared with cardamom, sometimes with saffron. By custom, the host starts with the oldest or most senior guest and pours only a little into the cup; when a guest has had enough, he gently shakes the cup. These customs have become part of a cultural identity that people are keen to pass on.',[
    ['Shaking the cup means the guest:',['has had enough','wants more','is upset','likes the cardamom'],'Stated directly.'],
    ['The host starts serving:',['the oldest or most senior guest','the closest friend','the youngest guest','whoever sits on the left'],'Stated directly.'],
    ['The passage suggests coffee customs are:',['part of cultural identity','a recent trend','only for formal events','disappearing'],'Stated in the last sentence.']]],
  P11:['Volunteering is not only effort given to others; it is also an investment that pays back the volunteer. Volunteers gain new skills, widen their networks and feel the value of what they give. Saudi Vision 2030 aims to increase the number of volunteers, based on the belief that a society whose members volunteer is better able to face challenges.',[
    ['The writer sees volunteering as:',['benefiting both the volunteer and society','benefiting others only','a waste of time','the state\'s job alone'],'"an investment that pays back the volunteer".'],
    ['Which benefit is NOT mentioned?',['a financial reward','new skills','wider networks','a sense of value'],'Money is not mentioned.'],
    ['In the first sentence, "not only ... also" signals:',['addition','contrast','cause','condition'],'It adds a second benefit.']]],
  P12:['Some studies suggest readers understand long printed texts slightly more deeply than the same texts on screens, because screens encourage fast, jumping reading. Digital reading, however, wins on speed of access and searching. Specialists therefore suggest combining both, depending on the purpose of reading.',[
    ['According to the passage, paper is better for:',['deep understanding of long texts','fast searching','portability','low cost'],'Stated in the first sentence.'],
    ['Specialists recommend:',['combining both by purpose','paper only','screens only','avoiding long texts'],'Stated in the last sentence.'],
    ['"encourage" in the passage is closest to:',['push toward','prevent','tire','slow down'],'Screens push readers to read fast.']]],
  P13:['The Red Sea coast hosts some of the world\'s richest coral reefs, and some scientists believe they tolerate warmer water better than others. Corals are tiny living creatures that build limestone structures, which become home to thousands of marine species. Yet pollution and extreme heat can cause coral "bleaching" and death, threatening the whole ecosystem.',[
    ['According to the passage, corals are:',['living creatures that build limestone structures','sea rocks','water plants','colored sand'],'Stated directly.'],
    ['Why are reefs important for biodiversity?',['they are home to thousands of species','they remove salt from water','they stop waves','they feed people'],'Stated directly.'],
    ['It can be inferred that coral bleaching is:',['a threat to marine life','a beautiful phenomenon','a sign of healthy coral','found only in cold water'],'It causes death and threatens the ecosystem.']]],
  P14:['The German scientist Ebbinghaus studied forgetting and found that people lose much of what they learn in the first few days unless they review it, after which forgetting slows down. He also found that each well-timed review makes the information more stable and delays forgetting longer than the one before. This is where the idea of "spaced repetition" in studying comes from.',[
    ['Forgetting is fastest:',['in the first days after learning','after a month','during repeated review','during sleep'],'Stated directly.'],
    ['A well-timed review:',['stabilizes information and delays forgetting','speeds up forgetting','has no effect','takes longer each time'],'Stated directly.'],
    ['The last sentence relates to the earlier ones as:',['a conclusion drawn from findings','a contrast','a detail','an example'],'The idea grew out of the findings.']]],
  P15:['The palm tree is a blessed tree tied to life in the Arabian Peninsula. Its fruit is food, its fronds are woven into mats and baskets, its trunk was used in building, and its seeds feed livestock. Saudi Arabia is among the world\'s largest date producers, with varieties such as Sukkari, Khalas and Ajwa.',[
    ['The main idea is:',['the many uses and status of the palm','how to plant palms','date prices','the history of farming'],'It lists the uses, then the status.'],
    ['Fronds are used to make:',['mats and baskets','buildings','animal feed','food'],'Stated directly.'],
    ['Which variety is NOT mentioned?',['Barhi','Sukkari','Khalas','Ajwa'],'Barhi is not mentioned.']]],
  P16:['In the Abbasid era, the caliphs founded the "House of Wisdom" in Baghdad, gathering scholars and translators to bring Greek, Persian and Indian books into Arabic. Muslim scholars did not stop at translating; they explained, corrected and added to what they translated, and Arabic became the language of science for centuries.',[
    ['The House of Wisdom was mainly for:',['translating books and transferring knowledge','building mosques','training armies','collecting taxes'],'Stated directly.'],
    ['It can be understood that Muslim scholars:',['added to what they translated','only translated','translated only from Greek','rejected other sciences'],'"did not stop at translating".'],
    ['The result of this movement was that:',['Arabic became the language of science','translation stopped','scholars moved to Greece','Baghdad declined'],'Last sentence.']]],
  P17:['The benefits of exercise are not limited to the body. It increases blood flow to the brain and triggers the release of substances that improve mood and strengthen memory. That is why some students find a short walk before studying helps them focus more than sitting for long stretches.',[
    ['The main idea is:',['how exercise affects the brain and learning','types of useful sports','back pain from sitting','the best study times'],'It links exercise to the brain.'],
    ['Which benefit is mentioned?',['stronger memory','weight gain','less sleep','more hunger'],'Stated directly.'],
    ['"not limited to the body" means the benefits:',['include the body and more','are only physical','are few','are uncertain'],'They extend beyond the body.']]],
  P18:['One famous time-management method sorts tasks into four groups: important and urgent, important but not urgent, urgent but not important, and neither. Its supporters argue that successful people spend most of their time on the second group, such as planning and learning, because neglecting it later turns it into urgent crises.',[
    ['Successful people spend most time on:',['important but not urgent tasks','urgent but unimportant tasks','important and urgent tasks','neither'],'Stated directly.'],
    ['An example of important but not urgent is:',['planning and learning','answering every message instantly','watching clips','putting out a fire'],'The passage names planning and learning.'],
    ['Why focus on this group?',['neglect turns it into a crisis','it is fun','it is quick','it needs no effort'],'Last sentence.']]],
  P19:['A rainbow forms when white sunlight passes through raindrops and is bent and split into its colors, because each color bends at a slightly different angle. Long ago, Newton showed that white light is a mixture of colors by passing it through a glass prism, which produced the colors of the spectrum.',[
    ['The colors separate because:',['each color bends at a different angle','raindrops have colors','light reflects off clouds','of the sun\'s heat'],'Stated directly.'],
    ['Newton showed that white light:',['is a mixture of colors','is a single color','cannot bend','exists only in rain'],'Stated directly.'],
    ['Newton used:',['a glass prism','a mirror','a magnifying lens','a water drop'],'Stated directly.']]],
  P20:['Souq Okaz, near Taif, was one of the most famous Arab markets before Islam. It was not only a place to buy and sell but a literary forum where poets and orators competed and news was shared. In modern times it has been revived as a cultural festival that recalls that history.',[
    ['Souq Okaz was:',['a market and a literary forum','a livestock market only','a place of worship','a fortress'],'"not only... but a literary forum".'],
    ['It is located near:',['Taif','Makkah','Jeddah','Madinah'],'Stated directly.'],
    ['"competed" is closest to:',['vied','cooperated','studied','traveled'],'Poets vied with one another.']]],
  P21:['Large amounts of food are wasted at home, often because people buy more than they need or cook portions that go uneaten. The loss is not only money but also the water and energy used to produce that food. Waste can be cut by planning purchases, storing leftovers well and sharing extra food.',[
    ['One cause of waste mentioned is:',['buying more than needed','high prices','few restaurants','weak farming'],'Stated directly.'],
    ['The loss includes:',['money, water and energy','money only','time only','health only'],'Stated directly.'],
    ['Which is NOT a suggested solution?',['buying more','planning purchases','storing leftovers','sharing extra food'],'Buying more increases waste.']]],
  P22:['Bats fly in the dark without hitting anything because they send out high-pitched sounds that humans cannot hear, then receive the echoes bouncing off objects to locate them and judge their size. People used this idea to develop sonar devices that detect what lies beneath the water\'s surface.',[
    ['Bats locate objects using:',['sound echoes','smell','night vision','heat'],'Stated directly.'],
    ['The sounds bats make are:',['inaudible to humans','very low','clearly heard by humans','like bird calls'],'Stated directly.'],
    ['People applied the idea in:',['sonar devices','airplanes','lamps','phones'],'Stated directly.']]],
  P23:['False news sometimes spreads faster than true news on social media because it is written to stir emotions. To counter it, specialists advise asking three questions before sharing: Who is the source? What is the evidence? What do other sources say? Critical thinking is the first line of defense.',[
    ['False news spreads fast because it:',['stirs emotions','is true','is short','comes from officials'],'Stated directly.'],
    ['Which question is NOT among those advised?',['How many people shared it?','Who is the source?','What is the evidence?','What do other sources say?'],'Share counts are not mentioned.'],
    ['"first line of defense" means critical thinking is:',['the main protection','a weak tool','a last resort','unnecessary'],'A figurative expression.']]],
  P24:['Ibn al-Haytham is a pioneer of the experimental method: he did not simply accept the views of those before him but tested them through experiment and observation. In his Book of Optics he showed that vision happens when light travels from objects to the eye, not the other way round as some ancients believed.',[
    ['Ibn al-Haytham is known for:',['the experimental method','poetry','geography','trade'],'Stated directly.'],
    ['He showed that vision happens when:',['light travels from objects to the eye','light leaves the eye','the eye closes','a shadow falls'],'Stated directly.'],
    ['"not the other way round" refers to the view of:',['some ancients','Ibn al-Haytham','modern scientists','all scientists'],'"as some ancients believed".']]]
 }
};
for(const lang of ['ar','en']) for(const [k,[text,qs]] of Object.entries(PX[lang])){ PASSAGES[lang][k]=text; qs.forEach(([q,o,e])=>(lang==='ar'?VB_AR:VB_EN).push({s:'reading',p:k,q,o,a:0,e})); }

VB_AR.push(
 {s:'context',q:'يتميز الصقر بحدة بصره، لذلك يرى فريسته من مسافات قريبة جدًا فقط.',o:['حدة','يرى','فريسته','قريبة'],a:3,e:'حدة البصر تعني الرؤية من مسافات بعيدة.'},
 {s:'context',q:'ازدحمت الشوارع بالسيارات فتأخر الموظفون، ووصلوا إلى أعمالهم مبكرين.',o:['ازدحمت','تأخر','وصلوا','مبكرين'],a:3,e:'المرتكزان: «ازدحمت» و«تأخر».'},
 {s:'context',q:'يغلي الماء عند مئة درجة مئوية، ويتجمد عند خمسين درجة.',o:['يغلي','مئة','يتجمد','خمسين'],a:3,e:'يتجمد الماء عند الصفر.'},
 {s:'context',q:'تغرب الشمس في جهة الشرق، فيحل الليل وتظهر النجوم.',o:['الشرق','يحل','الليل','النجوم'],a:0,e:'الصحيح «الغرب»؛ فالشمس تغرب في جهة الغرب.'},
 {s:'context',q:'كان الطالب متفوقًا في دراسته، فرسب في جميع المواد وحصل على المركز الأول.',o:['متفوقًا','رسب','جميع','الأول'],a:1,e:'الصحيح «نجح».'},
 {s:'context',q:'الكتاب صديق وفيّ، يؤنسك في وحدتك ويخذلك حين تحتاجه.',o:['وفيّ','يؤنسك','وحدتك','يخذلك'],a:3,e:'الصحيح «يعينك».'},
 {s:'context',q:'حرصًا على سلامة الأطفال، تُحفظ الأدوية في أماكن قريبة من متناول أيديهم.',o:['حرصًا','سلامة','تُحفظ','قريبة'],a:3,e:'الصحيح «بعيدة».'},
 {s:'context',q:'بسبب نقص الأكسجين في المرتفعات، يتنفس المتسلقون بسهولة ويسر.',o:['نقص','المرتفعات','يتنفس','بسهولة'],a:3,e:'الصحيح «بصعوبة».'},
 {s:'context',q:'الأمانة من أرذل الصفات التي يتحلى بها المسلم.',o:['أرذل','الصفات','يتحلى','المسلم'],a:0,e:'الصحيح «أنبل».'},
 {s:'context',q:'يسقط المطر حين تتكثف قطرات الماء في السحب وتخفّ فتهبط إلى الأرض.',o:['يسقط','تتكثف','تخفّ','تهبط'],a:2,e:'الصحيح «تثقل».'},
 {s:'context',q:'يُصنع مقبض القدر من البلاستيك لأنه موصل جيد للحرارة فلا تحترق اليد.',o:['يُصنع','مقبض','البلاستيك','جيد'],a:3,e:'الصحيح «رديء».'},
 {s:'context',q:'كلما زادت سرعة السيارة قصُرت المسافة اللازمة لإيقافها.',o:['زادت','سرعة','قصُرت','إيقافها'],a:2,e:'الصحيح «طالت».'},
 {s:'context',q:'الشجاع يواجه المخاطر بقلب مرتجف ويُقدم دون تردد.',o:['الشجاع','يواجه','مرتجف','تردد'],a:2,e:'الصحيح «ثابت».'},
 {s:'context',q:'يبعث الربيع في النفس الكآبة بأزهاره الملونة وجوّه المعتدل.',o:['يبعث','الكآبة','الملونة','المعتدل'],a:1,e:'الصحيح «البهجة».'},
 {s:'context',q:'أسرِف في مصروفك حتى يكفيك إلى نهاية الشهر.',o:['أسرِف','مصروفك','يكفيك','نهاية'],a:0,e:'الصحيح «اقتصد»؛ فالإسراف لا يجعل المال يكفي إلى آخر الشهر.'},
 {s:'context',q:'تحتفظ الصحراء بحرارتها ليلًا، لذلك تنخفض درجة الحرارة فيها بشدة بعد الغروب.',o:['تحتفظ','ليلًا','تنخفض','الغروب'],a:0,e:'الصحيح «تفقد».'},
 {s:'context',q:'أنصت الطلاب إلى المعلم باهتمام، فلم يفهموا شيئًا من الدرس.',o:['أنصت','باهتمام','فلم','الدرس'],a:2,e:'الصحيح «ففهموا».'},
 {s:'context',q:'النباتات الصحراوية أوراقها عريضة لتقلل فقد الماء بالتبخر.',o:['عريضة','تقلل','فقد','التبخر'],a:0,e:'الصحيح «صغيرة» أو «إبرية».'},
 {s:'context',q:'حين فاز الفريق بالبطولة عمّ الحزن أرجاء الملعب وتعالت الهتافات.',o:['فاز','الحزن','أرجاء','الهتافات'],a:1,e:'الصحيح «الفرح».'},
 {s:'completion',q:'لا ينبغي أن نحكم على الناس من ......، فالجوهر أهم من المظهر.',o:['مظاهرهم','أفعالهم','أخلاقهم','أعمالهم'],a:0,e:'مقابلة بين المظهر والجوهر.'},
 {s:'completion',q:'كان الامتحان ...... لدرجة أن معظم الطلاب أنهوه قبل الوقت.',o:['سهلًا','صعبًا','طويلًا','معقدًا'],a:0,e:'الإنهاء المبكر نتيجة السهولة.'},
 {s:'completion',q:'يؤدي التلوث إلى ...... جودة الهواء، مما يؤثر في صحة الإنسان.',o:['تدنّي','تحسّن','ثبات','ارتفاع'],a:0,e:'التلوث يخفض الجودة.'},
 {s:'completion',q:'الصبر على المذاكرة ...... لكن نتائجه حلوة.',o:['مرّ','حلو','قصير','سهل'],a:0,e:'«لكن» تقتضي التضاد مع «حلوة».'},
 {s:'completion',q:'لم يكتفِ الباحث بجمع البيانات، ...... حللها واستخلص منها نتائج مهمة.',o:['بل','لأن','أو','إذا'],a:0,e:'«لم يكتفِ ... بل».'},
 {s:'completion',q:'كلما ...... الإنسان في التخطيط، قلّت أخطاؤه في التنفيذ.',o:['أحكم','أهمل','تسرّع','قصّر'],a:0,e:'قلة الأخطاء نتيجة إحكام التخطيط.'},
 {s:'completion',q:'أُصيب اللاعب في الشوط الأول، ...... أكمل المباراة حتى النهاية.',o:['لكنه','لذلك','لأنه','حتى'],a:0,e:'الإكمال رغم الإصابة استدراك.'},
 {s:'completion',q:'الأمل ...... الحياة، فبدونه يفقد الإنسان دافعه.',o:['وقود','عائق','نهاية','ضعف'],a:0,e:'فقد الدافع بدونه يعني أنه محرّك.'},
 {s:'completion',q:'تنتشر الشائعات بسرعة حين ...... المعلومات الموثوقة.',o:['تغيب','تكثر','تتوفر','تنتشر'],a:0,e:'الشائعة تملأ غياب المعلومة.'},
 {s:'completion',q:'يحتاج الطالب إلى ...... بين الدراسة والراحة حتى لا يُصاب بالإرهاق.',o:['التوازن','الإهمال','التنافس','الخلط'],a:0,e:'تجنب الإرهاق يتطلب التوازن.'},
 {s:'completion',q:'كان الفارس ...... لا يهاب الموت.',o:['مقدامًا','جبانًا','مترددًا','خائفًا'],a:0,e:'عدم الهيبة شجاعة.'},
 {s:'completion',q:'النظافة من ......',o:['الإيمان','الغنى','العلم','الصحة'],a:0,e:'قول مشهور.'},
 {s:'completion',q:'لا يمكن ...... الماضي، لكن يمكن التعلم منه.',o:['تغيير','تذكّر','دراسة','فهم'],a:0,e:'«لكن» تقابل بين المستحيل والممكن.'}
);
VB_EN.push(
 {s:'context',q:'The falcon is known for its sharp eyesight, so it can see prey only from very short distances.',o:['sharp','see','prey','short'],a:3,e:'Sharp eyesight means seeing from far away.'},
 {s:'context',q:'The streets were jammed with cars, so the employees were delayed and arrived at work early.',o:['jammed','delayed','arrived','early'],a:3,e:'Anchors: "jammed" and "delayed".'},
 {s:'context',q:'Water boils at 100 degrees Celsius and freezes at 50 degrees.',o:['boils','100','freezes','50'],a:3,e:'Water freezes at 0.'},
 {s:'context',q:'The sun sets in the east, and night falls and the stars appear.',o:['east','night','falls','appear'],a:0,e:'The sun sets in the west.'},
 {s:'context',q:'The student excelled in his studies, so he failed every subject and came first.',o:['excelled','failed','every','first'],a:1,e:'It should be "passed".'},
 {s:'context',q:'A book is a loyal friend that keeps you company when you are alone and abandons you when you need it.',o:['loyal','company','alone','abandons'],a:3,e:'It should be "supports".'},
 {s:'context',q:'To keep children safe, medicines are stored within easy reach of their hands.',o:['safe','medicines','stored','within'],a:3,e:'It should be "out of reach".'},
 {s:'context',q:'Because oxygen is scarce at high altitudes, climbers breathe easily and comfortably.',o:['scarce','altitudes','breathe','easily'],a:3,e:'It should be "with difficulty".'},
 {s:'context',q:'Honesty is among the lowest qualities a person can have.',o:['lowest','qualities','person','have'],a:0,e:'It should be "noblest".'},
 {s:'context',q:'Rain falls when water droplets in clouds condense and become lighter, so they drop to the ground.',o:['falls','condense','lighter','drop'],a:2,e:'It should be "heavier".'},
 {s:'context',q:'Pot handles are made of plastic because it is a good conductor of heat, so hands do not get burned.',o:['handles','made','plastic','good'],a:3,e:'It should be "poor".'},
 {s:'context',q:'The faster a car goes, the shorter the distance it needs to stop.',o:['faster','car','shorter','stop'],a:2,e:'It should be "longer".'},
 {s:'context',q:'A brave person faces danger with a trembling heart and moves forward without hesitation.',o:['brave','faces','trembling','hesitation'],a:2,e:'It should be "steady".'},
 {s:'context',q:'Spring fills the soul with gloom through its colorful flowers and mild weather.',o:['gloom','colorful','flowers','mild'],a:0,e:'It should be "joy".'},
 {s:'context',q:'Be extravagant with your allowance so that it lasts until the end of the month.',o:['extravagant','allowance','lasts','end'],a:0,e:'It should be "thrifty"; spending freely does not make money last.'},
 {s:'context',q:'The desert keeps its heat at night, so temperatures drop sharply after sunset.',o:['keeps','night','drop','sunset'],a:0,e:'It should be "loses".'},
 {s:'context',q:'The students listened to the teacher attentively, so they understood nothing of the lesson.',o:['listened','attentively','nothing','lesson'],a:2,e:'It should be "everything".'},
 {s:'context',q:'Desert plants have broad leaves to reduce water loss through evaporation.',o:['broad','leaves','reduce','evaporation'],a:0,e:'It should be "small" or "needle-like".'},
 {s:'context',q:'When the team won the championship, sadness filled the stadium and the cheering grew louder.',o:['won','sadness','stadium','cheering'],a:1,e:'It should be "joy".'},
 {s:'completion',q:'We should not judge people by their ______, since the essence matters more than the look.',o:['appearance','actions','manners','work'],a:0,e:'Contrast between appearance and essence.'},
 {s:'completion',q:'The exam was so ______ that most students finished early.',o:['easy','hard','long','complex'],a:0,e:'Finishing early follows ease.'},
 {s:'completion',q:'Pollution leads to a ______ in air quality, which affects human health.',o:['decline','rise','stability','improvement'],a:0,e:'Pollution lowers quality.'},
 {s:'completion',q:'Patience in studying is ______, but its results are sweet.',o:['bitter','sweet','short','easy'],a:0,e:'"but" contrasts with "sweet".'},
 {s:'completion',q:'The researcher not only collected data but ______ analyzed it and drew important conclusions.',o:['also','because','or','if'],a:0,e:'"not only ... but also".'},
 {s:'completion',q:'The more ______ a person plans, the fewer mistakes he makes.',o:['carefully','carelessly','hastily','rarely'],a:0,e:'Fewer mistakes follow careful planning.'},
 {s:'completion',q:'The player was injured in the first half, ______ he finished the match.',o:['yet','so','because','since'],a:0,e:'Finishing despite injury is a contrast.'},
 {s:'completion',q:'Hope is the ______ of life; without it a person loses motivation.',o:['fuel','obstacle','end','weakness'],a:0,e:'It drives motivation.'},
 {s:'completion',q:'Rumors spread quickly when reliable information is ______.',o:['absent','plentiful','available','shared'],a:0,e:'Rumors fill the gap.'},
 {s:'completion',q:'A student needs ______ between study and rest to avoid burnout.',o:['balance','neglect','rivalry','confusion'],a:0,e:'Avoiding burnout needs balance.'},
 {s:'completion',q:'The knight was ______ and did not fear death.',o:['fearless','cowardly','hesitant','timid'],a:0,e:'Not fearing death is courage.'},
 {s:'completion',q:'Cleanliness is next to ______.',o:['godliness','wealth','laziness','beauty'],a:0,e:'A common saying.'},
 {s:'completion',q:'We cannot ______ the past, but we can learn from it.',o:['change','remember','study','understand'],a:0,e:'"but" contrasts the impossible with the possible.'}
);

VB_AR.push(
 {s:'analogy',q:'ليل : نهار',o:['صيف : شتاء','شمس : ضوء','قمر : نجم','مساء : غروب'],a:0,e:'تضاد بين زمنين متقابلين.'},
 {s:'analogy',q:'عين : بصر',o:['أذن : سمع','يد : أصابع','أنف : وجه','لسان : فم'],a:0,e:'عضو ووظيفته.'},
 {s:'analogy',q:'كاتب : رواية',o:['رسام : لوحة','قارئ : كتاب','معلم : طالب','مهندس : مكتب'],a:0,e:'المبدع وما يُنتجه.'},
 {s:'analogy',q:'تفاح : فاكهة',o:['نحاس : معدن','شجرة : غابة','ماء : نهر','جزر : حديقة'],a:0,e:'فرد من صنف. «شجرة : غابة» جزء من كل.'},
 {s:'analogy',q:'حذاء : قدم',o:['قفاز : يد','ساعة : وقت','عين : نظارة','جورب : حذاء'],a:0,e:'ما يُلبس على العضو. «عين : نظارة» بترتيب معكوس.'},
 {s:'analogy',q:'ثلج : بارد',o:['نار : حارة','ماء : نهر','ليل : نجوم','سكر : مصنع'],a:0,e:'الشيء وصفته الملازمة له.'},
 {s:'analogy',q:'مدرسة : تعليم',o:['مستشفى : علاج','ملعب : لاعب','سوق : بائع','مطبخ : طاهٍ'],a:0,e:'مكان ووظيفته. بقية الخيارات مكان ومن يوجد فيه.'}
);
VB_EN.push(
 {s:'analogy',q:'NIGHT : DAY',o:['summer : winter','sun : light','moon : star','evening : sunset'],a:0,e:'Opposite times.'},
 {s:'analogy',q:'EYE : SIGHT',o:['ear : hearing','hand : finger','nose : face','tongue : mouth'],a:0,e:'An organ and its function.'},
 {s:'analogy',q:'COMPOSER : SYMPHONY',o:['architect : building','reader : book','teacher : student','engineer : office'],a:0,e:'A creator and what they create.'},
 {s:'analogy',q:'APPLE : FRUIT',o:['copper : metal','tree : forest','water : river','carrot : garden'],a:0,e:'A member of a category. "tree : forest" is part and whole.'},
 {s:'analogy',q:'SHOE : FOOT',o:['glove : hand','watch : time','eye : glasses','sock : shoe'],a:0,e:'What is worn on a body part. "eye : glasses" is reversed.'},
 {s:'analogy',q:'ICE : COLD',o:['fire : hot','water : river','night : stars','sugar : factory'],a:0,e:'A thing and its built-in quality.'},
 {s:'analogy',q:'SCHOOL : EDUCATION',o:['hospital : treatment','stadium : player','market : seller','kitchen : cook'],a:0,e:'A place and its function. The others are a place and who is found there.'}
);

/* ---------- proverb / idiom completion generator ---------- */
const PROVERBS = {
 ar:[['العلم نور والجهل ......','ظلام'],['خير الأمور ......','أوسطها'],['الوقت كالسيف إن لم تقطعه ......','قطعك'],['من جدّ وجد ومن زرع ......','حصد'],['إذا كان الكلام من فضة فالسكوت من ......','ذهب'],['رُبّ أخٍ لك لم تلده ......','أمك'],['العقل السليم في الجسم ......','السليم'],['اطلبوا العلم من المهد إلى ......','اللحد'],['درهم وقاية خير من قنطار ......','علاج'],['في التأني السلامة وفي العجلة ......','الندامة'],['لكل مقام ......','مقال'],['ما حكّ جلدك مثل ......','ظفرك'],['يد واحدة لا ......','تصفق'],['الجار قبل ......','الدار'],['الرفيق قبل ......','الطريق'],['عند الامتحان يُكرم المرء أو ......','يُهان'],['كل إناء بما فيه ......','ينضح'],['القرش الأبيض ينفع في اليوم ......','الأسود'],['من سار على الدرب ......','وصل'],['الصبر مفتاح ......','الفرج'],['أول الغيث ......','قطرة'],['تجري الرياح بما لا تشتهي ......','السفن'],['خير جليس في الزمان ......','كتاب'],['إن غدًا لناظره ......','قريب'],['على قدر أهل العزم تأتي ......','العزائم'],['ما لا يُدرك كله لا يُترك ......','جُلّه'],['لسانك حصانك إن صنته ......','صانك'],['من طلب العلا سهر ......','الليالي'],['الحاجة أم ......','الاختراع'],['اتق شر من أحسنت ......','إليه'],['بلغ السيل ......','الزبى'],['سبق السيف ......','العذل'],['قيمة كل امرئ ما ......','يحسنه']],
 en:[['Actions speak louder than ______.','words'],['Better late than ______.','never'],['Every cloud has a silver ______.','lining'],['Don\'t judge a book by its ______.','cover'],['The early bird catches the ______.','worm'],['Where there\'s a will, there\'s a ______.','way'],['Knowledge is ______.','power'],['Rome wasn\'t built in a ______.','day'],['Two heads are better than ______.','one'],['Honesty is the best ______.','policy'],['Look before you ______.','leap'],['Time is ______.','money'],['Slow and steady wins the ______.','race'],['Great minds think ______.','alike'],['Birds of a feather flock ______.','together'],['The pen is mightier than the ______.','sword'],['Haste makes ______.','waste'],['Prevention is better than ______.','cure'],['All that glitters is not ______.','gold'],['Absence makes the heart grow ______.','fonder'],['Necessity is the mother of ______.','invention'],['An apple a day keeps the doctor ______.','away'],['Curiosity killed the ______.','cat'],['Don\'t count your chickens before they ______.','hatch'],['Every rose has its ______.','thorn'],['When one door closes, another ______.','opens'],['Strike while the iron is ______.','hot'],['No pain, no ______.','gain']]
};
function genProverb(lang){ return genFork(()=>_genProverb(lang)); }
function _genProverb(lang){
  const L0=PROVERBS[lang]; const p=pick(L0); const others=shuffle(L0.filter(x=>x[1]!==p[1])).slice(0,3).map(x=>x[1]);
  const full=p[0].replace(/\.{3,}|_{3,}/,p[1]);
  return {s:'completion',q:p[0],o:[p[1],...others],a:0,e:lang==='ar'?`مثل أو قول مأثور بصيغة ثابتة: «${full}».`:`A fixed saying: "${full}"`,gen:1};
}
/* ============ Quant bank expansion ============ */
const C=(ar,en,a,ear,een)=>({s:'comparison',cmp:1,q:{ar,en},a,e:{ar:ear,en:een}});
const Qx=(s,ar,en,o,ear,een)=>({s,q:{ar,en},o,a:0,e:{ar:ear,en:een}});
QB.push(
 C('ن عدد صحيح فردي<br>القيمة الأولى: ⟦ن^2⟧<br>القيمة الثانية: ⟦ن⟧','n is an odd integer<br>Quantity A: ⟦n^2⟧<br>Quantity B: ⟦n⟧',3,'عند ⟦ن = 1⟧ متساويتان، وعند ⟦ن = 3⟧ الأولى أكبر.','At ⟦n = 1⟧ equal; at ⟦n = 3⟧ A is greater.'),
 C('القيمة الأولى: ⟦2^10⟧<br>القيمة الثانية: ⟦1000⟧','Quantity A: ⟦2^10⟧<br>Quantity B: ⟦1000⟧',0,'⟦2^10 = 1024⟧','⟦2^10 = 1024⟧'),
 C('القيمة الأولى: ⟦3 × (4 + 5)⟧<br>القيمة الثانية: ⟦3 × 4 + 5⟧','Quantity A: ⟦3 × (4 + 5)⟧<br>Quantity B: ⟦3 × 4 + 5⟧',0,'⟦27⟧ مقابل ⟦17⟧ (الأقواس أولًا).','⟦27⟧ vs ⟦17⟧ (brackets first).'),
 C('⟦س^2 = 16⟧<br>القيمة الأولى: ⟦س⟧<br>القيمة الثانية: ⟦4⟧','⟦x^2 = 16⟧<br>Quantity A: ⟦x⟧<br>Quantity B: ⟦4⟧',3,'س قد تكون ⟦4⟧ أو ⟦−4⟧.','x can be ⟦4⟧ or ⟦−4⟧.'),
 C('القيمة الأولى: متوسط ⟦3، 5، 7⟧<br>القيمة الثانية: وسيط ⟦3، 5، 7⟧','Quantity A: mean of ⟦3, 5, 7⟧<br>Quantity B: median of ⟦3, 5, 7⟧',2,'كلاهما ⟦5⟧.','Both are ⟦5⟧.'),
 C('القيمة الأولى: ⟦0.3⟧<br>القيمة الثانية: ⟦1/3⟧','Quantity A: ⟦0.3⟧<br>Quantity B: ⟦1/3⟧',1,'⟦1/3 = 0.333...⟧','⟦1/3 = 0.333...⟧'),
 C('⟦أ > 0⟧ و ⟦ب < 0⟧<br>القيمة الأولى: ⟦أ − ب⟧<br>القيمة الثانية: ⟦أ + ب⟧','⟦a > 0⟧ and ⟦b < 0⟧<br>Quantity A: ⟦a − b⟧<br>Quantity B: ⟦a + b⟧',0,'طرح السالب إضافة، وجمعه نقص.','Subtracting a negative adds; adding it subtracts.'),
 C('القيمة الأولى: 25% من 80<br>القيمة الثانية: 80% من 25','Quantity A: 25% of 80<br>Quantity B: 80% of 25',2,'كلاهما ⟦20⟧. قاعدة: أ% من ب = ب% من أ.','Both ⟦20⟧. Rule: a% of b = b% of a.'),
 C('القيمة الأولى: ⟦√50⟧<br>القيمة الثانية: ⟦7⟧','Quantity A: ⟦√50⟧<br>Quantity B: ⟦7⟧',0,'⟦7 = √49 < √50⟧','⟦7 = √49 < √50⟧'),
 C('دائرة نصف قطرها 3<br>القيمة الأولى: محيطها<br>القيمة الثانية: مساحتها','A circle has radius 3<br>Quantity A: its circumference<br>Quantity B: its area',1,'⟦6π < 9π⟧','⟦6π < 9π⟧'),
 C('⟦0 < س < 1⟧<br>القيمة الأولى: ⟦س⟧<br>القيمة الثانية: ⟦√س⟧','⟦0 < x < 1⟧<br>Quantity A: ⟦x⟧<br>Quantity B: ⟦√x⟧',1,'مثال ⟦س = 0.25 ، √س = 0.5⟧','Example ⟦x = 0.25, √x = 0.5⟧'),
 C('القيمة الأولى: عدد أضلاع السداسي<br>القيمة الثانية: عدد أضلاع الخماسي + 1','Quantity A: sides of a hexagon<br>Quantity B: sides of a pentagon + 1',2,'⟦6 = 5 + 1⟧','⟦6 = 5 + 1⟧'),
 Qx('arith','ما أصغر عدد أولي أكبر من 20؟','What is the smallest prime number greater than 20?',['23','21','25','29'],'21 = 3 × 7 و 22 زوجي، و 23 أولي.','21 = 3 × 7, 22 is even, 23 is prime.'),
 Qx('arith','إذا كان 40% من عدد يساوي 24، فما العدد؟','If 40% of a number is 24, what is the number?',['60','96','64','50'],'⟦24 ÷ 0.4 = 60⟧','⟦24 ÷ 0.4 = 60⟧'),
 Qx('geometry','مستطيل النسبة بين طوله وعرضه 5 : 3 ومحيطه 64 سم. ما طوله؟','A rectangle\'s length to width ratio is 5 : 3 and its perimeter is 64 cm. What is its length?',['20','12','24','16'],'⟦2(5ك + 3ك) = 64⟧ → ⟦ك = 4⟧ → الطول ⟦5 × 4 = 20⟧','⟦2(5k + 3k) = 64⟧ → ⟦k = 4⟧ → length ⟦5 × 4 = 20⟧'),
 Qx('arith','غادر قطار الساعة 9:45 ووصل الساعة 13:10. كم استغرقت الرحلة؟','A train left at 9:45 and arrived at 13:10. How long was the trip?',['3 س 25 د','3 س 35 د','4 س 25 د','3 س 15 د'].map((x,i)=>({ar:x,en:['3 h 25 min','3 h 35 min','4 h 25 min','3 h 15 min'][i]})),'من 9:45 إلى 12:45 ثلاث ساعات، ثم 25 دقيقة.','9:45 to 12:45 is 3 hours, then 25 minutes.'),
 Qx('geometry','ما قياس الزاوية الصغرى بين عقربي الساعة عند الساعة 3:00؟','What is the smaller angle between the clock hands at 3:00?',['90°','60°','120°','180°'],'كل ساعة ⟦30°⟧، و ⟦3 × 30 = 90⟧','Each hour is ⟦30°⟧, ⟦3 × 30 = 90⟧'),
 Qx('geometry','ما قياس الزاوية الداخلية في السداسي المنتظم؟','What is each interior angle of a regular hexagon?',['120°','108°','135°','60°'],'⟦(6 − 2) × 180 ÷ 6 = 120⟧','⟦(6 − 2) × 180 ÷ 6 = 120⟧'),
 Qx('geometry','مكعب طول حرفه 4 سم. ما حجمه بالسنتيمتر المكعب؟','A cube has an edge of 4 cm. What is its volume in cm³?',['64','16','48','96'],'⟦4^3 = 64⟧ (96 هي المساحة الكلية، فخ شائع)','⟦4^3 = 64⟧ (96 is the surface area, a common trap)'),
 Qx('algebra','إذا كان ⟦س + ص = 10⟧ و ⟦س − ص = 4⟧ فما قيمة س؟','If ⟦x + y = 10⟧ and ⟦x − y = 4⟧, what is x?',['7','3','6','14'],'بالجمع: ⟦2س = 14 → س = 7⟧','Add: ⟦2x = 14 → x = 7⟧'),
 Qx('algebra','إذا كان ⟦2^س = 32⟧ فما قيمة س؟','If ⟦2^x = 32⟧, what is x?',['5','4','6','16'],'⟦2^5 = 32⟧','⟦2^5 = 32⟧'),
 Qx('stats','متوسط خمسة أعداد صحيحة متتالية 12. ما أكبرها؟','The mean of five consecutive integers is 12. What is the largest?',['14','12','16','13'],'الأعداد ⟦10، 11، 12، 13، 14⟧','The numbers are ⟦10, 11, 12, 13, 14⟧'),
 Qx('stats','صندوق فيه 3 كرات حمراء و 5 كرات زرقاء. ما احتمال سحب كرة حمراء عشوائيًا؟','A box has 3 red and 5 blue balls. What is the probability of drawing a red ball at random?',['⟦3/8⟧','⟦3/5⟧','⟦5/8⟧','⟦1/3⟧'],'⟦3 ÷ (3 + 5) = 3/8⟧','⟦3 ÷ (3 + 5) = 3/8⟧'),
 Qx('arith','ما ناتج ⟦0.2 ÷ 0.05⟧؟','What is ⟦0.2 ÷ 0.05⟧?',['4','0.4','40','0.01'],'⟦20 ÷ 5 = 4⟧ بعد ضرب الطرفين في 100.','⟦20 ÷ 5 = 4⟧ after multiplying both by 100.'),
 Qx('arith','ينجز 15 عاملًا عملًا في 8 أيام. في كم يومًا ينجزه 10 عمال بالمعدل نفسه؟','15 workers finish a job in 8 days. How many days for 10 workers at the same rate?',['12','10','6','16'],'تناسب عكسي: ⟦15 × 8 = 120 ، 120 ÷ 10 = 12⟧','Inverse proportion: ⟦15 × 8 = 120, 120 ÷ 10 = 12⟧'),
 Qx('arith','ارتفع سعر سلعة 10% ثم انخفض 10%. ما التغير الكلي؟','A price rose 10% then fell 10%. What is the net change?',['−1%','0%','+1%','−10%'],'⟦1.1 × 0.9 = 0.99⟧ أي نقص 1% (التغير −1%).','⟦1.1 × 0.9 = 0.99⟧, a 1% decrease (−1%).'),
 Qx('arith','ما ناتج ⟦1/4 + 2/3⟧؟','What is ⟦1/4 + 2/3⟧?',['⟦11/12⟧','⟦3/7⟧','⟦3/12⟧','⟦2/12⟧'],'⟦3/12 + 8/12 = 11/12⟧','⟦3/12 + 8/12 = 11/12⟧'),
 Qx('algebra','ما ميل المستقيم المار بالنقطتين ⟦(1، 2)⟧ و ⟦(3، 8)⟧؟','What is the slope of the line through ⟦(1, 2)⟧ and ⟦(3, 8)⟧?',['3','2','6','⟦1/3⟧'],'⟦(8 − 2) ÷ (3 − 1) = 3⟧','⟦(8 − 2) ÷ (3 − 1) = 3⟧'),
 Qx('geometry','ما مجموع قياسات الزوايا الداخلية للمضلع الخماسي؟','What is the sum of the interior angles of a pentagon?',['540°','360°','720°','450°'],'⟦(5 − 2) × 180 = 540⟧','⟦(5 − 2) × 180 = 540⟧'),
 Qx('algebra','إذا كان ⟦3/س = 12/20⟧ فما قيمة س؟','If ⟦3/x = 12/20⟧, what is x?',['5','4','80','6'],'⟦12س = 60 → س = 5⟧','⟦12x = 60 → x = 5⟧'),
 Qx('stats','في فصل: 12 طالبًا درجاتهم 80، و 8 طلاب درجاتهم 90. ما المتوسط؟','In a class, 12 students scored 80 and 8 scored 90. What is the mean?',['84','85','86','82'],'⟦(960 + 720) ÷ 20 = 84⟧','⟦(960 + 720) ÷ 20 = 84⟧'),
 Qx('arith','أيّ الأعداد الآتية أكبر؟','Which of these is largest?',['⟦0.7⟧','⟦2/3⟧','⟦5/8⟧','⟦13/20⟧'],'⟦2/3 ≈ 0.667⟧ ، ⟦5/8 = 0.625⟧ ، ⟦13/20 = 0.65⟧ وكلها أصغر من ⟦0.7⟧','⟦2/3 ≈ 0.667⟧, ⟦5/8 = 0.625⟧, ⟦13/20 = 0.65⟧, all less than ⟦0.7⟧'),
 Qx('algebra','إذا كان ⟦أ = −2⟧ فما قيمة ⟦أ^3 − أ⟧؟','If ⟦a = −2⟧, what is ⟦a^3 − a⟧?',['−6','−10','6','−8'],'⟦−8 − (−2) = −6⟧','⟦−8 − (−2) = −6⟧'),
 Qx('arith','قرأ أحمد 30% من كتاب عدد صفحاته 250. كم صفحة بقيت؟','Ahmed read 30% of a 250-page book. How many pages are left?',['175','75','150','220'],'المتبقي ⟦70% × 250 = 175⟧','Remaining ⟦70% × 250 = 175⟧'),
 Qx('stats','ما المنوال للقيم: ⟦3، 7، 7، 2، 9، 7، 3⟧؟','What is the mode of: ⟦3, 7, 7, 2, 9, 7, 3⟧?',['7','3','5','9'],'العدد 7 تكرر ثلاث مرات، وهو الأكثر تكرارًا.','7 appears three times, more than any other value.'),
 Qx('stats','ما الوسيط للقيم: ⟦4، 9، 1، 7، 3، 8⟧؟','What is the median of: ⟦4, 9, 1, 7, 3, 8⟧?',['5.5','4','7','5.3'],'بعد الترتيب ⟦1، 3، 4، 7، 8، 9⟧ وعدد القيم زوجي: ⟦(4 + 7) ÷ 2 = 5.5⟧','Sorted ⟦1, 3, 4, 7, 8, 9⟧, an even count: ⟦(4 + 7) ÷ 2 = 5.5⟧'),
 Qx('stats','ما المدى للقيم: ⟦12، 5، 20، 9، 15⟧؟','What is the range of: ⟦12, 5, 20, 9, 15⟧?',['15','20','12','11'],'المدى = أكبر قيمة − أصغر قيمة: ⟦20 − 5 = 15⟧','Range = largest − smallest: ⟦20 − 5 = 15⟧'),
 Qx('stats','حصل طالب على 70 و 80 و 90 في ثلاثة اختبارات. كم يحتاج في الاختبار الرابع ليصبح متوسطه 85؟','A student scored 70, 80 and 90 on three tests. What score on the fourth test makes the mean 85?',['100','95','85','90'],'⟦4 × 85 = 340⟧ ، ⟦340 − 240 = 100⟧','⟦4 × 85 = 340⟧, ⟦340 − 240 = 100⟧'),
 Qx('stats','رُمي حجر نرد منتظم مرة واحدة. ما احتمال ظهور عدد زوجي؟','A fair die is rolled once. What is the probability of an even number?',['⟦1/2⟧','⟦1/3⟧','⟦1/6⟧','⟦2/3⟧'],'الأعداد الزوجية 2 و 4 و 6: ⟦3/6 = 1/2⟧','Even numbers are 2, 4 and 6: ⟦3/6 = 1/2⟧'),
 Qx('stats','رُمي حجر نرد منتظم مرة واحدة. ما احتمال ظهور عدد أكبر من 4؟','A fair die is rolled once. What is the probability of a number greater than 4?',['⟦1/3⟧','⟦1/2⟧','⟦2/3⟧','⟦1/6⟧'],'العددان 5 و 6: ⟦2/6 = 1/3⟧','The numbers 5 and 6: ⟦2/6 = 1/3⟧'),
 Qx('stats','متوسط 5 أعداد يساوي 20. إذا حُذف منها العدد 40، فما متوسط الأعداد الباقية؟','The mean of 5 numbers is 20. If the number 40 is removed, what is the mean of the rest?',['15','16','20','12'],'⟦5 × 20 = 100⟧ ، ⟦(100 − 40) ÷ 4 = 15⟧','⟦5 × 20 = 100⟧, ⟦(100 − 40) ÷ 4 = 15⟧'),
 Qx('stats','عدد زوار معرض: الخميس 120، الجمعة 180، السبت 150. ما نسبة زوار الجمعة من مجموع الزوار؟','Exhibition visitors: Thu 120, Fri 180, Sat 150. What percent of all visitors came on Friday?',['40%','36%','45%','33%'],'المجموع 450، و ⟦180 ÷ 450 × 100 = 40%⟧','Total 450, and ⟦180 ÷ 450 × 100 = 40%⟧'),
 Qx('geometry','مثلث طول قاعدته 10 سم وارتفاعه 6 سم. ما مساحته بالسنتيمتر المربع؟','A triangle has a base of 10 cm and a height of 6 cm. What is its area in cm²?',['30','60','16','32'],'⟦½ × 10 × 6 = 30⟧ (60 خطأ نسيان النصف)','⟦½ × 10 × 6 = 30⟧ (60 forgets the half)'),
 Qx('geometry','مربع طول قطره 10 سم. ما مساحته بالسنتيمتر المربع؟','A square has a diagonal of 10 cm. What is its area in cm²?',['50','100','25','40'],'مساحة المربع = القطر² ÷ 2: ⟦100 ÷ 2 = 50⟧','Square area = diagonal² ÷ 2: ⟦100 ÷ 2 = 50⟧'),
 Qx('geometry','متوازي مستطيلات أبعاده 2 سم و 3 سم و 5 سم. ما حجمه بالسنتيمتر المكعب؟','A box measures 2 cm by 3 cm by 5 cm. What is its volume in cm³?',['30','10','62','15'],'⟦2 × 3 × 5 = 30⟧ (62 هي المساحة الكلية)','⟦2 × 3 × 5 = 30⟧ (62 is the surface area)'),
 Qx('geometry','مثلث متطابق الضلعين قياس زاوية رأسه 40°. ما قياس كل من زاويتي القاعدة؟','An isosceles triangle has a vertex angle of 40°. What is each base angle?',['70°','40°','140°','50°'],'⟦(180 − 40) ÷ 2 = 70⟧','⟦(180 − 40) ÷ 2 = 70⟧'),
 Qx('geometry','دائرة محيطها ⟦12π⟧ سم. ما مساحتها؟','A circle has a circumference of ⟦12π⟧ cm. What is its area?',['⟦36π⟧','⟦144π⟧','⟦12π⟧','⟦6π⟧'],'⟦2πنق = 12π⟧ → ⟦نق = 6⟧ → ⟦π × 6^2 = 36π⟧','⟦2πr = 12π⟧ → ⟦r = 6⟧ → ⟦π × 6^2 = 36π⟧'),
 Qx('geometry','زاويتان متتامتان (مجموعهما 90°) والفرق بينهما 20°. ما قياس الصغرى؟','Two complementary angles (sum 90°) differ by 20°. What is the smaller angle?',['35°','55°','20°','45°'],'⟦(90 − 20) ÷ 2 = 35⟧','⟦(90 − 20) ÷ 2 = 35⟧'),
 Qx('geometry','مثلث قائم الزاوية طول وتره 13 وطول أحد ضلعي القائمة 5. ما طول الضلع الآخر؟','A right triangle has hypotenuse 13 and one leg 5. What is the other leg?',['12','8','18','10'],'⟦√(169 − 25) = √144 = 12⟧','⟦√(169 − 25) = √144 = 12⟧'),
 Qx('algebra','إذا كان ⟦2(س − 3) = 10⟧ فما قيمة س؟','If ⟦2(x − 3) = 10⟧, what is x?',['8','2','6.5','5'],'⟦س − 3 = 5 → س = 8⟧','⟦x − 3 = 5 → x = 8⟧'),
 Qx('algebra','إذا كان ⟦س^2 − 9 = 0⟧ وكانت س موجبة، فما قيمة س؟','If ⟦x^2 − 9 = 0⟧ and x is positive, what is x?',['3','9','−3','4.5'],'⟦س^2 = 9 → س = 3⟧ (−3 مرفوضة لأن س موجبة)','⟦x^2 = 9 → x = 3⟧ (−3 is excluded since x is positive)'),
 Qx('algebra','ما قيمة ⟦3^4 × 3^2 ÷ 3^5⟧؟','What is ⟦3^4 × 3^2 ÷ 3^5⟧?',['3','9','27','1'],'⟦3^(4 + 2 − 5) = 3^1 = 3⟧','⟦3^(4 + 2 − 5) = 3^1 = 3⟧'),
 Qx('algebra','إذا كان ⟦س/4 + 2 = 5⟧ فما قيمة س؟','If ⟦x/4 + 2 = 5⟧, what is x?',['12','28','3','7'],'⟦س/4 = 3 → س = 12⟧','⟦x/4 = 3 → x = 12⟧'),
 Qx('algebra','عدد إذا ضُرب في 3 ثم أُضيف إلى الناتج 4 كان المجموع 25. ما العدد؟','A number is multiplied by 3 and then 4 is added, giving 25. What is the number?',['7','9','21','8'],'⟦3س + 4 = 25 → 3س = 21 → س = 7⟧','⟦3x + 4 = 25 → 3x = 21 → x = 7⟧'),
 Qx('arith','ما ناتج ⟦48 ÷ 0.6⟧؟','What is ⟦48 ÷ 0.6⟧?',['80','8','0.8','800'],'⟦480 ÷ 6 = 80⟧ بعد ضرب الطرفين في 10.','⟦480 ÷ 6 = 80⟧ after multiplying both by 10.'),
 Qx('arith','ما العدد الذي 25% منه تساوي 15% من 200؟','25% of what number equals 15% of 200?',['120','30','75','150'],'⟦15% × 200 = 30⟧ ، ⟦30 ÷ 0.25 = 120⟧','⟦15% × 200 = 30⟧, ⟦30 ÷ 0.25 = 120⟧'),
 Qx('arith','اشترى تاجر سلعة بـ 80 ريالًا وباعها بـ 100 ريال. ما نسبة ربحه؟','A merchant bought an item for 80 SAR and sold it for 100 SAR. What was his percent profit?',['25%','20%','80%','125%'],'الربح 20، و ⟦20 ÷ 80 × 100 = 25%⟧ (نقسم على سعر الشراء)','Profit 20, and ⟦20 ÷ 80 × 100 = 25%⟧ (divide by the cost price)'),
 Qx('algebra','ما العدد التالي: ⟦3، 5، 9، 17، 33، ...⟧؟','What comes next: ⟦3, 5, 9, 17, 33, ...⟧?',['65','49','64','66'],'الفروق تتضاعف: 2، 4، 8، 16، ثم 32، أي ⟦33 + 32 = 65⟧.','Differences double: 2, 4, 8, 16, then 32, so ⟦33 + 32 = 65⟧.')
);

/* ---------- extra quant generators ---------- */
Object.assign(GENS,{
  percentOf(){ const p=pick([10,20,25,40,50,75]); const X=20*R(2,20); const Y=p*X/100;
    /* integer distractors only: a lone decimal among whole numbers gives itself away */
    return {s:'arith',q:bi(`إذا كان ${p}% من عدد يساوي ${Y}، فما العدد؟`,`If ${p}% of a number is ${Y}, what is the number?`),o:mkOpts(X,[Y*p/100,Y+p,X/2,X+Y,Y*2].filter(Number.isInteger)),e:bi(`⟦${Y} ÷ ${p/100} = ${X}⟧`,`⟦${Y} ÷ ${p/100} = ${X}⟧`)}; },
  workers(){ let w,d,tot,w2; do{ w=pick([4,5,6,8,10,12]); d=pick([3,4,5,6,8,9,10,12]); tot=w*d; w2=pick([2,3,4,5,6,8,10,12,15,20].filter(x=>x!==w&&tot%x===0)); }while(!w2); const ans=tot/w2;
    const WK=['عامل واحد','عاملان','عمال','عاملًا'], DY=['يوم واحد','يومين','أيام','يومًا'];
    return {s:'arith',q:bi(`ينجز ${arC(w,WK)} عملًا في ${arC(d,DY)}. في كم يومًا ينجزه ${arC(w2,WK)} بالمعدل نفسه؟`,`${w} workers finish a job in ${d} days. How many days would ${w2} workers take at the same rate?`),o:mkOpts(ans,[d*w2/w,d+w-w2,d,ans*2,w2].filter(Number.isInteger)),e:bi(`تناسب عكسي: ⟦${w} × ${d} = ${tot} ، ${tot} ÷ ${w2} = ${ans}⟧`,`Inverse proportion: ⟦${w} × ${d} = ${tot}, ${tot} ÷ ${w2} = ${ans}⟧`)}; },
  system(){ const x=R(2,15), y=R(1,x-1); const S=x+y, D=x-y;
    return {s:'algebra',q:bi(`إذا كان ⟦س + ص = ${S}⟧ و ⟦س − ص = ${D}⟧ فما قيمة ص؟`,`If ⟦x + y = ${S}⟧ and ⟦x − y = ${D}⟧, what is y?`),o:mkOpts(y,[x,S-D,y+1,D]),e:bi(`بالطرح: ⟦2ص = ${S} − ${D} = ${2*y} → ص = ${y}⟧`,`Subtract: ⟦2y = ${S} − ${D} = ${2*y} → y = ${y}⟧`)}; },
  consecutive(){ const n=pick([3,5]); const a=R(3,40); const sum=n*a+(n*(n-1))/2; const big=a+n-1;
    return {s:'algebra',q:bi(`مجموع ${n===3?'ثلاثة':'خمسة'} أعداد صحيحة متتالية يساوي ${sum}. ما أكبرها؟`,`The sum of ${n} consecutive integers is ${sum}. What is the largest?`),o:mkOpts(big,[a,sum/n,big+1,big-1]),e:bi(`الأوسط ⟦${sum} ÷ ${n} = ${sum/n}⟧، والأكبر ⟦${big}⟧`,`Middle ⟦= ${sum} ÷ ${n} = ${sum/n}⟧, largest ⟦= ${big}⟧`)}; },
  powerEq(){ const b=pick([2,3,4,5]); const x=R(2,b===2?7:4); const v=b**x;
    return {s:'algebra',q:bi(`إذا كان ⟦${b}^س = ${v}⟧ فما قيمة س؟`,`If ⟦${b}^x = ${v}⟧, what is x?`),o:mkOpts(x,[v/b,x+1,x-1,v/2]),e:bi(`⟦${b}^${x} = ${v}⟧`,`⟦${b}^${x} = ${v}⟧`)}; },
  slope(){ const x1=R(-3,4), y1=R(-4,6), m=pick([-3,-2,-1,1,2,3,4]), dx=R(1,4); const x2=x1+dx, y2=y1+m*dx; const P=n=>n<0?`(${N(n)})`:N(n);
    const w=`⟦(${N(y2)} − ${P(y1)}) ÷ (${N(x2)} − ${P(x1)})⟧ = ⟦${N(m*dx)} ÷ ${dx} = ${N(m)}⟧`;
    return {s:'algebra',q:bi(`ما ميل المستقيم المار بالنقطتين ⟦(${N(x1)}، ${N(y1)})⟧ و ⟦(${N(x2)}، ${N(y2)})⟧؟`,`What is the slope of the line through ⟦(${N(x1)}, ${N(y1)})⟧ and ⟦(${N(x2)}, ${N(y2)})⟧?`),o:mkOpts(m,[-m,m+1,dx,m*dx],N,true),e:bi(w,w)}; },
  polygon(){ const n=pick([5,6,8,9,10,12]); const sum=(n-2)*180; const names={5:['الخماسي','pentagon'],6:['السداسي','hexagon'],8:['الثماني','octagon'],9:['التساعي','nonagon'],10:['العشاري','decagon'],12:['الاثني عشري','dodecagon']}[n];
    if(rnd()<.5) return {s:'geometry',q:bi(`ما مجموع قياسات الزوايا الداخلية للمضلع ${names[0]}؟`,`What is the sum of the interior angles of a ${names[1]}?`),o:mkOpts(sum,[n*180,sum+180,sum-180,360],x=>N(x)+'°'),e:bi(`⟦(${n} − 2) × 180 = ${sum}⟧`,`⟦(${n} − 2) × 180 = ${sum}⟧`)};
    const each=sum/n; return {s:'geometry',q:bi(`ما قياس الزاوية الداخلية في ${names[0]} المنتظم؟`,`What is each interior angle of a regular ${names[1]}?`),o:mkOpts(each,[360/n,180-each+ (each===90?10:0),each+15,each-12],x=>N(x)+'°'),e:bi(`⟦(${n} − 2) × 180 ÷ ${n} = ${each}⟧`,`⟦(${n} − 2) × 180 ÷ ${n} = ${each}⟧`)}; },
  cube(){ const a=R(2,12); const v=a**3, sa=6*a*a;
    if(rnd()<.5) return {s:'geometry',q:bi(`مكعب طول حرفه ${a} سم. ما حجمه بالسنتيمتر المكعب؟`,`A cube has an edge of ${a} cm. What is its volume in cm³?`),o:mkOpts(v,[sa,a*a,3*a,v+a]),e:bi(`⟦${a}^3 = ${v}⟧`,`⟦${a}^3 = ${v}⟧`)};
    return {s:'geometry',q:bi(`مكعب طول حرفه ${a} سم. ما مساحته الكلية بالسنتيمتر المربع؟`,`A cube has an edge of ${a} cm. What is its total surface area in cm²?`),o:mkOpts(sa,[v,4*a*a,a*a,12*a]),e:bi(`⟦6 × ${a}^2 = ${sa}⟧`,`⟦6 × ${a}^2 = ${sa}⟧`)}; },
  clock(){ const h=R(1,11); let ang=30*h; if(ang>180) ang=360-ang;
    /* distractors stay within 0–180°: a "smaller angle" above 180° is never a plausible choice */
    if(rnd()<.4){ const ha=30*h+15, d=Math.abs(ha-180); /* h:30 → minute hand at 180°, hour hand halfway between h and h+1 */
      return {s:'geometry',q:bi(`ما قياس الزاوية الصغرى بين عقربي الساعة عند الساعة ${h}:30؟`,`What is the smaller angle between the clock hands at ${h}:30?`),o:mkOpts(d,[Math.abs(30*h-180),d+30,180-d,d+15,d-15].filter(x=>x>0&&x<=180),x=>N(x)+'°'),e:bi(`عقرب الدقائق عند ⟦180°⟧، وعقرب الساعات في منتصف المسافة بين ${h} و ${h+1}: ⟦${h} × 30 + 15 = ${ha}°⟧، والفرق ⟦${d}°⟧`,`The minute hand is at ⟦180°⟧; the hour hand is halfway between ${h} and ${h+1}: ⟦${h} × 30 + 15 = ${ha}°⟧, so the angle is ⟦${d}°⟧`)}; }
    return {s:'geometry',q:bi(`ما قياس الزاوية الصغرى بين عقربي الساعة عند الساعة ${h}:00؟`,`What is the smaller angle between the clock hands at ${h}:00?`),o:mkOpts(ang,[180-ang,ang+30,ang-30,6*h,15*h].filter(x=>x>0&&x<=180),x=>N(x)+'°'),e:bi(`كل ساعة ⟦30°⟧ ، ⟦${h} × 30 = ${30*h}⟧${30*h>180?` ، والصغرى ⟦360 − ${30*h} = ${ang}⟧`:''}`,`Each hour is ⟦30°⟧, ⟦${h} × 30 = ${30*h}⟧${30*h>180?`; smaller angle ⟦= 360 − ${30*h} = ${ang}⟧`:''}`)}; },
  prob(){ const r=R(1,7), b=R(1,9); const t=r+b, g=gcd(r,t); const ans=`${r/g}/${t/g}`;
    const f=(n,d)=>{const g=gcd(n,d);return `${n/g}/${d/g}`;}; const o=[ans]; [f(b,t),r<b?f(r,b):null,f(1,t),f(r,t+1),f(r+1,t+1)].filter(Boolean).forEach(c=>{ if(!o.includes(c)&&o.length<4) o.push(c); }); while(o.length<4) o.push(`${o.length}/${t+o.length}`);
    return {s:'stats',q:bi(`صندوق فيه ${arC(r,['كرة حمراء واحدة','كرتان حمراوان','كرات حمراء','كرة حمراء'])} و${arC(b,['كرة زرقاء واحدة','كرتان زرقاوان','كرات زرقاء','كرة زرقاء'])}. ما احتمال سحب كرة حمراء عشوائيًا؟`,`A box has ${r} red and ${b} blue ${b===1?'ball':'balls'}. What is the probability of drawing a red ball at random?`),o:o.map(x=>`⟦${x}⟧`),e:bi(`⟦${r} ÷ ${t} = ${ans}⟧`,`⟦${r} ÷ ${t} = ${ans}⟧`)}; },
  weightedAvg(){ let n1,n2,a1,a2,tot; do{ n1=R(3,8); n2=R(3,8); a1=10*R(5,8); a2=a1+pick([5,10,15]); tot=n1*a1+n2*a2; }while(tot%(n1+n2)); const ans=tot/(n1+n2);
    return {s:'stats',q:bi(`${n1} طلاب متوسط درجاتهم ${a1}، و ${n2} طلاب متوسطهم ${a2}. ما متوسط درجات الجميع؟`,`${n1} students averaged ${a1} and ${n2} students averaged ${a2}. What is the overall average?`),o:mkOpts(ans,[(a1+a2)/2,ans+2,ans-2,a2]),e:bi(`⟦(${n1*a1} + ${n2*a2}) ÷ ${n1+n2} = ${ans}⟧`,`⟦(${n1*a1} + ${n2*a2}) ÷ ${n1+n2} = ${ans}⟧`)}; },
  lcm(){ const pairs=[[4,6],[6,8],[6,9],[8,12],[9,12],[10,15],[12,18],[4,10],[6,10],[15,20],[8,10],[10,12],[12,16],[14,21],[6,15]]; const [a,b]=pick(pairs); const l=a*b/gcd(a,b); const SEC=['ثانية','ثانيتين','ثوانٍ','ثانية'];
    return {s:'arith',q:bi(`تضيء إشارة كل ${arC(a,SEC)} وأخرى كل ${arC(b,SEC)}. إذا أضاءتا معًا الآن، فبعد كم ثانية تضيئان معًا مرة أخرى؟`,`One light flashes every ${a} seconds and another every ${b} seconds. If they flash together now, after how many seconds will they flash together again?`),o:mkOpts(l,[a*b,a+b,gcd(a,b),l*2]),e:bi(`المضاعف المشترك الأصغر لـ ${a} و ${b} هو ⟦${l}⟧`,`The least common multiple of ${a} and ${b} is ⟦${l}⟧`)}; },
  sqrtSimp(){ const a=pick([2,3,4,5,6]); let b=pick([2,3,5,6,7]); while(b===a) b=pick([2,3,5,6,7]); const n=a*a*b;
    const sq=k=>Number.isInteger(Math.sqrt(k)); const o=[`${a}√${b}`]; const vals=[a*Math.sqrt(b)];
    /* no two options may be equal in value (3√12 is 6√3): compare numerically, not as text */
    [[b,a],[a*a,b],[a,b*2],[a+1,b],[a,b+1],[2*a,b]].forEach(([c,k])=>{ const x=`${c}√${k}`, v=c*Math.sqrt(k); if(o.length<4&&!sq(k)&&!vals.some(y=>Math.abs(y-v)<1e-9)){ o.push(x); vals.push(v); } });
    return {s:'algebra',q:bi(`ما أبسط صورة للعدد ⟦√${n}⟧؟`,`What is the simplest form of ⟦√${n}⟧?`),o:o.map(x=>`⟦${x}⟧`),e:bi(`⟦√${n} = √(${a*a} × ${b}) = ${a}√${b}⟧`,`⟦√${n} = √(${a*a} × ${b}) = ${a}√${b}⟧`)}; },
  compareVar(){ const T=[
      ['⟦س > 1⟧<br>القيمة الأولى: ⟦س^2⟧<br>القيمة الثانية: ⟦س⟧','⟦x > 1⟧<br>Quantity A: ⟦x^2⟧<br>Quantity B: ⟦x⟧',0,'أي عدد أكبر من 1 يكبر بتربيعه.','Any number above 1 grows when squared.'],
      ['⟦س < 0⟧<br>القيمة الأولى: ⟦س⟧<br>القيمة الثانية: ⟦س^2⟧','⟦x < 0⟧<br>Quantity A: ⟦x⟧<br>Quantity B: ⟦x^2⟧',1,'المربع موجب دائمًا والعدد سالب.','A square is positive; x is negative.'],
      ['⟦0 < س < 1⟧<br>القيمة الأولى: ⟦س^2⟧<br>القيمة الثانية: ⟦س⟧','⟦0 < x < 1⟧<br>Quantity A: ⟦x^2⟧<br>Quantity B: ⟦x⟧',1,'الكسر يصغر بتربيعه.','A fraction shrinks when squared.'],
      ['س عدد صحيح<br>القيمة الأولى: ⟦س^2⟧<br>القيمة الثانية: ⟦س⟧','x is an integer<br>Quantity A: ⟦x^2⟧<br>Quantity B: ⟦x⟧',3,'عند ⟦س = 0⟧ أو ⟦1⟧ متساويتان، وعند ⟦س = 2⟧ الأولى أكبر.','At ⟦x = 0⟧ or ⟦1⟧ equal; at ⟦x = 2⟧ A is greater.'],
      ['⟦س > 0⟧<br>القيمة الأولى: ⟦س/2⟧<br>القيمة الثانية: ⟦س/3⟧','⟦x > 0⟧<br>Quantity A: ⟦x/2⟧<br>Quantity B: ⟦x/3⟧',0,'النصف أكبر من الثلث لأي عدد موجب.','Half beats a third for any positive number.'],
      ['⟦س ≠ 0⟧<br>القيمة الأولى: ⟦س^2⟧<br>القيمة الثانية: ⟦−س^2⟧','⟦x ≠ 0⟧<br>Quantity A: ⟦x^2⟧<br>Quantity B: ⟦−x^2⟧',0,'الأولى موجبة والثانية سالبة.','A is positive, B is negative.'],
      ['القيمة الأولى: ⟦س + 3⟧<br>القيمة الثانية: ⟦س + 5⟧','Quantity A: ⟦x + 3⟧<br>Quantity B: ⟦x + 5⟧',1,'مهما كانت س، الثانية أكبر بـ 2.','Whatever x is, B is 2 more.'],
      ['القيمة الأولى: ⟦2س⟧<br>القيمة الثانية: ⟦س⟧','Quantity A: ⟦2x⟧<br>Quantity B: ⟦x⟧',3,'موجب: الأولى أكبر. سالب: الثانية أكبر. صفر: متساويتان.','Positive: A. Negative: B. Zero: equal.'],
      ['⟦س > 0⟧ ، ⟦ص > 0⟧ ، ⟦س + ص = 10⟧<br>القيمة الأولى: ⟦س⟧<br>القيمة الثانية: ⟦ص⟧','⟦x > 0⟧, ⟦y > 0⟧, ⟦x + y = 10⟧<br>Quantity A: ⟦x⟧<br>Quantity B: ⟦y⟧',3,'قد تكون ⟦س = 7 ، ص = 3⟧ أو العكس.','It could be ⟦x = 7, y = 3⟧ or the reverse.'],
      ['القيمة الأولى: ⟦(س + 1)^2⟧<br>القيمة الثانية: ⟦س^2 + 2س + 1⟧','Quantity A: ⟦(x + 1)^2⟧<br>Quantity B: ⟦x^2 + 2x + 1⟧',2,'مفكوك مربع مجموع.','The expansion of a squared sum.'],
      ['⟦س > ص > 0⟧<br>القيمة الأولى: ⟦1/س⟧<br>القيمة الثانية: ⟦1/ص⟧','⟦x > y > 0⟧<br>Quantity A: ⟦1/x⟧<br>Quantity B: ⟦1/y⟧',1,'كلما كبر المقام صغر الكسر.','The larger the denominator, the smaller the fraction.'],
      ['س عدد فردي<br>القيمة الأولى: باقي قسمة ⟦س⟧ على 2<br>القيمة الثانية: ⟦1⟧','x is odd<br>Quantity A: the remainder of ⟦x ÷ 2⟧<br>Quantity B: ⟦1⟧',2,'باقي قسمة أي عدد فردي على 2 يساوي 1.','Any odd number leaves remainder 1 when divided by 2.'],
      ['القيمة الأولى: ⟦س^2⟧<br>القيمة الثانية: ⟦س^3⟧','Quantity A: ⟦x^2⟧<br>Quantity B: ⟦x^3⟧',3,'عند ⟦س = 2⟧ الثانية أكبر، وعند ⟦س = −1⟧ الأولى أكبر، وعند ⟦س = 1⟧ متساويتان.','At ⟦x = 2⟧ B is larger, at ⟦x = −1⟧ A is larger, at ⟦x = 1⟧ they are equal.'],
      ['⟦س < 0⟧<br>القيمة الأولى: ⟦س^3⟧<br>القيمة الثانية: ⟦0⟧','⟦x < 0⟧<br>Quantity A: ⟦x^3⟧<br>Quantity B: ⟦0⟧',1,'مكعب العدد السالب سالب.','The cube of a negative number is negative.'],
      ['مستطيل محيطه ⟦20⟧<br>القيمة الأولى: طوله<br>القيمة الثانية: عرضه','A rectangle has perimeter ⟦20⟧<br>Quantity A: its length<br>Quantity B: its width',3,'المحيط يحدد مجموع الطول والعرض (10) لا قيمتيهما.','The perimeter fixes length + width (10), not each one.'],
      ['مربع محيطه ⟦20⟧<br>القيمة الأولى: طول ضلعه<br>القيمة الثانية: ⟦5⟧','A square has perimeter ⟦20⟧<br>Quantity A: its side<br>Quantity B: ⟦5⟧',2,'ضلع المربع = المحيط ÷ 4 = 5.','Side = perimeter ÷ 4 = 5.'],
      ['متوسط ثلاثة أعداد ⟦10⟧<br>القيمة الأولى: أكبرها<br>القيمة الثانية: ⟦10⟧','Three numbers average ⟦10⟧<br>Quantity A: the largest<br>Quantity B: ⟦10⟧',3,'قد تكون الأعداد كلها 10 فتتساوى القيمتان، أو 5 و10 و15 فتكون الأولى أكبر.','They could all be 10 (equal) or 5, 10, 15 (A larger).'],
      ['⟦س + ص = 10⟧ ، ⟦س − ص = 2⟧<br>القيمة الأولى: ⟦س⟧<br>القيمة الثانية: ⟦ص⟧','⟦x + y = 10⟧, ⟦x − y = 2⟧<br>Quantity A: ⟦x⟧<br>Quantity B: ⟦y⟧',0,'بالجمع: ⟦2س = 12⟧ إذن ⟦س = 6⟧ و⟦ص = 4⟧.','Adding: ⟦2x = 12⟧, so ⟦x = 6⟧ and ⟦y = 4⟧.'],
      ['زاويتان متكاملتان<br>القيمة الأولى: الأولى منهما<br>القيمة الثانية: ⟦90°⟧','Two angles are supplementary<br>Quantity A: the first angle<br>Quantity B: ⟦90°⟧',3,'مجموعهما 180°، وقد تكون الأولى أقل من 90° أو أكبر أو تساويها.','They sum to 180°; the first may be below, above or equal to 90°.'],
      ['القيمة الأولى: ⟦√(16 + 9)⟧<br>القيمة الثانية: ⟦√16 + √9⟧','Quantity A: ⟦√(16 + 9)⟧<br>Quantity B: ⟦√16 + √9⟧',1,'⟦√25 = 5⟧ بينما ⟦4 + 3 = 7⟧.','⟦√25 = 5⟧ while ⟦4 + 3 = 7⟧.']];
    const t=pick(T); return {s:'comparison',cmp:1,q:bi(t[0],t[1]),a:t[2],e:bi(t[3],t[4])}; }
});
GEN_BY_SKILL.arith.push('percentOf','workers','lcm');
GEN_BY_SKILL.algebra.push('system','consecutive','powerEq','slope','sqrtSimp');
GEN_BY_SKILL.geometry.push('polygon','cube','clock');
GEN_BY_SKILL.stats.push('prob','weightedAvg');
GEN_BY_SKILL.comparison.push('compareVar','compare');
/* wrap every quant generator with the de-duplicating retry and sibling rotation (see genUnique in gen.js) */
const RAWGENS={}; Object.keys(GENS).forEach(k=>{ RAWGENS[k]=GENS[k]; GENS[k]=()=>genFork(RAWGENS[k],k,RAWGENS); });
/* ============ Lessons (expanded) ============ */
const TARGET_T = {analogy:40,completion:45,context:45,odd:35,reading:80,arith:60,algebra:65,geometry:70,stats:60,comparison:50};
const KA = {arith:'https://www.khanacademy.org/math/arithmetic',algebra:'https://www.khanacademy.org/math/algebra',geometry:'https://www.khanacademy.org/math/geometry',stats:'https://www.khanacademy.org/math/statistics-probability',pre:'https://www.khanacademy.org/math/pre-algebra'};
const LESSONS = {
 analogy:{
  ar:{concept:['التناظر اللفظي يقيس قدرتك على إدراك العلاقة المنطقية بين كلمتين ثم العثور على زوج آخر تحكمه العلاقة ذاتها. السؤال لا يختبر معنى الكلمات بقدر ما يختبر دقة صياغتك للعلاقة.','القاعدة الذهبية: العلاقة تُصاغ في جملة، والجملة تُطبَّق على الخيارات، والخيار الذي يمر من الجملة بالترتيب نفسه هو الصحيح.'],
   mind:'واضع السؤال يضع خيارًا من الموضوع نفسه (للتشتيت)، وخيارًا بالعلاقة نفسها لكن بترتيب معكوس، وخيارًا بعلاقة قريبة. الصحيح هو الوحيد الذي يطابق النوع والاتجاه معًا.',
   steps:['اقرأ الزوج الأصلي وصُغ علاقته في جملة قصيرة تبدأ بالكلمة الأولى: «القلم أداة للكتابة».','طبّق الجملة حرفيًا على كل خيار واستبعد ما لا يمر.','إذا مرّ خياران، اجعل الجملة أدق: «أداة يدوية للكتابة على الورق».','تحقق من الاتجاه: هل الكلمة الأولى في الخيار تقوم بدور الكلمة الأولى في الأصل؟','لا تختر لأن الكلمات من الموضوع نفسه؛ اختر لأن العلاقة واحدة.'],
   types:[['أداة ووظيفة','مقص : قص'],['جزء من كل','صفحة : كتاب'],['تضاد','كريم : بخيل'],['ترادف','جسور : شجاع'],['سبب ونتيجة','إهمال : فشل'],['مهنة ومكان','قاضٍ : محكمة'],['كائن ومسكن','نحلة : خلية'],['صغير وكبير','شبل : أسد'],['صانع ومادة','خزاف : طين'],['مادة ومنتج','قطن : قماش'],['وحدة وكمية','متر : طول'],['تدرج','دافئ : حار']],
   traps:['الخيار المعكوس: «نجاح : اجتهاد» يبدو صحيحًا لسؤال «مطر : سيول» لكنه نتيجة : سبب.','تشابه الموضوع: سؤال عن الطبيب لا يعني أن الجواب فيه «مريض».','الخلط بين الترادف والتدرج: «دافئ : حار» ليس ترادفًا.'],
   examples:[{q:'مطر : سيول',a:'إهمال : فشل',why:'سبب ونتيجة. «نجاح : اجتهاد» فخ الترتيب المعكوس.'},{q:'شبل : أسد',a:'مهر : حصان',why:'صغير الحيوان وكبيره من النوع نفسه.'},{q:'خزاف : طين',a:'حداد : حديد',why:'الصانع والمادة التي يشكّلها.'}],
   speed:['احفظ أنماط العلاقات الاثني عشر حتى تتعرف عليها في ثانيتين.','هدفك ٤٠ ثانية أو أقل لكل سؤال.','كل خطأ في هذا القسم سجّل نوع العلاقة التي أخطأت فيها؛ الأخطاء تتكرر في نمطين أو ثلاثة فقط.'],
   res:[['yt','شرح التناظر اللفظي قدرات'],['yt','أنواع العلاقات في التناظر اللفظي'],['url','معجم المعاني: لتحديد معنى أي كلمة غامضة','https://www.almaany.com']]},
  en:{concept:['Analogies test whether you can see the logical relationship between two words, then find another pair governed by the same relationship. They test precision in stating the relationship more than vocabulary.','Golden rule: state the relationship as a sentence, apply the sentence to each choice, and the one that passes in the same order is correct.'],
   mind:'Test writers include a same-topic distractor, the same relationship in reverse order, and a near-miss relationship. Only the answer matches both type and direction.',
   steps:['Put the original pair\'s relationship into a short sentence starting with the first word: "A pen is a tool for writing."','Apply the sentence word for word to each choice.','If two pass, make the sentence more precise.','Check direction: does the first word in the choice play the role of the first word in the stem?','Never choose because words share a topic; choose because the relationship is identical.'],
   types:[['Tool and function','scissors : cut'],['Part and whole','page : book'],['Opposites','generous : stingy'],['Synonyms','bold : brave'],['Cause and effect','negligence : failure'],['Worker and place','judge : court'],['Animal and home','bee : hive'],['Young and adult','cub : lion'],['Maker and material','potter : clay'],['Material and product','cotton : cloth'],['Unit and quantity','meter : length'],['Degree','warm : hot']],
   traps:['Reversed order: "success : effort" looks right for "rain : flood" but it is effect : cause.','Same topic: a doctor question does not mean the answer contains "patient".','Synonym vs degree: "warm : hot" is not a synonym pair.'],
   examples:[{q:'RAIN : FLOOD',a:'negligence : failure',why:'Cause and effect. "success : effort" is the reversed-order trap.'},{q:'CUB : LION',a:'foal : horse',why:'Young and adult of the same animal.'},{q:'POTTER : CLAY',a:'blacksmith : iron',why:'A maker and the material they shape.'}],
   speed:['Learn the twelve relationship types until you recognize them in two seconds.','Aim for 40 seconds or less per question.','Log the relationship type of each mistake; errors cluster in two or three types.'],
   res:[['yt','GAT verbal analogies strategy'],['yt','word analogies relationships practice'],['url','Vocabulary.com: build word knowledge','https://www.vocabulary.com']]}
 },
 completion:{
  ar:{concept:['إكمال الجمل يقيس فهمك لمنطق الجملة، لا حفظك للمفردات فقط. الجملة تحمل دائمًا «مفتاحًا» يحدد اتجاه الكلمة المفقودة: أداة ربط، أو صفة، أو نتيجة.','إذا عرفت اتجاه المعنى (موافقة أم تضاد) تستبعد نصف الخيارات قبل أن تقرأها.'],
   mind:'الخيارات الخاطئة غالبًا صحيحة لغويًا لكنها تكسر المنطق، أو توافق أحد الفراغين دون الآخر.',
   steps:['اقرأ الجملة كاملة وحدد مفتاحها.','أدوات التضاد: رغم، لكن، بينما، غير أن، بل. أدوات السبب والنتيجة: لأن، لذا، فـ، إذ، مما.','توقّع كلمتك الخاصة قبل النظر في الخيارات.','في الفراغين: ابدأ بالأسهل واستبعد.','أعد قراءة الجملة بالخيار المختار كاملة.'],
   types:[['تضاد','رغم صعوبة الطريق فإن العداء ... السباق'],['سبب ونتيجة','أدى شحّ الأمطار إلى ...'],['أمثال وتعابير','القناعة كنز لا ...'],['مصطلحات','البناء ...'],['فراغان','... / إذ']],
   traps:['الكلمة الأقوى معنى ليست بالضرورة الأنسب.','الأمثال لها صيغة ثابتة، لا تقبل المرادف.','في الفراغين خيار يصلح للأول فقط.'],
   examples:[{q:'على الرغم من ...... الإمكانات، حقق الفريق نتائج مبهرة.',a:'محدودية',why:'«على الرغم» تطلب نقيض النتيجة.'},{q:'النوم الكافي ...... الذاكرة، ...... السهر يضعفها.',a:'يقوّي / بينما',why:'مقابلة بين أثرين.'},{q:'خير الكلام ما قلّ و......',a:'دلّ',why:'صيغة ثابتة.'}],
   speed:['اقرأ يوميًا نصًا فصيحًا قصيرًا؛ الحس اللغوي يسرّع هذا القسم أكثر من أي حيلة.','اجمع الأمثال والتعابير المتكررة في بطاقة واحدة.','هدفك ٤٥ ثانية.'],
   res:[['yt','شرح إكمال الجمل قدرات'],['yt','أدوات الربط في إكمال الجمل قدرات'],['url','معجم المعاني','https://www.almaany.com']]},
  en:{concept:['Sentence completion tests whether you follow the logic of a sentence. Every sentence has a key: a linking word, a description, or a result that sets the direction of the missing word.','Once you know the direction (agreement or contrast) you can drop half the choices before reading them.'],
   mind:'Wrong choices are usually grammatical but break the logic, or fit one blank and not the other.',
   steps:['Read the whole sentence and find its key.','Contrast signals: although, but, despite, whereas, however. Cause and result: because, so, therefore, since.','Predict your own word first.','With two blanks, start with the easier one.','Reread the full sentence with your choice.'],
   types:[['Contrast','Despite its ___ resources...'],['Cause and effect','The ___ of rain caused...'],['Idioms','Practice makes ___'],['Terms','Plants rely on ___'],['Two blanks','___ / whereas']],
   traps:['The strongest word is not always the best fit.','Idioms have a fixed form.','With two blanks, one choice often fits only the first.'],
   examples:[{q:'Despite its ______ resources, the team achieved impressive results.',a:'limited',why:'"Despite" needs the opposite of the result.'},{q:'Sleep strengthens memory, ______ staying up late weakens it.',a:'whereas',why:'Two opposite effects.'},{q:'A friend in need is a friend ______.',a:'indeed',why:'Fixed idiom.'}],
   speed:['Read a short quality article daily; language sense speeds this section more than any trick.','Keep one card of repeated idioms.','Aim for 45 seconds.'],
   res:[['yt','GAT sentence completion strategy'],['yt','sentence completion transition words practice'],['url','Vocabulary.com','https://www.vocabulary.com']]}
 },
 context:{
  ar:{concept:['الخطأ السياقي جملة سليمة لغويًا فيها كلمة واحدة تناقض المعنى العام. المطلوب تلك الكلمة.','كل جملة فيها «مرتكزان» يثبتان المعنى، والكلمة الخاطئة تصطدم بهما. ابحث عن المرتكزين أولًا.'],
   mind:'يضع الواضع أحيانًا الخطأ في أداة ربط (لكن بدل فـ)، أو في كلمة زمن أو سرعة أو درجة.',
   steps:['اقرأ الجملة وحدد فكرتها.','حدد الكلمتين اللتين تبنيان المعنى (المرتكزين).','ابحث عن الكلمة التي تناقضهما.','اختبار الاستبدال: ضع عكس الكلمة؛ إذا استقام المعنى فهي الخطأ.','تأكد أن تغيير أي خيار آخر لا يصلح الجملة.'],
   types:[['تناقض في الصفة','القائد الحكيم يقرر بتهوّر'],['تناقض في النتيجة','بذل جهدًا فتراجع مستواه'],['تناقض علمي','يذوب الثلج عند انخفاض الحرارة'],['أداة ربط خاطئة','أدرك الحافلة لكنه وصل قبل الجميع']],
   traps:['الكلمة الغريبة أو النادرة ليست بالضرورة الخطأ.','لا تكتفِ بالإحساس؛ طبّق اختبار الاستبدال دائمًا.'],
   examples:[{q:'بذل اللاعب جهدًا كبيرًا في التدريب، فتراجع مستواه وتألق في المباراة.',a:'تراجع',why:'المرتكزان: «جهدًا» و«تألق».'},{q:'استيقظ مبكرًا فأدرك الحافلة، لكنه وصل إلى المدرسة قبل الجميع.',a:'لكنه',why:'نتيجة لا استدراك.'},{q:'يذوب الثلج عند انخفاض درجة الحرارة فيتحول إلى ماء.',a:'انخفاض',why:'حقيقة علمية.'}],
   speed:['اقرأ الجملة مرة واحدة كاملة ثم اصطد المرتكزين.','هدفك ٤٥ ثانية.'],
   res:[['yt','شرح الخطأ السياقي قدرات'],['yt','استراتيجية الخطأ السياقي']]},
  en:{concept:['A contextual-error sentence is grammatical but contains one word that contradicts the overall meaning. Find that word.','Every sentence has two anchors that fix its meaning; the wrong word collides with them. Find the anchors first.'],
   mind:'The error is sometimes a linking word (but instead of and), or a word of time, speed or degree.',
   steps:['Read the sentence and get its idea.','Identify the two words that build the meaning (the anchors).','Find the word that contradicts them.','Replacement test: put in the opposite; if the sentence now works, that is the error.','Make sure changing any other choice would not fix it.'],
   types:[['Contradicting description','the wise leader decides recklessly'],['Contradicting result','trained hard, so performance declined'],['Scientific contradiction','ice melts when temperature drops'],['Wrong linking word','caught the bus, but arrived first']],
   traps:['A rare word is not necessarily the error.','Always run the replacement test.'],
   examples:[{q:'The player trained hard, so his performance declined and he shone in the match.',a:'declined',why:'Anchors: "trained hard" and "shone".'},{q:'He woke up early and caught the bus, but he arrived at school before everyone.',a:'but',why:'A result, not a contrast.'},{q:'Ice melts when the temperature drops, turning into water.',a:'drops',why:'Scientific fact.'}],
   speed:['Read once fully, then hunt for the anchors.','Aim for 45 seconds.'],
   res:[['yt','GAT contextual error questions'],['yt','GAT verbal contextual error practice']]}
 },
 odd:{
  ar:{concept:['المفردة الشاذة: أربع كلمات تجمع ثلاثًا منها رابطة واحدة. المطلوب الرابعة.','الرابطة قد تكون: التصنيف، أو المعنى (ترادف مقابل ضد)، أو النوع النحوي (اسم مقابل فعل)، أو المكان.'],
   mind:'يضع الواضع كلمة شاذة من صنف قريب جدًا (فواكه مقابل خضار) ليختبر دقة التصنيف.',
   steps:['ابحث عن الرابطة الأوضح بين ثلاث كلمات.','إن لم تتضح، جرّب الروابط بالترتيب: التصنيف، المعنى، القسم النحوي، الوظيفة.','اختر الكلمة الخارجة عن أقوى رابطة وأشملها.'],
   types:[['تصنيف','تفاح، موز، عنب، جزر'],['معنى','فرح، سرور، بهجة، حزن'],['نحو','قرأ، كتب، رسم، قلم'],['مكان','مكة، جدة، أبها، القاهرة'],['زمن','محرم، رجب، شعبان، مارس']],
   traps:['قد ترى رابطتين؛ اختر الأوضح والأشمل.','لا تعتمد على الشكل أو عدد الحروف.'],
   examples:[{q:'صقر، حمامة، نسر، ذئب',a:'ذئب',why:'البقية طيور.'},{q:'قال، همس، صرخ، قفز',a:'قفز',why:'البقية أفعال كلام.'},{q:'ياقوت، زمرد، ماس، نحاس',a:'نحاس',why:'البقية أحجار كريمة.'}],
   speed:['هذا أسرع أقسام اللفظي؛ هدفك ٣٥ ثانية.'],
   res:[['yt','شرح المفردة الشاذة قدرات']]},
  en:{concept:['Odd word out: four words, three share one link. Find the fourth.','The link can be category, meaning (synonym vs antonym), part of speech (noun vs verb), or place.'],
   mind:'Test writers pick the odd word from a very close category (fruit vs vegetable) to test precise classification.',
   steps:['Find the clearest link among three words.','If unclear, test links in order: category, meaning, part of speech, function.','Pick the word outside the strongest, broadest link.'],
   types:[['Category','apple, banana, grape, carrot'],['Meaning','joy, delight, cheer, sorrow'],['Part of speech','read, write, draw, pencil'],['Place','Makkah, Jeddah, Abha, Cairo'],['Time','Muharram, Rajab, Shaban, March']],
   traps:['You may see two links; choose the clearest and broadest.','Ignore spelling or length.'],
   examples:[{q:'falcon, pigeon, eagle, wolf',a:'wolf',why:'The rest are birds.'},{q:'say, whisper, shout, jump',a:'jump',why:'The rest are speech verbs.'},{q:'ruby, emerald, diamond, copper',a:'copper',why:'The rest are gemstones.'}],
   speed:['The fastest verbal type; aim for 35 seconds.'],
   res:[['yt','odd one out word questions practice']]}
 },
 reading:{
  ar:{concept:['استيعاب المقروء أكبر أقسام اللفظي وزنًا. نص قصير أو متوسط تتبعه أسئلة عن: الفكرة الرئيسة، والتفاصيل الصريحة، والاستنتاج، ومعنى الكلمة في سياقها، ومرجع الضمير، ودلالة أدوات الربط، وموقف الكاتب.','كل إجابة صحيحة لها «دليل» في النص. إذا لم تستطع وضع إصبعك على الدليل فلا تختر.'],
   mind:'الخيارات الخاطئة: صحيحة علميًا لكنها غير مذكورة، أو مذكورة لكنها تفصيل لا فكرة رئيسة، أو مبالغة («دائمًا»، «تمامًا») لا يقولها النص.',
   steps:['اقرأ السؤال أولًا وحدد نوعه.','اقرأ النص قراءة سريعة: الجملة الأولى والأخيرة تحملان الفكرة غالبًا.','ارجع إلى الجزء المرتبط بالسؤال وحدد الدليل.','استبعد: غير المذكور، والمبالغ فيه، والجزئي.','معنى الكلمة: ضع الخيار مكانها في الجملة واقرأ.'],
   types:[['فكرة رئيسة / عنوان','عنوان يجمع أول النص وآخره'],['تفصيل صريح','«حسب النص...»'],['استنتاج','«يُفهم من النص...»'],['معنى كلمة','«يعزو» = ينسب'],['مرجع ضمير','«فهي» تعود على النحلة'],['أداة ربط','«غير أن» للاستدراك'],['موقف الكاتب','معتدل، مؤيد، رافض']],
   traps:['المعلومة الصحيحة خارج النص خطأ.','الكلمات المطلقة (دائمًا، أبدًا، تمامًا) علامة خطر.','العنوان الضيق يغطي فقرة واحدة فقط.'],
   examples:[{q:'موقف الكاتب من الهاتف (نص التركيز):',a:'معتدل يدعو إلى التنظيم',why:'يرفض المنع التام ويقترح التنظيم.'},{q:'«غير أن» في نص الطاقة الشمسية تفيد:',a:'الاستدراك',why:'تنتقل من الميزة إلى التحدي.'},{q:'الأصل الموقوف:',a:'لا يُباع ولا يُورث',why:'الذي يُصرف هو الغلّة لا الأصل.'}],
   speed:['لا تُعِد قراءة النص كاملًا لكل سؤال؛ ارجع مباشرة إلى الجزء المرتبط بالسؤال.','هدفك ٨٠ ثانية للسؤال شاملة القراءة.','القراءة اليومية لمقال مع تلخيص فكرته في سطر هي أقوى تمرين لهذا القسم.'],
   res:[['yt','شرح استيعاب المقروء قدرات'],['yt','استراتيجية استيعاب المقروء المحوسب'],['url','مكتبة: قراءة مقالات عربية يومية (ويكيبيديا العربية)','https://ar.wikipedia.org']]},
  en:{concept:['Reading comprehension carries the most weight in verbal. A short or medium passage is followed by questions on the main idea, stated details, inference, word meaning in context, pronoun reference, linking words and the writer\'s attitude.','Every correct answer has evidence in the passage. If you cannot point to the evidence, do not choose it.'],
   mind:'Wrong choices are true but not stated, stated but only a detail, or exaggerated ("always", "completely") beyond what the passage says.',
   steps:['Read the question first and identify its type.','Skim the passage: the first and last sentences usually carry the idea.','Go back to the relevant part and find the evidence.','Eliminate: not stated, exaggerated, partial.','Word meaning: put the choice in the sentence and reread.'],
   types:[['Main idea / title','covers beginning and end'],['Stated detail','"According to the passage..."'],['Inference','"It can be inferred..."'],['Word in context','"attribute" = link as a cause'],['Pronoun reference','"it" refers to the bee'],['Linking word','"However" signals contrast'],['Attitude','balanced, supportive, opposed']],
   traps:['A true fact not in the passage is wrong.','Absolute words (always, never, completely) are red flags.','A narrow title covers only one part.'],
   examples:[{q:'The writer\'s attitude toward phones (focus passage):',a:'balanced, calling for organization',why:'Rejects a ban, proposes organization.'},{q:'"However" in the solar passage introduces:',a:'a contrast',why:'Moves from advantage to challenge.'},{q:'The endowed asset:',a:'cannot be sold or inherited',why:'The revenue is spent, not the asset.'}],
   speed:['Do not reread the whole passage for every question; go straight back to the part the question is about.','Aim for 80 seconds per question including reading.','Reading one article a day and summarizing it in a line is the strongest drill.'],
   res:[['yt','GAT reading comprehension strategy'],['yt','reading comprehension main idea inference practice'],['url','Khan Academy: reading and vocabulary','https://www.khanacademy.org/ela']]}
 },
 arith:{
  ar:{concept:['الحساب أكبر أجزاء الكمي وزنًا (نحو نصف الكمي حسب الدليل الرسمي). يشمل: العمليات، الكسور والأعداد العشرية، النسب المئوية، النسبة والتناسب، السرعة والزمن، العمل المشترك، الأعداد الأولية والقواسم والمضاعفات.','لا آلة حاسبة؛ لذلك السرعة الذهنية وحفظ المكافئات الشائعة يحسمان الوقت.'],
   mind:'المشتتات تُبنى من أخطاء متوقعة: القسمة على القيمة الجديدة بدل القديمة، جمع نسبتين متتاليتين، نسيان أن المطلوب «المتبقي» لا «المقروء».',
   steps:['حدد المطلوب بالضبط وضع تحته خطًا ذهنيًا.','حوّل النسب إلى كسور بسيطة: ٢٥٪ = ¼ ، ٢٠٪ = ⅕.','في التناسب الطردي اضرب تبادليًا، وفي العكسي حاصل الضرب ثابت.','قرّب الأرقام لتستبعد الخيارات البعيدة قبل الحساب الدقيق.','جرّب الخيارات في المعادلة إن كانت أسرع.'],
   types:[['نسب مئوية','٤٠٪ من عدد = ٢٤'],['خصم وزيادة','زيادة ١٠٪ ثم نقص ١٠٪'],['تناسب طردي','٣ أقلام بـ ١٢، فكم ٧؟'],['تناسب عكسي','١٥ عاملًا في ٨ أيام'],['سرعة ومسافة','٢٤٠ كم في ٣ ساعات'],['مضاعف مشترك','إشارتان تضيئان معًا'],['كسور','¼ + ⅔']],
   rules:['⟦½ = 0.5 ، ¼ = 0.25 ، ⅕ = 0.2 ، ⅛ = 0.125 ، ⅓ ≈ 0.333⟧','⟦الجزء = النسبة × الكل ÷ 100⟧','⟦الكل = الجزء ÷ النسبة⟧','⟦نسبة التغير = الفرق ÷ القديم × 100⟧','⟦السعر بعد خصم د% = السعر × (1 − د/100)⟧','⟦المسافة = السرعة × الزمن⟧','⟦1/ن = 1/ن₁ + 1/ن₂⟧ (العمل المشترك)','⟦أ% من ب = ب% من أ⟧'],
   traps:['نسبة التغير من القيمة القديمة.','خصمان متتاليان لا يُجمعان: ٢٠٪ ثم ٢٠٪ = ٣٦٪.','انتبه للوحدات: دقائق وساعات.'],
   examples:[{q:'ارتفع سعر ١٠٪ ثم انخفض ١٠٪. ما التغير الكلي؟',a:'نقص ١٪',why:'⟦1.1 × 0.9 = 0.99⟧'},{q:'٤٠٪ من عدد يساوي ٢٤. ما العدد؟',a:'٦٠',why:'⟦24 ÷ 0.4 = 60⟧'},{q:'١٥ عاملًا في ٨ أيام، فكم يومًا لـ ١٠ عمال؟',a:'١٢',why:'⟦15 × 8 ÷ 10 = 12⟧'}],
   speed:['تمرين يومي ١٠ دقائق: جداول الضرب حتى ١٥، والمربعات حتى ٢٠، والمكعبات حتى ١٠.','حفظ مكافئات الكسور يوفر ١٥ ثانية في كل سؤال نسب.','هدفك ٦٠ ثانية.'],
   res:[['yt','شرح الحساب قدرات كمي تأسيس'],['yt','النسب المئوية قدرات كمي'],['yt','التناسب الطردي والعكسي قدرات'],['url','Khan Academy: Arithmetic',KA.arith],['url','Khan Academy: Pre-algebra',KA.pre]]},
  en:{concept:['Arithmetic is the largest share of quant (about half of it, per the official guide): operations, fractions and decimals, percentages, ratio and proportion, speed and time, combined work, primes, factors and multiples.','No calculator is allowed, so mental speed and memorized equivalents decide your time.'],
   mind:'Distractors come from predictable mistakes: dividing by the new value instead of the old, adding two successive percentages, forgetting the question asks for what is left.',
   steps:['Identify exactly what is asked.','Turn percentages into simple fractions: 25% = ¼, 20% = ⅕.','Direct proportion: cross-multiply. Inverse: the product stays constant.','Round to eliminate far-off choices before exact work.','Plug in the choices when that is faster.'],
   types:[['Percentages','40% of a number is 24'],['Discounts and increases','up 10% then down 10%'],['Direct proportion','3 pens cost 12, so 7?'],['Inverse proportion','15 workers in 8 days'],['Speed and distance','240 km in 3 hours'],['Common multiples','two lights flashing'],['Fractions','¼ + ⅔']],
   rules:['⟦½ = 0.5, ¼ = 0.25, ⅕ = 0.2, ⅛ = 0.125, ⅓ ≈ 0.333⟧','⟦part = rate × whole ÷ 100⟧','⟦whole = part ÷ rate⟧','⟦% change = difference ÷ old × 100⟧','⟦price after d% off = price × (1 − d/100)⟧','⟦distance = speed × time⟧','⟦1/t = 1/t₁ + 1/t₂⟧ (combined work)','⟦a% of b = b% of a⟧'],
   traps:['Percent change uses the old value.','Two discounts do not add: 20% then 20% = 36%.','Watch units: minutes vs hours.'],
   examples:[{q:'A price rises 10% then falls 10%. Net change?',a:'−1%',why:'⟦1.1 × 0.9 = 0.99⟧'},{q:'40% of a number is 24. The number?',a:'60',why:'⟦24 ÷ 0.4 = 60⟧'},{q:'15 workers take 8 days. 10 workers?',a:'12',why:'⟦15 × 8 ÷ 10 = 12⟧'}],
   speed:['Daily 10-minute drill: times tables to 15, squares to 20, cubes to 10.','Knowing fraction equivalents saves 15 seconds per percent question.','Aim for 60 seconds.'],
   res:[['yt','GAT quantitative arithmetic'],['yt','percentage word problems fast tricks'],['url','Khan Academy: Arithmetic',KA.arith],['url','Khan Academy: Pre-algebra',KA.pre]]}
 },
 algebra:{
  ar:{concept:['الجبر في القدرات جبر «استدلالي» لا جبر مناهج: معادلات خطية، ونظام معادلتين، وأسس وجذور، ومتتابعات، وتعويض، وتحليل بسيط.','أغلب أسئلته تُحل بطريقتين: الحل المباشر، أو تجريب الخيارات. اختر الأسرع.'],
   mind:'الفخ الأشهر: المطلوب «س + 2» أو «ص» وليس «س». والخيار المشتت هو قيمة المتغير نفسه.',
   steps:['اكتب المطلوب قبل البدء.','في نظام معادلتين: اجمع أو اطرح المعادلتين مباشرة.','الأسس: وحّد الأساس ثم قارن الأسس.','المتتابعات: فرق ثابت؟ نسبة ثابتة؟ فروق الفروق؟ مربعات؟','إذا كانت المعادلة معقدة، عوّض بالخيارات من الوسط.'],
   types:[['معادلة خطية','⟦3س − 7 = 11⟧'],['نظام معادلتين','⟦س + ص = 10 ، س − ص = 4⟧'],['أسس','⟦2^س = 32⟧'],['جذور','⟦√72 = 6√2⟧'],['متتابعات','⟦3، 5، 9، 17، ...⟧'],['تعويض','⟦أ = −2 ، أ^3 − أ⟧'],['ميل','بين نقطتين']],
   rules:['⟦أ^م × أ^ن = أ^(م+ن)⟧','⟦أ^م ÷ أ^ن = أ^(م−ن)⟧','⟦(أ^م)^ن = أ^(م×ن)⟧','⟦أ^0 = 1 ، أ^(−1) = 1/أ⟧','⟦(أ + ب)^2 = أ^2 + 2أب + ب^2⟧','⟦أ^2 − ب^2 = (أ − ب)(أ + ب)⟧','⟦الميل = (ص₂ − ص₁) ÷ (س₂ − س₁)⟧','⟦مجموع ن عددًا متتاليًا = ن × الأوسط⟧'],
   traps:['⟦(−2)^2 = 4⟧ لكن ⟦−2^2 = −4⟧.','القسمة على سالب في المتباينة تقلب الإشارة.','لا تنسَ الحل السالب في ⟦س^2 = 16⟧.'],
   examples:[{q:'⟦س + ص = 10 ، س − ص = 4⟧ ، س = ؟',a:'٧',why:'اجمع: ⟦2س = 14⟧'},{q:'⟦3، 5، 9، 17، 33، ...⟧',a:'٦٥',why:'الفروق تتضاعف.'},{q:'⟦√72⟧ في أبسط صورة',a:'⟦6√2⟧',why:'⟦√(36 × 2)⟧'}],
   speed:['احفظ قوى ٢ حتى ⟦2^10 = 1024⟧ وقوى ٣ حتى ⟦3^5 = 243⟧.','هدفك ٦٥ ثانية.'],
   res:[['yt','شرح الجبر قدرات كمي'],['yt','المتتابعات قدرات كمي'],['yt','قوانين الأسس قدرات'],['url','Khan Academy: Algebra',KA.algebra]]},
  en:{concept:['GAT algebra is reasoning algebra, not curriculum algebra: linear equations, two-equation systems, exponents and roots, sequences, substitution and simple factoring.','Most questions can be solved directly or by plugging in the choices. Pick the faster one.'],
   mind:'The classic trap: the question asks for x + 2 or y, not x, and the distractor is the value of x itself.',
   steps:['Write down what is asked before starting.','Systems: add or subtract the equations directly.','Exponents: make the bases equal, then compare exponents.','Sequences: constant difference? constant ratio? second differences? squares?','If the equation is messy, plug in choices starting from the middle.'],
   types:[['Linear equation','⟦3x − 7 = 11⟧'],['System','⟦x + y = 10, x − y = 4⟧'],['Exponents','⟦2^x = 32⟧'],['Roots','⟦√72 = 6√2⟧'],['Sequences','⟦3, 5, 9, 17, ...⟧'],['Substitution','⟦a = −2, a^3 − a⟧'],['Slope','between two points']],
   rules:['⟦a^m × a^n = a^(m+n)⟧','⟦a^m ÷ a^n = a^(m−n)⟧','⟦(a^m)^n = a^(mn)⟧','⟦a^0 = 1, a^(−1) = 1/a⟧','⟦(a + b)^2 = a^2 + 2ab + b^2⟧','⟦a^2 − b^2 = (a − b)(a + b)⟧','⟦slope = (y₂ − y₁) ÷ (x₂ − x₁)⟧','⟦sum of n consecutive numbers = n × middle⟧'],
   traps:['⟦(−2)^2 = 4⟧ but ⟦−2^2 = −4⟧.','Dividing an inequality by a negative flips it.','Remember the negative root of ⟦x^2 = 16⟧.'],
   examples:[{q:'⟦x + y = 10, x − y = 4⟧, x = ?',a:'7',why:'Add: ⟦2x = 14⟧'},{q:'⟦3, 5, 9, 17, 33, ...⟧',a:'65',why:'Differences double.'},{q:'⟦√72⟧ simplified',a:'⟦6√2⟧',why:'⟦√(36 × 2)⟧'}],
   speed:['Memorize powers of 2 to ⟦2^10 = 1024⟧ and of 3 to ⟦3^5 = 243⟧.','Aim for 65 seconds.'],
   res:[['yt','GAT algebra questions'],['yt','number sequences tricks aptitude test'],['url','Khan Academy: Algebra',KA.algebra]]}
 },
 geometry:{
  ar:{concept:['الهندسة نحو خُمس الكمي في نسخة التخصصات العلمية: الزوايا، المثلثات وفيثاغورس، المضلعات، المحيطات والمساحات، الدائرة، المجسمات البسيطة، وزاوية الساعة.','معظم أسئلتها تعتمد على عشرة قوانين فقط. من يحفظها ويطبقها بسرعة يحسم القسم.'],
   mind:'المشتت الأشهر: إعطاء المساحة بدل المحيط، أو المساحة الكلية بدل الحجم، أو استخدام القطر بدل نصف القطر.',
   steps:['ارسم الشكل ولو كان مرسومًا، وضع عليه كل المعطيات.','اكتب القانون قبل التعويض.','ابحث عن مثلث قائم مخفي؛ أكثر الأسئلة تُحل به.','تحقق من الوحدة المطلوبة (سم أم سم²).'],
   types:[['زوايا المثلث','مجموعها ١٨٠°'],['فيثاغورس','(٣، ٤، ٥)'],['مضلعات','مجموع الزوايا ⟦(ن − 2) × 180⟧'],['مساحات ومحيطات','مستطيل، مربع، مثلث'],['دائرة','⟦πنق^2⟧ و ⟦2πنق⟧'],['مجسمات','حجم المكعب ومساحته'],['الساعة','كل ساعة ٣٠°']],
   rules:['⟦مساحة المثلث = ½ × القاعدة × الارتفاع⟧','⟦الوتر^2 = أ^2 + ب^2⟧','ثلاثيات: ⟦(3،4،5) (5،12،13) (8،15،17) (7،24،25)⟧','⟦مجموع زوايا المضلع = (ن − 2) × 180⟧','⟦محيط الدائرة = 2πنق ، مساحتها = πنق^2⟧','⟦حجم المكعب = ل^3 ، مساحته الكلية = 6ل^2⟧','⟦حجم متوازي المستطيلات = ط × ع × ارتفاع⟧','المثلث ⟦30-60-90⟧: الأضلاع ⟦1 : √3 : 2⟧','المثلث ⟦45-45-90⟧: الأضلاع ⟦1 : 1 : √2⟧'],
   traps:['القطر = ٢ × نصف القطر.','الرسم ليس بمقياس دقيق؛ لا تقِس بالعين.','زاوية الساعة الصغرى لا تتجاوز ١٨٠°.'],
   examples:[{q:'مكعب حرفه ٤ سم، ما حجمه؟',a:'٦٤',why:'٩٦ هي المساحة الكلية.'},{q:'الزاوية الداخلية للسداسي المنتظم',a:'١٢٠°',why:'⟦720 ÷ 6⟧'},{q:'ضلعا قائمة ١٢ و ١٦، الوتر؟',a:'٢٠',why:'مضاعف (٣، ٤، ٥).'}],
   speed:['احفظ ثلاثيات فيثاغورس ومضاعفاتها؛ توفر الجذر كاملًا.','هدفك ٧٠ ثانية.'],
   res:[['yt','شرح الهندسة قدرات كمي'],['yt','فيثاغورس قدرات'],['yt','زوايا المضلعات قدرات'],['url','Khan Academy: Geometry',KA.geometry]]},
  en:{concept:['Geometry is about a fifth of quant in the science version: angles, triangles and Pythagoras, polygons, perimeter and area, circles, simple solids and clock angles.','Most questions rely on about ten rules. Knowing them cold settles the section.'],
   mind:'Classic distractors: area instead of perimeter, surface area instead of volume, diameter instead of radius.',
   steps:['Sketch the figure and label every given.','Write the rule before substituting.','Look for a hidden right triangle; many questions hinge on one.','Check the unit asked (cm vs cm²).'],
   types:[['Triangle angles','sum to 180°'],['Pythagoras','(3, 4, 5)'],['Polygons','sum ⟦= (n − 2) × 180⟧'],['Area and perimeter','rectangle, square, triangle'],['Circle','⟦πr^2⟧ and ⟦2πr⟧'],['Solids','cube volume and surface'],['Clock','each hour = 30°']],
   rules:['⟦triangle area = ½ × base × height⟧','⟦c^2 = a^2 + b^2⟧','Triples: ⟦(3,4,5) (5,12,13) (8,15,17) (7,24,25)⟧','⟦polygon angle sum = (n − 2) × 180⟧','⟦C = 2πr, A = πr^2⟧','⟦cube: V = s^3, SA = 6s^2⟧','⟦box volume = l × w × h⟧','⟦30-60-90⟧ sides ⟦1 : √3 : 2⟧','⟦45-45-90⟧ sides ⟦1 : 1 : √2⟧'],
   traps:['Diameter = 2 × radius.','Figures are not to scale.','The smaller clock angle is at most 180°.'],
   examples:[{q:'Cube with edge 4 cm: volume?',a:'64',why:'96 is the surface area.'},{q:'Interior angle of a regular hexagon',a:'120°',why:'⟦720 ÷ 6⟧'},{q:'Legs 12 and 16: hypotenuse?',a:'20',why:'A multiple of (3, 4, 5).'}],
   speed:['Memorize Pythagorean triples and multiples; they skip the square root.','Aim for 70 seconds.'],
   res:[['yt','GAT geometry questions'],['yt','polygon angles tricks'],['url','Khan Academy: Geometry',KA.geometry]]}
 },
 stats:{
  ar:{concept:['التحليل والإحصاء: المتوسط والوسيط والمنوال، المتوسط الموزون، الاحتمالات البسيطة، وقراءة الجداول والرسوم البيانية.','السؤال هنا يكافئ من يقرأ الجدول بعناية قبل أن يحسب.'],
   mind:'المشتت الشائع: الوسيط دون ترتيب، أو متوسط المتوسطين بدل المتوسط الموزون.',
   steps:['اقرأ عنوان الجدول ووحداته أولًا.','المتوسط: المجموع ÷ العدد، ومنه المجموع = المتوسط × العدد.','الوسيط: رتّب ثم خذ الأوسط.','المتوسط الموزون: اضرب كل متوسط في عدده ثم اقسم على المجموع.','الاحتمال: الحالات المطلوبة ÷ كل الحالات.'],
   types:[['متوسط وعدد مفقود','متوسط ٤ أعداد ١٤'],['وسيط','رتّب أولًا'],['متوسط موزون','١٢ طالبًا و ٨ طلاب'],['احتمال','كرات ملونة'],['جداول','نسبة الزيادة بين يومين']],
   rules:['⟦المجموع = المتوسط × العدد⟧','⟦المتوسط الموزون = Σ(ن × م) ÷ Σن⟧','⟦الاحتمال = المطلوب ÷ الكل⟧','⟦مجموع احتمالات كل الحالات = 1⟧'],
   traps:['متوسط مجموعتين غير متساويتين ليس نصف مجموع المتوسطين.','لا تحسب الوسيط قبل الترتيب.'],
   examples:[{q:'١٢ طالبًا درجتهم ٨٠ و ٨ طلاب ٩٠',a:'٨٤',why:'متوسط موزون.'},{q:'وسيط ٣٢، ٨، ١٠، ٢٣، ٣١',a:'٢٣',why:'بعد الترتيب.'},{q:'٣ حمراء و ٥ زرقاء، احتمال الحمراء',a:'⟦3/8⟧',why:'⟦3 ÷ 8⟧'}],
   speed:['هدفك ٦٠ ثانية.'],
   res:[['yt','المتوسط والوسيط والمنوال قدرات'],['yt','الاحتمالات قدرات كمي'],['url','Khan Academy: Statistics & Probability',KA.stats]]},
  en:{concept:['Analysis and statistics: mean, median and mode, weighted averages, simple probability, and reading tables and charts.','These questions reward reading the table carefully before calculating.'],
   mind:'Common distractors: median without sorting, or the average of two averages instead of the weighted mean.',
   steps:['Read the table title and units first.','Mean = sum ÷ count, so sum = mean × count.','Median: sort, then take the middle.','Weighted mean: multiply each average by its count, divide by the total.','Probability: favorable ÷ total.'],
   types:[['Mean and missing value','mean of 4 numbers is 14'],['Median','sort first'],['Weighted mean','12 students and 8 students'],['Probability','colored balls'],['Tables','percent increase between days']],
   rules:['⟦sum = mean × count⟧','⟦weighted mean = Σ(n × m) ÷ Σn⟧','⟦P = favorable ÷ total⟧','⟦all probabilities sum to 1⟧'],
   traps:['The mean of unequal groups is not the average of their means.','Never take a median before sorting.'],
   examples:[{q:'12 students scored 80, 8 scored 90',a:'84',why:'Weighted mean.'},{q:'Median of 32, 8, 10, 23, 31',a:'23',why:'After sorting.'},{q:'3 red and 5 blue: P(red)',a:'⟦3/8⟧',why:'⟦3 ÷ 8⟧'}],
   speed:['Aim for 60 seconds.'],
   res:[['yt','mean median mode aptitude test'],['yt','basic probability questions'],['url','Khan Academy: Statistics & Probability',KA.stats]]}
 },
 comparison:{
  ar:{concept:['المقارنات الكمية: قيمتان والمطلوب العلاقة بينهما. الخيارات الأربعة ثابتة دائمًا: الأولى أكبر، الثانية أكبر، متساويتان، المعطيات غير كافية.','هذا القسم مصمم لقياس التفكير لا الحساب؛ كثير من أسئلته تُحسم دون حساب كامل.'],
   mind:'الفخ: افتراض أن المتغير عدد صحيح موجب. الواضع يترك الصفر والسالب والكسر مفتوحة عمدًا.',
   steps:['إذا لم يوجد متغير: احسب أو قدّر؛ الجواب لا يمكن أن يكون «غير كافية».','إذا وُجد متغير: جرّب ⟦0 ، 1 ، −1 ، ½ ، 2⟧ ضمن الشروط المعطاة.','إذا تغيرت العلاقة بين تجربتين فالجواب «غير كافية» فورًا.','يمكنك إضافة أو طرح الشيء نفسه من الطرفين، أو الضرب في موجب، دون تغيير العلاقة.'],
   types:[['أعداد صريحة','⟦2^10⟧ و ⟦1000⟧'],['كسور','⟦3/7⟧ و ⟦4/9⟧'],['متغير بشرط','⟦0 < س < 1⟧'],['متغير بلا شرط','⟦2س⟧ و ⟦س⟧'],['هندسة','محيط ومساحة دائرة']],
   rules:['للكسور: الضرب التبادلي.','⟦0 < س < 1 → س^2 < س < √س⟧','⟦س > 1 → س^2 > س⟧','أ% من ب = ب% من أ'],
   traps:['⟦س^2 = 16⟧ تعني ⟦س = ±4⟧.','الصفر يجعل كثيرًا من العلاقات متساوية.','لا تختر «متساويتان» لأن التجربة الأولى أعطت تساويًا فقط.'],
   examples:[{q:'⟦0 < س < 1⟧: ⟦س⟧ و ⟦√س⟧',a:'الثانية أكبر',why:'⟦س = 0.25 ، √س = 0.5⟧'},{q:'⟦2س⟧ و ⟦س⟧',a:'غير كافية',why:'موجب، سالب، صفر.'},{q:'٢٥٪ من ٨٠ و ٨٠٪ من ٢٥',a:'متساويتان',why:'قاعدة التبديل.'}],
   speed:['هذا أسرع أقسام الكمي لمن يتقن التجريب؛ هدفك ٥٠ ثانية.'],
   res:[['yt','شرح المقارنات قدرات كمي'],['yt','المقارنة الكمية المعطيات غير كافية']]},
  en:{concept:['Quantitative comparison: two quantities; find the relationship. The four choices never change: A is greater, B is greater, equal, cannot be determined.','This type measures reasoning, not calculation; many questions are settled without full computation.'],
   mind:'The trap: assuming a variable is a positive integer. Test writers leave zero, negatives and fractions open on purpose.',
   steps:['No variable: calculate or estimate; the answer cannot be "cannot be determined".','With a variable: test ⟦0, 1, −1, ½, 2⟧ within the given conditions.','If the relationship changes between two tests, answer "cannot be determined" immediately.','You may add or subtract the same thing from both sides, or multiply by a positive, without changing the relationship.'],
   types:[['Plain numbers','⟦2^10⟧ vs ⟦1000⟧'],['Fractions','⟦3/7⟧ vs ⟦4/9⟧'],['Variable with condition','⟦0 < x < 1⟧'],['Variable without condition','⟦2x⟧ vs ⟦x⟧'],['Geometry','circumference vs area']],
   rules:['Fractions: cross-multiply.','⟦0 < x < 1 → x^2 < x < √x⟧','⟦x > 1 → x^2 > x⟧','a% of b = b% of a'],
   traps:['⟦x^2 = 16⟧ means ⟦x = ±4⟧.','Zero makes many relationships equal.','Do not choose "equal" because your first test gave equal.'],
   examples:[{q:'⟦0 < x < 1⟧: ⟦x⟧ vs ⟦√x⟧',a:'B is greater',why:'⟦x = 0.25, √x = 0.5⟧'},{q:'⟦2x⟧ vs ⟦x⟧',a:'Cannot be determined',why:'Positive, negative, zero.'},{q:'25% of 80 vs 80% of 25',a:'Equal',why:'Swap rule.'}],
   speed:['The fastest quant type once you master testing values; aim for 50 seconds.'],
   res:[['yt','GAT quantitative comparison strategy'],['yt','quantitative comparison cannot be determined tricks']]}
 }
};

/* ---------- Vocabulary deck ---------- */
const VOCAB = {
 ar:[['الأنَفة','العزّة وإباء الضيم'],['الأُفول','الغياب والاختفاء'],['البَهاء','الحُسن والجمال'],['الجَسور','الشجاع المقدام'],['الحَصيف','جيّد الرأي محكم العقل'],['الدَّؤوب','المواظب على العمل بلا انقطاع'],['الرَّصين','المتين الثابت'],['السَّأم','الملل'],['الشُّحّ','البخل الشديد، والقلة'],['العَوَز','الفقر والحاجة'],['الغَيث','المطر'],['الفِطنة','الذكاء وسرعة الفهم'],['القَحط','انقطاع المطر والجدب'],['الكَدّ','التعب في العمل'],['اللَّبيب','العاقل'],['المآثر','المكارم والأفعال الحميدة'],['النَّأي','البُعد'],['الوَجَل','الخوف'],['الوَهن','الضعف'],['الأَرَق','ذهاب النوم ليلًا'],['البَسالة','الشجاعة'],['التَّبجيل','التعظيم والتوقير'],['الجَدْب','انقطاع الخصب'],['الحَنَق','الغيظ الشديد'],['الذُّعر','الفزع الشديد'],['الرَّغَد','سعة العيش وطيبه'],['السَّجيّة','الطبع والخُلُق'],['الصَّفح','العفو وترك المؤاخذة'],['العَناء','التعب والمشقة'],['الفَيء','الظلّ بعد الزوال'],['المُضني','المُتعب المُرهِق'],['اليَنْع','نضج الثمر'],['الإسهاب','الإطالة في الكلام'],['الإيجاز','اختصار الكلام مع وفاء المعنى'],['التَّريّث','التمهّل وعدم العجلة'],['الجَلَد','الصبر والقوة على التحمل']],
 en:[['abundant','plentiful'],['candid','frank and honest'],['diligent','hardworking and careful'],['eloquent','fluent and persuasive'],['frugal','careful with money'],['hostile','unfriendly, aggressive'],['impartial','fair, not taking sides'],['inevitable','unavoidable'],['meticulous','extremely careful with details'],['novice','beginner'],['obsolete','out of date'],['prudent','wise and cautious'],['reluctant','unwilling'],['scarce','in short supply'],['tedious','long and boring'],['vivid','bright and clear'],['ambiguous','having more than one meaning'],['benevolent','kind and generous'],['concise','brief but complete'],['deteriorate','get worse'],['enhance','improve'],['fragile','easily broken'],['hinder','hold back, obstruct'],['lucid','clear and easy to understand'],['mundane','ordinary, dull'],['persevere','keep going despite difficulty'],['resilient','recovering quickly'],['skeptical','doubtful'],['tranquil','calm and peaceful'],['versatile','able to adapt to many uses'],['arrogant','overly proud'],['humble','modest'],['hasty','done too quickly'],['scrutinize','examine closely'],['vague','unclear'],['zeal','great enthusiasm']]
};
/* ============ Study kit: illustrations, flashcards, techniques, patterns ============ */
const sv=(inner,vb='0 0 220 130')=>`<svg class="ill" viewBox="${vb}" direction="ltr" aria-hidden="true">${inner}</svg>`;
const tx=(x,y,s,cls='il-t',anchor='middle')=>`<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}">${s}</text>`;
const ILL = {
 pyth:()=>sv(`<path d="M50 105 L170 105 L50 15 Z" class="il-fill"/><path d="M50 105 L170 105 L50 15 Z" class="il-s"/><path d="M50 93 h12 v12" class="il-s thin"/>${tx(36,65,'3','il-t b')}${tx(110,122,'4','il-t b')}${tx(122,52,'5','il-t acc b')}${tx(190,30,'a²+b²=c²','il-t acc','end')}`),
 circle:()=>sv(`<circle cx="80" cy="65" r="48" class="il-fill"/><circle cx="80" cy="65" r="48" class="il-s"/><line x1="80" y1="65" x2="128" y2="65" class="il-s acc"/><circle cx="80" cy="65" r="3" class="il-dot"/>${tx(104,58,'r','il-t acc b')}${tx(175,50,'C = 2πr')}${tx(175,78,'A = πr²')}`),
 polygon:()=>{ const p=[...Array(6)].map((_,i)=>{const a=Math.PI/3*i-Math.PI/2;return `${(70+44*Math.cos(a)).toFixed(1)},${(65+44*Math.sin(a)).toFixed(1)}`;}).join(' '); return sv(`<polygon points="${p}" class="il-fill"/><polygon points="${p}" class="il-s"/>${tx(70,70,'n = 6','il-t b')}${tx(165,55,'(n−2)×180°')}${tx(165,80,'= 720°','il-t acc b')}`); },
 clock:()=>{ let t=''; for(let i=0;i<12;i++){ const a=Math.PI/6*i; t+=`<line x1="${70+40*Math.sin(a)}" y1="${65-40*Math.cos(a)}" x2="${70+46*Math.sin(a)}" y2="${65-46*Math.cos(a)}" class="il-s thin"/>`; }
   return sv(`<circle cx="70" cy="65" r="50" class="il-fill"/><circle cx="70" cy="65" r="50" class="il-s"/>${t}<path d="M70 45 A20 20 0 0 1 90 65" class="il-s acc"/><line x1="70" y1="65" x2="70" y2="28" class="il-s"/><line x1="70" y1="65" x2="100" y2="65" class="il-s acc"/>${tx(95,48,'90°','il-t acc b')}${tx(170,55,'1 h = 30°')}${tx(170,80,'3 × 30 = 90°','il-t b')}`); },
 cube:()=>sv(`<path d="M40 50 L85 30 L130 50 L85 70 Z" class="il-fill2"/><path d="M40 50 L85 70 L85 118 L40 98 Z" class="il-fill"/><path d="M85 70 L130 50 L130 98 L85 118 Z" class="il-fill3"/><path d="M40 50 L85 30 L130 50 L130 98 L85 118 L40 98 Z M40 50 L85 70 L130 50 M85 70 L85 118" class="il-s"/>${tx(55,115,'s','il-t acc b')}${tx(180,55,'V = s³')}${tx(180,82,'SA = 6s²')}`),
 triAngles:()=>sv(`<path d="M30 105 L150 105 L95 25 Z" class="il-fill"/><path d="M30 105 L150 105 L95 25 Z" class="il-s"/>${tx(48,100,'a','il-t acc b')}${tx(132,100,'b','il-t acc b')}${tx(95,48,'c','il-t acc b')}${tx(190,65,'a+b+c','il-t','middle')}${tx(190,88,'= 180°','il-t b')}`),
 rect:()=>sv(`<rect x="25" y="30" width="110" height="65" rx="3" class="il-fill"/><rect x="25" y="30" width="110" height="65" rx="3" class="il-s"/>${tx(80,112,'l','il-t acc b')}${tx(14,67,'w','il-t acc b')}${tx(180,55,'A = l × w')}${tx(180,82,'P = 2(l + w)')}`),
 numline:()=>{ const pts=[[-1,30],[0,70],[.5,90],[1,110],[2,150]]; return sv(`<line x1="15" y1="70" x2="205" y2="70" class="il-s"/>${[-2,-1,0,1,2,3].map(v=>`<line x1="${70+v*40}" y1="64" x2="${70+v*40}" y2="76" class="il-s thin"/>`).join('')}${pts.map(([v,x])=>`<circle cx="${70+v*40}" cy="70" r="6" class="il-dot"/>`).join('')}${tx(30,98,'−1')}${tx(70,98,'0')}${tx(90,50,'½','il-t acc b')}${tx(110,98,'1')}${tx(150,98,'2')}${tx(110,28,'try: 0, 1, −1, ½, 2','il-t acc')}`); },
 squares:()=>sv(`${tx(12,36,'x²','il-t b','start')}<rect x="40" y="26" width="20" height="14" rx="3" class="il-bar pink"/>${tx(12,68,'x','il-t b','start')}<rect x="40" y="58" width="60" height="14" rx="3" class="il-bar"/>${tx(12,100,'√x','il-t b','start')}<rect x="40" y="90" width="120" height="14" rx="3" class="il-bar acc"/>${tx(200,68,'x = ¼','il-t acc b','end')}`),
 percent:()=>sv(`<rect x="15" y="40" width="190" height="34" rx="6" class="il-fill"/>${[0,1,2,3].map(i=>`<rect x="${15+i*47.5}" y="40" width="47.5" height="34" class="${i===0?'il-bar acc':'il-cell'}"/>`).join('')}<rect x="15" y="40" width="190" height="34" rx="6" class="il-s"/>${tx(39,63,'25%','il-t light b')}${tx(110,100,'25% = ¼   20% = ⅕   12.5% = ⅛','il-t')}`),
 fractions:()=>sv([2,3,4].map((n,r)=>{ const y=18+r*36, w=150/n; return [...Array(n)].map((_,i)=>`<rect x="${55+i*w}" y="${y}" width="${w}" height="24" class="${i===0?'il-bar '+['acc','pink','sky'][r]:'il-cell'}"/>`).join('')+`<rect x="55" y="${y}" width="150" height="24" class="il-s thin" fill="none"/>`+tx(35,y+17,['½','⅓','¼'][r],'il-t b'); }).join('')),
 ratio:()=>sv(`${[...Array(3)].map((_,i)=>`<rect x="${15+i*24}" y="40" width="20" height="20" rx="4" class="il-bar acc"/>`).join('')}${[...Array(5)].map((_,i)=>`<rect x="${95+i*24}" y="40" width="20" height="20" rx="4" class="il-bar pink"/>`).join('')}${tx(49,85,'3','il-t acc b')}${tx(143,85,'5','il-t b')}${tx(110,112,'3 : 5  →  8 parts','il-t')}`),
 balance:()=>sv(`<line x1="110" y1="30" x2="110" y2="110" class="il-s"/><path d="M85 112 h50" class="il-s"/><line x1="30" y1="40" x2="190" y2="40" class="il-s"/><path d="M30 40 L15 75 h50 Z" class="il-fill"/><path d="M190 40 L175 75 h50 Z" class="il-fill"/><path d="M30 40 L15 75 h50 Z M190 40 L175 75 h50 Z" class="il-s thin"/>${tx(40,95,'3x − 7','il-t b')}${tx(195,95,'11','il-t b')}${tx(110,22,'=','il-t acc b')}`),
 sequence:()=>{ const v=[3,5,9,17,33]; return sv(v.map((n,i)=>`<circle cx="${25+i*42}" cy="80" r="15" class="il-fill"/><circle cx="${25+i*42}" cy="80" r="15" class="il-s thin"/>${tx(25+i*42,85,n,'il-t b')}`).join('')+[2,4,8,16].map((d,i)=>`<path d="M${30+i*42} 62 Q${46+i*42} 40 ${62+i*42} 62" class="il-s acc thin"/>${tx(46+i*42,40,'+'+d,'il-t acc')}`).join('')); },
 slope:()=>sv(`<line x1="20" y1="110" x2="200" y2="110" class="il-s thin"/><line x1="30" y1="120" x2="30" y2="10" class="il-s thin"/><line x1="40" y1="100" x2="170" y2="22" class="il-s acc"/><path d="M75 79 H140 V40" class="il-s" stroke-dasharray="4 4"/>${tx(108,94,'run')}${tx(158,62,'rise','il-t','start')}${tx(110,20,'m = rise ÷ run','il-t b','end')}`),
 exponent:()=>sv(`${[0,1,2].map(i=>`<rect x="${15+i*18}" y="50" width="14" height="14" rx="3" class="il-bar acc"/>`).join('')}${tx(82,63,'×','il-t b')}${[0,1].map(i=>`<rect x="${95+i*18}" y="50" width="14" height="14" rx="3" class="il-bar pink"/>`).join('')}${tx(150,63,'=','il-t b')}${tx(40,95,'2³')}${tx(113,95,'2²')}${tx(185,63,'2⁵','il-t acc b')}${tx(110,122,'aᵐ × aⁿ = aᵐ⁺ⁿ','il-t')}`),
 mean:()=>{ const v=[12,18,15,25,30]; return sv(v.map((n,i)=>`<rect x="${25+i*36}" y="${110-n*3}" width="24" height="${n*3}" rx="4" class="il-bar ${n>20?'acc':'sky'}"/>`).join('')+`<line x1="15" y1="${110-60}" x2="205" y2="${110-60}" class="il-s pinks" stroke-dasharray="6 4"/>`+tx(205,44,'mean = 20','il-t b','end')); },
 median:()=>{ const v=[8,10,23,31,32]; return sv(v.map((n,i)=>`<rect x="${14+i*40}" y="40" width="32" height="44" rx="6" class="${i===2?'il-bar acc':'il-fill'}"/><rect x="${14+i*40}" y="40" width="32" height="44" rx="6" class="il-s thin"/>${tx(30+i*40,68,n,i===2?'il-t light b':'il-t b')}`).join('')+tx(110,112,'sort → middle','il-t acc')); },
 prob:()=>{ const pos=[[60,55],[85,50],[110,58],[70,80],[95,82],[120,80],[80,105],[105,104]]; return sv(`<path d="M45 40 Q90 20 135 40 L145 115 Q90 130 35 115 Z" class="il-fill"/><path d="M45 40 Q90 20 135 40 L145 115 Q90 130 35 115 Z" class="il-s"/>${pos.map((p,i)=>`<circle cx="${p[0]}" cy="${p[1]}" r="9" class="il-bar ${i<3?'pink':'acc'}"/>`).join('')}${tx(185,65,'P = 3/8','il-t b')}`); },
 speed:()=>sv(`<path d="M110 15 L190 115 L30 115 Z" class="il-fill"/><path d="M110 15 L190 115 L30 115 Z M60 78 H160 M110 78 V115" class="il-s"/>${tx(110,62,'D','il-t acc b')}${tx(85,103,'S','il-t b')}${tx(135,103,'T','il-t b')}`),
 work:()=>sv(`<rect x="20" y="25" width="180" height="20" rx="5" class="il-cell"/><rect x="20" y="25" width="30" height="20" rx="5" class="il-bar pink"/>${tx(210,40,'1/6','il-t','end')}<rect x="20" y="55" width="180" height="20" rx="5" class="il-cell"/><rect x="20" y="55" width="60" height="20" rx="5" class="il-bar sky"/>${tx(210,70,'1/3','il-t','end')}<rect x="20" y="88" width="180" height="20" rx="5" class="il-cell"/><rect x="20" y="88" width="90" height="20" rx="5" class="il-bar acc"/>${tx(210,103,'1/2','il-t b','end')}`),
 analogy:()=>sv(`<rect x="10" y="20" width="60" height="30" rx="8" class="il-fill"/><rect x="150" y="20" width="60" height="30" rx="8" class="il-fill"/><rect x="10" y="80" width="60" height="30" rx="8" class="il-fill2"/><rect x="150" y="80" width="60" height="30" rx="8" class="il-fill2"/><path d="M10 20 h60 v30 h-60Z M150 20 h60 v30 h-60Z M10 80 h60 v30 h-60Z M150 80 h60 v30 h-60Z" class="il-s thin"/><path d="M75 35 H145 M138 30 l7 5 -7 5 M75 95 H145 M138 90 l7 5 -7 5" class="il-s acc"/>${tx(40,40,'A','il-t b')}${tx(180,40,'B','il-t b')}${tx(40,100,'C','il-t b')}${tx(180,100,'D','il-t b')}${tx(110,28,'R','il-t acc b')}${tx(110,88,'R','il-t acc b')}`),
 odd:()=>sv(`${[30,80,130].map(x=>`<circle cx="${x}" cy="65" r="20" class="il-bar sky"/>`).join('')}<path d="M180 45 L200 85 L160 85 Z" class="il-bar pink"/><path d="M180 45 L200 85 L160 85 Z" class="il-s"/>${tx(180,112,'odd','il-t acc b')}`),
 context:()=>sv(`<rect x="10" y="50" width="200" height="30" rx="6" class="il-fill"/>${[[18,38,'il-bar sky'],[62,40,'il-cell'],[108,34,'il-bar pink'],[148,52,'il-bar sky']].map(([x,w,c])=>`<rect x="${x}" y="58" width="${w}" height="14" rx="4" class="${c}"/>`).join('')}<path d="M104 54 L146 76 M146 54 L104 76" class="il-s"/>${tx(37,100,'anchor','il-t acc')}${tx(174,100,'anchor','il-t acc')}${tx(125,40,'✗','il-t b')}`),
 completion:()=>sv(`<rect x="10" y="50" width="200" height="30" rx="6" class="il-fill"/><rect x="20" y="58" width="50" height="14" rx="4" class="il-bar acc"/><line x1="90" y1="72" x2="140" y2="72" class="il-s" stroke-dasharray="5 4"/><rect x="155" y="58" width="45" height="14" rx="4" class="il-cell"/><path d="M45 45 Q80 18 115 45 M108 38 l7 7 -9 2" class="il-s pinks"/>${tx(80,24,'⇄','il-t b')}${tx(45,100,'signal','il-t acc')}${tx(115,100,'?','il-t b')}`),
 reading:()=>sv(`<rect x="20" y="12" width="120" height="108" rx="8" class="il-fill"/><rect x="20" y="12" width="120" height="108" rx="8" class="il-s thin"/>${[28,42,56,70,84,98].map((y,i)=>`<rect x="32" y="${y}" width="${i===3?96:80+((i*13)%16)}" height="7" rx="3" class="${i===3?'il-bar butter':'il-cell'}"/>`).join('')}<circle cx="160" cy="80" r="22" class="il-s acc"/><line x1="176" y1="96" x2="200" y2="120" class="il-s acc"/>${tx(160,86,'✓','il-t acc b')}`)
};

const FC=(id,sk,ill,arF,arB,arX,enF,enB,enX)=>({id,sk,ill,f:{ar:arF,en:enF},b:{ar:arB,en:enB},x:{ar:arX,en:enX}});
const FLASH=[
 FC('a1','arith','percent','النسب المئوية ككسور','٥٠٪ = ½ ، ٢٥٪ = ¼ ، ٢٠٪ = ⅕ ، ١٠٪ = ١/١٠ ، ١٢٫٥٪ = ⅛ ، ٧٥٪ = ¾','٢٥٪ من ٨٠ = ٨٠ ÷ ٤ = ٢٠','Percents as fractions','50% = ½, 25% = ¼, 20% = ⅕, 10% = 1/10, 12.5% = ⅛, 75% = ¾','25% of 80 = 80 ÷ 4 = 20'),
 FC('a2','arith','fractions','مقارنة الكسور','حوّل إلى عشري أو اضرب تبادليًا: أ/ب مقابل ج/د ← قارن أ×د مع ج×ب.','٣/٧ مقابل ٤/٩: ٢٧ < ٢٨ ← الثاني أكبر','Comparing fractions','Convert to decimals or cross-multiply: a/b vs c/d → compare a×d with c×b.','3/7 vs 4/9: 27 < 28 → the second is larger'),
 FC('a3','arith','ratio','النسبة والتناسب','النسبة أ : ب تعني (أ + ب) أجزاء. اقسم المجموع على عدد الأجزاء ثم اضرب.','٣ : ٥ والمجموع ٤٠ ← الجزء ٥ ← ١٥ و ٢٥','Ratio and proportion','A ratio a : b means (a + b) parts. Divide the total by the parts, then multiply.','3 : 5 with total 40 → part 5 → 15 and 25'),
 FC('a4','arith','percent','نسبة التغير','(الفرق ÷ القديم) × ١٠٠. القسمة دائمًا على القيمة القديمة.','من ٥٠ إلى ٦٠ ← ١٠ ÷ ٥٠ = ٢٠٪','Percent change','(difference ÷ old) × 100. Always divide by the old value.','50 to 60 → 10 ÷ 50 = 20%'),
 FC('a5','arith','speed','السرعة والمسافة والزمن','م = ع × ز. غطِّ المطلوب في المثلث تظهر العلاقة.','٢٤٠ كم في ٣ ساعات ← ٨٠ كم/س','Speed, distance, time','D = S × T. Cover the unknown in the triangle.','240 km in 3 h → 80 km/h'),
 FC('a6','arith','work','العمل المشترك','اجمع معدلات الإنجاز: ١/ن₁ + ١/ن₂ = ١/ن','٦ أيام و٣ أيام ← ١/٦ + ١/٣ = ١/٢ ← يومان','Combined work','Add rates: 1/t₁ + 1/t₂ = 1/t','6 days and 3 days → 1/6 + 1/3 = 1/2 → 2 days'),
 FC('a7','arith','percent','الخصم المتتالي','اضرب المعاملات ولا تجمع النسب: خصم ٢٠٪ ثم ٢٠٪ = ٠٫٨ × ٠٫٨ = ٠٫٦٤ أي خصم ٣٦٪.','زيادة ١٠٪ ثم نقص ١٠٪ = نقص ١٪','Successive percents','Multiply factors, never add: 20% off twice = 0.8 × 0.8 = 0.64, i.e. 36% off.','Up 10% then down 10% = down 1%'),
 FC('a8','arith','sequence','المضاعف المشترك الأصغر','للأحداث التي تتكرر معًا (إشارات، حافلات): أصغر عدد يقبل القسمة على الاثنين.','كل ٤ ثوانٍ وكل ٦ ثوانٍ ← معًا بعد ١٢','Least common multiple','For events that repeat together (lights, buses): the smallest number divisible by both.','Every 4 s and every 6 s → together after 12'),
 FC('g1','algebra','balance','حل المعادلة','ما تفعله في طرف افعله في الآخر: انقل الثوابت ثم اقسم على المعامل.','٣س − ٧ = ١١ ← ٣س = ١٨ ← س = ٦','Solving an equation','Do the same to both sides: move constants, then divide by the coefficient.','3x − 7 = 11 → 3x = 18 → x = 6'),
 FC('g2','algebra','balance','نظام معادلتين','اجمع المعادلتين أو اطرحهما ليختفي متغير.','س + ص = ١٠ ، س − ص = ٤ ← ٢س = ١٤ ← س = ٧','Two equations','Add or subtract the equations to cancel a variable.','x + y = 10, x − y = 4 → 2x = 14 → x = 7'),
 FC('g3','algebra','exponent','قوانين الأسس','الضرب: اجمع الأسس. القسمة: اطرحها. القوة للقوة: اضربها. أي عدد أُسّه صفر = ١.','٢⁵ × ٢³ ÷ ٢⁴ = ٢⁴','Exponent rules','Multiply: add exponents. Divide: subtract. Power of a power: multiply. Anything to the 0 = 1.','2⁵ × 2³ ÷ 2⁴ = 2⁴'),
 FC('g4','algebra','squares','تبسيط الجذور','أخرج أكبر مربع كامل: √(أ × ب) = √أ × √ب','√٧٢ = √(٣٦ × ٢) = ٦√٢','Simplifying roots','Pull out the largest perfect square: √(ab) = √a × √b','√72 = √(36 × 2) = 6√2'),
 FC('g5','algebra','sequence','المتتابعات','جرّب بالترتيب: فرق ثابت، نسبة ثابتة، فروق الفروق، مربعات، تضاعف الفروق.','٣، ٥، ٩، ١٧، ٣٣ ← الفروق تتضاعف ← ٦٥','Sequences','Test in order: constant difference, constant ratio, second differences, squares, doubling differences.','3, 5, 9, 17, 33 → differences double → 65'),
 FC('g6','algebra','slope','الميل','الميل = فرق الصادات ÷ فرق السينات.','(١، ٢) و (٣، ٨) ← ٦ ÷ ٢ = ٣','Slope','Slope = change in y ÷ change in x.','(1, 2) and (3, 8) → 6 ÷ 2 = 3'),
 FC('g7','algebra','squares','متطابقات تختصر الحساب','(أ + ب)² = أ² + ٢أب + ب² — أ² − ب² = (أ − ب)(أ + ب)','٥١² − ٤٩² = ٢ × ١٠٠ = ٢٠٠','Shortcut identities','(a + b)² = a² + 2ab + b² — a² − b² = (a − b)(a + b)','51² − 49² = 2 × 100 = 200'),
 FC('g8','algebra','balance','فخ المطلوب','اقرأ المطلوب قبل الحل: قد يكون س + ٢ أو ٢س لا س. الخيار الذي يساوي س غالبًا فخ.','٣س − ٧ = ١١ والمطلوب س + ٢ ← ٨ (والخيار ٦ فخ)','The "what is asked" trap','Read what is asked: it may be x + 2 or 2x, not x. The choice equal to x is often a trap.','3x − 7 = 11, asked x + 2 → 8 (6 is the trap)'),
 FC('e1','geometry','pyth','فيثاغورس وثلاثياته','الوتر² = أ² + ب². احفظ (٣، ٤، ٥) (٥، ١٢، ١٣) (٨، ١٥، ١٧) ومضاعفاتها.','ضلعان ٦ و٨ ← الوتر ١٠ دون حساب','Pythagoras and triples','c² = a² + b². Memorize (3, 4, 5) (5, 12, 13) (8, 15, 17) and multiples.','Legs 6 and 8 → 10 with no working'),
 FC('e2','geometry','triAngles','زوايا المثلث','المجموع ١٨٠°. الزاوية الخارجية = مجموع الزاويتين الداخليتين البعيدتين.','٥٠° و ٦٠° ← الثالثة ٧٠°','Triangle angles','They sum to 180°. An exterior angle = the two remote interior angles.','50° and 60° → third is 70°'),
 FC('e3','geometry','polygon','زوايا المضلع','المجموع = (ن − ٢) × ١٨٠°. في المنتظم قسّم على ن.','السداسي: ٧٢٠° والزاوية ١٢٠°','Polygon angles','Sum = (n − 2) × 180°. Regular: divide by n.','Hexagon: 720°, each 120°'),
 FC('e4','geometry','circle','الدائرة','المحيط = ٢πنق = π × القطر. المساحة = πنق². انتبه: القطر ضعف نصف القطر.','نق = ٣ ← المحيط ٦π والمساحة ٩π','The circle','C = 2πr = π × d. A = πr². Careful: diameter is twice the radius.','r = 3 → C = 6π, A = 9π'),
 FC('e5','geometry','rect','المستطيل والمربع','المساحة = الطول × العرض. المحيط = ٢(الطول + العرض). محيط المربع = ٤ل.','مربع محيطه ٣٦ ← ل = ٩ ← المساحة ٨١','Rectangle and square','Area = l × w. Perimeter = 2(l + w). Square perimeter = 4s.','Square with perimeter 36 → s = 9 → area 81'),
 FC('e6','geometry','cube','المكعب','الحجم = ل³ ، المساحة الكلية = ٦ل². الخلط بينهما أشهر فخ.','ل = ٤ ← الحجم ٦٤ والمساحة ٩٦','The cube','V = s³, surface area = 6s². Mixing them up is the classic trap.','s = 4 → V = 64, SA = 96'),
 FC('e7','geometry','clock','زاوية الساعة','كل ساعة = ٣٠°، وعقرب الدقائق يتحرك ٦° كل دقيقة، وعقرب الساعات ½° كل دقيقة. الزاوية الصغرى لا تتجاوز ١٨٠°.','٣:٠٠ ← ٩٠° ، ٨:٠٠ ← ١٢٠° ، ٣:٣٠ ← ٧٥°','Clock angles','Each hour = 30°; the minute hand moves 6° a minute and the hour hand ½° a minute. The smaller angle is at most 180°.','3:00 → 90°, 8:00 → 120°, 3:30 → 75°'),
 FC('e8','geometry','triAngles','مثلثات خاصة','٣٠-٦٠-٩٠: الأضلاع ١ : √٣ : ٢ — ٤٥-٤٥-٩٠: الأضلاع ١ : ١ : √٢','وتر ١٠ في ٣٠-٦٠-٩٠ ← الضلع الأقصر ٥','Special triangles','30-60-90: sides 1 : √3 : 2 — 45-45-90: sides 1 : 1 : √2','Hypotenuse 10 in 30-60-90 → short side 5'),
 FC('s1','stats','mean','المتوسط','المجموع ÷ العدد. ومنه: المجموع = المتوسط × العدد (مفتاح أسئلة العدد المفقود).','متوسط ٤ أعداد ١٥ ← المجموع ٦٠','Mean','Sum ÷ count, so sum = mean × count (the key to missing-number questions).','Mean of 4 numbers is 15 → sum 60'),
 FC('s2','stats','median','الوسيط','رتّب أولًا ثم خذ الأوسط. إن كان العدد زوجيًا: متوسط القيمتين الوسطيين.','٣٢، ٨، ١٠، ٢٣، ٣١ ← ٢٣','Median','Sort first, then take the middle. Even count: average the two middle values.','32, 8, 10, 23, 31 → 23'),
 FC('s3','stats','mean','المتوسط الموزون','اضرب كل متوسط في عدده ثم اقسم على العدد الكلي. لا تأخذ متوسط المتوسطين.','١٢ × ٨٠ + ٨ × ٩٠ = ١٦٨٠ ÷ ٢٠ = ٨٤','Weighted mean','Multiply each average by its count, divide by the total. Never average the averages.','12 × 80 + 8 × 90 = 1680 ÷ 20 = 84'),
 FC('s4','stats','prob','الاحتمال','المطلوب ÷ الكل، وقيمته بين ٠ و ١.','٣ حمراء و ٥ زرقاء ← ٣/٨','Probability','Favorable ÷ total, always between 0 and 1.','3 red, 5 blue → 3/8'),
 FC('s5','stats','mean','قراءة الجداول','اقرأ العنوان والوحدات أولًا (آلاف؟ نسب؟) ثم احسب.','«المبيعات بالآلاف»: ٢٥ تعني ٢٥٠٠٠','Reading tables','Read the title and units first (thousands? percent?), then calculate.','"Sales in thousands": 25 means 25,000'),
 FC('s6','stats','median','الأعداد المتتالية','مجموعها = عددها × الأوسط، والأوسط هو المتوسط.','مجموع ٥ متتالية ٦٠ ← الأوسط ١٢ ← الأكبر ١٤','Consecutive numbers','Sum = count × middle, and the middle is the mean.','5 consecutive sum to 60 → middle 12 → largest 14'),
 FC('c1','comparison','numline','قاعدة التجريب','جرّب ٠ ، ١ ، −١ ، ½ ، ٢ ضمن الشروط. إن تغيرت العلاقة ← «المعطيات غير كافية».','٢س مقابل س ← غير كافية','The testing rule','Test 0, 1, −1, ½, 2 within the conditions. If the relationship changes → "cannot be determined".','2x vs x → cannot be determined'),
 FC('c2','comparison','squares','الكسور والمربعات','إذا ٠ < س < ١: س² < س < √س. وإذا س > ١ ينعكس الترتيب.','س = ¼: س² = ١/١٦ < ¼ < ½','Fractions and squares','If 0 < x < 1: x² < x < √x. If x > 1 the order flips.','x = ¼: x² = 1/16 < ¼ < ½'),
 FC('c3','comparison','numline','بلا متغير','إن لم يوجد متغير فالجواب لا يمكن أن يكون «غير كافية». احسب أو قدّر.','٢¹⁰ مقابل ١٠٠٠ ← الأولى (١٠٢٤)','No variable','With no variable the answer can never be "cannot be determined". Compute or estimate.','2¹⁰ vs 1000 → A (1024)'),
 FC('c4','comparison','balance','التبسيط الآمن','أضف أو اطرح الشيء نفسه من الطرفين، أو اضرب في موجب، دون أن تتغير العلاقة.','س + ٣ مقابل س + ٥ ← ٣ مقابل ٥ ← الثانية','Safe simplifying','Add or subtract the same thing from both sides, or multiply by a positive; the relationship holds.','x + 3 vs x + 5 → 3 vs 5 → B'),
 FC('c5','comparison','numline','احذر السالب','س² = ١٦ تعني س = ±٤. والمتغير غير المقيّد قد يكون سالبًا أو صفرًا.','س² = ١٦: س مقابل ٤ ← غير كافية','Watch negatives','x² = 16 means x = ±4. An unrestricted variable may be negative or zero.','x² = 16: x vs 4 → cannot be determined'),
 FC('c6','comparison','percent','قاعدة التبديل','أ٪ من ب = ب٪ من أ.','٢٥٪ من ٨٠ = ٨٠٪ من ٢٥ = ٢٠','The swap rule','a% of b = b% of a.','25% of 80 = 80% of 25 = 20'),
 FC('n1','analogy','analogy','العلاقة في جملة','اكتب العلاقة جملة تبدأ بالكلمة الأولى، ثم طبّقها حرفيًا على الخيارات.','القلم أداة للكتابة ← المقص أداة للقص','State it as a sentence','Write the relationship as a sentence starting with the first word, then apply it to each choice.','A pen is a tool for writing → scissors are a tool for cutting'),
 FC('n2','analogy','analogy','فخ الترتيب المعكوس','سبب : نتيجة لا يساوي نتيجة : سبب. تحقق من الاتجاه دائمًا.','مطر : سيول ← إهمال : فشل ✓ ، نجاح : اجتهاد ✗','Reversed-order trap','Cause : effect is not effect : cause. Always check direction.','rain : flood → negligence : failure ✓, success : effort ✗'),
 FC('n3','analogy','analogy','أشهر العلاقات','أداة ووظيفة، جزء وكل، تضاد، ترادف، سبب ونتيجة، مهنة ومكان، كائن ومسكن، صغير وكبير، صانع ومادة، مادة ومنتج، وحدة وكمية، تدرّج.','شبل : أسد = مهر : حصان','The common relationships','Tool-function, part-whole, opposites, synonyms, cause-effect, worker-place, animal-home, young-adult, maker-material, material-product, unit-quantity, degree.','cub : lion = foal : horse'),
 FC('n4','analogy','analogy','الترادف مقابل التدرج','الترادف: المعنى نفسه. التدرج: درجة أقوى من المعنى.','جسور : شجاع (ترادف) — دافئ : حار (تدرج)','Synonym vs degree','Synonyms: same meaning. Degree: a stronger form of the meaning.','bold : brave (synonym) — warm : hot (degree)'),
 FC('n5','analogy','analogy','الموضوع لا يكفي','خيار من الموضوع نفسه ليس دليلًا على صحته.','طبيب : مستشفى ← معلم : مدرسة وليس مريض : دواء','Topic is not enough','A same-topic choice is not evidence of a match.','doctor : hospital → teacher : school, not patient : medicine'),
 FC('n6','analogy','analogy','صانع ومادة، ومادة ومنتج','نجار : خشب (صانع : مادة) يختلف عن خشب : ورق (مادة : منتج). لاحظ من يأتي أولًا.','خياط : قماش ✓ ، قطن : قماش (علاقة أخرى)','Maker vs material','carpenter : wood (maker : material) differs from wood : paper (material : product).','tailor : fabric ✓, cotton : cloth (a different relation)'),
 FC('m1','completion','completion','أدوات التضاد','رغم، لكن، بينما، غير أن، بل ← الكلمة المفقودة عكس ما قبلها.','رغم محدودية الإمكانات حقق نتائج مبهرة','Contrast signals','although, but, whereas, however, despite → the missing word opposes what came before.','Despite limited resources, it achieved great results'),
 FC('m2','completion','completion','أدوات السبب والنتيجة','لأن، لذا، فـ، إذ، مما ← الكلمة توافق منطق ما قبلها.','أدى شحّ الأمطار إلى جفاف الآبار','Cause and result signals','because, so, therefore, since → the word follows the logic before it.','Scarce rain dried up the wells'),
 FC('m3','completion','completion','توقّع أولًا','ضع كلمتك في ذهنك قبل قراءة الخيارات، ثم ابحث عن أقربها.','«كان حديثه ... فلم يفهموا» ← أتوقع «غامضًا»','Predict first','Put your own word in mind before reading the choices, then find the closest.','"His talk was ___ so no one understood" → predict "vague"'),
 FC('m4','completion','completion','الأمثال صيغ ثابتة','الأمثال لا تقبل المرادف. احفظها بصيغتها.','خير الكلام ما قلّ و«دلّ»','Idioms are fixed','Idioms do not take synonyms. Learn them word for word.','Actions speak louder than "words"'),
 FC('m5','completion','completion','الفراغان','ابدأ بالفراغ الأسهل واستبعد الخيارات التي لا تناسبه.','«يقوّي / بينما»','Two blanks','Start with the easier blank and eliminate what does not fit.','"strengthens / whereas"'),
 FC('x1','context','context','المرتكزان','كل جملة فيها كلمتان تبنيان معناها. الكلمة الخاطئة تصطدم بهما.','بذل جهدًا ... فتراجع ... وتألق ← «تراجع»','The two anchors','Every sentence has two words that fix its meaning. The wrong word collides with them.','trained hard ... declined ... shone → "declined"'),
 FC('x2','context','context','اختبار الاستبدال','ضع عكس الكلمة: إن استقام المعنى فهي الخطأ.','«ضعفت حصيلته» ← «زادت» ✓','Replacement test','Put in the opposite: if the sentence now works, that is the error.','"poorer vocabulary" → "richer" ✓'),
 FC('x3','context','context','أداة الربط قد تكون الخطأ','«لكن» مكان «فـ» خطأ سياقي شائع.','أدرك الحافلة لكنه وصل قبل الجميع','The linking word can be wrong','"but" where "and/so" belongs is a common contextual error.','caught the bus, but arrived first'),
 FC('x4','context','context','الحقائق العلمية','قد يكون الخطأ حقيقة معكوسة: الغليان، التجمد، الغروب، الأكسجين.','تغرب الشمس في الشرق ← الغرب','Scientific facts','The error may be a reversed fact: boiling, freezing, sunset, oxygen.','The sun sets in the east → west'),
 FC('o1','odd','odd','ابحث عن أقوى رابط','التصنيف أولًا، ثم المعنى، ثم النوع النحوي، ثم الوظيفة.','صقر، حمامة، نسر، ذئب ← ذئب','Find the strongest link','Category first, then meaning, then part of speech, then function.','falcon, pigeon, eagle, wolf → wolf'),
 FC('o2','odd','odd','الأصناف القريبة','فواكه/خضار، معادن/أحجار كريمة، طيور/ثدييات، هجري/ميلادي.','محرم، رجب، شعبان، مارس ← مارس','Close categories','fruit/vegetable, metals/gems, birds/mammals, Hijri/Gregorian months.','ruby, emerald, diamond, copper → copper'),
 FC('o3','odd','odd','اسم أم فعل؟','أحيانًا الرابط نحوي: ثلاثة أفعال واسم.','قرأ، كتب، رسم، قلم ← قلم','Noun or verb?','Sometimes the link is grammatical: three verbs and a noun.','read, write, draw, pencil → pencil'),
 FC('r1','reading','reading','السؤال قبل النص','اقرأ السؤال أولًا لتعرف عمّا تبحث، ثم ارجع إلى الجزء المرتبط.','«سبب توجه المملكة إلى الطاقة الشمسية» ← ابحث عن «ولهذا»','Question before passage','Read the question first so you know what to look for.','"Why did the Kingdom turn to solar power?" → look for "For this reason"'),
 FC('r2','reading','reading','الفكرة الرئيسة','تجمع أول النص وآخره. العنوان الذي يغطي فقرة واحدة فقط فخ.','«الطاقة الشمسية في المملكة: فرص وتحديات» لا «الغبار في الصحراء»','Main idea','It joins the start and end of the passage. A title covering one part is a trap.','"Solar Power in Saudi Arabia: Opportunities and Challenges", not "Dust in the Desert"'),
 FC('r3','reading','reading','الدليل','لكل إجابة صحيحة دليل في النص. بلا دليل لا تختر، حتى لو كانت المعلومة صحيحة.','«أبرز التحديات: تراكم الغبار» ← الدليل: «أبرزها تراكم الغبار على الألواح»','Evidence','Every correct answer has evidence in the passage. No evidence, no choice, even if the fact is true.','"Main challenge: dust" → evidence: "the most notable being dust accumulating on the panels"'),
 FC('r4','reading','reading','الكلمات المطلقة','دائمًا، أبدًا، تمامًا، فقط ← غالبًا خيار خاطئ.','«منع الهاتف تمامًا» خيار خاطئ في نص التركيز','Absolute words','always, never, completely, only → usually a wrong choice.','"ban phones completely" is the wrong choice in the focus passage'),
 FC('r5','reading','reading','معنى الكلمة في السياق','ضع الخيار مكان الكلمة واقرأ الجملة كاملة.','يعزو = ينسب','Word in context','Put the choice in place of the word and reread the sentence.','attribute = link as a cause'),
 FC('r6','reading','reading','سؤال «ليس من...»','ابحث عن الخيار غير المذكور في النص، لا عن الخطأ علميًا.','ليس من الأصناف المذكورة: البرحي','"Which is NOT..." questions','Look for the choice not in the passage, not the one that is false in general.','Which variety is not mentioned: Barhi')
];
/* foundation-track cards: 90 more cards, three for each foundation lesson */
FLASH.push(
 FC('fd01','arith','numline','ترتيب العمليات','الأقواس، ثم الأسس، ثم الضرب والقسمة حسب ورودهما، ثم الجمع والطرح حسب ورودهما.','⟦12 + 18 ÷ 3 × 2 = 12 + 12 = 24⟧','Order of operations','Brackets, then exponents, then multiplication and division left to right, then addition and subtraction left to right.','⟦12 + 18 ÷ 3 × 2 = 12 + 12 = 24⟧'),
 FC('fd02','arith','numline','إشارات الضرب والقسمة','متشابهتان تعطيان موجبًا، ومختلفتان تعطيان سالبًا. وطرح السالب جمع.','⟦(−4) × (−3) = 12⟧ ، ⟦5 − (−3) = 8⟧','Signs in × and ÷','Same signs give a positive, different signs a negative. Subtracting a negative is adding.','⟦(−4) × (−3) = 12⟧, ⟦5 − (−3) = 8⟧'),
 FC('fd03','arith','numline','الضرب في 5 و25 و99','في 5: ×10 ثم ÷2. في 25: ×100 ثم ÷4. في 99: ×100 ثم اطرح العدد.','⟦36 × 25 = 3600 ÷ 4 = 900⟧','Times 5, 25 and 99','×5: ×10 then ÷2. ×25: ×100 then ÷4. ×99: ×100 then subtract the number.','⟦36 × 25 = 3600 ÷ 4 = 900⟧'),
 FC('fd04','arith','fractions','تبسيط الكسر','اقسم البسط والمقام على أكبر قاسم مشترك بينهما.','⟦36/48⟧ ÷ 12 = ⟦3/4⟧','Simplifying a fraction','Divide the top and bottom by their greatest common factor.','⟦36/48⟧ ÷ 12 = ⟦3/4⟧'),
 FC('fd05','arith','fractions','كسر من عدد','اقسم العدد على المقام، ثم اضرب في البسط.','⟦2/5⟧ من 45 = ⟦9 × 2 = 18⟧','A fraction of a number','Divide by the denominator, then multiply by the numerator.','⟦2/5⟧ of 45 = ⟦9 × 2 = 18⟧'),
 FC('fd06','arith','fractions','البسطان المتساويان','إذا تساوى البسطان فالأكبر صاحب المقام الأصغر.','⟦3/7 > 3/8⟧','Equal numerators','With equal numerators, the smaller denominator gives the larger fraction.','⟦3/7 > 3/8⟧'),
 FC('fd07','arith','fractions','جمع الكسور','وحّد المقامين ثم اجمع البسطين. لا تجمع المقامات.','⟦1/4 + 2/3 = 3/12 + 8/12 = 11/12⟧','Adding fractions','Make the denominators equal, then add the numerators. Never add the denominators.','⟦1/4 + 2/3 = 3/12 + 8/12 = 11/12⟧'),
 FC('fd08','arith','fractions','قسمة الكسور','اقلب الكسر الثاني ثم اضرب.','⟦2/3 ÷ 4/9 = 2/3 × 9/4 = 3/2⟧','Dividing fractions','Flip the second fraction, then multiply.','⟦2/3 ÷ 4/9 = 2/3 × 9/4 = 3/2⟧'),
 FC('fd09','arith','fractions','«جزء من الباقي»','اضرب الأجزاء المتبقية: أنفق الثلث ثم ربع الباقي ← يبقى ⟦2/3 × 3/4⟧.','يبقى ⟦1/2⟧ من الأصل','"Part of the rest"','Multiply the parts left: spend a third, then a quarter of the rest → ⟦2/3 × 3/4⟧ is left.','⟦1/2⟧ of the original is left'),
 FC('fd10','arith','percent','ضرب الأعداد العشرية','اضرب بلا فاصلة، ثم اجعل منازل الناتج بعدد منازل العددين معًا.','⟦0.3 × 0.02 = 0.006⟧','Multiplying decimals','Multiply without the points, then give the result as many places as both numbers together.','⟦0.3 × 0.02 = 0.006⟧'),
 FC('fd11','arith','percent','قسمة الأعداد العشرية','اضرب العددين في 10 أو 100 حتى يصبح المقسوم عليه عددًا صحيحًا.','⟦1.2 ÷ 0.04 = 120 ÷ 4 = 30⟧','Dividing decimals','Multiply both numbers by 10 or 100 until the divisor is whole.','⟦1.2 ÷ 0.04 = 120 ÷ 4 = 30⟧'),
 FC('fd12','arith','percent','الأثمان','احفظ: ⟦1/8 = 0.125 = 12.5%⟧ و⟦3/8 = 0.375⟧ و⟦5/8 = 0.625⟧ و⟦7/8 = 0.875⟧','⟦3/8⟧ من 40 = 15','Eighths','Learn: ⟦1/8 = 0.125 = 12.5%⟧, ⟦3/8 = 0.375⟧, ⟦5/8 = 0.625⟧, ⟦7/8 = 0.875⟧','⟦3/8⟧ of 40 = 15'),
 FC('fd13','algebra','exponent','قسمة الأسس','الأساس نفسه: اطرح الأسس.','⟦2^7 ÷ 2^4 = 2^3 = 8⟧','Dividing powers','Same base: subtract the exponents.','⟦2^7 ÷ 2^4 = 2^3 = 8⟧'),
 FC('fd14','algebra','exponent','الأس الصفري والسالب','⟦a^0 = 1⟧، و⟦a^(−n) = 1/a^n⟧','⟦2^(−3) = 1/8⟧ ، ⟦(1/3)^(−2) = 9⟧','Zero and negative exponents','⟦a^0 = 1⟧, and ⟦a^(−n) = 1/a^n⟧','⟦2^(−3) = 1/8⟧, ⟦(1/3)^(−2) = 9⟧'),
 FC('fd15','algebra','exponent','توحيد الأساس','اكتب الأعداد بأساس واحد ثم ساوِ الأسس.','⟦9^س = 27 → 3^(2س) = 3^3 → س = 3/2⟧','A common base','Rewrite with one base, then set the exponents equal.','⟦9^x = 27 → 3^(2x) = 3^3 → x = 3/2⟧'),
 FC('fd16','algebra','squares','تبسيط الجذر','استخرج أكبر مربع يقسم العدد.','⟦√72 = √36 × √2 = 6√2⟧','Simplifying a root','Take out the largest square factor.','⟦√72 = √36 × √2 = 6√2⟧'),
 FC('fd17','algebra','squares','جمع الجذور','تُجمع الجذور المتشابهة فقط، والجذر لا يتوزع على الجمع.','⟦√18 + √8 = 5√2⟧ ، ⟦√(9 + 16) = 5⟧','Adding roots','Only like roots add, and a root does not split over addition.','⟦√18 + √8 = 5√2⟧, ⟦√(9 + 16) = 5⟧'),
 FC('fd18','algebra','squares','جذر العدد العشري','للناتج نصف عدد المنازل العشرية.','⟦√0.0049 = 0.07⟧ ، ⟦√0.09 = 0.3⟧','Root of a decimal','The result has half as many decimal places.','⟦√0.0049 = 0.07⟧, ⟦√0.09 = 0.3⟧'),
 FC('fd19','arith','numline','القسمة على 3 و9','مجموع الأرقام يقبل القسمة على 3 أو 9.','⟦5832 → 18⟧ يقبل القسمة على 9','Divisible by 3 and 9','The digit sum is divisible by 3 or 9.','⟦5832 → 18⟧, divisible by 9'),
 FC('fd20','arith','numline','الأعداد الأولية','أكبر من 1 ولا قواسم لها إلا 1 ونفسها. العدد 1 ليس أوليًا.','⟦51 = 3 × 17⟧ و⟦91 = 7 × 13⟧ ليسا أوليين','Primes','Greater than 1 with no divisors but 1 and themselves. 1 is not prime.','⟦51 = 3 × 17⟧ and ⟦91 = 7 × 13⟧ are not prime'),
 FC('fd21','arith','numline','عدد القواسم','حلّل إلى عوامل أولية، وأضف 1 لكل أس، ثم اضرب.','⟦72 = 2^3 × 3^2 → 4 × 3 = 12⟧','Number of divisors','Factor into primes, add 1 to each exponent, then multiply.','⟦72 = 2^3 × 3^2 → 4 × 3 = 12⟧'),
 FC('fd22','arith','ratio','التناسب العكسي','حاصل الضرب ثابت: عمال × أيام = حجم العمل.','6 عمال في 15 يومًا = 9 عمال في 10 أيام','Inverse proportion','The product is constant: workers × days = the job.','6 workers for 15 days = 9 workers for 10 days'),
 FC('fd23','arith','ratio','ربط نسبتين','وحّد الحد المشترك بين النسبتين.','⟦أ : ب = 2 : 3⟧ و⟦ب : ج = 4 : 5⟧ ← ⟦8 : 12 : 15⟧','Linking two ratios','Make the shared term the same in both.','⟦a : b = 2 : 3⟧, ⟦b : c = 4 : 5⟧ → ⟦8 : 12 : 15⟧'),
 FC('fd24','arith','ratio','الفرق بين نصيبين','اقسم الفرق على الفرق في عدد الأجزاء.','⟦3 : 5⟧ والفرق 12 ← الجزء 6','Difference between shares','Divide the difference by the difference in parts.','⟦3 : 5⟧ with a difference of 12 → one part is 6'),
 FC('fd25','arith','percent','ابنِ من 10%','⟦10%⟧ قسمة على 10، ثم ركّب منها أي نسبة.','⟦15%⟧ من 360 = ⟦36 + 18 = 54⟧','Build from 10%','⟦10%⟧ is dividing by 10; build any percent from it.','⟦15%⟧ of 360 = ⟦36 + 18 = 54⟧'),
 FC('fd26','arith','percent','قلب النسبة المئوية','⟦x%⟧ من y = ⟦y%⟧ من x. اختر الأسهل.','⟦8%⟧ من 50 = ⟦50%⟧ من 8 = 4','Swapping a percent','⟦x%⟧ of y = ⟦y%⟧ of x. Pick the easier one.','⟦8%⟧ of 50 = ⟦50%⟧ of 8 = 4'),
 FC('fd27','arith','percent','إيجاد الكل من الجزء','اقسم الجزء على النسبة.','⟦40%⟧ من عدد = 18 ← ⟦18 ÷ 0.4 = 45⟧','Finding the whole','Divide the part by the percent.','⟦40%⟧ of a number is 18 → ⟦18 ÷ 0.4 = 45⟧'),
 FC('fd28','arith','percent','نسبة الربح','الربح ÷ التكلفة × 100، والقسمة دائمًا على التكلفة.','شراء 250 وبيع 300 ← ⟦50 ÷ 250 = 20%⟧','Profit percent','Profit ÷ cost × 100; always divide by the cost.','Bought 250, sold 300 → ⟦50 ÷ 250 = 20%⟧'),
 FC('fd29','arith','percent','السعر قبل الخصم','اقسم السعر بعد الخصم على ما تدفعه من السعر.','بعد خصم ⟦25%⟧ = 180 ← ⟦180 ÷ 0.75 = 240⟧','Price before a discount','Divide the discounted price by the share you pay.','180 after ⟦25%⟧ off → ⟦180 ÷ 0.75 = 240⟧'),
 FC('fd30','arith','percent','الخصمان المتتاليان','اضرب المعاملين ولا تجمع النسبتين.','⟦20%⟧ ثم ⟦10%⟧: ⟦0.8 × 0.9 = 0.72⟧ ← خصم ⟦28%⟧','Two discounts in a row','Multiply the factors; never add the percents.','⟦20%⟧ then ⟦10%⟧: ⟦0.8 × 0.9 = 0.72⟧ → ⟦28%⟧ off'),
 FC('fd31','arith','speed','الدقائق إلى ساعات','اقسم على 60.','⟦45 دقيقة = 3/4 ساعة⟧ ، ⟦20 دقيقة = 1/3 ساعة⟧','Minutes to hours','Divide by 60.','⟦45 min = 3/4 h⟧, ⟦20 min = 1/3 h⟧'),
 FC('fd32','arith','speed','السرعة المتوسطة','المسافة الكلية ÷ الزمن الكلي، لا متوسط السرعتين.','ذهاب 60 وعودة 40 ← المتوسط 48','Average speed','Total distance ÷ total time, not the mean of the speeds.','Out at 60, back at 40 → average 48'),
 FC('fd33','arith','speed','الالتقاء والملاحقة','متقابلان: اجمع السرعتين. في الاتجاه نفسه: اطرح.','300 كم بسرعتي 70 و80 ← ⟦300 ÷ 150 = 2⟧ ساعة','Meeting and chasing','Toward each other: add the speeds. Same direction: subtract.','300 km at 70 and 80 → ⟦300 ÷ 150 = 2⟧ h'),
 FC('fd34','arith','work','معدل الإنجاز','من ينهي العمل في n يومًا ينجز ⟦1/n⟧ كل يوم.','عمل في 6 أيام ← ⟦1/6⟧ يوميًا','Work rate','Someone who finishes in n days does ⟦1/n⟧ each day.','A job in 6 days → ⟦1/6⟧ a day'),
 FC('fd35','arith','work','الملء والتفريغ','اطرح معدل التفريغ من معدل الملء.','⟦1/4 − 1/12 = 1/6⟧ ← 6 ساعات','Filling and draining','Subtract the drain rate from the fill rate.','⟦1/4 − 1/12 = 1/6⟧ → 6 hours'),
 FC('fd36','arith','work','الزمن معًا لشخصين','⟦حاصل الضرب ÷ المجموع⟧','6 و3 ← ⟦18 ÷ 9 = 2⟧','Time together for two','⟦product ÷ sum⟧','6 and 3 → ⟦18 ÷ 9 = 2⟧'),
 FC('fd37','arith','balance','فرق العمرين ثابت','الفرق بين عمري شخصين لا يتغير مع مرور السنين.','الأب يكبر ابنه 28 سنة اليوم وبعد 10 سنوات','The age gap is constant','The difference between two ages never changes over time.','A father 28 years older now is 28 years older in 10 years'),
 FC('fd38','arith','balance','مجموع الأعمار بعد سنين','يزيد بمقدار عدد السنين × عدد الأشخاص.','4 إخوة بعد 5 سنوات ← المجموع يزيد 20','Sum of ages later','It grows by years × number of people.','4 brothers, 5 years later → the sum grows by 20'),
 FC('fd39','arith','balance','من الكلمات إلى معادلة','«ضعف» ×2، «يزيد على» +، «أصغر بـ» −، «مجموع» +.','عمر الأب 4 أمثال ابنه ومجموعهما 50 ← ⟦5س = 50⟧','Words to equations','"Twice" ×2, "more than" +, "younger by" −, "sum" +.','Father 4 times the son, sum 50 → ⟦5x = 50⟧'),
 FC('fd40','arith','prob','مبدأ العد','اضرب عدد الطرق في كل مرحلة.','3 قمصان و4 بناطيل ← 12 زيًّا','Counting principle','Multiply the ways at each stage.','3 shirts and 4 trousers → 12 outfits'),
 FC('fd41','arith','prob','المصافحات والمباريات','اختيار اثنين من n بلا ترتيب: ⟦n(n − 1) ÷ 2⟧','6 أشخاص ← 15 مصافحة','Handshakes and matches','Choosing two of n, order not mattering: ⟦n(n − 1) ÷ 2⟧','6 people → 15 handshakes'),
 FC('fd42','arith','prob','احتمال حدثين مستقلين','اضرب الاحتمالين. واحتمال عدم الوقوع ⟦= 1 − P⟧','صورة مرتين: ⟦1/2 × 1/2 = 1/4⟧','Two independent events','Multiply the probabilities. The chance of "not" ⟦= 1 − P⟧','Heads twice: ⟦1/2 × 1/2 = 1/4⟧'),
 FC('fd43','algebra','balance','فك القوس بعد السالب','السالب قبل القوس يقلب كل إشارة داخله.','⟦−2(س − 3) = −2س + 6⟧','A minus before brackets','A minus before brackets flips every sign inside.','⟦−2(x − 3) = −2x + 6⟧'),
 FC('fd44','algebra','balance','التعويض بالسالب','ضع القيمة بين قوسين قبل التربيع.','⟦س = −3 → س^2 = 9⟧ ، ⟦−س^2 = −9⟧','Substituting a negative','Put the value in brackets before squaring.','⟦x = −3 → x^2 = 9⟧, ⟦−x^2 = −9⟧'),
 FC('fd45','algebra','balance','العبارة كاملة','اكتب المطلوب بدلالة المعطى دون إيجاد المتغير.','⟦2أ − ب = 5 → 6أ − 3ب = 15⟧','The whole expression','Write what is asked in terms of what is given, without finding the variable.','⟦2a − b = 5 → 6a − 3b = 15⟧'),
 FC('fd46','algebra','balance','المعادلة بكسور','اضرب الطرفين في المقام المشترك.','⟦س/3 + س/4 = 14 → 7س = 168 → س = 24⟧','Equations with fractions','Multiply both sides by the common denominator.','⟦x/3 + x/4 = 14 → 7x = 168 → x = 24⟧'),
 FC('fd47','algebra','balance','الضرب التبادلي','كسر = كسر: البسط × المقام الآخر.','⟦(س + 1)/3 = (س − 1)/2 → س = 5⟧','Cross-multiplying','Fraction = fraction: each numerator times the other denominator.','⟦(x + 1)/3 = (x − 1)/2 → x = 5⟧'),
 FC('fd48','algebra','balance','جرّب الخيارات','في المعادلات المعقدة عوّض الخيارات، فالذي يحقق المعادلة هو الجواب.','⟦3س − 7 = 11⟧: جرّب 6 ← ⟦18 − 7 = 11⟧','Try the choices','For a messy equation, plug in the choices; the one that works is the answer.','⟦3x − 7 = 11⟧: try 6 → ⟦18 − 7 = 11⟧'),
 FC('fd49','algebra','balance','المجموع والفرق','الأكبر ⟦= (المجموع + الفرق) ÷ 2⟧','مجموعهما 10 والفرق 4 ← 7 و3','Sum and difference','Larger ⟦= (sum + difference) ÷ 2⟧','Sum 10, difference 4 → 7 and 3'),
 FC('fd50','algebra','balance','المعادلتان المتماثلتان','⟦2س + ص⟧ و⟦س + 2ص⟧: اجمعهما ثم اقسم على 3.','⟦3س + 3ص = 24 → س + ص = 8⟧','Mirror-image equations','⟦2x + y⟧ and ⟦x + 2y⟧: add them, then divide by 3.','⟦3x + 3y = 24 → x + y = 8⟧'),
 FC('fd51','algebra','balance','الرؤوس والأرجل','افترض الكل من النوع الأقل أرجلًا، ثم اقسم الزيادة على فرق الأرجل.','20 رأسًا و56 رجلًا ← ⟦(56 − 40) ÷ 2 = 8⟧ أغنام','Heads and legs','Assume all are the fewer-legged kind, then divide the extra by the difference in legs.','20 heads, 56 legs → ⟦(56 − 40) ÷ 2 = 8⟧ sheep'),
 FC('fd52','algebra','numline','قلب إشارة المتباينة','الضرب أو القسمة على سالب يقلب الإشارة.','⟦−2س > 6 → س < −3⟧','Flipping an inequality','Multiplying or dividing by a negative flips the sign.','⟦−2x > 6 → x < −3⟧'),
 FC('fd53','algebra','numline','عد الأعداد الصحيحة','⟦≤⟧ تشمل الطرف و⟦<⟧ لا تشمله، ولا تنس الصفر.','⟦−2 ≤ س < 4⟧ ← 6 أعداد','Counting integers','⟦≤⟧ includes the end, ⟦<⟧ does not; do not forget zero.','⟦−2 ≤ x < 4⟧ → 6 integers'),
 FC('fd54','algebra','numline','القيمة المطلقة','⟦|س| < a⟧ تعني ⟦−a < س < a⟧','⟦|س − 1| ≤ 2 → −1 ≤ س ≤ 3⟧','Absolute value','⟦|x| < a⟧ means ⟦−a < x < a⟧','⟦|x − 1| ≤ 2 → −1 ≤ x ≤ 3⟧'),
 FC('fd55','algebra','squares','مربع المجموع','⟦(س + ص)^2 = س^2 + 2س ص + ص^2⟧، والحد الأوسط لا يُنسى.','⟦س + ص = 7⟧ و⟦س ص = 10⟧ ← ⟦س^2 + ص^2 = 29⟧','Square of a sum','⟦(x + y)^2 = x^2 + 2xy + y^2⟧; never drop the middle term.','⟦x + y = 7⟧, ⟦xy = 10⟧ → ⟦x^2 + y^2 = 29⟧'),
 FC('fd56','algebra','squares','الفرق بين مربعين','⟦س^2 − ص^2 = (س − ص)(س + ص)⟧','⟦51^2 − 49^2 = 2 × 100 = 200⟧','Difference of squares','⟦x^2 − y^2 = (x − y)(x + y)⟧','⟦51^2 − 49^2 = 2 × 100 = 200⟧'),
 FC('fd57','algebra','squares','تحليل العبارة التربيعية','عددان مجموعهما معامل س وحاصل ضربهما الحد الثابت.','⟦س^2 − 5س + 6 = (س − 2)(س − 3)⟧','Factoring a quadratic','Two numbers that add to the x coefficient and multiply to the constant.','⟦x^2 − 5x + 6 = (x − 2)(x − 3)⟧'),
 FC('fd58','algebra','sequence','الحد النوني الحسابي','⟦a + (n − 1)d⟧: الحد العشرون يحتاج 19 فرقًا.','⟦5، 9، 13⟧ ← الحد 20 = ⟦5 + 19 × 4 = 81⟧','The nth arithmetic term','⟦a + (n − 1)d⟧: the 20th term needs 19 steps.','⟦5, 9, 13⟧ → 20th term = ⟦5 + 19 × 4 = 81⟧'),
 FC('fd59','algebra','sequence','مجموع المتتابعة الحسابية','عدد الحدود × (الأول + الأخير) ÷ 2','⟦1 + 2 + … + 100 = 100 × 101 ÷ 2 = 5050⟧','Sum of an arithmetic sequence','Number of terms × (first + last) ÷ 2','⟦1 + 2 + … + 100 = 100 × 101 ÷ 2 = 5050⟧'),
 FC('fd60','algebra','sequence','الأنماط الدورية','اقسم على طول الدورة وانظر إلى الباقي.','بعد 100 يوم من الأحد: ⟦100 = 14 × 7 + 2⟧ ← الثلاثاء','Repeating patterns','Divide by the cycle length and look at the remainder.','100 days after Sunday: ⟦100 = 14 × 7 + 2⟧ → Tuesday'),
 FC('fd61','geometry','clock','المتتامتان والمتكاملتان','المتتامتان مجموعهما ⟦90°⟧، والمتكاملتان ⟦180°⟧','متممة ⟦64°⟧ = ⟦26°⟧','Complementary and supplementary','Complementary angles add to ⟦90°⟧, supplementary to ⟦180°⟧','The complement of ⟦64°⟧ is ⟦26°⟧'),
 FC('fd62','geometry','clock','المستقيمان المتوازيان','كل الزوايا الحادة متساوية، وكل المنفرجة متساوية، والحادة + المنفرجة ⟦= 180°⟧','حادة ⟦65°⟧ ← منفرجة ⟦115°⟧','Parallel lines','All acute angles are equal, all obtuse angles are equal, and acute + obtuse ⟦= 180°⟧','Acute ⟦65°⟧ → obtuse ⟦115°⟧'),
 FC('fd63','geometry','clock','زاوية الساعة الدقيقة','⟦|30 × الساعة − 5.5 × الدقائق|⟧','3:30 ← ⟦|90 − 165| = 75°⟧','Exact clock angle','⟦|30 × hour − 5.5 × minutes|⟧','3:30 → ⟦|90 − 165| = 75°⟧'),
 FC('fd64','geometry','triAngles','الزاوية الخارجية','تساوي مجموع الزاويتين الداخليتين البعيدتين.','داخليتان ⟦40°⟧ و⟦70°⟧ ← الخارجية ⟦110°⟧','Exterior angle','Equals the sum of the two remote interior angles.','Interior ⟦40°⟧ and ⟦70°⟧ → exterior ⟦110°⟧'),
 FC('fd65','geometry','pyth','الثلاثيات الفيثاغورية','⟦3، 4، 5⟧ ، ⟦5، 12، 13⟧ ، ⟦8، 15، 17⟧ ومضاعفاتها.','وتر 26 وضلع 10 ← 24','Pythagorean triples','⟦3, 4, 5⟧, ⟦5, 12, 13⟧, ⟦8, 15, 17⟧ and their multiples.','Hypotenuse 26, leg 10 → 24'),
 FC('fd66','geometry','triAngles','متباينة المثلث','الضلع الثالث بين الفرق والمجموع (دون تساوي).','4 و9 ← ⟦5 < ض < 13⟧','Triangle inequality','The third side lies strictly between the difference and the sum.','4 and 9 → ⟦5 < s < 13⟧'),
 FC('fd67','geometry','rect','المعين وشبه المنحرف','المعين: ⟦½ × ق₁ × ق₂⟧. شبه المنحرف: ⟦½ × (أ + ب) × ع⟧','قاعدتان 6 و10 وارتفاع 5 ← 40','Rhombus and trapezoid','Rhombus: ⟦½ × d₁ × d₂⟧. Trapezoid: ⟦½ × (a + b) × h⟧','Sides 6 and 10, height 5 → 40'),
 FC('fd68','geometry','polygon','زاوية المضلع المنتظم','الداخلية ⟦= (n − 2) × 180 ÷ n⟧، والخارجية ⟦= 360 ÷ n⟧','الخماسي: ⟦108°⟧ و⟦72°⟧','Regular polygon angles','Interior ⟦= (n − 2) × 180 ÷ n⟧, exterior ⟦= 360 ÷ n⟧','Pentagon: ⟦108°⟧ and ⟦72°⟧'),
 FC('fd69','geometry','rect','تكبير الأبعاد والمساحة','ضرب الأبعاد في k يضرب المساحة في ⟦k^2⟧','مضاعفة الضلع ← 4 أمثال المساحة','Scaling and area','Multiplying lengths by k multiplies the area by ⟦k^2⟧','Double the side → 4 times the area'),
 FC('fd70','geometry','circle','من المحيط إلى المساحة','أوجد نصف القطر أولًا.','محيط ⟦10π⟧ ← ⟦نق = 5⟧ ← مساحة ⟦25π⟧','From circumference to area','Find the radius first.','Circumference ⟦10π⟧ → ⟦r = 5⟧ → area ⟦25π⟧'),
 FC('fd71','geometry','circle','القطاع والقوس','القطاع: ⟦(θ ÷ 360) × πنق^2⟧. القوس: ⟦(θ ÷ 360) × 2πنق⟧','⟦90°⟧ ونق 8 ← قطاع ⟦16π⟧','Sector and arc','Sector: ⟦(θ ÷ 360) × πr^2⟧. Arc: ⟦(θ ÷ 360) × 2πr⟧','⟦90°⟧, r 8 → sector ⟦16π⟧'),
 FC('fd72','geometry','circle','الزاوية المحيطية','نصف المركزية على القوس نفسه، وعلى القطر قائمة.','مركزية ⟦100°⟧ ← محيطية ⟦50°⟧','Inscribed angle','Half the central angle on the same arc; on a diameter it is a right angle.','Central ⟦100°⟧ → inscribed ⟦50°⟧'),
 FC('fd73','geometry','circle','دائرة داخل مربع','قطر الدائرة = ضلع المربع.','مربع 10 ← المظلل ⟦100 − 25π⟧','A circle in a square','The circle\'s diameter = the square\'s side.','Square 10 → shaded ⟦100 − 25π⟧'),
 FC('fd74','geometry','circle','مربع داخل دائرة','قطر المربع = قطر الدائرة، ومساحته ⟦= القطر^2 ÷ 2⟧','نق 5 ← المربع 50 والمظلل ⟦25π − 50⟧','A square in a circle','The square\'s diagonal = the diameter, and its area ⟦= diagonal^2 ÷ 2⟧','r 5 → square 50, shaded ⟦25π − 50⟧'),
 FC('fd75','geometry','circle','الحلقة','⟦π(نق₁^2 − نق₂^2)⟧، لا ⟦π(نق₁ − نق₂)^2⟧','7 و4 ← ⟦33π⟧','The ring','⟦π(R^2 − r^2)⟧, not ⟦π(R − r)^2⟧','7 and 4 → ⟦33π⟧'),
 FC('fd76','geometry','cube','المكعب','الحجم ⟦= ل^3⟧، والمساحة الكلية ⟦= 6ل^2⟧','مساحة 150 ← ل 5 ← حجم 125','The cube','Volume ⟦= s^3⟧, total surface ⟦= 6s^2⟧','Surface 150 → s 5 → volume 125'),
 FC('fd77','geometry','cube','الأسطوانة والمخروط','الأسطوانة ⟦πنق^2 ع⟧، والمخروط ثلثها.','نق 3 وع 10 ← ⟦90π⟧ و⟦30π⟧','Cylinder and cone','Cylinder ⟦πr^2 h⟧; a cone is a third of it.','r 3, h 10 → ⟦90π⟧ and ⟦30π⟧'),
 FC('fd78','geometry','cube','تكبير الأبعاد والحجم','ضرب الأبعاد في k يضرب الحجم في ⟦k^3⟧','مضاعفة الحرف ← 8 أمثال الحجم','Scaling and volume','Multiplying lengths by k multiplies the volume by ⟦k^3⟧','Double the edge → 8 times the volume'),
 FC('fd79','stats','mean','من المتوسط إلى المجموع','المجموع ⟦= المتوسط × العدد⟧','متوسط 5 أعداد 12 ← المجموع 60','From mean to total','Total ⟦= mean × count⟧','5 numbers averaging 12 → total 60'),
 FC('fd80','stats','mean','المتوسط المرجّح','اجمع المجاميع ثم اقسم على العدد الكلي، لا تأخذ متوسط المتوسطين.','20 بمتوسط 70 و30 بمتوسط 80 ← 76','Weighted mean','Add the totals and divide by the full count; do not average the averages.','20 at 70 and 30 at 80 → 76'),
 FC('fd81','stats','mean','الإضافة إلى كل القيم','إضافة ثابت تزيد المتوسط به، والضرب في عدد يضرب المتوسط فيه.','متوسط 42 وكل قيمة ×6 ← 252','Changing every value','Adding a constant adds it to the mean; multiplying multiplies the mean.','Mean 42, every value ×6 → 252'),
 FC('fd82','stats','median','الوسيط في العدد الزوجي','رتّب ثم خذ متوسط القيمتين الوسطيين.','⟦3، 4، 5، 7، 9، 12⟧ ← 6','Median with an even count','Sort, then average the two middle values.','⟦3, 4, 5, 7, 9, 12⟧ → 6'),
 FC('fd83','stats','median','المنوال والمدى','المنوال الأكثر تكرارًا، والمدى ⟦= الأكبر − الأصغر⟧','⟦4، 8، 4، 6، 9⟧: المنوال 4 والمدى 5','Mode and range','The mode is the most frequent value; range ⟦= largest − smallest⟧','⟦4, 8, 4, 6, 9⟧: mode 4, range 5'),
 FC('fd84','stats','median','القيمة المتطرفة','تجذب المتوسط بقوة، والوسيط بالكاد يتأثر.','⟦12، 15، 15، 18، 60⟧: الوسيط 15 والمتوسط 24','Outliers','They pull the mean strongly; the median barely moves.','⟦12, 15, 15, 18, 60⟧: median 15, mean 24'),
 FC('fd85','stats','mean','زاوية القطاع الدائري','⟦النسبة × 360°⟧','⟦25%⟧ ← ⟦90°⟧ ، ⟦15%⟧ ← ⟦54°⟧','Pie-chart angle','⟦percent × 360°⟧','⟦25%⟧ → ⟦90°⟧, ⟦15%⟧ → ⟦54°⟧'),
 FC('fd86','stats','mean','اقرأ الرسم أولًا','العنوان، والوحدة (آلاف؟ نسب؟)، ومقياس المحور، قبل أي حساب.','محور بالآلاف: العمود 30 يعني 30000','Read the chart first','The title, unit (thousands? percent?) and axis scale before any calculation.','An axis in thousands: a bar at 30 means 30,000'),
 FC('fd87','stats','mean','التغير في الجدول','الفرق ÷ القيمة الأقدم.','من 400 إلى 500 ← ⟦25%⟧','Change in a table','Difference ÷ the earlier value.','400 to 500 → ⟦25%⟧'),
 FC('fd88','comparison','numline','بسّط الطرفين','اطرح الكمية نفسها من القيمتين أو اقسمهما على موجب واحد.','⟦3س + 5⟧ مقابل ⟦3س + 2⟧ ← 5 مقابل 2','Simplify both sides','Subtract the same amount from both, or divide both by the same positive number.','⟦3x + 5⟧ vs ⟦3x + 2⟧ → 5 vs 2'),
 FC('fd89','comparison','numline','قيم الاختبار','جرّب ⟦0، 1، −1، ½، عدد كبير⟧. إذا تغيّر الجواب فالمعطيات غير كافية.','⟦س^2⟧ مقابل ⟦س⟧ بلا شرط ← غير كافية','Test values','Try ⟦0, 1, −1, ½, a large number⟧. If the answer changes, it cannot be determined.','⟦x^2⟧ vs ⟦x⟧ with no condition → cannot be determined'),
 FC('fd90','comparison','numline','قيمتان عدديتان','إذا خلت القيمتان من المتغيرات فالجواب محدد دائمًا: لا تختر «غير كافية».','⟦17 × 19⟧ مقابل ⟦18^2⟧ ← الثانية أكبر بواحد','Two fixed numbers','With no variables the answer is always fixed: never choose "cannot be determined".','⟦17 × 19⟧ vs ⟦18^2⟧ → B is greater by one')
);

const TECH=[
 {ill:'odd',t:{ar:'الاستبعاد',en:'Elimination'},d:{ar:'احذف الخيارات المستحيلة أولًا. حذف خيارين يرفع فرصتك إلى ٥٠٪ حتى لو لم تُكمل الحل.',en:'Cross out impossible choices first. Removing two raises your odds to 50% even without finishing.'}},
 {ill:'balance',t:{ar:'التعويض بالخيارات',en:'Plug in the choices'},d:{ar:'في المعادلات المعقدة، جرّب الخيارات من الوسط. إذا كان الناتج كبيرًا فانتقل للأصغر.',en:'For messy equations, try the choices starting from the middle. Too big? Move to a smaller one.'}},
 {ill:'numline',t:{ar:'اختيار أعداد',en:'Pick numbers'},d:{ar:'إذا كانت الخيارات بالمتغيرات، ضع عددًا بسيطًا (٢ أو ١٠ أو ١٠٠) واحسب.',en:'When choices contain variables, substitute a simple number (2, 10 or 100) and compute.'}},
 {ill:'percent',t:{ar:'التقدير والتقريب',en:'Estimate'},d:{ar:'قرّب الأرقام لتعرف الحجم التقريبي للإجابة، فتستبعد الخيارات البعيدة دون حساب دقيق.',en:'Round to find the rough size of the answer and drop far-off choices without exact work.'}},
 {ill:'sequence',t:{ar:'رقم الآحاد',en:'Units digit'},d:{ar:'إذا اختلفت الخيارات في رقم الآحاد فقط احسبه وحده. آحاد قوى ٧: ٧، ٩، ٣، ١ ثم تتكرر.',en:'If choices differ only in the last digit, compute that alone. Units digits of powers of 7 cycle 7, 9, 3, 1.'}},
 {ill:'clock',t:{ar:'قاعدة الـ ٦٢ ثانية',en:'The 62-second rule'},d:{ar:'٢٥ دقيقة لـ ٢٤ سؤالًا ≈ ٦٢ ثانية للسؤال. انظر إلى المؤقت عند السؤال ٨ و١٦: يجب أن يبقى نحو ١٧ ثم ٨ دقائق.',en:'25 minutes for 24 questions ≈ 62 s each. Check the timer at question 8 and 16: about 17 then 8 minutes should remain.'}},
 {ill:'context',t:{ar:'علّم وتجاوز',en:'Mark and move on'},d:{ar:'أي سؤال يتجاوز دقيقتين: اختر أفضل تخمين، علّمه، وانتقل. ارجع إليه في آخر ٣ دقائق.',en:'Anything past two minutes: best guess, mark it, move on. Return in the last 3 minutes.'}},
 {ill:'prob',t:{ar:'لا تترك فراغًا',en:'Never leave a blank'},d:{ar:'حسب المعروف لا يُخصم على الإجابة الخاطئة؛ الفراغ صفر مؤكد والتخمين فرصة.',en:'As far as is known there is no penalty for wrong answers; a blank is a sure zero, a guess is a chance.'}},
 {ill:'exponent',t:{ar:'حساب ذهني سريع',en:'Mental math shortcuts'},d:{ar:'× ٥ = × ١٠ ÷ ٢ — × ٢٥ = × ١٠٠ ÷ ٤ — × ١١ لعدد من رقمين: ضع مجموع رقميه في الوسط (٣٦ × ١١ = ٣٩٦).',en:'× 5 = × 10 ÷ 2 — × 25 = × 100 ÷ 4 — × 11 for two digits: put their sum in the middle (36 × 11 = 396).'}},
 {ill:'reading',t:{ar:'القراءة النشطة',en:'Active reading'},d:{ar:'في النص: حدد الفكرة في الجملة الأولى، وضع علامة ذهنية عند أدوات الربط (لكن، لذلك) فهي مواضع الأسئلة.',en:'In a passage, catch the idea in the first sentence and mentally flag linking words (however, therefore): questions live there.'}},
 {ill:'mean',t:{ar:'آخر ٣ دقائق',en:'The last 3 minutes'},d:{ar:'راجع المعلَّمة فقط، وتأكد أن لا فراغ. لا تغيّر إجابة إلا بدليل واضح.',en:'Revisit marked questions only and make sure nothing is blank. Change an answer only with clear evidence.'}},
 {ill:'rect',t:{ar:'الأسبوع الأخير',en:'The final week'},d:{ar:'محاكاة كاملة في نفس وقت الاختبار من اليوم، ثم مراجعة الأخطاء فقط. لا مواد جديدة في آخر ٤٨ ساعة.',en:'Full simulations at the same time of day as the test, then review mistakes only. Nothing new in the last 48 hours.'}},
 {ill:'circle',t:{ar:'يوم الاختبار',en:'Test day'},d:{ar:'نوم ٧ ساعات، فطور خفيف، وصول مبكر، هوية. ابدأ بتنفّس ٤ ثوانٍ شهيق و٤ زفير إن شعرت بالتوتر.',en:'7 hours of sleep, a light breakfast, arrive early, bring ID. If nervous, breathe in for 4 seconds and out for 4.'}},
 {ill:'analogy',t:{ar:'لا تتعلق بسؤال',en:'Do not get stuck'},d:{ar:'كل الأسئلة لها الوزن نفسه. سؤال صعب لا يستحق أن يأخذ وقت ثلاثة أسئلة سهلة.',en:'Every question has the same weight. One hard question is not worth the time of three easy ones.'}}
];

const PATTERNS=[
 {sk:'arith',t:{ar:'زيادة ثم نقص بالنسبة نفسها',en:'Up then down by the same percent'},how:{ar:'يرتفع سعر بنسبة ثم ينخفض بالنسبة نفسها، والسؤال عن التغير الكلي.',en:'A price rises by a percent then falls by the same percent; find the net change.'},trick:{ar:'الناتج نقص دائمًا بمقدار (النسبة²÷١٠٠)٪.',en:'The result is always a loss of (p²/100)%.'},ex:{ar:'٢٠٪ ثم ٢٠٪ ← نقص ٤٪',en:'20% then 20% → 4% loss'}},
 {sk:'algebra',t:{ar:'مسائل الأعمار',en:'Age problems'},how:{ar:'عمر الأب أمثال عمر الابن الآن، وبعد (أو قبل) سنوات تتغير النسبة.',en:'A parent is a multiple of a child\'s age now; after (or before) some years the multiple changes.'},trick:{ar:'اكتب معادلة للعمر بعد السنوات، أو جرّب الخيارات مباشرة (أسرع غالبًا).',en:'Write the equation for after the years, or just test the choices (often faster).'},ex:{ar:'٣ أمثال الآن وضعفه بعد ١٠ ← الابن ١٠',en:'3× now, 2× in 10 years → child is 10'}},
 {sk:'arith',t:{ar:'العمال والأيام',en:'Workers and days'},how:{ar:'عدد من العمال ينجز عملًا في أيام، والسؤال عن عدد آخر.',en:'Some workers finish a job in some days; how long for another number?'},trick:{ar:'تناسب عكسي: العمال × الأيام ثابت.',en:'Inverse proportion: workers × days is constant.'},ex:{ar:'١٥ × ٨ = ١٢٠ ← ١٠ عمال: ١٢ يومًا',en:'15 × 8 = 120 → 10 workers: 12 days'}},
 {sk:'geometry',t:{ar:'زاوية الساعة',en:'Clock angle'},how:{ar:'الزاوية بين العقربين في وقت محدد.',en:'The angle between the hands at a given time.'},trick:{ar:'|٣٠ × الساعة − ٥٫٥ × الدقائق| ثم خذ الأصغر من الناتج و٣٦٠ ناقصه.',en:'|30 × hours − 5.5 × minutes|, then take the smaller of it and 360 minus it.'},ex:{ar:'٣:٣٠ ← |٩٠ − ١٦٥| = ٧٥°',en:'3:30 → |90 − 165| = 75°'}},
 {sk:'stats',t:{ar:'العدد المفقود من المتوسط',en:'Missing number from a mean'},how:{ar:'متوسط مجموعة معروف وبعض قيمها معروفة.',en:'The mean is known along with some of the values.'},trick:{ar:'المجموع الكلي = المتوسط × العدد، ثم اطرح المعلوم.',en:'Total = mean × count, then subtract what you know.'},ex:{ar:'متوسط ٤ أعداد ١٤ وثلاثة مجموعها ٣٧ ← ١٩',en:'Mean of 4 is 14, three sum to 37 → 19'}},
 {sk:'comparison',t:{ar:'س² مقابل س',en:'x² vs x'},how:{ar:'مقارنة بين عدد ومربعه بشرط أو بدون شرط.',en:'Comparing a number with its square, with or without a condition.'},trick:{ar:'راجع الشرط: كسر؟ أكبر من ١؟ سالب؟ بلا شرط = غالبًا غير كافية.',en:'Check the condition: fraction? above 1? negative? No condition usually means cannot be determined.'},ex:{ar:'س عدد صحيح ← غير كافية (٠ و ١ و ٢)',en:'x is an integer → cannot be determined (0, 1, 2)'}},
 {sk:'algebra',t:{ar:'متتابعة فروقها تتضاعف',en:'Sequences with doubling gaps'},how:{ar:'الفرق بين الحدود ليس ثابتًا لكنه يتضاعف أو يزيد بانتظام.',en:'The gaps are not constant but double or grow regularly.'},trick:{ar:'اكتب الفروق تحت المتتابعة، ثم فروق الفروق.',en:'Write the gaps below the sequence, then the gaps of the gaps.'},ex:{ar:'٢، ٦، ١٢، ٢٠، ٣٠ ← ٤٢',en:'2, 6, 12, 20, 30 → 42'}},
 {sk:'geometry',t:{ar:'مساحة المربع من محيطه',en:'Square area from perimeter'},how:{ar:'يُعطى المحيط أو القطر ويُطلب المساحة.',en:'The perimeter or diagonal is given; find the area.'},trick:{ar:'الضلع = المحيط ÷ ٤. ومن القطر: المساحة = القطر² ÷ ٢.',en:'Side = perimeter ÷ 4. From a diagonal: area = d² ÷ 2.'},ex:{ar:'قطر ١٠ ← المساحة ٥٠',en:'Diagonal 10 → area 50'}},
 {sk:'arith',t:{ar:'متوسط السرعة ذهابًا وإيابًا',en:'Average speed there and back'},how:{ar:'يذهب بسرعة ويعود بأخرى على المسافة نفسها.',en:'Go at one speed and return at another over the same distance.'},trick:{ar:'ليس متوسط السرعتين! المتوسط = ٢ع₁ع₂ ÷ (ع₁ + ع₂).',en:'Not the average of the speeds! Average = 2ab ÷ (a + b).'},ex:{ar:'٦٠ و ٤٠ ← ٤٨ لا ٥٠',en:'60 and 40 → 48, not 50'}},
 {sk:'stats',t:{ar:'الكرات الملونة',en:'Colored balls'},how:{ar:'صندوق فيه ألوان والسؤال عن احتمال لون.',en:'A box of colors; find the probability of one color.'},trick:{ar:'المطلوب ÷ المجموع. «ليست حمراء» = ١ − احتمال الحمراء.',en:'Favorable ÷ total. "Not red" = 1 − P(red).'},ex:{ar:'٣ حمراء و ٥ زرقاء ← ليست حمراء = ٥/٨',en:'3 red, 5 blue → not red = 5/8'}},
 {sk:'arith',t:{ar:'نسبة الأولاد إلى البنات',en:'Boys to girls ratio'},how:{ar:'نسبة بين مجموعتين والمجموع معروف.',en:'A ratio between two groups with a known total.'},trick:{ar:'المجموع ÷ مجموع أجزاء النسبة = قيمة الجزء.',en:'Total ÷ sum of ratio parts = one part.'},ex:{ar:'٢ : ٣ والمجموع ٣٥ ← البنات ٢١',en:'2 : 3 with 35 total → 21 girls'}},
 {sk:'arith',t:{ar:'أكبر أو أصغر كسر',en:'Largest or smallest fraction'},how:{ar:'قائمة كسور وأعداد عشرية والمطلوب الأكبر.',en:'A list of fractions and decimals; pick the largest.'},trick:{ar:'حوّل إلى عشري بخانتين، أو قارن كل كسر بـ ½.',en:'Convert to two decimal places, or compare each to ½.'},ex:{ar:'⅔ ، ⅝ ، ٠٫٧ ، ١٣/٢٠ ← ٠٫٧',en:'⅔, ⅝, 0.7, 13/20 → 0.7'}},
 {sk:'arith',t:{ar:'رقم الآحاد لقوة كبيرة',en:'Units digit of a big power'},how:{ar:'ما رقم الآحاد في عدد مرفوع لأس كبير؟',en:'What is the units digit of a number raised to a large power?'},trick:{ar:'آحاد القوى تتكرر كل ٤: اقسم الأس على ٤ وخذ الباقي.',en:'Units digits cycle every 4: divide the exponent by 4 and use the remainder.'},ex:{ar:'٧^٢٠ ← الباقي ٠ ← الآحاد ١',en:'7^20 → remainder 0 → units digit 1'}},
 {sk:'algebra',t:{ar:'الأعداد المتتالية',en:'Consecutive numbers'},how:{ar:'مجموع أعداد متتالية معروف والمطلوب أكبرها أو أصغرها.',en:'The sum of consecutive numbers is known; find the largest or smallest.'},trick:{ar:'الأوسط = المجموع ÷ العدد، ثم عُدّ للطرفين.',en:'Middle = sum ÷ count, then count outward.'},ex:{ar:'مجموع ٣ متتالية ٤٥ ← ١٤، ١٥، ١٦',en:'3 consecutive sum to 45 → 14, 15, 16'}},
 {sk:'analogy',t:{ar:'الخيار المعكوس',en:'The reversed choice'},how:{ar:'أحد الخيارات يحمل العلاقة نفسها بترتيب عكسي.',en:'One choice has the same relationship in reverse order.'},trick:{ar:'طبّق جملة العلاقة على كل خيار بالاتجاه نفسه: الكلمة الأولى ثم الثانية.',en:'Read your relationship sentence in the same direction for every choice.'},ex:{ar:'إهمال : فشل ✓ ، نجاح : اجتهاد ✗',en:'negligence : failure ✓, success : effort ✗'}},
 {sk:'completion',t:{ar:'أداة تضاد في أول الجملة',en:'A contrast word at the start'},how:{ar:'جملة تبدأ بـ «رغم» أو «على الرغم من».',en:'A sentence opening with "although" or "despite".'},trick:{ar:'الفراغ يحمل عكس معنى الجزء الثاني.',en:'The blank carries the opposite of the second half.'},ex:{ar:'رغم ... الإمكانات، حقق نتائج مبهرة ← محدودية',en:'Despite ___ resources, great results → limited'}},
 {sk:'context',t:{ar:'الخطأ في أداة الربط',en:'The error is the linking word'},how:{ar:'كل الكلمات منطقية لكن الربط بينها معكوس.',en:'Every word makes sense but the link between clauses is reversed.'},trick:{ar:'اسأل: هل الجزء الثاني نتيجة أم استدراك؟',en:'Ask: is the second part a result or a contrast?'},ex:{ar:'أدرك الحافلة لكنه وصل مبكرًا ← «لكنه»',en:'caught the bus, but arrived early → "but"'}},
 {sk:'odd',t:{ar:'هجري أم ميلادي',en:'Hijri or Gregorian'},how:{ar:'أسماء شهور من التقويمين.',en:'Month names from both calendars.'},trick:{ar:'احفظ الشهور الهجرية الاثني عشر بالترتيب.',en:'Learn the twelve Hijri months in order.'},ex:{ar:'محرم، صفر، رجب، مارس ← مارس',en:'Muharram, Safar, Rajab, March → March'}},
 {sk:'reading',t:{ar:'«ليس من ... المذكورة»',en:'"Which is NOT mentioned"'},how:{ar:'ثلاثة خيارات في النص وخيار واحد خارجه.',en:'Three choices appear in the passage and one does not.'},trick:{ar:'اشطب كل خيار تجده في النص؛ الباقي هو الجواب.',en:'Cross out each choice you find in the passage; the leftover is the answer.'},ex:{ar:'أصناف التمور المذكورة ← البرحي غير مذكور',en:'Date varieties mentioned → Barhi is not'}},
 {sk:'reading',t:{ar:'العنوان المناسب',en:'The best title'},how:{ar:'يُطلب أنسب عنوان للنص.',en:'Pick the best title for the passage.'},trick:{ar:'العنوان الصحيح يغطي أول النص وآخره، لا فقرة واحدة.',en:'The right title covers the beginning and end, not one part.'},ex:{ar:'«الطاقة الشمسية: فرص وتحديات»',en:'"Solar power: opportunities and challenges"'}}
];
/* ============ UI strings ============ */
const T = {
 ar:{
  cloudT:'حسابك', cloudOn:'مسجّل بالبريد', cloudOff:'سجّل ببريدك ليُحفظ تقدمك في حسابك، وتكمل من أي جهاز.', acctManage:'إدارة الحساب', acctJoin:'أنشئ حسابًا أو ادخل', cloudSaving:'جارٍ حفظ تقدمك...', cloudErr:'تعذّر حفظ تقدمك الآن، وسنعيد المحاولة تلقائيًا.', cloudSynced:'آخر حفظ في حسابك:',
  acctTitle:'حسابك', acctJoinT:'احفظ تقدمك في حسابك', acctWhy:'يكفي اسمك وبريدك وكلمة مرور، ليُحفظ تقدمك وتكمل من أي جهاز تدخل منه.', fullName:'اسم الطالب أو الطالبة', phone:'رقم الجوال', namePh:'مثال: سارة أحمد', nameT:'الاسم', nameEdit:'تعديل الاسم', nameSave:'احفظ الاسم', nameSaved:'حُفظ الاسم.', nameMissing:'أضف اسمك ليظهر أعلى الصفحة.', hello:'أهلًا', signUp:'تسجيل جديد', signIn:'دخول', email:'البريد الإلكتروني', password:'كلمة المرور (٨ أحرف على الأقل)', consent:'أوافق على <a href="/terms" target="_blank" rel="noopener">الشروط والأحكام</a> و<a href="/privacy" target="_blank" rel="noopener">سياسة الخصوصية</a>.', withGoogle:'المتابعة بحساب Google', withFacebook:'المتابعة بحساب Facebook', orEmail:'أو بالبريد الإلكتروني', socialNote:'بالمتابعة توافق على <a href="/terms" target="_blank" rel="noopener">الشروط والأحكام</a> و<a href="/privacy" target="_blank" rel="noopener">سياسة الخصوصية</a>.', socialErr:{cancelled:'لم يكتمل الدخول. حاول مرة أخرى.',expired:'انتهت مهلة الدخول. حاول مرة أخرى.','no-email':'لم نتمكن من الحصول على بريدك الإلكتروني من الحساب. سجّل بالبريد مباشرة.',unavailable:'هذه الطريقة غير متاحة حاليًا.',busy:'محاولات كثيرة. انتظر قليلًا ثم حاول.',failed:'تعذّر الدخول بهذه الطريقة الآن. حاول مرة أخرى أو سجّل بالبريد.'}, legalPrivacy:'سياسة الخصوصية', legalTerms:'الشروط والأحكام', needConsent:'يلزم الموافقة على حفظ البيانات لإكمال التسجيل.', withGoogle:'المتابعة بحساب Google', forgot:'نسيت كلمة المرور؟', resetSent:'أرسلنا رابط إعادة التعيين إلى بريدك.', syncNow:'احفظ الآن', chPw:'تغيير كلمة المرور (تُسجّل خروجك من الأجهزة الأخرى)', curPw:'كلمة المرور الحالية', newPw:'كلمة المرور الجديدة (٨ أحرف على الأقل)', chPwBtn:'غيّر كلمة المرور', pwChanged:'تم تغيير كلمة المرور، وسُجّل خروج حسابك من الأجهزة الأخرى.', signOut:'تسجيل الخروج', verifyHint:'أرسلنا إلى بريدك رابط تأكيد. التأكيد اختياري، لكنه يسهّل عليك استعادة حسابك.', delAcct:'حذف حسابي وبياناتي', delConfirm:'سيُحذف حسابك وكل البيانات المحفوظة فيه نهائيًا من خوادمنا، ويُزال تقدمك من هذا الجهاز أيضًا. إن أردت نسخة فاحفظ ملف تقدمك أولًا من صفحة «تقدّمي».', delYes:'نعم، احذف', deleted:'حُذف حسابك وبياناتك.', deletedD:'شكرًا لك. أُزيل حسابك وكل بياناته من خوادمنا ومن هذا الجهاز، ويمكنك إنشاء حساب جديد متى شئت.',
  privT:'ما البيانات التي نحفظها؟', privD:'لا نحفظ إلا اسمك، ورقم جوالك إن أضفته، وبريدك الإلكتروني، ومسارك (علمي أو نظري)، ودرجتك المستهدفة، وموعد اختبارك إن أدخلته، وتقدمك في التدريب. لا نطلب هوية، ويمكنك حذف حسابك وكل بياناتك في أي وقت من هذه النافذة.',
  authErr:{'email-already-in-use':'هذا البريد مسجّل مسبقًا. اختر «دخول».','invalid-email':'البريد الإلكتروني غير صحيح.','invalid-name':'اكتب اسمك (حرفان على الأقل، و٦٠ حرفًا بحد أقصى).','invalid-phone':'اكتب رقم جوال صحيحًا، مثل 05XXXXXXXX (أو مع مفتاح الدولة خارج السعودية).','weak-password':'كلمة المرور قصيرة؛ استخدم ٨ أحرف على الأقل.','invalid-credential':'البريد أو كلمة المرور غير صحيحة.','wrong-password':'البريد أو كلمة المرور غير صحيحة.','user-not-found':'لا يوجد حساب بهذا البريد. اختر «تسجيل جديد».','too-many-requests':'محاولات كثيرة. انتظر قليلًا ثم أعد المحاولة.','network-request-failed':'لا يوجد اتصال بالإنترنت.','requires-recent-login':'لحذف الحساب سجّل الخروج ثم ادخل من جديد وكرر الحذف.','popup-closed-by-user':'أُغلقت نافذة Google قبل الإكمال.','operation-not-allowed':'طريقة الدخول هذه غير متاحة حاليًا.','reset-admin':'لإعادة تعيين كلمة المرور راسلنا على info@gat.academy، وسنرسل إليك كلمة مرور مؤقتة تغيّرها بعد الدخول.',consent:'يلزم الموافقة على الشروط وسياسة الخصوصية لإكمال التسجيل.',unauthenticated:'انتهت الجلسة. ادخل من جديد.',server:'تعذّر الاتصال الآن. حاول بعد قليل.',other:'حدث خطأ غير متوقع. حاول مرة أخرى.'},
  reviewBtn:'مراجعة', reviewOf:'مراجعة اختبار', retake:'أعد الحل', reviewHint:'اضغط أي اختبار مكتمل لتراجع إجاباتك وأخطاءك. يحتفظ هذا الجهاز بتفاصيل آخر ٢٠ اختبارًا، وآخر محاولة لكل نموذج.', noDetail:'تفاصيل هذا الاختبار غير متاحة، فربما أجريته على جهاز آخر أو منذ مدة.',
  restartT:'ابدأ الخطة من جديد', restartD:'تعود الخطة إلى أسبوعها الأول ابتداءً من اليوم، وتُلغى علامات إنجاز المهام. أما مستواك ونتائجك ودفتر أخطائك فتبقى كما هي.', restartBtn:'ابدأ الخطة من جديد', restartConfirm:'ستبدأ الخطة من أسبوعها الأول اليوم. هل تريد المتابعة؟', restartDone:'بدأت خطتك من جديد.',
  resetPick:'اختر ما تريد مسحه:', resetWarn:'لا يمكن التراجع عن المسح، فاحفظ ملف تقدمك أولًا إن أردت نسخة منه.', resetDone:'تم المسح',
  resetParts:{plan:['الخطة ومهامها','تبدأ الخطة من الأسبوع الأول اليوم'],mistakes:['دفتر الأخطاء','الأسئلة المحفوظة للمراجعة وأسباب الأخطاء'],models:['النماذج الكاملة','درجات النماذج الثلاثين، لتعيد حلها من جديد'],cards:['البطاقات والمفردات والشروحات','تعود كل البطاقات غير محفوظة، وتُمسح علامات إنهاء الشروحات'],skills:['المستوى والنتائج','خريطة الإتقان والدرجة التقديرية وسجل المحاولات والنماذج'],all:['كل التقدم','كل ما سبق، ويبقى مسارك وهدفك ولغتك']},
  saveTitle2:'حفظ تقدمك', autoOn:'تقدمك يُحفظ تلقائيًا في حسابك، وتكمل من أي جهاز تدخل منه.', autoGuest:'تقدمك محفوظ على هذا الجهاز الآن. أنشئ حسابك المجاني ليُحفظ تلقائيًا في حسابك ويبقى معك على أي جهاز.', autoGuestBad:'متصفحك لا يسمح بالحفظ على هذا الجهاز، وربما تستخدم التصفح الخاص. أنشئ حسابًا أو ادخل ليُحفظ تقدمك تلقائيًا.', saveFailAcct:'المتصفح لا يسمح بالحفظ، وربما تستخدم التصفح الخاص. أنشئ حسابًا أو ادخل ليُحفظ تقدمك.', loadErrAcct:'تعذّر قراءة تقدمك المحفوظ على هذا الجهاز، فبدأنا بنسخة جديدة. إن كان لديك حساب فسيعود تقدمك منه عند الدخول.', resetWarnAcct:'لا يمكن التراجع عن المسح.', nudgeAcctH:'احفظ تقدمك في حسابك', nudgeAcctP:'تقدمك الآن على هذا الجهاز فقط. بحساب مجاني يُحفظ تلقائيًا ويبقى معك.', saveTitle:'حفظ بياناتك', saveAuto:'حفظ تلقائي على هذا الجهاز', saveAutoD:'كل إجابة ونتيجة تُحفظ فورًا في متصفحك، وتبقى بعد إغلاق الصفحة، لكنها تضيع إن مسحت بيانات المتصفح أو انتقلت إلى جهاز آخر.', savedOk:'محفوظ على هذا الجهاز', saveFail:'المتصفح لا يسمح بالحفظ، وربما تستخدم التصفح الخاص. احفظ ملف تقدمك حتى لا تفقده.', lastSaved:'آخر حفظ:', persistOn:'محمي من المسح التلقائي', saveFile:'نسخة احتياطية في ملف', saveFileD:'احفظ ملفًا صغيرًا على جهازك، واسترجع منه تقدمك متى شئت وعلى أي جهاز.', saveFileBtn:'احفظ ملف التقدم', loadFileBtn:'استرجع من ملف', lastExport:'آخر نسخة:', noExport:'لم تحفظ نسخة بعد.', saveCode:'رمز النقل', fileSaved:'تم حفظ الملف', fileFallback:'تعذّر الحفظ في ملف هنا. انسخ الرمز الظاهر واحتفظ به.', tryAgain:'حاول بعد لحظات', resultSaved:'تم حفظ نتيجتك', nudgeH:'احفظ نسخة من تقدمك', nudgeP:'مضى أسبوع على آخر نسخة احتياطية، وملف صغير يحفظ كل ما أنجزته.',
  themeT:'المظهر', modeT:'الوضع', modes:{light:'فاتح',dark:'داكن',auto:'تلقائي'}, accentT:'اللون', accents:{violet:'بنفسجي',pink:'وردي',blue:'أزرق',orange:'برتقالي',ruby:'عنابي',navy:'كحلي'},
  brand:'أكاديمية القدرات', tagline:'التحضير لاختبار القدرات العامة',
  nav:{today:'اليوم',learn:'تعلّم',practice:'تدرّب',progress:'تقدّمي',guide:'الدليل'},
  switchLang:'English',
  greet:'هدفك ١٠٠', heroLine:'أسئلة القدرات تأتي في عشرة أنماط محددة. أتقن كل نمط بدقة ٩٥٪ في أقل من دقيقة، وعالج أخطاءك أولًا بأول، وستقترب من الـ ١٠٠ خطوة بعد خطوة.',
  daysLeft:'يومًا على اختبارك', setDate:'حدّد موعد اختبارك', readiness:'الجاهزية للـ ١٠٠', estScore:'الدرجة التقديرية',
  sessionTitle:'جلسة اليوم', sessionSub:'٢٥ سؤالًا مختارة لك · نحو ٣٠ دقيقة', startSession:'ابدأ جلسة اليوم', sessionDone:'أنجزت جلسة اليوم، وأي تدريب إضافي اختياري.',
  sessionParts:(d,w,m)=>`مراجعات مستحقة: ${d} · أضعف مهارتين: ${w} · أسئلة متنوعة: ${m}`,
  diagFirst:'ابدأ بالاختبار التشخيصي', diagFirstSub:'٢٠ سؤالًا من كل الأنواع في ١٥ دقيقة، تحدد نقطة بدايتك وتُبنى عليها جلساتك القادمة.',
  masteryTitle:'خريطة الإتقان', masteryHint:'اضغط أي مهارة لتفتح درسها. لكل مهارة أربع درجات تصعدها حتى «ثبات».',
  levels:['لم تبدأ','تعلّم','كفاءة','إتقان','ثبات'],
  levelRule:['','أقل من ٧٠٪','٧٠٪ فأكثر','٨٥٪ فأكثر بزمن مناسب','٩٥٪ فأكثر في آخر ٢٠ سؤالًا وضمن الزمن المستهدف'],
  roadTitle:'معايير الجاهزية للـ ١٠٠', weekTitle:'مهام الأسبوع', fullPlan:'الخطة كاملة', settings:'الإعدادات',
  ready:[ 'كل المهارات العشر في درجة «ثبات»', '٣ محاكاة كاملة متتالية بدرجة تقديرية ٩٥ فأكثر', 'متوسط زمنك ضمن المستهدف في كل مهارة', 'لا مراجعات مستحقة في دفتر الأخطاء' ],
  learnTitle:'تعلّم', kitIntro:'كل ما تحتاجه في مكان واحد. ابدأ بالتأسيس إن كنت تبدأ من الصفر، أو بالدروس إن كان عندك أساس، والباقي مراجع ترجع إليها وقت الحاجة.', tabs:{found:'التأسيس',lessons:'الدروس',cards:'البطاقات',vocab:'المفردات',tech:'التقنيات',patterns:'أنماط التجميعات',resources:'المصادر'},
  deckAll:'كل البطاقات', cardsIntro:'اقرأ وجه البطاقة وحاول أن تتذكر، ثم اقلبها. «راجعها» تعيدها إليك اليوم، و«أعرفها» تؤجلها بضعة أيام.', tapFlip:'اضغط للقلب', example:'مثال', allInDeck:'كل بطاقات القسم', deckDone:'أنهيت بطاقات هذا القسم لليوم. ارجع غدًا أو اختر قسمًا آخر.', techIntro:'تقنيات يعتمد عليها المتفوقون لرفع الدقة والسرعة. طبّق واحدة في كل جلسة حتى تصبح عادة.', patIntro:'أنماط أسئلة تتكرر في التجميعات التي يتداولها الطلاب بعد الاختبار، مع مثال يوضح كل نمط.', how:'كيف يأتي', trick:'مفتاح الحل', practicePattern:'تدرّب على هذا النمط', skillCards:'بطاقات هذه المهارة',
  verbal:'القسم اللفظي', quant:'القسم الكمي',
  concept:'المفهوم', mind:'كيف يفكر واضع السؤال', steps:'خطوات الحل', types:'الأنماط مع أمثلة', rules:'القوانين والحقائق', traps:'الفخاخ', examples:'أمثلة محلولة', speed:'للوصول إلى ١٠٠', more:'للاستزادة', mastery:'مستواك في هذه المهارة', targetTime:'الزمن المستهدف',
  practice10:'تدرّب (١٠ أسئلة بتصحيح فوري)', xpTitle:'شروحات التأسيس', xpIntro:'شروحات قصيرة متحركة بصوت معلّم، تبني الفكرة من الصفر، وتتوقف لتجرّب بنفسك، وتنتهي بتحدٍّ قصير.', xpDone:'تم', xpShort:'شروحات', xpN:'شرح', aboutSite:'عن أكاديمية القدرات', answer:'الإجابة', why:'السبب', lessonsOpen:'افتح الدرس',
  vocabIntro:'مفردات تتكرر في الاختبار. استحضر معناها في ذهنك ثم اقلب البطاقة، وما لا تعرفه منها يعود إليك أكثر.', flip:'اقلب البطاقة', know:'أعرفها', again:'راجعها', vocabDone:'أنهيت بطاقات اليوم', known:'متقنة', left:'متبقية',
  resIntro:'مصادر مختارة لكل مهارة. نصيحتنا: اختر مصدر شرح واحدًا وأكمله، ثم تدرّب هنا حتى تبلغ «ثبات».',
  practiceTitle:'تدرّب', practiceIntro:'اختر نوع التدريب: التصحيح الفوري للتعلّم، والأقسام والمحاكاة بتوقيت الاختبار الحقيقي.',
  pSession:'جلسة اليوم', pSessionD:'مراجعة أخطائك في مواعيدها، وتركيز على أضعف مهارتين، وأسئلة متنوعة.',
  pReview:'المراجعة المستحقة', pReviewD:'أسئلة أخطأت فيها وحان موعد مراجعتها. كل إجابة صحيحة تؤجل السؤال أكثر حتى يُغلق.',
  pDiag:'الاختبار التشخيصي', pDiagD:'سؤالان من كل مهارة · ٢٠ سؤالًا في ١٥ دقيقة.',
  pVerbal:'قسم لفظي', pVerbalD:'٢٤ سؤالًا · ٢٥ دقيقة بتوقيت الاختبار.',
  pQuant:'قسم كمي', pQuantD:'٢٤ سؤالًا · ٢٥ دقيقة بلا آلة حاسبة.',
  pMock:'محاكاة كاملة', pMockD:'٥ أقسام × ٢٤ سؤالًا × ٢٥ دقيقة، بأسئلة جديدة في كل مرة.', rsTitle:'الأقسام المتكررة', rsIntro:'٦٠ قسمًا كميًا بتركيبة القسم كما يأتي في الاختبار المحوسب وبترتيبه: ٤ مسائل، ثم مقارنتان، ثم سؤالا هندسة، ثم سؤالان على جدول، ثم سؤال جبر. الأسئلة أصلية وثابتة لكل قسم، فأعد القسم وقارن درجتك.', rsOne:'قسم', rsDone:'أقسام محلولة', rsFreeNote:'أول قسمين مجانيان.', fdTitle:'مسار التأسيس', fdIntro:'ثلاثة وأربعون درسًا قصيرًا تبني القدرات من الصفر: ثلاثون للكمي بالترتيب (الأعداد، ثم الحساب، ثم الجبر، ثم الهندسة، ثم الإحصاء والمقارنة)، وثلاثة عشر للفظي (التناظر، وإكمال الجمل، والخطأ السياقي، والمفردة الشاذة، واستيعاب المقروء). في كل درس شرح مختصر، وقواعد، وأمثلة محلولة خطوة بخطوة، وفخاخ شائعة، ثم تدريب من ١٠ أسئلة.', fdDoneN:'دروس تدربت عليها', fdFreeNote:'الدروس كلها مفتوحة للقراءة، وتدريبات أول ٥ دروس في الكمي وأول درس في اللفظي مجانية.', fdLesson:'الدرس', fdOf:'من', fdRules:'القواعد', fdEx:'أمثلة محلولة', fdExN:'مثال', fdDrill:'تدرّب على الدرس', fdDrillD:'١٠ أسئلة مع تصحيح فوري وشرح بعد كل سؤال.', fdGo:'ابدأ التدريب', fdBest:'أفضل نتيجة', fdNot:'لم تتدرب بعد', fdCards:'بطاقات الدرس', fdPromoT:'تبدأ من الصفر؟', fdPromoD:'مسار التأسيس: ٤٣ درسًا قصيرًا بالترتيب، ٣٠ للكمي من الكسور إلى الإحصاء و١٣ للفظي من التناظر إلى استيعاب المقروء، ولكل درس تدريب.', fdPromoGo:'افتح مسار التأسيس', fdXpT:'الشرح المسموع', fdXpD:'شرح متحرك بصوت معلّم، ينتهي بسؤال لك وتحدٍّ قصير.', modelsTitle:'النماذج الكاملة', modelsIntro:'٣٠ نموذجًا ثابتًا بصيغة الاختبار (٥ أقسام × ٢٤ سؤالًا × ٢٥ دقيقة)، تتبع توزيع أسئلة الاختبار وأنماطه المتكررة. أعد أي نموذج وقارن درجتك.', model:'نموذج', best:'أفضل', notTaken:'لم يُحل', modelsDone:'نماذج محلولة',
  bySkillTitle:'تدريب حسب المهارة', start:'ابدأ', questions:'سؤالًا', min:'دقيقة', sec:'ث', q:'سؤال', of:'من',
  due:'مستحقة', noDue:'لا مراجعات مستحقة اليوم',
  sectionLabel:'القسم', finishSection:'إنهاء القسم', finishTest:'إنهاء', prev:'السابق', next:'التالي', check:'تحقق', flag:'علّم للمراجعة', flagged:'معلَّم', map:'خريطة الأسئلة',
  confirmEnd:'لن تستطيع العودة إلى هذا القسم.', yesEnd:'نعم، أنهِ القسم', cancel:'تراجع', unanswered:'بلا إجابة',
  quit:'خروج', quitConfirm:'إذا خرجت فلن تُحفظ هذه المحاولة.', yesQuit:'نعم، اخرج',
  correctFb:'إجابة صحيحة', wrongFb:'الإجابة الصحيحة', pace:'الوتيرة', paceOk:'ضمن الوقت', paceSlow:'أبطأ من المستهدف',
  resultTitle:'النتيجة', correct:'صحيحة', wrong:'خاطئة', skipped:'متروكة', avgTime:'متوسط الوقت', estGat:'الدرجة التقديرية',
  bySkill:'حسب المهارة', review:'مراجعة الإجابات', onlyWrong:'الأخطاء فقط', all:'الكل', yourAns:'إجابتك', rightAns:'الصحيحة', explain:'الشرح',
  causeQ:'لماذا أخطأت؟ (يحدد طريقة العلاج)', causes:{concept:'لم أعرف القاعدة',careless:'تسرّعت',time:'ضاق الوقت',trap:'وقعت في فخ'},
  askAI:'اشرح لي بطريقة أخرى', aiThinking:'جارٍ تحضير الشرح...', aiErr:'تعذّر عرض الشرح الآن.', done:'تم', passage:'النص',
  progressTitle:'تقدّمي',
  kEst:'الدرجة التقديرية', kReady:'الجاهزية للـ ١٠٠', kSolved:'أسئلة محلولة', kAcc:'الدقة', kTime:'متوسط الوقت', kStreak:'أيام متتالية',
  skillsTitle:'المهارات: الدقة والزمن', trendTitle:'تطور الدرجة التقديرية', recoTitle:'خطوتك التالية', causesTitle:'أسباب أخطائك', historyTitle:'سجل المحاولات',
  noCauses:'صنّف أخطاءك في شاشة النتيجة لتظهر هنا.', causeFix:{concept:'ارجع إلى درس المهارة وقوانينها، ثم تدرب بالتصحيح الفوري.',careless:'اعتمد روتين «اقرأ المطلوب مرتين» وأعد قراءة الخيار قبل اعتماده.',time:'تدرّب على أقسام مؤقتة، وتجاوز أي سؤال يأخذ أكثر من دقيقتين.',trap:'راجع قسم «الفخاخ» في دروس المهارات التي أخطأت فيها.'},
  gap:'المتبقي للهدف', noHistory:'لا محاولات بعد.', date:'التاريخ', type:'النوع', score:'النتيجة',
  backup:'نقل التقدم إلى جهاز آخر', backupD:'تقدمك محفوظ في هذا المتصفح. انسخ الرمز والصقه في الجهاز الآخر.', copyCode:'انسخ الرمز', importCode:'استيراد', pasteHere:'الصق رمز التقدم هنا', copied:'تم النسخ', imported:'تم الاستيراد', badCode:'الرمز غير صالح.', reset:'مسح التقدم…', resetConfirm:'سيُحذف تقدمك نهائيًا من هذا المتصفح.', yesReset:'نعم، امسح',
  estNote:'التقدير مبني على دقتك في آخر محاولاتك ووزن القسمين في مسارك. الدرجة الرسمية تُحسب بمعادلة غير منشورة، فاعتبر هذا الرقم مؤشرًا يوجّهك.',
  planTitle:'خطتي', planIntro:'خطتك مبنية على موعد اختبارك ومسارك. جلسة اليوم هي الأساس، والمهام الأسبوعية تكمّلها.',
  examDate:'موعد الاختبار', track:'المسار', sci:'علمي', lit:'نظري', targetScore:'الهدف', weeks:'مدة الخطة (أسابيع)', save:'احفظ',
  week:'الأسبوع', thisWeek:'هذا الأسبوع', phaseNames:['تأسيس','إتقان','سرعة','محاكاة'],
  phaseDesc:['تعلّم كل نمط حتى تبلغ «كفاءة» في المهارات العشر.','ارفع كل مهارة إلى «إتقان»، وتدرّب على أقسام مؤقتة.','السرعة والثبات: ٩٥٪ ضمن الزمن المستهدف.','محاكاة كاملة حتى تصبح الـ ١٠٠ مألوفة.'],
  sessionsWeek:(n)=>`أنجز جلسة اليوم ٥ مرات هذا الأسبوع (${n}/٥)`,
  guideTitle:'الدليل', sourcesLine:'مصادر المعلومات', verifyNote:'قد تتغير صيغة الاختبار ورسومه وعدد محاولاته، فراجع موقع هيئة تقويم التعليم والتدريب قبل التسجيل.',
  methodTitle:'كيف تعمل الطريقة', methodIntro:'كل ما في أكاديمية القدرات مبني على مبادئ تعلّم أثبتت أبحاث علم النفس التربوي فعاليتها، ويعتمدها المتفوقون في الاختبارات المعيارية.',
  footer:'أكاديمية القدرات · info@gat.academy',
  none:'لا يوجد', mistakesEmpty:'لا أخطاء مسجلة بعد.', items:'سؤال',
  kinds:{fd:'تأسيس',rs:'قسم متكرر',model:'نموذج',diag:'تشخيصي',verbal:'قسم لفظي',quant:'قسم كمي',mock:'محاكاة كاملة',skill:'مهارة',review:'مراجعة',session:'جلسة اليوم'},
  timeUp:'انتهى الوقت', letters:['أ','ب','ج','د'], back:'رجوع', close:'إغلاق'
 },
 en:{
  cloudT:'Your account', cloudOn:'Signed in as', cloudOff:'Sign up with your email to save your progress to your account and pick up where you left off on any device.', acctManage:'Manage account', acctJoin:'Sign up or sign in', cloudSaving:'Saving your progress...', cloudErr:'Couldn’t save your progress just now. We’ll try again automatically.', cloudSynced:'Last saved to your account:',
  acctTitle:'Your account', acctJoinT:'Save your progress to your account', acctWhy:'All it takes is your name, email and a password. Your progress is saved and goes with you to any device.', fullName:'Student name', phone:'Mobile number', namePh:'e.g. Sara Ahmed', nameT:'Name', nameEdit:'Edit name', nameSave:'Save name', nameSaved:'Name saved.', nameMissing:'Add your name so it shows at the top of the page.', hello:'Hi', signUp:'Sign up', signIn:'Sign in', email:'Email', password:'Password (at least 8 characters)', consent:'I agree to the <a href="/terms?lang=en" target="_blank" rel="noopener">Terms</a> and the <a href="/privacy?lang=en" target="_blank" rel="noopener">Privacy Policy</a>.', withGoogle:'Continue with Google', withFacebook:'Continue with Facebook', orEmail:'or use your email', socialNote:'By continuing you agree to the <a href="/terms?lang=en" target="_blank" rel="noopener">Terms</a> and the <a href="/privacy?lang=en" target="_blank" rel="noopener">Privacy Policy</a>.', socialErr:{cancelled:'Sign-in was not completed. Please try again.',expired:'The sign-in took too long. Please try again.','no-email':'We could not get your email from that account. Sign up with your email instead.',unavailable:'This option is not available right now.',busy:'Too many attempts. Wait a moment and try again.',failed:'That sign-in did not work just now. Try again or use your email.'}, legalPrivacy:'Privacy Policy', legalTerms:'Terms', needConsent:'Please agree to data storage to finish signing up.', withGoogle:'Continue with Google', forgot:'Forgot password?', resetSent:'We sent a reset link to your email.', syncNow:'Save now', chPw:'Change password (signs out your other devices)', curPw:'Current password', newPw:'New password (at least 8 characters)', chPwBtn:'Change password', pwChanged:'Password changed, and your account was signed out on other devices.', signOut:'Sign out', verifyHint:'We sent a confirmation link to your email. Confirming is optional, but it makes recovering your account easier.', delAcct:'Delete my account and data', delConfirm:'Your account and everything saved in it will be permanently deleted from our servers, and your progress is removed from this device too. If you want a copy, save a progress file first from the Progress page.', delYes:'Yes, delete', deleted:'Account and data deleted.', deletedD:'Thank you. Your account and all its data were removed from our servers and from this device. You can create a new account any time.',
  privT:'What data do we keep?', privD:'We keep only your name, mobile number (if you add it), email, track, target score, test date (if you add it) and practice progress. We never ask for an ID, and you can delete your account and all your data at any time from this window.',
  authErr:{'email-already-in-use':'This email is already registered. Choose "Sign in".','invalid-email':'That email address is not valid.','invalid-name':'Enter your name (2 to 60 characters).','invalid-phone':'Enter a valid mobile number, e.g. 05XXXXXXXX (or +country code outside Saudi Arabia).','weak-password':'Password too short; use at least 8 characters.','invalid-credential':'Wrong email or password.','wrong-password':'Wrong email or password.','user-not-found':'No account with this email. Choose "Sign up".','too-many-requests':'Too many attempts. Wait a moment and try again.','network-request-failed':'No internet connection.','requires-recent-login':'To delete your account, sign out, sign in again and repeat.','popup-closed-by-user':'The Google window closed before finishing.','operation-not-allowed':'This sign-in method isn’t available right now.','reset-admin':'To reset your password, email info@gat.academy. We’ll send you a temporary password to change after you sign in.',consent:'Please agree to the Terms and Privacy Policy to finish signing up.',unauthenticated:'Your session ended. Please sign in again.',server:'We couldn’t connect just now. Please try again shortly.',other:'Something went wrong. Please try again.'},
  reviewBtn:'Review', reviewOf:'Review of test', retake:'Retake', reviewHint:'Tap any completed test to review your answers and mistakes. This device keeps the details of your last 20 tests and your latest attempt at each model test.', noDetail:'Details for this test aren’t available. You may have taken it on another device or a while ago.',
  restartT:'Restart the plan', restartD:'Your plan goes back to week 1 starting today, and task checkmarks are cleared. Your level, results and mistake log stay as they are.', restartBtn:'Restart the plan', restartConfirm:'Your plan will restart from week 1 today. Continue?', restartDone:'Your plan has restarted',
  resetPick:'Choose what to erase:', resetWarn:'Erasing cannot be undone. Save a progress file first if you want a copy.', resetDone:'Erased',
  resetParts:{plan:['Plan and tasks','The plan restarts from week 1 today'],mistakes:['Mistake log','Saved review questions and mistake causes'],models:['Full model tests','Scores for all 30 tests, so you can take them again from scratch'],cards:['Cards, vocabulary and explainers','All cards go back to unlearned, and finished explainers are unmarked'],skills:['Level and results','Mastery map, estimated score, attempt history and model tests'],all:['All progress','Everything above; your track, target and language stay']},
  saveTitle2:'Saving your progress', autoOn:'Your progress is saved to your account automatically, and you can carry on from any device you sign in on.', autoGuest:'Your progress is saved on this device for now. Create your free account and it is saved to your account automatically, on any device.', autoGuestBad:'Your browser isn’t allowing saves on this device (you may be in private mode). Create an account or sign in and your progress is saved automatically.', saveFailAcct:'Your browser isn’t allowing saves (you may be in private mode). Create an account or sign in to keep your progress.', loadErrAcct:'We couldn’t read the progress saved on this device, so we started a fresh copy. If you have an account, your progress comes back when you sign in.', resetWarnAcct:'Erasing cannot be undone.', nudgeAcctH:'Save your progress to your account', nudgeAcctP:'Your progress is on this device only for now. With a free account it is saved automatically and stays with you.', saveTitle:'Save your data', saveAuto:'Auto-save on this device', saveAutoD:'Every answer and result is saved to your browser instantly. It stays after you close the page, but it’s lost if you clear your browser data or switch devices.', savedOk:'Saved on this device', saveFail:'Your browser isn’t allowing saves (you may be in private mode). Save a progress file so you don’t lose your work.', lastSaved:'Last saved:', persistOn:'protected from automatic clearing', saveFile:'Backup file', saveFileD:'Save a small file to your device and restore your progress from it anytime, on any device.', saveFileBtn:'Save progress file', loadFileBtn:'Restore from file', lastExport:'Last backup:', noExport:'No backup yet.', saveCode:'Transfer code', fileSaved:'File saved', fileFallback:'File saving isn’t available here. Copy the code shown and keep it somewhere safe.', tryAgain:'Try again in a moment', resultSaved:'Your result is saved', nudgeH:'Back up your progress', nudgeP:'It’s been a week since your last backup. One small file keeps everything you’ve done safe.',
  themeT:'Appearance', modeT:'Mode', modes:{light:'Light',dark:'Dark',auto:'Auto'}, accentT:'Color', accents:{violet:'Violet',pink:'Pink',blue:'Blue',orange:'Orange',ruby:'Ruby',navy:'Navy'},
  brand:'GAT Academy', tagline:'General Aptitude Test prep',
  nav:{today:'Today',learn:'Learn',practice:'Practice',progress:'Progress',guide:'Guide'},
  switchLang:'عربي',
  greet:'Your target: 100', heroLine:'GAT questions come in ten set types. Master each one at 95% accuracy in under a minute, fix your mistakes as you go, and you’ll move closer to 100 step by step.',
  daysLeft:'days to your test', setDate:'Set your test date', readiness:'Readiness for 100', estScore:'Estimated score',
  sessionTitle:'Today\'s session', sessionSub:'25 questions picked for you · about 30 minutes', startSession:'Start today\'s session', sessionDone:'Today\'s session is done. Anything extra is optional.',
  sessionParts:(d,w,m)=>`Due reviews: ${d} · Two weakest skills: ${w} · Mixed: ${m}`,
  diagFirst:'Start with the diagnostic', diagFirstSub:'20 questions across every type in 15 minutes. It sets your starting point and shapes your next sessions.',
  masteryTitle:'Mastery map', masteryHint:'Tap a skill to open its lesson. Each skill has four levels to climb, up to "Locked in".',
  levels:['Not started','Learning','Competent','Mastered','Locked in'],
  levelRule:['','below 70%','70% or more','85%+ at a good pace','95%+ over the last 20 questions within target time'],
  roadTitle:'Readiness criteria for 100', weekTitle:'This week', fullPlan:'Full plan', settings:'Settings',
  ready:['All ten skills at "Locked in"','3 full simulations in a row estimated at 95+','Average time within target for every skill','No reviews due in your mistake log'],
  learnTitle:'Learn', kitIntro:'Everything in one place. Start with the foundation if you are starting from zero, or with the lessons if you have a base; the rest is reference to come back to when you need it.', tabs:{found:'Foundation',lessons:'Lessons',cards:'Cards',vocab:'Vocabulary',tech:'Techniques',patterns:'Compilation patterns',resources:'Resources'},
  deckAll:'All cards', cardsIntro:'Read the front and try to recall the answer, then flip. "Review again" brings the card back today; "I know it" sets it aside for a few days.', tapFlip:'Tap to flip', example:'Example', allInDeck:'All cards in this deck', deckDone:'You have finished this deck for today. Come back tomorrow or pick another deck.', techIntro:'Techniques top scorers rely on for accuracy and speed. Use one each session until it becomes a habit.', patIntro:'Question patterns that keep showing up in the compilations students share after the test, each with an example.', how:'How it appears', trick:'The key', practicePattern:'Practice this pattern', skillCards:'Cards for this skill',
  verbal:'Verbal', quant:'Quantitative',
  concept:'The concept', mind:'How the test writer thinks', steps:'How to solve', types:'Patterns with examples', rules:'Rules and facts', traps:'Traps', examples:'Worked examples', speed:'Getting to 100', more:'Go further', mastery:'Your level in this skill', targetTime:'Target time',
  practice10:'Practice (10 questions, instant feedback)', xpTitle:'Foundation explainers', xpIntro:'Short animated explainers narrated by a teacher. Each one builds the idea from scratch, pauses so you can try it yourself, and ends with a quick challenge.', xpDone:'Done', xpShort:'explainers', xpN:'Explainer', aboutSite:'About GAT Academy', answer:'Answer', why:'Why', lessonsOpen:'Open lesson',
  vocabIntro:'Words that come up again and again in the test. Think of the meaning, then flip. Cards you miss come back more often.', flip:'Flip card', know:'I know it', again:'Review again', vocabDone:'Today\'s cards are done', known:'known', left:'left',
  resIntro:'Hand-picked resources for each skill. Our advice: pick one source of explanation and finish it, then practice here until you reach "Locked in".',
  practiceTitle:'Practice', practiceIntro:'Choose how to practice. Instant feedback is for learning; sections and simulations run on real test timing.',
  pSession:'Today\'s session', pSessionD:'Your mistakes on a review schedule, your two weakest skills, and a mix of questions.',
  pReview:'Due reviews', pReviewD:'Questions you missed that are due today. Each correct answer pushes a question further out until it’s closed.',
  pDiag:'Diagnostic test', pDiagD:'Two questions from each skill · 20 questions in 15 minutes.',
  pVerbal:'Verbal section', pVerbalD:'24 questions · 25 minutes, on test timing.',
  pQuant:'Quant section', pQuantD:'24 questions · 25 minutes, no calculator.',
  pMock:'Full simulation', pMockD:'5 sections × 24 questions × 25 minutes, with new questions every time.', rsTitle:'Recurring sections', rsIntro:'60 quantitative sections built like a section of the computer-based test, in its order: 4 word problems, 2 comparisons, 2 geometry items, 2 questions on a table, then 1 algebra item. The questions are original and fixed for each section, so you can retake one and compare.', rsOne:'Section', rsDone:'sections done', rsFreeNote:'The first two sections are free.', fdTitle:'Foundation track', fdIntro:'Forty-three short lessons that build the test from zero: thirty for the quantitative part, in order (numbers, arithmetic, algebra, geometry, then statistics and comparison), and thirteen for the verbal part (analogy, sentence completion, contextual error, odd word out and reading comprehension). Each lesson has a short explanation, the rules, step-by-step worked examples and common traps, then a 10-question drill.', fdDoneN:'lessons practiced', fdFreeNote:'Every lesson is open to read, and the drills for the first 5 quantitative lessons and the first verbal lesson are free.', fdLesson:'Lesson', fdOf:'of', fdRules:'Rules', fdEx:'Worked examples', fdExN:'Example', fdDrill:'Practice this lesson', fdDrillD:'10 questions with instant feedback and an explanation after each one.', fdGo:'Start practice', fdBest:'Best score', fdNot:'Not practiced yet', fdCards:'Cards for this lesson', fdPromoT:'Starting from zero?', fdPromoD:'The foundation track: 43 short lessons in order, 30 quantitative from fractions to statistics and 13 verbal from analogies to reading, each with its own drill.', fdPromoGo:'Open the foundation track', fdXpT:'Narrated explainer', fdXpD:'An animated explainer with a teacher\'s voice, ending with a question for you and a short challenge.', modelsTitle:'Full model tests', modelsIntro:'30 fixed tests in the test format (5 sections × 24 questions × 25 minutes) that follow the test’s question mix and recurring patterns. Retake any test and compare your scores.', model:'Test', best:'best', notTaken:'not taken', modelsDone:'tests completed',
  bySkillTitle:'Practice by skill', start:'Start', questions:'questions', min:'min', sec:'s', q:'Question', of:'of',
  due:'due', noDue:'No reviews due today',
  sectionLabel:'Section', finishSection:'End section', finishTest:'Finish', prev:'Previous', next:'Next', check:'Check', flag:'Mark for review', flagged:'Marked', map:'Question map',
  confirmEnd:'You cannot return to this section.', yesEnd:'Yes, end section', cancel:'Go back', unanswered:'unanswered',
  quit:'Exit', quitConfirm:'If you exit, this attempt won’t be saved.', yesQuit:'Yes, exit',
  correctFb:'Correct', wrongFb:'Correct answer', pace:'Pace', paceOk:'on time', paceSlow:'slower than target',
  resultTitle:'Result', correct:'correct', wrong:'wrong', skipped:'skipped', avgTime:'Average time', estGat:'Estimated score',
  bySkill:'By skill', review:'Review answers', onlyWrong:'Mistakes only', all:'All', yourAns:'Your answer', rightAns:'Correct', explain:'Explanation',
  causeQ:'Why did you miss it? (This sets your fix.)', causes:{concept:'Didn\'t know the rule',careless:'Rushed',time:'Ran out of time',trap:'Fell for a trap'},
  askAI:'Explain it another way', aiThinking:'Preparing an explanation...', aiErr:'Couldn’t load an explanation right now.', done:'Done', passage:'Passage',
  progressTitle:'Progress',
  kEst:'Estimated score', kReady:'Readiness for 100', kSolved:'Questions solved', kAcc:'Accuracy', kTime:'Average time', kStreak:'Day streak',
  skillsTitle:'Skills: accuracy and time', trendTitle:'Estimated score over time', recoTitle:'Your next step', causesTitle:'Why you miss questions', historyTitle:'Attempt history',
  noCauses:'Tag your mistakes on the result screen to see them here.', causeFix:{concept:'Go back to the skill lesson and rules, then practice with instant feedback.',careless:'Use a "read the question twice" routine and reread your choice before confirming.',time:'Practice timed sections, and skip any question that takes more than two minutes.',trap:'Review the "Traps" part of the lessons for the skills you missed.'},
  gap:'To target', noHistory:'No attempts yet.', date:'Date', type:'Type', score:'Score',
  backup:'Move progress to another device', backupD:'Your progress is saved in this browser. Copy the code and paste it on the other device.', copyCode:'Copy code', importCode:'Import', pasteHere:'Paste a progress code here', copied:'Copied', imported:'Imported', badCode:'That code is not valid.', reset:'Erase progress…', resetConfirm:'Your progress will be deleted permanently from this browser.', yesReset:'Yes, erase',
  estNote:'The estimate is based on your recent accuracy and the section weights for your track. The official score uses an unpublished formula, so treat this number as a guide.',
  planTitle:'My plan', planIntro:'Built around your test date and track. Today\'s session is the core, and the weekly tasks build on it.',
  examDate:'Test date', track:'Track', sci:'Science', lit:'Theoretical', targetScore:'Target', weeks:'Plan length (weeks)', save:'Save',
  week:'Week', thisWeek:'This week', phaseNames:['Foundation','Mastery','Speed','Simulation'],
  phaseDesc:['Learn every type and reach "Competent" in all ten skills.','Raise every skill to "Mastered" and add timed sections.','Speed and consistency: 95% within target time.','Full simulations until 100 feels familiar.'],
  sessionsWeek:(n)=>`Complete the daily session 5 times this week (${n}/5)`,
  guideTitle:'Guide', sourcesLine:'Sources', verifyNote:'The format, fees and number of attempts can change, so check the Education & Training Evaluation Commission website before you register.',
  methodTitle:'How the method works', methodIntro:'Everything in GAT Academy is built on learning principles backed by educational psychology research and used by top scorers on standardized tests.',
  footer:'GAT Academy · info@gat.academy',
  none:'None', mistakesEmpty:'No mistakes logged yet.', items:'questions',
  kinds:{fd:'Foundation',rs:'Recurring section',model:'Model test',diag:'Diagnostic',verbal:'Verbal section',quant:'Quant section',mock:'Full simulation',skill:'Skill',review:'Review',session:'Session'},
  timeUp:'Time is up', letters:['A','B','C','D'], back:'Back', close:'Close'
 }
};

const METHOD = {
 ar:[
  ['الاسترجاع بدل إعادة القراءة','حلّ الأسئلة يثبّت المعلومة أكثر من قراءتها مرات. لذلك ينتهي كل درس بتدريب، والتدريب هو قلب أكاديمية القدرات.','كل درس → ١٠ أسئلة بتصحيح فوري'],
  ['التكرار المتباعد','المراجعة على فترات متزايدة (يوم، ٣، ٧، ١٤، ٣٠) تمنع النسيان بأقل جهد.','أخطاؤك تعود إليك في مواعيد محسوبة حتى تُغلق'],
  ['الإتقان قبل الانتقال','لا تنتقل للمستوى التالي قبل أن تثبت الحالي. الدرجة الكاملة تأتي من إتقان كل نمط، لا من تغطية سطحية للجميع.','خريطة الإتقان: ٤ درجات لكل مهارة'],
  ['التدريب المختلط','خلط الأنواع في جلسة واحدة يدرّبك على تمييز نوع السؤال بسرعة، وهي المهارة التي يحتاجها الاختبار.','جلسة اليوم تخلط المهارات'],
  ['التدريب المتعمد وتحليل الخطأ','كل خطأ له سبب: قاعدة، تسرع، وقت، أو فخ. العلاج يختلف باختلاف السبب.','صنّف أخطاءك فتظهر لك خطة العلاج'],
  ['التغذية الراجعة الفورية','تعرف الصواب والسبب فور الإجابة في مرحلة التعلم، فلا يترسخ الخطأ.','وضع التعلم يصحح بعد كل سؤال'],
  ['المحاكاة المطابقة','الأداء يتحسن حين تشبه ظروف التدريب ظروف الاختبار: التوقيت، الأقسام المقفلة، الواجهة.','محاكاة بصيغة الاختبار ٥ × ٢٤ × ٢٥'],
  ['الآلية والسرعة','حين تصبح القواعد تلقائية يتحرر ذهنك للتفكير. الهدف دقة ٩٥٪ ضمن زمن مستهدف لكل مهارة.','زمن مستهدف لكل مهارة في لوحة التقدم'],
  ['النوم والانتظام','الذاكرة تُثبَّت أثناء النوم، والجلسات القصيرة اليومية أنفع من المذاكرة المكثفة المتقطعة.','جلسة يومية ٣٠ دقيقة وسلسلة أيام متتالية']
 ],
 en:[
  ['Retrieval over rereading','Answering questions locks in knowledge far better than rereading. That is why every lesson ends in practice, and practice is at the heart of GAT Academy.','Every lesson → 10 instant-feedback questions'],
  ['Spaced repetition','Reviewing at growing intervals (1, 3, 7, 14, 30 days) prevents forgetting with the least effort.','Your mistakes return on a schedule until they close'],
  ['Mastery before moving on','Do not move up before the current level is secure. A perfect score comes from mastering every type, not skimming all of them.','Mastery map: 4 levels per skill'],
  ['Interleaved practice','Mixing types in one session trains you to recognize a question type fast, which is exactly what the test demands.','Today\'s session mixes skills'],
  ['Deliberate practice and error analysis','Every mistake has a cause: a rule, rushing, time, or a trap. The fix depends on the cause.','Tag your mistakes to get the matching fix'],
  ['Immediate feedback','In the learning phase you see the right answer and why immediately, so errors do not set in.','Learning mode corrects after each question'],
  ['Test-like simulation','Performance improves when practice conditions match test conditions: timing, locked sections, interface.','Test-format simulation 5 × 24 × 25'],
  ['Automaticity and speed','When rules become automatic, your mind is free to think. Target: 95% accuracy within a target time for each skill.','Target time per skill on the Progress page'],
  ['Sleep and consistency','Memory consolidates during sleep, and short daily sessions beat irregular cramming.','A 30-minute daily session and a day streak']
 ]
};

const RESOURCES = [
 {cat:{ar:'رسمي',en:'Official'},items:[
  {k:'official',t:{ar:'هيئة تقويم التعليم والتدريب',en:'Education & Training Evaluation Commission'},d:{ar:'التسجيل والمواعيد والرسوم والأدلة الإرشادية الرسمية مع نماذج أسئلة.',en:'Registration, dates, fees, official guides and sample questions.'},u:'https://etec.gov.sa'},
  {k:'official',t:{ar:'صفحة اختبار القدرات العامة',en:'General Aptitude Test page'},d:{ar:'وصف الاختبار وجدوله والتسجيل فيه من المصدر الرسمي.',en:'Official test description, schedule and registration.'},u:'https://etec.gov.sa/en/eservices-catalogue/individual/p-7d1870ff-a881-4e9a-9f9d-8f2a2c4df032'},
  {k:'official',t:{ar:'الدليل الإرشادي لاختبار القدرات العامة',en:'Official GAT candidate guide (Arabic PDF)'},d:{ar:'مكونات الاختبار ونسب أنواع الأسئلة وأمثلة محلولة وتعليمات يوم الاختبار.',en:'Test components, question-type weights, worked examples and test-day rules.'},u:'https://media.etec.gov.sa/media/1izihxlo/%D8%A7%D9%84%D8%AF%D9%84%D9%8A%D9%84-%D8%A7%D9%84%D8%A7-%D8%B1%D8%B4%D8%A7%D8%AF%D9%8A-%D9%84%D8%A7%D8%AE%D8%AA%D8%A8%D8%A7%D8%B1-%D8%A7%D9%84%D9%82%D8%AF%D8%B1%D8%A7%D8%AA-%D8%A7%D9%84%D8%B9%D8%A7%D9%85%D8%A9.pdf'}]},
 {cat:{ar:'شرح مرئي (بحث يوتيوب مجهز)',en:'Video lessons (ready YouTube searches)'},items:[
  {k:'video',t:{ar:'تأسيس الكمي من الصفر',en:'Quant foundations from zero'},d:{ar:'قوائم تشغيل كاملة لشرح الحساب والجبر والهندسة. اختر مدرسًا واحدًا وأكمل قائمته.',en:'Full playlists for arithmetic, algebra and geometry. Pick one teacher and finish the playlist.'},yt:{ar:'تأسيس قدرات كمي كامل',en:'GAT quantitative full course'}},
  {k:'video',t:{ar:'استراتيجيات اللفظي',en:'Verbal strategies'},d:{ar:'التناظر واستيعاب المقروء والخطأ السياقي بطرق الحل السريعة.',en:'Analogies, reading and contextual error with fast methods.'},yt:{ar:'شرح قدرات لفظي كامل',en:'GAT verbal full course'}},
  {k:'video',t:{ar:'حل نماذج محوسب',en:'Solving computer-based models'},d:{ar:'مشاهدة حل نماذج كاملة بالتوقيت لتتعلم إدارة الوقت.',en:'Watch full timed model solutions to learn time management.'},yt:{ar:'حل نموذج قدرات محوسب كامل',en:'GAT computer-based full practice test solution'}},
  {k:'video',t:{ar:'English GAT',en:'English GAT'},d:{ar:'لمن يختبر النسخة الإنجليزية.',en:'For students sitting the English version.'},yt:{ar:'English GAT Qiyas',en:'English GAT Qiyas verbal quantitative'}}]},
 {cat:{ar:'تأسيس ومراجع',en:'Foundations and references'},items:[
  {k:'link',t:{ar:'Khan Academy: الحساب',en:'Khan Academy: Arithmetic'},d:{ar:'تمارين مجانية متدرجة للكسور والنسب والعمليات.',en:'Free graded practice for fractions, ratios and operations.'},u:'https://www.khanacademy.org/math/arithmetic'},
  {k:'link',t:{ar:'Khan Academy: الجبر',en:'Khan Academy: Algebra'},d:{ar:'المعادلات والأسس والجذور.',en:'Equations, exponents and roots.'},u:'https://www.khanacademy.org/math/algebra'},
  {k:'link',t:{ar:'Khan Academy: الهندسة',en:'Khan Academy: Geometry'},d:{ar:'الزوايا والمثلثات والمساحات.',en:'Angles, triangles and areas.'},u:'https://www.khanacademy.org/math/geometry'},
  {k:'link',t:{ar:'Khan Academy: الإحصاء والاحتمالات',en:'Khan Academy: Statistics & Probability'},d:{ar:'المتوسطات والاحتمالات وقراءة البيانات.',en:'Averages, probability and reading data.'},u:'https://www.khanacademy.org/math/statistics-probability'},
  {k:'link',t:{ar:'معجم المعاني',en:'Almaany dictionary'},d:{ar:'لمعرفة معنى أي كلمة غامضة تقابلك في اللفظي.',en:'Look up any unfamiliar Arabic word.'},u:'https://www.almaany.com'},
  {k:'link',t:{ar:'Vocabulary.com',en:'Vocabulary.com'},d:{ar:'لبناء المفردات الإنجليزية لمن يختبر بالإنجليزية.',en:'Build English vocabulary for the English GAT.'},u:'https://www.vocabulary.com'}]},
 {cat:{ar:'كتب وتجميعات',en:'Books and practice sets'},items:[
  {k:'book',t:{ar:'كتاب تأسيس واحد (مثل «المعاصر»)',en:'One foundation book (e.g. "Al-Mu\'aser")'},d:{ar:'اختر كتابًا بشرح مبسط وتمارين متدرجة وحلول مفصلة، وأنهه كاملًا.',en:'Choose one with simple explanations, graded exercises and full solutions, and finish it.'}},
  {k:'book',t:{ar:'التجميعات الحديثة',en:'Recent compilations'},d:{ar:'أسئلة يتذكرها الطلاب بعد الاختبار. مفيدة في مرحلة السرعة، لكنها غير رسمية وقد تحتوي أخطاء؛ عند الشك ارجع للقاعدة.',en:'Questions students recall after the test. Useful in the speed phase, but unofficial and sometimes wrong; when in doubt, trust the rule.'}}]}
];
const yt = q=>'https://www.youtube.com/results?search_query='+encodeURIComponent(q);

/* ============ plans: free / pro, upgrade, diagnostic, trial report ============ */
Object.assign(T.ar,{
  proChip:'Pro', lockT:'للمشتركين', unlock:'افتح بالاشتراك', upgradeBtn:'اعرض الباقات', seePlans:'الباقات', later:'ليس الآن', dismiss:'إخفاء', loading:'جارٍ التحميل...', skill:'المهارة', minShort:'د',
  xpMin:n=>`${n} دقائق`,
  ben:{test:'أقسام مؤقتة ومحاكاة كاملة بصيغة الاختبار: ٥ أقسام، في كل قسم ٢٤ سؤالًا و٢٥ دقيقة.', models:'٣٠ نموذجًا كاملًا، ولكل نموذج مراجعة سؤالًا بسؤال.', skill:'تدريب موجّه على المهارة أو النمط الذي تختاره.', review:'راجع أي محاولة سابقة سؤالًا بسؤال.', analytics:'درجتك التقديرية وتحليل زمنك في كل مهارة.', est:'تطوّر درجتك التقديرية عبر الوقت.', detail:'تحليل تفصيلي للمهارات العشر كلها: الدقة والزمن.', causes:'تحليل أسباب أخطائك: قاعدة، تسرّع، وقت، فخ.', srs:'تكرار متباعد ذكي للأخطاء والبطاقات.', tech:'كل التقنيات والأنماط.', custom:'خصّص خطتك بموعد اختبارك ودرجتك المستهدفة.', plan:'الخطة كاملة حتى يوم اختبارك.', cards:'كل البطاقات والمفردات مع تكرار متباعد ذكي.', xp:'كل الشروحات المتحركة المسموعة.', daily:'تدريب يومي بلا حد.', mistakes:'صندوق أخطاء بلا حد، ومراجعة في مواعيد محسوبة.', diag:'أعد الاختبار التشخيصي متى شئت.'},
  moreTech:n=>`${n} من التقنيات الأخرى مع الاشتراك`, morePat:n=>`${n} من الأنماط الأخرى مع الاشتراك`, moreCards:n=>`${n} من البطاقات الأخرى مع الاشتراك، ومعها تكرار متباعد ذكي`, moreWords:n=>`${n} من الكلمات الأخرى مع الاشتراك`,
  dailyLeft:(n,m)=>`بقي لك اليوم ${n} من أسئلتك المجانية الـ ${m}`, dailyOut:'أنهيت أسئلتك المجانية لهذا اليوم، وتتجدد غدًا.', mistCap:n=>`تحفظ الخطة المجانية آخر ${n} من أخطائك.`,
  detail2:'تفصيل أضعف مهارتين',
  diagDone:'أنجزته. الخطة المجانية تتيحه مرة واحدة.', diagNudge:'لم تُجرِ الاختبار التشخيصي بعد، و١٥ دقيقة تكفي لتعرف مستواك في المهارات العشر.',
  diagInviteE:'أهلًا بك!', diagInviteT:'ابدأ بالاختبار التشخيصي المجاني', diagInviteD:'٢٠ سؤالًا في ١٥ دقيقة، سؤالان من كل مهارة. تعرف بعدها مستواك في المهارات العشر، ونقترح عليك من أين تبدأ.',
  diagLvT:'مستواك في المهارات العشر', diagLvD:'من سؤالين في كل مهارة: نقطة بداية، لا حكم نهائي.', diagLv:['يحتاج تأسيسًا','في الطريق','جيد'],
  diagNextT:'ابدأ من هنا', diagNextD:s=>`أضعف مهاراتك الآن: ${s}. هذا الشرح المجاني يبنيها خطوة بخطوة في دقائق.`, openXp:'شاهد الشرح',
  upTitle:'اشترك في أكاديمية القدرات', upIntro:'الخطة المجانية تبقى لك دائمًا، والاشتراك يفتح لك كل شيء حتى يوم اختبارك.', plansLoading:'جارٍ تحميل الباقات...',
  bestValue:'الأوفر', perDays:n=>`${n} يومًا`, perMonth:(n,c)=>`${n} ${c} شهريًا`,
  incT:'ماذا يشمل كل خيار؟', colFree:'مجاني', colPro:'Pro', seeAll:'قارن الخيارات بالتفصيل',
  cmpRows:v=>[['الاختبار التشخيصي (٢٠ سؤالًا)','مرة واحدة','متى شئت'],['الشروحات المتحركة المسموعة',`${v.xp} من ${v.xpAll}`,`كلها (${v.xpAll})`],['أسئلة التدريب',`${v.daily} يوميًا`,'بلا حد'],['البطاقات والمفردات','مختارات من كل مهارة','كلها'],['الخطة الدراسية',v.weeksN===2?'أول أسبوعين':v.weeksN===1?'الأسبوع الأول':`أول ${v.weeks} أسابيع`,'حتى يوم الاختبار'],['صندوق الأخطاء',`آخر ${v.mist} من أخطائك`,'بلا حد'],['التقنيات والأنماط','مختارات','كلها'],['التحليلات','خريطة الإتقان وتحليل مهارتين','كل المهارات'],['٣٠ نموذجًا والأقسام والمحاكاة الكاملة',false,true],['مراجعة أي محاولة سابقة',false,true],['الدرجة التقديرية وتحليل الزمن',false,true],['التكرار المتباعد الذكي',false,true],['تحليل أسباب الأخطاء',false,true],['تدريب موجّه على مهارة أو نمط',false,true],['تخصيص الخطة بموعد الاختبار والهدف',false,true]],
  couponL:'لديك رمز خصم؟', couponPh:'رمز الخصم', applyBtn:'تطبيق', couponOk:p=>`خصم ${p}٪`, couponBad:'رمز الخصم غير صالح لهذه الباقة.', couponSignup:'سجّل حسابك أولًا لتطبيق الرمز.',
  buyStore:'اشترِ الآن', storeNote:'تدفع في متجرنا الآمن على زد (مدى، Apple Pay والبطاقات)، ويصلك رابط التفعيل فورًا بالبريد والجوال. افتحه فيُفعَّل اشتراكك.', haveCode:'اشتريت من المتجر؟', haveCodeA:'فعّل اشتراكك برمز التفعيل', storeNewTab:'يُفتح المتجر في نافذة جديدة',
  total:'الإجمالي', free100:'مجانًا بالرمز', payBtn:'ادفع وابدأ الآن', payBusy:'جارٍ التحويل...', activateBtn:'فعّل اشتراكي الآن', signupToBuy:'سجّل حسابك المجاني للمتابعة',
  payNote:p=>p?`مدى، Apple Pay، STC Pay والبطاقات. دفع آمن عبر ${p}.`:'مدى، Apple Pay، STC Pay والبطاقات. دفع آمن.', payOff:'الدفع الإلكتروني غير متاح مؤقتًا', payOffD:'الدفع الإلكتروني غير متاح الآن. إن كان لديك رمز اشتراك فأدخله في خانة رمز الخصم ليُفعَّل اشتراكك فورًا.',
  refund:d=>`لم يناسبك الاشتراك؟ نعيد إليك المبلغ كاملًا إن طلبت ذلك خلال ${d} أيام. راسلنا على info@gat.academy`,
  paidT:'تم تفعيل اشتراكك', paidD:'فُتح كل شيء. بالتوفيق في اختبارك!', paidWait:'نتحقق من الدفع الآن، وتُفتح لك المزايا خلال لحظات.', failedT:'لم تكتمل عملية الدفع', failedD:'يمكنك المحاولة مجددًا أو اختيار وسيلة دفع أخرى. إن خُصم المبلغ ولم يُفعَّل اشتراكك فراسلنا وسنحل الأمر.',
  /* UX strings: password field, purchase steps, activation page */
  passwordIn:'كلمة المرور', pwShow:'إظهار كلمة المرور', pwHide:'إخفاء كلمة المرور',
  buyStepsT:'كيف يتم الاشتراك؟', buySteps:['ادفع في متجرنا الآمن على زد (مدى، Apple Pay والبطاقات).','يصلك رابط التفعيل ورمزه فورًا بالبريد والجوال.','افتح الرابط أو أدخل الرمز هنا فيُفعَّل اشتراكك.'],
  rdWhere:'تجد الرمز في رسالة التفعيل التي وصلتك بالبريد والجوال بعد الشراء.', rdNoCode:'ليس لديك رمز بعد؟', rdEmpty:'اكتب رمز التفعيل أولًا.',
  rdT:'فعّل اشتراكك', rdIntro:'أدخل رمز التفعيل الذي وصلك بعد الشراء من متجرنا.', rdPh:'GAT-XXXX-XXXX', rdGo:'تحقق من الرمز', rdChecking:'نتحقق من الرمز...',
  rdValidT:'رمزك صالح', rdValidD:(p,d)=>`يفتح لك ${p} كاملة لمدة ${d} يومًا.`, rdNeedAcct:'أنشئ حسابك المجاني ليُفعَّل الاشتراك عليه مباشرة، فتستخدمه من أي جهاز.',
  rdSignup:'أنشئ حسابي وفعّل الاشتراك', rdSignin:'لدي حساب، سجّل دخولي', rdBusy:'جارٍ تفعيل اشتراكك...',
  rdDoneT:'تم تفعيل اشتراكك', rdDoneD:(p,d)=>`فُتحت لك ${p}، واشتراكك فعّال حتى ${d}.`, rdMineD:d=>`هذا الرمز مفعّل على حسابك، واشتراكك فعّال حتى ${d}.`, rdStart:'ابدأ المذاكرة الآن',
  rdGateT:'خطوة أخيرة لتفعيل اشتراكك', rdGateD:'أنشئ حسابك المجاني (أو سجّل دخولك) وسيُفعَّل الاشتراك عليه فورًا.',
  rdErr:{'bad-code':'لم نجد هذا الرمز. تأكد من كتابته كما وصلك بالضبط.','code-used':'هذا الرمز استُخدم على حساب آخر. إن كنت اشتريته ولم تستخدمه فراسلنا وسنحل الأمر.','code-expired':'انتهت صلاحية هذا الرمز. راسلنا وسنساعدك.','code-disabled':'هذا الرمز موقوف. راسلنا وسنساعدك.','too-many-requests':'محاولات كثيرة. انتظر دقائق ثم حاول مجددًا.'},
  rdHelp:'تحتاج مساعدة؟ راسلنا على info@gat.academy أو <a class="mail-link" href="https://wa.me/966533522513" target="_blank" rel="noopener">واتساب <bdi dir="ltr">053 352 2513</bdi></a> مع رقم طلبك من المتجر.',
  youArePro:'أنت مشترك', activeUntil:d=>`اشتراكك فعّال حتى ${d}`, proForever:'اشتراكك فعّال.', goToday:'إلى يومي', allOpen:'كل المزايا متاحة لك.',
  signupFirstT:'سجّل أولًا', signupFirst:'أنشئ حسابك المجاني أولًا ثم اختر باقتك، ليرتبط اشتراكك بحسابك وتستخدمه من أي جهاز.',
  errGeneric:'تعذّر إكمال الطلب. حاول مجددًا.', errNet:'تعذّر الاتصال. تحقق من الإنترنت ثم حاول مجددًا.', errAuth:'انتهت جلستك. سجّل الدخول من جديد.',
  ctxStart:'ابدأ بالمجاني، واشترك حين تحتاج المزيد.', ctxDaily:n=>`أنهيت أسئلتك المجانية الـ ${n} لهذا اليوم.`, ctxXp:n=>`أنهيت ${n} من الشروحات.`, ctxAcc:(s,a,b)=>`ارتفعت دقتك في ${s} من ${a}٪ إلى ${b}٪.`, ctxDays:n=>`تدرّبت حتى الآن في ${n} من الأيام.`, ctxMore:n=>`وما زال أمامك ${n} من الشروحات.`,
  nudgeT:'أحسنت!', studyNow:'بطاقة الآن', practiceKinds:'أنواع التدريب', included:'متاح', notIncluded:'غير متاح',
  subT:'اشتراكي', planFree:'مجاني', planFreeD:'الخطة المجانية، بلا مدة.', payHist:'سجل المدفوعات', noPays:'لا مدفوعات بعد.', payStatus:{paid:'مدفوع',failed:'لم يكتمل',refunded:'مسترد',initiated:'قيد الدفع'},
  reportT:'تقرير بدايتك', reportIntro:n=>`هذا يومك الـ ${n} منذ بدأت. إليك رحلتك بالأرقام: من أين بدأت، وأين أنت الآن، وكم بقي لتبلغ هدفك.`, repNotYet:n=>`هذه نظرة مبكرة، والأيام المتبقية حتى يكتمل تقريرك: ${n}.`,
  reportReadyE:'تقريرك جاهز', reportReadyT:'أين كنت، وأين أنت الآن', reportReadyD:'قارن نقطة بدايتك في التشخيصي بمستواك اليوم، وكم بقي إلى هدفك.', reportOpen:'اعرض التقرير',
  repStart:'البداية', repNow:'الآن', repChange:'التغيّر', repXp:'شروحات أنهيتها', repDays:n=>`أيام النشاط: ${n}`, repGap:'المسافة إلى هدفك', repGapD:(e,t)=>`تقديرك ${e} من هدف ${t}`, repGapNone:'تدرّب أكثر ليظهر التقدير',
  repSkills:'مهاراتك: البداية مقابل الآن', repNoDiag:'لم تُجرِ التشخيصي', repNoDiagD:'لا توجد نقطة بداية للمقارنة.', repNext:'خطوتك التالية', repProD:'كل المزايا متاحة لك، فواظب على جلسة اليوم.'
});
Object.assign(T.en,{
  proChip:'Pro', lockT:'Pro', unlock:'Unlock with Pro', upgradeBtn:'See plans', seePlans:'Plans', later:'Not now', dismiss:'Dismiss', loading:'Loading...', skill:'Skill', minShort:'min',
  xpMin:n=>`${n} min`,
  ben:{test:'Timed sections and full mocks in the test format: 5 sections, each with 24 questions in 25 minutes.', models:'30 full model tests, each with question-by-question review.', skill:'Targeted practice on the skill or pattern you choose.', review:'Review any past attempt question by question.', analytics:'Your estimated score and time analysis per skill.', est:'Your estimated score over time.', detail:'Detailed analysis of all ten skills: accuracy and time.', causes:'Mistake-cause analysis: concept, careless, time, trap.', srs:'Smart spaced repetition for mistakes and cards.', tech:'Every technique and pattern.', custom:'Customize your plan with your test date and target score.', plan:'The full plan up to your test day.', cards:'Every flashcard and word, with smart spaced repetition.', xp:'Every animated, narrated explainer.', daily:'Unlimited daily practice.', mistakes:'An unlimited mistake box, with reviews on a smart schedule.', diag:'Retake the diagnostic any time.'},
  moreTech:n=>`${n} more techniques with Pro`, morePat:n=>`${n} more patterns with Pro`, moreCards:n=>`${n} more cards with Pro, with smart spaced repetition`, moreWords:n=>`${n} more words with Pro`,
  dailyLeft:(n,m)=>`${n} of ${m} free questions left today`, dailyOut:'You used today\'s free questions. They refresh tomorrow.', mistCap:n=>`The free plan keeps your last ${n} mistakes.`,
  detail2:'Detail for your two weakest skills',
  diagDone:'Done. The free plan includes it once.', diagNudge:'You haven’t taken the diagnostic yet. In 15 minutes you’ll know your level in all ten skills.',
  diagInviteE:'Welcome!', diagInviteT:'Start with the free diagnostic', diagInviteD:'20 questions in 15 minutes, two per skill. You’ll see your level in all ten skills, and we’ll suggest where to start.',
  diagLvT:'Your level in the ten skills', diagLvD:'From two questions per skill: a starting point, not a verdict.', diagLv:['Needs a foundation','On the way','Strong'],
  diagNextT:'Start here', diagNextD:s=>`Your weakest skill right now: ${s}. This free explainer builds it step by step in a few minutes.`, openXp:'Watch the explainer',
  upTitle:'Go Pro with GAT Academy', upIntro:'The free plan is yours to keep. Pro unlocks everything until your test day.', plansLoading:'Loading plans...',
  bestValue:'Best value', perDays:n=>`${n} days`, perMonth:(n,c)=>`${n} ${c} a month`,
  incT:'What each option includes', colFree:'Free', colPro:'Pro', seeAll:'Compare the options in detail',
  cmpRows:v=>[['Diagnostic test (20 questions)','Once','Any time'],['Animated, narrated explainers',`${v.xp} of ${v.xpAll}`,`All ${v.xpAll}`],['Daily practice',`${v.daily} questions a day`,'Unlimited'],['Flashcards and vocabulary','A selection from every skill','All'],['Study plan',v.weeksN===1?'First week':`First ${v.weeks} weeks`,'Up to test day'],['Mistake box',`Last ${v.mist}`,'Unlimited'],['Techniques and patterns','A selection','All'],['Analytics','Mastery map and 2 skills in detail','All skills'],['30 model tests, sections and full mocks',false,true],['Review any past attempt',false,true],['Estimated score and time analysis',false,true],['Smart spaced repetition',false,true],['Mistake-cause analysis',false,true],['Targeted skill and pattern practice',false,true],['Plan with your test date and target',false,true]],
  couponL:'Have a coupon?', couponPh:'Coupon code', applyBtn:'Apply', couponOk:p=>`${p}% off`, couponBad:'This coupon is not valid for this plan.', couponSignup:'Sign up first to apply a coupon.',
  buyStore:'Buy now', storeNote:'You pay in our secure Zid store (mada, Apple Pay and cards), and the activation link arrives right away by email and SMS. Open it to activate your plan.', haveCode:'Bought from the store?', haveCodeA:'Activate your plan with your code', storeNewTab:'Opens the store in a new tab',
  total:'Total', free100:'Free with this code', payBtn:'Pay and start now', payBusy:'Redirecting...', activateBtn:'Activate my plan now', signupToBuy:'Create your free account to continue',
  payNote:p=>p?`mada, Apple Pay, STC Pay and cards. Secure checkout by ${p}.`:'mada, Apple Pay, STC Pay and cards. Secure checkout.', payOff:'Online payment is temporarily unavailable', payOffD:'Online payment isn’t available right now. If you have a subscription code, enter it in the coupon field to activate your plan right away.',
  refund:d=>`Not the right fit? Ask within ${d} days for a full refund. Email info@gat.academy`,
  paidT:'Your Pro plan is active', paidD:'Everything is open. Good luck on your test!', paidWait:'We’re confirming your payment. Pro will unlock in a moment.', failedT:'The payment didn’t go through', failedD:'You can try again or use another payment method. If you were charged but your plan isn’t active, email us and we’ll sort it out.',
  youArePro:'You are on Pro', activeUntil:d=>`Pro until ${d}`, proForever:'Your plan is active.', goToday:'Go to Today', allOpen:'Everything is unlocked for you.',
  passwordIn:'Password', pwShow:'Show password', pwHide:'Hide password',
  buyStepsT:'How it works', buySteps:['Pay in our secure Zid store (mada, Apple Pay and cards).','Your activation link and code arrive right away by email and SMS.','Open the link, or enter the code here, and your plan is active.'],
  rdWhere:'You’ll find the code in the activation message sent to your email and phone after you buy.', rdNoCode:'Don’t have a code yet?', rdEmpty:'Enter your activation code first.',
  rdT:'Activate your plan', rdIntro:'Enter the activation code you received after buying from our store.', rdPh:'GAT-XXXX-XXXX', rdGo:'Check code', rdChecking:'Checking your code...',
  rdValidT:'Your code is valid', rdValidD:(p,d)=>`It unlocks ${p} in full for ${d} days.`, rdNeedAcct:'Create your free account and the plan is activated on it right away, so it works on any device.',
  rdSignup:'Create my account and activate', rdSignin:'I have an account, sign me in', rdBusy:'Activating your plan...',
  rdDoneT:'Your plan is active', rdDoneD:(p,d)=>`${p} is unlocked, active until ${d}.`, rdMineD:d=>`This code is already active on your account, until ${d}.`, rdStart:'Start studying now',
  rdGateT:'One last step to activate your plan', rdGateD:'Create your free account (or sign in) and the plan is activated on it instantly.',
  rdErr:{'bad-code':'We couldn’t find this code. Type it exactly as you received it.','code-used':'This code was already used on another account. If you bought it and didn’t use it, email us and we’ll sort it out.','code-expired':'This code has expired. Email us and we’ll help.','code-disabled':'This code is disabled. Email us and we’ll help.','too-many-requests':'Too many attempts. Wait a few minutes and try again.'},
  rdHelp:'Need help? Email info@gat.academy or <a class="mail-link" href="https://wa.me/966533522513" target="_blank" rel="noopener">WhatsApp <bdi dir="ltr">+966 53 352 2513</bdi></a> with your store order number.',
  signupFirstT:'Sign up first', signupFirst:'Create your free account first, then choose a plan, so it’s linked to your account and works on any device.',
  errGeneric:'Something went wrong. Please try again.', errNet:'Could not connect. Check your internet and try again.', errAuth:'Your session ended. Please sign in again.',
  ctxStart:'Start free, and go Pro when you’re ready for more.', ctxDaily:n=>`You finished today's ${n} free questions.`, ctxXp:n=>`You finished ${n} explainer${n==='1'?'':'s'}.`, ctxAcc:(s,a,b)=>`Your ${s} accuracy rose from ${a}% to ${b}%.`, ctxDays:n=>`You have practiced on ${n} day${n==='1'?'':'s'}.`, ctxMore:n=>n==='1'?'One more explainer is waiting.':`${n} more explainers are waiting.`,
  nudgeT:'Nice work!', studyNow:'Study now', practiceKinds:'Practice options', included:'Included', notIncluded:'Not included',
  subT:'My subscription', planFree:'Free', planFreeD:'Free plan, no time limit.', payHist:'Payment history', noPays:'No payments yet.', payStatus:{paid:'Paid',failed:'Not completed',refunded:'Refunded',initiated:'Pending'},
  reportT:'Your progress report', reportIntro:n=>`This is day ${n} of your journey. Here’s your journey in numbers: where you began, where you are now, and how far you are from your target.`, repNotYet:n=>`This is an early look. Days until your full report: ${n}.`,
  reportReadyE:'Your report is ready', reportReadyT:'Where you started, where you are now', reportReadyD:'Compare your diagnostic baseline with your level today, and see how far you are from your target.', reportOpen:'Open the report',
  repStart:'Start', repNow:'Now', repChange:'Change', repXp:'Explainers finished', repDays:n=>`${n} active day${n==='1'?'':'s'}`, repGap:'Gap to your target', repGapD:(e,t)=>`Estimate ${e} vs target ${t}`, repGapNone:'Practice more to get an estimate',
  repSkills:'Your skills: start vs now', repNoDiag:'No diagnostic yet', repNoDiagD:'There is no baseline to compare with.', repNext:'Your next step', repProD:'Everything is unlocked for you. Keep up your daily session.'
});

const GUIDE = {
  ar:[
    {id:'what',h:'ما هو اختبار القدرات العامة؟',body:`<p>اختبار معياري يقدمه المركز الوطني للقياس (قياس) التابع لهيئة تقويم التعليم والتدريب لطلاب المرحلة الثانوية، وتعتمد عليه الجامعات السعودية في القبول ضمن «النسبة الموزونة» مع المعدل التراكمي والاختبار التحصيلي.</p><p>لا يقيس ما حفظته من المنهج، بل قدرتك على <strong>الفهم والتحليل والاستنتاج</strong> باللغة والأرقام. لذلك ترتفع درجتك بالتدريب على المهارات، لا بحفظ الإجابات.</p>`},
    {id:'format',h:'الصيغة والأقسام',body:`<div class="tbl"><table><thead><tr><th>البند</th><th>الورقي</th><th>الرقمي (المحوسب)</th></tr></thead><tbody>
      <tr><td>عدد الأسئلة</td><td colspan="2">١٢٠ سؤالًا</td></tr>
      <tr><td>الأقسام</td><td colspan="2">خمسة أقسام، في كل قسم ٢٤ سؤالًا</td></tr>
      <tr><td>زمن الاختبار</td><td colspan="2">ساعتان وخمس دقائق، أي بمعدل ٢٥ دقيقة للقسم</td></tr>
      <tr><td>الموعد</td><td>فترات محددة تعلنها الهيئة</td><td>متاح طوال العام</td></tr>
      <tr><td>المتاح لهم حاليًا</td><td>الصف الثالث الثانوي والخريجون</td><td>الصف الثاني والثالث الثانوي والخريجون</td></tr>
      <tr><td>ظهور النتيجة</td><td>بعد قرابة شهر</td><td>خلال ٣–٥ أيام عمل</td></tr>
      <tr><td>نوع الأسئلة</td><td colspan="2">اختيار من متعدد بأربعة بدائل (أ، ب، ج، د)</td></tr>
      <tr><td>الآلة الحاسبة</td><td colspan="2">غير مسموح بها</td></tr>
      <tr><td>اللغة</td><td colspan="2">العربية أو الإنجليزية</td></tr>
      <tr><td>الفرص</td><td colspan="2">خمس فرص خلال ثلاث سنوات</td></tr>
      <tr><td>الدرجة</td><td colspan="2">من ١٠٠، وصلاحية النتيجة خمس سنوات من تاريخ الاختبار</td></tr></tbody></table></div>
      <p>هذه البيانات من الدليل الإرشادي الرسمي لهيئة تقويم التعليم والتدريب، ومن توضيحها لفئات الورقي والرقمي في سبتمبر ٢٠٢٦. في الاختبار الرقمي لكل قسم وقت محدد، ولا يمكن العودة إلى قسم بعد إنهائه. والمحاكاة في أكاديمية القدرات تتبع الصيغة نفسها: ٥ أقسام × ٢٤ سؤالًا × ٢٥ دقيقة، أي نحو دقيقة لكل سؤال، وكل قسم فيها لفظي أو كمي ليسهل عليك تحليل أدائك.</p>`},
    {id:'weights',h:'وزن اللفظي والكمي حسب المسار',body:`<p>للاختبار نسختان بحسب مسارك في الثانوية:</p><div class="tbl"><table><thead><tr><th>النسخة</th><th>اللفظي</th><th>الكمي</th><th>المسارات</th></tr></thead><tbody>
      <tr><td>التخصصات العلمية</td><td>٥٥٪</td><td>٤٥٪</td><td>العام، والصحة والحياة، وعلوم الحاسب والهندسة</td></tr>
      <tr><td>التخصصات النظرية</td><td>٧٥٪</td><td>٢٥٪</td><td>الشرعي، وإدارة الأعمال (بلا جبر)</td></tr></tbody></table></div>
      <div class="tbl"><table><thead><tr><th>نوع الأسئلة</th><th>العلمي</th><th>النظري</th></tr></thead><tbody>
      <tr><td>استيعاب المقروء</td><td>٢١٪</td><td>٢٥٪</td></tr>
      <tr><td>التناظر اللفظي</td><td>١٧٪</td><td>٢١٪</td></tr>
      <tr><td>الخطأ السياقي</td><td>١٠٪</td><td>١٦٪</td></tr>
      <tr><td>إكمال الجمل</td><td>٧٪</td><td>١٣٪</td></tr>
      <tr><td>الحساب</td><td>٢٣٪</td><td>١٣٪</td></tr>
      <tr><td>الهندسة</td><td>١٠٪</td><td>٨٪</td></tr>
      <tr><td>التحليل والإحصاء</td><td>٨٪</td><td>٤٪</td></tr>
      <tr><td>الجبر</td><td>٤٪</td><td>لا يوجد</td></tr></tbody></table></div>
      <p>النسب من الدليل الإرشادي الرسمي، وهي من مجموع أسئلة الاختبار. الحساب أكبر أجزاء الكمي في النسختين، لذلك يبدأ الكمي في خطتك بالحساب.</p>`},
    {id:'types',h:'أنواع الأسئلة',body:`<p><strong>اللفظي</strong> في الدليل الرسمي أربعة أنواع: التناظر اللفظي، إكمال الجمل، الخطأ السياقي، استيعاب المقروء. وتظهر في أمثلته أسئلة «الارتباط والاختلاف» (المفردة الشاذة) ضمن العلاقات اللفظية، ونفرد لها هنا مهارة مستقلة.</p><p><strong>الكمي</strong> أربعة مجالات: الحساب، الهندسة، الجبر (في نسخة التخصصات العلمية)، التحليل والإحصاء. وتأتي بعض أسئلته بصيغة «المقارنة» بين قيمتين بخيارات ثابتة، ونفرد لها مهارة مستقلة كذلك.</p><p>لكل نوع درس كامل في صفحة <a href="#learn-lessons">الدروس</a>، يليه اختبار قصير.</p>`},
    {id:'admission',h:'كيف تُستخدم الدرجة في القبول؟',body:`<p>تحسب الجامعات «النسبة الموزونة» من ثلاثة عناصر: المعدل التراكمي للثانوية، والقدرات، والتحصيلي. يختلف وزن القدرات بين الجامعات والتخصصات، وغالبًا ما يقع بين ٣٠٪ و٥٠٪. التخصصات الصحية والهندسية الأكثر تنافسًا تتطلب عادة درجات أعلى.</p><p>لذلك ترفع كل درجة تضيفها في القدرات نسبتك الموزونة مباشرة، والقدرات هي العنصر الذي تستطيع تحسينه أكثر من غيره في أقصر وقت.</p>`},
    {id:'register',h:'التسجيل ويوم الاختبار',body:`<ol class="steps">
      <li>سجّل عبر موقع هيئة تقويم التعليم والتدريب، واختر الاختبار ولغته ونوعه (ورقي أو رقمي).</li>
      <li>اختر المدينة والمقر والموعد، وادفع الرسوم. الرسوم في الدليل الإرشادي الرسمي: ١٠٠ ريال للتسجيل المبكر في الورقي و١٥٠ للمتأخر، و١٥٠ للرقمي، و٢٠٠ خارج المملكة. قد تتغير، فتحقق من قيمتها عند التسجيل.</li>
      <li>احجز موعدك قبل ٦–٨ أسابيع على الأقل لتتسع خطتك لمرحلة المحاكاة.</li>
      <li>يوم الاختبار: أحضر أصل هويتك السارية (الهوية الوطنية أو الإقامة أو جواز السفر أو رخصة القيادة السعودية)، واحضر قبل الموعد بـ ٣٠ دقيقة في الورقي و١٥ دقيقة في الرقمي. لا آلة حاسبة ولا هاتف.</li>
      <li>النتيجة: الرقمي خلال ٣–٥ أيام عمل، والورقي بعد قرابة شهر، وتصلك برسالة نصية. للاختبار خمس فرص خلال ثلاث سنوات، وتُحتسب الدرجة الأعلى عادة.</li></ol>`},
    {id:'strategy',h:'استراتيجية الوقت داخل القاعة',body:`<ul class="bul"><li>لديك نحو ٦٢ ثانية لكل سؤال. السؤال الذي يتجاوز دقيقتين: علّمه وانتقل.</li><li>المعروف أن الإجابة الخاطئة لا تُخصم منها درجات، فلا تترك سؤالًا بلا إجابة.</li><li>في استيعاب المقروء: اقرأ السؤال قبل النص.</li><li>في المقارنات: جرّب ٠ و١ و−١ و½ قبل أن تحكم.</li><li>راجع المعلَّمات في آخر ٣ دقائق من القسم فقط.</li></ul>`},
    {id:'lessons-learned',h:'دروس من تجارب المتفوقين',body:`<p>خلاصة نصائح تتكرر عند الطلاب الذين تجاوزوا ٩٠، وفي أدلة التحضير المنشورة:</p><ul class="bul">
      <li><strong>مصدر واحد للتأسيس:</strong> التنقل بين المدرسين يضيّع وقتك، فأكمل مصدرًا واحدًا إلى آخره.</li>
      <li><strong>افهم الفكرة ولا تحفظ السؤال:</strong> قياس يغيّر الأرقام والصياغة؛ الحفظ الأعمى يخذلك.</li>
      <li><strong>التوقيت من البداية:</strong> من يتدرب بلا ساعة يفاجأ ببطئه يوم الاختبار.</li>
      <li><strong>دفتر الأخطاء أهم من كثرة الحل:</strong> الدرجات تأتي من إغلاق الأخطاء المتكررة.</li>
      <li><strong>خمس محاكاة كاملة على الأقل</strong> قبل الموعد، في الساعة نفسها التي ستختبر فيها.</li>
      <li><strong>النوم ليلة الاختبار</strong> أنفع من مراجعة أخيرة متعبة.</li></ul>`},
    {id:'faq',h:'أسئلة شائعة',body:`<details><summary>هل أسئلة «التجميعات» أسئلة حقيقية؟</summary><p>التجميعات أسئلة يتذكرها الطلاب بعد الاختبار ويعيد المعلمون صياغتها. مفيدة للتعرف على الأنماط، لكنها ليست رسمية وقد تحتوي أخطاء. الأسئلة الرسمية الوحيدة هي النماذج التي ينشرها قياس في أدلته.</p></details>
      <details><summary>كم أحتاج من الوقت للتحضير؟</summary><p>يوصي كثير من المختصين بثلاثة أشهر للمبتدئ، و٦–٨ أسابيع لمن لديه أساس جيد. وخطتك هنا تتكيف مع أي مدة من أسبوعين إلى ١٦ أسبوعًا.</p></details>
      <details><summary>ورقي أم رقمي (محوسب)؟</summary><p>مكونات الاختبار وعدد أسئلته واحدة في الصيغتين حسب الدليل الرسمي. الرقمي متاح طوال العام ونتيجته خلال ٣–٥ أيام عمل، وفيه مسودة إلكترونية ولا تعود إلى قسم أنهيته. والورقي في فترات محددة ونتيجته بعد قرابة شهر، وهو مخصص حاليًا لطلاب الصف الثالث الثانوي والخريجين حسب ما أوضحته الهيئة في سبتمبر ٢٠٢٦. المهم أن تتدرب على الصيغة التي ستختبرها.</p></details>
      <details><summary>هل الـ ١٠٠ ممكنة فعلًا؟</summary><p>نعم، الدرجة الكاملة ممكنة. الاختبار لا يقيس ذكاءً فطريًا ثابتًا، بل يأتي في عشرة أنماط محددة من الأسئلة. إذا أتقنت كل نمط بدقة ٩٥٪ فأكثر في أقل من دقيقة، وعالجت أخطاءك المتكررة، وتدربت على صيغة الاختبار حتى تألفها، صارت الـ ١٠٠ هدفًا واقعيًا. وتقيس صفحة «تقدّمي» جاهزيتك لها بمعايير واضحة.</p></details>`}
  ],
  en:[
    {id:'what',h:'What is the GAT?',body:`<p>A standardized test run by the National Center for Assessment (Qiyas) under the Education & Training Evaluation Commission for high school students. Saudi universities use it for admission as part of the "weighted percentage" alongside your GPA and the Achievement Test (Tahsili).</p><p>It does not test what you memorized from the curriculum. It measures your ability to <strong>understand, analyze and infer</strong> with language and numbers, so your score rises with skill practice, not by memorizing answers.</p>`},
    {id:'format',h:'Format and sections',body:`<div class="tbl"><table><thead><tr><th>Item</th><th>Paper-based</th><th>Digital (computer-based)</th></tr></thead><tbody>
      <tr><td>Questions</td><td colspan="2">120</td></tr>
      <tr><td>Sections</td><td colspan="2">Five, with 24 questions each</td></tr>
      <tr><td>Test time</td><td colspan="2">2 hours 5 minutes, an average of 25 minutes per section</td></tr>
      <tr><td>Dates</td><td>Set windows announced by ETEC</td><td>Available all year</td></tr>
      <tr><td>Currently open to</td><td>Third-year secondary students and graduates</td><td>Second- and third-year secondary students and graduates</td></tr>
      <tr><td>Results</td><td>About a month later</td><td>Within 3–5 working days</td></tr>
      <tr><td>Question type</td><td colspan="2">Multiple choice with four options (A–D)</td></tr>
      <tr><td>Calculator</td><td colspan="2">Not allowed</td></tr>
      <tr><td>Language</td><td colspan="2">Arabic or English</td></tr>
      <tr><td>Attempts</td><td colspan="2">Five within three years</td></tr>
      <tr><td>Score</td><td colspan="2">Out of 100, valid for five years from the test date</td></tr></tbody></table></div>
      <p>These facts come from the official candidate guide of the Education & Training Evaluation Commission (ETEC) and from its September 2026 clarification of who can sit the paper and digital tests. In the digital test each section has its own time, and you cannot return to a section once you finish it. Simulations in GAT Academy follow the same format: 5 sections × 24 questions × 25 minutes, about one minute per question. Each of our sections is all verbal or all quantitative, to make your results easier to analyze.</p>`},
    {id:'weights',h:'Verbal vs. quantitative weight by track',body:`<p>The test has two versions, set by your secondary-school track:</p><div class="tbl"><table><thead><tr><th>Version</th><th>Verbal</th><th>Quant</th><th>Tracks</th></tr></thead><tbody>
      <tr><td>Science</td><td>55%</td><td>45%</td><td>General, Health & Life Sciences, Computer Science & Engineering</td></tr>
      <tr><td>Theoretical</td><td>75%</td><td>25%</td><td>Sharia, Business Administration (no algebra)</td></tr></tbody></table></div>
      <div class="tbl"><table><thead><tr><th>Question type</th><th>Science</th><th>Theoretical</th></tr></thead><tbody>
      <tr><td>Reading comprehension</td><td>21%</td><td>25%</td></tr>
      <tr><td>Verbal analogy</td><td>17%</td><td>21%</td></tr>
      <tr><td>Contextual error</td><td>10%</td><td>16%</td></tr>
      <tr><td>Sentence completion</td><td>7%</td><td>13%</td></tr>
      <tr><td>Arithmetic</td><td>23%</td><td>13%</td></tr>
      <tr><td>Geometry</td><td>10%</td><td>8%</td></tr>
      <tr><td>Analysis & statistics</td><td>8%</td><td>4%</td></tr>
      <tr><td>Algebra</td><td>4%</td><td>None</td></tr></tbody></table></div>
      <p>The percentages are from the official candidate guide and are shares of the whole test. Arithmetic is the largest part of quant in both versions, which is why your plan starts quant with arithmetic.</p>`},
    {id:'types',h:'Question types',body:`<p><strong>Verbal</strong> has four types in the official guide: verbal analogy, sentence completion, contextual error and reading comprehension. Its examples also include "association and difference" (odd word out) items within verbal relationships, which we teach here as a skill of its own.</p><p><strong>Quantitative</strong> covers four areas: arithmetic, geometry, algebra (science version) and analysis & statistics. Some questions use the "comparison" format, two quantities with fixed options, which we also teach as a skill of its own.</p><p>Each type has a full lesson on the <a href="#learn-lessons">Lessons</a> page, followed by a short quiz.</p>`},
    {id:'admission',h:'How the score is used for admission',body:`<p>Universities compute a "weighted percentage" from your high school GPA, the GAT and the Tahsili. The GAT weight varies by university and program, commonly between 30% and 50%. Competitive health and engineering programs usually need higher scores.</p><p>Every point you add on the GAT lifts your weighted percentage directly, and it is the component you can improve most in the least time.</p>`},
    {id:'register',h:'Registration and test day',body:`<ol class="steps">
      <li>Register through the Education & Training Evaluation Commission (ETEC) website. Choose the test, its language, and the paper or digital format.</li>
      <li>Choose city, center and date, and pay the fee. The official candidate guide lists 100 SAR for early paper registration, 150 SAR for late paper registration, 150 SAR for the digital test and 200 SAR outside the Kingdom. Fees can change, so check the amount when you register.</li>
      <li>Book at least 6–8 weeks ahead so your plan has room for the simulation phase.</li>
      <li>On test day bring your original, valid ID (national ID, Iqama, passport or Saudi driving license) and arrive 30 minutes early for the paper test or 15 minutes early for the digital test. No calculator, no phone.</li>
      <li>Results: digital within 3–5 working days, paper about a month later, sent to you by SMS. You have five attempts within three years, and the higher score usually counts.</li></ol>`},
    {id:'strategy',h:'Timing strategy in the hall',body:`<ul class="bul"><li>You have about 62 seconds per question. If one passes two minutes, mark it and move on.</li><li>Wrong answers are not known to cost you points, so never leave a question blank.</li><li>Reading: read the question before the passage.</li><li>Comparisons: test 0, 1, −1 and ½ before deciding.</li><li>Revisit marked questions only in the last 3 minutes of a section.</li></ul>`},
    {id:'lessons-learned',h:'Lessons from high scorers',body:`<p>Advice that comes up again and again from students who scored above 90, and in published prep guides:</p><ul class="bul">
      <li><strong>One foundation source:</strong> hopping between teachers wastes time. Pick one source and finish it.</li>
      <li><strong>Understand, do not memorize:</strong> Qiyas changes numbers and wording; memorized answers fail.</li>
      <li><strong>Time yourself from day one:</strong> students who practice untimed are surprised by their speed on test day.</li>
      <li><strong>The mistake log beats volume:</strong> points come from closing repeated mistakes.</li>
      <li><strong>At least 5 full simulations</strong> before the test, at the same time of day as the real one.</li>
      <li><strong>A good night’s sleep</strong> before the test beats a tired last-minute review.</li></ul>`},
    {id:'faq',h:'FAQ',body:`<details><summary>Are "compilation" (tajmeeat) questions real?</summary><p>Compilations are questions students recall after the test, reworded by teachers. They help you see patterns but are not official and can contain errors. The only official questions are the samples Qiyas publishes in its guides.</p></details>
      <details><summary>How long should I prepare?</summary><p>Many specialists recommend three months for beginners and 6–8 weeks for students with a solid base. Your plan here adapts to anything from 2 to 16 weeks.</p></details>
      <details><summary>Paper or digital (computer-based)?</summary><p>The components and the number of questions are the same in both formats, per the official guide. The digital test is available all year, gives results within 3–5 working days, has an on-screen scratch pad and does not let you return to a finished section. The paper test runs in set windows with results about a month later, and is currently limited to third-year secondary students and graduates, as ETEC clarified in September 2026. Practice in the format you will sit.</p></details>
      <details><summary>Is 100 really achievable?</summary><p>Yes, a perfect score is possible. The test doesn’t measure fixed intelligence; its questions come in ten set types. Master each type at 95%+ accuracy in under a minute, fix your recurring mistakes, and practice the real format until it feels familiar, and 100 becomes a realistic target. The Progress page tracks your readiness for it against clear criteria.</p></details>`}
  ]
};

const GUIDE_SOURCES = [
  ['هيئة تقويم التعليم والتدريب (الموقع الرسمي)','Education & Training Evaluation Commission (official)','https://etec.gov.sa'],
  ['الدليل الإرشادي لاختبار القدرات العامة (هيئة تقويم التعليم والتدريب)','Official GAT candidate guide (ETEC, Arabic PDF)','https://media.etec.gov.sa/media/1izihxlo/%D8%A7%D9%84%D8%AF%D9%84%D9%8A%D9%84-%D8%A7%D9%84%D8%A7-%D8%B1%D8%B4%D8%A7%D8%AF%D9%8A-%D9%84%D8%A7%D8%AE%D8%AA%D8%A8%D8%A7%D8%B1-%D8%A7%D9%84%D9%82%D8%AF%D8%B1%D8%A7%D8%AA-%D8%A7%D9%84%D8%B9%D8%A7%D9%85%D8%A9.pdf'],
  ['صفحة اختبار القدرات العامة في موقع الهيئة','General Aptitude Test page (ETEC)','https://etec.gov.sa/en/eservices-catalogue/individual/p-7d1870ff-a881-4e9a-9f9d-8f2a2c4df032'],
  ['عكاظ: فئات الاختبار الورقي والرقمي (سبتمبر ٢٠٢٦)','Okaz: who can sit the paper and digital tests (September 2026)','https://www.okaz.com.sa/local/na/2265965'],
  ['Keystone Tutors: GAT Guide','Keystone Tutors: GAT Guide','https://www.keystonetutors.com/news/general-aptitude-test-guide']
];

/* ============ STATE ============ */
const KEY='masar100_v1';
/* calendar days are the student's local days (midnight in Riyadh, not UTC): the daily limit, streaks, plan weeks and review dates all use them */
const pad2=n=>String(n).padStart(2,'0');
const ymd=x=>x.getFullYear()+'-'+pad2(x.getMonth()+1)+'-'+pad2(x.getDate());
const todayStr=()=>ymd(new Date());
const addDays=(d,n)=>{ const x=new Date(String(d).slice(0,10)+'T12:00:00'); x.setDate(x.getDate()+n); return ymd(x); };
const isDay=v=>typeof v==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(v)&&!isNaN(new Date(v+'T12:00:00'));
const DEF=()=>({lang:'ar',track:'sci',target:100,examDate:'',weeks:8,planStart:todayStr(),done:{},stats:{},recent:[],attempts:[],mistakes:[],days:[],sessionDays:[],vocab:{ar:{},en:{}},cards:{},models:{},rs:{},fd:{},xp:{},causes:{concept:0,careless:0,time:0,trap:0}});
/* any stored or imported state (old shapes, missing fields, wrong types) becomes a valid state with defaults; never throws */
function normalize(o){
  if(!o||typeof o!=='object'||Array.isArray(o)) o={};
  const s=Object.assign(DEF(),o);
  const isObj=v=>!!v&&typeof v==='object'&&!Array.isArray(v);
  ['recent','attempts','mistakes','days','sessionDays'].forEach(k=>{ if(!Array.isArray(s[k])) s[k]=[]; });
  ['done','stats','cards','models','rs','fd','xp','causes','vocab','dq','diag','rst'].forEach(k=>{ if(s[k]!=null&&!isObj(s[k])) delete s[k]; });
  ['done','stats','cards','models','rs','fd','xp','causes','vocab'].forEach(k=>{ if(!isObj(s[k])) s[k]={}; });
  if(!isObj(s.vocab.ar)) s.vocab.ar={}; if(!isObj(s.vocab.en)) s.vocab.en={};
  for(const c of ['concept','careless','time','trap']) s.causes[c]=Math.max(0,+s.causes[c]||0);
  s.lang=s.lang==='en'?'en':'ar'; s.track=s.track==='lit'?'lit':'sci'; s.target=Math.max(60,Math.min(100,Math.round(+s.target)||100)); s.weeks=[4,6,8,10,12].includes(+s.weeks)?+s.weeks:8;
  if(!isDay(s.planStart)) s.planStart=todayStr(); if(!isDay(s.examDate)) s.examDate=''; if(s.since!=null&&!isDay(s.since)) delete s.since;
  s.recent=s.recent.filter(x=>isObj(x)&&typeof x.s==='string'); s.attempts=s.attempts.filter(x=>isObj(x)&&typeof x.kind==='string');
  s.mistakes=s.mistakes.filter(x=>isObj(x)&&x.key&&Array.isArray(x.opts)).map(m=>{ if(typeof m.box!=='number') m.box=0; if(!isDay(m.due)) m.due=todayStr(); if(m.lang!=='en') m.lang='ar'; return m; });
  const days=a=>[...new Set(a.filter(isDay))].sort(); s.days=days(s.days); s.sessionDays=days(s.sessionDays);
  if(s.diag&&(!isObj(s.diag.skills)||!isDay(s.diag.date))) delete s.diag;
  if(s.dq&&!isDay(s.dq.d)) delete s.dq;
  for(const k of ['cards','xp','models','rs','fd','stats']) for(const [id,v] of Object.entries(s[k])) if(!isObj(v)) delete s[k][id];
  for(const l of ['ar','en']) for(const [w,v] of Object.entries(s.vocab[l])) if(!isObj(v)) delete s.vocab[l][w];
  return s;
}
let LOAD_ERR=false; /* the saved copy on this device could not be read (corrupt or truncated JSON) */
let S=(()=>{ let r=null; try{ r=localStorage.getItem(KEY); if(r==null){ const old=localStorage.getItem('masar95_v1'); if(old){ const o=JSON.parse(old); o.target=100; (o.mistakes||[]).forEach(m=>{m.box=0;m.due=todayStr();}); return normalize(o); } } }catch(e){}
  if(r!=null){ try{ const o=JSON.parse(r); if(!o||typeof o!=='object'||Array.isArray(o)) throw 0; return normalize(o); }catch(e){ LOAD_ERR=true; try{ localStorage.setItem(KEY+'_bad',String(r).slice(0,2e6)); }catch(e2){} } }
  return normalize({}); })();
{ /* ?lang=en|ar from the marketing page: apply once, then drop it from the address */ try{ const u=new URL(location.href), q=u.searchParams.get('lang'); if(q==='en'||q==='ar'){ S.lang=q; u.searchParams.delete('lang'); history.replaceState(null,'',u.pathname+(u.search||'')+u.hash); } }catch(e){} }
if(!S.since) S.since=todayStr(); /* first use on this device (merged with the cloud copy: the earliest wins) */
let STORE_OK=(()=>{ try{ localStorage.setItem('__t','1'); localStorage.removeItem('__t'); return true; }catch(e){ return false; } })(), PERSIST=false, SAVE_WARNED=false;
try{ navigator.storage?.persisted?.().then(v=>{ PERSIST=v; if(!v&&navigator.storage.persist) navigator.storage.persist().then(x=>PERSIST=x).catch(()=>{}); }).catch(()=>{}); }catch(e){}
/* save to this device; when storage is full, old attempt details are dropped to make room, and the student is warned once instead of losing work silently */
const save=()=>{ S.savedAt=Date.now(); const body=JSON.stringify(S); let ok=false;
  try{ localStorage.setItem(KEY,body); ok=true; }catch(e){ try{ if(typeof shrinkDetails==='function'&&shrinkDetails(8)){ localStorage.setItem(KEY,body); ok=true; } }catch(e2){} }
  STORE_OK=ok; if(!ok&&!SAVE_WARNED){ SAVE_WARNED=true; toast(window.CLOUD?.user?t('saveFailCloud'):tc('saveFail')); }
  try{ window.CLOUD?.queue?.(); }catch(e){} const el=document.getElementById('save-dot'); if(el){ el.classList.toggle('bad',!STORE_OK); el.title=STORE_OK?t('savedOk'):tc('saveFail'); el.setAttribute('aria-label',el.title); } };
const t=k=>{ const p=k.split('.'); let o=T[S.lang]; for(const x of p) o=o?.[x]; return o??k; };
const L=o=>o&&typeof o==='object'&&('ar' in o)?o[S.lang]:o;
/* local strings owned by app.js (added only where ui.js does not define them yet) */
const T2={
  ar:{emptyT:'لا توجد بيانات بعد',emptyD:'تعرض هذه الصفحة أرقامك الفعلية: الدرجة التقديرية، والدقة، والزمن، ومستوى كل مهارة. ابدأ بالاختبار التشخيصي (٢٠ سؤالًا في ١٥ دقيقة) لتعرف نقطة بدايتك.',
    recoStartH:'ابدأ بالاختبار التشخيصي',recoStartP:'يقيس مستواك في المهارات العشر، وعليه تُبنى خطتك وجلساتك اليومية.',greetN:n=>'هدفك '+n,
    finishQ:'إنهاء الاختبار وعرض النتيجة؟',endSecQ:'إنهاء هذا القسم والانتقال إلى التالي؟',curPwWrong:'كلمة المرور الحالية غير صحيحة.',foldShow:'عرض',foldHide:'إخفاء',foldPractice:'مع الاشتراك: محاكاة كاملة، قسم لفظي وقسم كمي، ٣٠ نموذجًا كاملًا، وتدريب حسب المهارة',firstStepsL:'ماذا بعد الاختبار؟',firstSteps:[['اختبر مستواك','٢٠ سؤالًا في نحو ١٥ دقيقة، مجانًا.'],['اعرف نتيجتك','درجتك التقديرية ومستواك في كل مهارة من العشر.'],['ابدأ خطتك','جلسة يومية قصيرة تبدأ بأضعف مهاراتك.']],gateT2:'احفظ نتيجتك وكمّل',gateMsg2:'أنشئ حسابك المجاني لتُحفظ نتيجة اختبارك وأخطاؤك، ويبدأ تدريبك اليومي مباشرة. يأخذ أقل من دقيقة.',saveT:'احفظ نتيجتك',saveD:'نتيجتك الآن على هذا الجهاز فقط. أنشئ حسابك المجاني لتبقى معك، وتبدأ خطتك اليومية من أضعف مهاراتك.',saveBtn:'أنشئ حسابي المجاني',saveStrip:'نتيجتك محفوظة على هذا الجهاز فقط.',saveStripBtn:'احفظها في حسابي',estFreeNote:'الدرجة التقديرية هنا أولية، من ٢٠ سؤالًا فقط، وتزداد دقتها كلما تدرّبت.',gateT:'سجّل لتبدأ',gateMsg:'أنشئ حسابك المجاني قبل أول اختبار، لتُحفظ نتائجك وأخطاؤك وتقدمك في حسابك وتتابعها من أي جهاز. بعدها يبدأ اختبارك مباشرة.',gateLater:'لاحقًا',
    signedOut:'سجّلت الخروج. تقدمك محفوظ في حسابك وأُزيل من هذا الجهاز، فادخل من جديد لتكمل.',
    importQ:'سيحلّ التقدم الموجود في الملف أو الرمز محلّ تقدمك الحالي على هذا الجهاز. متابعة؟',importYes:'نعم، استورد',copyManual:'انسخ الرمز الظاهر في المربع',
    resumeT:'لديك اختبار لم يكتمل',resumeD:(ti,q,n)=>`«${ti}» · توقفت عند السؤال ${q} من ${n}. الوقت متوقف حتى تكمل.`,resumeBtn:'أكمل الاختبار',discardBtn:'تجاهله',resumed:'عدت إلى اختبارك',
    summaryOnly:'ملخص فقط',saved:'تم الحفظ',
    mapLeg:(a,f,u)=>`أجبت عن ${a} · معلَّمة ${f} · بلا إجابة ${u}`,
    signinT:'أهلًا بعودتك',signinWhy:'ادخل ببريدك وكلمة المرور لتكمل من حيث توقفت.',
    welcomeIn:n=>n?`أهلًا ${n}! تقدمك يُحفظ الآن في حسابك.`:'أهلًا بك! تقدمك يُحفظ الآن في حسابك.',
    nextRev:d=>`أقرب مراجعة: ${d}`,tomorrow:'غدًا',noMist:'ستظهر هنا الأسئلة التي تخطئ فيها في الاختبارات والتدريب.',
    secDone:n=>`انتهى القسم ${n}`,secNext:(q,m)=>`${q} سؤالًا في ${m} دقيقة. يبدأ الوقت حين تضغط «ابدأ القسم».`,secNoBack:'لا يمكنك العودة إلى القسم السابق بعد الآن.',secStart:'ابدأ القسم',
    authErr:{'sync-first':'تعذّر حفظ آخر تقدمك في حسابك، فأبقيناك مسجّلًا حتى لا يضيع. تحقق من اتصالك ثم حاول مجددًا.'},
    saveFailCloud:'المتصفح لا يسمح بالحفظ على هذا الجهاز الآن، لكن تقدمك يُحفظ في حسابك.',
    loadErr:'تعذّر قراءة تقدمك المحفوظ على هذا الجهاز، فبدأنا بنسخة جديدة. إن كان لديك حساب فسيعود تقدمك منه عند الدخول، ويمكنك أيضًا استرجاعه من ملف نسخة احتياطية في صفحة «تقدّمي».',
    sessionLost:'انتهت جلستك. ادخل من جديد ليستمر حفظ تقدمك في حسابك.',
    offlineNote:'لا يمكن الوصول إلى الخادم الآن. تعمل بالنسخة المحفوظة على هذا الجهاز، وسيُحفظ تقدمك في حسابك حين يعود الاتصال.',
    signedOutElsewhere:'سجّلت الخروج من حسابك في نافذة أخرى، فأُزيل تقدمه من هذا الجهاز.',
    mergedGuest:'ضممنا ما تدرّبت عليه على هذا الجهاز قبل الدخول إلى حسابك.',
    errPageT:'تعذّر عرض هذه الصفحة',errPageD:'حدث خطأ غير متوقع. جرّب إعادة التحميل، وإن تكرر فراسلنا على info@gat.academy.',reload:'أعد التحميل',errUnexpected:'حدث خطأ غير متوقع. إن تكرر فأعد تحميل الصفحة.',
    goHome:'إلى الصفحة الرئيسية',tooMany:n=>`محاولات كثيرة. يمكنك المحاولة مجددًا بعد ${n} دقيقة.`,pwLong:'كلمة المرور طويلة جدًا؛ الحد ٢٠٠ حرف.',resetMail:'إعادة تعيين كلمة المرور',resetMailBody:e=>`أرغب في إعادة تعيين كلمة المرور لحسابي في أكاديمية القدرات. بريد الحساب: ${e}`,sendMail:'أرسل الطلب بالبريد',
    reportLink:'تقرير بدايتك جاهز: أين كنت، وأين أنت الآن.',
    vShort:'لفظي',qShort:'كمي',
    sessFree:n=>n>=3?`${numL(n)} ${n<=10?'أسئلة':'سؤالًا'} اخترناها لك من أخطائك وأضعف مهاراتك`:n>0?'آخر أسئلتك المجانية لهذا اليوم':'جلستك القادمة جاهزة غدًا',
    verdict:[ 'كل خطأ هنا درس. ابدأ بمراجعة أخطائك.','بداية جيدة، وأخطاؤك هي خريطة تحسّنك.','أحسنت! أنت تقترب من هدفك.','ممتاز! أداء على مستوى الـ ١٠٠.' ],
    flagS:'مراجعة',mapS:'الخريطة',resultE:'نتيجتك',seeMistakes:n=>`راجع أخطاءك (${n})`},
  en:{emptyT:'No data yet',emptyD:'This page shows your actual numbers: estimated score, accuracy, time and the level of each skill. Start with the diagnostic (20 questions in 15 minutes) to find your starting point.',
    recoStartH:'Start with the diagnostic',recoStartP:'It measures your level in all ten skills, and your plan and daily sessions are built on it.',greetN:n=>'Your target: '+n,
    finishQ:'Finish the test and see your result?',endSecQ:'End this section and move to the next one?',curPwWrong:'Your current password is incorrect.',foldShow:'Show',foldHide:'Hide',foldPractice:'With Pro: full mock test, verbal and quant sections, 30 full model tests, and practice by skill',firstStepsL:'What happens next',firstSteps:[['Check your level','20 questions in about 15 minutes, free.'],['See your result','Your estimated score and your level in each of the ten skills.'],['Start your plan','A short daily session that begins with your weakest skills.']],gateT2:'Save your result and keep going',gateMsg2:'Create your free account to keep your test result and mistakes, and your daily practice starts right away. It takes under a minute.',saveT:'Save your result',saveD:'Your result is on this device only for now. Create your free account to keep it, and start a daily plan built from your weakest skills.',saveBtn:'Create my free account',saveStrip:'Your result is saved on this device only.',saveStripBtn:'Save it to my account',estFreeNote:'This estimated score is a first reading from 20 questions only. It gets more accurate as you practise.',gateT:'Sign up to start',gateMsg:'Create your free account before your first test, so your results, mistakes and progress are saved to your account and you can pick them up on any device. Your test starts right after.',gateLater:'Not now',
    signedOut:'Signed out. Your progress is saved in your account and was removed from this device; sign in again to continue.',
    importQ:'The progress in this file or code will replace your current progress on this device. Continue?',importYes:'Yes, import',copyManual:'Copy the code shown in the box',
    resumeT:'You have an unfinished test',resumeD:(ti,q,n)=>`“${ti}” · you stopped at question ${q} of ${n}. The clock is paused until you continue.`,resumeBtn:'Continue the test',discardBtn:'Discard it',resumed:'Back to your test',
    summaryOnly:'Summary only',saved:'Saved',
    mapLeg:(a,f,u)=>`Answered ${a} · Flagged ${f} · Unanswered ${u}`,
    signinT:'Welcome back',signinWhy:'Sign in with your email and password to pick up where you left off.',
    welcomeIn:n=>n?`Welcome, ${n}! Your progress is now saved to your account.`:'Welcome! Your progress is now saved to your account.',
    nextRev:d=>`Next review: ${d}`,tomorrow:'tomorrow',noMist:'Questions you get wrong in tests and practice will show up here.',
    secDone:n=>`Section ${n} done`,secNext:(q,m)=>`${q} questions in ${m} minutes. The clock starts when you press “Start the section”.`,secNoBack:'You can no longer go back to the previous section.',secStart:'Start the section',
    authErr:{'sync-first':'We couldn’t save your latest progress to your account, so we kept you signed in to avoid losing it. Check your connection and try again.'},
    saveFailCloud:'Your browser can’t save on this device right now, but your progress is being saved to your account.',
    loadErr:'We couldn’t read the progress saved on this device, so we started a fresh copy. If you have an account, your progress comes back when you sign in; you can also restore it from a backup file on the Progress page.',
    sessionLost:'Your session ended. Sign in again so your progress keeps saving to your account.',
    offlineNote:'The server can’t be reached right now. You’re working with the copy saved on this device; your progress will be saved to your account when the connection is back.',
    signedOutElsewhere:'You signed out of your account in another tab, so its progress was removed from this device.',
    mergedGuest:'What you practiced on this device before signing in was added to your account.',
    errPageT:'This page couldn’t be shown',errPageD:'Something unexpected went wrong. Try reloading; if it keeps happening, email info@gat.academy.',reload:'Reload',errUnexpected:'Something unexpected went wrong. If it keeps happening, reload the page.',
    goHome:'Go to the home page',tooMany:n=>`Too many attempts. You can try again in ${n} minutes.`,pwLong:'Password is too long; the limit is 200 characters.',resetMail:'Password reset',resetMailBody:e=>`I would like to reset the password of my GAT Academy account. Account email: ${e}`,sendMail:'Send the request by email',
    reportLink:'Your progress report is ready: where you started, where you are now.',
    vShort:'Verbal',qShort:'Quantitative',
    sessFree:n=>n>=3?`${n} questions picked from your mistakes and weakest skills`:n>0?'Your last free questions for today':'Your next session is ready tomorrow',
    verdict:[ 'Every mistake here is a lesson. Start by reviewing them.','A good start, and your mistakes map out what to fix next.','Well done! You are getting close to your target.','Excellent! That is 100-level work.' ],
    flagS:'Flag',mapS:'Map',resultE:'Your result',seeMistakes:n=>`Review your mistakes (${n})`}
};
(()=>{ for(const l of ['ar','en']){ const d=T[l]; for(const [k,v] of Object.entries(T2[l])){ if(v&&typeof v==='object'&&!Array.isArray(v)&&typeof v!=='function'){ d[k]=d[k]||{}; for(const [k2,v2] of Object.entries(v)) if(!(k2 in d[k])) d[k][k2]=v2; } else if(!(k in d)) d[k]=v; } } })();
const $=s=>document.querySelector(s);
const dateH=d=>`<bdi dir="ltr" class="num">${numL(d||'')}</bdi>`;
/* a readable date ("6 November 2026" / "٦ نوفمبر ٢٠٢٦"), Gregorian in both languages; falls back to the ISO form */
const dateLong=d=>{ try{ const x=new Date(String(d).slice(0,10)+'T12:00:00'); if(isNaN(x)) throw 0; return `<bdi class="num">${x.toLocaleDateString(S.lang==='ar'?'ar-SA-u-ca-gregory-nu-arab':'en-GB',{day:'numeric',month:'long',year:'numeric'})}</bdi>`; }catch(e){ return dateH(String(d||'').slice(0,10)); } };
/* a compact date for tables ("29 Oct" / "٢٩ أكتوبر"; the year only when it is not this year) */
const dateShort=d=>{ try{ const x=new Date(String(d).slice(0,10)+'T12:00:00'); if(isNaN(x)) throw 0; const o={day:'numeric',month:'short'}; if(x.getFullYear()!==new Date().getFullYear()) o.year='numeric'; return `<bdi class="num nowrap">${x.toLocaleDateString(S.lang==='ar'?'ar-SA-u-ca-gregory-nu-arab':'en-GB',o)}</bdi>`; }catch(e){ return dateH(String(d||'').slice(0,10)); } };
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
/* math: in Arabic, expressions with Arabic letters read right to left (as in the official Arabic papers) and every digit is Arabic-Indic; simple digit fractions are stacked */
const AD=x=>x.replace(/\d/g,d=>'٠١٢٣٤٥٦٧٨٩'[d]);
/* a negative number stays one unit (minus before the digits) inside right-to-left text */
const arDigits=h=>h.split(/(<[^>]+>|&[#\w]+;)/).map(p=>p.startsWith('<')||p.startsWith('&')?p:AD(p.replace(/(^|[\s(=,،:>×÷+])([−-])(\d[\d.,]*)/g,'$1\u2066$2$3\u2069'))).join('');
function M(str){ const ar=S.lang==='ar';
  const out=String(str).replace(/⟦(.+?)⟧/g,(_,m)=>{ const hasAr=/[\u0600-\u06FF]/.test(m);
    m=m.replace(/\^\(([^)]+)\)/g,'<sup>$1</sup>').replace(/\^([0-9A-Za-z؀-ۿ−-]+)/g,'<sup>$1</sup>');
    m=m.replace(/(^|[^\d.\w])(\d+)\/(\d+)(?![\d.\w])/g,'$1<span class="frac"><span>$2</span><span>$3</span></span>');
    if(ar&&hasAr) return `<span class="m m-ar" dir="rtl">${m.replace(/→/g,'←')}</span>`;
    m=m.replace(/([\u0600-\u06FF]+)/g,'$1\u200E'); return `<span class="m" dir="ltr">${m}</span>`; });
  return ar?arDigits(out):out; }
const numL=n=>S.lang==='ar'?String(n).replace(/\d/g,d=>'٠١٢٣٤٥٦٧٨٩'[d]):String(n);
const stem=q=>M(q.includes('<br>')?q:esc(q));
const optH=o=>M(String(o).startsWith('⟦')?o:esc(o));

/* ============ MODEL ============ */
const W=()=>S.track==='sci'?{V:.55,Q:.45}:{V:.75,Q:.25};
function areaAcc(area,list){ const r=list.filter(x=>!x.src&&SKILLS[x.s]?.area===area).slice(-80); return r.length?r.filter(x=>x.ok).length/r.length:null; }
function estimate(list=S.recent){ const v=areaAcc('V',list),q=areaAcc('Q',list); if(v==null&&q==null) return null; const w=W(); return Math.round(100*(w.V*(v??q)+w.Q*(q??v))); }
function skillInfo(s,recent=S.recent){
  const r=recent.filter(x=>x.s===s&&!x.src).slice(-20); const n=r.length; if(!n) return {s,n:0,acc:null,time:null,level:0};
  const acc=r.filter(x=>x.ok).length/n, time=r.reduce((a,x)=>a+(x.t||0),0)/n, T0=TARGET_T[s];
  let level=2; if(n<5||acc<.7) level=1; else if(n>=20&&acc>=.95&&time<=T0) level=4; else if(n>=10&&acc>=.85&&time<=T0*1.25) level=3;
  return {s,n,acc,time,level};
}
const ALL_SKILLS=[...V_SKILLS,...Q_SKILLS];
const isMock=a=>a.kind==='mock'||a.kind==='model';
/* at most 300 mistakes are kept; closed tombstones go first */
function capMistakes(){ if(S.mistakes.length<=300) return; const open=S.mistakes.filter(m=>(m.box||0)<4), closed=S.mistakes.filter(m=>(m.box||0)>=4); S.mistakes=closed.slice(-Math.max(0,300-open.length)).concat(open.slice(-300)); }
/* open mistakes (box<4); closed ones stay as tombstones so another device cannot bring them back */
const openMistakes=(lang=S.lang)=>S.mistakes.filter(m=>m.lang===lang&&(m.box||0)<4);
function dueList(lang=S.lang){ const d=todayStr(), open=openMistakes(lang); const due=open.filter(m=>(m.due||d)<=d); return PRO()?due:due.slice(-(+FREE.mistakesMax||0)); /* free: spacing kept, count capped */ }
function readiness(recent=S.recent,attempts=S.attempts){
  const lv=ALL_SKILLS.map(s=>skillInfo(s,recent).level); const lvl=lv.reduce((a,b)=>a+b,0)/(4*lv.length);
  const mocks=attempts.filter(a=>isMock(a)&&a.est!=null).slice(-3); const mk=mocks.length?mocks.reduce((a,x)=>a+x.est,0)/(3*100):0;
  const rev=recent.length?(dueList().length?0:1):0;
  return Math.round(100*(.7*lvl+.2*Math.min(1,mk)+.1*rev));
}
function readyChecks(recent=S.recent,attempts=S.attempts){
  const info=ALL_SKILLS.map(s=>skillInfo(s,recent)); const mocks=attempts.filter(isMock).slice(-3);
  return [info.every(i=>i.level===4), mocks.length===3&&mocks.every(m=>(m.est??0)>=95), info.every(i=>i.n>=10&&i.time<=TARGET_T[i.s]), recent.length>0&&!dueList().length];
}
function rankSkills(){ return ALL_SKILLS.map(s=>skillInfo(s)).sort((a,b)=>(a.level-b.level)||((a.acc??.5)-(b.acc??.5))); }

/* ============ PLANS: free / pro ============ */
/* The standalone artifact has no accounts (no cloud.js): everything stays open there. */
const CLOUD_BUILD=!!document.querySelector('script[src*="cloud.js"]');
/* free-plan limits (overwritten by config.free from the server) */
const FREE={xp:[],dailyQuestions:10,cardsFrac:.25,planWeeks:2,mistakesMax:15,techFrac:.25,diagnostic:true};
function syncFree(){ const c=window.CLOUD?.config?.free; if(c&&typeof c==='object') Object.assign(FREE,c); }
const cachedPro=()=>{ try{ const p=JSON.parse(localStorage.getItem('masar100_plan')); return !!(p&&p.tier==='pro'&&p.email&&p.email===localStorage.getItem('masar100_owner')); }catch(e){ return false; } };
function PRO(){ const C=window.CLOUD;
  if(!C){ if(!CLOUD_BUILD) return true; return cachedPro(); }
  if(C.user) return !!C.isPro?.(); if(C.offline&&getOwner()) return cachedPro(); return false; }
/* an account is in play: signed in, or a known account while the server is unreachable (its limits still apply) */
const acct=()=>!!(window.CLOUD?.user||(window.CLOUD?.offline&&getOwner()));
const CFG=()=>window.CLOUD?.config||null;
const EVQ=[]; /* events fired before cloud.js has loaded */
const track=(type,k,v)=>{ try{ const C=window.CLOUD; if(C&&C.track) C.track(type,k,v); else if(CLOUD_BUILD&&EVQ.length<50) EVQ.push([type,k,v]); }catch(e){} };
function flushEVQ(){ const C=window.CLOUD; if(C&&C.track) while(EVQ.length) C.track(...EVQ.shift()); }
const EYE='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/></svg>', EYE_OFF='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 4l16 16"/><path d="M9.9 5.8A9.6 9.6 0 0 1 12 5.5c6 0 9.5 6.500 9.500 6.500a17 17 0 0 1-2.800 3.600M6.300 7.700A16.500 16.500 0 0 0 2.500 12S6 18.500 12 18.500a9 9 0 0 0 3.800-.850"/><path d="M9.900 9.900a3 3 0 0 0 4.200 4.200"/></svg>';
const LOCKSVG='<svg viewBox="0 0 24 24" class="i16 lk" aria-hidden="true"><rect x="5" y="10.5" width="14" height="10" rx="2.5"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/></svg>';
const lockBadge=()=>`<span class="lock-b">${LOCKSVG}<span>${t('lockT')}</span></span>`;
/* a visible locked item: one-line benefit + "unlock" (opens the upgrade sheet) */
/* everything a free student cannot open yet sits behind one line they can expand; the open state survives re-renders */
const FOLD={};
const proFold=(id,txt,body,k,open)=>`<details class="pro-fold" data-fold="${id}" ${(FOLD[id]??!!open)?'open':''}><summary>${LOCKSVG}<span class="pf-t">${txt}</span><span class="pf-m"><span class="o0">${t('foldShow')}</span><span class="o1">${t('foldHide')}</span></span></summary><div class="pf-body"><button type="button" class="btn primary sm pf-cta" data-lock="${k}">${LOCKSVG} ${t('unlock')}</button>${body}</div></details>`;
/* wording for the accounts build, where progress is saved to the account and there are no backup files */
function tc(k){ if(document.querySelector('script[src*="cloud.js"]')){ const v=t(k+'Acct'); if(v&&v!==k+'Acct') return v; } return t(k); } /* a declaration: it is also called while the page is still starting */
/* a grid shows its first n cells; the rest sit behind "show all" (subscribers) or one lock tile (free) */
const mfold=(cells,n,lockK,nLocked)=>{ const first=cells.slice(0,n).join(''), rest=cells.slice(n);
  if(lockK) return `<div class="mgrid">${first}<div class="mcell"><button class="mbox locked more" data-lock="${lockK}"><span class="mb-n">${L(bi('للمشتركين','Pro'))}</span><b class="num">+${numL(nLocked)}</b><span class="mb-s">${LOCKSVG}</span></button></div></div>`;
  return `<div class="mgrid">${first}</div>${rest.length?`<details class="mfold"><summary>${L(bi(`عرض الكل (${numL(cells.length)})`,`Show all (${cells.length})`))}</summary><div class="mgrid">${rest.join('')}</div></details>`:''}`; };
const lockLine=(k,txt)=>`<button type="button" class="lock-line" data-lock="${k}">${LOCKSVG}<span class="ll-t">${txt||t('ben')[k]||''}</span><b>${t('unlock')}</b></button>`;
function hitLimit(k){ track('limit_hit',k); openUpgrade(k); }
/* tests: only the diagnostic is free (once); daily practice has a question budget */
const PRO_KINDS={verbal:'test',quant:'test',mock:'test',model:'test',skill:'skill'};
const diagTaken=()=>!!S.diag||S.attempts.some(a=>a.kind==='diag');
function dailyUsed(){ return S.dq&&S.dq.d===todayStr()?(S.dq.n||0):0; }
function dailyLeft(){ return PRO()?Infinity:Math.max(0,(+FREE.dailyQuestions||0)-dailyUsed()); }
function addDaily(n){ if(!n) return; const d=todayStr(); if(!S.dq||S.dq.d!==d) S.dq={d,n:0}; S.dq.n+=n; }
function gateTest(kind){ if(PRO()) return false;
  if(PRO_KINDS[kind]){ hitLimit(PRO_KINDS[kind]); return true; }
  if(kind==='diag'&&diagTaken()){ hitLimit('test'); return true; }
  if((kind==='session'||kind==='review')&&acct()&&dailyLeft()<=0){ hitLimit('daily'); return true; }
  return false; }
/* flashcards & vocabulary: the first cardsFrac of each skill's deck (interleaved across skills) */
const FLASH0=FLASH.slice(), VOC0={ar:VOCAB.ar.slice(),en:VOCAB.en.slice()};
let _fc=null;
function freeCards(){ const f=+FREE.cardsFrac||0; if(_fc&&_fc.f===f) return _fc;
  const per=ALL_SKILLS.map(s=>{ const a=FLASH0.filter(c=>c.sk===s); return a.slice(0,Math.ceil(a.length*f)); }); const order=[];
  for(let i=0;per.some(a=>i<a.length);i++) per.forEach(a=>{ if(a[i]) order.push(a[i].id); });
  return _fc={f,order,set:new Set(order)}; }
const cardOpen=c=>PRO()||freeCards().set.has(c.id);
const freeVocab=lang=>{ const a=VOC0[lang]||[]; return new Set(a.slice(0,Math.ceil(a.length*(+FREE.cardsFrac||0))).map(x=>x[0])); };
const techN=n=>PRO()?n:Math.ceil(n*(+FREE.techFrac||0));
/* explainers: lessons outside config.free.xp are not registered for free users; their titles come from this map */
const XPT={'al-vars':['algebra',5,"المتغيرات والعبارات الجبرية","Variables and expressions",3],'al-exp':['algebra',20,"الأسس والجذور","Exponents and roots",4],'al-seq':['algebra',30,"المتتابعات والأنماط","Sequences and patterns",4],'al-word':['algebra',40,"من المسألة اللفظية إلى معادلة","From word problem to equation",4],'an-types':['analogy',20,"أنواع العلاقات في التناظر","Types of analogy relationships",4],'an-tricky':['analogy',30,"تناظرات خادعة","Tricky analogies",3],'ar-order':['arith',10,"ترتيب العمليات الحسابية","Order of operations",3],'ar-frac':['arith',20,"الكسور من الصفر","Fractions from zero",4],'ar-dec':['arith',30,"الكسور العشرية والتحويل","Decimals and conversions",4],'ar-ratio':['arith',50,"النسبة والتناسب","Ratio and proportion",4],'cm-choices':['comparison',10,"الخيارات الأربعة في المقارنة","The four comparison choices",3],'cm-test':['comparison',20,"تجريب القيم","Testing values",4],'cm-simplify':['comparison',30,"بسّط قبل أن تحسب","Simplify before you calculate",3],'co-signals':['completion',10,"كلمات الإشارة في إكمال الجمل","Signal words in sentence completion",4],'co-twoblank':['completion',20,"الفراغان وتوافق المعنى","Two blanks and meaning agreement",4],'cx-what':['context',10,"ما الخطأ السياقي؟","What is a contextual error?",3],'cx-traps':['context',20,"الخطأ السياقي: استراتيجيات وفخاخ","Contextual errors: strategies and traps",4],'ge-angles':['geometry',10,"الزوايا والمستقيمات المتوازية","Angles and parallel lines",3],'ge-triangles':['geometry',20,"المثلث وزواياه","Triangles and their angles",3],'ge-area':['geometry',30,"المحيط والمساحة","Perimeter and area",4],'ge-pyth':['geometry',40,"نظرية فيثاغورس","The Pythagorean theorem",3],'ge-circle':['geometry',50,"الدائرة","The circle",3],'od-link':['odd',10,"المفردة الشاذة: ابحث عن الرابط","Odd one out: find the link",3],'od-deep':['odd',20,"روابط أدق وفخ الشكل","Finer links and the look-alike trap",4],'re-main':['reading',10,"الفكرة الرئيسة والتفاصيل","Main idea and details",3],'re-stated':['reading',20,"مذكور، مستنتج، أم غير مذكور؟","Stated, inferred, or not mentioned?",4],'re-strategy':['reading',30,"قراءة ذكية وسريعة","Read smart and fast",4],'st-mean':['stats',10,"المتوسط والوسيط والمنوال","Mean, median and mode",4],'st-prob':['stats',20,"الاحتمال من الصفر","Probability from zero",3],'st-charts':['stats',30,"قراءة الرسوم البيانية والجداول","Reading charts and tables",4],'percent':['arith',40,"النسبة المئوية من الصفر","Percentages from zero",4],'balance':['algebra',10,"المعادلة ميزان","An equation is a balance",4],'analogy':['analogy',10,"التناظر اللفظي: ابنِ الجسر","Analogies: build the bridge",4]};
const xpLang=k=>k.startsWith('en-')?'en':'ar';
function xpAllKeys(){ const k=window.CLOUD?.xpKeys?.all; return Array.isArray(k)&&k.length?k:Object.keys(XPT).flatMap(x=>[x,'en-'+x]); }
function lockedXp(s,lang=S.lang){ if(PRO()) return []; const reg=new Set(xpList(s,lang).map(x=>x.key)), free=new Set(FREE.xp||[]);
  return xpAllKeys().filter(k=>xpLang(k)===lang&&!reg.has(k)&&!free.has(k)).map(k=>{ const m=XPT[k.replace(/^en-/,'')]; return m&&m[0]===s?{key:k,sk:s,ord:m[1],title:m[lang==='ar'?2:3],min:m[4],locked:true}:null; }).filter(Boolean); }
function lockedXpCount(lang=S.lang){ return ALL_SKILLS.reduce((a,s)=>a+lockedXp(s,lang).length,0); }
/* premium explainers for subscribers: injected once, then narration tracks are reloaded */
let PREM=0;
function loadPremium(){ if(PREM||!window.CLOUD||!window.CLOUD.isPro?.()||!XPOK()) return; PREM=1;
  const s=document.createElement('script'); const pv=window.CLOUD.xpKeys&&window.CLOUD.xpKeys.pv; s.src='/api/xp/premium.js'+(pv?'?v='+pv:'');
  s.onload=()=>{ PREM=2; try{ XP.loadTracks(); }catch(e){} renderRoute(); };
  s.onerror=()=>{ PREM=0; s.remove(); };
  document.head.appendChild(s); }
/* real-progress facts for warm, specific upgrade messages */
function progressFacts(){
  const xpDone=Object.keys(S.xp||{}).filter(k=>xpLang(k)===S.lang).length, more=lockedXpCount();
  let best=null; if(S.diag&&S.diag.skills) for(const [s,b] of Object.entries(S.diag.skills)){ if(!b.t||!SKILLS[s]) continue; const i=skillInfo(s); if(i.n<5||i.acc==null) continue; const a=Math.round(100*b.c/b.t), c=Math.round(100*i.acc); if(c>a&&(!best||c-a>best.c-best.a)) best={s,a,c}; }
  return {xpDone,more,best,days:(S.days||[]).length}; }
function ctxMsg(k){ const f=progressFacts(), out=[]; { const d=daysLeft(); if(d!=null&&d>0) out.push(L(bi(`باقي ${numL(d)} ${d<=10?'أيام':'يومًا'} على اختبارك، والاشتراك يغطيك حتى يومه.`,`${d} days to your test; a subscription covers you until the day.`))); }
  if(k==='daily') out.push(t('ctxDaily')(numL(FREE.dailyQuestions)));
  if(f.xpDone) out.push(t('ctxXp')(numL(f.xpDone)));
  if(f.best) out.push(t('ctxAcc')(SKILLS[f.best.s][S.lang],numL(f.best.a),numL(f.best.c)));
  else if(f.days>=2) out.push(t('ctxDays')(numL(f.days)));
  if(f.more&&(f.xpDone||k==='xp')) out.push(t('ctxMore')(numL(f.more)));
  return out.join(' ')||t('ctxStart'); }
/* at most one unsolicited prompt per tab session, and one per day per account (S.nudgeD syncs across devices) */
let NUDGE=null;
function maybeNudge(reason){ if(PRO()||!CLOUD_BUILD||!window.CLOUD?.user) return; if(S.nudgeD===todayStr()) return; try{ if(sessionStorage.getItem('masar100_nudged')) return; sessionStorage.setItem('masar100_nudged','1'); }catch(e){ if(NUDGE) return; }
  S.nudgeD=todayStr(); save();
  NUDGE={reason,msg:ctxMsg(reason)}; { const tq=$('#toast'); if(tq){ clearTimeout(toastT); tq.hidden=true; } } /* the toast would cover the nudge's buttons */ renderNudge(); }
function renderNudge(){ let el=$('#nudge'); if(!NUDGE){ if(el) el.remove(); return; }
  if(!el){ el=document.createElement('div'); el.id='nudge'; el.setAttribute('role','status'); document.body.appendChild(el); }
  el.dir=S.lang==='ar'?'rtl':'ltr'; el.lang=S.lang;
  el.innerHTML=`<div class="nudge-in"><span class="eyebrow">${t('nudgeT')}</span><p>${esc(NUDGE.msg)}</p><div class="row"><button class="btn primary sm" id="ng-go">${t('upgradeBtn')}</button><button class="btn ghost sm" id="ng-x">${t('later')}</button></div></div>`;
  el.querySelector('#ng-go').onclick=()=>{ const r=NUDGE.reason; NUDGE=null; renderNudge(); track('limit_hit',r); openUpgrade(r); };
  el.querySelector('#ng-x').onclick=()=>{ NUDGE=null; renderNudge(); }; }
/* trial report: after trialReportDays since the first use or the diagnostic */
function startDate(){ return [S.since,S.diag&&S.diag.date,(S.days||[])[0],(S.attempts[0]||{}).date].filter(Boolean).sort()[0]||todayStr(); }
const daysBetween=(a,b)=>Math.round((new Date(b+'T12:00:00')-new Date(a+'T12:00:00'))/864e5);
const reportDays=()=>+(CFG()?.trialReportDays??14);
const reportReady=()=>daysBetween(startDate(),todayStr())>=reportDays();

/* ============ QUESTION BUILDING ============ */
function materialize(raw,lang){
  let opts,ans=raw.a??0; const cmp=!!raw.cmp;
  opts=cmp?COMPARE_OPTS[lang].slice():(raw.o||[]).map(o=>typeof o==='object'?o[lang]:o);
  const q=typeof raw.q==='object'?raw.q[lang]:raw.q, exp=typeof raw.e==='object'?raw.e[lang]:raw.e;
  const passage=raw.p?PASSAGES[lang][raw.p]:null;
  if(!(cmp||raw.s==='context')){ const correct=opts[ans]; opts=shuffle(opts); ans=opts.indexOf(correct); }
  return {s:raw.s,area:SKILLS[raw.s].area,q,passage,pkey:raw.p||null,opts,ans,exp,cmp};
}
const bank=lang=>lang==='ar'?VB_AR:VB_EN;
const VGEN={analogy:[genAnalogy,.6],odd:[genOdd,.7],completion:[genProverb,.3]};
let ROT=null; const _ord={};
function stableOrder(key,arr){ if(!_ord[key]){ let h=0; for(const c of key) h=(h*31+c.charCodeAt(0))|0; const r=mulberry(h); const a=arr.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(r()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } _ord[key]=a; } return _ord[key]; }
function rotTake(key,pool,n,per){ const o=stableOrder(key,pool); ROT.c[key]=ROT.c[key]||0; const start=(ROT.k*per)%o.length; const out=[]; for(let i=0;i<n;i++) out.push(o[(start+ROT.c[key]+i)%o.length]); ROT.c[key]+=n; return out; }
let NOFD=false;
function takeVerbal(skill,n,lang,used){
  const pool=bank(lang).filter(x=>x.s===skill&&!(NOFD&&FDVB.has(x))); const out=[];
  const g=VGEN[skill]; const nGen=g?Math.round(n*g[1]):0;
  for(let i=0;i<nGen;i++) out.push(g[0](lang));
  if(ROT) return shuffle(out.concat(rotTake(lang+skill,pool,n-nGen,(n-nGen)*ROT.vs)));
  let fresh=shuffle(pool.filter(x=>!used.has(x)));
  while(out.length<n){ if(!fresh.length) fresh=shuffle(pool); const x=fresh.pop(); used.add(x); out.push(x); }
  return shuffle(out);
}
function takeReading(np,lang,used){
  const b=bank(lang).filter(x=>x.s==='reading'&&!(NOFD&&FDVB.has(x))); let keys;
  if(ROT) keys=rotTake(lang+'P',[...new Set(b.map(x=>x.p))],np,np*ROT.vs);
  else { keys=shuffle([...new Set(b.map(x=>x.p))]); keys.sort((a,c)=>(used.has('P:'+a)?1:0)-(used.has('P:'+c)?1:0)); keys=keys.slice(0,np); }
  const out=[]; keys.forEach(k=>{ used.add('P:'+k); b.filter(x=>x.p===k).forEach(x=>out.push(x)); }); return out;
}
function takeQuant(skill,n,used){
  const pool=QB.filter(x=>x.s===skill); const nf=Math.min(pool.length,Math.ceil(n*.35)); let out=[];
  if(ROT) out=rotTake('Q'+skill,pool,nf,nf*ROT.qs);
  else { const fixed=shuffle(pool.filter(x=>!used.has(x))); for(let i=0;i<Math.min(nf,fixed.length);i++){ used.add(fixed[i]); out.push(fixed[i]); } }
  while(out.length<n) out.push(GENS[pick(GEN_BY_SKILL[skill])]());
  return shuffle(out);
}
/* the official guide: five sections of 24 questions (120 in 2 h 5 min). The 55/45 (science) and 75/25 (theoretical) figures are the score weights used by W(); the section order follows the paper form */
const mockOrder=()=>S.track==='sci'?['V','Q','V','Q','V']:['V','V','Q','V','V'];
function modelSections(k,lang){
  const ord=mockOrder();
  ROT={k,c:{},vs:ord.filter(x=>x==='V').length,qs:ord.filter(x=>x==='Q').length}; const prev=rnd; rnd=mulberry(90001+k*7919+(S.track==='sci'?0:500)+(lang==='ar'?0:250));
  try{ const u=new Set(); return ord.map(a=>({a,qs:a==='V'?verbalSection(lang,u):quantSection(lang,u)})); } finally { rnd=prev; ROT=null; }
}
function buildSkill(skill,n,lang,used=new Set()){
  let raws; if(SKILLS[skill].area==='V') raws= skill==='reading'? shuffle(takeReading(Math.ceil(n/4)+1,lang,used)).slice(0,n) : takeVerbal(skill,n,lang,used); else raws=takeQuant(skill,n,used);
  return raws.map(r=>materialize(r,lang));
}
function verbalSection(lang,used){ NOFD=true; try{ return verbalSection0(lang,used); } finally { NOFD=false; } }
function verbalSection0(lang,used){ const rd=takeReading(2,lang,used); let qs=[]; [['analogy',6],['completion',4],['context',4],['odd',2]].forEach(([s,n])=>qs=qs.concat(takeVerbal(s,n,lang,used)));
  let gap=24-qs.length-rd.length; while(gap>0){ qs.push(gap%2?genAnalogy(lang):genProverb(lang)); gap--; }
  return shuffle(qs).concat(rd).map(r=>materialize(r,lang)); }
function quantSection(lang,used){ const mix=S.track==='sci'?[['arith',7],['algebra',4],['geometry',5],['stats',4],['comparison',4]]:[['arith',8],['algebra',2],['geometry',6],['stats',4],['comparison',4]]; let qs=[]; mix.forEach(([s,n])=>qs=qs.concat(takeQuant(s,n,used))); return shuffle(qs).map(r=>materialize(r,lang)); }
/* diagnostic: 2 questions in each of the 10 skills (quant first, then verbal; reading = 2 questions on one passage) */
function diagSet(lang){ const u=new Set(); let q=[]; Q_SKILLS.forEach(sk=>q=q.concat(takeQuant(sk,2,u))); let v=[]; V_SKILLS.filter(sk=>sk!=='reading').forEach(sk=>v=v.concat(takeVerbal(sk,2,lang,u)));
  const rd=takeReading(1,lang,u).slice(0,2); return shuffle(q).map(r=>materialize(r,lang)).concat(shuffle(v).concat(rd).map(r=>materialize(r,lang))); }
/* a re-served mistake comes back with its options in a new order, so the student recalls the reasoning, not the letter */
function reserve(m){ const q={...m,rep:1}; if(!q.cmp&&q.s!=='context'&&Array.isArray(q.opts)){ const c=q.opts[q.ans]; q.opts=shuffle(q.opts.slice()); q.ans=q.opts.indexOf(c); } return q; }
function sessionPlan(lang=S.lang){ const due=dueList(lang).slice(0,8); const weak=rankSkills().slice(0,2).map(x=>x.s); return {due,weak,nWeak:10,nMix:25-due.length-10}; }
function sessionSet(lang){
  const p=sessionPlan(lang), used=new Set(); let qs=p.due.map(reserve);
  /* a due review and a fresh copy of the same bank question must not both appear: mark the sources of the due items as used */
  { const dk=new Set(qs.map(m=>m.key)); const rawKey=r=>{ const q=typeof r.q==='object'?r.q[lang]:r.q, o=r.cmp?COMPARE_OPTS[lang][r.a]:(r.o||[])[r.a??0]; return q+'|'+(o&&typeof o==='object'?o[lang]:o)+'|'+(r.p||''); };
    if(dk.size) [...bank(lang),...QB].forEach(r=>{ if(dk.has(rawKey(r))){ used.add(r); if(r.p) used.add('P:'+r.p); } }); }
  p.weak.forEach(s=>qs=qs.concat(buildSkill(s,5,lang,used)));
  const pool=rankSkills(); const w=pool.map(x=>x.level<4?3:1); const tot=w.reduce((a,b)=>a+b,0);
  for(let i=0;i<p.nMix;i++){ let r=Math.random()*tot,k=0; while(k<w.length-1&&r>w[k]){ r-=w[k]; k++; } qs=qs.concat(buildSkill(pool[k].s,1,lang,used)); }
  return shuffle(qs);
}
const qKey=q=>q.q+'|'+q.opts[q.ans]+'|'+(q.pkey||'');

/* ============ TEST ENGINE ============ */
let X=null,timer=null;
let PEND=null;
/* accounts build: a student must sign up (or sign in) before any test or practice, except the first diagnostic */
function authGate(kind,o){ const C=window.CLOUD; if(!C||C.user) return false;
  if(kind==='diag'&&!getOwner()) return false; /* first value before the sign-up form: the result is kept on the device and joins the account when one is created */
  if(C.ready===false){ setTimeout(()=>startTest(kind,o),300); return true; }
  if(C.offline&&getOwner()) return false; /* known account, server unreachable: work locally, sync later */
  PEND={kind,o}; AC.tab='signup'; AC.gate=true; openAcct(); return true; }
function startTest(kind,o={}){
  if(gateTest(kind)) return;
  if(authGate(kind,o)) return;
  const lang=S.lang,used=new Set(); let sections=[],title='',mode='exam';
  const sec=(name,qs,min)=>({name,qs,left:Math.round(min*60),ans:Array(qs.length).fill(null),flag:Array(qs.length).fill(false),tsp:Array(qs.length).fill(0),locked:Array(qs.length).fill(false)});
  if(kind==='diag'){ title=t('pDiag'); sections=[sec(title,diagSet(lang),15)]; }
  else if(kind==='verbal'){ title=t('pVerbal'); sections=[sec(title,verbalSection(lang,used),25)]; }
  else if(kind==='quant'){ title=t('pQuant'); sections=[sec(title,quantSection(lang,used),25)]; }
  else if(kind==='mock'){ title=t('pMock'); const ord=mockOrder();
    sections=ord.map((a,i)=>sec(`${t('sectionLabel')} ${numL(i+1)} · ${a==='V'?t('vShort'):t('qShort')}`,a==='V'?verbalSection(lang,used):quantSection(lang,used),25)); }
  else if(kind==='model'){ title=`${t('model')} ${numL(o.k+1)}`; sections=modelSections(o.k,lang).map((x,i)=>sec(`${t('sectionLabel')} ${numL(i+1)} · ${x.a==='V'?t('vShort'):t('qShort')}`,x.qs,25)); }
  else if(kind==='rs'){ if(!PRO()&&o.k>=RS_FREE){ hitLimit('test'); return; } const r=rsSection(o.k); title=`${t('rsOne')} ${numL(o.k+1)} · ${r.name[lang]}`; sections=[sec(title,rsQuestions(o.k,lang),13)]; }
  else if(kind==='fd'){ const l=fdLesson(o.id); if(!l) return; if(!fdOpen(o.id)){ hitLimit('skill'); return; } mode='learn'; title=`${l[lang].t}`; sections=[sec(title,fdQuestions(o.id,lang),15)]; o.k=o.id; }
  else if(kind==='skill'){ mode='learn'; title=SKILLS[o.skill][lang]; sections=[sec(title,buildSkill(o.skill,10,lang,used),15)]; }
  else if(kind==='session'){ mode='learn'; title=t('sessionTitle'); let qs=sessionSet(lang); const left=dailyLeft(); if(qs.length>left) qs=qs.slice(0,left); sections=[sec(title,qs,Math.max(5,Math.round(qs.length*1.3)))]; }
  else if(kind==='review'){ const d=dueList(lang).slice(0,Math.min(20,dailyLeft())); if(!d.length){ toast(t('noDue')); return; } mode='learn'; title=t('pReview'); sections=[sec(title,d.map(reserve),Math.max(5,d.length*1.5))]; }
  vpage('exam-'+kind); vstep('test_start');
  X={kind,title,mode,sections,si:0,qi:0,lang,task:o.task||null,skill:o.skill||null,mk:o.k,qStart:Date.now(),tickAt:Date.now(),confirm:null,showMap:false};
  try{ document.activeElement?.blur?.(); }catch(e){}
  examShow(true);
  clearInterval(timer); timer=setInterval(tick,1000); renderExam();
  track('test_start',kind); if(kind==='diag') track('diag_start');
}
/* the test screen is a full-page dialog: the page behind it is made inert so Tab stays inside */
function examShow(on){ const el=$('#exam'); document.body.classList.toggle('exam-open',on); el.hidden=!on; overlayInert();
  if(on){ el.tabIndex=-1; setTimeout(()=>{ if(!el.contains(document.activeElement)) el.focus({preventScroll:true}); },0); } }
const cur=()=>X.sections[X.si];
const clock=s=>{ s=Math.max(0,Math.round(s)); return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`; };
/* the clock follows wall time, not the number of interval ticks: a backgrounded tab (browsers run timers about once a minute there) or a locked phone
   still spends its seconds, as in the real test. Only a reload pauses it (see checkLive). X.tickAt keeps the fraction of a second, so nothing drifts. */
function tick(){ if(!X||X.result||X.reviewOnly||X.between) return; const s=cur(), now=Date.now(); if(!X.tickAt) X.tickAt=now;
  if(X.mode==='learn'&&document.hidden){ X.tickAt=now; X.qStart=now; return; } /* practice with instant feedback is not an exam: time away from the tab is not charged */
  const dt=Math.floor((now-X.tickAt)/1000); if(dt<1) return; X.tickAt+=dt*1000;
  /* practice shows the time spent, with no countdown pressure; timed tests count down */
  if(X.mode==='learn'){ s.el=(s.el||0)+dt; if(now-(X.liveAt||0)>=10000){ X.liveAt=now; saveLive(); } const el=$('#ex-timer'); if(el) el.textContent=clock(s.el); return; }
  const was=s.left; s.left=Math.max(0,s.left-dt);
  if(now-(X.liveAt||0)>=10000){ X.liveAt=now; saveLive(); } const el=$('#ex-timer'); if(el){ el.textContent=clock(s.left); el.classList.toggle('low',s.left<=180); }
  const cross=v=>was>v&&s.left<=v, blank=s.ans.filter(x=>x==null).length;
  if(cross(300)) announce(L(bi('باقي خمس دقائق على نهاية القسم.','Five minutes left in this section.')));
  if(cross(120)&&blank) { const m=L(bi(`باقي دقيقتان و${numL(blank)} ${blank<=10?'أسئلة':'سؤالًا'} بلا إجابة. لا خصم على الخطأ، فلا تترك سؤالًا فارغًا.`,`Two minutes left and ${blank} unanswered. Wrong answers cost nothing, so leave none blank.`)); toast(m); announce(m); }
  else if(cross(60)) announce(L(bi('باقي دقيقة واحدة.','One minute left.')));
  if(s.left<=0){ toast(t('timeUp')); closeSection(); } }
/* screen readers hear time warnings without the timer being read every second */
function announce(msg){ let a=document.getElementById('sr-live'); if(!a){ a=document.createElement('div'); a.id='sr-live'; a.className='sr-only'; a.setAttribute('aria-live','assertive'); a.setAttribute('role','alert'); document.body.appendChild(a); } a.textContent=''; setTimeout(()=>{ a.textContent=msg; },50); }
function logTime(){ const s=cur(); const n=Date.now(); if(!s.locked[X.qi]) s.tsp[X.qi]+=(n-X.qStart)/1000; X.qStart=n; }
function go(i){ logTime(); X.qi=Math.max(0,Math.min(cur().qs.length-1,i)); X.confirm=null; X.showMap=false; renderExam(); $('#exam').scrollTop=0; }
function choose(k){ const s=cur(); if(s.locked[X.qi]) return; s.ans[X.qi]=k; if(X.mode==='learn'){ logTime(); s.locked[X.qi]=true; } renderExam();
  if(X.mode==='learn') requestAnimationFrame(()=>{ try{ $('#exam .fb')?.scrollIntoView({block:'nearest',behavior:SMOOTH()}); }catch(e){} }); }
function closeSection(){ logTime(); X.confirm=null; if(X.si<X.sections.length-1){ X.si++; X.qi=0; X.between=true; /* a pause screen before the next section; its clock starts on "start" */ renderExam(); } else finishTest(); }
function answeredN(){ return X.sections.reduce((a,s)=>a+s.ans.filter(x=>x!=null).length,0); }
function quitTest(){ takePending(); if(X&&!X.result&&!X.reviewOnly&&(X.kind==='session'||X.kind==='review')){ addDaily(answeredN()); save(); }
  const nudge=X&&X.result&&!X.reviewOnly&&(X.kind==='session'||X.kind==='review')&&!PRO()&&dailyLeft()<=0;
  clearInterval(timer); clearLive(); const wasX=!!X; X=null; examShow(false); if(wasX) vpage((location.hash||'#today').slice(1).split(/[?-]/)[0]||'today'); if(nudge) maybeNudge('daily'); }
function finishTest(){
  if(!X||X.result||X.reviewOnly) return;
  clearInterval(timer); clearLive(); takePending(); const d=todayStr(); const INT=[1,3,7,14];
  const all=[]; X.sections.forEach(s=>s.qs.forEach((q,i)=>all.push({q,your:s.ans[i],time:s.tsp[i],flag:!!s.flag[i]})));
  const bySkill={};
  all.forEach(({q,your,time})=>{
    const ok=your===q.ans, st=S.stats[q.s]||(S.stats[q.s]={c:0,t:0,time:0}); st.t++; st.time+=time; if(ok) st.c++;
    S.recent.push(Object.assign({s:q.s,ok,t:Math.round(time),d},X.kind==='fd'?{src:'fd'}:q.rep?{src:'rep'}:null)); const b=bySkill[q.s]||(bySkill[q.s]={c:0,t:0}); b.t++; if(ok) b.c++;
    const key=q.key||qKey(q); q.key=key; const m=S.mistakes.find(x=>x.key===key), now=Date.now();
    if(ok&&m&&(m.box||0)<4){ if((m.due||d)<=d){ m.box=(m.box||0)+1; m.at=now; if(m.box>=4) delete m.due; /* closed: kept as a tombstone */ else m.due=addDays(d,INT[m.box]); } }
    else if(!ok&&!(your==null&&X.mode==='exam')){ if(m){ m.box=0; m.due=addDays(d,1); m.at=now; } else S.mistakes.push({key,s:q.s,area:q.area,q:q.q,passage:q.passage,pkey:q.pkey,opts:q.opts,ans:q.ans,exp:q.exp,cmp:q.cmp,lang:X.lang,box:0,due:addDays(d,1),at:now}); }
  });
  if(S.recent.length>1500) S.recent=S.recent.slice(-1500); capMistakes();
  const correct=all.filter(x=>x.your===x.q.ans).length, skipped=all.filter(x=>x.your==null).length;
  const est=['diag','mock','model','verbal','quant'].includes(X.kind)?estimate(all.map(x=>({s:x.q.s,ok:x.your===x.q.ans}))):null;
  const att={id:Date.now().toString(36),date:d,kind:X.kind,skill:X.skill,mk:X.kind==='model'||X.kind==='rs'?X.mk+1:undefined,correct,total:all.length,pct:Math.round(100*correct/Math.max(1,all.length)),est,time:Math.round(all.reduce((a,x)=>a+x.time,0))};
  S.attempts.push(att); if(S.attempts.length>300) S.attempts=S.attempts.slice(-300);
  if(!S.days.includes(d)){ S.days.push(d); const st=calcStreak(); if([3,7,14,30,60].includes(st)) setTimeout(()=>toast(L(bi(`🔥 ${numL(st)} ${st<=10?'أيام متتالية':'يومًا متتاليًا'}! استمر.`,`🔥 ${st} days in a row! Keep going.`))),1600); } if(X.kind==='session'&&!S.sessionDays.includes(d)) S.sessionDays.push(d);
  if(X.task) S.done[X.task]=true;
  { const pt=S.planTask, sk=X.kind==='skill'?X.skill:X.kind==='fd'?(fdLesson(X.mk)||{}).sk:null; if(pt&&sk&&(pt.skill===sk||(SK_FDU[pt.skill]||[]).includes((fdLesson(X.mk)||{}).u))){ S.done[pt.id]=true; delete S.planTask; } }
  if(X.kind==='session'||X.kind==='review') addDaily(all.filter(x=>x.your!=null).length);
  if(X.kind==='diag'&&!S.diag){ const sk={}; for(const [k,b] of Object.entries(bySkill)) sk[k]={c:b.c,t:b.t}; S.diag={date:d,pct:att.pct,skills:sk}; }
  if(X.kind==='fd'&&X.mk){ const m=S.fd[X.mk]||{}; m.last=att.pct; m.best=Math.max(m.best||0,att.pct); m.date=d; S.fd[X.mk]=m; }
  if(X.kind==='rs'){ const m=S.rs[X.mk]||{}; m.last=att.pct; m.best=Math.max(m.best||0,att.pct); m.date=d; m.aid=att.id; S.rs[X.mk]=m; }
  if(X.kind==='model'){ const m=S.models[X.mk]||{}; m.last=att.pct; m.est=est; m.best=Math.max(m.best||0,att.pct); m.date=d; m.aid=att.id; S.models[X.mk]=m; }
  saveDetail(att,all);
  save();
  track('test_done',X.kind,att.pct); if(X.kind==='diag') track('diag_done',null,att.pct); guideTested(); vstep('test_done'); vpage('result-'+X.kind);
  X.result={all,bySkill,correct,skipped,att,filter:'wrong'}; renderExam(); renderRoute(); { const st=calcStreak(); toast(STORE_OK?(window.CLOUD&&CLOUD.user?t('resultSaved'):L(bi('حُفظت نتيجتك على هذا الجهاز','Your result is saved on this device')))+(st>1?` · ${t('kStreak')}: ${numL(st)}`:''):tc('saveFail')); }
}

function renderExam(){
  const el=$('#exam'); if(!X) return; el.dir=X.lang==='ar'?'rtl':'ltr'; el.lang=X.lang; el.setAttribute('role','dialog'); el.setAttribute('aria-modal','true'); el.setAttribute('aria-label',X.title||t('brand'));
  if(X.result) return renderResult(el);
  saveLive();
  /* the screen is redrawn on every action: remember the focused control so keyboard users keep their place */
  const ae=document.activeElement, fk=ae&&ae!==el&&el.contains(ae)?(ae.id?'#'+ae.id:ae.dataset.k!=null?`.opt[data-k="${ae.dataset.k}"]`:ae.dataset.i!=null?`.dot[data-i="${ae.dataset.i}"]`:null):null;
  if(fk) setTimeout(()=>{ if(!X||X.result) return; const n=el.querySelector(fk); if(n&&!n.disabled) n.focus({preventScroll:true}); else if(!el.contains(document.activeElement)) el.focus({preventScroll:true}); },0);
  if(X.between) return renderBetween(el);
  const s=cur(), q=s.qs[X.qi], tt=T[X.lang], L4=tt.letters, locked=s.locked[X.qi], a=s.ans[X.qi];
  const answered=s.ans.filter(x=>x!=null).length, last=X.qi===s.qs.length-1, lastSec=X.si===X.sections.length-1;
  const pct=Math.round(100*(X.qi+1)/s.qs.length);
  const optClass=k=>{ if(X.mode==='learn'&&locked){ if(k===q.ans) return 'right'; if(k===a) return 'wrong'; return 'dim'; } return a===k?'sel':''; };
  el.innerHTML=`
  <div class="ex-top">
    <button class="icon-btn" id="ex-quit" aria-label="${tt.quit}">${ICON.x}</button>
    <div class="ex-title"><strong>${esc(X.title)}</strong><span>${tt.q} ${numL(X.qi+1)} ${tt.of} ${numL(s.qs.length)}${s.name!==X.title?' · '+esc(s.name):''}</span></div>
    <div class="ex-timer ${X.mode!=='learn'&&s.left<=180?'low':''} ${X.mode==='learn'?'el':''}" id="ex-timer" role="timer" aria-label="${X.mode==='learn'?L(bi('الوقت المستغرق','Time spent')):L(bi('الوقت المتبقي في القسم','Time left in this section'))}">${clock(X.mode==='learn'?(s.el||0):s.left)}</div>
  </div>
  <div class="ex-bar"><span style="inline-size:${pct}%"></span></div>
  ${X.confirm?`<div class="ex-confirm"><p>${X.confirm==='quit'?(X.mode==='exam'?L(bi('احفظ الاختبار وأكمله لاحقًا من حيث توقفت، أو اخرج دون حفظ.','Save the test and finish it later from where you stopped, or exit without saving.')):tt.quitConfirm):`<b>${lastSec?tt.finishQ:tt.endSecQ}</b> ${X.sections.length>1&&!lastSec?tt.confirmEnd:''} ${s.qs.length-answered?`${numL(s.qs.length-answered)} ${tt.unanswered}.`:''}`}</p><div class="row">${X.confirm==='quit'&&X.mode==='exam'?`<button class="btn primary" id="cf-save">${L(bi('احفظ واخرج','Save and exit'))}</button>`:''}<button class="btn ${X.confirm==='quit'?'danger':'primary'}" id="cf-yes">${X.confirm==='quit'?(X.mode==='exam'?L(bi('اخرج دون حفظ','Exit without saving')):tt.yesQuit):(lastSec?tt.finishTest:tt.yesEnd)}</button><button class="btn ghost" id="cf-no">${tt.cancel}</button></div></div>`:''}
  ${X.showMap?`<div class="ex-mapwrap"><div class="ex-map">${s.qs.map((_,i)=>`<button class="dot ${i===X.qi?'cur':''} ${s.ans[i]!=null?'ans':''} ${s.flag[i]?'fl':''}" data-i="${i}" ${i===X.qi?'aria-current="true"':''} aria-label="${L(bi('سؤال','Question'))} ${numL(i+1)}، ${s.ans[i]!=null?L(bi('مجاب','answered')):L(bi('بلا إجابة','unanswered'))}${s.flag[i]?'، '+L(bi('معلَّم','flagged')):''}">${numL(i+1)}</button>`).join('')}</div><p class="ex-leg small">${tt.mapLeg(numL(answered),numL(s.flag.filter(Boolean).length),numL(s.qs.length-answered))}</p></div>`:''}
  <div class="ex-body ${q.passage?'with-passage':''}">
    ${q.passage?`<aside class="ex-passage"><div class="eyebrow">${tt.passage}</div><p>${esc(q.passage)}</p></aside>`:''}
    <section class="ex-q">
      <div class="ex-qhead"><span class="chip">${SKILLS[q.s][X.lang]}</span>${q.box!=null?`<span class="chip sand">${tt.kinds.review}</span>`:''}</div>
      <div class="ex-stem ${q.s==='analogy'?'analogy':''}">${q.cmp?`<div class="eyebrow">${COMPARE_INTRO[X.lang]}</div>`:''}${stem(q.q)}</div>
      <div class="ex-opts">${q.opts.map((o,k)=>`<button class="opt ${optClass(k)}" data-k="${k}" aria-pressed="${a===k}" ${locked?'disabled':''}><span class="bub">${X.mode==='learn'&&locked&&k===q.ans?ICON.check:X.mode==='learn'&&locked&&k===a?ICON.xmark:L4[k]}</span><span class="otx">${optH(o)}</span></button>`).join('')}</div>
      ${X.mode==='learn'&&locked?`<div class="fb ${a===q.ans?'ok':'bad'}" role="status"><strong><span class="fb-i" aria-hidden="true">${a===q.ans?ICON.check:ICON.xmark}</span>${a===q.ans?tt.correctFb:tt.wrongFb+': '+L4[q.ans]}</strong><p>${M(esc(q.exp))}</p></div>`:''}
    </section>
  </div>
  <div class="ex-foot"><div class="ex-foot-in">
    <button class="btn ghost ex-nav" id="ex-prev" ${X.qi===0?'disabled':''}><span class="arr-b">${ICON.arrow}</span><span>${tt.prev}</span></button>
    ${X.mode==='exam'?`<button class="btn ghost ex-tool ${s.flag[X.qi]?'flagged':''}" id="ex-flag" aria-pressed="${!!s.flag[X.qi]}">${ICON.flag}<span class="l-long">${s.flag[X.qi]?tt.flagged:tt.flag}</span><span class="l-short">${s.flag[X.qi]?tt.flagged:tt.flagS}</span></button>`:''}
    <button class="btn ghost ex-tool ${X.showMap?'on':''}" id="ex-map" aria-expanded="${!!X.showMap}">${ICON.grid}<span class="l-long">${tt.map}</span><span class="l-short">${tt.mapS}</span></button>
    ${last?`<button class="btn primary ex-nav" id="ex-end">${lastSec?tt.finishTest:tt.finishSection}</button>`:`<button class="btn primary ex-nav" id="ex-next"><span>${tt.next}</span>${ICON.arrow}</button>`}
  </div></div>`;
  el.querySelectorAll('.opt').forEach(b=>b.onclick=()=>choose(+b.dataset.k));
  el.querySelectorAll('.dot').forEach(b=>b.onclick=()=>go(+b.dataset.i));
  const on=(id,f)=>{ const b=el.querySelector(id); if(b) b.onclick=f; };
  on('#ex-prev',()=>go(X.qi-1)); on('#ex-next',()=>go(X.qi+1));
  on('#ex-flag',()=>{ s.flag[X.qi]=!s.flag[X.qi]; renderExam(); });
  on('#ex-map',()=>{ X.showMap=!X.showMap; renderExam(); });
  on('#ex-end',()=>{ X.confirm='end'; renderExam(); }); on('#ex-quit',()=>{ X.confirm='quit'; renderExam(); });
  on('#cf-no',()=>{ X.confirm=null; renderExam(); }); on('#cf-yes',()=>X.confirm==='quit'?quitTest():closeSection()); on('#cf-save',saveExit);
}
function renderBetween(el){ const s=cur(), tt=T[X.lang];
  el.innerHTML=`<div class="ex-top"><button class="icon-btn" id="ex-quit" aria-label="${tt.quit}">${ICON.x}</button><div class="ex-title"><strong>${esc(X.title)}</strong><span>${esc(s.name)}</span></div><div class="ex-timer" id="ex-timer">${clock(s.left)}</div></div>
  <div class="rs ex-between">${X.confirm==='quit'?`<div class="ex-confirm"><p>${tt.quitConfirm}</p><div class="row"><button class="btn danger" id="cf-yes">${tt.yesQuit}</button><button class="btn ghost" id="cf-no">${tt.cancel}</button></div></div>`:''}
    <section class="card center"><div class="eyebrow">${tt.secDone(numL(X.si))}</div><h2>${esc(s.name)}</h2><p>${tt.secNext(numL(s.qs.length),numL(Math.round(s.left/60)))}</p><p class="small muted">${tt.secNoBack}</p><button class="btn primary xl" id="ex-go">${tt.secStart}</button></section></div>`;
  const on=(id,f)=>{ const b=el.querySelector(id); if(b) b.onclick=f; };
  on('#ex-go',()=>{ X.between=false; X.confirm=null; X.qStart=Date.now(); X.tickAt=Date.now(); renderExam(); el.scrollTop=0; });
  on('#ex-quit',()=>{ X.confirm='quit'; renderExam(); }); on('#cf-no',()=>{ X.confirm=null; renderExam(); }); on('#cf-yes',quitTest);
  setTimeout(()=>el.querySelector('#ex-go')?.focus(),0); }
document.addEventListener('keydown',e=>{
  if(!X||X.result||X.between||/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
  const map={'1':0,'2':1,'3':2,'4':3,'a':0,'b':1,'c':2,'d':3,'أ':0,'ب':1,'ج':2,'د':3};
  if(X.confirm||e.ctrlKey||e.metaKey||e.altKey) return;
  if(e.key in map){ e.preventDefault(); choose(map[e.key]); }
  else if(e.key==='Enter'&&!e.target.closest?.('button:not(.opt),a,summary')){ e.preventDefault(); if(X.qi<cur().qs.length-1) go(X.qi+1); } /* a focused button keeps its own Enter */
  else if(e.key==='ArrowLeft'){ e.preventDefault(); go(X.qi+(X.lang==='ar'?1:-1)); } else if(e.key==='ArrowRight'){ e.preventDefault(); go(X.qi+(X.lang==='ar'?-1:1)); }
});
function renderResult(el){
  const r=X.result,tt=T[X.lang],a=r.att,L4=tt.letters; const avg=a.total?Math.round(a.time/a.total):0;
  const list=r.all.map((x,i)=>({...x,i})).filter(x=>r.filter==='all'||x.your!==x.q.ans);
  const nWrong=a.total-a.correct, tier=a.pct>=90?3:a.pct>=75?2:a.pct>=50?1:0;
  el.innerHTML=`
  <div class="ex-top"><div class="ex-title"><strong>${esc(X.title)}</strong><span>${X.reviewOnly?tt.reviewOf+' '+dateLong(a.date):tt.resultTitle}</span></div>${X.reviewOnly&&(X.kind==='model'||X.kind==='rs')&&X.mk!=null?`<button class="btn ghost sm" id="rs-retake">${tt.retake}</button>`:''}<button class="btn primary sm" id="rs-close">${tt.done}</button></div>
  <div class="rs">
    <div class="rs-head card t${tier}"><div class="rs-top">${ring(a.pct,'%',120)}<div class="rs-verdict"><div class="eyebrow">${tt.resultE}</div><h2>${tt.verdict[tier]}</h2>${nWrong&&!r.noDetail?`<button class="btn primary sm" id="rs-go-rev">${tt.seeMistakes(numL(nWrong))}</button>`:''}</div></div><div class="rs-kpis">
      <div><b class="num">${numL(a.correct)}</b><span>${tt.correct}</span></div><div><b class="num">${r.skipped==null?'—':numL(a.total-a.correct-r.skipped)}</b><span>${tt.wrong}</span></div>
      <div><b class="num">${r.skipped==null?'—':numL(r.skipped)}</b><span>${tt.skipped}</span></div><div><b class="num">${numL(avg)}${tt.sec}</b><span>${tt.avgTime}</span></div>
      ${a.est!=null?(PRO()||X.kind==='diag'?`<div><b class="num">${numL(a.est)}</b><span>${tt.estGat}</span></div>`:`<div><button class="kpi-lock" data-lock="analytics" aria-label="${tt.estGat}: ${t('lockT')}">${LOCKSVG}</button><span>${tt.estGat}</span></div>`):''}</div>${X.kind==='diag'&&a.est!=null&&!PRO()?`<p class="rs-note small muted">${t('estFreeNote')}</p>`:''}</div>
    ${CLOUD_BUILD&&!acct()&&!X.reviewOnly?`<section class="card rs-save"><div><h3>${t('saveT')}</h3><p>${t('saveD')}</p></div><button class="btn primary" id="rs-save">${t('saveBtn')}</button></section>`:''}
    ${X.kind==='diag'&&!r.noDetail?diagBlock(r):''}
    ${r.noDetail?`<section class="card"><h3>${tt.summaryOnly}</h3><p class="muted">${tt.noDetail}</p></section>`:`${X.kind==='diag'?'':`<section class="card"><h3>${tt.bySkill}</h3>${Object.entries(r.bySkill).map(([s,b])=>barRow(SKILLS[s][X.lang],b.c/b.t,`${numL(b.c)}/${numL(b.t)}`)).join('')}</section>`}
    ${!PRO()&&!X.reviewOnly&&r.all.some(x=>x.your!==x.q.ans)?lockLine('analytics',t('ben').causes):''}
    <div class="rs-rev-head"><h3>${tt.review}</h3><div class="seg"><button class="${r.filter==='wrong'?'on':''}" data-f="wrong">${tt.onlyWrong}</button><button class="${r.filter==='all'?'on':''}" data-f="all">${tt.all}</button></div></div>
    <div class="rev-list">${list.map(x=>{ const ok=x.your===x.q.ans; const m=S.mistakes.find(z=>z.key===x.q.key); return `
      <article class="rev ${ok?'ok':'bad'}">
        <div class="rev-h"><span class="muted small">${tt.q} ${numL(x.i+1)}</span><span class="chip">${SKILLS[x.q.s][X.lang]}</span>${x.flag?`<span class="chip sand">${tt.flagged}</span>`:''}</div>
        ${x.q.passage?`<details class="rev-p"><summary>${tt.passage}</summary><p>${esc(x.q.passage)}</p></details>`:''}
        <div class="rev-stem">${x.q.cmp?`<div class="eyebrow">${COMPARE_INTRO[X.lang]}</div>`:''}${stem(x.q.q)}</div>
        <ul class="rev-opts">${x.q.opts.map((o,k)=>`<li class="${k===x.q.ans?'right':''} ${k===x.your&&!ok?'yours':''}"><span class="bub">${L4[k]}</span><span>${optH(o)}</span>${k===x.q.ans?`<em>${tt.rightAns}</em>`:''}${k===x.your&&!ok?`<em>${tt.yourAns}</em>`:''}</li>`).join('')}</ul>
        <p class="rev-exp"><strong>${tt.explain}:</strong> ${M(esc(x.q.exp))}</p>
        ${!ok&&m&&PRO()?`<div class="cause"><span class="small muted">${tt.causeQ}</span><div class="chips">${Object.entries(tt.causes).map(([k,v])=>`<button class="cchip ${m.cause===k?'on':''}" data-i="${x.i}" data-c="${k}">${v}</button>`).join('')}</div></div>`:''}
        ${sampleFn?`<div class="ai-slot"><button class="btn ghost sm ai-btn" data-i="${x.i}">${ICON.spark} ${tt.askAI}</button><div class="ai-out" id="ai-${x.i}"></div></div>`:''}
      </article>`; }).join('')||`<p class="muted">${tt.none}</p>`}</div>`}
  </div>`;
  el.querySelectorAll('[data-lock]').forEach(b=>b.onclick=()=>hitLimit(b.dataset.lock));
  const rx=el.querySelector('#rs-xp'); if(rx) rx.onclick=()=>{ const k=rx.dataset.k; quitTest(); XP_BACK=k; track('xp_start',k); XP.open(k); };
  { const g=el.querySelector('#rs-go-rev'); if(g) g.onclick=()=>{ r.filter='wrong'; renderResult(el); el.querySelector('.rs-rev-head')?.scrollIntoView({behavior:SMOOTH(),block:'start'}); }; }
  { const sv=el.querySelector('#rs-save'); if(sv) sv.onclick=()=>{ AC.tab='signup'; AC.gate=true; AC.gateSave=true; openAcct(); }; }
  el.querySelector('#rs-close').onclick=quitTest; const rt=el.querySelector('#rs-retake'); if(rt) rt.onclick=()=>{ const k=X.mk, kd=X.kind; quitTest(); startTest(kd==='rs'?'rs':'model',{k}); };
  el.querySelectorAll('.seg button').forEach(b=>b.onclick=()=>{ r.filter=b.dataset.f; renderResult(el); });
  el.querySelectorAll('.ai-btn').forEach(b=>b.onclick=()=>explainAI(r.all[+b.dataset.i],+b.dataset.i,b));
  el.querySelectorAll('.cchip').forEach(b=>b.onclick=()=>{ const key=r.all[+b.dataset.i].q.key; const m=S.mistakes.find(z=>z.key===key); if(!m) return; if(m.cause) S.causes[m.cause]=Math.max(0,(S.causes[m.cause]||0)-1); m.cause=b.dataset.c; S.causes[m.cause]=(S.causes[m.cause]||0)+1; save(); b.parentNode.querySelectorAll('.cchip').forEach(z=>z.classList.toggle('on',z===b)); });
  el.scrollTop=0;
}

/* diagnostic result: level per skill + the free explainer for the weakest skill */
function diagBlock(r){ const lang=X.lang, tt=T[lang];
  const rows=ALL_SKILLS.filter(s=>r.bySkill[s]).map(s=>{ const b=r.bySkill[s]; return {s,b,lv:b.c===b.t?2:b.c>0?1:0}; });
  const order=rows.slice().sort((a,b)=>(a.b.c/a.b.t)-(b.b.c/b.b.t)); let pick=null;
  for(const x of order){ const xs=xpList(x.s,lang); if(xs.length){ pick={s:x.s,xp:xs.find(z=>!(S.xp||{})[z.key])||xs[0]}; break; } }
  return `<section class="card diag-lv"><h3>${tt.diagLvT}</h3><p class="small muted">${tt.diagLvD}</p><div class="dl-grid">${rows.map(x=>`<a class="dl-row l${x.lv}" href="#lesson-${x.s}"><span class="dl-n">${SKILLS[x.s][lang]}</span><span class="dl-dots" aria-hidden="true">${[0,1].map(i=>`<i class="${i<x.b.c?'on':''}"></i>`).join('')}</span><span class="dl-tag">${tt.diagLv[x.lv]}</span></a>`).join('')}</div></section>
  ${pick?`<section class="card diag-next"><div class="eyebrow">${tt.diagNextT}</div><h3>${esc(pick.xp.title)}</h3><p>${tt.diagNextD(SKILLS[pick.s][lang])}</p><button class="btn primary" id="rs-xp" data-k="${esc(pick.xp.key)}">▶ ${tt.openXp}</button></section>`:''}`; }

/* ============ Claude explanation ============ */
let sampleFn=null;
let dlFn=null;
async function initAI(){ try{ if(window.claude?.use){ window.claude.use('downloads').then(d=>{ dlFn=d; document.body.classList.toggle('has-dl',!!d); }).catch(()=>{}); sampleFn=await window.claude.use('sample'); } }catch(e){ sampleFn=null; } document.body.classList.toggle('has-ai',!!sampleFn); }
async function explainAI(x,i,btn){
  const out=document.getElementById('ai-'+i), tt=T[X.lang]; if(!sampleFn){ out.textContent=tt.aiErr; return; }
  btn.disabled=true; out.textContent=tt.aiThinking; const L4=tt.letters, st=s=>String(s).replace(/⟦|⟧/g,'').replace(/<br>/g,'\n');
  const prompt=`${X.lang==='ar'?'أجب بالعربية الفصحى المبسطة.':'Answer in simple English.'} You are a tutor for the Saudi General Aptitude Test (GAT / Qudurat). In at most 120 words of plain text (no markdown), explain to a high school student why the correct answer is right, why their answer is wrong if they chose one, and one quick strategy for this question type (${SKILLS[x.q.s].en}).
${x.q.passage?'Passage: '+x.q.passage+'\n':''}Question: ${st(x.q.q)}
Options: ${x.q.opts.map((o,k)=>L4[k]+') '+st(o)).join(' | ')}
Correct: ${L4[x.q.ans]}. Student chose: ${x.your==null?'nothing':L4[x.your]}.
Reference explanation: ${st(x.q.exp)}`;
  try{ const res=await sampleFn(prompt,{modelTier:'quick',onText:({text})=>{ out.textContent=text; }}); out.textContent=res.text; }catch(e){ out.textContent=tt.aiErr; }
  btn.disabled=false;
}

/* ============ UI PIECES ============ */
const ICON={
  today:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1.2" class="f"/></svg>',
  learn:'<svg viewBox="0 0 24 24"><path d="M4 5.5C6.5 4 9.5 4 12 5.5v14c-2.5-1.5-5.5-1.5-8 0z"/><path d="M20 5.5C17.5 4 14.5 4 12 5.5v14c2.5-1.5 5.5-1.5 8 0z"/></svg>',
  practice:'<svg viewBox="0 0 24 24"><rect x="4" y="3.5" width="16" height="17" rx="2.5"/><path d="M8 9.5l2 2 4-4"/><path d="M8 15.5h8"/></svg>',
  progress:'<svg viewBox="0 0 24 24"><path d="M4 20h16"/><path d="M7 16v-5"/><path d="M12 16V7"/><path d="M17 16v-8"/></svg>',
  guide:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 11v5"/><circle cx="12" cy="8" r=".7" class="f"/></svg>',
  x:'<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  spark:'<svg viewBox="0 0 24 24" class="i16"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/></svg>',
  video:'<svg viewBox="0 0 24 24"><rect x="3" y="5.5" width="18" height="13" rx="3"/><path d="M10.5 9.5v5l4-2.5z" class="f"/></svg>',
  link:'<svg viewBox="0 0 24 24"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>',
  book:'<svg viewBox="0 0 24 24"><path d="M5 4.5h11a3 3 0 0 1 3 3V20H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h11"/></svg>',
  official:'<svg viewBox="0 0 24 24"><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/></svg>',
  check:'<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  flag:'<svg viewBox="0 0 24 24"><path d="M6 21V4.5"/><path d="M6 5h11l-2.5 4L17 13H6"/></svg>',
  grid:'<svg viewBox="0 0 24 24"><rect x="4" y="4" width="6" height="6" rx="1.5"/><rect x="14" y="4" width="6" height="6" rx="1.5"/><rect x="4" y="14" width="6" height="6" rx="1.5"/><rect x="14" y="14" width="6" height="6" rx="1.5"/></svg>',
  arrow:'<svg viewBox="0 0 24 24" class="arr"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  xmark:'<svg viewBox="0 0 24 24"><path d="M7 7l10 10M17 7L7 17"/></svg>',
  flame:'<svg viewBox="0 0 24 24" class="i16"><path d="M12 3c.5 3.5 4.5 5.5 4.5 10a4.5 4.5 0 0 1-9 0c0-2 1-3.5 2-4.5.3 1.6 1 2.5 2 3 .2-3.2-.5-5.6.5-8.5z"/></svg>',
  gear:'<svg viewBox="0 0 24 24" class="i16"><circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/></svg>'
};
for(const k in ICON) ICON[k]=ICON[k].replace('<svg ','<svg aria-hidden="true" focusable="false" ');
/* Latin-only text inside the Arabic UI (brand names, English titles) is marked for screen readers and bidi */
const lt=s=>S.lang==='ar'&&!/[\u0600-\u06FF]/.test(String(s||''))?' lang="en" dir="ltr"':'';
function ring(v,suf='',size=140,label=''){
  const r=42, c=2*Math.PI*r, val=v==null?0:Math.max(0,Math.min(100,v));
  return `<svg class="ring" viewBox="0 0 100 100" style="inline-size:${size}px" role="img" aria-label="${label} ${v??'—'}"><circle cx="50" cy="50" r="${r}" class="r-track"/>${v!=null&&val>0?`<circle cx="50" cy="50" r="${r}" class="r-val" stroke-dasharray="${(c*val/100).toFixed(1)} ${c.toFixed(1)}" transform="rotate(-90 50 50)"/>`:''}<text x="50" y="${label?52:57}" text-anchor="middle" class="r-txt">${v==null?'—':numL(v)+suf}</text>${label?`<text x="50" y="68" text-anchor="middle" class="r-lab">${label}</text>`:''}</svg>`;
}
const lvlOf=acc=>acc>=.85?'good':acc>=.65?'warn':'bad';
function barRow(label,acc,meta){
  const lv=acc==null?'none':lvlOf(acc), p=acc==null?0:Math.round(acc*100);
  return `<div class="bar-row ${label?'':'nolabel'}">${label?`<span class="bl">${esc(label)}</span>`:''}<span class="bt"><span class="bf ${lv}" style="inline-size:${p}%"></span><span class="b95"></span></span><span class="bv num">${acc==null?'—':numL(p)+'%'}</span>${meta?`<span class="bm num">${meta}</span>`:''}</div>`;
}
const pips=l=>`<span class="pips" role="img" aria-label="${l}/4">${[1,2,3,4].map(i=>`<i class="${i<=l?'on l'+l:''}"></i>`).join('')}</span>`;
const SMOOTH=()=>{ try{ return matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'; }catch(e){ return 'smooth'; } };
let toastT; function toast(m){ const el=$('#toast'); el.textContent=m; el.hidden=false; clearTimeout(toastT); toastT=setTimeout(()=>el.hidden=true,2600); }
function settingsForm(id){
  return `<form class="settings-form" id="${id}">
    <label>${t('examDate')}<input type="date" id="${id}-date" value="${S.examDate}"></label>
    <label>${t('track')}<select id="${id}-track"><option value="sci" ${S.track==='sci'?'selected':''}>${t('sci')}</option><option value="lit" ${S.track==='lit'?'selected':''}>${t('lit')}</option></select></label>
    <label>${t('targetScore')}<input type="number" id="${id}-target" min="60" max="100" value="${S.target}" ${PRO()?'':'disabled'}></label>
    <label>${t('weeks')}<select id="${id}-weeks" ${S.examDate||!PRO()?'disabled':''}>${[4,6,8,10,12].map(w=>`<option ${S.weeks===w?'selected':''}>${w}</option>`).join('')}</select></label>
    <button class="btn primary" type="submit">${t('save')}</button>${PRO()?'':lockLine('custom')}</form>`;
}
function bindSettings(id){ const f=document.getElementById(id); if(!f) return; f.onsubmit=e=>{ e.preventDefault();
  const pro=PRO(); const nd=$(`#${id}-date`).value; if(nd!==S.examDate){ S.examDate=nd; S.planStart=todayStr(); S.done={}; }
  S.track=$(`#${id}-track`).value; if(pro) S.target=Math.max(60,Math.min(100,+$(`#${id}-target`).value||100));
  const wk=pro?+$(`#${id}-weeks`).value:S.weeks; if(!S.examDate&&wk!==S.weeks){ S.weeks=wk; S.done={}; S.planStart=todayStr(); }
  save(); renderRoute(); toast(t('saved')); }; }

/* ============ PLAN ============ */
function planWeeks(){ if(S.examDate){ const d=daysBetween(S.planStart,S.examDate); if(d>0) return Math.max(2,Math.min(16,Math.ceil(d/7))); } return S.weeks; }
function daysLeft(){ return S.examDate? Math.ceil((new Date(S.examDate+'T08:00')-new Date())/864e5):null; }
/* week boundaries fall on the student's local midnight (planStart is a local calendar day) */
function currentWeek(){ const d=daysBetween(S.planStart,todayStr()); return Math.max(0,Math.min(planWeeks()-1,Math.floor(Math.max(0,d)/7))); }
function buildPlan(){
  const n=planWeeks(), weeks=[], dl=daysLeft(), sprint=dl!=null&&dl<=14; const phaseOf=i=>{ if(i===n-1) return 3; if(sprint) return 2; /* two weeks or less: mocks and review, no foundation phase */ const f=(i+.5)/n; return f<Math.max(.3,2/n)?0:f<.55?1:f<.8?2:3; };
  const vO=['analogy','completion','reading','context','odd'], qO=S.track==='sci'?['arith','algebra','geometry','comparison','stats']:['arith','geometry','comparison','stats','algebra'];
  /* the plan follows the student: skills flagged for the foundation first, then the weakest, then the usual order */
  const order=[...needFound().map(i=>i.s),...(S.attempts.length?rankSkills().map(i=>i.s):[])]; const found=[...new Set([...order,...[0,1,2,3,4].flatMap(k=>[vO[k],qO[k]])])];
  const fw=[...Array(n).keys()].filter(i=>phaseOf(i)===0).length||1, per=Math.ceil(10/fw); let fi=0;
  for(let i=0;i<n;i++){ const ph=phaseOf(i), tasks=[]; const add=(type,x={})=>tasks.push({id:`w${i}-${tasks.length}`,type,wk:i,...x});
    add('sessions');
    if(i===0&&!diagTaken()) add('diag');
    if(ph===0){ let sk=found.slice(fi,fi+per); fi+=per; if(!sk.length) sk=found.slice(0,2); sk.forEach(s=>add('skill',{skill:s})); }
    if(ph===1){ add('verbal'); add('quant'); rankSkills().slice(0,2).forEach(x=>add('skill',{skill:x.s})); }
    if(ph===2){ add('verbal'); add('quant'); add('mock'); }
    if(ph===3){ add('mock'); if(i<n-1) add('mock'); else { add('text',{txt:{ar:'آخر ٤٨ ساعة: مراجعة خفيفة للقوانين والفخاخ فقط، ونوم مبكر',en:'Final 48 hours: light review of rules and traps only, and sleep early'}}); add('text',{txt:{ar:'جهّز هويتك، وتأكد من موقع المركز وموعد الحضور',en:'Get your ID ready and confirm your test center and arrival time'}}); } }
    weeks.push({i,ph,tasks}); }
  return weeks;
}
function sessionsInWeek(i){ const a=addDays(S.planStart,i*7), b=addDays(S.planStart,i*7+7); return S.sessionDays.filter(d=>d>=a&&d<b).length; }
function taskDone(tk){ return tk.type==='sessions'? sessionsInWeek(tk.wk)>=5 : !!S.done[tk.id]||(tk.type==='diag'&&!!S.diag); }
function taskLabel(tk){ const s=tk.skill?SKILLS[tk.skill][S.lang]:''; const ar=S.lang==='ar';
  return {sessions:t('sessionsWeek')(numL(Math.min(5,sessionsInWeek(tk.wk)))),diag:t('pDiag'),skill:(ar?'درس وتدريب: ':'Lesson and practice: ')+s,verbal:t('pVerbal'),quant:t('pQuant'),mock:t('pMock'),text:L(tk.txt)}[tk.type]; }
function runTask(tk){
  if(tk.type==='text'){ S.done[tk.id]=!S.done[tk.id]; save(); return renderRoute(); }
  if(tk.type==='sessions') return startTest('session');
  if(tk.type==='skill'){ S.planTask={id:tk.id,skill:tk.skill}; save(); const f=needFound().some(i=>i.s===tk.skill)&&fdNextFor(tk.skill); location.hash=f?'#fl-'+f.id:'#lesson-'+tk.skill; return; } /* done when a drill on that skill is finished, not on click */
  startTest(tk.type,{task:tk.id});
}
function taskItem(tk){ const d=taskDone(tk);
  return `<div class="task ${d?'done':''}"><span class="chk">${d?ICON.check:''}</span><span class="tl">${esc(taskLabel(tk))}</span><button class="btn sm ${d?'ghost':'soft'}" data-task="${tk.id}">${!PRO()&&((tk.type!=='skill'&&PRO_KINDS[tk.type])||(tk.type==='diag'&&d))?LOCKSVG:''}${tk.type==='text'?(d?'↺':'✓'):(d?(S.lang==='ar'?'أعد':'Redo'):t('start'))}</button></div>`; }

/* ============ PAGES ============ */
/* ---- one guided path: the journey stage (foundation → practice → mocks) and the single next step ---- */
const SK_FDU={analogy:['van'],completion:['vco'],context:['vcx'],odd:['vod'],reading:['vre'],arith:['num','ar'],algebra:['al'],geometry:['geo'],stats:['st'],comparison:['st']};
const fdDone=id=>(((S.fd||{})[id]||{}).best||0)>=80;
const fdNextFor=s=>FD.find(l=>SK_FDU[s].includes(l.u)&&!fdDone(l.id));
/* a skill needs its foundation when it has enough answers and accuracy under 70% */
const diagWeak=s=>{ const b=S.diag&&S.diag.skills&&S.diag.skills[s]; return !!(b&&b.t&&b.c/b.t<.7); };
const fdAnyDone=s=>FD.some(l=>SK_FDU[s].includes(l.u)&&fdDone(l.id));
/* five live answers decide; before that, a weak diagnostic result does, until one foundation lesson of that skill is passed */
const needFound=()=>rankSkills().filter(i=>(i.n>=5?i.acc<.7:diagWeak(i.s)&&!fdAnyDone(i.s))&&fdNextFor(i.s));
function journeyStage(){ if(!S.attempts.length||needFound().length) return 0; return ALL_SKILLS.every(s=>skillInfo(s).level>=3)||readiness()>=60?2:1; }
function nextStep(){ const st=journeyStage(), w=st===0?needFound()[0]:null;
  if(w) return {st,kind:'found',s:w.s,l:fdNextFor(w.s)};
  if(st===2&&S.sessionDays.includes(todayStr())) return {st,kind:'mock'};
  return {st,kind:'session'}; }
function journeyBar(st){ const N=[bi('التأسيس','Foundation'),bi('التدريب','Practice'),bi('المحاكاة','Full mocks')], D=[bi('دروس قصيرة لما ينقصك','Short lessons for what you lack'),bi('جلسات يومية على نقاط ضعفك','Daily sessions on your weak spots'),bi('اختبارات كاملة بالوقت الحقيقي','Full tests in real time')];
  return `<ol class="journey" aria-label="${L(bi('رحلتك إلى الاختبار','Your path to the test'))}">${N.map((n,i)=>`<li class="j${i} ${i<st?'done':i===st?'on':''}"${i===st?' aria-current="step"':''}><span class="jn num" aria-hidden="true">${i<st?ICON.check:numL(i+1)}</span><div><b>${L(n)}</b><span>${L(D[i])}</span></div></li>`).join('')}</ol>`; }
const NEXT_E=()=>L(bi('خطوتك التالية','Your next step'));
function nextCard(ns){
  if(ns.kind==='found'){ const c=ns.l[S.lang], sk=SKILLS[ns.s], open=fdOpen(ns.l.id), left=acct()?dailyLeft():Infinity;
    return `<section class="session card next-card"><div class="sess-txt"><div class="eyebrow">${NEXT_E()} · ${L(bi('التأسيس','Foundation'))}</div><h2>${esc(c.t)}</h2>
      <p class="muted">${L(bi(`نتيجتك في ${sk.ar} تقول إن أساسها يحتاج تقوية، فنبدأ به: درس قصير ثم ١٠ أسئلة.`,`Your result in ${sk.en} says its basics need work, so we start there: a short lesson, then 10 questions.`))}</p>
      ${open?'':`<p class="small muted">${LOCKSVG} ${L(bi('قراءة الدرس مجانية، وتدريبه للمشتركين.','Reading the lesson is free; its drill is for subscribers.'))}</p>`}</div>
      <div class="nc-act"><a class="btn primary xl" href="#fl-${ns.l.id}">${L(bi('ابدأ الدرس','Start the lesson'))}</a>
      ${left>0?`<button class="linkbtn" data-start="session">${L(bi('أو ابدأ جلسة اليوم','Or start today\'s session'))}</button>`:`<span class="small muted">${L(bi('تتجدد أسئلتك المجانية غدًا','Your free questions renew tomorrow'))}</span>`}</div></section>`; }
  if(ns.kind==='mock') return `<section class="session card next-card"><div class="sess-txt"><div class="eyebrow">${NEXT_E()} · ${L(bi('المحاكاة','Full mocks'))}</div><h2>${L(bi('أنت جاهز لمحاكاة كاملة','You are ready for a full mock'))}</h2>
      <p class="muted">${L(bi('أنهيت جلسة اليوم ومستواك يسمح. خذ اختبارًا كاملًا كيوم الاختبار: ٥ أقسام × ٢٥ دقيقة، ولا رجوع إلى قسم سابق.','Today\'s session is done and your level is there. Take a full test as on test day: 5 sections × 25 minutes, with no going back to a previous section.'))}</p></div>
      <button class="btn primary xl" data-start="mock">${PRO()?'':LOCKSVG}${L(bi('ابدأ المحاكاة','Start the mock'))}</button></section>`;
  return ''; }
function pageToday(){
  const dl=daysLeft(), est=estimate(), rd=readiness(), plan=buildPlan(), cw=currentWeek(), wk=plan[cw];
  const hasData=S.attempts.length>0, sp=sessionPlan(), doneToday=S.sessionDays.includes(todayStr()), checks=readyChecks();
  const invite=!diagTaken()&&!hasData, dl2=acct()?dailyLeft():Infinity, streak=calcStreak(); const ns=nextStep(), nc=nextCard(ns);
  const repCard=CLOUD_BUILD&&!PRO()&&!S.repHide&&!S.repSeen&&reportReady()?`<section class="card rep-card"><div><div class="eyebrow">${t('reportReadyE')}</div><h2>${t('reportReadyT')}</h2><p class="muted">${t('reportReadyD')}</p></div><div class="row"><a class="btn primary" href="#report">${t('reportOpen')}</a><button class="btn ghost sm" id="rp-hide">${t('dismiss')}</button></div></section>`:'';
  if(invite) return `
  <section class="hero hero-new"><div class="hero-main">
    <h1>${S.lang==='ar'?'القدرات ليست حظًا.<br>هي <em>عشر مهارات</em> تُتقن.':'The GAT isn\'t luck.<br>It\'s <em>ten skills</em>, mastered.'}</h1>
  </div></section>
  <section class="session card diag-invite">
    <div class="sess-txt"><div class="eyebrow">${t('diagInviteE')}</div><h2>${t('diagInviteT')}</h2><p>${t('diagInviteD')}</p></div>
    <button class="btn primary xl" data-start="diag">${t('diagFirst')}</button>
  </section>
  <p class="zero-link small">${L(bi('تبدأ من الصفر؟','Starting from zero?'))} <a href="#learn-found">${L(bi('ابدأ بمسار التأسيس','Begin with the foundation track'))}</a></p>
  <ol class="first-steps" aria-label="${t('firstStepsL')}">${t('firstSteps').map(([h,d],i)=>`<li><span class="fs-n num" aria-hidden="true">${numL(i+1)}</span><div><b>${h}</b><span>${d}</span></div></li>`).join('')}</ol>`;
  /* returning students: a compact status strip, then the one next step above the fold, then the journey */
  const prov=ALL_SKILLS.some(s=>skillInfo(s).n<5), provT=prov?` <span class="prov">${L(bi('مبدئي','early'))}</span>`:'';
  return `
  <section class="today-top">
    <div class="tt-main"><div class="eyebrow">${t('greetN')(numL(S.target))}</div><h1 class="tt-h">${L(bi('خطتك لليوم','Your plan for today'))}</h1>
      <div class="hero-meta">
        ${dl!=null?(dl<0?`<a class="pill warn" href="#plan">${L(bi('مضى موعد اختبارك؟ حدّث الموعد','Test date passed? Update it'))}</a>`:`<span class="pill"><b class="num">${numL(Math.max(0,dl))}</b> ${t('daysLeft')}</span>`):`<a class="pill link" href="#plan">${t('setDate')}</a>`}
        <span class="pill">${t('estScore')} <b class="num">${est==null?'—':numL(est)}</b>${est==null?'':provT}</span>
        <span class="pill streak">${ICON.flame} ${streak>0?`${t('kStreak')} <b class="num">${numL(streak)}</b>`:L(bi('ابدأ سلسلتك اليوم','Start your streak today'))}</span>
        <a class="pill link" href="#plan" aria-label="${t('settings')}">${ICON.gear}</a>
      </div></div>
    <div class="tt-ring">${ring(hasData?rd:null,'%',96,t('readiness'))}${hasData&&prov?`<span class="prov">${L(bi('مبدئي','early'))}</span>`:''}</div>
  </section>
  ${repCard}
  ${nc?nc:invite?`<section class="session card diag-invite">
    <div class="sess-txt"><div class="eyebrow">${t('diagInviteE')}</div><h2>${t('diagInviteT')}</h2><p>${t('diagInviteD')}</p></div>
    <button class="btn primary xl" data-start="diag">${t('diagFirst')}</button>
  </section>`:`<section class="session card">
    <div class="sess-txt">
      <div class="eyebrow">${NEXT_E()} · ${t('sessionTitle')}</div>
      <h2>${doneToday?t('sessionDone'):dl2===Infinity?t('sessionSub'):t('sessFree')(Math.min(25,dl2))}</h2>
      ${dl2===Infinity?`<p class="muted">${t('sessionParts')(numL(sp.due.length),numL(sp.nWeak),numL(sp.nMix))}</p>`:''}<div class="chips">${sp.weak.map(s=>`<span class="chip">${SKILLS[s][S.lang]}</span>`).join('')}</div>
      ${dl2!==Infinity?`<p class="daily-left small">${dl2>0?t('dailyLeft')(numL(dl2),numL(FREE.dailyQuestions)):t('dailyOut')}</p>`:''}
    </div>
    ${dl2<=0?`<button class="btn primary xl" data-lock="daily">${LOCKSVG} ${t('unlock')}</button>`:`<button class="btn primary xl" data-start="session">${t('startSession')}</button>`}
  </section>`}
  ${extraCard()}
  ${hasLive()?`<div class="demo"><span>${L(bi('لديك اختبار محفوظ لم يكتمل.','You have a saved test in progress.'))}</span><button class="btn primary sm" data-resume>${L(bi('أكمل الاختبار','Continue the test'))}</button></div>`:''}
  ${journeyBar(ns.st)}
  ${CLOUD_BUILD&&!acct()&&hasData?`<div class="demo"><span>${t('saveStrip')}</span><button class="btn primary sm" data-acct data-tab="signup">${t('saveStripBtn')}</button></div>`:''}
  ${!invite&&CLOUD_BUILD&&!diagTaken()?`<div class="demo"><span>${t('diagNudge')}</span><button class="btn primary sm" data-start="diag">${t('diagFirst')}</button></div>`:''}
  <section class="block">
    <div class="block-head"><h2 class="hl">${t('masteryTitle')}</h2><span class="muted small">${t('masteryHint')}</span></div>
    ${masteryMap()}
  </section>
  <section class="grid2">
    <div class="card"><div class="block-head"><h3>${t('weekTitle')} · ${t('phaseNames')[wk.ph]}</h3><a href="#plan">${t('fullPlan')}</a></div>${!PRO()&&cw>=FREE.planWeeks?lockLine('plan'):`<div class="task-list">${wk.tasks.slice(0,5).map(taskItem).join('')}</div>`}</div>
    <div class="card"><h3>${t('roadTitle')}</h3><ul class="checks">${t('ready').map((x,i)=>`<li class="${checks[i]?'ok':''}"><span class="ck">${checks[i]?ICON.check:''}</span>${x}</li>`).join('')}</ul></div>
  </section>
  `;
}
function masteryMap(recent){ const tile=s=>{ const i=skillInfo(s,recent); return `<a class="mtile l${i.level}" href="#lesson-${s}"><span class="mt-n">${SKILLS[s][S.lang]}</span>${pips(i.level)}<span class="mt-f"><span class="mt-l">${t('levels')[i.level]}</span><span class="mt-a num">${i.acc==null?'—':i.n<5?`<small>${L(bi(`${numL(i.n)} من ٥ أسئلة`,`${i.n} of 5 questions`))}</small>`:numL(Math.round(i.acc*100))+'%'}</span></span></a>`; };
  return `<div class="mmap"><div class="mcol"><div class="mcol-h">${t('verbal')}</div><div class="mtiles">${V_SKILLS.map(tile).join('')}</div></div><div class="mcol"><div class="mcol-h">${t('quant')}</div><div class="mtiles">${Q_SKILLS.map(tile).join('')}</div></div></div>`; }
function pagePlan(){
  const plan=buildPlan(), cw=currentWeek();
  return `<header class="page-h"><a class="back" href="#today">${t('nav.today')}</a><h1>${t('planTitle')}</h1><p>${t('planIntro')}</p></header>
  <div class="card">${settingsForm('pf')}</div>
  <div class="card restart"><div><h2>${t('restartT')}</h2><p class="small muted">${t('restartD')}</p></div><button class="btn ghost" id="pl-restart">${t('restartBtn')}</button><div id="pl-confirm"></div></div>
  <ol class="phase-row">${t('phaseNames').map((p,i)=>`<li class="${plan[cw].ph===i?'cur':''}"><b>${p}</b><span>${t('phaseDesc')[i]}</span></li>`).join('')}</ol>
  <div class="weeks">${plan.map(w=>!PRO()&&w.i>=FREE.planWeeks?`<section class="week card locked"><div class="wk-h"><h3>${t('week')} ${numL(w.i+1)}</h3><span class="chip ph${w.ph}">${t('phaseNames')[w.ph]}</span>${w.i===cw?`<span class="now">${t('thisWeek')}</span>`:''}</div>${lockLine('plan')}</section>`:`<section class="week card ${w.i===cw?'cur':''}"><div class="wk-h"><h3>${t('week')} ${numL(w.i+1)}</h3><span class="chip ph${w.ph}">${t('phaseNames')[w.ph]}</span>${w.i===cw?`<span class="now">${t('thisWeek')}</span>`:''}<span class="wk-c num">${numL(w.tasks.filter(taskDone).length)}/${numL(w.tasks.length)}</span></div><div class="task-list">${w.tasks.map(taskItem).join('')}</div></section>`).join('')}</div>`;
}
/* "for you now": up to three items for the weakest skill, so the kit opens on what matters before the full library */
function forYou(){ if(!S.attempts.length) return ''; const w=rankSkills()[0]; if(!w||w.level>=3) return ''; const s=w.s, sk=SKILLS[s][S.lang], it=[];
  const f=fdNextFor(s); if(f) it.push([`#fl-${f.id}`,L(bi('درس تأسيس','Foundation lesson')),f[S.lang].t]);
  it.push([`#lesson-${s}`,L(bi('درس المهارة','Skill lesson')),sk]);
  const pi=PATTERNS.findIndex(p=>p.sk===s); if(pi>=0&&pi<techN(PATTERNS.length)) it.push(['#learn-patterns',L(bi('نمط متكرر','Recurring pattern')),L(PATTERNS[pi].t)]);
  return `<section class="foryou"><div class="block-head"><h2>${L(bi('لك الآن','For you now'))}</h2><span class="muted small">${L(bi(`أضعف مهارة عندك الآن: ${sk}`,`Your weakest skill right now: ${sk}`))}</span></div><div class="fy-row">${it.map(([h,k,tt])=>`<a class="fy-card" href="${h}"><span class="eyebrow">${k}</span><b>${esc(tt)}</b></a>`).join('')}</div></section>`; }
function pageLearn(tab='lessons'){
  const tabs=`<nav class="tabs">${Object.entries(t('tabs')).map(([k,v])=>`<a href="#learn-${k}" class="${tab===k?'on':''}">${v}</a>`).join('')}</nav>`;
  let body='';
  if(tab==='lessons'){ const card=s=>{ const i=skillInfo(s), l=LESSONS[s][S.lang], c=FLASH.find(f=>f.sk===s); return `<a class="lcard" href="#lesson-${s}"><div class="lc-ill">${ILL[c.ill]()}</div><div class="lc-top"><h3>${SKILLS[s][S.lang]}</h3>${pips(i.level)}</div><p>${M(esc(l.concept[0]))}</p><div class="lc-f"><span class="muted small">${t('levels')[i.level]}${xpList(s).length+lockedXp(s).length?` · <span class="lc-xp">▶ ${numL(xpList(s).length+lockedXp(s).length)} ${t('xpShort')}</span>`:''}</span><span class="lc-go">${t('lessonsOpen')}</span></div></a>`; };
    body=`<a class="card fd-promo" href="#learn-found"><div><h2>${t('fdPromoT')}</h2><p>${t('fdPromoD')}</p></div><span class="btn soft sm">${t('fdPromoGo')}</span></a><h2 class="sec-h hl">${t('verbal')}</h2><div class="lgrid">${V_SKILLS.map(card).join('')}</div><h2 class="sec-h hl">${t('quant')}</h2><div class="lgrid">${Q_SKILLS.map(card).join('')}</div>`; }
  else if(tab==='found') body=foundView();
  else if(tab==='cards') body=cardsView();
  else if(tab==='tech'){ const n=techN(TECH.length); body=`<p class="lead">${t('techIntro')}</p><h2 class="sr-only">${t('tabs').tech}</h2><div class="notes">${TECH.slice(0,n).map((x,i)=>`<article class="note-card c${i%4}"><div class="nc-ill">${ILL[x.ill]()}</div><h3>${esc(L(x.t))}</h3><p>${M(esc(L(x.d)))}</p></article>`).join('')}</div>`
    +(n<TECH.length?proFold('tech',t('moreTech')(numL(TECH.length-n)),`<div class="notes locked-notes">${TECH.slice(n).map((x,i)=>`<button type="button" class="note-card c${(i+n)%4} locked" data-lock="tech"><h3>${esc(L(x.t))}</h3>${lockBadge()}</button>`).join('')}</div>`,'tech'):''); }
  else if(tab==='patterns'){ const n=techN(PATTERNS.length); body=`<p class="lead">${t('patIntro')}</p><h2 class="sr-only">${t('tabs').patterns}</h2><div class="pats">${PATTERNS.slice(0,n).map((p,i)=>`<article class="pat card"><div class="pat-h"><span class="pnum">${numL(i+1)}</span><h3>${esc(L(p.t))}</h3><span class="chip">${SKILLS[p.sk][S.lang]}</span></div><p><b>${t('how')}:</b> ${esc(L(p.how))}</p><p class="key"><b>${t('trick')}:</b> ${M(esc(L(p.trick)))}</p><p class="exl">${esc(L(p.ex))}</p><button class="btn sm soft" data-start="skill" data-skill="${p.sk}">${PRO()?'':LOCKSVG}${t('practicePattern')}</button></article>`).join('')}</div>`
    +(n<PATTERNS.length?proFold('pat',t('morePat')(numL(PATTERNS.length-n)),`<div class="pats">${PATTERNS.slice(n).map((p,i)=>`<button type="button" class="pat card locked" data-lock="tech"><div class="pat-h"><span class="pnum">${numL(i+n+1)}</span><h3>${esc(L(p.t))}</h3><span class="chip">${SKILLS[p.sk][S.lang]}</span></div>${lockBadge()}</button>`).join('')}</div>`,'tech'):''); }
  else if(tab==='vocab') body=vocabView();
  else body=`<p class="lead">${t('resIntro')}</p>${RESOURCES.map(c=>`<h2 class="sec-h hl">${L(c.cat)}</h2><div class="rgrid">${c.items.map(resCard).join('')}</div>`).join('')}`;
  return `<header class="page-h"><h1><span class="hl">${t('learnTitle')}</span></h1><p>${t('kitIntro')}</p></header>${forYou()}${tabs}${body}`;
}
/* flashcards */
let FCV={deck:'all',flip:false};
function deckCards(){ return FCV.deck==='all'?FLASH:FLASH.filter(c=>c.sk===FCV.deck); }
function cardDue(){ const d=todayStr();
  if(!PRO()){ const ix=new Map(freeCards().order.map((id,i)=>[id,i])); return deckCards().filter(c=>ix.has(c.id)&&!(S.cards[c.id]?.box>=4)).sort((a,b)=>((S.cards[a.id]?.ag||0)-(S.cards[b.id]?.ag||0))||(ix.get(a.id)-ix.get(b.id))); }
  return deckCards().filter(c=>{ const st=S.cards[c.id]; return !st||(st.box<4&&(st.due||d)<=d); }); }
function stickyCard(c,flip,big){ const col=['c0','c1','c2','c3'][ALL_SKILLS.indexOf(c.sk)%4];
  return `<div class="flash ${col} ${flip?'flipped':''} ${big?'big':''}"><span class="tape"></span>
    ${!flip?`<span class="chip">${SKILLS[c.sk][S.lang]}</span><div class="fl-ill">${ILL[c.ill]()}</div><h3>${esc(L(c.f))}</h3>${big?`<span class="fl-hint">${t('tapFlip')}</span>`:''}`
    :`<span class="chip">${SKILLS[c.sk][S.lang]}</span><h3>${esc(L(c.f))}</h3><p class="fl-b">${M(esc(L(c.b)))}</p>${L(c.x)?`<p class="fl-x"><b>${t('example')}:</b> ${M(esc(L(c.x)))}</p>`:''}`}</div>`; }
function cardsView(){
  const decks=[['all',t('deckAll')],...ALL_SKILLS.map(s=>[s,SKILLS[s][S.lang]])];
  const due=cardDue(), cards=deckCards(), known=cards.filter(c=>S.cards[c.id]?.box>=4&&cardOpen(c)).length, nOpen=cards.filter(cardOpen).length;
  const chips=`<div class="deck-chips">${decks.map(([k,v])=>`<button class="dchip ${FCV.deck===k?'on':''}" data-deck="${k}">${v}</button>`).join('')}</div>`;
  const head=`<p class="lead">${t('cardsIntro')}</p>${chips}<div class="vstats"><span><b class="num">${numL(known)}</b> ${t('known')}</span><span><b class="num">${numL(due.length)}</b> ${t('left')}</span><span class="muted">/ ${numL(nOpen)}</span></div>`;
  const study=`<h2 class="sr-only">${t('studyNow')}</h2>`+(due.length?`<div class="study"><button class="flash-btn" id="fc-card" aria-label="${t('tapFlip')}">${stickyCard(due[0],FCV.flip,true)}</button><div class="vbtns">${FCV.flip?`<button class="btn ghost" id="fc-again">${t('again')}</button><button class="btn primary" id="fc-know">${t('know')}</button>`:''}</div></div>`:`<div class="card center"><p>${t('deckDone')}</p></div>`);
  return head+study+`<h2 class="sec-h hl">${t('allInDeck')}</h2><div class="notes">${cards.filter(cardOpen).map(c=>`<details class="mini-flash"><summary>${stickyCard(c,false,false)}</summary>${stickyCard(c,true,false)}</details>`).join('')}</div>`
    +(nOpen<cards.length?proFold('cards',t('moreCards')(numL(cards.length-nOpen)),`<div class="notes">${cards.filter(c=>!cardOpen(c)).map(c=>`<button type="button" class="mini-lock ${['c0','c1','c2','c3'][ALL_SKILLS.indexOf(c.sk)%4]}" data-lock="cards"><span class="chip">${SKILLS[c.sk][S.lang]}</span><b>${esc(L(c.f))}</b>${lockBadge()}</button>`).join('')}</div>`,'cards'):'');
}
function cardAct(ok){ const due=cardDue(); if(!due.length) return; const c=due[0]; const st=S.cards[c.id]||{box:0}; const INT=[1,3,7,14]; st.t=Date.now();
  if(!PRO()){ if(ok){ st.box=4; st.due=todayStr(); } else { st.box=0; st.ag=Date.now(); } S.cards[c.id]=st; FCV.flip=false; save(); return renderRoute(); } /* free: no spaced schedule */
  if(ok){ st.box=(st.box||0)+1; st.due=addDays(todayStr(),INT[Math.min(3,st.box-1)]); } else { st.box=0; st.due=todayStr(); const i=FLASH.indexOf(c); FLASH.push(FLASH.splice(i,1)[0]); }
  S.cards[c.id]=st; FCV.flip=false; save(); renderRoute(); }
function resCard(it){ const url=it.u||(it.yt?yt(L(it.yt)):''); const tag={video:S.lang==='ar'?'فيديو':'Video',link:S.lang==='ar'?'رابط':'Link',official:S.lang==='ar'?'رسمي':'Official',book:S.lang==='ar'?'كتاب':'Book'}[it.k];
  const inner=`<span class="ricon ${it.k}" aria-hidden="true">${ICON[it.k]}</span><div class="rc-body"><div class="rc-top"><h3${lt(L(it.t))}>${esc(L(it.t))}</h3><span class="chip">${tag}</span></div><p>${esc(L(it.d))}</p></div>`;
  return url?`<a class="rcard" href="${url}" target="_blank" rel="noopener">${inner}</a>`:`<div class="rcard">${inner}</div>`; }
/* foundation explainers (animated, narrated; Arabic) */
const XPOK=()=>!!(window.XP&&XP.ready);
const xpList=(s,lang=S.lang)=>XPOK()?XP.forSkill(s,lang):[];
function xpSection(s){ const xs=xpList(s), lk=lockedXp(s); if(!xs.length&&!lk.length) return ''; const done=S.xp||{}, n=xs.filter(x=>done[x.key]).length;
  const items=[...xs,...lk].sort((a,b)=>(a.ord??50)-(b.ord??50));
  const play='<svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none"/></svg>';
  return `<section class="card xp-sec" id="xp-${s}"><div class="xp-sec-h"><h2>${t('xpTitle')}</h2><span class="chip num">${numL(n)} / ${numL(items.length)}</span></div><p class="muted small">${t('xpIntro')}</p>
    <div class="xpl">${items.map((x,i)=>x.locked?`<button type="button" class="xpc locked" data-lock="xp"><span class="xpn"><span class="pl">${LOCKSVG}</span><span>${t('xpN')} ${numL(i+1)}</span><span class="xpm">${t('xpMin')(numL(x.min))}</span></span><b>${esc(x.title)}</b><small>${t('ben').xp}</small></button>`
      :`<button class="xpc" data-xp="${x.key}"><span class="xpn"><span class="pl">${play}</span><span>${t('xpN')} ${numL(i+1)}</span><span class="xpm">${esc(x.min||'')}</span>${done[x.key]?`<span class="dn">✓ ${t('xpDone')}</span>`:''}</span><b>${esc(x.title)}</b>${x.goals&&x.goals[0]?`<small>${esc(x.goals[0])}</small>`:''}</button>`).join('')}</div></section>`; }
/* ============ Foundation track pages ============ */
const fdNum=id=>FD.findIndex(l=>l.id===id);
const fdOpen=id=>PRO()||fdNum(id)<FD_FREE||id==='v-an1'; /* the first five quantitative lessons and the first verbal lesson are free */
function fdStat(id){ const m=(S.fd||{})[id]; return m?`<span class="fd-st ${m.best>=80?'ok':''}">${t('fdBest')}: <b class="num">${numL(m.best)}%</b></span>`:`<span class="fd-st muted">${t('fdNot')}</span>`; }
function foundView(){ const done=FD.filter(l=>(S.fd||{})[l.id]).length;
  return `<p class="lead">${t('fdIntro')}</p><div class="vstats"><span><b class="num">${numL(done)}</b> / ${numL(FD.length)} ${t('fdDoneN')}</span></div>${PRO()?'':`<p class="small muted">${t('fdFreeNote')}</p>`}`
   +FDU.map(([u,nm])=>`${u==='num'||u==='van'?`<h2 class="fd-part">${t(u==='num'?'quant':'verbal')}</h2>`:''}<h2 class="sec-h hl">${L(nm)}</h2><div class="fd-grid">${FD.filter(l=>l.u===u).map(l=>{ const i=fdNum(l.id), c=l[S.lang]; return `<a class="fd-card" href="#fl-${l.id}"><span class="fd-n num">${numL(i+1)}</span><div class="fd-b"><h3>${esc(c.t)}</h3><p>${M(esc(c.d))}</p>${fdStat(l.id)}</div></a>`; }).join('')}</div>`).join(''); }
/* the lesson's narrated explainer (key fd-<id>): playable when its bundle is loaded, otherwise shown locked */
/* top: the playable explainer opens the lesson (watch, then read, then practise); bottom: the locked card for those without it */
function fdXp(id,top){ const k=(S.lang==='en'?'en-fd-':'fd-')+id, L=XPOK()&&XP.get?XP.get(k):null;
  if(!!L!==!!top) return ''; if(!L&&!xpAllKeys().includes(k)) return ''; /* lessons with no recorded explainer (the verbal ones) show nothing */
  const play='<svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none"/></svg>', done=(S.xp||{})[k];
  if(L) return `<section class="card xp-sec"><div class="xp-sec-h"><h2>${t('fdXpT')}</h2></div><div class="xpl"><button class="xpc" data-xp="${k}"><span class="xpn"><span class="pl">${play}</span><span>${t('xpN')}</span><span class="xpm">${esc(L.min||'')}</span>${done?`<span class="dn">✓ ${t('xpDone')}</span>`:''}</span><b>${esc(L.title)}</b><small>${t('fdXpD')}</small></button></div></section>`;
  if(PRO()) return '';
  return `<section class="card xp-sec"><div class="xp-sec-h"><h2>${t('fdXpT')}</h2></div><div class="xpl"><button type="button" class="xpc locked" data-lock="xp"><span class="xpn"><span class="pl">${LOCKSVG}</span><span>${t('xpN')}</span></span><b>${esc(FD[fdNum(id)][S.lang].t)}</b><small>${t('ben').xp}</small></button></div></section>`; }
function pageFound(id){ const i=fdNum(id); if(i<0) return pageLearn('found'); const l=FD[i], c=l[S.lang], ar=S.lang==='ar', unit=L(FDU.find(x=>x[0]===l.u)[1]);
  const fig=f=>f?`<div class="fd-fig">${f.replace(/<br>$/,'')}</div>`:'';
  const cards=FLASH.filter(x=>/^fd\d+$/.test(x.id)&&+x.id.slice(2)>3*i&&+x.id.slice(2)<=3*i+3);
  const prev=FD[i-1], next=FD[i+1];
  const card=x=>cardOpen(x)?`<details class="mini-flash"><summary>${stickyCard(x,false,false)}</summary>${stickyCard(x,true,false)}</details>`:`<button type="button" class="mini-lock ${['c0','c1','c2','c3'][ALL_SKILLS.indexOf(x.sk)%4]}" data-lock="cards"><span class="chip">${SKILLS[x.sk][S.lang]}</span><b>${esc(L(x.f))}</b>${lockBadge()}</button>`;
  return `<header class="page-h lesson-h"><div><a class="back" href="#learn-found">${t('fdTitle')}</a><div class="eyebrow">${t('fdLesson')} ${numL(i+1)} ${t('fdOf')} ${numL(FD.length)} · ${unit}</div><h1><span class="hl">${esc(c.t)}</span></h1></div><div class="lh-ill">${ILL[l.ill]()}</div></header>
  <div class="fd-lesson">
    <section class="card">${c.intro.map(p=>`<p>${M(esc(p))}</p>`).join('')}</section>
    ${fdXp(id,true)}
    <section><h2 class="h2s">${t('fdRules')}</h2><div class="rules">${c.rules.map(x=>`<div class="rule">${M(esc(x))}</div>`).join('')}</div></section>
    <section><h2 class="h2s">${t('fdEx')}</h2><div class="fd-exs">${c.ex.map((e,k)=>`<article class="card fd-ex"><div class="eyebrow">${t('fdExN')} ${numL(k+1)}</div>${fig(e[3])}<p class="fd-q">${M(esc(e[0]))}</p><ol class="nsteps">${e[1].map(s=>`<li><span>${M(esc(s))}</span></li>`).join('')}</ol><p class="fd-a"><b>${t('answer')}:</b> ${M(esc(e[2]))}</p></article>`).join('')}</div></section>
    <section class="card warn-card"><h2>${t('traps')}</h2><ul class="bul">${c.traps.map(x=>`<li>${M(esc(x))}</li>`).join('')}</ul></section>
    ${fdXp(id,false)}
    <section class="card accent-card fd-drill"><div><h2>${t('fdDrill')}</h2><p class="small">${t('fdDrillD')}</p>${fdStat(id)}</div><button class="btn primary" data-fd="${id}">${fdOpen(id)?'':LOCKSVG}${t('fdGo')}</button></section>
    ${cards.length?`<section><h2 class="h2s">${t('fdCards')}</h2><div class="notes small-notes">${cards.map(card).join('')}</div></section>`:''}
    <nav class="fd-nav">${prev?`<a class="btn ghost" href="#fl-${prev.id}">${ar?'→':'←'} ${esc(prev[S.lang].t)}</a>`:'<span></span>'}${next?`<a class="btn soft" href="#fl-${next.id}">${esc(next[S.lang].t)} ${ar?'←':'→'}</a>`:''}</nav>
  </div>`; }
function pageLesson(s){
  const l=LESSONS[s]?.[S.lang]; if(!l) return pageLearn(); const i=skillInfo(s), ar=S.lang==='ar';
  const res=l.res.map(r=>r[0]==='yt'?{k:'video',t:{ar:'يوتيوب: '+r[1],en:'YouTube: '+r[1]},d:{ar:'بحث جاهز لشروحات هذه المهارة.',en:'A ready search for lessons on this skill.'},u:yt(r[1])}:{k:'link',t:{ar:r[1],en:r[1]},d:{ar:'مرجع خارجي للتعمق.',en:'External reference for deeper practice.'},u:r[2]});
  const side=`<div class="card side-card"><div class="eyebrow">${t('mastery')}</div><div class="lvl-row">${pips(i.level)}<b>${t('levels')[i.level]}</b></div>
    ${barRow('',i.acc,i.n?`${numL(i.n)} ${t('questions')}`:'')}
    <p class="small muted">${t('targetTime')}: <b class="num">${numL(TARGET_T[s])}${t('sec')}</b>${i.time!=null&&PRO()?` · ${ar?'زمنك':'yours'}: <b class="num">${numL(Math.round(i.time))}${t('sec')}</b>`:''}</p>
    <ul class="lvl-rules">${[1,2,3,4].map(k=>`<li class="${i.level>=k?'on':''}"><b>${t('levels')[k]}</b> ${t('levelRule')[k]}</li>`).join('')}</ul>
    <button class="btn primary block" data-start="skill" data-skill="${s}">${PRO()?'':LOCKSVG}${t('practice10')}</button>${PRO()?'':`<p class="small muted">${t('ben').skill}</p>`}</div>`;
  const sc=FLASH.filter(c=>c.sk===s);
  return `<header class="page-h lesson-h"><div><a class="back" href="#learn-lessons">${t('learnTitle')}</a><h1><span class="hl">${SKILLS[s][S.lang]}</span></h1></div><div class="lh-ill">${ILL[sc[0].ill]()}</div></header>
  <div class="lesson">
    <div class="lesson-main">
      <section class="card"><h2>${t('concept')}</h2>${l.concept.map(p=>`<p>${M(esc(p))}</p>`).join('')}</section>
      ${xpSection(s)}
      <section><h2 class="h2s">${t('skillCards')}</h2><div class="notes small-notes">${sc.map(c=>cardOpen(c)?`<details class="mini-flash"><summary>${stickyCard(c,false,false)}</summary>${stickyCard(c,true,false)}</details>`:`<button type="button" class="mini-lock ${['c0','c1','c2','c3'][ALL_SKILLS.indexOf(c.sk)%4]}" data-lock="cards"><span class="chip">${SKILLS[c.sk][S.lang]}</span><b>${esc(L(c.f))}</b>${lockBadge()}</button>`).join('')}</div></section>
      <aside class="callout"><div class="eyebrow">${t('mind')}</div><p>${M(esc(l.mind))}</p></aside>
      <section class="card"><h2>${t('steps')}</h2><ol class="nsteps">${l.steps.map(x=>`<li><span>${M(esc(x))}</span></li>`).join('')}</ol></section>
      <section><h2 class="h2s">${t('types')}</h2><div class="tgrid2">${l.types.map(x=>`<div class="tcell"><b>${esc(x[0])}</b><span>${M(esc(x[1]))}</span></div>`).join('')}</div></section>
      ${l.rules?`<section><h2 class="h2s">${t('rules')}</h2><div class="rules">${l.rules.map(x=>`<div class="rule">${M(esc(x))}</div>`).join('')}</div></section>`:''}
      <section class="card warn-card"><h2>${t('traps')}</h2><ul class="bul">${l.traps.map(x=>`<li>${M(esc(x))}</li>`).join('')}</ul></section>
      <section><h2 class="h2s">${t('examples')}</h2><div class="exgrid">${l.examples.map((e,k)=>`<details class="excard"><summary><span class="exq">${M(esc(e.q))}</span><span class="reveal">${ar?'اضغط لإظهار الحل':'Tap to reveal'}</span></summary><p><strong>${t('answer')}:</strong> ${M(esc(e.a))}</p><p class="muted"><strong>${t('why')}:</strong> ${M(esc(e.why))}</p></details>`).join('')}</div></section>
      <section class="card accent-card"><h2>${t('speed')}</h2><ul class="bul">${l.speed.map(x=>`<li>${M(esc(x))}</li>`).join('')}</ul></section>
      <section><h2 class="h2s">${t('more')}</h2><div class="rgrid">${res.map(resCard).join('')}</div></section>
      <div class="mobile-cta"><button class="btn primary block xl" data-start="skill" data-skill="${s}">${PRO()?'':LOCKSVG}${t('practice10')}</button></div>
    </div>
    <aside class="lesson-side">${side}</aside>
  </div>`;
}
let VC={flip:false};
function vocabDue(){ const d=todayStr(), st=S.vocab[S.lang]||(S.vocab[S.lang]={});
  if(!PRO()){ const fv=freeVocab(S.lang); return VOC0[S.lang].filter(([w])=>fv.has(w)&&!(st[w]?.box>=4)).sort((a,b)=>(st[a[0]]?.ag||0)-(st[b[0]]?.ag||0)); }
  return VOCAB[S.lang].filter(([w])=>!st[w]||(st[w].box<4&&(st[w].due||d)<=d)); }
function vocabView(){
  const st=S.vocab[S.lang]||{}, due=vocabDue(), pro=PRO(), fv=pro?null:freeVocab(S.lang), open=pro?VOCAB[S.lang].length:fv.size, known=VOCAB[S.lang].filter(([w])=>st[w]?.box>=4&&(pro||fv.has(w))).length;
  const head=`<p class="lead">${t('vocabIntro')}</p><div class="vstats"><span><b class="num">${numL(known)}</b> ${t('known')}</span><span><b class="num">${numL(due.length)}</b> ${t('left')}</span><span class="muted">/ ${numL(open)}</span></div>${open<VOCAB[S.lang].length?lockLine('cards',t('moreWords')(numL(VOCAB[S.lang].length-open))):''}`;
  if(!due.length) return head+`<div class="card center"><p>${t('vocabDone')}</p></div>`;
  const [w,m]=due[0];
  return head+`<button class="vcard ${VC.flip?'flipped':''}" id="vcard"><span class="v-word">${esc(w)}</span>${VC.flip?`<span class="v-mean">${esc(m)}</span>`:`<span class="v-hint">${t('flip')}</span>`}</button>
  <div class="vbtns">${VC.flip?`<button class="btn ghost" id="v-again">${t('again')}</button><button class="btn primary" id="v-know">${t('know')}</button>`:''}</div>`;
}
function vocabAct(ok){ const st=S.vocab[S.lang]||(S.vocab[S.lang]={}); const due=vocabDue(); if(!due.length) return; const w=due[0][0]; const c=st[w]||{box:0}; const INT=[1,2,4,8]; c.t=Date.now();
  if(!PRO()){ if(ok){ c.box=4; c.due=todayStr(); } else { c.box=0; c.ag=Date.now(); } st[w]=c; VC.flip=false; save(); return renderRoute(); }
  if(ok){ c.box=(c.box||0)+1; c.due=addDays(todayStr(),INT[Math.min(3,c.box-1)]); } else { c.box=0; c.due=todayStr(); const arr=VOCAB[S.lang]; const idx=arr.findIndex(x=>x[0]===w); arr.push(arr.splice(idx,1)[0]); }
  st[w]=c; VC.flip=false; save(); renderRoute(); }
function pagePractice(){
  const due=dueList().length, pro=PRO(), dl=acct()?dailyLeft():Infinity, dt=diagTaken();
  const card=(k,title,desc,cls='',meta='')=>{ const lk=!pro&&(PRO_KINDS[k]||(k==='diag'&&dt));
    if(lk) return `<article class="pcard locked ${cls}"><div><h3>${title} ${lockBadge()}</h3><p>${desc}</p>${meta}${k==='diag'?`<p class="ben small">${t('ben').diag}</p>`:''}</div><button class="btn soft" data-start="${k}">${LOCKSVG} ${t('unlock')}</button></article>`;
    const out=!pro&&(k==='session'||k==='review')&&dl<=0;
    return `<article class="pcard ${cls}"><div><h3>${title}</h3><p>${desc}</p>${meta}</div>${out?`<button class="btn ${cls==='feature'?'primary':'soft'}" data-lock="daily">${LOCKSVG} ${t('unlock')}</button>`:`<button class="btn ${cls==='feature'?'primary':cls==='dark'?'sand':'soft'}" data-start="${k}" ${k==='review'&&!due?'disabled':''}>${t('start')}</button>`}</article>`; };
  const nMist=openMistakes().length;
  const nd=!due&&nMist?openMistakes().map(m=>m.due||'').sort()[0]:null;
  const revHint=!nMist?`<p class="small muted">${t('noMist')}</p>`:nd?`<p class="small muted">${t('nextRev')(nd===addDays(todayStr(),1)?t('tomorrow'):dateH(nd))}</p>`:'';
  const dmeta=dl!==Infinity?`<p class="small daily-left">${dl>0?t('dailyLeft')(numL(dl),numL(FREE.dailyQuestions)):t('dailyOut')}</p>`:'';
  const C_={session:card('session',t('pSession'),t('pSessionD'),'feature',dmeta),diag:card('diag',t('pDiag'),t('pDiagD'),'',dt&&!pro?`<p class="small">✓ ${t('diagDone')}</p>`:''),
    review:card('review',t('pReview'),t('pReviewD'),'',`${due?`<p class="due-n"><b class="num">${numL(due)}</b> ${t('due')}</p>`:''}${revHint}${!pro&&nMist>(+FREE.mistakesMax||0)?`<p class="small muted">${t('mistCap')(numL(FREE.mistakesMax))}</p>`:''}`),
    mock:card('mock',t('pMock'),t('pMockD'),'dark',`<p class="small">${S.track==='sci'?(S.lang==='ar'?'علمي: لفظي، كمي، لفظي، كمي، لفظي':'Science: V, Q, V, Q, V'):(S.lang==='ar'?'نظري: لفظي، لفظي، كمي، لفظي، لفظي':'Theoretical: V, V, Q, V, V')}</p>`),verbal:card('verbal',t('pVerbal'),t('pVerbalD')),quant:card('quant',t('pQuant'),t('pQuantD'))};
  const head=`<header class="page-h"><h1>${t('practiceTitle')}</h1><p>${t('practiceIntro')}</p></header>
`;
  const rsBlock=`  <section class="models rs-block"><div class="block-head"><h2 class="hl">${t('rsTitle')}</h2><span class="muted small">${numL(Object.keys(S.rs||{}).length)} / ${numL(RS_N)} ${t('rsDone')}</span></div><p class="muted">${t('rsIntro')}${pro?'':' '+t('rsFreeNote')}</p>
    ${mfold([...Array(RS_N)].map((_,k)=>{ const m=(S.rs||{})[k], open=pro||k<RS_FREE, nm=rsSection(k).name[S.lang]; return `<div class="mcell"><button class="mbox ${m?'done':''} ${m&&m.best>=95?'star':''} ${open?'':'locked'}" data-rs="${k}" aria-label="${t('rsOne')} ${k+1} · ${esc(nm)}${open?'':' · '+t('lockT')}"><span class="mb-n">${t('rsOne')}</span><b class="num">${numL(k+1)}</b><span class="mb-s">${m?`<span class="num">${numL(m.best)}%</span>`:open?esc(nm):LOCKSVG}</span></button></div>`; }),pro?6:RS_FREE,pro?'':'test',RS_N-RS_FREE)}</section>
`;
  const more=`  <section class="models"><div class="block-head"><h2 class="hl">${t('modelsTitle')}</h2><span class="muted small">${numL(Object.keys(S.models).length)} / ${numL(30)} ${t('modelsDone')}</span></div><p class="muted">${t('modelsIntro')}</p>${pro?'':lockLine('test',t('ben').models)}
    ${mfold([...Array(30)].map((_,k)=>{ const m=S.models[k], has=m&&m.aid&&(getDetail(m.aid)||S.attempts.some(a=>a.id===m.aid)); return `<div class="mcell"><button class="mbox ${m?'done':''} ${m&&m.best>=95?'star':''} ${pro?'':'locked'}" data-model="${k}" aria-label="${t('model')} ${k+1}${pro?'':' · '+t('lockT')}"><span class="mb-n">${t('model')}</span><b class="num">${numL(k+1)}</b><span class="mb-s num">${m?numL(m.best)+'%':pro?t('notTaken'):LOCKSVG}</span></button>${has?`<button class="mb-rev" data-review="${m.aid}">${pro?'':LOCKSVG}${t('reviewBtn')}</button>`:''}</div>`; }),pro?6:0,pro?'':'test',30)}</section>
  <h2 class="sec-h hl">${t('bySkillTitle')}</h2>${pro?'':lockLine('skill')}
  ${pro?'':'<!--'}<div class="skgrid">${ALL_SKILLS.map(s=>{ const i=skillInfo(s); return `<button class="skbtn ${pro?'':'locked'}" data-start="skill" data-skill="${s}"><span class="sk-n">${SKILLS[s][S.lang]}${pro?'':LOCKSVG}</span>${pips(i.level)}<small>${t('levels')[i.level]}${i.acc!=null?' · '+numL(Math.round(i.acc*100))+'%':''}</small></button>`; }).join('')}</div>${pro?'':'-->'}`;
  if(pro) return head+`<h2 class="sr-only">${t('practiceKinds')}</h2><div class="pgrid">${C_.session}${C_.diag}${C_.review}${C_.mock}${C_.verbal}${C_.quant}</div>`+more+rsBlock;
  /* free: what can be started now, then one line for everything that needs a subscription */
  return head+`<h2 class="sr-only">${t('practiceKinds')}</h2><div class="pgrid">${C_.session}${dt?'':C_.diag}${C_.review}</div>`+rsBlock
    +`<h2 class="sec-h hl">${L(bi('اختبر نفسك كيوم الاختبار','Test yourself as on test day'))}</h2><div class="pgrid">${C_.mock}${C_.verbal}${C_.quant}${dt?C_.diag:''}</div>`+more;
}
function pageProgress(){
  const real=S.attempts.length>0, D={recent:S.recent,attempts:S.attempts,causes:S.causes};
  const est=estimate(D.recent), rd=real?readiness(D.recent,D.attempts):null; const n=D.recent.length, c=D.recent.filter(x=>x.ok).length, tm=n?Math.round(D.recent.reduce((a,x)=>a+(x.t||0),0)/n):null;
  const streak=calcStreak(); const kpi=(l,v,sub='')=>`<div class="kpi"><span class="kl">${l}</span><b class="kv num">${v}</b>${sub?`<span class="ks">${sub}</span>`:''}</div>`;
  const checks=readyChecks(D.recent,D.attempts); const info=ALL_SKILLS.map(s=>skillInfo(s,D.recent));
  const cz=D.causes, ctot=Object.values(cz).reduce((a,b)=>a+b,0), pro=PRO();
  const lkpi=l=>`<button type="button" class="kpi kpi-locked" data-lock="analytics"><span class="kl">${l}</span><b class="kv">${LOCKSVG}</b><span class="ks">${t('ben').analytics}</span></button>`;
  /* free analytics: the overall mastery map + detail for the two weakest skills */
  const detail=pro?info:info.slice().sort((a,b)=>((b.n?1:0)-(a.n?1:0))||((a.acc??1)-(b.acc??1))).slice(0,2);
  const srow=i=>`<a class="srow" href="#lesson-${i.s}"><span class="sn">${SKILLS[i.s][S.lang]}</span><span class="sl">${pips(i.level)}<small>${t('levels')[i.level]}</small></span><span class="sb">${barRow('',i.acc,'')}</span><span class="stime num ${i.time!=null&&i.time>TARGET_T[i.s]?'slow':''}">${i.time!=null?numL(Math.round(i.time)):'—'} / ${numL(TARGET_T[i.s])}${t('sec')}</span></a>`;
  return `<header class="page-h"><h1>${t('progressTitle')}</h1></header>
  ${real?'':`<div class="demo empty-state"><span><b>${t('emptyT')}.</b> ${t('emptyD')}</span><button class="btn primary sm" data-start="diag">${t('diagFirst')}</button></div>`}
  ${CLOUD_BUILD&&!pro&&reportReady()?`<div class="demo rep-line"><span>${t('reportLink')}</span><a class="btn primary sm" href="#report">${t('reportOpen')}</a></div>`:''}
  <div class="kpis">
    <div class="kpi big">${ring(rd,'%',104)}<div><span class="kl">${t('kReady')}</span><span class="ks">${numL(checks.filter(Boolean).length)}/${numL(4)} ${S.lang==='ar'?'معايير متحققة':'criteria met'}</span></div></div>
    ${pro?kpi(t('kEst'),est==null?'—':numL(est),est!=null?`${t('gap')}: ${numL(Math.max(0,S.target-est))}`:''):lkpi(t('kEst'))}
    ${kpi(t('kSolved'),numL(n))}${kpi(t('kAcc'),n?numL(Math.round(100*c/n))+'%':'—')}${pro?kpi(t('kTime'),tm!=null?numL(tm)+t('sec'):'—'):lkpi(t('kTime'))}${kpi(t('kStreak'),numL(streak))}
  </div>
  <p class="note small">${t('estNote')}</p>
  <div class="dgrid">
    <section class="card wide"><h2>${t('recoTitle')}</h2><ol class="reco">${(real?recos(D,info):[{lv:'none',h:t('recoStartH'),p:t('recoStartP'),act:'data-start="diag"'}]).map(r=>`<li class="${r.lv}"><div><strong>${r.h}</strong><p>${r.p}</p></div>${r.act?`<button class="btn sm soft" ${r.act}>${t('start')}</button>`:''}</li>`).join('')}</ol></section>
    <section class="card wide"><h2>${t('skillsTitle')}</h2>
      ${pro?'':`${masteryMap()}<h3 class="sd-h">${t('detail2')}</h3>`}<div class="stable">${detail.map(srow).join('')}</div>${pro?'':lockLine('analytics',t('ben').detail)}
      <p class="small muted">${S.lang==='ar'?'العلامة عند ٩٥٪ هي معيار «ثبات». الزمن: زمنك / المستهدف.':'The marker at 95% is the "Locked in" bar. Time: yours / target.'}</p></section>
    <section class="card"><h2>${t('trendTitle')}</h2>${pro?trend(D.attempts.filter(a=>a.est!=null)):lockLine('analytics',t('ben').est)}</section>
    <section class="card"><h2>${t('causesTitle')}</h2>${!pro?lockLine('analytics',t('ben').causes):ctot?Object.entries(cz).map(([k,v])=>`<div class="cause-row"><div class="cr-h"><b>${t('causes')[k]}</b><span class="num">${numL(Math.round(100*v/ctot))}%</span></div><span class="bt"><span class="bf sand" style="inline-size:${Math.round(100*v/ctot)}%"></span></span><p class="small muted">${t('causeFix')[k]}</p></div>`).join(''):`<p class="muted">${t('noCauses')}</p>`}</section>
    <section class="card"><h2>${t('roadTitle')}</h2><ul class="checks">${t('ready').map((x,i)=>`<li class="${checks[i]?'ok':''}"><span class="ck">${checks[i]?ICON.check:''}</span>${x}</li>`).join('')}</ul></section>
    <section class="card"><h2>${t('historyTitle')}</h2>${D.attempts.length?`<div class="tbl"><table><thead><tr><th>${t('date')}</th><th>${t('type')}</th><th>${t('score')}</th><th>${t('estGat')}</th><th></th></tr></thead><tbody>${D.attempts.slice(-30).reverse().map(a=>{ const has=!!a.id&&pro; return `<tr class="${has?'clickable':''}" ${has?`data-review="${a.id}" tabindex="0"`:''}><td class="num">${dateShort(a.date)}</td><td>${t('kinds')[a.kind]||a.kind}${a.mk?' '+numL(a.mk):''}${a.skill?' · '+SKILLS[a.skill][S.lang]:''}</td><td class="num">${numL(a.pct)}%</td><td class="num">${a.est==null?'—':pro?numL(a.est):LOCKSVG}</td><td>${has?`<span class="rev-link">${getDetail(a.id)?t('reviewBtn'):t('summaryOnly')}</span>`:!pro&&a.id?`<button type="button" class="rev-lock" data-lock="review" aria-label="${t('reviewBtn')} · ${t('lockT')}">${LOCKSVG}${t('reviewBtn')}</button>`:''}</td></tr>`; }).join('')}</tbody></table></div><p class="small muted">${pro?t('reviewHint'):t('ben').review}</p>`:`<p class="muted">${t('noHistory')}</p>`}</section>
    ${CLOUD_BUILD?`<section class="card wide save-card" id="save"><h2>${t('saveTitle2')}</h2>
      ${window.CLOUD?.user?`<div class="save-auto ok"><span class="sa-ic" aria-hidden="true">${ICON.check}</span><div><p>${t('autoOn')}</p><p class="small muted"><span dir="ltr">${esc(window.CLOUD.user.email||'')}</span> <span id="cloud-line">${cloudLine()}</span></p></div><button class="btn ghost sm" data-acct="1">${t('acctManage')}</button></div>`
        :`<div class="save-auto ${STORE_OK?'':'bad'}"><div><p>${STORE_OK?t('autoGuest'):t('autoGuestBad')}</p></div><button class="btn primary sm" data-acct="1" data-tab="signup">${t('acctJoin')}</button></div>`}
`:`<section class="card wide save-card" id="save"><h2>${t('saveTitle')}</h2>
      <div class="save-grid">
        ${window.CLOUD?`<div class="save-opt cloud ${window.CLOUD.user?'ok':''}"><b>${t('cloudT')}</b><p class="small">${window.CLOUD.user?t('cloudOn')+' '+esc(window.CLOUD.user.email||''):t('cloudOff')}</p><p class="small muted" id="cloud-line">${cloudLine()}</p><button class="btn ${window.CLOUD.user?'ghost':'primary'} sm" data-acct="1">${window.CLOUD.user?t('acctManage'):t('acctJoin')}</button></div>`:''}
        <div class="save-opt ${STORE_OK?'ok':'bad'}"><b>${t('saveAuto')}</b><p class="small">${STORE_OK?t('saveAutoD'):tc('saveFail')}</p><p class="small muted">${S.savedAt?t('lastSaved')+' '+new Date(S.savedAt).toLocaleString(S.lang==='ar'?'ar-SA':'en-GB',{dateStyle:'medium',timeStyle:'short'}):''}${PERSIST?' · '+t('persistOn'):''}</p></div>
        <div class="save-opt"><b>${t('saveFile')}</b><p class="small">${t('saveFileD')}</p><div class="row"><button class="btn primary sm" id="bk-file">${t('saveFileBtn')}</button><label class="btn ghost sm file-lbl">${t('loadFileBtn')}<input type="file" id="bk-load" accept=".json,application/json" hidden></label></div><p class="small muted">${S.lastExport?t('lastExport')+' '+S.lastExport:t('noExport')}</p></div>
        <div class="save-opt"><b>${t('saveCode')}</b><p class="small">${t('backupD')}</p><div class="bk"><button class="btn ghost sm" id="bk-copy">${t('copyCode')}</button><textarea id="bk-in" rows="2" placeholder="${t('pasteHere')}"></textarea><button class="btn ghost sm" id="bk-imp">${t('importCode')}</button></div></div>
      </div>
`}
      <div class="row"><button class="btn danger-ghost sm" id="bk-reset">${t('reset')}</button></div><div id="bk-confirm"></div></section>
  </div>${shareCard()}`;
}
/* share your progress, and invite a friend: 7 bonus days for each of you when the friend first subscribes */
let REF=null;
function shareCard(){ const real=S.attempts.length>0, d=S.diag, est=estimate(), u=window.CLOUD&&CLOUD.user;
  return `<section class="card share-card"><h2>${L(bi('شارك وادعُ صديقك','Share and invite a friend'))}</h2>
    ${real?`<p>${L(bi('أرسل تقدمك لأهلك أو أصدقائك: من أين بدأت وأين وصلت.','Send your progress to family or friends: where you started and where you are now.'))}</p><button class="btn ghost sm" id="sh-prog">${L(bi('شارك تقدمي','Share my progress'))}</button>`:''}
    ${u?`<p>${L(bi('ادعُ صديقًا برابطك: إذا اشترك، يحصل كل منكما على ٧ أيام إضافية.','Invite a friend with your link: when they subscribe, you both get 7 extra days.'))}</p>${REF?`<p class="ref-l"><bdi dir="ltr">${esc(location.origin+'/?ref='+REF.code)}</bdi></p><p class="small muted">${L(bi(`انضم برابطك ${numL(REF.joined)}، واشترك ${numL(REF.subscribed)}.`,`Joined with your link: ${REF.joined}; subscribed: ${REF.subscribed}.`))}</p><button class="btn primary sm" id="sh-ref">${L(bi('شارك رابط الدعوة','Share the invitation'))}</button>`:`<button class="btn primary sm" id="ref-get">${L(bi('اعرض رابط دعوتك','Show your invitation link'))}</button>`}`:''}
  </section>`; }
async function shareOrCopy(text,url){ try{ if(navigator.share){ await navigator.share({text,url}); return; } }catch(e){ if(e&&e.name==='AbortError') return; } try{ await navigator.clipboard.writeText(text+' '+url); toast(L(bi('نُسخ، والصقه حيث تريد.','Copied; paste it wherever you like.'))); }catch(e){ toast(url); } }
function bindShare(m){ const pg=m.querySelector('#sh-prog'); if(pg) pg.onclick=()=>{ const d=S.diag, est=estimate(), url=location.origin+(REF?'/?ref='+REF.code:'');
    const txt=L(bi(`أتحضّر لاختبار القدرات في أكاديمية القدرات${d?`: بدأت بالتشخيص بنسبة ${numL(d.pct)}٪`:''}${est!=null?`، ودرجتي التقديرية الآن ${numL(est)}`:''}، وأنهيت ${numL(S.days.length)} ${S.days.length<=10?'أيام':'يومًا'} من التدريب.`,`I'm preparing for the GAT with GAT Academy${d?`: I started at ${d.pct}% on the diagnostic`:''}${est!=null?`, my estimated score is now ${est}`:''}, after ${S.days.length} days of practice.`));
    shareOrCopy(txt,url); };
  const g=m.querySelector('#ref-get'); if(g) g.onclick=async()=>{ try{ const r=await fetch('/api/ref',{credentials:'same-origin'}); REF=await r.json(); renderRoute(); }catch(e){ toast(tc?tc('saveFail'):'…'); } };
  const sr=m.querySelector('#sh-ref'); if(sr) sr.onclick=()=>shareOrCopy(L(bi('أتحضّر لاختبار القدرات في أكاديمية القدرات، جرّب الاختبار التشخيصي المجاني من رابطي:','I\'m preparing for the GAT with GAT Academy. Try the free diagnostic with my link:')),location.origin+'/?ref='+REF.code); }
/* streak protection: two "freeze" days for everyone (one more each week for subscribers, up to three). A single missed day is covered automatically. */
/* after the real test: the student's actual score, whether a retake is planned (with a new date), and an optional quote published only with consent */
/* the taste of everything after the diagnostic (signed in, never subscribed, trial turned on by the admin) */
/* Today shows at most one extra card, by priority, so the page stays calm */
const dateAskCard=()=>!S.examDate&&diagTaken()?`<form class="demo date-ask" id="dt-ask"><label for="dt-in">${L(bi('متى اختبارك؟ نعدّ لك الأيام ونرتّب خطتك عليها.','When is your test? We count the days and fit your plan to them.'))}</label><span class="row"><input type="date" id="dt-in" min="${todayStr()}" required><button class="btn primary sm" type="submit">${t('save')}</button></span></form>`:'';
const extraCard=()=>postTestCard()||trialCard()||dateAskCard()||installCard();
function trialCard(){ const C=window.CLOUD, n=+(C&&C.config&&C.config.trialDays)||0; if(!n||!C.user||PRO()||!diagTaken()||S.trialAsked) return '';
  return `<section class="card trial-card"><div><div class="eyebrow">${L(bi('هدية بعد التشخيص','A gift after your diagnostic'))}</div><h2>${L(bi(`جرّب كل شيء ${numL(n)} ${n<=10?'أيام':'يومًا'} مجانًا`,`Try everything free for ${n} days`))}</h2>
    <p class="muted">${L(bi('المحاكاة الكاملة، والنماذج الثلاثون، والأقسام المتكررة الستون، وتدريبات التأسيس كلها، وتحليل أخطائك. بلا بطاقة دفع، وتعود إلى المجاني تلقائيًا.','Full mocks, the 30 model tests, all 60 recurring sections, every foundation drill and your mistake analysis. No card needed; you return to the free plan automatically.'))}</p></div>
    <div class="row"><button class="btn primary" id="tr-go">${L(bi('ابدأ التجربة','Start the trial'))}</button><button class="btn ghost sm" id="tr-x">${L(bi('لاحقًا','Later'))}</button></div></section>`; }
function bindTrial(m){ const g=m.querySelector('#tr-go'); if(g) g.onclick=async()=>{ g.disabled=true; try{ await CLOUD.startTrial(); S.trialAsked=1; save(); toast(L(bi('بدأت تجربتك. كل المزايا مفتوحة الآن.','Your trial has started. Everything is open now.'))); renderRoute(); }catch(e){ S.trialAsked=1; save(); toast(L(bi('التجربة متاحة مرة واحدة لكل حساب.','The trial is available once per account.'))); renderRoute(); } };
  const x=m.querySelector('#tr-x'); if(x) x.onclick=()=>{ S.trialAsked=1; save(); renderRoute(); }; }
function postTestCard(){ const d=daysLeft(); if(d==null||d>0||!S.examDate) return ''; if((S.real||[]).some(r=>r.date===S.examDate)) return '';
  return `<section class="card post-test"><div class="eyebrow">${L(bi('بعد الاختبار','After the test'))}</div><h2>${L(bi('كيف كان اختبارك؟','How did your test go?'))}</h2>
  <p class="muted">${L(bi('أدخل درجتك لنعرف أثر التحضير، ونبني خطة المحاولة التالية إن أردت إعادة الاختبار.','Enter your score so we can see what the preparation did, and build a plan for your next attempt if you want to retake.'))}</p>
  <form id="pt-f" class="acct-form" novalidate>
    <label>${L(bi('درجتك (من ١٠٠)','Your score (out of 100)'))}<input type="number" id="pt-s" min="0" max="100" required inputmode="numeric" dir="ltr"></label>
    <label>${L(bi('أي محاولة كانت؟','Which attempt was it?'))}<select id="pt-a">${[1,2,3,4,5].map(n=>`<option value="${n}">${numL(n)}</option>`).join('')}</select></label>
    <label class="chkl"><input type="checkbox" id="pt-r"> <span>${L(bi('سأعيد الاختبار لأرفع درجتي','I will retake the test to raise my score'))}</span></label>
    <label id="pt-dl" hidden>${L(bi('موعد المحاولة القادمة','Date of your next attempt'))}<input type="date" id="pt-d" min="${todayStr()}"></label>
    <details><summary>${L(bi('شارك تجربتك (اختياري)','Share your experience (optional)'))}</summary>
      <label>${L(bi('كلمة عن تحضيرك','A few words about your preparation'))}<textarea id="pt-q" maxlength="400" rows="3"></textarea></label>
      <label>${L(bi('مدينتك','Your city'))}<input type="text" id="pt-c" maxlength="40"></label>
      <label class="chkl"><input type="checkbox" id="pt-ok"> <span>${L(bi('أوافق على نشر رأيي مع اسمي الأول ومدينتي','I agree to publishing my words with my first name and city'))}</span></label></details>
    <button class="btn primary" type="submit">${t('save')}</button></form></section>`; }
function bindPostTest(m){ const f=m.querySelector('#pt-f'); if(!f) return; const r=f.querySelector('#pt-r'); r.onchange=()=>{ f.querySelector('#pt-dl').hidden=!r.checked; };
  f.onsubmit=async e=>{ e.preventDefault(); const sc=Math.round(+f.querySelector('#pt-s').value); if(!(sc>=0&&sc<=100)||f.querySelector('#pt-s').value===''){ toast(L(bi('أدخل درجة من ٠ إلى ١٠٠.','Enter a score from 0 to 100.'))); return; }
    const rec={date:S.examDate,score:sc,attempt:+f.querySelector('#pt-a').value,retake:r.checked}; S.real=(S.real||[]).concat(rec);
    const body={...rec,examDate:S.examDate,quote:f.querySelector('#pt-q').value,city:f.querySelector('#pt-c').value,consent:f.querySelector('#pt-ok').checked};
    const nd=f.querySelector('#pt-d').value; if(r.checked&&nd){ S.examDate=nd; S.planStart=todayStr(); S.done={}; }
    save(); try{ if(window.CLOUD&&CLOUD.user) await fetch('/api/results',{method:'POST',headers:{'Content-Type':'application/json','X-Masar':'1'},credentials:'same-origin',body:JSON.stringify(body)}); }catch(e2){}
    toast(r.checked?L(bi('حُفظت درجتك، وخطتك الآن للمحاولة القادمة.','Score saved; your plan now targets the next attempt.')):L(bi('حُفظت درجتك. بالتوفيق في مرحلتك القادمة!','Score saved. Good luck with what comes next!'))); renderRoute(); }; }
function streakGuard(){ if(!Array.isArray(S.days)||!S.days.length) return; if(S.freezes==null) S.freezes=2; S.frozen=S.frozen||[];
  const wk=Math.floor(Date.now()/(7*864e5)); if(PRO()&&S.frzWeek!==wk){ S.frzWeek=wk; S.freezes=Math.min(3,S.freezes+1); }
  const t0=todayStr(), y=addDays(t0,-1), y2=addDays(t0,-2), has=d=>S.days.includes(d)||S.frozen.includes(d);
  if(!has(y)&&has(y2)&&S.freezes>0){ S.frozen.push(y); S.frozen=S.frozen.slice(-30); S.freezes--; save(); setTimeout(()=>toast(L(bi(`حمينا سلسلتك بيوم حماية، وبقي لك ${numL(S.freezes)}.`,`We used a streak freeze to keep your streak; ${S.freezes} left.`))),1200); } }
function calcStreak(){ const set=new Set([...(S.days||[]),...(S.frozen||[])]); let n=0, d=todayStr(); if(!set.has(d)) d=addDays(d,-1); while(set.has(d)){ n++; d=addDays(d,-1); } return n; }
function recos(D,info){
  const ar=S.lang==='ar', out=[], pro=PRO();
  const due=dueList().length; if(due) out.push({lv:'warn',h:ar?`${numL(due)} مراجعة مستحقة`:`${due} reviews due`,p:ar?'المراجعة في موعدها تمنع تكرار الخطأ نفسه يوم الاختبار.':'Reviewing on time keeps the same mistake from showing up on test day.',act:'data-start="review"'});
  info.filter(i=>i.n>=5&&i.level<3).sort((a,b)=>a.acc-b.acc).slice(0,2).forEach(i=>out.push({lv:lvlOf(i.acc),h:(ar?'ارفع مستواك في ':'Improve ')+SKILLS[i.s][S.lang]+` (${numL(Math.round(i.acc*100))}%)`,p:ar?'راجع «كيف يفكر واضع السؤال» و«الفخاخ» في الدرس، ثم تدرّب بالتصحيح الفوري حتى ٨٥٪.':'Reread "How the test writer thinks" and "Traps" in the lesson, then practice with instant feedback until you reach 85%.',act:pro?`data-start="skill" data-skill="${i.s}"`:`data-href="#lesson-${i.s}"`}));
  const slow=!pro?null:info.filter(i=>i.n>=5&&i.time>TARGET_T[i.s]).sort((a,b)=>(b.time/TARGET_T[b.s])-(a.time/TARGET_T[a.s]))[0];
  if(slow) out.push({lv:'warn',h:(ar?'السرعة في ':'Speed in ')+SKILLS[slow.s][S.lang],p:ar?`زمنك ${numL(Math.round(slow.time))} ث والمستهدف ${numL(TARGET_T[slow.s])} ث. تدرّب بأقسام مؤقتة.`:`Your time is ${Math.round(slow.time)}s vs a ${TARGET_T[slow.s]}s target. Practice timed sections.`,act:`data-start="${SKILLS[slow.s].area==='V'?'verbal':'quant'}"`});
  const top=Object.entries(D.causes||{}).sort((a,b)=>b[1]-a[1])[0]; if(pro&&top&&top[1]>0) out.push({lv:'none',h:(ar?'أكثر أسباب أخطائك: ':'Top mistake cause: ')+t('causes')[top[0]],p:t('causeFix')[top[0]]});
  info.filter(i=>!i.n).slice(0,1).forEach(i=>out.push({lv:'none',h:(ar?'لم تبدأ: ':'Not started: ')+SKILLS[i.s][S.lang],p:ar?'افتح الدرس ثم تدرّب.':'Open the lesson, then practice.',act:pro?`data-start="skill" data-skill="${i.s}"`:`data-href="#lesson-${i.s}"`}));
  const mocks=D.attempts.filter(isMock).length; if(pro&&mocks<3) out.push({lv:'none',h:ar?`محاكاة كاملة (${numL(mocks)} من ٣)`:`Full simulation (${mocks} of 3)`,p:ar?'محاكاة الاختبار بظروفه الحقيقية تجعل يومه مألوفًا لك.':'Simulating the real test makes test day feel familiar.',act:'data-start="mock"'});
  if(CLOUD_BUILD){ if(!acct()&&S.attempts.length) out.push({lv:'warn',h:t('nudgeAcctH'),p:t('nudgeAcctP'),act:'data-acct="1" data-tab="signup"'}); }
  else if(S.attempts.length>=3&&(!S.lastExport||(new Date()-new Date(S.lastExport))/864e5>7)) out.push({lv:'warn',h:t('nudgeH'),p:t('nudgeP'),act:'data-go="save"'});
  if(!out.length) out.push({lv:'good',h:ar?'أنت في مسار الـ ١٠٠':'You are on track for 100',p:ar?'واظب على جلسة اليوم، ومحاكاة كاملة كل أسبوع.':'Keep up the daily session and a full simulation each week.'});
  return out.slice(0,5);
}
function trend(att){
  if(!att.length) return `<p class="muted">${t('noHistory')}</p>`;
  const W0=560,H=220,p={l:34,r:14,t:18,b:24},n=att.length; const lo=Math.max(0,Math.floor((Math.min(...att.map(a=>a.est))-10)/10)*10), hi=100;
  const x=i=>p.l+(n===1?(W0-p.l-p.r)/2:i*(W0-p.l-p.r)/(n-1)), y=v=>p.t+(hi-v)*(H-p.t-p.b)/(hi-lo);
  const g=[]; for(let v=lo;v<=hi;v+=10) g.push(v); const line=att.map((a,i)=>`${i?'L':'M'}${x(i).toFixed(1)} ${y(a.est).toFixed(1)}`).join(' ');
  return `<div class="chart" dir="ltr"><svg viewBox="0 0 ${W0} ${H}" role="img" aria-label="${t('trendTitle')}">${g.map(v=>`<line x1="${p.l}" x2="${W0-p.r}" y1="${y(v)}" y2="${y(v)}" class="grid"/><text x="${p.l-6}" y="${y(v)+4}" text-anchor="end" class="ax">${numL(v)}</text>`).join('')}
  <line x1="${p.l}" x2="${W0-p.r}" y1="${y(S.target)}" y2="${y(S.target)}" class="tgt"/>
  <path d="${line} L${x(n-1).toFixed(1)} ${y(lo)} L${x(0).toFixed(1)} ${y(lo)} Z" class="area"/><path d="${line}" class="ln"/>
  ${att.map((a,i)=>`<g class="pt"><circle cx="${x(i)}" cy="${y(a.est)}" r="${i===n-1?6:4}"/><circle cx="${x(i)}" cy="${y(a.est)}" r="14" class="hit"><title>${a.date} · ${t('kinds')[a.kind]||a.kind}: ${a.est}</title></circle></g>`).join('')}
  <text x="${x(n-1)}" y="${y(att[n-1].est)-12}" text-anchor="middle" class="lab">${numL(att[n-1].est)}</text></svg></div>`;
}
function pageGuide(){
  const g=GUIDE[S.lang]; const secs=[{id:'method',h:t('methodTitle')},...g];
  return `<header class="page-h"><h1>${t('guideTitle')}</h1><p class="note">${t('verifyNote')}</p></header>
  <nav class="toc">${secs.map(s=>`<a href="#guide" data-scroll="g-${s.id}">${s.h}</a>`).join('')}</nav>
  <div class="guide-body">
    <section id="g-method" class="gsec"><h2>${t('methodTitle')}</h2><p>${t('methodIntro')}</p><div class="method-grid">${METHOD[S.lang].map((m,i)=>`<div class="mcard"><span class="mnum num">${numL(i+1)}</span><h3>${m[0]}</h3><p>${m[1]}</p><span class="mtag">${m[2]}</span></div>`).join('')}</div></section>
    ${g.map(s=>`<section id="g-${s.id}" class="gsec card"><h2>${s.h}</h2>${s.body}</section>`).join('')}
    <section class="gsec card"><h2>${t('sourcesLine')}</h2><ul class="bul">${GUIDE_SOURCES.map(x=>`<li><a href="${x[2]}" target="_blank" rel="noopener"${lt(S.lang==='ar'?x[0]:x[1])}>${S.lang==='ar'?x[0]:x[1]}</a></li>`).join('')}</ul></section>
  </div>`;
}


/* ============ UPGRADE (page #upgrade and sheet), TRIAL REPORT, BANNER ============ */
let UP={plan:null,coupon:'',quote:null,qerr:'',note:'',err:'',busy:false,k:null,qt:null,qseq:0};
const money=n=>{ const v=Math.round(n*100)/100; return numL(Number.isInteger(v)?v:v.toFixed(2)); };
const CURR=()=>S.lang==='ar'?'ريال':(CFG()?.currency||'SAR');
/* the payment gateway named in the copy follows config.provider ('moyasar' | null → no name) */
const provName=()=>{ const p=CFG()?.provider; return p==='moyasar'?(S.lang==='ar'?'ميسّر':'Moyasar'):''; };
function plansOf(){ return (CFG()?.plans||[]).filter(p=>p&&p.id); }
function curPlan(){ const ps=plansOf(); if(!ps.length) return null; return ps.find(p=>p.id===UP.plan)||ps.find(p=>p.best)||ps[0]; }
function planCards(sel){ const ps=plansOf(); if(!ps.length) return `<p class="muted small">${t('plansLoading')}</p>`;
  return `<div class="up-plans" role="radiogroup" aria-label="${t('upTitle')}">${ps.map(p=>{ const on=sel&&sel.id===p.id, per=p.days>=60?Math.round(p.price/(p.days/30)):null;
    return `<button type="button" class="up-plan ${on?'on':''} ${p.best?'best':''}" role="radio" aria-checked="${on}" data-plan="${esc(p.id)}">${p.best?`<span class="up-best">${t('bestValue')}</span>`:''}<b class="up-pn">${esc(p[S.lang]||p.en||p.id)}</b><span class="up-price">${p.was?`<s class="num up-was">${money(p.was)}</s> `:''}<b class="num">${money(p.price)}</b> ${CURR()}${p.was?` <span class="chip up-off">${L(bi('خصم','save'))} ${numL(Math.round(100*(1-p.price/p.was)))}%</span>`:''}</span>${p.was&&p.ends?`<span class="up-days">${L(bi('العرض حتى','Offer until'))} ${dateLong(p.ends)}</span>`:''}<span class="up-days">${t('perDays')(numL(p.days))}${per?` · ${t('perMonth')(money(per),CURR())}`:''}</span></button>`; }).join('')}</div>`; }
function compareTable(){ const F=FREE, fx=(F.xp||[]).filter(k=>xpLang(k)===S.lang).length, all=xpAllKeys().filter(k=>xpLang(k)===S.lang).length, pct=x=>numL(Math.round((+x||0)*100))+'%';
  const rows=t('cmpRows')({xp:numL(fx),xpAll:numL(all),daily:numL(F.dailyQuestions),cards:pct(F.cardsFrac),weeks:numL(F.planWeeks),weeksN:+F.planWeeks,mist:numL(F.mistakesMax),tech:pct(F.techFrac)});
  const cell=v=>v===true?`<span class="cmp-y" role="img" aria-label="${t('included')}">${ICON.check}</span>`:v===false?`<span class="cmp-n" role="img" aria-label="${t('notIncluded')}">${LOCKSVG}</span>`:esc(v);
  return `<div class="tbl cmp"><table><thead><tr><th></th><th>${t('colFree')}</th><th class="pro-col" lang="en">${t('colPro')}</th></tr></thead><tbody>${rows.map(r=>`<tr><th scope="row">${esc(r[0])}</th><td>${cell(r[1])}</td><td class="pro-col">${cell(r[2])}</td></tr>`).join('')}</tbody></table></div>`; }
function priceLine(){ const p=curPlan(); if(!p) return ''; const q=UP.quote&&UP.quote.plan===p.id?UP.quote:null;
  if(q&&q.pct) return `<span class="up-total">${t('total')}: <s class="num">${money(p.price)}</s> <b class="num">${q.amount===0?t('free100'):money(q.amount)+' '+CURR()}</b> <span class="chip">${t('couponOk')(numL(q.pct))}</span></span>`;
  return `<span class="up-total">${t('total')}: <b class="num">${money(p.price)} ${CURR()}</b></span>`; }
/* a plan with a store link (config plan.buy) is bought in the external store (Zid), which sends an activation link;
   the site only markets and activates. No account is needed to buy: the activation page creates it. */
const storeOf=p=>p&&typeof p.buy==='string'&&/^https:\/\//.test(p.buy)?p.buy:null;
const storeMode=()=>plansOf().some(p=>storeOf(p));
function payState(){ const C=window.CLOUD, p=curPlan(), q=UP.quote&&p&&UP.quote.plan===p.id?UP.quote:null, pays=!!CFG()?.payments, freeQ=q&&q.amount===0;
  if(storeOf(p)) return {label:t('buyStore'),dis:false,store:true};
  if(!C?.user) return {label:t('signupToBuy'),dis:false};
  if(!p) return {label:t('payBtn'),dis:true};
  if(freeQ) return {label:t('activateBtn'),dis:UP.busy};
  if(!pays) return {label:t('payOff'),dis:true};
  return {label:UP.busy?t('payBusy'):t('payBtn'),dis:UP.busy}; }
function upgradeBody(sheet){ const C=window.CLOUD, cfg=CFG(), p=curPlan(), pro=PRO(), pays=!!cfg?.payments, ps=payState();
  if(pro&&C?.user){ const u=C.plan?.until; return `<div class="up-pro card"><span class="pro-chip big" lang="en">${t('proChip')}</span><h2>${t('youArePro')}</h2><p class="muted">${u?t('activeUntil')(dateLong(u)):t('proForever')}</p><div class="row"><a class="btn primary" href="#today">${t('goToday')}</a>${sheet?'':`<button class="btn ghost" data-acct="1">${t('acctManage')}</button>`}</div></div>${sheet?'':`<section class="up-inc"><h2 class="sec-h hl">${t('incT')}</h2>${compareTable()}</section>`}`; }
  return `${UP.k||sheet?`<p class="up-ctx">${esc(ctxMsg(UP.k))}</p>`:''}
    ${planCards(p)}
${storeMode()?'':`<form class="up-coupon" id="up-cf" novalidate><label for="up-cp">${t('couponL')}</label><div class="up-cp-row"><input id="up-cp" type="text" dir="ltr" autocomplete="off" autocapitalize="characters" spellcheck="false" maxlength="40" placeholder="${t('couponPh')}" value="${esc(UP.coupon)}"><button class="btn ghost sm" type="submit">${t('applyBtn')}</button></div><p class="up-qerr small" id="up-qerr" role="alert">${UP.qerr?esc(UP.qerr):''}</p></form>`}
    <div class="up-pay"><div id="up-price">${priceLine()}</div><button class="btn primary xl block ${ps.store?'store':''}" id="up-pay" ${ps.store?'aria-describedby="up-nt"':''} ${ps.dis?'disabled':''}>${ps.label}</button>
      ${storeOf(p)?`<span class="sr-only" id="up-nt">${t('storeNewTab')}</span><div class="up-how"><b class="small">${t('buyStepsT')}</b><ol class="up-steps">${t('buySteps').map(x=>`<li>${x}</li>`).join('')}</ol></div>`:`${!pays&&C?.user?`<p class="up-off small">${t('payOffD')}</p>`:''}${pays?`<p class="small muted">${t('payNote')(provName())}</p>`:''}`}
      ${cfg?.refund?.on?`<p class="up-refund small">${ICON.official}<span>${t('refund')(numL(cfg.refund.days))}</span></p>`:''}
      ${UP.err?`<p class="acct-err" role="alert">${esc(UP.err)}</p>`:''}${UP.note?`<p class="acct-info" role="status">${esc(UP.note)}</p>`:''}</div>
    ${storeMode()?`<a class="up-code" href="#redeem"><span class="up-code-t"><span class="small muted">${t('haveCode')}</span><b>${t('haveCodeA')}</b></span>${ICON.arrow}</a>`:''}
    ${sheet?`<details class="up-more"><summary>${t('incT')}</summary>${compareTable()}</details><a class="up-all" href="#upgrade" id="up-all">${t('seeAll')}</a>`:`<section class="up-inc"><h2 class="sec-h hl">${t('incT')}</h2>${compareTable()}</section>`}`; }
function bindUpgrade(root,sheet){
  root.querySelectorAll('[data-plan]').forEach(b=>b.onclick=()=>{ UP.plan=b.dataset.plan; UP.err=''; if(UP.coupon) requote(); rerenderUp(sheet); });
  const f=root.querySelector('#up-cf'), inp=root.querySelector('#up-cp');
  if(inp) inp.oninput=()=>{ UP.coupon=inp.value; UP.qerr=''; clearTimeout(UP.qt); UP.qt=setTimeout(requote,550); };
  if(f) f.onsubmit=e=>{ e.preventDefault(); UP.coupon=inp.value; clearTimeout(UP.qt); requote(); };
  const pay=root.querySelector('#up-pay'); if(pay) pay.onclick=doCheckout;
  const all=root.querySelector('#up-all'); if(all) all.onclick=()=>closeUpgrade();
  root.querySelectorAll('[data-acct]').forEach(b=>b.onclick=()=>{ closeUpgrade(); openAcct(); }); }
/* refresh only the price and the button, so the coupon field keeps focus */
function paintQuote(){ document.querySelectorAll('#up-price').forEach(el=>el.innerHTML=priceLine()); document.querySelectorAll('#up-qerr').forEach(el=>el.textContent=UP.qerr||'');
  const ps=payState(); document.querySelectorAll('#up-pay').forEach(b=>{ b.textContent=ps.label; b.disabled=ps.dis; b.classList.toggle('store',!!ps.store); }); }
async function requote(){ const C=window.CLOUD, p=curPlan(), code=(UP.coupon||'').trim(); const seq=++UP.qseq;
  if(!code||!p){ UP.quote=null; UP.qerr=''; return paintQuote(); }
  if(!C?.user){ UP.qerr=t('couponSignup'); return paintQuote(); }
  try{ const q=await C.quote(p.id,code); if(seq!==UP.qseq) return; UP.quote=q; UP.qerr=''; }
  catch(e){ if(seq!==UP.qseq) return; UP.quote=null; UP.qerr=e.code==='bad-coupon'?t('couponBad'):e.code==='bad-plan'?t('errGeneric'):t('errNet');
    /* a store activation code is tied to one plan: rather than "not valid for this plan", take the student to activate it */
    if(e.code==='bad-coupon'){ try{ const i=await C.redeemInfo(code); if(seq===UP.qseq&&i&&i.plan){ UP.coupon=''; UP.qerr=''; closeUpgrade(); location.hash='#redeem?c='+encodeURIComponent(i.code); return; } }catch(x){} } }
  paintQuote(); }
async function doCheckout(){ const C=window.CLOUD; if(!C) return; const p=curPlan(); UP.err=''; UP.note='';
  if(storeOf(p)){ track('checkout_start',p.id); track('store_click',p.id); /* open the store in a new tab and keep the site open behind it (window.open returns null with noopener, so its result says nothing) */
    const a=document.createElement('a'); a.href=storeOf(p); a.target='_blank'; a.rel='noopener'; document.body.appendChild(a); a.click(); a.remove(); return; }
  if(!C.user){ const k=UP.k; closeUpgrade(); PEND={fn:()=>openUpgrade(k)}; AC.tab='signup'; AC.gate=true; AC.gateUp=true; openAcct(); return; }
  if(!p||UP.busy) return; UP.busy=true; paintQuote();
  try{ const r=await C.checkout(p.id,(UP.coupon||'').trim()||undefined);
    if(r&&r.url){ location.href=r.url; return; }
    if(r&&r.activated){ UP.busy=false; UP.coupon=''; UP.quote=null; closeUpgrade(); await C.refresh(); location.hash='#upgrade?paid=1'; return; }
    UP.err=t('errGeneric'); }
  catch(e){ if(e.code==='payments-not-configured') UP.note=t('payOffD'); else if(e.code==='bad-coupon'){ UP.qerr=t('couponBad'); UP.quote=null; } else if(e.code==='unauthenticated') UP.err=t('errAuth'); else UP.err=e.code==='network-request-failed'?t('errNet'):t('errGeneric'); }
  UP.busy=false; rerenderUp(); }
function rerenderUp(){ const sh=$('#upsheet'); if(sh&&!sh.hidden) renderUpsheet(); if(route().p==='upgrade') renderRoute(); }
function openUpgrade(k){ if(!window.CLOUD) return; vstep('upgrade'); UP.k=k||null; UP.err=''; UP.note='';
  let el=$('#upsheet'); const was=!!(el&&!el.hidden); if(!el){ el=document.createElement('div'); el.id='upsheet'; document.body.appendChild(el); el.addEventListener('pointerdown',e=>{ if(e.target===el) closeUpgrade(); }); }
  if(!was){ const a=document.activeElement; UP_RET={el:a,sel:a&&a.dataset&&a.dataset.lock?`[data-lock="${a.dataset.lock}"]`:a&&a.id?'#'+a.id:null}; } el.hidden=false; document.body.classList.add('sheet-open'); overlayInert(); renderUpsheet(); track('upgrade_view',k||'sheet');
  setTimeout(()=>el.querySelector('.up-plan.on,#up-x')?.focus(),0); }
function closeUpgrade(){ const el=$('#upsheet'); if(el&&!el.hidden){ el.hidden=true; el.innerHTML=''; document.body.classList.remove('sheet-open'); overlayInert(); const r=UP_RET; UP_RET=null; if(r&&$('#acct').hidden){ const el=r.el&&r.el.isConnected&&r.el!==document.body?r.el:r.sel&&$('#main')?.querySelector(r.sel); el?.focus?.(); } } }
function renderUpsheet(){ const el=$('#upsheet'); if(!el) return; el.dir=S.lang==='ar'?'rtl':'ltr'; el.lang=S.lang;
  const k=UP.k, ben=k&&t('ben')[k];
  el.innerHTML=`<div class="up-sheet" role="dialog" aria-modal="true" aria-labelledby="up-h"><button class="icon-btn acct-x" id="up-x" aria-label="${t('close')}">${ICON.x}</button>
    <div class="up-head">${lockBadge()}<h2 id="up-h">${ben?esc(ben):t('upTitle')}</h2><p class="muted small">${t('upIntro')}</p></div>${upgradeBody(true)}</div>`;
  el.querySelector('#up-x').onclick=closeUpgrade; bindUpgrade(el,true); }
function pageUpgrade(q){ const paid=/(^|&)paid=1/.test(q), failed=/(^|&)failed=1/.test(q); { const m=/(^|&)plan=([\w-]+)/.exec(q); if(m&&!UP.plan) UP.plan=m[2]; } { const m=/(^|&)coupon=([\w-]+)/.exec(q); if(m&&!UP.coupon){ UP.coupon=m[2]; setTimeout(requote,0); } }
  const proNow=PRO()&&!!window.CLOUD?.user;
  return `<header class="page-h"><a class="back" href="#today">${t('nav.today')}</a><h1><span class="hl">${proNow?t('subT'):t('upTitle')}</span></h1>${proNow?'':`<p>${t('upIntro')}</p>`}</header>
  ${paid?`<div class="up-banner ok" role="status"><b>${t('paidT')}</b><span>${PRO()?t('paidD'):t('paidWait')}</span></div>`:''}
  ${failed?`<div class="up-banner bad" role="alert"><b>${t('failedT')}</b><span>${t('failedD')}</span></div>`:''}
  ${window.CLOUD?`<div class="up-page">${upgradeBody(false)}</div>`:`<div class="card"><p>${t('allOpen')}</p></div>`}`; }
/* ============ ACTIVATION CODE (#redeem?c=CODE, reached from gat.academy/r/CODE after buying in the store) ============
   One screen, no plan to pick: check the code -> sign up / sign in if needed -> activate automatically -> start. */
const RD_KEY='gat_redeem'; /* survives a sign-up that leaves the page (e.g. Google sign-in) */
let RD={code:'',info:null,err:'',busy:false,done:null,tried:''};
const rdNorm=c=>String(c||'').trim().toUpperCase().replace(/\s+/g,'').slice(0,40);
function rdSet(code){ if(code===RD.code) return; RD={code,info:null,err:'',busy:false,done:null,tried:''}; if(code){ try{ localStorage.setItem(RD_KEY,code); }catch(e){} rdCheck(); } }
const rdRerender=()=>{ if(/^#redeem/.test(location.hash)) renderRoute(); };
async function rdCheck(){ const C=window.CLOUD, code=RD.code; if(!C||!code) return;
  try{ const i=await C.redeemInfo(code); if(code!==RD.code) return;
    if(i.needsPlan){ try{ localStorage.removeItem(RD_KEY); }catch(e){} location.hash='#upgrade?coupon='+encodeURIComponent(code); return; }
    RD.info=i; RD.err=''; }
  catch(e){ if(code!==RD.code) return; RD.err=e.code==='network-request-failed'?'net':e.code; }
  rdRerender(); }
async function rdRedeem(){ const C=window.CLOUD, code=RD.code; if(!C?.user||!RD.info||RD.busy||RD.done) return;
  RD.busy=true; RD.tried=code+'|'+C.user.email; RD.err=''; rdRerender();
  try{ const r=await C.redeem(code); if(code!==RD.code) return; RD.done=r; try{ localStorage.removeItem(RD_KEY); }catch(e){} await C.refresh(); }
  catch(e){ if(code!==RD.code) return; RD.err=e.code==='network-request-failed'?'net':e.code; }
  RD.busy=false; rdRerender(); }
function rdAcct(tab){ AC.tab=tab; AC.gate=true; AC.gateRd=true; PEND={fn:rdRerender}; openAcct(); }
function pageRedeem(q){ const C=window.CLOUD; const m=/(^|&)c=([\w-]+)/.exec(q);
  let code=m?rdNorm(decodeURIComponent(m[2])):''; if(!code){ try{ code=rdNorm(localStorage.getItem(RD_KEY)); }catch(e){} }
  const head=`<header class="page-h"><a class="back" href="#today">${t('nav.today')}</a><h1><span class="hl">${t('rdT')}</span></h1></header>`;
  if(!C) return head+`<div class="card"><p>${t('allOpen')}</p></div>`;
  rdSet(code);
  const help=`<p class="small muted rd-help">${t('rdHelp')}</p>`;
  const form=`<form class="up-coupon card rd-form" id="rd-f" novalidate><label for="rd-c">${t('rdIntro')}</label><div class="up-cp-row"><input id="rd-c" type="text" dir="ltr" autocomplete="one-time-code" autocapitalize="characters" autocorrect="off" spellcheck="false" enterkeyhint="go" maxlength="40" placeholder="${t('rdPh')}" aria-describedby="rd-hint" value="${esc(code)}"><button class="btn primary" type="submit">${t('rdGo')}</button></div><p class="small muted" id="rd-hint">${t('rdWhere')}</p></form><p class="small rd-nocode">${t('rdNoCode')} <a href="#upgrade">${t('upgradeBtn')}</a></p>`;
  const planN=p=>p?esc(S.lang==='ar'?(p.ar||p.en||p.id):(p.en||p.ar||p.id)):'';
  if(!code) return head+form+help;
  if(RD.done||(RD.info&&RD.info.mine&&C.user)){ const until=(RD.done&&RD.done.until)||C.plan?.until, p=(RD.done&&RD.done.plan)||RD.info.plan;
    return head+`<div class="up-pro card rd-ok" role="status"><span class="pro-chip big" lang="en">${t('proChip')}</span><h2>${t('rdDoneT')}</h2><p>${RD.done&&!RD.done.already?t('rdDoneD')(planN(p),until?dateLong(until):''):t('rdMineD')(until?dateLong(until):'')}</p><div class="row"><a class="btn primary xl" href="#today">${t('rdStart')}</a></div></div>`; }
  if(RD.err&&!RD.busy){ const msg=(t('rdErr')||{})[RD.err]||(RD.err==='net'?t('errNet'):RD.err==='unauthenticated'?t('errAuth'):t('errGeneric'));
    return head+`<div class="up-banner bad" role="alert"><b>${esc(msg)}</b></div>`+form+help; }
  if(!RD.info) return head+`<div class="card rd-wait" role="status"><span class="boot-dot" aria-hidden="true"></span><p class="muted">${t('rdChecking')}</p></div>`;
  const valid=`<div class="up-banner ok"><b>${t('rdValidT')} <bdi class="mono">${esc(code)}</bdi></b><span>${t('rdValidD')(planN(RD.info.plan),numL(RD.info.plan.days))}</span></div>`;
  if(!C.user) return head+valid+`<div class="card rd-acct"><p>${t('rdNeedAcct')}</p><div class="row"><button class="btn primary xl" id="rd-up">${t('rdSignup')}</button><button class="btn ghost" id="rd-in">${t('rdSignin')}</button></div></div>`+help;
  /* signed in with a valid code: activate right away (once per code and account), nothing more to click */
  if(!RD.busy&&RD.tried!==code+'|'+C.user.email) setTimeout(rdRedeem,0);
  return head+valid+`<div class="card" role="status" aria-live="polite"><p>${t('rdBusy')}</p></div>`; }
function bindRedeem(m){ const f=m.querySelector('#rd-f'); if(f) f.onsubmit=e=>{ e.preventDefault(); const inp=m.querySelector('#rd-c'), c=rdNorm(inp.value); if(!c){ inp.setAttribute('aria-invalid','true'); inp.focus(); toast(t('rdEmpty')); return; } const h='#redeem?c='+encodeURIComponent(c); RD.code=''; if(location.hash===h) renderRoute(); else location.hash=h; };
  { const inp=m.querySelector('#rd-c'); if(inp){ if(RD.err&&!['net','unauthenticated'].includes(RD.err)&&m.querySelector('.up-banner.bad')) inp.setAttribute('aria-invalid','true'); /* a rejected code, not a lost connection */ inp.oninput=()=>inp.removeAttribute('aria-invalid'); } }
  const up=m.querySelector('#rd-up'); if(up) up.onclick=()=>rdAcct('signup');
  const inn=m.querySelector('#rd-in'); if(inn) inn.onclick=()=>rdAcct('signin'); }
/* trial report */
function pageReport(){ const ar=S.lang==='ar', d=S.diag, since=startDate(), n=daysBetween(since,todayStr()), est=estimate(), xpDone=Object.keys(S.xp||{}).filter(k=>xpLang(k)===S.lang).length, streak=calcStreak();
  const ready=reportReady(), left=Math.max(0,reportDays()-n);
  const rows=ALL_SKILLS.map(s=>{ const b=d&&d.skills&&d.skills[s], a=b&&b.t?Math.round(100*b.c/b.t):null, i=skillInfo(s), c=i.acc==null?null:Math.round(100*i.acc), dl=a!=null&&c!=null?c-a:null;
    return `<tr><th scope="row">${SKILLS[s][S.lang]}</th><td class="num">${a==null?'—':numL(a)+'%'}</td><td class="num">${c==null?'—':numL(c)+'%'}</td><td class="num rep-d ${dl==null?'':dl>0?'up':dl<0?'down':''}">${dl==null?'—':(dl>0?'+':dl<0?'−':'')+numL(Math.abs(dl))}</td></tr>`; }).join('');
  const gap=est==null?null:Math.max(0,S.target-est);
  return `<header class="page-h"><a class="back" href="#today">${t('nav.today')}</a><h1><span class="hl">${t('reportT')}</span></h1><p>${t('reportIntro')(numL(n+1))}</p></header>
  ${ready?'':`<div class="demo"><span>${t('repNotYet')(numL(left))}</span></div>`}
  <div class="kpis rep-k">
    <div class="kpi"><span class="kl">${t('repStart')}</span><b class="kv num">${d?numL(d.pct)+'%':'—'}</b><span class="ks">${d?dateH(d.date):t('repNoDiag')}</span></div>
    <div class="kpi"><span class="kl">${t('repXp')}</span><b class="kv num">${numL(xpDone)}</b></div>
    <div class="kpi"><span class="kl">${t('kStreak')}</span><b class="kv num">${numL(streak)}</b><span class="ks">${t('repDays')(numL((S.days||[]).length))}</span></div>
    <div class="kpi"><span class="kl">${t('repGap')}</span><b class="kv num">${gap==null?'—':numL(gap)}</b><span class="ks">${est==null?t('repGapNone'):t('repGapD')(numL(est),numL(S.target))}</span></div>
  </div>
  <section class="card"><h2>${t('repSkills')}</h2>${d?'':`<p class="muted small">${t('repNoDiagD')} <button class="linkbtn" data-start="diag">${t('diagFirst')}</button></p>`}
    <div class="tbl"><table class="rep-t"><thead><tr><th>${t('skill')}</th><th>${t('repStart')}</th><th>${t('repNow')}</th><th>${t('repChange')}</th></tr></thead><tbody>${rows}</tbody></table></div></section>
  <section class="rep-plans">${PRO()?`<div class="card"><h2>${t('youArePro')}</h2><p class="muted">${t('repProD')}</p></div>`:`<h2 class="sec-h hl">${t('repNext')}</h2><p class="lead">${esc(ctxMsg('report'))}</p>${window.CLOUD?planCards(curPlan()):''}<div class="row"><button class="btn primary" data-lock="report">${t('upgradeBtn')}</button></div>`}</section>`; }
/* banner from the back office */
function renderBanner(){ const el=$('#banner'); if(!el) return; const b=CFG()?.banner, txt=b&&b.on?String(b[S.lang]||'').trim():'';
  let h=0; for(const c of txt) h=(h*31+c.charCodeAt(0))|0; const key='b'+h; let gone=[]; try{ gone=JSON.parse(localStorage.getItem('masar100_banner_x'))||[]; }catch(e){}
  if(!txt||gone.includes(key)){ el.hidden=true; el.innerHTML=''; return; }
  el.hidden=false; el.className='banner '+(['info','promo','warn'].includes(b.tone)?b.tone:'info');
  el.innerHTML=`<div class="banner-in"><p>${esc(txt)}</p><button class="icon-btn sm" id="bn-x" aria-label="${t('close')}">${ICON.x}</button></div>`;
  el.querySelector('#bn-x').onclick=()=>{ gone.push(key); try{ localStorage.setItem('masar100_banner_x',JSON.stringify(gone.slice(-20))); }catch(e){} renderBanner(); }; }
function renderProChip(){ const ab=$('#acct-btn'); if(!ab) return; let c=$('#pro-chip'); const on=!!window.CLOUD?.user&&PRO();
  if(on&&!c){ c=document.createElement('a'); c.id='pro-chip'; c.className='pro-chip'; c.href='#upgrade'; ab.parentNode.insertBefore(c,ab); }
  if(c){ c.hidden=!on; c.textContent=t('proChip'); c.title=t('youArePro'); c.setAttribute('lang','en'); } }
/* my subscription (account modal) */
function subSection(){ const C=window.CLOUD, pi=AC.planInfo, p=C.plan||{tier:'free'}, pro=C.isPro();
  const st=t('payStatus'), pays=(pi&&pi.payments)||[];
  return `<details class="acct-priv acct-sub" open><summary>${t('subT')}</summary>
    <div class="sub-row"><span class="${pro?'pro-chip':'chip'}" ${pro?'lang="en"':''}>${pro?t('proChip'):t('planFree')}</span><span class="small">${pro?(p.until?t('activeUntil')(dateLong(p.until)):t('proForever')):t('planFreeD')}</span></div>
    <a class="btn ${pro?'ghost':'primary'} sm" href="#upgrade" id="ac-up">${pro?t('seePlans'):t('upgradeBtn')}</a>
    <div class="sub-pays"><b class="small">${t('payHist')}</b>${!pi?`<p class="small muted">${t('loading')}</p>`:pays.length?`<ul>${pays.map(x=>`<li><span class="num">${dateH(String(x.paid_at||x.created_at).slice(0,10))}</span><span>${esc((plansOf().find(q=>q.id===x.plan_id)||{})[S.lang]||x.plan_id||'')}</span><b class="num">${money(+x.amount)} ${S.lang==='ar'?'ريال':esc(x.currency||'')}</b><span class="chip ${x.status==='paid'?'':'sand'}">${st[x.status]||esc(x.status)}</span></li>`).join('')}</ul>`:`<p class="small muted">${t('noPays')}</p>`}</div></details>`; }

/* ============ ROUTER ============ */
const NAV=['today','learn','practice','progress','guide'];
let AUTHQ=null, AUTHERR=null;
function route(){ let h=(location.hash||'#today').slice(1);
  if(/^sign(in|up)(\?|$)/.test(h)){ const m=/err=([\w-]+)/.exec(h); AUTHERR=m?m[1]:null; AUTHQ=h.slice(0,6); h='today'; try{ history.replaceState(null,'',location.pathname+location.search+'#today'); }catch(e){} }
  if(h.startsWith('lesson-')) return {p:'learn',v:()=>pageLesson(h.slice(7))};
  if(h.startsWith('fl-')) return {p:'learn',v:()=>pageFound(h.slice(3))};
  if(h.startsWith('learn')) return {p:'learn',v:()=>pageLearn(h.split('-')[1]||(journeyStage()===0?'found':'lessons'))};
  if(h==='plan') return {p:'today',v:pagePlan};
  if(h.startsWith('upgrade')) return {p:'upgrade',v:()=>pageUpgrade(h.split('?')[1]||'')};
  if(h==='redeem'||h.startsWith('redeem?')) return {p:'upgrade',v:()=>pageRedeem(h.split('?')[1]||'')};
  if(h==='report') return {p:'report',v:pageReport};
  if(h.startsWith('guide')) return {p:'guide',v:pageGuide};
  const m={today:pageToday,practice:pagePractice,progress:pageProgress}; return {p:m[h]?h:'today',v:m[h]||pageToday}; }
let LAST_H=null;
function onEnter(h){
  if(h.startsWith('upgrade')){ track('upgrade_view','page');
    if(/(^|[?&])paid=1/.test(h)){ const go=(n=0)=>{ const C=window.CLOUD; if(C&&C.ready&&C.refresh) C.refresh(); else if(n<40) setTimeout(()=>go(n+1),250); }; go(); } }
  if(h==='report'){ track('report_view'); if(reportReady()&&!S.repSeen){ S.repSeen=1; save(); } } } /* seen once: the Today card steps aside; the Progress page keeps a link */
/* the free guide: this device downloaded it (the landing page left a note). Once the student is signed in the download time
   goes to their events, so a sign-up after it counts as coming from the guide; a finished test is reported once, anonymously. */
const GUIDE_K='gat_guide';
function guideMark(){ try{ const C=window.CLOUD, ts=+localStorage.getItem(GUIDE_K); if(!ts||!C||!C.user||localStorage.getItem(GUIDE_K+'_e')) return; C.track('guide_dl',null,ts); localStorage.setItem(GUIDE_K+'_e','1'); }catch(e){} }
function guideTested(){ try{ if(!CLOUD_BUILD||!localStorage.getItem(GUIDE_K)||localStorage.getItem(GUIDE_K+'_t')) return; localStorage.setItem(GUIDE_K+'_t','1'); fetch('/api/guide/hit',{method:'POST',headers:{'Content-Type':'application/json','X-Masar':'1'},body:'{"kind":"test"}',keepalive:true}).catch(()=>{}); }catch(e){} }
/* anonymous visit statistics (v.js): one page view per route, the exam and its result count as pages of their own */
function vpage(p){ try{ if(window.GATV) GATV.page('/app#'+(/^[a-z][a-z0-9-]{0,30}$/.test(p)?p:'other'),false); }catch(e){} }
function vstep(k){ try{ if(window.GATV) GATV.step(k); }catch(e){} }
function renderRoute(){ guideMark();
  syncFree(); const r=route(), h=(location.hash||'#today').slice(1); if(h!==LAST_H){ LAST_H=h; onEnter(h); vpage(h.split(/[?-]/)[0]||'today'); } document.documentElement.lang=S.lang; document.documentElement.dir=S.lang==='ar'?'rtl':'ltr';
  $('#brand-n').textContent=t('brand'); { const sk=$('#skip-l'); if(sk) sk.textContent=S.lang==='ar'?'تخطَّ إلى المحتوى':'Skip to content'; } document.title=S.lang==='ar'?'أكاديمية القدرات | GAT Academy':'GAT Academy | أكاديمية القدرات'; { const L=S.lang==='ar'; $('#theme-btn').setAttribute('aria-label',L?'المظهر':'Theme'); $('#acct-btn')?.setAttribute('aria-label',L?'الحساب':'Account'); $('#nav').setAttribute('aria-label',L?'التنقل الرئيسي':'Main navigation'); $('#tabbar').setAttribute('aria-label',L?'التنقل السفلي':'Bottom navigation'); $('#lang-btn').setAttribute('lang',L?'en':'ar'); } $('#brand-t').textContent=t('tagline'); $('#lang-btn').textContent=t('switchLang');
  const links=NAV.map(k=>`<a href="#${k}" class="${r.p===k?'on':''}" ${r.p===k?'aria-current="page"':''}>${ICON[k]}<span>${t('nav.'+k)}</span></a>`).join('');
  $('#nav').innerHTML=links; $('#tabbar').innerHTML=links;
  const ab=$('#acct-btn'); if(ab){ const u=window.CLOUD?.user, nm=(u&&u.name)||''; ab.hidden=!window.CLOUD; ab.classList.toggle('on',!!u); ab.classList.toggle('has-name',!!nm); ab.title=u?(nm?nm+' · ':'')+(u.email||''):t('acctJoin');
    let sp=ab.querySelector('.acct-name'); if(nm){ if(!sp){ sp=document.createElement('span'); sp.className='acct-name'; ab.appendChild(sp); } sp.textContent=nm.split(' ')[0]; ab.setAttribute('aria-label',(S.lang==='ar'?'الحساب: ':'Account: ')+nm); } else if(sp) sp.remove(); }
  let html; try{ html=r.v(); }catch(e){ console.error(e); html=errorCard(); } $('#main').innerHTML=notices()+html; $('#foot').innerHTML=esc(t('footer')).replace('info@gat.academy','<a class="mail-link" dir="ltr" href="mailto:info@gat.academy">info@gat.academy</a>')+` · <a class="foot-home" href="https://wa.me/966533522513" target="_blank" rel="noopener">${S.lang==='ar'?'واتساب':'WhatsApp'}</a> · <a class="foot-home" href="https://x.com/GATacademy1" target="_blank" rel="noopener">${S.lang==='ar'?'إكس':'X'}</a> · <a class="foot-home" href="https://www.tiktok.com/@gat.academy1" target="_blank" rel="noopener">${S.lang==='ar'?'تيك توك':'TikTok'}</a>`+(window.CLOUD?` · <a class="foot-home" href="/?home=1${S.lang==='en'?'&lang=en':''}">${t('aboutSite')}</a> · <a class="foot-home" href="/privacy${S.lang==='en'?'?lang=en':''}">${t('legalPrivacy')}</a> · <a class="foot-home" href="/terms${S.lang==='en'?'?lang=en':''}">${t('legalTerms')}</a>`:''); bindMain();
  renderBanner(); renderProChip(); loadPremium(); if(NUDGE) renderNudge();
}
/* device/session notices shown above the page: a corrupt saved copy, a lost session, an unreachable server */
const NX=k=>{ try{ return sessionStorage.getItem('masar100_nx_'+k)==='1'; }catch(e){ return false; } };
function notices(){ const C=window.CLOUD, out=[]; const bar=(k,txt,act='')=>out.push(`<div class="demo notice" role="status" data-nx="${k}"><span>${txt}</span><span class="row">${act}<button class="icon-btn sm" data-nxclose="${k}" aria-label="${t('close')}">${ICON.x}</button></span></div>`);
  if(LOAD_ERR&&!NX('load')) bar('load',esc(tc('loadErr')));
  if(C&&C.ready){ if(C.offline&&!C.user&&getOwner()&&!NX('off')) bar('off',esc(t('offlineNote')));
    else if(!C.offline&&!C.user&&getOwner()&&!NX('sess')) bar('sess',esc(t('sessionLost')),`<button class="btn primary sm" data-acct="1" data-tab="signin">${t('signIn')}</button>`); }
  return out.join(''); }
function errorCard(){ return `<section class="card center err-card"><h1>${t('errPageT')}</h1><p class="muted">${t('errPageD')}</p><div class="row"><a class="btn primary" href="#today">${t('nav.today')}</a><button type="button" class="btn ghost" id="err-reload">${t('reload')}</button></div></section>`; }
let ERR_TOAST=0;
window.addEventListener('error',e=>{ if(!e||!e.error||/ResizeObserver/.test(String(e.message))) return; if(Date.now()-ERR_TOAST<30000) return; ERR_TOAST=Date.now(); try{ toast(t('errUnexpected')); }catch(x){} });
function bindMain(){
  const m=$('#main');
  m.querySelectorAll('[data-nxclose]').forEach(b=>b.onclick=()=>{ try{ sessionStorage.setItem('masar100_nx_'+b.dataset.nxclose,'1'); }catch(e){} b.closest('.notice')?.remove(); });
  { const rl=$('#err-reload'); if(rl) rl.onclick=()=>location.reload(); }
  m.querySelectorAll('[data-review]').forEach(b=>{ b.onclick=e=>{ e.stopPropagation(); openReview(b.dataset.review); }; if(b.tagName==='TR') b.onkeydown=e=>{ if(e.key==='Enter') openReview(b.dataset.review); }; });
  m.querySelectorAll('[data-acct]').forEach(b=>b.onclick=()=>{ if(b.dataset.tab) AC.tab=b.dataset.tab; openAcct(); });
  m.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>document.getElementById(b.dataset.go)?.scrollIntoView({behavior:SMOOTH()}));
  m.querySelectorAll('[data-start]').forEach(b=>b.onclick=()=>startTest(b.dataset.start,{skill:b.dataset.skill}));
  m.querySelectorAll('[data-resume]').forEach(b=>b.onclick=()=>checkLive()); bindInstall(m); bindPostTest(m); bindShare(m); bindTrial(m); { const f=m.querySelector('#dt-ask'); if(f) f.onsubmit=e=>{ e.preventDefault(); const v=m.querySelector('#dt-in').value; if(!v) return; S.examDate=v; S.planStart=todayStr(); S.done={}; save(); renderRoute(); toast(L(bi('حُفظ موعد اختبارك.','Test date saved.'))); }; }
  m.querySelectorAll('[data-xp]').forEach(b=>b.onclick=()=>{ XP_BACK=b.dataset.xp; track('xp_start',b.dataset.xp); XP.open(b.dataset.xp); });
  m.querySelectorAll('[data-lock]').forEach(b=>b.onclick=e=>{ e.preventDefault(); e.stopPropagation(); if(b.dataset.lock==='report') openUpgrade('report'); else hitLimit(b.dataset.lock); });
  m.querySelectorAll('details[data-fold]').forEach(d=>d.ontoggle=()=>{ FOLD[d.dataset.fold]=d.open; });
  m.querySelectorAll('[data-href]').forEach(b=>b.onclick=()=>{ location.hash=b.dataset.href; });
  if(/^#redeem/.test(location.hash)) bindRedeem(m); else if(route().p==='upgrade') bindUpgrade(m,false);
  if(route().p==='report') m.querySelectorAll('[data-plan]').forEach(b=>b.onclick=()=>{ UP.plan=b.dataset.plan; openUpgrade('report'); });
  { const rh=$('#rp-hide'); if(rh) rh.onclick=()=>{ S.repHide=1; save(); renderRoute(); }; }
  m.querySelectorAll('[data-task]').forEach(b=>b.onclick=()=>{ const tk=buildPlan().flatMap(w=>w.tasks).find(x=>x.id===b.dataset.task); if(tk) runTask(tk); });
  m.querySelectorAll('[data-scroll]').forEach(a=>a.onclick=e=>{ e.preventDefault(); document.getElementById(a.dataset.scroll)?.scrollIntoView({behavior:SMOOTH(),block:'start'}); });
  bindSettings('pf');
  m.querySelectorAll('.tabs,.deck-chips').forEach(sc=>{ const up=()=>{ const max=sc.scrollWidth-sc.clientWidth, x=Math.abs(sc.scrollLeft); sc.classList.toggle('more-end',max-x>6); sc.classList.toggle('more-start',x>6); };
    const cur=sc.querySelector('.on'); if(cur&&sc.scrollWidth>sc.clientWidth){ const a=cur.getBoundingClientRect(), b=sc.getBoundingClientRect(); if(a.left<b.left+4||a.right>b.right-4) sc.scrollLeft+=a.left-b.left-(b.width-a.width)/2; }
    sc.addEventListener('scroll',up,{passive:true}); up(); });
  const on=(id,f)=>{ const b=$(id); if(b) b.onclick=f; };
  const showBtns=()=>requestAnimationFrame(()=>{ try{ $('#main .vbtns:not(:empty)')?.scrollIntoView({block:'nearest',behavior:SMOOTH()}); }catch(e){} }); /* the answer buttons appear under the card: bring them on screen on phones */
  on('#vcard',()=>{ if(!VC.flip){ VC.flip=true; renderRoute(); showBtns(); } });
  on('#fc-card',()=>{ FCV.flip=!FCV.flip; renderRoute(); if(FCV.flip) showBtns(); }); on('#fc-know',()=>cardAct(true)); on('#fc-again',()=>cardAct(false));
  m.querySelectorAll('[data-deck]').forEach(b=>b.onclick=()=>{ FCV.deck=b.dataset.deck; FCV.flip=false; renderRoute(); });
  m.querySelectorAll('[data-model]').forEach(b=>b.onclick=()=>startTest('model',{k:+b.dataset.model}));
  m.querySelectorAll('[data-rs]').forEach(b=>b.onclick=()=>startTest('rs',{k:+b.dataset.rs}));
  m.querySelectorAll('[data-fd]').forEach(b=>b.onclick=()=>startTest('fd',{id:b.dataset.fd}));
  on('#v-know',()=>vocabAct(true)); on('#v-again',()=>vocabAct(false));
  on('#bk-copy',()=>{ const code=btoa(unescape(encodeURIComponent(JSON.stringify(S)))), ta=$('#bk-in'); const fb=()=>{ ta.value=code; ta.select(); };
    const fb2=()=>{ fb(); toast(t('copyManual')); }; if(navigator.clipboard) navigator.clipboard.writeText(code).then(()=>{ ta.value=code; toast(t('copied')); }).catch(fb2); else fb2(); });
  on('#bk-file',exportFile);
  const ld=$('#bk-load'); if(ld) ld.onchange=()=>{ const f=ld.files[0]; if(!f) return; const r=new FileReader(); r.onload=()=>importText(String(r.result)); r.readAsText(f); ld.value=''; };
  on('#bk-imp',()=>importText($('#bk-in').value));
  on('#bk-reset',()=>{ const P=t('resetParts');
    $('#bk-confirm').innerHTML=`<div class="ex-confirm inline reset-box"><p><b>${t('resetPick')}</b></p>
      <div class="rs-list">${Object.entries(P).map(([k,[l,d]])=>`<label class="rs-opt"><input type="checkbox" value="${k}"><span><b>${l}</b><small>${d}</small></span></label>`).join('')}</div>
      <p class="small">${tc('resetWarn')}</p><div class="row"><button class="btn danger" id="rs-yes" disabled>${t('yesReset')}</button><button class="btn ghost" id="rs-no">${t('cancel')}</button></div></div>`;
    const box=$('#bk-confirm'), yes=$('#rs-yes'); const sel=()=>[...box.querySelectorAll('input:checked')].map(i=>i.value);
    box.querySelectorAll('input').forEach(i=>i.onchange=()=>{ if(i.value==='all'&&i.checked) box.querySelectorAll('input').forEach(j=>j.checked=true); if(i.value!=='all'&&!i.checked) box.querySelector('input[value=all]').checked=false; yes.disabled=!sel().length; });
    yes.onclick=()=>{ resetParts(sel()); toast(t('resetDone')); }; $('#rs-no').onclick=()=>box.innerHTML=''; });
  on('#pl-restart',()=>{ $('#pl-confirm').innerHTML=`<div class="ex-confirm inline"><p>${t('restartConfirm')}</p><div class="row"><button class="btn primary" id="pr-yes">${t('restartBtn')}</button><button class="btn ghost" id="pr-no">${t('cancel')}</button></div></div>`;
    $('#pr-yes').onclick=()=>{ resetParts(['plan']); toast(t('restartDone')); }; $('#pr-no').onclick=()=>$('#pl-confirm').innerHTML=''; });
}
/* theme */
const TKEY='masar100_theme'; let TH=(()=>{ try{ return JSON.parse(localStorage.getItem(TKEY))||{}; }catch(e){ return {}; } })();
const ACC={violet:'#6A4BF2',pink:'#C41F66',blue:'#1F5AD6',orange:'#B34708',ruby:'#C22B4E',navy:'#27306B'};
function applyTheme(){ const r=document.documentElement; if(TH.mode==='light'||TH.mode==='dark') r.setAttribute('data-theme',TH.mode); else if(TH.mode==='auto') r.removeAttribute('data-theme');
  if(TH.accent&&TH.accent!=='violet') r.setAttribute('data-accent',TH.accent); else r.removeAttribute('data-accent'); }
function renderThemePop(){ const p=$('#theme-pop'); const mode=TH.mode||'auto', acc=TH.accent||'violet';
  p.innerHTML=`<h4>${t('modeT')}</h4><div class="tp-seg">${['light','dark','auto'].map(m=>`<button data-mode="${m}" class="${mode===m?'on':''}">${t('modes')[m]}</button>`).join('')}</div>
  <h4>${t('accentT')} · <span class="sw-label">${t('accents')[acc]}</span></h4><div class="swatches">${Object.entries(ACC).map(([k,c])=>`<button class="sw ${acc===k?'on':''}" style="--c:${c}" data-acc="${k}" aria-label="${t('accents')[k]}"></button>`).join('')}</div>`;
  p.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>{ TH.mode=b.dataset.mode; try{localStorage.setItem(TKEY,JSON.stringify(TH));}catch(e){} applyTheme(); renderThemePop(); });
  p.querySelectorAll('[data-acc]').forEach(b=>b.onclick=()=>{ TH.accent=b.dataset.acc; try{localStorage.setItem(TKEY,JSON.stringify(TH));}catch(e){} applyTheme(); renderThemePop(); }); }
$('#theme-btn').onclick=e=>{ e.stopPropagation(); const p=$('#theme-pop'); p.hidden=!p.hidden; $('#theme-btn').setAttribute('aria-expanded',String(!p.hidden)); if(!p.hidden) renderThemePop(); };
document.addEventListener('pointerdown',e=>{ const p=$('#theme-pop'); if(p&&!p.hidden&&!e.target.closest('.theme-wrap')){ p.hidden=true; $('#theme-btn').setAttribute('aria-expanded','false'); } });
applyTheme();
/* ============ ACCOUNT (only when the Firebase build provides window.CLOUD) ============ */
function cloudLine(){ const C=window.CLOUD; if(!C||!C.user) return ''; if(C.status==='saving') return t('cloudSaving'); if(C.status==='error') return t('cloudErr'); return C.lastSync?t('cloudSynced')+' '+new Date(C.lastSync).toLocaleTimeString(S.lang==='ar'?'ar-SA':'en-GB',{timeStyle:'short'}):''; }
let AC={tab:'signup',err:'',busy:false,confirmDel:false,info:''};
function authIntent(){ const C=window.CLOUD; if(!AUTHQ||!C||!C.ready) return; const q=AUTHQ; AUTHQ=null; if(!C.user){ AC.tab=q; openAcct(); if(AUTHERR){ AC.err=(t('socialErr')||{})[AUTHERR]||(t('socialErr')||{}).failed; AUTHERR=null; renderAcct(); } } }
function openAcct(){ AC.err=''; AC.bad=''; AC.pwShow=false; AC.info=''; AC.infoHtml=''; AC.confirmDel=false; AC.deleted=false; closeUpgrade(); AC_RET=document.activeElement; $('#acct').hidden=false; overlayInert(); AC.planInfo=null;
  const C=window.CLOUD; if(C?.user&&C.planInfo) C.planInfo().then(r=>{ AC.planInfo=r; if(!$('#acct').hidden) renderAcct(); }).catch(()=>{ AC.planInfo={payments:[]}; if(!$('#acct').hidden) renderAcct(); });
  renderAcct(); setTimeout(()=>(['#ac-name','#ac-email','#ac-pass'].map(q=>$(q)).find(x=>x&&!x.value)||$('#ac-email')||$('#ac-x')||$('#acct button'))?.focus(),0); } /* the first field still to fill */
let AC_RET=null, UP_RET=null;
function closeAcct(){ AC.fPass=''; { const pw=$('#ac-pass'); if(pw) pw.value=''; } PEND=null; AC.gate=false; AC.gateUp=false; AC.gateRd=false; AC.gateSave=false; AC.deleted=false; $('#acct').hidden=true; overlayInert(); const r=AC_RET; AC_RET=null; (r&&r.isConnected&&r!==document.body?r:$('#acct-btn'))?.focus?.(); }
/* while a dialog (account, upgrade sheet, test) is open, everything behind it is inert: Tab and screen readers stay inside */
function overlayInert(){ const ex=document.body.classList.contains('exam-open'), acct=!$('#acct').hidden, up=!!($('#upsheet')&&!$('#upsheet').hidden), modal=acct||up;
  ['header.top','#main','footer','#tabbar','#banner','#nudge'].forEach(q=>{ const e=$(q); if(e) e.inert=ex||modal; }); const x=$('#exam'); if(x) x.inert=modal&&ex; const xp=$('#xp'); if(xp) xp.inert=modal; const a=$('#acct'); if(a) a.inert=up&&acct; }
document.addEventListener('keydown',e=>{ if(e.key!=='Tab'||document.body.classList.contains('xp-open')) return; const box=[$('#acct'),$('#upsheet'),$('#exam')].find(x=>x&&!x.hidden&&!x.inert); if(!box) return;
  const f=[...box.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]):not([type=hidden]),select:not([disabled]),textarea:not([disabled]),summary,[tabindex]:not([tabindex="-1"])')].filter(x=>x.offsetParent!==null&&!x.closest('[hidden]')); if(!f.length) return;
  const a=document.activeElement, first=f[0], last=f[f.length-1];
  if(!e.shiftKey&&(a===last||!box.contains(a))){ e.preventDefault(); first.focus(); } else if(e.shiftKey&&(a===first||!box.contains(a))){ e.preventDefault(); last.focus(); } });
document.addEventListener('keydown',e=>{ if(e.key!=='Escape') return; const a=$('#acct'), p=$('#theme-pop'), us=$('#upsheet'); if(us&&!us.hidden&&(!a||a.hidden)){ closeUpgrade(); return; } if(a&&!a.hidden){ closeAcct(); return; } if(p&&!p.hidden){ p.hidden=true; $('#theme-btn').setAttribute('aria-expanded','false'); $('#theme-btn').focus(); } });
const authMsg=(c,e)=>{ c=String(c||'').replace('auth/',''); if(c==='cur-pw') return t('curPwWrong'); if(c==='pw-long') return t('pwLong');
  if(c==='too-many-requests'){ const ra=+(e&&e.retryAfter)||0; return t('tooMany')(numL(ra?Math.max(1,Math.ceil(ra/60)):(AC.tab==='signup'&&!window.CLOUD?.user?60:15))); } /* the server's windows: 15 min (sign-in, password), 1 h (sign-up) */
  return t('authErr')[c]||t('authErr').other; };
/* same rule as the server: a Saudi mobile typed the local way, or any number in +country form */
const okPhone=v=>{ const p=String(v).replace(/[\u0660-\u0669]/g,d=>d.charCodeAt(0)-0x660).replace(/[\u06F0-\u06F9]/g,d=>d.charCodeAt(0)-0x6F0).replace(/[\s\-().]/g,''); return /^(05|5|9665|009665|\+9665|\+96605)\d{8}$/.test(p)||(/^(\+|00)[1-9]\d{7,14}$/.test(p)&&!/^(\+|00)966/.test(p)); };
function renderAcct(){
  const el=$('#acct'), C=window.CLOUD; if(!el||!C) return; const u=C.user;
  if(!u){ const v=q=>el.querySelector(q); if(v('#ac-email')) AC.fEmail=v('#ac-email').value; if(v('#ac-pass')) AC.fPass=v('#ac-pass').value; if(v('#ac-name')) AC.fName=v('#ac-name').value; if(v('#ac-ok')) AC.fOk=v('#ac-ok').checked; } /* a re-render keeps what was typed */
  el.innerHTML=`<div class="acct-box" role="dialog" aria-modal="true" aria-labelledby="acct-h">
    <button class="icon-btn acct-x" id="ac-x" aria-label="${t('close')}">${ICON.x}</button>
    ${u?`<h2 id="acct-h">${u.name?`${t('hello')}${S.lang==='ar'?'، ':', '}${esc(u.name)}`:t('acctTitle')}</h2>
      <p class="acct-mail" dir="ltr">${esc(u.email||'')}</p>
      ${C.plan?subSection():''}
      ${C.setName?`<details class="acct-priv" ${(!u.name||AC.nameOpen)?'open':''}><summary>${u.name?t('nameEdit'):t('nameMissing')}</summary><form id="ac-namef" class="acct-form" novalidate><label>${t('fullName')}<input type="text" id="ac-nm" autocomplete="name" maxlength="60" value="${esc(u.name||'')}" placeholder="${t('namePh')}"></label><button class="btn ghost" type="submit">${t('nameSave')}</button></form></details>`:''}
      ${C.setRemind?`<details class="acct-priv" ${AC.remOpen?'open':''}><summary>${L(bi('تذكير واتساب','WhatsApp reminders'))}: <b>${u.remind?L(bi('مفعّل','on')):L(bi('متوقف','off'))}</b></summary><form id="ac-remf" class="acct-form" novalidate><label>${t('phone')}<input type="tel" id="ac-rph" inputmode="tel" autocomplete="tel" maxlength="20" dir="ltr" placeholder="05XXXXXXXX" value="" ${u.phoneEnd?`aria-describedby="ac-rph-d"`:''}></label>${u.phoneEnd?`<p class="small muted" id="ac-rph-d">${L(bi(`رقمك المسجّل ينتهي بـ ${numL(u.phoneEnd)}. اتركه فارغًا لإبقائه.`,`Your saved number ends in ${u.phoneEnd}. Leave it empty to keep it.`))}</p>`:''}<label class="chkl"><input type="checkbox" id="ac-rem" ${u.remind?'checked':''}> <span>${L(bi('ذكّرني بجلسة اليوم وموعد اختباري على واتساب','Remind me of my daily session and test date on WhatsApp'))}</span></label><button class="btn ghost" type="submit">${t('nameSave')}</button></form></details>`:''}
      ${u.emailVerified?'':`<p class="small note">${t('verifyHint')}</p>`}
      <p class="small muted" id="cloud-line2">${cloudLine()}</p>
      <div class="row"><button class="btn primary" id="ac-sync">${t('syncNow')}</button><button class="btn ghost" id="ac-out">${t('signOut')}</button></div>
      ${C.changePassword?`<details class="acct-priv" ${AC.pwOpen?'open':''}><summary>${t('chPw')}</summary><form id="ac-pwf" class="acct-form" novalidate><label>${t('curPw')}<input type="password" id="ac-cur" autocomplete="current-password" dir="ltr"></label><label>${t('newPw')}<input type="password" id="ac-new" autocomplete="new-password" minlength="8" maxlength="200" dir="ltr"></label><button class="btn ghost" type="submit">${t('chPwBtn')}</button></form></details>`:''}
      <details class="acct-priv"><summary>${t('privT')}</summary><p class="small">${t('privD')}</p></details>
      ${AC.confirmDel?`<div class="ex-confirm inline"><p>${t('delConfirm')}</p><div class="row"><button class="btn danger" id="ac-del2">${t('delYes')}</button><button class="btn ghost" id="ac-nodel">${t('cancel')}</button></div></div>`:`<button class="btn danger-ghost sm" id="ac-del">${t('delAcct')}</button>`}
      `:AC.deleted?`<h2 id="acct-h">${t('deleted')}</h2><p class="small">${t('deletedD')}</p><div class="row"><a class="btn primary" href="/?home=1${S.lang==='en'?'&lang=en':''}">${t('goHome')}</a><button class="btn ghost" id="ac-x2">${t('close')}</button></div>`:`<h2 id="acct-h">${AC.gateRd?t('rdGateT'):AC.gateUp?t('signupFirstT'):AC.gateSave?t('saveT'):AC.gate?t(diagTaken()?'gateT2':'gateT'):AC.tab==='signin'?t('signinT'):t('acctJoinT')}</h2><p class="small ${AC.gate?'gate-msg':'muted'}">${AC.gateRd?t('rdGateD'):AC.gateUp?t('signupFirst'):AC.gateSave?t('saveD'):AC.gate?t(diagTaken()?'gateMsg2':'gateMsg'):AC.tab==='signin'?t('signinWhy'):t('acctWhy')}</p>
      <div class="seg acct-seg"><button class="${AC.tab==='signup'?'on':''}" data-tab="signup">${t('signUp')}</button><button class="${AC.tab==='signin'?'on':''}" data-tab="signin">${t('signIn')}</button></div>
      ${(()=>{ const so=(C.config&&C.config.social)||{}; if(!so.google&&!so.facebook) return ''; const nx=encodeURIComponent('/app'+(location.hash&&!/^#sign/.test(location.hash)?location.hash:''));
        return `<div class="acct-social">${so.google?`<a class="btn social" href="/auth/google?next=${nx}"><svg class="sic" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg><span>${t('withGoogle')}</span></a>`:''}${so.facebook?`<a class="btn social" href="/auth/facebook?next=${nx}"><svg class="sic" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#1877F2"/><path fill="#fff" d="M15.1 12.9l.4-2.9h-2.8V8.1c0-.8.4-1.6 1.7-1.6h1.3V4c0 0-1.2-.2-2.3-.2-2.3 0-3.8 1.4-3.8 3.9V10H7v2.9h2.6V20h3.1v-7.1h2.4z"/></svg><span>${t('withFacebook')}</span></a>`:''}
          ${AC.tab==='signup'?`<p class="acct-snote">${t('socialNote')}</p>`:''}<p class="acct-or"><span>${t('orEmail')}</span></p></div>`; })()}
      <form id="ac-form" class="acct-form" novalidate>
        ${AC.tab==='signup'&&C.setName?`<label>${t('fullName')}<input type="text" id="ac-name" autocomplete="name" maxlength="60" required placeholder="${t('namePh')}" value="${esc(AC.fName||'')}"></label>${AC.bad==='name'&&AC.err?`<p class="acct-err" id="ac-err" role="alert">${esc(AC.err)}</p>`:''}`:''}
        ${AC.tab==='signup'?`<label>${t('phone')} <span class="muted small">${L(bi('(اختياري)','(optional)'))}</span><input type="tel" id="ac-phone" inputmode="tel" autocomplete="tel" maxlength="20" dir="ltr" placeholder="05XXXXXXXX" value="${esc(AC.fPhone||'')}"></label>${AC.bad==='phone'&&AC.err?`<p class="acct-err" id="ac-err" role="alert">${esc(AC.err)}</p>`:''}<label class="chkl"><input type="checkbox" id="ac-remind" ${AC.fRemind?'checked':''}> <span>${L(bi('ذكّرني بجلسة اليوم وموعد اختباري على واتساب','Remind me of my daily session and test date on WhatsApp'))}</span></label>`:''}
        <label>${t('email')}<input type="email" id="ac-email" autocomplete="email" required dir="ltr" value="${esc(AC.fEmail||(AC.tab==='signin'?getOwner():''))}"></label>${AC.bad==='email'&&AC.err?`<p class="acct-err" id="ac-err" role="alert">${esc(AC.err)}</p>`:''}
        <label>${t(AC.tab==='signup'?'password':'passwordIn')}<span class="pw-wrap"><input type="${AC.pwShow?'text':'password'}" id="ac-pass" autocomplete="${AC.tab==='signup'?'new-password':'current-password'}" minlength="8" maxlength="200" required dir="ltr" value="${esc(AC.fPass||'')}"><button type="button" class="pw-eye" id="ac-eye" aria-pressed="${!!AC.pwShow}" aria-label="${t(AC.pwShow?'pwHide':'pwShow')}">${AC.pwShow?EYE_OFF:EYE}</button></span></label>
        ${AC.bad==='pass'&&AC.err?`<p class="acct-err" id="ac-err" role="alert">${esc(AC.err)}</p>`:''}
        ${AC.tab==='signup'?`<label class="chkl"><input type="checkbox" id="ac-ok" ${AC.fOk?'checked':''}> <span>${t('consent')}</span></label>`:''}
        ${AC.err&&(!AC.bad||AC.bad==='ok')?`<p class="acct-err" ${AC.bad?'id="ac-err"':''} role="alert">${esc(AC.err)}</p>`:''}
        <button class="btn primary block" type="submit" ${AC.busy?'disabled':''}>${AC.tab==='signup'?t('signUp'):t('signIn')}</button>
      </form>
      ${C.google?`<button class="btn ghost block" id="ac-google">${t('withGoogle')}</button>`:''}
      ${AC.tab==='signin'?`<button class="linkbtn" id="ac-reset">${t('forgot')}</button>`:''}
      <details class="acct-priv"><summary>${t('privT')}</summary><p class="small">${t('privD')}</p></details>`}
    ${AC.err&&u?`<p class="acct-err" role="alert">${esc(AC.err)}</p>`:''}${AC.info?`<p class="acct-info" role="status">${esc(AC.info)}</p>`:AC.infoHtml?`<p class="acct-info" role="status">${AC.infoHtml}</p>`:''}
  </div>`;
  const on=(id,f)=>{ const b=el.querySelector(id); if(b) b.onclick=f; };
  on('#ac-x',closeAcct); on('#ac-x2',closeAcct); on('#ac-up',()=>closeAcct());
  el.querySelectorAll('.acct-seg [data-tab]').forEach(b=>{ b.setAttribute('aria-pressed',String(b.classList.contains('on'))); b.onclick=()=>{ AC.tab=b.dataset.tab; AC.err=''; AC.bad=''; renderAcct(); el.querySelector('.acct-seg .on')?.focus(); }; });
  on('#ac-eye',()=>{ AC.pwShow=!AC.pwShow; const i=el.querySelector('#ac-pass'), b=el.querySelector('#ac-eye'); i.type=AC.pwShow?'text':'password'; b.setAttribute('aria-pressed',String(AC.pwShow)); b.setAttribute('aria-label',t(AC.pwShow?'pwHide':'pwShow')); b.innerHTML=AC.pwShow?EYE_OFF:EYE; });
  /* a failed check marks its field and returns the focus to it (the dialog is redrawn on every change) */
  if(AC.bad&&AC.err){ const b=el.querySelector('#ac-'+AC.bad), er=el.querySelector('#ac-err'); if(b){ b.setAttribute('aria-invalid','true'); if(er){ b.setAttribute('aria-describedby','ac-err'); } if(AC.badFocus) b.focus(); } } AC.badFocus=false;
  const run=async fn=>{ AC.busy=true; AC.bad=''; AC.err=''; AC.info=''; AC.infoHtml=''; renderAcct(); let ok=false; try{ await fn(); ok=true; AC.fPass=''; }catch(e){ AC.err=authMsg(e&&e.code,e); } AC.busy=false; renderAcct(); renderRoute();
    if(ok&&PEND&&C.user){ const p=PEND; closeAcct(); if(p.fn) p.fn(); else startTest(p.kind,p.o); }
    else if(ok&&AC.justIn&&C.user){ closeAcct(); toast(t('welcomeIn')(String(C.user.name||'').split(' ')[0])); if(X&&X.result) renderExam(); }
    AC.justIn=false; };
  const f=el.querySelector('#ac-form'); if(f) f.onsubmit=e=>{ e.preventDefault(); const em=el.querySelector('#ac-email').value.trim(), pw=el.querySelector('#ac-pass').value; AC.fEmail=em; AC.fPass=pw; const bad=k=>{ AC.bad=k; AC.badFocus=true; return renderAcct(); }; { const ok0=el.querySelector('#ac-ok'); if(ok0) AC.fOk=ok0.checked; } { const n0=el.querySelector('#ac-name'); if(n0) AC.fName=n0.value; }
    const nmEl=el.querySelector('#ac-name'), nm=nmEl?nmEl.value.replace(/\s+/g,' ').trim():''; AC.fEmail=em; if(nmEl) AC.fName=nm;
    /* checked in the order of the fields, so the first mistake from the top is the one reported */
    if(nmEl&&(nm.length<2||nm.length>60)){ AC.err=t('authErr')['invalid-name']; return bad('name'); }
    const phEl=el.querySelector('#ac-phone'), ph=phEl?phEl.value.trim():''; const rmEl=el.querySelector('#ac-remind'), rm=!!(rmEl&&rmEl.checked); if(rmEl) AC.fRemind=rm; if(phEl){ AC.fPhone=ph; if((ph||rm)&&!okPhone(ph)){ AC.err=t('authErr')['invalid-phone']; return bad('phone'); } }
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)){ AC.err=t('authErr')['invalid-email']; return bad('email'); }
    if(pw.length<8){ AC.err=t('authErr')['weak-password']; return bad('pass'); } if(pw.length>200){ AC.err=t('pwLong'); return bad('pass'); }
    if(AC.tab==='signup'&&!el.querySelector('#ac-ok').checked){ AC.err=t('authErr').consent||t('needConsent'); return bad('ok'); }
    run(async()=>{ await (AC.tab==='signup'?C.signUp(em,pw,nm,ph,rm):C.signIn(em,pw)); AC.justIn=true; }); };
  const rf=el.querySelector('#ac-remf'); if(rf) rf.onsubmit=e=>{ e.preventDefault(); const ph=el.querySelector('#ac-rph').value.trim(), rm=el.querySelector('#ac-rem').checked; if((ph||(rm&&!(C.user&&C.user.phoneEnd)))&&!okPhone(ph)){ AC.err=t('authErr')['invalid-phone']; AC.remOpen=true; return renderAcct(); } AC.remOpen=true; run(async()=>{ await C.setRemind(rm,ph); AC.info=L(bi('حُفظ إعداد التذكير.','Reminder setting saved.')); }); };
  const nf=el.querySelector('#ac-namef'); if(nf) nf.onsubmit=e=>{ e.preventDefault(); const v=el.querySelector('#ac-nm').value.replace(/\s+/g,' ').trim(); if(v.length<2||v.length>60){ AC.err=t('authErr')['invalid-name']; AC.nameOpen=true; return renderAcct(); } run(async()=>{ await C.setName(v); AC.nameOpen=false; AC.info=t('nameSaved'); }); };
  on('#ac-google',()=>run(()=>C.signInGoogle()));
  on('#ac-reset',()=>{ const em=el.querySelector('#ac-email').value.trim(); AC.fEmail=em; if(C.resetByAdmin){ AC.err=''; AC.infoHtml=`${esc(t('authErr')['reset-admin'])} <a class="mail-link" dir="ltr" href="mailto:info@gat.academy?subject=${encodeURIComponent(t('resetMail'))}&body=${encodeURIComponent(t('resetMailBody')(em||'…'))}">${esc(t('sendMail'))}</a>`; return renderAcct(); } /* reset by email to the team: a how-to with a ready-made message, not an error */
    if(!em){ AC.err=t('authErr')['invalid-email']; return renderAcct(); } run(async()=>{ await C.reset(em); AC.info=t('resetSent'); }); });
  on('#ac-sync',()=>run(()=>C.pushNow()));
  const pwf=el.querySelector('#ac-pwf'); if(pwf) pwf.onsubmit=e=>{ e.preventDefault(); AC.pwOpen=true; const cu=el.querySelector('#ac-cur').value, nw=el.querySelector('#ac-new').value; if(nw.length<8){ AC.err=t('authErr')['weak-password']; return renderAcct(); } if(nw.length>200){ AC.err=t('pwLong'); return renderAcct(); }
    run(async()=>{ try{ await C.changePassword(cu,nw); }catch(x){ if(x&&x.code==='invalid-credential'){ const y=new Error('cur'); y.code='cur-pw'; throw y; } throw x; } AC.info=t('pwChanged'); AC.pwOpen=false; }); };
  // sign out: sync first, then remove this account's progress from the device (it is safe in the cloud)
  on('#ac-out',()=>run(async()=>{ if(C.pushNow){ await C.pushNow(); if(C.status==='error'){ const x=new Error('sync'); x.code='sync-first'; throw x; } } await C.signOut(); clearLocal(); AC.info=t('signedOut'); AC.tab='signin'; /* the message says "sign in again": show the sign-in form, not sign-up */ if(PREM){ try{ sessionStorage.setItem('masar100_msg','signedOut'); }catch(e){} setTimeout(()=>location.reload(),600); } /* drop premium lessons from memory; the confirmation is shown again after the reload */ }));
  on('#ac-del',()=>{ AC.confirmDel=true; renderAcct(); }); on('#ac-nodel',()=>{ AC.confirmDel=false; renderAcct(); });
  on('#ac-del2',()=>run(async()=>{ await C.deleteAccount(); if(X) { clearInterval(timer); X=null; examShow(false); } clearLocal(); AC.confirmDel=false; AC.deleted=true; }));
}
window.__app={
  getS:()=>S, render:()=>{ if(window.CLOUD?.user?.email) setOwner(window.CLOUD.user.email); flushEVQ(); renderRoute(); authIntent(); if(!$('#acct').hidden) renderAcct(); const us=$('#upsheet'); if(us&&!us.hidden&&!us.contains(document.activeElement)) renderUpsheet(); },
  cloudStatus:()=>{ ['#cloud-line','#cloud-line2'].forEach(id=>{ const e=$(id); if(e) e.textContent=cloudLine(); }); },
  /* the cloud copy arrives: merge it with this device's copy (guest=true: the device had no account before this sign-in) */
  mergeCloud:(c,guest)=>{ if(!c||typeof c!=='object') return; const em=window.CLOUD?.user?.email||'', owner=getOwner();
    if(owner&&em&&owner!==em){ DET={}; try{ localStorage.removeItem(DKEY); }catch(e){} S=normalize(c); }  // local data belongs to another account: never mix it in
    else { const had=hasProgress(S); S=mergeStates(S,c); if(guest&&had) setTimeout(()=>toast(t('mergedGuest')),1200); }
    if(em) setOwner(em); try{ localStorage.setItem(KEY,JSON.stringify(S)); }catch(e){} },
  /* the server no longer accepts our session (expired, password changed or account deleted elsewhere): keep working locally, ask to sign in again */
  sessionLost:()=>{ SESSION_LOST=true; renderRoute(); },
  /* this account was signed out in another tab of this browser: its progress must not stay readable here */
  signedOutElsewhere:()=>{ if(X&&!X.result&&!X.reviewOnly) quitTest(); closeAcct(); S=normalize({lang:S.lang}); DET={}; try{ localStorage.removeItem(DKEY); }catch(e){} clearLive(); renderRoute(); toast(t('signedOutElsewhere')); },
  /* the cloud copy is too large for the server: drop the oldest history and try again */
  shrink:()=>{ let n=0; if(S.recent.length>600){ S.recent=S.recent.slice(-600); n++; } const open=S.mistakes.filter(m=>(m.box||0)<4); if(S.mistakes.length>open.length){ S.mistakes=open; n++; } if(S.mistakes.length>150){ S.mistakes=S.mistakes.slice(-150); n++; } if(S.attempts.length>150){ S.attempts=S.attempts.slice(-150); n++; } if(n) save(); return n>0; },
  summary:()=>{ const n=S.recent.length, c=S.recent.filter(x=>x.ok).length; return {est:estimate(),readiness:S.attempts.length?readiness():0,solved:n,acc:n?Math.round(100*c/n):0,models:Object.keys(S.models||{}).length,streak:calcStreak(),lastActive:S.days[S.days.length-1]||''}; }
};
let SESSION_LOST=false;
const hasProgress=s=>!!(s.attempts.length||s.mistakes.length||Object.keys(s.cards).length||Object.keys(s.xp).length||Object.keys(s.vocab.ar).length||Object.keys(s.vocab.en).length);
$('#acct-btn')&&($('#acct-btn').onclick=openAcct);
$('#acct')&&$('#acct').addEventListener('pointerdown',e=>{ if(e.target.id==='acct') closeAcct(); });
/* which account the progress on this device belongs to (device-only, never synced) */
const OKEY='masar100_owner';
function getOwner(){ try{ return localStorage.getItem(OKEY)||''; }catch(e){ return ''; } }
function setOwner(v){ try{ v?localStorage.setItem(OKEY,v):localStorage.removeItem(OKEY); }catch(e){} }
function clearLocal(){ S=normalize({lang:S.lang}); DET={}; try{ localStorage.removeItem(DKEY); }catch(e){} clearLive(); setOwner(''); save(); }
/* another tab of this browser changed the saved copy: take it in (merged) so this tab's next save cannot overwrite it; deferred while a test is running */
let PENDING_MERGE=null;
function takePending(){ if(PENDING_MERGE){ const o=PENDING_MERGE; PENDING_MERGE=null; S=mergeStates(S,o); } }
window.addEventListener('storage',e=>{ try{ if(e.storageArea&&e.storageArea!==localStorage) return;
  if(e.key===OKEY&&!e.newValue&&e.oldValue&&window.CLOUD?.user&&String(window.CLOUD.user.email).toLowerCase()===String(e.oldValue).toLowerCase()){ window.CLOUD.droppedElsewhere?.(); window.__app.signedOutElsewhere(); return; }
  if(e.key===DKEY){ DET=loadDetails(); return; }
  if(e.key===KEY&&e.newValue){ const o=JSON.parse(e.newValue); if(!o||typeof o!=='object'||o.savedAt===S.savedAt) return; if(X&&!X.result&&!X.reviewOnly){ PENDING_MERGE=o; return; } S=mergeStates(S,o); if($('#acct').hidden) renderRoute(); } }catch(err){} });
/* merge local (a) with cloud (b) progress without losing attempts made on either side; a reset made on one side is honoured (S.rst markers) */
const ms36=id=>parseInt(String(id||''),36)||0;
const uniDays=(x,y)=>[...new Set([...(x||[]),...(y||[])])].sort();
function mergeStates(a,b){
  a=normalize(a); b=normalize(b);
  const newer=(b.savedAt||0)>(a.savedAt||0)?b:a, older=newer===a?b:a;
  const o=Object.assign(DEF(),older,newer); o.lang=a.savedAt?newer.lang:b.lang;
  const ida=new Set(a.attempts.map(x=>x.id)), idb=new Set(b.attempts.map(x=>x.id)), sup=(x,y)=>[...y].every(i=>x.has(i));
  const base=sup(ida,idb)&&(ida.size||!idb.size)?a:sup(idb,ida)?b:null;
  if(base){ ['attempts','recent','stats','causes','models'].forEach(k=>o[k]=base[k]); }
  else {
    const am=new Map(); [...older.attempts,...newer.attempts].forEach(x=>am.set(x.id,x)); o.attempts=[...am.values()].sort((x,y)=>(x.date+x.id)<(y.date+y.id)?-1:1).slice(-300);
    const ra=a.recent, rb=b.recent; let k=0; while(k<ra.length&&k<rb.length&&JSON.stringify(ra[k])===JSON.stringify(rb[k])) k++;
    o.recent=ra.slice(0,k).concat(rb.slice(k),ra.slice(k)).map((x,i)=>[x,i]).sort((x,y)=>(x[0].d<y[0].d?-1:x[0].d>y[0].d?1:x[1]-y[1])).map(x=>x[0]).slice(-1500);
    o.causes={}; ['concept','careless','time','trap'].forEach(c=>o.causes[c]=Math.max(a.causes[c]||0,b.causes[c]||0));
    o.models={}; new Set([...Object.keys(a.models),...Object.keys(b.models)]).forEach(k=>{ const x=a.models[k], y=b.models[k]; if(!x||!y){ o.models[k]=x||y; return; } const l=(x.date||'')>=(y.date||'')?x:y; o.models[k]={...l,best:Math.max(x.best||0,y.best||0)}; });
  }
  /* mistakes: per question, the copy touched last wins (a closed one stays closed) */
  { const mm=new Map(); [...a.mistakes,...b.mistakes].forEach(x=>{ const w=mm.get(x.key); if(!w||(x.at||0)>(w.at||0)||((x.at||0)===(w.at||0)&&(x.box||0)>(w.box||0))) mm.set(x.key,x); }); o.mistakes=[...mm.values()].map((x,i)=>[x,i]).sort((x,y)=>((x[0].at||0)-(y[0].at||0))||(x[1]-y[1])).map(x=>x[0]); }
  o.days=uniDays(a.days,b.days); o.sessionDays=uniDays(a.sessionDays,b.sessionDays);
  o.done=a.planStart===b.planStart?{...older.done,...newer.done}:{...newer.done};
  const pickBox=(x,y)=>{ const r={...x}; for(const [k,v] of Object.entries(y||{})){ const w=r[k]; if(!w||(v.t&&w.t?v.t>w.t:((v.box||0)>(w.box||0)||((v.box||0)===(w.box||0)&&(v.due||'')>(w.due||''))))) r[k]=v; } return r; };
  o.cards=pickBox(a.cards,b.cards); o.vocab={ar:pickBox(a.vocab.ar,b.vocab.ar),en:pickBox(a.vocab.en,b.vocab.en)};
  o.xp={...a.xp}; for(const [k,v] of Object.entries(b.xp)){ const w=o.xp[k]; if(!w||(v.score||0)>(w.score||0)||((v.score||0)===(w.score||0)&&(v.date||'')>(w.date||''))) o.xp[k]=v; }
  for(const P of ['rs','fd']){ o[P]={...a[P]}; for(const [k,v] of Object.entries(b[P]||{})){ const w=o[P][k]; o[P][k]=!w?v:{...((v.date||'')>=(w.date||'')?v:w),best:Math.max(v.best||0,w.best||0)}; } }
  o.lastExport=[a.lastExport,b.lastExport].filter(Boolean).sort().pop()||undefined;
  o.diag=[a.diag,b.diag].filter(x=>x&&x.date).sort((x,y)=>x.date<y.date?-1:x.date>y.date?1:0)[0]; if(!o.diag) delete o.diag; /* baseline: the first diagnostic */
  o.since=[a.since,b.since].filter(Boolean).sort()[0]; if(!o.since) delete o.since;
  { const q=[a.dq,b.dq].filter(x=>x&&x.d); o.dq=q.length===2&&q[0].d===q[1].d?{d:q[0].d,n:Math.max(q[0].n||0,q[1].n||0)}:q.sort((x,y)=>x.d<y.d?-1:1).pop(); if(!o.dq) delete o.dq; }
  if(a.repHide||b.repHide) o.repHide=1; if(a.repSeen||b.repSeen) o.repSeen=1; o.nudgeD=[a.nudgeD,b.nudgeD].filter(Boolean).sort().pop(); if(!o.nudgeD) delete o.nudgeD;
  applyResets(o,a,b); capMistakesOf(o);
  o.savedAt=Math.max(a.savedAt||0,b.savedAt||0);
  return o;
}
function capMistakesOf(o){ if(o.mistakes.length<=300) return; const open=o.mistakes.filter(m=>(m.box||0)<4), closed=o.mistakes.filter(m=>(m.box||0)>=4); o.mistakes=closed.slice(-Math.max(0,300-open.length)).concat(open.slice(-300)); }
/* S.rst[part] = when that part was last erased on purpose (reset, restart, import). The side that erased later is the authority for that part;
   the other side only contributes what it did after that moment, so a stale device or tab can never bring erased progress back. */
function applyResets(o,a,b){
  const ra=a.rst||{}, rb=b.rst||{}, rst={}; for(const k of new Set([...Object.keys(ra),...Object.keys(rb)])){ const v=Math.max(+ra[k]||0,+rb[k]||0); if(v) rst[k]=v; } if(Object.keys(rst).length) o.rst=rst; else delete o.rst;
  for(const P of ['skills','models','mistakes','cards','plan']){
    const ma=+ra[P]||0, mb=+rb[P]||0; if(ma===mb) continue;
    const au=ma>mb?a:b, ot=au===a?b:a, m=Math.max(ma,mb), day=ymd(new Date(m)), fresh=(ot.savedAt||0)>m;
    const later=(arr,f)=>fresh?arr.filter(f):[];
    const models=()=>{ const r={...au.models}; if(fresh) for(const [k,v] of Object.entries(ot.models)) if(!r[k]&&ms36(v.aid)>m) r[k]=v; return r; };
    if(P==='skills'){ const ids=new Set(au.attempts.map(x=>x.id)); o.attempts=au.attempts.concat(later(ot.attempts,x=>!ids.has(x.id)&&ms36(x.id)>m)).sort((x,y)=>(x.date+x.id)<(y.date+y.id)?-1:1).slice(-300);
      o.recent=au.recent.concat(later(ot.recent,x=>(x.d||'')>=day)).slice(-1500); o.stats=au.stats; o.days=uniDays(au.days,later(ot.days,d=>d>=day)); o.sessionDays=uniDays(au.sessionDays,later(ot.sessionDays,d=>d>=day)); o.models=models(); o.rs={...au.rs}; o.fd={...au.fd}; }
    if(P==='models'){ o.models=models(); o.rs={...au.rs}; const keep=new Set(au.attempts.map(x=>x.id)); o.attempts=o.attempts.filter(x=>x.kind!=='model'||keep.has(x.id)||ms36(x.id)>m); }
    if(P==='mistakes'){ const keys=new Set(au.mistakes.map(x=>x.key)); o.mistakes=au.mistakes.concat(later(ot.mistakes,x=>!keys.has(x.key)&&(x.at||0)>m)); o.causes={...au.causes}; }
    if(P==='cards'){ const pick=(x,y)=>{ const r={...(x||{})}; if(fresh) for(const [k,v] of Object.entries(y||{})) if(!r[k]&&(v.t||0)>m) r[k]=v; return r; }; o.cards=pick(au.cards,ot.cards); o.vocab={ar:pick(au.vocab.ar,ot.vocab.ar),en:pick(au.vocab.en,ot.vocab.en)}; o.xp=pick(au.xp,ot.xp); }
    if(P==='plan'){ o.planStart=au.planStart; o.weeks=au.weeks; o.done={...au.done}; }
  }
}
/* ============ attempt details (local) ============ */
const DKEY='masar100_details';
function loadDetails(){ try{ return JSON.parse(localStorage.getItem(DKEY))||{}; }catch(e){ return {}; } }
let DET=loadDetails();
function getDetail(id){ return DET[id]||null; }
function saveDetail(att,all){
  const qs=all.map(({q,your,time,flag})=>({s:q.s,q:q.q,pkey:q.pkey||null,passage:q.pkey?null:(q.passage||null),opts:q.opts,ans:q.ans,exp:q.exp,cmp:!!q.cmp,key:q.key||null,your,t:Math.round(time),f:flag?1:undefined}));
  DET[att.id]={id:att.id,kind:X.kind,title:X.title,lang:X.lang,mk:X.kind==='model'||X.kind==='rs'?X.mk:null,skill:X.skill||null,att,qs};
  // keep: the latest attempt of each model + the 20 most recent other attempts
  const modelIds=new Set(Object.values(S.models||{}).map(m=>m.aid).filter(Boolean));
  const others=Object.values(DET).filter(x=>!modelIds.has(x.id)).sort((a,b)=>a.id<b.id?1:-1);
  others.slice(20).forEach(x=>delete DET[x.id]);
  Object.values(DET).forEach(x=>{ if(x.kind==='model'&&!modelIds.has(x.id)&&!others.slice(0,20).includes(x)) delete DET[x.id]; });
  /* the review copies are written when the browser is idle, so the result screen appears without waiting for a large write */
  const write=()=>{ for(let i=0;i<5;i++){ try{ localStorage.setItem(DKEY,JSON.stringify(DET)); break; }catch(e){ const old=Object.values(DET).sort((a,b)=>a.id<b.id?-1:1)[0]; if(!old) break; delete DET[old.id]; } } };
  if(window.requestIdleCallback) requestIdleCallback(write,{timeout:3000}); else setTimeout(write,300);
}
/* storage is full: drop the n oldest attempt details (a local convenience) to make room for the progress itself */
function shrinkDetails(n){ const ids=Object.values(DET).sort((a,b)=>a.id<b.id?-1:1).slice(0,n).map(x=>x.id); if(!ids.length) return false; ids.forEach(id=>delete DET[id]);
  try{ localStorage.setItem(DKEY,JSON.stringify(DET)); }catch(e){ DET={}; try{ localStorage.removeItem(DKEY); }catch(e2){} } return true; }
function openReview(id){
  if(X&&!X.result&&!X.reviewOnly) return;
  if(!PRO()){ hitLimit('review'); return; }
  const d=getDetail(id); if(!d){ const a=S.attempts.find(x=>x.id===id); if(!a){ toast(t('noDetail')); return; }
    const tt=T[S.lang], title=(tt.kinds[a.kind]||a.kind)+(a.mk?' '+numL(a.mk):'')+(a.skill&&SKILLS[a.skill]?' · '+SKILLS[a.skill][S.lang]:'');
    clearInterval(timer);
    X={kind:a.kind,title,lang:S.lang,mk:a.mk?a.mk-1:null,skill:a.skill||null,reviewOnly:true,sections:[],result:{all:[],bySkill:{},correct:a.correct,skipped:null,att:{...a,total:a.total||0,time:a.time||0},filter:'wrong',noDetail:true}};
    examShow(true); renderExam(); return; }
  const all=d.qs.map(x=>({q:{...x,area:SKILLS[x.s].area,passage:x.pkey?(PASSAGES[d.lang]||{})[x.pkey]:x.passage},your:x.your,time:x.t,flag:!!x.f}));
  const bySkill={}; all.forEach(({q,your})=>{ const b=bySkill[q.s]||(bySkill[q.s]={c:0,t:0}); b.t++; if(your===q.ans) b.c++; });
  const correct=all.filter(x=>x.your===x.q.ans).length, skipped=all.filter(x=>x.your==null).length;
  clearInterval(timer);
  X={kind:d.kind,title:d.title,lang:d.lang,mk:d.mk,skill:d.skill,reviewOnly:true,sections:[],result:{all,bySkill,correct,skipped,att:d.att,filter:'wrong'}};
  examShow(true); renderExam();
}
/* unfinished test: survives a reload (clock paused while away) */
const LKEY='masar100_live';
function saveLive(){ if(!X||X.result||X.reviewOnly) return; try{ const {confirm,showMap,...rest}=X; localStorage.setItem(LKEY,JSON.stringify({at:Date.now(),X:rest})); }catch(e){} }
/* leave a timed test and come back later: the live copy stays, and Today offers to continue */
function saveExit(){ if(!X) return; logTime&&logTime(); X.confirm=null; saveLive(); clearInterval(timer); X=null; examShow(false); renderRoute(); toast(L(bi('حُفظ اختبارك، وتكمله من صفحة «اليوم» متى شئت.','Your test is saved; continue it from Today whenever you like.'))); }
const hasLive=()=>{ try{ const L=JSON.parse(localStorage.getItem(LKEY)); return !!(L&&L.X&&Date.now()-(L.at||0)<=864e5); }catch(e){ return false; } };
function clearLive(){ try{ localStorage.removeItem(LKEY); }catch(e){} }
/* refresh the live copy when the tab is hidden or closed, so a resume starts exactly where the student stopped (the timed save above can be up to 10 s old).
   Practice with instant feedback (daily session, skill drill, review) is not an exam: time spent away from the tab is not charged there; timed tests keep running. */
document.addEventListener('visibilitychange',()=>{ if(document.hidden) saveLive(); else if(X&&!X.result&&!X.reviewOnly&&X.mode==='learn'){ X.tickAt=Date.now(); X.qStart=Date.now(); } }); window.addEventListener('pagehide',()=>saveLive());
function checkLive(){
  let L=null; try{ L=JSON.parse(localStorage.getItem(LKEY)); }catch(e){}
  if(!L||!L.X||!L.X.sections||Date.now()-(L.at||0)>864e5){ clearLive(); return; }
  const tt=T[S.lang], lx=L.X, sec=lx.sections[lx.si]||lx.sections[0];
  const el=$('#exam'); el.dir=S.lang==='ar'?'rtl':'ltr'; el.lang=S.lang; examShow(true);
  el.innerHTML=`<div class="ex-top"><div class="ex-title"><strong>${esc(tt.resumeT)}</strong></div></div><div class="rs"><div class="ex-confirm"><p>${esc(tt.resumeD(lx.title,numL(lx.qi+1),numL(sec.qs.length)))}</p><div class="row"><button class="btn primary" id="lv-yes">${tt.resumeBtn}</button><button class="btn ghost" id="lv-no">${tt.discardBtn}</button></div></div></div>`;
  el.querySelector('#lv-yes').onclick=()=>{ X={...lx,confirm:null,showMap:false,qStart:Date.now(),tickAt:Date.now()}; clearInterval(timer); timer=setInterval(tick,1000); renderExam(); toast(tt.resumed); };
  el.querySelector('#lv-no').onclick=()=>{ clearLive(); el.innerHTML=''; examShow(false); };
}
/* selective reset; each erased part is stamped in S.rst so other devices honour it (see applyResets) */
function resetParts(parts){
  const now=Date.now(), mark=(...ks)=>{ S.rst=S.rst||{}; ks.forEach(k=>S.rst[k]=now); };
  const has=k=>parts.includes(k)||parts.includes('all');
  if(parts.includes('all')){ DET={}; try{ localStorage.removeItem(DKEY); }catch(e){} const keep={lang:S.lang,track:S.track,target:S.target,diag:S.diag,dq:S.dq,since:S.since,repHide:S.repHide,repSeen:S.repSeen,nudgeD:S.nudgeD}; S=normalize({}); for(const k in keep) if(keep[k]!=null) S[k]=keep[k]; mark('plan','mistakes','models','cards','skills'); save(); renderRoute(); return; }
  if(has('plan')){ S.done={}; S.planStart=todayStr(); mark('plan'); }
  if(has('mistakes')){ S.mistakes=[]; S.causes={concept:0,careless:0,time:0,trap:0}; mark('mistakes'); }
  if(has('models')){ Object.values(S.models||{}).forEach(m=>{ if(m.aid) delete DET[m.aid]; }); S.models={}; S.rs={}; S.attempts=S.attempts.filter(a=>a.kind!=='model'&&a.kind!=='rs'); mark('models'); }
  if(has('cards')){ S.cards={}; S.vocab={ar:{},en:{}}; S.xp={}; mark('cards'); }
  if(has('skills')){ DET={}; S.recent=[]; S.stats={}; S.attempts=[]; S.days=[]; S.sessionDays=[]; S.models={}; S.rs={}; S.fd={}; mark('skills','models'); }
  try{ localStorage.setItem(DKEY,JSON.stringify(DET)); }catch(e){}
  save(); renderRoute();
}
/* data save: file export / import */
function payload(){ return JSON.stringify({app:'masar100',v:1,exportedAt:new Date().toISOString(),data:S}); }
async function exportFile(){
  const name=`gat-academy-${S.lang==='ar'?'تقدمي':'progress'}-${todayStr()}.json`;
  if(dlFn){ try{ await dlFn.save({filename:name,data:payload()}); S.lastExport=todayStr(); save(); toast(t('fileSaved')); renderRoute(); return; }
    catch(e){ if(e&&e.code==='declined') return; if(e&&e.code==='rate_limited'){ toast(t('tryAgain')); return; } } }
  if(!window.claude){ try{ const u=URL.createObjectURL(new Blob([payload()],{type:'application/json'})); const l=document.createElement('a'); l.href=u; l.download=name; document.body.appendChild(l); l.click(); l.remove(); setTimeout(()=>URL.revokeObjectURL(u),2000); S.lastExport=todayStr(); save(); toast(t('fileSaved')); renderRoute(); return; }catch(e){} }
  const ta=$('#bk-in'); if(ta){ ta.value=btoa(unescape(encodeURIComponent(JSON.stringify(S)))); ta.select(); } toast(t('fileFallback'));
}
function importText(txt){
  let o; try{ txt=String(txt||'').trim();
    try{ o=JSON.parse(txt); }catch(e){ o=JSON.parse(decodeURIComponent(escape(atob(txt)))); }
    if(o&&o.app==='masar100') o=o.data; if(!o||typeof o!=='object'||!o.stats||!Array.isArray(o.attempts||[])) throw 0;
  }catch(e){ toast(t('badCode')); return; }
  const doIt=()=>{ const now=Date.now(); S=normalize(o); S.rst={plan:now,mistakes:now,models:now,cards:now,skills:now}; save(); renderRoute(); toast(t('imported')); };
  const box=$('#bk-confirm'); if(!box||!(S.attempts.length||Object.keys(S.cards).length)) return doIt();
  box.innerHTML=`<div class="ex-confirm inline"><p>${t('importQ')}</p><div class="row"><button class="btn primary" id="im-yes">${t('importYes')}</button><button class="btn ghost" id="im-no">${t('cancel')}</button></div></div>`;
  $('#im-yes').onclick=doIt; $('#im-no').onclick=()=>box.innerHTML=''; box.scrollIntoView({block:'nearest'});
}
$('#lang-btn').onclick=()=>{ S.lang=S.lang==='ar'?'en':'ar'; VC.flip=false; save(); renderRoute(); const us=$('#upsheet'); if(us&&!us.hidden) renderUpsheet(); };
let XP_BACK=null;
let XP_NUDGE=false;
function xpHooks(){ if(!XPOK()||xpHooks.done) return; xpHooks.done=1; XP.setHooks({onDone:(k,sc,n)=>{ S.xp=S.xp||{}; const w=S.xp[k]; if(!w||sc>=(w.score||0)) S.xp[k]={score:sc,n,date:todayStr(),t:Date.now()}; save(); track('xp_done',k,sc);
    /* the student finished every free explainer of this skill and more are waiting: one warm invitation after the player closes */
    if(!PRO()){ const L0=XP.get?.(k), sk=L0&&L0.sk; if(sk&&lockedXp(sk).length&&xpList(sk).every(x=>S.xp[x.key])) XP_NUDGE=true; } },
  onClose:()=>{ const y=window.scrollY; renderRoute(); window.scrollTo(0,y); if(XP_NUDGE){ XP_NUDGE=false; maybeNudge('xp'); } const b=XP_BACK&&document.querySelector(`[data-xp="${XP_BACK}"]`); if(b) b.focus({preventScroll:true}); }}); XP.loadTracks(); }
window.addEventListener('hashchange',()=>{ if(document.body.classList.contains('xp-open')&&XPOK()) XP.close(); closeUpgrade(); if(NUDGE){ NUDGE=null; renderNudge(); } /* the nudge belongs to the moment it was shown; moving on dismisses it so it never covers another page's buttons */ renderRoute(); authIntent(); window.scrollTo(0,0); });
/* offline copy of the app and its assets, and "add to home screen" */
if('serviceWorker' in navigator&&location.protocol==='https:') window.addEventListener('load',()=>navigator.serviceWorker.register('/sw.js').catch(()=>{}));
let INSTALL=null; window.addEventListener('beforeinstallprompt',e=>{ e.preventDefault(); INSTALL=e; if(location.hash.startsWith('#today')||!location.hash) renderRoute(); });
const standalone=()=>matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
const isIOS=()=>/iphone|ipad|ipod/i.test(navigator.userAgent)&&!window.MSStream;
function installCard(){ if(standalone()||S.instHide||!diagTaken()||!(INSTALL||isIOS())) return '';
  return `<div class="demo inst"><span>${L(bi('ثبّت أكاديمية القدرات على شاشتك الرئيسية، وافتحها بلمسة كتطبيق.','Add GAT Academy to your home screen and open it with one tap, like an app.'))}</span><span class="row"><button class="btn primary sm" id="inst-go">${L(bi('ثبّت','Install'))}</button><button class="btn ghost sm" id="inst-x">${L(bi('لاحقًا','Later'))}</button></span></div>`; }
function bindInstall(m){ const g=m.querySelector('#inst-go'); if(g) g.onclick=async()=>{ if(INSTALL){ INSTALL.prompt(); try{ await INSTALL.userChoice; }catch(e){} INSTALL=null; renderRoute(); } else toast(L(bi('في سفاري: اضغط زر المشاركة ثم «إضافة إلى الشاشة الرئيسية».','In Safari: tap Share, then “Add to Home Screen”.'))); };
  const x=m.querySelector('#inst-x'); if(x) x.onclick=()=>{ S.instHide=1; save(); renderRoute(); }; }
try{ const rf=new URLSearchParams(location.search).get('ref'); if(rf&&/^[A-Z0-9]{6}$/.test(rf)) localStorage.setItem('gat_ref',rf); }catch(e){}
streakGuard(); renderRoute(); initAI(); checkLive();
/* after the first screen: the web fonts, then (once the page has loaded) the explainer player in order; then hook it up and redraw */
{ const fo=()=>{ const f=$('#fonts-l'); if(f) f.media='all'; }; if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',fo); else fo(); }

(()=>{ const go=()=>{ const tags=[...document.querySelectorAll('script[data-later]')]; let i=0;
    const next=()=>{ if(i>=tags.length){ xpHooks(); loadPremium(); if(!X) renderRoute(); return; } const tg=tags[i++], sc=document.createElement('script'); sc.src=tg.getAttribute('src'); sc.onload=next; sc.onerror=next; document.body.appendChild(sc); };
    next(); };
  if(document.readyState==='complete') setTimeout(go,0); else window.addEventListener('load',()=>setTimeout(go,0)); })();
if(!STORE_OK){ SAVE_WARNED=true; setTimeout(()=>toast(tc('saveFail')),900); }
try{ const msg=sessionStorage.getItem('masar100_msg'); if(msg){ sessionStorage.removeItem('masar100_msg'); if(T[S.lang][msg]) setTimeout(()=>toast(t(msg)),700); } }catch(e){} /* a message carried over a reload (e.g. sign-out) */
{ const el=$('#save-dot'); if(el){ el.classList.toggle('bad',!STORE_OK); el.title=STORE_OK?t('savedOk'):tc('saveFail'); el.setAttribute('aria-label',el.title); } }
