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
  acctTitle:'حسابك', acctJoinT:'احفظ تقدمك في السحابة', acctWhy:'بريد وكلمة مرور فقط. يُحفظ تقدمك ويتبعك على أي جهاز تدخل منه.', signUp:'تسجيل جديد', signIn:'دخول', email:'البريد الإلكتروني', password:'كلمة المرور (٨ أحرف على الأقل)', consent:'أوافق على حفظ بريدي ومساري وهدفي وتقدمي في التدريب لغرض متابعة تحضيري فقط.', needConsent:'يلزم الموافقة على حفظ البيانات لإكمال التسجيل.', withGoogle:'المتابعة بحساب Google', forgot:'نسيت كلمة المرور؟', resetSent:'أرسلنا رابط إعادة التعيين إلى بريدك.', syncNow:'مزامنة الآن', chPw:'تغيير كلمة المرور', curPw:'كلمة المرور الحالية', newPw:'كلمة المرور الجديدة (٨ أحرف على الأقل)', chPwBtn:'غيّر كلمة المرور', pwChanged:'تم تغيير كلمة المرور.', signOut:'تسجيل الخروج', verifyHint:'أرسلنا رابط تأكيد إلى بريدك. التأكيد اختياري لكنه يساعدك على استعادة الحساب.', delAcct:'حذف حسابي وبياناتي', delConfirm:'سيُحذف حسابك وكل بياناتك من السحابة نهائيًا. يبقى تقدمك على هذا الجهاز فقط.', delYes:'نعم، احذف', deleted:'حُذف الحساب والبيانات.',
  privT:'ما البيانات التي نحفظها؟', privD:'نحفظ فقط: بريدك الإلكتروني، مسارك (علمي/نظري)، درجتك المستهدفة، موعد اختبارك إن أدخلته، وتقدمك في التدريب. لا نطلب اسمًا ولا رقم جوال ولا هوية. يمكنك حذف حسابك وكل بياناتك في أي وقت من هذه النافذة.',
  authErr:{'email-already-in-use':'هذا البريد مسجّل مسبقًا. اختر «دخول».','invalid-email':'البريد الإلكتروني غير صحيح.','weak-password':'كلمة المرور قصيرة؛ استخدم ٨ أحرف على الأقل.','invalid-credential':'البريد أو كلمة المرور غير صحيحة.','wrong-password':'البريد أو كلمة المرور غير صحيحة.','user-not-found':'لا يوجد حساب بهذا البريد. اختر «تسجيل جديد».','too-many-requests':'محاولات كثيرة. انتظر قليلًا ثم حاول.','network-request-failed':'لا يوجد اتصال بالإنترنت.','requires-recent-login':'لحذف الحساب سجّل الخروج ثم ادخل من جديد وكرر الحذف.','popup-closed-by-user':'أُغلقت نافذة Google قبل الإكمال.','operation-not-allowed':'طريقة الدخول هذه غير مفعّلة بعد.','reset-admin':'لإعادة تعيين كلمة المرور تواصل مع مشرف الموقع، وسيعطيك كلمة مرور مؤقتة تغيّرها بعد الدخول.',consent:'يلزم الموافقة على حفظ البيانات لإكمال التسجيل.',unauthenticated:'انتهت الجلسة. ادخل من جديد.',server:'تعذّر الاتصال بالخادم. حاول بعد قليل.',other:'حدث خطأ غير متوقع. حاول مرة أخرى.'},
  reviewBtn:'مراجعة', reviewOf:'مراجعة اختبار', retake:'أعد الحل', reviewHint:'اضغط على أي اختبار مكتمل لمراجعة إجاباتك وأخطائك. تُحفظ تفاصيل آخر ٢٠ اختبارًا وآخر محاولة لكل نموذج على هذا الجهاز.', noDetail:'تفاصيل هذا الاختبار غير متاحة؛ ربما أُجري قبل هذا التحديث أو على جهاز آخر.',
  restartT:'ابدأ الخطة من جديد', restartD:'تعود الخطة إلى الأسبوع الأول ابتداءً من اليوم وتُلغى علامات إنجاز المهام. يبقى مستواك ونتائجك ودفتر أخطائك كما هي.', restartBtn:'ابدأ الخطة من جديد', restartConfirm:'ستبدأ الخطة من الأسبوع الأول اليوم. هل تريد المتابعة؟', restartDone:'بدأت خطتك من جديد',
  resetPick:'اختر ما تريد مسحه:', resetWarn:'لا يمكن التراجع عن المسح. احفظ ملف التقدم أولًا إن أردت نسخة.', resetDone:'تم المسح',
  resetParts:{plan:['الخطة ومهامها','تبدأ الخطة من الأسبوع الأول اليوم'],mistakes:['دفتر الأخطاء','الأسئلة المحفوظة للمراجعة وأسباب الأخطاء'],models:['النماذج الكاملة','درجات النماذج الثلاثين لتعيد حلها من جديد'],cards:['البطاقات والمفردات','تعود كل البطاقات غير محفوظة'],skills:['المستوى والنتائج','خريطة الإتقان، الدرجة التقديرية، سجل المحاولات، والنماذج'],all:['كل التقدم','كل ما سبق؛ يبقى مسارك وهدفك ولغتك']},
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
  practice10:'تدرّب (١٠ أسئلة بتصحيح فوري)', answer:'الإجابة', why:'السبب', lessonsOpen:'افتح الدرس',
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
  acctTitle:'Your account', acctJoinT:'Save your progress in the cloud', acctWhy:'Email and password only. Your progress is saved and follows you to any device.', signUp:'Sign up', signIn:'Sign in', email:'Email', password:'Password (at least 8 characters)', consent:'I agree to store my email, track, target and practice progress only to follow my preparation.', needConsent:'Please agree to data storage to finish signing up.', withGoogle:'Continue with Google', forgot:'Forgot password?', resetSent:'We sent a reset link to your email.', syncNow:'Sync now', chPw:'Change password', curPw:'Current password', newPw:'New password (at least 8 characters)', chPwBtn:'Change password', pwChanged:'Password changed.', signOut:'Sign out', verifyHint:'We sent a confirmation link to your email. It is optional but helps you recover your account.', delAcct:'Delete my account and data', delConfirm:'Your account and all cloud data will be deleted permanently. Your progress stays on this device only.', delYes:'Yes, delete', deleted:'Account and data deleted.',
  privT:'What data do we keep?', privD:'Only: your email, your track, your target score, your test date if you enter it, and your practice progress. No name, phone number or ID. You can delete your account and all data anytime from this window.',
  authErr:{'email-already-in-use':'This email is already registered. Choose "Sign in".','invalid-email':'That email address is not valid.','weak-password':'Password too short; use at least 8 characters.','invalid-credential':'Wrong email or password.','wrong-password':'Wrong email or password.','user-not-found':'No account with this email. Choose "Sign up".','too-many-requests':'Too many attempts. Wait a moment and try again.','network-request-failed':'No internet connection.','requires-recent-login':'To delete your account, sign out, sign in again and repeat.','popup-closed-by-user':'The Google window closed before finishing.','operation-not-allowed':'This sign-in method is not enabled yet.','reset-admin':'To reset your password, contact the site admin for a temporary password, then change it after signing in.',consent:'Please agree to data storage to finish signing up.',unauthenticated:'Your session ended. Please sign in again.',server:'Could not reach the server. Try again shortly.',other:'Something went wrong. Please try again.'},
  reviewBtn:'Review', reviewOf:'Review of test', retake:'Retake', reviewHint:'Tap any completed test to review your answers and mistakes. Details of the last 20 tests and the latest attempt of each model are kept on this device.', noDetail:'Details for this test are not available; it may predate this update or come from another device.',
  restartT:'Restart the plan', restartD:'The plan goes back to week 1 starting today and task checkmarks are cleared. Your level, results and mistake log stay as they are.', restartBtn:'Restart the plan', restartConfirm:'Your plan will restart from week 1 today. Continue?', restartDone:'Your plan has restarted',
  resetPick:'Choose what to erase:', resetWarn:'Erasing cannot be undone. Save a progress file first if you want a copy.', resetDone:'Erased',
  resetParts:{plan:['Plan and tasks','The plan restarts from week 1 today'],mistakes:['Mistake log','Saved review questions and mistake causes'],models:['Full model tests','Scores for all 30 tests, so you can retake them fresh'],cards:['Cards and vocabulary','All cards return to unlearned'],skills:['Level and results','Mastery map, estimated score, attempt history and model tests'],all:['All progress','Everything above; your track, target and language stay']},
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
  practice10:'Practice (10 questions, instant feedback)', answer:'Answer', why:'Why', lessonsOpen:'Open lesson',
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

