using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerMove : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        
    }
    
    public float speedH = 2.0f;
    private float yaw = 0.0f;
    
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
        
        // Rotate with mouse
        yaw += speedH * Input.GetAxis("Mouse X");
        transform.eulerAngles = new Vector3(0.0f, yaw, 0.0f);
        
        // Shoot with left mouse button
        if (Input.GetKey(KeyCode.Mouse0)) {
            Ray ray = Camera.main.ViewportPointToRay(new Vector3 (0.5f, 0.5f, 0));
            Debug.DrawRay(ray.origin, ray.direction*10);
            
            if (Physics.Raycast(ray, out RaycastHit hit, 10)) {
                if (hit.transform.gameObject.CompareTag("Enemy")) {
                    Destroy(hit.transform.gameObject);
                }
            }
        }
    }
}
