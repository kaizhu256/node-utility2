#!/bin/sh
# init $npm_config_dir_tmp
mkdir -p $npm_config_dir_tmp
# save $GIT_SSH_KEY to $npm_config_file_tmp
printf "%s" "$GIT_SSH_KEY" > "$npm_config_file_tmp"
# secure $npm_config_file_tmp
chmod 600 $npm_config_file_tmp
exec ssh -i $npm_config_file_tmp -o CheckHostIP=no -o StrictHostKeychecking=no -- "$@"
# cleanup $npm_config_file_tmp
rm "$npm_config_file_tmp"
