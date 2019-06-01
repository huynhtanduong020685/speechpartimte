/**
 * The MIT License
 *
 *  Copyright (c) 2011-2013
 *  Colin Turner (github.com/koolspin)  
 *  Guillaume Charhon (github.com/poiuytrez)  
 *  
 *  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *  
 *  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *  
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *
 */
package com.phonegap.plugins.speech;

import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Locale;

import kr.co.irontrain.et7sample.ET7SAMPLE;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.media.audiofx.Visualizer;
import android.net.Uri;
import android.os.Bundle;
import android.speech.RecognitionListener;
import android.speech.RecognizerIntent;
import android.util.Log;

/**
 * Style and such borrowed from the TTS and PhoneListener plugins
 */
public class SpeechRecognizer extends CordovaPlugin implements RecognitionListener {
    private static final String LOG_TAG = SpeechRecognizer.class.getSimpleName();
    private static int REQUEST_CODE = 1001;

    private CallbackContext callbackContext;
    private LanguageDetailsChecker languageDetailsChecker;
    
    Uri audioUri;
    MediaPlayer mPlayer;
    private Visualizer mVisualizer;
    String upLoadServerUri = "http://mp3.3030class.com/lib/postamr.php";
    String selectedPath="";
    int serverResponseCode=0;

    //@Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) {
        Boolean isValidAction = true;

        this.callbackContext= callbackContext;

        // Action selector
        if ("startRecognize".equals(action)) {
            // recognize speech
            startSpeechRecognitionActivity(args);     
        } else if ("getSupportedLanguages".equals(action)) {
            getSupportedLanguages();
        } else {
            // Invalid action
            this.callbackContext.error("Unknown action: " + action);
            isValidAction = false;
        }
        
