export const academyEmail = 'thecollaborativeajj@gmail.com';

export function AcademyContact({ showInstagram = true }: { showInstagram?: boolean }) {
  return (
    <ul className="academy-contact" aria-label="Academy contact information">
      <li><a href={`mailto:${academyEmail}`}>{academyEmail}</a></li>
      <li><a href="tel:+16612059353">661-205-9353</a></li>
      {showInstagram && <li><a href="https://www.instagram.com/Collaborativeajj">Instagram: @Collaborativeajj</a></li>}
    </ul>
  );
}
