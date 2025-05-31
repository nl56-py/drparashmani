export interface VideoItem {
  id: string;
  titleEn: string;
  titleNp: string;
  descriptionEn: string;
  descriptionNp: string;
  embedUrl: string;
  thumbnailUrl: string;
  dateEn: string;
  dateNp: string;
  categoryEn: string;
  categoryNp: string;
}

export const videoData: VideoItem[] = [
  {
    id: "1",
    titleEn: "Kidney Transplant Journey: From Evaluation to Recovery",
    titleNp: "मिर्गौला प्रत्यारोपण यात्रा: मूल्यांकनदेखि पुनर्प्राप्तिसम्म",
    descriptionEn: "Dr. Parash Mani Shrestha walks through the entire kidney transplant process, including the evaluation of donors and recipients, surgery preparation, the transplant procedure, and post-operative care.",
    descriptionNp: "डा. पारस मणि श्रेष्ठले दाताहरू र प्राप्तकर्ताहरूको मूल्यांकन, शल्यक्रिया तयारी, प्रत्यारोपण प्रक्रिया, र पोस्ट-अपरेटिभ हेरचाह सहित पूरै मिर्गौला प्रत्यारोपण प्रक्रिया मार्फत हिँड्नुहुन्छ।",
    embedUrl: "https://www.youtube.com/embed/d193sbqWKOE",
    thumbnailUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118",
    dateEn: "March 10, 2023",
    dateNp: "फाल्गुन २६, २०७९",
    categoryEn: "Transplantation",
    categoryNp: "प्रत्यारोपण"
  },
  {
    id: "2",
    titleEn: "Understanding Urinary Tract Infections (UTIs)",
    titleNp: "मूत्र मार्ग संक्रमण (UTI) बुझ्दै",
    descriptionEn: "Dr. Parash Mani Shrestha explains the causes, symptoms, and treatment options for urinary tract infections, which affect millions of people each year.",
    descriptionNp: "डा. पारस मणि श्रेष्ठले मूत्र मार्ग संक्रमणको कारण, लक्षणहरू र उपचार विकल्पहरू बारे व्याख्या गर्नुहुन्छ, जसले प्रत्येक वर्ष लाखौं मानिसहरूलाई प्रभावित गर्दछ।",
    embedUrl: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fwatch%2F%3Fv%3D447332830783629&show_text=false&width=560&t=0",
    thumbnailUrl: "https://images.unsplash.com/photo-1584362917165-526a968579e8",
    dateEn: "April 15, 2023",
    dateNp: "बैशाख २, २०८०",
    categoryEn: "Infections",
    categoryNp: "संक्रमणहरू"
  },
  {
    id: "3",
    titleEn: "Prostate Health and BPH Management",
    titleNp: "प्रोस्टेट स्वास्थ्य र BPH व्यवस्थापन",
    descriptionEn: "In this comprehensive video, Dr. Shrestha discusses benign prostatic hyperplasia (BPH), its symptoms, and the latest treatment approaches including medication and surgical options.",
    descriptionNp: "यस व्यापक भिडियोमा, डा. श्रेष्ठले सौम्य प्रोस्टेटिक हाइपरप्लासिया (BPH), यसका लक्षणहरू, र औषधि र शल्यक्रिया विकल्पहरू सहित नवीनतम उपचार दृष्टिकोणहरू बारे छलफल गर्नुहुन्छ।",
    embedUrl: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fwatch%2F%3Fv%3D844997396773087&show_text=false&width=560&t=0",
    thumbnailUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
    dateEn: "May 20, 2023",
    dateNp: "जेठ ६, २०८०",
    categoryEn: "Prostate Health",
    categoryNp: "प्रोस्टेट स्वास्थ्य"
  }
];
