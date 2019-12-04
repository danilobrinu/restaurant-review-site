import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

////////////////////////////////////////////////////////////////////////////////////////////////////

import Divider from './Divider';

////////////////////////////////////////////////////////////////////////////////////////////////////

function ReviewPlaceholder() {
  return (
    <div className="mb-8">
      <div className="flex items-center">
        <div className="w-12 h-12">
          <div className="w-12 h-12 bg-gray-200 rounded-full" />
        </div>
        <div className="ml-2">
          <div className="text-sm leading-snug font-bold w-20 bg-gray-400">&nbsp;</div>
          <div className="text-sm leading-snug w-48 bg-gray-400">&nbsp;</div>
        </div>
      </div>
      <div className="my-4">
        <div dir="ltr" className="text-base w-full h-20 bg-gray-400">
          &nbsp;
        </div>
      </div>
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
      <td className="py-2 text-right align-top">{action}</td>
    </tr>
  );
}

function VenuePlaceholder() {
  return (
    <div className="w-full">
      <div className="w-full h-64 bg-gray-200 rounded" />

      <Info>
        <InfoItem
          icon="map-marker"
          action={<div className="text-sm inline-block w-24 bg-gray-400">&nbsp;</div>}
        >
          <div className="text-sm w-full h-20 bg-gray-400">&nbsp;</div>
        </InfoItem>

        <InfoItem
          icon="phone-alt"
          action={<div className="text-sm inline-block w-16 bg-gray-400">&nbsp;</div>}
        >
          <div className="text-sm w-40 bg-gray-400">&nbsp;</div>
        </InfoItem>

        <InfoItem icon="globe">
          <div className="text-sm w-24 bg-gray-400">&nbsp;</div>
        </InfoItem>

        <InfoItem icon="clock">
          <div className="text-sm w-24 bg-gray-400">&nbsp;</div>
        </InfoItem>

        <InfoItem icon="utensils">
          <div className="text-sm capitalize w-24 bg-gray-400">&nbsp;</div>
        </InfoItem>
      </Info>
    </div>
  );
}

function PlaceDetailsPlaceholder() {
  return (
    <div className="w-full">
      <header>
        <nav className="flex items-center absolute top-0 right-0 p-6">
          <div
            className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md cursor-pointer select-none"
            role="button"
            tabIndex="0"
          >
            <Icon className="text-gray-900" icon="times" />
          </div>
        </nav>

        <div className="mb-8">
          <div className="w-full h-64 bg-gray-100" />
        </div>
        <div className="px-6">
          <div className="m-0">
            <div className="text-xs uppercase font-bold w-24 bg-gray-400">&nbsp;</div>
          </div>
          <div className="mt-2">
            <div className="text-4xl font-bold leading-none my-2 w-full bg-gray-400">&nbsp;</div>
            <div className="mt-2">
              <div className="text-sm w-20 bg-gray-400">&nbsp;</div>
            </div>
          </div>
        </div>
      </header>

      <main className="mb-6">
        <Divider className="mx-6" />

        <section>
          <div className="mx-6">
            <VenuePlaceholder />
          </div>
        </section>

        <Divider className="mx-6" />

        <section>
          <div className="mx-6">
            <header className="mb-6">
              <div className="text-2xl font-bold w-32 bg-gray-400">&nbsp;</div>
            </header>

            <ReviewPlaceholder />
          </div>
        </section>

        <section>
          <div className="mx-6">
            <button className="w-full py-4 text-sm font-semibold leading-none text-white uppercase tracking-wider bg-indigo-600 rounded-lg">
              &nbsp;
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default PlaceDetailsPlaceholder;
