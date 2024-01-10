// app/components/Footer.tsx
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setFooterText } from './footerActions';

interface FooterProps {
  text: string;
  setFooterText: (text: string) => void;
  initialFooterText: string; // Add this line
}

const Footer: React.FC<FooterProps> = ({ text, setFooterText, initialFooterText }) => {
    const footerTexts = ['Just as each coin has two sides, embrace both the challenges and opportunities that financial journeys bring. Every flip is a chance for growth.', 
    'In the world of finance, every cent counts. Treat your money with respect, and watch it grow into a powerful force for achieving your dreams',
     'Like gold, your financial decisions should withstand the test of time. Invest wisely, and let your wealth shine bright throughout the seasons of life.',
    'In the realm of wealth, patience is the golden key. Every coin saved is a step closer to the life you ve always envisioned. Stay persistent, and success will follow.'];
  const [index, setIndex] = useState(0);

  const handleClick = () => {
    setFooterText(footerTexts[index]);
    setIndex((index + 1) % footerTexts.length);
  };

  return (
    <footer className="static bottom-0 w-full bg-gray-800 text-white p-2">
      <p className="text-center text-sm">{text}</p>
      <button
        className="mt-1 px-2 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors duration-200 text-sm"
        onClick={handleClick}
      >
        See Magic
      </button>
    </footer>
  );
};

const mapStateToProps = (state: any) => ({
  text: state.footer.text,
});

const mapDispatchToProps = {
  setFooterText,
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);