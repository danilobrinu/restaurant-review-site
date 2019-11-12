import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

function Map() {
  return <div className="w-full h-64 bg-indigo-400 rounded"></div>;
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
      <td className="w-8/12 py-2 align-top">{children}</td>
      <td className="py-2 text-right align-top">{action}</td>
    </tr>
  );
}

function Venue() {
  return (
    <div className="w-full">
      <Map />

      <Info>
        <InfoItem
          icon="map-marker"
          action={
            <a
              rel="noopener noreferrer"
              className="text-sm text-indigo-600 no-underline hover:underline"
              href="http://google.com"
              target="_blank"
            >
              Get directions
            </a>
          }
        >
          <span className="block text-sm">2889 Mission St</span>
          <span className="block text-sm">San Francisco, CA 94110</span>
          <span className="block text-sm"> Mission District</span>
        </InfoItem>

        <InfoItem
          icon="phone-alt"
          action={
            <a
              rel="noopener noreferrer"
              className="text-sm text-indigo-600 no-underline hover:underline"
              href="http://google.com"
              target="_blank"
            >
              Call
            </a>
          }
        >
          <span className="text-sm">+1 415-285-7117</span>
        </InfoItem>

        <InfoItem icon="globe">
          <a
            rel="noopener noreferrer"
            className="text-sm text-indigo-600 no-underline hover:underline"
            href="http://facebook.com"
            target="_blank"
          >
            facebook.com
          </a>
        </InfoItem>

        <InfoItem icon="clock">
          <span className="text-sm">Closed now</span>
        </InfoItem>

        <InfoItem icon="utensils">
          <span className="text-sm">Lunch, Dinner</span>
        </InfoItem>
      </Info>
    </div>
  );
}

export default Venue;
