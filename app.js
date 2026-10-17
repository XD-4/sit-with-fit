/**
 * SIT WITH FIT — JAVASCRIPT CONTROLLER
 * Focus: Posture Alignment Simulator & Concise Committee Defense
 */

document.addEventListener('DOMContentLoaded', () => {
    initShowcaseSelector();
    initPostureSimulator();
    initCommitteeQABank();
    initCharts();
    initSlideDeckPresentation();
});

/* ==========================================================================
   1. HERO SHOWCASE IMAGE SELECTOR
   ========================================================================== */
function initShowcaseSelector() {
    const cards = document.querySelectorAll('.selector-card');
    const mainImg = document.getElementById('heroActiveImg');
    const tagText = document.getElementById('heroActiveTag');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            cards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');

            const newImg = card.getAttribute('data-img');
            const newTag = card.getAttribute('data-tag');

            mainImg.style.opacity = '0';
            setTimeout(() => {
                mainImg.src = newImg;
                tagText.textContent = newTag;
                mainImg.style.opacity = '1';
            }, 120);
        });
    });
}

/* ==========================================================================
   2. INTERACTIVE POSTURE ALIGNMENT SIMULATOR (21ST.DEV & ACETERNITY HUD)
   ========================================================================== */
const postureConfigs = {
    optimal: {
        score: "98%",
        scoreColor: "#10B981",
        scoreSub: "สรีระสมบูรณ์แบบ (S-Curve)",
        scoreBar: "98%",
        scoreGrade: "GRADE A",
        balance: "50% / 50%",
        balanceSub: "กระจายน้ำหนักสมดุล ซ้าย-ขวา",
        balanceBar: "50%",
        balanceGrade: "50:50",
        lumbar: "แนบกระชับ 95%",
        lumbarSub: "พยุงส่วนเอว L1–L5 พอดี",
        lumbarBar: "95%",
        lumbarGrade: "L1–L5",
        haptic: "ปกติ (เงียบ)",
        hapticColor: "#94A3B8",
        hapticSub: "ไม่มีสัญญาณสั่นรบกวน",
        hapticBar: "0%",
        hapticGrade: "DEBOUNCE",
        hudMode: "S-CURVE ALIGNMENT OPTIMAL",
        hudModeBg: "rgba(16, 185, 129, 0.12)",
        hudModeBorder: "rgba(16, 185, 129, 0.3)",
        hudModeColor: "#10B981",
        spineAngleMetric: "Lordosis: 35° (Optimal)",
        spinePathD: "M 120 63 Q 106 110, 112 145 Q 105 175, 120 200",
        spineStroke: "url(#spineGradientOptimal)",
        headCx: "120",
        headStroke: "#10B981",
        headFill: "rgba(16, 185, 129, 0.2)",
        earCx: "120",
        vCervical: { cx: 114, cy: 80, stroke: "#10B981" },
        vThoracic: { cx: 108, cy: 125, stroke: "#10B981" },
        vLumbar: { cx: 110, cy: 165, stroke: "#00E5FF" },
        lblNeck: "C1–C7 Neck: 12° (Normal)",
        lblThoracic: "T1–T12 Thoracic: 32° (Optimal)",
        lblLumbar: "L1–L5 Lumbar: Support 95%",
        spineBadgeText: "แนวกระดูก S-Curve สรีระสมบูรณ์แบบ",
        spineBadgeBg: "rgba(16, 185, 129, 0.12)",
        spineBadgeBorder: "rgba(16, 185, 129, 0.3)",
        spineBadgeColor: "#34D399",
        heatmapPressureStatus: "Isobar Balance: 98%",
        heatLumbarFill: "url(#gradLumbarActive)",
        heatLumbarOpacity: "1",
        heatPelvisLFill: "url(#gradOptimalHeat)",
        heatPelvisRFill: "url(#gradOptimalHeat)",
        heatPelvisLOpacity: "1",
        heatPelvisROpacity: "1",
        heatCoccyxFill: "none",
        lblLumbarVal: "LUMBAR: 95%",
        lblPelvisLVal: "L: 50%",
        lblPelvisRVal: "R: 50%",
        advice: "<strong>การวินิจฉัยสรีระ (AI Diagnosis):</strong> ท่าทางนี้กระจายน้ำหนักได้สมดุล 50/50 สรีระกระดูกสันหลังอยู่ในแนวธรรมชาติ ไม่เกิดแรงกดทับที่หมอนรองกระดูกส่วนเอว ระบบประมวลผลบนเครื่อง (Edge) บันทึกค่าสุขภาพแบบส่วนตัว",
        adviceBorder: "var(--accent-cyan)",
        adviceIconBg: "rgba(0, 229, 255, 0.15)",
        adviceIconColor: "var(--accent-cyan)"
    },
    slouch: {
        score: "38%",
        scoreColor: "#EF4444",
        scoreSub: "หลังค่อม / ยื่นคอ (C-Curve)",
        scoreBar: "38%",
        scoreGrade: "GRADE F",
        balance: "46% / 54%",
        balanceSub: "น้ำหนักเทไปข้างหน้า หลังส่วนเอวลอย",
        balanceBar: "46%",
        balanceGrade: "ANTERIOR",
        lumbar: "หลุดจากเบาะ (15%)",
        lumbarSub: "หลังส่วนล่างลอย ไม่มีจุดพยุง L1–L5",
        lumbarBar: "15%",
        lumbarGrade: "DISENGAGED",
        haptic: "สั่นเตือนละมุน (Pulse)",
        hapticColor: "#EF4444",
        hapticSub: "เตือนให้เอนหลังพิงเบาะ (หลังครบ 3 นาที)",
        hapticBar: "85%",
        hapticGrade: "ALERT 3M",
        hudMode: "KYPHOSIS HAZARD DETECTED",
        hudModeBg: "rgba(239, 68, 68, 0.12)",
        hudModeBorder: "rgba(239, 68, 68, 0.3)",
        hudModeColor: "#EF4444",
        spineAngleMetric: "Thoracic Kyphosis: 58° (Hazard)",
        spinePathD: "M 148 70 Q 155 105, 138 140 Q 115 175, 120 200",
        spineStroke: "url(#spineGradientDanger)",
        headCx: "155",
        headStroke: "#EF4444",
        headFill: "rgba(239, 68, 68, 0.25)",
        earCx: "155",
        vCervical: { cx: 148, cy: 80, stroke: "#EF4444" },
        vThoracic: { cx: 148, cy: 125, stroke: "#EF4444" },
        vLumbar: { cx: 125, cy: 165, stroke: "#EF4444" },
        lblNeck: "C1–C7 Neck: 44° (Forward Head)",
        lblThoracic: "T1–T12 Thoracic: 58° (Severe Kyphosis)",
        lblLumbar: "L1–L5 Lumbar: Flat (0% Support)",
        spineBadgeText: "สรีระหลังค่อมและยื่นคอไปข้างหน้า (Forward Head Posture)",
        spineBadgeBg: "rgba(239, 68, 68, 0.12)",
        spineBadgeBorder: "rgba(239, 68, 68, 0.3)",
        spineBadgeColor: "#F87171",
        heatmapPressureStatus: "High Tailbone Strain: 85%",
        heatLumbarFill: "rgba(255,255,255,0.05)",
        heatLumbarOpacity: "0.25",
        heatPelvisLFill: "url(#gradDangerHeat)",
        heatPelvisRFill: "url(#gradDangerHeat)",
        heatPelvisLOpacity: "0.95",
        heatPelvisROpacity: "0.95",
        heatCoccyxFill: "url(#gradDangerHeat)",
        lblLumbarVal: "LUMBAR: 15% (LOST)",
        lblPelvisLVal: "PELVIS: 52%",
        lblPelvisRVal: "PELVIS: 48%",
        advice: "<strong>แจ้งเตือน (Debounce 3 Min):</strong> ผู้ใช้นั่งหลังค่อม ไหล่ห่อ และกระดูกก้นกบรับแรงกดทับสูง มอเตอร์ไมโครแฮปติกจะสั่นเตือนเบา ๆ เมื่อนั่งต่อเนื่องเกิน 3 นาที เพื่อชวนให้เอนหลังแนบพนักพิง ไม่ส่งเสียงรบกวนผู้อื่น",
        adviceBorder: "#EF4444",
        adviceIconBg: "rgba(239, 68, 68, 0.15)",
        adviceIconColor: "#EF4444"
    },
    lean: {
        score: "52%",
        scoreColor: "#F59E0B",
        scoreSub: "นั่งทิ้งน้ำหนักเอียงซีกซ้าย",
        scoreBar: "52%",
        scoreGrade: "GRADE D",
        balance: "82% L / 18% R",
        balanceSub: "เชิงกรานเอียง แรงกดทับไม่สมดุล",
        balanceBar: "82%",
        balanceGrade: "ASYMMETRIC",
        lumbar: "สัมผัสข้างเดียว 45%",
        lumbarSub: "พนักพิงรับแรงเฉพาะซีกซ้าย",
        lumbarBar: "45%",
        lumbarGrade: "UNILATERAL",
        haptic: "สั่นเตือนซีกซ้าย",
        hapticColor: "#F59E0B",
        hapticSub: "เตือนให้ปรับศูนย์ถ่วงกลับตรงกลาง",
        hapticBar: "65%",
        hapticGrade: "LEFT BIAS",
        hudMode: "LATERAL SPINE IMBALANCE",
        hudModeBg: "rgba(245, 158, 11, 0.12)",
        hudModeBorder: "rgba(245, 158, 11, 0.3)",
        hudModeColor: "#F59E0B",
        spineAngleMetric: "Lateral Tilt: 14° (Imbalance)",
        spinePathD: "M 100 63 Q 86 110, 96 145 Q 106 175, 120 200",
        spineStroke: "url(#spineGradientWarning)",
        headCx: "98",
        headStroke: "#F59E0B",
        headFill: "rgba(245, 158, 11, 0.25)",
        earCx: "98",
        vCervical: { cx: 98, cy: 80, stroke: "#F59E0B" },
        vThoracic: { cx: 90, cy: 125, stroke: "#F59E0B" },
        vLumbar: { cx: 100, cy: 165, stroke: "#F59E0B" },
        lblNeck: "C1–C7 Neck: Tilt Left",
        lblThoracic: "T1–T12 Thoracic: Lateral Curve",
        lblLumbar: "L1–L5 Lumbar: Left Compression",
        spineBadgeText: "เชิงกรานเอียง น้ำหนักเทลงซีกซ้าย 82% เสี่ยงกระดูกคด",
        spineBadgeBg: "rgba(245, 158, 11, 0.12)",
        spineBadgeBorder: "rgba(245, 158, 11, 0.3)",
        spineBadgeColor: "#FBBF24",
        heatmapPressureStatus: "Lateral Imbalance: 82% L",
        heatLumbarFill: "url(#gradWarningHeat)",
        heatLumbarOpacity: "0.7",
        heatPelvisLFill: "url(#gradDangerHeat)",
        heatPelvisRFill: "rgba(0, 229, 255, 0.2)",
        heatPelvisLOpacity: "1",
        heatPelvisROpacity: "0.35",
        heatCoccyxFill: "none",
        lblLumbarVal: "LUMBAR: 45% (LEFT)",
        lblPelvisLVal: "L: 82% (PEAK)",
        lblPelvisRVal: "R: 18% (LOW)",
        advice: "<strong>แจ้งเตือน (Lateral Imbalance):</strong> น้ำหนักเทไปทางซ้ายถึง 82% ต่อเนื่อง ทำให้กระดูกเชิงกรานและแนวกระดูกสันหลังบิดตัว มอเตอร์ฝั่งซ้ายจะสะกิดเตือนให้ถ่ายเทน้ำหนักกลับสู่กึ่งกลาง",
        adviceBorder: "#F59E0B",
        adviceIconBg: "rgba(245, 158, 11, 0.15)",
        adviceIconColor: "#F59E0B"
    },
    exercise: {
        score: "95%",
        scoreColor: "#8B5CF6",
        scoreSub: "Active Gym Mode (ยืดเหยียด 2 นาที)",
        scoreBar: "95%",
        scoreGrade: "ACTIVE GYM",
        balance: "50% / 50%",
        balanceSub: "เกร็งกล้ามเนื้อสะบักสมดุลสองข้าง",
        balanceBar: "50%",
        balanceGrade: "BALANCED",
        lumbar: "แนบกระชับ 100%",
        lumbarSub: "แผ่นหลังแนบเบาะเป็นฐานดึงสายยาง",
        lumbarBar: "100%",
        lumbarGrade: "ANCHORED",
        haptic: "Load Cell Active",
        hapticColor: "#8B5CF6",
        hapticSub: "วัดแรงดึงจริง + บันทึกรอบ Reps",
        hapticBar: "90%",
        hapticGrade: "SENSING",
        hudMode: "ACTIVE MICRO-BREAK IN PROGRESS",
        hudModeBg: "rgba(139, 92, 246, 0.12)",
        hudModeBorder: "rgba(139, 92, 246, 0.3)",
        hudModeColor: "#8B5CF6",
        spineAngleMetric: "Active Extension: 38°",
        spinePathD: "M 120 60 Q 118 105, 118 145 Q 115 175, 120 200",
        spineStroke: "url(#spineGradientPurple)",
        headCx: "120",
        headStroke: "#8B5CF6",
        headFill: "rgba(139, 92, 246, 0.25)",
        earCx: "120",
        vCervical: { cx: 120, cy: 78, stroke: "#8B5CF6" },
        vThoracic: { cx: 118, cy: 122, stroke: "#8B5CF6" },
        vLumbar: { cx: 116, cy: 165, stroke: "#8B5CF6" },
        lblNeck: "C1–C7 Neck: Upright",
        lblThoracic: "T1–T12 Thoracic: Chest Open",
        lblLumbar: "L1–L5 Lumbar: Full Core Stability",
        spineBadgeText: "โหมดขยับกายยืดเหยียดสะบักและหลังส่วนบน (2 Min Active Break)",
        spineBadgeBg: "rgba(139, 92, 246, 0.12)",
        spineBadgeBorder: "rgba(139, 92, 246, 0.3)",
        spineBadgeColor: "#C4B5FD",
        heatmapPressureStatus: "Core Engagement: 95%",
        heatLumbarFill: "url(#gradPurpleHeat)",
        heatLumbarOpacity: "1",
        heatPelvisLFill: "url(#gradPurpleHeat)",
        heatPelvisRFill: "url(#gradPurpleHeat)",
        heatPelvisLOpacity: "0.85",
        heatPelvisROpacity: "0.85",
        heatCoccyxFill: "none",
        lblLumbarVal: "LUMBAR: 100%",
        lblPelvisLVal: "L: 50%",
        lblPelvisRVal: "R: 50%",
        advice: "<strong>Active Micro-Break:</strong> การดึงสายยางต้านทาน 2 นาที ช่วยบริหารกล้ามเนื้อ Rhomboids และสะบักหลัง เพื่อคลายพังผืดและกระตุ้นการไหลเวียนเลือด โดยมี Load Cell ตรวจวัดแรงดึงและปลอกผ้าเซฟตี้กันสะบัด",
        adviceBorder: "#8B5CF6",
        adviceIconBg: "rgba(139, 92, 246, 0.15)",
        adviceIconColor: "#8B5CF6"
    }
};

