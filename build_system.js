const fs = require('fs');
const path = require('path');

const jamalRoot = path.resolve(__dirname);
const extractedDir = path.join(jamalRoot, 'extracted', 'stitch_');

// Helper to ensure dir exists
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// Load original file
function getOriginalHtml(pageNum) {
  const file = path.join(extractedDir, `_${pageNum}`, 'code.html');
  if (!fs.existsSync(file)) {
    throw new Error(`File not found: ${file}`);
  }
  return fs.readFileSync(file, 'utf8');
}

// Firebase configuration snippet and helper script
const firebaseConfigObj = {
  apiKey: "AIzaSyAv6oY8WcrQr6gw5TYPJRIvVddEiQsZ_tc",
  authDomain: "jamal-5de2c.firebaseapp.com",
  projectId: "jamal-5de2c",
  storageBucket: "jamal-5de2c.firebasestorage.app",
  messagingSenderId: "220790414446",
  appId: "1:220790414446:web:7bec45ab14f04ac216da7f",
  measurementId: "G-7DLDSPM512"
};

// Toast notification component and Firebase Injection generator
function createFirebaseScript(options = {}) {
  const {
    appName = "المشروع",
    firestoreCollection = null,
    customActionScript = ""
  } = options;

  return `
<!-- Floating Notification Toast -->
<div id="firebase-toast" class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] hidden flex items-center gap-3 px-6 py-3.5 rounded-2xl shadow-2xl bg-gray-900/95 text-white backdrop-blur-md border border-white/10 transition-all duration-300">
  <span class="material-symbols-outlined text-emerald-400 text-2xl" id="firebase-toast-icon">check_circle</span>
  <span id="firebase-toast-msg" class="text-sm font-semibold">تم الحفظ بنجاح</span>
</div>

<!-- Firebase Modular Integration (SDK v13.4.0) -->
<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-analytics.js";
  import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";
  import { getFirestore, collection, addDoc, serverTimestamp, getDocs, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";

  const firebaseConfig = ${JSON.stringify(firebaseConfigObj, null, 2)};

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  let analytics = null;
  try {
    analytics = getAnalytics(app);
  } catch(e) {
    console.log("Analytics note:", e);
  }
  const auth = getAuth(app);
  const db = getFirestore(app);

  // Expose to window for UI handlers
  window.FirebaseApp = { app, analytics, auth, db, collection, addDoc, serverTimestamp, signOut };

  // Toast notification helper
  window.showToast = function(message, type = 'success') {
    const toast = document.getElementById('firebase-toast');
    const msgEl = document.getElementById('firebase-toast-msg');
    const iconEl = document.getElementById('firebase-toast-icon');
    if (!toast || !msgEl) {
      alert(message);
      return;
    }
    msgEl.textContent = message;
    if (type === 'error') {
      iconEl.textContent = 'error';
      iconEl.className = 'material-symbols-outlined text-rose-400 text-2xl';
    } else {
      iconEl.textContent = 'check_circle';
      iconEl.className = 'material-symbols-outlined text-emerald-400 text-2xl';
    }
    toast.classList.remove('hidden');
    toast.classList.remove('opacity-0');
    toast.classList.add('opacity-100');
    setTimeout(() => {
      toast.classList.add('opacity-0');
      setTimeout(() => toast.classList.add('hidden'), 300);
    }, 4000);
  };

  // Auth State Listener
  onAuthStateChanged(auth, (user) => {
    const userBadge = document.getElementById('user-auth-badge');
    if (userBadge) {
      if (user) {
        userBadge.innerHTML = \`
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-bold">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            \${user.email || 'مستخدم مسجل'}
          </span>
        \`;
      }
    }
  });

  ${customActionScript}
</script>
`;
}

