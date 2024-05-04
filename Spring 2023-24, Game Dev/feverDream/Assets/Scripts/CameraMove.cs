using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraMove : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        
    }

    private float pitch = 0.0f;
    public float speedV = 2.0f;
    
    // Update is called once per frame
    void Update()
    {
        // Rotate with mouse
        pitch -= speedV * Input.GetAxis("Mouse Y");
        pitch = Math.Clamp(pitch, -90.0f, 90.0f);
        transform.eulerAngles = new Vector3(pitch, transform.eulerAngles.y, 0.0f);
    }
}