function initPostureSimulator() {
    const tabs = document.querySelectorAll('.p-tab-btn');
    
    // Top HUD
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

    // Spine SVG Elements
    const spineAngleMetric = document.getElementById('spineAngleMetric');
    const spinePath = document.getElementById('spineCurvePath');
    const humanHead = document.getElementById('humanHead');
    const earMarker = document.getElementById('earMarker');
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
        const conf = postureConfigs[key];
        if (!conf) return;

        // HUD Top
        if (hudModeBadge && hudModeText) {
            hudModeText.textContent = conf.hudMode;
            hudModeBadge.style.background = conf.hudModeBg;
            hudModeBadge.style.borderColor = conf.hudModeBorder;
            hudModeBadge.style.color = conf.hudModeColor;
        }

        // KPIs
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

        // Human Silhouette Profiles
        const allBodies = document.querySelectorAll('.human-silhouette-group');
        allBodies.forEach(b => b.classList.remove('active'));

        const activeBody = document.getElementById(`body-${key}`);
        if (activeBody) {
            activeBody.classList.add('active');
        }

        // Spine Profile
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

        // Heatmap
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

        // Live Advice
        if (adviceText) adviceText.innerHTML = conf.advice;
        if (adviceBox) adviceBox.style.borderLeftColor = conf.adviceBorder;
        if (adviceIconWrap) {
            adviceIconWrap.style.background = conf.adviceIconBg;
            adviceIconWrap.style.color = conf.adviceIconColor;
        }
    }

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

    // Default to optimal
    applyPosture('optimal');
}

