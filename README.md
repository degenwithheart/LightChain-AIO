# Lightchain AIO - AI-Powered Block Explorer & Launchpad

Lightchain AIO is an innovative platform that combines the functionalities of a blockchain explorer, a token launchpad, and AI-powered tools. This project provides users with a seamless experience [...]

---

## Features

### **1. Block Explorer**
- **Block List**: View a comprehensive list of blockchain blocks with relevant details.
- **Block Details**: Access detailed information about specific blocks, including transactions and timestamps.

### **2. Token Launch Management**
- **Launch Form**: Create and manage token launch projects with an intuitive form.
- **Launch List**: Display a list of ongoing and past token launches for easy tracking.

### **3. AI Integration**
- **ChatBot**: Engage with an AI-powered chat interface for user support and interaction.
- **Analytics**: Access AI-generated insights and analytics to make informed decisions.

### **4. Developer Tools**
- **Code Editor**: Utilize a code editing interface for developing and testing smart contracts.
- **API Console**: Interact with various APIs directly from the platform for enhanced functionality.

### **5. Wallet Integration**
- Connect and disconnect MetaMask wallets.
- Display connected wallet details and manage blockchain interactions.

### **6. Multi-Language Support**
- Switch between English and Spanish dynamically using the language switcher.

### **7. Progressive Web App (PWA)**
- Offline support with service worker caching.
- Installable on mobile and desktop devices.

---

## Technologies Used

- **React**: For building the user interface.
- **Web3.js**: To interact with the Ethereum blockchain.
- **Tailwind CSS**: For modern and responsive styling.
- **TypeScript**: For type-safe development.
- **i18next**: For multi-language support.
- **React Query**: For efficient data fetching and caching.
- **React Toastify**: For user-friendly notifications.

---

## Prerequisites

Before you begin, ensure you have the following installed on your machine:
- **Node.js** (v14 or higher) and **npm** (v6 or higher)
- **MetaMask** browser extension for wallet integration

---

## Installation

Follow these steps to set up the project locally:

### **1. Clone the Repository**
```bash
git clone https://github.com/stuartmoseley/LightChain-AIO.git
```

### **2. Navigate to the Project Directory**
```bash
cd LightChain-AIO
```

### **3. Install Dependencies**
Install the required dependencies using npm:
```bash
npm install
```

---

## Running the Application

### **1. Start the Development Server**
To start the development server, run:
```bash
npm start
```
The application will be available at `http://localhost:3000`.

### **2. Build for Production**
To create a production build, run:
```bash
npm run build
```
The build files will be generated in the `build/` directory.

### **3. Serve the Production Build**
To serve the production build locally, you can use a static server like `serve`:
```bash
npx serve -s build
```

---

## Project Structure

The project is organized as follows:

```
lightchain-aio/
├── public/                     # Static files
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json           # PWA configuration
│   ├── service-worker.js       # Service worker for offline support
│   └── styles.css
├── src/                        # Source code
│   ├── components/             # Reusable components
│   │   ├── AIIntegration/      # AI-related components
│   │   ├── BlockExplorer/      # Blockchain explorer components
│   │   ├── common/             # Shared components (e.g., forms, lists)
│   │   ├── DeveloperTools/     # Developer tools (e.g., code editor, API console)
│   │   └── TokenLaunch/        # Token launch components
│   ├── contexts/               # Context providers (e.g., Web3Context)
│   ├── hooks/                  # Custom hooks (e.g., useWeb3, useAI)
│   ├── locales/                # Language files for translations
│   ├── pages/                  # Page-level components
│   ├── styles/                 # Tailwind CSS configuration
│   ├── types/                  # TypeScript type definitions
│   ├── utils/                  # Utility functions and constants
│   ├── App.tsx                 # Main application component
│   ├── index.tsx               # Entry point of the application
│   └── i18n.ts                 # i18next configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Project metadata and dependencies
└── README.md                   # Project documentation
```

---

## Environment Variables

To configure the application, create a `.env` file in the root directory with the following variables:

```env
# API URL for backend services
REACT_APP_API_URL=https://api.example.com

# OpenAI API key for AI features
REACT_APP_AI_API_KEY=your-openai-api-key
```

Replace `your-openai-api-key` with your actual OpenAI API key.

---

## Features in Detail

### **1. Block Explorer**
- Navigate to `/block-explorer` to view the list of blocks and their details.
- The `BlockList` and `BlockDetails` components handle the display of block data.

### **2. Token Launch**
- Navigate to `/token-launch` to create and manage token launches.
- Use the `LaunchForm` to create a new token and `LaunchList` to view existing launches.

### **3. AI Integration**
- Navigate to `/ai-integration` to interact with the AI ChatBot and view analytics.
- The `ChatBot` component allows users to ask questions, while the `Analytics` component displays AI-generated insights.

### **4. Developer Tools**
- Navigate to `/developer-tools` to access the code editor and API console.
- Use the `CodeEditor` to write and test code, and the `APIConsole` to interact with APIs.

### **5. Wallet Integration**
- Use the `WalletConnector` component to connect and disconnect MetaMask wallets.
- Wallet details are displayed dynamically, and blockchain interactions are managed via Web3.js.

### **6. Multi-Language Support**
- Switch between English and Spanish using the `LanguageSwitcher` component.
- All text is dynamically translated using `i18next`.

### **7. PWA Features**
- The app is installable on mobile and desktop devices.
- Offline support is enabled via the service worker (`service-worker.js`).

---

## Contributing

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contact

For questions or support, please contact myself at Github.

---

## ☕ Support My Work
If you find my work useful or interesting, consider supporting me to keep me going!

<a href="https://www.buymeacoffee.com/stewiemo"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=stewiemo&button_colour=FFDD00&font_colour=000000&font_family=Arial&outline_colour=000000&coffee_colour=ffffff"></a>
