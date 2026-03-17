# AI-Lead-Scorer-Python

AI-powered lead scoring tool built in Python using Groq LLM API.

## What It Does

- Analyzes incoming lead messages using AI
- Scores buying intent (1-10)
- Assigns priority (HIGH / MEDIUM / LOW)
- Skips invalid or empty messages automatically
- Saves structured results to JSON file

## How It Works

1. Add leads with name, company and message
2. Script sends each message to Groq LLM API
3. AI analyzes intent and returns score and priority
4. Results saved automatically to `ai_lead_report.json`

## Tech Stack

- Python
- Groq LLM API (llama-3.1-8b-instant)
- JSON file storage
- Error handling and status tracking

## Status

Working prototype.
Built as a portfolio project demonstrating AI lead scoring in pure Python.
