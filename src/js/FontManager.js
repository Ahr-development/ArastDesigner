import WebFont from 'webfontloader';

export class FontManager {
  constructor() {
    this.fontMap = {}; // نقشه ای برای ذخیره فونت ها با نام آنها به عنوان کلید
  }

  /**
   * بارگذاری فونت با نام و URL مشخص شده و اعمال آن به آبجکت Fabric
   * @param {string} fontName نام فونت
   * @param {string} fontURL URL فونت
   * @param {fabric.Object} object آبجکت Fabric که می خواهید فونت را به آن اعمال کنید
   * @returns {Promise} Promise ای که پس از بارگذاری کامل فونت و اعمال آن به آبجکت حل می شود
   */
  loadFontAndApplyToObject(fontName, fontURL, object) {
    if (this.fontMap[fontName]) {
      return Promise.resolve(this.fontMap[fontName]); // اگر فونت قبلا بارگذاری شده باشد، آن را برگردانید
    }

    return new Promise(async (resolve, reject) => {
      await WebFont.load({
        custom: {
          families: [fontName]
        },
        loading: () => {
          // فونت بارگذاری شده است
          const font = new FontFace(fontName, `url(${fontURL})`);
          font.load().then(() => {
            this.fontMap[fontName] = font; // فونت را در نقشه ذخیره کنید
            document.fonts.add(font); // فونت را به سند اضافه کنید

            // فونت را به آبجکت Fabric اعمال کنید
        
            resolve(font);
          }).catch((error) => {
            reject(error);
          });
        },
        fontactive: () => {
          // فونت فعال شده است
        },
        fontinactive: () => {
          // فونت فعال نشد
          console.error('Font inactive:', fontName);
          reject(new Error(`Font "${fontName}" could not be loaded.`));
        }
      });
    });
  }
}