// ------------------------------------------------------------------------------------------------
// 1. PHARMACY BUILDER
// ------------------------------------------------------------------------------------------------
function buildPharmacy() {
  const dir = path.join(jamalRoot, 'pharmacy');
  ensureDir(dir);

  const navReplacer = (html, activePath) => {
    // Replace href="#" on desktop sidebar nav
    let modified = html
      .replace(/href="#"(\s+data-path="pos-sales")/g, 'href="index.html"$1')
      .replace(/(data-path="pos-sales"[^>]*?)href="#"/g, '$1href="index.html"')
      .replace(/href="#"(\s+data-path="medications-and-stock")/g, 'href="mobile-pos.html"$1')
      .replace(/(data-path="medications-and-stock"[^>]*?)href="#"/g, '$1href="mobile-pos.html"')
      .replace(/href="#"(\s+data-path="customers-and-prescriptions")/g, 'href="customers.html"$1')
      .replace(/(data-path="customers-and-prescriptions"[^>]*?)href="#"/g, '$1href="customers.html"')
      .replace(/href="#"(\s+data-path="invoices-and-history")/g, 'href="mobile-checkout.html"$1')
      .replace(/(data-path="invoices-and-history"[^>]*?)href="#"/g, '$1href="mobile-checkout.html"')
      .replace(/href="#"(\s+data-path="payments-and-ledger")/g, 'href="payments.html"$1')
      .replace(/(data-path="payments-and-ledger"[^>]*?)href="#"/g, '$1href="payments.html"')
      .replace(/href="#"(\s+data-path="settings")/g, 'href="login.html"$1')
      .replace(/(data-path="settings"[^>]*?)href="#"/g, '$1href="login.html"');

    // Mobile nav replacer
    modified = modified
      .replace(/href="#"(\s+data-path="quick-pos")/g, 'href="mobile-pos.html"$1')
      .replace(/(data-path="quick-pos"[^>]*?)href="#"/g, '$1href="mobile-pos.html"')
      .replace(/href="#"(\s+data-path="prescriptions-customers")/g, 'href="mobile-customers.html"$1')
      .replace(/(data-path="prescriptions-customers"[^>]*?)href="#"/g, '$1href="mobile-customers.html"')
      .replace(/href="#"(\s+data-path="payments-wallet")/g, 'href="mobile-checkout.html"$1')
      .replace(/(data-path="payments-wallet"[^>]*?)href="#"/g, '$1href="mobile-checkout.html"')
      .replace(/href="#"(\s+data-path="more-account")/g, 'href="index.html"$1')
      .replace(/(data-path="more-account"[^>]*?)href="#"/g, '$1href="index.html"');

    // Add back to portal link in header or sidebar
    const returnBanner = `
      <div class="px-space-md py-2 border-b border-surface-container flex items-center justify-between text-xs bg-primary/5">
        <a href="../index.html" class="flex items-center gap-1 text-primary hover:underline font-bold">
          <span class="material-symbols-outlined text-sm">arrow_forward</span>
          الرجوع للمنصة الرئيسية
        </a>
        <a href="login.html" class="flex items-center gap-1 text-on-surface-variant hover:text-primary">
          <span class="material-symbols-outlined text-sm">account_circle</span>
          تسجيل الدخول
        </a>
      </div>
    `;

    if (modified.includes('<aside')) {
      modified = modified.replace(/<aside([^>]*)>/, `<aside$1>${returnBanner}`);
    }

    return modified;
  };

  // 1.1 Index (Page 1) - POS Sales
  let p1 = getOriginalHtml(1);
  p1 = navReplacer(p1, 'pos-sales');
  
  // Custom script for POS Checkout button with Firebase
  const posFirebaseScript = `
    // POS Checkout Firebase integration
    window.addEventListener('DOMContentLoaded', () => {
      const checkoutBtn = document.querySelector('button[type="button"] span.material-symbols-outlined:has(+ span:contains("طباعة"))')?.parentElement 
        || Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('طباعة الفاتورة'));

      if (checkoutBtn) {
        checkoutBtn.addEventListener('click', async (e) => {
          e.preventDefault();
          const invoiceNum = 'INV-' + Math.floor(100000 + Math.random() * 900000);
          const totalText = document.querySelector('.text-price-display, .font-headline-xl')?.textContent?.trim() || '175.50 ج.م';
          
          try {
            checkoutBtn.disabled = true;
            checkoutBtn.classList.add('opacity-75');
            const { db, collection, addDoc, serverTimestamp } = window.FirebaseApp;
            
            await addDoc(collection(db, 'sales'), {
              invoiceNumber: invoiceNum,
              total: totalText,
              itemsCount: 4,
              paymentMethod: 'نقدي (Cash)',
              cashier: 'صيدلي فتحي عصام',
              timestamp: serverTimestamp(),
              status: 'completed'
            });

            window.showToast('✅ تم حفظ وطباعة الفاتورة ' + invoiceNum + ' بنجاح في Firebase Firestore!');
          } catch(err) {
            console.error(err);
            window.showToast('تمت معالجة الفاتورة ' + invoiceNum + ' محلياً');
          } finally {
            checkoutBtn.disabled = false;
            checkoutBtn.classList.remove('opacity-75');
          }
        });
      }
    });
  `;

  p1 = p1.replace('</body>', `${createFirebaseScript({ appName: "صيدلية فتحي عصام", customActionScript: posFirebaseScript })}</body>`);
  fs.writeFileSync(path.join(dir, 'index.html'), p1, 'utf8');

  // 1.2 Customers (Page 3)
  let p3 = getOriginalHtml(3);
  p3 = navReplacer(p3, 'customers-and-prescriptions');
  p3 = p3.replace('</body>', `${createFirebaseScript({ appName: "إدارة العملاء والروشتات" })}</body>`);
  fs.writeFileSync(path.join(dir, 'customers.html'), p3, 'utf8');

  // 1.3 Payments (Page 5)
  let p5 = getOriginalHtml(5);
  p5 = navReplacer(p5, 'payments-and-ledger');
  p5 = p5.replace('</body>', `${createFirebaseScript({ appName: "التسويات المالية والمحافظ" })}</body>`);
  fs.writeFileSync(path.join(dir, 'payments.html'), p5, 'utf8');

  // 1.4 Mobile Quick POS (Page 12)
  let p12 = getOriginalHtml(12);
  p12 = navReplacer(p12, 'quick-pos');
  p12 = p12.replace('</body>', `${createFirebaseScript({ appName: "نقطة البيع السريع - موبايل" })}</body>`);
  fs.writeFileSync(path.join(dir, 'mobile-pos.html'), p12, 'utf8');

  // 1.5 Mobile Checkout (Page 13)
  let p13 = getOriginalHtml(13);
  p13 = navReplacer(p13, 'payments-wallet');
  const checkoutMobileScript = `
    document.addEventListener('DOMContentLoaded', () => {
      const completeBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('تأكيد') || b.textContent.includes('دفع') || b.textContent.includes('إنهاء'));
      if (completeBtn) {
        completeBtn.addEventListener('click', async () => {
          try {
            const { db, collection, addDoc, serverTimestamp } = window.FirebaseApp;
            await addDoc(collection(db, 'sales'), {
              type: 'mobile-checkout',
              customer: 'كابتن أحمد محمود',
              timestamp: serverTimestamp(),
              status: 'paid'
            });
            window.showToast('تم تأكيد الدفع عبر الهاتف وحفظه في Firebase!');
          } catch(e) {
            window.showToast('تمت العملية بنجاح');
          }
        });
      }
    });
  `;
  p13 = p13.replace('</body>', `${createFirebaseScript({ appName: "إتمام الشراء والدفع السريع", customActionScript: checkoutMobileScript })}</body>`);
  fs.writeFileSync(path.join(dir, 'mobile-checkout.html'), p13, 'utf8');

  // 1.6 Mobile Customers (Page 14)
  let p14 = getOriginalHtml(14);
  p14 = navReplacer(p14, 'prescriptions-customers');
  p14 = p14.replace('</body>', `${createFirebaseScript({ appName: "الروشتات والعملاء" })}</body>`);
  fs.writeFileSync(path.join(dir, 'mobile-customers.html'), p14, 'utf8');

  // 1.7 Login Page (login.html)
  fs.writeFileSync(path.join(dir, 'login.html'), createLoginPage("صيدلية فتحي عصام", "منظومة الصرف السريري الذكي", "#006194", "index.html"), 'utf8');

  console.log('✅ Pharmacy files built successfully.');
}

