
import { useIntersectionReveal } from '@/hooks/useIntersectionReveal';
import { Users, Database } from 'lucide-react';

const UserControlledData = () => {
  const sectionRef = useIntersectionReveal<HTMLDivElement>();

  return (
    <section className="py-16 md:py-24 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block rounded-full px-3 py-1 bg-gradient-to-r from-alegi-blue/10 to-alegi-blue-light/20 text-alegi-blue text-sm font-medium mb-4 reveal">
                User-Controlled Data and Privacy
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6 reveal delay-100">
                You Control Your Data
              </h2>
              <p className="text-lg text-gray-600 mb-8 reveal delay-200">
                Alegi puts you in control of your data. Our platform provides:
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start reveal delay-300">
                  <div className="flex-shrink-0 mr-4 mt-1">
                    <div className="w-10 h-10 rounded-full bg-alegi-blue/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-alegi-blue" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">Granular Access Controls</h3>
                    <p className="text-gray-600">
                      Define who can access your information with role-based permissions that give you full control over data visibility.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start reveal delay-400">
                  <div className="flex-shrink-0 mr-4 mt-1">
                    <div className="w-10 h-10 rounded-full bg-alegi-blue/10 flex items-center justify-center">
                      <Database className="h-5 w-5 text-alegi-blue" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">Data Portability</h3>
                    <p className="text-gray-600">
                      Export or delete your data whenever needed, ensuring you maintain ownership and control of your information at all times.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="reveal delay-500">
              <div className="bg-gradient-to-br from-alegi-blue/5 to-alegi-blue-light/10 rounded-2xl p-8 border border-alegi-blue/10">
                <img 
                  src="/lovable-uploads/329717e2-4af2-411d-af3b-fa8d7b70b9f6.png" 
                  alt="Data Control Dashboard" 
                  className="w-full h-auto rounded-xl shadow-lg"
                />
                <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white">
                  <h4 className="text-lg font-semibold mb-3 text-gray-900">Your Privacy Commitment</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                        <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                      <span className="text-gray-700 text-sm">Data minimization practices</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                        <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                      <span className="text-gray-700 text-sm">Clear data retention policies</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                        <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                      <span className="text-gray-700 text-sm">Transparent processing practices</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserControlledData;
