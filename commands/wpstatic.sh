#!/bin/bash

fullDestinationURL="${1}"
destinationProtocol="$(echo "${1}" | perl -pe 's/(.*?):\/\/.*/\1/')"
destinationURL="$(echo "${1}" | perl -pe 's/.*?:\/\/(.*)/\1/')"

echo -e '\n\nGenerating static blog\n'

ssh -i ~/.ssh/id_rsa_docker -f -N -L 43000:localhost:43000 wordpress.internal.cyph.com > /dev/null 2>&1

downloadURL="$(node -e "const script = () => {
	const browser	= new (require('zombie'));

	let timedOut	= false;
	const timeout	= () => {
		if (!timedOut) {
			timedOut	= true;
			script();
		}
	};
	setTimeout(timeout, 300000);

	new Promise(resolve => browser.visit(
		'http://localhost:43000/wp-admin/admin.php?page=simply-static_settings',
		resolve
	)).then(() => new Promise(resolve => browser.
		fill('log', 'admin').
		fill('pwd', 'hunter2').
		pressButton('Log In', resolve)
	)).then(() => new Promise(resolve => browser.
		select('destination_scheme', '${destinationProtocol}').
		fill('destination_host', '${destinationURL}').
		pressButton('Save Changes', resolve)
	)).then(() => new Promise(resolve => browser.visit(
		'http://localhost:43000/wp-admin/admin.php?page=simply-static',
		resolve
	))).then(() => new Promise(resolve => browser.
		pressButton('Generate Static Files', resolve)
	)).then(() => {
		const tryDownload	= () => setTimeout(() => {
			const a	= browser.document.querySelectorAll('a[href*=\".zip\"]')[0];

			if (a) {
				console.log(a.href);
				process.exit();
			}
			else if (timedOut) {
				return;
			}

			try {
				browser.pressButton('Resume', tryDownload);
			}
			catch (_) {
				tryDownload();
			}
		}, 5000);

		tryDownload();
	}).catch(timeout);
}; script();" | tail -n1)"

wget --tries=50 "${downloadURL}" -O wpstatic.zip
unzip wpstatic.zip

rm -rf wpstatic.zip wp-admin wp-json $(find . -name '*.php')

for f in $(find . -type f) ; do
	cat "${f}" |
		sed "s|${fullDestinationURL}|/blog|g" |
		sed "s|Permalink: /blog|Permalink: ${fullDestinationURL}|g" |
		sed 's|–|—|g' |
		sed 's|&ndash;|\&mdash;|g' |
		sed 's|&#8211;|\&mdash;|g' |
		sed 's|&#x2013;|\&mdash;|g' \
	> "${f}.new"

	mv "${f}.new" "${f}"
done

mkdir css fonts img js

for f in $(find . -name '*.html') ; do node -e "
	const cheerio		= require('cheerio');
	const htmlMinifier	= require('html-minifier');
	const imageType		= require('image-type');
	const superSphincs	= require('supersphincs');

	const fetch	= (url, opts) =>
		require('node-fetch')(url, opts).catch(() => fetch(url, opts))
	;

	const \$	= cheerio.load(fs.readFileSync('${f}').toString());

	Promise.all(
		\$(
			'script:not([src]), style'
		).toArray().map(elem => Promise.resolve().then(() => {
			elem	= \$(elem);

			const content	= elem.text().trim();
			const isScript	= elem.prop('tagName').toLowerCase() === 'script';

			elem.text('');

			return superSphincs.hash(content).then(hash => {
				let path;

				if (isScript) {
					path	= \`js/\${hash.hex}.js\`;
					elem.attr('src', \`/blog/\${path}\`);
				}
				else {
					path	= \`css/\${hash.hex}.css\`;
					elem.replaceWith(\`
						<link
							rel='stylesheet'
							href='/blog/\${path}'
						></link>
					\`);
				}

				fs.writeFileSync(path, content);
			});
		})).concat(\$(
			'img[src]:not([src^=\"/blog\"]), ' +
			'script[src]:not([src^=\"/blog\"]), ' +
			'link[rel=\"stylesheet\"][href]:not([href^=\"/blog\"])'
		).toArray().map(elem => Promise.resolve().then(() => {
			elem	= \$(elem);

			const tagName	= elem.prop('tagName').toLowerCase();
			const attr		= tagName === 'link' ? 'href' : 'src';
			const url		= elem.attr(attr).replace(/^\/\//, 'https://');

			return fetch(
				url,
				{headers: {'User-Agent': 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)'}}
			).then(res =>
				res.buffer()
			).then(content => Promise.all([
				content,
				superSphincs.hash(content)
			])).then(results => {
				const content		= results[0];
				const hash			= results[1].hex;

				const path		=
					tagName === 'script' ? \`js/\${hash}.js\` :
					tagName === 'link' ? \`css/\${hash}.css\` :
					\`img/\${hash}.\${(imageType(content) || {ext: 'jpg'}).ext}\`
				;

				elem.attr(attr, \`/blog/\${path}\`);
				fs.writeFileSync(path, content);
			});
		})))
	).then(() =>\$('body').append(\`
		<script src='/lib/js/base.js'></script>
		<script src='/js/cyph/analytics.js'></script>
	\`)).then(() => fs.writeFileSync('${f}', htmlMinifier.minify(
		\$.html().trim(),
		{
			collapseWhitespace: true,
			removeComments: true
		}
	)));
" ; done

grep -rl "'//' + disqus_shortname" |
	xargs sed -i "s|'//' + disqus_shortname|'/blog/js/' + disqus_shortname|g"

for id in cyph cyphtest ; do
	mkdir js/${id}.disqus.com
	for script in count embed ; do
		wget --tries=50 https://${id}.disqus.com/${script}.js -O js/${id}.disqus.com/${script}.js
	done
done

mkdir -p js/platform.twitter.com/js
wget --tries=50 https://platform.twitter.com/jot.html -O js/platform.twitter.com/jot.html
for f in $(grep -rl https://platform.twitter.com) ; do
	node -e "
		const s	= '$(grep -oP '\{[a-z0-9_,:"]+button".*?\}.*?\{.*?\}' ${f})'.
			replace(/(\\d+):/g, '\"\$1\":')
		;

		const a	= JSON.parse(s.split('}')[0] + '}');
		const b	= JSON.parse('{' + s.split('{').slice(-1)[0]);

		for (let k of Object.keys(a)) {
			console.log(\`\${a[k]}.\${b[k]}.js\`);
		}
	" |
		xargs -I% wget --tries=50 "https://platform.twitter.com/js/%" -O "js/platform.twitter.com/js/%"

	sed -i 's|https://platform.twitter.com|/blog/js/platform.twitter.com|g' $f
done

cd css
grep -r '\.woff' |
	grep -oP '(http)?(s)?(:)?//.*?\.woff' |
	sort |
	uniq |
	xargs -I% bash -c '
		path="fonts/$(node -e "require(\"supersphincs\").hash(\"%\").then(hash => console.log(hash.hex))").woff";
		wget --tries=50 "%" -O ../$path;
		grep -rl "%" | xargs sed -i "s|%|/blog/${path}|g";
	'
cd ..

for path in $(
	grep -roP '<meta property="og:image".*?>' |
		perl -pe 's/.*content="\/blog\/(.*?)".*/\1/g' |
		grep -v 'og:image' |
		sort |
		uniq
) ; do
	parent="$(echo "${path}" | perl -pe 's/\/[^\/]+$//')"
	mkdir -p "${parent}"
	wget --tries=50 "http://localhost:43000/${path}" -O "${path}"
done