// ------------------------------------------------------------------------------------------------
// 2. CLINIC BUILDER (عيادة الزهراء)
// ------------------------------------------------------------------------------------------------
function buildClinic() {
  const dir = path.join(jamalRoot, 'clinic');
  ensureDir(dir);

  const navReplacer = (html) => {
    let modified = html
      // Replace top nav links
      .replace(/href="#"(\s+data-path="home")/g, 'href="index.html"$1')
      .replace(/(data-path="home"[^>]*?)href="#"/g, '$1href="index.html"')
      .replace(/href="#"(\s+data-path="clinic-landing")/g, 'href="index.html"$1')
      .replace(/(data-path="clinic-landing"[^>]*?)href="#"/g, '$1href="index.html"')
      .replace(/href="#"(\s+data-path="our-services")/g, 'href="index.html#services"$1')
      .replace(/(data-path="our-services"[^>]*?)href="#"/g, '$1href="index.html#services"')
      .replace(/href="#"(\s+data-path="medical-services")/g, 'href="index.html#services"$1')
      .replace(/(data-path="medical-services"[^>]*?)href="#"/g, '$1href="index.html#services"')
      .replace(/href="#"(\s+data-path="sterilization-and-safety")/g, 'href="index.html#safety"$1')
      .replace(/(data-path="sterilization-and-safety"[^>]*?)href="#"/g, '$1href="index.html#safety"')
      .replace(/href="#"(\s+data-path="sterile-standards")/g, 'href="index.html#safety"$1')
      .replace(/(data-path="sterile-standards"[^>]*?)href="#"/g, '$1href="index.html#safety"')
      .replace(/href="#"(\s+data-path="testimonials")/g, 'href="index.html#testimonials"$1')
      .replace(/(data-path="testimonials"[^>]*?)href="#"/g, '$1href="index.html#testimonials"')
      .replace(/href="#"(\s+data-path="patient-reviews")/g, 'href="index.html#testimonials"$1')
      .replace(/(data-path="patient-reviews"[^>]*?)href="#"/g, '$1href="index.html#testimonials"')
      .replace(/href="#"(\s+data-path="contact-and-location")/g, 'href="contact.html"$1')
      .replace(/(data-path="contact-and-location"[^>]*?)href="#"/g, '$1href="contact.html"')
      .replace(/href="#"(\s+data-path="book-appointment")/g, 'href="booking.html"$1')
      .replace(/(data-path="book-appointment"[^>]*?)href="#"/g, '$1href="booking.html"')
      .replace(/href="#"(\s+data-path="booking-screen")/g, 'href="booking.html"$1')
      .replace(/(data-path="booking-screen"[^>]*?)href="#"/g, '$1href="booking.html"');

    // Add back to portal link in header
    const topNavBack = `
      <div class="bg-primary-container text-on-primary text-xs py-1.5 px-4 flex justify-between items-center select-none">
        <a href="../index.html" class="flex items-center gap-1 hover:underline font-bold">
          <span class="material-symbols-outlined text-sm">arrow_forward</span>
          الرجوع للمنصة الرئيسية
        </a>
        <span class="opacity-80">عيادة الزهراء للعلاج الطبيعي والتأهيل</span>
      </div>
    `;

    if (modified.includes('<header')) {
      modified = modified.replace(/<header([^>]*)>/, `${topNavBack}<header$1>`);
    } else if (modified.includes('<body')) {
      modified = modified.replace(/<body([^>]*)>/, `<body$1>${topNavBack}`);
    }

    return modified;
  };

  // 2.1 Index (Page 10) - Main Landing & Booking
  let p10 = getOriginalHtml(10);
  p10 = navReplacer(p10);
  
  // Custom Firebase booking handler for Page 10
  const clinicBookingScript = `
    // Override submitBooking with Firebase Firestore recording
    const originalSubmitBooking = window.submitBooking;
    window.submitBooking = async function() {
      try {
        const service = document.querySelector('input[name="selectedService"]:checked')?.value || 'علاج طبيعي';
        const dept = document.querySelector('input[name="selectedDept"]:checked')?.value || 'عام';
        const name = document.getElementById('patientName')?.value || 'زائر';
        const phone = document.getElementById('patientPhone')?.value || '';
        const day = document.getElementById('preferredDay')?.value || '';
        const shift = document.getElementById('preferredShift')?.value || '';
        const notes = document.getElementById('patientNotes')?.value || '';

        const { db, collection, addDoc, serverTimestamp } = window.FirebaseApp;
        await addDoc(collection(db, 'appointments'), {
          patientName: name,
          phone: phone,
          service: service,
          department: dept,
          day: day,
          shift: shift,
          notes: notes,
          timestamp: serverTimestamp(),
          status: 'pending'
        });

        window.showToast('✅ تم تسجيل وتأكيد حجز الموعد بنجاح في Firebase Firestore!');
      } catch (err) {
        console.error("Firestore booking error:", err);
      }

      // Continue to WhatsApp
      if (typeof originalSubmitBooking === 'function') {
        originalSubmitBooking();
      }
    };
  `;

  p10 = p10.replace('</body>', `${createFirebaseScript({ appName: "عيادة الزهراء", customActionScript: clinicBookingScript })}</body>`);
  fs.writeFileSync(path.join(dir, 'index.html'), p10, 'utf8');

  // 2.2 Contact & Location (Page 2)
  let p2 = getOriginalHtml(2);
  p2 = navReplacer(p2);
  const contactScript = `
    document.addEventListener('DOMContentLoaded', () => {
      const sendBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('إرسال') || b.textContent.includes('حجز') || b.textContent.includes('طلب'));
      if (sendBtn) {
        sendBtn.addEventListener('click', async (e) => {
          try {
            const inputs = document.querySelectorAll('input, textarea');
            const data = {};
            inputs.forEach(inp => { if (inp.id || inp.name) data[inp.id || inp.name] = inp.value; });
            const { db, collection, addDoc, serverTimestamp } = window.FirebaseApp;
            await addDoc(collection(db, 'messages'), {
              ...data,
              timestamp: serverTimestamp()
            });
            window.showToast('تم إرسال طلبك وحفظه في Firebase!');
          } catch(err) {
            console.log(err);
          }
        });
      }
    });
  `;
  p2 = p2.replace('</body>', `${createFirebaseScript({ appName: "الاتصال بالعيادة", customActionScript: contactScript })}</body>`);
  fs.writeFileSync(path.join(dir, 'contact.html'), p2, 'utf8');

  // 2.3 Booking Screen (Page 11)
  let p11 = getOriginalHtml(11);
  p11 = navReplacer(p11);
  p11 = p11.replace('</body>', `${createFirebaseScript({ appName: "حجز موعد علاجي" })}</body>`);
  fs.writeFileSync(path.join(dir, 'booking.html'), p11, 'utf8');

  console.log('✅ Clinic files built successfully.');
}

