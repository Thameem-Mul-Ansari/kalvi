import { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function CareerGuidance() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch news from NewsAPI
  useEffect(() => {
    const apiKey = 'ca717e05e20b4774912fce2cf503be59'; // Replace with your NewsAPI key
    const query = 'education India'; // Query to fetch education-related news in India
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${apiKey}`;

    axios.get(url)
      .then(response => {
        console.log(response.data.articles); // Log the API response
        setNews(response.data.articles.slice(0, 5)); // Limit to 5 articles
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching news:', error);
        setLoading(false);
      });
  }, []);

  // List of courses with YouTube video links (in Tamil)
  const coursesForDropouts = [
    {
      title: 'வோகேஷனல் பயிற்சி',
      description: 'மரத்தொழில், பிளம்பிங், மின்சாரம் போன்ற திறன்களை கற்றுக்கொள்ளுங்கள்.',
      videoLink: 'https://www.youtube.com/embed/VIDEO_ID_1', // Replace with actual YouTube video ID
      provider: 'தமிழ்நாடு அரசு'
    },
    {
      title: 'டிஜிட்டல் லிடரசி',
      description: 'கணினி அடிப்படை திறன்கள் மற்றும் இணைய பயன்பாட்டை கற்றுக்கொள்ளுங்கள்.',
      videoLink: 'https://www.youtube.com/embed/VIDEO_ID_2', // Replace with actual YouTube video ID
      provider: 'தமிழ்நாடு திறன் மேம்பாட்டு நிறுவனம்'
    },
    {
      title: 'தொழில்முனைவோர் பயிற்சி',
      description: 'உங்கள் சொந்த வணிகத்தை தொடங்கி நிர்வகிக்க கற்றுக்கொள்ளுங்கள்.',
      videoLink: 'https://www.youtube.com/embed/VIDEO_ID_3', // Replace with actual YouTube video ID
      provider: 'தமிழ்நாடு தொழில்முனைவோர் மேம்பாட்டு நிறுவனம்'
    }
  ];

  // Carousel settings
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="p-6">
      {/* News Section */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">இந்தியாவில் கல்வி செய்திகள்</h2>
      {loading ? (
        <p>செய்திகள் ஏற்றப்படுகின்றன...</p>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <Slider {...carouselSettings}>
            {news.map((article, index) => (
              <div key={index} className="p-4">
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-96 object-cover rounded-lg" // Increased height to h-96 (24rem)
                  />
                )}
                <div className="mt-4">
                  <h3 className="font-bold text-gray-800 mb-2">{article.title}</h3>
                  <p className="text-gray-600 mb-4">{article.description}</p>
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-700">
                    மேலும் படிக்க
                  </a>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}

      {/* Courses Section */}
      <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-6">பள்ளி கல்வியை விட்டவர்களுக்கான படிப்புகள்</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coursesForDropouts.map((course, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <h3 className="font-bold text-gray-800 mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <p className="text-sm text-gray-600 mb-4">வழங்குபவர்: {course.provider}</p>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={course.videoLink}
                  title={course.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CareerGuidance;