/**
 * SIT WITH FIT — RADAR CHART VISUALIZATION
 * Radar chart evaluating 5 defense dimensions
 */

export function initCharts() {
    const radarCtx = document.getElementById('mainRadarChart');
    if (!radarCtx || typeof Chart === 'undefined') return;

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
                backgroundColor: 'rgba(56, 189, 248, 0.22)',
                borderColor: '#38BDF8',
                borderWidth: 2,
                pointBackgroundColor: '#7DD3FC',
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
            plugins: { 
                legend: { display: false } 
            }
        }
    });
}

// Global attach
if (typeof window !== 'undefined') {
    window.initCharts = initCharts;
}
