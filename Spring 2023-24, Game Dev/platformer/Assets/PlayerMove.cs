using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class PlayerMove : MonoBehaviour
{

    public GameObject Floor;
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
            this.transform.Translate(Vector3.up * 10*Time.deltaTime);
        }

        // Rotate with arrow keys
        // if (Input.GetKey(KeyCode.UpArrow)) {
        //     this.transform.Rotate(Vector3.left * 50*Time.deltaTime);
        // }
        // if (Input.GetKey(KeyCode.DownArrow)) {
        //     this.transform.Rotate(Vector3.right * 50*Time.deltaTime);
        // }
        if (Input.GetKey(KeyCode.LeftArrow)) {
            this.transform.Rotate(Vector3.down * 50*Time.deltaTime);
        }
        if (Input.GetKey(KeyCode.RightArrow)) {
            this.transform.Rotate(Vector3.up * 50*Time.deltaTime);
        }

        // Rotate with mouse
        float h = 2.5f * Input.GetAxis("Mouse X");
        // float v = 2.5f * Input.GetAxis("Mouse Y");
        transform.Rotate(0, h, 0);

    }

    int z = 20;

    void OnTriggerEnter(Collider collision) {
        if (collision.gameObject.tag == "Vehicle") {
            SceneManager.LoadScene("Scenes/Lose");
        }

        if (collision.gameObject.tag == "AboveBar") {
            z += 20;
            Instantiate(Floor, new Vector3(0, 0, z), Quaternion.Euler(0, -90, 0));
        }
    }
}


