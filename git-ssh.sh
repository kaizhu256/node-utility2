#!/bin/sh
# save $GIT_SSH_KEY to $npm_package_file_tmp_local
printf $GIT_SSH_KEY | base64 --decode > $npm_package_file_tmp_local
# secure $npm_package_file_tmp_local
chmod 600 $npm_package_file_tmp_local
exec ssh -i $npm_package_file_tmp_local -o CheckHostIP=no -o StrictHostKeychecking=no -- "$@"
