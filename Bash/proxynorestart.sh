#! /bin/bash
# IITB Proxy setting script for Ubuntu
# Author: Manish Goregaokar (IIT Bombay, Engineering Physics)
# License: CC-BY-SA
# You are free to modify and/or redistribute as long as the original author is credited and you redistribute under CC-BY-SA
#
# Version: 1.1 (Beta, not been tested yet)
#



clear
echo -e "Welcome to the IITB Proxy setting manager for Ubuntu!\nThis script was brought to you by by Manish Goregaokar\n\n\nOK, let's start. First lets get a few things out of our way:"
echo -e "\nPlease authenticate sudo (use your Ubuntu login password). It should display 'Thank you!' if the authentication completes. If not, restart the script:"
sudo echo "Thank you!"
wd=`pwd`

read -p "Enter LDAP username:" username
stty -echo
echo "Password:"

read pass
stty echo


passe=${pass//\@/\%40}
passe=${passe//\//\%2F}

main_menu_disp(){
echo -e "\n\nPlease choose from the following options:\n\n\
1) Set up all proxy settings (Use this unless you want to do something specific)\n\
2) Turn Ubuntu Software center/APT proxy settings ON\n\
3) Turn Ubuntu Software center/APT proxy settings OFF\n\
4) Add Universe Repo\n\
5) Install Synaptic\n\
6) Turn Synaptic Proxy On (Requires Synaptic)\n\
7) Turn Synaptic proxy off (Requires Synaptic)\n\
8) Install Chrome\n\
9) Install Chromium\n\
10) Set up all browser proxies (global setting) ON\n\
11) Turn global browser proxy setting OFF\n\
12) Turn only Firefox proxy setting ON\n\
13) Turn only Firefox proxy setting OFF\n\
14) Install simplecpp\n\
15) Install geany\n\
16) Quit\n\nType your option and hit enter:"	
main_menu_read

}


main_menu_read(){
	read menuA
case "$menuA" in

1) wholeshebang;;
2) proxy_apt_on;;
3) proxy_apt_off;;
4) add_universe;;
5) install_synaptic;;
6) proxy_synaptic_on;;
7) proxy_synaptic_off;;
8) install_chrome;;
9) install_chromium;;
10) proxy_allbrowsers_on;;
11)proxy_allbrowsers_off;;
12)proxy_firefox_on;;
13) proxy_firefox_off;;
14) install_simplecpp;;
15) install_geany;;
16) exit;;
*) echo -e "Invalid option\nTry again:";main_menu_read;;

esac
echo -e "\n\nPress enter to continue"
read a
main_menu_disp
}

wholeshebang(){



echo -e "Setting APT Proxy"	
proxy_apt_on
echo -e "\n\n"


#No need to ask for synaptic, if people know what it is let them install using the menu options
#echo -e "\n\n"
#read -p "The next step is installing and/or configuring Synaptic Package Manager. This is purely optional, just that Synaptic is less error-prone than USC (which sometimes takes forever to install stuff on a proxy). Note that synaptic is less user-friendly than USC. Would you like to install it? (y/n) " a
#if [[ $a != "Y" && $a != "y" ]]; then
#        echo -e "OK, no problem\n "
#else
#
#install_synaptic
#proxy_synaptic_on
#fi
echo -e "\n\n"

browser_shebang

echo -e "\nAlrighty! Do you want to install simplecpp? (y/n)"
read simplecpp
if [[ $simplecpp != "Y" && $simplecpp != "y" ]]; then
echo -e "\nOK, less work for me!\n"
else
install_simplecpp
fi
}

proxy_apt_on(){
echo "Acquire::http::proxy \"http://$username:$passe@netmon.iitb.ac.in:80/\";\
Acquire::https::proxy \"http://$username:$passe@netmon.iitb.ac.in:80/\";\
Acquire::ftp::proxy \"http://$username:$passe@netmon.iitb.ac.in:80/\";">temp.txt
sudo cp temp.txt /etc/apt/apt.conf
sudo cp temp.txt /etc/apt/apt.conf.d/40proxy
sudo cp temp.txt /etc/apt/apt.conf.d/02proxy



rm temp.txt
export http_proxy="http://"username":"passe"@netmon.iitb.ac.in:80" 
clear
echo -e "\nAlright, I have finished setting up the proxy for Ubuntu Software Center. You can now install stuff if you wish\n\n"

}
proxy_apt_off(){
touch temp.txt
echo "">temp.txt
sudo cp temp.txt /etc/apt/apt.conf
sudo cp temp.txt /etc/apt/apt.conf.d/40proxy
sudo cp temp.txt /etc/apt/apt.conf.d/02proxy	


rm temp.txt
}

