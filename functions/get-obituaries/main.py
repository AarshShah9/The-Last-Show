# add your get-obituaries function here
import boto3
import json

import requests


def get_obituaries_handler(event, context):
    try:
        CLOUDINARY_SECRET = boto3.resource('ssm').get_parameter(
            Name='/thelastshow/cloudinary_secret', WithDecryption=True)['Parameter']['Value']
        CLOUDINARY_API_KEY = "942673461688855"
        CLOUDINARY_NAME = "duoghyw7n"
        
        dynamodb = boto3.theresource("dynamodb")
        table = dynamodb.Table("thelastshow-30158991")

        response = table.scan()
        data = response['Items']

        while 'LastEvaluatedKey' in response:
            response = table.scan(
                ExclusiveStartKey=response['LastEvaluatedKey'])
            data.extend(response['Items'])

        # ___________________________________________________________________
        # TODO WILL CAN YOU POPULATE THESE LISTS WITH THE IDS FROM THE DYNAMODB
        img_ids = []
        audio_ids = []
        imgs = []
        audio_files = []

        # Cloudinary API Request to get all the images
        for id in img_ids:
            img_response = requests.get(
                f"https://res.cloudinary.com/{CLOUDNAME}/image/upload/{id}")
            imgs.append(img_response.content)

        # Cloudnary API Request to get all the audio files
        for id in audio_ids:
            audio_response = requests.get(
                f"https://res.cloudinary.com/{CLOUDNAME}/video/upload/{id}")
            audio_files.append(audio_response.content)

        # ___________________________________________________________________

        return {
            'statusCode': 201,
            'body': json.dumps(data),
        }

    except Exception as e:
        return {
            'statusCode': 401,
            'body': json.dumps(f'Error retrieving obituaries: {str(e)}'),
        }
