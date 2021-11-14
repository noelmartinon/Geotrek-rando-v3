import { VisibleSectionContext } from 'components/pages/details/VisibleSectionContext';
import { TrekChildGeometry } from 'modules/details/interface';
import { Coordinate2D } from 'modules/interface';
import { SensitiveAreaGeometry } from 'modules/sensitiveArea/interface';
import React, { useContext } from 'react';
import { TouristicContentGeometry } from './DetailsMap';

import { MarkersWithIcon } from './MarkersWithIcon';
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
  poiPoints?: PointWithIcon[];
  touristicContentPoints?: TouristicContentGeometry[];
  pointsReference?: Coordinate2D[] | null;
  trekChildrenGeometry?: TrekChildGeometry[];
  sensitiveAreasGeometry?: SensitiveAreaGeometry[];
  trekChildrenMobileVisibility: Visibility;
  referencePointsMobileVisibility: Visibility;
  poiMobileVisibility: Visibility;
  touristicContentMobileVisibility: Visibility;
  parentId?: number;
};

export const MapChildren: React.FC<Props> = props => {
  const { visibleSection } = useContext(VisibleSectionContext);

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
    </>
  );
};
