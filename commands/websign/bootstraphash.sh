#!/bin/bash

cd "$(cd "$(dirname "$0")"; pwd)/../../websign"

../commands/websign/pack.js index.html .index.html.tmp

node -e '
	const files	= JSON.parse(
		fs.readFileSync("js/config.js").toString().
			replace(/\s+/g, " ").
			replace(/.*files:\s+(\[.*?\]),.*/, "$1").
			replace(/'"'"'/g, "\"")
	);

	require("supersphincs").hash(
		files.
			map(file => {
				return file + ":\n\n" + fs.readFileSync(
					file === "/" ?
						".index.html.tmp" :
						file === "/unsupportedbrowser" ?
							"unsupportedbrowser.html" :
							"." + file
				).toString().trim();
			}).
			join("\n\n\n\n\n\n")
	).then(hash =>
		console.log(hash.hex)
	);
'

rm .index.html.tmp
