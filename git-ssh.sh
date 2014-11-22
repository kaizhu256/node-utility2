#!/bin/sh
exec ssh -i $GIT_SSH_KEY_FILE -o CheckHostIP=no -o StrictHostKeychecking=no -- "$@"
