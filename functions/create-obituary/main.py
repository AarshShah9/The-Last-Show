# add your create-obituary function here
import requests
import json
import boto3


def create_obituary_handler(event, context):
    API_KEY = ""

    try:
        obituary_data = json.loads(event['body'])
        name = obituary_data['name']
        born_year = obituary_data['born']
        died_year = obituary_data['died']

        # not sure if this is the right way to get the image file
        image_file = obituary_data['file']

        # Code to call OpenAI API
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {API_KEY}'
        }
        payload = {
            'model': 'gpt-3.5-turbo',
            'messages': [{'role': 'user', 'content': f"write an obituary about a fictional character named {name} who was born on {born_year} and died on {died_year}."}],
            'temperature': 0.7
        }
        obituary_bio_respobse = requests.post(
            'https://api.openai.com/v1/chat/completions', headers=headers, data=json.dumps(payload))

        # Code to save obituary to DynamoDB
        dynamodb_resource = boto3.resource('dynamodb')
        table = dynamodb_resource.Table("thelastshow-30158991")
        response = table.put_item(
            Item={}
        )

        return {
            'statusCode': 200,
            'body': {'response': f'Note saved successfully. Response: {response}'
                     }
        }
    except Exception as e:
        return {'statusCode': 401, 'body': json.dumps(f'Error saving note: {str(e)}')}
