using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerMove : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {

        // Move using WASD
        if (Input.GetKey(KeyCode.W)) {
            this.transform.Translate(Vector3.forward * 4*Time.deltaTime);
        }
        if (Input.GetKey(KeyCode.A)) {
            this.transform.Translate(Vector3.left * 4*Time.deltaTime);
        }
        if (Input.GetKey(KeyCode.D)) {
            this.transform.Translate(Vector3.right * 4*Time.deltaTime);
        }
        if (Input.GetKey(KeyCode.S)) {
            this.transform.Translate(Vector3.down * 4*Time.deltaTime);
        }


        // Rotate using arrow keys
        if (Input.GetKey(KeyCode.UpArrow)) {
            this.transform.Rotate(Vector3.left * 50*Time.deltaTime);
        }
        if (Input.GetKey(KeyCode.LeftArrow)) {
            this.transform.Rotate(Vector3.down * 50*Time.deltaTime);
        }
        if (Input.GetKey(KeyCode.RightArrow)) {
            this.transform.Rotate(Vector3.up * 50*Time.deltaTime);
        }
        if (Input.GetKey(KeyCode.DownArrow)) {
            this.transform.Rotate(Vector3.right * 50*Time.deltaTime);
        }

    }
}
