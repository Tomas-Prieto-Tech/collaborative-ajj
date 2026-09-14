import { AcademyAddress } from '../academy-address';
import { AcademyContact } from '../academy-contact';
import { ScheduleEmbed } from './schedule-embed';

const scheduleUrl = 'https://api.bjjlink.com/pub/academy/6a970855f21d570012ebc4cc/schedule';

export default function Schedule() {
  return (
    <>
      <section className="page-title">
        <p className="eyebrow">Make time to train</p>
        <h1>See you on<br /><em>the mats.</em></h1>
      </section>
      <section className="schedule-section section" aria-label="Class schedule">
        <div className="schedule-toolbar">
          <p>Find your next class.</p>
          <p className="schedule-fallback">Schedule not loading?{' '}
            <a href={scheduleUrl} target="_blank" rel="noopener noreferrer">Open in a new tab <span aria-hidden="true">↗</span></a>
          </p>
        </div>
        <ScheduleEmbed scheduleUrl={scheduleUrl} />
        <div className="schedule-details">
          <div className="schedule-location">
            <h2>Get in touch</h2>
            <AcademyContact />
          </div>
          <div className="schedule-location">
            <h2>Visit the academy</h2>
            <AcademyAddress />
          </div>
        </div>
      </section>
    </>
  );
}
