
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Link } from 'react-router-dom';
import { FileText, Video, Search, BookOpen, Lightbulb, Target } from 'lucide-react';

const SettingsPage = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings & Content Management Guide</h2>
          <p className="text-gray-500 mt-1">Complete guide for managing blogs, videos, and SEO optimization.</p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Blog Management Guide
              </CardTitle>
              <CardDescription>
                Step-by-step guide to create engaging medical blog posts with proper SEO
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="blog-basics">
                  <AccordionTrigger>1. Blog Post Basics</AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Required Fields:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Title (English & Nepali):</strong> Clear, descriptive titles (50-60 characters for SEO)</li>
                        <li><strong>Slug:</strong> URL-friendly version (auto-generated but editable)</li>
                        <li><strong>Meta Description:</strong> 150-160 characters summarizing the post</li>
                        <li><strong>Content:</strong> Rich text content with proper formatting</li>
                        <li><strong>Image:</strong> Featured image (recommended: 1200x630px for social sharing)</li>
                        <li><strong>Keywords:</strong> Relevant medical terms and search phrases</li>
                        <li><strong>Published:</strong> Toggle to make post live</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Best Practices:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Use clear headings (H2, H3) to structure content</li>
                        <li>Include relevant medical keywords naturally</li>
                        <li>Add internal links to other blog posts or pages</li>
                        <li>Use bullet points and numbered lists for readability</li>
                        <li>Include call-to-action buttons when appropriate</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="blog-seo">
                  <AccordionTrigger>2. Blog SEO Optimization</AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Title Optimization:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Include target keyword in title</li>
                        <li>Keep under 60 characters</li>
                        <li>Make it compelling and clickable</li>
                        <li>Example: "Kidney Stone Treatment in Nepal: Complete Guide by Dr. Parash Mani"</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Content Structure:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Start with engaging introduction</li>
                        <li>Use descriptive subheadings</li>
                        <li>Include FAQ section when relevant</li>
                        <li>Add conclusion with key takeaways</li>
                        <li>Aim for 800-2000 words for comprehensive coverage</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Image Optimization:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Use descriptive alt text</li>
                        <li>Optimize file size (under 200KB)</li>
                        <li>Use relevant medical images</li>
                        <li>Include doctor's photo when appropriate</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="blog-ai-help">
                  <AccordionTrigger>3. Using AI for Blog Content</AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">ChatGPT/Grok Prompts for Blog Writing:</h4>
                      <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                        <div>
                          <strong>Title Generation:</strong>
                          <p className="text-sm italic">"Generate 5 SEO-optimized blog titles about [medical topic] for a urologist in Nepal. Include keywords like 'Nepal', 'Kathmandu', and specific medical terms."</p>
                        </div>
                        <div>
                          <strong>Content Outline:</strong>
                          <p className="text-sm italic">"Create a detailed blog outline about [topic] for patients in Nepal. Include introduction, main sections, FAQ, and conclusion. Make it medically accurate but patient-friendly."</p>
                        </div>
                        <div>
                          <strong>Meta Description:</strong>
                          <p className="text-sm italic">"Write a compelling 150-character meta description for a blog post about [topic] by Dr. Parash Mani Shrestha, a urologist in Kathmandu, Nepal."</p>
                        </div>
                        <div>
                          <strong>SEO Keywords:</strong>
                          <p className="text-sm italic">"Generate 10-15 relevant SEO keywords for a blog post about [medical condition] targeting patients in Nepal. Include local and medical terms."</p>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-6">
                <Button asChild className="w-full bg-doctor-blue">
                  <Link to="/admin/blogs">
                    Start Creating Blog Posts
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                Video Management Guide
              </CardTitle>
              <CardDescription>
                Complete guide for adding and optimizing medical videos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="video-basics">
                  <AccordionTrigger>1. Video Upload Basics</AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Required Fields:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Title (English & Nepali):</strong> Descriptive video titles</li>
                        <li><strong>Description:</strong> Detailed video description with medical context</li>
                        <li><strong>Video URL:</strong> YouTube video link (will auto-convert to embed format)</li>
                        <li><strong>Thumbnail:</strong> Custom thumbnail image (recommended: 1280x720px)</li>
                        <li><strong>Duration:</strong> Video length (helps with user expectations)</li>
                        <li><strong>Category:</strong> Medical specialty or topic category</li>
                        <li><strong>Tags:</strong> Relevant medical and procedural tags</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">YouTube URL Formats Supported:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Standard: https://www.youtube.com/watch?v=VIDEO_ID</li>
                        <li>Short: https://youtu.be/VIDEO_ID</li>
                        <li>Embed: https://www.youtube.com/embed/VIDEO_ID</li>
                        <li>The system automatically converts to proper embed format</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="video-optimization">
                  <AccordionTrigger>2. Video SEO & Optimization</AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Title Best Practices:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Include medical procedure or condition name</li>
                        <li>Add location (Nepal, Kathmandu) for local SEO</li>
                        <li>Keep under 70 characters for full display</li>
                        <li>Example: "TURP Surgery Explained | Prostate Treatment by Dr. Parash Mani | Nepal"</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Description Guidelines:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Start with compelling summary</li>
                        <li>Include medical disclaimers</li>
                        <li>Add doctor's credentials</li>
                        <li>Include contact information</li>
                        <li>Use relevant medical keywords naturally</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Thumbnail Tips:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Use high-quality medical imagery</li>
                        <li>Include text overlay for context</li>
                        <li>Maintain professional medical appearance</li>
                        <li>Ensure visibility at small sizes</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="video-ai-help">
                  <AccordionTrigger>3. AI Assistance for Video Content</AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">ChatGPT/Grok Prompts for Videos:</h4>
                      <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                        <div>
                          <strong>Video Titles:</strong>
                          <p className="text-sm italic">"Generate 5 engaging YouTube video titles for a medical video about [procedure/condition] by Dr. Parash Mani Shrestha, urologist in Nepal."</p>
                        </div>
                        <div>
                          <strong>Video Descriptions:</strong>
                          <p className="text-sm italic">"Write a comprehensive YouTube video description for a medical video about [topic]. Include medical disclaimers, doctor credentials, and contact information for practice in Kathmandu, Nepal."</p>
                        </div>
                        <div>
                          <strong>Video Tags:</strong>
                          <p className="text-sm italic">"Generate relevant tags for a medical video about [condition/procedure] targeting patients in Nepal. Include medical terms, location tags, and doctor-specific keywords."</p>
                        </div>
                        <div>
                          <strong>Video Scripts:</strong>
                          <p className="text-sm italic">"Create a patient-friendly script outline for a 5-minute educational video about [medical topic] for Nepali patients. Include key points, medical accuracy, and call-to-action."</p>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="video-categories">
                  <AccordionTrigger>4. Video Categories & Content Ideas</AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Recommended Video Categories:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Procedure Explanations:</strong> TURP, Kidney Stone Removal, etc.</li>
                        <li><strong>Condition Education:</strong> Kidney Stones, Prostate Issues, UTIs</li>
                        <li><strong>Patient Testimonials:</strong> Success stories and experiences</li>
                        <li><strong>Prevention Tips:</strong> Lifestyle advice for urological health</li>
                        <li><strong>FAQ Sessions:</strong> Common patient questions answered</li>
                        <li><strong>Hospital Tours:</strong> Facility and equipment showcases</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-6">
                <Button asChild className="w-full bg-doctor-blue">
                  <Link to="/admin/videos">
                    Start Adding Videos
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                SEO & Content Strategy
              </CardTitle>
              <CardDescription>
                Advanced tips for search engine optimization and content strategy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="seo-strategy">
                  <AccordionTrigger>SEO Best Practices</AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Keyword Research:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Focus on medical conditions + location (e.g., "kidney stones Nepal")</li>
                        <li>Include doctor's name variations</li>
                        <li>Target long-tail keywords for specific procedures</li>
                        <li>Use Google Keyword Planner for research</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Content Calendar Ideas:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Weekly medical education posts</li>
                        <li>Monthly procedure spotlights</li>
                        <li>Seasonal health tips</li>
                        <li>Patient success stories</li>
                        <li>Medical technology updates</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="ai-prompts">
                  <AccordionTrigger>AI Prompt Templates</AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg space-y-3">
                      <div>
                        <strong>Content Research:</strong>
                        <p className="text-sm italic">"Research the latest medical guidelines for [condition] and create a patient-friendly summary suitable for a blog post by a urologist in Nepal."</p>
                      </div>
                      <div>
                        <strong>Local SEO:</strong>
                        <p className="text-sm italic">"Generate content ideas that would help a urologist in Kathmandu, Nepal rank higher in local search results for [medical service]."</p>
                      </div>
                      <div>
                        <strong>Patient Education:</strong>
                        <p className="text-sm italic">"Explain [medical procedure] in simple terms that Nepali patients can understand, including preparation, procedure, and recovery."</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Navigate to content management sections
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Button asChild className="flex-1 bg-doctor-blue">
                <Link to="/admin/blogs">
                  <FileText className="mr-2 h-4 w-4" />
                  Manage Blogs
                </Link>
              </Button>
              <Button asChild className="flex-1 bg-doctor-blue">
                <Link to="/admin/videos">
                  <Video className="mr-2 h-4 w-4" />
                  Manage Videos
                </Link>
              </Button>
              <Button asChild className="flex-1 bg-doctor-blue">
                <Link to="/admin/contacts">
                  <BookOpen className="mr-2 h-4 w-4" />
                  View Contacts
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SettingsPage;
