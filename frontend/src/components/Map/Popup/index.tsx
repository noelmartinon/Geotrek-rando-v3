import React from 'react';
import styled, { css } from 'styled-components';
import { Popup as LeafletPopup } from 'react-leaflet';

import { desktopOnly, getSpacing } from 'stylesheet';
import { textEllipsisAfterNLines } from 'services/cssHelpers';

export const Popup: React.FC = () => {
  return (
    <StyledPopup closeButton={false}>
      <CoverImage src="https://geotrekdemo.ecrins-parcnational.fr/media/paperclip/trekking_trek/501/019264_hd_1.jpg" />
      <div className="p-4">
        <span className="text-P2 mb-1 text-greyDarkColored hidden desktop:inline">
          Saint-Etienne-du-Valdonnez
        </span>
        <Title className="text-Mobile-C1 text-primary1 font-bold desktop:text-H4">
          Balade au pays des menhirs de Brocéliandes avec un titre très long
        </Title>
      </div>
    </StyledPopup>
  );
};

const desktopWidth = 288;
const desktopImgHeight = 122;
const mobileWidth = 215;
const mobileImgHeight = 133;

const Title = styled.span`
  ${textEllipsisAfterNLines(2)}

  ${desktopOnly(css`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  `)}
`;

const StyledPopup = styled(LeafletPopup)`
  .leaflet-popup-content {
    margin: 0;

    display: flex;
    flex-direction: column;
  }

  .leaflet-popup-content-wrapper {
    padding: 0;

    border-radius: ${getSpacing(4)};
    overflow: hidden;

    width: ${mobileWidth}px;
    ${desktopOnly(css`
      width: ${desktopWidth}px;
    `)};
  }
`;

const CoverImage = styled.img`
  height: ${mobileImgHeight}px;
  ${desktopOnly(css`
    height: ${desktopImgHeight}px;
  `)}
  object-fit: cover;
`;
