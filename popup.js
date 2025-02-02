document.addEventListener('DOMContentLoaded', function() {
  // Tüm kontrol elementlerini seçme
  const fontFamily = document.getElementById('font-family');
  const fontSize = document.getElementById('font-size');
  const letterSpacing = document.getElementById('letter-spacing');
  const wordSpacing = document.getElementById('word-spacing');
  const lineHeight = document.getElementById('line-height');
  const paragraphSpacing = document.getElementById('paragraph-spacing');

  // Görsel filtre elementleri
  const filterMode = document.getElementById('filter-mode');
  const brightness = document.getElementById('brightness');
  const saturation = document.getElementById('saturation');
  const animationSpeed = document.getElementById('animation-speed');
  
  // Renk körü modu elementleri
  const colorblindMode = document.getElementById('colorblind-mode');
  const colorblindStrength = document.getElementById('colorblind-strength');
  const colorblindStrengthValue = document.getElementById('colorblind-strength-value');

  // Hareket kontrolü elementleri
  const motionMode = document.getElementById('motion-mode');
  const motionSpeed = document.getElementById('motion-speed');
  const motionSpeedValue = document.getElementById('motion-speed-value');
  const controlAnimations = document.getElementById('control-animations');
  const controlTransitions = document.getElementById('control-transitions');
  const controlVideos = document.getElementById('control-videos');
  const controlGifs = document.getElementById('control-gifs');

  // Ses kontrolü elementleri
  const audioMode = document.getElementById('audio-mode');
  const audioVolume = document.getElementById('audio-volume');
  const audioBalance = document.getElementById('audio-balance');
  const audioVolumeValue = document.getElementById('audio-volume-value');
  const audioBalanceValue = document.getElementById('audio-balance-value');
  const controlBackgroundAudio = document.getElementById('control-background-audio');
  const controlVideoAudio = document.getElementById('control-video-audio');
  const controlNotificationAudio = document.getElementById('control-notification-audio');
  const controlMediaAudio = document.getElementById('control-media-audio');

  // Video ayarları elementleri
  const videoMode = document.getElementById('video-mode');
  const videoBrightness = document.getElementById('video-brightness');
  const videoContrast = document.getElementById('video-contrast');
  const videoSaturation = document.getElementById('video-saturation');
  const videoHueRotate = document.getElementById('video-hue-rotate');
  const videoBlur = document.getElementById('video-blur');
  const videoSepia = document.getElementById('video-sepia');
  const videoGrayscale = document.getElementById('video-grayscale');
  const videoInvert = document.getElementById('video-invert');
  
  const videoBrightnessValue = document.getElementById('video-brightness-value');
  const videoContrastValue = document.getElementById('video-contrast-value');
  const videoSaturationValue = document.getElementById('video-saturation-value');
  const videoHueRotateValue = document.getElementById('video-hue-rotate-value');
  const videoBlurValue = document.getElementById('video-blur-value');
  const videoSepiaValue = document.getElementById('video-sepia-value');
  const videoGrayscaleValue = document.getElementById('video-grayscale-value');
  const videoInvertValue = document.getElementById('video-invert-value');

  // Profil yönetimi elementleri
  const profileNameInput = document.getElementById('profile-name');
  const saveProfileButton = document.getElementById('save-profile');
  const profileList = document.getElementById('profile-list');

  // Değer göstergeleri
  const brightnessValue = document.getElementById('brightness-value');
  const saturationValue = document.getElementById('saturation-value');
  const fontSizeValue = document.getElementById('font-size-value');
  const letterSpacingValue = document.getElementById('letter-spacing-value');
  const wordSpacingValue = document.getElementById('word-spacing-value');
  const lineHeightValue = document.getElementById('line-height-value');
  const paragraphSpacingValue = document.getElementById('paragraph-spacing-value');

  // Ön izleme elementi
  const previewText = document.querySelector('.preview-text');

  // Mevcut ayarları al
  function getCurrentSettings() {
    return {
      fontFamily: fontFamily.value,
      fontSize: fontSize.value,
      letterSpacing: letterSpacing.value,
      wordSpacing: wordSpacing.value,
      lineHeight: lineHeight.value,
      paragraphSpacing: paragraphSpacing.value,
      filterMode: filterMode.value,
      brightness: brightness.value,
      saturation: saturation.value,
      animationSpeed: animationSpeed.value,
      colorblindMode: colorblindMode.value,
      colorblindStrength: colorblindStrength.value,
      motionMode: motionMode.value,
      motionSpeed: motionSpeed.value,
      controlAnimations: controlAnimations.checked,
      controlTransitions: controlTransitions.checked,
      controlVideos: controlVideos.checked,
      controlGifs: controlGifs.checked,
      audioMode: audioMode.value,
      audioVolume: audioVolume.value,
      audioBalance: audioBalance.value,
      controlBackgroundAudio: controlBackgroundAudio.checked,
      controlVideoAudio: controlVideoAudio.checked,
      controlNotificationAudio: controlNotificationAudio.checked,
      controlMediaAudio: controlMediaAudio.checked,
      videoMode: videoMode.value,
      videoBrightness: videoBrightness.value,
      videoContrast: videoContrast.value,
      videoSaturation: videoSaturation.value,
      videoHueRotate: videoHueRotate.value,
      videoBlur: videoBlur.value,
      videoSepia: videoSepia.value,
      videoGrayscale: videoGrayscale.value,
      videoInvert: videoInvert.value,
    };
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
        `;
      
      case 'deuteranopia': // Yeşil renk körlüğü
        return `
          contrast(1.1)
          saturate(1.1)
          hue-rotate(${40 * s}deg)
          brightness(${95 + 5 * s}%)
        `;
      
      case 'tritanopia': // Mavi renk körlüğü
        return `
          contrast(1.15)
          saturate(1.15)
          hue-rotate(${-130 * s}deg)
          brightness(${95 + 5 * s}%)
        `;
      
      default:
        return '';
    }
  }

  // Aktif sekmelere ayarları uygula
  function applyToActiveTabs(settings) {
    chrome.tabs.query({}, function(tabs) {
      tabs.forEach(tab => {
        chrome.tabs.sendMessage(tab.id, {
          action: "updateStyles",
          settings: settings
        });
      });
    });
  }

  // Değer göstergelerini güncelle
  function updateValueDisplays(settings) {
    fontSizeValue.textContent = `${settings.fontSize}px`;
    letterSpacingValue.textContent = `${settings.letterSpacing}px`;
    wordSpacingValue.textContent = `${settings.wordSpacing}px`;
    lineHeightValue.textContent = settings.lineHeight;
    paragraphSpacingValue.textContent = `${settings.paragraphSpacing}px`;
    brightnessValue.textContent = `${settings.brightness}%`;
    saturationValue.textContent = `${settings.saturation}%`;
    colorblindStrengthValue.textContent = `${settings.colorblindStrength}%`;
    motionSpeedValue.textContent = `${settings.motionSpeed}%`;
    audioVolumeValue.textContent = `${settings.audioVolume}%`;
    const balanceValue = parseInt(settings.audioBalance);
    if (balanceValue === 0) {
      audioBalanceValue.textContent = 'Orta';
    } else if (balanceValue < 0) {
      audioBalanceValue.textContent = `Sol ${Math.abs(balanceValue)}%`;
    } else {
      audioBalanceValue.textContent = `Sağ ${balanceValue}%`;
    }
    videoBrightnessValue.textContent = `${settings.videoBrightness}%`;
    videoContrastValue.textContent = `${settings.videoContrast}%`;
    videoSaturationValue.textContent = `${settings.videoSaturation}%`;
    videoHueRotateValue.textContent = `${settings.videoHueRotate}°`;
    videoBlurValue.textContent = `${settings.videoBlur}px`;
    videoSepiaValue.textContent = `${settings.videoSepia}%`;
    videoGrayscaleValue.textContent = `${settings.videoGrayscale}%`;
    videoInvertValue.textContent = `${settings.videoInvert}%`;
  }

  // Ön izlemeyi güncelle
  function updatePreview(settings) {
    previewText.style.fontFamily = settings.fontFamily;
    previewText.style.fontSize = `${settings.fontSize}px`;
    previewText.style.letterSpacing = `${settings.letterSpacing}px`;
    previewText.style.wordSpacing = `${settings.wordSpacing}px`;
    previewText.style.lineHeight = settings.lineHeight;
    previewText.style.marginBottom = `${settings.paragraphSpacing}px`;
    
    const filters = getFilterStyles(settings);
    previewText.style.filter = filters;
  }

  // Ayarları uygula
  function applySettings(settings) {
    // Input değerlerini ayarla
    fontFamily.value = settings.fontFamily || 'Arial';
    fontSize.value = settings.fontSize || '16';
    letterSpacing.value = settings.letterSpacing || '0';
    wordSpacing.value = settings.wordSpacing || '0';
    lineHeight.value = settings.lineHeight || '1.5';
    paragraphSpacing.value = settings.paragraphSpacing || '16';
    filterMode.value = settings.filterMode || 'default';
    brightness.value = settings.brightness || '100';
    saturation.value = settings.saturation || '100';
    animationSpeed.value = settings.animationSpeed || 'normal';
    colorblindMode.value = settings.colorblindMode || 'normal';
    colorblindStrength.value = settings.colorblindStrength || '100';
    motionMode.value = settings.motionMode || 'normal';
    motionSpeed.value = settings.motionSpeed || '100';
    controlAnimations.checked = settings.controlAnimations !== undefined ? settings.controlAnimations : true;
    controlTransitions.checked = settings.controlTransitions !== undefined ? settings.controlTransitions : true;
    controlVideos.checked = settings.controlVideos !== undefined ? settings.controlVideos : true;
    controlGifs.checked = settings.controlGifs !== undefined ? settings.controlGifs : true;
    audioMode.value = settings.audioMode || 'normal';
    audioVolume.value = settings.audioVolume || '100';
    audioBalance.value = settings.audioBalance || '0';
    controlBackgroundAudio.checked = settings.controlBackgroundAudio !== undefined ? settings.controlBackgroundAudio : true;
    controlVideoAudio.checked = settings.controlVideoAudio !== undefined ? settings.controlVideoAudio : true;
    controlNotificationAudio.checked = settings.controlNotificationAudio !== undefined ? settings.controlNotificationAudio : true;
    controlMediaAudio.checked = settings.controlMediaAudio !== undefined ? settings.controlMediaAudio : true;
    videoMode.value = settings.videoMode || 'normal';
    videoBrightness.value = settings.videoBrightness || '100';
    videoContrast.value = settings.videoContrast || '100';
    videoSaturation.value = settings.videoSaturation || '100';
    videoHueRotate.value = settings.videoHueRotate || '0';
    videoBlur.value = settings.videoBlur || '0';
    videoSepia.value = settings.videoSepia || '0';
    videoGrayscale.value = settings.videoGrayscale || '0';
    videoInvert.value = settings.videoInvert || '0';

    // Değer göstergelerini güncelle
    updateValueDisplays(settings);

    // Ön izleme ve aktif sekmeleri güncelle
    updatePreview(settings);
    applyToActiveTabs(settings);
  }

  // Yazı tipi değişikliği için yardımcı fonksiyonlar
  function applyFontClass(className) {
    // Tüm font sınıflarını kaldır
    document.body.classList.remove(
      'font-dyslexic-1', 'font-dyslexic-2', 'font-dyslexic-3',
      'font-autism-1', 'font-autism-2', 'font-autism-3',
      'font-visual-1', 'font-visual-2', 'font-visual-3'
    );
    if (className) {
      document.body.classList.add(className);
    }
  }

  function setFontForSpectrum(spectrum, variant = 1) {
    switch(spectrum) {
      case 'dyslexia':
        applyFontClass(`font-dyslexic-${variant}`);
        break;
      case 'autism':
        applyFontClass(`font-autism-${variant}`);
        break;
      case 'visual':
        applyFontClass(`font-visual-${variant}`);
        break;
      default:
        applyFontClass(''); // Varsayılan font
    }
  }

  // Event listener'ları ekle
  [brightness, saturation, fontSize, letterSpacing, wordSpacing, lineHeight, paragraphSpacing, colorblindStrength, motionSpeed, audioVolume, audioBalance, videoBrightness, videoContrast, videoSaturation, videoHueRotate, videoBlur, videoSepia, videoGrayscale, videoInvert].forEach(input => {
    input.addEventListener('input', function() {
      const settings = getCurrentSettings();
      updateValueDisplays(settings);
      updatePreview(settings);
      applyToActiveTabs(settings);
    });
  });

  [fontFamily, filterMode, animationSpeed, colorblindMode, motionMode, audioMode, videoMode].forEach(select => {
    select.addEventListener('change', function() {
      const settings = getCurrentSettings();
      updatePreview(settings);
      applyToActiveTabs(settings);
    });
  });

  // Checkbox'lar için event listener'lar
  [controlAnimations, controlTransitions, controlVideos, controlGifs,
   controlBackgroundAudio, controlVideoAudio, controlNotificationAudio, controlMediaAudio].forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const settings = getCurrentSettings();
      updatePreview(settings);
      applyToActiveTabs(settings);
    });
  });

  // İlk yüklemede değerleri göster
  const initialSettings = getCurrentSettings();
  updateValueDisplays(initialSettings);

  // Profil listesini güncelle
  function updateProfileList(profiles) {
    const profileList = document.getElementById('profile-list');
    if (!profiles || profiles.length === 0) {
      profileList.innerHTML = '<div class="no-profiles">Henüz kaydedilmiş profil bulunmuyor</div>';
      return;
    }

    profileList.innerHTML = profiles.map(profile => `
      <div class="profile-item">
        <span class="profile-item-name">${profile.name}</span>
        <div class="profile-item-actions">
          <button class="load-btn" data-profile="${profile.name}">Yükle</button>
          <button class="delete-btn" data-profile="${profile.name}">Sil</button>
        </div>
      </div>
    `).join('');
  }

  // Profil kaydetme
  saveProfileButton.onclick = function() {
    const profileName = profileNameInput.value.trim();
    if (!profileName) {
      alert('Lütfen profil adı girin!');
      return;
    }

    chrome.storage.local.get('profiles', function(result) {
      const profiles = result.profiles || {};
      profiles[profileName] = getCurrentSettings();
      chrome.storage.local.set({ 
        profiles: profiles,
        activeProfile: profileName 
      }, function() {
        updateProfileList(Object.keys(profiles).map(profileName => ({ name: profileName })));
        profileNameInput.value = '';
      });
    });
  };

  // Profilleri yükle
  chrome.storage.local.get(['profiles', 'activeProfile'], function(result) {
    if (result.activeProfile && result.profiles && result.profiles[result.activeProfile]) {
      applySettings(result.profiles[result.activeProfile]);
    } else {
      applySettings({
        fontFamily: 'Arial',
        fontSize: '16',
        letterSpacing: '0',
        wordSpacing: '0',
        lineHeight: '1.5',
        paragraphSpacing: '16',
        filterMode: 'default',
        brightness: '100',
        saturation: '100',
        animationSpeed: 'normal',
        colorblindMode: 'normal',
        colorblindStrength: '100',
        motionMode: 'normal',
        motionSpeed: '100',
        controlAnimations: true,
        controlTransitions: true,
        controlVideos: true,
        controlGifs: true,
        audioMode: 'normal',
        audioVolume: '100',
        audioBalance: '0',
        controlBackgroundAudio: true,
        controlVideoAudio: true,
        controlNotificationAudio: true,
        controlMediaAudio: true,
        videoMode: 'normal',
        videoBrightness: '100',
        videoContrast: '100',
        videoSaturation: '100',
        videoHueRotate: '0',
        videoBlur: '0',
        videoSepia: '0',
        videoGrayscale: '0',
        videoInvert: '0',
      });
    }
    updateProfileList(result.profiles ? Object.keys(result.profiles).map(profileName => ({ name: profileName })) : []);
  });
});
