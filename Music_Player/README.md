# Wavely Music Player

A modern, feature-rich music player built using HTML, CSS, and JavaScript. Wavely combines an elegant user interface with advanced audio controls, providing an engaging and responsive music listening experience directly in the browser.

---

## Overview

Wavely is a web-based music player designed to deliver a smooth and interactive audio experience. It features a modern glassmorphism-inspired design, real-time audio visualization, equalizer controls, synchronized lyrics display, playlist management, and theme customization.

---

## Features

### Music Playback

* Play, pause, next, and previous controls
* Interactive playlist management
* Seekable progress bar
* Current time and track duration display
* Shuffle and repeat functionality

### User Interface

* Modern glassmorphism design
* Animated vinyl record player
* Smooth transitions and animations
* Fully responsive layout
* Dynamic background effects

### Theme Support

* Dark mode
* Light mode
* Theme preference persistence using Local Storage

### Audio Visualization

* Real-time audio visualizer
* Playback activity indicators
* Dynamic visual feedback

### Equalizer

* Multi-band audio equalizer
* Adjustable frequency controls
* Preset sound profiles
* Real-time audio processing using the Web Audio API

### Lyrics Support

* Synchronized lyrics display
* Automatic lyric scrolling
* Active lyric highlighting
* Interactive lyric navigation

### Search Functionality

* Instant playlist search
* Dynamic filtering
* Search result highlighting

### Favorites Management

* Like and unlike tracks
* Persistent storage using Local Storage
* Quick access to favorite songs

### Responsive Design

* Mobile-friendly interface
* Adaptive controls for different screen sizes
* Consistent user experience across devices

---

## Technologies Used

* HTML5
* CSS3
* JavaScript (ES6+)
* Web Audio API
* Local Storage API

---

## Project Structure

```text
wavely/
│
├── index.html
├── styles.css
├── script.js
├── assets/
│   ├── images/
│   ├── audio/
│   └── icons/
│
└── README.md
```

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/yourusername/wavely.git
```

### Navigate to the Project Folder

```bash
cd wavely
```

### Run a Local Server

Using Python:

```bash
python -m http.server 8000
```

or

```bash
python3 -m http.server 8000
```

### Open in Browser

```text
http://localhost:8000
```

**Note:** Running the project through a local server is recommended because modern browsers restrict certain audio features when opening files directly using the `file://` protocol.

---

## Audio Processing Architecture

The application uses the Web Audio API to process audio efficiently.

```text
Audio Source
      ↓
MediaElementSource
      ↓
Equalizer Filters
      ↓
Gain Node (Volume Control)
      ↓
Audio Output
```

This architecture provides:

* Smooth playback
* Accurate volume control
* Real-time equalizer adjustments
* Better performance and browser compatibility

---

## Future Enhancements

* User-created playlists
* Drag-and-drop music uploads
* Advanced audio spectrum analyzer
* Online music streaming integration
* User authentication system
* Cloud synchronization
* Offline playback support
* Keyboard shortcuts
* Progressive Web App (PWA) support

---

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to your branch

```bash
git push origin feature-name
```

5. Submit a Pull Request

---

## Author

Developed using HTML, CSS, and JavaScript.

Project Name: **Wavely Music Player**
