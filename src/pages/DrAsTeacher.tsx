
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Users, Award, BookOpen, Stethoscope, Target, CheckCircle, Heart, Activity, Microscope } from 'lucide-react';

const DrAsTeacher = () => {
  const { t } = useLanguage();

  const teachingStats = [
    {
      icon: <GraduationCap className="h-8 w-8 text-doctor-blue" />,
      title: t('teacher.stats.years') || "12+ Years",
      subtitle: t('teacher.stats.teaching') || "Teaching MCh Urology",
      description: t('teacher.stats.training') || "Dedicated to training the next generation of urologists"
    },
    {
      icon: <Users className="h-8 w-8 text-doctor-blue" />,
      title: t('teacher.stats.doctors') || "50+ Doctors",
      subtitle: t('teacher.stats.certified') || "Trained & Certified",
      description: t('teacher.stats.mentored') || "Successfully mentored numerous urologists in Nepal"
    },
    {
      icon: <Award className="h-8 w-8 text-doctor-blue" />,
      title: t('teacher.stats.examiner') || "Expert Examiner",
      subtitle: t('teacher.stats.certification') || "MCh Urology Certification",
      description: t('teacher.stats.standards') || "Ensuring high standards in urological education"
    }
  ];

  const teachingAreas = [
    {
      title: t('teacher.areas.laparoscopic') || "Advanced Laparoscopic Urology",
      topics: [
        t('teacher.topics.nephrectomy') || "Laparoscopic Nephrectomy", 
        t('teacher.topics.pyeloplasty') || "Pyeloplasty", 
        t('teacher.topics.adrenalectomy') || "Adrenalectomy", 
        t('teacher.topics.retroperitoneal') || "Retroperitoneal Mass Excision"
      ],
      level: t('teacher.level.advanced') || "Advanced"
    },
    {
      title: t('teacher.areas.endourology') || "Endourology Procedures",
      topics: [
        t('teacher.topics.pcnl') || "PCNL (Percutaneous Nephrolithotomy)", 
        t('teacher.topics.urs') || "URS (Ureteroscopy)", 
        t('teacher.topics.cystoscopy') || "Cystoscopy", 
        t('teacher.topics.turp') || "TURP/TURBT"
      ],
      level: t('teacher.level.intermediate') || "Intermediate to Advanced"
    },
    {
      title: t('teacher.areas.open') || "Open Urological Surgery",
      topics: [
        t('teacher.topics.radical.nephrectomy') || "Radical Nephrectomy", 
        t('teacher.topics.radical.prostatectomy') || "Radical Prostatectomy", 
        t('teacher.topics.cystectomy') || "Cystectomy", 
        t('teacher.topics.reconstructive') || "Reconstructive Urology"
      ],
      level: t('teacher.level.advanced') || "Advanced"
    },
    {
      title: t('teacher.areas.pediatric') || "Pediatric Urology",
      topics: [
        t('teacher.topics.hypospadias') || "Hypospadias Repair", 
        t('teacher.topics.orchidopexy') || "Orchidopexy", 
        t('teacher.topics.pediatric.pyeloplasty') || "Pyeloplasty in Children", 
        t('teacher.topics.vur') || "VUR Management"
      ],
      level: t('teacher.level.specialized') || "Specialized"
    }
  ];

  const transplantStats = [
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: t('transplant.stats.surgeries') || "200+ Surgeries",
      subtitle: t('transplant.stats.performed') || "Successfully Performed",
      description: t('transplant.stats.success') || "High success rate in kidney transplant procedures"
    },
    {
      icon: <Activity className="h-8 w-8 text-green-500" />,
      title: t('transplant.stats.rate') || "95% Success Rate",
      subtitle: t('transplant.stats.patient') || "Patient Survival",
      description: t('transplant.stats.outcomes') || "Excellent long-term patient outcomes"
    },
    {
      icon: <Microscope className="h-8 w-8 text-blue-500" />,
      title: t('transplant.stats.training') || "Advanced Training",
      subtitle: t('transplant.stats.programme') || "Transplant Programme",
      description: t('transplant.stats.leading') || "Leading Nepal's transplant education initiatives"
    }
  ];

  const transplantContributions = [
    {
      title: t('transplant.contrib.establishment') || "Programme Establishment",
      description: t('transplant.contrib.establishment.desc') || "Instrumental in establishing Nepal's first comprehensive kidney transplant programme, setting up protocols, training teams, and ensuring international standards of care.",
      impact: t('transplant.contrib.establishment.impact') || "Foundation of modern transplant medicine in Nepal"
    },
    {
      title: t('transplant.contrib.team') || "Multidisciplinary Team Training",
      description: t('transplant.contrib.team.desc') || "Developed comprehensive training programs for surgeons, nephrologists, anesthetists, and nursing staff involved in transplant care.",
      impact: t('transplant.contrib.team.impact') || "Skilled transplant workforce across multiple hospitals"
    },
    {
      title: t('transplant.contrib.protocols') || "Clinical Protocols Development",
      description: t('transplant.contrib.protocols.desc') || "Created standardized protocols for donor evaluation, recipient selection, surgical procedures, and post-operative care specific to Nepal's healthcare context.",
      impact: t('transplant.contrib.protocols.impact') || "Standardized care improving patient outcomes"
    },
    {
      title: t('transplant.contrib.research') || "Research & Innovation",
      description: t('transplant.contrib.research.desc') || "Leading research initiatives in transplant immunology, infection prevention, and long-term outcomes in the Nepali population.",
      impact: t('transplant.contrib.research.impact') || "Evidence-based improvements in transplant care"
    }
  ];

  const trainingProcess = [
    {
      step: "1",
      title: t('teacher.process.theoretical') || "Theoretical Foundation",
      description: t('teacher.process.theoretical.desc') || "Comprehensive lectures covering urological anatomy, physiology, pathology, and pharmacology"
    },
    {
      step: "2",
      title: t('teacher.process.clinical') || "Clinical Exposure",
      description: t('teacher.process.clinical.desc') || "Hands-on patient interaction, case discussions, and clinical decision-making training"
    },
    {
      step: "3",
      title: t('teacher.process.surgical') || "Surgical Training",
      description: t('teacher.process.surgical.desc') || "Progressive surgical training from basic to complex procedures under expert supervision"
    },
    {
      step: "4",
      title: t('teacher.process.research') || "Research Guidance",
      description: t('teacher.process.research.desc') || "Supervision of thesis work, research methodology, and publication guidance"
    },
    {
      step: "5",
      title: t('teacher.process.assessment') || "Assessment & Certification",
      description: t('teacher.process.assessment.desc') || "Comprehensive evaluation through written exams, practical assessments, and viva voce"
    }
  ];

  const contributions = [
    {
      title: t('teacher.contrib.curriculum') || "Curriculum Development",
      description: t('teacher.contrib.curriculum.desc') || "Developed comprehensive MCh Urology curriculum aligned with international standards while addressing Nepal-specific urological challenges.",
      impact: t('teacher.contrib.curriculum.impact') || "Standardized urological education across Nepal"
    },
    {
      title: t('teacher.contrib.methodology') || "Hands-on Training Methodology",
      description: t('teacher.contrib.methodology.desc') || "Introduced innovative teaching methods combining traditional mentorship with modern simulation-based learning.",
      impact: t('teacher.contrib.methodology.impact') || "Improved surgical skills and confidence among trainees"
    },
    {
      title: t('teacher.contrib.supervision') || "Research Supervision",
      description: t('teacher.contrib.supervision.desc') || "Guided numerous research projects and thesis works, promoting evidence-based urological practice in Nepal.",
      impact: t('teacher.contrib.supervision.impact') || "Enhanced research culture in Nepali urology"
    },
    {
      title: t('teacher.contrib.exposure') || "International Exposure",
      description: t('teacher.contrib.exposure.desc') || "Facilitated international training opportunities and exchanges for deserving students and junior faculty.",
      impact: t('teacher.contrib.exposure.impact') || "Global perspective in local practice"
    }
  ];

  return (
    <>
      <SEOHead 
        title="Dr. Parash Mani Shrestha as Teacher | MCh Urology Education Nepal"
        description="Learn about Dr. Parash Mani Shrestha's 12+ years of teaching MCh Urology, training and certifying doctors, and his contributions to urological education in Nepal."
        keywords="MCh Urology Nepal, urology teacher, medical education Nepal, Dr Parash Mani Shrestha, urology training"
        canonical="/dr-as-teacher"
      />
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="pt-8 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-doctor-blue-dark mb-4">
                {t('page.teacher.title') || 'Dr. Parash Mani Shrestha as a Teacher'}
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t('teacher.hero.subtitle') || 'Dedicated educator shaping the future of urology in Nepal through 12+ years of teaching MCh Urology and mentoring the next generation of urologists'}
              </p>
            </div>

            {/* Teaching Statistics */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {teachingStats.map((stat, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      {stat.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-doctor-blue-dark mb-2">
                      {stat.title}
                    </h3>
                    <p className="text-lg font-semibold text-doctor-blue mb-2">
                      {stat.subtitle}
                    </p>
                    <p className="text-gray-600">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Kidney Transplant Programme Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-doctor-blue-dark mb-8 text-center">
                {t('transplant.programme.title') || 'Kidney Transplant Programme Leadership'}
              </h2>
              
              {/* Transplant Statistics */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {transplantStats.map((stat, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex justify-center mb-4">
                        {stat.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-doctor-blue-dark mb-2">
                        {stat.title}
                      </h3>
                      <p className="text-lg font-semibold text-doctor-blue mb-2">
                        {stat.subtitle}
                      </p>
                      <p className="text-gray-600">
                        {stat.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Programme Overview */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Heart className="h-8 w-8 text-red-500" />
                    {t('transplant.overview.title') || 'Nepal Kidney Transplant Programme Overview'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    {t('transplant.overview.description') || 'Dr. Parash Mani Shrestha has been a pioneering force in establishing and advancing Nepal\'s kidney transplant programme. Since its inception, he has led the development of comprehensive transplant services, trained medical professionals, and ensured that Nepal meets international standards in transplant medicine. His expertise spans from donor evaluation to long-term recipient care, making him one of the most trusted names in transplant surgery in Nepal.'}
                  </p>
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-red-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-red-800 mb-2">{t('transplant.overview.experience') || 'Programme Experience'}</h4>
                      <p className="text-gray-700">{t('transplant.overview.experience.years') || '15+ Years in Transplant Medicine'}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">{t('transplant.overview.impact') || 'Programme Impact'}</h4>
                      <p className="text-gray-700">{t('transplant.overview.impact.desc') || 'Transformed kidney care landscape in Nepal'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Transplant Programme Contributions */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-doctor-blue-dark text-center mb-6">
                  {t('transplant.contrib.title') || 'Contributions to Kidney Transplant Programme'}
                </h3>
                {transplantContributions.map((contribution, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-xl text-doctor-blue-dark">
                        {contribution.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        {contribution.description}
                      </p>
                      <div className="bg-red-50 p-4 rounded-lg">
                        <p className="text-red-800 font-medium">
                          <strong>{t('transplant.impact') || 'Impact'}:</strong> {contribution.impact}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* MCh Urology Program Overview */}
            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <BookOpen className="h-8 w-8 text-doctor-blue" />
                  {t('teacher.mch.title') || 'MCh Urology Program Overview'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  {t('teacher.mch.description') || 'The Master of Chirurgiae (MCh) in Urology is a 3-year super-specialty program designed to train highly skilled urological surgeons. Dr. Parash Mani Shrestha has been instrumental in developing and delivering this program for over 12 years, ensuring that graduates meet international standards while being equipped to handle Nepal-specific urological challenges.'}
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-doctor-blue-light p-4 rounded-lg">
                    <h4 className="font-semibold text-doctor-blue-dark mb-2">{t('teacher.mch.duration') || 'Program Duration'}</h4>
                    <p className="text-gray-700">{t('teacher.mch.duration.desc') || '3 Years (6 Semesters)'}</p>
                  </div>
                  <div className="bg-doctor-blue-light p-4 rounded-lg">
                    <h4 className="font-semibold text-doctor-blue-dark mb-2">{t('teacher.mch.components') || 'Training Components'}</h4>
                    <p className="text-gray-700">{t('teacher.mch.components.desc') || 'Theory, Clinical Practice, Surgery, Research'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Teaching Areas */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-doctor-blue-dark mb-8 text-center">
                {t('teacher.areas.title') || 'Specialized Teaching Areas'}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {teachingAreas.map((area, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="text-xl text-doctor-blue-dark">{area.title}</span>
                        <Badge variant="outline" className="text-doctor-blue border-doctor-blue">
                          {area.level}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {area.topics.map((topic, topicIndex) => (
                          <li key={topicIndex} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Training Process */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-doctor-blue-dark mb-8 text-center">
                {t('teacher.process.title') || 'Training Process & Methodology'}
              </h2>
              <div className="space-y-6">
                {trainingProcess.map((process, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-doctor-blue text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                          {process.step}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-doctor-blue-dark mb-2">
                            {process.title}
                          </h3>
                          <p className="text-gray-700 leading-relaxed">
                            {process.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Contributions to Medical Education */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-doctor-blue-dark mb-8 text-center">
                {t('teacher.contrib.title') || 'Contributions to Urological Education in Nepal'}
              </h2>
              <div className="space-y-6">
                {contributions.map((contribution, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-xl text-doctor-blue-dark">
                        {contribution.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        {contribution.description}
                      </p>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-green-800 font-medium">
                          <strong>{t('teacher.impact') || 'Impact'}:</strong> {contribution.impact}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Teaching Philosophy */}
            <Card className="bg-gradient-to-r from-doctor-blue to-doctor-blue-dark text-white">
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  {t('teacher.philosophy.title') || 'Teaching Philosophy'}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-lg leading-relaxed">
                  {t('teacher.philosophy.quote') || '"Education is not just about imparting knowledge, but about inspiring confidence, fostering critical thinking, and nurturing compassionate healers who will serve Nepal with dedication and excellence."'}
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-8">
                  <div className="bg-white/10 p-4 rounded-lg">
                    <Stethoscope className="h-8 w-8 mx-auto mb-2" />
                    <p className="font-semibold">{t('teacher.philosophy.excellence') || 'Clinical Excellence'}</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg">
                    <Target className="h-8 w-8 mx-auto mb-2" />
                    <p className="font-semibold">{t('teacher.philosophy.precision') || 'Precision & Care'}</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg">
                    <Users className="h-8 w-8 mx-auto mb-2" />
                    <p className="font-semibold">{t('teacher.philosophy.mentorship') || 'Mentorship'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default DrAsTeacher;
