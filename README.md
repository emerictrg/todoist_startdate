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

