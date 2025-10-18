# API Documentation

## Overview

LightChain Solana provides a simple API for accessing market data, prices, and position information. The API is currently in development and uses mock data for demonstration purposes.

## Base URL

```
https://your-domain.com/api
```

**Note:** This is a frontend-only application. All API routes are Next.js API routes that run on the same domain as the frontend.

## API Endpoints

### Market Data

#### Get Market Data for Token
```http
GET /api/markets/{tokenAddress}
```

**Parameters:**
- `tokenAddress`: Solana token address (string)

**Response:**
```json
{
  "tokenAddress": "So11111111111111111111111111111111111111112",
  "symbol": "SOL",
  "name": "Solana",
  "price": 145.67,
  "change24h": 2.34,
  "volume24h": 2847500000,
  "marketCap": 65000000000,
  "liquidity": 500000000,
  "isActive": true,
  "maxLeverage": 10,
  "fundingRate": 0.0001,
  "openInterest": 150000000,
  "timestamp": "2025-10-18T10:30:00.000Z",
  "source": "mock_data"
}
```

**Status:** Returns mock data for demonstration. In production, would query DEX programs.

### Price Data

#### Get Current Price
```http
GET /api/prices/current/{tokenAddress}
```

**Parameters:**
- `tokenAddress`: Solana token address (string)

**Response:**
```json
{
  "tokenAddress": "So11111111111111111111111111111111111111112",
  "price": 145.67,
  "priceChange24h": 2.34,
  "volume24h": 2847500000,
  "liquidity": 500000000,
  "source": "dexscreener",
  "timestamp": "2025-10-18T10:30:00.000Z"
}
```

**Status:** Fetches real data from DexScreener API.

### Position Data

#### Get User Positions
```http
GET /api/positions/{traderAddress}
```

**Parameters:**
- `traderAddress`: Solana wallet address (string)

**Response:**
```json
[
  {
    "id": "pos_1",
    "token": "SOL",
    "side": "Long",
    "size": 10,
    "entryPrice": 140.50,
    "currentPrice": 145.67,
    "pnl": 51.70,
    "pnlPercent": 3.68,
    "leverage": 5,
    "liquidationPrice": 112.40,
    "timestamp": "2025-10-17T10:30:00.000Z"
  }
]
```

**Status:** Returns mock data for demonstration. In production, would query blockchain.

### Data Population

#### Populate All Data
```http
GET /api/populate/all
```

Populates all market data, tokens, trades, and metadata.

#### Populate Tokens
```http
GET /api/populate/tokens
```

Fetches and caches token information from DexScreener.

#### Populate Trades
```http
GET /api/populate/trades
```

Fetches recent trade data.

#### Populate Metadata
```http
GET /api/populate/metadata
```

Updates token metadata and market information.

## Error Responses

All endpoints return errors in the following format:

```json
{
  "error": "Error message description"
}
```

Common HTTP status codes:
- `400` - Bad Request (invalid parameters)
- `404` - Not Found (token/market not found)
- `500` - Internal Server Error

## Rate Limiting

Currently no rate limiting is implemented. This should be added in production.

## Authentication

No authentication is currently required. All endpoints are public.

**Security Note:** In production, authentication and authorization should be implemented for user-specific endpoints.

## Development Status

- ✅ Market data endpoint (mock data)
- ✅ Price data endpoint (real data from DexScreener)
- ✅ Position data endpoint (mock data)
- ✅ Data population endpoints
- ❌ Order placement endpoints (not implemented)
- ❌ User authentication (not implemented)
- ❌ WebSocket real-time data (not implemented)

## Future Enhancements

- Real blockchain data integration
- Order placement and management
- User authentication and API keys
- WebSocket streams for real-time updates
- Rate limiting and request throttling
- Comprehensive error handling and logging

---

**Last updated:** October 18, 2025
}
```

##### Get Order Status
```http
GET /api/v1/orders/{orderId}
```

##### Cancel Order
```http
DELETE /api/v1/orders/{orderId}
```

#### Account

##### Get Account Balance
```http
GET /api/v1/account/balance
```

**Response:**
```json
{
  "balances": [
    {
      "asset": "USDC",
      "free": "1000.00",
      "locked": "250.00",
      "total": "1250.00"
    },
    {
      "asset": "SOL",
      "free": "5.5",
      "locked": "2.0",
      "total": "7.5"
    }
  ]
}
```

##### Get Positions
```http
GET /api/v1/account/positions
```

**Response:**
```json
{
  "positions": [
    {
      "symbol": "SOL-USDC",
      "side": "long",
      "quantity": "10",
      "entryPrice": "145.00",
      "markPrice": "150.25",
      "pnl": "525.00",
      "leverage": "5"
    }
  ]
}
```

## WebSocket API

### Connection

```javascript
const ws = new WebSocket('wss://api.lightchain.solana/ws');
```

### Authentication

```javascript
ws.send(JSON.stringify({
  type: 'auth',
  apiKey: 'your_api_key',
  apiSecret: 'your_api_secret'
}));
```

### Market Data Streams

#### Subscribe to Market Data
```javascript
ws.send(JSON.stringify({
  type: 'subscribe',
  channels: ['ticker', 'trades', 'orderbook'],
  symbols: ['SOL-USDC']
}));
```

#### Ticker Stream
```json
{
  "channel": "ticker",
  "symbol": "SOL-USDC",
  "data": {
    "price": "150.25",
    "bid": "150.20",
    "ask": "150.30",
    "volume24h": "1250000",
    "change24h": "+2.5%"
  }
}
```

#### Order Book Stream
```json
{
  "channel": "orderbook",
  "symbol": "SOL-USDC",
  "data": {
    "bids": [["150.20", "100"], ["150.15", "250"]],
    "asks": [["150.30", "150"], ["150.35", "200"]]
  }
}
```

### Private Streams

#### Order Updates
```json
{
  "channel": "orders",
  "data": {
    "orderId": "123456789",
    "status": "filled",
    "filledQuantity": "10",
    "averagePrice": "150.25"
  }
}
```

#### Position Updates
```json
{
  "channel": "positions",
  "data": {
    "symbol": "SOL-USDC",
    "pnl": "525.00",
    "markPrice": "150.25"
  }
}
```

## Rate Limits

- REST API: 1000 requests per minute
- WebSocket: 100 messages per second

## Error Handling

All API errors follow this format:

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Invalid request parameters",
    "details": {}
  }
}
```

### Common Error Codes

- `INVALID_API_KEY`: Authentication failed
- `INSUFFICIENT_BALANCE`: Not enough funds
- `MARKET_CLOSED`: Trading pair is not available
- `INVALID_ORDER`: Order parameters are invalid
- `RATE_LIMIT_EXCEEDED`: Too many requests

## SDK

LightChain provides official SDKs for easy integration:

### JavaScript/TypeScript SDK

```bash
npm install @lightchain/solana-sdk
```

```javascript
import { LightChainClient } from '@lightchain/solana-sdk';

const client = new LightChainClient({
  apiKey: 'your_api_key',
  apiSecret: 'your_api_secret'
});

// Get market data
const markets = await client.getMarkets();

// Place an order
const order = await client.placeOrder({
  symbol: 'SOL-USDC',
  side: 'buy',
  type: 'market',
  quantity: '10'
});
```

## Support

For API support, please contact our development team at [support@lightchain.solana](mailto:support@lightchain.solana) or join our [Discord community](https://discord.gg/lightchain).