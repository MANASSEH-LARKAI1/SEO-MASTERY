// Track Data with sample audio URLs
const tracks = [
    {
        id: 0,
        title: "He Reigns",
        artist: "Manasseh",
        duration: "3:45",
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        audioFile:"audio/Joe-Mettle-Worship-Medley-ft-Sound-Of-Heaven.mp3"
        //Make sure u remove music encoding
    },
    {
        id: 1,
        title: "Jesus Is King",
        artist: "Manasseh",
        duration: "4:20",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        audioFile: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        id: 2,
        title: "Be Still",
        artist: "Manasseh",
        duration: "3:15",
        image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        audioFile: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },
    {
        id: 3,
        title: "Echoes of Zion",
        artist: "Manasseh",
        duration: "4:05",
        image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
        audioFile: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    {
        id: 4,
        title: "Jesus Is King",
        artist: "Manasseh",
        duration: "4:05",
        image: "images/AboutImage2.jpg",
        audioFile: "audio/Joe-Mettle-This-is-the-Air-I-Breathe.mp3"
    },
    {
        id: 5,
        title: "Thank you Jesus",
        artist: "Manasseh",
        duration: "4:05",
        image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
        audioFile: "audio/Joe-Mettle-MEHIA-WO-YESU.mp3"
    }
];

// DOM Elements
const audioElement = document.getElementById('audio-element');
const playerImage = document.querySelector('.player-image');
const playerTitle = document.querySelector('.player-details h4');
const playerArtist = document.querySelector('.player-details p');
const playPauseBtn = document.querySelector('.play-pause-btn');
const playPauseIcon = document.querySelector('.play-pause-btn i');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const progressBar = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-bar');
const currentTimeEl = document.querySelector('.current-time');
const totalTimeEl = document.querySelector('.total-time');
const volumeBar = document.querySelector('.volume-level');
const volumeContainer = document.querySelector('.volume-bar');
const volumeBtn = document.querySelector('.volume-btn i');

// Player State
let currentTrackIndex = 0;
let isPlaying = false;
let isDragging = false;

// Format time (convert seconds to mm:ss)
function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// Load track
function loadTrack(index) {
    const track = tracks[index];
    currentTrackIndex = index;
    
    // Update player UI
    playerTitle.textContent = track.title;
    playerArtist.textContent = track.artist;
    playerImage.style.backgroundImage = `url('${track.image}')`;
    totalTimeEl.textContent = track.duration;
    
    // Set audio source
    audioElement.src = track.audioFile;
    audioElement.load();
    
    // Reset progress
    currentTimeEl.textContent = '0:00';
    progressBar.style.width = '0%';
    
    // If player was playing, continue playing
    if (isPlaying) {
        audioElement.play().catch(e => {
            console.log("Auto-play prevented, user interaction required");
            isPlaying = false;
            updatePlayPauseIcon();
        });
    }
}

// Play/Pause track
function togglePlayPause() {
    if (audioElement.src === '') {
        // If no track is loaded, load the first one
        loadTrack(0);
    }
    
    if (isPlaying) {
        audioElement.pause();
    } else {
        audioElement.play().catch(e => {
            console.log("Play failed:", e);
        });
    }
    isPlaying = !isPlaying;
    updatePlayPauseIcon();
}

// Update play/pause icon
function updatePlayPauseIcon() {
    if (isPlaying) {
        playPauseIcon.classList.remove('fa-play');
        playPauseIcon.classList.add('fa-pause');
    } else {
        playPauseIcon.classList.remove('fa-pause');
        playPauseIcon.classList.add('fa-play');
    }
}

// Previous track
function prevTrack() {
    currentTrackIndex--;
    if (currentTrackIndex < 0) {
        currentTrackIndex = tracks.length - 1;
    }
    loadTrack(currentTrackIndex);
    if (isPlaying) {
        audioElement.play();
    }
}

// Next track
function nextTrack() {
    currentTrackIndex++;
    if (currentTrackIndex >= tracks.length) {
        currentTrackIndex = 0;
    }
    loadTrack(currentTrackIndex);
    if (isPlaying) {
        audioElement.play();
    }
}

// Set progress
function setProgress(e) {
    if (!isDragging) return;
    
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audioElement.duration;
    
    if (duration) {
        audioElement.currentTime = (clickX / width) * duration;
    }
}

// Set volume
function setVolume(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const volume = clickX / width;
    
    audioElement.volume = volume;
    volumeBar.style.width = `${volume * 100}%`;
    
    // Update volume icon
    if (volume === 0) {
        volumeBtn.classList.remove('fa-volume-up', 'fa-volume-down');
        volumeBtn.classList.add('fa-volume-mute');
    } else if (volume < 0.5) {
        volumeBtn.classList.remove('fa-volume-up', 'fa-volume-mute');
        volumeBtn.classList.add('fa-volume-down');
    } else {
        volumeBtn.classList.remove('fa-volume-down', 'fa-volume-mute');
        volumeBtn.classList.add('fa-volume-up');
    }
}

// Toggle mute
function toggleMute() {
    if (audioElement.volume > 0) {
        audioElement.volume = 0;
        volumeBar.style.width = '0%';
        volumeBtn.classList.remove('fa-volume-up', 'fa-volume-down');
        volumeBtn.classList.add('fa-volume-mute');
    } else {
        audioElement.volume = 0.8;
        volumeBar.style.width = '60%';
        volumeBtn.classList.remove('fa-volume-mute', 'fa-volume-down');
        volumeBtn.classList.add('fa-volume-up');
    }
}

// Update progress bar
function updateProgress() {
    if (audioElement.duration) {
        const progressPercent = (audioElement.currentTime / audioElement.duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
        currentTimeEl.textContent = formatTime(audioElement.currentTime);
    }
}

// Event Listeners
playPauseBtn.addEventListener('click', togglePlayPause);
prevBtn.addEventListener('click', prevTrack);
nextBtn.addEventListener('click', nextTrack);
volumeBtn.parentElement.addEventListener('click', toggleMute);

// Progress bar dragging
progressContainer.addEventListener('mousedown', () => isDragging = true);
document.addEventListener('mouseup', () => isDragging = false);
progressContainer.addEventListener('click', setProgress);

// Volume control
volumeContainer.addEventListener('click', setVolume);

// Audio event listeners
audioElement.addEventListener('timeupdate', updateProgress);
audioElement.addEventListener('ended', nextTrack);
audioElement.addEventListener('loadedmetadata', function() {
    totalTimeEl.textContent = formatTime(audioElement.duration);
});

// Play track buttons
document.querySelectorAll('.play-track').forEach(button => {
    button.addEventListener('click', function() {
        const trackIndex = parseInt(this.getAttribute('data-track'));
        loadTrack(trackIndex);
        togglePlayPause();
    });
});

// Mobile Menu Toggle
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('nav ul').classList.toggle('active');
});

