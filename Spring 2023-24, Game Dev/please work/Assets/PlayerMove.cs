using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;
using UnityEngine.SceneManagement;

public class PlayerMove : MonoBehaviour
{

    public TextMeshProUGUI TextPro;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {

        // Move with WASD
        if (Input.GetKey(KeyCode.W)) {
            this.transform.Translate(Vector3.forward * 4*Time.deltaTime);
        }
        if (Input.GetKey(KeyCode.A)) {
            this.transform.Translate(Vector3.left * 4*Time.deltaTime);
        }
        if (Input.GetKey(KeyCode.S)) {
            this.transform.Translate(Vector3.back * 4*Time.deltaTime);
        }
        if (Input.GetKey(KeyCode.D)) {
            this.transform.Translate(Vector3.right * 4*Time.deltaTime);
        }

        // Jump with space
        if (Input.GetKey(KeyCode.Space)) {
            this.transform.Translate(Vector3.up * 4*Time.deltaTime);
        }

        // Rotate with arrow keys
        if (Input.GetKey(KeyCode.UpArrow)) {
            this.transform.Rotate(Vector3.left * 50*Time.deltaTime);
        }
        if (Input.GetKey(KeyCode.DownArrow)) {
            this.transform.Rotate(Vector3.right * 50*Time.deltaTime);
        }
        if (Input.GetKey(KeyCode.LeftArrow)) {
            this.transform.Rotate(Vector3.down * 50*Time.deltaTime);
        }
        if (Input.GetKey(KeyCode.RightArrow)) {
            this.transform.Rotate(Vector3.up * 50*Time.deltaTime);
        }

        // Rotate with mouse
        float h = 2.5f * Input.GetAxis("Mouse X");
        float v = 2.5f * Input.GetAxis("Mouse Y");
        transform.Rotate(v, h, 0);
    }

    int score = 0;
    void OnCollisionEnter(Collision collision) {
        if (collision.gameObject.tag == "Gem") {
            score += 1;
            TextPro.text = "" + (score);
            Destroy(collision.gameObject);
        }

        if (score == 3) {
            SceneManager.LoadScene("Scenes/SampleScene");
        }
    }
}
