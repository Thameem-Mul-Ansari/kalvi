import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Timeline {
  year: string;
  event: string;
}

interface KeyPoint {
  title: string;
  description: string;
}

interface UnitContent {
  title: string;
  description: string;
  keyPoints: KeyPoint[];
  timeline: Timeline[];
  images: string[];
}

function UnitDetails() {
  const { lessonId, unitId } = useParams();
  const [unitContent, setUnitContent] = useState<UnitContent | null>(null);

  useEffect(() => {
    // This would typically be an API call to fetch unit details
    // For demonstration, using mock data for Sepoy Mutiny
    if (lessonId === 'social' && unitId === 'unit1') {
      setUnitContent({
        title: 'Sepoy Mutiny of 1857',
        description: 'The First War of Indian Independence',
        keyPoints: [
          {
            title: 'Immediate Cause',
            description: 'Introduction of greased cartridges in the new Enfield rifles'
          },
          // Add more key points
        ],
        timeline: [
          {
            year: '1857 May 10',
            event: 'Outbreak at Meerut'
          },
          // Add more timeline events
        ],
        images: [
          'https://example.com/sepoy-mutiny-1.jpg',
          // Add more images
        ]
      });
    }
  }, [lessonId, unitId]);

  if (!unitContent) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{unitContent.title}</h1>
      <p className="text-gray-600 mb-8">{unitContent.description}</p>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Key Points</h2>
        <div className="grid gap-4">
          {unitContent.keyPoints.map((point, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold text-gray-800">{point.title}</h3>
              <p className="text-gray-600">{point.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Timeline</h2>
        <div className="space-y-4">
          {unitContent.timeline.map((item, index) => (
            <div key={index} className="flex gap-4 items-start">
              <div className="font-bold text-amber-600 w-24">{item.year}</div>
              <div className="text-gray-600">{item.event}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {unitContent.images.map((image, index) => (
            <img 
              key={index}
              src={image}
              alt={`Image ${index + 1}`}
              className="w-full h-48 object-cover rounded-lg"
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default UnitDetails;