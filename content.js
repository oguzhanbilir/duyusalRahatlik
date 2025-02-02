// Sayfa yüklendiğinde aktif profili uygula
chrome.storage.local.get(['activeProfile', 'profiles'], function(result) {
  if (result.activeProfile && result.profiles && result.profiles[result.activeProfile]) {
    const settings = result.profiles[result.activeProfile];
    applyStyles(settings);
    applyMotionControl(settings);
    applyAudioControl(settings);
    applyVideoFilters(settings);
  }
});

// Stil elementini oluştur
let styleElement = document.createElement('style');
document.head.appendChild(styleElement);

// Mesaj dinleyicisi
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "updateStyles") {
    applyStyles(request.settings);
    applyMotionControl(request.settings);
    applyAudioControl(request.settings);
    applyVideoFilters(request.settings);
  }
});

// Stilleri uygula
function applyStyles(settings) {
  // CSS filtrelerini oluştur
  let filters = getFilterStyles(settings);
  
  // Animasyon hızını ayarla
  let animationSpeed = getAnimationSpeed(settings.animationSpeed);
  
  // CSS kurallarını oluştur
  let css = `
    html {
      filter: ${filters} !important;
    }
    
    * {
      font-family: ${settings.fontFamily} !important;
      font-size: ${settings.fontSize}px !important;
      letter-spacing: ${settings.letterSpacing}px !important;
      word-spacing: ${settings.wordSpacing}px !important;
      line-height: ${settings.lineHeight} !important;
      margin-bottom: ${settings.paragraphSpacing}px !important;
    }
    
    @media screen {
      * {
        transition: all ${animationSpeed}s ease-in-out !important;
      }
    }
  `;
  
  // Stilleri uygula
  styleElement.textContent = css;
}

