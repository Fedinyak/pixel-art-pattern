install:
	npm ci

start:
	npm start

build:
	npm run build

lint:
	npx eslint . --ext .js,.jsx,.ts,.tsx

test:
	npm test