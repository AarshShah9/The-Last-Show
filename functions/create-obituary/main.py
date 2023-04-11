# add your create-obituary function here
import requests
import json
import boto3
import base64


def create_obituary_handler(event, context):
    try:
        # TODO Populate this from aws parameter store
        OPENAI_API_KEY = ""
        CLOUDNAME = "duoghyw7n"
        CLOUDAPIKEY = "942673461688855"
        CLOUDINARYSECRET = ""

        obituary_data = json.loads(event['body'])
        name = obituary_data['name']
        born_year = obituary_data['born']
        died_year = obituary_data['died']
        id = obituary_data['id']

        # TODO WILL IF THE IMAGE UPLOAD ISNT WORKING THEN THIS IS LIKELY THE PROBLEM
        image_file_base64 = obituary_data['file']
        image_file = base64.decodebytes(bytes(image_file_base64, 'utf-8'))
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
        # TODO Code to call amazon polly API

        # TODO Set up audio file for cloudinary
        audio_file = None
# _____________________________________________________________________________________________________
        # Code to store image file on cloudinary

        cloudinary_img_response = requests.post(
            f"https://api.cloudinary.com/v1_1/{CLOUDNAME}/image/upload",
            data={
                "api_key": CLOUDAPIKEY,
                "api_secret": CLOUDINARYSECRET,
                "upload_preset": "obituary"

            },
            files={"file": image_file}
        )

        if cloudinary_img_response.status_code != 200:
            raise Exception(
                f"Image upload failed: {cloudinary_img_response.json()}")

        # TODO WILL HERE IS THE ID OF THE IMAGE
        cloudinary_img_id = cloudinary_img_response.json().get("public_id")

        # Code to store audio file on cloudinary

        cloudinary_audio_response = requests.post(
            f"https://api.cloudinary.com/v1_1/{CLOUDNAME}/video/upload",
            data={
                "api_key": CLOUDAPIKEY,
                "api_secret": CLOUDINARYSECRET,
                "resource_type": "video",
                "upload_preset": "obituary"
            },
            files={"file": audio_file}
        )

        if cloudinary_audio_response.status_code != 200:
            raise Exception(
                f"Audio upload failed: {cloudinary_audio_response.json()}")

        # TODO WILL HERE IS THE ID OF THE AUDIO
        cloudinary_audio_id = cloudinary_audio_response.json().get("public_id")

# _____________________________________________________ ________________________________________________
        # Code to save obituary to DynamoDB
        dynamodb_resource = boto3.resource('dynamodb')
        table = dynamodb_resource.Table("thelastshow-30158991")
        # should store obituary bio response here
        dynamodb_response = table.put_item(
            Item={}
        )

# _____________________________________________________________________________________________________
        # Code to setup response (mainly for testing purposes)
        response = {
            'dynamodb_response': dynamodb_response.json(),
            'openai_response': obituary_bio_response.json(),
            'cloudinary_img_response': cloudinary_img_response.json(),
            'cloudinary_audio_response': cloudinary_audio_response.json(),
        }

        return {
            'statusCode': 200,
            'body': {'response': f'Note saved successfully. Response: {response}', 'event': {event}
                     }
        }

    except Exception as e:
        return {'statusCode': 401, 'body': json.dumps(f'Error: {str(e)}'), 'event': event}
