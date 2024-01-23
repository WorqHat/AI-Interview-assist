# AI-Interview-assist by WorqHat AI

<p align="center">
  Create your own mock interview simulator using the power of WorqHat AI
</p>

<p align="center">
  <a href="https://twitter.com/worqhat">
    <img src="https://img.shields.io/twitter/follow/worqhat?style=flat&label=Follow&logo=twitter&color=0bf&logoColor=fff" alt="WorqHat's follower count" />
  </a>
  <a href="https://github.com/WorqHat/AI-Interview-assist">
    <img src="https://img.shields.io/github/stars/WorqHat/AI-Interview-assist?label=WorqHat%2FAI-Interview-assist" alt="WorqHat repo star count" />
  </a>
</p>

<p align="center">
  <a href="https://ai-interview-assist.vercel.app/">
    <img src="https://img.shields.io/badge/View%20Live%20Project-000?style=for-the-badge&logo=vercel&labelColor=000" alt="View Live Project" />
  </a>

## Introduction

WorqHat AI Interview Assist is a tool that helps you practice your interview skills. It uses the power of WorqHat AI to provide you with feedback on your mock interviews. It is built with WorqHat's Speech-to-Text and Content Generation APIs.

## One-Command Starter

You can also clone & create this repo locally with the following command:

```bash
npx create-next-app ai-interview --example "https://github.com/WorqHat/AI-Interview-assist"
```

### Frameworks

- [Next.js](https://nextjs.org/) – React framework for building performant apps with the best developer experience

### Platforms

- [Vercel](https://vercel.com/) – Easily preview & deploy changes with git

### UI

- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework for rapid UI development
- [Framer Motion](https://framer.com/motion) – Motion library for React to animate components with ease
- [`ImageResponse`](https://beta.nextjs.org/docs/api-reference/image-response) – Generate dynamic Open Graph images at the edge
- [HeadlessUI](https://headlessui.com/) - Completely unstyled, fully accessible UI components, designed to integrate beautifully with Tailwind CSS

### Data Fetching and Automation

- [WorqHat Speech-to-Text API](https://docs.worqhat.com/api-reference/speech-extraction) – WorqHat's Speech-to-Text API to transcribe Interview audio
- [WorqHat Content Generation API](https://docs.worqhat.com/api-reference/text-generation-ai/aicon-v2-textgen) – WorqHat's Content Generation API to generate feedback for the Interviewee using AiCon V2 Text Models
- [WorqHat Natural Image Understanding API](https://docs.worqhat.com/ai-models/image-analysis/image-analysis-v2) – WorqHat's Natural Image Understanding 
  Process is used to understand the Interviewee Posture and Backgrounds.

### Code Quality

- [TypeScript](https://www.typescriptlang.org/) – Static type checker for end-to-end typesafety
- [Prettier](https://prettier.io/) – Opinionated code formatter for consistent code style
- [ESLint](https://eslint.org/) – Pluggable linter for Next.js and TypeScript

### Miscellaneous

- [FFMPEG.WASM](https://ffmpegwasm.netlify.app/) – Transcode video/audio files
- [React Webcam](https://github.com/mozmorris/react-webcam) - Webcam component for React
- [Stripe Gradient Animation](https://whatamesh.vercel.app/) - [@jordienr](https://twitter.com/jordienr) released a Mesh Gradient that uses WebGL and animates a beautiful gradient

## How it all works

The app is built with Next.js and Tailwind CSS. It uses WorqHat's Speech-to-Text API to transcribe the audio from the webcam. It then uses WorqHat's Content Generation API to generate feedback for the Interviewee using AiCon V2 Text Models. The feedback is then displayed on the screen. This project can be further modified to create the mock interview simulator of your dreams by adding your own questions and difficulty levels.

## Author

- Sagnik Ghosh ([@sagnik_ghosh_11](https://twitter.com/sagnik_ghosh_11)) – [WorqHat](https://worqhat.com)
