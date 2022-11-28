format:
		yarn format

data_base:
		json-server --watch ./src/assets/db.json --port 3001

eslint-react:
		yarn add eslint prettier eslint-plugin-react -D
		yarn add eslint-plugin-only-warn eslint-plugin-prettier eslint-config-prettier -D

eslint-typescript:
		yarn add prettier eslint-config-prettier eslint-plugin-prettier -D
		yarn add eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin -D
		yarn add eslint-plugin-react eslint-plugin-only-warn -D

stylelint-prettier:
		yarn add stylelint stylelint-prettier stylelint-order stylelint-scss -D
		yarn add stylelint-config-standard stylelint-config-rational-order stylelint-config-prettier -D
