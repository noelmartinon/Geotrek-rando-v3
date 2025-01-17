import { Bbox } from 'modules/details/interface';
import {
  Attachment,
  LineStringGeometry,
  MultiLineStringGeometry,
  MultiPointGeometry,
  MultiPolygonGeometry,
  PointGeometry,
  PolygonGeometry,
  RawAttachment,
  RawGeometryCollection,
} from 'modules/interface';
import { OutdoorCourseType } from '../outdoorCourseType/interface';
import { OutdoorRatingWithScale } from '../outdoorRating/interface';
import { OutdoorSite } from '../outdoorSite/interface';
import { Poi } from '../poi/interface';
import { TouristicContent } from '../touristicContent/interface';

export interface RawOutdoorCourse {
  id: string;
  attachments: RawAttachment[];
  name: string;
  geometry: RawGeometryCollection;
  duration: number;
  max_elevation?: number;
  height?: number;
  length?: number;
  cities: string[];
}

interface RawOutdoorCourseDetailsProperties extends RawOutdoorCourse {
  accessibility?: string;
  advice?: string;
  children?: string;
  description?: string;
  equipment?: string;
  gear?: string;
  min_elevation?: number;
  ratings: number[];
  ratings_description: string;
  site: number;
  structure: number;
  type?: number;
  url: string;
  pdf: string;
}

export interface RawOutdoorCourseDetails extends RawOutdoorCourse {
  id: string;
  bbox: number[];
  properties: RawOutdoorCourseDetailsProperties;
}

export interface OutdoorCourse {
  accessibility?: string;
  id: string;
  name: string;
  attachments: Attachment[];
  geometry:
    | PolygonGeometry
    | MultiPolygonGeometry
    | LineStringGeometry
    | MultiLineStringGeometry
    | PointGeometry
    | MultiPointGeometry;
  thumbnailUris: string[];
  duration: string | null;
  maxElevation: number;
  height: string | null;
  length: string | null;
  place: string;
}

export interface OutdoorCourseDetails extends OutdoorCourse {
  description?: string;
  bbox: Bbox;
  touristicContents: TouristicContent[];
  pois: Poi[];
  advice?: string;
  children: OutdoorSite[];
  gear: string;
  equipment: string;
  pdfUri: string;
  cities: string[];
  cities_raw: string[];
  ratings: OutdoorRatingWithScale[];
  ratingsDescription: string;
  typeCourse?: OutdoorCourseType;
}
