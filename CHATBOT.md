# Ajuy Chatbot

The Ajuy Municipality chatbot is a **local knowledge-based assistant** that answers questions using only the information stored in the website's database. No external APIs or AI services are required.

## Features

✅ **No API Keys Required** - Works entirely with local data  
✅ **Instant Responses** - Fast, no external API calls  
✅ **Privacy-Friendly** - All processing happens on your server  
✅ **Location Mapping** - Automatically detects and maps locations from the knowledge base  
✅ **Smart Greetings** - Handles greetings and casual conversations  
✅ **Rate Limiting** - Built-in protection (12 requests per minute per IP)

## How It Works

1. **Knowledge Retrieval**: Searches through local data files for relevant information
2. **Pattern Matching**: Uses keyword matching and scoring to find the best answers
3. **Location Detection**: Identifies location queries and returns map coordinates
4. **Response Generation**: Combines relevant knowledge chunks into coherent answers

## Data Sources

The chatbot pulls information from:

- `/data/barangays.ts` - All 34 barangays with population data
- `/data/attractions.ts` - Tourist destinations and landmarks  
- `/data/population.ts` - Historical census data
- `/data/culture.ts` - Cultural highlights and festivals
- `/data/emergency.ts` - Emergency contacts
- `/data/services.ts` - Municipal services
- `/data/municipality.ts` - General municipal information

## Supported Query Types

### 1. General Information
- "Tell me about Ajuy"
- "What is the population of Ajuy?"
- "Who is the mayor?"

### 2. Barangay Queries
- "What barangays are in Ajuy?"
- "Tell me about Barangay Culasi"
- "Population of Barangay Pili"

### 3. Tourist Attractions
- "What are the tourist spots?"
- "Tell me about Nasidman Island"
- "Where can I visit in Ajuy?"

### 4. Location Queries
- "Where is Nasidman Island?"
- "Location of Municipal Hall"
- "Show me Barangay Culasi on a map"

### 5. Culture & Services
- "What festivals does Ajuy have?"
- "Emergency contacts in Ajuy"
- "What services are available?"

## Greetings

The chatbot recognizes common greetings in English and Filipino:
- Hi, Hello, Hey, Good morning
- Kumusta, Kamusta, Magandang
- Thank you, Salamat

## Rate Limiting

- **12 requests per minute** per IP address
- **60-second window** before reset
- Returns HTTP 429 if exceeded

## Location Mapping

When a location query is detected, the chatbot:

1. Searches the knowledge base for matching places
2. Returns location details from `/data/attractions.ts` or `/data/barangays.ts`
3. Provides a `ChatLocation` object with:
   - Name and kind (Barangay, Attraction, Place)
   - Google Maps query string
   - Description and details
   - Optional place ID and maps URL

The frontend then displays an interactive map for the location.

## Response Format

```json
{
  "answer": "text response here",
  "location": {
    "id": "unique-id",
    "name": "Place Name",
    "kind": "Barangay | Attraction | Place",
    "query": "Place Name, Ajuy, Iloilo, Philippines",
    "detail": "Additional context"
  }
}
```

## Limitations

- ❌ Cannot answer questions about topics outside Ajuy
- ❌ Cannot provide real-time information (weather, news, events)
- ❌ Cannot answer questions not in the knowledge base
- ❌ Cannot perform complex reasoning or calculations
- ❌ Cannot learn from conversations (stateless)

## Updating Knowledge

To add new information to the chatbot:

1. Update the relevant data file in `/data/`
2. Update `/lib/knowledge.ts` to include the new data in `knowledgeChunks`
3. Restart the development server

## API Endpoint

**POST** `/api/chat`

**Request Body:**
```json
{
  "question": "Where is Nasidman Island?"
}
```

**Response:**
```json
{
  "answer": "Nasidman Island is a small inhabited island...",
  "location": {
    "id": "nasidman-island",
    "name": "Nasidman Island",
    "kind": "Attraction",
    "query": "Nasidman Island, Ajuy, Iloilo, Philippines",
    "detail": "Barangay Nasidman · Island"
  }
}
```

## Error Handling

- `400` - Invalid or empty message
- `429` - Too many requests (rate limit exceeded)
- `500` - Internal server error

## Performance

- **Average response time**: < 50ms
- **No external dependencies**: No API calls to external services
- **Lightweight**: Minimal server resources required
- **Scalable**: Can handle many concurrent users

## Future Enhancements

Possible improvements (if needed):
- Add fuzzy string matching for typos
- Support Hiligaynon language queries
- Add conversation history (per session)
- Expand knowledge base with more municipal data
- Add admin interface to update knowledge base
