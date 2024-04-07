import { Link } from "@remix-run/react";

interface Props {
  title: string;
  isOpen?: boolean;
}

export const ExampleModal = ({ title, isOpen = false }: Props) => {
  return (
    <dialog open={isOpen}>
      <article>
        <header>
          <Link to="/" aria-label="Close" rel="prev" />
          <p>
            <strong>🗓️ {title}</strong>
          </p>
        </header>
        <p>
          We&apos;re excited to have you join us for our upcoming event. Please
          arrive at the museum on time to check in and get started.
        </p>
        <ul>
          <li>Date: Saturday, April 15</li>
          <li>Time: 10:00am - 12:00pm</li>
        </ul>
      </article>
    </dialog>
  );
};
