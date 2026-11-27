import type { Bilingual } from '../i18n';
import { withText } from './withText';

/** External destinations. Items marked TBD are placeholders awaiting confirmation. */
export const links = {
  email: 'meet@mebit.co.th',
  mailto: 'mailto:meet@mebit.co.th',
  multisigForm: 'http://mebit.co.th/btc2026',
  loanRegister: 'https://loan.mebit.co.th/',
  github: 'https://github.com/Krittanai2933/mebit', // TBD: confirm the public repo to link
  appStore: 'https://testflight.apple.com/join/8P229SjG' as string | null, // iOS beta (TestFlight) until App Store release
  googlePlay: null as string | null, // TBD — app not yet released
};

export const routes = {
  home: '/',
  wallet: '/wallet',
  multisig: '/multisig-setup',
  collateral: '/bitcoin-collateral',
} as const;

const commonText: Bilingual<{
  nav: { wallet: string; multisig: string; collateral: string; contact: string; home: string; menu: string };
  langSwitch: string;
  footer: {
    tagline: string;
    company: string;
    services: string;
    contact: string;
    hours: string;
    legal: string;
    rights: string;
  };
  learnMore: string;
  sample: string;
}> = {
  th: {
    nav: {
      home: 'หน้าแรก',
      wallet: 'MEBIT Wallet',
      multisig: 'บริการตั้งค่า Multisig',
      collateral: 'Bitcoin Collateral',
      contact: 'ติดต่อเรา',
      menu: 'เมนู',
    },
    langSwitch: 'เปลี่ยนภาษา',
    footer: {
      tagline: 'ความชัดเจนสร้างความไว้วางใจ การควบคุมสร้างความมั่นใจ',
      company: 'บริษัท มีบิต จำกัด',
      services: 'บริการ',
      contact: 'ติดต่อ',
      hours: 'เวลาทำการ จันทร์–ศุกร์ 09:00–18:00 น.',
      legal:
        'บิตคอยน์เป็นสินทรัพย์ที่มีความผันผวนสูง และไม่ใช่เงินฝากธนาคาร โปรดศึกษาข้อมูลและความเสี่ยงก่อนตัดสินใจ บริการบางส่วนอยู่ระหว่างการเตรียมเปิดให้บริการ เงื่อนไขเป็นไปตามที่บริษัทกำหนดและอาจเปลี่ยนแปลงได้',
      rights: '© 2026 บริษัท มีบิต จำกัด',
    },
    learnMore: 'ดูรายละเอียด',
    sample: 'ตัวอย่างหน้าจอ',
  },
  en: {
    nav: {
      home: 'Home',
      wallet: 'MEBIT Wallet',
      multisig: 'Multisig Set-up',
      collateral: 'Bitcoin Collateral',
      contact: 'Contact us',
      menu: 'Menu',
    },
    langSwitch: 'Change language',
    footer: {
      tagline: 'Clarity builds trust. Control builds confidence.',
      company: 'MEBIT Co., Ltd.',
      services: 'Services',
      contact: 'Contact',
      hours: 'Business hours: Mon–Fri, 9:00 AM–6:00 PM (Bangkok)',
      legal:
        'Bitcoin is a highly volatile asset and is not a bank deposit. Please review the information and risks before you decide. Some services are still being prepared for launch. Terms are set by the company and may change.',
      rights: '© 2026 MEBIT Co., Ltd.',
    },
    learnMore: 'Learn more',
    sample: 'Sample screen',
  },
};

/** Text can be edited in Obsidian: site-v2/website-text (see withText.ts). */
export const common = withText('common', commonText);
