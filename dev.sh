#!/bin/bash

# EDIT THIS
PROJECT_NAME="react-sandbox"

# EDIT THIS
DEV_DIR_PATH="${HOME}/development/suimenkathemove"

cd "$DEV_DIR_PATH/$PROJECT_NAME" || exit

if tmux has-session -t "$PROJECT_NAME"; then
  tmux attach-session -t "$PROJECT_NAME"
else
  # EDIT THIS
  tmux new-session -s "$PROJECT_NAME" -d -n storybook 'yarn storybook'
  # EDIT THIS
  tmux new-window

  tmux attach-session -t "$PROJECT_NAME"
fi
