﻿using System.Diagnostics;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using CodeMonkey.Utils;

public class LauncherUI : MonoBehaviour {

    private Process process;
    private Transform messageTransform;
    private Text messageText;

    private void Awake() {
        Application.runInBackground = false;
        Application.targetFrameRate = 100;

        transform.Find("topDownShooterBtn").GetComponent<Button_UI>().ClickFunc = () => {
            // Launch Game!
            string path = Application.dataPath + "/../Builds/feverDreamTestBuild.app";
            process = Process.Start(path);
            ShowProcessLaunchedMessage("Launching Shooter Game...");
        };

        transform.Find("minesweeperBtn").GetComponent<Button_UI>().ClickFunc = () => {
            // Launch Game!
            string path = Application.dataPath + "/../Builds/prisonersDilemma.app";
            process = Process.Start(path);
            ShowProcessLaunchedMessage("Launching Prisoners' Dilemma...");
        };

        transform.Find("washYourHandsBtn").GetComponent<Button_UI>().ClickFunc = () => {
            // Launch Game!
            string path = Application.dataPath + "/../Builds/CarGame.app";
            process = Process.Start(path);
            ShowProcessLaunchedMessage("Launching Car Game...");
        };

        messageTransform = transform.Find("message");
        messageText = messageTransform.Find("Text").GetComponent<Text>();
        HideProcessLaunchedMessage();
    }

    private void Update() {
        if (process != null && process.HasExited) {
            // Process exited!
            process = null;
            HideProcessLaunchedMessage();
        }
    }

    private void ShowProcessLaunchedMessage(string message) {
        messageTransform.gameObject.SetActive(true);
        messageText.text = message;
    }

    private void HideProcessLaunchedMessage() {
        messageTransform.gameObject.SetActive(false);
    }


}
