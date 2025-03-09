import { useNavigate } from "react-router-dom";
import { GraduationCap, Play, Users, BookOpen, Mic, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FDF6EC]">
      {/* Header */}
      <header className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-[#E85A14]" />
              <span className="ml-2 text-xl font-bold text-[#E85A14]">
                தமிழ் பயிலகம்
              </span>
            </div>
            <nav className="flex items-center space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                பயிற்சிகள்
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                எங்களை பற்றி
              </a>
              <motion.button
                onClick={() => navigate("/signup")} // Navigate to sign-up page
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-[#E85A14] text-white rounded-lg hover:bg-[#D14C0A] transition-colors"
              >
                தொடங்குங்கள்
              </motion.button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI மூலம் தமிழ் கற்றல்
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            உங்கள் கற்றல் பயணத்தை தொடருங்கள். எங்கள் AI உங்களுக்கு ஏற்ற பாடங்களை
            வழங்கும்.
          </p>
          <motion.button
            onClick={() => navigate("/signup")} // Navigate to sign-up page
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-[#E85A14] text-white rounded-lg hover:bg-[#D14C0A] transition-colors text-lg"
          >
            இலவசமாக தொடங்குங்கள்
          </motion.button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {[
            {
              icon: GraduationCap,
              title: "AI சார்ந்த கற்றல்",
              text: "உங்கள் கற்றல் வேகத்திற்கு ஏற்ப தனிப்பயனாக்கப்பட்ட பாடங்கள்",
            },
            {
              icon: Play,
              title: "ஊடாடும் பயிற்சிகள்",
              text: "விளையாட்டு வடிவில் கற்றல் மற்றும் பயிற்சி செய்தல்",
            },
            {
              icon: Users,
              title: "சமூக கற்றல்",
              text: "மற்ற மாணவர்களுடன் இணைந்து கற்றல்",
            },
            {
              icon: BookOpen,
              title: "தமிழ் இலக்கிய பாடங்கள்",
              text: "பழமையான மற்றும் புதிய தமிழ் இலக்கியங்களை ஆராயுங்கள்",
            },
            {
              icon: Mic,
              title: "உச்சரிப்பு பயிற்சி",
              text: "AI ஆதரவு மூலம் சரியான உச்சரிப்பை பயிற்சி செய்யுங்கள்",
            },
            {
              icon: Star,
              title: "வழிகாட்டும் பாடங்கள்",
              text: "வளர்ச்சியூட்டும் வழிகாட்டல்களைப் பெறுங்கள்",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.15 }}
              whileHover={{ scale: 1.05, rotate: [0, 2, -2, 2, 0] }}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-all"
            >
              <motion.div
                className="w-12 h-12 bg-[#FDF6EC] rounded-lg flex items-center justify-center mb-4"
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                <feature.icon className="h-6 w-6 text-[#E85A14]" />
              </motion.div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center">
                <GraduationCap className="h-8 w-8" />
                <span className="ml-2 text-xl font-bold">தமிழ் பயிலகம் </span>
              </div>
              <p className="mt-4 text-gray-400">
                அனைவருக்கும் தரமான கல்வி கிடைக்க வேண்டும் என்பதே எங்கள் நோக்கம்.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">தொடர்புக்கு</h3>
              <p className="text-gray-400">support@tamilkarpom.com</p>
              <p className="text-gray-400">+91 44 4242 4242</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}