/* ==========================================================================
   3. COMMITTEE DEFENSE 20-ROUND DATABASE & ACCORDION
   ========================================================================== */
const committeeQAList = [
    {
        round: 1,
        title: "ความแตกต่างของผลิตภัณฑ์ (Differentiator)",
        score: 7.0,
        category: "business",
        strength: "ชี้ให้เห็นการรวม Ergonomics + Sensing + Micro-gym ในประสบการณ์เดียว",
        refinement: "ห้ามเปรียบเทียบในเชิงดูแคลนเบาะคู่แข่ง ให้เน้นว่าเราเติมเต็มช่องว่างด้านพฤติกรรมและการขยับกาย",
        script: "เราไม่ได้ทำแค่เบาะพยุงหลังแบบดั้งเดิมอย่าง Lifted Lumbar และไม่ได้เป็นแค่แอปมือถือที่เตือนแล้วคนรำคาญ แต่เราเชื่อมการรองรับสรีระ + เซนเซอร์รับรู้ + การเตือนที่พอดี + มินิเกมขยับกล้ามเนื้อ 2 นาทีไว้ในลูปเดียวกันครับ"
    },
    {
        round: 2,
        title: "เซนเซอร์แรงกดตรวจท่านั่ง (FSR Limitations)",
        score: 6.5,
        category: "sensing",
        strength: "ยอมรับอย่างตรงไปตรงมาว่าแรงกดบอกท่วงท่ากระดูกสันหลังไม่ได้โดยตรง 100%",
        refinement: "ต้องอธิบายการใช้การกรองสัญญาณตามเวลา (Time-window) และการวัดศูนย์ถ่วงน้ำหนักหลายจุด",
        script: "FSR ไม่สามารถบอกมุมองศากระดูกได้เหมือนเครื่องเอ็กซเรย์ครับ แต่เราใช้ Multi-zone Matrix ตรวจการเทน้ำหนักซ้ายขวาและการทิ้งน้ำหนักก้นกบ ร่วมกับตัวแปรเวลาเพื่อตรวจว่าผู้ใช้นั่งนิ่งผิดท่าต่อเนื่องนานเกินเกณฑ์หรือไม่ครับ"
    },
    {
        round: 3,
        title: "การจัดการ False Positive / False Negative",
        score: 7.5,
        category: "sensing",
        strength: "มีระบบหน่วงเวลา 3–5 นาที ป้องกันการส่งสัญญาณเตือนถี่เกินไป",
        refinement: "ควรกำหนดตัวเลข Precision/Recall เป้าหมายที่ชัดเจนในขั้นตอนการทดสอบ",
        script: "หากเตือนทุกครั้งที่ก้มหยิบปากกา ผู้ใช้จะรำคาญและปิดระบบ เราจึงใช้ Debounce Logic ต้องรักษารูปแบบแรงกดที่ผิดปกติต่อเนื่อง 3–5 นาทีจึงจะส่งสัญญาณสั่นเตือนละมุน และผู้ใช้สามารถปรับเกณฑ์เวลานี้ได้เองครับ"
    },
    {
        round: 4,
        title: "ความปลอดภัยของยางแรงต้าน (Mechanical Safety)",
        score: 8.0,
        category: "safety",
        strength: "เลือกใช้ปลอกหุ้มผ้ากันสะบัด (Anti-snap Sleeve) และมีตัวล็อกจำกัดระยะยืด",
        refinement: "ควรเตรียมข้อมูลการทดสอบความล้าของวัสดุ (Fatigue Stress Cycle 5,000 ครั้ง)",
        script: "ความปลอดภัยของสายยางยืดต้องหยุดได้ด้วยกลไกทางกายภาพ ไม่พึ่งพาเซนเซอร์ครับ เรามีปลอกผ้าหุ้มสายเพื่อป้องกันกรณีสายยางขาดดีดใส่ผู้ใช้ และมี Hard-Stop ตัวล็อกจำกัดระยะดึงสูงสุดไม่ให้เกินค่าความเค้นที่ปลอดภัยครับ"
    },
    {
        round: 5,
        title: "กลุ่มเป้าหมายและคุณค่าที่นำเสนอ",
        score: 8.5,
        category: "business",
        strength: "โฟกัสกลุ่มชัดเจน: คนทำงานหน้าจอ, นักศึกษา, และเกมเมอร์",
        refinement: "ไม่ควรเคลมว่าเหมาะกับทุกคนหรือใช้รักษาโรคกระดูกคด",
        script: "เราเริ่มจากกลุ่มที่เข้าถึงได้และมีพฤติกรรมนั่งหน้าจอนานเกิน 6 ชั่วโมง เช่น นักเรียนโปรแกรมเมอร์และสายออฟฟิศ เพื่อเก็บข้อมูลจริง ไม่เคลมว่าผลิตภัณฑ์ใช้รักษาอาการทางการแพทย์ครับ"
    },
    {
        round: 6,
        title: "MediaPipe และการประมวลผลกล้อง",
        score: 8.0,
        category: "sensing",
        strength: "ประมวลผลบนเครื่อง (Edge Computing) และใช้เป็นทางเลือกเสริม",
        refinement: "ต้องระบุข้อจำกัดเรื่องแสงน้อยและการถูกโต๊ะทำงานบดบังช่วงล่าง",
        script: "โมดูลกล้องเป็น Option เสริมครับ หากผู้ใช้เปิดใช้ การตรวจจับข้อต่อจะประมวลผลบนเครื่องผู้ใช้ทันที ไม่ส่งภาพขึ้นคลาวด์ และตรวจจับเฉพาะท่อนบน (ไหล่/ศีรษะ) เพื่อแก้ปัญหาโต๊ะบังลำตัวครับ"
    },
    {
        round: 7,
        title: "วิธีสำรองเมื่อกล้องใช้ไม่ได้ (Graceful Fallback)",
        score: 8.5,
        category: "sensing",
        strength: "มีระบบสลับเข้าสู่โหมดเซนเซอร์แรงกดอัตโนมัติอย่างราบรื่น",
        refinement: "แสดงสถานะบนหน้าจอแอปอย่างโปร่งใสว่าระบบกำลังทำงานในโหมดใด",
        script: "หากสภาพแสงไม่พอหรือผู้ใช้ปิดกล้อง ระบบจะไม่พยายามเดาท่าทาง แต่จะ Fallback สลับไปใช้เฉพาะเซนเซอร์แรงกด FSR ใต้เบาะทันที โดยที่ฟังก์ชันการเตือนและมินิเกมยังทำงานได้ครบ 100% ครับ"
    },
    {
        round: 8,
        title: "ต้นแบบและการทดลอง (Experimental Design)",
        score: 8.0,
        category: "validation",
        strength: "แบ่ง 4 เฟสเพื่อลดความเสี่ยง ไม่รีบทำทุกอย่างพร้อมกัน",
        refinement: "ต้องมีระเบียบวิธีการติดป้ายกำกับอ้างอิง (Ground Truth) ในการทดลอง",
        script: "เราเริ่มจาก Phase 1 ทำเบาะรองรับและระบบสั่นเตือนขั้นต่ำให้เสถียรก่อน จากนั้น Phase 2 จึงวัดความแม่นยำเซนเซอร์ แล้ว Phase 3 ถึงใส่ยางยืดและมินิเกม เพื่อให้มั่นใจในความปลอดภัยทีละขั้นครับ"
    },
    {
        round: 9,
        title: "หลักฐานว่าผลิตภัณฑ์ช่วยได้จริง",
        score: 7.5,
        category: "validation",
        strength: "วางแผนเก็บข้อมูล Baseline ก่อนและหลังการทดลองใช้งาน",
        refinement: "แยกแยะผลที่เกิดจากความตื่นเต้นช่วงแรก (Novelty Effect) ออกจากนิสัยระยะยาว",
        script: "เราไม่ใช้แค่แบบสอบถามความพึงพอใจ แต่เราบันทึก Log เวลาการนั่งต่อเนื่อง จำนวนครั้งที่ลุกขยับตัว และจำนวนรอบการทำมินิเกม เปรียบเทียบสัปดาห์ก่อนใช้กับสัปดาห์หลังใช้ เพื่อดูการเปลี่ยนพฤติกรรมจริงครับ"
    },
    {
        round: 10,
        title: "ความน่าเชื่อถือของข้อมูลระบบ (Data Integrity)",
        score: 8.0,
        category: "sensing",
        strength: "มีระบบบัฟเฟอร์ข้อมูลออฟไลน์บนแฟลชเมมโมรีของ ESP32",
        refinement: "ออกแบบการตรวจสอบความสมบูรณ์ของข้อมูล (Checksum) เมื่อเน็ตหลุด",
        script: "เมื่อสัญญาณ Bluetooth หรือ Wi-Fi ขาดหาย ไมโครคอนโทรลเลอร์จะเก็บบันทึกข้อมูลสรุปไว้ในหน่วยความจำแฟลชในตัว และจะทำการซิงก์ข้อมูลขึ้นแอปทันทีเมื่อกลับมาเชื่อมต่อ ทำให้สถิติไม่สูญหายครับ"
    },
    {
        round: 11,
        title: "วิธีทำให้ผู้ใช้ใช้งานอย่างต่อเนื่อง (Retention)",
        score: 9.0,
        category: "business",
        strength: "มินิเกมสั้น 2 นาที ไม่รบกวนเวลาทำงาน และมีเป้าหมายไมโครแชลเลนจ์",
        refinement: "เพิ่มระบบ Streak และการติดตามความต่อเนื่องส่วนบุคคล",
        script: "จุดเด่นคือ 'อุปสรรคต่ำสุด' ครับ เราไม่บังคับให้คนออกกำลัง 30 นาที แต่เราชวนทำไมโครเบรก 2 นาที เล่นเกมปีนเขาดึงยาง 10 ครั้งตอนพักสายตา ทำให้ผู้ใช้ทำได้ทุกวันโดยไม่รู้สึกเป็นภาระครับ"
    },
    {
        round: 12,
        title: "เปรียบเทียบกับแอปฟรีหรือเบาะทั่วไป",
        score: 8.5,
        category: "business",
        strength: "ชี้ให้เห็นว่าแอปฟรีไม่มีตัวรับรู้จริง ส่วนเบาะทั่วไปไม่มีการตอบสนอง",
        refinement: "ย้ำว่าความคุ้มค่าเกิดจากประสบการณ์ที่เชื่อมโยงกันอย่างไร้รอยต่อ",
        script: "แอปฟรีส่วนใหญ่ใช้วิธีจับเวลาสุ่มเตือน ซึ่งคนมักกดข้ามเพราะกำลังพิมพ์งานอยู่ ส่วนเบาะทั่วไปไม่มีปฏิสัมพันธ์ใด ๆ Sit with Fit นำเบาะที่มีอยู่แล้วมาเพิ่มระบบรับรู้และแรงจูงใจในการขยับกายครับ"
    },
    {
        round: 13,
        title: "แนวทางการลดต้นทุนการผลิต (Cost Optimization)",
        score: 8.5,
        category: "business",
        strength: "ออกแบบวงจรแบบโมดูลาร์ ใช้ชิ้นส่วนมาตรฐานอุตสาหกรรม (ESP32, HX711)",
        refinement: "แจกแจงรายการ BOM ให้เห็นสัดส่วนต้นทุนเมื่อผลิตจำนวนมาก",
        script: "เราเลือกใช้ชิป ESP32 ที่มีราคาคุ้มค่าและมี BLE ในตัว ลดความซับซ้อนของวงจร และออกแบบให้โครงสร้างเบาะสามารถผลิตด้วยแม่พิมพ์โฟมมาตรฐาน จากนั้นจึงติดตั้งเซนเซอร์เป็นชุดโมดูลาร์ครับ"
    },
    {
        round: 14,
        title: "ความเป็นส่วนตัวและการไม่ใช้กล้อง",
        score: 7.5,
        category: "safety",
        strength: "ออกแบบให้ระบบทำงานสมบูรณ์ได้โดยไม่ต้องพึ่งกล้อง",
        refinement: "มีหน้าต่างขอความยินยอม (Informed Consent) และระบบขอลบข้อมูลชัดเจน",
        script: "เราตระหนักดีว่าในพื้นที่ส่วนตัวหรือออฟฟิศไม่มีใครอยากเปิดกล้องทิ้งไว้ Sit with Fit จึงถูกออกแบบให้โหมดหลักพึ่งพาเฉพาะเซนเซอร์แรงกดใต้เบาะเท่านั้น กล้องเป็นเพียงตัวเลือกสำหรับผู้ที่ต้องการครับ"
    },
    {
        round: 15,
        title: "ความเป็นธรรมและความเที่ยงตรงของข้อมูล (Demographic Bias)",
        score: 7.0,
        category: "validation",
        strength: "ตระหนักถึงความหลากหลายของน้ำหนักและสรีระผู้ใช้",
        refinement: "ต้องมีขั้นตอน Calibration ปรับเทียบน้ำหนักผู้ใช้ก่อนเริ่มใช้งานครั้งแรก",
        script: "น้ำหนักและสรีระของผู้ใช้แต่ละคนไม่เท่ากัน ในแอปจึงมีขั้นตอน Calibrate สั้น ๆ 10 วินาทีตอนเริ่มใช้ เพื่อให้ระบบจดจำค่าน้ำหนักพื้นฐานของบุคคลนั้น ทำให้การตรวจจับไม่เอนเอียงตามรูปร่างครับ"
    },
    {
        round: 16,
        title: "การจัดสรรชุดทดสอบ (20 ฮาร์ดแวร์ + 80 ซอฟต์แวร์)",
        score: 8.0,
        category: "business",
        strength: "มีกลยุทธ์การขยายผลแบบ Hybrid เหมาะสำหรับองค์กรที่มีงบจำกัด",
        refinement: "วางขั้นตอนการหมุนเวียนฮาร์ดแวร์เพื่อทดสอบในแผนกต่าง ๆ",
        script: "สำหรับกลุ่ม B2B การแจกฮาร์ดแวร์ครบ 100 คนอาจมีต้นทุนสูง เราจึงเสนอโมเดลนำร่อง: ฮาร์ดแวร์ตัวเต็ม 20 ชุดสำหรับกลุ่มที่ต้องการฟื้นฟูเป็นพิเศษ และซอฟต์แวร์ 80 ไลเซนส์เพื่อบันทึกพฤติกรรมภาพรวมครับ"
    },
    {
        round: 17,
        title: "การแยกผลอุปกรณ์ออกจากความตื่นเต้นช่วงแรก (Novelty Effect)",
        score: 6.5,
        category: "validation",
        strength: "วางแผนการทดสอบระยะยาวเกินกว่า 4–6 สัปดาห์",
        refinement: "ต้องมีเกณฑ์การประเมิน Retention Rate รายสัปดาห์ที่โปร่งใส",
        script: "เรายอมรับว่าสัปดาห์แรกผู้ใช้อาจเห่อเล่นเกมบ่อย เราจึงกำหนดการทดสอบนำร่องไว้ที่ 6 สัปดาห์ และจะนำข้อมูลสัปดาห์ที่ 3–6 มาวิเคราะห์เป็นหลักเพื่อพิสูจน์การเปลี่ยนพฤติกรรมที่แท้จริงครับ"
    },
    {
        round: 18,
        title: "ความปลอดภัยเมื่อเซนเซอร์วัดแรงเตือนช้า (Lagging Fail-Safe)",
        score: 8.0,
        category: "safety",
        strength: "ยืนยันหลักการว่าความปลอดภัยต้องหยุดได้โดยกลไก ไม่รอซอฟต์แวร์",
        refinement: "ติดตั้ง Stopper เชิงกลเป็นปราการด่านแรก",
        script: "หากเซนเซอร์อ่านค่าช้าหรือซอฟต์แวร์ค้าง ผู้ใช้จะไม่ตกอยู่ในอันตราย เพราะระยะยืดของสายยางถูกล็อกไว้ด้วยตัวสายและจุดยึดทางกายภาพ ไม่สามารถดึงจนหลุดหรือกระเด็นได้อยู่แล้วครับ"
    },
    {
        round: 19,
        title: "โมเดลธุรกิจ B2C และ B2B",
        score: 8.5,
        category: "business",
        strength: "มีทั้งการขายตรงรายบุคคลและแพ็กเกจ Corporate Wellness สำหรับออฟฟิศ",
        refinement: "แจกแจงข้อตกลงระดับการให้บริการและการสนับสนุนหลังการขาย",
        script: "B2C เหมาะกับการสร้างแบรนด์และยอดขายช่วงแรกผ่านช่องทางออนไลน์ ส่วน B2B คือโอกาสเติบโตระยะยาวผ่านโครงการสุขภาวะพนักงาน โดยบริษัทจะได้แดชบอร์ดสรุปสถิติเพื่อลดอัตราการลาป่วยครับ"
    },
    {
        round: 20,
        title: "การจัดลำดับวิศวกรรม: แม่นยำ & ปลอดภัย ก่อนความสนุก",
        score: 9.0,
        category: "safety",
        strength: "ยึดมั่นหลักการวิศวกรรม ไม่หลงไปกับลูกเล่นจนระบบหลักใช้งานไม่ได้",
        refinement: "กำหนด Gate Criteria ชัดเจนว่าแต่ละเฟสต้องผ่านเกณฑ์ใดก่อนขยับต่อ",
        script: "เรายึดลำดับความสำคัญตามหลักวิศวกรรมครับ: ความปลอดภัยเชิงกลอันดับหนึ่ง, ความเสถียรของเซนเซอร์อันดับสอง, ความนุ่มนวลของการเตือนอันดับสาม และความสนุกของมินิเกมเป็นตัวเสริมเพื่อสร้างความต่อเนื่องครับ"
    }
];