        return isValidAction;

    }

    // Get the list of supported languages
    private void getSupportedLanguages() {
        if (languageDetailsChecker == null){
            languageDetailsChecker = new LanguageDetailsChecker(callbackContext);
        }
        // Create and launch get languages intent
        Intent detailsIntent = new Intent(RecognizerIntent.ACTION_GET_LANGUAGE_DETAILS);
        cordova.getActivity().sendOrderedBroadcast(detailsIntent, null, languageDetailsChecker, null, Activity.RESULT_OK, null, null);
        
    }

    /**
     * Fire an intent to start the speech recognition activity.
     *
     * @param args Argument array with the following string args: [req code][number of matches][prompt string]
     */
    private void startSpeechRecognitionActivity(JSONArray args) {
        int maxMatches = 0;
        String prompt = "";
        String language = Locale.getDefault().toString();

        try {
            if (args.length() > 0) {
                // Maximum number of matches, 0 means the recognizer decides
                String temp = args.getString(0);
                maxMatches = Integer.parseInt(temp);
            }
            if (args.length() > 1) {
                // Optional text prompt
                prompt = args.getString(1);
            }
            if (args.length() > 2) {
                // Optional language specified
                language = args.getString(2);
            }
        }
        catch (Exception e) {
            Log.e(LOG_TAG, String.format("startSpeechRecognitionActivity exception: %s", e.toString()));
        }
        
        // Create the intent and set parameters
        Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
        
        intent.putExtra("android.speech.extra.GET_AUDIO", true);
        intent.putExtra("android.speech.extra.GET_AUDIO_FORMAT", "audio/AMR");
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
        
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE, language);

        if (maxMatches > 0)
            intent.putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, maxMatches);
        if (!prompt.equals(""))
            intent.putExtra(RecognizerIntent.EXTRA_PROMPT, prompt);
        cordova.startActivityForResult(this, intent, REQUEST_CODE);
    }

    /**
     * Handle the results from the recognition activity.
     */
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {    
        if (resultCode == Activity.RESULT_OK) {
            //음원 재생 및 서버업로드
            audioUri = data.getData();
            
            
            new Thread(new Runnable() {
                public void run() {
                                     
                     uploadFile(audioUri);
                                              
                }
              }).start();  
            
            AudioManager audiomanager = (AudioManager)cordova.getActivity().getSystemService(Context.AUDIO_SERVICE);

            int currentVolumn = audiomanager.getStreamVolume(AudioManager.STREAM_MUSIC);
            audiomanager.setStreamVolume(AudioManager.STREAM_MUSIC, currentVolumn, 0);
            mPlayer = new MediaPlayer();
            mPlayer.setAudioStreamType(AudioManager.STREAM_MUSIC);
        
//            AudioManager audiomanager = (AudioManager)cordova.getActivity().getSystemService("audio");
//            audiomanager.getStreamVolume(3);
//            audiomanager.setStreamVolume(3, audiomanager.getStreamMaxVolume(3), 0);
//            mPlayer = new MediaPlayer();
//            mPlayer.setAudioStreamType(3);
            
            android.media.audiofx.Visualizer.OnDataCaptureListener ondatacapturelistener;
            
            try
            {
                mPlayer.setDataSource(cordova.getActivity(), audioUri);
            }
            catch (Exception exception)
            {
                ET7SAMPLE.getAppview().post(new Runnable() {
                    public void run()
                    {
                        ET7SAMPLE.getAppview().loadUrl("javascript:drawRecSpectrum();");
                    }
                });
            }
            
            try
            {
                mPlayer.prepare();
            }
            catch (IllegalStateException illegalstateexception) { }
            catch (IOException ioexception) { }
            
            mPlayer.start();
            mVisualizer = new Visualizer(mPlayer.getAudioSessionId());
            mVisualizer.setCaptureSize(2048);
            
            ondatacapturelistener = new android.media.audiofx.Visualizer.OnDataCaptureListener() {
                public void onFftDataCapture(Visualizer visualizer, byte abyte0[], int k)
                {
                    float f = 0.0F;
                    float f1 = abyte0.length;
                    for (int l = 0; (float)l < f1; l++)
                    {
                        f = Math.max(f, abyte0[l]);
                    }

                    final float max2 = f;
                    ET7SAMPLE.getAppview().post(
                            new Runnable() {
                                public void run()
                                {
                                    ET7SAMPLE.getAppview().loadUrl("javascript:inputRecSpectrum("+max2+");");
                                }
                    });
                }

                public void onWaveFormDataCapture(Visualizer visualizer, byte abyte0[], int k)
                {
                }
            };
            
            mVisualizer.setDataCaptureListener(ondatacapturelistener, Visualizer.getMaxCaptureRate(), true, true);
            mVisualizer.setEnabled(true);
            
            mPlayer.setOnCompletionListener(new android.media.MediaPlayer.OnCompletionListener() {
                public void onCompletion(MediaPlayer mediaplayer)
                {
                    mVisualizer.setEnabled(false);
                    mediaplayer.stop();
                    mediaplayer.release();
                    ET7SAMPLE.getAppview().post(new Runnable() {
                        public void run()
                        {
                            ET7SAMPLE.getAppview().loadUrl("javascript:drawRecSpectrum();");
                        }
                    });
                }
            });
            
            
            
            
            
            // Fill the list view with the strings the recognizer thought it could have heard
            ArrayList<String> matches = data.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS);

            returnSpeechResults(matches);
        }
        else {
            // Failure - Let the caller know
            this.callbackContext.error(Integer.toString(resultCode));
        }

        super.onActivityResult(requestCode, resultCode, data);
    }

    private void returnSpeechResults(ArrayList<String> matches) {
        JSONArray jsonMatches = new JSONArray(matches);
        this.callbackContext.success(jsonMatches);
    }
    
    public int uploadFile(Uri uri)
    {
        //레벨테스트 여부 확인
        String fileName = "";
        
        if (ET7SAMPLE.getSelbookid().substring(0, 2).equals("L-")) {
            fileName = "u-l"+ET7SAMPLE.getLeveltestid()+"-b-"+ET7SAMPLE.getSelbookid()+"-"+ET7SAMPLE.getSelday()+"-"+ET7SAMPLE.getNowno()+".amr";
        } else {
            fileName = "u-"+ET7SAMPLE.getUserid()+"-b-"+ET7SAMPLE.getSelbookid()+"-"+ET7SAMPLE.getSelday()+"-"+ET7SAMPLE.getNowno()+".amr";
        }
          
        HttpURLConnection conn = null;
        DataOutputStream dos = null;  
        String lineEnd = "\r\n";
        String twoHyphens = "--";
        String boundary = "*****";
        int bytesRead, bytesAvailable, bufferSize;
        byte[] buffer;
        int maxBufferSize = 1 * 1024 * 1024; 

             try { 
                  
                   // open a URL connection to the Servlet
                 InputStream fileInputStream = cordova.getActivity().getContentResolver().openInputStream(uri);
                 URL url = new URL(upLoadServerUri);
                  
                 // Open a HTTP  connection to  the URL
                 conn = (HttpURLConnection) url.openConnection(); 
                 conn.setDoInput(true); // Allow Inputs
                 conn.setDoOutput(true); // Allow Outputs
                 conn.setUseCaches(false); // Don't use a Cached Copy
                 conn.setRequestMethod("POST");
                 conn.setRequestProperty("Connection", "Keep-Alive");
                 conn.setRequestProperty("ENCTYPE", "multipart/form-data");
                 conn.setRequestProperty("Content-Type", "multipart/form-data;boundary=" + boundary);
                 conn.setRequestProperty("uploaded_file", fileName); 
                  
                 dos = new DataOutputStream(conn.getOutputStream());
        
                 dos.writeBytes(twoHyphens + boundary + lineEnd); 
                 dos.writeBytes("Content-Disposition: form-data; name=\"uploaded_file\";filename=\""
                                           + fileName + "\"" + lineEnd);
                  
                 dos.writeBytes(lineEnd);
        
                 // create a buffer of  maximum size
                 bytesAvailable = fileInputStream.available(); 
        
                 bufferSize = Math.min(bytesAvailable, maxBufferSize);
                 buffer = new byte[bufferSize];
        
                 // read file and write it into form...
                 bytesRead = fileInputStream.read(buffer, 0, bufferSize);  
                    
                 while (bytesRead > 0) {
                      
                   dos.write(buffer, 0, bufferSize);
                   bytesAvailable = fileInputStream.available();
                   bufferSize = Math.min(bytesAvailable, maxBufferSize);
                   bytesRead = fileInputStream.read(buffer, 0, bufferSize);   
                    
                  }
        
                 // send multipart form data necesssary after file data...
                 dos.writeBytes(lineEnd);
                 dos.writeBytes(twoHyphens + boundary + twoHyphens + lineEnd);
        
                 // Responses from the server (code and message)
                 serverResponseCode = conn.getResponseCode();
                 String serverResponseMessage = conn.getResponseMessage();
                   
                 Log.i("uploadFile", "HTTP Response is : "
                         + serverResponseMessage + ": " + serverResponseCode);
                  
                 if(serverResponseCode == 200){              
                 }    
                  
                 //close the streams //
                 fileInputStream.close();
                 dos.flush();
                 dos.close();
                   
            } catch (Exception e) {
                e.printStackTrace();
                Log.e("Upload file to server Exception", "Exception : "  + e.getMessage(), e);  
            }
             
            return serverResponseCode; 
             
    } // End else block

    @Override
    public void onReadyForSpeech(Bundle params) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public void onBeginningOfSpeech() {
        // TODO Auto-generated method stub
        
    }

    @Override
    public void onRmsChanged(float rmsdB) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public void onBufferReceived(byte[] buffer) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public void onEndOfSpeech() {
        // TODO Auto-generated method stub
        
    }

    @Override
    public void onError(int error) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public void onResults(Bundle results) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public void onPartialResults(Bundle partialResults) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public void onEvent(int eventType, Bundle params) {
        // TODO Auto-generated method stub
        
    }
    
}
