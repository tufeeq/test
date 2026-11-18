# جدير — تنزيل ملفات PDF العشرين في ملف ZIP واحد

تنزّل هذه الأداة ملفات PDF الأصلية من [الأقسام الحمراء (إتقان)](https://jadir-ksa.com/library/section/41?page=1) في موقع جدير، وتتحقق من صلاحية الملفات العشرين قبل نشر الأرشيف.

## طريقة الاستخدام من GitHub (بدون تثبيت)

1. افتح [صفحة التشغيل](https://github.com/tufeeq/test/actions/workflows/jadir-pdf-collector.yml).
2. اضغط **Run workflow**، واختر الفرع **main**، ثم **Run workflow** مجددًا.
3. افتح عملية التشغيل الجديدة بعد ظهور علامة النجاح الخضراء.
4. من قسم **Artifacts** اضغط **Jadir_20_PDFs**.

سيبدأ تنزيل **ملف ZIP واحد يحتوي مباشرة على 20 ملف PDF**. قد يتطلب تنزيل GitHub Artifacts تسجيل الدخول إلى GitHub.

**مهم:** إذا تعذر الوصول إلى أي ملف، لن تعلن الأداة النجاح ولن تنشر حزمة ناقصة. ستظهر تفاصيل الإخفاق في سجل العملية، مع تقرير قابل للتنزيل.

## تشغيل محلي اختياري

يتطلب Python 3.10+ فقط، بلا حزم إضافية:

```bash
python3 jadir-collector/collect.py --output output
```

النتائج: `output/pdfs/` و `output/Jadir_Red_Sections_01-20_PDFs.zip` و `output/download_report.json`.

تتضمن الحزمة أسماء الأقسام 1–20 كما طلبت، ولا تتضمن استبدالًا للمستندات الأصلية. احترم شروط موقع جدير وحقوق مؤلفي المحتوى. لا تتجاوز الأداة آليات المصادقة أو الحماية.

الملفات: `links.json` للروابط، `collect.py` للتنزيل والتحقق، `tests/` للاختبارات، و `.github/workflows/jadir-pdf-collector.yml` للتشغيل السحابي.
