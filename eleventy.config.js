import yaml from "js-yaml";
import human from "human-time";
import { minify } from "terser";;
import CleanCSS from "clean-css";

export default function(eleventyConfig) {
	// add a join filter
	eleventyConfig.addFilter("join", function (arr) { return arr?.join(` `) });

    // Use YAML to process data files
    eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

	eleventyConfig.addFilter("humanRelativeTime", function (dateVal) {
		return human(new Date(dateVal));
	});

	eleventyConfig.addFilter("jsmin", async function (code) {
		const minified = await minify(code);
		return minified.code ?? code
	});

	eleventyConfig.addFilter("cssmin", function (code) {
		return new CleanCSS({}).minify(code).styles;
	});

    // Set dev server options
    eleventyConfig.setServerOptions({
		// Whether the live reload snippet is used
		liveReload: true,

		// Whether DOM diffing updates are applied where possible instead of page reloads
		domDiff: true,

		// The starting port number
		// Will increment up to (configurable) 10 times if a port is already in use.
		port: 8080,

		// Additional files to watch that will trigger server updates
		// Accepts an Array of file paths or globs (passed to `chokidar.watch`).
		// Works great with a separate bundler writing files to your output folder.
		// e.g. `watch: ["_site/**/*.css"]`
		watch: [],

		// Show local network IP addresses for device testing
		showAllHosts: true,

		// Use a local key/certificate to opt-in to local HTTP/2 with https
		https: {
			// key: "./localhost.key",
			// cert: "./localhost.cert",
		},

		// Change the default file encoding for reading/serving files
		encoding: "utf-8",

		// Show the dev server version number on the command line
		showVersion: true,

		// Added in Dev Server 2.0+
		// The default file name to show when a directory is requested.
		indexFileName: "index.html",

		// Added in Dev Server 2.0+
		// An object mapping a URLPattern pathname to a callback function
		// for on-request processing (read more below).
		onRequest: {},
	});
};