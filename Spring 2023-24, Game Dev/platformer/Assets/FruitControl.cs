using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class FruitControl : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        int ifSpawn = Random.Range(0, 5);
        if (ifSpawn != 0) {
            Destroy(this.gameObject);
        }
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
