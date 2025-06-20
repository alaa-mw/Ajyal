// # تخزين وفك تشفير التوكن (Token) في localStorage

// لحماية التوكن عند تخزينه في localStorage، يجب اتباع خطوات التشفير وفك التشفير بشكل صحيح. إليك الحل الكامل:

// ## 1. تثبيت مكتبة التشفير (مثل crypto-js)

// ```bash
// npm install crypto-js
// # أو
// yarn add crypto-js
// ```

// ## 2. إنشاء خدمة التشفير

// ```javascript
// // utils/encryption.js
// import CryptoJS from 'crypto-js';

// const SECRET_KEY = process.env.REACT_APP_ENCRYPTION_KEY || 'default-secret-key';

// export const encryptData = (data) => {
//   return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
// };

// export const decryptData = (ciphertext) => {
//   const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
//   return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
// };
// ```

// ## 3. تعديل authSlice لتشفير التوكن

// ```javascript
// // features/auth/authSlice.js
// import { encryptData, decryptData } from '../../utils/encryption';

// export const authSlice = createSlice({
//   // ...
//   reducers: {
//     loginSuccess(state, action) {
//       const encryptedToken = encryptData(action.payload.token);
      
//       localStorage.setItem('authToken', encryptedToken);
//       localStorage.setItem('userRole', action.payload.role);
      
//       state.userToken = action.payload.token; // احتفظ بنسخة غير مشفرة في الذاكرة
//       state.userRole = action.payload.role;
//       // ...
//     },
//     logout(state) {
//       localStorage.removeItem('authToken');
//       localStorage.removeItem('userRole');
//       // ...
//     }
//   },
//   extraReducers: (builder) => {
//     builder.addCase('REHYDRATE', (state, action) => {
//       // فك التشفير عند استعادة الحالة
//       const encryptedToken = localStorage.getItem('authToken');
//       if (encryptedToken) {
//         try {
//           state.userToken = decryptData(encryptedToken);
//         } catch (error) {
//           console.error('Failed to decrypt token', error);
//         }
//       }
//     });
//   }
// });
// ```

// ## 4. طريقة فك التشفير عند الاستخدام

// ```javascript
// // في أي مكون تحتاج التوكن
// import { decryptData } from '../utils/encryption';

// const useAuthToken = () => {
//   const getDecryptedToken = () => {
//     const encryptedToken = localStorage.getItem('authToken');
//     if (!encryptedToken) return null;
    
//     try {
//       return decryptData(encryptedToken);
//     } catch (error) {
//       console.error('Token decryption failed', error);
//       return null;
//     }
//   };

//   return { getDecryptedToken };
// };

// // مثال للاستخدام في طلب API
// const fetchData = async () => {
//   const { getDecryptedToken } = useAuthToken();
//   const token = getDecryptedToken();
  
//   const response = await fetch('/api/data', {
//     headers: {
//       'Authorization': `Bearer ${token}`
//     }
//   });
//   // ...
// };
// ```

// ## نصائح أمنية مهمة:

// 1. **إدارة المفتاح السري**:
//    - لا تخزن المفتاح السري في الكود المصدري
//    - استخدم متغيرات البيئة (`.env`)
//    ```env
//    REACT_APP_ENCRYPTION_KEY=your-very-secret-key-here
//    ```

// 2. **تحديث المفاتيح**:
//    ```javascript
//    // يمكنك إضافة نسخة للتشفير لتسهيل تحديث المفاتيح
//    const encryptData = (data) => {
//      return {
//        version: 'v1',
//        data: CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString()
//      };
//    };
//    ```

// 3. **حماية إضافية**:
//    ```javascript
//    // أضف checksum للتحقق من سلامة البيانات
//    const addChecksum = (data) => {
//      const checksum = CryptoJS.SHA256(data).toString();
//      return { data, checksum };
//    };
//    ```

// ## بدائل أكثر أماناً:

// 1. **استخدام HttpOnly Cookies**:
//    - أكثر أماناً من localStorage
//    - لا يمكن الوصول إليها عبر JavaScript

// 2. **استخدام Web Crypto API**:
//    ```javascript
//    // المتصفحات الحديثة تدعم هذه API بدون الحاجة لمكتبات خارجية
//    const encrypt = async (data, key) => {
//      const encoded = new TextEncoder().encode(data);
//      const encrypted = await window.crypto.subtle.encrypt(
//        { name: 'AES-GCM' },
//        key,
//        encoded
//      );
//      return encrypted;
//    };
//    ```

// 3. **حلول جاهزة**:
//    - مكتبة `secure-ls`: https://github.com/softvar/secure-ls
//    - مكتبة `localStorageCrypto`: https://www.npmjs.com/package/localstorage-crypt

// ## مثال كامل مع معالجة الأخطاء:

// ```javascript
// // utils/auth.js
// export const getSecureToken = () => {
//   try {
//     const encrypted = localStorage.getItem('authToken');
//     if (!encrypted) return null;
    
//     const decrypted = decryptData(encrypted);
    
//     // تحقق من صلاحية التوكن
//     if (isTokenValid(decrypted)) {
//       return decrypted;
//     }
    
//     // إذا كان التوكن منتهي الصلاحية
//     localStorage.removeItem('authToken');
//     return null;
//   } catch (error) {
//     console.error('Failed to decrypt token', error);
//     return null;
//   }
// };
// ```

// الخلاصة: بينما يظل تخزين التوكن في localStorage غير آمن تماماً، فإن تشفيره يضيف طبقة حماية إضافية. للحصول على أقصى درجات الأمان، يُفضل استخدام HttpOnly Cookies مع الحماية من CSRF.