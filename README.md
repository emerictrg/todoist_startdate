# todoist_startdate

Note: 
To make it work webhook in todoist must be activated : https://developer.todoist.com/sync/v8/#webhooks

Directory structure
- aws : aws credentials file settings - https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html
- cloudformation template is  using parameters with the following parameters:
    - TodoistCode
    - BucketLambdaSource
- Makefile is using a variable file make.env  with the following variables:
    - BucketLambdaSource : Which is the same value as BucketLambdaSource from  the cloudformation template


 https://todoist.com/oauth/authorize?client_id=5c5909e7d30e4ac68c94739ae2c0d1a3&scope=task:add,data:read&state=iamlevitating
 https://todoist-aouth.trang.ninja/?code=0d38375e7ed7133e07b5c6d9b1dc7aa05db2aae8&state=iamlevitating
- {"access_token":"2529ecc0c09e09fc2fb4c778b61906ae6cf9035a","token_type":"Bearer"}%
i

