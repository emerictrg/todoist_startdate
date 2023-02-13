#!make

include make.env
CONTAINER_ROOT=/home/node/src
DOCKER_RUN=docker run -it --rm -v $(PWD):$(CONTAINER_ROOT) -w $(CONTAINER_ROOT) -u node 
IMAGE=todoist
CMD=$(DOCKER_RUN) $(IMAGE)
AWSCLI_DOCKER=docker run -it --rm -v $(PWD):/src -w /src -v $(PWD)/aws:/root/.aws
AWSCLI_IMG=amazon/aws-cli
AWSCLI=$(AWSCLI_DOCKER) $(AWSCLI_IMG)

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

cfn-lint:
	docker run -it --rm -v $(PWD):/data -w /data cfn-python-lint:latest cloud/*.yml

clean:
	rm -rf dist/*

create-cicd-stack:
	$(AWSCLI) cloudformation create-stack --stack-name TodoistCICD \
		--template-body file://cloud/cicd.yml \
		--capabilities CAPABILITY_NAMED_IAM

update-cicd-stack:
	$(AWSCLI) cloudformation update-stack --stack-name TodoistCICD \
		--template-body file://cloud/cicd.yml \
		--capabilities CAPABILITY_NAMED_IAM

log-to-ecr:
	$(AWSCLI) ecr get-login-password --region eu-west-1 \
		| docker login --username AWS --password-stdin $(AWS_ACCCOUNT_ID).dkr.ecr.eu-west-1.amazonaws.com

create-parameters-stack:
	$(AWSCLI) cloudformation create-stack --stack-name TodoistParametersStack \
		--template-body file://cloud/parameters-store.yml
		
update-parameters-stack:
	$(AWSCLI) cloudformation update-stack --stack-name TodoistParametersStack \
		--template-body file://cloud/parameters-store.yml
	
deploy-cert:
	$(AWSCLI) cloudformation deploy \
		--region=us-east-1 \
		--stack-name todoist-cert \
		--parameter-overrides DomainName=$(CERT_DOMAIN_NAME) HostedZone=$(CERT_HOSTED_ZONE) \
		--template-file ./cloud/virginia-certificate.yml