function initCommitteeQABank() {
    const accordionWrap = document.getElementById('modernQAAccordion');
    const filterPills = document.querySelectorAll('.filter-pill');

    function renderQuestions(filter = 'all') {
        accordionWrap.innerHTML = '';

        const items = committeeQAList.filter(q => {
            if (filter === 'all') return true;
            return q.category === filter;
        });

        items.forEach(q => {
            const scoreClass = q.score >= 8.0 ? 'high' : 'medium';
            const card = document.createElement('div');
            card.className = 'qa-card-item';
            card.innerHTML = `
                <div class="qa-header-btn">
                    <div class="qah-left">
                        <span class="round-tag">ข้อที่ ${q.round}</span>
                        <span class="qah-title">${q.title}</span>
                    </div>
                    <div class="qah-right">
                        <span class="score-badge ${scoreClass}">คะแนน: ${q.score.toFixed(1)}/10</span>
                        <span class="chevron-icon">▼</span>
                    </div>
                </div>
                <div class="qa-body-content">
                    <div class="qa-grid-feedback">
                        <div class="qa-f-box box-strength">
                            <strong>✅ จุดเด่นในการตอบ:</strong>
                            <p>${q.strength}</p>
                        </div>
                        <div class="qa-f-box box-refinement">
                            <strong>⚠️ จุดที่ต้องระวัง/เตรียมข้อมูลเพิ่ม:</strong>
                            <p>${q.refinement}</p>
                        </div>
                    </div>
                    <div class="qa-defense-block">
                        <h5>🎙️ แนวทางการตอบแบบมืออาชีพ:</h5>
                        <p>"${q.script}"</p>
                    </div>
                </div>
            `;

            card.querySelector('.qa-header-btn').addEventListener('click', () => {
                const isOpen = card.classList.contains('open');
                document.querySelectorAll('.qa-card-item').forEach(c => c.classList.remove('open'));
                if (!isOpen) {
                    card.classList.add('open');
                }
            });

            accordionWrap.appendChild(card);
        });

        if (accordionWrap.firstElementChild) {
            accordionWrap.firstElementChild.classList.add('open');
        }
    }

    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            renderQuestions(pill.getAttribute('data-filter'));
        });
    });

    renderQuestions('all');
}

