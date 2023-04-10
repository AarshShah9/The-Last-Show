# add your get-obituaries function here
import boto3
import json


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

        return {
            'statusCode': 201,
            'body': json.dumps(data),
        }

    except Exception as e:
        return {
            'statusCode': 401,
            'body': json.dumps(f'Error retrieving obituaries: {str(e)}'),
        }