add_universe(){
echo "Adding Universe..."

sudo apt-add-repository 'deb http://archive.ubuntu.com/ubuntu precise universe'
sudo apt-add-repository 'deb http://lk.archive.ubuntu.com/ubuntu/ precise universe'

echo -e "Updating Sources...\n\n\n"
sudo apt-get update
clear    
echo -e "Done!\n\n"
}    
proxy_synaptic_on(){
			echo -e "\n\nI will have to open Synaptic first. Hit OK if it prompts you for anything, then close it."
			read -p "Press enter if you have read the above"
			sudo synaptic
			clear
	       echo -e "\n\nConfiguring..."
      #  echo -e  "Alright, now to set it up. I shall open the package manager for you, and tell you how to set up Synaptic's proxy.Once it is open, go to Settings>Preferences>Network. Select 'manual proxy configuration'. Enter 'netmon.iitb.ac.in'(without quotes) for both HTTP and FTP, and set the ports as 80. Type 'localhost,*.iitb.ac.in' (without quotes) in the 'no proxy for' section. Then click 'authentication' and enter your LDAP login/password. Click OK, then OK again, and close synaptic. Further instructions will appear when you do so.\n\n" 
       # read -p "Please press Enter to open synaptic:"
# sudo synaptic
touch ./synaptic.conf
cat  >> ./synaptic.conf<<EOF
Synaptic "" {
  ViewMode "0";
  showWelcomeDialog "0";
  httpProxyUser "USERNAME";
  httpProxyPass "PASSWORD";
  ShowAllPkgInfoInMain "false";
  AskRelated "true";
  OneClickOnStatusActions "false";
  delAction "3";
  upgradeType "1";
  update "" {
    type "0";
  };

  undoStackSize "20";
  UseTerminal "false";
  AskQuitOnProceed "false";
  useUserFont "0";
  useUserTerminalFont "0";
  statusColumnPos "0";
  statusColumnVisible "1";
  supportedColumnPos "1";
  supportedColumnVisible "1";
  nameColumnPos "2";
  nameColumnVisible "1";
  sectionColumnPos "3";
  sectionColumnVisible "0";
  componentColumnPos "4";
  componentColumnVisible "0";
  instVerColumnPos "5";
  instVerColumnVisible "1";
  availVerColumnPos "6";
  availVerColumnVisible "1";
  instSizeColumnPos "7";
  instSizeColumnVisible "1";
  downloadSizeColumnPos "8";
  downloadSizeColumnVisible "0";
  descrColumnPos "9";
  descrColumnVisible "1";
  color-install "#8A8AE2E23434";
  color-reinstall "#4E4E9A9A0606";
  color-upgrade "#FCFCE9E94F4F";
  color-downgrade "#ADAD7F7FA8A8";
  color-remove "#EFEF29292929";
  color-purge "#A4A400000000";
  color-available "";
  color-available-locked "#A4A400000000";
  color-installed-updated "";
  color-installed-outdated "";
  color-installed-locked "#A4A400000000";
  color-broken "";
  color-new "";
  UseStatusColors "true";
  CleanCache "false";
  AutoCleanCache "true";
  delHistory "-1";
  useProxy "1";
  httpProxy "netmon.iitb.ac.in";
  httpProxyPort "80";
  ftpProxy "netmon.iitb.ac.in";
  ftpProxyPort "80";
  noProxy "*.iitb.ac.in,localhost";
  Install-Recommends "1";
  vpanedPos "140";
  hpanedPos "200";
  windowWidth "700";
  windowHeight "480";
  windowX "175";
  windowY "214";
  ToolbarState "2";
  Maximized "0";
  closeZvt "false";
};

EOF
sed -i "s/USERNAME/$username/" ./synaptic.conf
sed -i "s/PASSWORD/$pass/" ./synaptic.conf
sudo cp ./synaptic.conf /root/.synaptic/synaptic.conf
rm synaptic.conf
echo -e "\n\nDone!\n"
}

