
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Award } from 'lucide-react';
import { LectureAbroadWithImages } from '@/hooks/useLecturesAbroad';

interface LectureViewProps {
  lecture: LectureAbroadWithImages;
  onClose: () => void;
}

const LectureView: React.FC<LectureViewProps> = ({ lecture }) => {
  const { language } = useLanguage();

  const getTitle = () => {
    return language === 'np' ? (lecture.title_np || lecture.title_en) : lecture.title_en;
  };

  const getLocation = () => {
    return language === 'np' ? (lecture.location_np || lecture.location_en) : lecture.location_en;
  };

  const getVenue = () => {
    return language === 'np' ? (lecture.venue_np || lecture.venue_en) : lecture.venue_en;
  };

  const getDate = () => {
    return language === 'np' ? (lecture.date_np || lecture.date_en) : lecture.date_en;
  };

  const getAudience = () => {
    return language === 'np' ? (lecture.audience_np || lecture.audience_en) : lecture.audience_en;
  };

  const getBadge = () => {
    return language === 'np' ? (lecture.badge_np || lecture.badge_en) : lecture.badge_en;
  };

  const getDescription = () => {
    return language === 'np' ? (lecture.description_np || lecture.description_en) : lecture.description_en;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {getBadge() && (
                  <Badge className="bg-doctor-blue">{getBadge()}</Badge>
                )}
                <Badge variant={lecture.type === 'recent' ? 'default' : 'secondary'}>
                  {lecture.type}
                </Badge>
              </div>
              <CardTitle className="text-2xl">{getTitle()}</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-doctor-blue" />
              <div>
                <p className="font-semibold">Location</p>
                <p className="text-gray-600">{getLocation()}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-doctor-blue" />
              <div>
                <p className="font-semibold">Date</p>
                <p className="text-gray-600">{getDate()}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-doctor-blue" />
              <p className="font-semibold">Venue</p>
            </div>
            <p className="text-gray-600 ml-7">{getVenue()}</p>
          </div>

          {getAudience() && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-doctor-blue" />
                <p className="font-semibold">Audience</p>
              </div>
              <p className="text-gray-600 ml-7">{getAudience()}</p>
            </div>
          )}

          {getDescription() && (
            <div className="space-y-2">
              <p className="font-semibold">Description</p>
              <p className="text-gray-600 leading-relaxed">{getDescription()}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {lecture.topics && lecture.topics.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Topics Covered</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1">
              {lecture.topics.map((topic, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-doctor-blue rounded-full"></span>
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {lecture.highlights && lecture.highlights.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Key Highlights</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1">
              {lecture.highlights.map((highlight, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {lecture.lecture_images && lecture.lecture_images.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Images ({lecture.lecture_images.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {lecture.lecture_images.map((image) => (
                <div key={image.id} className="space-y-2">
                  <img 
                    src={image.image_url} 
                    alt={language === 'np' ? (image.alt_text_np || image.alt_text_en) : image.alt_text_en}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  {(image.alt_text_en || image.alt_text_np) && (
                    <p className="text-sm text-gray-600">
                      {language === 'np' ? (image.alt_text_np || image.alt_text_en) : image.alt_text_en}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="text-sm text-gray-500 space-y-1">
        <p>Created: {new Date(lecture.created_at).toLocaleString()}</p>
        {lecture.updated_at && (
          <p>Updated: {new Date(lecture.updated_at).toLocaleString()}</p>
        )}
        <p>Slug: {lecture.slug}</p>
      </div>
    </div>
  );
};

export default LectureView;
