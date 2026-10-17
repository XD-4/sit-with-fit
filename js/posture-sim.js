/**
 * SIT WITH FIT — INTERACTIVE POSTURE ALIGNMENT SIMULATOR
 * Controls Biomechanical Silhouette, Spine Curvature, and FSR Heatmap
 */

import { postureConfigs } from './posture-data.js';

export function initPostureSimulator() {
    const tabs = document.querySelectorAll('.p-tab-btn');
    
    // Top HUD Elements
    const hudModeBadge = document.getElementById('hudModeBadge');
    const hudModeText = document.getElementById('hudModeText');

    // KPI Elements
    const scoreVal = document.getElementById('postureScoreVal');
    const scoreSub = document.getElementById('postureScoreSub');
    const scoreBar = document.getElementById('postureScoreBar');
    const scoreGrade = document.getElementById('postureGradeBadge');

    const balanceVal = document.getElementById('postureBalanceVal');
    const balanceSub = document.getElementById('postureBalanceSub');
    const balanceBar = document.getElementById('postureBalanceBar');
    const balanceGrade = document.getElementById('balanceGradeBadge');

    const lumbarVal = document.getElementById('lumbarContactVal');
    const lumbarSub = document.getElementById('lumbarContactSub');
    const lumbarBar = document.getElementById('lumbarContactBar');
    const lumbarGrade = document.getElementById('lumbarGradeBadge');

    const hapticVal = document.getElementById('hapticStatusVal');
    const hapticSub = document.getElementById('hapticStatusSub');
    const hapticBar = document.getElementById('hapticStatusBar');
    const hapticGrade = document.getElementById('hapticGradeBadge');

    // Spine & Silhouette Elements
    const spineAngleMetric = document.getElementById('spineAngleMetric');
    const spinePath = document.getElementById('spineCurvePath');
    const vCervical = document.getElementById('vCervical');
    const vThoracic = document.getElementById('vThoracic');
    const vLumbar = document.getElementById('vLumbar');
    const lblNeck = document.getElementById('lblNeck');
    const lblThoracic = document.getElementById('lblThoracic');
    const lblLumbar = document.getElementById('lblLumbar');
    const spineBadge = document.getElementById('spineStatusBadge');
    const spineBadgeText = document.getElementById('spineBadgeText');

    // Heatmap Elements
    const heatmapStatus = document.getElementById('heatmapPressureStatus');
    const heatLumbar = document.getElementById('heatLumbar');
    const heatPelvisL = document.getElementById('heatPelvisL');
    const heatPelvisR = document.getElementById('heatPelvisR');
    const heatCoccyx = document.getElementById('heatCoccyx');
    const lblLumbarVal = document.getElementById('lblLumbarVal');
    const lblPelvisLVal = document.getElementById('lblPelvisLVal');
    const lblPelvisRVal = document.getElementById('lblPelvisRVal');

    // Live Advice
    const adviceBox = document.getElementById('postureAdviceBox');
    const adviceText = document.getElementById('adviceText');
    const adviceIconWrap = document.getElementById('adviceIconWrap');

    function applyPosture(key) {
        const configs = window.postureConfigs || postureConfigs;
        const conf = configs[key];
        if (!conf) return;

        // Update Top HUD
        if (hudModeBadge && hudModeText) {
            hudModeText.textContent = conf.hudMode;
            hudModeBadge.style.background = conf.hudModeBg;
            hudModeBadge.style.borderColor = conf.hudModeBorder;
            hudModeBadge.style.color = conf.hudModeColor;
        }

        // Update 4 KPIs
        if (scoreVal) {
            scoreVal.textContent = conf.score;
            scoreVal.style.color = conf.scoreColor;
            scoreSub.textContent = conf.scoreSub;
            scoreBar.style.width = conf.scoreBar;
            scoreBar.style.background = conf.scoreColor;
            if (scoreGrade) scoreGrade.textContent = conf.scoreGrade;
        }

        if (balanceVal) {
            balanceVal.textContent = conf.balance;
            balanceSub.textContent = conf.balanceSub;
            balanceBar.style.width = conf.balanceBar;
            if (balanceGrade) balanceGrade.textContent = conf.balanceGrade;
        }

        if (lumbarVal) {
            lumbarVal.textContent = conf.lumbar;
            lumbarSub.textContent = conf.lumbarSub;
            lumbarBar.style.width = conf.lumbarBar;
            if (lumbarGrade) lumbarGrade.textContent = conf.lumbarGrade;
        }

        if (hapticVal) {
            hapticVal.textContent = conf.haptic;
            hapticVal.style.color = conf.hapticColor;
            hapticSub.textContent = conf.hapticSub;
            hapticBar.style.width = conf.hapticBar;
            hapticBar.style.background = conf.hapticColor;
            if (hapticGrade) hapticGrade.textContent = conf.hapticGrade;
        }

        // Switch Active Human Silhouette
        const allBodies = document.querySelectorAll('.human-silhouette-group');
        allBodies.forEach(b => b.classList.remove('active'));

        const activeBody = document.getElementById(`body-${key}`);
        if (activeBody) {
            activeBody.classList.add('active');
        }

        // Update Spine Curvature & Glowing Vertebrae
        if (spineAngleMetric) spineAngleMetric.textContent = conf.spineAngleMetric;
        if (spinePath) {
            spinePath.setAttribute('d', conf.spinePathD);
            spinePath.setAttribute('stroke', conf.spineStroke);
        }

        if (vCervical) {
            vCervical.setAttribute('cx', conf.vCervical.cx);
            vCervical.setAttribute('cy', conf.vCervical.cy);
            vCervical.setAttribute('stroke', conf.vCervical.stroke);
        }
        if (vThoracic) {
            vThoracic.setAttribute('cx', conf.vThoracic.cx);
            vThoracic.setAttribute('cy', conf.vThoracic.cy);
            vThoracic.setAttribute('stroke', conf.vThoracic.stroke);
        }
        if (vLumbar) {
            vLumbar.setAttribute('cx', conf.vLumbar.cx);
            vLumbar.setAttribute('cy', conf.vLumbar.cy);
            vLumbar.setAttribute('stroke', conf.vLumbar.stroke);
        }

        if (lblNeck) lblNeck.textContent = conf.lblNeck;
        if (lblThoracic) lblThoracic.textContent = conf.lblThoracic;
        if (lblLumbar) lblLumbar.textContent = conf.lblLumbar;

        if (spineBadge && spineBadgeText) {
            spineBadgeText.textContent = conf.spineBadgeText;
            spineBadge.style.background = conf.spineBadgeBg;
            spineBadge.style.borderColor = conf.spineBadgeBorder;
            spineBadge.style.color = conf.spineBadgeColor;
        }

        // Update Pressure Heatmap Fills
        if (heatmapStatus) heatmapStatus.textContent = conf.heatmapPressureStatus;
        if (heatLumbar) {
            heatLumbar.setAttribute('fill', conf.heatLumbarFill);
            heatLumbar.style.opacity = conf.heatLumbarOpacity;
        }
        if (heatPelvisL) {
            heatPelvisL.setAttribute('fill', conf.heatPelvisLFill);
            heatPelvisL.style.opacity = conf.heatPelvisLOpacity;
        }
        if (heatPelvisR) {
            heatPelvisR.setAttribute('fill', conf.heatPelvisRFill);
            heatPelvisR.style.opacity = conf.heatPelvisROpacity;
        }
        if (heatCoccyx) {
            heatCoccyx.setAttribute('fill', conf.heatCoccyxFill);
        }

        if (lblLumbarVal) lblLumbarVal.textContent = conf.lblLumbarVal;
        if (lblPelvisLVal) lblPelvisLVal.textContent = conf.lblPelvisLVal;
        if (lblPelvisRVal) lblPelvisRVal.textContent = conf.lblPelvisRVal;

        // Update Live Advice
        if (adviceText) adviceText.innerHTML = conf.advice;
        if (adviceBox) adviceBox.style.borderLeftColor = conf.adviceBorder;
        if (adviceIconWrap) {
            adviceIconWrap.style.background = conf.adviceIconBg;
            adviceIconWrap.style.color = conf.adviceIconColor;
        }
    }

    // Tab Event Listeners
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            applyPosture(tab.getAttribute('data-posture'));
        });
    });

    // Initialize with optimal posture
    applyPosture('optimal');
}

// Global attach
if (typeof window !== 'undefined') {
    window.initPostureSimulator = initPostureSimulator;
}
