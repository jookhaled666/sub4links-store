import { RotateCcw, AlertOctagon, HelpCircle, ShieldAlert, CheckCircle } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import './LegalPages.css';

export default function RefundPage() {
  return (
    <>
      <Navbar />
      <main className="section" style={{ paddingTop: '7.5rem' }}>
        <div className="container">
          <div className="legal-page-container">
            <div className="legal-page-header">
              <span className="legal-page-eyebrow">سياسات شفافة</span>
              <h1 className="legal-page-title">سياسة الاستبدال والاسترجاع</h1>
              <p className="legal-page-updated">آخر تحديث: يونيو 2026</p>
            </div>

            <div className="legal-page-content">
              <div className="legal-section">
                <h3 className="legal-section-title">
                  <RotateCcw className="legal-section-icon" size={22} />
                  1. القاعدة العامة للمنتجات الرقمية
                </h3>
                <p>
                  نظراً لأن الخدمات والاشتراكات المقدمة عبر منصة Sub4Links هي منتجات رقمية وغير ملموسة ويتم تسليمها أو تفعيلها مباشرةً بعد الشراء، فإنه <strong>لا يحق للعميل طلب الاستبدال أو استرجاع الأموال بمجرد البدء في معالجة الطلب أو تسليم تفاصيل الاشتراك وتفعيله</strong>.
                </p>
              </div>

              <div className="legal-section">
                <h3 className="legal-section-title">
                  <CheckCircle className="legal-section-icon" size={22} />
                  2. الحالات الاستثنائية المقبولة للاسترجاع
                </h3>
                <p>
                  نحن نضمن حقوق عملائنا بالكامل، ولذلك يتم قبول طلب الاستبدال أو استرداد الأموال في الحالات التالية فقط:
                </p>
                <ul className="legal-list">
                  <li className="legal-list-item">
                    فشل المنصة في تفعيل أو تسليم الخدمة الرقمية المطلوبة للعميل بسبب مشكلة تقنية راجعة للمنصة.
                  </li>
                  <li className="legal-list-item">
                    عدم توفر الخدمة المطلوبة أو تأخر التسليم لأكثر من 48 ساعة دون إشعار مسبق أو تواصل من الدعم الفني.
                  </li>
                  <li className="legal-list-item">
                    في حال تعطل الاشتراك الرقمي المفعل أثناء فترة الضمان بسبب خطأ تقني، ولم يستطع فريق الدعم الفني إصلاح العطل أو استبدال الحساب خلال 72 ساعة من التبليغ.
                  </li>
                </ul>
              </div>

              <div className="legal-section">
                <h3 className="legal-section-title">
                  <AlertOctagon className="legal-section-icon" size={22} />
                  3. مهلة التحقق والتبليغ
                </h3>
                <p>
                  يمنح العميل <strong>مهلة 24 ساعة فقط</strong> من وقت تسليم أو تفعيل الخدمة للتحقق من سلامة وصحة التفعيل والإبلاغ عن أي مشكلة أو خلل فني. في حال عدم تواصل العميل معنا خلال هذه المهلة، يعتبر الطلب مكتملاً ومفعلاً بشكل صحيح، وتسقط أهلية طلب الاستبدال أو الاسترداد.
                </p>
                <div className="legal-alert">
                  <div className="legal-alert-title">
                    <ShieldAlert size={18} />
                    شروط انقطاع التواصل
                  </div>
                  <p>
                    في حال تواصل الدعم الفني مع العميل لحل مشكلة التفعيل أو طلب بيانات ضرورية للتفعيل، ولم يتجاوب العميل أو ينقطع تواصله مع الدعم الفني لمدة تتجاوز 14 يوماً، يعتبر الطلب ملغى بشكل نهائي ولا يحق للعميل المطالبة بأي مبالغ مستردة.
                  </p>
                </div>
              </div>

              <div className="legal-section">
                <h3 className="legal-section-title">
                  <HelpCircle className="legal-section-icon" size={22} />
                  4. حالات لا تشملها سياسة الاسترداد
                </h3>
                <p>
                  لا يحق للعميل المطالبة بالاسترداد أو الاستبدال في الحالات التالية:
                </p>
                <ul className="legal-list">
                  <li className="legal-list-item">
                    تغيير رأي العميل أو عدم الرغبة في استخدام الاشتراك بعد إتمام عملية الدفع والتفعيل.
                  </li>
                  <li className="legal-list-item">
                    فشل التفعيل بسبب عدم رغبة العميل في تقديم البيانات المطلوبة لإكمال التفعيل (كالحسابات أو كلمات المرور اللازمة للتفعيل المباشر).
                  </li>
                  <li className="legal-list-item">
                    إساءة استخدام الاشتراك أو مخالفة شروط وسياسات الشركة الأم المزودة للاشتراك، مما يعرض الحساب للحظر.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
