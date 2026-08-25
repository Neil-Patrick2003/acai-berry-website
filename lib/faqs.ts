/**
 * The FAQ copy. Shared by the home page accordion and site search, so an answer
 * only ever has to be edited in one place.
 */

export type Faq = {
  question: string;
  answer: string;
};

export const FAQS: Faq[] = [
  {
    question: "How quickly will I see results?",
    answer:
      "Most people notice a difference in how their skin looks and feels after four to six weeks of daily use. Consistency matters more than dose — one sachet a day, every day.",
  },
  {
    question: "When should I take Beyou Acai Berry Glow?",
    answer:
      "Any time that fits your routine. Many prefer the morning with breakfast; others make it an evening wind-down. Take it with water and enjoy it cold.",
  },
  {
    question: "Can I take this with other supplements?",
    answer:
      "Yes. Acai Berry Glow is a food supplement and pairs with most daily vitamins. If you are pregnant, nursing, or on prescription medication, check with your doctor first.",
  },
  {
    question: "What if it doesn't work for me?",
    answer:
      "Every order is covered by our 30-day money-back guarantee. Contact us within 30 days of delivery and we will refund you in full.",
  },
];