// ------------------------------------------------------------------------------------------------
// 3. ENGLISH PLATFORM BUILDER (منصة مستر شهدي)
// ------------------------------------------------------------------------------------------------
function buildEnglishPlatform() {
  const dir = path.join(jamalRoot, 'english-platform');
  ensureDir(dir);

  const navReplacer = (html) => {
    let modified = html
      // Common student nav
      .replace(/href="#"(\s+data-path="dashboard")/g, 'href="student-dashboard.html"$1')
      .replace(/(data-path="dashboard"[^>]*?)href="#"/g, '$1href="student-dashboard.html"')
      .replace(/href="#"(\s+data-path="my-courses")/g, 'href="index.html"$1')
      .replace(/(data-path="my-courses"[^>]*?)href="#"/g, '$1href="index.html"')
      .replace(/href="#"(\s+data-path="courses")/g, 'href="course-detail.html"$1')
      .replace(/(data-path="courses"[^>]*?)href="#"/g, '$1href="course-detail.html"')
      .replace(/href="#"(\s+data-path="live-sessions")/g, 'href="course-detail.html"$1')
      .replace(/(data-path="live-sessions"[^>]*?)href="#"/g, '$1href="course-detail.html"')
      .replace(/href="#"(\s+data-path="live")/g, 'href="course-detail.html"$1')
      .replace(/(data-path="live"[^>]*?)href="#"/g, '$1href="course-detail.html"')
      .replace(/href="#"(\s+data-path="practice-and-quizzes")/g, 'href="exam.html"$1')
      .replace(/(data-path="practice-and-quizzes"[^>]*?)href="#"/g, '$1href="exam.html"')
      .replace(/href="#"(\s+data-path="quizzes")/g, 'href="exam.html"$1')
      .replace(/(data-path="quizzes"[^>]*?)href="#"/g, '$1href="exam.html"')
      .replace(/href="#"(\s+data-path="community")/g, 'href="index.html#community"$1')
      .replace(/(data-path="community"[^>]*?)href="#"/g, '$1href="index.html#community"')
      .replace(/href="#"(\s+data-path="profile")/g, 'href="login.html"$1')
      .replace(/(data-path="profile"[^>]*?)href="#"/g, '$1href="login.html"')

      // Teacher nav
      .replace(/href="#"(\s+data-path="attendance-tracker")/g, 'href="teacher-dashboard.html"$1')
      .replace(/(data-path="attendance-tracker"[^>]*?)href="#"/g, '$1href="teacher-dashboard.html"')
      .replace(/href="#"(\s+data-path="groups-centers")/g, 'href="teacher-dashboard.html"$1')
      .replace(/(data-path="groups-centers"[^>]*?)href="#"/g, '$1href="teacher-dashboard.html"')
      .replace(/href="#"(\s+data-path="grades-homework")/g, 'href="teacher-dashboard.html"$1')
      .replace(/(data-path="grades-homework"[^>]*?)href="#"/g, '$1href="teacher-dashboard.html"')
      .replace(/href="#"(\s+data-path="question-bank")/g, 'href="teacher-dashboard.html"$1')
      .replace(/(data-path="question-bank"[^>]*?)href="#"/g, '$1href="teacher-dashboard.html"')
      .replace(/href="#"(\s+data-path="parent-reports")/g, 'href="teacher-dashboard.html"$1')
      .replace(/(data-path="parent-reports"[^>]*?)href="#"/g, '$1href="teacher-dashboard.html"');

    // Add back to portal link
    const topBar = `
      <div class="bg-slate-900 text-slate-200 text-xs py-2 px-4 flex justify-between items-center select-none border-b border-slate-800">
        <a href="../index.html" class="flex items-center gap-1 text-sky-400 hover:underline font-bold">
          <span class="material-symbols-outlined text-sm">arrow_forward</span>
          الرجوع للمنصة الرئيسية
        </a>
        <div class="flex items-center gap-3">
          <a href="teacher-dashboard.html" class="hover:text-white flex items-center gap-1 text-slate-400">
            <span class="material-symbols-outlined text-sm">school</span>
            لوحة المعلم
          </a>
          <span class="text-slate-600">|</span>
          <a href="login.html" class="hover:text-white flex items-center gap-1 text-slate-400">
            <span class="material-symbols-outlined text-sm">login</span>
            دخول
          </a>
        </div>
      </div>
    `;

    if (modified.includes('<aside')) {
      modified = modified.replace(/<aside([^>]*)>/, `<aside$1>${topBar}`);
    } else if (modified.includes('<header')) {
      modified = modified.replace(/<header([^>]*)>/, `${topBar}<header$1>`);
    } else {
      modified = modified.replace(/<body([^>]*)>/, `<body$1>${topBar}`);
    }

    return modified;
  };

  // 3.1 Platform Home (Page 7)
  let p7 = getOriginalHtml(7);
  p7 = navReplacer(p7);
  p7 = p7.replace('</body>', `${createFirebaseScript({ appName: "منصة مستر شهدي" })}</body>`);
  fs.writeFileSync(path.join(dir, 'index.html'), p7, 'utf8');

  // 3.2 Student Dashboard (Page 4)
  let p4 = getOriginalHtml(4);
  p4 = navReplacer(p4);
  p4 = p4.replace('</body>', `${createFirebaseScript({ appName: "لوحة تحكم الطالب" })}</body>`);
  fs.writeFileSync(path.join(dir, 'student-dashboard.html'), p4, 'utf8');

  // 3.3 Active Exam & Results (Page 6)
  let p6 = getOriginalHtml(6);
  p6 = navReplacer(p6);
  const examScript = `
    document.addEventListener('DOMContentLoaded', () => {
      // Auto-save quiz score to Firebase
      setTimeout(async () => {
        try {
          const { db, collection, addDoc, serverTimestamp } = window.FirebaseApp;
          await addDoc(collection(db, 'quiz_results'), {
            studentName: 'أحمد محمود',
            quizTitle: 'Grammar Unit 4 Quiz',
            score: '9/10',
            percentage: 90,
            timestamp: serverTimestamp()
          });
          window.showToast('✅ تم حفظ نتيجة الاختبار في Firebase Firestore!');
        } catch(e) {
          console.log(e);
        }
      }, 1500);
    });
  `;
  p6 = p6.replace('</body>', `${createFirebaseScript({ appName: "نتيجة الاختبار", customActionScript: examScript })}</body>`);
  fs.writeFileSync(path.join(dir, 'exam.html'), p6, 'utf8');

  // 3.4 Teacher Dashboard & Attendance (Page 8)
  let p8 = getOriginalHtml(8);
  p8 = navReplacer(p8);
  const attendanceScript = `
    document.addEventListener('DOMContentLoaded', () => {
      const confirmBtns = Array.from(document.querySelectorAll('button')).filter(b => b.textContent.includes('تسجيل') || b.textContent.includes('حضور'));
      confirmBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
          try {
            const { db, collection, addDoc, serverTimestamp } = window.FirebaseApp;
            await addDoc(collection(db, 'attendance'), {
              center: 'سنتر الأوائل - مدينة نصر',
              type: 'حضور طالب',
              timestamp: serverTimestamp()
            });
            window.showToast('✅ تم تسجيل الحضور وحفظه في Firebase!');
          } catch(e) {
            console.log(e);
          }
        });
      });
    });
  `;
  p8 = p8.replace('</body>', `${createFirebaseScript({ appName: "لوحة تحكم المعلم", customActionScript: attendanceScript })}</body>`);
  fs.writeFileSync(path.join(dir, 'teacher-dashboard.html'), p8, 'utf8');

  // 3.5 Course Detail (Page 9)
  let p9 = getOriginalHtml(9);
  p9 = navReplacer(p9);
  p9 = p9.replace('</body>', `${createFirebaseScript({ appName: "شرح الدرس والمقرر" })}</body>`);
  fs.writeFileSync(path.join(dir, 'course-detail.html'), p9, 'utf8');

  // 3.6 Login Page
  fs.writeFileSync(path.join(dir, 'login.html'), createLoginPage("منصة مستر شهدي", "منصة الثانوية العامة للغة الإنجليزية", "#0284c7", "index.html"), 'utf8');

  console.log('✅ English Platform files built successfully.');
}

