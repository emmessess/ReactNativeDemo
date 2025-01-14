package com.demoproject

import android.content.Intent
import android.os.Build
import android.util.Log
import com.facebook.react.TurboReactPackage
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
class LocationServiceStarter(reactContext: ReactApplicationContext) : NativeLocationTrackingSpec(reactContext) {

    companion object {
        const val NAME = "NativeLocationTracking"
    }

    init {
        Log.d("LocationServiceStarter", "ReactApplicationContext initialized")
    }

    override fun getName(): String {
        return "NativeLocationTracking"
    }

    @ReactMethod
override fun startService() {
        val intent = Intent(reactApplicationContext, LocationTrackingService::class.java)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            reactApplicationContext.startForegroundService(intent)
        } else {
            reactApplicationContext.startService(intent)
        }
    }
//
    @ReactMethod
override fun stopService() {
        val serviceIntent = Intent(reactApplicationContext, LocationTrackingService::class.java)
        reactApplicationContext.stopService(serviceIntent)
    }
}

class LocationServicePackage : TurboReactPackage() {

    override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? =
        if (name == LocationServiceStarter.NAME) {
            LocationServiceStarter(reactContext)
        } else {
            null
        }

    override fun getReactModuleInfoProvider() = ReactModuleInfoProvider {
        mapOf(
            LocationServiceStarter.NAME to ReactModuleInfo(
                _name = LocationServiceStarter.NAME,
                _className = LocationServiceStarter.NAME,
                _canOverrideExistingModule = false,
                _needsEagerInit = false,
                isCxxModule = false,
                isTurboModule = true
            )
        )
    }
}