# WhatsApp message templates (Meta submission)

Owner: B5. Source of truth: `TEMPLATES` in `server/lib/notify.js`. **The body text below must stay byte-identical to the code**; if you edit one, edit the other and resubmit.

## How to submit

1. In Meta Business Manager → WhatsApp Manager → **Message templates** → *Create template*.
2. Category **Utility** for all of them (they are transactional updates the customer expects). Language **Arabic (ar)**.
3. Name = the template key below (lowercase, underscores). Paste the body exactly, then fill the sample values Meta asks for (use the examples given).
4. No header, no footer, no buttons (links are in the body so one template works with and without a custom domain).
5. After approval set `WHATSAPP_TOKEN` (permanent system-user token with `whatsapp_business_messaging`) and `WHATSAPP_PHONE_NUMBER_ID`. Until then every message is logged with status `simulated`.
6. Optional env: `WHATSAPP_API_VERSION` (default `v23.0`), `WHATSAPP_LANG` (default `ar`; must match the approved language code).

Notes:
- Variables are positional `{{1}}…{{n}}`. Dawra strips newlines/tabs from values (Meta rejects them).
- Rendered text is also stored in `messages.body`, so the log shows exactly what the customer received.
- Free-form messages from `POST /api/messages` are sent as `type: text`; Meta only delivers those within 24 hours of the customer's last message. Outside that window use a template.
- Starter-plan companies don't get automatic customer WhatsApp (Pro feature); expired/cancelled subscriptions are skipped.

## `job_scheduled`

- **Category:** UTILITY
- **When:** Sent when a job gets a technician and a time (B1 POST/PATCH /jobs).
- **Variables:** {{1}} customer_name, {{2}} job_title, {{3}} date, {{4}} time, {{5}} tracking_url, {{6}} company_name

Body:

```text
مرحباً {{1}}،
تم تأكيد موعد «{{2}}» يوم {{3}} الساعة {{4}}.
تابع حالة طلبك من الرابط: {{5}}
مع تحيات فريق {{6}}، نسعد بخدمتك.
```

Sample values: {{1}} = فهد · {{2}} = غسيل مكيف سبليت · {{3}} = الأحد 12 أكتوبر · {{4}} = 10:00 ص · {{5}} = https://dawra.app/t/8f3a… · {{6}} = مؤسسة النسيم للتكييف

Preview:

> مرحباً فهد،
> تم تأكيد موعد «غسيل مكيف سبليت» يوم الأحد 12 أكتوبر الساعة 10:00 ص.
> تابع حالة طلبك من الرابط: https://dawra.app/t/8f3a…
> مع تحيات فريق مؤسسة النسيم للتكييف، نسعد بخدمتك.

## `technician_on_the_way`

- **Category:** UTILITY
- **When:** Job status → on_the_way (event tech_on_the_way).
- **Variables:** {{1}} customer_name, {{2}} technician_name, {{3}} job_title, {{4}} tracking_url, {{5}} company_name

Body:

```text
مرحباً {{1}}،
الفني {{2}} في الطريق إليك الآن لطلب «{{3}}».
تابع الطلب لحظة بلحظة: {{4}}
فريق {{5}} في خدمتك.
```

Sample values: {{1}} = فهد · {{2}} = أحمد · {{3}} = غسيل مكيف سبليت · {{4}} = https://dawra.app/t/8f3a… · {{5}} = مؤسسة النسيم للتكييف

Preview:

> مرحباً فهد،
> الفني أحمد في الطريق إليك الآن لطلب «غسيل مكيف سبليت».
> تابع الطلب لحظة بلحظة: https://dawra.app/t/8f3a…
> فريق مؤسسة النسيم للتكييف في خدمتك.

## `job_completed_rating`

- **Category:** UTILITY
- **When:** Job status → completed (event job_completed). Link opens the tracking page at the rating form.
- **Variables:** {{1}} customer_name, {{2}} job_title, {{3}} company_name, {{4}} rating_url

Body:

```text
مرحباً {{1}}،
تم إنجاز «{{2}}» بنجاح، شكراً لثقتك في {{3}}.
قيّم الخدمة بنقرة واحدة: {{4}}
رأيك يهمنا.
```

Sample values: {{1}} = فهد · {{2}} = غسيل مكيف سبليت · {{3}} = مؤسسة النسيم للتكييف · {{4}} = https://dawra.app/t/8f3a…#rate

Preview:

> مرحباً فهد،
> تم إنجاز «غسيل مكيف سبليت» بنجاح، شكراً لثقتك في مؤسسة النسيم للتكييف.
> قيّم الخدمة بنقرة واحدة: https://dawra.app/t/8f3a…#rate
> رأيك يهمنا.

