/**
 * SIT WITH FIT — MAIN BOOTSTRAP
 * Modular initialization of all subsystems:
 *  - Cosmic Starfield & Comets (KMUTT Open House theme)
 *  - Background Audio (Dua Lipa - Levitating)
 *  - Showcase Selector
 *  - Posture Telemetry Simulator
 *  - Committee Defense 20-Round Q&A
 *  - Radar Analytics Chart
 */

import { initStarfield } from './starfield.js';
import { initBackgroundAudio } from './audio.js';
import { initShowcaseSelector } from './showcase.js';
import { initPostureSimulator } from './posture-sim.js';
import { initCommitteeQABank } from './committee.js';
import { initCharts } from './charts.js';

document.addEventListener('DOMContentLoaded', () => {
    initStarfield();
    initBackgroundAudio();
    initShowcaseSelector();
    initPostureSimulator();
    initCommitteeQABank();
    initCharts();
});
