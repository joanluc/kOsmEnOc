# kOsmEnOc
An evolution after a fork of Kosmtik : this project results in a fork of Kosmtik with a goal to make it compatible to new versions of NodeJS.

Very lite but extendable mapping framework to create Mapnik ready maps with OpenStreetMap data (and more).

For now, only Carto based projects are supported (with .mml or .yml config), but in the future we hope to plug in MapCSS too.

## Lite

Only the core needs:

- project loading
- local configuration management
- tiles server for live feedback when coding
- exports to common formats (Mapnik XML, PNG…)
- hooks everywhere to make easy to extend it with plugins


## Screenshot



## Install or Update

Note: Node.js versions are moving very fast, and kosmenoc or its dependencies are
hardly totally up to date with latest release. Ideally, you should run the LTS
version of Node.js. You can use a Node.js version manager (like
[NVM](https://github.com/creationix/nvm)) to help.

    npm -g install kosmenoc
    
    This might need root/Administrator rights. If you cannot install globally
you can also install locally with

    npm install kosmenoc

This will create a `node_modules/kosmenoc` folder. You then have to replace all occurences of `kosmenoc`
below with `node node_modules/kosmenoc/index.js`.

## Usage

To get command line help, run:

    kosmenoc -h

To run a Carto project (or `.yml`, `.yaml`):

    kosmenoc serve <path/to/your/project.mml>

Then open your browser at http://127.0.0.1:6789/.


You may also want to install plugins. To see the list of available ones, type:

    npm search kosmenoc


## Configuration file

By default kosmenoc places a configuration file into `$HOMEDIR/.config/kosmenoc.yml`
where $HOMEDIR is your home directory. You can change that by setting the
environment variable `KOSMENOC_CONFIGPATH` to the appropriate file.

In the configuration file kosmenoc stores information about installed plugins and
you can change certain settings that should be persistent between runs.

Configurable settings are:
* autoReload (true/false)
* backendPolling (true/false)
* cacheVectorTiles (true/false)
* dataInspectorLayers (object with layer names and true/false)
* exportFormats (array of strings)
* showCrosshairs (true/false)

## Local config

Because you often need to change the project config to match your
local env, for example to adapt the database connection credentials,
kosmenoc comes with an internal plugin to manage that. You have two
options: with a json file named `localconfig.json`, or with a js module
name `localconfig.js`.

Place your localconfig.js or localconfig.json file in the same directory as your
carto project (or `.yml`, `.yaml`).

In both cases, the behaviour is the same, you create some rules to target
the configuration and changes the values. Those rules are started by the
keyword `where`, and you define which changes to apply using `then`
keyword. You can also filter the targeted objects by using the `if` clause.
See the examples below to get it working right now.



### Example of a json file
```json
[
    {
        "where": "center",
        "then": [-122.25, 49.25, 10]
    },
    {
        "where": "Layer",
        "if": {
            "Datasource.type": "postgis"
        },
        "then": {
            "Datasource.dbname": "vancouver",
            "Datasource.password": "",
            "Datasource.user": "ybon",
            "Datasource.host": ""
        }
    },
    {
        "where": "Layer",
        "if": {
            "id": "hillshade"
        },
        "then": {
            "Datasource.file": "/home/ybon/Code/maps/hdm/DEM/data/hillshade.vrt"
        }
    }
]
```

### Example of a js module
```javascript
exports.LocalConfig = function (localizer, project) {
    localizer.where('center').then([29.9377, -3.4216, 9]);
    localizer.where('Layer').if({'Datasource.type': 'postgis'}).then({
        "Datasource.dbname": "burundi",
        "Datasource.password": "",
        "Datasource.user": "ybon",
        "Datasource.host": ""
    });
    // You can also do it in pure JS
    project.mml.bounds = [1, 2, 3, 4];
};

```

## Custom renderers

By default kosmenoc uses [Carto](https://github.com/mapbox/carto) to render the style. Via plugins
it is possible to use other renderers or Carto implementations. You can switch the renderer installing
the appropriate plugin and by passing the command line option `--renderer NAME`. `NAME` refers to the
renderer name (e.g. `carto` for the default renderer or `magnacarto` for the Magnacarto renderer).

## Known plugins
Run `npm search kosmenoc` to get an up to date list.
