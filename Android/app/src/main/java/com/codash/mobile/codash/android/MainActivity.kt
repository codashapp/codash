package com.codash.mobile.codash.android

import android.os.Bundle
import com.google.android.material.snackbar.Snackbar
import androidx.appcompat.app.AppCompatActivity
import androidx.navigation.findNavController
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.navigateUp
import androidx.navigation.ui.setupActionBarWithNavController
import android.view.Menu
import android.view.MenuItem
import android.widget.Button
import android.widget.TextView
import com.codash.mobile.codash.android.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        val COVID_SHORT_TEXT: TextView = findViewById(R.id.self_assessment_short_text) as TextView
        val COVID_SELF_ASSESSMENT_TEXT: TextView = findViewById(R.id.SELF_ASSESSMENT_MAIN_TEXT) as TextView
        val TAKE_USER_TO_SELF_ASSESSMENT: Button = findViewById(R.id.TAKE_USER_TO_SELF_ASSESSMENT) as Button

    }
}
