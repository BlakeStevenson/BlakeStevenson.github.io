const { cyan, red, white, bold, reset } = require('kleur');
const fs = require('fs');
module.exports = [
  {
    type: 'input',
    name: 'projectName',
    message: cyan("Project Name:"),
    validate: function(value) {
      if (!value) {
        return bold().red('Please enter a valid project name.');
      }
      return true;
    }
  }, // project name [projectName]
  {
    type: 'list',
    name: 'pathType',
    message: "Create a new directory or use existing?",
    choices: ["Create New Directory", "Use Existing Directory"],
  }, // create or use existing dir [pathType]
  {
    type: 'input',
    name: 'projectPathCreate',
    message: cyan("Project Path:"),
    validate: function(value) {
      if (!fs.existsSync(value)) {
        try {
          fs.mkdirSync(value, {recursive: true});
        } catch(e) {
          return bold().red("An error occurred while creating the directory:\n" + reset(e) + bold("\nPlease check the path and try again."));
        }
        return true;
      }
    },
    when: function(answers) {
      return answers.pathType === "Create New Directory";
    }
  }, // create directory (if option selected) [projectPathCreate]
  {
    type: 'input',
    name: 'projectPathExisting',
    message: cyan("Project Path:"),
    validate: function(value) {
      if (fs.existsSync(value)) {
        return true;
      }
      return bold().red('Please enter the path to an existing directory.');
    },
    when: function(answers) {
      return answers.pathType === "Use Existing Directory";
    }
  }, // enter existing directory (if option selected) [projectPathExisting]
  {
    type: 'confirm',
    name: 'useTemplate',
    message: cyan("Use a template?"),
    default: "Yes"
  }, // use a template? [useTemplate]
  {
    type: 'list',
    name: 'projectTemplate',
    message: cyan("Project Template:"),
    choices: ["Next.js", "Gatsby", "Ember", "Angular", "React", "Vue.js"],
    when: function(answers) {
      return answers.useTemplate; 
    }
  }, // template selection (if option selected) [projectTemplate]
  {
    type: 'confirm',
    name: 'initGitRepo',
    message: cyan("Would you like to initialize a git repository?")
  }, // Git Initialization [initGitRepo]
  {
    type: 'input',
    name: 'gitRemote',
    message: cyan("Git URL (ex. https://github.com/BlakeStevenson/Gretzel.git):"),
    when: function(answers) {
      return answers.initGitRepo;
    }
  }, // Git Remote Selection [gitRemote]
  {
    type: 'input',
    name: 'gitCredentials',
    message: cyan("Credentials for remote git server (username:password):"),
    when: function(answers) {
      return answers.initGitRepo;
    }
  }, // Git Credentials [gitCredentials]
  {
    type: 'confirm',
    name: 'gitAutoPush',
    message: cyan("Automatically push to origin when changes are made?"),
    default: "Yes",
    when: function(answers) {
      return answers.initGitRepo;
    }
  }, // Git AutoPush [gitAutoPush]
  {
    type: 'confirm',
    name: 'createDatabase',
    message: cyan("Would you like to create a new database for your project?"),
    default: "Yes"
  }, // Database creation [createDatabase]
  {
    type: 'list',
    name: 'databaseType',
    message: cyan("Database Type:"),
    choices: ["MongoDB", "MySQL / MariaDB", "PostgreSQL", "Redis", "SQLite"],
    when: function(answers) {
      return answers.createDatabase;
    }
  }, // Database type [databaseType]
  {
    type: 'input',
    name: 'databaseString',
    message: cyan("Database Connection String (ex. mongodb://username:password@localhost:27017):"),
    validate: function(value) {
      if(value.includes(' ')) {
        return bold().red("Enter a valid connection string.");
      }
      return true;
    },
    when: function(answers) {
        return answers.databaseType === "MongoDB";
    }
  }, // Database connection string [mongoDatabaseString]
  {
    type: 'input',
    name: 'mysqlDatabaseCredentials',
    message: cyan("Enter your MySQL database information in the format [username] [password] [host:port] \n(ex. dbUser password123 127.0.0.1:3306):"),
    when: function(answers) {
      return answers.databaseType === "MySQL / MariaDB";
    }
  }, // Database connection info [mysqlDatabaseInfo]
  {
    type: 'input',
    name: 'databaseName',
    message: cyan("Database Name:"),
    validate: function(value) {
      if(value.includes(' ')) {
        return bold().red("Enter a valid database name.");
      }
      return true;
    }
  }, // Database name [databaseName]
];
