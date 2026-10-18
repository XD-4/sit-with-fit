/**
 * SIT WITH FIT — BACKGROUND AUDIO CONTROLLER
 * Dua Lipa - Levitating (feat. DaBaby)
 * Plays softly (volume: 0.2) with interactive audio visualizer pill
 */

export function initBackgroundAudio() {
    const audio = document.getElementById('bgAudio');
    const toggleBtn = document.getElementById('audioToggleBtn');
    const playIcon = toggleBtn?.querySelector('.icon-play');
    const pauseIcon = toggleBtn?.querySelector('.icon-pause');
    const waveContainer = toggleBtn?.querySelector('.audio-wave-bars');
    const statusTag = toggleBtn?.querySelector('.audio-live-tag');

    if (!audio || !toggleBtn) return;

    // Set very soft ambient volume ("เปิดเบาๆ พอ")
    audio.volume = 0.06;

    let isPlaying = false;

    function setPlayingState(playing) {
        isPlaying = playing;
        if (playing) {
            toggleBtn.classList.add('playing');
            playIcon?.classList.add('hidden');
            pauseIcon?.classList.remove('hidden');
            waveContainer?.classList.add('animating');
            if (statusTag) statusTag.textContent = 'BGM PLAYING';
        } else {
            toggleBtn.classList.remove('playing');
            playIcon?.classList.remove('hidden');
            pauseIcon?.classList.add('hidden');
            waveContainer?.classList.remove('animating');
            if (statusTag) statusTag.textContent = 'BGM PAUSED';
        }
    }

    async function playAudio() {
        try {
            await audio.play();
            setPlayingState(true);
        } catch (err) {
            // Browser autoplay restrictions blocked playback until interaction
            console.log('Autoplay deferred until user interaction');
            setPlayingState(false);
        }
    }

    function pauseAudio() {
        audio.pause();
        setPlayingState(false);
    }

    function togglePlayback() {
        if (audio.paused) {
            playAudio();
        } else {
            pauseAudio();
        }
    }

    toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        togglePlayback();
    });

    // Attempt automatic playback
    playAudio();

    // Browser policy fallback: start music on first user interaction anywhere
    const startOnInteraction = () => {
        if (audio.paused && !toggleBtn.dataset.userManuallyPaused) {
            playAudio();
        }
        document.removeEventListener('click', startOnInteraction);
        document.removeEventListener('keydown', startOnInteraction);
        document.removeEventListener('touchstart', startOnInteraction);
    };

    document.addEventListener('click', startOnInteraction, { once: true });
    document.addEventListener('keydown', startOnInteraction, { once: true });
    document.addEventListener('touchstart', startOnInteraction, { once: true });

    // Track if user explicitly paused
    toggleBtn.addEventListener('click', () => {
        if (audio.paused) {
            toggleBtn.dataset.userManuallyPaused = 'true';
        } else {
            delete toggleBtn.dataset.userManuallyPaused;
        }
    });
}

// Global attach
if (typeof window !== 'undefined') {
    window.initBackgroundAudio = initBackgroundAudio;
}
