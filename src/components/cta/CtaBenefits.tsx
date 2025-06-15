
import { CheckCircle } from 'lucide-react';

const CtaBenefits = () => {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-4 reveal">Join Our Exclusive Waitlist</h3>
      <ul className="space-y-3 reveal delay-100">
        <li className="flex items-start">
          <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <span>Free access during beta period</span>
        </li>
        <li className="flex items-start">
          <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <span>No credit card required</span>
        </li>
        <li className="flex items-start">
          <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <span>Cancel anytime</span>
        </li>
      </ul>
    </div>
  );
};

export default CtaBenefits;
