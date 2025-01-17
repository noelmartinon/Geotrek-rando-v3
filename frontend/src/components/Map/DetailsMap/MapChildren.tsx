import { VisibleSectionContext } from 'components/pages/details/VisibleSectionContext';
import { TrekChildGeometry } from 'modules/details/interface';
import { InformationDesk } from 'modules/informationDesk/interface';
import { Coordinate2D } from 'modules/interface';
import { OutdoorSite } from 'modules/outdoorSite/interface';
import { SensitiveAreaGeometry } from 'modules/sensitiveArea/interface';
import React, { useContext } from 'react';
import { useMediaPredicate } from 'react-media-hook';
import { TouristicContentGeometry } from './DetailsMap';

import { MarkersWithIcon } from './MarkersWithIcon';
import { PointReport } from './PointReport';
import { PointsInformationDesk } from './PointsInformationDesk';
import { PointsReference } from './PointsReference';
import { SensitiveAreas } from './SensitiveAreas';
import { TouristicContent } from './TouristicContent';
import { TrekChildren } from './TrekChildren';
import { Visibility } from './useDetailsMap';

export interface PointWithIcon {
  location: { x: number; y: number };
  pictogramUri: string;
  name: string;
  id: string;
}

type Props = {
  courses: OutdoorSite[];
  experiences: OutdoorSite[];
  poiPoints?: PointWithIcon[];
  touristicContentPoints?: TouristicContentGeometry[];
  pointsReference?: Coordinate2D[] | null;
  trekChildrenGeometry?: TrekChildGeometry[];
  sensitiveAreasGeometry?: SensitiveAreaGeometry[];
  trekChildrenMobileVisibility: Visibility;
  referencePointsMobileVisibility: Visibility;
  poiMobileVisibility: Visibility;
  touristicContentMobileVisibility: Visibility;
  coursesVisibility: Visibility;
  experiencesVisibility: Visibility;
  reportVisibility: boolean;
  parentId?: number;
  informationDeskMobileVisibility: Visibility;
  informationDesks?: InformationDesk[];
};

export const MapChildren: React.FC<Props> = props => {
  const { visibleSection } = useContext(VisibleSectionContext);
  const isMobile = useMediaPredicate('(max-width: 1024px)');

  return (
    <>
      {(visibleSection === 'children' ||
        visibleSection === 'courses' ||
        props.trekChildrenMobileVisibility === 'DISPLAYED') && (
        <TrekChildren trekChildrenGeometry={props.trekChildrenGeometry} parentId={props.parentId} />
      )}

      {(visibleSection === 'description' ||
        props.referencePointsMobileVisibility === 'DISPLAYED') && (
        <PointsReference pointsReference={props.pointsReference ?? undefined} />
      )}

      {(visibleSection === 'experiences' || props.experiencesVisibility === 'DISPLAYED') && (
        <TouristicContent
          contents={
            props.experiences.map(e => ({
              ...e,
              pictogramUri: e.practice?.pictogram,
            })) as TouristicContentGeometry[]
          }
          type="OUTDOOR_SITE"
        />
      )}

      {(visibleSection === 'courses' || props.coursesVisibility === 'DISPLAYED') && (
        <TouristicContent
          contents={
            props.courses.map(e => ({
              ...e,
              pictogramUri: null,
            })) as TouristicContentGeometry[]
          }
          type="OUTDOOR_SITE"
        />
      )}

      {(visibleSection === 'poi' || props.poiMobileVisibility === 'DISPLAYED') && (
        <MarkersWithIcon points={props.poiPoints} />
      )}

      {(visibleSection === 'touristicContent' ||
        props.touristicContentMobileVisibility === 'DISPLAYED') && (
        <TouristicContent contents={props.touristicContentPoints} />
      )}

      {visibleSection === 'sensitiveAreasRef' && (
        <SensitiveAreas contents={props.sensitiveAreasGeometry} />
      )}

      {(visibleSection === 'practicalInformations' ||
        props.informationDeskMobileVisibility === 'DISPLAYED') && (
        <PointsInformationDesk informationDesks={props.informationDesks} />
      )}

      {(isMobile || visibleSection === 'report') && props.reportVisibility && <PointReport />}
    </>
  );
};
