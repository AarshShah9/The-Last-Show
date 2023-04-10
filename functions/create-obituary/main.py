# add your create-obituary function here
import requests
import json
import boto3


def create_obituary_handler(event, context):
    try:
        OPENAI_API_KEY = ""
        CLOUDNAME = "duoghyw7n"
        CLOUDAPIKEY = "942673461688855"
        CLOUDINARYSECRET = ""

        obituary_data = json.loads(event['body'])
        name = obituary_data['name']
        born_year = obituary_data['born']
        died_year = obituary_data['died']
        id = obituary_data['id']

        # not sure if this is the right way to get the image file and set it up for cloudinary
        image_file = obituary_data['file']
# _____________________________________________________________________________________________________
        # Code to call OpenAI API
        openai_headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {OPENAI_API_KEY}'
        }
        openai_payload = {
            'model': 'gpt-3.5-turbo',
            'messages': [{'role': 'user', 'content': f"write an obituary about a fictional character named {name} who was born on {born_year} and died on {died_year}."}],
            'temperature': 0.7
        }
        obituary_bio_response = requests.post(
            'https://api.openai.com/v1/chat/completions', headers=openai_headers, data=json.dumps(openai_payload))

# _____________________________________________________________________________________________________
        # Code to call amazon polly API

        polly_audio_response = None
# _____________________________________________________________________________________________________
        # Code to store image file on cloudinary

        cloudinary_img_response = requests.post(
            f"https://api.cloudinary.com/v1_1/{CLOUDNAME}/image/upload", {'file': image_file, 'api_key': CLOUDAPIKEY}, {'Content-Type': 'multipart/form-data'})

        # Code to store audio file on cloudinary

        cloudinary_audio_response = requests.post(
            f"https://api.cloudinary.com/v1_1/{CLOUDNAME}/video/upload",
            data={
                "api_key": CLOUDAPIKEY,
                "api_secret": CLOUDINARYSECRET,
                "resource_type": "video"
            },
            files={"file": polly_audio_response}
        )

# _____________________________________________________________________________________________________
        # Code to save obituary to DynamoDB
        dynamodb_resource = boto3.resource('dynamodb')
        table = dynamodb_resource.Table("thelastshow-30158991")
        # should store obituary bio response here
        dynamodb_response = table.put_item(
            Item={}
        )

# _____________________________________________________________________________________________________
        # Code to setup response
        response = {
            'dynamodb_response': dynamodb_response,
            'openai_response': obituary_bio_response,
            'cloudinary_img_response': cloudinary_img_response,
        }

        return {
            'statusCode': 200,
            'body': {'response': f'Note saved successfully. Response: {response}', 'event': {event}
                     }
        }

    except Exception as e:
        return {'statusCode': 401, 'body': json.dumps(f'Error: {str(e)}'), 'event': event}
