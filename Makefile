install: 
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

fix:
	npx eslint --fix .

link:
	npm link

test:
	npm test

# brain-games: 
# 	node bin/brain-games.js

# brain-even:
# 	node bin/brain-even.js