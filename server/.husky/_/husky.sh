#!/bin/sh
if [ -z "$husky_skip_init" ]; then
  debug () {
    if [ "$HUSKY_DEBUG" = "1" ]; then
      echo "husky (debug) - $1"
    fi
  }

  readonly hook_name="$(basename -- "$0")"
  debug "running $hook_name"

  if [ -f ~/.huskyrc ]; then
    . ~/.huskyrc
  fi

  export readonly husky_skip_init=1
  sh -e "$0" "$@"
  exitCode=$?

  if [ $exitCode != 0 ]; then
    echo "husky - $hook_name hook exited with code $exitCode (failed)"
    if [ $exitCode = 127 ]; then
      echo "husky - command not found in PATH=$PATH"
    fi
  fi

  if [ $exitCode = 127 ]; then
    exit 1
  fi

  exit $exitCode
fi
