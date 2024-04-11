using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.SceneManagement;

public class LoseScript : MonoBehaviour
{

    public TextMeshProUGUI TextPro;

    // Start is called before the first frame update
    void Start()
    {
        TextPro.text = "Score: " + PlayerMove.score;
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKey(KeyCode.Return)) {
            SceneManager.LoadScene("Scenes/Main");
        }
    }
}
