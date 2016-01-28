#!/bin/bash

# !! DONOT run as ROOT !!

uwsgi --uid=1000 --gid=1000 /home/nws/workspace/codebase/news-weather-store/nwstore/uwsgi_server_conf/nwstore_server.ini 

#ini file should be in the same folder from where this script is being run