// Set current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Initialize volume
audioElement.volume = 0.8;

if (isPlaying==="true") {
     window.onload = function () {
    document.getElementById("audioplayer").style.display = "block"

}
} 

// ... (keep all your existing track and audio player code) ...

// Email Popup Functions
function closeEmailPopup() {
    document.getElementById("email-popup").style.display = "none";
}

// Close popup when X is clicked
document.querySelector(".close-btn").addEventListener("click", function(){
    closeEmailPopup();
});

// Close when clicking outside content
document.getElementById("email-popup").addEventListener("click", function(e){
    if(e.target === this){
        closeEmailPopup();
    }
});

// Show popup after 5 seconds
setTimeout(function(){
    document.getElementById("email-popup").style.display = "flex";
}, 5000);

// Cookie Banner Functions
function acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    document.getElementById('cookie-banner').style.display = 'none';
    console.log('Cookies accepted');
    
    // Load analytics after accepting cookies
    if (typeof gtag !== 'undefined') {
        gtag('config', 'G-4N8D4VDWQJ');
    }
}

function declineCookies() {
    localStorage.setItem('cookieConsent', 'declined');
    document.getElementById('cookie-banner').style.display = 'none';
    console.log('Cookies declined');
}

// Check and show cookie banner if not already accepted
function checkCookieConsent() {
    const cookieConsent = localStorage.getItem('cookieConsent');
    console.log('Cookie consent status:', cookieConsent);
    
    if (!cookieConsent) {
        // No decision made yet, show the banner
        console.log('Showing cookie banner');
        document.getElementById('cookie-banner').style.display = 'block';
    } else {
        // User has already made a decision, hide the banner
        console.log('Hiding cookie banner - user already decided:', cookieConsent);
        document.getElementById('cookie-banner').style.display = 'none';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, checking cookie consent...');
    checkCookieConsent();
    
    // Set current year in footer
    document.getElementById("year").textContent = new Date().getFullYear();
    
    // Initialize other components
    audioElement.volume = 0.8;
});
