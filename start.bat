@REM @echo off

taskkill /F /IM explorer.exe

timeout /T 5

cd C:\apache\htdocs\configuracao\app 
start /b fecharApp.exe

cd "C:\Program Files (x86)\Google\Chrome\Application"
start /b chrome --kiosk --incognito --disable-component-update --safebrowsing-disable-auto-update --disable-notifications --disabled-new-style-notification --ash-hide-notifications-for-factory --start-maximized --disable-backing-store-limit --enable-audio-focus --enable-media-suspend --process-per-tab --windows10-custom-titlebar --disable-pinch --overscroll-history-navigation=0 http://192.168.1.100:5000/

