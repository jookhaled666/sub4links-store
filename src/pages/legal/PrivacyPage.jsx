import { Shield, Eye, Database, Lock, AlertTriangle } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import './LegalPages.css';

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="section" style={{ paddingTop: '7.5rem' }}>
        <div className="container">
          <div className="legal-page-container">
            <div className="legal-page-header">
              <span className="legal-page-eyebrow">خصوصيتك أولوية</span>
              <h1 className="legal-page-title">سياسة الخصوصية وسرية المعلومات</h1>
              <p className="legal-page-updated">آخر تحديث: يونيو 2026</p>
            </div>

            <div className="legal-page-content">
              <div className="legal-section">
                <h3 className="legal-section-title">
                  <Shield className="legal-section-icon" size={22} />
                  1. جمع البيانات والمعلومات
                </h3>
                <p>
                  نحن نجمع البيانات الشخصية الضرورية فقط لمعالجة طلباتك وتفعيل الاشتراكات والخدمات الرقمية. تشمل هذه المعلومات الاسم الكامل، رقم الهاتف (المرتبط بالواتساب للتواصل الفوري)، البريد الإلكتروني، وعنوان الفواتير. نقوم بجمع هذه البيانات مباشرة منك عند ملء الحقول في موقعنا.
                </p>
              </div>

              <div className="legal-section">
                <h3 className="legal-section-title">
                  <Eye className="legal-section-icon" size={22} />
                  2. استخدام وإدارة البيانات
                </h3>
                <p>
                  يتم استخدام بياناتك لأغراض واضحة ومحددة تشمل:
                </p>
                <ul className="legal-list">
                  <li className="legal-list-item">
                    تفعيل الحسابات وتوصيل تراخيص البرامج والاشتراكات الرقمية للعميل.
                  </li>
                  <li className="legal-list-item">
                    تقديم الدعم الفني وحل المشكلات والتنبيه بانتهاء أو تجديد الاشتراكات.
                  </li>
                  <li className="legal-list-item">
                    إرسال تحديثات الطلبات أو إشعارات إدارية بخصوص حسابك الشخصي.
                  </li>
                </ul>
              </div>

              <div className="legal-section">
                <h3 className="legal-section-title">
                  <Database className="legal-section-icon" size={22} />
                  3. حماية البيانات ومشاركتها
                </h3>
                <p>
                  نحن نلتزم التزاماً كاملاً بعدم بيع أو تأجير أو مشاركة بياناتك الشخصية مع أي طرف ثالث لأغراض تسويقية. يتم مشاركة معلومات محدودة جداً وبأقصى درجات السرية فقط مع مزودي الخدمة أو بوابات الدفع الإلكتروني المعتمدة (مثل Paymob) لإتمام معالجة الدفع والتفعيل الفني.
                </p>
                <div className="legal-alert">
                  <div className="legal-alert-title">
                    <Lock size={18} />
                    حماية كلمات المرور وكلمات التفعيل
                  </div>
                  <p>
                    يتم تشفير كلمات المرور الخاصة بك والمحفوظة لدينا بشكل كامل. يرجى الحفاظ على سرية معلومات حسابك وعدم مشاركتها مع أي شخص لضمان حماية مشترياتك واشتراكاتك الرقمية.
                  </p>
                </div>
              </div>

              <div className="legal-section">
                <h3 className="legal-section-title">
                  <AlertTriangle className="legal-section-icon" size={22} />
                  4. ملفات تعريف الارتباط (Cookies)
                </h3>
                <p>
                  يستخدم موقعنا ملفات تعريف الارتباط لتحسين تجربة التصفح وحفظ تفاصيل سلة التسوق وقائمة المفضلة الخاصة بك وتسريع عمليات تسجيل الدخول. يمكنك التحكم في إعدادات ملفات تعريف الارتباط أو تعطيلها من خلال إعدادات متصفحك الخاص.
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
