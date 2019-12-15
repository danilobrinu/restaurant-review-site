import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { gmapEncodeURI } from '../helpers';

function Map({ name }) {
  const query = gmapEncodeURI(name);

  return (
    <div className="w-full h-64 bg-gray-200 rounded">
      <iframe
        title="Map"
        width="100%"
        height="256"
        frameBorder="0"
        className="h-full h-64 b-0"
        src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GMAPS_API_KEY}&q=${query}`}
        allowFullScreen
      />
    </div>
  );
}

function Info({ children }) {
  return (
    <table className="w-full mt-6">
      <tbody>{children}</tbody>
    </table>
  );
}

function InfoItem({ icon, action, children }) {
  return (
    <tr>
      <td className="w-6 pr-2 py-2 align-top">
        <Icon icon={icon} />
      </td>
      <td className="w-6/12 py-2 align-top">{children}</td>
      <td className="py-2 text-right align-top">{action || <div>&nbsp;</div>}</td>
    </tr>
  );
}

function Venue({ name, address, gmap, phoneNumber, website, isOpenNow, types }) {
  return (
    <div className="w-full">
      <Map name={name} />

      <Info>
        <InfoItem
          icon="map-marker"
          action={
            gmap ? (
              <a
                rel="noopener noreferrer"
                className="text-sm text-indigo-600 no-underline hover:underline"
                href={gmap}
                target="_blank"
              >
                Get directions
              </a>
            ) : null
          }
        >
          <span className="text-sm text-gray-900">{address}</span>
        </InfoItem>

        {phoneNumber.length > 0 && (
          <InfoItem
            icon="phone-alt"
            action={
              <a
                rel="noopener noreferrer"
                className="text-sm text-indigo-600 no-underline hover:underline"
                href={`tel:${phoneNumber.replace(/ /g, '')}`}
                target="_blank"
              >
                Call
              </a>
            }
          >
            <span className="text-sm text-gray-900">{phoneNumber}</span>
          </InfoItem>
        )}

        {website.length > 0 && (
          <InfoItem icon="globe">
            <a
              rel="noopener noreferrer"
              className="text-sm text-indigo-600 no-underline hover:underline"
              href={website}
              target="_blank"
            >
              {website.indexOf('facebook') > -1 ? 'facebook.com' : website}
            </a>
          </InfoItem>
        )}

        <InfoItem icon="clock">
          <span className="text-sm text-gray-900">{`${isOpenNow ? 'Open' : 'Closed now'}`}</span>
        </InfoItem>

        <InfoItem icon="utensils">
          <span className="text-sm capitalize text-gray-900">{types.join(', ')}</span>
        </InfoItem>
      </Info>
    </div>
  );
}

export default Venue;
