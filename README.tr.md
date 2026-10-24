Türkçe | [English](README.md)

[![Site check](https://github.com/oguzhanbilir/duyusalRahatlik/actions/workflows/check.yml/badge.svg)](https://github.com/oguzhanbilir/duyusalRahatlik/actions/workflows/check.yml)

<p align="center"><img src="images/logo.png" width="96" alt="Duyusal Rahatlık logosu" /></p>

# Duyusal Rahatlık

Chromium tabanlı tarayıcılar (Chrome, Edge, Opera, Brave) için web sayfalarını göze daha rahat ve daha az yorucu hale getiren bir tarayıcı eklentisi. Duyusal hassasiyeti olan ve az gören kullanıcılar düşünülerek, WCAG 2.1 yönergelerine göre geliştirildi.

**TÜBİTAK 2204-B** · Bölge sergisi 2.liği (2024)

Proje sayfası: https://oguzhanbilir.github.io/duyusalRahatlik/

## Özellikler

- Renk kontrastını değiştirme
- Yazı boyutunu ayarlama
- Sayfa animasyonlarını kapatma
- Parlaklığı ayarlama
- Harf ve satır aralığını artırma
- Odak modu

Ayarlar kaydedilir ve açtığınız her sayfaya uygulanır.

## Kurulum

```bash
git clone https://github.com/oguzhanbilir/duyusalRahatlik.git
```

1. `chrome://extensions/` adresini açın (Edge'de `edge://extensions/`, Opera'da `opera://extensions/`)
2. Geliştirici modunu açın
3. "Paketlenmemiş öğe yükle"ye tıklayıp klonlanan klasörü seçin

Ayarlar için araç çubuğundaki eklenti simgesine tıklayın. `test.html` seçenekleri denemek için örnek bir sayfadır; `gorseller/` klasöründe bu sayfanın kullandığı test görselleri (Ishihara levhaları gibi) bulunur.

## Dosyalar

| Dosya | Görevi |
|-------|--------|
| `manifest.json` | Eklenti manifesti |
| `popup.html`, `popup.js` | Ayarlar paneli |
| `content.js` | Ayarları sayfaya uygular |
| `style.css` | Sayfalara eklenen stiller |

## Emeği geçenler

Öğrenci araştırma projesi. Danışman ve geliştirici: Oğuzhan Bilir.
