# Real Time Translation | Language Bridge

## Real-Time Translation Chat

### Existing Solutions
While translation chat apps exist, most have limitations:
- Google Translate Chat
- Microsoft Translator
- iTranslate
- Papago

### Unique Features
Advanced Features to Distinguish:
- AI-powered contextual translation
- Dialect/regional language nuances
- Cultural context interpretation
- Machine learning adaptation to user communication style

### Technical Implementation Strategy
#### Core Technologies
- WebSocket for real-time communication
- MistrailAI for AI Technologies
- Next.js for frontend/backend

### Potential Unique Features
- Conversation memory/learning
- Account based private messaging
- Professional vs casual language modes
- Privacy-focused encrypted translations
- Background cultural context notes
- Pronunciation guides
- Voice to text

### Potential Monetization Models
- Freemium translation credits
- Professional/enterprise language services
- Advanced language learning integrations
- Per-minute translation charges

### Competitive Differentiation
✅ Focus on nuanced, context-aware translations
✅ User-customizable translation experiences
✅ Advanced linguistic machine learning

Conclusion: Viable project with significant innovation potential!

## Getting Started

- Clone the repository
- Aqquire a MistralAI API Key and place in a `.env` file. `MISTRAL_API_KEY="your_key"`
- Run `npm install`
- Run `npm run dev`
- Open localhost 3000

### Prerequisites

- NodeJS
- NPM

### Installing

Clone Repository

Install Dependencies
```
npm install
```

Aqquire an API key from Mistal.AI and place in your `.env` file.
```:.env
MISTRAL_API_KEY="YOUR KEY HERE"
```

Run
```
npm run dev
```

Open `http://localhost:3000/`

Test socket creation and messaging features. Be aware of MistalAI's max API calls. 

### Console related tests

Be sure to check the console on the client as well as on the server for potential issues.

## Built With

* [NextJS](https://nextjs.org/) - The web framework used
* [TailwindCSS](https://tailwindcss.com/) - Styling framepwork
* [MistralAI](https://mistral.ai/) - AI API used for translation
* [Socket.IO](https://socket.io/) - Library for web sockets

## Contributing

Currently, the repository is closed for contributions.

## Authors

* **Trevor Childs** - *Creator* - [Personal Portfolio](https://trevor-childs.com/)

## Acknowledgments

* This project was a Capstone Assignment for Tooele Technical College 
