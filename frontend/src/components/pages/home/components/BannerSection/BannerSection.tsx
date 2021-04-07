import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { colorPalette } from 'stylesheet';

const WelcomeText = styled.span`
  text-shadow: 0 0 20px ${colorPalette.home.shadowOnImages};
`;

interface BannerSectionProps {
  backgroundSourceUrl: string;
  shouldDisplayText: boolean;
  type: 'image' | 'video' | 'carousel';
}

export const BannerSection: React.FC<BannerSectionProps> = ({
  backgroundSourceUrl,
  shouldDisplayText,
  type,
}) => {
  return (
    <div className="relative">
      {type === 'image' && (
        <img
          src={backgroundSourceUrl}
          className="object-cover object-top overflow-hidden h-bannerSectionMobile desktop:h-bannerSectionDesktop w-full"
          data-testid="image"
        />
      )}
      <div className="absolute bottom-0 top-0 right-0 left-0 bg-gradient-to-t from-gradientOnImages to-transparent" />
      {shouldDisplayText && (
        <WelcomeText
          data-testid="text"
          className="text-white font-bold text-Mobile-H1 desktop:text-H1 text-center desktop:leading-tight
          absolute bottom-20 desktop:bottom-40 left-10vw right-10vw"
        >
          <FormattedMessage id="home.welcome-text" />
        </WelcomeText>
      )}
    </div>
  );
};