## `invoice_issued`

- **Category:** UTILITY
- **When:** Invoice created for a job (B2).
- **Variables:** {{1}} customer_name, {{2}} invoice_number, {{3}} company_name, {{4}} total, {{5}} invoice_url

Body:

```text
مرحباً {{1}}،
صدرت فاتورتك رقم {{2}} من {{3}} بمبلغ {{4}} ريال شامل ضريبة القيمة المضافة.
عرض الفاتورة والدفع بمدى أو Apple Pay: {{5}}
شكراً لك.
```

Sample values: {{1}} = فهد · {{2}} = 1024 · {{3}} = مؤسسة النسيم للتكييف · {{4}} = 172.50 · {{5}} = https://dawra.app/i/c91e…

Preview:

> مرحباً فهد،
> صدرت فاتورتك رقم 1024 من مؤسسة النسيم للتكييف بمبلغ 172.50 ريال شامل ضريبة القيمة المضافة.
> عرض الفاتورة والدفع بمدى أو Apple Pay: https://dawra.app/i/c91e…
> شكراً لك.

## `contract_visit_reminder`

- **Category:** UTILITY
- **When:** Scheduler created the next contract visit job (14 days ahead by default).
- **Variables:** {{1}} customer_name, {{2}} contract_title, {{3}} company_name, {{4}} visit_date

Body:

```text
مرحباً {{1}}،
اقترب موعد زيارة الصيانة الدورية ضمن «{{2}}» مع {{3}}، والمقررة بتاريخ {{4}}.
سنتواصل معك لتأكيد الوقت، ويمكنك الرد على هذه الرسالة لاختيار الوقت المناسب لك.
```

Sample values: {{1}} = فهد · {{2}} = عقد صيانة سنوي - مجمع عيادات الرعاية · {{3}} = مؤسسة النسيم للتكييف · {{4}} = 16 أكتوبر 2026

Preview:

> مرحباً فهد،
> اقترب موعد زيارة الصيانة الدورية ضمن «عقد صيانة سنوي - مجمع عيادات الرعاية» مع مؤسسة النسيم للتكييف، والمقررة بتاريخ 16 أكتوبر 2026.
> سنتواصل معك لتأكيد الوقت، ويمكنك الرد على هذه الرسالة لاختيار الوقت المناسب لك.

## `job_reminder`

- **Category:** UTILITY
- **When:** Scheduler, once per job, the day before a scheduled visit (sent 09:00–21:00 Riyadh).
- **Variables:** {{1}} job_title, {{2}} date, {{3}} time, {{4}} company_name, {{5}} tracking_url

Body:

```text
تذكير بموعدك: «{{1}}» غداً {{2}} الساعة {{3}} مع {{4}}.
تابع الطلب: {{5}}
لتغيير الموعد يمكنك الرد على هذه الرسالة.
```

Sample values: {{1}} = غسيل مكيف سبليت · {{2}} = الأحد 12 أكتوبر · {{3}} = 10:00 ص · {{4}} = مؤسسة النسيم للتكييف · {{5}} = https://dawra.app/t/8f3a…

Preview:

> تذكير بموعدك: «غسيل مكيف سبليت» غداً الأحد 12 أكتوبر الساعة 10:00 ص مع مؤسسة النسيم للتكييف.
> تابع الطلب: https://dawra.app/t/8f3a…
> لتغيير الموعد يمكنك الرد على هذه الرسالة.

## `booking_received`

- **Category:** UTILITY
- **When:** Internal alert to the company phone when a public booking arrives (channel system).
- **Variables:** {{1}} customer_name, {{2}} customer_phone, {{3}} description, {{4}} priority

Body:

```text
طلب حجز جديد من صفحة الحجز:
العميل: {{1}}
الجوال: {{2}}
المشكلة: {{3}}
الأولوية المقترحة: {{4}}
افتح «طلبات الحجز» في دورة لتحويله إلى مهمة.
```

Sample values: {{1}} = ماجد العمري · {{2}} = 966559876543 · {{3}} = المكيف يطلع ماء ويطفي لحاله · {{4}} = عاجلة

Preview:

> طلب حجز جديد من صفحة الحجز:
> العميل: ماجد العمري
> الجوال: 966559876543
> المشكلة: المكيف يطلع ماء ويطفي لحاله
> الأولوية المقترحة: عاجلة
> افتح «طلبات الحجز» في دورة لتحويله إلى مهمة.

