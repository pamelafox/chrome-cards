#!/bin/bash 

declare -a files=( "background.html" "popup.html" "smiley.png" "frowney.png" "util.js");

basefolder="/Users/pamelafox/chrome-cards"
appfolder="$basefolder/landing/cards"

function copyfolder {
  for file in "${files[@]}"
    do
     cp "$basefolder/$file" "$basefolder/$1/$file"
    done
  cp -rf "$basefolder/$1" "$appfolder/$1"
  cp "$appfolder/$1/popup.html" "$appfolder/$1/index.html"
}

copyfolder "capitals"
copyfolder "uscapitals"
copyfolder "spanish"
copyfolder "german"
