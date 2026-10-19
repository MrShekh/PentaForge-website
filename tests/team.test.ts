import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import sharp from 'sharp';
import { team } from '../data/team';
import { teamIndex, teamKeyStep, teamSelectionPosition, teamSwipeStep } from '../lib/team-navigation';

test('team keyboard navigation wraps in both directions and Home/End select the correct people', () => {
  const count = team.length;
  assert.equal(team[teamIndex(teamKeyStep('ArrowLeft', 0, count)!, count)].id, 'abhishek');
  assert.equal(team[teamIndex(teamKeyStep('ArrowRight', count - 1, count)!, count)].id, 'asif');
  for (const position of [-101, -6, -1, 0, 2, 4, 5, 97]) {
    assert.equal(teamIndex(teamKeyStep('Home', position, count)!, count), 0);
    assert.equal(teamIndex(teamKeyStep('End', position, count)!, count), count - 1);
    for (let target = 0; target < count; target++) {
      const next = teamSelectionPosition(position, target, count);
      assert.equal(teamIndex(next, count), target);
      assert.ok(Math.abs(next - position) <= Math.floor(count / 2), 'Direct choices follow the shortest path');
    }
  }
  for (const key of ['Tab', 'Enter', ' ', 'ArrowDown', 'ArrowUp']) assert.equal(teamKeyStep(key, 0, count), null);
  assert.equal(teamKeyStep('ArrowRight', 0, 1), null);
});

test('touch/mouse navigation ignores taps, short drags and predominantly vertical scrolling', () => {
  assert.equal(teamSwipeStep(-80, 4), 1);
  assert.equal(teamSwipeStep(80, -4), -1);
  assert.equal(teamSwipeStep(-45, 0), 1);
  for (const [x, y] of [[0, 0], [44, 0], [0, 200], [80, 100], [-80, -100], [50, 45]]) assert.equal(teamSwipeStep(x, y), 0);
});

test('three owner-supplied members have unique IDs and real, metadata-stripped optimized portraits', async () => {
  assert.deepEqual(team.map(member => member.name), ['Asif', 'Kavya', 'Abhishek Vishwakarma']);
  assert.equal(new Set(team.map(member => member.id)).size, 3);
  const files = fs.readdirSync('public/team');
  for (const member of team) {
    assert.ok(member.role.length > 0);
    assert.ok(member.portrait);
    const filename = member.portrait.src.slice('/team/'.length);
    assert.ok(files.includes(filename), 'Exact filename case must work on Linux hosting');
    const file = `public/team/${filename}`;
    const metadata = await sharp(file).metadata();
    assert.equal(metadata.format, 'webp');
    assert.ok(metadata.width! <= 960 && metadata.height! <= 1280);
    assert.equal(metadata.exif, undefined);
    assert.ok(fs.statSync(file).size < 160_000);
  }
});
