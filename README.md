# surveypanda

## installation

Clone the entire repository, and run

```
npm start
```

in the root directory.

You will also need DB_CON that links to a working mongo db instance, and a PRIVATE_KEY of your choice as environmental variables.

## testing and debugging

The npm script

```
npm test
```

will start the server with nodemon, where auto restart and logging are supported

```
npm run debug
```

supports attaching a node debugger to the process, you will need to configure your code editor first.

## summary

Survey panda is a REST API developed by Frank Li as an extension of a hackathon winning project.
