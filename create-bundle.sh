#!/usr/bin/env bash
echo "Creating RN Bundle File"
if  [[ $1 = "-android" ]]; then
    echo "Android Platform Selected"
    cd android
    echo "Cleaning Android project"
    ./gradlew clean
    rm -rf app/src/main/assets/index.android.bundle
    if  [[ $2 = "-release" ]]; then
	    echo "Removing Duplicate Resources"
	    rm -rf app/src/main/res/drawable*/node*
	    rm -rf app/src/main/res/drawable*/src_*
	    rm -rf app/src/main/res/raw/node*
	    rm -rf app/src/main/res/raw/src_*
	    rm -rf app/src/main/res/raw/app.json
		rm -rf app/src/main/res/raw/configurations.json
	    echo "Creating Release Bundle"
	    ./gradlew bundleRelease
    else
      cd ..
      npx react-native bundle --platform android --dev true --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
      cd android
      ./gradlew assembleDebug
      echo "Removing Duplicate Resources"
	    rm -rf app/src/main/res/drawable*/node*
	    rm -rf app/src/main/res/drawable*/src_*
	    rm -rf app/src/main/res/raw/node*
	    rm -rf app/src/main/res/raw/src_*
	    rm -rf app/src/main/res/raw/app.json
		rm -rf app/src/main/res/raw/configurations.json
	  fi
	echo "Bundle created. Create a fresh build from Android Studio"
else
    echo "Ios Platform Selected"
	npx react-native bundle --entry-file index.js --platform ios --dev true --bundle-output ios/main.jsbundle --assets-dest ios
	echo "Bundle created. Create a fresh build from X-Code"
fi
