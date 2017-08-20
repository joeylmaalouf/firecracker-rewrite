"use strict";

var electron = require("electron");
var app = electron.app;

var fs = require("fs");
var path = require("path");
var url = require("url");

var app_cfg = require(path.join(__dirname, "config.json"));
var theme_path = path.join(__dirname, "themes", app_cfg.theme);
var widgets = {};

function load_widgets () {
  var theme_cfg = require(path.join(theme_path, "config.json"));
  for (var key in theme_cfg) {
    if (theme_cfg.hasOwnProperty(key)) {
      var widget = theme_cfg[key];
      if (widget.enabled) {
        widget.theme = app_cfg.theme;
        widget.name = key;
        create_window(widget);
      }
    }
  }
}

function create_window (widget) {
  widget.browserwindow = new electron.BrowserWindow({
    width: widget.width,
    height: widget.height
  });

  widget.browserwindow.loadURL(url.format({
    pathname: path.join(theme_path, widget.name + ".html"),
    protocol: "file:",
    slashes: true
  }));

  widget.browserwindow.on("closed", function () {
    widgets[widget.name].enabled = false;
  });

  widgets[widget.name] = widget;
}

app.on("ready", load_widgets);

app.on("activate", function () {
  if (Object.keys(widgets).length === 0) {
    load_widgets();
  }
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// look at https://github.com/joereynolds/fanbox/blob/master/app/main.js ?
