import type { Bilingual } from '../i18n';
import { withText } from './withText';

/**
 * Screen text is taken from the MEBIT app source (Krittanai2933/mebit,
 * vault-workspace/mobile-signer-ffi/app/shared/src/feature/*). Figures are samples.
 */
type Feature = { eyebrow: string; title: string; text: string; points: string[] };
type Step = { title: string; text: string };

const walletText: Bilingual<{
  eyebrow: string;
  title: string;
  lead: string;
  status: string;
  comingSoon: string;
  appStore: string;
  iosBeta: string;
  testFlight: string;
  googlePlay: string;
  mock: {
    heading: string;
    total: string;
    totalValue: string;
    sub: string;
    spending: { tag: string; name: string; meta: string; amount: string };
    family: { tag: string; name: string; meta: string; amount: string };
    nav: [string, string, string];
  };
  featuresEyebrow: string;
  featuresTitle: string;
  features: [Feature, Feature, Feature];
  screens: {
    policy: {
      eyebrow: string;
      title: string;
      single: { name: string; text: string };
      multi: { name: string; text: string };
      presets: [string, string];
      summary: string;
      tolerance: string;
      next: string;
    };
    pair: {
      eyebrow: string;
      title: string;
      status: string;
      nearby: string;
      connect: string;
      checklist: [string, string, string];
    };
    portable: {
      eyebrow: string;
      backupTitle: string;
      backupText: string;
      save: string;
      share: string;
      importTitle: string;
      importText: string;
      sources: [string, string, string];
    };
    send: {
      eyebrow: string;
      title: string;
      from: string;
      fromValue: string;
      to: string;
      amount: string;
      fee: string;
      feeLevels: [string, string, string];
      next: string;
    };
    review: {
      eyebrow: string;
      title: string;
      dest: string;
      change: string;
      fee: string;
      rule: string;
      cta: string;
    };
    sign: {
      eyebrow: string;
      title: string;
      progress: string;
      hint: string;
      keys: { name: string; state: string; done: boolean | null }[];
      ready: string;
      cta: string;
    };
    slip: {
      eyebrow: string;
      title: string;
      status: string;
      to: string;
      fee: string;
      cta: string;
    };
  };
  flowEyebrow: string;
  flowTitle: string;
  flowLead: string;
  flow: [Step, Step, Step, Step];
  ossEyebrow: string;
  ossTitle: string;
  ossText: string;
  ossCta: string;
  noticeTitle: string;
  notice: string[];
  helpTitle: string;
  helpText: string;
  helpCta: string;
}> = {
  th: {
    eyebrow: 'MEBIT WALLET',
    title: 'กระเป๋าหลายลายเซ็น ใช้ง่ายกว่าที่คิด',
    lead: 'แอปกระเป๋าบิตคอยน์ที่กุญแจอยู่กับคุณ ทั้งบนโทรศัพท์และบน hardware wallet ไม่ต้องฝากใครถือแทน',
    status: 'อยู่ระหว่างทดสอบ · ยังไม่รองรับเงินจริง',
    comingSoon: 'เร็ว ๆ นี้',
    appStore: 'App Store',
    iosBeta: 'ทดลองใช้บน iOS',
    testFlight: 'TestFlight',
    googlePlay: 'Google Play',
    mock: {
      heading: 'Wallet ของคุณ',
      total: 'รวมทั้งหมด',
      totalValue: '0.8732 BTC',
      sub: 'ยอดตามข้อมูลบนเชน',
      spending: { tag: 'SINGLE-SIG', name: 'กระเป๋าใช้จ่าย', meta: 'กุญแจ 1 ดอก · บนโทรศัพท์', amount: '0.0312' },
      family: { tag: 'MULTISIG 2-OF-3', name: 'Wallet ครอบครัว', meta: 'ต้องเซ็น 2 จาก 3 กุญแจ', amount: '0.8420' },
      nav: ['กระเป๋า', 'รับ / ส่ง', 'กุญแจ'],
    },
    featuresEyebrow: 'ความสามารถหลัก',
    featuresTitle: 'สามเรื่องที่ทำให้ MEBIT Wallet ต่างออกไป',
    features: [
      {
        eyebrow: '01 · MULTISIG',
        title: 'หลายลายเซ็น ใช้ง่าย',
        text: 'เลือกได้ว่าจะให้กุญแจกี่ดอกร่วมกันเซ็น เช่น 2 ใน 3 แอปพาตั้งค่าทีละขั้น ตั้งแต่เลือกนโยบาย เลือกกุญแจ จนตรวจที่อยู่แรกของกระเป๋า',
        points: [
          'ตั้งค่า 2 ใน 3 หรือ 3 ใน 5 ได้ในไม่กี่แตะ',
          'กุญแจหายหนึ่งดอก ยังเข้าถึงเงินได้ด้วยกุญแจที่เหลือ',
          'มีกระเป๋าเดี่ยวไว้สำหรับเงินที่ใช้จ่ายประจำ',
        ],
      },
      {
        eyebrow: '02 · HARDWARE WALLET',
        title: 'ใช้ร่วมกับ hardware wallet',
        text: 'เชื่อมต่อ Blockstream Jade และ Trezor Safe 7 ผ่าน Bluetooth แล้วใช้เป็นกุญแจหนึ่งดอกในกระเป๋าหลายลายเซ็น กุญแจส่วนตัวอยู่บนอุปกรณ์ตลอด',
        points: [
          'จับคู่ผ่าน Bluetooth และยืนยันรหัสบนหน้าจออุปกรณ์',
          'เซ็นรายการบน Jade หรือ Trezor ได้โดยตรง',
          'ใช้ร่วมกับกุญแจบนโทรศัพท์ในกระเป๋าเดียวกันได้',
        ],
      },
      {
        eyebrow: '03 · NO LOCK-IN',
        title: 'ไม่ผูกมัด ใช้กับแอปอื่นได้',
        text: 'ส่งออกกระเป๋าเป็นไฟล์ BSMS หรือ descriptor ซึ่งเป็นรูปแบบมาตรฐาน นำไปเปิดในแอปอื่นได้ และนำกระเป๋าที่ตั้งค่าจากแอปอื่นมาใช้ใน MEBIT ได้เช่นกัน',
        points: [
          'ไฟล์สำรองไม่มี seed',
          'นำเข้าได้จากไฟล์ QR หรือ descriptor',
          'หาก MEBIT หยุดให้บริการ ยังกู้กระเป๋าในแอปอื่นได้',
        ],
      },
    ],
    screens: {
      policy: {
        eyebrow: 'POLICY · ขั้น 1 / 3',
        title: 'ต้องใช้กี่กุญแจในการเซ็น',
        single: { name: 'กระเป๋าเดี่ยว', text: 'กุญแจเดียวเซ็นได้เลย ใช้จ่ายคล่อง' },
        multi: { name: 'หลายลายเซ็น', text: 'ต้องใช้หลายกุญแจร่วมกันเซ็น' },
        presets: ['2 จาก 3', '3 จาก 5'],
        summary: 'ต้องใช้กุญแจ 2 จาก 3 ใบเซ็นร่วมกัน',
        tolerance: 'กุญแจหายได้ถึง 1 ใบ',
        next: 'ต่อไป เลือกกุญแจ',
      },
      pair: {
        eyebrow: 'KEYRING · เพิ่มกุญแจ',
        title: 'เชื่อมต่ออุปกรณ์',
        status: 'Bluetooth เปิดอยู่ · พบ 2 เครื่อง',
        nearby: 'พบใกล้ ๆ',
        connect: 'เชื่อม',
        checklist: ['ค้นหาอุปกรณ์ผ่าน Bluetooth', 'ยืนยันรหัสจับคู่บนหน้าจออุปกรณ์', 'อ่านกุญแจสาธารณะ (xpub)'],
      },
      portable: {
        eyebrow: 'WALLET · สำรองและนำเข้า',
        backupTitle: 'สำรองข้อมูล Wallet',
        backupText: 'ส่งออกเป็นไฟล์ BSMS (ไม่มี seed) เก็บไว้นอกแอปเพื่อกู้คืน',
        save: 'บันทึกไฟล์ BSMS',
        share: 'แชร์ไฟล์ BSMS',
        importTitle: 'นำเข้า Wallet หลายกุญแจ',
        importText: 'จากไฟล์ BSMS, QR หรือ descriptor',
        sources: ['ไฟล์', 'สแกน QR', 'Descriptor'],
      },
      send: {
        eyebrow: 'SEND',
        title: 'ส่งจาก Wallet',
        from: 'จาก',
        fromValue: 'Wallet ครอบครัว · 2 จาก 3',
        to: 'ถึง',
        amount: 'จำนวน',
        fee: 'ค่าธรรมเนียม',
        feeLevels: ['ช้า', 'ปกติ', 'เร็ว'],
        next: 'ต่อไป ตรวจสอบ',
      },
      review: {
        eyebrow: 'SEND · ตรวจสอบ',
        title: 'ตรวจก่อนส่ง',
        dest: 'ปลายทาง',
        change: 'เงินทอนกลับเข้า Wallet',
        fee: 'ค่าธรรมเนียม',
        rule: 'ต้องเซ็น 2 จาก 3 กุญแจก่อนส่ง',
        cta: 'เก็บลายเซ็น',
      },
      sign: {
        eyebrow: 'SEND · ลายเซ็น',
        title: 'เก็บลายเซ็น',
        progress: 'เซ็นแล้ว 2 / 2',
        hint: 'ใช้กุญแจดอกไหนก็ได้ 2 ดอก',
        keys: [
          { name: 'มือถือเครื่องนี้', state: 'เซ็นแล้ว ✓', done: true },
          { name: 'Jade', state: 'เซ็นแล้ว ✓', done: true },
          { name: 'Trezor Safe 7', state: 'ไม่ต้องใช้รอบนี้', done: null },
        ],
        ready: 'ครบแล้ว ส่งได้เลย',
        cta: 'ส่งธุรกรรม',
      },
      slip: {
        eyebrow: 'SEND · เสร็จสิ้น',
        title: 'สลิปส่ง Bitcoin',
        status: 'ส่งเข้าเครือข่ายแล้ว',
        to: 'ถึง',
        fee: 'ค่าธรรมเนียม',
        cta: 'กลับหน้าหลัก',
      },
    },
    flowEyebrow: 'การโอนจากกระเป๋าหลายลายเซ็น',
    flowTitle: 'สี่ขั้นตอน ที่คุณเห็น​ทุกรายละเอียด',
    flowLead: 'รู้ค่าธรรมเนียม เข้าใจทุกขั้นตอน ก่อนยืนยันรายการ',
    flow: [
      { title: 'สร้างรายการ', text: 'ระบุปลายทาง จำนวน และเลือกระดับค่าธรรมเนียมเครือข่าย' },
      { title: 'เก็บลายเซ็น', text: 'กุญแจแต่ละดอกเซ็นบนอุปกรณ์ของตัวเอง จนครบตามเงื่อนไข เช่น 2 ใน 3' },
      { title: 'ตรวจก่อนส่ง', text: 'แอปสรุปปลายทาง ค่าธรรมเนียม และยอดคงเหลือให้ตรวจอีกครั้ง เพราะส่งแล้วยกเลิกไม่ได้' },
      { title: 'ส่งเข้าเครือข่าย', text: 'แอปส่งรายการเข้าเครือข่ายบิตคอยน์ และออกสลิปพร้อม TXID ให้ตรวจสอบบน blockchain' },
    ],
    ossEyebrow: "DON'T TRUST, VERIFY",
    ossTitle: 'โค้ดเปิดเผย ตรวจสอบได้',
    ossText:
      'ซอร์สโค้ดของแอปเปิดให้ทุกคนตรวจสอบ แอปเชื่อมต่อกับเครือข่ายบิตคอยน์โดยตรง ไม่ผ่านเซิร์ฟเวอร์ของ MEBIT',
    ossCta: 'ดูโค้ดบน GitHub',
    noticeTitle: 'ก่อนใช้งาน โปรดทราบ',
    notice: [
      'คุณถือและรับผิดชอบกุญแจและ seed สำรองเอง หากสูญหาย บริษัทไม่สามารถกู้คืนให้ได้',
      'ทีมงานจะไม่ขอ seed หรือกุญแจของคุณ ไม่ว่ากรณีใด',
      'ไฟล์สำรองกระเป๋าไม่มี seed แต่ผู้ที่ได้ไฟล์ไปจะเห็นยอดเงินและประวัติ โปรดเก็บไว้ในที่ปลอดภัย',
      'แอปอยู่ระหว่างทดสอบบนเครือข่ายทดลอง โปรดอย่าโอนบิตคอยน์จริงเข้ามา',
    ],
    helpTitle: 'อยากให้มีคนช่วยตั้งค่ากระเป๋า?',
    helpText: 'นัดหมายบริการแนะนำการตั้งค่ากระเป๋าหลายลายเซ็นแบบตัวต่อตัว',
    helpCta: 'ดูบริการตั้งค่า Multisig',
  },
  en: {
    eyebrow: 'MEBIT WALLET',
    title: 'Multisig wallet, made easy.',
    lead: 'A Bitcoin wallet where the keys stay with you, on your phone and on your hardware wallet. No one else holds them for you.',
    status: 'In testing · not for real funds yet',
    comingSoon: 'Coming soon',
    appStore: 'App Store',
    iosBeta: 'iOS beta on',
    testFlight: 'TestFlight',
    googlePlay: 'Google Play',
    mock: {
      heading: 'Your wallets',
      total: 'Total',
      totalValue: '0.8732 BTC',
      sub: 'On-chain balance',
      spending: { tag: 'SINGLE-SIG', name: 'Spending', meta: '1 key · on this phone', amount: '0.0312' },
      family: { tag: 'MULTISIG 2-OF-3', name: 'Family wallet', meta: '2 of 3 keys to sign', amount: '0.8420' },
      nav: ['Wallets', 'Send / Receive', 'Keys'],
    },
    featuresEyebrow: 'Core features',
    featuresTitle: 'Three things that set MEBIT Wallet apart.',
    features: [
      {
        eyebrow: '01 · MULTISIG',
        title: 'Multisig, made easy',
        text: 'Choose how many keys must sign together, such as 2 of 3. The app guides you step by step, from choosing a policy and keys to checking the wallet’s first address.',
        points: [
          'Set up 2-of-3 or 3-of-5 in a few taps',
          'Lose one key and still reach your funds with the others',
          'A single-key wallet is there for everyday spending',
        ],
      },
      {
        eyebrow: '02 · HARDWARE WALLET',
        title: 'Works with hardware wallets',
        text: 'Connect Blockstream Jade and Trezor Safe 7 over Bluetooth and use each as one key in a multisig wallet. The private key stays on the device.',
        points: [
          'Pair over Bluetooth and confirm the code on the device',
          'Sign transactions directly on Jade or Trezor',
          'Combine with a phone key in the same wallet',
        ],
      },
      {
        eyebrow: '03 · NO LOCK-IN',
        title: 'No lock-in. Use it with other apps.',
        text: 'Export your wallet as a BSMS file or descriptor, both standard formats, and open it in other apps. Wallets set up elsewhere can be imported into MEBIT too.',
        points: [
          'Backup files contain no seed',
          'Import from a file, a QR code or a descriptor',
          'If MEBIT stops operating, recover your wallet in another app',
        ],
      },
    ],
    screens: {
      policy: {
        eyebrow: 'POLICY · STEP 1 / 3',
        title: 'How many keys must sign?',
        single: { name: 'Single key', text: 'One key signs. Quick for spending.' },
        multi: { name: 'Multisig', text: 'Several keys sign together.' },
        presets: ['2 of 3', '3 of 5'],
        summary: 'Any 2 of 3 keys sign together',
        tolerance: 'Up to 1 key can be lost',
        next: 'Next: choose keys',
      },
      pair: {
        eyebrow: 'KEYRING · ADD KEY',
        title: 'Connect a device',
        status: 'Bluetooth on · 2 found',
        nearby: 'Nearby',
        connect: 'Connect',
        checklist: ['Search over Bluetooth', 'Confirm the pairing code on the device', 'Read the public key (xpub)'],
      },
      portable: {
        eyebrow: 'WALLET · BACKUP & IMPORT',
        backupTitle: 'Back up this wallet',
        backupText: 'Export a BSMS file (no seed) and keep it outside the app for recovery.',
        save: 'Save BSMS file',
        share: 'Share BSMS file',
        importTitle: 'Import a multisig wallet',
        importText: 'From a BSMS file, QR or descriptor',
        sources: ['File', 'Scan QR', 'Descriptor'],
      },
      send: {
        eyebrow: 'SEND',
        title: 'Send from wallet',
        from: 'From',
        fromValue: 'Family wallet · 2 of 3',
        to: 'To',
        amount: 'Amount',
        fee: 'Network fee',
        feeLevels: ['Slow', 'Normal', 'Fast'],
        next: 'Next: review',
      },
      review: {
        eyebrow: 'SEND · REVIEW',
        title: 'Review before sending',
        dest: 'Destination',
        change: 'Change back to wallet',
        fee: 'Network fee',
        rule: '2 of 3 keys must sign before sending',
        cta: 'Collect signatures',
      },
      sign: {
        eyebrow: 'SEND · SIGNATURES',
        title: 'Collect signatures',
        progress: 'Signed 2 / 2',
        hint: 'Any 2 keys will do',
        keys: [
          { name: 'This phone', state: 'Signed ✓', done: true },
          { name: 'Jade', state: 'Signed ✓', done: true },
          { name: 'Trezor Safe 7', state: 'Not needed this time', done: null },
        ],
        ready: 'All set. Ready to send.',
        cta: 'Broadcast',
      },
      slip: {
        eyebrow: 'SEND · DONE',
        title: 'Bitcoin sent',
        status: 'Broadcast to the network',
        to: 'To',
        fee: 'Network fee',
        cta: 'Back to home',
      },
    },
    flowEyebrow: 'Sending from a multisig wallet',
    flowTitle: 'Four steps, every detail in view.',
    flowLead: 'Know the fee. Understand the step. Then confirm.',
    flow: [
      { title: 'Create', text: 'Enter the destination and amount, and choose a network fee level.' },
      { title: 'Sign', text: 'Each key signs on its own device until the rule is met, such as 2 of 3.' },
      { title: 'Review', text: 'The app summarizes the destination, fee and remaining balance for a final check — sent is final.' },
      { title: 'Broadcast', text: 'The app sends it to the Bitcoin network and issues a slip with the TXID to verify on-chain.' },
    ],
    ossEyebrow: "DON'T TRUST, VERIFY",
    ossTitle: 'Open source, open to review.',
    ossText:
      "The app's source code is public. It connects to the Bitcoin network directly, not through a MEBIT server.",
    ossCta: 'View the code on GitHub',
    noticeTitle: 'Before you start',
    notice: [
      'You hold, and are responsible for, your keys and seed backup. If they are lost, the company cannot recover them.',
      'Our team will never ask for your seed or keys, under any circumstances.',
      'Wallet backup files contain no seed, but anyone who gets one can see your balance and history. Keep it somewhere safe.',
      'The app is in testing on a test network. Please do not send real Bitcoin to it.',
    ],
    helpTitle: 'Want someone to guide your set-up?',
    helpText: 'Book a one-on-one guided session for a multisig wallet.',
    helpCta: 'See the Multisig Set-up Service',
  },
};

/** Text can be edited in Obsidian: site-v2/website-text (see withText.ts). */
export const wallet = withText('wallet', walletText);
