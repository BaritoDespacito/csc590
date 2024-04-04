using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class VehicleMove : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        int ifSpawn = Random.Range(0, 4);
        if (ifSpawn == 0) {
            Destroy(this.gameObject);
        }
    }

    // Update is called once per frame
    void Update()
    {
       transform.position += (transform.forward * 10*Time.deltaTime);
    }
}
