import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [profile, setProfile] = useState({
    full_name: '',
    age: '',
    education_level: '',
    tamil_proficiency: '',
    preferred_subjects: []
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (error) throw error;
        
        if (data) {
          setProfile({
            full_name: data.full_name || '',
            age: data.age?.toString() || '',
            education_level: data.education_level || '',
            tamil_proficiency: data.tamil_proficiency || '',
            preferred_subjects: data.preferred_subjects || []
          });
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [user]);

  if (loading) {
    return <div className="text-center py-12">Loading profile...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-indigo-50 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-medium text-indigo-800 mb-4">Your Profile</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="font-medium">{profile.full_name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{user?.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Age</p>
            <p className="font-medium">{profile.age}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Education Level</p>
            <p className="font-medium">{profile.education_level}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Tamil Proficiency</p>
            <p className="font-medium">{profile.tamil_proficiency}</p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 rounded-xl p-6">
        <h3 className="text-xl font-medium text-amber-800 mb-4">Preferred Subjects</h3>
        <div className="flex flex-wrap gap-2">
          {profile.preferred_subjects.map((subject) => (
            <span 
              key={subject} 
              className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm"
            >
              {subject}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}