import Image from 'next/image';
import kevin from '../../assets/IMG_4102.jpeg';
import ramona from '../../assets/IMG_4079-preview.jpeg';

const instructors = [
  {
    id: 'kevin-ross',
    name: 'Professor Kevin Ross',
    role: 'Owner & head instructor',
    image: kevin,
    bio: [
      'Professor Kevin Ross is a Brazilian Jiu-Jitsu black belt, decorated IBJJF competitor, owner and head instructor of The Collaborative Bakersfield Gracie Allegiance Jiu Jitsu, retired California law-enforcement professional, and United States Marine Corps veteran.',
      'Kevin began his Brazilian Jiu-Jitsu journey in 2009, initially training under renowned instructor and competitor Dan Camarillo. As his journey continued, Kevin trained under Professor Matt Baker, one of several of Jean Jacques Machado’s black belts.',
      'On October 24, 2020, after more than eleven years of training, Kevin was awarded his Brazilian Jiu-Jitsu Black Belt by Professor Matt Baker.',
      'Throughout his Jiu-Jitsu journey, Kevin continually chose to test himself in competition, becoming a decorated IBJJF competitor.',
      'After several years as a black belt, Kevin took the next step in his Jiu-Jitsu journey and opened his own academy, The Collaborative.',
      'The name Collaborative reflects the philosophy behind the academy of people training, learning, teaching, and improving together—sharing knowledge rather than relying on only one person or one approach. Kevin believes knowledge should be shared and teammates should help one another improve.',
      'In recent years, another meaningful chapter in Kevin’s Jiu-Jitsu journey has been the friendships he has developed with Clark Gracie, his brother Ralston Gracie, and their father, Carley Gracie.',
      'Carley Gracie represents an important connection to the history of Brazilian Jiu-Jitsu in the United States as well as the first to train Marines in Quantico, VA. His sons, Clark and Ralston, have continued their family’s connection to the art through another generation.',
      'Kevin’s journey has evolved from student to competitor, black belt, instructor, mentor, and academy owner.',
    ],
  },
  {
    id: 'ramona-ross',
    name: 'Ramona Ross',
    role: 'Women’s & kids’ programs',
    image: ramona,
    bio: [
      'Ramona Ross is a Brazilian Jiu-Jitsu black belt, earning her rank in October 2021, with a rich history of high-level competition highlighted by placing at the IBJJF Pan American Championships and competing across all belt levels. Training since 2009, Ramona channels her decade-plus of experience into leading our Women’s and Kids’ programs.',
      'As a smaller athlete, she is a living testament to the power of BJJ, using flawless technique and leverage to overcome size disadvantages. Her engaging coaching style creates a safe, high-energy environment where children develop discipline and women build elite skills and unshakable confidence.',
    ],
  },
  {
    id: 'andrew-ross',
    name: 'Andrew Ross',
    role: 'Black belt instructor',
    image: null,
    bio: [
      'Andrew Ross is a Brazilian Jiu-Jitsu black belt (2024) who has been training continuously since 2009. Known for his modern, highly analytical approach, Andrew specializes in contemporary guard systems, advanced mechanics, and the strategic frameworks defining the modern era of grappling.',
      'His deep grappling foundation includes an extensive background as a collegiate wrestler, which seamlessly blends into his top-tier pressure and positional control. He is also trained in Gracie Survival Tactics (GST) and serves as a defensive tactics instructor for his department, bringing valuable real-world, tactical application to his martial arts foundation.',
      'At our academy, Andrew uses a calm, deliberate coaching style to break down complex, high-level movements into clear, calculated, and actionable details. Emphasizing leverage and precision over raw athleticism, he creates a focused and encouraging environment perfectly suited for students looking to build a rock-solid technical foundation and methodically elevate their game.',
    ],
  },
];

export default function Instructors() {
  return (
    <>
      <section className="page-title">
        <p className="eyebrow">Learn from the team</p>
        <h1>Guidance for<br /><em>every journey.</em></h1>
      </section>
      <div className="instructor-list section">
        {instructors.map((instructor) => (
          <article className="instructor-profile" key={instructor.id} aria-labelledby={instructor.id}>
            <div className="instructor-portrait">
              {instructor.image ? (
                <Image
                  src={instructor.image}
                  alt={`${instructor.name} wearing a white gi and black belt at the academy`}
                  fill
                  sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1170px) 36vw, 400px"
                />
              ) : (
                <div className="instructor-placeholder">
                  <span aria-hidden="true">AR</span>
                  <p>Photo coming soon</p>
                </div>
              )}
            </div>
            <div className="instructor-bio">
              <p className="eyebrow">{instructor.role}</p>
              <h2 id={instructor.id}>{instructor.name}</h2>
              {instructor.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
