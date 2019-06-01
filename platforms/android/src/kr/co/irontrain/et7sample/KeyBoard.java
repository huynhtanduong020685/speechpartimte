package kr.co.irontrain.et7sample;

import org.apache.cordova.*;

import android.content.Context;
import android.view.inputmethod.InputMethodManager;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;

public class KeyBoard {

        private WebView mAppView;
        private CordovaActivity mGap;

        public KeyBoard(CordovaActivity gap, WebView view)
        {
            mAppView = view;
            mGap = gap;
        }
        
        @JavascriptInterface
        public void showKeyboard() {
            InputMethodManager mgr = (InputMethodManager) mGap.getSystemService(Context.INPUT_METHOD_SERVICE);
            // only will trigger it if no physical keyboard is open
            mgr.showSoftInput(mAppView, InputMethodManager.SHOW_IMPLICIT);

            ((InputMethodManager) mGap.getSystemService(Context.INPUT_METHOD_SERVICE)).showSoftInput(mAppView, 0);

        }
        
        @JavascriptInterface
        public void hideKeyboard() {
            InputMethodManager mgr = (InputMethodManager) mGap.getSystemService(Context.INPUT_METHOD_SERVICE);
            mgr.hideSoftInputFromWindow(mAppView.getWindowToken(), 0);
        }



}