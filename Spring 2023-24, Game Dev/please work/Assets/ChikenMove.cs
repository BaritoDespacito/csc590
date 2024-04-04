using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ChikenMove : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        // transform.Rotate(Vector3(0, 0, ))
    }

    // Update is called once per frame
    void Update()
    {
        transform.position += (transform.forward * 5*Time.deltaTime);
    }

    void OnCollisionEnter(Collision collision) {
        int direction = Random.Range(0, 3);

        if (direction == 0) {
            this.transform.Rotate(Vector3.up * 90);
        } else if (direction == 1) {
            this.transform.Rotate(Vector3.down * 90);
        } else {
            this.transform.Rotate(Vector3.up * 180);
        }
    }
}
