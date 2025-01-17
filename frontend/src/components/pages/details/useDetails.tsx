import { useQuery } from 'react-query';
import { Details, TrekFamily } from 'modules/details/interface';
import { getDetails, getTrekFamily } from 'modules/details/connector';
import { isUrlString } from 'modules/utils/string';
import { ONE_DAY } from 'services/constants/staleTime';
import { isRessourceMissing } from 'services/routeUtils';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import { routes } from 'services/routes';
import { useMediaPredicate } from 'react-media-hook';
// @ts-ignore
import debounce from 'debounce';
import { getDimensions } from './utils';

export type DetailsHeaderSection = Partial<Record<DetailsSections, HTMLDivElement | null>>;

export type DetailsSections =
  | 'preview'
  | 'children'
  | 'poi'
  | 'description'
  | 'practicalInformations'
  | 'accessibility'
  | 'touristicContent'
  | 'sensitiveAreasRef'
  | 'courses'
  | 'report'
  | 'experiences';

interface SectionPosition {
  top: number;
  bottom: number;
}

export type DetailsSectionsPosition = Partial<Record<DetailsSections, SectionPosition>>;

export const useDetails = (
  detailsUrl: string | string[] | undefined,
  parentId: string | string[] | undefined,
  language: string,
) => {
  const id = isUrlString(detailsUrl) ? detailsUrl.split('-')[0] : '';
  const path = isUrlString(detailsUrl) ? decodeURI(detailsUrl) : '';
  const router = useRouter();
  const { data, refetch, isLoading } = useQuery<Details, Error>(
    `details-${id}-${language}`,
    () => getDetails(id, language),
    {
      enabled: isUrlString(detailsUrl),
      onError: async error => {
        if (isRessourceMissing(error)) {
          await router.push(routes.HOME);
        }
      },
      staleTime: ONE_DAY,
    },
  );

  const isMobile = useMediaPredicate('(max-width: 1024px)');

  const parentIdString = isUrlString(parentId) ? parentId : '';
  const { data: trekFamily } = useQuery<TrekFamily | null, Error>(
    `trekFamily-${parentIdString}-${language}`,
    () => getTrekFamily(isUrlString(parentId) ? parentId : '', language),
    {
      enabled: isUrlString(parentId),
      staleTime: ONE_DAY,
    },
  );

  const sectionsReferences = useRef<DetailsHeaderSection>({});
  const [sectionsPositions, setSectionsPositions] = useState<DetailsSectionsPosition>({});

  const useSectionReferenceCallback = (sectionName: DetailsSections) =>
    useCallback((node: HTMLDivElement | null) => {
      if (node !== null) {
        sectionsReferences.current[sectionName] = node;
        setSectionsPositions(currentSectionsPositions => ({
          ...currentSectionsPositions,
          [sectionName]: getDimensions(node),
        }));
      }
    }, []);

  const handleResize = useCallback(
    debounce(
      () => {
        setSectionsPositions(currentSectionsPositions => {
          if (sectionsReferences.current === null) {
            return currentSectionsPositions;
          }
          return Object.entries(sectionsReferences.current).reduce(
            (obj, [name, ref]) => ({
              ...obj,
              [name]: getDimensions(ref),
            }),
            {},
          );
        });
      },
      1000,
      false,
    ),
    [],
  );

  useLayoutEffect(() => {
    global.addEventListener('resize', handleResize);
    global.addEventListener('scroll', handleResize);
    return () => {
      global.removeEventListener('resize', handleResize);
      global.removeEventListener('scroll', handleResize);
    };
  }, []);

  const setPreviewRef = useSectionReferenceCallback('preview');
  const setChildrenRef = useSectionReferenceCallback('children');
  const setPoisRef = useSectionReferenceCallback('poi');
  const setDescriptionRef = useSectionReferenceCallback('description');
  const setPracticalInformationsRef = useSectionReferenceCallback('practicalInformations');
  const setTouristicContentsRef = useSectionReferenceCallback('touristicContent');
  const setAccessibilityRef = useSectionReferenceCallback('accessibility');
  const setSensitiveAreasRef = useSectionReferenceCallback('sensitiveAreasRef');
  const setReportRef = useSectionReferenceCallback('report');

  const intl = useIntl();

  const [mobileMapState, setMobileMapState] = useState<'DISPLAYED' | 'HIDDEN' | null>('HIDDEN');
  const displayMobileMap = () => setMobileMapState('DISPLAYED');
  const hideMobileMap = () => setMobileMapState('HIDDEN');

  useEffect(() => {
    if (!isMobile) {
      setMobileMapState(prevMobileMapState => {
        if (prevMobileMapState === 'DISPLAYED') {
          return 'HIDDEN';
        }
        return null;
      });
    }
  }, [setMobileMapState, isMobile]);

  return {
    id,
    details: data,
    trekFamily,
    refetch,
    isLoading,
    sectionsReferences,
    setPreviewRef,
    setChildrenRef,
    setPoisRef,
    setDescriptionRef,
    setPracticalInformationsRef,
    setTouristicContentsRef,
    setAccessibilityRef,
    setSensitiveAreasRef,
    setReportRef,
    sectionsPositions,
    intl,
    mobileMapState,
    displayMobileMap,
    hideMobileMap,
    path,
  };
};
