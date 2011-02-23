#!/bin/bash 

declare -a files=( "background.html" "popup.html" "smiley.png" "frowney.png" "util.js");

destination="/Users/pamelafox/chrome-cards/capitals/"
for file in "${files[@]}"
  do
   cp "/Users/pamelafox/chrome-cards/$file" "$destination/$file"
  done

destination="/Users/pamelafox/chrome-cards/spanish/"
for file in "${files[@]}"
  do
   cp "/Users/pamelafox/chrome-cards/$file" "$destination/$file"
  done

destination="/Users/pamelafox/chrome-cards/german/"
for file in "${files[@]}"
  do
   cp "/Users/pamelafox/chrome-cards/$file" "$destination/$file"
  done

destination="/Users/pamelafox/chrome-cards/uscapitals/"
for file in "${files[@]}"
  do
   cp "/Users/pamelafox/chrome-cards/$file" "$destination/$file"
  done
