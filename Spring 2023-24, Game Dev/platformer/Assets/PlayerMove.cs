using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using TMPro;

public class PlayerMove : MonoBehaviour
{

    public GameObject Floor;
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
            this.transform.Translate(7 * Time.deltaTime * Vector3.forward);
        }
        if (Input.GetKey(KeyCode.A)) {
            this.transform.Translate(7 * Time.deltaTime * Vector3.left);
        }
        if (Input.GetKey(KeyCode.S)) {
            this.transform.Translate(7 * Time.deltaTime * Vector3.back);
        }
        if (Input.GetKey(KeyCode.D)) {
            this.transform.Translate(7 * Time.deltaTime * Vector3.right);
        }

        // Jump with space
        if (Input.GetKey(KeyCode.Space)) {
            this.transform.Translate(10 * Time.deltaTime * Vector3.up);
        }

        // Rotate with arrow keys
        // if (Input.GetKey(KeyCode.UpArrow)) {
        //     this.transform.Rotate(Vector3.left * 50*Time.deltaTime);
        // }
        // if (Input.GetKey(KeyCode.DownArrow)) {
        //     this.transform.Rotate(Vector3.right * 50*Time.deltaTime);
        // }
        if (Input.GetKey(KeyCode.LeftArrow)) {
            this.transform.Rotate(50 * Time.deltaTime * Vector3.down);
        }
        if (Input.GetKey(KeyCode.RightArrow)) {
            this.transform.Rotate(50 * Time.deltaTime * Vector3.up);
        }

        // Rotate with mouse
        float h = 2.5f * Input.GetAxis("Mouse X");
        // float v = 2.5f * Input.GetAxis("Mouse Y");
        transform.Rotate(0, h, 0);

    }

    int z = 20;
    int score = 0;

    void OnTriggerEnter(Collider collision) {
        if (collision.gameObject.CompareTag("Vehicle")) {
            SceneManager.LoadScene("Scenes/Lose");
        }

        if (collision.gameObject.CompareTag("Chaser")) {
            SceneManager.LoadScene("Scenes/Lose");
        }

        if (collision.gameObject.CompareTag("AboveBar")) {
            z += 20;
            Instantiate(Floor, new Vector3(0, 0, z), Quaternion.Euler(0, -90, 0));
        }

        if (collision.gameObject.CompareTag("Fruit")) {
            Destroy(collision.gameObject);
            score += 1;
            TextPro.text = "Score: " + score;
        }
    }
}


