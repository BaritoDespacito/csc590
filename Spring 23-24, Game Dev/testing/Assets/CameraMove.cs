using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraMove : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        // Rotate camera using arrow keys
        if (Input.GetKey(KeyCode.W)) {
            this.transform.rotateAround()
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
    }
}
