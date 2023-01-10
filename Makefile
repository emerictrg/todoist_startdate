#!make

include make.env
CONTAINER_ROOT=/home/node/src
CMD=docker run -it --rm -v $(PWD):$(CONTAINER_ROOT) -w $(CONTAINER_ROOT) -u node todoist
AWSCLI=docker run -it --rm -v $(PWD):/src -w /src -v $(PWD)/aws:/root/.aws amazon/aws-cli

build:
	docker build --rm . -t todoist

log:
	$(CMD) sh

watch:
	$(CMD) tsc -w

create-lambda-stack: infrastructure/packaged-lambda.yml
	$(AWSCLI) cloudformation create-stack --stack-name TodoistLambdaStack \
		--template-body file://infrastructure/packaged-lambda.yml \
		--parameters file://infrastructure/parameters.json \
		--capabilities CAPABILITY_NAMED_IAM

update-lambda-stack: infrastructure/packaged-lambda.yml
	$(AWSCLI) cloudformation update-stack --stack-name TodoistLambdaStack \
		--template-body file://infrastructure/packaged-lambda.yml \
		--parameters file://infrastructure/parameters.json \
		--capabilities CAPABILITY_NAMED_IAM

infrastructure/packaged-lambda.yml: infrastructure/lambda.yml dist/index.js
	$(AWSCLI) cloudformation package --template-file ./infrastructure/lambda.yml \
		--s3-bucket $(BucketLambdaSource) \
		--output-template-file ./infrastructure/packaged-lambda.yml

