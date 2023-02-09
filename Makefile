#!make

include make.env
CONTAINER_ROOT=/home/node/src
DOCKER_RUN=docker run -it --rm -v $(PWD):$(CONTAINER_ROOT) -w $(CONTAINER_ROOT) -u node 
IMAGE=todoist
CMD=$(DOCKER_RUN) $(IMAGE)
AWSCLI=docker run -it --rm -v $(PWD):/src -w /src -v $(PWD)/aws:/root/.aws amazon/aws-cli

build:
	docker build --rm --no-cache . -t todoist

log:
	$(CMD) sh

compile:
	$(CMD) tsc

watch:
	$(CMD) tsc -w

tdd:
	$(DOCKER_RUN) --env GIT_WORK_TREE=$(GIT_WORK_TREE) --env GIT_DIR=$(GIT_DIR) $(IMAGE) npm run test

tests:
	$(DOCKER_RUN) --env GIT_WORK_TREE=$(GIT_WORK_TREE) --env GIT_DIR=$(GIT_DIR) $(IMAGE) npm run test-all

tags:
	ctags -R --exclude=node_modules --exclude=dist .

clean:
	rm -rf dist/*

create-cicd-stack:
	$(AWSCLI) cloudformation create-stack --stack-name TodoistCICD \
		--template-body file://infrastructure/cicd.yml \
		--capabilities CAPABILITY_NAMED_IAM

update-cicd-stack:
	$(AWSCLI) cloudformation update-stack --stack-name TodoistCICD \
		--template-body file://infrastructure/cicd.yml \
		--capabilities CAPABILITY_NAMED_IAM

log-to-ecr:
	$(AWSCLI) ecr get-login-password --region eu-west-1 \
		| docker login --username AWS --password-stdin $(AWS_ACCCOUNT_ID).dkr.ecr.eu-west-1.amazonaws.com

create-parameters-stack:
	$(AWSCLI) cloudformation create-stack --stack-name TodoistParametersStack \
		--template-body file://infrastructure/parameters-store.yml
		
update-parameters-stack:
	$(AWSCLI) cloudformation update-stack --stack-name TodoistParametersStack \
		--template-body file://infrastructure/parameters-store.yml
	

create-lambda-stack: infrastructure/packaged-lambda.yml
	$(AWSCLI) cloudformation create-stack --stack-name TodoistLambdaStack \
		--template-body file://infrastructure/packaged-lambda.yml \
		--capabilities CAPABILITY_NAMED_IAM

update-lambda-stack: infrastructure/packaged-lambda.yml
	$(AWSCLI) cloudformation update-stack --stack-name TodoistLambdaStack \
		--template-body file://infrastructure/packaged-lambda.yml \
		--capabilities CAPABILITY_NAMED_IAM

infrastructure/packaged-lambda.yml: infrastructure/lambda.yml dist/index.js
	$(AWSCLI) cloudformation package --template-file ./infrastructure/lambda.yml \
		--s3-bucket $(BucketLambdaSource) \
		--output-template-file ./infrastructure/packaged-lambda.yml

