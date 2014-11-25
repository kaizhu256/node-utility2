#!/bin/sh
# save $GIT_SSH_KEY to $TMPFILE
printf $GIT_SSH_KEY | base64 --decode > $TMPFILE
# secure $TMPFILE
chmod 600 $TMPFILE
exec ssh -i $TMPFILE -o CheckHostIP=no -o StrictHostKeychecking=no -- "$@"
