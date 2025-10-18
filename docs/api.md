# API Documentation

## Overview

LightChain Solana provides a comprehensive REST API and WebSocket interface for programmatic access to trading functionality, market data, and account management.

## Base URL

```
https://api.lightchain.solana
```

## Authentication

All API requests require authentication using API keys. You can generate API keys in your account settings.

### Headers

```http
X-API-Key: your_api_key_here
X-API-Secret: your_api_secret_here
```

## REST API

### Endpoints

#### Market Data

##### Get All Markets
```http
GET /api/v1/markets
```

**Response:**
```json
{
  "markets": [
    {
      "symbol": "SOL-USDC",
      "baseAsset": "SOL",
      "quoteAsset": "USDC",
      "status": "active",
      "price": "150.25",
      "change24h": "+2.5%"
    }
  ]
}
```

##### Get Market Data
```http
GET /api/v1/markets/{symbol}
```

**Parameters:**
- `symbol`: Trading pair symbol (e.g., "SOL-USDC")

**Response:**
```json
{
  "symbol": "SOL-USDC",
  "price": "150.25",
  "bid": "150.20",
  "ask": "150.30",
  "volume24h": "1250000",
  "high24h": "155.00",
  "low24h": "145.00"
}
```

#### Trading

##### Place Order
```http
POST /api/v1/orders
```

**Request Body:**
```json
{
  "symbol": "SOL-USDC",
  "side": "buy",
  "type": "limit",
  "quantity": "10",
  "price": "150.00",
  "leverage": "5"
}
```

**Response:**
```json
{
  "orderId": "123456789",
  "status": "pending",
  "symbol": "SOL-USDC",
  "side": "buy",
  "quantity": "10",
  "price": "150.00",
  "timestamp": "2025-01-18T10:30:00Z"
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