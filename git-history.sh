#!/bin/sh

git filter-branch --commit-filter '
OLD_EMAIL="956238702@qq.com"
CORRECT_NAME="tzhangchi"
CORRECT_EMAIL="terry.zhangchi@outlook.com"
if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi' HEAD
