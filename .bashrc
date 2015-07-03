shBaseInstall() {
    # this function will install the base
    # curl https://raw.githubusercontent.com/kaizhu256/node-utility2/alpha/.bashrc > $HOME/.bashrc && . $HOME/.bashrc && shBaseInstall
    local FILE || return $?
    for FILE in .bashrc .screenrc .vimrc index.sh
    do
        curl -s \
            https://raw.githubusercontent.com/kaizhu256/node-utility2/alpha/$FILE > \
            $HOME/$FILE || return $?
    done
    # source .bashrc
    . $HOME/.bashrc || return $?
    # init .ssh/authorized_keys.root
    if [ -f $HOME/.ssh/authorized_keys.root ]
    then
        mv $HOME/.ssh/authorized_keys.root $HOME/.ssh/authorized_keys || return $?
    fi
}

shDockerInstall() {
    # this function will install docker
    # http://docs.docker.com/installation/ubuntulinux
    wget -qO- https://get.docker.com/ | sh || return $?
    # test docker
    docker run hello-world || return $?
}

shDockerRestart() {
    # this function will restart the docker container
    shDockerRm $1 || :
    shDockerStart $@ || return $?
}

shDockerRm() {
    # this function will stop and rm the docker container $IMAGE:$NAME
    docker stop $@ || :
    docker rm $@ || return $?
}

shDockerSh() {
    # this function will run sh in the docker container $image:$name
    local NAME || return $?
    NAME=$1 || return $?
    docker start $NAME || return $?
    docker exec -it $NAME sh || return $?
}

shDockerStart() {
    # this function will start the docker container $image:$name
    local IMAGE || return $?
    local NAME || return $?
    NAME=$1 || return $?
    shift || return $?
    IMAGE=$1 || return $?
    shift || return $?
    docker run -e debian_chroot=$NAME --name $NAME -v /mnt/data:/mnt/data -dt $@ $IMAGE sh || \
        return $?
}

shDockerStopAll() {
    # this function will stop all docker containers
    docker stop $(docker ps -aq) || return $?
}

shEmscriptenInstall() {
    # this function will install emscripten
    # https://kripken.github.io/emscripten-site/docs/getting_started/downloads.html
    local CWD || return $?
    local EXIT_CODE || return $?
    CWD=$(pwd) || return $?
    # Update the package lists
    apt-get update
    # Install *gcc* (and related dependencies)
    apt-get install -y build-essential cmake default-jre git-core python2.7
    curl https://s3.amazonaws.com/mozilla-games/emscripten/releases/emsdk-portable.tar.gz > \
        /tmp/emsdk-portable.tar.gz || return $?
    cd /tmp && tar -xzf emsdk-portable.tar.gz && cd emsdk_portable || return $?
    # Fetch the latest registry of available tools.
    ./emsdk update
    # Download and install the latest SDK tools.
    ./emsdk install latest
    # Set up the compiler configuration to point to the "latest" SDK.
    ./emsdk activate latest
    # Linux/Mac OS X only: Set the current Emscripten path
    source ./emsdk_env.sh
    EXIT_CODE=$? || return $?
    cd $CWD || return $?
    return $EXIT_CODE || return $?
}

