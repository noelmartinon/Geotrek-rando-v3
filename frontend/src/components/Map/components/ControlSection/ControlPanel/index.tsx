import styled from 'styled-components';
import { Florist } from 'components/Icons/Florist';
import { Line } from './Line';
import IconLocation from './IconLocation';
import IconInfo from './IconInfo';
import IconDrapeau from './IconDrapeau';
import IconPatrimoine from './IconPatrimoine';
import IconOutdoorSite from './IconOutdoorSite';
import IconOutdoorRoute from './IconOutdoorRoute';
import { ControlSectionProps } from '../ControlSection';

const Wrapper = styled.div`
  background: white;
  box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.15);
  padding: 16px;
  border-radius: 16px;
  width: 230px;
  display: flex;
  flex-flow: column;

  & button {
    margin-bottom: 16px;
  }

  & button:last-child {
    margin-bottom: 8px;
  }
`;

export const ControlPanel: React.FC<ControlSectionProps> = ({
  trekChildrenVisibility,
  toggleTrekChildrenVisibility,
  poiVisibility,
  togglePoiVisibility,
  referencePointsVisibility,
  toggleReferencePointsVisibility,
  touristicContentVisibility,
  toggleTouristicContentVisibility,
  informationDeskMobileVisibility,
  toggleInformationDeskVisibility,
  coursesVisibility,
  toggleCoursesVisibility,
  experiencesVisibility,
  toggleExperiencesVisibility,
}) => {
  return (
    <Wrapper>
      {trekChildrenVisibility !== null && (
        <Line
          Icon={IconLocation}
          active={trekChildrenVisibility === 'DISPLAYED'}
          toggle={toggleTrekChildrenVisibility}
          transKey="search.map.panel.trekChildren"
        />
      )}
      {poiVisibility !== null && (
        <Line
          Icon={Florist}
          active={poiVisibility === 'DISPLAYED'}
          toggle={togglePoiVisibility}
          transKey="search.map.panel.poi"
        />
      )}
      {referencePointsVisibility !== null && (
        <Line
          Icon={IconDrapeau}
          active={referencePointsVisibility === 'DISPLAYED'}
          toggle={toggleReferencePointsVisibility}
          transKey="search.map.panel.referencePoints"
        />
      )}
      {touristicContentVisibility !== null && (
        <Line
          Icon={IconPatrimoine}
          active={touristicContentVisibility === 'DISPLAYED'}
          toggle={toggleTouristicContentVisibility}
          transKey="search.map.panel.touristicContent"
        />
      )}
      {informationDeskMobileVisibility !== null && (
        <Line
          Icon={IconInfo}
          active={informationDeskMobileVisibility === 'DISPLAYED'}
          toggle={toggleInformationDeskVisibility}
          transKey="search.map.panel.informationDesks"
        />
      )}
      {coursesVisibility !== null && (
        <Line
          Icon={IconOutdoorRoute}
          active={coursesVisibility === 'DISPLAYED'}
          toggle={toggleCoursesVisibility}
          transKey="search.map.panel.courses"
        />
      )}
      {experiencesVisibility !== null && (
        <Line
          Icon={IconOutdoorSite}
          active={experiencesVisibility === 'DISPLAYED'}
          toggle={toggleExperiencesVisibility}
          transKey="search.map.panel.experiences"
        />
      )}
    </Wrapper>
  );
};