/* ============ STATE ============ */
const KEY='masar100_v1';
const todayStr=()=>new Date().toISOString().slice(0,10);
const addDays=(d,n)=>{ const x=new Date(d+'T12:00:00'); x.setDate(x.getDate()+n); return x.toISOString().slice(0,10); };
const DEF=()=>({lang:'ar',track:'sci',target:100,examDate:'',weeks:8,planStart:todayStr(),done:{},stats:{},recent:[],attempts:[],mistakes:[],days:[],sessionDays:[],vocab:{ar:{},en:{}},cards:{},models:{},causes:{concept:0,careless:0,time:0,trap:0}});
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
  if(tab==='lessons'){ const card=s=>{ const i=skillInfo(s), l=LESSONS[s][S.lang], c=FLASH.find(f=>f.sk===s); return `<a class="lcard" href="#lesson-${s}"><div class="lc-ill">${ILL[c.ill]()}</div><div class="lc-top"><h3>${SKILLS[s][S.lang]}</h3>${pips(i.level)}</div><p>${M(esc(l.concept[0]))}</p><div class="lc-f"><span class="muted small">${t('levels')[i.level]}</span><span class="lc-go">${t('lessonsOpen')}</span></div></a>`; };
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
  const ab=$('#acct-btn'); if(ab){ ab.hidden=!window.CLOUD; ab.classList.toggle('on',!!window.CLOUD?.user); ab.title=window.CLOUD?.user?(window.CLOUD.user.email||''):t('acctJoin'); }
  $('#main').innerHTML=r.v(); $('#foot').textContent=t('footer'); bindMain();
}
function bindMain(){
  const m=$('#main');
  m.querySelectorAll('[data-review]').forEach(b=>{ b.onclick=e=>{ e.stopPropagation(); openReview(b.dataset.review); }; if(b.tagName==='TR') b.onkeydown=e=>{ if(e.key==='Enter') openReview(b.dataset.review); }; });
  m.querySelectorAll('[data-acct]').forEach(b=>b.onclick=openAcct);
  m.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>document.getElementById(b.dataset.go)?.scrollIntoView({behavior:'smooth'}));
  m.querySelectorAll('[data-start]').forEach(b=>b.onclick=()=>startTest(b.dataset.start,{skill:b.dataset.skill}));
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
    ${u?`<h2 id="acct-h">${t('acctTitle')}</h2>
      <p class="acct-mail">${esc(u.email||'')}</p>
      ${u.emailVerified?'':`<p class="small note">${t('verifyHint')}</p>`}
      <p class="small muted" id="cloud-line2">${cloudLine()}</p>
      <div class="row"><button class="btn primary" id="ac-sync">${t('syncNow')}</button><button class="btn ghost" id="ac-out">${t('signOut')}</button></div>
      ${C.changePassword?`<details class="acct-priv" ${AC.pwOpen?'open':''}><summary>${t('chPw')}</summary><form id="ac-pwf" class="acct-form" novalidate><label>${t('curPw')}<input type="password" id="ac-cur" autocomplete="current-password" dir="ltr"></label><label>${t('newPw')}<input type="password" id="ac-new" autocomplete="new-password" minlength="8" dir="ltr"></label><button class="btn ghost" type="submit">${t('chPwBtn')}</button></form></details>`:''}
      <details class="acct-priv"><summary>${t('privT')}</summary><p class="small">${t('privD')}</p></details>
      ${AC.confirmDel?`<div class="ex-confirm inline"><p>${t('delConfirm')}</p><div class="row"><button class="btn danger" id="ac-del2">${t('delYes')}</button><button class="btn ghost" id="ac-nodel">${t('cancel')}</button></div></div>`:`<button class="btn danger-ghost sm" id="ac-del">${t('delAcct')}</button>`}
      `:`<h2 id="acct-h">${AC.gate?t('gateT'):t('acctJoinT')}</h2><p class="small ${AC.gate?'gate-msg':'muted'}">${AC.gate?t('gateMsg'):t('acctWhy')}</p>
      <div class="seg acct-seg"><button class="${AC.tab==='signup'?'on':''}" data-tab="signup">${t('signUp')}</button><button class="${AC.tab==='signin'?'on':''}" data-tab="signin">${t('signIn')}</button></div>
      <form id="ac-form" class="acct-form" novalidate>
        <label>${t('email')}<input type="email" id="ac-email" autocomplete="email" required dir="ltr"></label>
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
  const f=el.querySelector('#ac-form'); if(f) f.onsubmit=e=>{ e.preventDefault(); const em=el.querySelector('#ac-email').value.trim(), pw=el.querySelector('#ac-pass').value;
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)){ AC.err=t('authErr')['invalid-email']; return renderAcct(); }
    if(pw.length<8){ AC.err=t('authErr')['weak-password']; return renderAcct(); }
    if(AC.tab==='signup'&&!el.querySelector('#ac-ok').checked){ AC.err=t('needConsent'); return renderAcct(); }
    run(()=>AC.tab==='signup'?C.signUp(em,pw):C.signIn(em,pw)); };
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
  if(has('cards')){ S.cards={}; S.vocab={ar:{},en:{}}; }
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
window.addEventListener('hashchange',()=>{ renderRoute(); window.scrollTo(0,0); });
renderRoute(); initAI(); checkLive();
{ const el=$('#save-dot'); if(el){ el.classList.toggle('bad',!STORE_OK); el.title=STORE_OK?t('savedOk'):t('saveFail'); el.setAttribute('aria-label',el.title); } }
