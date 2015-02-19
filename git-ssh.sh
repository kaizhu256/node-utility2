#!/bin/sh
# save $GIT_SSH_KEY to $npm_package_file_tmp
printf $GIT_SSH_KEY | base64 --decode > $npm_package_file_tmp
# secure $npm_package_file_tmp
chmod 600 $npm_package_file_tmp
exec ssh -i $npm_package_file_tmp -o CheckHostIP=no -o StrictHostKeychecking=no -- "$@"
