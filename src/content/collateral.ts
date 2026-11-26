import type { Bilingual } from '../i18n';
import { withText } from './withText';
import type { InfoCard } from './multisig';

/**
 * Loan parameters from the booth brief. Cost figures are marked "not final" there,
 * so every place that shows them labels them as estimates.
 */
export const loanRules = {
  minLoan: 20_000,
  maxLoan: 3_000_000, // KYC level 2 cap
  kyc1Cap: 500_000,
  ltvMin: 20,
  ltvMax: 80,
  ltvStep: 5,
  terms: [1, 3, 6, 12] as const,
  termDays: { 1: 30, 3: 90, 6: 180, 12: 365 } as Record<number, number>,
  apr: 0.15, // estimate
  originationFee: 1_000, // estimate, deducted at disbursement
  closingFee: 1_000, // estimate, included in payoff
  sampleBtcPrice: 3_000_000, // illustrative only — not a market quote
};

const collateralText: Bilingual<{
  eyebrow: string;
  title: string;
  lead: string;
  cta: string;
  ctaNote: string;
  trust: string[];
  calc: {
    eyebrow: string;
    title: string;
    lead: string;
    amountLabel: string;
    amountHelp: string;
    kycHint: string;
    priceLabel: string;
    priceHelp: string;
    ltvLabel: string;
    ltvHelp: string;
    presets: { label: string; ltv: number }[];
    termLabel: string;
    months: (n: number) => string;
    resultEyebrow: string;
    btcNeeded: string;
    collateralValue: string;
    receive: string;
    receiveNote: string;
    interest: string;
    interestNote: (days: number) => string;
    ladderTitle: string;
    ladderLead: string;
    now: string;
    warn: string;
    warnText: string;
    call: string;
    callText: string;
    seize: string;
    seizeText: string;
    drop: (pct: string) => string;
    tip: string;
    disclaimer: string;
  };
  cardsEyebrow: string;
  cardsTitle: string;
  cards: InfoCard[];
  processTitle: string;
  process: { title: string; text: string }[];
  closingTitle: string;
  closingText: string;
  legal: string;
}> = {
  th: {
    eyebrow: 'MEBIT BITCOIN COLLATERAL',
    title: 'นำบิตคอยน์มาค้ำ รับเงินสดไปใช้',
    lead: 'สินเชื่อเงินบาทที่ไม่ต้องขายบิตคอยน์ วางบิตคอยน์เป็นหลักประกัน รับเงินบาทเข้าบัญชี ชำระครบเมื่อไร รับบิตคอยน์คืน',
    cta: 'ลงทะเบียนความสนใจ',
    ctaNote: 'การลงทะเบียนไม่ใช่การอนุมัติสินเชื่อ',
    trust: ['ตรวจยอดค้ำได้บนบล็อกเชน', 'ไม่นำบิตคอยน์ของคุณไปปล่อยกู้ต่อ', 'ปิดก่อนกำหนด ไม่มีค่าปรับ'],
    calc: {
      eyebrow: 'เครื่องคำนวณ',
      title: 'ลองคำนวณวงเงิน',
      lead: 'ระบุจำนวนเงินที่ต้องการ แล้วดูว่าต้องใช้บิตคอยน์ค้ำเท่าไร และราคาบิตคอยน์ระดับใดที่ต้องเฝ้าระวัง',
      amountLabel: 'จำนวนเงินที่ต้องการ',
      amountHelp: 'ขั้นต่ำ ฿20,000 สูงสุด ฿3,000,000 ต่อบัญชี',
      kycHint: 'วงเงินเกิน ฿500,000 ต้องยืนยันตัวตนระดับ 2',
      priceLabel: 'ราคาบิตคอยน์ที่ใช้คำนวณ (บาท / BTC)',
      priceHelp: 'ตัวเลขสมมติเพื่อการคำนวณ ไม่ใช่ราคาตลาด ปรับเป็นราคาปัจจุบันได้',
      ltvLabel: 'สัดส่วนวงเงินต่อมูลค่าหลักประกัน (LTV)',
      ltvHelp: 'LTV ต่ำ ต้องใช้บิตคอยน์ค้ำมากขึ้น แต่ห่างจากจุดยึดมากขึ้น',
      presets: [
        { label: 'ระมัดระวัง', ltv: 30 },
        { label: 'สมดุล', ltv: 50 },
        { label: 'เต็มวงเงิน', ltv: 80 },
      ],
      termLabel: 'ระยะเวลา',
      months: (n) => `${n} เดือน`,
      resultEyebrow: 'ผลการคำนวณ',
      btcNeeded: 'บิตคอยน์ที่ต้องวางค้ำ',
      collateralValue: 'มูลค่าหลักประกัน',
      receive: 'เงินที่ได้รับโดยประมาณ',
      receiveNote: 'หักค่าธรรมเนียมการกู้ ฿1,000 แล้ว',
      interest: 'ดอกเบี้ยโดยประมาณ',
      interestNote: (d) => `15% ต่อปี คิดรายวัน ${d} วัน หากใช้เงินครบระยะ`,
      ladderTitle: 'ถ้าราคาบิตคอยน์ลดลง',
      ladderLead: 'ยิ่งราคาลด สัดส่วนหนี้ต่อมูลค่าหลักประกันยิ่งสูงขึ้น ระบบมี 3 จุดตามลำดับ',
      now: 'ราคาที่ใช้คำนวณ',
      warn: 'แจ้งเตือน',
      warnText: 'แจ้งให้ทราบ ยังไม่ต้องดำเนินการ',
      call: 'Margin call',
      callText: 'เติมบิตคอยน์ หรือชำระบางส่วน ภายใน 24 ชม.',
      seize: 'บังคับหลักประกัน',
      seizeText: 'มูลค่าบิตคอยน์เท่ากับหนี้ (LTV 100%) ระบบยึดบิตคอยน์ทั้งหมดและปิดสัญญา ไม่มีหนี้ค้าง',
      drop: (p) => `ลดลง ${p}`,
      tip: 'ยิ่งกู้น้อยกว่าวงเงินที่กู้ได้ ยิ่งห่างจากจุดยึด และดอกเบี้ยเดินทุกวัน แม้ราคาบิตคอยน์จะขึ้นก็ตาม',
      disclaimer:
        'ผลการคำนวณเป็นการประมาณการเพื่อประกอบการตัดสินใจเท่านั้น ไม่รวมดอกเบี้ยค้างชำระและค่าธรรมเนียมเครือข่าย อัตราดอกเบี้ยและค่าธรรมเนียมยังไม่ใช่อัตราสุดท้าย วงเงินจริงคำนวณจากราคา ณ เวลาที่เจ้าหน้าที่ตรวจรับบิตคอยน์',
    },
    cardsEyebrow: 'สิ่งที่ควรรู้ก่อนกู้',
    cardsTitle: 'เงื่อนไขสินเชื่อ',
    cards: [
      {
        eyebrow: 'คุณสมบัติผู้กู้',
        title: 'ใครกู้ได้บ้าง',
        items: [
          'อายุ 20 ปีขึ้นไป',
          'ยืนยันตัวตน (KYC) ด้วยบัตรประชาชนและภาพเซลฟี่',
          'มีบัญชีธนาคารในประเทศไทย ชื่อเดียวกับผู้กู้',
          'ตั้งค่าการยืนยันตัวตนสองขั้นตอน (2FA)',
        ],
      },
      {
        eyebrow: 'วงเงินและระยะเวลา',
        title: 'ยืดหยุ่นตามที่คุณเลือก',
        items: [
          'กู้ได้ 20–80% ของมูลค่าบิตคอยน์ที่วางค้ำ ปรับได้ทีละ 5%',
          'วงเงินขั้นต่ำ ฿20,000',
          'วงเงินสูงสุดต่อบัญชี: KYC ระดับ 1 ฿500,000 · KYC ระดับ 2 ฿3,000,000',
          'ระยะเวลา 1, 3, 6 หรือ 12 เดือน ต่ออายุได้ตั้งแต่ 7 วันก่อนครบกำหนด หลังชำระดอกเบี้ยงวดเดิมแล้ว',
        ],
        tone: 'brand',
      },
      {
        eyebrow: 'ค่าใช้จ่ายโดยประมาณ',
        title: 'รู้ค่าใช้จ่ายก่อนตัดสินใจ',
        items: [
          'ดอกเบี้ยประมาณ 15% ต่อปี คิดรายวันตามจำนวนวันที่ใช้เงินจริง ไม่หักล่วงหน้า',
          'ค่าธรรมเนียมการกู้ประมาณ ฿1,000 ต่อสัญญา หักจากเงินที่โอนให้',
          'ค่าปิดสัญญาประมาณ ฿1,000 ต่อสัญญา รวมอยู่ในยอดปิด',
          'ค่าธรรมเนียมเครือข่ายบิตคอยน์ประมาณ 0.0001 BTC ต่อครั้ง',
          'ปิดก่อนกำหนดไม่มีค่าปรับ จ่ายดอกเบี้ยตามวันที่ใช้จริง',
        ],
      },
      {
        eyebrow: 'การชำระคืน',
        title: 'ชำระได้ทุกเมื่อ',
        items: [
          'สแกน PromptPay QR หรือโอนเข้าบัญชีบริษัทแล้วแนบสลิป โดยโอนจากบัญชีชื่อของคุณเอง',
          'ชำระบางส่วนได้ตลอด ระบบหักดอกเบี้ยค้างก่อน แล้วจึงหักเงินต้น',
          'ชำระครบแล้ว คืนบิตคอยน์ภายใน 4 ชั่วโมง ไปยังที่อยู่ที่ลงทะเบียนไว้',
          'หากเป็นที่อยู่บิตคอยน์ใหม่ ต้องรอ 24 ชั่วโมงก่อนคืน เพื่อความปลอดภัย',
        ],
      },
      {
        eyebrow: 'ผิดนัดชำระ',
        title: 'เมื่อเลยกำหนดชำระ',
        items: [
          'คิดดอกเบี้ยผิดนัดประมาณ 18% ต่อปี ตั้งแต่วันถัดจากวันครบกำหนด',
          'หากเลยกำหนดเกิน 15 วัน จะเริ่มบังคับหลักประกัน',
          'ราคาอ้างอิงเฉลี่ยจากหลายแหล่ง ทั้งกระดานเทรดในไทยและเว็บรวมราคา และตัดแหล่งที่ราคาผิดปกติออก',
        ],
      },
      {
        eyebrow: 'ข้อควรระวัง',
        title: 'โปรดพิจารณาความเสี่ยง',
        items: [
          'ราคาบิตคอยน์ผันผวนสูง หากมูลค่าหลักประกันลดลง คุณต้องเติมหลักประกัน มิฉะนั้นบิตคอยน์อาจถูกบังคับเพื่อชำระหนี้',
          'มีดอกเบี้ยและค่าธรรมเนียม',
          'ระยะเวลาที่แจ้งทั้งหมด นับเฉพาะเวลาทำการ จันทร์–ศุกร์ 09:00–18:00 น.',
          'ขณะนี้เปิดให้ลงทะเบียนความสนใจเท่านั้น ยังไม่เปิดให้กู้จริง',
        ],
        tone: 'caution',
      },
    ],
    processTitle: 'ขั้นตอนการกู้ 6 ขั้น',
    process: [
      { title: 'เลือกวงเงิน', text: 'ระบุจำนวนเงิน LTV และระยะเวลา' },
      { title: 'ตรวจสรุป', text: 'ตรวจยอด ค่าใช้จ่าย และเงื่อนไขก่อนยืนยัน' },
      { title: 'โอนบิตคอยน์', text: 'โอนไปยังที่อยู่เฉพาะของคำขอนั้น' },
      { title: 'ตรวจรับบิตคอยน์', text: 'เจ้าหน้าที่ตรวจรับภายใน 2 ชม. และแสดงวงเงินจริงตามราคา ณ เวลานั้น' },
      { title: 'ลงนามสัญญา', text: 'หากไม่พอใจวงเงินจริง ยกเลิกและขอบิตคอยน์คืนได้ก่อนลงนาม' },
      { title: 'รับเงินบาท', text: 'โอนเข้าบัญชีของคุณภายใน 1 ชม.' },
    ],
    closingTitle: 'สนใจรับบริการ',
    closingText: 'ลงทะเบียนไว้ก่อน เราจะแจ้งให้ทราบเมื่อเปิดให้บริการ',
    legal:
      'สำหรับผู้มีอายุ 20 ปีขึ้นไป · ราคาบิตคอยน์ผันผวนสูง · มีดอกเบี้ยและค่าธรรมเนียม · การลงทะเบียนไม่ใช่การอนุมัติ · เงื่อนไขเป็นไปตามที่บริษัท มีบิต จำกัด กำหนด และอาจเปลี่ยนแปลงได้โดยไม่ต้องแจ้งล่วงหน้า · ดูรายละเอียดและความเสี่ยงที่ loan.mebit.co.th',
  },
  en: {
    eyebrow: 'MEBIT BITCOIN COLLATERAL',
    title: 'Keep your Bitcoin. Borrow Thai baht.',
    lead: 'A Thai baht loan without selling your Bitcoin. Pledge Bitcoin as collateral, receive baht in your bank account, and get your Bitcoin back when you repay in full.',
    cta: 'Register your interest',
    ctaNote: 'Registration is not a loan approval.',
    trust: ['Collateral verifiable on-chain', 'We never lend out your Bitcoin', 'No penalty for early repayment'],
    calc: {
      eyebrow: 'Calculator',
      title: 'Estimate your loan',
      lead: 'Enter the amount you need to see how much Bitcoin to pledge, and which Bitcoin prices to keep an eye on.',
      amountLabel: 'Amount you need',
      amountHelp: 'Minimum ฿20,000, maximum ฿3,000,000 per account',
      kycHint: 'Amounts above ฿500,000 require KYC level 2',
      priceLabel: 'Bitcoin price used (THB / BTC)',
      priceHelp: 'An illustrative figure, not a market quote. Change it to the current price.',
      ltvLabel: 'Loan-to-value ratio (LTV)',
      ltvHelp: 'A lower LTV needs more Bitcoin, but keeps you further from liquidation.',
      presets: [
        { label: 'Conservative', ltv: 30 },
        { label: 'Balanced', ltv: 50 },
        { label: 'Maximum', ltv: 80 },
      ],
      termLabel: 'Term',
      months: (n) => (n === 1 ? '1 month' : `${n} months`),
      resultEyebrow: 'Your estimate',
      btcNeeded: 'Bitcoin to pledge',
      collateralValue: 'Collateral value',
      receive: 'You receive (approx.)',
      receiveNote: 'After the ฿1,000 origination fee',
      interest: 'Estimated interest',
      interestNote: (d) => `15% a year, accrued daily, over ${d} days if held to term`,
      ladderTitle: 'If the Bitcoin price falls',
      ladderLead: 'As the price falls, your loan grows relative to your collateral. There are three checkpoints, in order.',
      now: 'Price used',
      warn: 'Alert',
      warnText: "We notify you. No action needed yet.",
      call: 'Margin call',
      callText: 'Add Bitcoin or repay part of the loan within 24 hours.',
      seize: 'Liquidation',
      seizeText: 'Collateral equals the debt (LTV 100%). All pledged Bitcoin is taken and the contract closes, with no debt left.',
      drop: (p) => `${p} drop`,
      tip: 'The less you borrow against your limit, the further you are from liquidation. And interest accrues every day, even when the Bitcoin price rises.',
      disclaimer:
        'Figures are estimates to help you decide. They exclude accrued interest and network fees. Interest rates and fees are not final. Your actual limit is set by the price at the time our team confirms receipt of your Bitcoin.',
    },
    cardsEyebrow: 'Before you borrow',
    cardsTitle: 'Loan conditions',
    cards: [
      {
        eyebrow: 'Eligibility',
        title: 'Who can apply',
        items: [
          'Aged 20 or older',
          'Identity verified (KYC) with a Thai ID card and a selfie',
          'A Thai bank account in the same name as the borrower',
          'Two-factor authentication (2FA) turned on',
        ],
      },
      {
        eyebrow: 'Limits and terms',
        title: 'Flexible, on your terms',
        items: [
          'Borrow 20–80% of your pledged Bitcoin value, adjustable in 5% steps',
          'Minimum loan ฿20,000',
          'Maximum per account: KYC level 1 ฿500,000 · KYC level 2 ฿3,000,000',
          'Terms of 1, 3, 6 or 12 months. Renew from 7 days before maturity, once the current interest is paid',
        ],
        tone: 'brand',
      },
      {
        eyebrow: 'Estimated costs',
        title: 'Know the cost before you decide',
        items: [
          'Interest of about 15% a year, accrued daily on the days you actually use the money, never charged upfront',
          'Origination fee of about ฿1,000 per contract, deducted from the payout',
          'Closing fee of about ฿1,000 per contract, included in the payoff amount',
          'Bitcoin network fee of about 0.0001 BTC per transaction',
          'No early repayment penalty. Interest is charged only up to the day you repay',
        ],
      },
      {
        eyebrow: 'Repayment',
        title: 'Repay anytime',
        items: [
          'Scan a PromptPay QR, or transfer to the company account and attach the slip. Transfers must come from an account in your name',
          'Partial repayments are welcome anytime. They cover accrued interest first, then principal',
          'Once fully repaid, your Bitcoin is returned within 4 hours to your registered address',
          'A newly added Bitcoin address has a 24-hour security hold before the return',
        ],
      },
      {
        eyebrow: 'Late payment',
        title: 'If you miss the due date',
        items: [
          'Default interest of about 18% a year applies from the day after the due date',
          'After 15 days overdue, collateral enforcement begins',
          'Reference prices average several sources, including Thai exchanges and price aggregators, with outliers removed',
        ],
      },
      {
        eyebrow: 'Please note',
        title: 'Consider the risks',
        items: [
          'Bitcoin prices are highly volatile. If your collateral value falls, you must add collateral, or your Bitcoin may be used to repay the debt',
          'Interest and fees apply',
          'All stated timeframes count business hours only: Mon–Fri, 9:00 AM–6:00 PM',
          'We are currently taking registrations of interest only. Loans are not yet available',
        ],
        tone: 'caution',
      },
    ],
    processTitle: 'Six steps',
    process: [
      { title: 'Choose your loan', text: 'Set the amount, LTV and term.' },
      { title: 'Review', text: 'Check the amount, costs and terms before confirming.' },
      { title: 'Send Bitcoin', text: 'Transfer to the unique address for that request.' },
      { title: 'We confirm receipt', text: 'Within 2 hours, we confirm and show your actual limit at the current price.' },
      { title: 'Sign the contract', text: 'Not happy with the final limit? Cancel and get your Bitcoin back before signing.' },
      { title: 'Receive baht', text: 'Paid into your bank account within 1 hour.' },
    ],
    closingTitle: 'Interested?',
    closingText: "Register now, and we'll let you know when the service opens.",
    legal:
      'For ages 20 and over · Bitcoin prices are highly volatile · Interest and fees apply · Registration is not an approval · Terms are set by MEBIT Co., Ltd. and may change without prior notice · See details and risks at loan.mebit.co.th',
  },
};

/** Text can be edited in Obsidian: mebit-website/website-text (see withText.ts). */
export const collateral = withText('collateral', collateralText);
