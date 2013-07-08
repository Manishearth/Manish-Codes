#!/bin/bash
echo "Hello. My name is Stephen Hawking. How may I help?"|espeak 2>/dev/null&
run=true
a="0"
exith(){
  echo "Have a good day."|espeak 2>/dev/null&
  echo ""
  exit
}
# trap keyboard interrupt (control-c)
trap exith SIGINT

while $run; do
read -p "hawking> " txt

 if  [[ $txt == "exit" ]]; then
  echo "Have a good day."|espeak 2>/dev/null&
  run=false
 else
 
 a=$(python -c "ans=$a;print $txt" 2>/dev/null)
  if [[ $? == 0 &&  $txt != $a ]]; then
   echo "$a"
   txt=${txt/"-"/" minus "}
   txt=${txt/"/"/" by "}
   txt=${txt/"*"/" times "}
   echo "$txt is $a"|espeak 2>/dev/null&
  else
   echo "$txt"|espeak 2>/dev/null&
  fi
 fi


done
