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
 {s:'context',q:'انتشر الخبر ببطء شديد، فعلم به الجميع خلال دقائق.',o:['انتشر','ببطء','الجميع','خلال'],a:1,e:'الصحيح «بسرعة».'},
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
 {s:'context',q:'Reading nourishes the mind; it narrows a person\'s horizons and enriches their language.',o:['nourishes','narrows','horizons','enriches'],a:1,e:'It should be "broadens".'},
 {s:'context',q:'The news spread very slowly, and everyone had heard it within minutes.',o:['spread','slowly','everyone','within'],a:1,e:'It should be "quickly".'},
 {s:'context',q:'A successful leader is known for hesitation when making critical decisions and taking responsibility.',o:['successful','hesitation','critical','responsibility'],a:1,e:'It should be "decisiveness".'},
 {s:'context',q:'As we climb above sea level, the temperature rises and the air becomes thinner.',o:['climb','rises','air','thinner'],a:1,e:'It should be "falls".'},
 {s:'context',q:'Regular exercise helps weaken the body and improve one\'s mood.',o:['Regular','weaken','improve','mood'],a:1,e:'It should be "strengthen".'},
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
 {s:'comparison',cmp:1,q:{ar:'س > 0<br>القيمة الأولى: ⟦س⟧<br>القيمة الثانية: ⟦س^2⟧',en:'x > 0<br>Quantity A: ⟦x⟧<br>Quantity B: ⟦x^2⟧'},a:3,e:{ar:'عند ⟦س = ½⟧ الأولى أكبر، وعند ⟦س = 2⟧ الثانية أكبر.',en:'At ⟦x = ½⟧ A is greater; at ⟦x = 2⟧ B is greater.'}},
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
  const push=c=>{ if(out.length>=4||!isFinite(c)) return; if(!allowNeg&&c<0) return; const f=fmt(c); if(!seen.has(f)){seen.add(f);out.push(f);} };
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
    return {s:'arith',q:bi(`تسير سيارة بسرعة ${v} كم/ساعة لمدة ${arC(t,['ساعة واحدة','ساعتين','ساعات','ساعة'])}. ما المسافة التي تقطعها بالكيلومتر؟`,`A car drives at ${v} km/h for ${t} hours. How many kilometers does it travel?`),o:mkOpts(ans,[v+t,ans+v,v*(t-1),ans/2]),e:bi(`⟦المسافة = ${v} × ${t} = ${ans}⟧`,`⟦distance = ${v} × ${t} = ${ans}⟧`)}; },
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
  seqGeo(){ const s=R(1,5), r=pick([2,3]); const t=[0,1,2,3].map(i=>s*r**i); const ans=s*r**4;
    return {s:'algebra',q:bi(`ما العدد التالي في المتتابعة: ⟦${t.join('، ')}، ...⟧؟`,`What comes next: ⟦${t.join(', ')}, ...⟧?`),o:mkOpts(ans,[t[3]+(t[3]-t[2]),ans*r,ans-r,ans+s]),e:bi(`كل حد يُضرب في ⟦${r}⟧: ⟦${t[3]} × ${r} = ${ans}⟧`,`Each term is multiplied by ⟦${r}⟧: ⟦${t[3]} × ${r} = ${ans}⟧`)}; },
  evaluate(){ const x=R(-4,6); const v=x*x-3*x+2;
    return {s:'algebra',q:bi(`إذا كان ⟦س = ${N(x)}⟧ فما قيمة ⟦س^2 − 3س + 2⟧؟`,`If ⟦x = ${N(x)}⟧, what is ⟦x^2 − 3x + 2⟧?`),o:mkOpts(v,[v+2,x*x+3*x+2,v-1,-v],N,true),e:bi(`⟦(${N(x)})^2 − 3(${N(x)}) + 2 = ${x*x} ${x<0?'+':'−'} ${Math.abs(3*x)} + 2 = ${N(v)}⟧`,`⟦(${N(x)})^2 − 3(${N(x)}) + 2 = ${x*x} ${x<0?'+':'−'} ${Math.abs(3*x)} + 2 = ${N(v)}⟧`)}; },
  rect(){ const l=R(4,15), w=R(2,l-1); const area=l*w, per=2*(l+w);
    if(rnd()<.5) return {s:'geometry',q:bi(`مستطيل طوله ${l} سم وعرضه ${w} سم. ما مساحته بالسنتيمتر المربع؟`,`A rectangle is ${l} cm long and ${w} cm wide. What is its area in cm²?`),o:mkOpts(area,[per,l+w,area+l,area-w]),e:bi(`⟦${l} × ${w} = ${area}⟧`,`⟦${l} × ${w} = ${area}⟧`)};
    return {s:'geometry',q:bi(`مستطيل طوله ${l} سم وعرضه ${w} سم. ما محيطه بالسنتيمتر؟`,`A rectangle is ${l} cm long and ${w} cm wide. What is its perimeter in cm?`),o:mkOpts(per,[area,l+w,per+2,per-2]),e:bi(`⟦2 × (${l} + ${w}) = ${per}⟧`,`⟦2 × (${l} + ${w}) = ${per}⟧`)}; },
  triangle(){ const a=R(30,80), b=R(20,Math.min(100,170-a)); const c=180-a-b;
    return {s:'geometry',q:bi(`مثلث قياس زاويتين فيه ${a}° و ${b}°. ما قياس الزاوية الثالثة؟`,`Two angles of a triangle are ${a}° and ${b}°. What is the third angle?`),o:mkOpts(c,[c+10,c-10,180-a,a+b],x=>N(x)+'°'),e:bi(`⟦180 − ${a} − ${b} = ${c}⟧`,`⟦180 − ${a} − ${b} = ${c}⟧`)}; },
  pyth(){ const [a,b,c]=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25],[6,8,10],[9,12,15],[12,16,20]]);
    return {s:'geometry',q:bi(`مثلث قائم الزاوية طولا ضلعي القائمة ${a} و ${b}. ما طول الوتر؟`,`A right triangle has legs ${a} and ${b}. What is the hypotenuse?`),o:mkOpts(c,[a+b,c+1,c-1,c+2]),e:bi(`⟦√(${a*a} + ${b*b}) = √${c*c} = ${c}⟧`,`⟦√(${a*a} + ${b*b}) = √${c*c} = ${c}⟧`)}; },
  circle(){ const r=R(2,12); const ans=r*r;
    return {s:'geometry',q:bi(`دائرة نصف قطرها ${r} سم. ما مساحتها؟`,`A circle has a radius of ${r} cm. What is its area?`),o:mkOpts(ans,[2*r,4*r*r,r,r*r+r],x=>`⟦${x}π⟧`),e:bi(`⟦π × ${r}^2 = ${ans}π⟧`,`⟦π × ${r}^2 = ${ans}π⟧`)}; },
  avgMissing(){ const avg=R(10,30); let x,y,z,w; do{ x=R(avg-8,avg+8); y=R(avg-8,avg+8); z=R(avg-8,avg+8); w=4*avg-x-y-z; }while(w<=0);
    return {s:'stats',q:bi(`متوسط أربعة أعداد ${avg}، وثلاثة منها ${x} و ${y} و ${z}. ما العدد الرابع؟`,`The mean of four numbers is ${avg}. Three of them are ${x}, ${y} and ${z}. What is the fourth?`),o:mkOpts(w,[avg,w+4,w-4,4*avg]),e:bi(`المجموع ⟦4 × ${avg} = ${4*avg}⟧، والرابع ⟦${4*avg} − ${x+y+z} = ${w}⟧`,`Sum ⟦= 4 × ${avg} = ${4*avg}⟧, fourth ⟦= ${4*avg} − ${x+y+z} = ${w}⟧`)}; },
  median(){ const s=new Set(); while(s.size<5) s.add(R(1,40)); const arr=[...s]; const sorted=arr.slice().sort((a,b)=>a-b); const med=sorted[2];
    const mean=Math.round(arr.reduce((a,b)=>a+b,0)/5);
    return {s:'stats',q:bi(`ما الوسيط للقيم: ⟦${arr.join('، ')}⟧؟`,`What is the median of: ⟦${arr.join(', ')}⟧?`),o:mkOpts(med,[arr[2],mean,sorted[1],sorted[3]]),e:bi(`بعد الترتيب: ⟦${sorted.join('، ')}⟧، والوسيط ⟦${med}⟧`,`Sorted: ⟦${sorted.join(', ')}⟧, median ⟦= ${med}⟧`)}; },
  pctChange(){ const p=pick([10,20,25,50]); const old=20*R(2,15); const up=rnd()<.6; const nw=old*(100+(up?p:-p))/100;
    const wrong=Math.round(Math.abs(nw-old)/nw*1000)/10;
    return {s:'stats',q:bi(`${up?'ارتفع':'انخفض'} عدد زوار معرض من ${old} إلى ${nw}. ما نسبة ${up?'الزيادة':'الانخفاض'}؟`,`Visitors to an exhibition went ${up?'up':'down'} from ${old} to ${nw}. What is the percent ${up?'increase':'decrease'}?`),o:mkOpts(p,[wrong,p+5,p/2,p*2],x=>N(x)+'%'),e:bi(`⟦${Math.abs(nw-old)} ÷ ${old} × 100 = ${p}%⟧ (نقسم على القيمة القديمة)`,`⟦${Math.abs(nw-old)} ÷ ${old} × 100 = ${p}%⟧ (divide by the old value)`)}; },
  compare(){ const t=R(0,2); let qa,qe,a,A,B,ex;
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
   150 generated items or copy a fixed bank item word for word. History resets whenever rnd is swapped
   (e.g. each seeded model build), so model tests stay reproducible. */
let _gh=[],_ghR=null,_BK=null;
const genKey=r=>r.s==='odd'?'odd|'+r.o.slice().sort().join('|'):(typeof r.q==='object'?r.q.ar:r.q);
function _bankKeys(){ if(!_BK){ _BK=new Set(); QB.forEach(r=>{ _BK.add(r.q.ar); _BK.add(r.q.en); }); [VB_AR,VB_EN].forEach(b=>b.forEach(r=>{ if(r.s==='analogy'||r.s==='completion') _BK.add(r.q); if(r.s==='odd') _BK.add(genKey(r)); })); } return _BK; }
function genUnique(fn){
  if(_ghR!==rnd){ _ghR=rnd; _gh=[]; }
  const bk=_bankKeys(); let r;
  for(let i=0;i<15;i++){ r=fn(); const qs=typeof r.q==='object'?[r.q.ar,r.q.en]:[r.q]; if(!_gh.includes(genKey(r))&&!bk.has(genKey(r))&&!qs.some(x=>bk.has(x))) break; }
  _gh.push(genKey(r)); if(_gh.length>150) _gh.shift(); return r;
}
const GEN_BY_SKILL = {arith:['percent','discount','ratio','speed','fracAdd'],algebra:['linear','exponent','seqArith','seqGeo','evaluate'],geometry:['rect','triangle','pyth','circle'],stats:['avgMissing','median','pctChange'],comparison:['compare']};
/* ============ Verbal bank expansion (AR + EN) ============ */
Object.assign(PASSAGES.ar,{
  P4:'الوقف في الحضارة الإسلامية هو حبس أصل المال وتسبيل منفعته، أي أن يبقى الأصل ثابتًا لا يُباع ولا يُورث، وتُصرف غلّته في وجوه الخير. وقد أسهمت الأوقاف عبر القرون في بناء المدارس والمستشفيات وحفر الآبار، حتى إن بعض المدن كانت تعتمد عليها في تعليم أبنائها وعلاج مرضاها. ويرى الباحثون أن سرّ استمرار الوقف قرونًا طويلة يكمن في فكرته الأساسية: الأصل باقٍ والنفع متجدد.',
  P5:'يلاحظ المعلمون أن كثيرًا من الطلاب يجدون صعوبة في التركيز مدة طويلة. ويعزو بعض الباحثين ذلك إلى الاستخدام المفرط للهواتف الذكية، إذ تعوّد التنبيهات المتكررة الدماغ على التنقل السريع بين المهام. غير أن الحل لا يكمن في منع الهاتف تمامًا، بل في تنظيم استخدامه، كأن يخصص الطالب أوقاتًا للمذاكرة يُبعد فيها هاتفه عن متناوله، ثم يكافئ نفسه بعدها بوقت قصير لاستخدامه.',
  P6:'تعتمد مناطق كثيرة في شبه الجزيرة العربية على المياه الجوفية، وهي مياه تجمعت في طبقات الأرض عبر آلاف السنين. وتكمن خطورة الإسراف في استخدامها في أن تجدّدها بطيء جدًا مقارنة بسرعة استهلاكها، فما يُستنزف في عقود قد يحتاج إلى قرون ليعود. لذلك تتجه الخطط الحديثة إلى تحلية مياه البحر وإعادة تدوير المياه المستعملة في الزراعة.',
  P7:'مرّ الخط العربي بمراحل تطور عديدة، فقد كان في بداياته خاليًا من النقط والتشكيل، ثم أُضيفت إليه النقاط لتمييز الحروف المتشابهة، والحركات لضبط النطق، حين كثر الداخلون في الإسلام من غير العرب وخِيف على القرآن من اللحن. ثم تحوّل الخط من أداة للكتابة إلى فن قائم بذاته، له مدارسه وأنواعه كالنسخ والثلث والديواني والكوفي.',
  P8:'يَعِد الذكاء الاصطناعي بتعليم يتكيّف مع كل طالب، فيقدّم له التمارين التي تناسب مستواه ويشرح له ما أخطأ فيه فورًا. لكن الخبراء يحذّرون من أن الاعتماد الكامل عليه قد يُضعف قدرة الطالب على التفكير المستقل إذا صار يطلب الإجابة قبل أن يحاول. ويرون أن أفضل استخدام له أن يكون مدرّبًا يطرح الأسئلة ويوجّه، لا آلة تعطي الحلول الجاهزة.'
});
Object.assign(PASSAGES.en,{
  P4:'In Islamic civilization, a waqf (endowment) means holding the original asset permanently while dedicating its benefit to charity: the asset stays fixed, it cannot be sold or inherited, and its revenue is spent on good causes. Over the centuries, endowments helped build schools and hospitals and dig wells, so much that some cities relied on them to educate their children and treat their sick. Researchers believe the secret of the waqf\'s survival across centuries lies in its core idea: the asset remains and the benefit renews.',
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
 {s:'context',q:'الشمس مصدر الظلام والدفء على كوكب الأرض.',o:['مصدر','الظلام','الدفء','كوكب'],a:1,e:'الصحيح «الضوء».'},
 {s:'context',q:'يحرص المزارع على سقي أرضه وقت الظهيرة ليقلل تبخر الماء.',o:['يحرص','سقي','الظهيرة','تبخر'],a:2,e:'الصحيح «الصباح الباكر» أو «المساء».'},
 {s:'context',q:'يذوب الثلج عند انخفاض درجة الحرارة فيتحول إلى ماء.',o:['يذوب','انخفاض','يتحول','ماء'],a:1,e:'الصحيح «ارتفاع».'},
 {s:'context',q:'كان الجو ممطرًا، فترك الناس المظلات ولبسوا المعاطف الواقية من المطر.',o:['ممطرًا','ترك','المعاطف','الواقية'],a:1,e:'الصحيح «حمل».'},
 {s:'context',q:'لأن المكتبة هادئة يقصدها الطلاب للمذاكرة والحديث بصوت مرتفع والتركيز.',o:['هادئة','للمذاكرة','مرتفع','التركيز'],a:2,e:'الهدوء والتركيز ينفيان الصوت المرتفع؛ الصحيح «منخفض».'},
 {s:'context',q:'يتميز الجمل بقدرته على تحمل العطش، لذا يُعد أضعف الحيوانات ملاءمة للصحراء.',o:['تحمل','العطش','أضعف','للصحراء'],a:2,e:'الصحيح «أكثر».'},
 {s:'context',q:'كان القائد حكيمًا، يستمع لآراء فريقه ثم يتخذ قراراته بتهوّر.',o:['حكيمًا','يستمع','آراء','بتهوّر'],a:3,e:'الصحيح «بتأنٍّ».'},
 {s:'context',q:'استيقظ مبكرًا فأدرك الحافلة، لكنه وصل إلى المدرسة قبل الجميع.',o:['مبكرًا','فأدرك','لكنه','قبل'],a:2,e:'أداة الربط خاطئة؛ الوصول المبكر نتيجة لا استدراك، والصحيح «فـ».'},
 {s:'context',q:'تنمو النباتات وتزدهر إذا حُرمت من الماء والضوء الكافيين.',o:['تنمو','تزدهر','حُرمت','الكافيين'],a:2,e:'الصحيح «حصلت على».'},
 {s:'context',q:'بذل اللاعب جهدًا كبيرًا في التدريب، فتراجع مستواه وتألق في المباراة.',o:['جهدًا','التدريب','تراجع','تألق'],a:2,e:'الصحيح «تحسّن».'},
 {s:'context',q:'كلما قرأ الإنسان أكثر، ضعفت حصيلته اللغوية واتسعت ثقافته.',o:['قرأ','ضعفت','حصيلته','اتسعت'],a:1,e:'الصحيح «زادت».'},
 {s:'context',q:'أُغلق المتجر بسبب الإقبال الكبير عليه وكثرة أرباحه.',o:['أُغلق','الإقبال','الكبير','أرباحه'],a:0,e:'الإقبال والأرباح يقتضيان «توسّع».'},
 {s:'context',q:'اشتهر حاتم الطائي ببخله حتى صار يُضرب به المثل في الكرم.',o:['اشتهر','ببخله','المثل','الكرم'],a:1,e:'الصحيح «بكرمه».'},
 {s:'context',q:'يزداد الطلب على المراوح في فصل الشتاء بسبب شدة الحرارة.',o:['يزداد','المراوح','الشتاء','الحرارة'],a:2,e:'الصحيح «الصيف».'},
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
 {s:'context',q:'Because the library is quiet, students go there to study, talk loudly and concentrate.',o:['quiet','study','loudly','concentrate'],a:2,e:'Quiet and concentration rule out loud talk.'},
 {s:'context',q:'Camels can endure thirst, which makes them the least suited animals for the desert.',o:['endure','thirst','least','desert'],a:2,e:'It should be "best".'},
 {s:'context',q:'The wise leader listens to his team\'s opinions and then makes his decisions recklessly.',o:['wise','listens','opinions','recklessly'],a:3,e:'It should be "carefully".'},
 {s:'context',q:'He woke up early and caught the bus, but he arrived at school before everyone.',o:['early','caught','but','before'],a:2,e:'The linking word is wrong; arriving early is a result, so "and".'},
 {s:'context',q:'Plants grow and flourish when they are deprived of enough water and light.',o:['grow','flourish','deprived','enough'],a:2,e:'It should be "given".'},
 {s:'context',q:'The player trained hard, so his performance declined and he shone in the match.',o:['trained','declined','shone','match'],a:1,e:'It should be "improved".'},
 {s:'context',q:'The more a person reads, the poorer his vocabulary and the broader his knowledge.',o:['reads','poorer','broader','knowledge'],a:1,e:'It should be "richer".'},
 {s:'context',q:'The shop closed down because of its large number of customers and high profits.',o:['closed','large','customers','profits'],a:0,e:'Customers and profits imply it "expanded".'},
 {s:'context',q:'Hatim al-Tai was famous for his stinginess, so much that he became a proverb for generosity.',o:['famous','stinginess','proverb','generosity'],a:1,e:'It should be "generosity".'},
 {s:'context',q:'Demand for fans rises in winter because of the intense heat.',o:['Demand','fans','winter','heat'],a:2,e:'It should be "summer".'},
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
  {n:'صاحب المهنة ومكان عمله',sym:0,p:[['طبيب','مستشفى'],['معلم','مدرسة'],['قاضٍ','محكمة'],['مزارع','حقل'],['خباز','مخبز'],['بحّار','سفينة'],['صيدلي','صيدلية'],['طيار','طائرة'],['عامل','مصنع'],['ممثل','مسرح']]},
  {n:'سبب ونتيجة',sym:0,p:[['مطر','سيول'],['إهمال','فشل'],['اجتهاد','نجاح'],['نار','دخان'],['زلزال','دمار'],['تلوث','مرض'],['إسراف','فقر'],['رياضة','لياقة'],['برد','قشعريرة'],['سهر','إرهاق']]},
  {n:'الكائن ومسكنه',sym:0,p:[['نحلة','خلية'],['طائر','عش'],['أسد','عرين'],['حصان','إسطبل'],['دجاجة','قن'],['أرنب','جحر'],['عنكبوت','شبكة'],['نمل','قرية']]},
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
  {n:'worker and workplace',sym:0,p:[['doctor','hospital'],['teacher','school'],['judge','court'],['farmer','field'],['baker','bakery'],['sailor','ship'],['pharmacist','pharmacy'],['pilot','cockpit'],['actor','stage'],['chef','kitchen']]},
  {n:'cause and effect',sym:0,p:[['rain','flood'],['negligence','failure'],['effort','success'],['fire','smoke'],['earthquake','destruction'],['drought','famine'],['pollution','illness'],['exercise','fitness'],['cold','shiver'],['sleeplessness','fatigue']]},
  {n:'animal and home',sym:0,p:[['bee','hive'],['bird','nest'],['lion','den'],['horse','stable'],['chicken','coop'],['rabbit','burrow'],['spider','web'],['ant','anthill']]},
  {n:'young and adult',sym:0,p:[['cub','lion'],['foal','horse'],['puppy','dog'],['calf','cow'],['child','adult'],['chick','hen'],['kitten','cat']]},
  {n:'maker and material',sym:0,p:[['carpenter','wood'],['tailor','fabric'],['blacksmith','iron'],['potter','clay'],['goldsmith','gold'],['sculptor','marble'],['glassblower','glass']]},
  {n:'raw material and product',sym:0,p:[['cotton','cloth'],['flour','bread'],['milk','cheese'],['sand','glass'],['leather','shoe'],['wheat','flour'],['wood','paper']]},
  {n:'unit and quantity',sym:0,p:[['meter','length'],['kilogram','mass'],['second','time'],['liter','volume'],['degree','temperature'],['watt','power']]},
  {n:'degree (mild to extreme)',sym:0,grp:'syn',p:[['warm','hot'],['cool','freezing'],['tired','exhausted'],['happy','ecstatic'],['angry','furious'],['damp','soaked'],['hungry','starving'],['loud','deafening']]}
 ]
};
const CATS = {
 ar:[
  ['فواكه',['تفاح','موز','برتقال','عنب','مانجو','رمان','خوخ','كمثرى'],'خضار'],
  ['خضار',['جزر','خيار','بصل','بطاطس','كوسا','خس','ملفوف','فجل'],'فواكه'],
  ['مدن سعودية',['المدينة المنورة','جدة','الدمام','أبها','تبوك','الطائف','بريدة','حائل'],'عواصم عربية'],
  ['عواصم عربية',['القاهرة','عمّان','بغداد','الرباط','دمشق','بيروت','الدوحة','مسقط'],'مدن سعودية'],
  ['طيور',['صقر','حمامة','نسر','عصفور','بومة','هدهد','ببغاء'],'حيوانات برية'],
  ['حيوانات برية',['أسد','نمر','فهد','ذئب','غزال','ثعلب','ضبع'],'طيور'],
  ['معادن',['ذهب','فضة','نحاس','حديد','ألمنيوم','زنك'],'أحجار كريمة'],
  ['أحجار كريمة',['ياقوت','زمرد','ماس','فيروز','عقيق'],'معادن'],
  ['مشاعر مبهجة',['فرح','سرور','بهجة','سعادة','ابتهاج'],'مشاعر مؤلمة'],
  ['مشاعر مؤلمة',['حزن','غضب','خوف','قلق','أسى'],'مشاعر مبهجة'],
  ['أفعال حركة',['مشى','ركض','قفز','سبح','زحف','هرول'],'أفعال كلام'],
  ['أفعال كلام',['قال','تحدث','همس','صرخ','نادى','خطب'],'أفعال حركة'],
  ['شهور هجرية',['محرم','صفر','رجب','شعبان','رمضان','شوال'],'شهور ميلادية'],
  ['شهور ميلادية',['يناير','مارس','أبريل','يونيو','أغسطس','أكتوبر'],'شهور هجرية'],
  ['أدوات مطبخ',['ملعقة','شوكة','سكين','قدر','مغرفة','مقلاة'],'أدوات مدرسية'],
  ['أدوات مدرسية',['قلم','مسطرة','ممحاة','دفتر','براية','فرجار'],'أدوات مطبخ'],
  ['أعضاء داخلية',['قلب','رئة','كبد','كلية','معدة'],'حواس'],
  ['حواس',['سمع','بصر','شم','ذوق','لمس'],'أعضاء داخلية'],
  ['كواكب',['عطارد','المريخ','المشتري','زحل','نبتون','أورانوس'],'نجوم وأجرام'],
  ['نجوم وأجرام',['الشمس','سهيل','الثريا','الشعرى'],'كواكب']
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
  ['pleasant feelings',['joy','delight','happiness','cheer','elation'],'painful feelings'],
  ['painful feelings',['sorrow','anger','fear','anxiety','grief'],'pleasant feelings'],
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
function genAnalogy(lang){ return genUnique(()=>_genAnalogy(lang)); }
function genOdd(lang){ return genUnique(()=>_genOdd(lang)); }
function _genAnalogy(lang){
  const rels=REL[lang]; const R0=pick(rels); const pairs=shuffle(R0.p);
  const stem=pairs[0], right=pairs[1];
  const others=shuffle(rels.filter(r=>r!==R0&&!(R0.grp&&r.grp===R0.grp)));
  const d=[pick(others[0].p),pick(others[1].p)];
  let third, reversed=false;
  if(!R0.sym && pairs[2]){ third=[pairs[2][1],pairs[2][0]]; reversed=true; } else third=pick(others[2].p);
  const f=p=>lang==='ar'?`${p[0]} : ${p[1]}`:`${p[0]} : ${p[1]}`;
  const q=lang==='ar'?f(stem):`${stem[0].toUpperCase()} : ${stem[1].toUpperCase()}`;
  const e= lang==='ar' ? `العلاقة: ${R0.n}.${reversed?` الخيار «${f(third)}» من العلاقة نفسها لكن بترتيب معكوس.`:''}` : `Relationship: ${R0.n}.${reversed?` "${f(third)}" is the same relationship in reverse order.`:''}`;
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
  P21:['تُهدر كميات كبيرة من الطعام في المنازل، غالبًا بسبب شراء ما يزيد عن الحاجة أو إعداد كميات لا تؤكل. ولا تقتصر الخسارة على المال، بل تشمل الماء والطاقة التي استُهلكت في إنتاج ذلك الطعام. ويمكن تقليل الهدر بالتخطيط للمشتريات، وحفظ البقايا جيدًا، ومشاركة الفائض.',[
    ['من أسباب الهدر المذكورة:',['شراء ما يزيد عن الحاجة','ارتفاع الأسعار','قلة المطاعم','ضعف الزراعة'],'نص صريح.'],
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
  P17:['The benefits of exercise are not limited to the body. It increases blood flow to the brain and triggers substances that improve mood and strengthen memory. That is why some students find a short walk before studying helps them focus more than sitting for long stretches.',[
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
    ['"competed" is closest to:',['contested','cooperated','studied','traveled'],'Poets contested one another.']]],
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
 {s:'context',q:'تغرب الشمس في جهة الشرق، فيحل الليل وتظهر النجوم.',o:['تغرب','الشرق','الليل','النجوم'],a:1,e:'تغيب الشمس من الغرب.'},
 {s:'context',q:'كان الطالب متفوقًا في دراسته، فرسب في جميع المواد وحصل على المركز الأول.',o:['متفوقًا','رسب','جميع','الأول'],a:1,e:'الصحيح «نجح».'},
 {s:'context',q:'الكتاب صديق وفيّ، يؤنسك في وحدتك ويخذلك حين تحتاجه.',o:['وفيّ','يؤنسك','وحدتك','يخذلك'],a:3,e:'الصحيح «يعينك».'},
 {s:'context',q:'حرصًا على سلامة الأطفال، تُحفظ الأدوية في أماكن قريبة من متناول أيديهم.',o:['حرصًا','سلامة','تُحفظ','قريبة'],a:3,e:'الصحيح «بعيدة».'},
 {s:'context',q:'بسبب نقص الأكسجين في المرتفعات، يتنفس المتسلقون بسهولة ويسر.',o:['نقص','المرتفعات','يتنفس','بسهولة'],a:3,e:'الصحيح «بصعوبة».'},
 {s:'context',q:'الأمانة من أرذل الصفات التي يتحلى بها المسلم.',o:['الأمانة','أرذل','يتحلى','المسلم'],a:1,e:'الصحيح «أنبل».'},
 {s:'context',q:'يسقط المطر حين تتكثف قطرات الماء في السحب وتخفّ فتهبط إلى الأرض.',o:['يسقط','تتكثف','تخفّ','تهبط'],a:2,e:'الصحيح «تثقل».'},
 {s:'context',q:'يُصنع مقبض القدر من البلاستيك لأنه موصل جيد للحرارة فلا تحترق اليد.',o:['يُصنع','البلاستيك','جيد','للحرارة'],a:2,e:'الصحيح «رديء».'},
 {s:'context',q:'كلما زادت سرعة السيارة قصُرت المسافة اللازمة لإيقافها.',o:['زادت','سرعة','قصُرت','إيقافها'],a:2,e:'الصحيح «طالت».'},
 {s:'context',q:'الشجاع يواجه المخاطر بقلب مرتجف ويُقدم دون تردد.',o:['الشجاع','يواجه','مرتجف','تردد'],a:2,e:'الصحيح «ثابت».'},
 {s:'context',q:'يبعث الربيع في النفس الكآبة بأزهاره الملونة وجوّه المعتدل.',o:['يبعث','الكآبة','الملونة','المعتدل'],a:1,e:'الصحيح «البهجة».'},
 {s:'context',q:'اقتصد في مصروفك حتى تنفق كل ما لديك قبل نهاية الشهر.',o:['اقتصد','مصروفك','تنفق','نهاية'],a:2,e:'الاقتصاد غايته ألا ينفد المال؛ الصحيح «لا تنفق».'},
 {s:'context',q:'تحتفظ الصحراء بحرارتها ليلًا، لذلك تنخفض درجة الحرارة فيها بشدة بعد الغروب.',o:['تحتفظ','ليلًا','تنخفض','الغروب'],a:0,e:'الصحيح «تفقد».'},
 {s:'context',q:'أنصت الطلاب إلى المعلم باهتمام، فلم يفهموا شيئًا من الدرس.',o:['أنصت','باهتمام','فلم','الدرس'],a:2,e:'الصحيح «ففهموا».'},
 {s:'context',q:'النباتات الصحراوية أوراقها عريضة لتقلل فقد الماء بالتبخر.',o:['الصحراوية','عريضة','تقلل','التبخر'],a:1,e:'الصحيح «صغيرة» أو «إبرية».'},
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
 {s:'context',q:'The sun sets in the east, and night falls and the stars appear.',o:['sets','east','night','stars'],a:1,e:'The sun sets in the west.'},
 {s:'context',q:'The student excelled in his studies, so he failed every subject and came first.',o:['excelled','failed','every','first'],a:1,e:'It should be "passed".'},
 {s:'context',q:'A book is a loyal friend that keeps you company when alone and abandons you when you need it.',o:['loyal','company','alone','abandons'],a:3,e:'It should be "supports".'},
 {s:'context',q:'To keep children safe, medicines are stored within easy reach of their hands.',o:['safe','medicines','stored','within'],a:3,e:'It should be "out of reach".'},
 {s:'context',q:'Because oxygen is scarce at high altitudes, climbers breathe easily and comfortably.',o:['scarce','altitudes','breathe','easily'],a:3,e:'It should be "with difficulty".'},
 {s:'context',q:'Honesty is among the lowest qualities a person can have.',o:['Honesty','lowest','qualities','person'],a:1,e:'It should be "noblest".'},
 {s:'context',q:'Rain falls when water droplets in clouds condense and become lighter, so they drop to the ground.',o:['falls','condense','lighter','drop'],a:2,e:'It should be "heavier".'},
 {s:'context',q:'Pot handles are made of plastic because it is a good conductor of heat, so hands do not get burned.',o:['handles','plastic','good','burned'],a:2,e:'It should be "poor".'},
 {s:'context',q:'The faster a car goes, the shorter the distance it needs to stop.',o:['faster','car','shorter','stop'],a:2,e:'It should be "longer".'},
 {s:'context',q:'A brave person faces danger with a trembling heart and moves forward without hesitation.',o:['brave','faces','trembling','hesitation'],a:2,e:'It should be "steady".'},
 {s:'context',q:'Spring fills the soul with gloom through its colorful flowers and mild weather.',o:['fills','gloom','colorful','mild'],a:1,e:'It should be "joy".'},
 {s:'context',q:'Be thrifty with your allowance so that you spend everything before the month ends.',o:['thrifty','allowance','spend','ends'],a:2,e:'Thrift aims to avoid running out; it should be "don\'t spend".'},
 {s:'context',q:'The desert keeps its heat at night, so temperatures drop sharply after sunset.',o:['keeps','night','drop','sunset'],a:0,e:'It should be "loses".'},
 {s:'context',q:'The students listened to the teacher attentively, so they understood nothing of the lesson.',o:['listened','attentively','nothing','lesson'],a:2,e:'It should be "everything".'},
 {s:'context',q:'Desert plants have broad leaves to reduce water loss through evaporation.',o:['Desert','broad','reduce','evaporation'],a:1,e:'It should be "small" or "needle-like".'},
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
function genProverb(lang){ return genUnique(()=>_genProverb(lang)); }
function _genProverb(lang){
  const L0=PROVERBS[lang]; const p=pick(L0); const others=shuffle(L0.filter(x=>x[1]!==p[1])).slice(0,3).map(x=>x[1]);
  return {s:'completion',q:p[0],o:[p[1],...others],a:0,e:lang==='ar'?'مثل أو قول مأثور بصيغة ثابتة.':'A fixed saying.',gen:1};
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
 Qx('geometry','مستطيل النسبة بين طوله وعرضه 5 : 3 ومحيطه 64 سم. ما طوله؟','A rectangle\'s length to width ratio is 5 : 3 and its perimeter is 64 cm. What is its length?',['20','12','24','16'],'⟦2(5ك + 3ك) = 64 → ك = 4 → 5 × 4 = 20⟧','⟦2(5k + 3k) = 64 → k = 4 → 5 × 4 = 20⟧'),
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
 Qx('arith','أيّ الأعداد الآتية أكبر؟','Which of these is largest?',['⟦0.7⟧','⟦2/3⟧','⟦5/8⟧','⟦13/20⟧'],'⟦2/3 ≈ 0.667 ، 5/8 = 0.625 ، 13/20 = 0.65⟧ وكلها أصغر من ⟦0.7⟧','⟦2/3 ≈ 0.667, 5/8 = 0.625, 13/20 = 0.65⟧, all less than ⟦0.7⟧'),
 Qx('algebra','إذا كان ⟦أ = −2⟧ فما قيمة ⟦أ^3 − أ⟧؟','If ⟦a = −2⟧, what is ⟦a^3 − a⟧?',['−6','−10','6','−8'],'⟦−8 − (−2) = −6⟧','⟦−8 − (−2) = −6⟧'),
 Qx('arith','قرأ أحمد 30% من كتاب عدد صفحاته 250. كم صفحة بقيت؟','Ahmed read 30% of a 250-page book. How many pages are left?',['175','75','150','220'],'المتبقي ⟦70% × 250 = 175⟧','Remaining ⟦70% × 250 = 175⟧'),
 Qx('stats','ما المنوال للقيم: ⟦3، 7، 7، 2، 9، 7، 3⟧؟','What is the mode of: ⟦3, 7, 7, 2, 9, 7, 3⟧?',['7','3','5','9'],'العدد 7 تكرر ثلاث مرات، وهو الأكثر تكرارًا.','7 appears three times, more than any other value.'),
 Qx('stats','ما الوسيط للقيم: ⟦4، 9، 1، 7، 3، 8⟧؟','What is the median of: ⟦4, 9, 1, 7, 3, 8⟧?',['5.5','4','7','5.3'],'بعد الترتيب ⟦1، 3، 4، 7، 8، 9⟧ والعدد زوجي: ⟦(4 + 7) ÷ 2 = 5.5⟧','Sorted ⟦1, 3, 4, 7, 8, 9⟧, an even count: ⟦(4 + 7) ÷ 2 = 5.5⟧'),
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
 Qx('geometry','دائرة محيطها ⟦12π⟧ سم. ما مساحتها؟','A circle has a circumference of ⟦12π⟧ cm. What is its area?',['⟦36π⟧','⟦144π⟧','⟦12π⟧','⟦6π⟧'],'⟦2πنق = 12π → نق = 6 → π × 6^2 = 36π⟧','⟦2πr = 12π → r = 6 → π × 6^2 = 36π⟧'),
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
    return {s:'arith',q:bi(`إذا كان ${p}% من عدد يساوي ${Y}، فما العدد؟`,`If ${p}% of a number is ${Y}, what is the number?`),o:mkOpts(X,[Y*p/100,Y+p,X/2,X+Y]),e:bi(`⟦${Y} ÷ ${p/100} = ${X}⟧`,`⟦${Y} ÷ ${p/100} = ${X}⟧`)}; },
  workers(){ let w,d,tot,w2; do{ w=pick([4,5,6,8,10,12]); d=pick([3,4,5,6,8,9,10,12]); tot=w*d; w2=pick([2,3,4,5,6,8,10,12,15,20].filter(x=>x!==w&&tot%x===0)); }while(!w2); const ans=tot/w2;
    const WK=['عامل واحد','عاملان','عمال','عاملًا'], DY=['يوم واحد','يومين','أيام','يومًا'];
    return {s:'arith',q:bi(`ينجز ${arC(w,WK)} عملًا في ${arC(d,DY)}. في كم يومًا ينجزه ${arC(w2,WK)} بالمعدل نفسه؟`,`${w} workers finish a job in ${d} days. How many days would ${w2} workers take at the same rate?`),o:mkOpts(ans,[d*w2/w,d+w-w2,d,ans*2]),e:bi(`تناسب عكسي: ⟦${w} × ${d} = ${tot} ، ${tot} ÷ ${w2} = ${ans}⟧`,`Inverse proportion: ⟦${w} × ${d} = ${tot}, ${tot} ÷ ${w2} = ${ans}⟧`)}; },
  system(){ const x=R(2,15), y=R(1,x-1); const S=x+y, D=x-y;
    return {s:'algebra',q:bi(`إذا كان ⟦س + ص = ${S}⟧ و ⟦س − ص = ${D}⟧ فما قيمة ص؟`,`If ⟦x + y = ${S}⟧ and ⟦x − y = ${D}⟧, what is y?`),o:mkOpts(y,[x,S-D,y+1,D]),e:bi(`بالطرح: ⟦2ص = ${S} − ${D} = ${2*y} → ص = ${y}⟧`,`Subtract: ⟦2y = ${S} − ${D} = ${2*y} → y = ${y}⟧`)}; },
  consecutive(){ const n=pick([3,5]); const a=R(3,40); const sum=n*a+(n*(n-1))/2; const big=a+n-1;
    return {s:'algebra',q:bi(`مجموع ${n===3?'ثلاثة':'خمسة'} أعداد صحيحة متتالية ${sum}. ما أكبرها؟`,`The sum of ${n} consecutive integers is ${sum}. What is the largest?`),o:mkOpts(big,[a,sum/n,big+1,big-1]),e:bi(`الأوسط ⟦${sum} ÷ ${n} = ${sum/n}⟧، والأكبر ⟦${big}⟧`,`Middle ⟦= ${sum} ÷ ${n} = ${sum/n}⟧, largest ⟦= ${big}⟧`)}; },
  powerEq(){ const b=pick([2,3,4,5]); const x=R(2,b===2?7:4); const v=b**x;
    return {s:'algebra',q:bi(`إذا كان ⟦${b}^س = ${v}⟧ فما قيمة س؟`,`If ⟦${b}^x = ${v}⟧, what is x?`),o:mkOpts(x,[v/b,x+1,x-1,v/2]),e:bi(`⟦${b}^${x} = ${v}⟧`,`⟦${b}^${x} = ${v}⟧`)}; },
  slope(){ const x1=R(-3,4), y1=R(-4,6), m=pick([-3,-2,-1,1,2,3,4]), dx=R(1,4); const x2=x1+dx, y2=y1+m*dx;
    return {s:'algebra',q:bi(`ما ميل المستقيم المار بالنقطتين ⟦(${N(x1)}، ${N(y1)})⟧ و ⟦(${N(x2)}، ${N(y2)})⟧؟`,`What is the slope of the line through ⟦(${N(x1)}, ${N(y1)})⟧ and ⟦(${N(x2)}, ${N(y2)})⟧?`),o:mkOpts(m,[-m,m+1,dx,m*dx],N,true),e:bi(`⟦(${N(y2)} − ${N(y1)}) ÷ (${N(x2)} − ${N(x1)}) = ${N(m)}⟧`,`⟦(${N(y2)} − ${N(y1)}) ÷ (${N(x2)} − ${N(x1)}) = ${N(m)}⟧`)}; },
  polygon(){ const n=pick([5,6,8,9,10,12]); const sum=(n-2)*180; const names={5:['الخماسي','pentagon'],6:['السداسي','hexagon'],8:['الثماني','octagon'],9:['التساعي','nonagon'],10:['العشاري','decagon'],12:['الاثني عشري','dodecagon']}[n];
    if(rnd()<.5) return {s:'geometry',q:bi(`ما مجموع قياسات الزوايا الداخلية للمضلع ${names[0]}؟`,`What is the sum of the interior angles of a ${names[1]}?`),o:mkOpts(sum,[n*180,sum+180,sum-180,360],x=>N(x)+'°'),e:bi(`⟦(${n} − 2) × 180 = ${sum}⟧`,`⟦(${n} − 2) × 180 = ${sum}⟧`)};
    const each=sum/n; return {s:'geometry',q:bi(`ما قياس الزاوية الداخلية في ${names[0]} المنتظم؟`,`What is each interior angle of a regular ${names[1]}?`),o:mkOpts(each,[360/n,180-each+ (each===90?10:0),each+15,each-12],x=>N(x)+'°'),e:bi(`⟦(${n} − 2) × 180 ÷ ${n} = ${each}⟧`,`⟦(${n} − 2) × 180 ÷ ${n} = ${each}⟧`)}; },
  cube(){ const a=R(2,9); const v=a**3, sa=6*a*a;
    if(rnd()<.5) return {s:'geometry',q:bi(`مكعب طول حرفه ${a} سم. ما حجمه بالسنتيمتر المكعب؟`,`A cube has an edge of ${a} cm. What is its volume in cm³?`),o:mkOpts(v,[sa,a*a,3*a,v+a]),e:bi(`⟦${a}^3 = ${v}⟧`,`⟦${a}^3 = ${v}⟧`)};
    return {s:'geometry',q:bi(`مكعب طول حرفه ${a} سم. ما مساحته الكلية بالسنتيمتر المربع؟`,`A cube has an edge of ${a} cm. What is its total surface area in cm²?`),o:mkOpts(sa,[v,4*a*a,a*a,12*a]),e:bi(`⟦6 × ${a}^2 = ${sa}⟧`,`⟦6 × ${a}^2 = ${sa}⟧`)}; },
  clock(){ const h=R(1,11); let ang=30*h; if(ang>180) ang=360-ang;
    return {s:'geometry',q:bi(`ما قياس الزاوية الصغرى بين عقربي الساعة عند الساعة ${h}:00؟`,`What is the smaller angle between the clock hands at ${h}:00?`),o:mkOpts(ang,[360-ang,ang+30,ang-30,6*h],x=>N(x)+'°'),e:bi(`كل ساعة ⟦30°⟧ ، ⟦${h} × 30 = ${30*h}⟧${30*h>180?` ، والصغرى ⟦360 − ${30*h} = ${ang}⟧`:''}`,`Each hour is ⟦30°⟧, ⟦${h} × 30 = ${30*h}⟧${30*h>180?`; smaller angle ⟦= 360 − ${30*h} = ${ang}⟧`:''}`)}; },
  prob(){ const r=R(1,7), b=R(1,9); const t=r+b, g=gcd(r,t); const ans=`${r/g}/${t/g}`;
    const f=(n,d)=>{const g=gcd(n,d);return `${n/g}/${d/g}`;}; const o=[ans]; [f(b,t),f(r,b),f(1,t),f(r,t+1)].forEach(c=>{ if(!o.includes(c)&&o.length<4) o.push(c); }); while(o.length<4) o.push(`${o.length}/${t+o.length}`);
    return {s:'stats',q:bi(`صندوق فيه ${arC(r,['كرة حمراء واحدة','كرتان حمراوان','كرات حمراء','كرة حمراء'])} و ${arC(b,['كرة زرقاء واحدة','كرتان زرقاوان','كرات زرقاء','كرة زرقاء'])}. ما احتمال سحب كرة حمراء عشوائيًا؟`,`A box has ${r} red and ${b} blue ${b===1?'ball':'balls'}. What is the probability of drawing a red ball at random?`),o:o.map(x=>`⟦${x}⟧`),e:bi(`⟦${r} ÷ ${t} = ${ans}⟧`,`⟦${r} ÷ ${t} = ${ans}⟧`)}; },
  weightedAvg(){ let n1,n2,a1,a2,tot; do{ n1=R(3,8); n2=R(3,8); a1=10*R(5,8); a2=a1+pick([5,10,15]); tot=n1*a1+n2*a2; }while(tot%(n1+n2)); const ans=tot/(n1+n2);
    return {s:'stats',q:bi(`${n1} طلاب متوسط درجاتهم ${a1}، و ${n2} طلاب متوسطهم ${a2}. ما متوسط درجات الجميع؟`,`${n1} students averaged ${a1} and ${n2} students averaged ${a2}. What is the overall average?`),o:mkOpts(ans,[(a1+a2)/2,ans+2,ans-2,a2]),e:bi(`⟦(${n1*a1} + ${n2*a2}) ÷ ${n1+n2} = ${ans}⟧`,`⟦(${n1*a1} + ${n2*a2}) ÷ ${n1+n2} = ${ans}⟧`)}; },
  lcm(){ const pairs=[[4,6],[6,8],[6,9],[8,12],[9,12],[10,15],[12,18],[4,10],[6,10],[15,20]]; const [a,b]=pick(pairs); const l=a*b/gcd(a,b); const SEC=['ثانية','ثانيتين','ثوانٍ','ثانية'];
    return {s:'arith',q:bi(`تضيء إشارة كل ${arC(a,SEC)} وأخرى كل ${arC(b,SEC)}. إذا أضاءتا معًا الآن، فبعد كم ثانية تضيئان معًا مرة أخرى؟`,`One light flashes every ${a} seconds and another every ${b} seconds. If they flash together now, after how many seconds will they flash together again?`),o:mkOpts(l,[a*b,a+b,gcd(a,b),l*2]),e:bi(`المضاعف المشترك الأصغر لـ ${a} و ${b} هو ⟦${l}⟧`,`The least common multiple of ${a} and ${b} is ⟦${l}⟧`)}; },
  sqrtSimp(){ const a=pick([2,3,4,5,6]); let b=pick([2,3,5,6,7]); while(b===a) b=pick([2,3,5,6,7]); const n=a*a*b;
    const o=[`${a}√${b}`,`${b}√${a}`,`${a*a}√${b}`,`${a}√${b*2}`];
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
      ['القيمة الأولى: ⟦(س + 1)^2⟧<br>القيمة الثانية: ⟦س^2 + 2س + 1⟧','Quantity A: ⟦(x + 1)^2⟧<br>Quantity B: ⟦x^2 + 2x + 1⟧',2,'مفكوك مربع مجموع.','The expansion of a squared sum.']];
    const t=pick(T); return {s:'comparison',cmp:1,q:bi(t[0],t[1]),a:t[2],e:bi(t[3],t[4])}; }
});
GEN_BY_SKILL.arith.push('percentOf','workers','lcm');
GEN_BY_SKILL.algebra.push('system','consecutive','powerEq','slope','sqrtSimp');
GEN_BY_SKILL.geometry.push('polygon','cube','clock');
GEN_BY_SKILL.stats.push('prob','weightedAvg');
GEN_BY_SKILL.comparison.push('compareVar','compare');
/* wrap every quant generator with the de-duplicating retry (see genUnique in gen.js) */
Object.keys(GENS).forEach(k=>{ const f=GENS[k]; GENS[k]=()=>genUnique(f); });
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
  ar:{concept:['الحساب أكبر أجزاء الكمي وزنًا (نحو ٤٠٪ في العلمي). يشمل: العمليات، الكسور والأعداد العشرية، النسب المئوية، النسبة والتناسب، السرعة والزمن، العمل المشترك، الأعداد الأولية والقواسم والمضاعفات.','لا آلة حاسبة؛ لذلك السرعة الذهنية وحفظ المكافئات الشائعة يحسمان الوقت.'],
   mind:'المشتتات تُبنى من أخطاء متوقعة: القسمة على القيمة الجديدة بدل القديمة، جمع نسبتين متتاليتين، نسيان أن المطلوب «المتبقي» لا «المقروء».',
   steps:['حدد المطلوب بالضبط وضع تحته خطًا ذهنيًا.','حوّل النسب إلى كسور بسيطة: ٢٥٪ = ¼ ، ٢٠٪ = ⅕.','في التناسب الطردي اضرب تبادليًا، وفي العكسي حاصل الضرب ثابت.','قرّب الأرقام لتستبعد الخيارات البعيدة قبل الحساب الدقيق.','جرّب الخيارات في المعادلة إن كانت أسرع.'],
   types:[['نسب مئوية','٤٠٪ من عدد = ٢٤'],['خصم وزيادة','زيادة ١٠٪ ثم نقص ١٠٪'],['تناسب طردي','٣ أقلام بـ ١٢، فكم ٧؟'],['تناسب عكسي','١٥ عاملًا في ٨ أيام'],['سرعة ومسافة','٢٤٠ كم في ٣ ساعات'],['مضاعف مشترك','إشارتان تضيئان معًا'],['كسور','¼ + ⅔']],
   rules:['⟦½ = 0.5 ، ¼ = 0.25 ، ⅕ = 0.2 ، ⅛ = 0.125 ، ⅓ ≈ 0.333⟧','⟦الجزء = النسبة × الكل ÷ 100⟧','⟦الكل = الجزء ÷ النسبة⟧','⟦نسبة التغير = الفرق ÷ القديم × 100⟧','⟦السعر بعد خصم د% = السعر × (1 − د/100)⟧','⟦المسافة = السرعة × الزمن⟧','⟦1/ن = 1/ن₁ + 1/ن₂⟧ (العمل المشترك)','⟦أ% من ب = ب% من أ⟧'],
   traps:['نسبة التغير من القيمة القديمة.','خصمان متتاليان لا يُجمعان: ٢٠٪ ثم ٢٠٪ = ٣٦٪.','انتبه للوحدات: دقائق وساعات.'],
   examples:[{q:'ارتفع سعر ١٠٪ ثم انخفض ١٠٪. ما التغير الكلي؟',a:'نقص ١٪',why:'⟦1.1 × 0.9 = 0.99⟧'},{q:'٤٠٪ من عدد يساوي ٢٤. ما العدد؟',a:'٦٠',why:'⟦24 ÷ 0.4 = 60⟧'},{q:'١٥ عاملًا في ٨ أيام، فكم يومًا لـ ١٠ عمال؟',a:'١٢',why:'⟦15 × 8 ÷ 10 = 12⟧'}],
   speed:['تمرين يومي ١٠ دقائق: جداول الضرب حتى ١٥، والمربعات حتى ٢٠، والمكعبات حتى ١٠.','حفظ مكافئات الكسور يوفر ١٥ ثانية في كل سؤال نسب.','هدفك ٦٠ ثانية.'],
   res:[['yt','شرح الحساب قدرات كمي تأسيس'],['yt','النسب المئوية قدرات كمي'],['yt','التناسب الطردي والعكسي قدرات'],['url','Khan Academy: Arithmetic',KA.arith],['url','Khan Academy: Pre-algebra',KA.pre]]},
  en:{concept:['Arithmetic is the largest share of quant (around 40% on the science track): operations, fractions and decimals, percentages, ratio and proportion, speed and time, combined work, primes, factors and multiples.','No calculator is allowed, so mental speed and memorized equivalents decide your time.'],
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
  ar:{concept:['الهندسة نحو ربع الكمي في المسار العلمي: الزوايا، المثلثات وفيثاغورس، المضلعات، المحيطات والمساحات، الدائرة، المجسمات البسيطة، وزاوية الساعة.','معظم أسئلتها تعتمد على عشرة قوانين فقط. من يحفظها ويطبقها بسرعة يحسم القسم.'],
   mind:'المشتت الأشهر: إعطاء المساحة بدل المحيط، أو المساحة الكلية بدل الحجم، أو استخدام القطر بدل نصف القطر.',
   steps:['ارسم الشكل ولو كان مرسومًا، وضع عليه كل المعطيات.','اكتب القانون قبل التعويض.','ابحث عن مثلث قائم مخفي؛ أكثر الأسئلة تُحل به.','تحقق من الوحدة المطلوبة (سم أم سم²).'],
   types:[['زوايا المثلث','مجموعها ١٨٠°'],['فيثاغورس','(٣، ٤، ٥)'],['مضلعات','مجموع الزوايا ⟦(ن − 2) × 180⟧'],['مساحات ومحيطات','مستطيل، مربع، مثلث'],['دائرة','⟦πنق^2⟧ و ⟦2πنق⟧'],['مجسمات','حجم المكعب ومساحته'],['الساعة','كل ساعة ٣٠°']],
   rules:['⟦مساحة المثلث = ½ × القاعدة × الارتفاع⟧','⟦الوتر^2 = أ^2 + ب^2⟧','ثلاثيات: ⟦(3،4،5) (5،12،13) (8،15،17) (7،24،25)⟧','⟦مجموع زوايا المضلع = (ن − 2) × 180⟧','⟦محيط الدائرة = 2πنق ، مساحتها = πنق^2⟧','⟦حجم المكعب = ل^3 ، مساحته الكلية = 6ل^2⟧','⟦حجم متوازي المستطيلات = ط × ع × ارتفاع⟧','المثلث ⟦30-60-90⟧: الأضلاع ⟦1 : √3 : 2⟧','المثلث ⟦45-45-90⟧: الأضلاع ⟦1 : 1 : √2⟧'],
   traps:['القطر = ٢ × نصف القطر.','الرسم ليس بمقياس دقيق؛ لا تقِس بالعين.','زاوية الساعة الصغرى لا تتجاوز ١٨٠°.'],
   examples:[{q:'مكعب حرفه ٤ سم، ما حجمه؟',a:'٦٤',why:'٩٦ هي المساحة الكلية.'},{q:'الزاوية الداخلية للسداسي المنتظم',a:'١٢٠°',why:'⟦720 ÷ 6⟧'},{q:'ضلعا قائمة ١٢ و ١٦، الوتر؟',a:'٢٠',why:'مضاعف (٣، ٤، ٥).'}],
   speed:['احفظ ثلاثيات فيثاغورس ومضاعفاتها؛ توفر الجذر كاملًا.','هدفك ٧٠ ثانية.'],
   res:[['yt','شرح الهندسة قدرات كمي'],['yt','فيثاغورس قدرات'],['yt','زوايا المضلعات قدرات'],['url','Khan Academy: Geometry',KA.geometry]]},
  en:{concept:['Geometry is about a quarter of science-track quant: angles, triangles and Pythagoras, polygons, perimeter and area, circles, simple solids and clock angles.','Most questions rely on about ten rules. Knowing them cold settles the section.'],
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
 FC('e7','geometry','clock','زاوية الساعة','كل ساعة = ٣٠° وكل دقيقة لعقرب الدقائق = ٦°. الزاوية الصغرى لا تتجاوز ١٨٠°.','٣:٠٠ ← ٩٠° ، ٨:٠٠ ← ١٢٠°','Clock angles','Each hour = 30°, each minute on the minute hand = 6°. The smaller angle is at most 180°.','3:00 → 90°, 8:00 → 120°'),
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
 FC('x4','context','context','الحقائق العلمية','قد يكون الخطأ حقيقة معكوسة: الغليان، التجمد، الغروب، الأكسجين.','تغيب الشمس من الشرق ← الغرب','Scientific facts','The error may be a reversed fact: boiling, freezing, sunset, oxygen.','The sun sets in the east → west'),
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
 {sk:'analogy',t:{ar:'الخيار المعكوس',en:'The reversed choice'},how:{ar:'أحد الخيارات يحمل العلاقة نفسها بترتيب عكسي.',en:'One choice has the same relationship in reverse order.'},trick:{ar:'اقرأ جملة العلاقة من اليمين إلى اليسار في كل خيار.',en:'Read your relationship sentence in the same direction for every choice.'},ex:{ar:'إهمال : فشل ✓ ، نجاح : اجتهاد ✗',en:'negligence : failure ✓, success : effort ✗'}},
 {sk:'completion',t:{ar:'أداة تضاد في أول الجملة',en:'A contrast word at the start'},how:{ar:'جملة تبدأ بـ «رغم» أو «على الرغم من».',en:'A sentence opening with "although" or "despite".'},trick:{ar:'الفراغ يحمل عكس معنى الجزء الثاني.',en:'The blank carries the opposite of the second half.'},ex:{ar:'رغم ... الإمكانات، حقق نتائج مبهرة ← محدودية',en:'Despite ___ resources, great results → limited'}},
 {sk:'context',t:{ar:'الخطأ في أداة الربط',en:'The error is the linking word'},how:{ar:'كل الكلمات منطقية لكن الربط بينها معكوس.',en:'Every word makes sense but the link between clauses is reversed.'},trick:{ar:'اسأل: هل الجزء الثاني نتيجة أم استدراك؟',en:'Ask: is the second part a result or a contrast?'},ex:{ar:'أدرك الحافلة لكنه وصل مبكرًا ← «لكنه»',en:'caught the bus, but arrived early → "but"'}},
 {sk:'odd',t:{ar:'هجري أم ميلادي',en:'Hijri or Gregorian'},how:{ar:'أسماء شهور من التقويمين.',en:'Month names from both calendars.'},trick:{ar:'احفظ الشهور الهجرية الاثني عشر بالترتيب.',en:'Learn the twelve Hijri months in order.'},ex:{ar:'محرم، صفر، رجب، مارس ← مارس',en:'Muharram, Safar, Rajab, March → March'}},
 {sk:'reading',t:{ar:'«ليس من ... المذكورة»',en:'"Which is NOT mentioned"'},how:{ar:'ثلاثة خيارات في النص وخيار واحد خارجه.',en:'Three choices appear in the passage and one does not.'},trick:{ar:'اشطب كل خيار تجده في النص؛ الباقي هو الجواب.',en:'Cross out each choice you find in the passage; the leftover is the answer.'},ex:{ar:'أصناف التمور المذكورة ← البرحي غير مذكور',en:'Date varieties mentioned → Barhi is not'}},
 {sk:'reading',t:{ar:'العنوان المناسب',en:'The best title'},how:{ar:'يُطلب أنسب عنوان للنص.',en:'Pick the best title for the passage.'},trick:{ar:'العنوان الصحيح يغطي أول النص وآخره، لا فقرة واحدة.',en:'The right title covers the beginning and end, not one part.'},ex:{ar:'«الطاقة الشمسية: فرص وتحديات»',en:'"Solar power: opportunities and challenges"'}}
];
/* ============ UI strings ============ */
const T = {
 ar:{
  cloudT:'حسابك (حفظ سحابي)', cloudOn:'مسجّل بـ', cloudOff:'سجّل ببريدك ليُحفظ تقدمك في السحابة ويتبعك على أي جهاز.', acctManage:'إدارة الحساب', acctJoin:'سجّل أو ادخل', cloudSaving:'جارٍ الحفظ في السحابة...', cloudErr:'تعذّر الحفظ في السحابة. سيُعاد المحاولة تلقائيًا.', cloudSynced:'آخر مزامنة:',
  acctTitle:'حسابك', acctJoinT:'احفظ تقدمك في السحابة', acctWhy:'اسمك وبريدك وكلمة مرور فقط. يُحفظ تقدمك ويتبعك على أي جهاز تدخل منه.', fullName:'اسم الطالب أو الطالبة', namePh:'مثال: سارة أحمد', nameT:'الاسم', nameEdit:'تعديل الاسم', nameSave:'احفظ الاسم', nameSaved:'حُفظ الاسم.', nameMissing:'أضف اسمك ليظهر في أعلى الصفحة.', hello:'أهلًا', signUp:'تسجيل جديد', signIn:'دخول', email:'البريد الإلكتروني', password:'كلمة المرور (٨ أحرف على الأقل)', consent:'أوافق على حفظ اسمي وبريدي ومساري وهدفي وتقدمي في التدريب لغرض متابعة تحضيري فقط.', needConsent:'يلزم الموافقة على حفظ البيانات لإكمال التسجيل.', withGoogle:'المتابعة بحساب Google', forgot:'نسيت كلمة المرور؟', resetSent:'أرسلنا رابط إعادة التعيين إلى بريدك.', syncNow:'مزامنة الآن', chPw:'تغيير كلمة المرور', curPw:'كلمة المرور الحالية', newPw:'كلمة المرور الجديدة (٨ أحرف على الأقل)', chPwBtn:'غيّر كلمة المرور', pwChanged:'تم تغيير كلمة المرور.', signOut:'تسجيل الخروج', verifyHint:'أرسلنا رابط تأكيد إلى بريدك. التأكيد اختياري لكنه يساعدك على استعادة الحساب.', delAcct:'حذف حسابي وبياناتي', delConfirm:'سيُحذف حسابك وكل بياناتك من السحابة نهائيًا. يبقى تقدمك على هذا الجهاز فقط.', delYes:'نعم، احذف', deleted:'حُذف الحساب والبيانات.',
  privT:'ما البيانات التي نحفظها؟', privD:'نحفظ فقط: اسمك، بريدك الإلكتروني، مسارك (علمي/نظري)، درجتك المستهدفة، موعد اختبارك إن أدخلته، وتقدمك في التدريب. لا نطلب رقم جوال ولا هوية. يمكنك حذف حسابك وكل بياناتك في أي وقت من هذه النافذة.',
  authErr:{'email-already-in-use':'هذا البريد مسجّل مسبقًا. اختر «دخول».','invalid-email':'البريد الإلكتروني غير صحيح.','invalid-name':'اكتب اسمك (حرفان على الأقل، و٦٠ حرفًا بحد أقصى).','weak-password':'كلمة المرور قصيرة؛ استخدم ٨ أحرف على الأقل.','invalid-credential':'البريد أو كلمة المرور غير صحيحة.','wrong-password':'البريد أو كلمة المرور غير صحيحة.','user-not-found':'لا يوجد حساب بهذا البريد. اختر «تسجيل جديد».','too-many-requests':'محاولات كثيرة. انتظر قليلًا ثم حاول.','network-request-failed':'لا يوجد اتصال بالإنترنت.','requires-recent-login':'لحذف الحساب سجّل الخروج ثم ادخل من جديد وكرر الحذف.','popup-closed-by-user':'أُغلقت نافذة Google قبل الإكمال.','operation-not-allowed':'طريقة الدخول هذه غير مفعّلة بعد.','reset-admin':'لإعادة تعيين كلمة المرور تواصل مع مشرف الموقع، وسيعطيك كلمة مرور مؤقتة تغيّرها بعد الدخول.',consent:'يلزم الموافقة على حفظ البيانات لإكمال التسجيل.',unauthenticated:'انتهت الجلسة. ادخل من جديد.',server:'تعذّر الاتصال بالخادم. حاول بعد قليل.',other:'حدث خطأ غير متوقع. حاول مرة أخرى.'},
  reviewBtn:'مراجعة', reviewOf:'مراجعة اختبار', retake:'أعد الحل', reviewHint:'اضغط على أي اختبار مكتمل لمراجعة إجاباتك وأخطائك. تُحفظ تفاصيل آخر ٢٠ اختبارًا وآخر محاولة لكل نموذج على هذا الجهاز.', noDetail:'تفاصيل هذا الاختبار غير متاحة؛ ربما أُجري قبل هذا التحديث أو على جهاز آخر.',
  restartT:'ابدأ الخطة من جديد', restartD:'تعود الخطة إلى الأسبوع الأول ابتداءً من اليوم وتُلغى علامات إنجاز المهام. يبقى مستواك ونتائجك ودفتر أخطائك كما هي.', restartBtn:'ابدأ الخطة من جديد', restartConfirm:'ستبدأ الخطة من الأسبوع الأول اليوم. هل تريد المتابعة؟', restartDone:'بدأت خطتك من جديد',
  resetPick:'اختر ما تريد مسحه:', resetWarn:'لا يمكن التراجع عن المسح. احفظ ملف التقدم أولًا إن أردت نسخة.', resetDone:'تم المسح',
  resetParts:{plan:['الخطة ومهامها','تبدأ الخطة من الأسبوع الأول اليوم'],mistakes:['دفتر الأخطاء','الأسئلة المحفوظة للمراجعة وأسباب الأخطاء'],models:['النماذج الكاملة','درجات النماذج الثلاثين لتعيد حلها من جديد'],cards:['البطاقات والمفردات والشروحات','تعود كل البطاقات غير محفوظة وتُمسح علامات إتمام الشروحات'],skills:['المستوى والنتائج','خريطة الإتقان، الدرجة التقديرية، سجل المحاولات، والنماذج'],all:['كل التقدم','كل ما سبق؛ يبقى مسارك وهدفك ولغتك']},
  saveTitle:'حفظ بياناتك', saveAuto:'حفظ تلقائي على هذا الجهاز', saveAutoD:'كل إجابة ونتيجة تُحفظ فورًا في متصفحك. تبقى حتى لو أغلقت الصفحة، لكنها تُفقد إذا مسحت بيانات المتصفح أو غيّرت الجهاز.', savedOk:'محفوظ على هذا الجهاز', saveFail:'المتصفح لا يسمح بالحفظ (ربما التصفح الخاص). احفظ ملفًا حتى لا تفقد تقدمك.', lastSaved:'آخر حفظ:', persistOn:'حفظ دائم مفعّل', saveFile:'نسخة احتياطية في ملف', saveFileD:'احفظ ملفًا صغيرًا على جهازك، واسترجعه في أي وقت أو على أي جهاز.', saveFileBtn:'احفظ ملف التقدم', loadFileBtn:'استرجع من ملف', lastExport:'آخر نسخة:', noExport:'لم تحفظ نسخة بعد.', saveCode:'رمز النقل', fileSaved:'تم حفظ الملف', fileFallback:'لم يتوفر الحفظ في ملف هنا؛ انسخ الرمز الظاهر واحتفظ به.', tryAgain:'حاول بعد لحظات', resultSaved:'تم حفظ نتيجتك', nudgeH:'احفظ نسخة من تقدمك', nudgeP:'مضى أسبوع على آخر نسخة احتياطية. ملف صغير يحمي كل ما أنجزته.',
  themeT:'المظهر', modeT:'الوضع', modes:{light:'فاتح',dark:'داكن',auto:'تلقائي'}, accentT:'اللون', accents:{violet:'بنفسجي',pink:'وردي',blue:'أزرق',orange:'برتقالي',ruby:'عنابي',navy:'كحلي'},
  brand:'أكاديمية القدرات', tagline:'التحضير لاختبار القدرات العامة',
  nav:{today:'اليوم',learn:'الحقيبة',practice:'تدرّب',progress:'تقدّمي',guide:'الدليل'},
  switchLang:'English',
  greet:'هدفك ١٠٠', heroLine:'القدرات عشرة أنماط أسئلة محدودة. أتقن كل نمط بدقة ٩٥٪ وبأقل من دقيقة، وأغلق أخطاءك أولًا بأول، وتقترب من الـ ١٠٠ خطوة بعد خطوة.',
  daysLeft:'يومًا على اختبارك', setDate:'حدّد موعد اختبارك', readiness:'الجاهزية للـ ١٠٠', estScore:'الدرجة التقديرية',
  sessionTitle:'جلسة اليوم', sessionSub:'٢٥ سؤالًا مصممة لك · ٣٠ دقيقة تقريبًا', startSession:'ابدأ جلسة اليوم', sessionDone:'أنجزت جلسة اليوم. مراجعة إضافية اختيارية.',
  sessionParts:(d,w,m)=>`${d} مراجعة مستحقة · ${w} لأضعف مهارتين · ${m} مختلطة`,
  diagFirst:'ابدأ بالاختبار التشخيصي', diagFirstSub:'٢٠ سؤالًا من كل الأنواع · ٢٠ دقيقة. يحدد نقطة البداية ويبني جلساتك القادمة.',
  masteryTitle:'خريطة الإتقان', masteryHint:'اضغط أي مهارة لفتح درسها. كل مهارة تصعد أربع درجات حتى «ثبات».',
  levels:['لم تبدأ','تعلّم','كفاءة','إتقان','ثبات'],
  levelRule:['','أقل من ٧٠٪','٧٠٪ فأكثر','٨٥٪ فأكثر بزمن مناسب','٩٥٪ فأكثر في آخر ٢٠ سؤالًا وضمن الزمن المستهدف'],
  roadTitle:'معايير الجاهزية للـ ١٠٠', weekTitle:'مهام الأسبوع', fullPlan:'الخطة كاملة', settings:'الإعدادات',
  ready:[ 'كل المهارات العشر في درجة «ثبات»', '٣ محاكاة كاملة متتالية بدرجة تقديرية ٩٥ فأكثر', 'متوسط زمنك ضمن المستهدف في كل مهارة', 'لا مراجعات مستحقة في دفتر الأخطاء' ],
  learnTitle:'حقيبة القدرات', kitIntro:'كل ما تحتاجه في مكان واحد: بطاقات المفاهيم، الدروس، تكنيكات الحل، الأنماط المتكررة في التجميعات، المفردات، والمصادر.', tabs:{cards:'البطاقات',lessons:'الدروس',tech:'التكنيكات',patterns:'أنماط التجميعات',vocab:'المفردات',resources:'المصادر'},
  deckAll:'كل البطاقات', cardsIntro:'اقرأ الوجه الأول وحاول التذكّر، ثم اقلب البطاقة. «راجعها» تعيدها إليك اليوم، و«أعرفها» تؤجلها أيامًا.', tapFlip:'اضغط للقلب', example:'مثال', allInDeck:'كل بطاقات القسم', deckDone:'أنهيت بطاقات هذا القسم لليوم. ارجع غدًا أو اختر قسمًا آخر.', techIntro:'تكنيكات يستخدمها المتفوقون لرفع الدقة والسرعة. طبّق واحدًا في كل جلسة حتى يصبح عادة.', patIntro:'أنماط أسئلة تتكرر في التجميعات التي يتداولها الطلاب بعد الاختبار. الأمثلة من إعداد المنصة على النمط نفسه.', how:'كيف يأتي', trick:'مفتاح الحل', practicePattern:'تدرّب على هذا النمط', skillCards:'بطاقات هذه المهارة',
  verbal:'القسم اللفظي', quant:'القسم الكمي',
  concept:'المفهوم', mind:'كيف يفكر واضع السؤال', steps:'خطوات الحل', types:'الأنماط مع أمثلة', rules:'القوانين والحقائق', traps:'الفخاخ', examples:'أمثلة محلولة', speed:'للوصول إلى ١٠٠', more:'للاستزادة', mastery:'مستواك في هذه المهارة', targetTime:'الزمن المستهدف',
  practice10:'تدرّب (١٠ أسئلة بتصحيح فوري)', xpTitle:'شروحات التأسيس', xpIntro:'شروحات قصيرة متحركة بصوت معلّم، تبني الفكرة من الصفر، فيها وقفة تجرّب فيها بنفسك وتحدٍّ ختامي.', xpDone:'تم', xpShort:'شروحات', xpN:'شرح', answer:'الإجابة', why:'السبب', lessonsOpen:'افتح الدرس',
  vocabIntro:'بطاقات لمفردات تتكرر في الاختبار. قل المعنى في ذهنك ثم اقلب البطاقة. البطاقات التي لا تعرفها تعود إليك أكثر.', flip:'اقلب البطاقة', know:'أعرفها', again:'راجعها', vocabDone:'أنهيت بطاقات اليوم', known:'متقنة', left:'متبقية',
  resIntro:'مصادر مختارة لكل مهارة. القاعدة: مصدر شرح واحد تنهيه، ثم التدريب هنا حتى تصل إلى «ثبات».',
  practiceTitle:'تدرّب', practiceIntro:'اختر نوع التدريب. التدريب بالتصحيح الفوري للتعلم، والأقسام والمحاكاة بتوقيت الاختبار الحقيقي.',
  pSession:'جلسة اليوم', pSessionD:'تكرار متباعد لأخطائك + تركيز على أضعف مهارتين + أسئلة مختلطة.',
  pReview:'المراجعة المستحقة', pReviewD:'أسئلة أخطأت فيها وحان موعد مراجعتها. كل إجابة صحيحة تؤجلها أكثر حتى تُغلق.',
  pDiag:'الاختبار التشخيصي', pDiagD:'٢٠ سؤالًا · ٢٠ دقيقة.',
  pVerbal:'قسم لفظي', pVerbalD:'٢٤ سؤالًا · ٢٥ دقيقة بتوقيت حقيقي.',
  pQuant:'قسم كمي', pQuantD:'٢٤ سؤالًا · ٢٥ دقيقة بلا آلة حاسبة.',
  pMock:'محاكاة عشوائية', pMockD:'٤ أقسام × ٢٤ سؤالًا × ٢٥ دقيقة بأسئلة جديدة كل مرة.', modelsTitle:'النماذج الكاملة', modelsIntro:'٣٠ نموذجًا ثابتًا بصيغة المحوسب (٤ أقسام × ٢٤ سؤالًا × ٢٥ دقيقة)، مبنية على توزيع الاختبار وأنماط التجميعات. يمكنك إعادة أي نموذج ومقارنة درجتك.', model:'نموذج', best:'أفضل', notTaken:'لم يُحل', modelsDone:'نماذج محلولة',
  bySkillTitle:'تدريب حسب المهارة', start:'ابدأ', questions:'سؤالًا', min:'دقيقة', sec:'ث', q:'سؤال', of:'من',
  due:'مستحقة', noDue:'لا مراجعات مستحقة اليوم',
  sectionLabel:'القسم', finishSection:'إنهاء القسم', finishTest:'إنهاء', prev:'السابق', next:'التالي', check:'تحقق', flag:'علّم للمراجعة', flagged:'معلَّم', map:'خريطة الأسئلة',
  confirmEnd:'لن تستطيع العودة إلى هذا القسم.', yesEnd:'نعم، أنهِ القسم', cancel:'تراجع', unanswered:'بلا إجابة',
  quit:'خروج', quitConfirm:'الخروج يلغي هذه المحاولة دون حفظ.', yesQuit:'نعم، اخرج',
  correctFb:'إجابة صحيحة', wrongFb:'الإجابة الصحيحة', pace:'الوتيرة', paceOk:'ضمن الوقت', paceSlow:'أبطأ من المستهدف',
  resultTitle:'النتيجة', correct:'صحيحة', wrong:'خاطئة', skipped:'متروكة', avgTime:'متوسط الوقت', estGat:'الدرجة التقديرية',
  bySkill:'حسب المهارة', review:'مراجعة الإجابات', onlyWrong:'الأخطاء فقط', all:'الكل', yourAns:'إجابتك', rightAns:'الصحيحة', explain:'الشرح',
  causeQ:'لماذا أخطأت؟ (يحدد علاجك)', causes:{concept:'لم أعرف القاعدة',careless:'تسرّعت',time:'ضاق الوقت',trap:'وقعت في فخ'},
  askAI:'اشرح لي بطريقة أخرى', aiThinking:'يكتب الشرح...', aiErr:'تعذر الحصول على شرح الآن.', done:'تم', passage:'النص',
  progressTitle:'تقدّمي',
  kEst:'الدرجة التقديرية', kReady:'الجاهزية للـ ١٠٠', kSolved:'أسئلة محلولة', kAcc:'الدقة', kTime:'متوسط الوقت', kStreak:'أيام متتالية',
  skillsTitle:'المهارات: الدقة والزمن', trendTitle:'تطور الدرجة التقديرية', recoTitle:'خطوتك التالية', causesTitle:'أسباب أخطائك', historyTitle:'سجل المحاولات',
  noCauses:'صنّف أخطاءك في شاشة النتيجة لتظهر هنا.', causeFix:{concept:'ارجع إلى درس المهارة وقوانينها، ثم تدرب بالتصحيح الفوري.',careless:'اعتمد روتين «اقرأ المطلوب مرتين» وأعد قراءة الخيار قبل اعتماده.',time:'تدرب بأقسام مؤقتة، وتجاوز أي سؤال بعد دقيقتين.',trap:'راجع قسم «الفخاخ» في دروس المهارات التي أخطأت فيها.'},
  gap:'المتبقي للهدف', noHistory:'لا محاولات بعد.', date:'التاريخ', type:'النوع', score:'النتيجة',
  backup:'نقل التقدم إلى جهاز آخر', backupD:'تقدمك محفوظ في هذا المتصفح. انسخ الرمز والصقه في الجهاز الآخر.', copyCode:'انسخ الرمز', importCode:'استيراد', pasteHere:'الصق رمز التقدم هنا', copied:'تم النسخ', imported:'تم الاستيراد', badCode:'الرمز غير صالح.', reset:'مسح التقدم…', resetConfirm:'سيُحذف تقدمك نهائيًا من هذا المتصفح.', yesReset:'نعم، امسح',
  estNote:'التقدير مبني على دقتك الأخيرة ووزن القسمين في مسارك. قياس يستخدم معادلة معيارية غير منشورة، فالرقم للتوجيه.',
  planTitle:'خطتي', planIntro:'الخطة مبنية من موعدك ومسارك. جلسة اليوم يوميًا هي العمود الفقري، والمهام الأسبوعية تبني فوقها.',
  examDate:'موعد الاختبار', track:'المسار', sci:'علمي', lit:'نظري', targetScore:'الهدف', weeks:'مدة الخطة (أسابيع)', save:'احفظ',
  week:'الأسبوع', thisWeek:'هذا الأسبوع', phaseNames:['تأسيس','إتقان','سرعة','محاكاة'],
  phaseDesc:['تعلّم كل نمط والوصول إلى «كفاءة» في المهارات العشر.','رفع كل مهارة إلى «إتقان» وأقسام مؤقتة.','السرعة والثبات: ٩٥٪ ضمن الزمن.','محاكاة كاملة حتى تصبح الـ ١٠٠ مألوفة.'],
  sessionsWeek:(n)=>`جلسة اليوم ٥ مرات هذا الأسبوع (${n}/٥)`,
  guideTitle:'الدليل', sourcesLine:'مصادر المعلومات', verifyNote:'تتغير الصيغ والرسوم وعدد المحاولات أحيانًا. تحقق من موقع هيئة تقويم التعليم والتدريب قبل التسجيل.',
  methodTitle:'كيف تعمل الطريقة', methodIntro:'كل ما في المنصة مبني على مبادئ تعلم ثبتت فعاليتها في أبحاث علم النفس التربوي ويستخدمها المتفوقون في الاختبارات المعيارية.',
  footer:'أكاديمية القدرات منصة مستقلة غير تابعة لهيئة تقويم التعليم والتدريب. الأسئلة من إعداد المنصة على أنماط أسئلة قياس، وليست أسئلة رسمية.',
  none:'لا يوجد', mistakesEmpty:'لا أخطاء مسجلة بعد.', items:'سؤال',
  kinds:{model:'نموذج',diag:'تشخيصي',verbal:'قسم لفظي',quant:'قسم كمي',mock:'محاكاة كاملة',skill:'مهارة',review:'مراجعة',session:'جلسة اليوم'},
  timeUp:'انتهى الوقت', letters:['أ','ب','ج','د'], back:'رجوع', close:'إغلاق'
 },
 en:{
  cloudT:'Your account (cloud save)', cloudOn:'Signed in as', cloudOff:'Sign up with your email so your progress is saved in the cloud and follows you to any device.', acctManage:'Manage account', acctJoin:'Sign up or sign in', cloudSaving:'Saving to the cloud...', cloudErr:'Could not save to the cloud. It will retry automatically.', cloudSynced:'Last synced:',
  acctTitle:'Your account', acctJoinT:'Save your progress in the cloud', acctWhy:'Your name, email and a password only. Your progress is saved and follows you to any device.', fullName:'Student name', namePh:'e.g. Sara Ahmed', nameT:'Name', nameEdit:'Edit name', nameSave:'Save name', nameSaved:'Name saved.', nameMissing:'Add your name so it shows at the top of the page.', hello:'Hi', signUp:'Sign up', signIn:'Sign in', email:'Email', password:'Password (at least 8 characters)', consent:'I agree to store my name, email, track, target and practice progress only to follow my preparation.', needConsent:'Please agree to data storage to finish signing up.', withGoogle:'Continue with Google', forgot:'Forgot password?', resetSent:'We sent a reset link to your email.', syncNow:'Sync now', chPw:'Change password', curPw:'Current password', newPw:'New password (at least 8 characters)', chPwBtn:'Change password', pwChanged:'Password changed.', signOut:'Sign out', verifyHint:'We sent a confirmation link to your email. It is optional but helps you recover your account.', delAcct:'Delete my account and data', delConfirm:'Your account and all cloud data will be deleted permanently. Your progress stays on this device only.', delYes:'Yes, delete', deleted:'Account and data deleted.',
  privT:'What data do we keep?', privD:'Only: your name, your email, your track, your target score, your test date if you enter it, and your practice progress. No phone number or ID. You can delete your account and all data anytime from this window.',
  authErr:{'email-already-in-use':'This email is already registered. Choose "Sign in".','invalid-email':'That email address is not valid.','invalid-name':'Enter your name (2 to 60 characters).','weak-password':'Password too short; use at least 8 characters.','invalid-credential':'Wrong email or password.','wrong-password':'Wrong email or password.','user-not-found':'No account with this email. Choose "Sign up".','too-many-requests':'Too many attempts. Wait a moment and try again.','network-request-failed':'No internet connection.','requires-recent-login':'To delete your account, sign out, sign in again and repeat.','popup-closed-by-user':'The Google window closed before finishing.','operation-not-allowed':'This sign-in method is not enabled yet.','reset-admin':'To reset your password, contact the site admin for a temporary password, then change it after signing in.',consent:'Please agree to data storage to finish signing up.',unauthenticated:'Your session ended. Please sign in again.',server:'Could not reach the server. Try again shortly.',other:'Something went wrong. Please try again.'},
  reviewBtn:'Review', reviewOf:'Review of test', retake:'Retake', reviewHint:'Tap any completed test to review your answers and mistakes. Details of the last 20 tests and the latest attempt of each model are kept on this device.', noDetail:'Details for this test are not available; it may predate this update or come from another device.',
  restartT:'Restart the plan', restartD:'The plan goes back to week 1 starting today and task checkmarks are cleared. Your level, results and mistake log stay as they are.', restartBtn:'Restart the plan', restartConfirm:'Your plan will restart from week 1 today. Continue?', restartDone:'Your plan has restarted',
  resetPick:'Choose what to erase:', resetWarn:'Erasing cannot be undone. Save a progress file first if you want a copy.', resetDone:'Erased',
  resetParts:{plan:['Plan and tasks','The plan restarts from week 1 today'],mistakes:['Mistake log','Saved review questions and mistake causes'],models:['Full model tests','Scores for all 30 tests, so you can retake them fresh'],cards:['Cards, vocabulary and explainers','All cards return to unlearned and explainer ticks are cleared'],skills:['Level and results','Mastery map, estimated score, attempt history and model tests'],all:['All progress','Everything above; your track, target and language stay']},
  saveTitle:'Save your data', saveAuto:'Auto-save on this device', saveAutoD:'Every answer and result is saved instantly in your browser. It stays after you close the page, but is lost if you clear browser data or switch devices.', savedOk:'Saved on this device', saveFail:'This browser is blocking storage (maybe private mode). Save a file so you do not lose progress.', lastSaved:'Last saved:', persistOn:'persistent storage on', saveFile:'Backup file', saveFileD:'Save a small file to your device and restore it anytime, on any device.', saveFileBtn:'Save progress file', loadFileBtn:'Restore from file', lastExport:'Last backup:', noExport:'No backup yet.', saveCode:'Transfer code', fileSaved:'File saved', fileFallback:'File saving is not available here; copy the code shown and keep it.', tryAgain:'Try again in a moment', resultSaved:'Your result is saved', nudgeH:'Back up your progress', nudgeP:'It has been a week since your last backup. A small file protects everything you have done.',
  themeT:'Appearance', modeT:'Mode', modes:{light:'Light',dark:'Dark',auto:'Auto'}, accentT:'Color', accents:{violet:'Violet',pink:'Pink',blue:'Blue',orange:'Orange',ruby:'Ruby',navy:'Navy'},
  brand:'GAT Academy', tagline:'General Aptitude Test prep',
  nav:{today:'Today',learn:'Kit',practice:'Practice',progress:'Progress',guide:'Guide'},
  switchLang:'عربي',
  greet:'Your target: 100', heroLine:'The GAT is ten limited question types. Master each at 95% accuracy in under a minute, close your mistakes as you go, and move closer to 100 step by step.',
  daysLeft:'days to your test', setDate:'Set your test date', readiness:'Readiness for 100', estScore:'Estimated score',
  sessionTitle:'Today\'s session', sessionSub:'25 questions built for you · about 30 minutes', startSession:'Start today\'s session', sessionDone:'Today\'s session is done. Extra practice is optional.',
  sessionParts:(d,w,m)=>`${d} due reviews · ${w} on your two weakest skills · ${m} mixed`,
  diagFirst:'Start with the diagnostic', diagFirstSub:'20 questions of every type · 20 minutes. Sets your baseline and shapes your sessions.',
  masteryTitle:'Mastery map', masteryHint:'Tap a skill to open its lesson. Each skill climbs four levels up to "Locked in".',
  levels:['Not started','Learning','Competent','Mastered','Locked in'],
  levelRule:['','below 70%','70% or more','85%+ at a good pace','95%+ over the last 20 questions within target time'],
  roadTitle:'Readiness criteria for 100', weekTitle:'This week', fullPlan:'Full plan', settings:'Settings',
  ready:['All ten skills at "Locked in"','3 full simulations in a row estimated at 95+','Average time within target for every skill','No reviews due in your mistake log'],
  learnTitle:'The GAT kit', kitIntro:'Everything in one place: concept cards, lessons, solving techniques, recurring compilation patterns, vocabulary and resources.', tabs:{cards:'Cards',lessons:'Lessons',tech:'Techniques',patterns:'Compilation patterns',vocab:'Vocabulary',resources:'Resources'},
  deckAll:'All cards', cardsIntro:'Read the front and try to recall, then flip. "Review again" brings it back today; "I know it" pushes it out by days.', tapFlip:'Tap to flip', example:'Example', allInDeck:'All cards in this deck', deckDone:'You have finished this deck for today. Come back tomorrow or pick another deck.', techIntro:'Techniques top scorers use to lift accuracy and speed. Apply one per session until it becomes a habit.', patIntro:'Question patterns that recur in the compilations students share after the test. Examples are written by the platform on the same pattern.', how:'How it appears', trick:'The key', practicePattern:'Practice this pattern', skillCards:'Cards for this skill',
  verbal:'Verbal', quant:'Quantitative',
  concept:'The concept', mind:'How the test writer thinks', steps:'How to solve', types:'Patterns with examples', rules:'Rules and facts', traps:'Traps', examples:'Worked examples', speed:'Getting to 100', more:'Go further', mastery:'Your level in this skill', targetTime:'Target time',
  practice10:'Practice (10 questions, instant feedback)', xpTitle:'Foundation explainers', xpIntro:'Short animated explainers with a teacher’s voice. Each builds the idea from zero, pauses for you to try, and ends with a quick challenge.', xpDone:'Done', xpShort:'explainers', xpN:'Explainer', answer:'Answer', why:'Why', lessonsOpen:'Open lesson',
  vocabIntro:'Cards for words that recur in the test. Say the meaning in your head, then flip. Cards you miss come back more often.', flip:'Flip card', know:'I know it', again:'Review again', vocabDone:'Today\'s cards are done', known:'known', left:'left',
  resIntro:'Selected resources for each skill. Rule: one explanation source you finish, then practice here until "Locked in".',
  practiceTitle:'Practice', practiceIntro:'Pick a type. Instant-feedback practice is for learning; sections and simulations run on real test timing.',
  pSession:'Today\'s session', pSessionD:'Spaced review of your mistakes + your two weakest skills + mixed questions.',
  pReview:'Due reviews', pReviewD:'Questions you missed that are due today. Each correct answer pushes them further out until they close.',
  pDiag:'Diagnostic test', pDiagD:'20 questions · 20 minutes.',
  pVerbal:'Verbal section', pVerbalD:'24 questions · 25 minutes, real timing.',
  pQuant:'Quant section', pQuantD:'24 questions · 25 minutes, no calculator.',
  pMock:'Random simulation', pMockD:'4 sections × 24 questions × 25 minutes with fresh questions every time.', modelsTitle:'Full model tests', modelsIntro:'30 fixed computer-format tests (4 sections × 24 questions × 25 minutes), built on the test blueprint and compilation patterns. Retake any test and compare scores.', model:'Test', best:'best', notTaken:'not taken', modelsDone:'tests completed',
  bySkillTitle:'Practice by skill', start:'Start', questions:'questions', min:'min', sec:'s', q:'Question', of:'of',
  due:'due', noDue:'No reviews due today',
  sectionLabel:'Section', finishSection:'End section', finishTest:'Finish', prev:'Previous', next:'Next', check:'Check', flag:'Mark for review', flagged:'Marked', map:'Question map',
  confirmEnd:'You cannot return to this section.', yesEnd:'Yes, end section', cancel:'Go back', unanswered:'unanswered',
  quit:'Exit', quitConfirm:'Exiting discards this attempt.', yesQuit:'Yes, exit',
  correctFb:'Correct', wrongFb:'Correct answer', pace:'Pace', paceOk:'on time', paceSlow:'slower than target',
  resultTitle:'Result', correct:'correct', wrong:'wrong', skipped:'skipped', avgTime:'Average time', estGat:'Estimated score',
  bySkill:'By skill', review:'Review answers', onlyWrong:'Mistakes only', all:'All', yourAns:'Your answer', rightAns:'Correct', explain:'Explanation',
  causeQ:'Why did you miss it? (sets your fix)', causes:{concept:'Didn\'t know the rule',careless:'Rushed',time:'Ran out of time',trap:'Fell for a trap'},
  askAI:'Explain it another way', aiThinking:'Writing an explanation...', aiErr:'Could not get an explanation right now.', done:'Done', passage:'Passage',
  progressTitle:'Progress',
  kEst:'Estimated score', kReady:'Readiness for 100', kSolved:'Questions solved', kAcc:'Accuracy', kTime:'Average time', kStreak:'Day streak',
  skillsTitle:'Skills: accuracy and time', trendTitle:'Estimated score over time', recoTitle:'Your next step', causesTitle:'Why you miss questions', historyTitle:'Attempt history',
  noCauses:'Tag your mistakes on the result screen to see them here.', causeFix:{concept:'Go back to the skill lesson and rules, then practice with instant feedback.',careless:'Use a "read the question twice" routine and reread your choice before confirming.',time:'Drill timed sections and skip anything past two minutes.',trap:'Review the "Traps" part of the lessons for the skills you missed.'},
  gap:'To target', noHistory:'No attempts yet.', date:'Date', type:'Type', score:'Score',
  backup:'Move progress to another device', backupD:'Progress is saved in this browser. Copy the code and paste it on the other device.', copyCode:'Copy code', importCode:'Import', pasteHere:'Paste a progress code here', copied:'Copied', imported:'Imported', badCode:'That code is not valid.', reset:'Erase progress…', resetConfirm:'Your progress will be deleted permanently from this browser.', yesReset:'Yes, erase',
  estNote:'The estimate uses your recent accuracy and the section weights for your track. Qiyas uses an unpublished scaled formula, so treat it as guidance.',
  planTitle:'My plan', planIntro:'Built from your test date and track. Today\'s session every day is the backbone; weekly tasks build on it.',
  examDate:'Test date', track:'Track', sci:'Science', lit:'Humanities', targetScore:'Target', weeks:'Plan length (weeks)', save:'Save',
  week:'Week', thisWeek:'This week', phaseNames:['Foundation','Mastery','Speed','Simulation'],
  phaseDesc:['Learn every type and reach "Competent" in all ten skills.','Lift every skill to "Mastered" with timed sections.','Speed and consistency: 95% within target time.','Full simulations until 100 feels familiar.'],
  sessionsWeek:(n)=>`Today\'s session 5 times this week (${n}/5)`,
  guideTitle:'Guide', sourcesLine:'Sources', verifyNote:'Formats, fees and attempt limits sometimes change. Check the Education & Training Evaluation Commission website before registering.',
  methodTitle:'How the method works', methodIntro:'Everything here is built on learning principles with strong evidence in educational psychology research, used by top scorers on standardized tests.',
  footer:'GAT Academy is independent and not affiliated with the Education & Training Evaluation Commission. Questions are written by the platform on Qiyas question patterns; they are not official questions.',
  none:'None', mistakesEmpty:'No mistakes logged yet.', items:'questions',
  kinds:{model:'Model test',diag:'Diagnostic',verbal:'Verbal section',quant:'Quant section',mock:'Full simulation',skill:'Skill',review:'Review',session:'Session'},
  timeUp:'Time is up', letters:['A','B','C','D'], back:'Back', close:'Close'
 }
};

const METHOD = {
 ar:[
  ['الاسترجاع بدل إعادة القراءة','حل الأسئلة يثبت المعلومة أكثر من قراءتها مرات. لذلك كل درس ينتهي بتدريب، والتدريب هو قلب المنصة.','كل درس → ١٠ أسئلة بتصحيح فوري'],
  ['التكرار المتباعد','المراجعة على فترات متزايدة (يوم، ٣، ٧، ١٤، ٣٠) تمنع النسيان بأقل جهد.','أخطاؤك تعود إليك في مواعيد محسوبة حتى تُغلق'],
  ['الإتقان قبل الانتقال','لا تنتقل للمستوى التالي قبل أن تثبت الحالي. الدرجة الكاملة تأتي من إتقان كل نمط، لا من تغطية سطحية للجميع.','خريطة الإتقان: ٤ درجات لكل مهارة'],
  ['التدريب المختلط','خلط الأنواع في جلسة واحدة يدرّبك على تمييز نوع السؤال بسرعة، وهي المهارة التي يحتاجها الاختبار.','جلسة اليوم تخلط المهارات'],
  ['التدريب المتعمد وتحليل الخطأ','كل خطأ له سبب: قاعدة، تسرع، وقت، أو فخ. العلاج يختلف باختلاف السبب.','صنّف أخطاءك فتظهر لك خطة العلاج'],
  ['التغذية الراجعة الفورية','تعرف الصواب والسبب فور الإجابة في مرحلة التعلم، فلا يترسخ الخطأ.','وضع التعلم يصحح بعد كل سؤال'],
  ['المحاكاة المطابقة','الأداء يتحسن حين تشبه ظروف التدريب ظروف الاختبار: التوقيت، الأقسام المقفلة، الواجهة.','محاكاة بصيغة المحوسب ٤ × ٢٤ × ٢٥'],
  ['الآلية والسرعة','حين تصبح القواعد تلقائية يتحرر ذهنك للتفكير. الهدف دقة ٩٥٪ ضمن زمن مستهدف لكل مهارة.','زمن مستهدف لكل مهارة في لوحة التقدم'],
  ['النوم والانتظام','الذاكرة تُثبَّت أثناء النوم، والجلسات القصيرة اليومية أنفع من المذاكرة المكثفة المتقطعة.','جلسة يومية ٣٠ دقيقة وسلسلة أيام متتالية']
 ],
 en:[
  ['Retrieval over rereading','Answering questions fixes knowledge far better than rereading it. Every lesson ends in practice, and practice is the core of the platform.','Every lesson → 10 instant-feedback questions'],
  ['Spaced repetition','Reviewing at growing intervals (1, 3, 7, 14, 30 days) prevents forgetting with the least effort.','Your mistakes return on a schedule until they close'],
  ['Mastery before moving on','Do not move up before the current level is secure. A perfect score comes from mastering every type, not skimming all of them.','Mastery map: 4 levels per skill'],
  ['Interleaved practice','Mixing types in one session trains you to recognize a question type fast, which is exactly what the test demands.','Today\'s session mixes skills'],
  ['Deliberate practice and error analysis','Every mistake has a cause: a rule, rushing, time, or a trap. The fix depends on the cause.','Tag your mistakes to get the matching fix'],
  ['Immediate feedback','In the learning phase you see the right answer and why immediately, so errors do not set in.','Learning mode corrects after each question'],
  ['Test-like simulation','Performance improves when practice conditions match test conditions: timing, locked sections, interface.','Computer-format simulation 4 × 24 × 25'],
  ['Automaticity and speed','When rules become automatic, your mind is free to think. Target: 95% accuracy within a target time for each skill.','Target time per skill on the Progress page'],
  ['Sleep and consistency','Memory consolidates during sleep, and short daily sessions beat irregular cramming.','A 30-minute daily session and a day streak']
 ]
};

const RESOURCES = [
 {cat:{ar:'رسمي',en:'Official'},items:[
  {k:'official',t:{ar:'هيئة تقويم التعليم والتدريب',en:'Education & Training Evaluation Commission'},d:{ar:'التسجيل والمواعيد والرسوم والأدلة الإرشادية الرسمية مع نماذج أسئلة.',en:'Registration, dates, fees, official guides and sample questions.'},u:'https://www.etec.gov.sa'},
  {k:'official',t:{ar:'صفحة خدمة القدرات العامة',en:'General Aptitude service page'},d:{ar:'وصف الاختبار وشروطه من المصدر الرسمي.',en:'Official test description and conditions.'},u:'https://www.etec.gov.sa/ar/service/GeneralAbilities'}]},
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
const GUIDE = {
  ar:[
    {id:'what',h:'ما هو اختبار القدرات العامة؟',body:`<p>اختبار معياري يقدمه المركز الوطني للقياس (قياس) التابع لهيئة تقويم التعليم والتدريب لطلاب المرحلة الثانوية، وتعتمد عليه الجامعات السعودية في القبول ضمن «النسبة الموزونة» مع المعدل التراكمي والاختبار التحصيلي.</p><p>لا يقيس ما حفظته من المنهج، بل قدرتك على <strong>الفهم والتحليل والاستنتاج</strong> من خلال اللغة والأرقام. لذلك يتحسن بالتدريب على المهارة، وليس بحفظ الإجابات.</p>`},
    {id:'format',h:'الصيغة والأقسام',body:`<div class="tbl"><table><thead><tr><th>البند</th><th>الورقي</th><th>المحوسب</th></tr></thead><tbody>
      <tr><td>عدد الأسئلة</td><td>١٢٠ سؤالًا تقريبًا</td><td>نحو ٩٦ سؤالًا (حسب مصادر تعليمية حديثة)</td></tr>
      <tr><td>الأقسام</td><td>خمسة أقسام</td><td>أربعة أقسام</td></tr>
      <tr><td>زمن القسم</td><td>٢٥ دقيقة</td><td>٢٥ دقيقة</td></tr>
      <tr><td>نوع الأسئلة</td><td colspan="2">اختيار من متعدد بأربعة بدائل (أ، ب، ج، د)</td></tr>
      <tr><td>الآلة الحاسبة</td><td colspan="2">غير مسموح بها</td></tr>
      <tr><td>اللغة</td><td colspan="2">العربية أو الإنجليزية</td></tr>
      <tr><td>الدرجة</td><td colspan="2">من ١٠٠، وصلاحية النتيجة خمس سنوات</td></tr></tbody></table></div>
      <p>تتناوب الأقسام بين لفظي وكمي، ولا يمكن العودة إلى قسم بعد انتهاء وقته. المحاكاة في هذه المنصة تتبع صيغة المحوسب: ٤ أقسام × ٢٤ سؤالًا × ٢٥ دقيقة، أي نحو دقيقة لكل سؤال.</p>`},
    {id:'weights',h:'وزن اللفظي والكمي حسب المسار',body:`<div class="tbl"><table><thead><tr><th>المسار</th><th>اللفظي</th><th>الكمي</th><th>ملاحظة</th></tr></thead><tbody>
      <tr><td>علمي</td><td>٥٥٪ تقريبًا</td><td>٤٥٪ تقريبًا</td><td>يشمل الجبر والهندسة والتحليل</td></tr>
      <tr><td>نظري</td><td>٧٥٪ تقريبًا</td><td>٢٥٪ تقريبًا</td><td>كمي أخف وبلا جبر متقدم</td></tr></tbody></table></div>
      <p>توزيع الكمي في المسار العلمي كما تذكره مصادر تعليمية: حساب نحو ٤٠٪، هندسة نحو ٢٤٪، جبر نحو ٢٣٪، تحليل وإحصاء نحو ١٣٪. لذلك يبدأ الكمي في خطتك بالحساب.</p>`},
    {id:'types',h:'أنواع الأسئلة',body:`<p><strong>اللفظي:</strong> التناظر اللفظي، إكمال الجمل، الخطأ السياقي، المفردة الشاذة، استيعاب المقروء.</p><p><strong>الكمي:</strong> الحساب، الجبر، الهندسة، التحليل والإحصاء، المقارنات الكمية.</p><p>لكل نوع درس كامل في صفحة <a href="#learn-lessons">الدروس</a> مع اختبار قصير بعده.</p>`},
    {id:'admission',h:'كيف تُستخدم الدرجة في القبول؟',body:`<p>تحسب الجامعات «النسبة الموزونة» من ثلاثة عناصر: المعدل التراكمي للثانوية، والقدرات، والتحصيلي. يختلف وزن القدرات بين الجامعات والتخصصات، وغالبًا ما يقع بين ٣٠٪ و٥٠٪. التخصصات الصحية والهندسية الأكثر تنافسًا تتطلب عادة درجات أعلى.</p><p>لذلك كل نقطة تضيفها في القدرات ترفع نسبتك الموزونة مباشرة، وهي العنصر الذي يمكنك تحسينه أكثر في أقصر وقت.</p>`},
    {id:'register',h:'التسجيل ويوم الاختبار',body:`<ol class="steps">
      <li>سجّل في بوابة قياس الإلكترونية عبر موقع هيئة تقويم التعليم والتدريب، واختر الاختبار واللغة ونوعه (ورقي أو محوسب).</li>
      <li>اختر المدينة والمركز والموعد، وادفع الرسوم (نحو ١٥٠ ريالًا للمحوسب وفق مصادر ٢٠٢٥–٢٠٢٦، تحقق من القيمة الحالية).</li>
      <li>احجز موعدك قبل ٦–٨ أسابيع على الأقل لتتسع خطتك لمرحلة المحاكاة.</li>
      <li>يوم الاختبار: أحضر الهوية، واحضر مبكرًا. لا آلة حاسبة ولا هاتف.</li>
      <li>النتيجة: المحوسب خلال أيام عمل قليلة، والورقي خلال نحو شهر. يمكنك الإعادة ضمن عدد محاولات محدود، وتُحتسب الدرجة الأعلى عادة.</li></ol>`},
    {id:'strategy',h:'استراتيجية الوقت داخل القاعة',body:`<ul class="bul"><li>لديك نحو ٦٢ ثانية لكل سؤال. السؤال الذي يتجاوز دقيقتين: علّمه وانتقل.</li><li>لا عقوبة على الإجابة الخاطئة حسب ما هو معروف، فلا تترك سؤالًا بلا إجابة.</li><li>في استيعاب المقروء: اقرأ السؤال قبل النص.</li><li>في المقارنات: جرّب ٠ و١ و−١ و½ قبل أن تحكم.</li><li>راجع المعلَّمات في آخر ٣ دقائق من القسم فقط.</li></ul>`},
    {id:'lessons-learned',h:'دروس من تجارب المتفوقين',body:`<p>هذه خلاصة أنماط تتكرر في نصائح الطلاب الذين تجاوزوا ٩٠ وفي أدلة التحضير المنشورة، وليست اقتباسات من أشخاص بعينهم:</p><ul class="bul">
      <li><strong>مصدر واحد للتأسيس:</strong> التنقل بين عشرة مدرسين يضيع الوقت. أنهِ مصدرًا واحدًا كاملًا.</li>
      <li><strong>افهم الفكرة ولا تحفظ السؤال:</strong> قياس يغيّر الأرقام والصياغة؛ الحفظ الأعمى يخذلك.</li>
      <li><strong>التوقيت من البداية:</strong> من يتدرب بلا ساعة يفاجأ ببطئه يوم الاختبار.</li>
      <li><strong>دفتر الأخطاء أهم من كثرة الحل:</strong> الدرجات تأتي من إغلاق الأخطاء المتكررة.</li>
      <li><strong>٥ محاكاة كاملة على الأقل</strong> قبل الموعد، في نفس توقيت الاختبار الحقيقي من اليوم.</li>
      <li><strong>النوم ليلة الاختبار</strong> أنفع من مراجعة أخيرة متعبة.</li></ul>`},
    {id:'faq',h:'أسئلة شائعة',body:`<details><summary>هل أسئلة «التجميعات» أسئلة حقيقية؟</summary><p>التجميعات أسئلة يتذكرها الطلاب بعد الاختبار ويعيد المعلمون صياغتها. مفيدة للتعرف على الأنماط، لكنها ليست رسمية وقد تحتوي أخطاء. الأسئلة الرسمية الوحيدة هي النماذج التي ينشرها قياس في أدلته.</p></details>
      <details><summary>كم أحتاج من الوقت للتحضير؟</summary><p>يوصي كثير من المختصين بثلاثة أشهر للطالب المبتدئ، و٦–٨ أسابيع لمن لديه أساس جيد. الخطة هنا تتكيف مع أي مدة بين أسبوعين و١٦ أسبوعًا.</p></details>
      <details><summary>ورقي أم محوسب؟</summary><p>المحوسب أكثر مرونة في المواعيد ونتيجته أسرع عادةً، والورقي بموعد محدد. تختلف طريقة عرض نصوص الاستيعاب بين الصيغتين، فاطّلع على الدليل الإرشادي الرسمي. المهم أن تتدرب على الصيغة التي ستختبرها.</p></details>
      <details><summary>هل الـ ١٠٠ ممكنة فعلًا؟</summary><p>نعم، الدرجة الكاملة ممكنة. الاختبار لا يقيس ذكاءً ثابتًا، بل عشرة أنماط أسئلة محدودة. من يتقن كل نمط بدقة ٩٥٪ فأكثر وبسرعة أقل من دقيقة، ويغلق أخطاءه المتكررة، ويتدرب على الصيغة الحقيقية حتى تصبح مألوفة، يجعل الـ ١٠٠ نتيجة متوقعة. المنصة تقيس جاهزيتك لها بمعايير واضحة في لوحة «تقدّمي».</p></details>`}
  ],
  en:[
    {id:'what',h:'What is the GAT?',body:`<p>A standardized test run by the National Center for Assessment (Qiyas) under the Education & Training Evaluation Commission for high school students. Saudi universities use it for admission as part of the "weighted percentage" alongside your GPA and the Achievement Test (Tahsili).</p><p>It does not test what you memorized from the curriculum. It measures your ability to <strong>understand, analyze and infer</strong> using language and numbers, so it improves with skill practice, not by memorizing answers.</p>`},
    {id:'format',h:'Format and sections',body:`<div class="tbl"><table><thead><tr><th>Item</th><th>Paper-based</th><th>Computer-based</th></tr></thead><tbody>
      <tr><td>Questions</td><td>About 120</td><td>About 96 (per recent prep sources)</td></tr>
      <tr><td>Sections</td><td>Five</td><td>Four</td></tr>
      <tr><td>Time per section</td><td>25 minutes</td><td>25 minutes</td></tr>
      <tr><td>Question type</td><td colspan="2">Multiple choice with four options (A–D)</td></tr>
      <tr><td>Calculator</td><td colspan="2">Not allowed</td></tr>
      <tr><td>Language</td><td colspan="2">Arabic or English</td></tr>
      <tr><td>Score</td><td colspan="2">Out of 100, valid for five years</td></tr></tbody></table></div>
      <p>Sections alternate between verbal and quantitative, and you cannot return to a section once its time ends. Simulations here follow the computer-based format: 4 sections × 24 questions × 25 minutes, about one minute per question.</p>`},
    {id:'weights',h:'Verbal vs. quantitative weight by track',body:`<div class="tbl"><table><thead><tr><th>Track</th><th>Verbal</th><th>Quant</th><th>Note</th></tr></thead><tbody>
      <tr><td>Science</td><td>About 55%</td><td>About 45%</td><td>Includes algebra, geometry and analysis</td></tr>
      <tr><td>Humanities</td><td>About 75%</td><td>About 25%</td><td>Lighter quant, no advanced algebra</td></tr></tbody></table></div>
      <p>Prep sources report the science-track quant mix as roughly 40% arithmetic, 24% geometry, 23% algebra and 13% analysis & statistics, which is why your plan starts quant with arithmetic.</p>`},
    {id:'types',h:'Question types',body:`<p><strong>Verbal:</strong> analogies, sentence completion, contextual error, odd word out, reading comprehension.</p><p><strong>Quantitative:</strong> arithmetic, algebra, geometry, analysis & statistics, quantitative comparison.</p><p>Each type has a full lesson on the <a href="#learn-lessons">Lessons</a> page with a quiz after it.</p>`},
    {id:'admission',h:'How the score is used for admission',body:`<p>Universities compute a "weighted percentage" from your high school GPA, the GAT and the Tahsili. The GAT weight varies by university and program, commonly between 30% and 50%. Competitive health and engineering programs usually need higher scores.</p><p>Every point you add on the GAT lifts your weighted percentage directly, and it is the component you can improve most in the least time.</p>`},
    {id:'register',h:'Registration and test day',body:`<ol class="steps">
      <li>Register on the Qiyas portal through the Education & Training Evaluation Commission website. Choose the test, language, and paper or computer format.</li>
      <li>Choose city, center and date, and pay the fee (about 150 SAR for computer-based per 2025–2026 sources; check the current fee).</li>
      <li>Book at least 6–8 weeks ahead so your plan has room for the simulation phase.</li>
      <li>On test day bring your ID and arrive early. No calculator, no phone.</li>
      <li>Results: computer-based within a few working days, paper within about a month. Retakes are allowed within a limited number of attempts, and the higher score usually counts.</li></ol>`},
    {id:'strategy',h:'Timing strategy in the hall',body:`<ul class="bul"><li>You have about 62 seconds per question. If one passes two minutes, mark it and move on.</li><li>As far as is known there is no penalty for wrong answers, so never leave a blank.</li><li>Reading: read the question before the passage.</li><li>Comparisons: test 0, 1, −1 and ½ before deciding.</li><li>Revisit marked questions only in the last 3 minutes of a section.</li></ul>`},
    {id:'lessons-learned',h:'Lessons from high scorers',body:`<p>These are recurring patterns from students who scored above 90 and from published prep guides, not quotes from specific people:</p><ul class="bul">
      <li><strong>One foundation source:</strong> hopping between ten teachers wastes time. Finish one source completely.</li>
      <li><strong>Understand, do not memorize:</strong> Qiyas changes numbers and wording; memorized answers fail.</li>
      <li><strong>Time yourself from day one:</strong> students who practice untimed are surprised by their speed on test day.</li>
      <li><strong>The mistake log beats volume:</strong> points come from closing repeated mistakes.</li>
      <li><strong>At least 5 full simulations</strong> before the test, at the same time of day as the real one.</li>
      <li><strong>Sleep the night before</strong> beats a tired last review.</li></ul>`},
    {id:'faq',h:'FAQ',body:`<details><summary>Are "compilation" (tajmeeat) questions real?</summary><p>Compilations are questions students recall after the test, reworded by teachers. They help you see patterns but are not official and can contain errors. The only official questions are the samples Qiyas publishes in its guides.</p></details>
      <details><summary>How long should I prepare?</summary><p>Many specialists recommend three months for beginners and 6–8 weeks for students with a solid base. The plan here adapts to anything from 2 to 16 weeks.</p></details>
      <details><summary>Paper or computer?</summary><p>Computer-based is usually more flexible and faster to score, while paper runs on fixed dates. Reading passages are displayed differently in each format, so check the official guide. Practice in the format you will sit.</p></details>
      <details><summary>Is 100 really achievable?</summary><p>Yes, a perfect score is possible. The test does not measure fixed intelligence; it measures ten limited question types. Master each type at 95%+ accuracy in under a minute, close your recurring mistakes, and practice the real format until it feels familiar, and 100 becomes an expected result. The platform measures your readiness for it with clear criteria on the Progress page.</p></details>`}
  ]
};

const GUIDE_SOURCES = [
  ['هيئة تقويم التعليم والتدريب (الموقع الرسمي)','Education & Training Evaluation Commission (official)','https://www.etec.gov.sa'],
  ['Dirasa Abroad: القدرات العامة','Dirasa Abroad: General Abilities Test','https://www.dirasaabroad.com/general-abilities-test/'],
  ['درجات: دليل أقسام القدرات','Drjat: GAT sections guide','https://drjat.sa/qudrat'],
  ['Keystone Tutors: GAT Guide','Keystone Tutors: GAT Guide','https://www.keystonetutors.com/news/general-aptitude-test-guide']
];

/* ============ EXPLAINERS (الشروحات): animated, narrated foundation lessons ============
   window.XP: add(lesson) · forSkill(sk) · all() · open(key) · setHooks({isDone,onDone,onClose})
   A lesson: {key, sk, title, min, goals[], scenes[], quiz[]}
   A scene is either hand-built {t, setup(stage)->ctx, beats:[{say, run(ctx)->timeline, wait?, right?, wrong?, after?}]}
   or declarative {t, items:{k:spec}, beats:[{say, show?, hide?, hl?, strike?, set?, move?}], ask?:{opts,a,right,wrong,show?,y?}}
   Narration: a recorded continuous track per lesson (TRACKS, from /audio/tracks.json); browser Arabic voice as fallback. */
(function(){
const HAS_GSAP=typeof gsap!=='undefined';
const NS='http://www.w3.org/2000/svg';
const $x=s=>document.querySelector(s);
let LG='ar';
const AD=s=>LG==='en'?String(s):String(s).replace(/\d/g,d=>'٠١٢٣٤٥٦٧٨٩'[d]).replace(/\./g,'٫');
const UI={
 ar:{close:'إغلاق',of:(a,b)=>`شرح ${a} من ${b}`,start:'ابدأ الشرح',startSub:'شغّل الصوت. يتوقف الشرح عند الوقفات التفاعلية حتى تجرّب بنفسك.',play:'تشغيل',pause:'إيقاف مؤقت',prev:'المشهد السابق',rep:'أعد المشهد',next:'المشهد التالي',speed:'السرعة',voice:'الصوت',cc:'النص المكتوب',scenes:'المشاهد',after:'بعد هذا الشرح',press:'اضغط «ابدأ الشرح».',inter:'تفاعلي',final:'التحدي الختامي',yourTurn:'دورك: جرّب على اللوحة.',clipEnd:'انتهى المقطع',fullQ:'تريد الشرح كاملًا مع التحدي؟',openFull:'افتح الشرح الكامل',again:'أعد المقطع',quizIntro:'التحدي الختامي: أسئلة سريعة على الفكرة نفسها.',qn:(a,b)=>`التحدي ${a} من ${b}`,right:'صحيح.',wrong:'ليس هذا.',nextQ:'التالي',result:'النتيجة',passed:'أتممت الشرح.',failed:'راجع الفكرة ثم أعد التحدي.',nextL:'الشرح التالي: ',done:'تم',retry:'أعد التحدي',rewatch:'أعد الشرح',bravo:'أحسنت!',retryCap:'أعد المحاولة بعد مراجعة المشهد الذي أخطأت فيه.',sp:['٠٫٨٥×','١×','١٫٢٥×']},
 en:{close:'Close',of:(a,b)=>`Explainer ${a} of ${b}`,start:'Start the explainer',startSub:'Turn your sound on. The explainer pauses at interactive stops so you can try it yourself.',play:'Play',pause:'Pause',prev:'Previous scene',rep:'Replay scene',next:'Next scene',speed:'Speed',voice:'Voice',cc:'Captions',scenes:'Scenes',after:'After this explainer',press:'Press “Start the explainer”.',inter:'Interactive',final:'Final challenge',yourTurn:'Your turn: try it on the board.',clipEnd:'Clip finished',fullQ:'Want the full explainer with the challenge?',openFull:'Open the full explainer',again:'Replay clip',quizIntro:'Final challenge: quick questions on the same idea.',qn:(a,b)=>`Challenge ${a} of ${b}`,right:'Correct.',wrong:'Not quite.',nextQ:'Next',result:'Result',passed:'Explainer complete.',failed:'Review the idea, then retry the challenge.',nextL:'Next explainer: ',done:'Done',retry:'Retry the challenge',rewatch:'Rewatch',bravo:'Well done!',retryCap:'Try again after reviewing the scene you missed.',sp:['0.85×','1×','1.25×']}};
const u=k=>UI[LG][k];
const escx=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
function el(tag,attrs={},parent){ const e=document.createElementNS(NS,tag); for(const k in attrs){ if(k==='text') e.textContent=attrs[k]; else e.setAttribute(k,attrs[k]); } if(parent) parent.appendChild(e); return e; }
const tl=()=>gsap.timeline();
function note(p,{x,y,w=120,h=70,c='n0',text='',size=28,rot=0,cls='t-note'}){
  const g=el('g',{},p); el('rect',{x:x-w/2+4,y:y-h/2+4,width:w,height:h,rx:6,class:'f-edge'},g); el('rect',{x:x-w/2,y:y-h/2,width:w,height:h,rx:6,class:'f-'+c,stroke:'var(--edge)','stroke-width':2},g);
  const t=el('text',{x,y:y+size*0.36,'text-anchor':'middle','font-size':size,'font-weight':800,class:cls,text},g);
  gsap.set(g,{rotation:rot,transformOrigin:'50% 50%'}); g._t=t; return g; }
function txt(p,{x,y,s=24,cls='t-ink',text='',w=800,anchor='middle',font,dir}){ const a={x,y,'font-size':s,'font-weight':w,'text-anchor':anchor,class:cls,text}; if(font) a['font-family']=font; if(dir) a.direction=dir; return el('text',a,p); }
function drawIn(path,d=0.8){ const L=path.getTotalLength?path.getTotalLength():300; gsap.set(path,{strokeDasharray:L,strokeDashoffset:L,opacity:1}); return gsap.to(path,{strokeDashoffset:0,duration:d,ease:'power2.inOut'}); }
function checkMark(p,x,y,s=1){ const g=el('g',{},p); el('circle',{cx:x,cy:y,r:22*s,class:'f-oksoft'},g); const pa=el('path',{d:`M${x-10*s} ${y} l${7*s} ${8*s} l${14*s} -${16*s}`,class:'s-ok'},g); return {g,pa}; }
function crossMark(p,x,y,s=1){ const g=el('g',{},p); el('circle',{cx:x,cy:y,r:22*s,class:'f-badsoft'},g); const a=el('path',{d:`M${x-9*s} ${y-9*s} L${x+9*s} ${y+9*s} M${x+9*s} ${y-9*s} L${x-9*s} ${y+9*s}`,class:'s-bad'},g); return {g,pa:a}; }
function arrow(p,x1,y1,x2,y2,cls='s-pri',bend=-40){ const mx=(x1+x2)/2, my=Math.min(y1,y2)+bend; const d=`M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}`; const pa=el('path',{d,class:cls},p);
  const ang=Math.atan2(y2-my,x2-mx), h=12; const hp=el('path',{d:`M${x2-h*Math.cos(ang-0.5)} ${y2-h*Math.sin(ang-0.5)} L${x2} ${y2} L${x2-h*Math.cos(ang+0.5)} ${y2-h*Math.sin(ang+0.5)}`,class:cls},p); return {pa,hp}; }
function tlDone(t){ return new Promise(r=>{ if(!t||t.totalProgress()>=1){ r(); return; } t.eventCallback('onComplete',r); }); }

/* ---------- declarative items ---------- */
const POP=new Set(['note','box','circle','check','cross','poly','pie','dot']);
function draw(stage,spec){
  const T=spec.type, g=el('g',{},stage); let o={g,type:T,spec};
  if(T==='note'){ const n=note(g,spec); o.label=n._t; }
  else if(T==='text'||T==='eq'){ o.label=txt(g,{x:spec.x,y:spec.y,s:spec.s||26,cls:spec.cls||(T==='eq'?'t-ink':'t-ink'),text:spec.text,w:spec.w||800,anchor:spec.anchor||'middle',dir:T==='eq'?'ltr':(spec.dir||undefined),font:spec.hand?'var(--f-hand)':undefined}); if(spec.hand) o.label.setAttribute('class','t-hand'); }
  else if(T==='box'){ el('rect',{x:spec.x,y:spec.y,width:spec.w,height:spec.h,rx:spec.rx??10,class:'f-'+(spec.c||'surface'),stroke:spec.stroke===false?'none':'var(--edge)','stroke-width':spec.sw||2},g); if(spec.text!=null) o.label=txt(g,{x:spec.x+spec.w/2,y:spec.y+spec.h/2+(spec.s||22)*0.36,s:spec.s||22,cls:spec.cls||'t-ink',text:spec.text,dir:spec.ltr?'ltr':undefined}); }
  else if(T==='circle'){ el('circle',{cx:spec.cx,cy:spec.cy,r:spec.r,class:spec.c?'f-'+spec.c:'',fill:spec.c?undefined:'none',stroke:spec.stroke===false?'none':'var(--edge)','stroke-width':spec.sw||2.5},g); if(spec.text!=null) o.label=txt(g,{x:spec.cx,y:spec.cy+(spec.s||20)*0.36,s:spec.s||20,cls:spec.cls||'t-ink',text:spec.text}); }
  else if(T==='dot'){ el('circle',{cx:spec.x,cy:spec.y,r:spec.r||6,class:'f-'+(spec.c||'pri')},g); if(spec.text!=null) o.label=txt(g,{x:spec.x+(spec.dx??0),y:spec.y+(spec.dy??-14),s:spec.s||18,cls:spec.cls||'t-ink',text:spec.text}); }
  else if(T==='line'){ o.path=el('line',{x1:spec.x1,y1:spec.y1,x2:spec.x2,y2:spec.y2,class:spec.cls||'s-ink'},g); }
  else if(T==='path'){ o.path=el('path',{d:spec.d,class:spec.cls||'s-ink',fill:spec.fill?undefined:'none'},g); if(spec.fill) o.path.setAttribute('class',(spec.cls||'')+' f-'+spec.fill); }
  else if(T==='poly'){ el('polygon',{points:spec.points,class:'f-'+(spec.c||'prisoft'),stroke:'var(--edge)','stroke-width':spec.sw||2.5,'stroke-linejoin':'round'},g); (spec.labels||[]).forEach(l=>txt(g,{x:l[0],y:l[1],s:l[3]||20,cls:l[4]||'t-ink',text:l[2]})); }
  else if(T==='arrow'){ const a=arrow(g,spec.x1,spec.y1,spec.x2,spec.y2,spec.cls||'s-pri',spec.bend??-40); o.path=a.pa; o.head=a.hp; if(spec.text) o.label=txt(g,{x:(spec.x1+spec.x2)/2,y:Math.min(spec.y1,spec.y2)+(spec.bend??-40)/2-8,s:spec.s||18,cls:'t-hand',text:spec.text}); }
  else if(T==='check'){ const m=checkMark(g,spec.x,spec.y,spec.s||1); o.path=m.pa; }
  else if(T==='cross'){ const m=crossMark(g,spec.x,spec.y,spec.s||1); o.path=m.pa; }
  else if(T==='bars'){ const {x,y,w,h,values,labels=[],max=Math.max(...values),c='pri',vals=true}=spec; const n=values.length, gap=w/n, bw=gap*0.58;
    el('line',{x1:x-6,y1:y+h,x2:x+w+6,y2:y+h,class:'s-ink'},g); o.bars=[];
    values.forEach((v,i)=>{ const bh=h*v/max, bx=x+i*gap+(gap-bw)/2; const r=el('rect',{x:bx,y:y+h-bh,width:bw,height:bh,rx:4,class:'f-'+(Array.isArray(c)?c[i]:c),stroke:'var(--edge)','stroke-width':1.5},g); r._h=bh; r._y=y+h-bh; o.bars.push(r);
      if(labels[i]!=null) txt(g,{x:bx+bw/2,y:y+h+22,s:16,cls:'t-ink2',text:labels[i],w:700}); if(vals) txt(g,{x:bx+bw/2,y:y+h-bh-8,s:16,cls:'t-ink',text:AD(v)}); }); }
  else if(T==='nline'){ const {x1,x2,y,from,to,step=1,marks=true}=spec; el('line',{x1:x1-12,y1:y,x2:x2+12,y2:y,class:'s-ink'},g); const n=(to-from)/step;
    for(let i=0;i<=n;i++){ const v=from+i*step, x=x1+(x2-x1)*i/n; el('line',{x1:x,y1:y-8,x2:x,y2:y+8,class:'s-ink'},g); if(marks) txt(g,{x,y:y+30,s:17,cls:'t-ink2',text:(v<0?'−':'')+AD(Math.abs(v)),w:700,dir:'ltr'}); } o.xAt=v=>x1+(x2-x1)*(v-from)/(to-from); }
  else if(T==='pie'){ const {cx,cy,r,parts,fill=0,c='pink'}=spec; el('circle',{cx,cy,r,class:'f-surface2',stroke:'var(--edge)','stroke-width':2.5},g);
    for(let i=0;i<parts;i++){ const a0=-Math.PI/2+i*2*Math.PI/parts, a1=a0+2*Math.PI/parts; const p=el('path',{d:`M${cx} ${cy} L${cx+r*Math.cos(a0)} ${cy+r*Math.sin(a0)} A${r} ${r} 0 ${parts===1?1:0} 1 ${cx+r*Math.cos(a1)} ${cy+r*Math.sin(a1)} Z`,class:i<fill?'f-'+c:'f-surface2',stroke:'var(--edge)','stroke-width':1.5},g); }
  }
  else if(T==='grid'){ const {x,y,rows,cols,cell=22,gap=2,fill=0,c='pri'}=spec; o.cells=[]; for(let r=0;r<rows;r++) for(let k=0;k<cols;k++){ const i=r*cols+k; o.cells.push(el('rect',{x:x+k*(cell+gap),y:y+r*(cell+gap),width:cell,height:cell,rx:3,class:i<fill?'f-'+c:'f-surface2',stroke:'var(--line)','stroke-width':1},g)); } }
  gsap.set(g,{transformOrigin:'50% 50%'}); if(spec.rot&&T!=='note') gsap.set(g,{rotation:spec.rot});
  return o;
}
function revealTl(o,t,at){
  const T=o.type;
  if(T==='line'||T==='path'||T==='arrow'||T==='check'||T==='cross'){ t.set(o.g,{opacity:1},at); if(T==='check'||T==='cross') t.fromTo(o.g,{scale:0},{scale:1,transformOrigin:'50% 50%',duration:.35,ease:'back.out(2)'},at);
    if(o.path) t.add(drawIn(o.path,.6),at); if(o.head) t.fromTo(o.head,{opacity:0},{opacity:1,duration:.15}); if(o.label) t.fromTo(o.label,{opacity:0},{opacity:1,duration:.3}); return; }
  if(T==='bars'){ t.set(o.g,{opacity:1},at); o.bars.forEach((r,i)=>t.fromTo(r,{attr:{height:0,y:r._y+r._h}},{attr:{height:r._h,y:r._y},duration:.5,ease:'power2.out'},i?'<.12':at)); return; }
  if(T==='grid'){ t.set(o.g,{opacity:1},at); t.from(o.cells,{scale:0,transformOrigin:'50% 50%',duration:.25,stagger:.01},at); return; }
  if(POP.has(T)) t.fromTo(o.g,{opacity:0,scale:.3},{opacity:1,scale:1,transformOrigin:'50% 50%',duration:.5,ease:'back.out(1.8)'},at);
  else t.fromTo(o.g,{opacity:0,y:14},{opacity:1,y:0,duration:.45,ease:'power2.out'},at);
}
function compileScene(sc){
  if(sc.setup){ sc.interactive=sc.interactive||sc.beats.some(b=>b.wait); return sc; }
  const items=sc.items||{};
  const out={t:sc.t,interactive:!!sc.ask};
  out.setup=stage=>{ const ctx={}; for(const k in items){ ctx[k]=draw(stage,items[k]); if(!items[k].show0) gsap.set(ctx[k].g,{opacity:0}); } return ctx; };
  out.beats=(sc.beats||[]).map((b,bi,arr)=>{ const beat={say:b.say};
    beat.run=ctx=>{ const t=tl(); let at=0;
      (b.hide||[]).forEach(k=>ctx[k]&&t.to(ctx[k].g,{opacity:0,duration:.3},0));
      (b.set?Object.entries(b.set):[]).forEach(([k,v])=>{ const o=ctx[k]; if(!o||!o.label) return; t.to(o.label,{opacity:0,duration:.2},at).call(()=>{ o.label.textContent=v; },null,at+.2).to(o.label,{opacity:1,duration:.25},at+.2); });
      (b.move?Object.entries(b.move):[]).forEach(([k,[dx,dy]])=>ctx[k]&&t.to(ctx[k].g,{x:`+=${dx}`,y:`+=${dy}`,duration:.7,ease:'power2.inOut'},at));
      (b.show||[]).forEach((k,i)=>{ const o=ctx[k]; if(!o) return; revealTl(o,t,at+i*(b.gap??.45)); });
      (b.hl||[]).forEach(k=>ctx[k]&&t.to(ctx[k].g,{scale:1.1,transformOrigin:'50% 50%',duration:.22,yoyo:true,repeat:1},'>'));
      (b.strike||[]).forEach(k=>{ const o=ctx[k]; if(!o) return; t.call(()=>{ const bb=o.g.getBBox(); const ln=el('line',{x1:bb.x-6,y1:bb.y+bb.height/2,x2:bb.x+bb.width+6,y2:bb.y+bb.height/2,class:'s-bad'},o.g); drawIn(ln,.4); },null,'>'); });
      return t; };
    if(sc.ask&&bi===arr.length-1){ const A=sc.ask; beat.right=A.right; beat.wrong=A.wrong;
      beat.wait=ctx=>askChoice(ctx._stage,A);
      beat.after=(ctx,ok)=>{ const t=tl(); (A.show||[]).forEach((k,i)=>ctx[k]&&revealTl(ctx[k],t,.3+i*.4)); return t; }; }
    return beat; });
  return out;
}
/* option buttons drawn on the stage; resolves with true/false */
function askChoice(stage,A){ return new Promise(res=>{
  const opts=A.opts, n=opts.length, two=n===4&&!A.column, y0=A.y??(two?182:150);
  const gs=opts.map((t,i)=>{ const g=el('g',{class:'hot',tabindex:0,role:'button','aria-label':t},stage);
    const w=two?250:420, h=two?54:48, cx=two?(LG==='en'?[170,470]:[470,170])[i%2]:320, cy=two?y0+Math.floor(i/2)*70:y0+i*58;
    el('rect',{x:cx-w/2+4,y:cy-h/2+4,width:w,height:h,rx:12,class:'f-edge'},g); const r=el('rect',{x:cx-w/2,y:cy-h/2,width:w,height:h,rx:12,class:'f-surface hot-ring',stroke:'var(--edge)','stroke-width':2},g);
    txt(g,{x:cx,y:cy+7,s:A.s||21,text:t,dir:(A.ltr||LG==='en')?'ltr':undefined}); return {g,r}; });
  gsap.from(gs.map(o=>o.g),{opacity:0,y:18,stagger:.1,duration:.3});
  gs.forEach((o,i)=>{ const pick=()=>{ gs.forEach(x=>x.g.style.pointerEvents='none'); o.r.setAttribute('class',(i===A.a?'f-oksoft':'f-badsoft')+' hot-ring'); if(i!==A.a) gs[A.a].r.setAttribute('class','f-oksoft hot-ring');
      gsap.to(gs.filter((x,j)=>j!==A.a&&j!==i).map(x=>x.g),{opacity:.35,duration:.3}); setTimeout(()=>{ if(A.show&&A.show.length) gsap.to(gs.map(x=>x.g),{opacity:0,duration:.4}); },1400); res(i===A.a); };
    o.g.addEventListener('click',pick); o.g.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); pick(); } }); });
}); }

/* ---------- registry ---------- */
const LESSONS={}, ORDER=[];
let HOOKS={isDone:()=>false,onDone:()=>{},onClose:()=>{}};
let bid=0;
function add(L){ if(!L||!L.key||LESSONS[L.key]) return; L.lang=L.lang||'ar'; L.scenes=L.scenes.map(compileScene); L.scenes.forEach(sc=>{ const f=sc.setup; sc.setup=st=>{ LG=L.lang; return f(st); }; }); L.scenes.forEach((sc,si)=>sc.beats.forEach((b,bi)=>{ b.id=`${L.key}-s${si+1}-b${bi+1}`; })); LESSONS[L.key]=L; ORDER.push(L.key); }
const forSkill=(sk,lang)=>ORDER.filter(k=>LESSONS[k].sk===sk&&(!lang||LESSONS[k].lang===lang)).map(k=>LESSONS[k]).sort((a,b)=>(a.ord??50)-(b.ord??50));

/* ---------- narration ---------- */
const TRACKS={};
function loadTracks(){ if(!/^https?:/.test(location.protocol)) return Promise.resolve();
  return Promise.all([fetch('/audio/index.json').then(r=>r.ok?r.json():[]),fetch('/audio/tracks.json').then(r=>r.ok?r.json():{})]).then(([ids,tr])=>{ const have=new Set(ids); for(const k in tr){ const T=tr[k]; if(T.segs&&T.segs.every(g=>have.has(g.clip))) TRACKS[k]=T; } }).catch(()=>{}); }
let CAPW=[];
function captionWords(words){ const c=$x('#xp-cap'); if(!c) return; CAPW=words; c.innerHTML=words.map((w,i)=>`<span class="w fut" data-i="${i}">${escx(w)}</span>`).join(' '); }
function captionIdx(i){ const c=$x('#xp-cap'); if(!c) return; c.querySelectorAll('.w').forEach((s,j)=>{ s.className='w '+(j<i?'past':j===i?'on':'fut'); }); }
function captionAt(text,ci){ const before=text.slice(0,ci).trim(); captionIdx(before?before.split(/\s+/).length:0); }
function captionAll(){ const c=$x('#xp-cap'); if(!c) return; c.querySelectorAll('.w').forEach(s=>s.className='w past'); }
function captionText(t){ const c=$x('#xp-cap'); if(c) c.innerHTML=escx(t); }
const TTS={ ok:'speechSynthesis' in window, voice:null, on:true, rate:1, cur:null,
  pick(){ if(!this.ok) return; const vs=speechSynthesis.getVoices()||[]; this.voice=LG==='en'?(vs.find(v=>/^en[-_](US|GB)/i.test(v.lang))||vs.find(v=>/^en/i.test(v.lang))||null):(vs.find(v=>/^ar[-_]SA/i.test(v.lang))||vs.find(v=>/^ar/i.test(v.lang))||null); },
  usable(){ return this.on&&this.ok&&!!this.voice; },
  say(text){ return new Promise(resolve=>{ const job={text,resolve,stopped:false,timers:[]}; this.cur=job; this._run(job); }); },
  _run(job){ const words=job.text.split(/\s+/); captionWords(words);
    if(this.usable()){ try{ speechSynthesis.cancel(); }catch(e){}
      const u=new SpeechSynthesisUtterance(job.text); u.voice=this.voice; u.lang=this.voice.lang; u.rate=Math.min(1.6,this.rate*0.95); let bounded=false;
      u.onboundary=e=>{ if(e.name&&e.name!=='word') return; bounded=true; captionAt(job.text,e.charIndex); };
      u.onend=()=>{ if(this.cur===job&&!job.stopped){ captionAll(); this.cur=null; job.resolve(); } };
      u.onerror=()=>{ if(this.cur===job&&!job.stopped){ this.cur=null; job.resolve(); } };
      speechSynthesis.speak(u); const est=this._est(job.text); job.timers.push(setTimeout(()=>{ if(!bounded) this._timedWords(job,est); },500)); }
    else { const est=this._est(job.text); this._timedWords(job,est); job.timers.push(setTimeout(()=>{ if(this.cur===job&&!job.stopped){ captionAll(); this.cur=null; job.resolve(); } },est+250)); } },
  _est(t){ return Math.max(1500,(t.length/(LG==='en'?15:13))*1000/this.rate); },
  _timedWords(job,ms){ const n=job.text.split(/\s+/).length; for(let i=0;i<n;i++) job.timers.push(setTimeout(()=>{ if(this.cur===job&&!job.stopped) captionIdx(i); },(ms*i)/n)); },
  pause(){ const j=this.cur; if(!j) return; j.stopped=true; j.timers.forEach(clearTimeout); j.timers=[]; try{ speechSynthesis.cancel(); }catch(e){} },
  resume(){ const j=this.cur; if(!j) return; j.stopped=false; this._run(j); },
  stop(){ const j=this.cur; if(j){ j.stopped=true; j.timers.forEach(clearTimeout); } this.cur=null; try{ speechSynthesis.cancel(); }catch(e){} } };
if(TTS.ok){ TTS.pick(); try{ speechSynthesis.addEventListener('voiceschanged',()=>TTS.pick()); }catch(e){} }

/* ---------- player ---------- */
const IC={
  play:'<svg class="xp-ic" viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>',
  pause:'<svg class="xp-ic" viewBox="0 0 24 24"><path d="M8 5v14M16 5v14" stroke-width="3.2"/></svg>',
  next:'<svg class="xp-ic" viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg>', prev:'<svg class="xp-ic" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>',
  replay:'<svg class="xp-ic" viewBox="0 0 24 24"><path d="M4 12a8 8 0 1 0 2.4-5.7"/><path d="M4 4v4h4"/></svg>',
  vol:'<svg class="xp-ic" viewBox="0 0 24 24"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg>',
  cc:'<svg class="xp-ic" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10 10.5a2.5 2.5 0 1 0 0 3M17 10.5a2.5 2.5 0 1 0 0 3"/></svg>',
  x:'<svg class="xp-ic" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  check:'<svg class="xp-ic" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7"/></svg>' };
let P=null, RUN=0;
function stopTrack(){ const k=P&&P.trk; if(k){ k.dead=true; if(k.audio){ k.audio.pause(); k.audio.removeAttribute('src'); } cancelAnimationFrame(k.raf); } if(P) P.trk=null; }
function stopPlayer(){ RUN++; TTS.stop(); if(P){ stopTrack(); if(P.tl) P.tl.kill(); } if(HAS_GSAP){ gsap.killTweensOf('*'); gsap.globalTimeline.resume(); } P=null; }
function trackFor(key){ const T=TRACKS[key]; return T&&T.segs&&T.segs.length?T:null; }
function close(){ stopPlayer(); const o=$x('#xp'); if(o) o.remove(); document.body.classList.remove('xp-open'); document.removeEventListener('keydown',onKey); HOOKS.onClose(); }
function onKey(e){ if(!P) return; if(e.key==='Escape'){ close(); return; } if(e.key===' '&&!e.target.closest('button,input,textarea')){ e.preventDefault(); $x('#xp-pp').click(); } }
function open(key,opt={}){
  if(!HAS_GSAP) return; stopPlayer(); const L=LESSONS[key]; if(!L) return; LG=L.lang; TTS.pick();
  const only=opt.only; const scenes=only!=null?[only]:L.scenes.map((_,i)=>i);
  P={L,key,scenes,idx:0,playing:false,started:false,only,tl:null,cc:true,waiting:false};
  let o=$x('#xp'); if(!o){ o=document.createElement('div'); o.id='xp'; o.className='xp'; o.setAttribute('role','dialog'); o.setAttribute('aria-modal','true'); document.body.appendChild(o); }
  o.setAttribute('dir',LG==='en'?'ltr':'rtl'); o.setAttribute('lang',LG);
  document.body.classList.add('xp-open'); o.setAttribute('aria-label',L.title);
  const sibs=forSkill(L.sk,L.lang), ix=sibs.indexOf(L);
  o.innerHTML=`<div class="xp-in">
    <div class="xp-top"><button class="xp-ib" id="xp-x" aria-label="${u('close')}">${IC.x}</button><div class="xp-tt"><span class="xp-eyebrow"><span>${u('of')(AD(ix+1),AD(sibs.length))}</span>${L.min?`<span class="xp-dot">${L.min}</span>`:''}</span><h2>${escx(opt.title||L.title)}</h2></div></div>
    <div class="xp-grid">
      <div>
        <div class="xp-stage-wrap" id="xp-sw">
          <div class="xp-segs" id="xp-segs">${scenes.map(()=>'<i><b></b></i>').join('')}</div>
          <svg id="xp-stage" class="xp-stage" viewBox="0 0 640 360" role="img" aria-label="${escx(L.title)}"></svg>
          <div class="xp-scene-t" id="xp-scene-t"></div>
          <div class="xp-cover" id="xp-cover"><button class="xp-big" id="xp-start"><span class="c">${IC.play}</span><b>${u('start')}</b><small>${u('startSub')}</small></button></div>
        </div>
        <div class="xp-cap" id="xp-cap" aria-live="polite"></div>
        <div class="xp-ctl">
          <button class="xp-ib main" id="xp-pp" aria-label="${u('play')}">${IC.play}</button>
          <button class="xp-ib" id="xp-prev" aria-label="${u('prev')}">${LG==='en'?IC.next:IC.prev}</button>
          <button class="xp-ib" id="xp-rep" aria-label="${u('rep')}">${IC.replay}</button>
          <button class="xp-ib" id="xp-nxt" aria-label="${u('next')}">${LG==='en'?IC.prev:IC.next}</button>
          <span class="xp-sp"></span>
          <div class="xp-speed" role="group" aria-label="${u('speed')}">${[0.85,1,1.25].map((r,i)=>`<button data-rate="${r}" class="${TTS.rate===r?'on':''}">${u('sp')[i]}</button>`).join('')}</div>
          <button class="xp-ib" id="xp-vo" aria-pressed="${TTS.on}" aria-label="${u('voice')}">${IC.vol}</button>
          <button class="xp-ib" id="xp-ccb" aria-pressed="true" aria-label="${u('cc')}">${IC.cc}</button>
        </div>
      </div>
      <aside class="xp-side">
        <div class="xp-panel"><h3>${u('scenes')}</h3><ol class="xp-chap" id="xp-chap"></ol></div>
        ${only==null&&L.goals?`<div class="xp-panel"><h3>${u('after')}</h3><ul class="xp-goals">${L.goals.map(g=>`<li>${escx(g)}</li>`).join('')}</ul></div>`:''}
      </aside>
    </div></div>`;
  captionText(u('press'));
  renderChapters(); setSceneTitle(); document.addEventListener('keydown',onKey);
  $x('#xp-x').onclick=close;
  $x('#xp-start').onclick=()=>{ $x('#xp-cover').hidden=true; P.started=true; playScene(0); };
  $x('#xp-pp').onclick=()=>{ if(!P.started){ $x('#xp-start').click(); return; } P.playing?pause():resume(); };
  $x('#xp-nxt').onclick=()=>go(P.idx+1); $x('#xp-prev').onclick=()=>go(P.idx-1); $x('#xp-rep').onclick=()=>go(P.idx);
  $x('#xp-vo').onclick=()=>{ TTS.on=!TTS.on; $x('#xp-vo').setAttribute('aria-pressed',String(TTS.on)); if(P.started&&!P.waiting&&P.idx<P.scenes.length) playScene(P.idx); };
  $x('#xp-ccb').onclick=()=>{ P.cc=!P.cc; $x('#xp-ccb').setAttribute('aria-pressed',String(P.cc)); $x('#xp-cap').classList.toggle('off',!P.cc); };
  o.querySelectorAll('[data-rate]').forEach(b=>b.onclick=()=>{ TTS.rate=+b.dataset.rate; if(P&&P.trk&&P.trk.audio) P.trk.audio.playbackRate=TTS.rate; o.querySelectorAll('[data-rate]').forEach(x=>x.classList.toggle('on',x===b)); gsap.globalTimeline.timeScale((RM?2.5:1)*TTS.rate); });
  gsap.globalTimeline.timeScale((RM?2.5:1)*TTS.rate);
  setTimeout(()=>$x('#xp-start')?.focus(),0);
}
function renderChapters(){ const L=P.L; $x('#xp-chap').innerHTML=P.scenes.map((si,i)=>{ const sc=L.scenes[si]; const st=i<P.idx?'done':i===P.idx?'cur':''; return `<li class="${st}"><button data-go="${i}"><span class="n">${AD(i+1)}</span><span>${escx(sc.t)}</span>${sc.interactive?`<span class="k">${u('inter')}</span>`:''}</button></li>`; }).join('')+(P.only==null&&L.quiz?`<li class="${P.idx>=P.scenes.length?'cur':''}"><button data-go="quiz"><span class="n">${IC.check}</span><span>${u('final')}</span></button></li>`:'');
  document.querySelectorAll('#xp-chap [data-go]').forEach(b=>b.onclick=()=>{ if(!P.started){ $x('#xp-cover').hidden=true; P.started=true; } b.dataset.go==='quiz'?showQuiz():go(+b.dataset.go); }); }
function setSceneTitle(){ const sc=P.L.scenes[P.scenes[P.idx]]; $x('#xp-scene-t').textContent=sc?sc.t:''; }
function setPlaying(v){ P.playing=v; const b=$x('#xp-pp'); if(b){ b.innerHTML=v?IC.pause:IC.play; b.setAttribute('aria-label',v?u('pause'):u('play')); } }
function pause(){ if(!P) return; setPlaying(false); if(P.trk&&P.trk.audio){ P.trk.audio.pause(); gsap.globalTimeline.pause(); return; } TTS.pause(); if(P.tl) P.tl.pause(); }
function resume(){ if(!P) return; setPlaying(true); if(P.trk&&P.trk.audio){ gsap.globalTimeline.resume(); if(!P.waiting) P.trk.audio.play().catch(()=>{}); return; } if(P.tl) P.tl.resume(); TTS.resume(); }
function go(i){ if(!P) return; if(i<0) i=0; if(i>=P.scenes.length){ P.only!=null?finishQuick():showQuiz(); return; } playScene(i); }
function segProgress(i,frac){ document.querySelectorAll('#xp-segs i').forEach((s,j)=>{ s.classList.toggle('done',j<i); const b=s.querySelector('b'); if(j===i) b.style.inlineSize=Math.round(frac*100)+'%'; else if(j>i) b.style.inlineSize='0'; else b.style.inlineSize=''; }); }
function setupSceneAt(pi){ if(P.tl) P.tl.kill(); gsap.killTweensOf('*'); gsap.globalTimeline.resume(); const q=$x('#xp-quiz'); if(q) q.remove();
  P.idx=pi; renderChapters(); setSceneTitle();
  const sc=P.L.scenes[P.scenes[pi]], stage=$x('#xp-stage'); stage.innerHTML=''; P.ctx=sc.setup(stage); P.ctx._stage=stage; P.ctxScene=P.scenes[pi]; gsap.fromTo(stage,{opacity:0},{opacity:1,duration:.25}); return P.ctx; }
async function playScene(i){
  if(TTS.on&&trackFor(P.key)) return playTrack(i);
  const my=++RUN; TTS.stop(); stopTrack();
  setPlaying(true); const ctx=setupSceneAt(i); const sc=P.L.scenes[P.scenes[i]]; const n=sc.beats.length;
  for(let b=0;b<n;b++){
    if(my!==RUN) return; const beat=sc.beats[b]; segProgress(i,b/n);
    const t=beat.run?beat.run(ctx):null; P.tl=t;
    await Promise.all([TTS.say(beat.say),tlDone(t)]); if(my!==RUN) return;
    if(beat.wait){ P.waiting=true; setPlaying(false); captionText(u('yourTurn')); const ok=await beat.wait(ctx); P.waiting=false; if(my!==RUN) return; setPlaying(true);
      const t2=beat.after?beat.after(ctx,ok):null; P.tl=t2; await Promise.all([TTS.say(ok?beat.right:beat.wrong),tlDone(t2)]); if(my!==RUN) return; }
    await sleep(450); if(my!==RUN) return;
    while(P&&!P.playing&&my===RUN) await sleep(120);
  }
  segProgress(i+1,0); await sleep(400); if(my!==RUN) return; go(i+1);
}
/* continuous track: beats fire at their time in the recording */
function beatById(L,id){ for(let si=0;si<L.scenes.length;si++){ const bi=L.scenes[si].beats.findIndex(b=>b.id===id); if(bi>=0) return {si,bi,beat:L.scenes[si].beats[bi]}; } return null; }
function playClip(src,onTick,start=0){ return new Promise((resolve,reject)=>{ const a=new Audio(); a.preload='auto'; a.src=src; a.playbackRate=TTS.rate; a.preservesPitch=true; P.trk.audio=a; const k=P.trk;
  a.onended=()=>{ cancelAnimationFrame(k.raf); resolve(); }; a.onerror=()=>reject(new Error('audio'));
  const tick=()=>{ if(k.dead) return; onTick&&onTick(a.currentTime); k.raf=requestAnimationFrame(tick); };
  const goPlay=()=>{ if(start) a.currentTime=start; a.play().then(()=>{ k.raf=requestAnimationFrame(tick); }).catch(reject); };
  if(a.readyState>=1) goPlay(); else a.addEventListener('loadedmetadata',goPlay,{once:true}); }); }
function capBeat(text,frac){ const w=text.split(/\s+/); if(CAPW.join(' ')!==w.join(' ')) captionWords(w); captionIdx(Math.min(w.length-1,Math.max(0,Math.floor(frac*w.length)))); }
async function playTrack(pi){
  const my=++RUN; TTS.stop(); stopTrack(); const T=trackFor(P.key), L=P.L, sceneIdx=P.scenes[pi];
  P.trk={dead:false}; P.ctx=null; P.ctxScene=null; setPlaying(true);
  let si=T.segs.findIndex(g=>g.beats.some(b=>{ const l=beatById(L,b.id); return l&&l.si===sceneIdx; }));
  if(si<0){ P.trk=null; TTS.on=false; return playScene(pi); }
  let startBeat=T.segs[si].beats.findIndex(b=>beatById(L,b.id).si===sceneIdx);
  const only=P.only!=null;
  try{
    for(;si<T.segs.length;si++){
      const seg=T.segs[si]; let next=startBeat; startBeat=0; const k=P.trk; if(my!==RUN) return;
      const firstT=seg.beats[next].t0; let cur=null, stopAt=null;
      if(only){ const end=seg.beats.findIndex(b=>beatById(L,b.id).si!==sceneIdx&&b.t0>firstT); stopAt=end>=0?seg.beats[end].t0:null; }
      const fire=b=>{ const loc=beatById(L,b.id); if(!loc) return; const pIdx=P.scenes.indexOf(loc.si); if(pIdx<0) return;
        if(pIdx!==P.idx||!P.ctx||P.ctxScene!==loc.si) setupSceneAt(pIdx);
        const sc=L.scenes[loc.si]; segProgress(pIdx,loc.bi/sc.beats.length); P.tl=loc.beat.run?loc.beat.run(P.ctx):null; cur={b,loc}; };
      const p=playClip(seg.src,t=>{
        if(stopAt!=null&&t>=stopAt){ k.audio.pause(); k.resolveStop&&k.resolveStop(); return; }
        while(next<seg.beats.length&&t+0.05>=seg.beats[next].t0){ fire(seg.beats[next]); next++; }
        if(cur) capBeat(cur.loc.beat.say,(t-cur.b.t0)/Math.max(.3,cur.b.t1-cur.b.t0));
      },firstT);
      await Promise.race([p,new Promise(r=>{ k.resolveStop=r; })]); if(my!==RUN) return;
      while(next<seg.beats.length){ fire(seg.beats[next]); next++; }
      if(only) break;
      const last=cur&&cur.loc;
      if(last&&last.beat.wait){ P.waiting=true; setPlaying(false); captionText(u('yourTurn'));
        const ok=await last.beat.wait(P.ctx); P.waiting=false; if(my!==RUN) return; setPlaying(true);
        P.tl=last.beat.after?last.beat.after(P.ctx,ok):null; const fb=T.fb&&T.fb[last.beat.id], text=ok?last.beat.right:last.beat.wrong;
        if(fb&&fb[ok?'ok':'no']){ captionWords(text.split(/\s+/)); await playClip(fb[ok?'ok':'no'],t=>{ const a=P.trk.audio; if(a.duration) capBeat(text,t/a.duration); }); }
        else { const was=TTS.on; TTS.on=false; await TTS.say(text); TTS.on=was; }  /* no recording: captions only, keep one voice per lesson */
        await tlDone(P.tl); if(my!==RUN) return; await sleep(300); }
      else await sleep(250);
      while(P&&!P.playing&&my===RUN) await sleep(120);
    }
  }catch(e){ if(my!==RUN) return; P.trk=null; TTS.on=false; $x('#xp-vo')?.setAttribute('aria-pressed','false'); return playScene(P.idx); }
  if(my!==RUN) return; P.trk=null; segProgress(P.scenes.length,0);
  only?finishQuick():showQuiz();
}
function finishQuick(){ RUN++; TTS.stop(); stopTrack(); setPlaying(false); segProgress(P.scenes.length,0); captionText(u('clipEnd'));
  const d=document.createElement('div'); d.className='xp-quiz'; d.id='xp-quiz';
  d.innerHTML=`<p class="xp-qn">${u('clipEnd')}</p><h3>${u('fullQ')}</h3><div class="xp-row"><button class="xp-btn pri" id="xp-full">${u('openFull')}</button><button class="xp-btn" id="xp-again">${u('again')}</button><button class="xp-btn" id="xp-bk">${u('close')}</button></div>`;
  $x('#xp-sw').appendChild(d); $x('#xp-full').onclick=()=>open(P.key); $x('#xp-again').onclick=()=>playScene(0); $x('#xp-bk').onclick=close; }
function showQuiz(){
  RUN++; TTS.stop(); stopTrack(); if(P.tl) P.tl.kill(); setPlaying(false); P.idx=P.scenes.length; renderChapters(); segProgress(P.scenes.length,0); $x('#xp-scene-t').textContent='';
  const Q=P.L.quiz||[]; if(!Q.length){ close(); return; } let k=0, score=0; let d=$x('#xp-quiz'); if(!d){ d=document.createElement('div'); d.className='xp-quiz'; d.id='xp-quiz'; $x('#xp-sw').appendChild(d); }
  captionText(u('quizIntro'));
  const show=()=>{ const it=Q[k]; d.innerHTML=`<p class="xp-qn">${u('qn')(AD(k+1),AD(Q.length))}</p><h3 ${it.ltr||LG==='en'?'dir="ltr"':''}>${escx(it.q)}</h3><div class="xp-opts">${it.o.map((o,i)=>`<button class="xp-opt" data-i="${i}">${escx(o)}</button>`).join('')}</div><div id="xp-fb"></div>`;
    d.querySelectorAll('.xp-opt').forEach(b=>b.onclick=()=>{ const i=+b.dataset.i, ok=i===it.a; if(ok) score++; d.querySelectorAll('.xp-opt').forEach((x,j)=>{ x.disabled=true; if(j===it.a) x.classList.add('right'); else if(j===i) x.classList.add('wrong'); });
      $x('#xp-fb').innerHTML=`<p class="xp-why"><b>${ok?u('right'):u('wrong')}</b> ${escx(it.e)}</p><div class="xp-row"><button class="xp-btn pri" id="xp-qn">${k<Q.length-1?u('nextQ'):u('result')}</button></div>`; $x('#xp-qn').focus(); $x('#xp-qn').onclick=()=>{ k++; k<Q.length?show():end(); }; }); };
  const end=()=>{ const need=Math.ceil(Q.length*2/3), pass=score>=need; if(pass) HOOKS.onDone(P.key,score,Q.length);
    const sibs=forSkill(P.L.sk,P.L.lang), nx=sibs[sibs.indexOf(P.L)+1];
    d.innerHTML=`<p class="xp-qn">${u('result')}</p><div class="xp-score">${AD(score)} / ${AD(Q.length)}</div><h3>${pass?u('passed'):u('failed')}</h3>
      <div class="xp-row">${pass?(nx?`<button class="xp-btn pri" id="xp-nx">${u('nextL')}${escx(nx.title)}</button>`:`<button class="xp-btn pri" id="xp-done">${u('done')}</button>`):`<button class="xp-btn pri" id="xp-retry">${u('retry')}</button>`}<button class="xp-btn" id="xp-rw">${u('rewatch')}</button><button class="xp-btn" id="xp-bk">${u('close')}</button></div>`;
    captionText(pass?u('bravo'):u('retryCap'));
    const on=(id,f)=>{ const b=$x(id); if(b) b.onclick=f; }; on('#xp-nx',()=>open(nx.key)); on('#xp-done',close); on('#xp-retry',showQuiz); on('#xp-rw',()=>playScene(0)); on('#xp-bk',close); };
  show();
}

window.XP={ add, forSkill, all:()=>ORDER.map(k=>LESSONS[k]), get:k=>LESSONS[k], open, close, setHooks:h=>Object.assign(HOOKS,h), loadTracks, ready:HAS_GSAP,
  h:{el,note,txt,drawIn,checkMark,crossMark,arrow,tl,AD,tlDone} };
})();
/* Legacy hand-built explainers (percent, balance, analogy) */
(function(){ if(!window.XP||!XP.ready) return;
const {el,note,txt,drawIn,checkMark,crossMark,arrow,tl,AD,tlDone}=XP.h;
/* 10×10 grid used by the percent lesson */
function hundredGrid(p,x0,y0,cell=22,gap=2){ const cells=[]; for(let r=0;r<10;r++) for(let c=0;c<10;c++){ const x=x0+c*(cell+gap), y=y0+r*(cell+gap); const g=el('g',{},p);
  el('rect',{x,y,width:cell,height:cell,rx:4,class:'f-surface2',stroke:'var(--line)','stroke-width':1},g); const f=el('rect',{x,y,width:cell,height:cell,rx:4,class:'f-pri',opacity:0},g); cells.push({g,f,r,c}); } return cells; }

/* balance scale used by the equations lesson */
function makeScale(p){
  const g=el('g',{},p);
  el('path',{d:'M270 332 L370 332 L338 312 L302 312 Z',class:'f-ink'},g);
  el('rect',{x:315,y:120,width:10,height:194,rx:4,class:'f-ink'},g);
  const beam=el('g',{},g); el('rect',{x:150,y:114,width:340,height:12,rx:6,class:'f-ink'},beam); el('circle',{cx:320,cy:120,r:10,class:'f-butter',stroke:'var(--edge)','stroke-width':2},beam);
  const pan=()=>{ const pg=el('g',{},g); el('path',{d:'M0 0 L-62 78 M0 0 L62 78',class:'s-ink'},pg); el('path',{d:'M-72 78 Q0 104 72 78 Z',class:'f-surface',stroke:'var(--edge)','stroke-width':2.5},pg); const c=el('g',{},pg); gsap.set(c,{y:78}); return {g:pg,c,items:[]}; };
  const L=pan(), R=pan(); const st={a:0};
  const setA=a=>{ gsap.set(beam,{rotation:a,svgOrigin:'320 120'}); const r=a*Math.PI/180; gsap.set(L.g,{x:320-165*Math.cos(r),y:120-165*Math.sin(r)}); gsap.set(R.g,{x:320+165*Math.cos(r),y:120+165*Math.sin(r)}); };
  setA(0);
  return { g, L, R, tilt:(a,d=1.1,ease='elastic.out(1,0.45)')=>gsap.to(st,{a,duration:d,ease,onUpdate:()=>setA(st.a)}) };
}
function weight(pan){ const g=el('g',{},pan.c); el('rect',{x:-11,y:-22,width:22,height:22,rx:5,class:'f-butter',stroke:'var(--edge)','stroke-width':2},g); pan.items.push(g); return g; }
function xbox(pan,label='س'){ const g=el('g',{},pan.c); el('rect',{x:-19,y:-38,width:38,height:38,rx:6,class:'f-pri',stroke:'var(--edge)','stroke-width':2},g); el('text',{x:0,y:-12,'text-anchor':'middle','font-size':22,'font-weight':800,class:'t-inv',text:label},g); pan.items.push(g); return g; }
function layout(pan){ // boxes side by side, then weights beside them (3 per row next to a box, 5 per row alone)
  const boxes=pan.items.filter(i=>i.querySelector('text')), ws=pan.items.filter(i=>!i.querySelector('text'));
  const per=boxes.length?3:5, cols=Math.min(per,ws.length), W=boxes.length*42+cols*24+(boxes.length&&cols?6:0), x0=-W/2;
  boxes.forEach((b,i)=>gsap.set(b,{x:x0+21+i*42,y:-2}));
  const wx0=x0+boxes.length*42+(boxes.length&&cols?6:0)+12;
  ws.forEach((w,i)=>{ const row=Math.floor(i/per), col=i%per; gsap.set(w,{x:wx0+col*24,y:-2-row*24}); });
}

/* =================== LESSONS =================== */
const LESSONS={
/* ---------------- 1. percent ---------------- */
percent:{ key:'percent', sk:'arith', ord:40, area:'q', title:'النسبة المئوية من الصفر', min:'٤ دقائق', level:'تأسيس',
  goals:['تفهم معنى النسبة المئوية بصريًا','تحوّل النسبة إلى كسر مألوف','تحسب ١٠٪ و٥٪ و٢٠٪ ذهنيًا','تتجنب فخ الزيادة ثم النقص'],
  scenes:[
  { t:'كم من كل مئة؟', setup(s){ const cells=hundredGrid(s,40,60); const title=txt(s,{x:470,y:120,s:30,text:'النسبة المئوية'}); const sub=txt(s,{x:470,y:160,s:22,cls:'t-hand',text:'= كم من كل ١٠٠؟'}); const cnt=txt(s,{x:470,y:240,s:64,cls:'t-pri',text:'٠'}); const big=note(s,{x:470,y:250,w:170,h:96,c:'n0',text:'٢٥٪',size:52,rot:-4}); gsap.set([title,sub,cnt,big],{opacity:0}); return {cells,title,sub,cnt,big}; },
    beats:[
      { say:'النسبة المئوية سؤال واحد فقط: كم من كل مئة؟', run:c=>tl().from(c.cells.map(x=>x.g),{scale:0,opacity:0,transformOrigin:'50% 50%',duration:.35,stagger:{each:.006,grid:[10,10],from:'start'}}).to([c.title,c.sub],{opacity:1,duration:.5,stagger:.25},'-=.6') },
      { say:'أمامك مئة مربع. سنلوّن منها خمسة وعشرين.', run:c=>{ const o={v:0}; return tl().set(c.cnt,{opacity:1}).to(c.cells.slice(0,25).map(x=>x.f),{opacity:1,duration:.25,stagger:.07}).to(o,{v:25,duration:25*.07,ease:'none',onUpdate:()=>c.cnt.textContent=AD(Math.round(o.v))},'<'); } },
      { say:'خمسة وعشرون من مئة نكتبها خمسة وعشرين في المئة.', run:c=>tl().to(c.cnt,{opacity:0,duration:.2}).fromTo(c.big,{opacity:0,scale:.2},{opacity:1,scale:1,transformOrigin:'50% 50%',duration:.7,ease:'back.out(2)'}) },
    ]},
  { t:'النسبة كسرٌ متنكّر', setup(s){ const eq=txt(s,{x:320,y:70,s:34,text:'٢٥٪ = ٢٥ ÷ ١٠٠ = ¼'}); gsap.set(eq,{opacity:0});
      const pie=el('g',{},s); el('circle',{cx:320,cy:200,r:80,class:'f-surface2',stroke:'var(--edge)','stroke-width':2.5},pie); const w=el('circle',{cx:320,cy:200,r:40,fill:'none',stroke:'var(--pink)','stroke-width':80,transform:'rotate(-90 320 200)'},pie); const C=2*Math.PI*40; gsap.set(w,{strokeDasharray:`0 ${C}`}); gsap.set(pie,{opacity:0});
      const notes=[['٥٠٪','½','n1',150],['٢٥٪','¼','n0',320],['١٠٪','⅒','n3',490]].map(([a,b,c,x],i)=>{ const n=note(s,{x,y:190,w:130,h:110,c,text:a,size:36,rot:[-4,3,-2][i]}); gsap.set(n._t,{attr:{y:180}}); el('text',{x,y:228,'text-anchor':'middle','font-size':30,'font-weight':800,class:'t-note',text:'= '+b},n); gsap.set(n,{opacity:0}); return n; });
      return {eq,pie,w,C,notes}; },
    beats:[
      { say:'كل نسبة مئوية هي كسرٌ مقامه مئة.', run:c=>tl().fromTo(c.eq,{opacity:0,y:10},{opacity:1,y:0,duration:.6}) },
      { say:'وخمسة وعشرون من مئة هي الربع تمامًا.', run:c=>tl().to(c.pie,{opacity:1,duration:.3}).to(c.w,{strokeDasharray:`${c.C/4} ${c.C}`,duration:1.1,ease:'power2.out'}) },
      { say:'احفظ هذه الثلاث: خمسون في المئة نصف، وخمسة وعشرون ربع، وعشرة في المئة عُشر.', run:c=>tl().to([c.pie,c.eq],{opacity:0,duration:.3}).fromTo(c.notes,{opacity:0,y:-120},{opacity:1,y:0,duration:.6,ease:'bounce.out',stagger:.6}) },
    ]},
  { t:'حيلة العشرة', setup(s){ const q=txt(s,{x:320,y:66,s:28,text:'١٠٪ من ٢٤٠ = ؟'});
      const digits=['٢','٤','٠'].map((d,i)=>txt(s,{x:250+i*54,y:175,s:84,cls:'t-ink',text:d}));
      const unit=txt(s,{x:430,y:175,s:26,cls:'t-ink2',text:'ريال'}); const res=note(s,{x:320,y:170,w:150,h:90,c:'n0',text:'٢٤',size:52,rot:-3}); gsap.set(res,{opacity:0});
      const ch1=note(s,{x:190,y:290,w:210,h:62,c:'n2',text:'٢٠٪ = ٢ × ٢٤ = ٤٨',size:22,rot:-2}), ch2=note(s,{x:450,y:290,w:210,h:62,c:'n1',text:'٥٪ = ٢٤ ÷ ٢ = ١٢',size:22,rot:2}); gsap.set([ch1,ch2],{opacity:0});
      return {q,digits,unit,res,ch1,ch2}; },
    beats:[
      { say:'لتحسب عشرة في المئة من أي عدد، اقسمه على عشرة.', run:c=>tl().from(c.q,{opacity:0,y:-20,duration:.5}).from(c.digits,{opacity:0,y:30,stagger:.12,duration:.4},'<.2').from(c.unit,{opacity:0,duration:.3}) },
      { say:'أي احذف صفرًا واحدًا، فمئتان وأربعون تصبح أربعة وعشرين.', run:c=>tl().to(c.digits[2],{y:80,opacity:0,rotation:25,transformOrigin:'50% 50%',duration:.7,ease:'power2.in'}).to([c.digits[0],c.digits[1],c.unit],{opacity:0,duration:.3}).fromTo(c.res,{opacity:0,scale:.3},{opacity:1,scale:1,transformOrigin:'50% 50%',duration:.6,ease:'back.out(2)'}) },
      { say:'ومنها تبني الباقي: عشرون في المئة ضعفها، ثمانية وأربعون. وخمسة في المئة نصفها، اثنا عشر.', run:c=>tl().fromTo(c.ch1,{opacity:0,y:30},{opacity:1,y:0,duration:.5}).fromTo(c.ch2,{opacity:0,y:30},{opacity:1,y:0,duration:.5},'+=1.8') },
    ]},
  { t:'دورك: لوّن ٤٠٪', interactive:true, setup(s){ const cols=[]; const x0=110,y0=62,cell=19,gap=2;
      for(let c=0;c<10;c++){ const g=el('g',{class:'hot',tabindex:0,role:'button','aria-pressed':'false','aria-label':'العمود '+AD(c+1)},s); const ring=el('rect',{x:x0+c*(cell+gap)-2,y:y0-2,width:cell+4,height:10*(cell+gap)+2,rx:6,fill:'transparent',class:'hot-ring',stroke:'transparent'},g); const fs=[];
        for(let r=0;r<10;r++){ const y=y0+r*(cell+gap); el('rect',{x:x0+c*(cell+gap),y,width:cell,height:cell,rx:3,class:'f-surface2',stroke:'var(--line)','stroke-width':1},g); fs.push(el('rect',{x:x0+c*(cell+gap),y,width:cell,height:cell,rx:3,class:'f-pink',opacity:0},g)); }
        cols.push({g,fs,on:false}); }
      const pct=txt(s,{x:470,y:150,s:60,cls:'t-pri',text:'٠٪'}); txt(s,{x:470,y:188,s:18,cls:'t-ink2',text:'اضغط الأعمدة لتلوينها'});
      const btn=el('g',{class:'hot',tabindex:0,role:'button','aria-label':'تحقّق'},s); el('rect',{x:405,y:230,width:130,height:50,rx:12,class:'f-edge'},btn); el('rect',{x:401,y:226,width:130,height:50,rx:12,class:'f-pri',stroke:'var(--edge)','stroke-width':2},btn); txt(btn,{x:466,y:259,s:22,cls:'t-inv',text:'تحقّق'});
      gsap.set(btn,{opacity:.45}); return {cols,pct,btn}; },
    beats:[
      { say:'دورك الآن. كل عمود فيه عشرة مربعات. اضغط الأعمدة لتلوّن أربعين في المئة، ثم اضغط تحقّق.', run:c=>tl().from(c.cols.map(x=>x.g),{opacity:0,y:20,stagger:.05,duration:.3}),
        wait:c=>new Promise(res=>{ const upd=()=>{ const n=c.cols.filter(x=>x.on).length; c.pct.textContent=AD(n*10)+'٪'; gsap.to(c.btn,{opacity:n?1:.45,duration:.2}); };
          c.cols.forEach(col=>{ const tog=()=>{ col.on=!col.on; col.g.setAttribute('aria-pressed',String(col.on)); gsap.to(col.fs,{opacity:col.on?1:0,duration:.18,stagger:{each:.02,from:col.on?'end':'start'}}); upd(); };
            col.g.addEventListener('click',tog); col.g.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); tog(); } }); });
          const chk=()=>{ const n=c.cols.filter(x=>x.on).length; if(!n) return; c.cols.forEach(x=>x.g.style.pointerEvents='none'); res(n===4); };
          c.btn.addEventListener('click',chk); c.btn.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); chk(); } }); }),
        right:'ممتاز! أربعة أعمدة من عشرة، أي أربعون مربعًا من مئة.', wrong:'قريب! أربعون في المئة تعني أربعين مربعًا من مئة، أي أربعة أعمدة كاملة. هكذا.',
        after:(c,ok)=>{ const t=tl(); if(!ok){ c.cols.forEach((col,i)=>{ col.on=i<4; t.to(col.fs,{opacity:col.on?1:0,duration:.15},'<.05'); }); t.call(()=>c.pct.textContent='٤٠٪'); } const m=checkMark(c.pct.parentNode,560,125); t.from(m.g,{scale:0,transformOrigin:'50% 50%',duration:.4,ease:'back.out(2)'}).add(drawIn(m.pa,.4)); return t; } },
    ]},
  { t:'الخصم وفخ الرجوع', setup(s){ const bar=el('rect',{x:120,y:80,width:400,height:46,rx:10,class:'f-n3',stroke:'var(--edge)','stroke-width':2},s); const seg=el('rect',{x:420,y:80,width:100,height:46,rx:10,class:'f-pink',opacity:0},s);
      const lab=txt(s,{x:320,y:112,s:24,cls:'t-note',text:'٢٠٠ ريال'}); const tag=note(s,{x:560,y:60,w:110,h:48,c:'n1',text:'خصم ٢٥٪',size:20,rot:10}); const after=txt(s,{x:270,y:160,s:24,cls:'t-pri',text:'بعد الخصم: ١٥٠ ريال'});
      const g2=el('g',{},s); const vals=[['١٠٠',140],['١٢٠',320],['٩٦',500]].map(([v,x])=>note(g2,{x,y:262,w:110,h:64,c:'n0',text:v,size:32}));
      const a1=arrow(g2,200,236,262,236,'s-pri',-26), a2=arrow(g2,380,236,442,236,'s-pink',-26); const l1=txt(g2,{x:230,y:208,s:18,cls:'t-pri',text:'+٢٠٪'}), l2=txt(g2,{x:410,y:208,s:18,cls:'t-hand',text:'−٢٠٪ من ١٢٠'});
      const ring=el('ellipse',{cx:500,cy:262,rx:72,ry:44,class:'s-pink'},g2);
      gsap.set([bar,lab,tag,after,g2],{opacity:0}); gsap.set(ring,{opacity:0}); return {bar,seg,lab,tag,after,g2,vals,a1,a2,l1,l2,ring}; },
    beats:[
      { say:'قميص سعره مئتا ريال، وعليه خصم خمسة وعشرين في المئة.', run:c=>tl().to([c.bar,c.lab],{opacity:1,duration:.4}).fromTo(c.bar,{attr:{width:0}},{attr:{width:400},duration:.8,ease:'power2.out'},'<').fromTo(c.tag,{opacity:0,rotation:-30},{opacity:1,rotation:10,duration:.7,ease:'elastic.out(1,.5)'}) },
      { say:'ربع المئتين خمسون، نقطعها من السعر، فيبقى مئة وخمسون.', run:c=>tl().to(c.seg,{opacity:1,duration:.3}).to(c.seg,{x:40,y:40,rotation:12,opacity:0,transformOrigin:'50% 50%',duration:.9,ease:'power2.in'},'+=.4').to(c.bar,{attr:{width:300},duration:.5},'<.3').to(c.lab,{attr:{x:270},duration:.5},'<').call(()=>c.lab.textContent='١٥٠ ريال').to(c.after,{opacity:1,duration:.4}) },
      { say:'وانتبه لفخ شهير: زيادة عشرين في المئة ثم نقص عشرين في المئة لا يعيدك للأصل.', run:c=>{ const t=tl().to(c.g2,{opacity:1,duration:.2}); c.vals.forEach((v,i)=>{ t.fromTo(v,{opacity:0,y:20},{opacity:1,y:0,duration:.4},i?'+=.5':'<'); if(i<2){ const a=i?c.a2:c.a1; t.add(drawIn(a.pa,.5)).fromTo(a.hp,{opacity:0},{opacity:1,duration:.1}).fromTo(i?c.l2:c.l1,{opacity:0},{opacity:1,duration:.3}); } }); return t; } },
      { say:'لأن النقص يُحسب من المئة والعشرين لا من المئة، فالنتيجة ستة وتسعون.', run:c=>tl().set(c.ring,{opacity:1}).add(drawIn(c.ring,.9)).to(c.vals[2],{scale:1.12,transformOrigin:'50% 50%',yoyo:true,repeat:1,duration:.25}) },
    ]},
  ],
  quiz:[
    {q:'كم ١٥٪ من ٤٠٠؟', o:['٤٠','٦٠','٧٥','١٥'], a:1, e:'١٠٪ من ٤٠٠ = ٤٠، و٥٪ نصفها = ٢٠، والمجموع ٦٠.'},
    {q:'سعر ٨٠ ريالًا بعد خصم ٢٥٪ يصبح:', o:['٥٥ ريالًا','٦٠ ريالًا','٢٠ ريالًا','٦٥ ريالًا'], a:1, e:'ربع ٨٠ = ٢٠، و٨٠ − ٢٠ = ٦٠.'},
    {q:'زاد عددٌ ١٠٪ ثم نقص ١٠٪. النتيجة مقارنة بالأصل:', o:['تساويه','أكثر منه بـ ١٪','أقل منه بـ ١٪','أقل منه بـ ١٠٪'], a:2, e:'١٠٠ ← ١١٠ ← ٩٩، أي أقل بـ ١٪ لأن النقص من ١١٠.'},
  ]},

/* ---------------- 2. equations as a balance ---------------- */
balance:{ key:'balance', sk:'algebra', ord:10, area:'q', title:'المعادلة ميزان', min:'٤ دقائق', level:'تأسيس',
  goals:['ترى المعادلة كميزان متوازن','تطبّق قاعدة: ما تفعله في طرف افعله في الآخر','تحل معادلة من خطوتين','تتحقق من الحل بالتعويض'],
  scenes:[
  { t:'المعادلة ميزان', setup(s){ const sc=makeScale(s); const eq=txt(s,{x:320,y:52,s:34,dir:'ltr',text:'س + ٣ = ٧'}); gsap.set(eq,{opacity:0}); gsap.set(sc.g,{opacity:0}); return {sc,eq}; },
    beats:[
      { say:'المعادلة ميزانٌ متوازن: الطرفان متساويان دائمًا.', run:c=>tl().to(c.sc.g,{opacity:1,duration:.4}).add(c.sc.tilt(9,.5,'power2.out')).add(c.sc.tilt(0,1.4)) },
      { say:'في الكفة اليسرى صندوقٌ مجهول نسمّيه سين ومعه ثلاثة أوزان، وفي اليمنى سبعة أوزان.', run:c=>{ const L=c.sc.L,R=c.sc.R; const b=xbox(L); const w1=[1,2,3].map(()=>weight(L)); const w2=[1,2,3,4,5,6,7].map(()=>weight(R)); layout(L); layout(R);
          return tl().from(b,{y:'-=180',opacity:0,duration:.6,ease:'bounce.out'}).from(w1,{y:'-=160',opacity:0,stagger:.12,duration:.45,ease:'bounce.out'}).from(w2,{y:'-=160',opacity:0,stagger:.1,duration:.45,ease:'bounce.out'},'<.3').to(c.eq,{opacity:1,duration:.5}); } },
    ]},
  { t:'ما تفعله هنا افعله هناك', setup(s){ const sc=makeScale(s); const b=xbox(sc.L); const lw=[1,2,3].map(()=>weight(sc.L)); const rw=[1,2,3,4,5,6,7].map(()=>weight(sc.R)); layout(sc.L); layout(sc.R);
      const eq=txt(s,{x:320,y:52,s:34,dir:'ltr',text:'س + ٣ = ٧'}); const ne=txt(s,{x:320,y:96,s:26,cls:'t-bad',text:'اختلّ التوازن!'}); gsap.set(ne,{opacity:0});
      const res=note(s,{x:320,y:60,w:170,h:64,c:'n0',text:'س = ٤',size:34,rot:-3}); gsap.set(res,{opacity:0}); return {sc,b,lw,rw,eq,ne,res}; },
    beats:[
      { say:'نريد أن يبقى الصندوق وحده، فلنرفع الأوزان الثلاثة من اليسار.', run:c=>tl().to(c.lw,{y:'-=140',opacity:0,stagger:.12,duration:.5,ease:'power2.in'}).add(c.sc.tilt(14),'-=.1') },
      { say:'اختلّ الميزان! لأننا غيّرنا طرفًا واحدًا فقط.', run:c=>tl().to(c.ne,{opacity:1,duration:.3}).to(c.sc.g,{x:6,duration:.07,yoyo:true,repeat:5}) },
      { say:'نرفع ثلاثة من اليمين أيضًا، فيعود التوازن: سين يساوي أربعة.', run:c=>tl().to(c.ne,{opacity:0,duration:.2}).to(c.rw.slice(4),{y:'-=140',opacity:0,stagger:.12,duration:.5,ease:'power2.in'}).add(c.sc.tilt(0)).to(c.eq,{opacity:0,duration:.3},'<').fromTo(c.res,{opacity:0,scale:.3},{opacity:1,scale:1,transformOrigin:'50% 50%',duration:.6,ease:'back.out(2)'}) },
    ]},
  { t:'القسمة على الطرفين', setup(s){ const sc=makeScale(s); const bs=[xbox(sc.L),xbox(sc.L)]; const rw=Array.from({length:10},()=>weight(sc.R)); layout(sc.L); layout(sc.R);
      const eq=txt(s,{x:320,y:52,s:34,dir:'ltr',text:'٢س = ١٠'}); const res=note(s,{x:320,y:60,w:170,h:64,c:'n2',text:'س = ٥',size:34,rot:3}); gsap.set(res,{opacity:0}); return {sc,bs,rw,eq,res}; },
    beats:[
      { say:'هنا صندوقان متماثلان يوازنان عشرة أوزان.', run:c=>tl().from(c.bs,{opacity:0,y:'-=160',stagger:.2,duration:.5,ease:'bounce.out'}).from(c.rw,{opacity:0,y:'-=160',stagger:.07,duration:.4,ease:'bounce.out'},'<.2') },
      { say:'نقسم الطرفين على اثنين: نُبقي صندوقًا واحدًا، ونصف الأوزان، أي خمسة.', run:c=>tl().to(c.bs[1],{x:'-=60',y:'-=120',opacity:0,duration:.6,ease:'power2.in'}).to(c.rw.slice(5),{y:'-=140',opacity:0,stagger:.08,duration:.45,ease:'power2.in'},'<').add(c.sc.tilt(0)).to(c.eq,{opacity:0,duration:.3}).fromTo(c.res,{opacity:0,scale:.3},{opacity:1,scale:1,transformOrigin:'50% 50%',duration:.6,ease:'back.out(2)'}) },
    ]},
  { t:'دورك: الخطوة الأولى', interactive:true, setup(s){ const eq=txt(s,{x:320,y:72,s:40,dir:'ltr',text:'٣س + ٢ = ١٤'}); const ask=txt(s,{x:320,y:112,s:20,cls:'t-ink2',text:'ما الخطوة الأولى الصحيحة؟'});
      const opts=['اطرح ٢ من الطرفين','اقسم الطرف الأيسر فقط على ٣','اطرح ٢ من الطرف الأيسر فقط'].map((t,i)=>{ const g=el('g',{class:'hot',tabindex:0,role:'button','aria-label':t},s); const y=140+i*62; el('rect',{x:124,y:y+4,width:400,height:50,rx:12,class:'f-edge'},g); const r=el('rect',{x:120,y,width:400,height:50,rx:12,class:'f-surface hot-ring',stroke:'var(--edge)','stroke-width':2},g); txt(g,{x:320,y:y+33,s:21,text:t}); return {g,r}; });
      const steps=el('g',{},s); const s1=txt(steps,{x:320,y:170,s:34,dir:'ltr',cls:'t-ink',text:'٣س = ١٢'}), s2=note(steps,{x:320,y:250,w:170,h:64,c:'n0',text:'س = ٤',size:34,rot:-3}); gsap.set([s1,s2],{opacity:0});
      return {eq,ask,opts,steps,s1,s2}; },
    beats:[
      { say:'دورك. في المعادلة ثلاثة سين زائد اثنين يساوي أربعة عشر، ما الخطوة الأولى الصحيحة؟', run:c=>tl().from(c.eq,{opacity:0,y:-20,duration:.4}).from(c.opts.map(o=>o.g),{opacity:0,x:40,stagger:.15,duration:.35}),
        wait:c=>new Promise(res=>{ c.opts.forEach((o,i)=>{ const pick=()=>{ c.opts.forEach(x=>x.g.style.pointerEvents='none'); o.r.setAttribute('class',(i===0?'f-oksoft':'f-badsoft')+' hot-ring'); if(i!==0) c.opts[0].r.setAttribute('class','f-oksoft hot-ring'); res(i===0); }; o.g.addEventListener('click',pick); o.g.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); pick(); } }); }); }),
        right:'صحيح. نطرح اثنين من الطرفين فيصبح ثلاثة سين يساوي اثني عشر، ثم نقسم على ثلاثة: سين يساوي أربعة.',
        wrong:'هذه الخطوة تغيّر طرفًا واحدًا فتكسر التوازن. الصحيح أن نطرح اثنين من الطرفين، ثم نقسم على ثلاثة، فيكون سين أربعة.',
        after:c=>tl().to([c.ask,...c.opts.map(o=>o.g)],{opacity:0,duration:.4,delay:.8}).to(c.s1,{opacity:1,duration:.5}).fromTo(c.s2,{opacity:0,scale:.3},{opacity:1,scale:1,transformOrigin:'50% 50%',duration:.6,ease:'back.out(2)'},'+=1.2') },
    ]},
  { t:'تحقّق بالتعويض', setup(s){ const a=txt(s,{x:320,y:110,s:40,dir:'ltr',text:'٣ × ٤ + ٢'}); const b=txt(s,{x:320,y:180,s:40,dir:'ltr',cls:'t-pri',text:'= ١٤'}); const m=checkMark(s,440,168,1.2);
      const tip=note(s,{x:320,y:275,w:420,h:70,c:'n3',text:'في الاختيار من متعدد: جرّب التعويض بالخيارات',size:19,rot:-1.5}); gsap.set([a,b,m.g,tip],{opacity:0}); return {a,b,m,tip}; },
    beats:[
      { say:'بعد الحل عوّض لتتأكد: ثلاثة في أربعة زائد اثنين.', run:c=>tl().fromTo(c.a,{opacity:0,y:20},{opacity:1,y:0,duration:.5}) },
      { say:'يساوي أربعة عشر، والطرفان متساويان، فالحل صحيح.', run:c=>tl().to(c.b,{opacity:1,duration:.4}).set(c.m.g,{opacity:1}).from(c.m.g,{scale:0,transformOrigin:'50% 50%',duration:.4,ease:'back.out(2)'}).add(drawIn(c.m.pa,.4)) },
      { say:'وفي الاختيار من متعدد، التعويض بالخيارات أحيانًا أسرع من الحل نفسه.', run:c=>tl().fromTo(c.tip,{opacity:0,y:40},{opacity:1,y:0,duration:.6,ease:'back.out(1.6)'}) },
    ]},
  ],
  quiz:[
    {q:'إذا كان س − ٥ = ٩ فإن س =', o:['٤','١٤','٤٥','−٤'], a:1, e:'نضيف ٥ للطرفين: سين = ٩ + ٥ = ١٤.'},
    {q:'إذا كان ٤س = ٢٨ فإن س =', o:['٢٤','٣٢','٧','١١٢'], a:2, e:'نقسم الطرفين على ٤: سين = ٧.'},
    {q:'إذا كان ٢س + ٦ = ٢٠ فإن س =', o:['٧','١٣','١٠','٤'], a:0, e:'نطرح ٦: ٢س = ١٤، ثم نقسم على ٢: سين = ٧.'},
  ]},

/* ---------------- 3. verbal analogy ---------------- */
analogy:{ key:'analogy', sk:'analogy', ord:10, area:'v', title:'التناظر اللفظي: ابنِ الجسر', min:'٤ دقائق', level:'تأسيس',
  goals:['تفهم أن التناظر سؤال عن العلاقة لا عن الكلمات','تبني جملة جسر قصيرة','تختبر كل خيار بالجسر نفسه','تنتبه لاتجاه العلاقة'],
  scenes:[
  { t:'ما هو التناظر؟', setup(s){ const a=note(s,{x:200,y:170,w:150,h:90,c:'n0',text:'قلم',size:40,rot:-4}), b=note(s,{x:440,y:170,w:150,h:90,c:'n3',text:'كتابة',size:36,rot:3});
      const col=txt(s,{x:320,y:186,s:48,text:':'}); const ar=arrow(s,405,120,235,120,'s-pink',-70); const lab=txt(s,{x:320,y:52,s:26,cls:'t-hand',text:'ما العلاقة؟'}); gsap.set([a,b,col,ar.hp,lab],{opacity:0}); gsap.set(ar.pa,{opacity:0}); return {a,b,col,ar,lab}; },
    beats:[
      { say:'في سؤال التناظر تُعطى كلمتين بينهما علاقة، والمطلوب زوجٌ آخر بينهما العلاقة نفسها.', run:c=>tl().fromTo(c.a,{opacity:0,y:-140,rotation:-25},{opacity:1,y:0,rotation:-4,duration:.8,ease:'bounce.out'}).to(c.col,{opacity:1,duration:.3}).fromTo(c.b,{opacity:0,y:-140,rotation:25},{opacity:1,y:0,rotation:3,duration:.8,ease:'bounce.out'},'<') },
      { say:'والسر: لا تنظر للكلمات نفسها، بل للعلاقة بينها.', run:c=>tl().set(c.ar.pa,{opacity:1}).add(drawIn(c.ar.pa,.8)).to(c.ar.hp,{opacity:1,duration:.1}).fromTo(c.lab,{opacity:0,scale:.6},{opacity:1,scale:1,transformOrigin:'50% 50%',duration:.5,ease:'back.out(2)'}) },
    ]},
  { t:'ابنِ الجملة الجسر', setup(s){ const words=['القلم','أداةٌ','تُستخدم','لـ','الكتابة']; const xs=[520,420,315,232,160]; const ws=words.map((w,i)=>txt(s,{x:xs[i],y:150,s:38,cls:i===0||i===4?'t-pri':'t-ink',text:w}));
      const ul=el('path',{d:'M580 172 Q340 190 110 172',class:'s-pink'},s); const chip=note(s,{x:320,y:250,w:240,h:62,c:'n2',text:'أداة ← وظيفتها',size:26,rot:-2}); gsap.set([...ws,chip],{opacity:0}); gsap.set(ul,{opacity:0}); return {ws,ul,chip}; },
    beats:[
      { say:'حوّل العلاقة إلى جملة قصيرة واضحة نسمّيها: الجسر.', run:c=>tl().fromTo(c.ws,{opacity:0,y:24},{opacity:1,y:0,stagger:.35,duration:.4,ease:'back.out(2)'}) },
      { say:'القلم أداةٌ تُستخدم للكتابة. إذن العلاقة: أداة ووظيفتها.', run:c=>tl().set(c.ul,{opacity:1}).add(drawIn(c.ul,.7)).fromTo(c.chip,{opacity:0,y:30},{opacity:1,y:0,duration:.5,ease:'back.out(2)'}) },
    ]},
  { t:'اختبر الخيارات بالجسر', setup(s){ txt(s,{x:320,y:60,s:22,cls:'t-ink2',text:'الـ ____ أداةٌ تُستخدم لـ ____'});
      const slotA=el('rect',{x:360,y:84,width:120,height:48,rx:10,fill:'transparent',stroke:'var(--pri)','stroke-width':2.5,'stroke-dasharray':'6 6'},s), slotB=el('rect',{x:150,y:84,width:120,height:48,rx:10,fill:'transparent',stroke:'var(--pri)','stroke-width':2.5,'stroke-dasharray':'6 6'},s);
      txt(s,{x:315,y:116,s:20,cls:'t-ink2',text:'تُستخدم لـ'});
      const pairs=[['مقص','قص','n0',true],['كتاب','مكتبة','n1',false],['شجرة','ورقة','n3',false]].map(([a,b,col,ok],i)=>{ const g=el('g',{},s); const x=[500,320,140][i];
        const na=note(g,{x:x+42,y:280,w:80,h:52,c:col,text:a,size:22}), nb=note(g,{x:x-42,y:280,w:80,h:52,c:col,text:b,size:22}); txt(g,{x,y:287,s:22,text:':'}); return {g,na,nb,ok,x}; });
      return {pairs,slotA,slotB}; },
    beats:[0,1,2].map(i=>({
      say:['نضع كل خيار في الجسر نفسه. مقص وقص: المقص أداةٌ تُستخدم للقص. يصلح.','كتاب ومكتبة: الكتاب أداةٌ تُستخدم للمكتبة؟ لا يستقيم.','شجرة وورقة: علاقة كلٍّ وجزء، لا أداة ووظيفة. نستبعدها.'][i],
      run:c=>{ const p=c.pairs[i]; const t=tl(); const dxA=420-(p.x+42), dxB=210-(p.x-42);
        t.to(p.na,{x:dxA,y:-172,duration:.6,ease:'power2.inOut'}).to(p.nb,{x:dxB,y:-172,duration:.6,ease:'power2.inOut'},'<.1');
        if(p.ok){ const m=checkMark(c.pairs[0].g.parentNode,560,108); t.from(m.g,{scale:0,transformOrigin:'50% 50%',duration:.35,ease:'back.out(2)'}).add(drawIn(m.pa,.35)).to(m.g,{opacity:0,duration:.3,delay:1}); t.to([p.na,p.nb],{x:0,y:0,duration:.5}).call(()=>el('rect',{x:p.x-86,y:250,width:172,height:62,rx:12,fill:'none',stroke:'var(--ok)','stroke-width':4},p.g)); }
        else { const m=crossMark(c.pairs[0].g.parentNode,560,108); t.to([p.na,p.nb],{x:'+=8',duration:.06,yoyo:true,repeat:5}).from(m.g,{scale:0,transformOrigin:'50% 50%',duration:.3},'<').to(m.g,{opacity:0,duration:.3,delay:.9}).to([p.na,p.nb],{x:0,y:0,duration:.5}).to(p.g,{opacity:.35,duration:.3}); }
        return t; } })) },
  { t:'دورك: طبيب ومستشفى', interactive:true, setup(s){ const a=note(s,{x:230,y:62,w:130,h:58,c:'n0',text:'مستشفى',size:24,rot:2}), b=note(s,{x:410,y:62,w:130,h:58,c:'n0',text:'طبيب',size:26,rot:-3}); txt(s,{x:320,y:72,s:32,text:':'});
      const hint=txt(s,{x:320,y:128,s:20,cls:'t-hand',text:'الجسر: يعمل الطبيب في المستشفى'});
      const opts=[['معلّم','مدرسة'],['كتاب','قارئ'],['ماء','عطش'],['قلم','حبر']].map(([x,y],i)=>{ const g=el('g',{class:'hot',tabindex:0,role:'button','aria-label':x+' : '+y},s); const cx=[455,185][i%2], cy=[178,258][Math.floor(i/2)];
        el('rect',{x:cx-118,y:cy-26,width:236,height:56,rx:12,class:'f-edge'},g); const r=el('rect',{x:cx-122,y:cy-30,width:236,height:56,rx:12,class:'f-surface hot-ring',stroke:'var(--edge)','stroke-width':2},g); txt(g,{x:cx-4,y:cy+6,s:23,text:x+' : '+y}); return {g,r}; });
      return {opts,hint}; },
    beats:[
      { say:'دورك. طبيب ومستشفى. ابنِ الجسر في ذهنك: يعمل الطبيب في المستشفى. أيّ زوج يطابقه؟', run:c=>tl().from(c.hint,{opacity:0,duration:.4}).from(c.opts.map(o=>o.g),{opacity:0,y:20,stagger:.12,duration:.35}),
        wait:c=>new Promise(res=>{ c.opts.forEach((o,i)=>{ const pick=()=>{ c.opts.forEach(x=>x.g.style.pointerEvents='none'); o.r.setAttribute('class',(i===0?'f-oksoft':'f-badsoft')+' hot-ring'); if(i) c.opts[0].r.setAttribute('class','f-oksoft hot-ring'); res(i===0); }; o.g.addEventListener('click',pick); o.g.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); pick(); } }); }); }),
        right:'أحسنت. يعمل المعلم في المدرسة: العلاقة نفسها، شخصٌ ومكان عمله.',
        wrong:'جرّب الجسر: يعمل الكتاب في القارئ؟ لا. الزوج الوحيد الذي يصلح: يعمل المعلم في المدرسة.',
        after:c=>tl().to(c.opts[0].g,{scale:1.06,transformOrigin:'50% 50%',yoyo:true,repeat:1,duration:.25}) },
    ]},
  { t:'فخ الاتجاه', setup(s){ const p1=el('g',{},s), p2=el('g',{},s);
      note(p1,{x:240,y:110,w:120,h:60,c:'n2',text:'دجاجة',size:24,rot:2}); note(p1,{x:400,y:110,w:120,h:60,c:'n2',text:'بيضة',size:26,rot:-2}); txt(p1,{x:320,y:120,s:30,text:':'});
      const a2=note(p2,{x:400,y:250,w:120,h:60,c:'n1',text:'دجاجة',size:24,rot:-2}), b2=note(p2,{x:240,y:250,w:120,h:60,c:'n1',text:'بيضة',size:26,rot:2}); txt(p2,{x:320,y:260,s:30,text:':'});
      const lab1=txt(s,{x:320,y:58,s:20,cls:'t-hand',text:'البيضة تخرج من الدجاجة'}); const x=crossMark(s,540,250); const ar=arrow(s,470,190,170,190,'s-pri',-10);
      gsap.set([p1,p2,lab1,x.g,ar.hp],{opacity:0}); gsap.set(ar.pa,{opacity:0}); return {p1,p2,a2,b2,lab1,x,ar}; },
    beats:[
      { say:'انتبه لترتيب الكلمتين. بيضة ودجاجة: البيضة تخرج من الدجاجة.', run:c=>tl().fromTo(c.p1,{opacity:0,y:-40},{opacity:1,y:0,duration:.5}).to(c.lab1,{opacity:1,duration:.4}) },
      { say:'فإذا جاء الخيار دجاجة وبيضة، فالعلاقة معكوسة، وهذا خطأ شائع.', run:c=>tl().to(c.p2,{opacity:1,duration:.3}).to(c.a2,{x:-160,duration:.6,ease:'power2.inOut'}).to(c.b2,{x:160,duration:.6,ease:'power2.inOut'},'<').to(c.x.g,{opacity:1,duration:.2}).from(c.x.g,{scale:0,transformOrigin:'50% 50%',duration:.35,ease:'back.out(2)'},'<') },
      { say:'اقرأ الجسر دائمًا بالترتيب نفسه: الكلمة الأولى ثم الثانية.', run:c=>tl().set(c.ar.pa,{opacity:1}).add(drawIn(c.ar.pa,.8)).to(c.ar.hp,{opacity:1,duration:.1}) },
    ]},
  ],
  quiz:[
    {q:'مِشرط : جرّاح', o:['كتاب : مكتبة','فرشاة : رسّام','سيارة : طريق','بحر : سمك'], a:1, e:'الجسر: المشرط أداة يستخدمها الجرّاح، والفرشاة أداة يستخدمها الرسّام.'},
    {q:'عطش : ماء', o:['نار : دخان','مطر : غيم','جوع : طعام','نوم : سرير'], a:2, e:'الجسر: العطش يزول بالماء، والجوع يزول بالطعام.'},
    {q:'غصن : شجرة', o:['يد : إصبع','إصبع : يد','قلم : دفتر','باب : مفتاح'], a:1, e:'الغصن جزء من الشجرة، والإصبع جزء من اليد. «يد : إصبع» العلاقة نفسها لكن معكوسة.'},
  ]},
};

['percent','balance','analogy'].forEach(k=>XP.add(LESSONS[k]));
})();
/* English explainers: algebra */
(function(){ if(!window.XP||!XP.ready) return;
/* keep text readable in dark mode: light fills get note ink, dark fills get stage ink */
const LIGHT=['n0','n1','n2','n3','butter','sky'], DARKF=['surface','surface2','prisoft','pinksoft'];
const ADD=L=>{ L.scenes.forEach(sc=>{ for(const k in (sc.items||{})){ const it=sc.items[k]; if((it.type==='box'||it.type==='circle')&&LIGHT.includes(it.c)&&!it.cls) it.cls='t-note'; if(it.type==='note'&&DARKF.includes(it.c)&&!it.cls) it.cls='t-ink'; } }); XP.add(L); };
/* 4-option asks: the engine places option 0 in the right-hand column, so swap each pair to read left to right */
const L4=(opts,a)=>({ opts, a });

/* ---------- 0. the equation is a balance (re-created in the DSL) ---------- */
/* scale: pivot at (320,130), pans hang at x=155 (left) and x=485 (right), pan tops at y=208 */
const SCALE=(on)=>{ const s=on?{show0:true}:{}; return {
  base:{type:'poly',points:'270,334 370,334 338,314 302,314',c:'ink',...s},
  post:{type:'box',x:315,y:130,w:10,h:186,rx:4,c:'ink',stroke:false,...s},
  lsA:{type:'line',x1:155,y1:130,x2:93,y2:208,...s}, lsB:{type:'line',x1:155,y1:130,x2:217,y2:208,...s},
  lpan:{type:'poly',points:'81,208 229,208 207,228 103,228',c:'surface',...s},
  rsA:{type:'line',x1:485,y1:130,x2:423,y2:208,...s}, rsB:{type:'line',x1:485,y1:130,x2:547,y2:208,...s},
  rpan:{type:'poly',points:'411,208 559,208 537,228 433,228',c:'surface',...s},
  beam:{type:'box',x:150,y:124,w:340,h:12,rx:6,c:'ink',stroke:false,...s},
  beamT:{type:'box',x:150,y:124,w:340,h:12,rx:6,c:'ink',stroke:false,rot:10},
  piv:{type:'circle',cx:320,cy:130,r:10,c:'butter',...s},
}; };
const XB=(x,on)=>({type:'box',x,y:169,w:38,h:38,rx:6,c:'pri',text:'x',s:22,cls:'t-inv',...(on?{show0:true}:{})});
const WT=(x,y,on)=>({type:'box',x,y,w:22,h:22,rx:5,c:'butter',...(on?{show0:true}:{})});
const LEFT=['lsA','lsB','lpan'], RIGHT=['rsA','rsB','rpan'];
const mv=(keys,dy)=>Object.fromEntries(keys.map(k=>[k,[0,dy]]));

ADD({ key:'en-balance', lang:'en', sk:'algebra', ord:10, title:'An equation is a balance', min:'4 min',
  goals:['See an equation as a balanced scale','Apply the rule: whatever you do to one side, do to the other','Solve a two-step equation','Check a solution by substituting'],
  scenes:[
  { t:'An equation is a balance',
    items:Object.assign(SCALE(false),{
      xb:XB(98), lw1:WT(142,185), lw2:WT(166,185), lw3:WT(190,185),
      rw1:WT(438,185), rw2:WT(462,185), rw3:WT(486,185), rw4:WT(510,185), rw5:WT(450,161), rw6:WT(474,161), rw7:WT(498,161),
      ll:{type:'text',x:155,y:264,s:20,hand:true,text:'left side'},
      rl:{type:'text',x:485,y:264,s:20,hand:true,text:'right side'},
      eq:{type:'eq',x:320,y:74,s:34,text:'x + 3 = 7'},
    }),
    beats:[
      {say:'An equation is like a balance scale. Both sides always weigh exactly the same.', show:['base','post','beam','piv','lsA','lsB','lpan','rsA','rsB','rpan'], gap:.08},
      {say:'On the left pan sits a mystery box we call x, along with three small weights.', show:['xb','lw1','lw2','lw3','ll'], gap:.2},
      {say:'On the right pan sit seven weights. So x plus three equals seven.', show:['rw1','rw2','rw3','rw4','rw5','rw6','rw7','rl','eq'], gap:.12},
    ]},
  { t:'Same on both sides',
    items:Object.assign(SCALE(true),{
      xb:XB(98,true), lw1:WT(142,185,true), lw2:WT(166,185,true), lw3:WT(190,185,true),
      rw1:WT(438,185,true), rw2:WT(462,185,true), rw3:WT(486,185,true), rw4:WT(510,185,true), rw5:WT(450,161,true), rw6:WT(474,161,true), rw7:WT(498,161,true),
      eq:{type:'eq',x:320,y:74,s:34,text:'x + 3 = 7',show0:true},
      bad:{type:'text',x:155,y:245,s:24,cls:'t-bad',text:'Out of balance!'},
      res:{type:'note',x:320,y:70,w:160,h:56,c:'n0',text:'x = 4',size:32,rot:-3},
      rule:{type:'note',x:135,y:305,w:230,h:56,c:'n2',text:'Same on both sides',size:18,rot:-2},
    }),
    beats:[
      {say:'We want the box on its own, so let’s lift the three weights off the left pan.', hide:['lw1','lw2','lw3','beam'], show:['beamT'], move:Object.assign(mv([...LEFT,'xb'],-29),mv([...RIGHT,'rw1','rw2','rw3','rw4','rw5','rw6','rw7'],29))},
      {say:'The scale tips! We changed only one side, so it’s no longer equal.', show:['bad'], hl:['beamT']},
      {say:'Now lift three weights off the right pan too. The balance comes back, and x equals four.', hide:['rw5','rw6','rw7','beamT','bad','eq'], show:['beam','res','rule'], move:Object.assign(mv([...LEFT,'xb'],29),mv([...RIGHT,'rw1','rw2','rw3','rw4'],-29)), gap:.4},
    ]},
  { t:'Divide both sides',
    items:Object.assign(SCALE(true),{
      xb1:XB(114), xb2:XB(158),
      rw1:WT(426,185), rw2:WT(450,185), rw3:WT(474,185), rw4:WT(498,185), rw5:WT(522,185),
      rw6:WT(426,161), rw7:WT(450,161), rw8:WT(474,161), rw9:WT(498,161), rw10:WT(522,161),
      eq:{type:'eq',x:320,y:74,s:34,text:'2x = 10'},
      d1:{type:'text',x:155,y:266,s:24,hand:true,text:'÷ 2'},
      d2:{type:'text',x:485,y:266,s:24,hand:true,text:'÷ 2'},
      res:{type:'note',x:320,y:70,w:160,h:56,c:'n2',text:'x = 5',size:32,rot:3},
    }),
    beats:[
      {say:'Here, two identical boxes balance ten weights.', show:['eq','xb1','xb2','rw1','rw2','rw3','rw4','rw5','rw6','rw7','rw8','rw9','rw10'], gap:.08},
      {say:'Let’s divide both sides by two.', show:['d1','d2'], gap:.3},
      {say:'One box stays on the left, and half the weights, five, stay on the right. So x equals five.', hide:['xb2','rw6','rw7','rw8','rw9','rw10','eq'], move:{xb1:[22,0]}, show:['res']},
    ]},
  { t:'Your turn: first step',
    items:{
      eq:{type:'eq',x:320,y:84,s:38,text:'3x + 2 = 14'},
      q:{type:'text',x:320,y:114,s:20,cls:'t-ink2',text:'What is the correct first step?'},
      s1:{type:'eq',x:320,y:180,s:34,text:'3x = 12'},
      s2:{type:'note',x:320,y:255,w:160,h:60,c:'n0',text:'x = 4',size:32,rot:-3},
    },
    beats:[
      {say:'Your turn. Here is three x plus two equals fourteen.', show:['eq']},
      {say:'What is the correct first step?', show:['q']},
    ],
    ask:{ opts:['Subtract 2 from both sides','Divide only the left side by 3','Subtract 2 from the left side only'], a:0, column:true, s:20,
      right:'Correct. Subtract two from both sides to get three x equals twelve. Then divide by three: x equals four.',
      wrong:'That changes only one side and breaks the balance. Subtract two from both sides, then divide by three. x equals four.',
      show:['s1','s2'] }},
  { t:'Check by substituting',
    items:{
      a:{type:'eq',x:320,y:110,s:40,text:'3 × 4 + 2'},
      b:{type:'eq',x:320,y:180,s:40,cls:'t-pri',text:'= 14'},
      ck:{type:'check',x:410,y:168,s:1.1},
      tip:{type:'note',x:320,y:275,w:510,h:62,c:'n3',text:'Multiple choice? Try plugging in the options',size:18,rot:-1.5},
    },
    beats:[
      {say:'Always check your answer. Put four back in: three times four plus two.', show:['a']},
      {say:'That makes fourteen. Both sides match, so the solution is right.', show:['b','ck'], gap:.4},
      {say:'On multiple choice, plugging in the options can be even faster than solving.', show:['tip']},
    ]},
  ],
  quiz:[
    {q:'If x − 5 = 9, then x =', o:['4','14','45','−4'], a:1, e:'Add 5 to both sides: x = 9 + 5 = 14.'},
    {q:'If 4x = 28, then x =', o:['24','32','7','112'], a:2, e:'Divide both sides by 4: x = 7.'},
    {q:'If 2x + 6 = 20, then x =', o:['7','13','10','4'], a:0, e:'Subtract 6: 2x = 14, then divide by 2: x = 7.'},
  ]});

/* ---------- 1. variables and expressions ---------- */
ADD({ key:'en-al-vars', lang:'en', sk:'algebra', ord:5, title:'Variables and expressions', min:'3 min',
  goals:['Know what a variable like x means','Combine like terms','Simplify an algebraic expression','Substitute a value for the variable'],
  scenes:[
  { t:'What is a variable?',
    items:{
      bx:{type:'box',x:270,y:90,w:100,h:100,c:'prisoft',text:'x',s:56,cls:'t-pri'},
      lbl:{type:'text',x:320,y:225,s:22,cls:'t-ink2',text:'A closed box holding a number we don’t know yet'},
      n1:{type:'note',x:140,y:110,w:80,h:60,c:'n0',text:'3',size:30,rot:-5},
      n2:{type:'note',x:130,y:190,w:80,h:60,c:'n1',text:'7',size:30,rot:4},
      n3:{type:'note',x:500,y:150,w:80,h:60,c:'n3',text:'10',size:30,rot:-3},
      eq:{type:'eq',x:320,y:262,s:32,text:'3x = 3 × x'},
      m1:{type:'box',x:240,y:290,w:44,h:44,c:'prisoft',text:'x',s:22,cls:'t-pri'},
      m2:{type:'box',x:298,y:290,w:44,h:44,c:'prisoft',text:'x',s:22,cls:'t-pri'},
      m3:{type:'box',x:356,y:290,w:44,h:44,c:'prisoft',text:'x',s:22,cls:'t-pri'},
    },
    beats:[
      {say:'A variable is a letter holding the place of a number we don’t know yet, usually x.', show:['bx','lbl']},
      {say:'Think of it as a closed box. Inside could be three, seven or ten, depending on the problem.', show:['n1','n2','n3'], gap:.3},
      {say:'When we write three x, we mean three times x: three identical boxes.', hide:['n1','n2','n3','lbl'], show:['eq','m1','m2','m3'], gap:.25},
    ]},
  { t:'Like terms',
    items:{
      q:{type:'eq',x:320,y:105,s:40,text:'2x + 3x'},
      a1:{type:'box',x:134,y:140,w:52,h:52,c:'pinksoft',text:'x',s:24},
      a2:{type:'box',x:194,y:140,w:52,h:52,c:'pinksoft',text:'x',s:24},
      pl:{type:'text',x:287,y:178,s:34,text:'+'},
      b1:{type:'box',x:328,y:140,w:52,h:52,c:'sky',text:'x',s:24},
      b2:{type:'box',x:388,y:140,w:52,h:52,c:'sky',text:'x',s:24},
      b3:{type:'box',x:448,y:140,w:52,h:52,c:'sky',text:'x',s:24},
      res:{type:'note',x:320,y:245,w:170,h:62,c:'n0',text:'5x',size:36,rot:-2},
      e2:{type:'eq',x:220,y:335,s:28,text:'2x + 3y'},
      cr:{type:'cross',x:320,y:325,s:.8},
      e2t:{type:'text',x:440,y:335,s:22,hand:true,text:'can’t combine'},
    },
    beats:[
      {say:'Like terms share the same variable, such as two x and three x.', show:['q']},
      {say:'Two boxes and three boxes of the same kind...', show:['a1','a2','pl','b1','b2','b3'], gap:.2},
      {say:'make five boxes. So two x plus three x equals five x. Add the numbers in front and keep the x.', hide:['pl'], move:{a1:[37,0],a2:[37,0],b1:[-37,0],b2:[-37,0],b3:[-37,0]}, show:['res']},
      {say:'But x and y are different, so two x plus three y can’t be combined into one term.', show:['e2','cr','e2t']},
    ]},
  { t:'Simplifying',
    items:{
      ex:{type:'eq',x:320,y:105,s:40,text:'4x + 5 − x + 2'},
      l1:{type:'eq',x:320,y:175,s:30,cls:'t-pri',text:'4x − x = 3x'},
      l2:{type:'eq',x:320,y:225,s:30,cls:'t-ink2',text:'5 + 2 = 7'},
      res:{type:'note',x:320,y:292,w:200,h:62,c:'n3',text:'3x + 7',size:32,rot:2},
    },
    beats:[
      {say:'To simplify, group each kind: x terms together, and plain numbers together.', show:['ex']},
      {say:'Four x minus x is three x. A lone x just means one x.', show:['l1']},
      {say:'Five plus two is seven. So the simplified expression is three x plus seven.', show:['l2','res']},
    ]},
  { t:'Substitution',
    items:{
      g1:{type:'text',x:268,y:82,s:24,cls:'t-ink2',text:'If'},
      g2:{type:'eq',x:340,y:82,s:32,cls:'t-pri',text:'x = 4'},
      q:{type:'eq',x:320,y:126,s:34,text:'3x + 2 = ?'},
      w1:{type:'eq',x:320,y:215,s:36,text:'3 × 4 + 2 = 14'},
      tip:{type:'note',x:320,y:288,w:440,h:56,c:'n1',text:'The number in front multiplies x',size:20,rot:-1.5},
    },
    beats:[
      {say:'Substituting means opening the box and putting the number in place of x.', show:['g1','g2']},
      {say:'Your turn. If x equals four, what is three x plus two?', show:['q']},
    ],
    ask:{ ...L4(['34','14','12','9'],1),
      right:'Well done. Three times four is twelve, plus two makes fourteen.',
      wrong:'Three x means three times x, not a three beside a four. Three times four is twelve, plus two makes fourteen.',
      show:['w1','tip'] }},
  { t:'Simplify, then substitute',
    items:{
      e1:{type:'eq',x:320,y:110,s:38,text:'2x + 3x − 4x'},
      e2:{type:'eq',x:320,y:170,s:38,cls:'t-pri',text:'= x'},
      e3:{type:'box',x:180,y:205,w:280,h:54,c:'butter',text:'x = 10 → answer 10',s:22},
      tip:{type:'note',x:320,y:305,w:420,h:56,c:'n2',text:'Simplify first, then substitute',size:21,rot:-2},
    },
    beats:[
      {say:'On the test, simplify before you substitute. It saves a lot of work.', show:['e1','tip']},
      {say:'Two x plus three x minus four x is just x. So if x is ten, the answer is simply ten.', show:['e2','e3']},
    ]},
  ],
  quiz:[
    {q:'Simplify: 5x + 2 − 2x + 4', o:['3x + 6','7x + 6','3x + 2','9x'], a:0, e:'5x − 2x = 3x, and 2 + 4 = 6.'},
    {q:'If x = 3, what is 4x − 5?', o:['39','7','12','17'], a:1, e:'4 × 3 = 12, then 12 − 5 = 7.'},
    {q:'If x = 2 and y = 5, what is 3x + y?', o:['11','37','10','21'], a:0, e:'3 × 2 + 5 = 6 + 5 = 11.'},
  ]});

/* ---------- 2. exponents and roots ---------- */
ADD({ key:'en-al-exp', lang:'en', sk:'algebra', ord:20, title:'Exponents and roots', min:'4 min',
  goals:['See an exponent as repeated multiplication','Apply the product and power-of-a-power rules','Know that a zero exponent gives one','Find roots of perfect squares'],
  scenes:[
  { t:'Repeated multiplication',
    items:{
      pw:{type:'eq',x:150,y:160,s:76,cls:'t-pri',text:'2⁵'},
      ex:{type:'eq',x:410,y:135,s:32,text:'2 × 2 × 2 × 2 × 2'},
      res:{type:'eq',x:410,y:190,s:36,cls:'t-pri',text:'= 32'},
      nb:{type:'note',x:170,y:268,w:170,h:56,c:'n3',text:'Base: 2',size:22,rot:-2},
      ne:{type:'note',x:420,y:268,w:250,h:56,c:'n1',text:'Exponent: 5 times',size:22,rot:1.5},
    },
    beats:[
      {say:'An exponent means repeated multiplication. Two to the fifth is five twos multiplied together.', show:['pw','ex']},
      {say:'The big number is the base. The small raised exponent says how many times.', show:['nb','ne']},
      {say:'Step by step: two, four, eight, sixteen, thirty-two.', show:['res']},
    ]},
  { t:'Multiplying powers',
    items:{
      q:{type:'eq',x:320,y:100,s:42,text:'2³ × 2⁴'},
      x1:{type:'eq',x:320,y:165,s:28,text:'(2 × 2 × 2) × (2 × 2 × 2 × 2)'},
      r:{type:'eq',x:320,y:225,s:42,cls:'t-pri',text:'= 2⁷'},
      rule:{type:'note',x:320,y:298,w:420,h:58,c:'n0',text:'Same base → add the exponents',size:21,rot:-1.5},
    },
    beats:[
      {say:'What happens when we multiply powers of the same base, like two cubed times two to the fourth?', show:['q']},
      {say:'Unpack them: three twos, then four twos. Seven twos in all.', show:['x1']},
      {say:'So it’s two to the seventh. Same base: add the exponents.', show:['r','rule']},
    ]},
  { t:'Power of a power; zero',
    items:{
      pp:{type:'eq',x:170,y:110,s:40,text:'(3²)³'},
      pp2:{type:'eq',x:170,y:165,s:26,text:'3² × 3² × 3²'},
      pp3:{type:'eq',x:170,y:220,s:40,cls:'t-pri',text:'= 3⁶'},
      r2:{type:'note',x:160,y:292,w:280,h:56,c:'n2',text:'Multiply the exponents',size:19,rot:2},
      dv:{type:'line',x1:320,y1:85,x2:320,y2:325,cls:'s-line'},
      z1:{type:'eq',x:470,y:105,s:28,text:'2³ = 8'},
      z2:{type:'eq',x:470,y:147,s:28,text:'2² = 4'},
      z3:{type:'eq',x:470,y:189,s:28,text:'2¹ = 2'},
      z4:{type:'eq',x:470,y:237,s:38,cls:'t-pri',text:'2⁰ = 1'},
      zh:{type:'text',x:580,y:150,s:20,hand:true,text:'÷ 2'},
      r3:{type:'note',x:470,y:292,w:230,h:56,c:'n3',text:'Exponent 0 → 1',size:22,rot:-2},
    },
    beats:[
      {say:'Next, three squared, all cubed: that’s three squared, three times over.', show:['dv','pp','pp2']},
      {say:'Two plus two plus two is six, giving three to the sixth. So multiply the exponents.', show:['pp3','r2']},
      {say:'For a zero exponent, see the pattern: each step down halves the result.', show:['z1','z2','z3','zh'], gap:.35},
      {say:'Eight, four, two, then one. So two to the zero is one, as is any nonzero number to the zero.', show:['z4','r3']},
    ]},
  { t:'Square roots',
    items:{
      g:{type:'grid',x:90,y:90,rows:5,cols:5,cell:30,gap:3,fill:25,c:'prisoft'},
      gl:{type:'eq',x:172,y:292,s:26,text:'5 × 5 = 25'},
      q1:{type:'text',x:440,y:130,s:22,text:'What times itself gives 25?'},
      sq:{type:'eq',x:440,y:205,s:44,cls:'t-pri',text:'√25 = 5'},
      q2:{type:'eq',x:320,y:118,s:44,text:'√64 = ?'},
      a1:{type:'eq',x:320,y:215,s:40,cls:'t-pri',text:'8 × 8 = 64'},
      tip:{type:'note',x:320,y:290,w:320,h:56,c:'n0',text:'A root is not a half!',size:24,rot:-2},
    },
    beats:[
      {say:'A square root undoes squaring: which number, times itself, gives this one?', show:['q1']},
      {say:'Twenty-five cells make a square five on each side, so the square root of twenty-five is five.', show:['g','gl','sq']},
      {say:'Your turn. What is the square root of sixty-four?', hide:['g','gl','q1','sq'], show:['q2']},
    ],
    ask:{ ...L4(['32','8','16','6'],1),
      right:'Right. Eight times eight is sixty-four.',
      wrong:'Thirty-two is half of sixty-four, not its root. Eight times eight is sixty-four, so the root is eight.',
      show:['a1','tip'] }},
  { t:'Learn the squares',
    items:Object.assign({
      t1:{type:'eq',x:320,y:264,s:32,text:'2³ = 2 × 2 × 2 = 8'},
      t2:{type:'note',x:320,y:320,w:300,h:48,c:'n1',text:'not 2 × 3 = 6',size:22,rot:-1.5},
    }, (function(){ const o={};
      for(let i=1;i<=12;i++){ const r=Math.floor((i-1)/4), k=(i-1)%4; o['s'+i]={type:'box',x:62+k*132,y:72+r*50,w:120,h:40,c:r%2?'surface2':'prisoft',text:i+'² = '+(i*i),s:18,ltr:true}; }
      return o; })()),
    beats:[
      {say:'Learn the squares from one to twelve. They make roots quick on the test.', show:['s1','s2','s3','s4','s5','s6','s7','s8','s9','s10','s11','s12'], gap:.1},
      {say:'And watch the trap: two cubed is eight, not six.', show:['t1','t2']},
    ]},
  ],
  quiz:[
    {q:'3² × 3³ = ?', o:['3⁵','3⁶','9⁵','6⁵'], a:0, e:'Same base, so add the exponents: 2 + 3 = 5.'},
    {q:'(2³)² = ?', o:['2⁵','2⁶','2⁹','4³'], a:1, e:'Power of a power: multiply the exponents, 3 × 2 = 6, which is 64.'},
    {q:'√144 + 7⁰ = ?', o:['12','13','19','8'], a:1, e:'√144 = 12 and 7⁰ = 1, so the sum is 13.'},
  ]});

/* ---------- 3. sequences ---------- */
const row=(pre,xs,y,texts,cs,w=86,h=66,size=28)=>{ const o={}; xs.forEach((x,i)=>{ o[pre+(i+1)]={type:'note',x,y,w,h,c:cs[i]||'n0',text:texts[i],size,rot:[-3,2,-2,3,-1][i%5]}; }); return o; };
const X5=[110,220,330,440,550];
const arr=(pre,y,labels,last)=>{ const o={}; for(let i=0;i<4;i++) o[pre+(i+1)]={type:'arrow',x1:X5[i]+25,y1:y,x2:X5[i+1]-25,y2:y,bend:-30,text:labels,...(i===3&&last?{cls:'s-pink'}:{})}; return o; };
ADD({ key:'en-al-seq', lang:'en', sk:'algebra', ord:30, title:'Sequences and patterns', min:'4 min',
  goals:['Find a sequence’s rule from the step between terms','Tell arithmetic (constant difference) from geometric (constant ratio)','Find the next term and a missing term'],
  scenes:[
  { t:'Arithmetic sequences',
    items:Object.assign(row('t',X5,190,['3','7','11','15','?'],['n3','n3','n3','n3','n1']), arr('a',150,'+4',true), {
      nt:{type:'note',x:320,y:295,w:400,h:56,c:'n0',text:'Same difference → arithmetic',size:21,rot:-1.5},
    }),
    beats:[
      {say:'A sequence is a list of numbers that follows a fixed rule. Each number is called a term.', show:['t1','t2','t3','t4','t5'], gap:.2},
      {say:'Look at the step between terms, not each number alone. From three to seven, we add four.', show:['a1','a2','a3'], gap:.3},
      {say:'A constant difference makes it arithmetic. The next term is fifteen plus four: nineteen.', show:['a4','nt'], set:{t5:'19'}},
    ]},
  { t:'Negative differences',
    items:Object.assign(row('t',X5,190,['20','17','14','11','?'],['n2','n2','n2','n2','n1']), arr('a',150,'−3',true), {
      nt:{type:'note',x:320,y:295,w:380,h:56,c:'n0',text:'Negative, but still fixed',size:22,rot:1.5},
    }),
    beats:[
      {say:'The difference can be negative: twenty, seventeen, fourteen, eleven.', show:['t1','t2','t3','t4','t5'], gap:.2},
      {say:'We subtract three each time, so the next term is eight. The step just has to stay the same.', show:['a1','a2','a3','a4','nt'], gap:.25, set:{t5:'8'}},
    ]},
  { t:'Geometric sequences',
    items:Object.assign(row('g',X5,180,['2','6','18','54','?'],['n0','n0','n0','n0','n1']), arr('m',140,'×3',true), {
      d1:{type:'eq',x:165,y:255,s:22,cls:'t-bad',text:'+4'},
      d2:{type:'eq',x:275,y:255,s:22,cls:'t-bad',text:'+12'},
      d3:{type:'eq',x:385,y:255,s:22,cls:'t-bad',text:'+36'},
      nt:{type:'note',x:320,y:312,w:320,h:52,c:'n2',text:'Same ratio → geometric',size:22,rot:1.5},
    }),
    beats:[
      {say:'Here the differences change: four, twelve, thirty-six.', show:['g1','g2','g3','g4','g5','d1','d2','d3'], gap:.15},
      {say:'But each term is three times the one before. That’s geometric, with a ratio of three.', strike:['d1','d2','d3'], show:['m1','m2','m3','nt'], gap:.3},
      {say:'So the next term is fifty-four times three, one hundred and sixty-two.', show:['m4'], set:{g5:'162'}},
    ]},
  { t:'The missing term',
    items:Object.assign(row('k',[110,215,320,425,530],100,['5','11','?','23','29'],['n3','n3','n1','n3','n3'],80,60,28),{
      p1:{type:'arrow',x1:130,y1:138,x2:195,y2:138,bend:36,cls:'s-pink'},
      p2:{type:'arrow',x1:445,y1:138,x2:510,y2:138,bend:36,cls:'s-pink'},
      p1t:{type:'eq',x:162,y:182,s:22,cls:'t-hand',text:'+6'},
      p2t:{type:'eq',x:478,y:182,s:22,cls:'t-hand',text:'+6'},
      ans:{type:'eq',x:320,y:225,s:36,cls:'t-pri',text:'11 + 6 = 17'},
      chk:{type:'eq',x:320,y:285,s:28,cls:'t-ink2',text:'17 + 6 = 23'},
      ck:{type:'check',x:440,y:276,s:.8},
    }),
    beats:[
      {say:'When a middle term is missing, find the rule from its known neighbours.', show:['k1','k2','k3','k4','k5'], gap:.2},
      {say:'Five to eleven adds six, and twenty-three to twenty-nine adds six too.', show:['p1','p1t','p2','p2t'], gap:.3},
      {say:'Your turn. What is the missing term?', hide:['p1','p1t','p2','p2t']},
    ],
    ask:{ ...L4(['16','17','18','20'],1),
      right:'Well done. Eleven plus six is seventeen, and seventeen plus six is twenty-three.',
      wrong:'The step is six. Eleven plus six is seventeen, and seventeen plus six gives twenty-three.',
      show:['ans','chk','ck'] }},
  { t:'Your test plan',
    items:{
      r1:{type:'box',x:70,y:72,w:500,h:50,c:'n3',text:'Constant differences? → arithmetic',s:20},
      r2:{type:'box',x:70,y:136,w:500,h:50,c:'pinksoft',text:'Constant ratio? → geometric',s:20},
      r3:{type:'box',x:70,y:200,w:500,h:50,c:'prisoft',text:'Neither? → differences of differences',s:20},
      ex:{type:'eq',x:320,y:295,s:28,text:'3, 5, 9, 17, ...'},
      exd:{type:'text',x:320,y:333,s:22,hand:true,text:'steps: 2, 4, 8 (doubling)'},
    },
    beats:[
      {say:'Your plan: find the differences first. If they are constant, it’s arithmetic.', show:['r1']},
      {say:'If not, try dividing. A constant ratio means it’s geometric.', show:['r2']},
      {say:'Otherwise, look at the differences of the differences. In three, five, nine, seventeen, the steps double.', show:['r3','ex','exd']},
    ]},
  ],
  quiz:[
    {q:'What comes next: 4, 9, 14, 19, ...?', o:['23','24','25','29'], a:1, e:'Arithmetic with a difference of 5: 19 + 5 = 24.'},
    {q:'What comes next: 3, 6, 12, 24, ...?', o:['30','36','48','42'], a:2, e:'Geometric with a ratio of 2: 24 × 2 = 48.'},
    {q:'Find the missing term: 81, 27, ?, 3, 1', o:['9','12','18','6'], a:0, e:'Each term is a third of the one before: 27 ÷ 3 = 9.'},
  ]});

/* ---------- 4. word problems ---------- */
const dict=(i,en,m,y)=>({ ['p'+i]:{type:'box',x:60,y,w:290,h:40,c:'surface2',text:en,s:18}, ['r'+i]:{type:'text',x:380,y:y+28,s:24,cls:'t-pri',text:'→'}, ['e'+i]:{type:'eq',x:480,y:y+29,s:26,text:m} });
ADD({ key:'en-al-word', lang:'en', sk:'algebra', ord:40, title:'From word problem to equation', min:'4 min',
  goals:['Translate phrases like “twice a number”, “more than” and “the sum of”','Name the unknown and write the equation','Solve an age or price problem','Go back to what was asked before choosing'],
  scenes:[
  { t:'Translation dictionary',
    items:Object.assign({},
      dict(1,'twice a number','2x',70), dict(2,'half a number','x ÷ 2',118), dict(3,'5 more than a number','x + 5',166),
      dict(4,'5 less than a number','x − 5',214), dict(5,'the sum of two numbers','x + y',262), dict(6,'is / becomes','=',310)),
    beats:[
      {say:'A word problem hides an equation. Call the unknown x; then twice a number is two x.', show:['p1','r1','e1'], gap:.3},
      {say:'Half a number is x divided by two.', show:['p2','r2','e2'], gap:.3},
      {say:'Five more than a number means plus five; five less means minus five.', show:['p3','r3','e3','p4','r4','e4'], gap:.25},
      {say:'The sum of two numbers is x plus y, and is or becomes means equals.', show:['p5','r5','e5','p6','r6','e6'], gap:.25},
    ]},
  { t:'Example: ages',
    items:{
      pr1:{type:'text',x:320,y:90,s:21,text:'Ahmed is twice as old as his brother,'},
      pr1b:{type:'text',x:320,y:120,s:21,text:'and their ages add up to 30.'},
      pr2:{type:'text',x:320,y:150,s:22,cls:'t-pri',text:'How old is the brother?'},
      na:{type:'note',x:190,y:202,w:210,h:56,c:'n3',text:'Brother: x',size:23,rot:-2},
      nb:{type:'note',x:450,y:202,w:210,h:56,c:'n1',text:'Ahmed: 2x',size:23,rot:2},
      eq1:{type:'eq',x:320,y:275,s:32,text:'x + 2x = 3x = 30'},
      eq2:{type:'eq',x:320,y:325,s:32,cls:'t-pri',text:'x = 30 ÷ 3 = 10'},
    },
    beats:[
      {say:'Ahmed is twice as old as his brother, and their ages add up to thirty. How old is the brother?', show:['pr1','pr1b','pr2'], gap:.3},
      {say:'Call the younger one x. The brother is x, and Ahmed is two x.', show:['na','nb'], gap:.4},
      {say:'Together they make thirty: x plus two x is three x, and that equals thirty.', show:['eq1']},
      {say:'Divide by three, and x is ten. The brother is ten, and Ahmed is twenty.', show:['eq2']},
    ]},
  { t:'Go back to the question',
    items:{
      t1:{type:'text',x:320,y:105,s:26,text:'What if it asked for Ahmed’s age?'},
      c10:{type:'note',x:220,y:195,w:120,h:72,c:'n1',text:'10',size:36,rot:-3},
      cr:{type:'cross',x:220,y:282},
      c20:{type:'note',x:420,y:195,w:120,h:72,c:'n3',text:'20',size:36,rot:2},
      ck:{type:'check',x:420,y:282},
    },
    beats:[
      {say:'After solving, reread the question. Does it ask for x, or something else?', show:['t1']},
      {say:'If it asks for Ahmed’s age, the answer is twenty, not ten. Ten often sits among the choices as a trap.', show:['c10','cr','c20','ck'], gap:.35},
    ]},
  { t:'Your turn: prices',
    items:{
      pr1:{type:'text',x:320,y:76,s:20,text:'A pen costs 4 riyals more than a notebook,'},
      pr1b:{type:'text',x:320,y:104,s:20,text:'and together they cost 20 riyals.'},
      pr2:{type:'text',x:320,y:134,s:20,cls:'t-pri',text:'Let the notebook cost x.'},
      w1:{type:'eq',x:320,y:222,s:32,text:'2x + 4 = 20'},
      w2:{type:'box',x:170,y:250,w:300,h:54,c:'butter',text:'Notebook 8, pen 12',s:22},
    },
    beats:[
      {say:'Your turn. A pen costs four riyals more than a notebook, and together they cost twenty riyals.', show:['pr1','pr1b'], gap:.3},
      {say:'If the notebook costs x, which equation is correct?', show:['pr2']},
    ],
    ask:{ ...L4(['x + 4 = 20','x + (x + 4) = 20','4x = 20','x − 4 = 20'],1), s:20,
      right:'Correct. The notebook is x and the pen x plus four, together twenty. So the notebook costs eight and the pen twelve.',
      wrong:'The total includes both prices: x for the notebook plus x plus four for the pen, making twenty. So the notebook is eight, the pen twelve.',
      show:['w1','w2'] }},
  { t:'The four steps',
    items:{
      n1:{type:'note',x:170,y:120,w:285,h:64,c:'n0',text:'1. Name the unknown',size:18,rot:-2},
      n2:{type:'note',x:470,y:120,w:285,h:64,c:'n3',text:'2. Translate the phrases',size:18,rot:2},
      n3:{type:'note',x:170,y:210,w:285,h:64,c:'n2',text:'3. Solve the equation',size:18,rot:1.5},
      n4:{type:'note',x:470,y:210,w:285,h:64,c:'n1',text:'4. Reread the question',size:18,rot:-1.5},
      tip:{type:'text',x:320,y:300,s:24,hand:true,text:'Step four protects you from the trap'},
    },
    beats:[
      {say:'Remember the four steps: name the unknown, translate, solve, then reread the question.', show:['n1','n2','n3','n4','tip'], gap:.5},
    ]},
  ],
  quiz:[
    {q:'When 6 is added to twice a number, the result is 20. What is the number?', o:['7','13','14','8'], a:0, e:'2x + 6 = 20, so 2x = 14 and x = 7.'},
    {q:'Two numbers add up to 30, and one is 6 more than the other. What is the larger number?', o:['12','18','24','15'], a:1, e:'x + (x + 6) = 30, so x = 12 and the larger is 18.'},
    {q:'Khalid is three times as old as his son, and their ages add up to 48. How old is Khalid?', o:['12','36','24','32'], a:1, e:'x + 3x = 48, so x = 12 (the son) and Khalid is 36. Careful: the question asks for Khalid.'},
  ]});
})();
/* English explainers: analogy */
(function(){ if(!window.XP||!XP.ready) return;

/* a word pair: two notes (first word on the LEFT) with a colon between them */
const pair=(items,id,y,a,b,c,{xa=120,xb=270,w=120,h=60,size=26}={})=>{
  items[id+'a']={type:'note',x:xa,y,w,h,c,text:a,size,rot:-1.5};
  items[id+'c']={type:'text',x:(xa+xb)/2,y:y+10,s:30,text:':'};
  items[id+'b']={type:'note',x:xb,y,w,h,c,text:b,size,rot:1.5};
  return [id+'a',id+'c',id+'b']; };

/* ================= Lesson: build the bridge (re-created from the hand-built Arabic lesson) ================= */
const B1={ a:{type:'note',x:200,y:180,w:150,h:90,c:'n0',text:'pen',size:40,rot:-4},
  col:{type:'text',x:320,y:196,s:48,text:':'},
  b:{type:'note',x:440,y:180,w:150,h:90,c:'n3',text:'write',size:36,rot:3},
  ar:{type:'arrow',x1:235,y1:125,x2:405,y2:125,cls:'s-pink',bend:-60,text:'What links them?',s:24} };

const BW=[['A pen',91,'t-pri'],['is a tool',227,'t-ink'],['used for',387,'t-ink'],['writing',531,'t-pri']];
const B2={}; BW.forEach(([t,x,cls],i)=>{ B2['w'+i]={type:'text',x,y:150,s:30,cls,text:t}; });
Object.assign(B2,{ ul:{type:'path',d:'M50 172 Q320 192 590 172',cls:'s-pink'},
  chip:{type:'note',x:320,y:255,w:250,h:62,c:'n2',text:'tool → its use',size:26,rot:-2} });

const BO=[['knife : cut',130,'n0'],['book : library',320,'n1'],['tree : leaf',510,'n3']];
const B3={ tpl:{type:'text',x:320,y:78,s:22,cls:'t-ink2',text:'A ____ is a tool used for ____'},
  test:{type:'text',x:320,y:150,s:26,hand:true,text:'A knife is a tool used for cutting.'} };
BO.forEach(([t,x,c],i)=>{ B3['o'+i]={type:'box',x:x-88,y:205,w:176,h:56,c:'surface2',text:t,s:21}; });
Object.assign(B3,{ v0:{type:'check',x:130,y:305,s:.75}, x1:{type:'cross',x:320,y:305,s:.75}, x2:{type:'cross',x:510,y:305,s:.75} });

const B4={}; pair(B4,'p',76,'doctor','hospital','n0',{xa:230,xb:410,w:140,h:54,size:24});
Object.assign(B4,{ hint:{type:'text',x:320,y:132,s:22,hand:true,text:'Bridge: a doctor works in a hospital'},
  ans:{type:'note',x:320,y:222,w:450,h:66,c:'n0',text:'A teacher works in a school',size:24,rot:-1} });

const B5={}; const p1=pair(B5,'p',110,'egg','hen','n2',{xa:240,xb:400});
Object.assign(B5,{ ea:{type:'note',x:240,y:250,w:120,h:60,c:'n1',text:'egg',size:26,rot:2},
  ec:{type:'text',x:320,y:260,s:30,text:':'},
  eb:{type:'note',x:400,y:250,w:120,h:60,c:'n1',text:'hen',size:26,rot:-2},
  lab:{type:'text',x:320,y:62,s:24,hand:true,text:'An egg comes from a hen'},
  x:{type:'cross',x:545,y:250},
  ar:{type:'arrow',x1:170,y1:196,x2:470,y2:196,cls:'s-pri',bend:-10,text:'first word → second word',s:20} });

XP.add({ key:'en-analogy', lang:'en', sk:'analogy', ord:10, title:'Analogies: build the bridge', min:'4 min',
  goals:['See that an analogy asks about the relationship, not the words','Build a short bridge sentence','Test every option with the same bridge','Keep the direction of the relationship'],
  scenes:[
  { t:'What is an analogy?', items:B1, beats:[
    { say:'In an analogy question, you get two words with a link between them. Your job is to find another pair with the same link.', show:['a','col','b'], gap:.3 },
    { say:'The secret: don\'t look at the words themselves. Look at the relationship between them.', show:['ar'] } ]},
  { t:'Build the bridge', items:B2, beats:[
    { say:'Turn that relationship into a short, clear sentence. We call it the bridge.', show:['w0','w1','w2','w3'], gap:.35 },
    { say:'A pen is a tool used for writing. So the relationship is a tool and its use.', show:['ul','chip'] } ]},
  { t:'Test the options', items:B3, beats:[
    { say:'Now put each option into the same bridge, one at a time.', show:['tpl','o0','o1','o2'], gap:.2 },
    { say:'Knife and cut. A knife is a tool used for cutting. It fits.', show:['test','v0'], hl:['o0'] },
    { say:'Book and library. Is a book a tool used for library? That makes no sense.', set:{test:'A book is a tool used for… library?'}, show:['x1'], strike:['o1'] },
    { say:'Tree and leaf. That is a whole and its part, not a tool and its use. Cross it out.', set:{test:'A tree is a tool used for… leaf?'}, show:['x2'], strike:['o2'] } ]},
  { t:'Your turn', items:B4, beats:[
    { say:'Your turn. Doctor and hospital. Build the bridge in your head: a doctor works in a hospital.', show:['pa','pc','pb'] },
    { say:'Which pair matches the same bridge?', show:['hint'] } ],
    ask:{ opts:['teacher : school','book : reader','water : thirst','pen : ink'], a:0, show:['ans'],
      right:'Well done. A teacher works in a school. Same relationship: a person and their workplace.',
      wrong:'Test the bridge: does a book work in a reader? No. The only pair that fits is teacher and school.' } },
  { t:'The direction trap', items:B5, beats:[
    { say:'Watch the order of the words. Egg and hen: an egg comes from a hen.', show:[...p1,'lab'] },
    { say:'If an option says hen and egg, the relationship is reversed. That is a very common trap.', show:['ea','ec','eb','x'], move:{ea:[160,0],eb:[-160,0]} },
    { say:'So always read the bridge in the same order: first word, then second word.', show:['ar'] } ]},
  ],
  quiz:[
    {q:'SCALPEL : SURGEON', o:['book : library','brush : painter','car : road','sea : fish'], a:1, e:'Bridge: a scalpel is a tool a surgeon uses, and a brush is a tool a painter uses.'},
    {q:'THIRST : WATER', o:['fire : smoke','rain : cloud','hunger : food','sleep : bed'], a:2, e:'Bridge: thirst is relieved by water, and hunger is relieved by food.'},
    {q:'BRANCH : TREE', o:['hand : finger','finger : hand','pen : notebook','door : key'], a:1, e:'A branch is part of a tree, and a finger is part of a hand. "hand : finger" is the same link reversed.'},
  ] });

/* ================= Lesson: relation types ================= */
const T1={}; pair(T1,'p',135,'page','book','n0'); pair(T1,'q',262,'scissors','cut','n3',{size:23});
delete T1.pc; delete T1.qc;
Object.assign(T1,{ ar1:{type:'arrow',x1:130,y1:99,x2:260,y2:99,cls:'s-pink',bend:-22,text:'part of'},
  tag1:{type:'note',x:470,y:135,w:210,h:62,c:'n2',text:'part → whole',size:25,rot:-2},
  ar2:{type:'arrow',x1:130,y1:226,x2:260,y2:226,cls:'s-pink',bend:-22,text:'used to'},
  tag2:{type:'note',x:470,y:262,w:210,h:62,c:'n2',text:'tool → use',size:25,rot:1.5} });

const T2={}; pair(T2,'p',125,'drought','famine','n1',{size:23}); pair(T2,'q',232,'judge','court','n3');
delete T2.pc; delete T2.qc;
Object.assign(T2,{ ar1:{type:'arrow',x1:130,y1:89,x2:260,y2:89,cls:'s-pink',bend:-22,text:'leads to'},
  tag1:{type:'note',x:470,y:125,w:210,h:62,c:'n2',text:'cause → effect',size:24,rot:-2},
  ar2:{type:'arrow',x1:130,y1:196,x2:260,y2:196,cls:'s-pink',bend:-22,text:'works in'},
  tag2:{type:'note',x:470,y:232,w:210,h:62,c:'n2',text:'place',size:26,rot:1.5},
  ex:{type:'box',x:350,y:292,w:240,h:46,c:'surface2',text:'Also: bee : hive',s:21} });

const T3={}; const o3={xa:105,xb:270,w:130,h:54,size:23};
const r1=pair(T3,'a',92,'brave','bold','n0',o3), r2=pair(T3,'b',164,'generous','stingy','n1',{...o3,size:21}), r3=pair(T3,'c',236,'warm','hot','n3',o3);
Object.assign(T3,{ t1:{type:'box',x:380,y:70,w:180,h:44,c:'prisoft',text:'Synonyms',s:22}, t2:{type:'box',x:380,y:142,w:180,h:44,c:'prisoft',text:'Antonyms',s:22},
  t3:{type:'box',x:380,y:214,w:180,h:44,c:'pinksoft',text:'Degree',s:22},
  l1:{type:'box',x:107,y:292,w:110,h:44,c:'sky',text:'cold',s:21}, l2:{type:'box',x:232,y:292,w:110,h:44,c:'butter',text:'cool',s:21},
  l3:{type:'box',x:357,y:292,w:110,h:44,c:'pinksoft',text:'warm',s:21}, l4:{type:'box',x:482,y:292,w:110,h:44,c:'pink',text:'hot',s:21} });

const T4={}; const t4=pair(T4,'p',95,'apple','fruit','n0',{xa:130,xb:280});
Object.assign(T4,{ tag:{type:'note',x:480,y:95,w:220,h:62,c:'n2',text:'type → category',size:23,rot:-2},
  q:{type:'text',x:320,y:100,s:25,text:'Which pair shows a difference of degree?'},
  ans:{type:'note',x:320,y:222,w:480,h:66,c:'n0',text:'A downpour is heavier than a drizzle',size:21,rot:-1} });

const TY=[['Part–whole','n0'],['Tool–use','n1'],['Cause–effect','n2'],['Synonyms','n3'],['Antonyms','n1'],['Degree','n0'],['Place','n3'],['Type–category','n2']];
const T5={}; TY.forEach(([t,c],i)=>{ T5['k'+i]={type:'note',x:[95,245,395,545][i%4],y:i<4?135:228,w:142,h:70,c,text:t,size:t.length>11?16:18,rot:i%2?.8:-.8}; });
T5.foot={type:'text',x:320,y:318,s:28,hand:true,text:'Name the type first, then build the bridge'};

XP.add({ key:'en-an-types', lang:'en', sk:'analogy', ord:20, title:'Types of analogy relationships', min:'4 min',
  goals:['Know the most common relationship types in analogies','Name the type of a pair quickly','Tell synonyms apart from degree','Build the right bridge for each type'],
  scenes:[
  { t:'Parts and tools', items:T1, beats:[
    { say:'Analogy links come in a few common types. Know them, and the bridge comes fast. First: part and whole.', show:['pa','pb'] },
    { say:'Page and book. A page is part of a book.', show:['ar1','tag1'] },
    { say:'Second: a tool and its use. Scissors and cut. Scissors are a tool used to cut.', show:['qa','qb','ar2','tag2'] } ]},
  { t:'Cause and place', items:T2, beats:[
    { say:'Third: cause and effect. Drought and famine. A drought leads to famine.', show:['pa','pb','ar1','tag1'] },
    { say:'Fourth: place. Judge and court. A judge works in a court.', show:['qa','qb','ar2','tag2'] },
    { say:'Place also covers where a creature lives, like bee and hive.', show:['ex'] } ]},
  { t:'Same, opposite, stronger', items:T3, beats:[
    { say:'Synonyms are two words with the same meaning, like brave and bold.', show:[...r1,'t1'] },
    { say:'Antonyms are opposites, like generous and stingy.', show:[...r2,'t2'] },
    { say:'But warm and hot are not synonyms. They show degree: hot is stronger than warm.', show:[...r3,'t3'], hl:['t3'] },
    { say:'Picture a ladder: cold, cool, warm, hot. Each step is stronger than the one before.', show:['l1','l2','l3','l4'], gap:.3 } ]},
  { t:'Type and category', items:T4, beats:[
    { say:'Finally, type and category. Apple and fruit. An apple is a type of fruit.', show:[...t4,'tag'] },
    { say:'Your turn. Which of these pairs shows a difference of degree?', hide:[...t4,'tag'], show:['q'] } ],
    ask:{ opts:['tall : short','branch : tree','drizzle : downpour','needle : sew'], a:2, show:['ans'],
      right:'Well done. A downpour is much heavier rain than a drizzle, so it is a higher degree of the same thing.',
      wrong:'Not this one. Tall and short are opposites, and the other two are part and whole, and a tool. Degree is drizzle and downpour.' } },
  { t:'The types board', items:T5, beats:[
    { say:'Here are the common types, all on one board.', show:TY.map((_,i)=>'k'+i), gap:.15 },
    { say:'When you see a pair, name the type first. Then build the bridge and test the options with it.', show:['foot'] } ]},
  ],
  quiz:[
    {q:'What is the relationship in DROUGHT : FAMINE?', o:['Synonyms','Cause and effect','Part and whole','Degree'], a:1, e:'A drought leads to famine: cause, then effect.'},
    {q:'BEE : HIVE', o:['pen : ink','bird : nest','lion : cub','tree : branch'], a:1, e:'Place: a hive is where a bee lives, and a nest is where a bird lives.'},
    {q:'WARM : HOT', o:['breeze : gale','night : day','mountain : rock','water : river'], a:0, e:'Degree: hot is stronger than warm, and a gale is a much stronger wind than a breeze.'},
  ] });

/* ================= Lesson: tricky analogies ================= */
const K1={}; const k1=pair(K1,'s',95,'rain','flood','n3',{xa:245,xb:395});
Object.assign(K1,{ br:{type:'text',x:320,y:162,s:26,hand:true,text:'Heavy rain causes floods'},
  oA:{type:'box',x:75,y:196,w:220,h:56,c:'surface2',text:'success : effort',s:22}, oB:{type:'box',x:345,y:196,w:220,h:56,c:'surface2',text:'spark : fire',s:22},
  cA:{type:'text',x:185,y:280,s:20,cls:'t-ink2',text:'effect → cause'}, cB:{type:'text',x:455,y:280,s:20,cls:'t-ink2',text:'cause → effect'},
  xA:{type:'cross',x:185,y:318,s:.7}, vB:{type:'check',x:455,y:318,s:.7} });

const K2={}; const k2=pair(K2,'s',92,'water','thirst','n3',{xa:245,xb:395});
Object.assign(K2,{ br:{type:'text',x:320,y:160,s:26,hand:true,text:'Water relieves thirst'},
  oA:{type:'box',x:60,y:190,w:250,h:56,c:'surface2',text:'medicine : illness',s:21}, oB:{type:'box',x:330,y:190,w:250,h:56,c:'surface2',text:'food : hunger',s:21},
  vA:{type:'check',x:185,y:290,s:.7}, vB:{type:'check',x:455,y:290,s:.7}, xA:{type:'cross',x:185,y:290,s:.7} });

const K3={}; const k3=pair(K3,'s',80,'cub','lion','n0',{xa:240,xb:400,h:52});
Object.assign(K3,{ br:{type:'text',x:320,y:134,s:24,hand:true,text:'A cub is a young lion'},
  ans:{type:'note',x:320,y:222,w:380,h:64,c:'n0',text:'A foal is a young horse',size:24,rot:-1.5} });

const K4={ q1:{type:'note',x:120,y:150,w:186,h:96,c:'n0',text:'Same order?',size:21,rot:-2},
  q2:{type:'note',x:320,y:150,w:186,h:96,c:'n1',text:'Sharper bridge?',size:18,rot:1.5},
  q3:{type:'note',x:520,y:150,w:186,h:96,c:'n3',text:'Exact match?',size:21,rot:-1.5},
  foot:{type:'text',x:320,y:290,s:28,hand:true,text:'Three checks before you choose'} };

XP.add({ key:'en-an-tricky', lang:'en', sk:'analogy', ord:30, title:'Tricky analogies', min:'3 min',
  goals:['Spot an option whose order is reversed','Sharpen the bridge when two options fit','Rule out an option that is close but not exact'],
  scenes:[
  { t:'The reversed-order trap', items:K1, beats:[
    { say:'Rain and flood. The bridge: heavy rain causes floods. That is cause, then effect.', show:[...k1,'br'] },
    { say:'Success and effort looks close, but success is the effect and effort is the cause. The order is reversed.', show:['oA','cA','xA'] },
    { say:'Spark and fire puts the cause first and the effect second, exactly like the original.', show:['oB','cB','vB'] } ]},
  { t:'Two options fit?', items:K2, beats:[
    { say:'Sometimes two options pass the same bridge. Water and thirst: water relieves thirst.', show:[...k2,'br'] },
    { say:'Medicine relieves illness, and food relieves hunger. Both fit, so the bridge is too general.', show:['oA','vA','oB','vB'] },
    { say:'Make it sharper: thirst is a natural need that water satisfies.', set:{br:'Thirst is a natural need that water satisfies'}, hl:['br'] },
    { say:'Hunger is a need that food satisfies, but illness is not a need. Cross out medicine and illness.', hide:['vA'], show:['xA'], strike:['oA'] } ]},
  { t:'Close or exact?', items:K3, beats:[
    { say:'The most dangerous option is close, but not exact. Cub and lion: a cub is a young lion.', show:[...k3,'br'] },
    { say:'Which pair matches this bridge exactly?', hl:['br'] } ],
    ask:{ opts:['kitten : tiger','foal : horse','egg : hen','lion : jungle'], a:1, show:['ans'],
      right:'Well done. A foal is a young horse. A kitten is not a young tiger, and an egg is not a young hen.',
      wrong:'Careful. A kitten is related to a tiger but is not its young, and an egg is not a young hen. The exact match is foal and horse.' } },
  { t:'Before you choose', items:K4, beats:[
    { say:'Before you choose, ask three questions. First: is the order the same?', show:['q1'] },
    { say:'Second: does only one option pass? If two pass, sharpen your bridge.', show:['q2'] },
    { say:'Third: is the match exact, not just close? Only then, choose.', show:['q3','foot'] } ]},
  ],
  quiz:[
    {q:'FIRE : SMOKE', o:['smoke : fire','earthquake : destruction','water : river','sun : moon'], a:1, e:'Cause, then effect. "smoke : fire" has the same link but in reverse order.'},
    {q:'JUDGE : COURTROOM', o:['doctor : hospital','student : school','traveler : airport','fish : water'], a:0, e:'All are places, but the exact bridge is "works in": a doctor works in a hospital; a student and a traveler do not work in theirs.'},
    {q:'ROOM : HOUSE', o:['roof : rain','player : stadium','classroom : school','window : light'], a:2, e:'A room is part of a house, and a classroom is part of a school. "player : stadium" is a close place link, not part and whole.'},
  ] });
})();
/* English explainers: arith */
(function(){ if(!window.XP||!XP.ready) return;
/* a strip of n equal boxes, left to right; returns items keyed p0..p(n-1) */
function strip(p,{x,y,w,h,n,colors,texts,s=20,cls}){ const o={}, sw=w/n;
  for(let i=0;i<n;i++) o[p+i]={type:'box',x:x+i*sw,y,w:sw,h,rx:4,c:Array.isArray(colors)?colors[i]:(colors||'surface'),text:texts?texts[i]:undefined,s,cls};
  return o; }
const ks=(p,n)=>Array.from({length:n},(_,i)=>p+i);
/* a table row, left to right: fraction · decimal · percent */
function trow(p,y,a,b,c,{hdr=false}={}){ const cls=hdr?'t-pri':'t-ink';
  return { [p+'b']:{type:'box',x:100,y:y-24,w:470,h:36,rx:8,c:hdr?'prisoft':'surface2',stroke:false},
    [p+'a']:{type:'text',x:180,y:y,s:hdr?20:24,text:a,cls}, [p+'d']:{type:'text',x:335,y:y,s:hdr?20:24,text:b,cls}, [p+'p']:{type:'text',x:490,y:y,s:hdr?20:24,text:c,cls} }; }
const rk=p=>[p+'b',p+'a',p+'d',p+'p'];
const CMP=['A: the first is greater','B: the second is greater','C: they are equal','D: cannot be determined'];

/* ================= 1. order of operations ================= */
XP.add({ key:'en-ar-order', lang:'en', sk:'arith', ord:10, title:'Order of operations', min:'3 min',
  goals:['See why everyone needs one fixed order','Apply the four steps: brackets, powers, × and ÷, + and −','Avoid the “multiply first” trap','Work out a mixed expression mentally'],
  scenes:[
  { t:'Why an order?',
    items:{ q:{type:'eq',x:320,y:130,s:54,text:'2 + 3 × 4'},
      wbox:{type:'box',x:60,y:180,w:230,h:62,c:'badsoft',text:'5 × 4 = 20',s:28,ltr:true}, wx:{type:'cross',x:175,y:290},
      rbox:{type:'box',x:350,y:180,w:230,h:62,c:'oksoft',text:'2 + 12 = 14',s:28,ltr:true}, rx:{type:'check',x:465,y:290} },
    beats:[
      { say:'A simple question to start: two plus three times four. What do you get?', show:['q'] },
      { say:'Working straight through gives five times four, which is twenty. That’s wrong.', show:['wbox','wx'] },
      { say:'Multiplying comes first: three times four is twelve, plus two is fourteen.', show:['rbox','rx'] },
      { say:'So we all follow one fixed order, or two people would get two answers.', hl:['rbox'] },
    ]},
  { t:'The four-step ladder',
    items:{ c1:{type:'circle',cx:100,cy:95,r:24,c:'pri',text:'1',s:24,cls:'t-inv'}, b1:{type:'box',x:140,y:72,w:370,h:46,c:'n3',text:'Brackets  ( )',s:24,cls:'t-note'},
      c2:{type:'circle',cx:100,cy:157,r:24,c:'pri',text:'2',s:24,cls:'t-inv'}, b2:{type:'box',x:140,y:134,w:370,h:46,c:'n2',text:'Powers: x², x³',s:24,cls:'t-note'},
      c3:{type:'circle',cx:100,cy:219,r:24,c:'pri',text:'3',s:24,cls:'t-inv'}, b3:{type:'box',x:140,y:196,w:370,h:46,c:'n1',text:'Multiply and divide',s:24,cls:'t-note'},
      c4:{type:'circle',cx:100,cy:281,r:24,c:'pri',text:'4',s:24,cls:'t-inv'}, b4:{type:'box',x:140,y:258,w:370,h:46,c:'n0',text:'Add and subtract',s:24,cls:'t-note'},
      h3:{type:'text',x:572,y:226,s:18,text:'left to right',hand:true}, h4:{type:'text',x:572,y:288,s:18,text:'left to right',hand:true} },
    beats:[
      { say:'Picture a ladder with four steps. Step one: brackets.', show:['c1','b1'] },
      { say:'Step two: powers, like squares and cubes.', show:['c2','b2'] },
      { say:'Step three: multiplying and dividing share one step. Work left to right.', show:['c3','b3','h3'] },
      { say:'Step four: adding and subtracting, again one step, left to right.', show:['c4','b4','h4'] },
    ]},
  { t:'The multiply-first trap',
    items:{ q:{type:'eq',x:320,y:115,s:50,text:'24 ÷ 4 × 2'},
      wbox:{type:'box',x:60,y:160,w:230,h:62,c:'badsoft',text:'24 ÷ 8 = 3',s:34,ltr:true}, wx:{type:'cross',x:175,y:262},
      rbox:{type:'box',x:350,y:160,w:230,h:62,c:'oksoft',text:'6 × 2 = 12',s:34,ltr:true}, rx:{type:'check',x:465,y:262},
      tip:{type:'note',x:320,y:318,w:380,h:52,c:'n0',text:'Same step? Left to right',size:22,rot:-1} },
    beats:[
      { say:'Now a very common trap: twenty-four divided by four times two.', show:['q'] },
      { say:'Many multiply first and get twenty-four divided by eight, which is three.', show:['wbox','wx'] },
      { say:'But they share a step, so go left to right: twenty-four divided by four is six, times two is twelve.', show:['rbox','rx'] },
      { say:'Same with adding and subtracting: ten minus three plus two is nine, not five.', show:['tip'] },
    ]},
  { t:'Your turn: climb the ladder',
    items:{ q:{type:'eq',x:320,y:100,s:46,text:'20 − 3 × (5 − 3)²'},
      s1:{type:'eq',x:320,y:200,s:26,text:'(5 − 3) = 2,  2² = 4',cls:'t-ink2'}, s2:{type:'eq',x:320,y:250,s:28,text:'3 × 4 = 12',cls:'t-ink2'},
      s3:{type:'box',x:220,y:275,w:200,h:52,c:'n0',text:'20 − 12 = 8',s:28,cls:'t-note',ltr:true} },
    beats:[
      { say:'Your turn. Climb the ladder one step at a time.', show:['q'] },
      { say:'Twenty minus three times the square of five minus three. What is the result?', hl:['q'] },
    ],
    ask:{ opts:['68','8','14','4'], a:1,
      right:'Well done! The bracket is two, squared is four, times three is twelve, so the answer is eight.',
      wrong:'Bracket first: two. Squared: four. Three times four is twelve, and twenty minus twelve is eight.',
      show:['s1','s2','s3'] } },
  ],
  quiz:[
    {q:'6 + 18 ÷ 3 × 2 = ?', o:['8','18','7','16'], a:1, e:'Divide first because it comes first: 18 ÷ 3 = 6, then 6 × 2 = 12, then 6 + 12 = 18.'},
    {q:'(4 + 2)² − 4 × 5 = ?', o:['16','10','80','20'], a:0, e:'The bracket is 6 and 6² = 36; then 4 × 5 = 20, so 36 − 20 = 16.'},
    {q:'Compare. First: 12 − 4 + 2.  Second: 12 − (4 + 2).', o:CMP, a:0, e:'First, left to right: 12 − 4 = 8, then 8 + 2 = 10. Second: 12 − 6 = 6. So the first is greater.'},
  ] });

/* ================= 2. fractions ================= */
XP.add({ key:'en-ar-frac', lang:'en', sk:'arith', ord:20, title:'Fractions from zero', min:'4 min',
  goals:['Picture a fraction: numerator and denominator','Build equivalent fractions and simplify them','Add two fractions after matching denominators','Compare two fractions by cross-multiplying'],
  scenes:[
  { t:'What is a fraction?',
    items:{ pie0:{type:'pie',cx:180,cy:200,r:105,parts:4,fill:0}, pie3:{type:'pie',cx:180,cy:200,r:105,parts:4,fill:3,c:'pink'},
      num:{type:'text',x:345,y:165,s:64,text:'3',cls:'t-pri'}, bar:{type:'line',x1:310,y1:185,x2:380,y2:185,cls:'s-ink'}, den:{type:'text',x:345,y:252,s:64,text:'4',cls:'t-pri'},
      ln:{type:'text',x:400,y:150,s:20,text:'numerator: parts taken',hand:true,anchor:'start'}, ld:{type:'text',x:400,y:238,s:20,text:'denominator: equal parts',hand:true,anchor:'start'} },
    beats:[
      { say:'A fraction is part of a whole. Cut this circle into four equal pieces.', show:['pie0'] },
      { say:'Shade three of them, and you have three quarters.', hide:['pie0'], show:['pie3','num','bar','den'] },
      { say:'The bottom number, the denominator, says how many equal pieces make the whole.', show:['ld'], hl:['den'] },
      { say:'The top number, the numerator, says how many pieces you took.', show:['ln'], hl:['num'] },
    ]},
  { t:'Equivalent fractions',
    items:Object.assign({},
      strip('a',{x:120,y:72,w:360,h:44,n:2,colors:['pink','surface2']}),
      strip('b',{x:120,y:142,w:360,h:44,n:4,colors:['pink','pink','surface2','surface2']}),
      strip('c',{x:120,y:212,w:360,h:44,n:8,colors:['pink','pink','pink','pink','surface2','surface2','surface2','surface2']}),
      { la:{type:'eq',x:550,y:103,s:28,text:'1/2'}, lb:{type:'eq',x:550,y:173,s:28,text:'2/4'}, lc:{type:'eq',x:550,y:243,s:28,text:'4/8'},
        rule:{type:'note',x:320,y:312,w:470,h:54,c:'n0',text:'Top and bottom × the same number',size:22,rot:-1} }),
    beats:[
      { say:'Half of this strip is shaded. That’s one half.', show:[...ks('a',2),'la'], gap:.15 },
      { say:'Cut each piece in two: now it’s two quarters, and the shaded area is the same.', show:[...ks('b',4),'lb'], gap:.12 },
      { say:'Again: four eighths. Three fractions, one value: equivalent fractions.', show:[...ks('c',8),'lc'], gap:.08 },
      { say:'The rule: multiply top and bottom by the same number, or divide both to simplify.', show:['rule'] },
    ]},
  { t:'Adding fractions',
    items:Object.assign({},
      { e1:{type:'eq',x:320,y:95,s:34,text:'1/5 + 2/5 = 3/5'} },
      strip('s',{x:170,y:118,w:300,h:40,n:5,colors:['pink','pri','pri','surface2','surface2']}),
      { w1:{type:'eq',x:320,y:215,s:30,text:'1/5 + 2/5 = 3/10',cls:'t-bad'},
        e3:{type:'box',x:95,y:255,w:450,h:58,c:'n3',text:'1/2 + 1/4 = 2/4 + 1/4 = 3/4',s:28,cls:'t-note',ltr:true} }),
    beats:[
      { say:'Same denominators? Add the numerators and keep the denominator.', show:['e1'] },
      { say:'One fifth plus two fifths is three fifths. Same-size pieces, so just count them.', show:ks('s',5), gap:.12 },
      { say:'The trap: never add the denominators. Three tenths is wrong.', show:['w1'], strike:['w1'] },
      { say:'Different denominators? Match them first: a half is two quarters, so the sum is three quarters.', show:['e3'] },
    ]},
  { t:'Which is bigger?',
    items:{ v1:{type:'box',x:95,y:62,w:210,h:56,c:'n1',text:'First:  2/3',s:26,cls:'t-note',ltr:true}, v2:{type:'box',x:335,y:62,w:210,h:56,c:'n3',text:'Second:  3/4',s:26,cls:'t-note',ltr:true},
      r1:{type:'eq',x:200,y:205,s:32,text:'2 × 4 = 8'}, r2:{type:'eq',x:440,y:205,s:32,text:'3 × 3 = 9'}, ck:{type:'check',x:440,y:265},
      gt:{type:'eq',x:320,y:320,s:24,text:'9 > 8, so the second is greater',cls:'t-pri'} },
    beats:[
      { say:'Now compare two thirds with three quarters.', show:['v1','v2'] },
      { say:'The trick: cross-multiply each numerator by the other denominator, then compare.', hl:['v1','v2'] },
      { say:'Try it. Which choice is correct?', hl:['v2'] },
    ],
    ask:{ opts:CMP, a:1, column:true, y:156, s:20,
      right:'Correct! Two times four is eight, three times three is nine, so the second is greater.',
      wrong:'Cross-multiply: two times four is eight, three times three is nine. So three quarters is greater.',
      show:['r1','r2','ck','gt'] } },
  ],
  quiz:[
    {q:'Which fraction is equivalent to 3/4?', o:['6/9','9/12','4/5','6/10'], a:1, e:'Multiply top and bottom by 3: 3/4 = 9/12.'},
    {q:'1/3 + 1/6 = ?', o:['2/9','1/2','1/9','2/3'], a:1, e:'Match denominators: 2/6 + 1/6 = 3/6 = 1/2.'},
    {q:'Which fraction is the largest?', o:['3/5','5/8','2/3','4/7'], a:2, e:'As decimals: 0.6, 0.625, about 0.67 and about 0.57, so 2/3 is largest.'},
  ] });

/* ================= 3. decimals & conversion ================= */
XP.add({ key:'en-ar-dec', lang:'en', sk:'arith', ord:30, title:'Decimals and conversions', min:'4 min',
  goals:['Understand the places after the decimal point','Convert between fractions, decimals and percents','Memorize the conversions the test loves','Avoid the missing-place trap'],
  scenes:[
  { t:'What is a decimal?',
    items:{ g0:{type:'grid',x:60,y:82,rows:10,cols:10,cell:20,gap:2,fill:0}, g30:{type:'grid',x:60,y:82,rows:10,cols:10,cell:20,gap:2,fill:30,c:'pri'},
      g25:{type:'grid',x:60,y:82,rows:10,cols:10,cell:20,gap:2,fill:25,c:'pink'},
      e1:{type:'eq',x:460,y:130,s:36,text:'3/10 = 0.3'}, e2:{type:'eq',x:460,y:195,s:36,text:'25/100 = 0.25',cls:'t-pri'},
      n1:{type:'note',x:375,y:278,w:130,h:58,c:'n3',text:'2 tenths',size:21,rot:-2}, n2:{type:'note',x:545,y:278,w:170,h:58,c:'n1',text:'5 hundredths',size:19,rot:2} },
    beats:[
      { say:'A decimal is a fraction over ten, a hundred or a thousand, written with a point.', show:['g0'] },
      { say:'Three rows out of ten is three tenths, written zero point three.', hide:['g0'], show:['g30','e1'] },
      { say:'Twenty-five squares out of a hundred is zero point two five.', hide:['g30'], show:['g25','e2'] },
      { say:'The first place is tenths, the second hundredths: two tenths and five hundredths.', show:['n1','n2'] },
    ]},
  { t:'Three names, one value',
    items:{ nF:{type:'note',x:320,y:100,w:120,h:66,c:'n2',text:'1/2',size:34}, lF:{type:'text',x:320,y:160,s:18,text:'fraction',cls:'t-ink2'},
      nD:{type:'note',x:140,y:255,w:120,h:66,c:'n3',text:'0.5',size:34}, lD:{type:'text',x:140,y:315,s:18,text:'decimal',cls:'t-ink2'},
      nP:{type:'note',x:500,y:255,w:120,h:66,c:'n1',text:'50%',size:34}, lP:{type:'text',x:500,y:315,s:18,text:'percent',cls:'t-ink2'},
      a1:{type:'arrow',x1:250,y1:112,x2:160,y2:210,bend:0,cls:'s-pri'}, t1:{type:'text',x:120,y:150,s:20,text:'top ÷ bottom',hand:true},
      a2:{type:'arrow',x1:215,y1:255,x2:425,y2:255,bend:-40,cls:'s-pri'}, t2:{type:'eq',x:320,y:222,s:22,text:'× 100',cls:'t-pri'},
      a3:{type:'arrow',x1:480,y1:210,x2:390,y2:112,bend:0,cls:'s-pink'}, t3:{type:'text',x:530,y:150,s:20,text:'÷ 100, simplify',hand:true} },
    beats:[
      { say:'Fraction, decimal and percent are three names for one value. Take one half.', show:['nF','lF'] },
      { say:'Fraction to decimal: divide top by bottom. One divided by two is zero point five.', show:['a1','t1','nD','lD'] },
      { say:'Decimal to percent: multiply by a hundred, moving the point two places. Fifty percent.', show:['a2','t2','nP','lP'] },
      { say:'Back to a fraction: divide by a hundred and simplify. Fifty over a hundred is a half.', show:['a3','t3'] },
    ]},
  { t:'Conversions to know',
    items:Object.assign({}, trow('h',80,'Fraction','Decimal','Percent',{hdr:true}), trow('r1',120,'1/2','0.5','50%'), trow('r2',160,'1/4','0.25','25%'),
      trow('r3',200,'3/4','0.75','75%'), trow('r4',240,'1/5','0.2','20%'), trow('r5',280,'1/8','0.125','12.5%'),
      { trap:{type:'note',x:320,y:326,w:300,h:44,c:'n1',text:'0.05 = 5%, not 50%',size:22,rot:-1} }),
    beats:[
      { say:'Some conversions come up again and again, so learn them. A half is fifty percent.', show:[...rk('h'),...rk('r1')], gap:.15 },
      { say:'A quarter is twenty-five percent; three quarters, seventy-five percent.', show:[...rk('r2'),...rk('r3')], gap:.12 },
      { say:'A fifth is twenty percent; an eighth, twelve and a half percent.', show:[...rk('r4'),...rk('r5')], gap:.12 },
      { say:'Watch the places: zero point zero five is only five percent, not fifty.', show:['trap'] },
    ]},
  { t:'Your turn: convert',
    items:{ q:{type:'eq',x:320,y:92,s:44,text:'3/8 = ?%'}, hint:{type:'text',x:320,y:135,s:22,text:'Remember: 1/8 = 12.5%',hand:true},
      res:{type:'box',x:150,y:190,w:340,h:62,c:'n0',text:'3 × 12.5 = 37.5%',s:30,cls:'t-note',ltr:true}, ck:{type:'check',x:320,y:295} },
    beats:[
      { say:'Your turn. Write three eighths as a percent.', show:['q'] },
      { say:'One eighth is twelve and a half percent. So what are three eighths?', show:['hint'] },
    ],
    ask:{ opts:['38%','37.5%','3.75%','0.375%'], a:1,
      right:'Well done! Three times twelve and a half is thirty-seven and a half percent.',
      wrong:'One eighth is twelve and a half percent, so three eighths is three times that: thirty-seven and a half.',
      show:['res','ck'] } },
  ],
  quiz:[
    {q:'0.6 is equal to:', o:['6/100','3/5','6%','2/3'], a:1, e:'0.6 = 6/10 = 3/5 after dividing top and bottom by 2.'},
    {q:'Which number is the largest?', o:['0.09','8%','1/10','0.099'], a:2, e:'1/10 = 0.1, which is bigger than 0.099, 0.09 and 0.08.'},
    {q:'45% as a fraction in simplest form:', o:['45/10','9/20','9/2','4/5'], a:1, e:'45/100, then divide top and bottom by 5 to get 9/20.'},
  ] });

/* ================= 4. percent (rebuilt from the hand-built Arabic lesson) ================= */
XP.add({ key:'en-percent', lang:'en', sk:'arith', ord:40, title:'Percentages from zero', min:'4 min',
  goals:['See what a percent means on a hundred-square','Turn a percent into a familiar fraction','Find 10%, 5% and 20% in your head','Avoid the “up then down” trap'],
  scenes:[
  { t:'Out of every hundred',
    items:{ g0:{type:'grid',x:40,y:66,rows:10,cols:10,cell:22,gap:2,fill:0}, g25:{type:'grid',x:40,y:66,rows:10,cols:10,cell:22,gap:2,fill:25,c:'pri'},
      title:{type:'text',x:470,y:120,s:30,text:'Percent'}, sub:{type:'text',x:470,y:160,s:22,text:'= how many out of 100?',hand:true},
      cnt:{type:'eq',x:470,y:212,s:26,text:'25 out of 100',cls:'t-ink2'},
      big:{type:'note',x:470,y:285,w:160,h:76,c:'n0',text:'25%',size:44,rot:-4} },
    beats:[
      { say:'A percent answers just one question: how many out of every hundred?', show:['g0','title','sub'], gap:.3 },
      { say:'Here are one hundred squares. Let’s shade twenty-five of them.', hide:['g0'], show:['g25','cnt'] },
      { say:'Twenty-five out of a hundred is written twenty-five percent.', show:['big'] },
    ]},
  { t:'A fraction in disguise',
    items:{ eq:{type:'eq',x:320,y:92,s:34,text:'25% = 25 ÷ 100 = 1/4'},
      pie:{type:'pie',cx:320,cy:220,r:85,parts:4,fill:1,c:'pink'},
      n1:{type:'note',x:130,y:220,w:170,h:84,c:'n1',text:'50% = 1/2',size:26,rot:-4},
      n2:{type:'note',x:320,y:220,w:170,h:84,c:'n0',text:'25% = 1/4',size:26,rot:3},
      n3:{type:'note',x:510,y:220,w:170,h:84,c:'n3',text:'10% = 1/10',size:26,rot:-2} },
    beats:[
      { say:'Every percent is a fraction with a denominator of one hundred.', show:['eq'] },
      { say:'And twenty-five out of a hundred is exactly one quarter.', show:['pie'] },
      { say:'Learn these three: fifty percent is a half, twenty-five a quarter, and ten a tenth.', hide:['pie'], show:['n1','n2','n3'], gap:.5 },
    ]},
  { t:'The ten-percent trick',
    items:{ q:{type:'eq',x:320,y:84,s:30,text:'10% of 240 = ?'},
      d2:{type:'text',x:135,y:185,s:72,text:'2'}, d4:{type:'text',x:190,y:185,s:72,text:'4'}, d0:{type:'text',x:245,y:185,s:72,text:'0'},
      ar:{type:'arrow',x1:290,y1:160,x2:400,y2:160,cls:'s-pri',bend:-30,text:'÷ 10'},
      res:{type:'note',x:475,y:160,w:130,h:80,c:'n0',text:'24',size:46,rot:-3},
      ch1:{type:'note',x:190,y:290,w:250,h:60,c:'n2',text:'20% = 2 × 24 = 48',size:22,rot:-2},
      ch2:{type:'note',x:450,y:290,w:250,h:60,c:'n1',text:'5% = 24 ÷ 2 = 12',size:22,rot:2} },
    beats:[
      { say:'To find ten percent of any number, divide it by ten.', show:['q','d2','d4','d0'], gap:.15 },
      { say:'In other words, drop one zero: two hundred and forty becomes twenty-four.', move:{d0:[0,50]}, hide:['d0'], show:['ar','res'] },
      { say:'Build from there: twenty percent is double, forty-eight. Five percent is half, twelve.', show:['ch1','ch2'], gap:1.2 },
    ]},
  { t:'Your turn: shade 40%',
    items:{ g0:{type:'grid',x:200,y:62,rows:10,cols:10,cell:22,gap:2,fill:0},
      q:{type:'text',x:320,y:92,s:24,text:'Each column holds 10 squares.'},
      g40:{type:'grid',x:50,y:124,rows:10,cols:10,cell:20,gap:2,fill:40,c:'pink'},
      p:{type:'note',x:470,y:190,w:160,h:76,c:'n0',text:'40%',size:44,rot:-3},
      e:{type:'eq',x:470,y:270,s:24,text:'40 out of 100',cls:'t-ink2'}, ck:{type:'check',x:470,y:315} },
    beats:[
      { say:'Your turn. This grid has ten columns of ten squares.', show:['g0'] },
      { say:'How many whole columns do you shade to show forty percent?', hide:['g0'], show:['q'] },
    ],
    ask:{ opts:['4 columns','6 columns','40 columns'], a:0,
      right:'Excellent! Four columns of ten make forty squares out of a hundred.',
      wrong:'Close! Forty percent is forty squares out of a hundred: four full columns of ten.',
      show:['g40','p','e','ck'] } },
  { t:'Discounts and a classic trap',
    items:{ bar:{type:'box',x:100,y:80,w:400,h:46,c:'n3',text:'200 riyals',s:24,cls:'t-note'},
      seg:{type:'box',x:400,y:80,w:100,h:46,c:'pink',text:'−50',s:22,cls:'t-note',ltr:true},
      tag:{type:'note',x:568,y:70,w:110,h:48,c:'n1',text:'25% off',size:20,rot:10},
      after:{type:'eq',x:300,y:162,s:24,text:'After the discount: 150 riyals',cls:'t-pri'},
      v1:{type:'note',x:140,y:275,w:110,h:64,c:'n0',text:'100',size:32}, v2:{type:'note',x:320,y:275,w:110,h:64,c:'n0',text:'120',size:32}, v3:{type:'note',x:500,y:275,w:110,h:64,c:'n1',text:'96',size:32},
      a1:{type:'arrow',x1:200,y1:246,x2:262,y2:246,cls:'s-pri',bend:-26}, l1:{type:'eq',x:231,y:212,s:18,text:'+20%',cls:'t-pri'},
      a2:{type:'arrow',x1:380,y1:246,x2:442,y2:246,cls:'s-pink',bend:-26}, l2:{type:'text',x:411,y:212,s:18,text:'−20% of 120',hand:true} },
    beats:[
      { say:'A shirt costs two hundred riyals, with twenty-five percent off.', show:['bar','tag'] },
      { say:'A quarter of two hundred is fifty, so you pay one hundred and fifty.', show:['seg','after'] },
      { say:'A famous trap: up twenty percent, then down twenty percent, does not bring you back.', show:['v1','a1','l1','v2','a2','l2','v3'], gap:.35 },
      { say:'The drop is taken from one hundred and twenty, not one hundred, so you end at ninety-six.', hl:['v3'] },
    ]},
  ],
  quiz:[
    {q:'What is 15% of 400?', o:['40','60','75','15'], a:1, e:'10% of 400 = 40, and 5% is half of that = 20. Total: 60.'},
    {q:'A price of 80 riyals after a 25% discount is:', o:['55 riyals','60 riyals','20 riyals','65 riyals'], a:1, e:'A quarter of 80 = 20, and 80 − 20 = 60.'},
    {q:'A number rises 10%, then falls 10%. Compared with the start, it is:', o:['the same','1% more','1% less','10% less'], a:2, e:'100 → 110 → 99, so 1% less, because the drop is taken from 110.'},
  ] });

/* ================= 5. ratio & proportion ================= */
const S1c=['pink','pink','sky','sky','sky'];
XP.add({ key:'en-ar-ratio', lang:'en', sk:'arith', ord:50, title:'Ratio and proportion', min:'4 min',
  goals:['See a ratio as a comparison of two amounts','Share an amount in a given ratio using parts','Solve a proportion by cross-multiplying','Answer part-of-a-whole questions quickly'],
  scenes:[
  { t:'What is a ratio?',
    items:Object.assign({ d1:{type:'circle',cx:140,cy:110,r:20,c:'pink'}, d2:{type:'circle',cx:190,cy:110,r:20,c:'pink'},
      d3:{type:'circle',cx:400,cy:110,r:20,c:'sky'}, d4:{type:'circle',cx:450,cy:110,r:20,c:'sky'}, d5:{type:'circle',cx:500,cy:110,r:20,c:'sky'},
      l1:{type:'text',x:165,y:160,s:18,text:'pink',cls:'t-ink2'}, l2:{type:'text',x:450,y:160,s:18,text:'blue',cls:'t-ink2'},
      r:{type:'eq',x:295,y:125,s:46,text:'2 : 3',cls:'t-pri'} },
      strip('p',{x:120,y:200,w:400,h:48,n:5,colors:S1c}),
      { f1:{type:'eq',x:200,y:285,s:26,text:'2/5'}, f2:{type:'eq',x:400,y:285,s:26,text:'3/5'},
        dbl:{type:'eq',x:320,y:332,s:22,text:'4 : 6 is the same as 2 : 3',cls:'t-hand'} }),
    beats:[
      { say:'A ratio compares two amounts. This bag holds two pink balls and three blue.', show:['d1','d2','d3','d4','d5','l1','l2'], gap:.12 },
      { say:'We say the ratio of pink to blue is two to three.', show:['r'] },
      { say:'The whole is five parts: pink is two fifths, blue is three fifths.', show:[...ks('p',5),'f1','f2'], gap:.12 },
      { say:'Doubling both amounts keeps the ratio: four to six is still two to three.', show:['dbl'] },
    ]},
  { t:'Sharing in a ratio',
    items:Object.assign({ q:{type:'eq',x:320,y:92,s:24,text:'Share 45 riyals: Khalid : Saad = 2 : 3'} },
      strip('p',{x:120,y:125,w:400,h:56,n:5,colors:S1c,texts:['','','','',''],s:26,cls:'t-note'}),
      { e:{type:'eq',x:320,y:238,s:36,text:'45 ÷ 5 = 9'},
        k:{type:'note',x:200,y:300,w:160,h:54,c:'n1',text:'Khalid: 18',size:24,rot:-2}, s:{type:'note',x:440,y:300,w:160,h:54,c:'n3',text:'Saad: 27',size:24,rot:2} }),
    beats:[
      { say:'Share forty-five riyals between Khalid and Saad in the ratio two to three.', show:['q'] },
      { say:'Add the parts: two plus three makes five equal parts.', show:ks('p',5), gap:.12 },
      { say:'One part is forty-five divided by five: nine.', show:['e'], set:{p0:'9',p1:'9',p2:'9',p3:'9',p4:'9'} },
      { say:'Khalid gets two parts, eighteen riyals. Saad gets three, twenty-seven riyals.', show:['k','s'] },
    ]},
  { t:'Proportions and cross-multiplying',
    items:{ q:{type:'eq',x:320,y:88,s:22,text:'3 pens cost 12 riyals. How much do 7 pens cost?'},
      n1:{type:'text',x:230,y:150,s:40,text:'3'}, b1:{type:'line',x1:200,y1:163,x2:260,y2:163}, d1:{type:'text',x:230,y:205,s:40,text:'12'},
      n2:{type:'text',x:410,y:150,s:40,text:'7'}, b2:{type:'line',x1:380,y1:163,x2:440,y2:163}, d2:{type:'text',x:410,y:205,s:40,text:'x',cls:'t-pri'},
      x1:{type:'line',x1:255,y1:130,x2:385,y2:200,cls:'s-pink'}, x2:{type:'line',x1:255,y1:200,x2:385,y2:130,cls:'s-pink'},
      eqs:{type:'box',x:303,y:150,w:34,h:26,rx:6,c:'surface',stroke:false,text:'=',s:40},
      e:{type:'eq',x:320,y:258,s:28,text:'3 × x = 12 × 7 = 84'},
      ans:{type:'box',x:230,y:282,w:180,h:52,c:'n0',text:'x = 28',s:28,cls:'t-note',ltr:true} },
    beats:[
      { say:'A proportion is two equal ratios. Three pens cost twelve riyals. What do seven cost?', show:['q'] },
      { say:'Write two equal fractions: three over twelve equals seven over x.', show:['n1','b1','d1','eqs','n2','b2','d2'], gap:.1 },
      { say:'Cross-multiply: three times x equals twelve times seven, eighty-four.', show:['x1','x2','e'] },
      { say:'Divide by three: x equals twenty-eight riyals.', show:['ans'] },
    ]},
  { t:'Your turn: parts of a whole',
    items:Object.assign({ q1:{type:'text',x:320,y:84,s:22,text:'A box holds 35 pens.'}, q2:{type:'eq',x:320,y:122,s:22,text:'Blue : red = 3 : 4. How many pens are red?'} },
      strip('p',{x:110,y:180,w:420,h:52,n:7,colors:['sky','sky','sky','bad','bad','bad','bad'],texts:['5','5','5','5','5','5','5'],s:24,cls:'t-note'}),
      { e:{type:'box',x:210,y:262,w:220,h:54,c:'n0',text:'4 × 5 = 20',s:28,cls:'t-note',ltr:true} }),
    beats:[
      { say:'Your turn. A box holds thirty-five pens, and the ratio of blue to red is three to four.', show:['q1','q2'] },
      { say:'Add the parts, find one part, then answer: how many are red?', hl:['q2'] },
    ],
    ask:{ opts:['15','20','28','25'], a:1,
      right:'Excellent! Seven parts, each worth five pens, and red is four parts: twenty pens.',
      wrong:'Three plus four is seven parts; one part is thirty-five divided by seven, five. Red is four times five: twenty.',
      show:[...ks('p',7),'e'] } },
  ],
  quiz:[
    {q:'60 riyals are shared in the ratio 1 : 4. How much is the larger share?', o:['15','48','40','12'], a:1, e:'5 parts, one part = 60 ÷ 5 = 12, so the larger share = 4 × 12 = 48.'},
    {q:'If x/5 = 12/20, what is x?', o:['3','4','6','2'], a:0, e:'Cross-multiply: 20 × x = 60, so x = 3.'},
    {q:'A car travels 120 km on 8 liters. How many liters does it need for 210 km?', o:['12','16','14','15'], a:2, e:'120/8 = 210/x, so x = 210 × 8 ÷ 120 = 14.'},
  ] });
})();
/* English explainers: comparison */
(function(){ if(!window.XP||!XP.ready) return;
/* keep text readable in dark mode: light fills get note ink, dark fills get stage ink */
const LIGHT=['n0','n1','n2','n3','butter','sky'], DARKF=['surface','surface2','prisoft','pinksoft'];
const ADD=L=>{ L.scenes.forEach(sc=>{ for(const k in (sc.items||{})){ const it=sc.items[k]; if((it.type==='box'||it.type==='circle')&&LIGHT.includes(it.c)&&!it.cls) it.cls='t-note'; if(it.type==='note'&&DARKF.includes(it.c)&&!it.cls) it.cls='t-ink'; } }); XP.add(L); };
const E=(x,y,s,text,cls)=>({type:'eq',x,y,s,text,cls});
const CH=['A: First is greater','B: Second is greater','C: They are equal','D: Can’t be determined'];
/* 4-option asks: the engine puts option 0 in the right-hand column, so swap each pair to read A B / C D left to right */
const L4=(opts,a)=>({ opts, a, s:17 });
/* two quantity boxes: first on the left, second on the right */
const QB=(y,a,b,h=56,s=24)=>({
  qa:{type:'box',x:65,y,w:230,h,c:'prisoft',text:a,s},
  qb:{type:'box',x:345,y,w:230,h,c:'surface2',text:b,s},
});

/* ---------- 1. the four choices ---------- */
ADD({ key:'en-cm-choices', lang:'en', sk:'comparison', ord:10, title:'The four comparison choices', min:'3 min',
  goals:['Recognise the comparison format and its fixed choices','Know what each choice means','Know when the answer is “cannot be determined”','Rule out D when there is no unknown'],
  scenes:[
  { t:'The question format',
    items:{
      la:{type:'text',x:177,y:92,s:20,cls:'t-ink2',text:'Quantity 1'},
      lb:{type:'text',x:462,y:92,s:20,cls:'t-ink2',text:'Quantity 2'},
      qa:{type:'box',x:75,y:105,w:205,h:90,c:'prisoft',text:'?',s:44,cls:'t-pri'},
      qb:{type:'box',x:360,y:105,w:205,h:90,c:'surface2',text:'?',s:44,cls:'t-pri'},
      vs:{type:'text',x:320,y:160,s:22,hand:true,text:'versus'},
      c1:{type:'note',x:180,y:245,w:270,h:50,c:'n0',text:'A: First is greater',size:18,rot:-1.5},
      c2:{type:'note',x:460,y:245,w:270,h:50,c:'n1',text:'B: Second is greater',size:18,rot:1.5},
      c3:{type:'note',x:180,y:312,w:270,h:50,c:'n3',text:'C: They are equal',size:18,rot:1},
      c4:{type:'note',x:460,y:312,w:270,h:50,c:'n2',text:'D: Cannot be determined',size:18,rot:-1},
    },
    beats:[
      {say:'A comparison question gives you two quantities. Your job is to decide how they relate.', show:['la','qa','vs','lb','qb'], gap:.3},
      {say:'The four choices are the same in every question, so learn them once and save time.', show:['c1','c2','c3','c4'], gap:.35},
    ]},
  { t:'What each choice means',
    items:(function(){ const o={}, rows=[['A','First is always greater','12  vs  9','n0'],['B','Second is always greater','3 × 4  vs  15','n1'],['C','Always equal','½  vs  0.5','n3'],['D','Not enough information','x  vs  5','n2']];
      rows.forEach((r,i)=>{ const y=100+i*64; o['k'+i]={type:'circle',cx:80,cy:y,r:22,c:r[3],text:r[0],s:22};
        o['m'+i]={type:'text',x:116,y:y+7,s:18,anchor:'start',text:r[1]};
        o['e'+i]={type:'box',x:400,y:y-24,w:190,h:48,c:'surface2',text:r[2],s:21}; }); return o; })(),
    beats:[
      {say:'Choice A: the first quantity is always greater, like twelve versus nine.', show:['k0','m0','e0'], gap:.3},
      {say:'Choice B: the second is always greater, like three times four versus fifteen.', show:['k1','m1','e1'], gap:.3},
      {say:'Choice C: they are always equal, like one half versus zero point five.', show:['k2','m2','e2'], gap:.3},
      {say:'Choice D: it cannot be determined, because no single relationship holds.', show:['k3','m3','e3'], gap:.3},
      {say:'Notice the word always. The relationship must hold in every case, not just one.', hl:['m0','m1','m2']},
    ]},
  { t:'When is it D?',
    items:{
      top:E(320,100,32,'x  vs  5'),
      t1:{type:'box',x:45,y:125,w:265,h:52,c:'n3',text:'x = 8 → first is greater',s:17},
      t2:{type:'box',x:330,y:125,w:265,h:52,c:'n1',text:'x = 2 → second is greater',s:17},
      cn:{type:'note',x:320,y:232,w:340,h:58,c:'n2',text:'The relation changed → D',size:22,rot:-1.5},
      n2:{type:'note',x:320,y:312,w:440,h:50,c:'n0',text:'No unknown? Then it is not D',size:21,rot:1},
    },
    beats:[
      {say:'Pick D when the relationship changes with the unknown. Take x versus five, with no condition.', show:['top']},
      {say:'If x is eight, the first is greater. If x is two, the second is. It changes, so the answer is D.', show:['t1','t2','cn'], gap:.5},
      {say:'But if both quantities are plain numbers with no unknown, the answer can never be D.', show:['n2']},
    ]},
  { t:'Your turn',
    items:Object.assign(QB(72,'25% of 40','40% of 25',56,24),{
      s1:E(320,222,32,'10 = 10','t-pri'),
      tip:{type:'note',x:320,y:290,w:360,h:56,c:'n0',text:'a% of b = b% of a',size:23,rot:-1.5},
    }),
    beats:[
      {say:'Your turn. Quantity one is twenty-five percent of forty. Quantity two is forty percent of twenty-five.', show:['qa','qb'], gap:.4},
      {say:'Which of the four choices is correct?'},
    ],
    ask:{ ...L4(CH,2),
      right:'Well done. Both equal ten, so the answer is C.',
      wrong:'A quarter of forty is ten, and forty percent of twenty-five is also ten. They are equal, so it’s C. D is out, as there is no unknown.',
      show:['s1','tip'] }},
  ],
  quiz:[
    {q:'Quantity 1: 3 × 8 — Quantity 2: 25', o:CH, a:1, e:'3 × 8 = 24, and 24 is less than 25.'},
    {q:'Quantity 1: 0.75 — Quantity 2: ¾', o:CH, a:2, e:'¾ = 0.75, so they are equal.'},
    {q:'x is a real number. Quantity 1: x — Quantity 2: 3', o:CH, a:3, e:'At x = 5 the first is greater; at x = 1 the second is greater.'},
  ]});

/* ---------- 2. testing values ---------- */
ADD({ key:'en-cm-test', lang:'en', sk:'comparison', ord:20, title:'Testing values', min:'4 min',
  goals:['See why one test is not enough','Test zero, negatives, fractions and large numbers','Choose D as soon as the relationship flips','Read the condition and test only inside it'],
  scenes:[
  { t:'One test isn’t enough',
    items:Object.assign(QB(75,'First: x²','Second: x',58,24),{
      t2:E(320,190,24,'x = 2 → 4 is greater than 2'),
      wc:{type:'note',x:320,y:268,w:340,h:58,c:'n1',text:'First always greater?',size:23,rot:-1.5},
    }),
    beats:[
      {say:'When an unknown appears, like x squared versus x, don’t stop at the first number you think of.', show:['qa','qb'], gap:.4},
      {say:'Most people try two: four is greater than two, so the first seems always greater.', show:['t2','wc'], gap:.5},
      {say:'But that’s too quick. Other numbers might surprise you.', strike:['wc']},
    ]},
  { t:'The golden list',
    items:(function(){ const o={}, xs=[125,255,385,515], v=['0','−1','½','100'], k=['zero','negative','fraction','large'], h=['wipes out','flips sign','shrinks','grows fast'], c=['n0','n1','n3','n2'];
      xs.forEach((x,i)=>{ o['n'+i]={type:'note',x,y:140,w:110,h:84,c:c[i],text:v[i],size:36,rot:[-3,2,-2,3][i]}; o['k'+i]={type:'text',x,y:218,s:21,cls:'t-ink2',text:k[i]}; o['h'+i]={type:'text',x,y:266,s:19,hand:true,text:h[i]}; }); return o; })(),
    beats:[
      {say:'Always test zero, a negative, a fraction between zero and one, and a large number.', show:['n0','k0','n1','k1','n2','k2','n3','k3'], gap:.3},
      {say:'Zero wipes out products, negatives flip signs, fractions shrink when squared, and large numbers show which grows faster.', show:['h0','h1','h2','h3'], gap:.4},
    ]},
  { t:'Test with me',
    items:{
      hA:{type:'eq',x:190,y:92,s:24,cls:'t-pri',text:'First: x²'},
      hB:{type:'eq',x:450,y:92,s:24,cls:'t-pri',text:'Second: x'},
      r1:{type:'box',x:70,y:122,w:500,h:52,c:'n3',text:'x = 2:  4 vs 2 → first is greater',s:20},
      r2:{type:'box',x:70,y:190,w:500,h:52,c:'n1',text:'x = ½:  ¼ vs ½ → second is greater',s:20},
      rn:{type:'note',x:320,y:298,w:360,h:58,c:'n2',text:'The relation flipped → D',size:23,rot:-1.5},
    },
    beats:[
      {say:'Back to x squared versus x. At x equals two, it’s four versus two: the first is greater.', show:['hA','hB','r1'], gap:.3},
      {say:'With x equal to one half, it’s one quarter versus one half. Now the second is greater!', show:['r2']},
      {say:'The relationship flipped, so the answer is D right away. No more tests needed.', show:['rn']},
    ]},
  { t:'Read the condition first',
    items:{
      cond:{type:'box',x:180,y:72,w:280,h:52,c:'butter',text:'Condition: x > 1',s:24},
      e1:{type:'note',x:200,y:170,w:80,h:54,c:'surface2',text:'0',size:28,rot:-2},
      e2:{type:'note',x:320,y:170,w:80,h:54,c:'surface2',text:'−1',size:28,rot:2},
      e3:{type:'note',x:440,y:170,w:80,h:54,c:'surface2',text:'½',size:28,rot:-1},
      a1:E(320,245,24,'x = 2:  4 > 2'),
      a2:E(320,285,24,'x = 10:  100 > 10'),
      ans:{type:'text',x:320,y:333,s:24,hand:true,text:'first is always greater → A'},
    },
    beats:[
      {say:'Read the condition first. Here x is greater than one, so zero, negatives and fractions are out.', show:['cond','e1','e2','e3'], strike:['e1','e2','e3'], gap:.3},
      {say:'Try two and ten: the first wins both times, and stays ahead for any x above one. The answer is A.', show:['a1','a2','ans'], gap:.5},
    ]},
  { t:'Your turn',
    items:Object.assign(QB(70,'First: 2x','Second: x',48,23),{
      cond:{type:'text',x:320,y:138,s:18,cls:'t-ink2',text:'No condition on x'},
      w1:E(320,200,22,'x = 1:  2 vs 1 → A'),
      w2:E(320,245,22,'x = −1:  −2 vs −1 → B'),
      w3:{type:'note',x:320,y:305,w:340,h:52,c:'n2',text:'The relation changes → D',size:21,rot:-1.5},
    }),
    beats:[
      {say:'Your turn. Quantity one is two x, and quantity two is x. There is no condition on x.', show:['qa','qb','cond'], gap:.35},
      {say:'Test zero, a negative and a positive, then choose.'},
    ],
    ask:{ ...L4(CH,3),
      right:'Correct. At one, the first is greater. At negative one, the second is greater. It changes, so the answer is D.',
      wrong:'Try negative one: negative two versus negative one, so the second is greater. At one, the first is greater. So it’s D.',
      show:['w1','w2','w3'] }},
  ],
  quiz:[
    {q:'x is negative. Quantity 1: x² — Quantity 2: x', o:CH, a:0, e:'The square of a negative is positive, and a positive is always greater than a negative.'},
    {q:'No condition on x. Quantity 1: x² — Quantity 2: 0', o:CH, a:3, e:'At x = 0 they are equal; at x = 1 the first is greater.'},
    {q:'0 < x < 1. Quantity 1: x³ — Quantity 2: x', o:CH, a:1, e:'A fraction shrinks when raised to a higher power: at x = ½, x³ = ⅛.'},
  ]});

/* ---------- 3. simplify before computing ---------- */
/* one side of a comparison, read left to right: t1  op  t2 */
const SIDE=(pre,x,y,t1,t2,op='+')=>({ [pre+'1']:E(x-62,y,32,t1), [pre+'p']:E(x,y,30,op), [pre+'2']:E(x+52,y,32,t2) });
ADD({ key:'en-cm-simplify', lang:'en', sk:'comparison', ord:30, title:'Simplify before you calculate', min:'3 min',
  goals:['Cross out terms that appear on both sides','Know what you may do to both sides without changing the relationship','Compare by estimating instead of full calculation'],
  scenes:[
  { t:'Cross out what’s shared',
    items:Object.assign({
      la:{type:'text',x:180,y:88,s:20,cls:'t-ink2',text:'Quantity 1'},
      lb:{type:'text',x:460,y:88,s:20,cls:'t-ink2',text:'Quantity 2'},
      ba:{type:'box',x:65,y:100,w:230,h:64,c:'prisoft'},
      bb:{type:'box',x:345,y:100,w:230,h:64,c:'surface2'},
    }, SIDE('a',180,144,'487','39'), SIDE('b',460,144,'487','41'), {
      rem:{type:'text',x:320,y:222,s:24,text:'What’s left: 39 vs 41'},
      v:{type:'note',x:320,y:290,w:320,h:58,c:'n0',text:'Second is greater → B',size:23,rot:-1.5},
    }),
    beats:[
      {say:'In comparison, you don’t need exact answers, just which side is bigger.', show:['la','ba','a1','ap','a2','lb','bb','b1','bp','b2'], gap:.12},
      {say:'Four hundred and eighty-seven appears on both sides, so cross it out.', strike:['a1','b1']},
      {say:'That leaves thirty-nine versus forty-one, so the second is greater.', show:['rem','v'], gap:.5},
    ]},
  { t:'What you may do',
    items:{
      r1:{type:'box',x:110,y:78,w:500,h:56,c:'n3',text:'Add or subtract the same number',s:18},
      k1:{type:'check',x:70,y:106},
      r2:{type:'box',x:110,y:156,w:500,h:56,c:'n3',text:'Multiply/divide by the same positive number',s:18},
      k2:{type:'check',x:70,y:184},
      r3:{type:'box',x:110,y:234,w:500,h:56,c:'n1',text:'Don’t multiply by a negative or an unknown',s:18},
      k3:{type:'cross',x:70,y:262},
    },
    beats:[
      {say:'You may add or subtract the same number on both sides; the relationship stays the same.', show:['r1','k1'], gap:.3},
      {say:'You may also multiply or divide both sides by the same positive number.', show:['r2','k2'], gap:.3},
      {say:'But multiplying by a negative, or by an unknown that might be negative, can flip it.', show:['r3','k3'], gap:.3},
    ]},
  { t:'Unknown on both sides',
    items:Object.assign({
      ba:{type:'box',x:65,y:90,w:230,h:64,c:'prisoft'},
      bb:{type:'box',x:345,y:90,w:230,h:64,c:'surface2'},
    }, SIDE('a',180,134,'x','7'), SIDE('b',460,134,'x','9'), {
      rem:{type:'text',x:320,y:212,s:24,text:'What’s left: 7 vs 9'},
      v:{type:'note',x:320,y:282,w:420,h:58,c:'n0',text:'Second always greater → B, not D',size:21,rot:1.5},
    }),
    beats:[
      {say:'The unknown can appear on both sides, like x plus seven versus x plus nine.', show:['ba','a1','ap','a2','bb','b1','bp','b2'], gap:.12},
      {say:'Subtract x from both sides: seven versus nine. The second is always greater, so it’s B, not D.', strike:['a1','b1'], show:['rem','v'], gap:.5},
    ]},
  { t:'Estimate, don’t calculate',
    items:Object.assign(QB(78,'198 × 5','1000',58,28),{
      s1:{type:'text',x:320,y:190,s:24,text:'198 is less than 200'},
      s2:E(320,238,28,'200 × 5 = 1000'),
      v:{type:'note',x:320,y:302,w:320,h:56,c:'n0',text:'Second is greater → B',size:23,rot:-1.5},
    }),
    beats:[
      {say:'When the arithmetic is heavy, estimate: one hundred and ninety-eight times five versus one thousand.', show:['qa','qb'], gap:.4},
      {say:'One hundred and ninety-eight is less than two hundred, and two hundred times five is one thousand.', show:['s1','s2'], gap:.5},
      {say:'So the first is under one thousand: the second is greater. Note which way you rounded.', show:['v']},
    ]},
  { t:'Your turn',
    items:Object.assign(QB(66,'','',72,34),{
      h1:E(460,93,26,'1'), hl:{type:'line',x1:440,y1:101,x2:480,y2:101,cls:'s-ink'}, h2:E(460,128,26,'2'),
      f1:E(180,93,26,'7'), fl:{type:'line',x1:160,y1:101,x2:200,y2:101,cls:'s-ink'}, f2:E(180,128,26,'15'),
      w1:{type:'text',x:320,y:215,s:26,text:'Half of 15 is 7.5'},
      w2:{type:'text',x:320,y:260,s:26,text:'and 7 is less than 7.5'},
      v:{type:'note',x:320,y:318,w:320,h:52,c:'n0',text:'Second is greater → B',size:22,rot:-1.5},
    }),
    beats:[
      {say:'Your turn. Quantity one is seven fifteenths, and quantity two is one half.', show:['qa','f1','fl','f2','qb','h1','hl','h2'], gap:.15},
      {say:'Compare them without long division. What’s the answer?'},
    ],
    ask:{ ...L4(CH,1),
      right:'Well done. Seven is less than half of fifteen, so the fraction is under one half. It’s B.',
      wrong:'Half of fifteen is seven and a half, but the top is only seven, so the fraction is under one half. The answer is B.',
      show:['w1','w2','v'] }},
  ],
  quiz:[
    {q:'Quantity 1: 365 + 89 — Quantity 2: 365 + 98', o:CH, a:1, e:'Cross out 365 on both sides: 89 is less than 98.'},
    {q:'Quantity 1: 102 × 10 — Quantity 2: 1000', o:CH, a:0, e:'102 is more than 100, and 100 × 10 = 1000, so the first is greater.'},
    {q:'Quantity 1: 4 × 25 × 7 — Quantity 2: 7 × 100', o:CH, a:2, e:'4 × 25 = 100, so both sides are 100 × 7.'},
  ]});
})();
/* English explainers: completion */
(function(){ if(!window.XP||!XP.ready) return;

const blank=(x,y,w=110,h=44,s=22)=>({type:'box',x,y,w,h,c:'surface2',text:'......',s,cls:'t-pri'});
const fitSize=t=>t.length>=9?18:t.length>=7?19:t.length>=6?22:27;

/* ================= Lesson: signal words ================= */
const S1={ s:{type:'text',x:120,y:148,s:24,text:'It was raining,'},
  sig:{type:'note',x:292,y:140,w:110,h:60,c:'n1',text:'so',size:28,rot:-1.5},
  b:blank(355,115,265,50,21),
  hint:{type:'text',x:292,y:212,s:26,hand:true,text:'keeps going →'},
  foot:{type:'note',x:320,y:292,w:440,h:62,c:'n0',text:'The signal sets the direction',size:23,rot:-1} };

const LW=[['but',100,150],['although',230,150],['whereas',100,235],['however',230,235]], RW=[['because',410,150],['so',540,150],['therefore',410,235],['and',540,235]];
const S2={ hL:{type:'box',x:35,y:70,w:260,h:46,c:'pinksoft',text:'Flip the meaning',s:22}, hR:{type:'box',x:345,y:70,w:260,h:46,c:'oksoft',text:'Keep the meaning',s:22} };
LW.forEach(([t,x,y],i)=>{ S2['r'+i]={type:'note',x,y,w:126,h:62,c:'n1',text:t,size:fitSize(t),rot:i%2?1.5:-1.5}; });
RW.forEach(([t,x,y],i)=>{ S2['l'+i]={type:'note',x,y,w:126,h:62,c:'n3',text:t,size:fitSize(t),rot:i%2?1.5:-1.5}; });
S2.foot={type:'text',x:320,y:320,s:30,hand:true,text:'Flip or keep?'};

const OP=[['abundant',110],['limited',250],['vast',390],['varied',530]];
const S3={ w1:{type:'text',x:163,y:95,s:26,text:'Despite'}, b:blank(232,68,130,40,22), w2:{type:'text',x:451,y:95,s:26,text:'resources,'},
  w3:{type:'text',x:320,y:150,s:24,text:'the team achieved impressive results.'},
  pred:{type:'note',x:320,y:210,w:260,h:54,c:'n0',text:'Your guess: few',size:24,rot:-1.5} };
OP.forEach(([t,x],i)=>{ S3['o'+i]={type:'box',x:x-62,y:256,w:124,h:46,c:'surface',text:t,s:21}; });
S3.v={type:'check',x:250,y:330,s:.6};

const S4={ l1:{type:'text',x:320,y:80,s:25,text:'Sam trained hard for months,'},
  b:blank(125,104,120,44,24), l2:{type:'text',x:377,y:134,s:25,text:'he lost the race.'},
  ans:{type:'note',x:185,y:126,w:120,h:50,c:'n0',text:'yet',size:26,rot:-1.5},
  why:{type:'text',x:320,y:235,s:26,hand:true,text:'Hard work, then a loss: the meaning flips'} };

const S5={ a:{type:'note',x:120,y:160,w:186,h:96,c:'n0',text:'1 Signal word',size:20,rot:-2},
  b:{type:'note',x:320,y:160,w:186,h:96,c:'n1',text:'2 Predict',size:22,rot:1.5},
  c:{type:'note',x:520,y:160,w:186,h:96,c:'n3',text:'3 Then options',size:19,rot:-1.5},
  foot:{type:'text',x:320,y:292,s:26,hand:true,text:'Options come after your guess, not before'} };

XP.add({ key:'en-co-signals', lang:'en', sk:'completion', ord:10, title:'Signal words in sentence completion', min:'4 min',
  goals:['See how the signal word sets the direction of the missing word','Tell contrast words apart from cause and addition words','Predict the missing word before reading the options'],
  scenes:[
  { t:'Sentences have a direction', items:S1, beats:[
    { say:'In sentence completion, the signal word is your compass. It shows which way the missing part goes.', show:['s','sig','b'] },
    { say:'It was raining, so we took umbrellas. So keeps the meaning going the same way.', set:{b:'we took umbrellas'}, show:['hint'] },
    { say:'Switch to but, and it flips: it was raining, but the trip went ahead.', set:{sig:'but',b:'the trip went ahead',hint:'flips ↩'}, show:['foot'] } ]},
  { t:'Flip words and keep words', items:S2, beats:[
    { say:'Contrast words flip the meaning: but, although, whereas, however.', show:['hL','r0','r1','r2','r3'], gap:.3 },
    { say:'Cause and addition words keep it going: because, so, therefore, and.', show:['hR','l0','l1','l2','l3'], gap:.3 },
    { say:'So ask first: does the signal flip the meaning, or keep it?', show:['foot'], hl:['hL','hR'] } ]},
  { t:'Predict before the options', items:S3, beats:[
    { say:'Cover the options first. The team did impressively despite its resources.', show:['w1','b','w2','w3'], gap:.2 },
    { say:'Despite flips the meaning, and the result is impressive. So the resources must have been few.', hl:['w1'], show:['pred'] },
    { say:'Now read the options. Limited matches your guess.', show:['o0','o1','o2','o3','v'], gap:.15, set:{b:'limited'} },
    { say:'Abundant and vast agree with the result instead of flipping it, so cross them out.', strike:['o0','o2'] } ]},
  { t:'Your turn: which word?', items:S4, beats:[
    { say:'Your turn. Does the second half keep the first, or flip it?', show:['l1','b','l2'], gap:.25 },
    { say:'Sam trained hard for months, then lost the race. Which word fits the blank?', hl:['b'] } ],
    ask:{ opts:['so','because','yet','therefore'], a:2, show:['ans','why'],
      right:'Well done. Hard training leads you to expect a win, so a loss needs a flip word: yet.',
      wrong:'Careful. Hard training suggests a win, but he lost, so the meaning flips. The answer is yet.' } },
  { t:'Your steps', items:S5, beats:[
    { say:'Your steps: find the signal, predict your word, then read the options.', show:['a','b','c'], gap:.4 },
    { say:'Predicting first protects you from an attractive option that points the wrong way.', show:['foot'] } ]},
  ],
  quiz:[
    {q:'Despite the ______ weather, the children went out to play in the park.', o:['mild','freezing','lovely','clear'], a:1, e:'"Despite" flips the meaning: they went out even though the weather was bad, so "freezing".'},
    {q:'She went to bed early; ______, she woke up full of energy.', o:['however','although','as a result','whereas'], a:2, e:'Waking up energetic is a result of sleeping early, so we need a result word: "as a result".'},
    {q:'My brother loves sports, ______ my sister prefers reading.', o:['because','whereas','therefore','so'], a:1, e:'Two different preferences are contrasted, so "whereas" fits.'},
  ] });

/* ================= Lesson: two blanks & meaning agreement ================= */
const OPT=[['strengthens / whereas',165,202],['weakens / but',475,202],['strengthens / so',165,264],['damages / and',475,264]];
const T1={ a1:{type:'text',x:171,y:92,s:26,text:'Enough sleep'}, b1:blank(278,66,160,40,21), a2:{type:'text',x:515,y:92,s:26,text:'memory,'},
  b2:blank(58,120,120,40,21), a3:{type:'text',x:374,y:146,s:24,text:'staying up late weakens it.'} };
OPT.forEach(([t,x,y],i)=>{ T1['o'+i]={type:'box',x:x-135,y:y-24,w:270,h:48,c:'surface',text:t,s:20}; });
T1.v={type:'check',x:320,y:202,s:.55};

const T2={ a1:{type:'text',x:238,y:110,s:26,text:'The lecture was so'}, b1:blank(392,84,150,44,22),
  a2:{type:'text',x:188,y:180,s:26,text:'that most students'}, b2:blank(342,154,190,44,21), a3:{type:'text',x:569,y:180,s:26,text:'it.'},
  x:{type:'cross',x:320,y:258,s:.8}, v:{type:'check',x:320,y:258,s:.8},
  tag:{type:'text',x:320,y:322,s:26,hand:true,text:'Check the whole sentence, not each blank'} };

const CL=[['pay','attention',170,125],['make','a decision',470,125],['take','a risk',170,225],['give','a speech',470,225]];
const T3={}; CL.forEach(([v,n,x,y],i)=>{ T3['v'+i]={type:'note',x:x-68,y,w:128,h:62,c:'n2',text:v,size:26,rot:-1.5}; T3['n'+i]={type:'note',x:x+68,y,w:128,h:62,c:'n0',text:n,size:n.length>=10?18:n.length>=8?20:24,rot:1.5}; });
T3.foot={type:'text',x:320,y:315,s:28,hand:true,text:'A verb calls for its usual partner'};

const T4={ l1:{type:'text',x:157,y:80,s:22,text:'The state pays close'}, b1:blank(301,57,130,36,20), w2:{type:'text',x:529,y:80,s:22,text:'to education,'},
  b2:blank(79,103,100,36,20), l2:{type:'text',x:376,y:126,s:22,text:'it funds schools generously.'},
  ans:{type:'note',x:320,y:225,w:300,h:64,c:'n0',text:'attention + so',size:27,rot:-1.5} };

const T5={ a:{type:'note',x:120,y:160,w:186,h:96,c:'n0',text:'1 Clearer blank',size:18,rot:-2},
  b:{type:'note',x:320,y:160,w:186,h:96,c:'n1',text:'2 Eliminate',size:22,rot:1.5},
  c:{type:'note',x:520,y:160,w:186,h:96,c:'n3',text:'3 Read it all',size:21,rot:-1.5},
  foot:{type:'text',x:320,y:292,s:26,hand:true,text:'And watch for words that go together'} };

XP.add({ key:'en-co-twoblank', lang:'en', sk:'completion', ord:20, title:'Two blanks and meaning agreement', min:'4 min',
  goals:['Start with the clearer blank and use it to eliminate options','Check that the whole sentence makes sense','Recognize collocations such as "pay attention"'],
  scenes:[
  { t:'Start with the clearer blank', items:T1, beats:[
    { say:'With two blanks, don\'t solve both at once. Start with the clearer one.', show:['a1','b1','a2','b2','a3','o0','o1','o2','o3'], gap:.12 },
    { say:'Enough sleep strengthens memory; it doesn\'t weaken or damage it. Two options are out.', set:{b1:'strengthens'}, strike:['o1','o3'] },
    { say:'Two are left. Sleep and staying up late are contrasted, so we need whereas.', set:{b2:'whereas'}, strike:['o2'], show:['v'] } ]},
  { t:'Read the whole sentence', items:T2, beats:[
    { say:'After choosing, reread the whole sentence. Each blank can fit alone while the meaning still clashes.', show:['a1','b1','a2','b2','a3'], gap:.15 },
    { say:'So clear that most students misunderstood it? Each word fits alone, but together they contradict.', set:{b1:'clear',b2:'misunderstood'}, show:['x'] },
    { say:'Now: so confusing that most students misunderstood it. The whole sentence agrees.', set:{b1:'confusing'}, hide:['x'], show:['v','tag'] } ]},
  { t:'Words that go together', items:T3, beats:[
    { say:'Some words naturally go together. We call them collocations, like pay attention.', show:['v0','n0'] },
    { say:'We also say make a decision, take a risk, and give a speech.', show:['v1','n1','v2','n2','v3','n3'], gap:.25 },
    { say:'So when one of these verbs comes before a blank, look for its usual partner.', show:['foot'], hl:['v0','n0'] } ]},
  { t:'Your turn: two blanks', items:T4, beats:[
    { say:'Your turn. Start with the blank after pays close, then check the whole meaning.', show:['l1','b1','w2','b2','l2'], gap:.2 },
    { say:'Which option fills both blanks?', hl:['b1','b2'] } ],
    ask:{ opts:['attention / so','neglect / so','attention / but','disregard / and'], a:0, show:['ans'],
      right:'Well done. Pays close calls for attention, and generous funding results from it, so the link is so.',
      wrong:'Pays close calls for attention, and funding follows from it. So the answer is attention with so.' } },
  { t:'Two-blank steps', items:T5, beats:[
    { say:'Your steps: start with the clearer blank, eliminate with it, then read the whole sentence.', show:['a','b','c'], gap:.4 },
    { say:'And watch for collocations. They can settle a blank in seconds.', show:['foot'] } ]},
  ],
  quiz:[
    {q:'The runner was ______ at the start of the race, ______ he managed to win in the end.', o:['ahead / but','behind / but','behind / so','tired / because'], a:1, e:'Winning after falling behind is a surprise, so the second blank needs a contrast word: "but".'},
    {q:'The father pays close ______ to his children\'s upbringing.', o:['attention','thought','decision','opinion'], a:0, e:'"Pay close attention" is a fixed collocation.'},
    {q:'The manager made a firm ______, ______ the problem was solved quickly.', o:['decision / so','opinion / but','decision / although','stance / whereas'], a:0, e:'"Make a decision" is a collocation, and the quick fix is a result of it, so "so".'},
  ] });
})();
/* English explainers: context */
(function(){ if(!window.XP||!XP.ready) return;

/* Lays out an English sentence word by word (left to right, centered on x=320).
   Words starting with '*' are underlined with a line item.
   Adds to `items`: highlight boxes <id>g<k> (oksoft) and <id>r<k> (badsoft) behind each underlined word,
   words <id>w<l>_<i>, underlines <id>u<k>. Returns {words:[keys], lines:[keys], pos:[{x,y,w}]} per underlined word. */
/* approximate bold advance widths (em) for a wide sans; narrower web fonts only widen the gaps */
const CW={a:.68,b:.72,c:.59,d:.72,e:.68,f:.44,g:.72,h:.71,i:.34,j:.34,k:.67,l:.34,m:1.04,n:.71,o:.69,p:.72,q:.72,r:.49,s:.6,t:.48,u:.71,v:.65,w:.92,x:.65,y:.65,z:.58,I:.37,T:.68,',':.38,'.':.38,'-':.42,"'":.33,':':.4};
function sentence(items,id,lines,{y0=110,lh=66,s=24,gap}={}){
  const G=gap??s*.4, est=w=>Math.max(1,[...w].reduce((a,ch)=>a+(CW[ch]??(/[A-Z]/.test(ch)?.77:.66)),0))*s;
  const out={words:[],lines:[],pos:[]}, words=[], k={n:0};
  lines.forEach((ln,li)=>{ const y=y0+li*lh; const ws=ln.map(w=>{ const u=w[0]==='*', t=u?w.slice(1):w; return {t,u,w:est(t)}; });
    const W=ws.reduce((a,b)=>a+b.w,0)+G*(ws.length-1); let x=320-W/2;
    ws.forEach((o,i)=>{ const cx=x+o.w/2; x+=o.w+G; words.push({key:`${id}w${li}_${i}`,t:o.t,cx,y});
      if(o.u){ const n=k.n++; const hw=o.w/2+4; out.pos.push({x:cx,y,w:o.w});
        items[`${id}g${n}`]={type:'box',x:cx-hw,y:y-s*1.02,w:hw*2,h:s*1.45,c:'oksoft',stroke:false,rx:8};
        items[`${id}r${n}`]={type:'box',x:cx-hw,y:y-s*1.02,w:hw*2,h:s*1.45,c:'badsoft',stroke:false,rx:8}; } }); });
  words.forEach(w=>{ items[w.key]={type:'text',x:w.cx,y:w.y,s,text:w.t}; out.words.push(w.key); });
  out.pos.forEach((p,n)=>{ const key=`${id}u${n}`; items[key]={type:'line',x1:p.x-p.w*.45,y1:p.y+9,x2:p.x+p.w*.45,y2:p.y+9,cls:'s-pri'}; out.lines.push(key); });
  return out;
}
const mark=(items,key,type,p,dy=40,s=.62)=>{ items[key]={type,x:p.x,y:p.y+dy,s}; };

/* ================= Lesson 1: what a contextual error is ================= */
const PLAYER=[['The','player','*trained','*hard','all','week,'],['so','his','form','*slipped','and','he','*starred.']];
const A1={}, a1=sentence(A1,'a',PLAYER,{y0:115,lh:74});
A1.tag={type:'note',x:320,y:292,w:480,h:62,c:'n1',text:'An error of meaning, not grammar',size:21,rot:-1};

const A2={}, a2=sentence(A2,'b',PLAYER,{y0:115,lh:74});
Object.assign(A2,{ idea:{type:'note',x:190,y:290,w:260,h:62,c:'n3',text:'The idea: hard work',size:21,rot:-1.5},
  ar:{type:'arrow',x1:326,y1:280,x2:400,y2:280,cls:'s-pink',bend:-26},
  idea2:{type:'note',x:480,y:290,w:140,h:62,c:'n3',text:'success',size:23,rot:1.5} });

const A3={}, a3=sentence(A3,'c',PLAYER,{y0:100,lh:92});
a3.pos.forEach((p,i)=>mark(A3,'m'+i,i===2?'cross':'check',p,42));
A3.fix={type:'note',x:320,y:318,w:290,h:54,c:'n0',text:'slipped → improved',size:23,rot:-1.5};

const A4={}, a4=sentence(A4,'d',[['Ice','*melts','when','the','temperature','*falls,'],['*turning','it','into','liquid','*water.']],{y0:74,lh:52,s:22});
A4.ans={type:'note',x:320,y:230,w:260,h:64,c:'n0',text:'falls → rises',size:26,rot:-1.5};

const A5={ s1:{type:'note',x:130,y:170,w:176,h:90,c:'n0',text:'1 The idea',size:23,rot:-2},
  s2:{type:'note',x:320,y:170,w:176,h:90,c:'n1',text:'2 Anchors',size:23,rot:1.5},
  s3:{type:'note',x:510,y:170,w:176,h:90,c:'n3',text:'3 Test each',size:22,rot:-1.5},
  foot:{type:'text',x:320,y:292,s:26,hand:true,text:'Try the opposite: if it fits, you found it'} };

XP.add({ key:'en-cx-what', lang:'en', sk:'context', ord:10, title:'What is a contextual error?', min:'3 min',
  goals:['Know that a contextual error is one word that breaks the meaning','Find the main idea before looking at single words','Test each underlined word against the idea','Confirm the error by trying its opposite'],
  scenes:[
  { t:'One word breaks it', items:A1, beats:[
    { say:'A contextual error question gives you a sentence with correct grammar and four underlined words.', show:a1.words, gap:.08 },
    { say:'Only one of those four words breaks the meaning. That is your answer.', show:a1.lines, gap:.3 },
    { say:'So the error is not in grammar or spelling. It is in the meaning.', show:['tag'] } ]},
  { t:'Start with the idea', items:A2, beats:[
    { say:'Don\'t start word by word. Read the whole sentence and ask: what is its main idea?', show:a2.words, gap:.05 },
    { say:'A player trained hard all week, and then starred. That is the idea.', show:['bg1','bg3','idea','ar','idea2'] },
    { say:'Hard work and starring are the anchors of the meaning, and they point the same way.', show:a2.lines, hl:['idea','idea2'] } ]},
  { t:'Test each word', items:A3, beats:[
    { say:'Now test each underlined word against the idea. Trained fits. Hard fits.', show:[...a3.words,...a3.lines,'cg0','cg1','m0','m1'], gap:.03 },
    { say:'His form slipped? Someone who trains hard doesn\'t slip and then star. This word contradicts the idea.', show:['cr2','m2'] },
    { say:'Starred fits. Now try the opposite: his form improved. The sentence makes sense.', show:['cg3','m3','fix'] } ]},
  { t:'Your turn: ice', items:A4, beats:[
    { say:'Your turn. Find the idea of the sentence first, then test the four words.', show:[...a4.words,...a4.lines], gap:.06 },
    { say:'Ice melts when the temperature falls, turning it into liquid water. Which word breaks the meaning?', hl:a4.lines } ],
    ask:{ opts:['melts','falls','turning','water'], a:1, show:['ans'],
      right:'Well done. Ice melts when the temperature rises, not when it falls. The error is falls.',
      wrong:'Check the science. Ice melts when the temperature rises, so the error is falls.' } },
  { t:'Your steps', items:A5, beats:[
    { say:'So your steps: find the idea, spot the anchors, then test each word.', show:['s1','s2','s3'], gap:.45 },
    { say:'Suspect a word? Try its opposite. If the meaning works, you have found the error.', show:['foot'] } ]},
  ],
  quiz:[
    {q:'Find the contextual error: "The traveler was so thirsty that he drank water until he was hungry."', o:['thirsty','drank','water','hungry'], a:3, e:'Drinking water ends thirst, not hunger; the right word would be "satisfied".'},
    {q:'Find the contextual error: "The sun rises in the west every morning, filling the land with light."', o:['rises','west','morning','light'], a:1, e:'The sun rises in the east, so "west" breaks the meaning.'},
    {q:'What is the first step in a contextual error question?', o:['Pick the hardest word','Find the main idea of the sentence','Read only the options','Look for a grammar mistake'], a:1, e:'The main idea is the measure you test every underlined word against.'},
  ] });

/* ================= Lesson 2: strategies and traps ================= */
const B1={}, b1=sentence(B1,'a',[['The','*wise','leader','makes','his','decisions'],['*recklessly,','after','*careful','*study.']],{y0:105,lh:70});
Object.assign(B1,{ x:{type:'cross',x:b1.pos[1].x,y:b1.pos[1].y+42,s:.62},
  fix:{type:'note',x:320,y:292,w:380,h:62,c:'n0',text:'recklessly → thoughtfully',size:22,rot:-1.5} });

const B2={}, b2=sentence(B2,'b',[['She','woke','up','*early','and','*caught','the','bus,'],['*but','she','reached','school','*before','everyone.']],{y0:95,lh:62});
Object.assign(B2,{ c1:{type:'box',x:45,y:230,w:220,h:52,c:'surface2',text:'woke up early',s:21},
  ar:{type:'arrow',x1:270,y1:246,x2:370,y2:246,cls:'s-pink',bend:-30,text:'result'},
  c2:{type:'box',x:375,y:230,w:220,h:52,c:'surface2',text:'arrived first',s:21},
  x:{type:'cross',x:b2.pos[2].x,y:b2.pos[2].y+40,s:.6},
  fix:{type:'note',x:320,y:318,w:220,h:50,c:'n0',text:'but → so',size:25,rot:-1.5} });

const B3={}, b3=sentence(B3,'c',[['The','*diligent','scientist','spent','*years'],['*ignoring','his','tests','before','his','*discovery.']],{y0:96,lh:92});
Object.assign(B3,{ ok:{type:'check',x:b3.pos[0].x,y:b3.pos[0].y+40,s:.6}, x:{type:'cross',x:b3.pos[2].x,y:b3.pos[2].y+40,s:.6},
  n1:{type:'note',x:170,y:292,w:300,h:58,c:'n3',text:'diligent = hard-working',size:20,rot:-1.5},
  n2:{type:'note',x:480,y:292,w:280,h:58,c:'n1',text:'ignoring → repeating',size:21,rot:1.5} });

const B4={}, b4=sentence(B4,'d',[['The','weather','was','*cold,','so','the','children','*wore'],['*light','clothes','before','*going','out.']],{y0:74,lh:52,s:22});
B4.ans={type:'note',x:320,y:230,w:250,h:64,c:'n0',text:'light → warm',size:26,rot:-1.5};

const B5={ r1:{type:'note',x:130,y:160,w:170,h:90,c:'n0',text:'Opposite',size:27,rot:-1.5},
  r2:{type:'note',x:320,y:160,w:170,h:90,c:'n3',text:'Link',size:30,rot:1.5},
  r3:{type:'note',x:510,y:160,w:170,h:90,c:'n1',text:'Difficulty',size:24,rot:-1.5},
  k1:{type:'text',x:130,y:245,s:24,hand:true,text:'try it'}, k2:{type:'text',x:320,y:245,s:24,hand:true,text:'check it'}, k3:{type:'text',x:510,y:245,s:24,hand:true,text:'don\'t judge by it'},
  foot:{type:'text',x:320,y:312,s:26,text:'The error clashes with the idea'} };

XP.add({ key:'en-cx-traps', lang:'en', sk:'context', ord:20, title:'Contextual errors: strategies and traps', min:'4 min',
  goals:['Expose the error by trying the opposite word','Check the link between the two halves: result or contrast','Never judge a word by how hard it is','Apply the steps to a full question'],
  scenes:[
  { t:'The error is the opposite', items:B1, beats:[
    { say:'In most questions, the wrong word is the exact opposite of the right one.', show:[...b1.words,...b1.lines], gap:.05 },
    { say:'A wise leader makes his decisions recklessly? Wisdom and recklessness don\'t go together.', show:['ar1','x'] },
    { say:'Try the opposite: thoughtfully. Now the meaning works, so that is the error.', show:['ag0','ag2','ag3','fix'] } ]},
  { t:'Check the linking word', items:B2, beats:[
    { say:'Check the link between the two halves. Is the second a result of the first, or its opposite?', show:[...b2.words,...b2.lines], gap:.05 },
    { say:'She woke up early and caught the bus, so arriving first is the natural result.', show:['c1','ar','c2'] },
    { say:'So the contrast word but doesn\'t fit here. The right word is so.', show:['br2','x','fix'] } ]},
  { t:'Don\'t judge by difficulty', items:B3, beats:[
    { say:'A hard word is not always the error. It may be there just to distract you.', show:[...b3.words,...b3.lines], gap:.05 },
    { say:'Diligent means hard-working, and it fits with years of research.', show:['cg0','ok','n1'] },
    { say:'Ignoring is easy, but it breaks the meaning. A diligent scientist repeats his tests.', show:['cr2','x','n2'] } ]},
  { t:'Your turn: cold weather', items:B4, beats:[
    { say:'Your turn. Find the idea, check the link, then try the opposite.', show:[...b4.words,...b4.lines], gap:.06 },
    { say:'The weather was cold, so the children wore light clothes before going out. Where is the error?', hl:b4.lines } ],
    ask:{ opts:['cold','wore','light','going'], a:2, show:['ans'],
      right:'Well done. So links a cause to its result, and cold weather calls for warm clothes.',
      wrong:'Look at so: it links cause and result. Cold weather calls for warm clothes, so the error is light.' } },
  { t:'Three rules', items:B5, beats:[
    { say:'Remember three rules: try the opposite, check the link, and don\'t let a hard word fool you.', show:['r1','k1','r2','k2','r3','k3'], gap:.3 },
    { say:'A contextual error clashes with the sentence\'s idea, not with how hard the word is.', show:['foot'] } ]},
  ],
  quiz:[
    {q:'Find the contextual error: "Omar studied hard, but he passed the exam with top marks."', o:['studied','hard','but','top'], a:2, e:'Passing is a result of studying hard, so the link should be "so", not the contrast word "but".'},
    {q:'Find the contextual error: "The speaker was known for his eloquence, so his words were clumsy and easy for everyone to follow."', o:['known','eloquence','clumsy','follow'], a:2, e:'"Clumsy" is the opposite of eloquent; the right word would be "graceful" or "clear".'},
    {q:'In a contextual error sentence, the hardest, least common word:', o:['is always the error','is not necessarily the error','is always a linking word','always comes first'], a:1, e:'You judge a word by whether it fits the idea, not by how hard it is.'},
  ] });
})();
/* English explainers: geometry */
(function(){ if(!window.XP||!XP.ready) return;
/* ---- small geometry helpers (angles in visual degrees, counter-clockwise, 0 = pointing right) ---- */
const R1=v=>Math.round(v*10)/10;
const P=(c,r,a)=>[R1(c[0]+r*Math.cos(a*Math.PI/180)),R1(c[1]-r*Math.sin(a*Math.PI/180))];
const arcD=(c,r,a0,a1)=>{ const p=P(c,r,a0), q=P(c,r,a1); return `M${p[0]} ${p[1]} A${r} ${r} 0 ${a1-a0>180?1:0} 0 ${q[0]} ${q[1]}`; };
const ang=(c,r,a0,a1,cls='s-pri')=>({type:'path',d:arcD(c,r,a0,a1),cls});
const lab=(c,r,a,text,cls='t-ink',s=20)=>{ const p=P(c,r,a); return {type:'eq',x:p[0],y:R1(p[1]+s*0.36),s,text,cls}; };
const seg=(p,q,cls='s-ink')=>({type:'line',x1:p[0],y1:p[1],x2:q[0],y2:q[1],cls});
const pts=a=>a.map(p=>p.join(',')).join(' ');
const rmark=(c,a0,k=14)=>{ const u=P(c,k,a0), w=P(c,k,a0+90), m=[R1(u[0]+w[0]-c[0]),R1(u[1]+w[1]-c[1])]; return {type:'path',d:`M${u[0]} ${u[1]} L${m[0]} ${m[1]} L${w[0]} ${w[1]}`,cls:'s-ink'}; };
const tick=(p,q)=>{ const mx=(p[0]+q[0])/2, my=(p[1]+q[1])/2, L=Math.hypot(q[0]-p[0],q[1]-p[1]), nx=-(q[1]-p[1])/L*9, ny=(q[0]-p[0])/L*9;
  return {type:'path',d:`M${R1(mx-nx)} ${R1(my-ny)} L${R1(mx+nx)} ${R1(my+ny)}`,cls:'s-pri'}; };
/* apex of a triangle on base b-c with base angles ab (at b) and ac (at c) */
const apex=(b,c,ab,ac)=>{ const w=c[0]-b[0], tb=Math.tan(ab*Math.PI/180), tc=Math.tan(ac*Math.PI/180), x=w*tc/(tb+tc); return [R1(b[0]+x),R1(b[1]-x*tb)]; };
const circD=(c,r)=>`M${c[0]+r} ${c[1]} A${r} ${r} 0 1 0 ${c[0]-r} ${c[1]} A${r} ${r} 0 1 0 ${c[0]+r} ${c[1]}`;

/* =================== 1. Angles =================== */
{
const O=[220,230], O2=[220,210];
const X=[220,205];
const T1=[250,130], T2=[R1(250-100/Math.tan(Math.PI/3)),230];
const Q1=[340,100], Q2=[R1(340-65/Math.tan(Math.PI/3)),165];
XP.add({ key:'en-ge-angles', lang:'en', sk:'geometry', ord:10, title:'Angles and parallel lines', min:'3 min',
  goals:['Know that a straight angle is 180° and a full turn is 360°','Use the fact that vertical angles are equal','Spot corresponding and alternate angles on parallel lines','Find a missing angle in a GAT-style figure'],
  scenes:[
  { t:'A line and a full turn', items:{
      ln:seg([70,230],[370,230]), o:{type:'dot',x:O[0],y:O[1],r:5,c:'ink'},
      a180:ang(O,45,0,180,'s-pri'), l180:lab(O,72,90,'180°','t-pri',22),
      ray:seg(O,P(O,150,50)),
      a50:ang(O,40,0,50,'s-pink'), l50:lab(O,68,22,'?','t-hand',24),
      a130:ang(O,30,50,180,'s-ok'), l130:lab(O,58,118,'130°','t-ok'),
      eq1:{type:'eq',x:220,y:292,s:26,text:'180 − 130 = 50',cls:'t-ink'},
      n1:{type:'note',x:505,y:135,h:62,c:'n0',w:230,text:'Straight = 180°',size:22,rot:-3},
      r1:seg(O2,P(O2,115,90)), r2:seg(O2,P(O2,115,200)), r3:seg(O2,P(O2,115,320)), o2:{type:'dot',x:O2[0],y:O2[1],r:5,c:'ink'},
      b1:ang(O2,30,90,200,'s-pink'), b2:ang(O2,30,200,320,'s-ok'), b3:ang(O2,30,320,450,'s-pri'),
      k1:lab(O2,60,145,'110°','t-ink'), k2:lab(O2,60,260,'120°','t-ink'), k3:lab(O2,62,25,'130°','t-ink'),
      n2:{type:'note',x:505,y:255,w:236,h:62,c:'n3',text:'Full turn = 360°',size:22,rot:2} },
    beats:[
      { say:'A straight angle is half a turn: one hundred and eighty degrees.', show:['ln','o','a180','l180','n1'] },
      { say:'A ray splits it into two angles that always total one hundred and eighty.', hide:['a180','l180'], show:['ray','a130','l130','a50','l50'] },
      { say:'If one is one hundred and thirty, the other is one hundred and eighty minus that, which is fifty.', set:{l50:'50°'}, show:['eq1'] },
      { say:'A full turn is three hundred and sixty degrees, so angles around a point add up to that.', hide:['ln','o','ray','a50','l50','a130','l130','eq1'], show:['r1','r2','r3','o2','b1','k1','b2','k2','b3','k3','n2'], gap:.12 },
    ]},
  { t:'Vertical angles', items:{
      m1:seg(P(X,150,30),P(X,150,210)), m2:seg(P(X,150,150),P(X,150,330)),
      aR:ang(X,36,-30,30,'s-pink'), aL:ang(X,36,150,210,'s-pink'), aT:ang(X,28,30,150,'s-ok'), aB:ang(X,28,210,330,'s-ok'),
      lR:lab(X,66,0,'60°','t-ink'), lL:lab(X,66,180,'60°','t-ink'), lT:lab(X,52,90,'120°','t-ink'), lB:lab(X,52,270,'120°','t-ink'),
      n1:{type:'note',x:505,y:140,w:240,h:62,c:'n1',text:'Vertical: equal',size:22,rot:-2},
      n2:{type:'note',x:505,y:255,w:240,h:62,c:'n0',text:'Neighbors: 180°',size:22,rot:2} },
    beats:[
      { say:'Two crossing lines make four angles.', show:['m1','m2'] },
      { say:'Vertical angles face each other and are equal. If this one is sixty, its opposite is sixty too.', show:['aR','lR','aL','lL','n1'] },
      { say:'Neighbors on a line add up to one hundred and eighty, so the other two are each one hundred and twenty.', show:['aT','lT','aB','lB','n2'] },
    ]},
  { t:'Parallel lines and a transversal', items:{
      p1:seg([50,T1[1]],[370,T1[1]]), p2:seg([50,T2[1]],[370,T2[1]]), tr:seg(P(T1,55,60),P(T2,55,240)),
      F:{type:'path',d:`M${P(T1,55,60).join(' ')} L${T2.join(' ')} L${T2[0]+90} ${T2[1]} M${T1.join(' ')} L${T1[0]+90} ${T1[1]}`,cls:'s-pri'},
      Z:{type:'path',d:`M${T1[0]-90} ${T1[1]} L${T1.join(' ')} L${T2.join(' ')} L${T2[0]+90} ${T2[1]}`,cls:'s-pri'},
      c1:ang(T1,26,0,60,'s-pink'), lc1:lab(T1,50,30,'60°','t-ink'),
      c2:ang(T2,26,0,60,'s-pink'), lc2:lab(T2,50,30,'60°','t-ink'),
      al:ang(T1,26,180,240,'s-ok'), lal:lab(T1,50,210,'60°','t-ink'),
      n1:{type:'note',x:505,y:140,w:250,h:60,c:'n1',text:'Corresponding: equal',size:18,rot:-2},
      n2:{type:'note',x:505,y:235,w:250,h:60,c:'n3',text:'Alternate: equal',size:19,rot:2},
      warn:{type:'text',x:225,y:318,s:22,text:'Only if the lines are parallel!',hand:true} },
    beats:[
      { say:'Parallel lines never meet. A transversal cuts across both.', show:['p1','p2','tr'] },
      { say:'Corresponding angles sit in the same spot at each crossing, and they are equal.', show:['F','c1','lc1','c2','lc2','n1'] },
      { say:'Alternate interior angles lie between the lines, on opposite sides of the transversal. Also equal.', hide:['F','c1','lc1'], show:['Z','al','lal','n2'], hl:['c2'] },
      { say:'Careful: these rules only work when the lines are parallel.', show:['warn'] },
    ]},
  { t:'Your turn: find x', items:{
      p1:seg([150,Q1[1]],[520,Q1[1]]), p2:seg([150,Q2[1]],[520,Q2[1]]), tr:seg(P(Q1,32,60),P(Q2,32,240)),
      a60:ang(Q1,22,0,60,'s-pink'), l60:lab(Q1,52,18,'60°','t-ink'),
      as:ang(Q2,22,240,360,'s-ok'), ls:lab(Q2,40,300,'x','t-ok',22),
      c2:ang(Q2,22,0,60,'s-pink'), lc2:lab(Q2,52,18,'60°','t-hand',22),
      eq:{type:'eq',x:320,y:290,s:30,text:'180 − 60 = 120°',cls:'t-pri'} },
    beats:[
      { say:'Two parallel lines, cut by a transversal. The top angle is sixty degrees.', show:['p1','p2','tr','a60','l60'] },
      { say:'What is angle x at the bottom crossing?', show:['as','ls'] },
    ],
    ask:{ opts:['60°','120°','30°','240°'], a:1, y:246,
      right:'Correct. The corresponding angle below is sixty, and it shares a line with x, so x is one hundred and twenty.',
      wrong:'It is one hundred and twenty. The angle matching sixty sits next to x on a line, so x is one hundred and eighty minus sixty.',
      show:['c2','lc2','eq'] } },
  ],
  quiz:[
    {q:'Two adjacent angles lie on a straight line. One is 110°. What is the other?', o:['70°','110°','80°','250°'], a:0, e:'They add up to 180°, so 180 − 110 = 70°.'},
    {q:'Two lines intersect, and one of the angles is 45°. What is the angle vertically opposite it?', o:['135°','45°','90°','315°'], a:1, e:'Vertical angles are equal. 135° is the neighboring angle.'},
    {q:'Three angles around a point are 120°, 150° and x. What is x?', o:['60°','100°','90°','210°'], a:2, e:'Angles around a point add up to 360°, so x = 360 − 270 = 90°.'},
  ] });
}

/* =================== 2. Triangles =================== */
{
const B=[60,275], C=[330,275], A=apex(B,C,60,50);
const I1=[80,280], I2=[250,280], IA=apex(I1,I2,65,65);
const E1=[360,280], E2=[560,280], EA=apex(E1,E2,60,60);
const S1=[268,200], S2=[372,200], SA=apex(S1,S2,70,70);
const letters=[[A[0],A[1]-12,'A',22],[B[0]-12,B[1]+24,'B',22],[C[0]+12,C[1]+24,'C',22]];
XP.add({ key:'en-ge-triangles', lang:'en', sk:'geometry', ord:20, title:'Triangles and their angles', min:'3 min',
  goals:['See why the angles of a triangle add up to 180°','Find an exterior angle from the two far interior angles','Use the properties of isosceles and equilateral triangles'],
  scenes:[
  { t:'The angle sum', items:{
      tri:{type:'poly',points:pts([A,B,C]),c:'prisoft',labels:letters},
      aB:ang(B,34,0,60,'s-pink'), lB:lab(B,60,28,'60°'),
      aC:ang(C,34,130,180,'s-ok'), lC:lab(C,60,156,'50°'),
      aA:ang(A,30,240,310,'s-pri'), lA:lab(A,58,275,'70°'),
      par:seg([A[0]-110,A[1]],[A[0]+110,A[1]]),
      cL:ang(A,30,180,240,'s-pink'), lcL:lab(A,54,208,'60°'),
      cR:ang(A,30,310,360,'s-ok'), lcR:lab(A,54,332,'50°'),
      n1:{type:'note',x:510,y:135,w:200,h:62,c:'n0',text:'Sum = 180°',size:24,rot:-3},
      bx:{type:'box',x:384,y:215,w:246,h:56,c:'surface',text:'60 + 70 + 50 = 180',s:20,ltr:true} },
    beats:[
      { say:'This is triangle A B C. It has three angles.', show:['tri'] },
      { say:'Angle B is sixty, angle C is fifty, and angle A is seventy.', show:['aB','lB','aC','lC','aA','lA'], gap:.3 },
      { say:'Draw a line through A parallel to the base. The new angles match the base angles, because they are alternate.', show:['par','cL','lcL','cR','lcR'] },
      { say:'The three angles at A form a straight line, so any triangle’s angles add up to one hundred and eighty degrees.', show:['n1','bx'], hl:['aA'] },
    ]},
  { t:'The exterior angle', items:{
      tri:{type:'poly',points:pts([A,B,C]),c:'prisoft',labels:letters},
      aB:ang(B,34,0,60,'s-pink'), lB:lab(B,60,28,'60°'),
      aA:ang(A,30,240,310,'s-pri'), lA:lab(A,58,275,'70°'),
      ext:seg(C,[420,C[1]]),
      aX:ang(C,26,0,130,'s-pink'), lX:lab(C,52,62,'?','t-hand',24),
      aC:ang(C,40,130,180,'s-ok'), lC:lab(C,64,156,'50°','t-ok'),
      bx:{type:'box',x:415,y:100,w:195,h:56,c:'surface',text:'60 + 70 = 130',s:22,ltr:true},
      n1:{type:'note',x:510,y:205,w:236,h:66,c:'n1',text:'Exterior = A + B',size:22,rot:2} },
    beats:[
      { say:'In the same triangle, angle B is sixty and angle A is seventy.', show:['tri','aB','lB','aA','lA'] },
      { say:'Extend the base past C to make an exterior angle. How big is it?', show:['ext','aX','lX'] },
      { say:'It equals the two far interior angles added: sixty plus seventy equals one hundred and thirty.', set:{lX:'130°'}, show:['bx','n1'] },
      { say:'Check: with its neighbor, fifty, it makes one hundred and eighty.', show:['aC','lC'] },
    ]},
  { t:'Isosceles and equilateral', items:{
      iso:{type:'poly',points:pts([IA,I1,I2]),c:'pinksoft'}, t1:tick(I1,IA), t2:tick(I2,IA),
      i1:ang(I1,28,0,65,'s-pink'), li1:lab(I1,52,30,'65°'), i2:ang(I2,28,115,180,'s-pink'), li2:lab(I2,52,150,'65°'),
      i3:ang(IA,26,245,295,'s-pri'), li3:lab(IA,50,270,'50°','t-pri'),
      cap1:{type:'text',x:165,y:322,s:20,text:'Isosceles',cls:'t-ink2'},
      equ:{type:'poly',points:pts([EA,E1,E2]),c:'oksoft'}, u1:tick(E1,EA), u2:tick(E2,EA), u3:tick(E1,E2),
      e1:lab(E1,42,30,'60°'), e2:lab(E2,42,150,'60°'), e3:lab(EA,44,270,'60°'),
      cap2:{type:'text',x:460,y:322,s:20,text:'Equilateral',cls:'t-ink2'} },
    beats:[
      { say:'An isosceles triangle has two equal sides, marked with ticks.', show:['iso','t1','t2','cap1'] },
      { say:'Its base angles are equal too. If one is sixty-five, so is the other.', show:['i1','li1','i2','li2'] },
      { say:'The third angle is one hundred and eighty minus one hundred and thirty, which is fifty.', show:['i3','li3'] },
      { say:'An equilateral triangle has three equal sides, and every angle is sixty degrees.', show:['equ','u1','u2','u3','e1','e2','e3','cap2'], gap:.2 },
    ]},
  { t:'Your turn: the base angle', items:{
      tri:{type:'poly',points:pts([SA,S1,S2]),c:'pinksoft'}, t1:tick(S1,SA), t2:tick(S2,SA),
      aA:ang(SA,24,250,290,'s-pri'), lA:lab(SA,52,270,'40°','t-pri',18),
      b1:ang(S1,22,0,70,'s-pink'), lb:lab(S1,42,35,'x','t-hand',24), b2:ang(S2,22,110,180,'s-pink'),
      cap:{type:'text',x:500,y:136,s:24,text:'Isosceles',hand:true},
      eq:{type:'eq',x:320,y:290,s:30,text:'(180 − 40) ÷ 2 = 70°',cls:'t-pri'} },
    beats:[
      { say:'An isosceles triangle has a top angle of forty degrees.', show:['tri','t1','t2','aA','lA','cap'] },
      { say:'What is each base angle, x?', show:['b1','b2','lb'] },
    ],
    ask:{ opts:['40°','70°','140°','50°'], a:1, y:246,
      right:'Well done. That leaves one hundred and forty, shared by two equal angles, so each is seventy.',
      wrong:'It is seventy. One hundred and eighty minus forty is one hundred and forty, split equally between the two base angles.',
      show:['eq'] } },
  ],
  quiz:[
    {q:'Two angles of a triangle are 45° and 75°. What is the third angle?', o:['60°','50°','70°','120°'], a:0, e:'180 − (45 + 75) = 60°.'},
    {q:'An exterior angle of a triangle is 110°. One of the two far interior angles is 40°. What is the other?', o:['30°','70°','150°','50°'], a:1, e:'The exterior angle equals the two far angles added, so 110 − 40 = 70°.'},
    {q:'An equilateral triangle. First quantity: one of its angles. Second quantity: 60°', o:['A: The first is greater','B: The second is greater','C: The two are equal','D: Cannot be determined'], a:2, e:'Each angle of an equilateral triangle is 180 ÷ 3 = 60°.'},
  ] });
}

/* =================== 3. Perimeter and area =================== */
{
const rect=[[90,100],[330,100],[330,260],[90,260]];
const L=[[300,70],[400,70],[400,190],[240,190],[240,130],[300,130]];
XP.add({ key:'en-ge-area', lang:'en', sk:'geometry', ord:30, title:'Perimeter and area', min:'4 min',
  goals:['Tell perimeter and area apart','Find the area of a rectangle and a square','Find a triangle’s area as half the base times the height','Split a composite shape into simple shapes'],
  scenes:[
  { t:'Perimeter: the fence', items:{
      r:{type:'poly',points:pts(rect),c:'prisoft'},
      lt:{type:'text',x:210,y:88,s:22,text:'6 cm'}, lb:{type:'text',x:210,y:290,s:22,text:'6 cm'},
      ll:{type:'text',x:58,y:188,s:22,text:'4 cm'}, lr:{type:'text',x:362,y:188,s:22,text:'4 cm'},
      trace:{type:'path',d:'M90 100 H330 V260 H90 Z',cls:'s-pink'},
      eq1:{type:'eq',x:495,y:150,s:24,text:'6 + 4 + 6 + 4 = 20',cls:'t-ink'},
      n1:{type:'note',x:505,y:250,w:264,h:66,c:'n0',text:'2 × (length + width)',size:20,rot:-2} },
    beats:[
      { say:'Perimeter is the distance around a shape, like walking once along its fence.', show:['r','lt','lr','lb','ll'], gap:.25 },
      { say:'Add all four sides: six plus four plus six plus four equals twenty centimeters.', show:['trace','eq1'] },
      { say:'In short: two times the length plus the width.', show:['n1'] },
    ]},
  { t:'Area: count the squares', items:{
      g:{type:'grid',x:90,y:100,rows:4,cols:6,cell:38,gap:2,fill:24,c:'n2'},
      lt:{type:'text',x:209,y:88,s:22,text:'6 cm'}, ll:{type:'text',x:58,y:188,s:22,text:'4 cm'},
      eq1:{type:'eq',x:505,y:150,s:26,text:'6 × 4 = 24 cm²',cls:'t-pri'},
      sq:{type:'grid',x:460,y:225,rows:5,cols:5,cell:16,gap:2,fill:25,c:'n1'},
      eq2:{type:'eq',x:505,y:345,s:22,text:'5 × 5 = 25',cls:'t-ink'},
      n1:{type:'text',x:505,y:212,s:22,text:'Square',cls:'t-ink2'} },
    beats:[
      { say:'Area is the number of small squares that cover a shape.', show:['g'] },
      { say:'Four rows of six squares: six times four is twenty-four square centimeters.', show:['lt','ll','eq1'] },
      { say:'A square’s area is its side times itself. Side five gives area twenty-five.', show:['sq','n1','eq2'] },
    ]},
  { t:'Area of a triangle', items:{
      box:{type:'path',d:'M70 110 H286 V254 H70 Z',cls:'s-ink'},
      oL:{type:'poly',points:'70,110 170,110 70,254',c:'surface2'}, oR:{type:'poly',points:'170,110 286,110 286,254',c:'surface2'},
      tri:{type:'poly',points:'70,254 286,254 170,110',c:'pinksoft'},
      h:seg([170,110],[170,254],'s-pri'), rm:{type:'path',d:'M170 242 H182 V254',cls:'s-ink'},
      lbase:{type:'text',x:178,y:284,s:22,text:'base 6'},
      hb:seg([300,110],[300,254],'s-pri'), lh:{type:'text',x:366,y:190,s:22,text:'height 4',cls:'t-pri'},
      eq1:{type:'eq',x:515,y:150,s:26,text:'½ × 6 × 4 = 12',cls:'t-pri'},
      n1:{type:'note',x:510,y:255,w:236,h:66,c:'n0',text:'½ × base × height',size:20,rot:-2} },
    beats:[
      { say:'Draw the triangle inside a rectangle with the same base and height.', show:['box','tri','lbase'] },
      { say:'The height splits the rectangle in two, and the triangle fills exactly half of each part.', show:['h','rm','oL','oR'] },
      { say:'So the triangle is half the rectangle: one half times six times four equals twelve.', show:['hb','lh','eq1'] },
      { say:'Remember: half the base times the height. The height meets the base at a right angle; it is not the slanted side.', show:['n1'], hl:['h'] },
    ]},
  { t:'Your turn: a composite shape', items:{
      sh:{type:'poly',points:pts(L),c:'prisoft'},
      l5:lab([350,55],0,0,'5'), l6:lab([416,130],0,0,'6'), l8:lab([320,208],0,0,'8'), l3:lab([226,160],0,0,'3'),
      l3a:lab([270,120],0,0,'3','t-ink2',18), l3b:lab([288,100],0,0,'3','t-ink2',18),
      cut:seg([300,130],[400,130],'s-pink'),
      iA:lab([320,160],0,0,'24','t-pri',22), iB:lab([350,100],0,0,'15','t-pri',22),
      eq:{type:'eq',x:320,y:290,s:30,text:'24 + 15 = 39',cls:'t-pri'} },
    beats:[
      { say:'This composite shape has no single formula.', show:['sh','l5','l6','l8','l3','l3a','l3b'], gap:.15 },
      { say:'Cut it into two rectangles and add their areas. What is the total area?', show:['cut'] },
    ],
    ask:{ opts:['48','39','28','45'], a:1, y:248,
      right:'Correct. The bottom rectangle is eight times three, twenty-four. The top is five times three, fifteen. Total, thirty-nine.',
      wrong:'It is thirty-nine: twenty-four for the bottom rectangle and fifteen for the top. Careful, twenty-eight is the perimeter, not the area.',
      show:['iA','iB','eq'] } },
  ],
  quiz:[
    {q:'A rectangle is 9 cm long and 4 cm wide. What is its area?', o:['26 cm²','36 cm²','13 cm²','45 cm²'], a:1, e:'9 × 4 = 36 cm². 26 is the perimeter.'},
    {q:'A triangle has a base of 10 and a height of 6. What is its area?', o:['60','16','30','32'], a:2, e:'½ × 10 × 6 = 30.'},
    {q:'A square has a perimeter of 20 cm. What is its area?', o:['25 cm²','20 cm²','100 cm²','40 cm²'], a:0, e:'The side is 20 ÷ 4 = 5, so the area is 5 × 5 = 25 cm².'},
  ] });
}

/* =================== 4. Pythagoras =================== */
{
const C1=[110,270], A1=[110,138], B1=[286,270];
const C=[220,232], A=[220,160], B=[316,232];
const Q=[270,190], QA=[270,118], QB=[366,190];
XP.add({ key:'en-ge-pyth', lang:'en', sk:'geometry', ord:40, title:'The Pythagorean theorem', min:'3 min',
  goals:['Identify the hypotenuse of a right triangle','Understand the Pythagorean theorem with squares','Memorize the triples 3-4-5, 6-8-10 and 5-12-13','Find a missing side quickly'],
  scenes:[
  { t:'The right triangle', items:{
      tri:{type:'poly',points:pts([A1,B1,C1]),c:'prisoft'}, rm:rmark(C1,0,16),
      g1:{type:'text',x:84,y:212,s:20,text:'leg',cls:'t-ink2'}, g2:{type:'text',x:198,y:296,s:20,text:'leg',cls:'t-ink2'},
      hyp:seg(A1,B1,'s-pink'), lh:{type:'text',x:262,y:180,s:24,text:'hypotenuse',hand:true},
      n1:{type:'note',x:500,y:140,w:220,h:62,c:'n1',text:'The longest side',size:22,rot:-2},
      n2:{type:'note',x:500,y:250,w:270,h:62,c:'n3',text:'Faces the right angle',size:19,rot:2} },
    beats:[
      { say:'A right triangle has one angle of ninety degrees. We mark it with a small square.', show:['tri','rm'] },
      { say:'The two sides that form the right angle are called the legs.', show:['g1','g2'] },
      { say:'The side facing the right angle is the hypotenuse, always the longest side.', show:['hyp','lh','n1','n2'] },
    ]},
  { t:'The rule with squares', items:{
      q3:{type:'grid',x:148,y:160,rows:3,cols:3,cell:22,gap:2,fill:9,c:'n1'},
      q4:{type:'grid',x:220,y:232,rows:4,cols:4,cell:22,gap:2,fill:16,c:'n3'},
      q5:{type:'grid',x:245,y:89,rows:5,cols:5,cell:22,gap:2,fill:25,c:'n2',rot:36.87},
      tri:{type:'poly',points:pts([A,B,C]),c:'prisoft'}, rm:rmark(C,0,12),
      s3:lab([204,203],0,0,'3'), s4:lab([268,254],0,0,'4'), s5:lab([280,182],0,0,'5'),
      t9:lab([184,196],0,0,'9','t-note',28), t16:lab([268,282],0,0,'16','t-note',28), t25:lab([304,150],0,0,'25','t-note',30),
      bx:{type:'box',x:425,y:120,w:185,h:56,c:'surface',text:'9 + 16 = 25',s:24,ltr:true},
      n1:{type:'note',x:517,y:240,w:200,h:66,c:'n0',text:'a² + b² = c²',size:28,rot:-2},
      cap:{type:'text',x:517,y:310,s:20,text:'c is the hypotenuse',hand:true} },
    beats:[
      { say:'In this right triangle, the legs are three and four, and the hypotenuse is five.', show:['tri','rm','s3','s4','s5'] },
      { say:'Draw a square on each leg: areas nine and sixteen.', hide:['s3','s4','s5'], show:['q3','t9','q4','t16'] },
      { say:'The square on the hypotenuse has area twenty-five, exactly nine plus sixteen.', show:['q5','t25','bx'] },
      { say:'That is the Pythagorean theorem: a squared plus b squared equals c squared, where c is the hypotenuse.', show:['n1','cap'] },
    ]},
  { t:'Triples to memorize', items:{
      n1:{type:'note',x:150,y:145,w:180,h:76,c:'n0',text:'3, 4, 5',size:32,rot:-3},
      e1:{type:'eq',x:150,y:218,s:20,text:'9 + 16 = 25',cls:'t-ink2'},
      ar:{type:'arrow',x1:250,y1:128,x2:378,y2:128,bend:-40,text:'× 2'},
      n2:{type:'note',x:480,y:145,w:180,h:76,c:'n3',text:'6, 8, 10',size:32,rot:2},
      e2:{type:'eq',x:480,y:218,s:20,text:'36 + 64 = 100',cls:'t-ink2'},
      n3:{type:'note',x:315,y:275,w:210,h:76,c:'n1',text:'5, 12, 13',size:32,rot:-1},
      e3:{type:'eq',x:315,y:340,s:20,text:'25 + 144 = 169',cls:'t-ink2'} },
    beats:[
      { say:'Memorize a few famous side sets to save time. The best known is three, four, five.', show:['n1','e1'] },
      { say:'Multiples work too. Double it and you get six, eight, ten.', show:['ar','n2','e2'] },
      { say:'Another one is five, twelve, thirteen. Look for these before you calculate.', show:['n3','e3'] },
    ]},
  { t:'Your turn: the missing side', items:{
      tri:{type:'poly',points:pts([QA,QB,Q]),c:'prisoft'}, rm:rmark(Q,0,12),
      l6:lab([254,160],0,0,'6'), l10:lab([332,142],0,0,'10'), ls:lab([318,205],0,0,'x','t-hand',24),
      n1:{type:'note',x:500,y:150,w:200,h:62,c:'n2',text:'x² = 10² − 6²',size:24,rot:-3},
      eq:{type:'eq',x:320,y:290,s:28,text:'x² = 100 − 36 = 64  →  x = 8',cls:'t-pri'} },
    beats:[
      { say:'In this right triangle, we know the hypotenuse, ten, and one leg, six.', show:['tri','rm','l6','l10','ls'] },
      { say:'To find a missing leg, subtract: the hypotenuse squared minus the known leg squared.', show:['n1'] },
      { say:'How long is side x?', hl:['ls'] },
    ],
    ask:{ opts:['4','8','16','12'], a:1, y:248,
      right:'Well done. One hundred minus thirty-six is sixty-four, and its square root is eight: three, four, five doubled.',
      wrong:'It is eight. One hundred minus thirty-six is sixty-four, whose square root is eight. Notice: three, four, five doubled.',
      show:['eq'] } },
  ],
  quiz:[
    {q:'A right triangle has legs of 5 and 12. How long is the hypotenuse?', o:['17','13','15','14'], a:1, e:'The (5, 12, 13) triple: 25 + 144 = 169 = 13².'},
    {q:'A right triangle has a hypotenuse of 20 and one leg of 12. How long is the other leg?', o:['8','16','14','10'], a:1, e:'(3, 4, 5) × 4 gives 12, 16, 20.'},
    {q:'Which set could be the side lengths of a right triangle?', o:['4, 5, 6','5, 6, 7','9, 12, 15','2, 3, 4'], a:2, e:'9, 12, 15 is (3, 4, 5) × 3, and 81 + 144 = 225 = 15².'},
  ] });
}

/* =================== 5. Circles =================== */
{
const K=[190,210], K2=[190,205];
const cl=[170,200], cr=[460,200], d=R1(85/Math.SQRT2);
XP.add({ key:'en-ge-circle', lang:'en', sk:'geometry', ord:50, title:'The circle', min:'3 min',
  goals:['Know the radius, the diameter and how they relate','Find the circumference 2πr and the area πr²','Link a circle to a square drawn inside it or around it'],
  scenes:[
  { t:'Radius and diameter', items:{
      c:{type:'circle',cx:K[0],cy:K[1],r:110,c:'surface2'},
      r1:seg(K,P(K,110,45),'s-line'), r2:seg(K,P(K,110,205),'s-line'), r3:seg(K,P(K,110,255),'s-line'),
      cen:{type:'dot',x:K[0],y:K[1],r:5,c:'ink',text:'O',dx:12,dy:28},
      rad:seg(K,P(K,110,0),'s-pri'), lr:{type:'eq',x:250,y:198,s:22,text:'r',cls:'t-pri'},
      dia:seg(P(K,110,150),P(K,110,330),'s-pink'), ld:{type:'text',x:340,y:294,s:22,text:'diameter',hand:true},
      n1:{type:'note',x:505,y:140,w:230,h:62,c:'n1',text:'diameter = 2r',size:24,rot:-2},
      n2:{type:'note',x:505,y:255,w:230,h:62,c:'n3',text:'r = diameter ÷ 2',size:22,rot:2} },
    beats:[
      { say:'Every point on a circle is the same distance from one point, the center.', show:['c','cen','r1','r2','r3'] },
      { say:'That distance is called the radius.', show:['rad','lr'] },
      { say:'The diameter runs through the center, edge to edge, so it is twice the radius.', show:['dia','ld','n1'] },
      { say:'Careful: if you are given the diameter, halve it before you use a formula.', show:['n2'] },
    ]},
  { t:'Circumference and area', items:{
      fill:{type:'circle',cx:K2[0],cy:K2[1],r:100,c:'prisoft'},
      edge:{type:'circle',cx:K2[0],cy:K2[1],r:100,c:'surface2'},
      trace:{type:'path',d:circD(K2,100),cls:'s-pink'},
      rad:seg(K2,P(K2,100,0),'s-ink'), lr:{type:'eq',x:240,y:196,s:22,text:'r = 3',cls:'t-ink'},
      n1:{type:'note',x:495,y:115,w:272,h:58,c:'n1',text:'Circumference = 2πr',size:20,rot:-2},
      n2:{type:'note',x:495,y:200,w:272,h:58,c:'n2',text:'Area = πr²',size:22,rot:2},
      x1:{type:'eq',x:490,y:275,s:22,text:'Circumference = 6π',cls:'t-ink'},
      x2:{type:'eq',x:490,y:310,s:22,text:'Area = 9π',cls:'t-pri'},
      pi:{type:'eq',x:190,y:342,s:22,text:'π ≈ 3.14',cls:'t-ink2'} },
    beats:[
      { say:'The circumference is the distance around: two times pi times the radius.', show:['edge','trace','n1'] },
      { say:'The area is the space inside: pi times the radius squared.', hide:['edge'], show:['fill','n2'] },
      { say:'For a circle with radius three, the circumference is six pi and the area is nine pi.', show:['rad','lr','x1','x2'] },
      { say:'Pi is about three point one four. Answers are usually left in terms of pi.', show:['pi'] },
    ]},
  { t:'Circles and squares', items:{
      sqO:{type:'poly',points:pts([[cl[0]-70,cl[1]-70],[cl[0]+70,cl[1]-70],[cl[0]+70,cl[1]+70],[cl[0]-70,cl[1]+70]]),c:'oksoft'},
      cL:{type:'circle',cx:cl[0],cy:cl[1],r:70,c:'prisoft'},
      dL:seg([cl[0]-70,cl[1]],[cl[0]+70,cl[1]],'s-pri'),
      capL:{type:'text',x:cl[0],y:302,s:20,text:'side = diameter'},
      cR:{type:'circle',cx:cr[0],cy:cr[1],r:85,c:'oksoft'},
      sqI:{type:'poly',points:pts([[cr[0]-d,cr[1]-d],[cr[0]+d,cr[1]-d],[cr[0]+d,cr[1]+d],[cr[0]-d,cr[1]+d]]),c:'prisoft'},
      dR:seg([cr[0]-d,cr[1]+d],[cr[0]+d,cr[1]-d],'s-pink'),
      capR:{type:'text',x:cr[0],y:318,s:20,text:'diagonal = diameter'},
      tip:{type:'text',x:320,y:348,s:22,text:'Always draw the diameter',hand:true} },
    beats:[
      { say:'When a circle fits inside a square, the square’s side equals the circle’s diameter.', show:['sqO','cL','dL','capL'] },
      { say:'When a square sits inside a circle, the square’s diagonal is the circle’s diameter.', show:['cR','sqI','dR','capR'] },
      { say:'Both cases come up often in the GAT. Draw the diameter first, and the answer follows.', show:['tip'], hl:['dL','dR'] },
    ]},
  { t:'Your turn: circle in a square', items:{
      sq:{type:'poly',points:'260,72 380,72 380,192 260,192',c:'oksoft'},
      c:{type:'circle',cx:320,cy:132,r:60,c:'prisoft'},
      l10:lab([234,139],0,0,'10','t-ink',22),
      dia:seg([260,132],[380,132],'s-pri'),
      eq:{type:'eq',x:320,y:290,s:30,text:'r = 5  →  area = 25π',cls:'t-pri'} },
    beats:[
      { say:'A square with side ten has a circle inside it that touches all four sides.', show:['sq','c','l10'] },
      { say:'Remember, the square’s side is the circle’s diameter. What is the area of the circle?', show:['dia'] },
    ],
    ask:{ opts:['100π','25π','10π','20π'], a:1, y:248,
      right:'Excellent. The diameter is ten, so the radius is five, and the area is pi times twenty-five.',
      wrong:'It is twenty-five pi. The diameter is ten, so the radius is five, and five squared is twenty-five. Forgetting to halve gives one hundred pi.',
      show:['eq'] } },
  ],
  quiz:[
    {q:'A circle has a radius of 4 cm. What is its circumference?', o:['16π','8π','4π','64π'], a:1, e:'C = 2 × π × 4 = 8π. 16π is the area.'},
    {q:'A circle has a diameter of 10. What is its area?', o:['100π','10π','25π','50π'], a:2, e:'r = 5, so the area is π × 5² = 25π.'},
    {q:'A square is drawn inside a circle of radius 5. How long is the square’s diagonal?', o:['5','10','25','5√2'], a:1, e:'The square’s diagonal is the circle’s diameter: 2 × 5 = 10.'},
  ] });
}
})();
/* English explainers: odd (odd one out) */
(function(){ if(!window.XP||!XP.ready) return;

/* four word notes in a row (LTR: first word on the left) */
const W4=(words,y,cols,size=26)=>{ const xs=[135,265,395,525], o={}; words.forEach((w,i)=>{ o['w'+(i+1)]={type:'note',x:xs[i],y,w:116,h:76,c:cols[i],text:w,size,rot:[-3,2,-2,3][i]}; }); return o; };

XP.add({ key:'en-od-link', lang:'en', sk:'odd', ord:10, title:'Odd one out: find the link', min:'3 min',
  goals:['Recognize the odd-one-out question','Find the link between three words before choosing','Spot the kinds of link: meaning, category, part, degree','Pick the word that breaks the link'],
  scenes:[
  { t:'Three belong, one doesn’t',
    items:{
      frame:{type:'path',d:'M79 128 H451 Q465 128 465 142 V218 Q465 232 451 232 H79 Q65 232 65 218 V142 Q65 128 79 128 Z',cls:'s-pri'},
      q:{type:'text',x:340,y:88,s:22,cls:'t-ink2',text:'Which word does not belong?'},
      ...W4(['hawk','pigeon','eagle','wolf'],180,['n0','n3','n2','n1']),
      lab:{type:'text',x:265,y:280,s:32,hand:true,text:'all birds'},
      x:{type:'cross',x:525,y:272},
    },
    beats:[
      { say:'In an odd-one-out question you get four words. Three share one link, and the fourth does not.', show:['q','w1','w2','w3','w4'], gap:.3 },
      { say:'Don’t hunt for the odd word. Find the link first: hawk, pigeon and eagle are all birds.', show:['frame','lab'] },
      { say:'A wolf is not a bird, so it breaks the link. The wolf is the odd one out.', show:['x'], hl:['w4'] },
    ]},
  { t:'Kinds of link',
    items:(()=>{ const o={}; const rows=[['Meaning','happy · glad · joyful','sad'],['Category','apple · banana · grape','carrot'],['Parts','wheel · brake · engine','sail'],['Degree','drizzle · rain · downpour','thunder']];
      rows.forEach(([tag,ws,odd],i)=>{ const y=100+i*66; o['t'+i]={type:'box',x:30,y:y-22,w:130,h:44,c:'prisoft',text:tag,s:19,cls:'t-pri'}; o['r'+i]={type:'text',x:330,y:y+7,s:20,text:ws}; o['o'+i]={type:'box',x:495,y:y-21,w:115,h:42,c:'pinksoft',text:odd,s:20}; });
      return o; })(),
    beats:[
      { say:'It can be meaning: happy, glad and joyful are synonyms, and sad is their opposite.', show:['t0','r0','o0'] },
      { say:'A category: apple, banana and grape are fruits, but a carrot is a vegetable.', show:['t1','r1','o1'] },
      { say:'Parts of one thing: a wheel, a brake and an engine belong to a car, but a sail belongs to a boat.', show:['t2','r2','o2'] },
      { say:'Or degrees: drizzle, rain, then a downpour. Thunder is not a kind of rain.', show:['t3','r3','o3'] },
    ]},
  { t:'Three steps',
    items:{
      s1:{type:'note',x:135,y:170,w:170,h:72,c:'n0',text:'Read all four',size:18,rot:-2},
      s2:{type:'note',x:320,y:170,w:170,h:72,c:'n3',text:'Name the link',size:18,rot:2},
      s3:{type:'note',x:505,y:170,w:170,h:72,c:'n2',text:'Test the fourth',size:18,rot:-2},
      n1:{type:'text',x:135,y:112,s:24,cls:'t-pri',text:'1'},
      n2:{type:'text',x:320,y:112,s:24,cls:'t-pri',text:'2'},
      n3:{type:'text',x:505,y:112,s:24,cls:'t-pri',text:'3'},
      a1:{type:'arrow',x1:212,y1:216,x2:242,y2:216,bend:22,cls:'s-pink'},
      a2:{type:'arrow',x1:397,y1:216,x2:427,y2:216,bend:22,cls:'s-pink'},
      tip:{type:'text',x:320,y:294,s:30,hand:true,text:'No link? Try meaning, category, parts, degree'},
    },
    beats:[
      { say:'Step one: read all four words before you judge any of them.', show:['n1','s1'] },
      { say:'Step two: name the link between three of them, such as birds or fruits.', show:['a1','n2','s2'] },
      { say:'Step three: test the fourth word against that link. If it breaks it, it is the odd one.', show:['a2','n3','s3'] },
      { say:'No link yet? Try another kind: meaning, category, parts, then degree.', show:['tip'] },
    ]},
  { t:'Your turn',
    items:{
      q:{type:'text',x:320,y:92,s:32,cls:'t-pri',text:'page · cover · index · shelf'},
      sub:{type:'text',x:320,y:130,s:19,cls:'t-ink2',text:'Find the link first, then pick the odd word'},
      ans:{type:'note',x:320,y:220,w:420,h:70,c:'n0',text:'All parts of a book except shelf',size:23,rot:-1},
    },
    beats:[
      { say:'Your turn: page, cover, index, shelf. Find the link, then choose the odd one out.', show:['q','sub'] },
    ],
    ask:{ opts:['page','cover','index','shelf'], a:3,
      right:'Well done. A page, a cover and an index are parts of a book. A shelf holds books, but it is not part of one.',
      wrong:'A page, a cover and an index are all parts of a book. A shelf is not, so it is the odd one out.',
      show:['ans'] } },
  ],
  quiz:[
    {q:'Choose the word that does not belong:', o:['bee','butterfly','sparrow','fly'], a:2, e:'A bee, a butterfly and a fly are insects; a sparrow is a bird.'},
    {q:'Choose the word that does not belong:', o:['brave','cowardly','bold','fearless'], a:1, e:'Brave, bold and fearless are synonyms; cowardly is their opposite.'},
    {q:'Choose the word that does not belong:', o:['trunk','branch','vase','leaf'], a:2, e:'A trunk, a branch and a leaf are parts of a tree; a vase is not.'},
  ]});

XP.add({ key:'en-od-deep', lang:'en', sk:'odd', ord:20, title:'Finer links and the look-alike trap', min:'4 min',
  goals:['Look for a finer link when a broad one fits all four words','Spot links such as tools of one trade and synonyms','Ignore words that only look or sound alike','Check your answer with: all are … except …'],
  scenes:[
  { t:'A finer link',
    items:{
      ...W4(['sickle','plow','scalpel','hoe'],140,['n0','n0','n0','n0']),
      g:{type:'text',x:320,y:250,s:30,hand:true,text:'All tools? Too broad'},
      t1:{type:'box',x:85,y:205,w:100,h:40,c:'prisoft',text:'farmer',s:19,cls:'t-pri'},
      t2:{type:'box',x:215,y:205,w:100,h:40,c:'prisoft',text:'farmer',s:19,cls:'t-pri'},
      t3:{type:'box',x:345,y:205,w:100,h:40,c:'pinksoft',text:'surgeon',s:19},
      t4:{type:'box',x:475,y:205,w:100,h:40,c:'prisoft',text:'farmer',s:19,cls:'t-pri'},
      rule:{type:'text',x:320,y:300,s:23,cls:'t-pri',text:'The finer link: tools of one trade'},
    },
    beats:[
      { say:'Sickle, plow, scalpel, hoe. At first glance they are all tools.', show:['w1','w2','w3','w4'], gap:.3 },
      { say:'That link is too broad: it fits all four, so it can’t separate them. We need a finer one.', show:['g'] },
      { say:'A sickle, a plow and a hoe are a farmer’s tools; a scalpel is a surgeon’s. So the scalpel is odd.', hide:['g'], show:['t1','t2','t4','t3','rule'], gap:.3, hl:['w3'] },
    ]},
  { t:'Different words, same thing',
    items:{
      ...W4(['sofa','chair','couch','settee'],140,['n3','n1','n3','n3']),
      x:{type:'cross',x:265,y:222},
      xl:{type:'text',x:250,y:278,s:28,hand:true,text:'another seat'},
      nt:{type:'note',x:490,y:262,w:210,h:62,c:'n0',text:'Names for a sofa',size:20,rot:-2},
    },
    beats:[
      { say:'Sofa, chair, couch, settee. You can sit on all four, so where is the link?', show:['w1','w2','w3','w4'], gap:.3 },
      { say:'Look at meaning: couch and settee are other names for a sofa. Those three are synonyms.', show:['nt'], hl:['w1','w3','w4'] },
      { say:'A chair is a different seat, not another name for a sofa. So the chair is the odd one out.', show:['x','xl'] },
    ]},
  { t:'The look-alike trap',
    items:{
      ...W4(['bay','sea','ocean','tea'],140,['n3','n3','n3','n1']),
      trap:{type:'text',x:320,y:238,s:30,hand:true,text:'bay · sea · tea: three short words'},
      m1:{type:'box',x:85,y:205,w:100,h:40,c:'n3',text:'water',s:19,cls:'t-note'},
      m2:{type:'box',x:215,y:205,w:100,h:40,c:'n3',text:'water',s:19,cls:'t-note'},
      m3:{type:'box',x:345,y:205,w:100,h:40,c:'n3',text:'water',s:19,cls:'t-note'},
      x:{type:'cross',x:525,y:225},
      rule:{type:'text',x:320,y:300,s:23,cls:'t-pri',text:'Meaning is the link, not spelling'},
    },
    beats:[
      { say:'Bay, sea, ocean, tea. Bay, sea and tea are short words, and sea and tea rhyme.', show:['w1','w2','w3','w4'], gap:.3 },
      { say:'So some pick ocean because it looks different. That is a trap: looking alike is not a link.', show:['trap'], strike:['trap'] },
      { say:'The real link is meaning: a bay, a sea and an ocean are bodies of water. The odd one is tea.', hide:['trap'], show:['m1','m2','m3','x','rule'], gap:.3 },
    ]},
  { t:'Check with a sentence',
    items:{
      fr:{type:'note',x:360,y:78,w:260,h:50,c:'n2',text:'All are … except …',size:21,rot:-1},
      ex:{type:'box',x:80,y:190,w:480,h:56,c:'surface2',text:'All are bodies of water except tea',s:21},
      ok:{type:'text',x:320,y:298,s:30,hand:true,text:'A true sentence = a sure answer'},
      q:{type:'text',x:320,y:140,s:25,cls:'t-pri',text:'purple · maroon · simple · orange'},
      ans:{type:'note',x:320,y:222,w:400,h:66,c:'n3',text:'All are colors except simple',size:22,rot:-1},
    },
    beats:[
      { say:'Before you lock in an answer, check it with a sentence: all are something, except one.', show:['fr'] },
      { say:'For example: all are bodies of water except tea. If the sentence is true, your answer is right.', show:['ex','ok'] },
      { say:'Try it: purple, maroon, simple, orange. Which is the odd one? Use your check sentence.', hide:['ex','ok'], show:['q'] },
    ],
    ask:{ opts:['purple','maroon','simple','orange'], a:2,
      right:'Well done. All are colors except simple, and the look-alike ending did not fool you.',
      wrong:'Simple looks like purple, but looks are not a link. All are colors except simple.',
      show:['ans'] } },
  ],
  quiz:[
    {q:'Choose the word that does not belong:', o:['scissors','comb','hairdryer','oar'], a:3, e:'Scissors, a comb and a hairdryer are a hairdresser’s tools; an oar is used for rowing.'},
    {q:'Choose the word that does not belong:', o:['doctor','physician','nurse','medic'], a:2, e:'Doctor, physician and medic name the same job; a nurse is a different job.'},
    {q:'Choose the word that does not belong:', o:['star','sun','moon','spoon'], a:3, e:'A star, the sun and the moon are in the sky. Moon and spoon rhyme, but rhyming is not a link.'},
  ]});
})();
/* English explainers: reading (reading comprehension) */
(function(){ if(!window.XP||!XP.ready) return;

/* passage card: a box plus one left-aligned text item per line (keys pbox, l1, l2, …) */
const PASS=(lines,y,{lh=38,s=19,h}={})=>{ const o={pbox:{type:'box',x:30,y,w:580,h:h||(lines.length*lh+26),c:'surface2'}};
  lines.forEach((t,i)=>{ o['l'+(i+1)]={type:'text',x:54,y:y+13+lh*(i+0.5)+s*0.36,s,anchor:'start',text:t}; }); return o; };

/* ---------- 1. main idea vs details ---------- */
const BAMBOO=['Bamboo is one of the most useful plants.','Its young shoots are cooked as food, its tall','stems build houses, and its fibers make paper.'];
XP.add({ key:'en-re-main', lang:'en', sk:'reading', ord:10, title:'Main idea and details', min:'3 min',
  goals:['Tell the main idea from the details','Find the topic sentence in a passage','Choose a title that covers the whole passage','Rule out titles that are too narrow or too broad'],
  scenes:[
  { t:'A short passage',
    items:{
      ...PASS(BAMBOO,76,{lh:40,s:20}),
      ul:{type:'line',x1:52,y1:125,x2:520,y2:125,cls:'s-pink'},
      tag:{type:'note',x:320,y:262,w:230,h:58,c:'n2',text:'Topic sentence',size:24,rot:-2},
      tip:{type:'text',x:320,y:330,s:30,hand:true,text:'Usually the first or last sentence'},
    },
    beats:[
      { say:'Read this short passage about bamboo. Each part of it has a job.', show:['pbox','l1','l2','l3'], gap:.5 },
      { say:'The first sentence says bamboo is one of the most useful plants. That is the topic sentence.', show:['ul','tag'] },
      { say:'It usually comes at the start or the end of a passage. The other sentences give details.', show:['tip'] },
    ]},
  { t:'The umbrella and the details',
    items:{
      idea:{type:'note',x:320,y:104,w:440,h:62,c:'n0',text:'Main idea: bamboo is very useful',size:21,rot:-1},
      k1:{type:'line',x1:320,y1:138,x2:125,y2:208,cls:'s-pri'},
      k2:{type:'line',x1:320,y1:138,x2:320,y2:208,cls:'s-pri'},
      k3:{type:'line',x1:320,y1:138,x2:515,y2:208,cls:'s-pri'},
      d1:{type:'box',x:40,y:208,w:170,h:48,c:'prisoft',text:'shoots: food',s:18,cls:'t-pri'},
      d2:{type:'box',x:235,y:208,w:170,h:48,c:'prisoft',text:'stems: houses',s:18,cls:'t-pri'},
      d3:{type:'box',x:430,y:208,w:170,h:48,c:'prisoft',text:'fibers: paper',s:18,cls:'t-pri'},
      bot:{type:'text',x:320,y:314,s:30,hand:true,text:'A detail is part of the picture, not all of it'},
    },
    beats:[
      { say:'The main idea is what the whole passage is about: bamboo is very useful.', show:['idea'] },
      { say:'The details support it: shoots are food, stems build houses, and fibers make paper.', show:['k1','d1','k2','d2','k3','d3'], gap:.25 },
      { say:'Each detail is true, but covers only one part, so it can’t be the main idea.', show:['bot'], hl:['d3'] },
    ]},
  { t:'Your turn: pick a title',
    items:{
      q:{type:'text',x:320,y:90,s:28,cls:'t-pri',text:'What is the best title?'},
      sub:{type:'text',x:320,y:128,s:18,cls:'t-ink2',text:'Remember: bamboo is one of the most useful plants'},
      ans:{type:'note',x:320,y:222,w:340,h:64,c:'n3',text:'Title = main idea',size:25,rot:-1},
    },
    beats:[
      { say:'A title question is a main idea question in a few words.', show:['q'] },
      { say:'Bamboo is one of the most useful plants. Which title fits best?', show:['sub'] },
    ],
    ask:{ opts:['Bamboo in building','The uses of bamboo','The history of Asia','How paper is made'], a:1, s:19,
      right:'Well done. The uses of bamboo covers the whole passage: shoots, stems and fibers.',
      wrong:'The best title is the uses of bamboo; it covers shoots, stems and fibers. The others are too narrow or too broad.',
      show:['ans'] } },
  { t:'Narrow, broad, just right',
    items:(()=>{ const o={}; [['Bamboo in building','Too narrow','n1'],['The history of Asia','Too broad','n1'],['The uses of bamboo','Just right','n3']].forEach(([tt,tag,c],i)=>{ const y=100+i*70;
      o['r'+i]={type:'box',x:50,y:y-25,w:330,h:50,c:'surface2',text:tt,s:22}; o['t'+i]={type:'note',x:490,y,w:180,h:50,c,text:tag,size:22,rot:i%2?2:-2}; });
      o.tip={type:'text',x:320,y:322,s:30,hand:true,text:'Does it cover the start and the end?'}; return o; })(),
    beats:[
      { say:'Bamboo in building is too narrow: it covers only the stems. That is the detail trap.', show:['r0','t0'] },
      { say:'The history of Asia is too broad. The passage never mentions history.', show:['r1','t1'] },
      { say:'The uses of bamboo is just right. It covers the whole passage and nothing more.', show:['r2','t2'] },
      { say:'Before you choose, ask: does it cover both the start and the end?', show:['tip'] },
    ]},
  ],
  quiz:[
    {q:'"Sleep is essential to good health. Without it, the body heals slowly, the mind struggles to focus, and moods become harder to control." The best title is:', o:['Healing wounds','Why sleep matters for health','Dreams at night','How to focus'], a:1, e:'The first sentence is the topic sentence; the rest are examples of it.'},
    {q:'In the passage above, "the mind struggles to focus" is:', o:['the main idea','a detail that supports the main idea','the writer’s opposing view','the title of the passage'], a:1, e:'It is one example of why sleep matters, so it is a detail.'},
    {q:'A title that covers only one sentence of a passage is:', o:['just right','too narrow','too broad','complete'], a:1, e:'A good title covers the whole passage; one that covers only part of it is too narrow.'},
  ]});

/* ---------- 2. stated, inferred, not mentioned ---------- */
const WHALE=['Each autumn, humpback whales leave the cold','polar seas and swim thousands of kilometers','to warm waters, where their calves are born.'];
XP.add({ key:'en-re-stated', lang:'en', sk:'reading', ord:20, title:'Stated, inferred, or not mentioned?', min:'4 min',
  goals:['Tell a stated fact from an inferred one','Find the evidence in the passage for every answer','Answer from the passage, not from general knowledge','Solve "all of the following EXCEPT" questions'],
  scenes:[
  { t:'Three kinds',
    items:{
      ...PASS(WHALE,74,{lh:40,s:20}),
      a:{type:'note',x:125,y:272,w:170,h:60,c:'n3',text:'Stated',size:22,rot:-2},
      b:{type:'note',x:320,y:272,w:170,h:60,c:'n2',text:'Inferred',size:22,rot:2},
      c:{type:'note',x:515,y:272,w:190,h:60,c:'n1',text:'Not mentioned',size:19,rot:-2},
    },
    beats:[
      { say:'Here is a short passage about humpback whales. Every answer choice is one of three kinds.', show:['pbox','l1','l2','l3'], gap:.5 },
      { say:'It may be stated, or inferred, which means the passage points to it without saying it in those words.', show:['a','b'] },
      { say:'Or it may not be mentioned at all, even if it is true.', show:['c'] },
    ]},
  { t:'Stated or inferred?',
    items:{
      qa:{type:'box',x:30,y:66,w:580,h:44,c:'surface2',text:'"Each autumn, humpback whales leave the cold…"',s:17,cls:'t-ink2'},
      sa:{type:'box',x:30,y:124,w:430,h:48,c:'surface',text:'Humpbacks leave polar seas in autumn',s:17},
      ta:{type:'note',x:540,y:148,w:125,h:50,c:'n3',text:'Stated',size:20,rot:-2},
      qb:{type:'box',x:30,y:200,w:580,h:44,c:'surface2',text:'"…to warm waters, where their calves are born."',s:17,cls:'t-ink2'},
      sb:{type:'box',x:30,y:258,w:430,h:48,c:'surface',text:'The calves are not born in polar seas',s:17},
      tb:{type:'note',x:540,y:282,w:125,h:50,c:'n2',text:'Inferred',size:20,rot:2},
    },
    beats:[
      { say:'Compare each choice with the passage. Humpbacks leave polar seas in autumn: the first line says almost exactly that.', show:['qa','sa'] },
      { say:'So it is stated, with clear evidence.', show:['ta'] },
      { say:'Now: the calves are not born in polar seas. No line says that in those words.', show:['qb','sb'] },
      { say:'But the calves are born in warm waters, far from the cold seas. So it is inferred, and the evidence is still there.', show:['tb'] },
    ]},
  { t:'The general knowledge trap',
    items:{
      st:{type:'box',x:50,y:78,w:540,h:56,c:'surface2',text:'Humpback whales eat krill and small fish',s:20},
      ck:{type:'check',x:185,y:180},
      ckt:{type:'text',x:220,y:188,s:21,anchor:'start',text:'True in real life'},
      cr:{type:'cross',x:185,y:238},
      crt:{type:'text',x:220,y:246,s:21,anchor:'start',cls:'t-bad',text:'Not in the passage'},
      rule:{type:'note',x:320,y:310,w:400,h:58,c:'n0',text:'Answer from the passage only',size:20,rot:-2},
    },
    beats:[
      { say:'You may see a choice like this: humpback whales eat krill and small fish.', show:['st'] },
      { say:'You may even know it is true.', show:['ck','ckt'] },
      { say:'But the passage never says it, and the question is about the passage, not your knowledge. So it is not mentioned.', show:['cr','crt','rule'], gap:.35 },
    ]},
  { t:'Your turn: EXCEPT',
    items:{
      q:{type:'text',x:320,y:80,s:22,cls:'t-pri',text:'All of these are mentioned EXCEPT:'},
      sub:{type:'text',x:320,y:112,s:16,cls:'t-ink2',text:'Three choices have evidence; find the one that doesn’t'},
      ans:{type:'note',x:320,y:222,w:420,h:64,c:'n3',text:'Groups are never mentioned',size:22,rot:-1},
    },
    beats:[
      { say:'In an except question the task flips: three choices are in the passage, and you want the one that is not.', show:['q'] },
      { say:'Match each choice to its evidence. Which one does the passage not mention?', show:['sub'] },
    ],
    ask:{ opts:['They leave in autumn','They swim a long way','Calves are born in warm water','They travel in large groups'], a:3, column:true, y:156, s:18,
      right:'Well done. Autumn, the long swim and the calves are all in the passage. Groups are never mentioned.',
      wrong:'Autumn is in the first line, the long swim in the second, and the calves in the third. Groups are never mentioned.',
      show:['ans'] } },
  ],
  quiz:[
    {q:'"The museum closed early because of heavy snow, so the class went home before finishing their sketches." Why did the museum close, according to the passage?', o:['A public holiday','Heavy snow','Repair work','Too few visitors'], a:1, e:'It is stated: "because of heavy snow."'},
    {q:'From the passage above, we can infer that the class:', o:['finished their sketches early','was sketching at the museum','did not enjoy art','was afraid of snow'], a:1, e:'Not said in those words, but they left the closing museum "before finishing their sketches."'},
    {q:'The passage above mentions all of the following EXCEPT:', o:['The museum closed early','It snowed heavily','The class went home','The power went out'], a:3, e:'A power cut can happen in a storm, but the passage never mentions one.'},
  ]});

/* ---------- 3. efficient reading strategy ---------- */
const ROOF=['Sam grew tomatoes on his roof. His neighbors','mocked the idea at first, but they warmed to','it after the harvest and asked him for tips.'];
XP.add({ key:'en-re-strategy', lang:'en', sk:'reading', ord:30, title:'Read smart and fast', min:'4 min',
  goals:['Start with the questions or a quick skim','Spot the key word and go back to where it appears','Work out a word’s meaning from context','Find what a pronoun refers to'],
  scenes:[
  { t:'Start with the question',
    items:{
      qa:{type:'box',x:35,y:76,w:275,h:48,c:'prisoft',text:'What does "mocked" mean?',s:17,cls:'t-pri'},
      qb:{type:'box',x:330,y:76,w:275,h:48,c:'prisoft',text:'What does "it" refer to?',s:17,cls:'t-pri'},
      tip:{type:'text',x:320,y:164,s:30,hand:true,text:'The question tells you what to look for'},
      ...PASS(ROOF,190,{lh:40}),
    },
    beats:[
      { say:'Don’t start by reading word by word. Glance at the questions first, so you know what to look for.', show:['qa','qb'] },
      { say:'Here we need the meaning of a word, and what a pronoun refers to.', show:['tip'] },
      { say:'Then skim the passage for its topic: Sam grew tomatoes on his roof.', show:['pbox','l1','l2','l3'], gap:.4 },
    ]},
  { t:'The key word',
    items:{
      ...PASS(ROOF,64,{lh:38}),
      chip:{type:'note',x:130,y:250,w:160,h:58,c:'n1',text:'mocked',size:26,rot:-3},
      sent:{type:'box',x:245,y:224,w:350,h:52,c:'butter',text:'mocked the idea at first',s:20,cls:'t-note'},
      hint:{type:'text',x:320,y:326,s:30,hand:true,text:'Read around it, not the whole passage'},
    },
    beats:[
      { say:'Find the key word in the question. Here it is mocked.', show:['pbox','l1','l2','l3','chip'], gap:.25 },
      { say:'Scan for it, then read the sentence around it.', show:['sent'] },
      { say:'You don’t reread the whole passage for every question, so you save time.', show:['hint'] },
    ]},
  { t:'Meaning from context',
    items:{
      s1:{type:'box',x:35,y:74,w:275,h:50,c:'surface2',text:'mocked the idea at first',s:18},
      s2:{type:'box',x:330,y:74,w:275,h:50,c:'surface2',text:'but they warmed to it',s:18},
      gn:{type:'note',x:320,y:170,w:420,h:56,c:'n2',text:'but → the opposite comes next',size:20,rot:-1},
      mean:{type:'eq',x:320,y:238,s:26,cls:'t-pri',text:'mocked = made fun of'},
      test:{type:'box',x:150,y:262,w:450,h:52,c:'oksoft',text:'His neighbors made fun of the idea',s:19},
      ck:{type:'check',x:112,y:288,s:.9},
    },
    beats:[
      { say:'What does mocked mean? No dictionary needed. Look at what comes next: but they warmed to it.', show:['s1','s2'] },
      { say:'But signals a contrast. Warming to an idea is the opposite of laughing at it, so mocked means made fun of.', show:['gn','mean'] },
      { say:'Check by swapping it in: his neighbors made fun of the idea. It makes sense.', show:['test','ck'] },
    ]},
  { t:'Your turn: pronouns',
    items:{
      rule:{type:'note',x:320,y:94,w:520,h:58,c:'n0',text:'A pronoun points back to a matching noun',size:19,rot:-1},
      d1:{type:'box',x:150,y:160,w:340,h:52,c:'surface2',text:'and asked him for tips',s:22},
      dn:{type:'note',x:320,y:262,w:200,h:56,c:'n3',text:'him → Sam',size:24,rot:2},
      q:{type:'text',x:320,y:88,s:28,cls:'t-pri',text:'but they warmed to it'},
      sub:{type:'text',x:320,y:128,s:19,cls:'t-ink2',text:'What does "it" refer to?'},
      ans:{type:'note',x:320,y:222,w:260,h:64,c:'n3',text:'it → the idea',size:26,rot:-1},
    },
    beats:[
      { say:'A pronoun points back to an earlier noun that matches it: one or many, person or thing.', show:['rule'] },
      { say:'In the phrase asked him for tips, him means Sam, who grew the tomatoes.', show:['d1','dn'] },
      { say:'Now: but they warmed to it. What does it refer to?', hide:['rule','d1','dn'], show:['q','sub'] },
    ],
    ask:{ opts:['the idea','the tomatoes','the neighbors','Sam'], a:0,
      right:'Well done. It means one thing, not a person. Only the idea fits: they mocked it, then warmed to it.',
      wrong:'It means one thing. The tomatoes and neighbors are many, and Sam would be him. It refers to the idea.',
      show:['ans'] } },
  ],
  quiz:[
    {q:'"The doctor was so adept that she could diagnose an illness at a glance, and patients traveled from distant towns to see her." The word "adept" means:', o:['skilled','angry','generous','tired'], a:0, e:'The next part explains it: she could diagnose an illness at a glance.'},
    {q:'In the passage above, "her" in "to see her" refers to:', o:['the illness','the doctor','the patients','the towns'], a:1, e:'Patients traveled to see the doctor; "her" is one female person, which matches "the doctor."'},
    {q:'The best first step to save time in reading comprehension is:', o:['Memorize the passage before the questions','Read the questions or skim the passage quickly','Read every choice three times','Start with the longest question'], a:1, e:'Knowing what you need first lets you go straight to the evidence.'},
  ]});
})();
/* English explainers: stats */
(function(){ if(!window.XP||!XP.ready) return;

/* ================= 1. mean, median, mode ================= */
const card=(x,v,c)=>({type:'note',x,y:130,w:64,h:64,c,text:v,size:30});
XP.add({ key:'en-st-mean', lang:'en', sk:'stats', ord:10, title:'Mean, median and mode', min:'4 min',
  goals:['Find the mean and see it as a balance point','Use the sum trick to find a missing value','Find the median after sorting, and the mode by frequency','Avoid taking the middle before sorting'],
  scenes:[
  { t:'The mean: evening out',
    items:{ bars:{type:'bars',x:70,y:90,w:300,h:200,values:[2,8,6,4],labels:['Khalid','Noura','Sara','Ali'],max:10,c:'pri'},
      ml:{type:'line',x1:62,y1:190,x2:378,y2:190,cls:'s-pink'},
      e1:{type:'eq',x:500,y:130,s:22,text:'2 + 8 + 6 + 4 = 20'}, e2:{type:'eq',x:500,y:192,s:34,text:'20 ÷ 4 = 5',cls:'t-pri'},
      n:{type:'note',x:500,y:268,w:180,h:58,c:'n0',text:'Mean = 5',size:26,rot:-2} },
    beats:[
      { say:'The mean asks: if we shared the total equally, how much would each get?', show:['bars'] },
      { say:'Add the values: two plus eight plus six plus four is twenty.', show:['e1'] },
      { say:'Divide by how many there are: twenty divided by four is five.', show:['e2','ml'] },
      { say:'It’s a balance point: what sits above the line exactly fills the gaps below it.', show:['n'], hl:['ml'] },
    ]},
  { t:'The sum trick',
    items:{ rule:{type:'note',x:320,y:98,w:400,h:62,c:'n2',text:'Sum = mean × count',size:28,rot:-1},
      q:{type:'eq',x:320,y:168,s:20,text:'Mean of 5 numbers = 12; four of them sum to 45',cls:'t-ink2'},
      e1:{type:'eq',x:320,y:218,s:30,text:'Sum: 12 × 5 = 60'}, e2:{type:'eq',x:320,y:266,s:30,text:'60 − 45 = 15',cls:'t-pri'},
      ans:{type:'box',x:165,y:290,w:310,h:50,c:'n0',text:'Missing number: 15',s:23,cls:'t-note'} },
    beats:[
      { say:'Flip it for the best trick here: sum equals mean times count.', show:['rule'] },
      { say:'Five numbers with a mean of twelve add up to twelve times five: sixty.', show:['q','e1'] },
      { say:'If four of them make forty-five, the fifth is sixty minus forty-five.', show:['e2'] },
      { say:'That’s fifteen. When a value is missing, start with the sum.', show:['ans'] },
    ]},
  { t:'Median and mode',
    items:{ c7:card(160,'7','n3'), c3a:card(240,'3','n1'), c9:card(320,'9','n3'), c3b:card(400,'3','n1'), c5:card(480,'5','n0'),
      lm:{type:'text',x:320,y:200,s:24,text:'median',hand:true}, lo:{type:'text',x:200,y:200,s:24,text:'mode',hand:true},
      ev:{type:'eq',x:320,y:252,s:22,text:'Even count: 2, 4, 6, 8 → (4 + 6) ÷ 2 = 5',cls:'t-ink2'},
      trap:{type:'note',x:320,y:312,w:440,h:52,c:'n1',text:'Sort first, then take the middle',size:21,rot:-1} },
    beats:[
      { say:'The median is the middle number. Take these five values.', show:['c7','c3a','c9','c3b','c5'], gap:.12 },
      { say:'First, sort them from smallest to largest.', move:{c7:[240,0],c3a:[-80,0],c9:[160,0],c3b:[-160,0],c5:[-160,0]} },
      { say:'Five is in the middle, so the median is five.', show:['lm'], hl:['c5'] },
      { say:'With an even count, average the two middle numbers.', show:['ev'] },
      { say:'The mode is the most frequent value. Three appears twice, so the mode is three.', show:['lo'], hl:['c3a','c3b'] },
      { say:'The trap: take the middle before sorting and you’d say nine. Wrong.', show:['trap'] },
    ]},
  { t:'Your turn: the missing score',
    items:{ q1:{type:'eq',x:320,y:82,s:24,text:'The mean score of 4 students = 80'}, q2:{type:'eq',x:320,y:122,s:20,text:'A 5th student joins; new mean = 82. His score?'},
      t1:{type:'eq',x:320,y:198,s:26,text:'Before: 4 × 80 = 320',cls:'t-ink2'}, t2:{type:'eq',x:320,y:244,s:26,text:'After: 5 × 82 = 410',cls:'t-ink2'},
      r:{type:'box',x:180,y:270,w:280,h:54,c:'n0',text:'410 − 320 = 90',s:28,cls:'t-note',ltr:true} },
    beats:[
      { say:'Your turn. Four students average eighty. A fifth joins, and the mean becomes eighty-two.', show:['q1','q2'] },
      { say:'Use the sum trick. What did the new student score?', hl:['q2'] },
    ],
    ask:{ opts:['82','90','86','100'], a:1,
      right:'Correct! The sum grew from three hundred and twenty to four hundred and ten: ninety more.',
      wrong:'Sum before: three hundred and twenty. Sum after: five times eighty-two, four hundred and ten. The difference is ninety.',
      show:['t1','t2','r'] } },
  ],
  quiz:[
    {q:'What is the median of 8, 2, 6, 4, 10, 5?', o:['5','6','5.5','7'], a:2, e:'Sorted: 2, 4, 5, 6, 8, 10. The two middle numbers are 5 and 6, and their mean is 5.5.'},
    {q:'The mean of 6 numbers is 15. One number is removed and the mean of the rest is 14. Which number was removed?', o:['20','15','1','19'], a:0, e:'Sum before: 6 × 15 = 90. Sum after: 5 × 14 = 70. The removed number is 20.'},
    {q:'What is the mode of 4, 7, 4, 9, 7, 4, 2?', o:['7','4','5','9'], a:1, e:'4 appears three times, more than any other value.'},
  ] });

/* ================= 2. probability ================= */
const balls={}; const bcol=['bad','bad','bad','bad','butter','butter','butter','butter','butter','butter','sky','sky'];
bcol.forEach((c,i)=>{ balls['b'+i]={type:'circle',cx:177+26*i,cy:102,r:10,c}; });
XP.add({ key:'en-st-prob', lang:'en', sk:'stats', ord:20, title:'Probability from zero', min:'3 min',
  goals:['Find a probability: favorable over total','Know that a probability lies between 0 and 1','Use the complement to shorten your work','Rule out impossible choices at once'],
  scenes:[
  { t:'What is probability?',
    items:{ g:{type:'grid',x:70,y:110,rows:2,cols:5,cell:40,gap:8,fill:3,c:'pink'}, cap:{type:'eq',x:166,y:236,s:18,text:'10 cubes: 3 pink, 7 white',cls:'t-ink2'},
      qq:{type:'text',x:166,y:300,s:26,text:'Random pick: pink?',hand:true},
      top:{type:'text',x:470,y:128,s:20,text:'favorable outcomes'}, bar:{type:'line',x1:365,y1:144,x2:575,y2:144}, bot:{type:'text',x:470,y:174,s:20,text:'all possible outcomes'},
      res:{type:'box',x:390,y:220,w:160,h:60,c:'n2',text:'3/10',s:34,cls:'t-note',ltr:true} },
    beats:[
      { say:'Probability measures how likely something is. Here are ten cubes: three pink, seven white.', show:['g','cap'] },
      { say:'Pick one without looking. What’s the probability it’s pink?', show:['qq'] },
      { say:'The rule: favorable outcomes over all possible outcomes.', show:['top','bar','bot'] },
      { say:'Three out of ten, so the probability is three tenths.', show:['res'], hl:['g'] },
    ]},
  { t:'From zero to one',
    items:{ nl:{type:'nline',x1:110,x2:530,y:175,from:0,to:1,step:.25},
      d0:{type:'dot',x:110,y:175,r:9,c:'bad',text:'impossible',dy:-24,s:20}, d1:{type:'dot',x:530,y:175,r:9,c:'pri',text:'certain',dy:-24,s:20},
      dh:{type:'dot',x:320,y:175,r:9,c:'pink',text:'half',dy:-24,s:20},
      n:{type:'note',x:320,y:275,w:400,h:54,c:'n0',text:'Never below 0, never above 1',size:22,rot:-1} },
    beats:[
      { say:'Every probability is a number from zero to one.', show:['nl'] },
      { say:'Zero means impossible, like drawing a yellow cube from a bag with none.', show:['d0'] },
      { say:'One means certain, like when every cube in the bag is pink.', show:['d1'] },
      { say:'In the middle is one half, like tossing a coin: one side out of two.', show:['dh'] },
      { say:'So cross out any choice that is negative or greater than one.', show:['n'] },
    ]},
  { t:'The complement',
    items:{ rule:{type:'note',x:320,y:92,w:360,h:58,c:'n2',text:'P(not A) = 1 − P(A)',size:26,rot:-1},
      g:{type:'grid',x:70,y:150,rows:2,cols:5,cell:40,gap:8,fill:3,c:'pink'},
      e:{type:'eq',x:470,y:195,s:30,text:'1 − 3/10 = 7/10'}, h:{type:'text',x:465,y:262,s:22,text:'Count the opposite if it’s easier',hand:true} },
    beats:[
      { say:'The probability that something does not happen is one minus the probability that it does.', show:['rule'] },
      { say:'In our example, pink is three tenths, so not pink is seven tenths.', show:['g','e'] },
      { say:'Use it when the opposite is quicker to count.', show:['h'] },
    ]},
  { t:'Your turn: not red',
    items:Object.assign({ t1:{type:'eq',x:320,y:72,s:22,text:'A box holds 4 red, 6 yellow and 2 blue balls'},
      t2:{type:'eq',x:320,y:138,s:20,text:'P(the ball drawn is NOT red) = ?',cls:'t-ink2'},
      r1:{type:'box',x:220,y:190,w:200,h:60,c:'n0',text:'8/12 = 2/3',s:32,cls:'t-note',ltr:true}, r2:{type:'eq',x:320,y:292,s:24,text:'or: 1 − 4/12 = 2/3',cls:'t-ink2'} }, balls),
    beats:[
      { say:'Your turn. A box holds four red balls, six yellow balls and two blue balls.', show:['t1',...Object.keys(balls)], gap:.05 },
      { say:'We draw one ball at random. What is the probability that it is not red?', show:['t2'] },
    ],
    ask:{ opts:['1/3','2/3','8/10','4/8'], a:1,
      right:'Well done! Eight of the twelve balls are not red, which is two thirds.',
      wrong:'There are twelve balls, and eight are not red. That’s eight twelfths, which simplifies to two thirds.',
      show:['r1','r2'] } },
  ],
  quiz:[
    {q:'A die is rolled once. What is the probability of an even number greater than 2?', o:['1/2','1/3','1/6','2/3'], a:1, e:'Only 4 and 6 work: 2 out of 6 = 1/3.'},
    {q:'If a plan has a 0.65 probability of success, what is the probability it fails?', o:['0.65','0.45','0.35','1.65'], a:2, e:'The complement: 1 − 0.65 = 0.35.'},
    {q:'Which value cannot be a probability?', o:['0','0.99','5/4','1'], a:2, e:'5/4 is greater than 1, and a probability is never more than 1.'},
  ] });

/* ================= 3. charts & tables ================= */
const DAYS=['Sat','Sun','Mon','Tue'], SALES=[20,30,15,40];
const tb={}; const TH=['Day','Sat','Sun','Mon','Tue'], TV=['Sales','20','30','15','40'];
TH.forEach((h,i)=>{ const x=70+100*i; tb['h'+i]={type:'box',x,y:64,w:100,h:36,rx:6,c:'prisoft',text:h,s:18,cls:'t-pri'}; tb['v'+i]={type:'box',x,y:100,w:100,h:36,rx:6,c:'surface',text:TV[i],s:i?22:18}; });
const tk=[].concat(...TH.map((_,i)=>['h'+i,'v'+i]));
XP.add({ key:'en-st-charts', lang:'en', sk:'stats', ord:30, title:'Reading charts and tables', min:'4 min',
  goals:['Read the title, axes and units before calculating','Find a percent change from the old value','Turn a pie slice into a percent, an amount and an angle','Pull what you need from a table quickly'],
  scenes:[
  { t:'Bar charts: read first',
    items:{ bars:{type:'bars',x:60,y:90,w:320,h:200,values:SALES,labels:DAYS,max:40,c:'pri'},
      unit:{type:'text',x:495,y:100,s:18,text:'Sales (thousands)',cls:'t-ink2'},
      hi:{type:'note',x:495,y:165,w:180,h:54,c:'n3',text:'Highest: 40',size:24,rot:-2}, lo:{type:'note',x:495,y:235,w:180,h:54,c:'n1',text:'Lowest: 15',size:24,rot:2},
      d:{type:'eq',x:495,y:312,s:26,text:'40 − 15 = 25',cls:'t-pri'} },
    beats:[
      { say:'Before calculating, read the title, axes and units. What does each bar stand for?', show:['bars','unit'] },
      { say:'A shop’s sales in thousands over four days. The tallest bar is Tuesday: forty thousand.', show:['hi'] },
      { say:'The shortest is Monday: fifteen thousand.', show:['lo'] },
      { say:'The difference: forty minus fifteen, twenty-five thousand.', show:['d'] },
    ]},
  { t:'Percent change',
    items:{ bars:{type:'bars',x:30,y:100,w:280,h:190,values:SALES,labels:DAYS,max:40,c:['pink','pink','surface2','surface2']},
      e1:{type:'eq',x:475,y:108,s:22,text:'Change: 30 − 20 = 10'}, e2:{type:'eq',x:475,y:170,s:30,text:'10 ÷ 20 = 50%',cls:'t-pri'},
      w:{type:'eq',x:475,y:236,s:30,text:'10 ÷ 30 ≈ 33%',cls:'t-bad'},
      rule:{type:'note',x:475,y:308,w:290,h:52,c:'n0',text:'Divide by the old value',size:21,rot:-1} },
    beats:[
      { say:'A frequent question: what is the percent increase from Saturday to Sunday?', show:['bars'] },
      { say:'First the change: thirty minus twenty is ten.', show:['e1'] },
      { say:'Divide the change by the old value: ten divided by twenty is a half, fifty percent.', show:['e2'] },
      { say:'The trap: dividing by the new value gives about thirty-three percent. Wrong.', show:['w','rule'], strike:['w'] },
    ]},
  { t:'Pie charts: a share of the whole',
    items:{ p0:{type:'pie',cx:180,cy:205,r:112,parts:10,fill:0}, p3:{type:'pie',cx:180,cy:205,r:112,parts:10,fill:3,c:'pink'},
      l:{type:'eq',x:470,y:115,s:28,text:'Food = 30%'},
      e1:{type:'eq',x:465,y:185,s:26,text:'30% of 8000 = 2400',cls:'t-pri'},
      e2:{type:'eq',x:470,y:255,s:28,text:'3 × 36° = 108°'}, n:{type:'text',x:470,y:300,s:20,text:'the whole circle is 360°',hand:true} },
    beats:[
      { say:'A pie chart shows parts of a whole; the full circle is one hundred percent. This one has ten slices.', show:['p0'] },
      { say:'In this family budget, food takes three slices of ten: thirty percent.', hide:['p0'], show:['p3','l'] },
      { say:'If the budget is eight thousand riyals, food gets two thousand four hundred.', show:['e1'] },
      { say:'A circle is three hundred and sixty degrees, so each slice is thirty-six, and food is one hundred and eight.', show:['e2','n'] },
    ]},
  { t:'Your turn: from the table',
    items:Object.assign({}, tb, { r:{type:'box',x:100,y:186,w:440,h:64,c:'n0',text:'(30 − 15) ÷ 30 = 50%',s:30,cls:'t-note',ltr:true}, ck:{type:'check',x:320,y:292} }),
    beats:[
      { say:'Your turn. This table shows the same sales, in thousands.', show:tk, gap:.06 },
      { say:'What is the percent decrease from Sunday to Monday?', hl:['v2','v3'] },
    ],
    ask:{ opts:['50%','15%','100%','33%'], a:0,
      right:'Correct! The drop is fifteen. Divide by the old value, thirty, to get one half: fifty percent.',
      wrong:'The drop is thirty minus fifteen, fifteen. Divide by the old value, thirty: one half, fifty percent.',
      show:['r','ck'] } },
  ],
  quiz:[
    {q:'A pie chart shows 600 students. The math slice has an angle of 90°. How many students prefer math?', o:['90','150','200','240'], a:1, e:'90° is a quarter of the circle, and a quarter of 600 = 150.'},
    {q:'Sales rose from 40 thousand to 50 thousand. What is the percent increase?', o:['20%','10%','25%','50%'], a:2, e:'The change is 10; divide by the old value 40: 10 out of 40 = 25%.'},
    {q:'Table: class A has 18 students, B has 22, C has 20. About what percent of all students are in class B?', o:['22%','33%','37%','44%'], a:2, e:'The total is 60, and 22 out of 60 ≈ 36.7%, about 37%.'},
  ] });
})();
/* Explainers: algebra */
(function(){ if(!window.XP||!XP.ready) return;
/* pre-set the transform origin of pop-in items (see engine note: revealTl sets transformOrigin only in the "to" vars, which shifts them) */
const POPT=['box','circle','check','cross','dot','poly','pie'];
/* keep text readable in dark mode: light fills get note ink, dark fills get stage ink */
const LIGHT=['n0','n1','n2','n3','butter','sky'], DARKF=['surface','surface2','prisoft','pinksoft'];
const ADD=L=>{ L.scenes.forEach(sc=>{ for(const k in (sc.items||{})){ const it=sc.items[k]; if(POPT.includes(it.type)&&!it.rot) it.rot=.01; if((it.type==='box'||it.type==='circle')&&LIGHT.includes(it.c)&&!it.cls) it.cls='t-note'; if(it.type==='note'&&DARKF.includes(it.c)&&!it.cls) it.cls='t-ink'; } }); XP.add(L); };
const LR=s=>'⁦'+s+'⁩'; /* keep √ and nested powers in left-to-right order */

/* ---------- 1. variables and expressions ---------- */
ADD({ key:'al-vars', sk:'algebra', ord:5, title:'المتغيرات والعبارات الجبرية', min:'٣ دقائق',
  goals:['تعرف معنى المتغير «س»','تجمع الحدود المتشابهة','تبسّط عبارة جبرية','تعوّض بقيمة المتغير'],
  scenes:[
  { t:'ما المتغير؟',
    items:{
      bx:{type:'box',x:270,y:90,w:100,h:100,c:'prisoft',text:'س',s:56,cls:'t-pri'},
      lbl:{type:'text',x:320,y:225,s:22,cls:'t-ink2',text:'صندوق مغلق فيه عدد لا نعرفه بعد'},
      n1:{type:'note',x:140,y:110,w:80,h:60,c:'n0',text:'٣',size:30,rot:-5},
      n2:{type:'note',x:130,y:190,w:80,h:60,c:'n1',text:'٧',size:30,rot:4},
      n3:{type:'note',x:500,y:150,w:80,h:60,c:'n3',text:'١٠',size:30,rot:-3},
      eq:{type:'text',dir:'rtl',x:320,y:262,s:32,text:'٣س = ٣ × س'},
      m1:{type:'box',x:240,y:290,w:44,h:44,c:'prisoft',text:'س',s:22,cls:'t-pri'},
      m2:{type:'box',x:298,y:290,w:44,h:44,c:'prisoft',text:'س',s:22,cls:'t-pri'},
      m3:{type:'box',x:356,y:290,w:44,h:44,c:'prisoft',text:'س',s:22,cls:'t-pri'},
    },
    beats:[
      {say:'المتغير رمزٌ يحجز مكان عددٍ لا نعرفه بعد، ونكتبه غالبًا بحرف مثل سين.', show:['bx','lbl']},
      {say:'تخيّله صندوقًا مغلقًا؛ قد يكون فيه ثلاثة أو سبعة أو عشرة، بحسب المسألة.', show:['n1','n2','n3'], gap:.3},
      {say:'وحين نكتب ثلاثة سين فالمعنى ثلاثة في سين، أي ثلاثة صناديق متماثلة.', hide:['n1','n2','n3','lbl'], show:['eq','m1','m2','m3'], gap:.25},
    ]},
  { t:'الحدود المتشابهة',
    items:{
      q:{type:'text',dir:'rtl',x:320,y:105,s:40,text:'٢س + ٣س'},
      a1:{type:'box',x:454,y:140,w:52,h:52,c:'pinksoft',text:'س',s:24},
      a2:{type:'box',x:394,y:140,w:52,h:52,c:'pinksoft',text:'س',s:24},
      pl:{type:'text',x:353,y:178,s:34,text:'+'},
      b1:{type:'box',x:260,y:140,w:52,h:52,c:'sky',text:'س',s:24},
      b2:{type:'box',x:200,y:140,w:52,h:52,c:'sky',text:'س',s:24},
      b3:{type:'box',x:140,y:140,w:52,h:52,c:'sky',text:'س',s:24},
      res:{type:'note',x:320,y:245,w:170,h:62,c:'n0',text:'٥س',size:36,rot:-2},
      e2:{type:'text',dir:'rtl',x:410,y:335,s:28,text:'٢س + ٣ص'},
      cr:{type:'cross',x:305,y:325,s:.8},
      e2t:{type:'text',x:210,y:335,s:22,hand:true,text:'لا يُجمعان'},
    },
    beats:[
      {say:'الحدود المتشابهة تحمل المتغير نفسه، مثل اثنين سين وثلاثة سين.', show:['q']},
      {say:'صندوقان وثلاثة صناديق من النوع نفسه تصبح معًا خمسة صناديق.', show:['a1','a2','pl','b1','b2','b3'], gap:.2},
      {say:'إذن اثنان سين زائد ثلاثة سين يساوي خمسة سين؛ نجمع المعاملات ونُبقي سين كما هي.', hide:['pl'], move:{a1:[-37,0],a2:[-37,0],b1:[37,0],b2:[37,0],b3:[37,0]}, show:['res']},
      {say:'لكن سين وصاد حدّان مختلفان، فاثنان سين وثلاثة صاد لا يُجمعان في حد واحد.', show:['e2','cr','e2t']},
    ]},
  { t:'تبسيط العبارة',
    items:{
      ex:{type:'text',dir:'rtl',x:320,y:105,s:40,text:'٤س + ٥ − س + ٢'},
      l1:{type:'text',dir:'rtl',x:320,y:175,s:30,cls:'t-pri',text:'٤س − س = ٣س'},
      l2:{type:'text',dir:'rtl',x:320,y:225,s:30,cls:'t-ink2',text:'٥ + ٢ = ٧'},
      res:{type:'note',x:320,y:292,w:200,h:62,c:'n3',text:'٣س + ٧',size:32,rot:2},
    },
    beats:[
      {say:'لتبسيط عبارة طويلة، اجمع كل نوع مع نوعه: حدود سين معًا، والأعداد معًا.', show:['ex']},
      {say:'حدود سين: أربعة سين ناقص سين يساوي ثلاثة سين، فسين وحدها تعني سينًا واحدة.', show:['l1']},
      {say:'والأعداد: خمسة زائد اثنين يساوي سبعة. فالعبارة المبسطة ثلاثة سين زائد سبعة.', show:['l2','res']},
    ]},
  { t:'التعويض',
    items:{
      g1:{type:'text',x:402,y:82,s:24,cls:'t-ink2',text:'إذا كان'},
      g2:{type:'text',dir:'rtl',x:284,y:82,s:32,cls:'t-pri',text:'س = ٤'},
      q:{type:'text',dir:'rtl',x:320,y:126,s:34,text:'٣س + ٢ = ؟'},
      w1:{type:'text',dir:'rtl',x:320,y:215,s:36,text:'٣ × ٤ + ٢ = ١٤'},
      tip:{type:'note',x:320,y:288,w:360,h:56,c:'n1',text:'المعامل يُضرب في المتغير',size:22,rot:-1.5},
    },
    beats:[
      {say:'التعويض أن نفتح الصندوق ونضع العدد مكان سين.', show:['g1','g2']},
      {say:'دورك. إذا كان سين يساوي أربعة، فكم تساوي ثلاثة سين زائد اثنين؟', show:['q']},
    ],
    ask:{ opts:['٣٤','١٤','١٢','٩'], a:1,
      right:'أحسنت. ثلاثة في أربعة يساوي اثني عشر، زائد اثنين يساوي أربعة عشر.',
      wrong:'ثلاثة سين تعني ثلاثة في سين، لا ثلاثة بجانب أربعة. ثلاثة في أربعة اثنا عشر، زائد اثنين يساوي أربعة عشر.',
      show:['w1','tip'] }},
  { t:'بسّط ثم عوّض',
    items:{
      e1:{type:'text',dir:'rtl',x:320,y:110,s:38,text:'٢س + ٣س − ٤س'},
      e2:{type:'text',dir:'rtl',x:320,y:170,s:38,cls:'t-pri',text:'= س'},
      e3:{type:'box',x:210,y:205,w:220,h:54,c:'butter',text:'س = ١٠ ← الناتج ١٠',s:22},
      tip:{type:'note',x:320,y:305,w:300,h:56,c:'n2',text:'بسّط أولًا، ثم عوّض',size:24,rot:-2},
    },
    beats:[
      {say:'في القدرات بسّط قبل أن تعوّض؛ فالحساب يقصر كثيرًا.', show:['e1','tip']},
      {say:'اثنان سين زائد ثلاثة سين ناقص أربعة سين يساوي سين فقط. فإذا كان سين عشرة، فالناتج عشرة مباشرة.', show:['e2','e3']},
    ]},
  ],
  quiz:[
    {q:'بسّط: ٥س + ٢ − ٢س + ٤', o:['٣س + ٦','٧س + ٦','٣س + ٢','٩س'], a:0, e:'٥س − ٢س = ٣س، و٢ + ٤ = ٦.'},
    {q:'إذا كان س = ٣، فما قيمة ٤س − ٥؟', o:['٣٩','٧','١٢','١٧'], a:1, e:'٤ × ٣ = ١٢، ثم ١٢ − ٥ = ٧.'},
    {q:'إذا كان س = ٢ و ص = ٥، فما قيمة ٣س + ص؟', o:['١١','٣٧','١٠','٢١'], a:0, e:'٣ × ٢ + ٥ = ٦ + ٥ = ١١.'},
  ]});

/* ---------- 2. exponents and roots ---------- */
ADD({ key:'al-exp', sk:'algebra', ord:20, title:'الأسس والجذور', min:'٤ دقائق',
  goals:['تفهم الأس كضرب متكرر','تطبّق قاعدتي ضرب القوى وقوة القوة','تعرف أن الأس صفر يعطي واحدًا','تحسب جذور المربعات الكاملة'],
  scenes:[
  { t:'الأس: ضرب متكرر',
    items:{
      pw:{type:'text',dir:'rtl',x:150,y:160,s:76,cls:'t-pri',text:'٢⁵'},
      ex:{type:'text',dir:'rtl',x:410,y:135,s:32,text:'٢ × ٢ × ٢ × ٢ × ٢'},
      res:{type:'text',dir:'rtl',x:410,y:190,s:36,cls:'t-pri',text:'= ٣٢'},
      nb:{type:'note',x:170,y:268,w:170,h:56,c:'n3',text:'الأساس: ٢',size:22,rot:-2},
      ne:{type:'note',x:420,y:268,w:250,h:56,c:'n1',text:'الأس: ٥ مرات',size:22,rot:1.5},
    },
    beats:[
      {say:'الأس اختصار للضرب المتكرر. اثنان أُس خمسة يعني أن نضرب اثنين في نفسه خمس مرات.', show:['pw','ex']},
      {say:'العدد الكبير هو الأساس، والعدد الصغير في الأعلى هو الأس، ويخبرنا بعدد المرات.', show:['nb','ne']},
      {say:'نضرب خطوة خطوة: اثنان، أربعة، ثمانية، ستة عشر، اثنان وثلاثون.', show:['res']},
    ]},
  { t:'ضرب قوتين',
    items:{
      q:{type:'text',dir:'rtl',x:320,y:100,s:42,text:'٢³ × ٢⁴'},
      x1:{type:'text',dir:'rtl',x:320,y:165,s:28,text:'(٢ × ٢ × ٢) × (٢ × ٢ × ٢ × ٢)'},
      r:{type:'text',dir:'rtl',x:320,y:225,s:42,cls:'t-pri',text:'= ٢⁷'},
      rule:{type:'note',x:320,y:298,w:330,h:58,c:'n0',text:'الأساس نفسه ← اجمع الأسس',size:23,rot:-1.5},
    },
    beats:[
      {say:'عندما نضرب قوتين لهما الأساس نفسه، مثل اثنين تكعيب في اثنين أُس أربعة، فماذا يحدث؟', show:['q']},
      {say:'نفكّ كل قوة: ثلاث اثنينات، ثم أربع اثنينات، فيصبح المجموع سبع اثنينات.', show:['x1']},
      {say:'فالناتج اثنان أُس سبعة. والقاعدة: الأساس نفسه، والأسس تُجمع.', show:['r','rule']},
    ]},
  { t:'قوة القوة، والأس صفر',
    items:{
      pp:{type:'text',dir:'rtl',x:170,y:110,s:40,text:LR('(٣²)³')},
      pp2:{type:'text',dir:'rtl',x:170,y:165,s:26,text:'٣² × ٣² × ٣²'},
      pp3:{type:'text',dir:'rtl',x:170,y:220,s:40,cls:'t-pri',text:'= ٣⁶'},
      r2:{type:'note',x:170,y:292,w:220,h:56,c:'n2',text:'اضرب الأسّين',size:24,rot:2},
      dv:{type:'line',x1:320,y1:85,x2:320,y2:325,cls:'s-line'},
      z1:{type:'text',dir:'rtl',x:480,y:105,s:28,text:'٢³ = ٨'},
      z2:{type:'text',dir:'rtl',x:480,y:147,s:28,text:'٢² = ٤'},
      z3:{type:'text',dir:'rtl',x:480,y:189,s:28,text:'٢¹ = ٢'},
      z4:{type:'text',dir:'rtl',x:480,y:237,s:38,cls:'t-pri',text:'٢⁰ = ١'},
      zh:{type:'text',x:585,y:150,s:20,hand:true,text:'÷ ٢'},
      r3:{type:'note',x:480,y:292,w:230,h:56,c:'n3',text:'الأس صفر ← ١',size:24,rot:-2},
    },
    beats:[
      {say:'وإذا رفعنا قوة إلى قوة، مثل ثلاثة تربيع الكل تكعيب، فهذا ثلاثة تربيع مضروبًا في نفسه ثلاث مرات.', show:['dv','pp','pp2']},
      {say:'نجمع الأسس: اثنان واثنان واثنان، فالناتج ثلاثة أُس ستة. أي أننا نضرب الأسين.', show:['pp3','r2']},
      {say:'أما الأس صفر فانظر إلى هذا النمط: كلما نقص الأس واحدًا، قسمنا الناتج على اثنين.', show:['z1','z2','z3','zh'], gap:.35},
      {say:'ثمانية، أربعة، اثنان، ثم واحد. إذن اثنان أُس صفر يساوي واحدًا، وكذلك أي عدد غير الصفر أُسه صفر.', show:['z4','r3']},
    ]},
  { t:'الجذر التربيعي',
    items:{
      g:{type:'grid',x:90,y:90,rows:5,cols:5,cell:30,gap:3,fill:25,c:'prisoft'},
      gl:{type:'text',dir:'rtl',x:172,y:292,s:26,text:'٥ × ٥ = ٢٥'},
      q1:{type:'text',x:440,y:130,s:22,text:'أيّ عدد في نفسه يعطي ٢٥؟'},
      sq:{type:'text',dir:'rtl',x:440,y:205,s:44,cls:'t-pri',text:LR('√٢٥')+' = ٥'},
      q2:{type:'text',dir:'rtl',x:320,y:118,s:44,text:LR('√٦٤')+' = ؟'},
      a1:{type:'text',dir:'rtl',x:320,y:215,s:40,cls:'t-pri',text:'٨ × ٨ = ٦٤'},
      tip:{type:'note',x:320,y:290,w:300,h:56,c:'n0',text:'الجذر ليس النصف!',size:24,rot:-2},
    },
    beats:[
      {say:'الجذر التربيعي عكس التربيع: نسأل أيُّ عدد إذا ضُرب في نفسه أعطانا العدد المُعطى؟', show:['q1']},
      {say:'هذا المربع فيه خمس وعشرون خانة، وضلعه خمس خانات؛ فالجذر التربيعي لخمسة وعشرين خمسة.', show:['g','gl','sq']},
      {say:'دورك. ما الجذر التربيعي لأربعة وستين؟', hide:['g','gl','q1','sq'], show:['q2']},
    ],
    ask:{ opts:['٣٢','٨','١٦','٦'], a:1,
      right:'صحيح. ثمانية في ثمانية يساوي أربعة وستين.',
      wrong:'اثنان وثلاثون نصف العدد وليس جذره. نبحث عن عدد في نفسه يعطي أربعة وستين، وهو ثمانية.',
      show:['a1','tip'] }},
  { t:'احفظ المربعات',
    items:Object.assign({
      t1:{type:'text',dir:'rtl',x:320,y:264,s:32,text:'٢³ = ٢ × ٢ × ٢ = ٨'},
      t2:{type:'note',x:320,y:320,w:300,h:48,c:'n1',text:'وليس ٢ × ٣ = ٦',size:22,rot:-1.5},
    }, (function(){ const o={}, A='٠١٢٣٤٥٦٧٨٩', ad=n=>String(n).replace(/\d/g,d=>A[d]);
      for(let i=1;i<=12;i++){ const r=Math.floor((i-1)/4), k=3-(i-1)%4; o['s'+i]={type:'box',x:62+k*132,y:72+r*50,w:120,h:40,c:r%2?'surface2':'prisoft',text:ad(i)+'² = '+ad(i*i),s:20}; }
      return o; })()),
    beats:[
      {say:'احفظ مربعات الأعداد من واحد إلى اثني عشر؛ فهي أساس الجذور السريعة في القدرات.', show:['s1','s2','s3','s4','s5','s6','s7','s8','s9','s10','s11','s12'], gap:.1},
      {say:'وانتبه للفخ: اثنان تكعيب ثمانية لا ستة؛ فالأس عدد مرات الضرب، وليس عددًا نضرب فيه.', show:['t1','t2']},
    ]},
  ],
  quiz:[
    {q:'٣² × ٣³ = ؟', o:['٣⁵','٣⁶','٩⁵','٦⁵'], a:0, e:'الأساس نفسه، فنجمع الأسس: ٢ + ٣ = ٥.'},
    {q:'(٢³)² = ؟', o:['٢⁵','٢⁶','٢⁹','٤³'], a:1, e:'قوة القوة: نضرب الأسين ٣ × ٢ = ٦، أي ٦٤.'},
    {q:'√١٤٤ + ٧⁰ = ؟', o:['١٢','١٣','١٩','٨'], a:1, e:'√١٤٤ = ١٢، و٧⁰ = ١، والمجموع ١٣.'},
  ]});

/* ---------- 3. sequences ---------- */
const row=(pre,xs,y,texts,cs,w=86,h=66,size=28)=>{ const o={}; xs.forEach((x,i)=>{ o[pre+(i+1)]={type:'note',x,y,w,h,c:cs[i]||'n0',text:texts[i],size,rot:[-3,2,-2,3,-1][i%5]}; }); return o; };
const X5=[550,440,330,220,110];
ADD({ key:'al-seq', sk:'algebra', ord:30, title:'المتتابعات والأنماط', min:'٤ دقائق',
  goals:['تكتشف قاعدة المتتابعة من الانتقال بين الحدود','تميّز الحسابية (فرق ثابت) من الهندسية (نسبة ثابتة)','تجد الحد التالي والحد المفقود'],
  scenes:[
  { t:'المتتابعة الحسابية',
    items:Object.assign(row('t',X5,190,['٣','٧','١١','١٥','؟'],['n3','n3','n3','n3','n1']),{
      a1:{type:'arrow',x1:525,y1:150,x2:465,y2:150,bend:-30,text:'+٤'},
      a2:{type:'arrow',x1:415,y1:150,x2:355,y2:150,bend:-30,text:'+٤'},
      a3:{type:'arrow',x1:305,y1:150,x2:245,y2:150,bend:-30,text:'+٤'},
      a4:{type:'arrow',x1:195,y1:150,x2:135,y2:150,bend:-30,text:'+٤',cls:'s-pink'},
      nt:{type:'note',x:320,y:295,w:300,h:56,c:'n0',text:'فرق ثابت ← حسابية',size:24,rot:-1.5},
    }),
    beats:[
      {say:'المتتابعة أعداد مرتبة تسير وفق قاعدة ثابتة، وكل عدد فيها يسمى حدًّا.', show:['t1','t2','t3','t4','t5'], gap:.2},
      {say:'لا تنظر إلى كل عدد وحده، بل إلى الانتقال بين كل حدين: من ثلاثة إلى سبعة نضيف أربعة، وهكذا.', show:['a1','a2','a3'], gap:.3},
      {say:'هذا الفرق الثابت يجعلها متتابعة حسابية، فالحد التالي خمسة عشر زائد أربعة، أي تسعة عشر.', show:['a4','nt'], set:{t5:'١٩'}},
    ]},
  { t:'الفرق قد يكون سالبًا',
    items:Object.assign(row('t',X5,190,['٢٠','١٧','١٤','١١','؟'],['n2','n2','n2','n2','n1']),{
      a1:{type:'arrow',x1:525,y1:150,x2:465,y2:150,bend:-30,text:'−٣'},
      a2:{type:'arrow',x1:415,y1:150,x2:355,y2:150,bend:-30,text:'−٣'},
      a3:{type:'arrow',x1:305,y1:150,x2:245,y2:150,bend:-30,text:'−٣'},
      a4:{type:'arrow',x1:195,y1:150,x2:135,y2:150,bend:-30,text:'−٣',cls:'s-pink'},
      nt:{type:'note',x:320,y:295,w:330,h:56,c:'n0',text:'فرق ثابت ولو كان سالبًا',size:23,rot:1.5},
    }),
    beats:[
      {say:'وقد يكون الفرق سالبًا: عشرون، سبعة عشر، أربعة عشر، أحد عشر.', show:['t1','t2','t3','t4','t5'], gap:.2},
      {say:'هنا نطرح ثلاثة في كل خطوة، فالحد التالي ثمانية. المهم أن يبقى الفرق ثابتًا.', show:['a1','a2','a3','a4','nt'], gap:.25, set:{t5:'٨'}},
    ]},
  { t:'المتتابعة الهندسية',
    items:Object.assign(row('g',X5,180,['٢','٦','١٨','٥٤','؟'],['n0','n0','n0','n0','n1']),{
      d1:{type:'text',dir:'rtl',x:495,y:255,s:22,cls:'t-bad',text:'+٤'},
      d2:{type:'text',dir:'rtl',x:385,y:255,s:22,cls:'t-bad',text:'+١٢'},
      d3:{type:'text',dir:'rtl',x:275,y:255,s:22,cls:'t-bad',text:'+٣٦'},
      m1:{type:'arrow',x1:525,y1:140,x2:465,y2:140,bend:-30,text:'×٣'},
      m2:{type:'arrow',x1:415,y1:140,x2:355,y2:140,bend:-30,text:'×٣'},
      m3:{type:'arrow',x1:305,y1:140,x2:245,y2:140,bend:-30,text:'×٣'},
      m4:{type:'arrow',x1:195,y1:140,x2:135,y2:140,bend:-30,text:'×٣',cls:'s-pink'},
      nt:{type:'note',x:320,y:312,w:320,h:52,c:'n2',text:'نسبة ثابتة ← هندسية',size:22,rot:1.5},
    }),
    beats:[
      {say:'أما هنا فالفروق غير ثابتة: أربعة، ثم اثنا عشر، ثم ستة وثلاثون.', show:['g1','g2','g3','g4','g5','d1','d2','d3'], gap:.15},
      {say:'لكن كل حد يساوي الذي قبله في ثلاثة. هذه متتابعة هندسية، والعدد الثابت ثلاثة هو النسبة.', strike:['d1','d2','d3'], show:['m1','m2','m3','nt'], gap:.3},
      {say:'فالحد التالي أربعة وخمسون في ثلاثة، أي مئة واثنان وستون.', show:['m4'], set:{g5:'١٦٢'}},
    ]},
  { t:'الحد المفقود',
    items:Object.assign(row('k',[530,425,320,215,110],100,['٥','١١','؟','٢٣','٢٩'],['n3','n3','n1','n3','n3'],80,60,28),{
      p1:{type:'arrow',x1:510,y1:138,x2:445,y2:138,bend:36,cls:'s-pink'},
      p2:{type:'arrow',x1:195,y1:138,x2:130,y2:138,bend:36,cls:'s-pink'},
      p1t:{type:'text',dir:'rtl',x:478,y:182,s:22,cls:'t-hand',text:'+٦'},
      p2t:{type:'text',dir:'rtl',x:162,y:182,s:22,cls:'t-hand',text:'+٦'},
      ans:{type:'text',dir:'rtl',x:320,y:225,s:36,cls:'t-pri',text:'١١ + ٦ = ١٧'},
      chk:{type:'text',dir:'rtl',x:320,y:285,s:28,cls:'t-ink2',text:'١٧ + ٦ = ٢٣'},
      ck:{type:'check',x:200,y:276,s:.8},
    }),
    beats:[
      {say:'إذا اختفى حد من الوسط، فاستخرج القاعدة من الحدود المعروفة المتجاورة.', show:['k1','k2','k3','k4','k5'], gap:.2},
      {say:'من خمسة إلى أحد عشر نضيف ستة، ومن ثلاثة وعشرين إلى تسعة وعشرين نضيف ستة أيضًا.', show:['p1','p1t','p2','p2t'], gap:.3},
      {say:'دورك. ما الحد المفقود؟', hide:['p1','p1t','p2','p2t']},
    ],
    ask:{ opts:['١٦','١٧','١٨','٢٠'], a:1,
      right:'أحسنت. أحد عشر زائد ستة يساوي سبعة عشر، وسبعة عشر زائد ستة يساوي ثلاثة وعشرين.',
      wrong:'الفرق الثابت ستة. أحد عشر زائد ستة يساوي سبعة عشر، ونتحقق: سبعة عشر زائد ستة يساوي ثلاثة وعشرين.',
      show:['ans','chk','ck'] }},
  { t:'خطتك في القدرات',
    items:{
      r1:{type:'box',x:120,y:72,w:400,h:50,c:'n3',text:'الفروق ثابتة؟ ← حسابية',s:22},
      r2:{type:'box',x:120,y:136,w:400,h:50,c:'pinksoft',text:'النسبة ثابتة؟ ← هندسية',s:22},
      r3:{type:'box',x:120,y:200,w:400,h:50,c:'prisoft',text:'لا هذا ولا ذاك؟ ← فروق الفروق',s:22},
      ex:{type:'text',dir:'rtl',x:320,y:295,s:28,text:'٣ ، ٥ ، ٩ ، ١٧ ، ...'},
      exd:{type:'text',x:320,y:333,s:22,hand:true,text:'الفروق: ٢ ، ٤ ، ٨ تتضاعف'},
    },
    beats:[
      {say:'خطتك: احسب الفروق أولًا؛ فإن كانت ثابتة فالمتتابعة حسابية.', show:['r1']},
      {say:'وإن لم تثبت فجرّب القسمة؛ فإن ثبتت النسبة فهي هندسية.', show:['r2']},
      {say:'وإلا فانظر إلى فروق الفروق. في ثلاثة، خمسة، تسعة، سبعة عشر، الفروق تتضاعف: اثنان، أربعة، ثمانية.', show:['r3','ex','exd']},
    ]},
  ],
  quiz:[
    {q:'ما الحد التالي: ٤ ، ٩ ، ١٤ ، ١٩ ، ...؟', o:['٢٣','٢٤','٢٥','٢٩'], a:1, e:'متتابعة حسابية فرقها ٥: ١٩ + ٥ = ٢٤.'},
    {q:'ما الحد التالي: ٣ ، ٦ ، ١٢ ، ٢٤ ، ...؟', o:['٣٠','٣٦','٤٨','٤٢'], a:2, e:'متتابعة هندسية نسبتها ٢: ٢٤ × ٢ = ٤٨.'},
    {q:'ما الحد المفقود: ٨١ ، ٢٧ ، ؟ ، ٣ ، ١', o:['٩','١٢','١٨','٦'], a:0, e:'كل حد ثلث الذي قبله: ٢٧ ÷ ٣ = ٩.'},
  ]});

/* ---------- 4. word problems ---------- */
const dict=(i,ar,m,y)=>({ ['p'+i]:{type:'box',x:350,y,w:230,h:40,c:'surface2',text:ar,s:20}, ['r'+i]:{type:'text',x:300,y:y+28,s:24,cls:'t-pri',text:'←'}, ['e'+i]:{type:'text',dir:'rtl',x:170,y:y+29,s:26,text:m} });
ADD({ key:'al-word', sk:'algebra', ord:40, title:'من المسألة اللفظية إلى معادلة', min:'٤ دقائق',
  goals:['تترجم عبارات مثل «ضعف العدد» و«يزيد بمقدار» و«مجموع»','تسمّي المجهول وتكتب المعادلة','تحل مسألة أعمار أو أسعار','تعود إلى المطلوب قبل الاختيار'],
  scenes:[
  { t:'قاموس الترجمة',
    items:Object.assign({},
      dict(1,'ضعف العدد','٢س',70), dict(2,'نصف العدد','½ س',118), dict(3,'يزيد عليه بمقدار ٥','س + ٥',166),
      dict(4,'يقل عنه بمقدار ٥','س − ٥',214), dict(5,'مجموع العددين','س + ص',262), dict(6,'يساوي / أصبح','=',310)),
    beats:[
      {say:'المسألة اللفظية جملة تخفي معادلة، ونترجمها عبارة عبارة. نسمّي المجهول سين، فضعف العدد اثنان سين.', show:['p1','r1','e1'], gap:.3},
      {say:'ونصف العدد نصف سين، أي سين مقسومًا على اثنين.', show:['p2','r2','e2'], gap:.3},
      {say:'وعبارة يزيد بمقدار خمسة تعني زائد خمسة، ويقل بمقدار خمسة تعني ناقص خمسة.', show:['p3','r3','e3','p4','r4','e4'], gap:.25},
      {say:'ومجموع عددين هو سين زائد صاد، وكلمة يساوي أو أصبح هي علامة المساواة.', show:['p5','r5','e5','p6','r6','e6'], gap:.25},
    ]},
  { t:'مثال: الأعمار',
    items:{
      pr1:{type:'text',x:320,y:96,s:21,text:'عمر أحمد ضعف عمر أخيه، ومجموع عمريهما ٣٠ سنة.'},
      pr2:{type:'text',x:320,y:130,s:22,cls:'t-pri',text:'كم عمر الأخ؟'},
      na:{type:'note',x:190,y:192,w:170,h:58,c:'n3',text:'الأخ: س',size:24,rot:-2},
      nb:{type:'note',x:450,y:192,w:170,h:58,c:'n1',text:'أحمد: ٢س',size:24,rot:2},
      eq1:{type:'text',dir:'rtl',x:320,y:270,s:32,text:'س + ٢س = ٣س = ٣٠'},
      eq2:{type:'text',dir:'rtl',x:320,y:322,s:32,cls:'t-pri',text:'س = ٣٠ ÷ ٣ = ١٠'},
    },
    beats:[
      {say:'مثال: عمر أحمد ضعف عمر أخيه، ومجموع عمريهما ثلاثون سنة. فكم عمر الأخ؟', show:['pr1','pr2']},
      {say:'نسمّي الأصغر سين؛ فعمر الأخ سين، وعمر أحمد اثنان سين.', show:['na','nb'], gap:.4},
      {say:'ومجموعهما ثلاثون: سين زائد اثنين سين يساوي ثلاثة سين، وهي تساوي ثلاثين.', show:['eq1']},
      {say:'نقسم على ثلاثة، فسين يساوي عشرة: الأخ عمره عشر سنوات، وأحمد عشرون.', show:['eq2']},
    ]},
  { t:'ارجع إلى المطلوب',
    items:{
      t1:{type:'text',x:320,y:105,s:26,text:'لو كان السؤال: كم عمر أحمد؟'},
      c10:{type:'note',x:220,y:195,w:120,h:72,c:'n1',text:'١٠',size:36,rot:-3},
      cr:{type:'cross',x:220,y:282},
      c20:{type:'note',x:420,y:195,w:120,h:72,c:'n3',text:'٢٠',size:36,rot:2},
      ck:{type:'check',x:420,y:282},
    },
    beats:[
      {say:'بعد الحل ارجع إلى السؤال: هل المطلوب سين نفسه أم شيء آخر؟', show:['t1']},
      {say:'إن سُئلت عن عمر أحمد فالجواب عشرون لا عشرة. والعشرة غالبًا تكون بين الخيارات فخًّا.', show:['c10','cr','c20','ck'], gap:.35},
    ]},
  { t:'دورك: الأسعار',
    items:{
      pr1:{type:'text',x:320,y:84,s:21,text:'ثمن القلم يزيد على ثمن الدفتر بـ ٤ ريالات،'},
      pr2:{type:'text',x:320,y:118,s:21,text:'ومجموع ثمنيهما ٢٠ ريالًا. ثمن الدفتر س.'},
      w1:{type:'text',dir:'rtl',x:320,y:222,s:32,text:'٢س + ٤ = ٢٠'},
      w2:{type:'box',x:170,y:250,w:300,h:54,c:'butter',text:'الدفتر ٨ ، القلم ١٢',s:22},
    },
    beats:[
      {say:'دورك. ثمن القلم يزيد على ثمن الدفتر بأربعة ريالات، ومجموع ثمنيهما عشرون ريالًا.', show:['pr1']},
      {say:'إذا كان ثمن الدفتر سين، فما المعادلة الصحيحة؟', show:['pr2']},
    ],
    ask:{ opts:['س + ٤ = ٢٠','س + (س + ٤) = ٢٠','٤س = ٢٠','س − ٤ = ٢٠'], a:1, s:20,
      right:'صحيح. الدفتر سين والقلم سين زائد أربعة، ومجموعهما عشرون، فالدفتر ثمانية ريالات والقلم اثنا عشر.',
      wrong:'المجموع يضم الثمنين معًا: سين للدفتر، وسين زائد أربعة للقلم، والناتج عشرون. فالدفتر ثمانية والقلم اثنا عشر.',
      show:['w1','w2'] }},
  { t:'الخطوات الأربع',
    items:{
      n1:{type:'note',x:445,y:120,w:230,h:64,c:'n0',text:'١. سمِّ المجهول',size:22,rot:-2},
      n2:{type:'note',x:195,y:120,w:230,h:64,c:'n3',text:'٢. ترجم العبارات',size:22,rot:2},
      n3:{type:'note',x:445,y:210,w:230,h:64,c:'n2',text:'٣. حُلّ المعادلة',size:22,rot:1.5},
      n4:{type:'note',x:195,y:210,w:230,h:64,c:'n1',text:'٤. ارجع للمطلوب',size:22,rot:-1.5},
      tip:{type:'text',x:320,y:300,s:24,hand:true,text:'الخطوة الرابعة تحميك من الفخ'},
    },
    beats:[
      {say:'تذكّر الخطوات الأربع: سمِّ المجهول، وترجم العبارات، وحُلّ المعادلة، ثم ارجع إلى المطلوب.', show:['n1','n2','n3','n4','tip'], gap:.5},
    ]},
  ],
  quiz:[
    {q:'عدد إذا أُضيف ٦ إلى ضعفه أصبح الناتج ٢٠. ما العدد؟', o:['٧','١٣','١٤','٨'], a:0, e:'٢س + ٦ = ٢٠، إذن ٢س = ١٤ و س = ٧.'},
    {q:'مجموع عددين ٣٠، وأحدهما يزيد على الآخر بـ ٦. ما العدد الأكبر؟', o:['١٢','١٨','٢٤','١٥'], a:1, e:'س + (س + ٦) = ٣٠، إذن س = ١٢، والأكبر ١٨.'},
    {q:'عمر خالد ثلاثة أمثال عمر ابنه، ومجموع عمريهما ٤٨ سنة. كم عمر خالد؟', o:['١٢','٣٦','٢٤','٣٢'], a:1, e:'س + ٣س = ٤٨، إذن س = ١٢ (الابن)، وخالد ٣٦. انتبه: المطلوب عمر خالد.'},
  ]});
})();
/* Explainers: analogy (التناظر اللفظي) */
(function(){ if(!window.XP||!XP.ready) return;

/* Pre-set a centered transform origin on pop-in items so the engine's scale-in does not leave them offset (see report). */
const POPT=new Set(['note','box','circle','check','cross','poly','pie','dot']);
const fixO=items=>{ for(const k in items){ const it=items[k]; if(POPT.has(it.type)&&!it.rot) it.rot=.01; } return items; };

/* a word pair: two notes (first word on the right) with a colon between them */
const pair=(items,id,y,a,b,c,{xa=530,xb=380,w=120,h=60,size=26}={})=>{
  items[id+'a']={type:'note',x:xa,y,w,h,c,text:a,size,rot:-1.5};
  items[id+'c']={type:'text',x:(xa+xb)/2,y:y+10,s:30,text:':'};
  items[id+'b']={type:'note',x:xb,y,w,h,c,text:b,size,rot:1.5};
  return [id+'a',id+'c',id+'b']; };

/* ================= Lesson: relation types ================= */
const T1={}; const t1a=pair(T1,'p',130,'صفحة','كتاب','n0'), t1b=pair(T1,'q',258,'مقص','قص','n3');
Object.assign(T1,{ ar1:{type:'arrow',x1:520,y1:94,x2:392,y2:94,cls:'s-pink',bend:-22,text:'جزء من'},
  tag1:{type:'note',x:150,y:130,w:190,h:62,c:'n2',text:'جزء ← كل',size:26,rot:-2},
  ar2:{type:'arrow',x1:520,y1:222,x2:392,y2:222,cls:'s-pink',bend:-22,text:'أداة لـ'},
  tag2:{type:'note',x:150,y:258,w:190,h:62,c:'n2',text:'أداة ← وظيفة',size:24,rot:1.5} });
delete T1.pc; delete T1.qc;

const T2={}; const t2a=pair(T2,'p',125,'إهمال','فشل','n1'), t2b=pair(T2,'q',232,'قاضٍ','محكمة','n3');
Object.assign(T2,{ ar1:{type:'arrow',x1:520,y1:90,x2:392,y2:90,cls:'s-pink',bend:-22,text:'يؤدي إلى'},
  tag1:{type:'note',x:150,y:125,w:190,h:62,c:'n2',text:'سبب ← نتيجة',size:24,rot:-2},
  ar2:{type:'arrow',x1:520,y1:197,x2:392,y2:197,cls:'s-pink',bend:-22,text:'يعمل في'},
  tag2:{type:'note',x:150,y:232,w:190,h:62,c:'n2',text:'مكان',size:26,rot:1.5},
  ex:{type:'box',x:330,y:292,w:250,h:46,c:'surface2',text:'ومثلها: نحلة : خلية',s:21} });
delete T2.pc; delete T2.qc;

const T3={}; const r1=pair(T3,'a',92,'جسور','شجاع','n0',{xa:535,xb:395,h:54,size:24}), r2=pair(T3,'b',164,'كريم','بخيل','n1',{xa:535,xb:395,h:54,size:24}), r3=pair(T3,'c',236,'دافئ','حار','n3',{xa:535,xb:395,h:54,size:24});
Object.assign(T3,{ t1:{type:'box',x:110,y:70,w:170,h:44,c:'prisoft',text:'ترادف',s:22}, t2:{type:'box',x:110,y:142,w:170,h:44,c:'prisoft',text:'تضاد',s:22},
  t3:{type:'box',x:110,y:214,w:170,h:44,c:'pinksoft',text:'تدرّج',s:22},
  l1:{type:'box',x:482,y:292,w:110,h:44,c:'sky',text:'بارد',s:21}, l2:{type:'box',x:357,y:292,w:110,h:44,c:'butter',text:'فاتر',s:21},
  l3:{type:'box',x:232,y:292,w:110,h:44,c:'pinksoft',text:'دافئ',s:21}, l4:{type:'box',x:107,y:292,w:110,h:44,c:'pink',text:'حار',s:21} });

const T4={}; const t4=pair(T4,'p',95,'تفاح','فاكهة','n0',{xa:520,xb:380});
Object.assign(T4,{ tag:{type:'note',x:170,y:95,w:190,h:62,c:'n2',text:'نوع ← فئة',size:26,rot:-2},
  q:{type:'text',x:320,y:100,s:26,text:'أيّ زوج علاقته تدرّج؟'},
  ans:{type:'note',x:320,y:222,w:350,h:66,c:'n0',text:'القهقهة أشدّ من الابتسامة',size:22,rot:-1} });

const TY=[['جزء وكل','n0'],['أداة ووظيفة','n1'],['سبب ونتيجة','n2'],['ترادف','n3'],['تضاد','n1'],['تدرّج','n0'],['مكان','n3'],['نوع وفئة','n2']];
const T5={}; TY.forEach(([t,c],i)=>{ T5['k'+i]={type:'note',x:[548,398,248,98][i%4],y:i<4?135:228,w:140,h:70,c,text:t,size:19,rot:i%2?.8:-.8}; });
T5.foot={type:'text',x:320,y:318,s:26,hand:true,text:'سمِّ النوع أولًا، ثم ابنِ الجسر'};

[T1,T2,T3,T4,T5].forEach(fixO);
XP.add({ key:'an-types', sk:'analogy', ord:20, title:'أنواع العلاقات في التناظر', min:'٤ دقائق',
  goals:['تعرف أشهر أنواع العلاقات في التناظر اللفظي','تسمّي نوع العلاقة من مثالها بسرعة','تفرّق بين الترادف والتدرّج','تبني الجسر المناسب لكل نوع'],
  scenes:[
  { t:'الجزء والأداة', items:T1, beats:[
    { say:'علاقات التناظر تتكرر في أنواع قليلة، ومن يعرفها يبني الجسر في ثوانٍ. أولها الجزء والكل.', show:['pa','pb'] },
    { say:'صفحة إلى كتاب، الصفحة جزء من الكتاب.', show:['ar1','tag1'] },
    { say:'والثاني الأداة ووظيفتها. مقص إلى قص، المقص أداة تُستخدم للقص.', show:['qa','qb','ar2','tag2'] } ]},
  { t:'السبب والمكان', items:T2, beats:[
    { say:'والثالث السبب والنتيجة. إهمال إلى فشل، الإهمال يؤدي إلى الفشل.', show:['pa','pb','ar1','tag1'] },
    { say:'والرابع المكان. قاضٍ إلى محكمة، القاضي يعمل في المحكمة.', show:['qa','qb','ar2','tag2'] },
    { say:'ومن المكان أيضًا مسكن الكائن، نحلة إلى خلية.', show:['ex'] } ]},
  { t:'الترادف والتضاد والتدرّج', items:T3, beats:[
    { say:'الترادف كلمتان بمعنى واحد، جسور إلى شجاع.', show:[...r1,'t1'] },
    { say:'والتضاد كلمتان متعاكستان، كريم إلى بخيل.', show:[...r2,'t2'] },
    { say:'أما دافئ إلى حار فليست ترادفًا، بل تدرّج. الحار أشد من الدافئ.', show:[...r3,'t3'], hl:['t3'] },
    { say:'تخيّل سلّمًا، بارد ثم فاتر ثم دافئ ثم حار. كل درجة أشد مما قبلها.', show:['l1','l2','l3','l4'], gap:.3 } ]},
  { t:'النوع والفئة', items:T4, beats:[
    { say:'وأخيرًا النوع والفئة. تفاح إلى فاكهة، التفاح نوعٌ من الفاكهة.', show:[...t4,'tag'] },
    { say:'دورك. أيّ هذه الأزواج علاقته تدرّج؟', hide:[...t4,'tag'], show:['q'] } ],
    ask:{ opts:['طويل : قصير','غصن : شجرة','ابتسامة : قهقهة','إبرة : خياطة'], a:2, show:['ans'],
      right:'أحسنت. القهقهة ضحكٌ أشد من الابتسامة، فهي درجة أعلى من الشيء نفسه.',
      wrong:'ليس هذا. طويل وقصير تضاد، وغصن وشجرة جزء من كل، وإبرة وخياطة أداة. التدرّج في ابتسامة إلى قهقهة.' } },
  { t:'لوحة الأنواع', items:T5, beats:[
    { say:'هذه أشهر الأنواع، اجعلها لوحة تذكير أمامك.', show:TY.map((_,i)=>'k'+i), gap:.15 },
    { say:'فحين ترى زوجًا، سمِّ نوع علاقته أولًا، ثم ابنِ الجسر واختبر به الخيارات.', show:['foot'] } ]},
  ],
  quiz:[
    {q:'ما نوع العلاقة في «إهمال : فشل»؟', o:['ترادف','سبب ونتيجة','جزء من كل','تدرّج'], a:1, e:'الإهمال يؤدي إلى الفشل: سبب ثم نتيجة.'},
    {q:'نحلة : خلية', o:['قلم : حبر','طائر : عُشّ','أسد : شبل','شجرة : غصن'], a:1, e:'مكان: الخلية مسكن النحلة، والعش مسكن الطائر.'},
    {q:'فاتر : ساخن', o:['نسيم : عاصفة','ليل : نهار','جبل : صخرة','ماء : نهر'], a:0, e:'تدرّج: الساخن أشد حرارة من الفاتر، والعاصفة أشد من النسيم.'},
  ] });

/* ================= Lesson: tricky analogies ================= */
const K1={}; const k1=pair(K1,'s',95,'مطر','سيول','n3',{xa:400,xb:250});
Object.assign(K1,{ br:{type:'text',x:320,y:162,s:24,hand:true,text:'المطر الغزير يسبّب السيول'},
  oA:{type:'box',x:345,y:196,w:220,h:56,c:'surface2',text:'نجاح : اجتهاد',s:24}, oB:{type:'box',x:75,y:196,w:220,h:56,c:'surface2',text:'إهمال : فشل',s:24},
  cA:{type:'text',x:455,y:280,s:20,cls:'t-ink2',text:'نتيجة ← سبب'}, cB:{type:'text',x:185,y:280,s:20,cls:'t-ink2',text:'سبب ← نتيجة'},
  xA:{type:'cross',x:455,y:318,s:.7}, vB:{type:'check',x:185,y:318,s:.7} });

const K2={}; const k2=pair(K2,'s',92,'ماء','عطش','n3',{xa:400,xb:250});
Object.assign(K2,{ br:{type:'text',x:320,y:160,s:24,hand:true,text:'الماء يزيل العطش'},
  oA:{type:'box',x:345,y:190,w:220,h:56,c:'surface2',text:'دواء : مرض',s:24}, oB:{type:'box',x:75,y:190,w:220,h:56,c:'surface2',text:'طعام : جوع',s:24},
  vA:{type:'check',x:455,y:290,s:.7}, vB:{type:'check',x:185,y:290,s:.7}, xA:{type:'cross',x:455,y:290,s:.7} });

const K3={}; const k3=pair(K3,'s',80,'شبل','أسد','n0',{xa:390,xb:250,h:52});
Object.assign(K3,{ br:{type:'text',x:320,y:134,s:22,hand:true,text:'الشبل صغير الأسد'},
  ans:{type:'note',x:320,y:222,w:260,h:64,c:'n0',text:'المهر صغير الحصان',size:25,rot:-1.5} });

const K4={ q1:{type:'note',x:510,y:150,w:176,h:96,c:'n0',text:'الترتيب نفسه؟',size:21,rot:-2},
  q2:{type:'note',x:320,y:150,w:170,h:96,c:'n1',text:'جسر أدق؟',size:25,rot:1.5},
  q3:{type:'note',x:130,y:150,w:176,h:96,c:'n3',text:'مطابقة تامة؟',size:21,rot:-1.5},
  foot:{type:'text',x:320,y:290,s:26,hand:true,text:'ثلاثة أسئلة قبل أن تختار'} };

[K1,K2,K3,K4].forEach(fixO);
XP.add({ key:'an-tricky', sk:'analogy', ord:30, title:'تناظرات خادعة', min:'٣ دقائق',
  goals:['تكشف الخيار الذي عُكس ترتيبه','تجعل الجسر أدق عندما يصلح خياران','تستبعد الخيار الذي علاقته قريبة لا مطابقة'],
  scenes:[
  { t:'فخ الترتيب المعكوس', items:K1, beats:[
    { say:'مطر إلى سيول. الجسر، المطر الغزير يسبّب السيول، فالعلاقة سبب ثم نتيجة.', show:[...k1,'br'] },
    { say:'الخيار نجاح إلى اجتهاد يبدو قريبًا، لكن النجاح نتيجة والاجتهاد سببه. الترتيب معكوس.', show:['oA','cA','xA'] },
    { say:'أما إهمال إلى فشل، فالسبب أولًا ثم النتيجة، تمامًا كالأصل.', show:['oB','cB','vB'] } ]},
  { t:'خياران يصلحان؟', items:K2, beats:[
    { say:'أحيانًا يمرّ خياران من الجسر نفسه. ماء إلى عطش، الماء يزيل العطش.', show:[...k2,'br'] },
    { say:'دواء إلى مرض يصلح، وطعام إلى جوع يصلح أيضًا. إذن الجسر عامّ أكثر من اللازم.', show:['oA','vA','oB','vB'] },
    { say:'نجعله أدق، العطش حاجةٌ طبيعية يُشبعها الماء.', set:{br:'العطش حاجةٌ طبيعية يُشبعها الماء'}, hl:['br'] },
    { say:'والجوع حاجة يُشبعها الطعام، أما المرض فليس حاجة. نستبعد دواء إلى مرض.', hide:['vA'], show:['xA'], strike:['oA'] } ]},
  { t:'دورك: قريب أم مطابق؟', items:K3, beats:[
    { say:'أخطر الخيارات ما كانت علاقته قريبة لا مطابقة. شبل إلى أسد، الشبل صغير الأسد.', show:[...k3,'br'] },
    { say:'أيّ زوج يطابق هذا الجسر تمامًا؟', hl:['br'] } ],
    ask:{ opts:['قطة : نمر','مهر : حصان','بيضة : دجاجة','أسد : غابة'], a:1, show:['ans'],
      right:'أحسنت. المهر صغير الحصان. أما القطة فليست صغير النمر، والبيضة تخرج من الدجاجة ولا تُسمّى صغيرها.',
      wrong:'انتبه. القطة من فصيلة النمر لكنها ليست صغيره، والبيضة ليست صغير الدجاجة. المطابق هو مهر إلى حصان.' } },
  { t:'قبل أن تختار', items:K4, beats:[
    { say:'قبل أن تختار، اسأل ثلاثة أسئلة. أولها، هل الترتيب نفسه؟', show:['q1'] },
    { say:'وثانيها، هل يمرّ خيار واحد فقط؟ فإن مرّ اثنان فدقّق الجسر.', show:['q2'] },
    { say:'وثالثها، هل العلاقة مطابقة تمامًا لا مجرد قريبة؟ عندها فقط اختر.', show:['q3','foot'] } ]},
  ],
  quiz:[
    {q:'حريق : دخان', o:['دخان : نار','زلزال : دمار','ماء : نهر','شمس : قمر'], a:1, e:'سبب ثم نتيجة. «دخان : نار» العلاقة نفسها لكن بترتيب معكوس.'},
    {q:'قاضٍ : محكمة', o:['طبيب : مستشفى','طالب : مدرسة','مسافر : مطار','سمكة : ماء'], a:0, e:'كلها أماكن، لكن الجسر الدقيق «يعمل فيها»: الطبيب يعمل في المستشفى، والطالب والمسافر لا يعملان في مكانيهما.'},
    {q:'غرفة : منزل', o:['سقف : مطر','لاعب : ملعب','فصل : مدرسة','نافذة : ضوء'], a:2, e:'الغرفة جزء من المنزل، والفصل جزء من المدرسة. «لاعب : ملعب» علاقة مكان قريبة لكنها ليست جزءًا من كل.'},
  ] });
})();
/* Explainers: arith */
(function(){ if(!window.XP||!XP.ready) return;
/* a strip of n equal boxes, left to right; returns items keyed p0..p(n-1) */
function strip(p,{x,y,w,h,n,colors,texts,s=20,cls}){ const o={}, sw=w/n;
  for(let i=0;i<n;i++) o[p+i]={type:'box',x:x+i*sw,y,w:sw,h,rx:4,c:Array.isArray(colors)?colors[i]:(colors||'surface'),text:texts?texts[i]:undefined,s,cls};
  return o; }
/* POP items (box, circle, check...) get their transform origin set up front; otherwise the engine's
   pop-in (origin given only in the 'to' vars) leaves a leftover translate. rot:0.01 is invisible. */
const POPT=new Set(['box','circle','check','cross','poly','pie','dot']);
const add=L=>{ L.scenes.forEach(sc=>{ for(const k in sc.items||{}){ const it=sc.items[k]; if(POPT.has(it.type)&&!it.rot) it.rot=0.01; } }); XP.add(L); };
const ks=(p,n)=>Array.from({length:n},(_,i)=>p+i);
/* a table row: light box + three centred cells (fraction · decimal · percent) */
function trow(p,y,a,b,c,{hdr=false}={}){ const cls=hdr?'t-pri':'t-ink';
  return { [p+'b']:{type:'box',x:100,y:y-24,w:470,h:36,rx:8,c:hdr?'prisoft':'surface2',stroke:false},
    [p+'a']:{type:'text',x:490,y:y,s:hdr?20:24,text:a,cls}, [p+'d']:{type:'text',x:335,y:y,s:hdr?20:24,text:b,cls}, [p+'p']:{type:'text',x:180,y:y,s:hdr?20:24,text:c,cls} }; }
const rk=p=>[p+'b',p+'a',p+'d',p+'p'];

/* ================= 1. order of operations ================= */
add({ key:'ar-order', sk:'arith', ord:10, title:'ترتيب العمليات الحسابية', min:'٣ دقائق',
  goals:['تعرف لماذا نحتاج ترتيبًا ثابتًا للعمليات','تطبّق الدرجات الأربع: الأقواس، الأسس، الضرب والقسمة، الجمع والطرح','تتجنب فخ تقديم الضرب على القسمة','تحسب تعبيرًا مركبًا ذهنيًا بلا أخطاء'],
  scenes:[
  { t:'لماذا نحتاج ترتيبًا؟',
    items:{ q:{type:'text',x:320,y:130,s:54,text:'٢ + ٣ × ٤'},
      wbox:{type:'box',x:60,y:180,w:230,h:62,c:'badsoft',text:'٥ × ٤ = ٢٠',s:28}, wx:{type:'cross',x:175,y:290},
      rbox:{type:'box',x:350,y:180,w:230,h:62,c:'oksoft',text:'٢ + ١٢ = ١٤',s:28}, rx:{type:'check',x:465,y:290} },
    beats:[
      { say:'في هذا الشرح نبدأ من سؤال بسيط: اثنان زائد ثلاثة في أربعة. كم الناتج؟', show:['q'] },
      { say:'لو حسبنا بالترتيب كما هي مكتوبة، لقلنا خمسة في أربعة يساوي عشرين. وهذا خطأ.', show:['wbox','wx'] },
      { say:'الصحيح أن الضرب يسبق الجمع: ثلاثة في أربعة اثنا عشر، ثم نضيف اثنين فيصبح أربعة عشر.', show:['rbox','rx'] },
      { say:'إذن للعمليات ترتيب ثابت يتفق عليه الجميع، وإلا اختلف الناتج من شخص لآخر.', hl:['rbox'] },
    ]},
  { t:'السلّم ذو الدرجات الأربع',
    items:{ c1:{type:'circle',cx:540,cy:95,r:24,c:'pri',text:'١',s:24,cls:'t-inv'}, b1:{type:'box',x:130,y:72,w:370,h:46,c:'n3',text:'الأقواس  ( )',s:24,cls:'t-note'},
      c2:{type:'circle',cx:540,cy:157,r:24,c:'pri',text:'٢',s:24,cls:'t-inv'}, b2:{type:'box',x:130,y:134,w:370,h:46,c:'n2',text:'الأسس: تربيع وتكعيب',s:24,cls:'t-note'},
      c3:{type:'circle',cx:540,cy:219,r:24,c:'pri',text:'٣',s:24,cls:'t-inv'}, b3:{type:'box',x:130,y:196,w:370,h:46,c:'n1',text:'الضرب والقسمة',s:24,cls:'t-note'},
      c4:{type:'circle',cx:540,cy:281,r:24,c:'pri',text:'٤',s:24,cls:'t-inv'}, b4:{type:'box',x:130,y:258,w:370,h:46,c:'n0',text:'الجمع والطرح',s:24,cls:'t-note'},
      h3:{type:'text',x:75,y:226,s:18,text:'الأسبق أولًا',hand:true}, h4:{type:'text',x:75,y:288,s:18,text:'الأسبق أولًا',hand:true} },
    beats:[
      { say:'نحفظ الترتيب سلّمًا من أربع درجات. الدرجة الأولى: ما داخل الأقواس.', show:['c1','b1'] },
      { say:'الدرجة الثانية: الأسس، مثل التربيع والتكعيب.', show:['c2','b2'] },
      { say:'الثالثة: الضرب والقسمة معًا في درجة واحدة، ننفذ الأسبق منهما في الكتابة أولًا.', show:['c3','b3','h3'] },
      { say:'والرابعة: الجمع والطرح، وهما أيضًا درجة واحدة، نبدأ بالأسبق منهما.', show:['c4','b4','h4'] },
    ]},
  { t:'فخ الضرب أولًا',
    items:{ q:{type:'text',x:320,y:115,s:50,text:'٢٤ ÷ ٤ × ٢'},
      wbox:{type:'box',x:60,y:160,w:230,h:62,c:'badsoft',text:'٢٤ ÷ ٨ = ٣',s:34}, wx:{type:'cross',x:175,y:262},
      rbox:{type:'box',x:350,y:160,w:230,h:62,c:'oksoft',text:'٦ × ٢ = ١٢',s:34}, rx:{type:'check',x:465,y:262},
      tip:{type:'note',x:320,y:318,w:360,h:52,c:'n0',text:'درجة واحدة؟ الأسبق أولًا',size:22,rot:-1} },
    beats:[
      { say:'والآن فخ شائع جدًا: أربعة وعشرون على أربعة في اثنين.', show:['q'] },
      { say:'كثيرون يضربون أولًا، فيقولون أربعة وعشرون على ثمانية يساوي ثلاثة.', show:['wbox','wx'] },
      { say:'لكن الضرب والقسمة في درجة واحدة، فنبدأ بالأسبق: أربعة وعشرون على أربعة ستة، ثم ستة في اثنين اثنا عشر.', show:['rbox','rx'] },
      { say:'والقاعدة نفسها للجمع والطرح: عشرة ناقص ثلاثة زائد اثنين يساوي تسعة، لا خمسة.', show:['tip'] },
    ]},
  { t:'دورك: طبّق السلّم',
    items:{ q:{type:'text',x:330,y:100,s:46,text:'٢٠ − ٣ × (٥ − ٣)'}, ex:{type:'text',x:122,y:70,s:24,text:'٢'},
      s1:{type:'text',x:320,y:200,s:26,text:'القوس: ٥ − ٣ = ٢ ، ومربعه ٤',cls:'t-ink2'}, s2:{type:'text',x:320,y:250,s:28,text:'٣ × ٤ = ١٢',cls:'t-ink2'},
      s3:{type:'box',x:220,y:275,w:200,h:52,c:'n0',text:'٢٠ − ١٢ = ٨',s:28,cls:'t-note'} },
    beats:[
      { say:'دورك الآن. طبّق السلّم خطوة خطوة على هذا التعبير.', show:['q','ex'] },
      { say:'عشرون ناقص ثلاثة في مربع القوس خمسة ناقص ثلاثة. كم الناتج؟', hl:['q'] },
    ],
    ask:{ opts:['٦٨','٨','١٤','٤'], a:1,
      right:'أحسنت! القوس اثنان، ومربعه أربعة، وثلاثة في أربعة اثنا عشر، فالناتج ثمانية.',
      wrong:'نبدأ بالقوس: اثنان، ومربعه أربعة. ثم ثلاثة في أربعة اثنا عشر، وأخيرًا عشرون ناقص اثني عشر يساوي ثمانية.',
      show:['s1','s2','s3'] } },
  ],
  quiz:[
    {q:'٦ + ١٨ ÷ ٣ × ٢ = ؟', o:['٨','١٨','٧','١٦'], a:1, e:'القسمة أولًا لأنها الأسبق: ١٨ ÷ ٣ = ٦، ثم ٦ × ٢ = ١٢، ثم ٦ + ١٢ = ١٨.'},
    {q:'ما ناتج: مربع (٤ + ٢) − ٤ × ٥ ؟', o:['١٦','١٠','٨٠','٢٠'], a:0, e:'القوس ٦، ومربعه ٣٦، ثم ٤ × ٥ = ٢٠، والناتج ٣٦ − ٢٠ = ١٦.'},
    {q:'القيمة الأولى: ١٢ − ٤ + ٢ ، والقيمة الثانية: ١٢ − (٤ + ٢)', o:['القيمة الأولى أكبر','القيمة الثانية أكبر','القيمتان متساويتان','المعطيات غير كافية'], a:0, e:'الأولى بالترتيب: ١٢ − ٤ = ٨، ثم ٨ + ٢ = ١٠. الثانية: ١٢ − ٦ = ٦. إذن الأولى أكبر.'},
  ] });

/* ================= 2. fractions ================= */
add({ key:'ar-frac', sk:'arith', ord:20, title:'الكسور من الصفر', min:'٤ دقائق',
  goals:['تفهم الكسر بصريًا: البسط والمقام','تكوّن كسورًا متكافئة وتبسّطها','تجمع كسرين بعد توحيد المقامين','تقارن كسرين بالضرب التبادلي'],
  scenes:[
  { t:'ما الكسر؟',
    items:{ pie0:{type:'pie',cx:180,cy:200,r:105,parts:4,fill:0}, pie3:{type:'pie',cx:180,cy:200,r:105,parts:4,fill:3,c:'pink'},
      num:{type:'text',x:400,y:165,s:64,text:'٣',cls:'t-pri'}, bar:{type:'line',x1:365,y1:185,x2:435,y2:185,cls:'s-ink'}, den:{type:'text',x:400,y:252,s:64,text:'٤',cls:'t-pri'},
      ln:{type:'text',x:540,y:150,s:20,text:'البسط: كم أخذنا',hand:true}, ld:{type:'text',x:540,y:238,s:20,text:'المقام: كم قطعة',hand:true} },
    beats:[
      { say:'الكسر جزء من كل. خذ هذه الدائرة، وقسّمها أربع قطع متساوية تمامًا.', show:['pie0'] },
      { say:'لوّنا ثلاث قطع منها، فنقول: ثلاثة أرباع.', hide:['pie0'], show:['pie3','num','bar','den'] },
      { say:'العدد السفلي هو المقام، ويخبرنا بعدد القطع المتساوية في الكل.', show:['ld'], hl:['den'] },
      { say:'والعدد العلوي هو البسط، ويخبرنا بعدد القطع التي أخذناها.', show:['ln'], hl:['num'] },
    ]},
  { t:'كسور متكافئة',
    items:Object.assign({},
      strip('a',{x:120,y:72,w:360,h:44,n:2,colors:['surface2','pink']}),
      strip('b',{x:120,y:142,w:360,h:44,n:4,colors:['surface2','surface2','pink','pink']}),
      strip('c',{x:120,y:212,w:360,h:44,n:8,colors:['surface2','surface2','surface2','surface2','pink','pink','pink','pink']}),
      { la:{type:'text',x:550,y:103,s:28,text:'١/٢'}, lb:{type:'text',x:550,y:173,s:28,text:'٢/٤'}, lc:{type:'text',x:550,y:243,s:28,text:'٤/٨'},
        rule:{type:'note',x:320,y:312,w:440,h:54,c:'n0',text:'اضرب البسط والمقام في العدد نفسه',size:22,rot:-1} }),
    beats:[
      { say:'نصف هذا الشريط ملوّن. هذا واحد على اثنين.', show:[...ks('a',2),'la'], gap:.15 },
      { say:'نقسم كل قطعة نصفين: صار الملوّن اثنين من أربعة، والمساحة لم تتغير.', show:[...ks('b',4),'lb'], gap:.12 },
      { say:'ومرة أخرى: أربعة من ثمانية. ثلاثة كسور بأشكال مختلفة وقيمة واحدة، نسميها كسورًا متكافئة.', show:[...ks('c',8),'lc'], gap:.08 },
      { say:'القاعدة: اضرب البسط والمقام في العدد نفسه، أو اقسمهما عليه للتبسيط، فتبقى القيمة كما هي.', show:['rule'] },
    ]},
  { t:'جمع الكسور',
    items:Object.assign({},
      { e1:{type:'text',x:320,y:95,s:34,text:'١/٥ + ٢/٥ = ٣/٥'} },
      strip('s',{x:170,y:118,w:300,h:40,n:5,colors:['surface2','surface2','pri','pri','pink']}),
      { w1:{type:'text',x:320,y:215,s:30,text:'١/٥ + ٢/٥ = ٣/١٠',cls:'t-bad'},
        e3:{type:'box',x:95,y:255,w:450,h:58,c:'n3',text:'١/٢ + ١/٤ = ٢/٤ + ١/٤ = ٣/٤',s:28,cls:'t-note'} }),
    beats:[
      { say:'لجمع كسرين لهما المقام نفسه، نجمع البسطين ونُبقي المقام كما هو.', show:['e1'] },
      { say:'خُمس زائد خُمسين يساوي ثلاثة أخماس. القطع من الحجم نفسه، فنعدّها فقط.', show:ks('s',5), gap:.12 },
      { say:'والفخ: لا نجمع المقامين أبدًا. ثلاثة أعشار هنا خطأ.', show:['w1'], strike:['w1'] },
      { say:'وإن اختلف المقامان نوحّدهما أولًا: النصف يساوي ربعين، فنصف زائد ربع يساوي ثلاثة أرباع.', show:['e3'] },
    ]},
  { t:'أيّهما أكبر؟',
    items:{ v1:{type:'box',x:350,y:64,w:210,h:58,c:'n1',text:'الأولى:  ٢/٣',s:26,cls:'t-note'}, v2:{type:'box',x:80,y:64,w:210,h:58,c:'n3',text:'الثانية:  ٣/٤',s:26,cls:'t-note'},
      r1:{type:'text',x:455,y:205,s:32,text:'٢ × ٤ = ٨'}, r2:{type:'text',x:185,y:205,s:32,text:'٣ × ٣ = ٩'}, ck:{type:'check',x:185,y:265},
      gt:{type:'text',x:320,y:320,s:24,text:'٩ أكبر من ٨، فالثانية أكبر',cls:'t-pri'} },
    beats:[
      { say:'في أسئلة المقارنة يأتيك كسران. القيمة الأولى ثلثان، والقيمة الثانية ثلاثة أرباع.', show:['v1','v2'] },
      { say:'الحيلة: اضرب تبادليًا، بسط كل كسر في مقام الآخر، ثم قارن الناتجين.', hl:['v1','v2'] },
      { say:'جرّب بنفسك. أيّ الخيارات صحيح؟', hl:['v2'] },
    ],
    ask:{ opts:['القيمة الأولى أكبر','القيمة الثانية أكبر','القيمتان متساويتان','المعطيات غير كافية'], a:1, s:19,
      right:'صحيح! اثنان في أربعة ثمانية، وثلاثة في ثلاثة تسعة، فالقيمة الثانية أكبر.',
      wrong:'اضرب تبادليًا: اثنان في أربعة يساوي ثمانية، وثلاثة في ثلاثة يساوي تسعة. إذن ثلاثة أرباع أكبر.',
      show:['r1','r2','ck','gt'] } },
  ],
  quiz:[
    {q:'أيّ الكسور التالية يكافئ ٣/٤؟', o:['٦/٩','٩/١٢','٤/٥','٦/١٠'], a:1, e:'اضرب البسط والمقام في ٣: ٣/٤ = ٩/١٢.'},
    {q:'١/٣ + ١/٦ = ؟', o:['٢/٩','١/٢','١/٩','٢/٣'], a:1, e:'وحّد المقام: ٢/٦ + ١/٦ = ٣/٦ = ١/٢.'},
    {q:'أيّ الكسور التالية هو الأكبر؟', o:['٣/٥','٥/٨','٢/٣','٤/٧'], a:2, e:'بالعشري تقريبًا: ٠٫٦ و٠٫٦٢٥ و٠٫٦٧ و٠٫٥٧، فالأكبر ٢/٣.'},
  ] });

/* ================= 3. decimals & conversion ================= */
add({ key:'ar-dec', sk:'arith', ord:30, title:'الكسور العشرية والتحويل', min:'٤ دقائق',
  goals:['تفهم معنى الخانات بعد الفاصلة','تحوّل بين الكسر والعشري والنسبة المئوية','تحفظ التحويلات الشائعة في الاختبار','تتجنب فخ الخانة الناقصة'],
  scenes:[
  { t:'ما الكسر العشري؟',
    items:{ g0:{type:'grid',x:60,y:82,rows:10,cols:10,cell:20,gap:2,fill:0}, g30:{type:'grid',x:60,y:82,rows:10,cols:10,cell:20,gap:2,fill:30,c:'pri'},
      g25:{type:'grid',x:60,y:82,rows:10,cols:10,cell:20,gap:2,fill:25,c:'pink'},
      e1:{type:'text',x:460,y:130,s:36,text:'٣/١٠ = ٠٫٣'}, e2:{type:'text',x:460,y:195,s:36,text:'٢٥/١٠٠ = ٠٫٢٥',cls:'t-pri'},
      n1:{type:'note',x:535,y:278,w:130,h:58,c:'n3',text:'٢ أعشار',size:22,rot:-2}, n2:{type:'note',x:385,y:278,w:150,h:58,c:'n1',text:'٥ من مئة',size:22,rot:2} },
    beats:[
      { say:'الكسر العشري كسرٌ مقامه عشرة أو مئة أو ألف، نكتبه بفاصلة بدل الخط.', show:['g0'] },
      { say:'لوّنا ثلاثة صفوف من عشرة، فهذه ثلاثة أعشار، ونكتبها صفرًا فاصلة ثلاثة.', hide:['g0'], show:['g30','e1'] },
      { say:'ولو لوّنا خمسة وعشرين مربعًا من مئة، لكتبنا صفرًا فاصلة خمسة وعشرين.', hide:['g30'], show:['g25','e2'] },
      { say:'الخانة الأولى بعد الفاصلة للأعشار، والثانية للأجزاء من مئة: عُشران وخمسة أجزاء من مئة.', show:['n1','n2'] },
    ]},
  { t:'ثلاثة أسماء لقيمة واحدة',
    items:{ nF:{type:'note',x:320,y:100,w:120,h:66,c:'n2',text:'١/٢',size:34}, lF:{type:'text',x:320,y:160,s:18,text:'كسر',cls:'t-ink2'},
      nD:{type:'note',x:140,y:255,w:120,h:66,c:'n3',text:'٠٫٥',size:34}, lD:{type:'text',x:140,y:315,s:18,text:'عشري',cls:'t-ink2'},
      nP:{type:'note',x:500,y:255,w:120,h:66,c:'n1',text:'٥٠٪',size:34}, lP:{type:'text',x:500,y:315,s:18,text:'نسبة مئوية',cls:'t-ink2'},
      a1:{type:'arrow',x1:250,y1:112,x2:160,y2:210,bend:0,cls:'s-pri'}, t1:{type:'text',x:165,y:150,s:20,text:'البسط على المقام',hand:true},
      a2:{type:'arrow',x1:215,y1:255,x2:425,y2:255,bend:-40,cls:'s-pri'}, t2:{type:'text',x:320,y:222,s:22,text:'× ١٠٠',cls:'t-pri'},
      a3:{type:'arrow',x1:480,y1:210,x2:390,y2:112,bend:0,cls:'s-pink'}, t3:{type:'text',x:490,y:150,s:20,text:'على ١٠٠ ثم بسّط',hand:true} },
    beats:[
      { say:'الكسر والعشري والنسبة المئوية ثلاثة أسماء لقيمة واحدة. خذ النصف مثلًا.', show:['nF','lF'] },
      { say:'من الكسر إلى العشري: اقسم البسط على المقام. واحد على اثنين يساوي صفرًا فاصلة خمسة.', show:['a1','t1','nD','lD'] },
      { say:'ومن العشري إلى النسبة المئوية: اضرب في مئة، أي انقل الفاصلة خانتين، فتصبح خمسين في المئة.', show:['a2','t2','nP','lP'] },
      { say:'وللرجوع إلى الكسر: اقسم على مئة ثم بسّط. خمسون على مئة يساوي نصفًا.', show:['a3','t3'] },
    ]},
  { t:'تحويلات تحفظها',
    items:Object.assign({}, trow('h',80,'كسر','عشري','نسبة',{hdr:true}), trow('r1',120,'١/٢','٠٫٥','٥٠٪'), trow('r2',160,'١/٤','٠٫٢٥','٢٥٪'),
      trow('r3',200,'٣/٤','٠٫٧٥','٧٥٪'), trow('r4',240,'١/٥','٠٫٢','٢٠٪'), trow('r5',280,'١/٨','٠٫١٢٥','١٢٫٥٪'),
      { trap:{type:'note',x:320,y:326,w:300,h:44,c:'n1',text:'٠٫٠٥ = ٥٪ لا ٥٠٪',size:22,rot:-1} }),
    beats:[
      { say:'بعض التحويلات تتكرر كثيرًا في الاختبار، فاحفظها لتوفّر وقتك. النصف خمسون في المئة.', show:[...rk('h'),...rk('r1')], gap:.15 },
      { say:'والربع خمسة وعشرون في المئة، وثلاثة أرباع خمسة وسبعون في المئة.', show:[...rk('r2'),...rk('r3')], gap:.12 },
      { say:'والخُمس عشرون في المئة، والثُّمن اثنا عشر ونصف في المئة.', show:[...rk('r4'),...rk('r5')], gap:.12 },
      { say:'وانتبه للخانات: صفر فاصلة صفر خمسة تساوي خمسة في المئة فقط، لا خمسين.', show:['trap'] },
    ]},
  { t:'دورك: حوّل',
    items:{ q:{type:'text',x:320,y:92,s:44,text:'٣/٨ = ؟٪'}, hint:{type:'text',x:320,y:135,s:22,text:'تذكّر: الثُّمن = ١٢٫٥٪',hand:true},
      res:{type:'box',x:150,y:190,w:340,h:62,c:'n0',text:'٣ × ١٢٫٥ = ٣٧٫٥٪',s:30,cls:'t-note'}, ck:{type:'check',x:320,y:295} },
    beats:[
      { say:'دورك. حوّل ثلاثة أثمان إلى نسبة مئوية.', show:['q'] },
      { say:'تذكّر أن الثُّمن اثنا عشر ونصف في المئة. فكم تكون ثلاثة أثمان؟', show:['hint'] },
    ],
    ask:{ opts:['٣٨٪','٣٧٫٥٪','٣٫٧٥٪','٠٫٣٧٥٪'], a:1,
      right:'أحسنت! ثلاثة في اثني عشر ونصف يساوي سبعة وثلاثين ونصفًا في المئة.',
      wrong:'الثُّمن اثنا عشر ونصف في المئة، وثلاثة أثمان ثلاثة أضعافه: سبعة وثلاثون ونصف في المئة.',
      show:['res','ck'] } },
  ],
  quiz:[
    {q:'٠٫٦ تساوي:', o:['٦/١٠٠','٣/٥','٦٪','٢/٣'], a:1, e:'٠٫٦ = ٦/١٠ = ٣/٥ بعد القسمة على ٢.'},
    {q:'أيّ الأعداد التالية هو الأكبر؟', o:['٠٫٠٩','٨٪','١/١٠','٠٫٠٩٩'], a:2, e:'١/١٠ = ٠٫١، وهي أكبر من ٠٫٠٩٩ و٠٫٠٩ و٠٫٠٨.'},
    {q:'٤٥٪ على صورة كسر في أبسط صورة:', o:['٤٥/١٠','٩/٢٠','٩/٢','٤/٥'], a:1, e:'٤٥/١٠٠، ثم نقسم البسط والمقام على ٥ فنحصل على ٩/٢٠.'},
  ] });

/* ================= 5. ratio & proportion ================= */
const S1c=['sky','sky','sky','pink','pink'];
add({ key:'ar-ratio', sk:'arith', ord:50, title:'النسبة والتناسب', min:'٤ دقائق',
  goals:['تفهم النسبة مقارنة بين كميتين','تقسم مبلغًا بنسبة معطاة بطريقة الأجزاء','تحل التناسب بالضرب التبادلي','تحل أسئلة الأجزاء من الكل بسرعة'],
  scenes:[
  { t:'ما النسبة؟',
    items:Object.assign({ d1:{type:'circle',cx:425,cy:110,r:20,c:'pink'}, d2:{type:'circle',cx:475,cy:110,r:20,c:'pink'},
      d3:{type:'circle',cx:140,cy:110,r:20,c:'sky'}, d4:{type:'circle',cx:190,cy:110,r:20,c:'sky'}, d5:{type:'circle',cx:240,cy:110,r:20,c:'sky'},
      l1:{type:'text',x:450,y:160,s:18,text:'وردي',cls:'t-ink2'}, l2:{type:'text',x:190,y:160,s:18,text:'أزرق',cls:'t-ink2'},
      r:{type:'text',x:325,y:125,s:46,text:'٢ : ٣',cls:'t-pri'} },
      strip('p',{x:120,y:200,w:400,h:48,n:5,colors:S1c}),
      { f1:{type:'text',x:440,y:285,s:26,text:'٢/٥'}, f2:{type:'text',x:240,y:285,s:26,text:'٣/٥'},
        dbl:{type:'text',x:320,y:332,s:20,text:'٤ : ٦ هي نفسها ٢ : ٣',hand:true} }),
    beats:[
      { say:'النسبة مقارنة بين كميتين. في هذا الكيس كرتان ورديتان وثلاث كرات زرقاء.', show:['d1','d2','d3','d4','d5','l1','l2'], gap:.12 },
      { say:'نقول: نسبة الوردي إلى الأزرق اثنان إلى ثلاثة.', show:['r'] },
      { say:'ومنها نعرف الكل: خمسة أجزاء، الوردي منها خُمسان، والأزرق ثلاثة أخماس.', show:[...ks('p',5),'f1','f2'], gap:.12 },
      { say:'والنسبة لا تتغير إذا ضاعفنا الكميتين معًا: أربع وست ما زالت اثنين إلى ثلاثة.', show:['dbl'] },
    ]},
  { t:'قسمة مبلغ بنسبة',
    items:Object.assign({ q:{type:'text',x:300,y:92,s:24,text:'قسّم ٤٥ ريالًا بين خالد وسعد بنسبة ٢ : ٣'} },
      strip('p',{x:120,y:125,w:400,h:56,n:5,colors:S1c,texts:['','','','',''],s:26,cls:'t-note'}),
      { e:{type:'text',x:320,y:238,s:36,text:'٤٥ ÷ ٥ = ٩'},
        k:{type:'note',x:440,y:300,w:150,h:54,c:'n1',text:'خالد: ١٨',size:24,rot:-2}, s:{type:'note',x:220,y:300,w:150,h:54,c:'n3',text:'سعد: ٢٧',size:24,rot:2} }),
    beats:[
      { say:'مثال شائع: قسّم خمسة وأربعين ريالًا بين خالد وسعد بنسبة اثنين إلى ثلاثة.', show:['q'] },
      { say:'اجمع أجزاء النسبة: اثنان زائد ثلاثة يساوي خمسة أجزاء متساوية.', show:ks('p',5), gap:.12 },
      { say:'قيمة الجزء الواحد: خمسة وأربعون على خمسة يساوي تسعة.', show:['e'], set:{p0:'٩',p1:'٩',p2:'٩',p3:'٩',p4:'٩'} },
      { say:'فلخالد جزءان، أي ثمانية عشر ريالًا، ولسعد ثلاثة أجزاء، أي سبعة وعشرون.', show:['k','s'] },
    ]},
  { t:'التناسب والضرب التبادلي',
    items:{ q:{type:'text',x:300,y:88,s:22,text:'٣ أقلام بـ ١٢ ريالًا، فكم ثمن ٧ أقلام؟'},
      n1:{type:'text',x:410,y:150,s:40,text:'٣'}, b1:{type:'line',x1:380,y1:163,x2:440,y2:163}, d1:{type:'text',x:410,y:205,s:40,text:'١٢'},
      eqs:{type:'text',x:320,y:178,s:40,text:'='},
      n2:{type:'text',x:230,y:150,s:40,text:'٧'}, b2:{type:'line',x1:200,y1:163,x2:260,y2:163}, d2:{type:'text',x:230,y:205,s:40,text:'س',cls:'t-pri'},
      x1:{type:'line',x1:255,y1:130,x2:385,y2:200,cls:'s-pink'}, x2:{type:'line',x1:255,y1:200,x2:385,y2:130,cls:'s-pink'},
      e:{type:'text',x:320,y:258,s:28,text:'٣ × س = ١٢ × ٧ = ٨٤'},
      ans:{type:'box',x:230,y:282,w:180,h:52,c:'n0',text:'س = ٢٨',s:28,cls:'t-note'} },
    beats:[
      { say:'التناسب نسبتان متساويتان. ثلاثة أقلام باثني عشر ريالًا، فكم ثمن سبعة أقلام؟', show:['q'] },
      { say:'نكتبهما كسرين متساويين: ثلاثة على اثني عشر يساوي سبعة على سين.', show:['n1','b1','d1','eqs','n2','b2','d2'], gap:.1 },
      { say:'نضرب تبادليًا: ثلاثة في سين يساوي اثني عشر في سبعة، أي أربعة وثمانين.', show:['x1','x2','e'] },
      { say:'ونقسم على ثلاثة: سين يساوي ثمانية وعشرين ريالًا.', show:['ans'] },
    ]},
  { t:'دورك: أجزاء من الكل',
    items:Object.assign({ q1:{type:'text',x:300,y:84,s:22,text:'علبة فيها ٣٥ قلمًا'}, q2:{type:'text',x:300,y:122,s:22,text:'نسبة الأزرق إلى الأحمر ٣ : ٤ ، كم قلمًا أحمر؟'} },
      strip('p',{x:110,y:180,w:420,h:52,n:7,colors:['bad','bad','bad','bad','sky','sky','sky'],texts:['٥','٥','٥','٥','٥','٥','٥'],s:24,cls:'t-note'}),
      { e:{type:'box',x:210,y:262,w:220,h:54,c:'n0',text:'٤ × ٥ = ٢٠',s:28,cls:'t-note'} }),
    beats:[
      { say:'دورك. علبة فيها خمسة وثلاثون قلمًا، ونسبة الأزرق إلى الأحمر ثلاثة إلى أربعة.', show:['q1','q2'] },
      { say:'اجمع الأجزاء أولًا، ثم أوجد قيمة الجزء الواحد. كم قلمًا أحمر في العلبة؟', hl:['q2'] },
    ],
    ask:{ opts:['١٥','٢٠','٢٨','٢٥'], a:1,
      right:'ممتاز! سبعة أجزاء، والجزء خمسة أقلام، فالأحمر أربعة أجزاء، أي عشرون قلمًا.',
      wrong:'الأجزاء ثلاثة زائد أربعة يساوي سبعة، والجزء خمسة وثلاثون على سبعة يساوي خمسة. فالأحمر أربعة في خمسة، أي عشرون.',
      show:[...ks('p',7),'e'] } },
  ],
  quiz:[
    {q:'قُسّم ٦٠ ريالًا بين شخصين بنسبة ١ : ٤. كم نصيب الأكبر؟', o:['١٥','٤٨','٤٠','١٢'], a:1, e:'٥ أجزاء، والجزء ٦٠ ÷ ٥ = ١٢، فالأكبر ٤ × ١٢ = ٤٨.'},
    {q:'إذا كان س/٥ = ١٢/٢٠ فما قيمة س؟', o:['٣','٤','٦','٢'], a:0, e:'اضرب تبادليًا: ٢٠ × س = ٦٠، إذن س = ٣.'},
    {q:'تقطع سيارة ١٢٠ كم بـ ٨ لترات. كم لترًا تحتاج لقطع ٢١٠ كم؟', o:['١٢','١٦','١٤','١٥'], a:2, e:'١٢٠/٨ = ٢١٠/س، إذن س = ٢١٠ × ٨ ÷ ١٢٠ = ١٤.'},
  ] });
})();
/* Explainers: comparison */
(function(){ if(!window.XP||!XP.ready) return;
/* pre-set the transform origin of pop-in items (engine's revealTl sets transformOrigin only in the "to" vars, which shifts them) */
const POPT=['box','circle','check','cross','dot','poly','pie'];
/* keep text readable in dark mode: light fills get note ink, dark fills get stage ink */
const LIGHT=['n0','n1','n2','n3','butter','sky'], DARKF=['surface','surface2','prisoft','pinksoft'];
const ADD=L=>{ L.scenes.forEach(sc=>{ for(const k in (sc.items||{})){ const it=sc.items[k]; if(POPT.includes(it.type)&&!it.rot) it.rot=.01; if((it.type==='box'||it.type==='circle')&&LIGHT.includes(it.c)&&!it.cls) it.cls='t-note'; if(it.type==='note'&&DARKF.includes(it.c)&&!it.cls) it.cls='t-ink'; } }); XP.add(L); };
const M=(x,y,s,text,cls)=>({type:'text',dir:'rtl',x,y,s,text,cls});
const CH=['أ: الأولى أكبر','ب: الثانية أكبر','ج: متساويتان','د: غير كافية'];
/* two quantity boxes: first on the right (RTL), second on the left */
const QB=(y,a,b,h=56,s=24)=>({
  qa:{type:'box',x:345,y,w:230,h,c:'prisoft',text:a,s},
  qb:{type:'box',x:65,y,w:230,h,c:'surface2',text:b,s},
});

/* ---------- 1. the four choices ---------- */
ADD({ key:'cm-choices', sk:'comparison', ord:10, title:'الخيارات الأربعة في المقارنة', min:'٣ دقائق',
  goals:['تعرف شكل سؤال المقارنة وخياراته الثابتة','تفهم معنى كل خيار','تعرف متى يكون الجواب «المعطيات غير كافية»','تستبعد «غير كافية» حين لا يوجد مجهول'],
  scenes:[
  { t:'شكل السؤال',
    items:{
      la:{type:'text',x:462,y:92,s:20,cls:'t-ink2',text:'القيمة الأولى'},
      lb:{type:'text',x:177,y:92,s:20,cls:'t-ink2',text:'القيمة الثانية'},
      qa:{type:'box',x:360,y:105,w:205,h:90,c:'prisoft',text:'؟',s:44,cls:'t-pri'},
      qb:{type:'box',x:75,y:105,w:205,h:90,c:'surface2',text:'؟',s:44,cls:'t-pri'},
      vs:{type:'text',x:320,y:160,s:22,hand:true,text:'مقابل'},
      c1:{type:'note',x:536,y:270,w:136,h:56,c:'n0',text:'أ: الأولى أكبر',size:16,rot:-2},
      c2:{type:'note',x:392,y:270,w:136,h:56,c:'n1',text:'ب: الثانية أكبر',size:16,rot:1.5},
      c3:{type:'note',x:248,y:270,w:136,h:56,c:'n3',text:'ج: متساويتان',size:16,rot:-1.5},
      c4:{type:'note',x:104,y:270,w:136,h:56,c:'n2',text:'د: غير كافية',size:16,rot:2},
    },
    beats:[
      {say:'في سؤال المقارنة قيمتان: القيمة الأولى والقيمة الثانية، والمطلوب معرفة العلاقة بينهما.', show:['la','qa','vs','lb','qb'], gap:.3},
      {say:'والخيارات أربعة ثابتة في كل الأسئلة، فاحفظها جيدًا لتوفّر وقتك.', show:['c1','c2','c3','c4'], gap:.35},
    ]},
  { t:'معنى كل خيار',
    items:(function(){ const o={}, rows=[['أ','الأولى أكبر دائمًا','١٢  مقابل  ٩','n0'],['ب','الثانية أكبر دائمًا','٣ × ٤  مقابل  ١٥','n1'],['ج','متساويتان دائمًا','½  مقابل  ٠٫٥','n3'],['د','المعطيات غير كافية','س  مقابل  ٥','n2']];
      rows.forEach((r,i)=>{ const y=100+i*64; o['k'+i]={type:'circle',cx:560,cy:y,r:22,c:r[3],text:r[0],s:22};
        o['m'+i]={type:'text',x:415,y:y+8,s:22,text:r[1]};
        o['e'+i]={type:'box',x:70,y:y-24,w:220,h:48,c:'surface2',text:r[2],s:22}; }); return o; })(),
    beats:[
      {say:'الخيار ألف: القيمة الأولى أكبر دائمًا، مثل اثني عشر مقابل تسعة.', show:['k0','m0','e0'], gap:.3},
      {say:'الخيار باء: القيمة الثانية أكبر دائمًا، مثل ثلاثة في أربعة مقابل خمسة عشر.', show:['k1','m1','e1'], gap:.3},
      {say:'الخيار جيم: القيمتان متساويتان دائمًا، مثل نصف مقابل خمسة أعشار.', show:['k2','m2','e2'], gap:.3},
      {say:'والخيار دال: المعطيات غير كافية، أي لا توجد علاقة واحدة ثابتة بين القيمتين.', show:['k3','m3','e3'], gap:.3},
      {say:'لاحظ كلمة دائمًا في الخيارات الثلاثة الأولى؛ فالعلاقة يجب أن تصح في كل الحالات، لا في حالة واحدة.', hl:['m0','m1','m2']},
    ]},
  { t:'متى تكون غير كافية؟',
    items:{
      top:M(320,100,32,'س  مقابل  ٥'),
      t1:{type:'box',x:335,y:125,w:240,h:52,c:'n3',text:'س = ٨ ← الأولى أكبر',s:20},
      t2:{type:'box',x:65,y:125,w:240,h:52,c:'n1',text:'س = ٢ ← الثانية أكبر',s:20},
      cn:{type:'note',x:320,y:232,w:300,h:58,c:'n2',text:'العلاقة تغيّرت ← د',size:24,rot:-1.5},
      n2:{type:'note',x:320,y:312,w:420,h:50,c:'n0',text:'لا مجهول؟ إذن الجواب ليس «د»',size:21,rot:1},
    },
    beats:[
      {say:'اختر دال عندما تتغير العلاقة بتغير قيمة المجهول. خذ مثلًا سين مقابل خمسة، بلا أي شرط.', show:['top']},
      {say:'إذا كان سين ثمانية فالأولى أكبر، وإذا كان اثنين فالثانية أكبر؛ فالعلاقة غير ثابتة، والجواب دال.', show:['t1','t2','cn'], gap:.5},
      {say:'أما إذا كانت القيمتان أعدادًا صريحة بلا مجهول، فلا يمكن أن يكون الجواب دال أبدًا.', show:['n2']},
    ]},
  { t:'دورك',
    items:Object.assign(QB(72,'٢٥٪ من ٤٠','٤٠٪ من ٢٥',56,24),{
      s1:M(320,222,32,'١٠ = ١٠','t-pri'),
      tip:{type:'note',x:320,y:290,w:340,h:56,c:'n0',text:'أ٪ من ب = ب٪ من أ',size:23,rot:-1.5},
    }),
    beats:[
      {say:'دورك. القيمة الأولى خمسة وعشرون في المئة من أربعين، والثانية أربعون في المئة من خمسة وعشرين.', show:['qa','qb'], gap:.4},
      {say:'فأيّ الخيارات الأربعة هو الصحيح؟'},
    ],
    ask:{ opts:CH, a:2,
      right:'أحسنت. كلتاهما تساوي عشرة، فالجواب جيم.',
      wrong:'ربع الأربعين عشرة، وأربعون في المئة من خمسة وعشرين عشرة أيضًا؛ فهما متساويتان، والجواب جيم. ولا مكان لدال لأنه لا مجهول هنا.',
      show:['s1','tip'] }},
  ],
  quiz:[
    {q:'القيمة الأولى: ٣ × ٨ — القيمة الثانية: ٢٥', o:CH, a:1, e:'٣ × ٨ = ٢٤، و٢٤ أصغر من ٢٥.'},
    {q:'القيمة الأولى: ٠٫٧٥ — القيمة الثانية: ¾', o:CH, a:2, e:'¾ = ٠٫٧٥، فهما متساويتان.'},
    {q:'س عدد حقيقي. القيمة الأولى: س — القيمة الثانية: ٣', o:CH, a:3, e:'عند س = ٥ الأولى أكبر، وعند س = ١ الثانية أكبر.'},
  ]});

/* ---------- 2. testing values ---------- */
ADD({ key:'cm-test', sk:'comparison', ord:20, title:'تجريب القيم', min:'٤ دقائق',
  goals:['تعرف لماذا لا تكفي تجربة واحدة','تجرّب الصفر والسالب والكسر والعدد الكبير','تختار «د» فور انقلاب العلاقة','تقرأ الشرط وتجرّب ضمنه فقط'],
  scenes:[
  { t:'لا تكتفِ بتجربة واحدة',
    items:Object.assign(QB(75,'الأولى: س²','الثانية: س',58,24),{
      t2:{type:'text',x:320,y:190,s:24,text:'س = ٢ ← ٤ أكبر من ٢'},
      wc:{type:'note',x:320,y:268,w:320,h:58,c:'n1',text:'الأولى أكبر دائمًا؟',size:24,rot:-1.5},
    }),
    beats:[
      {say:'عندما يظهر مجهول في المقارنة، مثل سين تربيع مقابل سين، لا تكتفِ بأول عدد يخطر ببالك.', show:['qa','qb'], gap:.4},
      {say:'أغلبنا يجرّب اثنين: أربعة أكبر من اثنين، فنظن أن الأولى أكبر دائمًا.', show:['t2','wc'], gap:.5},
      {say:'لكن هذا استعجال؛ فالسؤال يترك مجالًا لأعداد لا نتوقعها.', strike:['wc']},
    ]},
  { t:'القائمة الذهبية',
    items:(function(){ const o={}, xs=[515,385,255,125], v=['٠','−١','½','١٠٠'], k=['صفر','سالب','كسر','عدد كبير'], h=['يمحو الضرب','يقلب الإشارة','يصغُر بالتربيع','يكشف الأسرع'], c=['n0','n1','n3','n2'];
      xs.forEach((x,i)=>{ o['n'+i]={type:'note',x,y:140,w:110,h:84,c:c[i],text:v[i],size:36,rot:[-3,2,-2,3][i]}; o['k'+i]={type:'text',x,y:218,s:21,cls:'t-ink2',text:k[i]}; o['h'+i]={type:'text',x,y:262+(i%2)*28,s:19,hand:true,text:h[i]}; }); return o; })(),
    beats:[
      {say:'جرّب دائمًا هذه الأنواع: الصفر، وعددًا سالبًا، وكسرًا بين الصفر والواحد، وعددًا كبيرًا.', show:['n0','k0','n1','k1','n2','k2','n3','k3'], gap:.3},
      {say:'لكل منها سلوك خاص: الصفر يمحو الضرب، والسالب يقلب الإشارة، والكسر يصغر عند التربيع، والكبير يكشف أيهما ينمو أسرع.', show:['h0','h1','h2','h3'], gap:.4},
    ]},
  { t:'جرّب معي',
    items:{
      hA:{type:'text',x:450,y:92,s:24,cls:'t-pri',text:'الأولى: س²'},
      hB:{type:'text',x:190,y:92,s:24,cls:'t-pri',text:'الثانية: س'},
      r1:{type:'box',x:90,y:122,w:460,h:52,c:'n3',text:'س = ٢ :  ٤ مقابل ٢ ← الأولى أكبر',s:21},
      r2:{type:'box',x:90,y:190,w:460,h:52,c:'n1',text:'س = ½ :  ¼ مقابل ½ ← الثانية أكبر',s:21},
      rn:{type:'note',x:320,y:298,w:320,h:58,c:'n2',text:'انقلبت العلاقة ← د',size:25,rot:-1.5},
    },
    beats:[
      {say:'نعود إلى سين تربيع مقابل سين. عند سين يساوي اثنين: أربعة مقابل اثنين، فالأولى أكبر.', show:['hA','hB','r1'], gap:.3},
      {say:'وعند سين يساوي نصفًا: ربع مقابل نصف، فالثانية أكبر!', show:['r2']},
      {say:'انقلبت العلاقة بين تجربتين، فالجواب دال فورًا، ولا حاجة إلى تجارب أخرى.', show:['rn']},
    ]},
  { t:'اقرأ الشرط أولًا',
    items:{
      cond:{type:'box',x:190,y:72,w:260,h:52,c:'butter',text:'الشرط: س > ١',s:24},
      e1:{type:'note',x:440,y:170,w:80,h:54,c:'surface2',text:'٠',size:28,rot:-2},
      e2:{type:'note',x:320,y:170,w:80,h:54,c:'surface2',text:'−١',size:28,rot:2},
      e3:{type:'note',x:200,y:170,w:80,h:54,c:'surface2',text:'½',size:28,rot:-1},
      a1:M(320,245,24,'س = ٢ :  ٤ أكبر من ٢'),
      a2:M(320,285,24,'س = ١٠ :  ١٠٠ أكبر من ١٠'),
      ans:{type:'text',x:320,y:333,s:24,hand:true,text:'الأولى أكبر دائمًا ← أ'},
    },
    beats:[
      {say:'اقرأ الشرط قبل التجريب. هنا سين أكبر من واحد، فالصفر والسالب والكسر ممنوعة.', show:['cond','e1','e2','e3'], strike:['e1','e2','e3'], gap:.3},
      {say:'فنجرّب اثنين وعشرة: الأولى أكبر في الحالتين، وتبقى كذلك لكل سين أكبر من واحد؛ فالجواب ألف.', show:['a1','a2','ans'], gap:.5},
    ]},
  { t:'دورك',
    items:Object.assign(QB(70,'الأولى: ٢س','الثانية: س',48,23),{
      cond:{type:'text',x:320,y:134,s:18,cls:'t-ink2',text:'لا شرط على س'},
      w1:M(320,200,22,'س = ١ :  ٢ مقابل ١ ← أ'),
      w2:M(320,245,22,'س = −١ :  −٢ مقابل −١ ← ب'),
      w3:{type:'note',x:320,y:305,w:280,h:52,c:'n2',text:'العلاقة تتغير ← د',size:23,rot:-1.5},
    }),
    beats:[
      {say:'دورك. القيمة الأولى اثنان سين، والثانية سين، ولا شرط على سين.', show:['qa','qb','cond'], gap:.35},
      {say:'جرّب الصفر والسالب والموجب، ثم اختر.'},
    ],
    ask:{ opts:CH, a:3,
      right:'صحيح. عند واحد الأولى أكبر، وعند سالب واحد الثانية أكبر، فالعلاقة تتغير والجواب دال.',
      wrong:'جرّب سالب واحد: الأولى سالب اثنين والثانية سالب واحد، فالثانية أكبر. وعند واحد الأولى أكبر؛ فالجواب دال.',
      show:['w1','w2','w3'] }},
  ],
  quiz:[
    {q:'س عدد سالب. القيمة الأولى: س² — القيمة الثانية: س', o:CH, a:0, e:'مربع السالب موجب، والموجب أكبر من السالب دائمًا.'},
    {q:'لا شرط على س. القيمة الأولى: س² — القيمة الثانية: ٠', o:CH, a:3, e:'عند س = ٠ متساويتان، وعند س = ١ الأولى أكبر.'},
    {q:'٠ < س < ١. القيمة الأولى: س³ — القيمة الثانية: س', o:CH, a:1, e:'الكسر يصغر كلما رفعناه لأس أكبر: عند س = ½ تكون س³ = ⅛.'},
  ]});

/* ---------- 3. simplify before computing ---------- */
const SIDE=(pre,x,y,t1,t2,op='+')=>({ [pre+'1']:M(x+58,y,32,t1), [pre+'p']:M(x,y,30,op), [pre+'2']:M(x-44,y,32,t2) });
ADD({ key:'cm-simplify', sk:'comparison', ord:30, title:'بسّط قبل أن تحسب', min:'٣ دقائق',
  goals:['تحذف الحدود المتطابقة من الطرفين','تعرف ما يجوز فعله بالطرفين دون تغيير العلاقة','تقارن بالتقدير بدل الحساب الكامل'],
  scenes:[
  { t:'احذف المشترك',
    items:Object.assign({
      la:{type:'text',x:460,y:88,s:20,cls:'t-ink2',text:'القيمة الأولى'},
      lb:{type:'text',x:180,y:88,s:20,cls:'t-ink2',text:'القيمة الثانية'},
      ba:{type:'box',x:345,y:100,w:230,h:64,c:'prisoft'},
      bb:{type:'box',x:65,y:100,w:230,h:64,c:'surface2'},
    }, SIDE('a',455,144,'٤٨٧','٣٩'), SIDE('b',175,144,'٤٨٧','٤١'), {
      rem:{type:'text',x:320,y:222,s:24,text:'يبقى: ٣٩ مقابل ٤١'},
      v:{type:'note',x:320,y:290,w:280,h:58,c:'n0',text:'الثانية أكبر ← ب',size:25,rot:-1.5},
    }),
    beats:[
      {say:'في المقارنة لا يهمّك الناتج الدقيق، بل أيّ الطرفين أكبر.', show:['la','ba','a1','ap','a2','lb','bb','b1','bp','b2'], gap:.12},
      {say:'العدد أربعمئة وسبعة وثمانون موجود في الطرفين، فاحذفه منهما.', strike:['a1','b1']},
      {say:'يبقى تسعة وثلاثون مقابل واحد وأربعين، فالثانية أكبر دون أي حساب طويل.', show:['rem','v'], gap:.5},
    ]},
  { t:'ما يجوز فعله بالطرفين',
    items:{
      r1:{type:'box',x:130,y:78,w:440,h:56,c:'n3',text:'اجمع أو اطرح العدد نفسه من الطرفين',s:20},
      k1:{type:'check',x:88,y:106},
      r2:{type:'box',x:130,y:156,w:440,h:56,c:'n3',text:'اضرب أو اقسم على العدد الموجب نفسه',s:20},
      k2:{type:'check',x:88,y:184},
      r3:{type:'box',x:130,y:234,w:440,h:56,c:'n1',text:'لا تضرب في سالب أو مجهول الإشارة',s:20},
      k3:{type:'cross',x:88,y:262},
    },
    beats:[
      {say:'يجوز أن تضيف العدد نفسه إلى الطرفين أو تطرحه منهما، والعلاقة لا تتغير.', show:['r1','k1'], gap:.3},
      {say:'ويجوز أن تضرب الطرفين أو تقسمهما على العدد الموجب نفسه.', show:['r2','k2'], gap:.3},
      {say:'أما الضرب في عدد سالب، أو في مجهول لا تعرف إشارته، فقد يقلب العلاقة؛ فتجنّبه.', show:['r3','k3'], gap:.3},
    ]},
  { t:'مجهول في الطرفين',
    items:Object.assign({
      ba:{type:'box',x:345,y:90,w:230,h:64,c:'prisoft'},
      bb:{type:'box',x:65,y:90,w:230,h:64,c:'surface2'},
    }, SIDE('a',455,134,'س','٧'), SIDE('b',175,134,'س','٩'), {
      rem:{type:'text',x:320,y:212,s:24,text:'يبقى: ٧ مقابل ٩'},
      v:{type:'note',x:320,y:282,w:360,h:58,c:'n0',text:'الثانية أكبر دائمًا ← ب لا د',size:24,rot:1.5},
    }),
    beats:[
      {say:'قد يكون المجهول في الطرفين، مثل سين زائد سبعة مقابل سين زائد تسعة.', show:['ba','a1','ap','a2','bb','b1','bp','b2'], gap:.12},
      {say:'اطرح سين من الطرفين، فيبقى سبعة مقابل تسعة؛ فالثانية أكبر دائمًا، والجواب باء لا دال.', strike:['a1','b1'], show:['rem','v'], gap:.5},
    ]},
  { t:'قدّر ولا تحسب',
    items:Object.assign(QB(78,'١٩٨ × ٥','١٠٠٠',58,28),{
      s1:{type:'text',x:320,y:190,s:24,text:'١٩٨ أقل من ٢٠٠'},
      s2:M(320,238,28,'٢٠٠ × ٥ = ١٠٠٠'),
      v:{type:'note',x:320,y:302,w:280,h:56,c:'n0',text:'الثانية أكبر ← ب',size:25,rot:-1.5},
    }),
    beats:[
      {say:'وإذا صعب الحساب فقدّر. قارن مئة وثمانية وتسعين في خمسة بألف.', show:['qa','qb'], gap:.4},
      {say:'مئة وثمانية وتسعون أقل من مئتين، ومئتان في خمسة ألف.', show:['s1','s2'], gap:.5},
      {say:'إذن الأولى أقل من ألف، والثانية أكبر. قرّبنا إلى عدد سهل، وانتبهنا لاتجاه التقريب.', show:['v']},
    ]},
  { t:'دورك',
    items:Object.assign(QB(66,'','½',72,34),{
      f1:M(460,93,26,'٧'), fl:{type:'line',x1:440,y1:101,x2:480,y2:101,cls:'s-ink'}, f2:M(460,128,26,'١٥'),
      w1:{type:'text',x:320,y:215,s:26,text:'نصف ١٥ هو ٧٫٥'},
      w2:{type:'text',x:320,y:260,s:26,text:'و٧ أقل من ٧٫٥'},
      v:{type:'note',x:320,y:318,w:280,h:52,c:'n0',text:'الثانية أكبر ← ب',size:24,rot:-1.5},
    }),
    beats:[
      {say:'دورك. القيمة الأولى سبعة على خمسة عشر، والثانية نصف.', show:['qa','f1','fl','f2','qb'], gap:.2},
      {say:'قارن دون قسمة طويلة. ما الجواب؟'},
    ],
    ask:{ opts:CH, a:1,
      right:'أحسنت. نصف خمسة عشر سبعة ونصف، وسبعة أقل منها، فالكسر أصغر من النصف والجواب باء.',
      wrong:'نصف خمسة عشر سبعة ونصف، والبسط سبعة فقط، فالكسر أصغر من النصف. إذن الثانية أكبر، والجواب باء.',
      show:['w1','w2','v'] }},
  ],
  quiz:[
    {q:'القيمة الأولى: ٣٦٥ + ٨٩ — القيمة الثانية: ٣٦٥ + ٩٨', o:CH, a:1, e:'احذف ٣٦٥ من الطرفين: ٨٩ أصغر من ٩٨.'},
    {q:'القيمة الأولى: ١٠٢ × ١٠ — القيمة الثانية: ١٠٠٠', o:CH, a:0, e:'١٠٢ أكبر من ١٠٠، و١٠٠ × ١٠ = ١٠٠٠، فالأولى أكبر.'},
    {q:'القيمة الأولى: ٤ × ٢٥ × ٧ — القيمة الثانية: ٧ × ١٠٠', o:CH, a:2, e:'٤ × ٢٥ = ١٠٠، فالطرفان ١٠٠ × ٧.'},
  ]});
})();
/* Explainers: completion (إكمال الجمل) */
(function(){ if(!window.XP||!XP.ready) return;

/* Pre-set a centered transform origin on pop-in items so the engine's scale-in does not leave them offset (see report). */
const POPT=new Set(['note','box','circle','check','cross','poly','pie','dot']);
const fixO=items=>{ for(const k in items){ const it=items[k]; if(POPT.has(it.type)&&!it.rot) it.rot=.01; } return items; };
const blank=(x,y,w=110,h=44,s=22)=>({type:'box',x,y,w,h,c:'surface2',text:'......',s,cls:'t-pri'});

/* ================= Lesson: signal words ================= */
const S1={ s:{type:'text',x:532,y:140,s:26,text:'كان الجوّ ممطرًا،'},
  sig:{type:'note',x:338,y:130,w:110,h:60,c:'n1',text:'لذلك',size:28,rot:-1.5},
  b:blank(48,106,215,50,24),
  hint:{type:'text',x:338,y:205,s:26,hand:true,text:'تُكمل ←'},
  foot:{type:'note',x:320,y:290,w:330,h:62,c:'n0',text:'الأداة تحدد اتجاه الفراغ',size:24,rot:-1} };

const RW=[['لكنّ',540,150],['رغم',410,150],['بينما',540,235],['إلا أنّ',410,235]], LW=[['لأنّ',230,150],['لذلك',100,150],['كما',230,235],['و',100,235]];
const S2={ hR:{type:'box',x:345,y:70,w:260,h:46,c:'pinksoft',text:'تقلب المعنى',s:23}, hL:{type:'box',x:35,y:70,w:260,h:46,c:'oksoft',text:'تُكمل المعنى',s:23} };
RW.forEach(([t,x,y],i)=>{ S2['r'+i]={type:'note',x,y,w:112,h:62,c:'n1',text:t,size:t.length>4?23:27,rot:i%2?1.5:-1.5}; });
LW.forEach(([t,x,y],i)=>{ S2['l'+i]={type:'note',x,y,w:112,h:62,c:'n3',text:t,size:27,rot:i%2?1.5:-1.5}; });
S2.foot={type:'text',x:320,y:320,s:28,hand:true,text:'تقلب أم تُكمل؟'};

const OP=[['وفرة',530],['محدودية',390],['ضخامة',250],['تنوّع',110]];
const S3={ w1:{type:'text',x:515,y:95,s:26,text:'رغم'}, b:blank(345,64,120,46,24), w2:{type:'text',x:262,y:95,s:26,text:'الإمكانات،'},
  w3:{type:'text',x:320,y:150,s:26,text:'حقق الفريق نتائج مبهرة.'},
  pred:{type:'note',x:320,y:212,w:220,h:54,c:'n0',text:'توقّعك: قِلّة',size:24,rot:-1.5} };
OP.forEach(([t,x],i)=>{ S3['o'+i]={type:'box',x:x-60,y:258,w:120,h:46,c:'surface',text:t,s:21}; });
S3.v={type:'check',x:390,y:330,s:.6};

const S4={ l1:{type:'text',x:320,y:80,s:26,text:'اجتهد سالم في التدريب،'},
  b:blank(345,100,110,46,24), l2:{type:'text',x:240,y:132,s:26,text:'خسر السباق.'},
  ans:{type:'note',x:400,y:123,w:118,h:50,c:'n0',text:'لكنه',size:26,rot:-1.5},
  why:{type:'text',x:320,y:235,s:26,hand:true,text:'اجتهاد ثم خسارة: المعنى انقلب'} };

const S5={ a:{type:'note',x:510,y:160,w:170,h:96,c:'n0',text:'١ حدّد الأداة',size:23,rot:-2},
  b:{type:'note',x:320,y:160,w:170,h:96,c:'n1',text:'٢ توقّع كلمتك',size:23,rot:1.5},
  c:{type:'note',x:130,y:160,w:170,h:96,c:'n3',text:'٣ ثم الخيارات',size:23,rot:-1.5},
  foot:{type:'text',x:320,y:292,s:26,hand:true,text:'الخيارات تأتي بعد توقّعك، لا قبله'} };

[S1,S2,S3,S4,S5].forEach(fixO);
XP.add({ key:'co-signals', sk:'completion', ord:10, title:'كلمات الإشارة في إكمال الجمل', min:'٤ دقائق',
  goals:['تعرف أن أداة الربط تحدد اتجاه الكلمة المفقودة','تميّز أدوات التضاد من أدوات السبب والإضافة','تتوقع الكلمة المفقودة قبل قراءة الخيارات'],
  scenes:[
  { t:'للجملة اتجاه', items:S1, beats:[
    { say:'في إكمال الجمل، أداة الربط هي البوصلة، فهي تدلّك على اتجاه الكلمة المفقودة.', show:['s','sig','b'] },
    { say:'كان الجو ممطرًا، لذلك حملنا المظلات. لذلك تُكمل المعنى في الاتجاه نفسه.', set:{b:'حملنا المظلات'}, show:['hint'] },
    { say:'فإذا وضعنا لكنّ، انقلب الاتجاه، لكنّ الرحلة لم تُلغَ.', set:{sig:'لكنّ',b:'الرحلة لم تُلغَ',hint:'تقلب ↩'}, show:['foot'] } ]},
  { t:'أدوات تقلب وأدوات تُكمل', items:S2, beats:[
    { say:'أدوات التضاد تقلب المعنى، مثل لكنّ ورغم وبينما وإلا أنّ. ما بعدها عكس ما قبلها.', show:['hR','r0','r1','r2','r3'], gap:.3 },
    { say:'وأدوات السبب والإضافة تُكمل المعنى، مثل لأنّ ولذلك وكما وحرف الواو.', show:['hL','l0','l1','l2','l3'], gap:.3 },
    { say:'فاسأل نفسك أولًا، هل الأداة تقلب المعنى أم تُكمله؟', show:['foot'], hl:['hR','hL'] } ]},
  { t:'توقّع قبل الخيارات', items:S3, beats:[
    { say:'اقرأ الجملة أولًا وغطِّ الخيارات. الفراغ يصف الإمكانات، والفريق حقق نتائج مبهرة.', show:['w1','b','w2','w3'], gap:.2 },
    { say:'رغم أداة قلب، والنتيجة مبهرة، إذن الإمكانات عكس ذلك، أي قليلة.', hl:['w1'], show:['pred'] },
    { say:'الآن اقرأ الخيارات وابحث عمّا يوافق توقعك. محدودية هي الأقرب.', show:['o0','o1','o2','o3','v'], gap:.15, set:{b:'محدودية'} },
    { say:'أما وفرة وضخامة فتوافقان النتيجة ولا تقلبانها، فنستبعدهما.', strike:['o0','o2'] } ]},
  { t:'دورك: أيّ أداة؟', items:S4, beats:[
    { say:'دورك. اقرأ الجملة، واسأل هل الشطر الثاني يُكمل الأول أم يقلبه؟', show:['l1','b','l2'], gap:.25 },
    { say:'اجتهد سالم في التدريب، ثم خسر السباق. أيّ أداة تناسب الفراغ؟', hl:['b'] } ],
    ask:{ opts:['لذلك','لأنه','لكنه','كما'], a:2, show:['ans','why'],
      right:'أحسنت. الخسارة عكس المتوقع من الاجتهاد، فنحتاج أداة قلب، لكنه.',
      wrong:'انتبه. الاجتهاد يوحي بالفوز، والنتيجة خسارة، فالمعنى انقلب. نحتاج أداة قلب، لكنه.' } },
  { t:'خطواتك', items:S5, beats:[
    { say:'خطواتك إذن، حدّد الأداة، ثم توقّع كلمتك، ثم اقرأ الخيارات.', show:['a','b','c'], gap:.4 },
    { say:'فالتوقع يحميك من خيار جميل لكنه يسير في الاتجاه الخطأ.', show:['foot'] } ]},
  ],
  quiz:[
    {q:'رغم ......... الطقس، خرج الأطفال للعب في الحديقة.', o:['اعتدال','برودة','جمال','صفاء'], a:1, e:'«رغم» تقلب المعنى: خرجوا للعب مع أن الطقس غير مناسب، أي بارد.'},
    {q:'نام مبكرًا، ......... استيقظ نشيطًا.', o:['لكنه','رغم أنه','لذلك','بينما'], a:2, e:'النشاط نتيجة للنوم المبكر، فالأداة أداة نتيجة: «لذلك».'},
    {q:'يحب أخي الرياضة، ......... تفضّل أختي القراءة.', o:['لأن','بينما','لذلك','كما'], a:1, e:'مقابلة بين تفضيلين مختلفين، فالمناسب «بينما».'},
  ] });

/* ================= Lesson: two blanks & meaning agreement ================= */
const OPT=[['يقوّي / بينما',470,202],['يُضعف / لكنّ',170,202],['يقوّي / لذلك',470,264],['يُتلف / كما',170,264]];
const T1={ a1:{type:'text',x:505,y:92,s:26,text:'النوم الكافي'}, b1:blank(305,66,110,42,22), a2:{type:'text',x:215,y:92,s:26,text:'الذاكرة،'},
  b2:blank(365,118,110,42,22), a3:{type:'text',x:250,y:145,s:26,text:'السهر يُضعفها.'} };
OPT.forEach(([t,x,y],i)=>{ T1['o'+i]={type:'box',x:x-120,y:y-24,w:240,h:48,c:'surface',text:t,s:22}; });
T1.v={type:'check',x:615,y:202,s:.6};

const T2={ a1:{type:'text',x:470,y:110,s:26,text:'كان المتحدث'}, b1:blank(250,84,120,44,24),
  a2:{type:'text',x:450,y:180,s:26,text:'فلم يفهم الحاضرون'}, b2:blank(190,154,120,44,24), a3:{type:'text',x:110,y:180,s:26,text:'من كلامه.'},
  x:{type:'cross',x:320,y:262,s:.8}, v:{type:'check',x:320,y:262,s:.8},
  tag:{type:'text',x:320,y:325,s:24,hand:true,text:'كل فراغ وحده لا يكفي: المعنى كله يتفق'} };

const CL=[['يُولي','اهتمامًا',470,125],['يتّخذ','قرارًا',170,125],['يُبدي','رأيًا',470,225],['يُلقي','كلمة',170,225]];
const T3={}; CL.forEach(([v,n,x,y],i)=>{ T3['v'+i]={type:'note',x:x+62,y,w:118,h:62,c:'n2',text:v,size:26,rot:-1.5}; T3['n'+i]={type:'note',x:x-62,y,w:118,h:62,c:'n0',text:n,size:n.length>5?22:26,rot:1.5}; });
T3.foot={type:'text',x:320,y:315,s:26,hand:true,text:'الفعل يستدعي رفيقه المعتاد'};

const T4={ l1:{type:'text',x:430,y:84,s:25,text:'تُولي المملكة التعليمَ'}, b1:blank(160,60,110,40,22),
  w2:{type:'text',x:520,y:132,s:25,text:'كبيرًا،'}, b2:blank(370,108,110,40,22), l2:{type:'text',x:230,y:132,s:25,text:'تُنفق عليه بسخاء.'},
  ans:{type:'note',x:320,y:225,w:280,h:64,c:'n0',text:'اهتمامًا + لذلك',size:27,rot:-1.5} };

const T5={ a:{type:'note',x:510,y:160,w:180,h:96,c:'n0',text:'١ الفراغ الأوضح',size:20,rot:-2},
  b:{type:'note',x:320,y:160,w:170,h:96,c:'n1',text:'٢ استبعد',size:25,rot:1.5},
  c:{type:'note',x:130,y:160,w:170,h:96,c:'n3',text:'٣ اقرأ كاملة',size:23,rot:-1.5},
  foot:{type:'text',x:320,y:292,s:26,hand:true,text:'وانتبه للكلمات المتلازمة'} };

[T1,T2,T3,T4,T5].forEach(fixO);
XP.add({ key:'co-twoblank', sk:'completion', ord:20, title:'الفراغان وتوافق المعنى', min:'٤ دقائق',
  goals:['تبدأ بالفراغ الأوضح وتستبعد به الخيارات','تتحقق من اتفاق معنى الجملة كاملة','تعرف الكلمات المتلازمة مثل «يُولي اهتمامًا»'],
  scenes:[
  { t:'ابدأ بالفراغ الأوضح', items:T1, beats:[
    { say:'في سؤال الفراغين لا تحاول حلّهما معًا. ابدأ بالفراغ الأوضح.', show:['a1','b1','a2','b2','a3','o0','o1','o2','o3'], gap:.12 },
    { say:'النوم الكافي يقوّي الذاكرة، لا يُضعفها ولا يُتلفها. نستبعد خيارين.', set:{b1:'يقوّي'}, strike:['o1','o3'] },
    { say:'بقي خياران. بين النوم والسهر مقابلة، فنحتاج أداة تضاد، بينما.', set:{b2:'بينما'}, strike:['o2'], show:['v'] } ]},
  { t:'اقرأ الجملة كاملة', items:T2, beats:[
    { say:'بعد الاختيار، أعد قراءة الجملة كاملة. قد يصلح كل فراغ وحده، ويبقى المعنى متناقضًا.', show:['a1','b1','a2','b2','a3'], gap:.15 },
    { say:'كان المتحدث فصيحًا فلم يفهم الحاضرون شيئًا. تبدو سليمة، لكن الفصاحة لا تمنع الفهم.', set:{b1:'فصيحًا',b2:'شيئًا'}, show:['x'] },
    { say:'والصحيح، كان المتحدث غامضًا فلم يفهم الحاضرون كثيرًا من كلامه. الآن اتفق المعنى.', set:{b1:'غامضًا',b2:'كثيرًا'}, hide:['x'], show:['v','tag'] } ]},
  { t:'كلمات تأتي معًا', items:T3, beats:[
    { say:'بعض الكلمات تأتي معًا في الفصحى، ونسمّيها المتلازمات. نقول يُولي اهتمامًا.', show:['v0','n0'] },
    { say:'ونقول يتّخذ قرارًا، ويُبدي رأيًا، ويُلقي كلمة.', show:['v1','n1','v2','n2','v3','n3'], gap:.25 },
    { say:'فإذا رأيت أحد هذه الأفعال قبل الفراغ، فابحث عن رفيقه المعتاد.', show:['foot'], hl:['v0','n0'] } ]},
  { t:'دورك: فراغان', items:T4, beats:[
    { say:'دورك. في الجملة فراغان. ابدأ بالأول بعد الفعل تُولي، ثم تحقّق من المعنى كله.', show:['l1','b1','w2','b2','l2'], gap:.2 },
    { say:'أيّ خيار يملأ الفراغين معًا؟', hl:['b1','b2'] } ],
    ask:{ opts:['اهتمامًا / لذلك','إهمالًا / لذلك','اهتمامًا / لكنها','تجاهلًا / كما'], a:0, show:['ans'],
      right:'أحسنت. تُولي تطلب اهتمامًا، والإنفاق بسخاء نتيجة لهذا الاهتمام، فالأداة لذلك.',
      wrong:'تُولي تطلب اهتمامًا، فنستبعد إهمالًا وتجاهلًا. والإنفاق نتيجة للاهتمام لا عكسه، فالصحيح اهتمامًا مع لذلك.' } },
  { t:'خطوات الفراغين', items:T5, beats:[
    { say:'خطواتك إذن، ابدأ بالفراغ الأوضح، واستبعد به، ثم اقرأ الجملة كاملة.', show:['a','b','c'], gap:.4 },
    { say:'وانتبه دائمًا للكلمات المتلازمة، فهي تحسم الفراغ بسرعة.', show:['foot'] } ]},
  ],
  quiz:[
    {q:'كان العدّاء ......... في بداية السباق، ......... تمكّن من الفوز في نهايته.', o:['متقدّمًا / لكنه','متأخرًا / لكنه','متأخرًا / لذلك','متعبًا / لأنه'], a:1, e:'الفوز بعد التأخر مفاجأة، فالأداة أداة قلب «لكنه».'},
    {q:'يُولي الأبُ تربيةَ أبنائه ......... بالغًا.', o:['اهتمامًا','تفكيرًا','قرارًا','رأيًا'], a:0, e:'الفعل «يُولي» يلازم «اهتمامًا».'},
    {q:'اتّخذ المدير ......... حاسمًا، ......... انتهت المشكلة سريعًا.', o:['قرارًا / لذلك','رأيًا / لكن','قرارًا / رغم','موقفًا / بينما'], a:0, e:'«اتّخذ قرارًا» متلازمة، وانتهاء المشكلة نتيجة للقرار فالأداة «لذلك».'},
  ] });
})();
/* Explainers: context (الخطأ السياقي) */
(function(){ if(!window.XP||!XP.ready) return;

/* Lays out an Arabic sentence word by word (RTL, centered on x=320).
   Words starting with '*' are underlined with a line item.
   Adds to `items`: highlight boxes <id>g<k> (oksoft) and <id>r<k> (badsoft) behind each underlined word,
   words <id>w<l>_<i>, underlines <id>u<k>. Returns {words:[keys], lines:[keys], pos:[{x,y,w}]} per underlined word. */
function sentence(items,id,lines,{y0=110,lh=66,s=24,gap}={}){
  const G=gap??s*.55, est=w=>Math.max(1,w.replace(/[ً-ْ]/g,'').length)*s*.62;
  const out={words:[],lines:[],pos:[]}, words=[], k={n:0};
  lines.forEach((ln,li)=>{ const y=y0+li*lh; const ws=ln.map(w=>{ const u=w[0]==='*', t=u?w.slice(1):w; return {t,u,w:est(t)}; });
    const W=ws.reduce((a,b)=>a+b.w,0)+G*(ws.length-1); let x=320+W/2;
    ws.forEach((o,i)=>{ const cx=x-o.w/2; x-=o.w+G; words.push({key:`${id}w${li}_${i}`,t:o.t,cx,y});
      if(o.u){ const n=k.n++; const hw=o.w/2+8; out.pos.push({x:cx,y,w:o.w});
        items[`${id}g${n}`]={type:'box',x:cx-hw,y:y-s*1.05,w:hw*2,h:s*1.55,c:'oksoft',stroke:false,rx:8};
        items[`${id}r${n}`]={type:'box',x:cx-hw,y:y-s*1.05,w:hw*2,h:s*1.55,c:'badsoft',stroke:false,rx:8}; } }); });
  words.forEach(w=>{ items[w.key]={type:'text',x:w.cx,y:w.y,s,text:w.t}; out.words.push(w.key); });
  out.pos.forEach((p,n)=>{ const key=`${id}u${n}`; items[key]={type:'line',x1:p.x+p.w*.42,y1:p.y+10,x2:p.x-p.w*.42,y2:p.y+10,cls:'s-pri'}; out.lines.push(key); });
  return out;
}
/* Pre-set a centered transform origin on pop-in items so the engine's scale-in does not leave them offset (see report). */
const POPT=new Set(['note','box','circle','check','cross','poly','pie','dot']);
const fixO=items=>{ for(const k in items){ const it=items[k]; if(POPT.has(it.type)&&!it.rot) it.rot=.01; } return items; };
const mark=(items,key,type,p,dy=40,s=.62)=>{ items[key]={type,x:p.x,y:p.y+dy,s}; };

/* ================= Lesson 1: what a contextual error is ================= */
const A1={}, a1=sentence(A1,'a',[['*بذل','اللاعب','*جهدًا','كبيرًا','في','التدريب،'],['*فتراجع','مستواه','*وتألّق','في','المباراة.']],{y0:115,lh:74});
A1.tag={type:'note',x:320,y:292,w:350,h:62,c:'n1',text:'خطأ في المعنى، لا في النحو',size:23,rot:-1};

const A2={}, a2=sentence(A2,'b',[['*بذل','اللاعب','*جهدًا','كبيرًا','في','التدريب،'],['*فتراجع','مستواه','*وتألّق','في','المباراة.']],{y0:115,lh:74});
Object.assign(A2,{ idea:{type:'note',x:430,y:290,w:190,h:62,c:'n3',text:'الفكرة: اجتهاد',size:22,rot:-1.5},
  ar:{type:'arrow',x1:318,y1:280,x2:236,y2:280,cls:'s-pink',bend:-26},
  idea2:{type:'note',x:170,y:290,w:120,h:62,c:'n3',text:'تألّق',size:24,rot:1.5} });

const A3={}, a3=sentence(A3,'c',[['*بذل','اللاعب','*جهدًا','كبيرًا','في','التدريب،'],['*فتراجع','مستواه','*وتألّق','في','المباراة.']],{y0:100,lh:92});
a3.pos.forEach((p,i)=>mark(A3,'m'+i,i===2?'cross':'check',p,42));
A3.fix={type:'note',x:320,y:318,w:230,h:54,c:'n0',text:'تراجع ← تحسّن',size:24,rot:-1.5};

const A4={}, a4=sentence(A4,'d',[['*يذوب','الثلج','عند','*انخفاض','درجة','الحرارة'],['*فيتحوّل','إلى','*ماء.']],{y0:74,lh:52,s:22});
A4.ans={type:'note',x:320,y:230,w:250,h:64,c:'n0',text:'انخفاض ← ارتفاع',size:25,rot:-1.5};

const A5={ s1:{type:'note',x:510,y:170,w:160,h:90,c:'n0',text:'١ الفكرة',size:26,rot:-2},
  s2:{type:'note',x:320,y:170,w:160,h:90,c:'n1',text:'٢ المرتكزان',size:24,rot:1.5},
  s3:{type:'note',x:130,y:170,w:160,h:90,c:'n3',text:'٣ اختبر كلًّا',size:24,rot:-1.5},
  foot:{type:'text',x:320,y:292,s:26,hand:true,text:'ضع العكس: إن استقام المعنى فهي الخطأ'} };

[A1,A2,A3,A4,A5].forEach(fixO);
XP.add({ key:'cx-what', sk:'context', ord:10, title:'ما الخطأ السياقي؟', min:'٣ دقائق',
  goals:['تعرف أن الخطأ السياقي كلمة واحدة تكسر معنى الجملة','تحدد الفكرة العامة قبل النظر في الكلمات','تختبر كل كلمة تحتها خط على الفكرة','تتأكد من الخطأ بوضع عكسه'],
  scenes:[
  { t:'كلمة تكسر المعنى', items:A1, beats:[
    { say:'في سؤال الخطأ السياقي تأتيك جملة سليمة في لغتها، وتحت أربع كلمات منها خط.', show:a1.words, gap:.08 },
    { say:'كلمة واحدة فقط من هذه الأربع تكسر معنى الجملة، وهي المطلوبة.', show:a1.lines, gap:.3 },
    { say:'فالخطأ هنا ليس في النحو ولا في الإملاء، بل في المعنى.', show:['tag'] } ]},
  { t:'ابدأ بالفكرة العامة', items:A2, beats:[
    { say:'لا تبدأ بالكلمات واحدةً واحدة. اقرأ الجملة كاملة واسأل، ما فكرتها؟', show:a2.words, gap:.05 },
    { say:'لاعبٌ بذل جهدًا كبيرًا في التدريب، ثم تألّق في المباراة. هذه هي الفكرة.', show:['bg1','bg3','idea','ar','idea2'] },
    { say:'الجهد والتألق هما مرتكزا المعنى، وكلاهما في اتجاه واحد.', show:a2.lines, hl:['idea','idea2'] } ]},
  { t:'اختبر كل كلمة', items:A3, beats:[
    { say:'الآن اختبر كل كلمة تحتها خط على الفكرة. بذل، تنسجم. جهدًا، تنسجم.', show:[...a3.words,...a3.lines,'cg0','cg1','m0','m1'], gap:.03 },
    { say:'فتراجع مستواه؟ من اجتهد لا يتراجع ثم يتألق. هذه الكلمة تناقض الفكرة.', show:['cr2','m2'] },
    { say:'وتألّق تنسجم. ضع عكس الكلمة المشتبه بها، تحسّن مستواه، فيستقيم المعنى.', show:['cg3','m3','fix'] } ]},
  { t:'دورك: الثلج', items:A4, beats:[
    { say:'دورك. اقرأ الجملة وحدد فكرتها أولًا، ثم اختبر الكلمات الأربع.', show:[...a4.words,...a4.lines], gap:.06 },
    { say:'يذوب الثلج عند انخفاض درجة الحرارة فيتحول إلى ماء. أيّ كلمة تكسر المعنى؟', hl:a4.lines } ],
    ask:{ opts:['يذوب','انخفاض','فيتحوّل','ماء'], a:1, show:['ans'],
      right:'أحسنت. الثلج يذوب عند ارتفاع الحرارة لا انخفاضها، فالخطأ انخفاض وصوابها ارتفاع.',
      wrong:'انتبه للحقيقة العلمية. الثلج يذوب عند ارتفاع الحرارة، فالكلمة التي تكسر المعنى هي انخفاض.' } },
  { t:'خطواتك', items:A5, beats:[
    { say:'خطواتك إذن، حدد الفكرة، ثم المرتكزين، ثم اختبر كل كلمة.', show:['s1','s2','s3'], gap:.45 },
    { say:'وإذا شككت في كلمة، ضع عكسها. إن استقام المعنى فقد وجدت الخطأ.', show:['foot'] } ]},
  ],
  quiz:[
    {q:'حدّد الخطأ السياقي: «اشتدّ العطش بالمسافر فشرب الماء حتى جاع.»', o:['اشتدّ','العطش','فشرب','جاع'], a:3, e:'من يشرب الماء يرتوي لا يجوع؛ الصواب «ارتوى».'},
    {q:'حدّد الخطأ السياقي: «تشرق الشمس من الغرب كل صباح فتملأ الأرض نورًا.»', o:['تشرق','الغرب','صباح','نورًا'], a:1, e:'الشمس تشرق من الشرق؛ الكلمة التي تكسر المعنى «الغرب».'},
    {q:'ما أول خطوة في حل سؤال الخطأ السياقي؟', o:['اختيار أصعب كلمة','تحديد الفكرة العامة للجملة','قراءة الخيارات فقط','البحث عن خطأ نحوي'], a:1, e:'الفكرة العامة هي المقياس الذي تختبر عليه كل كلمة تحتها خط.'},
  ] });

/* ================= Lesson 2: strategies and traps ================= */
const B1={}, b1=sentence(B1,'a',[['القائد','*الحكيم','يتّخذ','قراراته','*بتهوّر'],['بعد','*دراسة','*متأنّية.']],{y0:105,lh:70});
Object.assign(B1,{ x:{type:'cross',x:b1.pos[1].x,y:b1.pos[1].y+42,s:.62},
  fix:{type:'note',x:320,y:292,w:240,h:62,c:'n0',text:'بتهوّر ← بتروٍّ',size:26,rot:-1.5} });

const B2={}, b2=sentence(B2,'b',[['استيقظ','*مبكرًا','*فأدرك','الحافلة،'],['*لكنه','وصل','إلى','المدرسة','*قبل','الجميع.']],{y0:95,lh:62});
Object.assign(B2,{ c1:{type:'box',x:390,y:215,w:200,h:52,c:'surface2',text:'استيقظ مبكرًا',s:21},
  ar:{type:'arrow',x1:385,y1:230,x2:262,y2:230,cls:'s-pink',bend:-30,text:'نتيجة'},
  c2:{type:'box',x:52,y:215,w:200,h:52,c:'surface2',text:'وصل قبل الجميع',s:21},
  x:{type:'cross',x:b2.pos[2].x,y:b2.pos[2].y+40,s:.6},
  fix:{type:'note',x:320,y:316,w:230,h:50,c:'n0',text:'لكنه ← لذلك',size:24,rot:-1.5} });

const B3={}, b3=sentence(B3,'c',[['كان','العالِم','*دؤوبًا','في','بحثه،','فقضى'],['*سنواتٍ','*يتجاهل','تجاربه','حتى','بلغ','*الاكتشاف.']],{y0:96,lh:92});
Object.assign(B3,{ ok:{type:'check',x:b3.pos[0].x,y:b3.pos[0].y+40,s:.6}, x:{type:'cross',x:b3.pos[2].x,y:b3.pos[2].y+40,s:.6},
  n1:{type:'note',x:470,y:290,w:210,h:58,c:'n3',text:'دؤوب = مثابر',size:24,rot:-1.5},
  n2:{type:'note',x:180,y:290,w:220,h:58,c:'n1',text:'يتجاهل ← يكرّر',size:24,rot:1.5} });

const B4={}, b4=sentence(B4,'d',[['كان','الطقس','*باردًا،','*فارتدى','الأطفال'],['ملابس','*خفيفة','قبل','*الخروج.']],{y0:74,lh:52,s:22});
B4.ans={type:'note',x:320,y:230,w:230,h:64,c:'n0',text:'خفيفة ← ثقيلة',size:26,rot:-1.5};

const B5={ r1:{type:'note',x:510,y:160,w:160,h:90,c:'n0',text:'العكس',size:30,rot:-1.5},
  r2:{type:'note',x:320,y:160,w:160,h:90,c:'n3',text:'الرابط',size:30,rot:1.5},
  r3:{type:'note',x:130,y:160,w:160,h:90,c:'n1',text:'الصعوبة',size:30,rot:-1.5},
  k1:{type:'text',x:510,y:245,s:22,hand:true,text:'جرّبه'}, k2:{type:'text',x:320,y:245,s:22,hand:true,text:'افحصه'}, k3:{type:'text',x:130,y:245,s:22,hand:true,text:'لا تحكم بها'},
  foot:{type:'text',x:320,y:312,s:24,text:'الخطأ يصطدم بالفكرة، لا بمستوى الكلمة'} };

[B1,B2,B3,B4,B5].forEach(fixO);
XP.add({ key:'cx-traps', sk:'context', ord:20, title:'الخطأ السياقي: استراتيجيات وفخاخ', min:'٤ دقائق',
  goals:['تكشف الخطأ بتجربة عكس الكلمة','تفحص العلاقة بين شطري الجملة: سبب أم تضاد','لا تحكم على الكلمة بصعوبتها','تطبق الخطوات على سؤال كامل'],
  scenes:[
  { t:'الخطأ عكس الصواب', items:B1, beats:[
    { say:'في أكثر الأسئلة، الكلمة الخاطئة هي عكس الكلمة الصحيحة تمامًا.', show:[...b1.words,...b1.lines], gap:.05 },
    { say:'القائد الحكيم يتخذ قراراته بتهوّر؟ الحكمة والتهوّر لا يجتمعان.', show:['ar1','x'] },
    { say:'ضع العكس، بتروٍّ، فيستقيم المعنى. إذن وجدت الخطأ.', show:['ag0','ag2','ag3','fix'] } ]},
  { t:'افحص أداة الربط', items:B2, beats:[
    { say:'انظر إلى العلاقة بين شطري الجملة. هل الثاني نتيجة للأول، أم عكسه؟', show:[...b2.words,...b2.lines], gap:.05 },
    { say:'من استيقظ مبكرًا وأدرك الحافلة يصل قبل الجميع. هذه نتيجة طبيعية.', show:['c1','ar','c2'] },
    { say:'فأداة الاستدراك لكنه لا تناسب هنا، والصواب لذلك.', show:['br2','x','fix'] } ]},
  { t:'لا تحكم بالصعوبة', items:B3, beats:[
    { say:'الكلمة الصعبة ليست بالضرورة الخطأ، وقد توضع لتشتيتك.', show:[...b3.words,...b3.lines], gap:.05 },
    { say:'دؤوبًا تعني مثابرًا، وهي تنسجم مع سنوات البحث الطويلة.', show:['cg0','ok','n1'] },
    { say:'أما يتجاهل فسهلة لكنها تكسر المعنى. الدؤوب يكرّر تجاربه ولا يتجاهلها.', show:['cr2','x','n2'] } ]},
  { t:'دورك: الطقس البارد', items:B4, beats:[
    { say:'دورك. حدد الفكرة، ثم افحص الرابط بين الشطرين، ثم جرّب العكس.', show:[...b4.words,...b4.lines], gap:.06 },
    { say:'كان الطقس باردًا فارتدى الأطفال ملابس خفيفة قبل الخروج. أين الخطأ؟', hl:b4.lines } ],
    ask:{ opts:['باردًا','فارتدى','خفيفة','الخروج'], a:2, show:['ans'],
      right:'أحسنت. الفاء تربط سببًا بنتيجة، والبرد يدفع إلى ملابس ثقيلة لا خفيفة.',
      wrong:'انظر إلى الفاء، فهي تربط سببًا بنتيجة. البرد يدفع إلى ملابس ثقيلة، فالخطأ هو خفيفة.' } },
  { t:'ثلاث قواعد', items:B5, beats:[
    { say:'تذكّر ثلاث قواعد، جرّب العكس، وافحص الرابط بين الشطرين، ولا تخدعك صعوبة الكلمة.', show:['r1','k1','r2','k2','r3','k3'], gap:.3 },
    { say:'فالخطأ السياقي يصطدم بفكرة الجملة، لا بمستوى الكلمة.', show:['foot'] } ]},
  ],
  quiz:[
    {q:'حدّد الخطأ السياقي: «ذاكر محمد بجدّ، لكنه نجح بتفوّق في الاختبار.»', o:['ذاكر','بجدّ','لكنه','بتفوّق'], a:2, e:'النجاح نتيجة للمذاكرة، فالمناسب «لذلك» لا أداة الاستدراك «لكنه».'},
    {q:'حدّد الخطأ السياقي: «اتّسم الخطيب بالفصاحة، فكانت عباراته ركيكة يفهمها الجميع.»', o:['اتّسم','الفصاحة','ركيكة','يفهمها'], a:2, e:'الركاكة عكس الفصاحة؛ الصواب «بليغة» أو «واضحة».'},
    {q:'في جملة الخطأ السياقي، الكلمة الأصعب والأقل شيوعًا:', o:['هي الخطأ دائمًا','ليست بالضرورة الخطأ','تكون أداة ربط','تأتي أول الجملة'], a:1, e:'الحكم يكون على انسجام الكلمة مع الفكرة، لا على صعوبتها.'},
  ] });
})();
/* Explainers: geometry */
(function(){ if(!window.XP||!XP.ready) return;
/* ---- small geometry helpers (angles in visual degrees, counter-clockwise, 0 = pointing right) ---- */
const R1=v=>Math.round(v*10)/10;
const P=(c,r,a)=>[R1(c[0]+r*Math.cos(a*Math.PI/180)),R1(c[1]-r*Math.sin(a*Math.PI/180))];
const arcD=(c,r,a0,a1)=>{ const p=P(c,r,a0), q=P(c,r,a1); return `M${p[0]} ${p[1]} A${r} ${r} 0 ${a1-a0>180?1:0} 0 ${q[0]} ${q[1]}`; };
const ang=(c,r,a0,a1,cls='s-pri')=>({type:'path',d:arcD(c,r,a0,a1),cls});
const lab=(c,r,a,text,cls='t-ink',s=20)=>{ const p=P(c,r,a); return {type:'eq',x:p[0],y:R1(p[1]+s*0.36),s,text,cls}; };
const seg=(p,q,cls='s-ink')=>({type:'line',x1:p[0],y1:p[1],x2:q[0],y2:q[1],cls});
const pts=a=>a.map(p=>p.join(',')).join(' ');
const rmark=(c,a0,k=14)=>{ const u=P(c,k,a0), w=P(c,k,a0+90), m=[R1(u[0]+w[0]-c[0]),R1(u[1]+w[1]-c[1])]; return {type:'path',d:`M${u[0]} ${u[1]} L${m[0]} ${m[1]} L${w[0]} ${w[1]}`,cls:'s-ink'}; };
const tick=(p,q)=>{ const mx=(p[0]+q[0])/2, my=(p[1]+q[1])/2, L=Math.hypot(q[0]-p[0],q[1]-p[1]), nx=-(q[1]-p[1])/L*9, ny=(q[0]-p[0])/L*9;
  return {type:'path',d:`M${R1(mx-nx)} ${R1(my-ny)} L${R1(mx+nx)} ${R1(my+ny)}`,cls:'s-pri'}; };
/* apex of a triangle on base b-c with base angles ab (at b) and ac (at c) */
const apex=(b,c,ab,ac)=>{ const w=c[0]-b[0], tb=Math.tan(ab*Math.PI/180), tc=Math.tan(ac*Math.PI/180), x=w*tc/(tb+tc); return [R1(b[0]+x),R1(b[1]-x*tb)]; };
/* POP items (poly, circle, dot, box) get their transform origin set at draw time via rot:360 (a no-op rotation);
   otherwise the engine's scale-in sets transformOrigin mid-tween and GSAP's smoothOrigin leaves them shifted. */
const POPT=new Set(['poly','circle','dot','box']);
/* Labels are laid out right-to-left like the rest of the page (Arabic math reads RTL). A number with ° is isolated
   so the degree sign always sits to its right; 'eq' items become plain RTL text for the same reason. */
const DEG=t=>String(t).replace(/([٠-٩٫]+°)/g,'\u2066$1\u2069');
const add=L=>{ L.scenes.forEach(sc=>{ for(const k in (sc.items||{})){ const it=sc.items[k];
    if(POPT.has(it.type)&&!it.rot) it.rot=360;
    if(it.type==='eq') it.type='text';
    if(it.type==='box') it.ltr=false;
    if(it.text!=null) it.text=DEG(it.text);
    if(it.labels) it.labels.forEach(l=>{ l[2]=DEG(l[2]); }); } }); XP.add(L); };
const circD=(c,r)=>`M${c[0]+r} ${c[1]} A${r} ${r} 0 1 0 ${c[0]-r} ${c[1]} A${r} ${r} 0 1 0 ${c[0]+r} ${c[1]}`;

/* =================== 1. Angles =================== */
{
const O=[220,230], O2=[220,210];
const X=[220,205];
const T1=[250,130], T2=[R1(250-100/Math.tan(Math.PI/3)),230];
const Q1=[340,100], Q2=[R1(340-65/Math.tan(Math.PI/3)),165];
add({ key:'ge-angles', sk:'geometry', ord:10, title:'الزوايا والمستقيمات المتوازية', min:'٣ دقائق',
  goals:['تعرف أن الزاوية المستقيمة ١٨٠° والدورة الكاملة ٣٦٠°','تستخدم تساوي الزاويتين المتقابلتين بالرأس','تميّز الزوايا المتناظرة والمتبادلة عند التوازي','تحسب زاوية مجهولة في شكل من أشكال القدرات'],
  scenes:[
  { t:'المستقيم والدورة الكاملة', items:{
      ln:seg([70,230],[370,230]), o:{type:'dot',x:O[0],y:O[1],r:5,c:'ink'},
      a180:ang(O,45,0,180,'s-pri'), l180:lab(O,72,90,'١٨٠°','t-pri',22),
      ray:seg(O,P(O,150,50)),
      a50:ang(O,40,0,50,'s-pink'), l50:lab(O,68,22,'؟','t-hand',24),
      a130:ang(O,30,50,180,'s-ok'), l130:lab(O,58,118,'١٣٠°','t-ok'),
      eq1:{type:'eq',x:220,y:292,s:26,text:'١٨٠ − ١٣٠ = ٥٠',cls:'t-ink'},
      n1:{type:'note',x:505,y:135,h:62,c:'n0',w:230,text:'مستقيمة = ١٨٠°',size:22,rot:-3},
      r1:seg(O2,P(O2,115,90)), r2:seg(O2,P(O2,115,200)), r3:seg(O2,P(O2,115,320)), o2:{type:'dot',x:O2[0],y:O2[1],r:5,c:'ink'},
      b1:ang(O2,30,90,200,'s-pink'), b2:ang(O2,30,200,320,'s-ok'), b3:ang(O2,30,320,450,'s-pri'),
      k1:lab(O2,60,145,'١١٠°','t-ink'), k2:lab(O2,60,260,'١٢٠°','t-ink'), k3:lab(O2,62,25,'١٣٠°','t-ink'),
      n2:{type:'note',x:505,y:255,w:236,h:62,c:'n3',text:'دورة كاملة = ٣٦٠°',size:22,rot:2} },
    beats:[
      { say:'الزاوية المستقيمة هي نصف دورة، وقياسها مئة وثمانون درجة.', show:['ln','o','a180','l180','n1'] },
      { say:'إذا قسمها شعاع إلى زاويتين، فمجموعهما مئة وثمانون دائمًا.', hide:['a180','l180'], show:['ray','a130','l130','a50','l50'] },
      { say:'فإذا كانت إحداهما مئة وثلاثين، فالأخرى مئة وثمانون ناقص مئة وثلاثين، أي خمسون.', set:{l50:DEG('٥٠°')}, show:['eq1'] },
      { say:'أما الدورة الكاملة حول نقطة فقياسها ثلاثمئة وستون درجة، فمجموع الزوايا حول أي نقطة ثلاثمئة وستون.', hide:['ln','o','ray','a50','l50','a130','l130','eq1'], show:['r1','r2','r3','o2','b1','k1','b2','k2','b3','k3','n2'], gap:.12 },
    ]},
  { t:'المتقابلتان بالرأس', items:{
      m1:seg(P(X,150,30),P(X,150,210)), m2:seg(P(X,150,150),P(X,150,330)),
      aR:ang(X,36,-30,30,'s-pink'), aL:ang(X,36,150,210,'s-pink'), aT:ang(X,28,30,150,'s-ok'), aB:ang(X,28,210,330,'s-ok'),
      lR:lab(X,66,0,'٦٠°','t-ink'), lL:lab(X,66,180,'٦٠°','t-ink'), lT:lab(X,52,90,'١٢٠°','t-ink'), lB:lab(X,52,270,'١٢٠°','t-ink'),
      n1:{type:'note',x:505,y:140,w:240,h:62,c:'n1',text:'المتقابلتان متساويتان',size:19,rot:-2},
      n2:{type:'note',x:505,y:255,w:240,h:62,c:'n0',text:'المتجاورتان = ١٨٠°',size:19,rot:2} },
    beats:[
      { say:'عندما يتقاطع مستقيمان تتكوّن أربع زوايا حول نقطة التقاطع.', show:['m1','m2'] },
      { say:'كل زاويتين متقابلتين بالرأس متساويتان. فإذا كانت هذه ستين، فالمقابلة لها ستون أيضًا.', show:['aR','lR','aL','lL','n1'] },
      { say:'والزاويتان المتجاورتان على مستقيم واحد، فمجموعهما مئة وثمانون، وكل واحدة من الأخريين مئة وعشرون.', show:['aT','lT','aB','lB','n2'] },
    ]},
  { t:'متوازيان وقاطع', items:{
      p1:seg([50,T1[1]],[370,T1[1]]), p2:seg([50,T2[1]],[370,T2[1]]), tr:seg(P(T1,55,60),P(T2,55,240)),
      F:{type:'path',d:`M${P(T1,55,60).join(' ')} L${T2.join(' ')} L${T2[0]+90} ${T2[1]} M${T1.join(' ')} L${T1[0]+90} ${T1[1]}`,cls:'s-pri'},
      Z:{type:'path',d:`M${T1[0]-90} ${T1[1]} L${T1.join(' ')} L${T2.join(' ')} L${T2[0]+90} ${T2[1]}`,cls:'s-pri'},
      c1:ang(T1,26,0,60,'s-pink'), lc1:lab(T1,50,30,'٦٠°','t-ink'),
      c2:ang(T2,26,0,60,'s-pink'), lc2:lab(T2,50,30,'٦٠°','t-ink'),
      al:ang(T1,26,180,240,'s-ok'), lal:lab(T1,50,210,'٦٠°','t-ink'),
      n1:{type:'note',x:508,y:140,w:230,h:60,c:'n1',text:'متناظرتان: متساويتان',size:19,rot:-2},
      n2:{type:'note',x:508,y:235,w:230,h:60,c:'n3',text:'متبادلتان: متساويتان',size:19,rot:2},
      warn:{type:'text',x:225,y:318,s:22,text:'بشرط أن يكون المستقيمان متوازيين',hand:true} },
    beats:[
      { say:'المستقيمان المُتوازيان لا يلتقيان أبدًا. والقاطع مستقيم يقطعهما معًا.', show:['p1','p2','tr'] },
      { say:'الزاويتان المتناظرتان تقعان في الموقع نفسه عند التقاطعين، وهما متساويتان.', show:['F','c1','lc1','c2','lc2','n1'] },
      { say:'والزاويتان المتبادلتان داخليًا تقعان بين المستقيمين على جانبين مختلفين من القاطع، وهما متساويتان أيضًا.', hide:['F','c1','lc1'], show:['Z','al','lal','n2'], hl:['c2'] },
      { say:'انتبه: هذه القاعدة تصح فقط إذا كان المستقيمان متوازيين.', show:['warn'] },
    ]},
  { t:'دورك: أوجد سين', items:{
      p1:seg([150,Q1[1]],[520,Q1[1]]), p2:seg([150,Q2[1]],[520,Q2[1]]), tr:seg(P(Q1,32,60),P(Q2,32,240)),
      a60:ang(Q1,22,0,60,'s-pink'), l60:lab(Q1,52,18,'٦٠°','t-ink'),
      as:ang(Q2,22,240,360,'s-ok'), ls:lab(Q2,40,300,'س','t-ok',22),
      c2:ang(Q2,22,0,60,'s-pink'), lc2:lab(Q2,52,18,'٦٠°','t-pink'),
      eq:{type:'eq',x:320,y:290,s:30,text:'١٨٠ − ٦٠ = ١٢٠°',cls:'t-pri'} },
    beats:[
      { say:'مستقيمان مُتوازيان يقطعهما قاطع، والزاوية عند التقاطع الأعلى ستون درجة.', show:['p1','p2','tr','a60','l60'] },
      { say:'ما قياس الزاوية سين عند التقاطع الأسفل؟', show:['as','ls'] },
    ],
    ask:{ opts:['٦٠°','١٢٠°','٣٠°','٢٤٠°'], a:1, y:246, ltr:true,
      right:'صحيح. عند التقاطع الأسفل زاوية مناظرة قياسها ستون، وهي مع سين على مستقيم واحد، فسين مئة وعشرون.',
      wrong:'الجواب مئة وعشرون. الزاوية المناظرة للستين تقع بجوار سين على مستقيم واحد، فسين مئة وثمانون ناقص ستين.',
      show:['c2','lc2','eq'] } },
  ],
  quiz:[
    {q:'زاويتان متجاورتان على مستقيم، إحداهما ١١٠°. ما قياس الأخرى؟', o:['٧٠°','١١٠°','٨٠°','٢٥٠°'], a:0, e:'مجموعهما ١٨٠°، إذن ١٨٠ − ١١٠ = ٧٠°.'},
    {q:'تقاطع مستقيمان فكانت إحدى الزوايا ٤٥°. ما قياس الزاوية المقابلة لها بالرأس؟', o:['١٣٥°','٤٥°','٩٠°','٣١٥°'], a:1, e:'المتقابلتان بالرأس متساويتان، أما ١٣٥° فهي المجاورة.'},
    {q:'ثلاث زوايا حول نقطة: ١٢٠° و ١٥٠° و س. ما قيمة س؟', o:['٦٠°','١٠٠°','٩٠°','٢١٠°'], a:2, e:'مجموع الزوايا حول نقطة ٣٦٠°، إذن س = ٣٦٠ − ٢٧٠ = ٩٠°.'},
  ] });
}

/* =================== 2. Triangles =================== */
{
const B=[60,275], C=[330,275], A=apex(B,C,60,50);
const I1=[80,280], I2=[250,280], IA=apex(I1,I2,65,65);
const E1=[360,280], E2=[560,280], EA=apex(E1,E2,60,60);
const S1=[268,200], S2=[372,200], SA=apex(S1,S2,70,70);
const letters=[[A[0],A[1]-12,'أ',22],[B[0]-12,B[1]+24,'ب',22],[C[0]+12,C[1]+24,'ج',22]];
add({ key:'ge-triangles', sk:'geometry', ord:20, title:'المثلث وزواياه', min:'٣ دقائق',
  goals:['تعرف لماذا مجموع زوايا المثلث ١٨٠°','تحسب الزاوية الخارجية من الداخليتين البعيدتين','تستخدم خواص المثلث المتساوي الساقين والمتساوي الأضلاع'],
  scenes:[
  { t:'مجموع زوايا المثلث', items:{
      tri:{type:'poly',points:pts([A,B,C]),c:'prisoft',labels:letters},
      aB:ang(B,34,0,60,'s-pink'), lB:lab(B,60,28,'٦٠°'),
      aC:ang(C,34,130,180,'s-ok'), lC:lab(C,60,156,'٥٠°'),
      aA:ang(A,30,240,310,'s-pri'), lA:lab(A,58,275,'٧٠°'),
      par:seg([A[0]-110,A[1]],[A[0]+110,A[1]]),
      cL:ang(A,30,180,240,'s-pink'), lcL:lab(A,54,208,'٦٠°'),
      cR:ang(A,30,310,360,'s-ok'), lcR:lab(A,54,332,'٥٠°'),
      n1:{type:'note',x:510,y:135,w:200,h:62,c:'n0',text:'المجموع = ١٨٠°',size:24,rot:-3},
      bx:{type:'box',x:392,y:215,w:236,h:56,c:'surface',text:'٦٠ + ٧٠ + ٥٠ = ١٨٠',s:22,ltr:true} },
    beats:[
      { say:'هذا المثلث ألف باء جيم، وله ثلاث زوايا.', show:['tri'] },
      { say:'زاوية باء ستون، وزاوية جيم خمسون، وزاوية ألف سبعون.', show:['aB','lB','aC','lC','aA','lA'], gap:.3 },
      { say:'ارسم من ألف مستقيمًا يوازي القاعدة، فتظهر عنده زاويتان تساويان زاويتي القاعدة، لأنهما متبادلتان.', show:['par','cL','lcL','cR','lcR'] },
      { say:'والزوايا الثلاث عند ألف تكوّن زاوية مستقيمة. إذن مجموع زوايا أي مثلث مئة وثمانون درجة.', show:['n1','bx'], hl:['aA'] },
    ]},
  { t:'الزاوية الخارجية', items:{
      tri:{type:'poly',points:pts([A,B,C]),c:'prisoft',labels:letters},
      aB:ang(B,34,0,60,'s-pink'), lB:lab(B,60,28,'٦٠°'),
      aA:ang(A,30,240,310,'s-pri'), lA:lab(A,58,275,'٧٠°'),
      ext:seg(C,[420,C[1]]),
      aX:ang(C,26,0,130,'s-pink'), lX:lab(C,52,62,'؟','t-pink',24),
      aC:ang(C,40,130,180,'s-ok'), lC:lab(C,64,156,'٥٠°','t-ok'),
      bx:{type:'box',x:415,y:100,w:195,h:56,c:'surface',text:'٦٠ + ٧٠ = ١٣٠',s:22,ltr:true},
      n1:{type:'note',x:510,y:205,w:236,h:66,c:'n1',text:'الخارجية = البعيدتان',size:19,rot:2} },
    beats:[
      { say:'في المثلث نفسه، الزاوية عند باء ستون، والزاوية عند ألف سبعون.', show:['tri','aB','lB','aA','lA'] },
      { say:'مُدّ القاعدة بعد جيم، فتتكوّن زاوية خارجية. كم قياسها؟', show:['ext','aX','lX'] },
      { say:'الزاوية الخارجية تساوي مجموع الزاويتين الداخليتين البعيدتين عنها: ستون زائد سبعين يساوي مئة وثلاثين.', set:{lX:DEG('١٣٠°')}, show:['bx','n1'] },
      { say:'وتحقّق بنفسك: هي مع الزاوية المجاورة لها، الخمسين، تكمل مئة وثمانين.', show:['aC','lC'] },
    ]},
  { t:'متساوي الساقين والأضلاع', items:{
      iso:{type:'poly',points:pts([IA,I1,I2]),c:'pinksoft'}, t1:tick(I1,IA), t2:tick(I2,IA),
      i1:ang(I1,28,0,65,'s-pink'), li1:lab(I1,52,30,'٦٥°'), i2:ang(I2,28,115,180,'s-pink'), li2:lab(I2,52,150,'٦٥°'),
      i3:ang(IA,26,245,295,'s-pri'), li3:lab(IA,50,270,'٥٠°','t-pri'),
      cap1:{type:'text',x:165,y:322,s:20,text:'متساوي الساقين',cls:'t-ink2'},
      equ:{type:'poly',points:pts([EA,E1,E2]),c:'oksoft'}, u1:tick(E1,EA), u2:tick(E2,EA), u3:tick(E1,E2),
      e1:lab(E1,42,30,'٦٠°'), e2:lab(E2,42,150,'٦٠°'), e3:lab(EA,44,270,'٦٠°'),
      cap2:{type:'text',x:460,y:322,s:20,text:'متساوي الأضلاع',cls:'t-ink2'} },
    beats:[
      { say:'المثلث المتساوي الساقين له ضلعان متساويان، نعلّمهما بشرطتين.', show:['iso','t1','t2','cap1'] },
      { say:'والزاويتان عند قاعدته متساويتان. فإذا كانت إحداهما خمسًا وستين، فالأخرى مثلها.', show:['i1','li1','i2','li2'] },
      { say:'والثالثة مئة وثمانون ناقص مئة وثلاثين، أي خمسون.', show:['i3','li3'] },
      { say:'أما المتساوي الأضلاع فأضلاعه الثلاثة متساوية، وكل زاوية فيه ستون درجة.', show:['equ','u1','u2','u3','e1','e2','e3','cap2'], gap:.2 },
    ]},
  { t:'دورك: زاوية القاعدة', items:{
      tri:{type:'poly',points:pts([SA,S1,S2]),c:'pinksoft'}, t1:tick(S1,SA), t2:tick(S2,SA),
      aA:ang(SA,24,250,290,'s-pri'), lA:lab(SA,46,270,'٤٠°','t-pri',20),
      b1:ang(S1,22,0,70,'s-pink'), lb:lab(S1,42,35,'س','t-pink',22), b2:ang(S2,22,110,180,'s-pink'),
      cap:{type:'text',x:140,y:136,s:24,text:'متساوي الساقين',hand:true},
      eq:{type:'eq',x:320,y:290,s:30,text:'(١٨٠ − ٤٠) ÷ ٢ = ٧٠°',cls:'t-pri'} },
    beats:[
      { say:'مثلث متساوي الساقين، وزاوية رأسه أربعون درجة.', show:['tri','t1','t2','aA','lA','cap'] },
      { say:'ما قياس كل زاوية من زاويتي القاعدة، سين؟', show:['b1','b2','lb'] },
    ],
    ask:{ opts:['٤٠°','٧٠°','١٤٠°','٥٠°'], a:1, y:246, ltr:true,
      right:'أحسنت. الباقي مئة وأربعون، نقسمه على زاويتين متساويتين، فتكون كل واحدة سبعين.',
      wrong:'الجواب سبعون. نطرح أربعين من مئة وثمانين فيبقى مئة وأربعون، ثم نقسمه بالتساوي على زاويتي القاعدة.',
      show:['eq'] } },
  ],
  quiz:[
    {q:'زاويتان في مثلث قياسهما ٤٥° و ٧٥°. ما قياس الثالثة؟', o:['٦٠°','٥٠°','٧٠°','١٢٠°'], a:0, e:'١٨٠ − (٤٥ + ٧٥) = ٦٠°.'},
    {q:'زاوية خارجية لمثلث قياسها ١١٠°، وإحدى الداخليتين البعيدتين ٤٠°. ما قياس الأخرى؟', o:['٣٠°','٧٠°','١٥٠°','٥٠°'], a:1, e:'الخارجية = مجموع البعيدتين، إذن ١١٠ − ٤٠ = ٧٠°.'},
    {q:'مثلث متساوي الأضلاع. القيمة الأولى: قياس إحدى زواياه. القيمة الثانية: ٦٠°', o:['القيمة الأولى أكبر','القيمة الثانية أكبر','القيمتان متساويتان','المعطيات غير كافية'], a:2, e:'كل زاوية في المثلث المتساوي الأضلاع = ١٨٠ ÷ ٣ = ٦٠°.'},
  ] });
}

/* =================== 3. Perimeter and area =================== */
{
const rect=[[90,100],[330,100],[330,260],[90,260]];
const L=[[300,70],[400,70],[400,190],[240,190],[240,130],[300,130]];
add({ key:'ge-area', sk:'geometry', ord:30, title:'المحيط والمساحة', min:'٤ دقائق',
  goals:['تفرّق بين المحيط والمساحة','تحسب مساحة المستطيل والمربع','تحسب مساحة المثلث بنصف القاعدة في الارتفاع','تقسم الشكل المركّب إلى أشكال بسيطة'],
  scenes:[
  { t:'المحيط: طول السور', items:{
      r:{type:'poly',points:pts(rect),c:'prisoft'},
      lt:{type:'text',x:210,y:88,s:22,text:'٦ سم'}, lb:{type:'text',x:210,y:290,s:22,text:'٦ سم'},
      ll:{type:'text',x:58,y:188,s:22,text:'٤ سم'}, lr:{type:'text',x:362,y:188,s:22,text:'٤ سم'},
      trace:{type:'path',d:'M90 100 H330 V260 H90 Z',cls:'s-pink'},
      eq1:{type:'eq',x:510,y:150,s:24,text:'٦ + ٤ + ٦ + ٤ = ٢٠',cls:'t-pink'},
      n1:{type:'note',x:505,y:250,w:250,h:66,c:'n0',text:'٢ × (الطول + العرض)',size:20,rot:-2} },
    beats:[
      { say:'المحيط هو طول الحدود حول الشكل، كأنك تمشي على السور دورة كاملة.', show:['r','lt','lr','lb','ll'], gap:.25 },
      { say:'في هذا المستطيل نجمع الأضلاع الأربعة: ستة زائد أربعة زائد ستة زائد أربعة يساوي عشرين سنتيمترًا.', show:['trace','eq1'] },
      { say:'وباختصار: محيط المستطيل ضعف مجموع الطول والعرض.', show:['n1'] },
    ]},
  { t:'المساحة: كم مربعًا؟', items:{
      g:{type:'grid',x:90,y:100,rows:4,cols:6,cell:38,gap:2,fill:24,c:'n2'},
      lt:{type:'text',x:209,y:88,s:22,text:'٦ سم'}, ll:{type:'text',x:58,y:188,s:22,text:'٤ سم'},
      eq1:{type:'eq',x:510,y:150,s:26,text:'٦ × ٤ = ٢٤ سم²',cls:'t-pri'},
      sq:{type:'grid',x:460,y:225,rows:5,cols:5,cell:16,gap:2,fill:25,c:'n1'},
      eq2:{type:'eq',x:505,y:345,s:22,text:'٥ × ٥ = ٢٥',cls:'t-ink'},
      n1:{type:'text',x:505,y:212,s:22,text:'المربع',cls:'t-ink2'} },
    beats:[
      { say:'المساحة هي عدد المربعات الصغيرة التي تغطي الشكل من الداخل.', show:['g'] },
      { say:'هنا أربعة صفوف، في كل صف ستة مربعات. فالمساحة ستة في أربعة، أي أربعة وعشرون سنتيمترًا مربعًا.', show:['lt','ll','eq1'] },
      { say:'والمربع طوله يساوي عرضه، فمساحته الضلع في نفسه. مربع ضلعه خمسة مساحته خمسة وعشرون.', show:['sq','n1','eq2'] },
    ]},
  { t:'مساحة المثلث', items:{
      box:{type:'path',d:'M70 110 H286 V254 H70 Z',cls:'s-ink'},
      oL:{type:'poly',points:'70,110 170,110 70,254',c:'surface2'}, oR:{type:'poly',points:'170,110 286,110 286,254',c:'surface2'},
      tri:{type:'poly',points:'70,254 286,254 170,110',c:'pinksoft'},
      h:seg([170,110],[170,254],'s-pri'), rm:{type:'path',d:'M170 242 H182 V254',cls:'s-ink'},
      lbase:{type:'text',x:178,y:284,s:22,text:'القاعدة ٦'},
      hb:seg([300,110],[300,254],'s-pri'), lh:{type:'text',x:362,y:190,s:22,text:'الارتفاع ٤',cls:'t-pri'},
      eq1:{type:'eq',x:515,y:150,s:26,text:'½ × ٦ × ٤ = ١٢',cls:'t-pri'},
      n1:{type:'note',x:510,y:255,w:236,h:66,c:'n0',text:'½ القاعدة × الارتفاع',size:19,rot:-2} },
    beats:[
      { say:'لنجد مساحة المثلث، نرسمه داخل مستطيل له القاعدة نفسها والارتفاع نفسه.', show:['box','tri','lbase'] },
      { say:'ارتفاع المثلث يقسم المستطيل جزأين، والمثلث يأخذ نصف كل جزء بالضبط.', show:['h','rm','oL','oR'] },
      { say:'إذن مساحة المثلث نصف مساحة المستطيل: نصف في ستة في أربعة يساوي اثني عشر.', show:['hb','lh','eq1'] },
      { say:'احفظها: نصف القاعدة في الارتفاع. والارتفاع عمودي على القاعدة دائمًا، وليس الضلع المائل.', show:['n1'], hl:['h'] },
    ]},
  { t:'دورك: شكل مركّب', items:{
      sh:{type:'poly',points:pts(L),c:'prisoft'},
      l5:lab([350,62],0,0,'٥'), l6:lab([416,130],0,0,'٦'), l8:lab([320,203],0,0,'٨'), l3:lab([226,160],0,0,'٣'),
      l3a:lab([270,120],0,0,'٣','t-ink2',18), l3b:lab([288,100],0,0,'٣','t-ink2',18),
      cut:seg([300,130],[400,130],'s-pink'),
      iA:lab([320,160],0,0,'٢٤','t-pri',22), iB:lab([350,100],0,0,'١٥','t-pri',22),
      eq:{type:'eq',x:320,y:290,s:30,text:'٢٤ + ١٥ = ٣٩',cls:'t-pri'} },
    beats:[
      { say:'هذا شكل مركّب، ليس له قانون مباشر.', show:['sh','l5','l6','l8','l3','l3a','l3b'], gap:.15 },
      { say:'الحيلة أن نقسمه بخط إلى مستطيلين، ثم نجمع مساحتيهما. ما مساحة الشكل؟', show:['cut'] },
    ],
    ask:{ opts:['٤٨','٣٩','٢٨','٤٥'], a:1, y:248,
      right:'صحيح. المستطيل السفلي ثمانية في ثلاثة، أربعة وعشرون، والعلوي خمسة في ثلاثة، خمسة عشر، والمجموع تسعة وثلاثون.',
      wrong:'الجواب تسعة وثلاثون: أربعة وعشرون للمستطيل السفلي وخمسة عشر للعلوي. وانتبه، ثمانية وعشرون هي المحيط لا المساحة.',
      show:['iA','iB','eq'] } },
  ],
  quiz:[
    {q:'مستطيل طوله ٩ سم وعرضه ٤ سم. ما مساحته؟', o:['٢٦ سم²','٣٦ سم²','١٣ سم²','٤٥ سم²'], a:1, e:'٩ × ٤ = ٣٦. أما ٢٦ فهو المحيط.'},
    {q:'مثلث قاعدته ١٠ وارتفاعه ٦. ما مساحته؟', o:['٦٠','١٦','٣٠','٣٢'], a:2, e:'½ × ١٠ × ٦ = ٣٠.'},
    {q:'مربع محيطه ٢٠ سم. ما مساحته؟', o:['٢٥ سم²','٢٠ سم²','١٠٠ سم²','٤٠ سم²'], a:0, e:'الضلع ٢٠ ÷ ٤ = ٥، والمساحة ٥ × ٥ = ٢٥.'},
  ] });
}

/* =================== 4. Pythagoras =================== */
{
const C1=[110,270], A1=[110,138], B1=[286,270];
const C=[220,232], A=[220,160], B=[316,232];
const Q=[270,190], QA=[270,118], QB=[366,190];
add({ key:'ge-pyth', sk:'geometry', ord:40, title:'نظرية فيثاغورس', min:'٣ دقائق',
  goals:['تعرف الوتر في المثلث القائم','تفهم نظرية فيثاغورس بالمربعات','تحفظ الثلاثيات ٣-٤-٥ و ٦-٨-١٠ و ٥-١٢-١٣','تجد الضلع المجهول بسرعة'],
  scenes:[
  { t:'المثلث القائم', items:{
      tri:{type:'poly',points:pts([A1,B1,C1]),c:'prisoft'}, rm:rmark(C1,0,16),
      g1:{type:'text',x:84,y:212,s:20,text:'ضلع',cls:'t-ink2'}, g2:{type:'text',x:198,y:296,s:20,text:'ضلع',cls:'t-ink2'},
      hyp:seg(A1,B1,'s-pink'), lh:{type:'text',x:222,y:190,s:24,text:'الوتر',hand:true},
      n1:{type:'note',x:500,y:140,w:200,h:62,c:'n1',text:'الوتر أطول ضلع',size:22,rot:-2},
      n2:{type:'note',x:500,y:250,w:240,h:62,c:'n3',text:'يقابل الزاوية القائمة',size:19,rot:2} },
    beats:[
      { say:'المثلث القائم فيه زاوية قياسها تسعون درجة، ونعلّمها بمربع صغير.', show:['tri','rm'] },
      { say:'الضلعان اللذان يصنعان الزاوية القائمة يسمّيان ضلعي القائمة.', show:['g1','g2'] },
      { say:'والضلع المقابل للزاوية القائمة هو الوتر، وهو أطول الأضلاع دائمًا.', show:['hyp','lh','n1','n2'] },
    ]},
  { t:'القانون بالمربعات', items:{
      q3:{type:'grid',x:148,y:160,rows:3,cols:3,cell:22,gap:2,fill:9,c:'n1'},
      q4:{type:'grid',x:220,y:232,rows:4,cols:4,cell:22,gap:2,fill:16,c:'n3'},
      q5:{type:'grid',x:245,y:89,rows:5,cols:5,cell:22,gap:2,fill:25,c:'n2',rot:36.87},
      tri:{type:'poly',points:pts([A,B,C]),c:'prisoft'}, rm:rmark(C,0,12),
      s3:lab([204,203],0,0,'٣'), s4:lab([268,254],0,0,'٤'), s5:lab([280,182],0,0,'٥'),
      t9:lab([184,196],0,0,'٩','t-note',28), t16:lab([268,282],0,0,'١٦','t-note',28), t25:lab([304,150],0,0,'٢٥','t-note',30),
      bx:{type:'box',x:425,y:120,w:185,h:56,c:'surface',text:'٩ + ١٦ = ٢٥',s:24,ltr:true},
      n1:{type:'note',x:517,y:240,w:190,h:66,c:'n0',text:'أ² + ب² = ج²',size:28,rot:-2},
      cap:{type:'text',x:517,y:310,s:20,text:'ج هو الوتر',hand:true} },
    beats:[
      { say:'في هذا المثلث القائم، ضلعا القائمة ثلاثة وأربعة، والوتر خمسة.', show:['tri','rm','s3','s4','s5'] },
      { say:'ارسم مربعًا على كل ضلع. مساحة الأول تسعة، ومساحة الثاني ستة عشر.', hide:['s3','s4','s5'], show:['q3','t9','q4','t16'] },
      { say:'ومربع الوتر مساحته خمسة وعشرون، وهي تسعة زائد ستة عشر تمامًا.', show:['q5','t25','bx'] },
      { say:'هذه نظرية فيثاغورس: ألف تربيع زائد باء تربيع يساوي جيم تربيع، وجيم هو الوتر.', show:['n1','cap'] },
    ]},
  { t:'ثلاثيات تحفظها', items:{
      n1:{type:'note',x:490,y:145,w:180,h:76,c:'n0',text:'٣ ، ٤ ، ٥',size:32,rot:-3},
      e1:{type:'eq',x:490,y:218,s:20,text:'٩ + ١٦ = ٢٥',cls:'t-ink2'},
      ar:{type:'arrow',x1:390,y1:128,x2:262,y2:128,bend:-40,text:'× ٢'},
      n2:{type:'note',x:160,y:145,w:180,h:76,c:'n3',text:'٦ ، ٨ ، ١٠',size:32,rot:2},
      e2:{type:'eq',x:160,y:218,s:20,text:'٣٦ + ٦٤ = ١٠٠',cls:'t-ink2'},
      n3:{type:'note',x:325,y:275,w:210,h:76,c:'n1',text:'٥ ، ١٢ ، ١٣',size:32,rot:-1},
      e3:{type:'eq',x:325,y:340,s:20,text:'٢٥ + ١٤٤ = ١٦٩',cls:'t-ink2'} },
    beats:[
      { say:'احفظ أطوالًا مشهورة توفّر عليك الحساب. أشهرها ثلاثة وأربعة وخمسة.', show:['n1','e1'] },
      { say:'ومضاعفاتها تصلح أيضًا: ضاعفها تحصل على ستة وثمانية وعشرة.', show:['ar','n2','e2'] },
      { say:'والثلاثية الثانية: خمسة واثنا عشر وثلاثة عشر. ابحث عنها قبل أن تحسب.', show:['n3','e3'] },
    ]},
  { t:'دورك: الضلع المجهول', items:{
      tri:{type:'poly',points:pts([QA,QB,Q]),c:'prisoft'}, rm:rmark(Q,0,12),
      l6:lab([254,160],0,0,'٦'), l10:lab([332,142],0,0,'١٠'), ls:lab([318,210],0,0,'س','t-pink',22),
      n1:{type:'note',x:130,y:150,w:190,h:62,c:'n2',text:'س² = ١٠² − ٦²',size:24,rot:-3},
      eq:{type:'eq',x:320,y:290,s:28,text:'س² = ١٠٠ − ٣٦ = ٦٤  ←  س = ٨',cls:'t-pri'} },
    beats:[
      { say:'في هذا المثلث القائم نعرف الوتر، وهو عشرة، وأحد الضلعين، وهو ستة.', show:['tri','rm','l6','l10','ls'] },
      { say:'لإيجاد ضلع مجهول نطرح: مربع الوتر ناقص مربع الضلع المعلوم.', show:['n1'] },
      { say:'ما طول الضلع سين؟', hl:['ls'] },
    ],
    ask:{ opts:['٤','٨','١٦','١٢'], a:1, y:248,
      right:'أحسنت. مئة ناقص ستة وثلاثين يساوي أربعة وستين، وجذرها ثمانية. إنها ضعف ثلاثية ثلاثة وأربعة وخمسة.',
      wrong:'الجواب ثمانية. مئة ناقص ستة وثلاثين يساوي أربعة وستين، وجذرها ثمانية. لاحظ أنها ضعف ثلاثة وأربعة وخمسة.',
      show:['eq'] } },
  ],
  quiz:[
    {q:'مثلث قائم ضلعا القائمة فيه ٥ و ١٢. ما طول الوتر؟', o:['١٧','١٣','١٥','١٤'], a:1, e:'ثلاثية (٥، ١٢، ١٣): ٢٥ + ١٤٤ = ١٦٩ = ١٣².'},
    {q:'مثلث قائم وتره ٢٠ وأحد ضلعيه ١٢. ما طول الضلع الآخر؟', o:['٨','١٦','١٤','١٠'], a:1, e:'مضاعف (٣، ٤، ٥) × ٤: الأطوال ١٢، ١٦، ٢٠.'},
    {q:'أي مما يلي يصلح أطوالًا لمثلث قائم؟', o:['٤ ، ٥ ، ٦','٥ ، ٦ ، ٧','٩ ، ١٢ ، ١٥','٢ ، ٣ ، ٤'], a:2, e:'٩، ١٢، ١٥ = (٣، ٤، ٥) × ٣، و ٨١ + ١٤٤ = ٢٢٥.'},
  ] });
}

/* =================== 5. Circles =================== */
{
const K=[190,210], K2=[190,205];
const cl=[170,200], cr=[460,200], d=R1(85/Math.SQRT2);
add({ key:'ge-circle', sk:'geometry', ord:50, title:'الدائرة', min:'٣ دقائق',
  goals:['تعرف نصف القطر والقطر والعلاقة بينهما','تحسب محيط الدائرة ٢πنق ومساحتها πنق²','تربط الدائرة بالمربع المرسوم داخلها أو حولها'],
  scenes:[
  { t:'نصف القطر والقطر', items:{
      c:{type:'circle',cx:K[0],cy:K[1],r:110,c:'surface2'},
      r1:seg(K,P(K,110,45),'s-line'), r2:seg(K,P(K,110,205),'s-line'), r3:seg(K,P(K,110,255),'s-line'),
      cen:{type:'dot',x:K[0],y:K[1],r:5,c:'ink',text:'م',dx:12,dy:28},
      rad:seg(K,P(K,110,0),'s-pri'), lr:{type:'text',x:250,y:198,s:22,text:'نق',cls:'t-pri'},
      dia:seg(P(K,110,150),P(K,110,330),'s-pink'), ld:{type:'text',x:120,y:210,s:22,text:'القطر',hand:true},
      n1:{type:'note',x:505,y:140,w:200,h:62,c:'n1',text:'القطر = ٢ × نق',size:24,rot:-2},
      n2:{type:'note',x:505,y:255,w:200,h:62,c:'n3',text:'نق = القطر ÷ ٢',size:24,rot:2} },
    beats:[
      { say:'الدائرة كل نقاطها على البعد نفسه من نقطة واحدة هي المركز.', show:['c','cen','r1','r2','r3'] },
      { say:'هذا البعد اسمه نصف القطر.', show:['rad','lr'] },
      { say:'والقطر يمر بالمركز من طرف إلى طرف، فهو ضعف نصف القطر.', show:['dia','ld','n1'] },
      { say:'انتبه: إذا أُعطيت القطر فاقسمه على اثنين قبل أن تعوّض في القانون.', show:['n2'] },
    ]},
  { t:'المحيط والمساحة', items:{
      fill:{type:'circle',cx:K2[0],cy:K2[1],r:100,c:'prisoft'},
      edge:{type:'circle',cx:K2[0],cy:K2[1],r:100,c:'surface2'},
      trace:{type:'path',d:circD(K2,100),cls:'s-pink'},
      rad:seg(K2,P(K2,100,0),'s-ink'), lr:{type:'eq',x:240,y:196,s:22,text:'نق = ٣',cls:'t-ink'},
      n1:{type:'note',x:500,y:115,w:256,h:58,c:'n1',text:'المحيط = ٢ × π × نق',size:21,rot:-2},
      n2:{type:'note',x:500,y:200,w:256,h:58,c:'n2',text:'المساحة = π × نق²',size:21,rot:2},
      x1:{type:'text',x:505,y:275,s:22,text:'المحيط = ٦π',cls:'t-pink'},
      x2:{type:'text',x:505,y:310,s:22,text:'المساحة = ٩π',cls:'t-pri'},
      pi:{type:'eq',x:190,y:342,s:22,text:'π = ط ≈ ٣٫١٤',cls:'t-ink2'} },
    beats:[
      { say:'محيط الدائرة هو طول حدودها، ويساوي اثنين في باي في نصف القطر.', show:['edge','trace','n1'] },
      { say:'ومساحتها ما بداخلها، وتساوي باي في مربع نصف القطر.', hide:['edge'], show:['fill','n2'] },
      { say:'دائرة نصف قطرها ثلاثة: محيطها ستة باي، ومساحتها تسعة باي.', show:['rad','lr','x1','x2'] },
      { say:'وباي عدد ثابت قيمته تقريبًا ثلاثة فاصلة أربعة عشر، ويُكتب أحيانًا بالحرف طاء. وغالبًا تبقى الإجابة بدلالة باي.', show:['pi'] },
    ]},
  { t:'الدائرة والمربع', items:{
      sqO:{type:'poly',points:pts([[cl[0]-70,cl[1]-70],[cl[0]+70,cl[1]-70],[cl[0]+70,cl[1]+70],[cl[0]-70,cl[1]+70]]),c:'oksoft'},
      cL:{type:'circle',cx:cl[0],cy:cl[1],r:70,c:'prisoft'},
      dL:seg([cl[0]-70,cl[1]],[cl[0]+70,cl[1]],'s-pri'),
      capL:{type:'text',x:cl[0],y:302,s:20,text:'ضلع المربع = القطر'},
      cR:{type:'circle',cx:cr[0],cy:cr[1],r:85,c:'oksoft'},
      sqI:{type:'poly',points:pts([[cr[0]-d,cr[1]-d],[cr[0]+d,cr[1]-d],[cr[0]+d,cr[1]+d],[cr[0]-d,cr[1]+d]]),c:'prisoft'},
      dR:seg([cr[0]-d,cr[1]+d],[cr[0]+d,cr[1]-d],'s-pink'),
      capR:{type:'text',x:cr[0],y:318,s:20,text:'قطر المربع = القطر'},
      tip:{type:'text',x:320,y:348,s:22,text:'ارسم القطر دائمًا',hand:true} },
    beats:[
      { say:'إذا رُسمت دائرة داخل مربع تمس أضلاعه، فضلع المربع يساوي قطر الدائرة.', show:['sqO','cL','dL','capL'] },
      { say:'وإذا رُسم مربع داخل دائرة، فقطر المربع هو نفسه قطر الدائرة.', show:['cR','sqI','dR','capR'] },
      { say:'هاتان الحالتان تتكرران كثيرًا في أسئلة القدرات، فارسم القطر أولًا، وستجد الحل.', show:['tip'], hl:['dL','dR'] },
    ]},
  { t:'دورك: دائرة داخل مربع', items:{
      sq:{type:'poly',points:'260,72 380,72 380,192 260,192',c:'oksoft'},
      c:{type:'circle',cx:320,cy:132,r:60,c:'prisoft'},
      l10:lab([244,139],0,0,'١٠','t-ink',22),
      dia:seg([260,132],[380,132],'s-pri'),
      eq:{type:'eq',x:320,y:290,s:30,text:'نق = ٥  ←  المساحة = ٢٥π',cls:'t-pri'} },
    beats:[
      { say:'مربع طول ضلعه عشرة، رُسمت بداخله دائرة تمس أضلاعه الأربعة.', show:['sq','c','l10'] },
      { say:'تذكّر أن ضلع المربع هنا هو قطر الدائرة. فما مساحة الدائرة؟', show:['dia'] },
    ],
    ask:{ opts:['١٠٠π','٢٥π','١٠π','٢٠π'], a:1, y:248, ltr:true,
      right:'ممتاز. القطر عشرة، فنصف القطر خمسة، والمساحة باي في خمسة وعشرين، أي خمسة وعشرون باي.',
      wrong:'الجواب خمسة وعشرون باي. القطر عشرة، فنصف القطر خمسة، ومربعه خمسة وعشرون. ومن نسي القسمة على اثنين وصل إلى مئة باي.',
      show:['eq'] } },
  ],
  quiz:[
    {q:'دائرة نصف قطرها ٤ سم. ما محيطها؟', o:['١٦π','٨π','٤π','٦٤π'], a:1, e:'المحيط = ٢ × π × ٤ = ٨π. أما ١٦π فهي المساحة.'},
    {q:'دائرة قطرها ١٠. ما مساحتها؟', o:['١٠٠π','١٠π','٢٥π','٥٠π'], a:2, e:'نق = ٥، والمساحة = π × ٥² = ٢٥π.'},
    {q:'مربع مرسوم داخل دائرة نصف قطرها ٥. ما طول قطر المربع؟', o:['٥','١٠','٢٥','٥√٢'], a:1, e:'قطر المربع = قطر الدائرة = ٢ × ٥ = ١٠.'},
  ] });
}
})();
/* Explainers: odd (المفردة الشاذة) */
(function(){ if(!window.XP||!XP.ready) return;

/* Workaround for an engine reveal bug: POP items (box, circle, check, cross, dot, pie, poly) without an
   initial transformOrigin end up shifted by GSAP smoothOrigin after the scale .3 -> 1 pop. A near-zero rot
   makes draw() set transformOrigin at scale 1, so the pop no longer shifts them. Harmless once the engine is fixed. */
const POPT=new Set(['box','circle','check','cross','dot','pie','poly']);
const ADD=L=>{ L.scenes.forEach(sc=>{ const it=sc.items||{}; for(const k in it) if(POPT.has(it[k].type)&&!it[k].rot) it[k].rot=.001; }); XP.add(L); };

/* four word notes in a row (RTL: first word on the right) */
const W4=(words,y,cols)=>{ const xs=[525,395,265,135], o={}; words.forEach((w,i)=>{ o['w'+(i+1)]={type:'note',x:xs[i],y,w:112,h:76,c:cols[i],text:w,size:28,rot:[-3,2,-2,3][i]}; }); return o; };

ADD({ key:'od-link', sk:'odd', ord:10, title:'المفردة الشاذة: ابحث عن الرابط', min:'٣ دقائق',
  goals:['تعرف شكل سؤال المفردة الشاذة','تبحث عن الرابط بين ثلاث كلمات قبل أن تختار','تميّز أنواع الرابط: المعنى، والصنف، والجزء، والدرجة','تختار الكلمة التي تكسر الرابط'],
  scenes:[
  { t:'ثلاث تجتمع وواحدة تخرج',
    items:{
      frame:{type:'path',d:'M207 128 H583 Q597 128 597 142 V218 Q597 232 583 232 H207 Q193 232 193 218 V142 Q193 128 207 128 Z',cls:'s-pri'},
      q:{type:'text',x:300,y:84,s:22,cls:'t-ink2',text:'أيّ الكلمات لا تنتمي إلى المجموعة؟'},
      ...W4(['صقر','حمامة','نسر','ذئب'],180,['n0','n3','n2','n1']),
      lab:{type:'text',x:395,y:278,s:28,hand:true,text:'كلها طيور'},
      x:{type:'cross',x:135,y:270},
    },
    beats:[
      { say:'في سؤال المفردة الشاذة تُعطى أربع كلمات، ثلاث منها يجمعها رابط واحد، والرابعة خارجة عنه.', show:['q','w1','w2','w3','w4'], gap:.3 },
      { say:'لا تبحث عن الشاذة مباشرة. ابحث أولًا عن الرابط: صقر وحمامة ونسر، كلها طيور.', show:['frame','lab'] },
      { say:'أما الذئب فليس طائرًا، فهو يكسر الرابط. إذن الذئب هو المفردة الشاذة.', show:['x'], hl:['w4'] },
    ]},
  { t:'أنواع الرابط',
    items:(()=>{ const o={}; const rows=[['المعنى','فرح · سرور · بهجة','حزن'],['الصنف','تفاح · موز · عنب','جزر'],['جزء من كل','عجلة · مِقوَد · محرّك','شِراع'],['الدرجة','رذاذ · مطر · وابل','رعد']];
      rows.forEach(([tag,ws,odd],i)=>{ const y=100+i*66; o['t'+i]={type:'box',x:470,y:y-22,w:140,h:44,c:'prisoft',text:tag,s:20,cls:'t-pri'}; o['r'+i]={type:'text',x:295,y:y+7,s:24,text:ws}; o['o'+i]={type:'box',x:40,y:y-21,w:110,h:42,c:'pinksoft',text:odd,s:22}; });
      return o; })(),
    beats:[
      { say:'قد يكون الرابط في المعنى: فرح وسرور وبهجة مترادفات، والحزن ضدها.', show:['t0','r0','o0'] },
      { say:'وقد يكون صنفًا واحدًا: التفاح والموز والعنب فواكه، والجزر من الخضار.', show:['t1','r1','o1'] },
      { say:'وقد يكون أجزاءً من شيء واحد: العجلة والمقود والمحرك أجزاء السيارة، أما الشراع فمن السفينة.', show:['t2','r2','o2'] },
      { say:'وقد يكون درجات لشيء واحد: الرذاذ ثم المطر ثم الوابل، أي المطر الغزير. والرعد ليس منها.', show:['t3','r3','o3'] },
    ]},
  { t:'ثلاث خطوات',
    items:{
      s1:{type:'note',x:510,y:170,w:160,h:72,c:'n0',text:'اقرأ الأربع',size:23,rot:-2},
      s2:{type:'note',x:320,y:170,w:160,h:72,c:'n3',text:'صِغ الرابط',size:23,rot:2},
      s3:{type:'note',x:130,y:170,w:160,h:72,c:'n2',text:'اختبر الرابعة',size:23,rot:-2},
      n1:{type:'text',x:510,y:112,s:22,cls:'t-pri',text:'١'},
      n2:{type:'text',x:320,y:112,s:22,cls:'t-pri',text:'٢'},
      n3:{type:'text',x:130,y:112,s:22,cls:'t-pri',text:'٣'},
      a1:{type:'arrow',x1:432,y1:215,x2:402,y2:215,bend:22,cls:'s-pink'},
      a2:{type:'arrow',x1:242,y1:215,x2:212,y2:215,bend:22,cls:'s-pink'},
      tip:{type:'text',x:320,y:292,s:24,hand:true,text:'لا رابط؟ جرّب: المعنى، الصنف، الجزء، الدرجة'},
    },
    beats:[
      { say:'أولًا: اقرأ الكلمات الأربع كلها قبل أن تحكم على أي منها.', show:['n1','s1'] },
      { say:'ثانيًا: صِغ الرابط بين ثلاث منها في كلمة واحدة، مثل: طيور، أو فواكه.', show:['a1','n2','s2'] },
      { say:'ثالثًا: اختبر الكلمة الرابعة بالرابط نفسه. إن كسرته فهي الشاذة.', show:['a2','n3','s3'] },
      { say:'فإن لم يظهر لك رابط، فجرّب نوعًا آخر: المعنى، ثم الصنف، ثم الجزء، ثم الدرجة.', show:['tip'] },
    ]},
  { t:'دورك',
    items:{
      q:{type:'text',x:320,y:92,s:32,cls:'t-pri',text:'صفحة · غلاف · فهرس · رفّ'},
      sub:{type:'text',x:320,y:130,s:19,cls:'t-ink2',text:'ابحث عن الرابط أولًا، ثم اختر الشاذة'},
      ans:{type:'note',x:320,y:220,w:400,h:70,c:'n0',text:'كلها أجزاء الكتاب إلا الرفّ',size:24,rot:-1},
    },
    beats:[
      { say:'دورك الآن: صفحة، غلاف، فهرس، رفّ. ابحث عن الرابط أولًا، ثم اختر الكلمة الشاذة.', show:['q','sub'] },
    ],
    ask:{ opts:['صفحة','غلاف','فهرس','رفّ'], a:3,
      right:'أحسنت. الصفحة والغلاف والفهرس أجزاء من الكتاب، أما الرف فيوضع عليه الكتاب وليس جزءًا منه.',
      wrong:'انتبه للرابط: الصفحة والغلاف والفهرس أجزاء من الكتاب. أما الرف فليس جزءًا منه، فهو الشاذة.',
      show:['ans'] } },
  ],
  quiz:[
    {q:'اختر الكلمة الشاذة:', o:['نحلة','فراشة','عصفور','ذبابة'], a:2, e:'النحلة والفراشة والذبابة حشرات، والعصفور طائر.'},
    {q:'اختر الكلمة الشاذة:', o:['شجاع','جبان','جريء','مقدام'], a:1, e:'شجاع وجريء ومقدام مترادفات، والجبان ضدها.'},
    {q:'اختر الكلمة الشاذة:', o:['جذع','غصن','مِزهرية','ورقة'], a:2, e:'الجذع والغصن والورقة أجزاء من الشجرة، والمزهرية ليست جزءًا منها.'},
  ]});

ADD({ key:'od-deep', sk:'odd', ord:20, title:'روابط أدق وفخ الشكل', min:'٤ دقائق',
  goals:['تبحث عن رابط أدق حين يجمع الرابط العام الكلمات الأربع','تعرف روابط مثل أدوات مهنة واحدة والمترادفات','لا تنخدع بتشابه الحروف أو الوزن','تتحقق من جوابك بجملة: كلها … إلا …'],
  scenes:[
  { t:'رابط أدق',
    items:{
      ...W4(['مِنجَل','مِحراث','مِشرَط','مِعوَل'],140,['n0','n0','n0','n0']),
      g:{type:'text',x:320,y:250,s:26,hand:true,text:'كلها أدوات؟ رابط عام جدًا'},
      t1:{type:'box',x:475,y:205,w:100,h:40,c:'prisoft',text:'فلّاح',s:20,cls:'t-pri'},
      t2:{type:'box',x:345,y:205,w:100,h:40,c:'prisoft',text:'فلّاح',s:20,cls:'t-pri'},
      t3:{type:'box',x:215,y:205,w:100,h:40,c:'pinksoft',text:'جرّاح',s:20},
      t4:{type:'box',x:85,y:205,w:100,h:40,c:'prisoft',text:'فلّاح',s:20,cls:'t-pri'},
      rule:{type:'text',x:320,y:300,s:24,cls:'t-pri',text:'الرابط الدقيق: أدوات مهنة واحدة'},
    },
    beats:[
      { say:'منجل، محراث، مشرط، معول. للوهلة الأولى كلها أدوات، فأين الشاذة؟', show:['w1','w2','w3','w4'], gap:.3 },
      { say:'الرابط «أدوات» عام جدًا؛ يجمع الأربع ولا يفرّق بينها. نحتاج رابطًا أدق.', show:['g'] },
      { say:'المنجل والمحراث والمعول أدوات الفلاح، أما المشرط فأداة الجرّاح. إذن المشرط هو الشاذة.', hide:['g'], show:['t1','t2','t4','t3','rule'], gap:.3, hl:['w3'] },
    ]},
  { t:'حروف مختلفة ومعنى واحد',
    items:{
      ...W4(['حُسام','رُمح','سيف','مُهنّد'],140,['n3','n1','n3','n3']),
      x:{type:'cross',x:395,y:222},
      xl:{type:'text',x:395,y:274,s:22,hand:true,text:'سلاح آخر'},
      nt:{type:'note',x:180,y:260,w:210,h:64,c:'n0',text:'أسماء للسيف',size:24,rot:-2},
    },
    beats:[
      { say:'حسام، رمح، سيف، مهنّد. كلمات مختلفة الحروف تمامًا، فكيف نجد الرابط؟', show:['w1','w2','w3','w4'], gap:.3 },
      { say:'الرابط هنا في المعنى: الحسام والمهنّد اسمان من أسماء السيف، فهي مترادفات.', show:['nt'], hl:['w1','w3','w4'] },
      { say:'أما الرمح فسلاح آخر، وليس اسمًا للسيف. فالرمح هو الشاذة.', show:['x','xl'] },
    ]},
  { t:'فخ الشكل',
    items:{
      ...W4(['نهر','بحر','محيط','شجر'],140,['n3','n3','n3','n1']),
      trap:{type:'text',x:320,y:236,s:24,hand:true,text:'نهر · بحر · شجر: وزن واحد'},
      m1:{type:'box',x:475,y:205,w:100,h:40,c:'n3',text:'ماء',s:20,cls:'t-note'},
      m2:{type:'box',x:345,y:205,w:100,h:40,c:'n3',text:'ماء',s:20,cls:'t-note'},
      m3:{type:'box',x:215,y:205,w:100,h:40,c:'n3',text:'ماء',s:20,cls:'t-note'},
      x:{type:'cross',x:135,y:225},
      rule:{type:'text',x:320,y:300,s:24,cls:'t-pri',text:'الشكل ليس رابطًا، المعنى هو الرابط'},
    },
    beats:[
      { say:'نهر، بحر، محيط، شجر. لاحظ أن نهرًا وبحرًا وشجرًا تتشابه في الوزن وفي الحرف الأخير.', show:['w1','w2','w3','w4'], gap:.3 },
      { say:'فيظن بعض الطلاب أن المحيط هو الشاذ لأنه مختلف الشكل. وهذا فخ؛ فتشابه الحروف ليس رابطًا.', show:['trap'], strike:['trap'] },
      { say:'الرابط الحقيقي في المعنى: النهر والبحر والمحيط مسطحات مائية. فالشاذة هي: شجر.', hide:['trap'], show:['m1','m2','m3','x','rule'], gap:.3 },
    ]},
  { t:'تحقّق بجملة',
    items:{
      fr:{type:'note',x:320,y:76,w:210,h:50,c:'n2',text:'كلها … إلا …',size:26,rot:-1},
      ex:{type:'box',x:130,y:190,w:380,h:56,c:'surface2',text:'كلها مسطحات مائية إلا الشجر',s:23},
      ok:{type:'text',x:320,y:296,s:23,hand:true,text:'جملة دقيقة = جواب صحيح'},
      q:{type:'text',x:320,y:138,s:27,cls:'t-pri',text:'أحمر · أصفر · أعرج · أزرق'},
      ans:{type:'note',x:320,y:222,w:340,h:66,c:'n3',text:'كلها ألوان إلا «أعرج»',size:25,rot:-1},
    },
    beats:[
      { say:'قبل أن تعتمد إجابتك، تحقق منها بجملة قصيرة: كلها كذا إلا كذا.', show:['fr'] },
      { say:'مثل: كلها مسطحات مائية إلا الشجر. إن استقامت الجملة ودقّت، فجوابك صحيح.', show:['ex','ok'] },
      { say:'جرّب الآن: أحمر، أصفر، أعرج، أزرق. أيها الشاذة؟ ولا تنسَ جملة التحقق.', hide:['ex','ok'], show:['q'] },
    ],
    ask:{ opts:['أحمر','أصفر','أعرج','أزرق'], a:2,
      right:'أحسنت. كلها ألوان إلا أعرج، ولم يخدعك الوزن المتشابه.',
      wrong:'الكلمات الأربع على وزن واحد، فالشكل لا يفيد هنا. كلها ألوان إلا أعرج، فهي الشاذة.',
      show:['ans'] } },
  ],
  quiz:[
    {q:'اختر الكلمة الشاذة:', o:['مِقصّ','مِشط','مِجفّف','مِجداف'], a:3, e:'المقص والمشط والمجفف أدوات الحلّاق، والمجداف أداة التجديف.'},
    {q:'اختر الكلمة الشاذة:', o:['ليث','ذئب','ضِرغام','غَضَنفر'], a:1, e:'الليث والضرغام والغضنفر من أسماء الأسد، والذئب حيوان آخر.'},
    {q:'اختر الكلمة الشاذة:', o:['قمر','شمس','شجر','نجم'], a:2, e:'القمر والشمس والنجم أجرام سماوية. تشابه «قمر» و«شجر» في الوزن لا يصنع رابطًا.'},
  ]});
})();
/* Explainers: reading (استيعاب المقروء) */
(function(){ if(!window.XP||!XP.ready) return;

/* Workaround for an engine reveal bug: POP items (box, circle, check, cross, dot, pie, poly) without an
   initial transformOrigin end up shifted by GSAP smoothOrigin after the scale .3 -> 1 pop. A near-zero rot
   makes draw() set transformOrigin at scale 1, so the pop no longer shifts them. Harmless once the engine is fixed. */
const POPT=new Set(['box','circle','check','cross','dot','pie','poly']);
const ADD=L=>{ L.scenes.forEach(sc=>{ const it=sc.items||{}; for(const k in it) if(POPT.has(it[k].type)&&!it[k].rot) it[k].rot=.001; }); XP.add(L); };

/* passage card: a box plus one text item per line (keys pbox, l1, l2, …) */
const PASS=(lines,y,{lh=38,s=21,h}={})=>{ const o={pbox:{type:'box',x:50,y,w:540,h:h||(lines.length*lh+26),c:'surface2'}};
  lines.forEach((t,i)=>{ o['l'+(i+1)]={type:'text',x:320,y:y+13+lh*(i+0.5)+s*0.36,s,text:t}; }); return o; };

/* ---------- 1. main idea vs details ---------- */
const PALM=['تُعدّ النخلة شجرةً نافعةً في كل أجزائها؛','فثمرها غذاءٌ للناس، وسَعَفها يُصنع منه الحصير،','وجذعها يُستخدم في البناء وتسقيف البيوت.'];
ADD({ key:'re-main', sk:'reading', ord:10, title:'الفكرة الرئيسة والتفاصيل', min:'٣ دقائق',
  goals:['تميّز الفكرة الرئيسة من التفاصيل','تجد جملة الفكرة في النص','تختار عنوانًا يغطي النص كله','تستبعد العنوان الضيّق والعنوان الواسع'],
  scenes:[
  { t:'نصٌّ قصير',
    items:{
      ...PASS(PALM,76,{lh:40}),
      ul:{type:'line',x1:520,y1:126,x2:120,y2:126,cls:'s-pink'},
      tag:{type:'note',x:320,y:262,w:220,h:58,c:'n2',text:'جملة الفكرة',size:24,rot:-2},
      tip:{type:'text',x:320,y:328,s:22,hand:true,text:'تجدها غالبًا في أول النص أو آخره'},
    },
    beats:[
      { say:'اقرأ هذا النص القصير عن النخلة. ثلاث جمل، ولكل جملة دور.', show:['pbox','l1','l2','l3'], gap:.5 },
      { say:'الجملة الأولى تقول: النخلة نافعة في كل أجزائها. هذه جملة الفكرة، وما بعدها يشرحها.', show:['ul','tag'] },
      { say:'وتجد جملة الفكرة غالبًا في أول النص أو في آخره، والجمل الأخرى تفصّلها.', show:['tip'] },
    ]},
  { t:'المظلة والتفاصيل',
    items:{
      idea:{type:'note',x:320,y:104,w:380,h:62,c:'n0',text:'الفكرة: النخلة نافعة كلها',size:24,rot:-1},
      k1:{type:'line',x1:320,y1:138,x2:510,y2:208,cls:'s-pri'},
      k2:{type:'line',x1:320,y1:138,x2:320,y2:208,cls:'s-pri'},
      k3:{type:'line',x1:320,y1:138,x2:130,y2:208,cls:'s-pri'},
      d1:{type:'box',x:435,y:208,w:150,h:48,c:'prisoft',text:'ثمرها غذاء',s:20,cls:'t-pri'},
      d2:{type:'box',x:245,y:208,w:150,h:48,c:'prisoft',text:'سعفها حصير',s:20,cls:'t-pri'},
      d3:{type:'box',x:55,y:208,w:150,h:48,c:'prisoft',text:'جذعها بناء',s:20,cls:'t-pri'},
      bot:{type:'text',x:320,y:312,s:23,hand:true,text:'التفصيل جزء من الصورة، لا الصورة كلها'},
    },
    beats:[
      { say:'الفكرة الرئيسة هي ما يدور حوله النص كله، ونلخّصها في جملة واحدة: النخلة نافعة في كل أجزائها.', show:['idea'] },
      { say:'أما التفاصيل فأمثلة تشرح الفكرة: الثمر غذاء، والسعف للحصير، والجذع للبناء.', show:['k1','d1','k2','d2','k3','d3'], gap:.25 },
      { say:'كل تفصيل صحيح، لكنه يغطي جزءًا واحدًا فقط؛ لذلك لا يصلح أن يكون فكرة رئيسة.', show:['bot'], hl:['d3'] },
    ]},
  { t:'دورك: اختر العنوان',
    items:{
      q:{type:'text',x:320,y:90,s:28,cls:'t-pri',text:'ما أنسب عنوان للنص؟'},
      sub:{type:'text',x:320,y:128,s:18,cls:'t-ink2',text:'تذكّر: النخلة نافعة في كل أجزائها'},
      ans:{type:'note',x:320,y:222,w:360,h:64,c:'n3',text:'العنوان = الفكرة الرئيسة',size:24,rot:-1},
    },
    beats:[
      { say:'سؤال العنوان هو سؤال الفكرة الرئيسة، لكن بكلمات قليلة.', show:['q'] },
      { say:'تذكّر النص: النخلة نافعة في كل أجزائها. ما أنسب عنوان له؟', show:['sub'] },
    ],
    ask:{ opts:['النخلة في البناء','منافع النخلة','تاريخ الجزيرة العربية','صناعة الحصير'], a:1,
      right:'أحسنت. «منافع النخلة» يغطي النص كله: الثمر والسعف والجذع.',
      wrong:'العنوان الأنسب «منافع النخلة»؛ لأنه يجمع الثمر والسعف والجذع. أما البقية فتفصيل ضيّق أو موضوع واسع.',
      show:['ans'] } },
  { t:'ضيّق، واسع، مناسب',
    items:(()=>{ const o={}; [['النخلة في البناء','ضيّق','n1'],['تاريخ الجزيرة العربية','واسع','n1'],['منافع النخلة','يغطي النص','n3']].forEach(([tt,tag,c],i)=>{ const y=100+i*70;
      o['r'+i]={type:'box',x:260,y:y-25,w:330,h:50,c:'surface2',text:tt,s:22}; o['t'+i]={type:'note',x:150,y,w:180,h:50,c,text:tag,size:22,rot:i%2?2:-2}; });
      o.tip={type:'text',x:320,y:320,s:23,hand:true,text:'هل يغطي العنوان أول النص وآخره؟'}; return o; })(),
    beats:[
      { say:'العنوان «النخلة في البناء» ضيّق؛ فهو يغطي الجملة الأخيرة وحدها. هذا فخ التفصيل.', show:['r0','t0'] },
      { say:'والعنوان «تاريخ الجزيرة العربية» واسع جدًا؛ فالنص لم يتحدث عن التاريخ أصلًا.', show:['r1','t1'] },
      { say:'أما «منافع النخلة» فمناسب؛ يغطي الثمر والسعف والجذع، أي النص كله دون زيادة.', show:['r2','t2'] },
      { say:'فقبل أن تختار عنوانًا، اسأل نفسك: هل يشمل أول النص وآخره؟', show:['tip'] },
    ]},
  ],
  quiz:[
    {q:'«الماء أساس الحياة؛ فالإنسان لا يعيش بدونه، والنبات يذبل إذا حُرم منه، والحيوان يهاجر بحثًا عنه.» أنسب عنوان للنص:', o:['هجرة الحيوان','أهمية الماء للحياة','ذبول النبات','مصادر المياه'], a:1, e:'الجملة الأولى هي جملة الفكرة، وما بعدها أمثلة عليها.'},
    {q:'في النص السابق، عبارة «النبات يذبل إذا حُرم منه» تمثّل:', o:['الفكرة الرئيسة','تفصيلًا يدعم الفكرة','رأيًا مخالفًا للكاتب','عنوان النص'], a:1, e:'هي مثال واحد يشرح أهمية الماء، أي تفصيل.'},
    {q:'العنوان الذي يغطي جملة واحدة فقط من النص يُعدّ عنوانًا:', o:['مناسبًا','ضيّقًا','واسعًا','شاملًا'], a:1, e:'العنوان المناسب يغطي النص كله؛ ما يغطي جزءًا منه ضيّق.'},
  ]});

/* ---------- 2. stated, inferred, not mentioned ---------- */
const STORK=['يهاجر اللقلق كل خريف من أوروبا إلى أفريقيا،','فيقطع آلاف الكيلومترات دون أن يضلّ طريقه،','ثم يعود في الربيع إلى عشّه القديم في الغالب.'];
ADD({ key:'re-stated', sk:'reading', ord:20, title:'مذكور، مستنتج، أم غير مذكور؟', min:'٤ دقائق',
  goals:['تفرّق بين المعلومة المذكورة صراحة والمستنتجة','تجد الدليل في النص لكل إجابة','تجيب من النص لا من معلوماتك العامة','تحلّ أسئلة «جميع ما يلي … عدا»'],
  scenes:[
  { t:'ثلاثة أنواع',
    items:{
      ...PASS(STORK,74,{lh:40}),
      a:{type:'note',x:510,y:272,w:150,h:60,c:'n3',text:'مذكور',size:25,rot:-2},
      b:{type:'note',x:320,y:272,w:150,h:60,c:'n2',text:'مستنتج',size:25,rot:2},
      c:{type:'note',x:130,y:272,w:150,h:60,c:'n1',text:'غير مذكور',size:23,rot:-2},
    },
    beats:[
      { say:'إليك نصًّا قصيرًا عن طائر اللقلق. كل معلومة في الخيارات ستكون واحدة من ثلاث.', show:['pbox','l1','l2','l3'], gap:.5 },
      { say:'إما مذكورة في النص صراحة، وإما مستنتجة منه؛ أي يدل عليها النص دون أن يقولها بلفظها.', show:['a','b'] },
      { say:'وإما غير مذكورة أصلًا، حتى لو كانت صحيحة في الواقع.', show:['c'] },
    ]},
  { t:'مذكور أم مستنتج؟',
    items:{
      qa:{type:'box',x:50,y:66,w:540,h:44,c:'surface2',text:'«يهاجر اللقلق كل خريف…»',s:20,cls:'t-ink2'},
      sa:{type:'box',x:245,y:124,w:345,h:48,c:'surface',text:'يهاجر اللقلق في فصل الخريف',s:21},
      ta:{type:'note',x:135,y:148,w:150,h:50,c:'n3',text:'مذكور',size:22,rot:-2},
      qb:{type:'box',x:50,y:200,w:540,h:44,c:'surface2',text:'«…دون أن يضلّ طريقه»',s:20,cls:'t-ink2'},
      sb:{type:'box',x:245,y:258,w:345,h:48,c:'surface',text:'اللقلق يعرف طريقه جيدًا',s:21},
      tb:{type:'note',x:135,y:282,w:150,h:50,c:'n2',text:'مستنتج',size:22,rot:2},
    },
    beats:[
      { say:'قارن الخيار بالنص دائمًا. «يهاجر اللقلق في الخريف»: هذا مكتوب في الجملة الأولى تقريبًا بلفظه.', show:['qa','sa'] },
      { say:'فهي معلومة مذكورة صراحة، ودليلها واضح.', show:['ta'] },
      { say:'أما «اللقلق يعرف طريقه جيدًا» فلم تُكتب بهذا اللفظ في أي جملة.', show:['qb','sb'] },
      { say:'لكن النص قال: دون أن يضلّ طريقه. فهذه معلومة مستنتجة، ودليلها في النص أيضًا.', show:['tb'] },
    ]},
  { t:'فخ المعرفة العامة',
    items:{
      st:{type:'box',x:100,y:78,w:440,h:56,c:'surface2',text:'يتغذّى اللقلق على الضفادع والأسماك',s:22},
      ck:{type:'check',x:545,y:190},
      ckt:{type:'text',x:395,y:198,s:22,text:'صحيح في الواقع'},
      cr:{type:'cross',x:545,y:252},
      crt:{type:'text',x:385,y:260,s:22,cls:'t-bad',text:'غير مذكور في النص'},
      rule:{type:'note',x:145,y:226,w:240,h:66,c:'n0',text:'الجواب من النص فقط',size:21,rot:-3},
    },
    beats:[
      { say:'قد يأتيك خيار مثل: يتغذّى اللقلق على الضفادع والأسماك.', show:['st'] },
      { say:'وقد تعرف أن هذه المعلومة صحيحة في الواقع.', show:['ck','ckt'] },
      { say:'لكن النص لم يذكرها، والسؤال عن النص لا عن معلوماتك. فهي غير مذكورة، ولا تُختار.', show:['cr','crt','rule'], gap:.35 },
    ]},
  { t:'دورك: سؤال «عدا»',
    items:{
      q:{type:'text',x:320,y:90,s:27,cls:'t-pri',text:'ورد في النص جميع ما يلي عدا:'},
      sub:{type:'text',x:320,y:128,s:18,cls:'t-ink2',text:'ثلاثة خيارات لها دليل، والمطلوب الخيار الذي لا دليل له'},
      ans:{type:'note',x:320,y:222,w:360,h:64,c:'n3',text:'الأسراب لم يذكرها النص',size:24,rot:-1},
    },
    beats:[
      { say:'في سؤال «جميع ما يلي عدا» تنقلب المهمة: ثلاثة خيارات في النص، والمطلوب الخيار الذي لم يَرِد.', show:['q'] },
      { say:'طابِق كل خيار بدليله من النص. ما الذي لم يذكره النص عن اللقلق؟', show:['sub'] },
    ],
    ask:{ opts:['يهاجر في الخريف','يقطع مسافات طويلة','يعود في الربيع','يهاجر في أسراب'], a:3,
      right:'أحسنت. الخريف والمسافات الطويلة والعودة في الربيع كلها في النص، أما الأسراب فلم تُذكر.',
      wrong:'راجع الأدلة: الخريف في الجملة الأولى، والمسافات في الثانية، والربيع في الثالثة. أما الأسراب فلم يذكرها النص.',
      show:['ans'] } },
  ],
  quiz:[
    {q:'«أغلقت المكتبة أبوابها مبكرًا بسبب العاصفة، فعاد الطلاب إلى بيوتهم قبل إكمال بحوثهم.» ما سبب إغلاق المكتبة حسب النص؟', o:['العطلة الرسمية','العاصفة','أعمال الصيانة','قلة الزوّار'], a:1, e:'مذكور صراحة: «بسبب العاصفة».'},
    {q:'يُفهم من النص السابق أن الطلاب:', o:['أنهوا بحوثهم مبكرًا','كانوا يعملون على بحوثهم في المكتبة','لا يحبون المكتبة','يخافون من العواصف'], a:1, e:'لم يقله النص بلفظه، لكن عودتهم «قبل إكمال بحوثهم» حين أُغلقت المكتبة تدل عليه.'},
    {q:'في النص السابق، ورد جميع ما يلي عدا:', o:['أُغلقت المكتبة مبكرًا','هبّت عاصفة','عاد الطلاب إلى بيوتهم','انقطعت الكهرباء'], a:3, e:'انقطاع الكهرباء قد يحدث في العواصف، لكن النص لم يذكره.'},
  ]});

/* ---------- 3. efficient reading strategy ---------- */
const MINT=['زرع سعيدٌ النعناعَ على سطح منزله، فسخر جيرانه','من فكرته أول الأمر، غير أنهم تحمّسوا لها','حين رأوا نجاحها، فطلبوا منه أن يعلّمهم.'];
ADD({ key:'re-strategy', sk:'reading', ord:30, title:'قراءة ذكية وسريعة', min:'٤ دقائق',
  goals:['تبدأ بالأسئلة أو بمسح سريع للنص','تحدد الكلمة المفتاحية وترجع إلى موضعها','تستنتج معنى الكلمة من سياقها','تعرف على مَن يعود الضمير'],
  scenes:[
  { t:'ابدأ بالسؤال',
    items:{
      qa:{type:'box',x:335,y:74,w:250,h:48,c:'prisoft',text:'ما معنى «سخر»؟',s:21,cls:'t-pri'},
      qb:{type:'box',x:55,y:74,w:250,h:48,c:'prisoft',text:'علامَ يعود «لها»؟',s:21,cls:'t-pri'},
      tip:{type:'text',x:320,y:162,s:23,hand:true,text:'السؤال يحدد ما تبحث عنه'},
      ...PASS(MINT,190,{lh:40,s:20}),
    },
    beats:[
      { say:'لا تبدأ بقراءة النص كلمة كلمة. ألقِ نظرة على الأسئلة أولًا، لتعرف عمّا تبحث.', show:['qa','qb'] },
      { say:'فالسؤال يحدد هدفك: هنا نبحث عن معنى كلمة، وعن مرجع ضمير.', show:['tip'] },
      { say:'ثم امسح النص مسحًا سريعًا لتعرف موضوعه: سعيد زرع النعناع على سطح منزله.', show:['pbox','l1','l2','l3'], gap:.4 },
    ]},
  { t:'الكلمة المفتاحية',
    items:{
      ...PASS(MINT,64,{lh:38,s:20}),
      chip:{type:'note',x:505,y:250,w:130,h:58,c:'n1',text:'سخر',size:28,rot:-3},
      sent:{type:'box',x:40,y:224,w:385,h:52,c:'butter',text:'فسخر جيرانه من فكرته أول الأمر',s:20,cls:'t-note'},
      hint:{type:'text',x:320,y:325,s:23,hand:true,text:'اقرأ ما حولها فقط، لا النص كله'},
    },
    beats:[
      { say:'حدد في السؤال كلمته المفتاحية. في سؤال المعنى، الكلمة المفتاحية هي: سخر.', show:['pbox','l1','l2','l3','chip'], gap:.25 },
      { say:'ابحث عنها في النص بعينك، واقرأ الجملة التي تحتويها وما حولها.', show:['sent'] },
      { say:'بهذا لا تعيد قراءة النص كاملًا لكل سؤال، فتوفّر وقتك للأسئلة الأخرى.', show:['hint'] },
    ]},
  { t:'المعنى من السياق',
    items:{
      s1:{type:'box',x:335,y:72,w:250,h:50,c:'surface2',text:'فسخر جيرانه من فكرته',s:20},
      s2:{type:'box',x:55,y:72,w:250,h:50,c:'surface2',text:'غير أنهم تحمّسوا لها',s:20},
      gn:{type:'note',x:320,y:170,w:310,h:56,c:'n2',text:'غير أنّ ← عكس ما قبلها',size:21,rot:-1},
      mean:{type:'text',x:320,y:236,s:26,cls:'t-pri',text:'سخر = استهزأ'},
      test:{type:'box',x:130,y:262,w:380,h:52,c:'oksoft',text:'فاستهزأ جيرانه من فكرته',s:21},
      ck:{type:'check',x:555,y:288,s:.9},
    },
    beats:[
      { say:'ما معنى سخر؟ لا تحتاج إلى معجم. انظر إلى ما بعدها: غير أنهم تحمّسوا لها.', show:['s1','s2'] },
      { say:'غير أنّ تدل على عكس ما قبلها، والحماس عكس الاستهزاء. إذن سخر تعني: استهزأ.', show:['gn','mean'] },
      { say:'تحقق بوضع المعنى مكان الكلمة: فاستهزأ جيرانه من فكرته. المعنى مستقيم.', show:['test','ck'] },
    ]},
  { t:'دورك: عود الضمير',
    items:{
      rule:{type:'note',x:320,y:92,w:420,h:58,c:'n0',text:'الضمير يعود على اسم سابق يطابقه',size:22,rot:-1},
      d1:{type:'box',x:150,y:160,w:340,h:52,c:'surface2',text:'فطلبوا مِنْهُ أن يعلّمهم',s:22},
      dn:{type:'note',x:320,y:262,w:200,h:56,c:'n3',text:'منه ← سعيد',size:24,rot:2},
      q:{type:'text',x:320,y:88,s:28,cls:'t-pri',text:'غير أنهم تحمّسوا لها'},
      sub:{type:'text',x:320,y:128,s:19,cls:'t-ink2',text:'علامَ يعود الضمير في «لها»؟'},
      ans:{type:'note',x:320,y:222,w:260,h:64,c:'n3',text:'لها ← الفكرة',size:26,rot:-1},
    },
    beats:[
      { say:'الضمير يعود على اسم سابق يطابقه في التذكير والتأنيث والعدد، ويستقيم به المعنى.', show:['rule'] },
      { say:'في قوله: فطلبوا منه، الضمير يعود على سعيد؛ فهو صاحب الفكرة، والجيران طلبوا منه أن يعلّمهم.', show:['d1','dn'] },
      { say:'والآن: غير أنهم تحمّسوا لها. على أي شيء يعود الضمير في كلمة لها؟', hide:['rule','d1','dn'], show:['q','sub'] },
    ],
    ask:{ opts:['الفكرة','النعناع','السطح','الجيران'], a:0,
      right:'أحسنت. «لها» ضمير لمفرد مؤنث، ولا يطابقه قبله إلا الفكرة: تحمّسوا للفكرة بعد أن سخروا منها.',
      wrong:'الضمير في «لها» لمفرد مؤنث. النعناع والسطح مذكران، والجيران جمع. فهو يعود على الفكرة.',
      show:['ans'] } },
  ],
  quiz:[
    {q:'«كان الطبيب حاذقًا؛ يشخّص المرض من أول نظرة، فيقصده المرضى من مدن بعيدة.» معنى «حاذقًا»:', o:['ماهرًا','غاضبًا','كريمًا','مُتعَبًا'], a:0, e:'يدل عليه ما بعده: يشخّص المرض من أول نظرة.'},
    {q:'في النص السابق، الضمير في «يقصده» يعود على:', o:['المرض','الطبيب','المرضى','المدن'], a:1, e:'المرضى يقصدون الطبيب؛ والضمير مفرد مذكر يطابق «الطبيب».'},
    {q:'أفضل خطوة أولى لتوفير الوقت في استيعاب المقروء:', o:['حفظ النص قبل الأسئلة','قراءة الأسئلة أو مسح النص سريعًا','قراءة كل خيار ثلاث مرات','البدء بأطول سؤال'], a:1, e:'معرفة المطلوب أولًا تجعلك تبحث عن الدليل مباشرة.'},
  ]});
})();
/* Explainers: stats */
(function(){ if(!window.XP||!XP.ready) return;
/* POP items (box, circle, check...) get their transform origin set up front; otherwise the engine's
   pop-in (origin given only in the 'to' vars) leaves a leftover translate. rot:0.01 is invisible. */
const POPT=new Set(['box','circle','check','cross','poly','pie','dot']);
const add=L=>{ L.scenes.forEach(sc=>{ for(const k in sc.items||{}){ const it=sc.items[k]; if(POPT.has(it.type)&&!it.rot) it.rot=0.01; } }); XP.add(L); };

/* ================= 1. mean, median, mode ================= */
const card=(x,v,c)=>({type:'note',x,y:130,w:64,h:64,c,text:v,size:30});
add({ key:'st-mean', sk:'stats', ord:10, title:'المتوسط والوسيط والمنوال', min:'٤ دقائق',
  goals:['تحسب المتوسط وتفهمه نقطةَ توازن','تستخدم حيلة المجموع لإيجاد القيمة المفقودة','تجد الوسيط بعد الترتيب والمنوال بالتكرار','تتجنب أخذ الأوسط قبل الترتيب'],
  scenes:[
  { t:'المتوسط: التسوية',
    items:{ bars:{type:'bars',x:70,y:90,w:300,h:200,values:[2,8,6,4],labels:['خالد','نورة','سارة','علي'],max:10,c:'pri'},
      ml:{type:'line',x1:62,y1:190,x2:378,y2:190,cls:'s-pink'},
      e1:{type:'text',x:505,y:130,s:24,text:'٢ + ٨ + ٦ + ٤ = ٢٠'}, e2:{type:'text',x:505,y:192,s:34,text:'٢٠ ÷ ٤ = ٥',cls:'t-pri'},
      n:{type:'note',x:505,y:268,w:180,h:58,c:'n0',text:'المتوسط = ٥',size:26,rot:-2} },
    beats:[
      { say:'المتوسط يجيب عن سؤال واحد: لو وزّعنا المجموع بالتساوي، كم يأخذ كل واحد؟', show:['bars'] },
      { say:'نجمع القيم أولًا: اثنان زائد ثمانية زائد ستة زائد أربعة يساوي عشرين.', show:['e1'] },
      { say:'ثم نقسم المجموع على عددها: عشرون على أربعة يساوي خمسة.', show:['e2','ml'] },
      { say:'المتوسط نقطة توازن: ما يزيد فوق الخط يعوّض تمامًا ما ينقص تحته.', show:['n'], hl:['ml'] },
    ]},
  { t:'حيلة المجموع',
    items:{ rule:{type:'note',x:320,y:98,w:400,h:62,c:'n2',text:'المجموع = المتوسط × العدد',size:26,rot:-1},
      q:{type:'text',x:320,y:168,s:21,text:'متوسط ٥ أعداد = ١٢ ، ومجموع أربعة منها = ٤٥',cls:'t-ink2'},
      e1:{type:'text',x:320,y:218,s:30,text:'المجموع: ١٢ × ٥ = ٦٠'}, e2:{type:'text',x:320,y:266,s:30,text:'٦٠ − ٤٥ = ١٥',cls:'t-pri'},
      ans:{type:'box',x:210,y:290,w:220,h:50,c:'n0',text:'العدد المفقود ١٥',s:24,cls:'t-note'} },
    beats:[
      { say:'اقلب القاعدة تحصل على أقوى حيلة في هذا الباب: المجموع يساوي المتوسط في العدد.', show:['rule'] },
      { say:'مثال: متوسط خمسة أعداد اثنا عشر، فمجموعها اثنا عشر في خمسة، أي ستون.', show:['q','e1'] },
      { say:'وإن كان مجموع أربعة منها خمسة وأربعين، فالخامس ستون ناقص خمسة وأربعين.', show:['e2'] },
      { say:'إذن العدد المفقود خمسة عشر. في أي سؤال عن قيمة مفقودة، ابدأ بالمجموع.', show:['ans'] },
    ]},
  { t:'الوسيط والمنوال',
    items:{ c7:card(480,'٧','n3'), c3a:card(400,'٣','n1'), c9:card(320,'٩','n3'), c3b:card(240,'٣','n1'), c5:card(160,'٥','n0'),
      lm:{type:'text',x:320,y:200,s:24,text:'الوسيط',hand:true}, lo:{type:'text',x:440,y:200,s:24,text:'المنوال',hand:true},
      ev:{type:'text',x:320,y:252,s:22,text:'زوجي؟ ٢، ٤، ٦، ٨ ← الوسيط (٤ + ٦) على ٢ = ٥',cls:'t-ink2'},
      trap:{type:'note',x:320,y:312,w:330,h:52,c:'n1',text:'رتّب أولًا، ثم خذ الأوسط',size:22,rot:-1} },
    beats:[
      { say:'الوسيط هو العدد الذي يقع في المنتصف. خذ هذه القيم الخمس.', show:['c7','c3a','c9','c3b','c5'], gap:.12 },
      { say:'أولًا نرتّبها من الأصغر إلى الأكبر.', move:{c7:[-240,0],c3a:[80,0],c9:[-160,0],c3b:[160,0],c5:[160,0]} },
      { say:'العدد الأوسط الآن خمسة، فالوسيط خمسة.', show:['lm'], hl:['c5'] },
      { say:'وإن كان عدد القيم زوجيًا، فالوسيط متوسط العددين اللذين في المنتصف.', show:['ev'] },
      { say:'أما المنوال فهو القيمة الأكثر تكرارًا. الثلاثة تكررت مرتين، فالمنوال ثلاثة.', show:['lo'], hl:['c3a','c3b'] },
      { say:'والفخ: من يأخذ الأوسط قبل الترتيب يقول تسعة، وهذا خطأ.', show:['trap'] },
    ]},
  { t:'دورك: القيمة المفقودة',
    items:{ q1:{type:'text',x:320,y:82,s:24,text:'متوسط درجات ٤ طلاب = ٨٠'}, q2:{type:'text',x:320,y:122,s:22,text:'انضم طالب خامس فصار المتوسط ٨٢. كم درجته؟'},
      t1:{type:'text',x:320,y:198,s:26,text:'قبل: ٤ × ٨٠ = ٣٢٠',cls:'t-ink2'}, t2:{type:'text',x:320,y:244,s:26,text:'بعد: ٥ × ٨٢ = ٤١٠',cls:'t-ink2'},
      r:{type:'box',x:200,y:270,w:240,h:54,c:'n0',text:'٤١٠ − ٣٢٠ = ٩٠',s:28,cls:'t-note'} },
    beats:[
      { say:'دورك. متوسط درجات أربعة طلاب ثمانون، ثم انضم طالب خامس فصار المتوسط اثنين وثمانين.', show:['q1','q2'] },
      { say:'استخدم حيلة المجموع. كم درجة الطالب الخامس؟', hl:['q2'] },
    ],
    ask:{ opts:['٨٢','٩٠','٨٦','١٠٠'], a:1,
      right:'صحيح! المجموع كان ثلاثمئة وعشرين، وصار أربعمئة وعشرة، والفرق تسعون.',
      wrong:'المجموع قبل: أربعة في ثمانين يساوي ثلاثمئة وعشرين. وبعد: خمسة في اثنين وثمانين يساوي أربعمئة وعشرة. الفرق تسعون.',
      show:['t1','t2','r'] } },
  ],
  quiz:[
    {q:'ما وسيط القيم: ٨، ٢، ٦، ٤، ١٠، ٥؟', o:['٥','٦','٥٫٥','٧'], a:2, e:'بعد الترتيب: ٢، ٤، ٥، ٦، ٨، ١٠. العددان الأوسطان ٥ و٦، ومتوسطهما ٥٫٥.'},
    {q:'متوسط ٦ أعداد ١٥. حُذف عدد فأصبح متوسط الباقي ١٤. ما العدد المحذوف؟', o:['٢٠','١٥','١','١٩'], a:0, e:'المجموع قبل ٦ × ١٥ = ٩٠، وبعد ٥ × ١٤ = ٧٠، فالمحذوف ٢٠.'},
    {q:'ما منوال القيم: ٤، ٧، ٤، ٩، ٧، ٤، ٢؟', o:['٧','٤','٥','٩'], a:1, e:'العدد ٤ تكرر ثلاث مرات، وهو الأكثر تكرارًا.'},
  ] });

/* ================= 2. probability ================= */
const balls={}; const bcol=['bad','bad','bad','bad','butter','butter','butter','butter','butter','butter','sky','sky'];
bcol.forEach((c,i)=>{ balls['b'+i]={type:'circle',cx:463-26*i,cy:106,r:10,c}; });
add({ key:'st-prob', sk:'stats', ord:20, title:'الاحتمال من الصفر', min:'٣ دقائق',
  goals:['تحسب الاحتمال: المطلوب على الكل','تعرف أن الاحتمال بين الصفر والواحد','تستخدم الاحتمال المتمّم لتختصر الحل','تستبعد الخيارات المستحيلة فورًا'],
  scenes:[
  { t:'ما الاحتمال؟',
    items:{ g:{type:'grid',x:70,y:110,rows:2,cols:5,cell:40,gap:8,fill:3,c:'pink'}, cap:{type:'text',x:190,y:236,s:18,text:'١٠ مكعبات: ٣ وردية و٧ بيضاء',cls:'t-ink2'},
      qq:{type:'text',x:190,y:300,s:26,text:'سحبة عشوائية: وردي؟',hand:true},
      top:{type:'text',x:470,y:128,s:20,text:'عدد الحالات المطلوبة'}, bar:{type:'line',x1:375,y1:144,x2:565,y2:144}, bot:{type:'text',x:470,y:174,s:20,text:'عدد الحالات كلها'},
      res:{type:'box',x:390,y:220,w:160,h:60,c:'n2',text:'٣/١٠',s:34,cls:'t-note'} },
    beats:[
      { say:'الاحتمال عدد يقيس فرصة حدوث شيء. أمامك عشرة مكعبات: ثلاثة وردية وسبعة بيضاء.', show:['g','cap'] },
      { say:'نسحب مكعبًا دون أن ننظر. ما احتمال أن يكون ورديًا؟', show:['qq'] },
      { say:'القاعدة: عدد الحالات المطلوبة على عدد الحالات كلها.', show:['top','bar','bot'] },
      { say:'المطلوب ثلاثة، والكل عشرة، فالاحتمال ثلاثة على عشرة.', show:['res'], hl:['g'] },
    ]},
  { t:'من صفر إلى واحد',
    items:{ nl:{type:'nline',x1:110,x2:530,y:175,from:0,to:1,step:.25},
      d0:{type:'dot',x:110,y:175,r:9,c:'bad',text:'مستحيل',dy:-24,s:20}, d1:{type:'dot',x:530,y:175,r:9,c:'pri',text:'مؤكد',dy:-24,s:20},
      dh:{type:'dot',x:320,y:175,r:9,c:'pink',text:'نصف',dy:-24,s:20},
      n:{type:'note',x:320,y:275,w:400,h:54,c:'n0',text:'لا يقل عن ٠ ولا يزيد على ١',size:22,rot:-1} },
    beats:[
      { say:'كل احتمال عدد بين الصفر والواحد.', show:['nl'] },
      { say:'الصفر يعني مستحيلًا، كأن تسحب مكعبًا أصفر من كيس ليس فيه أصفر.', show:['d0'] },
      { say:'والواحد يعني مؤكدًا، كأن تكون المكعبات كلها وردية.', show:['d1'] },
      { say:'وفي المنتصف النصف، مثل رمي قطعة نقود: وجه من وجهين.', show:['dh'] },
      { say:'لذلك أي خيار سالب أو أكبر من واحد، استبعده فورًا.', show:['n'] },
    ]},
  { t:'الاحتمال المتمّم',
    items:{ rule:{type:'note',x:320,y:92,w:470,h:58,c:'n2',text:'احتمال عدم الحدوث = ١ − احتمال الحدوث',size:22,rot:-1},
      g:{type:'grid',x:70,y:150,rows:2,cols:5,cell:40,gap:8,fill:3,c:'pink'},
      e:{type:'text',x:470,y:195,s:30,text:'١ − ٣/١٠ = ٧/١٠'}, h:{type:'text',x:470,y:262,s:24,text:'عُدّ العكس إن كان أسهل',hand:true} },
    beats:[
      { say:'احتمال ألا يحدث الشيء يساوي واحدًا ناقص احتمال حدوثه.', show:['rule'] },
      { say:'في مثالنا، احتمال الوردي ثلاثة على عشرة، فاحتمال غير الوردي سبعة على عشرة.', show:['g','e'] },
      { say:'وهذه حيلة مفيدة عندما يكون عدّ المطلوب طويلًا، وعدّ عكسه سهلًا.', show:['h'] },
    ]},
  { t:'دورك: ألا تكون حمراء',
    items:Object.assign({ t1:{type:'text',x:320,y:76,s:22,text:'في صندوق: ٤ حمراء، ٦ صفراء، ٢ زرقاء'},
      t2:{type:'text',x:320,y:142,s:20,text:'ما احتمال ألا تكون الكرة المسحوبة حمراء؟',cls:'t-ink2'},
      r1:{type:'box',x:220,y:190,w:200,h:60,c:'n0',text:'٨/١٢ = ٢/٣',s:32,cls:'t-note'}, r2:{type:'text',x:320,y:292,s:24,text:'أو: ١ − ٤/١٢ = ٢/٣',cls:'t-ink2'} }, balls),
    beats:[
      { say:'دورك. في صندوق أربع كرات حمراء، وست صفراء، وكرتان زرقاوان.', show:['t1',...Object.keys(balls)], gap:.05 },
      { say:'سحبنا كرة عشوائيًا. ما احتمال ألا تكون حمراء؟', show:['t2'] },
    ],
    ask:{ opts:['١/٣','٢/٣','٨/١٠','٤/٨'], a:1,
      right:'أحسنت! غير الحمراء ثماني كرات من اثنتي عشرة، أي ثلثان.',
      wrong:'الكرات كلها اثنتا عشرة، وغير الحمراء ثمانٍ، فالاحتمال ثمانية على اثني عشر، أي ثلثان.',
      show:['r1','r2'] } },
  ],
  quiz:[
    {q:'رُمي حجر نرد مرة واحدة. ما احتمال ظهور عدد زوجي أكبر من ٢؟', o:['١/٢','١/٣','١/٦','٢/٣'], a:1, e:'الحالات المطلوبة ٤ و٦ فقط، أي ٢ من ٦ = ١/٣.'},
    {q:'إذا كان احتمال نجاح خطة ٠٫٦٥، فما احتمال فشلها؟', o:['٠٫٦٥','٠٫٤٥','٠٫٣٥','١٫٦٥'], a:2, e:'المتمّم: ١ − ٠٫٦٥ = ٠٫٣٥.'},
    {q:'أيّ القيم التالية لا يمكن أن تكون احتمالًا؟', o:['٠','٠٫٩٩','٥/٤','١'], a:2, e:'٥/٤ أكبر من ١، والاحتمال لا يزيد على ١.'},
  ] });

/* ================= 3. charts & tables ================= */
const DAYS=['الثلاثاء','الاثنين','الأحد','السبت'], SALES=[40,15,30,20];
const tb={}; const TH=['اليوم','السبت','الأحد','الاثنين','الثلاثاء'], TV=['المبيعات','٢٠','٣٠','١٥','٤٠'];
TH.forEach((h,i)=>{ const x=470-100*i; tb['h'+i]={type:'box',x,y:64,w:100,h:36,rx:6,c:'prisoft',text:h,s:18,cls:'t-pri'}; tb['v'+i]={type:'box',x,y:100,w:100,h:36,rx:6,c:'surface',text:TV[i],s:i?22:18}; });
const tk=[].concat(...TH.map((_,i)=>['h'+i,'v'+i]));
add({ key:'st-charts', sk:'stats', ord:30, title:'قراءة الرسوم البيانية والجداول', min:'٤ دقائق',
  goals:['تقرأ العنوان والمحاور والوحدة قبل الحساب','تحسب نسبة التغير من القيمة القديمة','تحوّل قطاع الدائرة إلى نسبة وقيمة وزاوية','تستخرج المطلوب من جدول بسرعة'],
  scenes:[
  { t:'الأعمدة: اقرأ قبل أن تحسب',
    items:{ bars:{type:'bars',x:60,y:90,w:320,h:200,values:SALES,labels:DAYS,max:40,c:'pri'},
      unit:{type:'text',x:510,y:100,s:20,text:'المبيعات بالآلاف',cls:'t-ink2'},
      hi:{type:'note',x:510,y:165,w:180,h:54,c:'n3',text:'الأعلى: ٤٠',size:24,rot:-2}, lo:{type:'note',x:510,y:235,w:180,h:54,c:'n1',text:'الأقل: ١٥',size:24,rot:2},
      d:{type:'text',x:510,y:312,s:28,text:'٤٠ − ١٥ = ٢٥',cls:'t-pri'} },
    beats:[
      { say:'قبل أي حساب، اقرأ العنوان والمحورين والوحدة: ماذا يمثل كل عمود؟', show:['bars','unit'] },
      { say:'هنا مبيعات متجر بالآلاف في أربعة أيام. أعلى عمود يوم الثلاثاء: أربعون ألفًا.', show:['hi'] },
      { say:'وأقلها يوم الاثنين: خمسة عشر ألفًا.', show:['lo'] },
      { say:'والفرق بينهما أربعون ناقص خمسة عشر، أي خمسة وعشرون ألفًا.', show:['d'] },
    ]},
  { t:'نسبة التغير',
    items:{ bars:{type:'bars',x:40,y:100,w:300,h:190,values:SALES,labels:DAYS,max:40,c:['surface2','surface2','pink','pink']},
      e1:{type:'text',x:495,y:108,s:24,text:'الفرق: ٣٠ − ٢٠ = ١٠'}, e2:{type:'text',x:495,y:170,s:34,text:'١٠ ÷ ٢٠ = ٥٠٪',cls:'t-pri'},
      w:{type:'text',x:495,y:236,s:34,text:'١٠ ÷ ٣٠ ≈ ٣٣٪',cls:'t-bad'},
      rule:{type:'note',x:500,y:308,w:230,h:52,c:'n0',text:'اقسم على القديمة',size:22,rot:-1} },
    beats:[
      { say:'سؤال متكرر: ما نسبة الزيادة من يوم السبت إلى يوم الأحد؟', show:['bars'] },
      { say:'أولًا الفرق: ثلاثون ناقص عشرين يساوي عشرة.', show:['e1'] },
      { say:'ثم نقسم الفرق على القيمة القديمة: عشرة على عشرين نصف، أي خمسون في المئة.', show:['e2'] },
      { say:'والفخ: القسمة على القيمة الجديدة تعطي ثلاثة وثلاثين في المئة تقريبًا، وهي خطأ.', show:['w','rule'], strike:['w'] },
    ]},
  { t:'الدائرة: حصة من الكل',
    items:{ p0:{type:'pie',cx:180,cy:205,r:112,parts:10,fill:0}, p3:{type:'pie',cx:180,cy:205,r:112,parts:10,fill:3,c:'pink'},
      l:{type:'text',x:470,y:115,s:28,text:'الطعام = ٣٠٪'},
      e1:{type:'text',x:470,y:185,s:28,text:'٣٠٪ من ٨٠٠٠ = ٢٤٠٠',cls:'t-pri'},
      e2:{type:'text',x:470,y:255,s:28,text:'٣ × ٣٦° = ١٠٨°'}, n:{type:'text',x:470,y:300,s:20,text:'الدائرة كلها ٣٦٠°',hand:true} },
    beats:[
      { say:'الدائرة البيانية تعرض أجزاء من كل، والدائرة كلها مئة في المئة. هنا قسّمناها عشر شرائح.', show:['p0'] },
      { say:'هذه ميزانية أسرة، والطعام ثلاث شرائح من عشر، أي ثلاثون في المئة.', hide:['p0'], show:['p3','l'] },
      { say:'فإن كانت الميزانية ثمانية آلاف ريال، فالطعام ثلاثون في المئة منها: ألفان وأربعمئة.', show:['e1'] },
      { say:'وللزاوية: الدائرة ثلاثمئة وستون درجة، فكل شريحة ست وثلاثون، والطعام مئة وثماني درجات.', show:['e2','n'] },
    ]},
  { t:'دورك: من الجدول',
    items:Object.assign({}, tb, { r:{type:'box',x:110,y:186,w:420,h:64,c:'n0',text:'(٣٠ − ١٥) ÷ ٣٠ = ٥٠٪',s:34,cls:'t-note'}, ck:{type:'check',x:320,y:292} }),
    beats:[
      { say:'دورك. هذا الجدول يعرض المبيعات نفسها بالآلاف.', show:tk, gap:.06 },
      { say:'ما نسبة النقص من يوم الأحد إلى يوم الاثنين؟', hl:['v2','v3'] },
    ],
    ask:{ opts:['٥٠٪','١٥٪','١٠٠٪','٣٣٪'], a:0,
      right:'صحيح! النقص خمسة عشر، ونقسمه على القيمة القديمة ثلاثين، فيكون نصفًا، أي خمسين في المئة.',
      wrong:'النقص ثلاثون ناقص خمسة عشر يساوي خمسة عشر، ونقسمه على القيمة القديمة ثلاثين، فنحصل على نصف، أي خمسين في المئة.',
      show:['r','ck'] } },
  ],
  quiz:[
    {q:'في دائرة بيانية تمثل ٦٠٠ طالب، قطاع الرياضيات زاويته ٩٠°. كم طالبًا يفضّل الرياضيات؟', o:['٩٠','١٥٠','٢٠٠','٢٤٠'], a:1, e:'٩٠° ربع الدائرة، وربع ٦٠٠ = ١٥٠.'},
    {q:'ارتفعت المبيعات من ٤٠ ألفًا إلى ٥٠ ألفًا. ما نسبة الزيادة؟', o:['٢٠٪','١٠٪','٢٥٪','٥٠٪'], a:2, e:'الفرق ١٠، ونقسمه على القديم ٤٠: ١٠ من ٤٠ = ٢٥٪.'},
    {q:'جدول: الفصل (أ) ١٨ طالبًا، (ب) ٢٢، (ج) ٢٠. ما نسبة طلاب الفصل (ب) من المجموع تقريبًا؟', o:['٢٢٪','٣٣٪','٣٧٪','٤٤٪'], a:2, e:'المجموع ٦٠، و٢٢ من ٦٠ ≈ ٣٦٫٧٪، أي ٣٧٪ تقريبًا.'},
  ] });
})();
/* ============ STATE ============ */
const KEY='masar100_v1';
const todayStr=()=>new Date().toISOString().slice(0,10);
const addDays=(d,n)=>{ const x=new Date(d+'T12:00:00'); x.setDate(x.getDate()+n); return x.toISOString().slice(0,10); };
const DEF=()=>({lang:'ar',track:'sci',target:100,examDate:'',weeks:8,planStart:todayStr(),done:{},stats:{},recent:[],attempts:[],mistakes:[],days:[],sessionDays:[],vocab:{ar:{},en:{}},cards:{},models:{},xp:{},causes:{concept:0,careless:0,time:0,trap:0}});
let S=(()=>{ try{ let r=localStorage.getItem(KEY); if(!r){ const old=localStorage.getItem('masar95_v1'); if(old){ const o=JSON.parse(old); o.target=100; (o.mistakes||[]).forEach(m=>{m.box=0;m.due=todayStr();}); return Object.assign(DEF(),o);} }
  if(r) return Object.assign(DEF(),JSON.parse(r)); }catch(e){} return DEF(); })();
let STORE_OK=(()=>{ try{ localStorage.setItem('__t','1'); localStorage.removeItem('__t'); return true; }catch(e){ return false; } })(), PERSIST=false;
try{ navigator.storage?.persisted?.().then(v=>{ PERSIST=v; if(!v&&navigator.storage.persist) navigator.storage.persist().then(x=>PERSIST=x).catch(()=>{}); }).catch(()=>{}); }catch(e){}
const save=()=>{ S.savedAt=Date.now(); try{ localStorage.setItem(KEY,JSON.stringify(S)); STORE_OK=true; }catch(e){ STORE_OK=false; } try{ window.CLOUD?.queue?.(); }catch(e){} const el=document.getElementById('save-dot'); if(el){ el.classList.toggle('bad',!STORE_OK); el.title=STORE_OK?t('savedOk'):t('saveFail'); } };
const t=k=>{ const p=k.split('.'); let o=T[S.lang]; for(const x of p) o=o?.[x]; return o??k; };
const L=o=>o&&typeof o==='object'&&('ar' in o)?o[S.lang]:o;
/* local strings owned by app.js (added only where ui.js does not define them yet) */
const T2={
  ar:{emptyT:'لا توجد بيانات بعد',emptyD:'هذه الصفحة تعرض أرقامك الحقيقية فقط: الدرجة التقديرية والدقة والزمن ومستوى كل مهارة. ابدأ بالاختبار التشخيصي (٢٠ سؤالًا · ٢٠ دقيقة) لتحديد نقطة البداية.',
    recoStartH:'ابدأ بالاختبار التشخيصي',recoStartP:'يقيس مستواك في المهارات العشر، ثم تُبنى خطتك وجلساتك اليومية عليه.',greetN:n=>'هدفك '+n,
    finishQ:'إنهاء الاختبار وعرض النتيجة؟',endSecQ:'إنهاء هذا القسم والانتقال إلى التالي؟',curPwWrong:'كلمة المرور الحالية غير صحيحة.',gateT:'سجّل لتبدأ',gateMsg:'أنشئ حسابك المجاني مرة واحدة قبل أول اختبار، لتُحفظ نتائجك وأخطاؤك وتقدمك في حسابك وتتابعها من أي جهاز. بعدها تبدأ الاختبار مباشرة.',gateLater:'لاحقًا',
    signedOut:'سجّلت الخروج. تقدمك محفوظ في حسابك وأُزيل من هذا الجهاز؛ ادخل من جديد لمتابعته.',
    importQ:'سيحلّ التقدم الموجود في الملف أو الرمز محلّ تقدمك الحالي على هذا الجهاز. متابعة؟',importYes:'نعم، استورد',copyManual:'انسخ الرمز الظاهر في المربع',
    resumeT:'لديك اختبار لم يكتمل',resumeD:(ti,q,n)=>`«${ti}» · توقفت عند السؤال ${q} من ${n}. الوقت متوقف حتى تكمل.`,resumeBtn:'أكمل الاختبار',discardBtn:'تجاهله',resumed:'عدت إلى اختبارك',
    summaryOnly:'ملخص فقط',saved:'تم الحفظ',
    authErr:{'sync-first':'تعذّرت مزامنة آخر تقدمك، فلم نسجّل خروجك حتى لا يضيع. تحقق من الاتصال ثم حاول مجددًا.'}},
  en:{emptyT:'No data yet',emptyD:'This page shows only your real numbers: estimated score, accuracy, time and each skill level. Start with the diagnostic (20 questions · 20 minutes) to set your baseline.',
    recoStartH:'Start with the diagnostic',recoStartP:'It measures your level in all ten skills; your plan and daily sessions are built on it.',greetN:n=>'Your target: '+n,
    finishQ:'Finish the test and see your result?',endSecQ:'End this section and move to the next one?',curPwWrong:'Your current password is incorrect.',gateT:'Sign up to start',gateMsg:'Create your free account once before your first test, so your results, mistakes and progress are saved to your account and follow you on any device. Your test starts right after.',gateLater:'Not now',
    signedOut:'Signed out. Your progress is saved in your account and was removed from this device; sign in again to continue.',
    importQ:'The progress in this file or code will replace your current progress on this device. Continue?',importYes:'Yes, import',copyManual:'Copy the code shown in the box',
    resumeT:'You have an unfinished test',resumeD:(ti,q,n)=>`“${ti}” · you stopped at question ${q} of ${n}. The clock is paused until you continue.`,resumeBtn:'Continue the test',discardBtn:'Discard it',resumed:'Back to your test',
    summaryOnly:'Summary only',saved:'Saved',
    authErr:{'sync-first':'Your latest progress could not be synced, so you were not signed out to avoid losing it. Check your connection and try again.'}}
};
(()=>{ for(const l of ['ar','en']){ const d=T[l]; for(const [k,v] of Object.entries(T2[l])){ if(v&&typeof v==='object'&&!Array.isArray(v)&&typeof v!=='function'){ d[k]=d[k]||{}; for(const [k2,v2] of Object.entries(v)) if(!(k2 in d[k])) d[k][k2]=v2; } else if(!(k in d)) d[k]=v; } } })();
const $=s=>document.querySelector(s);
const dateH=d=>`<bdi dir="ltr" class="num">${numL(d||'')}</bdi>`;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function M(str){ return String(str).replace(/⟦(.+?)⟧/g,(_,m)=>{ m=m.replace(/\^\(([^)]+)\)/g,'<sup>$1</sup>').replace(/\^([0-9A-Za-z؀-ۿ−-]+)/g,'<sup>$1</sup>'); m=m.replace(/([\u0600-\u06FF]+)/g,'$1\u200E'); return `<span class="m" dir="ltr">${m}</span>`; }); }
const numL=n=>S.lang==='ar'?String(n).replace(/\d/g,d=>'٠١٢٣٤٥٦٧٨٩'[d]):String(n);
const stem=q=>M(q.includes('<br>')?q:esc(q));
const optH=o=>M(String(o).startsWith('⟦')?o:esc(o));

/* ============ MODEL ============ */
const W=()=>S.track==='sci'?{V:.55,Q:.45}:{V:.75,Q:.25};
function areaAcc(area,list){ const r=list.filter(x=>SKILLS[x.s]?.area===area).slice(-80); return r.length?r.filter(x=>x.ok).length/r.length:null; }
function estimate(list=S.recent){ const v=areaAcc('V',list),q=areaAcc('Q',list); if(v==null&&q==null) return null; const w=W(); return Math.round(100*(w.V*(v??q)+w.Q*(q??v))); }
function skillInfo(s,recent=S.recent){
  const r=recent.filter(x=>x.s===s).slice(-20); const n=r.length; if(!n) return {s,n:0,acc:null,time:null,level:0};
  const acc=r.filter(x=>x.ok).length/n, time=r.reduce((a,x)=>a+(x.t||0),0)/n, T0=TARGET_T[s];
  let level=2; if(n<5||acc<.7) level=1; else if(n>=20&&acc>=.95&&time<=T0) level=4; else if(n>=10&&acc>=.85&&time<=T0*1.25) level=3;
  return {s,n,acc,time,level};
}
const ALL_SKILLS=[...V_SKILLS,...Q_SKILLS];
const isMock=a=>a.kind==='mock'||a.kind==='model';
function dueList(lang=S.lang){ const d=todayStr(); return S.mistakes.filter(m=>m.lang===lang&&(m.due||d)<=d); }
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
function takeVerbal(skill,n,lang,used){
  const pool=bank(lang).filter(x=>x.s===skill); const out=[];
  const g=VGEN[skill]; const nGen=g?Math.round(n*g[1]):0;
  for(let i=0;i<nGen;i++) out.push(g[0](lang));
  if(ROT) return shuffle(out.concat(rotTake(lang+skill,pool,n-nGen,(n-nGen)*ROT.vs)));
  let fresh=shuffle(pool.filter(x=>!used.has(x)));
  while(out.length<n){ if(!fresh.length) fresh=shuffle(pool); const x=fresh.pop(); used.add(x); out.push(x); }
  return shuffle(out);
}
function takeReading(np,lang,used){
  const b=bank(lang).filter(x=>x.s==='reading'); let keys;
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
function modelSections(k,lang){
  const ord=S.track==='sci'?['V','Q','V','Q']:['V','V','Q','V'];
  ROT={k,c:{},vs:ord.filter(x=>x==='V').length,qs:ord.filter(x=>x==='Q').length}; const prev=rnd; rnd=mulberry(90001+k*7919+(S.track==='sci'?0:500)+(lang==='ar'?0:250));
  try{ const u=new Set(); return ord.map(a=>({a,qs:a==='V'?verbalSection(lang,u):quantSection(lang,u)})); } finally { rnd=prev; ROT=null; }
}
function buildSkill(skill,n,lang,used=new Set()){
  let raws; if(SKILLS[skill].area==='V') raws= skill==='reading'? shuffle(takeReading(Math.ceil(n/4)+1,lang,used)).slice(0,n) : takeVerbal(skill,n,lang,used); else raws=takeQuant(skill,n,used);
  return raws.map(r=>materialize(r,lang));
}
function verbalSection(lang,used){ const rd=takeReading(2,lang,used); let qs=[]; [['analogy',6],['completion',5],['context',3],['odd',2]].forEach(([s,n])=>qs=qs.concat(takeVerbal(s,n,lang,used)));
  let gap=24-qs.length-rd.length; while(gap>0){ qs.push(gap%2?genAnalogy(lang):genProverb(lang)); gap--; }
  return shuffle(qs).concat(rd).map(r=>materialize(r,lang)); }
function quantSection(lang,used){ const mix=S.track==='sci'?[['arith',7],['algebra',5],['geometry',5],['stats',3],['comparison',4]]:[['arith',9],['algebra',2],['geometry',5],['stats',4],['comparison',4]]; let qs=[]; mix.forEach(([s,n])=>qs=qs.concat(takeQuant(s,n,used))); return shuffle(qs).map(r=>materialize(r,lang)); }
function diagSet(lang){ const u=new Set(); let v=[]; [['analogy',2],['completion',2],['context',2],['odd',1]].forEach(([s,n])=>v=v.concat(takeVerbal(s,n,lang,u))); v=shuffle(v).concat(takeReading(1,lang,u).slice(0,3)); let q=[]; [['arith',3],['algebra',2],['geometry',2],['stats',1],['comparison',2]].forEach(([s,n])=>q=q.concat(takeQuant(s,n,u))); return shuffle(q).map(r=>materialize(r,lang)).concat(v.map(r=>materialize(r,lang))); }
function sessionPlan(lang=S.lang){ const due=dueList(lang).slice(0,8); const weak=rankSkills().slice(0,2).map(x=>x.s); return {due,weak,nWeak:10,nMix:25-due.length-10}; }
function sessionSet(lang){
  const p=sessionPlan(lang), used=new Set(); let qs=p.due.map(m=>({...m}));
  p.weak.forEach(s=>qs=qs.concat(buildSkill(s,5,lang,used)));
  const pool=rankSkills(); const w=pool.map(x=>x.level<4?3:1); const tot=w.reduce((a,b)=>a+b,0);
  for(let i=0;i<p.nMix;i++){ let r=Math.random()*tot,k=0; while(k<w.length-1&&r>w[k]){ r-=w[k]; k++; } qs=qs.concat(buildSkill(pool[k].s,1,lang,used)); }
  return shuffle(qs);
}
const qKey=q=>q.q+'|'+q.opts[q.ans]+'|'+(q.pkey||'');

/* ============ TEST ENGINE ============ */
let X=null,timer=null;
let PEND=null;
/* accounts build: a student must sign up (or sign in) before starting any test or practice */
function authGate(kind,o){ const C=window.CLOUD; if(!C||C.user) return false;
  if(C.ready===false){ setTimeout(()=>startTest(kind,o),300); return true; }
  PEND={kind,o}; AC.tab='signup'; AC.gate=true; openAcct(); return true; }
function startTest(kind,o={}){
  if(authGate(kind,o)) return;
  const lang=S.lang,used=new Set(); let sections=[],title='',mode='exam';
  const sec=(name,qs,min)=>({name,qs,left:Math.round(min*60),ans:Array(qs.length).fill(null),flag:Array(qs.length).fill(false),tsp:Array(qs.length).fill(0),locked:Array(qs.length).fill(false)});
  if(kind==='diag'){ title=t('pDiag'); sections=[sec(title,diagSet(lang),20)]; }
  else if(kind==='verbal'){ title=t('pVerbal'); sections=[sec(title,verbalSection(lang,used),25)]; }
  else if(kind==='quant'){ title=t('pQuant'); sections=[sec(title,quantSection(lang,used),25)]; }
  else if(kind==='mock'){ title=t('pMock'); const ord=S.track==='sci'?['V','Q','V','Q']:['V','V','Q','V'];
    sections=ord.map((a,i)=>sec(`${t('sectionLabel')} ${numL(i+1)} · ${a==='V'?t('verbal'):t('quant')}`,a==='V'?verbalSection(lang,used):quantSection(lang,used),25)); }
  else if(kind==='model'){ title=`${t('model')} ${numL(o.k+1)}`; sections=modelSections(o.k,lang).map((x,i)=>sec(`${t('sectionLabel')} ${numL(i+1)} · ${x.a==='V'?t('verbal'):t('quant')}`,x.qs,25)); }
  else if(kind==='skill'){ mode='learn'; title=SKILLS[o.skill][lang]; sections=[sec(title,buildSkill(o.skill,10,lang,used),15)]; }
  else if(kind==='session'){ mode='learn'; title=t('sessionTitle'); sections=[sec(title,sessionSet(lang),32)]; }
  else if(kind==='review'){ const d=dueList(lang).slice(0,20); if(!d.length){ toast(t('noDue')); return; } mode='learn'; title=t('pReview'); sections=[sec(title,d.map(m=>({...m})),Math.max(5,d.length*1.5))]; }
  X={kind,title,mode,sections,si:0,qi:0,lang,task:o.task||null,skill:o.skill||null,mk:o.k,qStart:Date.now(),confirm:null,showMap:false};
  try{ document.activeElement?.blur?.(); }catch(e){}
  document.body.classList.add('exam-open'); $('#exam').hidden=false;
  clearInterval(timer); timer=setInterval(tick,1000); renderExam();
}
const cur=()=>X.sections[X.si];
const clock=s=>{ s=Math.max(0,Math.round(s)); return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`; };
function tick(){ if(!X||X.result||X.reviewOnly) return; const s=cur(); s.left--; if(s.left%10===0) saveLive(); const el=$('#ex-timer'); if(el){ el.textContent=clock(s.left); el.classList.toggle('low',s.left<=180); } if(s.left<=0){ toast(t('timeUp')); closeSection(); } }
function logTime(){ const s=cur(); const n=Date.now(); if(!s.locked[X.qi]) s.tsp[X.qi]+=(n-X.qStart)/1000; X.qStart=n; }
function go(i){ logTime(); X.qi=Math.max(0,Math.min(cur().qs.length-1,i)); X.confirm=null; X.showMap=false; renderExam(); $('#exam').scrollTop=0; }
function choose(k){ const s=cur(); if(s.locked[X.qi]) return; s.ans[X.qi]=k; if(X.mode==='learn'){ logTime(); s.locked[X.qi]=true; } renderExam(); }
function closeSection(){ logTime(); X.confirm=null; if(X.si<X.sections.length-1){ X.si++; X.qi=0; X.qStart=Date.now(); renderExam(); } else finishTest(); }
function quitTest(){ clearInterval(timer); clearLive(); X=null; $('#exam').hidden=true; document.body.classList.remove('exam-open'); }
function finishTest(){
  if(!X||X.result||X.reviewOnly) return;
  clearInterval(timer); clearLive(); const d=todayStr(); const INT=[1,3,7,14];
  const all=[]; X.sections.forEach(s=>s.qs.forEach((q,i)=>all.push({q,your:s.ans[i],time:s.tsp[i]})));
  const bySkill={};
  all.forEach(({q,your,time})=>{
    const ok=your===q.ans, st=S.stats[q.s]||(S.stats[q.s]={c:0,t:0,time:0}); st.t++; st.time+=time; if(ok) st.c++;
    S.recent.push({s:q.s,ok,t:Math.round(time),d}); const b=bySkill[q.s]||(bySkill[q.s]={c:0,t:0}); b.t++; if(ok) b.c++;
    const key=q.key||qKey(q); q.key=key; const m=S.mistakes.find(x=>x.key===key);
    if(ok&&m){ if((m.due||d)<=d){ m.box=(m.box||0)+1; if(m.box>=4) S.mistakes=S.mistakes.filter(x=>x!==m); else m.due=addDays(d,INT[m.box]); } }
    else if(!ok){ if(m){ m.box=0; m.due=addDays(d,1); } else S.mistakes.push({key,s:q.s,area:q.area,q:q.q,passage:q.passage,pkey:q.pkey,opts:q.opts,ans:q.ans,exp:q.exp,cmp:q.cmp,lang:X.lang,box:0,due:addDays(d,1)}); }
  });
  if(S.recent.length>1500) S.recent=S.recent.slice(-1500); if(S.mistakes.length>300) S.mistakes=S.mistakes.slice(-300);
  const correct=all.filter(x=>x.your===x.q.ans).length, skipped=all.filter(x=>x.your==null).length;
  const est=['diag','mock','model','verbal','quant'].includes(X.kind)?estimate(all.map(x=>({s:x.q.s,ok:x.your===x.q.ans}))):null;
  const att={id:Date.now().toString(36),date:d,kind:X.kind,skill:X.skill,mk:X.kind==='model'?X.mk+1:undefined,correct,total:all.length,pct:Math.round(100*correct/Math.max(1,all.length)),est,time:Math.round(all.reduce((a,x)=>a+x.time,0))};
  S.attempts.push(att); if(S.attempts.length>300) S.attempts=S.attempts.slice(-300);
  if(!S.days.includes(d)) S.days.push(d); if(X.kind==='session'&&!S.sessionDays.includes(d)) S.sessionDays.push(d);
  if(X.task) S.done[X.task]=true;
  if(X.kind==='model'){ const m=S.models[X.mk]||{}; m.last=att.pct; m.est=est; m.best=Math.max(m.best||0,att.pct); m.date=d; m.aid=att.id; S.models[X.mk]=m; }
  saveDetail(att,all);
  save();
  X.result={all,bySkill,correct,skipped,att,filter:'wrong'}; renderExam(); renderRoute(); toast(STORE_OK?t('resultSaved'):t('saveFail'));
}

function renderExam(){
  const el=$('#exam'); if(!X) return; el.dir=X.lang==='ar'?'rtl':'ltr'; el.lang=X.lang; el.setAttribute('role','dialog'); el.setAttribute('aria-modal','true'); el.setAttribute('aria-label',X.title||t('brand'));
  if(X.result) return renderResult(el);
  saveLive();
  const s=cur(), q=s.qs[X.qi], tt=T[X.lang], L4=tt.letters, locked=s.locked[X.qi], a=s.ans[X.qi];
  const answered=s.ans.filter(x=>x!=null).length, last=X.qi===s.qs.length-1, lastSec=X.si===X.sections.length-1;
  const pct=Math.round(100*(X.qi+1)/s.qs.length);
  const optClass=k=>{ if(X.mode==='learn'&&locked){ if(k===q.ans) return 'right'; if(k===a) return 'wrong'; return 'dim'; } return a===k?'sel':''; };
  el.innerHTML=`
  <div class="ex-top">
    <button class="icon-btn" id="ex-quit" aria-label="${tt.quit}">${ICON.x}</button>
    <div class="ex-title"><strong>${esc(X.title)}</strong><span>${s.name!==X.title?esc(s.name)+' · ':''}${tt.q} ${numL(X.qi+1)} ${tt.of} ${numL(s.qs.length)}</span></div>
    <div class="ex-timer ${s.left<=180?'low':''}" id="ex-timer">${clock(s.left)}</div>
  </div>
  <div class="ex-bar"><span style="inline-size:${pct}%"></span></div>
  ${X.confirm?`<div class="ex-confirm"><p>${X.confirm==='quit'?tt.quitConfirm:`<b>${lastSec?tt.finishQ:tt.endSecQ}</b> ${X.sections.length>1&&!lastSec?tt.confirmEnd:''} ${s.qs.length-answered?`${numL(s.qs.length-answered)} ${tt.unanswered}.`:''}`}</p><div class="row"><button class="btn ${X.confirm==='quit'?'danger':'primary'}" id="cf-yes">${X.confirm==='quit'?tt.yesQuit:(lastSec?tt.finishTest:tt.yesEnd)}</button><button class="btn ghost" id="cf-no">${tt.cancel}</button></div></div>`:''}
  ${X.showMap?`<div class="ex-mapwrap"><div class="ex-map">${s.qs.map((_,i)=>`<button class="dot ${i===X.qi?'cur':''} ${s.ans[i]!=null?'ans':''} ${s.flag[i]?'fl':''}" data-i="${i}">${numL(i+1)}</button>`).join('')}</div></div>`:''}
  <div class="ex-body ${q.passage?'with-passage':''}">
    ${q.passage?`<aside class="ex-passage"><div class="eyebrow">${tt.passage}</div><p>${esc(q.passage)}</p></aside>`:''}
    <section class="ex-q">
      <div class="ex-qhead"><span class="chip">${SKILLS[q.s][X.lang]}</span>${q.box!=null?`<span class="chip sand">${tt.kinds.review}</span>`:''}</div>
      <div class="ex-stem ${q.s==='analogy'?'analogy':''}">${stem(q.q)}</div>
      <div class="ex-opts">${q.opts.map((o,k)=>`<button class="opt ${optClass(k)}" data-k="${k}" ${locked?'disabled':''}><span class="bub">${L4[k]}</span><span class="otx">${optH(o)}</span></button>`).join('')}</div>
      ${X.mode==='learn'&&locked?`<div class="fb ${a===q.ans?'ok':'bad'}"><strong>${a===q.ans?tt.correctFb:tt.wrongFb+': '+L4[q.ans]}</strong><p>${M(esc(q.exp))}</p></div>`:''}
    </section>
  </div>
  <div class="ex-foot"><div class="ex-foot-in">
    <button class="btn ghost" id="ex-prev" ${X.qi===0?'disabled':''}>${tt.prev}</button>
    ${X.mode==='exam'?`<button class="btn ghost ${s.flag[X.qi]?'flagged':''}" id="ex-flag">${s.flag[X.qi]?tt.flagged:tt.flag}</button>`:''}
    <button class="btn ghost" id="ex-map">${tt.map}</button>
    ${last?`<button class="btn primary" id="ex-end">${lastSec?tt.finishTest:tt.finishSection}</button>`:`<button class="btn primary" id="ex-next">${tt.next}</button>`}
  </div></div>`;
  el.querySelectorAll('.opt').forEach(b=>b.onclick=()=>choose(+b.dataset.k));
  el.querySelectorAll('.dot').forEach(b=>b.onclick=()=>go(+b.dataset.i));
  const on=(id,f)=>{ const b=el.querySelector(id); if(b) b.onclick=f; };
  on('#ex-prev',()=>go(X.qi-1)); on('#ex-next',()=>go(X.qi+1));
  on('#ex-flag',()=>{ s.flag[X.qi]=!s.flag[X.qi]; renderExam(); });
  on('#ex-map',()=>{ X.showMap=!X.showMap; renderExam(); });
  on('#ex-end',()=>{ X.confirm='end'; renderExam(); }); on('#ex-quit',()=>{ X.confirm='quit'; renderExam(); });
  on('#cf-no',()=>{ X.confirm=null; renderExam(); }); on('#cf-yes',()=>X.confirm==='quit'?quitTest():closeSection());
}
document.addEventListener('keydown',e=>{
  if(!X||X.result||/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
  const map={'1':0,'2':1,'3':2,'4':3,'a':0,'b':1,'c':2,'d':3,'أ':0,'ب':1,'ج':2,'د':3};
  if(X.confirm||e.ctrlKey||e.metaKey||e.altKey) return;
  if(e.key in map){ e.preventDefault(); choose(map[e.key]); }
  else if(e.key==='Enter'){ e.preventDefault(); if(X.qi<cur().qs.length-1) go(X.qi+1); }
  else if(e.key==='ArrowLeft'){ e.preventDefault(); go(X.qi+(X.lang==='ar'?1:-1)); } else if(e.key==='ArrowRight'){ e.preventDefault(); go(X.qi+(X.lang==='ar'?-1:1)); }
});
function renderResult(el){
  const r=X.result,tt=T[X.lang],a=r.att,L4=tt.letters; const avg=a.total?Math.round(a.time/a.total):0;
  const list=r.all.map((x,i)=>({...x,i})).filter(x=>r.filter==='all'||x.your!==x.q.ans);
  el.innerHTML=`
  <div class="ex-top"><div class="ex-title"><strong>${esc(X.title)}</strong><span>${X.reviewOnly?tt.reviewOf+' '+dateH(a.date):tt.resultTitle}</span></div>${X.reviewOnly&&X.kind==='model'?`<button class="btn ghost sm" id="rs-retake">${tt.retake}</button>`:''}<button class="btn primary sm" id="rs-close">${tt.done}</button></div>
  <div class="rs">
    <div class="rs-head card">${ring(a.pct,'%',120)}<div class="rs-kpis">
      <div><b class="num">${numL(a.correct)}</b><span>${tt.correct}</span></div><div><b class="num">${r.skipped==null?'—':numL(a.total-a.correct-r.skipped)}</b><span>${tt.wrong}</span></div>
      <div><b class="num">${r.skipped==null?'—':numL(r.skipped)}</b><span>${tt.skipped}</span></div><div><b class="num">${numL(avg)}${tt.sec}</b><span>${tt.avgTime}</span></div>
      ${a.est!=null?`<div><b class="num">${numL(a.est)}</b><span>${tt.estGat}</span></div>`:''}</div></div>
    ${r.noDetail?`<section class="card"><h3>${tt.summaryOnly}</h3><p class="muted">${tt.noDetail}</p></section>`:`<section class="card"><h3>${tt.bySkill}</h3>${Object.entries(r.bySkill).map(([s,b])=>barRow(SKILLS[s][X.lang],b.c/b.t,`${numL(b.c)}/${numL(b.t)}`)).join('')}</section>
    <div class="rs-rev-head"><h3>${tt.review}</h3><div class="seg"><button class="${r.filter==='wrong'?'on':''}" data-f="wrong">${tt.onlyWrong}</button><button class="${r.filter==='all'?'on':''}" data-f="all">${tt.all}</button></div></div>
    <div class="rev-list">${list.map(x=>{ const ok=x.your===x.q.ans; const m=S.mistakes.find(z=>z.key===x.q.key); return `
      <article class="rev ${ok?'ok':'bad'}">
        <div class="rev-h"><span class="muted small">${tt.q} ${numL(x.i+1)}</span><span class="chip">${SKILLS[x.q.s][X.lang]}</span></div>
        ${x.q.passage?`<details class="rev-p"><summary>${tt.passage}</summary><p>${esc(x.q.passage)}</p></details>`:''}
        <div class="rev-stem">${stem(x.q.q)}</div>
        <ul class="rev-opts">${x.q.opts.map((o,k)=>`<li class="${k===x.q.ans?'right':''} ${k===x.your&&!ok?'yours':''}"><span class="bub">${L4[k]}</span><span>${optH(o)}</span>${k===x.q.ans?`<em>${tt.rightAns}</em>`:''}${k===x.your&&!ok?`<em>${tt.yourAns}</em>`:''}</li>`).join('')}</ul>
        <p class="rev-exp"><strong>${tt.explain}:</strong> ${M(esc(x.q.exp))}</p>
        ${!ok&&m?`<div class="cause"><span class="small muted">${tt.causeQ}</span><div class="chips">${Object.entries(tt.causes).map(([k,v])=>`<button class="cchip ${m.cause===k?'on':''}" data-i="${x.i}" data-c="${k}">${v}</button>`).join('')}</div></div>`:''}
        ${sampleFn?`<div class="ai-slot"><button class="btn ghost sm ai-btn" data-i="${x.i}">${ICON.spark} ${tt.askAI}</button><div class="ai-out" id="ai-${x.i}"></div></div>`:''}
      </article>`; }).join('')||`<p class="muted">${tt.none}</p>`}</div>`}
  </div>`;
  el.querySelector('#rs-close').onclick=quitTest; const rt=el.querySelector('#rs-retake'); if(rt) rt.onclick=()=>{ const k=X.mk; quitTest(); startTest('model',{k}); };
  el.querySelectorAll('.seg button').forEach(b=>b.onclick=()=>{ r.filter=b.dataset.f; renderResult(el); });
  el.querySelectorAll('.ai-btn').forEach(b=>b.onclick=()=>explainAI(r.all[+b.dataset.i],+b.dataset.i,b));
  el.querySelectorAll('.cchip').forEach(b=>b.onclick=()=>{ const key=r.all[+b.dataset.i].q.key; const m=S.mistakes.find(z=>z.key===key); if(!m) return; if(m.cause) S.causes[m.cause]=Math.max(0,(S.causes[m.cause]||0)-1); m.cause=b.dataset.c; S.causes[m.cause]=(S.causes[m.cause]||0)+1; save(); b.parentNode.querySelectorAll('.cchip').forEach(z=>z.classList.toggle('on',z===b)); });
  el.scrollTop=0;
}

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
  gear:'<svg viewBox="0 0 24 24" class="i16"><circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/></svg>'
};
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
let toastT; function toast(m){ const el=$('#toast'); el.textContent=m; el.hidden=false; clearTimeout(toastT); toastT=setTimeout(()=>el.hidden=true,2600); }
function settingsForm(id){
  return `<form class="settings-form" id="${id}">
    <label>${t('examDate')}<input type="date" id="${id}-date" value="${S.examDate}"></label>
    <label>${t('track')}<select id="${id}-track"><option value="sci" ${S.track==='sci'?'selected':''}>${t('sci')}</option><option value="lit" ${S.track==='lit'?'selected':''}>${t('lit')}</option></select></label>
    <label>${t('targetScore')}<input type="number" id="${id}-target" min="60" max="100" value="${S.target}"></label>
    <label>${t('weeks')}<select id="${id}-weeks" ${S.examDate?'disabled':''}>${[4,6,8,10,12].map(w=>`<option ${S.weeks===w?'selected':''}>${w}</option>`).join('')}</select></label>
    <button class="btn primary" type="submit">${t('save')}</button></form>`;
}
function bindSettings(id){ const f=document.getElementById(id); if(!f) return; f.onsubmit=e=>{ e.preventDefault();
  const nd=$(`#${id}-date`).value; if(nd!==S.examDate){ S.examDate=nd; S.planStart=todayStr(); S.done={}; }
  S.track=$(`#${id}-track`).value; S.target=Math.max(60,Math.min(100,+$(`#${id}-target`).value||100));
  const wk=+$(`#${id}-weeks`).value; if(!S.examDate&&wk!==S.weeks){ S.weeks=wk; S.done={}; S.planStart=todayStr(); }
  save(); renderRoute(); toast(t('saved')); }; }

/* ============ PLAN ============ */
function planWeeks(){ if(S.examDate){ const d=Math.ceil((new Date(S.examDate)-new Date(S.planStart))/864e5); if(d>0) return Math.max(2,Math.min(16,Math.ceil(d/7))); } return S.weeks; }
function daysLeft(){ return S.examDate? Math.ceil((new Date(S.examDate+'T08:00')-new Date())/864e5):null; }
function currentWeek(){ const d=Math.floor((new Date()-new Date(S.planStart))/864e5); return Math.max(0,Math.min(planWeeks()-1,Math.floor(d/7))); }
function buildPlan(){
  const n=planWeeks(), weeks=[]; const phaseOf=i=>{ if(i===n-1) return 3; const f=(i+.5)/n; return f<Math.max(.3,2/n)?0:f<.55?1:f<.8?2:3; };
  const vO=['analogy','completion','reading','context','odd'], qO=S.track==='sci'?['arith','algebra','geometry','comparison','stats']:['arith','geometry','comparison','stats','algebra'];
  const found=[]; for(let k=0;k<5;k++){ found.push(vO[k]); found.push(qO[k]); }
  const fw=[...Array(n).keys()].filter(i=>phaseOf(i)===0).length||1, per=Math.ceil(10/fw); let fi=0;
  for(let i=0;i<n;i++){ const ph=phaseOf(i), tasks=[]; const add=(type,x={})=>tasks.push({id:`w${i}-${tasks.length}`,type,wk:i,...x});
    add('sessions');
    if(i===0) add('diag');
    if(ph===0){ let sk=found.slice(fi,fi+per); fi+=per; if(!sk.length) sk=found.slice(0,2); sk.forEach(s=>add('skill',{skill:s})); }
    if(ph===1){ add('verbal'); add('quant'); rankSkills().slice(0,2).forEach(x=>add('skill',{skill:x.s})); }
    if(ph===2){ add('verbal'); add('quant'); add('mock'); }
    if(ph===3){ add('mock'); if(i<n-1) add('mock'); else { add('text',{txt:{ar:'آخر ٤٨ ساعة: مراجعة خفيفة للقوانين والفخاخ فقط، ونوم مبكر',en:'Final 48 hours: light review of rules and traps only, and sleep early'}}); add('text',{txt:{ar:'جهّز الهوية وتأكد من موقع المركز وموعد الحضور',en:'Prepare your ID and confirm the center and arrival time'}}); } }
    weeks.push({i,ph,tasks}); }
  return weeks;
}
function sessionsInWeek(i){ const a=addDays(S.planStart,i*7), b=addDays(S.planStart,i*7+7); return S.sessionDays.filter(d=>d>=a&&d<b).length; }
function taskDone(tk){ return tk.type==='sessions'? sessionsInWeek(tk.wk)>=5 : !!S.done[tk.id]; }
function taskLabel(tk){ const s=tk.skill?SKILLS[tk.skill][S.lang]:''; const ar=S.lang==='ar';
  return {sessions:t('sessionsWeek')(numL(Math.min(5,sessionsInWeek(tk.wk)))),diag:t('pDiag'),skill:(ar?'درس وتدريب: ':'Lesson + practice: ')+s,verbal:t('pVerbal'),quant:t('pQuant'),mock:t('pMock'),text:L(tk.txt)}[tk.type]; }
function runTask(tk){
  if(tk.type==='text'){ S.done[tk.id]=!S.done[tk.id]; save(); return renderRoute(); }
  if(tk.type==='sessions') return startTest('session');
  if(tk.type==='skill'){ S.done[tk.id]=true; save(); location.hash='#lesson-'+tk.skill; return; }
  startTest(tk.type,{task:tk.id});
}
function taskItem(tk){ const d=taskDone(tk);
  return `<div class="task ${d?'done':''}"><span class="chk">${d?ICON.check:''}</span><span class="tl">${esc(taskLabel(tk))}</span><button class="btn sm ${d?'ghost':'soft'}" data-task="${tk.id}">${tk.type==='text'?(d?'↺':'✓'):(d?(S.lang==='ar'?'أعد':'Redo'):t('start'))}</button></div>`; }

/* ============ PAGES ============ */
function pageToday(){
  const dl=daysLeft(), est=estimate(), rd=readiness(), plan=buildPlan(), cw=currentWeek(), wk=plan[cw];
  const hasData=S.attempts.length>0, sp=sessionPlan(), doneToday=S.sessionDays.includes(todayStr()), checks=readyChecks();
  return `
  <section class="hero">
    <div class="hero-main">
      <div class="eyebrow light">${t('greetN')(numL(S.target))}</div>
      <h1>${S.lang==='ar'?'الـ <em>١٠٠</em> ليست حظًا.<br>هي عشر مهارات تُتقن.':'<em>100</em> is not luck.<br>It is ten skills, mastered.'}</h1>
      <p>${t('heroLine')}</p>
      <div class="hero-meta">
        <span class="pill">${dl!=null?`<b class="num">${numL(Math.max(0,dl))}</b> ${t('daysLeft')}`:`<a href="#plan">${t('setDate')}</a>`}</span>
        <span class="pill">${t('estScore')} <b class="num">${est==null?'—':numL(est)}</b></span>
        <a class="pill link" href="#plan">${ICON.gear} ${t('settings')}</a>
      </div>
    </div>
    <div class="hero-ring">${ring(hasData?rd:null,'%',168,t('readiness'))}</div>
  </section>
  <section class="session card">
    <div class="sess-txt">
      <div class="eyebrow">${hasData?t('sessionTitle'):t('diagFirst')}</div>
      <h2>${hasData?(doneToday?t('sessionDone'):t('sessionSub')):t('diagFirstSub')}</h2>
      ${hasData?`<p class="muted">${t('sessionParts')(numL(sp.due.length),numL(sp.nWeak),numL(sp.nMix))}</p><div class="chips">${sp.weak.map(s=>`<span class="chip">${SKILLS[s][S.lang]}</span>`).join('')}</div>`:''}
    </div>
    <button class="btn primary xl" data-start="${hasData?'session':'diag'}">${hasData?t('startSession'):t('diagFirst')}</button>
  </section>
  <section class="block">
    <div class="block-head"><h2 class="hl">${t('masteryTitle')}</h2><span class="muted small">${t('masteryHint')}</span></div>
    ${masteryMap()}
  </section>
  <section class="grid2">
    <div class="card"><div class="block-head"><h3>${t('weekTitle')} · ${t('phaseNames')[wk.ph]}</h3><a href="#plan">${t('fullPlan')}</a></div><div class="task-list">${wk.tasks.slice(0,5).map(taskItem).join('')}</div></div>
    <div class="card"><h3>${t('roadTitle')}</h3><ul class="checks">${t('ready').map((x,i)=>`<li class="${checks[i]?'ok':''}"><span class="ck">${checks[i]?ICON.check:''}</span>${x}</li>`).join('')}</ul></div>
  </section>
  <section class="block">
    <div class="block-head"><h2 class="hl">${t('methodTitle')}</h2><a href="#guide">${t('nav.guide')}</a></div>
    <div class="method-strip">${METHOD[S.lang].slice(0,4).map(m=>`<div class="mcard"><h4>${m[0]}</h4><p>${m[1]}</p><span class="mtag">${m[2]}</span></div>`).join('')}</div>
  </section>`;
}
function masteryMap(recent){ const tile=s=>{ const i=skillInfo(s,recent); return `<a class="mtile l${i.level}" href="#lesson-${s}"><span class="mt-n">${SKILLS[s][S.lang]}</span>${pips(i.level)}<span class="mt-f"><span class="mt-l">${t('levels')[i.level]}</span><span class="mt-a num">${i.acc==null?'—':numL(Math.round(i.acc*100))+'%'}</span></span></a>`; };
  return `<div class="mmap"><div class="mcol"><div class="mcol-h">${t('verbal')}</div><div class="mtiles">${V_SKILLS.map(tile).join('')}</div></div><div class="mcol"><div class="mcol-h">${t('quant')}</div><div class="mtiles">${Q_SKILLS.map(tile).join('')}</div></div></div>`; }
function pagePlan(){
  const plan=buildPlan(), cw=currentWeek();
  return `<header class="page-h"><a class="back" href="#today">${t('nav.today')}</a><h1>${t('planTitle')}</h1><p>${t('planIntro')}</p></header>
  <div class="card">${settingsForm('pf')}</div>
  <div class="card restart"><div><h3>${t('restartT')}</h3><p class="small muted">${t('restartD')}</p></div><button class="btn ghost" id="pl-restart">${t('restartBtn')}</button><div id="pl-confirm"></div></div>
  <ol class="phase-row">${t('phaseNames').map((p,i)=>`<li class="${plan[cw].ph===i?'cur':''}"><b>${p}</b><span>${t('phaseDesc')[i]}</span></li>`).join('')}</ol>
  <div class="weeks">${plan.map(w=>`<section class="week card ${w.i===cw?'cur':''}"><div class="wk-h"><h3>${t('week')} ${numL(w.i+1)}</h3><span class="chip ph${w.ph}">${t('phaseNames')[w.ph]}</span>${w.i===cw?`<span class="now">${t('thisWeek')}</span>`:''}<span class="wk-c num">${numL(w.tasks.filter(taskDone).length)}/${numL(w.tasks.length)}</span></div><div class="task-list">${w.tasks.map(taskItem).join('')}</div></section>`).join('')}</div>`;
}
function pageLearn(tab='cards'){
  const tabs=`<nav class="tabs">${Object.entries(t('tabs')).map(([k,v])=>`<a href="#learn-${k}" class="${tab===k?'on':''}">${v}</a>`).join('')}</nav>`;
  let body='';
  if(tab==='lessons'){ const card=s=>{ const i=skillInfo(s), l=LESSONS[s][S.lang], c=FLASH.find(f=>f.sk===s); return `<a class="lcard" href="#lesson-${s}"><div class="lc-ill">${ILL[c.ill]()}</div><div class="lc-top"><h3>${SKILLS[s][S.lang]}</h3>${pips(i.level)}</div><p>${M(esc(l.concept[0]))}</p><div class="lc-f"><span class="muted small">${t('levels')[i.level]}${xpList(s).length?` · <span class="lc-xp">▶ ${numL(xpList(s).length)} ${t('xpShort')}</span>`:''}</span><span class="lc-go">${t('lessonsOpen')}</span></div></a>`; };
    body=`<h2 class="sec-h hl">${t('verbal')}</h2><div class="lgrid">${V_SKILLS.map(card).join('')}</div><h2 class="sec-h hl">${t('quant')}</h2><div class="lgrid">${Q_SKILLS.map(card).join('')}</div>`; }
  else if(tab==='cards') body=cardsView();
  else if(tab==='tech') body=`<p class="lead">${t('techIntro')}</p><div class="notes">${TECH.map((x,i)=>`<article class="note-card c${i%4}"><div class="nc-ill">${ILL[x.ill]()}</div><h3>${esc(L(x.t))}</h3><p>${M(esc(L(x.d)))}</p></article>`).join('')}</div>`;
  else if(tab==='patterns') body=`<p class="lead">${t('patIntro')}</p><div class="pats">${PATTERNS.map((p,i)=>`<article class="pat card"><div class="pat-h"><span class="pnum">${numL(i+1)}</span><h3>${esc(L(p.t))}</h3><span class="chip">${SKILLS[p.sk][S.lang]}</span></div><p><b>${t('how')}:</b> ${esc(L(p.how))}</p><p class="key"><b>${t('trick')}:</b> ${M(esc(L(p.trick)))}</p><p class="exl">${esc(L(p.ex))}</p><button class="btn sm soft" data-start="skill" data-skill="${p.sk}">${t('practicePattern')}</button></article>`).join('')}</div>`;
  else if(tab==='vocab') body=vocabView();
  else body=`<p class="lead">${t('resIntro')}</p>${RESOURCES.map(c=>`<h2 class="sec-h hl">${L(c.cat)}</h2><div class="rgrid">${c.items.map(resCard).join('')}</div>`).join('')}`;
  return `<header class="page-h"><h1><span class="hl">${t('learnTitle')}</span></h1><p>${t('kitIntro')}</p></header>${tabs}${body}`;
}
/* flashcards */
let FCV={deck:'all',flip:false};
function deckCards(){ return FCV.deck==='all'?FLASH:FLASH.filter(c=>c.sk===FCV.deck); }
function cardDue(){ const d=todayStr(); return deckCards().filter(c=>{ const st=S.cards[c.id]; return !st||(st.box<4&&(st.due||d)<=d); }); }
function stickyCard(c,flip,big){ const col=['c0','c1','c2','c3'][ALL_SKILLS.indexOf(c.sk)%4];
  return `<div class="flash ${col} ${flip?'flipped':''} ${big?'big':''}"><span class="tape"></span>
    ${!flip?`<span class="chip">${SKILLS[c.sk][S.lang]}</span><div class="fl-ill">${ILL[c.ill]()}</div><h3>${esc(L(c.f))}</h3>${big?`<span class="fl-hint">${t('tapFlip')}</span>`:''}`
    :`<span class="chip">${SKILLS[c.sk][S.lang]}</span><h3>${esc(L(c.f))}</h3><p class="fl-b">${M(esc(L(c.b)))}</p>${L(c.x)?`<p class="fl-x"><b>${t('example')}:</b> ${M(esc(L(c.x)))}</p>`:''}`}</div>`; }
function cardsView(){
  const decks=[['all',t('deckAll')],...ALL_SKILLS.map(s=>[s,SKILLS[s][S.lang]])];
  const due=cardDue(), cards=deckCards(), known=cards.filter(c=>S.cards[c.id]?.box>=4).length;
  const chips=`<div class="deck-chips">${decks.map(([k,v])=>`<button class="dchip ${FCV.deck===k?'on':''}" data-deck="${k}">${v}</button>`).join('')}</div>`;
  const head=`<p class="lead">${t('cardsIntro')}</p>${chips}<div class="vstats"><span><b class="num">${numL(known)}</b> ${t('known')}</span><span><b class="num">${numL(due.length)}</b> ${t('left')}</span><span class="muted">/ ${numL(cards.length)}</span></div>`;
  const study=due.length?`<div class="study"><button class="flash-btn" id="fc-card" aria-label="${t('tapFlip')}">${stickyCard(due[0],FCV.flip,true)}</button><div class="vbtns">${FCV.flip?`<button class="btn ghost" id="fc-again">${t('again')}</button><button class="btn primary" id="fc-know">${t('know')}</button>`:''}</div></div>`:`<div class="card center"><p>${t('deckDone')}</p></div>`;
  return head+study+`<h2 class="sec-h hl">${t('allInDeck')}</h2><div class="notes">${cards.map(c=>`<details class="mini-flash"><summary>${stickyCard(c,false,false)}</summary>${stickyCard(c,true,false)}</details>`).join('')}</div>`;
}
function cardAct(ok){ const due=cardDue(); if(!due.length) return; const c=due[0]; const st=S.cards[c.id]||{box:0}; const INT=[1,3,7,14];
  if(ok){ st.box=(st.box||0)+1; st.due=addDays(todayStr(),INT[Math.min(3,st.box-1)]); } else { st.box=0; st.due=todayStr(); const i=FLASH.indexOf(c); FLASH.push(FLASH.splice(i,1)[0]); }
  S.cards[c.id]=st; FCV.flip=false; save(); renderRoute(); }
function resCard(it){ const url=it.u||(it.yt?yt(L(it.yt)):''); const tag={video:S.lang==='ar'?'فيديو':'Video',link:S.lang==='ar'?'رابط':'Link',official:S.lang==='ar'?'رسمي':'Official',book:S.lang==='ar'?'كتاب':'Book'}[it.k];
  const inner=`<span class="ricon ${it.k}">${ICON[it.k]}</span><div class="rc-body"><div class="rc-top"><h3>${esc(L(it.t))}</h3><span class="chip">${tag}</span></div><p>${esc(L(it.d))}</p></div>`;
  return url?`<a class="rcard" href="${url}" target="_blank" rel="noopener">${inner}</a>`:`<div class="rcard">${inner}</div>`; }
/* foundation explainers (animated, narrated; Arabic) */
const XPOK=()=>!!(window.XP&&XP.ready);
const xpList=s=>XPOK()?XP.forSkill(s,S.lang):[];
function xpSection(s){ const xs=xpList(s); if(!xs.length) return ''; const done=S.xp||{}, n=xs.filter(x=>done[x.key]).length;
  const play='<svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none"/></svg>';
  return `<section class="card xp-sec" id="xp-${s}"><div class="xp-sec-h"><h2>${t('xpTitle')}</h2><span class="chip num">${numL(n)} / ${numL(xs.length)}</span></div><p class="muted small">${t('xpIntro')}</p>
    <div class="xpl">${xs.map((x,i)=>`<button class="xpc" data-xp="${x.key}"><span class="xpn"><span class="pl">${play}</span><span>${t('xpN')} ${numL(i+1)}</span><span class="xpm">${esc(x.min||'')}</span>${done[x.key]?`<span class="dn">✓ ${t('xpDone')}</span>`:''}</span><b>${esc(x.title)}</b>${x.goals&&x.goals[0]?`<small>${esc(x.goals[0])}</small>`:''}</button>`).join('')}</div></section>`; }
function pageLesson(s){
  const l=LESSONS[s]?.[S.lang]; if(!l) return pageLearn(); const i=skillInfo(s), ar=S.lang==='ar';
  const res=l.res.map(r=>r[0]==='yt'?{k:'video',t:{ar:'يوتيوب: '+r[1],en:'YouTube: '+r[1]},d:{ar:'بحث جاهز لشروحات هذه المهارة.',en:'A ready search for lessons on this skill.'},u:yt(r[1])}:{k:'link',t:{ar:r[1],en:r[1]},d:{ar:'مرجع خارجي للتعمق.',en:'External reference for deeper practice.'},u:r[2]});
  const side=`<div class="card side-card"><div class="eyebrow">${t('mastery')}</div><div class="lvl-row">${pips(i.level)}<b>${t('levels')[i.level]}</b></div>
    ${barRow('',i.acc,i.n?`${numL(i.n)} ${t('questions')}`:'')}
    <p class="small muted">${t('targetTime')}: <b class="num">${numL(TARGET_T[s])}${t('sec')}</b>${i.time!=null?` · ${ar?'زمنك':'yours'}: <b class="num">${numL(Math.round(i.time))}${t('sec')}</b>`:''}</p>
    <ul class="lvl-rules">${[1,2,3,4].map(k=>`<li class="${i.level>=k?'on':''}"><b>${t('levels')[k]}</b> ${t('levelRule')[k]}</li>`).join('')}</ul>
    <button class="btn primary block" data-start="skill" data-skill="${s}">${t('practice10')}</button></div>`;
  const sc=FLASH.filter(c=>c.sk===s);
  return `<header class="page-h lesson-h"><div><a class="back" href="#learn-lessons">${t('learnTitle')}</a><h1><span class="hl">${SKILLS[s][S.lang]}</span></h1></div><div class="lh-ill">${ILL[sc[0].ill]()}</div></header>
  <div class="lesson">
    <div class="lesson-main">
      <section class="card"><h2>${t('concept')}</h2>${l.concept.map(p=>`<p>${M(esc(p))}</p>`).join('')}</section>
      ${xpSection(s)}
      <section><h2 class="h2s">${t('skillCards')}</h2><div class="notes small-notes">${sc.map(c=>`<details class="mini-flash"><summary>${stickyCard(c,false,false)}</summary>${stickyCard(c,true,false)}</details>`).join('')}</div></section>
      <aside class="callout"><div class="eyebrow">${t('mind')}</div><p>${M(esc(l.mind))}</p></aside>
      <section class="card"><h2>${t('steps')}</h2><ol class="nsteps">${l.steps.map(x=>`<li>${M(esc(x))}</li>`).join('')}</ol></section>
      <section><h2 class="h2s">${t('types')}</h2><div class="tgrid2">${l.types.map(x=>`<div class="tcell"><b>${esc(x[0])}</b><span>${M(esc(x[1]))}</span></div>`).join('')}</div></section>
      ${l.rules?`<section><h2 class="h2s">${t('rules')}</h2><div class="rules">${l.rules.map(x=>`<div class="rule">${M(esc(x))}</div>`).join('')}</div></section>`:''}
      <section class="card warn-card"><h2>${t('traps')}</h2><ul class="bul">${l.traps.map(x=>`<li>${M(esc(x))}</li>`).join('')}</ul></section>
      <section><h2 class="h2s">${t('examples')}</h2><div class="exgrid">${l.examples.map((e,k)=>`<details class="excard"><summary><span class="exq">${M(esc(e.q))}</span><span class="reveal">${ar?'اضغط لإظهار الحل':'Tap to reveal'}</span></summary><p><strong>${t('answer')}:</strong> ${M(esc(e.a))}</p><p class="muted"><strong>${t('why')}:</strong> ${M(esc(e.why))}</p></details>`).join('')}</div></section>
      <section class="card accent-card"><h2>${t('speed')}</h2><ul class="bul">${l.speed.map(x=>`<li>${M(esc(x))}</li>`).join('')}</ul></section>
      <section><h2 class="h2s">${t('more')}</h2><div class="rgrid">${res.map(resCard).join('')}</div></section>
      <div class="mobile-cta"><button class="btn primary block xl" data-start="skill" data-skill="${s}">${t('practice10')}</button></div>
    </div>
    <aside class="lesson-side">${side}</aside>
  </div>`;
}
let VC={flip:false};
function vocabDue(){ const d=todayStr(), st=S.vocab[S.lang]||(S.vocab[S.lang]={}); return VOCAB[S.lang].filter(([w])=>!st[w]||(st[w].box<4&&(st[w].due||d)<=d)); }
function vocabView(){
  const st=S.vocab[S.lang]||{}, due=vocabDue(), known=VOCAB[S.lang].filter(([w])=>st[w]?.box>=4).length;
  const head=`<p class="lead">${t('vocabIntro')}</p><div class="vstats"><span><b class="num">${numL(known)}</b> ${t('known')}</span><span><b class="num">${numL(due.length)}</b> ${t('left')}</span><span class="muted">/ ${numL(VOCAB[S.lang].length)}</span></div>`;
  if(!due.length) return head+`<div class="card center"><p>${t('vocabDone')}</p></div>`;
  const [w,m]=due[0];
  return head+`<button class="vcard ${VC.flip?'flipped':''}" id="vcard"><span class="v-word">${esc(w)}</span>${VC.flip?`<span class="v-mean">${esc(m)}</span>`:`<span class="v-hint">${t('flip')}</span>`}</button>
  <div class="vbtns">${VC.flip?`<button class="btn ghost" id="v-again">${t('again')}</button><button class="btn primary" id="v-know">${t('know')}</button>`:''}</div>`;
}
function vocabAct(ok){ const st=S.vocab[S.lang]||(S.vocab[S.lang]={}); const due=vocabDue(); if(!due.length) return; const w=due[0][0]; const c=st[w]||{box:0}; const INT=[1,2,4,8];
  if(ok){ c.box=(c.box||0)+1; c.due=addDays(todayStr(),INT[Math.min(3,c.box-1)]); } else { c.box=0; c.due=todayStr(); const arr=VOCAB[S.lang]; const idx=arr.findIndex(x=>x[0]===w); arr.push(arr.splice(idx,1)[0]); }
  st[w]=c; VC.flip=false; save(); renderRoute(); }
function pagePractice(){
  const due=dueList().length;
  const card=(k,title,desc,cls='',meta='')=>`<article class="pcard ${cls}"><div><h3>${title}</h3><p>${desc}</p>${meta}</div><button class="btn ${cls==='feature'?'primary':cls==='dark'?'sand':'soft'}" data-start="${k}" ${k==='review'&&!due?'disabled':''}>${t('start')}</button></article>`;
  return `<header class="page-h"><h1>${t('practiceTitle')}</h1><p>${t('practiceIntro')}</p></header>
  <div class="pgrid">
    ${card('session',t('pSession'),t('pSessionD'),'feature')}
    ${card('mock',t('pMock'),t('pMockD'),'dark',`<p class="small">${S.track==='sci'?(S.lang==='ar'?'علمي: لفظي، كمي، لفظي، كمي':'Science: V, Q, V, Q'):(S.lang==='ar'?'نظري: لفظي، لفظي، كمي، لفظي':'Humanities: V, V, Q, V')}</p>`)}
    ${card('review',t('pReview'),t('pReviewD'),'',`<p class="due-n"><b class="num">${numL(due)}</b> ${t('due')}</p>`)}
    ${card('verbal',t('pVerbal'),t('pVerbalD'))}
    ${card('quant',t('pQuant'),t('pQuantD'))}
    ${card('diag',t('pDiag'),t('pDiagD'))}
  </div>
  <section class="models"><div class="block-head"><h2 class="hl">${t('modelsTitle')}</h2><span class="muted small">${numL(Object.keys(S.models).length)} / ${numL(30)} ${t('modelsDone')}</span></div><p class="muted">${t('modelsIntro')}</p>
    <div class="mgrid">${[...Array(30)].map((_,k)=>{ const m=S.models[k], has=m&&m.aid&&(getDetail(m.aid)||S.attempts.some(a=>a.id===m.aid)); return `<div class="mcell"><button class="mbox ${m?'done':''} ${m&&m.best>=95?'star':''}" data-model="${k}" aria-label="${t('model')} ${k+1}"><span class="mb-n">${t('model')}</span><b class="num">${numL(k+1)}</b><span class="mb-s num">${m?numL(m.best)+'%':t('notTaken')}</span></button>${has?`<button class="mb-rev" data-review="${m.aid}">${t('reviewBtn')}</button>`:''}</div>`; }).join('')}</div></section>
  <h2 class="sec-h hl">${t('bySkillTitle')}</h2>
  <div class="skgrid">${ALL_SKILLS.map(s=>{ const i=skillInfo(s); return `<button class="skbtn" data-start="skill" data-skill="${s}"><span class="sk-n">${SKILLS[s][S.lang]}</span>${pips(i.level)}<small>${t('levels')[i.level]}${i.acc!=null?' · '+numL(Math.round(i.acc*100))+'%':''}</small></button>`; }).join('')}</div>`;
}
function pageProgress(){
  const real=S.attempts.length>0, D={recent:S.recent,attempts:S.attempts,causes:S.causes};
  const est=estimate(D.recent), rd=real?readiness(D.recent,D.attempts):null; const n=D.recent.length, c=D.recent.filter(x=>x.ok).length, tm=n?Math.round(D.recent.reduce((a,x)=>a+(x.t||0),0)/n):null;
  const streak=calcStreak(); const kpi=(l,v,sub='')=>`<div class="kpi"><span class="kl">${l}</span><b class="kv num">${v}</b>${sub?`<span class="ks">${sub}</span>`:''}</div>`;
  const checks=readyChecks(D.recent,D.attempts); const info=ALL_SKILLS.map(s=>skillInfo(s,D.recent));
  const cz=D.causes, ctot=Object.values(cz).reduce((a,b)=>a+b,0);
  return `<header class="page-h"><h1>${t('progressTitle')}</h1></header>
  ${real?'':`<div class="demo empty-state"><span><b>${t('emptyT')}.</b> ${t('emptyD')}</span><button class="btn primary sm" data-start="diag">${t('diagFirst')}</button></div>`}
  <div class="kpis">
    <div class="kpi big">${ring(rd,'%',104)}<div><span class="kl">${t('kReady')}</span><span class="ks">${numL(checks.filter(Boolean).length)}/${numL(4)} ${S.lang==='ar'?'معايير متحققة':'criteria met'}</span></div></div>
    ${kpi(t('kEst'),est==null?'—':numL(est),est!=null?`${t('gap')}: ${numL(Math.max(0,S.target-est))}`:'')}
    ${kpi(t('kSolved'),numL(n))}${kpi(t('kAcc'),n?numL(Math.round(100*c/n))+'%':'—')}${kpi(t('kTime'),tm!=null?numL(tm)+t('sec'):'—')}${kpi(t('kStreak'),numL(streak))}
  </div>
  <p class="note small">${t('estNote')}</p>
  <div class="dgrid">
    <section class="card wide"><h2>${t('recoTitle')}</h2><ol class="reco">${(real?recos(D,info):[{lv:'none',h:t('recoStartH'),p:t('recoStartP'),act:'data-start="diag"'}]).map(r=>`<li class="${r.lv}"><div><strong>${r.h}</strong><p>${r.p}</p></div>${r.act?`<button class="btn sm soft" ${r.act}>${t('start')}</button>`:''}</li>`).join('')}</ol></section>
    <section class="card wide"><h2>${t('skillsTitle')}</h2>
      <div class="stable">${info.map(i=>`<a class="srow" href="#lesson-${i.s}"><span class="sn">${SKILLS[i.s][S.lang]}</span><span class="sl">${pips(i.level)}<small>${t('levels')[i.level]}</small></span><span class="sb">${barRow('',i.acc,'')}</span><span class="stime num ${i.time!=null&&i.time>TARGET_T[i.s]?'slow':''}">${i.time!=null?numL(Math.round(i.time)):'—'} / ${numL(TARGET_T[i.s])}${t('sec')}</span></a>`).join('')}</div>
      <p class="small muted">${S.lang==='ar'?'العلامة عند ٩٥٪ هي معيار «ثبات». الزمن: زمنك / المستهدف.':'The marker at 95% is the "Locked in" bar. Time: yours / target.'}</p></section>
    <section class="card"><h2>${t('trendTitle')}</h2>${trend(D.attempts.filter(a=>a.est!=null))}</section>
    <section class="card"><h2>${t('causesTitle')}</h2>${ctot?Object.entries(cz).map(([k,v])=>`<div class="cause-row"><div class="cr-h"><b>${t('causes')[k]}</b><span class="num">${numL(Math.round(100*v/ctot))}%</span></div><span class="bt"><span class="bf sand" style="inline-size:${Math.round(100*v/ctot)}%"></span></span><p class="small muted">${t('causeFix')[k]}</p></div>`).join(''):`<p class="muted">${t('noCauses')}</p>`}</section>
    <section class="card"><h2>${t('roadTitle')}</h2><ul class="checks">${t('ready').map((x,i)=>`<li class="${checks[i]?'ok':''}"><span class="ck">${checks[i]?ICON.check:''}</span>${x}</li>`).join('')}</ul></section>
    <section class="card"><h2>${t('historyTitle')}</h2>${D.attempts.length?`<div class="tbl"><table><thead><tr><th>${t('date')}</th><th>${t('type')}</th><th>${t('score')}</th><th>${t('estGat')}</th><th></th></tr></thead><tbody>${D.attempts.slice(-30).reverse().map(a=>{ const has=!!a.id; return `<tr class="${has?'clickable':''}" ${has?`data-review="${a.id}" tabindex="0"`:''}><td class="num">${dateH(a.date)}</td><td>${t('kinds')[a.kind]||a.kind}${a.mk?' '+numL(a.mk):''}${a.skill?' · '+SKILLS[a.skill][S.lang]:''}</td><td class="num">${numL(a.pct)}%</td><td class="num">${a.est!=null?numL(a.est):'—'}</td><td>${has?`<span class="rev-link">${getDetail(a.id)?t('reviewBtn'):t('summaryOnly')}</span>`:''}</td></tr>`; }).join('')}</tbody></table></div><p class="small muted">${t('reviewHint')}</p>`:`<p class="muted">${t('noHistory')}</p>`}</section>
    <section class="card wide save-card" id="save"><h2>${t('saveTitle')}</h2>
      <div class="save-grid">
        ${window.CLOUD?`<div class="save-opt cloud ${window.CLOUD.user?'ok':''}"><b>${t('cloudT')}</b><p class="small">${window.CLOUD.user?t('cloudOn')+' '+esc(window.CLOUD.user.email||''):t('cloudOff')}</p><p class="small muted" id="cloud-line">${cloudLine()}</p><button class="btn ${window.CLOUD.user?'ghost':'primary'} sm" data-acct="1">${window.CLOUD.user?t('acctManage'):t('acctJoin')}</button></div>`:''}
        <div class="save-opt ${STORE_OK?'ok':'bad'}"><b>${t('saveAuto')}</b><p class="small">${STORE_OK?t('saveAutoD'):t('saveFail')}</p><p class="small muted">${S.savedAt?t('lastSaved')+' '+new Date(S.savedAt).toLocaleString(S.lang==='ar'?'ar-SA':'en-GB',{dateStyle:'medium',timeStyle:'short'}):''}${PERSIST?' · '+t('persistOn'):''}</p></div>
        <div class="save-opt"><b>${t('saveFile')}</b><p class="small">${t('saveFileD')}</p><div class="row"><button class="btn primary sm" id="bk-file">${t('saveFileBtn')}</button><label class="btn ghost sm file-lbl">${t('loadFileBtn')}<input type="file" id="bk-load" accept=".json,application/json" hidden></label></div><p class="small muted">${S.lastExport?t('lastExport')+' '+S.lastExport:t('noExport')}</p></div>
        <div class="save-opt"><b>${t('saveCode')}</b><p class="small">${t('backupD')}</p><div class="bk"><button class="btn ghost sm" id="bk-copy">${t('copyCode')}</button><textarea id="bk-in" rows="2" placeholder="${t('pasteHere')}"></textarea><button class="btn ghost sm" id="bk-imp">${t('importCode')}</button></div></div>
      </div>
      <div class="row"><button class="btn danger-ghost sm" id="bk-reset">${t('reset')}</button></div><div id="bk-confirm"></div></section>
  </div>`;
}
function calcStreak(){ const set=new Set(S.days); let n=0, d=todayStr(); if(!set.has(d)) d=addDays(d,-1); while(set.has(d)){ n++; d=addDays(d,-1); } return n; }
function recos(D,info){
  const ar=S.lang==='ar', out=[];
  const due=dueList().length; if(due) out.push({lv:'warn',h:ar?`${numL(due)} مراجعة مستحقة`:`${due} reviews due`,p:ar?'المراجعة في موعدها تمنع تكرار الخطأ يوم الاختبار.':'Reviewing on time stops the mistake from recurring on test day.',act:'data-start="review"'});
  info.filter(i=>i.n>=5&&i.level<3).sort((a,b)=>a.acc-b.acc).slice(0,2).forEach(i=>out.push({lv:lvlOf(i.acc),h:(ar?'ارفع ':'Lift ')+SKILLS[i.s][S.lang]+` (${numL(Math.round(i.acc*100))}%)`,p:ar?'راجع «كيف يفكر واضع السؤال» و«الفخاخ» في الدرس، ثم تدرّب بالتصحيح الفوري حتى ٨٥٪.':'Reread "How the test writer thinks" and "Traps", then practice with feedback to 85%.',act:`data-start="skill" data-skill="${i.s}"`}));
  const slow=info.filter(i=>i.n>=5&&i.time>TARGET_T[i.s]).sort((a,b)=>(b.time/TARGET_T[b.s])-(a.time/TARGET_T[a.s]))[0];
  if(slow) out.push({lv:'warn',h:(ar?'السرعة في ':'Speed in ')+SKILLS[slow.s][S.lang],p:ar?`زمنك ${numL(Math.round(slow.time))} ث والمستهدف ${numL(TARGET_T[slow.s])} ث. تدرّب بأقسام مؤقتة.`:`Your time is ${Math.round(slow.time)}s vs a ${TARGET_T[slow.s]}s target. Drill timed sections.`,act:`data-start="${SKILLS[slow.s].area==='V'?'verbal':'quant'}"`});
  const top=Object.entries(D.causes||{}).sort((a,b)=>b[1]-a[1])[0]; if(top&&top[1]>0) out.push({lv:'none',h:(ar?'أكثر أسباب أخطائك: ':'Top mistake cause: ')+t('causes')[top[0]],p:t('causeFix')[top[0]]});
  info.filter(i=>!i.n).slice(0,1).forEach(i=>out.push({lv:'none',h:(ar?'لم تبدأ: ':'Not started: ')+SKILLS[i.s][S.lang],p:ar?'افتح الدرس ثم تدرّب.':'Open the lesson, then practice.',act:`data-start="skill" data-skill="${i.s}"`}));
  const mocks=D.attempts.filter(isMock).length; if(mocks<3) out.push({lv:'none',h:ar?`محاكاة كاملة (${numL(mocks)} من ٣)`:`Full simulation (${mocks} of 3)`,p:ar?'المحاكاة المطابقة تجعل يوم الاختبار مألوفًا.':'Test-like simulation makes test day familiar.',act:'data-start="mock"'});
  if(S.attempts.length>=3&&(!S.lastExport||(new Date()-new Date(S.lastExport))/864e5>7)) out.push({lv:'warn',h:t('nudgeH'),p:t('nudgeP'),act:'data-go="save"'});
  if(!out.length) out.push({lv:'good',h:ar?'أنت في مسار الـ ١٠٠':'You are on track for 100',p:ar?'حافظ على جلسة اليوم ومحاكاة أسبوعية.':'Keep the daily session and a weekly simulation.'});
  return out.slice(0,5);
}
function trend(att){
  if(!att.length) return `<p class="muted">${t('noHistory')}</p>`;
  const W0=560,H=220,p={l:34,r:14,t:18,b:24},n=att.length; const lo=Math.max(0,Math.floor((Math.min(...att.map(a=>a.est))-10)/10)*10), hi=100;
  const x=i=>p.l+(n===1?(W0-p.l-p.r)/2:i*(W0-p.l-p.r)/(n-1)), y=v=>p.t+(hi-v)*(H-p.t-p.b)/(hi-lo);
  const g=[]; for(let v=lo;v<=hi;v+=10) g.push(v); const line=att.map((a,i)=>`${i?'L':'M'}${x(i).toFixed(1)} ${y(a.est).toFixed(1)}`).join(' ');
  return `<div class="chart" dir="ltr"><svg viewBox="0 0 ${W0} ${H}" role="img" aria-label="${t('trendTitle')}">${g.map(v=>`<line x1="${p.l}" x2="${W0-p.r}" y1="${y(v)}" y2="${y(v)}" class="grid"/><text x="${p.l-6}" y="${y(v)+4}" text-anchor="end" class="ax">${v}</text>`).join('')}
  <line x1="${p.l}" x2="${W0-p.r}" y1="${y(S.target)}" y2="${y(S.target)}" class="tgt"/>
  <path d="${line} L${x(n-1).toFixed(1)} ${y(lo)} L${x(0).toFixed(1)} ${y(lo)} Z" class="area"/><path d="${line}" class="ln"/>
  ${att.map((a,i)=>`<g class="pt"><circle cx="${x(i)}" cy="${y(a.est)}" r="${i===n-1?6:4}"/><circle cx="${x(i)}" cy="${y(a.est)}" r="14" class="hit"><title>${a.date} · ${t('kinds')[a.kind]||a.kind}: ${a.est}</title></circle></g>`).join('')}
  <text x="${x(n-1)}" y="${y(att[n-1].est)-12}" text-anchor="middle" class="lab">${att[n-1].est}</text></svg></div>`;
}
function pageGuide(){
  const g=GUIDE[S.lang]; const secs=[{id:'method',h:t('methodTitle')},...g];
  return `<header class="page-h"><h1>${t('guideTitle')}</h1><p class="note">${t('verifyNote')}</p></header>
  <nav class="toc">${secs.map(s=>`<a href="#guide" data-scroll="g-${s.id}">${s.h}</a>`).join('')}</nav>
  <div class="guide-body">
    <section id="g-method" class="gsec"><h2>${t('methodTitle')}</h2><p>${t('methodIntro')}</p><div class="method-grid">${METHOD[S.lang].map((m,i)=>`<div class="mcard"><span class="mnum num">${numL(i+1)}</span><h4>${m[0]}</h4><p>${m[1]}</p><span class="mtag">${m[2]}</span></div>`).join('')}</div></section>
    ${g.map(s=>`<section id="g-${s.id}" class="gsec card"><h2>${s.h}</h2>${s.body}</section>`).join('')}
    <section class="gsec card"><h2>${t('sourcesLine')}</h2><ul class="bul">${GUIDE_SOURCES.map(x=>`<li><a href="${x[2]}" target="_blank" rel="noopener">${S.lang==='ar'?x[0]:x[1]}</a></li>`).join('')}</ul></section>
  </div>`;
}

/* ============ ROUTER ============ */
const NAV=['today','learn','practice','progress','guide'];
function route(){ const h=(location.hash||'#today').slice(1);
  if(h.startsWith('lesson-')) return {p:'learn',v:()=>pageLesson(h.slice(7))};
  if(h.startsWith('learn')) return {p:'learn',v:()=>pageLearn(h.split('-')[1]||'cards')};
  if(h==='plan') return {p:'today',v:pagePlan};
  if(h.startsWith('guide')) return {p:'guide',v:pageGuide};
  const m={today:pageToday,practice:pagePractice,progress:pageProgress}; return {p:m[h]?h:'today',v:m[h]||pageToday}; }
function renderRoute(){
  const r=route(); document.documentElement.lang=S.lang; document.documentElement.dir=S.lang==='ar'?'rtl':'ltr';
  $('#brand-n').textContent=t('brand'); document.title=S.lang==='ar'?'أكاديمية القدرات | GAT Academy':'GAT Academy | أكاديمية القدرات'; { const L=S.lang==='ar'; $('#theme-btn').setAttribute('aria-label',L?'المظهر':'Theme'); $('#acct-btn')?.setAttribute('aria-label',L?'الحساب':'Account'); $('#nav').setAttribute('aria-label',L?'التنقل الرئيسي':'Main navigation'); $('#tabbar').setAttribute('aria-label',L?'التنقل السفلي':'Bottom navigation'); $('#lang-btn').setAttribute('lang',L?'en':'ar'); } $('#brand-t').textContent=t('tagline'); $('#lang-btn').textContent=t('switchLang');
  const links=NAV.map(k=>`<a href="#${k}" class="${r.p===k?'on':''}" ${r.p===k?'aria-current="page"':''}>${ICON[k]}<span>${t('nav.'+k)}</span></a>`).join('');
  $('#nav').innerHTML=links; $('#tabbar').innerHTML=links;
  const ab=$('#acct-btn'); if(ab){ const u=window.CLOUD?.user, nm=(u&&u.name)||''; ab.hidden=!window.CLOUD; ab.classList.toggle('on',!!u); ab.classList.toggle('has-name',!!nm); ab.title=u?(nm?nm+' · ':'')+(u.email||''):t('acctJoin');
    let sp=ab.querySelector('.acct-name'); if(nm){ if(!sp){ sp=document.createElement('span'); sp.className='acct-name'; ab.appendChild(sp); } sp.textContent=nm.split(' ')[0]; ab.setAttribute('aria-label',(S.lang==='ar'?'الحساب: ':'Account: ')+nm); } else if(sp) sp.remove(); }
  $('#main').innerHTML=r.v(); $('#foot').textContent=t('footer'); bindMain();
}
function bindMain(){
  const m=$('#main');
  m.querySelectorAll('[data-review]').forEach(b=>{ b.onclick=e=>{ e.stopPropagation(); openReview(b.dataset.review); }; if(b.tagName==='TR') b.onkeydown=e=>{ if(e.key==='Enter') openReview(b.dataset.review); }; });
  m.querySelectorAll('[data-acct]').forEach(b=>b.onclick=openAcct);
  m.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>document.getElementById(b.dataset.go)?.scrollIntoView({behavior:'smooth'}));
  m.querySelectorAll('[data-start]').forEach(b=>b.onclick=()=>startTest(b.dataset.start,{skill:b.dataset.skill}));
  m.querySelectorAll('[data-xp]').forEach(b=>b.onclick=()=>{ XP_BACK=b.dataset.xp; XP.open(b.dataset.xp); });
  m.querySelectorAll('[data-task]').forEach(b=>b.onclick=()=>{ const tk=buildPlan().flatMap(w=>w.tasks).find(x=>x.id===b.dataset.task); if(tk) runTask(tk); });
  m.querySelectorAll('[data-scroll]').forEach(a=>a.onclick=e=>{ e.preventDefault(); document.getElementById(a.dataset.scroll)?.scrollIntoView({behavior:'smooth',block:'start'}); });
  bindSettings('pf');
  const on=(id,f)=>{ const b=$(id); if(b) b.onclick=f; };
  on('#vcard',()=>{ if(!VC.flip){ VC.flip=true; renderRoute(); } });
  on('#fc-card',()=>{ FCV.flip=!FCV.flip; renderRoute(); }); on('#fc-know',()=>cardAct(true)); on('#fc-again',()=>cardAct(false));
  m.querySelectorAll('[data-deck]').forEach(b=>b.onclick=()=>{ FCV.deck=b.dataset.deck; FCV.flip=false; renderRoute(); });
  m.querySelectorAll('[data-model]').forEach(b=>b.onclick=()=>startTest('model',{k:+b.dataset.model}));
  on('#v-know',()=>vocabAct(true)); on('#v-again',()=>vocabAct(false));
  on('#bk-copy',()=>{ const code=btoa(unescape(encodeURIComponent(JSON.stringify(S)))), ta=$('#bk-in'); const fb=()=>{ ta.value=code; ta.select(); };
    const fb2=()=>{ fb(); toast(t('copyManual')); }; if(navigator.clipboard) navigator.clipboard.writeText(code).then(()=>{ ta.value=code; toast(t('copied')); }).catch(fb2); else fb2(); });
  on('#bk-file',exportFile);
  const ld=$('#bk-load'); if(ld) ld.onchange=()=>{ const f=ld.files[0]; if(!f) return; const r=new FileReader(); r.onload=()=>importText(String(r.result)); r.readAsText(f); ld.value=''; };
  on('#bk-imp',()=>importText($('#bk-in').value));
  on('#bk-reset',()=>{ const P=t('resetParts');
    $('#bk-confirm').innerHTML=`<div class="ex-confirm inline reset-box"><p><b>${t('resetPick')}</b></p>
      <div class="rs-list">${Object.entries(P).map(([k,[l,d]])=>`<label class="rs-opt"><input type="checkbox" value="${k}"><span><b>${l}</b><small>${d}</small></span></label>`).join('')}</div>
      <p class="small">${t('resetWarn')}</p><div class="row"><button class="btn danger" id="rs-yes" disabled>${t('yesReset')}</button><button class="btn ghost" id="rs-no">${t('cancel')}</button></div></div>`;
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
function openAcct(){ AC.err=''; AC.info=''; AC.confirmDel=false; $('#acct').hidden=false; renderAcct(); setTimeout(()=>($('#ac-email')||$('#ac-x')||$('#acct button'))?.focus(),0); }
function closeAcct(){ PEND=null; AC.gate=false; $('#acct').hidden=true; $('#acct-btn')?.focus(); }
document.addEventListener('keydown',e=>{ if(e.key!=='Escape') return; const a=$('#acct'), p=$('#theme-pop'); if(a&&!a.hidden){ closeAcct(); return; } if(p&&!p.hidden){ p.hidden=true; $('#theme-btn').setAttribute('aria-expanded','false'); $('#theme-btn').focus(); } });
const authMsg=c=>c==='cur-pw'?t('curPwWrong'):(t('authErr')[String(c||'').replace('auth/','')]||t('authErr').other);
function renderAcct(){
  const el=$('#acct'), C=window.CLOUD; if(!el||!C) return; const u=C.user;
  el.innerHTML=`<div class="acct-box" role="dialog" aria-modal="true" aria-labelledby="acct-h">
    <button class="icon-btn acct-x" id="ac-x" aria-label="${t('close')}">${ICON.x}</button>
    ${u?`<h2 id="acct-h">${u.name?`${t('hello')}${S.lang==='ar'?'، ':', '}${esc(u.name)}`:t('acctTitle')}</h2>
      <p class="acct-mail">${esc(u.email||'')}</p>
      ${C.setName?`<details class="acct-priv" ${(!u.name||AC.nameOpen)?'open':''}><summary>${u.name?t('nameEdit'):t('nameMissing')}</summary><form id="ac-namef" class="acct-form" novalidate><label>${t('fullName')}<input type="text" id="ac-nm" autocomplete="name" maxlength="60" value="${esc(u.name||'')}" placeholder="${t('namePh')}"></label><button class="btn ghost" type="submit">${t('nameSave')}</button></form></details>`:''}
      ${u.emailVerified?'':`<p class="small note">${t('verifyHint')}</p>`}
      <p class="small muted" id="cloud-line2">${cloudLine()}</p>
      <div class="row"><button class="btn primary" id="ac-sync">${t('syncNow')}</button><button class="btn ghost" id="ac-out">${t('signOut')}</button></div>
      ${C.changePassword?`<details class="acct-priv" ${AC.pwOpen?'open':''}><summary>${t('chPw')}</summary><form id="ac-pwf" class="acct-form" novalidate><label>${t('curPw')}<input type="password" id="ac-cur" autocomplete="current-password" dir="ltr"></label><label>${t('newPw')}<input type="password" id="ac-new" autocomplete="new-password" minlength="8" dir="ltr"></label><button class="btn ghost" type="submit">${t('chPwBtn')}</button></form></details>`:''}
      <details class="acct-priv"><summary>${t('privT')}</summary><p class="small">${t('privD')}</p></details>
      ${AC.confirmDel?`<div class="ex-confirm inline"><p>${t('delConfirm')}</p><div class="row"><button class="btn danger" id="ac-del2">${t('delYes')}</button><button class="btn ghost" id="ac-nodel">${t('cancel')}</button></div></div>`:`<button class="btn danger-ghost sm" id="ac-del">${t('delAcct')}</button>`}
      `:`<h2 id="acct-h">${AC.gate?t('gateT'):t('acctJoinT')}</h2><p class="small ${AC.gate?'gate-msg':'muted'}">${AC.gate?t('gateMsg'):t('acctWhy')}</p>
      <div class="seg acct-seg"><button class="${AC.tab==='signup'?'on':''}" data-tab="signup">${t('signUp')}</button><button class="${AC.tab==='signin'?'on':''}" data-tab="signin">${t('signIn')}</button></div>
      <form id="ac-form" class="acct-form" novalidate>
        ${AC.tab==='signup'&&C.setName?`<label>${t('fullName')}<input type="text" id="ac-name" autocomplete="name" maxlength="60" required placeholder="${t('namePh')}" value="${esc(AC.fName||'')}"></label>`:''}
        <label>${t('email')}<input type="email" id="ac-email" autocomplete="email" required dir="ltr" value="${esc(AC.fEmail||'')}"></label>
        <label>${t('password')}<input type="password" id="ac-pass" autocomplete="${AC.tab==='signup'?'new-password':'current-password'}" minlength="8" required dir="ltr"></label>
        ${AC.tab==='signup'?`<label class="chkl"><input type="checkbox" id="ac-ok"> <span>${t('consent')}</span></label>`:''}
        <button class="btn primary block" type="submit" ${AC.busy?'disabled':''}>${AC.tab==='signup'?t('signUp'):t('signIn')}</button>
      </form>
      ${C.google?`<button class="btn ghost block" id="ac-google">${t('withGoogle')}</button>`:''}
      ${AC.tab==='signin'?`<button class="linkbtn" id="ac-reset">${t('forgot')}</button>`:''}
      <details class="acct-priv"><summary>${t('privT')}</summary><p class="small">${t('privD')}</p></details>`}
    ${AC.err?`<p class="acct-err" role="alert">${esc(AC.err)}</p>`:''}${AC.info?`<p class="acct-info" role="status">${esc(AC.info)}</p>`:''}
  </div>`;
  const on=(id,f)=>{ const b=el.querySelector(id); if(b) b.onclick=f; };
  on('#ac-x',closeAcct);
  el.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{ AC.tab=b.dataset.tab; AC.err=''; renderAcct(); });
  const run=async fn=>{ AC.busy=true; AC.err=''; AC.info=''; renderAcct(); let ok=false; try{ await fn(); ok=true; }catch(e){ AC.err=authMsg(e&&e.code); } AC.busy=false; renderAcct(); renderRoute();
    if(ok&&PEND&&C.user){ const p=PEND; closeAcct(); startTest(p.kind,p.o); } };
  const f=el.querySelector('#ac-form'); if(f) f.onsubmit=e=>{ e.preventDefault(); const em=el.querySelector('#ac-email').value.trim(), pw=el.querySelector('#ac-pass').value; AC.fEmail=em; { const n0=el.querySelector('#ac-name'); if(n0) AC.fName=n0.value; }
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)){ AC.err=t('authErr')['invalid-email']; return renderAcct(); }
    if(pw.length<8){ AC.err=t('authErr')['weak-password']; return renderAcct(); }
    const nmEl=el.querySelector('#ac-name'), nm=nmEl?nmEl.value.replace(/\s+/g,' ').trim():''; AC.fEmail=em; if(nmEl) AC.fName=nm;
    if(nmEl&&(nm.length<2||nm.length>60)){ AC.err=t('authErr')['invalid-name']; return renderAcct(); }
    if(AC.tab==='signup'&&!el.querySelector('#ac-ok').checked){ AC.err=t('needConsent'); return renderAcct(); }
    run(()=>AC.tab==='signup'?C.signUp(em,pw,nm):C.signIn(em,pw)); };
  const nf=el.querySelector('#ac-namef'); if(nf) nf.onsubmit=e=>{ e.preventDefault(); const v=el.querySelector('#ac-nm').value.replace(/\s+/g,' ').trim(); if(v.length<2||v.length>60){ AC.err=t('authErr')['invalid-name']; AC.nameOpen=true; return renderAcct(); } run(async()=>{ await C.setName(v); AC.nameOpen=false; AC.info=t('nameSaved'); }); };
  on('#ac-google',()=>run(()=>C.signInGoogle()));
  on('#ac-reset',()=>{ const em=el.querySelector('#ac-email').value.trim(); if(!em){ AC.err=t('authErr')['invalid-email']; return renderAcct(); } run(async()=>{ await C.reset(em); AC.info=t('resetSent'); }); });
  on('#ac-sync',()=>run(()=>C.pushNow()));
  const pwf=el.querySelector('#ac-pwf'); if(pwf) pwf.onsubmit=e=>{ e.preventDefault(); AC.pwOpen=true; const cu=el.querySelector('#ac-cur').value, nw=el.querySelector('#ac-new').value; if(nw.length<8){ AC.err=t('authErr')['weak-password']; return renderAcct(); }
    run(async()=>{ try{ await C.changePassword(cu,nw); }catch(x){ if(x&&x.code==='invalid-credential'){ const y=new Error('cur'); y.code='cur-pw'; throw y; } throw x; } AC.info=t('pwChanged'); AC.pwOpen=false; }); };
  // sign out: sync first, then remove this account's progress from the device (it is safe in the cloud)
  on('#ac-out',()=>run(async()=>{ if(C.pushNow){ await C.pushNow(); if(C.status==='error'){ const x=new Error('sync'); x.code='sync-first'; throw x; } } await C.signOut(); clearLocal(); AC.info=t('signedOut'); }));
  on('#ac-del',()=>{ AC.confirmDel=true; renderAcct(); }); on('#ac-nodel',()=>{ AC.confirmDel=false; renderAcct(); });
  on('#ac-del2',()=>run(async()=>{ await C.deleteAccount(); setOwner(''); AC.confirmDel=false; AC.info=t('deleted'); }));
}
window.__app={
  getS:()=>S, render:()=>{ if(window.CLOUD?.user?.email) setOwner(window.CLOUD.user.email); renderRoute(); if(!$('#acct').hidden) renderAcct(); },
  cloudStatus:()=>{ ['#cloud-line','#cloud-line2'].forEach(id=>{ const e=$(id); if(e) e.textContent=cloudLine(); }); },
  mergeCloud:c=>{ if(!c||!c.stats) return; const em=window.CLOUD?.user?.email||'', owner=getOwner();
    if(owner&&em&&owner!==em){ DET={}; try{ localStorage.removeItem(DKEY); }catch(e){} S=Object.assign(DEF(),c); }  // local data belongs to another account: never mix it in
    else S=mergeStates(S,c);
    if(em) setOwner(em); try{ localStorage.setItem(KEY,JSON.stringify(S)); }catch(e){} },
  summary:()=>{ const n=S.recent.length, c=S.recent.filter(x=>x.ok).length; return {est:estimate(),readiness:S.attempts.length?readiness():0,solved:n,acc:n?Math.round(100*c/n):0,models:Object.keys(S.models||{}).length,streak:calcStreak(),lastActive:S.days[S.days.length-1]||''}; }
};
$('#acct-btn')&&($('#acct-btn').onclick=openAcct);
$('#acct')&&$('#acct').addEventListener('pointerdown',e=>{ if(e.target.id==='acct') closeAcct(); });
/* which account the progress on this device belongs to (device-only, never synced) */
const OKEY='masar100_owner';
function getOwner(){ try{ return localStorage.getItem(OKEY)||''; }catch(e){ return ''; } }
function setOwner(v){ try{ v?localStorage.setItem(OKEY,v):localStorage.removeItem(OKEY); }catch(e){} }
function clearLocal(){ const lang=S.lang; S=DEF(); S.lang=lang; DET={}; try{ localStorage.removeItem(DKEY); }catch(e){} clearLive(); setOwner(''); save(); }
/* merge local (a) with cloud (b) progress without losing attempts made on either side */
function mergeStates(a,b){
  a=Object.assign(DEF(),a); b=Object.assign(DEF(),b);
  const newer=(b.savedAt||0)>(a.savedAt||0)?b:a, older=newer===a?b:a;
  const o=Object.assign(DEF(),older,newer); o.lang=a.savedAt?newer.lang:b.lang;
  const ida=new Set(a.attempts.map(x=>x.id)), idb=new Set(b.attempts.map(x=>x.id)), sup=(x,y)=>[...y].every(i=>x.has(i));
  const base=sup(ida,idb)&&(ida.size||!idb.size)?a:sup(idb,ida)?b:null;
  if(base){ ['attempts','recent','stats','causes','mistakes','models'].forEach(k=>o[k]=base[k]); }
  else {
    const am=new Map(); [...older.attempts,...newer.attempts].forEach(x=>am.set(x.id,x)); o.attempts=[...am.values()].sort((x,y)=>(x.date+x.id)<(y.date+y.id)?-1:1).slice(-300);
    const ra=a.recent, rb=b.recent; let k=0; while(k<ra.length&&k<rb.length&&JSON.stringify(ra[k])===JSON.stringify(rb[k])) k++;
    o.recent=ra.slice(0,k).concat(rb.slice(k),ra.slice(k)).map((x,i)=>[x,i]).sort((x,y)=>(x[0].d<y[0].d?-1:x[0].d>y[0].d?1:x[1]-y[1])).map(x=>x[0]).slice(-1500);
    o.causes={}; ['concept','careless','time','trap'].forEach(c=>o.causes[c]=Math.max(a.causes[c]||0,b.causes[c]||0));
    const mm=new Map(); [...older.mistakes,...newer.mistakes].forEach(x=>mm.set(x.key,x)); o.mistakes=[...mm.values()].slice(-300);
    o.models={}; new Set([...Object.keys(a.models),...Object.keys(b.models)]).forEach(k=>{ const x=a.models[k], y=b.models[k]; if(!x||!y){ o.models[k]=x||y; return; } const l=(x.date||'')>=(y.date||'')?x:y; o.models[k]={...l,best:Math.max(x.best||0,y.best||0)}; });
  }
  const uni=(x,y)=>[...new Set([...(x||[]),...(y||[])])].sort(); o.days=uni(a.days,b.days); o.sessionDays=uni(a.sessionDays,b.sessionDays);
  o.done=a.planStart===b.planStart?{...older.done,...newer.done}:{...newer.done};
  const pickBox=(x,y)=>{ const r={...x}; for(const [k,v] of Object.entries(y||{})){ const w=r[k]; if(!w||(v.box||0)>(w.box||0)||((v.box||0)===(w.box||0)&&(v.due||'')>(w.due||''))) r[k]=v; } return r; };
  o.cards=pickBox(a.cards,b.cards); o.vocab={ar:pickBox(a.vocab?.ar,b.vocab?.ar),en:pickBox(a.vocab?.en,b.vocab?.en)};
  o.xp={...(a.xp||{})}; for(const [k,v] of Object.entries(b.xp||{})){ const w=o.xp[k]; if(!w||(v.score||0)>(w.score||0)||((v.score||0)===(w.score||0)&&(v.date||'')>(w.date||''))) o.xp[k]=v; }
  o.lastExport=[a.lastExport,b.lastExport].filter(Boolean).sort().pop()||undefined;
  o.savedAt=Math.max(a.savedAt||0,b.savedAt||0);
  return o;
}
/* ============ attempt details (local) ============ */
const DKEY='masar100_details';
function loadDetails(){ try{ return JSON.parse(localStorage.getItem(DKEY))||{}; }catch(e){ return {}; } }
let DET=loadDetails();
function getDetail(id){ return DET[id]||null; }
function saveDetail(att,all){
  const qs=all.map(({q,your,time})=>({s:q.s,q:q.q,pkey:q.pkey||null,passage:q.pkey?null:(q.passage||null),opts:q.opts,ans:q.ans,exp:q.exp,cmp:!!q.cmp,key:q.key||null,your,t:Math.round(time)}));
  DET[att.id]={id:att.id,kind:X.kind,title:X.title,lang:X.lang,mk:X.kind==='model'?X.mk:null,skill:X.skill||null,att,qs};
  // keep: the latest attempt of each model + the 20 most recent other attempts
  const modelIds=new Set(Object.values(S.models||{}).map(m=>m.aid).filter(Boolean));
  const others=Object.values(DET).filter(x=>!modelIds.has(x.id)).sort((a,b)=>a.id<b.id?1:-1);
  others.slice(20).forEach(x=>delete DET[x.id]);
  Object.values(DET).forEach(x=>{ if(x.kind==='model'&&!modelIds.has(x.id)&&!others.slice(0,20).includes(x)) delete DET[x.id]; });
  for(let i=0;i<5;i++){ try{ localStorage.setItem(DKEY,JSON.stringify(DET)); break; }catch(e){ const old=Object.values(DET).sort((a,b)=>a.id<b.id?-1:1)[0]; if(!old) break; delete DET[old.id]; } }
}
function openReview(id){
  if(X&&!X.result&&!X.reviewOnly) return;
  const d=getDetail(id); if(!d){ const a=S.attempts.find(x=>x.id===id); if(!a){ toast(t('noDetail')); return; }
    const tt=T[S.lang], title=(tt.kinds[a.kind]||a.kind)+(a.mk?' '+numL(a.mk):'')+(a.skill&&SKILLS[a.skill]?' · '+SKILLS[a.skill][S.lang]:'');
    clearInterval(timer);
    X={kind:a.kind,title,lang:S.lang,mk:a.mk?a.mk-1:null,skill:a.skill||null,reviewOnly:true,sections:[],result:{all:[],bySkill:{},correct:a.correct,skipped:null,att:{...a,total:a.total||0,time:a.time||0},filter:'wrong',noDetail:true}};
    document.body.classList.add('exam-open'); $('#exam').hidden=false; renderExam(); return; }
  const all=d.qs.map(x=>({q:{...x,area:SKILLS[x.s].area,passage:x.pkey?(PASSAGES[d.lang]||{})[x.pkey]:x.passage},your:x.your,time:x.t}));
  const bySkill={}; all.forEach(({q,your})=>{ const b=bySkill[q.s]||(bySkill[q.s]={c:0,t:0}); b.t++; if(your===q.ans) b.c++; });
  const correct=all.filter(x=>x.your===x.q.ans).length, skipped=all.filter(x=>x.your==null).length;
  clearInterval(timer);
  X={kind:d.kind,title:d.title,lang:d.lang,mk:d.mk,skill:d.skill,reviewOnly:true,sections:[],result:{all,bySkill,correct,skipped,att:d.att,filter:'wrong'}};
  document.body.classList.add('exam-open'); $('#exam').hidden=false; renderExam();
}
/* unfinished test: survives a reload (clock paused while away) */
const LKEY='masar100_live';
function saveLive(){ if(!X||X.result||X.reviewOnly) return; try{ const {confirm,showMap,...rest}=X; localStorage.setItem(LKEY,JSON.stringify({at:Date.now(),X:rest})); }catch(e){} }
function clearLive(){ try{ localStorage.removeItem(LKEY); }catch(e){} }
function checkLive(){
  let L=null; try{ L=JSON.parse(localStorage.getItem(LKEY)); }catch(e){}
  if(!L||!L.X||!L.X.sections||Date.now()-(L.at||0)>864e5){ clearLive(); return; }
  const tt=T[S.lang], lx=L.X, sec=lx.sections[lx.si]||lx.sections[0];
  const el=$('#exam'); el.dir=S.lang==='ar'?'rtl':'ltr'; el.lang=S.lang; document.body.classList.add('exam-open'); el.hidden=false;
  el.innerHTML=`<div class="ex-top"><div class="ex-title"><strong>${esc(tt.resumeT)}</strong></div></div><div class="rs"><div class="ex-confirm"><p>${esc(tt.resumeD(lx.title,numL(lx.qi+1),numL(sec.qs.length)))}</p><div class="row"><button class="btn primary" id="lv-yes">${tt.resumeBtn}</button><button class="btn ghost" id="lv-no">${tt.discardBtn}</button></div></div></div>`;
  el.querySelector('#lv-yes').onclick=()=>{ X={...lx,confirm:null,showMap:false,qStart:Date.now()}; clearInterval(timer); timer=setInterval(tick,1000); renderExam(); toast(tt.resumed); };
  el.querySelector('#lv-no').onclick=()=>{ clearLive(); el.hidden=true; el.innerHTML=''; document.body.classList.remove('exam-open'); };
}
/* selective reset */
function resetParts(parts){
  const has=k=>parts.includes(k)||parts.includes('all');
  if(parts.includes('all')){ DET={}; try{ localStorage.removeItem(DKEY); }catch(e){} const lang=S.lang, track=S.track, target=S.target; S=DEF(); Object.assign(S,{lang,track,target}); save(); renderRoute(); return; }
  if(has('plan')){ S.done={}; S.planStart=todayStr(); }
  if(has('mistakes')){ S.mistakes=[]; S.causes={concept:0,careless:0,time:0,trap:0}; }
  if(has('models')){ Object.values(S.models||{}).forEach(m=>{ if(m.aid) delete DET[m.aid]; }); S.models={}; S.attempts=S.attempts.filter(a=>a.kind!=='model'); }
  if(has('cards')){ S.cards={}; S.vocab={ar:{},en:{}}; S.xp={}; }
  if(has('skills')){ DET={}; S.recent=[]; S.stats={}; S.attempts=[]; S.days=[]; S.sessionDays=[]; S.models={}; }
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
  const doIt=()=>{ S=Object.assign(DEF(),o); save(); renderRoute(); toast(t('imported')); };
  const box=$('#bk-confirm'); if(!box||!(S.attempts.length||Object.keys(S.cards).length)) return doIt();
  box.innerHTML=`<div class="ex-confirm inline"><p>${t('importQ')}</p><div class="row"><button class="btn primary" id="im-yes">${t('importYes')}</button><button class="btn ghost" id="im-no">${t('cancel')}</button></div></div>`;
  $('#im-yes').onclick=doIt; $('#im-no').onclick=()=>box.innerHTML=''; box.scrollIntoView({block:'nearest'});
}
$('#lang-btn').onclick=()=>{ S.lang=S.lang==='ar'?'en':'ar'; VC.flip=false; save(); renderRoute(); };
let XP_BACK=null;
if(XPOK()){ XP.setHooks({onDone:(k,sc,n)=>{ S.xp=S.xp||{}; const w=S.xp[k]; if(!w||sc>=(w.score||0)) S.xp[k]={score:sc,n,date:todayStr()}; save(); },
  onClose:()=>{ const y=window.scrollY; renderRoute(); window.scrollTo(0,y); const b=XP_BACK&&document.querySelector(`[data-xp="${XP_BACK}"]`); if(b) b.focus({preventScroll:true}); }}); XP.loadTracks(); }
window.addEventListener('hashchange',()=>{ if(document.body.classList.contains('xp-open')&&XPOK()) XP.close(); renderRoute(); window.scrollTo(0,0); });
renderRoute(); initAI(); checkLive();
{ const el=$('#save-dot'); if(el){ el.classList.toggle('bad',!STORE_OK); el.title=STORE_OK?t('savedOk'):t('saveFail'); el.setAttribute('aria-label',el.title); } }
