import assert from 'node:assert/strict';
import test from 'node:test';
import { activeAnnouncements, californiaDate, announcementDate, type Announcement } from '../lib/sanity/content.ts';
const post = (id: string, date: string, showThrough: string | null = null): Announcement => ({ _id:id, title:id, message:'Message', date, showThrough });

test('expiration is inclusive through California midnight in winter and summer', () => {
  for (const [date, before, after] of [
    ['2026-01-10','2026-01-11T07:59:59Z','2026-01-11T08:00:00Z'],
    ['2026-07-10','2026-07-11T06:59:59Z','2026-07-11T07:00:00Z'],
    ['2026-03-08','2026-03-09T06:59:59Z','2026-03-09T07:00:00Z'],
    ['2026-11-01','2026-11-02T07:59:59Z','2026-11-02T08:00:00Z'],
  ]) {
    const posts = [post('one', date, date)];
    assert.equal(activeAnnouncements(posts, new Date(before)).length, 1);
    assert.equal(activeAnnouncements(posts, new Date(after)).length, 0);
  }
});
test('both repeated fall-back hours and spring-forward stay on the same date', () => {
  for (const instant of ['2026-11-01T08:30:00Z','2026-11-01T09:30:00Z']) assert.equal(californiaDate(new Date(instant)), '2026-11-01');
  for (const instant of ['2026-03-08T09:59:59Z','2026-03-08T10:00:00Z']) assert.equal(californiaDate(new Date(instant)), '2026-03-08');
});
test('filters expired posts before selecting newest three and does not mutate input', () => {
  const posts = [post('old','2026-01-01'),post('expired','2026-07-09','2026-07-09'),post('b','2026-07-08'),post('a','2026-07-08'),post('c','2026-07-07')];
  const snapshot = structuredClone(posts);
  assert.deepEqual(activeAnnouncements(posts, new Date('2026-07-10T12:00:00Z')).map(p=>p._id), ['a','b','c']);
  assert.deepEqual(posts, snapshot);
});
test('empty and all-expired content remains empty; no publication needed to expire', () => {
  assert.deepEqual(activeAnnouncements([]), []);
  assert.deepEqual(activeAnnouncements([post('expired','2020-01-01','2020-01-02')]), []);
});
test('display dates do not shift to the preceding day', () => {
  assert.equal(announcementDate('2026-01-01'), 'January 1, 2026');
});

test('future announcement dates control order, not scheduled publication', () => {
  assert.deepEqual(activeAnnouncements([post('future','2030-01-01')], new Date('2026-01-01T12:00:00Z')).map(p=>p._id), ['future']);
});
