# add your get-obituaries function here
import boto3
import json

def get_obituaries_handler(event, context):
    try:        
        dynamodb = boto3.resource("dynamodb")
        table = dynamodb.Table("thelastshow-30158991")

        response = table.scan()
        data = response['Items']

        while 'LastEvaluatedKey' in response:
            response = table.scan(
                ExclusiveStartKey=response['LastEvaluatedKey'])
            data.extend(response['Items'])

        return {
            'statusCode': 201,
            'body': data
        }

    except Exception as e:
        return {
            'statusCode': 401,
            'body': json.dumps(f'Error retrieving obituaries: {str(e)}'),
        }
