#!/bin/sh
# init $npm_config_dir_tmp
mkdir -p $npm_config_dir_tmp
# save $GIT_SSH_KEY to $npm_config_file_tmp
printf $GIT_SSH_KEY | base64 --decode > $npm_config_file_tmp
# secure $npm_config_file_tmp
chmod 600 $npm_config_file_tmp
exec ssh -i $npm_config_file_tmp -o CheckHostIP=no -o StrictHostKeychecking=no -- "$@"