proxy_synaptic_off(){
	sudo sed -i s/"useProxy \"1\"\;"/"useProxy \"0\"\;"/ /root/.synaptic/synaptic.conf
	
}
install_synaptic(){

        echo -e "\n\nPlease wait while I install Synaptic.\n\n"
        
        install_aptget synaptic
		clear
		echo -e
}

proxy_firefox_on(){
	        echo -e "Working...."
        #read -p "OK, we shall only configure firefox. I shall open firefox after you press enter. Once you open it, go to Edit>Preferences>Advanced>Network. Click the 'Settings' button under 'Connection', select 'Manual proxy settings'. Enter 'netmon.iitb.ac.in' as the HTTP proxy, with port 80. Ensure that the 'use this proxy for all protocols' is ticked. Then, enter '*.iitb.ac.in,10.*.*.*,localhost' (without quotes) in the 'no proxy for' area. Click OK, close, and close firefox. Press enter to open firefox."
		#firefox
			sudo cat>> ~/.mozilla/firefox/*.default/prefs.js<<EOF
user_pref("network.proxy.ftp", "netmon.iitb.ac.in");
user_pref("network.proxy.http", "netmon.iitb.ac.in");
user_pref("network.proxy.no_proxies_on", "*.iitb.ac.in,localhost, 127.0.0.1, 10.*.*.*");
user_pref("network.proxy.share_proxy_settings", true);
user_pref("network.proxy.socks", "netmon.iitb.ac.in");
user_pref("network.proxy.ssl", "netmon.iitb.ac.in");
user_pref("networkproxy.type", 1);
EOF
echo -e "\n\nDone!"
	
}
proxy_firefox_off(){
	        echo -e "Working...."
        #read -p "OK, we shall only configure firefox. I shall open firefox after you press enter. Once you open it, go to Edit>Preferences>Advanced>Network. Click the 'Settings' button under 'Connection', select 'Manual proxy settings'. Enter 'netmon.iitb.ac.in' as the HTTP proxy, with port 80. Ensure that the 'use this proxy for all protocols' is ticked. Then, enter '*.iitb.ac.in,10.*.*.*,localhost' (without quotes) in the 'no proxy for' area. Click OK, close, and close firefox. Press enter to open firefox."
		#firefox
			sudo cat>> ~/.mozilla/firefox/*.default/prefs.js<<EOF
user_pref("network.proxy.ftp", "netmon.iitb.ac.in");
user_pref("network.proxy.http", "netmon.iitb.ac.in");
user_pref("network.proxy.no_proxies_on", "*.iitb.ac.in,localhost, 127.0.0.1, 10.*.*.*");
user_pref("network.proxy.share_proxy_settings", true);
user_pref("network.proxy.socks", "netmon.iitb.ac.in");
user_pref("network.proxy.ssl", "netmon.iitb.ac.in");
user_pref("networkproxy.type", 0);
EOF
echo -e "\n\nDone!"
	
}

proxy_allbrowsers_on(){

	 echo -e "\n\nPlease wait while I set up the proxy..."
	 cd ~/.gconf
	 gsettings set org.gnome.system.proxy ignore-hosts "['*.iitb.ac.in', 'localhost', '127.0.0.0/8', '10.*.*.*']"

	 gsettings set org.gnome.system.proxy mode "manual"

	 gsettings set org.gnome.system.proxy.http host  "netmon.iitb.ac.in"

	 gsettings set org.gnome.system.proxy.http port "80" 

	 gsettings set org.gnome.system.proxy.https host "'netmon.iitb.ac.in'"

	 gsettings set org.gnome.system.proxy.https port "80" 

	 gsettings set org.gnome.system.proxy.ftp host "'netmon.iitb.ac.in'"

	 gsettings set org.gnome.system.proxy.ftp port "80" 

	 gsettings set org.gnome.system.proxy.http authentication-password $pass

	 gsettings set org.gnome.system.proxy.http authentication-user $username

	 gsettings set org.gnome.system.proxy.http use-authentication true
	cd $wd

	#echo -e "\n\nDone!\n\n Now, we want to ensure if Firefox is using the proxy correctly. I shall open firefox, please go to Edit>Preferences>Andvanced>Network, click 'Settings' under 'Connection', and ensure that 'Use system proxy settings' is selected. Click OK, close, and close firefox.\n\nPlease press enter to open firefox:"
	#read 
	#firefox
	echo -e "\n\nDone! Now let me ensure that firefox is using these settings...\n\n"
	sudo cat>> ~/.mozilla/firefox/*.default/prefs.js<<EOF
user_pref("network.proxy.ftp", "netmon.iitb.ac.in");
user_pref("network.proxy.http", "netmon.iitb.ac.in");
user_pref("network.proxy.no_proxies_on", "*.iitb.ac.in, localhost, 127.0.0.1, 10.*.*.*");
user_pref("network.proxy.share_proxy_settings", true);
user_pref("network.proxy.socks", "netmon.iitb.ac.in");
user_pref("network.proxy.ssl", "netmon.iitb.ac.in");
user_pref("networkproxy.type", 2);
EOF
#Technically, we only need the last line of the configuration (Which tells it to use system settings), but it's always good to keep manual proxy settings dormant.

	echo -e "\n Done!"
}



proxy_allbrowsers_off(){

	 echo -e "\n\nPlease wait while I remove the proxy setting..."
	 cd ~/.gconf

	 gsettings set org.gnome.system.proxy ignore-hosts "['localhost']"


	echo -e "\n\nDone! Now let me ensure that firefox is using these settings...\n\n"
	sudo cat>> ~/.mozilla/firefox/*.default/prefs.js<<EOF
user_pref("networkproxy.type", 2);
EOF
	echo -e "\n Done!"
}



browser_shebang(){
echo -e "\n\nNext step: Browsers. We have a multitude of choices here. We either install Chrome (or chromium) and set up its proxy ignore (which carries over to Firefox and is systemwide), or we just set up Firefox's ignore list. I recommend you do the former.\n"
read -p "Would you like to set up a systemwide setting for chrome/firefox/chromium (recommended)? (y/n)" a 

if [[ $a != "Y" && $a != "y" ]]; then
	echo -e "\n\n OK, we shall only configure firefox. "
	proxy_firefox_system
else

proxy_allbrowsers_on
echo -e "\n Now, do you want to install Chrome or Chromium? Chrome is the same Chrome that you use on Windows. Chromium is similar (to get technical, Chrome is a \"flavor\" of Chromium). Ypu won't notice many differences between the two, except that Chromium has a pretty blue icon and is faster to load on linux. I personally suggest you install Chromium.\n\n\
	So, what do you want to install? (chrome/chromium/both/none)"
	read chrome
	if [[ $chrome == "chrome" || $chrome == "both" ]]; then
		install_chrome;
	fi
	if [[ $chrome == "chromium" || $chrome == "both" ]]; then
		install_chromium;
	fi
fi
}

install_chrome(){
		echo -e "Please wait while I install Chrome.\n\n"
		install_aptget google-chrome-stable
		clear
		echo -e "\n\n Done!\n"
}


install_geany(){
		echo -e "Please wait while I install geany.\n\n"
		install_aptget geany
		clear
		echo -e "\n\n Done!\n"
}
install_chromium(){
		echo -e "Please wait while I install Chromium.\n\n"
		install_aptget chromium-browser
		clear
		echo -e "\n\n Done!\n"
	
}
install_simplecpp(){

echo -e "\nOK. Please download simplecpp from moodle (Login to moodle and go here: http://moodle.iitb.ac.in/mod/resource/view.php?id=998), and ensure it is in your Downloads folder. Press enter when you are done.";
read
echo -e "\nPlease wait while I install libx11-dev and g++.\n\n"
install_aptget libx11-dev
install_aptget g++
clear
echo -e "\n\n Installing simplecpp...\n\n"
cp ./Downloads/simplecpp.tar ~/simplecpp.tar
cd ~
tar -xvf ~/simplecpp.tar
cd simplecpp
sh configure.sh
echo "alias s++='~/simplecpp/s++'">~/.bash_aliases
clear
cd $wd
echo -e "\n\nDone!! \n Enjoy simplecpp! (You may have to open a new terminal to get it to work for the first time)"

}

install_aptget(){
		sudo env http_proxy="http://$username:$passe@netmon.iitb.ac.in:80" apt-get install $1 
}
	if [[ $1 == "bypass" ]]; then
			wholeshebang
	fi
main_menu_disp

