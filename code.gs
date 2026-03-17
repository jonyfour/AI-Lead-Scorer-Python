import requests
import json

api_key = "your_groq_api_key"

def analyze_lead(name, company, message):
    try:
        if not message or len(message) < 10:
            raise ValueError("Message too short or empty")
        
        headers = {
            "Authorization": "Bearer " + api_key,
            "Content-Type": "application/json"
        }
        
        payload = {
            "model": "llama-3.1-8b-instant",
            "messages": [
                {
                    "role": "user",
                    "content": f"Analyze this business lead. Return ONLY a JSON with score (1-10) and priority (HIGH/MEDIUM/LOW). Message: '{message}'"
                }
            ]
        }
        
        response = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers=headers,
            json=payload
        )
        
        result = response.json()
        ai_response = result["choices"][0]["message"]["content"]
        
        # Clean and parse JSON
        clean = ai_response.strip()
        if "```" in clean:
            clean = clean.split("```")[1]
            if clean.startswith("json"):
                clean = clean[4:]
        
        parsed = json.loads(clean.strip())
        
        return {
            "name": name,
            "company": company,
            "score": parsed["score"],
            "priority": parsed["priority"],
            "status": "DONE"
        }
    
    except ValueError as e:
        return {"name": name, "company": company, "score": 0, "priority": "SKIP", "status": str(e)}
    except Exception as e:
        return {"name": name, "company": company, "score": 0, "priority": "ERROR", "status": str(e)}

# Test leads
leads = [
    {"name": "John Smith", "company": "Real Estate Ltd", "message": "I urgently need to automate my lead workflow for my team"},
    {"name": "Maria Garcia", "company": "HR Agency", "message": "We want to screen candidates automatically"},
    {"name": "Ahmed Hassan", "company": "Unknown", "message": "Hi"},
    {"name": "Sofia Chen", "company": "Sales Corp", "message": "Interested in automating our entire recruitment process fast"}
]

print("=== AI LEAD SCORING REPORT ===\n")
results = []

for lead in leads:
    result = analyze_lead(lead["name"], lead["company"], lead["message"])
    results.append(result)
    print(f"Name: {result['name']}")
    print(f"Company: {result['company']}")
    print(f"Score: {result['score']}/10")
    print(f"Priority: {result['priority']}")
    print(f"Status: {result['status']}")
    print("---")

# Save to file
with open("ai_lead_report.json", "w") as file:
    json.dump(results, file, indent=2)

print(f"\nTotal leads: {len(results)}")
print("Report saved to ai_lead_report.json")
