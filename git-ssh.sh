#!/bin/sh
# save $GIT_SSH_KEY to $TMPFILE2
printf $GIT_SSH_KEY | base64 --decode > $TMPFILE2
# secure $TMPFILE2
chmod 600 $TMPFILE2
exec ssh -i $TMPFILE2 -o CheckHostIP=no -o StrictHostKeychecking=no -- "$@"