shIptablesInstall() {
    # this function will install iptables
    # reset iptables
    # http://www.cyberciti.biz/tips/linux-iptables-how-to-flush-all-rules.html
    iptables -F
    iptables -X
    iptables -t nat -F
    iptables -t nat -X
    iptables -t mangle -F
    iptables -t mangle -X
    iptables -P INPUT ACCEPT
    iptables -P FORWARD ACCEPT
    iptables -P OUTPUT ACCEPT
    # https://wiki.debian.org/iptables
    # Allows all loopback (lo0) traffic and drop all traffic to 127/8 that doesn't use lo0
    iptables -A INPUT -i lo -j ACCEPT
    iptables -A INPUT ! -i lo -d 127.0.0.0/8 -j REJECT
    # Accepts all established inbound connections
    iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
    # Allows all outbound traffic
    # You could modify this to only allow certain traffic
    iptables -A OUTPUT -j ACCEPT
    # Allows HTTP and HTTPS connections from anywhere (the normal ports for websites)
    iptables -A INPUT -p tcp --dport 80 -j ACCEPT
    iptables -A INPUT -p tcp --dport 443 -j ACCEPT
    # Allows SSH connections
    # The --dport number is the same as in /etc/ssh/sshd_config
    iptables -A INPUT -p tcp -m state --state NEW --dport 22 -j ACCEPT
    # Now you should read up on iptables rules and consider whether ssh access
    # for everyone is really desired. Most likely you will only allow access from certain IPs.
    # Allow ping
    #  note that blocking other types of icmp packets is considered a bad idea by some
    #  remove -m icmp --icmp-type 8 from this line to allow all kinds of icmp:
    #  https://security.stackexchange.com/questions/22711
    iptables -A INPUT -p icmp -m icmp --icmp-type 8 -j ACCEPT
    # log iptables denied calls (access via 'dmesg' command)
    iptables -A INPUT -m limit --limit 5/min -j LOG --log-prefix "iptables denied: " --log-level 7
    # Reject all other inbound - default deny unless explicitly allowed policy:
    iptables -A INPUT -j REJECT
    iptables -A FORWARD -j REJECT
    # https://blog.andyet.com/2014/09/11/docker-host-iptables-forwarding
    # Forward chain between docker0 and eth0
    iptables -A FORWARD -i docker0 -o eth0 -j ACCEPT
    iptables -A FORWARD -i eth0 -o docker0 -j ACCEPT
    # IPv6 chain if needed
    ip6tables -A FORWARD -i docker0 -o eth0 -j ACCEPT
    ip6tables -A FORWARD -i eth0 -o docker0 -j ACCEPT
    # iptables --list
    iptables -t nat -L -n -v
    iptables -L -n -v
    # save iptables
    if [ ! -f /etc/iptables/rules.v4 ]
    then
        apt-get install -y iptables-persistent
    fi
    iptables-save > /etc/iptables/rules.v4
    ip6tables-save > /etc/iptables/rules.v6
}

shMeanInstall() {
    # this function will install the mean stack
    shMongodbInstall || :
    shNodejsInstall || return $?
    shPhantomInstall || return $?
}

shMongodbInstall() {
    if (mongod --version > /dev/null 2>&1)
    then
        return
    fi
    # this function will install mongodb
    # http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/
    # 1. Import the public key used by the package management system.
    apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
    # 2. Create a list file for MongoDB.
    echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.0.list
    # 3. Reload local package database.
    apt-get update
    # 4. Install the MongoDB packages.
    apt-get install -y mongodb-org
    # 5. Start MongoDB.
    service mongod start
}

shMountData() {
    # this function will mount data
    local DIR || return $?
    for DIR in /mnt /mnt/var/lib/docker /mnt/data /mnt/local /mnt/old
    do
        umount $DIR || :
        mkdir -p $DIR || return $?
    done
    # /dev/xvdb /mnt/local auto noatime
    # /dev/xvdf /mnt/data auto noatime
    # /mnt/var/lib/docker /var/lib/docker none defaults,bind
    # mount -a || return $?
    mount /dev/xvdb /mnt/local -o noatime || :
    mount /dev/xvdf /mnt/data -o noatime || return $?
    mkdir -p /var/lib/docker || return $?
    mount /mnt/data/var/lib/docker /var/lib/docker -o bind || return $?
    for DIR in /home/ubuntu /root /var/lib/docker
    do
        cp -a $DIR $DIR.00 2>/dev/null || :
        rm -fr $DIR || return $?
        ln -s /mnt/data/$DIR $DIR || return $?
    done
}

shNodejsInstall() {
    # this function will install node.js
    # https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-an-ubuntu-14-04-server
    if (node --version > /dev/null 2>&1)
    then
        return
    fi
    apt-get install -y build-essential libssl-dev python || return $?
    curl https://raw.githubusercontent.com/creationix/nvm/v0.16.1/install.sh | sh || return $?
    source ~/.profile || :
    nvm install 0.12 || return $?
    nvm use 0.12 || return $?
    node --version > /dev/null 2>&1 || return $?
}

shPhantomInstall() {
    # this function will install phantomjs
    if ! (phantomjs --version > /dev/null 2>&1 && unzip > /dev/null 2>&1)
    then
        apt-get install -y phantomjs unzip || return $?
    fi
    shNodejsInstall || return $?
    local CWD || return $?
    local EXIT_CODE || return $?
    CWD=$(pwd) || return $?
    cd $HOME || return $?
    npm install phantomjs-lite || return $?
    EXIT_CODE=$? || return $?
    cd $CWD || return $?
    return $EXIT_CODE || return $?
}

shRedisInstall() {
    # this function will install redis
    # https://www.digitalocean.com/community/tutorials/how-to-install-and-use-redis
    if (node --version > /dev/null 2>&1)
    then
        return
    fi
}

