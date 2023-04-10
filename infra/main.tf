terraform {
  required_providers {
    aws = {
      version = ">= 4.0.0"
      source  = "hashicorp/aws"
    }
  }
}

provider "aws" {
  region = "ca-central-1"
}

# two lambda functions w/ function url
# one dynamodb table
# roles and policies as needed
# step functions (if you're going for the bonus marks)





# the locals block is used to declare constants that 
# you can use throughout your code
locals {
  create_obituary_function_name = "create-obituary-30150079"
  create_obituary_handler_name  = "main.create_obituary_handler"
  create_obituary_artifact      = "create-obituary/artifact.zip"

  get_obituaries_function_name = "get-obituaries-30150079"
  get_obituaries_handler_name  = "main.get_obituaries_handler"
  get_obituaries_artifact      = "get-obituaries/artifact.zip"
}


# Create an S3 bucket
resource "aws_s3_bucket" "lambda" {}


# create a role for the Lambda function to assume
# every service on AWS that wants to call other AWS services should first assume a role.
# then any policy attached to the role will give permissions
# to the service so it can interact with other AWS services
# see the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_role
resource "aws_iam_role" "lambda" {
  name               = "iam-for-lambda-functions"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_policy" "dynamodb" {
  name = "dynamodb-policy"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "SpecificTable",
      "Effect": "Allow",
      "Action": [
          "dynamodb:Query",
          "dynamodb:PutItem"
        ],
        "Resource": "arn:aws:dynamodb:*:*:table/thelastshow-30158991"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "dynamoaccess" {
  role       = aws_iam_role.lambda.name
  policy_arn = aws_iam_policy.dynamodb.arn
}


# create a Lambda function
# see the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function
resource "aws_lambda_function" "get-obituaries-30150079" {
  s3_bucket     = aws_s3_bucket.lambda.bucket
  s3_key        = local.get_obituaries_artifact
  role          = aws_iam_role.lambda.arn
  function_name = local.get_obituaries_function_name
  handler       = local.get_obituaries_handler_name

  runtime = "python3.9"
}


resource "aws_lambda_function" "create-obituary-30150079" {
  s3_bucket     = aws_s3_bucket.lambda.bucket
  s3_key        = local.create_obituary_artifact
  role          = aws_iam_role.lambda.arn
  function_name = local.create_obituary_function_name
  handler       = local.create_obituary_handler_name

  runtime = "python3.9"
}

# # read the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/dynamodb_table

resource "aws_dynamodb_table" "thelastshow-30158991" {
  name         = "thelastshow-30158991"
  billing_mode = "PROVISIONED"

  # up to 8KB read per second (eventually consistent)
  read_capacity = 1

  # up to 1KB per second
  write_capacity = 1


  hash_key = "id"


  # the hash_key data type is string 
  attribute {
    name = "id"
    type = "S"
  }

}


# create a Function URL for Lambda 
# see the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function_url
resource "aws_lambda_function_url" "get-obituaries-url" {
  function_name      = aws_lambda_function.get-obituaries-30150079.function_name
  authorization_type = "NONE"

  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["GET"]
    allow_headers     = ["*"]
    expose_headers    = ["keep-alive", "date"]
  }
}

output "get-obituaries-url" {
  value = aws_lambda_function_url.get-obituaries-url.function_url
}

resource "aws_lambda_function_url" "create-obituary-url" {
  function_name      = aws_lambda_function.create-obituary-30150079.function_name
  authorization_type = "NONE"

  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["POST"]
    allow_headers     = ["*"]
    expose_headers    = ["keep-alive", "date"]
  }
}

output "create-obituary-url" {
  value = aws_lambda_function_url.create-obituary-url.function_url
}
