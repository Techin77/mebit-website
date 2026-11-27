import type { Bilingual } from '../i18n';
import { withText } from './withText';

type Pillar = { key: 'wallet' | 'multisig' | 'collateral'; eyebrow: string; title: string; desc: string; cta: string };

const homeText: Bilingual<{
  heroEyebrow: string;
  /** The hero headline types these out one after another. */
  heroLines: string[];
  heroLead: string;
  heroCta: string;
  aboutEyebrow: string;
  about: string;
  pillarsEyebrow: string;
  pillarsTitle: string;
  pillars: Pillar[];
}> = {
  th: {
    heroEyebrow: 'Bitcoin Wallet · Bitcoin for Cash · Set-up Service',
    heroLines: ['กระเป๋าบิตคอยน์ ที่คุณถือกุญแจเอง', 'รับเงินบาท โดยไม่ต้องขายบิตคอยน์', 'ตั้งค่ากระเป๋า ด้วยมือคุณเอง'],
    heroLead: 'ขั้นตอนชัดเจน ข้อมูลโปร่งใส และคุณเป็นผู้ควบคุมทุกการตัดสินใจ',
    heroCta: 'บริการของเรา',
    aboutEyebrow: 'รู้จัก MEBIT',
    about:
      'MEBIT คือบริษัทด้านบริการและเทคโนโลยีบิตคอยน์ เราตั้งใจทำให้การเข้าถึงและการเป็นเจ้าของบิตคอยน์ด้วยตัวเอง ง่ายขึ้น ชัดเจนขึ้น และใช้ประโยชน์ได้จริง โดยยึดความชัดเจน การควบคุมด้วยตัวคุณเอง และแนวทางด้านความปลอดภัยในทุกบริการ',
    pillarsEyebrow: 'บริการของเรา',
    pillarsTitle: 'สามบริการ บนหลักการเดียวกัน',
    pillars: [
      {
        key: 'wallet',
        eyebrow: '01 · กระเป๋าบิตคอยน์',
        title: 'MEBIT Wallet',
        desc: 'แอปกระเป๋าบิตคอยน์ที่คุณถือกุญแจเอง สร้างได้ทั้งกระเป๋าลายเซ็นเดียว และกระเป๋าหลายลายเซ็น',
        cta: 'ดูแอป MEBIT',
      },
      {
        key: 'collateral',
        eyebrow: '02 · สินเชื่อเงินบาท',
        title: 'Bitcoin Collateral',
        desc: 'นำบิตคอยน์มาค้ำ รับเงินบาทไปใช้ ชำระครบเมื่อไร รับบิตคอยน์คืน',
        cta: 'ลองคำนวณวงเงิน',
      },
      {
        key: 'multisig',
        eyebrow: '03 · บริการแนะนำการตั้งค่า',
        title: 'Multisig Set\u2011up Service',
        desc: 'นัดหมายตั้งค่ากระเป๋าหลายลายเซ็นให้พร้อมใช้ โดยคุณลงมือเองทุกขั้นตอน บนอุปกรณ์ของคุณ',
        cta: 'ดูขั้นตอนรับบริการ',
      },
    ],
  },
  en: {
    heroEyebrow: 'Bitcoin Wallet · Bitcoin for Cash · Set-up Service',
    heroLines: ['A Bitcoin wallet, your keys', 'Cash without selling your bitcoin', 'Set up your wallet, guided'],
    heroLead: 'Clear steps. Transparent information. More control over the journey.',
    heroCta: 'Our services',
    aboutEyebrow: 'About MEBIT',
    about:
      'MEBIT is a Bitcoin service and technology company. Our mission is to make Bitcoin access and self-directed ownership simpler, clearer and more useful, with clarity, personal control and sound safety practices built into every service.',
    pillarsEyebrow: 'Our services',
    pillarsTitle: 'Three services. One set of principles.',
    pillars: [
      {
        key: 'wallet',
        eyebrow: '01 · Bitcoin wallet',
        title: 'MEBIT Wallet',
        desc: 'A self-custody Bitcoin wallet app. Create a single-key or a multi-key wallet, and keep the keys yourself.',
        cta: 'See the app',
      },
      {
        key: 'collateral',
        eyebrow: '02 · Thai baht loan',
        title: 'Bitcoin Collateral',
        desc: 'Pledge Bitcoin as collateral and receive Thai baht. Repay in full and get your Bitcoin back.',
        cta: 'Estimate a loan',
      },
      {
        key: 'multisig',
        eyebrow: '03 · Guided set-up',
        title: 'Multisig Set\u2011up Service',
        desc: 'Book a guided session for a ready-to-use multisig wallet. You do every step yourself, on your own devices.',
        cta: 'See how it works',
      },
    ],
  },
};

/** Text can be edited in Obsidian: site-v2/website-text (see withText.ts). */
export const home = withText('home', homeText);
