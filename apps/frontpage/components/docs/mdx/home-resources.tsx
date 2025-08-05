import { ChevronSmallRightIcon } from '@storybook/icons';
import Link from 'next/link';

export function HomeResources() {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 mb-12 sm:grid-cols-2">
        <Card href="/docs/essentials" title="Essential addons" />
        <Card external href="/addons" title="Addon catalog" />
        <Card external href="/addons" title="Recipes" />
        <Card href="/docs/builders" title="Builders" />
        <Card href="/docs/contribute" title="How to contribute" />
        <Card href="/docs/releases/migration-guide" title="Migrate to 9.0" />
        <Card href="/docs/faq" title="FAQ" />
      </div>
      <div className="grid grid-cols-1 gap-4 pt-12 mb-6 border-t border-slate-200 sm:grid-cols-2 dark:border-slate-700">
        <div>
          <p className="mb-2 text-xl font-bold">Need some help?</p>
          <a
            className="flex items-center gap-1 text-blue-500 transition-colors hover:text-blue-600"
            href="https://github.com/storybookjs/storybook/discussions/categories/help"
            rel="noopener"
            target="_blank"
          >
            Join a discussion on GitHub
            <ChevronSmallRightIcon />
          </a>
        </div>
        <div>
          <p className="mb-2 text-xl font-bold">Latest product updates</p>
          <a
            className="flex items-center gap-1 text-blue-500 transition-colors hover:text-blue-600"
            href="https://storybook.js.org/releases/"
            rel="noopener"
            target="_blank"
          >
            See changelog
            <ChevronSmallRightIcon />
          </a>
        </div>
      </div>
    </>
  );
}

function Card({
  href,
  title,
  external = false,
}: {
  href: string;
  title: string;
  external?: boolean;
}) {
  const Slot = external ? 'a' : Link;

  return (
    <Slot
      className="flex items-center gap-3 text-blue-500 transition-colors hover:text-blue-600"
      href={href}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.5105 20.4895C14.2643 20.7357 13.8651 20.7357 13.6189 20.4895L7.51028 14.3809C7.26406 14.1347 7.26406 13.7355 7.51028 13.4892L13.4893 7.51026C13.7355 7.26403 14.1347 7.26403 14.3809 7.51026L20.4895 13.6189C20.7357 13.8651 20.7357 14.2643 20.4895 14.5105L14.5105 20.4895Z"
          strokeWidth="2"
          className="fill-white stroke-blue-500 dark:fill-none"
        />
      </svg>
      {title}
    </Slot>
  );
}
