using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerMove : MonoBehaviour
{
    
    public float speed = 5.0f;
    [SerializeField] private bool isWebbing = false;
    
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
        if (isWebbing) {
            
        }
        else
        {
            if (Input.GetKey(KeyCode.Mouse0))
            {
                isWebbing = true;
                FireRay();
            }   
            
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
    }

    void FireRay()
    {
        Ray ray = new Ray(transform.position, transform.forward);
        RaycastHit hitData;
        Debug.DrawRay(ray.origin, ray.direction * 10);

        Physics.Raycast(ray, out hitData);
    }
}