shSource() {
    # this function will source .bashrc
    . $HOME/.bashrc || return $?
}

shUbuntuInit() {
    # this function will init ubuntu's default .bashrc
    # ~/.bashrc: executed by bash(1) for non-login shells.
    # see /usr/share/doc/bash/examples/startup-files (in the package bash-doc)
    # for examples

    # If not running interactively, don't do anything
    [ -z "$PS1" ] && return

    # don't put duplicate lines in the history. See bash(1) for more options
    # ... or force ignoredups and ignorespace
    HISTCONTROL=ignoredups:ignorespace

    # append to the history file, don't overwrite it
    shopt -s histappend

    # for setting history length see HISTSIZE and HISTFILESIZE in bash(1)
    HISTSIZE=1000
    HISTFILESIZE=2000

    # check the window size after each command and, if necessary,
    # update the values of LINES and COLUMNS.
    shopt -s checkwinsize

    # make less more friendly for non-text input files, see lesspipe(1)
    [ -x /usr/bin/lesspipe ] && eval "$(SHELL=/bin/sh lesspipe)"

    # set variable identifying the chroot you work in (used in the prompt below)
    if [ -z "$debian_chroot" ] && [ -r /etc/debian_chroot ]; then
        debian_chroot=$(cat /etc/debian_chroot)
    fi

    # set a fancy prompt (non-color, unless we know we "want" color)
    case "$TERM" in
        xterm-color) color_prompt=yes;;
    esac

    # uncomment for a colored prompt, if the terminal has the capability; turned
    # off by default to not distract the user: the focus in a terminal window
    # should be on the output of commands, not on the prompt
    #force_color_prompt=yes

    if [ -n "$force_color_prompt" ]; then
        if [ -x /usr/bin/tput ] && tput setaf 1 >&/dev/null; then
      # We have color support; assume it's compliant with Ecma-48
      # (ISO/IEC-6429). (Lack of such support is extremely rare, and such
      # a case would tend to support setf rather than setaf.)
      color_prompt=yes
        else
      color_prompt=
        fi
    fi

    if [ "$color_prompt" = yes ]; then
        PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '
    else
        PS1='${debian_chroot:+($debian_chroot)}\u@\h:\w\$ '
    fi
    unset color_prompt force_color_prompt

    # If this is an xterm set the title to user@host:dir
    case "$TERM" in
    xterm*|rxvt*)
        PS1="\[\e]0;${debian_chroot:+($debian_chroot)}\u@\h: \w\a\]$PS1"
        ;;
    *)
        ;;
    esac

    # enable color support of ls and also add handy aliases
    if [ -x /usr/bin/dircolors ]; then
        test -r ~/.dircolors && eval "$(dircolors -b ~/.dircolors)" || eval "$(dircolors -b)"
        alias ls='ls --color=auto'
        #alias dir='dir --color=auto'
        #alias vdir='vdir --color=auto'

        alias grep='grep --color=auto'
        alias fgrep='fgrep --color=auto'
        alias egrep='egrep --color=auto'
    fi

    # some more ls aliases
    alias ll='ls -alF'
    alias la='ls -A'
    alias l='ls -CF'

    # Alias definitions.
    # You may want to put all your additions into a separate file like
    # ~/.bash_aliases, instead of adding them here directly.
    # See /usr/share/doc/bash-doc/examples in the bash-doc package.

    if [ -f ~/.bash_aliases ]; then
        . ~/.bash_aliases
    fi

    # enable programmable completion features (you don't need to enable
    # this, if it's already enabled in /etc/bash.bashrc and /etc/profile
    # sources /etc/bash.bashrc).
    #if [ -f /etc/bash_completion ] && ! shopt -oq posix; then
    #    . /etc/bash_completion
    #fi
}

shBaseInit() {
    # this function will init the base env
    local FILE || return $?
    # init $PATH_BIN
    if [ ! "$PATH_BIN" ]
    then
        export PATH_BIN=\
$HOME/bin:$HOME/node_modules/.bin:/usr/local/bin:/usr/local/sbin:$PATH || return $?
        export PATH=$PATH_BIN || return $?
    fi
    for FILE in $HOME/index.sh $HOME/.bashrc2
    do
        # source $FILE
        if [ -f $FILE ]
        then
            . $FILE || return $?
        fi
    done
    # init ubuntu .bashrc
    shUbuntuInit || return $?
}
shBaseInit
