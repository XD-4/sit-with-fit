/**
 * SIT WITH FIT — COMMITTEE DEFENSE Q&A CONTROLLER
 * Filter pills and interactive accordion logic
 */

import { committeeQAList } from './committee-data.js';

export function initCommitteeQABank() {
    const accordionWrap = document.getElementById('modernQAAccordion');
    const filterPills = document.querySelectorAll('.filter-pill');

    if (!accordionWrap) return;

    function renderQuestions(filter = 'all') {
        accordionWrap.innerHTML = '';

        const qaList = window.committeeQAList || committeeQAList;
        const items = qaList.filter(q => {
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

        // Open first item by default
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

// Global attach
if (typeof window !== 'undefined') {
    window.initCommitteeQABank = initCommitteeQABank;
}
