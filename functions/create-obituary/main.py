# add your create-obituary function here
import requests
import json
import boto3


def create_obituary_handler(event, context):
    try:
        OPENAI_API_KEY = boto3.resource('ssm').get_parameter(
            Name='/thelastshow/openai_api_key', WithDecryption=True)['Parameter']['Value']
        CLOUDNAME = "duoghyw7n"
        CLOUDAPIKEY = "942673461688855"
        CLOUDINARYSECRET = boto3.resource('ssm').get_parameter(
            Name='/thelastshow/cloudinary_secret', WithDecryption=True)['Parameter']['Value']
        
        obituary_data = json.loads(event['body'])
        name = obituary_data['name']
        born_year = obituary_data['born']
        died_year = obituary_data['died']
        id = obituary_data['id']

        # TODO not sure if this is the right way to get the image file and set it up for cloudinary
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
        
        obituary_body = obituary_bio_response.json().get("choices")[0].get("message").get("content")

# _____________________________________________________________________________________________________
        # Code to call amazon polly API
        polly = boto3.resource('polly')
        polly_res = polly.synthesize_speech(
            Text=obituary_body,
            OutputFormat='mp3',
            VoiceId='Joanna'
        )
        # Set up audio file for cloudinary
        audio_file = polly_res.json().get("AudioStream")
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
            Item={
                'id': id,
                'name': name,
                'born': born_year,
                'died': died_year,
                'obituary': obituary_body,
                'image': cloudinary_img_id,
                'audio': cloudinary_audio_id
            }
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
