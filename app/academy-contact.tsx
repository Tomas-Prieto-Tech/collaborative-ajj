export const academyEmail = 'thecollaborativeajj@gmail.com';

export function AcademyContact({ showInstagram = true }: { showInstagram?: boolean }) {
  return (
    <ul className="academy-contact" aria-label="Academy contact information">
      <li><a href={`mailto:${academyEmail}`}>{academyEmail}</a></li>
      <li><a href="tel:+16614777972">661-477-7972</a></li>
      {showInstagram && <li><a href="https://www.instagram.com/Collaborativeajj">Instagram: @Collaborativeajj</a></li>}
    </ul>
  );
}
