# 3D Printable Stencil Generator

A browser-based web application that generates 3D-printable STL files for stencil designs using AI. Create multiple stencil designs on a single plate that can be printed together.

## 🚀 Demo

**[Live Demo](https://juhenius.github.io/stencil/)**

> **⚠️ Note:** You'll need to provide your own OpenAI API key to use the demo. The application runs entirely in your browser and does not store or transmit your API key.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- OpenAI API key

### Installation

1. Clone the repository:

```bash
git clone https://github.com/juhenius/stencil.git
cd stencil
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Usage

1. Enter your OpenAI API key in the settings panel
2. Set a global prompt for overall stencil style and theme
3. Add individual stencils with specific prompts
4. Generate designs using the AI
5. Preview the plate layout
6. Export as STL for 3D printing

## 📋 Requirements

- Modern browser with WebGL support
- OpenAI API key
- 3D printer for physical output

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Jari Helenius

[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- MARKDOWN LINKS & IMAGES -->

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/jari-helenius-a445478a
