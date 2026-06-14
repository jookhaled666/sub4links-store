import { FileText, ShieldAlert, BadgeCheck, HelpCircle, HeartHandshake } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import './LegalPages.css';

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="section" style={{ paddingTop: '7.5rem' }}>
        <div className="container">
          <div className="legal-page-container">
            <div className="legal-page-header">
              <span className="legal-page-eyebrow">اتفاقية الخدمة</span>
              <h1 className="legal-page-title">شروط وأحكام الاستخدام</h1>
              <p className="legal-page-updated">آخر تحديث: يونيو 2026</p>
            </div>

            <div className="legal-page-content">
              <div className="legal-section">
                <h3 className="legal-section-title">
                  <HeartHandshake className="legal-section-icon" size={22} />
                  1. قبول الشروط والمقدمة
                </h3>
                <p>
                  مرحباً بكم في منصة Sub4Links. بمجرد تصفحك للموقع أو تسجيل حساب أو إتمام أي عملية شراء للخدمات أو الاشتراكات أو المنتجات الرقمية، فإنك تقر وتوافق وافقت على الالتزام بجميع البنود والشروط الواردة في هذه الاتفاقية دون استثناء. إذا كنت لا توافق على هذه الشروط، يرجى التوقف عن استخدام المنصة.
                </p>
              </div>

              <div className="legal-section">
                <h3 className="legal-section-title">
                  <FileText className="legal-section-icon" size={22} />
                  2. التعريفات الأساسية
                </h3>
                <ul className="legal-list">
                  <li className="legal-list-item">
                    <strong>المنصة / نحن:</strong> تشير إلى موقع Sub4Links والخدمات التابعة له.
                  </li>
                  <li className="legal-list-item">
                    <strong>العميل / أنت:</strong> أي شخص طبيعي أو اعتباري يقوم بزيارة الموقع، التسجيل فيه، أو شراء خدمة.
                  </li>
                  <li className="legal-list-item">
                    <strong>الخدمات والمنتجات:</strong> تشمل الاشتراكات الرقمية (AI, Streaming, Design)، خدمات التصميم والبرمجة، والدورات التدريبية المتاحة عبر الموقع.
                  </li>
                </ul>
              </div>

              <div className="legal-section">
                <h3 className="legal-section-title">
                  <BadgeCheck className="legal-section-icon" size={22} />
                  3. طبيعة الخدمات وبيانات الطلب
                </h3>
                <p>
                  نظراً لأن جميع الخدمات المقدمة هي اشتراكات ومنتجات رقمية إلكترونية، يلتزم العميل بتقديم بيانات دقيقة وصحيحة بالكامل عند تسجيل الطلب (مثل البريد الإلكتروني المفعل ورقم الهاتف المرتبط بحساب واتساب). المنصة غير مسؤولة عن فشل تفعيل الخدمة أو التأخر في تسليمها بسبب تقديم بيانات خاطئة من قبل العميل.
                </p>
              </div>

              <div className="legal-section">
                <h3 className="legal-section-title">
                  <ShieldAlert className="legal-section-icon" size={22} />
                  4. الأسعار وسياسة الدفع والتفعيل
                </h3>
                <p>
                  جميع الأسعار المعروضة على المنصة بالجنيه المصري (ج.م) أو الدولار الأمريكي حسب بلد التصفح. تخضع الأسعار للتحديث دون إشعار مسبق. لا يبدأ تنفيذ أو تفعيل أي خدمة أو اشتراك إلا بعد إتمام الدفع كاملاً وتأكيده عبر وسائل الدفع المعتمدة بالمنصة.
                </p>
                <div className="legal-alert">
                  <div className="legal-alert-title">
                    <ShieldAlert size={18} />
                    شروط مزودي الخدمة الأصليين
                  </div>
                  <p>
                    تخضع الاشتراكات الرقمية لشروط الاستخدام وسياسة الخصوصية الخاصة بالمنصات المالكة والشركات الأم (مثل Adobe, Netflix, OpenAI, Midjourney). يلتزم العميل باحترام هذه السياسات ولا تتحمل Sub4Links مسؤولية أي حظر أو إلغاء للحساب ينتج عن مخالفة سياسات الشركة المصدرة.
                  </p>
                </div>
              </div>

              <div className="legal-section">
                <h3 className="legal-section-title">
                  <HelpCircle className="legal-section-icon" size={22} />
                  5. حدود المسؤولية والتواصل
                </h3>
                <p>
                  نبذل قصارى جهدنا لضمان استمرارية وكفاءة جميع الاشتراكات والخدمات الرقمية. ومع ذلك، لا نتحمل المسؤولية القانونية أو المالية عن أي عطل خارج عن إرادتنا ناتج عن الشركة الأم المزودة للاشتراك، أو انقطاع خدمة الإنترنت لدى العميل، أو أي استخدام غير قانوني أو ضار يقوم به العميل للاشتراك.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  لأي استفسارات أو شكاوى بخصوص هذه الشروط، يرجى التواصل معنا عبر البريد الإلكتروني الرسمي <a href="mailto:support@sup4links.com" style={{ color: 'var(--s4l-accent-cyan)' }}>support@sup4links.com</a> أو مباشرة عبر رقم الواتساب الموضح بصفحة الاتصال.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
