#!/usr/bin/env node

var Config = require('./src/Config.js').Config,
    Server = require('./src/back/PreviewServer.js').PreviewServer;

process.title = 'kosmenoc';

var config = new Config(__dirname, process.env.KOSMENOC_CONFIGPATH);
var server = new Server(config, __dirname);
config.parseOptions();
