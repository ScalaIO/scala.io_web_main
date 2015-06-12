#!/usr/bin/env bash

USER=$1

apt-get update -y
apt-get install -y python-software-properties
add-apt-repository -y  ppa:git-core/ppa
apt-get update -y
apt-get install -y curl git

cd /home/$USER

su -l $USER -c 'echo "starting actions as $USER"'
if [ 0 -eq $? ] ; then
  su -l $USER -c 'gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3'
  su -l $USER -c '\curl -sSL https://get.rvm.io | bash -s stable'
  #su -l $USER -c 'echo -e "Host github.com\n\tStrictHostKeyChecking no\n" >> ~/.ssh/config'
  #su -l $USER -c 'git clone https://github.com/ScalaIO/scala.io_web_main.git scalaio'
  su -l $USER -c 'cd scalaio; git checkout scalaio-2015;cd ..'
  su -l $USER -c 'rvm install `cat scalaio/.rbenv-version`'
  su -l $USER -c '\curl -sSL -o- https://raw.githubusercontent.com/creationix/nvm/v0.25.4/install.sh | bash'
  su -l $USER -c 'echo "adding NVM_DIR to bash_profile";echo "export NVM_DIR=\"/home/vagrant/.nvm\"" >> .bash_profile'
  su -l $USER -c 'echo "sourcing NVM_DIR to bash_profile";echo "[ -s \"$NVM_DIR/nvm.sh\" ] && . \"$NVM_DIR/nvm.sh\"" >> .bash_profile # This loads nvm'
  su -l $USER -c 'bash -l -c nvm install 0.10'
  su -l $USER -c 'nvm install 0.10'
  su -l $USER -c 'nvm use 0.10'
  su -l $USER -c 'echo "nvm use 0.10" >> ~/.bash_profile'
  su -l $USER -c 'cd scalaio;npm install -g bower grunt-cli;cd ..;'
  su -l $USER -c 'cd scalaio;npm install;cd ..;'
  su -l $USER -c 'cd scalaio;bower --config.interactive=false install;cd ..;'
  su -l $USER -c 'cd scalaio;bundle install;cd ..;'
else
  echo "failed to act as logged $USER"
fi