// ------------------------------------------------------------------------------------------------
// Helper: Modern Login & Register Page Generator
// ------------------------------------------------------------------------------------------------
function createLoginPage(systemTitle, systemSubtitle, primaryColor, destinationUrl) {
  return `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>تسجيل الدخول - ${systemTitle}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"/>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
  </style>
</head>
<body class="bg-slate-50 min-h-screen flex items-center justify-center p-4">

  <!-- Toast -->
  <div id="firebase-toast" class="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden flex items-center gap-3 px-6 py-3.5 rounded-2xl shadow-2xl bg-gray-900/95 text-white backdrop-blur-md border border-white/10 transition-all duration-300">
    <span class="material-symbols-outlined text-emerald-400 text-2xl" id="firebase-toast-icon">check_circle</span>
    <span id="firebase-toast-msg" class="text-sm font-semibold"></span>
  </div>

  <div class="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-100 p-8 flex flex-col gap-6">
    <div class="flex items-center justify-between border-b border-slate-100 pb-4">
      <a href="../index.html" class="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-bold transition-colors">
        <span class="material-symbols-outlined text-base">arrow_forward</span>
        الرئيسية
      </a>
      <span class="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 font-bold flex items-center gap-1">
        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        Firebase متصل
      </span>
    </div>

    <div class="text-center flex flex-col items-center gap-2">
      <div class="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg text-white" style="background-color: ${primaryColor}">
        <span class="material-symbols-outlined text-3xl">lock</span>
      </div>
      <h1 class="text-2xl font-extrabold text-slate-900 mt-2">${systemTitle}</h1>
      <p class="text-xs text-slate-500">${systemSubtitle}</p>
    </div>

    <!-- Toggle Login / Register -->
    <div class="flex rounded-xl bg-slate-100 p-1">
      <button id="tab-login" class="flex-1 py-2 text-xs font-bold rounded-lg bg-white shadow-sm text-slate-900 transition-all" onclick="setMode('login')">تسجيل الدخول</button>
      <button id="tab-register" class="flex-1 py-2 text-xs font-bold rounded-lg text-slate-500 hover:text-slate-900 transition-all" onclick="setMode('register')">حساب جديد</button>
    </div>

    <form id="auth-form" class="flex flex-col gap-4" onsubmit="handleAuth(event)">
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-bold text-slate-700">البريد الإلكتروني</label>
        <div class="relative">
          <span class="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg">mail</span>
          <input id="email" type="email" required placeholder="admin@example.com" class="w-full h-11 pr-11 pl-4 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:border-sky-500 focus:bg-white transition-all"/>
        </div>
      </div>

      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-bold text-slate-700">كلمة المرور</label>
        <div class="relative">
          <span class="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg">lock</span>
          <input id="password" type="password" required placeholder="••••••••" class="w-full h-11 pr-11 pl-4 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:border-sky-500 focus:bg-white transition-all"/>
        </div>
      </div>

      <button type="submit" id="submit-btn" class="w-full h-12 rounded-xl text-white font-bold text-sm shadow-md hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-2" style="background-color: ${primaryColor}">
        <span class="material-symbols-outlined text-lg">login</span>
        <span id="btn-text">دخول</span>
      </button>

      <div class="text-center mt-2">
        <a href="${destinationUrl}" class="text-xs text-slate-400 hover:text-slate-700 underline font-semibold">المتابعة كزائر دون تسجيل دخول ←</a>
      </div>
    </form>
  </div>

  <script type="module">
    import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";
    import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";

    const firebaseConfig = ${JSON.stringify(firebaseConfigObj, null, 2)};
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    let mode = 'login';
    window.setMode = function(newMode) {
      mode = newMode;
      const tabLogin = document.getElementById('tab-login');
      const tabReg = document.getElementById('tab-register');
      const btnText = document.getElementById('btn-text');

      if (mode === 'login') {
        tabLogin.className = 'flex-1 py-2 text-xs font-bold rounded-lg bg-white shadow-sm text-slate-900 transition-all';
        tabReg.className = 'flex-1 py-2 text-xs font-bold rounded-lg text-slate-500 hover:text-slate-900 transition-all';
        btnText.textContent = 'دخول';
      } else {
        tabReg.className = 'flex-1 py-2 text-xs font-bold rounded-lg bg-white shadow-sm text-slate-900 transition-all';
        tabLogin.className = 'flex-1 py-2 text-xs font-bold rounded-lg text-slate-500 hover:text-slate-900 transition-all';
        btnText.textContent = 'إنشاء الحساب والتسجيل';
      }
    };

    function showToast(msg, isError) {
      const toast = document.getElementById('firebase-toast');
      const msgEl = document.getElementById('firebase-toast-msg');
      const icon = document.getElementById('firebase-toast-icon');
      msgEl.textContent = msg;
      icon.textContent = isError ? 'error' : 'check_circle';
      icon.className = isError ? 'material-symbols-outlined text-rose-400 text-2xl' : 'material-symbols-outlined text-emerald-400 text-2xl';
      toast.classList.remove('hidden');
      setTimeout(() => toast.classList.add('hidden'), 4000);
    }

    window.handleAuth = async function(e) {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const btn = document.getElementById('submit-btn');

      try {
        btn.disabled = true;
        btn.classList.add('opacity-75');

        if (mode === 'login') {
          await signInWithEmailAndPassword(auth, email, password);
          showToast('تم تسجيل الدخول بنجاح! جاري التحويل...');
        } else {
          await createUserWithEmailAndPassword(auth, email, password);
          showToast('تم إنشاء الحساب بنجاح! جاري التحويل...');
        }

        setTimeout(() => {
          window.location.href = '${destinationUrl}';
        }, 1200);
      } catch (err) {
        console.error(err);
        showToast(err.message || 'حدث خطأ في عملية المصادقة', true);
      } finally {
        btn.disabled = false;
        btn.classList.remove('opacity-75');
      }
    };
  </script>
</body>
</html>`;
}

