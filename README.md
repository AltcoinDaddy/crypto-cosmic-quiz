# Cosmic Crypto Quiz

Cosmic Crypto Quiz is an interactive web-based game that tests your knowledge of current cryptocurrency prices and market trends. Built with React and TypeScript, this game fetches real-time data from the Chainbase API to create an engaging and educational experience for crypto enthusiasts.

## Features

- Real-time cryptocurrency price data
- Questions about multiple cryptocurrencies (BTC, ETH, BNB, ADA, SOL)
- Interactive space-themed UI
- Instant feedback on answers
- Score tracking and end-game summary
- Responsive design for desktop and mobile

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/cosmic-crypto-quiz.git
   ```

2. Navigate to the project directory:
   ```
   cd cosmic-crypto-quiz
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your Chainbase API key:
   ```
   REACT_APP_CHAINBASE_API_KEY=your_api_key_here
   ```

## Usage

To run the game locally:

1. Start the development server:
   ```
   npm start
   ```

2. Open your browser and visit `http://localhost:3000`

## Configuration

You can modify the following in the `CryptoTriviaGame.tsx` file:

- `CHAINBASE_API_KEY`: Your Chainbase API key (preferably set as an environment variable)
- `CHAINBASE_API_URL`: The base URL for the Chainbase API
- Cryptocurrency contract addresses in the `fetchBlockchainData` function

## Contributing

Contributions to the Cosmic Crypto Quiz are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contact

If you have any questions or feedback, please open an issue on the GitHub repository.

## Acknowledgements

- [Chainbase API](https://chainbase.online/) for providing real-time cryptocurrency data
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide React](https://lucide.dev/) for icons

Enjoy playing and learning with the Cosmic Crypto Quiz!