// Hareket kontrolünü uygula
function applyMotionControl(settings) {
  // Animasyon elementlerini bul
  const animatedElements = document.querySelectorAll(
    '[class*="animate"], [class*="slide"], [class*="fade"], [class*="bounce"], ' +
    '[class*="spin"], [class*="rotate"], [class*="flip"], [style*="animation"], ' +
    '[style*="transition"], .carousel, .slider'
  );

  // Video ve GIF elementleri
  const videoElements = document.querySelectorAll('video');
  const gifElements = document.querySelectorAll('img[src$=".gif"]');

  // Hareket hızını hesapla (0.1 ile 1 arası)
  const speedLevel = parseInt(settings.motionSpeed) / 100;

  if (settings.motionMode === 'stop') {
    // Animasyonları durdur
    if (settings.controlAnimations) {
      animatedElements.forEach(element => {
        element.style.animationPlayState = 'paused';
        element.style.transitionDuration = '0s';
      });
    }

    // Videoları durdur
    if (settings.controlVideos) {
      videoElements.forEach(video => {
        // Sadece otomatik oynatılan videoları durdur
        if (video.autoplay) {
          video.autoplay = false;
          if (!video.paused) {
            video.pause();
          }
        }
      });
    }

    // GIF'leri durdur
    if (settings.controlGifs) {
      gifElements.forEach(img => {
        const staticUrl = img.src.replace('.gif', '.png');
        img.setAttribute('data-original-gif', img.src);
        img.src = staticUrl;
      });
    }
  } else if (settings.motionMode === 'reduce') {
    // Animasyon hızını azalt
    if (settings.controlAnimations) {
      animatedElements.forEach(element => {
        element.style.animationPlayState = 'running';
        element.style.animationDuration = `${3 / speedLevel}s`;
        element.style.transitionDuration = `${3 / speedLevel}s`;
      });
    }

    // Video hızını ayarla
    if (settings.controlVideos) {
      videoElements.forEach(video => {
        video.playbackRate = speedLevel;
      });
    }
  } else {
    // Normal mod - tüm kısıtlamaları kaldır
    animatedElements.forEach(element => {
      element.style.animationPlayState = '';
      element.style.animationDuration = '';
      element.style.transitionDuration = '';
    });

    videoElements.forEach(video => {
      video.playbackRate = 1;
    });

    gifElements.forEach(img => {
      const originalGif = img.getAttribute('data-original-gif');
      if (originalGif) {
        img.src = originalGif;
      }
    });
  }

  // MutationObserver ile yeni eklenen elementleri kontrol et
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) { // Element node
          if (settings.motionMode === 'stop') {
            if (settings.controlAnimations && node.matches('[class*="animate"], [style*="animation"]')) {
              node.style.animationPlayState = 'paused';
              node.style.transitionDuration = '0s';
            }
            if (settings.controlVideos && node.tagName === 'VIDEO' && node.autoplay) {
              node.autoplay = false;
              if (!node.paused) {
                node.pause();
              }
            }
          } else if (settings.motionMode === 'reduce') {
            if (settings.controlAnimations && node.matches('[class*="animate"], [style*="animation"]')) {
              node.style.animationDuration = `${3 / speedLevel}s`;
              node.style.transitionDuration = `${3 / speedLevel}s`;
            }
            if (settings.controlVideos && node.tagName === 'VIDEO') {
              node.playbackRate = speedLevel;
            }
          }
        }
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// Ses kontrolünü uygula
function applyAudioControl(settings) {
  // Ses elementlerini bul
  const audioElements = document.querySelectorAll('audio, video');
  const backgroundAudio = document.querySelectorAll('audio[autoplay], audio[loop], [data-background-music]');
  const notificationSounds = document.querySelectorAll('[data-notification], [class*="notification"], [class*="alert"]');
  const mediaPlayers = document.querySelectorAll('[class*="player"], [class*="media"], [data-player]');
  
  // Ses seviyesini hesapla (0-1 arası)
  const volumeLevel = parseInt(settings.audioVolume) / 100;
  
  function adjustVolume(element) {
    if (element instanceof HTMLMediaElement) {
      element.volume = volumeLevel;
    }
  }
  
  if (settings.audioMode === 'mute') {
    // Tüm sesleri sustur
    audioElements.forEach(element => {
      if (element instanceof HTMLMediaElement) {
        element.volume = 0;
        element.muted = true;
      }
    });
  } else if (settings.audioMode === 'custom') {
    // Ses tiplerini kontrol et
    audioElements.forEach(element => {
      if (element instanceof HTMLMediaElement) {
        const isBackgroundAudio = element.matches('[autoplay], [loop], [data-background-music]');
        const isVideo = element.tagName === 'VIDEO';
        const isNotification = element.matches('[data-notification], [class*="notification"], [class*="alert"]');
        const isMediaPlayer = element.matches('[class*="player"], [class*="media"], [data-player]');
        
        let shouldBeMuted = false;
        
        if (isBackgroundAudio && !settings.controlBackgroundAudio) shouldBeMuted = true;
        if (isVideo && !settings.controlVideoAudio) shouldBeMuted = true;
        if (isNotification && !settings.controlNotificationAudio) shouldBeMuted = true;
        if (isMediaPlayer && !settings.controlMediaAudio) shouldBeMuted = true;
        
        if (shouldBeMuted) {
          element.volume = 0;
          element.muted = true;
        } else {
          element.muted = false;
          adjustVolume(element);
        }
      }
    });
  } else {
    // Normal mod - varsayılan ses seviyesini uygula
    audioElements.forEach(element => {
      if (element instanceof HTMLMediaElement) {
        element.muted = false;
        adjustVolume(element);
      }
    });
  }
  
  // MutationObserver ile yeni eklenen ses elementlerini kontrol et
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) { // Element node
          const newAudioElements = node.querySelectorAll('audio, video');
          newAudioElements.forEach(element => {
            if (element instanceof HTMLMediaElement) {
              if (settings.audioMode === 'mute') {
                element.volume = 0;
                element.muted = true;
              } else if (settings.audioMode === 'custom') {
                const isBackgroundAudio = element.matches('[autoplay], [loop], [data-background-music]');
                const isVideo = element.tagName === 'VIDEO';
                const isNotification = element.matches('[data-notification], [class*="notification"], [class*="alert"]');
                const isMediaPlayer = element.matches('[class*="player"], [class*="media"], [data-player]');
                
                let shouldBeMuted = false;
                
                if (isBackgroundAudio && !settings.controlBackgroundAudio) shouldBeMuted = true;
                if (isVideo && !settings.controlVideoAudio) shouldBeMuted = true;
                if (isNotification && !settings.controlNotificationAudio) shouldBeMuted = true;
                if (isMediaPlayer && !settings.controlMediaAudio) shouldBeMuted = true;
                
                if (shouldBeMuted) {
                  element.volume = 0;
                  element.muted = true;
                } else {
                  element.muted = false;
                  adjustVolume(element);
                }
              } else {
                element.muted = false;
                adjustVolume(element);
              }
            }
          });
        }
      });
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// Video filtrelerini uygula
function applyVideoFilters(settings) {
  const videos = document.querySelectorAll('video');
  
  if (settings.videoMode === 'normal') {
    // Normal modda tüm filtreleri kaldır
    videos.forEach(video => {
      if (!video.style.cssText.includes('filter:')) {
        // Video henüz hiç filtre uygulanmamış
        return;
      }
      
      // Sadece video filtrelerini kaldır, diğer stilleri koru
      const currentStyle = video.style.cssText;
      const newStyle = currentStyle.replace(/filter:[^;]+;?/, '');
      video.style.cssText = newStyle;
      
      // Video container'ını kontrol et
      const container = video.parentElement;
      if (container && container.classList.contains('video-filter-container')) {
        container.style.filter = '';
      }
    });
  } else if (settings.videoMode === 'custom') {
    videos.forEach(video => {
      // Video container'ı oluştur veya mevcut olanı kullan
      let container = video.parentElement;
      if (!container || !container.classList.contains('video-filter-container')) {
        container = document.createElement('div');
        container.className = 'video-filter-container';
        container.style.position = 'relative';
        container.style.display = 'inline-block';
        video.parentNode.insertBefore(container, video);
        container.appendChild(video);
      }
      
      // Filtreleri oluştur
      const filters = [
        `brightness(${settings.videoBrightness}%)`,
        `contrast(${settings.videoContrast}%)`,
        `saturate(${settings.videoSaturation}%)`,
        `hue-rotate(${settings.videoHueRotate}deg)`,
        `blur(${settings.videoBlur}px)`,
        `sepia(${settings.videoSepia}%)`,
        `grayscale(${settings.videoGrayscale}%)`,
        `invert(${settings.videoInvert}%)`
      ].join(' ');
      
      // Filtreleri container'a uygula
      container.style.filter = filters;
      
      // Video'nun kendi stillerini koru
      if (video.hasAttribute('style')) {
        const currentStyle = video.style.cssText;
        // Sadece filter özelliğini kaldır, diğer stilleri koru
        const newStyle = currentStyle.replace(/filter:[^;]+;?/, '');
        video.style.cssText = newStyle;
      }
    });
  }
  
  // MutationObserver ile yeni eklenen videoları kontrol et
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1 && node.tagName === 'VIDEO') {
          if (settings.videoMode === 'custom') {
            // Video container'ı oluştur
            const container = document.createElement('div');
            container.className = 'video-filter-container';
            container.style.position = 'relative';
            container.style.display = 'inline-block';
            
            // Filtreleri oluştur
            const filters = [
              `brightness(${settings.videoBrightness}%)`,
              `contrast(${settings.videoContrast}%)`,
              `saturate(${settings.videoSaturation}%)`,
              `hue-rotate(${settings.videoHueRotate}deg)`,
              `blur(${settings.videoBlur}px)`,
              `sepia(${settings.videoSepia}%)`,
              `grayscale(${settings.videoGrayscale}%)`,
              `invert(${settings.videoInvert}%)`
            ].join(' ');
            
            // Filtreleri container'a uygula
            container.style.filter = filters;
            
            // Video'yu container'a taşı
            node.parentNode.insertBefore(container, node);
            container.appendChild(node);
          }
        }
      });
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// Filtre stillerini oluştur
function getFilterStyles(settings) {
  let filters = '';
  
  // Renk körü filtrelerini oluştur
  const colorblindFilters = getColorblindFilter(settings.colorblindMode, settings.colorblindStrength);
  
  // Diğer filtreleri ekle
  switch(settings.filterMode) {
    case 'dark':
      filters = `${colorblindFilters} brightness(${settings.brightness}%) saturate(${settings.saturation}%) invert(90%)`;
      break;
    case 'high-contrast':
      filters = `${colorblindFilters} brightness(${settings.brightness}%) saturate(${settings.saturation}%) contrast(150%)`;
      break;
    case 'low-contrast':
      filters = `${colorblindFilters} brightness(${settings.brightness}%) saturate(${settings.saturation}%) contrast(75%)`;
      break;
    case 'sepia':
      filters = `${colorblindFilters} brightness(${settings.brightness}%) saturate(${settings.saturation}%) sepia(60%)`;
      break;
    case 'grayscale':
      filters = `${colorblindFilters} brightness(${settings.brightness}%) saturate(0%)`;
      break;
    case 'reading':
      filters = `${colorblindFilters} brightness(${settings.brightness}%) saturate(${settings.saturation}%) contrast(110%) sepia(20%)`;
      break;
    default:
      filters = `${colorblindFilters} brightness(${settings.brightness}%) saturate(${settings.saturation}%)`;
  }
  
  return filters;
}

// Renk körü filtrelerini oluştur
function getColorblindFilter(mode, strength) {
  const s = parseInt(strength) / 100;
  
  switch(mode) {
    case 'protanopia': // Kırmızı renk körlüğü
      return `
        contrast(1.05) 
        saturate(1.05)
        hue-rotate(${-50 * s}deg)
        brightness(${95 + 5 * s}%)
      `.replace(/\n/g, '').trim();
    
    case 'deuteranopia': // Yeşil renk körlüğü
      return `
        contrast(1.1)
        saturate(1.1)
        hue-rotate(${40 * s}deg)
        brightness(${95 + 5 * s}%)
      `.replace(/\n/g, '').trim();
    
    case 'tritanopia': // Mavi renk körlüğü
      return `
        contrast(1.15)
        saturate(1.15)
        hue-rotate(${-130 * s}deg)
        brightness(${95 + 5 * s}%)
      `.replace(/\n/g, '').trim();
    
    default:
      return '';
  }
}

// Animasyon hızını ayarla
function getAnimationSpeed(speed) {
  switch(speed) {
    case 'slow':
      return 1.0;
    case 'fast':
      return 0.2;
    default: // normal
      return 0.5;
  }
}
