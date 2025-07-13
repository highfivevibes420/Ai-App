import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink,
  Calendar,
  User,
  Briefcase,
  Award,
  TrendingUp,
  Share2,
  Copy,
  Check
} from 'lucide-react';
import { database } from '../lib/database';

interface PublicPortfolioProps {
  slug: string;
}

const PublicPortfolio: React.FC<PublicPortfolioProps> = ({ slug }) => {
  const [portfolio, setPortfolio] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [recentActivity] = useState([
    { type: 'project', title: 'Launched new e-commerce platform', date: '2024-01-15' },
    { type: 'achievement', title: 'Completed AI certification', date: '2024-01-10' },
    { type: 'client', title: 'New client: Tech Startup Inc.', date: '2024-01-05' }
  ]);

  useEffect(() => {
    loadPortfolio();
  }, [slug]);

  const loadPortfolio = async () => {
    setLoading(true);
    
    // For demo purposes, create a sample portfolio
    const samplePortfolio = {
      id: '1',
      business_name: 'Ayyan Digital Solutions',
      tagline: 'Transforming businesses through innovative digital solutions',
      description: `I'm a passionate digital entrepreneur with over 5 years of experience in building scalable web applications and helping businesses grow through technology. 

My expertise spans across full-stack development, AI integration, and business strategy. I've successfully delivered 50+ projects for clients ranging from startups to enterprise companies.

I believe in creating solutions that not only solve problems but also drive meaningful business growth. My approach combines technical excellence with strategic thinking to deliver results that matter.`,
      services: [
        'Full-Stack Web Development',
        'AI & Machine Learning Integration',
        'Business Process Automation',
        'Digital Marketing Strategy',
        'E-commerce Solutions',
        'Mobile App Development'
      ],
      contact_info: {
        email: 'ayyan@digitalsolutions.com',
        phone: '+92 300 1234567',
        address: 'Karachi, Pakistan'
      },
      social_links: {
        website: 'https://ayyandigital.com',
        linkedin: 'https://linkedin.com/in/ayyan',
        github: 'https://github.com/ayyan',
        twitter: 'https://twitter.com/ayyan'
      },
      is_public: true,
      slug: 'ayyan',
      stats: {
        projects_completed: 52,
        clients_served: 28,
        years_experience: 5,
        success_rate: 98
      },
      tools: [
        'React', 'Node.js', 'Python', 'TypeScript', 'PostgreSQL', 'AWS', 
        'Docker', 'TensorFlow', 'Figma', 'Supabase'
      ],
      testimonials: [
        {
          name: 'Sarah Johnson',
          company: 'TechStart Inc.',
          text: 'Ayyan delivered an exceptional e-commerce platform that increased our sales by 300%. Highly recommended!',
          rating: 5
        },
        {
          name: 'Ahmed Khan',
          company: 'Digital Marketing Pro',
          text: 'Professional, reliable, and delivers on time. The AI integration he built saved us 20 hours per week.',
          rating: 5
        }
      ]
    };
    
    setPortfolio(samplePortfolio);
    setLoading(false);
  };

  const copyPortfolioLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'project': return Briefcase;
      case 'achievement': return Award;
      case 'client': return User;
      default: return Calendar;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-gray-400">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">Portfolio Not Found</h1>
          <p className="text-slate-600 dark:text-gray-400">The portfolio you're looking for doesn't exist or is not public.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">{portfolio.business_name}</h1>
                <p className="text-xl text-blue-100">{portfolio.tagline}</p>
              </div>
            </div>
            <button
              onClick={copyPortfolioLink}
              className="flex items-center space-x-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
            >
              {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Share'}</span>
            </button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">{portfolio.stats.projects_completed}+</div>
              <div className="text-blue-100">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">{portfolio.stats.clients_served}+</div>
              <div className="text-blue-100">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">{portfolio.stats.years_experience}+</div>
              <div className="text-blue-100">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">{portfolio.stats.success_rate}%</div>
              <div className="text-blue-100">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm border border-slate-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">About Me</h2>
              <div className="prose prose-slate dark:prose-invert max-w-none">
                {portfolio.description.split('\n\n').map((paragraph: string, index: number) => (
                  <p key={index} className="text-slate-600 dark:text-gray-300 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm border border-slate-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {portfolio.services.map((service: string, index: number) => (
                  <div key={index} className="flex items-center space-x-3 p-4 bg-slate-50 dark:bg-gray-700 rounded-lg border dark:border-gray-600">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="font-medium text-slate-800 dark:text-white">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools & Technologies */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm border border-slate-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Tools & Technologies</h2>
              <div className="flex flex-wrap gap-3">
                {portfolio.tools.map((tool: string, index: number) => (
                  <span 
                    key={index}
                    className="px-3 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-lg text-sm font-medium"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm border border-slate-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Client Testimonials</h2>
              <div className="space-y-6">
                {portfolio.testimonials.map((testimonial: any, index: number) => (
                  <div key={index} className="p-6 bg-slate-50 dark:bg-gray-700 rounded-lg border dark:border-gray-600">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-slate-700 dark:text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-white">{testimonial.name}</p>
                      <p className="text-sm text-slate-600 dark:text-gray-400">{testimonial.company}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Contact Info */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Get In Touch</h3>
              <div className="space-y-4">
                {portfolio.contact_info.email && (
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <a 
                      href={`mailto:${portfolio.contact_info.email}`}
                      className="text-slate-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {portfolio.contact_info.email}
                    </a>
                  </div>
                )}
                {portfolio.contact_info.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <a 
                      href={`tel:${portfolio.contact_info.phone}`}
                      className="text-slate-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {portfolio.contact_info.phone}
                    </a>
                  </div>
                )}
                {portfolio.contact_info.address && (
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span className="text-slate-600 dark:text-gray-300">{portfolio.contact_info.address}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Connect With Me</h3>
              <div className="space-y-3">
                {Object.entries(portfolio.social_links).map(([platform, url]) => (
                  url && (
                    <a 
                      key={platform}
                      href={url as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-3 bg-slate-50 dark:bg-gray-700 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-600 transition-colors group"
                    >
                      <ExternalLink className="w-4 h-4 text-blue-600 group-hover:text-blue-700" />
                      <span className="capitalize text-slate-700 dark:text-gray-300 group-hover:text-slate-800 dark:group-hover:text-white">
                        {platform}
                      </span>
                    </a>
                  )
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => {
                  const IconComponent = getActivityIcon(activity.type);
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-800 dark:text-white">{activity.title}</p>
                        <p className="text-xs text-slate-500 dark:text-gray-500">
                          {new Date(activity.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white text-center">
              <h3 className="text-xl font-bold mb-2">Ready to Work Together?</h3>
              <p className="text-blue-100 mb-4">Let's discuss your next project</p>
              <a
                href={`mailto:${portfolio.contact_info.email}?subject=Project Inquiry`}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
              >
                <Mail className="w-4 h-4" />
                <span>Start a Project</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicPortfolio;