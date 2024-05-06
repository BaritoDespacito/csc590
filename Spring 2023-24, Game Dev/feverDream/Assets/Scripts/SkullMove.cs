using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SkullMove : MonoBehaviour
{
    
    public Transform Player;
    int MoveSpeed = 4;
    int MaxDist = 10;
    int MinDist = 0;
    
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        transform.LookAt(Player);

        if (Vector3.Distance(transform.position, Player.position) >= MinDist)
        {

            transform.position += MoveSpeed * Time.deltaTime * transform.forward;



            if (Vector3.Distance(transform.position, Player.position) <= MaxDist)
            {
                // Can call function to shoot or dash in or something
            }

        }
    }
}
