
export interface BlogPost {
  id: string;
  slug: string;
  titleEn: string;
  titleNp: string;
  imageUrl: string;
  summaryEn: string;
  summaryNp: string;
  contentEn: string;
  contentNp: string;
  dateEn: string;
  dateNp: string;
  categoryEn: string;
  categoryNp: string;
  authorName: string;
  authorImage: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "kidney-stones-prevention",
    titleEn: "How to Prevent Kidney Stones Effectively",
    titleNp: "मिर्गौलामा पत्थरी प्रभावकारी रूपमा कसरी रोक्ने",
    imageUrl: "https://images.unsplash.com/photo-1589758438368-0ad531db3366",
    summaryEn: "Learn practical strategies to prevent kidney stones and avoid the painful symptoms associated with this condition.",
    summaryNp: "मिर्गौलामा पत्थरी रोक्न व्यावहारिक रणनीतिहरू र यस अवस्थासँग सम्बन्धित दर्दनाक लक्षणहरू बाट बच्न सिक्नुहोस्।",
    contentEn: `
      <h2>Understanding Kidney Stones</h2>
      <p>Kidney stones are hard deposits made of minerals and salts that form inside your kidneys. They can affect any part of your urinary tract from your kidneys to your bladder. Passing kidney stones can be quite painful, but the stones usually cause no permanent damage if recognized in a timely fashion.</p>
      
      <p>Depending on your situation, you may need nothing more than to take pain medication and drink lots of water to pass a kidney stone. In other instances — for example, if stones become lodged in the urinary tract, are associated with a urinary infection or cause complications — surgery may be needed.</p>
      
      <h2>Effective Prevention Strategies</h2>
      <p>Prevention of kidney stones may include a combination of lifestyle changes and medications. Here are the most effective strategies:</p>
      
      <h3>1. Stay Hydrated</h3>
      <p>Drinking enough fluid, especially water, is the most important thing you can do to prevent kidney stones. Aim for at least 2-3 liters of water daily. Your urine should be light and clear.</p>
      
      <h3>2. Dietary Adjustments</h3>
      <p>Depending on the type of stones you form:</p>
      <ul>
        <li><strong>For calcium stones:</strong> Reduce sodium and animal protein intake. Don't cut calcium - instead, get it from foods rather than supplements.</li>
        <li><strong>For oxalate stones:</strong> Limit foods high in oxalates such as spinach, rhubarb, chocolate, and nuts.</li>
        <li><strong>For uric acid stones:</strong> Limit high-purine foods such as red meat, organ meats, and shellfish.</li>
      </ul>
      
      <h3>3. Maintain a Healthy Weight</h3>
      <p>Obesity can increase your risk for kidney stones. Maintaining a healthy weight through balanced diet and regular exercise helps reduce this risk.</p>
      
      <h3>4. Medications</h3>
      <p>In some cases, medications may be prescribed to help prevent kidney stones, such as:</p>
      <ul>
        <li>Thiazide diuretics (for calcium stones)</li>
        <li>Allopurinol (for uric acid stones)</li>
        <li>Potassium citrate (to increase urine pH)</li>
      </ul>
      
      <h2>When to See a Doctor</h2>
      <p>Make an appointment with Dr. Shrestha if you have any signs and symptoms that worry you. Seek immediate medical attention if you experience:</p>
      <ul>
        <li>Pain so severe that you can't sit still or find a comfortable position</li>
        <li>Pain accompanied by nausea and vomiting</li>
        <li>Pain accompanied by fever and chills</li>
        <li>Blood in your urine</li>
        <li>Difficulty passing urine</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>While kidney stones can be extremely painful, implementing these preventative measures can significantly reduce your risk. Remember that personalized advice from a urologist like Dr. Shrestha is essential, especially if you have a history of kidney stones.</p>
    `,
    contentNp: `
      <h2>मिर्गौलामा पत्थरी बारे बुझ्दै</h2>
      <p>मिर्गौलाका पत्थरीहरू खनिज र नुनहरू बनेका कडा जमावटहरू हुन् जुन तपाईंको मिर्गौला भित्र बन्दछन्। तिनीहरूले तपाईंको मिर्गौलादेखि मूत्राशयसम्म तपाईंको मूत्र मार्गको कुनै पनि भागलाई प्रभावित गर्न सक्छन्। मिर्गौलाका पत्थरीहरू पास गर्नु निकै पीडादायक हुन सक्छ, तर समयमै पहिचान गरिएमा पत्थरीहरूले सामान्यतया कुनै स्थायी क्षति पुर्याउँदैनन्।</p>
      
      <p>तपाईंको परिस्थिति अनुसार, मिर्गौलाको पत्थरी पास गर्न तपाईंलाई पीडा औषधि लिने र धेरै पानी पिउने बाहेक केही पनि आवश्यक पर्दैन। अन्य अवस्थाहरूमा - उदाहरणका लागि, यदि पत्थरहरू मूत्र मार्गमा अड्किन्छन्, मूत्र संक्रमणसँग सम्बन्धित छन् वा जटिलताहरू निम्त्याउँछन् - शल्यक्रिया आवश्यक पर्न सक्छ।</p>
      
      <h2>प्रभावकारी रोकथाम रणनीतिहरू</h2>
      <p>मिर्गौलामा पत्थरीको रोकथाममा जीवनशैली परिवर्तन र औषधिहरूको संयोजन समावेश हुन सक्छ। यहाँ सबैभन्दा प्रभावकारी रणनीतिहरू छन्:</p>
      
      <h3>१. हाइड्रेटेड रहनुहोस्</h3>
      <p>पर्याप्त तरल पदार्थ, विशेष गरी पानी पिउनु, तपाईंले मिर्गौलामा पत्थरी रोक्न गर्न सक्ने सबैभन्दा महत्त्वपूर्ण कुरा हो। दैनिक कम्तिमा २-३ लिटर पानी पिउने लक्ष्य राख्नुहोस्। तपाईंको पेशाब हल्का र स्पष्ट हुनुपर्छ।</p>
      
      <h3>२. आहार समायोजन</h3>
      <p>तपाईंले निर्माण गर्ने पत्थरीको प्रकारको आधारमा:</p>
      <ul>
        <li><strong>क्याल्सियम पत्थरीको लागि:</strong> सोडियम र पशु प्रोटीन सेवन कम गर्नुहोस्। क्याल्सियम नकाट्नुहोस् - बरु, यसलाई परिपूरक भन्दा खाद्य पदार्थहरूबाट प्राप्त गर्नुहोस्।</li>
        <li><strong>अक्जालेट पत्थरीको लागि:</strong> पालुंगो, रहुबार्ब, चकलेट, र नट्स जस्ता अक्जालेटमा उच्च खाद्य पदार्थहरू सीमित गर्नुहोस्।</li>
        <li><strong>युरिक एसिड पत्थरीको लागि:</strong> रातो मासु, अंग मासु, र समुद्री खाना जस्ता उच्च प्युरिन खाद्य पदार्थहरू सीमित गर्नुहोस्।</li>
      </ul>
      
      <h3>३. स्वस्थ वजन कायम राख्नुहोस्</h3>
      <p>मोटोपनाले तपाईंको मिर्गौलामा पत्थरीको जोखिम बढाउन सक्छ। सन्तुलित आहार र नियमित व्यायाम मार्फत स्वस्थ वजन कायम राख्नाले यो जोखिम कम गर्न मद्दत गर्छ।</p>
      
      <h3>४. औषधिहरू</h3>
      <p>केही मामलाहरूमा, मिर्गौलामा पत्थरी रोक्न मद्दत गर्न औषधिहरू निर्धारित गर्न सकिन्छ, जस्तै:</p>
      <ul>
        <li>थियाजाइड डियुरेटिक्स (क्याल्सियम पत्थरीको लागि)</li>
        <li>एलोपुरिनोल (युरिक एसिड पत्थरीको लागि)</li>
        <li>पोटासियम साइट्रेट (पेशाबको pH बढाउन)</li>
      </ul>
      
      <h2>डाक्टरलाई कहिले भेट्ने</h2>
      <p>यदि तपाईंसँग कुनै संकेत र लक्षणहरू छन् जसले तपाईंलाई चिन्तित बनाउँछ भने डा. श्रेष्ठसँग भेट्ने समय बनाउनुहोस्। यदि तपाईंले निम्न अनुभव गर्नुभयो भने तत्काल चिकित्सा ध्यान खोज्नुहोस्:</p>
      <ul>
        <li>यस्तो गम्भीर पीडा कि तपाईं बस्न सक्नुहुन्न वा आरामदायक स्थिति फेला पार्न सक्नुहुन्न</li>
        <li>वाकवाकी र बान्तासँग पीडा</li>
        <li>ज्वरो र जाडोसँग पीडा</li>
        <li>तपाईंको पेशाबमा रगत</li>
        <li>पेशाब गर्न कठिनाइ</li>
      </ul>
      
      <h2>निष्कर्ष</h2>
      <p>मिर्गौलामा पत्थरी अत्यन्तै पीडादायक हुन सक्छ, यी रोकथामका उपायहरू कार्यान्वयन गर्नाले तपाईंको जोखिम उल्लेखनीय रूपमा कम गर्न सक्छ। याद गर्नुहोस् कि डा. श्रेष्ठ जस्तै मूत्र रोग विशेषज्ञबाट व्यक्तिगत सल्लाह आवश्यक छ, विशेष गरी यदि तपाईंसँग मिर्गौलामा पत्थरीको इतिहास छ भने।</p>
    `,
    dateEn: "May 10, 2023",
    dateNp: "बैशाख २७, २०८०",
    categoryEn: "Kidney Health",
    categoryNp: "मिर्गौला स्वास्थ्य",
    authorName: "Dr. Parash Mani Shrestha",
    authorImage: "/lovable-uploads/051b28c5-e590-4744-8f66-d1f622b4884d.png"
  },
  {
    id: "2",
    slug: "understanding-turp-procedure",
    titleEn: "Understanding the TURP Procedure for BPH",
    titleNp: "BPH को लागि TURP प्रक्रिया बुझ्दै",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
    summaryEn: "A comprehensive guide to Transurethral Resection of the Prostate (TURP) procedure for treating Benign Prostatic Hyperplasia.",
    summaryNp: "सौम्य प्रोस्टेटिक हाइपरप्लासिया उपचारको लागि प्रोस्टेटको ट्रान्सयूरेथ्रल रिसेक्सन (TURP) प्रक्रियाको विस्तृत मार्गदर्शन।",
    contentEn: `
      <h2>What is TURP?</h2>
      <p>Transurethral Resection of the Prostate (TURP) is a surgical procedure performed to treat Benign Prostatic Hyperplasia (BPH), a non-cancerous enlargement of the prostate gland that commonly affects older men. TURP is considered the gold standard surgical treatment for BPH when medication and other less invasive treatments have failed.</p>
      
      <h2>When is TURP Recommended?</h2>
      <p>Dr. Shrestha may recommend TURP if you experience:</p>
      <ul>
        <li>Moderate to severe urinary symptoms that haven't responded to medication</li>
        <li>Urinary retention (inability to empty your bladder)</li>
        <li>Recurrent urinary tract infections due to BPH</li>
        <li>Bladder stones due to BPH</li>
        <li>Kidney damage due to BPH</li>
        <li>Frequent blood in urine due to enlarged prostate</li>
      </ul>
      
      <h2>The TURP Procedure</h2>
      <h3>Before the Procedure</h3>
      <p>Dr. Shrestha will conduct a thorough evaluation including:</p>
      <ul>
        <li>Medical history review</li>
        <li>Physical examination including Digital Rectal Examination (DRE)</li>
        <li>Urine flow studies and residual volume assessment</li>
        <li>Blood tests including Prostate Specific Antigen (PSA)</li>
        <li>Pre-operative counseling about the procedure, risks, and expected outcomes</li>
      </ul>
      
      <h3>During the Procedure</h3>
      <p>TURP is typically performed under spinal or general anesthesia and takes about 60-90 minutes:</p>
      <ol>
        <li>A resectoscope (thin tube with light, camera, and cutting tools) is inserted through the urethra</li>
        <li>No external incisions are needed as the entire procedure is performed through the urethra</li>
        <li>The inner portion of the prostate is removed piece by piece</li>
        <li>A catheter is inserted to allow urine drainage during healing</li>
        <li>The removed tissue is sent for pathological examination</li>
      </ol>
      
      <h3>After the Procedure</h3>
      <p>Recovery typically involves:</p>
      <ul>
        <li>Hospital stay of 1-3 days</li>
        <li>Catheter in place for 1-3 days</li>
        <li>Mild discomfort or urinary urgency for a few weeks</li>
        <li>Blood in urine that gradually clears</li>
        <li>Gradual improvement in urinary symptoms over several weeks</li>
        <li>Full recovery within 4-6 weeks</li>
      </ul>
      
      <h2>Benefits and Outcomes</h2>
      <p>TURP offers several advantages:</p>
      <ul>
        <li>Long-term relief of urinary symptoms in 75-90% of patients</li>
        <li>Significant improvement in urine flow rate</li>
        <li>Reduction in post-void residual urine</li>
        <li>Better quality of life</li>
        <li>Durable results with symptom relief lasting 10-15 years or more</li>
      </ul>
      
      <h2>Potential Risks</h2>
      <p>As with any surgery, TURP carries some risks:</p>
      <ul>
        <li>Bleeding requiring transfusion (rare)</li>
        <li>Urinary tract infection</li>
        <li>Temporary urinary incontinence</li>
        <li>Retrograde ejaculation (common but not harmful)</li>
        <li>Erectile dysfunction (uncommon)</li>
        <li>TUR syndrome (rare water intoxication from irrigation fluid)</li>
        <li>Need for repeat procedure (in about 10% of patients within 10 years)</li>
      </ul>
      
      <h2>Newer Alternatives to Traditional TURP</h2>
      <p>Dr. Shrestha is experienced in several modern TURP variations:</p>
      <ul>
        <li><strong>Bipolar TURP:</strong> Uses saline solution instead of glycine, reducing risk of TUR syndrome</li>
        <li><strong>Button TURP:</strong> Uses a button-shaped electrode for vaporization, potentially reducing bleeding</li>
        <li><strong>Laser TURP (HoLEP):</strong> Uses holmium laser to remove prostate tissue, with less bleeding and shorter catheterization</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>TURP remains the gold standard surgical treatment for BPH with excellent long-term outcomes. Dr. Parash Mani Shrestha has extensive experience with this procedure and its modern variations, ensuring optimal results for his patients. If you're experiencing significant urinary symptoms due to BPH, schedule a consultation to discuss whether TURP might be right for you.</p>
    `,
    contentNp: `
      <h2>TURP के हो?</h2>
      <p>प्रोस्टेटको ट्रान्सयूरेथ्रल रिसेक्सन (TURP) सौम्य प्रोस्टेटिक हाइपरप्लासिया (BPH) उपचार गर्न गरिने शल्यक्रिया हो, जुन प्रोस्टेट ग्रन्थिको गैर-क्यान्सरयुक्त वृद्धि हो जसले सामान्यतया वृद्ध पुरुषहरूलाई प्रभावित गर्दछ। TURP लाई BPH को लागि स्वर्ण मानक शल्यक्रिया उपचार मानिन्छ जब औषधि र अन्य कम आक्रामक उपचारहरू असफल भएका छन्।</p>
      
      <h2>TURP कहिले सिफारिस गरिन्छ?</h2>
      <p>यदि तपाईंले निम्न अनुभव गर्नुभयो भने डा. श्रेष्ठले TURP सिफारिस गर्न सक्नुहुन्छ:</p>
      <ul>
        <li>मध्यम देखि गम्भीर मूत्र लक्षणहरू जुन औषधिको प्रतिक्रिया दिएका छैनन्</li>
        <li>मूत्र प्रतिधारण (तपाईंको मूत्राशय खाली गर्न असक्षमता)</li>
        <li>BPH को कारण पुनरावृत्ति मूत्र मार्ग संक्रमण</li>
        <li>BPH को कारण मूत्राशय पत्थरीहरू</li>
        <li>BPH को कारण मिर्गौला क्षति</li>
        <li>बढेको प्रोस्टेटको कारण पेशाबमा बारम्बार रगत</li>
      </ul>
      
      <h2>TURP प्रक्रिया</h2>
      <h3>प्रक्रिया अघि</h3>
      <p>डा. श्रेष्ठले निम्न समावेश गरी विस्तृत मूल्यांकन गर्नुहुनेछ:</p>
      <ul>
        <li>चिकित्सा इतिहास समीक्षा</li>
        <li>डिजिटल रेक्टल एग्जामिनेशन (DRE) सहित शारीरिक परीक्षा</li>
        <li>मूत्र प्रवाह अध्ययनहरू र अवशेष मात्रा मूल्यांकन</li>
        <li>प्रोस्टेट विशिष्ट एन्टिजेन (PSA) सहित रगत परीक्षणहरू</li>
        <li>प्रक्रिया, जोखिमहरू, र अपेक्षित परिणामहरू बारे प्रि-अपरेटिभ परामर्श</li>
      </ul>
      
      <h3>प्रक्रिया दौरान</h3>
      <p>TURP सामान्यतया स्पाइनल वा सामान्य एनेस्थेसिया अन्तर्गत गरिन्छ र लगभग ६०-९० मिनेट लाग्छ:</p>
      <ol>
        <li>एक रिसेक्टोस्कोप (प्रकाश, क्यामेरा र काट्ने उपकरणहरू सहित पातलो ट्युब) मूत्रमार्ग मार्फत प्रवेश गराइन्छ</li>
        <li>बाहिरी कटौतीहरू आवश्यक छैनन् किनभने सम्पूर्ण प्रक्रिया मूत्रमार्ग मार्फत गरिन्छ</li>
        <li>प्रोस्टेटको भित्री भाग टुक्रा टुक्रा गरेर हटाइन्छ</li>
        <li>निको हुने बेलामा मूत्र निकासको लागि क्याथेटर प्रवेश गराइन्छ</li>
        <li>हटाइएको तन्तु रोगशास्त्रीय परीक्षणको लागि पठाइन्छ</li>
      </ol>
      
      <h3>प्रक्रिया पछि</h3>
      <p>पुनर्प्राप्तिमा सामान्यतया समावेश छ:</p>
      <ul>
        <li>१-३ दिनको अस्पताल बसाइ</li>
        <li>१-३ दिनको लागि क्याथेटर</li>
        <li>केही हप्ताको लागि हल्का असहजता वा मूत्र तात्कालिकता</li>
        <li>पेशाबमा रगत जुन क्रमशः साफ हुन्छ</li>
        <li>केही हप्ताको अवधिमा मूत्र लक्षणहरूमा क्रमिक सुधार</li>
        <li>४-६ हप्ताभित्र पूर्ण पुनर्प्राप्ति</li>
      </ul>
      
      <h2>फाइदाहरू र परिणामहरू</h2>
      <p>TURPले केही फाइदाहरू प्रदान गर्दछ:</p>
      <ul>
        <li>७५-९०% बिरामीहरूमा मूत्र लक्षणहरूको दीर्घकालीन राहत</li>
        <li>मूत्र प्रवाह दरमा उल्लेखनीय सुधार</li>
        <li>पोस्ट-भोइड अवशेष पेशाबमा कमी</li>
        <li>राम्रो जीवनको गुणस्तर</li>
        <li>टिकाउ परिणामहरू, लक्षण राहत १०-१५ वर्ष वा बढी समयसम्म रहने</li>
      </ul>
      
      <h2>सम्भावित जोखिमहरू</h2>
      <p>कुनै पनि शल्यक्रिया जस्तै, TURPमा केही जोखिमहरू छन्:</p>
      <ul>
        <li>ट्रान्सफ्युजन आवश्यक पर्ने रक्तस्राव (दुर्लभ)</li>
        <li>मूत्र मार्ग संक्रमण</li>
        <li>अस्थायी मूत्र असंयम</li>
        <li>रेट्रोग्रेड इजाकुलेशन (सामान्य तर हानिकारक छैन)</li>
        <li>इरेक्टाइल डिसफंक्शन (असामान्य)</li>
        <li>TUR सिन्ड्रोम (सिंचाइ तरल पदार्थबाट दुर्लभ पानी विषाक्तता)</li>
        <li>दोहोरो प्रक्रियाको आवश्यकता (१० वर्षभित्र लगभग १०% बिरामीहरूमा)</li>
      </ul>
      
      <h2>परम्परागत TURP का नयाँ विकल्पहरू</h2>
      <p>डा. श्रेष्ठ केही आधुनिक TURP भिन्नताहरूमा अनुभवी छन्:</p>
      <ul>
        <li><strong>बाइपोलर TURP:</strong> ग्लाइसिनको सट्टा सलाइन समाधान प्रयोग गर्दछ, TUR सिन्ड्रोमको जोखिम कम गर्दछ</li>
        <li><strong>बटन TURP:</strong> वाष्पीकरणको लागि बटन-आकारको इलेक्ट्रोड प्रयोग गर्दछ, सम्भावित रूपमा रक्तस्राव कम गर्दछ</li>
        <li><strong>लेजर TURP (HoLEP):</strong> प्रोस्टेट तन्तु हटाउन होल्मियम लेजर प्रयोग गर्दछ, कम रक्तस्राव र छोटो क्याथेटराइजेशन सहित</li>
      </ul>
      
      <h2>निष्कर्ष</h2>
      <p>TURP उत्कृष्ट दीर्घकालीन परिणामहरू सहित BPH को लागि स्वर्ण मानक शल्यक्रिया उपचार रहन्छ। डा. पारस मणि श्रेष्ठसँग यस प्रक्रिया र यसका आधुनिक भिन्नताहरूमा व्यापक अनुभव छ, जसले आफ्ना बिरामीहरूको लागि इष्टतम परिणामहरू सुनिश्चित गर्दछ। यदि तपाईं BPH को कारण उल्लेखनीय मूत्र लक्षणहरू अनुभव गर्दै हुनुहुन्छ भने, TURP तपाईंको लागि सही हुन सक्छ कि भनेर छलफल गर्न परामर्श तालिका बनाउनुहोस्।</p>
    `,
    dateEn: "April 25, 2023",
    dateNp: "बैशाख १२, २०८०",
    categoryEn: "Surgical Procedures",
    categoryNp: "शल्यक्रिया प्रक्रियाहरू",
    authorName: "Dr. Parash Mani Shrestha",
    authorImage: "/lovable-uploads/051b28c5-e590-4744-8f66-d1f622b4884d.png"
  },
  {
    id: "3",
    slug: "kidney-transplant-what-to-expect",
    titleEn: "Kidney Transplant: What to Expect Before, During, and After",
    titleNp: "मिर्गौला प्रत्यारोपण: अघि, दौरान, र पछि के अपेक्षा गर्ने",
    imageUrl: "https://images.unsplash.com/photo-1579154204601-01588f351e67",
    summaryEn: "A comprehensive overview of the kidney transplant process to help patients and families prepare for this life-changing procedure.",
    summaryNp: "बिरामीहरू र परिवारहरूलाई यस जीवन परिवर्तन प्रक्रियाको लागि तयार गर्न मद्दत गर्न मिर्गौला प्रत्यारोपण प्रक्रियाको विस्तृत अवलोकन।",
    contentEn: `
      <h2>Introduction to Kidney Transplantation</h2>
      <p>Kidney transplantation is the most effective treatment for end-stage renal disease, offering better quality of life and longer survival compared to dialysis. It involves surgically placing a healthy kidney from a donor into a patient whose kidneys no longer function properly.</p>
      
      <p>As one of Nepal's leading transplant surgeons, Dr. Parash Mani Shrestha has performed numerous successful kidney transplants and leads a multidisciplinary team dedicated to providing the best possible care throughout the transplant journey.</p>
      
      <h2>Before the Transplant: Preparation and Evaluation</h2>
      
      <h3>Transplant Evaluation</h3>
      <p>The evaluation process is thorough and typically includes:</p>
      <ul>
        <li>Complete medical history and physical examination</li>
        <li>Comprehensive blood and tissue typing</li>
        <li>Tests of heart, lung, and other organ systems</li>
        <li>Psychological evaluation</li>
        <li>Social worker assessment</li>
        <li>Dental examination</li>
        <li>Cancer screenings appropriate for your age</li>
      </ul>
      
      <h3>Finding a Donor</h3>
      <p>Kidneys for transplantation come from two sources:</p>
      <ul>
        <li><strong>Living donors:</strong> Usually family members or close friends who voluntarily donate one of their kidneys. Living donation often results in better outcomes and shorter waiting times.</li>
        <li><strong>Deceased donors:</strong> People who have chosen to donate their organs after death.</li>
      </ul>
      
      <h3>Pre-transplant Preparations</h3>
      <p>Once a suitable kidney is identified, preparations include:</p>
      <ul>
        <li>Final compatibility testing</li>
        <li>Medication adjustments</li>
        <li>Dialysis (if needed)</li>
        <li>Pre-surgery instructions regarding food, medication, and activities</li>
      </ul>
      
      <h2>During the Transplant: The Surgical Procedure</h2>
      
      <h3>The Surgery</h3>
      <p>Kidney transplant surgery typically takes 3-4 hours:</p>
      <ol>
        <li>General anesthesia is administered</li>
        <li>An incision is made in the lower abdomen</li>
        <li>The donor kidney is placed in the lower abdomen, outside the peritoneal cavity</li>
        <li>The donor kidney's blood vessels are connected to your blood vessels</li>
        <li>The donor ureter is connected to your bladder</li>
        <li>The incision is closed</li>
      </ol>
      <p>Importantly, your own kidneys are usually left in place unless they're causing complications.</p>
      
      <h3>Immediate Post-Operative Care</h3>
      <p>After surgery, you'll be taken to the recovery room and then to a specialized transplant unit where:</p>
      <ul>
        <li>Vital signs will be monitored continuously</li>
        <li>Pain management will be provided</li>
        <li>Intravenous fluids and medications will be administered</li>
        <li>Urine output will be closely tracked</li>
        <li>Blood tests will be performed frequently to monitor kidney function</li>
      </ul>
      
      <h2>After the Transplant: Recovery and Long-term Care</h2>
      
      <h3>Hospital Stay and Early Recovery</h3>
      <p>Expect to stay in the hospital for 7-10 days after transplantation. During this time:</p>
      <ul>
        <li>You'll learn how to take your new medications</li>
        <li>The transplant team will monitor your new kidney's function</li>
        <li>You'll begin physical activity and gradually increase it</li>
        <li>You'll receive education about signs of rejection and infection</li>
      </ul>
      
      <h3>Immunosuppression</h3>
      <p>After transplant, you'll need to take immunosuppressive medications for life to prevent rejection of the new kidney. These typically include:</p>
      <ul>
        <li>Tacrolimus or cyclosporine</li>
        <li>Mycophenolate mofetil</li>
        <li>Corticosteroids (often tapered over time)</li>
      </ul>
      <p>These medications require careful monitoring and dose adjustments.</p>
      
      <h3>Follow-up Care</h3>
      <p>Ongoing monitoring is essential:</p>
      <ul>
        <li>Frequent clinic visits initially (2-3 times per week), gradually decreasing over time</li>
        <li>Regular blood tests to monitor kidney function and medication levels</li>
        <li>Biopsy if rejection is suspected</li>
        <li>Annual screenings for complications and cancer</li>
      </ul>
      
      <h3>Potential Complications</h3>
      <p>While kidney transplantation is highly successful, potential complications include:</p>
      <ul>
        <li>Rejection (acute or chronic)</li>
        <li>Infection</li>
        <li>Medication side effects</li>
        <li>Increased risk of certain cancers</li>
        <li>Cardiovascular disease</li>
        <li>Diabetes</li>
      </ul>
      <p>Regular follow-up helps detect and address these issues early.</p>
      
      <h2>Living with a Transplanted Kidney</h2>
      
      <h3>Lifestyle Adjustments</h3>
      <p>To maintain your kidney health long-term:</p>
      <ul>
        <li>Take all medications exactly as prescribed</li>
        <li>Follow a healthy diet low in salt and sugar</li>
        <li>Exercise regularly as recommended by your doctor</li>
        <li>Stay well-hydrated</li>
        <li>Avoid smoking and limit alcohol</li>
        <li>Attend all follow-up appointments</li>
        <li>Practice good hygiene and avoid people with contagious illnesses</li>
      </ul>
      
      <h3>Emotional and Social Aspects</h3>
      <p>Transplantation can bring emotional challenges:</p>
      <ul>
        <li>Anxiety about rejection</li>
        <li>Guilt, especially with living donors</li>
        <li>Body image concerns</li>
        <li>Adjustment to new daily medication routines</li>
      </ul>
      <p>Support groups and counseling can be valuable resources during this adjustment period.</p>
      
      <h2>Conclusion</h2>
      <p>Kidney transplantation is a life-changing procedure that offers the best long-term treatment for end-stage renal disease. Under Dr. Shrestha's expert care, patients receive comprehensive support throughout their transplant journey. While the process requires significant commitment to self-care and medical follow-up, most recipients experience dramatic improvements in their quality of life and overall health.</p>
      
      <p>For more information about kidney transplantation or to schedule a consultation with Dr. Parash Mani Shrestha, please contact our office.</p>
    `,
    contentNp: `
      <h2>मिर्गौला प्रत्यारोपणको परिचय</h2>
      <p>मिर्गौला प्रत्यारोपण अन्तिम चरणको मिर्गौला रोगको लागि सबैभन्दा प्रभावकारी उपचार हो, जसले डायलिसिसको तुलनामा राम्रो जीवनको गुणस्तर र लामो जीवन प्रदान गर्दछ। यसमा शल्यक्रिया मार्फत दाताबाट स्वस्थ मिर्गौला एक बिरामीमा राख्ने समावेश छ जसको मिर्गौलाले अब राम्रोसँग काम गर्दैनन्।</p>
      
      <p>नेपालका अग्रणी प्रत्यारोपण शल्यचिकित्सकहरू मध्ये एक, डा. पारस मणि श्रेष्ठले धेरै सफल मिर्गौला प्रत्यारोपणहरू गर्नुभएको छ र प्रत्यारोपण यात्रा भरि सम्भव उत्तम हेरचाह प्रदान गर्न समर्पित बहु-विषयक टोलीको नेतृत्व गर्नुहुन्छ।</p>
      
      <h2>प्रत्यारोपण अघि: तयारी र मूल्यांकन</h2>
      
      <h3>प्रत्यारोपण मूल्यांकन</h3>
      <p>मूल्यांकन प्रक्रिया विस्तृत छ र सामान्यतया निम्न समावेश गर्दछ:</p>
      <ul>
        <li>पूर्ण चिकित्सा इतिहास र शारीरिक परीक्षा</li>
        <li>व्यापक रगत र तन्तु टाइपिङ</li>
        <li>मुटु, फोक्सो, र अन्य अंग प्रणालीहरूको परीक्षणहरू</li>
        <li>मनोवैज्ञानिक मूल्यांकन</li>
        <li>सामाजिक कार्यकर्ता मूल्यांकन</li>
        <li>दन्त परीक्षा</li>
        <li>तपाईंको उमेर अनुसार उपयुक्त क्यान्सर स्क्रिनिंग</li>
      </ul>
      
      <h3>दाता खोज्दै</h3>
      <p>प्रत्यारोपणको लागि मिर्गौलाहरू दुई स्रोतहरूबाट आउँछन्:</p>
      <ul>
        <li><strong>जीवित दाताहरू:</strong> सामान्यतया परिवारका सदस्यहरू वा नजिकका साथीहरू जसले स्वेच्छाले आफ्नो एक मिर्गौला दान गर्छन्। जीवित दानले प्रायः राम्रो परिणामहरू र छोटो प्रतीक्षा समय दिन्छ।</li>
        <li><strong>मृत दाताहरू:</strong> मृत्युपछि आफ्ना अंगहरू दान गर्न छनौट गरेका व्यक्तिहरू।</li>
      </ul>
      
      <h3>प्रि-ट्रान्सप्लान्ट तयारीहरू</h3>
      <p>एकपटक उपयुक्त मिर्गौला पहिचान भएपछि, तयारीहरूमा समावेश छन्:</p>
      <ul>
        <li>अन्तिम सम्गतता परीक्षण</li>
        <li>औषधि समायोजनहरू</li>
        <li>डायलिसिस (यदि आवश्यक छ भने)</li>
        <li>खाना, औषधि, र गतिविधिहरू सम्बन्धी प्रि-सर्जरी निर्देशनहरू</li>
      </ul>
      
      <h2>प्रत्यारोपण दौरान: शल्यक्रिया प्रक्रिया</h2>
      
      <h3>शल्यक्रिया</h3>
      <p>मिर्गौला प्रत्यारोपण शल्यक्रिया सामान्यतया ३-४ घण्टा लाग्छ:</p>
      <ol>
        <li>सामान्य एनेस्थेसिया दिइन्छ</li>
        <li>तल्लो पेटमा चिरा बनाइन्छ</li>
        <li>दाताको मिर्गौला तल्लो पेटमा, पेरिटोनियल कोटर बाहिर राखिन्छ</li>
        <li>दाताको मिर्गौलाका रक्त नलिकाहरू तपाईंका रक्त नलिकाहरूमा जोडिन्छन्</li>
        <li>दाताको युरेटर तपाईंको मूत्राशयमा जोडिन्छ</li>
        <li>चिरा बन्द गरिन्छ</li>
      </ol>
      <p>महत्त्वपूर्ण रूपमा, तपाईंको आफ्नै मिर्गौलाहरू सामान्यतया ठाउँमै छोडिन्छन् जबसम्म तिनीहरूले जटिलताहरू निम्त्याउँदैनन्।</p>
      
      <h3>तत्काल पोस्ट-अपरेटिभ हेरचाह</h3>
      <p>शल्यक्रिया पछि, तपाईंलाई रिकभरी कोठामा र त्यसपछि विशेष प्रत्यारोपण युनिटमा लगिनेछ जहाँ:</p>
      <ul>
        <li>महत्त्वपूर्ण संकेतहरू निरन्तर निगरानी गरिनेछ</li>
        <li>पीडा व्यवस्थापन प्रदान गरिनेछ</li>
        <li>इन्ट्राभेनस तरल पदार्थहरू र औषधिहरू प्रशासन गरिनेछ</li>
        <li>पेशाब उत्पादनको नजिकबाट निगरानी गरिनेछ</li>
        <li>मिर्गौला कार्य निगरानी गर्न बारम्बार रगत परीक्षणहरू गरिनेछ</li>
      </ul>
      
      <h2>प्रत्यारोपण पछि: पुनर्प्राप्ति र दीर्घकालीन हेरचाह</h2>
      
      <h3>अस्पताल बसाइ र प्रारम्भिक पुनर्प्राप्ति</h3>
      <p>प्रत्यारोपण पछि अस्पतालमा ७-१० दिन बस्ने अपेक्षा गर्नुहोस्। यस समयमा:</p>
      <ul>
        <li>तपाईंले आफ्ना नयाँ औषधिहरू कसरी लिने भनेर सिक्नुहुनेछ</li>
        <li>प्रत्यारोपण टीमले तपाईंको नयाँ मिर्गौलाको कार्य निगरानी गर्नेछ</li>
        <li>तपाईंले शारीरिक गतिविधि सुरु गर्नुहुनेछ र क्रमशः यसलाई बढाउनुहुनेछ</li>
        <li>तपाईंले अस्वीकृति र संक्रमणका संकेतहरू बारे शिक्षा प्राप्त गर्नुहुनेछ</li>
      </ul>
      
      <h3>इम्युनोसप्रेसन</h3>
      <p>प्रत्यारोपण पछि, तपाईंलाई नयाँ मिर्गौलाको अस्वीकृति रोक्न जीवनभरको लागि इम्युनोसप्रेसिभ औषधिहरू लिन आवश्यक पर्नेछ। यी सामान्यतया समावेश गर्दछन्:</p>
      <ul>
        <li>ट्याक्रोलिमस वा साइक्लोस्पोरिन</li>
        <li>माइकोफेनोलेट मोफेटिल</li>
        <li>कोर्टिकोस्टेरोइडहरू (प्राय: समयसँगै टेपर गरिएको)</li>
      </ul>
      <p>यी औषधिहरूले सावधानीपूर्वक निगरानी र मात्रा समायोजनहरू आवश्यक पर्दछन्।</p>
      
      <h3>फलो-अप हेरचाह</h3>
      <p>निरन्तर निगरानी आवश्यक छ:</p>
      <ul>
        <li>प्रारम्भमा बारम्बार क्लिनिक भ्रमणहरू (हप्तामा २-३ पटक), समयसँगै क्रमशः घट्दै</li>
        <li>मिर्गौला कार्य र औषधि स्तरहरू निगरानी गर्न नियमित रगत परीक्षणहरू</li>
        <li>यदि अस्वीकृतिको आशंका छ भने बायोप्सी</li>
        <li>जटिलताहरू र क्यान्सरको लागि वार्षिक स्क्रिनिंग</li>
      </ul>
      
      <h3>सम्भावित जटिलताहरू</h3>
      <p>मिर्गौला प्रत्यारोपण अत्यधिक सफल भएतापनि, सम्भावित जटिलताहरूमा समावेश छन्:</p>
      <ul>
        <li>अस्वीकृति (तीव्र वा क्रोनिक)</li>
        <li>संक्रमण</li>
        <li>औषधि साइड इफेक्टहरू</li>
        <li>केही क्यान्सरहरूको बढ्दो जोखिम</li>
        <li>हृदय रोग</li>
        <li>मधुमेह</li>
      </ul>
      <p>नियमित फलो-अप यी समस्याहरू चाँडै पत्ता लगाउन र सम्बोधन गर्न मद्दत गर्दछ।</p>
      
      <h2>प्रत्यारोपित मिर्गौलासँग जीवनयापन</h2>
      
      <h3>जीवनशैली समायोजनहरू</h3>
      <p>तपाईंको मिर्गौला स्वास्थ्य लामो समयसम्म कायम राख्न:</p>
      <ul>
        <li>सबै औषधिहरू ठीक निर्धारित गरिएअनुसार लिनुहोस्</li>
        <li>नुन र चिनीमा कम स्वस्थ आहार अनुसरण गर्नुहोस्</li>
        <li>तपाईंको डाक्टरद्वारा सिफारिस गरिएअनुसार नियमित व्यायाम गर्नुहोस्</li>
        <li>राम्रोसँग हाइड्रेटेड रहनुहोस्</li>
        <li>धूम्रपान बाट बच्नुहोस् र मदिरा सीमित गर्नुहोस्</li>
        <li>सबै फलो-अप अपोइन्टमेन्टहरूमा उपस्थित हुनुहोस्</li>
        <li>राम्रो सरसफाई अभ्यास गर्नुहोस् र संक्रामक बिमारी भएका मानिसहरूबाट टाढा रहनुहोस्</li>
      </ul>
      
      <h3>भावनात्मक र सामाजिक पक्षहरू</h3>
      <p>प्रत्यारोपणले भावनात्मक चुनौतीहरू ल्याउन सक्छ:</p>
      <ul>
        <li>अस्वीकृति बारे चिन्ता</li>
        <li>अपराधबोध, विशेष गरी जीवित दाताहरूसँग</li>
        <li>शरीरको छवि सम्बन्धी चिन्ताहरू</li>
        <li>नयाँ दैनिक औषधि दिनचर्यामा समायोजन</li>
      </ul>
      <p>सहायता समूहहरू र परामर्श यस समायोजन अवधिमा मूल्यवान स्रोतहरू हुन सक्छन्।</p>
      
      <h2>निष्कर्ष</h2>
      <p>मिर्गौला प्रत्यारोपण एक जीवन परिवर्तन प्रक्रिया हो जसले अन्तिम चरणको मिर्गौला रोगको लागि उत्तम दीर्घकालीन उपचार प्रदान गर्दछ। डा. श्रेष्ठको विशेषज्ञ हेरचाह अन्तर्गत, बिरामीहरूले आफ्नो प्रत्यारोपण यात्रा भरि व्यापक सहयोग प्राप्त गर्दछन्। प्रक्रियाले स्व-हेरचाह र चिकित्सा फलो-अपमा महत्त्वपूर्ण प्रतिबद्धता आवश्यक पर्दछ भए पनि, धेरैजसो प्राप्तकर्ताहरूले उनीहरूको जीवनको गुणस्तर र समग्र स्वास्थ्यमा नाटकीय सुधार अनुभव गर्दछन्।</p>
      
      <p>मिर्गौला प्रत्यारोपण बारे थप जानकारीको लागि वा डा. पारस मणि श्रेष्ठसँग परामर्श तालिका बनाउन, कृपया हाम्रो कार्यालयमा सम्पर्क गर्नुहोस्।</p>
    `,
    dateEn: "March 15, 2023",
    dateNp: "चैत्र १, २०७९",
    categoryEn: "Transplantation",
    categoryNp: "प्रत्यारोपण",
    authorName: "Dr. Parash Mani Shrestha",
    authorImage: "/lovable-uploads/051b28c5-e590-4744-8f66-d1f622b4884d.png"
  }
];
