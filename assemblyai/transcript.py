import requests

endpoint = "https://api.assemblyai.com/v2/transcript/YOUR-TRANSCRIPT-ID-HERE"

headers = {
    "authorization": "819cba8f78624b238fb40d8b594aa6d5",
}

response = requests.get(endpoint, headers=headers)

print(response.json())