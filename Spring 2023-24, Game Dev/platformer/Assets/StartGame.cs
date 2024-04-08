using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class StartGame : MonoBehaviour
{

    public GameObject Floor;
    public GameObject StartingFloor;
    // Start is called before the first frame update
    void Start()
    {
        Instantiate(StartingFloor, new Vector3(0, 0, -20), Quaternion.Euler(0, -90, 0));
        Instantiate(StartingFloor, new Vector3(0, 0, 0), Quaternion.Euler(0, -90, 0));
        Instantiate(Floor, new Vector3(0, 0, 20), Quaternion.Euler(0, -90, 0));
    }

    // Update is called once per frame
    void Update()
    {

    }
}
