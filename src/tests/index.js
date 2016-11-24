require('dotenv').config({path:'./.env'});

require('./dotenv-tests')
require('./db-tests')

require('./help-tests')

require('./command-tests')

require('./mapper-tests')

require('./conversation-tests')