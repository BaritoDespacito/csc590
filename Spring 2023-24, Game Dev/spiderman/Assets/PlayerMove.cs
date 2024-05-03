using System.Collections;
using System.Collections.Generic;
using System.Drawing;
using Unity.VisualScripting;
using UnityEngine;
using Color = UnityEngine.Color;

public class PlayerMove : MonoBehaviour
{
    
    public float speed = 5.0f;
    public LineRenderer lr;
    
    // Start is called before the first frame update
    void Start()
    {
        lr.startColor = Color.white;
        lr.endColor = Color.white;
        lr.startWidth = 0.1f;
        lr.endWidth = 0.1f;
    }

    // Update is called once per frame
    void Update()
    {

        Vector3 mousePos = Input.mousePosition;
        mousePos.z = 100f;
        mousePos = Camera.main.ScreenToWorldPoint(mousePos);
        Debug.DrawRay(transform.position, mousePos - transform.position, Color.red);
        
        if (Input.GetKey(KeyCode.Mouse0))
        {
            FireRay();
            lr.enabled = true;
        }
        else
        {
            lr.enabled = false;
            
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

    private void FireRay()
    {
        Vector3 mousePos = Input.mousePosition;
        mousePos.z = 100f;
        mousePos = Camera.main.ScreenToWorldPoint(mousePos);
        var ray = new Ray(transform.position, mousePos - transform.position);
        
        RaycastHit hitData;
        // Debug.DrawRay(ray.origin, ray.direction * 100, color:UnityEngine.Color.red);

        if (Physics.Raycast(ray, out hitData, 100))
        {
            // Debug.Log(hitData.transform.gameObject.name);
            lr.SetPosition(0, new Vector3(transform.position.x, transform.position.y-1, transform.position.z));
            lr.SetPosition(1, hitData.point);
            // Debug.Log(hitData.point);
            
            var direction = hitData.point - transform.position;
            direction.Normalize();
            transform.position += direction*0.5f;
        }
    }
}
