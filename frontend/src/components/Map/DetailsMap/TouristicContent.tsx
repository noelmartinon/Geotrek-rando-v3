import { Popup } from 'components/Map/components/Popup';
import React from 'react';
import 'leaflet/dist/leaflet.css';
import { TouristicContentGeometry } from './DetailsMap';
import { HoverableMarker } from '../components/HoverableMarker';
import { HoverablePolyline } from '../components/HoverablePolyline';
import { HoverablePolygon } from '../components/HoverablePolygon';

export type PropsType = {
  contents?: TouristicContentGeometry[];
  type?: 'TREK' | 'TOURISTIC_CONTENT' | 'OUTDOOR_SITE' | 'TOURISTIC_EVENT';
};

export const TouristicContent: React.FC<PropsType> = ({ contents, type = 'TOURISTIC_CONTENT' }) => {
  return (
    <>
      {contents !== undefined &&
        contents.map(({ id, geometry, pictogramUri }) => {
          const idSplitted = String(id).split('-');
          const idContent = Number(idSplitted[idSplitted.length - 1]);

          switch (geometry.type) {
            case 'Point':
            case 'MultiPoint':
              return (
                <>
                  {(geometry.type === 'Point' ? [geometry.coordinates] : geometry.coordinates).map(
                    coordinates =>
                      pictogramUri ? (
                        <HoverableMarker
                          id={`${id}${JSON.stringify(coordinates)}`}
                          position={[coordinates.y, coordinates.x]}
                          pictogramUri={pictogramUri}
                          type={type}
                        >
                          <Popup id={Number(idContent)} type={type} />
                        </HoverableMarker>
                      ) : null,
                  )}
                </>
              );

            case 'LineString':
            case 'MultiLineString':
              return (
                <>
                  {(geometry.type === 'LineString'
                    ? [geometry.coordinates]
                    : geometry.coordinates
                  ).map(group => (
                    <HoverablePolyline
                      key={`${id}${JSON.stringify(group)}`}
                      id={id}
                      positions={group.map(point => [point.y, point.x])}
                    />
                  ))}
                </>
              );

            case 'Polygon':
            case 'MultiPolygon':
              return (
                <>
                  {(geometry.type === 'Polygon'
                    ? [geometry.coordinates]
                    : geometry.coordinates
                  ).map(group => (
                    <HoverablePolygon
                      key={`${id}${JSON.stringify(group)}`}
                      id={id}
                      positions={group.map(line =>
                        line.map<[number, number]>(point => [point.y, point.x]),
                      )}
                    />
                  ))}
                </>
              );

            default:
              return null;
          }
        })}
    </>
  );
};
