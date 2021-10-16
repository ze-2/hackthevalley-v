import requests

endpoint = "https://api.assemblyai.com/v2/transcript"

json = {
  "audio_url": "https://s3-us-west-2.amazonaws.com/blog.assemblyai.com/audio/8-7-2018-post/7510.mp3"
}

headers = {
    "authorization": "819cba8f78624b238fb40d8b594aa6d5",
    "content-type": "application/json"
}

response = requests.post(endpoint, json=json, headers=headers)

print(response.json())