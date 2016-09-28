FROM google/cloud-sdk

MAINTAINER Ryan Lester <hacker@linux.com>

LABEL Name="cyph"

RUN apt-get -y --force-yes update
RUN apt-get -y --force-yes install curl lsb-release

RUN echo " \
	deb https://deb.nodesource.com/node_6.x $(lsb_release -c | awk '{print $2}') main \
" >> /etc/apt/sources.list
RUN curl -s https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add -

RUN apt-get -y --force-yes update
RUN apt-get -y --force-yes dist-upgrade

RUN apt-get -y --force-yes install \
	nano \
	nodejs \
	golang-go \
	python \
	perl \
	devscripts \
	build-essential \
	cmake \
	autoconf \
	automake \
	libtool \
	git \
	gnupg \
	gnupg-agent \
	procps \
	sudo \
	apt-utils \
	expect \
	inotify-tools \
	zopfli


RUN echo '\
	source ~/emsdk_portable/emsdk_env.sh > /dev/null 2>&1; \
	source ~/.rvm/scripts/rvm; \
\
	export NODE_PATH="/usr/lib/node_modules/"; \
\
	export GOPATH=$HOME/go; \
	export CLOUDSDK_PYTHON=python2; \
	export CLOUD_PATHS="/google-cloud-sdk/bin:/google-cloud-sdk/platform/google_appengine:/google-cloud-sdk/platform/google_appengine/google/appengine/tools"; \
\
	export PATH="/opt/local/bin:/opt/local/sbin:/usr/local/opt/go/libexec/bin:$CLOUD_PATHS:$GOPATH/bin:$PATH"; \
\
	export GPG_TTY=$(tty); \
	eval $(gpg-agent --daemon); \
' >> /.bashrc

RUN echo 'gibson ALL=(ALL) NOPASSWD: ALL' >> /etc/sudoers
RUN useradd -ms /bin/bash gibson
RUN mkdir -p /home/gibson
RUN cp /.bashrc /home/gibson/
RUN chmod 700 ~/.bashrc
USER gibson
ENV HOME /home/gibson


RUN wget "$( \
	curl -s https://cloud.google.com/appengine/docs/go/download | \
	grep -oP 'https://.*?go_appengine_sdk_linux_amd64.*?\.zip' | \
	head -n1 \
)" -O ~/go_appengine.zip
RUN unzip ~/go_appengine.zip -d ~
RUN rm ~/go_appengine.zip

RUN bash -c ' \
	cd; \
	wget https://s3.amazonaws.com/mozilla-games/emscripten/releases/emsdk-portable.tar.gz; \
	tar xzf emsdk-portable.tar.gz; \
	cd emsdk_portable; \
	./emsdk update; \
	./emsdk install latest; \
	./emsdk activate latest; \
	./emsdk uninstall $(./emsdk list | grep INSTALLED | grep node | awk "{print \$2}"); \
'

RUN bash -c ' \
	source ~/.bashrc; \
	ln -s $NODE_PATH $HOME/node_modules; \
	sudo ln -s $NODE_PATH /node_modules; \
	mkdir -p /home/gibson/emsdk_portable/node/4.1.1_64bit/bin; \
	ln -s /usr/bin/node /home/gibson/emsdk_portable/node/4.1.1_64bit/bin/node; \
'

RUN wget https://keybase.io/mpapis/key.asc -O ~/public.key
RUN gpg --import ~/public.key
RUN rm ~/public.key
RUN curl -sSL https://get.rvm.io | bash -s stable --ruby

RUN bash -c ' \
	source ~/.bashrc; \
	gem install sass; \
'

RUN rm -rf ~/.gnupg


RUN sudo npm -g install \
	html-minifier \
	clean-css \
	cheerio \
	uglify-js \
	typescript \
	babel-cli \
	babel-preset-es2015 \
	typings \
	typedoc \
	jspm \
	browserstack \
	zombie \
	browserify \
	supersphincs \
	libsodium-wrappers \
	glob \
	read \
	mkdirp \
	datauri \
	htmlencode \
	node-fetch \
	image-type \
	firebase \
	firebase-server


VOLUME /cyph
VOLUME /home/gibson/.cyph
VOLUME /home/gibson/.gitconfig
VOLUME /home/gibson/.gnupg
VOLUME /home/gibson/.ssh

WORKDIR /cyph/commands

EXPOSE 5000 5001 5002 31337 44000


CMD /bin/bash
