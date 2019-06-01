package kr.co.irontrain.et7sample;

import java.util.ArrayList;

import org.json.JSONArray;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.speech.RecognitionListener;
import android.speech.RecognizerIntent;
import android.speech.SpeechRecognizer;
import android.util.Log;
import android.webkit.JavascriptInterface;

public class VoiceRecognition implements RecognitionListener {

	private SpeechRecognizer speech = null;
	private Intent recognizerIntent;
	
	public void init(Context context) {
		// TODO Auto-generated constructor stub
		speech = SpeechRecognizer.createSpeechRecognizer(context);
		speech.setRecognitionListener(this);
		recognizerIntent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
		recognizerIntent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_PREFERENCE,
				"en");
		recognizerIntent.putExtra(RecognizerIntent.EXTRA_LANGUAGE, "en-US");
		recognizerIntent.putExtra(RecognizerIntent.EXTRA_CALLING_PACKAGE,
				context.getPackageName());
		recognizerIntent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL,
				RecognizerIntent.LANGUAGE_MODEL_WEB_SEARCH);
		recognizerIntent.putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 3);
	}
	
	public void start() {
		Log.i("VoiceRecognition", "start");
		speech.startListening(recognizerIntent);
	}
	
	public void stop() {
		Log.i("VoiceRecognition", "stop");
		speech.stopListening();
	}
	
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
		Log.i("VoiceRecognition", "onBufferReceived: " + buffer);
	}

	@Override
	public void onEndOfSpeech() {
		// TODO Auto-generated method stub
		ET7SAMPLE.getAppview().post(new Runnable() {
            public void run() {
            	ET7SAMPLE.getAppview().loadUrl("javascript:shadow.pause();");
            }
        });
	}

	@Override
	public void onError(int error) {
		// TODO Auto-generated method stub
		final String errorMessage = getErrorText(error);
		Log.d("VoiceRecognition", "FAILED " + errorMessage);
		
		ET7SAMPLE.getAppview().post(new Runnable() {
            public void run() {
            	ET7SAMPLE.getAppview().loadUrl("javascript:shadow.error('"+errorMessage+"');");
            }
        });
	}

	@Override
	public void onResults(Bundle results) {
		// TODO Auto-generated method stub
		Log.i("VoiceRecognition", "onResults");
		ArrayList<String> matches = results
				.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
		String text = "";
		for (String result : matches)
			text += result + "\n";

		Log.i("VoiceRecognition", text);
		
		final JSONArray jsonMatches = new JSONArray(matches);
		
    	ET7SAMPLE.getAppview().post(new Runnable() {
            public void run() {
            	ET7SAMPLE.getAppview().loadUrl("javascript:speaking2.result("+jsonMatches+");");
            }
        });
	}

	@Override
	public void onPartialResults(Bundle partialResults) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void onEvent(int eventType, Bundle params) {
		// TODO Auto-generated method stub
		
	}
	
	public static String getErrorText(int errorCode) {
		String message;
		switch (errorCode) {
		case SpeechRecognizer.ERROR_AUDIO:
			message = "Audio recording error";
			break;
		case SpeechRecognizer.ERROR_CLIENT:
			message = "Client side error";
			break;
		case SpeechRecognizer.ERROR_INSUFFICIENT_PERMISSIONS:
			message = "Insufficient permissions";
			break;
		case SpeechRecognizer.ERROR_NETWORK:
			message = "Network error";
			break;
		case SpeechRecognizer.ERROR_NETWORK_TIMEOUT:
			message = "Network timeout";
			break;
		case SpeechRecognizer.ERROR_NO_MATCH:
			message = "No match";
			break;
		case SpeechRecognizer.ERROR_RECOGNIZER_BUSY:
			message = "RecognitionService busy";
			break;
		case SpeechRecognizer.ERROR_SERVER:
			message = "error from server";
			break;
		case SpeechRecognizer.ERROR_SPEECH_TIMEOUT:
			message = "No speech input";
			break;
		default:
			message = "Didn't understand, please try again.";
			break;
		}
		return message;
	}
	
}
