/**
 * SIT WITH FIT — MAIN BOOTSTRAP
 * Modular initialization of all subsystems
 */

import { initShowcaseSelector } from './showcase.js';
import { initPostureSimulator } from './posture-sim.js';
import { initCommitteeQABank } from './committee.js';
import { initCharts } from './charts.js';

document.addEventListener('DOMContentLoaded', () => {
    initShowcaseSelector();
    initPostureSimulator();
    initCommitteeQABank();
    initCharts();
});