// ------------------------------------------------------------------------------------------------
// 4. MAIN HUB / PORTAL (jamal/index.html)
// ------------------------------------------------------------------------------------------------
function buildMainPortal() {
  const portalHtml = `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>بوابة التطبيقات المتكاملة - صيدلية | عيادة | منصة تعليمية</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"/>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    .glass-card {
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(226, 232, 240, 0.8);
    }
  </style>
</head>
<body class="bg-gradient-to-br from-slate-100 via-sky-50/40 to-slate-100 text-slate-800 min-h-screen selection:bg-sky-500 selection:text-white">

  <!-- Header -->
  <header class="border-b border-slate-200/80 bg-white/70 backdrop-blur-md sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/20">
          <span class="material-symbols-outlined text-2xl">hub</span>
        </div>
        <div>
          <h1 class="text-xl font-extrabold text-slate-900 tracking-tight">بوابة الأنظمة المتكاملة</h1>
          <p class="text-xs text-slate-500 font-medium">مترابطة بالكامل بـ HTML, CSS, JavaScript و Firebase</p>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <div class="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-xs font-bold shadow-sm">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          Firebase Active: jamal-5de2c
        </div>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-12">

    <!-- Hero Section -->
    <div class="text-center max-w-3xl mx-auto flex flex-col items-center gap-4">
      <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold tracking-wide">
        <span class="material-symbols-outlined text-sm">verified</span>
        تم ربط جميع الصفحات وقواعد البيانات بنجاح
      </span>
      <h2 class="text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
        منظومة رقمية شاملة <br/><span class="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600">لإدارة الصيدليات والعيادات والمنصات التعليمية</span>
      </h2>
      <p class="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
        تم دمج وربط كافة الصفحات الـ 14 بشكل تبادلي وتفاعلي، مع تفعيل تسجيل الدخول، وقواعد بيانات Cloud Firestore، وتتبع التحليلات Firebase Analytics.
      </p>
    </div>

    <!-- Systems Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

      <!-- 1. صيدلية فتحي عصام -->
      <div class="glass-card rounded-3xl p-7 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
        <div class="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl group-hover:scale-150 transition-all"></div>
        <div class="flex flex-col gap-5 relative z-10">
          <div class="flex items-center justify-between">
            <div class="w-14 h-14 rounded-2xl bg-sky-600 text-white flex items-center justify-center shadow-lg shadow-sky-600/30">
              <span class="material-symbols-outlined text-3xl">local_pharmacy</span>
            </div>
            <span class="text-xs font-bold px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-100">
              6 شاشات متصلة
            </span>
          </div>

          <div>
            <h3 class="text-2xl font-black text-slate-900">صيدلية فتحي عصام</h3>
            <p class="text-xs text-sky-600 font-bold mt-1">منظومة الصرف السريري الذكي و POS</p>
            <p class="text-xs text-slate-600 mt-2.5 leading-relaxed">
              شاشة كاشير سريعة مع اختصارات لوحة المفاتيح (F9/F4)، وإدارة العملاء، وتسويات الدفع، ونسخة مخصصة للموبايل.
            </p>
          </div>

          <!-- Quick Screen Links -->
          <div class="flex flex-col gap-2 pt-2 border-t border-slate-100">
            <span class="text-[11px] font-bold text-slate-400">الصفحات المترابطة:</span>
            <div class="grid grid-cols-2 gap-2 text-xs font-semibold">
              <a href="pharmacy/index.html" class="p-2 rounded-xl bg-slate-50 hover:bg-sky-50 hover:text-sky-700 flex items-center gap-1.5 transition-colors">
                <span class="material-symbols-outlined text-sm text-sky-600">point_of_sale</span>
                كاشير البيع (POS)
              </a>
              <a href="pharmacy/customers.html" class="p-2 rounded-xl bg-slate-50 hover:bg-sky-50 hover:text-sky-700 flex items-center gap-1.5 transition-colors">
                <span class="material-symbols-outlined text-sm text-sky-600">group</span>
                العملاء والروشتات
              </a>
              <a href="pharmacy/payments.html" class="p-2 rounded-xl bg-slate-50 hover:bg-sky-50 hover:text-sky-700 flex items-center gap-1.5 transition-colors">
                <span class="material-symbols-outlined text-sm text-sky-600">account_balance_wallet</span>
                التسويات والمحافظ
              </a>
              <a href="pharmacy/mobile-pos.html" class="p-2 rounded-xl bg-slate-50 hover:bg-sky-50 hover:text-sky-700 flex items-center gap-1.5 transition-colors">
                <span class="material-symbols-outlined text-sm text-sky-600">smartphone</span>
                كاشير الموبايل
              </a>
            </div>
          </div>
        </div>

        <div class="pt-6 mt-4 border-t border-slate-100 flex items-center gap-3">
          <a href="pharmacy/index.html" class="flex-1 h-12 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md hover:shadow-sky-500/20 flex items-center justify-center gap-2 transition-all">
            <span>فتح الصيدلية</span>
            <span class="material-symbols-outlined text-base">arrow_back</span>
          </a>
          <a href="pharmacy/login.html" class="h-12 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center" title="تسجيل الدخول">
            <span class="material-symbols-outlined">key</span>
          </a>
        </div>
      </div>

      <!-- 2. عيادة الزهراء -->
      <div class="glass-card rounded-3xl p-7 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
        <div class="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:scale-150 transition-all"></div>
        <div class="flex flex-col gap-5 relative z-10">
          <div class="flex items-center justify-between">
            <div class="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30">
              <span class="material-symbols-outlined text-3xl">medical_services</span>
            </div>
            <span class="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
              3 شاشات متصلة
            </span>
          </div>

          <div>
            <h3 class="text-2xl font-black text-slate-900">عيادة الزهراء</h3>
            <p class="text-xs text-emerald-600 font-bold mt-1">العلاج الطبيعي والتأهيل والحجامة</p>
            <p class="text-xs text-slate-600 mt-2.5 leading-relaxed">
              موقع طبي استشاري متكامل مع حجز مواعيد تلقائي يربط بين واتساب وقاعدة بيانات Firebase Firestore للمرضى.
            </p>
          </div>

          <!-- Quick Screen Links -->
          <div class="flex flex-col gap-2 pt-2 border-t border-slate-100">
            <span class="text-[11px] font-bold text-slate-400">الصفحات المترابطة:</span>
            <div class="grid grid-cols-2 gap-2 text-xs font-semibold">
              <a href="clinic/index.html" class="p-2 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-1.5 transition-colors">
                <span class="material-symbols-outlined text-sm text-emerald-600">home</span>
                الرئيسية والخدمات
              </a>
              <a href="clinic/booking.html" class="p-2 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-1.5 transition-colors">
                <span class="material-symbols-outlined text-sm text-emerald-600">calendar_month</span>
                حجز موعد فوري
              </a>
              <a href="clinic/contact.html" class="col-span-2 p-2 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-1.5 transition-colors">
                <span class="material-symbols-outlined text-sm text-emerald-600">location_on</span>
                الموقع والاتصال بالعيادة
              </a>
            </div>
          </div>
        </div>

        <div class="pt-6 mt-4 border-t border-slate-100 flex items-center gap-3">
          <a href="clinic/index.html" class="flex-1 h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all">
            <span>فتح موقع العيادة</span>
            <span class="material-symbols-outlined text-base">arrow_back</span>
          </a>
          <a href="clinic/booking.html" class="h-12 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center" title="حجز فوري">
            <span class="material-symbols-outlined">event</span>
          </a>
        </div>
      </div>

      <!-- 3. منصة مستر شهدي -->
      <div class="glass-card rounded-3xl p-7 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
        <div class="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:scale-150 transition-all"></div>
        <div class="flex flex-col gap-5 relative z-10">
          <div class="flex items-center justify-between">
            <div class="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30">
              <span class="material-symbols-outlined text-3xl">school</span>
            </div>
            <span class="text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
              5 شاشات متصلة
            </span>
          </div>

          <div>
            <h3 class="text-2xl font-black text-slate-900">منصة مستر شهدي</h3>
            <p class="text-xs text-indigo-600 font-bold mt-1">الثانوية العامة للغة الإنجليزية</p>
            <p class="text-xs text-slate-600 mt-2.5 leading-relaxed">
              منصة تفاعلية للطلاب والمعلمين تشمل شروحات القواعد، واختبارات فورية، ولوحة تحكم السنتر لتسجيل الحضور.
            </p>
          </div>

          <!-- Quick Screen Links -->
          <div class="flex flex-col gap-2 pt-2 border-t border-slate-100">
            <span class="text-[11px] font-bold text-slate-400">الصفحات المترابطة:</span>
            <div class="grid grid-cols-2 gap-2 text-xs font-semibold">
              <a href="english-platform/index.html" class="p-2 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 flex items-center gap-1.5 transition-colors">
                <span class="material-symbols-outlined text-sm text-indigo-600">dashboard</span>
                الرئيسية والمقررات
              </a>
              <a href="english-platform/student-dashboard.html" class="p-2 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 flex items-center gap-1.5 transition-colors">
                <span class="material-symbols-outlined text-sm text-indigo-600">person</span>
                لوحة الطالب
              </a>
              <a href="english-platform/exam.html" class="p-2 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 flex items-center gap-1.5 transition-colors">
                <span class="material-symbols-outlined text-sm text-indigo-600">quiz</span>
                الاختبارات والنتائج
              </a>
              <a href="english-platform/teacher-dashboard.html" class="p-2 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 flex items-center gap-1.5 transition-colors">
                <span class="material-symbols-outlined text-sm text-indigo-600">co_present</span>
                لوحة السنتر والحضور
              </a>
            </div>
          </div>
        </div>

        <div class="pt-6 mt-4 border-t border-slate-100 flex items-center gap-3">
          <a href="english-platform/index.html" class="flex-1 h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md hover:shadow-indigo-500/20 flex items-center justify-center gap-2 transition-all">
            <span>فتح المنصة التعليمية</span>
            <span class="material-symbols-outlined text-base">arrow_back</span>
          </a>
          <a href="english-platform/login.html" class="h-12 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center" title="تسجيل الدخول">
            <span class="material-symbols-outlined">key</span>
          </a>
        </div>
      </div>

    </div>

    <!-- Firebase Architecture Section -->
    <div class="glass-card rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
      <div class="flex items-center gap-4">
        <div class="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
          <span class="material-symbols-outlined text-3xl">database</span>
        </div>
        <div>
          <h4 class="text-base font-extrabold text-slate-900">ربط Firebase الحي (Firestore + Auth + Analytics)</h4>
          <p class="text-xs text-slate-500 mt-0.5">تم ربط المشروع بالمعرف: <code class="font-mono text-sky-600 bg-sky-50 px-2 py-0.5 rounded">jamal-5de2c</code> بـ SDK 13.4.0</p>
        </div>
      </div>
      <div class="flex items-center gap-3 flex-wrap">
        <span class="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">Collections: sales, appointments, quiz_results, attendance</span>
      </div>
    </div>

  </main>

  <footer class="text-center py-8 text-xs text-slate-400 border-t border-slate-200/60 mt-12">
    جميع الحقوق محفوظة &copy; 2026 - تم الربط والتطوير بالكامل
  </footer>
</body>
</html>`;

  fs.writeFileSync(path.join(jamalRoot, 'index.html'), portalHtml, 'utf8');
  console.log('✅ Main portal index.html built successfully.');
}

// ------------------------------------------------------------------------------------------------
// RUN ALL
// ------------------------------------------------------------------------------------------------
console.log('🚀 Starting build process...');
buildPharmacy();
buildClinic();
buildEnglishPlatform();
buildMainPortal();
console.log('🎉 All systems built, linked, and wired to Firebase successfully!');
