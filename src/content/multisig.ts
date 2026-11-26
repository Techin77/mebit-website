import type { Bilingual } from '../i18n';
import { withText } from './withText';

export type InfoCard = { eyebrow: string; title: string; items: string[]; tone?: 'default' | 'brand' | 'caution' };

const multisigText: Bilingual<{
  eyebrow: string;
  title: string;
  lead: string;
  cta: string;
  ctaNote: string;
  howCta: string;
  facts: { label: string; value: string }[];
  stepsEyebrow: string;
  stepsTitle: string;
  steps: { title: string; text: string }[];
  cardsEyebrow: string;
  cardsTitle: string;
  cards: InfoCard[];
  closingTitle: string;
  closingText: string;
  disclaimer: string;
}> = {
  th: {
    eyebrow: 'MEBIT MULTISIG SET-UP SERVICE',
    title: 'หลายกุญแจ หนึ่งกระเป๋า ทุกขั้นตอน\u200bอยู่ในมือคุณ',
    lead: 'บริการตั้งค่ากระเป๋าหลายลายเซ็นพร้อมใช้ แบบนัดหมายตัวต่อตัว คุณลงมือเองบนอุปกรณ์ของคุณ โดยมีทีมงานแนะนำทีละขั้น และกลับบ้านพร้อมกระเป๋าที่ใช้งานได้ทันที',
    cta: 'กรอกฟอร์มนัดหมาย',
    ctaNote: 'ทีมงานจะเริ่มติดต่อกลับช่วงต้นปี 2027',
    howCta: 'ขั้นตอนรับบริการ',
    facts: [
      { label: 'ระยะเวลา', value: 'ประมาณครึ่งวัน' },
      { label: 'สถานที่', value: 'อาคาร CDC กรุงเทพฯ' },
      { label: 'รูปแบบ', value: 'ใช้ส่วนตัว หรือใช้ร่วมกันหลายคน' },
    ],
    stepsEyebrow: 'ขั้นตอนรับบริการ',
    stepsTitle: 'จากแบบฟอร์ม สู่กระเป๋า\u200bที่พร้อมใช้',
    steps: [
      { title: 'กรอกแบบฟอร์ม', text: 'บอกเราว่าต้องการกระเป๋าแบบไหน ใช้คนเดียว หรือใช้ร่วมกับครอบครัวหรือองค์กร' },
      { title: 'คุยรายละเอียดผ่าน video call', text: 'ทีมงานติดต่อกลับเพื่อออกแบบรูปแบบกระเป๋า แจ้งค่าบริการ และยืนยันวันนัดหมาย' },
      { title: 'ชำระค่าบริการ', text: 'ชำระได้ทั้งเงินบาทและบิตคอยน์ ก่อนวันนัดหมาย' },
      { title: 'รับบริการที่อาคาร CDC', text: 'ใช้เวลาประมาณครึ่งวัน คุณลงมือตั้งค่าเองทุกขั้นตอน โดยมีทีมงานแนะนำอยู่ข้าง ๆ' },
    ],
    cardsEyebrow: 'สิ่งที่ควรรู้',
    cardsTitle: 'ข้อมูลสำคัญ ก่อนนัดหมาย',
    cards: [
      {
        eyebrow: 'สิ่งที่คุณจะได้รับ',
        title: 'กระเป๋าที่ใช้งานได้ตั้งแต่วันแรก',
        items: [
          'กระเป๋าหลายลายเซ็นตามรูปแบบที่ตกลงกันไว้',
          'ตั้งค่าโดยยึดแอป MEBIT เป็นหลัก และใช้ร่วมกับ software wallet อื่นได้ ทั้งตั้งค่าร่วมกันหรือส่งออกไปใช้',
          'หากวันหนึ่ง MEBIT ยุติการให้บริการ คุณยังกู้กระเป๋าในแอปอื่นได้',
          'คู่มือดูแลกระเป๋าเบื้องต้นแบบรูปแบบกลาง ทีมงานทำเครื่องหมายหรือเขียนกำกับเฉพาะของคุณลงไป คล้ายใบสั่งยา เพื่อไม่ให้ข้อมูลการตั้งค่าของคุณรั่วไหล',
        ],
        tone: 'brand',
      },
      {
        eyebrow: 'นโยบายความปลอดภัย',
        title: 'คุณควบคุมทุกขั้นตอน',
        items: [
          'คุณถือกุญแจทั้งหมดของกระเป๋าด้วยตัวเอง',
          'ใช้โทรศัพท์และคอมพิวเตอร์ของคุณเท่านั้น ไม่ใช้อุปกรณ์ของเรา',
          'ทีมงานจะไม่กดปุ่ม แตะหน้าจอ หรือสั่งงานอุปกรณ์ของคุณแทนไม่ว่ากรณีใด',
          'ทีมงานจะไม่มอง seed ของคุณ หากมีผู้อื่นเห็นโดยไม่ได้ตั้งใจ เราจะเริ่มขั้นตอนใหม่ทั้งหมด',
          'ห้องรับบริการมีกล้องวงจรปิดบันทึกเป็นหลักฐาน ยกเว้นบริเวณที่คุณสร้าง seed',
        ],
      },
      {
        eyebrow: 'ขอบเขตบริการ',
        title: 'สิ่งที่เราไม่ได้ให้บริการ',
        items: [
          'ไม่รับฝากหรือถือกุญแจแทนคุณ',
          'ไม่ช่วยโอนย้ายบิตคอยน์จากกระดานเทรดเข้ากระเป๋า',
          'ไม่มีบริการหลังการขาย หากต้องการตั้งค่าใหม่ สามารถนัดหมายแยกได้',
          'หากพบปัญหา ส่งอีเมลถึงเราได้ที่ meet@mebit.co.th',
        ],
      },
      {
        eyebrow: 'ค่าบริการและการนัดหมาย',
        title: 'แจ้งราคาก่อนยืนยันทุกครั้ง',
        items: [
          'ทีมงานแจ้งค่าบริการเมื่อติดต่อกลับ หากให้เราจัดเตรียม hardware wallet จะรวมค่าอุปกรณ์ไว้ในราคา',
          'ชำระได้ทั้งเงินบาทและบิตคอยน์',
          'หากยกเลิกหลังชำระเงิน เราจะเสนอเลื่อนนัดก่อน หากไม่สะดวกเลื่อน จะพิจารณาคืนเงินบางส่วน',
          'ระยะเวลาที่แจ้งทั้งหมด นับเฉพาะเวลาทำการ จันทร์–ศุกร์ 09:00–18:00 น.',
        ],
      },
      {
        eyebrow: 'เตรียมตัวก่อนวันนัด',
        title: 'มาให้ครบ ตั้งค่าครั้งเดียว',
        items: [
          'พาทุกคนที่เกี่ยวข้องกับกระเป๋ามาพร้อมกัน เพราะแต่ละคนต้องสร้างกุญแจของตัวเอง',
          'นำโทรศัพท์และคอมพิวเตอร์ของแต่ละคนมาด้วย',
          'หากมี hardware wallet อยู่แล้ว นำมาด้วย และแจ้งรุ่นให้ทีมงานทราบตอนคุยรายละเอียด',
        ],
      },
      {
        eyebrow: 'ข้อควรระวัง',
        title: 'กุญแจเป็นความรับผิดชอบของคุณ',
        items: [
          'คุณถือและรับผิดชอบกุญแจและ seed สำรองเอง หากสูญหาย บริษัทไม่สามารถกู้คืนให้ได้',
          'ทีมงานจะไม่ขอ seed หรือกุญแจของคุณ ไม่ว่ากรณีใด',
          'ข้อมูลในแบบฟอร์มใช้เพื่อการนัดหมายเท่านั้น',
        ],
        tone: 'caution',
      },
    ],
    closingTitle: 'พร้อมเริ่มต้นแล้วหรือยัง',
    closingText: 'กรอกแบบฟอร์มไว้ก่อน ทีมงานจะติดต่อกลับเพื่อคุยรายละเอียดและยืนยันวันนัด',
    disclaimer: 'ค่าบริการ วันนัดหมาย และเงื่อนไข เป็นไปตามที่บริษัท มีบิต จำกัด กำหนด และอาจเปลี่ยนแปลงได้',
  },
  en: {
    eyebrow: 'MEBIT MULTISIG SET-UP SERVICE',
    title: 'Many keys. One wallet. Every step in your hands.',
    lead: 'A ready-to-use multisig wallet, set up in a one-on-one guided session. You do every step on your own devices with our team beside you, and leave with a wallet that is ready to use.',
    cta: 'Request a session',
    ctaNote: 'We will start reaching out in early 2027.',
    howCta: 'How it works',
    facts: [
      { label: 'Duration', value: 'About half a day' },
      { label: 'Location', value: 'CDC Building, Bangkok' },
      { label: 'Set-up for', value: 'Individuals or shared wallets' },
    ],
    stepsEyebrow: 'How it works',
    stepsTitle: 'From a short form to a working wallet.',
    steps: [
      { title: 'Fill in the form', text: 'Tell us what kind of wallet you need: for yourself, or shared with family or an organization.' },
      { title: 'Plan it on a video call', text: 'We call you to design the wallet set-up, quote the service fee and confirm your appointment.' },
      { title: 'Pay the service fee', text: 'Pay in Thai baht or in Bitcoin before your appointment.' },
      { title: 'Your session at CDC', text: 'About half a day. You perform every step yourself, with our team guiding you.' },
    ],
    cardsEyebrow: 'What to know',
    cardsTitle: 'Key details before you book.',
    cards: [
      {
        eyebrow: 'What you get',
        title: 'A wallet that works from day one',
        items: [
          'A multisig wallet in the configuration we agree on',
          'Built around the MEBIT app, and works with other software wallets, either set up together or exported',
          'Recoverable in other wallet apps, even if MEBIT stops operating',
          'A general-format care guide. We tick or handwrite the parts specific to you, like a prescription, so your set-up details stay private',
        ],
        tone: 'brand',
      },
      {
        eyebrow: 'Safety policy',
        title: 'You stay in control',
        items: [
          'You hold every key to your wallet',
          'Only your own phones and computers are used, never ours',
          'Our team never presses a button, touches a screen or enters a command on your devices',
          'We never look at your seed. If anyone else sees it by accident, we restart the whole process',
          'The room is recorded on CCTV for your protection, except the area where you create your seed',
        ],
      },
      {
        eyebrow: 'Service scope',
        title: "What we don't do",
        items: [
          'We do not hold or store keys for you',
          'We do not move Bitcoin from exchanges into your wallet',
          'There is no ongoing support plan. A new set-up can be booked as a separate session',
          'If you run into a problem, email us at meet@mebit.co.th',
        ],
      },
      {
        eyebrow: 'Fees and booking',
        title: 'You see the price before you confirm',
        items: [
          'We quote the fee when we contact you. If we prepare a hardware wallet for you, its cost is included',
          'Pay in Thai baht or in Bitcoin',
          'If you cancel after paying, we first offer to reschedule. If that does not work, we will look at a partial refund',
          'All stated timeframes count business hours only: Mon–Fri, 9:00 AM–6:00 PM',
        ],
      },
      {
        eyebrow: 'Before your session',
        title: 'Bring everyone, set up once',
        items: [
          'Bring everyone who will share the wallet. Each person creates their own key',
          "Bring each person's phone and computer",
          'If you already own a hardware wallet, bring it and tell us the model during the planning call',
        ],
      },
      {
        eyebrow: 'Please note',
        title: 'Keys are a responsibility',
        items: [
          'You hold, and are responsible for, your keys and seed backup. If they are lost, the company cannot recover them',
          'Our team will never ask for your seed or keys, under any circumstances',
          'Form details are used only to arrange your appointment',
        ],
        tone: 'caution',
      },
    ],
    closingTitle: 'Ready when you are.',
    closingText: "Fill in the form, and we'll reach out to plan the details and confirm a date.",
    disclaimer: 'Fees, appointment dates and terms are set by MEBIT Co., Ltd. and may change.',
  },
};

/** Text can be edited in Obsidian: mebit-website/website-text (see withText.ts). */
export const multisig = withText('multisig', multisigText);