/* ==========================================================================
   4. CHART.JS VISUALIZATION
   ========================================================================== */
function initCharts() {
    const radarCtx = document.getElementById('mainRadarChart');
    if (radarCtx) {
        new Chart(radarCtx, {
            type: 'radar',
            data: {
                labels: [
                    'ความปลอดภัย & กลไก',
                    'เซนเซอร์ FSR & เตือน',
                    'ซอฟต์แวร์ & Edge CV',
                    'โมเดลธุรกิจ & BOM',
                    'การทดลอง & ระเบียบวิธี'
                ],
                datasets: [{
                    label: 'คะแนนการซ้อมตอบเฉลี่ย (/10)',
                    data: [8.2, 7.6, 8.0, 8.1, 7.4],
                    backgroundColor: 'rgba(0, 229, 255, 0.22)',
                    borderColor: '#00E5FF',
                    borderWidth: 2,
                    pointBackgroundColor: '#00F2FE',
                    pointBorderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                        grid: { color: 'rgba(255, 255, 255, 0.08)' },
                        pointLabels: {
                            font: { family: "'Prompt', sans-serif", size: 11 },
                            color: '#94A3B8'
                        },
                        ticks: { display: false },
                        suggestedMin: 4,
                        suggestedMax: 10
                    }
                },
                plugins: { legend: { display: false } }
            }
        });
    }

    const slideBarCtx = document.getElementById('slideDeckBarChart');
    if (slideBarCtx) {
        new Chart(slideBarCtx, {
            type: 'bar',
            data: {
                labels: ['ความปลอดภัย', 'FSR เซนเซอร์', 'Edge AI', 'โมเดลธุรกิจ', 'การทดลอง'],
                datasets: [{
                    label: 'คะแนนเฉลี่ย',
                    data: [8.2, 7.6, 8.0, 8.1, 7.4],
                    backgroundColor: ['#10B981', '#00E5FF', '#8B5CF6', '#38BDF8', '#FF6B35'],
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { ticks: { color: '#E2E8F0', font: { family: "'Prompt', sans-serif" } }, grid: { display: false } },
                    y: { suggestedMin: 5, suggestedMax: 10, ticks: { color: '#94A3B8' }, grid: { color: 'rgba(255, 255, 255, 0.08)' } }
                }
            }
        });
    }
}

/* ==========================================================================
   5. SLIDE DECK PRESENTATION MODE CONTROLLER
   ========================================================================== */
let deckCurrent = 1;
const deckTotal = 8;

const slideNotesData = {
    1: "สไลด์หน้าปก: แนะนำ Sit with Fit เน้นย้ำเป้าหมาย 'นั่งให้ถูกท่า' และผลคะแนนซ้อมตอบกรรมการ 7.9/10",
    2: "ปัญหาการนั่ง: ชี้ประเด็น 8 ชม. ต่อวันกับการนั่งผิดท่า และ Alert Fatigue ที่ทำให้คนปิดแอปทิ้ง",
    3: "วงจรแก้ปัญหา: อธิบาย FSR Grid + หน่วงเวลา 3 นาทีป้องกันการเตือนมั่ว และยางยืดเหยียด 2 นาที",
    4: "สถาปัตยกรรม 5 ชั้น: อธิบายชิ้นส่วนวิศวกรรมและความปลอดภัยเชิงกล Hard-Stop",
    5: "เปรียบเทียบจุดต่าง: เน้นย้ำว่าเราแตกต่างจาก Lifted Lumbar ตรงระบบรับรู้พฤติกรรมและการเตือนไดนามิก",
    6: "แผนงาน 4 ระยะ: ชี้แจง Gate Criteria ของแต่ละเฟส โดยเฉพาะ Precision ≥ 80%",
    7: "คะแนนกรรมการ: อธิบายจุดแข็งเรื่องความปลอดภัย และจุดเตรียมข้อมูลเพิ่มเพื่อตอบข้อซักถาม",
    8: "บทสรุป 60 วินาที: ตอกย้ำคุณค่าหลัก 'นั่งถูกท่า สุขภาพดีขึ้นทุกนาที'"
};

function initSlideDeckPresentation() {
    const slideDeck = document.getElementById('slideDeckView');
    const toggleBtn = document.getElementById('toggleSlideDeckBtn');
    const exitBtn = document.getElementById('exitSlideDeckBtn');
    const prevBtn = document.getElementById('prevSlideBtn');
    const nextBtn = document.getElementById('nextSlideBtn');
    const notesBtn = document.getElementById('notesToggleBtn');
    const closeNotesBtn = document.getElementById('closeDeckNotesBtn');
    const notesDrawer = document.getElementById('deckNotesDrawer');
    const notesText = document.getElementById('deckNotesText');

    function showDeckSlide(n) {
        if (n < 1) n = 1;
        if (n > deckTotal) n = deckTotal;
        deckCurrent = n;

        document.querySelectorAll('.slide-card').forEach((slide, idx) => {
            slide.classList.toggle('active', idx === deckCurrent - 1);
        });

        document.getElementById('deckCurrentSlide').textContent = deckCurrent;
        document.getElementById('deckProgressBar').style.width = `${(deckCurrent / deckTotal) * 100}%`;

        if (notesText && slideNotesData[deckCurrent]) {
            notesText.textContent = slideNotesData[deckCurrent];
        }
    }

    window.openSlideDeck = function() {
        slideDeck.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        showDeckSlide(1);
    };

    window.switchToMainPage = function() {
        slideDeck.classList.add('hidden');
        document.body.style.overflow = 'auto';
    };

    window.togglePresentationDeck = function() {
        if (slideDeck.classList.contains('hidden')) {
            openSlideDeck();
        } else {
            switchToMainPage();
        }
    };

    if (toggleBtn) toggleBtn.addEventListener('click', togglePresentationDeck);
    if (exitBtn) exitBtn.addEventListener('click', switchToMainPage);

    if (prevBtn) prevBtn.addEventListener('click', () => showDeckSlide(deckCurrent - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => showDeckSlide(deckCurrent + 1));

    if (notesBtn && notesDrawer) {
        notesBtn.addEventListener('click', () => {
            notesDrawer.classList.toggle('hidden');
        });
    }
    if (closeNotesBtn && notesDrawer) {
        closeNotesBtn.addEventListener('click', () => {
            notesDrawer.classList.add('hidden');
        });
    }

    window.addEventListener('keydown', (e) => {
        if (!slideDeck.classList.contains('hidden')) {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                e.preventDefault();
                showDeckSlide(deckCurrent + 1);
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                showDeckSlide(deckCurrent - 1);
            } else if (e.key === 'Escape') {
                switchToMainPage();
            } else if (e.key === 'p' || e.key === 'P') {
                notesDrawer.classList.toggle('hidden');
            }
        }
    });

    showDeckSlide(1);
}
