/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package kr.co.irontrain.et7sample;

import android.content.Context;
import android.content.res.Configuration;
import android.os.Bundle;
import android.telephony.TelephonyManager;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.view.View.OnLongClickListener;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.widget.Toast;
import net.droidlabs.audio.ogg.OggStreamPlayer;
import net.droidlabs.audio.ogg.OggStreamPlayerCallback;

import org.apache.cordova.*;

public class ET7SAMPLE extends CordovaActivity
{
//static CordovaWebView appview;
static WebView appview;
static String cid;
static String nowno;
static String selbookid;
static String selday;
static String userclass;
static String userid;
static String username;
static String leveltestid;
//String phoneNumber;
private OggStreamPlayer player;
TTSManager ttsManager = null;
VoiceRecognition voiceRecog = null;

public static WebView getAppview()
{
return appview;
}

public static String getCid()
{
return cid;
}

public static String getNowno()
{
return nowno;
}

public static String getSelbookid()
{
return selbookid;
}

public static String getSelday()
{
return selday;
}

public static String getUserclass()
{
return userclass;
}

public static String getUserid()
{
return userid;
}

public static String getUsername()
{
return username;
}

public static void setCid(String paramString)
{
cid = paramString;
}

public static void setNowno(String paramString)
{
nowno = paramString;
}

public static void setSelbookid(String paramString)
{
selbookid = paramString;
}

public static void setSelday(String paramString)
{
selday = paramString;
}

public static void setUserclass(String paramString)
{
userclass = paramString;
}

public static void setUserid(String paramString)
{
userid = paramString;
}

public static void setUsername(String paramString)
{
username = paramString;
}

public static String getLeveltestid() {
	return leveltestid;
}

public static void setLeveltestid(String leveltestid) {
	ET7SAMPLE.leveltestid = leveltestid;
}

@Override
public void onCreate(Bundle savedInstanceState)
{
	ttsManager = new TTSManager();
 ttsManager.init(this);
 
 voiceRecog = new VoiceRecognition();
 voiceRecog.init(this);
	
// TelephonyManager telephony = (TelephonyManager)getSystemService(Context.TELEPHONY_SERVICE);
// phoneNumber = telephony.getLine1Number();

 super.onCreate(savedInstanceState);
 super.init();
 
 appview = (WebView)appView.getEngine().getView();
 
 // Set by <content src="index.html" /> in config.xml
 loadUrl(launchUrl);
 
 appview.addJavascriptInterface(new Login(), "Login");
 appview.addJavascriptInterface(new LevelTest(), "LevelTest");
 appview.addJavascriptInterface(new StudyMsg(), "StudyMsg");
 appview.addJavascriptInterface(new UserToast(), "Toast");
 
 //키보드 나오기
 KeyBoard keyboard = new KeyBoard(this, appview);
 appview.addJavascriptInterface(keyboard, "KeyBoard");
 
 appview.addJavascriptInterface(new KeyBoardInfo(), "KeyBoardInfo");

 //전화번호 가져오기
// super.appView.addJavascriptInterface(new MyPhoneNumber(), "MyPhoneNumber");

	//ogg 플레이 
 OggStreamPlayerCallback callbackEvent = new OggStreamPlayerCallback() {
		
		@Override
		public void playerStopped() {
			// TODO Auto-generated method stub
			//Log.e("stop","nn");
			
			appview.post(new Runnable() {
	            public void run() {
	            	appview.loadUrl("javascript:mp3Done();");
	            }
	        });
		}
		
		@Override
		public void playerStarted() {
			// TODO Auto-generated method stub
			appview.post(new Runnable() {
         public void run() {
           appview.loadUrl("javascript:mp3Start();");
         }
     });
		}
		
		@Override
		public void playerException(Throwable t) {
			// TODO Auto-generated method stub
			
		}
	};
	player = new OggStreamPlayer(callbackEvent);
	 
	appview.addJavascriptInterface(new oggPlayer(), "oggPlayer");
 
	appview.setOnLongClickListener(new OnLongClickListener() {
		
		@Override
		public boolean onLongClick(View v) {
			// TODO Auto-generated method stub
			return true;
		}
	});
	appview.setLongClickable(false);
 
	appview.addJavascriptInterface(new ttsengine(), "ttsengine");
 
	appview.addJavascriptInterface(new voiceengine(), "voiceengine");
}

public boolean onEvaluateInputViewShown() {
 Configuration config = getResources().getConfiguration();
 return config.keyboard == Configuration.KEYBOARD_NOKEYS
         || config.hardKeyboardHidden == Configuration.KEYBOARDHIDDEN_YES;
}

public class KeyBoardInfo {
 @JavascriptInterface
 public void isSoft() {
 	appview.post(new Runnable() {
         public void run() {
         	appview.loadUrl("javascript:checkKeyboard("+onEvaluateInputViewShown()+");");
         }
     });
 }
}

public class UserToast {
 @JavascriptInterface
 public void show(final String msg) {
 	appview.post(new Runnable() {
         public void run() {
         	Toast toast = Toast.makeText(getApplicationContext(),
          		   msg, Toast.LENGTH_SHORT);
          		toast.setGravity(Gravity.CENTER, 0, 0);
          		toast.show();
         }
     });
 }
}

//public class MyPhoneNumber {
//@JavascriptInterface
//public String getPhoneNumber() {
// return phoneNumber;
//}
//}

public class oggPlayer {
	@JavascriptInterface
	public void play(String url) {
		player.playAsync(url);
	}
	
	@JavascriptInterface
	public void stop() {
		player.stop();
	}
}

public class Login
{
public Login()
{
}

@JavascriptInterface
public void inputUserInfo(String paramString1, String paramString2, String paramString3, String paramString4)
{
 ET7SAMPLE.setUserid(paramString1);
 ET7SAMPLE.setUserclass(paramString2);
 ET7SAMPLE.setUsername(paramString3);
 ET7SAMPLE.setCid(paramString4);
}
}

public class LevelTest
{
	@JavascriptInterface
	public void inputLevelTestID(String id) {
		ET7SAMPLE.setLeveltestid(id);
	}
}

public class StudyMsg
{
public StudyMsg()
{
}

@JavascriptInterface
public void inputStudyInfo(String paramString1, String paramString2, String paramString3)
{
 ET7SAMPLE.setSelbookid(paramString1);
 ET7SAMPLE.setSelday(paramString2);
 ET7SAMPLE.setNowno(paramString3);
}
}

public class ttsengine
{
	@JavascriptInterface
	public void speak(String text) {
		ttsManager.initQueue(text);
	}
}

public class voiceengine {
	@JavascriptInterface
	public void start() {
		appview.post(new Runnable() {
         public void run() {
         	voiceRecog.start();
         }
     });
	}
	
	@JavascriptInterface
	public void stop() {
		appview.post(new Runnable() {
         public void run() {
         	voiceRecog.stop();
         }
     });
	}
}
}

